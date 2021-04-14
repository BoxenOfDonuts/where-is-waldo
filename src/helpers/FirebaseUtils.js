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
      })
  }


  const onNameSubmit = async (name, time) => {
    try {
      return firebase.firestore().collection('high-scores').add({
        name,
        completionTime: time
      });
    } catch (error) {
      console.error(`Error writing new score to database ${error}`);
    }
  }

  const Test = async () => {
    // const users = firebase.firestore().collection('users');
    // users.where('userId', '==', firebase.auth().currentUser.uid)
    //   .get()
    //   .then(query => {
    //     query.forEach(doc => {
    //       return doc.data();
    //     })
    //   }).catch(error => {
    //     console.error(error);
    //   })
    try {
      const users = firebase.firestore().collection('users');
      const query = await users.where('userId', '==', firebase.auth().currentUser.uid).get()

      let user = '';

      query.forEach(doc => {
        user = doc.data()
      })

      return user.userId;
      
    } catch (error) {
      console.error(error)
    }
  }




  const Testicle = () => {
    console.log(firebase)
  }

  
  
  return { signIn, onNameSubmit, Test};
})();

export { FirebaseUtils }