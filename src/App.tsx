import './App.css';
import { Header } from './components/Header/Header';
import { pictures } from './components/Pictures/Picture';
import { PictureArea } from './components/PictureArea/PictureArea';
import { useStopwatch } from './hooks/Stopwatch';
import React, { useState, useEffect, useRef } from 'react';
import { Overlay } from './components/Overlay/Overlay';

// const PictureContext = React.createContext([inventory, setInventory]);

const App: React.FC = () => {
  const [ inventory, setInventory ] = useState(pictures);
  const [ gameOver, setGameOver ] = useState<boolean>(false);
  const [ gameCount, setGameCount ] = useState<number>(0)
  const [ time, formattedTime ] = useStopwatch(0, 1000, gameOver, gameCount);

  useEffect(() => {
    const remaining = Object.keys(inventory).reduce((accum, value): number => {
      if (!inventory[value].found) return accum +1;
      return accum + 0;
    }, 0);
    if (remaining === 0) {
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

  return (
    <div className="App" style={{position: 'relative'}}>
        <Header
          title={"Where Is Waldo"}
          pictures={inventory}
          stopwatch={formattedTime}
        />
        {true &&<PictureArea
          pictures={inventory}
          updateInventory={updateInventory}
        />}
      {gameOver && <Overlay time={formattedTime} resetGame={resetGame}/>}
    </div>
  )
};

export default App;
