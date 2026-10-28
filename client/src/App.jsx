
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [resetToken, setResetToken] = useState(0);

  const toggleTheme = () => {
    setDarkMode((previousMode) => !previousMode);
  };

  const handleNewPuzzle = () => {
    setResetToken((previousToken) => previousToken + 1);
  };

  return (
    <div className={darkMode ? "dark min-h-screen" : "min-h-screen"}>
      <BrowserRouter>
        <Navbar
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          onNewPuzzle={handleNewPuzzle}
        />

        <Routes>
          <Route
            path="/"
            element={<Home resetToken={resetToken} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
