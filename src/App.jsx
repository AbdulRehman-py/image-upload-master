import {Nav, Dropfile, ShowImage} from "./components/index.js";
import { useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

// Wrapper to extract filename param and pass to ShowImage
function ShowImageWrapper({ isDarkMode }) {
  const { filename } = useParams();
  return <ShowImage isDarkMode={isDarkMode} filename={filename} />;
}

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <Nav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Routes>
        <Route
          path="/"
          element={<Dropfile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />}
        />
        <Route
          path="/image/:filename"
          element={<ShowImageWrapper isDarkMode={isDarkMode} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;