import produce from "immer";

export enum TimerStateValue {
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

export type TimerState = {
  seconds: number;
  currentState: TimerStateValue;
};

export const initialState: TimerState = {
  seconds: 0,
  currentState: TimerStateValue.Stopped,
};

export const reducer = (state: TimerState, action: { type: ActionType }) => {
  switch (action.type) {
    case ActionType.CountSeconds: {
      return produce(state, (draftState) => {
        draftState.seconds += 1;
      });
    }

    case ActionType.Stop: {
      return produce(state, (draftState) => {
        draftState.seconds = 0;
        draftState.currentState = TimerStateValue.Stopped;
      });
    }
    case ActionType.Pause: {
      return produce(state, (draftState) => {
        draftState.currentState = TimerStateValue.Paused;
      });
    }
    case ActionType.Start:
    case ActionType.Resume: {
      return produce(state, (draftState) => {
        draftState.currentState = TimerStateValue.Started;
      });
    }
    default:
      return state;
  }
};
