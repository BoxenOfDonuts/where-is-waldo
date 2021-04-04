import './App.css';
import { Header } from './components/Header/Header';
import { pictures } from './components/Pictures/Picture';
import { PictureArea } from './components/PictureArea/PictureArea';
import React, { useState } from 'react';

// const PictureContext = React.createContext([inventory, setInventory]);

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
    <div className="App">
      {/* not sure pictures are needed to be passed to the header */}
      {/* <PictureContext.Provider value={[inventory, setInventory]} > */}
        <Header title={"Where Is Waldo"} pictures={inventory} />
        <PictureArea pictures={inventory} updateInventory={updateInventory} />
      {/* </PictureContext.Provider> */}
    </div>
  )
};

export default App;
