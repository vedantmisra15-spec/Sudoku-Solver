
import React, { useState } from "react";
import {
  MdOutlineDarkMode,
  MdOutlineWbSunny,
} from "react-icons/md";
import { IoExtensionPuzzleOutline } from "react-icons/io5";

const Navbar = ({ darkMode, onToggleTheme, onNewPuzzle }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <nav className="w-full min-h-[72px] sticky top-0 z-20 bg-white dark:bg-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3 px-4 sm:px-10 py-3">
        <div className="text-xl font-bold text-slate-800 dark:text-white">
          Sudoku<span className="text-blue-500">Solver</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title="Toggle light/dark mode"
            className="text-xl bg-blue-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-2xl px-3 h-11 flex items-center hover:bg-blue-200 dark:hover:bg-slate-600 transition-colors"
          >
            {darkMode ? <MdOutlineWbSunny /> : <MdOutlineDarkMode />}
          </button>

          <button
            onClick={onNewPuzzle}
            className="flex items-center justify-center gap-2 text-sm sm:text-base font-semibold bg-blue-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-blue-200 dark:hover:bg-slate-600 rounded-2xl h-11 px-3 transition-colors"
          >
            <IoExtensionPuzzleOutline />
            New Puzzle
          </button>

          <button
            onClick={() => setShowInstructions(true)}
            className="text-sm sm:text-base font-semibold h-11 bg-blue-100 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-blue-200 dark:hover:bg-slate-600 px-3 rounded-2xl transition-colors"
          >
            How it Works?
          </button>
        </div>
      </nav>

      {showInstructions && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowInstructions(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="instructions-title"
            className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 text-slate-800 dark:text-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2
              id="instructions-title"
              className="text-2xl font-bold mb-4"
            >
              How to Play Sudoku
            </h2>

            <ul className="list-disc pl-5 space-y-2">
              <li>Fill each empty cell with a number from 1 to 9.</li>
              <li>Each row must contain numbers 1–9 without repetition.</li>
              <li>Each column must contain numbers 1–9 without repetition.</li>
              <li>Each 3×3 box must contain numbers 1–9 without repetition.</li>
              <li>Select a cell, then choose a number to fill it.</li>
              <li>Use Check to validate your answers.</li>
              <li>Use Solve to reveal the solution.</li>
            </ul>

            <button
              onClick={() => setShowInstructions(false)}
              className="mt-6 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
