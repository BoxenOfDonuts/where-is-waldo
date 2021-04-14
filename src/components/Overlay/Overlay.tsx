import React, { useState } from "react";
import './Overlay.css';

interface OverlayProps {
  time: number|string;
  resetGame: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ time, resetGame }): JSX.Element => {
  
  return (
    <>
      <div className="blur-background">
        <div className="popup-wrapper" style={{position: 'absolute', zIndex: 2, top: '25%', left: '50%', backgroundColor: 'white'}}>
          <p>{`Time Taken: ${time} seconds!`}</p>
          <Form />
          <button onClick={resetGame}>{'Cancel'}</button>
          <button onClick={resetGame}>{'Submit'}</button>
        </div>
      </div>
    </>
  );
}

const Form: React.FC = (): JSX.Element => {
  const [ name, setName ] = useState<string>('');
  const [ didSubmit, setDidSubmit ] = useState<Boolean>(false)

  const submitName = (e: any) => {
    e.preventDefault();
    
    setDidSubmit(true);
  }

  const handleChange = (key: number, value: string) => {
    setName(value);
  }

  return (
    <form onSubmit={submitName}>
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