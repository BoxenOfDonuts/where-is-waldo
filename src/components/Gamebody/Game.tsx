import { PictureArea } from '../PictureArea/PictureArea';
import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from "../Firebase";
import { NameForm, Overlay } from '../Overlay/Overlay';
import { FirebaseUtil } from "../Firebase/Firebase.types";
import { Header } from '../Header/Header';
import { AppProps, GameProps } from './Game.types';

const Game: React.FC<GameProps> = ( {inventory, updateInventory} ) => {
  return (
    <>
      <Header
        title={"Where Is Waldo"}
        pictures={inventory}
      />
      <Gamebody
        pictures={inventory}
        updateInventory={updateInventory}
      >
      </Gamebody>
    </>
  );
}

const Gamebody: React.FC<AppProps> = ({pictures, updateInventory}) => {
  const firebase = useContext<FirebaseUtil>(FirebaseContext);
  const [ gameOver, setGameOver ] = useState<boolean>(false)
  const [ timeToComplete, setTimeToComplete ] = useState<number|null>(null);

  useEffect(() => {
    firebase.signIn().then(r =>
      firebase.setTime('startTime', Date.now())
    );
  },[])

  useEffect(() => {
    if (!pictures) return;
    const remaining = Object.keys(pictures).reduce((accum, value): number => {
      if (!pictures[value].found) return accum +1;
      return accum + 0;
    }, 0);
    if (remaining === 0) {
      firebase.setTime('endTime', Date.now());
      setGameOver(true);
    };
  },[pictures]);

  useEffect(() => {
    if (!gameOver) return
    const calculateScore = async () => {
      const now = Date.now()
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
      {gameOver && <Overlay>
          <NameForm timeToComplete={timeToComplete} />
        </Overlay>}      
  </div>
  );
}

export default Game;