import React, { useEffect, useRef, useState } from "react";
import { FirebaseUtils } from "../../helpers/FirebaseUtils";
import Game from "../../helpers/Game";
import './Overlay.css';

type highScoreArray = [
  {
    name: string;
    score: number;
    submitTime: {}
  }
]

interface OverlayProps {
  time: number|string;
  score: number|null;
  resetGame: () => void;
}

interface FormProps {
  childRef: React.MutableRefObject<any>;
}

const Overlay: React.FC<OverlayProps> = ({ score, time, resetGame }): JSX.Element => {
  const [ didSubmit, setDidSubmit ] = useState<boolean>(false);
  const [ leaderboard, setLeaderboard ] = useState<highScoreArray|null>(null)
  const [ test, setTest ] = useState(FirebaseUtils.updateHighScores())

  useEffect(() => {
    FirebaseUtils.initHighScores();
  },[])

  const formRef = useRef<HTMLFormElement>();

  const handleFormSubmit = () => {
    let name = formRef.current ? formRef.current : 'anonymous'
    if (FirebaseUtils.addScore(name, score)) {
      setDidSubmit(true);
      Game.getLeaderboard().then(leaderboard => setLeaderboard(leaderboard))
    }

  }

  let content = <></>;
  if (!didSubmit) {
    content = (
      <>
        <p>{`Time Taken: ${time} seconds!`}</p>
        <Form childRef={formRef}/>
        <button onClick={resetGame}>{'Cancel'}</button>
        <button onClick={handleFormSubmit}>{'Submit'}</button>
      </>
    )
  } else {
    content = (
      <>
        <ul className="leader-board">
          {leaderboard?.map(value => {
            const { name, score } = value;
            return <LeaderBoardItem key={value} name={name} score={score} />
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
    console.log(`use effect: ${name}`)
    childRef.current = name;
  }, [name])

  const handleChange = (key: number, value: string) => {
    console.log(`handle change: ${value}`)
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