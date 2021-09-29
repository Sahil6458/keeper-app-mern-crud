import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
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
        await axios.put(`http://localhost:8000/api/update/`, data);
        props.setSelectedNote({
          id: null,
          title: null,
          content: null,
        });
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
          autoFocus="on"
          autoComplete="off"
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

        <Zoom in={true}>
          <button onClick={submitNote}>
            {props.update ? <NoteAltIcon /> : <NoteAddIcon />}
          </button>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
