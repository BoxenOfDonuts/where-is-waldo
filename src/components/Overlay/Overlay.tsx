import React, { useEffect, useRef, useState, useContext } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../Firebase";
import { FirebaseUtil } from "../Firebase/Firebase.types";
import './Overlay.css';


type highScoreArray = [
  {
    name: string;
    score: number;
    submitTime: {}
  }
]

interface OverlayProps {
  timeToComplete: number|null;
  score?: number|null;
  leaderboard?: {name: string, score: string, timestamp: Date}[]
  resetGame?: () => void;
}

interface FormProps {
  childRef: React.MutableRefObject<any>;
}



const Overlay: React.FC<OverlayProps> = ({ leaderboard, timeToComplete, resetGame }): JSX.Element => {
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

  let content = <></>;
  if (!didSubmit) {
    content = (
      <>
        <p>{`Time Taken: ${timeToComplete} seconds!`}</p>
        <Form childRef={formRef}/>
        <button onClick={resetGame}>{'Cancel'}</button>
        {/* <Link to="/leaderboard" >
          <button onClick={handleFormSubmit}>{'Submit'}</button>
        </Link> */}
        <button onClick={handleFormSubmit}>{'Submit'}</button>

      </>
    )
  } else {
    content = (
      <>
        {didSubmit && <Redirect to="/leaderboard" /> }
        <ul className="leader-board">
          {leaderboard?.map(value => {
            const { name, score, timestamp } = value;
            return <LeaderBoardItem key={timestamp} name={name} score={score} />
          })}
        </ul>
      </>
    )
  }

  return (
    <>
      <div className="blur-background">
        <div className="popup-wrapper" style={{position: 'absolute', zIndex: 2, top: '25%', left: '50%', backgroundColor: 'white'}}>
          {content}
        </div>
      </div>
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

const LeaderBoardItem: React.FC<any> = ({ name, score }): JSX.Element => {
  return (
    <li className="score-item">
      <div className="names">
        {name}
      </div>
      <div className="score">
        {score}
      </div>
    </li>
  );
}

export { Overlay };