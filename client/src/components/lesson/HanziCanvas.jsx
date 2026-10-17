import React, { useEffect, useRef, useState, useCallback } from 'react';
import HanziWriter from 'hanzi-writer';
import { 
  Play, 
  RotateCcw, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  PenTool, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { sounds } from '../../services/soundEffects';

export const HanziCanvas = ({ 
  character = '你', 
  onComplete, 
  size = 220 
}) => {
  const containerRef = useRef(null);
  const writerRef = useRef(null);
  const fallbackCanvasRef = useRef(null);

  const [mode, setMode] = useState('quiz'); // 'quiz' | 'animate'
  const [isCompleted, setIsCompleted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [totalStrokes, setTotalStrokes] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [hasMistake, setHasMistake] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showOutline, setShowOutline] = useState(true);
  const [statusMessage, setStatusMessage] = useState('Tô nét theo thứ tự nét mờ trên khung.');
  const [isAnimating, setIsAnimating] = useState(false);

  // Fallback drawing state for offline/missing character data
  const isDrawingRef = useRef(false);

  // Safe HanziWriter Quiz initialiser
  const startQuiz = useCallback((writer = writerRef.current, outlineVisible = showOutline) => {
    if (!writer) return;
    setMode('quiz');
    setIsAnimating(false);
    setHasMistake(false);

    try {
      writer.cancelQuiz();
      if (outlineVisible) {
        writer.showOutline();
      } else {
        writer.hideOutline();
      }

      writer.quiz({
        showOutline: outlineVisible,
        showHintAfterMisses: 1, // Flash hint after 1 mistake so learner isn't stuck
        highlightOnComplete: true,
        onCorrectStroke: (strokeData) => {
          sounds.playTap();
          const nextStrokeNum = strokeData.strokeNum + 1;
          setCurrentStroke(nextStrokeNum);
          setHasMistake(false);
          setStatusMessage(`Đúng nét ${nextStrokeNum}! Hãy tiếp tục.`);
        },
        onMistake: (strokeData) => {
          sounds.playWrong();
          setMistakesCount((prev) => prev + 1);
          setHasMistake(true);
          setIsShaking(true);
          setTimeout(() => setIsShaking(false), 500);
          setStatusMessage(
            `Sai nét thứ ${strokeData.strokeNum + 1}! Hãy quan sát nét gợi ý nhấp nháy và viết lại.`
          );
        },
        onComplete: (summary) => {
          sounds.playCorrect();
          setIsCompleted(true);
          setHasMistake(false);
          setStatusMessage(`Xuất sắc! Bạn đã viết hoàn chỉnh chữ "${character}"!`);
          if (onComplete) {
            onComplete(summary);
          }
        }
      });
    } catch (e) {
      console.warn('Failed to start HanziWriter quiz:', e);
    }
  }, [character, onComplete, showOutline]);

  // Initialise HanziWriter instance
  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';
    setIsCompleted(false);
    setLoadError(false);
    setMistakesCount(0);
    setCurrentStroke(0);
    setHasMistake(false);
    setStatusMessage('Tô nét theo thứ tự nét mờ trên khung.');

    const targetChar = character ? character.charAt(0) : '你';

    try {
      const writer = HanziWriter.create(containerRef.current, targetChar, {
        width: size,
        height: size,
        padding: 12,
        showOutline: true,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 180,
        radicalColor: '#10b981',
        strokeColor: '#0f172a',
        outlineColor: '#cbd5e1',
        drawingColor: '#2563eb',
        drawingWidth: 7,
        showCharacter: false,
        onLoadCharDataError: () => {
          setLoadError(true);
        },
        onLoadCharDataSuccess: (data) => {
          if (data && data.strokes) {
            setTotalStrokes(data.strokes.length);
          }
        }
      });

      writerRef.current = writer;
      startQuiz(writer, true);
    } catch (err) {
      console.warn('HanziWriter init error:', err);
      setLoadError(true);
    }

    return () => {
      if (writerRef.current) {
        try {
          writerRef.current.cancelQuiz();
        } catch (e) {}
      }
    };
  }, [character, size, startQuiz]);

  // Lock mobile touch scrolling: preventDefault on touchmove strictly inside writing box
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouch = (e) => {
      // Prevents Safari/Chrome gesture panning and pull-to-refresh while writing strokes
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    container.addEventListener('touchstart', handleTouch, { passive: false });
    container.addEventListener('touchmove', handleTouch, { passive: false });

    return () => {
      container.removeEventListener('touchstart', handleTouch);
      container.removeEventListener('touchmove', handleTouch);
    };
  }, []);

  // Mode 1: Watch stroke order animation
  const handleAnimate = () => {
    if (!writerRef.current) return;
    setMode('animate');
    setIsAnimating(true);
    setHasMistake(false);
    setStatusMessage('Đang trình diễn thứ tự từng nét bút...');

    try {
      writerRef.current.cancelQuiz();
      writerRef.current.animateCharacter({
        onComplete: () => {
          setIsAnimating(false);
          setStatusMessage('Đã xem xong mẫu. Nhấn "Tập viết" để tự mình viết lại!');
        }
      });
    } catch (e) {
      console.warn('Animate error:', e);
      setIsAnimating(false);
    }
  };

  // Mode 2: Interactive stroke quiz
  const handleSwitchToQuiz = () => {
    if (!writerRef.current) return;
    startQuiz(writerRef.current, showOutline);
  };

  // Reset writing canvas
  const handleReset = () => {
    if (!writerRef.current) return;
    setIsCompleted(false);
    setCurrentStroke(0);
    setMistakesCount(0);
    setHasMistake(false);
    setStatusMessage('Đã đặt lại. Bắt đầu viết từ nét đầu tiên.');
    startQuiz(writerRef.current, showOutline);
  };

  // Toggle outline (nét mờ)
  const handleToggleOutline = () => {
    if (!writerRef.current) return;
    const nextVal = !showOutline;
    setShowOutline(nextVal);
    if (nextVal) {
      writerRef.current.showOutline();
    } else {
      writerRef.current.hideOutline();
    }
  };

  // Fallback drawing handlers for offline mode
  const startFallbackDraw = (e) => {
    const canvas = fallbackCanvasRef.current;
    if (!canvas) return;
    isDrawingRef.current = true;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const moveFallbackDraw = (e) => {
    if (!isDrawingRef.current) return;
    const canvas = fallbackCanvasRef.current;
    if (!canvas) return;
    if (e.cancelable) e.preventDefault();
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#2563eb';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endFallbackDraw = () => {
    isDrawingRef.current = false;
  };

  const clearFallbackCanvas = () => {
    const canvas = fallbackCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsCompleted(false);
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-sm mx-auto">
      {/* 2-Mode Switcher Tabs */}
      <div className="flex items-center gap-2 p-1 mb-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={handleAnimate}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            mode === 'animate'
              ? 'bg-sky-500 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
          title="Xem thứ tự nét bút chuẩn xác"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Xem mẫu nét viết</span>
        </button>

        <button
          type="button"
          onClick={handleSwitchToQuiz}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            mode === 'quiz'
              ? 'bg-emerald-500 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
          title="Tập viết và kiểm tra từng nét bút"
        >
          <PenTool className="w-3.5 h-3.5" />
          <span>Tập viết kiểm tra nét</span>
        </button>
      </div>

      {/* 9-Grid (Tian Zi Ge / Mi Zi Ge Mễ Tự Cách) Canvas Container */}
      <div 
        className={`relative p-2 rounded-3xl bg-white dark:bg-slate-900 border-3 border-b-6 transition-all duration-200 touch-none select-none shadow-lg ${
          isShaking ? 'translate-x-1 border-rose-500 ring-4 ring-rose-200 dark:ring-rose-900/50' : ''
        } ${
          hasMistake 
            ? 'border-rose-500 ring-4 ring-rose-100 dark:ring-rose-950/60' 
            : isCompleted 
            ? 'border-emerald-500 ring-4 ring-emerald-100 dark:ring-emerald-950/60' 
            : 'border-slate-300 dark:border-slate-700'
        }`}
        style={{ touchAction: 'none' }}
      >
        {/* Chinese Mi Zi Ge (米字格) Calligraphy Guidelines */}
        <div 
          className="absolute inset-2 pointer-events-none opacity-30 dark:opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, transparent 49.5%, #ef4444 50%, transparent 50.5%),
              linear-gradient(to bottom, transparent 49.5%, #ef4444 50%, transparent 50.5%),
              linear-gradient(45deg, transparent 49.5%, #ef4444 50%, transparent 50.5%),
              linear-gradient(-45deg, transparent 49.5%, #ef4444 50%, transparent 50.5%)
            `,
            backgroundSize: '100% 100%'
          }}
        />

        {/* HanziWriter mount target with strict touch-none */}
        <div 
          ref={containerRef} 
          className="cursor-crosshair relative z-10 touch-none select-none"
          style={{ touchAction: 'none', width: size, height: size }}
        />

        {/* Resilient Fallback if character data cannot be loaded */}
        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-slate-900/95 p-3 text-center rounded-3xl z-20 touch-none">
            <span className="text-5xl font-black text-slate-800 dark:text-white mb-1">
              {character}
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
              Chế độ vẽ tự do cảm ứng (Không cần mạng)
            </p>
            <canvas
              ref={fallbackCanvasRef}
              width={size}
              height={size - 60}
              onMouseDown={startFallbackDraw}
              onMouseMove={moveFallbackDraw}
              onMouseUp={endFallbackDraw}
              onTouchStart={startFallbackDraw}
              onTouchMove={moveFallbackDraw}
              onTouchEnd={endFallbackDraw}
              className="border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 touch-none cursor-crosshair mb-2"
              style={{ touchAction: 'none' }}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={clearFallbackCanvas}
                className="duo-btn duo-btn-gray text-xs py-1.5 px-3 rounded-lg"
              >
                Xóa
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsCompleted(true);
                  if (onComplete) onComplete({ character });
                }}
                className="duo-btn duo-btn-green text-xs py-1.5 px-3 rounded-lg"
              >
                Tôi Đã Viết Xong
              </button>
            </div>
          </div>
        )}

        {/* Completion Checkmark Badge */}
        {isCompleted && (
          <div className="absolute -top-3 -right-3 bg-emerald-500 text-white rounded-full p-2 shadow-lg border-2 border-white dark:border-slate-900 animate-in zoom-in z-30">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        )}
      </div>

      {/* Stroke count & status feedback banner */}
      <div className="w-full mt-3 space-y-1 text-center">
        <div className="flex items-center justify-center gap-3 text-xs font-black text-slate-600 dark:text-slate-300">
          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            Nét: <strong className="text-emerald-600 dark:text-emerald-400">{currentStroke}</strong> / {totalStrokes || '?'}
          </span>
          {mistakesCount > 0 && (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
              Lỗi: <strong>{mistakesCount}</strong>
            </span>
          )}
        </div>

        {/* Dynamic Status / Guidance message */}
        <p className={`text-xs font-bold transition-all px-2 ${
          isCompleted 
            ? 'text-emerald-600 dark:text-emerald-400 font-black' 
            : hasMistake 
            ? 'text-rose-600 dark:text-rose-400' 
            : isAnimating 
            ? 'text-sky-600 dark:text-sky-400' 
            : 'text-slate-500 dark:text-slate-400'
        }`}>
          {statusMessage}
        </p>
      </div>

      {/* Completion Celebration Card */}
      {isCompleted && (
        <div className="w-full mt-3 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center animate-in fade-in zoom-in">
          <div className="flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-black text-xs uppercase tracking-wide">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Chúc Mừng! Hoàn Thành Chữ Hán "{character}"</span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
            Bạn đã vẽ chuẩn xác {totalStrokes} nét bút. Nhấn nút "Kiểm Tra" hoặc "Tiếp Tục" để sang câu tiếp!
          </p>
        </div>
      )}

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
        {mode === 'animate' ? (
          <button
            type="button"
            onClick={handleAnimate}
            disabled={isAnimating}
            className="duo-btn duo-btn-blue text-xs py-2 px-3 rounded-xl flex items-center gap-1.5 disabled:opacity-50"
            title="Xem lại hoạt hình nét bút"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Phát Lại Mẫu</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleReset}
            className="duo-btn duo-btn-gray text-xs py-2 px-3 rounded-xl flex items-center gap-1.5 text-slate-700 dark:text-slate-200"
            title="Xóa và viết lại từ đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Viết Lại</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleToggleOutline}
          className={`duo-btn text-xs py-2 px-3 rounded-xl flex items-center gap-1.5 ${
            showOutline 
              ? 'duo-btn-outline text-slate-700 dark:text-slate-200' 
              : 'duo-btn-yellow'
          }`}
          title={showOutline ? 'Ẩn nét mờ gợi ý' : 'Hiện nét mờ gợi ý'}
        >
          {showOutline ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          <span>{showOutline ? 'Ẩn nét mờ' : 'Hiện nét mờ'}</span>
        </button>

        <button
          type="button"
          onClick={handleAnimate}
          className="duo-btn duo-btn-blue text-xs py-2 px-3 rounded-xl flex items-center gap-1.5"
          title="Xem thứ tự nét viết"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Xem Mẫu</span>
        </button>
      </div>
    </div>
  );
};
