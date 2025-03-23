import {Nav, Dropfile} from "./components/index.js";
import { useState } from "react";


 
const App = () => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  
  return (
    <>
      <Nav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Dropfile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
    </>
  )
}

export default App