import React from 'react';
import './App.css';

const purple: Location= {
  xStart: 1895,
  xEnd: 1915,
  yStart: 400,
  yEnd: 420,
}

const onMouse = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e.clientX, e.clientY)
  const [x, y] = [e.clientX, e.clientY]
  if ((y >= purple.yStart && y <= purple.yEnd) && (x >= purple.xStart && x <= purple.xEnd)) {
    console.log('hit the box!')
  } else {
    console.log('miss')
  }
}

interface Props {
  color: string;
  width?: string;
  extra?: {} | undefined
}

type Location = {
  xStart: number,
  xEnd: number,
  yStart: number,
  yEnd: number,
}

const Box: React.FC<Props> = ({color, width='100%', extra, children}) => {
  let style = {
    height: '200px',
    width,
    backgroundColor: color,
  }

  if (extra) {
    style = {
      ...style,
      ...extra,
    }
  }

  return (
    <div style={style}>
      {children}
    </div>
  );
}

const App: React.FC = () => {
  return (
    <div className="App" onClick={onMouse}>
      <Box color={'red'}/>
      <Box color={'blue'}>
        <Box color={'purple'} width={'30%'}/>
      </Box>

      <Box color={'green'}>
        <Box color={'purple'} width={'20px'} extra={{float: 'right', height: '20px'}} />
      </Box>
    </div>
  );
}

export default App;