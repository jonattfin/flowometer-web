import {
  Button,
  List,
  Stack,
  TextField,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Fragment, useEffect, useReducer, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { pink } from "@mui/material/colors";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import styled from "@emotion/styled";

import { reducer, initialState, ActionTypeValue } from "./todos-reducer";

export type TodosProps = {};

export default function Todos(props: TodosProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentTodo, selectedTodoIndex, todos } = state;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      actionType: ActionTypeValue.ChangeDefaultTodo,
      payload: event.target.value,
    });
  };

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    dispatch({
      actionType: ActionTypeValue.ChangeSelectedTodo,
      payload: index,
    });
  };

  const handleOnAdd = () => {
    dispatch({ actionType: ActionTypeValue.AddTodo, payload: undefined });
  };

  const handleOnIncrease = (todo: string) => {
    dispatch({
      actionType: ActionTypeValue.IncreaseCounter,
      payload: todo,
    });
  };

  const handleOnDecrease = (todo: string) => {
    dispatch({
      actionType: ActionTypeValue.DecreaseCounter,
      payload: todo,
    });
  };

  const handleOnDelete = (todo: string) => {
    dispatch({ actionType: ActionTypeValue.DeleteTodo, payload: todo });
  };

  return (
    <Stack spacing={1}>
      <TitleWrapper>Task List ({todos.length})</TitleWrapper>
      <Stack spacing={1} direction="row">
        <TextField
          label="Add New Task"
          variant="outlined"
          size="small"
          fullWidth
          value={currentTodo}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          onClick={handleOnAdd}
          disabled={currentTodo == ""}
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
              selected={selectedTodoIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
              secondaryAction={
                <Fragment>
                  [{count}]
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleOnIncrease(todo)}
                  >
                    <AddCircleIcon color="success" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    disabled={count == 1}
                    onClick={() => handleOnDecrease(todo)}
                  >
                    <RemoveCircleOutlineIcon color="success" />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleOnDelete(todo)}
                  >
                    <DeleteIcon sx={{ color: pink[500] }} />
                  </IconButton>
                </Fragment>
              }
            >
              <ListItemText primary={todo}></ListItemText>
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
