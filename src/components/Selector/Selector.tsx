import { LocationDict } from '../Pictures/Picture.types';
import { CSSProperties, useEffect, useState } from 'react';
import './Selector.css';

interface SelectorProps {
  list: LocationDict;
  onMouse: (name: string) => void;
  location: number[];
}

export const Selector: React.FC<SelectorProps> = ({ list, onMouse, location }) => {
  const [x ,y] = location;
  const [ dropdownCoordinates, setDropdownCoordinates ] = useState({x, y})

  
  const setPosition = (x: number, y: number): number[] => {
    const width = document.body.clientWidth;
    // const height = document.body.clientHeight;
    if (x + 155 > width) {
      x = width - 155;
    }  
    return [x, y];
  }
  
  useEffect(() => {
    console.log('render')
    const [ x, y ] = setPosition(dropdownCoordinates.x, dropdownCoordinates.y);
    setDropdownCoordinates({x, y});
    
  },[location])

  const style: CSSProperties = {
    position: 'absolute',
    top: dropdownCoordinates.y,
    left: dropdownCoordinates.x,
    zIndex: 1,
  }

  const dropdownItems = Object.keys(list).map(value => {
    const name = list[value].name
    let classname =  "picture-name"
    classname = list[value].found
     ?  classname += ' found-picture'
     : classname
    
    return (
      <li
        className={classname}
        onClick={() => onMouse(name)}
      >
        {name}
      </li>)
     
  })

  return (
    <div className="selector-wrapper" style={style}>
      <ul className="selector">
        {dropdownItems}
      </ul>
    </div>
  );
}