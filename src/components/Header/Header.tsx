import React, { useEffect, useState } from 'react'
import { useStopwatch } from '../../hooks/Stopwatch';
import { HeaderProps, NavItemProps, DropDownMenuProps, DropDownItemProps } from './Header.types';
import './Header.css';

export const Header: React.FC<HeaderProps> = ({title, pictures, stopwatch}) => {
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
        {/* <Timer /> */}
        <NavItem buttonName={stopwatch} />
        <NavItem buttonName={`Remaining ${count}`} classes={['clickable']}>
          <DropDownMenu pictures={pictures} />
        </NavItem>
      </ul>
    </nav>
  );
}

export const NavItem: React.FC<NavItemProps> = ({ buttonName, children, classes }) => {
  const [ open, setOpen ] = useState(false);

  const closeDropdown = () => {
    setOpen(!open)
  }

  let clasname = 'nav-item ';
  if (classes) {
    clasname = [...classes, clasname].join(' ');
  }

  return (
    <li
      className={clasname}
      onClick={() => setOpen(!open)}
    >
      <div className={''} >
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

const DropDownItem: React.FC<DropDownItemProps> = ({children, found, leftIcon, rightIcon}) => {
  let classname = 'dropdown-item';
  classname = found ? classname += ' found-picture': classname;
  return (
    <div className={classname}>
      {leftIcon && <span className="left-icon">{leftIcon}</span>}
        {children}
      {rightIcon && <span className="right-icon">{rightIcon}</span>}
    </div>
  );
}

const Timer: React.FC = () => {
  // const [ time, formattedTime ] = useStopwatch(0, 1000);
  const [ time, formattedTime ] = useStopwatch(0, 1000, false);

  return (
    <>
      <NavItem buttonName={formattedTime}/>
    </>
  );
}