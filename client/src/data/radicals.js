/**
 * 214 Kangxi Radicals & Character Etymology Breakdown Engine
 * Cung cấp phân tích chi tiết bộ thủ và câu chuyện chiết tự (Mnemonics) cho chữ Hán
 */

export const RADICALS_DATABASE = {
  '一': { name: 'Nhất', pinyin: 'yī', meaning: 'Số một, khởi đầu', strokes: 1 },
  '丨': { name: 'Cổn', pinyin: 'gǔn', meaning: 'Nét sổ dọc', strokes: 1 },
  '丶': { name: 'Chủ', pinyin: 'zhǔ', meaning: 'Điểm, chấm tròn', strokes: 1 },
  '丿': { name: 'Phiệt', pinyin: 'piě', meaning: 'Nét phẩy, nghiêng trái', strokes: 1 },
  '乙': { name: 'Ất', pinyin: 'yǐ', meaning: 'Can thứ hai, uốn lượn', strokes: 1 },
  '亅': { name: 'Quyết', pinyin: 'jué', meaning: 'Móc câu', strokes: 1 },
  
  '二': { name: 'Nhị', pinyin: 'èr', meaning: 'Số hai', strokes: 2 },
  '亠': { name: 'Đầu', pinyin: 'tóu', meaning: 'Nắp che, phía trên', strokes: 2 },
  '人': { name: 'Nhân', pinyin: 'rén', meaning: 'Con người', strokes: 2 },
  '亻': { name: 'Nhân đứng', pinyin: 'rén', meaning: 'Con người, tính cách, hành vi', strokes: 2 },
  '儿': { name: 'Nhi', pinyin: 'ér', meaning: 'Trẻ nhỏ, đôi chân', strokes: 2 },
  '入': { name: 'Nhập', pinyin: 'rù', meaning: 'Đi vào, tiếp nhận', strokes: 2 },
  '八': { name: 'Bát', pinyin: 'bā', meaning: 'Số tám, phân chia tách ra', strokes: 2 },
  '冂': { name: 'Quynh', pinyin: 'jiōng', meaning: 'Vùng biên cương xa xôi', strokes: 2 },
  '冖': { name: 'Mịch', pinyin: 'mì', meaning: 'Khăn trùm, che phủ', strokes: 2 },
  '冫': { name: 'Băng', pinyin: 'bīng', meaning: 'Băng tuyết, giá lạnh', strokes: 2 },
  '几': { name: 'Kỷ', pinyin: 'jǐ', meaning: 'Ghế ngồi, cái bàn nhỏ', strokes: 2 },
  '凵': { name: 'Khảm', pinyin: 'kǎn', meaning: 'Hố sâu, đồ chứa', strokes: 2 },
  '刀': { name: 'Đao', pinyin: 'dāo', meaning: 'Con dao, vũ khí', strokes: 2 },
  '刂': { name: 'Đao đứng', pinyin: 'dāo', meaning: 'Cắt gọt, đao kiếm', strokes: 2 },
  '力': { name: 'Lực', pinyin: 'lì', meaning: 'Sức mạnh, cơ bắp', strokes: 2 },
  '勹': { name: 'Bao', pinyin: 'bāo', meaning: 'Bao bọc, ôm lấy', strokes: 2 },
  '匕': { name: 'Chủy', pinyin: 'bǐ', meaning: 'Cái thìa, đoản kiếm', strokes: 2 },
  '匚': { name: 'Phương', pinyin: 'fāng', meaning: 'Hòm gỗ, hộp đựng', strokes: 2 },
  '十': { name: 'Thập', pinyin: 'shí', meaning: 'Số mười, hoàn hảo trọn vẹn', strokes: 2 },
  '卜': { name: 'Bặc', pinyin: 'bǔ', meaning: 'Bói toán, vết nứt mai rùa', strokes: 2 },
  '卩': { name: 'Tiết', pinyin: 'jié', meaning: 'Đốt tre, người quỳ gối', strokes: 2 },
  '厂': { name: 'Hán', pinyin: 'hàn', meaning: 'Vách đá dốc, xưởng', strokes: 2 },
  '厶': { name: 'Khư', pinyin: 'sī', meaning: 'Riêng tư, bản thân', strokes: 2 },
  '又': { name: 'Hựu', pinyin: 'yòu', meaning: 'Bàn tay phải, lặp lại lần nữa', strokes: 2 },

  '口': { name: 'Khẩu', pinyin: 'kǒu', meaning: 'Cái miệng, lời nói, ăn uống', strokes: 3 },
  '囗': { name: 'Vi', pinyin: 'wéi', meaning: 'Vây quanh, bao bọc bốn phía', strokes: 3 },
  '土': { name: 'Thổ', pinyin: 'tǔ', meaning: 'Đất đai, mặt đất', strokes: 3 },
  '士': { name: 'Sĩ', pinyin: 'shì', meaning: 'Kẻ sĩ, người tài giỏi', strokes: 3 },
  '夂': { name: 'Trĩ', pinyin: 'zhǐ', meaning: 'Đi chậm theo sau', strokes: 3 },
  '夊': { name: 'Tuy', pinyin: 'suī', meaning: 'Dáng đi chậm chạp', strokes: 3 },
  '夕': { name: 'Tịch', pinyin: 'xī', meaning: 'Buổi chiều tối, trăng khuyết', strokes: 3 },
  '大': { name: 'Đại', pinyin: 'dà', meaning: 'To lớn, người dang tay', strokes: 3 },
  '女': { name: 'Nữ', pinyin: 'nǚ', meaning: 'Phụ nữ, người mẹ', strokes: 3 },
  '子': { name: 'Tử', pinyin: 'zǐ', meaning: 'Đứa con, trẻ nhỏ', strokes: 3 },
  '宀': { name: 'Miên', pinyin: 'mián', meaning: 'Mái nhà, nơi ở', strokes: 3 },
  '寸': { name: 'Thốn', pinyin: 'cùn', meaning: 'Tấc, đơn vị đo, quy tắc', strokes: 3 },
  '小': { name: 'Tiểu', pinyin: 'xiǎo', meaning: 'Nhỏ bé, ít ỏi', strokes: 3 },
  '⺌': { name: 'Tiểu đầu', pinyin: 'xiǎo', meaning: 'Nhỏ bé, tia sáng', strokes: 3 },
  '尢': { name: 'Uông', pinyin: 'wāng', meaning: 'Chân què, khập khiễng', strokes: 3 },
  '尸': { name: 'Thi', pinyin: 'shī', meaning: 'Thân xác, người nằm', strokes: 3 },
  '屮': { name: 'Triệt', pinyin: 'chè', meaning: 'Mầm cây mới nhú', strokes: 3 },
  '山': { name: 'Sơn', pinyin: 'shān', meaning: 'Núi non', strokes: 3 },
  '巛': { name: 'Xuyên', pinyin: 'chuān', meaning: 'Dòng sông uốn lượn', strokes: 3 },
  '工': { name: 'Công', pinyin: 'gōng', meaning: 'Thợ thuyền, công việc', strokes: 3 },
  '己': { name: 'Kỷ', pinyin: 'jǐ', meaning: 'Bản thân mình', strokes: 3 },
  '巾': { name: 'Cân', pinyin: 'jīn', meaning: 'Khăn vải, cờ treo', strokes: 3 },
  '干': { name: 'Can', pinyin: 'gān', meaning: 'Khiên chắn, can dự, khô ráo', strokes: 3 },
  '幺': { name: 'Yêu', pinyin: 'yāo', meaning: 'Sợi tơ nhỏ, non nớt', strokes: 3 },
  '广': { name: 'Quảng', pinyin: 'guǎng', meaning: 'Mái hiên rộng, ngôi nhà lớn', strokes: 3 },
  '廴': { name: 'Dẫn', pinyin: 'yǐn', meaning: 'Bước chân dài, kéo dài', strokes: 3 },
  '廾': { name: 'Củng', pinyin: 'gǒng', meaning: 'Chắp hai tay cung kính', strokes: 3 },
  '弋': { name: 'Dặc', pinyin: 'yì', meaning: 'Mũi tên có buộc dây', strokes: 3 },
  '弓': { name: 'Cung', pinyin: 'gōng', meaning: 'Cây cung bắn tên', strokes: 3 },
  '彐': { name: 'Kệ', pinyin: 'jì', meaning: 'Đầu con nhím, móng vuốt', strokes: 3 },
  '彡': { name: 'Sâm', pinyin: 'shān', meaning: 'Lông dài, hoa văn trang trí', strokes: 3 },
  '彳': { name: 'Xích', pinyin: 'chì', meaning: 'Bước chân trái, ngã tư đường', strokes: 3 },

  '心': { name: 'Tâm', pinyin: 'xīn', meaning: 'Trái tim, tình cảm, suy nghĩ', strokes: 4 },
  '忄': { name: 'Tâm đứng', pinyin: 'xīn', meaning: 'Tâm tư, cảm xúc dâng trào', strokes: 4 },
  '戈': { name: 'Qua', pinyin: 'gē', meaning: 'Cây giáo, vũ khí chiến đấu', strokes: 4 },
  '戶': { name: 'Hộ', pinyin: 'hù', meaning: 'Cánh cửa một cánh, hộ gia đình', strokes: 4 },
  '手': { name: 'Thủ', pinyin: 'shǒu', meaning: 'Bàn tay', strokes: 4 },
  '扌': { name: 'Thủ gảy', pinyin: 'shǒu', meaning: 'Hành động bằng tay (cầm, nắm, nâng)', strokes: 4 },
  '支': { name: 'Chi', pinyin: 'zhī', meaning: 'Cành cây, nâng đỡ', strokes: 4 },
  '攴': { name: 'Phác', pinyin: 'pū', meaning: 'Gõ nhẹ, đánh đòn', strokes: 4 },
  '攵': { name: 'Phác biến', pinyin: 'pū', meaning: 'Đánh khẽ, hành động sửa dạy', strokes: 4 },
  '文': { name: 'Văn', pinyin: 'wén', meaning: 'Văn hoa, chữ nghĩa, văn chương', strokes: 4 },
  '斗': { name: 'Đẩu', pinyin: 'dǒu', meaning: 'Cái đấu đong gạo, sao Bắc Đẩu', strokes: 4 },
  '斤': { name: 'Cân', pinyin: 'jīn', meaning: 'Cái rìu, đơn vị cân', strokes: 4 },
  '方': { name: 'Phương', pinyin: 'fāng', meaning: 'Hình vuông, phương hướng', strokes: 4 },
  '无': { name: 'Vô', pinyin: 'wú', meaning: 'Không có gì', strokes: 4 },
  '日': { name: 'Nhật', pinyin: 'rì', meaning: 'Mặt trời, ban ngày, thời gian', strokes: 4 },
  '曰': { name: 'Viết', pinyin: 'yuē', meaning: 'Rằng, nói rằng', strokes: 4 },
  '月': { name: 'Nguyệt', pinyin: 'yuè', meaning: 'Mặt trăng, cơ thể thịt (nhục biến)', strokes: 4 },
  '木': { name: 'Mộc', pinyin: 'mù', meaning: 'Cây cối, gỗ lim', strokes: 4 },
  '欠': { name: 'Khiếm', pinyin: 'qiàn', meaning: 'Há miệng ngáp, thiếu thốn', strokes: 4 },
  '止': { name: 'Chỉ', pinyin: 'zhǐ', meaning: 'Dừng lại, bàn chân', strokes: 4 },
  '歹': { name: 'Đãi', pinyin: 'dǎi', meaning: 'Xương tàn, chết chóc, tai ương', strokes: 4 },
  '殳': { name: 'Thù', pinyin: 'shū', meaning: 'Cây gậy tre, binh khí', strokes: 4 },
  '毋': { name: 'Vô', pinyin: 'wú', meaning: 'Đừng, không nên', strokes: 4 },
  '比': { name: 'Tỷ', pinyin: 'bǐ', meaning: 'So sánh, sát cạnh nhau', strokes: 4 },
  '毛': { name: 'Mao', pinyin: 'máo', meaning: 'Lông vũ, sợi tóc nhỏ', strokes: 4 },
  '氏': { name: 'Thị', pinyin: 'shì', meaning: 'Dòng họ, thị tộc', strokes: 4 },
  '气': { name: 'Khí', pinyin: 'qì', meaning: 'Hơi nước, không khí, khí chất', strokes: 4 },
  '水': { name: 'Thủy', pinyin: 'shuǐ', meaning: 'Nước, chất lỏng', strokes: 4 },
  '氵': { name: 'Ba chấm thủy', pinyin: 'shuǐ', meaning: 'Sông hồ, giọt nước, tẩy rửa', strokes: 4 },
  '火': { name: 'Hỏa', pinyin: 'huǒ', meaning: 'Ngọn lửa, sức nóng', strokes: 4 },
  '灬': { name: 'Bốn chấm hỏa', pinyin: 'huǒ', meaning: 'Lửa đun dưới đáy nồi, nấu nướng', strokes: 4 },
  '爪': { name: 'Trảo', pinyin: 'zhǎo', meaning: 'Móng vuốt muông thú', strokes: 4 },
  '父': { name: 'Phụ', pinyin: 'fù', meaning: 'Người cha, người chủ gia đình', strokes: 4 },
  '爻': { name: 'Hào', pinyin: 'yáo', meaning: 'Quẻ bát quái, đan chéo', strokes: 4 },
  '爿': { name: 'Tường', pinyin: 'qiáng', meaning: 'Miếng ván xẻ, cái giường', strokes: 4 },
  '片': { name: 'Phiến', pinyin: 'piàn', meaning: 'Mảnh vụn, lát mỏng', strokes: 4 },
  '牙': { name: 'Nha', pinyin: 'yá', meaning: 'Răng hàm đan khít', strokes: 4 },
  '牛': { name: 'Ngưu', pinyin: 'niú', meaning: 'Con trâu, con bò', strokes: 4 },
  '牜': { name: 'Ngưu biến', pinyin: 'niú', meaning: 'Gia súc, trâu bò', strokes: 4 },
  '犬': { name: 'Khuyển', pinyin: 'quǎn', meaning: 'Chó giữ nhà', strokes: 4 },
  '犭': { name: 'Khuyển thú', pinyin: 'quǎn', meaning: 'Thú hoang dã, động vật bốn chân', strokes: 4 },

  '玄': { name: 'Huyền', pinyin: 'xuán', meaning: 'Màu đen sâu thẳm, huyền bí', strokes: 5 },
  '玉': { name: 'Ngọc', pinyin: 'yù', meaning: 'Ngọc bích quý giá', strokes: 5 },
  '王': { name: 'Vương', pinyin: 'wáng', meaning: 'Vua, trang sức ngọc', strokes: 5 },
  '瓜': { name: 'Qua', pinyin: 'guā', meaning: 'Quả dưa leo, dưa hấu', strokes: 5 },
  '瓦': { name: 'Ngõa', pinyin: 'wǎ', meaning: 'Ngói lợp nhà, đồ gốm', strokes: 5 },
  '甘': { name: 'Cam', pinyin: 'gān', meaning: 'Ngọt ngào, ngon lành', strokes: 5 },
  '生': { name: 'Sinh', pinyin: 'shēng', meaning: 'Sinh sôi nảy nở, sống', strokes: 5 },
  '用': { name: 'Dụng', pinyin: 'yòng', meaning: 'Sử dụng, ứng dụng', strokes: 5 },
  '田': { name: 'Điền', pinyin: 'tián', meaning: 'Ruộng lúa chia ô', strokes: 5 },
  '疋': { name: 'Thất', pinyin: 'pǐ', meaning: 'Cuộn vải, cẳng chân', strokes: 5 },
  '疒': { name: 'Nạch', pinyin: 'nè', meaning: 'Người bệnh nằm trên giường, đau ốm', strokes: 5 },
  '癶': { name: 'Bát', pinyin: 'bō', meaning: 'Hai bàn chân dang rộng đạp đất', strokes: 5 },
  '白': { name: 'Bạch', pinyin: 'bái', meaning: 'Màu trắng, sáng tỏ', strokes: 5 },
  '皮': { name: 'Bì', pinyin: 'pí', meaning: 'Lớp da bao bọc', strokes: 5 },
  '皿': { name: 'Mãnh', pinyin: 'mǐn', meaning: 'Bát đĩa, chén đựng thức ăn', strokes: 5 },
  '目': { name: 'Mục', pinyin: 'mù', meaning: 'Mắt, nhìn ngắm', strokes: 5 },
  '矛': { name: 'Mâu', pinyin: 'máo', meaning: 'Cây giáo đâm xuyên', strokes: 5 },
  '矢': { name: 'Thỉ', pinyin: 'shǐ', meaning: 'Mũi tên bay thẳng', strokes: 5 },
  '石': { name: 'Thạch', pinyin: 'shí', meaning: 'Đá tảng cứng chắc', strokes: 5 },
  '示': { name: 'Thị', pinyin: 'shì', meaning: 'Bàn thờ thần linh, hiển thị ban phước', strokes: 5 },
  '礻': { name: 'Thị biến', pinyin: 'shì', meaning: 'Thần linh, phúc lộc, thờ cúng', strokes: 5 },
  '禸': { name: 'Nhựu', pinyin: 'róu', meaning: 'Vết chân thú in trên đất', strokes: 5 },
  '禾': { name: 'Hòa', pinyin: 'hé', meaning: 'Cây lúa trĩu bông', strokes: 5 },
  '穴': { name: 'Huyệt', pinyin: 'xué', meaning: 'Hang đá, lỗ hổng', strokes: 5 },
  '立': { name: 'Lập', pinyin: 'lì', meaning: 'Đứng vững vàng trên đất', strokes: 5 },

  '竹': { name: 'Trúc', pinyin: 'zhú', meaning: 'Cây tre, ống trúc', strokes: 6 },
  '⺮': { name: 'Trúc đầu', pinyin: 'zhú', meaning: 'Tre trúc, bút lông, giỏ rá', strokes: 6 },
  '米': { name: 'Mễ', pinyin: 'mǐ', meaning: 'Hạt gạo, lương thực', strokes: 6 },
  '糸': { name: 'Mịch', pinyin: 'mì', meaning: 'Bó tơ lụa', strokes: 6 },
  '纟': { name: 'Tơ dệt', pinyin: 'sī', meaning: 'Sợi chỉ, kết nối, dệt vải', strokes: 6 },
  '缶': { name: 'Phẫu', pinyin: 'fǒu', meaning: 'Bình sành nung', strokes: 6 },
  '网': { name: 'Võng', pinyin: 'wǎng', meaning: 'Lưới đánh cá, mạng lưới', strokes: 6 },
  '羊': { name: 'Dương', pinyin: 'yáng', meaning: 'Con dê, con cừu tốt lành', strokes: 6 },
  '羽': { name: 'Vũ', pinyin: 'yǔ', meaning: 'Lông chim, đôi cánh bay', strokes: 6 },
  '老': { name: 'Lão', pinyin: 'lǎo', meaning: 'Người già chống gậy', strokes: 6 },
  '耂': { name: 'Lão đầu', pinyin: 'lǎo', meaning: 'Bậc cao niên, kính trọng', strokes: 6 },
  '而': { name: 'Nhi', pinyin: 'ér', meaning: 'Râu ria, liên từ nối (mà, lại)', strokes: 6 },
  '耒': { name: 'Lỗi', pinyin: 'lěi', meaning: 'Cái cày xới đất', strokes: 6 },
  '耳': { name: 'Nhĩ', pinyin: 'ěr', meaning: 'Cái tai, lắng nghe', strokes: 6 },
  '聿': { name: 'Duật', pinyin: 'yù', meaning: 'Bàn tay cầm bút viết', strokes: 6 },
  '肉': { name: 'Nhục', pinyin: 'ròu', meaning: 'Thịt, bắp cơ', strokes: 6 },
  '臣': { name: 'Thần', pinyin: 'chén', meaning: 'Bầy tôi, cúi đầu phụng sự', strokes: 6 },
  '自': { name: 'Tự', pinyin: 'zì', meaning: 'Cái mũi, tự bản thân', strokes: 6 },
  '至': { name: 'Chí', pinyin: 'zhì', meaning: 'Mũi tên chạm đất, đạt đến', strokes: 6 },
  '臼': { name: 'Cữu', pinyin: 'jiù', meaning: 'Cái cối giã gạo', strokes: 6 },
  '舌': { name: 'Thiệt', pinyin: 'shé', meaning: 'Cái lưỡi nếm vị, phát âm', strokes: 6 },
  '舛': { name: 'Suyễn', pinyin: 'chuǎn', meaning: 'Bàn chân trái ngược, sai sót', strokes: 6 },
  '舟': { name: 'Chu', pinyin: 'zhōu', meaning: 'Con thuyền lướt sóng', strokes: 6 },
  '艮': { name: 'Cấn', pinyin: 'gèn', meaning: 'Quẻ Cấn, cứng rắn, ngoảnh đầu', strokes: 6 },
  '色': { name: 'Sắc', pinyin: 'sè', meaning: 'Màu sắc, vẻ mặt thần thái', strokes: 6 },
  '艸': { name: 'Thảo', pinyin: 'cǎo', meaning: 'Cỏ cây hoa lá', strokes: 6 },
  '艹': { name: 'Thảo đầu', pinyin: 'cǎo', meaning: 'Thảo mộc, dược liệu, hoa cỏ', strokes: 6 },
  '虍': { name: 'Hô', pinyin: 'hū', meaning: 'Bộ vằn da cọp', strokes: 6 },
  '虫': { name: 'Trùng', pinyin: 'chóng', meaning: 'Sâu bọ, côn trùng bò', strokes: 6 },
  '血': { name: 'Huyết', pinyin: 'xuè', meaning: 'Máu trong bát tế lễ', strokes: 6 },
  '行': { name: 'Hành', pinyin: 'xíng', meaning: 'Ngã tư đường, đi lại, tiến hành', strokes: 6 },
  '衣': { name: 'Y', pinyin: 'yī', meaning: 'Quần áo mặc', strokes: 6 },
  '衤': { name: 'Y biến', pinyin: 'yī', meaning: 'Trang phục, tay áo, vạt áo', strokes: 6 },
  '覀': { name: 'Á', pinyin: 'yà', meaning: 'Bao che phía Tây', strokes: 6 },

  '見': { name: 'Kiến', pinyin: 'jiàn', meaning: 'Mắt nhìn thấy, gặp gỡ', strokes: 7 },
  '见': { name: 'Kiến giản', pinyin: 'jiàn', meaning: 'Mắt trông thấy', strokes: 4 },
  '角': { name: 'Giác', pinyin: 'jiǎo', meaning: 'Sừng động vật, góc cạnh', strokes: 7 },
  '言': { name: 'Ngôn', pinyin: 'yán', meaning: 'Lời nói, ngôn ngữ', strokes: 7 },
  '讠': { name: 'Ngôn giản', pinyin: 'yán', meaning: 'Lời ăn tiếng nói, trò chuyện', strokes: 2 },
  '谷': { name: 'Cốc', pinyin: 'gǔ', meaning: 'Khe núi, dòng suối', strokes: 7 },
  '豆': { name: 'Đậu', pinyin: 'dòu', meaning: 'Hạt đậu, cái chén tế lễ', strokes: 7 },
  '豕': { name: 'Thỉ', pinyin: 'shǐ', meaning: 'Con heo, lợn', strokes: 7 },
  '豸': { name: 'Trĩ', pinyin: 'zhì', meaning: 'Thú không sừng, cầy chồn', strokes: 7 },
  '貝': { name: 'Bối', pinyin: 'bèi', meaning: 'Vỏ sò tiền tệ cổ đại', strokes: 7 },
  '贝': { name: 'Bối giản', pinyin: 'bèi', meaning: 'Của cải, tiền bạc, châu báu', strokes: 4 },
  '赤': { name: 'Xích', pinyin: 'chì', meaning: 'Màu đỏ thắm, lửa sáng', strokes: 7 },
  '走': { name: 'Tẩu', pinyin: 'zǒu', meaning: 'Chạy nhanh, bước đi', strokes: 7 },
  '辶': { name: 'Quai xước', pinyin: 'chuò', meaning: 'Đường đi, khoảng cách di chuyển', strokes: 3 },
  '足': { name: 'Túc', pinyin: 'zú', meaning: 'Bàn chân, đầy đủ sung túc', strokes: 7 },
  '⻊': { name: 'Túc biến', pinyin: 'zú', meaning: 'Hành động bằng chân (chạy, đá, nhảy)', strokes: 7 },
  '身': { name: 'Thân', pinyin: 'shēn', meaning: 'Thân thể, mang thai', strokes: 7 },
  '車': { name: 'Xa', pinyin: 'chē', meaning: 'Xe cộ kéo bánh xe', strokes: 7 },
  '车': { name: 'Xa giản', pinyin: 'chē', meaning: 'Xe cộ, phương tiện đi lại', strokes: 4 },
  '辛': { name: 'Tân', pinyin: 'xīn', meaning: 'Vị cay nồng, gian truân cực khổ', strokes: 7 },
  '辰': { name: 'Thần', pinyin: 'chén', meaning: 'Sao mai, thời khắc', strokes: 7 },
  '邑': { name: 'Ấp', pinyin: 'yì', meaning: 'Thành ấp, làng quê', strokes: 7 },
  '阝(phải)': { name: 'Ấp phải', pinyin: 'yì', meaning: 'Thành lũy, vùng đất', strokes: 2 },
  '阝(trái)': { name: 'Phụ trái', pinyin: 'fù', meaning: 'Gò đất cao, đồi núi', strokes: 2 },
  '酉': { name: 'Dậu', pinyin: 'yǒu', meaning: 'Hũ rượu lên men, canh Dậu', strokes: 7 },
  '釆': { name: 'Biện', pinyin: 'biàn', meaning: 'Phân biệt dấu vết móng thú', strokes: 7 },
  '里': { name: 'Lý', pinyin: 'lǐ', meaning: 'Làng xóm, dặm đường (Ruộng + Đất)', strokes: 7 },

  '金': { name: 'Kim', pinyin: 'jīn', meaning: 'Kim loại quý, vàng bạc', strokes: 8 },
  '钅': { name: 'Kim giản', pinyin: 'jīn', meaning: 'Kim loại, chuông, khóa', strokes: 5 },
  '長': { name: 'Trường', pinyin: 'cháng', meaning: 'Dài, lớn lên, trưởng bối', strokes: 8 },
  '门': { name: 'Môn giản', pinyin: 'mén', meaning: 'Cánh cửa đôi mở ra', strokes: 3 },
  '門': { name: 'Môn', pinyin: 'mén', meaning: 'Cánh cổng thành trì', strokes: 8 },
  '雨': { name: 'Vũ', pinyin: 'yǔ', meaning: 'Cơn mưa từ trời rơi xuống', strokes: 8 },
  '青': { name: 'Thanh', pinyin: 'qīng', meaning: 'Màu xanh lục ngọc, tuổi trẻ thanh xuân', strokes: 8 },
  '非': { name: 'Phi', pinyin: 'fēi', meaning: 'Không phải, đôi cánh xòe ngược', strokes: 8 },
  '面': { name: 'Diện', pinyin: 'miàn', meaning: 'Khuôn mặt, bề mặt tiếp xúc', strokes: 9 },
  '革': { name: 'Cách', pinyin: 'gé', meaning: 'Da thú đã cạo lông, cải cách', strokes: 9 },
  '音': { name: 'Âm', pinyin: 'yīn', meaning: 'Âm thanh, giai điệu nhạc', strokes: 9 },
  '頁': { name: 'Hiệp', pinyin: 'yè', meaning: 'Đầu người, trang sách lớn', strokes: 9 },
  '页': { name: 'Hiệp giản', pinyin: 'yè', meaning: 'Trang giấy, đỉnh đầu', strokes: 6 },
  '風': { name: 'Phong', pinyin: 'fēng', meaning: 'Gió mát thổi qua', strokes: 9 },
  '风': { name: 'Phong giản', pinyin: 'fēng', meaning: 'Gió lốc, phong thái', strokes: 4 },
  '飛': { name: 'Phi', pinyin: 'fēi', meaning: 'Chim bay lượn trên trời', strokes: 9 },
  '飞': { name: 'Phi giản', pinyin: 'fēi', meaning: 'Bay lượn', strokes: 3 },
  '食': { name: 'Thực', pinyin: 'shí', meaning: 'Đồ ăn lương thực, ăn uống', strokes: 9 },
  '饣': { name: 'Thực giản', pinyin: 'shí', meaning: 'Món ăn, ẩm thực (bánh, cơm)', strokes: 3 },
  '首': { name: 'Thủ', pinyin: 'shǒu', meaning: 'Cái đầu, đứng đầu tối cao', strokes: 9 },
  '香': { name: 'Hương', pinyin: 'xiāng', meaning: 'Hương thơm hạt lúa mới gặt', strokes: 9 },
  '馬': { name: 'Mã', pinyin: 'mǎ', meaning: 'Ngựa phi đường trường', strokes: 10 },
  '马': { name: 'Mã giản', pinyin: 'mǎ', meaning: 'Con ngựa', strokes: 3 },
  '骨': { name: 'Cốt', pinyin: 'gǔ', meaning: 'Xương cốt cơ thể', strokes: 10 },
  '高': { name: 'Cao', pinyin: 'gāo', meaning: 'Lầu gác cao vút, tôn kính', strokes: 10 },
  '髟': { name: 'Bưu', pinyin: 'biāo', meaning: 'Mái tóc dài buông xõa', strokes: 10 },
  '魚': { name: 'Ngư', pinyin: 'yú', meaning: 'Con cá bơi dưới nước', strokes: 11 },
  '鱼': { name: 'Ngư giản', pinyin: 'yú', meaning: 'Cá biển', strokes: 8 },
  '鳥': { name: 'Điểu', pinyin: 'niǎo', meaning: 'Loài chim có lông vũ', strokes: 11 },
  '鸟': { name: 'Điểu giản', pinyin: 'niǎo', meaning: 'Chim trời', strokes: 5 },
  '鹵': { name: 'Lỗ', pinyin: 'lǔ', meaning: 'Đất mặn, muối biển', strokes: 11 },
  '鹿': { name: 'Lộc', pinyin: 'lù', meaning: 'Con hươu sao hiền lành', strokes: 11 },
  '麥': { name: 'Mạch', pinyin: 'mài', meaning: 'Cây lúa mạch', strokes: 11 },
  '麦': { name: 'Mạch giản', pinyin: 'mài', meaning: 'Lúa mì', strokes: 7 },
  '麻': { name: 'Ma', pinyin: 'má', meaning: 'Cây gai dầu làm vải', strokes: 11 },
  '黃': { name: 'Hoàng', pinyin: 'huáng', meaning: 'Màu vàng đất đai', strokes: 12 },
  '黄': { name: 'Hoàng', pinyin: 'huáng', meaning: 'Màu vàng hoàng kim', strokes: 11 },
  '黍': { name: 'Thử', pinyin: 'shǔ', meaning: 'Hạt kê dẻo nấu xôi', strokes: 12 },
  '黑': { name: 'Hắc', pinyin: 'hēi', meaning: 'Màu đen khói bếp bồ hóng', strokes: 12 },
  '黹': { name: 'Chỉ', pinyin: 'zhǐ', meaning: 'Thêu thùa kim tuyến may vá', strokes: 12 },
  '鼎': { name: 'Đỉnh', pinyin: 'dǐng', meaning: 'Vạc đồng ba chân tế tự', strokes: 13 },
  '鼓': { name: 'Cổ', pinyin: 'gǔ', meaning: 'Trống da vang rền hội hè', strokes: 13 },
  '鼠': { name: 'Thử', pinyin: 'shǔ', meaning: 'Con chuột lắt', strokes: 13 },
  '鼻': { name: 'Tị', pinyin: 'bí', meaning: 'Chiếc mũi hít thở', strokes: 14 },
  '齊': { name: 'Tề', pinyin: 'qí', meaning: 'Bằng phẳng, tề tựu ngay ngắn', strokes: 14 },
  '齐': { name: 'Tề giản', pinyin: 'qí', meaning: 'Ngăn nắp, chỉnh tề', strokes: 6 },
  '齒': { name: 'Xỉ', pinyin: 'chǐ', meaning: 'Hàng răng nhai thức ăn', strokes: 15 },
  '齿': { name: 'Xỉ giản', pinyin: 'chǐ', meaning: 'Răng cửa, tuổi tác', strokes: 8 },
  '龍': { name: 'Long', pinyin: 'lóng', meaning: 'Rồng thần uy nghi', strokes: 16 },
  '龙': { name: 'Long giản', pinyin: 'lóng', meaning: 'Rồng thiêng', strokes: 5 }
};

