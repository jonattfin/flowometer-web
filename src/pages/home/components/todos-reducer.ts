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
      return {
        ...state,
        currentTodo: payload,
      };
    }

    case ActionTypeValue.AddTodo: {
      return {
        ...state,
        currentTodo: "",
        todos: [...state.todos, { todo: state.currentTodo, count: 1 }],
      };
    }

    case ActionTypeValue.CompleteTodo: {
      let completedTodos = [...state.completedTodos];
      if (completedTodos.find((t) => t.todo === payload)) {
        completedTodos = completedTodos.map((t) =>
          t.todo == payload ? { ...t, completed: t.completed + 1 } : t
        );
      } else {
        completedTodos.push({ todo: payload, completed: 1 });
      }

      return {
        ...state,
        completedTodos,
      };
    }

    case ActionTypeValue.IncreaseCounter: {
      return {
        ...state,
        currentTodo: state.currentTodo,
        todos: state.todos.map((t) =>
          t.todo == action.payload ? { ...t, count: t.count + 1 } : t
        ),
      };
    }
    case ActionTypeValue.DecreaseCounter: {
      return {
        ...state,
        currentTodo: state.currentTodo,
        todos: state.todos.map((t) =>
          t.todo == action.payload ? { ...t, count: t.count - 1 } : t
        ),
      };
    }
    case ActionTypeValue.DeleteTodo: {
      return {
        ...state,
        currentTodo: state.currentTodo,
        todos: state.todos.filter((t) => t.todo !== payload),
      };
    }
    default:
      return state;
  }
};
