import { useEffect } from 'react';

export const useWebTitle = (title: string) => {
 useEffect(() => {
  document.title = `Zal Todos | ${title}`;
 }, []);
};
