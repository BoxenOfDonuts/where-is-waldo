interface StopwatchProps {
  initial?: number;
  tickRate: number;
}

type StopwatchValue = {
  time: number;
}

export type { StopwatchProps, StopwatchValue}