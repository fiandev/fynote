import { useState, useEffect } from "react";
import { SiFastapi } from "react-icons/si";
import { FaStar, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import Note from "../../utils/Note";
import NoteList from "../molecules/NoteList";
import Navigation from "../organisms/Navigation";
import ButtonCreateNote from "../atoms/ButtonCreateNote";

export default function Home() {
  let [notes, setNotes] = useState(Note.all());

  const handlerSearchBox = (e) => {
    let query = e.target.value;

    setNotes(Note.find(query));
    console.log({ query, notes });
  };

  useEffect(() => {}, [notes]);

  return (
    <section className="h-full">
      <Navigation handlerSearchBox={handlerSearchBox} />
      <div className="h-full relative p-2 flex flex-col gap-4 bg-light dark:bg-dark">
        <div className="max-h-screen overflow-y-scroll grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {notes ? notes.map((note) => <NoteList note={note} />) : null}
        </div>
        <ButtonCreateNote className="fixed w-12 h-12 bottom-4 right-4 rounded-full" />
      </div>
    </section>
  );
}
