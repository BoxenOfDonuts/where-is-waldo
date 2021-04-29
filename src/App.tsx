import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import Game from './components/Gamebody/Game';
import { LocationDict } from './components/Pictures/Picture.types';
import { FirebaseContext } from "./components/Firebase";
import { FirebaseUtil } from "./components/Firebase/Firebase.types";
import { pictures } from './components/Pictures/Picture';
import Leaderboard  from './components/Leaderboard/Leaderboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

const App: React.FC = () => {
  const firebase = useContext<FirebaseUtil>(FirebaseContext);
  const [ inventory, setInventory ] = useState<LocationDict>(pictures);
  const [ loading, setLoading ] = useState(true);

  const updateInventory = (item: string) => {
    setInventory({
      ...inventory,
      [item]: {
        ...inventory[item],
        found: true,
      }
    })
  }

  const resetGame = () => {
    firebase.getCharacterLocation().then((data) => {
      setInventory(data);
      setLoading(false);
    })
  }

  useEffect(() => {
    firebase.getCharacterLocation().then((data) => {
      setInventory(data);
      setLoading(false);
    })
  },[])
  
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home isDisabled={loading}/>
          </Route>
          <Route path="/where-is-waldo" >
            <Game inventory={inventory} updateInventory={updateInventory} />
          </Route>
          <Route path="/leaderboard">
            <Leaderboard />
          </Route>
        </Switch>
      </Router>
    </>
  )
};


const Home: React.FC<{isDisabled: boolean}> = ({ isDisabled })  => {
  return (
    <Link to="/where-is-waldo" >
      <button disabled={isDisabled} className='btn' >Start</button>
    </Link>
  );
}

export default App;