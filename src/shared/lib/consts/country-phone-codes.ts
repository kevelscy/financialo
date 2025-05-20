export interface CountryFormat {
  pattern: RegExp;
  format: (matches: RegExpMatchArray) => string;
}

export const COUNTRY_FORMATS: { [key: string]: CountryFormat } = {
  // Estados Unidos/Canadá
  '1': {
    pattern: /^(\d{3})(\d{3})(\d{4})$/,
    format: (m) => `(${m[1]}) ${m[2]}-${m[3]}`
  },
  // Venezuela
  '58': {
    pattern: /^(\d{3})(\d{3})(\d{4})$/,
    format: (m) => `(${m[1]}) ${m[2]}-${m[3]}`
  },
  // México
  '52': {
    pattern: /^(\d{3})(\d{3})(\d{4})$/,
    format: (m) => `(${m[1]}) ${m[2]}-${m[3]}`
  },
  // España
  '34': {
    pattern: /^(\d{3})(\d{3})(\d{3})$/,
    format: (m) => `${m[1]} ${m[2]} ${m[3]}`
  },
  // Colombia
  '57': {
    pattern: /^(\d{3})(\d{3})(\d{4})$/,
    format: (m) => `(${m[1]}) ${m[2]}-${m[3]}`
  }
};