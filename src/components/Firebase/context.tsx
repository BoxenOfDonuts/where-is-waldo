import React from 'react';
import firebase from 'firebase'

interface FirebaseProps {
  firebase: firebase.app.App
}

const FirebaseContext = React.createContext<firebase.app.App|null>(null);

export const withFirebase = (Component: React.ComponentType<FirebaseProps>) => (props: any) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export type {FirebaseProps}

export default FirebaseContext;