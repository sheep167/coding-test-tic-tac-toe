import { render, screen, fireEvent } from '@testing-library/react';
import { Board } from '../components/Board';

describe('test board', () => {
  test('display squares with correct value', () => { 
    const mockFunc = jest.fn();
    const mockBoard = ['X', 'O', null, 'X', 'O', null, 'X', 'O', null];

    render(<Board xIsNext={true} board={mockBoard} onPlay={mockFunc}/>);
   
    const squares = screen.queryAllByTestId('square')
    expect(squares.length).toBe(9)

    expect(squares[0].textContent).toBe('X')
    expect(squares[1].textContent).toBe('O')
    expect(squares[2].textContent).toBe('')
    expect(squares[3].textContent).toBe('X')
    expect(squares[4].textContent).toBe('O')
    expect(squares[5].textContent).toBe('')
    expect(squares[6].textContent).toBe('X')
    expect(squares[7].textContent).toBe('O')
    expect(squares[8].textContent).toBe('')
  });

  test('handles onClick event', async () => {
    const mockFunc = jest.fn((i) => {});
    const mockBoard = ['X', null, null, null, 'O', null, 'X', 'O', null];

    render(<Board board={mockBoard} onPlay={mockFunc} />)

    fireEvent.click(screen.getAllByTestId('square')[0]);
    expect(mockFunc).toBeCalledTimes(0);

    fireEvent.click(screen.getAllByTestId('square')[2]);
    expect(mockFunc).toBeCalledTimes(1);

    fireEvent.click(screen.getAllByTestId('square')[3]);
    expect(mockFunc).toBeCalledTimes(2);
  });
});