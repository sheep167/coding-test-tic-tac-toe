import './styles.css';
import { Button, Card } from 'antd';

import { useState } from 'react';
import { Board } from './components/Board';
import { determineWinner } from './components/utils';

const storeGame = (game) => {
  localStorage.setItem('game', JSON.stringify(game));
}

const getGame = () => {
  const storedGameState = JSON.parse(localStorage.getItem('game'));
  return storedGameState || Array(9).fill(null);
}

const GameStatus = ({ board, xIsNext }) => {
  const status = determineWinner(board);
  return (
    <span data-testid="status">
      {status ? `${status}`: `Next player: ${(xIsNext ? 'X' : 'O')}`}
    </span>
  )
}

const GameHeader = ({ board, xIsNext, resetBoard }) => {
  return (
    <div className="game-header">
    <GameStatus board={board} xIsNext={xIsNext}/>
    <Button 
      data-testid="reset-button" 
      onClick={resetBoard}
      danger
      type="primary"
    >
      Reset
    </Button>
  </div>
  )
}

const Game = () => {
  const [board, setBoard] = useState(getGame());
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  const handleBoardChange = (board) => {
    setBoard(board);
    setCurrentMove(currentMove + 1);
    storeGame(board);
  }

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setCurrentMove(0);
  }

  return (
    <Card 
      title={<GameHeader board={board} xIsNext={xIsNext} resetBoard={resetBoard}/>} 
      bordered={false} style={{ width: 300 }}
    >
      <div className="game-board">
        <Board xIsNext={xIsNext} board={board} onPlay={handleBoardChange} />
      </div>
    </Card>


  );
}

export default Game;


