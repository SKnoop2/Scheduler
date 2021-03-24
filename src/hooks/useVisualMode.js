import { useState } from 'react';

export default function useVisualMode (initial) {
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    
    setHistory((prev) => {
      if (replace === true) {
        // slice off last item in history, then add newMode
        return [...prev.slice(0, -1), newMode];
      } 
      //add newMode onto end of history array
      return [...prev, newMode];
    });

  }

  const back = function() {

    setHistory((prev) => {
      if (prev.length < 2) {
        return prev;
      }
      //remove the last item from history when history is > 1 item
      return [...prev.slice(0, -1)];
    })
  };

  return { mode:history[history.length-1], transition, back };
}