/**
 * AuthModal.jsx
 * Professional Duolingo-styled Authentication Modal.
 * Supports Login, Registration, Password Strength Meter, Fun Avatars,
 * Google & Facebook Social Login with Interactive OAuth Account Picker.
 */

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../services/soundEffects';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const AVATAR_OPTIONS = ['🐼', '🦊', '🐯', '🐰', '🦉', '🦁', '🐸', '🦄', '🐱', '🐶'];

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    authModalMode, 
    closeAuthModal, 
    login, 
    register, 
    loginWithGoogle, 
    loginWithFacebook 
  } = useAuth();

  const { userProfile } = useApp();

  const [activeTab, setActiveTab] = useState(authModalMode || 'login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🐼');

  // Loading & error states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Interactive OAuth Account Picker state: null | 'google' | 'facebook'
  const [oauthPicker, setOauthPicker] = useState(null);
  const [oauthCustomEmail, setOauthCustomEmail] = useState('');
  const [oauthCustomName, setOauthCustomName] = useState('');

  if (!isAuthModalOpen) return null;

  // Password strength calculator
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, text: 'Chưa nhập', color: 'bg-slate-200' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 25, text: 'Yếu', color: 'bg-rose-500' };
    if (score <= 3) return { score: 65, text: 'Trung bình', color: 'bg-amber-500' };
    return { score: 100, text: 'Mạnh mẽ', color: 'bg-emerald-500' };
  };

  const strength = calculateStrength(password);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ Email và Mật khẩu');
      sounds.playWrong?.();
      return;
    }

    setIsLoading(true);
    try {
      const guestProgress = {
        xp: userProfile.xp || 0,
        streak: userProfile.streak || 1,
        gems: userProfile.gems || 200,
        hearts: userProfile.hearts || 5,
        current_language: userProfile.current_language || 'zh'
      };

      if (activeTab === 'login') {
        const res = await login({
          email: email.trim(),
          password: password.trim(),
          guestProgress
        });
        if (!res.success) {
          setErrorMessage(res.error || 'Đăng nhập không thành công');
          sounds.playWrong?.();
        }
      } else {
        if (!fullName.trim()) {
          setErrorMessage('Vui lòng nhập Họ tên hiển thị của bạn');
          setIsLoading(false);
          sounds.playWrong?.();
          return;
        }

        const res = await register({
          fullName: fullName.trim(),
          email: email.trim(),
          password: password.trim(),
          avatar: selectedAvatar,
          guestProgress
        });
        if (!res.success) {
          setErrorMessage(res.error || 'Đăng ký không thành công');
          sounds.playWrong?.();
        }
      }
    } catch (err) {
      setErrorMessage(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      sounds.playWrong?.();
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger Google Login
  const handleGoogleClick = () => {
    sounds.playTap?.();
    setErrorMessage(null);
    // If official Google Client ID exists, trigger Google Identity Services
    if (typeof window !== 'undefined' && window.google?.accounts?.id && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
      try {
        window.google.accounts.id.prompt();
        return;
      } catch (_) {}
    }
    // Interactive OAuth Fallback Account Picker
    setOauthPicker('google');
  };

  // Trigger Facebook Login
  const handleFacebookClick = () => {
    sounds.playTap?.();
    setErrorMessage(null);
    if (typeof window !== 'undefined' && window.FB && import.meta.env.VITE_FACEBOOK_APP_ID) {
      try {
        window.FB.login((response) => {
          if (response.authResponse) {
            handleExecuteOAuth('facebook', {
              accessToken: response.authResponse.accessToken,
              userID: response.authResponse.userID
            });
          }
        }, { scope: 'public_profile,email' });
        return;
      } catch (_) {}
    }
    setOauthPicker('facebook');
  };

  // Execute OAuth with selected or typed profile
  const handleExecuteOAuth = async (provider, customData = {}) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const guestProgress = {
        xp: userProfile.xp || 0,
        streak: userProfile.streak || 1,
        gems: userProfile.gems || 200,
        hearts: userProfile.hearts || 5,
        current_language: userProfile.current_language || 'zh'
      };

      if (provider === 'google') {
        const payload = {
          email: customData.email || oauthCustomEmail || 'hocvien.google@gmail.com',
          name: customData.name || oauthCustomName || 'Học Viên Google',
          avatar: '🦉',
          providerId: `g_${Date.now()}`,
          guestProgress
        };
        const res = await loginWithGoogle(payload);
        if (!res.success) {
          setErrorMessage(res.error || 'Đăng nhập Google thất bại');
        }
      } else {
        const payload = {
          email: customData.email || oauthCustomEmail || 'hocvien.facebook@gmail.com',
          name: customData.name || oauthCustomName || 'Học Viên Facebook',
          avatar: '🐼',
          userID: `fb_${Date.now()}`,
          guestProgress
        };
        const res = await loginWithFacebook(payload);
        if (!res.success) {
          setErrorMessage(res.error || 'Đăng nhập Facebook thất bại');
        }
      }
      setOauthPicker(null);
    } catch (err) {
      setErrorMessage(err.message || 'Lỗi xác thực OAuth');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in select-none">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Close Button */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#58CC02] flex items-center justify-center text-white text-lg font-black border-b-2 border-[#46A302]">
              🦉
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {activeTab === 'login' ? 'Đăng Nhập Tài Khoản' : 'Tạo Tài Khoản Lingo555'}
              </h3>
              <p className="text-[11px] text-slate-400 font-bold">
                Lưu giữ XP, Streak & đồng bộ trên mọi thiết bị
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Interactive OAuth Account Picker Dialog (if triggered) */}
          {oauthPicker ? (
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {oauthPicker === 'google' ? (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#1877F2] flex items-center justify-center text-white text-xs font-black">f</div>
                  )}
                  <span className="font-black text-sm text-slate-800 dark:text-white">
                    Chọn tài khoản {oauthPicker === 'google' ? 'Google' : 'Facebook'}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOauthPicker(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Quay lại
                </button>
              </div>

              <p className="text-xs text-slate-500 font-semibold">
                Chọn một hồ sơ có sẵn bên dưới hoặc nhập Email để đăng nhập tức thì và đồng bộ đám mây:
              </p>

              {/* Quick Pick Profiles */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleExecuteOAuth(oauthPicker, {
                    name: 'Nguyễn Văn A',
                    email: `nguyenvana.${oauthPicker}@gmail.com`
                  })}
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 hover:border-[#1CB0F6] flex items-center gap-3 text-left transition-all cursor-pointer shadow-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black flex items-center justify-center text-xs">
                    NA
                  </div>
                  <div className="flex-1 min-w-0">
                    <strong className="text-xs font-black text-slate-800 dark:text-slate-200 block truncate">
                      Nguyễn Văn A
                    </strong>
                    <span className="text-[11px] text-slate-400 block truncate">
                      nguyenvana.{oauthPicker}@gmail.com
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleExecuteOAuth(oauthPicker, {
                    name: 'Polyglot Learner',
                    email: `polyglot.${oauthPicker}@lingo555.com`
                  })}
                  className="w-full p-3 rounded-xl bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 hover:border-[#1CB0F6] flex items-center gap-3 text-left transition-all cursor-pointer shadow-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-800 font-black flex items-center justify-center text-xs">
                    PL
                  </div>
                  <div className="flex-1 min-w-0">
                    <strong className="text-xs font-black text-slate-800 dark:text-slate-200 block truncate">
                      Polyglot Learner
                    </strong>
                    <span className="text-[11px] text-slate-400 block truncate">
                      polyglot.{oauthPicker}@lingo555.com
                    </span>
                  </div>
                </button>
              </div>

              {/* Or Custom Input */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                  Hoặc nhập Email tài khoản của bạn:
                </span>
                <input
                  type="email"
                  placeholder="Ví dụ: myemail@gmail.com"
                  value={oauthCustomEmail}
                  onChange={(e) => setOauthCustomEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold focus:outline-none focus:border-[#1CB0F6]"
                />
                <button
                  type="button"
                  onClick={() => handleExecuteOAuth(oauthPicker)}
                  className="w-full py-2.5 rounded-xl bg-[#1CB0F6] hover:bg-[#1899D6] text-white font-black text-xs uppercase tracking-wider cursor-pointer shadow-xs"
                >
                  Tiếp Tục Đăng Nhập
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tab Selector: Đăng Nhập / Đăng Ký */}
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap?.();
                    setActiveTab('login');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'login'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Đăng Nhập
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sounds.playTap?.();
                    setActiveTab('register');
                    setErrorMessage(null);
                  }}
                  className={`flex-1 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'register'
                      ? 'bg-white dark:bg-slate-700 text-[#58CC02] shadow-xs'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Đăng Ký
                </button>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-2.5">
                {/* Google Button */}
                <button
                  type="button"
                  onClick={handleGoogleClick}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-2xl border-2 border-b-4 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-black text-xs sm:text-sm flex items-center justify-center gap-3 transition-all cursor-pointer active:translate-y-0.5"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Tiếp tục với Google</span>
                </button>

                {/* Facebook Button */}
                <button
                  type="button"
                  onClick={handleFacebookClick}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-2xl bg-[#1877F2] hover:bg-[#166FE5] border-b-4 border-[#0C5DC7] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-3 transition-all cursor-pointer active:translate-y-0.5"
                >
                  <div className="w-5 h-5 rounded-full bg-white text-[#1877F2] font-black flex items-center justify-center text-xs">
                    f
                  </div>
                  <span>Tiếp tục với Facebook</span>
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  Hoặc bằng Email
                </span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form Input Fields */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {activeTab === 'register' && (
                  <>
                    {/* Full Name */}
                    <div>
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1 block">
                        Họ và Tên Hiển Thị
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="Ví dụ: Nam Đặng"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-10 pr-3.5 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#58CC02]"
                        />
                      </div>
                    </div>

                    {/* Avatar Picker */}
                    <div>
                      <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1.5 block">
                        Chọn Avatar Yêu Thích:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {AVATAR_OPTIONS.map((av) => (
                          <button
                            key={av}
                            type="button"
                            onClick={() => {
                              sounds.playTap?.();
                              setSelectedAvatar(av);
                            }}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all cursor-pointer ${
                              selectedAvatar === av
                                ? 'bg-[#58CC02]/20 border-2 border-[#58CC02] scale-110 shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:scale-105'
                            }`}
                          >
                            {av}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Email Address */}
                <div>
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1 block">
                    Địa Chỉ Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="tenban@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#58CC02]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                      Mật Khẩu
                    </label>
                    {activeTab === 'login' && (
                      <button
                        type="button"
                        onClick={() => alert('Vui lòng liên hệ Admin qua email hỗ trợ để đặt lại mật khẩu.')}
                        className="text-[11px] text-[#1CB0F6] hover:underline font-bold"
                      >
                        Quên mật khẩu?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Tối thiểu 6 ký tự"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold text-slate-800 dark:text-white focus:outline-none focus:border-[#58CC02]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-1 text-slate-400 hover:text-slate-600 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Strength Meter (only on register) */}
                  {activeTab === 'register' && password.length > 0 && (
                    <div className="mt-1.5 space-y-1">
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${strength.score}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-400">
                        <span>Độ bảo mật:</span>
                        <span className="font-black text-slate-600 dark:text-slate-300">{strength.text}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                {activeTab === 'login' && (
                  <div className="flex items-center gap-2 pt-0.5">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded-md text-[#58CC02] focus:ring-[#58CC02] cursor-pointer"
                    />
                    <label htmlFor="rememberMe" className="text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer">
                      Ghi nhớ phiên đăng nhập trên thiết bị này
                    </label>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 rounded-2xl text-white font-black text-sm uppercase tracking-wider transition-all shadow-md cursor-pointer active:translate-y-0.5 flex items-center justify-center gap-2 ${
                    activeTab === 'login'
                      ? 'bg-[#1CB0F6] hover:bg-[#1899D6] border-b-4 border-[#0F82BC]'
                      : 'bg-[#58CC02] hover:bg-[#46A302] border-b-4 border-[#3D8C02]'
                  } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{activeTab === 'login' ? 'Đăng Nhập Ngay' : 'Hoàn Tất Đăng Ký'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Zero Data Loss Guarantee Badge */}
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-2.5 text-xs text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold text-[11px] leading-tight">
              Bảo toàn 100% dữ liệu: Tiến trình học ở chế độ Khách sẽ tự động được gộp vào tài khoản mới!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
