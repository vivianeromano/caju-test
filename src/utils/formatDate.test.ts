import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should format a valid date string correctly', () => {
    expect(formatDate('2023-07-04')).toBe('04/07/2023');
  });

  it('should throw an error for a date string with missing parts', () => {
    expect(() => formatDate('2023-07')).toThrow('invalid date: YYYY-MM-DD');
    expect(() => formatDate('2023')).toThrow('invalid date: YYYY-MM-DD');
    expect(() => formatDate('')).toThrow('invalid date: YYYY-MM-DD');
  });

  it('should throw an error for a date string with extra parts', () => {
    expect(() => formatDate('2023-07-04-01')).toThrow(
      'invalid date: YYYY-MM-DD'
    );
  });

  it('should handle single-digit day and month correctly', () => {
    expect(formatDate('2023-7-4')).toBe('4/7/2023');
  });

  it('should handle leading zeros in day and month', () => {
    expect(formatDate('2023-07-04')).toBe('04/07/2023');
    expect(formatDate('2023-01-01')).toBe('01/01/2023');
  });
});
