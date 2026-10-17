/**
 * StrokeOrderWriter.jsx
 * Multi-character Hanzi stroke-order engine using hanzi-writer library.
 * Supports:
 *   - Multi-char word decomposition (e.g. "你好" → ['你','好'])
 *   - Mi Zi Ge (米字格) calligraphy grid background
 *   - 3 modes: animate, quiz (stroke-order enforcement), blind test
 *   - Mobile touch-action: none to prevent scroll during writing
 *   - Fallback free-draw canvas when character data unavailable
 *   - Auto-advance to next character on completion
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import HanziWriter from 'hanzi-writer';
import {
  Play,
  RotateCcw,
  Eye,
  EyeOff,
  CheckCircle2,
  PenTool,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  EyeClosed,
} from 'lucide-react';
import { sounds } from '../../services/soundEffects';

// Extract CJK characters from a word string
const extractHanziChars = (word = '') =>
  word.replace(/[^\u4e00-\u9fa5]/g, '').split('').filter(Boolean);

// ─────────────────────────────────────────────────────────────
// Mi Zi Ge SVG Grid (米字格) – traditional Chinese calligraphy box
// ─────────────────────────────────────────────────────────────
const MiZiGeGrid = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    className="absolute inset-0 pointer-events-none select-none"
    style={{ opacity: 0.22 }}
    aria-hidden="true"
  >
    {/* Outer border */}
    <rect x="1" y="1" width={size - 2} height={size - 2} fill="none" stroke="#ef4444" strokeWidth="1.5" />
    {/* Horizontal center */}
    <line x1="0" y1={size / 2} x2={size} y2={size / 2} stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" />
    {/* Vertical center */}
    <line x1={size / 2} y1="0" x2={size / 2} y2={size} stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" />
    {/* Diagonal top-left → bottom-right */}
    <line x1="0" y1="0" x2={size} y2={size} stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 4" />
    {/* Diagonal top-right → bottom-left */}
    <line x1={size} y1="0" x2="0" y2={size} stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 4" />
  </svg>
);

