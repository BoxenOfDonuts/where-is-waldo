import firebase from 'firebase';
import { LocationDict } from '../Pictures/Picture.types';

interface FirebaseProps {
  firebase: firebase.app.App
}

type FirebaseUtil = {
  setTime: (action: string, time: number) => Promise<boolean>;
  signIn: () => Promise<any>;
  updateHighScores: (name: string, score: number) => boolean;
  getTime: () => Promise<{startTime: number, endTime: number}>
  setCharacterLocation: (name: string, xStart: number, xEnd: number, yStart: number, yEnd: number) => void
  getCharacterLocation: () => Promise<LocationDict>
  scores: {name: string, score: number, id: string, timestamp: Date}[];
}

export type { FirebaseProps, FirebaseUtil }