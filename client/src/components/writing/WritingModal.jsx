/**
 * WritingModal.jsx
 * Full-screen modal wrapper for StrokeOrderWriter (Chinese) or EnglishSpellingWriter (English).
 * Can be triggered from Dictionary, WordModal, LessonModal, or anywhere via context.
 *
 * Usage:
 *   <WritingModal isOpen={bool} word={wordObj} lang="zh" onClose={fn} />
 */

import React from 'react';
import { X, PenLine } from 'lucide-react';
import { StrokeOrderWriter } from './StrokeOrderWriter';
import { EnglishSpellingWriter } from './EnglishSpellingWriter';
import { sounds } from '../../services/soundEffects';

export const WritingModal = ({ isOpen, word, lang = 'zh', onClose }) => {
  if (!isOpen || !word) return null;

  const hanziWord = typeof word === 'string' ? word : (word.word || '');
  const pinyin = typeof word === 'string' ? '' : (word.phonetic || word.pinyin || '');
  const meaning = typeof word === 'string' ? '' : (word.meaning || '');
  const isZH = lang === 'zh';

  const handleClose = () => {
    sounds.playTap?.();
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="bg-white dark:bg-[#131F24] rounded-3xl w-full max-w-md shadow-2xl border-2 border-[#E5E5E5] dark:border-[#37464F] flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E5E5E5] dark:border-[#37464F] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center shadow-sm">
              <PenLine className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                {isZH ? 'Tập Viết Chữ Hán – Chuẩn Thứ Tự Nét' : 'Luyện Spelling & Chính Tả'}
              </p>
              <h3 className="font-black text-slate-800 dark:text-white text-sm leading-tight">
                {isZH ? `Tập viết: ${hanziWord}` : `Spelling: ${hanziWord}`}
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {isZH ? (
            <StrokeOrderWriter
              word={hanziWord}
              pinyin={pinyin}
              meaning={meaning}
              size={210}
              onWordComplete={() => {}}
            />
          ) : (
            <EnglishSpellingWriter
              word={hanziWord}
              phonetic={pinyin}
              meaning={meaning}
            />
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 py-3 border-t border-[#E5E5E5] dark:border-[#37464F] text-center">
          <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
            {isZH
              ? '💡 Kéo nét theo đúng thứ tự: Ngang trước sổ sau, trên trước dưới sau, trái trước phải sau'
              : '💡 Gõ từng ký tự chính xác. Nhấn Enter hoặc Space để kiểm tra.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WritingModal;
