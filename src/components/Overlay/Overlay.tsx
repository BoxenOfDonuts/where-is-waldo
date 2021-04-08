import React, { useState } from "react";

interface OverlayProps {
  time: string;
  resetGame: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ time, resetGame }): JSX.Element => {
  
  return (
    <>
      <div className="blur-background">
        <div className="popup-wrapper" style={{position: 'absolute', zIndex: 2, top: '25%', left: '50%', backgroundColor: 'white'}}>
          <p>{"Game Over!"}</p>
          <p>{`Time Taken: ${time}`}</p>
          <Form />
          <button onClick={resetGame}>{'Play Again?'}</button>
        </div>
      </div>
    </>
  );
}

const Form: React.FC = (): JSX.Element => {
  const InitialValue = 'A';
  const [ initials, setInitials ] = useState<string[]>(['A', 'A', 'A']);
  const [ didSubmit, setDidSubmit ] = useState<Boolean>(false)

  // cant get typescript to work here :(
  const autoTab = (e: any) => {
    const regex = new RegExp('^[A-Za-z]$');
    const { key, currentTarget} = e;
    if (!regex.test(key)) return;
    if (currentTarget.nextElementSibling) {
      currentTarget.nextElementSibling.focus()
    }
  }

  const submitName = (e: any) => {
    e.preventDefault();
    console.log(initials.join(''))
    setDidSubmit(true);
  }

  const handleChange = (key: number, value: string) => {
    const newInitials = [...initials];
    newInitials[key] = value;
    console.log(key, value, newInitials)
    setInitials(newInitials);
  }

  const action = didSubmit ? 'Play Again!': 'Submit'

  return (
    <form onSubmit={submitName}>
      <Input autoTab={autoTab} handleChange={handleChange} initialKey={0} InitialValue={InitialValue} />
      <Input autoTab={autoTab} handleChange={handleChange} initialKey={1} InitialValue={InitialValue} />
      <Input autoTab={autoTab} handleChange={handleChange} initialKey={2} InitialValue={InitialValue} />
      <button>{action}</button><br/>
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
      maxLength={1}
      onClick={blankValue}
      onFocus={blankValue}
      onChange={(e) => handleChange(initialKey, e.target.value)}
      onKeyUp={autoTab}
    />
  );
}

export { Overlay };