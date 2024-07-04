import formatCpf from './formatCpf';

describe('formatCpf', () => {
  it('should format a valid CPF correctly', () => {
    expect(formatCpf('12345678909')).toBe('123.456.789-09');
  });
  it('should return an empty string if value is undefined', () => {
    expect(formatCpf()).toBe('');
  });
  it('should return an empty string if value is an empty string', () => {
    expect(formatCpf('')).toBe('');
  });
  it('should ignore non-numeric characters', () => {
    expect(formatCpf('123.456.789-09')).toBe('123.456.789-09');
    expect(formatCpf('123-456.789.09')).toBe('123.456.789-09');
  });
  it('should format correctly even with spaces', () => {
    expect(formatCpf(' 123 456 789 09 ')).toBe('123.456.789-09');
  });
  it('should return the input if it is already formatted', () => {
    expect(formatCpf('123.456.789-09')).toBe('123.456.789-09');
  });
});
