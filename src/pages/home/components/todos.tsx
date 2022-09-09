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
import { Fragment, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { pink } from "@mui/material/colors";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import styled from "@emotion/styled";

import {
  useTimer,
  useTimerDuration,
  useTodos,
} from "./../../_shared_/app-context";

import { ActionTypeValue } from "./todos-reducer";
import { TimerState } from "./timer-reducer";

export type TodosProps = {};

export default function Todos(props: TodosProps) {
  const [todoText, setTodoText] = useState("");

  const { state: todosState, dispatch: todosDispatch } = useTodos();
  const { state: timerState } = useTimer();
  const { state: timerDuration } = useTimerDuration();

  function onClick(
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) {
    if (timerState.currentState != TimerState.Stopped) {
      return;
    }

    todosDispatch({
      type: ActionTypeValue.SetSelectedTodoIndex,
      payload: index,
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
          value={todoText}
          onChange={(ev) => setTodoText(ev.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => {
            todosDispatch({
              type: ActionTypeValue.AddTodo,
              payload: todoText,
            });

            setTodoText("");
          }}
          disabled={todoText.length == 0}
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
                selected={index === todosState.selectedTodoIndex}
                onClick={(event) => onClick(event, index)}
              >
                <ListItemText primary={todo}></ListItemText>
                <ListItemSecondaryAction>
                  <Fragment>
                    [{count}]
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        todosDispatch({
                          type: ActionTypeValue.IncreaseCounter,
                          payload: index,
                        })
                      }
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      disabled={count == 1}
                      onClick={() =>
                        todosDispatch({
                          type: ActionTypeValue.DecreaseCounter,
                          payload: index,
                        })
                      }
                    >
                      <RemoveCircleOutlineIcon color="success" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        todosDispatch({
                          type: ActionTypeValue.SetSelectedTodoIndex,
                          payload: -1,
                        });
                        todosDispatch({
                          type: ActionTypeValue.DeleteTodo,
                          payload: index,
                        });
                      }}
                      disabled={timerState.currentState != TimerState.Stopped && todosState.selectedTodoIndex == index}
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
