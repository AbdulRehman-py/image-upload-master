import { useState } from "react"

const Nav = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    return (
      <header className="bg-gray-50 py-6 px-10 border-b border-gray-200">
        <nav>
          <ul className="flex items-center justify-between">
            <li className="flex items-center space-x-2">
              <img src="/logo-small.svg" alt="logo" width={30} height={20} />
              <span className="font-mono text-base font-semibold">ImageUploader</span>
            </li>
            <li className={ "p-1 bg-white rounded-[6px] shadow-md"}>
              <img 
                src={isDarkMode ? "/Sun_fill.svg" : "/Moon_fill.svg"} 
                alt={isDarkMode ? "sun icon" : "moon icon"} 
                width={25} 
                height={15} 
                className={isDarkMode ? "filter contrast-50" : "filter invert "} 
                onClick={() => setIsDarkMode(!isDarkMode)} 
              />
            </li>
          </ul>
        </nav>
      </header>
    )
}

export default Nav