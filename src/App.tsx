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
  Redirect,
} from "react-router-dom";
import { Overlay } from './components/Overlay/Overlay';

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
            <Landing isLoading={loading} />
            {/* {!loading && <Redirect to="/where-is-waldo" />} */}
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

const Landing: React.FC<{isLoading: boolean}> = ({ isLoading }) => {
  const [ play, setPlay ] = useState(false);
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    if (isLoading) {
      setMessage('Loading...');
    } else {
      setMessage('Ready!');
    }

  },[isLoading])

  return (
    <Overlay>
      <div className="loading-wrapper">
        <h2>{message}</h2>
        {!isLoading && <button onClick={() => setPlay(true)}>Start</button>}
        {play && <Redirect to="/where-is-waldo" />}
      </div>
    </Overlay>
  );
}

export default App;