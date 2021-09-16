import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

const api = "https://strapi.naoroy.dev/notes/";

function TodoList() {
  let [todos, setTodos] = useState([]);

  useEffect((todos) => {
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
    if (!todo.content) {
      return;
    }
    return new Promise((setTodos) => { // fulfill, reject
      axios
        .post(api, {
          Title: todo.title,
          Content: todo.content,
        })
        .then(() => {
          getTodos().then((todo) => {
            setTodos(todo);
          });
        });
    });
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text) {
      return;
    }
    return new Promise((prev) => {
      axios.put().then(() => {
        setTodos(prev);
      });
    });
    // setTodos((prev) =>
    //   prev.map((item) => (item.id === todoId ? newValue : item))
    // );
  };

  const removeTodo = (id) => {
    //const removeArr = [...todos].filter((todo) => todo.id !== id);
    return new Promise((setTodos) => {
      axios.delete(api + id).then(() => {
        setTodos(id);
      });
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