import firebase from 'firebase';

interface FirebaseProps {
  firebase: firebase.app.App
}

type FirebaseUtil = {
  setTime: (action: string, time: number) => Promise<boolean>;
  signIn: () => Promise<any>;
  updateHighScores: (name: string, score: number) => boolean;
  getTime: () => Promise<{startTime: number, endTime: number}>
  scores: {name: string, score: number, id: string, timestamp: Date}[];
}

export type { FirebaseProps, FirebaseUtil }