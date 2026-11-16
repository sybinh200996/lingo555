const db = require('./database');

function seedPracticalTopics() {
  console.log('🌱 [Practical Curriculum] Seeding 6 Real-World Practical Topics for ZH and EN...');

  // 1. Ensure levels exist in SQLite
  const insertLevel = db.prepare(`
    INSERT INTO levels (id, language_id, code, title, subtitle, color, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      subtitle = excluded.subtitle,
      color = excluded.color,
      order_index = excluded.order_index
  `);

  insertLevel.run(
    'zh_practical',
    'zh',
    'THỰC CHIẾN',
    'Tiếng Trung Thực Chiến Đời Sống',
    'Phản xạ giao tiếp đời sống, nhà hàng, du lịch, công sở, công nghệ và y tế',
    '#059669',
    8
  );

  insertLevel.run(
    'en_practical',
    'en',
    'THỰC CHIẾN',
    'English Real-World Mastery (Thực Chiến)',
    'Daily chitchat, dining, travel, business negotiations, IT workflows & medical emergencies',
    '#059669',
    8
  );

  const insertUnit = db.prepare(`
    INSERT INTO units (id, level_id, unit_number, title, description, icon, banner_color)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      description = excluded.description,
      icon = excluded.icon,
      banner_color = excluded.banner_color
  `);

  const insertLesson = db.prepare(`
    INSERT INTO lessons (id, unit_id, lesson_number, title, description, xp_reward)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      title = excluded.title,
      description = excluded.description,
      xp_reward = excluded.xp_reward
  `);

  const insertExercise = db.prepare(`
    INSERT INTO exercises (id, lesson_id, type, prompt, target_text, target_audio_text, phonetic, vietnamese_meaning, options_json, correct_answer, hint, stroke_char, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      type = excluded.type,
      prompt = excluded.prompt,
      target_text = excluded.target_text,
      target_audio_text = excluded.target_audio_text,
      phonetic = excluded.phonetic,
      vietnamese_meaning = excluded.vietnamese_meaning,
      options_json = excluded.options_json,
      correct_answer = excluded.correct_answer,
      hint = excluded.hint,
      stroke_char = excluded.stroke_char,
      order_index = excluded.order_index
  `);

  // Definition of the 6 Real-World Practical Topics
  const TOPICS = [
    {
      num: 1,
      id_zh: 'zh_pract_u1',
      id_en: 'en_pract_u1',
      title_zh: 'Chủ Đề 1: Phản Xạ Giao Tiếp Đời Sống & Xã Giao Tự Nhiên',
      desc_zh: 'Chào hỏi, bắt chuyện, khen ngợi tự nhiên, từ chối khéo léo như người bản xứ',
      title_en: 'Topic 1: Real-World Social Reflexes & Daily Small Talk',
      desc_en: 'Mastering greetings, compliments, polite refusals, and casual conversations',
      lessons_zh: [
        {
          id: 'zh_p1_l1',
          title: 'Chào hỏi & Bắt chuyện tự nhiên',
          desc: 'Cách hỏi thăm và mở đầu câu chuyện thân mật',
          exercises: [
            {
              id: 'zh_p1_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Khởi động cụm từ cốt lõi:',
              target_text: '好久不见',
              phonetic: 'hǎojiǔ bùjiàn',
              vietnamese_meaning: 'Đã lâu không gặp',
              correct_answer: '好久不见',
              options: {
                collocations: ['好久不见，最近忙什么？', '真的好久不见了！'],
                example: { target: '好久不见，你最近身体怎么样？', phonetic: 'hǎojiǔ bùjiàn, nǐ zuìjìn shēntǐ zěnmeyàng?', meaning: 'Đã lâu không gặp, dạo này sức khỏe bạn thế nào?' },
                pragmatic_tip: 'Dùng khi gặp lại bạn bè, đồng nghiệp quen biết sau một thời gian dài, tạo cảm giác thân thiết ấm áp.'
              }
            },
            {
              id: 'zh_p1_l1_e2',
              type: 'sentence_builder',
              prompt: 'Sắp xếp các từ thành câu hỏi thăm tự nhiên:',
              target_text: '好久不见 ， 你 最近 忙 什么 呢 ？',
              vietnamese_meaning: 'Đã lâu không gặp, dạo này bạn bận gì thế?',
              correct_answer: '好久不见 ， 你 最近 忙 什么 呢 ？',
              options: ['好久不见', '，', '你', '最近', '忙', '什么', '呢', '？', '去', '吃']
            },
            {
              id: 'zh_p1_l1_e3',
              type: 'cloze_context',
              prompt: 'Điền cụm từ phù hợp vào chỗ trống:',
              target_text: '今天天气真好，[___]一起去公园散散步？',
              target_audio_text: '今天天气真好，要不要一起去公园散散步？',
              vietnamese_meaning: 'Hôm nay trời đẹp thật, có muốn cùng đi dạo công viên không?',
              correct_answer: '要不要',
              options: ['要不要', '能不能', '算不算', '会不会']
            },
            {
              id: 'zh_p1_l1_e4',
              type: 'mini_roleplay',
              prompt: 'Đáp lại lời chào hỏi của đồng nghiệp:',
              target_text: '好久不见，你今天看起来精神真棒！',
              vietnamese_meaning: 'Đã lâu không gặp, hôm nay trông bạn nhiều năng lượng thế!',
              correct_answer: '谢谢夸奖，你今天气色也非常好！',
              options: ['谢谢夸奖，你今天气色也非常好！', '我不喜欢喝水。', '去北京坐火车。', '没有发票。']
            }
          ]
        },
        {
          id: 'zh_p1_l2',
          title: 'Nghệ thuật từ chối khéo léo',
          desc: 'Từ chối lời mời hoặc nhờ vả mà không làm mất lòng đối phương',
          exercises: [
            {
              id: 'zh_p1_l2_e1',
              type: 'flashcard_chunk',
              prompt: 'Cụm từ từ chối khéo léo:',
              target_text: '真不巧',
              phonetic: 'zhēn bù qiǎo',
              vietnamese_meaning: 'Thật không may / Thật tiếc quá',
              correct_answer: '真不巧',
              options: {
                collocations: ['真不巧，我周末有事', '今天真不巧'],
                example: { target: '真不巧，我今晚已经约了朋友，改天我请你！', phonetic: 'zhēn bù qiǎo, wǒ jīnwǎn yǐjīng yuē le péngyou, gǎitiān wǒ qǐng nǐ!', meaning: 'Thật tiếc quá, tối nay tôi có hẹn với bạn rồi, hôm khác tôi mời bạn nhé!' },
                pragmatic_tip: 'Người bản xứ luôn dùng "真不巧" trước khi đưa ra lý do để đối phương không bị hụt hẫng.'
              }
            },
            {
              id: 'zh_p1_l2_e2',
              type: 'audio_dictation',
              prompt: 'Nghe và gõ lại câu từ chối lịch sự:',
              target_text: '改天我请你吃饭',
              target_audio_text: '改天我请你吃饭',
              phonetic: 'gǎitiān wǒ qǐng nǐ chīfàn',
              vietnamese_meaning: 'Hôm khác tôi mời bạn ăn cơm nhé',
              correct_answer: '改天我请你吃饭',
              options: []
            },
            {
              id: 'zh_p1_l2_e3',
              type: 'matching_pairs',
              prompt: 'Ghép cặp câu giao tiếp và nghĩa tương ứng:',
              target_text: 'Giao tiếp đời sống',
              vietnamese_meaning: 'Nối các cặp từ',
              correct_answer: 'matched',
              options: {
                pairs: [
                  { left: '好久不见', right: 'Đã lâu không gặp' },
                  { left: '真不巧', right: 'Thật không may' },
                  { left: '改天', right: 'Hôm khác / Dịp khác' },
                  { left: '多亏了你', right: 'May mà có bạn' }
                ]
              }
            }
          ]
        }
      ],
      lessons_en: [
        {
          id: 'en_p1_l1',
          title: 'Daily Small Talk & Warm Greetings',
          desc: 'How to strike up casual and engaging conversations',
          exercises: [
            {
              id: 'en_p1_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Master this essential social chunk:',
              target_text: 'Long time no see',
              phonetic: '/lɒŋ taɪm nəʊ siː/',
              vietnamese_meaning: 'Đã lâu không gặp',
              correct_answer: 'Long time no see',
              options: {
                collocations: ['Long time no see, how have you been?', 'Hey stranger, long time no see!'],
                example: { target: 'Long time no see! How is the new project treating you?', phonetic: '/lɒŋ taɪm nəʊ siː/', meaning: 'Đã lâu không gặp! Dự án mới dạo này thế nào rồi?' },
                pragmatic_tip: 'Commonly used in both casual workplace and friendly encounters.'
              }
            },
            {
              id: 'en_p1_l1_e2',
              type: 'sentence_builder',
              prompt: 'Assemble the words into a natural follow-up:',
              target_text: 'How have you been holding up lately ?',
              vietnamese_meaning: 'Dạo này bạn vẫn xoay xở ổn thỏa chứ?',
              correct_answer: 'How have you been holding up lately ?',
              options: ['How', 'have', 'you', 'been', 'holding', 'up', 'lately', '?', 'is', 'did']
            },
            {
              id: 'en_p1_l1_e3',
              type: 'mini_roleplay',
              prompt: 'Respond to your colleague warmly:',
              target_text: 'It is so great running into you here!',
              vietnamese_meaning: 'Thật tuyệt khi tình cờ gặp bạn ở đây!',
              correct_answer: 'Same here! We definitely need to catch up over coffee soon.',
              options: [
                'Same here! We definitely need to catch up over coffee soon.',
                'The passport is expired.',
                'I want to cancel the ticket.',
                'It is 5 dollars.'
              ]
            }
          ]
        },
        {
          id: 'en_p1_l2',
          title: 'Declining Invitations with Tact',
          desc: 'How to say no politely without hurting relationships',
          exercises: [
            {
              id: 'en_p1_l2_e1',
              type: 'flashcard_chunk',
              prompt: 'Polite refusal idiom:',
              target_text: 'Take a rain check',
              phonetic: '/teɪk ə reɪn tʃɛk/',
              vietnamese_meaning: 'Hẹn dịp khác / Khất lại lần sau',
              correct_answer: 'Take a rain check',
              options: {
                collocations: ['Can I take a rain check?', 'I have to take a rain check this time.'],
                example: { target: 'I would love to grab dinner, but can I take a rain check?', phonetic: '/teɪk ə reɪn tʃɛk/', meaning: 'Tôi rất muốn đi ăn tối, nhưng cho tôi khất dịp khác được không?' },
                pragmatic_tip: 'A universally accepted polite way to decline an invitation while signaling future interest.'
              }
            },
            {
              id: 'en_p1_l2_e2',
              type: 'audio_dictation',
              prompt: 'Listen and write down the polite response:',
              target_text: 'I have a prior commitment tonight',
              target_audio_text: 'I have a prior commitment tonight',
              phonetic: '/aɪ hæv ə ˈpraɪər kəˈmɪtmənt/',
              vietnamese_meaning: 'Tối nay tôi đã có lịch hẹn trước rồi',
              correct_answer: 'I have a prior commitment tonight',
              options: []
            },
            {
              id: 'en_p1_l2_e3',
              type: 'matching_pairs',
              prompt: 'Match English social phrases with meanings:',
              target_text: 'Social reflexes matching',
              vietnamese_meaning: 'Ghép cặp câu',
              correct_answer: 'matched',
              options: {
                pairs: [
                  { left: 'Long time no see', right: 'Đã lâu không gặp' },
                  { left: 'Take a rain check', right: 'Khất lại dịp khác' },
                  { left: 'Prior commitment', right: 'Lịch hẹn trước' },
                  { left: 'Catch up soon', right: 'Sớm gặp nhau tâm sự' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      num: 2,
      id_zh: 'zh_pract_u2',
      id_en: 'en_pract_u2',
      title_zh: 'Chủ Đề 2: Ẩm Thực, Nhà Hàng & Gọi Món Thực Tế',
      desc_zh: 'Đặt bàn, gọi món, dặn dò dị ứng/giảm cay, yêu cầu hóa đơn và thanh toán',
      title_en: 'Topic 2: Dining Out, Restaurant & Cafe Situations',
      desc_en: 'Table reservations, dietary preferences, ordering coffee, and paying the bill',
      lessons_zh: [
        {
          id: 'zh_p2_l1',
          title: 'Đặt bàn & Dặn dò khẩu vị món ăn',
          desc: 'Cách báo dị ứng thực phẩm và yêu cầu giảm gia vị',
          exercises: [
            {
              id: 'zh_p2_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Cụm từ dặn dò khẩu vị quan trọng:',
              target_text: '对...过敏',
              phonetic: 'duì... guòmǐn',
              vietnamese_meaning: 'Dị ứng với...',
              correct_answer: '对...过敏',
              options: {
                collocations: ['我对花生过敏', '我对海鲜过敏', '千万不要放...'],
                example: { target: '服务员，请千万别放花生，我对花生严重过敏。', phonetic: 'fúwùyuán, qǐng qiānwàn bié fàng huāshēng, wǒ duì huāshēng yánzhòng guòmǐn.', meaning: 'Phục vụ ơi, tuyệt đối đừng cho lạc, tôi bị dị ứng lạc rất nặng.' },
                pragmatic_tip: 'Ở Trung Quốc khi ăn lẩu hoặc các món Tứ Xuyên, hãy luôn nói trước "微辣" (cay nhẹ) hoặc "免辣" (không cay).'
              }
            },
            {
              id: 'zh_p2_l1_e2',
              type: 'sentence_builder',
              prompt: 'Sắp xếp câu yêu cầu bớt cay:',
              target_text: '麻烦 帮 我 菜 里 少 放 点 辣椒 。',
              vietnamese_meaning: 'Phiền bạn cho ít ớt vào thức ăn giúp tôi.',
              correct_answer: '麻烦 帮 我 菜 里 少 放 点 辣椒 。',
              options: ['麻烦', '帮', '我', '菜', '里', '少', '放', '点', '辣椒', '。', '茶', '买单']
            },
            {
              id: 'zh_p2_l1_e3',
              type: 'mini_roleplay',
              prompt: 'Phục vụ hỏi về độ cay món ăn:',
              target_text: '您好，这份麻婆豆腐需要正常辣还是微辣？',
              vietnamese_meaning: 'Chào anh, món đậu phụ Ma Bà này lấy cay vừa hay cay nhẹ ạ?',
              correct_answer: '请帮我做微辣，少放一点花椒，谢谢！',
              options: [
                '请帮我做微辣，少放一点花椒，谢谢！',
                '今天天气真热。',
                '我要买一张火车票。',
                '这是我的身份证。'
              ]
            }
          ]
        },
        {
          id: 'zh_p2_l2',
          title: 'Thanh toán & Xuất hóa đơn',
          desc: 'Cách gọi tính tiền, quẹt thẻ và lấy hóa đơn điện tử',
          exercises: [
            {
              id: 'zh_p2_l2_e1',
              type: 'audio_dictation',
              prompt: 'Nghe và gõ lại câu thanh toán thông dụng:',
              target_text: '服务员买单可以开增值税发票吗',
              target_audio_text: '服务员买单，可以开增值税发票吗？',
              phonetic: 'fúwùyuán mǎidān, kěyǐ kāi zēngzhíshuì fāpiào ma?',
              vietnamese_meaning: 'Phục vụ ơi tính tiền, có xuất hóa đơn VAT được không?',
              correct_answer: '服务员买单可以开增值税发票吗',
              options: []
            },
            {
              id: 'zh_p2_l2_e2',
              type: 'matching_pairs',
              prompt: 'Ghép từ vựng nhà hàng:',
              target_text: 'Từ vựng ẩm thực',
              vietnamese_meaning: 'Ghép cặp',
              correct_answer: 'matched',
              options: {
                pairs: [
                  { left: '买单', right: 'Thanh toán' },
                  { left: '开发票', right: 'Xuất hóa đơn' },
                  { left: '微辣', right: 'Cay nhẹ' },
                  { left: '靠窗位置', right: 'Chỗ gần cửa sổ' }
                ]
              }
            }
          ]
        }
      ],
      lessons_en: [
        {
          id: 'en_p2_l1',
          title: 'Ordering Food & Dietary Preferences',
          desc: 'Specifying allergies, dressings, and special requests',
          exercises: [
            {
              id: 'en_p2_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Crucial dining request chunk:',
              target_text: 'On the side',
              phonetic: '/ɒn ðə saɪd/',
              vietnamese_meaning: 'Để riêng sang một bên (nước sốt/gia vị)',
              correct_answer: 'On the side',
              options: {
                collocations: ['Dressing on the side', 'Sauce on the side'],
                example: { target: 'Could I get the salad with olive oil dressing on the side?', phonetic: '/ɒn ðə saɪd/', meaning: 'Cho tôi món salad với sốt dầu ô liu để riêng sang một bên được không?' },
                pragmatic_tip: 'Commonly requested in US/UK dining to control calorie intake or flavor intensity.'
              }
            },
            {
              id: 'en_p2_l1_e2',
              type: 'sentence_builder',
              prompt: 'Assemble the dietary restriction sentence:',
              target_text: 'I am severely allergic to peanuts and tree nuts .',
              vietnamese_meaning: 'Tôi bị dị ứng rất nặng với lạc và hạt cây.',
              correct_answer: 'I am severely allergic to peanuts and tree nuts .',
              options: ['I', 'am', 'severely', 'allergic', 'to', 'peanuts', 'and', 'tree', 'nuts', '.', 'at', 'with']
            },
            {
              id: 'en_p2_l1_e3',
              type: 'mini_roleplay',
              prompt: 'The server asks how you would like your steak:',
              target_text: 'How would you like your ribeye steak prepared tonight?',
              vietnamese_meaning: 'Anh muốn món bít tết sườn bò của mình làm chín ở mức nào?',
              correct_answer: 'Medium-rare, please, with roasted garlic mashed potatoes.',
              options: [
                'Medium-rare, please, with roasted garlic mashed potatoes.',
                'The flight is delayed.',
                'I lost my keys.',
                'It is too crowded.'
              ]
            }
          ]
        },
        {
          id: 'en_p2_l2',
          title: 'Splitting the Bill & Tipping',
          desc: 'How to ask for separate checks and tip appropriately',
          exercises: [
            {
              id: 'en_p2_l2_e1',
              type: 'audio_dictation',
              prompt: 'Listen and transcribe the check request:',
              target_text: 'Could we get separate checks please',
              target_audio_text: 'Could we get separate checks, please?',
              phonetic: '/kʊd wiː ɡɛt ˈsɛprət tʃɛks/',
              vietnamese_meaning: 'Chúng tôi có thể chia hóa đơn riêng được không?',
              correct_answer: 'Could we get separate checks please',
              options: []
            },
            {
              id: 'en_p2_l2_e2',
              type: 'matching_pairs',
              prompt: 'Match dining expressions:',
              target_text: 'Restaurant expressions',
              vietnamese_meaning: 'Ghép cụm từ',
              correct_answer: 'matched',
              options: {
                pairs: [
                  { left: 'Separate checks', right: 'Chia hóa đơn riêng' },
                  { left: 'On the side', right: 'Để riêng sang bên' },
                  { left: 'Severely allergic', right: 'Dị ứng nặng' },
                  { left: 'Keep the change', right: 'Khỏi cần trả lại tiền thừa' }
                ]
              }
            }
          ]
        }
      ]
    },
    {
      num: 3,
      id_zh: 'zh_pract_u3',
      id_en: 'en_pract_u3',
      title_zh: 'Chủ Đề 3: Du Lịch Thực Chiến: Sân Bay, Khách Sạn & Hỏi Đường',
      desc_zh: 'Làm thủ tục lên máy bay, xử lý thất lạc hành lý, nhận phòng khách sạn và hỏi đường',
      title_en: 'Topic 3: Practical Travel: Airport, Hotels & Navigating',
      desc_en: 'Flight check-in, baggage claim issues, hotel reservations, and asking directions',
      lessons_zh: [
        {
          id: 'zh_p3_l1',
          title: 'Thủ tục Sân bay & Chọn chỗ ngồi',
          desc: 'Cách làm thủ tục check-in và gửi hành lý',
          exercises: [
            {
              id: 'zh_p3_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Cụm từ chọn vị trí trên máy bay:',
              target_text: '靠走道的座位',
              phonetic: 'kào zǒudào de zuòwèi',
              vietnamese_meaning: 'Chỗ ngồi cạnh lối đi',
              correct_answer: '靠走道的座位',
              options: {
                collocations: ['靠走道的座位', '靠窗的座位'],
                example: { target: '请问能帮我安排一个靠走道的座位吗？', phonetic: 'qǐngwèn néng bāng wǒ ānpái yí ge kào zǒudào de zuòwèi ma?', meaning: 'Có thể xếp cho tôi một chỗ cạnh lối đi được không?' },
                pragmatic_tip: 'Người hay đi vệ sinh hoặc chân dài thường chọn "靠走道" (lối đi); người thích ngắm cảnh chọn "靠窗" (cửa sổ).'
              }
            },
            {
              id: 'zh_p3_l1_e2',
              type: 'sentence_builder',
              prompt: 'Sắp xếp câu khai báo thất lạc hành lý:',
              target_text: '我 的 行李箱 好像 没有 随机 到达 。',
              vietnamese_meaning: 'Vali của tôi dường như không đến cùng chuyến bay.',
              correct_answer: '我 的 行李箱 好像 没有 随机 到达 。',
              options: ['我', '的', '行李箱', '好像', '没有', '随机', '到达', '。', '吃', '买']
            }
          ]
        }
      ],
      lessons_en: [
        {
          id: 'en_p3_l1',
          title: 'Airport Check-in & Baggage Claims',
          desc: 'Boarding passes, luggage allowances, and transit questions',
          exercises: [
            {
              id: 'en_p3_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Aviation travel chunk:',
              target_text: 'Aisle seat',
              phonetic: '/aɪl siːt/',
              vietnamese_meaning: 'Ghế cạnh lối đi',
              correct_answer: 'Aisle seat',
              options: {
                collocations: ['Aisle seat or window seat', 'Book an aisle seat'],
                example: { target: 'Could you arrange an aisle seat near the front of the aircraft?', phonetic: '/aɪl siːt/', meaning: 'Xếp giúp tôi ghế cạnh lối đi gần phía trước máy bay được không?' },
                pragmatic_tip: 'Note that the "s" in "aisle" is completely silent (/aɪl/).'
              }
            },
            {
              id: 'en_p3_l1_e2',
              type: 'sentence_builder',
              prompt: 'Assemble the baggage claim inquiry:',
              target_text: 'My suitcase did not show up on the carousel .',
              vietnamese_meaning: 'Vali của tôi không xuất hiện trên băng chuyền hành lý.',
              correct_answer: 'My suitcase did not show up on the carousel .',
              options: ['My', 'suitcase', 'did', 'not', 'show', 'up', 'on', 'the', 'carousel', '.', 'at', 'car']
            }
          ]
        }
      ]
    },
    {
      num: 4,
      id_zh: 'zh_pract_u4',
      id_en: 'en_pract_u4',
      title_zh: 'Chủ Đề 4: Giao Tiếp Công Sở, Họp Hành & Đàm Phán',
      desc_zh: 'Báo cáo tiến độ, phát biểu trong cuộc họp, đàm phán hợp đồng và viết email chuyên nghiệp',
      title_en: 'Topic 4: Workplace Communication & Professional Meetings',
      desc_en: 'Status reporting, negotiations, professional emails, and meeting discussions',
      lessons_zh: [
        {
          id: 'zh_p4_l1',
          title: 'Báo cáo tiến độ & Họp dự án',
          desc: 'Cách báo cáo công việc và đề xuất giải pháp',
          exercises: [
            {
              id: 'zh_p4_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Cụm từ tiến độ dự án chuyên nghiệp:',
              target_text: '按计划推进',
              phonetic: 'àn jìhuà tuījìn',
              vietnamese_meaning: 'Đang tiến triển đúng theo kế hoạch',
              correct_answer: '按计划推进',
              options: {
                collocations: ['一切按计划推进', '推进项目进度'],
                example: { target: '目前核心开发工作正按计划推进，预计周五前交付。', phonetic: 'mùqián héxīn kāifā gōngzuò zhèng àn jìhuà tuījìn...', meaning: 'Hiện công việc phát triển cốt lõi đang tiến triển đúng kế hoạch, dự kiến bàn giao trước thứ Sáu.' },
                pragmatic_tip: 'Cụm từ chuẩn mực trong các báo cáo tuần (周报) của doanh nghiệp Trung Quốc.'
              }
            },
            {
              id: 'zh_p4_l1_e2',
              type: 'sentence_builder',
              prompt: 'Sắp xếp câu đàm phán điều khoản hợp đồng:',
              target_text: '双方 需要 共同 确认 最终 付款 方式 。',
              vietnamese_meaning: 'Hai bên cần cùng nhau xác nhận phương thức thanh toán cuối cùng.',
              correct_answer: '双方 需要 共同 确认 最终 付款 方式 。',
              options: ['双方', '需要', '共同', '确认', '最终', '付款', '方式', '。', '吃饭', '去']
            }
          ]
        }
      ],
      lessons_en: [
        {
          id: 'en_p4_l1',
          title: 'Project Status Updates & Agile Meetings',
          desc: 'Delivering crisp progress reports and highlighting blockers',
          exercises: [
            {
              id: 'en_p4_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Professional workplace status chunk:',
              target_text: 'On track',
              phonetic: '/ɒn træk/',
              vietnamese_meaning: 'Đúng tiến độ / Diễn ra thuận lợi theo kế hoạch',
              correct_answer: 'On track',
              options: {
                collocations: ['We are on track for the release', 'Back on track'],
                example: { target: 'Everything is on track for our product deployment this Friday.', phonetic: '/ɒn træk/', meaning: 'Mọi việc đang diễn ra đúng tiến độ để triển khai sản phẩm vào thứ Sáu này.' },
                pragmatic_tip: 'The standard idiom used across global tech and finance companies.'
              }
            },
            {
              id: 'en_p4_l1_e2',
              type: 'sentence_builder',
              prompt: 'Assemble the meeting consensus sentence:',
              target_text: 'Let us align on the core deliverables before the deadline .',
              vietnamese_meaning: 'Chúng ta hãy thống nhất các hạng mục bàn giao cốt lõi trước hạn chót.',
              correct_answer: 'Let us align on the core deliverables before the deadline .',
              options: ['Let', 'us', 'align', 'on', 'the', 'core', 'deliverables', 'before', 'the', 'deadline', '.', 'did', 'do']
            }
          ]
        }
      ]
    },
    {
      num: 5,
      id_zh: 'zh_pract_u5',
      id_en: 'en_pract_u5',
      title_zh: 'Chủ Đề 5: Công Nghệ, Kỹ Thuật & Xử Lý Sự Cố IT',
      desc_zh: 'Mô tả lỗi hệ thống, CPU quá tải, rò rỉ bộ nhớ, bảo mật và ứng dụng AI',
      title_en: 'Topic 5: Technology, IT Troubleshooting & AI Workflows',
      desc_en: 'Describing system outages, memory leaks, security, and AI integrations',
      lessons_zh: [
        {
          id: 'zh_p5_l1',
          title: 'Mô tả sự cố máy chủ & Bug phần mềm',
          desc: 'Cách báo cáo lỗi kỹ thuật và đề xuất vá lỗi',
          exercises: [
            {
              id: 'zh_p5_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Thuật ngữ kỹ thuật IT quan trọng:',
              target_text: '内存泄漏',
              phonetic: 'nèicún xièlòu',
              vietnamese_meaning: 'Rò rỉ bộ nhớ (Memory Leak)',
              correct_answer: '内存泄漏',
              options: {
                collocations: ['排查内存泄漏', '引起内存泄漏'],
                example: { target: '后台服务出现了严重的内存泄漏，需要立即排查。', phonetic: 'hòutái fúwù chūxiàn le yánzhòng de nèicún xièlòu...', meaning: 'Dịch vụ backend xuất hiện rò rỉ bộ nhớ nghiêm trọng, cần điều tra ngay.' },
                pragmatic_tip: 'Dùng hàng ngày trong các buổi họp Daily Scrum hoặc Tech Talk của các công ty công nghệ.'
              }
            },
            {
              id: 'zh_p5_l1_e2',
              type: 'sentence_builder',
              prompt: 'Sắp xếp câu xử lý sự cố server:',
              target_text: '重启 服务 之后 系统 恢复 了 正常 运行 。',
              vietnamese_meaning: 'Sau khi khởi động lại dịch vụ hệ thống đã khôi phục hoạt động bình thường.',
              correct_answer: '重启 服务 之后 系统 恢复 了 正常 运行 。',
              options: ['重启', '服务', '之后', '系统', '恢复', '了', '正常', '运行', '。', '吃', '去']
            }
          ]
        }
      ],
      lessons_en: [
        {
          id: 'en_p5_l1',
          title: 'Incident Response & Bug Triage',
          desc: 'Technical terminology for uptime, latency, and debugging',
          exercises: [
            {
              id: 'en_p5_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Crucial software engineering chunk:',
              target_text: 'Bottleneck',
              phonetic: '/ˈbɒtlnek/',
              vietnamese_meaning: 'Điểm nghẽn hiệu năng',
              correct_answer: 'Bottleneck',
              options: {
                collocations: ['Performance bottleneck', 'Identify the bottleneck'],
                example: { target: 'The database connection pool is the primary bottleneck slowing down response times.', phonetic: '/ˈbɒtlnek/', meaning: 'Hồ chứa kết nối cơ sở dữ liệu là điểm nghẽn chính làm chậm thời gian phản hồi.' },
                pragmatic_tip: 'Essential when discussing cloud architecture, latency, and system scaling.'
              }
            },
            {
              id: 'en_p5_l1_e2',
              type: 'sentence_builder',
              prompt: 'Assemble the DevOps deployment sentence:',
              target_text: 'The CI pipeline completed with zero test failures .',
              vietnamese_meaning: 'Quy trình CI đã hoàn thành và không có bài test nào bị lỗi.',
              correct_answer: 'The CI pipeline completed with zero test failures .',
              options: ['The', 'CI', 'pipeline', 'completed', 'with', 'zero', 'test', 'failures', '.', 'at', 'in']
            }
          ]
        }
      ]
    },
    {
      num: 6,
      id_zh: 'zh_pract_u6',
      id_en: 'en_pract_u6',
      title_zh: 'Chủ Đề 6: Khẩn Cấp, Y Tế & Giải Quyết Rắc Rối Đời Thực',
      desc_zh: 'Khám bệnh, miêu tả triệu chứng tại hiệu thuốc, báo mất đồ và gọi xe cứu thương',
      title_en: 'Topic 6: Emergencies, Healthcare & Real-Life Crisis Solving',
      desc_en: 'Visiting a clinic, pharmacy consultations, lost items, and emergency calls',
      lessons_zh: [
        {
          id: 'zh_p6_l1',
          title: 'Mô tả triệu chứng bệnh tại phòng khám',
          desc: 'Cách khai báo sốt, đau đầu và mua thuốc đúng liều lượng',
          exercises: [
            {
              id: 'zh_p6_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Cụm từ triệu chứng y tế thông dụng:',
              target_text: '头晕恶心',
              phonetic: 'tóuyūn ěxīn',
              vietnamese_meaning: 'Chóng mặt buồn nôn',
              correct_answer: '头晕恶心',
              options: {
                collocations: ['有些头晕恶心', '伴有头晕恶心'],
                example: { target: '医生，我从昨天晚上开始感觉头晕恶心，全身没力气。', phonetic: 'yīshēng, wǒ cóng zuótiān wǎnshang kāishǐ gǎnjué tóuyūn ěxīn...', meaning: 'Bác sĩ ơi, từ tối qua tôi bắt đầu thấy chóng mặt buồn nôn, toàn thân không có sức lực.' },
                pragmatic_tip: 'Cụm từ chuẩn xác giúp bác sĩ nhanh chóng chẩn đoán chứng cảm cúm hoặc ngộ độc thực phẩm.'
              }
            },
            {
              id: 'zh_p6_l1_e2',
              type: 'sentence_builder',
              prompt: 'Sắp xếp câu hỏi liều dùng thuốc:',
              target_text: '请问 这个 药 一天 吃 几 次 、 饭前 还是 饭后 ？',
              vietnamese_meaning: 'Cho hỏi thuốc này ngày uống mấy lần, trước hay sau bữa ăn?',
              correct_answer: '请问 这个 药 一天 吃 几 次 、 饭前 还是 饭后 ？',
              options: ['请问', '这个', '药', '一天', '吃', '几', '次', '、', '饭前', '还是', '饭后', '？', '去', '买']
            }
          ]
        }
      ],
      lessons_en: [
        {
          id: 'en_p6_l1',
          title: 'Visiting the Clinic & Describing Symptoms',
          desc: 'Expressing pain levels, onset of symptoms, and allergies to medications',
          exercises: [
            {
              id: 'en_p6_l1_e1',
              type: 'flashcard_chunk',
              prompt: 'Essential healthcare chunk:',
              target_text: 'Over-the-counter',
              phonetic: '/ˌəʊvə ðə ˈkaʊntə/',
              vietnamese_meaning: 'Thuốc mua tự do không cần kê đơn (OTC)',
              correct_answer: 'Over-the-counter',
              options: {
                collocations: ['Over-the-counter medication', 'Available over-the-counter'],
                example: { target: 'Is this pain reliever available over-the-counter without a prescription?', phonetic: '/ˌəʊvə ðə ˈkaʊntə/', meaning: 'Thuốc giảm đau này có mua tự do không cần đơn thuốc được không?' },
                pragmatic_tip: 'Often abbreviated as "OTC" in pharmacies in the US, UK, and Canada.'
              }
            },
            {
              id: 'en_p6_l1_e2',
              type: 'sentence_builder',
              prompt: 'Assemble the emergency dispatch sentence:',
              target_text: 'Please send an ambulance immediately to 45 Oxford Street .',
              vietnamese_meaning: 'Làm ơn điều xe cấp cứu ngay lập tức tới số 45 phố Oxford.',
              correct_answer: 'Please send an ambulance immediately to 45 Oxford Street .',
              options: ['Please', 'send', 'an', 'ambulance', 'immediately', 'to', '45', 'Oxford', 'Street', '.', 'at', 'on']
            }
          ]
        }
      ]
    }
  ];

  const dbTx = db.transaction(() => {
    for (const t of TOPICS) {
      // 1. Insert Units
      insertUnit.run(
        t.id_zh,
        'zh_practical',
        t.num,
        t.title_zh,
        t.desc_zh,
        'BookOpen',
        '#059669'
      );

      insertUnit.run(
        t.id_en,
        'en_practical',
        t.num,
        t.title_en,
        t.desc_en,
        'BookOpen',
        '#059669'
      );

      // 2. Insert Lessons & Exercises for ZH
      let lIdxZh = 1;
      for (const l of t.lessons_zh) {
        insertLesson.run(l.id, t.id_zh, lIdxZh++, l.title, l.desc, 25);
        let eIdx = 1;
        for (const ex of l.exercises) {
          const optsJson = JSON.stringify(ex.options || []);
          insertExercise.run(
            ex.id,
            l.id,
            ex.type,
            ex.prompt,
            ex.target_text,
            ex.target_audio_text || ex.target_text,
            ex.phonetic || '',
            ex.vietnamese_meaning || '',
            optsJson,
            ex.correct_answer,
            ex.hint || '',
            null,
            eIdx++
          );
        }
      }

      // 3. Insert Lessons & Exercises for EN
      let lIdxEn = 1;
      for (const l of t.lessons_en) {
        insertLesson.run(l.id, t.id_en, lIdxEn++, l.title, l.desc, 25);
        let eIdx = 1;
        for (const ex of l.exercises) {
          const optsJson = JSON.stringify(ex.options || []);
          insertExercise.run(
            ex.id,
            l.id,
            ex.type,
            ex.prompt,
            ex.target_text,
            ex.target_audio_text || ex.target_text,
            ex.phonetic || '',
            ex.vietnamese_meaning || '',
            optsJson,
            ex.correct_answer,
            ex.hint || '',
            null,
            eIdx++
          );
        }
      }
    }
  });

  dbTx();
  console.log('✅ [Practical Curriculum] 6 Practical Topics successfully seeded for ZH and EN!');
}

module.exports = { seedPracticalTopics };

if (require.main === module) {
  seedPracticalTopics();
}
