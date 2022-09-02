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

export type TodosProps = {
  onSelectedTodoChanged: (text?: string) => void;
};

export default function Todos(props: TodosProps) {
  const [todo, setTodo] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [todos, dispatch] = useReducer(reducer, initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(event.target.value);
  };

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    props.onSelectedTodoChanged(todos[index].todo);
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
    props.onSelectedTodoChanged(undefined);
    dispatch({ actionType: "DeleteTodo", payload: { todo } });
  };

  useEffect(() => {
    setTimeout(() => {
      props.onSelectedTodoChanged(todos[0]?.todo);
    }, 100);
  }, []);

  return (
    <Stack spacing={1}>
      <TitleWrapper>Task List ({todos.length})</TitleWrapper>
      <Stack spacing={1} direction="row">
        <TextField
          label="Add New Task"
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
        {todos.map(
          ({ todo, count }: { todo: string; count: number }, index: number) => (
            <ListItem
              button
              key={`todo_${index}`}
              divider
              selected={selectedIndex === index}
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

// helpers

type TodoType = {
  todo: string;
  count: number;
};

type ActionType = {
  actionType: string;
  payload: {
    todo: string;
  };
};

const initialState: TodoType[] = [
  { todo: "x", count: 1 },
  { todo: "y", count: 1 },
  { todo: "z", count: 1 },
];

const reducer = (state: TodoType[], action: ActionType) => {
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
