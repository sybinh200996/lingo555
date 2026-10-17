/**
 * ProfileHub.jsx
 * Comprehensive User Profile, Cloud Sync, Multi-Device Status,
 * Statistics, and Dictionary Importer Hub.
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
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
  ArrowUpRight,
  Cloud,
  RefreshCw,
  LogOut,
  Key,
  ShieldCheck,
  Calendar,
  Mail,
  Camera
} from 'lucide-react';

const AVATAR_OPTIONS = ['🐼', '🦊', '🐯', '🐰', '🦉', '🦁', '🐸', '🦄', '🐱', '🐶'];

export const ProfileHub = () => {
  const { userProfile, refreshProfile, currentLang, openAiSettings, hasAiKey } = useApp();
  const { 
    user, 
    isAuthenticated, 
    isSyncing, 
    lastSyncedAt, 
    openAuthModal, 
    logout, 
    syncNow, 
    changePassword, 
    updateAvatar 
  } = useAuth();

  const [activeTab, setActiveTab] = useState('stats'); // 'stats' | 'importer'
  const [dbStats, setDbStats] = useState({ total: 0, breakdown: [] });
  const [isGenerating, setIsGenerating] = useState(false);
  const [importStatus, setImportStatus] = useState(null);

  // Avatar picker popover state
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  // Password change modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

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

  const handleManualSync = async () => {
    sounds.playTap?.();
    const res = await syncNow({
      xp: userProfile.xp || 0,
      streak: userProfile.streak || 1,
      gems: userProfile.gems || 200,
      hearts: userProfile.hearts || 5,
      current_language: currentLang
    });

    if (res.success) {
      sounds.playCorrect?.();
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch (_) {}
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordStatus(null);
    setIsChangingPassword(true);
    try {
      const res = await changePassword({ currentPassword, newPassword });
      if (res.success) {
        sounds.playCorrect?.();
        setPasswordStatus({ success: true, message: 'Đổi mật khẩu thành công!' });
        setTimeout(() => {
          setShowPasswordModal(false);
          setCurrentPassword('');
          setNewPassword('');
          setPasswordStatus(null);
        }, 1500);
      } else {
        sounds.playWrong?.();
        setPasswordStatus({ success: false, message: res.error || 'Lỗi đổi mật khẩu' });
      }
    } catch (err) {
      sounds.playWrong?.();
      setPasswordStatus({ success: false, message: err.message || 'Lỗi máy chủ' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleGenerate5000 = async () => {
    sounds.playTap?.();
    setIsGenerating(true);
    setImportStatus(null);
    try {
      const res = await api.generateSampleData();
      sounds.playFanfare?.();
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

    sounds.playTap?.();
    setImportStatus(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.bulkImportCsv(currentLang, formData);
      sounds.playCorrect?.();
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

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Gần đây';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('vi-VN', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (_) {
      return dateStr;
    }
  };

  const formatSyncTime = (dateStr) => {
    if (!dateStr) return 'Chưa đồng bộ';
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' (' + d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) + ')';
    } catch (_) {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto select-none">
      {/* 1. Profile Header Card */}
      <div className="duo-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
          {/* Avatar with Change Option */}
          <div className="relative group">
            <div className="w-20 h-20 rounded-3xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-4xl shadow-sm border-2 border-emerald-400">
              {user?.avatar_url || userProfile.avatar || '🐼'}
            </div>
            {isAuthenticated && (
              <button
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 shadow-xs hover:scale-110 transition-transform cursor-pointer"
                title="Đổi ảnh đại diện"
              >
                <Camera className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              </button>
            )}
          </div>

          {/* User Details */}
          <div className="space-y-1.5 text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white truncate">
                {user?.full_name || userProfile.username || 'Học viên Lingo555'}
              </h2>

              {/* Auth Provider Badge */}
              {isAuthenticated ? (
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider self-center sm:self-auto ${
                  user?.auth_provider === 'google'
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-200'
                    : user?.auth_provider === 'facebook'
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200'
                    : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200'
                }`}>
                  <ShieldCheck className="w-3 h-3" />
                  <span>
                    {user?.auth_provider === 'google' ? 'Google Verified' : user?.auth_provider === 'facebook' ? 'Facebook' : 'Tài khoản Lingo'}
                  </span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 self-center sm:self-auto border border-slate-200 dark:border-slate-700">
                  Tài khoản Khách
                </span>
              )}
            </div>

            {/* Email & Join Date */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 font-semibold">
              {user?.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{user.email}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Tham gia: {formatDate(user?.created_at)}</span>
              </span>
            </div>

            {/* XP, Streak, Gems Stats Row */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1.5">
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

        {/* Avatar Picker Row (Toggled) */}
        {showAvatarPicker && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 animate-in fade-in">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider block">
              Chọn Avatar Mới:
            </span>
            <div className="flex flex-wrap gap-2">
              {AVATAR_OPTIONS.map((av) => (
                <button
                  key={av}
                  onClick={() => {
                    sounds.playTap?.();
                    updateAvatar(av);
                    setShowAvatarPicker(false);
                  }}
                  className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 flex items-center justify-center text-xl transition-all hover:scale-110 cursor-pointer"
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Guest Call to Action Banner (if not logged in) */}
        {!isAuthenticated && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
            <div className="space-y-0.5 text-center sm:text-left">
              <strong className="text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200 block">
                Bạn đang học ở chế độ Khách (Chưa đồng bộ Cloud)
              </strong>
              <p className="text-[11px] text-amber-700 dark:text-amber-300 font-semibold">
                Đăng nhập để tự động lưu toàn bộ {userProfile.xp || 0} XP và tiếp tục học trên điện thoại hoặc máy tính khác.
              </p>
            </div>
            <button
              onClick={() => openAuthModal('login')}
              className="duo-btn duo-btn-green py-2 px-4 rounded-xl font-black text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-xs"
            >
              Đăng Nhập / Đăng Ký
            </button>
          </div>
        )}
      </div>

      {/* 2. Cloud Sync Card (Đồng Bộ Đa Thiết Bị) */}
      <div className="duo-card p-5 bg-gradient-to-br from-white via-slate-50 to-sky-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-sky-950/20 border-2 border-sky-400/40 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1CB0F6] flex items-center justify-center text-white shadow-md">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  Đồng Bộ Đám Mây Đa Thiết Bị (Cloud Sync)
                </h3>
                <span className={`w-2 h-2 rounded-full ${
                  isAuthenticated ? (isSyncing ? 'bg-amber-400 animate-spin' : 'bg-emerald-500 animate-pulse') : 'bg-slate-300'
                }`} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {isAuthenticated 
                  ? `Đồng bộ gần nhất: ${formatSyncTime(lastSyncedAt)}`
                  : 'Đăng nhập để kích hoạt đồng bộ tự động 2 chiều'}
              </p>
            </div>
          </div>

          {isAuthenticated ? (
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="duo-btn duo-btn-blue py-2 px-3.5 rounded-xl text-xs font-black uppercase flex items-center gap-2 whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Đang đồng bộ...' : '☁️ Đồng Bộ Ngay'}</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="duo-btn duo-btn-blue py-2 px-3.5 rounded-xl text-xs font-black uppercase whitespace-nowrap self-start sm:self-auto cursor-pointer"
            >
              Kích Hoạt Sync
            </button>
          )}
        </div>
      </div>

      {/* 3. AI Ecosystem Card */}
      <div className="duo-card p-5 bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 border-2 border-emerald-400/40 shadow-xs space-y-3">
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
                  {hasAiKey ? 'Gemini Active' : 'Offline Fallback'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Gia sư 24/7 • Hội thoại 2 chiều • AI Writing Lab • Đọc hiểu tự sinh
              </p>
            </div>
          </div>

          <button
            onClick={openAiSettings}
            className="duo-btn duo-btn-green py-2 px-3.5 rounded-xl text-xs font-black uppercase whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            {hasAiKey ? 'Đổi API Key / Model' : '⚡ Nhập Gemini API Key'}
          </button>
        </div>
      </div>

      {/* 4. Tab Navigation: Thống Kê vs Quản Trị / Importer */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
            activeTab === 'stats'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500'
          }`}
        >
          Thống Kê Học Tập
        </button>

        <button
          onClick={() => setActiveTab('importer')}
          className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
            activeTab === 'importer'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
              : 'text-slate-500'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Kho Dữ Liệu & Admin Importer</span>
        </button>
      </div>

      {/* 5. TAB CONTENT: Thống Kê Học Tập */}
      {activeTab === 'stats' && (
        <div className="space-y-4">
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

          {/* Account Management & Security Options (if logged in) */}
          {isAuthenticated && (
            <div className="duo-card p-4 sm:p-5 space-y-3">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Quản Trị Tài Khoản & Bảo Mật
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {user?.auth_provider === 'local' && (
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Key className="w-4 h-4 text-slate-500" />
                    <span>Đổi Mật Khẩu</span>
                  </button>
                )}

                <button
                  onClick={logout}
                  className="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/50 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-extrabold text-xs flex items-center gap-2 transition-all cursor-pointer border border-rose-200 dark:border-rose-800"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Đăng Xuất Khỏi Thiết Bị</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. TAB CONTENT: Kho Dữ Liệu & Importer */}
      {activeTab === 'importer' && (
        <div className="space-y-4">
          <div className="duo-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-500" />
              <h3 className="font-black text-base text-slate-800 dark:text-white">
                Bộ Tạo Dữ Liệu Lớn Tự Động (50.000+ từ vựng)
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Sinh tự động kho từ vựng khổng lồ đa tầng cho Tiếng Trung & Tiếng Anh với phiên âm chuẩn, Hán Việt và mẫu câu thực tế.
            </p>
            <button
              onClick={handleGenerate5000}
              disabled={isGenerating}
              className="duo-btn duo-btn-green py-3 px-5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Đang tạo dữ liệu...' : '⚡ Sinh Kho Dữ Liệu Mẫu'}</span>
            </button>
          </div>

          <div className="duo-card p-5 space-y-3">
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

      {/* Change Password Dialog Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-5 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-800 dark:text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-[#1CB0F6]" />
                <span>Đổi Mật Khẩu</span>
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {passwordStatus && (
              <div className={`p-3 rounded-xl text-xs font-bold ${
                passwordStatus.success ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {passwordStatus.message}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                  Mật Khẩu Hiện Tại:
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold focus:outline-none focus:border-[#1CB0F6]"
                />
              </div>

              <div>
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                  Mật Khẩu Mới (Tối thiểu 6 ký tự):
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold focus:outline-none focus:border-[#1CB0F6]"
                />
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="w-full py-2.5 rounded-xl bg-[#1CB0F6] text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-xs"
              >
                {isChangingPassword ? 'Đang cập nhật...' : 'Lưu Mật Khẩu Mới'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
