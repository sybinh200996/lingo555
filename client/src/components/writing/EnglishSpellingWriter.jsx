/**
 * EnglishSpellingWriter.jsx
 * Spelling & Dictation component for English mode.
 * Features:
 *   - Character-by-character typing check with visual feedback
 *   - 3 modes: normal (see the word), hidden (see meaning only), dictation (hear only)
 *   - Real-time correct/incorrect letter highlighting
 *   - Browser TTS for audio dictation
 *   - Retry and progress tracking
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, RotateCcw, Eye, EyeOff, CheckCircle2, Sparkles, Keyboard } from 'lucide-react';
import { sounds } from '../../services/soundEffects';

const speak = (text, lang = 'en') => {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang === 'en' ? 'en-US' : 'zh-CN';
  utt.rate = 0.85;
  utt.pitch = 1;
  window.speechSynthesis.speak(utt);
};

export const EnglishSpellingWriter = ({
  word = '',
  phonetic = '',
  meaning = '',
  sentence = '',
  onComplete,
}) => {
  const [mode, setMode] = useState('normal'); // 'normal' | 'hidden' | 'dictation'
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);
  const inputRef = useRef(null);

  const targetWord = word.toLowerCase().trim();
  const userInput = input.toLowerCase().trim();

  useEffect(() => {
    setInput('');
    setSubmitted(false);
    setAttempts(0);
  }, [word]);

  useEffect(() => {
    if (mode === 'dictation') {
      setTimeout(() => speak(word, 'en'), 400);
    }
  }, [mode, word]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [word, mode]);

  const handleSubmit = useCallback(() => {
    if (!input.trim()) return;
    const correct = userInput === targetWord;
    setSubmitted(true);
    setAttempts((a) => a + 1);
    if (correct) {
      sounds.playCorrect?.();
      setStreak((s) => s + 1);
      if (onComplete) onComplete({ word, attempts: attempts + 1 });
    } else {
      sounds.playWrong?.();
      setStreak(0);
    }
  }, [input, targetWord, userInput, attempts, word, onComplete]);

  const handleRetry = () => {
    setInput('');
    setSubmitted(false);
    inputRef.current?.focus();
    if (mode === 'dictation') speak(word, 'en');
  };

  const isCorrect = submitted && userInput === targetWord;
  const isWrong = submitted && userInput !== targetWord;

  // Render each letter with color coding
  const renderLetterFeedback = () => {
    if (!submitted) return null;
    const maxLen = Math.max(targetWord.length, userInput.length);
    return (
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {Array.from({ length: maxLen }).map((_, i) => {
          const target = targetWord[i] || '';
          const user = userInput[i] || '';
          const match = target === user;
          return (
            <div
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-black border-2 transition-all ${
                !user ? 'border-rose-300 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-800' :
                match ? 'border-emerald-400 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-700' :
                'border-rose-400 bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:border-rose-700'
              }`}
            >
              {user || target}
            </div>
          );
        })}
      </div>
    );
  };

  // Letter boxes showing blanks for the word
  const renderWordBlanks = () => {
    return (
      <div className="flex items-center gap-1.5 flex-wrap justify-center mb-4">
        {targetWord.split('').map((letter, i) => {
          const typed = input[i];
          const show = mode === 'normal' && !submitted;
          return (
            <div key={i} className={`relative ${letter === ' ' ? 'w-4' : 'w-8 h-10'}`}>
              {letter === ' ' ? (
                <span className="text-slate-300">·</span>
              ) : (
                <div className={`w-8 h-10 flex items-center justify-center rounded-lg border-b-[3px] text-base font-black transition-all ${
                  typed
                    ? (typed.toLowerCase() === letter ? 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' :
                      'bg-rose-100 border-rose-400 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300')
                    : 'bg-slate-100 border-slate-400 text-transparent dark:bg-slate-800 dark:border-slate-600'
                }`}>
                  {show ? letter.toUpperCase() : (typed || (submitted ? letter.toUpperCase() : '_'))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full select-none">
      {/* Word info */}
      <div className="text-center">
        {mode !== 'dictation' && (
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-wide">{word}</h2>
        )}
        {mode === 'dictation' && (
          <div className="text-4xl text-slate-400 dark:text-slate-600">?????</div>
        )}
        {phonetic && mode === 'normal' && (
          <div className="text-sm font-bold text-sky-600 dark:text-sky-400 mt-0.5">[{phonetic}]</div>
        )}
        {meaning && (
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">{meaning}</div>
        )}
      </div>

      {/* Mode selector */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        {[
          { key: 'normal', label: 'Thông thường', icon: <Eye className="w-3.5 h-3.5" /> },
          { key: 'hidden', label: 'Ẩn từ', icon: <EyeOff className="w-3.5 h-3.5" /> },
          { key: 'dictation', label: 'Nghe – Viết', icon: <Volume2 className="w-3.5 h-3.5" /> },
        ].map(({ key, label, icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => { setMode(key); setInput(''); setSubmitted(false); }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              mode === key
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >{icon}<span>{label}</span></button>
        ))}
      </div>

      {/* Audio button */}
      <button
        type="button"
        onClick={() => speak(word, 'en')}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-950/60 dark:text-sky-300 font-bold text-sm cursor-pointer transition-colors"
      >
        <Volume2 className="w-4 h-4" />
        Nghe phát âm
      </button>

      {/* Letter blanks visual */}
      {renderWordBlanks()}

      {/* Feedback */}
      {submitted && renderLetterFeedback()}

      {/* Result messages */}
      {isCorrect && (
        <div className="w-full max-w-xs p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 text-center animate-in zoom-in">
          <div className="flex items-center justify-center gap-2 text-emerald-700 dark:text-emerald-300 font-black text-sm">
            <Sparkles className="w-4 h-4 fill-current" /><span>Chính xác! 🎉</span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
            Bạn đã đánh vần đúng "{word}" sau {attempts} lần thử.
          </p>
        </div>
      )}

      {isWrong && (
        <div className="w-full max-w-xs p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-300 dark:border-rose-800 text-center animate-in zoom-in">
          <p className="text-sm font-black text-rose-700 dark:text-rose-300">Chưa đúng! Đáp án: <strong className="text-emerald-700 dark:text-emerald-300">{word}</strong></p>
          <p className="text-xs text-rose-500 dark:text-rose-400 mt-0.5">Bạn đã gõ: {input}</p>
        </div>
      )}

      {/* Input field */}
      {!isCorrect && (
        <div className="w-full max-w-xs">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Keyboard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => { setInput(e.target.value); setSubmitted(false); }}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
                placeholder="Gõ từ vào đây rồi nhấn Enter..."
                className={`w-full pl-9 pr-4 py-3 rounded-xl border-2 text-sm font-bold bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder-slate-400 outline-none transition-all ${
                  isWrong ? 'border-rose-400 focus:border-rose-500' : 'border-slate-300 dark:border-slate-600 focus:border-sky-400 dark:focus:border-sky-500'
                }`}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-black cursor-pointer transition-colors whitespace-nowrap"
              >
                Kiểm tra
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRetry}
                className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-black cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors whitespace-nowrap"
              >
                <RotateCcw className="w-4 h-4" />Thử lại
              </button>
            )}
          </div>
        </div>
      )}

      {/* Context sentence */}
      {sentence && (
        <div className="w-full max-w-xs p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs">
          <p className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase mb-1">Câu ví dụ:</p>
          <p className="font-semibold text-slate-700 dark:text-slate-200">{sentence}</p>
        </div>
      )}

      {/* Streak indicator */}
      {streak > 1 && (
        <div className="flex items-center gap-1.5 text-xs font-black text-amber-600 dark:text-amber-400">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>🔥 Chuỗi đúng: {streak} từ liên tiếp!</span>
        </div>
      )}
    </div>
  );
};

export default EnglishSpellingWriter;
