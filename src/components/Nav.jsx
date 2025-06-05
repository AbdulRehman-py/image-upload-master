import { useNavigate } from "react-router-dom";

const Nav = ({ isDarkMode, setIsDarkMode, onReset }) => {
  
  const setbgcolor = () => (isDarkMode ? "bg-[#121826]" : "bg-gray-50");
  const navigate = useNavigate();
  

  return (
    <header
      className={`py-6 px-10 border-b header ${
        isDarkMode ? "border-gray-600" : "border-gray-100"
      } ${setbgcolor()}`}
    >
      <nav>
        <ul className="flex items-center justify-between">
          <li className="flex items-center space-x-2">
            <img src={`${isDarkMode ? "/logo-white.svg" : "/logo.svg"}`} alt="logo" width={130} height={60} />
          </li>
           <div className="flex items-center justify-center gap-2">
          <li
            className={`p-1 rounded-[6px] shadow-md ${
              isDarkMode ? "bg-gray-400" : "bg-white"
            }`}
          >
           
            <img
              src={isDarkMode ? "/Sun_fill.svg" : "/Moon_fill.svg"}
              alt={isDarkMode ? "sun icon" : "moon icon"}
              width={25}
              height={15}
              className={
                isDarkMode ? "filter brightness-0" : "filter brightness-1"
              }
              onClick={() => setIsDarkMode(!isDarkMode)}
            />
           
          </li>
           <button className="bg-red-500 hover:bg-red-700 rounded-[6px] outline-none font-mono px-1 py-1 text-black" 
           onClick={() => {
        navigate("/");
        onReset && onReset();
      }}
           >reset</button>
            </div>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
