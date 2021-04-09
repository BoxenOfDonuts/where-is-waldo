import { Location, LocationDict } from './Picture.types';

const Picture = (name: string, yStart: number, yEnd:number, xStart:number, xEnd:number): Location => {
  const data = {
    name,
    yStart,
    yEnd,
    xStart,
    xEnd,
    found: false,
  }
  
  return {
    ...data
  }
}

const waldo: Location = Picture('Waldo', 388, 410, 800, 820);
const purple: Location = Picture('Purple', 400, 420, 1895, 1915);
const orange: Location = Picture('Orange', 0, 20, 50, 70);

// probably needs to be an array unless they have to click "who" they're guessing
const pictures: LocationDict = {
  Purple: purple,
  Waldo: waldo,
  Orange: orange,
}

export { pictures }