import produce from "immer";

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
      return produce(state, (draftState) => {
        draftState.seconds += 1;
      });
    }

    case ActionType.Stop: {
      return produce(state, (draftState) => {
        draftState.seconds = 0;
        draftState.currentState = TimerState.Stopped;
      });
    }
    case ActionType.Pause: {
      return produce(state, (draftState) => {
        draftState.currentState = TimerState.Paused;
      });
    }
    case ActionType.Start:
    case ActionType.Resume: {
      return produce(state, (draftState) => {
        draftState.currentState = TimerState.Started;
      });
    }
    default:
      return state;
  }
};
