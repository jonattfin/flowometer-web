import { useState } from "react";
import {
  useTimer,
  useTimerDuration,
  useTodos,
} from "../../../services/providers";
import { TimerState } from "../../../services/reducers/timer-reducer";
import { ActionTypeValue } from "../../../services/reducers/todos-reducer";
import { TodosComponent } from "../components";

export default function TodosContainer() {
  const [todoText, setTodoText] = useState("");
  const { state: todosState, dispatch: todosDispatch } = useTodos();
  const { state: timerState } = useTimer();
  const { state: timerDuration } = useTimerDuration();

  function onClick(todoGuid: string) {
    if (timerState.currentState != TimerState.Stopped) {
      return;
    }

    todosDispatch({
      type: ActionTypeValue.SetSelectedTodoGuid,
      payload: todoGuid,
    });
  }

  function getTime(items: any[]) {
    const totalMinutes = items.reduce(
      (prevValue: number, currentValue: any) =>
        prevValue + currentValue * timerDuration,
      0
    );

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return { hours, minutes };
  }

  const { hours: remainingHours, minutes: remainingMinutes } = getTime(
    todosState.todos.map((t: any) => t.count)
  );
  const { hours: completedHours, minutes: completedMinutes } = getTime(
    todosState.completedTodos.map((t: any) => t.completed)
  );

  const remainingTodos = todosState.todos.filter((t: any) => t.count >= 1);
  const completedTodos = todosState.completedTodos;

  const onChange = (text: string) => {
    setTodoText(text);
  };

  const onAdd = () => {
    todosDispatch({
      type: ActionTypeValue.AddTodo,
      payload: todoText,
    });

    setTodoText("");
  };

  const onIncrease = (guid: string) => {
    todosDispatch({
      type: ActionTypeValue.IncreaseCounter,
      payload: guid,
    });
  };

  const onDecrease = (guid: string) => {
    todosDispatch({
      type: ActionTypeValue.DecreaseCounter,
      payload: guid,
    });
  };

  const onDelete = (guid: string) => {
    todosDispatch({
      type: ActionTypeValue.DeleteTodo,
      payload: guid,
    });
  };

  const props = {
    todoText,
    onChange,
    remainingTodos,
    remainingHours,
    remainingMinutes,

    completedTodos,
    completedHours,
    completedMinutes,

    selectedTodoGuid: todosState.selectedTodoGuid,
    timerState: timerState.currentState,

    onClick,
    onAdd,
    onIncrease,
    onDecrease,
    onDelete,
  };

  return <TodosComponent {...props} />;
}
