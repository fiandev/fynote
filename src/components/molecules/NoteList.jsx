import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { generateTime } from "../../utils/generator";

export default function NoteList({ note }) {
  let time = generateTime(note.updated_at);

  return (
    <Link
      to={`/note/${note.noteID}`}
      className="group/notelist h-24 flex flex-col gap-2 bg-sublight dark:bg-subdark rounded-lg p-2"
    >
      <div className="flex items-center justify-between gap-3 text-lg font-semibold text-dark dark:text-light">
        <h1>{note.title}</h1>
        <span className="hidden group-hover/notelist:block">
          <FaEye className="text-sm" />
        </span>
      </div>
      <p className="text-sm font-light">{note.content.slice(0, 30)}</p>
      <p className="capitalize text-xs font-semibold">{time}</p>
    </Link>
  );
}
