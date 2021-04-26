import firebase from 'firebase';
import { firebaseConfig } from './config';

const Firebase = (() => {
  firebase.initializeApp(firebaseConfig);
  
  const scores = firebase.firestore()
                        .collection('high-scores-2')
                        .orderBy('score', 'asc')
                        .limit('15')

  const _isUserSignedIn = () => {
    return !!firebase.auth().currentUser;
  }

  const signIn = async () => {
    if (_isUserSignedIn()) return;
    console.log('signed in')
    return await firebase.auth().signInAnonymously();
  }

  const getUserId = () => {
    if (_isUserSignedIn()) {
      return firebase.auth().currentUser.uid;
    } else {
      console.log('user not signed in')
    }
  }

  const initHighScores = () => {
    const query = firebase.firestore()
                    .collection('high-scores-2')
                    .orderBy('score', 'asc')
                    .limit('15')

    query.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(change => {
        const score = change.doc.data();
        // return (score.name, score.score, score.timestamp)
        returnHighScores(score.name, score.score, score.timestamp)
      })
    })
  }

  const returnHighScores = (name, score, timestamp) => {
    console.log(name, score, timestamp)
  }

  const updateHighScores = async (name, score) => {
    const scores = firebase.firestore()
                      .collection('high-scores-2');
    try {
      await scores.add({
        name,
        score,
        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
      })
      return true
    } catch (error) {
      console.error(error)
    }
    return false;
  }

  const setTime = async (action, time) => {
    const userId = getUserId();

    try {
      await firebase.firestore()
              .collection('time-tracking')
              .doc(userId)
              .set({
                [action]: time
              }, {merge: true})
      return true;
    } catch (error) {
      console.error(`Error setting time ${error}`)
    }
    return false;
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

  return {
    signIn,
    getUserId,
    updateHighScores,
    setTime,
    getTime,
    scores,
  }
})

export default Firebase;



