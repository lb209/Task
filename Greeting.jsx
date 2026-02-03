import { useState } from "react";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const winner = checkWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-pink-600 text-white">
      
      <h1 className="text-4xl font-bold mb-6">Tic Tac Toe</h1>

      <p className="mb-4 text-lg">
        {winner
          ? `Winner: ${winner}`
          : `Next Player: ${isXTurn ? "X" : "O"}`}
      </p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {board.map((value, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="w-24 h-24 bg-white text-gray-800 text-3xl font-bold rounded-xl shadow-md hover:bg-gray-200 transition"
          >
            {value}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-red-500 rounded-lg text-white font-semibold hover:bg-red-600 transition"
      >
        Restart Game
      </button>
    </div>
  );
}

function checkWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
