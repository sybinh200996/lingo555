import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { speech } from '../../services/speechService';
import { sounds } from '../../services/soundEffects';
import { 
  X, 
  Volume2, 
  CheckCircle2, 
  Sparkles, 
  Trophy, 
  ArrowRight, 
  Zap, 
  Target,
  Award,
  BookOpen
} from 'lucide-react';

// Fisher-Yates algorithm for perfectly distributed option shuffling
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 24 Authentic Chinese Placement Questions (HSK 1 - 6)
const CHINESE_QUESTIONS = {
  1: [ // HSK 1
    {
      id: 'zh_1_1',
      prompt: 'Từ nào sau đây mang nghĩa là "Cảm ơn"?',
      target_text: '谢谢',
      phonetic: 'xièxiè',
      options: ['谢谢', '你好', '再见', '对不起'],
      correct: '谢谢',
      meaning: 'Cảm ơn'
    },
    {
      id: 'zh_1_2',
      prompt: 'Nghe và chọn nghĩa tiếng Việt chính xác:',
      target_text: '我想喝水',
      phonetic: 'wǒ xiǎng hē shuǐ',
      options: ['Tôi muốn uống nước', 'Tôi muốn ăn cơm', 'Tôi thích học tiếng Trung', 'Tôi đi mua đồ'],
      correct: 'Tôi muốn uống nước',
      meaning: 'Tôi muốn uống nước'
    },
    {
      id: 'zh_1_3',
      prompt: 'Điền từ thích hợp vào câu hỏi: "你叫什么____？"',
      target_text: '你叫什么名字？',
      phonetic: 'nǐ jiào shénme míngzì?',
      options: ['名字', '朋友', '老师', '医生'],
      correct: '名字',
      meaning: 'Bạn tên là gì?'
    },
    {
      id: 'zh_1_4',
      prompt: 'Số 8 trong tiếng Trung được viết và đọc là:',
      target_text: '八',
      phonetic: 'bā',
      options: ['八', '六', '四', '十'],
      correct: '八',
      meaning: 'Số 8 (Bát)'
    }
  ],
  2: [ // HSK 2
    {
      id: 'zh_2_1',
      prompt: 'Điền từ thích hợp vào chỗ trống: "今天天气很热，我们____游泳吧。"',
      target_text: '今天天气很热，我们去游泳吧。',
      phonetic: 'jīntiān tiānqì hěn rè, wǒmen qù yóuyǒng ba.',
      options: ['去', '在', '着', '往'],
      correct: '去',
      meaning: 'Hôm nay trời rất nóng, chúng ta đi bơi nhé.'
    },
    {
      id: 'zh_2_2',
      prompt: 'Nghe và chọn câu đối thoại logic nhất với câu hỏi: "你是什么时候来北京的？"',
      target_text: '你是什么时候来北京的？',
      phonetic: 'nǐ shì shénme shíhou lái běijīng de?',
      options: ['我是上个星期来的', '我是坐飞机来的', '北京非常漂亮', '我和朋友一起来的'],
      correct: '我是上个星期来的',
      meaning: 'Tôi đến vào tuần trước'
    },
    {
      id: 'zh_2_3',
      prompt: 'Từ nào mang nghĩa tương đương với "准备" (chuẩn bị, dự định)?',
      target_text: '准备',
      phonetic: 'zhǔnbèi',
      options: ['打算', '忘记', '结束', '跑步'],
      correct: '打算',
      meaning: 'Dự định, chuẩn bị'
    },
    {
      id: 'zh_2_4',
      prompt: 'Dịch câu sau: "这件衣服虽然很漂亮，但是有点儿贵。"',
      target_text: '这件衣服虽然很漂亮，但是有点儿贵。',
      phonetic: 'zhè jiàn yīfu suīrán hěn piàoliang, dànshì yǒudiǎnr guì.',
      options: ['Áo này đẹp nhưng hơi đắt', 'Áo này rẻ nhưng không đẹp', 'Tôi vừa mua chiếc áo này', 'Áo này mặc rất vừa vặn'],
      correct: 'Áo này đẹp nhưng hơi đắt',
      meaning: 'Áo này đẹp nhưng hơi đắt.'
    }
  ],
  3: [ // HSK 3
    {
      id: 'zh_3_1',
      prompt: 'Từ nào đồng nghĩa với "解决" (jiějué - giải quyết)?',
      target_text: '解决问题',
      phonetic: 'jiějué wèntí',
      options: ['处理', '讨论', '出现', '发现'],
      correct: '处理',
      meaning: 'Xử lý, giải quyết vấn đề'
    },
    {
      id: 'zh_3_2',
      prompt: 'Chọn cặp liên từ thích hợp: "他____学习努力，____成绩一直名列前茅。"',
      target_text: '他不仅学习努力，而且成绩一直名列前茅。',
      phonetic: 'tā bùjǐn xuéxí nǔlì, érqiě chéngjì yīzhí mínglièqiánmáo.',
      options: ['不仅...而且...', '虽然...但是...', '宁可...也不...', '哪怕...也...'],
      correct: '不仅...而且...',
      meaning: 'Anh ấy không những chăm học mà còn đạt thành tích cao'
    },
    {
      id: 'zh_3_3',
      prompt: 'Chọn từ điền vào chỗ trống: "我们要学会____压力，保持积极心态。"',
      target_text: '缓解压力',
      phonetic: 'huǎnjiě yālì',
      options: ['缓解', '增加', '破坏', '耽误'],
      correct: '缓解',
      meaning: 'Giải tỏa, xoa dịu áp lực'
    },
    {
      id: 'zh_3_4',
      prompt: '"你先把这本词典还给小李，然后再去图书馆。" Thứ tự hành động là:',
      target_text: '先还词典，再去图书馆',
      phonetic: 'xiān huán cídiǎn, zài qù túshūguǎn',
      options: ['Trả từ điển trước rồi mới đi thư viện', 'Đi thư viện trước rồi mới trả từ điển', 'Mua từ điển ở thư viện', 'Mượn từ điển từ thư viện'],
      correct: 'Trả từ điển trước rồi mới đi thư viện',
      meaning: 'Trả từ điển trước, sau đó đi thư viện'
    }
  ],
  4: [ // HSK 4
    {
      id: 'zh_4_1',
      prompt: 'Chọn từ chuẩn xác: "只要坚持不懈，就一定能____成功。"',
      target_text: '获得成功',
      phonetic: 'huòdé chénggōng',
      options: ['取得', '经过', '适应', '禁止'],
      correct: '取得',
      meaning: 'Giành được / Đạt được thành công'
    },
    {
      id: 'zh_4_2',
      prompt: '"无论遇到多大困难，他都从来没有放弃过。" Câu này thể hiện phẩm chất gì?',
      target_text: '坚持与毅力',
      phonetic: 'jiānchí yǔ yìlì',
      options: ['Kiên trì và nghị lực', 'Khiêm tốn và nhẫn nại', 'Nhiệt tình và cởi mở', 'Tò mò và ham học'],
      correct: 'Kiên trì và nghị lực',
      meaning: 'Dù gặp khó khăn bao nhiêu cũng chưa từng từ bỏ'
    },
    {
      id: 'zh_4_3',
      prompt: 'Chọn từ thích hợp: "这份合同的条款需要双方____签字确认。"',
      target_text: '共同确认',
      phonetic: 'gòngtóng quèrèn',
      options: ['共同', '偶尔', '随便', '稍微'],
      correct: '共同',
      meaning: 'Cùng nhau ký xác nhận'
    },
    {
      id: 'zh_4_4',
      prompt: '"职场经验是靠平时一点一滴____起来的。"',
      target_text: '积累经验',
      phonetic: 'jīlěi jīngyàn',
      options: ['积累', '消费', '浪费', '分散'],
      correct: '积累',
      meaning: 'Tích lũy kinh nghiệm'
    }
  ],
  5: [ // HSK 5
    {
      id: 'zh_5_1',
      prompt: 'Thành ngữ nào mang ý nghĩa "Triển vọng phát triển vô cùng tươi sáng"?',
      target_text: '前途光明',
      phonetic: 'qiántú guāngmíng',
      options: ['前途光明', '半途而废', '纸上谈兵', '井底之蛙'],
      correct: '前途光明',
      meaning: 'Tiền đồ xán lạn, tương lai tươi sáng'
    },
    {
      id: 'zh_5_2',
      prompt: 'Chọn từ chuyên sâu: "这项人工智能技术的突破将极大____生产效率。"',
      target_text: '提升效率',
      phonetic: 'tíshēng xiàolǜ',
      options: ['提升', '阻碍', '抵消', '削弱'],
      correct: '提升',
      meaning: 'Nâng cao / Thúc đẩy hiệu suất'
    },
    {
      id: 'zh_5_3',
      prompt: '"在商业谈判中，保持冷静和敏锐的洞察力至关重要。" Ý câu này nhấn mạnh điều gì?',
      target_text: '冷静与洞察力',
      phonetic: 'lěngjìng yǔ dòngchálì',
      options: ['Sự bình tĩnh và cái nhìn sâu sắc trong đàm phán', 'Cần phải nhượng bộ đối tác nhanh chóng', 'Nên ký kết hợp đồng trong ngày đầu', 'Không cần lắng nghe quan điểm của đối tác'],
      correct: 'Sự bình tĩnh và cái nhìn sâu sắc trong đàm phán',
      meaning: 'Bình tĩnh và nhạy bén quan sát'
    },
    {
      id: 'zh_5_4',
      prompt: 'Chọn từ chuẩn ngữ pháp: "这家企业凭借诚信经营，在市场上树立了良好的____。"',
      target_text: '良好口碑',
      phonetic: 'liánghǎo kǒubēi',
      options: ['口碑', '借口', '圈套', '缺点'],
      correct: '口碑',
      meaning: 'Uy tín / Tiếng thơm trong thị trường'
    }
  ],
  6: [ // HSK 6
    {
      id: 'zh_6_1',
      prompt: 'Thành ngữ nào chỉ năng lực nhìn xa trông rộng, thấu suốt tương lai?',
      target_text: '高瞻远瞩',
      phonetic: 'gāozhān yuǎnzhǔ',
      options: ['高瞻远瞩', '鼠目寸光', '盲人摸象', '刻舟求剑'],
      correct: '高瞻远瞩',
      meaning: 'Tầm nhìn xa trông rộng'
    },
    {
      id: 'zh_6_2',
      prompt: 'Chọn từ thích hợp: "这一创新理论的提出，在学术界引起了轩然____。"',
      target_text: '轩然大波',
      phonetic: 'xuān rán dà bō',
      options: ['大波', '巨浪', '风暴', '震撼'],
      correct: '大波',
      meaning: 'Gây ra làn sóng tranh luận lớn'
    },
    {
      id: 'zh_6_3',
      prompt: '"文学创作贵在独树一帜，切忌千篇一律。" Câu này mang hàm ý gì?',
      target_text: '独树一帜',
      phonetic: 'dú shù yī zhì',
      options: ['Nghệ thuật quý ở phong cách độc đáo riêng biệt', 'Nên sao chép nguyên mẫu từ tiền nhân', 'Tất cả các tác phẩm phải có khuôn mẫu giống nhau', 'Tác phẩm nghệ thuật chỉ cần viết ngắn gọn'],
      correct: 'Nghệ thuật quý ở phong cách độc đáo riêng biệt',
      meaning: 'Tạo phong cách độc đáo riêng'
    },
    {
      id: 'zh_6_4',
      prompt: 'Từ nào đồng nghĩa với "深思熟虑" (suy nghĩ thấu đáo, cẩn trọng)?',
      target_text: '深思熟虑',
      phonetic: 'shēnsī shúlǜ',
      options: ['深谋远虑', '操之过急', '随心所欲', '走马观花'],
      correct: '深谋远虑',
      meaning: 'Cân nhắc kỹ lưỡng, mưu lược sâu rộng'
    }
  ]
};

