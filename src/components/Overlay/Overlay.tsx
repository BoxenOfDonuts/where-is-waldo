import React, { useEffect, useRef, useState } from "react";
import { FirebaseUtils } from "../../helpers/FirebaseUtils";
import './Overlay.css';

interface OverlayProps {
  time: number|string;
  score: number|null;
  resetGame: () => void;
}

interface FormProps {
  childRef: React.MutableRefObject<any>;
}

const Overlay: React.FC<OverlayProps> = ({ score, time, resetGame }): JSX.Element => {
  const formRef = useRef<HTMLFormElement>();

  const handleFormSubmit = () => {
    let name = formRef.current ? formRef.current : 'anonymous'
    if (FirebaseUtils.addScore(name, score)) {
      resetGame();
    }

  }

  return (
    <>
      <div className="blur-background">
        <div className="popup-wrapper" style={{position: 'absolute', zIndex: 2, top: '25%', left: '50%', backgroundColor: 'white'}}>
          <p>{`Time Taken: ${time} seconds!`}</p>
          <Form childRef={formRef}/>
          <button onClick={resetGame}>{'Cancel'}</button>
          <button onClick={handleFormSubmit}>{'Submit'}</button>
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

export { Overlay };