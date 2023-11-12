import { useState, useRef, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CiExport } from "react-icons/ci";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { IoIosUndo, IoIosRedo } from "react-icons/io";
import { generateTime } from "../../utils/generator";
import Crypto from "../../utils/Crypto";
import Note from "../../utils/Note";
import InputFloating from "../molecules/InputFloating";

async function readText(event) {
  const file = event.target.files.item(0)
  const text = await file.text();
  
  return text;
}

export default function ImportNote ({ children }) {
  const [fileContent, setFileContent] = useState();
  const [fileDropped, setFileDropped] = useState();
  const [password, setPassword] = useState();
  const [inValid, setInValid] = useState();
  const navigate = useNavigate();
  
  const fileHandler = async (e) => {
    let filename = e.target.files[0].name;
    let content = await readText(e);
    
    setFileDropped(filename)
    setFileContent(content)
  }
  
  const submitHandler = (e) => {
    e.preventDefault()
    try {
      let decrypted = Crypto.decrypt(fileContent, password)
      
      let note = JSON.parse(decrypted);
      console.log({ decrypted, note })
      
      Note.insert(note.noteID, note);
      
      alert(`note ${note.noteID} successfully imported !`);
      return navigate("/")
    } catch(err) {
      alert("failed import note, check your password")
      throw new Error(err)
    }
    
  }
  
  return (
      <div>
        <div className="flex items-center justify-between p-2 text-lg">
        <Link to="/" className="flex items-center gap-2 text-subdark dark:sublight">
          <FaArrowLeft />
          <span>back</span>
        </Link>
        <h1 className="uppercase font-bold text-lg text-dark dark:text-light">import</h1>
      </div>
      
      <form onSubmit={submitHandler} className="flex flex-col gap-2 p-2">
        <label for="attach-file" className={ `${ fileDropped ? "capitalize font-semibold text-xl" :"font-light text-lg lowercase" } flex items-center justify-center w-full h-32 border border-dashed border-2 cursor-pointer border-subdark dark:border-sublight`}>
          <span>{ fileDropped || "Drag & drop or attach file here"} </span>
          <input onChange={fileHandler} type="file" className="hidden" id="attach-file" name="attach-file" />
        </label>
        
        <InputFloating onInput={(e) => {
          setPassword(e.target.value)
        }} label="password" name="password" inValid={inValid} />
        
        <button className="text-sm font-semibold self-end rounded-md hover:bg-primary hover:text-light w-fit p-2 uppercase text-dark dark:text-light bg-subprimary">
          export
        </button>
        </form>
      </div>
    )
}