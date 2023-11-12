import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { IoIosUndo, IoIosRedo } from "react-icons/io";
import { generateTime } from "../../utils/generator";
import Cookie from "../../utils/Cookie";
import Note from "../../utils/Note";

function textAreaAdjust(event) {
  event.target.style.height = "1px";
  event.target.style.height = 25 + event.target.scrollHeight + "px";
}

export default function CreateNote() {
  let [characters, setCharacters] = useState("");
  let [saved, setSaved] = useState(false);
  let [changed, setChanged] = useState(false);
  let [currentNoteID, setCurrentNoteID] = useState(null);
  let time = generateTime();
  let inputTitleRef = useRef();
  let inputContentRef = useRef();

  useEffect(() => {}, [changed]);
  const saveNote = (e) => {
    let note;

    if (!changed) {
      note = Note.create({
        title: inputTitleRef.current.value,
        content: inputContentRef.current.value,
      });
      setCurrentNoteID(note.noteID);
    } else {
      note = Note.update({
        noteID: currentNoteID,
        title: inputTitleRef.current.value,
        content: inputContentRef.current.value,
      });
    }

    setSaved(true);
    setChanged(false);
  };

  const changeHandler = () => {
    if (!saved) return;

    setChanged(true);
  };

  const handler = (e) => {
    let element = e.target;
    setCharacters(element.value);
  };
  return (
    <div>
      <div className="flex items-center justify-between p-2 text-lg">
        <Link to="/">
          <FaArrowLeft />
        </Link>
        <div className="flex items-center gap-2">
          <button
            className={`${saved && !changed ? "text-primary" : ""}`}
            onClick={saveNote}
          >
            <FaSave />
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
              ref={inputTitleRef}
              placeholder="Title"
              onKeyUp={changeHandler}
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
              changeHandler(e);
            }}
            placeholder="start typing"
            className="border-0 outline-0 w-full h-full bg-transparent"
          ></textarea>
        </label>
      </div>
    </div>
  );
}
