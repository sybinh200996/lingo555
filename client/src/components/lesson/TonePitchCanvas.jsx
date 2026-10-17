import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Activity, Award } from 'lucide-react';

/**
 * Chinese Tone Pitch Visualizer (Ngũ Độ Tiêu Âm Pháp & Phổ Cao Độ Web Audio API)
 * Visualizes target 5-level pitch contour vs live microphone fundamental frequency (F0)
 */
export const TonePitchCanvas = ({ 
  targetText = '', 
  phonetic = '', 
  isListening = false,
  onToneScore = null 
}) => {
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const pitchHistoryRef = useRef([]);

  const [toneFeedback, setToneFeedback] = useState(null);
  const [detectedPitch, setDetectedPitch] = useState(null);

  // Extract tone number (1, 2, 3, 4, or neutral) from pinyin
  const getToneNumber = (pinyinStr) => {
    if (!pinyinStr) return 1;
    const lower = pinyinStr.toLowerCase();
    if (/[āēīōūǖ]/.test(lower) || /1/.test(lower)) return 1;
    if (/[áéíóúǘ]/.test(lower) || /2/.test(lower)) return 2;
    if (/[ǎěǐǒǔǚ]/.test(lower) || /3/.test(lower)) return 3;
    if (/[àèìòùǜ]/.test(lower) || /4/.test(lower)) return 4;
    return 1; // Default
  };

  const toneNumber = getToneNumber(phonetic || targetText);

  const TONE_INFO = {
    1: {
      name: 'Thanh 1 (Âm Bình)',
      contour: '5 - 5',
      desc: 'Cao & Bằng phẳng',
      idealCurve: [5, 5, 5, 5, 5],
      color: '#06b6d4', // cyan-500
      tip: 'Giữ cao độ giọng trên cao ổn định, không lên xuống.'
    },
    2: {
      name: 'Thanh 2 (Dương Bình)',
      contour: '3 - 5',
      desc: 'Vút lên cao',
      idealCurve: [3, 3.4, 3.9, 4.5, 5],
      color: '#10b981', // emerald-500
      tip: 'Bắt đầu ở cao độ trung bình rồi vuốt giọng thẳng lên cao như dấu hỏi/sắc.'
    },
    3: {
      name: 'Thanh 3 (Thượng Thanh)',
      contour: '2 - 1 - 4',
      desc: 'Hạ sâu rồi bật lên',
      idealCurve: [2.5, 1.3, 1.0, 2.3, 4.0],
      color: '#f59e0b', // amber-500
      tip: 'Hạ giọng trầm xuống đáy cổ họng rồi nhẹ nhàng ngân lên.'
    },
    4: {
      name: 'Thanh 4 (Khứ Thanh)',
      contour: '5 - 1',
      desc: 'Rơi thẳng dứt khoát',
      idealCurve: [5, 4.2, 3.1, 1.9, 1.0],
      color: '#f43f5e', // rose-500
      tip: 'Bắt đầu từ đỉnh cao nhất rồi hạ giọng dứt khoát xuống đáy như tiếng thán phục.'
    }
  };

  const currentTone = TONE_INFO[toneNumber] || TONE_INFO[1];

  // Autocorrelation Pitch Detection Algorithm
  const autoCorrelate = (buffer, sampleRate) => {
    let SIZE = buffer.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) {
      const val = buffer[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.015) return -1; // Too quiet / background noise

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buffer[i]) < thres) { r1 = i; break; }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buffer[SIZE - i]) < thres) { r2 = SIZE - i; break; }
    }

    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length;

    const c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + buffer[j] * buffer[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    let T0 = maxpos;

    // Parabolic interpolation for fine tuning
    const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
  };

  // Convert Hz (80Hz - 400Hz) to 5-level pitch scale (1 to 5)
  const hzToPitchLevel = (hz) => {
    if (hz < 70 || hz > 500) return null;
    // Map log-scale frequency roughly to 1 - 5 range
    const minHz = 90;
    const maxHz = 350;
    const clamped = Math.max(minHz, Math.min(maxHz, hz));
    const normalized = (clamped - minHz) / (maxHz - minHz); // 0 to 1
    return 1 + normalized * 4; // 1 to 5
  };

  // Setup Web Audio when isListening changes
  useEffect(() => {
    if (!isListening) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
      return;
    }

    let active = true;
    pitchHistoryRef.current = [];

    const initAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        if (!active) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        streamRef.current = stream;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        audioCtxRef.current = audioCtx;

        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        source.connect(analyser);
        analyserRef.current = analyser;

        const buffer = new Float32Array(analyser.fftSize);

        const trackPitch = () => {
          if (!active) return;
          analyser.getFloatTimeDomainData(buffer);
          const pitchHz = autoCorrelate(buffer, audioCtx.sampleRate);

          if (pitchHz !== -1) {
            const level = hzToPitchLevel(pitchHz);
            if (level !== null) {
              setDetectedPitch(Math.round(pitchHz));
              pitchHistoryRef.current.push(level);
              if (pitchHistoryRef.current.length > 50) {
                pitchHistoryRef.current.shift();
              }
              evaluateTone(pitchHistoryRef.current, currentTone.idealCurve);
            }
          }
          drawCanvas();
          animFrameRef.current = requestAnimationFrame(trackPitch);
        };

        animFrameRef.current = requestAnimationFrame(trackPitch);
      } catch (err) {
        console.warn('Tone pitch audio access error:', err);
      }
    };

    initAudio();

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [isListening, toneNumber]);

  // Evaluate tone similarity between pitch history and ideal tone contour
  const evaluateTone = (history, ideal) => {
    if (history.length < 8) return;
    const recent = history.slice(-15);
    const avgRecent = recent.reduce((a, b) => a + b, 0) / recent.length;

    let score = 88;
    let feedback = 'Thanh điệu đang đi đúng hướng!';

    if (toneNumber === 1) {
      const variance = recent.reduce((a, b) => a + Math.pow(b - avgRecent, 2), 0) / recent.length;
      if (avgRecent >= 3.8 && variance < 0.4) {
        score = 96;
        feedback = 'Tuyệt vời! Thanh 1 cao & phẳng rất chuẩn xác!';
      } else if (avgRecent < 3.0) {
        feedback = 'Giọng hơi trầm, hãy nâng cao độ cổ họng lên cao!';
      }
    } else if (toneNumber === 2) {
      const delta = recent[recent.length - 1] - recent[0];
      if (delta > 0.8) {
        score = 95;
        feedback = 'Xuất sắc! Độ vuốt cao độ Thanh 2 rất tốt!';
      } else {
        feedback = 'Hãy vuốt giọng vút lên dứt khoát hơn!';
      }
    } else if (toneNumber === 3) {
      const minVal = Math.min(...recent);
      if (minVal <= 2.2) {
        score = 94;
        feedback = 'Rất chuẩn! Đã hạ giọng xuống đáy sâu thành công!';
      }
    } else if (toneNumber === 4) {
      const delta = recent[0] - recent[recent.length - 1];
      if (delta > 1.0) {
        score = 96;
        feedback = 'Tuyệt vời! Hạ giọng dứt khoát từ cao xuống thấp!';
      } else {
        feedback = 'Hãy nhấn giọng dứt khoát rơi xuống!';
      }
    }

    setToneFeedback({ score, feedback });
    if (onToneScore) onToneScore(score);
  };

  // Canvas drawing routine
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw 5 tone levels grid (5=top, 1=bottom)
    const paddingX = 40;
    const paddingY = 20;
    const graphWidth = width - paddingX * 2;
    const graphHeight = height - paddingY * 2;

    const levelToY = (level) => {
      // 5 -> paddingY, 1 -> paddingY + graphHeight
      return paddingY + ((5 - level) / 4) * graphHeight;
    };

    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let lvl = 1; lvl <= 5; lvl++) {
      const y = levelToY(lvl);
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(paddingX, y);
      ctx.lineTo(width - paddingX, y);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.fillText(`Mức ${lvl}`, paddingX - 6, y);
    }
    ctx.setLineDash([]);

    // 2. Draw Ideal Target Tone Contour (Thanh mẫu chuẩn)
    const ideal = currentTone.idealCurve;
    ctx.beginPath();
    ctx.strokeStyle = currentTone.color;
    ctx.lineWidth = 3.5;
    ctx.setLineDash([6, 4]);

    ideal.forEach((lvl, idx) => {
      const x = paddingX + (idx / (ideal.length - 1)) * graphWidth;
      const y = levelToY(lvl);
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // 3. Draw User Pitch History (Giọng người dùng)
    const history = pitchHistoryRef.current;
    if (history.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = '#10b981'; // vibrant emerald
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      history.forEach((lvl, idx) => {
        const x = paddingX + (idx / 50) * graphWidth;
        const y = levelToY(lvl);
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Glowing dot at the current tip
      const lastX = paddingX + ((history.length - 1) / 50) * graphWidth;
      const lastY = levelToY(history[history.length - 1]);
      ctx.beginPath();
      ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#34d399';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  // Initial render when not listening
  useEffect(() => {
    drawCanvas();
  }, [toneNumber]);

  return (
    <div className="p-4 rounded-2xl bg-slate-900 border-2 border-slate-700/80 text-white shadow-xl space-y-3">
      {/* Header with Tone Name & Contour */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <div>
            <h4 className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
              <span>{currentTone.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-extrabold border border-emerald-500/40">
                Cao độ {currentTone.contour}
              </span>
            </h4>
            <p className="text-[11px] text-slate-400 font-medium">
              {currentTone.desc} • {currentTone.tip}
            </p>
          </div>
        </div>

        {detectedPitch && isListening && (
          <div className="text-right">
            <span className="text-xs text-slate-400 font-bold">Tần số:</span>
            <div className="text-sm font-black text-emerald-400">{detectedPitch} Hz</div>
          </div>
        )}
      </div>

      {/* Canvas Display */}
      <div className="relative rounded-xl overflow-hidden bg-slate-950/80 border border-slate-800">
        <canvas 
          ref={canvasRef} 
          width={380} 
          height={140} 
          className="w-full h-32 block"
        />

        {/* Legend */}
        <div className="absolute bottom-2 right-3 flex items-center gap-3 text-[10px] font-bold">
          <div className="flex items-center gap-1 text-slate-400">
            <span className="w-3 h-0.5 bg-cyan-400 border-dashed inline-block" />
            <span>Mẫu chuẩn</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <span className="w-3 h-1 bg-emerald-400 rounded-full inline-block" />
            <span>Giọng bạn</span>
          </div>
        </div>

        {!isListening && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 backdrop-blur-[2px]">
            <p className="text-xs text-slate-300 font-bold bg-slate-800/90 px-3 py-1.5 rounded-full border border-slate-700">
              🎙️ Bấm Micro để xem biểu đồ thanh điệu thời gian thực
            </p>
          </div>
        )}
      </div>

      {/* Live Feedback Banner */}
      {toneFeedback && isListening && (
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 animate-in fade-in">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-200">
              {toneFeedback.feedback}
            </span>
          </div>
          <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-emerald-500 text-slate-950">
            {toneFeedback.score}%
          </span>
        </div>
      )}
    </div>
  );
};
