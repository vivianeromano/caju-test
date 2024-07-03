import * as Yup from 'yup';

export const cleanCPF = (cpf: string): string => cpf.replace(/[^\d]+/g, '');

const isValidLengthAndPattern = (cpf: string): boolean =>
  cpf.length === 11 && !/^(\d)\1+$/.test(cpf);

const calculateCheckDigit = (cpf: string, length: number): number => {
  const sum = cpf
    .slice(0, length)
    .split('')
    .map((digit, index) => parseInt(digit, 10) * (length + 1 - index))
    .reduce((acc, num) => acc + num, 0);

  const remainder = (sum * 10) % 11;
  return remainder === 10 || remainder === 11 ? 0 : remainder;
};

export const validateCPF = (cpf: string): boolean => {
  const cleanedCPF = cleanCPF(cpf);
  if (!isValidLengthAndPattern(cleanedCPF)) return false;

  const checkDigits = cleanedCPF.slice(9);
  const calculatedCheckDigits = `${calculateCheckDigit(cleanedCPF, 9)}${calculateCheckDigit(cleanedCPF, 10)}`;

  return checkDigits === calculatedCheckDigits;
};
const regexFullname =
  /^[^\d\s!@#$%^&*()_+\-=,.<>;:'"/\\[\]{}|`~]*[a-zA-Z]{2,}( [^\d\s!@#$%^&*()_+\-=,.<>;:'"/\\[\]{}|`~]*[a-zA-Z]+)*$/;

export const validationSchema = Yup.object({
  admissionDate: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  employeeName: Yup.string()
    .matches(
      regexFullname,
      'O nome deve conter pelo menos um espaço, no mínimo duas letras, e não pode começar com um número'
    )
    .required('Required'),
  cpf: Yup.string()
    .test('is-valid-cpf', 'CPF inválido', value => validateCPF(value!))
    .required('Required')
});
