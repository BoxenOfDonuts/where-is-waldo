import React from 'react';
import './App.css';

const purple: Location = {
  name: 'Purps',
  xStart: 1895,
  xEnd: 1915,
  yStart: 400,
  yEnd: 420,
};

const yellow: Location = {
  name: 'Yellow',
  xStart: 0,
  xEnd: 20,
  yStart: 200,
  yEnd: 220,
}


const onMouse = (e: React.MouseEvent<HTMLElement>, guess: string) => {
  console.log(e.clientX, e.clientY);
  const [x, y] = [e.clientX, e.clientY];
  // const picture = pictures['Purps'];

  console.log(didHit(x,y));

  // pictures.forEach(picture => {
    // if ((y >= picture.yStart && y <= picture.yEnd) && (x >= picture.xStart && x <= picture.xEnd)) {
    //   console.log(`hit the box! ${picture.name}`);
    // } else {
    //   console.log('miss');
    // }
  // })
};

const didHit = (x:number ,y: number ): boolean => {
  let flag = false;
  pictures.forEach(picture => {
    if ((y >= picture.yStart && y <= picture.yEnd) && (x >= picture.xStart && x <= picture.xEnd)) {
      console.log(`hit the box! ${picture.name}`);
      flag = true;
    }
  });
  // for (let i = 0; i < pictures.length; i++) {
  //   const picture = pictures[i]
  //   if ((y >= picture.yStart && y <= picture.yEnd) && (x >= picture.xStart && x <= picture.xEnd)) {
  //     console.log(`hit the box! ${picture.name}`);
  //     return true;
  //   }
  // }
  return flag;
}

interface Props {
  color: string;
  width?: string;
  extra?: {} | undefined
}

type Location = {
  name: string,
  xStart: number,
  xEnd: number,
  yStart: number,
  yEnd: number,
}

// probably needs to be an array unless they have to click "who" they're guessing
// const pictures = {
//   Purps: purple,
//   Yellow: yellow,
// }
const pictures: Location[] = [
  purple,
  yellow,
]


const Box: React.FC<Props> = ({ color, width = '100%', extra, children }) => {
  let style = {
    height: '200px',
    width,
    backgroundColor: color,
  };

  if (extra) {
    style = {
      ...style,
      ...extra,
    };
  }

  return (
    <div style={style}>
      {children}
    </div>
  );
};

const App: React.FC = () => (
  <div className="App" onClick={(e) => onMouse(e, 'Purps')}>
    <Box color="red" />
    <Box color="blue">
      <Box color="yellow" width="20px" extra={{ height: '20px' }} />
    </Box>

    <Box color="green">
      <Box color="purple" width="20px" extra={{ float: 'right', height: '20px' }} />
    </Box>
  </div>
);

export default App;
