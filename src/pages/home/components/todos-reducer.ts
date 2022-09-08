import produce from "immer";

export type TodoType = {
  currentTodo: string;
  todos: {
    todo: string;
    count: number;
  }[];
  completedTodos: {
    todo: string;
    completed: number;
  }[];
};

export type ActionType = {
  actionType: ActionTypeValue;
  payload: any;
};

export const initialState: TodoType = {
  currentTodo: "",
  todos: [],
  completedTodos: [],
};

export enum ActionTypeValue {
  ChangeDefaultTodo,
  AddTodo,
  IncreaseCounter,
  DecreaseCounter,
  DeleteTodo,
  CompleteTodo,
}

export const reducer = (state: TodoType, action: ActionType) => {
  const { actionType, payload } = action;

  switch (actionType) {
    case ActionTypeValue.ChangeDefaultTodo: {
      return produce(state, (draftState) => {
        draftState.currentTodo = action.payload;
      });
    }

    case ActionTypeValue.AddTodo: {
      return produce(state, (draftState) => {
        draftState.currentTodo = "";
        draftState.todos.push({ todo: state.currentTodo, count: 1 });
      });
    }

    case ActionTypeValue.CompleteTodo: {
      return produce(state, (draftState) => {
        const foundItem = draftState.completedTodos.find(
          (t: any) => t.todo === payload
        );
        if (foundItem) {
          foundItem.completed += 1;
        } else {
          draftState.completedTodos.push({ todo: payload, completed: 1 });
        }
      });
    }

    case ActionTypeValue.IncreaseCounter: {
      return produce(state, (draftState) => {
        const foundItem = draftState.todos.find((t: any) => t.todo === payload);
        if (foundItem) {
          foundItem.count += 1;
        }
      });
    }
    case ActionTypeValue.DecreaseCounter: {
      return produce(state, (draftState) => {
        const foundItem = draftState.todos.find((t: any) => t.todo === payload);
        if (foundItem) {
          foundItem.count -= 1;
        }
      });
    }
    case ActionTypeValue.DeleteTodo: {
      return produce(state, (draftState) => {
        draftState.todos = draftState.todos.filter(
          (t: any) => t.todo !== payload
        );
      });
    }
    default:
      return state;
  }
};
