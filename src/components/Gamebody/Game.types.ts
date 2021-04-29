import { LocationDict } from "../Pictures/Picture.types";

interface GameProps {
  inventory: LocationDict, 
  updateInventory: (item:string) => void
}

interface AppProps {
  pictures: LocationDict;
  updateInventory: (item: string) => void
}


export type { GameProps, AppProps }