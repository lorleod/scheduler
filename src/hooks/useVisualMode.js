import { useState } from 'react';

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function back() {
    if (history.length > 1) {
      const back = history.slice(history.length-2, history.length-1);
      setHistory(history.slice(0, history.length-1))
      setMode(back[0]);
    }
  };

  return {
    mode,
    transition: (newMode, replace = false) => {
      setMode(newMode);

      if (replace === true) {
        const replacedHistory = [...history.slice(0, history.length-1), newMode];
        setHistory(replacedHistory);
      } else {
        const newHistory = [...history, newMode];
        setHistory(newHistory);
      }
    },
    back
  };
};