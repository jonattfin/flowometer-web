import styled from "@emotion/styled";
import { Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { padStart } from "lodash";
import { ActionType, TimerState } from "./timer-reducer";
import { useTimer } from "./../../_shared_/app-context";

type TimerProps = {
  todo?: string;
  onTodoStarted: (timerState: TimerState) => void;
};

export default function Timer({ todo, onTodoStarted }: TimerProps) {
  const { state, dispatch } = useTimer();

  const { newState, minutes, seconds } = calculateState(state);

  useEffect(() => {
    if ([TimerState.Stopped, TimerState.Paused].includes(state.currentState))
      return;

    const interval = setInterval(() => {
      dispatch({ type: ActionType.CountSeconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [state.currentState]);

  useEffect(() => {
    onTodoStarted(state.currentState);
  }, [state.currentState]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      dispatch({ type: ActionType.Stop });
    }
  }, [minutes, seconds]);

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <TimeWrapperDiv>{`${format(minutes)} : ${format(
        seconds
      )}`}</TimeWrapperDiv>
      <TitleWrapperDiv>{`Current task: ${todo || "N/A"}`}</TitleWrapperDiv>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={() => dispatch({ type: newState })}
        >
          {newState}
        </Button>

        {state.currentState == TimerState.Started && (
          <Button
            variant="contained"
            onClick={() => dispatch({ type: ActionType.Pause })}
          >
            Pause
          </Button>
        )}
        {state.currentState == TimerState.Paused && (
          <Button
            variant="contained"
            onClick={() => dispatch({ type: ActionType.Resume })}
          >
            Resume
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

// styled components

const TimeWrapperDiv = styled.div`
  font-size: 5em;
`;

const TitleWrapperDiv = styled.div`
  font-size: 1em;
`;

// helpers

function calculateState(state: any) {
  let newState: ActionType;

  switch (state.currentState) {
    case TimerState.Started:
    case TimerState.Paused: {
      newState = ActionType.Stop;
      break;
    }
    default: {
      newState = ActionType.Start;
      break;
    }
  }

  const { minutes, seconds } = getMinutesAndSeconds(state.seconds);
  return { newState, minutes, seconds };
}

function getMinutesAndSeconds(currentSeconds: number) {
  const MINUTES_PER_HOUR = 60;

  const minutes = 45;
  const seconds = 0;

  const totalSeconds = minutes * MINUTES_PER_HOUR + seconds;
  const remainingTotalSeconds = totalSeconds - currentSeconds;

  const remainingMinutes = Math.floor(remainingTotalSeconds / MINUTES_PER_HOUR);
  const remainingSeconds = Math.floor(remainingTotalSeconds % MINUTES_PER_HOUR);

  return {
    minutes: remainingMinutes,
    seconds: remainingSeconds,
  };
}

function format(value: number) {
  return padStart(value.toString(), 2, "0");
}
