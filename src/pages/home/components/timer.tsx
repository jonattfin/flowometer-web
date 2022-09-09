import styled from "@emotion/styled";
import { Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { padStart } from "lodash";
import { ActionType, TimerState } from "./timer-reducer";
import {
  useTimer,
  useTimerDuration,
  useTodos,
} from "./../../_shared_/app-context";
import { ActionTypeValue } from "./todos-reducer";

type TimerProps = {};

export default function Timer({}: TimerProps) {
  const { state: timerState, dispatch: timerDispatch } = useTimer();
  const { state: todosState, dispatch: todosDispatch } = useTodos();
  const { state: timerDurationState } = useTimerDuration();

  const { todos, selectedTodoIndex } = todosState;

  const { newState, minutes, seconds } = calculateState(
    timerState,
    timerDurationState
  );

  useEffect(() => {
    if (
      [TimerState.Stopped, TimerState.Paused].includes(timerState.currentState)
    )
      return;

    const interval = setInterval(() => {
      timerDispatch({ type: ActionType.CountSeconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerState.currentState]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      timerDispatch({ type: ActionType.Stop });
    }
  }, [minutes, seconds]);

  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <TimeWrapperDiv>{`${format(minutes)} : ${format(
        seconds
      )}m`}</TimeWrapperDiv>
      <TitleWrapperDiv>{`Current todo: ${
        selectedTodoIndex >= 0 ? todos[selectedTodoIndex].todo : "N/A"
      }`}</TitleWrapperDiv>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={() => {
            timerDispatch({ type: newState });
            if (newState === ActionType.Stop) {
              todosDispatch({
                type: ActionTypeValue.CompleteTodo,
                payload: selectedTodoIndex,
              });
              todosDispatch({
                type: ActionTypeValue.DecreaseCounter,
                payload: selectedTodoIndex,
              });
              todosDispatch({
                type: ActionTypeValue.SetSelectedTodoIndex,
                payload: -1,
              });
            }
          }}
        >
          {newState}
        </Button>

        {timerState.currentState == TimerState.Started && (
          <Button
            variant="contained"
            onClick={() => timerDispatch({ type: ActionType.Pause })}
          >
            Pause
          </Button>
        )}
        {timerState.currentState == TimerState.Paused && (
          <Button
            variant="contained"
            onClick={() => timerDispatch({ type: ActionType.Resume })}
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

function calculateState(state: any, timerDuration: number) {
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

  const { minutes, seconds } = getMinutesAndSeconds(
    state.seconds,
    timerDuration
  );
  return { newState, minutes, seconds };
}

function getMinutesAndSeconds(currentSeconds: number, timerDuration: number) {
  const MINUTES_PER_HOUR = 60;

  const minutes = timerDuration;
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
