import React, { useState } from 'react';
import './App.css';
import { pictures } from './components/Pictures/Picture'
import {Selector} from './components/Selector/Selector'

const didHit = (x:number ,y: number, guess: string ): boolean => {
  // return if somehow not in the dict
  if (pictures[guess] === undefined) {
    console.error("Guess Doesn't Exist");
    return false;
  }
  const picture = pictures[guess];

  if ((y >= picture.yStart && y <= picture.yEnd) && (x >= picture.xStart && x <= picture.xEnd)) {
        console.log(`hit the box! ${picture.name}`);
        return true;
  }

  return false;
}

interface Props {
  color: string;
  width?: string;
  extra?: {} | undefined
}

const Box: React.FC<Props> = ({ color, width = '100%', extra, children }) => {
  let style = {
    height: '200px',
    width,
    backgroundColor: color,
  };

  if (extra) {
    style = {
      ...style,
      ...extra,
    };
  }

  return (
    <div style={style}>
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [ clicked, setClick ] = useState<boolean>(false)
  const [ clickedCoordinates, setClickedCoordinates ] = useState<number[]>([0,0])


  const onMouse = (guess: string) => {
    // console.log(e.clientX, e.clientY);
    // const [x, y] = [e.clientX, e.clientY];
    const [ x, y ] = clickedCoordinates; 
    console.log(didHit(x,y, guess));
    setClickedCoordinates([0,0]);
  };

  const openDropdown = (e: React.MouseEvent<HTMLElement>) => {
    setClick(clicked => !clicked)
    const [x, y] = [e.clientX, e.clientY];
    setClickedCoordinates([x, y]);
  }

  return (
    <div
      className="App"
      // onClick={(e) => onMouse(e, 'Purple')}
      onClick={openDropdown}
    >
      <Box color="red" />
      <Box color="blue">
        <Box color="yellow" width="20px" extra={{ height: '20px' }} />
      </Box>

      <Box color="green">
        <Box color="purple" width="20px" extra={{ float: 'right', height: '20px' }} />
      </Box>
      {clicked && <Selector
        list={pictures}
        onMouse={onMouse}
      />}
    </div>
  )
};

export default App;
