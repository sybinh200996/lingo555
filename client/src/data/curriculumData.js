/**
 * curriculumData.js
 * Comprehensive client-side offline dataset for all Chinese & English curricula.
 * Ensures 100% resilient lesson loading without server dependency.
 */

import { getCurriculumUnitsForLevel, getCurriculumLessonById } from './fullCurriculumGenerator.js';
import { AUTHENTIC_ZH_DATA, AUTHENTIC_EN_DATA, getAuthenticLesson } from './authenticCurriculumData.js';
import { buildScaffoldedLessonFlow } from '../utils/smartLessonBuilder.js';

export const CURRICULUM_LEVELS = [
  {
    "id": "zh_pinyin",
    "language_id": "zh",
    "code": "PINYIN",
    "title": "Nhập Môn Pinyin & Bộ Thủ",
    "subtitle": "Phát âm chuẩn 4 thanh điệu, quy tắc ghép âm và 8 nét cơ bản",
    "color": "#10b981",
    "order_index": 1
  },
  {
    "id": "en_ipa",
    "language_id": "en",
    "code": "IPA",
    "title": "Nhập Môn IPA 44 Âm",
    "subtitle": "Bảng ký hiệu ngữ âm quốc tế, nguyên âm, phụ âm và trọng âm",
    "color": "#06b6d4",
    "order_index": 1
  },
  {
    "id": "zh_hsk1",
    "language_id": "zh",
    "code": "HSK1",
    "title": "HSK 1 - Căn Bản",
    "subtitle": "150 từ vựng cốt lõi, chào hỏi, giới thiệu và mua sắm",
    "color": "#3b82f6",
    "order_index": 2
  },
  {
    "id": "en_a1",
    "language_id": "en",
    "code": "A1",
    "title": "A1 - Beginner (Căn Bản)",
    "subtitle": "Từ vựng sinh hoạt, giới thiệu bản thân, con số, thời gian",
    "color": "#10b981",
    "order_index": 2
  },
  {
    "id": "zh_hsk2",
    "language_id": "zh",
    "code": "HSK2",
    "title": "HSK 2 - Sơ Cấp",
    "subtitle": "300 từ vựng giao tiếp hàng ngày, hỏi đường và thời tiết",
    "color": "#8b5cf6",
    "order_index": 3
  },
  {
    "id": "en_a2",
    "language_id": "en",
    "code": "A2",
    "title": "A2 - Elementary (Sơ Cấp)",
    "subtitle": "Giao tiếp du lịch, đặt phòng khách sạn, gọi món nhà hàng",
    "color": "#3b82f6",
    "order_index": 3
  },
  {
    "id": "zh_hsk3",
    "language_id": "zh",
    "code": "HSK3",
    "title": "HSK 3 - Trung Cấp",
    "subtitle": "600 từ vựng biểu đạt cảm xúc, du lịch, ẩm thực",
    "color": "#ec4899",
    "order_index": 4
  },
  {
    "id": "en_b1",
    "language_id": "en",
    "code": "B1",
    "title": "B1 - Intermediate (Trung Cấp)",
    "subtitle": "Phỏng vấn công việc, viết email, bày tỏ quan điểm",
    "color": "#8b5cf6",
    "order_index": 4
  },
  {
    "id": "zh_hsk4",
    "language_id": "zh",
    "code": "HSK4",
    "title": "HSK 4 - Trung Cao Cấp",
    "subtitle": "1200 từ vựng bàn luận công việc, văn hóa, giải trí",
    "color": "#f59e0b",
    "order_index": 5
  },
  {
    "id": "en_b2",
    "language_id": "en",
    "code": "B2",
    "title": "B2 - Upper Intermediate (Cao Cấp)",
    "subtitle": "Thuyết trình chuyên sâu, tranh luận xã hội và học thuật",
    "color": "#f59e0b",
    "order_index": 5
  },
  {
    "id": "zh_hsk5",
    "language_id": "zh",
    "code": "HSK5",
    "title": "HSK 5 - Cao Cấp",
    "subtitle": "2500 từ vựng đọc báo, viết luận, thuyết trình",
    "color": "#ef4444",
    "order_index": 6
  },
  {
    "id": "en_c1",
    "language_id": "en",
    "code": "C1",
    "title": "C1 - Advanced (Thành Thạo)",
    "subtitle": "Tiếng Anh học thuật, IELTS 7.0+, viết nghiên cứu",
    "color": "#ef4444",
    "order_index": 6
  },
  {
    "id": "zh_hsk6",
    "language_id": "zh",
    "code": "HSK6",
    "title": "HSK 6 - Thành Thạo",
    "subtitle": "5000+ từ vựng chuyên ngành, văn học, học thuật",
    "color": "#dc2626",
    "order_index": 7
  },
  {
    "id": "zh_practical",
    "language_id": "zh",
    "code": "THỰC CHIẾN",
    "title": "Tiếng Trung Thực Chiến",
    "subtitle": "Xưởng may, nhà máy, xuất nhập khẩu, logistics và đời sống",
    "color": "#059669",
    "order_index": 8
  },
  {
    "id": "en_c2",
    "language_id": "en",
    "code": "C2",
    "title": "C2 - Proficiency (Chuyên Nghiệp)",
    "subtitle": "Trình độ bản ngữ, văn học, pháp lý, y khoa",
    "color": "#dc2626",
    "order_index": 7
  }
];

export const CURRICULUM_UNITS_BY_LEVEL = {
  "zh_pinyin": [
    {
      "id": "zh_u1_pinyin",
      "level_id": "zh_pinyin",
      "unit_number": 1,
      "title": "Thanh Mẫu & Vận Mẫu Cơ Bản",
      "description": "Làm quen các âm môi, âm đầu lưỡi và 6 nguyên âm chính",
      "icon": "Volume2",
      "banner_color": "#10b981",
      "levelBadge": "ZH_PINYIN",
      "lessons": [
        {
          "id": "zh_l_p1",
          "unit_id": "zh_u1_pinyin",
          "lesson_number": 1,
          "title": "Âm Môi & Âm Đầu Lưỡi (b, p, m, f)",
          "description": "Luyện nghe và phát âm chuẩn các thanh mẫu căn bản",
          "xp_reward": 15,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_p1_ex1",
              "lesson_id": "zh_l_p1",
              "type": "listening",
              "prompt": "Nghe và chọn thanh mẫu (âm đầu) phát âm đúng:",
              "target_text": "b",
              "target_audio_text": "bō",
              "phonetic": "bō",
              "vietnamese_meaning": "Thanh mẫu b (bō - âm hai môi không bật hơi)",
              "options": [
                "b (bō)",
                "p (pō)",
                "m (mō)",
                "f (fō)"
              ],
              "correct_answer": "b (bō)",
              "hint": "Khép hai môi rồi mở ra, luồng hơi thoát ra nhẹ nhàng",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_p1_ex2",
              "lesson_id": "zh_l_p1",
              "type": "speaking",
              "prompt": "Nhấn Micro và phát âm to rõ thanh mẫu bō:",
              "target_text": "b",
              "target_audio_text": "bō",
              "phonetic": "bō",
              "vietnamese_meaning": "Thanh mẫu b (bō)",
              "options": [],
              "correct_answer": "b",
              "hint": "Khép môi rồi bật nhẹ luồng hơi không rung cổ họng: bō",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_p1_ex3",
              "lesson_id": "zh_l_p1",
              "type": "matching",
              "prompt": "Ghép thanh mẫu Pinyin với đặc điểm phát âm:",
              "target_text": "b, p, m, f",
              "target_audio_text": "b p m f",
              "phonetic": "b, p, m, f",
              "vietnamese_meaning": "4 Thanh mẫu âm môi",
              "options": {
                "pairs": [
                  {
                    "left": "Thanh mẫu b",
                    "right": "Âm hai môi KHÔNG bật hơi (bō)"
                  },
                  {
                    "left": "Thanh mẫu p",
                    "right": "Âm hai môi BẬT HƠI mạnh (pō)"
                  },
                  {
                    "left": "Thanh mẫu m",
                    "right": "Âm mũi hai môi (mō)"
                  },
                  {
                    "left": "Thanh mẫu f",
                    "right": "Âm răng môi trên dưới (fō)"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Phân biệt giữa b và p bằng luồng hơi trước miệng",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_p1_ex4",
              "lesson_id": "zh_l_p1",
              "type": "listening",
              "prompt": "Nghe và chọn thanh mẫu BẬT HƠI mạnh luồng gió:",
              "target_text": "p",
              "target_audio_text": "pō",
              "phonetic": "pō",
              "vietnamese_meaning": "Thanh mẫu p (pō - bật hơi mạnh)",
              "options": [
                "p (pō)",
                "b (bō)",
                "m (mō)",
                "d (dē)"
              ],
              "correct_answer": "p (pō)",
              "hint": "Đặt tờ giấy trước miệng, phát âm p tờ giấy sẽ rung mạnh",
              "stroke_char": null,
              "order_index": 4
            }
          ]
        },
        {
          "id": "zh_l_p2",
          "unit_id": "zh_u1_pinyin",
          "lesson_number": 2,
          "title": "Vận Mẫu Đơn (a, o, e, i, u, ü)",
          "description": "Cách mở khẩu hình chuẩn bản xứ Bắc Kinh",
          "xp_reward": 15,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_p2_ex1",
              "lesson_id": "zh_l_p2",
              "type": "listening",
              "prompt": "Nghe và chọn vận mẫu đơn tròn môi đặc biệt:",
              "target_text": "ü",
              "target_audio_text": "ü",
              "phonetic": "ü",
              "vietnamese_meaning": "Vận mẫu ü (đọc tròn môi cố định)",
              "options": [
                "ü",
                "u",
                "i",
                "o"
              ],
              "correct_answer": "ü",
              "hint": "Khẩu hình như huýt sáo, giữ môi tròn không nhúc nhích",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_p2_ex2",
              "lesson_id": "zh_l_p2",
              "type": "speaking",
              "prompt": "Nhấn Micro và phát âm vận mẫu đơn: a:",
              "target_text": "a",
              "target_audio_text": "a",
              "phonetic": "a",
              "vietnamese_meaning": "Vận mẫu a (mở to miệng)",
              "options": [],
              "correct_answer": "a",
              "hint": "Há to miệng tự nhiên và phát âm: a",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_p2_ex3",
              "lesson_id": "zh_l_p2",
              "type": "matching",
              "prompt": "Ghép vận mẫu đơn Pinyin với âm tương đương trong tiếng Việt:",
              "target_text": "a, o, e, ü",
              "target_audio_text": "a o e ü",
              "phonetic": "a, o, e, ü",
              "vietnamese_meaning": "Vận mẫu đơn",
              "options": {
                "pairs": [
                  {
                    "left": "Vận mẫu a",
                    "right": "Đọc giống \"a\" trong tiếng Việt"
                  },
                  {
                    "left": "Vận mẫu o",
                    "right": "Đọc giống \"ô\" (hơi lai u)"
                  },
                  {
                    "left": "Vận mẫu e",
                    "right": "Đọc giống \"ưa\""
                  },
                  {
                    "left": "Vận mẫu ü",
                    "right": "Đọc giống \"uy\" (giữ tròn môi)"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Lưu ý vận mẫu e trong tiếng Trung đọc là ưa",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        },
        {
          "id": "zh_l_p3",
          "unit_id": "zh_u1_pinyin",
          "lesson_number": 3,
          "title": "Thử Thách Ghép Vần Pinyin",
          "description": "Bài kiểm tra phản xạ nghe và phân biệt âm tương tự",
          "xp_reward": 20,
          "type": "checkpoint",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_p3_ex1",
              "lesson_id": "zh_l_p3",
              "type": "listening",
              "prompt": "Nghe âm ghép và chọn phiên âm Pinyin đúng:",
              "target_text": "bā",
              "target_audio_text": "bā",
              "phonetic": "bā",
              "vietnamese_meaning": "Âm tiết bā (b + a, Thanh 1: Số 8)",
              "options": [
                "bā",
                "pā",
                "mā",
                "fā"
              ],
              "correct_answer": "bā",
              "hint": "Thanh mẫu b ghép với vận mẫu a mang thanh ngang",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_p3_ex2",
              "lesson_id": "zh_l_p3",
              "type": "speaking",
              "prompt": "Nhấn Micro và phát âm từ: māma (mẹ):",
              "target_text": "māma",
              "target_audio_text": "māma",
              "phonetic": "mā ma",
              "vietnamese_meaning": "Mẹ, má",
              "options": [],
              "correct_answer": "māma",
              "hint": "Âm đầu thanh 1 ngân dài, âm sau đọc thanh nhẹ ngắn gọn",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_p3_ex3",
              "lesson_id": "zh_l_p3",
              "type": "dictation",
              "prompt": "Sắp xếp các thẻ âm tiết thành từ \"bà ba\" (Bố):",
              "target_text": "bà ba",
              "target_audio_text": "bàba",
              "phonetic": "bà ba",
              "vietnamese_meaning": "Bố, ba",
              "options": [
                "ba",
                "bà",
                "ma",
                "mā"
              ],
              "correct_answer": "bà ba",
              "hint": "Thanh mẫu b ghép vần a thanh 4 rồi thanh nhẹ",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        }
      ]
    },
    {
      "id": "zh_u2_pinyin",
      "level_id": "zh_pinyin",
      "unit_number": 2,
      "title": "4 Thanh Điệu & 8 Nét Cơ Bản",
      "description": "Chinh phục độ cao thanh điệu và quy tắc viết nét chữ Hán",
      "icon": "PenTool",
      "banner_color": "#059669",
      "levelBadge": "ZH_PINYIN",
      "lessons": [
        {
          "id": "zh_l_p4",
          "unit_id": "zh_u2_pinyin",
          "lesson_number": 1,
          "title": "4 Thanh Điệu (Mā, Má, Mǎ, Mà)",
          "description": "Nhận diện thanh ngang, thanh sắc, thanh hỏi và thanh huyền gãy",
          "xp_reward": 15,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_p4_ex1",
              "lesson_id": "zh_l_p4",
              "type": "listening",
              "prompt": "Nghe và chọn từ mang Thanh 1 (Thanh ngang đều cao độ 5-5):",
              "target_text": "mā",
              "target_audio_text": "mā",
              "phonetic": "mā",
              "vietnamese_meaning": "Thanh 1: Ngang đều, ngân vang",
              "options": [
                "mā (Thanh 1)",
                "má (Thanh 2)",
                "mǎ (Thanh 3)",
                "mà (Thanh 4)"
              ],
              "correct_answer": "mā (Thanh 1)",
              "hint": "Ký hiệu là một nét ngang trên đầu nguyên âm",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_p4_ex2",
              "lesson_id": "zh_l_p4",
              "type": "listening",
              "prompt": "Nghe và chọn từ mang Thanh 4 (Thanh rơi dứt khoát 5-1):",
              "target_text": "mà",
              "target_audio_text": "mà",
              "phonetic": "mà",
              "vietnamese_meaning": "Thanh 4: Đi từ cao xuống thấp dứt khoát",
              "options": [
                "mà (Thanh 4)",
                "mā (Thanh 1)",
                "má (Thanh 2)",
                "mǎ (Thanh 3)"
              ],
              "correct_answer": "mà (Thanh 4)",
              "hint": "Phát âm dứt khoát và mạnh mẽ như một mệnh lệnh",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_p4_ex3",
              "lesson_id": "zh_l_p4",
              "type": "speaking",
              "prompt": "Nhấn Micro và phát âm Thanh 1: mā:",
              "target_text": "mā",
              "target_audio_text": "mā",
              "phonetic": "mā",
              "vietnamese_meaning": "mā (Thanh 1: Mẹ)",
              "options": [],
              "correct_answer": "mā",
              "hint": "Giữ giọng cao đều 5-5 không hạ xuống",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_p4_ex4",
              "lesson_id": "zh_l_p4",
              "type": "matching",
              "prompt": "Ghép ký hiệu 4 thanh điệu với quy luật biến chuyển cao độ:",
              "target_text": "4 thanh điệu Pinyin",
              "target_audio_text": "mā má mǎ mà",
              "phonetic": "ˉ, ˊ, ˇ, ˋ",
              "vietnamese_meaning": "Quy luật cao độ 4 thanh",
              "options": {
                "pairs": [
                  {
                    "left": "Thanh 1 (mā ˉ)",
                    "right": "Cao đều phẳng 5-5"
                  },
                  {
                    "left": "Thanh 2 (má ˊ)",
                    "right": "Đi vút lên từ 3-5"
                  },
                  {
                    "left": "Thanh 3 (mǎ ˇ)",
                    "right": "Uốn lượn xuống rồi lên 2-1-4"
                  },
                  {
                    "left": "Thanh 4 (mà ˋ)",
                    "right": "Rơi dứt khoát từ 5-1"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Hãy quan sát hình dạng dấu thanh điệu",
              "stroke_char": null,
              "order_index": 4
            }
          ]
        },
        {
          "id": "zh_l_p5",
          "unit_id": "zh_u2_pinyin",
          "lesson_number": 2,
          "title": "Tập Viết 8 Nét Chữ Hán Căn Bản",
          "description": "Quy tắc từ trên xuống dưới, từ trái sang phải",
          "xp_reward": 20,
          "type": "writing",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_ex_w1",
              "lesson_id": "zh_l_p5",
              "type": "writing",
              "prompt": "Tập viết chữ \"Nhất\" (Số một) - Nét Ngang:",
              "target_text": "一",
              "target_audio_text": "一",
              "phonetic": "yī",
              "vietnamese_meaning": "Số 1",
              "options": [],
              "correct_answer": "一",
              "hint": "Viết từ trái qua phải một nét ngang thẳng dứt khoát",
              "stroke_char": "一",
              "order_index": 1
            },
            {
              "id": "zh_ex_w2",
              "lesson_id": "zh_l_p5",
              "type": "writing",
              "prompt": "Tập viết chữ \"Nhân\" (Con người) - Nét Phẩy và Nét Mác:",
              "target_text": "人",
              "target_audio_text": "人",
              "phonetic": "rén",
              "vietnamese_meaning": "Con người, nhân loại",
              "options": [],
              "correct_answer": "人",
              "hint": "Quy tắc: Nét phẩy bên trái trước, nét mác bên phải sau",
              "stroke_char": "人",
              "order_index": 2
            },
            {
              "id": "zh_ex_w3",
              "lesson_id": "zh_l_p5",
              "type": "writing",
              "prompt": "Tập viết chữ \"Khẩu\" (Cái miệng) - Quy tắc Ngoài trước Trong sau:",
              "target_text": "口",
              "target_audio_text": "口",
              "phonetic": "kǒu",
              "vietnamese_meaning": "Cái miệng, khẩu",
              "options": [],
              "correct_answer": "口",
              "hint": "Sổ trái -> Ngang gập -> Khóa đáy bằng nét ngang",
              "stroke_char": "口",
              "order_index": 3
            }
          ]
        }
      ]
    }
  ],
  "zh_hsk1": [
    {
      "id": "zh_u1_hsk1",
      "level_id": "zh_hsk1",
      "unit_number": 1,
      "title": "Chào Hỏi & Gặp Gỡ Ban Đầu",
      "description": "Tự tin nói lời chào, cảm ơn, xin lỗi và hỏi tên",
      "icon": "HandMetal",
      "banner_color": "#3b82f6",
      "levelBadge": "ZH_HSK1",
      "lessons": [
        {
          "id": "zh_l_h1",
          "unit_id": "zh_u1_hsk1",
          "lesson_number": 1,
          "title": "Lời Chào Đầu Tiên: 你好 (Nǐ hǎo)",
          "description": "Học cách chào hỏi mọi người và nói lời tạm biệt",
          "xp_reward": 15,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_ex_1",
              "lesson_id": "zh_l_h1",
              "type": "listening",
              "prompt": "Nghe và chọn nghĩa tiếng Việt chính xác:",
              "target_text": "你好",
              "target_audio_text": "你好",
              "phonetic": "nǐ hǎo",
              "vietnamese_meaning": "Xin chào",
              "options": [
                "Xin chào",
                "Tạm biệt",
                "Cảm ơn",
                "Không có chi"
              ],
              "correct_answer": "Xin chào",
              "hint": "Chào hỏi cơ bản khi gặp mặt",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_ex_2",
              "lesson_id": "zh_l_h1",
              "type": "speaking",
              "prompt": "Nhấn Micro và phát âm to rõ câu sau:",
              "target_text": "你好",
              "target_audio_text": "你好",
              "phonetic": "nǐ hǎo",
              "vietnamese_meaning": "Xin chào",
              "options": [],
              "correct_answer": "你好",
              "hint": "Đọc với âm điệu: nǐ hǎo (biến điệu thanh 3 thành thanh 2: ní hǎo)",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_ex_3",
              "lesson_id": "zh_l_h1",
              "type": "writing",
              "prompt": "Tập viết chữ Hán theo thứ tự nét chuẩn:",
              "target_text": "你",
              "target_audio_text": "你",
              "phonetic": "nǐ",
              "vietnamese_meaning": "Bạn, anh, chị (đại từ ngôi thứ 2)",
              "options": [],
              "correct_answer": "你",
              "hint": "Gồm bộ Nhân đứng (亻) bên trái và chữ Nhĩ (尔) bên phải",
              "stroke_char": "你",
              "order_index": 3
            },
            {
              "id": "zh_ex_4",
              "lesson_id": "zh_l_h1",
              "type": "matching",
              "prompt": "Ghép các cặp từ tương ứng:",
              "target_text": "Ghép từ vựng chào hỏi",
              "target_audio_text": "你好, 再见, 谢谢",
              "phonetic": "nǐ hǎo, zài jiàn, xiè xie",
              "vietnamese_meaning": "Các câu chào hỏi",
              "options": {
                "pairs": [
                  {
                    "left": "你好 (nǐ hǎo)",
                    "right": "Xin chào"
                  },
                  {
                    "left": "再见 (zài jiàn)",
                    "right": "Tạm biệt"
                  },
                  {
                    "left": "谢谢 (xiè xie)",
                    "right": "Cảm ơn"
                  },
                  {
                    "left": "早上好 (zǎoshang hǎo)",
                    "right": "Chào buổi sáng"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Hãy ghép chính xác các cặp từ",
              "stroke_char": null,
              "order_index": 4
            },
            {
              "id": "zh_ex_5",
              "lesson_id": "zh_l_h1",
              "type": "dictation",
              "prompt": "Sắp xếp các thẻ từ thành câu hoàn chỉnh:",
              "target_text": "你好，很高兴认识你",
              "target_audio_text": "你好，很高兴认识你",
              "phonetic": "nǐ hǎo, hěn gāoxìng rènshí nǐ",
              "vietnamese_meaning": "Chào bạn, rất vui được gặp bạn",
              "options": [
                "认识",
                "你好",
                "很高兴",
                "你",
                "再见"
              ],
              "correct_answer": "你好 很高兴 认识 你",
              "hint": "Bắt đầu bằng lời chào 你好",
              "stroke_char": null,
              "order_index": 5
            }
          ]
        },
        {
          "id": "zh_l_h2",
          "unit_id": "zh_u1_hsk1",
          "lesson_number": 2,
          "title": "Bạn Tên Là Gì? (你叫什么名字？)",
          "description": "Hỏi và trả lời tên, quốc tịch với 我是...",
          "xp_reward": 15,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h2_ex1",
              "lesson_id": "zh_l_h2",
              "type": "listening",
              "prompt": "Nghe và chọn câu dịch tiếng Việt đúng:",
              "target_text": "你叫什么名字？",
              "target_audio_text": "你叫什么名字？",
              "phonetic": "nǐ jiào shénme míngzì?",
              "vietnamese_meaning": "Bạn tên là gì?",
              "options": [
                "Bạn tên là gì?",
                "Bạn đi đâu đấy?",
                "Bạn là người nước nào?",
                "Bạn khỏe không?"
              ],
              "correct_answer": "Bạn tên là gì?",
              "hint": "Cấu trúc hỏi tên: 你叫什么名字？",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h2_ex2",
              "lesson_id": "zh_l_h2",
              "type": "speaking",
              "prompt": "Nhấn Micro và nói: 我叫 Minh (Tôi tên là Minh):",
              "target_text": "我叫",
              "target_audio_text": "我叫",
              "phonetic": "wǒ jiào",
              "vietnamese_meaning": "Tôi tên là...",
              "options": [],
              "correct_answer": "我叫",
              "hint": "wǒ jiào: Tôi tên là...",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h2_ex3",
              "lesson_id": "zh_l_h2",
              "type": "translation",
              "prompt": "Dịch câu sau sang tiếng Trung: \"Tôi là người Việt Nam\"",
              "target_text": "我是越南人",
              "target_audio_text": "我是越南人",
              "phonetic": "wǒ shì Yuènán rén",
              "vietnamese_meaning": "Tôi là người Việt Nam",
              "options": [
                "我是",
                "中国人",
                "越南人",
                "学生",
                "老师"
              ],
              "correct_answer": "我是 越南人",
              "hint": "Chủ ngữ 我 là đại từ ngôi thứ nhất",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        },
        {
          "id": "zh_l_h3",
          "unit_id": "zh_u1_hsk1",
          "lesson_number": 3,
          "title": "Cảm Ơn & Xin Lỗi: 谢谢与对不起",
          "description": "Các câu nói xã giao lịch sự không thể thiếu",
          "xp_reward": 20,
          "type": "checkpoint",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h3_ex1",
              "lesson_id": "zh_l_h3",
              "type": "listening",
              "prompt": "Nghe và chọn câu đáp lại khi ai đó nói \"谢谢\" (Cảm ơn):",
              "target_text": "不客气",
              "target_audio_text": "不客气",
              "phonetic": "bú kèqi",
              "vietnamese_meaning": "Không có chi, đừng khách sáo",
              "options": [
                "不客气 (Bú kèqi)",
                "没关系 (Méi guānxi)",
                "再见 (Zàijiàn)",
                "你好 (Nǐhǎo)"
              ],
              "correct_answer": "不客气 (Bú kèqi)",
              "hint": "Đáp lại lời cảm ơn bằng 不客气",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h3_ex2",
              "lesson_id": "zh_l_h3",
              "type": "speaking",
              "prompt": "Nhấn Micro và phát âm câu: 对不起 (Xin lỗi):",
              "target_text": "对不起",
              "target_audio_text": "对不起",
              "phonetic": "duìbuqǐ",
              "vietnamese_meaning": "Xin lỗi",
              "options": [],
              "correct_answer": "对不起",
              "hint": "Phát âm rõ âm đầu duì và bật thanh 3 qǐ",
              "stroke_char": null,
              "order_index": 2
            }
          ]
        }
      ]
    },
    {
      "id": "zh_u2_hsk1",
      "level_id": "zh_hsk1",
      "unit_number": 2,
      "title": "Số Đếm & Mua Sắm Hàng Ngày",
      "description": "Hỏi giá tiền, trả giá và đếm số từ 1 đến 100",
      "icon": "ShoppingBag",
      "banner_color": "#2563eb",
      "levelBadge": "ZH_HSK1",
      "lessons": [
        {
          "id": "zh_l_h4",
          "unit_id": "zh_u2_hsk1",
          "lesson_number": 1,
          "title": "Số Đếm 1 - 10: 一, 二, 三...",
          "description": "Cách đếm và các chữ Hán số đếm quen thuộc",
          "xp_reward": 15,
          "type": "writing",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h4_ex1",
              "lesson_id": "zh_l_h4",
              "type": "writing",
              "prompt": "Tập viết chữ \"Nhị\" (Số hai) - Hai nét ngang:",
              "target_text": "二",
              "target_audio_text": "二",
              "phonetic": "èr",
              "vietnamese_meaning": "Số 2",
              "options": [],
              "correct_answer": "二",
              "hint": "Nét ngang trên ngắn hơn nét ngang dưới",
              "stroke_char": "二",
              "order_index": 1
            },
            {
              "id": "zh_h4_ex2",
              "lesson_id": "zh_l_h4",
              "type": "writing",
              "prompt": "Tập viết chữ \"Tam\" (Số ba) - Ba nét ngang:",
              "target_text": "三",
              "target_audio_text": "三",
              "phonetic": "sān",
              "vietnamese_meaning": "Số 3",
              "options": [],
              "correct_answer": "三",
              "hint": "Ba nét ngang song song cách đều nhau",
              "stroke_char": "三",
              "order_index": 2
            },
            {
              "id": "zh_h4_ex3",
              "lesson_id": "zh_l_h4",
              "type": "matching",
              "prompt": "Ghép số Hán với phiên âm Pinyin:",
              "target_text": "一, 二, 三, 十",
              "target_audio_text": "yī èr sān shí",
              "phonetic": "Số đếm HSK1",
              "vietnamese_meaning": "Số đếm",
              "options": {
                "pairs": [
                  {
                    "left": "一 (yī)",
                    "right": "Số 1"
                  },
                  {
                    "left": "二 (èr)",
                    "right": "Số 2"
                  },
                  {
                    "left": "三 (sān)",
                    "right": "Số 3"
                  },
                  {
                    "left": "十 (shí)",
                    "right": "Số 10"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Số đếm cơ bản",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        },
        {
          "id": "zh_l_h5",
          "unit_id": "zh_u2_hsk1",
          "lesson_number": 2,
          "title": "Hỏi Giá: 这个多少钱？(Bao nhiêu tiền?)",
          "description": "Đi chợ mua sắm và hỏi giá đồ uống",
          "xp_reward": 20,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_l_h5_ex1",
              "lesson_id": "zh_l_h5",
              "type": "listening",
              "prompt": "Nghe và chọn nghĩa tiếng Việt chính xác:",
              "target_text": "这个多少钱？",
              "target_audio_text": "这个多少钱？",
              "phonetic": "zhè ge duōshao qián?",
              "vietnamese_meaning": "Cái này bao nhiêu tiền?",
              "options": [
                "Cái này bao nhiêu tiền?",
                "Cái này là cái gì?",
                "Bạn đi đâu mua đồ?",
                "Tôi không có tiền"
              ],
              "correct_answer": "Cái này bao nhiêu tiền?",
              "hint": "这个 = cái này, 多少 = bao nhiêu, 钱 = tiền",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_l_h5_ex2",
              "lesson_id": "zh_l_h5",
              "type": "speaking",
              "prompt": "Nhấn Micro và nói câu mặc cả: \"Đắt quá, bớt chút đi\":",
              "target_text": "太贵了，便宜一点吧。",
              "target_audio_text": "太贵了，便宜一点吧。",
              "phonetic": "tài guì le, piányi yīdiǎn ba.",
              "vietnamese_meaning": "Đắt quá, bớt chút đi.",
              "options": [],
              "correct_answer": "太贵了，便宜一点吧。",
              "hint": "贵 = đắt, 便宜 = rẻ",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_l_h5_ex3",
              "lesson_id": "zh_l_h5",
              "type": "matching",
              "prompt": "Nối các từ mua sắm với nghĩa tiếng Việt:",
              "target_text": "多少钱,块,太贵了,便宜",
              "target_audio_text": "duōshao qián kuài tài guì le piányi",
              "phonetic": "duōshao qián, kuài, tài guì le, piányi",
              "vietnamese_meaning": "Từ vựng hỏi giá và mua sắm",
              "options": {
                "pairs": [
                  {
                    "left": "多少钱 (duōshao qián)",
                    "right": "Bao nhiêu tiền"
                  },
                  {
                    "left": "块 (kuài)",
                    "right": "Đồng / Tệ (tiền tệ)"
                  },
                  {
                    "left": "太贵了 (tài guì le)",
                    "right": "Đắt quá rồi"
                  },
                  {
                    "left": "便宜 (piányi)",
                    "right": "Rẻ, giá phải chăng"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "块 là lượng từ chỉ đơn vị tiền tệ khẩu ngữ",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_l_h5_ex4",
              "lesson_id": "zh_l_h5",
              "type": "translation",
              "prompt": "Sắp xếp các thẻ từ thành câu dịch: \"Táo một cân bao nhiêu tiền?\":",
              "target_text": "苹果一斤多少钱？",
              "target_audio_text": "苹果一斤多少钱？",
              "phonetic": "píngguǒ yī jīn duōshao qián?",
              "vietnamese_meaning": "Táo một cân bao nhiêu tiền?",
              "options": [
                "苹果",
                "一斤",
                "多少",
                "钱",
                "西瓜",
                "太贵"
              ],
              "correct_answer": "苹果 一斤 多少 钱",
              "hint": "苹果 = quả táo, 一斤 = 1 cân (nửa kg TQ)",
              "stroke_char": null,
              "order_index": 4
            },
            {
              "id": "zh_l_h5_ex5",
              "lesson_id": "zh_l_h5",
              "type": "writing",
              "prompt": "Tập viết chữ Hán 钱 (Tiền) theo đúng thứ tự nét:",
              "target_text": "钱",
              "target_audio_text": "钱",
              "phonetic": "qián",
              "vietnamese_meaning": "Tiền bạc, tiền tài",
              "options": [],
              "correct_answer": "钱",
              "hint": "Chữ 钱 gồm bộ Kim (钅) bên trái biểu thị kim loại quý giá",
              "stroke_char": "钱",
              "order_index": 5
            }
          ]
        }
      ]
    }
  ],
  "en_ipa": [
    {
      "id": "en_u1_ipa",
      "level_id": "en_ipa",
      "unit_number": 1,
      "title": "Nguyên Âm Đơn & Âm Dài/Ngắn",
      "description": "Phân biệt chính xác cặp âm /iː/ vs /ɪ/, /uː/ vs /ʊ/",
      "icon": "Headphones",
      "banner_color": "#06b6d4",
      "levelBadge": "EN_IPA",
      "lessons": [
        {
          "id": "en_l_ipa1",
          "unit_id": "en_u1_ipa",
          "lesson_number": 1,
          "title": "Cặp Âm /iː/ (sheep) vs /ɪ/ (ship)",
          "description": "Phân biệt khẩu hình cười dài và thả lỏng ngắn",
          "xp_reward": 15,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_ipa1_ex1",
              "lesson_id": "en_l_ipa1",
              "type": "listening",
              "prompt": "Listen and choose the word with the LONG /iː/ sound:",
              "target_text": "sheep",
              "target_audio_text": "sheep",
              "phonetic": "/ʃiːp/",
              "vietnamese_meaning": "Con cừu (âm /iː/ dài)",
              "options": [
                "sheep (/ʃiːp/)",
                "ship (/ʃɪp/)",
                "shop (/ʃɒp/)",
                "shape (/ʃeɪp/)"
              ],
              "correct_answer": "sheep (/ʃiːp/)",
              "hint": "Kéo dài miệng sang hai bên như đang cười mỉm",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_ipa1_ex2",
              "lesson_id": "en_l_ipa1",
              "type": "speaking",
              "prompt": "Press Mic and pronounce clearly: sheep:",
              "target_text": "sheep",
              "target_audio_text": "sheep",
              "phonetic": "/ʃiːp/",
              "vietnamese_meaning": "Con cừu",
              "options": [],
              "correct_answer": "sheep",
              "hint": "Hold the /iː/ sound for at least 1 second",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "en_ipa1_ex3",
              "lesson_id": "en_l_ipa1",
              "type": "matching",
              "prompt": "Match English words with their correct IPA vowel sounds:",
              "target_text": "sheep, ship, eat, it",
              "target_audio_text": "sheep ship eat it",
              "phonetic": "/iː/ vs /ɪ/",
              "vietnamese_meaning": "Long vs Short i",
              "options": {
                "pairs": [
                  {
                    "left": "sheep",
                    "right": "/ʃiːp/ (Nguyên âm dài /iː/)"
                  },
                  {
                    "left": "ship",
                    "right": "/ʃɪp/ (Nguyên âm ngắn /ɪ/)"
                  },
                  {
                    "left": "eat",
                    "right": "/iːt/ (Nguyên âm dài /iː/)"
                  },
                  {
                    "left": "it",
                    "right": "/ɪt/ (Nguyên âm ngắn /ɪ/)"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Phân biệt nguyên âm dài và ngắn",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        },
        {
          "id": "en_l_ipa2",
          "unit_id": "en_u1_ipa",
          "lesson_number": 2,
          "title": "Cặp Âm /æ/ (cat) vs /e/ (bed)",
          "description": "Kỹ thuật hạ cằm để phát âm chuẩn âm e bẹt",
          "xp_reward": 15,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_ipa2_ex1",
              "lesson_id": "en_l_ipa2",
              "type": "listening",
              "prompt": "Listen and select the word with open /æ/ sound:",
              "target_text": "cat",
              "target_audio_text": "cat",
              "phonetic": "/kæt/",
              "vietnamese_meaning": "Con mèo (âm e bẹt /æ/)",
              "options": [
                "cat (/kæt/)",
                "bed (/bed/)",
                "cut (/kʌt/)",
                "cot (/kɒt/)"
              ],
              "correct_answer": "cat (/kæt/)",
              "hint": "Hạ cằm dưới mở rộng khẩu hình phát âm e bẹt",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_ipa2_ex2",
              "lesson_id": "en_l_ipa2",
              "type": "speaking",
              "prompt": "Press Mic and pronounce: cat:",
              "target_text": "cat",
              "target_audio_text": "cat",
              "phonetic": "/kæt/",
              "vietnamese_meaning": "Con mèo",
              "options": [],
              "correct_answer": "cat",
              "hint": "Lower your jaw for the clear /æ/ sound",
              "stroke_char": null,
              "order_index": 2
            }
          ]
        },
        {
          "id": "en_l_ipa3",
          "unit_id": "en_u1_ipa",
          "lesson_number": 3,
          "title": "Thử Thách Nghe Phân Biệt Âm IPA",
          "description": "Nghe từ tương tự và chọn ký hiệu phiên âm đúng",
          "xp_reward": 20,
          "type": "checkpoint",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_l_ipa3_ex1",
              "lesson_id": "en_l_ipa3",
              "type": "listening",
              "prompt": "Listen and choose the word you hear (/iː/ vs /ɪ/):",
              "target_text": "Ship vs Sheep",
              "target_audio_text": "Sheep",
              "phonetic": "/ʃiːp/",
              "vietnamese_meaning": "Con cừu (nguyên âm dài /iː/)",
              "options": [
                "Sheep (/ʃiːp/ - Con cừu)",
                "Ship (/ʃɪp/ - Con tàu)",
                "Chip (/tʃɪp/ - Khoai tây)",
                "Sheet (/ʃiːt/ - Tờ giấy)"
              ],
              "correct_answer": "Sheep (/ʃiːp/ - Con cừu)",
              "hint": "Sheep có âm /iː/ kéo dài, khác với Ship /ɪ/ dứt khoát",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_l_ipa3_ex2",
              "lesson_id": "en_l_ipa3",
              "type": "speaking",
              "prompt": "Press Mic and clearly pronounce the minimal pair sentence:",
              "target_text": "The ship carries white sheep across the sea.",
              "target_audio_text": "The ship carries white sheep across the sea.",
              "phonetic": "/ðə ʃɪp ˈkæriz waɪt ʃiːp əˈkrɒs ðə siː/",
              "vietnamese_meaning": "Con tàu chở những chú cừu trắng băng qua biển.",
              "options": [],
              "correct_answer": "The ship carries white sheep across the sea.",
              "hint": "Phân biệt rõ âm ngắn trong ship và âm dài trong sheep, sea",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "en_l_ipa3_ex3",
              "lesson_id": "en_l_ipa3",
              "type": "matching",
              "prompt": "Match phonetic symbols with standard example words:",
              "target_text": "/iː/,/ɪ/,/θ/,/ð/",
              "target_audio_text": "tree, sit, think, this",
              "phonetic": "/iː/, /ɪ/, /θ/, /ð/",
              "vietnamese_meaning": "Cặp âm IPA căn bản",
              "options": {
                "pairs": [
                  {
                    "left": "/iː/ (Long e)",
                    "right": "Tree, See, Green"
                  },
                  {
                    "left": "/ɪ/ (Short i)",
                    "right": "Sit, Hit, Big"
                  },
                  {
                    "left": "/θ/ (Voiceless th)",
                    "right": "Think, Thank, Three"
                  },
                  {
                    "left": "/ð/ (Voiced th)",
                    "right": "This, That, Mother"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Chú ý khẩu hình đặt lưỡi giữa 2 hàm răng với âm th",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        }
      ]
    },
    {
      "id": "en_u2_ipa",
      "level_id": "en_ipa",
      "unit_number": 2,
      "title": "Phụ Âm Gió & Vô Thanh / Hữu Thanh",
      "description": "Chinh phục âm khó nhằn /θ/ và /ð/ trong think & this",
      "icon": "Mic",
      "banner_color": "#0891b2",
      "levelBadge": "EN_IPA",
      "lessons": []
    }
  ],
  "en_a1": [
    {
      "id": "en_u1_a1",
      "level_id": "en_a1",
      "unit_number": 1,
      "title": "First Encounters & Greetings",
      "description": "Introduce yourself and make friends across the globe",
      "icon": "Sparkles",
      "banner_color": "#10b981",
      "levelBadge": "EN_A1",
      "lessons": [
        {
          "id": "en_l_a1_1",
          "unit_id": "en_u1_a1",
          "lesson_number": 1,
          "title": "Hello & Nice to Meet You",
          "description": "Say hello, introduce your name and make friends",
          "xp_reward": 15,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_ex_1",
              "lesson_id": "en_l_a1_1",
              "type": "listening",
              "prompt": "Listen and choose the correct meaning:",
              "target_text": "Nice to meet you!",
              "target_audio_text": "Nice to meet you!",
              "phonetic": "/naɪs tuː miːt juː/",
              "vietnamese_meaning": "Rất vui được gặp bạn!",
              "options": [
                "Rất vui được gặp bạn!",
                "Hẹn gặp lại bạn ngày mai!",
                "Cảm ơn bạn rất nhiều!",
                "Bạn tên là gì?"
              ],
              "correct_answer": "Rất vui được gặp bạn!",
              "hint": "Lịch sự khi gặp ai lần đầu",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_ex_2",
              "lesson_id": "en_l_a1_1",
              "type": "speaking",
              "prompt": "Press Mic and pronounce this sentence clearly:",
              "target_text": "Nice to meet you!",
              "target_audio_text": "Nice to meet you!",
              "phonetic": "/naɪs tuː miːt juː/",
              "vietnamese_meaning": "Rất vui được gặp bạn!",
              "options": [],
              "correct_answer": "Nice to meet you!",
              "hint": "Focus on the final sound /s/ in \"Nice\" and /t/ in \"meet\"",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "en_ex_3",
              "lesson_id": "en_l_a1_1",
              "type": "translation",
              "prompt": "Dịch câu sau sang tiếng Anh:",
              "target_text": "Tôi là một học sinh.",
              "target_audio_text": "I am a student.",
              "phonetic": "/aɪ æm ə ˈstjuː.dənt/",
              "vietnamese_meaning": "Tôi là một học sinh.",
              "options": [
                "a",
                "student",
                "I",
                "teacher",
                "am",
                "is"
              ],
              "correct_answer": "I am a student",
              "hint": "Chủ ngữ I đi với động từ to be am",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "en_ex_4",
              "lesson_id": "en_l_a1_1",
              "type": "matching",
              "prompt": "Match the English words with their Vietnamese translations:",
              "target_text": "Match greetings",
              "target_audio_text": "Hello, Goodbye, Thank you, Please",
              "phonetic": "Greetings",
              "vietnamese_meaning": "Lời chào hỏi",
              "options": {
                "pairs": [
                  {
                    "left": "Hello",
                    "right": "Xin chào"
                  },
                  {
                    "left": "Goodbye",
                    "right": "Tạm biệt"
                  },
                  {
                    "left": "Thank you",
                    "right": "Cảm ơn bạn"
                  },
                  {
                    "left": "Please",
                    "right": "Làm ơn / Xin vui lòng"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Pair each word",
              "stroke_char": null,
              "order_index": 4
            }
          ]
        },
        {
          "id": "en_l_a1_2",
          "unit_id": "en_u1_a1",
          "lesson_number": 2,
          "title": "Where Are You From?",
          "description": "Countries, nationalities and where you live",
          "xp_reward": 15,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_l_a1_2_ex1",
              "lesson_id": "en_l_a1_2",
              "type": "listening",
              "prompt": "Listen and choose the correct answer to \"Where are you from?\":",
              "target_text": "I am from Vietnam.",
              "target_audio_text": "I am from Vietnam.",
              "phonetic": "/aɪ æm frɒm ˌvjɛtˈnɑːm/",
              "vietnamese_meaning": "Tôi đến từ Việt Nam.",
              "options": [
                "I am from Vietnam.",
                "I am fine, thank you.",
                "My name is Nam.",
                "I am 20 years old."
              ],
              "correct_answer": "I am from Vietnam.",
              "hint": "Cấu trúc trả lời quê hương: I am from + Tên quốc gia",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_l_a1_2_ex2",
              "lesson_id": "en_l_a1_2",
              "type": "speaking",
              "prompt": "Press Mic and state your nationality:",
              "target_text": "I am Vietnamese and I live in Hanoi.",
              "target_audio_text": "I am Vietnamese and I live in Hanoi.",
              "phonetic": "/aɪ æm ˌvjɛtnəˈmiːz ænd aɪ lɪv ɪn hæˈnɔɪ/",
              "vietnamese_meaning": "Tôi là người Việt Nam và tôi sống ở Hà Nội.",
              "options": [],
              "correct_answer": "I am Vietnamese and I live in Hanoi.",
              "hint": "Vietnamese là quốc tịch, Vietnam là tên đất nước",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "en_l_a1_2_ex3",
              "lesson_id": "en_l_a1_2",
              "type": "matching",
              "prompt": "Match countries with their nationalities:",
              "target_text": "Vietnam,England,Japan,France",
              "target_audio_text": "Vietnam, England, Japan, France",
              "phonetic": "Countries and Nationalities",
              "vietnamese_meaning": "Quốc gia và Quốc tịch A1",
              "options": {
                "pairs": [
                  {
                    "left": "Vietnam",
                    "right": "Vietnamese"
                  },
                  {
                    "left": "England",
                    "right": "English"
                  },
                  {
                    "left": "Japan",
                    "right": "Japanese"
                  },
                  {
                    "left": "France",
                    "right": "French"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Ghép cặp quốc gia và người/tiếng nước đó",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        },
        {
          "id": "en_l_a1_3",
          "unit_id": "en_u1_a1",
          "lesson_number": 3,
          "title": "Checkpoint: Basic Greetings",
          "description": "Test your listening, speaking and translation skills",
          "xp_reward": 20,
          "type": "checkpoint",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_l_a1_3_ex1",
              "lesson_id": "en_l_a1_3",
              "type": "listening",
              "prompt": "Listen and choose the appropriate polite response to \"Nice to meet you\":",
              "target_text": "Nice to meet you, too!",
              "target_audio_text": "Nice to meet you, too!",
              "phonetic": "/naɪs tuː miːt juː tuː/",
              "vietnamese_meaning": "Rất vui được gặp bạn!",
              "options": [
                "Nice to meet you, too!",
                "Goodbye!",
                "See you tomorrow.",
                "I am sorry."
              ],
              "correct_answer": "Nice to meet you, too!",
              "hint": "Thêm từ \"too\" vào cuối câu để đáp lại sự chào đón",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_l_a1_3_ex2",
              "lesson_id": "en_l_a1_3",
              "type": "translation",
              "prompt": "Arrange words into: \"Hello, my name is Alex and I am a student\":",
              "target_text": "Hello, my name is Alex and I am a student.",
              "target_audio_text": "Hello, my name is Alex and I am a student.",
              "phonetic": "/həˈləʊ maɪ neɪm ɪz ˈælɪks ænd aɪ æm ə ˈstjuːdənt/",
              "vietnamese_meaning": "Xin chào, tên tôi là Alex và tôi là một sinh viên.",
              "options": [
                "Hello",
                "my",
                "name",
                "is",
                "Alex",
                "and",
                "I",
                "am",
                "a",
                "student"
              ],
              "correct_answer": "Hello my name is Alex and I am a student",
              "hint": "Ghép câu hoàn chỉnh giới thiệu bản thân",
              "stroke_char": null,
              "order_index": 2
            }
          ]
        }
      ]
    },
    {
      "id": "en_u2_a1",
      "level_id": "en_a1",
      "unit_number": 2,
      "title": "Cafe, Dining & Daily Life",
      "description": "Order your favorite food and discuss everyday hobbies",
      "icon": "Coffee",
      "banner_color": "#059669",
      "levelBadge": "EN_A1",
      "lessons": []
    }
  ],
  "zh_hsk2": [
    {
      "id": "zh_u1_hsk2",
      "level_id": "zh_hsk2",
      "unit_number": 1,
      "title": "Gia Đình & Các Mối Quan Hệ",
      "description": "Nói về gia đình, nghề nghiệp và cuộc sống hàng ngày",
      "icon": "Heart",
      "banner_color": "#8b5cf6",
      "levelBadge": "ZH_HSK2",
      "lessons": [
        {
          "id": "zh_h2_l1",
          "unit_id": "zh_u1_hsk2",
          "lesson_number": 1,
          "title": "Gia Đình: 家人 (jiārén)",
          "description": "Từ vựng về các thành viên trong gia đình và cách giới thiệu",
          "xp_reward": 20,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h2_l1_ex1",
              "lesson_id": "zh_h2_l1",
              "type": "listening",
              "prompt": "Nghe và chọn nghĩa đúng của từ 妈妈 (māma):",
              "target_text": "妈妈",
              "target_audio_text": "妈妈",
              "phonetic": "māma",
              "vietnamese_meaning": "Mẹ, má",
              "options": [
                "Mẹ, má",
                "Bố, ba",
                "Anh trai",
                "Em gái"
              ],
              "correct_answer": "Mẹ, má",
              "hint": "妈妈 = māma, chữ Hán bộ Nữ (女) nghĩa mẹ",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h2_l1_ex2",
              "lesson_id": "zh_h2_l1",
              "type": "listening",
              "prompt": "Nghe và chọn từ có nghĩa \"Con trai\":",
              "target_text": "儿子",
              "target_audio_text": "儿子",
              "phonetic": "érzi",
              "vietnamese_meaning": "Con trai",
              "options": [
                "儿子 (érzi)",
                "女儿 (nǚ'ér)",
                "哥哥 (gēge)",
                "姐姐 (jiějie)"
              ],
              "correct_answer": "儿子 (érzi)",
              "hint": "儿 = con, 子 = con nhỏ",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h2_l1_ex3",
              "lesson_id": "zh_h2_l1",
              "type": "speaking",
              "prompt": "Nhấn Micro và nói câu giới thiệu gia đình:",
              "target_text": "我家有四口人",
              "target_audio_text": "我家有四口人",
              "phonetic": "wǒ jiā yǒu sì kǒu rén",
              "vietnamese_meaning": "Gia đình tôi có 4 người",
              "options": [],
              "correct_answer": "我家有四口人",
              "hint": "口 (kǒu) là từ đơn vị đếm thành viên gia đình",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h2_l1_ex4",
              "lesson_id": "zh_h2_l1",
              "type": "matching",
              "prompt": "Ghép từ thành viên gia đình với tiếng Việt:",
              "target_text": "爸爸,妈妈,哥哥,妹妹",
              "target_audio_text": "bàba māma gēge mèimei",
              "phonetic": "Gia đình",
              "vietnamese_meaning": "Thành viên gia đình",
              "options": {
                "pairs": [
                  {
                    "left": "爸爸 (bàba)",
                    "right": "Bố, ba"
                  },
                  {
                    "left": "妈妈 (māma)",
                    "right": "Mẹ, má"
                  },
                  {
                    "left": "哥哥 (gēge)",
                    "right": "Anh trai"
                  },
                  {
                    "left": "妹妹 (mèimei)",
                    "right": "Em gái"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Phân biệt哥哥 (anh) và弟弟 (em)",
              "stroke_char": null,
              "order_index": 4
            },
            {
              "id": "zh_h2_l1_ex5",
              "lesson_id": "zh_h2_l1",
              "type": "translation",
              "prompt": "Dịch sang tiếng Trung: \"Anh ấy là anh trai tôi\":",
              "target_text": "他是我哥哥",
              "target_audio_text": "他是我哥哥",
              "phonetic": "tā shì wǒ gēge",
              "vietnamese_meaning": "Anh ấy là anh trai tôi",
              "options": [
                "他",
                "是",
                "我",
                "哥哥",
                "姐姐",
                "弟弟"
              ],
              "correct_answer": "他 是 我 哥哥",
              "hint": "他 = anh ấy/ông ấy, 是 = là",
              "stroke_char": null,
              "order_index": 5
            }
          ]
        },
        {
          "id": "zh_h2_l2",
          "unit_id": "zh_u1_hsk2",
          "lesson_number": 2,
          "title": "Nghề Nghiệp: 你做什么工作？",
          "description": "Hỏi và mô tả nghề nghiệp, nơi làm việc",
          "xp_reward": 20,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h2_l2_ex1",
              "lesson_id": "zh_h2_l2",
              "type": "listening",
              "prompt": "Nghe và chọn nghề nghiệp: 医生 (yīshēng) có nghĩa là:",
              "target_text": "医生",
              "target_audio_text": "医生",
              "phonetic": "yīshēng",
              "vietnamese_meaning": "Bác sĩ",
              "options": [
                "Bác sĩ",
                "Giáo viên",
                "Kỹ sư",
                "Luật sư"
              ],
              "correct_answer": "Bác sĩ",
              "hint": "医 = y tế, 生 = người học/bác sĩ",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h2_l2_ex2",
              "lesson_id": "zh_h2_l2",
              "type": "speaking",
              "prompt": "Nhấn Micro và trả lời câu hỏi: 你做什么工作？(Bạn làm gì?)",
              "target_text": "我是老师",
              "target_audio_text": "我是老师",
              "phonetic": "wǒ shì lǎoshī",
              "vietnamese_meaning": "Tôi là giáo viên",
              "options": [],
              "correct_answer": "我是老师",
              "hint": "老师 = lǎoshī (giáo viên), phổ biến nhất trong HSK2",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h2_l2_ex3",
              "lesson_id": "zh_h2_l2",
              "type": "matching",
              "prompt": "Ghép nghề nghiệp với tiếng Việt:",
              "target_text": "老师,学生,医生,工程师",
              "target_audio_text": "lǎoshī xuéshēng yīshēng gōngchéngshī",
              "phonetic": "Nghề nghiệp",
              "vietnamese_meaning": "Từ vựng nghề nghiệp",
              "options": {
                "pairs": [
                  {
                    "left": "老师 (lǎoshī)",
                    "right": "Giáo viên"
                  },
                  {
                    "left": "学生 (xuéshēng)",
                    "right": "Học sinh/Sinh viên"
                  },
                  {
                    "left": "医生 (yīshēng)",
                    "right": "Bác sĩ"
                  },
                  {
                    "left": "工程师 (gōngchéngshī)",
                    "right": "Kỹ sư"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "工程师 = kỹ sư, 3 chữ Hán ghép lại",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h2_l2_ex4",
              "lesson_id": "zh_h2_l2",
              "type": "translation",
              "prompt": "Dịch câu sau sang tiếng Trung: \"Anh ấy làm việc ở bệnh viện\":",
              "target_text": "他在医院工作",
              "target_audio_text": "他在医院工作",
              "phonetic": "tā zài yīyuàn gōngzuò",
              "vietnamese_meaning": "Anh ấy làm việc ở bệnh viện",
              "options": [
                "他",
                "在",
                "医院",
                "工作",
                "学校",
                "公司"
              ],
              "correct_answer": "他 在 医院 工作",
              "hint": "在 = ở/tại, 医院 = bệnh viện",
              "stroke_char": null,
              "order_index": 4
            }
          ]
        },
        {
          "id": "zh_h2_l3",
          "unit_id": "zh_u1_hsk2",
          "lesson_number": 3,
          "title": "Kiểm Tra Gia Đình & Nghề Nghiệp",
          "description": "Bài kiểm tra tổng hợp nghe nói đọc viết",
          "xp_reward": 30,
          "type": "checkpoint",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h2_l3_ex1",
              "lesson_id": "zh_h2_l3",
              "type": "listening",
              "prompt": "Nghe và chọn câu dịch tiếng Việt đúng:",
              "target_text": "他爸爸是医生，在医院工作。",
              "target_audio_text": "他爸爸是医生，在医院工作。",
              "phonetic": "tā bàba shì yīshēng, zài yīyuàn gōngzuò.",
              "vietnamese_meaning": "Bố anh ấy là bác sĩ, làm việc ở bệnh viện.",
              "options": [
                "Bố anh ấy là bác sĩ, làm việc ở bệnh viện.",
                "Mẹ anh ấy là giáo viên, làm việc ở trường học.",
                "Anh ấy muốn làm bác sĩ tương lai.",
                "Bố anh ấy đang nằm viện điều trị."
              ],
              "correct_answer": "Bố anh ấy là bác sĩ, làm việc ở bệnh viện.",
              "hint": "医生 = bác sĩ, 医院 = bệnh viện",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h2_l3_ex2",
              "lesson_id": "zh_h2_l3",
              "type": "speaking",
              "prompt": "Nhấn Micro và nói: \"Chị gái tôi cũng là giáo viên\":",
              "target_text": "我姐姐也是老师。",
              "target_audio_text": "我姐姐也是老师。",
              "phonetic": "wǒ jiějie yě shì lǎoshī.",
              "vietnamese_meaning": "Chị gái tôi cũng là giáo viên.",
              "options": [],
              "correct_answer": "我姐姐也是老师。",
              "hint": "也 = cũng, 老师 = giáo viên",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h2_l3_ex3",
              "lesson_id": "zh_h2_l3",
              "type": "matching",
              "prompt": "Nối các cặp từ nghề nghiệp và địa điểm:",
              "target_text": "医生,老师,医院,学校",
              "target_audio_text": "yīshēng lǎoshī yīyuàn xuéxiào",
              "phonetic": "yīshēng, lǎoshī, yīyuàn, xuéxiào",
              "vietnamese_meaning": "Cặp từ nghề nghiệp và nơi làm việc",
              "options": {
                "pairs": [
                  {
                    "left": "医生 (yīshēng)",
                    "right": "Bác sĩ"
                  },
                  {
                    "left": "老师 (lǎoshī)",
                    "right": "Giáo viên"
                  },
                  {
                    "left": "医院 (yīyuàn)",
                    "right": "Bệnh viện"
                  },
                  {
                    "left": "学校 (xuéxiào)",
                    "right": "Trường học"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Ghép từ đúng nghĩa tiếng Việt",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h2_l3_ex4",
              "lesson_id": "zh_h2_l3",
              "type": "translation",
              "prompt": "Sắp xếp câu hỏi: \"Anh trai bạn làm công việc gì?\":",
              "target_text": "你哥哥做什么工作？",
              "target_audio_text": "你哥哥做什么工作？",
              "phonetic": "nǐ gēge zuò shénme gōngzuò?",
              "vietnamese_meaning": "Anh trai bạn làm công việc gì?",
              "options": [
                "你",
                "哥哥",
                "做",
                "什么",
                "工作",
                "姐姐",
                "医生"
              ],
              "correct_answer": "你 哥哥 做 什么 工作",
              "hint": "做 = làm, 什么 = gì, 工作 = công việc",
              "stroke_char": null,
              "order_index": 4
            },
            {
              "id": "zh_h2_l3_ex5",
              "lesson_id": "zh_h2_l3",
              "type": "writing",
              "prompt": "Tập viết chữ Hán 生 (Sinh trong Y sinh / Học sinh):",
              "target_text": "生",
              "target_audio_text": "生",
              "phonetic": "shēng",
              "vietnamese_meaning": "Sinh sống, học trò, nghề nghiệp",
              "options": [],
              "correct_answer": "生",
              "hint": "Chữ 生 gồm 5 nét, bắt đầu từ nét phẩy trên cùng",
              "stroke_char": "生",
              "order_index": 5
            }
          ]
        }
      ]
    },
    {
      "id": "zh_u2_hsk2",
      "level_id": "zh_hsk2",
      "unit_number": 2,
      "title": "Thời Gian & Thời Tiết",
      "description": "Hỏi giờ, ngày tháng, mô tả thời tiết bốn mùa",
      "icon": "Clock",
      "banner_color": "#7c3aed",
      "levelBadge": "ZH_HSK2",
      "lessons": [
        {
          "id": "zh_h2_l4",
          "unit_id": "zh_u2_hsk2",
          "lesson_number": 1,
          "title": "Hỏi Giờ: 现在几点？(Mấy giờ rồi?)",
          "description": "Đọc đồng hồ và nói giờ bằng tiếng Trung",
          "xp_reward": 20,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h2_l4_ex1",
              "lesson_id": "zh_h2_l4",
              "type": "listening",
              "prompt": "Nghe và chọn đáp án đúng: 现在几点？(Mấy giờ rồi?)",
              "target_text": "现在两点半",
              "target_audio_text": "现在两点半",
              "phonetic": "xiànzài liǎng diǎn bàn",
              "vietnamese_meaning": "Bây giờ là 2 giờ 30 phút",
              "options": [
                "Bây giờ là 2 giờ 30 phút",
                "Bây giờ là 3 giờ",
                "Bây giờ là 12 giờ",
                "Bây giờ là 6 giờ 15 phút"
              ],
              "correct_answer": "Bây giờ là 2 giờ 30 phút",
              "hint": "两点半 = 2 giờ rưỡi (半 = nửa = 30 phút)",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h2_l4_ex2",
              "lesson_id": "zh_h2_l4",
              "type": "speaking",
              "prompt": "Nhìn đồng hồ (9:15) và nói bằng tiếng Trung:",
              "target_text": "九点十五分",
              "target_audio_text": "九点十五分",
              "phonetic": "jiǔ diǎn shíwǔ fēn",
              "vietnamese_meaning": "9 giờ 15 phút",
              "options": [],
              "correct_answer": "九点十五分",
              "hint": "Cấu trúc: [Số giờ] 点 [Số phút] 分",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h2_l4_ex3",
              "lesson_id": "zh_h2_l4",
              "type": "matching",
              "prompt": "Ghép giờ tiếng Trung với giờ tương ứng:",
              "target_text": "三点,六点半,十二点,八点十分",
              "target_audio_text": "sān diǎn liù diǎn bàn",
              "phonetic": "Giờ giấc",
              "vietnamese_meaning": "Hỏi giờ",
              "options": {
                "pairs": [
                  {
                    "left": "三点 (sān diǎn)",
                    "right": "3:00"
                  },
                  {
                    "left": "六点半 (liù diǎn bàn)",
                    "right": "6:30"
                  },
                  {
                    "left": "十二点 (shí'èr diǎn)",
                    "right": "12:00"
                  },
                  {
                    "left": "八点十分 (bā diǎn shí fēn)",
                    "right": "8:10"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "半 = rưỡi = 30 phút, 刻 = 15 phút",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        },
        {
          "id": "zh_h2_l5",
          "unit_id": "zh_u2_hsk2",
          "lesson_number": 2,
          "title": "Bốn Mùa & Thời Tiết: 春夏秋冬",
          "description": "Mô tả thời tiết và các mùa trong năm",
          "xp_reward": 20,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h2_l5_ex1",
              "lesson_id": "zh_h2_l5",
              "type": "listening",
              "prompt": "Nghe và chọn nghĩa đúng: 今天天气怎么样？",
              "target_text": "今天天气怎么样",
              "target_audio_text": "今天天气怎么样",
              "phonetic": "jīntiān tiānqì zěnme yàng",
              "vietnamese_meaning": "Hôm nay thời tiết thế nào?",
              "options": [
                "Hôm nay thời tiết thế nào?",
                "Hôm nay mấy giờ?",
                "Ngày mai bạn đi đâu?",
                "Mùa nào đẹp nhất?"
              ],
              "correct_answer": "Hôm nay thời tiết thế nào?",
              "hint": "天气 = thời tiết, 怎么样 = như thế nào",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h2_l5_ex2",
              "lesson_id": "zh_h2_l5",
              "type": "speaking",
              "prompt": "Nhấn Micro và nói câu: Hôm nay trời lạnh lắm:",
              "target_text": "今天很冷",
              "target_audio_text": "今天很冷",
              "phonetic": "jīntiān hěn lěng",
              "vietnamese_meaning": "Hôm nay rất lạnh",
              "options": [],
              "correct_answer": "今天很冷",
              "hint": "冷 = lạnh, 热 = nóng, 凉快 = mát mẻ",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h2_l5_ex3",
              "lesson_id": "zh_h2_l5",
              "type": "matching",
              "prompt": "Ghép từ thời tiết với nghĩa tiếng Việt:",
              "target_text": "晴,雨,雪,风",
              "target_audio_text": "qíng yǔ xuě fēng",
              "phonetic": "Thời tiết",
              "vietnamese_meaning": "Từ vựng thời tiết",
              "options": {
                "pairs": [
                  {
                    "left": "晴 (qíng)",
                    "right": "Trời nắng, quang đãng"
                  },
                  {
                    "left": "雨 (yǔ)",
                    "right": "Mưa"
                  },
                  {
                    "left": "雪 (xuě)",
                    "right": "Tuyết"
                  },
                  {
                    "left": "风 (fēng)",
                    "right": "Gió"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "下雨 = trời mưa, 下雪 = trời tuyết",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h2_l5_ex4",
              "lesson_id": "zh_h2_l5",
              "type": "translation",
              "prompt": "Dịch câu sau sang tiếng Trung: \"Mùa xuân ở Hà Nội rất đẹp\":",
              "target_text": "河内的春天很美",
              "target_audio_text": "河内的春天很美",
              "phonetic": "Hénèi de chūntiān hěn měi",
              "vietnamese_meaning": "Hà Nội mùa xuân rất đẹp",
              "options": [
                "河内",
                "的",
                "春天",
                "很",
                "美",
                "夏天",
                "秋天"
              ],
              "correct_answer": "河内 的 春天 很 美",
              "hint": "春天 = mùa xuân, 的 = trợ từ sở hữu",
              "stroke_char": null,
              "order_index": 4
            }
          ]
        }
      ]
    },
    {
      "id": "zh_u3_hsk2",
      "level_id": "zh_hsk2",
      "unit_number": 3,
      "title": "Hỏi Đường & Phương Tiện",
      "description": "Chỉ đường, đi taxi, xe buýt và các địa điểm trong thành phố",
      "icon": "MapPin",
      "banner_color": "#6d28d9",
      "levelBadge": "ZH_HSK2",
      "lessons": [
        {
          "id": "zh_h2_l6",
          "unit_id": "zh_u3_hsk2",
          "lesson_number": 1,
          "title": "Hỏi Đường: 请问，去...怎么走？",
          "description": "Hỏi và chỉ đường đến các địa điểm",
          "xp_reward": 25,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h2_l6_ex1",
              "lesson_id": "zh_h2_l6",
              "type": "listening",
              "prompt": "Nghe và chọn nghĩa câu: 请问，银行在哪里？",
              "target_text": "银行在哪里",
              "target_audio_text": "请问，银行在哪里？",
              "phonetic": "qǐngwèn, yínháng zài nǎlǐ?",
              "vietnamese_meaning": "Xin hỏi, ngân hàng ở đâu?",
              "options": [
                "Xin hỏi, ngân hàng ở đâu?",
                "Xin hỏi, bưu điện ở đâu?",
                "Siêu thị cách đây bao xa?",
                "Khách sạn ở phố này không?"
              ],
              "correct_answer": "Xin hỏi, ngân hàng ở đâu?",
              "hint": "银行 = ngân hàng, 哪里 = ở đâu",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h2_l6_ex2",
              "lesson_id": "zh_h2_l6",
              "type": "speaking",
              "prompt": "Hỏi đường đến bệnh viện bằng tiếng Trung:",
              "target_text": "请问，医院怎么走？",
              "target_audio_text": "请问，医院怎么走？",
              "phonetic": "qǐngwèn, yīyuàn zěnme zǒu?",
              "vietnamese_meaning": "Xin hỏi, đường đến bệnh viện đi thế nào?",
              "options": [],
              "correct_answer": "请问，医院怎么走？",
              "hint": "怎么走 = đi thế nào (hỏi đường)",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h2_l6_ex3",
              "lesson_id": "zh_h2_l6",
              "type": "matching",
              "prompt": "Ghép chỉ đường với nghĩa tiếng Việt:",
              "target_text": "左转,右转,直走,对面",
              "target_audio_text": "zuǒ zhuǎn yòu zhuǎn zhí zǒu duìmiàn",
              "phonetic": "Chỉ đường",
              "vietnamese_meaning": "Hỏi đường",
              "options": {
                "pairs": [
                  {
                    "left": "左转 (zuǒ zhuǎn)",
                    "right": "Rẽ trái"
                  },
                  {
                    "left": "右转 (yòu zhuǎn)",
                    "right": "Rẽ phải"
                  },
                  {
                    "left": "直走 (zhí zǒu)",
                    "right": "Đi thẳng"
                  },
                  {
                    "left": "对面 (duìmiàn)",
                    "right": "Đối diện, phía trước"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "左 = trái, 右 = phải - nhớ bằng cách nhìn hình chữ",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        },
        {
          "id": "zh_h2_l7",
          "unit_id": "zh_u3_hsk2",
          "lesson_number": 2,
          "title": "Phương Tiện Giao Thông: 出租车，公共汽车",
          "description": "Từ vựng và câu hội thoại đi taxi và xe buýt",
          "xp_reward": 25,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h2_l7_ex1",
              "lesson_id": "zh_h2_l7",
              "type": "listening",
              "prompt": "Nghe và chọn nghĩa chính xác:",
              "target_text": "我们坐出租车去火车站吧。",
              "target_audio_text": "我们坐出租车去火车站吧。",
              "phonetic": "wǒmen zuò chūzūchē qù huǒchēzhàn ba.",
              "vietnamese_meaning": "Chúng ta đi taxi đến ga tàu hỏa nhé.",
              "options": [
                "Chúng ta đi taxi đến ga tàu hỏa nhé.",
                "Chúng ta đi xe buýt đến sân bay nhé.",
                "Tôi muốn mua vé tàu điện ngầm.",
                "Ga tàu hỏa ở rất xa đây."
              ],
              "correct_answer": "Chúng ta đi taxi đến ga tàu hỏa nhé.",
              "hint": "出租车 = taxi, 火车站 = ga tàu hỏa",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h2_l7_ex2",
              "lesson_id": "zh_h2_l7",
              "type": "speaking",
              "prompt": "Nhấn Micro và nói: \"Đi xe buýt rất thuận tiện\":",
              "target_text": "坐公共汽车很方便。",
              "target_audio_text": "坐公共汽车很方便。",
              "phonetic": "zuò gōnggòng qìchē hěn fāngbiàn.",
              "vietnamese_meaning": "Đi xe buýt rất thuận tiện.",
              "options": [],
              "correct_answer": "坐公共汽车很方便。",
              "hint": "公共汽车 = xe buýt, 方便 = thuận tiện",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h2_l7_ex3",
              "lesson_id": "zh_h2_l7",
              "type": "matching",
              "prompt": "Nối các loại phương tiện với nghĩa tiếng Việt:",
              "target_text": "出租车,公共汽车,火车站,机场",
              "target_audio_text": "chūzūchē gōnggòng qìchē huǒchēzhàn jīchǎng",
              "phonetic": "chūzūchē, gōnggòng qìchē, huǒchēzhàn, jīchǎng",
              "vietnamese_meaning": "Từ vựng phương tiện di chuyển",
              "options": {
                "pairs": [
                  {
                    "left": "出租车 (chūzūchē)",
                    "right": "Xe taxi"
                  },
                  {
                    "left": "公共汽车 (gōnggòng qìchē)",
                    "right": "Xe buýt"
                  },
                  {
                    "left": "火车站 (huǒchēzhàn)",
                    "right": "Ga tàu hỏa"
                  },
                  {
                    "left": "机场 (jīchǎng)",
                    "right": "Sân bay"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "车 = xe, 站 = trạm/ga",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h2_l7_ex4",
              "lesson_id": "zh_h2_l7",
              "type": "translation",
              "prompt": "Sắp xếp câu: \"Anh ấy mỗi ngày đi tàu điện ngầm đi làm\":",
              "target_text": "他每天坐地铁上班。",
              "target_audio_text": "他每天坐地铁上班。",
              "phonetic": "tā měitiān zuò dìtiě shàngbān.",
              "vietnamese_meaning": "Anh ấy mỗi ngày đi tàu điện ngầm đi làm.",
              "options": [
                "他",
                "每天",
                "坐",
                "地铁",
                "上班",
                "开车",
                "学校"
              ],
              "correct_answer": "他 每天 坐 地铁 上班",
              "hint": "每天 = mỗi ngày, 地铁 = tàu điện ngầm, 上班 = đi làm",
              "stroke_char": null,
              "order_index": 4
            },
            {
              "id": "zh_h2_l7_ex5",
              "lesson_id": "zh_h2_l7",
              "type": "writing",
              "prompt": "Tập viết chữ Hán 车 (Xe cộ):",
              "target_text": "车",
              "target_audio_text": "车",
              "phonetic": "chē",
              "vietnamese_meaning": "Xe cộ, phương tiện",
              "options": [],
              "correct_answer": "车",
              "hint": "Chữ 车 mô phỏng chiếc xe cổ gồm 4 nét cơ bản",
              "stroke_char": "车",
              "order_index": 5
            }
          ]
        }
      ]
    }
  ],
  "zh_hsk3": [
    {
      "id": "zh_u1_hsk3",
      "level_id": "zh_hsk3",
      "unit_number": 1,
      "title": "Cảm Xúc & Tâm Trạng",
      "description": "Biểu đạt cảm xúc vui buồn, thích ghét, lo lắng",
      "icon": "Smile",
      "banner_color": "#ec4899",
      "levelBadge": "ZH_HSK3",
      "lessons": [
        {
          "id": "zh_h3_l1",
          "unit_id": "zh_u1_hsk3",
          "lesson_number": 1,
          "title": "Cảm Xúc: 高兴，难过，害怕",
          "description": "Học cách diễn đạt trạng thái cảm xúc cơ bản",
          "xp_reward": 25,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h3_l1_ex1",
              "lesson_id": "zh_h3_l1",
              "type": "listening",
              "prompt": "Nghe và chọn nghĩa đúng: 我很高兴 (wǒ hěn gāoxìng):",
              "target_text": "我很高兴",
              "target_audio_text": "我很高兴",
              "phonetic": "wǒ hěn gāoxìng",
              "vietnamese_meaning": "Tôi rất vui",
              "options": [
                "Tôi rất vui",
                "Tôi rất buồn",
                "Tôi rất lo lắng",
                "Tôi rất mệt"
              ],
              "correct_answer": "Tôi rất vui",
              "hint": "高兴 = gāoxìng = vui mừng, hạnh phúc",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h3_l1_ex2",
              "lesson_id": "zh_h3_l1",
              "type": "speaking",
              "prompt": "Nhấn Micro và diễn đạt cảm xúc: \"Tôi rất buồn hôm nay\":",
              "target_text": "我今天很难过",
              "target_audio_text": "我今天很难过",
              "phonetic": "wǒ jīntiān hěn nánguò",
              "vietnamese_meaning": "Tôi hôm nay rất buồn",
              "options": [],
              "correct_answer": "我今天很难过",
              "hint": "难过 = nánguò = buồn khổ, khó chịu trong lòng",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h3_l1_ex3",
              "lesson_id": "zh_h3_l1",
              "type": "matching",
              "prompt": "Ghép cảm xúc với nghĩa tiếng Việt:",
              "target_text": "高兴,难过,害怕,生气",
              "target_audio_text": "gāoxìng nánguò hàipà shēngqì",
              "phonetic": "Cảm xúc",
              "vietnamese_meaning": "Từ vựng cảm xúc",
              "options": {
                "pairs": [
                  {
                    "left": "高兴 (gāoxìng)",
                    "right": "Vui vẻ, hạnh phúc"
                  },
                  {
                    "left": "难过 (nánguò)",
                    "right": "Buồn bã, khổ tâm"
                  },
                  {
                    "left": "害怕 (hàipà)",
                    "right": "Sợ hãi, lo sợ"
                  },
                  {
                    "left": "生气 (shēngqì)",
                    "right": "Tức giận, nổi giận"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "生气 nghĩa đen là \"sinh khí\" nhưng nghĩa thực là tức giận",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h3_l1_ex4",
              "lesson_id": "zh_h3_l1",
              "type": "translation",
              "prompt": "Dịch sang tiếng Trung: \"Con bé rất sợ tiếng sét\":",
              "target_text": "小女孩很害怕雷声",
              "target_audio_text": "小女孩很害怕雷声",
              "phonetic": "xiǎo nǚhái hěn hàipà léishēng",
              "vietnamese_meaning": "Con bé rất sợ tiếng sét",
              "options": [
                "小女孩",
                "很",
                "害怕",
                "雷声",
                "生气",
                "高兴",
                "妈妈"
              ],
              "correct_answer": "小女孩 很 害怕 雷声",
              "hint": "雷声 = léishēng = tiếng sấm sét",
              "stroke_char": null,
              "order_index": 4
            }
          ]
        },
        {
          "id": "zh_h3_l2",
          "unit_id": "zh_u1_hsk3",
          "lesson_number": 2,
          "title": "Thích & Không Thích: 喜欢 vs 不喜欢",
          "description": "Bày tỏ sở thích về ẩm thực, thể thao và âm nhạc",
          "xp_reward": 25,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h3_l2_ex1",
              "lesson_id": "zh_h3_l2",
              "type": "listening",
              "prompt": "Nghe và chọn nghĩa chính xác:",
              "target_text": "除了看书以外，我还喜欢听音乐。",
              "target_audio_text": "除了看书以外，我还喜欢听音乐。",
              "phonetic": "chúle kànshū yǐwài, wǒ hái xǐhuan tīng yīnyuè.",
              "vietnamese_meaning": "Ngoài đọc sách ra, tôi còn thích nghe nhạc.",
              "options": [
                "Ngoài đọc sách ra, tôi còn thích nghe nhạc.",
                "Tôi thích đọc sách hơn nghe nhạc.",
                "Tôi chỉ thích xem phim cùng bạn bè.",
                "Nghe nhạc giúp tôi đọc sách tập trung hơn."
              ],
              "correct_answer": "Ngoài đọc sách ra, tôi còn thích nghe nhạc.",
              "hint": "Cấu trúc 除了...以外，还... nghĩa là Ngoài... ra, còn...",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h3_l2_ex2",
              "lesson_id": "zh_h3_l2",
              "type": "speaking",
              "prompt": "Nhấn Micro và nói: \"Tôi rất có hứng thú với văn hóa Trung Quốc\":",
              "target_text": "我对中国文化很感兴趣。",
              "target_audio_text": "我对中国文化很感兴趣。",
              "phonetic": "wǒ duì zhōngguó wénhuà hěn gǎn xìngqù.",
              "vietnamese_meaning": "Tôi rất có hứng thú với văn hóa Trung Quốc.",
              "options": [],
              "correct_answer": "我对中国文化很感兴趣。",
              "hint": "对...感兴趣 = có hứng thú với cái gì",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h3_l2_ex3",
              "lesson_id": "zh_h3_l2",
              "type": "matching",
              "prompt": "Nối các từ sở thích với nghĩa tiếng Việt:",
              "target_text": "感兴趣,爱好,音乐,运动",
              "target_audio_text": "gǎn xìngqù àihào yīnyuè yùndòng",
              "phonetic": "gǎn xìngqù, àihào, yīnyuè, yùndòng",
              "vietnamese_meaning": "Từ vựng sở thích HSK3",
              "options": {
                "pairs": [
                  {
                    "left": "感兴趣 (gǎn xìngqù)",
                    "right": "Có hứng thú"
                  },
                  {
                    "left": "爱好 (àihào)",
                    "right": "Sở thích"
                  },
                  {
                    "left": "音乐 (yīnyuè)",
                    "right": "Âm nhạc"
                  },
                  {
                    "left": "运动 (yùndòng)",
                    "right": "Thể thao, vận động"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Ghép đúng cặp từ chỉ sở thích",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h3_l2_ex4",
              "lesson_id": "zh_h3_l2",
              "type": "translation",
              "prompt": "Sắp xếp câu: \"Mặc dù rất mệt, nhưng tôi rất vui vẻ\":",
              "target_text": "虽然很累，但是我很高兴。",
              "target_audio_text": "虽然很累，但是我很高兴。",
              "phonetic": "suīrán hěn lèi, dànshì wǒ hěn gāoxìng.",
              "vietnamese_meaning": "Mặc dù rất mệt, nhưng tôi rất vui vẻ.",
              "options": [
                "虽然",
                "很累",
                "但是",
                "我",
                "很",
                "高兴",
                "喜欢",
                "难过"
              ],
              "correct_answer": "虽然 很累 但是 我 很 高兴",
              "hint": "Cặp từ nối: 虽然...但是... (Mặc dù... nhưng...)",
              "stroke_char": null,
              "order_index": 4
            },
            {
              "id": "zh_h3_l2_ex5",
              "lesson_id": "zh_h3_l2",
              "type": "writing",
              "prompt": "Tập viết chữ Hán 乐 (Âm nhạc / Vui vẻ):",
              "target_text": "乐",
              "target_audio_text": "乐",
              "phonetic": "lè / yuè",
              "vietnamese_meaning": "Âm nhạc, vui mừng, lạc quan",
              "options": [],
              "correct_answer": "乐",
              "hint": "Chữ 乐 gồm 5 nét, có 2 cách đọc: yuè (âm nhạc) và lè (vui vẻ)",
              "stroke_char": "乐",
              "order_index": 5
            }
          ]
        }
      ]
    },
    {
      "id": "zh_u2_hsk3",
      "level_id": "zh_hsk3",
      "unit_number": 2,
      "title": "Du Lịch & Ẩm Thực",
      "description": "Đặt vé máy bay, gọi món ăn tại nhà hàng Trung Hoa",
      "icon": "Plane",
      "banner_color": "#db2777",
      "levelBadge": "ZH_HSK3",
      "lessons": [
        {
          "id": "zh_h3_l3",
          "unit_id": "zh_u2_hsk3",
          "lesson_number": 1,
          "title": "Tại Nhà Hàng: 点菜 (Gọi món)",
          "description": "Đọc thực đơn, gọi món và yêu cầu hóa đơn",
          "xp_reward": 30,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h3_l3_ex1",
              "lesson_id": "zh_h3_l3",
              "type": "listening",
              "prompt": "Nghe và chọn câu đúng khi gọi món ăn:",
              "target_text": "我要一碗米饭和一盘炒青菜",
              "target_audio_text": "我要一碗米饭和一盘炒青菜",
              "phonetic": "wǒ yào yī wǎn mǐfàn hé yī pán chǎo qīngcài",
              "vietnamese_meaning": "Tôi muốn một bát cơm và một đĩa rau xào",
              "options": [
                "Tôi muốn một bát cơm và một đĩa rau xào",
                "Tôi muốn hai phần phở và một ly nước",
                "Cho tôi hỏi thực đơn có gì?",
                "Tính tiền cho tôi nhé"
              ],
              "correct_answer": "Tôi muốn một bát cơm và một đĩa rau xào",
              "hint": "碗 (wǎn) = cái bát, 盘 (pán) = cái đĩa",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h3_l3_ex2",
              "lesson_id": "zh_h3_l3",
              "type": "speaking",
              "prompt": "Nhấn Micro và gọi món: \"Cho tôi một bát mì và hai chai nước\":",
              "target_text": "我要一碗面条和两瓶水",
              "target_audio_text": "我要一碗面条和两瓶水",
              "phonetic": "wǒ yào yī wǎn miàntiáo hé liǎng píng shuǐ",
              "vietnamese_meaning": "Tôi muốn một bát mì và hai chai nước",
              "options": [],
              "correct_answer": "我要一碗面条和两瓶水",
              "hint": "瓶 (píng) = cái chai, 面条 = mì sợi",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h3_l3_ex3",
              "lesson_id": "zh_h3_l3",
              "type": "matching",
              "prompt": "Ghép từ vựng nhà hàng với nghĩa tiếng Việt:",
              "target_text": "菜单,服务员,买单,小费",
              "target_audio_text": "càidān fúwùyuán mǎidān xiǎofèi",
              "phonetic": "Nhà hàng",
              "vietnamese_meaning": "Từ vựng nhà hàng",
              "options": {
                "pairs": [
                  {
                    "left": "菜单 (càidān)",
                    "right": "Thực đơn, menu"
                  },
                  {
                    "left": "服务员 (fúwùyuán)",
                    "right": "Nhân viên phục vụ"
                  },
                  {
                    "left": "买单 (mǎidān)",
                    "right": "Tính tiền, thanh toán"
                  },
                  {
                    "left": "小费 (xiǎofèi)",
                    "right": "Tiền tip, tiền thưởng"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "买单 hoặc 结账 (jiézhàng) đều có nghĩa tính tiền",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        },
        {
          "id": "zh_h3_l4",
          "unit_id": "zh_u2_hsk3",
          "lesson_number": 2,
          "title": "Đặt Vé & Khách Sạn",
          "description": "Đặt vé tàu, máy bay và phòng khách sạn qua điện thoại",
          "xp_reward": 30,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h3_l4_ex1",
              "lesson_id": "zh_h3_l4",
              "type": "listening",
              "prompt": "Nghe và chọn câu đối thoại logic nhất:",
              "target_text": "请问，还有去北京的双人间吗？",
              "target_audio_text": "请问，还有去北京的双人间吗？",
              "phonetic": "qǐngwèn, hái yǒu qù běijīng de shuāngrénjiān ma?",
              "vietnamese_meaning": "Xin hỏi, còn phòng đôi khách sạn không?",
              "options": [
                "Xin hỏi, còn phòng đôi khách sạn không?",
                "Xin hỏi, vé máy bay giá bao nhiêu?",
                "Bạn có mang theo hộ chiếu không?",
                "Khách sạn này có bữa sáng miễn phí không?"
              ],
              "correct_answer": "Xin hỏi, còn phòng đôi khách sạn không?",
              "hint": "双人间 = phòng đôi cho 2 người",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h3_l4_ex2",
              "lesson_id": "zh_h3_l4",
              "type": "speaking",
              "prompt": "Nhấn Micro và nói: \"Tôi muốn đặt một tấm vé máy bay đi Thượng Hải\":",
              "target_text": "我想预订一张去上海的机票。",
              "target_audio_text": "我想预订一张去上海的机票。",
              "phonetic": "wǒ xiǎng yùdìng yī zhāng qù shànghǎi de jīpiào.",
              "vietnamese_meaning": "Tôi muốn đặt một tấm vé máy bay đi Thượng Hải.",
              "options": [],
              "correct_answer": "我想预订一张去上海的机票。",
              "hint": "预订 = đặt trước, 机票 = vé máy bay, 张 = lượng từ tờ/vé",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h3_l4_ex3",
              "lesson_id": "zh_h3_l4",
              "type": "matching",
              "prompt": "Nối các từ du lịch và khách sạn:",
              "target_text": "预订,护照,宾馆,行李",
              "target_audio_text": "yùdìng hùzhào bīnguǎn xíngli",
              "phonetic": "yùdìng, hùzhào, bīnguǎn, xíngli",
              "vietnamese_meaning": "Từ vựng đặt vé khách sạn",
              "options": {
                "pairs": [
                  {
                    "left": "预订 (yùdìng)",
                    "right": "Đặt phòng / Đặt vé"
                  },
                  {
                    "left": "护照 (hùzhào)",
                    "right": "Hộ chiếu passport"
                  },
                  {
                    "left": "宾馆 (bīnguǎn)",
                    "right": "Khách sạn"
                  },
                  {
                    "left": "行李 (xíngli)",
                    "right": "Hành lý vali"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "护 = bảo hộ, 照 = giấy tờ chứng nhận",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h3_l4_ex4",
              "lesson_id": "zh_h3_l4",
              "type": "translation",
              "prompt": "Sắp xếp câu: \"Chúng tôi đã đặt trước hai phòng rồi\":",
              "target_text": "我们已经预订了两个房间。",
              "target_audio_text": "我们已经预订了两个房间。",
              "phonetic": "wǒmen yǐjīng yùdìng le liǎng gè fángjiān.",
              "vietnamese_meaning": "Chúng tôi đã đặt trước hai phòng rồi.",
              "options": [
                "我们",
                "已经",
                "预订",
                "了",
                "两个",
                "房间",
                "宾馆",
                "护照"
              ],
              "correct_answer": "我们 已经 预订 了 两个 房间",
              "hint": "已经...了 = đã... rồi, 房间 = căn phòng",
              "stroke_char": null,
              "order_index": 4
            },
            {
              "id": "zh_h3_l4_ex5",
              "lesson_id": "zh_h3_l4",
              "type": "writing",
              "prompt": "Tập viết chữ Hán 票 (Tấm vé):",
              "target_text": "票",
              "target_audio_text": "票",
              "phonetic": "piào",
              "vietnamese_meaning": "Vé xe, phiếu, ngân phiếu",
              "options": [],
              "correct_answer": "票",
              "hint": "Chữ 票 gồm bộ Tây (西) biến thể bên trên và bộ Kỳ (示) bên dưới",
              "stroke_char": "票",
              "order_index": 5
            }
          ]
        }
      ]
    },
    {
      "id": "zh_u3_hsk3",
      "level_id": "zh_hsk3",
      "unit_number": 3,
      "title": "Sức Khỏe & Bệnh Tật",
      "description": "Mô tả triệu chứng, đi khám bác sĩ và mua thuốc",
      "icon": "Heart",
      "banner_color": "#be185d",
      "levelBadge": "ZH_HSK3",
      "lessons": [
        {
          "id": "zh_h3_l5",
          "unit_id": "zh_u3_hsk3",
          "lesson_number": 1,
          "title": "Đi Khám Bác Sĩ: 我头疼 (Tôi đau đầu)",
          "description": "Mô tả triệu chứng bệnh và hiểu toa thuốc",
          "xp_reward": 30,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h3_l5_ex1",
              "lesson_id": "zh_h3_l5",
              "type": "listening",
              "prompt": "Nghe và chọn triệu chứng: 我肚子疼 (wǒ dùzi téng):",
              "target_text": "肚子疼",
              "target_audio_text": "我肚子疼",
              "phonetic": "wǒ dùzi téng",
              "vietnamese_meaning": "Tôi đau bụng",
              "options": [
                "Đau bụng",
                "Đau đầu",
                "Đau họng",
                "Sốt cao"
              ],
              "correct_answer": "Đau bụng",
              "hint": "肚子 = bụng, 疼 = đau (cảm giác đau)",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h3_l5_ex2",
              "lesson_id": "zh_h3_l5",
              "type": "speaking",
              "prompt": "Nhấn Micro và nói với bác sĩ: \"Tôi bị sốt và ho\":",
              "target_text": "我发烧而且咳嗽",
              "target_audio_text": "我发烧而且咳嗽",
              "phonetic": "wǒ fāshāo érqiě késou",
              "vietnamese_meaning": "Tôi bị sốt và ho",
              "options": [],
              "correct_answer": "我发烧而且咳嗽",
              "hint": "发烧 = sốt, 咳嗽 = ho, 而且 = và còn",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h3_l5_ex3",
              "lesson_id": "zh_h3_l5",
              "type": "matching",
              "prompt": "Ghép triệu chứng với nghĩa tiếng Việt:",
              "target_text": "头疼,发烧,咳嗽,过敏",
              "target_audio_text": "tóuténg fāshāo késou guòmǐn",
              "phonetic": "Sức khỏe",
              "vietnamese_meaning": "Triệu chứng bệnh",
              "options": {
                "pairs": [
                  {
                    "left": "头疼 (tóuténg)",
                    "right": "Đau đầu"
                  },
                  {
                    "left": "发烧 (fāshāo)",
                    "right": "Sốt"
                  },
                  {
                    "left": "咳嗽 (késou)",
                    "right": "Ho"
                  },
                  {
                    "left": "过敏 (guòmǐn)",
                    "right": "Dị ứng"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "头 = đầu, 疼/痛 = đau, 发 = phát ra",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        }
      ]
    }
  ],
  "zh_hsk4": [
    {
      "id": "zh_u1_hsk4",
      "level_id": "zh_hsk4",
      "unit_number": 1,
      "title": "Công Việc & Văn Phòng",
      "description": "Từ vựng và tình huống trong môi trường công sở",
      "icon": "Briefcase",
      "banner_color": "#f59e0b",
      "levelBadge": "ZH_HSK4",
      "lessons": [
        {
          "id": "zh_h4_l1",
          "unit_id": "zh_u1_hsk4",
          "lesson_number": 1,
          "title": "Phỏng Vấn Xin Việc: 面试 (Miànshì)",
          "description": "Chuẩn bị câu trả lời phỏng vấn bằng tiếng Trung",
          "xp_reward": 35,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h4_l1_ex1",
              "lesson_id": "zh_h4_l1",
              "type": "listening",
              "prompt": "Nghe và chọn câu trả lời phỏng vấn phù hợp khi được hỏi \"你有什么优点？\"(Ưu điểm của bạn là gì?):",
              "target_text": "我工作认真，有责任心",
              "target_audio_text": "我工作认真，有责任心",
              "phonetic": "wǒ gōngzuò rènzhēn, yǒu zérènxīn",
              "vietnamese_meaning": "Tôi làm việc chăm chỉ, có tinh thần trách nhiệm",
              "options": [
                "Tôi làm việc chăm chỉ, có tinh thần trách nhiệm",
                "Tôi không biết làm gì",
                "Tôi thích nghỉ ngơi",
                "Tôi chưa có kinh nghiệm"
              ],
              "correct_answer": "Tôi làm việc chăm chỉ, có tinh thần trách nhiệm",
              "hint": "认真 = nghiêm túc, chăm chỉ; 责任心 = tinh thần trách nhiệm",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h4_l1_ex2",
              "lesson_id": "zh_h4_l1",
              "type": "speaking",
              "prompt": "Nhấn Micro và tự giới thiệu trong phỏng vấn bằng tiếng Trung:",
              "target_text": "我叫李明，我有三年的工作经验",
              "target_audio_text": "我叫李明，我有三年的工作经验",
              "phonetic": "wǒ jiào Lǐ Míng, wǒ yǒu sān nián de gōngzuò jīngyàn",
              "vietnamese_meaning": "Tôi tên Lý Minh, tôi có 3 năm kinh nghiệm làm việc",
              "options": [],
              "correct_answer": "我叫李明，我有三年的工作经验",
              "hint": "经验 = kinh nghiệm, 年 = năm",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h4_l1_ex3",
              "lesson_id": "zh_h4_l1",
              "type": "matching",
              "prompt": "Ghép từ vựng phỏng vấn với nghĩa:",
              "target_text": "简历,面试,薪资,合同",
              "target_audio_text": "jiǎnlì miànshì xīnzī hétong",
              "phonetic": "Phỏng vấn",
              "vietnamese_meaning": "Từ vựng công việc",
              "options": {
                "pairs": [
                  {
                    "left": "简历 (jiǎnlì)",
                    "right": "CV, hồ sơ xin việc"
                  },
                  {
                    "left": "面试 (miànshì)",
                    "right": "Phỏng vấn"
                  },
                  {
                    "left": "薪资 (xīnzī)",
                    "right": "Lương, mức lương"
                  },
                  {
                    "left": "合同 (hétong)",
                    "right": "Hợp đồng"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "简历 (CV) là tài liệu quan trọng nhất khi xin việc",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        },
        {
          "id": "zh_h4_l2",
          "unit_id": "zh_u1_hsk4",
          "lesson_number": 2,
          "title": "Viết Email Công Việc bằng Tiếng Trung",
          "description": "Cách viết email trang trọng, yêu cầu và phản hồi",
          "xp_reward": 35,
          "type": "writing",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h4_l2_ex1",
              "lesson_id": "zh_h4_l2",
              "type": "listening",
              "prompt": "Nghe và chọn nội dung thông điệp công việc:",
              "target_text": "请查收附件中的会议纪要。",
              "target_audio_text": "请查收附件中的会议纪要。",
              "phonetic": "qǐng cháshōu fùjiàn zhōng de huìyì jìyào.",
              "vietnamese_meaning": "Vui lòng kiểm tra biên bản cuộc họp trong tệp đính kèm.",
              "options": [
                "Vui lòng kiểm tra biên bản cuộc họp trong tệp đính kèm.",
                "Cuộc họp hôm nay sẽ bắt đầu lúc 3 giờ chiều.",
                "Xin gửi lại hợp đồng đã có chữ ký đại diện.",
                "Kính gửi đối tác kế hoạch phát triển mới."
              ],
              "correct_answer": "Vui lòng kiểm tra biên bản cuộc họp trong tệp đính kèm.",
              "hint": "查收 = kiểm tra nhận, 附件 = tệp đính kèm",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h4_l2_ex2",
              "lesson_id": "zh_h4_l2",
              "type": "speaking",
              "prompt": "Nhấn Micro và đọc câu kết thúc email chuyên nghiệp:",
              "target_text": "期待您的回复与合作。",
              "target_audio_text": "期待您的回复与合作。",
              "phonetic": "qīdài nín de huífù yǔ hézuò.",
              "vietnamese_meaning": "Rất mong nhận được phản hồi và sự hợp tác của ngài.",
              "options": [],
              "correct_answer": "期待您的回复与合作。",
              "hint": "期待 = kỳ vọng mong đợi, 回复 = hồi âm, 合作 = hợp tác",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h4_l2_ex3",
              "lesson_id": "zh_h4_l2",
              "type": "matching",
              "prompt": "Nối thuật ngữ văn phòng và email công việc:",
              "target_text": "附件,会议纪要,合作,联系",
              "target_audio_text": "fùjiàn huìyì jìyào hézuò liánxì",
              "phonetic": "fùjiàn, huìyì jìyào, hézuò, liánxì",
              "vietnamese_meaning": "Thuật ngữ thư từ công việc HSK4",
              "options": {
                "pairs": [
                  {
                    "left": "附件 (fùjiàn)",
                    "right": "Tệp file đính kèm"
                  },
                  {
                    "left": "会议纪要 (huìyì jìyào)",
                    "right": "Biên bản cuộc họp"
                  },
                  {
                    "left": "合作 (hézuò)",
                    "right": "Hợp tác đối tác"
                  },
                  {
                    "left": "联系 (liánxì)",
                    "right": "Liên lạc, liên hệ"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Từ vựng quan trọng trong giao tiếp thương mại",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h4_l2_ex4",
              "lesson_id": "zh_h4_l2",
              "type": "translation",
              "prompt": "Sắp xếp câu: \"Nếu có bất kỳ vấn đề gì, vui lòng liên hệ với tôi bất cứ lúc nào\":",
              "target_text": "如果有任何问题，请随时联系我。",
              "target_audio_text": "如果有任何问题，请随时联系我。",
              "phonetic": "rúguǒ yǒu rènhé wèntí, qǐng suíshí liánxì wǒ.",
              "vietnamese_meaning": "Nếu có bất kỳ vấn đề gì, vui lòng liên hệ với tôi bất cứ lúc nào.",
              "options": [
                "如果",
                "有",
                "任何",
                "问题",
                "请",
                "随时",
                "联系",
                "我",
                "合作"
              ],
              "correct_answer": "如果 有 任何 问题 请 随时 联系 我",
              "hint": "任何 = bất kỳ, 随时 = bất cứ lúc nào",
              "stroke_char": null,
              "order_index": 4
            },
            {
              "id": "zh_h4_l2_ex5",
              "lesson_id": "zh_h4_l2",
              "type": "writing",
              "prompt": "Tập viết chữ Hán 复 (Hồi phục / Phúc đáp email):",
              "target_text": "复",
              "target_audio_text": "复",
              "phonetic": "fù",
              "vietnamese_meaning": "Hồi âm, phúc đáp, lặp lại",
              "options": [],
              "correct_answer": "复",
              "hint": "Chữ 复 trong 回复 (hồi âm email) hoặc 复杂 (phức tạp)",
              "stroke_char": "复",
              "order_index": 5
            }
          ]
        }
      ]
    },
    {
      "id": "zh_u2_hsk4",
      "level_id": "zh_hsk4",
      "unit_number": 2,
      "title": "Văn Hóa & Phong Tục",
      "description": "Tết Nguyên Đán, lễ hội truyền thống và phong tục Trung Hoa",
      "icon": "Star",
      "banner_color": "#d97706",
      "levelBadge": "ZH_HSK4",
      "lessons": [
        {
          "id": "zh_h4_l3",
          "unit_id": "zh_u2_hsk4",
          "lesson_number": 1,
          "title": "Tết Nguyên Đán: 春节习俗 (Phong Tục Tết)",
          "description": "Tìm hiểu về lì xì, bánh niên cao và các hoạt động tết",
          "xp_reward": 35,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h4_l3_ex1",
              "lesson_id": "zh_h4_l3",
              "type": "listening",
              "prompt": "Nghe và chọn nghĩa câu chúc tết phổ biến nhất:",
              "target_text": "新年快乐，万事如意！",
              "target_audio_text": "新年快乐，万事如意！",
              "phonetic": "Xīnnián kuàilè, wànshì rúyì!",
              "vietnamese_meaning": "Chúc mừng năm mới, vạn sự như ý!",
              "options": [
                "Chúc mừng năm mới, vạn sự như ý!",
                "Chúc bạn sức khỏe và hạnh phúc!",
                "Cảm ơn lì xì đỏ!",
                "Hẹn gặp lại năm sau!"
              ],
              "correct_answer": "Chúc mừng năm mới, vạn sự như ý!",
              "hint": "万事如意 = vạn sự như ý = mọi việc đều như mong muốn",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h4_l3_ex2",
              "lesson_id": "zh_h4_l3",
              "type": "matching",
              "prompt": "Ghép phong tục Tết với nghĩa tiếng Việt:",
              "target_text": "红包,饺子,烟花,对联",
              "target_audio_text": "hóngbāo jiǎozi yānhuā duìlián",
              "phonetic": "Tết Nguyên Đán",
              "vietnamese_meaning": "Phong tục Tết",
              "options": {
                "pairs": [
                  {
                    "left": "红包 (hóngbāo)",
                    "right": "Phong bì lì xì đỏ"
                  },
                  {
                    "left": "饺子 (jiǎozi)",
                    "right": "Bánh há cảo (ăn Tết)"
                  },
                  {
                    "left": "烟花 (yānhuā)",
                    "right": "Pháo hoa"
                  },
                  {
                    "left": "对联 (duìlián)",
                    "right": "Câu đối đỏ trang trí"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "红包 hiện nay cũng là WeChat/Alipay digital payment",
              "stroke_char": null,
              "order_index": 2
            }
          ]
        }
      ]
    },
    {
      "id": "zh_u3_hsk4",
      "level_id": "zh_hsk4",
      "unit_number": 3,
      "title": "Giải Trí & Sở Thích",
      "description": "Phim ảnh, âm nhạc, thể thao và du lịch trong nước",
      "icon": "Music",
      "banner_color": "#b45309",
      "levelBadge": "ZH_HSK4",
      "lessons": [
        {
          "id": "zh_h4_l4",
          "unit_id": "zh_u3_hsk4",
          "lesson_number": 1,
          "title": "Bàn Luận Phim & Âm Nhạc",
          "description": "Đưa ra ý kiến và đánh giá phim, bài hát yêu thích",
          "xp_reward": 35,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h4_l4_ex1",
              "lesson_id": "zh_h4_l4",
              "type": "listening",
              "prompt": "Nghe và chọn lời nhận xét phim đúng:",
              "target_text": "这部电影的情节非常精彩，值得一看。",
              "target_audio_text": "这部电影的情节非常精彩，值得一看。",
              "phonetic": "zhè bù diànyǐng de qíngjié fēicháng jīngcǎi, zhídé yī kàn.",
              "vietnamese_meaning": "Tình tiết bộ phim này vô cùng xuất sắc, rất đáng xem.",
              "options": [
                "Tình tiết bộ phim này vô cùng xuất sắc, rất đáng xem.",
                "Bài hát này có giai điệu buồn và chậm rãi.",
                "Diễn viên đóng vai chính diễn xuất không tự nhiên.",
                "Rạp chiếu phim hôm nay rất đông khán giả."
              ],
              "correct_answer": "Tình tiết bộ phim này vô cùng xuất sắc, rất đáng xem.",
              "hint": "精彩 = xuất sắc, 值得 = đáng để làm gì",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h4_l4_ex2",
              "lesson_id": "zh_h4_l4",
              "type": "speaking",
              "prompt": "Nhấn Micro và nói: \"Giai điệu bài hát này khiến người ta cảm thấy thư giãn\":",
              "target_text": "这首歌的旋律让人感到放松。",
              "target_audio_text": "这首歌的旋律让人感到放松。",
              "phonetic": "zhè shǒu gē de xuánlǜ ràng rén gǎndào fàngsōng.",
              "vietnamese_meaning": "Giai điệu bài hát này khiến người ta cảm thấy thư giãn.",
              "options": [],
              "correct_answer": "这首歌的旋律让人感到放松。",
              "hint": "旋律 = giai điệu, 放松 = thư giãn thả lỏng",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h4_l4_ex3",
              "lesson_id": "zh_h4_l4",
              "type": "matching",
              "prompt": "Nối thuật ngữ nghệ thuật và giải trí:",
              "target_text": "情节,精彩,旋律,演员",
              "target_audio_text": "qíngjié jīngcǎi xuánlǜ yǎnyuán",
              "phonetic": "qíngjié, jīngcǎi, xuánlǜ, yǎnyuán",
              "vietnamese_meaning": "Từ vựng điện ảnh âm nhạc HSK4",
              "options": {
                "pairs": [
                  {
                    "left": "情节 (qíngjié)",
                    "right": "Tình tiết cốt truyện"
                  },
                  {
                    "left": "精彩 (jīngcǎi)",
                    "right": "Hấp dẫn, tuyệt vời"
                  },
                  {
                    "left": "旋律 (xuánlǜ)",
                    "right": "Giai điệu âm thanh"
                  },
                  {
                    "left": "演员 (yǎnyuán)",
                    "right": "Diễn viên điện ảnh"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "演 = diễn, 员 = thành viên/người",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h4_l4_ex4",
              "lesson_id": "zh_h4_l4",
              "type": "translation",
              "prompt": "Sắp xếp câu: \"Cái kết của bộ phim này khiến mọi người vô cùng cảm động\":",
              "target_text": "这部电影的结局令人感动。",
              "target_audio_text": "这部电影的结局令人感动。",
              "phonetic": "zhè bù diànyǐng de jiéjú lìng rén gǎndòng.",
              "vietnamese_meaning": "Cái kết của bộ phim này khiến mọi người vô cùng cảm động.",
              "options": [
                "这部",
                "电影",
                "的",
                "结局",
                "令人",
                "感动",
                "精彩",
                "旋律"
              ],
              "correct_answer": "这部 电影 的 结局 令人 感动",
              "hint": "结局 = kết thúc/cái kết, 令人 = khiến cho người ta",
              "stroke_char": null,
              "order_index": 4
            },
            {
              "id": "zh_h4_l4_ex5",
              "lesson_id": "zh_h4_l4",
              "type": "writing",
              "prompt": "Tập viết chữ Hán 演 (Diễn xuất):",
              "target_text": "演",
              "target_audio_text": "演",
              "phonetic": "yǎn",
              "vietnamese_meaning": "Diễn xuất, trình diễn, biểu diễn",
              "options": [],
              "correct_answer": "演",
              "hint": "Chữ 演 gồm bộ Ba chấm thủy (氵) bên trái",
              "stroke_char": "演",
              "order_index": 5
            }
          ]
        }
      ]
    }
  ],
  "zh_hsk5": [
    {
      "id": "zh_u1_hsk5",
      "level_id": "zh_hsk5",
      "unit_number": 1,
      "title": "Kinh Tế & Kinh Doanh",
      "description": "Thị trường chứng khoán, đầu tư, xuất nhập khẩu và khởi nghiệp",
      "icon": "TrendingUp",
      "banner_color": "#ef4444",
      "levelBadge": "ZH_HSK5",
      "lessons": [
        {
          "id": "zh_h5_l1",
          "unit_id": "zh_u1_hsk5",
          "lesson_number": 1,
          "title": "Từ Vựng Kinh Doanh: 市场营销",
          "description": "Marketing, thương mại và đàm phán kinh doanh",
          "xp_reward": 45,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h5_l1_ex1",
              "lesson_id": "zh_h5_l1",
              "type": "listening",
              "prompt": "Nghe và chọn nghĩa đúng: 市场营销 (shìchǎng yíngxiāo):",
              "target_text": "市场营销",
              "target_audio_text": "市场营销",
              "phonetic": "shìchǎng yíngxiāo",
              "vietnamese_meaning": "Marketing, tiếp thị thị trường",
              "options": [
                "Marketing, tiếp thị thị trường",
                "Kế toán tài chính",
                "Quản lý nhân sự",
                "Kiểm soát chất lượng"
              ],
              "correct_answer": "Marketing, tiếp thị thị trường",
              "hint": "市场 = thị trường, 营销 = kinh doanh/tiếp thị",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h5_l1_ex2",
              "lesson_id": "zh_h5_l1",
              "type": "matching",
              "prompt": "Ghép thuật ngữ kinh doanh với nghĩa:",
              "target_text": "利润,投资,股票,品牌",
              "target_audio_text": "lìrùn tóuzī gǔpiào pǐnpái",
              "phonetic": "Kinh doanh",
              "vietnamese_meaning": "Từ vựng kinh doanh",
              "options": {
                "pairs": [
                  {
                    "left": "利润 (lìrùn)",
                    "right": "Lợi nhuận"
                  },
                  {
                    "left": "投资 (tóuzī)",
                    "right": "Đầu tư"
                  },
                  {
                    "left": "股票 (gǔpiào)",
                    "right": "Cổ phiếu, chứng khoán"
                  },
                  {
                    "left": "品牌 (pǐnpái)",
                    "right": "Thương hiệu"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "股票 thị trường chứng khoán = 股票市场 (gǔpiào shìchǎng)",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h5_l1_ex3",
              "lesson_id": "zh_h5_l1",
              "type": "speaking",
              "prompt": "Trình bày ý kiến bằng tiếng Trung về lợi ích của thương mại điện tử:",
              "target_text": "电子商务让购物更加便捷",
              "target_audio_text": "电子商务让购物更加便捷",
              "phonetic": "diànzǐ shāngwù ràng gòuwù gèngjiā biànjié",
              "vietnamese_meaning": "Thương mại điện tử làm cho việc mua sắm tiện lợi hơn",
              "options": [],
              "correct_answer": "电子商务让购物更加便捷",
              "hint": "电子商务 = e-commerce, 便捷 = tiện lợi, nhanh chóng",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        }
      ]
    },
    {
      "id": "zh_u2_hsk5",
      "level_id": "zh_hsk5",
      "unit_number": 2,
      "title": "Đọc Báo & Thời Sự",
      "description": "Đọc hiểu bài báo, phân tích tin tức và thảo luận thời sự",
      "icon": "Newspaper",
      "banner_color": "#dc2626",
      "levelBadge": "ZH_HSK5",
      "lessons": [
        {
          "id": "zh_h5_l2",
          "unit_id": "zh_u2_hsk5",
          "lesson_number": 1,
          "title": "Đọc Hiểu Bài Báo Tiếng Trung",
          "description": "Kỹ thuật đọc nhanh và nắm ý chính từ bài báo",
          "xp_reward": 50,
          "type": "reading",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h5_l2_ex1",
              "lesson_id": "zh_h5_l2",
              "type": "listening",
              "prompt": "Nghe đoạn trích thời sự kinh tế và chọn ý chính:",
              "target_text": "随着科技的飞速发展，人工智能深刻地改变了人类的生活方式。",
              "target_audio_text": "随着科技的飞速发展，人工智能深刻地改变了人类的生活方式。",
              "phonetic": "suízhe kējì de fēisù fāzhǎn, réngōng zhìnéng shēnkè de gǎibiàn le rénlèi de shēnghuó fāngshì.",
              "vietnamese_meaning": "Cùng với sự phát triển nhanh chóng của công nghệ, AI đã thay đổi sâu sắc lối sống của nhân loại.",
              "options": [
                "Cùng với sự phát triển nhanh chóng của công nghệ, AI đã thay đổi sâu sắc lối sống của nhân loại.",
                "Trí tuệ nhân tạo đang gây ra nhiều thách thức về việc làm toàn cầu.",
                "Các công ty công nghệ đang đẩy mạnh đầu tư năng lượng sạch.",
                "Mô hình làm việc truyền thống vẫn giữ vai trò then chốt."
              ],
              "correct_answer": "Cùng với sự phát triển nhanh chóng của công nghệ, AI đã thay đổi sâu sắc lối sống của nhân loại.",
              "hint": "随着 = cùng với, 人工智能 = AI, 深刻 = sâu sắc",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h5_l2_ex2",
              "lesson_id": "zh_h5_l2",
              "type": "speaking",
              "prompt": "Nhấn Micro và đọc nhận định chuyên gia:",
              "target_text": "绿色环保已成为全球经济可持续发展的核心议题。",
              "target_audio_text": "绿色环保已成为全球经济可持续发展的核心议题。",
              "phonetic": "lǜsè huánbǎo yǐ chéngwéi quánqiú jīngjì kěchíxù fāzhǎn de héxīn yìtí.",
              "vietnamese_meaning": "Bảo vệ môi trường xanh đã trở thành chủ đề cốt lõi của sự phát triển kinh tế bền vững toàn cầu.",
              "options": [],
              "correct_answer": "绿色环保已成为全球经济可持续发展的核心议题。",
              "hint": "可持续发展 = phát triển bền vững, 核心 = cốt lõi",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h5_l2_ex3",
              "lesson_id": "zh_h5_l2",
              "type": "matching",
              "prompt": "Nối thuật ngữ báo chí và thời sự HSK5:",
              "target_text": "可持续,核心,深刻,飞速",
              "target_audio_text": "kěchíxù héxīn shēnkè fēisù",
              "phonetic": "kěchíxù, héxīn, shēnkè, fēisù",
              "vietnamese_meaning": "Thuật ngữ báo chí học thuật HSK5",
              "options": {
                "pairs": [
                  {
                    "left": "可持续 (kěchíxù)",
                    "right": "Bền vững, lâu dài"
                  },
                  {
                    "left": "核心 (héxīn)",
                    "right": "Cốt lõi, trung tâm"
                  },
                  {
                    "left": "深刻 (shēnkè)",
                    "right": "Sâu sắc, thấu đáo"
                  },
                  {
                    "left": "飞速 (fēisù)",
                    "right": "Nhanh như bay, thần tốc"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Ghép chuẩn thuật ngữ thường gặp trên các mặt báo",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h5_l2_ex4",
              "lesson_id": "zh_h5_l2",
              "type": "translation",
              "prompt": "Sắp xếp câu: \"Đổi mới công nghệ đã thúc đẩy sự phồn vinh của ngành công nghiệp\":",
              "target_text": "科技创新推动了产业的繁荣。",
              "target_audio_text": "科技创新推动了产业的繁荣。",
              "phonetic": "kējì chuàngxīn tuīdòng le chǎnyè de fánróng.",
              "vietnamese_meaning": "Đổi mới công nghệ đã thúc đẩy sự phồn vinh của ngành công nghiệp.",
              "options": [
                "科技",
                "创新",
                "推动",
                "了",
                "产业",
                "的",
                "繁荣",
                "深刻",
                "核心"
              ],
              "correct_answer": "科技 创新 推动 了 产业 的 繁荣",
              "hint": "创新 = đổi mới sáng tạo, 推动 = thúc đẩy, 繁荣 = phồn vinh",
              "stroke_char": null,
              "order_index": 4
            },
            {
              "id": "zh_h5_l2_ex5",
              "lesson_id": "zh_h5_l2",
              "type": "writing",
              "prompt": "Tập viết chữ Hán 济 (Kinh tế / Cứu trợ):",
              "target_text": "济",
              "target_audio_text": "济",
              "phonetic": "jì",
              "vietnamese_meaning": "Kinh tế, cứu giúp",
              "options": [],
              "correct_answer": "济",
              "hint": "Chữ 济 trong 经济 (Kinh tế) có bộ Thủy bên trái",
              "stroke_char": "济",
              "order_index": 5
            }
          ]
        }
      ]
    },
    {
      "id": "zh_u3_hsk5",
      "level_id": "zh_hsk5",
      "unit_number": 3,
      "title": "Viết Luận & Trình Bày",
      "description": "Cấu trúc bài luận, lập luận và viết báo cáo tiếng Trung",
      "icon": "FileText",
      "banner_color": "#b91c1c",
      "levelBadge": "ZH_HSK5",
      "lessons": [
        {
          "id": "zh_h5_l3",
          "unit_id": "zh_u3_hsk5",
          "lesson_number": 1,
          "title": "Viết Luận Tiếng Trung: Cấu Trúc & Lập Luận",
          "description": "Mở bài, thân bài, kết luận và các liên từ nối câu",
          "xp_reward": 50,
          "type": "writing",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h5_l3_ex1",
              "lesson_id": "zh_h5_l3",
              "type": "listening",
              "prompt": "Nghe câu kết luận lập luận bài viết:",
              "target_text": "综上所述，教育不仅关乎个人前途，更是国家发展的基石。",
              "target_audio_text": "综上所述，教育不仅关乎个人前途，更是国家发展的基石。",
              "phonetic": "zòngshàng suǒshù, jiàoyù bùjǐn guānhū gèrén qiántú, gèng shì guójiā fāzhǎn de jīshí.",
              "vietnamese_meaning": "Tóm lại, giáo dục không chỉ liên quan đến tương lai cá nhân, mà còn là nền tảng cho sự phát triển của quốc gia.",
              "options": [
                "Tóm lại, giáo dục không chỉ liên quan đến tương lai cá nhân, mà còn là nền tảng cho sự phát triển của quốc gia.",
                "Môi trường sống đóng vai trò quyết định đến tính cách của mỗi con người.",
                "Chúng ta cần cân bằng giữa việc học tập và nghỉ ngơi giải trí.",
                "Thành công chỉ đến với những người biết nắm bắt cơ hội."
              ],
              "correct_answer": "Tóm lại, giáo dục không chỉ liên quan đến tương lai cá nhân, mà còn là nền tảng cho sự phát triển của quốc gia.",
              "hint": "综上所述 = Tóm lại / Tổng kết lại những điều trên, 基石 = nền tảng vững chắc",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h5_l3_ex2",
              "lesson_id": "zh_h5_l3",
              "type": "speaking",
              "prompt": "Nhấn Micro và nói câu luận điểm vững chắc:",
              "target_text": "从长远来看，坚持自主创新才能立于不败之地。",
              "target_audio_text": "从长远来看，坚持自主创新才能立于不败之地。",
              "phonetic": "cóng chángyuǎn lái kàn, jiānchí zìzhǔ chuàngxīn cái néng lì yú bú bài zhī dì.",
              "vietnamese_meaning": "Nhìn về lâu dài, kiên trì tự chủ đổi mới mới có thể đứng vững ở vị thế bất bại.",
              "options": [],
              "correct_answer": "从长远来看，坚持自主创新才能立于不败之地。",
              "hint": "从长远来看 = Nhìn về lâu dài, 不败之地 = thế bất bại",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h5_l3_ex3",
              "lesson_id": "zh_h5_l3",
              "type": "matching",
              "prompt": "Nối các liên từ nối lập luận bài văn nghị luận HSK5:",
              "target_text": "综上所述,从长远来看,毫无疑问,总而言之",
              "target_audio_text": "zòngshàng suǒshù cóng chángyuǎn lái kàn háowú yíwèn zǒng'éryánzhī",
              "phonetic": "zòngshàng suǒshù, cóng chángyuǎn lái kàn, háowú yíwèn, zǒng'éryánzhī",
              "vietnamese_meaning": "Từ nối lập luận bài văn HSK5",
              "options": {
                "pairs": [
                  {
                    "left": "综上所述 (zòngshàng suǒshù)",
                    "right": "Tóm lại các điều trên"
                  },
                  {
                    "left": "从长远来看 (cóng chángyuǎn)",
                    "right": "Về lâu dài mà nói"
                  },
                  {
                    "left": "毫无疑问 (háowú yíwèn)",
                    "right": "Không còn nghi ngờ gì nữa"
                  },
                  {
                    "left": "总而言之 (zǒng'éryánzhī)",
                    "right": "Nói tóm lại"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Cụm 4 chữ dùng làm mở bài và kết bài văn luận",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h5_l3_ex4",
              "lesson_id": "zh_h5_l3",
              "type": "translation",
              "prompt": "Sắp xếp câu: \"Mọi thành công đều không thể tách rời sự nỗ lực kiên trì\":",
              "target_text": "任何成功都离不开坚持不懈的努力。",
              "target_audio_text": "任何成功都离不开坚持不懈的努力。",
              "phonetic": "rènhé chénggōng dōu lí bù kāi jiānchí bù xiè de nǔlì.",
              "vietnamese_meaning": "Mọi thành công đều không thể tách rời sự nỗ lực kiên trì.",
              "options": [
                "任何",
                "成功",
                "都",
                "离不开",
                "坚持不懈",
                "的",
                "努力",
                "教育",
                "发展"
              ],
              "correct_answer": "任何 成功 都 离不开 坚持不懈 的 努力",
              "hint": "离不开 = không thể tách rời, 坚持不懈 = kiên trì bền bỉ",
              "stroke_char": null,
              "order_index": 4
            },
            {
              "id": "zh_h5_l3_ex5",
              "lesson_id": "zh_h5_l3",
              "type": "writing",
              "prompt": "Tập viết chữ Hán 论 (Nghị luận / Luận điểm):",
              "target_text": "论",
              "target_audio_text": "论",
              "phonetic": "lùn",
              "vietnamese_meaning": "Bàn luận, lý luận, nghị luận",
              "options": [],
              "correct_answer": "论",
              "hint": "Chữ 论 gồm bộ Ngôn (讠) bên trái biểu thị lời nói bàn luận",
              "stroke_char": "论",
              "order_index": 5
            }
          ]
        }
      ]
    }
  ],
  "zh_hsk6": [
    {
      "id": "zh_u1_hsk6",
      "level_id": "zh_hsk6",
      "unit_number": 1,
      "title": "Văn Học & Triết Học Trung Hoa",
      "description": "Thơ Đường, truyện ngắn hiện đại và tư tưởng Khổng Tử",
      "icon": "BookOpen",
      "banner_color": "#dc2626",
      "levelBadge": "ZH_HSK6",
      "lessons": [
        {
          "id": "zh_h6_l1",
          "unit_id": "zh_u1_hsk6",
          "lesson_number": 1,
          "title": "Thơ Đường: 静夜思 (Tư Đêm Yên Tĩnh) - Lý Bạch",
          "description": "Phân tích thơ cổ, cảm thụ văn học và ngữ nghĩa ẩn sâu",
          "xp_reward": 60,
          "type": "reading",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h6_l1_ex1",
              "lesson_id": "zh_h6_l1",
              "type": "reading",
              "prompt": "Đọc thơ và trả lời: Trong bài 静夜思, Lý Bạch đang nhớ đến điều gì khi nhìn ánh trăng?",
              "target_text": "故乡",
              "target_audio_text": "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
              "phonetic": "chuáng qián míng yuè guāng...",
              "vietnamese_meaning": "Ánh trăng sáng trước giường, ngỡ là sương trên đất. Ngẩng đầu nhìn trăng sáng, cúi đầu nhớ quê hương.",
              "options": [
                "Quê hương",
                "Người yêu",
                "Bạn bè",
                "Mùa đông lạnh giá"
              ],
              "correct_answer": "Quê hương",
              "hint": "故乡 = gùxiāng = quê hương, 思 = tư/nhớ",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h6_l1_ex2",
              "lesson_id": "zh_h6_l1",
              "type": "speaking",
              "prompt": "Nhấn Micro và ngâm 2 câu thơ nổi tiếng của Lý Bạch:",
              "target_text": "举头望明月，低头思故乡。",
              "target_audio_text": "举头望明月，低头思故乡。",
              "phonetic": "jǔ tóu wàng míngyuè, dī tóu sī gùxiāng.",
              "vietnamese_meaning": "Ngẩng đầu nhìn trăng sáng, Cúi đầu nhớ cố hương.",
              "options": [],
              "correct_answer": "举头望明月，低头思故乡。",
              "hint": "Tác phẩm Tĩnh Dạ Tứ - Thi tiên Lý Bạch",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h6_l1_ex3",
              "lesson_id": "zh_h6_l1",
              "type": "matching",
              "prompt": "Nối các từ ngữ thi ca Đường Thi với ý nghĩa:",
              "target_text": "明月,故乡,霜,望",
              "target_audio_text": "míngyuè gùxiāng shuāng wàng",
              "phonetic": "míngyuè, gùxiāng, shuāng, wàng",
              "vietnamese_meaning": "Từ vựng văn học cổ điển HSK6",
              "options": {
                "pairs": [
                  {
                    "left": "明月 (míngyuè)",
                    "right": "Trăng sáng vằng vặc"
                  },
                  {
                    "left": "故乡 (gùxiāng)",
                    "right": "Quê hương bản xứ"
                  },
                  {
                    "left": "疑是霜 (yí shì shuāng)",
                    "right": "Ngỡ là sương tuyết trên mặt đất"
                  },
                  {
                    "left": "举头 (jǔ tóu)",
                    "right": "Ngẩng cao đầu"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Từ vựng văn học cổ điển Đường thi",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        }
      ]
    },
    {
      "id": "zh_u2_hsk6",
      "level_id": "zh_hsk6",
      "unit_number": 2,
      "title": "Ngôn Ngữ Học & Hán Ngữ Chuyên Sâu",
      "description": "Ngữ pháp nâng cao, thành ngữ, tục ngữ và câu ghép phức",
      "icon": "Languages",
      "banner_color": "#b91c1c",
      "levelBadge": "ZH_HSK6",
      "lessons": [
        {
          "id": "zh_h6_l2",
          "unit_id": "zh_u2_hsk6",
          "lesson_number": 1,
          "title": "Thành Ngữ 4 Chữ: 成语 (Chéngyǔ) Quan Trọng",
          "description": "20 thành ngữ HSK6 phổ biến nhất với ví dụ thực tế",
          "xp_reward": 60,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "zh_h6_l2_ex1",
              "lesson_id": "zh_h6_l2",
              "type": "listening",
              "prompt": "Nghe thành ngữ 一石二鸟 (yī shí èr niǎo) và chọn nghĩa đúng:",
              "target_text": "一石二鸟",
              "target_audio_text": "一石二鸟",
              "phonetic": "yī shí èr niǎo",
              "vietnamese_meaning": "Một mũi tên trúng hai đích",
              "options": [
                "Một mũi tên trúng hai đích",
                "Chim khôn chọn cành mà đậu",
                "Chậm mà chắc",
                "Nước chảy đá mòn"
              ],
              "correct_answer": "Một mũi tên trúng hai đích",
              "hint": "Nghĩa đen: một hòn đá hạ hai con chim",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "zh_h6_l2_ex2",
              "lesson_id": "zh_h6_l2",
              "type": "matching",
              "prompt": "Ghép thành ngữ với nghĩa tiếng Việt tương đương:",
              "target_text": "马到成功,半途而废,青出于蓝,实事求是",
              "target_audio_text": "mǎ dào chénggōng...",
              "phonetic": "Thành ngữ HSK6",
              "vietnamese_meaning": "Chéngyǔ",
              "options": {
                "pairs": [
                  {
                    "left": "马到成功 (mǎ dào chénggōng)",
                    "right": "Thành công ngay lập tức"
                  },
                  {
                    "left": "半途而废 (bàntú ér fèi)",
                    "right": "Bỏ cuộc giữa chừng"
                  },
                  {
                    "left": "青出于蓝 (qīng chū yú lán)",
                    "right": "Trò giỏi hơn thầy"
                  },
                  {
                    "left": "实事求是 (shíshì qiúshì)",
                    "right": "Thực tế khách quan, tìm sự thật"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "实事求是 là phương châm học thuật và nghiên cứu của Trung Quốc",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "zh_h6_l2_ex3",
              "lesson_id": "zh_h6_l2",
              "type": "listening",
              "prompt": "Nghe thành ngữ và chọn ý nghĩa biểu đạt:",
              "target_text": "一举两得",
              "target_audio_text": "一举两得",
              "phonetic": "yī jǔ liǎng dé",
              "vietnamese_meaning": "Một mũi tên trúng hai đích (Một công đôi việc)",
              "options": [
                "Một công đôi việc, làm một việc được hai lợi ích",
                "Bỏ dở giữa chừng, không kiên trì",
                "Ếch ngồi đáy giếng, tầm nhìn hạn hẹp",
                "Nước chảy đá mòn, kiên nhẫn thành công"
              ],
              "correct_answer": "Một công đôi việc, làm một việc được hai lợi ích",
              "hint": "举 = hành động cử chỉ, 得 = đạt được",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "zh_h6_l2_ex4",
              "lesson_id": "zh_h6_l2",
              "type": "translation",
              "prompt": "Sắp xếp câu dùng thành ngữ: \"Làm như vậy vừa bảo vệ môi trường vừa tiết kiệm, thật là một công đôi việc\":",
              "target_text": "这样做既环保又省钱，真是一举两得。",
              "target_audio_text": "这样做既环保又省钱，真是一举两得。",
              "phonetic": "zhèyàng zuò jì huánbǎo yòu shěngqián, zhēnshì yījǔliǎngdé.",
              "vietnamese_meaning": "Làm như vậy vừa bảo vệ môi trường vừa tiết kiệm, thật là một công đôi việc.",
              "options": [
                "这样做",
                "既环保",
                "又省钱",
                "真是",
                "一举两得",
                "毫无疑问",
                "基石"
              ],
              "correct_answer": "这样做 既环保 又省钱 真是 一举两得",
              "hint": "Cấu trúc 既...又... (Vừa... lại vừa...)",
              "stroke_char": null,
              "order_index": 4
            }
          ]
        }
      ]
    }
  ],
  "en_a2": [
    {
      "id": "en_u1_a2",
      "level_id": "en_a2",
      "unit_number": 1,
      "title": "Travel & Accommodation",
      "description": "Book hotels, ask for directions and navigate airports",
      "icon": "Plane",
      "banner_color": "#3b82f6",
      "levelBadge": "EN_A2",
      "lessons": [
        {
          "id": "en_a2_l1",
          "unit_id": "en_u1_a2",
          "lesson_number": 1,
          "title": "At the Airport: Check-in & Immigration",
          "description": "Essential airport vocabulary and conversations",
          "xp_reward": 20,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_a2_l1_ex1",
              "lesson_id": "en_a2_l1",
              "type": "listening",
              "prompt": "Listen and choose the correct meaning: \"Could I see your boarding pass, please?\"",
              "target_text": "boarding pass",
              "target_audio_text": "Could I see your boarding pass, please?",
              "phonetic": "/ˈbɔːdɪŋ pɑːs/",
              "vietnamese_meaning": "Thẻ lên máy bay",
              "options": [
                "Thẻ lên máy bay",
                "Hộ chiếu",
                "Thị thực (visa)",
                "Thẻ căn cước"
              ],
              "correct_answer": "Thẻ lên máy bay",
              "hint": "boarding pass = thẻ lên máy bay, cần xuất trình tại cổng máy bay",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_a2_l1_ex2",
              "lesson_id": "en_a2_l1",
              "type": "speaking",
              "prompt": "Press Mic: Tell the immigration officer where you are going:",
              "target_text": "I'm traveling to London for tourism.",
              "target_audio_text": "I'm traveling to London for tourism.",
              "phonetic": "/aɪm ˈtrævəlɪŋ tuː ˈlʌndən fɔː ˈtʊərɪzəm/",
              "vietnamese_meaning": "Tôi đến London để du lịch.",
              "options": [],
              "correct_answer": "I'm traveling to London for tourism.",
              "hint": "Use present continuous \"I am traveling\" for current trip",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "en_a2_l1_ex3",
              "lesson_id": "en_a2_l1",
              "type": "matching",
              "prompt": "Match airport vocabulary with Vietnamese meanings:",
              "target_text": "departure, arrival, customs, gate",
              "target_audio_text": "departure arrival customs gate",
              "phonetic": "Airport vocabulary",
              "vietnamese_meaning": "Từ vựng sân bay",
              "options": {
                "pairs": [
                  {
                    "left": "Departure",
                    "right": "Khởi hành, xuất phát"
                  },
                  {
                    "left": "Arrival",
                    "right": "Đến nơi, hạ cánh"
                  },
                  {
                    "left": "Customs",
                    "right": "Hải quan"
                  },
                  {
                    "left": "Gate",
                    "right": "Cổng lên máy bay"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Check \"arrivals\" or \"departures\" board to find your flight",
              "stroke_char": null,
              "order_index": 3
            },
            {
              "id": "en_a2_l1_ex4",
              "lesson_id": "en_a2_l1",
              "type": "translation",
              "prompt": "Translate to English: \"Hành lý của tôi bị mất\":",
              "target_text": "My luggage is lost.",
              "target_audio_text": "My luggage is lost.",
              "phonetic": "/maɪ ˈlʌɡɪdʒ ɪz lɒst/",
              "vietnamese_meaning": "Hành lý của tôi bị mất",
              "options": [
                "My",
                "luggage",
                "is",
                "lost",
                "stolen",
                "found",
                "ticket"
              ],
              "correct_answer": "My luggage is lost",
              "hint": "luggage/baggage = hành lý, lost = bị mất",
              "stroke_char": null,
              "order_index": 4
            }
          ]
        },
        {
          "id": "en_a2_l2",
          "unit_id": "en_u1_a2",
          "lesson_number": 2,
          "title": "Booking a Hotel Room",
          "description": "Make reservations and describe room preferences",
          "xp_reward": 20,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_a2_l2_ex1",
              "lesson_id": "en_a2_l2",
              "type": "listening",
              "prompt": "Listen and choose what the guest is asking for:",
              "target_text": "single room",
              "target_audio_text": "I'd like to book a single room for two nights, please.",
              "phonetic": "/aɪd laɪk tuː bʊk ə ˈsɪŋɡl ruːm/",
              "vietnamese_meaning": "Tôi muốn đặt phòng đơn trong 2 đêm.",
              "options": [
                "Phòng đơn 2 đêm",
                "Phòng đôi 3 đêm",
                "Phòng có view biển",
                "Phòng khuyết tật"
              ],
              "correct_answer": "Phòng đơn 2 đêm",
              "hint": "single room = phòng đơn, double room = phòng đôi",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_a2_l2_ex2",
              "lesson_id": "en_a2_l2",
              "type": "speaking",
              "prompt": "Press Mic: Book a double room for 3 nights:",
              "target_text": "I'd like to book a double room for three nights.",
              "target_audio_text": "I'd like to book a double room for three nights.",
              "phonetic": "/aɪd laɪk tuː bʊk ə ˈdʌbl ruːm fɔː θriː naɪts/",
              "vietnamese_meaning": "Tôi muốn đặt phòng đôi 3 đêm.",
              "options": [],
              "correct_answer": "I'd like to book a double room for three nights.",
              "hint": "I'd like to... = Tôi muốn... (lịch sự hơn I want)",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "en_a2_l2_ex3",
              "lesson_id": "en_a2_l2",
              "type": "matching",
              "prompt": "Match hotel vocabulary with Vietnamese meanings:",
              "target_text": "check-in, check-out, room service, reception",
              "target_audio_text": "check-in check-out room service reception",
              "phonetic": "Hotel",
              "vietnamese_meaning": "Từ vựng khách sạn",
              "options": {
                "pairs": [
                  {
                    "left": "Check-in",
                    "right": "Nhận phòng"
                  },
                  {
                    "left": "Check-out",
                    "right": "Trả phòng"
                  },
                  {
                    "left": "Room service",
                    "right": "Phục vụ tại phòng"
                  },
                  {
                    "left": "Reception",
                    "right": "Lễ tân"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Check-in time is usually 2pm, check-out at 12pm",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        }
      ]
    },
    {
      "id": "en_u2_a2",
      "level_id": "en_a2",
      "unit_number": 2,
      "title": "Food, Restaurants & Shopping",
      "description": "Order food, read menus and shop at markets",
      "icon": "ShoppingCart",
      "banner_color": "#2563eb",
      "levelBadge": "EN_A2",
      "lessons": [
        {
          "id": "en_a2_l3",
          "unit_id": "en_u2_a2",
          "lesson_number": 1,
          "title": "Ordering Food at a Restaurant",
          "description": "Read menus, ask about dishes and pay the bill",
          "xp_reward": 25,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_a2_l3_ex1",
              "lesson_id": "en_a2_l3",
              "type": "listening",
              "prompt": "Listen and select the correct waiter response:",
              "target_text": "Are you ready to order?",
              "target_audio_text": "Are you ready to order?",
              "phonetic": "/ɑː juː ˈredi tuː ˈɔːdər/",
              "vietnamese_meaning": "Bạn đã sẵn sàng gọi món chưa?",
              "options": [
                "Bạn đã sẵn sàng gọi món chưa?",
                "Bạn có muốn thêm gì không?",
                "Hóa đơn đây!",
                "Bàn của bạn ở đây"
              ],
              "correct_answer": "Bạn đã sẵn sàng gọi món chưa?",
              "hint": "\"Are you ready to order?\" = câu hỏi mà waiter hỏi khách",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_a2_l3_ex2",
              "lesson_id": "en_a2_l3",
              "type": "speaking",
              "prompt": "Press Mic: Order a burger and a cola:",
              "target_text": "I'll have a burger and a cola, please.",
              "target_audio_text": "I'll have a burger and a cola, please.",
              "phonetic": "/aɪl hæv ə ˈbɜːɡər ænd ə ˈkoʊlə pliːz/",
              "vietnamese_meaning": "Cho tôi một cái burger và một ly cola.",
              "options": [],
              "correct_answer": "I'll have a burger and a cola, please.",
              "hint": "I'll have... = cách gọi món tự nhiên và lịch sự nhất",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "en_a2_l3_ex3",
              "lesson_id": "en_a2_l3",
              "type": "matching",
              "prompt": "Match restaurant phrases with Vietnamese meanings:",
              "target_text": "I'd like..., Could I have..., The bill please, Enjoy your meal",
              "target_audio_text": "",
              "phonetic": "Restaurant phrases",
              "vietnamese_meaning": "Cụm từ nhà hàng",
              "options": {
                "pairs": [
                  {
                    "left": "I'd like the pasta.",
                    "right": "Tôi muốn gọi món mì Ý"
                  },
                  {
                    "left": "Could I have the menu?",
                    "right": "Cho tôi xem thực đơn được không?"
                  },
                  {
                    "left": "The bill, please.",
                    "right": "Cho tôi xin hóa đơn"
                  },
                  {
                    "left": "Enjoy your meal!",
                    "right": "Chúc ngon miệng!"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "\"The bill please\" = yêu cầu tính tiền ở Anh; \"Check please\" ở Mỹ",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        },
        {
          "id": "en_a2_l4",
          "unit_id": "en_u2_a2",
          "lesson_number": 2,
          "title": "Shopping: Prices & Bargaining",
          "description": "Ask about prices, sizes and make purchases",
          "xp_reward": 25,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_a2_l4_ex1",
              "lesson_id": "en_a2_l4",
              "type": "listening",
              "prompt": "Listen and choose the meaning of \"How much does this cost?\":",
              "target_text": "How much does this cost?",
              "target_audio_text": "How much does this cost?",
              "phonetic": "/haʊ mʌtʃ dʌz ðɪs kɒst/",
              "vietnamese_meaning": "Cái này giá bao nhiêu tiền?",
              "options": [
                "Cái này giá bao nhiêu tiền?",
                "Bạn có giảm giá không?",
                "Cửa hàng mấy giờ đóng cửa?",
                "Tôi muốn đổi chiếc áo này."
              ],
              "correct_answer": "Cái này giá bao nhiêu tiền?",
              "hint": "How much = bao nhiêu tiền",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_a2_l4_ex2",
              "lesson_id": "en_a2_l4",
              "type": "speaking",
              "prompt": "Press Mic and politely ask for a discount:",
              "target_text": "Could you give me a discount, please?",
              "target_audio_text": "Could you give me a discount, please?",
              "phonetic": "/kʊd juː ɡɪv miː ə ˈdɪskaʊnt pliːz/",
              "vietnamese_meaning": "Bạn có thể giảm giá cho tôi một chút được không?",
              "options": [],
              "correct_answer": "Could you give me a discount, please?",
              "hint": "Discount = giảm giá, Could you = lời đề nghị lịch sự",
              "stroke_char": null,
              "order_index": 2
            }
          ]
        }
      ]
    },
    {
      "id": "en_u3_a2",
      "level_id": "en_a2",
      "unit_number": 3,
      "title": "Daily Routines & Health",
      "description": "Describe your daily schedule and talk about health",
      "icon": "Clock",
      "banner_color": "#1d4ed8",
      "levelBadge": "EN_A2",
      "lessons": [
        {
          "id": "en_a2_l5",
          "unit_id": "en_u3_a2",
          "lesson_number": 1,
          "title": "Daily Routine: Morning to Night",
          "description": "Describe your typical day using present simple",
          "xp_reward": 20,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_a2_l5_ex1",
              "lesson_id": "en_a2_l5",
              "type": "listening",
              "prompt": "Listen and choose the correct daily routine order:",
              "target_text": "wake up, brush teeth, have breakfast, go to work",
              "target_audio_text": "I wake up, brush my teeth, have breakfast and go to work.",
              "phonetic": "/aɪ weɪk ʌp, brʌʃ maɪ tiːθ, hæv ˈbrekfəst ænd ɡoʊ tuː wɜːrk/",
              "vietnamese_meaning": "Tôi thức dậy, đánh răng, ăn sáng và đi làm.",
              "options": [
                "Thức dậy → Đánh răng → Ăn sáng → Đi làm",
                "Đi làm → Ăn sáng → Đánh răng → Thức dậy",
                "Ăn sáng → Thức dậy → Đi làm → Đánh răng",
                "Đánh răng → Đi làm → Thức dậy → Ăn sáng"
              ],
              "correct_answer": "Thức dậy → Đánh răng → Ăn sáng → Đi làm",
              "hint": "Present simple tense mô tả thói quen hàng ngày",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_a2_l5_ex2",
              "lesson_id": "en_a2_l5",
              "type": "speaking",
              "prompt": "Press Mic: Describe your morning routine in 1-2 sentences:",
              "target_text": "I usually wake up at 7 and have breakfast before going to work.",
              "target_audio_text": "I usually wake up at 7 and have breakfast before going to work.",
              "phonetic": "/aɪ ˈjuːʒuəli weɪk ʌp æt ˈsevən ænd hæv ˈbrekfəst bɪˈfɔːr ˈɡoʊɪŋ tuː wɜːrk/",
              "vietnamese_meaning": "Tôi thường thức dậy lúc 7 giờ và ăn sáng trước khi đi làm.",
              "options": [],
              "correct_answer": "I usually wake up at 7 and have breakfast before going to work.",
              "hint": "Usually/always/often/sometimes = trạng từ chỉ tần suất",
              "stroke_char": null,
              "order_index": 2
            }
          ]
        }
      ]
    }
  ],
  "en_b1": [
    {
      "id": "en_u1_b1",
      "level_id": "en_b1",
      "unit_number": 1,
      "title": "Work & Career",
      "description": "Job interviews, workplace communication and career planning",
      "icon": "Briefcase",
      "banner_color": "#8b5cf6",
      "levelBadge": "EN_B1",
      "lessons": [
        {
          "id": "en_b1_l1",
          "unit_id": "en_u1_b1",
          "lesson_number": 1,
          "title": "Job Interview: \"Tell me about yourself\"",
          "description": "Structure a confident self-introduction in English",
          "xp_reward": 30,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_b1_l1_ex1",
              "lesson_id": "en_b1_l1",
              "type": "listening",
              "prompt": "Listen and choose the best answer to \"What are your strengths?\"",
              "target_text": "I'm a good team player and I'm very organized.",
              "target_audio_text": "I'm a good team player and I'm very organized.",
              "phonetic": "/aɪm ə ɡʊd tiːm ˈpleɪər ænd aɪm ˈveri ˈɔːɡənaɪzd/",
              "vietnamese_meaning": "Tôi là người làm việc nhóm tốt và rất có tổ chức.",
              "options": [
                "I'm a good team player and I'm very organized.",
                "I don't have any weaknesses.",
                "I want more money.",
                "I haven't thought about it."
              ],
              "correct_answer": "I'm a good team player and I'm very organized.",
              "hint": "Strengths = điểm mạnh. Mention team skills and personal qualities.",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_b1_l1_ex2",
              "lesson_id": "en_b1_l1",
              "type": "speaking",
              "prompt": "Press Mic: Introduce yourself for a job interview (30 seconds):",
              "target_text": "My name is Minh. I have a degree in marketing and 2 years of experience in sales.",
              "target_audio_text": "My name is Minh. I have a degree in marketing and 2 years of experience in sales.",
              "phonetic": "/maɪ neɪm ɪz mɪn. aɪ hæv ə dɪˈɡriː ɪn ˈmɑːrkɪtɪŋ ænd tuː jɪərz əv ɪkˈspɪriəns ɪn seɪlz/",
              "vietnamese_meaning": "Tên tôi là Minh. Tôi có bằng marketing và 2 năm kinh nghiệm bán hàng.",
              "options": [],
              "correct_answer": "My name is Minh. I have a degree in marketing and 2 years of experience in sales.",
              "hint": "Structure: Name → Education → Experience → Why this job",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "en_b1_l1_ex3",
              "lesson_id": "en_b1_l1",
              "type": "matching",
              "prompt": "Match interview questions with appropriate answer starters:",
              "target_text": "Tell me about yourself, Why this company, Greatest achievement, 5-year plan",
              "target_audio_text": "",
              "phonetic": "Job interview",
              "vietnamese_meaning": "Phỏng vấn tiếng Anh",
              "options": {
                "pairs": [
                  {
                    "left": "Tell me about yourself.",
                    "right": "I'm currently working as... / I recently graduated from..."
                  },
                  {
                    "left": "Why do you want to work here?",
                    "right": "I admire your company's mission to..."
                  },
                  {
                    "left": "What is your greatest achievement?",
                    "right": "In my previous role, I successfully..."
                  },
                  {
                    "left": "Where do you see yourself in 5 years?",
                    "right": "I hope to grow into a leadership role..."
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Always research the company before the interview!",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        },
        {
          "id": "en_b1_l2",
          "unit_id": "en_u1_b1",
          "lesson_number": 2,
          "title": "Writing a Professional Email",
          "description": "Formal email structure, openings and closings",
          "xp_reward": 30,
          "type": "writing",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_b1_l2_ex1",
              "lesson_id": "en_b1_l2",
              "type": "listening",
              "prompt": "Listen to the formal email opening and choose its meaning:",
              "target_text": "I am writing to inquire about the project deadline.",
              "target_audio_text": "I am writing to inquire about the project deadline.",
              "phonetic": "/aɪ æm ˈraɪtɪŋ tuː ɪnˈkwaɪər əˈbaʊt ðə ˈprɒdʒɛkt ˈdɛdlaɪn/",
              "vietnamese_meaning": "Tôi viết thư này để hỏi thăm về thời hạn của dự án.",
              "options": [
                "Tôi viết thư này để hỏi thăm về thời hạn của dự án.",
                "Tôi xin thông báo rằng dự án đã hoàn thành.",
                "Vui lòng dời lịch cuộc họp sang thứ Sáu tới.",
                "Tôi muốn nộp đơn xin ứng tuyển vị trí này."
              ],
              "correct_answer": "Tôi viết thư này để hỏi thăm về thời hạn của dự án.",
              "hint": "Inquire = hỏi thăm tìm hiểu, deadline = hạn chót",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_b1_l2_ex2",
              "lesson_id": "en_b1_l2",
              "type": "speaking",
              "prompt": "Press Mic and speak the professional closing sentence:",
              "target_text": "I look forward to hearing from you soon.",
              "target_audio_text": "I look forward to hearing from you soon.",
              "phonetic": "/aɪ lʊk ˈfɔːwəd tuː ˈhɪərɪŋ frɒm juː suːn/",
              "vietnamese_meaning": "Tôi rất mong sớm nhận được phản hồi từ bạn.",
              "options": [],
              "correct_answer": "I look forward to hearing from you soon.",
              "hint": "Look forward to + V-ing = rất mong chờ điều gì",
              "stroke_char": null,
              "order_index": 2
            }
          ]
        }
      ]
    },
    {
      "id": "en_u2_b1",
      "level_id": "en_b1",
      "unit_number": 2,
      "title": "Expressing Opinions & Feelings",
      "description": "Share views, agree and disagree politely, express emotions",
      "icon": "MessageSquare",
      "banner_color": "#7c3aed",
      "levelBadge": "EN_B1",
      "lessons": [
        {
          "id": "en_b1_l3",
          "unit_id": "en_u2_b1",
          "lesson_number": 1,
          "title": "Agreeing & Disagreeing Politely",
          "description": "I think..., I agree..., Actually..., On the other hand...",
          "xp_reward": 30,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_b1_l3_ex1",
              "lesson_id": "en_b1_l3",
              "type": "listening",
              "prompt": "Listen and choose the phrase that politely DISAGREES:",
              "target_text": "I see your point, but I think...",
              "target_audio_text": "I see your point, but I think online learning has its limitations.",
              "phonetic": "/aɪ siː jɔːr pɔɪnt, bʌt aɪ θɪŋk/",
              "vietnamese_meaning": "Tôi hiểu quan điểm của bạn, nhưng tôi cho rằng...",
              "options": [
                "I see your point, but I think...",
                "Absolutely, I agree completely!",
                "You're 100% right!",
                "I couldn't agree more."
              ],
              "correct_answer": "I see your point, but I think...",
              "hint": "\"I see your point, but...\" = bắt đầu phản biện lịch sự",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_b1_l3_ex2",
              "lesson_id": "en_b1_l3",
              "type": "speaking",
              "prompt": "Press Mic: Politely disagree with: \"Social media is always harmful.\"",
              "target_text": "I partly agree, but I think social media also has many benefits like connecting people.",
              "target_audio_text": "I partly agree, but I think social media also has many benefits like connecting people.",
              "phonetic": "/aɪ ˈpɑːrtli əˈɡriː, bʌt aɪ θɪŋk ˈsoʊʃl ˈmiːdiə ˈɔːlsoʊ hæz ˈmeni ˈbenɪfɪts laɪk kəˈnektɪŋ ˈpiːpl/",
              "vietnamese_meaning": "Tôi phần nào đồng ý, nhưng mạng xã hội cũng có nhiều lợi ích như kết nối mọi người.",
              "options": [],
              "correct_answer": "I partly agree, but I think social media also has many benefits like connecting people.",
              "hint": "\"I partly agree\" = tôi phần nào đồng ý, không đồng ý hoàn toàn",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "en_b1_l3_ex3",
              "lesson_id": "en_b1_l3",
              "type": "matching",
              "prompt": "Match disagreement phrases from polite to strong:",
              "target_text": "I see your point but, I'm not sure about that, I completely disagree, Actually I think",
              "target_audio_text": "",
              "phonetic": "Opinion language",
              "vietnamese_meaning": "Đồng ý/Phản đối",
              "options": {
                "pairs": [
                  {
                    "left": "I see your point, but...",
                    "right": "Nhẹ nhàng - tôn trọng quan điểm đối phương"
                  },
                  {
                    "left": "I'm not entirely sure about that.",
                    "right": "Trung lập - bày tỏ nghi ngờ"
                  },
                  {
                    "left": "Actually, I think the opposite is true.",
                    "right": "Vừa phải - đưa ra quan điểm trái chiều"
                  },
                  {
                    "left": "I completely disagree with that.",
                    "right": "Mạnh - phủ nhận hoàn toàn"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "In academic English, polite disagreement shows critical thinking",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        }
      ]
    },
    {
      "id": "en_u3_b1",
      "level_id": "en_b1",
      "unit_number": 3,
      "title": "Reading & Understanding Text",
      "description": "Read articles, understand main ideas and infer meaning",
      "icon": "BookOpen",
      "banner_color": "#6d28d9",
      "levelBadge": "EN_B1",
      "lessons": [
        {
          "id": "en_b1_l4",
          "unit_id": "en_u3_b1",
          "lesson_number": 1,
          "title": "Reading: Main Idea & Key Details",
          "description": "Skim and scan techniques for news articles",
          "xp_reward": 35,
          "type": "reading",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_b1_l4_ex1",
              "lesson_id": "en_b1_l4",
              "type": "listening",
              "prompt": "Listen to the topic sentence and identify the main argument:",
              "target_text": "Regular exercise not only boosts physical health but also improves mental clarity.",
              "target_audio_text": "Regular exercise not only boosts physical health but also improves mental clarity.",
              "phonetic": "/ˈrɛɡjʊlər ˈɛksəsaɪz nɒt ˈəʊnli buːsts ˈfɪzɪkəl hɛlθ bʌt ˈɔːlsəʊ ɪmˈpruːvz ˈmɛntəl ˈklærɪti/",
              "vietnamese_meaning": "Tập thể dục đều đặn không chỉ nâng cao thể chất mà còn cải thiện sự minh mẫn tinh thần.",
              "options": [
                "Tập thể dục đều đặn đem lại lợi ích kép cho cả thể chất lẫn tinh thần.",
                "Chế độ ăn uống quan trọng hơn việc tập luyện thể thao hàng ngày.",
                "Sức khỏe tinh thần chỉ bị ảnh hưởng bởi áp lực công việc.",
                "Người trưởng thành nên chạy bộ ít nhất 30 phút mỗi tuần."
              ],
              "correct_answer": "Tập thể dục đều đặn đem lại lợi ích kép cho cả thể chất lẫn tinh thần.",
              "hint": "Not only... but also... = không những... mà còn...",
              "stroke_char": null,
              "order_index": 1
            }
          ]
        }
      ]
    }
  ],
  "en_b2": [
    {
      "id": "en_u1_b2",
      "level_id": "en_b2",
      "unit_number": 1,
      "title": "Academic Writing & Research",
      "description": "Essays, reports, citations and academic language",
      "icon": "PenTool",
      "banner_color": "#f59e0b",
      "levelBadge": "EN_B2",
      "lessons": [
        {
          "id": "en_b2_l1",
          "unit_id": "en_u1_b2",
          "lesson_number": 1,
          "title": "Academic Essay Structure & Cohesion",
          "description": "Introduction, body paragraphs, conclusion and linking words",
          "xp_reward": 40,
          "type": "writing",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_b2_l1_ex1",
              "lesson_id": "en_b2_l1",
              "type": "listening",
              "prompt": "Listen and identify the function of this sentence: \"Furthermore, studies have shown that...\"",
              "target_text": "Adding information/evidence",
              "target_audio_text": "Furthermore, studies have shown that exercise improves mental health significantly.",
              "phonetic": "/ˈfɜːðəmɔːr ˈstʌdiz hæv ʃoʊn ðæt/",
              "vietnamese_meaning": "Hơn nữa, các nghiên cứu đã chỉ ra rằng...",
              "options": [
                "Bổ sung thông tin, dẫn chứng (Adding information)",
                "Đưa ra kết luận (Concluding)",
                "Phản bác luận điểm (Contrasting)",
                "Giới thiệu chủ đề (Introducing)"
              ],
              "correct_answer": "Bổ sung thông tin, dẫn chứng (Adding information)",
              "hint": "\"Furthermore/Moreover/In addition\" = thêm thông tin/bằng chứng",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_b2_l1_ex2",
              "lesson_id": "en_b2_l1",
              "type": "matching",
              "prompt": "Match linking words with their function:",
              "target_text": "However, Therefore, In addition, For example",
              "target_audio_text": "",
              "phonetic": "Linking words",
              "vietnamese_meaning": "Từ nối học thuật",
              "options": {
                "pairs": [
                  {
                    "left": "However / Nevertheless",
                    "right": "Contrast (tương phản, mặc dù)"
                  },
                  {
                    "left": "Therefore / Consequently",
                    "right": "Result/Conclusion (kết quả, vì vậy)"
                  },
                  {
                    "left": "In addition / Furthermore",
                    "right": "Adding info (bổ sung thêm)"
                  },
                  {
                    "left": "For example / For instance",
                    "right": "Giving examples (ví dụ)"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Memorize 2-3 linking words for each function to vary your writing",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "en_b2_l1_ex3",
              "lesson_id": "en_b2_l1",
              "type": "speaking",
              "prompt": "Press Mic: State your thesis on climate change in one clear sentence:",
              "target_text": "Climate change is the most pressing issue of our time and requires immediate global action.",
              "target_audio_text": "Climate change is the most pressing issue of our time and requires immediate global action.",
              "phonetic": "/ˈklaɪmɪt tʃeɪndʒ ɪz ðə moʊst ˈpresɪŋ ˈɪʃuː əv aʊər taɪm ænd rɪˈkwaɪərz ɪˈmiːdiɪt ˈɡloʊbəl ˈækʃn/",
              "vietnamese_meaning": "Biến đổi khí hậu là vấn đề cấp bách nhất thời đại và đòi hỏi hành động toàn cầu ngay lập tức.",
              "options": [],
              "correct_answer": "Climate change is the most pressing issue of our time and requires immediate global action.",
              "hint": "A thesis statement: Topic + Claim + Reason. Be specific and arguable.",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        }
      ]
    },
    {
      "id": "en_u2_b2",
      "level_id": "en_b2",
      "unit_number": 2,
      "title": "Advanced Grammar & Complex Sentences",
      "description": "Conditionals, passive voice, subjunctive and inversion",
      "icon": "Layers",
      "banner_color": "#d97706",
      "levelBadge": "EN_B2",
      "lessons": [
        {
          "id": "en_b2_l2",
          "unit_id": "en_u2_b2",
          "lesson_number": 1,
          "title": "Conditional Sentences: Type 2 & 3",
          "description": "Hypothetical situations and past regrets",
          "xp_reward": 40,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_b2_l2_ex1",
              "lesson_id": "en_b2_l2",
              "type": "listening",
              "prompt": "Listen and identify the type of conditional:",
              "target_text": "Type 2 Conditional",
              "target_audio_text": "If I had more time, I would learn to play the piano.",
              "phonetic": "/ɪf aɪ hæd mɔːr taɪm, aɪ wʊd lɜːrn tuː pleɪ ðə piˈænoʊ/",
              "vietnamese_meaning": "Nếu tôi có nhiều thời gian hơn, tôi sẽ học đàn piano.",
              "options": [
                "Type 2 Conditional (giả định ở hiện tại)",
                "Type 1 Conditional (khả năng có thể xảy ra)",
                "Type 3 Conditional (giả định quá khứ)",
                "Zero Conditional (sự thật chung)"
              ],
              "correct_answer": "Type 2 Conditional (giả định ở hiện tại)",
              "hint": "Type 2: If + past simple, would + verb. Giả định không có thật ở hiện tại.",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_b2_l2_ex2",
              "lesson_id": "en_b2_l2",
              "type": "speaking",
              "prompt": "Press Mic: Use Type 3 Conditional to express a past regret:",
              "target_text": "If I had studied harder, I would have passed the exam.",
              "target_audio_text": "If I had studied harder, I would have passed the exam.",
              "phonetic": "/ɪf aɪ hæd ˈstʌdid ˈhɑːrdər, aɪ wʊd hæv pæst ðə ɪɡˈzæm/",
              "vietnamese_meaning": "Nếu tôi học chăm hơn, tôi đã thi đậu rồi.",
              "options": [],
              "correct_answer": "If I had studied harder, I would have passed the exam.",
              "hint": "Type 3: If + past perfect, would have + past participle. Diễn đạt hối tiếc về quá khứ.",
              "stroke_char": null,
              "order_index": 2
            },
            {
              "id": "en_b2_l2_ex3",
              "lesson_id": "en_b2_l2",
              "type": "matching",
              "prompt": "Match conditional types with their meaning:",
              "target_text": "Type 0, Type 1, Type 2, Type 3",
              "target_audio_text": "",
              "phonetic": "Conditionals",
              "vietnamese_meaning": "Câu điều kiện",
              "options": {
                "pairs": [
                  {
                    "left": "If you heat water to 100°C, it boils.",
                    "right": "Type 0 - Sự thật khoa học"
                  },
                  {
                    "left": "If it rains, I will take an umbrella.",
                    "right": "Type 1 - Có thể xảy ra ở tương lai"
                  },
                  {
                    "left": "If I won the lottery, I would travel the world.",
                    "right": "Type 2 - Không có thật ở hiện tại"
                  },
                  {
                    "left": "If she had called, I would have answered.",
                    "right": "Type 3 - Không có thật ở quá khứ"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Each conditional uses a different verb tense combination",
              "stroke_char": null,
              "order_index": 3
            }
          ]
        }
      ]
    },
    {
      "id": "en_u3_b2",
      "level_id": "en_b2",
      "unit_number": 3,
      "title": "Debates & Presentations",
      "description": "Structure arguments, use rhetorical devices and respond to challenges",
      "icon": "Mic",
      "banner_color": "#b45309",
      "levelBadge": "EN_B2",
      "lessons": [
        {
          "id": "en_b2_l3",
          "unit_id": "en_u3_b2",
          "lesson_number": 1,
          "title": "Debate Skills: Argument & Counter-Argument",
          "description": "How to structure a persuasive argument in English",
          "xp_reward": 45,
          "type": "speaking",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_b2_l3_ex1",
              "lesson_id": "en_b2_l3",
              "type": "listening",
              "prompt": "Listen and choose the formal transition used to introduce a concession:",
              "target_text": "While the economic benefits are undeniable, environmental costs must not be overlooked.",
              "target_audio_text": "While the economic benefits are undeniable, environmental costs must not be overlooked.",
              "phonetic": "/waɪl ðiː ˌiːkəˈnɒmɪk ˈbɛnɪfɪts ɑːr ˌʌndɪˈnaɪəbəl, ɪnˌvaɪrənˈmɛntəl kɒsts mʌst nɒt biː ˌəʊvəˈlʊkt/",
              "vietnamese_meaning": "Mặc dù lợi ích kinh tế là không thể phủ nhận, nhưng cái giá phải trả về môi trường không được phép xem nhẹ.",
              "options": [
                "Mặc dù lợi ích kinh tế là không thể phủ nhận, nhưng cái giá về môi trường không thể xem nhẹ.",
                "Kinh tế và môi trường luôn phát triển song song hòa hợp.",
                "Lợi ích tài chính là mục tiêu quan trọng nhất của mọi dự án.",
                "Các nhà đầu tư cần ưu tiên lợi nhuận trước mắt."
              ],
              "correct_answer": "Mặc dù lợi ích kinh tế là không thể phủ nhận, nhưng cái giá về môi trường không thể xem nhẹ.",
              "hint": "Undeniable = không thể phủ nhận, overlooked = bị bỏ qua/xem nhẹ",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_b2_l3_ex2",
              "lesson_id": "en_b2_l3",
              "type": "speaking",
              "prompt": "Press Mic and articulate this critical debate statement:",
              "target_text": "On the contrary, empirical evidence strongly suggests the opposite conclusion.",
              "target_audio_text": "On the contrary, empirical evidence strongly suggests the opposite conclusion.",
              "phonetic": "/ɒn ðə ˈkɒntrəri, ɪmˈpɪrɪkəl ˈɛvɪdəns ˈstrɒŋli səˈdʒɛsts ði ˈɒpəzɪt kənˈkluːʒən/",
              "vietnamese_meaning": "Trái lại, bằng chứng thực nghiệm lại chỉ ra kết luận hoàn toàn ngược lại.",
              "options": [],
              "correct_answer": "On the contrary, empirical evidence strongly suggests the opposite conclusion.",
              "hint": "Empirical evidence = bằng chứng thực nghiệm, on the contrary = trái lại",
              "stroke_char": null,
              "order_index": 2
            }
          ]
        }
      ]
    }
  ],
  "en_c1": [
    {
      "id": "en_u1_c1",
      "level_id": "en_c1",
      "unit_number": 1,
      "title": "Academic Vocabulary & Collocation",
      "description": "AWL (Academic Word List), collocations and idiomatic language",
      "icon": "BookOpen",
      "banner_color": "#ef4444",
      "levelBadge": "EN_C1",
      "lessons": [
        {
          "id": "en_c1_l1",
          "unit_id": "en_u1_c1",
          "lesson_number": 1,
          "title": "Academic Word List: Top 50 Words",
          "description": "Essential academic vocabulary with collocations and usage",
          "xp_reward": 50,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_c1_l1_ex1",
              "lesson_id": "en_c1_l1",
              "type": "listening",
              "prompt": "Listen and select the correct collocate: \"conduct a ___\"",
              "target_text": "research",
              "target_audio_text": "The team will conduct a comprehensive research study on climate patterns.",
              "phonetic": "/kənˈdʌkt ə ˈriːsɜːrtʃ ˈstʌdi/",
              "vietnamese_meaning": "Nhóm sẽ tiến hành nghiên cứu toàn diện về mô hình khí hậu.",
              "options": [
                "research (nghiên cứu)",
                "speech (bài phát biểu)",
                "meal (bữa ăn)",
                "friendship (tình bạn)"
              ],
              "correct_answer": "research (nghiên cứu)",
              "hint": "\"Conduct research\" là collocation học thuật phổ biến nhất",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_c1_l1_ex2",
              "lesson_id": "en_c1_l1",
              "type": "matching",
              "prompt": "Match academic verbs with their most common noun collocates:",
              "target_text": "conduct, draw, raise, challenge",
              "target_audio_text": "",
              "phonetic": "Academic collocations",
              "vietnamese_meaning": "Collocation học thuật",
              "options": {
                "pairs": [
                  {
                    "left": "Conduct",
                    "right": "an experiment / research / a study"
                  },
                  {
                    "left": "Draw",
                    "right": "a conclusion / an inference / attention"
                  },
                  {
                    "left": "Raise",
                    "right": "awareness / a concern / a question"
                  },
                  {
                    "left": "Challenge",
                    "right": "an assumption / conventional wisdom / the status quo"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Collocations make your academic writing sound natural and professional",
              "stroke_char": null,
              "order_index": 2
            }
          ]
        }
      ]
    },
    {
      "id": "en_u2_c1",
      "level_id": "en_c1",
      "unit_number": 2,
      "title": "Advanced Listening & Note-Taking",
      "description": "Lectures, podcasts and TED Talks comprehension strategies",
      "icon": "Headphones",
      "banner_color": "#dc2626",
      "levelBadge": "EN_C1",
      "lessons": [
        {
          "id": "en_c1_l2",
          "unit_id": "en_u2_c1",
          "lesson_number": 1,
          "title": "Listening to Complex Arguments",
          "description": "Identify speaker stance, infer meaning and note key points",
          "xp_reward": 55,
          "type": "reading",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_c1_l2_ex1",
              "lesson_id": "en_c1_l2",
              "type": "listening",
              "prompt": "Listen to the academic discourse and evaluate the underlying assumption:",
              "target_text": "Technological acceleration often outpaces the regulatory frameworks designed to govern it.",
              "target_audio_text": "Technological acceleration often outpaces the regulatory frameworks designed to govern it.",
              "phonetic": "/ˌtɛknəˈlɒdʒɪkəl əkˌsɛləˈreɪʃən ˈɒfən aʊtˈpeɪsɪz ðə ˈrɛɡjʊlətəri ˈfreɪmwɜːks dɪˈzaɪnd tuː ˈɡʌvən ɪt/",
              "vietnamese_meaning": "Tốc độ tăng tốc công nghệ thường vượt xa các khung pháp lý quản lý được thiết kế để điều chỉnh nó.",
              "options": [
                "Tốc độ tăng tốc công nghệ thường vượt xa các khung pháp lý quản lý được thiết kế để điều chỉnh nó.",
                "Luật pháp luôn chủ động định hình hướng đi của các phát minh công nghệ.",
                "Công nghệ và pháp lý luôn đồng bộ một cách tự nhiên trong xã hội hiện đại.",
                "Các cơ quan quản lý cần làm chậm lại sự phát triển của công nghệ."
              ],
              "correct_answer": "Tốc độ tăng tốc công nghệ thường vượt xa các khung pháp lý quản lý được thiết kế để điều chỉnh nó.",
              "hint": "Outpace = vượt mặt chạy nhanh hơn, regulatory frameworks = khung pháp lý",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_c1_l2_ex2",
              "lesson_id": "en_c1_l2",
              "type": "speaking",
              "prompt": "Press Mic and speak the academic conclusion with natural intonation:",
              "target_text": "Consequently, proactive interdisciplinary dialogue is paramount to mitigating systemic risks.",
              "target_audio_text": "Consequently, proactive interdisciplinary dialogue is paramount to mitigating systemic risks.",
              "phonetic": "/ˈkɒnsɪkwəntli, prəʊˈæktɪv ˌɪntədɪsɪˈplɪnəri ˈdaɪəlɒɡ ɪz ˈpærəmaʊnt tuː ˈmɪtɪɡeɪtɪŋ sɪsˈtɛmɪk rɪsks/",
              "vietnamese_meaning": "Do đó, đối thoại liên ngành chủ động là điều tối quan trọng để giảm thiểu các rủi ro mang tính hệ thống.",
              "options": [],
              "correct_answer": "Consequently, proactive interdisciplinary dialogue is paramount to mitigating systemic risks.",
              "hint": "Interdisciplinary = liên ngành, paramount = tối thượng, mitigate = giảm thiểu",
              "stroke_char": null,
              "order_index": 2
            }
          ]
        }
      ]
    }
  ],
  "en_c2": [
    {
      "id": "en_u1_c2",
      "level_id": "en_c2",
      "unit_number": 1,
      "title": "Literary Analysis & Critical Reading",
      "description": "Analyze prose, poetry and rhetorical devices in literature",
      "icon": "BookOpen",
      "banner_color": "#dc2626",
      "levelBadge": "EN_C2",
      "lessons": [
        {
          "id": "en_c2_l1",
          "unit_id": "en_u1_c2",
          "lesson_number": 1,
          "title": "Literary Devices: Metaphor, Irony & Imagery",
          "description": "Identify and analyze literary techniques in English texts",
          "xp_reward": 60,
          "type": "reading",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_c2_l1_ex1",
              "lesson_id": "en_c2_l1",
              "type": "reading",
              "prompt": "Read and identify the literary device: \"Life is a rollercoaster.\"",
              "target_text": "Metaphor",
              "target_audio_text": "Life is a rollercoaster - full of ups and downs, thrills and fears.",
              "phonetic": "/ˈmetəfər/",
              "vietnamese_meaning": "Ẩn dụ - Cuộc đời như tàu lượn",
              "options": [
                "Metaphor (ẩn dụ)",
                "Simile (so sánh dùng like/as)",
                "Personification (nhân cách hóa)",
                "Hyperbole (nói quá)"
              ],
              "correct_answer": "Metaphor (ẩn dụ)",
              "hint": "Metaphor: trực tiếp nói A IS B. Simile: A is LIKE B.",
              "stroke_char": null,
              "order_index": 1
            }
          ]
        }
      ]
    },
    {
      "id": "en_u2_c2",
      "level_id": "en_c2",
      "unit_number": 2,
      "title": "Native-Level Idiomatic Language",
      "description": "Idioms, phrasal verbs and cultural references in authentic English",
      "icon": "Sparkles",
      "banner_color": "#b91c1c",
      "levelBadge": "EN_C2",
      "lessons": [
        {
          "id": "en_c2_l2",
          "unit_id": "en_u2_c2",
          "lesson_number": 1,
          "title": "Advanced Idioms & Phrasal Verbs in Context",
          "description": "30 high-frequency native-level expressions with real examples",
          "xp_reward": 60,
          "type": "standard",
          "completed": false,
          "status": "unlocked",
          "exercises": [
            {
              "id": "en_c2_l2_ex1",
              "lesson_id": "en_c2_l2",
              "type": "listening",
              "prompt": "Listen and choose the meaning of \"bite the bullet\":",
              "target_text": "endure a painful situation bravely",
              "target_audio_text": "I had to bite the bullet and tell my boss the bad news.",
              "phonetic": "/baɪt ðə ˈbʊlɪt/",
              "vietnamese_meaning": "Cắn răng chịu đựng, đối mặt với điều khó khăn",
              "options": [
                "Chịu đựng can đảm",
                "Ăn đạn",
                "Nổi giận dữ dội",
                "Nói thẳng không e ngại"
              ],
              "correct_answer": "Chịu đựng can đảm",
              "hint": "Origin: Civil War soldiers bit on bullets to endure surgery pain",
              "stroke_char": null,
              "order_index": 1
            },
            {
              "id": "en_c2_l2_ex2",
              "lesson_id": "en_c2_l2",
              "type": "matching",
              "prompt": "Match advanced idioms with their meanings:",
              "target_text": "bite the bullet, break the ice, cut corners, hit the nail on the head",
              "target_audio_text": "",
              "phonetic": "Advanced idioms",
              "vietnamese_meaning": "Thành ngữ nâng cao",
              "options": {
                "pairs": [
                  {
                    "left": "Bite the bullet",
                    "right": "Cắn răng chịu đựng tình huống khó"
                  },
                  {
                    "left": "Break the ice",
                    "right": "Phá vỡ sự im lặng/rào cản ban đầu"
                  },
                  {
                    "left": "Cut corners",
                    "right": "Làm tắt, bỏ qua bước quan trọng"
                  },
                  {
                    "left": "Hit the nail on the head",
                    "right": "Nói/làm chính xác điểm mấu chốt"
                  }
                ]
              },
              "correct_answer": "MATCH_PAIRS",
              "hint": "Idioms cannot be understood word by word - learn them in context",
              "stroke_char": null,
              "order_index": 2
            }
          ]
        }
      ]
    }
  ]
};

export const CURRICULUM_LESSONS_BY_ID = {
  "zh_l_p1": {
    "id": "zh_l_p1",
    "unit_id": "zh_u1_pinyin",
    "lesson_number": 1,
    "title": "Âm Môi & Âm Đầu Lưỡi (b, p, m, f)",
    "description": "Luyện nghe và phát âm chuẩn các thanh mẫu căn bản",
    "xp_reward": 15,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_p1_ex1",
        "lesson_id": "zh_l_p1",
        "type": "listening",
        "prompt": "Nghe và chọn thanh mẫu (âm đầu) phát âm đúng:",
        "target_text": "b",
        "target_audio_text": "bō",
        "phonetic": "bō",
        "vietnamese_meaning": "Thanh mẫu b (bō - âm hai môi không bật hơi)",
        "options": [
          "b (bō)",
          "p (pō)",
          "m (mō)",
          "f (fō)"
        ],
        "correct_answer": "b (bō)",
        "hint": "Khép hai môi rồi mở ra, luồng hơi thoát ra nhẹ nhàng",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_p1_ex2",
        "lesson_id": "zh_l_p1",
        "type": "speaking",
        "prompt": "Nhấn Micro và phát âm to rõ thanh mẫu bō:",
        "target_text": "b",
        "target_audio_text": "bō",
        "phonetic": "bō",
        "vietnamese_meaning": "Thanh mẫu b (bō)",
        "options": [],
        "correct_answer": "b",
        "hint": "Khép môi rồi bật nhẹ luồng hơi không rung cổ họng: bō",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_p1_ex3",
        "lesson_id": "zh_l_p1",
        "type": "matching",
        "prompt": "Ghép thanh mẫu Pinyin với đặc điểm phát âm:",
        "target_text": "b, p, m, f",
        "target_audio_text": "b p m f",
        "phonetic": "b, p, m, f",
        "vietnamese_meaning": "4 Thanh mẫu âm môi",
        "options": {
          "pairs": [
            {
              "left": "Thanh mẫu b",
              "right": "Âm hai môi KHÔNG bật hơi (bō)"
            },
            {
              "left": "Thanh mẫu p",
              "right": "Âm hai môi BẬT HƠI mạnh (pō)"
            },
            {
              "left": "Thanh mẫu m",
              "right": "Âm mũi hai môi (mō)"
            },
            {
              "left": "Thanh mẫu f",
              "right": "Âm răng môi trên dưới (fō)"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Phân biệt giữa b và p bằng luồng hơi trước miệng",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_p1_ex4",
        "lesson_id": "zh_l_p1",
        "type": "listening",
        "prompt": "Nghe và chọn thanh mẫu BẬT HƠI mạnh luồng gió:",
        "target_text": "p",
        "target_audio_text": "pō",
        "phonetic": "pō",
        "vietnamese_meaning": "Thanh mẫu p (pō - bật hơi mạnh)",
        "options": [
          "p (pō)",
          "b (bō)",
          "m (mō)",
          "d (dē)"
        ],
        "correct_answer": "p (pō)",
        "hint": "Đặt tờ giấy trước miệng, phát âm p tờ giấy sẽ rung mạnh",
        "stroke_char": null,
        "order_index": 4
      }
    ]
  },
  "zh_l_p4": {
    "id": "zh_l_p4",
    "unit_id": "zh_u2_pinyin",
    "lesson_number": 1,
    "title": "4 Thanh Điệu (Mā, Má, Mǎ, Mà)",
    "description": "Nhận diện thanh ngang, thanh sắc, thanh hỏi và thanh huyền gãy",
    "xp_reward": 15,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_p4_ex1",
        "lesson_id": "zh_l_p4",
        "type": "listening",
        "prompt": "Nghe và chọn từ mang Thanh 1 (Thanh ngang đều cao độ 5-5):",
        "target_text": "mā",
        "target_audio_text": "mā",
        "phonetic": "mā",
        "vietnamese_meaning": "Thanh 1: Ngang đều, ngân vang",
        "options": [
          "mā (Thanh 1)",
          "má (Thanh 2)",
          "mǎ (Thanh 3)",
          "mà (Thanh 4)"
        ],
        "correct_answer": "mā (Thanh 1)",
        "hint": "Ký hiệu là một nét ngang trên đầu nguyên âm",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_p4_ex2",
        "lesson_id": "zh_l_p4",
        "type": "listening",
        "prompt": "Nghe và chọn từ mang Thanh 4 (Thanh rơi dứt khoát 5-1):",
        "target_text": "mà",
        "target_audio_text": "mà",
        "phonetic": "mà",
        "vietnamese_meaning": "Thanh 4: Đi từ cao xuống thấp dứt khoát",
        "options": [
          "mà (Thanh 4)",
          "mā (Thanh 1)",
          "má (Thanh 2)",
          "mǎ (Thanh 3)"
        ],
        "correct_answer": "mà (Thanh 4)",
        "hint": "Phát âm dứt khoát và mạnh mẽ như một mệnh lệnh",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_p4_ex3",
        "lesson_id": "zh_l_p4",
        "type": "speaking",
        "prompt": "Nhấn Micro và phát âm Thanh 1: mā:",
        "target_text": "mā",
        "target_audio_text": "mā",
        "phonetic": "mā",
        "vietnamese_meaning": "mā (Thanh 1: Mẹ)",
        "options": [],
        "correct_answer": "mā",
        "hint": "Giữ giọng cao đều 5-5 không hạ xuống",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_p4_ex4",
        "lesson_id": "zh_l_p4",
        "type": "matching",
        "prompt": "Ghép ký hiệu 4 thanh điệu với quy luật biến chuyển cao độ:",
        "target_text": "4 thanh điệu Pinyin",
        "target_audio_text": "mā má mǎ mà",
        "phonetic": "ˉ, ˊ, ˇ, ˋ",
        "vietnamese_meaning": "Quy luật cao độ 4 thanh",
        "options": {
          "pairs": [
            {
              "left": "Thanh 1 (mā ˉ)",
              "right": "Cao đều phẳng 5-5"
            },
            {
              "left": "Thanh 2 (má ˊ)",
              "right": "Đi vút lên từ 3-5"
            },
            {
              "left": "Thanh 3 (mǎ ˇ)",
              "right": "Uốn lượn xuống rồi lên 2-1-4"
            },
            {
              "left": "Thanh 4 (mà ˋ)",
              "right": "Rơi dứt khoát từ 5-1"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Hãy quan sát hình dạng dấu thanh điệu",
        "stroke_char": null,
        "order_index": 4
      }
    ]
  },
  "zh_l_h1": {
    "id": "zh_l_h1",
    "unit_id": "zh_u1_hsk1",
    "lesson_number": 1,
    "title": "Lời Chào Đầu Tiên: 你好 (Nǐ hǎo)",
    "description": "Học cách chào hỏi mọi người và nói lời tạm biệt",
    "xp_reward": 15,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_ex_1",
        "lesson_id": "zh_l_h1",
        "type": "listening",
        "prompt": "Nghe và chọn nghĩa tiếng Việt chính xác:",
        "target_text": "你好",
        "target_audio_text": "你好",
        "phonetic": "nǐ hǎo",
        "vietnamese_meaning": "Xin chào",
        "options": [
          "Xin chào",
          "Tạm biệt",
          "Cảm ơn",
          "Không có chi"
        ],
        "correct_answer": "Xin chào",
        "hint": "Chào hỏi cơ bản khi gặp mặt",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_ex_2",
        "lesson_id": "zh_l_h1",
        "type": "speaking",
        "prompt": "Nhấn Micro và phát âm to rõ câu sau:",
        "target_text": "你好",
        "target_audio_text": "你好",
        "phonetic": "nǐ hǎo",
        "vietnamese_meaning": "Xin chào",
        "options": [],
        "correct_answer": "你好",
        "hint": "Đọc với âm điệu: nǐ hǎo (biến điệu thanh 3 thành thanh 2: ní hǎo)",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_ex_3",
        "lesson_id": "zh_l_h1",
        "type": "writing",
        "prompt": "Tập viết chữ Hán theo thứ tự nét chuẩn:",
        "target_text": "你",
        "target_audio_text": "你",
        "phonetic": "nǐ",
        "vietnamese_meaning": "Bạn, anh, chị (đại từ ngôi thứ 2)",
        "options": [],
        "correct_answer": "你",
        "hint": "Gồm bộ Nhân đứng (亻) bên trái và chữ Nhĩ (尔) bên phải",
        "stroke_char": "你",
        "order_index": 3
      },
      {
        "id": "zh_ex_4",
        "lesson_id": "zh_l_h1",
        "type": "matching",
        "prompt": "Ghép các cặp từ tương ứng:",
        "target_text": "Ghép từ vựng chào hỏi",
        "target_audio_text": "你好, 再见, 谢谢",
        "phonetic": "nǐ hǎo, zài jiàn, xiè xie",
        "vietnamese_meaning": "Các câu chào hỏi",
        "options": {
          "pairs": [
            {
              "left": "你好 (nǐ hǎo)",
              "right": "Xin chào"
            },
            {
              "left": "再见 (zài jiàn)",
              "right": "Tạm biệt"
            },
            {
              "left": "谢谢 (xiè xie)",
              "right": "Cảm ơn"
            },
            {
              "left": "早上好 (zǎoshang hǎo)",
              "right": "Chào buổi sáng"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Hãy ghép chính xác các cặp từ",
        "stroke_char": null,
        "order_index": 4
      },
      {
        "id": "zh_ex_5",
        "lesson_id": "zh_l_h1",
        "type": "dictation",
        "prompt": "Sắp xếp các thẻ từ thành câu hoàn chỉnh:",
        "target_text": "你好，很高兴认识你",
        "target_audio_text": "你好，很高兴认识你",
        "phonetic": "nǐ hǎo, hěn gāoxìng rènshí nǐ",
        "vietnamese_meaning": "Chào bạn, rất vui được gặp bạn",
        "options": [
          "认识",
          "你好",
          "很高兴",
          "你",
          "再见"
        ],
        "correct_answer": "你好 很高兴 认识 你",
        "hint": "Bắt đầu bằng lời chào 你好",
        "stroke_char": null,
        "order_index": 5
      }
    ]
  },
  "zh_l_h4": {
    "id": "zh_l_h4",
    "unit_id": "zh_u2_hsk1",
    "lesson_number": 1,
    "title": "Số Đếm 1 - 10: 一, 二, 三...",
    "description": "Cách đếm và các chữ Hán số đếm quen thuộc",
    "xp_reward": 15,
    "type": "writing",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h4_ex1",
        "lesson_id": "zh_l_h4",
        "type": "writing",
        "prompt": "Tập viết chữ \"Nhị\" (Số hai) - Hai nét ngang:",
        "target_text": "二",
        "target_audio_text": "二",
        "phonetic": "èr",
        "vietnamese_meaning": "Số 2",
        "options": [],
        "correct_answer": "二",
        "hint": "Nét ngang trên ngắn hơn nét ngang dưới",
        "stroke_char": "二",
        "order_index": 1
      },
      {
        "id": "zh_h4_ex2",
        "lesson_id": "zh_l_h4",
        "type": "writing",
        "prompt": "Tập viết chữ \"Tam\" (Số ba) - Ba nét ngang:",
        "target_text": "三",
        "target_audio_text": "三",
        "phonetic": "sān",
        "vietnamese_meaning": "Số 3",
        "options": [],
        "correct_answer": "三",
        "hint": "Ba nét ngang song song cách đều nhau",
        "stroke_char": "三",
        "order_index": 2
      },
      {
        "id": "zh_h4_ex3",
        "lesson_id": "zh_l_h4",
        "type": "matching",
        "prompt": "Ghép số Hán với phiên âm Pinyin:",
        "target_text": "一, 二, 三, 十",
        "target_audio_text": "yī èr sān shí",
        "phonetic": "Số đếm HSK1",
        "vietnamese_meaning": "Số đếm",
        "options": {
          "pairs": [
            {
              "left": "一 (yī)",
              "right": "Số 1"
            },
            {
              "left": "二 (èr)",
              "right": "Số 2"
            },
            {
              "left": "三 (sān)",
              "right": "Số 3"
            },
            {
              "left": "十 (shí)",
              "right": "Số 10"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Số đếm cơ bản",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "en_l_ipa1": {
    "id": "en_l_ipa1",
    "unit_id": "en_u1_ipa",
    "lesson_number": 1,
    "title": "Cặp Âm /iː/ (sheep) vs /ɪ/ (ship)",
    "description": "Phân biệt khẩu hình cười dài và thả lỏng ngắn",
    "xp_reward": 15,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_ipa1_ex1",
        "lesson_id": "en_l_ipa1",
        "type": "listening",
        "prompt": "Listen and choose the word with the LONG /iː/ sound:",
        "target_text": "sheep",
        "target_audio_text": "sheep",
        "phonetic": "/ʃiːp/",
        "vietnamese_meaning": "Con cừu (âm /iː/ dài)",
        "options": [
          "sheep (/ʃiːp/)",
          "ship (/ʃɪp/)",
          "shop (/ʃɒp/)",
          "shape (/ʃeɪp/)"
        ],
        "correct_answer": "sheep (/ʃiːp/)",
        "hint": "Kéo dài miệng sang hai bên như đang cười mỉm",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_ipa1_ex2",
        "lesson_id": "en_l_ipa1",
        "type": "speaking",
        "prompt": "Press Mic and pronounce clearly: sheep:",
        "target_text": "sheep",
        "target_audio_text": "sheep",
        "phonetic": "/ʃiːp/",
        "vietnamese_meaning": "Con cừu",
        "options": [],
        "correct_answer": "sheep",
        "hint": "Hold the /iː/ sound for at least 1 second",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "en_ipa1_ex3",
        "lesson_id": "en_l_ipa1",
        "type": "matching",
        "prompt": "Match English words with their correct IPA vowel sounds:",
        "target_text": "sheep, ship, eat, it",
        "target_audio_text": "sheep ship eat it",
        "phonetic": "/iː/ vs /ɪ/",
        "vietnamese_meaning": "Long vs Short i",
        "options": {
          "pairs": [
            {
              "left": "sheep",
              "right": "/ʃiːp/ (Nguyên âm dài /iː/)"
            },
            {
              "left": "ship",
              "right": "/ʃɪp/ (Nguyên âm ngắn /ɪ/)"
            },
            {
              "left": "eat",
              "right": "/iːt/ (Nguyên âm dài /iː/)"
            },
            {
              "left": "it",
              "right": "/ɪt/ (Nguyên âm ngắn /ɪ/)"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Phân biệt nguyên âm dài và ngắn",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "en_l_a1_1": {
    "id": "en_l_a1_1",
    "unit_id": "en_u1_a1",
    "lesson_number": 1,
    "title": "Hello & Nice to Meet You",
    "description": "Say hello, introduce your name and make friends",
    "xp_reward": 15,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_ex_1",
        "lesson_id": "en_l_a1_1",
        "type": "listening",
        "prompt": "Listen and choose the correct meaning:",
        "target_text": "Nice to meet you!",
        "target_audio_text": "Nice to meet you!",
        "phonetic": "/naɪs tuː miːt juː/",
        "vietnamese_meaning": "Rất vui được gặp bạn!",
        "options": [
          "Rất vui được gặp bạn!",
          "Hẹn gặp lại bạn ngày mai!",
          "Cảm ơn bạn rất nhiều!",
          "Bạn tên là gì?"
        ],
        "correct_answer": "Rất vui được gặp bạn!",
        "hint": "Lịch sự khi gặp ai lần đầu",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_ex_2",
        "lesson_id": "en_l_a1_1",
        "type": "speaking",
        "prompt": "Press Mic and pronounce this sentence clearly:",
        "target_text": "Nice to meet you!",
        "target_audio_text": "Nice to meet you!",
        "phonetic": "/naɪs tuː miːt juː/",
        "vietnamese_meaning": "Rất vui được gặp bạn!",
        "options": [],
        "correct_answer": "Nice to meet you!",
        "hint": "Focus on the final sound /s/ in \"Nice\" and /t/ in \"meet\"",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "en_ex_3",
        "lesson_id": "en_l_a1_1",
        "type": "translation",
        "prompt": "Dịch câu sau sang tiếng Anh:",
        "target_text": "Tôi là một học sinh.",
        "target_audio_text": "I am a student.",
        "phonetic": "/aɪ æm ə ˈstjuː.dənt/",
        "vietnamese_meaning": "Tôi là một học sinh.",
        "options": [
          "a",
          "student",
          "I",
          "teacher",
          "am",
          "is"
        ],
        "correct_answer": "I am a student",
        "hint": "Chủ ngữ I đi với động từ to be am",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "en_ex_4",
        "lesson_id": "en_l_a1_1",
        "type": "matching",
        "prompt": "Match the English words with their Vietnamese translations:",
        "target_text": "Match greetings",
        "target_audio_text": "Hello, Goodbye, Thank you, Please",
        "phonetic": "Greetings",
        "vietnamese_meaning": "Lời chào hỏi",
        "options": {
          "pairs": [
            {
              "left": "Hello",
              "right": "Xin chào"
            },
            {
              "left": "Goodbye",
              "right": "Tạm biệt"
            },
            {
              "left": "Thank you",
              "right": "Cảm ơn bạn"
            },
            {
              "left": "Please",
              "right": "Làm ơn / Xin vui lòng"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Pair each word",
        "stroke_char": null,
        "order_index": 4
      }
    ]
  },
  "zh_h2_l1": {
    "id": "zh_h2_l1",
    "unit_id": "zh_u1_hsk2",
    "lesson_number": 1,
    "title": "Gia Đình: 家人 (jiārén)",
    "description": "Từ vựng về các thành viên trong gia đình và cách giới thiệu",
    "xp_reward": 20,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h2_l1_ex1",
        "lesson_id": "zh_h2_l1",
        "type": "listening",
        "prompt": "Nghe và chọn nghĩa đúng của từ 妈妈 (māma):",
        "target_text": "妈妈",
        "target_audio_text": "妈妈",
        "phonetic": "māma",
        "vietnamese_meaning": "Mẹ, má",
        "options": [
          "Mẹ, má",
          "Bố, ba",
          "Anh trai",
          "Em gái"
        ],
        "correct_answer": "Mẹ, má",
        "hint": "妈妈 = māma, chữ Hán bộ Nữ (女) nghĩa mẹ",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h2_l1_ex2",
        "lesson_id": "zh_h2_l1",
        "type": "listening",
        "prompt": "Nghe và chọn từ có nghĩa \"Con trai\":",
        "target_text": "儿子",
        "target_audio_text": "儿子",
        "phonetic": "érzi",
        "vietnamese_meaning": "Con trai",
        "options": [
          "儿子 (érzi)",
          "女儿 (nǚ'ér)",
          "哥哥 (gēge)",
          "姐姐 (jiějie)"
        ],
        "correct_answer": "儿子 (érzi)",
        "hint": "儿 = con, 子 = con nhỏ",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h2_l1_ex3",
        "lesson_id": "zh_h2_l1",
        "type": "speaking",
        "prompt": "Nhấn Micro và nói câu giới thiệu gia đình:",
        "target_text": "我家有四口人",
        "target_audio_text": "我家有四口人",
        "phonetic": "wǒ jiā yǒu sì kǒu rén",
        "vietnamese_meaning": "Gia đình tôi có 4 người",
        "options": [],
        "correct_answer": "我家有四口人",
        "hint": "口 (kǒu) là từ đơn vị đếm thành viên gia đình",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h2_l1_ex4",
        "lesson_id": "zh_h2_l1",
        "type": "matching",
        "prompt": "Ghép từ thành viên gia đình với tiếng Việt:",
        "target_text": "爸爸,妈妈,哥哥,妹妹",
        "target_audio_text": "bàba māma gēge mèimei",
        "phonetic": "Gia đình",
        "vietnamese_meaning": "Thành viên gia đình",
        "options": {
          "pairs": [
            {
              "left": "爸爸 (bàba)",
              "right": "Bố, ba"
            },
            {
              "left": "妈妈 (māma)",
              "right": "Mẹ, má"
            },
            {
              "left": "哥哥 (gēge)",
              "right": "Anh trai"
            },
            {
              "left": "妹妹 (mèimei)",
              "right": "Em gái"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Phân biệt哥哥 (anh) và弟弟 (em)",
        "stroke_char": null,
        "order_index": 4
      },
      {
        "id": "zh_h2_l1_ex5",
        "lesson_id": "zh_h2_l1",
        "type": "translation",
        "prompt": "Dịch sang tiếng Trung: \"Anh ấy là anh trai tôi\":",
        "target_text": "他是我哥哥",
        "target_audio_text": "他是我哥哥",
        "phonetic": "tā shì wǒ gēge",
        "vietnamese_meaning": "Anh ấy là anh trai tôi",
        "options": [
          "他",
          "是",
          "我",
          "哥哥",
          "姐姐",
          "弟弟"
        ],
        "correct_answer": "他 是 我 哥哥",
        "hint": "他 = anh ấy/ông ấy, 是 = là",
        "stroke_char": null,
        "order_index": 5
      }
    ]
  },
  "zh_h2_l4": {
    "id": "zh_h2_l4",
    "unit_id": "zh_u2_hsk2",
    "lesson_number": 1,
    "title": "Hỏi Giờ: 现在几点？(Mấy giờ rồi?)",
    "description": "Đọc đồng hồ và nói giờ bằng tiếng Trung",
    "xp_reward": 20,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h2_l4_ex1",
        "lesson_id": "zh_h2_l4",
        "type": "listening",
        "prompt": "Nghe và chọn đáp án đúng: 现在几点？(Mấy giờ rồi?)",
        "target_text": "现在两点半",
        "target_audio_text": "现在两点半",
        "phonetic": "xiànzài liǎng diǎn bàn",
        "vietnamese_meaning": "Bây giờ là 2 giờ 30 phút",
        "options": [
          "Bây giờ là 2 giờ 30 phút",
          "Bây giờ là 3 giờ",
          "Bây giờ là 12 giờ",
          "Bây giờ là 6 giờ 15 phút"
        ],
        "correct_answer": "Bây giờ là 2 giờ 30 phút",
        "hint": "两点半 = 2 giờ rưỡi (半 = nửa = 30 phút)",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h2_l4_ex2",
        "lesson_id": "zh_h2_l4",
        "type": "speaking",
        "prompt": "Nhìn đồng hồ (9:15) và nói bằng tiếng Trung:",
        "target_text": "九点十五分",
        "target_audio_text": "九点十五分",
        "phonetic": "jiǔ diǎn shíwǔ fēn",
        "vietnamese_meaning": "9 giờ 15 phút",
        "options": [],
        "correct_answer": "九点十五分",
        "hint": "Cấu trúc: [Số giờ] 点 [Số phút] 分",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h2_l4_ex3",
        "lesson_id": "zh_h2_l4",
        "type": "matching",
        "prompt": "Ghép giờ tiếng Trung với giờ tương ứng:",
        "target_text": "三点,六点半,十二点,八点十分",
        "target_audio_text": "sān diǎn liù diǎn bàn",
        "phonetic": "Giờ giấc",
        "vietnamese_meaning": "Hỏi giờ",
        "options": {
          "pairs": [
            {
              "left": "三点 (sān diǎn)",
              "right": "3:00"
            },
            {
              "left": "六点半 (liù diǎn bàn)",
              "right": "6:30"
            },
            {
              "left": "十二点 (shí'èr diǎn)",
              "right": "12:00"
            },
            {
              "left": "八点十分 (bā diǎn shí fēn)",
              "right": "8:10"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "半 = rưỡi = 30 phút, 刻 = 15 phút",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "zh_h2_l6": {
    "id": "zh_h2_l6",
    "unit_id": "zh_u3_hsk2",
    "lesson_number": 1,
    "title": "Hỏi Đường: 请问，去...怎么走？",
    "description": "Hỏi và chỉ đường đến các địa điểm",
    "xp_reward": 25,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h2_l6_ex1",
        "lesson_id": "zh_h2_l6",
        "type": "listening",
        "prompt": "Nghe và chọn nghĩa câu: 请问，银行在哪里？",
        "target_text": "银行在哪里",
        "target_audio_text": "请问，银行在哪里？",
        "phonetic": "qǐngwèn, yínháng zài nǎlǐ?",
        "vietnamese_meaning": "Xin hỏi, ngân hàng ở đâu?",
        "options": [
          "Xin hỏi, ngân hàng ở đâu?",
          "Xin hỏi, bưu điện ở đâu?",
          "Siêu thị cách đây bao xa?",
          "Khách sạn ở phố này không?"
        ],
        "correct_answer": "Xin hỏi, ngân hàng ở đâu?",
        "hint": "银行 = ngân hàng, 哪里 = ở đâu",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h2_l6_ex2",
        "lesson_id": "zh_h2_l6",
        "type": "speaking",
        "prompt": "Hỏi đường đến bệnh viện bằng tiếng Trung:",
        "target_text": "请问，医院怎么走？",
        "target_audio_text": "请问，医院怎么走？",
        "phonetic": "qǐngwèn, yīyuàn zěnme zǒu?",
        "vietnamese_meaning": "Xin hỏi, đường đến bệnh viện đi thế nào?",
        "options": [],
        "correct_answer": "请问，医院怎么走？",
        "hint": "怎么走 = đi thế nào (hỏi đường)",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h2_l6_ex3",
        "lesson_id": "zh_h2_l6",
        "type": "matching",
        "prompt": "Ghép chỉ đường với nghĩa tiếng Việt:",
        "target_text": "左转,右转,直走,对面",
        "target_audio_text": "zuǒ zhuǎn yòu zhuǎn zhí zǒu duìmiàn",
        "phonetic": "Chỉ đường",
        "vietnamese_meaning": "Hỏi đường",
        "options": {
          "pairs": [
            {
              "left": "左转 (zuǒ zhuǎn)",
              "right": "Rẽ trái"
            },
            {
              "left": "右转 (yòu zhuǎn)",
              "right": "Rẽ phải"
            },
            {
              "left": "直走 (zhí zǒu)",
              "right": "Đi thẳng"
            },
            {
              "left": "对面 (duìmiàn)",
              "right": "Đối diện, phía trước"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "左 = trái, 右 = phải - nhớ bằng cách nhìn hình chữ",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "zh_h3_l1": {
    "id": "zh_h3_l1",
    "unit_id": "zh_u1_hsk3",
    "lesson_number": 1,
    "title": "Cảm Xúc: 高兴，难过，害怕",
    "description": "Học cách diễn đạt trạng thái cảm xúc cơ bản",
    "xp_reward": 25,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h3_l1_ex1",
        "lesson_id": "zh_h3_l1",
        "type": "listening",
        "prompt": "Nghe và chọn nghĩa đúng: 我很高兴 (wǒ hěn gāoxìng):",
        "target_text": "我很高兴",
        "target_audio_text": "我很高兴",
        "phonetic": "wǒ hěn gāoxìng",
        "vietnamese_meaning": "Tôi rất vui",
        "options": [
          "Tôi rất vui",
          "Tôi rất buồn",
          "Tôi rất lo lắng",
          "Tôi rất mệt"
        ],
        "correct_answer": "Tôi rất vui",
        "hint": "高兴 = gāoxìng = vui mừng, hạnh phúc",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h3_l1_ex2",
        "lesson_id": "zh_h3_l1",
        "type": "speaking",
        "prompt": "Nhấn Micro và diễn đạt cảm xúc: \"Tôi rất buồn hôm nay\":",
        "target_text": "我今天很难过",
        "target_audio_text": "我今天很难过",
        "phonetic": "wǒ jīntiān hěn nánguò",
        "vietnamese_meaning": "Tôi hôm nay rất buồn",
        "options": [],
        "correct_answer": "我今天很难过",
        "hint": "难过 = nánguò = buồn khổ, khó chịu trong lòng",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h3_l1_ex3",
        "lesson_id": "zh_h3_l1",
        "type": "matching",
        "prompt": "Ghép cảm xúc với nghĩa tiếng Việt:",
        "target_text": "高兴,难过,害怕,生气",
        "target_audio_text": "gāoxìng nánguò hàipà shēngqì",
        "phonetic": "Cảm xúc",
        "vietnamese_meaning": "Từ vựng cảm xúc",
        "options": {
          "pairs": [
            {
              "left": "高兴 (gāoxìng)",
              "right": "Vui vẻ, hạnh phúc"
            },
            {
              "left": "难过 (nánguò)",
              "right": "Buồn bã, khổ tâm"
            },
            {
              "left": "害怕 (hàipà)",
              "right": "Sợ hãi, lo sợ"
            },
            {
              "left": "生气 (shēngqì)",
              "right": "Tức giận, nổi giận"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "生气 nghĩa đen là \"sinh khí\" nhưng nghĩa thực là tức giận",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h3_l1_ex4",
        "lesson_id": "zh_h3_l1",
        "type": "translation",
        "prompt": "Dịch sang tiếng Trung: \"Con bé rất sợ tiếng sét\":",
        "target_text": "小女孩很害怕雷声",
        "target_audio_text": "小女孩很害怕雷声",
        "phonetic": "xiǎo nǚhái hěn hàipà léishēng",
        "vietnamese_meaning": "Con bé rất sợ tiếng sét",
        "options": [
          "小女孩",
          "很",
          "害怕",
          "雷声",
          "生气",
          "高兴",
          "妈妈"
        ],
        "correct_answer": "小女孩 很 害怕 雷声",
        "hint": "雷声 = léishēng = tiếng sấm sét",
        "stroke_char": null,
        "order_index": 4
      }
    ]
  },
  "zh_h3_l3": {
    "id": "zh_h3_l3",
    "unit_id": "zh_u2_hsk3",
    "lesson_number": 1,
    "title": "Tại Nhà Hàng: 点菜 (Gọi món)",
    "description": "Đọc thực đơn, gọi món và yêu cầu hóa đơn",
    "xp_reward": 30,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h3_l3_ex1",
        "lesson_id": "zh_h3_l3",
        "type": "listening",
        "prompt": "Nghe và chọn câu đúng khi gọi món ăn:",
        "target_text": "我要一碗米饭和一盘炒青菜",
        "target_audio_text": "我要一碗米饭和一盘炒青菜",
        "phonetic": "wǒ yào yī wǎn mǐfàn hé yī pán chǎo qīngcài",
        "vietnamese_meaning": "Tôi muốn một bát cơm và một đĩa rau xào",
        "options": [
          "Tôi muốn một bát cơm và một đĩa rau xào",
          "Tôi muốn hai phần phở và một ly nước",
          "Cho tôi hỏi thực đơn có gì?",
          "Tính tiền cho tôi nhé"
        ],
        "correct_answer": "Tôi muốn một bát cơm và một đĩa rau xào",
        "hint": "碗 (wǎn) = cái bát, 盘 (pán) = cái đĩa",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h3_l3_ex2",
        "lesson_id": "zh_h3_l3",
        "type": "speaking",
        "prompt": "Nhấn Micro và gọi món: \"Cho tôi một bát mì và hai chai nước\":",
        "target_text": "我要一碗面条和两瓶水",
        "target_audio_text": "我要一碗面条和两瓶水",
        "phonetic": "wǒ yào yī wǎn miàntiáo hé liǎng píng shuǐ",
        "vietnamese_meaning": "Tôi muốn một bát mì và hai chai nước",
        "options": [],
        "correct_answer": "我要一碗面条和两瓶水",
        "hint": "瓶 (píng) = cái chai, 面条 = mì sợi",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h3_l3_ex3",
        "lesson_id": "zh_h3_l3",
        "type": "matching",
        "prompt": "Ghép từ vựng nhà hàng với nghĩa tiếng Việt:",
        "target_text": "菜单,服务员,买单,小费",
        "target_audio_text": "càidān fúwùyuán mǎidān xiǎofèi",
        "phonetic": "Nhà hàng",
        "vietnamese_meaning": "Từ vựng nhà hàng",
        "options": {
          "pairs": [
            {
              "left": "菜单 (càidān)",
              "right": "Thực đơn, menu"
            },
            {
              "left": "服务员 (fúwùyuán)",
              "right": "Nhân viên phục vụ"
            },
            {
              "left": "买单 (mǎidān)",
              "right": "Tính tiền, thanh toán"
            },
            {
              "left": "小费 (xiǎofèi)",
              "right": "Tiền tip, tiền thưởng"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "买单 hoặc 结账 (jiézhàng) đều có nghĩa tính tiền",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "zh_h3_l5": {
    "id": "zh_h3_l5",
    "unit_id": "zh_u3_hsk3",
    "lesson_number": 1,
    "title": "Đi Khám Bác Sĩ: 我头疼 (Tôi đau đầu)",
    "description": "Mô tả triệu chứng bệnh và hiểu toa thuốc",
    "xp_reward": 30,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h3_l5_ex1",
        "lesson_id": "zh_h3_l5",
        "type": "listening",
        "prompt": "Nghe và chọn triệu chứng: 我肚子疼 (wǒ dùzi téng):",
        "target_text": "肚子疼",
        "target_audio_text": "我肚子疼",
        "phonetic": "wǒ dùzi téng",
        "vietnamese_meaning": "Tôi đau bụng",
        "options": [
          "Đau bụng",
          "Đau đầu",
          "Đau họng",
          "Sốt cao"
        ],
        "correct_answer": "Đau bụng",
        "hint": "肚子 = bụng, 疼 = đau (cảm giác đau)",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h3_l5_ex2",
        "lesson_id": "zh_h3_l5",
        "type": "speaking",
        "prompt": "Nhấn Micro và nói với bác sĩ: \"Tôi bị sốt và ho\":",
        "target_text": "我发烧而且咳嗽",
        "target_audio_text": "我发烧而且咳嗽",
        "phonetic": "wǒ fāshāo érqiě késou",
        "vietnamese_meaning": "Tôi bị sốt và ho",
        "options": [],
        "correct_answer": "我发烧而且咳嗽",
        "hint": "发烧 = sốt, 咳嗽 = ho, 而且 = và còn",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h3_l5_ex3",
        "lesson_id": "zh_h3_l5",
        "type": "matching",
        "prompt": "Ghép triệu chứng với nghĩa tiếng Việt:",
        "target_text": "头疼,发烧,咳嗽,过敏",
        "target_audio_text": "tóuténg fāshāo késou guòmǐn",
        "phonetic": "Sức khỏe",
        "vietnamese_meaning": "Triệu chứng bệnh",
        "options": {
          "pairs": [
            {
              "left": "头疼 (tóuténg)",
              "right": "Đau đầu"
            },
            {
              "left": "发烧 (fāshāo)",
              "right": "Sốt"
            },
            {
              "left": "咳嗽 (késou)",
              "right": "Ho"
            },
            {
              "left": "过敏 (guòmǐn)",
              "right": "Dị ứng"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "头 = đầu, 疼/痛 = đau, 发 = phát ra",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "zh_h4_l1": {
    "id": "zh_h4_l1",
    "unit_id": "zh_u1_hsk4",
    "lesson_number": 1,
    "title": "Phỏng Vấn Xin Việc: 面试 (Miànshì)",
    "description": "Chuẩn bị câu trả lời phỏng vấn bằng tiếng Trung",
    "xp_reward": 35,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h4_l1_ex1",
        "lesson_id": "zh_h4_l1",
        "type": "listening",
        "prompt": "Nghe và chọn câu trả lời phỏng vấn phù hợp khi được hỏi \"你有什么优点？\"(Ưu điểm của bạn là gì?):",
        "target_text": "我工作认真，有责任心",
        "target_audio_text": "我工作认真，有责任心",
        "phonetic": "wǒ gōngzuò rènzhēn, yǒu zérènxīn",
        "vietnamese_meaning": "Tôi làm việc chăm chỉ, có tinh thần trách nhiệm",
        "options": [
          "Tôi làm việc chăm chỉ, có tinh thần trách nhiệm",
          "Tôi không biết làm gì",
          "Tôi thích nghỉ ngơi",
          "Tôi chưa có kinh nghiệm"
        ],
        "correct_answer": "Tôi làm việc chăm chỉ, có tinh thần trách nhiệm",
        "hint": "认真 = nghiêm túc, chăm chỉ; 责任心 = tinh thần trách nhiệm",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h4_l1_ex2",
        "lesson_id": "zh_h4_l1",
        "type": "speaking",
        "prompt": "Nhấn Micro và tự giới thiệu trong phỏng vấn bằng tiếng Trung:",
        "target_text": "我叫李明，我有三年的工作经验",
        "target_audio_text": "我叫李明，我有三年的工作经验",
        "phonetic": "wǒ jiào Lǐ Míng, wǒ yǒu sān nián de gōngzuò jīngyàn",
        "vietnamese_meaning": "Tôi tên Lý Minh, tôi có 3 năm kinh nghiệm làm việc",
        "options": [],
        "correct_answer": "我叫李明，我有三年的工作经验",
        "hint": "经验 = kinh nghiệm, 年 = năm",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h4_l1_ex3",
        "lesson_id": "zh_h4_l1",
        "type": "matching",
        "prompt": "Ghép từ vựng phỏng vấn với nghĩa:",
        "target_text": "简历,面试,薪资,合同",
        "target_audio_text": "jiǎnlì miànshì xīnzī hétong",
        "phonetic": "Phỏng vấn",
        "vietnamese_meaning": "Từ vựng công việc",
        "options": {
          "pairs": [
            {
              "left": "简历 (jiǎnlì)",
              "right": "CV, hồ sơ xin việc"
            },
            {
              "left": "面试 (miànshì)",
              "right": "Phỏng vấn"
            },
            {
              "left": "薪资 (xīnzī)",
              "right": "Lương, mức lương"
            },
            {
              "left": "合同 (hétong)",
              "right": "Hợp đồng"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "简历 (CV) là tài liệu quan trọng nhất khi xin việc",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "zh_h4_l3": {
    "id": "zh_h4_l3",
    "unit_id": "zh_u2_hsk4",
    "lesson_number": 1,
    "title": "Tết Nguyên Đán: 春节习俗 (Phong Tục Tết)",
    "description": "Tìm hiểu về lì xì, bánh niên cao và các hoạt động tết",
    "xp_reward": 35,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h4_l3_ex1",
        "lesson_id": "zh_h4_l3",
        "type": "listening",
        "prompt": "Nghe và chọn nghĩa câu chúc tết phổ biến nhất:",
        "target_text": "新年快乐，万事如意！",
        "target_audio_text": "新年快乐，万事如意！",
        "phonetic": "Xīnnián kuàilè, wànshì rúyì!",
        "vietnamese_meaning": "Chúc mừng năm mới, vạn sự như ý!",
        "options": [
          "Chúc mừng năm mới, vạn sự như ý!",
          "Chúc bạn sức khỏe và hạnh phúc!",
          "Cảm ơn lì xì đỏ!",
          "Hẹn gặp lại năm sau!"
        ],
        "correct_answer": "Chúc mừng năm mới, vạn sự như ý!",
        "hint": "万事如意 = vạn sự như ý = mọi việc đều như mong muốn",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h4_l3_ex2",
        "lesson_id": "zh_h4_l3",
        "type": "matching",
        "prompt": "Ghép phong tục Tết với nghĩa tiếng Việt:",
        "target_text": "红包,饺子,烟花,对联",
        "target_audio_text": "hóngbāo jiǎozi yānhuā duìlián",
        "phonetic": "Tết Nguyên Đán",
        "vietnamese_meaning": "Phong tục Tết",
        "options": {
          "pairs": [
            {
              "left": "红包 (hóngbāo)",
              "right": "Phong bì lì xì đỏ"
            },
            {
              "left": "饺子 (jiǎozi)",
              "right": "Bánh há cảo (ăn Tết)"
            },
            {
              "left": "烟花 (yānhuā)",
              "right": "Pháo hoa"
            },
            {
              "left": "对联 (duìlián)",
              "right": "Câu đối đỏ trang trí"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "红包 hiện nay cũng là WeChat/Alipay digital payment",
        "stroke_char": null,
        "order_index": 2
      }
    ]
  },
  "zh_h4_l4": {
    "id": "zh_h4_l4",
    "unit_id": "zh_u3_hsk4",
    "lesson_number": 1,
    "title": "Bàn Luận Phim & Âm Nhạc",
    "description": "Đưa ra ý kiến và đánh giá phim, bài hát yêu thích",
    "xp_reward": 35,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h4_l4_ex1",
        "lesson_id": "zh_h4_l4",
        "type": "listening",
        "prompt": "Nghe và chọn lời nhận xét phim đúng:",
        "target_text": "这部电影的情节非常精彩，值得一看。",
        "target_audio_text": "这部电影的情节非常精彩，值得一看。",
        "phonetic": "zhè bù diànyǐng de qíngjié fēicháng jīngcǎi, zhídé yī kàn.",
        "vietnamese_meaning": "Tình tiết bộ phim này vô cùng xuất sắc, rất đáng xem.",
        "options": [
          "Tình tiết bộ phim này vô cùng xuất sắc, rất đáng xem.",
          "Bài hát này có giai điệu buồn và chậm rãi.",
          "Diễn viên đóng vai chính diễn xuất không tự nhiên.",
          "Rạp chiếu phim hôm nay rất đông khán giả."
        ],
        "correct_answer": "Tình tiết bộ phim này vô cùng xuất sắc, rất đáng xem.",
        "hint": "精彩 = xuất sắc, 值得 = đáng để làm gì",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h4_l4_ex2",
        "lesson_id": "zh_h4_l4",
        "type": "speaking",
        "prompt": "Nhấn Micro và nói: \"Giai điệu bài hát này khiến người ta cảm thấy thư giãn\":",
        "target_text": "这首歌的旋律让人感到放松。",
        "target_audio_text": "这首歌的旋律让人感到放松。",
        "phonetic": "zhè shǒu gē de xuánlǜ ràng rén gǎndào fàngsōng.",
        "vietnamese_meaning": "Giai điệu bài hát này khiến người ta cảm thấy thư giãn.",
        "options": [],
        "correct_answer": "这首歌的旋律让人感到放松。",
        "hint": "旋律 = giai điệu, 放松 = thư giãn thả lỏng",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h4_l4_ex3",
        "lesson_id": "zh_h4_l4",
        "type": "matching",
        "prompt": "Nối thuật ngữ nghệ thuật và giải trí:",
        "target_text": "情节,精彩,旋律,演员",
        "target_audio_text": "qíngjié jīngcǎi xuánlǜ yǎnyuán",
        "phonetic": "qíngjié, jīngcǎi, xuánlǜ, yǎnyuán",
        "vietnamese_meaning": "Từ vựng điện ảnh âm nhạc HSK4",
        "options": {
          "pairs": [
            {
              "left": "情节 (qíngjié)",
              "right": "Tình tiết cốt truyện"
            },
            {
              "left": "精彩 (jīngcǎi)",
              "right": "Hấp dẫn, tuyệt vời"
            },
            {
              "left": "旋律 (xuánlǜ)",
              "right": "Giai điệu âm thanh"
            },
            {
              "left": "演员 (yǎnyuán)",
              "right": "Diễn viên điện ảnh"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "演 = diễn, 员 = thành viên/người",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h4_l4_ex4",
        "lesson_id": "zh_h4_l4",
        "type": "translation",
        "prompt": "Sắp xếp câu: \"Cái kết của bộ phim này khiến mọi người vô cùng cảm động\":",
        "target_text": "这部电影的结局令人感动。",
        "target_audio_text": "这部电影的结局令人感动。",
        "phonetic": "zhè bù diànyǐng de jiéjú lìng rén gǎndòng.",
        "vietnamese_meaning": "Cái kết của bộ phim này khiến mọi người vô cùng cảm động.",
        "options": [
          "这部",
          "电影",
          "的",
          "结局",
          "令人",
          "感动",
          "精彩",
          "旋律"
        ],
        "correct_answer": "这部 电影 的 结局 令人 感动",
        "hint": "结局 = kết thúc/cái kết, 令人 = khiến cho người ta",
        "stroke_char": null,
        "order_index": 4
      },
      {
        "id": "zh_h4_l4_ex5",
        "lesson_id": "zh_h4_l4",
        "type": "writing",
        "prompt": "Tập viết chữ Hán 演 (Diễn xuất):",
        "target_text": "演",
        "target_audio_text": "演",
        "phonetic": "yǎn",
        "vietnamese_meaning": "Diễn xuất, trình diễn, biểu diễn",
        "options": [],
        "correct_answer": "演",
        "hint": "Chữ 演 gồm bộ Ba chấm thủy (氵) bên trái",
        "stroke_char": "演",
        "order_index": 5
      }
    ]
  },
  "zh_h5_l1": {
    "id": "zh_h5_l1",
    "unit_id": "zh_u1_hsk5",
    "lesson_number": 1,
    "title": "Từ Vựng Kinh Doanh: 市场营销",
    "description": "Marketing, thương mại và đàm phán kinh doanh",
    "xp_reward": 45,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h5_l1_ex1",
        "lesson_id": "zh_h5_l1",
        "type": "listening",
        "prompt": "Nghe và chọn nghĩa đúng: 市场营销 (shìchǎng yíngxiāo):",
        "target_text": "市场营销",
        "target_audio_text": "市场营销",
        "phonetic": "shìchǎng yíngxiāo",
        "vietnamese_meaning": "Marketing, tiếp thị thị trường",
        "options": [
          "Marketing, tiếp thị thị trường",
          "Kế toán tài chính",
          "Quản lý nhân sự",
          "Kiểm soát chất lượng"
        ],
        "correct_answer": "Marketing, tiếp thị thị trường",
        "hint": "市场 = thị trường, 营销 = kinh doanh/tiếp thị",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h5_l1_ex2",
        "lesson_id": "zh_h5_l1",
        "type": "matching",
        "prompt": "Ghép thuật ngữ kinh doanh với nghĩa:",
        "target_text": "利润,投资,股票,品牌",
        "target_audio_text": "lìrùn tóuzī gǔpiào pǐnpái",
        "phonetic": "Kinh doanh",
        "vietnamese_meaning": "Từ vựng kinh doanh",
        "options": {
          "pairs": [
            {
              "left": "利润 (lìrùn)",
              "right": "Lợi nhuận"
            },
            {
              "left": "投资 (tóuzī)",
              "right": "Đầu tư"
            },
            {
              "left": "股票 (gǔpiào)",
              "right": "Cổ phiếu, chứng khoán"
            },
            {
              "left": "品牌 (pǐnpái)",
              "right": "Thương hiệu"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "股票 thị trường chứng khoán = 股票市场 (gǔpiào shìchǎng)",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h5_l1_ex3",
        "lesson_id": "zh_h5_l1",
        "type": "speaking",
        "prompt": "Trình bày ý kiến bằng tiếng Trung về lợi ích của thương mại điện tử:",
        "target_text": "电子商务让购物更加便捷",
        "target_audio_text": "电子商务让购物更加便捷",
        "phonetic": "diànzǐ shāngwù ràng gòuwù gèngjiā biànjié",
        "vietnamese_meaning": "Thương mại điện tử làm cho việc mua sắm tiện lợi hơn",
        "options": [],
        "correct_answer": "电子商务让购物更加便捷",
        "hint": "电子商务 = e-commerce, 便捷 = tiện lợi, nhanh chóng",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "zh_h5_l2": {
    "id": "zh_h5_l2",
    "unit_id": "zh_u2_hsk5",
    "lesson_number": 1,
    "title": "Đọc Hiểu Bài Báo Tiếng Trung",
    "description": "Kỹ thuật đọc nhanh và nắm ý chính từ bài báo",
    "xp_reward": 50,
    "type": "reading",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h5_l2_ex1",
        "lesson_id": "zh_h5_l2",
        "type": "listening",
        "prompt": "Nghe đoạn trích thời sự kinh tế và chọn ý chính:",
        "target_text": "随着科技的飞速发展，人工智能深刻地改变了人类的生活方式。",
        "target_audio_text": "随着科技的飞速发展，人工智能深刻地改变了人类的生活方式。",
        "phonetic": "suízhe kējì de fēisù fāzhǎn, réngōng zhìnéng shēnkè de gǎibiàn le rénlèi de shēnghuó fāngshì.",
        "vietnamese_meaning": "Cùng với sự phát triển nhanh chóng của công nghệ, AI đã thay đổi sâu sắc lối sống của nhân loại.",
        "options": [
          "Cùng với sự phát triển nhanh chóng của công nghệ, AI đã thay đổi sâu sắc lối sống của nhân loại.",
          "Trí tuệ nhân tạo đang gây ra nhiều thách thức về việc làm toàn cầu.",
          "Các công ty công nghệ đang đẩy mạnh đầu tư năng lượng sạch.",
          "Mô hình làm việc truyền thống vẫn giữ vai trò then chốt."
        ],
        "correct_answer": "Cùng với sự phát triển nhanh chóng của công nghệ, AI đã thay đổi sâu sắc lối sống của nhân loại.",
        "hint": "随着 = cùng với, 人工智能 = AI, 深刻 = sâu sắc",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h5_l2_ex2",
        "lesson_id": "zh_h5_l2",
        "type": "speaking",
        "prompt": "Nhấn Micro và đọc nhận định chuyên gia:",
        "target_text": "绿色环保已成为全球经济可持续发展的核心议题。",
        "target_audio_text": "绿色环保已成为全球经济可持续发展的核心议题。",
        "phonetic": "lǜsè huánbǎo yǐ chéngwéi quánqiú jīngjì kěchíxù fāzhǎn de héxīn yìtí.",
        "vietnamese_meaning": "Bảo vệ môi trường xanh đã trở thành chủ đề cốt lõi của sự phát triển kinh tế bền vững toàn cầu.",
        "options": [],
        "correct_answer": "绿色环保已成为全球经济可持续发展的核心议题。",
        "hint": "可持续发展 = phát triển bền vững, 核心 = cốt lõi",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h5_l2_ex3",
        "lesson_id": "zh_h5_l2",
        "type": "matching",
        "prompt": "Nối thuật ngữ báo chí và thời sự HSK5:",
        "target_text": "可持续,核心,深刻,飞速",
        "target_audio_text": "kěchíxù héxīn shēnkè fēisù",
        "phonetic": "kěchíxù, héxīn, shēnkè, fēisù",
        "vietnamese_meaning": "Thuật ngữ báo chí học thuật HSK5",
        "options": {
          "pairs": [
            {
              "left": "可持续 (kěchíxù)",
              "right": "Bền vững, lâu dài"
            },
            {
              "left": "核心 (héxīn)",
              "right": "Cốt lõi, trung tâm"
            },
            {
              "left": "深刻 (shēnkè)",
              "right": "Sâu sắc, thấu đáo"
            },
            {
              "left": "飞速 (fēisù)",
              "right": "Nhanh như bay, thần tốc"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Ghép chuẩn thuật ngữ thường gặp trên các mặt báo",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h5_l2_ex4",
        "lesson_id": "zh_h5_l2",
        "type": "translation",
        "prompt": "Sắp xếp câu: \"Đổi mới công nghệ đã thúc đẩy sự phồn vinh của ngành công nghiệp\":",
        "target_text": "科技创新推动了产业的繁荣。",
        "target_audio_text": "科技创新推动了产业的繁荣。",
        "phonetic": "kējì chuàngxīn tuīdòng le chǎnyè de fánróng.",
        "vietnamese_meaning": "Đổi mới công nghệ đã thúc đẩy sự phồn vinh của ngành công nghiệp.",
        "options": [
          "科技",
          "创新",
          "推动",
          "了",
          "产业",
          "的",
          "繁荣",
          "深刻",
          "核心"
        ],
        "correct_answer": "科技 创新 推动 了 产业 的 繁荣",
        "hint": "创新 = đổi mới sáng tạo, 推动 = thúc đẩy, 繁荣 = phồn vinh",
        "stroke_char": null,
        "order_index": 4
      },
      {
        "id": "zh_h5_l2_ex5",
        "lesson_id": "zh_h5_l2",
        "type": "writing",
        "prompt": "Tập viết chữ Hán 济 (Kinh tế / Cứu trợ):",
        "target_text": "济",
        "target_audio_text": "济",
        "phonetic": "jì",
        "vietnamese_meaning": "Kinh tế, cứu giúp",
        "options": [],
        "correct_answer": "济",
        "hint": "Chữ 济 trong 经济 (Kinh tế) có bộ Thủy bên trái",
        "stroke_char": "济",
        "order_index": 5
      }
    ]
  },
  "zh_h5_l3": {
    "id": "zh_h5_l3",
    "unit_id": "zh_u3_hsk5",
    "lesson_number": 1,
    "title": "Viết Luận Tiếng Trung: Cấu Trúc & Lập Luận",
    "description": "Mở bài, thân bài, kết luận và các liên từ nối câu",
    "xp_reward": 50,
    "type": "writing",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h5_l3_ex1",
        "lesson_id": "zh_h5_l3",
        "type": "listening",
        "prompt": "Nghe câu kết luận lập luận bài viết:",
        "target_text": "综上所述，教育不仅关乎个人前途，更是国家发展的基石。",
        "target_audio_text": "综上所述，教育不仅关乎个人前途，更是国家发展的基石。",
        "phonetic": "zòngshàng suǒshù, jiàoyù bùjǐn guānhū gèrén qiántú, gèng shì guójiā fāzhǎn de jīshí.",
        "vietnamese_meaning": "Tóm lại, giáo dục không chỉ liên quan đến tương lai cá nhân, mà còn là nền tảng cho sự phát triển của quốc gia.",
        "options": [
          "Tóm lại, giáo dục không chỉ liên quan đến tương lai cá nhân, mà còn là nền tảng cho sự phát triển của quốc gia.",
          "Môi trường sống đóng vai trò quyết định đến tính cách của mỗi con người.",
          "Chúng ta cần cân bằng giữa việc học tập và nghỉ ngơi giải trí.",
          "Thành công chỉ đến với những người biết nắm bắt cơ hội."
        ],
        "correct_answer": "Tóm lại, giáo dục không chỉ liên quan đến tương lai cá nhân, mà còn là nền tảng cho sự phát triển của quốc gia.",
        "hint": "综上所述 = Tóm lại / Tổng kết lại những điều trên, 基石 = nền tảng vững chắc",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h5_l3_ex2",
        "lesson_id": "zh_h5_l3",
        "type": "speaking",
        "prompt": "Nhấn Micro và nói câu luận điểm vững chắc:",
        "target_text": "从长远来看，坚持自主创新才能立于不败之地。",
        "target_audio_text": "从长远来看，坚持自主创新才能立于不败之地。",
        "phonetic": "cóng chángyuǎn lái kàn, jiānchí zìzhǔ chuàngxīn cái néng lì yú bú bài zhī dì.",
        "vietnamese_meaning": "Nhìn về lâu dài, kiên trì tự chủ đổi mới mới có thể đứng vững ở vị thế bất bại.",
        "options": [],
        "correct_answer": "从长远来看，坚持自主创新才能立于不败之地。",
        "hint": "从长远来看 = Nhìn về lâu dài, 不败之地 = thế bất bại",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h5_l3_ex3",
        "lesson_id": "zh_h5_l3",
        "type": "matching",
        "prompt": "Nối các liên từ nối lập luận bài văn nghị luận HSK5:",
        "target_text": "综上所述,从长远来看,毫无疑问,总而言之",
        "target_audio_text": "zòngshàng suǒshù cóng chángyuǎn lái kàn háowú yíwèn zǒng'éryánzhī",
        "phonetic": "zòngshàng suǒshù, cóng chángyuǎn lái kàn, háowú yíwèn, zǒng'éryánzhī",
        "vietnamese_meaning": "Từ nối lập luận bài văn HSK5",
        "options": {
          "pairs": [
            {
              "left": "综上所述 (zòngshàng suǒshù)",
              "right": "Tóm lại các điều trên"
            },
            {
              "left": "从长远来看 (cóng chángyuǎn)",
              "right": "Về lâu dài mà nói"
            },
            {
              "left": "毫无疑问 (háowú yíwèn)",
              "right": "Không còn nghi ngờ gì nữa"
            },
            {
              "left": "总而言之 (zǒng'éryánzhī)",
              "right": "Nói tóm lại"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Cụm 4 chữ dùng làm mở bài và kết bài văn luận",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h5_l3_ex4",
        "lesson_id": "zh_h5_l3",
        "type": "translation",
        "prompt": "Sắp xếp câu: \"Mọi thành công đều không thể tách rời sự nỗ lực kiên trì\":",
        "target_text": "任何成功都离不开坚持不懈的努力。",
        "target_audio_text": "任何成功都离不开坚持不懈的努力。",
        "phonetic": "rènhé chénggōng dōu lí bù kāi jiānchí bù xiè de nǔlì.",
        "vietnamese_meaning": "Mọi thành công đều không thể tách rời sự nỗ lực kiên trì.",
        "options": [
          "任何",
          "成功",
          "都",
          "离不开",
          "坚持不懈",
          "的",
          "努力",
          "教育",
          "发展"
        ],
        "correct_answer": "任何 成功 都 离不开 坚持不懈 的 努力",
        "hint": "离不开 = không thể tách rời, 坚持不懈 = kiên trì bền bỉ",
        "stroke_char": null,
        "order_index": 4
      },
      {
        "id": "zh_h5_l3_ex5",
        "lesson_id": "zh_h5_l3",
        "type": "writing",
        "prompt": "Tập viết chữ Hán 论 (Nghị luận / Luận điểm):",
        "target_text": "论",
        "target_audio_text": "论",
        "phonetic": "lùn",
        "vietnamese_meaning": "Bàn luận, lý luận, nghị luận",
        "options": [],
        "correct_answer": "论",
        "hint": "Chữ 论 gồm bộ Ngôn (讠) bên trái biểu thị lời nói bàn luận",
        "stroke_char": "论",
        "order_index": 5
      }
    ]
  },
  "zh_h6_l1": {
    "id": "zh_h6_l1",
    "unit_id": "zh_u1_hsk6",
    "lesson_number": 1,
    "title": "Thơ Đường: 静夜思 (Tư Đêm Yên Tĩnh) - Lý Bạch",
    "description": "Phân tích thơ cổ, cảm thụ văn học và ngữ nghĩa ẩn sâu",
    "xp_reward": 60,
    "type": "reading",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h6_l1_ex1",
        "lesson_id": "zh_h6_l1",
        "type": "reading",
        "prompt": "Đọc thơ và trả lời: Trong bài 静夜思, Lý Bạch đang nhớ đến điều gì khi nhìn ánh trăng?",
        "target_text": "故乡",
        "target_audio_text": "床前明月光，疑是地上霜。举头望明月，低头思故乡。",
        "phonetic": "chuáng qián míng yuè guāng...",
        "vietnamese_meaning": "Ánh trăng sáng trước giường, ngỡ là sương trên đất. Ngẩng đầu nhìn trăng sáng, cúi đầu nhớ quê hương.",
        "options": [
          "Quê hương",
          "Người yêu",
          "Bạn bè",
          "Mùa đông lạnh giá"
        ],
        "correct_answer": "Quê hương",
        "hint": "故乡 = gùxiāng = quê hương, 思 = tư/nhớ",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h6_l1_ex2",
        "lesson_id": "zh_h6_l1",
        "type": "speaking",
        "prompt": "Nhấn Micro và ngâm 2 câu thơ nổi tiếng của Lý Bạch:",
        "target_text": "举头望明月，低头思故乡。",
        "target_audio_text": "举头望明月，低头思故乡。",
        "phonetic": "jǔ tóu wàng míngyuè, dī tóu sī gùxiāng.",
        "vietnamese_meaning": "Ngẩng đầu nhìn trăng sáng, Cúi đầu nhớ cố hương.",
        "options": [],
        "correct_answer": "举头望明月，低头思故乡。",
        "hint": "Tác phẩm Tĩnh Dạ Tứ - Thi tiên Lý Bạch",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h6_l1_ex3",
        "lesson_id": "zh_h6_l1",
        "type": "matching",
        "prompt": "Nối các từ ngữ thi ca Đường Thi với ý nghĩa:",
        "target_text": "明月,故乡,霜,望",
        "target_audio_text": "míngyuè gùxiāng shuāng wàng",
        "phonetic": "míngyuè, gùxiāng, shuāng, wàng",
        "vietnamese_meaning": "Từ vựng văn học cổ điển HSK6",
        "options": {
          "pairs": [
            {
              "left": "明月 (míngyuè)",
              "right": "Trăng sáng vằng vặc"
            },
            {
              "left": "故乡 (gùxiāng)",
              "right": "Quê hương bản xứ"
            },
            {
              "left": "疑是霜 (yí shì shuāng)",
              "right": "Ngỡ là sương tuyết trên mặt đất"
            },
            {
              "left": "举头 (jǔ tóu)",
              "right": "Ngẩng cao đầu"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Từ vựng văn học cổ điển Đường thi",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "zh_h6_l2": {
    "id": "zh_h6_l2",
    "unit_id": "zh_u2_hsk6",
    "lesson_number": 1,
    "title": "Thành Ngữ 4 Chữ: 成语 (Chéngyǔ) Quan Trọng",
    "description": "20 thành ngữ HSK6 phổ biến nhất với ví dụ thực tế",
    "xp_reward": 60,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h6_l2_ex1",
        "lesson_id": "zh_h6_l2",
        "type": "listening",
        "prompt": "Nghe thành ngữ 一石二鸟 (yī shí èr niǎo) và chọn nghĩa đúng:",
        "target_text": "一石二鸟",
        "target_audio_text": "一石二鸟",
        "phonetic": "yī shí èr niǎo",
        "vietnamese_meaning": "Một mũi tên trúng hai đích",
        "options": [
          "Một mũi tên trúng hai đích",
          "Chim khôn chọn cành mà đậu",
          "Chậm mà chắc",
          "Nước chảy đá mòn"
        ],
        "correct_answer": "Một mũi tên trúng hai đích",
        "hint": "Nghĩa đen: một hòn đá hạ hai con chim",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h6_l2_ex2",
        "lesson_id": "zh_h6_l2",
        "type": "matching",
        "prompt": "Ghép thành ngữ với nghĩa tiếng Việt tương đương:",
        "target_text": "马到成功,半途而废,青出于蓝,实事求是",
        "target_audio_text": "mǎ dào chénggōng...",
        "phonetic": "Thành ngữ HSK6",
        "vietnamese_meaning": "Chéngyǔ",
        "options": {
          "pairs": [
            {
              "left": "马到成功 (mǎ dào chénggōng)",
              "right": "Thành công ngay lập tức"
            },
            {
              "left": "半途而废 (bàntú ér fèi)",
              "right": "Bỏ cuộc giữa chừng"
            },
            {
              "left": "青出于蓝 (qīng chū yú lán)",
              "right": "Trò giỏi hơn thầy"
            },
            {
              "left": "实事求是 (shíshì qiúshì)",
              "right": "Thực tế khách quan, tìm sự thật"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "实事求是 là phương châm học thuật và nghiên cứu của Trung Quốc",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h6_l2_ex3",
        "lesson_id": "zh_h6_l2",
        "type": "listening",
        "prompt": "Nghe thành ngữ và chọn ý nghĩa biểu đạt:",
        "target_text": "一举两得",
        "target_audio_text": "一举两得",
        "phonetic": "yī jǔ liǎng dé",
        "vietnamese_meaning": "Một mũi tên trúng hai đích (Một công đôi việc)",
        "options": [
          "Một công đôi việc, làm một việc được hai lợi ích",
          "Bỏ dở giữa chừng, không kiên trì",
          "Ếch ngồi đáy giếng, tầm nhìn hạn hẹp",
          "Nước chảy đá mòn, kiên nhẫn thành công"
        ],
        "correct_answer": "Một công đôi việc, làm một việc được hai lợi ích",
        "hint": "举 = hành động cử chỉ, 得 = đạt được",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h6_l2_ex4",
        "lesson_id": "zh_h6_l2",
        "type": "translation",
        "prompt": "Sắp xếp câu dùng thành ngữ: \"Làm như vậy vừa bảo vệ môi trường vừa tiết kiệm, thật là một công đôi việc\":",
        "target_text": "这样做既环保又省钱，真是一举两得。",
        "target_audio_text": "这样做既环保又省钱，真是一举两得。",
        "phonetic": "zhèyàng zuò jì huánbǎo yòu shěngqián, zhēnshì yījǔliǎngdé.",
        "vietnamese_meaning": "Làm như vậy vừa bảo vệ môi trường vừa tiết kiệm, thật là một công đôi việc.",
        "options": [
          "这样做",
          "既环保",
          "又省钱",
          "真是",
          "一举两得",
          "毫无疑问",
          "基石"
        ],
        "correct_answer": "这样做 既环保 又省钱 真是 一举两得",
        "hint": "Cấu trúc 既...又... (Vừa... lại vừa...)",
        "stroke_char": null,
        "order_index": 4
      }
    ]
  },
  "en_a2_l1": {
    "id": "en_a2_l1",
    "unit_id": "en_u1_a2",
    "lesson_number": 1,
    "title": "At the Airport: Check-in & Immigration",
    "description": "Essential airport vocabulary and conversations",
    "xp_reward": 20,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_a2_l1_ex1",
        "lesson_id": "en_a2_l1",
        "type": "listening",
        "prompt": "Listen and choose the correct meaning: \"Could I see your boarding pass, please?\"",
        "target_text": "boarding pass",
        "target_audio_text": "Could I see your boarding pass, please?",
        "phonetic": "/ˈbɔːdɪŋ pɑːs/",
        "vietnamese_meaning": "Thẻ lên máy bay",
        "options": [
          "Thẻ lên máy bay",
          "Hộ chiếu",
          "Thị thực (visa)",
          "Thẻ căn cước"
        ],
        "correct_answer": "Thẻ lên máy bay",
        "hint": "boarding pass = thẻ lên máy bay, cần xuất trình tại cổng máy bay",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_a2_l1_ex2",
        "lesson_id": "en_a2_l1",
        "type": "speaking",
        "prompt": "Press Mic: Tell the immigration officer where you are going:",
        "target_text": "I'm traveling to London for tourism.",
        "target_audio_text": "I'm traveling to London for tourism.",
        "phonetic": "/aɪm ˈtrævəlɪŋ tuː ˈlʌndən fɔː ˈtʊərɪzəm/",
        "vietnamese_meaning": "Tôi đến London để du lịch.",
        "options": [],
        "correct_answer": "I'm traveling to London for tourism.",
        "hint": "Use present continuous \"I am traveling\" for current trip",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "en_a2_l1_ex3",
        "lesson_id": "en_a2_l1",
        "type": "matching",
        "prompt": "Match airport vocabulary with Vietnamese meanings:",
        "target_text": "departure, arrival, customs, gate",
        "target_audio_text": "departure arrival customs gate",
        "phonetic": "Airport vocabulary",
        "vietnamese_meaning": "Từ vựng sân bay",
        "options": {
          "pairs": [
            {
              "left": "Departure",
              "right": "Khởi hành, xuất phát"
            },
            {
              "left": "Arrival",
              "right": "Đến nơi, hạ cánh"
            },
            {
              "left": "Customs",
              "right": "Hải quan"
            },
            {
              "left": "Gate",
              "right": "Cổng lên máy bay"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Check \"arrivals\" or \"departures\" board to find your flight",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "en_a2_l1_ex4",
        "lesson_id": "en_a2_l1",
        "type": "translation",
        "prompt": "Translate to English: \"Hành lý của tôi bị mất\":",
        "target_text": "My luggage is lost.",
        "target_audio_text": "My luggage is lost.",
        "phonetic": "/maɪ ˈlʌɡɪdʒ ɪz lɒst/",
        "vietnamese_meaning": "Hành lý của tôi bị mất",
        "options": [
          "My",
          "luggage",
          "is",
          "lost",
          "stolen",
          "found",
          "ticket"
        ],
        "correct_answer": "My luggage is lost",
        "hint": "luggage/baggage = hành lý, lost = bị mất",
        "stroke_char": null,
        "order_index": 4
      }
    ]
  },
  "en_a2_l3": {
    "id": "en_a2_l3",
    "unit_id": "en_u2_a2",
    "lesson_number": 1,
    "title": "Ordering Food at a Restaurant",
    "description": "Read menus, ask about dishes and pay the bill",
    "xp_reward": 25,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_a2_l3_ex1",
        "lesson_id": "en_a2_l3",
        "type": "listening",
        "prompt": "Listen and select the correct waiter response:",
        "target_text": "Are you ready to order?",
        "target_audio_text": "Are you ready to order?",
        "phonetic": "/ɑː juː ˈredi tuː ˈɔːdər/",
        "vietnamese_meaning": "Bạn đã sẵn sàng gọi món chưa?",
        "options": [
          "Bạn đã sẵn sàng gọi món chưa?",
          "Bạn có muốn thêm gì không?",
          "Hóa đơn đây!",
          "Bàn của bạn ở đây"
        ],
        "correct_answer": "Bạn đã sẵn sàng gọi món chưa?",
        "hint": "\"Are you ready to order?\" = câu hỏi mà waiter hỏi khách",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_a2_l3_ex2",
        "lesson_id": "en_a2_l3",
        "type": "speaking",
        "prompt": "Press Mic: Order a burger and a cola:",
        "target_text": "I'll have a burger and a cola, please.",
        "target_audio_text": "I'll have a burger and a cola, please.",
        "phonetic": "/aɪl hæv ə ˈbɜːɡər ænd ə ˈkoʊlə pliːz/",
        "vietnamese_meaning": "Cho tôi một cái burger và một ly cola.",
        "options": [],
        "correct_answer": "I'll have a burger and a cola, please.",
        "hint": "I'll have... = cách gọi món tự nhiên và lịch sự nhất",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "en_a2_l3_ex3",
        "lesson_id": "en_a2_l3",
        "type": "matching",
        "prompt": "Match restaurant phrases with Vietnamese meanings:",
        "target_text": "I'd like..., Could I have..., The bill please, Enjoy your meal",
        "target_audio_text": "",
        "phonetic": "Restaurant phrases",
        "vietnamese_meaning": "Cụm từ nhà hàng",
        "options": {
          "pairs": [
            {
              "left": "I'd like the pasta.",
              "right": "Tôi muốn gọi món mì Ý"
            },
            {
              "left": "Could I have the menu?",
              "right": "Cho tôi xem thực đơn được không?"
            },
            {
              "left": "The bill, please.",
              "right": "Cho tôi xin hóa đơn"
            },
            {
              "left": "Enjoy your meal!",
              "right": "Chúc ngon miệng!"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "\"The bill please\" = yêu cầu tính tiền ở Anh; \"Check please\" ở Mỹ",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "en_a2_l5": {
    "id": "en_a2_l5",
    "unit_id": "en_u3_a2",
    "lesson_number": 1,
    "title": "Daily Routine: Morning to Night",
    "description": "Describe your typical day using present simple",
    "xp_reward": 20,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_a2_l5_ex1",
        "lesson_id": "en_a2_l5",
        "type": "listening",
        "prompt": "Listen and choose the correct daily routine order:",
        "target_text": "wake up, brush teeth, have breakfast, go to work",
        "target_audio_text": "I wake up, brush my teeth, have breakfast and go to work.",
        "phonetic": "/aɪ weɪk ʌp, brʌʃ maɪ tiːθ, hæv ˈbrekfəst ænd ɡoʊ tuː wɜːrk/",
        "vietnamese_meaning": "Tôi thức dậy, đánh răng, ăn sáng và đi làm.",
        "options": [
          "Thức dậy → Đánh răng → Ăn sáng → Đi làm",
          "Đi làm → Ăn sáng → Đánh răng → Thức dậy",
          "Ăn sáng → Thức dậy → Đi làm → Đánh răng",
          "Đánh răng → Đi làm → Thức dậy → Ăn sáng"
        ],
        "correct_answer": "Thức dậy → Đánh răng → Ăn sáng → Đi làm",
        "hint": "Present simple tense mô tả thói quen hàng ngày",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_a2_l5_ex2",
        "lesson_id": "en_a2_l5",
        "type": "speaking",
        "prompt": "Press Mic: Describe your morning routine in 1-2 sentences:",
        "target_text": "I usually wake up at 7 and have breakfast before going to work.",
        "target_audio_text": "I usually wake up at 7 and have breakfast before going to work.",
        "phonetic": "/aɪ ˈjuːʒuəli weɪk ʌp æt ˈsevən ænd hæv ˈbrekfəst bɪˈfɔːr ˈɡoʊɪŋ tuː wɜːrk/",
        "vietnamese_meaning": "Tôi thường thức dậy lúc 7 giờ và ăn sáng trước khi đi làm.",
        "options": [],
        "correct_answer": "I usually wake up at 7 and have breakfast before going to work.",
        "hint": "Usually/always/often/sometimes = trạng từ chỉ tần suất",
        "stroke_char": null,
        "order_index": 2
      }
    ]
  },
  "en_b1_l1": {
    "id": "en_b1_l1",
    "unit_id": "en_u1_b1",
    "lesson_number": 1,
    "title": "Job Interview: \"Tell me about yourself\"",
    "description": "Structure a confident self-introduction in English",
    "xp_reward": 30,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_b1_l1_ex1",
        "lesson_id": "en_b1_l1",
        "type": "listening",
        "prompt": "Listen and choose the best answer to \"What are your strengths?\"",
        "target_text": "I'm a good team player and I'm very organized.",
        "target_audio_text": "I'm a good team player and I'm very organized.",
        "phonetic": "/aɪm ə ɡʊd tiːm ˈpleɪər ænd aɪm ˈveri ˈɔːɡənaɪzd/",
        "vietnamese_meaning": "Tôi là người làm việc nhóm tốt và rất có tổ chức.",
        "options": [
          "I'm a good team player and I'm very organized.",
          "I don't have any weaknesses.",
          "I want more money.",
          "I haven't thought about it."
        ],
        "correct_answer": "I'm a good team player and I'm very organized.",
        "hint": "Strengths = điểm mạnh. Mention team skills and personal qualities.",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_b1_l1_ex2",
        "lesson_id": "en_b1_l1",
        "type": "speaking",
        "prompt": "Press Mic: Introduce yourself for a job interview (30 seconds):",
        "target_text": "My name is Minh. I have a degree in marketing and 2 years of experience in sales.",
        "target_audio_text": "My name is Minh. I have a degree in marketing and 2 years of experience in sales.",
        "phonetic": "/maɪ neɪm ɪz mɪn. aɪ hæv ə dɪˈɡriː ɪn ˈmɑːrkɪtɪŋ ænd tuː jɪərz əv ɪkˈspɪriəns ɪn seɪlz/",
        "vietnamese_meaning": "Tên tôi là Minh. Tôi có bằng marketing và 2 năm kinh nghiệm bán hàng.",
        "options": [],
        "correct_answer": "My name is Minh. I have a degree in marketing and 2 years of experience in sales.",
        "hint": "Structure: Name → Education → Experience → Why this job",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "en_b1_l1_ex3",
        "lesson_id": "en_b1_l1",
        "type": "matching",
        "prompt": "Match interview questions with appropriate answer starters:",
        "target_text": "Tell me about yourself, Why this company, Greatest achievement, 5-year plan",
        "target_audio_text": "",
        "phonetic": "Job interview",
        "vietnamese_meaning": "Phỏng vấn tiếng Anh",
        "options": {
          "pairs": [
            {
              "left": "Tell me about yourself.",
              "right": "I'm currently working as... / I recently graduated from..."
            },
            {
              "left": "Why do you want to work here?",
              "right": "I admire your company's mission to..."
            },
            {
              "left": "What is your greatest achievement?",
              "right": "In my previous role, I successfully..."
            },
            {
              "left": "Where do you see yourself in 5 years?",
              "right": "I hope to grow into a leadership role..."
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Always research the company before the interview!",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "en_b1_l3": {
    "id": "en_b1_l3",
    "unit_id": "en_u2_b1",
    "lesson_number": 1,
    "title": "Agreeing & Disagreeing Politely",
    "description": "I think..., I agree..., Actually..., On the other hand...",
    "xp_reward": 30,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_b1_l3_ex1",
        "lesson_id": "en_b1_l3",
        "type": "listening",
        "prompt": "Listen and choose the phrase that politely DISAGREES:",
        "target_text": "I see your point, but I think...",
        "target_audio_text": "I see your point, but I think online learning has its limitations.",
        "phonetic": "/aɪ siː jɔːr pɔɪnt, bʌt aɪ θɪŋk/",
        "vietnamese_meaning": "Tôi hiểu quan điểm của bạn, nhưng tôi cho rằng...",
        "options": [
          "I see your point, but I think...",
          "Absolutely, I agree completely!",
          "You're 100% right!",
          "I couldn't agree more."
        ],
        "correct_answer": "I see your point, but I think...",
        "hint": "\"I see your point, but...\" = bắt đầu phản biện lịch sự",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_b1_l3_ex2",
        "lesson_id": "en_b1_l3",
        "type": "speaking",
        "prompt": "Press Mic: Politely disagree with: \"Social media is always harmful.\"",
        "target_text": "I partly agree, but I think social media also has many benefits like connecting people.",
        "target_audio_text": "I partly agree, but I think social media also has many benefits like connecting people.",
        "phonetic": "/aɪ ˈpɑːrtli əˈɡriː, bʌt aɪ θɪŋk ˈsoʊʃl ˈmiːdiə ˈɔːlsoʊ hæz ˈmeni ˈbenɪfɪts laɪk kəˈnektɪŋ ˈpiːpl/",
        "vietnamese_meaning": "Tôi phần nào đồng ý, nhưng mạng xã hội cũng có nhiều lợi ích như kết nối mọi người.",
        "options": [],
        "correct_answer": "I partly agree, but I think social media also has many benefits like connecting people.",
        "hint": "\"I partly agree\" = tôi phần nào đồng ý, không đồng ý hoàn toàn",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "en_b1_l3_ex3",
        "lesson_id": "en_b1_l3",
        "type": "matching",
        "prompt": "Match disagreement phrases from polite to strong:",
        "target_text": "I see your point but, I'm not sure about that, I completely disagree, Actually I think",
        "target_audio_text": "",
        "phonetic": "Opinion language",
        "vietnamese_meaning": "Đồng ý/Phản đối",
        "options": {
          "pairs": [
            {
              "left": "I see your point, but...",
              "right": "Nhẹ nhàng - tôn trọng quan điểm đối phương"
            },
            {
              "left": "I'm not entirely sure about that.",
              "right": "Trung lập - bày tỏ nghi ngờ"
            },
            {
              "left": "Actually, I think the opposite is true.",
              "right": "Vừa phải - đưa ra quan điểm trái chiều"
            },
            {
              "left": "I completely disagree with that.",
              "right": "Mạnh - phủ nhận hoàn toàn"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "In academic English, polite disagreement shows critical thinking",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "en_b1_l4": {
    "id": "en_b1_l4",
    "unit_id": "en_u3_b1",
    "lesson_number": 1,
    "title": "Reading: Main Idea & Key Details",
    "description": "Skim and scan techniques for news articles",
    "xp_reward": 35,
    "type": "reading",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_b1_l4_ex1",
        "lesson_id": "en_b1_l4",
        "type": "listening",
        "prompt": "Listen to the topic sentence and identify the main argument:",
        "target_text": "Regular exercise not only boosts physical health but also improves mental clarity.",
        "target_audio_text": "Regular exercise not only boosts physical health but also improves mental clarity.",
        "phonetic": "/ˈrɛɡjʊlər ˈɛksəsaɪz nɒt ˈəʊnli buːsts ˈfɪzɪkəl hɛlθ bʌt ˈɔːlsəʊ ɪmˈpruːvz ˈmɛntəl ˈklærɪti/",
        "vietnamese_meaning": "Tập thể dục đều đặn không chỉ nâng cao thể chất mà còn cải thiện sự minh mẫn tinh thần.",
        "options": [
          "Tập thể dục đều đặn đem lại lợi ích kép cho cả thể chất lẫn tinh thần.",
          "Chế độ ăn uống quan trọng hơn việc tập luyện thể thao hàng ngày.",
          "Sức khỏe tinh thần chỉ bị ảnh hưởng bởi áp lực công việc.",
          "Người trưởng thành nên chạy bộ ít nhất 30 phút mỗi tuần."
        ],
        "correct_answer": "Tập thể dục đều đặn đem lại lợi ích kép cho cả thể chất lẫn tinh thần.",
        "hint": "Not only... but also... = không những... mà còn...",
        "stroke_char": null,
        "order_index": 1
      }
    ]
  },
  "en_b2_l1": {
    "id": "en_b2_l1",
    "unit_id": "en_u1_b2",
    "lesson_number": 1,
    "title": "Academic Essay Structure & Cohesion",
    "description": "Introduction, body paragraphs, conclusion and linking words",
    "xp_reward": 40,
    "type": "writing",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_b2_l1_ex1",
        "lesson_id": "en_b2_l1",
        "type": "listening",
        "prompt": "Listen and identify the function of this sentence: \"Furthermore, studies have shown that...\"",
        "target_text": "Adding information/evidence",
        "target_audio_text": "Furthermore, studies have shown that exercise improves mental health significantly.",
        "phonetic": "/ˈfɜːðəmɔːr ˈstʌdiz hæv ʃoʊn ðæt/",
        "vietnamese_meaning": "Hơn nữa, các nghiên cứu đã chỉ ra rằng...",
        "options": [
          "Bổ sung thông tin, dẫn chứng (Adding information)",
          "Đưa ra kết luận (Concluding)",
          "Phản bác luận điểm (Contrasting)",
          "Giới thiệu chủ đề (Introducing)"
        ],
        "correct_answer": "Bổ sung thông tin, dẫn chứng (Adding information)",
        "hint": "\"Furthermore/Moreover/In addition\" = thêm thông tin/bằng chứng",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_b2_l1_ex2",
        "lesson_id": "en_b2_l1",
        "type": "matching",
        "prompt": "Match linking words with their function:",
        "target_text": "However, Therefore, In addition, For example",
        "target_audio_text": "",
        "phonetic": "Linking words",
        "vietnamese_meaning": "Từ nối học thuật",
        "options": {
          "pairs": [
            {
              "left": "However / Nevertheless",
              "right": "Contrast (tương phản, mặc dù)"
            },
            {
              "left": "Therefore / Consequently",
              "right": "Result/Conclusion (kết quả, vì vậy)"
            },
            {
              "left": "In addition / Furthermore",
              "right": "Adding info (bổ sung thêm)"
            },
            {
              "left": "For example / For instance",
              "right": "Giving examples (ví dụ)"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Memorize 2-3 linking words for each function to vary your writing",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "en_b2_l1_ex3",
        "lesson_id": "en_b2_l1",
        "type": "speaking",
        "prompt": "Press Mic: State your thesis on climate change in one clear sentence:",
        "target_text": "Climate change is the most pressing issue of our time and requires immediate global action.",
        "target_audio_text": "Climate change is the most pressing issue of our time and requires immediate global action.",
        "phonetic": "/ˈklaɪmɪt tʃeɪndʒ ɪz ðə moʊst ˈpresɪŋ ˈɪʃuː əv aʊər taɪm ænd rɪˈkwaɪərz ɪˈmiːdiɪt ˈɡloʊbəl ˈækʃn/",
        "vietnamese_meaning": "Biến đổi khí hậu là vấn đề cấp bách nhất thời đại và đòi hỏi hành động toàn cầu ngay lập tức.",
        "options": [],
        "correct_answer": "Climate change is the most pressing issue of our time and requires immediate global action.",
        "hint": "A thesis statement: Topic + Claim + Reason. Be specific and arguable.",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "en_b2_l2": {
    "id": "en_b2_l2",
    "unit_id": "en_u2_b2",
    "lesson_number": 1,
    "title": "Conditional Sentences: Type 2 & 3",
    "description": "Hypothetical situations and past regrets",
    "xp_reward": 40,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_b2_l2_ex1",
        "lesson_id": "en_b2_l2",
        "type": "listening",
        "prompt": "Listen and identify the type of conditional:",
        "target_text": "Type 2 Conditional",
        "target_audio_text": "If I had more time, I would learn to play the piano.",
        "phonetic": "/ɪf aɪ hæd mɔːr taɪm, aɪ wʊd lɜːrn tuː pleɪ ðə piˈænoʊ/",
        "vietnamese_meaning": "Nếu tôi có nhiều thời gian hơn, tôi sẽ học đàn piano.",
        "options": [
          "Type 2 Conditional (giả định ở hiện tại)",
          "Type 1 Conditional (khả năng có thể xảy ra)",
          "Type 3 Conditional (giả định quá khứ)",
          "Zero Conditional (sự thật chung)"
        ],
        "correct_answer": "Type 2 Conditional (giả định ở hiện tại)",
        "hint": "Type 2: If + past simple, would + verb. Giả định không có thật ở hiện tại.",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_b2_l2_ex2",
        "lesson_id": "en_b2_l2",
        "type": "speaking",
        "prompt": "Press Mic: Use Type 3 Conditional to express a past regret:",
        "target_text": "If I had studied harder, I would have passed the exam.",
        "target_audio_text": "If I had studied harder, I would have passed the exam.",
        "phonetic": "/ɪf aɪ hæd ˈstʌdid ˈhɑːrdər, aɪ wʊd hæv pæst ðə ɪɡˈzæm/",
        "vietnamese_meaning": "Nếu tôi học chăm hơn, tôi đã thi đậu rồi.",
        "options": [],
        "correct_answer": "If I had studied harder, I would have passed the exam.",
        "hint": "Type 3: If + past perfect, would have + past participle. Diễn đạt hối tiếc về quá khứ.",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "en_b2_l2_ex3",
        "lesson_id": "en_b2_l2",
        "type": "matching",
        "prompt": "Match conditional types with their meaning:",
        "target_text": "Type 0, Type 1, Type 2, Type 3",
        "target_audio_text": "",
        "phonetic": "Conditionals",
        "vietnamese_meaning": "Câu điều kiện",
        "options": {
          "pairs": [
            {
              "left": "If you heat water to 100°C, it boils.",
              "right": "Type 0 - Sự thật khoa học"
            },
            {
              "left": "If it rains, I will take an umbrella.",
              "right": "Type 1 - Có thể xảy ra ở tương lai"
            },
            {
              "left": "If I won the lottery, I would travel the world.",
              "right": "Type 2 - Không có thật ở hiện tại"
            },
            {
              "left": "If she had called, I would have answered.",
              "right": "Type 3 - Không có thật ở quá khứ"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Each conditional uses a different verb tense combination",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "en_b2_l3": {
    "id": "en_b2_l3",
    "unit_id": "en_u3_b2",
    "lesson_number": 1,
    "title": "Debate Skills: Argument & Counter-Argument",
    "description": "How to structure a persuasive argument in English",
    "xp_reward": 45,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_b2_l3_ex1",
        "lesson_id": "en_b2_l3",
        "type": "listening",
        "prompt": "Listen and choose the formal transition used to introduce a concession:",
        "target_text": "While the economic benefits are undeniable, environmental costs must not be overlooked.",
        "target_audio_text": "While the economic benefits are undeniable, environmental costs must not be overlooked.",
        "phonetic": "/waɪl ðiː ˌiːkəˈnɒmɪk ˈbɛnɪfɪts ɑːr ˌʌndɪˈnaɪəbəl, ɪnˌvaɪrənˈmɛntəl kɒsts mʌst nɒt biː ˌəʊvəˈlʊkt/",
        "vietnamese_meaning": "Mặc dù lợi ích kinh tế là không thể phủ nhận, nhưng cái giá phải trả về môi trường không được phép xem nhẹ.",
        "options": [
          "Mặc dù lợi ích kinh tế là không thể phủ nhận, nhưng cái giá về môi trường không thể xem nhẹ.",
          "Kinh tế và môi trường luôn phát triển song song hòa hợp.",
          "Lợi ích tài chính là mục tiêu quan trọng nhất của mọi dự án.",
          "Các nhà đầu tư cần ưu tiên lợi nhuận trước mắt."
        ],
        "correct_answer": "Mặc dù lợi ích kinh tế là không thể phủ nhận, nhưng cái giá về môi trường không thể xem nhẹ.",
        "hint": "Undeniable = không thể phủ nhận, overlooked = bị bỏ qua/xem nhẹ",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_b2_l3_ex2",
        "lesson_id": "en_b2_l3",
        "type": "speaking",
        "prompt": "Press Mic and articulate this critical debate statement:",
        "target_text": "On the contrary, empirical evidence strongly suggests the opposite conclusion.",
        "target_audio_text": "On the contrary, empirical evidence strongly suggests the opposite conclusion.",
        "phonetic": "/ɒn ðə ˈkɒntrəri, ɪmˈpɪrɪkəl ˈɛvɪdəns ˈstrɒŋli səˈdʒɛsts ði ˈɒpəzɪt kənˈkluːʒən/",
        "vietnamese_meaning": "Trái lại, bằng chứng thực nghiệm lại chỉ ra kết luận hoàn toàn ngược lại.",
        "options": [],
        "correct_answer": "On the contrary, empirical evidence strongly suggests the opposite conclusion.",
        "hint": "Empirical evidence = bằng chứng thực nghiệm, on the contrary = trái lại",
        "stroke_char": null,
        "order_index": 2
      }
    ]
  },
  "en_c1_l1": {
    "id": "en_c1_l1",
    "unit_id": "en_u1_c1",
    "lesson_number": 1,
    "title": "Academic Word List: Top 50 Words",
    "description": "Essential academic vocabulary with collocations and usage",
    "xp_reward": 50,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_c1_l1_ex1",
        "lesson_id": "en_c1_l1",
        "type": "listening",
        "prompt": "Listen and select the correct collocate: \"conduct a ___\"",
        "target_text": "research",
        "target_audio_text": "The team will conduct a comprehensive research study on climate patterns.",
        "phonetic": "/kənˈdʌkt ə ˈriːsɜːrtʃ ˈstʌdi/",
        "vietnamese_meaning": "Nhóm sẽ tiến hành nghiên cứu toàn diện về mô hình khí hậu.",
        "options": [
          "research (nghiên cứu)",
          "speech (bài phát biểu)",
          "meal (bữa ăn)",
          "friendship (tình bạn)"
        ],
        "correct_answer": "research (nghiên cứu)",
        "hint": "\"Conduct research\" là collocation học thuật phổ biến nhất",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_c1_l1_ex2",
        "lesson_id": "en_c1_l1",
        "type": "matching",
        "prompt": "Match academic verbs with their most common noun collocates:",
        "target_text": "conduct, draw, raise, challenge",
        "target_audio_text": "",
        "phonetic": "Academic collocations",
        "vietnamese_meaning": "Collocation học thuật",
        "options": {
          "pairs": [
            {
              "left": "Conduct",
              "right": "an experiment / research / a study"
            },
            {
              "left": "Draw",
              "right": "a conclusion / an inference / attention"
            },
            {
              "left": "Raise",
              "right": "awareness / a concern / a question"
            },
            {
              "left": "Challenge",
              "right": "an assumption / conventional wisdom / the status quo"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Collocations make your academic writing sound natural and professional",
        "stroke_char": null,
        "order_index": 2
      }
    ]
  },
  "en_c1_l2": {
    "id": "en_c1_l2",
    "unit_id": "en_u2_c1",
    "lesson_number": 1,
    "title": "Listening to Complex Arguments",
    "description": "Identify speaker stance, infer meaning and note key points",
    "xp_reward": 55,
    "type": "reading",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_c1_l2_ex1",
        "lesson_id": "en_c1_l2",
        "type": "listening",
        "prompt": "Listen to the academic discourse and evaluate the underlying assumption:",
        "target_text": "Technological acceleration often outpaces the regulatory frameworks designed to govern it.",
        "target_audio_text": "Technological acceleration often outpaces the regulatory frameworks designed to govern it.",
        "phonetic": "/ˌtɛknəˈlɒdʒɪkəl əkˌsɛləˈreɪʃən ˈɒfən aʊtˈpeɪsɪz ðə ˈrɛɡjʊlətəri ˈfreɪmwɜːks dɪˈzaɪnd tuː ˈɡʌvən ɪt/",
        "vietnamese_meaning": "Tốc độ tăng tốc công nghệ thường vượt xa các khung pháp lý quản lý được thiết kế để điều chỉnh nó.",
        "options": [
          "Tốc độ tăng tốc công nghệ thường vượt xa các khung pháp lý quản lý được thiết kế để điều chỉnh nó.",
          "Luật pháp luôn chủ động định hình hướng đi của các phát minh công nghệ.",
          "Công nghệ và pháp lý luôn đồng bộ một cách tự nhiên trong xã hội hiện đại.",
          "Các cơ quan quản lý cần làm chậm lại sự phát triển của công nghệ."
        ],
        "correct_answer": "Tốc độ tăng tốc công nghệ thường vượt xa các khung pháp lý quản lý được thiết kế để điều chỉnh nó.",
        "hint": "Outpace = vượt mặt chạy nhanh hơn, regulatory frameworks = khung pháp lý",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_c1_l2_ex2",
        "lesson_id": "en_c1_l2",
        "type": "speaking",
        "prompt": "Press Mic and speak the academic conclusion with natural intonation:",
        "target_text": "Consequently, proactive interdisciplinary dialogue is paramount to mitigating systemic risks.",
        "target_audio_text": "Consequently, proactive interdisciplinary dialogue is paramount to mitigating systemic risks.",
        "phonetic": "/ˈkɒnsɪkwəntli, prəʊˈæktɪv ˌɪntədɪsɪˈplɪnəri ˈdaɪəlɒɡ ɪz ˈpærəmaʊnt tuː ˈmɪtɪɡeɪtɪŋ sɪsˈtɛmɪk rɪsks/",
        "vietnamese_meaning": "Do đó, đối thoại liên ngành chủ động là điều tối quan trọng để giảm thiểu các rủi ro mang tính hệ thống.",
        "options": [],
        "correct_answer": "Consequently, proactive interdisciplinary dialogue is paramount to mitigating systemic risks.",
        "hint": "Interdisciplinary = liên ngành, paramount = tối thượng, mitigate = giảm thiểu",
        "stroke_char": null,
        "order_index": 2
      }
    ]
  },
  "en_c2_l1": {
    "id": "en_c2_l1",
    "unit_id": "en_u1_c2",
    "lesson_number": 1,
    "title": "Literary Devices: Metaphor, Irony & Imagery",
    "description": "Identify and analyze literary techniques in English texts",
    "xp_reward": 60,
    "type": "reading",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_c2_l1_ex1",
        "lesson_id": "en_c2_l1",
        "type": "reading",
        "prompt": "Read and identify the literary device: \"Life is a rollercoaster.\"",
        "target_text": "Metaphor",
        "target_audio_text": "Life is a rollercoaster - full of ups and downs, thrills and fears.",
        "phonetic": "/ˈmetəfər/",
        "vietnamese_meaning": "Ẩn dụ - Cuộc đời như tàu lượn",
        "options": [
          "Metaphor (ẩn dụ)",
          "Simile (so sánh dùng like/as)",
          "Personification (nhân cách hóa)",
          "Hyperbole (nói quá)"
        ],
        "correct_answer": "Metaphor (ẩn dụ)",
        "hint": "Metaphor: trực tiếp nói A IS B. Simile: A is LIKE B.",
        "stroke_char": null,
        "order_index": 1
      }
    ]
  },
  "en_c2_l2": {
    "id": "en_c2_l2",
    "unit_id": "en_u2_c2",
    "lesson_number": 1,
    "title": "Advanced Idioms & Phrasal Verbs in Context",
    "description": "30 high-frequency native-level expressions with real examples",
    "xp_reward": 60,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_c2_l2_ex1",
        "lesson_id": "en_c2_l2",
        "type": "listening",
        "prompt": "Listen and choose the meaning of \"bite the bullet\":",
        "target_text": "endure a painful situation bravely",
        "target_audio_text": "I had to bite the bullet and tell my boss the bad news.",
        "phonetic": "/baɪt ðə ˈbʊlɪt/",
        "vietnamese_meaning": "Cắn răng chịu đựng, đối mặt với điều khó khăn",
        "options": [
          "Chịu đựng can đảm",
          "Ăn đạn",
          "Nổi giận dữ dội",
          "Nói thẳng không e ngại"
        ],
        "correct_answer": "Chịu đựng can đảm",
        "hint": "Origin: Civil War soldiers bit on bullets to endure surgery pain",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_c2_l2_ex2",
        "lesson_id": "en_c2_l2",
        "type": "matching",
        "prompt": "Match advanced idioms with their meanings:",
        "target_text": "bite the bullet, break the ice, cut corners, hit the nail on the head",
        "target_audio_text": "",
        "phonetic": "Advanced idioms",
        "vietnamese_meaning": "Thành ngữ nâng cao",
        "options": {
          "pairs": [
            {
              "left": "Bite the bullet",
              "right": "Cắn răng chịu đựng tình huống khó"
            },
            {
              "left": "Break the ice",
              "right": "Phá vỡ sự im lặng/rào cản ban đầu"
            },
            {
              "left": "Cut corners",
              "right": "Làm tắt, bỏ qua bước quan trọng"
            },
            {
              "left": "Hit the nail on the head",
              "right": "Nói/làm chính xác điểm mấu chốt"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Idioms cannot be understood word by word - learn them in context",
        "stroke_char": null,
        "order_index": 2
      }
    ]
  },
  "zh_l_p2": {
    "id": "zh_l_p2",
    "unit_id": "zh_u1_pinyin",
    "lesson_number": 2,
    "title": "Vận Mẫu Đơn (a, o, e, i, u, ü)",
    "description": "Cách mở khẩu hình chuẩn bản xứ Bắc Kinh",
    "xp_reward": 15,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_p2_ex1",
        "lesson_id": "zh_l_p2",
        "type": "listening",
        "prompt": "Nghe và chọn vận mẫu đơn tròn môi đặc biệt:",
        "target_text": "ü",
        "target_audio_text": "ü",
        "phonetic": "ü",
        "vietnamese_meaning": "Vận mẫu ü (đọc tròn môi cố định)",
        "options": [
          "ü",
          "u",
          "i",
          "o"
        ],
        "correct_answer": "ü",
        "hint": "Khẩu hình như huýt sáo, giữ môi tròn không nhúc nhích",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_p2_ex2",
        "lesson_id": "zh_l_p2",
        "type": "speaking",
        "prompt": "Nhấn Micro và phát âm vận mẫu đơn: a:",
        "target_text": "a",
        "target_audio_text": "a",
        "phonetic": "a",
        "vietnamese_meaning": "Vận mẫu a (mở to miệng)",
        "options": [],
        "correct_answer": "a",
        "hint": "Há to miệng tự nhiên và phát âm: a",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_p2_ex3",
        "lesson_id": "zh_l_p2",
        "type": "matching",
        "prompt": "Ghép vận mẫu đơn Pinyin với âm tương đương trong tiếng Việt:",
        "target_text": "a, o, e, ü",
        "target_audio_text": "a o e ü",
        "phonetic": "a, o, e, ü",
        "vietnamese_meaning": "Vận mẫu đơn",
        "options": {
          "pairs": [
            {
              "left": "Vận mẫu a",
              "right": "Đọc giống \"a\" trong tiếng Việt"
            },
            {
              "left": "Vận mẫu o",
              "right": "Đọc giống \"ô\" (hơi lai u)"
            },
            {
              "left": "Vận mẫu e",
              "right": "Đọc giống \"ưa\""
            },
            {
              "left": "Vận mẫu ü",
              "right": "Đọc giống \"uy\" (giữ tròn môi)"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Lưu ý vận mẫu e trong tiếng Trung đọc là ưa",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "zh_l_p5": {
    "id": "zh_l_p5",
    "unit_id": "zh_u2_pinyin",
    "lesson_number": 2,
    "title": "Tập Viết 8 Nét Chữ Hán Căn Bản",
    "description": "Quy tắc từ trên xuống dưới, từ trái sang phải",
    "xp_reward": 20,
    "type": "writing",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_ex_w1",
        "lesson_id": "zh_l_p5",
        "type": "writing",
        "prompt": "Tập viết chữ \"Nhất\" (Số một) - Nét Ngang:",
        "target_text": "一",
        "target_audio_text": "一",
        "phonetic": "yī",
        "vietnamese_meaning": "Số 1",
        "options": [],
        "correct_answer": "一",
        "hint": "Viết từ trái qua phải một nét ngang thẳng dứt khoát",
        "stroke_char": "一",
        "order_index": 1
      },
      {
        "id": "zh_ex_w2",
        "lesson_id": "zh_l_p5",
        "type": "writing",
        "prompt": "Tập viết chữ \"Nhân\" (Con người) - Nét Phẩy và Nét Mác:",
        "target_text": "人",
        "target_audio_text": "人",
        "phonetic": "rén",
        "vietnamese_meaning": "Con người, nhân loại",
        "options": [],
        "correct_answer": "人",
        "hint": "Quy tắc: Nét phẩy bên trái trước, nét mác bên phải sau",
        "stroke_char": "人",
        "order_index": 2
      },
      {
        "id": "zh_ex_w3",
        "lesson_id": "zh_l_p5",
        "type": "writing",
        "prompt": "Tập viết chữ \"Khẩu\" (Cái miệng) - Quy tắc Ngoài trước Trong sau:",
        "target_text": "口",
        "target_audio_text": "口",
        "phonetic": "kǒu",
        "vietnamese_meaning": "Cái miệng, khẩu",
        "options": [],
        "correct_answer": "口",
        "hint": "Sổ trái -> Ngang gập -> Khóa đáy bằng nét ngang",
        "stroke_char": "口",
        "order_index": 3
      }
    ]
  },
  "zh_l_h2": {
    "id": "zh_l_h2",
    "unit_id": "zh_u1_hsk1",
    "lesson_number": 2,
    "title": "Bạn Tên Là Gì? (你叫什么名字？)",
    "description": "Hỏi và trả lời tên, quốc tịch với 我是...",
    "xp_reward": 15,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h2_ex1",
        "lesson_id": "zh_l_h2",
        "type": "listening",
        "prompt": "Nghe và chọn câu dịch tiếng Việt đúng:",
        "target_text": "你叫什么名字？",
        "target_audio_text": "你叫什么名字？",
        "phonetic": "nǐ jiào shénme míngzì?",
        "vietnamese_meaning": "Bạn tên là gì?",
        "options": [
          "Bạn tên là gì?",
          "Bạn đi đâu đấy?",
          "Bạn là người nước nào?",
          "Bạn khỏe không?"
        ],
        "correct_answer": "Bạn tên là gì?",
        "hint": "Cấu trúc hỏi tên: 你叫什么名字？",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h2_ex2",
        "lesson_id": "zh_l_h2",
        "type": "speaking",
        "prompt": "Nhấn Micro và nói: 我叫 Minh (Tôi tên là Minh):",
        "target_text": "我叫",
        "target_audio_text": "我叫",
        "phonetic": "wǒ jiào",
        "vietnamese_meaning": "Tôi tên là...",
        "options": [],
        "correct_answer": "我叫",
        "hint": "wǒ jiào: Tôi tên là...",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h2_ex3",
        "lesson_id": "zh_l_h2",
        "type": "translation",
        "prompt": "Dịch câu sau sang tiếng Trung: \"Tôi là người Việt Nam\"",
        "target_text": "我是越南人",
        "target_audio_text": "我是越南人",
        "phonetic": "wǒ shì Yuènán rén",
        "vietnamese_meaning": "Tôi là người Việt Nam",
        "options": [
          "我是",
          "中国人",
          "越南人",
          "学生",
          "老师"
        ],
        "correct_answer": "我是 越南人",
        "hint": "Chủ ngữ 我 là đại từ ngôi thứ nhất",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "zh_l_h5": {
    "id": "zh_l_h5",
    "unit_id": "zh_u2_hsk1",
    "lesson_number": 2,
    "title": "Hỏi Giá: 这个多少钱？(Bao nhiêu tiền?)",
    "description": "Đi chợ mua sắm và hỏi giá đồ uống",
    "xp_reward": 20,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_l_h5_ex1",
        "lesson_id": "zh_l_h5",
        "type": "listening",
        "prompt": "Nghe và chọn nghĩa tiếng Việt chính xác:",
        "target_text": "这个多少钱？",
        "target_audio_text": "这个多少钱？",
        "phonetic": "zhè ge duōshao qián?",
        "vietnamese_meaning": "Cái này bao nhiêu tiền?",
        "options": [
          "Cái này bao nhiêu tiền?",
          "Cái này là cái gì?",
          "Bạn đi đâu mua đồ?",
          "Tôi không có tiền"
        ],
        "correct_answer": "Cái này bao nhiêu tiền?",
        "hint": "这个 = cái này, 多少 = bao nhiêu, 钱 = tiền",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_l_h5_ex2",
        "lesson_id": "zh_l_h5",
        "type": "speaking",
        "prompt": "Nhấn Micro và nói câu mặc cả: \"Đắt quá, bớt chút đi\":",
        "target_text": "太贵了，便宜一点吧。",
        "target_audio_text": "太贵了，便宜一点吧。",
        "phonetic": "tài guì le, piányi yīdiǎn ba.",
        "vietnamese_meaning": "Đắt quá, bớt chút đi.",
        "options": [],
        "correct_answer": "太贵了，便宜一点吧。",
        "hint": "贵 = đắt, 便宜 = rẻ",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_l_h5_ex3",
        "lesson_id": "zh_l_h5",
        "type": "matching",
        "prompt": "Nối các từ mua sắm với nghĩa tiếng Việt:",
        "target_text": "多少钱,块,太贵了,便宜",
        "target_audio_text": "duōshao qián kuài tài guì le piányi",
        "phonetic": "duōshao qián, kuài, tài guì le, piányi",
        "vietnamese_meaning": "Từ vựng hỏi giá và mua sắm",
        "options": {
          "pairs": [
            {
              "left": "多少钱 (duōshao qián)",
              "right": "Bao nhiêu tiền"
            },
            {
              "left": "块 (kuài)",
              "right": "Đồng / Tệ (tiền tệ)"
            },
            {
              "left": "太贵了 (tài guì le)",
              "right": "Đắt quá rồi"
            },
            {
              "left": "便宜 (piányi)",
              "right": "Rẻ, giá phải chăng"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "块 là lượng từ chỉ đơn vị tiền tệ khẩu ngữ",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_l_h5_ex4",
        "lesson_id": "zh_l_h5",
        "type": "translation",
        "prompt": "Sắp xếp các thẻ từ thành câu dịch: \"Táo một cân bao nhiêu tiền?\":",
        "target_text": "苹果一斤多少钱？",
        "target_audio_text": "苹果一斤多少钱？",
        "phonetic": "píngguǒ yī jīn duōshao qián?",
        "vietnamese_meaning": "Táo một cân bao nhiêu tiền?",
        "options": [
          "苹果",
          "一斤",
          "多少",
          "钱",
          "西瓜",
          "太贵"
        ],
        "correct_answer": "苹果 一斤 多少 钱",
        "hint": "苹果 = quả táo, 一斤 = 1 cân (nửa kg TQ)",
        "stroke_char": null,
        "order_index": 4
      },
      {
        "id": "zh_l_h5_ex5",
        "lesson_id": "zh_l_h5",
        "type": "writing",
        "prompt": "Tập viết chữ Hán 钱 (Tiền) theo đúng thứ tự nét:",
        "target_text": "钱",
        "target_audio_text": "钱",
        "phonetic": "qián",
        "vietnamese_meaning": "Tiền bạc, tiền tài",
        "options": [],
        "correct_answer": "钱",
        "hint": "Chữ 钱 gồm bộ Kim (钅) bên trái biểu thị kim loại quý giá",
        "stroke_char": "钱",
        "order_index": 5
      }
    ]
  },
  "en_l_ipa2": {
    "id": "en_l_ipa2",
    "unit_id": "en_u1_ipa",
    "lesson_number": 2,
    "title": "Cặp Âm /æ/ (cat) vs /e/ (bed)",
    "description": "Kỹ thuật hạ cằm để phát âm chuẩn âm e bẹt",
    "xp_reward": 15,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_ipa2_ex1",
        "lesson_id": "en_l_ipa2",
        "type": "listening",
        "prompt": "Listen and select the word with open /æ/ sound:",
        "target_text": "cat",
        "target_audio_text": "cat",
        "phonetic": "/kæt/",
        "vietnamese_meaning": "Con mèo (âm e bẹt /æ/)",
        "options": [
          "cat (/kæt/)",
          "bed (/bed/)",
          "cut (/kʌt/)",
          "cot (/kɒt/)"
        ],
        "correct_answer": "cat (/kæt/)",
        "hint": "Hạ cằm dưới mở rộng khẩu hình phát âm e bẹt",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_ipa2_ex2",
        "lesson_id": "en_l_ipa2",
        "type": "speaking",
        "prompt": "Press Mic and pronounce: cat:",
        "target_text": "cat",
        "target_audio_text": "cat",
        "phonetic": "/kæt/",
        "vietnamese_meaning": "Con mèo",
        "options": [],
        "correct_answer": "cat",
        "hint": "Lower your jaw for the clear /æ/ sound",
        "stroke_char": null,
        "order_index": 2
      }
    ]
  },
  "en_l_a1_2": {
    "id": "en_l_a1_2",
    "unit_id": "en_u1_a1",
    "lesson_number": 2,
    "title": "Where Are You From?",
    "description": "Countries, nationalities and where you live",
    "xp_reward": 15,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_l_a1_2_ex1",
        "lesson_id": "en_l_a1_2",
        "type": "listening",
        "prompt": "Listen and choose the correct answer to \"Where are you from?\":",
        "target_text": "I am from Vietnam.",
        "target_audio_text": "I am from Vietnam.",
        "phonetic": "/aɪ æm frɒm ˌvjɛtˈnɑːm/",
        "vietnamese_meaning": "Tôi đến từ Việt Nam.",
        "options": [
          "I am from Vietnam.",
          "I am fine, thank you.",
          "My name is Nam.",
          "I am 20 years old."
        ],
        "correct_answer": "I am from Vietnam.",
        "hint": "Cấu trúc trả lời quê hương: I am from + Tên quốc gia",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_l_a1_2_ex2",
        "lesson_id": "en_l_a1_2",
        "type": "speaking",
        "prompt": "Press Mic and state your nationality:",
        "target_text": "I am Vietnamese and I live in Hanoi.",
        "target_audio_text": "I am Vietnamese and I live in Hanoi.",
        "phonetic": "/aɪ æm ˌvjɛtnəˈmiːz ænd aɪ lɪv ɪn hæˈnɔɪ/",
        "vietnamese_meaning": "Tôi là người Việt Nam và tôi sống ở Hà Nội.",
        "options": [],
        "correct_answer": "I am Vietnamese and I live in Hanoi.",
        "hint": "Vietnamese là quốc tịch, Vietnam là tên đất nước",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "en_l_a1_2_ex3",
        "lesson_id": "en_l_a1_2",
        "type": "matching",
        "prompt": "Match countries with their nationalities:",
        "target_text": "Vietnam,England,Japan,France",
        "target_audio_text": "Vietnam, England, Japan, France",
        "phonetic": "Countries and Nationalities",
        "vietnamese_meaning": "Quốc gia và Quốc tịch A1",
        "options": {
          "pairs": [
            {
              "left": "Vietnam",
              "right": "Vietnamese"
            },
            {
              "left": "England",
              "right": "English"
            },
            {
              "left": "Japan",
              "right": "Japanese"
            },
            {
              "left": "France",
              "right": "French"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Ghép cặp quốc gia và người/tiếng nước đó",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "zh_h2_l2": {
    "id": "zh_h2_l2",
    "unit_id": "zh_u1_hsk2",
    "lesson_number": 2,
    "title": "Nghề Nghiệp: 你做什么工作？",
    "description": "Hỏi và mô tả nghề nghiệp, nơi làm việc",
    "xp_reward": 20,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h2_l2_ex1",
        "lesson_id": "zh_h2_l2",
        "type": "listening",
        "prompt": "Nghe và chọn nghề nghiệp: 医生 (yīshēng) có nghĩa là:",
        "target_text": "医生",
        "target_audio_text": "医生",
        "phonetic": "yīshēng",
        "vietnamese_meaning": "Bác sĩ",
        "options": [
          "Bác sĩ",
          "Giáo viên",
          "Kỹ sư",
          "Luật sư"
        ],
        "correct_answer": "Bác sĩ",
        "hint": "医 = y tế, 生 = người học/bác sĩ",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h2_l2_ex2",
        "lesson_id": "zh_h2_l2",
        "type": "speaking",
        "prompt": "Nhấn Micro và trả lời câu hỏi: 你做什么工作？(Bạn làm gì?)",
        "target_text": "我是老师",
        "target_audio_text": "我是老师",
        "phonetic": "wǒ shì lǎoshī",
        "vietnamese_meaning": "Tôi là giáo viên",
        "options": [],
        "correct_answer": "我是老师",
        "hint": "老师 = lǎoshī (giáo viên), phổ biến nhất trong HSK2",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h2_l2_ex3",
        "lesson_id": "zh_h2_l2",
        "type": "matching",
        "prompt": "Ghép nghề nghiệp với tiếng Việt:",
        "target_text": "老师,学生,医生,工程师",
        "target_audio_text": "lǎoshī xuéshēng yīshēng gōngchéngshī",
        "phonetic": "Nghề nghiệp",
        "vietnamese_meaning": "Từ vựng nghề nghiệp",
        "options": {
          "pairs": [
            {
              "left": "老师 (lǎoshī)",
              "right": "Giáo viên"
            },
            {
              "left": "学生 (xuéshēng)",
              "right": "Học sinh/Sinh viên"
            },
            {
              "left": "医生 (yīshēng)",
              "right": "Bác sĩ"
            },
            {
              "left": "工程师 (gōngchéngshī)",
              "right": "Kỹ sư"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "工程师 = kỹ sư, 3 chữ Hán ghép lại",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h2_l2_ex4",
        "lesson_id": "zh_h2_l2",
        "type": "translation",
        "prompt": "Dịch câu sau sang tiếng Trung: \"Anh ấy làm việc ở bệnh viện\":",
        "target_text": "他在医院工作",
        "target_audio_text": "他在医院工作",
        "phonetic": "tā zài yīyuàn gōngzuò",
        "vietnamese_meaning": "Anh ấy làm việc ở bệnh viện",
        "options": [
          "他",
          "在",
          "医院",
          "工作",
          "学校",
          "公司"
        ],
        "correct_answer": "他 在 医院 工作",
        "hint": "在 = ở/tại, 医院 = bệnh viện",
        "stroke_char": null,
        "order_index": 4
      }
    ]
  },
  "zh_h2_l5": {
    "id": "zh_h2_l5",
    "unit_id": "zh_u2_hsk2",
    "lesson_number": 2,
    "title": "Bốn Mùa & Thời Tiết: 春夏秋冬",
    "description": "Mô tả thời tiết và các mùa trong năm",
    "xp_reward": 20,
    "type": "standard",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h2_l5_ex1",
        "lesson_id": "zh_h2_l5",
        "type": "listening",
        "prompt": "Nghe và chọn nghĩa đúng: 今天天气怎么样？",
        "target_text": "今天天气怎么样",
        "target_audio_text": "今天天气怎么样",
        "phonetic": "jīntiān tiānqì zěnme yàng",
        "vietnamese_meaning": "Hôm nay thời tiết thế nào?",
        "options": [
          "Hôm nay thời tiết thế nào?",
          "Hôm nay mấy giờ?",
          "Ngày mai bạn đi đâu?",
          "Mùa nào đẹp nhất?"
        ],
        "correct_answer": "Hôm nay thời tiết thế nào?",
        "hint": "天气 = thời tiết, 怎么样 = như thế nào",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h2_l5_ex2",
        "lesson_id": "zh_h2_l5",
        "type": "speaking",
        "prompt": "Nhấn Micro và nói câu: Hôm nay trời lạnh lắm:",
        "target_text": "今天很冷",
        "target_audio_text": "今天很冷",
        "phonetic": "jīntiān hěn lěng",
        "vietnamese_meaning": "Hôm nay rất lạnh",
        "options": [],
        "correct_answer": "今天很冷",
        "hint": "冷 = lạnh, 热 = nóng, 凉快 = mát mẻ",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h2_l5_ex3",
        "lesson_id": "zh_h2_l5",
        "type": "matching",
        "prompt": "Ghép từ thời tiết với nghĩa tiếng Việt:",
        "target_text": "晴,雨,雪,风",
        "target_audio_text": "qíng yǔ xuě fēng",
        "phonetic": "Thời tiết",
        "vietnamese_meaning": "Từ vựng thời tiết",
        "options": {
          "pairs": [
            {
              "left": "晴 (qíng)",
              "right": "Trời nắng, quang đãng"
            },
            {
              "left": "雨 (yǔ)",
              "right": "Mưa"
            },
            {
              "left": "雪 (xuě)",
              "right": "Tuyết"
            },
            {
              "left": "风 (fēng)",
              "right": "Gió"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "下雨 = trời mưa, 下雪 = trời tuyết",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h2_l5_ex4",
        "lesson_id": "zh_h2_l5",
        "type": "translation",
        "prompt": "Dịch câu sau sang tiếng Trung: \"Mùa xuân ở Hà Nội rất đẹp\":",
        "target_text": "河内的春天很美",
        "target_audio_text": "河内的春天很美",
        "phonetic": "Hénèi de chūntiān hěn měi",
        "vietnamese_meaning": "Hà Nội mùa xuân rất đẹp",
        "options": [
          "河内",
          "的",
          "春天",
          "很",
          "美",
          "夏天",
          "秋天"
        ],
        "correct_answer": "河内 的 春天 很 美",
        "hint": "春天 = mùa xuân, 的 = trợ từ sở hữu",
        "stroke_char": null,
        "order_index": 4
      }
    ]
  },
  "zh_h2_l7": {
    "id": "zh_h2_l7",
    "unit_id": "zh_u3_hsk2",
    "lesson_number": 2,
    "title": "Phương Tiện Giao Thông: 出租车，公共汽车",
    "description": "Từ vựng và câu hội thoại đi taxi và xe buýt",
    "xp_reward": 25,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h2_l7_ex1",
        "lesson_id": "zh_h2_l7",
        "type": "listening",
        "prompt": "Nghe và chọn nghĩa chính xác:",
        "target_text": "我们坐出租车去火车站吧。",
        "target_audio_text": "我们坐出租车去火车站吧。",
        "phonetic": "wǒmen zuò chūzūchē qù huǒchēzhàn ba.",
        "vietnamese_meaning": "Chúng ta đi taxi đến ga tàu hỏa nhé.",
        "options": [
          "Chúng ta đi taxi đến ga tàu hỏa nhé.",
          "Chúng ta đi xe buýt đến sân bay nhé.",
          "Tôi muốn mua vé tàu điện ngầm.",
          "Ga tàu hỏa ở rất xa đây."
        ],
        "correct_answer": "Chúng ta đi taxi đến ga tàu hỏa nhé.",
        "hint": "出租车 = taxi, 火车站 = ga tàu hỏa",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h2_l7_ex2",
        "lesson_id": "zh_h2_l7",
        "type": "speaking",
        "prompt": "Nhấn Micro và nói: \"Đi xe buýt rất thuận tiện\":",
        "target_text": "坐公共汽车很方便。",
        "target_audio_text": "坐公共汽车很方便。",
        "phonetic": "zuò gōnggòng qìchē hěn fāngbiàn.",
        "vietnamese_meaning": "Đi xe buýt rất thuận tiện.",
        "options": [],
        "correct_answer": "坐公共汽车很方便。",
        "hint": "公共汽车 = xe buýt, 方便 = thuận tiện",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h2_l7_ex3",
        "lesson_id": "zh_h2_l7",
        "type": "matching",
        "prompt": "Nối các loại phương tiện với nghĩa tiếng Việt:",
        "target_text": "出租车,公共汽车,火车站,机场",
        "target_audio_text": "chūzūchē gōnggòng qìchē huǒchēzhàn jīchǎng",
        "phonetic": "chūzūchē, gōnggòng qìchē, huǒchēzhàn, jīchǎng",
        "vietnamese_meaning": "Từ vựng phương tiện di chuyển",
        "options": {
          "pairs": [
            {
              "left": "出租车 (chūzūchē)",
              "right": "Xe taxi"
            },
            {
              "left": "公共汽车 (gōnggòng qìchē)",
              "right": "Xe buýt"
            },
            {
              "left": "火车站 (huǒchēzhàn)",
              "right": "Ga tàu hỏa"
            },
            {
              "left": "机场 (jīchǎng)",
              "right": "Sân bay"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "车 = xe, 站 = trạm/ga",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h2_l7_ex4",
        "lesson_id": "zh_h2_l7",
        "type": "translation",
        "prompt": "Sắp xếp câu: \"Anh ấy mỗi ngày đi tàu điện ngầm đi làm\":",
        "target_text": "他每天坐地铁上班。",
        "target_audio_text": "他每天坐地铁上班。",
        "phonetic": "tā měitiān zuò dìtiě shàngbān.",
        "vietnamese_meaning": "Anh ấy mỗi ngày đi tàu điện ngầm đi làm.",
        "options": [
          "他",
          "每天",
          "坐",
          "地铁",
          "上班",
          "开车",
          "学校"
        ],
        "correct_answer": "他 每天 坐 地铁 上班",
        "hint": "每天 = mỗi ngày, 地铁 = tàu điện ngầm, 上班 = đi làm",
        "stroke_char": null,
        "order_index": 4
      },
      {
        "id": "zh_h2_l7_ex5",
        "lesson_id": "zh_h2_l7",
        "type": "writing",
        "prompt": "Tập viết chữ Hán 车 (Xe cộ):",
        "target_text": "车",
        "target_audio_text": "车",
        "phonetic": "chē",
        "vietnamese_meaning": "Xe cộ, phương tiện",
        "options": [],
        "correct_answer": "车",
        "hint": "Chữ 车 mô phỏng chiếc xe cổ gồm 4 nét cơ bản",
        "stroke_char": "车",
        "order_index": 5
      }
    ]
  },
  "zh_h3_l2": {
    "id": "zh_h3_l2",
    "unit_id": "zh_u1_hsk3",
    "lesson_number": 2,
    "title": "Thích & Không Thích: 喜欢 vs 不喜欢",
    "description": "Bày tỏ sở thích về ẩm thực, thể thao và âm nhạc",
    "xp_reward": 25,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h3_l2_ex1",
        "lesson_id": "zh_h3_l2",
        "type": "listening",
        "prompt": "Nghe và chọn nghĩa chính xác:",
        "target_text": "除了看书以外，我还喜欢听音乐。",
        "target_audio_text": "除了看书以外，我还喜欢听音乐。",
        "phonetic": "chúle kànshū yǐwài, wǒ hái xǐhuan tīng yīnyuè.",
        "vietnamese_meaning": "Ngoài đọc sách ra, tôi còn thích nghe nhạc.",
        "options": [
          "Ngoài đọc sách ra, tôi còn thích nghe nhạc.",
          "Tôi thích đọc sách hơn nghe nhạc.",
          "Tôi chỉ thích xem phim cùng bạn bè.",
          "Nghe nhạc giúp tôi đọc sách tập trung hơn."
        ],
        "correct_answer": "Ngoài đọc sách ra, tôi còn thích nghe nhạc.",
        "hint": "Cấu trúc 除了...以外，还... nghĩa là Ngoài... ra, còn...",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h3_l2_ex2",
        "lesson_id": "zh_h3_l2",
        "type": "speaking",
        "prompt": "Nhấn Micro và nói: \"Tôi rất có hứng thú với văn hóa Trung Quốc\":",
        "target_text": "我对中国文化很感兴趣。",
        "target_audio_text": "我对中国文化很感兴趣。",
        "phonetic": "wǒ duì zhōngguó wénhuà hěn gǎn xìngqù.",
        "vietnamese_meaning": "Tôi rất có hứng thú với văn hóa Trung Quốc.",
        "options": [],
        "correct_answer": "我对中国文化很感兴趣。",
        "hint": "对...感兴趣 = có hứng thú với cái gì",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h3_l2_ex3",
        "lesson_id": "zh_h3_l2",
        "type": "matching",
        "prompt": "Nối các từ sở thích với nghĩa tiếng Việt:",
        "target_text": "感兴趣,爱好,音乐,运动",
        "target_audio_text": "gǎn xìngqù àihào yīnyuè yùndòng",
        "phonetic": "gǎn xìngqù, àihào, yīnyuè, yùndòng",
        "vietnamese_meaning": "Từ vựng sở thích HSK3",
        "options": {
          "pairs": [
            {
              "left": "感兴趣 (gǎn xìngqù)",
              "right": "Có hứng thú"
            },
            {
              "left": "爱好 (àihào)",
              "right": "Sở thích"
            },
            {
              "left": "音乐 (yīnyuè)",
              "right": "Âm nhạc"
            },
            {
              "left": "运动 (yùndòng)",
              "right": "Thể thao, vận động"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Ghép đúng cặp từ chỉ sở thích",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h3_l2_ex4",
        "lesson_id": "zh_h3_l2",
        "type": "translation",
        "prompt": "Sắp xếp câu: \"Mặc dù rất mệt, nhưng tôi rất vui vẻ\":",
        "target_text": "虽然很累，但是我很高兴。",
        "target_audio_text": "虽然很累，但是我很高兴。",
        "phonetic": "suīrán hěn lèi, dànshì wǒ hěn gāoxìng.",
        "vietnamese_meaning": "Mặc dù rất mệt, nhưng tôi rất vui vẻ.",
        "options": [
          "虽然",
          "很累",
          "但是",
          "我",
          "很",
          "高兴",
          "喜欢",
          "难过"
        ],
        "correct_answer": "虽然 很累 但是 我 很 高兴",
        "hint": "Cặp từ nối: 虽然...但是... (Mặc dù... nhưng...)",
        "stroke_char": null,
        "order_index": 4
      },
      {
        "id": "zh_h3_l2_ex5",
        "lesson_id": "zh_h3_l2",
        "type": "writing",
        "prompt": "Tập viết chữ Hán 乐 (Âm nhạc / Vui vẻ):",
        "target_text": "乐",
        "target_audio_text": "乐",
        "phonetic": "lè / yuè",
        "vietnamese_meaning": "Âm nhạc, vui mừng, lạc quan",
        "options": [],
        "correct_answer": "乐",
        "hint": "Chữ 乐 gồm 5 nét, có 2 cách đọc: yuè (âm nhạc) và lè (vui vẻ)",
        "stroke_char": "乐",
        "order_index": 5
      }
    ]
  },
  "zh_h3_l4": {
    "id": "zh_h3_l4",
    "unit_id": "zh_u2_hsk3",
    "lesson_number": 2,
    "title": "Đặt Vé & Khách Sạn",
    "description": "Đặt vé tàu, máy bay và phòng khách sạn qua điện thoại",
    "xp_reward": 30,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h3_l4_ex1",
        "lesson_id": "zh_h3_l4",
        "type": "listening",
        "prompt": "Nghe và chọn câu đối thoại logic nhất:",
        "target_text": "请问，还有去北京的双人间吗？",
        "target_audio_text": "请问，还有去北京的双人间吗？",
        "phonetic": "qǐngwèn, hái yǒu qù běijīng de shuāngrénjiān ma?",
        "vietnamese_meaning": "Xin hỏi, còn phòng đôi khách sạn không?",
        "options": [
          "Xin hỏi, còn phòng đôi khách sạn không?",
          "Xin hỏi, vé máy bay giá bao nhiêu?",
          "Bạn có mang theo hộ chiếu không?",
          "Khách sạn này có bữa sáng miễn phí không?"
        ],
        "correct_answer": "Xin hỏi, còn phòng đôi khách sạn không?",
        "hint": "双人间 = phòng đôi cho 2 người",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h3_l4_ex2",
        "lesson_id": "zh_h3_l4",
        "type": "speaking",
        "prompt": "Nhấn Micro và nói: \"Tôi muốn đặt một tấm vé máy bay đi Thượng Hải\":",
        "target_text": "我想预订一张去上海的机票。",
        "target_audio_text": "我想预订一张去上海的机票。",
        "phonetic": "wǒ xiǎng yùdìng yī zhāng qù shànghǎi de jīpiào.",
        "vietnamese_meaning": "Tôi muốn đặt một tấm vé máy bay đi Thượng Hải.",
        "options": [],
        "correct_answer": "我想预订一张去上海的机票。",
        "hint": "预订 = đặt trước, 机票 = vé máy bay, 张 = lượng từ tờ/vé",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h3_l4_ex3",
        "lesson_id": "zh_h3_l4",
        "type": "matching",
        "prompt": "Nối các từ du lịch và khách sạn:",
        "target_text": "预订,护照,宾馆,行李",
        "target_audio_text": "yùdìng hùzhào bīnguǎn xíngli",
        "phonetic": "yùdìng, hùzhào, bīnguǎn, xíngli",
        "vietnamese_meaning": "Từ vựng đặt vé khách sạn",
        "options": {
          "pairs": [
            {
              "left": "预订 (yùdìng)",
              "right": "Đặt phòng / Đặt vé"
            },
            {
              "left": "护照 (hùzhào)",
              "right": "Hộ chiếu passport"
            },
            {
              "left": "宾馆 (bīnguǎn)",
              "right": "Khách sạn"
            },
            {
              "left": "行李 (xíngli)",
              "right": "Hành lý vali"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "护 = bảo hộ, 照 = giấy tờ chứng nhận",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h3_l4_ex4",
        "lesson_id": "zh_h3_l4",
        "type": "translation",
        "prompt": "Sắp xếp câu: \"Chúng tôi đã đặt trước hai phòng rồi\":",
        "target_text": "我们已经预订了两个房间。",
        "target_audio_text": "我们已经预订了两个房间。",
        "phonetic": "wǒmen yǐjīng yùdìng le liǎng gè fángjiān.",
        "vietnamese_meaning": "Chúng tôi đã đặt trước hai phòng rồi.",
        "options": [
          "我们",
          "已经",
          "预订",
          "了",
          "两个",
          "房间",
          "宾馆",
          "护照"
        ],
        "correct_answer": "我们 已经 预订 了 两个 房间",
        "hint": "已经...了 = đã... rồi, 房间 = căn phòng",
        "stroke_char": null,
        "order_index": 4
      },
      {
        "id": "zh_h3_l4_ex5",
        "lesson_id": "zh_h3_l4",
        "type": "writing",
        "prompt": "Tập viết chữ Hán 票 (Tấm vé):",
        "target_text": "票",
        "target_audio_text": "票",
        "phonetic": "piào",
        "vietnamese_meaning": "Vé xe, phiếu, ngân phiếu",
        "options": [],
        "correct_answer": "票",
        "hint": "Chữ 票 gồm bộ Tây (西) biến thể bên trên và bộ Kỳ (示) bên dưới",
        "stroke_char": "票",
        "order_index": 5
      }
    ]
  },
  "zh_h4_l2": {
    "id": "zh_h4_l2",
    "unit_id": "zh_u1_hsk4",
    "lesson_number": 2,
    "title": "Viết Email Công Việc bằng Tiếng Trung",
    "description": "Cách viết email trang trọng, yêu cầu và phản hồi",
    "xp_reward": 35,
    "type": "writing",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h4_l2_ex1",
        "lesson_id": "zh_h4_l2",
        "type": "listening",
        "prompt": "Nghe và chọn nội dung thông điệp công việc:",
        "target_text": "请查收附件中的会议纪要。",
        "target_audio_text": "请查收附件中的会议纪要。",
        "phonetic": "qǐng cháshōu fùjiàn zhōng de huìyì jìyào.",
        "vietnamese_meaning": "Vui lòng kiểm tra biên bản cuộc họp trong tệp đính kèm.",
        "options": [
          "Vui lòng kiểm tra biên bản cuộc họp trong tệp đính kèm.",
          "Cuộc họp hôm nay sẽ bắt đầu lúc 3 giờ chiều.",
          "Xin gửi lại hợp đồng đã có chữ ký đại diện.",
          "Kính gửi đối tác kế hoạch phát triển mới."
        ],
        "correct_answer": "Vui lòng kiểm tra biên bản cuộc họp trong tệp đính kèm.",
        "hint": "查收 = kiểm tra nhận, 附件 = tệp đính kèm",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h4_l2_ex2",
        "lesson_id": "zh_h4_l2",
        "type": "speaking",
        "prompt": "Nhấn Micro và đọc câu kết thúc email chuyên nghiệp:",
        "target_text": "期待您的回复与合作。",
        "target_audio_text": "期待您的回复与合作。",
        "phonetic": "qīdài nín de huífù yǔ hézuò.",
        "vietnamese_meaning": "Rất mong nhận được phản hồi và sự hợp tác của ngài.",
        "options": [],
        "correct_answer": "期待您的回复与合作。",
        "hint": "期待 = kỳ vọng mong đợi, 回复 = hồi âm, 合作 = hợp tác",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h4_l2_ex3",
        "lesson_id": "zh_h4_l2",
        "type": "matching",
        "prompt": "Nối thuật ngữ văn phòng và email công việc:",
        "target_text": "附件,会议纪要,合作,联系",
        "target_audio_text": "fùjiàn huìyì jìyào hézuò liánxì",
        "phonetic": "fùjiàn, huìyì jìyào, hézuò, liánxì",
        "vietnamese_meaning": "Thuật ngữ thư từ công việc HSK4",
        "options": {
          "pairs": [
            {
              "left": "附件 (fùjiàn)",
              "right": "Tệp file đính kèm"
            },
            {
              "left": "会议纪要 (huìyì jìyào)",
              "right": "Biên bản cuộc họp"
            },
            {
              "left": "合作 (hézuò)",
              "right": "Hợp tác đối tác"
            },
            {
              "left": "联系 (liánxì)",
              "right": "Liên lạc, liên hệ"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Từ vựng quan trọng trong giao tiếp thương mại",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h4_l2_ex4",
        "lesson_id": "zh_h4_l2",
        "type": "translation",
        "prompt": "Sắp xếp câu: \"Nếu có bất kỳ vấn đề gì, vui lòng liên hệ với tôi bất cứ lúc nào\":",
        "target_text": "如果有任何问题，请随时联系我。",
        "target_audio_text": "如果有任何问题，请随时联系我。",
        "phonetic": "rúguǒ yǒu rènhé wèntí, qǐng suíshí liánxì wǒ.",
        "vietnamese_meaning": "Nếu có bất kỳ vấn đề gì, vui lòng liên hệ với tôi bất cứ lúc nào.",
        "options": [
          "如果",
          "有",
          "任何",
          "问题",
          "请",
          "随时",
          "联系",
          "我",
          "合作"
        ],
        "correct_answer": "如果 有 任何 问题 请 随时 联系 我",
        "hint": "任何 = bất kỳ, 随时 = bất cứ lúc nào",
        "stroke_char": null,
        "order_index": 4
      },
      {
        "id": "zh_h4_l2_ex5",
        "lesson_id": "zh_h4_l2",
        "type": "writing",
        "prompt": "Tập viết chữ Hán 复 (Hồi phục / Phúc đáp email):",
        "target_text": "复",
        "target_audio_text": "复",
        "phonetic": "fù",
        "vietnamese_meaning": "Hồi âm, phúc đáp, lặp lại",
        "options": [],
        "correct_answer": "复",
        "hint": "Chữ 复 trong 回复 (hồi âm email) hoặc 复杂 (phức tạp)",
        "stroke_char": "复",
        "order_index": 5
      }
    ]
  },
  "en_a2_l2": {
    "id": "en_a2_l2",
    "unit_id": "en_u1_a2",
    "lesson_number": 2,
    "title": "Booking a Hotel Room",
    "description": "Make reservations and describe room preferences",
    "xp_reward": 20,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_a2_l2_ex1",
        "lesson_id": "en_a2_l2",
        "type": "listening",
        "prompt": "Listen and choose what the guest is asking for:",
        "target_text": "single room",
        "target_audio_text": "I'd like to book a single room for two nights, please.",
        "phonetic": "/aɪd laɪk tuː bʊk ə ˈsɪŋɡl ruːm/",
        "vietnamese_meaning": "Tôi muốn đặt phòng đơn trong 2 đêm.",
        "options": [
          "Phòng đơn 2 đêm",
          "Phòng đôi 3 đêm",
          "Phòng có view biển",
          "Phòng khuyết tật"
        ],
        "correct_answer": "Phòng đơn 2 đêm",
        "hint": "single room = phòng đơn, double room = phòng đôi",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_a2_l2_ex2",
        "lesson_id": "en_a2_l2",
        "type": "speaking",
        "prompt": "Press Mic: Book a double room for 3 nights:",
        "target_text": "I'd like to book a double room for three nights.",
        "target_audio_text": "I'd like to book a double room for three nights.",
        "phonetic": "/aɪd laɪk tuː bʊk ə ˈdʌbl ruːm fɔː θriː naɪts/",
        "vietnamese_meaning": "Tôi muốn đặt phòng đôi 3 đêm.",
        "options": [],
        "correct_answer": "I'd like to book a double room for three nights.",
        "hint": "I'd like to... = Tôi muốn... (lịch sự hơn I want)",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "en_a2_l2_ex3",
        "lesson_id": "en_a2_l2",
        "type": "matching",
        "prompt": "Match hotel vocabulary with Vietnamese meanings:",
        "target_text": "check-in, check-out, room service, reception",
        "target_audio_text": "check-in check-out room service reception",
        "phonetic": "Hotel",
        "vietnamese_meaning": "Từ vựng khách sạn",
        "options": {
          "pairs": [
            {
              "left": "Check-in",
              "right": "Nhận phòng"
            },
            {
              "left": "Check-out",
              "right": "Trả phòng"
            },
            {
              "left": "Room service",
              "right": "Phục vụ tại phòng"
            },
            {
              "left": "Reception",
              "right": "Lễ tân"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Check-in time is usually 2pm, check-out at 12pm",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "en_a2_l4": {
    "id": "en_a2_l4",
    "unit_id": "en_u2_a2",
    "lesson_number": 2,
    "title": "Shopping: Prices & Bargaining",
    "description": "Ask about prices, sizes and make purchases",
    "xp_reward": 25,
    "type": "speaking",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_a2_l4_ex1",
        "lesson_id": "en_a2_l4",
        "type": "listening",
        "prompt": "Listen and choose the meaning of \"How much does this cost?\":",
        "target_text": "How much does this cost?",
        "target_audio_text": "How much does this cost?",
        "phonetic": "/haʊ mʌtʃ dʌz ðɪs kɒst/",
        "vietnamese_meaning": "Cái này giá bao nhiêu tiền?",
        "options": [
          "Cái này giá bao nhiêu tiền?",
          "Bạn có giảm giá không?",
          "Cửa hàng mấy giờ đóng cửa?",
          "Tôi muốn đổi chiếc áo này."
        ],
        "correct_answer": "Cái này giá bao nhiêu tiền?",
        "hint": "How much = bao nhiêu tiền",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_a2_l4_ex2",
        "lesson_id": "en_a2_l4",
        "type": "speaking",
        "prompt": "Press Mic and politely ask for a discount:",
        "target_text": "Could you give me a discount, please?",
        "target_audio_text": "Could you give me a discount, please?",
        "phonetic": "/kʊd juː ɡɪv miː ə ˈdɪskaʊnt pliːz/",
        "vietnamese_meaning": "Bạn có thể giảm giá cho tôi một chút được không?",
        "options": [],
        "correct_answer": "Could you give me a discount, please?",
        "hint": "Discount = giảm giá, Could you = lời đề nghị lịch sự",
        "stroke_char": null,
        "order_index": 2
      }
    ]
  },
  "en_b1_l2": {
    "id": "en_b1_l2",
    "unit_id": "en_u1_b1",
    "lesson_number": 2,
    "title": "Writing a Professional Email",
    "description": "Formal email structure, openings and closings",
    "xp_reward": 30,
    "type": "writing",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_b1_l2_ex1",
        "lesson_id": "en_b1_l2",
        "type": "listening",
        "prompt": "Listen to the formal email opening and choose its meaning:",
        "target_text": "I am writing to inquire about the project deadline.",
        "target_audio_text": "I am writing to inquire about the project deadline.",
        "phonetic": "/aɪ æm ˈraɪtɪŋ tuː ɪnˈkwaɪər əˈbaʊt ðə ˈprɒdʒɛkt ˈdɛdlaɪn/",
        "vietnamese_meaning": "Tôi viết thư này để hỏi thăm về thời hạn của dự án.",
        "options": [
          "Tôi viết thư này để hỏi thăm về thời hạn của dự án.",
          "Tôi xin thông báo rằng dự án đã hoàn thành.",
          "Vui lòng dời lịch cuộc họp sang thứ Sáu tới.",
          "Tôi muốn nộp đơn xin ứng tuyển vị trí này."
        ],
        "correct_answer": "Tôi viết thư này để hỏi thăm về thời hạn của dự án.",
        "hint": "Inquire = hỏi thăm tìm hiểu, deadline = hạn chót",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_b1_l2_ex2",
        "lesson_id": "en_b1_l2",
        "type": "speaking",
        "prompt": "Press Mic and speak the professional closing sentence:",
        "target_text": "I look forward to hearing from you soon.",
        "target_audio_text": "I look forward to hearing from you soon.",
        "phonetic": "/aɪ lʊk ˈfɔːwəd tuː ˈhɪərɪŋ frɒm juː suːn/",
        "vietnamese_meaning": "Tôi rất mong sớm nhận được phản hồi từ bạn.",
        "options": [],
        "correct_answer": "I look forward to hearing from you soon.",
        "hint": "Look forward to + V-ing = rất mong chờ điều gì",
        "stroke_char": null,
        "order_index": 2
      }
    ]
  },
  "zh_l_p3": {
    "id": "zh_l_p3",
    "unit_id": "zh_u1_pinyin",
    "lesson_number": 3,
    "title": "Thử Thách Ghép Vần Pinyin",
    "description": "Bài kiểm tra phản xạ nghe và phân biệt âm tương tự",
    "xp_reward": 20,
    "type": "checkpoint",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_p3_ex1",
        "lesson_id": "zh_l_p3",
        "type": "listening",
        "prompt": "Nghe âm ghép và chọn phiên âm Pinyin đúng:",
        "target_text": "bā",
        "target_audio_text": "bā",
        "phonetic": "bā",
        "vietnamese_meaning": "Âm tiết bā (b + a, Thanh 1: Số 8)",
        "options": [
          "bā",
          "pā",
          "mā",
          "fā"
        ],
        "correct_answer": "bā",
        "hint": "Thanh mẫu b ghép với vận mẫu a mang thanh ngang",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_p3_ex2",
        "lesson_id": "zh_l_p3",
        "type": "speaking",
        "prompt": "Nhấn Micro và phát âm từ: māma (mẹ):",
        "target_text": "māma",
        "target_audio_text": "māma",
        "phonetic": "mā ma",
        "vietnamese_meaning": "Mẹ, má",
        "options": [],
        "correct_answer": "māma",
        "hint": "Âm đầu thanh 1 ngân dài, âm sau đọc thanh nhẹ ngắn gọn",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_p3_ex3",
        "lesson_id": "zh_l_p3",
        "type": "dictation",
        "prompt": "Sắp xếp các thẻ âm tiết thành từ \"bà ba\" (Bố):",
        "target_text": "bà ba",
        "target_audio_text": "bàba",
        "phonetic": "bà ba",
        "vietnamese_meaning": "Bố, ba",
        "options": [
          "ba",
          "bà",
          "ma",
          "mā"
        ],
        "correct_answer": "bà ba",
        "hint": "Thanh mẫu b ghép vần a thanh 4 rồi thanh nhẹ",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "zh_l_h3": {
    "id": "zh_l_h3",
    "unit_id": "zh_u1_hsk1",
    "lesson_number": 3,
    "title": "Cảm Ơn & Xin Lỗi: 谢谢与对不起",
    "description": "Các câu nói xã giao lịch sự không thể thiếu",
    "xp_reward": 20,
    "type": "checkpoint",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h3_ex1",
        "lesson_id": "zh_l_h3",
        "type": "listening",
        "prompt": "Nghe và chọn câu đáp lại khi ai đó nói \"谢谢\" (Cảm ơn):",
        "target_text": "不客气",
        "target_audio_text": "不客气",
        "phonetic": "bú kèqi",
        "vietnamese_meaning": "Không có chi, đừng khách sáo",
        "options": [
          "不客气 (Bú kèqi)",
          "没关系 (Méi guānxi)",
          "再见 (Zàijiàn)",
          "你好 (Nǐhǎo)"
        ],
        "correct_answer": "不客气 (Bú kèqi)",
        "hint": "Đáp lại lời cảm ơn bằng 不客气",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h3_ex2",
        "lesson_id": "zh_l_h3",
        "type": "speaking",
        "prompt": "Nhấn Micro và phát âm câu: 对不起 (Xin lỗi):",
        "target_text": "对不起",
        "target_audio_text": "对不起",
        "phonetic": "duìbuqǐ",
        "vietnamese_meaning": "Xin lỗi",
        "options": [],
        "correct_answer": "对不起",
        "hint": "Phát âm rõ âm đầu duì và bật thanh 3 qǐ",
        "stroke_char": null,
        "order_index": 2
      }
    ]
  },
  "en_l_ipa3": {
    "id": "en_l_ipa3",
    "unit_id": "en_u1_ipa",
    "lesson_number": 3,
    "title": "Thử Thách Nghe Phân Biệt Âm IPA",
    "description": "Nghe từ tương tự và chọn ký hiệu phiên âm đúng",
    "xp_reward": 20,
    "type": "checkpoint",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_l_ipa3_ex1",
        "lesson_id": "en_l_ipa3",
        "type": "listening",
        "prompt": "Listen and choose the word you hear (/iː/ vs /ɪ/):",
        "target_text": "Ship vs Sheep",
        "target_audio_text": "Sheep",
        "phonetic": "/ʃiːp/",
        "vietnamese_meaning": "Con cừu (nguyên âm dài /iː/)",
        "options": [
          "Sheep (/ʃiːp/ - Con cừu)",
          "Ship (/ʃɪp/ - Con tàu)",
          "Chip (/tʃɪp/ - Khoai tây)",
          "Sheet (/ʃiːt/ - Tờ giấy)"
        ],
        "correct_answer": "Sheep (/ʃiːp/ - Con cừu)",
        "hint": "Sheep có âm /iː/ kéo dài, khác với Ship /ɪ/ dứt khoát",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_l_ipa3_ex2",
        "lesson_id": "en_l_ipa3",
        "type": "speaking",
        "prompt": "Press Mic and clearly pronounce the minimal pair sentence:",
        "target_text": "The ship carries white sheep across the sea.",
        "target_audio_text": "The ship carries white sheep across the sea.",
        "phonetic": "/ðə ʃɪp ˈkæriz waɪt ʃiːp əˈkrɒs ðə siː/",
        "vietnamese_meaning": "Con tàu chở những chú cừu trắng băng qua biển.",
        "options": [],
        "correct_answer": "The ship carries white sheep across the sea.",
        "hint": "Phân biệt rõ âm ngắn trong ship và âm dài trong sheep, sea",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "en_l_ipa3_ex3",
        "lesson_id": "en_l_ipa3",
        "type": "matching",
        "prompt": "Match phonetic symbols with standard example words:",
        "target_text": "/iː/,/ɪ/,/θ/,/ð/",
        "target_audio_text": "tree, sit, think, this",
        "phonetic": "/iː/, /ɪ/, /θ/, /ð/",
        "vietnamese_meaning": "Cặp âm IPA căn bản",
        "options": {
          "pairs": [
            {
              "left": "/iː/ (Long e)",
              "right": "Tree, See, Green"
            },
            {
              "left": "/ɪ/ (Short i)",
              "right": "Sit, Hit, Big"
            },
            {
              "left": "/θ/ (Voiceless th)",
              "right": "Think, Thank, Three"
            },
            {
              "left": "/ð/ (Voiced th)",
              "right": "This, That, Mother"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Chú ý khẩu hình đặt lưỡi giữa 2 hàm răng với âm th",
        "stroke_char": null,
        "order_index": 3
      }
    ]
  },
  "en_l_a1_3": {
    "id": "en_l_a1_3",
    "unit_id": "en_u1_a1",
    "lesson_number": 3,
    "title": "Checkpoint: Basic Greetings",
    "description": "Test your listening, speaking and translation skills",
    "xp_reward": 20,
    "type": "checkpoint",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "en_l_a1_3_ex1",
        "lesson_id": "en_l_a1_3",
        "type": "listening",
        "prompt": "Listen and choose the appropriate polite response to \"Nice to meet you\":",
        "target_text": "Nice to meet you, too!",
        "target_audio_text": "Nice to meet you, too!",
        "phonetic": "/naɪs tuː miːt juː tuː/",
        "vietnamese_meaning": "Rất vui được gặp bạn!",
        "options": [
          "Nice to meet you, too!",
          "Goodbye!",
          "See you tomorrow.",
          "I am sorry."
        ],
        "correct_answer": "Nice to meet you, too!",
        "hint": "Thêm từ \"too\" vào cuối câu để đáp lại sự chào đón",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "en_l_a1_3_ex2",
        "lesson_id": "en_l_a1_3",
        "type": "translation",
        "prompt": "Arrange words into: \"Hello, my name is Alex and I am a student\":",
        "target_text": "Hello, my name is Alex and I am a student.",
        "target_audio_text": "Hello, my name is Alex and I am a student.",
        "phonetic": "/həˈləʊ maɪ neɪm ɪz ˈælɪks ænd aɪ æm ə ˈstjuːdənt/",
        "vietnamese_meaning": "Xin chào, tên tôi là Alex và tôi là một sinh viên.",
        "options": [
          "Hello",
          "my",
          "name",
          "is",
          "Alex",
          "and",
          "I",
          "am",
          "a",
          "student"
        ],
        "correct_answer": "Hello my name is Alex and I am a student",
        "hint": "Ghép câu hoàn chỉnh giới thiệu bản thân",
        "stroke_char": null,
        "order_index": 2
      }
    ]
  },
  "zh_h2_l3": {
    "id": "zh_h2_l3",
    "unit_id": "zh_u1_hsk2",
    "lesson_number": 3,
    "title": "Kiểm Tra Gia Đình & Nghề Nghiệp",
    "description": "Bài kiểm tra tổng hợp nghe nói đọc viết",
    "xp_reward": 30,
    "type": "checkpoint",
    "completed": false,
    "status": "unlocked",
    "exercises": [
      {
        "id": "zh_h2_l3_ex1",
        "lesson_id": "zh_h2_l3",
        "type": "listening",
        "prompt": "Nghe và chọn câu dịch tiếng Việt đúng:",
        "target_text": "他爸爸是医生，在医院工作。",
        "target_audio_text": "他爸爸是医生，在医院工作。",
        "phonetic": "tā bàba shì yīshēng, zài yīyuàn gōngzuò.",
        "vietnamese_meaning": "Bố anh ấy là bác sĩ, làm việc ở bệnh viện.",
        "options": [
          "Bố anh ấy là bác sĩ, làm việc ở bệnh viện.",
          "Mẹ anh ấy là giáo viên, làm việc ở trường học.",
          "Anh ấy muốn làm bác sĩ tương lai.",
          "Bố anh ấy đang nằm viện điều trị."
        ],
        "correct_answer": "Bố anh ấy là bác sĩ, làm việc ở bệnh viện.",
        "hint": "医生 = bác sĩ, 医院 = bệnh viện",
        "stroke_char": null,
        "order_index": 1
      },
      {
        "id": "zh_h2_l3_ex2",
        "lesson_id": "zh_h2_l3",
        "type": "speaking",
        "prompt": "Nhấn Micro và nói: \"Chị gái tôi cũng là giáo viên\":",
        "target_text": "我姐姐也是老师。",
        "target_audio_text": "我姐姐也是老师。",
        "phonetic": "wǒ jiějie yě shì lǎoshī.",
        "vietnamese_meaning": "Chị gái tôi cũng là giáo viên.",
        "options": [],
        "correct_answer": "我姐姐也是老师。",
        "hint": "也 = cũng, 老师 = giáo viên",
        "stroke_char": null,
        "order_index": 2
      },
      {
        "id": "zh_h2_l3_ex3",
        "lesson_id": "zh_h2_l3",
        "type": "matching",
        "prompt": "Nối các cặp từ nghề nghiệp và địa điểm:",
        "target_text": "医生,老师,医院,学校",
        "target_audio_text": "yīshēng lǎoshī yīyuàn xuéxiào",
        "phonetic": "yīshēng, lǎoshī, yīyuàn, xuéxiào",
        "vietnamese_meaning": "Cặp từ nghề nghiệp và nơi làm việc",
        "options": {
          "pairs": [
            {
              "left": "医生 (yīshēng)",
              "right": "Bác sĩ"
            },
            {
              "left": "老师 (lǎoshī)",
              "right": "Giáo viên"
            },
            {
              "left": "医院 (yīyuàn)",
              "right": "Bệnh viện"
            },
            {
              "left": "学校 (xuéxiào)",
              "right": "Trường học"
            }
          ]
        },
        "correct_answer": "MATCH_PAIRS",
        "hint": "Ghép từ đúng nghĩa tiếng Việt",
        "stroke_char": null,
        "order_index": 3
      },
      {
        "id": "zh_h2_l3_ex4",
        "lesson_id": "zh_h2_l3",
        "type": "translation",
        "prompt": "Sắp xếp câu hỏi: \"Anh trai bạn làm công việc gì?\":",
        "target_text": "你哥哥做什么工作？",
        "target_audio_text": "你哥哥做什么工作？",
        "phonetic": "nǐ gēge zuò shénme gōngzuò?",
        "vietnamese_meaning": "Anh trai bạn làm công việc gì?",
        "options": [
          "你",
          "哥哥",
          "做",
          "什么",
          "工作",
          "姐姐",
          "医生"
        ],
        "correct_answer": "你 哥哥 做 什么 工作",
        "hint": "做 = làm, 什么 = gì, 工作 = công việc",
        "stroke_char": null,
        "order_index": 4
      },
      {
        "id": "zh_h2_l3_ex5",
        "lesson_id": "zh_h2_l3",
        "type": "writing",
        "prompt": "Tập viết chữ Hán 生 (Sinh trong Y sinh / Học sinh):",
        "target_text": "生",
        "target_audio_text": "生",
        "phonetic": "shēng",
        "vietnamese_meaning": "Sinh sống, học trò, nghề nghiệp",
        "options": [],
        "correct_answer": "生",
        "hint": "Chữ 生 gồm 5 nét, bắt đầu từ nét phẩy trên cùng",
        "stroke_char": "生",
        "order_index": 5
      }
    ]
  }
};

export const getCurriculumLevels = (lang = 'zh') => {
  return CURRICULUM_LEVELS.filter(l => l.language_id === lang);
};

export const getAuthenticUnitsForLevel = (levelId) => {
  const isZh = levelId.startsWith('zh');
  const dataset = isZh ? AUTHENTIC_ZH_DATA[levelId] : AUTHENTIC_EN_DATA[levelId];
  if (!dataset || !dataset.lessons || dataset.lessons.length === 0) return [];

  return [
    {
      id: `unit_auth_${levelId}`,
      level_id: levelId,
      unit_number: 0,
      title: `Chuyên Sâu Thực Chiến: ${dataset.title}`,
      description: `Lộ trình 5 giai đoạn: Khởi động ➔ Phản xạ nghe ➔ Tập viết ➔ Ghép câu ➔ Luyện phát âm`,
      icon: 'Sparkles',
      banner_color: isZh ? '#58CC02' : '#1CB0F6',
      levelBadge: dataset.code || 'CHUYÊN SÂU',
      lessons: dataset.lessons.map((l, idx) => ({
        id: l.id,
        unit_id: `unit_auth_${levelId}`,
        lesson_number: idx + 1,
        title: l.title,
        description: l.grammarFocus || 'Kho từ vựng & ngữ pháp chuẩn quốc tế',
        xp_reward: 25,
        type: 'standard',
        completed: false,
        status: 'unlocked',
        vocabularies: l.vocabularies,
        exercises: []
      }))
    }
  ];
};

export const getCurriculumUnits = (levelId) => {
  const base = CURRICULUM_UNITS_BY_LEVEL[levelId] || [];
  try {
    const authUnits = getAuthenticUnitsForLevel(levelId);
    const extras = getCurriculumUnitsForLevel(levelId) || [];
    const baseIds = new Set(base.map(u => u.id));
    const uniqueExtras = extras.filter(u => !baseIds.has(u.id));
    return [...authUnits, ...base, ...uniqueExtras].sort((a, b) => (a.unit_number || 0) - (b.unit_number || 0));
  } catch (_) {
    return base;
  }
};

export const getCurriculumLesson = (lessonId) => {
  // Check authentic dataset first (with 5-phase scaffolded flow)
  const authLesson = getAuthenticLesson(lessonId);
  if (authLesson) {
    const exercises = buildScaffoldedLessonFlow(authLesson, [], { lang: authLesson.language });
    return {
      ...authLesson,
      xp_reward: 25,
      exercises
    };
  }

  const baseLesson = CURRICULUM_LESSONS_BY_ID[lessonId] || getCurriculumLessonById(lessonId);
  if (baseLesson) {
    if (baseLesson.vocabularies && baseLesson.vocabularies.length > 0) {
      const exercises = buildScaffoldedLessonFlow(baseLesson);
      return { ...baseLesson, exercises };
    }
    return baseLesson;
  }
  return null;
};

/**
 * Merge base units with extra units from fullCurriculumZH/EN.
 * Returns combined array sorted by unit_number.
 */
export const getCurriculumUnitsWithExtra = async (levelId) => {
  return getCurriculumUnits(levelId);
};
