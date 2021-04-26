import { PictureArea } from '../PictureArea/PictureArea';
import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext, withFirebase } from "../Firebase";
import { LocationDict } from '../Pictures/Picture.types';
import { Overlay } from '../Overlay/Overlay';
import { InventoryContext } from '../../App';
import { useScoreListener } from '../../hooks/ScoreListener';
import { FirebaseUtil } from "../Firebase/Firebase.types";

interface AppProps {
  pictures: LocationDict;
  updateInventory: (item: string) => void
}


const Gamebody: React.FC<AppProps> = ({pictures, updateInventory}) => {
  const firebase = useContext<FirebaseUtil>(FirebaseContext);
  const [ inventory, setInventory ] = useContext(InventoryContext)
  const [ gameOver, setGameOver ] = useState<boolean>(false)
  const [ timeToComplete, setTimeToComplete ] = useState<number|null>(null);
  const [ scores ] = useScoreListener(firebase);

  useEffect(() => {
    firebase.signIn().then(r =>
      firebase.setTime('startTime', Date.now())
    );
  },[])

  useEffect(() => {
    console.log(inventory)
    const remaining = Object.keys(inventory).reduce((accum, value): number => {
      if (!inventory[value].found) return accum +1;
      return accum + 0;
    }, 0);
    if (remaining === 0) {
      firebase.setTime('endTime', Date.now());
      setGameOver(true);
    };
  }, [inventory]);

  useEffect(() => {
    if (!gameOver) return

    const calculateScore = async () => {
      const now = Date.now()
      console.log(now)
      const playerTimes = await firebase.getTime()
      const score =  Math.round((now - playerTimes?.startTime) / 1000)
      setTimeToComplete(score);
    }
    calculateScore();

  },[gameOver])

  return (
    <div className="App" style={{position: 'relative'}}>
      {true &&<PictureArea
        pictures={pictures}
        updateInventory={updateInventory}
        />}
      {gameOver && <Overlay timeToComplete={timeToComplete} leaderboard={scores}/>}      
  </div>
  );
}

export default Gamebody;