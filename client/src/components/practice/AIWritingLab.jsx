import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ai } from '../../services/aiClient';
import { speech } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { 
  PenTool, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Volume2, 
  Send, 
  RefreshCw, 
  Trophy, 
  ArrowRight,
  BookOpen,
  Layers,
  ChevronDown
} from 'lucide-react';

const SUGGESTED_PROMPTS = {
  zh: [
    { level: 'HSK1', title: 'Giới thiệu bản thân và gia đình', prompt: '用中文介绍你自己和你的家庭（名字、国籍、家有几口人等）。' },
    { level: 'HSK2', title: 'Kể về một ngày cuối tuần của bạn', prompt: '写一段话介绍你周末通常做什么（买东西、看电影、和朋友喝茶等）。' },
    { level: 'HSK3', title: 'Kế hoạch cho chuyến du lịch sắp tới', prompt: '写一写你打算去哪里旅游，准备怎么去，想体验什么。' },
    { level: 'HSK4', title: 'Ý kiến về việc bảo vệ môi trường', prompt: '谈谈你对保护环境的看法，我们在日常生活中可以做什么。' }
  ],
  en: [
    { level: 'A1', title: 'Introduce Yourself & Your Daily Routine', prompt: 'Write a short paragraph introducing your name, hobbies, and favorite food.' },
    { level: 'A2', title: 'Describe Your Last Vacation', prompt: 'Write about a memorable trip you took: where you went, who you traveled with, and what you enjoyed.' },
    { level: 'B1', title: 'An Email Inquiring About a Job Opportunity', prompt: 'Write a formal email asking about an open internship position at an international company.' },
    { level: 'B2', title: 'Pros and Cons of Remote Working', prompt: 'Discuss the advantages and disadvantages of working from home in modern times.' }
  ]
};

