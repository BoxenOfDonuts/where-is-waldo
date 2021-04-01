import './App.css';
import { Header } from './components/Header/Header';
import { pictures } from './components/Pictures/Picture';
import { PictureArea } from './components/PictureArea/PictureArea';


const App: React.FC = () => {
  return (
    <div className="App">
      <Header title={"Where Is Waldo"} pictures={pictures} />
      <PictureArea pictures={pictures}/>
    </div>
  )
};

export default App;
