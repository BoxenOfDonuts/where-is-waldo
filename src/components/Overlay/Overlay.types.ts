interface OverlayProps {
  timeToComplete: number|null;
  score?: number|null;
  leaderboard?: {name: string, score: string, timestamp: Date}[]
  resetGame?: () => void;
}

interface FormProps {
  childRef: React.MutableRefObject<any>;
}


export type { OverlayProps, FormProps }