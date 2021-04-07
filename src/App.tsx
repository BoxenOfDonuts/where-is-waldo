import './App.css';
import { Header } from './components/Header/Header';
import { pictures } from './components/Pictures/Picture';
import { PictureArea } from './components/PictureArea/PictureArea';
import { useStopwatch } from './hooks/Stopwatch';
import React, { useState, useEffect } from 'react';

// const PictureContext = React.createContext([inventory, setInventory]);

const App: React.FC = () => {
  const [ inventory, setInventory ] = useState(pictures);
  const [ gameOver, setGameOver ] = useState<boolean>(false);
  const [ time, formattedTime ] = useStopwatch(0, 1000, gameOver);

  useEffect(() => {
    const remaining = Object.keys(inventory).reduce((accum, value): number => {
      console.log(accum)
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

  return (
    <div className="App">
        <Header
          title={"Where Is Waldo"}
          pictures={inventory}
          stopwatch={formattedTime}
        />
        {false &&<PictureArea
          pictures={inventory}
          updateInventory={updateInventory}
        />}
        <Overlay time={formattedTime} />
    </div>
  )
};

interface TimeProps {
  time: string;
}

const Overlay: React.FC<TimeProps> = ({ time }): JSX.Element => {
  const value = 'A';

  const autoTab = (): void => {
    // todo
  }
  
  return (
    <div className="popup-wrapper">
      <p>{"Game Over!"}</p>
      <p>{`Time Taken: ${time}`}</p>
      <Input autoTab={autoTab} InitialValue={value} />
      <Input InitialValue={value} />
      <Input InitialValue={value} />
    </div>
  );
}

const Input: React.FC<any> = ({ InitialValue, autoTab }): JSX.Element => {
  const [ valueDict, setValueDict ] = useState<{value: string, updated: boolean}>({ value: InitialValue, updated: false})

  const blankValue = () => {
    if (valueDict.value === InitialValue && !valueDict.updated ) {
      setValueDict({
        value: '',
        updated: true,
      });
    }
    return;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setValueDict({...valueDict, value,});
  }

  return (
    <input type="text"
      value={valueDict.value}
      maxLength={1}
      onClick={blankValue}
      onFocus={blankValue}
      onChange={handleChange}
      onKeyUp={autoTab}
    />
  );
}

export default App;
