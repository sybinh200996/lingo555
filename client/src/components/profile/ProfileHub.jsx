import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { sounds } from '../../services/soundEffects';
import { 
  User, 
  Upload, 
  Database, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Flame, 
  Trophy, 
  Heart, 
  Gem, 
  BookOpen, 
  Settings,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export const ProfileHub = () => {
  const { userProfile, refreshProfile, currentLang, openAiSettings, hasAiKey } = useApp();

  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'importer'
  const [dbStats, setDbStats] = useState({ total: 0, breakdown: [] });
  const [isGenerating, setIsGenerating] = useState(false);
  const [importStatus, setImportStatus] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.getDictionaryStats();
      setDbStats(data);
    } catch (e) {
      console.warn('Error loading stats:', e);
    }
  };

  const handleGenerate5000 = async () => {
    sounds.playTap();
    setIsGenerating(true);
    setImportStatus(null);
    try {
      const res = await api.generateSampleData();
      sounds.playFanfare();
      try {
        confetti({ particleCount: 100, spread: 80 });
      } catch (e) {}
      setImportStatus({
        success: true,
        message: res.message,
        total: res.totalInDb,
        duration: res.durationMs
      });
      loadStats();
      refreshProfile();
    } catch (e) {
      setImportStatus({
        success: false,
        message: 'Lỗi khi tạo dữ liệu: ' + e.message
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    sounds.playTap();
    setImportStatus(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.bulkImportCsv(currentLang, formData);
      sounds.playCorrect();
      setImportStatus({
        success: true,
        message: res.message,
        duration: res.durationMs
      });
      loadStats();
    } catch (err) {
      setImportStatus({
        success: false,
        message: 'Lỗi nạp file CSV: ' + err.message
      });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Profile Header Card */}
      <div className="duo-card p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
        <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-4xl shadow-sm border-2 border-emerald-400">
          {userProfile.avatar || '🐼'}
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <h2 className="text-2xl font-black text-slate-800 dark:text-white">
            {userProfile.username || 'Học viên Lingo555'}
          </h2>
          <p className="text-xs text-slate-400 font-semibold">
            Đang chinh phục song ngữ Tiếng Trung 🇨🇳 & Tiếng Anh 🇬🇧
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 font-extrabold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-500" />
              <span>Chuỗi {userProfile.streak || 1} ngày</span>
            </span>

            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 font-extrabold flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              <span>{userProfile.xp || 0} XP</span>
            </span>

            <span className="text-xs px-2.5 py-1 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-600 font-extrabold flex items-center gap-1">
              <Gem className="w-3.5 h-3.5 fill-sky-500" />
              <span>{userProfile.gems || 0} Đá quý</span>
            </span>
          </div>
        </div>
      </div>

      {/* AI Ecosystem Card */}
      <div className="duo-card p-5 bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 border-2 border-emerald-400/40 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  Hệ Sinh Thái AI Model (Google Gemini)
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-black uppercase ${
                  hasAiKey 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' 
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {hasAiKey ? 'Gemini 2.5 Active' : 'Offline Fallback'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Gia sư 24/7 • Hội thoại 2 chiều • AI Writing Lab • Đọc hiểu tự sinh
              </p>
            </div>
          </div>

          <button
            onClick={openAiSettings}
            className="duo-btn duo-btn-green py-2 px-3.5 rounded-xl text-xs font-black uppercase whitespace-nowrap self-start sm:self-auto"
          >
            {hasAiKey ? 'Đổi API Key / Model' : '⚡ Nhập Gemini API Key'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
            activeTab === 'stats'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-500'
          }`}
        >
          Thống Kê Học Tập
        </button>

        <button
          onClick={() => setActiveTab('importer')}
          className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'importer'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Kho Dữ Liệu & Admin Importer</span>
        </button>
      </div>

      {/* 1. LEARNING STATS */}
      {activeTab === 'stats' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="duo-card p-4 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase">Bài Học Đã Xong</span>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {userProfile.stats?.completedLessons || 0}
            </div>
          </div>

          <div className="duo-card p-4 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase">Từ Đã Thuộc Lòng</span>
            <div className="text-3xl font-black text-emerald-500 mt-1">
              {userProfile.stats?.wordsMastered || 0}
            </div>
          </div>

          <div className="duo-card p-4 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase">Sổ Từ Khó Cần Ôn</span>
            <div className="text-3xl font-black text-amber-500 mt-1">
              {userProfile.stats?.difficultWords || 0}
            </div>
          </div>
        </div>
      )}

      {/* 2. ADMIN BULK IMPORTER (> 50,000 WORDS SUPPORT) */}
      {activeTab === 'importer' && (
        <div className="space-y-6">
          {/* Database Live Stats Card */}
          <div className="duo-card p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Quy Mô Kiến Trúc Dữ Liệu
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500 text-white font-black">
                SQLite B-Tree WAL
              </span>
            </div>

            <div className="text-4xl font-black text-white">
              {dbStats.total.toLocaleString()} <span className="text-lg font-normal text-slate-400">từ vựng</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Hệ thống đã lập chỉ mục (Indexes) trên Word, Phonetic, Meaning, Han-Viet, đảm bảo tốc độ phản hồi tìm kiếm &lt; 5ms trên 50.000 từ.
            </p>

            {/* Level breakdown pills */}
            <div className="flex flex-wrap gap-1.5 pt-3">
              {dbStats.breakdown?.slice(0, 10).map((b, i) => (
                <span
                  key={i}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-slate-200 font-semibold"
                >
                  {b.level}: {b.count}
                </span>
              ))}
            </div>
          </div>

          {/* Quick 5,000 Sample Generation Button */}
          <div className="duo-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h3 className="font-black text-base text-slate-800 dark:text-white">
                Nạp Nhanh 5.000 Từ Vựng Mẫu Thử Nghiệm
              </h3>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tạo tức thì hàng ngàn từ ghép HSK1-HSK6 và họ từ phái sinh Oxford/WordNet để kiểm tra khả năng tìm kiếm siêu tốc và phân trang mượt mà.
            </p>
            <button
              onClick={handleGenerate5000}
              disabled={isGenerating}
              className="duo-btn duo-btn-green w-full py-3.5 rounded-xl text-xs uppercase font-black"
            >
              {isGenerating ? 'Đang tự động nạp dữ liệu...' : '⚡ Nạp Ngay 5.000 Từ Vựng Mẫu'}
            </button>
          </div>

          {/* CSV File Upload Zone */}
          <div className="duo-card p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-sky-500" />
              <h3 className="font-black text-base text-slate-800 dark:text-white">
                Nhập Tệp CSV / JSON Tự Cung Cấp
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Hỗ trợ tệp chứa hàng chục ngàn dòng (CC-CEDICT, Oxford, HSK đầy đủ). Cột yêu cầu:{' '}
              <code className="text-emerald-600 font-mono text-[11px]">word, phonetic, han_viet, meaning, level</code>
            </p>

            <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-400 transition-colors">
              <FileText className="w-10 h-10 text-slate-400 mb-2" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Chọn tệp CSV từ máy tính của bạn
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                Kích thước tối đa: 50MB
              </span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Status Alert */}
          {importStatus && (
            <div
              className={`p-4 rounded-2xl text-xs font-bold flex items-start gap-3 ${
                importStatus.success
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-rose-50 text-rose-800 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300'
              }`}
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <div>
                <p>{importStatus.message}</p>
                {importStatus.duration && (
                  <p className="opacity-75 mt-0.5">Thời gian thực thi: {importStatus.duration}ms</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
