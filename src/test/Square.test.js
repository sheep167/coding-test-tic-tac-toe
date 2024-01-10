import { render, screen, fireEvent } from '@testing-library/react';
import { Square } from '../components/Square';

describe('test square button', () => {
  test('value is displayed', () => { 
    render(<Square value='abc' />)

    expect(screen.getByTestId('square')).not.toBeNull();

    expect(screen.getByTestId('square').textContent).toBe('abc')
  });

  test('onClick function works', () => { 
    const mockFunc = jest.fn();

    render(<Square value='X' onSquareClick={mockFunc} />);
   
    const square = screen.getByText('X')
    fireEvent.click(square);
    expect(mockFunc).toBeCalledTimes(1);
 
    fireEvent.click(square);
    expect(mockFunc).toBeCalledTimes(2);
  });
});