import React, { useEffect, useRef, useState } from "react";
import { convertToObject } from "typescript";
import { FirebaseUtils } from "../../helpers/FirebaseUtils";
import './Overlay.css';

interface OverlayProps {
  time: number|string;
  resetGame: () => void;
}

interface FormProps {
  time?: number|string;
  resetGame: () => void;
  childRef: React.MutableRefObject<any>;
}

const Overlay: React.FC<OverlayProps> = ({ time, resetGame }): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async () => {
    console.log('clicking stuff here')
    const {current} = formRef;
    console.log(current)
    if (formRef.current) {
      console.log(formRef.current.name)
      const name = formRef.current.name;
      const userId = FirebaseUtils.getUserId();
      const r = await FirebaseUtils.onNameSubmit(name, time, userId);
      console.log(r);
    }
  }

  return (
    <>
      <div className="blur-background">
        <div className="popup-wrapper" style={{position: 'absolute', zIndex: 2, top: '25%', left: '50%', backgroundColor: 'white'}}>
          <p>{`Time Taken: ${time} seconds!`}</p>
          <Form time={time} resetGame={resetGame} childRef={formRef}/>
          <button onClick={resetGame}>{'Cancel'}</button>
          <button onClick={handleFormSubmit}>{'Submit'}</button>
        </div>
      </div>
    </>
  );
}

const Form: React.FC<FormProps> = ({ time, resetGame, childRef }): JSX.Element => {
  const [ name, setName ] = useState<string>('');
  const [ didSubmit, setDidSubmit ] = useState<Boolean>(false)

  useEffect(() => {
    if (!name) return;
    console.log(`use effect: ${name}`)
    childRef.current = name;
  }, [name])
  
  // const submitName = async (e: any) => {
    
  //   e.preventDefault();
  //   console.log(e)
  //   console.log('uh')
  //   const userId = FirebaseUtils.getUserId()
  //   const r = await FirebaseUtils.onNameSubmit(name, time, userId);
  //   console.log(r);
  //   resetGame();
  //   // setDidSubmit(true);
  // }
  
  const handleChange = (key: number, value: string) => {
    console.log(`handle change: ${value}`)
    setName(value);
  }

  return (
    <form>
      <label htmlFor={"name"}></label>
      <Input handleChange={handleChange} initialKey={0} InitialValue={name} id={"name"} />
      {/* <button onClick={resetGame}>{'Cancel'}</button> */}
      {/* <button>Submit</button> */}
      <button>{'Submit'}</button>
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