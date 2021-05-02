import { useContext } from "react";
import { useScoreListener } from "../../hooks/ScoreListener";
import { FirebaseContext } from "../Firebase";
import { FirebaseUtil } from "../Firebase/Firebase.types";
import { Header } from '../Header/Header';
import './Leaderboard.css';


const LeaderBoardItem: React.FC<any> = ({ name, score }): JSX.Element => {
  return (
    <li className="score-item">
      <div className="leaderboard-card">
        <div className="names">
          {name}
        </div>
        <div className="score">
          {score}
        </div>
      </div>
    </li>
  );
}


const Leaderboard: React.FC = () => {
  const firebase = useContext<FirebaseUtil>(FirebaseContext);
  const [ scores ] = useScoreListener(firebase);

  return (
    <div className={'leaderboard-wrapper'}>
      <Header title={"Where is Waldo"}/>
      <ul className="leaderboard">
        <LeaderBoardItem key={'head'} name={'Name'} score={'Score in Seconds'} />
        {scores?.map(value => {
          const { name, score, timestamp } = value;
          return <LeaderBoardItem key={timestamp} name={name} score={score} />
        })}
      </ul>
    </div>
  );
}

export default Leaderboard 