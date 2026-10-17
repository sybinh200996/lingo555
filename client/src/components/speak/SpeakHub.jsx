import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { ai } from '../../services/aiClient';
import { speech } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { 
  MessageSquare, 
  Volume2, 
  Mic, 
  MicOff, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Hotel, 
  ShoppingBag, 
  Coffee, 
  Briefcase, 
  Plane, 
  Handshake, 
  Lightbulb, 
  Eye, 
  EyeOff, 
  Send 
} from 'lucide-react';

const SCENARIOS = {
  zh: [
    { id: 'zh_hotel', title: 'Nhận Phòng Khách Sạn', role: 'Lễ tân khách sạn', level: 'HSK1', topic: 'Du lịch', description: 'Làm thủ tục nhận phòng đơn, xuất trình hộ chiếu và hỏi số phòng tại Bắc Kinh.', icon: Hotel },
    { id: 'zh_market', title: 'Mặc Cả Tại Chợ Truyền Thống', role: 'Chủ sạp hoa quả', level: 'HSK2', topic: 'Mua sắm', description: 'Hỏi giá hoa quả, trả giá bớt 2 tệ và mua hoa quả tươi ngon.', icon: ShoppingBag },
    { id: 'zh_dining', title: 'Gọi Món Tại Nhà Hàng', role: 'Người phục vụ', level: 'HSK2', topic: 'Ẩm thực', description: 'Gọi món lẩu Tứ Xuyên, dặn dò không ăn cay và xin thêm nước lọc.', icon: Coffee },
    { id: 'zh_airport', title: 'Giao Tiếp Sân Bay', role: 'Nhân viên hải quan', level: 'HSK3', topic: 'Du lịch', description: 'Hỏi cổng lên máy bay, gửi hành lý ký gửi và kiểm tra thẻ lên tàu.', icon: Plane },
    { id: 'zh_interview', title: 'Phỏng Vấn Xin Việc Tiếng Trung', role: 'Giám đốc tuyển dụng', level: 'HSK4', topic: 'Công việc', description: 'Giới thiệu kinh nghiệm làm việc, thế mạnh bản thân và mức lương mong muốn.', icon: Briefcase },
    { id: 'zh_business', title: 'Đàm Phán Thương Mại', role: 'Đối tác doanh nghiệp', level: 'HSK5', topic: 'Kinh doanh', description: 'Thương lượng giá sỉ, phương thức vận chuyển và điều khoản hợp đồng.', icon: Handshake }
  ],
  en: [
    { id: 'en_cafe', title: 'Ordering Coffee at Central Cafe', role: 'Barista', level: 'A1', topic: 'Daily Life', description: 'Order your morning drink, customize milk and sweetness, and pay by card.', icon: Coffee },
    { id: 'en_airport', title: 'Airport Immigration & Check-in', role: 'Immigration Officer', level: 'A2', topic: 'Travel', description: 'Answer purpose of visit, length of stay, and declare customs items.', icon: Plane },
    { id: 'en_hotel', title: 'Hotel Reservation & Room Service', role: 'Hotel Concierge', level: 'A2', topic: 'Hospitality', description: 'Check into your suite, ask about breakfast buffet and request clean towels.', icon: Hotel },
    { id: 'en_interview', title: 'Tech Job Interview', role: 'Hiring Manager', level: 'B1', topic: 'Career', description: 'Introduce technical background, discuss past software projects and team leadership.', icon: Briefcase },
    { id: 'en_business', title: 'International Business Negotiation', role: 'Overseas Partner', level: 'B2', topic: 'Business', description: 'Negotiate contract terms, wholesale bulk discount, and delivery timelines.', icon: Handshake }
  ]
};

