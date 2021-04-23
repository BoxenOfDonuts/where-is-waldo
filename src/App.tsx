import './App.css';
import { Header } from './components/Header/Header';
import { pictures } from './components/Pictures/Picture';
import { PictureArea } from './components/PictureArea/PictureArea';
import { useStopwatch } from './hooks/Stopwatch';
import React, { useState, useEffect } from 'react';
import { Overlay } from './components/Overlay/Overlay';
import { FirebaseUtils } from './helpers/FirebaseUtils';
import Game from './helpers/Game';


// const PictureContext = React.createContext([inventory, setInventory]);
type highScoreArray = [
  {
    name: string;
    score: number;
    submitTime: {}

  }
]

const App: React.FC = () => {
  const [ inventory, setInventory ] = useState(pictures);
  const [ gameOver, setGameOver ] = useState<boolean>(false);
  const [ gameCount, setGameCount ] = useState<number>(0)
  // move this down then lift when needed?
  const [ time, formattedTime ] = useStopwatch(0, 1000, gameOver, gameCount);
  const  [ score, setScore ] = useState<number|null>(null)

  useEffect(() => {
    // setup login listener and do all this in there?
    FirebaseUtils.initFirebaseAuth();
    FirebaseUtils.signIn().then(
      // logged in?
    ).catch(error => {
      console.log(`error signing in ${error}`)
    })
  }, [])

  useEffect(() => {
    if (gameOver) {
      Game.getScore().then(score => setScore(score))
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

  const submitHighScore = async (name: string, score: number) => {
    const response = await FirebaseUtils.addScore(name, score);
    console.log(response)

  }

  const getHighScores = async () => {
    const scores: highScoreArray = await FirebaseUtils.getHighScores();
    console.log(scores)
    const sortedScores = scores.sort((a, b) => a.score - b.score);
    console.log(sortedScores)
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
      {gameOver && <Overlay time={time} score={score} resetGame={resetGame} />}
    </div>
      <button onClick={() => submitHighScore('Test', 19)}>Submit Score</button>
      <button onClick={getHighScores}>Get Score</button>
      <button onClick={Game.getLeaderboard}>Get Times</button>
    </>
  )
};

export default App;
