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
import { Fragment, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { pink } from "@mui/material/colors";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import styled from "@emotion/styled";

import { useTimerDuration, useTodos } from "./../../_shared_/app-context";

import { ActionTypeValue } from "./todos-reducer";
import { TimerState } from "./timer-reducer";

export type TodosProps = {
  todo: string;
  timerState: TimerState;
  onSelectedTodoChanged: (text: string) => void;
};

export default function Todos(props: TodosProps) {
  const { state, dispatch } = useTodos();
  const { state: timerDuration } = useTimerDuration();

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

  function getTime(items: any[]) {
    const totalMinutes = items.reduce(
      (prevValue: number, currentValue: any) => prevValue + currentValue * timerDuration,
      0
    );

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    return { hours, minutes };
  }

  const { hours: remainingHours, minutes: remainingMinutes } = getTime(
    state.todos.map((t: any) => t.count)
  );
  const { hours: completedHours, minutes: completedMinutes } = getTime(
    state.completedTodos.map((t: any) => t.completed)
  );

  const remainingTodos = state.todos.filter((t: any) => t.count >= 1);
  const completedTodos = state.completedTodos;

  return (
    <Stack spacing={1}>
      <WrapperDiv>
        Todo list ({remainingTodos.length}) [{remainingHours}h :{" "}
        {remainingMinutes}
        m]
      </WrapperDiv>
      <Stack spacing={1} direction="row">
        <TextField
          label="Add new todo"
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
      {remainingTodos.length == 0 && (
        <WrapperDiv>Todo list is empty.</WrapperDiv>
      )}
      {remainingTodos.length > 0 && (
        <List>
          {remainingTodos.map(
            (
              { todo, count }: { todo: string; count: number },
              index: number
            ) => (
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
      )}
      {completedTodos.length > 0 && (
        <>
          <WrapperDiv>
            Completed todo list ({completedTodos.length}) [{completedHours}h :{" "}
            {completedMinutes}m]
          </WrapperDiv>
          <List>
            {completedTodos.map(
              (
                { todo, completed }: { todo: string; completed: number },
                index: number
              ) => (
                <ListItem button key={`completed_todo_${index}`} divider>
                  <ListItemText primary={todo}></ListItemText>
                  <ListItemSecondaryAction>
                    <Fragment>[{completed}]</Fragment>
                  </ListItemSecondaryAction>
                </ListItem>
              )
            )}
          </List>
        </>
      )}
    </Stack>
  );
}

// styled components

const WrapperDiv = styled.div`
  text-align: center;
`;
