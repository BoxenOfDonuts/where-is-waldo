import './App.css';
import { Header } from './components/Header/Header';
import { pictures } from './components/Pictures/Picture';
import { PictureArea } from './components/PictureArea/PictureArea';
import { useStopwatch } from './hooks/Stopwatch';
import React, { useState, useEffect } from 'react';
import { Overlay } from './components/Overlay/Overlay';
import { FirebaseUtils } from './helpers/FirebaseUtils';

// const PictureContext = React.createContext([inventory, setInventory]);

const App: React.FC = () => {
  const [ inventory, setInventory ] = useState(pictures);
  const [ gameOver, setGameOver ] = useState<boolean>(false);
  const [ gameCount, setGameCount ] = useState<number>(0)
  // move this down then lift when needed?
  const [ time, formattedTime ] = useStopwatch(0, 1000, gameOver, gameCount);
  const  [ score, setScore ] = useState<number|null>(null)

  useEffect(() => {
    const loginSequence = async () => {
      await FirebaseUtils.signIn()
      await FirebaseUtils.setTime('startTime', Date.now());
    }

    loginSequence()

  }, [])

  useEffect(() => {
    //just to test
    const getDiff = async () => {
      const now = Date.now()
      FirebaseUtils.setTime('endTime', now);
      const r = await FirebaseUtils.getTime();
      console.log(now, r?.startTime)
      setScore(Math.round((now - r?.startTime) / 1000))
    }
    if (gameOver) {
      getDiff()
    }
  },[gameOver])

  useEffect(() => {
    const remaining = Object.keys(inventory).reduce((accum, value): number => {
      if (!inventory[value].found) return accum +1;
      return accum + 0;
    }, 0);
    if (remaining === 0) {
      FirebaseUtils.setTime('endTime');
      setGameOver(true);
    };
  }, [inventory])

  const updateInventory = (item: string) => {
    console.log(inventory[item])
    setInventory({
      ...inventory,
      [item]: {
        ...inventory[item],
        found: true,
      }
    })
  }

  const resetGame = () => {
    setInventory(pictures);
    setGameOver(false);
    setGameCount(gameCount + 1)
  }

  const getUserId = async () => {
    const user = FirebaseUtils.getUserId();
    console.log(user)
  }

  const submitHighScore = async (name: string, score: number) => {
    // old way
    // const userId = FirebaseUtils.getUserId()
    // const r = FirebaseUtils.onNameSubmit('Joel', 9, userId)

    // new way
    const response = await FirebaseUtils.addScore(name, score);
    console.log(response)

  }

  const getHighScores = async () => {
    type highScoreArray = [
      {
        name: string;
        score: number
      }
    ]

    const scores: highScoreArray = await FirebaseUtils.getHighScores();
    console.log(scores)
    scores.forEach((value) => {
      console.log(value.name);
      console.log(value.score)
    })
  }

  return (
    <>
      <Header
        title={"Where Is Waldo"}
        pictures={inventory}
        stopwatch={formattedTime}
      />
    <div className="App" style={{position: 'relative'}}>
        {true &&<PictureArea
          pictures={inventory}
          updateInventory={updateInventory}
          />}
      {gameOver && <Overlay time={time} score={score} resetGame={resetGame}/>}
    </div>
      {/* <button onClick={() => submitHighScore('Joel', 0)}>High Score</button>
      <button onClick={getUserId}>GetUserId</button> */}
      <button onClick={() => submitHighScore('Test', 19)}>Submit Score</button>
      <button onClick={getHighScores}>Get Score</button>
    </>
  )
};

export default App;
