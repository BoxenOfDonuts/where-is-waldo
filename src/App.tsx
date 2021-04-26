import './App.css';
import { Header } from './components/Header/Header';
import { pictures } from './components/Pictures/Picture';
import { useStopwatch } from './hooks/Stopwatch';
import React, { useState, useEffect, useContext } from 'react';
import { Overlay } from './components/Overlay/Overlay';
import Gamebody from './components/Gamebody/Gamebody';
import  Firebase, { FirebaseContext, withFirebase } from './components/Firebase';


// const PictureContext = React.createContext([inventory, setInventory]);
type highScoreArray = [
  {
    name: string;
    score: number;
    submitTime: {}

  }
]

type FirebaseUtil = {
  setTime: (action: string) => Promise<boolean>;
  signIn: () => Promise<any>;
  updateHighScores: (name: string, score: number) => void;
  scores: {name: string, score: number, id: string, timestamp: Date}[];
}

const InventoryContext = React.createContext<any|null>(null);

const App: React.FC = () => {
  const [ inventory, setInventory ] = useState(pictures);


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

  return (
    <>
      <InventoryContext.Provider value={[inventory, setInventory]}>
      <Header
        title={"Where Is Waldo"}
        pictures={inventory}
        />
        <Gamebody
          pictures={inventory}
          updateInventory={updateInventory}
          >
        </Gamebody>
    {/* <div className="App" style={{position: 'relative'}}>
      {gameOver && <Overlay time={time} score={score} resetGame={resetGame} />}
    </div> */}
    </InventoryContext.Provider>
    </>
  )
};

export default App;

export {InventoryContext}