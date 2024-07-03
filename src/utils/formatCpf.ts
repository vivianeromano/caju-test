const formatCpf = (value?: string): string => {
  if (!value) return '';

  const cleanedValue = value.replace(/[^\d]/g, '');

  const formattedValue = cleanedValue.replace(
    /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    '$1.$2.$3-$4'
  );

  return formattedValue;
};

export default formatCpf;
