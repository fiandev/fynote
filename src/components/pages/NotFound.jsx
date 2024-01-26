import { Link } from "react-router-dom";

// src/components/NotFound.js
const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-gray-600">T
            he page you are looking for does not exist.
        </p>
        <Link to="/" className="text-sky-400">back to home</Link>
      </div>
    </div>
  );
};

export default NotFound;