// 24 Authentic English Placement Questions (A1 - C2)
const ENGLISH_QUESTIONS = {
  1: [ // A1 - Beginner
    {
      id: 'en_1_1',
      prompt: 'Choose the word that means "Bệnh viện":',
      target_text: 'Hospital',
      phonetic: '/ˈhɒspɪtl/',
      options: ['Hospital', 'Library', 'Restaurant', 'Airport'],
      correct: 'Hospital',
      meaning: 'Bệnh viện'
    },
    {
      id: 'en_1_2',
      prompt: 'Complete the sentence: "She ____ to music every evening."',
      target_text: 'She listens to music every evening.',
      phonetic: '/ʃiː ˈlɪsnz tuː ˈmjuːzɪk/',
      options: ['listens', 'listen', 'listening', 'listened'],
      correct: 'listens',
      meaning: 'Cô ấy nghe nhạc mỗi tối.'
    },
    {
      id: 'en_1_3',
      prompt: 'Fill in the blank: "They ____ students from Hanoi."',
      target_text: 'They are students.',
      phonetic: '/ðeɪ ɑːr ˈstjuːdənts/',
      options: ['are', 'is', 'am', 'be'],
      correct: 'are',
      meaning: 'Họ là sinh viên đến từ Hà Nội.'
    },
    {
      id: 'en_1_4',
      prompt: 'What does "Good morning" mean in Vietnamese?',
      target_text: 'Good morning',
      phonetic: '/ɡʊd ˈmɔːnɪŋ/',
      options: ['Chào buổi sáng', 'Chào buổi tối', 'Tạm biệt', 'Hẹn gặp lại'],
      correct: 'Chào buổi sáng',
      meaning: 'Chào buổi sáng'
    }
  ],
  2: [ // A2 - Elementary
    {
      id: 'en_2_1',
      prompt: 'Listen and choose the most natural polite response:',
      target_text: 'Would you mind helping me with this heavy suitcase?',
      phonetic: '/wʊd juː maɪnd ˈhɛlpɪŋ miː/',
      options: ['Not at all, let me give you a hand.', 'Yes, I mind a lot.', 'I am fine, thanks.', 'It is 5 o clock.'],
      correct: 'Not at all, let me give you a hand.',
      meaning: 'Bạn có phiền giúp tôi chiếc vali nặng này không?'
    },
    {
      id: 'en_2_2',
      prompt: 'Choose the correct form: "If it rains tomorrow, we ____ cancel the outdoor picnic."',
      target_text: 'we will cancel the picnic.',
      phonetic: '/wiː wɪl ˈkænsəl/',
      options: ['will', 'would', 'have', 'were'],
      correct: 'will',
      meaning: 'Nếu ngày mai trời mưa, chúng tôi sẽ hủy dã ngoại.'
    },
    {
      id: 'en_2_3',
      prompt: 'What is the past simple form of the verb "buy"?',
      target_text: 'buy -> bought',
      phonetic: '/bɔːt/',
      options: ['bought', 'buyed', 'buying', 'bring'],
      correct: 'bought',
      meaning: 'Đã mua (thì quá khứ đơn)'
    },
    {
      id: 'en_2_4',
      prompt: 'Complete: "He hasn\'t seen his best friend ____ last summer."',
      target_text: 'since last summer.',
      phonetic: '/sɪns lɑːst ˈsʌmər/',
      options: ['since', 'for', 'during', 'while'],
      correct: 'since',
      meaning: 'Anh ấy đã không gặp bạn thân kể từ mùa hè năm ngoái.'
    }
  ],
  3: [ // B1 - Intermediate
    {
      id: 'en_3_1',
      prompt: 'Select the best synonym for "Significant":',
      target_text: 'Significant',
      phonetic: '/sɪɡˈnɪfɪkənt/',
      options: ['Crucial & Important', 'Minor & Tiny', 'Complicated', 'Accidental'],
      correct: 'Crucial & Important',
      meaning: 'Quan trọng, có ý nghĩa lớn'
    },
    {
      id: 'en_3_2',
      prompt: 'Choose the correct tense: "By the time she arrived at the station, the train ____."',
      target_text: 'the train had already departed.',
      phonetic: '/hæd ɔːlˈrɛdi dɪˈpɑːtɪd/',
      options: ['had already departed', 'has departed', 'departs', 'is departing'],
      correct: 'had already departed',
      meaning: 'Khi cô ấy đến ga thì tàu đã rời đi rồi.'
    },
    {
      id: 'en_3_3',
      prompt: 'Fill in the blank: "The company decided to ____ new AI tools to boost efficiency."',
      target_text: 'adopt new AI tools',
      phonetic: '/əˈdɒpt njuː eɪ-aɪ tuːlz/',
      options: ['adopt', 'adapt', 'avoid', 'abolish'],
      correct: 'adopt',
      meaning: 'Áp dụng công nghệ mới'
    },
    {
      id: 'en_3_4',
      prompt: '"She suggested that we ____ early to avoid the peak rush hour."',
      target_text: 'suggested that we leave early',
      phonetic: '/səˈdʒɛstɪd ðæt wiː liːv/',
      options: ['leave', 'leaves', 'left', 'leaving'],
      correct: 'leave',
      meaning: 'Cô ấy đề xuất chúng ta nên rời đi sớm'
    }
  ],
  4: [ // B2 - Upper Intermediate
    {
      id: 'en_4_1',
      prompt: 'Which phrasal verb means "To postpone an event until a later date"?',
      target_text: 'Put off',
      phonetic: '/pʊt ɒf/',
      options: ['Put off', 'Call off', 'Take over', 'Turn down'],
      correct: 'Put off',
      meaning: 'Trì hoãn, hoãn lại'
    },
    {
      id: 'en_4_2',
      prompt: '"The initiative aims to curb greenhouse gas emissions." What does "curb" mean?',
      target_text: 'Curb',
      phonetic: '/kɜːb/',
      options: ['To limit and restrain', 'To increase dramatically', 'To measure accurately', 'To celebrate publicly'],
      correct: 'To limit and restrain',
      meaning: 'Hạn chế, kiềm chế'
    },
    {
      id: 'en_4_3',
      prompt: 'Choose the inverted conditional: "Had I known about the schedule change, I ____ earlier."',
      target_text: 'I would have arrived earlier.',
      phonetic: '/wʊd hæv əˈraɪvd/',
      options: ['would have arrived', 'will arrive', 'had arrived', 'arrived'],
      correct: 'would have arrived',
      meaning: 'Giá như tôi biết về lịch trình, tôi đã đến sớm hơn.'
    },
    {
      id: 'en_4_4',
      prompt: '"His explanation was convincing, ____ some minor discrepancies remained."',
      target_text: 'although some minor discrepancies remained.',
      phonetic: '/ɔːlˈðəʊ/',
      options: ['although', 'despite', 'in spite of', 'because'],
      correct: 'although',
      meaning: 'Mặc dù vẫn còn một vài điểm sai lệch nhỏ.'
    }
  ],
  5: [ // C1 - Advanced
    {
      id: 'en_5_1',
      prompt: 'Select the best synonym for "Ubiquitous":',
      target_text: 'Ubiquitous',
      phonetic: '/juːˈbɪkwɪtəs/',
      options: ['Omnipresent & Everywhere', 'Scarce & Rare', 'Fragile', 'Temporary'],
      correct: 'Omnipresent & Everywhere',
      meaning: 'Phổ biến khắp nơi, có mặt ở mọi nơi'
    },
    {
      id: 'en_5_2',
      prompt: '"The study reveals a profound ____ between lifelong learning and cognitive resilience."',
      target_text: 'profound correlation',
      phonetic: '/prəˈfaʊnd ˌkɒrəˈleɪʃn/',
      options: ['correlation', 'superstition', 'divergence', 'exaggeration'],
      correct: 'correlation',
      meaning: 'Mối tương quan sâu sắc'
    },
    {
      id: 'en_5_3',
      prompt: 'Which English idiom means "To make a bad situation even worse"?',
      target_text: 'Add insult to injury',
      phonetic: '/æd ˈɪnsʌlt tuː ˈɪndʒəri/',
      options: ['Add insult to injury', 'Break the ice', 'Bite the bullet', 'Hit the nail on the head'],
      correct: 'Add insult to injury',
      meaning: 'Thêm dầu vào lửa / Đổ thêm dầu vào bi kịch'
    },
    {
      id: 'en_5_4',
      prompt: 'Inversion sentence: "Little ____ that his breakthrough would disrupt the global tech sector."',
      target_text: 'Little did he suspect',
      phonetic: '/ˈlɪtl dɪd hiː/',
      options: ['did he suspect', 'he suspected', 'he had suspected', 'was he suspecting'],
      correct: 'did he suspect',
      meaning: 'Ít ai ngờ rằng phát kiến của anh ấy sẽ làm thay đổi cả ngành công nghệ.'
    }
  ],
  6: [ // C2 - Proficiency
    {
      id: 'en_6_1',
      prompt: 'Which word means "lasting for only a very short time; transient"?',
      target_text: 'Ephemeral',
      phonetic: '/ɪˈfɛmərəl/',
      options: ['Ephemeral', 'Perennial', 'Incessant', 'Resilient'],
      correct: 'Ephemeral',
      meaning: 'Phù du, chóng tàn, ngắn ngủi'
    },
    {
      id: 'en_6_2',
      prompt: '"His thesis hinges upon a specious argument." What does "specious" signify?',
      target_text: 'Specious',
      phonetic: '/ˈspiːʃəs/',
      options: ['Superficially plausible but actually false', 'Deeply logical and indisputable', 'Clear and concise', 'Emotionally charged'],
      correct: 'Superficially plausible but actually false',
      meaning: 'Ngụy biện, bề ngoài tưởng đúng nhưng thực chất sai'
    },
    {
      id: 'en_6_3',
      prompt: '"The novelist portrays the protagonist with ____ subtlety and nuanced psychological depth."',
      target_text: 'exquisite subtlety',
      phonetic: '/ˈɛkskwɪzɪt ˈsʌtlti/',
      options: ['exquisite', 'obnoxious', 'negligent', 'cumbersome'],
      correct: 'exquisite',
      meaning: 'Tinh tế tuyệt mỹ'
    },
    {
      id: 'en_6_4',
      prompt: 'Complete: "So intricate ____ the legal entanglements that resolution took decades."',
      target_text: 'So intricate were the entanglements',
      phonetic: '/səʊ ˈɪntrɪkət wɜː/',
      options: ['were', 'was', 'did', 'had'],
      correct: 'were',
      meaning: 'Các ràng buộc pháp lý rắc rối đến mức phải mất hàng thập kỷ mới tháo gỡ được.'
    }
  ]
};

