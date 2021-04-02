import React, { ReactElement, useState } from 'react'
import { LocationDict } from '../Pictures/Picture.types';
import './Header.css';

interface HeaderProps {
  title: string;
  pictures: LocationDict
}

export const Header: React.FC<HeaderProps> = ({title, pictures}) => {
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

  // const content = Object.keys(pictures).map(value => {
  //   const name = pictures[value].name
  //   return (
  //     <li
  //       className="nav-item"
  //     >
  //       {name}
  //     </li>)
      
  // })

    return (
      <li
        className="nav-item"
        onClick={() => setOpen(!open)}
      >
        {buttonName}
        {open && children}
      </li>
    );
}



interface DropDownMenuProps {

}

export const DropDownMenu: React.FC<DropDownMenuProps> = ({children}) => {
  const DropDownItem(children) = {
    // handle each picture here?
  }
    return (
      <div className="dropdown-item">
        {children}
      </div>
    );
}