import React, { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';
import { Play, RotateCcw, Eye, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../services/soundEffects';

export const HanziCanvas = ({ 
  character = '你', 
  onComplete, 
  size = 220 
}) => {
  const containerRef = useRef(null);
  const writerRef = useRef(null);
  const [mode, setMode] = useState('quiz'); // 'quiz' | 'animate'
  const [isCompleted, setIsCompleted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [totalStrokes, setTotalStrokes] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';
    setIsCompleted(false);
    setLoadError(false);

    try {
      const writer = HanziWriter.create(containerRef.current, character, {
        width: size,
        height: size,
        padding: 12,
        showOutline: true,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 150,
        radicalColor: '#10b981',
        strokeColor: '#0f172a',
        outlineColor: '#cbd5e1',
        drawingColor: '#2563eb',
        drawingWidth: 6,
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
      startQuiz(writer);
    } catch (err) {
      console.warn('HanziWriter error:', err);
      setLoadError(true);
    }

    return () => {
      if (writerRef.current) {
        writerRef.current.cancelQuiz();
      }
    };
  }, [character, size]);

  const startQuiz = (writer = writerRef.current) => {
    if (!writer) return;
    setMode('quiz');
    writer.quiz({
      onCorrectStroke: (strokeData) => {
        sounds.playTap();
        setCurrentStroke(strokeData.strokeNum + 1);
      },
      onMistake: () => {
        sounds.playWrong();
      },
      onComplete: (summary) => {
        sounds.playCorrect();
        setIsCompleted(true);
        if (onComplete) {
          onComplete(summary);
        }
      }
    });
  };

  const handleAnimate = () => {
    if (!writerRef.current) return;
    setMode('animate');
    writerRef.current.cancelQuiz();
    writerRef.current.animateCharacter({
      onComplete: () => {
        setTimeout(() => startQuiz(), 800);
      }
    });
  };

  const handleReset = () => {
    if (!writerRef.current) return;
    setIsCompleted(false);
    setCurrentStroke(0);
    startQuiz();
  };

  return (
    <div className="flex flex-col items-center">
      {/* 9-Grid (Mễ tự cách) Canvas Container */}
      <div className="relative p-2 rounded-2xl bg-white dark:bg-slate-900 border-2 border-b-4 border-slate-300 dark:border-slate-700 shadow-md">
        {/* Background Grid Lines (Tian Zi Ge / Mi Zi Ge) */}
        <div 
          className="absolute inset-2 pointer-events-none opacity-25 dark:opacity-40"
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

        {/* HanziWriter mount target */}
        <div ref={containerRef} className="cursor-crosshair relative z-10" />

        {/* Fallback if character data offline */}
        {loadError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 dark:bg-slate-900/95 p-4 text-center rounded-2xl z-20">
            <span className="text-6xl font-black text-slate-800 dark:text-white mb-2">
              {character}
            </span>
            <p className="text-xs text-slate-500 mb-2">
              Tập viết chữ trên giấy theo thứ tự nét
            </p>
            <button
              onClick={() => {
                setIsCompleted(true);
                if (onComplete) onComplete();
              }}
              className="duo-btn duo-btn-green text-xs py-1.5 px-3 rounded-lg"
            >
              Tôi Đã Viết Xong
            </button>
          </div>
        )}

        {/* Completion Checkmark Badge */}
        {isCompleted && (
          <div className="absolute -top-3 -right-3 bg-emerald-500 text-white rounded-full p-1.5 shadow-lg border-2 border-white dark:border-slate-900 animate-in zoom-in z-30">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        )}
      </div>

      {/* Stroke count & status */}
      <div className="flex items-center gap-3 mt-3 text-xs font-bold text-slate-500 dark:text-slate-400">
        <span>Nét: {currentStroke} / {totalStrokes || '?'}</span>
        <span>•</span>
        <span className={isCompleted ? 'text-emerald-500' : 'text-sky-500'}>
          {isCompleted ? 'Đã hoàn thành xuất sắc!' : 'Tô nét theo thứ tự nét mờ'}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={handleAnimate}
          className="duo-btn duo-btn-blue text-xs py-2 px-3 rounded-xl flex items-center gap-1.5"
          title="Xem hoạt hình nét bút"
        >
          <Play className="w-3.5 h-3.5" />
          <span>Xem mẫu</span>
        </button>

        <button
          onClick={handleReset}
          className="duo-btn duo-btn-gray text-xs py-2 px-3 rounded-xl flex items-center gap-1.5"
          title="Xóa và viết lại từ đầu"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Viết lại</span>
        </button>
      </div>
    </div>
  );
};
