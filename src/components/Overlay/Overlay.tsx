import React, { useEffect, useRef, useState, useContext } from "react";
import { Redirect } from "react-router";
import { FirebaseContext } from "../Firebase";
import { FirebaseUtil } from "../Firebase/Firebase.types";
import { FormProps, OverlayProps } from "./Overlay.types";
import './Overlay.css';


const Overlay: React.FC = ({ children }): JSX.Element => {
  return (
    <>
      <div className="blur-background">
        <div className="popup-wrapper">
          {children}
        </div>
      </div>
    </>
  );
}

const NameForm: React.FC<OverlayProps> = ({ timeToComplete }): JSX.Element => {
  const [ didSubmit, setDidSubmit ] = useState<boolean>(false);
  const firebase = useContext<FirebaseUtil>(FirebaseContext);

  const formRef = useRef<string>();

  const handleFormSubmit = () => {
    let name = formRef.current ? formRef.current : 'anonymous'
    if (timeToComplete === null) return;
    if (firebase.updateHighScores(name, timeToComplete)) {
      setDidSubmit(true);
    }

  }
  return (
    <>
      {didSubmit && <Redirect to="/leaderboard" /> }
      <p>{`Time Taken: ${timeToComplete} seconds!`}</p>
      <Form childRef={formRef}/>
      <button onClick={() => setDidSubmit(true)}>{'Cancel'}</button>
      <button onClick={handleFormSubmit}>{'Submit'}</button>
    </>
  );
}

const Form: React.FC<FormProps> = ({ childRef }): JSX.Element => {
  const [ name, setName ] = useState<string>('');

  useEffect(() => {
    if (!name) return;
    childRef.current = name;
  }, [name])

  const handleChange = (key: number, value: string) => {
    setName(value);
  }

  return (
    <form onSubmit={(e) => e.preventDefault() }>
      <label htmlFor={"name"}></label>
      <Input handleChange={handleChange} initialKey={0} InitialValue={name} id={"name"} />
    </form>
  );
}

const Input: React.FC<any> = ({ InitialValue, autoTab, initialKey, handleChange }): JSX.Element => {
  const [ valueDict, setValueDict ] = useState<{value: string, updated: boolean}>({ value: InitialValue, updated: false})

  const blankValue = () => {
    if (valueDict.value === InitialValue && !valueDict.updated ) {
      setValueDict({
        value: '',
        updated: true,
      });
    }
    return;
  }

  return (
    <input type="text"
      onClick={blankValue}
      onFocus={blankValue}
      onChange={(e) => handleChange(initialKey, e.target.value)}
      onKeyUp={autoTab}
    />
  );
}

export { Overlay, NameForm };