const db = require('./database');

function seedDatabase(force = false) {
  console.log('🌱 Checking seed data...');

  const exerciseCount = db.prepare('SELECT COUNT(*) as count FROM exercises').get();
  if (!force && exerciseCount.count >= 25) {
    console.log(`Current exercises in DB: ${exerciseCount.count}. Skipping re-seed.`);
    return;
  }

  console.log('Populating complete exercise bank for Pinyin, HSK, IPA, and A1...');

  const insertLanguage = db.prepare(`
    INSERT OR REPLACE INTO languages (id, name, native_name, flag, default_level)
    VALUES (?, ?, ?, ?, ?)
  `);

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

  const insertDialogue = db.prepare(`
    INSERT OR REPLACE INTO dialogues (id, language_id, title, topic, level, scenario_description, icon, lines_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const runSeed = db.transaction(() => {
    // 1. Languages
    insertLanguage.run('zh', 'Tiếng Trung', '中文 (汉语)', '🇨🇳', 'PINYIN');
    insertLanguage.run('en', 'Tiếng Anh', 'English (US/UK)', '🇬🇧', 'IPA');

    // 2. Levels for Chinese
    insertLevel.run('zh_pinyin', 'zh', 'PINYIN', 'Nhập Môn Pinyin & Bộ Thủ', 'Phát âm chuẩn 4 thanh điệu, quy tắc ghép âm và 8 nét cơ bản', '#10b981', 1);
    insertLevel.run('zh_hsk1', 'zh', 'HSK1', 'HSK 1 - Căn Bản', '150 từ vựng cốt lõi, chào hỏi, giới thiệu và mua sắm', '#3b82f6', 2);
    insertLevel.run('zh_hsk2', 'zh', 'HSK2', 'HSK 2 - Sơ Cấp', '300 từ vựng giao tiếp hàng ngày, hỏi đường và thời tiết', '#8b5cf6', 3);
    insertLevel.run('zh_hsk3', 'zh', 'HSK3', 'HSK 3 - Trung Cấp', '600 từ vựng biểu đạt cảm xúc, du lịch, ẩm thực', '#ec4899', 4);
    insertLevel.run('zh_hsk4', 'zh', 'HSK4', 'HSK 4 - Trung Cao Cấp', '1200 từ vựng bàn luận công việc, văn hóa, giải trí', '#f59e0b', 5);

    // 3. Levels for English
    insertLevel.run('en_ipa', 'en', 'IPA', 'Nhập Môn IPA 44 Âm', 'Bảng ký hiệu ngữ âm quốc tế, nguyên âm, phụ âm và trọng âm', '#06b6d4', 1);
    insertLevel.run('en_a1', 'en', 'A1', 'A1 - Beginner (Căn Bản)', 'Từ vựng sinh hoạt, giới thiệu bản thân, con số, thời gian', '#10b981', 2);
    insertLevel.run('en_a2', 'en', 'A2', 'A2 - Elementary (Sơ Cấp)', 'Giao tiếp du lịch, đặt phòng khách sạn, gọi món nhà hàng', '#3b82f6', 3);
    insertLevel.run('en_b1', 'en', 'B1', 'B1 - Intermediate (Trung Cấp)', 'Phỏng vấn công việc, viết email, bày tỏ quan điểm', '#8b5cf6', 4);
    insertLevel.run('en_b2', 'en', 'B2', 'B2 - Upper Intermediate (Cao Cấp)', 'Thuyết trình chuyên sâu, tranh luận xã hội và học thuật', '#f59e0b', 5);

    // 4. Units for Chinese (PINYIN)
    insertUnit.run('zh_u1_pinyin', 'zh_pinyin', 1, 'Thanh Mẫu & Vận Mẫu Cơ Bản', 'Làm quen các âm môi, âm đầu lưỡi và 6 nguyên âm chính', 'Volume2', '#10b981');
    insertUnit.run('zh_u2_pinyin', 'zh_pinyin', 2, '4 Thanh Điệu & 8 Nét Cơ Bản', 'Chinh phục độ cao thanh điệu và quy tắc viết nét chữ Hán', 'PenTool', '#059669');

    // Units for Chinese (HSK1)
    insertUnit.run('zh_u1_hsk1', 'zh_hsk1', 1, 'Chào Hỏi & Gặp Gỡ Ban Đầu', 'Tự tin nói lời chào, cảm ơn, xin lỗi và hỏi tên', 'HandMetal', '#3b82f6');
    insertUnit.run('zh_u2_hsk1', 'zh_hsk1', 2, 'Số Đếm & Mua Sắm Hàng Ngày', 'Hỏi giá tiền, trả giá và đếm số từ 1 đến 100', 'ShoppingBag', '#2563eb');

    // Units for English (IPA)
    insertUnit.run('en_u1_ipa', 'en_ipa', 1, 'Nguyên Âm Đơn & Âm Dài/Ngắn', 'Phân biệt chính xác cặp âm /iː/ vs /ɪ/, /uː/ vs /ʊ/', 'Headphones', '#06b6d4');
    insertUnit.run('en_u2_ipa', 'en_ipa', 2, 'Phụ Âm Gió & Vô Thanh / Hữu Thanh', 'Chinh phục âm khó nhằn /θ/ và /ð/ trong think & this', 'Mic', '#0891b2');

    // Units for English (A1)
    insertUnit.run('en_u1_a1', 'en_a1', 1, 'First Encounters & Greetings', 'Introduce yourself and make friends across the globe', 'Sparkles', '#10b981');
    insertUnit.run('en_u2_a1', 'en_a1', 2, 'Cafe, Dining & Daily Life', 'Order your favorite food and discuss everyday hobbies', 'Coffee', '#059669');

    // 5. Lessons for Chinese (PINYIN)
    insertLesson.run('zh_l_p1', 'zh_u1_pinyin', 1, 'Âm Môi & Âm Đầu Lưỡi (b, p, m, f)', 'Luyện nghe và phát âm chuẩn các thanh mẫu căn bản', 15, 'standard');
    insertLesson.run('zh_l_p2', 'zh_u1_pinyin', 2, 'Vận Mẫu Đơn (a, o, e, i, u, ü)', 'Cách mở khẩu hình chuẩn bản xứ Bắc Kinh', 15, 'speaking');
    insertLesson.run('zh_l_p3', 'zh_u1_pinyin', 3, 'Thử Thách Ghép Vần Pinyin', 'Bài kiểm tra phản xạ nghe và phân biệt âm tương tự', 20, 'checkpoint');
    insertLesson.run('zh_l_p4', 'zh_u2_pinyin', 1, '4 Thanh Điệu (Mā, Má, Mǎ, Mà)', 'Nhận diện thanh ngang, thanh sắc, thanh hỏi và thanh huyền gãy', 15, 'standard');
    insertLesson.run('zh_l_p5', 'zh_u2_pinyin', 2, 'Tập Viết 8 Nét Chữ Hán Căn Bản', 'Quy tắc từ trên xuống dưới, từ trái sang phải', 20, 'writing');

    // Lessons for Chinese (HSK1)
    insertLesson.run('zh_l_h1', 'zh_u1_hsk1', 1, 'Lời Chào Đầu Tiên: 你好 (Nǐ hǎo)', 'Học cách chào hỏi mọi người và nói lời tạm biệt', 15, 'standard');
    insertLesson.run('zh_l_h2', 'zh_u1_hsk1', 2, 'Bạn Tên Là Gì? (你叫什么名字？)', 'Hỏi và trả lời tên, quốc tịch với 我是...', 15, 'speaking');
    insertLesson.run('zh_l_h3', 'zh_u1_hsk1', 3, 'Cảm Ơn & Xin Lỗi: 谢谢与对不起', 'Các câu nói xã giao lịch sự không thể thiếu', 20, 'checkpoint');
    insertLesson.run('zh_l_h4', 'zh_u2_hsk1', 1, 'Số Đếm 1 - 10: 一, 二, 三...', 'Cách đếm và các chữ Hán số đếm quen thuộc', 15, 'writing');
    insertLesson.run('zh_l_h5', 'zh_u2_hsk1', 2, 'Hỏi Giá: 这个多少钱？(Bao nhiêu tiền?)', 'Đi chợ mua sắm và hỏi giá đồ uống', 20, 'standard');

    // English IPA Lessons
    insertLesson.run('en_l_ipa1', 'en_u1_ipa', 1, 'Cặp Âm /iː/ (sheep) vs /ɪ/ (ship)', 'Phân biệt khẩu hình cười dài và thả lỏng ngắn', 15, 'standard');
    insertLesson.run('en_l_ipa2', 'en_u1_ipa', 2, 'Cặp Âm /æ/ (cat) vs /e/ (bed)', 'Kỹ thuật hạ cằm để phát âm chuẩn âm e bẹt', 15, 'speaking');
    insertLesson.run('en_l_ipa3', 'en_u1_ipa', 3, 'Thử Thách Nghe Phân Biệt Âm IPA', 'Nghe từ tương tự và chọn ký hiệu phiên âm đúng', 20, 'checkpoint');

    // English A1 Lessons
    insertLesson.run('en_l_a1_1', 'en_u1_a1', 1, 'Hello & Nice to Meet You', 'Say hello, introduce your name and make friends', 15, 'standard');
    insertLesson.run('en_l_a1_2', 'en_u1_a1', 2, 'Where Are You From?', 'Countries, nationalities and where you live', 15, 'speaking');
    insertLesson.run('en_l_a1_3', 'en_u1_a1', 3, 'Checkpoint: Basic Greetings', 'Test your listening, speaking and translation skills', 20, 'checkpoint');

    // -------------------------------------------------------------
    // EXERCISES SECTION
    // -------------------------------------------------------------

    // LESSON zh_l_p1: Âm Môi & Âm Đầu Lưỡi (b, p, m, f)
    insertExercise.run(
      'zh_p1_ex1', 'zh_l_p1', 'listening',
      'Nghe và chọn thanh mẫu (âm đầu) phát âm đúng:',
      'b', 'bō', 'bō', 'Thanh mẫu b (bō - âm hai môi không bật hơi)',
      JSON.stringify(['b (bō)', 'p (pō)', 'm (mō)', 'f (fō)']),
      'b (bō)', 'Khép hai môi rồi mở ra, luồng hơi thoát ra nhẹ nhàng', null, 1
    );

    insertExercise.run(
      'zh_p1_ex2', 'zh_l_p1', 'speaking',
      'Nhấn Micro và phát âm to rõ thanh mẫu bō:',
      'b', 'bō', 'bō', 'Thanh mẫu b (bō)',
      JSON.stringify([]),
      'b', 'Khép môi rồi bật nhẹ luồng hơi không rung cổ họng: bō', null, 2
    );

    insertExercise.run(
      'zh_p1_ex3', 'zh_l_p1', 'matching',
      'Ghép thanh mẫu Pinyin với đặc điểm phát âm:',
      'b, p, m, f', 'b p m f', 'b, p, m, f', '4 Thanh mẫu âm môi',
      JSON.stringify({
        pairs: [
          { left: 'Thanh mẫu b', right: 'Âm hai môi KHÔNG bật hơi (bō)' },
          { left: 'Thanh mẫu p', right: 'Âm hai môi BẬT HƠI mạnh (pō)' },
          { left: 'Thanh mẫu m', right: 'Âm mũi hai môi (mō)' },
          { left: 'Thanh mẫu f', right: 'Âm răng môi trên dưới (fō)' }
        ]
      }),
      'MATCH_PAIRS', 'Phân biệt giữa b và p bằng luồng hơi trước miệng', null, 3
    );

    insertExercise.run(
      'zh_p1_ex4', 'zh_l_p1', 'listening',
      'Nghe và chọn thanh mẫu BẬT HƠI mạnh luồng gió:',
      'p', 'pō', 'pō', 'Thanh mẫu p (pō - bật hơi mạnh)',
      JSON.stringify(['p (pō)', 'b (bō)', 'm (mō)', 'd (dē)']),
      'p (pō)', 'Đặt tờ giấy trước miệng, phát âm p tờ giấy sẽ rung mạnh', null, 4
    );

    // LESSON zh_l_p2: Vận Mẫu Đơn (a, o, e, i, u, ü)
    insertExercise.run(
      'zh_p2_ex1', 'zh_l_p2', 'listening',
      'Nghe và chọn vận mẫu đơn tròn môi đặc biệt:',
      'ü', 'ü', 'ü', 'Vận mẫu ü (đọc tròn môi cố định)',
      JSON.stringify(['ü', 'u', 'i', 'o']),
      'ü', 'Khẩu hình như huýt sáo, giữ môi tròn không nhúc nhích', null, 1
    );

    insertExercise.run(
      'zh_p2_ex2', 'zh_l_p2', 'speaking',
      'Nhấn Micro và phát âm vận mẫu đơn: a:',
      'a', 'a', 'a', 'Vận mẫu a (mở to miệng)',
      JSON.stringify([]),
      'a', 'Há to miệng tự nhiên và phát âm: a', null, 2
    );

    insertExercise.run(
      'zh_p2_ex3', 'zh_l_p2', 'matching',
      'Ghép vận mẫu đơn Pinyin với âm tương đương trong tiếng Việt:',
      'a, o, e, ü', 'a o e ü', 'a, o, e, ü', 'Vận mẫu đơn',
      JSON.stringify({
        pairs: [
          { left: 'Vận mẫu a', right: 'Đọc giống "a" trong tiếng Việt' },
          { left: 'Vận mẫu o', right: 'Đọc giống "ô" (hơi lai u)' },
          { left: 'Vận mẫu e', right: 'Đọc giống "ưa"' },
          { left: 'Vận mẫu ü', right: 'Đọc giống "uy" (giữ tròn môi)' }
        ]
      }),
      'MATCH_PAIRS', 'Lưu ý vận mẫu e trong tiếng Trung đọc là ưa', null, 3
    );

    // LESSON zh_l_p3: Thử Thách Ghép Vần Pinyin
    insertExercise.run(
      'zh_p3_ex1', 'zh_l_p3', 'listening',
      'Nghe âm ghép và chọn phiên âm Pinyin đúng:',
      'bā', 'bā', 'bā', 'Âm tiết bā (b + a, Thanh 1: Số 8)',
      JSON.stringify(['bā', 'pā', 'mā', 'fā']),
      'bā', 'Thanh mẫu b ghép với vận mẫu a mang thanh ngang', null, 1
    );

    insertExercise.run(
      'zh_p3_ex2', 'zh_l_p3', 'speaking',
      'Nhấn Micro và phát âm từ: māma (mẹ):',
      'māma', 'māma', 'mā ma', 'Mẹ, má',
      JSON.stringify([]),
      'māma', 'Âm đầu thanh 1 ngân dài, âm sau đọc thanh nhẹ ngắn gọn', null, 2
    );

    insertExercise.run(
      'zh_p3_ex3', 'zh_l_p3', 'dictation',
      'Sắp xếp các thẻ âm tiết thành từ "bà ba" (Bố):',
      'bà ba', 'bàba', 'bà ba', 'Bố, ba',
      JSON.stringify(['ba', 'bà', 'ma', 'mā']),
      'bà ba', 'Thanh mẫu b ghép vần a thanh 4 rồi thanh nhẹ', null, 3
    );

    // LESSON zh_l_p4: 4 Thanh Điệu (Mā, Má, Mǎ, Mà)
    insertExercise.run(
      'zh_p4_ex1', 'zh_l_p4', 'listening',
      'Nghe và chọn từ mang Thanh 1 (Thanh ngang đều cao độ 5-5):',
      'mā', 'mā', 'mā', 'Thanh 1: Ngang đều, ngân vang',
      JSON.stringify(['mā (Thanh 1)', 'má (Thanh 2)', 'mǎ (Thanh 3)', 'mà (Thanh 4)']),
      'mā (Thanh 1)', 'Ký hiệu là một nét ngang trên đầu nguyên âm', null, 1
    );

    insertExercise.run(
      'zh_p4_ex2', 'zh_l_p4', 'listening',
      'Nghe và chọn từ mang Thanh 4 (Thanh rơi dứt khoát 5-1):',
      'mà', 'mà', 'mà', 'Thanh 4: Đi từ cao xuống thấp dứt khoát',
      JSON.stringify(['mà (Thanh 4)', 'mā (Thanh 1)', 'má (Thanh 2)', 'mǎ (Thanh 3)']),
      'mà (Thanh 4)', 'Phát âm dứt khoát và mạnh mẽ như một mệnh lệnh', null, 2
    );

    insertExercise.run(
      'zh_p4_ex3', 'zh_l_p4', 'speaking',
      'Nhấn Micro và phát âm Thanh 1: mā:',
      'mā', 'mā', 'mā', 'mā (Thanh 1: Mẹ)',
      JSON.stringify([]),
      'mā', 'Giữ giọng cao đều 5-5 không hạ xuống', null, 3
    );

    insertExercise.run(
      'zh_p4_ex4', 'zh_l_p4', 'matching',
      'Ghép ký hiệu 4 thanh điệu với quy luật biến chuyển cao độ:',
      '4 thanh điệu Pinyin', 'mā má mǎ mà', 'ˉ, ˊ, ˇ, ˋ', 'Quy luật cao độ 4 thanh',
      JSON.stringify({
        pairs: [
          { left: 'Thanh 1 (mā ˉ)', right: 'Cao đều phẳng 5-5' },
          { left: 'Thanh 2 (má ˊ)', right: 'Đi vút lên từ 3-5' },
          { left: 'Thanh 3 (mǎ ˇ)', right: 'Uốn lượn xuống rồi lên 2-1-4' },
          { left: 'Thanh 4 (mà ˋ)', right: 'Rơi dứt khoát từ 5-1' }
        ]
      }),
      'MATCH_PAIRS', 'Hãy quan sát hình dạng dấu thanh điệu', null, 4
    );

    // LESSON zh_l_p5: Tập Viết 8 Nét Chữ Hán Căn Bản
    insertExercise.run(
      'zh_ex_w1', 'zh_l_p5', 'writing',
      'Tập viết chữ "Nhất" (Số một) - Nét Ngang:',
      '一', '一', 'yī', 'Số 1',
      JSON.stringify([]),
      '一', 'Viết từ trái qua phải một nét ngang thẳng dứt khoát', '一', 1
    );

    insertExercise.run(
      'zh_ex_w2', 'zh_l_p5', 'writing',
      'Tập viết chữ "Nhân" (Con người) - Nét Phẩy và Nét Mác:',
      '人', '人', 'rén', 'Con người, nhân loại',
      JSON.stringify([]),
      '人', 'Quy tắc: Nét phẩy bên trái trước, nét mác bên phải sau', '人', 2
    );

    insertExercise.run(
      'zh_ex_w3', 'zh_l_p5', 'writing',
      'Tập viết chữ "Khẩu" (Cái miệng) - Quy tắc Ngoài trước Trong sau:',
      '口', '口', 'kǒu', 'Cái miệng, khẩu',
      JSON.stringify([]),
      '口', 'Sổ trái -> Ngang gập -> Khóa đáy bằng nét ngang', '口', 3
    );

    // LESSON zh_l_h1: Lời Chào Đầu Tiên: 你好
    insertExercise.run(
      'zh_ex_1', 'zh_l_h1', 'listening',
      'Nghe và chọn nghĩa tiếng Việt chính xác:',
      '你好', '你好', 'nǐ hǎo', 'Xin chào',
      JSON.stringify(['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Không có chi']),
      'Xin chào', 'Chào hỏi cơ bản khi gặp mặt', null, 1
    );

    insertExercise.run(
      'zh_ex_2', 'zh_l_h1', 'speaking',
      'Nhấn Micro và phát âm to rõ câu sau:',
      '你好', '你好', 'nǐ hǎo', 'Xin chào',
      JSON.stringify([]),
      '你好', 'Đọc với âm điệu: nǐ hǎo (biến điệu thanh 3 thành thanh 2: ní hǎo)', null, 2
    );

    insertExercise.run(
      'zh_ex_3', 'zh_l_h1', 'writing',
      'Tập viết chữ Hán theo thứ tự nét chuẩn:',
      '你', '你', 'nǐ', 'Bạn, anh, chị (đại từ ngôi thứ 2)',
      JSON.stringify([]),
      '你', 'Gồm bộ Nhân đứng (亻) bên trái và chữ Nhĩ (尔) bên phải', '你', 3
    );

    insertExercise.run(
      'zh_ex_4', 'zh_l_h1', 'matching',
      'Ghép các cặp từ tương ứng:',
      'Ghép từ vựng chào hỏi', '你好, 再见, 谢谢', 'nǐ hǎo, zài jiàn, xiè xie', 'Các câu chào hỏi',
      JSON.stringify({
        pairs: [
          { left: '你好 (nǐ hǎo)', right: 'Xin chào' },
          { left: '再见 (zài jiàn)', right: 'Tạm biệt' },
          { left: '谢谢 (xiè xie)', right: 'Cảm ơn' },
          { left: '早上好 (zǎoshang hǎo)', right: 'Chào buổi sáng' }
        ]
      }),
      'MATCH_PAIRS', 'Hãy ghép chính xác các cặp từ', null, 4
    );

    insertExercise.run(
      'zh_ex_5', 'zh_l_h1', 'dictation',
      'Sắp xếp các thẻ từ thành câu hoàn chỉnh:',
      '你好，很高兴认识你', '你好，很高兴认识你', 'nǐ hǎo, hěn gāoxìng rènshí nǐ', 'Chào bạn, rất vui được gặp bạn',
      JSON.stringify(['认识', '你好', '很高兴', '你', '再见']),
      '你好 很高兴 认识 你', 'Bắt đầu bằng lời chào 你好', null, 5
    );

    // LESSON zh_l_h2: Bạn Tên Là Gì? (你叫什么名字？)
    insertExercise.run(
      'zh_h2_ex1', 'zh_l_h2', 'listening',
      'Nghe và chọn câu dịch tiếng Việt đúng:',
      '你叫什么名字？', '你叫什么名字？', 'nǐ jiào shénme míngzì?', 'Bạn tên là gì?',
      JSON.stringify(['Bạn tên là gì?', 'Bạn đi đâu đấy?', 'Bạn là người nước nào?', 'Bạn khỏe không?']),
      'Bạn tên là gì?', 'Cấu trúc hỏi tên: 你叫什么名字？', null, 1
    );

    insertExercise.run(
      'zh_h2_ex2', 'zh_l_h2', 'speaking',
      'Nhấn Micro và nói: 我叫 Minh (Tôi tên là Minh):',
      '我叫', '我叫', 'wǒ jiào', 'Tôi tên là...',
      JSON.stringify([]),
      '我叫', 'wǒ jiào: Tôi tên là...', null, 2
    );

    insertExercise.run(
      'zh_h2_ex3', 'zh_l_h2', 'translation',
      'Dịch câu sau sang tiếng Trung: "Tôi là người Việt Nam"',
      '我是越南人', '我是越南人', 'wǒ shì Yuènán rén', 'Tôi là người Việt Nam',
      JSON.stringify(['我是', '中国人', '越南人', '学生', '老师']),
      '我是 越南人', 'Chủ ngữ 我 là đại từ ngôi thứ nhất', null, 3
    );

    // LESSON zh_l_h3: Cảm Ơn & Xin Lỗi: 谢谢与对不起
    insertExercise.run(
      'zh_h3_ex1', 'zh_l_h3', 'listening',
      'Nghe và chọn câu đáp lại khi ai đó nói "谢谢" (Cảm ơn):',
      '不客气', '不客气', 'bú kèqi', 'Không có chi, đừng khách sáo',
      JSON.stringify(['不客气 (Bú kèqi)', '没关系 (Méi guānxi)', '再见 (Zàijiàn)', '你好 (Nǐhǎo)']),
      '不客气 (Bú kèqi)', 'Đáp lại lời cảm ơn bằng 不客气', null, 1
    );

    insertExercise.run(
      'zh_h3_ex2', 'zh_l_h3', 'speaking',
      'Nhấn Micro và phát âm câu: 对不起 (Xin lỗi):',
      '对不起', '对不起', 'duìbuqǐ', 'Xin lỗi',
      JSON.stringify([]),
      '对不起', 'Phát âm rõ âm đầu duì và bật thanh 3 qǐ', null, 2
    );

    // LESSON zh_l_h4: Số Đếm 1 - 10
    insertExercise.run(
      'zh_h4_ex1', 'zh_l_h4', 'writing',
      'Tập viết chữ "Nhị" (Số hai) - Hai nét ngang:',
      '二', '二', 'èr', 'Số 2',
      JSON.stringify([]),
      '二', 'Nét ngang trên ngắn hơn nét ngang dưới', '二', 1
    );

    insertExercise.run(
      'zh_h4_ex2', 'zh_l_h4', 'writing',
      'Tập viết chữ "Tam" (Số ba) - Ba nét ngang:',
      '三', '三', 'sān', 'Số 3',
      JSON.stringify([]),
      '三', 'Ba nét ngang song song cách đều nhau', '三', 2
    );

    insertExercise.run(
      'zh_h4_ex3', 'zh_l_h4', 'matching',
      'Ghép số Hán với phiên âm Pinyin:',
      '一, 二, 三, 十', 'yī èr sān shí', 'Số đếm HSK1', 'Số đếm',
      JSON.stringify({
        pairs: [
          { left: '一 (yī)', right: 'Số 1' },
          { left: '二 (èr)', right: 'Số 2' },
          { left: '三 (sān)', right: 'Số 3' },
          { left: '十 (shí)', right: 'Số 10' }
        ]
      }),
      'MATCH_PAIRS', 'Số đếm cơ bản', null, 3
    );

    // ENGLISH IPA LESSONS
    // LESSON en_l_ipa1: Cặp Âm /iː/ vs /ɪ/
    insertExercise.run(
      'en_ipa1_ex1', 'en_l_ipa1', 'listening',
      'Listen and choose the word with the LONG /iː/ sound:',
      'sheep', 'sheep', '/ʃiːp/', 'Con cừu (âm /iː/ dài)',
      JSON.stringify(['sheep (/ʃiːp/)', 'ship (/ʃɪp/)', 'shop (/ʃɒp/)', 'shape (/ʃeɪp/)']),
      'sheep (/ʃiːp/)', 'Kéo dài miệng sang hai bên như đang cười mỉm', null, 1
    );

    insertExercise.run(
      'en_ipa1_ex2', 'en_l_ipa1', 'speaking',
      'Press Mic and pronounce clearly: sheep:',
      'sheep', 'sheep', '/ʃiːp/', 'Con cừu',
      JSON.stringify([]),
      'sheep', 'Hold the /iː/ sound for at least 1 second', null, 2
    );

    insertExercise.run(
      'en_ipa1_ex3', 'en_l_ipa1', 'matching',
      'Match English words with their correct IPA vowel sounds:',
      'sheep, ship, eat, it', 'sheep ship eat it', '/iː/ vs /ɪ/', 'Long vs Short i',
      JSON.stringify({
        pairs: [
          { left: 'sheep', right: '/ʃiːp/ (Nguyên âm dài /iː/)' },
          { left: 'ship', right: '/ʃɪp/ (Nguyên âm ngắn /ɪ/)' },
          { left: 'eat', right: '/iːt/ (Nguyên âm dài /iː/)' },
          { left: 'it', right: '/ɪt/ (Nguyên âm ngắn /ɪ/)' }
        ]
      }),
      'MATCH_PAIRS', 'Phân biệt nguyên âm dài và ngắn', null, 3
    );

    // LESSON en_l_ipa2: Cặp Âm /æ/ vs /e/
    insertExercise.run(
      'en_ipa2_ex1', 'en_l_ipa2', 'listening',
      'Listen and select the word with open /æ/ sound:',
      'cat', 'cat', '/kæt/', 'Con mèo (âm e bẹt /æ/)',
      JSON.stringify(['cat (/kæt/)', 'bed (/bed/)', 'cut (/kʌt/)', 'cot (/kɒt/)']),
      'cat (/kæt/)', 'Hạ cằm dưới mở rộng khẩu hình phát âm e bẹt', null, 1
    );

    insertExercise.run(
      'en_ipa2_ex2', 'en_l_ipa2', 'speaking',
      'Press Mic and pronounce: cat:',
      'cat', 'cat', '/kæt/', 'Con mèo',
      JSON.stringify([]),
      'cat', 'Lower your jaw for the clear /æ/ sound', null, 2
    );

    // LESSON en_l_a1_1
    insertExercise.run(
      'en_ex_1', 'en_l_a1_1', 'listening',
      'Listen and choose the correct meaning:',
      'Nice to meet you!', 'Nice to meet you!', '/naɪs tuː miːt juː/', 'Rất vui được gặp bạn!',
      JSON.stringify(['Rất vui được gặp bạn!', 'Hẹn gặp lại bạn ngày mai!', 'Cảm ơn bạn rất nhiều!', 'Bạn tên là gì?']),
      'Rất vui được gặp bạn!', 'Lịch sự khi gặp ai lần đầu', null, 1
    );

    insertExercise.run(
      'en_ex_2', 'en_l_a1_1', 'speaking',
      'Press Mic and pronounce this sentence clearly:',
      'Nice to meet you!', 'Nice to meet you!', '/naɪs tuː miːt juː/', 'Rất vui được gặp bạn!',
      JSON.stringify([]),
      'Nice to meet you!', 'Focus on the final sound /s/ in "Nice" and /t/ in "meet"', null, 2
    );

    insertExercise.run(
      'en_ex_3', 'en_l_a1_1', 'translation',
      'Dịch câu sau sang tiếng Anh:',
      'Tôi là một học sinh.', 'I am a student.', '/aɪ æm ə ˈstjuː.dənt/', 'Tôi là một học sinh.',
      JSON.stringify(['a', 'student', 'I', 'teacher', 'am', 'is']),
      'I am a student', 'Chủ ngữ I đi với động từ to be am', null, 3
    );

    insertExercise.run(
      'en_ex_4', 'en_l_a1_1', 'matching',
      'Match the English words with their Vietnamese translations:',
      'Match greetings', 'Hello, Goodbye, Thank you, Please', 'Greetings', 'Lời chào hỏi',
      JSON.stringify({
        pairs: [
          { left: 'Hello', right: 'Xin chào' },
          { left: 'Goodbye', right: 'Tạm biệt' },
          { left: 'Thank you', right: 'Cảm ơn bạn' },
          { left: 'Please', right: 'Làm ơn / Xin vui lòng' }
        ]
      }),
      'MATCH_PAIRS', 'Pair each word', null, 4
    );
  });

  runSeed();
  console.log('✅ Seed data successfully populated with all exercises!');
}

module.exports = { seedDatabase };
