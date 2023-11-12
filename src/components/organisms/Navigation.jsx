import { useState } from "react";
import { FaBook, FaSearch } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import NavLink from "../molecules/NavLink";
import ButtonMenu from "../molecules/ButtonMenu";
import Logo from "../atoms/Logo";
import NoteNavigator from "../../navigators/NoteNavigator";

export default function Navigation({ handlerSearchBox }) {
  const [navOpen, setNavOpen] = useState(false);

  const navHandler = () => {
    setNavOpen(!navOpen);
  };
  return (
    <nav className="relative w-full flex flex-col items-center gap-4 bg-light dark:bg-dark p-2">
      <div className="flex w-full items-center justify-between bg-light dark:bg-dark">
        <Logo name="FyNote" />
        <div className="flex items-center gap-2">
          {/*
          <button>
            <FaBook />
          </button>
          */}
        </div>

        <ButtonMenu navOpen={navOpen} handler={navHandler} />
        <div
          class={`${
            !navOpen ? "hidden lg:block" : "max-h-fit block"
          } transition z-10 w-48 rounded-lg shadow-sm overflow-hidden shadow-primary absolute right-8 bottom-[-60%] w-full delay-500 uppercase lg:w-fit lg:relative bg-light dark:bg-dark lg:bg-transparent font-bold text-light`}
        >
          <ul className="flex flex-col items-center lg:flex-row gap-2">
            {NoteNavigator.routes.map((navigator) => {
              return <NavLink href={navigator.path} name={navigator.name} />;
            })}
          </ul>
        </div>
      </div>

      <label
        htmlFor="search-box"
        className="w-3/4 flex items-center gap-2 rounded-full overflow-hidden bg-sublight dark:bg-subdark p-2 text-subdark dark:text-sublight"
      >
        <FaSearch />
        <input
          onKeyUp={handlerSearchBox}
          id="search-box"
          placeholder="search note.."
          className="outline-0 border-0 w-full h-max bg-transparent"
        />
      </label>
    </nav>
  );
}
