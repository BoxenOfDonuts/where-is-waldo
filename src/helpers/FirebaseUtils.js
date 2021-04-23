/* eslint-disable no-undef */
import firebase from "firebase";
import { firebaseConfig } from './config';


firebase.initializeApp(firebaseConfig);


const FirebaseUtils = (() => {
  const highScoresDoc = firebase.firestore()
                          .collection('high-scores')
                          .doc('high-scores-list');
  
  const _isUserSignedIn = () => {
    return !!firebase.auth().currentUser;
  }

  const signIn = async () => {
    if (_isUserSignedIn()) return;

    return await firebase.auth().signInAnonymously();
    // firebase.auth().signInAnonymously()
    //   .then(() => {
    //     console.log('sucessfull sign in')
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.error(`Error! Code: ${errorCode} Message: ${errorMessage}`)
    //     throw new Error();
    //   })
  }
  
  const getUserId = () => {
    if (_isUserSignedIn()) {
      return firebase.auth().currentUser.uid;
    } else {
      console.log('user not signed in')
      // try {
      //   signIn();
      //   getUserId();
      // } catch {
      //   //
      // }
    }
  }

  // depreciated
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

  // depreciated
  const _onNameSubmit = async (name, time, userId) => { 
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

  // depreciated
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
      return true;
    }
    return false;
  }

  const initHighScores = () => {
    const query = firebase.firestore()
                    .collection('high-scores-2')
                    .orderBy('score', 'asc')
                    .limit('15')

    query.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(change => {
        const score = change.doc.data();
        console.log(score.name, score.score, score.timestamp)
        updateHighScores(score.name, score.score, score.timestamp)
      })
    })
  }

  const updateHighScores = (name, score, timestamp) => {
    return {name, score, timestamp}
  }


  const getHighScores = async () => {
    try {
      const highScores = await highScoresDoc
                            .get();
  
      return highScores.data()['all-scores']
    } catch (error) {
      console.log(`Error getting high scores ${error}`)
    }
  }

  const addScore = async (name, score) => {
    try {
      await highScoresDoc
              .update({
                "all-scores": firebase.firestore.FieldValue.arrayUnion(
                  {
                    name,
                    score,
                    submitTime: new Date(),
                  })
              });
      return true;
    } catch (error) {
      console.error(`Error adding score ${error}`)
    }
  }

  const setTime = async (action, time) => {
    const userId = getUserId();
    const timeTracking = firebase.firestore()
                            .collection('time-tracking');
    try {
      await firebase.firestore()
              .collection('time-tracking')
              .doc(userId)
              .set({
                [action]: time
              }, {merge: true})
    } catch (error) {
      console.error(`Error setting time ${error}`)
    }
  }

  const getTime = async () => {
    const userId = getUserId();
    const timeTracking = firebase.firestore()
                            .collection('time-tracking')
                            .doc(userId);

    try {
      const startStopTimes = await timeTracking.get()
      return startStopTimes.data();

    } catch (error) {
      console.error(`Error getting time ${error}`)
    }
  }

  const initFirebaseAuth = () => {
    firebase.auth().onAuthStateChanged(authStateObserver)
  }

  const authStateObserver = (user) => {
    if (user) {
      // user signed in!
      setTime('startTime', Date.now()).then(
        // complete
      )

    }
  }


  return { signIn, getUserId, getHighScores, addScore, setTime, getTime, initFirebaseAuth, initHighScores, updateHighScores };
})();

export { FirebaseUtils }