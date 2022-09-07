import React from "react";
import { useReducer, useContext } from "react";

import {
  reducer as todosReducer,
  initialState as todosInitialState,
} from "../home/components/todos-reducer";

import {
  reducer as timerReducer,
  initialState as timerInitialState,
} from "../home/components/timer-reducer";

type AppContextType = {
  todosState?: any;
  todosDispatch?: any;
  timerState?: any;
  timerDispatch?: any;
};

const initialContext: AppContextType = {};

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

  return (
    <AppContext.Provider
      value={{ todosState, todosDispatch, timerState, timerDispatch }}
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
