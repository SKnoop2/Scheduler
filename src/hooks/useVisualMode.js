import React, { useState } from 'react';

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    let newHistory = [];
    if (replace === true) {
      // slice off last item in history, then add newMode
      newHistory = [...history.slice(0, -1), newMode];
    } else {
      //add newMode onto end of history array
      newHistory = [...history, newMode];
    }
    setMode(newMode)
    setHistory(newHistory)
  }

  const back = function() {

    if (history.length < 2) {
      return;
    }

    //remove the last item from history
    const newHistory = [...history.slice(0, -1)]
    setHistory(newHistory)
    setMode(newHistory[newHistory.length-1])
  };

  return { mode, transition, back };
}