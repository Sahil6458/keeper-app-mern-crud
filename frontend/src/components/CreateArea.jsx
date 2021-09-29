import React, { useEffect, useState } from "react";
import axios from "axios";

function CreateArea(props) {
  const [note, setnote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    setnote({
      title: props.selectedNote.title || "",
      content: props.selectedNote.content || "",
    });
  }, [props.update, props.selectedNote]);

  const submitNote = async function (e) {
    e.preventDefault();

    // props.onAdd(note);
    try {
      const data = {
        id: props.selectedNote.id,
        title: note.title,
        content: note.content,
      };

      if (props.update) {
        let a = await axios.put(`http://localhost:8000/api/update/`, data);
        console.log(a);
        setnote(a.data);
        props.setUpdate(false);
      } else {
        await axios.post("http://localhost:8000/api/addNew", note);
        // props.onAdd(note);
      }
      props.getNotes();
    } catch (err) {
      console.log(err);
    }
    setnote({
      title: "",
      content: "",
    });
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setnote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  return (
    <div>
      <form>
        <input
          name="title"
          autocomplete="off"
          value={note.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={note.content}
          placeholder="Take a note..."
          onChange={handleChange}
          rows="3"
        />
        <button onClick={submitNote}>{props.update ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default CreateArea;