/**
 * Deep Etymology & Mnemonic Database for Essential Chinese Characters
 */
export const CHARACTER_ETYMOLOGY_MAP = {
  '好': {
    character: '好',
    pinyin: 'hǎo',
    sinoViet: 'HẢO',
    type: 'Hội ý (Ý nghĩa kết hợp)',
    components: [
      { char: '女', name: 'Bộ Nữ', pinyin: 'nǚ', meaning: 'Người phụ nữ, người mẹ hiền hậu' },
      { char: '子', name: 'Bộ Tử', pinyin: 'zǐ', meaning: 'Đứa con trai nhỏ, con cái sum vầy' }
    ],
    mnemonic: 'Người phụ nữ (女) bồng bế đứa con (子) khỏe mạnh trên tay là niềm vui viên mãn nhất của gia đình, tượng trưng cho điều TỐT LÀNH, HẠNH PHÚC (Hảo).'
  },
  '明': {
    character: '明',
    pinyin: 'míng',
    sinoViet: 'MINH',
    type: 'Hội ý (Ánh sáng giao hòa)',
    components: [
      { char: '日', name: 'Bộ Nhật', pinyin: 'rì', meaning: 'Mặt trời chiếu ban ngày' },
      { char: '月', name: 'Bộ Nguyệt', pinyin: 'yuè', meaning: 'Mặt trăng soi ban đêm' }
    ],
    mnemonic: 'Mặt trời (日) của ban ngày hội ngộ cùng mặt trăng (月) của ban đêm, hai nguồn sáng lớn nhất của vũ trụ hợp lại tạo nên sự TƯƠI SÁNG, RÕ RÀNG (Minh).'
  },
  '休': {
    character: '休',
    pinyin: 'xiū',
    sinoViet: 'HƯU',
    type: 'Hội ý (Hình ảnh sinh động)',
    components: [
      { char: '亻', name: 'Bộ Nhân đứng', pinyin: 'rén', meaning: 'Con người sau giờ lao động' },
      { char: '木', name: 'Bộ Mộc', pinyin: 'mù', meaning: 'Gốc cây bóng mát ven đường' }
    ],
    mnemonic: 'Con người (亻) sau một ngày làm đồng vất vả tựa lưng vào gốc cây to (木) đón gió mát để NGHỈ NGƠI, DƯỠNG SỨC (Hưu trí).'
  },
  '你': {
    character: '你',
    pinyin: 'nǐ',
    sinoViet: 'NHĨ',
    type: 'Hình thanh kết hợp',
    components: [
      { char: '亻', name: 'Bộ Nhân', pinyin: 'rén', meaning: 'Con người xưng hô' },
      { char: '尔', name: 'Chữ Nhĩ', pinyin: 'ěr', meaning: 'Bạn, người đối diện (âm Nhĩ)' }
    ],
    mnemonic: 'Người (亻) đang đứng trực diện trước mặt mình chính là BẠN, ANH, CẬU (Nhĩ).'
  },
  '谢': {
    character: '谢',
    pinyin: 'xiè',
    sinoViet: 'TẠ',
    type: 'Hình thanh & Hội ý',
    components: [
      { char: '讠', name: 'Bộ Ngôn', pinyin: 'yán', meaning: 'Lời nói thốt ra từ tim' },
      { char: '身', name: 'Bộ Thân', pinyin: 'shēn', meaning: 'Cả cơ thể, thân mình' },
      { char: '寸', name: 'Bộ Thốn', pinyin: 'cùn', meaning: 'Quy tắc chừng mực lễ độ' }
    ],
    mnemonic: 'Dùng lời nói (讠) cúi gập toàn thân mình (身) xuống đúng chừng mực (寸) để bày tỏ lòng biết ơn sâu sắc: CẢM ƠN (Tạ ơn).'
  },
  '妈': {
    character: '妈',
    pinyin: 'mā',
    sinoViet: 'MÁ',
    type: 'Hình thanh (Nữ biểu ý, Mã mượn âm)',
    components: [
      { char: '女', name: 'Bộ Nữ', pinyin: 'nǚ', meaning: 'Người phụ nữ yêu thương' },
      { char: '马', name: 'Chữ Mã', pinyin: 'mǎ', meaning: 'Con ngựa tận tụy (mượn âm mǎ -> mā)' }
    ],
    mnemonic: 'Người phụ nữ (女) tần tảo làm việc quần quật như con ngựa (马) chăm lo nuôi nấng con đàn không màng mệt nhọc chính là MẸ (Má).'
  },
  '家': {
    character: '家',
    pinyin: 'jiā',
    sinoViet: 'GIA',
    type: 'Hội ý văn hóa nông nghiệp',
    components: [
      { char: '宀', name: 'Bộ Miên', pinyin: 'mián', meaning: 'Mái nhà che mưa chắn nắng' },
      { char: '豕', name: 'Bộ Thỉ', pinyin: 'shǐ', meaning: 'Con heo, gia súc ấm no' }
    ],
    mnemonic: 'Thời cổ đại, dưới mái nhà (宀) có nuôi bầy heo (豕) béo tốt chứng tỏ kinh tế ấm no, đó chính là GIA ĐÌNH, TỔ ẤM (Gia).'
  },
  '吃': {
    character: '吃',
    pinyin: 'chī',
    sinoViet: 'NGẬT / CẬT',
    type: 'Hội ý & Hình thanh',
    components: [
      { char: '口', name: 'Bộ Khẩu', pinyin: 'kǒu', meaning: 'Cái miệng' },
      { char: '乞', name: 'Chữ Khất', pinyin: 'qǐ', meaning: 'Xin ăn, đón nhận thức ăn' }
    ],
    mnemonic: 'Mở rộng cái miệng (口) đón nhận thức ăn khi đói lòng chính là hành động ĂN UỐNG (Ngật).'
  },
  '喝': {
    character: '喝',
    pinyin: 'hē',
    sinoViet: 'HÁT / HẠT',
    type: 'Hình thanh',
    components: [
      { char: '口', name: 'Bộ Khẩu', pinyin: 'kǒu', meaning: 'Cái miệng' },
      { char: '曷', name: 'Chữ Hạt', pinyin: 'hé', meaning: 'Khát khô cổ họng (Hạt mượn âm)' }
    ],
    mnemonic: 'Cổ họng khô khát (曷), dùng miệng (口) chiêu từng ngụm nước mát để UỐNG.'
  },
  '看': {
    character: '看',
    pinyin: 'kàn',
    sinoViet: 'KHÁN',
    type: 'Tượng hình hành động',
    components: [
      { char: '⺦', name: 'Thủ cách điệu', pinyin: 'shǒu', meaning: 'Bàn tay khum che trán' },
      { char: '目', name: 'Bộ Mục', pinyin: 'mù', meaning: 'Con mắt hướng về xa' }
    ],
    mnemonic: 'Đặt bàn tay (手/⺦) che trên mí mắt (目) để chắn ánh nắng chói chang khi phóng tầm mắt NHÌN XA, QUAN SÁT (Khán giả).'
  },
  '学': {
    character: '学',
    pinyin: 'xué',
    sinoViet: 'HỌC',
    type: 'Hội ý giáo dục',
    components: [
      { char: '⺍', name: 'Nét tinh hoa', pinyin: 'yáo', meaning: 'Ánh lửa soi rọi trí thức' },
      { char: '冖', name: 'Bộ Mịch', pinyin: 'mì', meaning: 'Mái trường che chở' },
      { char: '子', name: 'Bộ Tử', pinyin: 'zǐ', meaning: 'Đứa trẻ thơ' }
    ],
    mnemonic: 'Đứa trẻ nhỏ (子) ngồi dưới mái trường (冖) tiếp thu những ánh sáng văn minh (⺍) để HỌC HỎI kiến thức (Học sinh).'
  },
  '说': {
    character: '说',
    pinyin: 'shuō',
    sinoViet: 'THUYẾT',
    type: 'Hình thanh & Hội ý',
    components: [
      { char: '讠', name: 'Bộ Ngôn', pinyin: 'yán', meaning: 'Lời nói truyền đạt' },
      { char: '兑', name: 'Chữ Đoái', pinyin: 'duì', meaning: 'Quẻ Đoái, cái miệng cười vui vẻ' }
    ],
    mnemonic: 'Dùng lời nói (讠) từ miệng nở nụ cười vui tươi (兑) để NÓI CHUYỆN, GIẢI THÍCH (Thuyết minh).'
  },
  '想': {
    character: '想',
    pinyin: 'xiǎng',
    sinoViet: 'TƯỞNG',
    type: 'Hội ý tâm lý',
    components: [
      { char: '相', name: 'Chữ Tương', pinyin: 'xiāng', meaning: 'Hình ảnh, dung mạo người xưa' },
      { char: '心', name: 'Bộ Tâm', pinyin: 'xīn', meaning: 'Trái tim, đáy lòng khắc ghi' }
    ],
    mnemonic: 'Hình ảnh ai đó (相) luôn đọng lại trong trái tim (心), khiến ta không ngừng NHỚ NHUNG, SUY NGHĨ (Tưởng niệm).'
  },
  '爱': {
    character: '爱',
    pinyin: 'ài',
    sinoViet: 'ÁI',
    type: 'Hội ý tình cảm',
    components: [
      { char: '爫', name: 'Bộ Trảo', pinyin: 'zhǎo', meaning: 'Bàn tay nâng niu vuốt ve' },
      { char: '冖', name: 'Bộ Mịch', pinyin: 'mì', meaning: 'Bao bọc bảo vệ' },
      { char: '友', name: 'Chữ Hữu', pinyin: 'yǒu', meaning: 'Tình bạn bè thân thiết, bàn tay nắm lấy' }
    ],
    mnemonic: 'Đôi bàn tay nâng niu (爫), che chở trọn vẹn (冖) cho người bạn thân thiết nhất (友) chính là TÌNH YÊU THƯƠNG (Ái tình).'
  },
  '语': {
    character: '语',
    pinyin: 'yǔ',
    sinoViet: 'NGỮ',
    type: 'Hình thanh & Hội ý',
    components: [
      { char: '讠', name: 'Bộ Ngôn', pinyin: 'yán', meaning: 'Lời nói phát ra' },
      { char: '五', name: 'Chữ Ngũ', pinyin: 'wǔ', meaning: 'Số 5, số đông' },
      { char: '口', name: 'Bộ Khẩu', pinyin: 'kǒu', meaning: 'Cái miệng' }
    ],
    mnemonic: 'Lời nói (讠) cất lên từ năm (五) miệng (口) cùng chia sẻ và giao tiếp tạo nên NGÔN NGỮ (Ngữ pháp).'
  },
  '朋': {
    character: '朋',
    pinyin: 'péng',
    sinoViet: 'BẰNG',
    type: 'Tượng hình sâu sắc',
    components: [
      { char: '月', name: 'Vầng trăng 1', pinyin: 'yuè', meaning: 'Vầng trăng thứ nhất' },
      { char: '月', name: 'Vầng trăng 2', pinyin: 'yuè', meaning: 'Vầng trăng thứ hai đồng hành' }
    ],
    mnemonic: 'Hai vầng trăng (月) song hành cạnh nhau trên bầu trời, như hai tâm hồn tri kỷ gắn bó keo sơn tạo thành BẠN BÈ (Bằng hữu).'
  },
  '友': {
    character: '友',
    pinyin: 'yǒu',
    sinoViet: 'HỮU',
    type: 'Hội ý bàn tay kết giao',
    components: [
      { char: '𠂇', name: 'Bàn tay trái', pinyin: 'shǒu', meaning: 'Bàn tay của tôi' },
      { char: '又', name: 'Bàn tay phải', pinyin: 'yòu', meaning: 'Bàn tay của bạn' }
    ],
    mnemonic: 'Hai bàn tay (又) siết chặt lấy nhau đồng cam cộng khổ trên đường đời tạo nên TÌNH BẠN (Hữu nghị).'
  },
  '钱': {
    character: '钱',
    pinyin: 'qián',
    sinoViet: 'TIỀN',
    type: 'Hình thanh & Hội ý của cải',
    components: [
      { char: '钅', name: 'Bộ Kim', pinyin: 'jīn', meaning: 'Kim loại vàng bạc đúc tiền' },
      { char: '戋', name: 'Chữ Tiên', pinyin: 'jiān', meaning: 'Mũi giáo tranh giành (mượn âm qián)' }
    ],
    mnemonic: 'Kim loại quý đúc bằng vàng bạc (钅) mà con người thường cầm vũ khí (戋) tranh giành nhau chính là TIỀN TÀI (Tiền bạc).'
  }
};

