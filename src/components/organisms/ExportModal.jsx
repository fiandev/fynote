import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CiExport } from "react-icons/ci";

import Modal from "../molecules/Modal";
import ModalHead from "../molecules/ModalHead";
import ModalContent from "../molecules/ModalContent";
import InputFloating from "../molecules/InputFloating";

import Note from "../../utils/Note";

function stringToFile(filename, text) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text),
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export default function ExportModal({
  setExportModalOpened,
  children,
  items = [],
}) {
  const [loading, setLoading] = useState();
  const [inValid, setInValid] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState();

  const { noteID } = useParams();

  const handler = (e, exit) => {
    e.preventDefault();
    e.persist();

    if (password) setShowConfirmPassword(true);
    else setShowConfirmPassword(false);

    if (showConfirmPassword) {
      console.log(password, confirmPassword);
      if (password !== confirmPassword) {
        setInValid(true);
        return;
      }
    }

    setInValid(false);
    if (!exit) handler(e, true);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    if (showConfirmPassword && password !== password) {
      setInValid(true);
      return;
    }

    let note = Note.select(noteID);
    let encrypted = Note.backup(noteID, password);
    stringToFile(`${note.title}.bak`, encrypted);
  };

  // useEffect(() => {}, [inValid, showConfirmPassword])
  return (
    <Modal setExportModalOpened={setExportModalOpened}>
      <ModalHead>
        <h1 className="text-lg uppercase font-bold flex gap-2 items-center">
          <span>export</span>
          <CiExport />
        </h1>
      </ModalHead>

      <ModalContent>
        <form className="flex flex-col gap-4 p-2" onSubmit={handlerSubmit}>
          <InputFloating
            onInput={(e) => {
              setPassword(e.target.value);
              handler(e);
            }}
            label="password"
            name="password"
            inValid={inValid}
          />
          {showConfirmPassword && (
            <InputFloating
              onInput={(e) => {
                setConfirmPassword(e.target.value);
                handler(e);
              }}
              label="confirm password"
              name="confirm-password"
              inValid={inValid ? "confirm password doesn't match !" : null}
            />
          )}
          <button className="text-sm font-semibold self-end rounded-md hover:bg-primary hover:text-light w-fit p-2 uppercase text-dark dark:text-light bg-subprimary">
            export
          </button>
        </form>
      </ModalContent>
    </Modal>
  );
}
