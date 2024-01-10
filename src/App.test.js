import { render, screen, fireEvent } from '@testing-library/react';
import Game from './App';

describe('test game', () => {
  afterEach(() => {
    localStorage.clear()
  });

  test('display initial value', () => { 
    render(<Game />)

    const squares = screen.getAllByTestId('square');
    expect(squares.length).toBe(9)

    squares.forEach(square => {
      expect(square.textContent).toBe('')
    });

    expect(screen.getByTestId('status').textContent).toBe('Next player: X')
  });

  test('X as winner', async () => {
    render(<Game />)

    const squares = await screen.findAllByTestId('square')

    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[4]);
    fireEvent.click(squares[2]);
    fireEvent.click(squares[8]);

    expect(screen.getByTestId('status').textContent).toBe('X wins!');
  })

  test('O as winner', async () => {
    render(<Game />)

    const squares = await screen.findAllByTestId('square');

    fireEvent.click(squares[1]);
    fireEvent.click(squares[0]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[4]);
    fireEvent.click(squares[2]);
    fireEvent.click(squares[8]);

    expect(screen.getByTestId('status').textContent).toBe('O wins!');
  })

  test('status is changing', async () => {
    render(<Game />)

    const squares = await screen.findAllByTestId('square');

    expect(screen.getByTestId('status').textContent).toBe('Next player: X');

    fireEvent.click(squares[0]);
    expect(screen.getByTestId('status').textContent).toBe('Next player: O');

    fireEvent.click(squares[1]);
    expect(screen.getByTestId('status').textContent).toBe('Next player: X');

    fireEvent.click(squares[2]);
    expect(screen.getByTestId('status').textContent).toBe('Next player: O');
  })

  test('no more clicks after game is finished', async () => {
    render(<Game />)

    const squares = await screen.findAllByTestId('square')

    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[4]);
    fireEvent.click(squares[2]);
    fireEvent.click(squares[8]);

    expect(screen.getByTestId('status').textContent).toBe('X wins!');

    expect(squares[5].textContent).toBe('');
    fireEvent.click(squares[5]);
    expect(squares[5].textContent).toBe('');
    fireEvent.click(squares[5]);
    expect(squares[5].textContent).toBe('');
    fireEvent.click(squares[5]);
    expect(squares[5].textContent).toBe('');
  });
});