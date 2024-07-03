export const formatDate = (dateString: string): string => {
  const parts = dateString.split('-');

  if (parts.length !== 3) {
    throw new Error('invalid date: YYYY-MM-DD');
  }

  const [year, month, day] = parts;

  return `${day}/${month}/${year}`;
};
