import { FirebaseUtils } from './FirebaseUtils';

type highScoreArray = [
  {
    name: string;
    score: number;
    submitTime: {}
  }
]

const Game =(() => {
  const _calculateScore = async () => {
    const now = Date.now()
    FirebaseUtils.setTime('endTime', now);
    const times = await FirebaseUtils.getTime();
    return Math.round((now - times?.startTime) / 1000)
  }

  const _getHighScores = async () => {

    const scores: highScoreArray = await FirebaseUtils.getHighScores();
    console.log(scores)
    const sortedScores = scores.sort((a, b) => a.score - b.score);
    return sortedScores;
  }

  const getLeaderboard = () => {
    return _getHighScores();
  }

  const getScore = () => {
    return _calculateScore();
  }

  return {
    getScore,
    getLeaderboard
  }
})();


export default Game;