import { useState, useRef, useCallback } from "react";
import { Link, redirect, useParams } from "react-router-dom";
import { CiExport } from "react-icons/ci";
import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";
import { IoIosUndo, IoIosRedo } from "react-icons/io";
import { generateTime } from "../../utils/generator";

import Note from "../../utils/Note";
import ExportModal from "../organisms/ExportModal";

function textAreaAdjust(event) {
  event.target.style.height = "1px";
  event.target.style.height = 25 + event.target.scrollHeight + "px";
}

export default function ShowNote() {
  let { noteID } = useParams();
  let note = Note.show(noteID);
  
  if (!note) return window.location.href = "/404";

  let time = generateTime(note.updated_at);

  let [exportModalOpened, setExportModalOpened] = useState(false);
  let [characters, setCharacters] = useState(note.content || "");
  let [saved, setSaved] = useState(true);

  let inputTitleRef = useRef();
  let inputContentRef = useRef();


  const saveNote = useCallback(() => {
    Note.update({
      noteID: noteID,
      title: inputTitleRef.current.value,
      content: inputContentRef.current.value,
    });

    console.log({
      noteID: noteID,
      title: inputTitleRef.current.value,
      content: inputContentRef.current.value,
    });
    setSaved(true);
  }, []);

  const deleteNote = useCallback(() => {
    let confirmed = confirm(`are you sure, this note will be delete !`);
    if (confirmed) {
      Note.delete(noteID);
      alert("delete note successfully !");
      window.location.href = "/";
    }
  }, [])
  const handler = (e) => {
    let element = e.target;
    setCharacters(element.value);
  };

  return (
    <div className="relative w-screen h-screen bg-light dark:bg-dark">
      {exportModalOpened && (
        <ExportModal setExportModalOpened={setExportModalOpened} />
      )}

      <div className="flex items-center justify-between p-2 text-lg">
        <Link to="/">
          <FaArrowLeft />
        </Link>
        <div className="flex items-center gap-2">
        <button
            className={`${saved ? "text-primary" : ""}`}
            onClick={saveNote}
          >
            <FaSave />
          </button><button
            className="text-rose-500"
            onClick={deleteNote}
          >
            <FaTrash />
          </button>

          <button onClick={() => setExportModalOpened(!exportModalOpened)}>
            <CiExport />
          </button>

          <button>
            <IoIosUndo />
          </button>
          <button>
            <IoIosRedo />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="note-title"
            className="text-xl text-sublight dark:text-subdark"
          >
            <input
              onChange={saveNote}
              ref={inputTitleRef}
              placeholder="Title"
              onInput={(e) => {
                handler(e);
              }}
              value={note.title}
              className="text-dark dark:text-light bg-transparent outline-0 border-0"
            />
          </label>

          <p className="text-xs text-dark dark:text-light font-semibold">
            <span className="capitalize">{time}</span> |{" "}
            <span>{characters.length}</span> characters
          </p>
        </div>

        <label htmlFor="note-field" className="min-h-screen h-screen text-sm">
          <textarea
            id="note-field"
            ref={inputContentRef}
            onKeyUp={(e) => {
              textAreaAdjust(e);
              handler(e);
            }}
            onChange={saveNote}
            placeholder="start typing"
            className="border-0 outline-0 w-full h-full bg-transparent"
          >
            {note.content}
          </textarea>
        </label>
      </div>
    </div>
  );
}
