import { useEffect } from "react";
import {
  ActionType,
  TimerState,
} from "../../../services/reducers/timer-reducer";
import {
  useTimer,
  useTimerDuration,
  useTodos,
} from "../../../services/providers";
import { ActionTypeValue } from "../../../services/reducers/todos-reducer";
import { TimerComponent } from "../components";

export default function TimerContainer() {
  const { state: timerState, dispatch: timerDispatch } = useTimer();
  const { state: todosState, dispatch: todosDispatch } = useTodos();
  const { state: timerDurationState } = useTimerDuration();

  const { todos, selectedTodoGuid } = todosState;

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

  const onClick = () => {
    timerDispatch({ type: newState });
    if (newState === ActionType.Stop) {
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

  const todoObj = todos.find((t: any) => t.todoGuid === selectedTodoGuid);
  console.debug(todos);
  console.debug(selectedTodoGuid);
  console.debug(todoObj);

  const props = {
    currentTodo: todoObj ? todoObj.todo : undefined,
    onClick,
    onPause,
    onResume,
    minutes,
    seconds,
    newState,
    timerState: timerState.currentState,
  };

  return <TimerComponent {...props} />;
}

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
