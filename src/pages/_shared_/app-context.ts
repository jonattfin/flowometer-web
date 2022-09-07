import React from "react";

export type AppContextType = {
  todosState?: any;
  todosDispatch?: any;
  timerState?: any;
  timerDispatch?: any;
};

const initialContext: AppContextType = {};

export const AppContext = React.createContext(initialContext);
