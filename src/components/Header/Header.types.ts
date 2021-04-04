import { LocationDict } from '../Pictures/Picture.types';

interface HeaderProps {
  title: string;
  pictures: LocationDict;
}

interface NavItemProps {
  buttonName: string;
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
}

export type { HeaderProps, NavItemProps, DropDownMenuProps, DropDownItemProps}