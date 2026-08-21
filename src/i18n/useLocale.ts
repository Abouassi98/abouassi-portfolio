import { useContext } from 'react';
import { LocaleContext, type LocaleContextValue } from './context';

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (value === undefined) {
    throw new Error('useLocale must be used inside a <LocaleProvider>.');
  }
  return value;
}
