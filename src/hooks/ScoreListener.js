import { useEffect, useState } from 'react';




const useScoreListener = ( firebase ) => {
  const [ scores, setScores ] = useState([]);

  const scoreListener = () => {
    return firebase.scores.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(change => {
        const scoreData = change.doc.data();
        const {name, score, timestamp} = scoreData;
        setScores(prevState =>
          [...prevState, {name, score, timestamp, id: change.doc.id}]);
      })
    })
  }

  useEffect(() => {
    const listener = scoreListener()
    return () => {
      console.log('unmounted')
      // setScores([])?
      listener();
    }
  },[])

  // won't have to do this if I route!!!
  const sortedScores = scores.sort((a, b) => a.score - b.score)

  return [ sortedScores ]

}


export { useScoreListener }