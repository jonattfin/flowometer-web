import { cloneDeep } from "lodash";

export type TodoType = {
  currentTodo: string;
  selectedTodoIndex: number;
  todos: {
    todo: string;
    count: number;
  }[];
};

export type ActionType = {
  actionType: ActionTypeValue;
  payload: any;
};

export const initialState: TodoType = {
  currentTodo: "",
  selectedTodoIndex: -1,
  todos: [
    { todo: "x", count: 1 },
    { todo: "y", count: 1 },
    { todo: "z", count: 1 },
  ],
};

export enum ActionTypeValue {
  ChangeDefaultTodo,
  ChangeSelectedTodo,
  AddTodo,
  IncreaseCounter,
  DecreaseCounter,
  DeleteTodo,
}

export const reducer = (state: TodoType, action: ActionType) => {
  const { actionType, payload } = action;

  const clonedState = cloneDeep(state);

  switch (actionType) {
    case ActionTypeValue.ChangeDefaultTodo: {
      clonedState.currentTodo = payload;

      break;
    }
    case ActionTypeValue.ChangeSelectedTodo: {
      clonedState.selectedTodoIndex = action.payload;

      break;
    }
    case ActionTypeValue.AddTodo: {
      clonedState.todos.push({ todo: clonedState.currentTodo, count: 1 });
      clonedState.currentTodo = "";

      break;
    }
    case ActionTypeValue.IncreaseCounter: {
      const element = clonedState.todos.find((t) => t.todo == payload);
      console.log(`element is ${JSON.stringify(element)}`);
      if (element) {
        element.count += 1;
      }

      break;
    }
    case ActionTypeValue.DecreaseCounter: {
      const element = clonedState.todos.find((t) => t.todo == payload);
      if (element) {
        element.count -= 1;
      }

      break;
    }
    case ActionTypeValue.DeleteTodo: {
      clonedState.selectedTodoIndex = -1;
      clonedState.todos = clonedState.todos.filter(
        (item: any) => item.todo != payload
      );

      break;
    }
    default:
      break;
  }

  return clonedState;
};
