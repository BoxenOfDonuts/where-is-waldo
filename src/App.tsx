import './App.css';
import { Header } from './components/Header/Header';
import React, { useContext, useEffect, useState } from 'react';
import Gamebody from './components/Gamebody/Gamebody';
import { LocationDict } from './components/Pictures/Picture.types';
import { FirebaseContext } from "./components/Firebase";
import { FirebaseUtil } from "./components/Firebase/Firebase.types";
import { pictures } from './components/Pictures/Picture';

const App: React.FC = () => {
  const firebase = useContext<FirebaseUtil>(FirebaseContext);
  const [ inventory, setInventory ] = useState<LocationDict>(pictures);

  const updateInventory = (item: string) => {
    if(!inventory) return;
    setInventory({
      ...inventory,
      [item]: {
        ...inventory[item],
        found: true,
      }
    })
  }

  useEffect(() => {
    firebase.getCharacterLocation().then((data) => {
      setInventory(data);
    })
  },[])
  
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