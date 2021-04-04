import React, { useEffect, useState } from 'react'
import { HeaderProps, NavItemProps, DropDownMenuProps, DropDownItemProps } from './Header.types';
import './Header.css';

export const Header: React.FC<HeaderProps> = ({title, pictures}) => {
  const [ count, setCount ] = useState<number>(Object.keys(pictures).length);
  useEffect(() => {
    const remaining = Object.keys(pictures).reduce((accum, value): number => {
      if (!pictures[value].found) return accum +1;
      return accum + 0;
    }, 0);
    setCount(remaining);
  }, [pictures])
  
  return (
    <nav className="navbar">
      <ul className={"navbar-nav"}>
        <NavItem buttonName={'Home'}/>
        <NavItem buttonName={`Remaining ${count}`}>
          <DropDownMenu pictures={pictures} />
        </NavItem>
      </ul>
    </nav>
  );
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

export const DropDownMenu: React.FC<DropDownMenuProps> = ({ pictures }) => {
  const items = Object.keys(pictures).map(value => {
    const name = pictures[value].name;
    const found = pictures[value].found;
    return (
      <DropDownItem key={name} found={found} >
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

const DropDownItem: React.FC<DropDownItemProps> = ({children, found}) => {
  let classname = 'dropdown-item';
  classname = found ? classname += ' found-picture': classname;
  return (
    <div className={classname}>
      {children}
    </div>
  );
}