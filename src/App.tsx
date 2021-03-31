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

  // const setPosition = (x: number, y: number): number[] => {
  //   const width = document.body.clientWidth;
  //   const height = document.body.clientHeight;
  //   if (x + 155 > width) {
  //     x = width - 155;
  //   }
  //   return [x, y];
  // }

  const openDropdown = (e: React.MouseEvent<HTMLElement>) => {
    setClick(clicked => !clicked)
    // const [x, y] = setPosition(e.clientX ,e.clientY);
    // setDropdownCoordinates([x, y])
    setClickedCoordinates([e.clientX, e.clientY]);
  }

  return (
    <div
      className="App"
      // onClick={(e) => onMouse(e, 'Purple')}
      onClick={openDropdown}
      style={{position:'relative'}}
    >
      {clicked && <Selector
        list={pictures}
        onMouse={onMouse}
        location={clickedCoordinates}
      />}
      <Box color="red">
        <Box color="orange" width="20px" extra={{ height: '20px', marginLeft: '50px' }} />
      </Box>
      <Box color="blue">
        <Box color="yellow" width="20px" extra={{ height: '20px' }} />
      </Box>
      <Box color="green">
        <Box color="purple" width="20px" extra={{ float: 'right', height: '20px' }} />
      </Box>
    </div>
  )
};

export default App;
