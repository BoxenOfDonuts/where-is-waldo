import React from 'react';
import { FirebaseProps } from './Firebase.types'

const FirebaseContext = React.createContext<FirebaseProps|null>(null);

export const withFirebase = (Component: React.ComponentType<FirebaseProps>) => (props: any) => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)

export default FirebaseContext;