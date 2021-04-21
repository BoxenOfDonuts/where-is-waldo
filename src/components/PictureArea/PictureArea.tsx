import React, { useState } from 'react';
// import { pictures } from '../Pictures/Picture';
import { Selector } from '../Selector/Selector';
import { AppProps, Props } from './PictureArea.types';
import Image from '../../Images/beach_waldo.png'
import './PictureArea.css';


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

export const PictureArea: React.FC<AppProps> = React.memo(({ pictures, updateInventory }) => {
  const [ clicked, setClick ] = useState<boolean>(false)
  const [ clickedCoordinates, setClickedCoordinates ] = useState<number[]>([0,0])
  
  const didHit = (x:number ,y: number, guess: string ): boolean => {
    // return if somehow not in the dict
    if (pictures[guess] === undefined) {
      console.error("Guess Doesn't Exist");
      return false;
    }
    const picture = pictures[guess];
    
    if ((y >= picture.yStart && y <= picture.yEnd) && (x >= picture.xStart && x <= picture.xEnd)) {
      console.log(`hit the box! ${picture.name}`);
        // return true;
        updateInventory(picture.name);
        return true;
    }
    return false;
  }

  const onMouse = (guess: string) => {
    // const [x, y] = [e.clientX, e.clientY];
    const [ x, y ] = clickedCoordinates; 
    console.log(x, y);
    console.log(didHit(x,y, guess));
    setClickedCoordinates([0,0]);
  };

  const calculateOffset = (x: number, y: number, offset: DOMRect): number[] => {
    const offsetX = x - offset.left;
    const offsetY = y - offset.top;
    return [offsetX, offsetY];
  }

  const openDropdown = (e: React.MouseEvent<HTMLElement>) => {
    setClick(clicked => !clicked);
    const [x , y] = calculateOffset(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
    setClickedCoordinates([x, y]);
  }

  return (
    <div
      className="image-container"
      onClick={openDropdown}
      style={{position:'relative'}}
    >
      {clicked && <Selector
      list={pictures}
      onMouse={onMouse}
      location={clickedCoordinates}
    />}
      <img src={Image} alt={'where is waldo'} />
  </div>

  );
})

export default PictureArea;