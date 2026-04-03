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

const MorseCode = ({
  isEnabled,
  onSubmit,
  onSpeak,
  onClear,
  onBufferChange,
  morseText,
}) => {
  const [currentSymbol, setCurrentSymbol] = useState('');
  const [bufferText, setBufferText] = useState('');
  const [isPressed, setIsPressed] = useState(false);
  const [readyToSend, setReadyToSend] = useState(false);
  const pressStartRef = useRef(0);
  const letterTimeoutRef = useRef(null);

  const finalizeLetter = () => {
    if (!currentSymbol) return;
    const letter = MORSE_CODE[currentSymbol] || '?';
    const updatedBuffer = bufferText + letter;
    setBufferText(updatedBuffer);
    onBufferChange?.(updatedBuffer);
    setCurrentSymbol('');
    setReadyToSend(false);
  };

  const addWordSpace = () => {
    finalizeLetter();
    if (bufferText.trim().length > 0) {
      const updatedBuffer = bufferText + ' ';
      setBufferText(updatedBuffer);
      onBufferChange?.(updatedBuffer);
    }
    setReadyToSend(false);
  };

  const finalizeSentence = () => {
    finalizeLetter();
    if (bufferText.trim().length > 0) {
      onSpeak?.(bufferText.trim());
      setReadyToSend(true);
    }
  };

  const submitMessage = () => {
    if (!bufferText.trim()) return;
    onSubmit?.(bufferText.trim());
    setBufferText('');
    onBufferChange?.('');
    setCurrentSymbol('');
    setReadyToSend(false);
  };

  const clearBuffer = () => {
    setBufferText('');
    setCurrentSymbol('');
    setReadyToSend(false);
    onBufferChange?.('');
    onClear?.();
  };

  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isPressed) {
        e.preventDefault();
        setIsPressed(true);
        pressStartRef.current = Date.now();
        if (letterTimeoutRef.current) {
          clearTimeout(letterTimeoutRef.current);
          letterTimeoutRef.current = null;
        }
      }

      if (e.key.toLowerCase() === 's') {
        e.preventDefault();
        addWordSpace();
      }

      if (e.key.toLowerCase() === 'e') {
        e.preventDefault();
        finalizeSentence();
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        if (readyToSend) {
          submitMessage();
        }
      }

      if (e.key === 'Backspace') {
        e.preventDefault();
        clearBuffer();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space' && isPressed) {
        e.preventDefault();
        setIsPressed(false);
        const duration = Date.now() - pressStartRef.current;
        const signal = duration < 250 ? '.' : '-';
        setCurrentSymbol((prev) => prev + signal);
        if (letterTimeoutRef.current) clearTimeout(letterTimeoutRef.current);

        letterTimeoutRef.current = setTimeout(() => {
          finalizeLetter();
        }, 1800); // 1.8 sec gap indicates end of letter
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (letterTimeoutRef.current) clearTimeout(letterTimeoutRef.current);
    };
  }, [isEnabled, isPressed, currentSymbol, bufferText, readyToSend, onSubmit, onSpeak, onClear, onBufferChange]);

  if (!isEnabled) return null;

  return (
    <div className="absolute bottom-32 left-4 w-96 bg-slate-800/90 border border-slate-600 text-white rounded-lg shadow-lg">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-semibold">Morse Code Input</h3>
          <button
            onClick={clearBuffer}
            className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
          >
            Reset
          </button>
        </div>

        <div className="text-xs text-slate-300 mb-2">
          SPACE: Dot(.)/Dash(-) | s:    Word Space | e: Finalize+Speak | Enter: Send | Backspace: Clear
        </div>

        <div className="font-mono text-sm bg-slate-700 p-2 rounded min-h-[2rem] mb-2">
          {bufferText || 'Buffer is empty'}
        </div>

        <div className="font-mono text-sm bg-slate-700 p-2 rounded min-h-[2rem] mb-2">
          Current symbol: {currentSymbol || 'None'}
        </div>

        <div className="text-xs text-slate-400">
          {readyToSend ? 'Ready to send (press Enter)' : 'Compose letters and finalize with e.'}
        </div>
      </div>
    </div>
  );
};

export default MorseCode;