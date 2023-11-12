import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

export default function ({ className }) {
  return (
    <Link
      to="/create"
      className={`text-lg flex items-center justify-center p-2 bg-primary text-light dark:text-dark ${className}`}
    >
      <FaPlus />
    </Link>
  );
}
