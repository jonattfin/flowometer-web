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
import { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { pink } from "@mui/material/colors";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import styled from "@emotion/styled";

import { TimerState } from "../../../services/reducers/timer-reducer";

export type TodosProps = {
  todoText: string;
  onChange: (s: string) => void;
  remainingTodos: {
    todoGuid: string;
    todo: string;
    count: number;
  }[];
  remainingHours: number;
  remainingMinutes: number;

  completedTodos: {
    todo: string;
    completed: number;
  }[];
  completedHours: number;
  completedMinutes: number;

  selectedTodoGuid?: string;
  timerState: TimerState;

  onAdd: () => void;
  onClick: (guid: string) => void;
  onIncrease: (guid: string) => void;
  onDecrease: (guid: string) => void;
  onDelete: (guid: string) => void;
};

export default function TodosComponent(props: TodosProps) {
  return (
    <Stack spacing={1}>
      <WrapperDiv>
        Todo list ({props.remainingTodos.length}) [{props.remainingHours}h :{" "}
        {props.remainingMinutes}
        m]
      </WrapperDiv>
      <Stack spacing={1} direction="row">
        <TextField
          label="Add new todo"
          variant="outlined"
          size="small"
          fullWidth
          value={props.todoText}
          onChange={(ev) => props.onChange(ev.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => props.onAdd()}
          disabled={props.todoText.length == 0}
        >
          Add
        </Button>
      </Stack>
      {props.remainingTodos.length == 0 && (
        <WrapperDiv>Todo list is empty.</WrapperDiv>
      )}
      {props.remainingTodos.length > 0 && (
        <List>
          {props.remainingTodos.map(
            (
              {
                todoGuid,
                todo,
                count,
              }: { todoGuid: string; todo: string; count: number },
              index: number
            ) => {
              return (
                <ListItem
                  button
                  key={`todo_${index}`}
                  divider
                  selected={todoGuid === props.selectedTodoGuid}
                  onClick={(event) => props.onClick(todoGuid)}
                >
                  <ListItemText primary={todo}></ListItemText>
                  <ListItemSecondaryAction>
                    <Fragment>
                      [{count}]
                      <IconButton
                        edge="end"
                        onClick={() => props.onIncrease(todoGuid)}
                      >
                        <AddCircleIcon color="success" />
                      </IconButton>
                      <IconButton
                        edge="end"
                        disabled={count == 1}
                        onClick={() => props.onDecrease(todoGuid)}
                      >
                        <RemoveCircleOutlineIcon color="success" />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => props.onDelete(todoGuid)}
                        disabled={
                          props.timerState != TimerState.Stopped &&
                          props.selectedTodoGuid == todoGuid
                        }
                      >
                        <DeleteIcon sx={{ color: pink[500] }} />
                      </IconButton>
                    </Fragment>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            }
          )}
        </List>
      )}
      {props.completedTodos.length > 0 && (
        <>
          <WrapperDiv>
            Completed todo list ({props.completedTodos.length}) [
            {props.completedHours}h : {props.completedMinutes}m]
          </WrapperDiv>
          <List>
            {props.completedTodos.map(
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
