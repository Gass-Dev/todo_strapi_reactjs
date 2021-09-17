import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const api = "https://strapi.naoroy.dev/notes/";

function TodoList() {
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos().then((todos) => {
      setTodos(todos);
    });
  });

  const getTodos = () => {
    return new Promise((fulfill, reject) => {
      axios
        .get(api)
        .then((response) => {
          fulfill(response.data);
        })
        .catch((error) => reject(error));
    });
  };

  const addTodo = (todo) => {
    if (!todo.content || !todo.title) {
      return;
    }
    axios
      .post(api, {
        Title: todo.title,
        Content: todo.content,
      })
      .then(() => {
        getTodos().then((todos) => {
          setTodos(todos);
        });
      });
  };

  const updateTodo = (todoId, todo) => {
    if (!todo.content) {
      return;
    }
      axios
        .put(api + todoId, {
          Title: todo.title,
          Content: todo.content,
        })
        .then(() => {
          getTodos().then((todos) => {
            setTodos(todos);
          })
        })
  };

  const removeTodo = (id) => {
    return new Promise((fulfill, reject) => {
      axios
        .delete(api + id)
        .then((response) => {
          fulfill(id);
        })
        .catch((error) => reject(error));
    });
  };

  const completeTodo = (id) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  };

  return (
    <div>
      <h2>Quel est ton plan pour aujourd'hui?</h2>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
