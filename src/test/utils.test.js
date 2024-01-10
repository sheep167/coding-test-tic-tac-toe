import '@testing-library/react';
import { checkIsBoardFull, determineWinner } from '../components/utils';

describe('test checkIsBoardFull', () => {
  test('board is really full', () => {
    const mockBoard = ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'];

    expect(checkIsBoardFull(mockBoard)).toBe(true);
  });

  test('board is not full', () => {
    const mockBoard = ['X', null, 'X', 'X', 'X', 'X', 'X', 'X', 'X'];

    expect(checkIsBoardFull(mockBoard)).toBe(false);
  });
});

describe('test determineWinner', () => {
  test('X wins', () => {
    const mockBoard = ['X', 'O', 'O', 'X', null, null, 'X', 'O', null];

    expect(determineWinner(mockBoard)).toBe('X wins!');
  });

  test('O wins', () => {
    const mockBoard = ['O', 'X', 'X', 'O', null, null, 'O', 'X', null];

    expect(determineWinner(mockBoard)).toBe('O wins!');
  });

  test('draw', () => {
    const mockBoard = ['O', 'X', 'X', 'X', 'O', 'O', 'O', 'X', 'X'];

    expect(determineWinner(mockBoard)).toBe('Draw!');
  });
});