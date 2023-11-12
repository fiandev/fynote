import { FaXmark } from "react-icons/fa6";

export default function ModalHead ({ children, handler }) {
  
  return (
    <div className="flex justify-between p-2">
          { children }
        </div>
    )
}