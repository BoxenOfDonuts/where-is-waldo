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
    } catch (error) {
      console.error(error)
    }
  }

  return {
    signIn,
    getUserId,
    initHighScores,
    updateHighScores,
    scores,
  }
})

export default Firebase;



