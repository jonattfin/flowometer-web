import produce from "immer";
import { v4 as uuidv4 } from "uuid";

export type TodoType = {
  selectedTodoGuid?: string;
  todos: {
    todoGuid: string;
    todo: string;
    count: number;
  }[];
  completedTodos: {
    todo: string;
    completed: number;
  }[];
};

export type ActionType = {
  type: ActionTypeValue;
  payload: any;
};

export const initialState: TodoType = {
  selectedTodoGuid: undefined,
  todos: [],
  completedTodos: [],
};

export enum ActionTypeValue {
  AddTodo,
  SetSelectedTodoGuid,
  IncreaseCounter,
  DecreaseCounter,
  DeleteTodo,
  CompleteTodo,
}

export const reducer = (state: TodoType, action: ActionType) => {
  const { type, payload } = action;
  console.log(JSON.stringify(action));

  switch (type) {
    case ActionTypeValue.SetSelectedTodoGuid: {
      return produce(state, (draftState) => {
        draftState.selectedTodoGuid = payload;
      });
    }

    case ActionTypeValue.AddTodo: {
      return produce(state, (draftState) => {
        draftState.todos.push({
          todo: action.payload,
          todoGuid: uuidv4(),
          count: 1,
        });
      });
    }

    case ActionTypeValue.CompleteTodo: {
      return produce(state, (draftState) => {
        const todoObj = state.todos.find((t) => t.todoGuid === payload);
        if (todoObj) {
          const { todo } = todoObj;

          const foundItem = draftState.completedTodos.find(
            (t: any) => t.todo === todo
          );
          if (foundItem) {
            foundItem.completed += 1;
          } else {
            draftState.completedTodos.push({ todo, completed: 1 });
          }
        }
      });
    }

    case ActionTypeValue.IncreaseCounter: {
      return produce(state, (draftState) => {
        const todoObj = draftState.todos.find((t) => t.todoGuid === payload);
        if (todoObj) {
          todoObj.count++;
        }
      });
    }
    case ActionTypeValue.DecreaseCounter: {
      return produce(state, (draftState) => {
        const todoObj = draftState.todos.find((t) => t.todoGuid === payload);
        if (todoObj) {
          todoObj.count--;
        }
      });
    }
    case ActionTypeValue.DeleteTodo: {
      return produce(state, (draftState) => {
        draftState.todos = draftState.todos.filter(
          (t) => t.todoGuid != payload
        );
      });
    }
    default:
      return state;
  }
};
