export const limitTextWords: (text: string, limit: number) => string = (text, limit) => {
 const words = text.split(' ');
 const limitedWords = words.slice(0, limit);
 const limitedText = limitedWords.join(' ');
 const ellipsis = words.length > limit ? '...' : '';
 return limitedText + ellipsis;
};
