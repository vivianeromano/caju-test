import { cleanCPF, calculateCheckDigit, validateCPF } from '~/utils/validate';

describe('cleanCPF function', () => {
  it('removes non-digit characters from CPF', () => {
    expect(cleanCPF('123.456.789-00')).toBe('12345678900');
    expect(cleanCPF('abc123def456!789-00')).toBe('12345678900');
  });
});

describe('calculateCheckDigit function', () => {
  it('calculates CPF check digits', () => {
    expect(calculateCheckDigit('123456789', 9)).toBe(0);
    expect(calculateCheckDigit('123456789', 10)).toBe(9);
  });
});

describe('validateCPF function', () => {
  it('validates CPF correctness', () => {
    expect(validateCPF('123.456.789-09')).toBe(true);
    expect(validateCPF('111.111.111-11')).toBe(false);
    expect(validateCPF('12345678900')).toBe(false);
  });
});