export const SpeakHub = () => {
  const { currentLang, userProfile, openAiSettings, hasAiKey } = useApp();

  const scenariosList = SCENARIOS[currentLang] || SCENARIOS.zh;
  const [activeScenario, setActiveScenario] = useState(null);

  // Chat conversation state
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAiResponding, setIsAiResponding] = useState(false);
  const [latestFeedback, setLatestFeedback] = useState(null);
  const [suggestedHint, setSuggestedHint] = useState(null);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [apiError, setApiError] = useState(null);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    setActiveScenario(null);
    setMessages([]);
    setLatestFeedback(null);
    setSuggestedHint(null);
  }, [currentLang]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiResponding]);

  const handleSelectScenario = (sc) => {
    sounds.playTap();
    setActiveScenario(sc);
    setLatestFeedback(null);
    setSuggestedHint(null);

    // Initial greeting from bot
    const initBotMsg = currentLang === 'zh'
      ? {
          role: 'bot',
          text: `您好！欢迎光临。我是这里的${sc.role}，请问有什么可以为您服务的？`,
          pinyin: `Nín hǎo! Huānyíng guānglín. Wǒ shì zhèlǐ de ${sc.role}, qǐngwèn yǒu shénme kěyǐ wèi nín fúwù de?`,
          vn: `Xin chào! Chào mừng quý khách. Tôi là ${sc.role} ở đây, xin hỏi có thể giúp gì cho quý khách?`
        }
      : {
          role: 'bot',
          text: `Hello! Welcome. I am the ${sc.role} today. How can I help you?`,
          pinyin: '',
          vn: `Xin chào! Chào mừng bạn. Tôi là ${sc.role} hôm nay. Tôi có thể giúp gì cho bạn?`
        };

    setMessages([initBotMsg]);
    setTimeout(() => {
      speech.speak(initBotMsg.text, currentLang, 1.0);
    }, 400);
  };

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || userInput).trim();
    if (!text || isAiResponding) return;

    sounds.playTap();
    setUserInput('');
    setSuggestedHint(null);
    setApiError(null);

    const newMsgs = [...messages, { role: 'user', text }];
    setMessages(newMsgs);
    setIsAiResponding(true);

    try {
      // Retain conversation history: send up to 10 most recent dialogue turns
      const recentTurns = newMsgs.slice(-10);
      const res = await ai.chatRoleplay({
        scenario: activeScenario,
        messages: recentTurns,
        userMessage: text,
        language: currentLang
      });

      if (res && res.success && res.data) {
        const aiData = res.data;
        const botMsg = {
          role: 'bot',
          text: aiData.replyText,
          pinyin: aiData.phonetic,
          vn: aiData.translation
        };

        setMessages(prev => [...prev, botMsg]);
        setLatestFeedback(aiData.userFeedback);
        setSuggestedHint(aiData.hintForUser);

        sounds.playCorrect();
        // Speak AI voice
        speech.speak(aiData.replyText, currentLang, 1.0);
      } else {
        // Friendly fallback notification without crashing or white-screen
        setApiError(res?.error || 'Chưa thể kết nối tới Google Gemini. Đang sử dụng câu trả lời mẫu thông minh.');
        const fallbackMsg = currentLang === 'zh'
          ? {
              role: 'bot',
              text: '好的，我已经明白了。请问您还需要别的帮助吗？',
              pinyin: 'Hǎo de, wǒ yǐjīng míngbái le. Qǐngwèn nín hái xūyào bié de bāngzhù ma?',
              vn: 'Dạ vâng, tôi đã hiểu rồi. Xin hỏi bạn có cần giúp đỡ gì thêm không ạ?'
            }
          : {
              role: 'bot',
              text: 'I understand! Is there anything else I can help you with?',
              pinyin: '',
              vn: 'Tôi hoàn toàn hiểu! Bạn có cần tôi giúp thêm điều gì không?'
            };
        setMessages(prev => [...prev, fallbackMsg]);
        speech.speak(fallbackMsg.text, currentLang, 1.0);
      }
    } catch (e) {
      console.warn('Roleplay error:', e);
      setApiError('Lỗi kết nối mạng: Không thể gọi AI. Vui lòng kiểm tra API Key.');
    } finally {
      setIsAiResponding(false);
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
      onResult: (transcript) => {
        setIsRecording(false);
        setUserInput(transcript);
        // Automatically send after speaking
        handleSendMessage(transcript);
      },
      onError: () => setIsRecording(false),
      onEnd: () => setIsRecording(false)
    });
  };

  const handleUseHint = () => {
    if (!suggestedHint) return;
    sounds.playTap();
    // Extract target text if hint has parentheses
    const cleanHint = suggestedHint.split('(')[0].trim();
    setUserInput(cleanHint);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {!activeScenario ? (
        /* SCENARIOS SELECTION GRID */
        <div className="space-y-4">
          <div className="duo-card p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-500 text-white flex items-center justify-center shadow-md">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-800 dark:text-white">
                    Phòng Luyện Hội Thoại &amp; Phản Xạ AI
                  </h2>
                  <p className="text-xs text-slate-400">
                    Nhập vai 2 chiều với phản hồi sư phạm tức thì từ Google Gemini
                  </p>
                </div>
              </div>

              <button
                onClick={openAiSettings}
                className="text-xs px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>{hasAiKey ? 'AI Sẵn Sàng' : 'Cài Đặt AI'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scenariosList.map((sc) => {
              const Icon = sc.icon || MessageSquare;
              return (
                <div
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc)}
                  className="duo-card-interactive p-4 flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-purple-500 text-white font-black uppercase">
                          {sc.level}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          {sc.topic}
                        </span>
                      </div>
                      <h4 className="font-black text-sm text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {sc.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {sc.description}
                  </p>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100 dark:border-slate-800 text-purple-600 dark:text-purple-400 font-bold">
                    <span>Đóng vai: {sc.role}</span>
                    <Play className="w-4 h-4 fill-purple-600" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ACTIVE AI VOICE CHAT & FEEDBACK */
        <div className="space-y-4">
          {/* Missing API Key or Network Alert Banner */}
          {(!hasAiKey || apiError) && (
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs flex flex-wrap items-center justify-between gap-2.5 animate-in fade-in">
              <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-semibold">
                  {apiError || 'Chưa cấu hình API Key. Hãy kích hoạt Google Gemini để AI phản hồi chuyên sâu và tự nhiên.'}
                </span>
              </div>
              <button
                type="button"
                onClick={openAiSettings}
                className="duo-btn duo-btn-yellow text-xs py-1.5 px-3 rounded-xl font-black shrink-0"
              >
                Cài Đặt API Key
              </button>
            </div>
          )}

          {/* Header Controls */}
          <div className="duo-card p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setActiveScenario(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <div>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  {activeScenario.level} • {activeScenario.role}
                </span>
                <h3 className="text-base font-black text-slate-800 dark:text-white mt-0.5">
                  {activeScenario.title}
                </h3>
              </div>
            </div>

            {/* Display Toggles */}
            <div className="flex items-center gap-1 text-xs">
              {currentLang === 'zh' && (
                <button
                  onClick={() => setShowPinyin(!showPinyin)}
                  className={`px-2 py-1 rounded-lg font-bold border transition-all ${
                    showPinyin
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-300'
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                  title="Bật/Tắt Pinyin"
                >
                  Pinyin
                </button>
              )}

              <button
                onClick={() => setShowTranslation(!showTranslation)}
                className={`px-2 py-1 rounded-lg font-bold border transition-all ${
                  showTranslation
                    ? 'bg-sky-50 text-sky-600 border-sky-300'
                    : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}
                title="Bật/Tắt Dịch"
              >
                Dịch
              </button>
            </div>
          </div>

          {/* Chat Transcript Area */}
          <div className="space-y-3.5 min-h-[350px] max-h-[50vh] p-4 bg-slate-100/60 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-y-auto">
            {messages.map((m, idx) => {
              const isBot = m.role === 'bot';

              return (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${isBot ? 'justify-start' : 'justify-end'}`}
                >
                  {isBot && (
                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      AI
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl space-y-1 shadow-xs ${
                      isBot
                        ? 'bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-tl-none'
                        : 'bg-emerald-500 text-white rounded-tr-none font-semibold'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-base leading-relaxed">{m.text}</p>
                      {isBot && (
                        <button
                          onClick={() => speech.speak(m.text, currentLang, 1.0)}
                          className="p-1 rounded-md text-slate-400 hover:text-purple-600"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {showPinyin && m.pinyin && (
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                        [{m.pinyin}]
                      </p>
                    )}

                    {showTranslation && m.vn && (
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {m.vn}
                      </p>
                    )}
                  </div>

                  {!isBot && (
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      {userProfile.avatar || '👤'}
                    </div>
                  )}
                </div>
              );
            })}

            {isAiResponding && (
              <div className="flex items-center gap-2 text-xs text-slate-400 font-bold p-2">
                <div className="w-3.5 h-3.5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                <span>{activeScenario.role} đang suy nghĩ câu trả lời...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* AI Pedagogical Feedback Card (Below latest turn) */}
          {latestFeedback && (
            <div className="p-3.5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 text-xs space-y-1.5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="font-black text-purple-700 dark:text-purple-300 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Nhận Xét Phản Xạ Của Bạn:</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-black text-[10px]">
                  {latestFeedback.rating || 'Tốt'}
                </span>
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                {latestFeedback.grammarCritique}
              </p>
              {latestFeedback.betterAlternative && (
                <div className="pt-1 text-emerald-700 dark:text-emerald-400 font-bold">
                  💡 Cách nói chuẩn bản xứ hơn: <span className="underline">{latestFeedback.betterAlternative}</span>
                </div>
              )}
            </div>
          )}

          {/* Hint suggestion button */}
          {suggestedHint && (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs animate-in fade-in">
              <div className="flex items-center gap-2 overflow-hidden text-amber-800 dark:text-amber-300">
                <Lightbulb className="w-4 h-4 shrink-0 text-amber-500" />
                <span className="truncate font-semibold">Gợi ý câu: {suggestedHint}</span>
              </div>
              <button
                onClick={handleUseHint}
                className="duo-btn duo-btn-yellow py-1 px-2.5 rounded-lg text-[11px] font-black shrink-0 ml-2"
              >
                Dùng Câu Này
              </button>
            </div>
          )}

          {/* User Input & Mic Action Bar */}
          <div className="duo-card p-3 flex items-center gap-2">
            <button
              onClick={handleMicVoice}
              className={`p-3 rounded-2xl shadow-sm transition-all ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'duo-btn duo-btn-purple text-white'
              }`}
              title="Bấm để nói bằng Micro"
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                isRecording
                  ? 'Đang lắng nghe giọng nói...'
                  : 'Gõ câu trả lời hoặc bấm mic để nói...'
              }
              className="flex-1 bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:border-purple-500"
            />

            <button
              onClick={() => handleSendMessage()}
              disabled={!userInput.trim() || isAiResponding}
              className="duo-btn duo-btn-green p-3 rounded-2xl text-white disabled:opacity-40"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
