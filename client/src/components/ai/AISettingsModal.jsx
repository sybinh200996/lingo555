import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ai } from '../../services/aiClient';
import { sounds } from '../../services/soundEffects';
import { 
  X, 
  Key, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Cpu, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

export const AISettingsModal = () => {
  const { isAiSettingsOpen, closeAiSettings } = useApp();

  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gemini-3.5-flash-lite');
  const [hasServerKey, setHasServerKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isAiSettingsOpen) {
      setApiKey(ai.getApiKey());
      setModel(ai.getModel());
      setTestResult(null);
      setSavedSuccess(false);

      ai.getStatus().then(status => {
        if (status?.hasServerKey) {
          setHasServerKey(true);
        }
      }).catch(() => {});
    }
  }, [isAiSettingsOpen]);

  if (!isAiSettingsOpen) return null;

  const handleTestConnection = async () => {
    sounds.playTap();
    setTesting(true);
    setTestResult(null);

    try {
      const res = await ai.verifyKey(apiKey.trim(), model);
      if (res.valid) {
        sounds.playCorrect();
        setTestResult({
          success: true,
          message: `Kết nối thành công với Google Gemini (${res.model || model})! Trợ lý AI đang hoạt động.`
        });
      } else {
        sounds.playWrong();
        setTestResult({
          success: false,
          message: `Lỗi kết nối: ${res.message || 'API Key không hợp lệ hoặc đã hết hạn ngạch.'}`
        });
      }
    } catch (e) {
      sounds.playWrong();
      setTestResult({
        success: false,
        message: 'Lỗi mạng: Không thể kết nối tới Google API. ' + e.message
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    sounds.playTap();
    ai.setApiKey(apiKey.trim());
    ai.setModel(model);
    setSavedSuccess(true);
    setTimeout(() => {
      closeAiSettings();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="duo-card max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Cấu Hình Google Gemini AI
              </h3>
              <p className="text-xs text-slate-400">
                Kích hoạt Gia sư 24/7, AI Writing Lab & Dynamic Reading
              </p>
            </div>
          </div>

          <button
            onClick={closeAiSettings}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* API Key Input */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-emerald-500" />
            <span>Google Gemini API Key</span>
          </label>
          <div className="relative">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Dán mã AIzaSy... của bạn vào đây"
              className="w-full bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white"
            />
          </div>
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-slate-400">Hoàn toàn miễn phí từ Google</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-500 hover:text-emerald-600 font-bold inline-flex items-center gap-1"
            >
              <span>Lấy API Key tại Google AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Server Key Detected Banner */}
        {hasServerKey && !apiKey && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300 font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <div>
              <span className="font-black uppercase block text-[10px] text-emerald-600 dark:text-emerald-400">Đã kích hoạt tự động</span>
              <span>Gemini API Key đã được nạp thành công từ tệp cấu hình hệ thống (.env). Bạn có thể dùng ngay!</span>
            </div>
          </div>
        )}

        {/* AI Model Selection */}
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-sky-500" />
            <span>Mô Hình AI (AI Model)</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setModel('gemini-3.5-flash-lite')}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                model === 'gemini-3.5-flash-lite'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-sm text-slate-800 dark:text-white">
                  Gemini 3.5 Flash Lite
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-500 text-white font-extrabold uppercase">
                  Mặc Định
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Phản hồi siêu tốc, độ trễ cực thấp &amp; phân tích tức thì
              </p>
            </button>

            <button
              type="button"
              onClick={() => setModel('gemini-3.8-flash')}
              className={`p-3 rounded-xl border-2 text-left transition-all ${
                model === 'gemini-3.8-flash'
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-black text-sm text-slate-800 dark:text-white">
                  Gemini 3.8 Flash
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-sky-500 text-white font-extrabold uppercase">
                  Chuyên Sâu
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Tư duy ngôn ngữ học thuật, chấm bài viết cực sâu
              </p>
            </button>
          </div>
        </div>

        {/* Fallback Notice */}
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Cơ chế bảo vệ (Smart Fallback)</span>
          </div>
          <p className="text-amber-600/90 dark:text-amber-400/80 leading-relaxed">
            Nếu bạn chưa nhập API Key, ứng dụng vẫn hoạt động 100% bình thường với bộ dữ liệu sư phạm nội bộ và kho 50.000 từ vựng.
          </p>
        </div>

        {/* Test Result Message */}
        {testResult && (
          <div
            className={`p-3.5 rounded-2xl text-xs font-bold flex items-start gap-2.5 ${
              testResult.success
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950 dark:text-rose-300'
            }`}
          >
            {testResult.success ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-500" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
            )}
            <p className="flex-1 mt-0.5">{testResult.message}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="duo-btn duo-btn-gray flex-1 py-3 rounded-xl text-xs uppercase font-extrabold flex items-center justify-center gap-1.5"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>{testing ? 'Đang kiểm tra...' : 'Kiểm Tra Kết Nối'}</span>
          </button>

          <button
            onClick={handleSave}
            className="duo-btn duo-btn-green flex-1 py-3 rounded-xl text-xs uppercase font-black"
          >
            {savedSuccess ? '✓ Đã Lưu' : 'Lưu Cấu Hình'}
          </button>
        </div>
      </div>
    </div>
  );
};
