import { useEffect, useState } from 'react';

const useStopwatch = ( initial: number, tickRate: number, stop: boolean, gameCount: number): [number, string] => {

  
  const [ time, setTime ] = useState(initial);

  const formatTime = (): string => {
    const getSeconds: string = `0${(time % 60)}`.slice(-2);
    const minutes: string  = `0${Math.floor(time / 60)}`.slice(-2);
    const getMinutes: string = `0${Number(minutes) % 60}`.slice(-2);
    const getHours: string = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  }

  const tick = () => {
    setTime(time => time + 1)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      tick()
    }, tickRate)

    const stopTimer = () => {
      clearInterval(timer);
    }

    if(stop) {
      stopTimer();
    }

    return () => {
      stopTimer()
    }

  }, [stop])

  useEffect(() =>{
    if(gameCount > 0) {
      setTime(0);
    }
  }, [gameCount])

  const timeString = formatTime();

  return [time, timeString];
}

export { useStopwatch };