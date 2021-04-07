import { LocationDict } from '../Pictures/Picture.types';

interface HeaderProps {
  title: string;
  pictures: LocationDict;
  stopwatch: string;
}

interface NavItemProps {
  buttonName: string | number;
  classes?: string[];
}

interface DropDownMenuProps {
  children?: React.ReactNode;
  closeDropdown?: any;
  found?: boolean;
  pictures: LocationDict;
}

interface DropDownItemProps {
  children?: React.ReactNode;
  found? : boolean;
  leftIcon?: any
  rightIcon?: any
}

export type { HeaderProps, NavItemProps, DropDownMenuProps, DropDownItemProps}