import { Location, LocationDict } from './Picture.types';

const Picture = (name: string, xStart:number, xEnd:number, yStart: number, yEnd:number): Location => {
  const data = {
    name,
    xStart,
    xEnd,
    yStart,
    yEnd,
    found: false,
  }
  
  return {
    ...data
  }
}

const waldo: Location = Picture('Waldo', 1115, 1200, 245, 325);
const wizard: Location = Picture('Wizard', 400, 450, 215, 285);
const odlaw: Location = Picture('Odlaw', 45, 76, 222, 295);

// probably needs to be an array unless they have to click "who" they're guessing
const pictures: LocationDict = {
  Wizard: wizard,
  Waldo: waldo,
  Odlaw: odlaw,
}

export { pictures }