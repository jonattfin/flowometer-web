import { ActionType, TimerState } from "../../services/reducers/timer-reducer";
import { TimerComponent, TodosComponent } from "./components";
import { TimerProps } from "./components/timer-component";
import { TodosProps } from "./components/todos-component";

export default function Index() {
  return <div></div>;
}

export const TimerComponentInstance = () => {
  const props: TimerProps = {
    currentTodo: "hello",
    minutes: 10,
    seconds: 10,
    onClick: () => {},
    onPause: () => {},
    onResume: () => {},
    newState: ActionType.Start,
    timerState: TimerState.Stopped,
  };

  return <TimerComponent {...props} />;
};

export const TodosComponentInstance = () => {
  const props: TodosProps = {
    todoText: "hello world",
    onChange: (s: string) => {},
    remainingTodos: [
      { todoGuid: "x", todo: "x", count: 2 },
      { todoGuid: "x", todo: "y", count: 3 },
      { todoGuid: "x", todo: "z", count: 4 },
    ],
    remainingHours: 0,
    remainingMinutes: 0,

    completedTodos: [
      { todo: "x", completed: 2 },
      { todo: "y", completed: 3 },
      { todo: "z", completed: 4 },
    ],
    completedHours: 0,
    completedMinutes: 0,

    selectedTodoGuid: undefined,
    timerState: TimerState.Stopped,

    onAdd: () => {},
    onClick: (guid: string) => {},
    onIncrease: (guid: string) => {},
    onDecrease: (guid: string) => {},
    onDelete: (guid: string) => {},
  };

  return <TodosComponent {...props} />;
};