export const AIWritingLab = () => {
  const { currentLang, openAiSettings, hasAiKey } = useApp();

  const prompts = SUGGESTED_PROMPTS[currentLang] || SUGGESTED_PROMPTS.zh;
  const [selectedPrompt, setSelectedPrompt] = useState(prompts[0]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  const [userText, setUserText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewResult, setReviewResult] = useState(null);

  React.useEffect(() => {
    const newPrompts = SUGGESTED_PROMPTS[currentLang] || SUGGESTED_PROMPTS.zh;
    setSelectedPrompt(newPrompts[0]);
    setUserText('');
    setReviewResult(null);
    setUseCustom(false);
  }, [currentLang]);

  const activePromptText = useCustom ? customPrompt : selectedPrompt.prompt;
  const wordCount = userText.trim().length > 0 ? (currentLang === 'zh' ? userText.trim().replace(/\s+/g, '').length : userText.trim().split(/\s+/).length) : 0;

  const handleSubmitWriting = async () => {
    if (!userText.trim() || isSubmitting) return;

    sounds.playTap();
    setIsSubmitting(true);
    setReviewResult(null);

    try {
      const res = await ai.reviewWriting({
        prompt: activePromptText,
        text: userText.trim(),
        level: selectedPrompt.level || 'HSK2',
        language: currentLang
      });

      if (res.success && res.data) {
        sounds.playCorrect();
        setReviewResult(res.data);
      }
    } catch (e) {
      console.warn('Error reviewing writing:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="duo-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-slate-800 dark:text-white">
                AI Writing Lab - Chấm Điểm &amp; Sửa Lỗi Viết
              </h3>
              <p className="text-xs text-slate-400">
                Chuyên gia AI phân tích ngữ pháp, trật tự từ và nâng cấp văn phong
              </p>
            </div>
          </div>

          <button
            onClick={openAiSettings}
            className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 flex items-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{hasAiKey ? 'AI Gemini Đang Bật' : 'Cài Đặt AI'}</span>
          </button>
        </div>
      </div>

      {/* Prompt Selector */}
      <div className="duo-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-slate-400">
            Chọn Đề Bài Luyện Viết:
          </span>
          <button
            onClick={() => setUseCustom(!useCustom)}
            className="text-xs text-sky-500 hover:text-sky-600 font-bold"
          >
            {useCustom ? 'Chọn đề bài có sẵn' : '+ Tự nhập đề bài'}
          </button>
        </div>

        {!useCustom ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  sounds.playTap();
                  setSelectedPrompt(p);
                }}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  selectedPrompt === p
                    ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-500 text-white font-black uppercase">
                    {p.level}
                  </span>
                  <span className="font-bold text-xs text-slate-800 dark:text-white line-clamp-1">
                    {p.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {p.prompt}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Nhập chủ đề bạn muốn luyện viết (ví dụ: Viết đoạn văn giới thiệu sở thích)..."
            className="w-full p-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-amber-500"
          />
        )}
      </div>

      {/* Writing Input Stage */}
      <div className="duo-card p-5 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400">
          <span>Khu vực làm bài:</span>
          <span>{wordCount} {currentLang === 'zh' ? 'chữ Hán' : 'từ'}</span>
        </div>

        <textarea
          rows={6}
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          placeholder={
            currentLang === 'zh'
              ? 'Nhập câu hoặc đoạn văn bằng tiếng Trung của bạn tại đây... (Ví dụ: 我是一个越南人，我非常喜欢学习汉语...)'
              : 'Type your English sentences or essay here...'
          }
          className="w-full p-4 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
        />

        <div className="flex justify-end">
          <button
            onClick={handleSubmitWriting}
            disabled={!userText.trim() || isSubmitting}
            className="duo-btn duo-btn-yellow py-3.5 px-6 rounded-2xl text-xs uppercase font-black flex items-center gap-2 disabled:opacity-40"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-amber-950 border-t-transparent rounded-full animate-spin" />
                <span>AI Đang Chấm Bài &amp; Soát Lỗi...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Nộp Bài &amp; Nhận Đánh Giá AI</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI REVIEW SCORECARD & DETAILED DIFF */}
      {reviewResult && (
        <div className="space-y-4 animate-in zoom-in-95">
          {/* Top Scorecard */}
          <div className="duo-card p-6 bg-gradient-to-br from-amber-500 to-amber-600 text-white border-0 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-black uppercase text-amber-100 tracking-wider">
                  Kết Quả Chấm Điểm AI
                </span>
                <h3 className="text-2xl font-black mt-0.5">
                  Đánh Giá Tổng Thể
                </h3>
              </div>
              <div className="text-right">
                <span className="text-4xl font-black">{reviewResult.score}</span>
                <span className="text-lg opacity-80">/100</span>
                <div className="text-xs font-bold text-amber-100">
                  Cấp độ: {reviewResult.levelAchieved}
                </div>
              </div>
            </div>

            <p className="text-xs text-amber-50 leading-relaxed font-semibold">
              {reviewResult.overallVerdict}
            </p>
          </div>

          {/* Detailed Errors & Visual Corrections */}
          <div className="duo-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <h4 className="font-black text-sm text-slate-800 dark:text-white">
                Các Lỗi Cần Sửa Đổi ({reviewResult.errors?.length || 0})
              </h4>
            </div>

            {reviewResult.errors && reviewResult.errors.length > 0 ? (
              <div className="space-y-2.5">
                {reviewResult.errors.map((err, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-rose-200 dark:bg-rose-900 text-rose-800 dark:text-rose-200 font-extrabold text-[10px]">
                        {err.type || 'Lỗi ngữ pháp'}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 font-bold text-sm">
                      <span className="text-rose-600 line-through">
                        {err.original}
                      </span>
                      <ArrowRight className="hidden sm:block w-4 h-4 text-slate-400" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-black">
                        {err.correction}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-xs">
                      {err.explanation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-emerald-600 font-bold">
                ✓ Tuyệt vời! Không phát hiện lỗi ngữ pháp hay từ vựng cơ bản nào.
              </p>
            )}
          </div>

          {/* Paraphrase & Sentence Upgrades */}
          {reviewResult.improvedVersions && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Natural Conversational */}
              {reviewResult.improvedVersions.natural && (
                <div className="duo-card p-4 space-y-2 bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-700 dark:text-emerald-400 uppercase">
                      🗣️ Phiên Bản Giao Tiếp Tự Nhiên
                    </span>
                    <button
                      onClick={() => speech.speak(reviewResult.improvedVersions.natural.text, currentLang, 1.0)}
                      className="p-1 text-emerald-600 hover:text-emerald-700"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm font-black text-slate-900 dark:text-white leading-relaxed">
                    {reviewResult.improvedVersions.natural.text}
                  </p>
                  {reviewResult.improvedVersions.natural.phonetic && (
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      [{reviewResult.improvedVersions.natural.phonetic}]
                    </p>
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {reviewResult.improvedVersions.natural.translation}
                  </p>
                </div>
              )}

              {/* Advanced / Academic */}
              {reviewResult.improvedVersions.advanced && (
                <div className="duo-card p-4 space-y-2 bg-purple-50/40 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/60">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-700 dark:text-purple-400 uppercase">
                      🎓 Phiên Bản Học Thuật / HSK Cao Cấp
                    </span>
                    <button
                      onClick={() => speech.speak(reviewResult.improvedVersions.advanced.text, currentLang, 1.0)}
                      className="p-1 text-purple-600 hover:text-purple-700"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-sm font-black text-slate-900 dark:text-white leading-relaxed">
                    {reviewResult.improvedVersions.advanced.text}
                  </p>
                  {reviewResult.improvedVersions.advanced.phonetic && (
                    <p className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold">
                      [{reviewResult.improvedVersions.advanced.phonetic}]
                    </p>
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {reviewResult.improvedVersions.advanced.translation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