// ─────────────────────────────────────────────────────────────
// Single-character writer panel
// ─────────────────────────────────────────────────────────────
const SingleCharWriter = ({
  character,
  size = 200,
  mode, // 'animate' | 'quiz' | 'blind'
  showOutline,
  onComplete,
  onMistake,
  onStrokeCorrect,
  active,
}) => {
  const containerRef = useRef(null);
  const writerRef = useRef(null);
  const fallbackCanvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  const [isCompleted, setIsCompleted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [hasMistake, setHasMistake] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Start quiz mode
  const startQuiz = useCallback(
    (writer = writerRef.current, outline = showOutline) => {
      if (!writer) return;
      setIsAnimating(false);
      setHasMistake(false);
      try {
        writer.cancelQuiz();
        outline ? writer.showOutline() : writer.hideOutline();
        writer.quiz({
          showOutline: outline,
          showHintAfterMisses: 2,
          highlightOnComplete: true,
          onCorrectStroke: (strokeData) => {
            sounds.playTap?.();
            const next = strokeData.strokeNum + 1;
            setCurrentStroke(next);
            setHasMistake(false);
            setStatusMsg(`✓ Nét ${next} đúng! Tiếp tục nào.`);
            if (onStrokeCorrect) onStrokeCorrect(strokeData);
          },
          onMistake: (strokeData) => {
            sounds.playWrong?.();
            setMistakesCount((p) => p + 1);
            setHasMistake(true);
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 480);
            setStatusMsg(`✗ Sai nét ${strokeData.strokeNum + 1}! Quan sát nét nhấp nháy và viết lại.`);
            if (onMistake) onMistake(strokeData);
          },
          onComplete: (summary) => {
            sounds.playCorrect?.();
            setIsCompleted(true);
            setHasMistake(false);
            setStatusMsg(`🎉 Hoàn thành chữ "${character}"! (${summary.totalMistakes} lỗi)`);
            if (onComplete) onComplete(summary);
          },
        });
      } catch (e) {
        console.warn('HanziWriter quiz error:', e);
      }
    },
    [character, showOutline, onComplete, onMistake, onStrokeCorrect]
  );

  // Initialise writer when character changes
  useEffect(() => {
    if (!containerRef.current || !character) return;
    containerRef.current.innerHTML = '';
    setIsCompleted(false);
    setLoadError(false);
    setMistakesCount(0);
    setCurrentStroke(0);
    setHasMistake(false);
    setStatusMsg(
      mode === 'blind'
        ? '🙈 Chế độ Blind – nhớ và viết chữ Hán không nhìn mẫu!'
        : 'Tô nét theo thứ tự nét mờ trên khung.'
    );

    const targetChar = character.charAt(0);
    try {
      const writer = HanziWriter.create(containerRef.current, targetChar, {
        width: size,
        height: size,
        padding: 10,
        showOutline: mode !== 'blind',
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 160,
        radicalColor: '#10b981',
        strokeColor: '#16a34a',
        outlineColor: mode === 'blind' ? 'transparent' : '#cbd5e1',
        drawingColor: '#2563eb',
        drawingWidth: 8,
        showCharacter: false,
        // Load from CDN – supports 100,000+ characters
        charDataLoader: (char, onLoad, onError) => {
          fetch(`https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0/${char}.json`)
            .then((r) => {
              if (!r.ok) throw new Error('Not found');
              return r.json();
            })
            .then(onLoad)
            .catch(onError);
        },
        onLoadCharDataError: () => setLoadError(true),
        onLoadCharDataSuccess: (data) => {
          if (data?.strokes) setTotalStrokes(data.strokes.length);
        },
      });

      writerRef.current = writer;

      if (mode === 'animate') {
        setIsAnimating(true);
        writer.animateCharacter({
          onComplete: () => {
            setIsAnimating(false);
            setStatusMsg('Đã xem mẫu. Chuyển sang "Tập viết" để tự viết!');
          },
        });
      } else {
        startQuiz(writer, mode !== 'blind');
      }
    } catch (err) {
      console.warn('HanziWriter init error:', err);
      setLoadError(true);
    }

    return () => {
      try { writerRef.current?.cancelQuiz(); } catch (_) {}
    };
  }, [character, size, mode]);

  // Re-apply outline visibility when toggled
  useEffect(() => {
    if (!writerRef.current || mode === 'blind') return;
    showOutline ? writerRef.current.showOutline() : writerRef.current.hideOutline();
  }, [showOutline, mode]);

  // Block scroll on touch while writing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prevent = (e) => { if (e.cancelable) e.preventDefault(); };
    el.addEventListener('touchstart', prevent, { passive: false });
    el.addEventListener('touchmove', prevent, { passive: false });
    return () => {
      el.removeEventListener('touchstart', prevent);
      el.removeEventListener('touchmove', prevent);
    };
  }, []);

  const handleAnimate = () => {
    if (!writerRef.current) return;
    setIsAnimating(true);
    setHasMistake(false);
    setStatusMsg('▶ Đang trình diễn thứ tự nét bút...');
    try {
      writerRef.current.cancelQuiz();
      writerRef.current.animateCharacter({
        onComplete: () => {
          setIsAnimating(false);
          setStatusMsg('Xem xong mẫu. Nhấn "Tập viết" để tự viết lại!');
        },
      });
    } catch (_) { setIsAnimating(false); }
  };

  const handleReset = () => {
    setIsCompleted(false);
    setCurrentStroke(0);
    setMistakesCount(0);
    setHasMistake(false);
    setStatusMsg('↺ Đã xóa – bắt đầu viết lại từ nét 1.');
    startQuiz(writerRef.current, mode !== 'blind' && showOutline);
  };

  // Fallback free-draw helpers
  const fbStart = (e) => {
    const c = fallbackCanvasRef.current;
    if (!c) return;
    isDrawingRef.current = true;
    const ctx = c.getContext('2d');
    const r = c.getBoundingClientRect();
    const x = (e.clientX ?? e.touches?.[0].clientX) - r.left;
    const y = (e.clientY ?? e.touches?.[0].clientY) - r.top;
    ctx.beginPath(); ctx.moveTo(x, y);
  };
  const fbMove = (e) => {
    if (!isDrawingRef.current) return;
    const c = fallbackCanvasRef.current; if (!c) return;
    if (e.cancelable) e.preventDefault();
    const ctx = c.getContext('2d');
    const r = c.getBoundingClientRect();
    const x = (e.clientX ?? e.touches?.[0].clientX) - r.left;
    const y = (e.clientY ?? e.touches?.[0].clientY) - r.top;
    ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.strokeStyle = '#2563eb';
    ctx.lineTo(x, y); ctx.stroke();
  };
  const fbEnd = () => { isDrawingRef.current = false; };
  const fbClear = () => {
    const c = fallbackCanvasRef.current; if (!c) return;
    c.getContext('2d').clearRect(0, 0, c.width, c.height);
    setIsCompleted(false);
  };

  return (
    <div className="flex flex-col items-center w-full select-none">
      {/* Mi Zi Ge Canvas Box */}
      <div
        className={`relative rounded-3xl bg-white dark:bg-slate-900 border-[3px] border-b-[6px] shadow-lg transition-all duration-200 ${
          isShaking ? 'translate-x-1 border-rose-500 ring-4 ring-rose-200 dark:ring-rose-900/50' :
          hasMistake ? 'border-rose-400 ring-2 ring-rose-100 dark:ring-rose-950' :
          isCompleted ? 'border-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950' :
          'border-slate-300 dark:border-slate-700'
        }`}
        style={{ width: size + 20, height: size + 20, touchAction: 'none', userSelect: 'none' }}
      >
        <MiZiGeGrid size={size + 20} />

        <div
          ref={containerRef}
          className="absolute cursor-crosshair z-10"
          style={{ touchAction: 'none', userSelect: 'none', top: 10, left: 10, width: size, height: size }}
        />

        {/* Fallback offline free-draw */}
        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-slate-900/95 p-3 rounded-3xl z-20 text-center">
            <span className="text-5xl font-black text-slate-800 dark:text-white mb-1">{character}</span>
            <p className="text-[11px] text-slate-400 mb-2">Chế độ vẽ tự do (Không cần mạng)</p>
            <canvas
              ref={fallbackCanvasRef}
              width={size - 10}
              height={size - 40}
              onMouseDown={fbStart} onMouseMove={fbMove} onMouseUp={fbEnd}
              onTouchStart={fbStart} onTouchMove={fbMove} onTouchEnd={fbEnd}
              className="border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 cursor-crosshair mb-2"
              style={{ touchAction: 'none' }}
            />
            <div className="flex gap-2">
              <button type="button" onClick={fbClear} className="text-xs px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 font-bold">Xóa</button>
              <button type="button" onClick={() => { setIsCompleted(true); onComplete?.({ character }); }}
                className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold">Tôi Đã Viết Xong</button>
            </div>
          </div>
        )}

        {/* Completion badge */}
        {isCompleted && (
          <div className="absolute -top-3 -right-3 bg-emerald-500 text-white rounded-full p-1.5 shadow-lg border-2 border-white dark:border-slate-900 z-30">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Stroke counter + status */}
      <div className="mt-2.5 text-center space-y-1 w-full">
        <div className="flex items-center justify-center gap-2 text-xs font-black">
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
            Nét: <strong className="text-emerald-600 dark:text-emerald-400">{currentStroke}</strong> / {totalStrokes || '?'}
          </span>
          {mistakesCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
              Lỗi: <strong>{mistakesCount}</strong>
            </span>
          )}
        </div>
        <p className={`text-xs font-bold px-2 ${
          isCompleted ? 'text-emerald-600 dark:text-emerald-400' :
          hasMistake ? 'text-rose-500 dark:text-rose-400' :
          isAnimating ? 'text-sky-500 dark:text-sky-400' :
          'text-slate-500 dark:text-slate-400'
        }`}>{statusMsg}</p>
      </div>

      {/* Action toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2.5">
        <button type="button" onClick={handleAnimate} disabled={isAnimating}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-950/60 dark:text-sky-300 disabled:opacity-50 cursor-pointer">
          <Play className="w-3.5 h-3.5 fill-current" /><span>Xem mẫu nét</span>
        </button>
        <button type="button" onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 cursor-pointer">
          <RotateCcw className="w-3.5 h-3.5" /><span>Viết lại</span>
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Main Export: StrokeOrderWriter – Multi-character orchestrator
// ─────────────────────────────────────────────────────────────
export const StrokeOrderWriter = ({
  word = '你好',
  pinyin = '',
  meaning = '',
  size = 210,
  onWordComplete,
}) => {
  const chars = extractHanziChars(word);
  const [charIndex, setCharIndex] = useState(0);
  const [completedChars, setCompletedChars] = useState(new Set());
  const [mode, setMode] = useState('quiz'); // 'animate' | 'quiz' | 'blind'
  const [showOutline, setShowOutline] = useState(true);

  // Reset when word changes
  useEffect(() => {
    setCharIndex(0);
    setCompletedChars(new Set());
    setMode('quiz');
    setShowOutline(true);
  }, [word]);

  if (chars.length === 0) {
    return (
      <div className="flex flex-col items-center p-6 text-slate-400 text-sm">
        <span className="text-3xl mb-2">📝</span>
        <p className="font-semibold">Từ này không chứa chữ Hán để tập viết.</p>
        <p className="text-xs mt-1">({word})</p>
      </div>
    );
  }

  const currentChar = chars[charIndex] || chars[0];
  const isWordComplete = completedChars.size >= chars.length;

  const handleCharComplete = useCallback(() => {
    setCompletedChars((prev) => {
      const next = new Set(prev);
      next.add(charIndex);
      if (next.size >= chars.length) {
        sounds.playCorrect?.();
        if (onWordComplete) onWordComplete({ word, totalChars: chars.length });
      }
      return next;
    });
    // Auto-advance after 1s
    if (charIndex < chars.length - 1) {
      setTimeout(() => setCharIndex((i) => i + 1), 900);
    }
  }, [charIndex, chars.length, word, onWordComplete]);

  const MODE_LABELS = {
    animate: { label: 'Xem mẫu', icon: <Play className="w-3.5 h-3.5 fill-current" />, color: 'bg-sky-500 text-white' },
    quiz: { label: 'Tập viết', icon: <PenTool className="w-3.5 h-3.5" />, color: 'bg-emerald-500 text-white' },
    blind: { label: 'Blind Test', icon: <EyeOff className="w-3.5 h-3.5" />, color: 'bg-purple-500 text-white' },
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full select-none">
      {/* Word info header */}
      <div className="text-center">
        <div className="text-3xl font-black tracking-wider text-slate-900 dark:text-white">
          {chars.map((c, i) => (
            <span
              key={i}
              onClick={() => setCharIndex(i)}
              className={`cursor-pointer transition-all px-0.5 rounded ${
                i === charIndex ? 'text-emerald-500 underline underline-offset-4' :
                completedChars.has(i) ? 'text-slate-400 dark:text-slate-500 line-through' :
                'hover:text-sky-500'
              }`}
              title={`Chữ ${i + 1}: ${c}`}
            >{c}</span>
          ))}
        </div>
        {pinyin && <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">[{pinyin}]</div>}
        {meaning && <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{meaning}</div>}
      </div>

      {/* Character selector pills */}
      {chars.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {chars.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCharIndex(i)}
              className={`w-10 h-10 rounded-xl text-base font-black border-2 transition-all cursor-pointer ${
                i === charIndex ? 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-110' :
                completedChars.has(i) ? 'bg-slate-100 text-slate-400 dark:bg-slate-800 border-slate-300 dark:border-slate-700 line-through' :
                'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-emerald-400'
              }`}
              title={`Chuyển sang chữ ${c}`}
            >
              {completedChars.has(i) ? '✓' : c}
            </button>
          ))}
        </div>
      )}

      {/* Mode switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        {Object.entries(MODE_LABELS).map(([key, { label, icon, color }]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              mode === key ? color + ' shadow-xs' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            {icon}<span>{label}</span>
          </button>
        ))}

        <div className="w-px h-5 bg-slate-300 dark:bg-slate-600 mx-1" />

        <button
          type="button"
          onClick={() => setShowOutline((p) => !p)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            showOutline ? 'text-slate-500 dark:text-slate-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
          }`}
          title={showOutline ? 'Ẩn nét mờ gợi ý (Nâng độ khó)' : 'Hiện nét mờ gợi ý'}
        >
          {showOutline ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Single char writer */}
      <SingleCharWriter
        key={`${word}-${charIndex}-${mode}`}
        character={currentChar}
        size={size}
        mode={mode}
        showOutline={showOutline}
        onComplete={handleCharComplete}
        active={true}
      />

      {/* Progress bar */}
      {chars.length > 1 && (
        <div className="w-full max-w-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">
            <span>Tiến độ từ</span>
            <span>{completedChars.size}/{chars.length} chữ</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedChars.size / chars.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Word completion celebration */}
      {isWordComplete && (
        <div className="w-full max-w-xs p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 text-center animate-in fade-in zoom-in">
          <div className="flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-black text-sm">
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Hoàn thành từ "{word}"!</span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
            Bạn đã viết thành công {chars.length} chữ Hán chuẩn thứ tự nét bút.
          </p>
          <button
            type="button"
            onClick={() => { setCharIndex(0); setCompletedChars(new Set()); setMode('blind'); }}
            className="mt-3 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-600 text-white text-xs font-black cursor-pointer transition-colors"
          >
            🙈 Thử lại Blind Test
          </button>
        </div>
      )}

      {/* Nav arrows for multi-char */}
      {chars.length > 1 && !isWordComplete && (
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setCharIndex((i) => Math.max(0, i - 1))}
            disabled={charIndex === 0}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Chữ {charIndex + 1} / {chars.length}
          </span>
          <button type="button" onClick={() => setCharIndex((i) => Math.min(chars.length - 1, i + 1))}
            disabled={charIndex === chars.length - 1}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-30 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default StrokeOrderWriter;
