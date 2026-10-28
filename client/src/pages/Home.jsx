
import React from "react";
import SudokuBoard from "../components/SudokuBoard";

const Home = ({ resetToken = 0 }) => {
  return (
    <main className="min-h-screen w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300 px-4 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Sudoku Solver
          </h1>

          <p className="mt-3 text-sm sm:text-lg text-slate-600 dark:text-slate-300">
            Challenge your mind, one number at a time.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Select an empty cell, then choose a number from 1 to 9.
          </p>
        </header>

        <SudokuBoard resetToken={resetToken} />

        <footer className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
          Every row, column, and 3 × 3 box must contain the numbers 1–9.
        </footer>
      </div>
    </main>
  );
};

export default Home;
