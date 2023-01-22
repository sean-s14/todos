import { useState, useEffect } from "react";

import {
  Box,
  Paper,
  TextField,
  Checkbox,
  Stack,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import {
  LayersClear,
  RemoveCircleOutline,
  AddCircleOutline,
} from "@mui/icons-material";

interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

function Todo() {
  const [todo, setTodo] = useState<string | null>(null);
  const [todos, setTodos] = useState<ITodo[] | null>(null);

  useEffect(() => {
    console.log("Item :", todo);
  }, [todo]);

  useEffect(() => {
    console.log("Todos :", todos);
  }, [todos]);

  function addTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (todo === null) return;
    let newId;
    if (todos !== undefined && todos !== null) {
      newId = Math.max(...todos.map((a) => a.id)) + 1;
      console.log("New ID :", newId);
    }
    let newTodo: ITodo = {
      id: newId ? newId : 1,
      title: todo,
      completed: false,
    };
    setTodos((oldTodos) => {
      if (oldTodos !== null) {
        return [...oldTodos, newTodo];
      }
      return [newTodo];
    });
    setTodo(null);
  }

  function completeTodo(id: number) {
    if (todos === undefined || todos === null) return;
    setTodos((oldTodos) => {
      if (oldTodos === undefined || oldTodos === null) return null;

      return oldTodos.map((oldTodo) => {
        if (oldTodo.id === id) {
          oldTodo.completed = !oldTodo.completed;
        }
        return oldTodo;
      });
    });
  }

  function deleteTodo(id: number) {
    setTodos((oldTodos) => {
      if (oldTodos !== undefined && oldTodos !== null) {
        let newTodos = oldTodos.filter((oldTodo) => oldTodo.id !== id);
        if (newTodos.length === 0) {
          return null;
        }
        return newTodos;
      }
      return oldTodos;
    });
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          minWidth: 300,
          maxWidth: "90%",
          minHeight: 150,
          maxHeight: 600,
          p: 2,
        }}
      >
        {/* Add Item */}
        <form onSubmit={addTodo} style={{ marginBottom: todos ? 0 : "20px" }}>
          <Stack direction="row" sx={{ height: 40 }} spacing={2}>
            <TextField
              onChange={(e) => setTodo(e.target.value)}
              value={todo || ""}
              label="Todo"
              variant="outlined"
              size="small"
              sx={{ width: "55%", maxWidth: 300 }}
              autoComplete="off"
            />
            <Button
              variant="outlined"
              type="submit"
              sx={{ width: "40%", maxWidth: 200 }}
            >
              Add Todo
            </Button>
          </Stack>
        </form>

        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!todos ? (
            <Typography sx={{ color: "grey" }}>No Todos</Typography>
          ) : (
            todos.map(({ id, title, completed }, index) => (
              <ListItem key={index} disablePadding>
                <ListItemText
                  primary={title}
                  sx={{
                    color: completed ? "grey" : "inherit",
                  }}
                />
                <Checkbox
                  checked={completed}
                  onClick={() => completeTodo(id)}
                />
                <ListItemIcon>
                  <ListItemButton onClick={() => deleteTodo(id)}>
                    <RemoveCircleOutline />
                  </ListItemButton>
                </ListItemIcon>
              </ListItem>
            ))
          )}

          {todos && (
            <Button
              onClick={() => setTodos(null)}
              color="warning"
              endIcon={<LayersClear />}
              sx={{ px: 2, mt: 2 }}
            >
              Clear All Items
            </Button>
          )}
        </List>
      </Paper>
    </Box>
  );
}

export default Todo;
