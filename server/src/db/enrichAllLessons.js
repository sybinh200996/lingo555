/**
 * enrichAllLessons.js
 * Cung cấp đầy đủ bài tập cho tất cả 17 bài học đang bị rỗng (0 exercises)
 * và mở rộng các cấp độ HSK 1-6 và Tiếng Anh A1-C2.
 */

const db = require('./database');

function enrichCurriculum() {
  console.log('🚀 [Enrich] Starting curriculum enrichment for missing lessons...');

  const insertExercise = db.prepare(`
    INSERT OR REPLACE INTO exercises (
      id, lesson_id, type, prompt, target_text, target_audio_text,
      phonetic, vietnamese_meaning, options_json, correct_answer, hint, stroke_char, order_index
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const exercises = [
    // ----------------------------------------------------
    // 1. zh_l_h5: Hỏi Giá: 这个多少钱？(HSK 1)
    // ----------------------------------------------------
    {
      id: 'zh_l_h5_ex1',
      lesson_id: 'zh_l_h5',
      type: 'listening',
      prompt: 'Nghe và chọn nghĩa tiếng Việt chính xác:',
      target_text: '这个多少钱？',
      target_audio_text: '这个多少钱？',
      phonetic: 'zhè ge duōshao qián?',
      vietnamese_meaning: 'Cái này bao nhiêu tiền?',
      options_json: JSON.stringify(['Cái này bao nhiêu tiền?', 'Cái này là cái gì?', 'Bạn đi đâu mua đồ?', 'Tôi không có tiền']),
      correct_answer: 'Cái này bao nhiêu tiền?',
      hint: '这个 = cái này, 多少 = bao nhiêu, 钱 = tiền',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'zh_l_h5_ex2',
      lesson_id: 'zh_l_h5',
      type: 'speaking',
      prompt: 'Nhấn Micro và nói câu mặc cả: "Đắt quá, bớt chút đi":',
      target_text: '太贵了，便宜一点吧。',
      target_audio_text: '太贵了，便宜一点吧。',
      phonetic: 'tài guì le, piányi yīdiǎn ba.',
      vietnamese_meaning: 'Đắt quá, bớt chút đi.',
      options_json: JSON.stringify([]),
      correct_answer: '太贵了，便宜一点吧。',
      hint: '贵 = đắt, 便宜 = rẻ',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'zh_l_h5_ex3',
      lesson_id: 'zh_l_h5',
      type: 'matching',
      prompt: 'Nối các từ mua sắm với nghĩa tiếng Việt:',
      target_text: '多少钱,块,太贵了,便宜',
      target_audio_text: 'duōshao qián kuài tài guì le piányi',
      phonetic: 'duōshao qián, kuài, tài guì le, piányi',
      vietnamese_meaning: 'Từ vựng hỏi giá và mua sắm',
      options_json: JSON.stringify({
        pairs: [
          { left: '多少钱 (duōshao qián)', right: 'Bao nhiêu tiền' },
          { left: '块 (kuài)', right: 'Đồng / Tệ (tiền tệ)' },
          { left: '太贵了 (tài guì le)', right: 'Đắt quá rồi' },
          { left: '便宜 (piányi)', right: 'Rẻ, giá phải chăng' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: '块 là lượng từ chỉ đơn vị tiền tệ khẩu ngữ',
      stroke_char: null,
      order_index: 3
    },
    {
      id: 'zh_l_h5_ex4',
      lesson_id: 'zh_l_h5',
      type: 'translation',
      prompt: 'Sắp xếp các thẻ từ thành câu dịch: "Táo một cân bao nhiêu tiền?":',
      target_text: '苹果一斤多少钱？',
      target_audio_text: '苹果一斤多少钱？',
      phonetic: 'píngguǒ yī jīn duōshao qián?',
      vietnamese_meaning: 'Táo một cân bao nhiêu tiền?',
      options_json: JSON.stringify(['苹果', '一斤', '多少', '钱', '西瓜', '太贵']),
      correct_answer: '苹果 一斤 多少 钱',
      hint: '苹果 = quả táo, 一斤 = 1 cân (nửa kg TQ)',
      stroke_char: null,
      order_index: 4
    },
    {
      id: 'zh_l_h5_ex5',
      lesson_id: 'zh_l_h5',
      type: 'writing',
      prompt: 'Tập viết chữ Hán 钱 (Tiền) theo đúng thứ tự nét:',
      target_text: '钱',
      target_audio_text: '钱',
      phonetic: 'qián',
      vietnamese_meaning: 'Tiền bạc, tiền tài',
      options_json: JSON.stringify([]),
      correct_answer: '钱',
      hint: 'Chữ 钱 gồm bộ Kim (钅) bên trái biểu thị kim loại quý giá',
      stroke_char: '钱',
      order_index: 5
    },

    // ----------------------------------------------------
    // 2. zh_h2_l3: Kiểm Tra Gia Đình & Nghề Nghiệp (HSK 2 Checkpoint)
    // ----------------------------------------------------
    {
      id: 'zh_h2_l3_ex1',
      lesson_id: 'zh_h2_l3',
      type: 'listening',
      prompt: 'Nghe và chọn câu dịch tiếng Việt đúng:',
      target_text: '他爸爸是医生，在医院工作。',
      target_audio_text: '他爸爸是医生，在医院工作。',
      phonetic: 'tā bàba shì yīshēng, zài yīyuàn gōngzuò.',
      vietnamese_meaning: 'Bố anh ấy là bác sĩ, làm việc ở bệnh viện.',
      options_json: JSON.stringify([
        'Bố anh ấy là bác sĩ, làm việc ở bệnh viện.',
        'Mẹ anh ấy là giáo viên, làm việc ở trường học.',
        'Anh ấy muốn làm bác sĩ tương lai.',
        'Bố anh ấy đang nằm viện điều trị.'
      ]),
      correct_answer: 'Bố anh ấy là bác sĩ, làm việc ở bệnh viện.',
      hint: '医生 = bác sĩ, 医院 = bệnh viện',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'zh_h2_l3_ex2',
      lesson_id: 'zh_h2_l3',
      type: 'speaking',
      prompt: 'Nhấn Micro và nói: "Chị gái tôi cũng là giáo viên":',
      target_text: '我姐姐也是老师。',
      target_audio_text: '我姐姐也是老师。',
      phonetic: 'wǒ jiějie yě shì lǎoshī.',
      vietnamese_meaning: 'Chị gái tôi cũng là giáo viên.',
      options_json: JSON.stringify([]),
      correct_answer: '我姐姐也是老师。',
      hint: '也 = cũng, 老师 = giáo viên',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'zh_h2_l3_ex3',
      lesson_id: 'zh_h2_l3',
      type: 'matching',
      prompt: 'Nối các cặp từ nghề nghiệp và địa điểm:',
      target_text: '医生,老师,医院,学校',
      target_audio_text: 'yīshēng lǎoshī yīyuàn xuéxiào',
      phonetic: 'yīshēng, lǎoshī, yīyuàn, xuéxiào',
      vietnamese_meaning: 'Cặp từ nghề nghiệp và nơi làm việc',
      options_json: JSON.stringify({
        pairs: [
          { left: '医生 (yīshēng)', right: 'Bác sĩ' },
          { left: '老师 (lǎoshī)', right: 'Giáo viên' },
          { left: '医院 (yīyuàn)', right: 'Bệnh viện' },
          { left: '学校 (xuéxiào)', right: 'Trường học' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: 'Ghép từ đúng nghĩa tiếng Việt',
      stroke_char: null,
      order_index: 3
    },
    {
      id: 'zh_h2_l3_ex4',
      lesson_id: 'zh_h2_l3',
      type: 'translation',
      prompt: 'Sắp xếp câu hỏi: "Anh trai bạn làm công việc gì?":',
      target_text: '你哥哥做什么工作？',
      target_audio_text: '你哥哥做什么工作？',
      phonetic: 'nǐ gēge zuò shénme gōngzuò?',
      vietnamese_meaning: 'Anh trai bạn làm công việc gì?',
      options_json: JSON.stringify(['你', '哥哥', '做', '什么', '工作', '姐姐', '医生']),
      correct_answer: '你 哥哥 做 什么 工作',
      hint: '做 = làm, 什么 = gì, 工作 = công việc',
      stroke_char: null,
      order_index: 4
    },
    {
      id: 'zh_h2_l3_ex5',
      lesson_id: 'zh_h2_l3',
      type: 'writing',
      prompt: 'Tập viết chữ Hán 生 (Sinh trong Y sinh / Học sinh):',
      target_text: '生',
      target_audio_text: '生',
      phonetic: 'shēng',
      vietnamese_meaning: 'Sinh sống, học trò, nghề nghiệp',
      options_json: JSON.stringify([]),
      correct_answer: '生',
      hint: 'Chữ 生 gồm 5 nét, bắt đầu từ nét phẩy trên cùng',
      stroke_char: '生',
      order_index: 5
    },

    // ----------------------------------------------------
    // 3. zh_h2_l7: Phương Tiện Giao Thông (HSK 2)
    // ----------------------------------------------------
    {
      id: 'zh_h2_l7_ex1',
      lesson_id: 'zh_h2_l7',
      type: 'listening',
      prompt: 'Nghe và chọn nghĩa chính xác:',
      target_text: '我们坐出租车去火车站吧。',
      target_audio_text: '我们坐出租车去火车站吧。',
      phonetic: 'wǒmen zuò chūzūchē qù huǒchēzhàn ba.',
      vietnamese_meaning: 'Chúng ta đi taxi đến ga tàu hỏa nhé.',
      options_json: JSON.stringify([
        'Chúng ta đi taxi đến ga tàu hỏa nhé.',
        'Chúng ta đi xe buýt đến sân bay nhé.',
        'Tôi muốn mua vé tàu điện ngầm.',
        'Ga tàu hỏa ở rất xa đây.'
      ]),
      correct_answer: 'Chúng ta đi taxi đến ga tàu hỏa nhé.',
      hint: '出租车 = taxi, 火车站 = ga tàu hỏa',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'zh_h2_l7_ex2',
      lesson_id: 'zh_h2_l7',
      type: 'speaking',
      prompt: 'Nhấn Micro và nói: "Đi xe buýt rất thuận tiện":',
      target_text: '坐公共汽车很方便。',
      target_audio_text: '坐公共汽车很方便。',
      phonetic: 'zuò gōnggòng qìchē hěn fāngbiàn.',
      vietnamese_meaning: 'Đi xe buýt rất thuận tiện.',
      options_json: JSON.stringify([]),
      correct_answer: '坐公共汽车很方便。',
      hint: '公共汽车 = xe buýt, 方便 = thuận tiện',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'zh_h2_l7_ex3',
      lesson_id: 'zh_h2_l7',
      type: 'matching',
      prompt: 'Nối các loại phương tiện với nghĩa tiếng Việt:',
      target_text: '出租车,公共汽车,火车站,机场',
      target_audio_text: 'chūzūchē gōnggòng qìchē huǒchēzhàn jīchǎng',
      phonetic: 'chūzūchē, gōnggòng qìchē, huǒchēzhàn, jīchǎng',
      vietnamese_meaning: 'Từ vựng phương tiện di chuyển',
      options_json: JSON.stringify({
        pairs: [
          { left: '出租车 (chūzūchē)', right: 'Xe taxi' },
          { left: '公共汽车 (gōnggòng qìchē)', right: 'Xe buýt' },
          { left: '火车站 (huǒchēzhàn)', right: 'Ga tàu hỏa' },
          { left: '机场 (jīchǎng)', right: 'Sân bay' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: '车 = xe, 站 = trạm/ga',
      stroke_char: null,
      order_index: 3
    },
    {
      id: 'zh_h2_l7_ex4',
      lesson_id: 'zh_h2_l7',
      type: 'translation',
      prompt: 'Sắp xếp câu: "Anh ấy mỗi ngày đi tàu điện ngầm đi làm":',
      target_text: '他每天坐地铁上班。',
      target_audio_text: '他每天坐地铁上班。',
      phonetic: 'tā měitiān zuò dìtiě shàngbān.',
      vietnamese_meaning: 'Anh ấy mỗi ngày đi tàu điện ngầm đi làm.',
      options_json: JSON.stringify(['他', '每天', '坐', '地铁', '上班', '开车', '学校']),
      correct_answer: '他 每天 坐 地铁 上班',
      hint: '每天 = mỗi ngày, 地铁 = tàu điện ngầm, 上班 = đi làm',
      stroke_char: null,
      order_index: 4
    },
    {
      id: 'zh_h2_l7_ex5',
      lesson_id: 'zh_h2_l7',
      type: 'writing',
      prompt: 'Tập viết chữ Hán 车 (Xe cộ):',
      target_text: '车',
      target_audio_text: '车',
      phonetic: 'chē',
      vietnamese_meaning: 'Xe cộ, phương tiện',
      options_json: JSON.stringify([]),
      correct_answer: '车',
      hint: 'Chữ 车 mô phỏng chiếc xe cổ gồm 4 nét cơ bản',
      stroke_char: '车',
      order_index: 5
    },

    // ----------------------------------------------------
    // 4. zh_h3_l2: Thích & Không Thích: 喜欢 vs 不喜欢 (HSK 3)
    // ----------------------------------------------------
    {
      id: 'zh_h3_l2_ex1',
      lesson_id: 'zh_h3_l2',
      type: 'listening',
      prompt: 'Nghe và chọn nghĩa chính xác:',
      target_text: '除了看书以外，我还喜欢听音乐。',
      target_audio_text: '除了看书以外，我还喜欢听音乐。',
      phonetic: 'chúle kànshū yǐwài, wǒ hái xǐhuan tīng yīnyuè.',
      vietnamese_meaning: 'Ngoài đọc sách ra, tôi còn thích nghe nhạc.',
      options_json: JSON.stringify([
        'Ngoài đọc sách ra, tôi còn thích nghe nhạc.',
        'Tôi thích đọc sách hơn nghe nhạc.',
        'Tôi chỉ thích xem phim cùng bạn bè.',
        'Nghe nhạc giúp tôi đọc sách tập trung hơn.'
      ]),
      correct_answer: 'Ngoài đọc sách ra, tôi còn thích nghe nhạc.',
      hint: 'Cấu trúc 除了...以外，还... nghĩa là Ngoài... ra, còn...',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'zh_h3_l2_ex2',
      lesson_id: 'zh_h3_l2',
      type: 'speaking',
      prompt: 'Nhấn Micro và nói: "Tôi rất có hứng thú với văn hóa Trung Quốc":',
      target_text: '我对中国文化很感兴趣。',
      target_audio_text: '我对中国文化很感兴趣。',
      phonetic: 'wǒ duì zhōngguó wénhuà hěn gǎn xìngqù.',
      vietnamese_meaning: 'Tôi rất có hứng thú với văn hóa Trung Quốc.',
      options_json: JSON.stringify([]),
      correct_answer: '我对中国文化很感兴趣。',
      hint: '对...感兴趣 = có hứng thú với cái gì',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'zh_h3_l2_ex3',
      lesson_id: 'zh_h3_l2',
      type: 'matching',
      prompt: 'Nối các từ sở thích với nghĩa tiếng Việt:',
      target_text: '感兴趣,爱好,音乐,运动',
      target_audio_text: 'gǎn xìngqù àihào yīnyuè yùndòng',
      phonetic: 'gǎn xìngqù, àihào, yīnyuè, yùndòng',
      vietnamese_meaning: 'Từ vựng sở thích HSK3',
      options_json: JSON.stringify({
        pairs: [
          { left: '感兴趣 (gǎn xìngqù)', right: 'Có hứng thú' },
          { left: '爱好 (àihào)', right: 'Sở thích' },
          { left: '音乐 (yīnyuè)', right: 'Âm nhạc' },
          { left: '运动 (yùndòng)', right: 'Thể thao, vận động' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: 'Ghép đúng cặp từ chỉ sở thích',
      stroke_char: null,
      order_index: 3
    },
    {
      id: 'zh_h3_l2_ex4',
      lesson_id: 'zh_h3_l2',
      type: 'translation',
      prompt: 'Sắp xếp câu: "Mặc dù rất mệt, nhưng tôi rất vui vẻ":',
      target_text: '虽然很累，但是我很高兴。',
      target_audio_text: '虽然很累，但是我很高兴。',
      phonetic: 'suīrán hěn lèi, dànshì wǒ hěn gāoxìng.',
      vietnamese_meaning: 'Mặc dù rất mệt, nhưng tôi rất vui vẻ.',
      options_json: JSON.stringify(['虽然', '很累', '但是', '我', '很', '高兴', '喜欢', '难过']),
      correct_answer: '虽然 很累 但是 我 很 高兴',
      hint: 'Cặp từ nối: 虽然...但是... (Mặc dù... nhưng...)',
      stroke_char: null,
      order_index: 4
    },
    {
      id: 'zh_h3_l2_ex5',
      lesson_id: 'zh_h3_l2',
      type: 'writing',
      prompt: 'Tập viết chữ Hán 乐 (Âm nhạc / Vui vẻ):',
      target_text: '乐',
      target_audio_text: '乐',
      phonetic: 'lè / yuè',
      vietnamese_meaning: 'Âm nhạc, vui mừng, lạc quan',
      options_json: JSON.stringify([]),
      correct_answer: '乐',
      hint: 'Chữ 乐 gồm 5 nét, có 2 cách đọc: yuè (âm nhạc) và lè (vui vẻ)',
      stroke_char: '乐',
      order_index: 5
    },

    // ----------------------------------------------------
    // 5. zh_h3_l4: Đặt Vé & Khách Sạn (HSK 3)
    // ----------------------------------------------------
    {
      id: 'zh_h3_l4_ex1',
      lesson_id: 'zh_h3_l4',
      type: 'listening',
      prompt: 'Nghe và chọn câu đối thoại logic nhất:',
      target_text: '请问，还有去北京的双人间吗？',
      target_audio_text: '请问，还有去北京的双人间吗？',
      phonetic: 'qǐngwèn, hái yǒu qù běijīng de shuāngrénjiān ma?',
      vietnamese_meaning: 'Xin hỏi, còn phòng đôi khách sạn không?',
      options_json: JSON.stringify([
        'Xin hỏi, còn phòng đôi khách sạn không?',
        'Xin hỏi, vé máy bay giá bao nhiêu?',
        'Bạn có mang theo hộ chiếu không?',
        'Khách sạn này có bữa sáng miễn phí không?'
      ]),
      correct_answer: 'Xin hỏi, còn phòng đôi khách sạn không?',
      hint: '双人间 = phòng đôi cho 2 người',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'zh_h3_l4_ex2',
      lesson_id: 'zh_h3_l4',
      type: 'speaking',
      prompt: 'Nhấn Micro và nói: "Tôi muốn đặt một tấm vé máy bay đi Thượng Hải":',
      target_text: '我想预订一张去上海的机票。',
      target_audio_text: '我想预订一张去上海的机票。',
      phonetic: 'wǒ xiǎng yùdìng yī zhāng qù shànghǎi de jīpiào.',
      vietnamese_meaning: 'Tôi muốn đặt một tấm vé máy bay đi Thượng Hải.',
      options_json: JSON.stringify([]),
      correct_answer: '我想预订一张去上海的机票。',
      hint: '预订 = đặt trước, 机票 = vé máy bay, 张 = lượng từ tờ/vé',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'zh_h3_l4_ex3',
      lesson_id: 'zh_h3_l4',
      type: 'matching',
      prompt: 'Nối các từ du lịch và khách sạn:',
      target_text: '预订,护照,宾馆,行李',
      target_audio_text: 'yùdìng hùzhào bīnguǎn xíngli',
      phonetic: 'yùdìng, hùzhào, bīnguǎn, xíngli',
      vietnamese_meaning: 'Từ vựng đặt vé khách sạn',
      options_json: JSON.stringify({
        pairs: [
          { left: '预订 (yùdìng)', right: 'Đặt phòng / Đặt vé' },
          { left: '护照 (hùzhào)', right: 'Hộ chiếu passport' },
          { left: '宾馆 (bīnguǎn)', right: 'Khách sạn' },
          { left: '行李 (xíngli)', right: 'Hành lý vali' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: '护 = bảo hộ, 照 = giấy tờ chứng nhận',
      stroke_char: null,
      order_index: 3
    },
    {
      id: 'zh_h3_l4_ex4',
      lesson_id: 'zh_h3_l4',
      type: 'translation',
      prompt: 'Sắp xếp câu: "Chúng tôi đã đặt trước hai phòng rồi":',
      target_text: '我们已经预订了两个房间。',
      target_audio_text: '我们已经预订了两个房间。',
      phonetic: 'wǒmen yǐjīng yùdìng le liǎng gè fángjiān.',
      vietnamese_meaning: 'Chúng tôi đã đặt trước hai phòng rồi.',
      options_json: JSON.stringify(['我们', '已经', '预订', '了', '两个', '房间', '宾馆', '护照']),
      correct_answer: '我们 已经 预订 了 两个 房间',
      hint: '已经...了 = đã... rồi, 房间 = căn phòng',
      stroke_char: null,
      order_index: 4
    },
    {
      id: 'zh_h3_l4_ex5',
      lesson_id: 'zh_h3_l4',
      type: 'writing',
      prompt: 'Tập viết chữ Hán 票 (Tấm vé):',
      target_text: '票',
      target_audio_text: '票',
      phonetic: 'piào',
      vietnamese_meaning: 'Vé xe, phiếu, ngân phiếu',
      options_json: JSON.stringify([]),
      correct_answer: '票',
      hint: 'Chữ 票 gồm bộ Tây (西) biến thể bên trên và bộ Kỳ (示) bên dưới',
      stroke_char: '票',
      order_index: 5
    },

    // ----------------------------------------------------
    // 6. zh_h4_l2: Viết Email Công Việc bằng Tiếng Trung (HSK 4)
    // ----------------------------------------------------
    {
      id: 'zh_h4_l2_ex1',
      lesson_id: 'zh_h4_l2',
      type: 'listening',
      prompt: 'Nghe và chọn nội dung thông điệp công việc:',
      target_text: '请查收附件中的会议纪要。',
      target_audio_text: '请查收附件中的会议纪要。',
      phonetic: 'qǐng cháshōu fùjiàn zhōng de huìyì jìyào.',
      vietnamese_meaning: 'Vui lòng kiểm tra biên bản cuộc họp trong tệp đính kèm.',
      options_json: JSON.stringify([
        'Vui lòng kiểm tra biên bản cuộc họp trong tệp đính kèm.',
        'Cuộc họp hôm nay sẽ bắt đầu lúc 3 giờ chiều.',
        'Xin gửi lại hợp đồng đã có chữ ký đại diện.',
        'Kính gửi đối tác kế hoạch phát triển mới.'
      ]),
      correct_answer: 'Vui lòng kiểm tra biên bản cuộc họp trong tệp đính kèm.',
      hint: '查收 = kiểm tra nhận, 附件 = tệp đính kèm',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'zh_h4_l2_ex2',
      lesson_id: 'zh_h4_l2',
      type: 'speaking',
      prompt: 'Nhấn Micro và đọc câu kết thúc email chuyên nghiệp:',
      target_text: '期待您的回复与合作。',
      target_audio_text: '期待您的回复与合作。',
      phonetic: 'qīdài nín de huífù yǔ hézuò.',
      vietnamese_meaning: 'Rất mong nhận được phản hồi và sự hợp tác của ngài.',
      options_json: JSON.stringify([]),
      correct_answer: '期待您的回复与合作。',
      hint: '期待 = kỳ vọng mong đợi, 回复 = hồi âm, 合作 = hợp tác',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'zh_h4_l2_ex3',
      lesson_id: 'zh_h4_l2',
      type: 'matching',
      prompt: 'Nối thuật ngữ văn phòng và email công việc:',
      target_text: '附件,会议纪要,合作,联系',
      target_audio_text: 'fùjiàn huìyì jìyào hézuò liánxì',
      phonetic: 'fùjiàn, huìyì jìyào, hézuò, liánxì',
      vietnamese_meaning: 'Thuật ngữ thư từ công việc HSK4',
      options_json: JSON.stringify({
        pairs: [
          { left: '附件 (fùjiàn)', right: 'Tệp file đính kèm' },
          { left: '会议纪要 (huìyì jìyào)', right: 'Biên bản cuộc họp' },
          { left: '合作 (hézuò)', right: 'Hợp tác đối tác' },
          { left: '联系 (liánxì)', right: 'Liên lạc, liên hệ' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: 'Từ vựng quan trọng trong giao tiếp thương mại',
      stroke_char: null,
      order_index: 3
    },
    {
      id: 'zh_h4_l2_ex4',
      lesson_id: 'zh_h4_l2',
      type: 'translation',
      prompt: 'Sắp xếp câu: "Nếu có bất kỳ vấn đề gì, vui lòng liên hệ với tôi bất cứ lúc nào":',
      target_text: '如果有任何问题，请随时联系我。',
      target_audio_text: '如果有任何问题，请随时联系我。',
      phonetic: 'rúguǒ yǒu rènhé wèntí, qǐng suíshí liánxì wǒ.',
      vietnamese_meaning: 'Nếu có bất kỳ vấn đề gì, vui lòng liên hệ với tôi bất cứ lúc nào.',
      options_json: JSON.stringify(['如果', '有', '任何', '问题', '请', '随时', '联系', '我', '合作']),
      correct_answer: '如果 有 任何 问题 请 随时 联系 我',
      hint: '任何 = bất kỳ, 随时 = bất cứ lúc nào',
      stroke_char: null,
      order_index: 4
    },
    {
      id: 'zh_h4_l2_ex5',
      lesson_id: 'zh_h4_l2',
      type: 'writing',
      prompt: 'Tập viết chữ Hán 复 (Hồi phục / Phúc đáp email):',
      target_text: '复',
      target_audio_text: '复',
      phonetic: 'fù',
      vietnamese_meaning: 'Hồi âm, phúc đáp, lặp lại',
      options_json: JSON.stringify([]),
      correct_answer: '复',
      hint: 'Chữ 复 trong 回复 (hồi âm email) hoặc 复杂 (phức tạp)',
      stroke_char: '复',
      order_index: 5
    },

    // ----------------------------------------------------
    // 7. zh_h4_l4: Bàn Luận Phim & Âm Nhạc (HSK 4)
    // ----------------------------------------------------
    {
      id: 'zh_h4_l4_ex1',
      lesson_id: 'zh_h4_l4',
      type: 'listening',
      prompt: 'Nghe và chọn lời nhận xét phim đúng:',
      target_text: '这部电影的情节非常精彩，值得一看。',
      target_audio_text: '这部电影的情节非常精彩，值得一看。',
      phonetic: 'zhè bù diànyǐng de qíngjié fēicháng jīngcǎi, zhídé yī kàn.',
      vietnamese_meaning: 'Tình tiết bộ phim này vô cùng xuất sắc, rất đáng xem.',
      options_json: JSON.stringify([
        'Tình tiết bộ phim này vô cùng xuất sắc, rất đáng xem.',
        'Bài hát này có giai điệu buồn và chậm rãi.',
        'Diễn viên đóng vai chính diễn xuất không tự nhiên.',
        'Rạp chiếu phim hôm nay rất đông khán giả.'
      ]),
      correct_answer: 'Tình tiết bộ phim này vô cùng xuất sắc, rất đáng xem.',
      hint: '精彩 = xuất sắc, 值得 = đáng để làm gì',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'zh_h4_l4_ex2',
      lesson_id: 'zh_h4_l4',
      type: 'speaking',
      prompt: 'Nhấn Micro và nói: "Giai điệu bài hát này khiến người ta cảm thấy thư giãn":',
      target_text: '这首歌的旋律让人感到放松。',
      target_audio_text: '这首歌的旋律让人感到放松。',
      phonetic: 'zhè shǒu gē de xuánlǜ ràng rén gǎndào fàngsōng.',
      vietnamese_meaning: 'Giai điệu bài hát này khiến người ta cảm thấy thư giãn.',
      options_json: JSON.stringify([]),
      correct_answer: '这首歌的旋律让人感到放松。',
      hint: '旋律 = giai điệu, 放松 = thư giãn thả lỏng',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'zh_h4_l4_ex3',
      lesson_id: 'zh_h4_l4',
      type: 'matching',
      prompt: 'Nối thuật ngữ nghệ thuật và giải trí:',
      target_text: '情节,精彩,旋律,演员',
      target_audio_text: 'qíngjié jīngcǎi xuánlǜ yǎnyuán',
      phonetic: 'qíngjié, jīngcǎi, xuánlǜ, yǎnyuán',
      vietnamese_meaning: 'Từ vựng điện ảnh âm nhạc HSK4',
      options_json: JSON.stringify({
        pairs: [
          { left: '情节 (qíngjié)', right: 'Tình tiết cốt truyện' },
          { left: '精彩 (jīngcǎi)', right: 'Hấp dẫn, tuyệt vời' },
          { left: '旋律 (xuánlǜ)', right: 'Giai điệu âm thanh' },
          { left: '演员 (yǎnyuán)', right: 'Diễn viên điện ảnh' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: '演 = diễn, 员 = thành viên/người',
      stroke_char: null,
      order_index: 3
    },
    {
      id: 'zh_h4_l4_ex4',
      lesson_id: 'zh_h4_l4',
      type: 'translation',
      prompt: 'Sắp xếp câu: "Cái kết của bộ phim này khiến mọi người vô cùng cảm động":',
      target_text: '这部电影的结局令人感动。',
      target_audio_text: '这部电影的结局令人感动。',
      phonetic: 'zhè bù diànyǐng de jiéjú lìng rén gǎndòng.',
      vietnamese_meaning: 'Cái kết của bộ phim này khiến mọi người vô cùng cảm động.',
      options_json: JSON.stringify(['这部', '电影', '的', '结局', '令人', '感动', '精彩', '旋律']),
      correct_answer: '这部 电影 的 结局 令人 感动',
      hint: '结局 = kết thúc/cái kết, 令人 = khiến cho người ta',
      stroke_char: null,
      order_index: 4
    },
    {
      id: 'zh_h4_l4_ex5',
      lesson_id: 'zh_h4_l4',
      type: 'writing',
      prompt: 'Tập viết chữ Hán 演 (Diễn xuất):',
      target_text: '演',
      target_audio_text: '演',
      phonetic: 'yǎn',
      vietnamese_meaning: 'Diễn xuất, trình diễn, biểu diễn',
      options_json: JSON.stringify([]),
      correct_answer: '演',
      hint: 'Chữ 演 gồm bộ Ba chấm thủy (氵) bên trái',
      stroke_char: '演',
      order_index: 5
    },

    // ----------------------------------------------------
    // 8. zh_h5_l2: Đọc Hiểu Bài Báo Tiếng Trung (HSK 5)
    // ----------------------------------------------------
    {
      id: 'zh_h5_l2_ex1',
      lesson_id: 'zh_h5_l2',
      type: 'listening',
      prompt: 'Nghe đoạn trích thời sự kinh tế và chọn ý chính:',
      target_text: '随着科技的飞速发展，人工智能深刻地改变了人类的生活方式。',
      target_audio_text: '随着科技的飞速发展，人工智能深刻地改变了人类的生活方式。',
      phonetic: 'suízhe kējì de fēisù fāzhǎn, réngōng zhìnéng shēnkè de gǎibiàn le rénlèi de shēnghuó fāngshì.',
      vietnamese_meaning: 'Cùng với sự phát triển nhanh chóng của công nghệ, AI đã thay đổi sâu sắc lối sống của nhân loại.',
      options_json: JSON.stringify([
        'Cùng với sự phát triển nhanh chóng của công nghệ, AI đã thay đổi sâu sắc lối sống của nhân loại.',
        'Trí tuệ nhân tạo đang gây ra nhiều thách thức về việc làm toàn cầu.',
        'Các công ty công nghệ đang đẩy mạnh đầu tư năng lượng sạch.',
        'Mô hình làm việc truyền thống vẫn giữ vai trò then chốt.'
      ]),
      correct_answer: 'Cùng với sự phát triển nhanh chóng của công nghệ, AI đã thay đổi sâu sắc lối sống của nhân loại.',
      hint: '随着 = cùng với, 人工智能 = AI, 深刻 = sâu sắc',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'zh_h5_l2_ex2',
      lesson_id: 'zh_h5_l2',
      type: 'speaking',
      prompt: 'Nhấn Micro và đọc nhận định chuyên gia:',
      target_text: '绿色环保已成为全球经济可持续发展的核心议题。',
      target_audio_text: '绿色环保已成为全球经济可持续发展的核心议题。',
      phonetic: 'lǜsè huánbǎo yǐ chéngwéi quánqiú jīngjì kěchíxù fāzhǎn de héxīn yìtí.',
      vietnamese_meaning: 'Bảo vệ môi trường xanh đã trở thành chủ đề cốt lõi của sự phát triển kinh tế bền vững toàn cầu.',
      options_json: JSON.stringify([]),
      correct_answer: '绿色环保已成为全球经济可持续发展的核心议题。',
      hint: '可持续发展 = phát triển bền vững, 核心 = cốt lõi',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'zh_h5_l2_ex3',
      lesson_id: 'zh_h5_l2',
      type: 'matching',
      prompt: 'Nối thuật ngữ báo chí và thời sự HSK5:',
      target_text: '可持续,核心,深刻,飞速',
      target_audio_text: 'kěchíxù héxīn shēnkè fēisù',
      phonetic: 'kěchíxù, héxīn, shēnkè, fēisù',
      vietnamese_meaning: 'Thuật ngữ báo chí học thuật HSK5',
      options_json: JSON.stringify({
        pairs: [
          { left: '可持续 (kěchíxù)', right: 'Bền vững, lâu dài' },
          { left: '核心 (héxīn)', right: 'Cốt lõi, trung tâm' },
          { left: '深刻 (shēnkè)', right: 'Sâu sắc, thấu đáo' },
          { left: '飞速 (fēisù)', right: 'Nhanh như bay, thần tốc' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: 'Ghép chuẩn thuật ngữ thường gặp trên các mặt báo',
      stroke_char: null,
      order_index: 3
    },
    {
      id: 'zh_h5_l2_ex4',
      lesson_id: 'zh_h5_l2',
      type: 'translation',
      prompt: 'Sắp xếp câu: "Đổi mới công nghệ đã thúc đẩy sự phồn vinh của ngành công nghiệp":',
      target_text: '科技创新推动了产业的繁荣。',
      target_audio_text: '科技创新推动了产业的繁荣。',
      phonetic: 'kējì chuàngxīn tuīdòng le chǎnyè de fánróng.',
      vietnamese_meaning: 'Đổi mới công nghệ đã thúc đẩy sự phồn vinh của ngành công nghiệp.',
      options_json: JSON.stringify(['科技', '创新', '推动', '了', '产业', '的', '繁荣', '深刻', '核心']),
      correct_answer: '科技 创新 推动 了 产业 的 繁荣',
      hint: '创新 = đổi mới sáng tạo, 推动 = thúc đẩy, 繁荣 = phồn vinh',
      stroke_char: null,
      order_index: 4
    },
    {
      id: 'zh_h5_l2_ex5',
      lesson_id: 'zh_h5_l2',
      type: 'writing',
      prompt: 'Tập viết chữ Hán 济 (Kinh tế / Cứu trợ):',
      target_text: '济',
      target_audio_text: '济',
      phonetic: 'jì',
      vietnamese_meaning: 'Kinh tế, cứu giúp',
      options_json: JSON.stringify([]),
      correct_answer: '济',
      hint: 'Chữ 济 trong 经济 (Kinh tế) có bộ Thủy bên trái',
      stroke_char: '济',
      order_index: 5
    },

    // ----------------------------------------------------
    // 9. zh_h5_l3: Viết Luận Tiếng Trung: Cấu Trúc & Lập Luận (HSK 5)
    // ----------------------------------------------------
    {
      id: 'zh_h5_l3_ex1',
      lesson_id: 'zh_h5_l3',
      type: 'listening',
      prompt: 'Nghe câu kết luận lập luận bài viết:',
      target_text: '综上所述，教育不仅关乎个人前途，更是国家发展的基石。',
      target_audio_text: '综上所述，教育不仅关乎个人前途，更是国家发展的基石。',
      phonetic: 'zòngshàng suǒshù, jiàoyù bùjǐn guānhū gèrén qiántú, gèng shì guójiā fāzhǎn de jīshí.',
      vietnamese_meaning: 'Tóm lại, giáo dục không chỉ liên quan đến tương lai cá nhân, mà còn là nền tảng cho sự phát triển của quốc gia.',
      options_json: JSON.stringify([
        'Tóm lại, giáo dục không chỉ liên quan đến tương lai cá nhân, mà còn là nền tảng cho sự phát triển của quốc gia.',
        'Môi trường sống đóng vai trò quyết định đến tính cách của mỗi con người.',
        'Chúng ta cần cân bằng giữa việc học tập và nghỉ ngơi giải trí.',
        'Thành công chỉ đến với những người biết nắm bắt cơ hội.'
      ]),
      correct_answer: 'Tóm lại, giáo dục không chỉ liên quan đến tương lai cá nhân, mà còn là nền tảng cho sự phát triển của quốc gia.',
      hint: '综上所述 = Tóm lại / Tổng kết lại những điều trên, 基石 = nền tảng vững chắc',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'zh_h5_l3_ex2',
      lesson_id: 'zh_h5_l3',
      type: 'speaking',
      prompt: 'Nhấn Micro và nói câu luận điểm vững chắc:',
      target_text: '从长远来看，坚持自主创新才能立于不败之地。',
      target_audio_text: '从长远来看，坚持自主创新才能立于不败之地。',
      phonetic: 'cóng chángyuǎn lái kàn, jiānchí zìzhǔ chuàngxīn cái néng lì yú bú bài zhī dì.',
      vietnamese_meaning: 'Nhìn về lâu dài, kiên trì tự chủ đổi mới mới có thể đứng vững ở vị thế bất bại.',
      options_json: JSON.stringify([]),
      correct_answer: '从长远来看，坚持自主创新才能立于不败之地。',
      hint: '从长远来看 = Nhìn về lâu dài, 不败之地 = thế bất bại',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'zh_h5_l3_ex3',
      lesson_id: 'zh_h5_l3',
      type: 'matching',
      prompt: 'Nối các liên từ nối lập luận bài văn nghị luận HSK5:',
      target_text: '综上所述,从长远来看,毫无疑问,总而言之',
      target_audio_text: 'zòngshàng suǒshù cóng chángyuǎn lái kàn háowú yíwèn zǒng\'éryánzhī',
      phonetic: 'zòngshàng suǒshù, cóng chángyuǎn lái kàn, háowú yíwèn, zǒng\'éryánzhī',
      vietnamese_meaning: 'Từ nối lập luận bài văn HSK5',
      options_json: JSON.stringify({
        pairs: [
          { left: '综上所述 (zòngshàng suǒshù)', right: 'Tóm lại các điều trên' },
          { left: '从长远来看 (cóng chángyuǎn)', right: 'Về lâu dài mà nói' },
          { left: '毫无疑问 (háowú yíwèn)', right: 'Không còn nghi ngờ gì nữa' },
          { left: '总而言之 (zǒng\'éryánzhī)', right: 'Nói tóm lại' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: 'Cụm 4 chữ dùng làm mở bài và kết bài văn luận',
      stroke_char: null,
      order_index: 3
    },
    {
      id: 'zh_h5_l3_ex4',
      lesson_id: 'zh_h5_l3',
      type: 'translation',
      prompt: 'Sắp xếp câu: "Mọi thành công đều không thể tách rời sự nỗ lực kiên trì":',
      target_text: '任何成功都离不开坚持不懈的努力。',
      target_audio_text: '任何成功都离不开坚持不懈的努力。',
      phonetic: 'rènhé chénggōng dōu lí bù kāi jiānchí bù xiè de nǔlì.',
      vietnamese_meaning: 'Mọi thành công đều không thể tách rời sự nỗ lực kiên trì.',
      options_json: JSON.stringify(['任何', '成功', '都', '离不开', '坚持不懈', '的', '努力', '教育', '发展']),
      correct_answer: '任何 成功 都 离不开 坚持不懈 的 努力',
      hint: '离不开 = không thể tách rời, 坚持不懈 = kiên trì bền bỉ',
      stroke_char: null,
      order_index: 4
    },
    {
      id: 'zh_h5_l3_ex5',
      lesson_id: 'zh_h5_l3',
      type: 'writing',
      prompt: 'Tập viết chữ Hán 论 (Nghị luận / Luận điểm):',
      target_text: '论',
      target_audio_text: '论',
      phonetic: 'lùn',
      vietnamese_meaning: 'Bàn luận, lý luận, nghị luận',
      options_json: JSON.stringify([]),
      correct_answer: '论',
      hint: 'Chữ 论 gồm bộ Ngôn (讠) bên trái biểu thị lời nói bàn luận',
      stroke_char: '论',
      order_index: 5
    },

    // ----------------------------------------------------
    // 10. zh_h6_l1 & zh_h6_l2: Bổ sung câu hỏi chuyên sâu HSK 6
    // ----------------------------------------------------
    {
      id: 'zh_h6_l1_ex2',
      lesson_id: 'zh_h6_l1',
      type: 'speaking',
      prompt: 'Nhấn Micro và ngâm 2 câu thơ nổi tiếng của Lý Bạch:',
      target_text: '举头望明月，低头思故乡。',
      target_audio_text: '举头望明月，低头思故乡。',
      phonetic: 'jǔ tóu wàng míngyuè, dī tóu sī gùxiāng.',
      vietnamese_meaning: 'Ngẩng đầu nhìn trăng sáng, Cúi đầu nhớ cố hương.',
      options_json: JSON.stringify([]),
      correct_answer: '举头望明月，低头思故乡。',
      hint: 'Tác phẩm Tĩnh Dạ Tứ - Thi tiên Lý Bạch',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'zh_h6_l1_ex3',
      lesson_id: 'zh_h6_l1',
      type: 'matching',
      prompt: 'Nối các từ ngữ thi ca Đường Thi với ý nghĩa:',
      target_text: '明月,故乡,霜,望',
      target_audio_text: 'míngyuè gùxiāng shuāng wàng',
      phonetic: 'míngyuè, gùxiāng, shuāng, wàng',
      vietnamese_meaning: 'Từ vựng văn học cổ điển HSK6',
      options_json: JSON.stringify({
        pairs: [
          { left: '明月 (míngyuè)', right: 'Trăng sáng vằng vặc' },
          { left: '故乡 (gùxiāng)', right: 'Quê hương bản xứ' },
          { left: '疑是霜 (yí shì shuāng)', right: 'Ngỡ là sương tuyết trên mặt đất' },
          { left: '举头 (jǔ tóu)', right: 'Ngẩng cao đầu' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: 'Từ vựng văn học cổ điển Đường thi',
      stroke_char: null,
      order_index: 3
    },
    {
      id: 'zh_h6_l2_ex3',
      lesson_id: 'zh_h6_l2',
      type: 'listening',
      prompt: 'Nghe thành ngữ và chọn ý nghĩa biểu đạt:',
      target_text: '一举两得',
      target_audio_text: '一举两得',
      phonetic: 'yī jǔ liǎng dé',
      vietnamese_meaning: 'Một mũi tên trúng hai đích (Một công đôi việc)',
      options_json: JSON.stringify([
        'Một công đôi việc, làm một việc được hai lợi ích',
        'Bỏ dở giữa chừng, không kiên trì',
        'Ếch ngồi đáy giếng, tầm nhìn hạn hẹp',
        'Nước chảy đá mòn, kiên nhẫn thành công'
      ]),
      correct_answer: 'Một công đôi việc, làm một việc được hai lợi ích',
      hint: '举 = hành động cử chỉ, 得 = đạt được',
      stroke_char: null,
      order_index: 3
    },
    {
      id: 'zh_h6_l2_ex4',
      lesson_id: 'zh_h6_l2',
      type: 'translation',
      prompt: 'Sắp xếp câu dùng thành ngữ: "Làm như vậy vừa bảo vệ môi trường vừa tiết kiệm, thật là một công đôi việc":',
      target_text: '这样做既环保又省钱，真是一举两得。',
      target_audio_text: '这样做既环保又省钱，真是一举两得。',
      phonetic: 'zhèyàng zuò jì huánbǎo yòu shěngqián, zhēnshì yījǔliǎngdé.',
      vietnamese_meaning: 'Làm như vậy vừa bảo vệ môi trường vừa tiết kiệm, thật là một công đôi việc.',
      options_json: JSON.stringify(['这样做', '既环保', '又省钱', '真是', '一举两得', '毫无疑问', '基石']),
      correct_answer: '这样做 既环保 又省钱 真是 一举两得',
      hint: 'Cấu trúc 既...又... (Vừa... lại vừa...)',
      stroke_char: null,
      order_index: 4
    },

    // ----------------------------------------------------
    // 11. en_l_ipa3: Thử Thách Nghe Phân Biệt Âm IPA
    // ----------------------------------------------------
    {
      id: 'en_l_ipa3_ex1',
      lesson_id: 'en_l_ipa3',
      type: 'listening',
      prompt: 'Listen and choose the word you hear (/iː/ vs /ɪ/):',
      target_text: 'Ship vs Sheep',
      target_audio_text: 'Sheep',
      phonetic: '/ʃiːp/',
      vietnamese_meaning: 'Con cừu (nguyên âm dài /iː/)',
      options_json: JSON.stringify(['Sheep (/ʃiːp/ - Con cừu)', 'Ship (/ʃɪp/ - Con tàu)', 'Chip (/tʃɪp/ - Khoai tây)', 'Sheet (/ʃiːt/ - Tờ giấy)']),
      correct_answer: 'Sheep (/ʃiːp/ - Con cừu)',
      hint: 'Sheep có âm /iː/ kéo dài, khác với Ship /ɪ/ dứt khoát',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'en_l_ipa3_ex2',
      lesson_id: 'en_l_ipa3',
      type: 'speaking',
      prompt: 'Press Mic and clearly pronounce the minimal pair sentence:',
      target_text: 'The ship carries white sheep across the sea.',
      target_audio_text: 'The ship carries white sheep across the sea.',
      phonetic: '/ðə ʃɪp ˈkæriz waɪt ʃiːp əˈkrɒs ðə siː/',
      vietnamese_meaning: 'Con tàu chở những chú cừu trắng băng qua biển.',
      options_json: JSON.stringify([]),
      correct_answer: 'The ship carries white sheep across the sea.',
      hint: 'Phân biệt rõ âm ngắn trong ship và âm dài trong sheep, sea',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'en_l_ipa3_ex3',
      lesson_id: 'en_l_ipa3',
      type: 'matching',
      prompt: 'Match phonetic symbols with standard example words:',
      target_text: '/iː/,/ɪ/,/θ/,/ð/',
      target_audio_text: 'tree, sit, think, this',
      phonetic: '/iː/, /ɪ/, /θ/, /ð/',
      vietnamese_meaning: 'Cặp âm IPA căn bản',
      options_json: JSON.stringify({
        pairs: [
          { left: '/iː/ (Long e)', right: 'Tree, See, Green' },
          { left: '/ɪ/ (Short i)', right: 'Sit, Hit, Big' },
          { left: '/θ/ (Voiceless th)', right: 'Think, Thank, Three' },
          { left: '/ð/ (Voiced th)', right: 'This, That, Mother' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: 'Chú ý khẩu hình đặt lưỡi giữa 2 hàm răng với âm th',
      stroke_char: null,
      order_index: 3
    },

    // ----------------------------------------------------
    // 12. en_l_a1_2: Where Are You From?
    // ----------------------------------------------------
    {
      id: 'en_l_a1_2_ex1',
      lesson_id: 'en_l_a1_2',
      type: 'listening',
      prompt: 'Listen and choose the correct answer to "Where are you from?":',
      target_text: 'I am from Vietnam.',
      target_audio_text: 'I am from Vietnam.',
      phonetic: '/aɪ æm frɒm ˌvjɛtˈnɑːm/',
      vietnamese_meaning: 'Tôi đến từ Việt Nam.',
      options_json: JSON.stringify(['I am from Vietnam.', 'I am fine, thank you.', 'My name is Nam.', 'I am 20 years old.']),
      correct_answer: 'I am from Vietnam.',
      hint: 'Cấu trúc trả lời quê hương: I am from + Tên quốc gia',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'en_l_a1_2_ex2',
      lesson_id: 'en_l_a1_2',
      type: 'speaking',
      prompt: 'Press Mic and state your nationality:',
      target_text: 'I am Vietnamese and I live in Hanoi.',
      target_audio_text: 'I am Vietnamese and I live in Hanoi.',
      phonetic: '/aɪ æm ˌvjɛtnəˈmiːz ænd aɪ lɪv ɪn hæˈnɔɪ/',
      vietnamese_meaning: 'Tôi là người Việt Nam và tôi sống ở Hà Nội.',
      options_json: JSON.stringify([]),
      correct_answer: 'I am Vietnamese and I live in Hanoi.',
      hint: 'Vietnamese là quốc tịch, Vietnam là tên đất nước',
      stroke_char: null,
      order_index: 2
    },
    {
      id: 'en_l_a1_2_ex3',
      lesson_id: 'en_l_a1_2',
      type: 'matching',
      prompt: 'Match countries with their nationalities:',
      target_text: 'Vietnam,England,Japan,France',
      target_audio_text: 'Vietnam, England, Japan, France',
      phonetic: 'Countries and Nationalities',
      vietnamese_meaning: 'Quốc gia và Quốc tịch A1',
      options_json: JSON.stringify({
        pairs: [
          { left: 'Vietnam', right: 'Vietnamese' },
          { left: 'England', right: 'English' },
          { left: 'Japan', right: 'Japanese' },
          { left: 'France', right: 'French' }
        ]
      }),
      correct_answer: 'MATCH_PAIRS',
      hint: 'Ghép cặp quốc gia và người/tiếng nước đó',
      stroke_char: null,
      order_index: 3
    },

    // ----------------------------------------------------
    // 13. en_l_a1_3: Checkpoint: Basic Greetings
    // ----------------------------------------------------
    {
      id: 'en_l_a1_3_ex1',
      lesson_id: 'en_l_a1_3',
      type: 'listening',
      prompt: 'Listen and choose the appropriate polite response to "Nice to meet you":',
      target_text: 'Nice to meet you, too!',
      target_audio_text: 'Nice to meet you, too!',
      phonetic: '/naɪs tuː miːt juː tuː/',
      vietnamese_meaning: 'Rất vui được gặp bạn!',
      options_json: JSON.stringify(['Nice to meet you, too!', 'Goodbye!', 'See you tomorrow.', 'I am sorry.']),
      correct_answer: 'Nice to meet you, too!',
      hint: 'Thêm từ "too" vào cuối câu để đáp lại sự chào đón',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'en_l_a1_3_ex2',
      lesson_id: 'en_l_a1_3',
      type: 'translation',
      prompt: 'Arrange words into: "Hello, my name is Alex and I am a student":',
      target_text: 'Hello, my name is Alex and I am a student.',
      target_audio_text: 'Hello, my name is Alex and I am a student.',
      phonetic: '/həˈləʊ maɪ neɪm ɪz ˈælɪks ænd aɪ æm ə ˈstjuːdənt/',
      vietnamese_meaning: 'Xin chào, tên tôi là Alex và tôi là một sinh viên.',
      options_json: JSON.stringify(['Hello', 'my', 'name', 'is', 'Alex', 'and', 'I', 'am', 'a', 'student']),
      correct_answer: 'Hello my name is Alex and I am a student',
      hint: 'Ghép câu hoàn chỉnh giới thiệu bản thân',
      stroke_char: null,
      order_index: 2
    },

    // ----------------------------------------------------
    // 14. en_a2_l4: Shopping: Prices & Bargaining
    // ----------------------------------------------------
    {
      id: 'en_a2_l4_ex1',
      lesson_id: 'en_a2_l4',
      type: 'listening',
      prompt: 'Listen and choose the meaning of "How much does this cost?":',
      target_text: 'How much does this cost?',
      target_audio_text: 'How much does this cost?',
      phonetic: '/haʊ mʌtʃ dʌz ðɪs kɒst/',
      vietnamese_meaning: 'Cái này giá bao nhiêu tiền?',
      options_json: JSON.stringify(['Cái này giá bao nhiêu tiền?', 'Bạn có giảm giá không?', 'Cửa hàng mấy giờ đóng cửa?', 'Tôi muốn đổi chiếc áo này.']),
      correct_answer: 'Cái này giá bao nhiêu tiền?',
      hint: 'How much = bao nhiêu tiền',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'en_a2_l4_ex2',
      lesson_id: 'en_a2_l4',
      type: 'speaking',
      prompt: 'Press Mic and politely ask for a discount:',
      target_text: 'Could you give me a discount, please?',
      target_audio_text: 'Could you give me a discount, please?',
      phonetic: '/kʊd juː ɡɪv miː ə ˈdɪskaʊnt pliːz/',
      vietnamese_meaning: 'Bạn có thể giảm giá cho tôi một chút được không?',
      options_json: JSON.stringify([]),
      correct_answer: 'Could you give me a discount, please?',
      hint: 'Discount = giảm giá, Could you = lời đề nghị lịch sự',
      stroke_char: null,
      order_index: 2
    },

    // ----------------------------------------------------
    // 15. en_b1_l2: Writing a Professional Email
    // ----------------------------------------------------
    {
      id: 'en_b1_l2_ex1',
      lesson_id: 'en_b1_l2',
      type: 'listening',
      prompt: 'Listen to the formal email opening and choose its meaning:',
      target_text: 'I am writing to inquire about the project deadline.',
      target_audio_text: 'I am writing to inquire about the project deadline.',
      phonetic: '/aɪ æm ˈraɪtɪŋ tuː ɪnˈkwaɪər əˈbaʊt ðə ˈprɒdʒɛkt ˈdɛdlaɪn/',
      vietnamese_meaning: 'Tôi viết thư này để hỏi thăm về thời hạn của dự án.',
      options_json: JSON.stringify([
        'Tôi viết thư này để hỏi thăm về thời hạn của dự án.',
        'Tôi xin thông báo rằng dự án đã hoàn thành.',
        'Vui lòng dời lịch cuộc họp sang thứ Sáu tới.',
        'Tôi muốn nộp đơn xin ứng tuyển vị trí này.'
      ]),
      correct_answer: 'Tôi viết thư này để hỏi thăm về thời hạn của dự án.',
      hint: 'Inquire = hỏi thăm tìm hiểu, deadline = hạn chót',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'en_b1_l2_ex2',
      lesson_id: 'en_b1_l2',
      type: 'speaking',
      prompt: 'Press Mic and speak the professional closing sentence:',
      target_text: 'I look forward to hearing from you soon.',
      target_audio_text: 'I look forward to hearing from you soon.',
      phonetic: '/aɪ lʊk ˈfɔːwəd tuː ˈhɪərɪŋ frɒm juː suːn/',
      vietnamese_meaning: 'Tôi rất mong sớm nhận được phản hồi từ bạn.',
      options_json: JSON.stringify([]),
      correct_answer: 'I look forward to hearing from you soon.',
      hint: 'Look forward to + V-ing = rất mong chờ điều gì',
      stroke_char: null,
      order_index: 2
    },

    // ----------------------------------------------------
    // 16. en_b1_l4: Reading: Main Idea & Key Details
    // ----------------------------------------------------
    {
      id: 'en_b1_l4_ex1',
      lesson_id: 'en_b1_l4',
      type: 'listening',
      prompt: 'Listen to the topic sentence and identify the main argument:',
      target_text: 'Regular exercise not only boosts physical health but also improves mental clarity.',
      target_audio_text: 'Regular exercise not only boosts physical health but also improves mental clarity.',
      phonetic: '/ˈrɛɡjʊlər ˈɛksəsaɪz nɒt ˈəʊnli buːsts ˈfɪzɪkəl hɛlθ bʌt ˈɔːlsəʊ ɪmˈpruːvz ˈmɛntəl ˈklærɪti/',
      vietnamese_meaning: 'Tập thể dục đều đặn không chỉ nâng cao thể chất mà còn cải thiện sự minh mẫn tinh thần.',
      options_json: JSON.stringify([
        'Tập thể dục đều đặn đem lại lợi ích kép cho cả thể chất lẫn tinh thần.',
        'Chế độ ăn uống quan trọng hơn việc tập luyện thể thao hàng ngày.',
        'Sức khỏe tinh thần chỉ bị ảnh hưởng bởi áp lực công việc.',
        'Người trưởng thành nên chạy bộ ít nhất 30 phút mỗi tuần.'
      ]),
      correct_answer: 'Tập thể dục đều đặn đem lại lợi ích kép cho cả thể chất lẫn tinh thần.',
      hint: 'Not only... but also... = không những... mà còn...',
      stroke_char: null,
      order_index: 1
    },

    // ----------------------------------------------------
    // 17. en_b2_l3: Debate Skills: Argument & Counter-Argument
    // ----------------------------------------------------
    {
      id: 'en_b2_l3_ex1',
      lesson_id: 'en_b2_l3',
      type: 'listening',
      prompt: 'Listen and choose the formal transition used to introduce a concession:',
      target_text: 'While the economic benefits are undeniable, environmental costs must not be overlooked.',
      target_audio_text: 'While the economic benefits are undeniable, environmental costs must not be overlooked.',
      phonetic: '/waɪl ðiː ˌiːkəˈnɒmɪk ˈbɛnɪfɪts ɑːr ˌʌndɪˈnaɪəbəl, ɪnˌvaɪrənˈmɛntəl kɒsts mʌst nɒt biː ˌəʊvəˈlʊkt/',
      vietnamese_meaning: 'Mặc dù lợi ích kinh tế là không thể phủ nhận, nhưng cái giá phải trả về môi trường không được phép xem nhẹ.',
      options_json: JSON.stringify([
        'Mặc dù lợi ích kinh tế là không thể phủ nhận, nhưng cái giá về môi trường không thể xem nhẹ.',
        'Kinh tế và môi trường luôn phát triển song song hòa hợp.',
        'Lợi ích tài chính là mục tiêu quan trọng nhất của mọi dự án.',
        'Các nhà đầu tư cần ưu tiên lợi nhuận trước mắt.'
      ]),
      correct_answer: 'Mặc dù lợi ích kinh tế là không thể phủ nhận, nhưng cái giá về môi trường không thể xem nhẹ.',
      hint: 'Undeniable = không thể phủ nhận, overlooked = bị bỏ qua/xem nhẹ',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'en_b2_l3_ex2',
      lesson_id: 'en_b2_l3',
      type: 'speaking',
      prompt: 'Press Mic and articulate this critical debate statement:',
      target_text: 'On the contrary, empirical evidence strongly suggests the opposite conclusion.',
      target_audio_text: 'On the contrary, empirical evidence strongly suggests the opposite conclusion.',
      phonetic: '/ɒn ðə ˈkɒntrəri, ɪmˈpɪrɪkəl ˈɛvɪdəns ˈstrɒŋli səˈdʒɛsts ði ˈɒpəzɪt kənˈkluːʒən/',
      vietnamese_meaning: 'Trái lại, bằng chứng thực nghiệm lại chỉ ra kết luận hoàn toàn ngược lại.',
      options_json: JSON.stringify([]),
      correct_answer: 'On the contrary, empirical evidence strongly suggests the opposite conclusion.',
      hint: 'Empirical evidence = bằng chứng thực nghiệm, on the contrary = trái lại',
      stroke_char: null,
      order_index: 2
    },

    // ----------------------------------------------------
    // 18. en_c1_l2: Listening to Complex Arguments
    // ----------------------------------------------------
    {
      id: 'en_c1_l2_ex1',
      lesson_id: 'en_c1_l2',
      type: 'listening',
      prompt: 'Listen to the academic discourse and evaluate the underlying assumption:',
      target_text: 'Technological acceleration often outpaces the regulatory frameworks designed to govern it.',
      target_audio_text: 'Technological acceleration often outpaces the regulatory frameworks designed to govern it.',
      phonetic: '/ˌtɛknəˈlɒdʒɪkəl əkˌsɛləˈreɪʃən ˈɒfən aʊtˈpeɪsɪz ðə ˈrɛɡjʊlətəri ˈfreɪmwɜːks dɪˈzaɪnd tuː ˈɡʌvən ɪt/',
      vietnamese_meaning: 'Tốc độ tăng tốc công nghệ thường vượt xa các khung pháp lý quản lý được thiết kế để điều chỉnh nó.',
      options_json: JSON.stringify([
        'Tốc độ tăng tốc công nghệ thường vượt xa các khung pháp lý quản lý được thiết kế để điều chỉnh nó.',
        'Luật pháp luôn chủ động định hình hướng đi của các phát minh công nghệ.',
        'Công nghệ và pháp lý luôn đồng bộ một cách tự nhiên trong xã hội hiện đại.',
        'Các cơ quan quản lý cần làm chậm lại sự phát triển của công nghệ.'
      ]),
      correct_answer: 'Tốc độ tăng tốc công nghệ thường vượt xa các khung pháp lý quản lý được thiết kế để điều chỉnh nó.',
      hint: 'Outpace = vượt mặt chạy nhanh hơn, regulatory frameworks = khung pháp lý',
      stroke_char: null,
      order_index: 1
    },
    {
      id: 'en_c1_l2_ex2',
      lesson_id: 'en_c1_l2',
      type: 'speaking',
      prompt: 'Press Mic and speak the academic conclusion with natural intonation:',
      target_text: 'Consequently, proactive interdisciplinary dialogue is paramount to mitigating systemic risks.',
      target_audio_text: 'Consequently, proactive interdisciplinary dialogue is paramount to mitigating systemic risks.',
      phonetic: '/ˈkɒnsɪkwəntli, prəʊˈæktɪv ˌɪntədɪsɪˈplɪnəri ˈdaɪəlɒɡ ɪz ˈpærəmaʊnt tuː ˈmɪtɪɡeɪtɪŋ sɪsˈtɛmɪk rɪsks/',
      vietnamese_meaning: 'Do đó, đối thoại liên ngành chủ động là điều tối quan trọng để giảm thiểu các rủi ro mang tính hệ thống.',
      options_json: JSON.stringify([]),
      correct_answer: 'Consequently, proactive interdisciplinary dialogue is paramount to mitigating systemic risks.',
      hint: 'Interdisciplinary = liên ngành, paramount = tối thượng, mitigate = giảm thiểu',
      stroke_char: null,
      order_index: 2
    }
  ];

  const runEnrich = db.transaction(() => {
    let count = 0;
    for (const ex of exercises) {
      insertExercise.run(
        ex.id,
        ex.lesson_id,
        ex.type,
        ex.prompt,
        ex.target_text,
        ex.target_audio_text,
        ex.phonetic,
        ex.vietnamese_meaning,
        ex.options_json,
        ex.correct_answer,
        ex.hint,
        ex.stroke_char,
        ex.order_index
      );
      count++;
    }
    return count;
  });

  const inserted = runEnrich();
  console.log(`✅ [Enrich] Successfully enriched ${inserted} exercises across all previously empty lessons!`);
}

module.exports = enrichCurriculum;

if (require.main === module) {
  enrichCurriculum();
}
