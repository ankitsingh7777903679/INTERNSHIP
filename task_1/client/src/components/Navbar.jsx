import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-gray-800 p-4 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          Student Management
        </div>
        <div className="space-x-4">
          <Link 
            to="/students" 
            className={`${
              location.pathname === '/students' 
                ? 'text-blue-500 font-bold' 
                : 'text-gray-300 hover:text-white'
            } text-lg`}
          >
            Students
          </Link>
          <Link 
            to="/academic" 
            className={`${
              location.pathname === '/academic' 
                ? 'text-blue-500 font-bold' 
                : 'text-gray-300 hover:text-white'
            } text-lg`}
          >
            Academic
          </Link>
        </div>
      </div>
    </nav>
  );
}