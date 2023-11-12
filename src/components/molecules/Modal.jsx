import { useState } from "react";
import { FaXmark } from "react-icons/fa6";

export default function Modal ({ setExportModalOpened, children }) {
  const [closed, setClosed] = useState(false);
  
  const handler = () => {
    setClosed(!closed)
    setExportModalOpened(closed);
  }
  
  return (
     <div className="p-2 flex flex-col bg-sublight dark:bg-subdark gap-2 shadow-lg h-fit absolute top-8 inset-x-4">
        <button className="text-xl p-2 hover:border border-dark dark:border-light self-end" onClick={ handler }>
            <FaXmark/>
          </button>
        {children}
      </div>
    )
}