import { action } from "@storybook/addon-actions";
import { v4 as uuidv4 } from "uuid";
import { ActionType, TimerStateValue } from "../../services/reducers/timer-reducer";

import { Timer, Todos } from "./components";

export default function Index() {
  return <div></div>;
}

export const TimerNotStartedComponentInstance = () => {
  const props = getTimerProps();

  return <Timer.TimerComponent {...props} />;
};

export const TimerStartedComponentInstance = () => {
  const props = getTimerProps();
  props.timerState = TimerStateValue.Started;

  return <Timer.TimerComponent {...props} />;
};

export const TodosComponentInstance = () => {
  const props = getTodosProps();
  return <Todos.TodosComponent {...props} />;
};

export const TodosEmptyComponentInstance = () => {
  const props = getTodosProps();
  props.remainingTodos = [];
  props.completedTodos = [];
  return <Todos.TodosComponent {...props} />;
};

function getTimerProps(): Timer.TimerProps {
  return {
    currentTodo: "Read about XState",
    minutes: 25,
    seconds: 0,
    onStartStop: action("onStartStop"),
    onPause: action("onPause"),
    onResume: action("onResume"),
    newState: ActionType.Start,
    timerState: TimerStateValue.Stopped,
  };
}

function getTodosProps(): Todos.TodosProps {
  const [xGuid, yGuid, zGuid] = [uuidv4(), uuidv4(), uuidv4()];

  return {
    text: "hello world",
    onChange: (s: string) => {},
    remainingTodos: [
      { guid: xGuid, text: "x", count: 2 },
      { guid: yGuid, text: "y", count: 3 },
      { guid: zGuid, text: "z", count: 4 },
    ],

    completedTodos: [
      { guid: xGuid, text: "x", count: 2 },
      { guid: yGuid, text: "y", count: 3 },
      { guid: zGuid, text: "z", count: 4 },
    ],
    timerDuration: 30,

    selectedTodoGuid: undefined,
    timerState: TimerStateValue.Stopped,

    onAdd: action("onAdd"),
    onSelected: action("onSelected"),
    onIncrease: action("onIncrease"),
    onDecrease: action("onDecrease"),
    onDelete: action("onDelete"),
  };
}
