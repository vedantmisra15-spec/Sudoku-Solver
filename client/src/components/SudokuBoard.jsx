
import React, { useState, useEffect } from "react";

const PUZZLES = [
  [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0],
  ],
];

function canPlace(board, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === num) return false;
    if (i !== row && board[i][col] === num) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if ((r !== row || c !== col) && board[r][c] === num) {
        return false;
      }
    }
  }

  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] !== 0) continue;

      for (let num = 1; num <= 9; num++) {
        if (canPlace(board, row, col, num)) {
          board[row][col] = num;

          if (solveSudoku(board)) return true;

          board[row][col] = 0;
        }
      }

      return false;
    }
  }

  return true;
}

function findConflicts(board) {
  const conflicts = new Set();

  // Find duplicates in rows and columns.
  for (let i = 0; i < 9; i++) {
    for (let a = 0; a < 9; a++) {
      for (let b = a + 1; b < 9; b++) {
        if (board[i][a] !== 0 && board[i][a] === board[i][b]) {
          conflicts.add(`${i}-${a}`);
          conflicts.add(`${i}-${b}`);
        }

        if (board[a][i] !== 0 && board[a][i] === board[b][i]) {
          conflicts.add(`${a}-${i}`);
          conflicts.add(`${b}-${i}`);
        }
      }
    }
  }

  // Find duplicates in each 3x3 box.
  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      for (let a = 0; a < 9; a++) {
        for (let b = a + 1; b < 9; b++) {
          const r1 = boxRow + Math.floor(a / 3);
          const c1 = boxCol + (a % 3);
          const r2 = boxRow + Math.floor(b / 3);
          const c2 = boxCol + (b % 3);

          if (
            board[r1][c1] !== 0 &&
            board[r1][c1] === board[r2][c2]
          ) {
            conflicts.add(`${r1}-${c1}`);
            conflicts.add(`${r2}-${c2}`);
          }
        }
      }
    }
  }

  return conflicts;
}

const SudokuBoard = ({ resetToken = 0 }) => {
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [board, setBoard] = useState(() =>
    PUZZLES[0].map((row) => [...row])
  );
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [solved, setSolved] = useState(false);
  const [conflictCells, setConflictCells] = useState(new Set());

  const loadPuzzle = (index) => {
    setPuzzleIndex(index);
    setBoard(PUZZLES[index].map((row) => [...row]));
    setSelected(null);
    setMessage("");
    setSolved(false);
    setConflictCells(new Set());
  };

  useEffect(() => {
    if (resetToken === 0) return;

    loadPuzzle((puzzleIndex + 1) % PUZZLES.length);
  }, [resetToken]);

  const newPuzzle = () => {
    loadPuzzle((puzzleIndex + 1) % PUZZLES.length);
  };

  const enterNumber = (num) => {
    if (!selected || solved) return;

    const { row, col } = selected;
    if (PUZZLES[puzzleIndex][row][col] !== 0) return;

    const next = board.map((r) => [...r]);
    next[row][col] = num;

    setBoard(next);
    setMessage("");
    setConflictCells(new Set());
  };

  const clearCell = () => {
    if (!selected || solved) return;

    const { row, col } = selected;
    if (PUZZLES[puzzleIndex][row][col] !== 0) return;

    const next = board.map((r) => [...r]);
    next[row][col] = 0;

    setBoard(next);
    setMessage("");
    setConflictCells(new Set());
  };

  const checkBoard = () => {
    const conflicts = findConflicts(board);
    setConflictCells(conflicts);

    if (board.some((row) => row.includes(0))) {
      setMessage(
        conflicts.size > 0
          ? "Conflicting numbers are highlighted in red. Some cells are empty too."
          : "No duplicate numbers found so far, but some cells are still empty."
      );
      return;
    }

    if (conflicts.size > 0) {
      setMessage("Incorrect numbers! Check the red cells.");
      return;
    }

    const solution = PUZZLES[puzzleIndex].map((row) => [...row]);
    const hasSolution = solveSudoku(solution);

    const correct =
      hasSolution &&
      board.every((row, r) =>
        row.every((num, c) => num === solution[r][c])
      );

    if (correct) {
      setMessage("Congratulations! Sudoku solved correctly!");
      setSolved(true);
    } else {
      setMessage(
        "The board has no conflicts, but some answers are incorrect."
      );
    }
  };

  const solveBoard = () => {
    const solution = PUZZLES[puzzleIndex].map((row) => [...row]);

    if (solveSudoku(solution)) {
      setBoard(solution);
      setSolved(true);
      setConflictCells(new Set());
      setMessage("Puzzle solved!");
    } else {
      setMessage("This puzzle has no solution.");
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-3xl shadow-lg">
        <div className="grid grid-cols-9 overflow-hidden rounded-xl border-2 border-[#77758B]">
          {board.map((row, r) =>
            row.map((num, c) => {
              const fixed = PUZZLES[puzzleIndex][r][c] !== 0;
              const active =
                selected?.row === r && selected?.col === c;
              const related =
                selected &&
                (selected.row === r ||
                  selected.col === c ||
                  (Math.floor(selected.row / 3) === Math.floor(r / 3) &&
                    Math.floor(selected.col / 3) === Math.floor(c / 3)));
              const conflict = conflictCells.has(`${r}-${c}`);

              let cellColor = fixed
                ? "bg-slate-100 dark:bg-slate-700"
                : "bg-white dark:bg-slate-800";

              if (related) {
                cellColor = "bg-blue-50 dark:bg-slate-600";
              }

              if (active) {
                cellColor = "!bg-blue-200 dark:!bg-blue-700";
              }

              if (conflict) {
                cellColor = "!bg-red-200 !text-red-900";
              }

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => setSelected({ row: r, col: c })}
                  className={`aspect-square min-w-0 flex items-center justify-center
                    text-sm sm:text-xl border-r border-b border-[#E1DFEB]
                    text-slate-800 dark:text-white
                    ${c === 2 || c === 5 ? "border-r-2 border-r-[#77758B]" : ""}
                    ${r === 2 || r === 5 ? "border-b-2 border-b-[#77758B]" : ""}
                    ${fixed ? "font-bold" : ""}
                    ${cellColor}`}
                  aria-label={`Row ${r + 1}, column ${c + 1}, ${num || "empty"}`}
                >
                  {num || ""}
                </button>
              );
            })
          )}
        </div>

        <div className="grid grid-cols-5 gap-2 mt-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => enterNumber(num)}
              className="rounded-lg py-3 bg-blue-100 hover:bg-blue-200 text-blue-900 font-bold"
            >
              {num}
            </button>
          ))}

          <button
            onClick={clearCell}
            className="col-span-2 rounded-lg py-3 bg-slate-200 hover:bg-slate-300 text-slate-900"
          >
            Erase
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3">
          <button
            onClick={checkBoard}
            className="rounded-lg p-3 bg-green-600 text-white"
          >
            Check
          </button>

          <button
            onClick={solveBoard}
            className="rounded-lg p-3 bg-blue-600 text-white"
          >
            Solve
          </button>

          <button
            onClick={newPuzzle}
            className="rounded-lg p-3 bg-purple-600 text-white"
          >
            New Puzzle
          </button>
        </div>

        {message && (
          <p
            role="status"
            className="mt-4 text-center font-medium text-slate-700 dark:text-slate-200"
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;
