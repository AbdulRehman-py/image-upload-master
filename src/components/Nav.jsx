

const Nav = ({isDarkMode, setIsDarkMode}) => {
  

  const setbgcolor = () => isDarkMode ? "bg-[#121826]" : "bg-gray-50";

  return (
    <header
      className={`py-6 px-[3rem] border-b header ${isDarkMode ? "border-gray-600" : "border-gray-100"} ${setbgcolor()}`}
    >
      <nav>
        <ul className="flex items-center justify-between">
          <li className="flex items-center space-x-2">
            <img src="/logo.svg" alt="logo" width={130} height={60}
            />
          </li>
          <li className={`p-1 rounded-[6px] shadow-md ${isDarkMode ? "bg-gray-400" : "bg-white"}`}>
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
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