/**
 * Trích xuất bộ thủ và câu chuyện chiết tự cho bất kỳ chữ Hán nào
 */
export function analyzeHanziRadicals(char) {
  if (!char || typeof char !== 'string') return null;
  const targetChar = char.trim().charAt(0);

  // 1. Kiểm tra trong danh mục chiết tự chuyên sâu có sẵn
  if (CHARACTER_ETYMOLOGY_MAP[targetChar]) {
    return CHARACTER_ETYMOLOGY_MAP[targetChar];
  }

  // 2. Tự động rà soát các bộ thủ cấu thành chữ Hán
  const foundComponents = [];
  for (const [radical, info] of Object.entries(RADICALS_DATABASE)) {
    if (radical !== targetChar && targetChar.includes(radical)) {
      foundComponents.push({
        char: radical,
        name: `Bộ ${info.name}`,
        pinyin: info.pinyin,
        meaning: info.meaning
      });
      if (foundComponents.length >= 3) break;
    }
  }

  // 3. Nếu tìm thấy hoặc tra trong bảng bộ thủ chính
  const mainRadicalInfo = RADICALS_DATABASE[targetChar];

  return {
    character: targetChar,
    pinyin: mainRadicalInfo?.pinyin || '',
    sinoViet: mainRadicalInfo?.name || '',
    type: mainRadicalInfo ? 'Chữ tượng hình gốc (Bộ thủ)' : 'Chữ Hán kết hợp',
    components: foundComponents.length > 0 ? foundComponents : [
      {
        char: targetChar,
        name: mainRadicalInfo ? `Bộ ${mainRadicalInfo.name}` : 'Chữ Hán chuẩn',
        pinyin: mainRadicalInfo?.pinyin || '',
        meaning: mainRadicalInfo?.meaning || 'Ký tự biểu ý giàu văn hóa Đông Á'
      }
    ],
    mnemonic: mainRadicalInfo 
      ? `Đây là chữ tượng hình cơ bản thuộc 214 Bộ thủ Khang Hy: ${mainRadicalInfo.meaning}.`
      : `Chữ ${targetChar} kết hợp các nét biểu ý độc đáo, tạo nên cấu trúc hài hòa giữa hình dáng và thanh điệu.`
  };
}
