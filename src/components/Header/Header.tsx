import React, { useEffect, useState, useContext } from 'react'
import { useStopwatch } from '../../hooks/Stopwatch';
import { HeaderProps, NavItemProps, DropDownMenuProps, DropDownItemProps } from './Header.types';
import './Header.css';
// import { InventoryContext } from '../../App';

export const Header: React.FC<HeaderProps> = ({title, pictures}) => {
  // const [ inventory, setInventory ] = useContext(InventoryContext)
  const [ count, setCount ] = useState<number>(100);
  const [ shouldStop, setShouldStop ] = useState(false)
  const [ time, formattedTime ] = useStopwatch(0, 1000, shouldStop, 0)

  useEffect(() => {
    const remaining = Object.keys(pictures).reduce((accum, value): number => {
      if (!pictures[value].found) return accum +1;
      return accum + 0;
    }, 0);
    console.log(`${remaining} remaining`)
    setCount(remaining);
  }, [pictures])

  useEffect(() => {
    if (count === 0) {
      setShouldStop(true);
    }
  },[count])

  return (
    <nav className="navbar">
      <ul className={"navbar-nav"}>
        {/* <Timer /> */}
        <NavItem buttonName={formattedTime} />
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

export const DropDownMenu: React.FC<DropDownMenuProps> = React.memo(({ pictures }) => {
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
})

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