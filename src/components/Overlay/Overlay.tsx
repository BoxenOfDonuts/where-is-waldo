import { RecordWithTtl } from "node:dns";
import { type } from "node:os";
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
          {/* <form onSubmit={submitName}>
            <Input autoTab={autoTab} InitialValue={InitialValue} />
            <Input autoTab={autoTab} InitialValue={InitialValue} />
            <Input autoTab={autoTab} InitialValue={InitialValue} />
            <button>{'Submit'}</button><br/>
          </form> */}
          <button onClick={resetGame}>{'Play Again?'}</button>
        </div>
      </div>
    </>
  );
}

const Form: React.FC = () => {
  const InitialValue = 'A';
  const [ initials, setInitials ] = useState(['A', 'A', 'A']);

  // cant get typescript to work here :(
  const autoTab = (e: any) => {
    const regex = new RegExp('^[A-Za-z]$');
    // const { key }: {key: string} = e;
    // const { currentTarget }: { currentTarget: HTMLElement} = e;
    const { key, currentTarget} = e;
    if (!regex.test(key)) return;
    if (currentTarget.nextElementSibling) {
      currentTarget.nextElementSibling.focus()
    }
  }

  const submitName = (e: any) => {
    e.preventDefault();
    const target: HTMLFormElement = e.target;
    console.log(target.elements)
  }

  const handleChange = (key: number, value: string) => {
    const newInitials = [...initials];
    newInitials[key] = value;
    console.log(key, value, newInitials)
    setInitials(newInitials);
  }

  return (
    <form onSubmit={submitName}>
      <Input autoTab={autoTab} handleChange={handleChange} initialKey={0} InitialValue={InitialValue} />
      {/* <Input autoTab={autoTab} key={1} InitialValue={InitialValue} />
      <Input autoTab={autoTab} key={2} InitialValue={InitialValue} /> */}
      <button>{'Submit'}</button><br/>
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

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const {value} = e.target;
  //   setValueDict({...valueDict, value,});
  //   isPropertySignature.
  // }



  return (
    <input type="text"
      // value={'A'}
      maxLength={3}
      onClick={blankValue}
      onFocus={blankValue}
      onChange={(e) => handleChange(initialKey, e.target.value)}
      onKeyUp={autoTab}
    />
  );
}

export { Overlay };