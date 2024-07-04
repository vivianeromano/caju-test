import {
  cleanCPF,
  isValidLengthAndPattern,
  calculateCheckDigit,
  validateCPF
} from '~/utils/validate';

describe('cleanCPF function', () => {
  test('removes non-digit characters from CPF', () => {
    expect(cleanCPF('123.456.789-00')).toBe('12345678900');
    expect(cleanCPF('abc123def456!789-00')).toBe('12345678900');
  });
});

describe('isValidLengthAndPattern function', () => {
  test('validates CPF length and pattern', () => {
    expect(isValidLengthAndPattern('12345678909')).toBe(true);
    expect(isValidLengthAndPattern('1234567890a')).toBe(false);
    expect(isValidLengthAndPattern('11111111111')).toBe(false);
  });
});

describe('calculateCheckDigit function', () => {
  test('calculates CPF check digits', () => {
    expect(calculateCheckDigit('123456789', 9)).toBe(0);
    expect(calculateCheckDigit('123456789', 10)).toBe(9);
  });
});

describe('validateCPF function', () => {
  test('validates CPF correctness', () => {
    expect(validateCPF('123.456.789-09')).toBe(true);
    expect(validateCPF('111.111.111-11')).toBe(false);
    expect(validateCPF('12345678900')).toBe(false);
  });
});
