import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    content: "",
    title: ""
  });

  const submitUpdate = (content, title) => {
    updateTodo(edit.id, content, title);
    setEdit({
      id: null,
      content: "",
      title: ""
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <div className={todo.isComplete ? "todo-complete" : "todo-row"} key={index}>
      <div
        className="todoAffichageList"
        key={todo.id}
        onClick={() => completeTodo(todo.id)}
      >
        <div className="todoTitle">{todo.Title}</div>
        <div className="todoContent">{todo.Content}</div>
      </div>
      <div className="icon">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() =>
            setEdit({ id: todo.id, content: todo.Content, title: todo.Title})
          }
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;
