import axios from "axios";
import React from "react";

function Note(props) {
  const onEdit = async () => {
    props.setUpdate(true);
    props.setSelectedNote({
      id: props.id,
      title: props.title,
      content: props.content,
    });
  };

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:8000/api/delete/${id}`);
      props.getNotes();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="note" autocomplete="off">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={() => onEdit()}>E </button>
      <button onClick={() => handleDelete(props.id)}>D</button>
    </div>
  );
}

export default Note;
