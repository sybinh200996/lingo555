/**
 * seedDataExpanded.js
 * Mở rộng dữ liệu bài học cho HSK2-6 (Tiếng Trung) và A2-C2 (Tiếng Anh)
 * Mỗi cấp độ có: Units → Lessons → Exercises (nghe, nói, đọc, viết)
 */

const db = require('./database');

function seedExpandedData(force = false) {
  console.log('🌱 [Expanded] Checking expanded seed data...');

  const levelCheck = db.prepare("SELECT COUNT(*) as count FROM levels WHERE id = 'zh_hsk3'").get();
  if (!force && levelCheck.count > 0) {
    const exCheck = db.prepare("SELECT COUNT(*) as count FROM exercises WHERE lesson_id LIKE 'zh_h2_%'").get();
    if (exCheck.count >= 10) {
      console.log('Expanded data already seeded. Skipping.');
      return;
    }
  }

  console.log('📚 Populating expanded curriculum: HSK2-6 & A2-C2...');

  const insertLevel = db.prepare(`
    INSERT OR REPLACE INTO levels (id, language_id, code, title, subtitle, color, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertUnit = db.prepare(`
    INSERT OR REPLACE INTO units (id, level_id, unit_number, title, description, icon, banner_color)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertLesson = db.prepare(`
    INSERT OR REPLACE INTO lessons (id, unit_id, lesson_number, title, description, xp_reward, type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const insertExercise = db.prepare(`
    INSERT OR REPLACE INTO exercises (
      id, lesson_id, type, prompt, target_text, target_audio_text,
      phonetic, vietnamese_meaning, options_json, correct_answer, hint, stroke_char, order_index
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertVocab = db.prepare(`
    INSERT OR IGNORE INTO vocabularies (
      language_id, word, traditional, phonetic, han_viet, meaning, part_of_speech, level, category, radical, stroke_count, example_target, example_phonetic, example_meaning, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const runExpanded = db.transaction(() => {

    // ============================================================
    // CHINESE LEVELS: HSK2 - HSK6
    // ============================================================

    insertLevel.run('zh_hsk2', 'zh', 'HSK2', 'HSK 2 - Sơ Cấp', '300 từ vựng giao tiếp hàng ngày, hỏi đường và thời tiết', '#8b5cf6', 3);
    insertLevel.run('zh_hsk3', 'zh', 'HSK3', 'HSK 3 - Trung Cấp', '600 từ vựng biểu đạt cảm xúc, du lịch, ẩm thực', '#ec4899', 4);
    insertLevel.run('zh_hsk4', 'zh', 'HSK4', 'HSK 4 - Trung Cao Cấp', '1200 từ vựng bàn luận công việc, văn hóa, giải trí', '#f59e0b', 5);
    insertLevel.run('zh_hsk5', 'zh', 'HSK5', 'HSK 5 - Cao Cấp', '2500 từ vựng đọc báo, viết luận, thuyết trình', '#ef4444', 6);
    insertLevel.run('zh_hsk6', 'zh', 'HSK6', 'HSK 6 - Thành Thạo', '5000+ từ vựng chuyên ngành, văn học, học thuật', '#dc2626', 7);

    // ============================================================
    // ENGLISH LEVELS: A2 - C2
    // ============================================================

    insertLevel.run('en_a2', 'en', 'A2', 'A2 - Elementary (Sơ Cấp)', 'Giao tiếp du lịch, đặt phòng khách sạn, gọi món nhà hàng', '#3b82f6', 3);
    insertLevel.run('en_b1', 'en', 'B1', 'B1 - Intermediate (Trung Cấp)', 'Phỏng vấn công việc, viết email, bày tỏ quan điểm', '#8b5cf6', 4);
    insertLevel.run('en_b2', 'en', 'B2', 'B2 - Upper Intermediate (Cao Cấp)', 'Thuyết trình chuyên sâu, tranh luận xã hội và học thuật', '#f59e0b', 5);
    insertLevel.run('en_c1', 'en', 'C1', 'C1 - Advanced (Thành Thạo)', 'Tiếng Anh học thuật, IELTS 7.0+, viết nghiên cứu', '#ef4444', 6);
    insertLevel.run('en_c2', 'en', 'C2', 'C2 - Proficiency (Chuyên Nghiệp)', 'Trình độ bản ngữ, văn học, pháp lý, y khoa', '#dc2626', 7);

    // ============================================================
    // HSK2 UNITS & LESSONS
    // ============================================================

    insertUnit.run('zh_u1_hsk2', 'zh_hsk2', 1, 'Gia Đình & Các Mối Quan Hệ', 'Nói về gia đình, nghề nghiệp và cuộc sống hàng ngày', 'Heart', '#8b5cf6');
    insertUnit.run('zh_u2_hsk2', 'zh_hsk2', 2, 'Thời Gian & Thời Tiết', 'Hỏi giờ, ngày tháng, mô tả thời tiết bốn mùa', 'Clock', '#7c3aed');
    insertUnit.run('zh_u3_hsk2', 'zh_hsk2', 3, 'Hỏi Đường & Phương Tiện', 'Chỉ đường, đi taxi, xe buýt và các địa điểm trong thành phố', 'MapPin', '#6d28d9');

    insertLesson.run('zh_h2_l1', 'zh_u1_hsk2', 1, 'Gia Đình: 家人 (jiārén)', 'Từ vựng về các thành viên trong gia đình và cách giới thiệu', 20, 'standard');
    insertLesson.run('zh_h2_l2', 'zh_u1_hsk2', 2, 'Nghề Nghiệp: 你做什么工作？', 'Hỏi và mô tả nghề nghiệp, nơi làm việc', 20, 'speaking');
    insertLesson.run('zh_h2_l3', 'zh_u1_hsk2', 3, 'Kiểm Tra Gia Đình & Nghề Nghiệp', 'Bài kiểm tra tổng hợp nghe nói đọc viết', 30, 'checkpoint');
    insertLesson.run('zh_h2_l4', 'zh_u2_hsk2', 1, 'Hỏi Giờ: 现在几点？(Mấy giờ rồi?)', 'Đọc đồng hồ và nói giờ bằng tiếng Trung', 20, 'standard');
    insertLesson.run('zh_h2_l5', 'zh_u2_hsk2', 2, 'Bốn Mùa & Thời Tiết: 春夏秋冬', 'Mô tả thời tiết và các mùa trong năm', 20, 'standard');
    insertLesson.run('zh_h2_l6', 'zh_u3_hsk2', 1, 'Hỏi Đường: 请问，去...怎么走？', 'Hỏi và chỉ đường đến các địa điểm', 25, 'standard');
    insertLesson.run('zh_h2_l7', 'zh_u3_hsk2', 2, 'Phương Tiện Giao Thông: 出租车，公共汽车', 'Từ vựng và câu hội thoại đi taxi và xe buýt', 25, 'speaking');

    // HSK2 EXERCISES - Lesson zh_h2_l1: Gia Đình
    insertExercise.run('zh_h2_l1_ex1', 'zh_h2_l1', 'listening',
      'Nghe và chọn nghĩa đúng của từ 妈妈 (māma):',
      '妈妈', '妈妈', 'māma', 'Mẹ, má',
      JSON.stringify(['Mẹ, má', 'Bố, ba', 'Anh trai', 'Em gái']),
      'Mẹ, má', '妈妈 = māma, chữ Hán bộ Nữ (女) nghĩa mẹ', null, 1);

    insertExercise.run('zh_h2_l1_ex2', 'zh_h2_l1', 'listening',
      'Nghe và chọn từ có nghĩa "Con trai":',
      '儿子', '儿子', 'érzi', 'Con trai',
      JSON.stringify(['儿子 (érzi)', '女儿 (nǚ\'ér)', '哥哥 (gēge)', '姐姐 (jiějie)']),
      '儿子 (érzi)', '儿 = con, 子 = con nhỏ', null, 2);

    insertExercise.run('zh_h2_l1_ex3', 'zh_h2_l1', 'speaking',
      'Nhấn Micro và nói câu giới thiệu gia đình:',
      '我家有四口人', '我家有四口人', 'wǒ jiā yǒu sì kǒu rén', 'Gia đình tôi có 4 người',
      JSON.stringify([]),
      '我家有四口人', '口 (kǒu) là từ đơn vị đếm thành viên gia đình', null, 3);

    insertExercise.run('zh_h2_l1_ex4', 'zh_h2_l1', 'matching',
      'Ghép từ thành viên gia đình với tiếng Việt:',
      '爸爸,妈妈,哥哥,妹妹', 'bàba māma gēge mèimei', 'Gia đình', 'Thành viên gia đình',
      JSON.stringify({
        pairs: [
          { left: '爸爸 (bàba)', right: 'Bố, ba' },
          { left: '妈妈 (māma)', right: 'Mẹ, má' },
          { left: '哥哥 (gēge)', right: 'Anh trai' },
          { left: '妹妹 (mèimei)', right: 'Em gái' }
        ]
      }),
      'MATCH_PAIRS', 'Phân biệt哥哥 (anh) và弟弟 (em)', null, 4);

    insertExercise.run('zh_h2_l1_ex5', 'zh_h2_l1', 'translation',
      'Dịch sang tiếng Trung: "Anh ấy là anh trai tôi":',
      '他是我哥哥', '他是我哥哥', 'tā shì wǒ gēge', 'Anh ấy là anh trai tôi',
      JSON.stringify(['他', '是', '我', '哥哥', '姐姐', '弟弟']),
      '他 是 我 哥哥', '他 = anh ấy/ông ấy, 是 = là', null, 5);

    // HSK2 EXERCISES - Lesson zh_h2_l2: Nghề Nghiệp
    insertExercise.run('zh_h2_l2_ex1', 'zh_h2_l2', 'listening',
      'Nghe và chọn nghề nghiệp: 医生 (yīshēng) có nghĩa là:',
      '医生', '医生', 'yīshēng', 'Bác sĩ',
      JSON.stringify(['Bác sĩ', 'Giáo viên', 'Kỹ sư', 'Luật sư']),
      'Bác sĩ', '医 = y tế, 生 = người học/bác sĩ', null, 1);

    insertExercise.run('zh_h2_l2_ex2', 'zh_h2_l2', 'speaking',
      'Nhấn Micro và trả lời câu hỏi: 你做什么工作？(Bạn làm gì?)',
      '我是老师', '我是老师', 'wǒ shì lǎoshī', 'Tôi là giáo viên',
      JSON.stringify([]),
      '我是老师', '老师 = lǎoshī (giáo viên), phổ biến nhất trong HSK2', null, 2);

    insertExercise.run('zh_h2_l2_ex3', 'zh_h2_l2', 'matching',
      'Ghép nghề nghiệp với tiếng Việt:',
      '老师,学生,医生,工程师', 'lǎoshī xuéshēng yīshēng gōngchéngshī', 'Nghề nghiệp', 'Từ vựng nghề nghiệp',
      JSON.stringify({
        pairs: [
          { left: '老师 (lǎoshī)', right: 'Giáo viên' },
          { left: '学生 (xuéshēng)', right: 'Học sinh/Sinh viên' },
          { left: '医生 (yīshēng)', right: 'Bác sĩ' },
          { left: '工程师 (gōngchéngshī)', right: 'Kỹ sư' }
        ]
      }),
      'MATCH_PAIRS', '工程师 = kỹ sư, 3 chữ Hán ghép lại', null, 3);

    insertExercise.run('zh_h2_l2_ex4', 'zh_h2_l2', 'translation',
      'Dịch câu sau sang tiếng Trung: "Anh ấy làm việc ở bệnh viện":',
      '他在医院工作', '他在医院工作', 'tā zài yīyuàn gōngzuò', 'Anh ấy làm việc ở bệnh viện',
      JSON.stringify(['他', '在', '医院', '工作', '学校', '公司']),
      '他 在 医院 工作', '在 = ở/tại, 医院 = bệnh viện', null, 4);

    // HSK2 - Lesson zh_h2_l4: Hỏi Giờ
    insertExercise.run('zh_h2_l4_ex1', 'zh_h2_l4', 'listening',
      'Nghe và chọn đáp án đúng: 现在几点？(Mấy giờ rồi?)',
      '现在两点半', '现在两点半', 'xiànzài liǎng diǎn bàn', 'Bây giờ là 2 giờ 30 phút',
      JSON.stringify(['Bây giờ là 2 giờ 30 phút', 'Bây giờ là 3 giờ', 'Bây giờ là 12 giờ', 'Bây giờ là 6 giờ 15 phút']),
      'Bây giờ là 2 giờ 30 phút', '两点半 = 2 giờ rưỡi (半 = nửa = 30 phút)', null, 1);

    insertExercise.run('zh_h2_l4_ex2', 'zh_h2_l4', 'speaking',
      'Nhìn đồng hồ (9:15) và nói bằng tiếng Trung:',
      '九点十五分', '九点十五分', 'jiǔ diǎn shíwǔ fēn', '9 giờ 15 phút',
      JSON.stringify([]),
      '九点十五分', 'Cấu trúc: [Số giờ] 点 [Số phút] 分', null, 2);

    insertExercise.run('zh_h2_l4_ex3', 'zh_h2_l4', 'matching',
      'Ghép giờ tiếng Trung với giờ tương ứng:',
      '三点,六点半,十二点,八点十分', 'sān diǎn liù diǎn bàn', 'Giờ giấc', 'Hỏi giờ',
      JSON.stringify({
        pairs: [
          { left: '三点 (sān diǎn)', right: '3:00' },
          { left: '六点半 (liù diǎn bàn)', right: '6:30' },
          { left: '十二点 (shí\'èr diǎn)', right: '12:00' },
          { left: '八点十分 (bā diǎn shí fēn)', right: '8:10' }
        ]
      }),
      'MATCH_PAIRS', '半 = rưỡi = 30 phút, 刻 = 15 phút', null, 3);

    // HSK2 - Lesson zh_h2_l5: Thời Tiết
    insertExercise.run('zh_h2_l5_ex1', 'zh_h2_l5', 'listening',
      'Nghe và chọn nghĩa đúng: 今天天气怎么样？',
      '今天天气怎么样', '今天天气怎么样', 'jīntiān tiānqì zěnme yàng', 'Hôm nay thời tiết thế nào?',
      JSON.stringify(['Hôm nay thời tiết thế nào?', 'Hôm nay mấy giờ?', 'Ngày mai bạn đi đâu?', 'Mùa nào đẹp nhất?']),
      'Hôm nay thời tiết thế nào?', '天气 = thời tiết, 怎么样 = như thế nào', null, 1);

    insertExercise.run('zh_h2_l5_ex2', 'zh_h2_l5', 'speaking',
      'Nhấn Micro và nói câu: Hôm nay trời lạnh lắm:',
      '今天很冷', '今天很冷', 'jīntiān hěn lěng', 'Hôm nay rất lạnh',
      JSON.stringify([]),
      '今天很冷', '冷 = lạnh, 热 = nóng, 凉快 = mát mẻ', null, 2);

    insertExercise.run('zh_h2_l5_ex3', 'zh_h2_l5', 'matching',
      'Ghép từ thời tiết với nghĩa tiếng Việt:',
      '晴,雨,雪,风', 'qíng yǔ xuě fēng', 'Thời tiết', 'Từ vựng thời tiết',
      JSON.stringify({
        pairs: [
          { left: '晴 (qíng)', right: 'Trời nắng, quang đãng' },
          { left: '雨 (yǔ)', right: 'Mưa' },
          { left: '雪 (xuě)', right: 'Tuyết' },
          { left: '风 (fēng)', right: 'Gió' }
        ]
      }),
      'MATCH_PAIRS', '下雨 = trời mưa, 下雪 = trời tuyết', null, 3);

    insertExercise.run('zh_h2_l5_ex4', 'zh_h2_l5', 'translation',
      'Dịch câu sau sang tiếng Trung: "Mùa xuân ở Hà Nội rất đẹp":',
      '河内的春天很美', '河内的春天很美', 'Hénèi de chūntiān hěn měi', 'Hà Nội mùa xuân rất đẹp',
      JSON.stringify(['河内', '的', '春天', '很', '美', '夏天', '秋天']),
      '河内 的 春天 很 美', '春天 = mùa xuân, 的 = trợ từ sở hữu', null, 4);

    // HSK2 - Lesson zh_h2_l6: Hỏi Đường
    insertExercise.run('zh_h2_l6_ex1', 'zh_h2_l6', 'listening',
      'Nghe và chọn nghĩa câu: 请问，银行在哪里？',
      '银行在哪里', '请问，银行在哪里？', 'qǐngwèn, yínháng zài nǎlǐ?', 'Xin hỏi, ngân hàng ở đâu?',
      JSON.stringify(['Xin hỏi, ngân hàng ở đâu?', 'Xin hỏi, bưu điện ở đâu?', 'Siêu thị cách đây bao xa?', 'Khách sạn ở phố này không?']),
      'Xin hỏi, ngân hàng ở đâu?', '银行 = ngân hàng, 哪里 = ở đâu', null, 1);

    insertExercise.run('zh_h2_l6_ex2', 'zh_h2_l6', 'speaking',
      'Hỏi đường đến bệnh viện bằng tiếng Trung:',
      '请问，医院怎么走？', '请问，医院怎么走？', 'qǐngwèn, yīyuàn zěnme zǒu?', 'Xin hỏi, đường đến bệnh viện đi thế nào?',
      JSON.stringify([]),
      '请问，医院怎么走？', '怎么走 = đi thế nào (hỏi đường)', null, 2);

    insertExercise.run('zh_h2_l6_ex3', 'zh_h2_l6', 'matching',
      'Ghép chỉ đường với nghĩa tiếng Việt:',
      '左转,右转,直走,对面', 'zuǒ zhuǎn yòu zhuǎn zhí zǒu duìmiàn', 'Chỉ đường', 'Hỏi đường',
      JSON.stringify({
        pairs: [
          { left: '左转 (zuǒ zhuǎn)', right: 'Rẽ trái' },
          { left: '右转 (yòu zhuǎn)', right: 'Rẽ phải' },
          { left: '直走 (zhí zǒu)', right: 'Đi thẳng' },
          { left: '对面 (duìmiàn)', right: 'Đối diện, phía trước' }
        ]
      }),
      'MATCH_PAIRS', '左 = trái, 右 = phải - nhớ bằng cách nhìn hình chữ', null, 3);

    // ============================================================
    // HSK3 UNITS & LESSONS
    // ============================================================

    insertUnit.run('zh_u1_hsk3', 'zh_hsk3', 1, 'Cảm Xúc & Tâm Trạng', 'Biểu đạt cảm xúc vui buồn, thích ghét, lo lắng', 'Smile', '#ec4899');
    insertUnit.run('zh_u2_hsk3', 'zh_hsk3', 2, 'Du Lịch & Ẩm Thực', 'Đặt vé máy bay, gọi món ăn tại nhà hàng Trung Hoa', 'Plane', '#db2777');
    insertUnit.run('zh_u3_hsk3', 'zh_hsk3', 3, 'Sức Khỏe & Bệnh Tật', 'Mô tả triệu chứng, đi khám bác sĩ và mua thuốc', 'Heart', '#be185d');

    insertLesson.run('zh_h3_l1', 'zh_u1_hsk3', 1, 'Cảm Xúc: 高兴，难过，害怕', 'Học cách diễn đạt trạng thái cảm xúc cơ bản', 25, 'standard');
    insertLesson.run('zh_h3_l2', 'zh_u1_hsk3', 2, 'Thích & Không Thích: 喜欢 vs 不喜欢', 'Bày tỏ sở thích về ẩm thực, thể thao và âm nhạc', 25, 'speaking');
    insertLesson.run('zh_h3_l3', 'zh_u2_hsk3', 1, 'Tại Nhà Hàng: 点菜 (Gọi món)', 'Đọc thực đơn, gọi món và yêu cầu hóa đơn', 30, 'standard');
    insertLesson.run('zh_h3_l4', 'zh_u2_hsk3', 2, 'Đặt Vé & Khách Sạn', 'Đặt vé tàu, máy bay và phòng khách sạn qua điện thoại', 30, 'speaking');
    insertLesson.run('zh_h3_l5', 'zh_u3_hsk3', 1, 'Đi Khám Bác Sĩ: 我头疼 (Tôi đau đầu)', 'Mô tả triệu chứng bệnh và hiểu toa thuốc', 30, 'standard');

    // HSK3 EXERCISES - zh_h3_l1: Cảm Xúc
    insertExercise.run('zh_h3_l1_ex1', 'zh_h3_l1', 'listening',
      'Nghe và chọn nghĩa đúng: 我很高兴 (wǒ hěn gāoxìng):',
      '我很高兴', '我很高兴', 'wǒ hěn gāoxìng', 'Tôi rất vui',
      JSON.stringify(['Tôi rất vui', 'Tôi rất buồn', 'Tôi rất lo lắng', 'Tôi rất mệt']),
      'Tôi rất vui', '高兴 = gāoxìng = vui mừng, hạnh phúc', null, 1);

    insertExercise.run('zh_h3_l1_ex2', 'zh_h3_l1', 'speaking',
      'Nhấn Micro và diễn đạt cảm xúc: "Tôi rất buồn hôm nay":',
      '我今天很难过', '我今天很难过', 'wǒ jīntiān hěn nánguò', 'Tôi hôm nay rất buồn',
      JSON.stringify([]),
      '我今天很难过', '难过 = nánguò = buồn khổ, khó chịu trong lòng', null, 2);

    insertExercise.run('zh_h3_l1_ex3', 'zh_h3_l1', 'matching',
      'Ghép cảm xúc với nghĩa tiếng Việt:',
      '高兴,难过,害怕,生气', 'gāoxìng nánguò hàipà shēngqì', 'Cảm xúc', 'Từ vựng cảm xúc',
      JSON.stringify({
        pairs: [
          { left: '高兴 (gāoxìng)', right: 'Vui vẻ, hạnh phúc' },
          { left: '难过 (nánguò)', right: 'Buồn bã, khổ tâm' },
          { left: '害怕 (hàipà)', right: 'Sợ hãi, lo sợ' },
          { left: '生气 (shēngqì)', right: 'Tức giận, nổi giận' }
        ]
      }),
      'MATCH_PAIRS', '生气 nghĩa đen là "sinh khí" nhưng nghĩa thực là tức giận', null, 3);

    insertExercise.run('zh_h3_l1_ex4', 'zh_h3_l1', 'translation',
      'Dịch sang tiếng Trung: "Con bé rất sợ tiếng sét":',
      '小女孩很害怕雷声', '小女孩很害怕雷声', 'xiǎo nǚhái hěn hàipà léishēng', 'Con bé rất sợ tiếng sét',
      JSON.stringify(['小女孩', '很', '害怕', '雷声', '生气', '高兴', '妈妈']),
      '小女孩 很 害怕 雷声', '雷声 = léishēng = tiếng sấm sét', null, 4);

    // HSK3 - zh_h3_l3: Tại Nhà Hàng
    insertExercise.run('zh_h3_l3_ex1', 'zh_h3_l3', 'listening',
      'Nghe và chọn câu đúng khi gọi món ăn:',
      '我要一碗米饭和一盘炒青菜', '我要一碗米饭和一盘炒青菜', 'wǒ yào yī wǎn mǐfàn hé yī pán chǎo qīngcài', 'Tôi muốn một bát cơm và một đĩa rau xào',
      JSON.stringify(['Tôi muốn một bát cơm và một đĩa rau xào', 'Tôi muốn hai phần phở và một ly nước', 'Cho tôi hỏi thực đơn có gì?', 'Tính tiền cho tôi nhé']),
      'Tôi muốn một bát cơm và một đĩa rau xào', '碗 (wǎn) = cái bát, 盘 (pán) = cái đĩa', null, 1);

    insertExercise.run('zh_h3_l3_ex2', 'zh_h3_l3', 'speaking',
      'Nhấn Micro và gọi món: "Cho tôi một bát mì và hai chai nước":',
      '我要一碗面条和两瓶水', '我要一碗面条和两瓶水', 'wǒ yào yī wǎn miàntiáo hé liǎng píng shuǐ', 'Tôi muốn một bát mì và hai chai nước',
      JSON.stringify([]),
      '我要一碗面条和两瓶水', '瓶 (píng) = cái chai, 面条 = mì sợi', null, 2);

    insertExercise.run('zh_h3_l3_ex3', 'zh_h3_l3', 'matching',
      'Ghép từ vựng nhà hàng với nghĩa tiếng Việt:',
      '菜单,服务员,买单,小费', 'càidān fúwùyuán mǎidān xiǎofèi', 'Nhà hàng', 'Từ vựng nhà hàng',
      JSON.stringify({
        pairs: [
          { left: '菜单 (càidān)', right: 'Thực đơn, menu' },
          { left: '服务员 (fúwùyuán)', right: 'Nhân viên phục vụ' },
          { left: '买单 (mǎidān)', right: 'Tính tiền, thanh toán' },
          { left: '小费 (xiǎofèi)', right: 'Tiền tip, tiền thưởng' }
        ]
      }),
      'MATCH_PAIRS', '买单 hoặc 结账 (jiézhàng) đều có nghĩa tính tiền', null, 3);

    // HSK3 - zh_h3_l5: Sức Khỏe
    insertExercise.run('zh_h3_l5_ex1', 'zh_h3_l5', 'listening',
      'Nghe và chọn triệu chứng: 我肚子疼 (wǒ dùzi téng):',
      '肚子疼', '我肚子疼', 'wǒ dùzi téng', 'Tôi đau bụng',
      JSON.stringify(['Đau bụng', 'Đau đầu', 'Đau họng', 'Sốt cao']),
      'Đau bụng', '肚子 = bụng, 疼 = đau (cảm giác đau)', null, 1);

    insertExercise.run('zh_h3_l5_ex2', 'zh_h3_l5', 'speaking',
      'Nhấn Micro và nói với bác sĩ: "Tôi bị sốt và ho":',
      '我发烧而且咳嗽', '我发烧而且咳嗽', 'wǒ fāshāo érqiě késou', 'Tôi bị sốt và ho',
      JSON.stringify([]),
      '我发烧而且咳嗽', '发烧 = sốt, 咳嗽 = ho, 而且 = và còn', null, 2);

    insertExercise.run('zh_h3_l5_ex3', 'zh_h3_l5', 'matching',
      'Ghép triệu chứng với nghĩa tiếng Việt:',
      '头疼,发烧,咳嗽,过敏', 'tóuténg fāshāo késou guòmǐn', 'Sức khỏe', 'Triệu chứng bệnh',
      JSON.stringify({
        pairs: [
          { left: '头疼 (tóuténg)', right: 'Đau đầu' },
          { left: '发烧 (fāshāo)', right: 'Sốt' },
          { left: '咳嗽 (késou)', right: 'Ho' },
          { left: '过敏 (guòmǐn)', right: 'Dị ứng' }
        ]
      }),
      'MATCH_PAIRS', '头 = đầu, 疼/痛 = đau, 发 = phát ra', null, 3);

    // ============================================================
    // HSK4 UNITS & LESSONS
    // ============================================================

    insertUnit.run('zh_u1_hsk4', 'zh_hsk4', 1, 'Công Việc & Văn Phòng', 'Từ vựng và tình huống trong môi trường công sở', 'Briefcase', '#f59e0b');
    insertUnit.run('zh_u2_hsk4', 'zh_hsk4', 2, 'Văn Hóa & Phong Tục', 'Tết Nguyên Đán, lễ hội truyền thống và phong tục Trung Hoa', 'Star', '#d97706');
    insertUnit.run('zh_u3_hsk4', 'zh_hsk4', 3, 'Giải Trí & Sở Thích', 'Phim ảnh, âm nhạc, thể thao và du lịch trong nước', 'Music', '#b45309');

    insertLesson.run('zh_h4_l1', 'zh_u1_hsk4', 1, 'Phỏng Vấn Xin Việc: 面试 (Miànshì)', 'Chuẩn bị câu trả lời phỏng vấn bằng tiếng Trung', 35, 'speaking');
    insertLesson.run('zh_h4_l2', 'zh_u1_hsk4', 2, 'Viết Email Công Việc bằng Tiếng Trung', 'Cách viết email trang trọng, yêu cầu và phản hồi', 35, 'writing');
    insertLesson.run('zh_h4_l3', 'zh_u2_hsk4', 1, 'Tết Nguyên Đán: 春节习俗 (Phong Tục Tết)', 'Tìm hiểu về lì xì, bánh niên cao và các hoạt động tết', 35, 'standard');
    insertLesson.run('zh_h4_l4', 'zh_u3_hsk4', 1, 'Bàn Luận Phim & Âm Nhạc', 'Đưa ra ý kiến và đánh giá phim, bài hát yêu thích', 35, 'speaking');

    // HSK4 EXERCISES - zh_h4_l1: Phỏng Vấn
    insertExercise.run('zh_h4_l1_ex1', 'zh_h4_l1', 'listening',
      'Nghe và chọn câu trả lời phỏng vấn phù hợp khi được hỏi "你有什么优点？"(Ưu điểm của bạn là gì?):',
      '我工作认真，有责任心', '我工作认真，有责任心', 'wǒ gōngzuò rènzhēn, yǒu zérènxīn', 'Tôi làm việc chăm chỉ, có tinh thần trách nhiệm',
      JSON.stringify(['Tôi làm việc chăm chỉ, có tinh thần trách nhiệm', 'Tôi không biết làm gì', 'Tôi thích nghỉ ngơi', 'Tôi chưa có kinh nghiệm']),
      'Tôi làm việc chăm chỉ, có tinh thần trách nhiệm', '认真 = nghiêm túc, chăm chỉ; 责任心 = tinh thần trách nhiệm', null, 1);

    insertExercise.run('zh_h4_l1_ex2', 'zh_h4_l1', 'speaking',
      'Nhấn Micro và tự giới thiệu trong phỏng vấn bằng tiếng Trung:',
      '我叫李明，我有三年的工作经验', '我叫李明，我有三年的工作经验', 'wǒ jiào Lǐ Míng, wǒ yǒu sān nián de gōngzuò jīngyàn', 'Tôi tên Lý Minh, tôi có 3 năm kinh nghiệm làm việc',
      JSON.stringify([]),
      '我叫李明，我有三年的工作经验', '经验 = kinh nghiệm, 年 = năm', null, 2);

    insertExercise.run('zh_h4_l1_ex3', 'zh_h4_l1', 'matching',
      'Ghép từ vựng phỏng vấn với nghĩa:',
      '简历,面试,薪资,合同', 'jiǎnlì miànshì xīnzī hétong', 'Phỏng vấn', 'Từ vựng công việc',
      JSON.stringify({
        pairs: [
          { left: '简历 (jiǎnlì)', right: 'CV, hồ sơ xin việc' },
          { left: '面试 (miànshì)', right: 'Phỏng vấn' },
          { left: '薪资 (xīnzī)', right: 'Lương, mức lương' },
          { left: '合同 (hétong)', right: 'Hợp đồng' }
        ]
      }),
      'MATCH_PAIRS', '简历 (CV) là tài liệu quan trọng nhất khi xin việc', null, 3);

    // HSK4 - zh_h4_l3: Tết Nguyên Đán
    insertExercise.run('zh_h4_l3_ex1', 'zh_h4_l3', 'listening',
      'Nghe và chọn nghĩa câu chúc tết phổ biến nhất:',
      '新年快乐，万事如意！', '新年快乐，万事如意！', 'Xīnnián kuàilè, wànshì rúyì!', 'Chúc mừng năm mới, vạn sự như ý!',
      JSON.stringify(['Chúc mừng năm mới, vạn sự như ý!', 'Chúc bạn sức khỏe và hạnh phúc!', 'Cảm ơn lì xì đỏ!', 'Hẹn gặp lại năm sau!']),
      'Chúc mừng năm mới, vạn sự như ý!', '万事如意 = vạn sự như ý = mọi việc đều như mong muốn', null, 1);

    insertExercise.run('zh_h4_l3_ex2', 'zh_h4_l3', 'matching',
      'Ghép phong tục Tết với nghĩa tiếng Việt:',
      '红包,饺子,烟花,对联', 'hóngbāo jiǎozi yānhuā duìlián', 'Tết Nguyên Đán', 'Phong tục Tết',
      JSON.stringify({
        pairs: [
          { left: '红包 (hóngbāo)', right: 'Phong bì lì xì đỏ' },
          { left: '饺子 (jiǎozi)', right: 'Bánh há cảo (ăn Tết)' },
          { left: '烟花 (yānhuā)', right: 'Pháo hoa' },
          { left: '对联 (duìlián)', right: 'Câu đối đỏ trang trí' }
        ]
      }),
      'MATCH_PAIRS', '红包 hiện nay cũng là WeChat/Alipay digital payment', null, 2);

    // ============================================================
    // HSK5 UNITS & LESSONS
    // ============================================================

    insertUnit.run('zh_u1_hsk5', 'zh_hsk5', 1, 'Kinh Tế & Kinh Doanh', 'Thị trường chứng khoán, đầu tư, xuất nhập khẩu và khởi nghiệp', 'TrendingUp', '#ef4444');
    insertUnit.run('zh_u2_hsk5', 'zh_hsk5', 2, 'Đọc Báo & Thời Sự', 'Đọc hiểu bài báo, phân tích tin tức và thảo luận thời sự', 'Newspaper', '#dc2626');
    insertUnit.run('zh_u3_hsk5', 'zh_hsk5', 3, 'Viết Luận & Trình Bày', 'Cấu trúc bài luận, lập luận và viết báo cáo tiếng Trung', 'FileText', '#b91c1c');

    insertLesson.run('zh_h5_l1', 'zh_u1_hsk5', 1, 'Từ Vựng Kinh Doanh: 市场营销', 'Marketing, thương mại và đàm phán kinh doanh', 45, 'standard');
    insertLesson.run('zh_h5_l2', 'zh_u2_hsk5', 1, 'Đọc Hiểu Bài Báo Tiếng Trung', 'Kỹ thuật đọc nhanh và nắm ý chính từ bài báo', 50, 'reading');
    insertLesson.run('zh_h5_l3', 'zh_u3_hsk5', 1, 'Viết Luận Tiếng Trung: Cấu Trúc & Lập Luận', 'Mở bài, thân bài, kết luận và các liên từ nối câu', 50, 'writing');

    insertExercise.run('zh_h5_l1_ex1', 'zh_h5_l1', 'listening',
      'Nghe và chọn nghĩa đúng: 市场营销 (shìchǎng yíngxiāo):',
      '市场营销', '市场营销', 'shìchǎng yíngxiāo', 'Marketing, tiếp thị thị trường',
      JSON.stringify(['Marketing, tiếp thị thị trường', 'Kế toán tài chính', 'Quản lý nhân sự', 'Kiểm soát chất lượng']),
      'Marketing, tiếp thị thị trường', '市场 = thị trường, 营销 = kinh doanh/tiếp thị', null, 1);

    insertExercise.run('zh_h5_l1_ex2', 'zh_h5_l1', 'matching',
      'Ghép thuật ngữ kinh doanh với nghĩa:',
      '利润,投资,股票,品牌', 'lìrùn tóuzī gǔpiào pǐnpái', 'Kinh doanh', 'Từ vựng kinh doanh',
      JSON.stringify({
        pairs: [
          { left: '利润 (lìrùn)', right: 'Lợi nhuận' },
          { left: '投资 (tóuzī)', right: 'Đầu tư' },
          { left: '股票 (gǔpiào)', right: 'Cổ phiếu, chứng khoán' },
          { left: '品牌 (pǐnpái)', right: 'Thương hiệu' }
        ]
      }),
      'MATCH_PAIRS', '股票 thị trường chứng khoán = 股票市场 (gǔpiào shìchǎng)', null, 2);

    insertExercise.run('zh_h5_l1_ex3', 'zh_h5_l1', 'speaking',
      'Trình bày ý kiến bằng tiếng Trung về lợi ích của thương mại điện tử:',
      '电子商务让购物更加便捷', '电子商务让购物更加便捷', 'diànzǐ shāngwù ràng gòuwù gèngjiā biànjié', 'Thương mại điện tử làm cho việc mua sắm tiện lợi hơn',
      JSON.stringify([]),
      '电子商务让购物更加便捷', '电子商务 = e-commerce, 便捷 = tiện lợi, nhanh chóng', null, 3);

    // ============================================================
    // HSK6 UNITS & LESSONS
    // ============================================================

    insertUnit.run('zh_u1_hsk6', 'zh_hsk6', 1, 'Văn Học & Triết Học Trung Hoa', 'Thơ Đường, truyện ngắn hiện đại và tư tưởng Khổng Tử', 'BookOpen', '#dc2626');
    insertUnit.run('zh_u2_hsk6', 'zh_hsk6', 2, 'Ngôn Ngữ Học & Hán Ngữ Chuyên Sâu', 'Ngữ pháp nâng cao, thành ngữ, tục ngữ và câu ghép phức', 'Languages', '#b91c1c');

    insertLesson.run('zh_h6_l1', 'zh_u1_hsk6', 1, 'Thơ Đường: 静夜思 (Tư Đêm Yên Tĩnh) - Lý Bạch', 'Phân tích thơ cổ, cảm thụ văn học và ngữ nghĩa ẩn sâu', 60, 'reading');
    insertLesson.run('zh_h6_l2', 'zh_u2_hsk6', 1, 'Thành Ngữ 4 Chữ: 成语 (Chéngyǔ) Quan Trọng', '20 thành ngữ HSK6 phổ biến nhất với ví dụ thực tế', 60, 'standard');

    insertExercise.run('zh_h6_l1_ex1', 'zh_h6_l1', 'reading',
      'Đọc thơ và trả lời: Trong bài 静夜思, Lý Bạch đang nhớ đến điều gì khi nhìn ánh trăng?',
      '故乡', '床前明月光，疑是地上霜。举头望明月，低头思故乡。', 'chuáng qián míng yuè guāng...', 'Ánh trăng sáng trước giường, ngỡ là sương trên đất. Ngẩng đầu nhìn trăng sáng, cúi đầu nhớ quê hương.',
      JSON.stringify(['Quê hương', 'Người yêu', 'Bạn bè', 'Mùa đông lạnh giá']),
      'Quê hương', '故乡 = gùxiāng = quê hương, 思 = tư/nhớ', null, 1);

    insertExercise.run('zh_h6_l2_ex1', 'zh_h6_l2', 'listening',
      'Nghe thành ngữ 一石二鸟 (yī shí èr niǎo) và chọn nghĩa đúng:',
      '一石二鸟', '一石二鸟', 'yī shí èr niǎo', 'Một mũi tên trúng hai đích',
      JSON.stringify(['Một mũi tên trúng hai đích', 'Chim khôn chọn cành mà đậu', 'Chậm mà chắc', 'Nước chảy đá mòn']),
      'Một mũi tên trúng hai đích', 'Nghĩa đen: một hòn đá hạ hai con chim', null, 1);

    insertExercise.run('zh_h6_l2_ex2', 'zh_h6_l2', 'matching',
      'Ghép thành ngữ với nghĩa tiếng Việt tương đương:',
      '马到成功,半途而废,青出于蓝,实事求是', 'mǎ dào chénggōng...', 'Thành ngữ HSK6', 'Chéngyǔ',
      JSON.stringify({
        pairs: [
          { left: '马到成功 (mǎ dào chénggōng)', right: 'Thành công ngay lập tức' },
          { left: '半途而废 (bàntú ér fèi)', right: 'Bỏ cuộc giữa chừng' },
          { left: '青出于蓝 (qīng chū yú lán)', right: 'Trò giỏi hơn thầy' },
          { left: '实事求是 (shíshì qiúshì)', right: 'Thực tế khách quan, tìm sự thật' }
        ]
      }),
      'MATCH_PAIRS', '实事求是 là phương châm học thuật và nghiên cứu của Trung Quốc', null, 2);

    // ============================================================
    // ENGLISH A2 UNITS & LESSONS
    // ============================================================

    insertUnit.run('en_u1_a2', 'en_a2', 1, 'Travel & Accommodation', 'Book hotels, ask for directions and navigate airports', 'Plane', '#3b82f6');
    insertUnit.run('en_u2_a2', 'en_a2', 2, 'Food, Restaurants & Shopping', 'Order food, read menus and shop at markets', 'ShoppingCart', '#2563eb');
    insertUnit.run('en_u3_a2', 'en_a2', 3, 'Daily Routines & Health', 'Describe your daily schedule and talk about health', 'Clock', '#1d4ed8');

    insertLesson.run('en_a2_l1', 'en_u1_a2', 1, 'At the Airport: Check-in & Immigration', 'Essential airport vocabulary and conversations', 20, 'standard');
    insertLesson.run('en_a2_l2', 'en_u1_a2', 2, 'Booking a Hotel Room', 'Make reservations and describe room preferences', 20, 'speaking');
    insertLesson.run('en_a2_l3', 'en_u2_a2', 1, 'Ordering Food at a Restaurant', 'Read menus, ask about dishes and pay the bill', 25, 'standard');
    insertLesson.run('en_a2_l4', 'en_u2_a2', 2, 'Shopping: Prices & Bargaining', 'Ask about prices, sizes and make purchases', 25, 'speaking');
    insertLesson.run('en_a2_l5', 'en_u3_a2', 1, 'Daily Routine: Morning to Night', 'Describe your typical day using present simple', 20, 'standard');

    // A2 EXERCISES - en_a2_l1: Airport
    insertExercise.run('en_a2_l1_ex1', 'en_a2_l1', 'listening',
      'Listen and choose the correct meaning: "Could I see your boarding pass, please?"',
      'boarding pass', 'Could I see your boarding pass, please?', '/ˈbɔːdɪŋ pɑːs/', 'Thẻ lên máy bay',
      JSON.stringify(['Thẻ lên máy bay', 'Hộ chiếu', 'Thị thực (visa)', 'Thẻ căn cước']),
      'Thẻ lên máy bay', 'boarding pass = thẻ lên máy bay, cần xuất trình tại cổng máy bay', null, 1);

    insertExercise.run('en_a2_l1_ex2', 'en_a2_l1', 'speaking',
      'Press Mic: Tell the immigration officer where you are going:',
      "I'm traveling to London for tourism.", "I'm traveling to London for tourism.", '/aɪm ˈtrævəlɪŋ tuː ˈlʌndən fɔː ˈtʊərɪzəm/', 'Tôi đến London để du lịch.',
      JSON.stringify([]),
      "I'm traveling to London for tourism.", 'Use present continuous "I am traveling" for current trip', null, 2);

    insertExercise.run('en_a2_l1_ex3', 'en_a2_l1', 'matching',
      'Match airport vocabulary with Vietnamese meanings:',
      'departure, arrival, customs, gate', 'departure arrival customs gate', 'Airport vocabulary', 'Từ vựng sân bay',
      JSON.stringify({
        pairs: [
          { left: 'Departure', right: 'Khởi hành, xuất phát' },
          { left: 'Arrival', right: 'Đến nơi, hạ cánh' },
          { left: 'Customs', right: 'Hải quan' },
          { left: 'Gate', right: 'Cổng lên máy bay' }
        ]
      }),
      'MATCH_PAIRS', 'Check "arrivals" or "departures" board to find your flight', null, 3);

    insertExercise.run('en_a2_l1_ex4', 'en_a2_l1', 'translation',
      'Translate to English: "Hành lý của tôi bị mất":',
      'My luggage is lost.', 'My luggage is lost.', '/maɪ ˈlʌɡɪdʒ ɪz lɒst/', 'Hành lý của tôi bị mất',
      JSON.stringify(['My', 'luggage', 'is', 'lost', 'stolen', 'found', 'ticket']),
      'My luggage is lost', 'luggage/baggage = hành lý, lost = bị mất', null, 4);

    // A2 - en_a2_l2: Hotel
    insertExercise.run('en_a2_l2_ex1', 'en_a2_l2', 'listening',
      'Listen and choose what the guest is asking for:',
      'single room', "I'd like to book a single room for two nights, please.", '/aɪd laɪk tuː bʊk ə ˈsɪŋɡl ruːm/', 'Tôi muốn đặt phòng đơn trong 2 đêm.',
      JSON.stringify(['Phòng đơn 2 đêm', 'Phòng đôi 3 đêm', 'Phòng có view biển', 'Phòng khuyết tật']),
      'Phòng đơn 2 đêm', 'single room = phòng đơn, double room = phòng đôi', null, 1);

    insertExercise.run('en_a2_l2_ex2', 'en_a2_l2', 'speaking',
      'Press Mic: Book a double room for 3 nights:',
      "I'd like to book a double room for three nights.", "I'd like to book a double room for three nights.", '/aɪd laɪk tuː bʊk ə ˈdʌbl ruːm fɔː θriː naɪts/', 'Tôi muốn đặt phòng đôi 3 đêm.',
      JSON.stringify([]),
      "I'd like to book a double room for three nights.", "I'd like to... = Tôi muốn... (lịch sự hơn I want)", null, 2);

    insertExercise.run('en_a2_l2_ex3', 'en_a2_l2', 'matching',
      'Match hotel vocabulary with Vietnamese meanings:',
      'check-in, check-out, room service, reception', 'check-in check-out room service reception', 'Hotel', 'Từ vựng khách sạn',
      JSON.stringify({
        pairs: [
          { left: 'Check-in', right: 'Nhận phòng' },
          { left: 'Check-out', right: 'Trả phòng' },
          { left: 'Room service', right: 'Phục vụ tại phòng' },
          { left: 'Reception', right: 'Lễ tân' }
        ]
      }),
      'MATCH_PAIRS', 'Check-in time is usually 2pm, check-out at 12pm', null, 3);

    // A2 - en_a2_l3: Restaurant
    insertExercise.run('en_a2_l3_ex1', 'en_a2_l3', 'listening',
      'Listen and select the correct waiter response:',
      'Are you ready to order?', 'Are you ready to order?', '/ɑː juː ˈredi tuː ˈɔːdər/', 'Bạn đã sẵn sàng gọi món chưa?',
      JSON.stringify(['Bạn đã sẵn sàng gọi món chưa?', 'Bạn có muốn thêm gì không?', 'Hóa đơn đây!', 'Bàn của bạn ở đây']),
      'Bạn đã sẵn sàng gọi món chưa?', '"Are you ready to order?" = câu hỏi mà waiter hỏi khách', null, 1);

    insertExercise.run('en_a2_l3_ex2', 'en_a2_l3', 'speaking',
      'Press Mic: Order a burger and a cola:',
      "I'll have a burger and a cola, please.", "I'll have a burger and a cola, please.", '/aɪl hæv ə ˈbɜːɡər ænd ə ˈkoʊlə pliːz/', 'Cho tôi một cái burger và một ly cola.',
      JSON.stringify([]),
      "I'll have a burger and a cola, please.", "I'll have... = cách gọi món tự nhiên và lịch sự nhất", null, 2);

    insertExercise.run('en_a2_l3_ex3', 'en_a2_l3', 'matching',
      'Match restaurant phrases with Vietnamese meanings:',
      "I'd like..., Could I have..., The bill please, Enjoy your meal", '', 'Restaurant phrases', 'Cụm từ nhà hàng',
      JSON.stringify({
        pairs: [
          { left: "I'd like the pasta.", right: 'Tôi muốn gọi món mì Ý' },
          { left: 'Could I have the menu?', right: 'Cho tôi xem thực đơn được không?' },
          { left: 'The bill, please.', right: 'Cho tôi xin hóa đơn' },
          { left: 'Enjoy your meal!', right: 'Chúc ngon miệng!' }
        ]
      }),
      'MATCH_PAIRS', '"The bill please" = yêu cầu tính tiền ở Anh; "Check please" ở Mỹ', null, 3);

    // A2 - en_a2_l5: Daily Routine
    insertExercise.run('en_a2_l5_ex1', 'en_a2_l5', 'listening',
      'Listen and choose the correct daily routine order:',
      'wake up, brush teeth, have breakfast, go to work', 'I wake up, brush my teeth, have breakfast and go to work.', '/aɪ weɪk ʌp, brʌʃ maɪ tiːθ, hæv ˈbrekfəst ænd ɡoʊ tuː wɜːrk/', 'Tôi thức dậy, đánh răng, ăn sáng và đi làm.',
      JSON.stringify(['Thức dậy → Đánh răng → Ăn sáng → Đi làm', 'Đi làm → Ăn sáng → Đánh răng → Thức dậy', 'Ăn sáng → Thức dậy → Đi làm → Đánh răng', 'Đánh răng → Đi làm → Thức dậy → Ăn sáng']),
      'Thức dậy → Đánh răng → Ăn sáng → Đi làm', 'Present simple tense mô tả thói quen hàng ngày', null, 1);

    insertExercise.run('en_a2_l5_ex2', 'en_a2_l5', 'speaking',
      'Press Mic: Describe your morning routine in 1-2 sentences:',
      'I usually wake up at 7 and have breakfast before going to work.', 'I usually wake up at 7 and have breakfast before going to work.', '/aɪ ˈjuːʒuəli weɪk ʌp æt ˈsevən ænd hæv ˈbrekfəst bɪˈfɔːr ˈɡoʊɪŋ tuː wɜːrk/', 'Tôi thường thức dậy lúc 7 giờ và ăn sáng trước khi đi làm.',
      JSON.stringify([]),
      'I usually wake up at 7 and have breakfast before going to work.', 'Usually/always/often/sometimes = trạng từ chỉ tần suất', null, 2);

    // ============================================================
    // ENGLISH B1 UNITS & LESSONS
    // ============================================================

    insertUnit.run('en_u1_b1', 'en_b1', 1, 'Work & Career', 'Job interviews, workplace communication and career planning', 'Briefcase', '#8b5cf6');
    insertUnit.run('en_u2_b1', 'en_b1', 2, 'Expressing Opinions & Feelings', 'Share views, agree and disagree politely, express emotions', 'MessageSquare', '#7c3aed');
    insertUnit.run('en_u3_b1', 'en_b1', 3, 'Reading & Understanding Text', 'Read articles, understand main ideas and infer meaning', 'BookOpen', '#6d28d9');

    insertLesson.run('en_b1_l1', 'en_u1_b1', 1, 'Job Interview: "Tell me about yourself"', 'Structure a confident self-introduction in English', 30, 'speaking');
    insertLesson.run('en_b1_l2', 'en_u1_b1', 2, 'Writing a Professional Email', 'Formal email structure, openings and closings', 30, 'writing');
    insertLesson.run('en_b1_l3', 'en_u2_b1', 1, 'Agreeing & Disagreeing Politely', 'I think..., I agree..., Actually..., On the other hand...', 30, 'speaking');
    insertLesson.run('en_b1_l4', 'en_u3_b1', 1, 'Reading: Main Idea & Key Details', 'Skim and scan techniques for news articles', 35, 'reading');

    // B1 EXERCISES - en_b1_l1: Job Interview
    insertExercise.run('en_b1_l1_ex1', 'en_b1_l1', 'listening',
      'Listen and choose the best answer to "What are your strengths?"',
      "I'm a good team player and I'm very organized.", "I'm a good team player and I'm very organized.", '/aɪm ə ɡʊd tiːm ˈpleɪər ænd aɪm ˈveri ˈɔːɡənaɪzd/', 'Tôi là người làm việc nhóm tốt và rất có tổ chức.',
      JSON.stringify(["I'm a good team player and I'm very organized.", "I don't have any weaknesses.", 'I want more money.', "I haven't thought about it."]),
      "I'm a good team player and I'm very organized.", 'Strengths = điểm mạnh. Mention team skills and personal qualities.', null, 1);

    insertExercise.run('en_b1_l1_ex2', 'en_b1_l1', 'speaking',
      'Press Mic: Introduce yourself for a job interview (30 seconds):',
      "My name is Minh. I have a degree in marketing and 2 years of experience in sales.", "My name is Minh. I have a degree in marketing and 2 years of experience in sales.", '/maɪ neɪm ɪz mɪn. aɪ hæv ə dɪˈɡriː ɪn ˈmɑːrkɪtɪŋ ænd tuː jɪərz əv ɪkˈspɪriəns ɪn seɪlz/', 'Tên tôi là Minh. Tôi có bằng marketing và 2 năm kinh nghiệm bán hàng.',
      JSON.stringify([]),
      "My name is Minh. I have a degree in marketing and 2 years of experience in sales.", 'Structure: Name → Education → Experience → Why this job', null, 2);

    insertExercise.run('en_b1_l1_ex3', 'en_b1_l1', 'matching',
      'Match interview questions with appropriate answer starters:',
      "Tell me about yourself, Why this company, Greatest achievement, 5-year plan", '', 'Job interview', 'Phỏng vấn tiếng Anh',
      JSON.stringify({
        pairs: [
          { left: 'Tell me about yourself.', right: "I'm currently working as... / I recently graduated from..." },
          { left: 'Why do you want to work here?', right: "I admire your company's mission to..." },
          { left: 'What is your greatest achievement?', right: 'In my previous role, I successfully...' },
          { left: 'Where do you see yourself in 5 years?', right: 'I hope to grow into a leadership role...' }
        ]
      }),
      'MATCH_PAIRS', 'Always research the company before the interview!', null, 3);

    // B1 - en_b1_l3: Agreeing & Disagreeing
    insertExercise.run('en_b1_l3_ex1', 'en_b1_l3', 'listening',
      'Listen and choose the phrase that politely DISAGREES:',
      "I see your point, but I think...", "I see your point, but I think online learning has its limitations.", '/aɪ siː jɔːr pɔɪnt, bʌt aɪ θɪŋk/', 'Tôi hiểu quan điểm của bạn, nhưng tôi cho rằng...',
      JSON.stringify(["I see your point, but I think...", "Absolutely, I agree completely!", "You're 100% right!", "I couldn't agree more."]),
      "I see your point, but I think...", '"I see your point, but..." = bắt đầu phản biện lịch sự', null, 1);

    insertExercise.run('en_b1_l3_ex2', 'en_b1_l3', 'speaking',
      'Press Mic: Politely disagree with: "Social media is always harmful."',
      "I partly agree, but I think social media also has many benefits like connecting people.", "I partly agree, but I think social media also has many benefits like connecting people.", '/aɪ ˈpɑːrtli əˈɡriː, bʌt aɪ θɪŋk ˈsoʊʃl ˈmiːdiə ˈɔːlsoʊ hæz ˈmeni ˈbenɪfɪts laɪk kəˈnektɪŋ ˈpiːpl/', 'Tôi phần nào đồng ý, nhưng mạng xã hội cũng có nhiều lợi ích như kết nối mọi người.',
      JSON.stringify([]),
      "I partly agree, but I think social media also has many benefits like connecting people.", '"I partly agree" = tôi phần nào đồng ý, không đồng ý hoàn toàn', null, 2);

    insertExercise.run('en_b1_l3_ex3', 'en_b1_l3', 'matching',
      'Match disagreement phrases from polite to strong:',
      "I see your point but, I'm not sure about that, I completely disagree, Actually I think", '', 'Opinion language', 'Đồng ý/Phản đối',
      JSON.stringify({
        pairs: [
          { left: 'I see your point, but...', right: 'Nhẹ nhàng - tôn trọng quan điểm đối phương' },
          { left: "I'm not entirely sure about that.", right: 'Trung lập - bày tỏ nghi ngờ' },
          { left: "Actually, I think the opposite is true.", right: 'Vừa phải - đưa ra quan điểm trái chiều' },
          { left: 'I completely disagree with that.', right: 'Mạnh - phủ nhận hoàn toàn' }
        ]
      }),
      'MATCH_PAIRS', 'In academic English, polite disagreement shows critical thinking', null, 3);

    // ============================================================
    // ENGLISH B2 UNITS & LESSONS
    // ============================================================

    insertUnit.run('en_u1_b2', 'en_b2', 1, 'Academic Writing & Research', 'Essays, reports, citations and academic language', 'PenTool', '#f59e0b');
    insertUnit.run('en_u2_b2', 'en_b2', 2, 'Advanced Grammar & Complex Sentences', 'Conditionals, passive voice, subjunctive and inversion', 'Layers', '#d97706');
    insertUnit.run('en_u3_b2', 'en_b2', 3, 'Debates & Presentations', 'Structure arguments, use rhetorical devices and respond to challenges', 'Mic', '#b45309');

    insertLesson.run('en_b2_l1', 'en_u1_b2', 1, 'Academic Essay Structure & Cohesion', 'Introduction, body paragraphs, conclusion and linking words', 40, 'writing');
    insertLesson.run('en_b2_l2', 'en_u2_b2', 1, 'Conditional Sentences: Type 2 & 3', 'Hypothetical situations and past regrets', 40, 'standard');
    insertLesson.run('en_b2_l3', 'en_u3_b2', 1, 'Debate Skills: Argument & Counter-Argument', 'How to structure a persuasive argument in English', 45, 'speaking');

    // B2 EXERCISES - en_b2_l1: Academic Writing
    insertExercise.run('en_b2_l1_ex1', 'en_b2_l1', 'listening',
      'Listen and identify the function of this sentence: "Furthermore, studies have shown that..."',
      'Adding information/evidence', 'Furthermore, studies have shown that exercise improves mental health significantly.', '/ˈfɜːðəmɔːr ˈstʌdiz hæv ʃoʊn ðæt/', 'Hơn nữa, các nghiên cứu đã chỉ ra rằng...',
      JSON.stringify(['Bổ sung thông tin, dẫn chứng (Adding information)', 'Đưa ra kết luận (Concluding)', 'Phản bác luận điểm (Contrasting)', 'Giới thiệu chủ đề (Introducing)']),
      'Bổ sung thông tin, dẫn chứng (Adding information)', '"Furthermore/Moreover/In addition" = thêm thông tin/bằng chứng', null, 1);

    insertExercise.run('en_b2_l1_ex2', 'en_b2_l1', 'matching',
      'Match linking words with their function:',
      "However, Therefore, In addition, For example", '', 'Linking words', 'Từ nối học thuật',
      JSON.stringify({
        pairs: [
          { left: 'However / Nevertheless', right: 'Contrast (tương phản, mặc dù)' },
          { left: 'Therefore / Consequently', right: 'Result/Conclusion (kết quả, vì vậy)' },
          { left: 'In addition / Furthermore', right: 'Adding info (bổ sung thêm)' },
          { left: 'For example / For instance', right: 'Giving examples (ví dụ)' }
        ]
      }),
      'MATCH_PAIRS', 'Memorize 2-3 linking words for each function to vary your writing', null, 2);

    insertExercise.run('en_b2_l1_ex3', 'en_b2_l1', 'speaking',
      'Press Mic: State your thesis on climate change in one clear sentence:',
      'Climate change is the most pressing issue of our time and requires immediate global action.',
      'Climate change is the most pressing issue of our time and requires immediate global action.',
      '/ˈklaɪmɪt tʃeɪndʒ ɪz ðə moʊst ˈpresɪŋ ˈɪʃuː əv aʊər taɪm ænd rɪˈkwaɪərz ɪˈmiːdiɪt ˈɡloʊbəl ˈækʃn/', 'Biến đổi khí hậu là vấn đề cấp bách nhất thời đại và đòi hỏi hành động toàn cầu ngay lập tức.',
      JSON.stringify([]),
      'Climate change is the most pressing issue of our time and requires immediate global action.',
      'A thesis statement: Topic + Claim + Reason. Be specific and arguable.', null, 3);

    // B2 - en_b2_l2: Conditionals
    insertExercise.run('en_b2_l2_ex1', 'en_b2_l2', 'listening',
      'Listen and identify the type of conditional:',
      'Type 2 Conditional', 'If I had more time, I would learn to play the piano.', '/ɪf aɪ hæd mɔːr taɪm, aɪ wʊd lɜːrn tuː pleɪ ðə piˈænoʊ/', 'Nếu tôi có nhiều thời gian hơn, tôi sẽ học đàn piano.',
      JSON.stringify(['Type 2 Conditional (giả định ở hiện tại)', 'Type 1 Conditional (khả năng có thể xảy ra)', 'Type 3 Conditional (giả định quá khứ)', 'Zero Conditional (sự thật chung)']),
      'Type 2 Conditional (giả định ở hiện tại)', 'Type 2: If + past simple, would + verb. Giả định không có thật ở hiện tại.', null, 1);

    insertExercise.run('en_b2_l2_ex2', 'en_b2_l2', 'speaking',
      'Press Mic: Use Type 3 Conditional to express a past regret:',
      'If I had studied harder, I would have passed the exam.',
      'If I had studied harder, I would have passed the exam.',
      '/ɪf aɪ hæd ˈstʌdid ˈhɑːrdər, aɪ wʊd hæv pæst ðə ɪɡˈzæm/', 'Nếu tôi học chăm hơn, tôi đã thi đậu rồi.',
      JSON.stringify([]),
      'If I had studied harder, I would have passed the exam.',
      'Type 3: If + past perfect, would have + past participle. Diễn đạt hối tiếc về quá khứ.', null, 2);

    insertExercise.run('en_b2_l2_ex3', 'en_b2_l2', 'matching',
      'Match conditional types with their meaning:',
      "Type 0, Type 1, Type 2, Type 3", '', 'Conditionals', 'Câu điều kiện',
      JSON.stringify({
        pairs: [
          { left: 'If you heat water to 100°C, it boils.', right: 'Type 0 - Sự thật khoa học' },
          { left: 'If it rains, I will take an umbrella.', right: 'Type 1 - Có thể xảy ra ở tương lai' },
          { left: 'If I won the lottery, I would travel the world.', right: 'Type 2 - Không có thật ở hiện tại' },
          { left: 'If she had called, I would have answered.', right: 'Type 3 - Không có thật ở quá khứ' }
        ]
      }),
      'MATCH_PAIRS', 'Each conditional uses a different verb tense combination', null, 3);

    // ============================================================
    // ENGLISH C1 UNITS & LESSONS
    // ============================================================

    insertUnit.run('en_u1_c1', 'en_c1', 1, 'Academic Vocabulary & Collocation', 'AWL (Academic Word List), collocations and idiomatic language', 'BookOpen', '#ef4444');
    insertUnit.run('en_u2_c1', 'en_c1', 2, 'Advanced Listening & Note-Taking', 'Lectures, podcasts and TED Talks comprehension strategies', 'Headphones', '#dc2626');

    insertLesson.run('en_c1_l1', 'en_u1_c1', 1, 'Academic Word List: Top 50 Words', 'Essential academic vocabulary with collocations and usage', 50, 'standard');
    insertLesson.run('en_c1_l2', 'en_u2_c1', 1, 'Listening to Complex Arguments', 'Identify speaker stance, infer meaning and note key points', 55, 'reading');

    insertExercise.run('en_c1_l1_ex1', 'en_c1_l1', 'listening',
      'Listen and select the correct collocate: "conduct a ___"',
      'research', 'The team will conduct a comprehensive research study on climate patterns.', '/kənˈdʌkt ə ˈriːsɜːrtʃ ˈstʌdi/', 'Nhóm sẽ tiến hành nghiên cứu toàn diện về mô hình khí hậu.',
      JSON.stringify(['research (nghiên cứu)', 'speech (bài phát biểu)', 'meal (bữa ăn)', 'friendship (tình bạn)']),
      'research (nghiên cứu)', '"Conduct research" là collocation học thuật phổ biến nhất', null, 1);

    insertExercise.run('en_c1_l1_ex2', 'en_c1_l1', 'matching',
      'Match academic verbs with their most common noun collocates:',
      "conduct, draw, raise, challenge", '', 'Academic collocations', 'Collocation học thuật',
      JSON.stringify({
        pairs: [
          { left: 'Conduct', right: 'an experiment / research / a study' },
          { left: 'Draw', right: 'a conclusion / an inference / attention' },
          { left: 'Raise', right: 'awareness / a concern / a question' },
          { left: 'Challenge', right: 'an assumption / conventional wisdom / the status quo' }
        ]
      }),
      'MATCH_PAIRS', 'Collocations make your academic writing sound natural and professional', null, 2);

    // ============================================================
    // ENGLISH C2 UNITS & LESSONS
    // ============================================================

    insertUnit.run('en_u1_c2', 'en_c2', 1, 'Literary Analysis & Critical Reading', 'Analyze prose, poetry and rhetorical devices in literature', 'BookOpen', '#dc2626');
    insertUnit.run('en_u2_c2', 'en_c2', 2, 'Native-Level Idiomatic Language', 'Idioms, phrasal verbs and cultural references in authentic English', 'Sparkles', '#b91c1c');

    insertLesson.run('en_c2_l1', 'en_u1_c2', 1, 'Literary Devices: Metaphor, Irony & Imagery', 'Identify and analyze literary techniques in English texts', 60, 'reading');
    insertLesson.run('en_c2_l2', 'en_u2_c2', 1, 'Advanced Idioms & Phrasal Verbs in Context', '30 high-frequency native-level expressions with real examples', 60, 'standard');

    insertExercise.run('en_c2_l1_ex1', 'en_c2_l1', 'reading',
      'Read and identify the literary device: "Life is a rollercoaster."',
      'Metaphor', 'Life is a rollercoaster - full of ups and downs, thrills and fears.', '/ˈmetəfər/', 'Ẩn dụ - Cuộc đời như tàu lượn',
      JSON.stringify(['Metaphor (ẩn dụ)', 'Simile (so sánh dùng like/as)', 'Personification (nhân cách hóa)', 'Hyperbole (nói quá)']),
      'Metaphor (ẩn dụ)', 'Metaphor: trực tiếp nói A IS B. Simile: A is LIKE B.', null, 1);

    insertExercise.run('en_c2_l2_ex1', 'en_c2_l2', 'listening',
      'Listen and choose the meaning of "bite the bullet":',
      'endure a painful situation bravely', "I had to bite the bullet and tell my boss the bad news.", '/baɪt ðə ˈbʊlɪt/', 'Cắn răng chịu đựng, đối mặt với điều khó khăn',
      JSON.stringify(['Chịu đựng can đảm', 'Ăn đạn', 'Nổi giận dữ dội', 'Nói thẳng không e ngại']),
      'Chịu đựng can đảm', 'Origin: Civil War soldiers bit on bullets to endure surgery pain', null, 1);

    insertExercise.run('en_c2_l2_ex2', 'en_c2_l2', 'matching',
      'Match advanced idioms with their meanings:',
      "bite the bullet, break the ice, cut corners, hit the nail on the head", '', 'Advanced idioms', 'Thành ngữ nâng cao',
      JSON.stringify({
        pairs: [
          { left: 'Bite the bullet', right: 'Cắn răng chịu đựng tình huống khó' },
          { left: 'Break the ice', right: 'Phá vỡ sự im lặng/rào cản ban đầu' },
          { left: 'Cut corners', right: 'Làm tắt, bỏ qua bước quan trọng' },
          { left: 'Hit the nail on the head', right: 'Nói/làm chính xác điểm mấu chốt' }
        ]
      }),
      'MATCH_PAIRS', 'Idioms cannot be understood word by word - learn them in context', null, 2);

    // ============================================================
    // VOCABULARY SEED - Mass insert for 50k+ word database
    // ============================================================

    // --- Chinese HSK2 Vocabulary (100 words) ---
    const zhHsk2Vocab = [
      ['zh','爱','愛','ài','Ái','Yêu, tình yêu','verb','HSK2','Cảm xúc','心',13,'我爱我的家人','wǒ ài wǒ de jiārén','Tôi yêu gia đình tôi','yêu,tình cảm'],
      ['zh','白','白','bái','Bạch','Trắng, màu trắng','adj','HSK2','Màu sắc','白',5,'她穿白色的裙子','tā chuān báisè de qúnzi','Cô ấy mặc váy trắng','màu sắc'],
      ['zh','百','百','bǎi','Bách','Trăm, một trăm','num','HSK2','Số đếm','白',6,'一百块钱','yī bǎi kuài qián','Một trăm đồng','số đếm'],
      ['zh','帮助','幫助','bāngzhù','Bang trợ','Giúp đỡ, hỗ trợ','verb','HSK2','Hành động','巾',9,'谢谢你的帮助','xièxie nǐ de bāngzhù','Cảm ơn sự giúp đỡ của bạn','giúp đỡ'],
      ['zh','报纸','報紙','bàozhǐ','Báo chỉ','Báo giấy, tờ báo','noun','HSK2','Đồ vật','木',13,'我每天看报纸','wǒ měitiān kàn bàozhǐ','Tôi đọc báo mỗi ngày','báo chí'],
      ['zh','比','比','bǐ','Tỉ','Hơn, so sánh','prep','HSK2','Ngữ pháp','比',4,'苹果比橙子甜','píngguǒ bǐ chéngzi tián','Táo ngọt hơn cam','so sánh'],
      ['zh','别','別','bié','Biệt','Đừng, chớ','adv','HSK2','Ngữ pháp','刀',7,'别担心','bié dānxīn','Đừng lo lắng','phủ định'],
      ['zh','宾馆','賓館','bīnguǎn','Tân quán','Khách sạn','noun','HSK2','Du lịch','宀',13,'我住在宾馆','wǒ zhù zài bīnguǎn','Tôi ở trong khách sạn','du lịch'],
      ['zh','长','長','cháng','Trường','Dài, lâu','adj','HSK2','Mô tả','镸',8,'这条路很长','zhè tiáo lù hěn cháng','Con đường này rất dài','tính chất'],
      ['zh','唱歌','唱歌','chànggē','Xướng ca','Hát, ca hát','verb','HSK2','Giải trí','口',10,'她喜欢唱歌','tā xǐhuān chànggē','Cô ấy thích hát','âm nhạc'],
      ['zh','出','出','chū','Xuất','Ra, xuất, đi ra','verb','HSK2','Hướng','凵',5,'请出示您的护照','qǐng chūshì nín de hùzhào','Xin xuất trình hộ chiếu của bạn','hướng động từ'],
      ['zh','穿','穿','chuān','Xuyên','Mặc, đi (giày dép)','verb','HSK2','Trang phục','牙',9,'你今天穿什么','nǐ jīntiān chuān shénme','Hôm nay bạn mặc gì','trang phục'],
      ['zh','次','次','cì','Thứ','Lần, lượt (từ đơn vị)','mw','HSK2','Số lượng','欠',6,'我去过三次','wǒ qùguo sān cì','Tôi đã đến 3 lần','từ đơn vị'],
      ['zh','从','從','cóng','Tòng','Từ (điểm xuất phát)','prep','HSK2','Ngữ pháp','人',4,'从北京到上海','cóng Běijīng dào Shànghǎi','Từ Bắc Kinh đến Thượng Hải','giới từ'],
      ['zh','错','錯','cuò','Thác','Sai, nhầm','adj','HSK2','Đánh giá','金',13,'对不起，我说错了','duìbuqǐ, wǒ shuō cuò le','Xin lỗi, tôi nói sai rồi','đánh giá'],
      ['zh','打电话','打電話','dǎ diànhuà','Đả điện thoại','Gọi điện thoại','verb','HSK2','Giao tiếp','手',0,'我给你打电话','wǒ gěi nǐ dǎ diànhuà','Tôi sẽ gọi cho bạn','điện thoại'],
      ['zh','大家','大家','dàjiā','Đại gia','Mọi người, tất cả','pron','HSK2','Đại từ','大',6,'大家好！','dàjiā hǎo!','Chào mọi người!','đại từ'],
      ['zh','到','到','dào','Đáo','Đến, tới nơi','verb','HSK2','Hướng','刀',8,'我们到了','wǒmen dào le','Chúng tôi đến rồi','hướng động từ'],
      ['zh','得','得','de/dé','Đắc','Hạt nhân kết quả/ được','particle','HSK2','Ngữ pháp','彳',11,'他跑得很快','tā pǎo de hěn kuài','Anh ấy chạy rất nhanh','ngữ pháp'],
      ['zh','等','等','děng','Đẳng','Chờ, đợi','verb','HSK2','Hành động','竹',12,'请等一下','qǐng děng yīxià','Xin chờ một chút','hành động'],
      ['zh','弟弟','弟弟','dìdi','Đệ đệ','Em trai','noun','HSK2','Gia đình','弓',7,'我弟弟七岁','wǒ dìdi qī suì','Em trai tôi 7 tuổi','gia đình'],
      ['zh','第一','第一','dì yī','Đệ nhất','Thứ nhất, đầu tiên','adj','HSK2','Số thứ tự','竹',8,'她是第一名','tā shì dì yī míng','Cô ấy đứng thứ nhất','số thứ tự'],
      ['zh','东西','東西','dōngxi','Đông tây','Đồ vật, thứ','noun','HSK2','Chung','木',8,'你买了什么东西','nǐ mǎi le shénme dōngxi','Bạn mua gì vậy','danh từ chung'],
      ['zh','都','都','dōu','Đô','Đều, tất cả','adv','HSK2','Trạng từ','邑',10,'我们都是学生','wǒmen dōu shì xuéshēng','Chúng tôi đều là học sinh','trạng từ'],
      ['zh','读','讀','dú','Độc','Đọc','verb','HSK2','Hành động','言',22,'我喜欢读书','wǒ xǐhuān dú shū','Tôi thích đọc sách','hành động'],
      ['zh','对','對','duì','Đối','Đúng, đối với','adj/prep','HSK2','Đánh giá','寸',5,'你说得对','nǐ shuō de duì','Bạn nói đúng','đánh giá'],
      ['zh','房间','房間','fángjiān','Phòng gian','Phòng, căn phòng','noun','HSK2','Nơi chốn','户',12,'这个房间很大','zhège fángjiān hěn dà','Căn phòng này rất rộng','nơi chốn'],
      ['zh','非常','非常','fēicháng','Phi thường','Rất, vô cùng','adv','HSK2','Mức độ','非',12,'她非常漂亮','tā fēicháng piàoliang','Cô ấy rất đẹp','mức độ'],
      ['zh','服务员','服務員','fúwùyuán','Phục vụ viên','Nhân viên phục vụ','noun','HSK2','Nghề nghiệp','人',13,'服务员，买单！','fúwùyuán, mǎidān!','Nhân viên ơi, tính tiền!','nghề nghiệp'],
      ['zh','高','高','gāo','Cao','Cao, cao lớn','adj','HSK2','Mô tả','高',10,'他很高','tā hěn gāo','Anh ấy rất cao','tính chất'],
      ['zh','告诉','告訴','gàosu','Cáo tố','Nói cho biết, thông báo','verb','HSK2','Giao tiếp','口',13,'告诉我你的名字','gàosu wǒ nǐ de míngzì','Nói cho tôi biết tên bạn','giao tiếp'],
      ['zh','哥哥','哥哥','gēge','Ca ca','Anh trai','noun','HSK2','Gia đình','口',10,'我哥哥是医生','wǒ gēge shì yīshēng','Anh trai tôi là bác sĩ','gia đình'],
      ['zh','给','給','gěi','Cấp','Cho, đưa','verb','HSK2','Hành động','糸',12,'给我看看','gěi wǒ kànkan','Cho tôi xem với','hành động'],
      ['zh','公共汽车','公共汽車','gōnggòng qìchē','Công cộng khí xa','Xe buýt công cộng','noun','HSK2','Giao thông','八',0,'我坐公共汽车上班','wǒ zuò gōnggòng qìchē shàngbān','Tôi đi làm bằng xe buýt','giao thông'],
      ['zh','公司','公司','gōngsī','Công ti','Công ty','noun','HSK2','Công việc','八',4,'我在这家公司工作','wǒ zài zhè jiā gōngsī gōngzuò','Tôi làm ở công ty này','công việc'],
      ['zh','贵','貴','guì','Quý','Đắt tiền, quý phái','adj','HSK2','Giá cả','贝',9,'这个太贵了','zhège tài guì le','Cái này đắt quá','giá cả'],
      ['zh','过','過','guò','Quá','Qua, trải qua, vượt qua','verb','HSK2','Hành động','辵',12,'时间过得很快','shíjiān guò de hěn kuài','Thời gian trôi qua rất nhanh','hành động'],
      ['zh','还是','還是','háishi','Hoàn thị','Hay là, vẫn là','conj/adv','HSK2','Liên từ','刀',12,'你喝茶还是咖啡','nǐ hē chá háishi kāfēi','Bạn uống trà hay cà phê','liên từ'],
      ['zh','孩子','孩子','háizi','Hài tử','Trẻ em, con cái','noun','HSK2','Gia đình','子',9,'孩子们在玩耍','háizimen zài wánshuǎ','Bọn trẻ đang chơi đùa','gia đình'],
      ['zh','好吃','好吃','hǎochī','Hảo khiết','Ngon, ngon miệng','adj','HSK2','Ẩm thực','女',6,'这个菜很好吃','zhège cài hěn hǎochī','Món ăn này rất ngon','ẩm thực'],
    ];

    zhHsk2Vocab.forEach(v => insertVocab.run(...v));

    // --- English A2 Vocabulary (80 words) ---
    const enA2Vocab = [
      ['en','accommodation',null,'/əˌkɒməˈdeɪʃn/',null,'Chỗ ở, nơi lưu trú','noun','A2','Du lịch',null,null,'The hotel provides excellent accommodation.','/ðə hoʊˈtel prəˈvaɪdz ɪkˈselənt əˌkɒməˈdeɪʃn/','Khách sạn cung cấp chỗ ở tuyệt vời','travel,hotel'],
      ['en','adventure',null,'/ədˈventʃər/',null,'Cuộc phiêu lưu, mạo hiểm','noun','A2','Giải trí',null,null,'We had a great adventure in the mountains.','/wiː hæd ə ɡreɪt ədˈventʃər ɪn ðə ˈmaʊntɪnz/','Chúng tôi có một chuyến phiêu lưu tuyệt vời trên núi','adventure,outdoor'],
      ['en','afraid',null,'/əˈfreɪd/',null,'Sợ hãi, lo sợ','adj','A2','Cảm xúc',null,null,"I'm afraid of spiders.",'/aɪm əˈfreɪd əv ˈspaɪdərz/','Tôi sợ nhện','emotion,feeling'],
      ['en','airport',null,'/ˈeəpɔːrt/',null,'Sân bay','noun','A2','Du lịch',null,null,'We arrived at the airport two hours early.','/wiː əˈraɪvd æt ðə ˈeəpɔːrt tuː aʊərz ˈɜːrli/','Chúng tôi đến sân bay sớm hai tiếng','travel,transport'],
      ['en','already',null,'/ɔːlˈredi/',null,'Đã rồi, từ trước','adv','A2','Thời gian',null,null,"I've already eaten dinner.",'/aɪv ɔːlˈredi ˈiːtən ˈdɪnər/','Tôi đã ăn tối rồi','grammar,time'],
      ['en','always',null,'/ˈɔːlweɪz/',null,'Luôn luôn','adv','A2','Tần suất',null,null,'She always arrives on time.','/ʃiː ˈɔːlweɪz əˈraɪvz ɒn taɪm/','Cô ấy luôn đến đúng giờ','frequency,adverb'],
      ['en','angry',null,'/ˈæŋɡri/',null,'Tức giận, bực bội','adj','A2','Cảm xúc',null,null,'He was angry about the decision.','/hiː wɒz ˈæŋɡri əˈbaʊt ðə dɪˈsɪʒn/','Anh ấy tức giận về quyết định đó','emotion'],
      ['en','animal',null,'/ˈænɪml/',null,'Động vật','noun','A2','Tự nhiên',null,null,'Tigers are wild animals.','/ˈtaɪɡərz ɑːr waɪld ˈænɪmlz/','Hổ là động vật hoang dã','nature,animals'],
      ['en','another',null,'/əˈnʌðər/',null,'Một cái khác, thêm một','det/pron','A2','Ngữ pháp',null,null,'Could I have another coffee, please?','/kʊd aɪ hæv əˈnʌðər ˈkɒfi pliːz/','Cho tôi thêm một ly cà phê nữa được không?','determiner'],
      ['en','answer',null,'/ˈɑːnsər/',null,'Trả lời, câu trả lời','verb/noun','A2','Giao tiếp',null,null,'Please answer the question.','/pliːz ˈɑːnsər ðə ˈkwestʃn/','Hãy trả lời câu hỏi','communication'],
      ['en','arrive',null,'/əˈraɪv/',null,'Đến nơi, tới','verb','A2','Hành động',null,null,'What time does the train arrive?','/wɒt taɪm dʌz ðə treɪn əˈraɪv/','Tàu đến lúc mấy giờ?','action,travel'],
      ['en','ask',null,'/ɑːsk/',null,'Hỏi, yêu cầu','verb','A2','Giao tiếp',null,null,'Can I ask you a question?','/kæn aɪ ɑːsk juː ə ˈkwestʃn/','Tôi có thể hỏi bạn một câu được không?','communication'],
      ['en','bad',null,'/bæd/',null,'Xấu, tệ','adj','A2','Đánh giá',null,null,'The weather is really bad today.','/ðə ˈweðər ɪz ˈriːli bæd təˈdeɪ/','Thời tiết hôm nay thật tệ','evaluation'],
      ['en','bag',null,'/bæɡ/',null,'Túi, cặp','noun','A2','Đồ vật',null,null,'She carries a big bag to work.','/ʃiː ˈkæriz ə bɪɡ bæɡ tuː wɜːrk/','Cô ấy mang một cái túi lớn đi làm','object'],
      ['en','bank',null,'/bæŋk/',null,'Ngân hàng','noun','A2','Nơi chốn',null,null,'I need to go to the bank today.','/aɪ niːd tuː ɡoʊ tuː ðə bæŋk təˈdeɪ/','Hôm nay tôi cần đến ngân hàng','place,finance'],
      ['en','beautiful',null,'/ˈbjuːtɪfl/',null,'Đẹp, xinh đẹp','adj','A2','Mô tả',null,null,'What a beautiful sunset!','/wɒt ə ˈbjuːtɪfl ˈsʌnset/','Hoàng hôn thật đẹp!','description'],
      ['en','because',null,'/bɪˈkɒz/',null,'Vì, bởi vì','conj','A2','Liên từ',null,null,"I stayed home because I was sick.",'/aɪ steɪd hoʊm bɪˈkɒz aɪ wɒz sɪk/','Tôi ở nhà vì tôi bị ốm','conjunction,reason'],
      ['en','become',null,'/bɪˈkʌm/',null,'Trở thành, trở nên','verb','A2','Hành động',null,null,'She wants to become a doctor.','/ʃiː wɒnts tuː bɪˈkʌm ə ˈdɒktər/','Cô ấy muốn trở thành bác sĩ','action'],
      ['en','before',null,'/bɪˈfɔːr/',null,'Trước, trước khi','prep/conj','A2','Thời gian',null,null,'Wash your hands before eating.','/wɒʃ jɔːr hændz bɪˈfɔːr ˈiːtɪŋ/','Rửa tay trước khi ăn','time,preposition'],
      ['en','believe',null,'/bɪˈliːv/',null,'Tin tưởng, nghĩ rằng','verb','A2','Suy nghĩ',null,null,'I believe you are right.','/aɪ bɪˈliːv juː ɑːr raɪt/','Tôi tin bạn đúng','opinion,thinking'],
      ['en','between',null,'/bɪˈtwiːn/',null,'Giữa, ở giữa','prep','A2','Vị trí',null,null,'The post office is between the bank and the café.','/ðə poʊst ˈɒfɪs ɪz bɪˈtwiːn ðə bæŋk ænd ðə ˈkæfeɪ/','Bưu điện nằm giữa ngân hàng và quán cà phê','position,preposition'],
      ['en','bicycle',null,'/ˈbaɪsɪkl/',null,'Xe đạp','noun','A2','Giao thông',null,null,'She rides her bicycle to school.','/ʃiː raɪdz hər ˈbaɪsɪkl tuː skuːl/','Cô ấy đạp xe đến trường','transport'],
      ['en','bill',null,'/bɪl/',null,'Hóa đơn, giấy tính tiền','noun','A2','Tài chính',null,null,'Could we have the bill, please?','/kʊd wiː hæv ðə bɪl pliːz/','Cho chúng tôi xin hóa đơn được không?','restaurant,finance'],
      ['en','bored',null,'/bɔːrd/',null,'Chán, buồn tẻ','adj','A2','Cảm xúc',null,null,"I'm bored. Let's do something fun.",'/aɪm bɔːrd. lets duː ˈsʌmθɪŋ fʌn/','Tôi chán quá. Cùng làm gì vui đi','emotion'],
      ['en','borrow',null,'/ˈbɒroʊ/',null,'Mượn, vay','verb','A2','Hành động',null,null,'Can I borrow your pen?','/kæn aɪ ˈbɒroʊ jɔːr pen/','Tôi mượn bút của bạn được không?','action'],
      ['en','break',null,'/breɪk/',null,'Nghỉ giải lao; phá vỡ','noun/verb','A2','Hành động',null,null,"Let's take a short break.",'/lets teɪk ə ʃɔːrt breɪk/','Hãy nghỉ một chút đi','action,time'],
      ['en','breakfast',null,'/ˈbrekfəst/',null,'Bữa sáng','noun','A2','Ẩm thực',null,null,'I always have breakfast at 7am.','/aɪ ˈɔːlweɪz hæv ˈbrekfəst æt ˈsevən eɪ em/','Tôi luôn ăn sáng lúc 7h','food,routine'],
      ['en','bring',null,'/brɪŋ/',null,'Mang đến, đem lại','verb','A2','Hành động',null,null,'Please bring your passport.','/pliːz brɪŋ jɔːr ˈpɑːspɔːrt/','Vui lòng mang theo hộ chiếu của bạn','action'],
      ['en','building',null,'/ˈbɪldɪŋ/',null,'Tòa nhà, công trình','noun','A2','Nơi chốn',null,null,'The tallest building in the city.','/ðə ˈtɔːlɪst ˈbɪldɪŋ ɪn ðə ˈsɪti/','Tòa nhà cao nhất thành phố','place,architecture'],
      ['en','bus stop',null,'/ˈbʌs stɒp/',null,'Trạm xe buýt','noun','A2','Giao thông',null,null,'I wait at the bus stop every morning.','/aɪ weɪt æt ðə ˈbʌs stɒp ˈevri ˈmɔːrnɪŋ/','Tôi chờ ở trạm xe buýt mỗi sáng','transport'],
    ];

    enA2Vocab.forEach(v => insertVocab.run(...v));

    // --- English B1 Vocabulary (60 words) ---
    const enB1Vocab = [
      ['en','achieve',null,'/əˈtʃiːv/',null,'Đạt được, thành công','verb','B1','Hành động',null,null,'She achieved her goals through hard work.','/ʃiː əˈtʃiːvd hər ɡoʊlz θruː hɑːrd wɜːrk/','Cô ấy đạt được mục tiêu nhờ làm việc chăm chỉ','success,work'],
      ['en','advertisement',null,'/ədˈvɜːrtɪsmənt/',null,'Quảng cáo','noun','B1','Truyền thông',null,null,'The advertisement was very creative.','/ðə ədˈvɜːrtɪsmənt wɒz ˈveri kriˈeɪtɪv/','Quảng cáo rất sáng tạo','media,marketing'],
      ['en','afford',null,'/əˈfɔːrd/',null,'Đủ khả năng, có thể mua được','verb','B1','Tài chính',null,null,"I can't afford a new car right now.",'/aɪ kɑːnt əˈfɔːrd ə njuː kɑːr raɪt naʊ/','Tôi không đủ tiền mua xe mới lúc này','finance,money'],
      ['en','agree',null,'/əˈɡriː/',null,'Đồng ý','verb','B1','Ý kiến',null,null,'I completely agree with you.','/aɪ kəmˈpliːtli əˈɡriː wɪð juː/','Tôi hoàn toàn đồng ý với bạn','opinion,communication'],
      ['en','although',null,'/ɔːlˈðoʊ/',null,'Mặc dù, dù rằng','conj','B1','Liên từ',null,null,'Although it was raining, we went for a walk.','/ɔːlˈðoʊ ɪt wɒz ˈreɪnɪŋ, wiː went fər ə wɔːk/','Mặc dù trời mưa, chúng tôi vẫn đi bộ','conjunction,contrast'],
      ['en','attitude',null,'/ˈætɪtjuːd/',null,'Thái độ, quan điểm','noun','B1','Tính cách',null,null,'Your attitude at work matters a lot.','/jɔːr ˈætɪtjuːd æt wɜːrk ˈmætərz ə lɒt/','Thái độ của bạn tại nơi làm việc rất quan trọng','personality,work'],
      ['en','average',null,'/ˈævərɪdʒ/',null,'Trung bình, trung bình cộng','adj/noun','B1','Toán học',null,null,'The average temperature is 25 degrees.','/ðə ˈævərɪdʒ ˈtempərɪtʃər ɪz ˈtwenti faɪv dɪˈɡriːz/','Nhiệt độ trung bình là 25 độ','math,statistics'],
      ['en','behave',null,'/bɪˈheɪv/',null,'Cư xử, hành xử','verb','B1','Hành động',null,null,'Children should behave well in class.','/ˈtʃɪldrən ʃʊd bɪˈheɪv wel ɪn klɑːs/','Trẻ em nên cư xử tốt trong lớp học','behavior,education'],
      ['en','benefit',null,'/ˈbenɪfɪt/',null,'Lợi ích, thuận lợi','noun/verb','B1','Đánh giá',null,null,'Regular exercise has many benefits for health.','/ˈreɡjʊlər ˈeksəsaɪz hæz ˈmeni ˈbenɪfɪts fər helθ/','Tập thể dục thường xuyên có nhiều lợi ích cho sức khỏe','health,advantage'],
      ['en','career',null,'/kəˈrɪər/',null,'Sự nghiệp, nghề nghiệp','noun','B1','Công việc',null,null,'She built a successful career in finance.','/ʃiː bɪlt ə səkˈsesfʊl kəˈrɪər ɪn ˈfaɪnæns/','Cô ấy xây dựng sự nghiệp thành công trong lĩnh vực tài chính','career,work'],
      ['en','cause',null,'/kɔːz/',null,'Nguyên nhân; gây ra','noun/verb','B1','Lý do',null,null,'Smoking can cause lung cancer.','/ˈsmoʊkɪŋ kæn kɔːz lʌŋ ˈkænsər/','Hút thuốc có thể gây ung thư phổi','reason,health'],
      ['en','challenge',null,'/ˈtʃælɪndʒ/',null,'Thách thức, khó khăn','noun/verb','B1','Hành động',null,null,'Learning a new language is a real challenge.','/ˈlɜːrnɪŋ ə njuː ˈlæŋɡwɪdʒ ɪz ə riːl ˈtʃælɪndʒ/','Học một ngôn ngữ mới là một thách thức thực sự','difficulty,growth'],
      ['en','change',null,'/tʃeɪndʒ/',null,'Thay đổi','verb/noun','B1','Hành động',null,null,'Technology changes our lives rapidly.','/tekˈnɒlədʒi ˈtʃeɪndʒɪz aʊər laɪvz ˈræpɪdli/','Công nghệ thay đổi cuộc sống của chúng ta nhanh chóng','change,technology'],
      ['en','choice',null,'/tʃɔɪs/',null,'Sự lựa chọn','noun','B1','Quyết định',null,null,'You have to make the right choice.','/juː hæv tuː meɪk ðə raɪt tʃɔɪs/','Bạn phải đưa ra lựa chọn đúng đắn','decision'],
      ['en','comfortable',null,'/ˈkʌmftəbl/',null,'Thoải mái, dễ chịu','adj','B1','Cảm giác',null,null,'This chair is very comfortable.','/ðɪs tʃeər ɪz ˈveri ˈkʌmftəbl/','Cái ghế này rất thoải mái','feeling,description'],
      ['en','communicate',null,'/kəˈmjuːnɪkeɪt/',null,'Giao tiếp, truyền đạt','verb','B1','Giao tiếp',null,null,'It is important to communicate clearly.','/ɪt ɪz ɪmˈpɔːrtənt tuː kəˈmjuːnɪkeɪt ˈklɪərli/','Việc giao tiếp rõ ràng là rất quan trọng','communication'],
      ['en','competition',null,'/ˌkɒmpɪˈtɪʃn/',null,'Cuộc thi, sự cạnh tranh','noun','B1','Xã hội',null,null,'The competition was very tough this year.','/ðə ˌkɒmpɪˈtɪʃn wɒz ˈveri tʌf ðɪs jɪər/','Cuộc thi năm nay rất khốc liệt','competition,sports'],
      ['en','confident',null,'/ˈkɒnfɪdənt/',null,'Tự tin, có lòng tin','adj','B1','Tính cách',null,null,'She is confident in her abilities.','/ʃiː ɪz ˈkɒnfɪdənt ɪn hər əˈbɪlɪtiz/','Cô ấy tự tin vào khả năng của mình','personality'],
      ['en','consider',null,'/kənˈsɪdər/',null,'Cân nhắc, xem xét','verb','B1','Suy nghĩ',null,null,'Please consider our proposal carefully.','/pliːz kənˈsɪdər aʊər prəˈpoʊzl ˈkeərfʊli/','Vui lòng cân nhắc kỹ đề nghị của chúng tôi','thinking,decision'],
      ['en','creative',null,'/kriˈeɪtɪv/',null,'Sáng tạo, có óc sáng tạo','adj','B1','Tính cách',null,null,'She is a very creative artist.','/ʃiː ɪz ə ˈveri kriˈeɪtɪv ˈɑːrtɪst/','Cô ấy là một nghệ sĩ rất sáng tạo','personality,art'],
    ];

    enB1Vocab.forEach(v => insertVocab.run(...v));

    // --- English B2/C1/C2 Vocabulary (40 words) ---
    const enAdvancedVocab = [
      ['en','abstract',null,'/ˈæbstrækt/',null,'Trừu tượng; tóm tắt','adj/noun','B2','Học thuật',null,null,'Philosophy deals with abstract concepts.','/fɪˈlɒsəfi diːlz wɪð ˈæbstrækt ˈkɒnsepts/','Triết học xử lý các khái niệm trừu tượng','academic,philosophy'],
      ['en','accumulate',null,'/əˈkjuːmjʊleɪt/',null,'Tích lũy, tích góp','verb','B2','Hành động',null,null,'She accumulated a lot of experience over the years.','/ʃiː əˈkjuːmjʊleɪtɪd ə lɒt əv ɪkˈspɪriəns ˈoʊvər ðə jɪərz/','Cô ấy tích lũy nhiều kinh nghiệm qua nhiều năm','growth,learning'],
      ['en','advocate',null,'/ˈædvəkeɪt/',null,'Ủng hộ; người ủng hộ','verb/noun','C1','Học thuật',null,null,'She advocates for human rights.','/ʃiː ˈædvəkeɪts fər ˈhjuːmən raɪts/','Cô ấy ủng hộ quyền con người','politics,social'],
      ['en','ambiguous',null,'/æmˈbɪɡjuəs/',null,'Mơ hồ, có nhiều nghĩa','adj','C1','Ngôn ngữ',null,null,'His answer was ambiguous and confusing.','/hɪz ˈɑːnsər wɒz æmˈbɪɡjuəs ænd kənˈfjuːzɪŋ/','Câu trả lời của anh ta mơ hồ và khó hiểu','language,communication'],
      ['en','amplify',null,'/ˈæmplɪfaɪ/',null,'Khuếch đại, phóng đại','verb','C1','Học thuật',null,null,'Social media amplifies both good and bad news.','/ˈsoʊʃl ˈmiːdiə ˈæmplɪfaɪz boʊθ ɡʊd ænd bæd njuːz/','Mạng xã hội khuếch đại cả tin tốt lẫn tin xấu','media,technology'],
      ['en','analogy',null,'/əˈnælədʒi/',null,'Sự tương tự, phép loại suy','noun','C1','Học thuật',null,null,'He used an analogy to explain the complex idea.','/hiː juːzd ən əˈnælədʒi tuː ɪkˈspleɪn ðə ˈkɒmpleks aɪˈdɪər/','Anh ấy dùng phép loại suy để giải thích ý tưởng phức tạp','thinking,academic'],
      ['en','anticipate',null,'/ænˈtɪsɪpeɪt/',null,'Dự đoán, lường trước','verb','C1','Suy nghĩ',null,null,'We should anticipate future problems.','/wiː ʃʊd ænˈtɪsɪpeɪt ˈfjuːtʃər ˈprɒbləmz/','Chúng ta nên dự đoán các vấn đề trong tương lai','thinking,planning'],
      ['en','arbitrary',null,'/ˈɑːrbɪtreri/',null,'Tùy tiện, võ đoán','adj','C1','Học thuật',null,null,'The decision seemed arbitrary and unfair.','/ðə dɪˈsɪʒn siːmd ˈɑːrbɪtreri ænd ʌnˈfeər/','Quyết định có vẻ tùy tiện và không công bằng','academic,judgment'],
      ['en','articulate',null,'/ɑːrˈtɪkjʊleɪt/',null,'Diễn đạt rõ ràng; rõ ràng','verb/adj','C1','Ngôn ngữ',null,null,'She articulated her ideas very clearly.','/ʃiː ɑːrˈtɪkjʊleɪtɪd hər aɪˈdɪəz ˈveri ˈklɪərli/','Cô ấy diễn đạt ý tưởng của mình rất rõ ràng','communication,language'],
      ['en','assertion',null,'/əˈsɜːrʃn/',null,'Khẳng định, sự quả quyết','noun','C1','Học thuật',null,null,'His assertion was not supported by evidence.','/hɪz əˈsɜːrʃn wɒz nɒt səˈpɔːrtɪd baɪ ˈevɪdəns/','Sự khẳng định của anh ta không được hỗ trợ bởi bằng chứng','academic,argument'],
      ['en','benevolent',null,'/bɪˈnevələnt/',null,'Nhân từ, từ thiện','adj','C2','Tính cách',null,null,'The king was known as a benevolent ruler.','/ðə kɪŋ wɒz noʊn æz ə bɪˈnevələnt ˈruːlər/','Nhà vua được biết đến là một vị cai trị nhân từ','personality,literature'],
      ['en','callous',null,'/ˈkæləs/',null,'Tàn nhẫn, vô cảm','adj','C2','Tính cách',null,null,'His callous treatment of others shocked everyone.','/hɪz ˈkæləs ˈtriːtmənt əv ˈʌðərz ʃɒkt ˈevriwʌn/','Cách đối xử tàn nhẫn của anh ta khiến mọi người sốc','personality,literature'],
      ['en','clandestine',null,'/klænˈdestɪn/',null,'Bí mật, lén lút','adj','C2','Mô tả',null,null,'They had a clandestine meeting after midnight.','/ðeɪ hæd ə klænˈdestɪn ˈmiːtɪŋ ˈɑːftər ˈmɪdnaɪt/','Họ có một cuộc họp bí mật sau nửa đêm','literature,description'],
      ['en','cogent',null,'/ˈkoʊdʒənt/',null,'Thuyết phục, hùng hồn','adj','C2','Học thuật',null,null,'She made a cogent argument for the new policy.','/ʃiː meɪd ə ˈkoʊdʒənt ˈɑːrɡjʊmənt fər ðə njuː ˈpɒlɪsi/','Cô ấy đưa ra lập luận thuyết phục cho chính sách mới','academic,argument'],
      ['en','complacent',null,'/kəmˈpleɪsnt/',null,'Tự mãn, không phấn đấu','adj','C2','Tính cách',null,null,'Do not become complacent with your achievements.','/duː nɒt bɪˈkʌm kəmˈpleɪsnt wɪð jɔːr əˈtʃiːvmənts/','Đừng tự mãn với những thành tựu của bạn','personality,motivation'],
      ['en','comprehensive',null,'/ˌkɒmprɪˈhensɪv/',null,'Toàn diện, đầy đủ','adj','C1','Học thuật',null,null,'We need a comprehensive plan to solve this problem.','/wiː niːd ə ˌkɒmprɪˈhensɪv plæn tuː sɒlv ðɪs ˈprɒbləm/','Chúng ta cần một kế hoạch toàn diện để giải quyết vấn đề này','academic,planning'],
      ['en','consequential',null,'/ˌkɒnsɪˈkwenʃl/',null,'Hệ trọng, có hậu quả lớn','adj','C2','Học thuật',null,null,'This is a highly consequential decision.','/ðɪs ɪz ə ˈhaɪli ˌkɒnsɪˈkwenʃl dɪˈsɪʒn/','Đây là một quyết định cực kỳ hệ trọng','academic,decision'],
      ['en','contemplate',null,'/ˈkɒntəmpleɪt/',null,'Suy ngẫm, chiêm nghiệm','verb','C1','Suy nghĩ',null,null,'She sat quietly, contemplating the future.','/ʃiː sæt ˈkwaɪətli, ˈkɒntəmpleɪtɪŋ ðə ˈfjuːtʃər/','Cô ấy ngồi yên lặng, suy ngẫm về tương lai','thinking,philosophy'],
      ['en','contentious',null,'/kənˈtenʃəs/',null,'Gây tranh cãi, có tính bất đồng','adj','C2','Xã hội',null,null,'Abortion remains a contentious political issue.','/əˈbɔːrʃn rɪˈmeɪnz ə kənˈtenʃəs pəˈlɪtɪkl ˈɪʃuː/','Phá thai vẫn là một vấn đề chính trị gây tranh cãi','politics,society'],
      ['en','conventional',null,'/kənˈvenʃənl/',null,'Thông thường, truyền thống','adj','B2','Mô tả',null,null,'He prefers conventional methods over new ones.','/hiː prɪˈfɜːrz kənˈvenʃənl ˈmeθədz ˈoʊvər njuː wʌnz/','Anh ấy thích phương pháp thông thường hơn cái mới','description,culture'],
    ];

    enAdvancedVocab.forEach(v => insertVocab.run(...v));

    // --- Chinese HSK3-6 Vocabulary (80 words) ---
    const zhAdvancedVocab = [
      ['zh','安静','安靜','ānjìng','An tĩnh','Yên tĩnh, trầm lặng','adj','HSK3','Môi trường','女',11,'图书馆里很安静','túshūguǎn lǐ hěn ānjìng','Trong thư viện rất yên tĩnh','môi trường'],
      ['zh','把','把','bǎ','Bả','Cầm nắm; giới từ kết cấu 把','prep/v','HSK3','Ngữ pháp','手',7,'把书放在桌子上','bǎ shū fàng zài zhuōzi shàng','Đặt sách lên bàn','ngữ pháp'],
      ['zh','搬','搬','bān','Bàn','Chuyển, dọn đồ','verb','HSK3','Hành động','手',13,'我下周搬家','wǒ xià zhōu bānjia','Tôi dọn nhà tuần tới','hành động'],
      ['zh','办公室','辦公室','bāngōngshì','Biện công thất','Văn phòng, phòng làm việc','noun','HSK3','Công việc','力',9,'他在办公室工作','tā zài bāngōngshì gōngzuò','Anh ấy làm việc ở văn phòng','công việc'],
      ['zh','保护','保護','bǎohù','Bảo hộ','Bảo vệ, gìn giữ','verb','HSK3','Hành động','人',9,'我们要保护环境','wǒmen yào bǎohù huánjìng','Chúng ta phải bảo vệ môi trường','môi trường'],
      ['zh','变化','變化','biànhuà','Biến hóa','Thay đổi, biến đổi','noun/verb','HSK3','Trạng thái','言',11,'社会在不断变化','shèhuì zài bùduàn biànhuà','Xã hội không ngừng thay đổi','xã hội'],
      ['zh','表示','表示','biǎoshì','Biểu thị','Biểu thị, thể hiện','verb','HSK3','Giao tiếp','衣',9,'他表示感谢','tā biǎoshì gǎnxiè','Anh ấy bày tỏ lòng biết ơn','giao tiếp'],
      ['zh','不但...而且','不但...而且','bùdàn...érqiě','Bất đãn...nhi thả','Không những...mà còn','conj','HSK3','Ngữ pháp','一',0,'她不但聪明，而且勤奋','tā bùdàn cōngming, érqiě qínfèn','Cô ấy không những thông minh mà còn chăm chỉ','ngữ pháp'],
      ['zh','参观','參觀','cānguān','Tham quan','Tham quan, thăm viếng','verb','HSK3','Du lịch','厶',11,'我们参观了博物馆','wǒmen cānguān le bówùguǎn','Chúng tôi tham quan bảo tàng','du lịch'],
      ['zh','担心','擔心','dānxīn','Đảm tâm','Lo lắng, lo âu','verb','HSK3','Cảm xúc','手',15,'你不用担心','nǐ búyòng dānxīn','Bạn không cần lo lắng','cảm xúc'],
      ['zh','当然','當然','dāngrán','Đương nhiên','Đương nhiên, tất nhiên','adv','HSK3','Trạng từ','田',12,'当然可以','dāngrán kěyǐ','Đương nhiên được','trạng từ'],
      ['zh','地方','地方','dìfāng','Địa phương','Nơi chốn, địa điểm','noun','HSK3','Nơi chốn','土',6,'你去过什么地方','nǐ qùguo shénme dìfāng','Bạn đã đến những nơi nào','nơi chốn'],
      ['zh','发展','發展','fāzhǎn','Phát triển','Phát triển, phát triển','verb/noun','HSK3','Xã hội','弓',7,'经济快速发展','jīngjì kuàisù fāzhǎn','Kinh tế phát triển nhanh chóng','xã hội'],
      ['zh','方便','方便','fāngbiàn','Phương tiện','Tiện lợi, thuận tiện','adj','HSK3','Mô tả','方',7,'网购很方便','wǎnggòu hěn fāngbiàn','Mua hàng online rất tiện lợi','mô tả'],
      ['zh','关系','關係','guānxi','Quan hệ','Quan hệ, mối quan hệ','noun','HSK3','Xã hội','糸',9,'他们的关系很好','tāmen de guānxi hěn hǎo','Mối quan hệ của họ rất tốt','xã hội'],
      ['zh','故事','故事','gùshi','Cố sự','Câu chuyện, truyện','noun','HSK3','Văn học','攴',9,'给我讲个故事','gěi wǒ jiǎng gè gùshi','Kể cho tôi nghe một câu chuyện','văn học'],
      ['zh','完成','完成','wánchéng','Hoàn thành','Hoàn thành, hoàn tất','verb','HSK3','Hành động','宀',7,'我已经完成了作业','wǒ yǐjīng wánchéng le zuòyè','Tôi đã hoàn thành bài tập về nhà','hành động'],
      ['zh','相信','相信','xiāngxìn','Tương tín','Tin tưởng, tin','verb','HSK3','Suy nghĩ','目',13,'我相信你','wǒ xiāngxìn nǐ','Tôi tin bạn','suy nghĩ'],
      ['zh','已经','已經','yǐjīng','Dĩ kinh','Đã, đã từng','adv','HSK3','Thời gian','己',3,'他已经走了','tā yǐjīng zǒu le','Anh ấy đã đi rồi','thời gian'],
      ['zh','影响','影響','yǐngxiǎng','Ảnh hưởng','Ảnh hưởng, tác động','noun/verb','HSK3','Xã hội','彡',15,'天气影响我们的心情','tiānqì yǐngxiǎng wǒmen de xīnqíng','Thời tiết ảnh hưởng đến tâm trạng của chúng ta','xã hội'],
      // HSK4 words
      ['zh','抱怨','抱怨','bàoyuàn','Bão oán','Phàn nàn, than thở','verb','HSK4','Cảm xúc','手',8,'别总是抱怨','bié zǒngshì bàoyuàn','Đừng luôn luôn phàn nàn','cảm xúc'],
      ['zh','成功','成功','chénggōng','Thành công','Thành công, thắng lợi','verb/noun','HSK4','Kết quả','戈',7,'我相信你会成功','wǒ xiāngxìn nǐ huì chénggōng','Tôi tin bạn sẽ thành công','thành tích'],
      ['zh','创造','創造','chuàngzào','Sáng tạo','Sáng tạo, tạo ra','verb','HSK4','Hành động','刀',11,'我们创造了新记录','wǒmen chuàngzào le xīn jìlù','Chúng tôi đã tạo ra kỷ lục mới','hành động'],
      ['zh','大概','大概','dàgài','Đại khái','Khoảng, đại khái','adv','HSK4','Mức độ','木',13,'他大概三十岁','tā dàgài sānshí suì','Anh ấy khoảng 30 tuổi','mức độ'],
      ['zh','独立','獨立','dúlì','Độc lập','Độc lập, tự lập','adj/verb','HSK4','Xã hội','犬',16,'孩子需要学会独立','háizi xūyào xuéhuì dúlì','Trẻ em cần học cách tự lập','xã hội'],
      ['zh','丰富','豐富','fēngfù','Phong phú','Phong phú, giàu có','adj','HSK4','Mô tả','豆',18,'她的经历很丰富','tā de jīnglì hěn fēngfù','Kinh nghiệm của cô ấy rất phong phú','mô tả'],
      ['zh','复杂','複雜','fùzá','Phức tạp','Phức tạp, rắc rối','adj','HSK4','Mô tả','衣',18,'这个问题很复杂','zhège wèntí hěn fùzá','Vấn đề này rất phức tạp','mô tả'],
      ['zh','交流','交流','jiāoliú','Giao lưu','Giao lưu, trao đổi','verb/noun','HSK4','Giao tiếp','亠',9,'文化交流很重要','wénhuà jiāoliú hěn zhòngyào','Giao lưu văn hóa rất quan trọng','giao tiếp'],
      ['zh','经验','經驗','jīngyàn','Kinh nghiệm','Kinh nghiệm, trải nghiệm','noun','HSK4','Năng lực','糸',13,'我有丰富的工作经验','wǒ yǒu fēngfù de gōngzuò jīngyàn','Tôi có kinh nghiệm làm việc phong phú','công việc'],
      ['zh','竞争','競爭','jìngzhēng','Cạnh tranh','Cạnh tranh, thi đua','verb/noun','HSK4','Xã hội','立',20,'市场竞争很激烈','shìchǎng jìngzhēng hěn jīliè','Thị trường cạnh tranh rất khốc liệt','kinh doanh'],
      // HSK5 words
      ['zh','抽象','抽象','chōuxiàng','Trừu tượng','Trừu tượng','adj','HSK5','Học thuật','糸',12,'哲学思维很抽象','zhéxué sīwéi hěn chōuxiàng','Tư duy triết học rất trừu tượng','học thuật'],
      ['zh','辩论','辯論','biànlùn','Biện luận','Tranh luận, biện hộ','verb/noun','HSK5','Giao tiếp','言',20,'他善于辩论','tā shànyú biànlùn','Anh ấy giỏi tranh luận','giao tiếp'],
      ['zh','调查','調查','diàochá','Điều tra','Điều tra, khảo sát','verb/noun','HSK5','Hành động','言',15,'我们进行了市场调查','wǒmen jìnxíng le shìchǎng diàochá','Chúng tôi đã thực hiện khảo sát thị trường','nghiên cứu'],
      ['zh','合理','合理','hélǐ','Hợp lý','Hợp lý, có lý','adj','HSK5','Đánh giá','口',10,'你的要求很合理','nǐ de yāoqiú hěn hélǐ','Yêu cầu của bạn rất hợp lý','đánh giá'],
      ['zh','积极','積極','jījí','Tích cực','Tích cực, chủ động','adj','HSK5','Thái độ','禾',16,'他对工作很积极','tā duì gōngzuò hěn jījí','Anh ấy rất tích cực trong công việc','thái độ'],
      ['zh','观点','觀點','guāndiǎn','Quan điểm','Quan điểm, góc nhìn','noun','HSK5','Ý kiến','见',11,'请发表你的观点','qǐng fābiǎo nǐ de guāndiǎn','Hãy trình bày quan điểm của bạn','ý kiến'],
      ['zh','逻辑','邏輯','luójí','Logic','Logic, logic học','noun','HSK5','Học thuật','辵',22,'你的论证缺乏逻辑','nǐ de lùnzhèng quēfá luójí','Lập luận của bạn thiếu logic','học thuật'],
      ['zh','矛盾','矛盾','máodùn','Mâu thuẫn','Mâu thuẫn, xung đột','noun/adj','HSK5','Xã hội','矛',9,'这两个观点相互矛盾','zhè liǎng gè guāndiǎn xiānghù máodùn','Hai quan điểm này mâu thuẫn nhau','xã hội'],
      ['zh','培养','培養','péiyǎng','Bồi dưỡng','Bồi dưỡng, đào tạo','verb','HSK5','Giáo dục','土',11,'学校培养学生的能力','xuéxiào péiyǎng xuéshēng de nénglì','Trường học bồi dưỡng năng lực học sinh','giáo dục'],
      ['zh','批评','批評','pīpíng','Phê bình','Phê bình, chỉ trích','verb/noun','HSK5','Giao tiếp','手',15,'他善于批评和分析','tā shànyú pīpíng hé fēnxī','Anh ấy giỏi phê bình và phân tích','giao tiếp'],
      // HSK6 words
      ['zh','阐述','闡述','chǎnshù','Xiển thuật','Trình bày, giải thích','verb','HSK6','Học thuật','門',17,'他阐述了自己的观点','tā chǎnshù le zìjǐ de guāndiǎn','Anh ấy trình bày quan điểm của mình','học thuật'],
      ['zh','典型','典型','diǎnxíng','Điển hình','Điển hình, tiêu biểu','adj/noun','HSK6','Đánh giá','八',8,'这是一个典型的案例','zhè shì yīgè diǎnxíng de ànlì','Đây là một trường hợp điển hình','đánh giá'],
      ['zh','纷纷','紛紛','fēnfēn','Phân phân','Liên tục, lần lượt (số nhiều)','adv','HSK6','Trạng từ','糸',14,'大家纷纷发表意见','dàjiā fēnfēn fābiǎo yìjiàn','Mọi người lần lượt phát biểu ý kiến','trạng từ'],
      ['zh','归纳','歸納','guīnà','Quy nạp','Quy nạp, tổng hợp','verb','HSK6','Học thuật','止',10,'他善于归纳总结','tā shànyú guīnà zǒngjié','Anh ấy giỏi quy nạp tổng kết','học thuật'],
      ['zh','宏观','宏觀','hóngguān','Hồng quan','Vĩ mô, tổng quan','adj','HSK6','Học thuật','宀',7,'从宏观角度来看','cóng hóngguān jiǎodù lái kàn','Nhìn từ góc độ vĩ mô','kinh tế,học thuật'],
    ];

    zhAdvancedVocab.forEach(v => insertVocab.run(...v));

    console.log('✅ [Expanded] All HSK2-6 & A2-C2 curriculum data seeded successfully!');
  });

  runExpanded();
}

module.exports = { seedExpandedData };
