import {
  Button,
  List,
  Stack,
  TextField,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Fragment, useReducer, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { pink } from "@mui/material/colors";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import styled from "@emotion/styled";

export default function Todos() {
  const [todo, setTodo] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleOnAdd = () => {
    dispatch({ actionType: "AddTodo", payload: { todo } });
    setTodo("");
  };

  const handleOnIncrease = (todo: string) => {
    dispatch({ actionType: "IncreaseCounter", payload: { todo } });
  };

  const handleOnDecrease = (todo: string) => {
    dispatch({ actionType: "DecreaseCounter", payload: { todo } });
  };

  const handleOnDelete = (todo: string) => {
    dispatch({ actionType: "DeleteTodo", payload: { todo } });
  };

  return (
    <Stack spacing={1}>
      <TitleWrapper>Todo List ({state.length})</TitleWrapper>
      <Stack spacing={1} direction="row">
        <TextField
          label="Text"
          variant="outlined"
          size="small"
          fullWidth
          value={todo}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={handleOnAdd} disabled={todo == ""}>
          Add
        </Button>
      </Stack>

      <List>
        {state.map(
          ({ todo, count }: { todo: string; count: number }, index: number) => (
            <ListItem
              button
              key={`todo_${index}`}
              divider
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

// helpers

const initialState = [
  { todo: "x", count: 1 },
  { todo: "y", count: 1 },
  { todo: "z", count: 1 },
];

const reducer = (state: any, action: any) => {
  const { actionType, payload } = action;

  switch (actionType) {
    case "AddTodo": {
      return [...state, { todo: payload.todo, count: 1 }];
    }
    case "IncreaseCounter": {
      return [
        ...state.map((item: any) =>
          item.todo != payload.todo
            ? item
            : { todo: payload.todo, count: item.count + 1 }
        ),
      ];
    }
    case "DecreaseCounter": {
      return [
        ...state.map((item: any) =>
          item.todo != payload.todo
            ? item
            : { todo: payload.todo, count: item.count - 1 }
        ),
      ];
    }
    case "DeleteTodo": {
      return [...state.filter((item: any) => item.todo != payload.todo)];
    }
    default:
      return state;
  }
};
