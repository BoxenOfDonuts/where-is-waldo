import { LocationDict } from '../Pictures/Picture.types';

interface Props {
  color: string;
  width?: string;
  extra?: {} | undefined
  children?: React.ReactNode
}

interface AppProps {
  pictures: LocationDict;
  updateInventory: (item: string) => void
}

export type { Props, AppProps }