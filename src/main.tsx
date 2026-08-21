import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LocaleProvider } from './i18n/LocaleProvider';
import './index.css';

const container = document.getElementById('root');
if (container === null) {
  throw new Error('Missing #root. index.html and main.tsx have diverged.');
}

createRoot(container).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>,
);
