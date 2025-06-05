import {Nav, Dropfile, ShowImage} from "./components/index.js";
import { useState } from "react";
import { HashRouter, Routes, Route, useParams, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

function ShowImageWrapper({ isDarkMode }) {
  const { filename } = useParams();
  return filename ? (
    <ShowImage isDarkMode={isDarkMode} filename={filename} />
  ) : (
    <Navigate to="/" replace />
  );
}

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropfilekey, setDropfilekey] = useState(0);

  const handleReset = () => {
    setDropfilekey(prevKey => prevKey + 1);
  };

  return (
    <HashRouter>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: isDarkMode ? '#1F2937' : '#FFFFFF',
          color: isDarkMode ? '#F3F4F6' : '#1F2937',
        },
      }} />
      <Nav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} onReset={handleReset}/>
      <Routes>
        <Route
          path="/"
          element={<Dropfile isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} key={dropfilekey} />}
        />
        <Route
          path="/image/:filename"
          element={<ShowImageWrapper isDarkMode={isDarkMode} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;