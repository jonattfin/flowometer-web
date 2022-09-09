import React, { useState, useReducer, useContext } from "react";

import {
  reducer as todosReducer,
  initialState as todosInitialState,
} from "../reducers/todos-reducer";

import {
  reducer as timerReducer,
  initialState as timerInitialState,
} from "../reducers/timer-reducer";

const DefaultTimerDuration = 25;

type AppContextType = {
  timerDuration: number;
  setTimerDuration?: any;
  todosState?: any;
  todosDispatch?: any;
  timerState?: any;
  timerDispatch?: any;
};

const initialContext: AppContextType = {
  timerDuration: DefaultTimerDuration,
};

const AppContext = React.createContext(initialContext);

export function AppProvider(props: any) {
  const [todosState, todosDispatch] = useReducer(
    todosReducer,
    todosInitialState
  );
  const [timerState, timerDispatch] = useReducer(
    timerReducer,
    timerInitialState
  );

  const [timerDuration, setTimerDuration] = useState(DefaultTimerDuration);

  return (
    <AppContext.Provider
      value={{
        todosState,
        todosDispatch,
        timerState,
        timerDispatch,
        timerDuration,
        setTimerDuration,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export function useTodos() {
  const { todosState, todosDispatch } = useContext(AppContext);
  if (!todosState && !todosDispatch) {
    throw new Error("useTodos must be used within an AppProvider");
  }
  return { state: todosState, dispatch: todosDispatch };
}

export function useTimer() {
  const { timerState, timerDispatch } = useContext(AppContext);
  if (!timerState && !timerDispatch) {
    throw new Error("useTimer must be used within an AppProvider");
  }
  return { state: timerState, dispatch: timerDispatch };
}

export function useTimerDuration() {
  const { timerDuration, setTimerDuration } = useContext(AppContext);

  return { state: timerDuration, setTimerDuration };
}
