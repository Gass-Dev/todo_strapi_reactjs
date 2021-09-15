import React, { useState, useRef } from "react";

function TodoForm(props) {
  const [content, setContent] = useState(props.edit ? props.edit.value : "");
  const [title, setTitle] = useState(props.edit ? props.edit.value : "");

  const contentRef = useRef(null);
  const titleRef = useRef(null);

  const handleChange = () => {
    setContent(contentRef.current.value);
    setTitle(titleRef.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      title: title,
      content: content,
    });

    setContent("");
    setTitle("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? (
        <>
          <input
            type="text"
            placeholder="Mettre à jour ma tâche"
            value={content}
            name="text"
            className="todo-input-edit"
            onChange={handleChange}
            ref={contentRef}
          />
          <button className="todo-button-edit">Mettre à jour</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Titre"
            value={title}
            name="text"
            className="todo-input-title"
            onChange={handleChange}
            ref={titleRef}
          />

          <input
            type="text"
            placeholder="Ajouter une tâche"
            value={content}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={contentRef}
          />
          <button className="todo-button">Ajouter</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
