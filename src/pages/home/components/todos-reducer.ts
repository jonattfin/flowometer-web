export type TodoType = {
  currentTodo: string;
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
  todos: [
    { todo: "x", count: 1 },
    { todo: "y", count: 1 },
    { todo: "z", count: 1 },
  ],
};

export enum ActionTypeValue {
  ChangeDefaultTodo,
  AddTodo,
  IncreaseCounter,
  DecreaseCounter,
  DeleteTodo,
}

export const reducer = (state: TodoType, action: ActionType) => {
  const { actionType, payload } = action;

  switch (actionType) {
    case ActionTypeValue.ChangeDefaultTodo: {
      return {
        currentTodo: payload,
        todos: [...state.todos],
      };
    }

    case ActionTypeValue.InitState: {
      return action.payload; // this sets the state
    }

    case ActionTypeValue.AddTodo: {
      return {
        currentTodo: "",
        todos: [...state.todos, { todo: state.currentTodo, count: 1 }],
      };
    }
    case ActionTypeValue.IncreaseCounter: {
      return {
        currentTodo: state.currentTodo,
        todos: state.todos.map((t) =>
          t.todo == action.payload ? { ...t, count: t.count + 1 } : t
        ),
      };
    }
    case ActionTypeValue.DecreaseCounter: {
      return {
        currentTodo: state.currentTodo,
        todos: state.todos.map((t) =>
          t.todo == action.payload ? { ...t, count: t.count - 1 } : t
        ),
      };
    }
    case ActionTypeValue.DeleteTodo: {
      return {
        currentTodo: state.currentTodo,
        todos: state.todos.filter((t) => t.todo !== payload),
      };
    }
    default:
      return state;
  }
};
