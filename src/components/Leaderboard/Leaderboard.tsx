import { useContext } from "react";
import { useScoreListener } from "../../hooks/ScoreListener";
import { FirebaseContext } from "../Firebase";
import { FirebaseUtil } from "../Firebase/Firebase.types";
import { Header } from '../Header/Header';


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


const Leaderboard: React.FC = () => {
  const firebase = useContext<FirebaseUtil>(FirebaseContext);
  const [ scores ] = useScoreListener(firebase);

  return (
    <>
      <Header title={"Where is Waldo"}/>
      <ul className="leader-board">
        {scores?.map(value => {
          const { name, score, timestamp } = value;
          return <LeaderBoardItem key={timestamp} name={name} score={score} />
        })}
      </ul>
    </>
  );
}

export default Leaderboard 