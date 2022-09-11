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
  remainingTodos: any[];
  remainingHours: number;
  remainingMinutes: number;

  completedTodos: any[];
  completedHours: number;
  completedMinutes: number;

  selectedTodoIndex: number;
  timerState: TimerState;

  onAdd: () => void;
  onClick: (index: number) => void;
  onIncrease: (index: number) => void;
  onDecrease: (index: number) => void;
  onDelete: (index: number) => void;
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
              { todo, count }: { todo: string; count: number },
              index: number
            ) => (
              <ListItem
                button
                key={`todo_${index}`}
                divider
                selected={index === props.selectedTodoIndex}
                onClick={(event) => props.onClick(index)}
              >
                <ListItemText primary={todo}></ListItemText>
                <ListItemSecondaryAction>
                  <Fragment>
                    [{count}]
                    <IconButton
                      edge="end"
                      onClick={() => props.onIncrease(index)}
                    >
                      <AddCircleIcon color="success" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      disabled={count == 1}
                      onClick={() => props.onDecrease(index)}
                    >
                      <RemoveCircleOutlineIcon color="success" />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => props.onDelete(index)}
                      disabled={
                        props.timerState != TimerState.Stopped &&
                        props.selectedTodoIndex == index
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
