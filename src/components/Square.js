import { Button } from 'antd';

export const Square = ({ value, onSquareClick }) => {
  return (
    <Button className={`square square-${value}`} data-testid="square" onClick={onSquareClick}>
      {value}
    </Button>
  );
}