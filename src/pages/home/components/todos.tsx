import {
  Button,
  List,
  Stack,
  TextField,
  ListItem,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
} from "@mui/material";
import { Fragment, useEffect, useReducer } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { pink } from "@mui/material/colors";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import styled from "@emotion/styled";

import {
  reducer,
  initialState,
  ActionTypeValue,
  loadTodos,
  saveTodos,
} from "./todos-reducer";
import { TimerState } from "./timer-reducer";

export type TodosProps = {
  todo: string;
  timerState: TimerState;
  onSelectedTodoChanged: (text: string) => void;
};

export default function Todos(props: TodosProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load the todos from storage
  useEffect(() => {
    dispatch({
      actionType: ActionTypeValue.InitState,
      payload: loadTodos(),
    });
  }, []);

  // Save the todos in storage
  useEffect(() => {
    saveTodos(state);
  }, [state]);

  useEffect(() => {
    if (props.timerState == TimerState.Stopped) {
      onDecrement(props.todo);
    }
  }, [props.timerState]);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      actionType: ActionTypeValue.ChangeDefaultTodo,
      payload: event.target.value,
    });
  }

  function onClick(
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) {
    if (props.timerState != TimerState.Stopped) {
      return;
    }

    props.onSelectedTodoChanged(state.todos[index].todo);
  }

  function onAdd() {
    dispatch({ actionType: ActionTypeValue.AddTodo, payload: undefined });
  }

  function onIncrement(todo: string) {
    dispatch({
      actionType: ActionTypeValue.IncreaseCounter,
      payload: todo,
    });
  }

  function onDecrement(todo: string) {
    dispatch({
      actionType: ActionTypeValue.DecreaseCounter,
      payload: todo,
    });
  }

  function onDelete(todo: string) {
    props.onSelectedTodoChanged("");
    dispatch({ actionType: ActionTypeValue.DeleteTodo, payload: todo });
  }

  return (
    <Stack spacing={1}>
      <TitleWrapper>Task List ({state.todos.length})</TitleWrapper>
      <Stack spacing={1} direction="row">
        <TextField
          label="Add New Task"
          variant="outlined"
          size="small"
          fullWidth
          value={state.currentTodo}
          onChange={onChange}
        />
        <Button
          variant="contained"
          onClick={onAdd}
          disabled={state.currentTodo == ""}
        >
          Add
        </Button>
      </Stack>

      <List>
        {state.todos.map(
          ({ todo, count }: { todo: string; count: number }, index: number) => (
            <ListItem
              button
              key={`todo_${index}`}
              divider
              selected={props.todo === todo}
              onClick={(event) => onClick(event, index)}
            >
              <ListItemText primary={todo}></ListItemText>
              <ListItemSecondaryAction>
                <Fragment>
                  [{count}]
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onIncrement(todo)}
                  >
                    <AddCircleIcon color="success" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    disabled={count == 1}
                    onClick={() => onDecrement(todo)}
                  >
                    <RemoveCircleOutlineIcon color="success" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => onDelete(todo)}
                    disabled={
                      props.timerState !== TimerState.Stopped &&
                      todo === props.todo
                    }
                  >
                    <DeleteIcon sx={{ color: pink[500] }} />
                  </IconButton>
                </Fragment>
              </ListItemSecondaryAction>
            </ListItem>
          )
        )}
      </List>
    </Stack>
  );
}

// styled components

const TitleWrapper = styled.div`
  text-align: center;
`;
