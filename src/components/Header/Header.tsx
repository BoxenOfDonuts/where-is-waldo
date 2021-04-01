import React from 'react'
import { LocationDict } from '../Pictures/Picture.types';
import './Header.css';

interface HeaderProps {
  title: string;
  pictures: LocationDict
}

export const Header: React.FC<HeaderProps> = ({title, pictures}) => {
  const navClassName = 'nav-item';

  const content = Object.keys(pictures).map(value => {
    const name = pictures[value].name
    return (
      <li
        className="dropdown-items"
      >
        {name}
      </li>)
      
  })

  return (
    <nav className="navbar">
      <ul className={"navbar-nav"}>
        <li className={navClassName}>{title}</li>
        <li className={navClassName}>
          <div className="dropdown">
            {/* need a wrapper :o */}
            {/* {true && content} */}
          </div>
          Content
        </li>
      </ul>
    </nav>
  );
}