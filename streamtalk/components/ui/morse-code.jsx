import React, { useState, useEffect, useRef } from 'react';

const MORSE_CODE = {
  '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
  '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
  '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
  '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
  '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
  '--..': 'Z', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
  '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9',
  '-----': '0'
};

const MorseCode = ({ isEnabled, onSignal, onEndLetter, onTranslate, onClear, morseText }) => {
  const [currentLetter, setCurrentLetter] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const pressStartRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isPressed) {
        e.preventDefault();
        setIsPressed(true);
        pressStartRef.current = Date.now();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space' && isPressed) {
        e.preventDefault();
        const duration = Date.now() - pressStartRef.current;
        const signal = duration < 200 ? 'dot' : 'dash'; // Short press = dot, long = dash
        onSignal(signal);
        setCurrentLetter(prev => prev + (signal === 'dot' ? '.' : '-'));
        setIsPressed(false);

        // Clear timeout for letter end
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          onEndLetter();
          setCurrentLetter('');
        }, 1000); // 1 second pause ends letter
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isEnabled, isPressed, onSignal, onEndLetter]);

  if (!isEnabled) return null;

  return (
    <div className="absolute bottom-32 left-4 w-80 bg-slate-800/90 border border-slate-600 text-white rounded-lg shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold">Morse Code Input</h3>
          <div className="flex gap-2">
            <button
              onClick={onTranslate}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
            >
              Translate
            </button>
            <button
              onClick={onClear}
              className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="text-xs text-slate-300 mb-2">
          Press SPACE: Short = Dot (.), Long = Dash (-)
        </div>
        <div className="font-mono text-sm bg-slate-700 p-2 rounded min-h-[2rem]">
          {morseText || 'Start typing Morse code...'}
        </div>
        <div className="text-xs text-slate-400 mt-2">
          Current letter: {currentLetter || 'None'}
        </div>
      </div>
    </div>
  );
};

export default MorseCode;