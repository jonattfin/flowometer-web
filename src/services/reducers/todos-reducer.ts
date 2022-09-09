import produce from "immer";

export type TodoType = {
  selectedTodoIndex: number;
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
  type: ActionTypeValue;
  payload: any;
};

export const initialState: TodoType = {
  selectedTodoIndex: -1,
  todos: [],
  completedTodos: [],
};

export enum ActionTypeValue {
  AddTodo,
  SetSelectedTodoIndex,
  IncreaseCounter,
  DecreaseCounter,
  DeleteTodo,
  CompleteTodo,
}

export const reducer = (state: TodoType, action: ActionType) => {
  const { type, payload } = action;
  console.log(JSON.stringify(action));

  switch (type) {
    case ActionTypeValue.SetSelectedTodoIndex: {
      return produce(state, (draftState) => {
        draftState.selectedTodoIndex = payload;
      });
    }

    case ActionTypeValue.AddTodo: {
      return produce(state, (draftState) => {
        draftState.todos.push({ todo: action.payload, count: 1 });
      });
    }

    case ActionTypeValue.CompleteTodo: {
      return produce(state, (draftState) => {
        if (payload < 0) return;

        const { todo } = state.todos[payload];

        const foundItem = draftState.completedTodos.find(
          (t: any) => t.todo === todo
        );
        if (foundItem) {
          foundItem.completed += 1;
        } else {
          draftState.completedTodos.push({ todo, completed: 1 });
        }
      });
    }

    case ActionTypeValue.IncreaseCounter: {
      return produce(state, (draftState) => {
        if (payload < 0) return;

        draftState.todos[payload].count++;
      });
    }
    case ActionTypeValue.DecreaseCounter: {
      return produce(state, (draftState) => {
        if (payload < 0) return;

        draftState.todos[payload].count--;
      });
    }
    case ActionTypeValue.DeleteTodo: {
      return produce(state, (draftState) => {
        if (payload < 0) return;

        draftState.todos = draftState.todos.filter(
          (t, index) => index != payload
        );
      });
    }
    default:
      return state;
  }
};
