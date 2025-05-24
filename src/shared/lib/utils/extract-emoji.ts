export const extractEmoji = (category: string): string => {
  // Extraer el último caracter (incluyendo emojis compuestos)
  const emoji = [...category].pop() || '';

  // Verificar si es un emoji válido (opcional)
  const emojiRegex = /\p{Emoji}/u;
  return emojiRegex.test(emoji) ? emoji : '';
};
