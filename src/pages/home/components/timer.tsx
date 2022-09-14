import { useEffect } from "react";
import {
  ActionType,
  TimerState,
  TimerStateValue,
} from "../../../services/reducers/timer-reducer";

import { ActionTypeValue } from "../../../services/reducers/todos-reducer";
import { padStart } from "lodash";
import styled from "@emotion/styled";
import { Stack, Button } from "@mui/material";
import {
  useTimer,
  useTodos,
  useTimerDuration,
} from "../../../services/provider";

export type TimerProps = {
  currentTodo?: string;
  minutes: number;
  seconds: number;
  newState: ActionType;
  timerState: TimerStateValue;
  onStartStop: () => void;
  onPause: () => void;
  onResume: () => void;
};

export function TimerContainer() {
  const { state: timerState, dispatch: timerDispatch } = useTimer();
  const { state: todosState, dispatch: todosDispatch } = useTodos();
  const { state: timerDurationState } = useTimerDuration();

  const { minutes, seconds } = calculateMinutesAndSeconds(
    timerState.seconds,
    timerDurationState
  );

  useEffect(() => {
    if (
      [TimerStateValue.Stopped, TimerStateValue.Paused].includes(
        timerState.currentState
      )
    )
      return;

    const interval = setInterval(() => {
      timerDispatch({ type: ActionType.CountSeconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerState.currentState]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      onStartStop();
    }
  }, [minutes, seconds]);

  const nextState = calculateNextState(timerState);
  const { todos, selectedTodoGuid } = todosState;

  const onStartStop = () => {
    timerDispatch({ type: nextState });
    if (nextState === ActionType.Stop) {
      todosDispatch({
        type: ActionTypeValue.CompleteTodo,
        payload: selectedTodoGuid,
      });
      todosDispatch({
        type: ActionTypeValue.DecreaseCounter,
        payload: selectedTodoGuid,
      });
      todosDispatch({
        type: ActionTypeValue.SetSelectedTodoGuid,
        payload: undefined,
      });
    }
  };

  const onPause = () => {
    timerDispatch({ type: ActionType.Pause });
  };

  const onResume = () => {
    timerDispatch({ type: ActionType.Resume });
  };

  const props = {
    currentTodo: todos.find((t) => t.guid === selectedTodoGuid)?.text,
    onStartStop,
    onPause,
    onResume,
    minutes,
    seconds,
    newState: nextState,
    timerState: timerState.currentState,
  };

  return <TimerComponent {...props} />;
}

export function TimerComponent(props: TimerProps) {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <TimeWrapperDiv>{`${format(props.minutes)} : ${format(
        props.seconds
      )}m`}</TimeWrapperDiv>
      <TitleWrapperDiv>{`Current todo: ${
        props.currentTodo || "N/A"
      }`}</TitleWrapperDiv>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={props.onStartStop}
          disabled={props.currentTodo === undefined}
        >
          {props.newState}
        </Button>

        {props.timerState == TimerStateValue.Started && (
          <Button variant="contained" onClick={props.onPause}>
            Pause
          </Button>
        )}
        {props.timerState == TimerStateValue.Paused && (
          <Button variant="contained" onClick={props.onResume}>
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

function format(value: number) {
  return padStart(value.toString(), 2, "0");
}

function calculateNextState(state: TimerState) {
  if (
    [TimerStateValue.Started, TimerStateValue.Paused].includes(
      state.currentState
    )
  ) {
    return ActionType.Stop;
  }

  return ActionType.Start;
}

function calculateMinutesAndSeconds(
  currentSeconds: number,
  timerDuration: number
) {
  const { minutes, seconds } = getMinutesAndSeconds(
    currentSeconds,
    timerDuration
  );
  return { minutes, seconds };

  function getMinutesAndSeconds(currentSeconds: number, timerDuration: number) {
    const MINUTES_PER_HOUR = 60;

    const minutes = timerDuration;
    const seconds = 0;

    const totalSeconds = minutes * MINUTES_PER_HOUR + seconds;
    const remainingTotalSeconds = totalSeconds - currentSeconds;

    const remainingMinutes = Math.floor(
      remainingTotalSeconds / MINUTES_PER_HOUR
    );
    const remainingSeconds = Math.floor(
      remainingTotalSeconds % MINUTES_PER_HOUR
    );

    return {
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    };
  }
}
