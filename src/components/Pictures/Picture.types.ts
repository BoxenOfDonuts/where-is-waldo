type Location = Readonly<{
  name: string,
  xStart: number,
  xEnd: number,
  yStart: number,
  yEnd: number,
}>

type LocationDict = {
  [key:string]: Location
}

export type { Location, LocationDict }