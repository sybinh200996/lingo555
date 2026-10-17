/**
 * authenticCurriculumData.js
 * Comprehensive authentic curriculum dataset with real-world vocabulary,
 * accurate Pinyin with tone marks, IPA, Sino-Vietnamese (Hán Việt),
 * parts of speech, radical/etymology breakdown, grammar notes,
 * and natural example sentences for all HSK (1-6 + Practical) & CEFR (A0-C2) stages.
 * 
 * Strict quality rule: NO DUMMY REPEATED LOOPS. Every level has authentic level-appropriate data.
 */

export const AUTHENTIC_ZH_DATA = {
  // =========================================================================
  // CHẶNG 0: NHẬP MÔN PINYIN & BỘ THỦ
  // =========================================================================
  zh_pinyin: {
    levelId: 'zh_pinyin',
    code: 'PINYIN',
    title: 'Nhập Môn Pinyin, Thanh Điệu & 214 Bộ Thủ',
    lessons: [
      {
        id: 'zh_pin_l1',
        title: '21 Thanh Mẫu & Âm Môi Đầu Lưỡi (b, p, m, f, d, t, n, l)',
        grammarFocus: 'Phân biệt âm không bật hơi (b, d) và âm bật hơi mạnh (p, t). Đặt tờ giấy trước miệng, phát âm p/t tờ giấy sẽ bay mạnh.',
        vocabularies: [
          {
            id: 'zh_p_1',
            word: '爸爸',
            pronunciation: 'bàba',
            hanViet: 'BÁ BÁ',
            partOfSpeech: 'noun',
            meaningVi: 'Bố, cha',
            radicals: '父 (Phụ - người cha) nhân đôi biểu thị xưng hô thân mật',
            grammarNote: 'Từ láy xưng hô thân mật, chữ thứ hai đọc thanh nhẹ (nhẹ và ngắn).',
            exampleSentence: {
              target: '我爸爸是医生。',
              pronunciation: 'Wǒ bàba shì yīshēng.',
              meaningVi: 'Bố tôi là bác sĩ.'
            }
          },
          {
            id: 'zh_p_2',
            word: '妈妈',
            pronunciation: 'māma',
            hanViet: 'MA MA',
            partOfSpeech: 'noun',
            meaningVi: 'Mẹ',
            radicals: '女 (Nữ - người phụ nữ) + 马 (Mã - ngựa, mượn âm đọc)',
            grammarNote: 'Chữ hình thanh: bộ 女 chỉ ý nghĩa người phụ nữ, chữ 马 mượn âm mǎ → mā.',
            exampleSentence: {
              target: '妈妈很喜欢喝茶。',
              pronunciation: 'Māma hěn xǐhuan hē chá.',
              meaningVi: 'Mẹ rất thích uống trà.'
            }
          },
          {
            id: 'zh_p_3',
            word: '大',
            pronunciation: 'dà',
            hanViet: 'ĐẠI',
            partOfSpeech: 'adj',
            meaningVi: 'To lớn',
            radicals: 'Tượng hình một người (人) dang rộng hai tay hai chân diễn tả sự to lớn',
            grammarNote: 'Trái nghĩa với 小 (xiǎo - tiểu, nhỏ). Có thể dùng phó từ 很 (hěn) đứng trước: 很大.',
            exampleSentence: {
              target: '这个苹果很大。',
              pronunciation: 'Zhè ge píngguǒ hěn dà.',
              meaningVi: 'Quả táo này rất to.'
            }
          },
          {
            id: 'zh_p_4',
            word: '不',
            pronunciation: 'bù',
            hanViet: 'BẤT',
            partOfSpeech: 'adverb',
            meaningVi: 'Không (phủ định)',
            radicals: 'Bộ Nhất (一) ở trên + 3 nét dưới tượng hình hạt mầm',
            grammarNote: 'Quy tắc biến điệu: Đứng trước âm mang thanh 4 (huyền), 不 đổi thành thanh 2 (bú). Ví dụ: 不是 (bú shì), 不要 (bú yào).',
            exampleSentence: {
              target: '他不是中国人。',
              pronunciation: 'Tā bú shì Zhōngguó rén.',
              meaningVi: 'Anh ấy không phải người Trung Quốc.'
            }
          }
        ]
      },
      {
        id: 'zh_pin_l2',
        title: 'Vận Mẫu Kép & Quy Tắc Biến Điệu Hai Thanh 3',
        grammarFocus: 'Khi hai âm tiết cùng mang thanh 3 đi liền nhau, âm thứ nhất biến thành thanh 2 (hỏi → sắc). Ví dụ: 你 (nǐ) + 好 (hǎo) → Ní hǎo.',
        vocabularies: [
          {
            id: 'zh_p_5',
            word: '你好',
            pronunciation: 'nǐ hǎo (ní hǎo)',
            hanViet: 'NHĨ HẢO',
            partOfSpeech: 'phrase',
            meaningVi: 'Xin chào',
            radicals: '亻 (Nhân đứng) + 尔 (Nhĩ - bạn) | 女 (Nữ) + 子 (Tử - con cái, tốt lành)',
            grammarNote: 'Biến điệu hai thanh 3: nǐ + hǎo phát âm thực tế là ní hǎo.',
            exampleSentence: {
              target: '你好，很高兴认识你！',
              pronunciation: 'Nǐ hǎo, hěn gāoxìng rènshi nǐ!',
              meaningVi: 'Xin chào, rất vui được làm quen với bạn!'
            }
          },
          {
            id: 'zh_p_6',
            word: '很好',
            pronunciation: 'hěn hǎo (hén hǎo)',
            hanViet: 'HẨN HẢO',
            partOfSpeech: 'phrase',
            meaningVi: 'Rất tốt, rất khỏe',
            radicals: '彳 (Xích - bước chân trái) + 艮 (Cấn) | 女 + 子',
            grammarNote: 'Biến điệu thanh 3: hěn + hǎo đọc là hén hǎo. Dùng trả lời khi được hỏi thăm sức khỏe.',
            exampleSentence: {
              target: '我今天身体很好。',
              pronunciation: 'Wǒ jīntiān shēntǐ hén hǎo.',
              meaningVi: 'Hôm nay sức khỏe tôi rất tốt.'
            }
          },
          {
            id: 'zh_p_7',
            word: '可以',
            pronunciation: 'kěyǐ (ké yǐ)',
            hanViet: 'KHẢ DĨ',
            partOfSpeech: 'verb',
            meaningVi: 'Có thể, được phép',
            radicals: '口 (Khẩu) | 己 (Kỷ)',
            grammarNote: 'Động từ năng nguyện biểu thị sự cho phép hoặc khả năng. kě + yǐ biến điệu thành ké yǐ.',
            exampleSentence: {
              target: '我可以坐这里吗？',
              pronunciation: 'Wǒ kéyǐ zuò zhèlǐ ma?',
              meaningVi: 'Tôi có thể ngồi ở đây được không?'
            }
          },
          {
            id: 'zh_p_8',
            word: '一',
            pronunciation: 'yī',
            hanViet: 'NHẤT',
            partOfSpeech: 'number',
            meaningVi: 'Số 1, một',
            radicals: 'Nét ngang cơ bản trong chữ Hán',
            grammarNote: 'Biến điệu của 一: Đứng trước thanh 4 đổi thành thanh 2 (yí). Đứng trước thanh 1, 2, 3 đổi thành thanh 4 (yì). Ví dụ: 一个 (yí gè), 一天 (yì tiān).',
            exampleSentence: {
              target: '我买一个苹果。',
              pronunciation: 'Wǒ mǎi yí gè píngguǒ.',
              meaningVi: 'Tôi mua một quả táo.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 1: HSK 1 - GIAO TIẾP SƠ CẤP 1 (150 TỪ CỐT LÕI)
  // =========================================================================
  zh_hsk1: {
    levelId: 'zh_hsk1',
    code: 'HSK1',
    title: 'HSK 1 - Giao Tiếp Sơ Cấp 1',
    lessons: [
      {
        id: 'zh_h1_l1',
        title: 'Chào Hỏi, Cảm Ơn & Danh Tính Quốc Tịch',
        grammarFocus: 'Cấu trúc câu khẳng định với 是 (shì): Chủ ngữ + 是 + Danh từ. Câu hỏi với trợ từ nghi vấn 吗 (ma).',
        vocabularies: [
          {
            id: 'zh_h1_1',
            word: '谢谢',
            pronunciation: 'xièxie',
            hanViet: 'TẠ TẠ',
            partOfSpeech: 'verb',
            meaningVi: 'Cảm ơn',
            radicals: '讠 (Ngôn - lời nói) + 身 (Thân) + 寸 (Thốn)',
            grammarNote: 'Từ láy, âm thứ hai đọc thanh nhẹ. Đáp lại dùng 不客气 (bú kèqi - đừng khách sáo).',
            exampleSentence: {
              target: '谢谢你的帮助！',
              pronunciation: 'Xièxie nǐ de bāngzhù!',
              meaningVi: 'Cảm ơn sự giúp đỡ của bạn!'
            }
          },
          {
            id: 'zh_h1_2',
            word: '是',
            pronunciation: 'shì',
            hanViet: 'THỊ',
            partOfSpeech: 'verb',
            meaningVi: 'Là, đúng vậy',
            radicals: '日 (Nhật - mặt trời) + 疋 (Sơ/Thất)',
            grammarNote: 'Động từ liên kết tương đương "to be". Phủ định dùng 不是 (bú shì).',
            exampleSentence: {
              target: '我是越南人。',
              pronunciation: 'Wǒ shì Yuènán rén.',
              meaningVi: 'Tôi là người Việt Nam.'
            }
          },
          {
            id: 'zh_h1_3',
            word: '老师',
            pronunciation: 'lǎoshī',
            hanViet: 'LÃO SƯ',
            partOfSpeech: 'noun',
            meaningVi: 'Thầy giáo, cô giáo',
            radicals: '老 (Lão - già dặn kinh nghiệm) + 巾 (Cân)',
            grammarNote: 'Trong tiếng Trung, họ của thầy cô đặt TRƯỚC danh từ 老师. Ví dụ: Vương lão sư = 王老师 (Wáng lǎoshī).',
            exampleSentence: {
              target: '王老师是我的汉语老师。',
              pronunciation: 'Wáng lǎoshī shì wǒ de Hànyǔ lǎoshī.',
              meaningVi: 'Thầy Vương là giáo viên tiếng Trung của tôi.'
            }
          },
          {
            id: 'zh_h1_4',
            word: '学生',
            pronunciation: 'xuéshēng',
            hanViet: 'HỌC SINH',
            partOfSpeech: 'noun',
            meaningVi: 'Học sinh, sinh viên',
            radicals: '冖 (Mịch) + 子 (Tử - đứa con) | 生 (Sinh - sinh sống)',
            grammarNote: 'Từ ghép chỉ người đang học tập. Đại học sinh = 大学生 (sinh viên đại học).',
            exampleSentence: {
              target: '学校里有很多学生。',
              pronunciation: 'Xuéxiào lǐ yǒu hěn duō xuésheng.',
              meaningVi: 'Trong trường học có rất nhiều học sinh.'
            }
          }
        ]
      },
      {
        id: 'zh_h1_l2',
        title: 'Con Số, Thời Gian & Mua Sắm Thực Tế',
        grammarFocus: 'Hỏi giá tiền với 多少钱 (duōshao qián). Thứ tự thời gian tiếng Trung từ LỚN đến BÉ: Năm → Tháng → Ngày → Giờ.',
        vocabularies: [
          {
            id: 'zh_h1_5',
            word: '多少',
            pronunciation: 'duōshao',
            hanViet: 'ĐA THIỂU',
            partOfSpeech: 'pronoun',
            meaningVi: 'Bao nhiêu',
            radicals: '夕 (Tịch) nhân đôi = 多 | 小 (Tiểu) + nét phẩy = 少',
            grammarNote: 'Dùng hỏi số lượng trên 10 hoặc số tiền. Dưới 10 thường dùng 几 (jǐ).',
            exampleSentence: {
              target: '这个手机多少钱？',
              pronunciation: 'Zhè ge shǒujī duōshao qián?',
              meaningVi: 'Chiếc điện thoại này giá bao nhiêu tiền?'
            }
          },
          {
            id: 'zh_h1_6',
            word: '钱',
            pronunciation: 'qián',
            hanViet: 'TIỀN',
            partOfSpeech: 'noun',
            meaningVi: 'Tiền bạc',
            radicals: '钅 (Kim - kim loại tiền vàng) + 戋 (Tàn)',
            grammarNote: 'Đơn vị tiền tệ khẩu ngữ Trung Quốc là 块 (kuài - tệ, đồng) hoặc 毛 (máo - hào).',
            exampleSentence: {
              target: '一斤苹果五块钱。',
              pronunciation: 'Yì jīn píngguǒ wǔ kuài qián.',
              meaningVi: 'Một cân táo giá 5 tệ.'
            }
          },
          {
            id: 'zh_h1_7',
            word: '现在',
            pronunciation: 'xiànzài',
            hanViet: 'HIỆN TẠI',
            partOfSpeech: 'noun',
            meaningVi: 'Bây giờ, hiện nay',
            radicals: '王 (Ngọc) + 见 (Kiến) | 土 (Thổ) + 𠂇',
            grammarNote: 'Trạng ngữ chỉ thời gian, có thể đặt trước hoặc sau chủ ngữ: 现在几点 = Bây giờ mấy giờ?',
            exampleSentence: {
              target: '现在是上午十点三十分。',
              pronunciation: 'Xiànzài shì shàngwǔ shí diǎn sānshí fēn.',
              meaningVi: 'Bây giờ là 10 giờ 30 phút sáng.'
            }
          },
          {
            id: 'zh_h1_8',
            word: '太',
            pronunciation: 'tài',
            hanViet: 'THÁI',
            partOfSpeech: 'adverb',
            meaningVi: 'Quá, lắm',
            radicals: '大 (Đại) thêm dấu chấm ở dưới',
            grammarNote: 'Thường đi với cấu trúc cảm thán: 太 + Tính từ + 了! Ví dụ: 太贵了 (đắt quá rồi), 太好了 (tuyệt vời quá).',
            exampleSentence: {
              target: '这件衣服太漂亮了！',
              pronunciation: 'Zhè jiàn yīfu tài piàoliang le!',
              meaningVi: 'Bộ quần áo này đẹp quá rồi!'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 2: HSK 2 - GIAO TIẾP SƠ CẤP 2 (300 TỪ)
  // =========================================================================
  zh_hsk2: {
    levelId: 'zh_hsk2',
    code: 'HSK2',
    title: 'HSK 2 - Giao Tiếp Sơ Cấp 2',
    lessons: [
      {
        id: 'zh_h2_l1',
        title: 'Hỏi Đường, Giao Thông & So Sánh Hơn Kém với 比',
        grammarFocus: 'Cấu trúc so sánh hơn: A + 比 + B + Tính từ (+ Số lượng/得多). Ví dụ: 今天比昨天冷 (Hôm nay lạnh hơn hôm qua).',
        vocabularies: [
          {
            id: 'zh_h2_1',
            word: '比',
            pronunciation: 'bǐ',
            hanViet: 'TỶ',
            partOfSpeech: 'preposition',
            meaningVi: 'So với (giới từ so sánh)',
            radicals: 'Hai người đứng cạnh nhau để so sánh đối chiếu',
            grammarNote: 'Công thức: A + 比 + B + Adj. Phủ định dùng 没有: A 没有 B + Adj (A không bằng B).',
            exampleSentence: {
              target: '哥哥比我大两岁。',
              pronunciation: 'Gēge bǐ wǒ dà liǎng suì.',
              meaningVi: 'Anh trai lớn hơn tôi 2 tuổi.'
            }
          },
          {
            id: 'zh_h2_2',
            word: '公共汽车',
            pronunciation: 'gōnggòng qìchē',
            hanViet: 'CÔNG CỘNG KHÍ XA',
            partOfSpeech: 'noun',
            meaningVi: 'Xe buýt',
            radicals: '公 (Công) + 共 (Cộng) | 气 (Khí) + 车 (Xa - xe cộ)',
            grammarNote: 'Động từ đi kèm là 坐 (zuò - ngồi): 坐公共汽车 (đi xe buýt).',
            exampleSentence: {
              target: '我每天坐公共汽车去上班。',
              pronunciation: 'Wǒ měitiān zuò gōnggòng qìchē qù shàngbān.',
              meaningVi: 'Mỗi ngày tôi đều đi xe buýt đi làm.'
            }
          },
          {
            id: 'zh_h2_3',
            word: '离',
            pronunciation: 'lí',
            hanViet: 'LY',
            partOfSpeech: 'preposition',
            meaningVi: 'Cách (khoảng cách)',
            radicals: '亠 (Đầu) + 凶 (Hung) + 冂 + 乂',
            grammarNote: 'Cấu trúc khoảng cách: Địa điểm A + 离 + Địa điểm B + 很近/很远 (rất gần / rất xa).',
            exampleSentence: {
              target: '我家离学校不远。',
              pronunciation: 'Wǒ jiā lí xuéxiào bù yuǎn.',
              meaningVi: 'Nhà tôi cách trường học không xa.'
            }
          },
          {
            id: 'zh_h2_4',
            word: '准备',
            pronunciation: 'zhǔnbèi',
            hanViet: 'CHUẨN BỊ',
            partOfSpeech: 'verb',
            meaningVi: 'Chuẩn bị, dự định',
            radicals: '冫(Băng) + 隹 (Chuy) | 夂 + 艹 + 用',
            grammarNote: 'Có thể làm động từ: 准备考试 (chuẩn bị thi), hoặc làm danh từ: 做准备 (làm công tác chuẩn bị).',
            exampleSentence: {
              target: '我们正在准备明天的会议。',
              pronunciation: 'Wǒmen zhèngzài zhǔnbèi míngtiān de huìyì.',
              meaningVi: 'Chúng tôi đang chuẩn bị cho cuộc họp ngày mai.'
            }
          }
        ]
      },
      {
        id: 'zh_h2_l2',
        title: 'Bổ Ngữ Kết Quả & Câu Chữ 把 Căn Bản',
        grammarFocus: 'Bổ ngữ kết quả: Động từ + Kết quả (看见, 听懂, 做完). Câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác.',
        vocabularies: [
          {
            id: 'zh_h2_5',
            word: '听懂',
            pronunciation: 'tīngdǒng',
            hanViet: 'THÍNH HIỂU',
            partOfSpeech: 'verb',
            meaningVi: 'Nghe hiểu được',
            radicals: '口 (Khẩu) + 斤 (Cân) | 忄 (Tâm) + 董 (Đổng)',
            grammarNote: 'Bổ ngữ kết quả: 听 (nghe) + 懂 (hiểu). Phủ định: 没听懂 (chưa nghe hiểu). Nghi vấn: 听懂了吗?',
            exampleSentence: {
              target: '老师讲的话我都听懂了。',
              pronunciation: 'Lǎoshī jiǎng de huà wǒ dōu tīngdǒng le.',
              meaningVi: 'Lời thầy giáo giảng tôi đều nghe hiểu hết rồi.'
            }
          },
          {
            id: 'zh_h2_6',
            word: '把',
            pronunciation: 'bǎ',
            hanViet: 'BẢ',
            partOfSpeech: 'preposition',
            meaningVi: 'Đem, lấy (giới từ xử lý)',
            radicals: '扌 (Thủ - bàn tay hành động) + 巴 (Ba)',
            grammarNote: 'Câu chữ 把 nhấn mạnh sự xử lý hoặc kết quả làm thay đổi vị trí/trạng thái của tân ngữ.',
            exampleSentence: {
              target: '请你把这本书放在桌子上。',
              pronunciation: 'Qǐng nǐ bǎ zhè běn shū fàng zài zhuōzi shàng.',
              meaningVi: 'Xin bạn hãy đặt cuốn sách này lên bàn.'
            }
          },
          {
            id: 'zh_h2_7',
            word: '生病',
            pronunciation: 'shēngbìng',
            hanViet: 'SINH BỆNH',
            partOfSpeech: 'verb',
            meaningVi: 'Bị ốm, ngã bệnh',
            radicals: '生 (Sinh) | 疒 (Nạch - bệnh tật đau ốm) + 丙',
            grammarNote: 'Cụm động tân. Khi đau đầu nói: 头疼 (tóuténg), sốt nói: 发烧 (fāshāo).',
            exampleSentence: {
              target: '他生病了，今天不能去上课。',
              pronunciation: 'Tā shēngbìng le, jīntiān bù néng qù shàngkè.',
              meaningVi: 'Anh ấy bị ốm rồi, hôm nay không thể đi học.'
            }
          },
          {
            id: 'zh_h2_8',
            word: '休息',
            pronunciation: 'xiūxi',
            hanViet: 'HƯU TỨC',
            partOfSpeech: 'verb',
            meaningVi: 'Nghỉ ngơi',
            radicals: '亻 (Người) tựa vào 木 (cây) = 休 | 自 (Tự) + 心 (Tâm) = 息',
            grammarNote: 'Chiết tự tuyệt đẹp: Người tựa vào thân cây để thở phào nghỉ ngơi.',
            exampleSentence: {
              target: '工作累了，就休息一下吧。',
              pronunciation: 'Gōngzuò lèi le, jiù xiūxi yíxià ba.',
              meaningVi: 'Làm việc mệt rồi thì nghỉ ngơi một lát đi.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 3: HSK 3 - TRUNG CẤP 1 (600 TỪ)
  // =========================================================================
  zh_hsk3: {
    levelId: 'zh_hsk3',
    code: 'HSK3',
    title: 'HSK 3 - Trung Cấp 1',
    lessons: [
      {
        id: 'zh_h3_l1',
        title: 'Môi Trường, Du Lịch & Bổ Ngữ Xu Hướng Kép',
        grammarFocus: 'Bổ ngữ xu hướng phức hợp: Động từ + 出来 / 过去 / 进来 / 起来. Biểu thị hướng chuyển động của hành động.',
        vocabularies: [
          {
            id: 'zh_h3_1',
            word: '环境',
            pronunciation: 'huánjìng',
            hanViet: 'HOÀN CẢNH',
            partOfSpeech: 'noun',
            meaningVi: 'Môi trường sống, hoàn cảnh',
            radicals: '王 (Ngọc) + 专 | 土 (Thổ) + 竟',
            grammarNote: 'Thường kết hợp: 保护环境 (bảo vệ môi trường), 环境优美 (môi trường tươi đẹp).',
            exampleSentence: {
              target: '每个人都应该保护我们生活的环境。',
              pronunciation: 'Měi gè rén dōu yīnggāi bǎohù wǒmen shēnghuó de huánjìng.',
              meaningVi: 'Mỗi người đều nên bảo vệ môi trường mà chúng ta đang sống.'
            }
          },
          {
            id: 'zh_h3_2',
            word: '行李箱',
            pronunciation: 'xínglixiāng',
            hanViet: 'HÀNH LÝ TƯƠNG',
            partOfSpeech: 'noun',
            meaningVi: 'Vali hành lý',
            radicals: '行 (Hành) + 李 (Lý) + 竹 (Trúc) + 相 (Tương)',
            grammarNote: 'Hành lý xách tay hoặc ký gửi. Lượng từ là 个 (gè). Mang vali = 提行李箱.',
            exampleSentence: {
              target: '请把你的行李箱拿过来。',
              pronunciation: 'Qǐng bǎ nǐ de xínglixiāng ná guòlai.',
              meaningVi: 'Xin hãy mang vali hành lý của bạn qua đây.'
            }
          },
          {
            id: 'zh_h3_3',
            word: '站起来',
            pronunciation: 'zhàn qǐlai',
            hanViet: 'TRẠM KHỞI LAI',
            partOfSpeech: 'verb',
            meaningVi: 'Đứng dậy (xu hướng)',
            radicals: '立 (Lập) + 占 (Chiêm) | 走 (Tẩu) + 己 | 来 (Lai)',
            grammarNote: 'Bổ ngữ xu hướng 起来 biểu thị động tác hướng từ dưới lên trên hoặc bắt đầu thực hiện.',
            exampleSentence: {
              target: '老师走进来的时候，大家都要站起来。',
              pronunciation: 'Lǎoshī zǒu jìnlái de shíhou, dàjiā dōu yào zhàn qǐlai.',
              meaningVi: 'Khi thầy giáo bước vào, mọi người đều phải đứng dậy.'
            }
          },
          {
            id: 'zh_h3_4',
            word: '被',
            pronunciation: 'bèi',
            hanViet: 'BỊ',
            partOfSpeech: 'preposition',
            meaningVi: 'Bị, được (câu bị động)',
            radicals: '衤 (Y - vạt áo) + 皮 (Bì - da)',
            grammarNote: 'Cấu trúc bị động: Đối tượng chịu tác động + 被 (+ Tác nhân) + Động từ + Thành phần khác. Ví dụ: 被发现了 (bị phát hiện rồi).',
            exampleSentence: {
              target: '我的自行车被他借走了。',
              pronunciation: 'Wǒ de zìxíngchē bèi tā jiè zǒu le.',
              meaningVi: 'Xe đạp của tôi đã bị anh ấy mượn đi rồi.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 4: HSK 4 - TRUNG CAO CẤP (1.200 TỪ)
  // =========================================================================
  zh_hsk4: {
    levelId: 'zh_hsk4',
    code: 'HSK4',
    title: 'HSK 4 - Trung Cao Cấp',
    lessons: [
      {
        id: 'zh_h4_l1',
        title: 'Thương Mại Điện Tử & Phỏng Vấn Xin Việc (CV)',
        grammarFocus: 'Cặp liên từ tăng tiến: 不仅...而且... (Không những... mà còn...). Cấu trúc nhấn mạnh điều kiện: 无论...都... (Bất luận... đều...).',
        vocabularies: [
          {
            id: 'zh_h4_1',
            word: '面试',
            pronunciation: 'miànshì',
            hanViet: 'DIỆN THÍ',
            partOfSpeech: 'noun',
            meaningVi: 'Phỏng vấn trực tiếp',
            radicals: '面 (Diện - mặt) + 讠(Ngôn) + 式 (Thức - khuôn mẫu)',
            grammarNote: 'Gặp mặt đối mặt để sát hạch ứng viên. Đi phỏng vấn: 去面试, Người phỏng vấn: 面试官.',
            exampleSentence: {
              target: '他不仅专业能力强，而且面试表现十分出色。',
              pronunciation: 'Tā bùjǐn zhuānyè nénglì qiáng, érqiě miànshì biǎoxiàn shífēn chūsè.',
              meaningVi: 'Anh ấy không những năng lực chuyên môn giỏi, mà biểu hiện trong buổi phỏng vấn còn vô cùng xuất sắc.'
            }
          },
          {
            id: 'zh_h4_2',
            word: '简历',
            pronunciation: 'jiǎnlì',
            hanViet: 'GIẢN LỊCH',
            partOfSpeech: 'noun',
            meaningVi: 'Sơ yếu lý lịch, CV xin việc',
            radicals: '竹 (Trúc - thẻ tre ghi chép tóm tắt) + 间 | 厂 + 禾 + 止 (Lịch sử kinh qua)',
            grammarNote: 'Bản tóm tắt quá trình học tập và làm việc. Gửi CV: 投递简历 / 发简历.',
            exampleSentence: {
              target: '请把你的个人简历发到我们公司的邮箱。',
              pronunciation: 'Qǐng bǎ nǐ de gèrén jiǎnlì fā dào wǒmen gōngsī de yóuxiāng.',
              meaningVi: 'Xin hãy gửi bản sơ yếu lý lịch cá nhân của bạn vào hòm thư điện tử của công ty chúng tôi.'
            }
          },
          {
            id: 'zh_h4_3',
            word: '不仅',
            pronunciation: 'bùjǐn',
            hanViet: 'BẤT CẬN',
            partOfSpeech: 'conjunction',
            meaningVi: 'Không những, không chỉ',
            radicals: '不 + 亻(Nhân) + 堇 (Cẩn)',
            grammarNote: 'Liên từ đẳng lập tăng tiến, vế sau thường kết hợp với 而且 (érqiě), 还 (hái) hoặc 也 (yě).',
            exampleSentence: {
              target: '网上购物不仅方便，而且价格通常更便宜。',
              pronunciation: 'Wǎngshàng gòuwù bùjǐn fāngbiàn, érqiě jiàgé tōngcháng gèng piányi.',
              meaningVi: 'Mua sắm trực tuyến không chỉ tiện lợi mà giá cả thông thường còn rẻ hơn.'
            }
          },
          {
            id: 'zh_h4_4',
            word: '半途而废',
            pronunciation: 'bàntú ér fèi',
            hanViet: 'BÁN ĐỒ NHI PHẾ',
            partOfSpeech: 'idiom',
            meaningVi: 'Bỏ dở giữa chừng (Thành ngữ 4 chữ)',
            radicals: '半 (Bán - nửa) + 图/途 (Đồ - con đường) + 而 + 广 + 发 (Phế - vứt bỏ)',
            grammarNote: 'Thành ngữ Chengyu khuyên răn tính kiên trì. Thường dùng dạng: 绝不能半途而废 (tuyệt đối không được bỏ dở giữa chừng).',
            exampleSentence: {
              target: '学外语贵在坚持，绝不能半途而废。',
              pronunciation: 'Xué wàiyǔ guì zài jiānchí, jué bù néng bàntú ér fèi.',
              meaningVi: 'Học ngoại ngữ quý ở sự kiên trì, tuyệt đối không được bỏ dở giữa chừng.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 5: HSK 5 - CAO CẤP 1 (2.500 TỪ)
  // =========================================================================
  zh_hsk5: {
    levelId: 'zh_hsk5',
    code: 'HSK5',
    title: 'HSK 5 - Cao Cấp 1',
    lessons: [
      {
        id: 'zh_h5_l1',
        title: 'Đàm Phán Thương Mại, Ký Kết Hợp Đồng & Thị Trường Vốn',
        grammarFocus: 'Văn phong thương mại chính thức (Thư diện ngữ). Phân biệt phó từ chỉ mức độ và tiến trình: 逐步 (từng bước theo kế hoạch) vs 逐渐 (tự nhiên biến đổi dần dần).',
        vocabularies: [
          {
            id: 'zh_h5_1',
            word: '谈判',
            pronunciation: 'tánpàn',
            hanViet: 'ĐÀM PHÁN',
            partOfSpeech: 'verb',
            meaningVi: 'Đàm phán, thương lượng hợp đồng',
            radicals: '讠(Ngôn) + 炎 (Viêm - nói chuyện nảy lửa) | 半 (Bán) + 刂 (Đao - phán xử phân định)',
            grammarNote: 'Đàm phán kinh doanh: 商务谈判, Đàm phán hòa bình: 和平谈判. Tiến hành đàm phán: 进行谈判.',
            exampleSentence: {
              target: '经过长达三天的艰苦谈判，双方终于签署了合作协议。',
              pronunciation: 'Jīngguò cháng dá sān tiān de jiānkǔ tánpàn, shuāngfāng zhōngyú qiānshǔ le hézuò xiéyì.',
              meaningVi: 'Trải qua ba ngày đàm phán gian khổ kéo dài, hai bên rốt cuộc đã ký kết hiệp định hợp tác.'
            }
          },
          {
            id: 'zh_h5_2',
            word: '违约',
            pronunciation: 'wéiyuē',
            hanViet: 'VI ƯỚC',
            partOfSpeech: 'verb',
            meaningVi: 'Vi phạm hợp đồng, bội ước',
            radicals: '辶 (Sước) + 韦 (Vi - trái ngược) | 纟(Mịch) + 勺 (Ước - trói buộc ước định)',
            grammarNote: 'Thuật ngữ pháp lý kinh tế. Tiền phạt vi phạm hợp đồng: 违约金 (wéiyuējīn).',
            exampleSentence: {
              target: '任何一方违约，都必须按照合同条款承担相应的赔偿责任。',
              pronunciation: 'Rènhé yì fāng wéiyuē, dōu bìxū ànzhào hétong tiáokuǎn chéngdān xiāngyìng de péicháng zérèn.',
              meaningVi: 'Bất kỳ bên nào vi phạm hợp đồng đều phải gánh vác trách nhiệm bồi thường tương ứng theo điều khoản hợp đồng.'
            }
          },
          {
            id: 'zh_h5_3',
            word: '逐步',
            pronunciation: 'zhúbù',
            hanViet: 'TRỤC BỘ',
            partOfSpeech: 'adverb',
            meaningVi: 'Từng bước một (có kế hoạch giai đoạn)',
            radicals: '⺮ (Trúc) + 豕 (Thỉ) | 止 (Chỉ) + 步 (bước chân)',
            grammarNote: 'Khác với 逐渐 (biến đổi tự nhiên theo thời gian), 逐步 chỉ tiến trình có chủ ý, có phương án sắp đặt từ trước.',
            exampleSentence: {
              target: '公司计划在未来两年内逐步扩大在东南亚的市场份额。',
              pronunciation: 'Gōngsī jìhuà zài wèilái liǎng nián nèi zhúbù kuòdà zài Dōngnányà de shìchǎng fèn\'é.',
              meaningVi: 'Công ty lên kế hoạch sẽ từng bước mở rộng thị phần tại Đông Nam Á trong vòng hai năm tới.'
            }
          },
          {
            id: 'zh_h5_4',
            word: '股票',
            pronunciation: 'gǔpiào',
            hanViet: 'CỔ PHIẾU',
            partOfSpeech: 'noun',
            meaningVi: 'Cổ phiếu chứng khoán',
            radicals: '月 (Nhục/Nguyệt) + 殳 (Cổ - xương đùi, gốc rễ) | 覀 + 示 (Phiếu - tờ giấy ghi nhận)',
            grammarNote: 'Thị trường cổ phiếu: 股票市场 (股市). Thị trường tăng giá (bò): 牛市, giảm giá (gấu): 熊市.',
            exampleSentence: {
              target: '投资股票虽然收益率较高，但也伴随着巨大的市场风险。',
              pronunciation: 'Tóuzī gǔpiào suīrán shōuyìlǜ jiào gāo, dàn yě bànsuízhe jùdà de shìchǎng fēngxiǎn.',
              meaningVi: 'Đầu tư cổ phiếu tuy tỷ suất sinh lời khá cao nhưng cũng đi kèm với rủi ro thị trường to lớn.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 6: HSK 6 - CAO CẤP 2 & THÀNH THẠO (5.000+ TỪ)
  // =========================================================================
  zh_hsk6: {
    levelId: 'zh_hsk6',
    code: 'HSK6',
    title: 'HSK 6 - Thành Thạo Học Thuật & Chuyên Sâu',
    lessons: [
      {
        id: 'zh_h6_l1',
        title: 'Kinh Tế Vĩ Mô, Tranh Tụng Tố Tụng & Dịch Thuật Tín-Đạt-Nhã',
        grammarFocus: 'Ngữ pháp học thuật cấp cao và văn ngôn cổ: Các hư từ 之 (sở hữu/trợ từ), 乎 (tương đương 于 hoặc 吗), 者 (người/vật), 也 (khẳng định).',
        vocabularies: [
          {
            id: 'zh_h6_1',
            word: '宏观经济',
            pronunciation: 'hóngguān jīngjì',
            hanViet: 'HOÀNG QUAN KINH TẾ',
            partOfSpeech: 'noun',
            meaningVi: 'Kinh tế vĩ mô',
            radicals: '宀 + 厷 (Hoằng - to lớn rộng lớn) | 见 (Kiến - quan sát)',
            grammarNote: 'Đối lập với 微观经济 (Kinh tế vi mô). Kiểm soát vĩ mô: 宏观调控.',
            exampleSentence: {
              target: '中央银行通过调整基准利率来实施对宏观经济的逆周期调控。',
              pronunciation: 'Zhōngyāng yínháng tōngguò tiáozhěng jīzhǔn lìlǜ lái shíshī duì hóngguān jīngjì de nìzhōuqī tiáokòng.',
              meaningVi: 'Ngân hàng trung ương thông qua việc điều chỉnh lãi suất cơ bản để thực thi việc điều tiết nghịch chu kỳ đối với nền kinh tế vĩ mô.'
            }
          },
          {
            id: 'zh_h6_2',
            word: '诉讼',
            pronunciation: 'sùsòng',
            hanViet: 'TỐ TỤNG',
            partOfSpeech: 'noun',
            meaningVi: 'Tố tụng pháp lý, khởi kiện tại tòa',
            radicals: '讠+ 斥 (Tố - vạch trần) | 讠+ 公 (Tụng - tranh chấp công khai trước quan tòa)',
            grammarNote: 'Thuật ngữ luật pháp chuyên sâu. Thủ tục tố tụng: 诉讼程序, Vụ án kiện tụng: 诉讼案件.',
            exampleSentence: {
              target: '原告向法庭提交了足以证明被告侵犯知识产权的确凿证据。',
              pronunciation: 'Yuángào xiàng fǎtíng tíjiāo le zúyǐ zhèngmíng bèigào qīnfàn zhīshí chǎnquán de quèzáo zhèngjù.',
              meaningVi: 'Nguyên đơn đã nộp lên tòa án những bằng chứng xác thực đủ để chứng minh bị đơn xâm phạm quyền sở hữu trí tuệ.'
            }
          },
          {
            id: 'zh_h6_3',
            word: '信达雅',
            pronunciation: 'xìn dá yǎ',
            hanViet: 'TÍN ĐẠT NHÃ',
            partOfSpeech: 'idiom',
            meaningVi: 'Tín - Đạt - Nhã (Tam tiêu chuẩn dịch thuật kinh điển của Nghiêm Phục)',
            radicals: '亻+ 言 (Tín - chân thật) | 辶 + 幸 (Đạt - thông suốt mạch lạc) | 牙 + 隹 (Nhã - thanh tao nhã nhặn)',
            grammarNote: 'Tiêu chuẩn vàng của dịch thuật: Tín (trung thành nguyên tác), Đạt (diễn đạt trôi chảy), Nhã (văn phong tao nhã).',
            exampleSentence: {
              target: '翻译古典文学作品不仅要做到字面对应，更要追求“信、达、雅”的神韵境界。',
              pronunciation: 'Fānyì gǔdiǎn wénxué zuòpǐn bùjǐn yào zuòdào zìmiàn duìyìng, gèng yào zhuīqiú "xìn, dá, yǎ" de shényùn jìngjiè.',
              meaningVi: 'Dịch thuật các tác phẩm văn học cổ điển không chỉ phải đạt được sự tương ứng trên mặt chữ, mà càng phải theo đuổi cảnh giới thần thái của "Tín, Đạt, Nhã".'
            }
          },
          {
            id: 'zh_h6_4',
            word: '唯物辩证',
            pronunciation: 'wéiwù biànzhèng',
            hanViet: 'DUY VẬT BIỆN CHỨNG',
            partOfSpeech: 'noun',
            meaningVi: 'Biện chứng duy vật triết học',
            radicals: '口 + 隹 (Duy) | 牛 + 勿 (Vật) | 讠+ 辛 (Biện) | 讠+ 正 (Chứng)',
            grammarNote: 'Phương pháp luận triết học xem xét sự vật trong mối liên hệ phổ biến và vận động phát triển không ngừng.',
            exampleSentence: {
              target: '我们应当运用唯物辩证的科学视角来深入分析复杂的国际地缘政治局势。',
              pronunciation: 'Wǒmen yīngdāng yùnyòng wéiwù biànzhèng de kēxué shìjiǎo lái shēnrù fēnxī fùzá de guójì dìyuán zhèngzhì júshì.',
              meaningVi: 'Chúng ta nên vận dụng góc nhìn khoa học duy vật biện chứng để phân tích sâu sắc cục diện địa chính trị quốc tế phức tạp.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 7: TIẾNG TRUNG THỰC CHIẾN (XƯỞNG MAY, XUẤT NHẬP KHẨU, LOGISTICS)
  // =========================================================================
  zh_practical: {
    levelId: 'zh_practical',
    code: 'THỰC CHIẾN',
    title: 'Tiếng Trung Thực Chiến Sản Xuất & Xuất Nhập Khẩu',
    lessons: [
      {
        id: 'zh_prac_l1',
        title: 'Quản Lý Phân Xưởng May, Dây Chuyền & Kiểm Soát Lỗi Hàng (QC)',
        grammarFocus: 'Khẩu ngữ chỉ đạo thực tế tại công xưởng: 要求 (yêu cầu), 返工 (sửa hàng lỗi), 合格率 (tỷ lệ đạt tiêu chuẩn chất lượng).',
        vocabularies: [
          {
            id: 'zh_pr_1',
            word: '流水线',
            pronunciation: 'liúshuǐxiàn',
            hanViet: 'LƯU THỦY TUYẾN',
            partOfSpeech: 'noun',
            meaningVi: 'Dây chuyền sản xuất tự động / chuyền may',
            radicals: '氵+ 旒 (Lưu) | 氵(Thủy) | 纟(Mịch - sợi chỉ) + 戋 (Tuyến)',
            grammarNote: 'Thuật ngữ nhà máy. Công nhân trên chuyền: 流水线工人, Trưởng chuyền may: 线长 (xiànzhǎng).',
            exampleSentence: {
              target: '这批订单交期很紧，三号流水线必须全员加班赶工。',
              pronunciation: 'Zhè pī dìngdān jiāoqī hěn jǐn, sānhào liúshuǐxiàn bìxū quányuán jiābān gǎngōng.',
              meaningVi: 'Thời hạn giao của lô hàng này rất gấp, dây chuyền số 3 bắt buộc toàn thể nhân viên phải tăng ca làm gấp.'
            }
          },
          {
            id: 'zh_pr_2',
            word: '次品',
            pronunciation: 'cìpǐn',
            hanViet: 'THỨ PHẨM',
            partOfSpeech: 'noun',
            meaningVi: 'Hàng lỗi, phế phẩm, hàng loại B',
            radicals: '冫+ 欠 (Thứ - kém hơn, thứ yếu) | 三 cái 口 (Phẩm - sản phẩm)',
            grammarNote: 'Hàng không đạt chuẩn chất lượng. Tỷ lệ hàng lỗi: 次品率 (cìpǐnlǜ). Trái nghĩa với 正品 (hàng chuẩn chất lượng).',
            exampleSentence: {
              target: '质检员发现这箱衣服针脚不齐，属于次品，必须全部退回返工。',
              pronunciation: 'Zhìjiǎnyuán fāxiàn zhè xiāng yīfu zhēnjiǎo bù qí, shǔyú cìpǐn, bìxū quánbù tuìhuí fǎngōng.',
              meaningVi: 'Nhân viên kiểm phẩm phát hiện thùng áo này đường may không đều, thuộc loại hàng lỗi, bắt buộc phải trả lại sửa toàn bộ.'
            }
          },
          {
            id: 'zh_pr_3',
            word: '提单',
            pronunciation: 'tídān',
            hanViet: 'ĐỀ ĐƠN',
            partOfSpeech: 'noun',
            meaningVi: 'Vận đơn đường biển (Bill of Lading - B/L)',
            radicals: '扌+ 是 (Đề - nâng lên, lấy hàng) | 𠮦 + 十 (Đơn - tờ chứng từ)',
            grammarNote: 'Văn kiện quan trọng nhất trong xuất nhập khẩu đường biển. Ký phát vận đơn gốc: 签发正本提单 (Original B/L).',
            exampleSentence: {
              target: '客户在收到全额货款后，才会将正本海运提单寄给进口方。',
              pronunciation: 'Kèhù zài shōudào quán\'é huòkuǎn hòu, cái huì jiāng zhèngběn hǎiyùn tídān jì gěi jìnkǒufāng.',
              meaningVi: 'Sau khi nhận đủ toàn bộ tiền hàng, khách hàng mới gửi vận đơn đường biển bản gốc cho bên nhập khẩu.'
            }
          },
          {
            id: 'zh_pr_4',
            word: '集装箱',
            pronunciation: 'jízhuāngxiāng',
            hanViet: 'TẬP TRANG TƯƠNG',
            partOfSpeech: 'noun',
            meaningVi: 'Thùng container chở hàng',
            radicals: '隹 + 木 (Tập - tụ hội) | 壮 + 衣 (Trang - đóng gói) | 竹 + 相 (Tương - thùng hộp)',
            grammarNote: 'Container 20 feet: 小柜 (20GP), Container 40 feet: 大柜 (40GP/40HQ). Đóng hàng vào cont: 装柜.',
            exampleSentence: {
              target: '今天下午有三个四十尺高柜集装箱进港，请仓库安排人员装车。',
              pronunciation: 'Jīntiān xiàwǔ yǒu sān gè sìshí chǐ gāoguì jízhuāngxiāng jìn gǎng, qǐng cāngkù ānpái rényuán zhuāngchē.',
              meaningVi: 'Chiều nay có 3 container 40 feet cao cập cảng, xin kho sắp xếp nhân lực để bốc xếp lên xe.'
            }
          }
        ]
      }
    ]
  }
};

export const AUTHENTIC_EN_DATA = {
  // =========================================================================
  // CHẶNG 0: NHẬP MÔN IPA 44 ÂM
  // =========================================================================
  en_ipa: {
    levelId: 'en_ipa',
    code: 'IPA',
    title: 'Nhập Môn Bảng Ký Hiệu Ngữ Âm Quốc Tế IPA',
    lessons: [
      {
        id: 'en_ipa_l1',
        title: 'Nguyên Âm Đơn Dài & Ngắn (/i:/ vs /ɪ/) & Trọng Âm Từ',
        grammarFocus: 'Phân biệt khẩu hình: /i:/ căng khóe miệng sang hai bên như đang mỉm cười, phát âm kéo dài. /ɪ/ thả lỏng cơ miệng, âm bật ngắn và dứt khoát.',
        vocabularies: [
          {
            id: 'en_ipa_1',
            word: 'sheep',
            pronunciation: '/ʃiːp/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Con cừu (âm /i:/ dài)',
            radicals: 'Phụ âm xát vô thanh /ʃ/ + nguyên âm dài /i:/ + phụ âm bật /p/',
            grammarNote: 'Danh từ số ít và số nhiều giống nhau: one sheep, two sheep (không thêm s).',
            exampleSentence: {
              target: 'The farmer has a large flock of white sheep.',
              pronunciation: '/ðə ˈfɑːrmər hæz ə lɑːrdʒ flɑːk əv waɪt ʃiːp/',
              meaningVi: 'Người nông dân có một đàn cừu trắng lớn.'
            }
          },
          {
            id: 'en_ipa_2',
            word: 'ship',
            pronunciation: '/ʃɪp/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Con tàu thủy lớn (âm /ɪ/ ngắn)',
            radicals: 'Phụ âm /ʃ/ + nguyên âm thả lỏng ngắn /ɪ/ + /p/',
            grammarNote: 'Cặp từ tối thiểu (minimal pair) phân biệt với sheep /ʃiːp/.',
            exampleSentence: {
              target: 'The cargo ship departed from the harbor at dawn.',
              pronunciation: '/ðə ˈkɑːrɡoʊ ʃɪp dɪˈpɑːrtɪd frəm ðə ˈhɑːrbər æt dɔːn/',
              meaningVi: 'Con tàu chở hàng đã rời cảng vào lúc rạng đông.'
            }
          },
          {
            id: 'en_ipa_3',
            word: 'banana',
            pronunciation: '/bəˈnænə/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Quả chuối (minh họa trọng âm 2 & âm Schwa /ə/)',
            radicals: 'Âm Schwa đầu /bə/ + trọng âm nhấn mạnh /næn/ + âm Schwa đuôi /ə/',
            grammarNote: 'Quy tắc âm Schwa /ə/: Âm tiết không mang trọng âm luôn bị lướt nhẹ thành âm Schwa.',
            exampleSentence: {
              target: 'Eating a fresh banana provides natural potassium and energy.',
              pronunciation: '/ˈiːtɪŋ ə freʃ bəˈnænə prəˈvaɪdz ˈnætʃrəl pəˈtæsiəm ænd ˈenərdʒi/',
              meaningVi: 'Ăn một quả chuối tươi cung cấp kali tự nhiên và năng lượng.'
            }
          },
          {
            id: 'en_ipa_4',
            word: 'pick it up',
            pronunciation: '/pɪk ɪt ʌp/',
            hanViet: null,
            partOfSpeech: 'phrase',
            meaningVi: 'Nhặt nó lên (nối âm phụ âm sang nguyên âm: /pɪ-kɪ-tʌp/)',
            radicals: 'Consonant-to-vowel linking rule (Nối k vào it, nối t vào up)',
            grammarNote: 'Hiện tượng nối âm Connected Speech: Khi một từ kết thúc bằng phụ âm và từ kế tiếp bắt đầu bằng nguyên âm, phụ âm sẽ trượt sang từ tiếp theo.',
            exampleSentence: {
              target: 'Your book fell on the floor, please pick it up.',
              pronunciation: '/jʊr bʊk fel ɑːn ðə flɔːr, pliːz pɪk ɪt ʌp/',
              meaningVi: 'Cuốn sách của bạn rơi trên sàn, xin hãy nhặt nó lên.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 1: CEFR A1 - BEGINNER (CĂN BẢN)
  // =========================================================================
  en_a1: {
    levelId: 'en_a1',
    code: 'A1',
    title: 'A1 - Beginner (Giao Tiếp Nền Tảng)',
    lessons: [
      {
        id: 'en_a1_l1',
        title: 'Giới Thiệu Bản Thân, Nghề Nghiệp & Thì Hiện Tại Đơn',
        grammarFocus: 'Thì Hiện tại đơn với động từ To Be (am/is/are) và Động từ thường (thêm s/es với he/she/it).',
        vocabularies: [
          {
            id: 'en_a1_1',
            word: 'engineer',
            pronunciation: '/ˌendʒɪˈnɪr/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Kỹ sư công nghệ / xây dựng',
            radicals: 'Gốc từ engine (động cơ cơ khí) + hậu tố chỉ người -eer',
            grammarNote: 'Bắt đầu bằng nguyên âm e, dùng mạo từ "an": an engineer.',
            exampleSentence: {
              target: 'My elder brother works as a software engineer in Hanoi.',
              pronunciation: '/maɪ ˈeldər ˈbrʌðər wɜːrks æz ə ˈsɔːftwer ˌendʒɪˈnɪr ɪn həˈnɔɪ/',
              meaningVi: 'Anh trai tôi làm kỹ sư phần mềm tại Hà Nội.'
            }
          },
          {
            id: 'en_a1_2',
            word: 'usually',
            pronunciation: '/ˈjuːʒuəli/',
            hanViet: null,
            partOfSpeech: 'adverb',
            meaningVi: 'Thường thường (trạng từ chỉ tần suất ~80%)',
            radicals: 'Tính từ usual + hậu tố trạng từ -ly',
            grammarNote: 'Vị trí trạng từ tần suất: Đứng TRƯỚC động từ thường, đứng SAU động từ to be.',
            exampleSentence: {
              target: 'She usually wakes up at six o\'clock and goes jogging in the park.',
              pronunciation: '/ʃi ˈjuːʒuəli weɪks ʌp æt sɪks əˈklɑːk ænd ɡoʊz ˈdʒɑːɡɪŋ ɪn ðə pɑːrk/',
              meaningVi: 'Cô ấy thường thức dậy lúc 6 giờ và đi chạy bộ trong công viên.'
            }
          },
          {
            id: 'en_a1_3',
            word: 'delicious',
            pronunciation: '/dɪˈlɪʃəs/',
            hanViet: null,
            partOfSpeech: 'adj',
            meaningVi: 'Thơm ngon, ngon miệng',
            radicals: 'Gốc La-tinh delicere (thu hút, lôi cuốn) + hậu tố tính từ -ious',
            grammarNote: 'Tính từ tuyệt đối (extreme adjective), không dùng "very delicious", dùng "really / absolutely delicious".',
            exampleSentence: {
              target: 'This Vietnamese beef noodle soup is truly delicious.',
              pronunciation: '/ðɪs ˌvjetnəˈmiːz biːf ˈnuːdl suːp ɪz ˈtruːli dɪˈlɪʃəs/',
              meaningVi: 'Món phở bò Việt Nam này thực sự rất ngon.'
            }
          },
          {
            id: 'en_a1_4',
            word: 'expensive',
            pronunciation: '/ɪkˈspensɪv/',
            hanViet: null,
            partOfSpeech: 'adj',
            meaningVi: 'Đắt tiền, đắt đỏ',
            radicals: 'Tiền tố ex- (ra ngoài) + pendere (chi trả tiền bạc) + -ive',
            grammarNote: 'Tính từ 3 âm tiết. So sánh hơn dùng "more expensive than", so sánh nhất dùng "the most expensive".',
            exampleSentence: {
              target: 'That luxury watch is far too expensive for a college student.',
              pronunciation: '/ðæt ˈlʌkʃəri wɑːtʃ ɪz fɑːr tuː ɪkˈspensɪv fɔːr ə ˈkɑːlɪdʒ ˈstuːdnt/',
              meaningVi: 'Chiếc đồng hồ xa xỉ đó quá đắt đối với một sinh viên đại học.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 2: CEFR A2 - ELEMENTARY (SƠ CẤP)
  // =========================================================================
  en_a2: {
    levelId: 'en_a2',
    code: 'A2',
    title: 'A2 - Elementary (Giao Tiếp Mở Rộng)',
    lessons: [
      {
        id: 'en_a2_l1',
        title: 'Hỏi Đường, Du Lịch Khách Sạn & Phrasal Verbs',
        grammarFocus: 'Thì Quá khứ đơn (Past Simple) với động từ bất quy tắc (went, bought, saw). Cụm động từ Phrasal Verbs thông dụng.',
        vocabularies: [
          {
            id: 'en_a2_1',
            word: 'reservation',
            pronunciation: '/ˌrezərˈveɪʃn/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Sự đặt chỗ trước (khách sạn, nhà hàng)',
            radicals: 'Động từ reserve (giữ chỗ) + hậu tố danh từ hóa -ation',
            grammarNote: 'Cụm động từ cố định: make a reservation (đặt chỗ trước).',
            exampleSentence: {
              target: 'We made a hotel reservation two weeks before our trip to Da Nang.',
              pronunciation: '/wi meɪd ə hoʊˈtel ˌrezərˈveɪʃn tuː wiːks bɪˈfɔːr ˈaʊər trɪp tuː dɑː nɑːŋ/',
              meaningVi: 'Chúng tôi đã đặt phòng khách sạn hai tuần trước chuyến đi Đà Nẵng.'
            }
          },
          {
            id: 'en_a2_2',
            word: 'look for',
            pronunciation: '/lʊk fɔːr/',
            hanViet: null,
            partOfSpeech: 'phrase',
            meaningVi: 'Tìm kiếm người hoặc đồ vật',
            radicals: 'Động từ look + giới từ for',
            grammarNote: 'Phrasal Verb không thể tách rời: look for something/someone. Khác với look after (chăm sóc).',
            exampleSentence: {
              target: 'Excuse me, I am looking for the nearest subway station.',
              pronunciation: '/ɪkˈskjuːz mi, aɪ æm ˈlʊkɪŋ fɔːr ðə ˈnɪrɪst ˈsʌbweɪ ˈsteɪʃn/',
              meaningVi: 'Xin lỗi, tôi đang tìm kiếm ga tàu điện ngầm gần nhất.'
            }
          },
          {
            id: 'en_a2_3',
            word: 'luggage',
            pronunciation: '/ˈlʌɡɪdʒ/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Hành lý vali',
            radicals: 'Gốc động từ lug (kéo lê nặng nề) + hậu tố -age',
            grammarNote: 'Danh từ KHÔNG đếm được (uncountable). Muốn đếm phải dùng: a piece of luggage.',
            exampleSentence: {
              target: 'Passengers must not leave their luggage unattended at the airport.',
              pronunciation: '/ˈpæsɪndʒərz mʌst nɑːt liːv ðer ˈlʌɡɪdʒ ˌʌnəˈtendɪd æt ði ˈerpɔːrt/',
              meaningVi: 'Hành khách không được để hành lý của mình mà không có người trông coi tại sân bay.'
            }
          },
          {
            id: 'en_a2_4',
            word: 'turn on',
            pronunciation: '/tɜːrn ɑːn/',
            hanViet: null,
            partOfSpeech: 'phrase',
            meaningVi: 'Bật nguồn thiết bị điện',
            radicals: 'Động từ turn + giới từ on',
            grammarNote: 'Có thể tách rời: turn the air conditioner on HOẶC turn on the air conditioner.',
            exampleSentence: {
              target: 'It is very hot inside the room, please turn on the air conditioner.',
              pronunciation: '/ɪt ɪz ˈveri hɑːt ɪnˈsaɪd ðə ruːm, pliːz tɜːrn ɑːn ði ˈer kəndɪʃənər/',
              meaningVi: 'Bên trong phòng rất nóng, xin hãy bật điều hòa nhiệt độ lên.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 3: CEFR B1 - INTERMEDIATE (CÔNG SỞ & ĐỘC LẬP)
  // =========================================================================
  en_b1: {
    levelId: 'en_b1',
    code: 'B1',
    title: 'B1 - Intermediate (Tiếng Anh Độc Lập & Công Sở)',
    lessons: [
      {
        id: 'en_b1_l1',
        title: 'Thư Tín Công Việc, Phỏng Vấn STAR & Câu Điều Kiện',
        grammarFocus: 'Câu điều kiện loại 1 (có thật ở tương lai) và loại 2 (giả định ở hiện tại). Cấu trúc viết Email thương mại trang trọng.',
        vocabularies: [
          {
            id: 'en_b1_1',
            word: 'attachment',
            pronunciation: '/əˈtætʃmənt/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Tệp đính kèm trong thư điện tử',
            radicals: 'Tiền tố ad- + attach (gắn chặt vào) + hậu tố danh từ -ment',
            grammarNote: 'Cụm từ chuẩn thương mại: Please find attached the document / See the attachment.',
            exampleSentence: {
              target: 'Please review the financial budget in the email attachment before our meeting.',
              pronunciation: '/pliːz rɪˈvjuː ðə faɪˈnænʃl ˈbʌdʒɪt ɪn ði ˈiːmeɪl əˈtætʃmənt bɪˈfɔːr ˈaʊər ˈmiːtɪŋ/',
              meaningVi: 'Xin vui lòng xem xét ngân sách tài chính trong tệp đính kèm email trước cuộc họp của chúng ta.'
            }
          },
          {
            id: 'en_b1_2',
            word: 'responsibility',
            pronunciation: '/rɪˌspɑːnsəˈbɪləti/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Trách nhiệm, bổn phận công việc',
            radicals: 'Tính từ responsible (chịu trách nhiệm) + hậu tố -ity',
            grammarNote: 'Đi với giới từ for: take responsibility for something (chịu trách nhiệm về điều gì).',
            exampleSentence: {
              target: 'The marketing manager takes full responsibility for coordinating the brand campaign.',
              pronunciation: '/ðə ˈmɑːrkɪtɪŋ ˈmænɪdʒər teɪks fʊl rɪˌspɑːnsəˈbɪləti fɔːr koʊˈɔːrdɪneɪtɪŋ ðə brænd kæmˈpeɪn/',
              meaningVi: 'Trưởng phòng tiếp thị chịu toàn bộ trách nhiệm về việc điều phối chiến dịch thương hiệu.'
            }
          },
          {
            id: 'en_b1_3',
            word: 'in conclusion',
            pronunciation: '/ɪn kənˈkluːʒn/',
            hanViet: null,
            partOfSpeech: 'phrase',
            meaningVi: 'Tóm lại, để kết luận bài nói/viết',
            radicals: 'Giới từ in + danh từ conclusion (kết luận)',
            grammarNote: 'Cụm liên kết chuyển ý (signposting) nằm ở đầu câu kết luận bài thuyết trình hoặc bài viết.',
            exampleSentence: {
              target: 'In conclusion, adopting renewable energy will cut operational costs significantly.',
              pronunciation: '/ɪn kənˈkluːʒn, əˈdɑːptɪŋ rɪˈnuːəbl ˈenərdʒi wɪl kʌt ˌɑːpəˈreɪʃənl kɔːsts sɪɡˈnɪfɪkəntli/',
              meaningVi: 'Tóm lại, việc áp dụng năng lượng tái tạo sẽ cắt giảm chi phí vận hành một cách đáng kể.'
            }
          },
          {
            id: 'en_b1_4',
            word: 'compromise',
            pronunciation: '/ˈkɑːmprəmaɪz/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Sự thỏa hiệp đôi bên cùng có lợi',
            radicals: 'Tiền tố com- (cùng nhau) + promise (hứa hẹn, cam kết)',
            grammarNote: 'Thường dùng cụm: reach a compromise (đạt được thỏa hiệp).',
            exampleSentence: {
              target: 'Both negotiation teams reached a fair compromise regarding delivery deadlines.',
              pronunciation: '/boʊθ nɪˌɡoʊʃiˈeɪʃn tiːmz riːtʃt ə fer ˈkɑːmprəmaɪz rɪˈɡɑːrdɪŋ dɪˈlɪvəri ˈdedlaɪnz/',
              meaningVi: 'Cả hai đội đàm phán đã đạt được một sự thỏa hiệp công bằng liên quan đến thời hạn giao hàng.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 4: CEFR B2 - UPPER-INTERMEDIATE (THƯƠNG MẠI & IELTS 6.5+)
  // =========================================================================
  en_b2: {
    levelId: 'en_b2',
    code: 'B2',
    title: 'B2 - Upper-Intermediate (Tiếng Anh Thương Mại & IELTS)',
    lessons: [
      {
        id: 'en_b2_l1',
        title: 'Đàm Phán Dự Án, Academic Collocations & Idioms',
        grammarFocus: 'Academic Collocations (deeply concerned, take into account) & Cấu trúc câu phức dạng nhượng bộ (Nevertheless, In spite of).',
        vocabularies: [
          {
            id: 'en_b2_1',
            word: 'take into account',
            pronunciation: '/teɪk ˈɪntuː əˈkaʊnt/',
            hanViet: null,
            partOfSpeech: 'phrase',
            meaningVi: 'Tính đến, cân nhắc kỹ lưỡng',
            radicals: 'Collocation học thuật chuẩn IELTS tương đương consider carefully',
            grammarNote: 'Cấu trúc: take something into account HOẶC take into account that + mệnh đề.',
            exampleSentence: {
              target: 'Investors must take into account fluctuating exchange rates before buying foreign assets.',
              pronunciation: '/ɪnˈvestərz mʌst teɪk ˈɪntuː əˈkaʊnt ˈflʌktʃueɪtɪŋ ɪksˈtʃeɪndʒ reɪts bɪˈfɔːr ˈbaɪɪŋ ˈfɔːrən ˈæsets/',
              meaningVi: 'Các nhà đầu tư phải tính đến tỷ giá hối đoái biến động trước khi mua tài sản nước ngoài.'
            }
          },
          {
            id: 'en_b2_2',
            word: 'hit the nail on the head',
            pronunciation: '/hɪt ðə neɪl ɑːn ðə hed/',
            hanViet: null,
            partOfSpeech: 'idiom',
            meaningVi: 'Nói trúng phóc trọng tâm vấn đề',
            radicals: 'Thành ngữ tượng hình: đóng trúng ngay đầu cây đinh',
            grammarNote: 'Dùng khi ai đó đưa ra một nhận định chính xác hoàn hảo về nguyên nhân một sự việc.',
            exampleSentence: {
              target: 'Her incisive analysis of the supply chain bottlenecks really hit the nail on the head.',
              pronunciation: '/hɜːr ɪnˈsaɪsɪv əˈnæləsɪs əv ðə səˈplaɪ tʃeɪn ˈbɑːtlneks ˈriːəli hɪt ðə neɪl ɑːn ðə hed/',
              meaningVi: 'Phân tích sắc bén của cô ấy về những điểm nghẽn chuỗi cung ứng thực sự đã nói trúng phóc trọng tâm vấn đề.'
            }
          },
          {
            id: 'en_b2_3',
            word: 'fluctuate',
            pronunciation: '/ˈflʌktʃueɪt/',
            hanViet: null,
            partOfSpeech: 'verb',
            meaningVi: 'Dao động lên xuống bất thường (số liệu)',
            radicals: 'Gốc La-tinh fluctus (sóng nước dập dềnh) + hậu tố động từ -ate',
            grammarNote: 'Thường dùng trong miêu tả biểu đồ IELTS Writing Task 1: fluctuate between X and Y.',
            exampleSentence: {
              target: 'Crude oil prices fluctuated wildly between seventy and ninety dollars per barrel.',
              pronunciation: '/kruːd ɔɪl ˈpraɪsɪz ˈflʌktʃueɪtɪd ˈwaɪldli bɪˈtwiːn ˈsevnti ænd ˈnaɪnti ˈdɑːlərz pər ˈbærəl/',
              meaningVi: 'Giá dầu thô đã dao động dữ dội trong khoảng từ 70 đến 90 đô la một thùng.'
            }
          },
          {
            id: 'en_b2_4',
            word: 'burnout',
            pronunciation: '/ˈbɜːrnaʊt/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Hội chứng kiệt sức thể chất và tinh thần',
            radicals: 'Động từ burn (cháy rụi) + giới từ out (cạn kiệt)',
            grammarNote: 'Danh từ ghép chỉ trạng thái kiệt sức vì làm việc quá độ kéo dài.',
            exampleSentence: {
              target: 'Chronic workplace stress without adequate rest inevitably leads to severe employee burnout.',
              pronunciation: '/ˈkrɑːnɪk ˈwɜːrkpleɪs stres wɪˈðaʊt ˈædɪkwət rest ˌɪnˈevɪtəbli liːdz tuː sɪˈvɪr ɪmˈplɔɪiː ˈbɜːrnaʊt/',
              meaningVi: 'Căng thẳng mãn tính tại nơi làm việc mà không có sự nghỉ ngơi đầy đủ chắc chắn sẽ dẫn đến tình trạng kiệt sức nghiêm trọng của nhân viên.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 5: CEFR C1 - ADVANCED (HỌC THUẬT & CHUYÊN GIA)
  // =========================================================================
  en_c1: {
    levelId: 'en_c1',
    code: 'C1',
    title: 'C1 - Advanced (Học Thuật & Chuyên Gia)',
    lessons: [
      {
        id: 'en_c1_l1',
        title: 'Báo Cáo Tài Chính Chuyên Sâu, Quản Trị & Đảo Ngữ (Inversion)',
        grammarFocus: 'Cấu trúc đảo ngữ nhấn mạnh tu từ học thuật: Trạng từ phủ định đứng đầu câu (Seldom, Under no circumstances, Not only) + Trợ động từ + Chủ ngữ + Động từ.',
        vocabularies: [
          {
            id: 'en_c1_1',
            word: 'seldom have we seen',
            pronunciation: '/ˈseldəm hæv wiː siːn/',
            hanViet: null,
            partOfSpeech: 'phrase',
            meaningVi: 'Hiếm khi chúng ta từng chứng kiến (Đảo ngữ)',
            radicals: 'Trạng từ phủ định Seldom + trợ động từ have + chủ ngữ we + quá khứ phân từ seen',
            grammarNote: 'Cấu trúc Inversion đảo trợ động từ lên trước chủ ngữ nhằm tạo ấn tượng mạnh mẽ cho văn phong học thuật.',
            exampleSentence: {
              target: 'Seldom have we seen such profound transformation across global supply networks.',
              pronunciation: '/ˈseldəm hæv wiː siːn sʌtʃ prəˈfaʊnd ˌtrænsfərˈmeɪʃn əˈkrɔːs ˈɡloʊbl səˈplaɪ ˈnetwɜːrks/',
              meaningVi: 'Hiếm khi chúng ta từng chứng kiến một sự chuyển đổi sâu sắc đến như vậy trên khắp các mạng lưới cung ứng toàn cầu.'
            }
          },
          {
            id: 'en_c1_2',
            word: 'empirical evidence',
            pronunciation: '/ɪmˈpɪrɪkl ˈevɪdəns/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Bằng chứng thực nghiệm khoa học',
            radicals: 'Gốc Hy Lạp empeiria (kinh nghiệm thực tế) + evidence (bằng chứng rõ ràng)',
            grammarNote: 'Thuật ngữ cốt lõi trong nghiên cứu học thuật. Phân biệt với anecdotal evidence (bằng chứng truyền miệng cảm tính).',
            exampleSentence: {
              target: 'The researcher presented robust empirical evidence confirming the hypothesis.',
              pronunciation: '/ðə rɪˈsɜːrtʃər prɪˈzentɪd roʊˈbʌst ɪmˈpɪrɪkl ˈevɪdəns kənˈfɜːrmɪŋ ðə haɪˈpɑːθəsɪs/',
              meaningVi: 'Nhà nghiên cứu đã trình bày những bằng chứng thực nghiệm vững chắc xác nhận giả thuyết khoa học.'
            }
          },
          {
            id: 'en_c1_3',
            word: 'volatility',
            pronunciation: '/ˌvɑːləˈtɪləti/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Tính biến động khôn lường của thị trường',
            radicals: 'Gốc La-tinh volare (bay lượn) + hậu tố tính chất -ility',
            grammarNote: 'Thường nói về thị trường tài chính: market volatility, price volatility.',
            exampleSentence: {
              target: 'Heightened geopolitical tensions triggered sudden volatility in sovereign bond markets.',
              pronunciation: '/ˈhaɪtnd ˌdʒiːoʊpəˈlɪtɪkl ˈtenʃnz ˈtrɪɡərd ˈsʌdən ˌvɑːləˈtɪləti ɪn ˈsɑːvrɪn bɑːnd ˈmɑːrkɪts/',
              meaningVi: 'Căng thẳng địa chính trị gia tăng đã châm ngòi cho sự biến động đột ngột trên các thị trường trái phiếu chính phủ.'
            }
          },
          {
            id: 'en_c1_4',
            word: 'accountability',
            pronunciation: '/əˌkaʊntəˈbɪləti/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Trách nhiệm giải trình minh bạch',
            radicals: 'Tiền tố ad- + count (kiểm đếm sổ sách) + -able + -ity',
            grammarNote: 'Nguyên tắc quản trị cốt lõi: Corporate accountability & Transparency.',
            exampleSentence: {
              target: 'Strict regulatory audits enforce executive accountability and protect shareholders.',
              pronunciation: '/strɪkt ˈreɡjələtɔːri ˈɔːdɪts ɪnˈfɔːrs ɪɡˈzekjətɪv əˌkaʊntəˈbɪləti ænd prəˈtekt ˈʃerhoʊldərz/',
              meaningVi: 'Các cuộc kiểm toán theo quy định nghiêm ngặt thực thi trách nhiệm giải trình của ban điều hành và bảo vệ các cổ đông.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // CHẶNG 6: CEFR C2 - PROFICIENCY (BẢN XỨ & CHUYÊN NGHIỆP)
  // =========================================================================
  en_c2: {
    levelId: 'en_c2',
    code: 'C2',
    title: 'C2 - Mastery (Tiếng Anh Bản Xứ & Dịch Thuật)',
    lessons: [
      {
        id: 'en_c2_l1',
        title: 'Ngôn Ngữ Ngoại Giao, Thuật Ngữ Pháp Lý & Sắc Thái Tinh Tế',
        grammarFocus: 'Biện pháp tu từ giảm khinh (Litotes), Thuật ngữ pháp lý La-tinh (Force majeure) và Sắc thái từ vựng cao cấp (High-register lexical nuance).',
        vocabularies: [
          {
            id: 'en_c2_1',
            word: 'equivocal',
            pronunciation: '/ɪˈkwɪvəkl/',
            hanViet: null,
            partOfSpeech: 'adj',
            meaningVi: 'Nói nước đôi, ẩn ý mập mờ có chủ đích',
            radicals: 'Gốc aequus (ngang nhau) + vox/vocis (tiếng nói) → hai nghĩa ngang nhau',
            grammarNote: 'Trái nghĩa với unequivocal (dứt khoát rõ ràng, không thể hiểu khác được).',
            exampleSentence: {
              target: 'The ambassador\'s equivocal statement avoided assigning explicit blame to either delegation.',
              pronunciation: '/ði æmˈbæsədərz ɪˈkwɪvəkl ˈsteɪtmənt əˈvɔɪdɪd əˈsaɪnɪŋ ɪkˈsplɪsɪt bleɪm tuː ˈiːðər ˌdelɪˈɡeɪʃn/',
              meaningVi: 'Tuyên bố nước đôi của ngài đại sứ đã khéo léo tránh việc quy trách nhiệm công khai cho bất kỳ phái đoàn nào.'
            }
          },
          {
            id: 'en_c2_2',
            word: 'force majeure',
            pronunciation: '/ˌfɔːrs mæˈʒɜːr/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Trường hợp bất khả kháng (Thuật ngữ pháp lý quốc tế)',
            radicals: 'Gốc tiếng Pháp: Lực lượng/Sức mạnh to lớn hơn khả năng con người',
            grammarNote: 'Điều khoản pháp lý giải phóng các bên khỏi trách nhiệm thực hiện hợp đồng khi xảy ra thiên tai, chiến tranh.',
            exampleSentence: {
              target: 'The manufacturing consortium invoked the force majeure clause following the catastrophic port explosion.',
              pronunciation: '/ðə ˌmænjuˈfæktʃərɪŋ kənˈsɔːrtiəm ɪnˈvoʊkt ðə ˌfɔːrs mæˈʒɜːr klɔːz ˈfɑːloʊɪŋ ðə ˌkætəˈstrɑːfɪk pɔːrt ɪkˈsploʊʒn/',
              meaningVi: 'Tập đoàn sản xuất đã kích hoạt điều khoản bất khả kháng sau vụ nổ cảng biển mang tính thảm họa.'
            }
          },
          {
            id: 'en_c2_3',
            word: 'serendipity',
            pronunciation: '/ˌserənˈdɪpəti/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Sự may mắn tình cờ kỳ diệu dẫn đến khám phá vĩ đại',
            radicals: 'Tạo bởi Horace Walpole từ truyện cổ tích "Ba hoàng tử xứ Serendip" (Sri Lanka cổ)',
            grammarNote: 'Từ vựng đẹp nhất tiếng Anh chỉ những tình cờ ngẫu nhiên mang lại kết quả tuyệt vời (như việc tìm ra Penicillin).',
            exampleSentence: {
              target: 'Scientific breakthroughs are often born of meticulous research combined with pure serendipity.',
              pronunciation: '/ˌsaɪənˈtɪfɪk ˈbreɪkθruːz ɑːr ˈɔːfn bɔːrn əv məˈtɪkjələs rɪˈsɜːrtʃ kəmˈbaɪnd wɪð pjʊr ˌserənˈdɪpəti/',
              meaningVi: 'Những bước đột phá khoa học thường được sinh ra từ nghiên cứu tỉ mỉ kết hợp với sự may mắn tình cờ kỳ diệu.'
            }
          },
          {
            id: 'en_c2_4',
            word: 'simultaneous interpretation',
            pronunciation: '/ˌsaɪmlˈteɪniəs ɪnˌtɜːrprəˈteɪʃn/',
            hanViet: null,
            partOfSpeech: 'noun',
            meaningVi: 'Dịch cabin đồng thời tại hội nghị quốc tế',
            radicals: 'Tính từ simultaneous (đồng thời cùng lúc) + interpretation (thông dịch khẩu ngữ)',
            grammarNote: 'Khác với consecutive interpretation (dịch đuổi sau khi người nói dừng lại). Đòi hỏi độ phản xạ dưới 2 giây.',
            exampleSentence: {
              target: 'Diplomatic summits depend on seamless simultaneous interpretation to prevent costly misunderstandings.',
              pronunciation: '/ˌdɪpləˈmætɪk ˈsʌmɪts dɪˈpend ɑːn ˈsiːmləs ˌsaɪmlˈteɪniəs ɪnˌtɜːrprəˈteɪʃn tuː prɪˈvent ˈkɔːstli ˌmɪsʌndərˈstændɪŋz/',
              meaningVi: 'Các hội nghị thượng đỉnh ngoại giao phụ thuộc vào việc dịch cabin đồng thời liền mạch để ngăn ngừa những hiểu lầm tai hại.'
            }
          }
        ]
      }
    ]
  }
};

/**
 * Get all vocabulary items for a given level
 */
export const getVocabulariesForLevel = (levelId) => {
  const isZh = levelId.startsWith('zh');
  const dataset = isZh ? AUTHENTIC_ZH_DATA[levelId] : AUTHENTIC_EN_DATA[levelId];
  if (!dataset) return [];

  const list = [];
  for (const lesson of dataset.lessons || []) {
    if (lesson.vocabularies) {
      list.push(...lesson.vocabularies);
    }
  }
  return list;
};

/**
 * Get a specific lesson by lessonId from the authentic dataset
 */
export const getAuthenticLesson = (lessonId) => {
  for (const levelKey of Object.keys(AUTHENTIC_ZH_DATA)) {
    const level = AUTHENTIC_ZH_DATA[levelKey];
    const found = level.lessons?.find(l => l.id === lessonId);
    if (found) return { ...found, levelId: level.levelId, code: level.code, language: 'zh' };
  }

  for (const levelKey of Object.keys(AUTHENTIC_EN_DATA)) {
    const level = AUTHENTIC_EN_DATA[levelKey];
    const found = level.lessons?.find(l => l.id === lessonId);
    if (found) return { ...found, levelId: level.levelId, code: level.code, language: 'en' };
  }

  return null;
};

export default {
  AUTHENTIC_ZH_DATA,
  AUTHENTIC_EN_DATA,
  getVocabulariesForLevel,
  getAuthenticLesson
};
