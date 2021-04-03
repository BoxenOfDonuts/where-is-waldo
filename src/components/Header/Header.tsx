import React, { ReactElement, useEffect, useState } from 'react'
import { LocationDict } from '../Pictures/Picture.types';
import { pictures } from '../Pictures/Picture';

import './Header.css';

interface HeaderProps {
  title: string;
  pictures?: LocationDict
}

export const Header: React.FC<HeaderProps> = ({title}) => {
  const navClassName = 'nav-item';

  return (
    <nav className="navbar">
      <ul className={"navbar-nav"}>
        <NavItem buttonName={'Counter'}/>
        <NavItem buttonName={'HOME'}/>
        <NavItem buttonName={'Content'}>
          <DropDownMenu />
        </NavItem>
      </ul>
    </nav>
  );
}


interface NavItemProps {
  buttonName: string;
}

export const NavItem: React.FC<NavItemProps> = ({ buttonName, children }) => {
  const [ open, setOpen ] = useState(false);

  const closeDropdown = () => {
    setOpen(!open)
  }

  return (
    <li
      className="nav-item"
      onClick={() => setOpen(!open)}
    >
      <div className='icon-name' >
        {buttonName}
      </div>
      {open && children}
    </li>
  );
}



interface DropDownMenuProps {
  children?: React.ReactNode
  closeDropdown?: any;
}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({}) => {
  const items = Object.keys(pictures).map(value => {
    const name = pictures[value].name;
    return (
      <DropDownItem key={name} >
        {name}
      </DropDownItem>
    );
  })

  useEffect(() =>{
    console.log('mounted')

    return () => {
      console.log('unmounted')
    }
  })

  return (
    <div className="dropdown">
      {items}
    </div>
  );
}

const DropDownItem: React.FC<DropDownMenuProps> = ({children}) => {
  return (
    <div className='dropdown-item'>
      {children}
    </div>
  );
}