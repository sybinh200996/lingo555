import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { ai } from '../../services/aiClient';
import { speech } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Volume2, 
  BookOpen, 
  Lightbulb, 
  Mic, 
  MicOff, 
  RotateCcw,
  Layers,
  GraduationCap
} from 'lucide-react';

export const FloatingAITutor = () => {
  const { 
    isAiTutorOpen, 
    closeAiTutor, 
    aiTutorPayload, 
    currentLang,
    openAiSettings,
    hasAiKey
  } = useApp();

  const [activeTab, setActiveTab] = useState('explain'); // 'explain' | 'chat'
  const [explanationData, setExplanationData] = useState(null);
  const [loadingExplain, setLoadingExplain] = useState(false);

  // Chat Q&A state
  const [chatMessages, setChatMessages] = useState([]);
  const [inputQuery, setInputQuery] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (aiTutorPayload) {
      setActiveTab('explain');
      fetchExplanation(aiTutorPayload);
    } else {
      setActiveTab('chat');
    }
  }, [aiTutorPayload]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const fetchExplanation = async (payload) => {
    setLoadingExplain(true);
    try {
      const res = await ai.explainMistake({
        question: payload.question || '',
        userAnswer: payload.userAnswer || '',
        correctAnswer: payload.correctAnswer || '',
        language: currentLang,
        hint: payload.hint || ''
      });
      if (res.success) {
        setExplanationData(res.data);
      }
    } catch (e) {
      console.warn('Error fetching mistake explanation:', e);
    } finally {
      setLoadingExplain(false);
    }
  };

  const handleSendChat = async (e) => {
    e?.preventDefault();
    if (!inputQuery.trim() || loadingChat) return;

    sounds.playTap();
    const query = inputQuery.trim();
    setInputQuery('');

    const newMessages = [...chatMessages, { role: 'user', content: query }];
    setChatMessages(newMessages);
    setLoadingChat(true);

    try {
      const res = await ai.askTutor({
        query,
        currentContext: aiTutorPayload || {},
        language: currentLang,
        history: newMessages
      });

      if (res.success) {
        setChatMessages(prev => [...prev, { role: 'bot', content: res.data.reply }]);
        sounds.playCorrect();
      }
    } catch (e) {
      setChatMessages(prev => [
        ...prev,
        { role: 'bot', content: 'Xin lỗi bạn, có sự cố kết nối tới Gia sư AI. Vui lòng thử lại sau.' }
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleMicVoice = () => {
    if (isRecording) {
      speech.stopListening();
      setIsRecording(false);
      return;
    }

    setIsRecording(true);
    speech.startListening({
      lang: currentLang,
      maxDuration: 25000,
      silenceTimeout: 3500,
      onInterim: (text) => {
        setInputQuery(text);
      },
      onResult: (transcript) => {
        setIsRecording(false);
        setInputQuery(transcript);
      },
      onError: () => setIsRecording(false),
      onEnd: () => setIsRecording(false)
    });
  };

  if (!isAiTutorOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity"
        onClick={closeAiTutor}
      />
      <div className="fixed inset-0 sm:inset-auto sm:right-6 sm:bottom-6 z-50 sm:w-[440px] sm:max-h-[650px] sm:h-[85vh] h-full w-full bg-white dark:bg-slate-900 sm:rounded-3xl rounded-none shadow-2xl border-2 border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
      {/* Top Header */}
      <div className="p-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border border-white/30">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-sm tracking-tight">Gia Sư AI LingoBot</h3>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-bold uppercase">
                {currentLang === 'zh' ? 'Tiếng Trung' : 'Tiếng Anh'}
              </span>
            </div>
            <p className="text-[11px] text-emerald-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
              <span>Sẵn sàng hỗ trợ 24/7</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={openAiSettings}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white/90"
            title="Cài đặt API Key"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={closeAiTutor}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1.5 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
        {aiTutorPayload && (
          <button
            onClick={() => setActiveTab('explain')}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'explain'
                ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Phân Tích Lỗi Sai</span>
          </button>
        )}

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'chat'
              ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-xs'
              : 'text-slate-500'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Hỏi Đáp Gia Sư</span>
        </button>
      </div>

      {/* Missing Key Notification Banner */}
      {!hasAiKey && (
        <div className="px-3.5 py-2 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/60 text-[11px] flex items-center justify-between text-amber-800 dark:text-amber-200 shrink-0">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Đang dùng phản hồi mẫu offline.</span>
          </div>
          <button
            onClick={openAiSettings}
            className="text-amber-700 dark:text-amber-300 font-black underline hover:text-amber-900 dark:hover:text-white cursor-pointer ml-2"
          >
            Cài API Key
          </button>
        </div>
      )}

      {/* Main Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 1. EXPLANATION TAB */}
        {activeTab === 'explain' && (
          <div className="space-y-4">
            {loadingExplain ? (
              <div className="py-20 text-center text-slate-400 space-y-2">
                <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-xs font-bold">Gia sư AI đang phân tích ngữ pháp &amp; chiết tự...</p>
              </div>
            ) : explanationData ? (
              <div className="space-y-3.5 animate-in fade-in">
                {/* Summary Alert */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs">
                  <span className="font-black text-emerald-800 dark:text-emerald-300 block mb-1 uppercase tracking-wider">
                    Tóm Tắt Cốt Lõi:
                  </span>
                  <p className="text-emerald-700 dark:text-emerald-300/90 leading-relaxed font-semibold">
                    {explanationData.summary}
                  </p>
                </div>

                {/* Detailed Explanation */}
                <div className="duo-card p-3.5 space-y-1">
                  <span className="text-[11px] font-black text-slate-400 uppercase">
                    Chi Tiết Ngữ Cảnh:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {explanationData.detailedExplanation}
                  </p>
                </div>

                {/* Grammar Rule */}
                {explanationData.grammarRule && (
                  <div className="duo-card p-3.5 space-y-1 bg-sky-50/50 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900/50">
                    <span className="text-[11px] font-black text-sky-600 dark:text-sky-400 uppercase flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Quy Tắc Ngữ Pháp:</span>
                    </span>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                      {explanationData.grammarRule}
                    </p>
                  </div>
                )}

                {/* Etymology / Chiết tự hoặc Ngữ âm */}
                {explanationData.etymologyOrPhonetics && (
                  <div className="duo-card p-3.5 space-y-1 bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50">
                    <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 uppercase flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{currentLang === 'zh' ? 'Chiết Tự Chữ Hán:' : 'Quy Tắc Ngữ Âm / Trọng Âm:'}</span>
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {explanationData.etymologyOrPhonetics}
                    </p>
                  </div>
                )}

                {/* Example sentence with Audio */}
                {explanationData.exampleSentence && (
                  <div className="duo-card p-3.5 space-y-1.5">
                    <span className="text-[11px] font-black text-slate-400 uppercase">
                      Câu Ví Dụ Minh Họa:
                    </span>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white">
                          {explanationData.exampleSentence.target}
                        </p>
                        {explanationData.exampleSentence.phonetic && (
                          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            [{explanationData.exampleSentence.phonetic}]
                          </p>
                        )}
                        <p className="text-xs text-slate-500">
                          {explanationData.exampleSentence.meaning}
                        </p>
                      </div>
                      <button
                        onClick={() => speech.speak(explanationData.exampleSentence.target, currentLang, 1.0)}
                        className="p-2 text-sky-500 hover:bg-sky-50 dark:hover:bg-slate-800 rounded-xl"
                      >
                        <Volume2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Mnemonic Memory Tip */}
                {explanationData.mnemonicTip && (
                  <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs space-y-1">
                    <span className="font-black text-purple-700 dark:text-purple-300 flex items-center gap-1 uppercase">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Mẹo Ghi Nhớ Nhanh:</span>
                    </span>
                    <p className="text-purple-900/90 dark:text-purple-200 leading-relaxed">
                      {explanationData.mnemonicTip}
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* 2. CHAT Q&A TAB */}
        {activeTab === 'chat' && (
          <div className="space-y-3">
            {chatMessages.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <Bot className="w-10 h-10 mx-auto text-emerald-500" />
                <h4 className="font-black text-sm text-slate-700 dark:text-slate-300">
                  Bạn có câu hỏi gì về bài học này không?
                </h4>
                <p className="text-xs max-w-xs mx-auto">
                  Hãy hỏi LingoBot về ngữ pháp, nghĩa của từ, cách dùng trong câu hoặc mẹo phát âm!
                </p>
              </div>
            ) : (
              chatMessages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={idx}
                    className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xs shrink-0 font-bold">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        isUser
                          ? 'bg-emerald-500 text-white rounded-tr-none font-semibold'
                          : 'duo-card text-slate-800 dark:text-slate-200 rounded-tl-none space-y-1'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  </div>
                );
              })
            )}

            {loadingChat && (
              <div className="flex gap-2 items-center text-slate-400 text-xs italic">
                <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <span>Gia sư đang soạn câu trả lời...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Bar (For Chat Tab) */}
      {activeTab === 'chat' && (
        <form
          onSubmit={handleSendChat}
          className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
        >
          <button
            type="button"
            onClick={handleMicVoice}
            className={`p-2.5 rounded-xl border transition-all ${
              isRecording
                ? 'bg-rose-500 text-white animate-pulse border-rose-600'
                : 'bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
            }`}
            title="Nói câu hỏi qua Micro"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Hỏi gia sư bất kỳ điều gì..."
            className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-semibold focus:outline-none focus:border-emerald-500 text-slate-800 dark:text-white"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || loadingChat}
            className="duo-btn duo-btn-green p-2.5 rounded-xl text-white disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
    </>
  );
};
