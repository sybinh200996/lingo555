/**
 * generateCurricula.js
 * Node.js script to generate comprehensive Chinese & English curriculum files:
 *  - client/src/data/fullCurriculumZH.js
 *  - client/src/data/fullCurriculumEN.js
 *  - client/src/data/fullCurriculumGenerator.js
 * 
 * Complies 100% with requirements:
 * Chinese: 8 Stages (Pinyin + HSK1-6 + Practical Chinese), 10 lessons each = 80 lessons
 * English: 7 Stages (IPA + A1-C2), 10 lessons each = 70 lessons
 * Complete exercises: listening, speaking, matching, writing
 */

const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '../../client/src/data');

// =============================================================================
// 1. DATA DEFINITIONS FOR CHINESE CURRICULUM (8 STAGES × 10 LESSONS)
// =============================================================================
const ZH_STAGES = [
  {
    level_id: 'zh_pinyin',
    code: 'PINYIN',
    badge: 'Nhập Môn',
    color: '#10B981',
    unit_id: 'zh_u_pinyin_full',
    unit_number: 1,
    unit_title: 'Nhập Môn Pinyin, Thanh Điệu & 214 Bộ Thủ',
    unit_desc: 'Làm chủ toàn diện ngữ âm Pinyin, quy tắc biến điệu, 8 nét chữ Hán và các bộ thủ cốt lõi',
    lessons: [
      {
        num: 1,
        title: 'Âm Môi & Âm Đầu Lưỡi (b, p, m, f, d, t, n, l)',
        desc: 'Luyện phát âm chuẩn xác các phụ âm đầu môi và đầu lưỡi',
        vocab: [
          { word: 'bàba', char: '爸', vi: 'bố, cha', pinyin: 'bà ba', type: 'listening' },
          { word: 'māma', char: '妈', vi: 'mẹ', pinyin: 'mā ma', type: 'speaking' },
          { word: 'dà', char: '大', vi: 'to, lớn', pinyin: 'dà', type: 'writing' },
          { word: 'lǎoshī', char: '老', vi: 'giáo viên', pinyin: 'lǎo shī', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Âm Cuống Lưỡi & Mặt Lưỡi (g, k, h, j, q, x)',
        desc: 'Phân biệt âm bật hơi mạnh k, q và âm mặt lưỡi j, x',
        vocab: [
          { word: 'gēge', char: '哥', vi: 'anh trai', pinyin: 'gē ge', type: 'listening' },
          { word: 'hē', char: '喝', vi: 'uống (nước)', pinyin: 'hē', type: 'speaking' },
          { word: 'qù', char: '去', vi: 'đi tới', pinyin: 'qù', type: 'writing' },
          { word: 'xièxie', char: '谢', vi: 'cảm ơn', pinyin: 'xiè xie', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Âm Răng & Âm Cuốn Lưỡi (z, c, s, zh, ch, sh, r)',
        desc: 'Bí quyết đặt lưỡi để nói chuẩn giọng Bắc Kinh',
        vocab: [
          { word: 'zài', char: '在', vi: 'ở, tại', pinyin: 'zài', type: 'listening' },
          { word: 'shì', char: '是', vi: 'là, đúng', pinyin: 'shì', type: 'speaking' },
          { word: 'rén', char: '人', vi: 'người', pinyin: 'rén', type: 'writing' },
          { word: 'chī', char: '吃', vi: 'ăn (cơm)', pinyin: 'chī', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: '6 Vận Mẫu Đơn & 4 Thanh Điệu (a, o, e, i, u, ü)',
        desc: 'Hát chuẩn 4 thanh điệu: Ngang (1), Sắc (2), Hỏi (3), Huyền (4)',
        vocab: [
          { word: 'mā', char: '妈', vi: 'mẹ (thanh 1)', pinyin: 'mā', type: 'listening' },
          { word: 'má', char: '麻', vi: 'gai, tê (thanh 2)', pinyin: 'má', type: 'speaking' },
          { word: 'mǎ', char: '马', vi: 'ngựa (thanh 3)', pinyin: 'mǎ', type: 'writing' },
          { word: 'mà', char: '骂', vi: 'mắng (thanh 4)', pinyin: 'mà', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Vận Mẫu Kép & Vận Mẫu Mũi (ai, ei, ao, ou, an, en, ang, eng, ong)',
        desc: 'Quy tắc ghép âm mở miệng và khép mũi chuẩn xác',
        vocab: [
          { word: 'hǎo', char: '好', vi: 'tốt, đẹp', pinyin: 'hǎo', type: 'listening' },
          { word: 'péngyou', char: '朋', vi: 'bạn bè', pinyin: 'péng you', type: 'speaking' },
          { word: 'zhōng', char: '中', vi: 'trung, ở giữa', pinyin: 'zhōng', type: 'writing' },
          { word: 'máng', char: '忙', vi: 'bận rộn', pinyin: 'máng', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Biến Điệu Của 一 (yī) & 不 (bù) + Thanh Nhẹ',
        desc: 'Quy tắc biến âm tự nhiên khi nói lưu loát trong thực tế',
        vocab: [
          { word: 'yīdìng', char: '一', vi: 'nhất định (đọc yí)', pinyin: 'yí dìng', type: 'listening' },
          { word: 'bùkèqi', char: '不', vi: 'đừng khách sáo (bú)', pinyin: 'bú kè qi', type: 'speaking' },
          { word: 'yītiān', char: '天', vi: 'một ngày (đọc yì)', pinyin: 'yì tiān', type: 'writing' },
          { word: 'bùqù', char: '去', vi: 'không đi (đọc bú)', pinyin: 'bú qù', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: '8 Nét Chữ Hán Cơ Bản (Ngang, Sổ, Phẩy, Mác, Hất, Gập, Móc, Chấm)',
        desc: 'Làm quen viên gạch nền tảng của mọi chữ Hán',
        vocab: [
          { word: 'yī', char: '一', vi: 'nét ngang (nhất)', pinyin: 'yī', type: 'listening' },
          { word: 'shí', char: '十', vi: 'nét sổ (thập)', pinyin: 'shí', type: 'speaking' },
          { word: 'bā', char: '八', vi: 'nét phẩy & mác (bát)', pinyin: 'bā', type: 'writing' },
          { word: 'xiǎo', char: '小', vi: 'nét móc & chấm (tiểu)', pinyin: 'xiǎo', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Quy Tắc Bút Thuận Chuẩn (Trên trước dưới sau, trái trước phải sau)',
        desc: 'Viết đúng thứ tự nét để chữ vuông vắn, thanh thoát',
        vocab: [
          { word: 'èr', char: '二', vi: 'trên trước dưới sau (nhị)', pinyin: 'èr', type: 'listening' },
          { word: 'chuān', char: '川', vi: 'trái trước phải sau (sông)', pinyin: 'chuān', type: 'speaking' },
          { word: 'yuè', char: '月', vi: 'ngoài trước trong sau (nguyệt)', pinyin: 'yuè', type: 'writing' },
          { word: 'guó', char: '国', vi: 'vào trước đóng sau (quốc)', pinyin: 'guó', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: '25 Bộ Thủ Chỉ Người & Tự Nhiên Thông Dụng',
        desc: 'Bộ Nhân (亻), Bộ Nữ (女), Bộ Khẩu (口), Bộ Nhật (日), Bộ Mộc (木)',
        vocab: [
          { word: 'tā', char: '他', vi: 'anh ấy (bộ nhân đứng)', pinyin: 'tā', type: 'listening' },
          { word: 'tā', char: '她', vi: 'cô ấy (bộ nữ)', pinyin: 'tā', type: 'speaking' },
          { word: 'kǒu', char: '口', vi: 'miệng (bộ khẩu)', pinyin: 'kǒu', type: 'writing' },
          { word: 'mù', char: '木', vi: 'cây cối (bộ mộc)', pinyin: 'mù', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: '25 Bộ Thủ Hình Thể & Vật Dụng Thông Dụng',
        desc: 'Bộ Tâm (忄), Bộ Thủ (扌), Bộ Kim (钅), Bộ Thủy (氵), Bộ Hỏa (灬)',
        vocab: [
          { word: 'shuǐ', char: '水', vi: 'nước (bộ thủy)', pinyin: 'shuǐ', type: 'listening' },
          { word: 'huǒ', char: '火', vi: 'lửa (bộ hỏa)', pinyin: 'huǒ', type: 'speaking' },
          { word: 'shǒu', char: '手', vi: 'tay (bộ thủ)', pinyin: 'shǒu', type: 'writing' },
          { word: 'xīn', char: '心', vi: 'trái tim (bộ tâm)', pinyin: 'xīn', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'zh_hsk1',
    code: 'HSK1',
    badge: 'HSK 1',
    color: '#3B82F6',
    unit_id: 'zh_u_hsk1_full',
    unit_number: 1,
    unit_title: 'HSK 1 - Giao Tiếp Sơ Cấp (150 Từ Cốt Lõi)',
    unit_desc: 'Chào hỏi, gia đình, ngày tháng, mua sắm và sinh hoạt cơ bản',
    lessons: [
      {
        num: 1,
        title: 'Chào Hỏi & Làm Quen',
        desc: 'Học cách chào hỏi, cảm ơn và xin lỗi chuẩn người bản ngữ',
        vocab: [
          { word: 'nǐ hǎo', char: '你', vi: 'xin chào', pinyin: 'nǐ hǎo', type: 'listening' },
          { word: 'xièxie', char: '谢', vi: 'cảm ơn', pinyin: 'xiè xie', type: 'speaking' },
          { word: 'zàijiàn', char: '见', vi: 'tạm biệt', pinyin: 'zài jiàn', type: 'writing' },
          { word: 'duìbuqǐ', char: '对', vi: 'xin lỗi', pinyin: 'duì bu qǐ', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Quốc Tịch & Danh Tính',
        desc: 'Học cách nói bạn là người nước nào và nghề nghiệp cơ bản',
        vocab: [
          { word: 'wǒ shì', char: '我', vi: 'tôi là', pinyin: 'wǒ shì', type: 'listening' },
          { word: 'Yuènán', char: '越', vi: 'Việt Nam', pinyin: 'yuè nán', type: 'speaking' },
          { word: 'Zhōngguó', char: '国', vi: 'Trung Quốc', pinyin: 'zhōng guó', type: 'writing' },
          { word: 'xuéshēng', char: '学', vi: 'học sinh', pinyin: 'xué sheng', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Gia Đình & Tuổi Tác',
        desc: 'Giới thiệu các thành viên trong gia đình và hỏi bao nhiêu tuổi',
        vocab: [
          { word: 'bàba', char: '爸', vi: 'bố', pinyin: 'bà ba', type: 'listening' },
          { word: 'māma', char: '妈', vi: 'mẹ', pinyin: 'mā ma', type: 'speaking' },
          { word: 'suì', char: '岁', vi: 'tuổi', pinyin: 'suì', type: 'writing' },
          { word: 'jǐ gè', char: '几', vi: 'mấy, bao nhiêu', pinyin: 'jǐ ge', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Con Số & Thời Gian',
        desc: 'Đếm số từ 1 đến 100 và hỏi mấy giờ rồi',
        vocab: [
          { word: 'xiànzài', char: '现', vi: 'bây giờ', pinyin: 'xiàn zài', type: 'listening' },
          { word: 'diǎn', char: '点', vi: 'giờ (điểm)', pinyin: 'diǎn', type: 'speaking' },
          { word: 'fēnzhōng', char: '分', vi: 'phút', pinyin: 'fēn zhōng', type: 'writing' },
          { word: 'shí', char: '十', vi: 'mười', pinyin: 'shí', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Ngày Tháng & Lịch Trình',
        desc: 'Nói thứ, ngày, tháng, hôm nay, ngày mai và hôm qua',
        vocab: [
          { word: 'jīntiān', char: '今', vi: 'hôm nay', pinyin: 'jīn tiān', type: 'listening' },
          { word: 'míngtiān', char: '明', vi: 'ngày mai', pinyin: 'míng tiān', type: 'speaking' },
          { word: 'yuè', char: '月', vi: 'tháng', pinyin: 'yuè', type: 'writing' },
          { word: 'xīngqī', char: '期', vi: 'thứ, tuần', pinyin: 'xīng qī', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Mua Sắm & Tiền Tệ',
        desc: 'Hỏi bao nhiêu tiền, đắt quá và thanh toán bằng tiền tệ',
        vocab: [
          { word: 'duōshao qián', char: '钱', vi: 'bao nhiêu tiền', pinyin: 'duō shao qián', type: 'listening' },
          { word: 'mǎi', char: '买', vi: 'mua', pinyin: 'mǎi', type: 'speaking' },
          { word: 'kuài', char: '块', vi: 'đồng, tệ', pinyin: 'kuài', type: 'writing' },
          { word: 'tài guì le', char: '贵', vi: 'đắt quá rồi', pinyin: 'tài guì le', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Ăn Uống & Ẩm Thực',
        desc: 'Gọi món cơm, mì, uống trà, nước lọc và khen ngon',
        vocab: [
          { word: 'chī fàn', char: '饭', vi: 'ăn cơm', pinyin: 'chī fàn', type: 'listening' },
          { word: 'hē chá', char: '茶', vi: 'uống trà', pinyin: 'hē chá', type: 'speaking' },
          { word: 'shuǐguǒ', char: '果', vi: 'hoa quả', pinyin: 'shuǐ guǒ', type: 'writing' },
          { word: 'hǎochī', char: '好', vi: 'ngon miệng', pinyin: 'hǎo chī', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Phương Hướng & Vị Trí',
        desc: 'Chỉ phía trước, phía sau, bên trên, bên dưới và ở bên trong',
        vocab: [
          { word: 'qiánmiàn', char: '前', vi: 'phía trước', pinyin: 'qián mian', type: 'listening' },
          { word: 'hòumiàn', char: '后', vi: 'phía sau', pinyin: 'hòu mian', type: 'speaking' },
          { word: 'shàngmiàn', char: '上', vi: 'bên trên', pinyin: 'shàng mian', type: 'writing' },
          { word: 'lǐmiàn', char: '里', vi: 'bên trong', pinyin: 'lǐ mian', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Thời Tiết & Khí Hậu',
        desc: 'Hỏi hôm nay thời tiết thế nào, trời mưa, quá nóng hoặc lạnh',
        vocab: [
          { word: 'tiānqì', char: '气', vi: 'thời tiết', pinyin: 'tiān qì', type: 'listening' },
          { word: 'xiàyǔ', char: '雨', vi: 'trời mưa', pinyin: 'xià yǔ', type: 'speaking' },
          { word: 'rè', char: '热', vi: 'nóng', pinyin: 'rè', type: 'writing' },
          { word: 'lěng', char: '冷', vi: 'lạnh', pinyin: 'lěng', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Sức Khỏe & Cảm Xúc HSK 1',
        desc: 'Hỏi thăm sức khỏe, bày tỏ niềm vui và sự thích thú',
        vocab: [
          { word: 'shēntǐ', char: '身', vi: 'thân thể, sức khỏe', pinyin: 'shēn tǐ', type: 'listening' },
          { word: 'gāoxìng', char: '高', vi: 'vui mừng', pinyin: 'gāo xìng', type: 'speaking' },
          { word: 'xǐhuan', char: '喜', vi: 'thích thú', pinyin: 'xǐ huan', type: 'writing' },
          { word: 'hěn hǎo', char: '很', vi: 'rất tốt', pinyin: 'hěn hǎo', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'zh_hsk2',
    code: 'HSK2',
    badge: 'HSK 2',
    color: '#8B5CF6',
    unit_id: 'zh_u_hsk2_full',
    unit_number: 1,
    unit_title: 'HSK 2 - Giao Tiếp Sơ Cấp 2 (300 Từ Vựng)',
    unit_desc: 'Sở thích, đi lại, đặt phòng khách sạn, so sánh và câu chữ 把',
    lessons: [
      {
        num: 1,
        title: 'Sở Thích & Thể Thao',
        desc: 'Nói về đá bóng, bơi lội, ca hát và chạy bộ',
        vocab: [
          { word: 'tī zúqiú', char: '足', vi: 'đá bóng', pinyin: 'tī zú qiú', type: 'listening' },
          { word: 'yóuyǒng', char: '游', vi: 'bơi lội', pinyin: 'yóu yǒng', type: 'speaking' },
          { word: 'chànggē', char: '歌', vi: 'hát ca', pinyin: 'chàng gē', type: 'writing' },
          { word: 'pǎobù', char: '跑', vi: 'chạy bộ', pinyin: 'pǎo bù', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Giao Thông & Đi Lại Hàng Ngày',
        desc: 'Đi xe buýt, taxi, xe đạp hoặc tự lái xe hơi',
        vocab: [
          { word: 'gōnggòng qìchē', char: '车', vi: 'xe buýt', pinyin: 'gōng gòng qì chē', type: 'listening' },
          { word: 'chūzūchē', char: '租', vi: 'xe taxi', pinyin: 'chū zū chē', type: 'speaking' },
          { word: 'zìxíngchē', char: '行', vi: 'xe đạp', pinyin: 'zì xíng chē', type: 'writing' },
          { word: 'kāichē', char: '开', vi: 'lái xe', pinyin: 'kāi chē', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Đặt Phòng Khách Sạn & Dịch Vụ',
        desc: 'Hỏi giá phòng, số ngày ở và yêu cầu nhân viên phục vụ',
        vocab: [
          { word: 'fángjiān', char: '房', vi: 'phòng', pinyin: 'fáng jiān', type: 'listening' },
          { word: 'zhù', char: '住', vi: 'ở, lưu trú', pinyin: 'zhù', type: 'speaking' },
          { word: 'fúwùyuán', char: '务', vi: 'nhân viên phục vụ', pinyin: 'fú wù yuán', type: 'writing' },
          { word: 'jǐ tiān', char: '天', vi: 'mấy ngày', pinyin: 'jǐ tiān', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Hỏi Đường & Vị Trí Địa Lý',
        desc: 'Chỉ rẽ trái, rẽ phải, cách đây bao xa và đi thẳng',
        vocab: [
          { word: 'zuǒbian', char: '左', vi: 'bên trái', pinyin: 'zuǒ bian', type: 'listening' },
          { word: 'yòubian', char: '右', vi: 'bên phải', pinyin: 'yòu bian', type: 'speaking' },
          { word: 'lí', char: '离', vi: 'cách (khoảng cách)', pinyin: 'lí', type: 'writing' },
          { word: 'wǎng qián zǒu', char: '往', vi: 'đi về phía trước', pinyin: 'wǎng qián zǒu', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Công Việc & Sinh Hoạt',
        desc: 'Đi làm, tan ca, chuẩn bị báo cáo và cảm giác mệt mỏi',
        vocab: [
          { word: 'shàngbān', char: '班', vi: 'đi làm', pinyin: 'shàng bān', type: 'listening' },
          { word: 'xiàbān', char: '下', vi: 'tan sở', pinyin: 'xià bān', type: 'speaking' },
          { word: 'zhǔnbèi', char: '准', vi: 'chuẩn bị', pinyin: 'zhǔn bèi', type: 'writing' },
          { word: 'lèi', char: '累', vi: 'mệt mỏi', pinyin: 'lèi', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Cấu Trúc So Sánh Với 比 (Bǐ)',
        desc: 'Biểu đạt hơn kém: Anh ấy cao hơn tôi, hôm nay lạnh hơn hôm qua',
        vocab: [
          { word: 'bǐ', char: '比', vi: 'so với', pinyin: 'bǐ', type: 'listening' },
          { word: 'gèng', char: '更', vi: 'càng, hơn nữa', pinyin: 'gèng', type: 'speaking' },
          { word: 'gāo', char: '高', vi: 'cao lớn', pinyin: 'gāo', type: 'writing' },
          { word: 'duō', char: '多', vi: 'nhiều hơn', pinyin: 'duō', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Bổ Ngữ Kết Quả Thông Dụng',
        desc: 'Nhìn thấy (看见), nghe hiểu (听懂), làm xong (做完)',
        vocab: [
          { word: 'kànjiàn', char: '见', vi: 'nhìn thấy', pinyin: 'kàn jiàn', type: 'listening' },
          { word: 'tīngdǒng', char: '懂', vi: 'nghe hiểu', pinyin: 'tīng dǒng', type: 'speaking' },
          { word: 'zuòwán', char: '完', vi: 'làm xong', pinyin: 'zuò wán', type: 'writing' },
          { word: 'mǎidào', char: '到', vi: 'mua được', pinyin: 'mǎi dào', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Câu Chữ 把 (Bǎ) Căn Bản',
        desc: 'Tác động lên đồ vật: Đặt sách lên bàn, uống hết thuốc',
        vocab: [
          { word: 'bǎ', char: '把', vi: 'đem, lấy (giới từ 把)', pinyin: 'bǎ', type: 'listening' },
          { word: 'fàng zài', char: '放', vi: 'đặt ở', pinyin: 'fàng zài', type: 'speaking' },
          { word: 'chī le', char: '吃', vi: 'ăn rồi', pinyin: 'chī le', type: 'writing' },
          { word: 'guān shàng', char: '关', vi: 'đóng lại', pinyin: 'guān shàng', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Mua Sắm & Chọn Trang Phục',
        desc: 'Dùng lượng từ 件 (áo), 条 (quần), thử đồ và chọn màu sắc',
        vocab: [
          { word: 'yīfu', char: '衣', vi: 'quần áo', pinyin: 'yī fu', type: 'listening' },
          { word: 'jiàn', char: '件', vi: 'chiếc, cái (áo)', pinyin: 'jiàn', type: 'speaking' },
          { word: 'tiáo', char: '条', vi: 'chiếc, sợi (quần)', pinyin: 'tiáo', type: 'writing' },
          { word: 'yánsè', char: '色', vi: 'màu sắc', pinyin: 'yán sè', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Khám Bệnh & Nghỉ Ngơi',
        desc: 'Nói bị sốt, đau đầu, uống thuốc và xin phép nghỉ',
        vocab: [
          { word: 'shēngbìng', char: '病', vi: 'sinh bệnh, ốm', pinyin: 'shēng bìng', type: 'listening' },
          { word: 'fāshāo', char: '烧', vi: 'phát sốt', pinyin: 'fā shāo', type: 'speaking' },
          { word: 'chīyào', char: '药', vi: 'uống thuốc', pinyin: 'chī yào', type: 'writing' },
          { word: 'xiūxi', char: '休', vi: 'nghỉ ngơi', pinyin: 'xiū xi', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'zh_hsk3',
    code: 'HSK3',
    badge: 'HSK 3',
    color: '#EC4899',
    unit_id: 'zh_u_hsk3_full',
    unit_number: 1,
    unit_title: 'HSK 3 - Trung Cấp 1 (600 Từ Vựng)',
    unit_desc: 'Du lịch, môi trường, văn hóa, thuê nhà, bổ ngữ xu hướng và câu chữ 被',
    lessons: [
      {
        num: 1,
        title: 'Du Lịch & Chuẩn Bị Hành Lý',
        desc: 'Chuẩn bị hộ chiếu, vali, máy ảnh và vé máy bay',
        vocab: [
          { word: 'lǚyóu', char: '旅', vi: 'du lịch', pinyin: 'lǚ yóu', type: 'listening' },
          { word: 'hùzhào', char: '照', vi: 'hộ chiếu', pinyin: 'hù zhào', type: 'speaking' },
          { word: 'xínglixiāng', char: '箱', vi: 'vali hành lý', pinyin: 'xíng li xiāng', type: 'writing' },
          { word: 'dìtú', char: '图', vi: 'bản đồ', pinyin: 'dì tú', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Bảo Vệ Môi Trường & Thiên Nhiên',
        desc: 'Thảo luận về cây xanh, phân loại rác và bảo vệ dòng sông',
        vocab: [
          { word: 'huánjìng', char: '环', vi: 'môi trường', pinyin: 'huán jìng', type: 'listening' },
          { word: 'bǎohù', char: '保', vi: 'bảo vệ', pinyin: 'bǎo hù', type: 'speaking' },
          { word: 'lājī', char: '圾', vi: 'rác thải', pinyin: 'lā jī', type: 'writing' },
          { word: 'shùmù', char: '树', vi: 'cây cối', pinyin: 'shù mù', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Văn Hóa & Lễ Hội Truyền Thống',
        desc: 'Tết Nguyên Đán, Tết Trung Thu, gói bánh chẻo và cắt giấy',
        vocab: [
          { word: 'chūnjié', char: '春', vi: 'Tết Nguyên Đán', pinyin: 'chūn jié', type: 'listening' },
          { word: 'jiǎozǐ', char: '饺', vi: 'bánh sủi cảo', pinyin: 'jiǎo zi', type: 'speaking' },
          { word: 'chuántǒng', char: '统', vi: 'truyền thống', pinyin: 'chuán tǒng', type: 'writing' },
          { word: 'qìngzhù', char: '庆', vi: 'chúc mừng', pinyin: 'qìng zhù', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Thuê Nhà & Đời Sống Cư Dân',
        desc: 'Nói chuyện với chủ nhà, ký hợp đồng thuê và môi trường yên tĩnh',
        vocab: [
          { word: 'zū fángzi', char: '租', vi: 'thuê nhà', pinyin: 'zū fáng zi', type: 'listening' },
          { word: 'fángdōng', char: '东', vi: 'chủ nhà', pinyin: 'fáng dōng', type: 'speaking' },
          { word: 'bānjiā', char: '搬', vi: 'chuyển nhà', pinyin: 'bān jiā', type: 'writing' },
          { word: 'ānjìng', char: '静', vi: 'yên tĩnh', pinyin: 'ān jìng', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Khám Bệnh & Chăm Sóc Sức Khỏe',
        desc: 'Miêu tả triệu chứng đau đớn, kiểm tra tổng quát và tập thể dục',
        vocab: [
          { word: 'téng', char: '疼', vi: 'đau đớn', pinyin: 'téng', type: 'listening' },
          { word: 'jiǎnchá', char: '查', vi: 'kiểm tra', pinyin: 'jiǎn chá', type: 'speaking' },
          { word: 'yánzhòng', char: '重', vi: 'nghiêm trọng', pinyin: 'yán zhòng', type: 'writing' },
          { word: 'duànliàn', char: '炼', vi: 'rèn luyện thân thể', pinyin: 'duàn liàn', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Ngân Hàng & Giao Dịch Tiền Tệ',
        desc: 'Mở sổ tiết kiệm, gửi tiền, rút tiền và đổi ngoại tệ',
        vocab: [
          { word: 'yínháng', char: '银', vi: 'ngân hàng', pinyin: 'yín háng', type: 'listening' },
          { word: 'cúnqián', char: '存', vi: 'gửi tiền', pinyin: 'cún qián', type: 'speaking' },
          { word: 'qǔqián', char: '取', vi: 'rút tiền', pinyin: 'qǔ qián', type: 'writing' },
          { word: 'xìnyòngkǎ', char: '卡', vi: 'thẻ tín dụng', pinyin: 'xìn yòng kǎ', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Bổ Ngữ Xu Hướng Phức Hợp',
        desc: 'Chạy ra ngoài (跑出来), mang sang đó (拿过去), đứng dậy (站起来)',
        vocab: [
          { word: 'chūlai', char: '来', vi: 'ra đây', pinyin: 'chū lai', type: 'listening' },
          { word: 'guòqu', char: '去', vi: 'qua đó', pinyin: 'guò qu', type: 'speaking' },
          { word: 'zhàn qǐlai', char: '站', vi: 'đứng dậy', pinyin: 'zhàn qǐ lai', type: 'writing' },
          { word: 'ná jìnqu', char: '拿', vi: 'cầm vào trong', pinyin: 'ná jìn qu', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Câu Bị Động Chữ 被 (Bèi)',
        desc: 'Diễn đạt bị, được: Bị đánh cắp, được khen thưởng, bị phát hiện',
        vocab: [
          { word: 'bèi', char: '被', vi: 'bị, được (bị động)', pinyin: 'bèi', type: 'listening' },
          { word: 'tōu', char: '偷', vi: 'trộm, cắp', pinyin: 'tōu', type: 'speaking' },
          { word: 'biǎoyáng', char: '扬', vi: 'khen ngợi, biểu dương', pinyin: 'biǎo yáng', type: 'writing' },
          { word: 'fāxiàn', char: '现', vi: 'phát hiện ra', pinyin: 'fā xiàn', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Bày Tỏ Cảm Xúc & Quan Điểm',
        desc: 'Bày tỏ sự hài lòng, đau lòng, lo lắng và nhận định cá nhân',
        vocab: [
          { word: 'mǎnyì', char: '满', vi: 'hài lòng, mãn nguyện', pinyin: 'mǎn yì', type: 'listening' },
          { word: 'nánguò', char: '难', vi: 'buồn lòng', pinyin: 'nán guò', type: 'speaking' },
          { word: 'dānxīn', char: '心', vi: 'lo lắng', pinyin: 'dān xīn', type: 'writing' },
          { word: 'rènwéi', char: '认', vi: 'cho rằng, nhận định', pinyin: 'rèn wéi', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Đón Tiếp Khách & Dự Tiệc Chúc Mừng',
        desc: 'Mời khách ăn cơm, tặng quà sinh nhật và nâng ly chúc mừng',
        vocab: [
          { word: 'qǐngkè', char: '客', vi: 'mời khách, thết đãi', pinyin: 'qǐng kè', type: 'listening' },
          { word: 'lǐwù', char: '物', vi: 'món quà', pinyin: 'lǐ wù', type: 'speaking' },
          { word: 'dàngāo', char: '糕', vi: 'bánh ngọt, bánh kem', pinyin: 'dàn gāo', type: 'writing' },
          { word: 'gānbēi', char: '杯', vi: 'cạn ly', pinyin: 'gān bēi', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'zh_hsk4',
    code: 'HSK4',
    badge: 'HSK 4',
    color: '#F59E0B',
    unit_id: 'zh_u_hsk4_full',
    unit_number: 1,
    unit_title: 'HSK 4 - Trung Cao Cấp (1.200 Từ Vựng)',
    unit_desc: 'Thương mại điện tử, phỏng vấn xin việc, kinh tế, giáo dục và thành ngữ Chengyu',
    lessons: [
      {
        num: 1,
        title: 'Thương Mại Điện Tử & Mua Sắm Online',
        desc: 'Mua hàng online, giỏ hàng, chuyển phát nhanh và đánh giá 5 sao',
        vocab: [
          { word: 'wǎnggòu', char: '网', vi: 'mua sắm qua mạng', pinyin: 'wǎng gòu', type: 'listening' },
          { word: 'kuàidì', char: '递', vi: 'chuyển phát nhanh', pinyin: 'kuài dì', type: 'speaking' },
          { word: 'gòuwùchē', char: '购', vi: 'giỏ mua hàng', pinyin: 'gòu wù chē', type: 'writing' },
          { word: 'píngjià', char: '评', vi: 'đánh giá', pinyin: 'píng jià', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Phỏng Vấn Xin Việc & Sơ Yếu Lý Lịch',
        desc: 'Chuẩn bị CV, tự tin ứng tuyển và đàm phán mức lương',
        vocab: [
          { word: 'miànshì', char: '试', vi: 'phỏng vấn trực tiếp', pinyin: 'miàn shì', type: 'listening' },
          { word: 'jiǎnlì', char: '简', vi: 'sơ yếu lý lịch, CV', pinyin: 'jiǎn lì', type: 'speaking' },
          { word: 'yìngpìn', char: '聘', vi: 'ứng tuyển vị trí', pinyin: 'yìng pìn', type: 'writing' },
          { word: 'yōushì', char: '优', vi: 'ưu thế, điểm mạnh', pinyin: 'yōu shì', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Kinh Tế & Quản Lý Tài Chính',
        desc: 'Nghiên cứu thị trường, vốn đầu tư, chi phí và lợi nhuận',
        vocab: [
          { word: 'jīngjì', char: '济', vi: 'kinh tế', pinyin: 'jīng jì', type: 'listening' },
          { word: 'tóuzī', char: '投', vi: 'đầu tư', pinyin: 'tóu zī', type: 'speaking' },
          { word: 'chéngběn', char: '本', vi: 'chi phí giá thành', pinyin: 'chéng běn', type: 'writing' },
          { word: 'lìrùn', char: '润', vi: 'lợi nhuận thu về', pinyin: 'lì rùn', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Giáo Dục & Thi Cử Học Thuật',
        desc: 'Trường trọng điểm, học bổng đại học và tích lũy tri thức',
        vocab: [
          { word: 'jiàoyù', char: '育', vi: 'giáo dục', pinyin: 'jiào yù', type: 'listening' },
          { word: 'jiǎngxuéjīn', char: '金', vi: 'học bổng khuyến học', pinyin: 'jiǎng xué jīn', type: 'speaking' },
          { word: 'zhīshi', char: '识', vi: 'tri thức, kiến thức', pinyin: 'zhī shi', type: 'writing' },
          { word: 'yángé', char: '严', vi: 'nghiêm khắc', pinyin: 'yán gé', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Khoa Học & Công Nghệ Hiện Đại',
        desc: 'Mạng internet, trí tuệ nhân tạo, smartphone và phát minh',
        vocab: [
          { word: 'kēxué', char: '科', vi: 'khoa học', pinyin: 'kē xué', type: 'listening' },
          { word: 'hùliánwǎng', char: '联', vi: 'mạng internet', pinyin: 'hù lián wǎng', type: 'speaking' },
          { word: 'fāmíng', char: '明', vi: 'phát minh mới', pinyin: 'fā míng', type: 'writing' },
          { word: 'zhìnéng', char: '智', vi: 'thông minh, trí tuệ', pinyin: 'zhì néng', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Thành Ngữ Tứ Tự (Chengyu) Cốt Lõi',
        desc: 'Bỏ dở giữa chừng (半途而废), lung tung hỗn loạn (乱七八糟)',
        vocab: [
          { word: 'bàntú ér fèi', char: '废', vi: 'bỏ dở giữa chừng', pinyin: 'bàn tú ér fèi', type: 'listening' },
          { word: 'luànqībāzāo', char: '乱', vi: 'lộn xộn bừa bãi', pinyin: 'luàn qī bā zāo', type: 'speaking' },
          { word: 'fēngfù duōcǎi', char: '丰', vi: 'phong phú đa dạng', pinyin: 'fēng fù duō cǎi', type: 'writing' },
          { word: 'mǎdào chénggōng', char: '功', vi: 'mã đáo thành công', pinyin: 'mǎ dào chéng gōng', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Liên Từ Phức Hợp & Câu Phức HSK 4',
        desc: 'Không những... mà còn..., cho dù... cũng..., bất kể... đều...',
        vocab: [
          { word: 'bùjǐn', char: '仅', vi: 'không những', pinyin: 'bù jǐn', type: 'listening' },
          { word: 'jìshǐ', char: '使', vi: 'cho dù, dẫu rằng', pinyin: 'jì shǐ', type: 'speaking' },
          { word: 'wúlùn', char: '论', vi: 'bất luận, dù cho', pinyin: 'wú lùn', type: 'writing' },
          { word: 'yīncǐ', char: '此', vi: 'do đó, bởi vậy', pinyin: 'yīn cǐ', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Giao Tiếp Xã Hội & Ứng Xử Văn Minh',
        desc: 'Lịch sự tôn trọng người khác, giải quyết hiểu lầm trong giao tiếp',
        vocab: [
          { word: 'lǐmào', char: '礼', vi: 'lễ phép, lịch thiệp', pinyin: 'lǐ mào', type: 'listening' },
          { word: 'zūnzhòng', char: '尊', vi: 'tôn trọng', pinyin: 'zūn zhòng', type: 'speaking' },
          { word: 'wùhuì', char: '误', vi: 'hiểu lầm', pinyin: 'wù huì', type: 'writing' },
          { word: 'jiāoliú', char: '流', vi: 'giao lưu, kết nối', pinyin: 'jiāo liú', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Bảo Hiểm & Pháp Luật Đời Sống',
        desc: 'Mua bảo hiểm y tế, tuân thủ pháp luật và nâng cao ý thức trách nhiệm',
        vocab: [
          { word: 'bǎoxiǎn', char: '险', vi: 'bảo hiểm', pinyin: 'bǎo xiǎn', type: 'listening' },
          { word: 'fǎlǜ', char: '律', vi: 'pháp luật', pinyin: 'fǎ lǜ', type: 'speaking' },
          { word: 'zérèn', char: '责', vi: 'trách nhiệm', pinyin: 'zé rèn', type: 'writing' },
          { word: 'ānquán', char: '安', vi: 'an toàn', pinyin: 'ān quán', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Nghệ Thuật, Âm Nhạc & Điện Ảnh',
        desc: 'Đạo diễn, diễn viên kịch, buổi biểu diễn xuất sắc và tác phẩm hay',
        vocab: [
          { word: 'yìshù', char: '术', vi: 'nghệ thuật', pinyin: 'yì shù', type: 'listening' },
          { word: 'dǎoyǎn', char: '导', vi: 'đạo diễn', pinyin: 'dǎo yǎn', type: 'speaking' },
          { word: 'yǎnyuán', char: '演', vi: 'diễn viên', pinyin: 'yǎn yuán', type: 'writing' },
          { word: 'jīngcǎi', char: '彩', vi: 'đặc sắc, xuất sắc', pinyin: 'jīng cǎi', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'zh_hsk5',
    code: 'HSK5',
    badge: 'HSK 5',
    color: '#EF4444',
    unit_id: 'zh_u_hsk5_full',
    unit_number: 1,
    unit_title: 'HSK 5 - Cao Cấp 1 (2.500 Từ Vựng)',
    unit_desc: 'Đàm phán thương mại, tin tức thời sự, viết luận học thuật và thuyết trình chuyên nghiệp',
    lessons: [
      {
        num: 1,
        title: 'Đàm Phán Thương Mại Quốc Tế',
        desc: 'Ký kết hợp tác chiến lược, điều đình lợi ích đôi bên cùng có lợi',
        vocab: [
          { word: 'tánpàn', char: '判', vi: 'đàm phán', pinyin: 'tán pàn', type: 'listening' },
          { word: 'qiānshǔ', char: '署', vi: 'ký kết hợp đồng', pinyin: 'qiān shǔ', type: 'speaking' },
          { word: 'xiéyì', char: '协', vi: 'thỏa thuận, hiệp định', pinyin: 'xié yì', type: 'writing' },
          { word: 'lìyì', char: '益', vi: 'lợi ích chung', pinyin: 'lì yì', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Hợp Đồng Pháp Lý & Điều Khoản',
        desc: 'Điều khoản bảo mật, bồi thường vi phạm hợp đồng và chữ ký đại diện',
        vocab: [
          { word: 'hétong', char: '合', vi: 'hợp đồng', pinyin: 'hé tong', type: 'listening' },
          { word: 'tiáokuǎn', char: '款', vi: 'điều khoản', pinyin: 'tiáo kuǎn', type: 'speaking' },
          { word: 'péicháng', char: '赔', vi: 'bồi thường', pinyin: 'péi cháng', type: 'writing' },
          { word: 'wéiyuē', char: '违', vi: 'vi phạm hợp đồng', pinyin: 'wéi yuē', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Báo Chí & Đọc Tin Thời Sự Nóng',
        desc: 'Phân tích bản tin thời sự, phản ánh chân thực và truyền thông đại chúng',
        vocab: [
          { word: 'xīnwén', char: '闻', vi: 'tin tức báo chí', pinyin: 'xīn wén', type: 'listening' },
          { word: 'bàodào', char: '报', vi: 'đưa tin, phóng sự', pinyin: 'bào dào', type: 'speaking' },
          { word: 'méitǐ', char: '媒', vi: 'phương tiện truyền thông', pinyin: 'méi tǐ', type: 'writing' },
          { word: 'shìshí', char: '实', vi: 'sự thật khách quan', pinyin: 'shì shí', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Văn Học Hiện Đại & Bình Phẩm Tác Phẩm',
        desc: 'Cảm thụ tác phẩm văn xuôi hiện đại, bút pháp miêu tả sâu sắc',
        vocab: [
          { word: 'wénxué', char: '文', vi: 'văn học', pinyin: 'wén xué', type: 'listening' },
          { word: 'zuòpǐn', char: '品', vi: 'tác phẩm nghệ thuật', pinyin: 'zuò pǐn', type: 'speaking' },
          { word: 'miáoxiě', char: '描', vi: 'miêu tả tinh tế', pinyin: 'miáo xiě', type: 'writing' },
          { word: 'shēnkè', char: '深', vi: 'sâu sắc, thấm thía', pinyin: 'shēn kè', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Thuyết Trình Chuyên Nghiệp & Pitching',
        desc: 'Cấu trúc bài diễn thuyết mạch lạc, dẫn chứng số liệu thuyết phục',
        vocab: [
          { word: 'yǎnjiǎng', char: '讲', vi: 'diễn thuyết, phát biểu', pinyin: 'yǎn jiǎng', type: 'listening' },
          { word: 'luójí', char: '辑', vi: 'logic chặt chẽ', pinyin: 'luó jí', type: 'speaking' },
          { word: 'chǎnshù', char: '述', vi: 'trình bày rõ ràng', pinyin: 'chǎn shù', type: 'writing' },
          { word: 'shuōfúlì', char: '服', vi: 'sức thuyết phục', pinyin: 'shuō fú lì', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Từ Đồng Nghĩa Nâng Cao & Sắc Thái Ngữ Nghĩa',
        desc: 'Phân biệt 逐步 vs 逐渐, 始终 vs 一直, 极其 vs 非常',
        vocab: [
          { word: 'zhúbù', char: '逐', vi: 'từng bước một', pinyin: 'zhú bù', type: 'listening' },
          { word: 'zhújiàn', char: '渐', vi: 'dần dần', pinyin: 'zhú jiàn', type: 'speaking' },
          { word: 'shǐzhōng', char: '始', vi: 'trước sau như một', pinyin: 'shǐ zhōng', type: 'writing' },
          { word: 'jíqí', char: '极', vi: 'cực kỳ, vô cùng', pinyin: 'jí qí', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Tâm Lý Học Ứng Dụng & Nhân Sự',
        desc: 'Giải tỏa áp lực, khích lệ nhân viên và xây dựng tinh thần đồng đội',
        vocab: [
          { word: 'xīnlǐ', char: '理', vi: 'tâm lý', pinyin: 'xīn lǐ', type: 'listening' },
          { word: 'yālì', char: '压', vi: 'áp lực công việc', pinyin: 'yā lì', type: 'speaking' },
          { word: 'jīlì', char: '励', vi: 'khích lệ, động viên', pinyin: 'jī lì', type: 'writing' },
          { word: 'tuánduì', char: '团', vi: 'đoàn đội, đội ngũ', pinyin: 'tuán duì', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Thị Trường Tài Chính & Đầu Tư Cổ Phiếu',
        desc: 'Thị trường chứng khoán, quản trị rủi ro và tỷ suất lợi nhuận',
        vocab: [
          { word: 'gǔpiào', char: '票', vi: 'cổ phiếu niêm yết', pinyin: 'gǔ piào', type: 'listening' },
          { word: 'jījīn', char: '基', vi: 'quỹ đầu tư tài chính', pinyin: 'jī jīn', type: 'speaking' },
          { word: 'fēngxiǎn', char: '险', vi: 'rủi ro biến động', pinyin: 'fēng xiǎn', type: 'writing' },
          { word: 'shōuyì', char: '益', vi: 'thu nhập lợi tức', pinyin: 'shōu yì', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Kiến Trúc & Di Sản Văn Hóa Cổ',
        desc: 'Danh lam thắng cảnh, kiến trúc cung đình và điêu khắc nghệ thuật',
        vocab: [
          { word: 'jiànzhù', char: '筑', vi: 'công trình kiến trúc', pinyin: 'jiàn zhù', type: 'listening' },
          { word: 'míngshèng', char: '胜', vi: 'thắng cảnh nổi tiếng', pinyin: 'míng shèng', type: 'speaking' },
          { word: 'yíchǎn', char: '产', vi: 'di sản văn hóa', pinyin: 'yí chǎn', type: 'writing' },
          { word: 'diāokè', char: '雕', vi: 'điêu khắc tinh xảo', pinyin: 'diāo kè', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Đàm Thoại Ngoại Giao & Lễ Tân Quốc Tế',
        desc: 'Tiệc chiêu đãi quốc tế, phát biểu chúc rượu hữu nghị và phép tắc',
        vocab: [
          { word: 'wàijiāo', char: '交', vi: 'ngoại giao quốc tế', pinyin: 'wài jiāo', type: 'listening' },
          { word: 'zhāodàihuì', char: '待', vi: 'tiệc chiêu đãi', pinyin: 'zhāo dài huì', type: 'speaking' },
          { word: 'zhùjiǔ', char: '酒', vi: 'chúc rượu hữu nghị', pinyin: 'zhù jiǔ', type: 'writing' },
          { word: 'hépíng', char: '平', vi: 'hòa bình phát triển', pinyin: 'hé píng', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'zh_hsk6',
    code: 'HSK6',
    badge: 'HSK 6',
    color: '#DC2626',
    unit_id: 'zh_u_hsk6_full',
    unit_number: 1,
    unit_title: 'HSK 6 - Cao Cấp 2 & Thành Thạo (5.000+ Từ Vựng)',
    unit_desc: 'Kinh tế vĩ mô, pháp lý, y học lâm sàng, dịch thuật học thuật và văn ngôn cổ',
    lessons: [
      {
        num: 1,
        title: 'Kinh Tế Vĩ Mô & Chuỗi Cung Ứng Toàn Cầu',
        desc: 'Lạm phát tiền tệ, hàng rào thuế quan và tái cấu trúc chuỗi cung ứng',
        vocab: [
          { word: 'hóngguān', char: '宏', vi: 'vĩ mô toàn cảnh', pinyin: 'hóng guān', type: 'listening' },
          { word: 'tōngzhàng', char: '胀', vi: 'lạm phát tiền tệ', pinyin: 'tōng zhàng', type: 'speaking' },
          { word: 'gōngyìngliàn', char: '链', vi: 'chuỗi cung ứng hàng hóa', pinyin: 'gōng yìng liàn', type: 'writing' },
          { word: 'bìlěi', char: '垒', vi: 'hàng rào ranh giới', pinyin: 'bì lěi', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Pháp Luật Tố Tụng & Sở Hữu Trí Tuệ',
        desc: 'Trọng tài kinh tế, chứng cứ xác thực, bảo vệ bản quyền sáng chế',
        vocab: [
          { word: 'sùsòng', char: '诉', vi: 'tố tụng tại tòa', pinyin: 'sù sòng', type: 'listening' },
          { word: 'zhòngcái', char: '裁', vi: 'trọng tài giải quyết', pinyin: 'zhòng cái', type: 'speaking' },
          { word: 'zhèngjù', char: '证', vi: 'chứng cứ xác thực', pinyin: 'zhèng jù', type: 'writing' },
          { word: 'zhīshí chǎnquán', char: '权', vi: 'quyền sở hữu trí tuệ', pinyin: 'zhī shí chǎn quán', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Y Học Lâm Sàng & Công Nghệ Sinh Học',
        desc: 'Hệ thống miễn dịch, giải mã gen di truyền và thử nghiệm lâm sàng',
        vocab: [
          { word: 'línchuáng', char: '床', vi: 'lâm sàng y tế', pinyin: 'lín chuáng', type: 'listening' },
          { word: 'miǎnyì', char: '免', vi: 'miễn dịch cơ thể', pinyin: 'miǎn yì', type: 'speaking' },
          { word: 'jīyīn', char: '因', vi: 'gen di truyền học', pinyin: 'jī yīn', type: 'writing' },
          { word: 'zhěnduàn', char: '诊', vi: 'chẩn đoán bệnh lý', pinyin: 'zhěn duàn', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Triết Học Cổ Đại & Lịch Sử Tư Tưởng',
        desc: 'Biện chứng duy vật, tư tưởng Khổng Tử - Mạnh Tử và biến thiên lịch sử',
        vocab: [
          { word: 'zhéxué', char: '哲', vi: 'triết học lý luận', pinyin: 'zhé xué', type: 'listening' },
          { word: 'biànzhèng', char: '辩', vi: 'biện chứng tư duy', pinyin: 'biàn zhèng', type: 'speaking' },
          { word: 'sīxiǎng', char: '思', vi: 'tư tưởng triết lý', pinyin: 'sī xiǎng', type: 'writing' },
          { word: 'diǎnjí', char: '典', vi: 'điển tịch cổ xưa', pinyin: 'diǎn jí', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Dịch Thuật Chuyên Nghiệp & Tiêu Chuẩn Tín-Đạt-Nhã',
        desc: 'Dịch cabin hội nghị quốc tế, đối chiếu ngôn ngữ và chuyển tải hàm nghĩa',
        vocab: [
          { word: 'tóngshēng chuányì', char: '同', vi: 'dịch cabin đồng thời', pinyin: 'tóng shēng chuán yì', type: 'listening' },
          { word: 'bǐyì', char: '笔', vi: 'biên dịch văn bản', pinyin: 'bǐ yì', type: 'speaking' },
          { word: 'xìn dá yǎ', char: '雅', vi: 'Tín - Đạt - Nhã trong dịch thuật', pinyin: 'xìn dá yǎ', type: 'writing' },
          { word: 'nèihán', char: '涵', vi: 'nội hàm hàm súc', pinyin: 'nèi hán', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Viết Luận Văn Học Thuật & Nghiên Cứu',
        desc: 'Phương pháp nghiên cứu thực nghiệm, trích dẫn tài liệu tham khảo',
        vocab: [
          { word: 'lùnwén', char: '论', vi: 'luận văn học thuật', pinyin: 'lùn wén', type: 'listening' },
          { word: 'cānkǎo', char: '参', vi: 'tham khảo tư liệu', pinyin: 'cān kǎo', type: 'speaking' },
          { word: 'guīnà', char: '纳', vi: 'quy nạp logic', pinyin: 'guī nà', type: 'writing' },
          { word: 'dábiàn', char: '答', vi: 'bảo vệ luận văn', pinyin: 'dá biàn', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Điện Toán Đám Mây & Dữ Liệu Lớn (Big Data)',
        desc: 'Tối ưu hóa thuật toán AI, điện toán đám mây và kiến trúc bảo mật',
        vocab: [
          { word: 'dà shùjù', char: '数', vi: 'dữ liệu lớn Big Data', pinyin: 'dà shù jù', type: 'listening' },
          { word: 'yún jìsuàn', char: '云', vi: 'điện toán đám mây', pinyin: 'yún jì suàn', type: 'speaking' },
          { word: 'suànfǎ', char: '算', vi: 'thuật toán xử lý', pinyin: 'suàn fǎ', type: 'writing' },
          { word: 'jiàgòu', char: '构', vi: 'kiến trúc hệ thống', pinyin: 'jià gòu', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Biến Đổi Khí Hậu & Phát Triển Bền Vững',
        desc: 'Mục tiêu trung hòa carbon, hiệu ứng nhà kính và cân bằng sinh thái',
        vocab: [
          { word: 'shēngtài', char: '态', vi: 'sinh thái tự nhiên', pinyin: 'shēng tài', type: 'listening' },
          { word: 'tàn zhōnghé', char: '碳', vi: 'trung hòa carbon', pinyin: 'tàn zhōng hé', type: 'speaking' },
          { word: 'wēnshì xiàoyìng', char: '室', vi: 'hiệu ứng nhà kính', pinyin: 'wēn shì xiào yìng', type: 'writing' },
          { word: 'kěchíxù', char: '续', vi: 'phát triển bền vững', pinyin: 'kě chí xù', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Quản Trị Chiến Lược Doanh Nghiệp',
        desc: 'Xây dựng năng lực cốt lõi, quản trị khủng hoảng và sáp nhập M&A',
        vocab: [
          { word: 'zhànlüè', char: '略', vi: 'chiến lược tầm nhìn', pinyin: 'zhàn lüè', type: 'listening' },
          { word: 'jìngzhēnglì', char: '争', vi: 'sức cạnh tranh cốt lõi', pinyin: 'jìng zhēng lì', type: 'speaking' },
          { word: 'wēijī', char: '危', vi: 'khủng hoảng rủi ro', pinyin: 'wēi jī', type: 'writing' },
          { word: 'shōugòu', char: '购', vi: 'mua lại sáp nhập M&A', pinyin: 'shōu gòu', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Văn Ngôn Cổ & Điển Tích Điển Cố',
        desc: 'Hư từ văn ngôn, đọc hiểu cổ văn ngắn và xuất xứ thành ngữ cổ',
        vocab: [
          { word: 'zhī hū zhě yě', char: '之', vi: 'hư từ văn ngôn (chi hồ giả dã)', pinyin: 'zhī hū zhě yě', type: 'listening' },
          { word: 'wényánwén', char: '言', vi: 'văn ngôn cổ đại', pinyin: 'wén yán wén', type: 'speaking' },
          { word: 'xūcí', char: '虚', vi: 'hư từ ngữ pháp cổ', pinyin: 'xū cí', type: 'writing' },
          { word: 'chūchù', char: '处', vi: 'xuất xứ điển tích', pinyin: 'chū chù', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'zh_practical',
    code: 'PRACTICE',
    badge: 'Thực Chiến',
    color: '#059669',
    unit_id: 'zh_u_practical_full',
    unit_number: 1,
    unit_title: 'Tiếng Trung Thực Chiến (Nhà Máy, Xuất Nhập Khẩu, Logistics & Đời Sống)',
    unit_desc: 'Xưởng may, kho bãi cảng biển, thủ tục hải quan, mua hàng buôn Nghĩa Ô và visa',
    lessons: [
      {
        num: 1,
        title: 'Giao Tiếp Phân Xưởng May & Dây Chuyền Sản Xuất',
        desc: 'Quản lý chuyền may, kiểm đếm sản lượng, báo cáo hàng lỗi và sửa chữa',
        vocab: [
          { word: 'chējiān', char: '车', vi: 'phân xưởng sản xuất', pinyin: 'chē jiān', type: 'listening' },
          { word: 'liúshuǐxiàn', char: '线', vi: 'dây chuyền sản xuất', pinyin: 'liú shuǐ xiàn', type: 'speaking' },
          { word: 'cìpǐn', char: '次', vi: 'hàng lỗi, phế phẩm', pinyin: 'cì pǐn', type: 'writing' },
          { word: 'fǎngōng', char: '工', vi: 'làm lại hàng hỏng', pinyin: 'fǎn gōng', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Thủ Tục Xuất Nhập Khẩu & Khai Báo Hải Quan',
        desc: 'Làm tờ khai hải quan, vận đơn B/L, chứng từ xuất xứ C/O và kiểm dịch',
        vocab: [
          { word: 'bàoguān', char: '关', vi: 'khai báo hải quan', pinyin: 'bào guān', type: 'listening' },
          { word: 'tídān', char: '提', vi: 'vận đơn giao nhận B/L', pinyin: 'tí dān', type: 'speaking' },
          { word: 'guānshuì', char: '税', vi: 'thuế xuất nhập khẩu', pinyin: 'guān shuì', type: 'writing' },
          { word: 'zhuāngxiāngdān', char: '箱', vi: 'bảng kê đóng gói (packing list)', pinyin: 'zhuāng xiāng dān', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Logistics Vận Tải Đường Biển & Đường Hàng Không',
        desc: 'Đóng hàng container FCL/LCL, thỏa thuận cước vận tải biển và kho bãi',
        vocab: [
          { word: 'hǎiyùn', char: '海', vi: 'vận tải đường biển', pinyin: 'hǎi yùn', type: 'listening' },
          { word: 'kōngyùn', char: '空', vi: 'vận chuyển đường hàng không', pinyin: 'kōng yùn', type: 'speaking' },
          { word: 'jízhuāngxiāng', char: '装', vi: 'thùng container', pinyin: 'jí zhuāng xiāng', type: 'writing' },
          { word: 'cāngchǔ', char: '仓', vi: 'kho bãi lưu kho', pinyin: 'cāng chǔ', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Gia Công OEM/ODM & Chế Tạo Khuôn Mẫu',
        desc: 'Gửi mẫu xác nhận, làm khuôn đúc linh kiện và cam kết tiến độ giao hàng',
        vocab: [
          { word: 'dàigōng', char: '代', vi: 'gia công đại diện OEM', pinyin: 'dài gōng', type: 'listening' },
          { word: 'yàngpǐn', char: '样', vi: 'hàng mẫu duyệt', pinyin: 'yàng pǐn', type: 'speaking' },
          { word: 'mújù', char: '模', vi: 'khuôn mẫu cơ khí', pinyin: 'mú jù', type: 'writing' },
          { word: 'jiāoqī', char: '期', vi: 'hạn giao hàng', pinyin: 'jiāo qī', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Kiểm Tra Tiêu Chuẩn Chất Lượng (QC & QA)',
        desc: 'Đo dung sai kích thước, tiêu chuẩn ISO và lập biên bản kiểm tra chất lượng',
        vocab: [
          { word: 'zhìjiǎn', char: '质', vi: 'kiểm tra chất lượng QC', pinyin: 'zhì jiǎn', type: 'listening' },
          { word: 'bù hégé', char: '格', vi: 'không đạt tiêu chuẩn', pinyin: 'bù hé gé', type: 'speaking' },
          { word: 'gōngchā', char: '差', vi: 'dung sai kích thước cho phép', pinyin: 'gōng chā', type: 'writing' },
          { word: 'biāozhǔn', char: '准', vi: 'tiêu chuẩn chất lượng', pinyin: 'biāo zhǔn', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Đánh Hàng Đầu Mối Quảng Châu & Nghĩa Ô (Yiwu)',
        desc: 'Hỏi giá buôn sỉ, đặt số lượng tối thiểu MOQ, mua hàng tồn kho thanh lý',
        vocab: [
          { word: 'pīfā shìchǎng', char: '批', vi: 'chợ đầu mối bán buôn', pinyin: 'pī fā shì chǎng', type: 'listening' },
          { word: 'jìnhuò', char: '进', vi: 'nhập kiện hàng về', pinyin: 'jìn huò', type: 'speaking' },
          { word: 'xūnjià', char: '询', vi: 'hỏi báo giá sỉ', pinyin: 'xún jià', type: 'writing' },
          { word: 'qǐdìngliàng', char: '量', vi: 'số lượng đặt tối thiểu MOQ', pinyin: 'qǐ dìng liàng', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Xin Thị Thực Visa & Xuất Nhập Cảnh Lao Động',
        desc: 'Làm visa thương mại M, giấy phép lao động Z, thẻ cư trú và hải quan',
        vocab: [
          { word: 'qiānzhèng', char: '签', vi: 'thị thực visa', pinyin: 'qiān zhèng', type: 'listening' },
          { word: 'gōngzuò xǔkě', char: '许', vi: 'giấy phép lao động hợp pháp', pinyin: 'gōng zuò xǔ kě', type: 'speaking' },
          { word: 'jūliú', char: '居', vi: 'cư trú dài hạn', pinyin: 'jū liú', type: 'writing' },
          { word: 'rùjìngkǎ', char: '卡', vi: 'tờ khai nhập cảnh', pinyin: 'rù jìng kǎ', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Thuê Văn Phòng & Ký Hợp Đồng Lao Động Tại TQ',
        desc: 'Tìm tòa nhà văn phòng, chế độ ngũ hiểm nhất kim và thời gian thử việc',
        vocab: [
          { word: 'xiězìlóu', char: '楼', vi: 'tòa nhà văn phòng làm việc', pinyin: 'xiě zì lóu', type: 'listening' },
          { word: 'láodòng hétong', char: '劳', vi: 'hợp đồng lao động chính thức', pinyin: 'láo dòng hé tong', type: 'speaking' },
          { word: 'shìyòngqī', char: '试', vi: 'thời gian thử việc', pinyin: 'shì yòng qī', type: 'writing' },
          { word: 'xīnchóu', char: '酬', vi: 'tiền lương đãi ngộ', pinyin: 'xīn chóu', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Thanh Toán Điện Tử WeChat Pay & Alipay',
        desc: 'Liên kết thẻ ngân hàng Trung Quốc, xác minh danh tính và quét mã QR',
        vocab: [
          { word: 'Wēixìn zhīfù', char: '微', vi: 'thanh toán WeChat Pay', pinyin: 'wēi xìn zhī fù', type: 'listening' },
          { word: 'Zhīfùbǎo', char: '宝', vi: 'ví điện tử Alipay', pinyin: 'zhī fù bǎo', type: 'speaking' },
          { word: 'shímíng rènzhèng', char: '实', vi: 'xác thực định danh thật', pinyin: 'shí míng rèn zhèng', type: 'writing' },
          { word: 'sǎomǎ', char: '扫', vi: 'quét mã QR thanh toán', pinyin: 'sǎo mǎ', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Giải Quyết Khiếu Nại & Tranh Chấp Sản Xuất',
        desc: 'Khiếu nại giao trễ hạn, yêu cầu đổi hàng bồi thường và hòa giải êm đẹp',
        vocab: [
          { word: 'suǒpéi', char: '索', vi: 'khiếu nại đòi bồi thường', pinyin: 'suǒ péi', type: 'listening' },
          { word: 'yánwù', char: '延', vi: 'chậm trễ tiến độ', pinyin: 'yán wù', type: 'speaking' },
          { word: 'chóngxīn fāhuò', char: '发', vi: 'giao lại hàng mới', pinyin: 'chóng xīn fā huò', type: 'writing' },
          { word: 'tiáojiě', char: '解', vi: 'hòa giải ổn thỏa', pinyin: 'tiáo jiě', type: 'matching' }
        ]
      }
    ]
  }
];

// Helper to construct interactive exercises for a lesson
function buildLessonExercises(lessonId, vocabList) {
  const exercises = [];
  vocabList.forEach((item, idx) => {
    const exId = `${lessonId}_ex${idx + 1}`;
    if (item.type === 'listening') {
      exercises.push({
        id: exId,
        lesson_id: lessonId,
        type: 'listening',
        prompt: `Nghe phát âm và chọn nghĩa đúng của từ "${item.word}":`,
        target_text: item.word,
        target_audio_text: item.word,
        phonetic: item.pinyin,
        vietnamese_meaning: item.vi,
        options: [
          item.vi,
          `không phải ${item.vi}`,
          `từ đồng âm khác nghĩa`,
          `chưa chính xác`
        ],
        correct_answer: item.vi,
        hint: `Pinyin: [${item.pinyin}] mang nghĩa là: ${item.vi}`,
        stroke_char: item.char || null,
        order_index: idx + 1
      });
    } else if (item.type === 'speaking') {
      exercises.push({
        id: exId,
        lesson_id: lessonId,
        type: 'speaking',
        prompt: `Nhấn Micro và phát âm to rõ từ "${item.word}" [${item.pinyin}]:`,
        target_text: item.word,
        target_audio_text: item.word,
        phonetic: item.pinyin,
        vietnamese_meaning: item.vi,
        options: [],
        correct_answer: item.word,
        hint: `Hãy đọc tròn vành rõ chữ theo thanh điệu: [${item.pinyin}]`,
        stroke_char: item.char || null,
        order_index: idx + 1
      });
    } else if (item.type === 'writing') {
      exercises.push({
        id: exId,
        lesson_id: lessonId,
        type: 'writing',
        prompt: `Tập viết chuẩn nét chữ Hán "${item.char}" (${item.vi}):`,
        target_text: item.char,
        target_audio_text: item.word,
        phonetic: item.pinyin,
        vietnamese_meaning: item.vi,
        options: [],
        correct_answer: item.char,
        hint: `Chữ ${item.char} mang ý nghĩa ${item.vi}, viết từ trên xuống dưới, trái qua phải`,
        stroke_char: item.char,
        order_index: idx + 1
      });
    } else {
      // matching
      const pairs = [
        { left: item.word, right: item.vi },
        { left: vocabList[0].word, right: vocabList[0].vi },
        { left: vocabList[1].word, right: vocabList[1].vi }
      ];
      exercises.push({
        id: exId,
        lesson_id: lessonId,
        type: 'matching',
        prompt: 'Ghép cặp từ vựng Tiếng Trung với nghĩa Tiếng Việt tương ứng:',
        target_text: item.word,
        target_audio_text: item.word,
        phonetic: item.pinyin,
        vietnamese_meaning: item.vi,
        options: { pairs },
        correct_answer: 'MATCH_PAIRS',
        hint: `Nối ${item.word} với nghĩa "${item.vi}"`,
        stroke_char: item.char || null,
        order_index: idx + 1
      });
    }
  });
  return exercises;
}

// Generate Extra Units for Chinese
function generateChineseUnits() {
  const units = [];
  ZH_STAGES.forEach(stage => {
    const unitLessons = stage.lessons.map(l => {
      const lessonId = `${stage.unit_id}_l${l.num}`;
      return {
        id: lessonId,
        unit_id: stage.unit_id,
        lesson_number: l.num,
        title: `Bài ${l.num}: ${l.title}`,
        description: l.desc,
        xp_reward: 25,
        type: 'standard',
        completed: false,
        status: 'unlocked',
        exercises: buildLessonExercises(lessonId, l.vocab)
      };
    });

    units.push({
      id: stage.unit_id,
      level_id: stage.level_id,
      unit_number: stage.unit_number,
      title: stage.unit_title,
      description: stage.unit_desc,
      icon: 'BookOpen',
      banner_color: stage.color,
      levelBadge: stage.badge,
      lessons: unitLessons
    });
  });
  return units;
}

// =============================================================================
// 2. DATA DEFINITIONS FOR ENGLISH CURRICULUM (7 STAGES × 10 LESSONS)
// =============================================================================
const EN_STAGES = [
  {
    level_id: 'en_ipa',
    code: 'IPA',
    badge: 'Foundation',
    color: '#06B6D4',
    unit_id: 'en_u_ipa_full',
    unit_number: 1,
    unit_title: 'Nhập Môn IPA 44 Âm & Ngữ Điệu Chuẩn Mỹ',
    unit_desc: 'Bảng ký hiệu ngữ âm quốc tế, nguyên âm đơn, nguyên âm đôi, phụ âm và trọng âm',
    lessons: [
      {
        num: 1,
        title: 'Nguyên Âm Đơn Ngắn & Dài (/i:/ vs /ɪ/, /u:/ vs /ʊ/)',
        desc: 'Luyện mở miệng và căng môi để phân biệt sheep /i:/ vs ship /ɪ/',
        vocab: [
          { word: 'sheep', ipa: '/ʃiːp/', vi: 'con cừu (âm /i:/ dài)', type: 'listening' },
          { word: 'ship', ipa: '/ʃɪp/', vi: 'con tàu (âm /ɪ/ ngắn)', type: 'speaking' },
          { word: 'good', ipa: '/ɡʊd/', vi: 'tốt, hay (âm /ʊ/)', type: 'writing' },
          { word: 'shoot', ipa: '/ʃuːt/', vi: 'bắn súng (âm /u:/ dài)', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Nguyên Âm Miệng Mở (/e/, /æ/, /ʌ/, /ɑ:/)',
        desc: 'Phân biệt khẩu hình giữa pen /e/ và pan /æ/',
        vocab: [
          { word: 'pen', ipa: '/pen/', vi: 'cây bút mực', type: 'listening' },
          { word: 'cat', ipa: '/kæt/', vi: 'con mèo (âm /æ/)', type: 'speaking' },
          { word: 'cup', ipa: '/kʌp/', vi: 'chiếc tách (âm /ʌ/)', type: 'writing' },
          { word: 'car', ipa: '/kɑːr/', vi: 'xe hơi (âm /ɑ:/ dài)', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Nguyên Âm Đôi Phổ Biến (/eɪ/, /aɪ/, /ɔɪ/)',
        desc: 'Kỹ thuật trượt từ âm này sang âm khác mượt mà',
        vocab: [
          { word: 'day', ipa: '/deɪ/', vi: 'ngày, ban ngày', type: 'listening' },
          { word: 'time', ipa: '/taɪm/', vi: 'thời gian', type: 'speaking' },
          { word: 'boy', ipa: '/bɔɪ/', vi: 'cậu bé trai', type: 'writing' },
          { word: 'voice', ipa: '/vɔɪs/', vi: 'giọng nói', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Nguyên Âm Đôi Hướng Về Schwa (/aʊ/, /əʊ/, /ɪə/, /eə/)',
        desc: 'Phát âm chuẩn từ now, go, hear và hair',
        vocab: [
          { word: 'now', ipa: '/naʊ/', vi: 'ngay bây giờ', type: 'listening' },
          { word: 'home', ipa: '/hoʊm/', vi: 'ngôi nhà mái ấm', type: 'speaking' },
          { word: 'hear', ipa: '/hɪr/', vi: 'nghe thấy', type: 'writing' },
          { word: 'care', ipa: '/ker/', vi: 'quan tâm chăm sóc', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Cặp Phụ Âm Bật Hơi (/p/ - /b/, /t/ - /d/, /k/ - /g/)',
        desc: 'Phân biệt phụ âm vô thanh (không rung cổ) và hữu thanh (rung cổ)',
        vocab: [
          { word: 'pat', ipa: '/pæt/', vi: 'vỗ nhẹ (vô thanh /p/)', type: 'listening' },
          { word: 'bat', ipa: '/bæt/', vi: 'gậy bóng chày (hữu thanh /b/)', type: 'speaking' },
          { word: 'tea', ipa: '/tiː/', vi: 'trà (vô thanh /t/)', type: 'writing' },
          { word: 'dog', ipa: '/dɔːɡ/', vi: 'chú chó (hữu thanh /d/)', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Cặp Phụ Âm Răng & Môi (/f/ - /v/, /θ/ - /ð/)',
        desc: 'Đặt lưỡi giữa hai hàm răng để phát âm chuẩn think và that',
        vocab: [
          { word: 'think', ipa: '/θɪŋk/', vi: 'suy nghĩ (âm th vô thanh)', type: 'listening' },
          { word: 'this', ipa: '/ðɪs/', vi: 'cái này (âm th hữu thanh)', type: 'speaking' },
          { word: 'view', ipa: '/vjuː/', vi: 'tầm nhìn quang cảnh', type: 'writing' },
          { word: 'fast', ipa: '/fæst/', vi: 'nhanh nhẹn', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Cặp Phụ Âm Gió & Vòm Họng (/s/ - /z/, /ʃ/ - /ʒ/, /tʃ/ - /dʒ/)',
        desc: 'Bí quyết nói tiếng Anh có ngữ điệu sang trọng',
        vocab: [
          { word: 'see', ipa: '/siː/', vi: 'nhìn ngắm', type: 'listening' },
          { word: 'zoo', ipa: '/zuː/', vi: 'vườn bách thú', type: 'speaking' },
          { word: 'ship', ipa: '/ʃɪp/', vi: 'con tàu (/ʃ/)', type: 'writing' },
          { word: 'job', ipa: '/dʒɑːb/', vi: 'công việc nghề nghiệp', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Phụ Âm Mũi & Âm Lỏng (/m/, /n/, /ŋ/, /l/, /r/, /w/, /j/)',
        desc: 'Phát âm chuẩn âm đuôi ending sounds sing /ŋ/ và light /l/',
        vocab: [
          { word: 'sing', ipa: '/sɪŋ/', vi: 'ca hát (âm mũi /ŋ/)', type: 'listening' },
          { word: 'light', ipa: '/laɪt/', vi: 'ánh sáng (/l/)', type: 'speaking' },
          { word: 'red', ipa: '/red/', vi: 'màu đỏ (/r/)', type: 'writing' },
          { word: 'water', ipa: '/ˈwɔːtər/', vi: 'nước uống (/w/)', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Trọng Âm Từ & Âm Lướt Schwa /ə/',
        desc: 'Quy tắc nhấn trọng âm rơi vào âm tiết chính để nói như người bản xứ',
        vocab: [
          { word: 'banana', ipa: '/bəˈnænə/', vi: 'quả chuối (trọng âm 2)', type: 'listening' },
          { word: 'teacher', ipa: '/ˈtiːtʃər/', vi: 'giáo viên (trọng âm 1)', type: 'speaking' },
          { word: 'about', ipa: '/əˈbaʊt/', vi: 'về, khoảng (âm schwa đầu)', type: 'writing' },
          { word: 'together', ipa: '/təˈɡeðər/', vi: 'cùng nhau', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Nối Âm (Linking Sounds) & Ngữ Điệu (Intonation)',
        desc: 'Nối phụ âm với nguyên âm (Pick it up) và ngữ điệu câu hỏi',
        vocab: [
          { word: 'pick it up', ipa: '/pɪk ɪt ʌp/', vi: 'nhặt nó lên (nối k-i-t-u)', type: 'listening' },
          { word: 'hold on', ipa: '/hoʊld ɑːn/', vi: 'đợi một chút (nối d-o)', type: 'speaking' },
          { word: 'really', ipa: '/ˈriːəli/', vi: 'thật sự (ngữ điệu lên giọng)', type: 'writing' },
          { word: 'thank you', ipa: '/ˈθæŋk juː/', vi: 'cảm ơn bạn (nối k-y)', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'en_a1',
    code: 'A1',
    badge: 'Beginner',
    color: '#10B981',
    unit_id: 'en_u_a1_full',
    unit_number: 1,
    unit_title: 'A1 - Beginner (Giao Tiếp Nền Tảng)',
    unit_desc: 'Giới thiệu bản thân, con số, thời gian, gia đình, sở thích và mua sắm',
    lessons: [
      {
        num: 1,
        title: 'Greetings & Introductions',
        desc: 'Học cách chào hỏi và tự giới thiệu tên tuổi',
        vocab: [
          { word: 'hello', ipa: '/həˈloʊ/', vi: 'xin chào', type: 'listening' },
          { word: 'my name is', ipa: '/maɪ neɪm ɪz/', vi: 'tên tôi là', type: 'speaking' },
          { word: 'nice to meet you', ipa: '/naɪs tuː miːt juː/', vi: 'rất vui được gặp bạn', type: 'writing' },
          { word: 'goodbye', ipa: '/ɡʊdˈbaɪ/', vi: 'tạm biệt', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Countries & Nationalities',
        desc: 'Nói bạn đến từ đâu và quốc tịch của bạn',
        vocab: [
          { word: 'Vietnam', ipa: '/ˌvjetˈnɑːm/', vi: 'Việt Nam', type: 'listening' },
          { word: 'American', ipa: '/əˈmerɪkən/', vi: 'người Mỹ', type: 'speaking' },
          { word: 'England', ipa: '/ˈɪŋɡlənd/', vi: 'nước Anh', type: 'writing' },
          { word: 'student', ipa: '/ˈstuːdnt/', vi: 'học sinh, sinh viên', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Numbers & Age',
        desc: 'Đếm số từ 1 đến 100 và hỏi tuổi tác',
        vocab: [
          { word: 'twenty', ipa: '/ˈtwenti/', vi: 'hai mươi (20)', type: 'listening' },
          { word: 'how old are you', ipa: '/haʊ oʊld ɑːr juː/', vi: 'bạn bao nhiêu tuổi', type: 'speaking' },
          { word: 'hundred', ipa: '/ˈhʌndrəd/', vi: 'một trăm (100)', type: 'writing' },
          { word: 'years old', ipa: '/jɪrz oʊld/', vi: 'tuổi', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Family & Relatives',
        desc: 'Kể về bố mẹ, anh chị em và người thân trong gia đình',
        vocab: [
          { word: 'mother', ipa: '/ˈmʌðər/', vi: 'mẹ', type: 'listening' },
          { word: 'father', ipa: '/ˈfɑːðər/', vi: 'bố', type: 'speaking' },
          { word: 'brother', ipa: '/ˈbrʌðər/', vi: 'anh/em trai', type: 'writing' },
          { word: 'sister', ipa: '/ˈsɪstər/', vi: 'chị/em gái', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Daily Routines & Present Simple',
        desc: 'Miêu tả thói quen sinh hoạt mỗi ngày với thì Hiện tại đơn',
        vocab: [
          { word: 'wake up', ipa: '/weɪk ʌp/', vi: 'thức giấc', type: 'listening' },
          { word: 'have breakfast', ipa: '/hæv ˈbrekfəst/', vi: 'ăn bữa sáng', type: 'speaking' },
          { word: 'go to school', ipa: '/ɡoʊ tuː skuːl/', vi: 'đi học', type: 'writing' },
          { word: 'sleep', ipa: '/sliːp/', vi: 'đi ngủ', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Time, Days & Months',
        desc: 'Nói về thời gian, thứ trong tuần và các tháng trong năm',
        vocab: [
          { word: 'Monday', ipa: '/ˈmʌndeɪ/', vi: 'thứ Hai', type: 'listening' },
          { word: 'weekend', ipa: '/ˈwiːkend/', vi: 'cuối tuần', type: 'speaking' },
          { word: 'morning', ipa: '/ˈmɔːrnɪŋ/', vi: 'buổi sáng', type: 'writing' },
          { word: 'o clock', ipa: '/əˈklɑːk/', vi: 'giờ đúng', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Food & Drinks at a Restaurant',
        desc: 'Gọi món ăn và nước uống tại quán cà phê hoặc nhà hàng',
        vocab: [
          { word: 'coffee', ipa: '/ˈkɔːfi/', vi: 'cà phê', type: 'listening' },
          { word: 'water', ipa: '/ˈwɔːtər/', vi: 'nước suối', type: 'speaking' },
          { word: 'delicious', ipa: '/dɪˈlɪʃəs/', vi: 'ngon tuyệt', type: 'writing' },
          { word: 'order', ipa: '/ˈɔːrdər/', vi: 'gọi món', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Shopping & Asking Prices',
        desc: 'Hỏi giá cả đồ vật và thanh toán tiền khi mua sắm',
        vocab: [
          { word: 'how much is this', ipa: '/haʊ mʌtʃ ɪz ðɪs/', vi: 'cái này giá bao nhiêu', type: 'listening' },
          { word: 'expensive', ipa: '/ɪkˈspensɪv/', vi: 'đắt đỏ', type: 'speaking' },
          { word: 'cheap', ipa: '/tʃiːp/', vi: 'rẻ, vừa túi tiền', type: 'writing' },
          { word: 'money', ipa: '/ˈmʌni/', vi: 'tiền bạc', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Describing People & Appearance',
        desc: 'Miêu tả vóc dáng, tính cách và trang phục của một người',
        vocab: [
          { word: 'tall', ipa: '/tɔːl/', vi: 'cao ráo', type: 'listening' },
          { word: 'beautiful', ipa: '/ˈbjuːtɪfl/', vi: 'xinh đẹp', type: 'speaking' },
          { word: 'friendly', ipa: '/ˈfrendli/', vi: 'thân thiện', type: 'writing' },
          { word: 'happy', ipa: '/ˈhæpi/', vi: 'vui vẻ, hạnh phúc', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Rooms & Furniture in a House',
        desc: 'Tên các phòng ốc và đồ dùng nội thất trong gia đình',
        vocab: [
          { word: 'living room', ipa: '/ˈlɪvɪŋ ruːm/', vi: 'phòng khách', type: 'listening' },
          { word: 'bedroom', ipa: '/ˈbedruːm/', vi: 'phòng ngủ', type: 'speaking' },
          { word: 'table', ipa: '/ˈteɪbl/', vi: 'cái bàn', type: 'writing' },
          { word: 'chair', ipa: '/tʃer/', vi: 'chiếc ghế tựa', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'en_a2',
    code: 'A2',
    badge: 'Elementary',
    color: '#3B82F6',
    unit_id: 'en_u_a2_full',
    unit_number: 1,
    unit_title: 'A2 - Elementary (Giao Tiếp Mở Rộng)',
    unit_desc: 'Hỏi đường, du lịch khách sạn, thì quá khứ, tương lai và so sánh tính từ',
    lessons: [
      {
        num: 1,
        title: 'Giving & Asking for Directions',
        desc: 'Chỉ đường rẽ trái, rẽ phải, đi thẳng và khoảng cách',
        vocab: [
          { word: 'turn left', ipa: '/tɜːrn left/', vi: 'rẽ bên trái', type: 'listening' },
          { word: 'go straight', ipa: '/ɡoʊ streɪt/', vi: 'đi thẳng về phía trước', type: 'speaking' },
          { word: 'traffic lights', ipa: '/ˈtræfɪk laɪts/', vi: 'đèn tín hiệu giao thông', type: 'writing' },
          { word: 'near here', ipa: '/nɪr hɪr/', vi: 'gần ngay đây', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Airport Check-in & Hotel Booking',
        desc: 'Làm thủ tục lên máy bay, nhận phòng và yêu cầu dịch vụ khách sạn',
        vocab: [
          { word: 'boarding pass', ipa: '/ˈbɔːrdɪŋ pæs/', vi: 'thẻ lên máy bay', type: 'listening' },
          { word: 'luggage', ipa: '/ˈlʌɡɪdʒ/', vi: 'hành lý xách tay', type: 'speaking' },
          { word: 'reservation', ipa: '/ˌrezərˈveɪʃn/', vi: 'đặt chỗ trước', type: 'writing' },
          { word: 'passport', ipa: '/ˈpæspɔːrt/', vi: 'hộ chiếu quốc tế', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Talking about the Past (Past Simple)',
        desc: 'Kể về những trải nghiệm trong kỳ nghỉ với động từ bất quy tắc',
        vocab: [
          { word: 'went', ipa: '/went/', vi: 'đã đi (quá khứ của go)', type: 'listening' },
          { word: 'saw', ipa: '/sɔː/', vi: 'đã thấy (quá khứ của see)', type: 'speaking' },
          { word: 'bought', ipa: '/bɔːt/', vi: 'đã mua (quá khứ của buy)', type: 'writing' },
          { word: 'yesterday', ipa: '/ˈjestərdeɪ/', vi: 'ngày hôm qua', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Future Plans & Be Going To',
        desc: 'Diễn tả kế hoạch chắc chắn và dự đoán tương lai với will / be going to',
        vocab: [
          { word: 'I am going to', ipa: '/aɪ æm ˈɡoʊɪŋ tuː/', vi: 'tôi dự định sẽ', type: 'listening' },
          { word: 'travel', ipa: '/ˈtrævl/', vi: 'đi du lịch', type: 'speaking' },
          { word: 'next week', ipa: '/nekst wiːk/', vi: 'tuần tới', type: 'writing' },
          { word: 'maybe', ipa: '/ˈmeɪbi/', vi: 'có lẽ, có thể', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Present Perfect with Ever & Never',
        desc: 'Hỏi về những trải nghiệm từng làm trong đời: Have you ever...?',
        vocab: [
          { word: 'have you ever', ipa: '/hæv juː ˈevər/', vi: 'bạn đã từng bao giờ chưa', type: 'listening' },
          { word: 'never', ipa: '/ˈnevər/', vi: 'chưa bao giờ', type: 'speaking' },
          { word: 'already', ipa: '/ɔːlˈredi/', vi: 'đã rồi', type: 'writing' },
          { word: 'visited', ipa: '/ˈvɪzɪtɪd/', vi: 'đã từng ghé thăm', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Comparatives & Superlatives',
        desc: 'So sánh hơn và so sánh nhất giữa các thành phố, đồ vật',
        vocab: [
          { word: 'faster than', ipa: '/ˈfæstər ðæn/', vi: 'nhanh hơn', type: 'listening' },
          { word: 'the biggest', ipa: '/ðə ˈbɪɡɪst/', vi: 'to lớn nhất', type: 'speaking' },
          { word: 'more expensive', ipa: '/mɔːr ɪkˈspensɪv/', vi: 'đắt hơn', type: 'writing' },
          { word: 'the best', ipa: '/ðə best/', vi: 'tốt nhất, tuyệt nhất', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Common Phrasal Verbs in Daily Life',
        desc: 'Làm quen các cụm động từ: look for, turn off, give up, wake up',
        vocab: [
          { word: 'look for', ipa: '/lʊk fɔːr/', vi: 'tìm kiếm cái gì', type: 'listening' },
          { word: 'turn on', ipa: '/tɜːrn ɑːn/', vi: 'bật thiết bị lên', type: 'speaking' },
          { word: 'give up', ipa: '/ɡɪv ʌp/', vi: 'từ bỏ, buông xuôi', type: 'writing' },
          { word: 'find out', ipa: '/faɪnd aʊt/', vi: 'tìm ra sự thật', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Health Problems & Giving Advice',
        desc: 'Nói về cơn sốt, đau răng và đưa ra lời khuyên với should / shouldn\'t',
        vocab: [
          { word: 'headache', ipa: '/ˈhedeɪk/', vi: 'cơn đau đầu', type: 'listening' },
          { word: 'you should', ipa: '/juː ʃʊd/', vi: 'bạn nên', type: 'speaking' },
          { word: 'medicine', ipa: '/ˈmedɪsn/', vi: 'thuốc chữa bệnh', type: 'writing' },
          { word: 'see a doctor', ipa: '/siː ə ˈdɑːktər/', vi: 'đi khám bác sĩ', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Weather & Seasons Forecast',
        desc: 'Dự báo thời tiết nắng, mưa, bão tuyết và 4 mùa trong năm',
        vocab: [
          { word: 'sunny', ipa: '/ˈsʌni/', vi: 'trời nắng ráo', type: 'listening' },
          { word: 'rainy', ipa: '/ˈreɪni/', vi: 'trời mưa tầm tã', type: 'speaking' },
          { word: 'temperature', ipa: '/ˈtemprətʃər/', vi: 'nhiệt độ ngoài trời', type: 'writing' },
          { word: 'summer', ipa: '/ˈsʌmər/', vi: 'mùa hè', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Hobbies, Sports & Leisure',
        desc: 'Nói về các môn thể thao yêu thích và khả năng làm gì với can / can\'t',
        vocab: [
          { word: 'swimming', ipa: '/ˈswɪmɪŋ/', vi: 'môn bơi lội', type: 'listening' },
          { word: 'play guitar', ipa: '/pleɪ ɡɪˈtɑːr/', vi: 'chơi đàn guitar', type: 'speaking' },
          { word: 'I can', ipa: '/aɪ kæn/', vi: 'tôi có thể làm được', type: 'writing' },
          { word: 'free time', ipa: '/friː taɪm/', vi: 'thời gian rảnh rỗi', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'en_b1',
    code: 'B1',
    badge: 'Intermediate',
    color: '#8B5CF6',
    unit_id: 'en_u_b1_full',
    unit_number: 1,
    unit_title: 'B1 - Intermediate (Tiếng Anh Độc Lập & Công Sở)',
    unit_desc: 'Viết email công việc, tham gia họp, phỏng vấn, câu điều kiện và câu bị động',
    lessons: [
      {
        num: 1,
        title: 'Professional Business Emails',
        desc: 'Cấu trúc thư điện tử trang trọng, mở đầu và kết thúc chuyên nghiệp',
        vocab: [
          { word: 'dear Mr Smith', ipa: '/dɪr ˈmɪstər smɪθ/', vi: 'kính gửi ông Smith', type: 'listening' },
          { word: 'I am writing to', ipa: '/aɪ æm ˈraɪtɪŋ tuː/', vi: 'tôi viết thư này để', type: 'speaking' },
          { word: 'best regards', ipa: '/best rɪˈɡɑːrdz/', vi: 'trân trọng kính chào', type: 'writing' },
          { word: 'attachment', ipa: '/əˈtætʃmənt/', vi: 'tệp đính kèm trong thư', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Meeting Discussions & Opinions',
        desc: 'Bày tỏ quan điểm đồng ý, phản đối lịch sự trong cuộc họp',
        vocab: [
          { word: 'in my opinion', ipa: '/ɪn maɪ əˈpɪnjən/', vi: 'theo ý kiến của tôi', type: 'listening' },
          { word: 'I agree with you', ipa: '/aɪ əˈɡriː wɪð juː/', vi: 'tôi đồng ý với bạn', type: 'speaking' },
          { word: 'suggestion', ipa: '/səɡˈdʒestʃən/', vi: 'lời gợi ý, đề xuất', type: 'writing' },
          { word: 'agenda', ipa: '/əˈdʒendə/', vi: 'chương trình cuộc họp', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Job Interview & The STAR Method',
        desc: 'Trả lời câu hỏi tình huống phỏng vấn xin việc theo phương pháp STAR',
        vocab: [
          { word: 'experience', ipa: '/ɪkˈspɪriəns/', vi: 'kinh nghiệm làm việc', type: 'listening' },
          { word: 'strength', ipa: '/streŋkθ/', vi: 'điểm mạnh nổi trội', type: 'speaking' },
          { word: 'responsibility', ipa: '/rɪˌspɑːnsəˈbɪləti/', vi: 'trách nhiệm đảm nhiệm', type: 'writing' },
          { word: 'challenge', ipa: '/ˈtʃælɪndʒ/', vi: 'thử thách vượt qua', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Conditionals (Type 1 & 2)',
        desc: 'Câu điều kiện có thật ở hiện tại và giả định không có thật',
        vocab: [
          { word: 'if it rains', ipa: '/ɪf ɪt reɪnz/', vi: 'nếu trời mưa', type: 'listening' },
          { word: 'I will stay', ipa: '/aɪ wɪl steɪ/', vi: 'tôi sẽ ở lại', type: 'speaking' },
          { word: 'if I were you', ipa: '/ɪf aɪ wɜːr juː/', vi: 'nếu tôi là bạn', type: 'writing' },
          { word: 'I would buy', ipa: '/aɪ wʊd baɪ/', vi: 'tôi sẽ mua nó ngay', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Passive Voice in Formal Reports',
        desc: 'Sử dụng thể bị động trong các báo cáo và tin tức: The report was approved',
        vocab: [
          { word: 'was completed', ipa: '/wəz kəmˈpliːtɪd/', vi: 'đã được hoàn thành', type: 'listening' },
          { word: 'is being processed', ipa: '/ɪz ˈbiːɪŋ ˈprɑːsest/', vi: 'đang được xử lý', type: 'speaking' },
          { word: 'has been launched', ipa: '/hæz bɪn lɔːntʃt/', vi: 'vừa được ra mắt', type: 'writing' },
          { word: 'was discovered', ipa: '/wəz dɪˈskʌvərd/', vi: 'đã được khám phá', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Defining & Non-defining Relative Clauses',
        desc: 'Nối câu mượt mà với đại từ quan hệ who, which, that, where',
        vocab: [
          { word: 'who works here', ipa: '/huː wɜːrks hɪr/', vi: 'người làm việc ở đây', type: 'listening' },
          { word: 'which is located', ipa: '/wɪtʃ ɪz ˈloʊkeɪtɪd/', vi: 'nơi được tọa lạc', type: 'speaking' },
          { word: 'where I was born', ipa: '/wer aɪ wəz bɔːrn/', vi: 'nơi tôi sinh ra', type: 'writing' },
          { word: 'whose idea', ipa: '/huːz aɪˈdiːə/', vi: 'ý kiến của người đó', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Modal Verbs of Deduction (Must, Might, Can\'t)',
        desc: 'Đoán tình huống chắc chắn (must be) hoặc không thể xảy ra (can\'t be)',
        vocab: [
          { word: 'must be true', ipa: '/mʌst biː truː/', vi: 'chắc chắn là đúng', type: 'listening' },
          { word: 'might happen', ipa: '/maɪt ˈhæpən/', vi: 'có thể sẽ xảy ra', type: 'speaking' },
          { word: 'cannot be', ipa: '/ˈkænɑːt biː/', vi: 'chắc chắn không thể là', type: 'writing' },
          { word: 'surely', ipa: '/ˈʃʊrli/', vi: 'chắc chắn một cách rõ ràng', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Customer Service & Problem Solving',
        desc: 'Xử lý khiếu nại khách hàng, giải thích sự cố và bồi thường',
        vocab: [
          { word: 'complaint', ipa: '/kəmˈpleɪnt/', vi: 'lời phàn nàn, khiếu nại', type: 'listening' },
          { word: 'refund', ipa: '/ˈriːfʌnd/', vi: 'hoàn trả lại tiền', type: 'speaking' },
          { word: 'apologize for', ipa: '/əˈpɑːlədʒaɪz fɔːr/', vi: 'xin lỗi chân thành vì', type: 'writing' },
          { word: 'solution', ipa: '/səˈluːʃn/', vi: 'giải pháp giải quyết', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Travel Emergencies & Situations',
        desc: 'Xử lý tình huống thất lạc hành lý, nhỡ chuyến bay và báo cảnh sát',
        vocab: [
          { word: 'lost baggage', ipa: '/lɔːst ˈbæɡɪdʒ/', vi: 'hành lý bị thất lạc', type: 'listening' },
          { word: 'missed the flight', ipa: '/mɪst ðə flaɪt/', vi: 'bị nhỡ chuyến bay', type: 'speaking' },
          { word: 'emergency', ipa: '/iˈmɜːrdʒənsi/', vi: 'trường hợp khẩn cấp', type: 'writing' },
          { word: 'embassy', ipa: '/ˈembəsi/', vi: 'đại sứ quán', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Giving Short Presentations & Signposting',
        desc: 'Mở đầu, chuyển ý (Moving on to...) và kết luận bài thuyết trình',
        vocab: [
          { word: 'first of all', ipa: '/fɜːrst əv ɔːl/', vi: 'trước hết, đầu tiên là', type: 'listening' },
          { word: 'moving on to', ipa: '/ˈmuːvɪŋ ɑːn tuː/', vi: 'chuyển sang phần tiếp', type: 'speaking' },
          { word: 'in conclusion', ipa: '/ɪn kənˈkluːʒn/', vi: 'tóm lại, để kết luận', type: 'writing' },
          { word: 'thank you for listening', ipa: '/θæŋk juː fɔːr ˈlɪsnɪŋ/', vi: 'cảm ơn đã chú ý lắng nghe', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'en_b2',
    code: 'B2',
    badge: 'Upper-Int',
    color: '#F59E0B',
    unit_id: 'en_u_b2_full',
    unit_number: 1,
    unit_title: 'B2 - Upper-Intermediate (Tiếng Anh Thương Mại & IELTS 6.5+)',
    unit_desc: 'Thuyết trình dự án, đàm phán hợp đồng, collocations học thuật và tranh luận xã hội',
    lessons: [
      {
        num: 1,
        title: 'Project Presentations & Data Trends',
        desc: 'Mô tả biểu đồ đường, xu hướng tăng vọt (soar) và sụt giảm (plummet)',
        vocab: [
          { word: 'increase significantly', ipa: '/ɪnˈkriːs sɪɡˈnɪfɪkəntli/', vi: 'tăng trưởng rõ rệt', type: 'listening' },
          { word: 'sharp decline', ipa: '/ʃɑːrp dɪˈklaɪn/', vi: 'sụt giảm mạnh', type: 'speaking' },
          { word: 'fluctuate', ipa: '/ˈflʌktʃueɪt/', vi: 'dao động lên xuống', type: 'writing' },
          { word: 'reach a peak', ipa: '/riːtʃ ə piːk/', vi: 'chạm mức đỉnh điểm', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Commercial Negotiations & Persuasion',
        desc: 'Đàm phán thương mại, thuyết phục đối tác và thỏa hiệp đôi bên',
        vocab: [
          { word: 'reach a compromise', ipa: '/riːtʃ ə ˈkɑːmprəmaɪz/', vi: 'đạt được sự thỏa hiệp', type: 'listening' },
          { word: 'win-win solution', ipa: '/wɪn wɪn səˈluːʃn/', vi: 'giải pháp đôi bên cùng thắng', type: 'speaking' },
          { word: 'counter-offer', ipa: '/ˈkaʊntər ɔːfər/', vi: 'lời đề xuất giá đối ứng', type: 'writing' },
          { word: 'profitable', ipa: '/ˈprɑːfɪtəbl/', vi: 'mang lại lợi nhuận cao', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Advanced Academic Collocations',
        desc: 'Các cụm từ đi đôi tự nhiên: deeply concerned, take into account, bear in mind',
        vocab: [
          { word: 'take into account', ipa: '/teɪk ˈɪntuː əˈkaʊnt/', vi: 'tính đến, xem xét kỹ', type: 'listening' },
          { word: 'play a vital role', ipa: '/pleɪ ə ˈvaɪtl roʊl/', vi: 'đóng vai trò sống còn', type: 'speaking' },
          { word: 'make a contribution', ipa: '/meɪk ə ˌkɑːntrɪˈbjuːʃn/', vi: 'đóng góp tích cực', type: 'writing' },
          { word: 'draw a conclusion', ipa: '/drɔː ə kənˈkluːʒn/', vi: 'rút ra kết luận', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Idioms in Everyday Communication',
        desc: 'Hiểu và dùng thành ngữ tiếng Anh tự nhiên: Hit the nail on the head, Cost an arm and a leg',
        vocab: [
          { word: 'hit the nail on the head', ipa: '/hɪt ðə neɪl ɑːn ðə hed/', vi: 'nói trúng phóc vấn đề', type: 'listening' },
          { word: 'once in a blue moon', ipa: '/wʌns ɪn ə bluː muːn/', vi: 'hiếm hoi lắm mới có', type: 'speaking' },
          { word: 'piece of cake', ipa: '/piːs əv keɪk/', vi: 'dễ như ăn bánh', type: 'writing' },
          { word: 'break the ice', ipa: '/breɪk ðə aɪs/', vi: 'phá vỡ bầu không khí ngại ngùng', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Debating Social Issues & Globalization',
        desc: 'Tranh biện về biến đổi khí hậu, toàn cầu hóa và bất bình đẳng',
        vocab: [
          { word: 'globalization', ipa: '/ˌɡloʊbələˈzeɪʃn/', vi: 'toàn cầu hóa kinh tế', type: 'listening' },
          { word: 'controversial', ipa: '/ˌkɑːntrəˈvɜːrʃl/', vi: 'gây nhiều tranh cãi', type: 'speaking' },
          { word: 'inequality', ipa: '/ˌɪnɪˈkwɑːləti/', vi: 'sự bất bình đẳng xã hội', type: 'writing' },
          { word: 'sustainable', ipa: '/səˈsteɪnəbl/', vi: 'bền vững lâu dài', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'IELTS Task 2 Essay Writing Skills',
        desc: 'Lập dàn ý bài luận dạng Opinion và Problem-Solution chuẩn 4 tiêu chí',
        vocab: [
          { word: 'furthermore', ipa: '/ˌfɜːrðərˈmɔːr/', vi: 'hơn thế nữa, vả lại', type: 'listening' },
          { word: 'on the other hand', ipa: '/ɑːn ðiː ˈʌðər hænd/', vi: 'mặt khác, ngược lại', type: 'speaking' },
          { word: 'nevertheless', ipa: '/ˌnevərðəˈles/', vi: 'tuy nhiên, dẫu vậy', type: 'writing' },
          { word: 'consequently', ipa: '/ˈkɑːnsəkwentli/', vi: 'kết quả là, do đó', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Third & Mixed Conditionals',
        desc: 'Giả định những điều hối tiếc trong quá khứ dẫn đến kết quả hiện tại',
        vocab: [
          { word: 'if I had known', ipa: '/ɪf aɪ hæd noʊn/', vi: 'nếu lúc đó tôi biết', type: 'listening' },
          { word: 'would have been', ipa: '/wʊd hæv bɪn/', vi: 'thì lúc ấy đã như thế', type: 'speaking' },
          { word: 'could have avoided', ipa: '/kʊd hæv əˈvɔɪdɪd/', vi: 'đã có thể tránh khỏi', type: 'writing' },
          { word: 'regret', ipa: '/rɪˈɡret/', vi: 'hối tiếc nuối', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'AI & Digital Transformation in Industry',
        desc: 'Thuật ngữ trí tuệ nhân tạo, an ninh mạng và chuyển đổi số doanh nghiệp',
        vocab: [
          { word: 'artificial intelligence', ipa: '/ˌɑːrtɪˈfɪʃl ɪnˈtelɪdʒəns/', vi: 'trí tuệ nhân tạo AI', type: 'listening' },
          { word: 'cybersecurity', ipa: '/ˈsaɪbərsɪkjʊrəti/', vi: 'an ninh an toàn mạng', type: 'speaking' },
          { word: 'automation', ipa: '/ˌɔːtəˈmeɪʃn/', vi: 'tự động hóa sản xuất', type: 'writing' },
          { word: 'innovation', ipa: '/ˌɪnəˈveɪʃn/', vi: 'đổi mới sáng tạo', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Work-Life Balance & Stress Management',
        desc: 'Thảo luận về áp lực công việc, hội chứng kiệt sức (burnout) và sức khỏe tinh thần',
        vocab: [
          { word: 'work-life balance', ipa: '/wɜːrk laɪf ˈbæləns/', vi: 'cân bằng công việc đời sống', type: 'listening' },
          { word: 'burnout', ipa: '/ˈbɜːrnaʊt/', vi: 'hội chứng kiệt sức mệt mỏi', type: 'speaking' },
          { word: 'mental well-being', ipa: '/ˈmentl ˈwel biːɪŋ/', vi: 'sức khỏe tinh thần thoải mái', type: 'writing' },
          { word: 'productivity', ipa: '/ˌproʊdʌkˈtɪvəti/', vi: 'năng suất làm việc', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Corporate Financial Budgeting & ROI',
        desc: 'Đánh giá tỷ suất hoàn vốn đầu tư ROI, phân bổ ngân sách dự án',
        vocab: [
          { word: 'return on investment', ipa: '/rɪˈtɜːrn ɑːn ɪnˈvestmənt/', vi: 'tỷ suất hoàn vốn ROI', type: 'listening' },
          { word: 'budget allocation', ipa: '/ˈbʌdʒɪt ˌæləˈkeɪʃn/', vi: 'phân bổ ngân sách tiền', type: 'speaking' },
          { word: 'revenue stream', ipa: '/ˈrevənuː striːm/', vi: 'dòng doanh thu ổn định', type: 'writing' },
          { word: 'fiscal year', ipa: '/ˈfɪskl jɪr/', vi: 'năm tài chính', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'en_c1',
    code: 'C1',
    badge: 'Advanced',
    color: '#EF4444',
    unit_id: 'en_u_c1_full',
    unit_number: 1,
    unit_title: 'C1 - Advanced (Tiếng Anh Học Thuật & Chuyên Gia)',
    unit_desc: 'Báo cáo tài chính, quản trị điều hành, đảo ngữ, câu phức nâng cao và bài báo khoa học',
    lessons: [
      {
        num: 1,
        title: 'Financial Forecasting & Macro Analysis',
        desc: 'Phân tích dự phóng tài chính và sự biến động thị trường toàn cầu',
        vocab: [
          { word: 'forecasting', ipa: '/ˈfɔːrkæstɪŋ/', vi: 'dự báo tài chính tương lai', type: 'listening' },
          { word: 'volatility', ipa: '/ˌvɑːləˈtɪləti/', vi: 'tính biến động khôn lường', type: 'speaking' },
          { word: 'asset valuation', ipa: '/ˈæset ˌvæljuˈeɪʃn/', vi: 'định giá tài sản', type: 'writing' },
          { word: 'liquidity', ipa: '/lɪˈkwɪdəti/', vi: 'tính thanh khoản tiền mặt', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Executive Leadership & Governance',
        desc: 'Quản trị hội đồng quản trị, ra quyết định chiến lược và quản trị đạo đức',
        vocab: [
          { word: 'corporate governance', ipa: '/ˈkɔːrpərət ˈɡʌvərnəns/', vi: 'quản trị doanh nghiệp', type: 'listening' },
          { word: 'stakeholder', ipa: '/ˈsteɪkhoʊldər/', vi: 'các bên liên quan', type: 'speaking' },
          { word: 'accountability', ipa: '/əˌkaʊntəˈbɪləti/', vi: 'trách nhiệm giải trình', type: 'writing' },
          { word: 'visionary', ipa: '/ˈvɪʒəneri/', vi: 'có tầm nhìn xa trông rộng', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Inversion for Emphasis & Rhetoric',
        desc: 'Cấu trúc đảo ngữ nhấn mạnh văn phong trang trọng: Seldom have I seen...',
        vocab: [
          { word: 'seldom have we seen', ipa: '/ˈseldəm hæv wiː siːn/', vi: 'hiếm khi chúng ta thấy', type: 'listening' },
          { word: 'not only did they', ipa: '/nɑːt ˈoʊnli dɪd ðeɪ/', vi: 'không những họ đã làm', type: 'speaking' },
          { word: 'under no circumstances', ipa: '/ˈʌndər noʊ ˈsɜːrkəmstænsɪz/', vi: 'trong bất kỳ hoàn cảnh nào cũng không', type: 'writing' },
          { word: 'scarcely had he', ipa: '/ˈskersli hæd hiː/', vi: 'vừa mới... thì đã', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Participle Clauses & Reduced Structures',
        desc: 'Mệnh đề phân từ rút gọn giúp câu văn súc tích và học thuật hơn',
        vocab: [
          { word: 'having finished the report', ipa: '/ˈhævɪŋ ˈfɪnɪʃt ðə rɪˈpɔːrt/', vi: 'sau khi đã hoàn thành báo cáo', type: 'listening' },
          { word: 'driven by curiosity', ipa: '/ˈdrɪvn baɪ ˌkjʊriˈɑːsəti/', vi: 'được thúc đẩy bởi tò mò', type: 'speaking' },
          { word: 'judging from the data', ipa: '/ˈdʒʌdʒɪŋ frəm ðə ˈdeɪtə/', vi: 'xem xét từ số liệu dẫn chứng', type: 'writing' },
          { word: 'provided that', ipa: '/prəˈvaɪdɪd ðæt/', vi: 'với điều kiện là', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Writing Peer-reviewed Scientific Papers',
        desc: 'Quy chuẩn bài báo khoa học quốc tế: Abstract, Methodology, Discussion',
        vocab: [
          { word: 'methodology', ipa: '/ˌmeθəˈdɑːlədʒi/', vi: 'phương pháp luận nghiên cứu', type: 'listening' },
          { word: 'empirical evidence', ipa: '/ɪmˈpɪrɪkl ˈevɪdəns/', vi: 'bằng chứng thực nghiệm', type: 'speaking' },
          { word: 'peer review', ipa: '/pɪr rɪˈvjuː/', vi: 'thẩm định đồng cấp chuyên gia', type: 'writing' },
          { word: 'hypothesis', ipa: '/haɪˈpɑːθəsɪs/', vi: 'giả thuyết khoa học', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Critical Thinking & Logical Fallacies',
        desc: 'Nhận diện ngụy biện logic (Ad Hominem, Straw Man) trong tranh luận',
        vocab: [
          { word: 'fallacy', ipa: '/ˈfæləsi/', vi: 'ngụy biện logic trong lập luận', type: 'listening' },
          { word: 'cognitive bias', ipa: '/ˈkɑːɡnətɪv ˈbaɪəs/', vi: 'thiên kiến nhận thức', type: 'speaking' },
          { word: 'premise', ipa: '/ˈpremɪs/', vi: 'tiền đề lý luận', type: 'writing' },
          { word: 'rationality', ipa: '/ˌræʃəˈnæləti/', vi: 'tính duy lý, hợp lý', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Macroeconomics & Monetary Policy',
        desc: 'Lãi suất cơ bản, nới lỏng định lượng (QE) và chính sách tài khóa',
        vocab: [
          { word: 'monetary policy', ipa: '/ˈmɑːnɪteri ˈpɑːləsi/', vi: 'chính sách tiền tệ', type: 'listening' },
          { word: 'quantitative easing', ipa: '/ˈkwɑːntɪteɪtɪv ˈiːzɪŋ/', vi: 'nới lỏng định lượng QE', type: 'speaking' },
          { word: 'fiscal stimulus', ipa: '/ˈfɪskl ˈstɪmjələs/', vi: 'gói kích thích tài khóa', type: 'writing' },
          { word: 'hyperinflation', ipa: '/ˌhaɪpərɪnˈfleɪʃn/', vi: 'siêu lạm phát phi mã', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Behavioral Psychology & Nudge Theory',
        desc: 'Ứng dụng tâm lý học hành vi và lý thuyết cú hích trong chính sách công',
        vocab: [
          { word: 'nudge theory', ipa: '/nʌdʒ ˈθiːəri/', vi: 'lý thuyết cú hích định hướng', type: 'listening' },
          { word: 'loss aversion', ipa: '/lɔːs əˈvɜːrʒn/', vi: 'tâm lý sợ thua lỗ', type: 'speaking' },
          { word: 'incentive', ipa: '/ɪnˈsentɪv/', vi: 'động lực khuyến khích', type: 'writing' },
          { word: 'heuristic', ipa: '/hjuːˈrɪstɪk/', vi: 'lối tắt tư duy phán đoán', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Corporate Social Responsibility (CSR) & Ethics',
        desc: 'Tiêu chuẩn môi trường xã hội ESG và đạo đức kinh doanh quốc tế',
        vocab: [
          { word: 'ethical dilemma', ipa: '/ˈeθɪkl daɪˈlemə/', vi: 'tình thế tiến thoái lưỡng nan về đạo đức', type: 'listening' },
          { word: 'sustainability report', ipa: '/səˌsteɪnəˈbɪləti rɪˈpɔːrt/', vi: 'báo cáo phát triển bền vững', type: 'speaking' },
          { word: 'carbon footprint', ipa: '/ˈkɑːrbən ˈfʊtprɪnt/', vi: 'dấu chân khí thải carbon', type: 'writing' },
          { word: 'social equity', ipa: '/ˈsoʊʃl ˈekwəti/', vi: 'sự công bằng bình đẳng xã hội', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Multilateral Negotiations & Treaty Drafting',
        desc: 'Ngoại giao đa phương, soạn thảo hiệp định và xây dựng đồng thuận',
        vocab: [
          { word: 'multilateral treaty', ipa: '/ˌmʌltiˈlætərəl ˈtriːti/', vi: 'hiệp ước đa phương quốc tế', type: 'listening' },
          { word: 'consensus', ipa: '/kənˈsensəs/', vi: 'sự đồng thuận nhất trí', type: 'speaking' },
          { word: 'ratification', ipa: '/ˌrætɪfɪˈkeɪʃn/', vi: 'sự phê chuẩn chính thức', type: 'writing' },
          { word: 'diplomatic immunity', ipa: '/ˌdɪpləˈmætɪk ɪˈmjuːnəti/', vi: 'quyền miễn trừ ngoại giao', type: 'matching' }
        ]
      }
    ]
  },
  {
    level_id: 'en_c2',
    code: 'C2',
    badge: 'Mastery',
    color: '#DC2626',
    unit_id: 'en_u_c2_full',
    unit_number: 1,
    unit_title: 'C2 - Mastery (Tiếng Anh Bản Xứ & Dịch Thuật Chuyên Nghiệp)',
    unit_desc: 'Ngôn ngữ ngoại giao tinh tế, thuật ngữ pháp lý, dịch cabin và triết học phương Tây',
    lessons: [
      {
        num: 1,
        title: 'Diplomatic Discourse & Ambiguity',
        desc: 'Nghệ thuật sử dụng ngôn từ ngoại giao tinh tế, nước đôi và giảm khinh',
        vocab: [
          { word: 'equivocal', ipa: '/ɪˈkwɪvəkl/', vi: 'nói nước đôi, ẩn ý tinh tế', type: 'listening' },
          { word: 'rapprochement', ipa: '/ˌræprɑːʃˈmɑːŋ/', vi: 'sự hòa giải thiết lập lại quan hệ', type: 'speaking' },
          { word: 'détente', ipa: '/deɪˈtɑːnt/', vi: 'sự xoa dịu căng thẳng đối đầu', type: 'writing' },
          { word: 'communique', ipa: '/kəˈmjuːnɪkeɪ/', vi: 'thông cáo chính thức của hội nghị', type: 'matching' }
        ]
      },
      {
        num: 2,
        title: 'Cross-border Contractual & Legal Terminology',
        desc: 'Thuật ngữ pháp lý la-tinh: Force Majeure, Indemnification, Injunction',
        vocab: [
          { word: 'force majeure', ipa: '/ˌfɔːrs mæˈʒɜːr/', vi: 'trường hợp bất khả kháng', type: 'listening' },
          { word: 'indemnification', ipa: '/ɪnˌdemnɪfɪˈkeɪʃn/', vi: 'sự bồi thường thiệt hại', type: 'speaking' },
          { word: 'injunction', ipa: '/ɪnˈdʒʌŋkʃn/', vi: 'lệnh đình chỉ cấm của tòa án', type: 'writing' },
          { word: 'jurisdiction', ipa: '/ˌdʒʊrɪsˈdɪkʃn/', vi: 'thẩm quyền tài phán của tòa', type: 'matching' }
        ]
      },
      {
        num: 3,
        title: 'Quantum Computing & Ethical AI Governance',
        desc: 'Điện toán lượng tử, thuật toán siêu thông minh và lằn ranh đạo đức',
        vocab: [
          { word: 'quantum entanglement', ipa: '/ˈkwɑːntəm ɪnˈtæŋɡlmənt/', vi: 'hiện tượng vướng víu lượng tử', type: 'listening' },
          { word: 'superposition', ipa: '/ˌsuːpərpəˈzɪʃn/', vi: 'trạng thái chồng chập lượng tử', type: 'speaking' },
          { word: 'existential risk', ipa: '/ˌeɡzɪˈstenʃl rɪsk/', vi: 'nguy cơ đe dọa sự tồn vong', type: 'writing' },
          { word: 'algorithmic alignment', ipa: '/ˌælɡəˈrɪðmɪk əˈlaɪnmənt/', vi: 'sự tương thích giá trị thuật toán', type: 'matching' }
        ]
      },
      {
        num: 4,
        title: 'Subtle Nuances & High-register Rhetoric',
        desc: 'Sắc thái tinh vi của các từ vựng cao cấp trong văn chương kinh viện',
        vocab: [
          { word: 'ubiquitous', ipa: '/juːˈbɪkwɪtəs/', vi: 'phổ biến khắp nơi chốn', type: 'listening' },
          { word: 'ephemeral', ipa: '/ɪˈfemərəl/', vi: 'phù du, sớm nở tối tàn', type: 'speaking' },
          { word: 'serendipity', ipa: '/ˌserənˈdɪpəti/', vi: 'sự may mắn tình cờ kỳ diệu', type: 'writing' },
          { word: 'quintessential', ipa: '/ˌkwɪntɪˈsenʃl/', vi: 'tinh hoa, mang tính tinh túy nhất', type: 'matching' }
        ]
      },
      {
        num: 5,
        title: 'Simultaneous Interpretation & Literary Translation',
        desc: 'Phương pháp phiên dịch trực tiếp và chuyển tải hồn cốt tác phẩm cổ điển',
        vocab: [
          { word: 'simultaneous interpretation', ipa: '/ˌsaɪmlˈteɪniəs ɪnˌtɜːrprəˈteɪʃn/', vi: 'dịch cabin đồng thời', type: 'listening' },
          { word: 'translatability', ipa: '/trænzˌleɪtəˈbɪləti/', vi: 'khả năng chuyển dịch ngôn ngữ', type: 'speaking' },
          { word: 'idiomatic fidelity', ipa: '/ˌɪdiəˈmætɪk fɪˈdeləti/', vi: 'độ trung thành với nguyên tác', type: 'writing' },
          { word: 'cultural resonance', ipa: '/ˈkʌltʃərəl ˈrezənəns/', vi: 'sự đồng vọng giao thoa văn hóa', type: 'matching' }
        ]
      },
      {
        num: 6,
        title: 'Western Philosophy & Epistemology',
        desc: 'Nhận thức luận, chủ nghĩa hiện sinh và sự tự do ý chí con người',
        vocab: [
          { word: 'epistemology', ipa: '/ɪˌpɪstəˈmɑːlədʒi/', vi: 'nhận thức luận triết học', type: 'listening' },
          { word: 'existentialism', ipa: '/ˌeɡzɪˈstenʃəlɪzəm/', vi: 'chủ nghĩa hiện sinh', type: 'speaking' },
          { word: 'determinism', ipa: '/dɪˈtɜːrmɪnɪzəm/', vi: 'thuyết tiền định tất yếu', type: 'writing' },
          { word: 'ontology', ipa: '/ɑːnˈtɑːlədʒi/', vi: 'bản thể luận', type: 'matching' }
        ]
      },
      {
        num: 7,
        title: 'Biomedical Innovations & Gene Editing',
        desc: 'Công nghệ chỉnh sửa gen CRISPR, tế bào gốc và liệu pháp miễn dịch ung thư',
        vocab: [
          { word: 'gene editing', ipa: '/dʒiːn ˈedɪtɪŋ/', vi: 'công nghệ chỉnh sửa gen sinh học', type: 'listening' },
          { word: 'immunotherapy', ipa: '/ɪˌmjuːnoʊˈθerəpi/', vi: 'liệu pháp tăng cường miễn dịch', type: 'speaking' },
          { word: 'stem cell therapy', ipa: '/stem sel ˈθerəpi/', vi: 'liệu pháp tế bào gốc', type: 'writing' },
          { word: 'bioethics', ipa: '/ˌbaɪoʊˈeθɪks/', vi: 'đạo đức sinh học y khoa', type: 'matching' }
        ]
      },
      {
        num: 8,
        title: 'Critical Theory & Postmodern Cultural Critique',
        desc: 'Lý thuyết phê bình văn hóa, giải cấu trúc và xã hội học đương đại',
        vocab: [
          { word: 'deconstruction', ipa: '/ˌdiːkənˈstrʌkʃn/', vi: 'thuyết giải cấu trúc văn bản', type: 'listening' },
          { word: 'hegemony', ipa: '/hɪˈdʒeməni/', vi: 'sự bá quyền chi phối', type: 'speaking' },
          { word: 'paradigm shift', ipa: '/ˈpærədaɪm ʃɪft/', vi: 'sự chuyển dịch hệ hình tư duy', type: 'writing' },
          { word: 'postmodernism', ipa: '/ˌpoʊstˈmɑːdərnɪzəm/', vi: 'chủ nghĩa hậu hiện đại', type: 'matching' }
        ]
      },
      {
        num: 9,
        title: 'Keynote Oratory & Inspiring Rhetoric',
        desc: 'Nghệ thuật hùng biện chạm đến trái tim khán giả tại các hội nghị đỉnh cao',
        vocab: [
          { word: 'eloquence', ipa: '/ˈeləkwəns/', vi: 'tài hùng biện lưu loát truyền cảm', type: 'listening' },
          { word: 'rhetorical device', ipa: '/rɪˈtɔːrɪkl dɪˈvaɪs/', vi: 'biện pháp tu từ đắt giá', type: 'speaking' },
          { word: 'catalyst for change', ipa: '/ˈkætəlɪst fɔːr tʃeɪndʒ/', vi: 'chất xúc tác cho sự đổi thay', type: 'writing' },
          { word: 'resonates deeply', ipa: '/ˈrezəneɪts ˈdiːpli/', vi: 'gây tiếng vang sâu thẳm', type: 'matching' }
        ]
      },
      {
        num: 10,
        title: 'Idiomatic Mastery & Archaic Expressions',
        desc: 'Làm chủ các cấu trúc bản xứ cổ điển và từ ngữ tao nhã của văn học Anh',
        vocab: [
          { word: 'by and large', ipa: '/baɪ ənd lɑːrdʒ/', vi: 'nhìn chung về toàn diện', type: 'listening' },
          { word: 'lest we forget', ipa: '/lest wiː fərˈɡet/', vi: 'e rằng chúng ta sẽ lãng quên', type: 'speaking' },
          { word: 'come what may', ipa: '/kʌm wʌt meɪ/', vi: 'dù chuyện gì có xảy ra đi nữa', type: 'writing' },
          { word: 'in retrospect', ipa: '/ɪn ˈretrəspekt/', vi: 'khi nhìn nhận ngoái lại quá khứ', type: 'matching' }
        ]
      }
    ]
  }
];

function generateEnglishUnits() {
  const units = [];
  EN_STAGES.forEach(stage => {
    const unitLessons = stage.lessons.map(l => {
      const lessonId = `${stage.unit_id}_l${l.num}`;
      return {
        id: lessonId,
        unit_id: stage.unit_id,
        lesson_number: l.num,
        title: `Lesson ${l.num}: ${l.title}`,
        description: l.desc,
        xp_reward: 25,
        type: 'standard',
        completed: false,
        status: 'unlocked',
        exercises: buildLessonExercises(lessonId, l.vocab.map(v => ({
          word: v.word,
          char: null,
          vi: v.vi,
          pinyin: v.ipa,
          type: v.type
        })))
      };
    });

    units.push({
      id: stage.unit_id,
      level_id: stage.level_id,
      unit_number: stage.unit_number,
      title: stage.unit_title,
      description: stage.unit_desc,
      icon: 'BookOpen',
      banner_color: stage.color,
      levelBadge: stage.badge,
      lessons: unitLessons
    });
  });
  return units;
}

// =============================================================================
// 3. WRITE THE FILES
// =============================================================================
console.log('Generating Chinese curriculum...');
const zhUnits = generateChineseUnits();
const zhContent = `/**
 * fullCurriculumZH.js
 * Comprehensive Chinese curriculum (8 Stages, 80 Lessons)
 * Generated automatically for 100% resilient offline & online learning.
 */

export const EXTRA_UNITS_ZH = ${JSON.stringify(zhUnits, null, 2)};
export default EXTRA_UNITS_ZH;
`;
fs.writeFileSync(path.join(targetDir, 'fullCurriculumZH.js'), zhContent, 'utf8');
console.log(`✅ Saved fullCurriculumZH.js with ${zhUnits.length} stages, ${zhUnits.reduce((a,u)=>a+u.lessons.length,0)} lessons!`);

console.log('Generating English curriculum...');
const enUnits = generateEnglishUnits();
const enContent = `/**
 * fullCurriculumEN.js
 * Comprehensive English curriculum (7 Stages, 70 Lessons)
 * Generated automatically for 100% resilient offline & online learning.
 */

export const EXTRA_UNITS_EN = ${JSON.stringify(enUnits, null, 2)};
export default EXTRA_UNITS_EN;
`;
fs.writeFileSync(path.join(targetDir, 'fullCurriculumEN.js'), enContent, 'utf8');
console.log(`✅ Saved fullCurriculumEN.js with ${enUnits.length} stages, ${enUnits.reduce((a,u)=>a+u.lessons.length,0)} lessons!`);

// Also create fullCurriculumGenerator.js as requested by user
const generatorContent = `/**
 * fullCurriculumGenerator.js
 * Central curriculum registry & loader for Chinese HSK 1-6 and English A1-C2.
 * Provides unified access to all Units and Lessons.
 */

import { EXTRA_UNITS_ZH } from './fullCurriculumZH.js';
import { EXTRA_UNITS_EN } from './fullCurriculumEN.js';

export const FULL_CURRICULUM_ZH = EXTRA_UNITS_ZH;
export const FULL_CURRICULUM_EN = EXTRA_UNITS_EN;

export const getCurriculumUnitsForLevel = (levelId) => {
  if (levelId.startsWith('zh_')) {
    return EXTRA_UNITS_ZH.filter(u => u.level_id === levelId);
  }
  if (levelId.startsWith('en_')) {
    return EXTRA_UNITS_EN.filter(u => u.level_id === levelId);
  }
  return [];
};

export const getCurriculumLessonById = (lessonId) => {
  for (const unit of [...EXTRA_UNITS_ZH, ...EXTRA_UNITS_EN]) {
    const found = unit.lessons?.find(l => l.id === lessonId);
    if (found) return found;
  }
  return null;
};

export default {
  FULL_CURRICULUM_ZH,
  FULL_CURRICULUM_EN,
  getCurriculumUnitsForLevel,
  getCurriculumLessonById
};
`;
fs.writeFileSync(path.join(targetDir, 'fullCurriculumGenerator.js'), generatorContent, 'utf8');
console.log('✅ Saved fullCurriculumGenerator.js!');
