import './App.css';
import { Header } from './components/Header/Header';
import { pictures } from './components/Pictures/Picture';
import React, { useState } from 'react';
import Gamebody from './components/Gamebody/Gamebody';

const App: React.FC = () => {
  const [ inventory, setInventory ] = useState(pictures);


  const updateInventory = (item: string) => {
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
  )
};

export default App;