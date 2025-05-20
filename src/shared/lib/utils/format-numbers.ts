import { COUNTRY_FORMATS, CountryFormat } from '../consts/country-phone-codes'

const DEFAULT_FORMAT: CountryFormat = {
  pattern: /^(\d{3})(\d{3})(\d{4})$/,
  format: (m) => `(${m[1]}) ${m[2]}-${m[3]}`
};

export function formatPhoneNumber(phone: string): string {
  // Limpiar manteniendo el signo +
  const cleanPhone = phone.replace(/[^+\d]/g, '');

  if (!cleanPhone.startsWith('+')) {
    return phone; // No es un número internacional válido
  }

  const number = cleanPhone.slice(1); // Quitar el +
  let countryCode = '';
  let nationalNumber = '';

  // Buscar código de país (1-3 dígitos)
  for (let codeLength = 3; codeLength > 0; codeLength--) {
    const potentialCode = number.substring(0, codeLength);
    if (COUNTRY_FORMATS[potentialCode]) {
      countryCode = potentialCode;
      nationalNumber = number.slice(codeLength);
      break;
    }
  }

  const formatter = countryCode
    ? COUNTRY_FORMATS[countryCode]
    : DEFAULT_FORMAT;

  const matches = nationalNumber.match(formatter.pattern);

  return matches
    ? `+${countryCode} ${formatter.format(matches)}`
    : `+${number}`;
}