export const PlacementTestModal = ({ isOpen, onClose, onPlacementComplete }) => {
  const { currentLang, levels, userProfile, refreshProfile } = useApp();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentTier, setCurrentTier] = useState(2); // Start at Tier 2 (Elementary)
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  // Helper to pick next question adapted to currentTier without repetition
  const pickNextQuestion = useCallback((tier, usedIds) => {
    const questionsPool = currentLang === 'zh' ? CHINESE_QUESTIONS : ENGLISH_QUESTIONS;
    const tierList = questionsPool[tier] || questionsPool[2] || [];
    
    // Find unused questions in current tier
    let available = tierList.filter(q => !usedIds.includes(q.id));
    
    // Fallback: If current tier questions are exhausted, search adjacent tiers
    if (available.length === 0) {
      const allQuestions = Object.values(questionsPool).flat();
      available = allQuestions.filter(q => !usedIds.includes(q.id));
    }
    
    if (available.length === 0) {
      // All 24 exhausted, take from tier list
      return tierList[0];
    }

    const randomPick = available[Math.floor(Math.random() * available.length)];
    return randomPick;
  }, [currentLang]);

  // Reset or initialize test when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setCurrentTier(2);
      setCorrectCount(0);
      setIsCompleted(false);
      setSubmitting(false);
      setConfirmed(false);
      setSelectedOption(null);
      setIsAnswerChecked(false);

      const firstQ = pickNextQuestion(2, []);
      if (firstQ) {
        setCurrentQuestion(firstQ);
        setShuffledOptions(shuffleArray(firstQ.options));
        setUsedQuestionIds([firstQ.id]);
      }
    }
  }, [isOpen, pickNextQuestion]);

  const handleSelectOption = (opt) => {
    if (isAnswerChecked) return;
    sounds.playTap?.();
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswerChecked || !currentQuestion) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedOption === currentQuestion.correct;
    if (isCorrect) {
      sounds.playCorrect?.();
      setCorrectCount(prev => prev + 1);
      // Adaptive tier bump up (max 6)
      if (currentTier < 6) {
        setCurrentTier(prev => prev + 1);
      }
    } else {
      sounds.playWrong?.();
      // Adaptive tier bump down (min 1)
      if (currentTier > 1) {
        setCurrentTier(prev => prev - 1);
      }
    }
  };

  const handleNextQuestion = () => {
    sounds.playTap?.();
    if (currentQuestionIndex + 1 >= 8) {
      // Completed test after 8 adaptive questions
      setIsCompleted(true);
      sounds.playFanfare?.();
      confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    } else {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setIsAnswerChecked(false);

      // Pick next question adapted to new tier with no repeats
      const nextQ = pickNextQuestion(currentTier, usedQuestionIds);
      if (nextQ) {
        setCurrentQuestion(nextQ);
        setShuffledOptions(shuffleArray(nextQ.options));
        setUsedQuestionIds(prev => [...prev, nextQ.id]);
      }
    }
  };

  // Determine targeted level to unlock based on final tier and accuracy
  const calculateResultLevel = useCallback(() => {
    const isEspLevel = (l) => Boolean(
      l?.category === 'esp' ||
      l?.id?.includes('_it') ||
      l?.id?.includes('_accounting') ||
      l?.id?.includes('_office') ||
      l?.id?.includes('_hr') ||
      l?.id?.includes('_logistics') ||
      l?.id?.includes('_medical') ||
      l?.id?.includes('_tourism') ||
      (l?.order_index && l.order_index >= 20)
    );

    const academicLevels = (levels || [])
      .filter(l => l.language_id === currentLang && !isEspLevel(l))
      .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

    if (!academicLevels || academicLevels.length === 0) return null;

    // Academic levels list: [0: Pinyin/IPA, 1: HSK1/A1, 2: HSK2/A2, 3: HSK3/B1, 4: HSK4/B2, 5: HSK5/C1, 6: HSK6/C2]
    // Map currentTier (1 to 6) and correctCount (0 to 8) to appropriate placement
    let targetIndex = 1; // Default to HSK1 / A1
    if (correctCount >= 7 || currentTier >= 5) {
      targetIndex = Math.min(academicLevels.length - 1, 5); // C1 / HSK 5
      if (correctCount === 8 && currentTier === 6 && academicLevels.length > 6) {
        targetIndex = 6; // C2 / HSK 6
      }
    } else if (correctCount >= 5 || currentTier >= 4) {
      targetIndex = Math.min(academicLevels.length - 1, 4); // B2 / HSK 4
    } else if (correctCount >= 4 || currentTier >= 3) {
      targetIndex = Math.min(academicLevels.length - 1, 3); // B1 / HSK 3
    } else if (correctCount >= 2 || currentTier >= 2) {
      targetIndex = Math.min(academicLevels.length - 1, 2); // A2 / HSK 2
    } else {
      targetIndex = 1; // A1 / HSK 1
    }

    return academicLevels[targetIndex] || academicLevels[0];
  }, [levels, currentLang, currentTier, correctCount]);

  const handleApplyPlacement = async () => {
    const targetLevel = calculateResultLevel();
    if (!targetLevel) return;

    setSubmitting(true);
    try {
      sounds.playLevelUp?.();
      const currentUserId = userProfile?.id || 'default_user';
      
      // 1. Sync batch unlock to backend SQLite database
      const res = await api.batchUnlockLevel(targetLevel.id, 100, 50, currentUserId);

      // 2. Persist placement result and rewards to localStorage for immediate offline/guest availability
      try {
        localStorage.setItem('lingo555_placement_level', targetLevel.code);
        const saved = localStorage.getItem('lingo555_user_profile');
        if (saved) {
          const profile = JSON.parse(saved);
          profile.xp = (profile.xp || 0) + 100;
          profile.gems = (profile.gems || 0) + 50;
          profile.placement_level = targetLevel.code;
          localStorage.setItem('lingo555_user_profile', JSON.stringify(profile));
        }
      } catch (e) {
        // ignore localStorage error
      }

      // 3. Dispatch global placement event so SkillTree and Navbar instantly update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('lingo555:placement-completed', {
          detail: { 
            targetLevel,
            xpReward: 100, 
            gemsReward: 50 
          }
        }));
      }

      // 4. Trigger celebration fanfare and refresh profile
      confetti({ particleCount: 200, spread: 90 });
      await refreshProfile?.();

      if (onPlacementComplete) {
        onPlacementComplete(targetLevel);
      }

      setConfirmed(true);

      // 5. Close modal smoothly after confirmation presentation
      setTimeout(() => {
        onClose();
      }, 1600);
    } catch (e) {
      console.warn('Failed to apply placement unlock:', e);
      if (onPlacementComplete) onPlacementComplete(targetLevel);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const resultLevel = calculateResultLevel();
  const optionBadges = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="duo-card max-w-lg w-full p-6 sm:p-8 relative bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black shadow-md">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Bài Test Xếp Lớp Thích Ứng
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                Câu {Math.min(8, currentQuestionIndex + 1)} / 8 • Thử thách Cấp độ {currentTier}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / 8) * 100}%` }}
          />
        </div>

        {/* Test Body or Completion Screen */}
        {!isCompleted ? (
          currentQuestion && (
            <div className="space-y-6">
              {/* Question prompt */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  <span>Câu hỏi thích ứng • Độ khó Tier {currentTier}</span>
                </span>
                <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-snug">
                  {currentQuestion.prompt}
                </h4>
              </div>

              {/* Target phrase card with audio */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white truncate">
                    {currentQuestion.target_text}
                  </div>
                  {currentQuestion.phonetic && (
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                      [{currentQuestion.phonetic}]
                    </div>
                  )}
                </div>
                <button
                  onClick={() => speech.speak(currentQuestion.target_text, currentLang, 1.0)}
                  className="duo-btn duo-btn-blue p-3 rounded-2xl shadow-sm shrink-0"
                  title="Nghe phát âm chuẩn"
                >
                  <Volume2 className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Multiple Choice Options (Dynamically Shuffled) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {shuffledOptions.map((opt, i) => {
                  let btnStyle = 'duo-card p-3.5 sm:p-4 text-left font-bold text-sm transition-all border-2 flex items-center gap-3 ';
                  let badgeStyle = 'w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ';
                  
                  if (!isAnswerChecked) {
                    if (selectedOption === opt) {
                      btnStyle += 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-200 shadow-sm';
                      badgeStyle += 'bg-sky-500 text-white';
                    } else {
                      btnStyle += 'border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800';
                      badgeStyle += 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';
                    }
                  } else {
                    if (opt === currentQuestion.correct) {
                      btnStyle += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200';
                      badgeStyle += 'bg-emerald-500 text-white';
                    } else if (selectedOption === opt) {
                      btnStyle += 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
                      badgeStyle += 'bg-rose-500 text-white';
                    } else {
                      btnStyle += 'border-slate-200 dark:border-slate-700 text-slate-400 opacity-50 bg-white dark:bg-slate-800';
                      badgeStyle += 'bg-slate-100 dark:bg-slate-700 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelectOption(opt)}
                      className={btnStyle}
                    >
                      <span className={badgeStyle}>
                        {optionBadges[i]}
                      </span>
                      <span className="flex-1 leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Actions */}
              <div className="pt-2">
                {!isAnswerChecked ? (
                  <button
                    onClick={handleCheckAnswer}
                    disabled={!selectedOption}
                    className="w-full duo-btn duo-btn-green py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider disabled:opacity-50"
                  >
                    Kiểm tra đáp án
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full duo-btn duo-btn-blue py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Câu kế tiếp</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          )
        ) : (
          /* Completion Screen with Unlock CTA */
          <div className="space-y-6 text-center animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
              <Trophy className="w-10 h-10 fill-amber-500" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Chúc mừng bạn đã hoàn thành bài test!
              </h3>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                Độ chính xác: Đúng {correctCount}/8 câu hỏi thích ứng.
              </p>
            </div>

            {/* Estimated Level Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-sky-500/10 to-amber-500/10 border-2 border-emerald-500/50 text-left space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>Xếp lớp chính thức</span>
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-500 text-white shadow-xs">
                  {resultLevel?.code || 'ĐẠT CHUẨN'}
                </span>
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white">
                  {resultLevel?.title || 'Cấp độ đề xuất'}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {resultLevel?.subtitle || 'Mở khóa toàn bộ các bài học trước đó và tiến thẳng vào chặng đường học tập này!'}
                </p>
              </div>
              <div className="pt-2 border-t border-emerald-500/20 flex flex-wrap items-center gap-3 text-xs font-black text-amber-600 dark:text-amber-400">
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60">🎁 Thưởng +100 XP</span>
                <span className="px-2.5 py-1 rounded-lg bg-sky-100 dark:bg-sky-950/60">💎 +50 Đá Quý</span>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60">🔓 Mở khóa trước</span>
              </div>
            </div>

            {/* Confirmation Banner Feedback */}
            {confirmed ? (
              <div className="p-4 rounded-2xl bg-emerald-500 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg animate-in zoom-in-95">
                <Sparkles className="w-6 h-6 animate-spin" />
                <span>Đã xác nhận xếp lớp! Đang chuyển trang...</span>
              </div>
            ) : (
              /* Apply Button */
              <button
                onClick={handleApplyPlacement}
                disabled={submitting}
                className="w-full duo-btn duo-btn-green py-4 rounded-2xl font-black text-base uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <Sparkles className="w-5 h-5" />
                <span>{submitting ? 'Đang kích hoạt xếp lớp...' : 'Xác nhận xếp lớp & Bắt đầu học ngay'}</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
