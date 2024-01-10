import { determineWinner } from './utils';
import { Square } from './Square';

export const Board = ({ xIsNext, board, onPlay }) => {
  const handleClick = (index) => {
    if (determineWinner(board)) return;

    if (board[index]) return;

    if (xIsNext) {
      board[index] = 'X';
    } else {
      board[index] = 'O';
    }

    onPlay(board);
  }

  return (
    <>
    {board.map((_, index) => {
        return <Square key={index} value={board[index]} onSquareClick={() => handleClick(index)} />
    })}
    </>
  );
}