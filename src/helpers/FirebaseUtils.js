/* eslint-disable no-undef */
import firebase from "firebase";
import { firebaseConfig } from './config';



firebase.initializeApp(firebaseConfig);


const FirebaseUtils = (() => {
  
  const _isUserSignedIn = () => {
    return !!firebase.auth().currentUser;
  }

  const signIn = () => {
    if (_isUserSignedIn()) return;

    firebase.auth().signInAnonymously()
      .then(() => {
        console.log('Succesfull?')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error! Code: ${errorCode} Message: ${errorMessage}`)
        throw new Error();
      })
  }

  const _createUser = async () => {
    // actually don't think I need this?
    const userId = firebase.auth().currentUser.uid;
    try {
      return await firebase.firestore().collection('users').add({
        name: '',
        userId,
      })
    } catch (error) {
      console.error(`Error creating user ${error}`)
    }
  }

  const _onNameSubmit = async (name, time) => {
    try {
      return await firebase.firestore().collection('high-scores').add({
        name,
        completionTime: time,
      });
    
    } catch (error) {
      console.error(`Error writing new score to database ${error}`);
    }
  }
  
  const onNameSubmit = async (name, time, userId) => { 
    const isHighScore = await _isHighScore(userId, time)
    if (!isHighScore) return;
    try {
      const data = {
        name,
        completionTime: time
      };

      await firebase.firestore()
                    .collection('high-scores')
                    .doc(userId)
                    .set(data, {merge: true})
      console.log('set result');
      return true;
    } catch (error) {
      console.error(`Error writing new score to database ${error}`);
    }

    return false;
  }

  const _getUserId = async () => {
    try {
      const users = firebase.firestore().collection('users');
      const query = await users.where('userId', '==', firebase.auth().currentUser.uid).get()
      // const query = await users.where('userId', '==', 'meh').get()

      if (query.empty) {
        console.log('no user found');
        
      }

      let user = '';

      query.forEach(doc => {
        console.log(doc.id)
        user = doc.data()
      })

      // return user.userId;
      return firebase.auth().currentUser.uid;
      
    } catch (error) {
      console.error(error)
    }
  }

  const _isHighScore = async (userId, score) => {
    let previousTime = null;

    try {
      const r =  await firebase.firestore()
              .collection('high-scores')
              .doc(userId)
              .get()
      previousTime = r.data().completionTime;
    } catch (error) {
      console.error(`Error getting highscore ${error}`)
    }

    if (score < previousTime) {
      console.log('Truth');
      return true;
    }
    console.log('Not Truth');
    return false;
  }

  const getUserId = () => {
    if (_isUserSignedIn()) {
      return firebase.auth().currentUser.uid;
    } else {
      console.log('user not signed in')
      try {
        getUserId();
        
      } catch {
        //
      }
    }
  }

  return { signIn, onNameSubmit, getUserId };
})();

export { FirebaseUtils }