import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { sounds } from '../../services/soundEffects';
import { 
  X, 
  Gem, 
  ShieldCheck, 
  Heart, 
  Zap, 
  Sparkles, 
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const GemShopModal = ({ isOpen, onClose }) => {
  const { userProfile, refreshProfile } = useApp();
  const [loadingItem, setLoadingItem] = useState(null);
  const [purchaseMsg, setPurchaseMsg] = useState(null);

  if (!isOpen) return null;

  const currentGems = userProfile?.gems || 0;
  const currentFreezes = userProfile?.streak_freezes || 0;
  const isDoubleXpActive = userProfile?.double_xp_until && new Date(userProfile.double_xp_until) > new Date();

  const handleBuy = async (itemType) => {
    sounds.playTap();
    setLoadingItem(itemType);
    setPurchaseMsg(null);
    try {
      const res = await api.buyShopItem(itemType);
      if (res.success) {
        sounds.playCorrect();
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        setPurchaseMsg({ type: 'success', text: res.message || 'Giao dịch thành công!' });
        await refreshProfile();
      } else {
        sounds.playWrong();
        setPurchaseMsg({ type: 'error', text: res.error || 'Giao dịch thất bại' });
      }
    } catch (e) {
      sounds.playWrong();
      setPurchaseMsg({ type: 'error', text: 'Không thể kết nối đến máy chủ cửa hàng.' });
    } finally {
      setLoadingItem(null);
    }
  };

  const ITEMS = [
    {
      id: 'streak_freeze',
      name: 'Đóng Băng Chuỗi Ngày (Streak Freeze)',
      icon: <ShieldCheck className="w-8 h-8 text-sky-400 fill-sky-400/20" />,
      cost: 50,
      description: 'Bảo vệ chuỗi Streak của bạn nếu bạn bận hoặc quên học 1 ngày. Tối đa sở hữu 2 lượt.',
      badge: `Đang sở hữu: ${currentFreezes}/2`,
      disabled: currentFreezes >= 2 || currentGems < 50
    },
    {
      id: 'heart_refill',
      name: 'Hồi Phục Trọn Bộ 5 Tim (Heart Refill)',
      icon: <Heart className="w-8 h-8 text-rose-500 fill-rose-500/30" />,
      cost: 30,
      description: 'Nạp đầy 5 tim ngay tức thì để tiếp tục học bài mới mà không bị gián đoạn.',
      badge: `Tim hiện có: ${userProfile?.hearts || 5}/${userProfile?.max_hearts || 5}`,
      disabled: (userProfile?.hearts || 5) >= 5 || currentGems < 30
    },
    {
      id: 'double_xp',
      name: 'Bình Nhân Đôi XP 15 Phút (Double XP Potion)',
      icon: <Zap className="w-8 h-8 text-purple-400 fill-purple-400/30" />,
      cost: 40,
      description: 'Nhận gấp đôi điểm XP cho mọi bài học và câu hỏi hoàn thành trong 15 phút tới.',
      badge: isDoubleXpActive ? '🔥 Đang hoạt động x2!' : 'Thời lượng: 15 phút',
      disabled: isDoubleXpActive || currentGems < 40
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="duo-card max-w-lg w-full p-6 sm:p-7 relative bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-md">
              <Gem className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Cửa Hàng Đá Quý (Gem Shop)
              </h3>
              <p className="text-xs text-slate-500 font-bold">
                Trang bị vật phẩm nâng cao chuỗi học tập
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Current Gems Balance Card */}
        <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border-2 border-sky-200 dark:border-sky-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Gem className="w-7 h-7 text-sky-500 fill-sky-500 animate-bounce-short" />
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Số dư của bạn</span>
              <div className="text-2xl font-black text-sky-600 dark:text-sky-400">
                {currentGems} Đá Quý
              </div>
            </div>
          </div>

          <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-900/60 text-sky-700 dark:text-sky-300">
            Học để nhận thêm
          </span>
        </div>

        {/* Purchase Notification Banner */}
        {purchaseMsg && (
          <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in ${
            purchaseMsg.type === 'success' 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300' 
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-300'
          }`}>
            {purchaseMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{purchaseMsg.text}</span>
          </div>
        )}

        {/* Items List */}
        <div className="space-y-4">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs shrink-0">
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="inline-block text-[11px] font-extrabold text-indigo-500 dark:text-indigo-400">
                    {item.badge}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleBuy(item.id)}
                disabled={item.disabled || loadingItem === item.id}
                className={`duo-btn text-xs py-2.5 px-4 rounded-xl shrink-0 flex items-center justify-center gap-1.5 font-black uppercase tracking-wider ${
                  item.disabled 
                    ? 'opacity-50 cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-800' 
                    : 'duo-btn-green shadow-md'
                }`}
              >
                <Gem className="w-4 h-4 fill-current" />
                <span>{loadingItem === item.id ? 'Đang mua...' : `${item.cost} Gems`}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
