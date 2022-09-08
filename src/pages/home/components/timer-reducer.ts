export enum TimerState {
  Stopped,
  Started,
  Paused,
  Resumed,
}

export enum ActionType {
  Start = "Start",
  Stop = "Stop",
  Pause = "Pause",
  Resume = "Resume",
  CountSeconds = "CountSeconds",
}

export const initialState = {
  seconds: 0,
  currentState: TimerState.Stopped,
};

export const reducer = (
  state: { seconds: number; currentState: TimerState },
  action: { type: ActionType }
) => {
  switch (action.type) {
    case ActionType.CountSeconds: {
      return {
        ...state,
        seconds: state.seconds + 1,
      };
    }

    case ActionType.Stop: {
      return {
        ...state,
        currentState: TimerState.Stopped,
        seconds: 0,
      };
    }
    case ActionType.Pause: {
      return {
        ...state,
        currentState: TimerState.Paused,
      };
    }
    case ActionType.Start:
    case ActionType.Resume: {
      return {
        ...state,
        currentState: TimerState.Started,
      };
    }
    default:
      return state;
  }
};
