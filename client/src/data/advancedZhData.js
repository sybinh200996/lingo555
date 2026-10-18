/**
 * advancedZhData.js
 * Comprehensive authentic Chinese curriculum for HSK 3, HSK 4, HSK 5, HSK 6 & Chuyên Ngành.
 * Strict quality rule: NO DUMMY REPEATED LOOPS. Every level has authentic level-appropriate data.
 */

export const ADVANCED_ZH_DATA = {
  "zh_hsk3": {
    "levelId": "zh_hsk3",
    "code": "HSK 3",
    "title": "HSK 3 - Trung Cấp 1: Giao Tiếp Độc Lập & Xử Lý Sự Cố",
    "lessons": [
      {
        "id": "zh_hsk3_l1",
        "title": "Bài 1: Du Lịch Tự Túc & Đặt Vé Tàu Xe",
        "grammarFocus": "Câu chữ 把 nâng cao: Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác (Kết quả, Nơi chốn: 把行李放好, 把护照拿出来).",
        "vocabularies": [
          {
            "id": "zh_h3_1_1",
            "word": "行李",
            "pronunciation": "xíngli",
            "hanViet": "HÀNH LÝ",
            "partOfSpeech": "noun",
            "meaningVi": "Hành lý",
            "radicals": "行 (Hành - đi) + 李 (Lý - quả mận)",
            "grammarNote": "Lượng từ dùng 件 (jiàn). Ví dụ: 两件行李.",
            "exampleSentence": {
              "target": "请把你的行李放在桌子下面。",
              "pronunciation": "Qǐng bǎ nǐ de xíngli fàng zài zhuōzi xiàmiàn.",
              "meaningVi": "Xin hãy để hành lý của bạn xuống dưới bàn."
            }
          },
          {
            "id": "zh_h3_1_2",
            "word": "护照",
            "pronunciation": "hùzhào",
            "hanViet": "HỘ CHIẾU",
            "partOfSpeech": "noun",
            "meaningVi": "Hộ chiếu",
            "radicals": "护 (Hộ - bảo hộ, giữ gìn) + 照 (Chiếu - chụp ảnh, chiếu rọi)",
            "grammarNote": "Lượng từ dùng 本 (běn). Thường đi với động từ 办 (làm), 带 (mang).",
            "exampleSentence": {
              "target": "出国旅游必须把护照带在身边。",
              "pronunciation": "Chūguó lǚyóu bìxū bǎ hùzhào dài zài shēnbiān.",
              "meaningVi": "Đi du lịch nước ngoài nhất định phải mang hộ chiếu bên mình."
            }
          },
          {
            "id": "zh_h3_1_3",
            "word": "起飞",
            "pronunciation": "qǐfēi",
            "hanViet": "KHỞI PHI",
            "partOfSpeech": "verb",
            "meaningVi": "Cất cánh (máy bay)",
            "radicals": "起 (Khởi - thức dậy, bắt đầu) + 飞 (Phi - bay)",
            "grammarNote": "Trái nghĩa với 降落 (jiàngluò - hạ cánh). Thường đi với 快要...了.",
            "exampleSentence": {
              "target": "飞机马上就要起飞了，请关掉手机。",
              "pronunciation": "Fēijī mǎshàng jiù yào qǐfēi le, qǐng guāndiào shǒujī.",
              "meaningVi": "Máy bay sắp cất cánh rồi, xin vui lòng tắt điện thoại."
            }
          },
          {
            "id": "zh_h3_1_4",
            "word": "车站",
            "pronunciation": "chēzhàn",
            "hanViet": "XA TRẠM",
            "partOfSpeech": "noun",
            "meaningVi": "Nhà ga, bến xe",
            "radicals": "车 (Xa - xe) + 站 (Trạm - đứng)",
            "grammarNote": "Có thể ghép thành 火车站 (ga tàu hỏa), 地铁站 (ga tàu điện ngầm), 公交车站 (trạm xe buýt).",
            "exampleSentence": {
              "target": "我已经在火车站等了你半个小时。",
              "pronunciation": "Wǒ yǐjīng zài huǒchēzhàn děng le nǐ bàn ge xiǎoshí.",
              "meaningVi": "Tôi đã đợi bạn ở ga tàu hỏa nửa tiếng đồng hồ rồi."
            }
          },
          {
            "id": "zh_h3_1_5",
            "word": "导游",
            "pronunciation": "dǎoyóu",
            "hanViet": "ĐẠO DU",
            "partOfSpeech": "noun",
            "meaningVi": "Hướng dẫn viên du lịch",
            "radicals": "导 (Đạo - dẫn dắt) + 游 (Du - du lịch, dạo chơi)",
            "grammarNote": "Lượng từ dùng 位 (wèi) trang trọng.",
            "exampleSentence": {
              "target": "那位导游把景点的历史讲得非常清楚。",
              "pronunciation": "Nà wèi dǎoyóu bǎ jǐngdiǎn de lìshǐ jiǎng de fēicháng qīngchu.",
              "meaningVi": "Vị hướng dẫn viên đó đã giảng giải lịch sử điểm tham quan rất rõ ràng."
            }
          },
          {
            "id": "zh_h3_1_6",
            "word": "地图",
            "pronunciation": "dìtú",
            "hanViet": "ĐỊA ĐỒ",
            "partOfSpeech": "noun",
            "meaningVi": "Bản đồ",
            "radicals": "地 (Địa - đất đai) + 图 (Đồ - tranh vẽ)",
            "grammarNote": "Lượng từ dùng 张 (zhāng). Thường đi với 查地图 (tra bản đồ).",
            "exampleSentence": {
              "target": "请把这张电子地图下载到手机里。",
              "pronunciation": "Qǐng bǎ zhè zhāng diànzǐ dìtú xiàzǎi dào shǒujī lǐ.",
              "meaningVi": "Xin hãy tải bản đồ điện tử này vào điện thoại."
            }
          },
          {
            "id": "zh_h3_1_7",
            "word": "准时",
            "pronunciation": "zhǔnshí",
            "hanViet": "CHUẨN THỜI",
            "partOfSpeech": "adj/adverb",
            "meaningVi": "Đúng giờ",
            "radicals": "准 (Chuẩn - chuẩn xác) + 时 (Thời - thời gian)",
            "grammarNote": "Đứng trước động từ làm trạng ngữ: 准时出发, 准时到达.",
            "exampleSentence": {
              "target": "明天早上八点我们在酒店门口准时集合。",
              "pronunciation": "Míngtiān zǎoshang bā diǎn wǒmen zài jiǔdiàn ménkǒu zhǔnshí jíhé.",
              "meaningVi": "8 giờ sáng mai chúng ta tập trung đúng giờ ở cửa khách sạn."
            }
          },
          {
            "id": "zh_h3_1_8",
            "word": "出发",
            "pronunciation": "chūfā",
            "hanViet": "XUẤT PHÁT",
            "partOfSpeech": "verb",
            "meaningVi": "Xuất phát, khởi hành",
            "radicals": "出 (Xuất - ra ngoài) + 发 (Phát - phát ra)",
            "grammarNote": "Thường kết hợp với 向 (xiàng) hoặc 从 (cóng).",
            "exampleSentence": {
              "target": "我们把东西准备好就马上出发。",
              "pronunciation": "Wǒmen bǎ dōngxi zhǔnbèi hǎo jiù mǎshàng chūfā.",
              "meaningVi": "Chúng ta chuẩn bị xong đồ đạc là lập tức xuất phát."
            }
          }
        ]
      },
      {
        "id": "zh_hsk3_l2",
        "title": "Bài 2: Thuê Nhà, Tìm Phòng & Hợp Đồng Thuê",
        "grammarFocus": "Câu bị động chữ 被: Đối tượng chịu tác động + 被 (+ Chủ thể hành động) + Động từ + Thành phần khác (房租被涨了, 钥匙被弄丢了).",
        "vocabularies": [
          {
            "id": "zh_h3_2_1",
            "word": "房租",
            "pronunciation": "fángzū",
            "hanViet": "PHÒNG TÔ",
            "partOfSpeech": "noun",
            "meaningVi": "Tiền thuê nhà",
            "radicals": "房 (Phòng - ngôi nhà) + 租 (Tô - tiền thuê)",
            "grammarNote": "Thường đi với 交房租 (nộp tiền thuê nhà), 付房租 (trả tiền thuê nhà).",
            "exampleSentence": {
              "target": "每个月五号之前必须交房租。",
              "pronunciation": "Měi ge yuè wǔ hào zhīqián bìxū jiāo fángzū.",
              "meaningVi": "Trước ngày 5 hàng tháng bắt buộc phải đóng tiền thuê nhà."
            }
          },
          {
            "id": "zh_h3_2_2",
            "word": "合同",
            "pronunciation": "hétong",
            "hanViet": "HỢP ĐỒNG",
            "partOfSpeech": "noun",
            "meaningVi": "Hợp đồng",
            "radicals": "合 (Hợp - kết hợp, cùng nhau) + 同 (Đồng - giống nhau)",
            "grammarNote": "Đi với động từ 签 (qiān - ký): 签合同 (ký hợp đồng). Lượng từ dùng 份 (fèn).",
            "exampleSentence": {
              "target": "这份租房合同被房东修改了两次。",
              "pronunciation": "Zhè fèn zūfáng hétong bèi fángdōng xiūgǎi le liǎng cì.",
              "meaningVi": "Bản hợp đồng thuê nhà này đã bị chủ nhà sửa đổi hai lần."
            }
          },
          {
            "id": "zh_h3_2_3",
            "word": "房东",
            "pronunciation": "fángdōng",
            "hanViet": "PHÒNG ĐÔNG",
            "partOfSpeech": "noun",
            "meaningVi": "Chủ nhà (cho thuê)",
            "radicals": "房 (Phòng - nhà) + 东 (Đông - chủ nhà, đông gia)",
            "grammarNote": "Người thuê nhà gọi là 房客 (fángkè).",
            "exampleSentence": {
              "target": "房东同意下周过来修空调。",
              "pronunciation": "Fángdōng tóngyì xià zhōu guòlái xiū kōngtiáo.",
              "meaningVi": "Chủ nhà đã đồng ý tuần sau qua sửa điều hòa."
            }
          },
          {
            "id": "zh_h3_2_4",
            "word": "电梯",
            "pronunciation": "diàntī",
            "hanViet": "ĐIỆN THANG",
            "partOfSpeech": "noun",
            "meaningVi": "Thang máy",
            "radicals": "电 (Điện - điện lực) + 梯 (Thang - cái thang)",
            "grammarNote": "Thường đi với 坐电梯 (đi thang máy), 乘电梯.",
            "exampleSentence": {
              "target": "这栋楼的电梯坏了，我们得走楼梯上去。",
              "pronunciation": "Zhè dòng lóu de diàntī huài le, wǒmen děi zǒu lóutī shàngqù.",
              "meaningVi": "Thang máy của tòa nhà này hỏng rồi, chúng ta phải đi cầu thang bộ lên."
            }
          },
          {
            "id": "zh_h3_2_5",
            "word": "环境",
            "pronunciation": "huánjìng",
            "hanViet": "HOÀN CẢNH",
            "partOfSpeech": "noun",
            "meaningVi": "Môi trường, không gian xung quanh",
            "radicals": "环 (Hoàn - vòng quanh) + 境 (Cảnh - ranh giới, hoàn cảnh)",
            "grammarNote": "Thường kết hợp: 环境安静 (môi trường yên tĩnh), 保护环境 (bảo vệ môi trường).",
            "exampleSentence": {
              "target": "这个小区的绿化很好，居住环境非常舒服。",
              "pronunciation": "Zhè ge xiǎoqū de lǜhuà hěn hǎo, jūzhù huánjìng fēicháng shūfu.",
              "meaningVi": "Khu dân cư này phủ xanh rất tốt, môi trường sống vô cùng dễ chịu."
            }
          },
          {
            "id": "zh_h3_2_6",
            "word": "搬家",
            "pronunciation": "bānjiā",
            "hanViet": "BAN GIA",
            "partOfSpeech": "verb",
            "meaningVi": "Chuyển nhà",
            "radicals": "搬 (Ban - dời, chuyển đi) + 家 (Gia - nhà)",
            "grammarNote": "Từ ly hợp: 搬过一次家.",
            "exampleSentence": {
              "target": "周末朋友们都来帮我搬家。",
              "pronunciation": "Zhōumò péngyoumen dōu lái bāng wǒ bānjiā.",
              "meaningVi": "Cuối tuần bạn bè đều đến giúp tôi chuyển nhà."
            }
          },
          {
            "id": "zh_h3_2_7",
            "word": "打扫",
            "pronunciation": "dǎsǎo",
            "hanViet": "ĐẢ TẢO",
            "partOfSpeech": "verb",
            "meaningVi": "Quét dọn, dọn dẹp vệ sinh",
            "radicals": "打 (Đả - gõ, làm) + 扫 (Tảo - cây chổi, quét dọn)",
            "grammarNote": "Thường đi kèm kết quả: 打扫干净.",
            "exampleSentence": {
              "target": "房间已经被阿姨打扫得干干净净。",
              "pronunciation": "Fángjiān yǐjīng bèi āyí dǎsǎo de gāngānjìngjìng.",
              "meaningVi": "Căn phòng đã được cô giúp việc dọn dẹp sạch bong kin kít."
            }
          },
          {
            "id": "zh_h3_2_8",
            "word": "邻居",
            "pronunciation": "línjū",
            "hanViet": "LÂN CƯ",
            "partOfSpeech": "noun",
            "meaningVi": "Hàng xóm",
            "radicals": "邻 (Lân - gần kề) + 居 (Cư - cư ngụ, sinh sống)",
            "grammarNote": "Thành ngữ: 远亲不如近邻 (Bà con xa không bằng láng giềng gần).",
            "exampleSentence": {
              "target": "我的邻居是一位热情的中学老师。",
              "pronunciation": "Wǒ de línjū shì yí wèi rèqíng de zhōngxué lǎoshī.",
              "meaningVi": "Hàng xóm của tôi là một giáo viên trung học rất nhiệt tình."
            }
          }
        ]
      },
      {
        "id": "zh_hsk3_l3",
        "title": "Bài 3: Khám Bệnh, Nhà Thuốc & Bệnh Viện",
        "grammarFocus": "Bổ ngữ xu hướng kép: Động từ + 上来 / 下去 / 出来 / 进去 / 过来 / 过去 (走出来, 跑上去, 坚持下去).",
        "vocabularies": [
          {
            "id": "zh_h3_3_1",
            "word": "感冒",
            "pronunciation": "gǎnmào",
            "hanViet": "CẢM MẠO",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Bị cảm cúm, bệnh cảm",
            "radicals": "感 (Cảm - cảm giác) + 冒 (Mạo - bốc lên, liều lĩnh)",
            "grammarNote": "Lượng từ cho đợt cảm: 一场感冒.",
            "exampleSentence": {
              "target": "他最近工作太累，感冒发烧了。",
              "pronunciation": "Tā zuìjìn gōngzuò tài lèi, gǎnmào fāshāo le.",
              "meaningVi": "Dạo này anh ấy làm việc quá mệt nên bị cảm cúm sốt rồi."
            }
          },
          {
            "id": "zh_h3_3_2",
            "word": "发烧",
            "pronunciation": "fāshāo",
            "hanViet": "PHÁT THIÊU",
            "partOfSpeech": "verb",
            "meaningVi": "Bị sốt",
            "radicals": "发 (Phát - phát sinh) + 烧 (Thiêu - đốt cháy, nóng)",
            "grammarNote": "Thường nói nhiệt độ: 发烧到三十九度.",
            "exampleSentence": {
              "target": "孩子从昨天晚上就开始发烧，得去医院看急诊。",
              "pronunciation": "Háizi cóng zuótiān wǎnshang jiù kāishǐ fāshāo, děi qù yīyuàn kàn jīzhěn.",
              "meaningVi": "Đứa bé từ tối qua đã bắt đầu sốt, phải đến bệnh viện khám cấp cứu."
            }
          },
          {
            "id": "zh_h3_3_3",
            "word": "检查",
            "pronunciation": "jiǎnchá",
            "hanViet": "KIỂM TRA",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Khám bệnh, kiểm tra",
            "radicals": "检 (Kiểm - xem xét) + 查 (Tra - tra cứu, điều tra)",
            "grammarNote": "Có thể làm danh từ: 做全身检查 (khám tổng quát).",
            "exampleSentence": {
              "target": "医生认真地给他检查了身体。",
              "pronunciation": "Yīshēng rènzhēn de gěi tā jiǎnchá le shēntǐ.",
              "meaningVi": "Bác sĩ đã kiểm tra cơ thể cho anh ấy rất cẩn thận."
            }
          },
          {
            "id": "zh_h3_3_4",
            "word": "按时",
            "pronunciation": "ànshí",
            "hanViet": "ÁN THỜI",
            "partOfSpeech": "adverb",
            "meaningVi": "Đúng giờ, đúng định kỳ",
            "radicals": "按 (Án - theo như, bấm) + 时 (Thời - thời gian)",
            "grammarNote": "Thường đi với việc uống thuốc: 按时吃药.",
            "exampleSentence": {
              "target": "只要按时吃药，你的病很快就会好起来。",
              "pronunciation": "Zhǐyào ànshí chīyào, nǐ de bìng hěn kuài jiù huì hǎo qǐlai.",
              "meaningVi": "Chỉ cần uống thuốc đúng giờ, bệnh của bạn sẽ nhanh chóng khỏi thôi."
            }
          },
          {
            "id": "zh_h3_3_5",
            "word": "护士",
            "pronunciation": "hùshi",
            "hanViet": "HỘ SĨ",
            "partOfSpeech": "noun",
            "meaningVi": "Y tá, điều dưỡng",
            "radicals": "护 (Hộ - chăm sóc, che chở) + 士 (Sĩ - người trí thức, chuyên viên)",
            "grammarNote": "Lượng từ dùng 位 (wèi).",
            "exampleSentence": {
              "target": "护士从病房里走出来通知家属。",
              "pronunciation": "Hùshi cóng bìngfáng lǐ zǒu chūlai tōngzhī jiāshǔ.",
              "meaningVi": "Y tá từ trong phòng bệnh bước ra ngoài thông báo cho người nhà."
            }
          },
          {
            "id": "zh_h3_3_6",
            "word": "健康",
            "pronunciation": "jiànkāng",
            "hanViet": "KIỆN KHANG",
            "partOfSpeech": "adj/noun",
            "meaningVi": "Khỏe mạnh, sức khỏe",
            "radicals": "健 (Kiện - mạnh mẽ) + 康 (Khang - an khang, vui vẻ)",
            "grammarNote": "Thường chúc: 祝您身体健康.",
            "exampleSentence": {
              "target": "每天坚持跑步对身体健康非常有益。",
              "pronunciation": "Měitiān jiānchí pǎobù duì shēntǐ jiànkāng fēicháng yǒuyì.",
              "meaningVi": "Mỗi ngày kiên trì chạy bộ vô cùng có lợi cho sức khỏe."
            }
          },
          {
            "id": "zh_h3_3_7",
            "word": "疼",
            "pronunciation": "téng",
            "hanViet": "ĐỐNG / ĐÀO",
            "partOfSpeech": "adj/verb",
            "meaningVi": "Đau đớn",
            "radicals": "Bộ Nạch (疒 - biểu thị bệnh tật) + 冬 (Đông)",
            "grammarNote": "Đau đầu (头疼), đau bụng (肚子疼).",
            "exampleSentence": {
              "target": "我的胃疼得实在受不了了。",
              "pronunciation": "Wǒ de wèi téng de shízài shòubuliǎo le.",
              "meaningVi": "Dạ dày của tôi đau đến mức thực sự không chịu nổi nữa."
            }
          },
          {
            "id": "zh_h3_3_8",
            "word": "打针",
            "pronunciation": "dǎzhēn",
            "hanViet": "ĐẢ CHÂM",
            "partOfSpeech": "verb",
            "meaningVi": "Tiêm thuốc, chích thuốc",
            "radicals": "打 (Đả - thực hiện) + 针 (Châm - kim tiêm)",
            "grammarNote": "Từ ly hợp: 给病人打了一针.",
            "exampleSentence": {
              "target": "打针虽然有点疼，但是见效最快。",
              "pronunciation": "Dǎzhēn suīrán yǒudiǎn téng, dànshì jiànxiào zuì kuài.",
              "meaningVi": "Tiêm thuốc tuy có hơi đau nhưng hiệu quả nhanh nhất."
            }
          }
        ]
      },
      {
        "id": "zh_hsk3_l4",
        "title": "Bài 4: Môi Trường & Khí Hậu 4 Mùa",
        "grammarFocus": "Bổ ngữ khả năng: Động từ + 得 / 不 + Bổ ngữ kết quả/xu hướng (看得懂, 听得清, 做不完, 进不去).",
        "vocabularies": [
          {
            "id": "zh_h3_4_1",
            "word": "季节",
            "pronunciation": "jìjié",
            "hanViet": "QUÝ TIẾT",
            "partOfSpeech": "noun",
            "meaningVi": "Mùa trong năm",
            "radicals": "季 (Quý - mùa vụ) + 节 (Tiết - tiết khí)",
            "grammarNote": "Bốn mùa: 春夏秋冬 (Xuân Hạ Thu Đông).",
            "exampleSentence": {
              "target": "秋天是北京一年中最美丽的季节。",
              "pronunciation": "Qiūtiān shì Běijīng yì nián zhōng zuì měilì de jìjié.",
              "meaningVi": "Mùa thu là mùa đẹp nhất trong năm của Bắc Kinh."
            }
          },
          {
            "id": "zh_h3_4_2",
            "word": "刮风",
            "pronunciation": "guāfēng",
            "hanViet": "QUÁT PHONG",
            "partOfSpeech": "verb",
            "meaningVi": "Gió thổi mạnh",
            "radicals": "刮 (Quát - cạo, thổi rít) + 风 (Phong - ngọn gió)",
            "grammarNote": "Thường nói: 外面刮起了大风.",
            "exampleSentence": {
              "target": "今天外面风刮得很大，出门得多穿一件衣服。",
              "pronunciation": "Jīntiān wàimiàn fēng guā de hěn dà, chūmén děi duō chuān yí jiàn yīfu.",
              "meaningVi": "Hôm nay bên ngoài gió thổi rất to, ra ngoài phải mặc thêm một cái áo."
            }
          },
          {
            "id": "zh_h3_4_3",
            "word": "暖和",
            "pronunciation": "nuǎnhuo",
            "hanViet": "NOÃN HÒA",
            "partOfSpeech": "adj",
            "meaningVi": "Ấm áp dễ chịu",
            "radicals": "暖 (Noãn - có bộ Nhật chỉ mặt trời ấm áp) + 和 (Hòa)",
            "grammarNote": "Đọc thanh nhẹ huo. Trái nghĩa với 寒冷 (hánlěng - rét buốt).",
            "exampleSentence": {
              "target": "春天来了，天气一天比一天暖和。",
              "pronunciation": "Chūntiān lái le, tiānqì yì tiān bǐ yì tiān nuǎnhuo.",
              "meaningVi": "Mùa xuân đến rồi, thời tiết ngày một ấm áp hơn."
            }
          },
          {
            "id": "zh_h3_4_4",
            "word": "下雪",
            "pronunciation": "xiàxuě",
            "hanViet": "HẠ TUYẾT",
            "partOfSpeech": "verb",
            "meaningVi": "Tuyết rơi",
            "radicals": "下 (Hạ - rơi xuống) + 雪 (Tuyết - bộ Vũ biểu thị hiện tượng thời tiết)",
            "grammarNote": "Từ ly hợp: 下了一场大雪.",
            "exampleSentence": {
              "target": "南方人看到下雪总是特别兴奋。",
              "pronunciation": "Nánfāngrén kàndào xiàxuě zǒngshì tèbié xīngfèn.",
              "meaningVi": "Người phương Nam nhìn thấy tuyết rơi luôn luôn vô cùng phấn khích."
            }
          },
          {
            "id": "zh_h3_4_5",
            "word": "保护",
            "pronunciation": "bǎohù",
            "hanViet": "BẢO HỘ",
            "partOfSpeech": "verb",
            "meaningVi": "Bảo vệ, gìn giữ",
            "radicals": "保 (Bảo - bảo đảm) + 护 (Hộ - che chở)",
            "grammarNote": "Thường đi với: 保护环境 (bảo vệ môi trường), 保护视力 (bảo vệ thị lực).",
            "exampleSentence": {
              "target": "人人都有责任保护我们生活的地球。",
              "pronunciation": "Rénrén dōu yǒu zérèn bǎohù wǒmen shēnghuó de dìqiú.",
              "meaningVi": "Mọi người đều có trách nhiệm bảo vệ Trái đất mà chúng ta đang sinh sống."
            }
          },
          {
            "id": "zh_h3_4_6",
            "word": "空气",
            "pronunciation": "kōngqì",
            "hanViet": "KHÔNG KHÍ",
            "partOfSpeech": "noun",
            "meaningVi": "Không khí",
            "radicals": "空 (Không - bầu trời, trống rỗng) + 气 (Khí - luồng khí)",
            "grammarNote": "Thường kết hợp: 空气新鲜 (không khí trong lành), 空气污染 (ô nhiễm không khí).",
            "exampleSentence": {
              "target": "早晨山上的空气格外新鲜。",
              "pronunciation": "Zǎochén shānshang de kōngqì géwài xīnxiān.",
              "meaningVi": "Buổi sáng không khí trên núi đặc biệt trong lành."
            }
          },
          {
            "id": "zh_h3_4_7",
            "word": "极了",
            "pronunciation": "jíle",
            "hanViet": "CỰC LIỄU",
            "partOfSpeech": "adverb",
            "meaningVi": "Vô cùng, cực kỳ",
            "radicals": "极 (Cực - tột bậc) + 了 (Liễu)",
            "grammarNote": "Bổ ngữ mức độ đứng sau tính từ: 好极了, 美极了.",
            "exampleSentence": {
              "target": "今天海边的风景美极了。",
              "pronunciation": "Jīntiān hǎibiān de fēngjǐng měi jíle.",
              "meaningVi": "Hôm nay phong cảnh bên bờ biển đẹp tuyệt vời."
            }
          },
          {
            "id": "zh_h3_4_8",
            "word": "照相机",
            "pronunciation": "zhàoxiàngjī",
            "hanViet": "CHIẾU TƯỢNG CƠ",
            "partOfSpeech": "noun",
            "meaningVi": "Máy chụp ảnh",
            "radicals": "照 (Chiếu - chụp) + 相 (Tượng - diện mạo) + 机 (Cơ - cỗ máy)",
            "grammarNote": "Lượng từ dùng 部 (bù) hoặc 台 (tái).",
            "exampleSentence": {
              "target": "我用这台照相机拍了许多精彩的照片。",
              "pronunciation": "Wǒ yòng zhè tái zhàoxiàngjī pāi le xǔduō jīngcǎi de zhàopiàn.",
              "meaningVi": "Tôi đã dùng chiếc máy ảnh này chụp rất nhiều bức ảnh đặc sắc."
            }
          }
        ]
      },
      {
        "id": "zh_hsk3_l5",
        "title": "Bài 5: Văn Hóa & Lễ Hội Truyền Thống Tết Cổ Truyền",
        "grammarFocus": "Cấu trúc tương quan 越...越...: Càng... càng... (雨越下越大, 汉语越学越有意思).",
        "vocabularies": [
          {
            "id": "zh_h3_5_1",
            "word": "节日",
            "pronunciation": "jiérì",
            "hanViet": "TIẾT NHẬT",
            "partOfSpeech": "noun",
            "meaningVi": "Ngày lễ, lễ hội",
            "radicals": "节 (Tiết - ngày tết) + 日 (Nhật - ngày)",
            "grammarNote": "Lễ hội truyền thống: 传统节日 (Tết Nguyên Đán, Tết Trung Thu, Tết Đoan Ngọ).",
            "exampleSentence": {
              "target": "春节是中国人最重要的传统节日。",
              "pronunciation": "Chūnjié shì Zhōngguórén zuì zhòngyào de chuántǒng jiérì.",
              "meaningVi": "Tết Nguyên Đán là ngày lễ truyền thống quan trọng nhất của người Trung Quốc."
            }
          },
          {
            "id": "zh_h3_5_2",
            "word": "团圆",
            "pronunciation": "tuányuán",
            "hanViet": "ĐOÀN VIÊN",
            "partOfSpeech": "verb/adj",
            "meaningVi": "Đoàn tụ gia đình, sum vầy",
            "radicals": "团 (Đoàn - tụ họp) + 圆 (Viên - tròn trịa, trọn vẹn)",
            "grammarNote": "Thường nói: 一家人团圆, 吃团圆饭.",
            "exampleSentence": {
              "target": "不管工作多忙，除夕夜大家都要回家团圆。",
              "pronunciation": "Bùguǎn gōngzuò duō máng, chúxī yè dàjiā dōu yào huíjiā tuányuán.",
              "meaningVi": "Bất kể công việc bận rộn đến đâu, đêm giao thừa mọi người đều phải về nhà sum vầy."
            }
          },
          {
            "id": "zh_h3_5_3",
            "word": "饺子",
            "pronunciation": "jiǎozi",
            "hanViet": "SỦI CẢO / KIỂU TỬ",
            "partOfSpeech": "noun",
            "meaningVi": "Bánh sủi cảo",
            "radicals": "Bộ Thực (饣- chỉ thức ăn) + 交 (Giao)",
            "grammarNote": "Động từ làm bánh: 包饺子 (gói sủi cảo).",
            "exampleSentence": {
              "target": "全家人围坐在一起一边包饺子一边看春晚。",
              "pronunciation": "Quán jiārén wéizuò zài yìqǐ yìbiān bāo jiǎozi yìbiān kàn chūnwǎn.",
              "meaningVi": "Cả nhà quây quần ngồi lại vừa gói sủi cảo vừa xem chương trình chào xuân."
            }
          },
          {
            "id": "zh_h3_5_4",
            "word": "历史",
            "pronunciation": "lìshǐ",
            "hanViet": "LỊCH SỬ",
            "partOfSpeech": "noun",
            "meaningVi": "Lịch sử",
            "radicals": "历 (Lịch - trải qua) + 史 (Sử - ghi chép sự việc)",
            "grammarNote": "Thường kết hợp: 悠久的历史 (lịch sử lâu đời).",
            "exampleSentence": {
              "target": "这个古老的传统已经有两千多年的历史了。",
              "pronunciation": "Zhè ge gǔlǎo de chuántǒng yǐjīng yǒu liǎng qiān duō nián de lìshǐ le.",
              "meaningVi": "Truyền thống cổ kính này đã có hơn 2.000 năm lịch sử rồi."
            }
          },
          {
            "id": "zh_h3_5_5",
            "word": "礼物",
            "pronunciation": "lǐwù",
            "hanViet": "LỄ VẬT",
            "partOfSpeech": "noun",
            "meaningVi": "Món quà, quà tặng",
            "radicals": "礼 (Lễ - lễ nghi, tôn kính) + 物 (Vật - đồ vật)",
            "grammarNote": "Lượng từ dùng 份 (fèn) hoặc 件 (jiàn). 送礼物 (tặng quà).",
            "exampleSentence": {
              "target": "过年时孩子们最期待收到长辈送的礼物和红包。",
              "pronunciation": "Guònián shí háizimen zuì qīdài shōudào zhǎngbèi sòng de lǐwù hé hóngbāo.",
              "meaningVi": "Khi đón năm mới bọn trẻ con mong chờ nhất là nhận được quà và bao lì xì từ người lớn."
            }
          },
          {
            "id": "zh_h3_5_6",
            "word": "热闹",
            "pronunciation": "rènao",
            "hanViet": "NHIỆT NÁO",
            "partOfSpeech": "adj",
            "meaningVi": "Náo nhiệt, rộn ràng, đông vui",
            "radicals": "热 (Nhiệt - nóng bỏng, hân hoan) + 闹 (Náo - ồn ào)",
            "grammarNote": "Trái nghĩa với 冷清 (lěngqīng - vắng vẻ).",
            "exampleSentence": {
              "target": "大街上挂满了红灯笼，气氛热闹极了。",
              "pronunciation": "Dàjiē shang guà mǎn le hóng dēnglong, qìfēn rènao jíle.",
              "meaningVi": "Trên phố lớn treo đầy đèn lồng đỏ, không khí náo nhiệt vô cùng."
            }
          },
          {
            "id": "zh_h3_5_7",
            "word": "月亮",
            "pronunciation": "yuèliang",
            "hanViet": "NGUYỆT LƯỢNG",
            "partOfSpeech": "noun",
            "meaningVi": "Mặt trăng",
            "radicals": "月 (Nguyệt - trăng) + 亮 (Lượng - sáng)",
            "grammarNote": "Đọc thanh nhẹ liang. Hoạt động Trung Thu: 赏月 (ngắm trăng).",
            "exampleSentence": {
              "target": "中秋节晚上的月亮又圆又大。",
              "pronunciation": "Zhōngqiūjié wǎnshang de yuèliang yòu yuán yòu dà.",
              "meaningVi": "Mặt trăng vào đêm Tết Trung Thu vừa tròn lại vừa to."
            }
          },
          {
            "id": "zh_h3_5_8",
            "word": "文化",
            "pronunciation": "wénhuà",
            "hanViet": "VĂN HÓA",
            "partOfSpeech": "noun",
            "meaningVi": "Văn hóa",
            "radicals": "文 (Văn - văn chương) + 化 (Hóa - biến hóa)",
            "grammarNote": "Thường kết hợp: 中国文化 (Văn hóa Trung Hoa), 跨文化交流 (Giao lưu liên văn hóa).",
            "exampleSentence": {
              "target": "学习一门外语不仅是背单词，更是在了解一种文化。",
              "pronunciation": "Xuéxí yì mén wàiyǔ bùjǐn shì bèi dāncí, gèng shì zài liǎojiě yì zhǒng wénhuà.",
              "meaningVi": "Học một ngoại ngữ không chỉ là học thuộc từ vựng, mà hơn thế nữa là đang tìm hiểu một nền văn hóa."
            }
          }
        ]
      },
      {
        "id": "zh_hsk3_l6",
        "title": "Bài 6: Ngân Hàng, Thẻ Tín Dụng & Tài Chính Cá Nhân",
        "grammarFocus": "Cấu trúc 一边...一边...: Vừa làm hành động A vừa làm hành động B đồng thời (他一边喝咖啡一边看报纸).",
        "vocabularies": [
          {
            "id": "zh_h3_6_1",
            "word": "银行卡",
            "pronunciation": "yínhángkǎ",
            "hanViet": "NGÂN HÀNG KHẠP",
            "partOfSpeech": "noun",
            "meaningVi": "Thẻ ngân hàng",
            "radicals": "银行 (Ngân hàng) + 卡 (Khạp - thẻ cứng)",
            "grammarNote": "Lượng từ dùng 张 (zhāng). 办银行卡 (mở thẻ ngân hàng).",
            "exampleSentence": {
              "target": "请把身份证给我，我来帮你激活银行卡。",
              "pronunciation": "Qǐng bǎ shēnfènzhèng gěi wǒ, wǒ lái bāng nǐ jīhuó yínhángkǎ.",
              "meaningVi": "Xin đưa thẻ căn cước cho tôi, tôi sẽ kích hoạt thẻ ngân hàng giúp bạn."
            }
          },
          {
            "id": "zh_h3_6_2",
            "word": "密码",
            "pronunciation": "mìmǎ",
            "hanViet": "MẬT MÃ",
            "partOfSpeech": "noun",
            "meaningVi": "Mật khẩu",
            "radicals": "密 (Mật - bí mật) + 码 (Mã - chữ số)",
            "grammarNote": "Thường đi với: 输入密码 (nhập mật khẩu), 修改密码 (đổi mật khẩu).",
            "exampleSentence": {
              "target": "取钱时请在键盘上输入六位数密码。",
              "pronunciation": "Qǔqián shí qǐng zài jiànpán shang shūrù liù wèi shù mìmǎ.",
              "meaningVi": "Khi rút tiền xin vui lòng nhập mật khẩu 6 chữ số trên bàn phím."
            }
          },
          {
            "id": "zh_h3_6_3",
            "word": "存钱",
            "pronunciation": "cúnqián",
            "hanViet": "TỒN TIỀN",
            "partOfSpeech": "verb",
            "meaningVi": "Gửi tiền vào tài khoản/tiết kiệm",
            "radicals": "存 (Tồn - tích lũy, giữ lại) + 钱 (Tiền)",
            "grammarNote": "Trái nghĩa với 取钱 (qǔqián - rút tiền ra).",
            "exampleSentence": {
              "target": "每个月发工资后我都会把一部分钱存起来。",
              "pronunciation": "Měi ge yuè fā gōngzī hòu wǒ dōu huì bǎ yí bùfen qián cún qǐlai.",
              "meaningVi": "Mỗi tháng sau khi phát lương tôi đều đem một phần tiền đi gửi tiết kiệm."
            }
          },
          {
            "id": "zh_h3_6_4",
            "word": "转账",
            "pronunciation": "zhuǎnzhàng",
            "hanViet": "CHUYỂN CHƯỚNG",
            "partOfSpeech": "verb",
            "meaningVi": "Chuyển khoản ngân hàng",
            "radicals": "转 (Chuyển - đổi, di dời) + 账 (Chướng - sổ sách, tài khoản)",
            "grammarNote": "Thường dùng cấu trúc 给...转账 (chuyển tiền cho ai).",
            "exampleSentence": {
              "target": "我已经通过手机银行把货款转给你了。",
              "pronunciation": "Wǒ yǐjīng tōngguò shǒujī yínháng bǎ huòkuǎn zhuǎn gěi nǐ le.",
              "meaningVi": "Tôi đã chuyển tiền hàng cho bạn qua ứng dụng ngân hàng di động rồi."
            }
          },
          {
            "id": "zh_h3_6_5",
            "word": "信用卡",
            "pronunciation": "xìnyòngkǎ",
            "hanViet": "TÍN DỤNG KHẠP",
            "partOfSpeech": "noun",
            "meaningVi": "Thẻ tín dụng",
            "radicals": "信用 (Tín dụng - uy tín) + 卡 (Thẻ)",
            "grammarNote": "Động từ: 刷信用卡 (quẹt thẻ tín dụng).",
            "exampleSentence": {
              "target": "刷信用卡消费记得要在还款日之前按时还清。",
              "pronunciation": "Shuā xìnyòngkǎ xiāofèi jìde yào zài huánkuǎnrì zhīqián ànshí huánqīng.",
              "meaningVi": "Quẹt thẻ tín dụng tiêu dùng nhớ phải thanh toán đúng hạn trước ngày đến hạn."
            }
          },
          {
            "id": "zh_h3_6_6",
            "word": "花钱",
            "pronunciation": "huāqián",
            "hanViet": "HOA TIỀN",
            "partOfSpeech": "verb",
            "meaningVi": "Tiêu tiền, xài tiền",
            "radicals": "花 (Hoa - tiêu tốn) + 钱 (Tiền)",
            "grammarNote": "Khác với 赚钱 (thuộc tính kiếm tiền). Cụm từ: 花钱如流水.",
            "exampleSentence": {
              "target": "年轻人应该学会理性消费，不要随意乱花钱。",
              "pronunciation": "Niánqīngrén yīnggāi xuéhuì lǐxìng xiāofèi, bú yào suíyì luàn huāqián.",
              "meaningVi": "Người trẻ nên học cách chi tiêu hợp lý, không được tiêu xài hoang phí."
            }
          },
          {
            "id": "zh_h3_6_7",
            "word": "发票",
            "pronunciation": "fāpiào",
            "hanViet": "PHÁT PHIẾU",
            "partOfSpeech": "noun",
            "meaningVi": "Hóa đơn tài chính, hóa đơn VAT",
            "radicals": "发 (Phát - xuất ra) + 票 (Phiếu - chứng từ)",
            "grammarNote": "Thường nói: 开一张发票 (xuất một hóa đơn).",
            "exampleSentence": {
              "target": "请问可以帮我们开一张增值税发票吗？",
              "pronunciation": "Qǐngwèn kěyǐ bāng wǒmen kāi yì zhāng zēngzhíshuì fāpiào ma?",
              "meaningVi": "Xin hỏi có thể xuất giúp chúng tôi một hóa đơn giá trị gia tăng không?"
            }
          },
          {
            "id": "zh_h3_6_8",
            "word": "算",
            "pronunciation": "suàn",
            "hanViet": "TOÁN",
            "partOfSpeech": "verb",
            "meaningVi": "Tính toán, coi như",
            "radicals": "Bộ Trúc (竹) + 具 (Cụ - bàn tính tính toán cổ đại)",
            "grammarNote": "Thường đi với: 算账 (tính sổ), 打算 (dự tính).",
            "exampleSentence": {
              "target": "他认真地算了一下每个月的开销。",
              "pronunciation": "Tā rènzhēn de suàn le yíxià měi ge yuè de kāixiāo.",
              "meaningVi": "Anh ấy đã tính toán cẩn thận chi tiêu của mỗi tháng."
            }
          }
        ]
      },
      {
        "id": "zh_hsk3_l7",
        "title": "Bài 7: Giải Quyết Sự Cố Công Việc & Họp Văn Phòng",
        "grammarFocus": "Cấu trúc 除了...以外: Ngoài... ra (除了小李以外，其他人都参加了这次会议).",
        "vocabularies": [
          {
            "id": "zh_h3_7_1",
            "word": "会议",
            "pronunciation": "huìyì",
            "hanViet": "HỘI NGHỊ",
            "partOfSpeech": "noun",
            "meaningVi": "Cuộc họp, hội nghị",
            "radicals": "会 (Hội - gặp gỡ) + 议 (Nghị - thảo luận)",
            "grammarNote": "Động từ: 开会 (họp), 参加会议 (tham gia cuộc họp).",
            "exampleSentence": {
              "target": "今天的部门会议将讨论下一季度的销售计划。",
              "pronunciation": "Jīntiān de bùmén huìyì jiāng tǎolùn xià yí jìdù de xiāoshòu jìhuà.",
              "meaningVi": "Cuộc họp phòng ban hôm nay sẽ thảo luận kế hoạch bán hàng của quý tới."
            }
          },
          {
            "id": "zh_h3_7_2",
            "word": "同事",
            "pronunciation": "tóngshì",
            "hanViet": "ĐỒNG SỰ",
            "partOfSpeech": "noun",
            "meaningVi": "Đồng nghiệp",
            "radicals": "同 (Đồng - cùng nhau) + 事 (Sự - công việc)",
            "grammarNote": "Lượng từ dùng 位 (wèi).",
            "exampleSentence": {
              "target": "遇到不懂的技术难题可以向经验丰富的同事请教。",
              "pronunciation": "Yùdào bù dǒng de jìshù nántí kěyǐ xiàng jīngyàn fēngfù de tóngshì qǐngjiào.",
              "meaningVi": "Khi gặp khó khăn kỹ thuật chưa hiểu có thể thỉnh giáo đồng nghiệp giàu kinh nghiệm."
            }
          },
          {
            "id": "zh_h3_7_3",
            "word": "解决",
            "pronunciation": "jiějué",
            "hanViet": "GIẢI QUYẾT",
            "partOfSpeech": "verb",
            "meaningVi": "Giải quyết, xử lý ổn thỏa",
            "radicals": "解 (Giải - tháo gỡ) + 决 (Quyết - quyết định)",
            "grammarNote": "Thường kết hợp: 解决问题, 解决困难.",
            "exampleSentence": {
              "target": "我们必须在下班前把这个客户投诉解决好。",
              "pronunciation": "Wǒmen bìxū zài xiàbān qián bǎ zhè ge kèhù tóusù jiějué hǎo.",
              "meaningVi": "Chúng ta nhất định phải giải quyết xong khiếu nại khách hàng này trước khi tan làm."
            }
          },
          {
            "id": "zh_h3_7_4",
            "word": "推迟",
            "pronunciation": "tuīchí",
            "hanViet": "THÔI TRÌ",
            "partOfSpeech": "verb",
            "meaningVi": "Hoãn lại, lùi thời gian",
            "radicals": "推 (Thôi - đẩy ra) + 迟 (Trì - muộn màng, chậm)",
            "grammarNote": "Trái nghĩa với 提前 (tíqián - sớm hơn).",
            "exampleSentence": {
              "target": "因为经理出差，周一的汇报会议被推迟到周三。",
              "pronunciation": "Yīnwèi jīnglǐ chūchāi, zhōuyī de huìbào huìyì bèi tuīchí dào zhōusān.",
              "meaningVi": "Vì giám đốc đi công tác nên cuộc họp báo cáo sáng thứ hai bị lùi sang thứ tư."
            }
          },
          {
            "id": "zh_h3_7_5",
            "word": "打印",
            "pronunciation": "dǎyìn",
            "hanViet": "ĐẢ ẤN",
            "partOfSpeech": "verb",
            "meaningVi": "In ấn văn bản",
            "radicals": "打 (Đả - thực hiện) + 印 (Ấn - con dấu, in ra)",
            "grammarNote": "Thiết bị: 打印机 (máy in). Cụm từ: 把文件打印出来.",
            "exampleSentence": {
              "target": "请把这份最新的市场调研报告打印三份。",
              "pronunciation": "Qǐng bǎ zhè fèn zuìxīn de shìchǎng diàoyán bàogào dǎyìn sān fèn.",
              "meaningVi": "Xin hãy in bản báo cáo nghiên cứu thị trường mới nhất này ra ba bản."
            }
          },
          {
            "id": "zh_h3_7_6",
            "word": "负责",
            "pronunciation": "fùzé",
            "hanViet": "PHỤ TRÁCH",
            "partOfSpeech": "verb/adj",
            "meaningVi": "Phụ trách, chịu trách nhiệm",
            "radicals": "负 (Phụ - gánh vác) + 责 (Trách - bổn phận, trách nhiệm)",
            "grammarNote": "Cấu trúc: 对...负责 (chịu trách nhiệm với). Tính từ: 工作很负责.",
            "exampleSentence": {
              "target": "王经理负责整个华南区域的业务拓展。",
              "pronunciation": "Wáng jīnglǐ fùzé zhěnggè Huánán qūyù de yèwù tuòzhǎn.",
              "meaningVi": "Giám đốc Vương phụ trách phát triển nghiệp vụ toàn bộ khu vực Hoa Nam."
            }
          },
          {
            "id": "zh_h3_7_7",
            "word": "复印",
            "pronunciation": "fùyìn",
            "hanViet": "PHỨC ẤN",
            "partOfSpeech": "verb",
            "meaningVi": "Photocopy, sao chép văn bản",
            "radicals": "复 (Phức - lặp lại) + 印 (Ấn - in)",
            "grammarNote": "Thiết bị: 复印机 (máy photo).",
            "exampleSentence": {
              "target": "去会议室前别忘了复印两份合同草案。",
              "pronunciation": "Qù huìyìshì qián bié wàng le fùyìn liǎng fèn hétong cǎo'àn.",
              "meaningVi": "Trước khi vào phòng họp đừng quên photo hai bản dự thảo hợp đồng."
            }
          },
          {
            "id": "zh_h3_7_8",
            "word": "迟到",
            "pronunciation": "chídào",
            "hanViet": "TRÌ ĐÁO",
            "partOfSpeech": "verb",
            "meaningVi": "Đến muộn, đi trễ",
            "radicals": "迟 (Trì - muộn) + 到 (Đáo - đến nơi)",
            "grammarNote": "Thường nói: 迟到了五分钟.",
            "exampleSentence": {
              "target": "今天路上堵车非常严重，导致他上班迟到了。",
              "pronunciation": "Jīntiān lùshang dǔchē fēicháng yánzhòng, dǎozhì tā shàngbān chídào le.",
              "meaningVi": "Hôm nay trên đường kẹt xe rất nghiêm trọng, khiến anh ấy đi làm bị muộn."
            }
          }
        ]
      },
      {
        "id": "zh_hsk3_l8",
        "title": "Bài 8: Ẩm Thực Nhà Hàng & Món Ăn Bốn Phương",
        "grammarFocus": "Cấu trúc so sánh 比 & 跟...一样: A 比 B + Tính từ (这家餐厅比那家更正宗) & A 跟 B 一样 (这道菜的味道跟我妈妈做的一样).",
        "vocabularies": [
          {
            "id": "zh_h3_8_1",
            "word": "菜单",
            "pronunciation": "càidān",
            "hanViet": "THÁI ĐƠN",
            "partOfSpeech": "noun",
            "meaningVi": "Thực đơn món ăn",
            "radicals": "菜 (Thái - món ăn) + 单 (Đơn - danh sách)",
            "grammarNote": "Lượng từ dùng 份 (fèn). 看菜单 (xem thực đơn).",
            "exampleSentence": {
              "target": "服务员，请给我们拿一份中文菜单。",
              "pronunciation": "Fúwùyuán, qǐng gěi wǒmen ná yí fèn Zhōngwén càidān.",
              "meaningVi": "Phục vụ ơi, xin lấy giúp chúng tôi một quyển thực đơn tiếng Trung."
            }
          },
          {
            "id": "zh_h3_8_2",
            "word": "特色",
            "pronunciation": "tèsè",
            "hanViet": "ĐẶC SẮC",
            "partOfSpeech": "noun/adj",
            "meaningVi": "Đặc sắc, điểm nổi bật, món sở trường",
            "radicals": "特 (Đặc - đặc biệt) + 色 (Sắc - màu sắc, phong cách)",
            "grammarNote": "Thường nói: 特色菜 (món đặc sản của quán).",
            "exampleSentence": {
              "target": "烤鸭是这家百年老店最著名的特色菜。",
              "pronunciation": "Kǎoyā shì zhè jiā bǎinián lǎodiàn zuì zhùmíng de tèsè cài.",
              "meaningVi": "Vịt quay là món đặc sản trứ danh nhất của quán ăn trăm năm này."
            }
          },
          {
            "id": "zh_h3_8_3",
            "word": "新鲜",
            "pronunciation": "xīnxiān",
            "hanViet": "TÂN TIÊN",
            "partOfSpeech": "adj",
            "meaningVi": "Tươi mới (thực phẩm), tươi ngon",
            "radicals": "新 (Tân - mới) + 鲜 (Tiên - tươi sống: bộ Ngư 鱼 ghép với Dương 羊)",
            "grammarNote": "Trái nghĩa với 变质 (biànzhì - ôi thiu).",
            "exampleSentence": {
              "target": "海边餐厅的海鲜都是当天捕捞的，特别新鲜。",
              "pronunciation": "Hǎibiān cāntīng de hǎixiān dōu shì dàngtiān bǔlāo de, tèbié xīnxiān.",
              "meaningVi": "Hải sản của nhà hàng ven biển đều đánh bắt trong ngày, đặc biệt tươi ngon."
            }
          },
          {
            "id": "zh_h3_8_4",
            "word": "买单",
            "pronunciation": "mǎidān",
            "hanViet": "MÃI ĐƠN",
            "partOfSpeech": "verb",
            "meaningVi": "Thanh toán tiền bữa ăn",
            "radicals": "买 (Mãi - mua) + 单 (Đơn - hóa đơn)",
            "grammarNote": "Miền Bắc cũng hay dùng: 结账 (jiézhàng).",
            "exampleSentence": {
              "target": "吃完饭后他主动去前台买单。",
              "pronunciation": "Chī wán fàn hòu tā zhǔdòng qù qiántái mǎidān.",
              "meaningVi": "Ăn cơm xong anh ấy chủ động ra quầy thu ngân thanh toán tiền."
            }
          },
          {
            "id": "zh_h3_8_5",
            "word": "甜",
            "pronunciation": "tián",
            "hanViet": "ĐIỀM",
            "partOfSpeech": "adj",
            "meaningVi": "Ngọt ngào",
            "radicals": "Bộ Cam (甘 - ngọt) + 舌 (Thiệt - cái lưỡi nếm vị)",
            "grammarNote": "Bốn vị: 酸甜苦辣 (Chua ngọt đắng cay).",
            "exampleSentence": {
              "target": "南方菜偏甜，而四川菜偏辣。",
              "pronunciation": "Nánfāng cài piān tián, ér Sìchuān cài piān là.",
              "meaningVi": "Món miền Nam thiên về vị ngọt, trong khi món Tứ Xuyên thiên về vị cay."
            }
          },
          {
            "id": "zh_h3_8_6",
            "word": "筷子",
            "pronunciation": "kuàizi",
            "hanViet": "KHOÁI TỬ",
            "partOfSpeech": "noun",
            "meaningVi": "Đôi đũa",
            "radicals": "Bộ Trúc (竹 - làm bằng tre trúc) + 快 (Khoái)",
            "grammarNote": "Lượng từ dùng 双 (shuāng - đôi): 一双筷子.",
            "exampleSentence": {
              "target": "很多外国朋友学会用筷子吃饭都觉得很有成就感。",
              "pronunciation": "Hěn duō wàiguó péngyou xuéhuì yòng kuàizi chīfàn dōu juéde hěn yǒu chéngjiùgǎn.",
              "meaningVi": "Rất nhiều bạn nước ngoài khi học được cách dùng đũa ăn cơm đều cảm thấy rất tự hào."
            }
          },
          {
            "id": "zh_h3_8_7",
            "word": "尝",
            "pronunciation": "cháng",
            "hanViet": "THƯỜNG",
            "partOfSpeech": "verb",
            "meaningVi": "Nếm thử mùi vị",
            "radicals": "Bộ Thượng () + 旨 (Chỉ - hương vị ngon)",
            "grammarNote": "Thường lặp từ: 尝尝, 尝一下.",
            "exampleSentence": {
              "target": "你快来尝尝我刚刚炖好的牛肉汤。",
              "pronunciation": "Nǐ kuài lái chángchang wǒ gānggang dùn hǎo de niúròutāng.",
              "meaningVi": "Bạn mau qua nếm thử bát canh thịt bò tôi vừa hầm xong này."
            }
          },
          {
            "id": "zh_h3_8_8",
            "word": "饱",
            "pronunciation": "bǎo",
            "hanViet": "BÃO",
            "partOfSpeech": "adj",
            "meaningVi": "No bụng",
            "radicals": "Bộ Thực (饣- thức ăn) + 包 (Bao)",
            "grammarNote": "Trái nghĩa với 饿 (è - đói bụng). Ăn no: 吃饱了.",
            "exampleSentence": {
              "target": "今天菜太多了，我已经吃得非常饱了。",
              "pronunciation": "Jīntiān cài tài duō le, wǒ yǐjīng chī de fēicháng bǎo le.",
              "meaningVi": "Hôm nay nhiều món quá, tôi đã ăn cực kỳ no rồi."
            }
          }
        ]
      },
      {
        "id": "zh_hsk3_l9",
        "title": "Bài 9: Thể Thao, Rèn Luyện Thể Chất & Sức Khỏe",
        "grammarFocus": "Cấu trúc 又...又...: Vừa... lại vừa... (他又高又帅, 这件衣服又便宜又好看) & Phân biệt 刚 (phó từ) vs 刚才 (danh từ thời gian).",
        "vocabularies": [
          {
            "id": "zh_h3_9_1",
            "word": "锻炼",
            "pronunciation": "duànliàn",
            "hanViet": "ĐOÁN LUYỆN",
            "partOfSpeech": "verb",
            "meaningVi": "Rèn luyện, tập luyện thể thao",
            "radicals": "锻 (Đoán - rèn giũa kim loại) + 炼 (Luyện - luyện thép)",
            "grammarNote": "Thường đi với 锻炼身体 (rèn luyện thân thể).",
            "exampleSentence": {
              "target": "坚持锻炼身体能够增强免疫力。",
              "pronunciation": "Jiānchí duànliàn shēntǐ nénggòu zēngqiáng miǎnyìlì.",
              "meaningVi": "Kiên trì rèn luyện thân thể có thể nâng cao sức đề kháng."
            }
          },
          {
            "id": "zh_h3_9_2",
            "word": "跑步",
            "pronunciation": "pǎobù",
            "hanViet": "BÀO BỘ",
            "partOfSpeech": "verb",
            "meaningVi": "Chạy bộ",
            "radicals": "跑 (Bào - chạy) + 步 (Bộ - bước chân)",
            "grammarNote": "Từ ly hợp: 跑了一个小时的步.",
            "exampleSentence": {
              "target": "他每天傍晚都在公园的湖边跑步。",
              "pronunciation": "Tā měitiān bàngwǎn dōu zài gōngyuán de húbiān pǎobù.",
              "meaningVi": "Anh ấy mỗi ngày chập tối đều chạy bộ ven hồ trong công viên."
            }
          },
          {
            "id": "zh_h3_9_3",
            "word": "游泳",
            "pronunciation": "yóuyǒng",
            "hanViet": "DU VỊNH",
            "partOfSpeech": "verb",
            "meaningVi": "Bơi lội",
            "radicals": "游 (Du - bơi dạo) + 泳 (Vịnh - bộ Ba chấm thủy chỉ nước)",
            "grammarNote": "Địa điểm: 游泳池 (hồ bơi), 游泳馆 (cung thể thao dưới nước).",
            "exampleSentence": {
              "target": "夏天去游泳馆游泳既解暑又健身。",
              "pronunciation": "Xiàtiān qù yóuyǒngguǎn yóuyǒng jì jiěshǔ yòu jiànshēn.",
              "meaningVi": "Mùa hè đến hồ bơi bơi lội vừa giải nhiệt lại vừa rèn luyện sức khỏe."
            }
          },
          {
            "id": "zh_h3_9_4",
            "word": "比赛",
            "pronunciation": "bǐsài",
            "hanViet": "TỶ TÁI",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Cuộc thi đấu, tranh tài",
            "radicals": "比 (Tỷ - so sánh) + 赛 (Tái - đua tài, phần thưởng)",
            "grammarNote": "Lượng từ dùng 场 (chǎng): 一场精彩的足球比赛.",
            "exampleSentence": {
              "target": "中国乒乓球队在国际比赛中再次获得了冠军。",
              "pronunciation": "Zhōngguó pīngpāngqiú duì zài guójì bǐsài zhōng zàicì huòdé le guànjūn.",
              "meaningVi": "Đội tuyển bóng bàn Trung Quốc trong giải thi đấu quốc tế lại một lần nữa giành chức vô địch."
            }
          },
          {
            "id": "zh_h3_9_5",
            "word": "坚持",
            "pronunciation": "jiānchí",
            "hanViet": "KIÊN TRÌ",
            "partOfSpeech": "verb",
            "meaningVi": "Kiên trì, giữ vững",
            "radicals": "坚 (Kiên - vững chắc) + 持 (Trì - cầm giữ, duy trì)",
            "grammarNote": "Thành ngữ: 坚持不懈 (kiên trì không ngừng nghỉ).",
            "exampleSentence": {
              "target": "不管多么困难，只要坚持下去就一定会看到成效。",
              "pronunciation": "Bùguǎn duōme kùnnan, zhǐyào jiānchí xiàqu jiù yídìng huì kàndào chéngxiào.",
              "meaningVi": "Bất kể khó khăn đến đâu, chỉ cần kiên trì tiếp tục chắc chắn sẽ thấy được hiệu quả."
            }
          },
          {
            "id": "zh_h3_9_6",
            "word": "爬山",
            "pronunciation": "páshān",
            "hanViet": "BÀ SƠN",
            "partOfSpeech": "verb",
            "meaningVi": "Leo núi",
            "radicals": "爬 (Bà - bò, trèo) + 山 (Sơn - ngọn núi)",
            "grammarNote": "Từ ly hợp: 爬过三次山.",
            "exampleSentence": {
              "target": "周末呼吸新鲜空气最好的方式就是和朋友去爬山。",
              "pronunciation": "Zhōumò hūxī xīnxiān kōngqì zuì hǎo de fāngshì jiùshì hé péngyou qù páshān.",
              "meaningVi": "Cách tốt nhất để hít thở không khí trong lành vào cuối tuần là cùng bạn bè đi leo núi."
            }
          },
          {
            "id": "zh_h3_9_7",
            "word": "赢",
            "pronunciation": "yíng",
            "hanViet": "DOANH",
            "partOfSpeech": "verb",
            "meaningVi": "Thắng, chiến thắng",
            "radicals": "Gồm 5 chữ nhỏ: Vong 亡, Khẩu 口, Nguyệt 月, Bối 贝, Phàm 凡",
            "grammarNote": "Trái nghĩa với 输 (shū - thua).",
            "exampleSentence": {
              "target": "经过全队的共同努力，我们终于赢得了这场球赛。",
              "pronunciation": "Jīngguò quán duì de gòngtóng nǔlì, wǒmen zhōngyú yíngdé le zhè chǎng qiúsài.",
              "meaningVi": "Sau nỗ lực chung của toàn đội, chúng tôi cuối cùng đã chiến thắng trận bóng này."
            }
          },
          {
            "id": "zh_h3_9_8",
            "word": "习惯",
            "pronunciation": "xíguàn",
            "hanViet": "TẬP QUÁN",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Thói quen, quen với",
            "radicals": "习 (Tập - học tập, ôn luyện) + 惯 (Quán - tập tính thường xuyên)",
            "grammarNote": "Cấu trúc: 养成好习惯 (hình thành thói quen tốt).",
            "exampleSentence": {
              "target": "早睡早起是一个非常好的生活习惯。",
              "pronunciation": "Zǎoshuì zǎoqǐ shì yí ge fēicháng hǎo de shēnghuó xíguàn.",
              "meaningVi": "Ngủ sớm dậy sớm là một thói quen sinh hoạt rất tốt."
            }
          }
        ]
      },
      {
        "id": "zh_hsk3_l10",
        "title": "Bài 10: Đời Sống Đô Thị & Phương Tiện Giao Thông Công Cộng",
        "grammarFocus": "Cấu trúc tuần tự 先...再...然后...: Đầu tiên... tiếp theo... sau đó... (我们先乘地铁，再换乘公交车，然后走五分钟就到了).",
        "vocabularies": [
          {
            "id": "zh_h3_10_1",
            "word": "地铁",
            "pronunciation": "dìtiě",
            "hanViet": "ĐỊA THIẾT",
            "partOfSpeech": "noun",
            "meaningVi": "Tàu điện ngầm",
            "radicals": "地 (Địa - lòng đất) + 铁 (Thiết - đường ray sắt)",
            "grammarNote": "Tuyến tàu: 地铁一号线. Thẻ tàu: 地铁卡.",
            "exampleSentence": {
              "target": "在北京上下班高峰期坐地铁比开车快得多。",
              "pronunciation": "Zài Běijīng shàngxiàbān gāofēngqī zuò dìtiě bǐ kāichē kuài de duō.",
              "meaningVi": "Ở Bắc Kinh vào giờ cao điểm đi làm tan làm, đi tàu điện ngầm nhanh hơn lái xe rất nhiều."
            }
          },
          {
            "id": "zh_h3_10_2",
            "word": "换乘",
            "pronunciation": "huànchéng",
            "hanViet": "HOÁN THỪA",
            "partOfSpeech": "verb",
            "meaningVi": "Đổi chuyến, chuyển tuyến tàu/xe",
            "radicals": "换 (Hoán - đổi qua) + 乘 (Thừa - đi xe, đi tàu)",
            "grammarNote": "Nhà ga trung chuyển: 换乘站.",
            "exampleSentence": {
              "target": "在下一站你可以直接换乘十号线前往机场。",
              "pronunciation": "Zài xià yí zhàn nǐ kěyǐ zhíjiē huànchéng shí hào xiàn qiánwǎng jīchǎng.",
              "meaningVi": "Ở ga kế tiếp bạn có thể chuyển trực tiếp sang tuyến số 10 để đi ra sân bay."
            }
          },
          {
            "id": "zh_h3_10_3",
            "word": "扫码",
            "pronunciation": "sǎomǎ",
            "hanViet": "TẢO MÃ",
            "partOfSpeech": "verb",
            "meaningVi": "Quét mã QR",
            "radicals": "扫 (Tảo - quét qua) + 码 (Mã - mã QR/Barcode)",
            "grammarNote": "Thanh toán quét mã: 扫码支付.",
            "exampleSentence": {
              "target": "现在乘坐公交和地铁只需要打开手机扫码即可。",
              "pronunciation": "Xiànzài chéngzuò gōngjiāo hé dìtiě zhǐ xūyào dǎkāi shǒujī sǎomǎ jíkě.",
              "meaningVi": "Bây giờ đi xe buýt và tàu điện ngầm chỉ cần mở điện thoại quét mã là xong."
            }
          },
          {
            "id": "zh_h3_10_4",
            "word": "共享单车",
            "pronunciation": "gòngxiǎng dānchē",
            "hanViet": "CỘNG HƯỞNG ĐƠN XA",
            "partOfSpeech": "noun",
            "meaningVi": "Xe đạp công cộng chia sẻ",
            "radicals": "共享 (Chia sẻ cùng nhau) + 单车 (Xe đạp)",
            "grammarNote": "Động từ: 骑共享单车 (đạp xe chia sẻ).",
            "exampleSentence": {
              "target": "出了地铁站，骑共享单车五分钟就能到公司。",
              "pronunciation": "Chū le dìtiězhàn, qí gòngxiǎng dānchē wǔ fēnzhōng jiù néng dào gōngsī.",
              "meaningVi": "Ra khỏi ga tàu điện ngầm, đạp xe đạp chia sẻ 5 phút là tới được công ty."
            }
          },
          {
            "id": "zh_h3_10_5",
            "word": "堵车",
            "pronunciation": "dǔchē",
            "hanViet": "ĐỔ XA",
            "partOfSpeech": "verb",
            "meaningVi": "Tắc đường, kẹt xe",
            "radicals": "堵 (Đổ - ngăn chặn, tắc nghẽn) + 车 (Xe)",
            "grammarNote": "Tránh kẹt xe: 避开堵车.",
            "exampleSentence": {
              "target": "雨天路滑，市中心的主干道又开始严重堵车了。",
              "pronunciation": "Yǔtiān lù huá, shìzhōngxīn de zhǔgàndào yòu kāishǐ yánzhòng dǔchē le.",
              "meaningVi": "Trời mưa đường trơn, trục đường chính ở trung tâm thành phố lại bắt đầu kẹt xe nghiêm trọng rồi."
            }
          },
          {
            "id": "zh_h3_10_6",
            "word": "方便",
            "pronunciation": "fāngbiàn",
            "hanViet": "PHƯƠNG TIỆN",
            "partOfSpeech": "adj",
            "meaningVi": "Thuận tiện, tiện lợi",
            "radicals": "方 (Phương - định hướng) + 便 (Tiện - tiện nghi)",
            "grammarNote": "Trái nghĩa với 不便 (bùbiàn - bất tiện).",
            "exampleSentence": {
              "target": "中国移动支付的发展让人们的生活变得极为方便。",
              "pronunciation": "Zhōngguó yídòng zhīfèi de fāzhǎn ràng rénmen de shēnghuó biàn de jíwéi fāngbiàn.",
              "meaningVi": "Sự phát triển của thanh toán di động Trung Quốc làm cho cuộc sống người dân trở nên vô cùng thuận tiện."
            }
          },
          {
            "id": "zh_h3_10_7",
            "word": "马路",
            "pronunciation": "mǎlù",
            "hanViet": "MÃ LỘ",
            "partOfSpeech": "noun",
            "meaningVi": "Đường lớn, lòng đường",
            "radicals": "马 (Mã - ngựa thời xưa kéo xe) + 路 (Lộ - con đường)",
            "grammarNote": "Qua đường: 过马路.",
            "exampleSentence": {
              "target": "过马路时一定要注意看红绿灯，走斑马线。",
              "pronunciation": "Guò mǎlù shí yídìng yào zhùyì kàn hónglǜdēng, zǒu bānmǎxiàn.",
              "meaningVi": "Khi băng qua đường nhất định phải chú ý nhìn đèn giao thông, đi trên vạch kẻ đường cho người đi bộ."
            }
          },
          {
            "id": "zh_h3_10_8",
            "word": "方向",
            "pronunciation": "fāngxiàng",
            "hanViet": "PHƯƠNG HƯỚNG",
            "partOfSpeech": "noun",
            "meaningVi": "Phương hướng, chiều hướng",
            "radicals": "方 (Phương - phía) + 向 (Hướng - nhìn về)",
            "grammarNote": "Mất phương hướng: 迷失方向.",
            "exampleSentence": {
              "target": "别慌，我们顺着这个方向一直往前走就能看到商业街。",
              "pronunciation": "Bié huāng, wǒmen shùnzhe zhè ge fāngxiàng yìzhí wǎng qián zǒu jiù néng kàndào shāngyèjiē.",
              "meaningVi": "Đừng hoảng, chúng ta đi men theo hướng này thẳng về phía trước là sẽ nhìn thấy phố thương mại."
            }
          }
        ]
      }
    ]
  },
  "zh_hsk4": {
    "levelId": "zh_hsk4",
    "code": "HSK 4",
    "title": "HSK 4 - Trung Cấp 2: Thương Mại Điện Tử, Xã Hội & Thành Ngữ Tứ Tự",
    "lessons": [
      {
        "id": "zh_hsk4_l1",
        "title": "Bài 1: Thương Mại Điện Tử & Livestream Bán Hàng",
        "grammarFocus": "Liên từ phức hợp 不仅...而且...: Không những... mà còn... (这家网店不仅发货速度极快，而且售后服务非常完善).",
        "vocabularies": [
          {
            "id": "zh_h4_1_1",
            "word": "电商",
            "pronunciation": "diànshāng",
            "hanViet": "ĐIỆN THƯƠNG",
            "partOfSpeech": "noun",
            "meaningVi": "Thương mại điện tử (viết tắt của 电子商务)",
            "radicals": "电 (Điện) + 商 (Thương - buôn bán)",
            "grammarNote": "Thường nói: 跨境电商 (thương mại điện tử xuyên biên giới).",
            "exampleSentence": {
              "target": "如今电商平台已经深刻改变了传统零售业的格局。",
              "pronunciation": "Rújīn diànshāng píngtái yǐjīng shēnkè gǎibiàn le chuántǒng língshòuyè de géjú.",
              "meaningVi": "Ngày nay các nền tảng thương mại điện tử đã thay đổi sâu sắc cục diện của ngành bán lẻ truyền thống."
            }
          },
          {
            "id": "zh_h4_1_2",
            "word": "直播",
            "pronunciation": "zhíbō",
            "hanViet": "TRỰC BÁ / TRỰC BÔI",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Phát trực tiếp, livestream",
            "radicals": "直 (Trực - trực tiếp) + 播 (Bá - truyền phát sóng)",
            "grammarNote": "Livestream bán hàng: 直播带货. Phòng livestream: 直播间.",
            "exampleSentence": {
              "target": "主播在直播间里热情地向观众介绍新产品的优惠活动。",
              "pronunciation": "Zhǔbō zài zhíbōjiān lǐ rèqíng de xiàng guānzhòng jièshào xīn chǎnpǐn de yōuhuì huódòng.",
              "meaningVi": "Streamer trong phòng livestream nhiệt tình giới thiệu với khán giả hoạt động ưu đãi của sản phẩm mới."
            }
          },
          {
            "id": "zh_h4_1_3",
            "word": "下单",
            "pronunciation": "xiàdān",
            "hanViet": "HẠ ĐƠN",
            "partOfSpeech": "verb",
            "meaningVi": "Đặt đơn hàng, chốt đơn",
            "radicals": "下 (Hạ - hạ lệnh, gửi đi) + 单 (Đơn - đơn hàng)",
            "grammarNote": "Thường đi với 立即下单 (đặt mua ngay lập tức).",
            "exampleSentence": {
              "target": "在活动开始的前十分钟内，超过十万名用户完成了下单。",
              "pronunciation": "Zài huódòng kāishǐ de qián shí fēnzhōng nèi, chāoguò shí wàn míng yònghù wánchéng le xiàdān.",
              "meaningVi": "Trong 10 phút đầu khi sự kiện bắt đầu, hơn 100.000 người dùng đã hoàn tất việc đặt đơn hàng."
            }
          },
          {
            "id": "zh_h4_1_4",
            "word": "快递",
            "pronunciation": "kuàidì",
            "hanViet": "KHOÁI ĐỆ",
            "partOfSpeech": "noun",
            "meaningVi": "Chuyển phát nhanh, kiện hàng chuyển phát",
            "radicals": "快 (Khoái - nhanh chóng) + 递 (Đệ - trao tận tay)",
            "grammarNote": "Nhân viên giao hàng: 快递员. Nhận bưu kiện: 收快递.",
            "exampleSentence": {
              "target": "不仅运费全免，而且同城快递三小时内就能送达。",
              "pronunciation": "Bùjǐn yùnfèi quán miǎn, érqiě tóngchéng kuàidì sān xiǎoshí nèi jiù néng sòngdá.",
              "meaningVi": "Không những miễn phí toàn bộ vận chuyển, mà chuyển phát nội thành trong 3 giờ là giao tới."
            }
          },
          {
            "id": "zh_h4_1_5",
            "word": "退款",
            "pronunciation": "tuìkuǎn",
            "hanViet": "THỐI KHOẢN",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Hoàn tiền, trả lại tiền mua hàng",
            "radicals": "退 (Thối - lùi lại, trả lại) + 款 (Khoản - tiền bạc)",
            "grammarNote": "Chính sách: 七天无理由退货退款 (7 ngày đổi trả hoàn tiền không cần lý do).",
            "exampleSentence": {
              "target": "如果收到商品后发现质量问题，可以随时申请全额退款。",
              "pronunciation": "Rúguǒ shōudào shāngpǐn hòu fāxiàn zhìliàng wèntí, kěyǐ suíshí shēnqǐng quán'é tuìkuǎn.",
              "meaningVi": "Nếu sau khi nhận hàng phát hiện vấn đề chất lượng, có thể nộp đơn xin hoàn lại toàn bộ tiền bất cứ lúc nào."
            }
          },
          {
            "id": "zh_h4_1_6",
            "word": "销量",
            "pronunciation": "xiàoliàng",
            "hanViet": "TIÊU LƯỢNG",
            "partOfSpeech": "noun",
            "meaningVi": "Doanh số bán ra, lượng tiêu thụ",
            "radicals": "销 (Tiêu - bán buôn, tiêu thụ) + 量 (Lượng - số lượng)",
            "grammarNote": "Đứng đầu doanh số: 销量第一.",
            "exampleSentence": {
              "target": "这款护肤品凭借优秀的口碑在各大网店销量领先。",
              "pronunciation": "Zhè kuǎn hùfūpǐn píngjiè yōuxiù de kǒubēi zài gè dà wǎngdiàn xiàoliàng lǐngxiān.",
              "meaningVi": "Dòng sản phẩm dưỡng da này nhờ danh tiếng xuất sắc nên dẫn đầu doanh số trên các trang bán hàng lớn."
            }
          },
          {
            "id": "zh_h4_1_7",
            "word": "折扣",
            "pronunciation": "zhékòu",
            "hanViet": "CHIẾT KHẤU",
            "partOfSpeech": "noun",
            "meaningVi": "Mức chiết khấu, giảm giá",
            "radicals": "折 (Chiết - gập lại, chiết giảm) + 扣 (Khấu - khấu trừ)",
            "grammarNote": "Cách tính giảm giá tiếng Trung: 打八折 (giảm 20%, bán 80% giá gốc), 打五折 (giảm 50%).",
            "exampleSentence": {
              "target": "年中大促销期间很多品牌都给出了前所未有的超低折扣。",
              "pronunciation": "Niánzhōng dà cùxiāo qījiān hěn duō pǐnpái dōu gěichū le qiánsuǒwèiyǒu de chāodī zhékòu.",
              "meaningVi": "Trong đợt đại khuyến mãi giữa năm rất nhiều thương hiệu đã đưa ra mức giảm giá cực thấp chưa từng có."
            }
          },
          {
            "id": "zh_h4_1_8",
            "word": "评价",
            "pronunciation": "píngjià",
            "hanViet": "BÌNH GIÁ",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Đánh giá, nhận xét từ người dùng",
            "radicals": "评 (Bình - phê bình, nhận xét) + 价 (Giá - giá trị)",
            "grammarNote": "Đánh giá 5 sao: 五星好评. Nhận xét tiêu cực: 差评.",
            "exampleSentence": {
              "target": "消费者在网上购物时通常会先参考以往买家的真实评价。",
              "pronunciation": "Xiāofèizhě zài wǎngshang gòuwù shí tōngcháng huì xiān cānkǎo yǐwǎng mǎijiā de zhēnshí píngjià.",
              "meaningVi": "Người tiêu dùng khi mua sắm trên mạng thông thường sẽ tham khảo trước đánh giá chân thực của các khách mua trước."
            }
          }
        ]
      },
      {
        "id": "zh_hsk4_l2",
        "title": "Bài 2: Phỏng Vấn Xin Việc, Tuyển Dụng & Thử Việc",
        "grammarFocus": "Liên từ 无论...都...: Bất kể... đều... (无论遇到什么难题，他都能冷静应对).",
        "vocabularies": [
          {
            "id": "zh_h4_2_1",
            "word": "简历",
            "pronunciation": "jiǎnlì",
            "hanViet": "GIẢN LỊCH",
            "partOfSpeech": "noun",
            "meaningVi": "Sơ yếu lý lịch, CV xin việc",
            "radicals": "简 (Giản - ngắn gọn, thẻ tre) + 历 (Lịch - quá trình trải qua)",
            "grammarNote": "Nộp CV: 投递简历. Sàng lọc CV: 筛选简历. Lượng từ dùng 份 (fèn).",
            "exampleSentence": {
              "target": "他在简历中详细列出了过往的成功项目经验。",
              "pronunciation": "Tā zài jiǎnlì zhōng xiángxì lièchū le guòwǎng de chénggōng xiàngmù jīngyàn.",
              "meaningVi": "Anh ấy đã liệt kê chi tiết trong CV những kinh nghiệm dự án thành công trong quá khứ."
            }
          },
          {
            "id": "zh_h4_2_2",
            "word": "面试",
            "pronunciation": "miànshì",
            "hanViet": "DIỆN THÍ",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Phỏng vấn trực tiếp",
            "radicals": "面 (Diện - khuôn mặt, đối diện) + 试 (Thí - thi cử, kiểm tra)",
            "grammarNote": "Người phỏng vấn: 面试官 (HR/interviewer).",
            "exampleSentence": {
              "target": "无论面对多么严格的面试官，他都能从容自信地回答问题。",
              "pronunciation": "Wúlùn miànduì duōme yángé de miànshìguān, tā dōu néng cóngróng zìxìn de huídá wèntí.",
              "meaningVi": "Bất kể đối mặt với người phỏng vấn nghiêm khắc đến đâu, anh ấy đều có thể ung dung tự tin trả lời câu hỏi."
            }
          },
          {
            "id": "zh_h4_2_3",
            "word": "薪资",
            "pronunciation": "xīnzī",
            "hanViet": "TÂN TƯ",
            "partOfSpeech": "noun",
            "meaningVi": "Tiền lương và đãi ngộ (viết tắt của 薪水与资金)",
            "radicals": "薪 (Tân - củi lửa, lương bổng) + 资 (Tư - tư bản, tài chính)",
            "grammarNote": "Thương lượng mức lương: 薪资谈判. Đãi ngộ phúc lợi: 薪资待遇.",
            "exampleSentence": {
              "target": "这家跨国企业提供的薪资待遇在行业内具有很强的竞争力。",
              "pronunciation": "Zhè jiā kuàguó qǐyè tígōng de xīnzī dàiyù zài hángyè nèi jùyǒu hěn qiáng de jìngzhēnglì.",
              "meaningVi": "Mức đãi ngộ tiền lương mà doanh nghiệp đa quốc gia này đưa ra có tính cạnh tranh rất cao trong ngành."
            }
          },
          {
            "id": "zh_h4_2_4",
            "word": "录取",
            "pronunciation": "lùqǔ",
            "hanViet": "LỤC THỦ",
            "partOfSpeech": "verb",
            "meaningVi": "Trúng tuyển, tiếp nhận vào làm/học",
            "radicals": "录 (Lục - ghi tên vào danh sách) + 取 (Thủ - lấy, nhận)",
            "grammarNote": "Giấy báo trúng tuyển: 录取通知书.",
            "exampleSentence": {
              "target": "经过三轮激烈选拔，他终于收到了这家科技大厂的正式录取通知。",
              "pronunciation": "Jīngguò sān lún jīliè xuǎnbá, tā zhōngyú shōudào le zhè jiā kējì dàchǎng de zhèngshì lùqǔ tōngzhī.",
              "meaningVi": "Trải qua ba vòng tuyển chọn gay cấn, anh ấy cuối cùng đã nhận được thông báo trúng tuyển chính thức của tập đoàn công nghệ lớn này."
            }
          },
          {
            "id": "zh_h4_2_5",
            "word": "试用期",
            "pronunciation": "shìyòngqī",
            "hanViet": "THÍ DỤNG KỲ",
            "partOfSpeech": "noun",
            "meaningVi": "Thời gian thử việc",
            "radicals": "试用 (Thử việc) + 期 (Kỳ - kỳ hạn)",
            "grammarNote": "Vượt qua thử việc: 通过试用期 (chuyển chính thức 转正).",
            "exampleSentence": {
              "target": "根据劳动法规定，试用期内的工资不得低于正式工资的百分之八十。",
              "pronunciation": "Gēnjù láodòngfǎ guīdìng, shìyòngqī nèi de gōngzī bùdé dǐyú zhèngshì gōngzī de bǎifēnzhī bāshí.",
              "meaningVi": "Căn cứ theo quy định của luật lao động, lương trong thời gian thử việc không được thấp hơn 80% lương chính thức."
            }
          },
          {
            "id": "zh_h4_2_6",
            "word": "优势",
            "pronunciation": "yōushì",
            "hanViet": "ƯU THẾ",
            "partOfSpeech": "noun",
            "meaningVi": "Ưu thế, thế mạnh vượt trội",
            "radicals": "优 (Ưu - tốt đẹp, ưu tú) + 势 (Thế - cục diện, sức mạnh)",
            "grammarNote": "Trái nghĩa với 劣势 (lièshì - thế yếu).",
            "exampleSentence": {
              "target": "精通两门外语是他应聘国际业务经理岗位的最大优势。",
              "pronunciation": "Jīngtōng liǎng mén wàiyǔ shì tā yìngpìn guójì yèwù jīnglǐ gǎngwèi de zuì dà yōushì.",
              "meaningVi": "Thành thạo hai ngoại ngữ là ưu thế lớn nhất của anh ấy khi ứng tuyển vị trí giám đốc kinh doanh quốc tế."
            }
          },
          {
            "id": "zh_h4_2_7",
            "word": "应聘",
            "pronunciation": "yìngpìn",
            "hanViet": "ỨNG SÍNH",
            "partOfSpeech": "verb",
            "meaningVi": "Ứng tuyển công việc",
            "radicals": "应 (Ứng - tiếp ứng) + 聘 (Sính - mời làm việc, tuyển dụng)",
            "grammarNote": "Người ứng tuyển: 应聘者. Nhà tuyển dụng: 招聘方.",
            "exampleSentence": {
              "target": "今天前来应聘研发工程师的人才络绎不绝。",
              "pronunciation": "Jīntiān qiánlái yìngpìn yánfā gōngchéngshī de réncái luòyìbùjué.",
              "meaningVi": "Hôm nay các nhân tài đến ứng tuyển kỹ sư nghiên cứu và phát triển nhiều không ngớt."
            }
          },
          {
            "id": "zh_h4_2_8",
            "word": "能力",
            "pronunciation": "nénglì",
            "hanViet": "NĂNG LỰC",
            "partOfSpeech": "noun",
            "meaningVi": "Năng lực, khả năng thực chiến",
            "radicals": "能 (Năng - tài năng) + 力 (Lực - sức mạnh)",
            "grammarNote": "Năng lực giao tiếp: 沟通能力. Năng lực giải quyết vấn đề: 解决问题的能力.",
            "exampleSentence": {
              "target": "企业不仅看重毕业院校，更注重候选人的综合解决问题能力。",
              "pronunciation": "Qǐyè bùjǐn kànzhòng bìyè yuànxiào, gèng zhùzhòng hòuxuǎnrén de zōnghé jiějué wèntí nénglì.",
              "meaningVi": "Doanh nghiệp không chỉ coi trọng trường tốt nghiệp mà còn chú trọng hơn đến năng lực giải quyết vấn đề tổng hợp của ứng viên."
            }
          }
        ]
      },
      {
        "id": "zh_hsk4_l3",
        "title": "Bài 3: Quản Lý Cảm Xúc & Tâm Lý Học Ứng Dụng",
        "grammarFocus": "Liên từ 既然...就...: Đã... thì... (既然已经做出了选择，就不要再后悔).",
        "vocabularies": [
          {
            "id": "zh_h4_3_1",
            "word": "情绪",
            "pronunciation": "qíngxù",
            "hanViet": "TÌNH TỰ",
            "partOfSpeech": "noun",
            "meaningVi": "Tâm trạng, cảm xúc",
            "radicals": "情 (Tình - tình cảm) + 绪 (Tự - manh mối đầu mối)",
            "grammarNote": "Quản lý cảm xúc: 情绪管理. Cảm xúc tiêu cực: 负面情绪.",
            "exampleSentence": {
              "target": "一个成熟的人应该学会控制自己的情绪，而不是被情绪左右。",
              "pronunciation": "Yí ge chéngshú de rén yīnggāi xuéhuì kòngzhì zìjǐ de qíngxù, ér bú shì bèi qíngxù zuǒyòu.",
              "meaningVi": "Một người trưởng thành nên học cách kiểm soát cảm xúc của bản thân, chứ không phải bị cảm xúc chi phối."
            }
          },
          {
            "id": "zh_h4_3_2",
            "word": "压力",
            "pronunciation": "yālì",
            "hanViet": "ÁP LỰC",
            "partOfSpeech": "noun",
            "meaningVi": "Áp lực, căng thẳng",
            "radicals": "压 (Áp - đè nén) + 力 (Lực - sức ép)",
            "grammarNote": "Giải tỏa áp lực: 缓解压力, 减压. Chịu áp lực lớn: 承受巨大压力.",
            "exampleSentence": {
              "target": "听轻音乐和适度运动是缓解工作压力的好方法。",
              "pronunciation": "Tīng qīngyīnyuè hé shìdù yùndòng shì huǎnjiě gōngzuò yālì de hǎo fāngfǎ.",
              "meaningVi": "Nghe nhạc nhẹ và vận động vừa phải là phương pháp tốt để giải tỏa áp lực công việc."
            }
          },
          {
            "id": "zh_h4_3_3",
            "word": "冷静",
            "pronunciation": "lěngjìng",
            "hanViet": "LÃNH TĨNH",
            "partOfSpeech": "adj/verb",
            "meaningVi": "Bình tĩnh, điềm đạm",
            "radicals": "冷 (Lãnh - lạnh lùng) + 静 (Tĩnh - yên tĩnh, tĩnh tâm)",
            "grammarNote": "Khuyên nhủ: 请保持冷静 (xin hãy giữ bình tĩnh).",
            "exampleSentence": {
              "target": "遇到突发紧急情况时，最重要的是保持头脑冷静。",
              "pronunciation": "Yùdào tūfā jǐnjí qíngkuàng shí, zuì zhòngyào de shì bǎochí tóunǎo lěngjìng.",
              "meaningVi": "Khi gặp tình huống khẩn cấp đột xuất, điều quan trọng nhất là giữ cho đầu óc bình tĩnh."
            }
          },
          {
            "id": "zh_h4_3_4",
            "word": "沟通",
            "pronunciation": "gōutōng",
            "hanViet": "CÂU THÔNG",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Giao tiếp, trao đổi thấu hiểu",
            "radicals": "沟 (Câu - mương nước, kết nối đôi bờ) + 通 (Thông - thông suốt)",
            "grammarNote": "Thường nói: 善于沟通 (giỏi giao tiếp), 缺乏沟通 (thiếu giao tiếp).",
            "exampleSentence": {
              "target": "人与人之间的误会往往是因为缺乏及时的沟通而产生的。",
              "pronunciation": "Rén yǔ rén zhījiān de wùhuì wǎngwǎng shì yīnwèi quēfá jíshí de gōutōng ér chǎnshēng de.",
              "meaningVi": "Hiểu lầm giữa người với người thường nảy sinh do thiếu đi sự giao tiếp kịp thời."
            }
          },
          {
            "id": "zh_h4_3_5",
            "word": "态度",
            "pronunciation": "tàidu",
            "hanViet": "THÁI ĐỘ",
            "partOfSpeech": "noun",
            "meaningVi": "Thái độ sống, cách ứng xử",
            "radicals": "态 (Thái - tâm thái) + 度 (Độ - mức độ, phong thái)",
            "grammarNote": "Thành ngữ: 态度决定一切 (Thái độ quyết định tất cả).",
            "exampleSentence": {
              "target": "积极乐观的生活态度能帮助我们度过人生的低谷。",
              "pronunciation": "Jījí lèguān de shēnghuó tàidu néng bāngzhù wǒmen dùguò rénshēng de dīgǔ.",
              "meaningVi": "Thái độ sống tích cực lạc quan có thể giúp chúng ta vượt qua những nốt trầm của cuộc đời."
            }
          },
          {
            "id": "zh_h4_3_6",
            "word": "尊重",
            "pronunciation": "zūnzhòng",
            "hanViet": "TÔN TRỌNG",
            "partOfSpeech": "verb",
            "meaningVi": "Tôn trọng, kính trọng",
            "radicals": "尊 (Tôn - tôn sùng) + 重 (Trọng - coi trọng)",
            "grammarNote": "Cấu trúc: 互相尊重 (tôn trọng lẫn nhau).",
            "exampleSentence": {
              "target": "只有懂得尊重他人的人，才能获得别人发自内心的尊重。",
              "pronunciation": "Zhǐyǒu dǒngde zūnzhòng tārén de rén, cái néng huòdé biérén fā zì nèixīn de zūnzhòng.",
              "meaningVi": "Chỉ có người biết tôn trọng người khác mới có thể nhận lại sự tôn trọng xuất phát từ tận đáy lòng của người khác."
            }
          },
          {
            "id": "zh_h4_3_7",
            "word": "同情",
            "pronunciation": "tóngqíng",
            "hanViet": "ĐỒNG TÌNH",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Đồng cảm, thương cảm",
            "radicals": "同 (Đồng - cùng chung) + 情 (Tình - cảm xúc)",
            "grammarNote": "Đồng cảm sâu sắc: 同情心.",
            "exampleSentence": {
              "target": "我们不仅要对处于困境中的人抱有同情，更要伸出援助之手。",
              "pronunciation": "Wǒmen bùjǐn yào duì chǔyú kùnjìng zhōng de rén bàoyǒu tóngqíng, gèng yào shēnchū yuánzhù zhī shǒu.",
              "meaningVi": "Chúng ta không chỉ phải có lòng trắc ẩn với những người trong nghịch cảnh, mà hơn nữa cần chìa tay ra giúp đỡ."
            }
          },
          {
            "id": "zh_h4_3_8",
            "word": "烦恼",
            "pronunciation": "fánnǎo",
            "hanViet": "PHIỀN NÃO",
            "partOfSpeech": "noun/adj",
            "meaningVi": "Phiền muộn, ưu phiền",
            "radicals": "烦 (Phiền - nóng nảy khó chịu) + 恼 (Não - bực tức bồn chồn)",
            "grammarNote": "Xua tan phiền não: 消除烦恼.",
            "exampleSentence": {
              "target": "既然事情已经过去了，就不要再自寻烦恼了。",
              "pronunciation": "Jìrán shìqing yǐjīng guòqu le, jiù bú yào zài zìxún fánnǎo le.",
              "meaningVi": "Một khi sự việc đã qua đi rồi thì đừng tự chuốc lấy phiền não nữa."
            }
          }
        ]
      },
      {
        "id": "zh_hsk4_l4",
        "title": "Bài 4: Khoa Học Kỹ Thuật & Internet Vạn Vật",
        "grammarFocus": "Liên từ 哪怕...也...: Cho dù/Dẫu rằng... cũng... (哪怕遇到再多挫折，科学家也不会放弃探索).",
        "vocabularies": [
          {
            "id": "zh_h4_4_1",
            "word": "人工智能",
            "pronunciation": "réngōng zhìnéng",
            "hanViet": "NHÂN CÔNG TRÍ NĂNG",
            "partOfSpeech": "noun",
            "meaningVi": "Trí tuệ nhân tạo (AI)",
            "radicals": "人工 (Nhân tạo) + 智能 (Thông minh, trí năng)",
            "grammarNote": "Kỷ nguyên AI: 人工智能时代.",
            "exampleSentence": {
              "target": "人工智能技术的发展正在重塑医疗、教育和交通等各个行业。",
              "pronunciation": "Réngōng zhìnéng jìshù de fāzhǎn zhèngzài chóngsù yīliáo, jiàoyù hé jiāotōng děng gè ge hángyè.",
              "meaningVi": "Sự phát triển của công nghệ trí tuệ nhân tạo đang tái định hình các ngành như y tế, giáo dục và giao thông."
            }
          },
          {
            "id": "zh_h4_4_2",
            "word": "算法",
            "pronunciation": "suànfǎ",
            "hanViet": "TOÁN PHÁP",
            "partOfSpeech": "noun",
            "meaningVi": "Thuật toán máy tính",
            "radicals": "算 (Toán - tính toán) + 法 (Pháp - phương pháp, quy luật)",
            "grammarNote": "Đề xuất thuật toán: 算法推荐.",
            "exampleSentence": {
              "target": "短视频平台通过高效的算法向用户推荐他们感兴趣的内容。",
              "pronunciation": "Duǎn shìpín píngtái tōngguò gāoxiào de suànfǎ xiàng yònghù tuījiàn tāmen gǎn xìngqù de nèiróng.",
              "meaningVi": "Nền tảng video ngắn thông qua thuật toán hiệu quả cao để đề xuất nội dung người dùng quan tâm."
            }
          },
          {
            "id": "zh_h4_4_3",
            "word": "数据",
            "pronunciation": "shùjù",
            "hanViet": "SỐ CỨ",
            "partOfSpeech": "noun",
            "meaningVi": "Dữ liệu số liệu",
            "radicals": "数 (Số - con số) + 据 (Cứ - căn cứ)",
            "grammarNote": "Dữ liệu lớn: 大数据 (Big Data).",
            "exampleSentence": {
              "target": "通过分析海量用户数据，公司能够更加精准地预测市场趋势。",
              "pronunciation": "Tōngguò fēnxī hǎiliàng yònghù shùjù, gōngsī nénggòu gèngjiā jīngzhǔn de yùcè shìchǎng qūshì.",
              "meaningVi": "Thông qua phân tích dữ liệu người dùng khổng lồ, công ty có thể dự đoán xu hướng thị trường chuẩn xác hơn."
            }
          },
          {
            "id": "zh_h4_4_4",
            "word": "网络",
            "pronunciation": "wǎngluò",
            "hanViet": "VÕNG LẠC",
            "partOfSpeech": "noun",
            "meaningVi": "Mạng lưới, Internet",
            "radicals": "网 (Võng - tấm lưới) + 络 (Lạc - dây nối, liên kết)",
            "grammarNote": "An ninh mạng: 网络安全. Ngôn ngữ mạng: 网络用语.",
            "exampleSentence": {
              "target": "高速网络让跨国远程办公和视频会议变得无比顺畅。",
              "pronunciation": "Gāosù wǎngluò ràng kuàguó yuǎnchéng bàngōng hé shìpín huìyì biàn de wúbǐ shùnchàng.",
              "meaningVi": "Mạng internet tốc độ cao làm cho làm việc từ xa xuyên quốc gia và họp video trở nên vô cùng mượt mà."
            }
          },
          {
            "id": "zh_h4_4_5",
            "word": "发明",
            "pronunciation": "fāmíng",
            "hanViet": "PHÁT MINH",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Phát minh, sáng chế",
            "radicals": "发 (Phát - tạo ra) + 明 (Minh - sáng tỏ, đem lại ánh sáng)",
            "grammarNote": "Tứ đại phát minh cổ đại: 四大发明 (La bàn, Thuốc súng, Giấy, Kỹ thuật in).",
            "exampleSentence": {
              "target": "智能手机的发明彻底改变了人类获取信息和社交的方式。",
              "pronunciation": "Zhìnéng shǒujī de fāmíng chèdǐ gǎibiàn le rénlèi huòqǔ xìnxī hé shèjiāo de fāngshì.",
              "meaningVi": "Phát minh điện thoại thông minh đã thay đổi triệt để phương thức tiếp nhận thông tin và giao tiếp của nhân loại."
            }
          },
          {
            "id": "zh_h4_4_6",
            "word": "安全",
            "pronunciation": "ānquán",
            "hanViet": "AN TOÀN",
            "partOfSpeech": "adj/noun",
            "meaningVi": "An toàn, bảo mật",
            "radicals": "安 (An - bình an) + 全 (Toàn - vẹn toàn)",
            "grammarNote": "Trái nghĩa với 危险 (wēixiǎn - nguy hiểm). Cụm từ: 注意安全.",
            "exampleSentence": {
              "target": "哪怕系统再先进，保护用户隐私和信息安全也是第一位的。",
              "pronunciation": "Nǎpà xìtǒng zài xiānjìn, bǎohù yònghù yǐnsī hé xìnxī ānquán yě shì dì-yī wèi de.",
              "meaningVi": "Cho dù hệ thống có tiên tiến đến đâu, việc bảo vệ quyền riêng tư và an toàn thông tin của người dùng cũng là vị trí hàng đầu."
            }
          },
          {
            "id": "zh_h4_4_7",
            "word": "硬件",
            "pronunciation": "yìngjiàn",
            "hanViet": "NGẠNH KIỆN",
            "partOfSpeech": "noun",
            "meaningVi": "Phần cứng máy tính/thiết bị",
            "radicals": "硬 (Ngạnh - cứng rắn) + 件 (Kiện - linh kiện)",
            "grammarNote": "Trái nghĩa với 软件 (ruǎnjiàn - phần mềm).",
            "exampleSentence": {
              "target": "芯片是计算机硬件中最核心的技术部件。",
              "pronunciation": "Xīnpiàn shì jìsuànjī yìngjiàn zhōng zuì héxīn de jìshù bùjiàn.",
              "meaningVi": "Con chip là bộ phận kỹ thuật cốt lõi nhất trong phần cứng máy tính."
            }
          },
          {
            "id": "zh_h4_4_8",
            "word": "升级",
            "pronunciation": "shēngjí",
            "hanViet": "THĂNG CẤP",
            "partOfSpeech": "verb",
            "meaningVi": "Nâng cấp phần mềm/hệ thống",
            "radicals": "升 (Thăng - bay lên, nâng cao) + 级 (Cấp - đẳng cấp)",
            "grammarNote": "Nâng cấp hệ thống: 系统升级. Nâng cấp thiết bị: 设备升级.",
            "exampleSentence": {
              "target": "完成软件升级后，应用程序的运行速度提升了将近百分之三十。",
              "pronunciation": "Wánchéng ruǎnjiàn shēngjí hòu, yìngyòng chéngxù de yùnxíng sùdù tíshēng le jiāngjìn bǎifēnzhī sānshí.",
              "meaningVi": "Sau khi hoàn thành nâng cấp phần mềm, tốc độ chạy của ứng dụng đã tăng gần 30%."
            }
          }
        ]
      },
      {
        "id": "zh_hsk4_l5",
        "title": "Bài 5: Giáo Dục Hiện Đại & Định Hướng Nghề Nghiệp",
        "grammarFocus": "Liên từ 之所以...是因为...: Sở dĩ... là bởi vì... (他之所以能够取得优异成绩，是因为他付出了常人难以想象的努力).",
        "vocabularies": [
          {
            "id": "zh_h4_5_1",
            "word": "专业",
            "pronunciation": "zhuānyè",
            "hanViet": "CHUYÊN NGHIỆP",
            "partOfSpeech": "noun/adj",
            "meaningVi": "Chuyên ngành học tập, chuyên nghiệp",
            "radicals": "专 (Chuyên - chuyên sâu) + 业 (Nghiệp - nghề nghiệp, học nghiệp)",
            "grammarNote": "Chọn ngành học: 选择专业. Kiến thức chuyên môn: 专业知识.",
            "exampleSentence": {
              "target": "大学生在选择专业时既要结合个人兴趣，也要考虑未来的就业前景。",
              "pronunciation": "Dàxuéshēng zài xuǎnzé zhuānyè shí jì yào jiéhé gèrén xìngqù, yě yào kǎolǜ wèilái de jiùyè qiánjǐng.",
              "meaningVi": "Sinh viên khi chọn chuyên ngành vừa phải kết hợp sở thích cá nhân, vừa phải cân nhắc triển vọng việc làm tương lai."
            }
          },
          {
            "id": "zh_h4_5_2",
            "word": "硕士",
            "pronunciation": "shuòshì",
            "hanViet": "THẠC SĨ",
            "partOfSpeech": "noun",
            "meaningVi": "Thạc sĩ (bằng Master)",
            "radicals": "硕 (Thạc - to lớn, sâu rộng) + 士 (Sĩ - học giả)",
            "grammarNote": "Cử nhân: 学士 (bachelor). Tiến sĩ: 博士 (doctorate).",
            "exampleSentence": {
              "target": "他之所以选择继续攻读硕士学位，是因为希望在科研领域有更深造诣。",
              "pronunciation": "Tā zhīsuǒyǐ xuǎnzé jìxù gōngdú shuòshì xuéwèi, shì yīnwèi xīwàng zài kēyán lǐngyù yǒu gèng shēn zàoyì.",
              "meaningVi": "Sở dĩ anh ấy lựa chọn tiếp tục học lên thạc sĩ là vì hi vọng có nghiên cứu sâu hơn trong lĩnh vực khoa học."
            }
          },
          {
            "id": "zh_h4_5_3",
            "word": "实习",
            "pronunciation": "shíxí",
            "hanViet": "THỰC TẬP",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Thực tập công việc",
            "radicals": "实 (Thực - thực tế) + 习 (Tập - học tập rèn luyện)",
            "grammarNote": "Thực tập sinh: 实习生.",
            "exampleSentence": {
              "target": "假期去知名企业实习能让学生提前了解真实的职场运作。",
              "pronunciation": "Jiàqī qù zhīmíng qǐyè shíxí néng ràng xuésheng tíqián liǎojiě zhēnshí de zhíchǎng yùnzuò.",
              "meaningVi": "Kỳ nghỉ đến các doanh nghiệp danh tiếng thực tập có thể giúp sinh viên hiểu trước cách vận hành thực tế của chốn công sở."
            }
          },
          {
            "id": "zh_h4_5_4",
            "word": "奖学金",
            "pronunciation": "jiǎngxuéjīn",
            "hanViet": "TƯỞNG HỌC KIM",
            "partOfSpeech": "noun",
            "meaningVi": "Học bổng",
            "radicals": "奖 (Tưởng - khen thưởng) + 学 (Học) + 金 (Kim - tiền bạc)",
            "grammarNote": "Đạt học bổng: 获得奖学金. Xin học bổng: 申请奖学金.",
            "exampleSentence": {
              "target": "凭借优秀的学业成绩和学术成果，她获得了国家全额奖学金。",
              "pronunciation": "Píngjiè yōuxiù de xuéyè chéngjì hé xuéshù chéngguǒ, tā huòdé le guójiā quán'é jiǎngxuéjīn.",
              "meaningVi": "Nhờ vào thành tích học tập và kết quả nghiên cứu xuất sắc, cô ấy đã giành được học bổng toàn phần của quốc gia."
            }
          },
          {
            "id": "zh_h4_5_5",
            "word": "毕业",
            "pronunciation": "bìyè",
            "hanViet": "TẤT NGHIỆP",
            "partOfSpeech": "verb",
            "meaningVi": "Tốt nghiệp",
            "radicals": "毕 (Tất - xong xuôi, hoàn tất) + 业 (Nghiệp - khóa học)",
            "grammarNote": "Từ ly hợp: 毕业典礼 (lễ tốt nghiệp).",
            "exampleSentence": {
              "target": "从清华大学毕业后，他选择留在北京投身人工智能领域的创业。",
              "pronunciation": "Cóng Qīnghuá Dàxué bìyè hòu, tā xuǎnzé liú zài Běijīng tóushēn réngōng zhìnéng lǐngyù de chuàngyè.",
              "meaningVi": "Sau khi tốt nghiệp Đại học Thanh Hoa, anh ấy lựa chọn ở lại Bắc Kinh dấn thân vào khởi nghiệp lĩnh vực AI."
            }
          },
          {
            "id": "zh_h4_5_6",
            "word": "培养",
            "pronunciation": "péiyǎng",
            "hanViet": "BỒI DƯỠNG",
            "partOfSpeech": "verb",
            "meaningVi": "Bồi dưỡng, ươm mầm đào tạo",
            "radicals": "培 (Bồi - vun xới đất) + 养 (Dưỡng - nuôi nấng)",
            "grammarNote": "Bồi dưỡng nhân tài: 培养人才.",
            "exampleSentence": {
              "target": "现代教育不仅注重传授知识，更重视培养学生的独立思考能力。",
              "pronunciation": "Xiàndài jiàoyù bùjǐn zhùzhòng chuánshòu zhīshi, gèng zhòngshì péiyǎng xuésheng de dúlì sīkǎo nénglì.",
              "meaningVi": "Giáo dục hiện đại không chỉ chú trọng truyền thụ kiến thức mà còn coi trọng hơn việc bồi dưỡng năng lực tư duy độc lập của học sinh."
            }
          },
          {
            "id": "zh_h4_5_7",
            "word": "优秀",
            "pronunciation": "yōuxiù",
            "hanViet": "ƯU TÚ",
            "partOfSpeech": "adj",
            "meaningVi": "Xuất sắc, ưu tú",
            "radicals": "优 (Ưu - vượt trội) + 秀 (Tú - thanh tú, nở hoa kết quả)",
            "grammarNote": "Học sinh xuất sắc: 优秀学生.",
            "exampleSentence": {
              "target": "他在各个方面都表现得极其优秀，是大家学习的榜样。",
              "pronunciation": "Tā zài gè ge fāngmiàn dōu biǎoxiàn de jíqí yōuxiù, shì dàjiā xuéxí de bǎngyàng.",
              "meaningVi": "Anh ấy ở mọi phương diện đều thể hiện cực kỳ xuất sắc, là tấm gương cho mọi người học tập."
            }
          },
          {
            "id": "zh_h4_5_8",
            "word": "经验",
            "pronunciation": "jīngyàn",
            "hanViet": "KINH NGHIỆM",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Kinh nghiệm thực tiễn",
            "radicals": "经 (Kinh - trải qua) + 验 (Nghiệm - kiểm chứng)",
            "grammarNote": "Tích lũy kinh nghiệm: 积累经验. Giàu kinh nghiệm: 经验丰富.",
            "exampleSentence": {
              "target": "年轻时多做不同尝试，能够为未来的职业发展积累宝贵的经验。",
              "pronunciation": "Niánqīng shí duō zuò bùtóng chángshì, nénggòu wèi wèilái de zhíyè fāzhǎn jīlěi bǎoguì de jīngyàn.",
              "meaningVi": "Thời trẻ thử sức nhiều việc khác nhau có thể tích lũy kinh nghiệm quý báu cho sự phát triển nghề nghiệp sau này."
            }
          }
        ]
      },
      {
        "id": "zh_hsk4_l6",
        "title": "Bài 6: Luật Lao Động Cơ Bản & Thành Ngữ \"Nhập Hương Tùy Tục\"",
        "grammarFocus": "Thành ngữ Tứ tự (Chengyu): 入乡随俗 (Đến đâu theo phong tục ở đó) & 按部就班 (Làm việc theo đúng trình tự bài bản).",
        "vocabularies": [
          {
            "id": "zh_h4_6_1",
            "word": "入乡随俗",
            "pronunciation": "rù xiāng suí sú",
            "hanViet": "NHẬP HƯƠNG TÙY TỤC",
            "partOfSpeech": "idiom",
            "meaningVi": "Nhập gia tùy tục, đến đâu tôn trọng phong tục nơi đó",
            "radicals": "入 (Vào) + 乡 (Làng xóm) + 随 (Theo) + 俗 (Phong tục)",
            "grammarNote": "Lời khuyên khi hòa nhập môi trường mới.",
            "exampleSentence": {
              "target": "到外国工作生活，首先要学会入乡随俗，尊重当地的文化习惯。",
              "pronunciation": "Dào wàiguó gōngzuò shēnghuó, shǒuxiān yào xuéhuì rù xiāng suí sú, zūnzhòng dāngdì de wénhuà xíguàn.",
              "meaningVi": "Đến nước ngoài làm việc sinh sống, trước tiên phải học cách nhập gia tùy tục, tôn trọng tập quán văn hóa địa phương."
            }
          },
          {
            "id": "zh_h4_6_2",
            "word": "按部就班",
            "pronunciation": "àn bù jiù bān",
            "hanViet": "ÁN BỘ TỰU BAN",
            "partOfSpeech": "idiom",
            "meaningVi": "Theo đúng trình tự, từng bước bài bản không đốt cháy giai đoạn",
            "radicals": "按 (Theo) + 部 (Bộ phận) + 就 (Vào) + 班 (Ban thứ bậc)",
            "grammarNote": "Dùng miêu tả tác phong làm việc cẩn trọng, kỷ luật.",
            "exampleSentence": {
              "target": "只要我们按照项目计划按部就班地推进，就一定能如期交付。",
              "pronunciation": "Zhǐyào wǒmen ànzhào xiàngmù jìhuà ànbùjiùbān de tuījìn, jiù yídìng néng rúqī jiāofù.",
              "meaningVi": "Chỉ cần chúng ta thúc đẩy theo kế hoạch dự án một cách bài bản từng bước, chắc chắn sẽ bàn giao đúng hạn."
            }
          },
          {
            "id": "zh_h4_6_3",
            "word": "劳动法",
            "pronunciation": "láodòngfǎ",
            "hanViet": "LAO ĐỘNG PHÁP",
            "partOfSpeech": "noun",
            "meaningVi": "Luật lao động",
            "radicals": "劳动 (Lao động) + 法 (Pháp luật)",
            "grammarNote": "Tuân thủ luật: 遵守劳动法.",
            "exampleSentence": {
              "target": "劳动法明确规定了用人单位和劳动者双方的合法权利与义务。",
              "pronunciation": "Láodòngfǎ míngquè guīdìng le yòngrén dānwèi hé láodòngzhě shuāngfāng de héfǎ quánlì yǔ yìwù.",
              "meaningVi": "Luật lao động quy định rõ ràng quyền lợi hợp pháp và nghĩa vụ của cả bên sử dụng lao động và người lao động."
            }
          },
          {
            "id": "zh_h4_6_4",
            "word": "加班",
            "pronunciation": "jiābān",
            "hanViet": "GIA BAN",
            "partOfSpeech": "verb",
            "meaningVi": "Làm thêm giờ, tăng ca",
            "radicals": "加 (Gia - thêm vào) + 班 (Ban - ca làm việc)",
            "grammarNote": "Tiền làm thêm giờ: 加班费.",
            "exampleSentence": {
              "target": "周末安排员工加班的，企业必须依法支付双倍工资。",
              "pronunciation": "Zhōumò ānpái yuángōng jiābān de, qǐyè bìxū yīfǎ zhīfù shuāngbèi gōngzī.",
              "meaningVi": "Cuối tuần sắp xếp nhân viên tăng ca, doanh nghiệp bắt buộc phải chi trả lương gấp đôi theo luật."
            }
          },
          {
            "id": "zh_h4_6_5",
            "word": "保险",
            "pronunciation": "bǎoxiǎn",
            "hanViet": "BẢO HIỂM",
            "partOfSpeech": "noun/adj",
            "meaningVi": "Bảo hiểm (xã hội, y tế), chắc chắn an toàn",
            "radicals": "保 (Bảo - bảo đảm) + 险 (Hiểm - hiểm nguy)",
            "grammarNote": "Chế độ Trung Quốc: 五险一金 (5 bảo hiểm + 1 quỹ nhà ở).",
            "exampleSentence": {
              "target": "正规公司在入职当月就必须为员工缴纳社会保险和公积金。",
              "pronunciation": "Zhèngguī gōngsī zài rùzhí dàng yuè jiù bìxū wèi yuángōng jiǎonà shèhuì bǎoxiǎn hé gōngjījīn.",
              "meaningVi": "Công ty chuẩn chỉnh trong tháng nhân viên nhận việc bắt buộc phải đóng bảo hiểm xã hội và quỹ nhà ở cho nhân viên."
            }
          },
          {
            "id": "zh_h4_6_6",
            "word": "权利",
            "pronunciation": "quánlì",
            "hanViet": "QUYỀN LỢI",
            "partOfSpeech": "noun",
            "meaningVi": "Quyền lợi hợp pháp",
            "radicals": "权 (Quyền - quyền hạn) + 利 (Lợi - lợi ích)",
            "grammarNote": "Bảo vệ quyền lợi: 维护合法权利. Phân biệt với 权力 (quánlì - quyền lực nhà nước).",
            "exampleSentence": {
              "target": "当自身合法权利受到侵害时，应当勇敢地拿起法律武器维权。",
              "pronunciation": "Dāng zìshēn héfǎ quánlì shòudào qīnhài shí, yīngdāng yǒnggǎn de ná qǐ fǎlǜ wǔqì wéiquán.",
              "meaningVi": "Khi quyền lợi hợp pháp của bản thân bị xâm hại, cần dũng cảm cầm lấy vũ khí pháp luật để bảo vệ quyền lợi."
            }
          },
          {
            "id": "zh_h4_6_7",
            "word": "赔偿",
            "pronunciation": "péicháng",
            "hanViet": "BỒI THƯỜNG",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Bồi thường tổn thất/thiệt hại",
            "radicals": "赔 (Bồi - mất tiền đền) + 偿 (Thường - hoàn trả)",
            "grammarNote": "Bồi thường kinh tế: 经济赔偿金.",
            "exampleSentence": {
              "target": "如果公司违法解除劳动合同，必须向员工支付双倍经济赔偿。",
              "pronunciation": "Rúguǒ gōngsī wéifǎ jiěchú láodòng hétong, bìxū xiàng yuángōng zhīfù shuāngbèi jīngjì péicháng.",
              "meaningVi": "Nếu công ty đơn phương hủy hợp đồng lao động trái luật, bắt buộc phải trả cho nhân viên gấp đôi tiền bồi thường kinh tế."
            }
          },
          {
            "id": "zh_h4_6_8",
            "word": "法律",
            "pronunciation": "fǎlǜ",
            "hanViet": "PHÁP LUẬT",
            "partOfSpeech": "noun",
            "meaningVi": "Pháp luật, luật lệ",
            "radicals": "法 (Pháp - khuôn mẫu) + 律 (Luật - quy định điều lệnh)",
            "grammarNote": "Tuân thủ pháp luật: 遵守法律.",
            "exampleSentence": {
              "target": "在法律面前，人人一律平等。",
              "pronunciation": "Zài fǎlǜ miànqián, rénrén yílǜ píngděng.",
              "meaningVi": "Trước pháp luật, mọi người hoàn toàn bình đẳng."
            }
          }
        ]
      },
      {
        "id": "zh_hsk4_l7",
        "title": "Bài 7: Truyền Thông Số & Thành Ngữ \"Nhất Cử Lưỡng Đắc\"",
        "grammarFocus": "Thành ngữ Tứ tự: 一举两得 (Một mũi tên trúng hai đích / Một công đôi việc) & 画龙点睛 (Điểm xuyết chi tiết đắt giá làm bừng sáng cả tác phẩm).",
        "vocabularies": [
          {
            "id": "zh_h4_7_1",
            "word": "一举两得",
            "pronunciation": "yì jǔ liǎng dé",
            "hanViet": "NHẤT CỬ LƯỠNG ĐẮC",
            "partOfSpeech": "idiom",
            "meaningVi": "Một công đôi việc, tiện cả đôi đường",
            "radicals": "一 (Một) + 举 (Hành động) + 两 (Hai) + 得 (Được, đạt được)",
            "grammarNote": "Đồng nghĩa với 一石二鸟.",
            "exampleSentence": {
              "target": "骑自行车上下班不仅能锻炼身体，还能节能减排，真是一举两得。",
              "pronunciation": "Qí zìxíngchē shàngxiàbān bùjǐn néng duànliàn shēntǐ, hái néng jiénéng jiǎnpái, zhēn shì yì jǔ liǎng dé.",
              "meaningVi": "Đạp xe đạp đi làm không những có thể rèn luyện sức khỏe mà còn tiết kiệm năng lượng giảm phát thải, thật đúng là một công đôi việc."
            }
          },
          {
            "id": "zh_h4_7_2",
            "word": "画龙点睛",
            "pronunciation": "huà lóng diǎn jīng",
            "hanViet": "HỌA LONG ĐIỂM TINH",
            "partOfSpeech": "idiom",
            "meaningVi": "Vẽ rồng điểm mắt (thêm chi tiết then chốt làm bừng sáng toàn bộ)",
            "radicals": "画 (Vẽ) + 龙 (Rồng) + 点 (Chấm điểm) + 睛 (Con ngươi của mắt)",
            "grammarNote": "Khen ngợi câu kết bài viết hoặc điểm sáng trong thiết kế.",
            "exampleSentence": {
              "target": "设计师在海报正中央加的那句文案起到了画龙点睛的作用。",
              "pronunciation": "Shèjìshī zài hǎibào zhèng zhōngyāng jiā de nà jù wén'àn qǐdào le huà lóng diǎn jīng de zuòyòng.",
              "meaningVi": "Câu slogan mà nhà thiết kế thêm vào chính giữa tấm poster đã phát huy tác dụng vẽ rồng điểm mắt."
            }
          },
          {
            "id": "zh_h4_7_3",
            "word": "广告",
            "pronunciation": "guǎnggào",
            "hanViet": "QUẢNG CÁO",
            "partOfSpeech": "noun",
            "meaningVi": "Quảng cáo thương mại",
            "radicals": "广 (Quảng - rộng rãi) + 告 (Cáo - thông báo)",
            "grammarNote": "Chạy quảng cáo: 投放广告.",
            "exampleSentence": {
              "target": "优质的创意广告不仅能提高品牌知名度，还能引发消费者的情感共鸣。",
              "pronunciation": "Yōuzhì de chuàngyì guǎnggào bùjǐn néng tígāo pǐnpái zhīmíngdù, hái néng yǐnfā xiāofèizhě de qínggǎn gòngmíng.",
              "meaningVi": "Quảng cáo sáng tạo chất lượng cao không chỉ nâng cao độ nhận diện thương hiệu mà còn gợi lên sự đồng cảm sâu sắc của người tiêu dùng."
            }
          },
          {
            "id": "zh_h4_7_4",
            "word": "宣传",
            "pronunciation": "xuānchuán",
            "hanViet": "TUYÊN TRUYỀN",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Tuyên truyền, quảng bá",
            "radicals": "宣 (Tuyên - công bố) + 传 (Truyền - lan tỏa)",
            "grammarNote": "Chiến dịch truyền thông: 宣传活动.",
            "exampleSentence": {
              "target": "团队在各大社交平台上全力展开新产品的宣传推广。",
              "pronunciation": "Tuánduì zài gè dà shèjiāo píngtái shang quánlì zhǎnkāi xīn chǎnpǐn de xuānchuán tuīguǎng.",
              "meaningVi": "Đội ngũ dốc toàn lực triển khai tuyên truyền quảng bá sản phẩm mới trên khắp các nền tảng mạng xã hội."
            }
          },
          {
            "id": "zh_h4_7_5",
            "word": "媒体",
            "pronunciation": "méitǐ",
            "hanViet": "MÔI THỂ",
            "partOfSpeech": "noun",
            "meaningVi": "Phương tiện truyền thông, báo đài",
            "radicals": "媒 (Môi - môi giới kết nối) + 体 (Thể - thể thức)",
            "grammarNote": "Mạng xã hội mới: 自媒体 (we-media), 社交媒体 (social media).",
            "exampleSentence": {
              "target": "新媒体时代的到来让每个人都拥有了发声和展示才华的机会。",
              "pronunciation": "Xīn méitǐ shídài de dàolái ràng měi ge rén dōu yōngyǒu le fāshēng hé zhǎnshì cáihuá de jīhuì.",
              "meaningVi": "Thời đại truyền thông mới đến mang lại cơ hội cất lên tiếng nói và thể hiện tài năng cho mỗi con người."
            }
          },
          {
            "id": "zh_h4_7_6",
            "word": "流量",
            "pronunciation": "liúliàng",
            "hanViet": "LƯU LƯỢNG",
            "partOfSpeech": "noun",
            "meaningVi": "Lưu lượng truy cập, traffic trên mạng",
            "radicals": "流 (Lưu - dòng chảy) + 量 (Lượng - số lượng)",
            "grammarNote": "Đổi traffic thành doanh số: 流量变现.",
            "exampleSentence": {
              "target": "优质的内容永远是吸引海量网络流量的最根本保证。",
              "pronunciation": "Yōuzhì de nèiróng yǒngyuǎn shì xīyǐn hǎiliàng wǎngluò liúliàng de zuì gēnběn bǎozhèng.",
              "meaningVi": "Nội dung chất lượng cao mãi mãi là bảo đảm căn bản nhất để thu hút lượng traffic khổng lồ trên mạng."
            }
          },
          {
            "id": "zh_h4_7_7",
            "word": "影响",
            "pronunciation": "yǐngxiǎng",
            "hanViet": "ẢNH HƯỞNG",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Ảnh hưởng, tác động lan tỏa",
            "radicals": "影 (Ảnh - cái bóng) + 响 (Hưởng - tiếng vang vọng)",
            "grammarNote": "Người có tầm ảnh hưởng: 意见领袖 (KOL). Sức ảnh hưởng: 影响力.",
            "exampleSentence": {
              "target": "知名博主的测评视频对年轻群体的购买决策产生了深远影响。",
              "pronunciation": "Zhīmíng bózhǔ de cèpíng shìpín duì niánqīng qúntǐ de gòumǎi juécè chǎnshēng le shēnyuǎn yǐngxiǎng.",
              "meaningVi": "Video đánh giá của blogger nổi tiếng đã tạo ra ảnh hưởng sâu xa đối với quyết định mua sắm của giới trẻ."
            }
          },
          {
            "id": "zh_h4_7_8",
            "word": "吸引",
            "pronunciation": "xīyǐn",
            "hanViet": "HẤP DẪN",
            "partOfSpeech": "verb",
            "meaningVi": "Thu hút, hấp dẫn ánh nhìn",
            "radicals": "吸 (Hấp - hút vào) + 引 (Dẫn - kéo tới)",
            "grammarNote": "Thu hút sự chú ý: 吸引注意力.",
            "exampleSentence": {
              "target": "这场独特的艺术展览吸引了上万名来自各地的观众前来参观。",
              "pronunciation": "Zhè chǎng dútè de yìshù zhǎnlǎn xīyǐn le shàng wàn míng láizì gèdì de guānzhòng qiánlái cānguān.",
              "meaningVi": "Triển lãm nghệ thuật độc đáo này đã thu hút hàng vạn khán giả từ khắp nơi đến tham quan."
            }
          }
        ]
      },
      {
        "id": "zh_hsk4_l8",
        "title": "Bài 8: Bảo Vệ Môi Trường Xanh & Thành Ngữ \"Bán Đồ Nhi Phế\"",
        "grammarFocus": "Thành ngữ Tứ tự: 半途而废 (Bỏ dở nửa chừng / Đứt gánh giữa đường) & 循序渐进 (Tiến hành tuần tự từng bước vững chắc).",
        "vocabularies": [
          {
            "id": "zh_h4_8_1",
            "word": "半途而废",
            "pronunciation": "bàn tú ér fèi",
            "hanViet": "BÁN ĐỒ NHI PHẾ",
            "partOfSpeech": "idiom",
            "meaningVi": "Bỏ dở nửa chừng, làm việc không kiên trì đến cùng",
            "radicals": "半 (Nửa) + 途 (Đường đi) + 而 (Mà) + 废 (Phế bỏ, vứt bỏ)",
            "grammarNote": "Khuyên răn: 决不能半途而废.",
            "exampleSentence": {
              "target": "学习任何一门技术都需要坚持到底，绝不能半途而废。",
              "pronunciation": "Xuéxí rènhé yì mén jìshù dōu xūyào jiānchí dàodǐ, jué bù néng bàntú'érfèi.",
              "meaningVi": "Học bất kỳ một môn kỹ thuật nào cũng cần phải kiên trì đến cùng, tuyệt đối không được bỏ dở nửa chừng."
            }
          },
          {
            "id": "zh_h4_8_2",
            "word": "循序渐进",
            "pronunciation": "xún xù jiàn jìn",
            "hanViet": "TUẦN TỰ TIỆM TIẾN",
            "partOfSpeech": "idiom",
            "meaningVi": "Tuần tự từng bước, tiến lên có phương pháp lớp lang",
            "radicals": "循 (Theo) + 序 (Thứ tự) + 渐 (Dần dần) + 进 (Tiến lên)",
            "grammarNote": "Phương pháp sư phạm chuẩn mực.",
            "exampleSentence": {
              "target": "掌握高级词汇必须遵循循序渐进的规律，从基础慢慢积累。",
              "pronunciation": "Zhǎngwò gāojí cíhuì bìxū zūnxún xúnxùjiànjìn de guīlǜ, cóng jīchǔ mànmàn jīlěi.",
              "meaningVi": "Nắm vững từ vựng cao cấp bắt buộc phải tuân theo quy luật tuần tự tiệm tiến, tích lũy dần từ nền tảng."
            }
          },
          {
            "id": "zh_h4_8_3",
            "word": "垃圾分类",
            "pronunciation": "lājī fēnlèi",
            "hanViet": "LẠP TẠP PHÂN LOẠI",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Phân loại rác thải tại nguồn",
            "radicals": "垃圾 (Rác rưởi) + 分类 (Phân chia chủng loại)",
            "grammarNote": "Bốn loại rác: 可回收物, 有害垃圾, 厨余垃圾, 其他垃圾.",
            "exampleSentence": {
              "target": "推行垃圾分类不仅能促进资源循环利用，还能保护城市生态。",
              "pronunciation": "Tuīxíng lājī fēnlèi bùjǐn néng cùjìn zīyuán xúnhuán lìyòng, hái néng bǎohù chéngshì shēngtài.",
              "meaningVi": "Thúc đẩy phân loại rác thải không những thúc đẩy tái chế tài nguyên mà còn bảo vệ sinh thái đô thị."
            }
          },
          {
            "id": "zh_h4_8_4",
            "word": "节约",
            "pronunciation": "jiéyuē",
            "hanViet": "TIẾT ƯỚC",
            "partOfSpeech": "verb",
            "meaningVi": "Tiết kiệm, chắt chiu",
            "radicals": "节 (Tiết - kiềm chế) + 约 (Ước - ước thúc, co bớt)",
            "grammarNote": "Tiết kiệm nước: 节约用水. Trái nghĩa: 浪费 (làngfèi - lãng phí).",
            "exampleSentence": {
              "target": "随手关灯、节约用电是我们每个人举手之劳的环保行动。",
              "pronunciation": "Suíshǒu guāndēng, jiéyuē yòngdiàn shì wǒmen měi ge rén jǔshǒuzhīláo de huánbǎo xíngdòng.",
              "meaningVi": "Tiện tay tắt đèn, tiết kiệm điện là hành động bảo vệ môi trường vừa tầm tay của mỗi người chúng ta."
            }
          },
          {
            "id": "zh_h4_8_5",
            "word": "污染",
            "pronunciation": "wūrǎn",
            "hanViet": "Ô NHIỄM",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Ô nhiễm môi trường",
            "radicals": "污 (Ô - bẩn thỉu) + 染 (Nhiễm - lây lan)",
            "grammarNote": "Ô nhiễm không khí: 空气污染. Ô nhiễm nguồn nước: 水污染.",
            "exampleSentence": {
              "target": "大力发展新能源汽车有助于减少汽车尾气对大气环境的污染。",
              "pronunciation": "Dàlì fāzhǎn xīn néngyuán qìchē yǒuzhùyú jiǎnshǎo qìchē wěiqì duì dàqì huánjìng de wūrǎn.",
              "meaningVi": "Dốc sức phát triển xe năng lượng mới giúp ích cho việc giảm ô nhiễm của khí thải ô tô đối với môi trường khí quyển."
            }
          },
          {
            "id": "zh_h4_8_6",
            "word": "塑料",
            "pronunciation": "sùliào",
            "hanViet": "TỐ LIỆU",
            "partOfSpeech": "noun",
            "meaningVi": "Chất liệu nhựa, đồ nhựa",
            "radicals": "塑 (Tố - uốn nắn tạo hình) + 料 (Liệu - vật liệu)",
            "grammarNote": "Túi nilon: 塑料袋. Cấm dùng đồ nhựa 1 lần: 限塑令.",
            "exampleSentence": {
              "target": "超市购物时自带环保布袋可以有效减少塑料袋的使用量。",
              "pronunciation": "Chāoshì gòuwù shí zìdài huánbǎo bùdài kěyǐ yǒuxiào jiǎnshǎo sùliàodài de shǐyòngliàng.",
              "meaningVi": "Khi đi mua sắm ở siêu thị tự mang theo túi vải thân thiện môi trường có thể giảm thiểu lượng túi nhựa một cách hiệu quả."
            }
          },
          {
            "id": "zh_h4_8_7",
            "word": "绿化",
            "pronunciation": "lǜhuà",
            "hanViet": "LỤC HÓA",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Phủ xanh, trồng cây tạo mảng xanh",
            "radicals": "绿 (Lục - màu xanh lá cây) + 化 (Hóa - biến đổi)",
            "grammarNote": "Tỷ lệ phủ xanh đô thị: 城市绿化率.",
            "exampleSentence": {
              "target": "近十年来，这座城市的绿化面积扩大了将近一倍。",
              "pronunciation": "Jìn shí nián lái, zhè zuò chéngshì de lǜhuà miànjī kuòdà le jiāngjìn yí bèi.",
              "meaningVi": "Mười năm trở lại đây, diện tích phủ xanh của thành phố này đã mở rộng gần gấp đôi."
            }
          },
          {
            "id": "zh_h4_8_8",
            "word": "责任",
            "pronunciation": "zérèn",
            "hanViet": "TRÁCH NHIỆM",
            "partOfSpeech": "noun",
            "meaningVi": "Trách nhiệm, bổn phận",
            "radicals": "责 (Trách - nghĩa vụ) + 任 (Nhiệm - gánh vác)",
            "grammarNote": "Có tinh thần trách nhiệm: 有责任心. Trách nhiệm xã hội: 社会责任.",
            "exampleSentence": {
              "target": "留给子孙后代一个天蓝地绿水清的美丽家园是我们共同的责任。",
              "pronunciation": "Liú gěi zǐsūn hòudài yí ge tiān lán dì lǜ shuǐ qīng de měilì jiāyuán shì wǒmen gòngtóng de zérèn.",
              "meaningVi": "Để lại cho con cháu mai sau một mái nhà tươi đẹp trời xanh đất xanh nước trong là trách nhiệm chung của chúng ta."
            }
          }
        ]
      },
      {
        "id": "zh_hsk4_l9",
        "title": "Bài 9: Du Lịch Khám Phá Địa Lý & Thành Ngữ \"Mã Đáo Thành Công\"",
        "grammarFocus": "Thành ngữ Tứ tự: 马到成功 (Mã đáo thành công / Đánh đâu thắng đó) & 流连忘返 (Say mê ngắm cảnh quên cả lối về).",
        "vocabularies": [
          {
            "id": "zh_h4_9_1",
            "word": "马到成功",
            "pronunciation": "mǎ dào chéng gōng",
            "hanViet": "MÃ ĐÁO THÀNH CÔNG",
            "partOfSpeech": "idiom",
            "meaningVi": "Mã đáo thành công, ra trận chiến thắng vẻ vang",
            "radicals": "马 (Mã) + 到 (Đến) + 成 (Thành) + 功 (Công trạng)",
            "grammarNote": "Câu chúc tụng kinh điển: 祝您马到成功!",
            "exampleSentence": {
              "target": "祝愿你在新的工作岗位上大展宏图，马到成功！",
              "pronunciation": "Zhùyuàn nǐ zài xīn de gōngzuò gǎngwèi shang dàzhǎn hóngtú, mǎ dào chéng gōng!",
              "meaningVi": "Chúc bạn ở cương vị công tác mới mở rộng tiền đồ, mã đáo thành công!"
            }
          },
          {
            "id": "zh_h4_9_2",
            "word": "流连忘返",
            "pronunciation": "liú lián wàng fǎn",
            "hanViet": "LƯU LIÊN VONG PHẢN",
            "partOfSpeech": "idiom",
            "meaningVi": "Quyến luyến say mê cảnh đẹp quên cả đường về",
            "radicals": "流连 (Lưu luyến gắn bó) + 忘返 (Quên mất việc quay về)",
            "grammarNote": "Dùng miêu tả vẻ đẹp mê hoặc của danh lam thắng cảnh.",
            "exampleSentence": {
              "target": "九寨沟如诗如画的山水美景让每一位前来的游客都流连忘返。",
              "pronunciation": "Jiǔzhàigōu rú shī rú huà de shānshuǐ měijǐng ràng měi yí wèi qiánlái de yóukè dōu liúliánwàngfǎn.",
              "meaningVi": "Cảnh sắc non nước đẹp như thơ như họa của Cửu Trại Câu khiến mỗi du khách đến đây đều lưu luyến quên cả lối về."
            }
          },
          {
            "id": "zh_h4_9_3",
            "word": "风景",
            "pronunciation": "fēngjǐng",
            "hanViet": "PHONG CẢNH",
            "partOfSpeech": "noun",
            "meaningVi": "Phong cảnh, cảnh sắc thiên nhiên",
            "radicals": "风 (Phong - gió) + 景 (Cảnh - cảnh tượng)",
            "grammarNote": "Khu danh thắng: 风景区.",
            "exampleSentence": {
              "target": "登上长城顶峰，群山连绵起伏的壮丽风景尽收眼底。",
              "pronunciation": "Dēng shàng Chángchéng dǐngfēng, qúnshān liánmián qǐfú de zhuànglì fēngjǐng jìn shōu yǎndǐ.",
              "meaningVi": "Trèo lên đỉnh Vạn Lý Trường Thành, phong cảnh tráng lệ của các dãy núi nhấp nhô trùng điệp thu trọn vào tầm mắt."
            }
          },
          {
            "id": "zh_h4_9_4",
            "word": "名胜古迹",
            "pronunciation": "míngshèng gǔjì",
            "hanViet": "DANH THẮNG CỔ TÍCH",
            "partOfSpeech": "noun",
            "meaningVi": "Danh lam thắng cảnh và di tích cổ",
            "radicals": "名胜 (Thắng cảnh nổi tiếng) + 古迹 (Dấu tích di tích cổ xưa)",
            "grammarNote": "Du lịch văn hóa: 游览名胜古迹.",
            "exampleSentence": {
              "target": "西安作为千年古都，拥有兵马俑、大雁塔等无数著名的名胜古迹。",
              "pronunciation": "Xī'ān zuòwéi qiānnián gǔdū, yōngyǒu Bīngmǎyǒng, Dàyàntǎ děng wúshù zhùmíng de míngshèng gǔjì.",
              "meaningVi": "Tây An với tư cách là cổ đô ngàn năm, sở hữu vô số danh thắng cổ tích nổi tiếng như Binh mã dũng, Tháp Đại Nhạn."
            }
          },
          {
            "id": "zh_h4_9_5",
            "word": "特色",
            "pronunciation": "tèsè",
            "hanViet": "ĐẶC SẮC",
            "partOfSpeech": "noun/adj",
            "meaningVi": "Đặc sắc, nét đặc trưng độc đáo",
            "radicals": "特 (Đặc biệt) + 色 (Sắc thái)",
            "grammarNote": "Đặc sản địa phương: 地方特色.",
            "exampleSentence": {
              "target": "品尝具有地方特色的小吃是旅行中不可或缺的乐趣之一。",
              "pronunciation": "Pǐncháng jùyǒu dìfāng tèsè de xiǎochī shì lǚxíng zhōng bù kě huò quē de lèqù zhī yī.",
              "meaningVi": "Thưởng thức những món ăn vặt mang đậm đặc sắc địa phương là một trong những niềm vui không thể thiếu trong chuyến du lịch."
            }
          },
          {
            "id": "zh_h4_9_6",
            "word": "拍照",
            "pronunciation": "pāizhào",
            "hanViet": "PHÁCH CHIẾU",
            "partOfSpeech": "verb",
            "meaningVi": "Chụp hình, chụp ảnh lưu niệm",
            "radicals": "拍 (Phách - vỗ, bấm máy) + 照 (Chiếu - bức ảnh)",
            "grammarNote": "Check-in chụp ảnh: 拍照打卡.",
            "exampleSentence": {
              "target": "游客们纷纷在标志性建筑前拍照留念。",
              "pronunciation": "Yóukèmen fēnfēn zài biāozhìxìng jiànzhù qián pāizhào liúniàn.",
              "meaningVi": "Du khách tấp nập chụp ảnh lưu niệm trước công trình kiến trúc mang tính biểu tượng."
            }
          },
          {
            "id": "zh_h4_9_7",
            "word": "纪念品",
            "pronunciation": "jìniànpǐn",
            "hanViet": "KỶ NIỆM PHẨM",
            "partOfSpeech": "noun",
            "meaningVi": "Đồ lưu niệm kỷ niệm",
            "radicals": "纪念 (Kỷ niệm ghi nhớ) + 品 (Vật phẩm)",
            "grammarNote": "Mua đồ lưu niệm: 买纪念品.",
            "exampleSentence": {
              "target": "他给办公室的同事们带回了许多富有云南少数民族风情的纪念品。",
              "pronunciation": "Tā gěi bàngōngshì de tóngshìmen dàihuí le xǔduō fùyǒu Yúnnán shǎoshù mínzú fēngqíng de jìniànpǐn.",
              "meaningVi": "Anh ấy đã mang về cho các đồng nghiệp ở văn phòng rất nhiều món đồ lưu niệm đậm đà phong vị dân tộc thiểu số Vân Nam."
            }
          },
          {
            "id": "zh_h4_9_8",
            "word": "气候",
            "pronunciation": "qìhòu",
            "hanViet": "KHÍ HẬU",
            "partOfSpeech": "noun",
            "meaningVi": "Khí hậu thời tiết vùng miền",
            "radicals": "气 (Khí quyển) + 候 (Thời điểm khí tiết)",
            "grammarNote": "Khí hậu ôn hòa: 气候温和. Khí hậu khắc nghiệt: 气候恶劣.",
            "exampleSentence": {
              "target": "昆明四季如春，气候宜人，因而享有春城的美誉。",
              "pronunciation": "Kūnmíng sìjì rú chūn, qìhòu yírén, yīn'ér xiǎngyǒu Chūnchéng de měiyù.",
              "meaningVi": "Côn Minh bốn mùa như xuân, khí hậu dễ chịu lòng người, bởi thế được hưởng danh xưng tuyệt mỹ là Thành phố mùa xuân."
            }
          }
        ]
      },
      {
        "id": "zh_hsk4_l10",
        "title": "Bài 10: Khởi Nghiệp, Kế Hoạch Tương Lai & \"Thục Năng Sinh Xảo\"",
        "grammarFocus": "Thành ngữ Tứ tự: 熟能生巧 (Trăm hay không bằng tay quen / Rèn luyện mãi ắt thành kỹ xảo) & 坚持不懈 (Bền bỉ kiên trì không hề chểnh mảng).",
        "vocabularies": [
          {
            "id": "zh_h4_10_1",
            "word": "熟能生巧",
            "pronunciation": "shú néng shēng qiǎo",
            "hanViet": "THỤC NĂNG SINH XẢO",
            "partOfSpeech": "idiom",
            "meaningVi": "Quen tay hay việc, luyện tập thuần thục sẽ sinh ra kỹ xảo khéo léo",
            "radicals": "熟 (Thuần thục chín muồi) + 能 (Có thể) + 生 (Sinh ra) + 巧 (Khéo léo xảo diệu)",
            "grammarNote": "Nguyên lý học ngoại ngữ và kỹ năng.",
            "exampleSentence": {
              "target": "练习汉字书写最重要的是持之以恒，熟能生巧自然就能写得既快又美。",
              "pronunciation": "Liànxí hànzì shūxiě zuì zhòngyào de shì chízhīyǐhéng, shúnéngshēngqiǎo zìrán jiù néng xiě de jì kuài yòu měi.",
              "meaningVi": "Luyện tập viết chữ Hán điều quan trọng nhất là kiên trì giữ vững, trăm hay không bằng tay quen tự nhiên sẽ viết được vừa nhanh vừa đẹp."
            }
          },
          {
            "id": "zh_h4_10_2",
            "word": "坚持不懈",
            "pronunciation": "jiān chí bú xiè",
            "hanViet": "KIÊN TRÌ BẤT GIẢI",
            "partOfSpeech": "idiom",
            "meaningVi": "Kiên trì không lơi lỏng, bền bỉ đến cùng",
            "radicals": "坚持 (Kiên trì giữ vững) + 不懈 (Không hề chểnh mảng lơi là)",
            "grammarNote": "Đức tính khởi nghiệp thành công.",
            "exampleSentence": {
              "target": "经过创业团队五年来坚持不懈的拼搏，公司终于成功挂牌上市。",
              "pronunciation": "Jīngguò chuàngyè tuánduì wǔ nián lái jiānchíbúxiè de pīnbó, gōngsī zhōngyú chénggōng guàpái shàngshì.",
              "meaningVi": "Trải qua 5 năm nỗ lực kiên trì không ngừng nghỉ của đội ngũ sáng lập, công ty cuối cùng đã niêm yết lên sàn chứng khoán thành công."
            }
          },
          {
            "id": "zh_h4_10_3",
            "word": "创业",
            "pronunciation": "chuàngyè",
            "hanViet": "SÁNG NGHIỆP",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Khởi nghiệp, lập nghiệp kinh doanh",
            "radicals": "创 (Sáng - khai sáng tạo ra) + 业 (Nghiệp - cơ nghiệp)",
            "grammarNote": "Công ty khởi nghiệp: 初创企业. Tinh thần khởi nghiệp: 创业精神.",
            "exampleSentence": {
              "target": "创业不仅需要敏锐的市场洞察力，更需要强大的抗压心理素质。",
              "pronunciation": "Chuàngyè bùjǐn xūyào mǐnruì de shìchǎng dòngchálì, gèng xūyào qiángdà de kàngyā xīnlǐ sùzhì.",
              "meaningVi": "Khởi nghiệp không chỉ cần năng lực thấu thị thị trường nhạy bén mà còn cần tố chất tâm lý chịu áp lực mạnh mẽ."
            }
          },
          {
            "id": "zh_h4_10_4",
            "word": "投资",
            "pronunciation": "tóuzī",
            "hanViet": "ĐẦU TƯ",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Đầu tư tài chính, nguồn vốn đầu tư",
            "radicals": "投 (Đầu - ném vào, đổ tiền vào) + 资 (Tư - tư bản)",
            "grammarNote": "Nhà đầu tư mạo hiểm: 风险投资人 (VC). Thu hồi vốn: 投资回报率 (ROI).",
            "exampleSentence": {
              "target": "项目在初创阶段就获得了知名投资机构一千万元的天使投资。",
              "pronunciation": "Xiàngmù zài chūchuàng jiēduàn jiù huòdé le zhīmíng tóuzī jīgòu yì qiān wàn yuán de tiānshǐ tóuzī.",
              "meaningVi": "Dự án ngay tại giai đoạn sơ khai đã nhận được 10 triệu tệ vốn đầu tư thiên thần từ một tổ chức đầu tư danh tiếng."
            }
          },
          {
            "id": "zh_h4_10_5",
            "word": "目标",
            "pronunciation": "mùbiāo",
            "hanViet": "MỤC TIÊU",
            "partOfSpeech": "noun",
            "meaningVi": "Mục tiêu, đích nhắm đến",
            "radicals": "目 (Mục - con mắt nhìn) + 标 (Tiêu - cột mốc)",
            "grammarNote": "Đặt ra mục tiêu: 制定目标. Đạt được mục tiêu: 实现目标.",
            "exampleSentence": {
              "target": "制定清晰可行的短期和长期目标是迈向成功的基石。",
              "pronunciation": "Zhìdìng qīngxī kěxíng de duǎnqī hé chángqī mùbiāo shì màixiàng chénggōng de jīshí.",
              "meaningVi": "Đề ra mục tiêu ngắn hạn và dài hạn rõ ràng khả thi là viên đá nền tảng để tiến tới thành công."
            }
          },
          {
            "id": "zh_h4_10_6",
            "word": "机遇",
            "pronunciation": "jīyù",
            "hanViet": "CƠ NGỘ",
            "partOfSpeech": "noun",
            "meaningVi": "Cơ hội tốt ngàn năm có một, thời cơ thuận lợi",
            "radicals": "机 (Cơ - thời cơ, máy tính) + 遇 (Ngộ - cơ duyên gặp gỡ)",
            "grammarNote": "Nắm bắt cơ hội: 抓住机遇. Thách thức đi kèm cơ hội: 机遇与挑战并存.",
            "exampleSentence": {
              "target": "数字化转型浪潮为广大中小企业带来了前所未有的发展机遇。",
              "pronunciation": "Shùzìhuà zhuǎnxíng làngcháo wèi guǎngdà zhōngxiǎo qǐyè dàilái le qiánsuǒwèiyǒu de fāzhǎn jīyù.",
              "meaningVi": "Làn sóng chuyển đổi số đã mang lại cơ hội phát triển chưa từng có cho đông đảo các doanh nghiệp vừa và nhỏ."
            }
          },
          {
            "id": "zh_h4_10_7",
            "word": "团队",
            "pronunciation": "tuánduì",
            "hanViet": "ĐOÀN ĐỘI",
            "partOfSpeech": "noun",
            "meaningVi": "Đội ngũ, tập thể teamwork",
            "radicals": "团 (Đoàn - gắn kết thành khối) + 队 (Đội - hàng ngũ)",
            "grammarNote": "Tinh thần đồng đội: 团队合作精神.",
            "exampleSentence": {
              "target": "一个优秀高效的团队能够把看似不可能的目标变为现实。",
              "pronunciation": "Yí ge yōuxiù gāoxiào de tuánduì nénggòu bǎ kànsì bù kěnéng de mùbiāo biàn wéi xiànshí.",
              "meaningVi": "Một đội ngũ xuất sắc và hiệu suất cao có thể biến những mục tiêu tưởng chừng không thể thành hiện thực."
            }
          },
          {
            "id": "zh_h4_10_8",
            "word": "成功",
            "pronunciation": "chénggōng",
            "hanViet": "THÀNH CÔNG",
            "partOfSpeech": "noun/verb/adj",
            "meaningVi": "Thành công",
            "radicals": "成 (Thành - hoàn thành) + 功 (Công - thành tựu)",
            "grammarNote": "Trái nghĩa với 失败 (shībài - thất bại). Thành ngữ: 失败乃成功之母.",
            "exampleSentence": {
              "target": "成功的背后往往凝聚着无数次不为人知的汗水与泪水。",
              "pronunciation": "Chénggōng de bèihòu wǎngwǎng níngjùzhe wúshù cì bù wéi rén zhī de hànshuǐ yǔ lèishuǐ.",
              "meaningVi": "Phía sau thành công thường kết tinh từ vô số lần mồ hôi và nước mắt không mấy ai hay biết."
            }
          }
        ]
      }
    ]
  },
  "zh_hsk5": {
    "levelId": "zh_hsk5",
    "code": "HSK 5",
    "title": "HSK 5 - Cao Cấp 1: Đàm Phán Thương Mại, Pháp Lý & Thư Diện Ngữ Chuyên Sâu",
    "lessons": [
      {
        "id": "zh_hsk5_l1",
        "title": "Bài 1: Đàm Phán Thương Mại Quốc Tế & Thư Diện Ngữ 以, 从而",
        "grammarFocus": "Ngữ pháp văn viết thư diện ngữ: 以 (Để/Bằng cách: 以诚待人, 以促进合作) & 从而 (Từ đó/Qua đó: 优化流程，从而提高生产效率).",
        "vocabularies": [
          {
            "id": "zh_h5_1_1",
            "word": "谈判",
            "pronunciation": "tánpàn",
            "hanViet": "ĐÀM PHÁN",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Đàm phán thương lượng, cuộc thương lượng",
            "radicals": "谈 (Đàm - nói chuyện) + 判 (Phán - phán xét đánh giá)",
            "grammarNote": "Bàn đàm phán: 谈判桌. Đàm phán thương mại: 商务谈判.",
            "exampleSentence": {
              "target": "双方代表经过艰苦的商务谈判，最终就关键条款达成了共识。",
              "pronunciation": "Shuāngfāng dàibiǎo jīngguò jiānkǔ de shāngwù tánpàn, zuìzhōng jiù guānjiàn tiáokuǎn dáchéng le gòngshí.",
              "meaningVi": "Đại diện hai bên trải qua cuộc đàm phán thương mại gian khổ, cuối cùng đã đạt được sự đồng thuận về các điều khoản then chốt."
            }
          },
          {
            "id": "zh_h5_1_2",
            "word": "从而",
            "pronunciation": "cóng'ér",
            "hanViet": "TÙNG NHI",
            "partOfSpeech": "conjunction",
            "meaningVi": "Từ đó, qua đó dẫn đến kết quả",
            "radicals": "从 (Tùng - theo đó) + 而 (Nhi - mà)",
            "grammarNote": "Liên từ thư diện ngữ biểu thị kết quả tự nhiên hoặc mục đích đạt được.",
            "exampleSentence": {
              "target": "企业通过引入先进管理系统降低了运营成本，从而显著增强了核心竞争力。",
              "pronunciation": "Qǐyè tōngguò yǐnrù xiānjìn guǎnlǐ xìtǒng jiàngdī le yùnyíng chéngběn, cóng'ér xiǎnzhù zēngqiáng le héxīn jìngzhēnglì.",
              "meaningVi": "Doanh nghiệp thông qua đưa vào hệ thống quản lý tiên tiến đã hạ thấp chi phí vận hành, từ đó gia tăng rõ rệt sức cạnh tranh cốt lõi."
            }
          },
          {
            "id": "zh_h5_1_3",
            "word": "互利共赢",
            "pronunciation": "hù lì gòng yíng",
            "hanViet": "HỖ LỢI CỘNG DOANH",
            "partOfSpeech": "idiom",
            "meaningVi": "Đôi bên cùng có lợi (Win-Win)",
            "radicals": "互利 (Cùng có lợi cho nhau) + 共赢 (Cùng nhau chiến thắng)",
            "grammarNote": "Nguyên tắc vàng trong thương mại quốc tế.",
            "exampleSentence": {
              "target": "我们秉持互利共赢的原则，愿与全球合作伙伴共同开拓广阔的市场空间。",
              "pronunciation": "Wǒmen bǐngchí hùlì gòngyíng de yuánzé, yuàn yǔ quánqiú hézuò huǒbàn gòngtóng kāituò guǎngkuò de shìchǎng kōngjiān.",
              "meaningVi": "Chúng tôi giữ vững nguyên tắc đôi bên cùng có lợi, sẵn sàng cùng các đối tác toàn cầu mở rộng không gian thị trường rộng lớn."
            }
          },
          {
            "id": "zh_h5_1_4",
            "word": "让步",
            "pronunciation": "ràngbù",
            "hanViet": "NHƯỢNG BỘ",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Nhượng bộ, lùi một bước để đạt thỏa hiệp",
            "radicals": "让 (Nhượng - nhường lại) + 步 (Bộ - bước chân)",
            "grammarNote": "Đưa ra sự nhượng bộ: 做出让步.",
            "exampleSentence": {
              "target": "为了促成这项长远战略合作，我方在价格上做出了合理的让步。",
              "pronunciation": "Wèile cùchéng zhè xiàng chángyuǎn zhànlüè hézuò, wǒfāng zài jiàgé shang zuòchū le hélǐ de ràngbù.",
              "meaningVi": "Để thúc đẩy hợp tác chiến lược lâu dài này, phía chúng tôi đã đưa ra sự nhượng bộ hợp lý về mặt giá cả."
            }
          },
          {
            "id": "zh_h5_1_5",
            "word": "意向",
            "pronunciation": "yìxiàng",
            "hanViet": "Ý HƯỚNG",
            "partOfSpeech": "noun",
            "meaningVi": "Ý định, ý hướng hợp tác",
            "radicals": "意 (Ý - ý nghĩ) + 向 (Hướng - xu hướng)",
            "grammarNote": "Thư ngỏ ý định hợp tác: 合作意向书 (Letter of Intent - LOI).",
            "exampleSentence": {
              "target": "双方在博览会开幕当天便签署了总金额达五千万美元的合作意向书。",
              "pronunciation": "Shuāngfāng zài bólǎnhuì kāimù dāngtiān biàn qiānshǔ le zǒng jīné dá wǔ qiān wàn Měiyuán de hézuò yìxiàngshū.",
              "meaningVi": "Hai bên ngay ngày khai mạc hội chợ triển lãm đã ký kết bản ghi nhớ ý hướng hợp tác với tổng trị giá lên đến 50 triệu USD."
            }
          },
          {
            "id": "zh_h5_1_6",
            "word": "妥协",
            "pronunciation": "tuǒxié",
            "hanViet": "THỎA HIỆP",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Thỏa hiệp, cùng nhân nhượng để đạt hòa giải",
            "radicals": "妥 (Thỏa - êm đẹp, ổn thỏa) + 协 (Hiệp - cùng hòa thuận)",
            "grammarNote": "Không chịu thỏa hiệp: 绝不妥协.",
            "exampleSentence": {
              "target": "成熟的商务谈判往往是在坚持核心底线的前提下寻求务实的妥协。",
              "pronunciation": "Chéngshú de shāngwù tánpàn wǎngwǎng shì zài jiānchí héxīn dǐxiàn de qiántí xià xúnqiú wùshí de tuǒxié.",
              "meaningVi": "Cuộc đàm phán thương mại chín chắn thường là tìm kiếm sự thỏa hiệp thực tế trên tiền đề giữ vững lằn ranh đỏ cốt lõi."
            }
          },
          {
            "id": "zh_h5_1_7",
            "word": "原则",
            "pronunciation": "yuánzé",
            "hanViet": "NGUYÊN TẮC",
            "partOfSpeech": "noun",
            "meaningVi": "Nguyên tắc bất di bất dịch",
            "radicals": "原 (Nguyên - nguồn gốc ban đầu) + 则 (Tắc - phép tắc chuẩn mực)",
            "grammarNote": "Giữ vững nguyên tắc: 坚持原则.",
            "exampleSentence": {
              "target": "在产品质量安全问题上，我们没有任何可以退让的原则空间。",
              "pronunciation": "Zài chǎnpǐn zhìliàng ānquán wèntí shang, wǒmen méiyǒu rènhé kěyǐ tuìràng de yuánzé kōngjiān.",
              "meaningVi": "Trên vấn đề chất lượng an toàn sản phẩm, chúng tôi không có bất kỳ không gian nguyên tắc nào có thể lùi bước."
            }
          },
          {
            "id": "zh_h5_1_8",
            "word": "以",
            "pronunciation": "yǐ",
            "hanViet": "DĨ",
            "partOfSpeech": "preposition/conjunction",
            "meaningVi": "Dùng, lấy... để... (thư diện ngữ biểu thị mục đích, phương thức)",
            "radicals": "Chữ đơn giản cổ tượng hình người dùng đồ vật",
            "grammarNote": "Văn thư ngoại giao kinh tế rất chuộng dùng: 以期 (để mong), 以便 (để tiện cho).",
            "exampleSentence": {
              "target": "我们必须加快技术研发进度，以满足海内外客户对高性能产品的迫切需求。",
              "pronunciation": "Wǒmen bìxū jiākuài jìshù yánfā jìndù, yǐ mǎnzú hǎinèiwài kèhù duì gāo xìngnéng chǎnpǐn de pòqiè xūqiú.",
              "meaningVi": "Chúng ta bắt buộc phải đẩy nhanh tiến độ nghiên cứu kỹ thuật để đáp ứng nhu cầu cấp thiết của khách hàng trong và ngoài nước đối với sản phẩm tính năng cao."
            }
          }
        ]
      },
      {
        "id": "zh_hsk5_l2",
        "title": "Bài 2: Ký Kết Hợp Đồng & Điều Khoản Pháp Lý (Thư Diện Ngữ 为, 由)",
        "grammarFocus": "Thư diện ngữ 为 (wéi - được coi là / trở thành) & 由 (yóu - do ai chịu trách nhiệm: 费用由违约方承担).",
        "vocabularies": [
          {
            "id": "zh_h5_2_1",
            "word": "条款",
            "pronunciation": "tiáokuǎn",
            "hanViet": "ĐIỀU KHOẢN",
            "partOfSpeech": "noun",
            "meaningVi": "Điều khoản trong hợp đồng/văn bản pháp luật",
            "radicals": "条 (Điều - từng mục) + 款 (Khoản - tiết mục chi tiết)",
            "grammarNote": "Điều khoản bồi thường: 违约责任条款. Điều khoản bảo mật: 保密条款.",
            "exampleSentence": {
              "target": "在签字盖章之前，请法务人员再次逐字审核合同中的每一项条款。",
              "pronunciation": "Zài qiānzì gàizhāng zhīqián, qǐng fǎwù rényuán zàicì zhúzì shěnhé hétong zhōng de měi yì xiàng tiáokuǎn.",
              "meaningVi": "Trước khi ký tên đóng dấu, xin mời nhân viên pháp chế một lần nữa rà soát từng chữ từng mục trong các điều khoản hợp đồng."
            }
          },
          {
            "id": "zh_h5_2_2",
            "word": "违约",
            "pronunciation": "wéiyuē",
            "hanViet": "VI ƯỚC",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Vi phạm hợp đồng, bội ước",
            "radicals": "违 (Vi - làm trái) + 约 (Ước - lời ước hẹn, giao kèo)",
            "grammarNote": "Tiền phạt vi phạm hợp đồng: 违约金. Bên vi phạm: 违约方.",
            "exampleSentence": {
              "target": "若任何一方单方面中止履行合同，需向守约方支付巨额违约金。",
              "pronunciation": "Ruò rènhé yì fāng dānfāngmiàn zhōngzhǐ lǚxíng hétong, xū xiàng shǒuyuēfāng zhīfù jù'é wéiyuējīn.",
              "meaningVi": "Nếu bất kỳ bên nào đơn phương chấm dứt thực hiện hợp đồng, phải chi trả khoản tiền phạt vi ước khổng lồ cho bên thực hiện đúng hợp đồng."
            }
          },
          {
            "id": "zh_h5_2_3",
            "word": "履行",
            "pronunciation": "lǚxíng",
            "hanViet": "LÝ HÀNH",
            "partOfSpeech": "verb",
            "meaningVi": "Thực thi, thi hành nghĩa vụ hợp đồng",
            "radicals": "履 (Lý - bước chân, thực hiện) + 行 (Hành - tiến hành)",
            "grammarNote": "Thực hiện nghĩa vụ: 履行义务. Thực hiện hợp đồng: 履行合同.",
            "exampleSentence": {
              "target": "信守承诺、严格履行合同是企业立足商界的立身之本。",
              "pronunciation": "Xìnshǒu chéngnuò, yángé lǚxíng hétong shì qǐyè lìzú shāngjiè de lìshēn zhī běn.",
              "meaningVi": "Giữ trọn lời hứa, thực thi nghiêm ngặt hợp đồng là cái gốc đứng vững của doanh nghiệp trên thương trường."
            }
          },
          {
            "id": "zh_h5_2_4",
            "word": "生效",
            "pronunciation": "shēngxiào",
            "hanViet": "SINH HIỆU",
            "partOfSpeech": "verb",
            "meaningVi": "Có hiệu lực pháp lý",
            "radicals": "生 (Sinh - phát sinh) + 效 (Hiệu - hiệu lực)",
            "grammarNote": "Bắt đầu có hiệu lực: 正式生效. Hết hiệu lực: 失效.",
            "exampleSentence": {
              "target": "本协议自甲乙双方法定代表人签字并加盖公章之日起正式生效。",
              "pronunciation": "Běn xiéyì zì Jiǎ-Yǐ shuāngfāng fǎdìng dàibiǎorén qiānzì bìng jiāgài gōngzhāng zhī rì qǐ zhèngshì shēngxiào.",
              "meaningVi": "Thỏa thuận này chính thức có hiệu lực kể từ ngày người đại diện theo pháp luật của hai bên Bên A và Bên B ký tên và đóng dấu pháp nhân."
            }
          },
          {
            "id": "zh_h5_2_5",
            "word": "甲方",
            "pronunciation": "jiǎfāng",
            "hanViet": "GIÁP PHƯƠNG",
            "partOfSpeech": "noun",
            "meaningVi": "Bên A (trong hợp đồng pháp lý)",
            "radicals": "甲 (Giáp - vị trí thứ nhất trong Thập can) + 方 (Bên)",
            "grammarNote": "Bên B: 乙方. Bên C (bên thứ ba): 丙方.",
            "exampleSentence": {
              "target": "甲方承诺在收到合格货物后的五个工作日内向乙方支付全部尾款。",
              "pronunciation": "Jiǎfāng chéngnuò zài shōudào hégé huòwù hòu de wǔ ge gōngzuòrì nèi xiàng Yǐfāng zhīfù quánbù wěikuǎn.",
              "meaningVi": "Bên A cam kết trong vòng 5 ngày làm việc sau khi nhận được hàng đạt chuẩn sẽ thanh toán toàn bộ số tiền còn lại cho Bên B."
            }
          },
          {
            "id": "zh_h5_2_6",
            "word": "争议",
            "pronunciation": "zhēngyì",
            "hanViet": "TRANH NGHỊ",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Tranh chấp, bất đồng quan điểm pháp lý",
            "radicals": "争 (Tranh - tranh giành) + 议 (Nghị - tranh luận)",
            "grammarNote": "Giải quyết tranh chấp: 争议解决. Trọng tài thương mại: 仲裁 (zhòngcái).",
            "exampleSentence": {
              "target": "因本合同引起的或与本合同有关的任何争议，双方应首先通过友好协商解决。",
              "pronunciation": "Yīn běn hétong yǐnqǐ de huò yǔ běn hétong yǒuguān de rènhé zhēngyì, shuāngfāng yīng shǒuxiān tōngguò yǒuhǎo xiéshāng jiějué.",
              "meaningVi": "Bất kỳ tranh chấp nào phát sinh do hoặc liên quan đến hợp đồng này, hai bên trước tiên cần giải quyết thông qua hiệp thương hữu nghị."
            }
          },
          {
            "id": "zh_h5_2_7",
            "word": "由",
            "pronunciation": "yóu",
            "hanViet": "DO",
            "partOfSpeech": "preposition",
            "meaningVi": "Do... đảm nhận, bởi... phụ trách (thư diện ngữ)",
            "radicals": "Tự nhiên từ nguồn gốc",
            "grammarNote": "Cấu trúc thư diện ngữ trang trọng: 由+Chủ thể+Động từ: 该项费用由承运人承担.",
            "exampleSentence": {
              "target": "因不可抗力导致货物受损的一切责任，由承保的保险公司负责赔偿。",
              "pronunciation": "Yīn bùkěkànglì dǎozhì huòwù shòusǔn de yíqiè zérèn, yóu chéngbǎo de bǎoxiǎn gōngsī fùzé péicháng.",
              "meaningVi": "Mọi trách nhiệm hàng hóa hư hại do trường hợp bất khả kháng, do công ty bảo hiểm nhận bảo hiểm chịu trách nhiệm bồi thường."
            }
          },
          {
            "id": "zh_h5_2_8",
            "word": "为",
            "pronunciation": "wéi",
            "hanViet": "VI / VỊ",
            "partOfSpeech": "verb/preposition",
            "meaningVi": "Làm, coi như, trở thành (thư diện ngữ)",
            "radicals": "Chữ Hán phồn thể 為",
            "grammarNote": "Văn phong văn bản: 以...为准 (Lấy... làm chuẩn).",
            "exampleSentence": {
              "target": "若中英文两个版本产生歧义，一律以中文正本的内容为准。",
              "pronunciation": "Ruò Zhōng-Yīng liǎng ge bǎnběn chǎnshēng qíyì, yílǜ yǐ Zhōngwén zhèngběn de nèiróng wéizhǔn.",
              "meaningVi": "Nếu giữa hai phiên bản tiếng Trung và tiếng Anh nảy sinh cách hiểu khác nhau, hoàn toàn lấy nội dung bản gốc tiếng Trung làm chuẩn."
            }
          }
        ]
      },
      {
        "id": "zh_hsk5_l3",
        "title": "Bài 3: Phân Tích Thị Trường Chứng Khoán & Thư Diện Ngữ 在于, 进而",
        "grammarFocus": "Thư diện ngữ 在于 (Zàiyú - Nằm ở chỗ: 成功的关键在于细节) & 进而 (Jìn'ér - Hơn nữa/Tiến thêm một bước: 深入调研，进而制定长远策略).",
        "vocabularies": [
          {
            "id": "zh_h5_3_1",
            "word": "股票",
            "pronunciation": "gǔpiào",
            "hanViet": "CỔ PHIẾU",
            "partOfSpeech": "noun",
            "meaningVi": "Cổ phiếu trên thị trường chứng khoán",
            "radicals": "股 (Cổ - phần chia) + 票 (Phiếu - chứng thư)",
            "grammarNote": "Thị trường chứng khoán: 股市. Mua bán cổ phiếu: 炒股.",
            "exampleSentence": {
              "target": "股市投资具有较高的收益潜力，但同时也伴随着不可忽视的市场风险。",
              "pronunciation": "Gǔshì tóuzī jùyǒu gāodāng de shōuyì qiánlì, dàn tóngshí yě bànsuízhe bù kě hūshì de shìchǎng fēngxiǎn.",
              "meaningVi": "Đầu tư chứng khoán có tiềm năng thu lợi nhuận cao, nhưng đồng thời cũng kèm theo rủi ro thị trường không thể xem nhẹ."
            }
          },
          {
            "id": "zh_h5_3_2",
            "word": "波动",
            "pronunciation": "bōdòng",
            "hanViet": "BA ĐỘNG",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Biến động, dao động lên xuống",
            "radicals": "波 (Ba - làn sóng nước) + 动 (Động - chuyển động)",
            "grammarNote": "Biến động giá: 价格剧烈波动.",
            "exampleSentence": {
              "target": "受国际大宗商品价格波动的影响，原油进口成本大幅攀升。",
              "pronunciation": "Shòu guójì dàzōng shāngpǐn jiàgé bōdòng de yǐngxiǎng, yuányóu jìnkǒu chéngběn dàfú pānshēng.",
              "meaningVi": "Chịu ảnh hưởng bởi biến động giá hàng hóa cơ bản quốc tế, chi phí nhập khẩu dầu thô đã tăng mạnh."
            }
          },
          {
            "id": "zh_h5_3_3",
            "word": "指数",
            "pronunciation": "zhǐshù",
            "hanViet": "CHỈ SỐ",
            "partOfSpeech": "noun",
            "meaningVi": "Chỉ số đo lường kinh tế/thị trường",
            "radicals": "指 (Chỉ - chỉ tay, biểu thị) + 数 (Số - số liệu)",
            "grammarNote": "Chỉ số giá tiêu dùng: 居民消费价格指数 (CPI). Chỉ số chứng khoán: 上证指数.",
            "exampleSentence": {
              "target": "上证综合指数在利好政策的推动下连续突破多个关键阻力位。",
              "pronunciation": "Shàngzhèng zōnghé zhǐshù zài lìhǎo zhèngcè de tuīdòng xià liánxù tūpò duō ge guānjiàn zǔlìwèi.",
              "meaningVi": "Chỉ số tổng hợp Thượng Hải dưới sự thúc đẩy của chính sách có lợi đã liên tục bứt phá qua nhiều ngưỡng kháng cự then chốt."
            }
          },
          {
            "id": "zh_h5_3_4",
            "word": "在于",
            "pronunciation": "zàiyú",
            "hanViet": "TẠI Ư",
            "partOfSpeech": "verb",
            "meaningVi": "Cốt lõi nằm ở chỗ, do... quyết định (thư diện ngữ)",
            "radicals": "在 (Tại - ở) + 于 (Ư - tại)",
            "grammarNote": "Cụm từ kinh điển: 问题的核心在于...",
            "exampleSentence": {
              "target": "价值投资的精髓不仅在于发现被低估的企业，更在于能够耐得住寂寞长期持有。",
              "pronunciation": "Jiàzhí tóuzī de jīngsuǐ bùjǐn zàiyú fāxiàn bèi dīgū de qǐyè, gèng zàiyú nénggòu nài de zhù jìmò chángqī chíyǒu.",
              "meaningVi": "Tinh hoa của đầu tư giá trị không chỉ nằm ở việc phát hiện doanh nghiệp bị định giá thấp, mà hơn thế còn nằm ở việc có thể chịu đựng được sự cô đơn để nắm giữ dài hạn."
            }
          },
          {
            "id": "zh_h5_3_5",
            "word": "进而",
            "pronunciation": "jìn'ér",
            "hanViet": "TIẾN NHI",
            "partOfSpeech": "conjunction",
            "meaningVi": "Tiến thêm một bước, sau đó hơn nữa (thư diện ngữ)",
            "radicals": "进 (Tiến - tiến lên) + 而 (Nhi - mà)",
            "grammarNote": "Biểu thị sự phát triển nâng cao lên nấc thang tiếp theo.",
            "exampleSentence": {
              "target": "央行下调存款准备金率以释放流动性，进而刺激实体经济的信贷增长。",
              "pronunciation": "Yāngháng xiàtiáo cúnkuǎn zhǔnbèijīn lǜ yǐ shìfàng liúdòngxìng, jìn'ér cìjī shítǐ jīngjì de xìndài zēngzhǎng.",
              "meaningVi": "Ngân hàng trung ương hạ tỷ lệ dự trữ bắt buộc để giải phóng thanh khoản, tiến thêm một bước kích thích tăng trưởng tín dụng cho nền kinh tế thực."
            }
          },
          {
            "id": "zh_h5_3_6",
            "word": "牛市",
            "pronunciation": "niúshì",
            "hanViet": "NGƯU THỊ",
            "partOfSpeech": "noun",
            "meaningVi": "Thị trường giá lên, thị trường bò tót (Bull market)",
            "radicals": "牛 (Ngưu - con bò húc sừng lên) + 市 (Thị - thị trường)",
            "grammarNote": "Trái nghĩa: 熊市 (xióngshì - thị trường gấu đập xuống, Bear market).",
            "exampleSentence": {
              "target": "伴随着经济数据的全面回暖，很多分析师预测新一轮结构性牛市即将来临。",
              "pronunciation": "Bànsuízhe jīngjì shùjù de quánmiàn huínuǎn, hěn duō fēnxīshī yùcè xīn yì lún jiégòuxìng niúshì jíjiāng láilín.",
              "meaningVi": "Đi kèm với số liệu kinh tế ấm lên toàn diện, rất nhiều chuyên gia phân tích dự đoán một đợt thị trường bò tót mang tính cấu trúc mới sắp sửa kéo đến."
            }
          },
          {
            "id": "zh_h5_3_7",
            "word": "资产",
            "pronunciation": "zīchǎn",
            "hanViet": "TƯ SẢN",
            "partOfSpeech": "noun",
            "meaningVi": "Tài sản",
            "radicals": "资 (Tư - tiền tài) + 产 (Sản - sản nghiệp)",
            "grammarNote": "Phân bổ tài sản: 资产配置. Quản lý tài sản: 资产管理.",
            "exampleSentence": {
              "target": "合理的多元化资产配置能够有效平滑投资组合的整体收益波动。",
              "pronunciation": "Hélǐ de duōyuánhuà zīchǎn pèizhì nénggòu yǒuxiào pínghuá tóuzī zǔhé de zhěngtǐ shōuyì bōdòng.",
              "meaningVi": "Phân bổ tài sản đa dạng hóa hợp lý có thể làm mượt mà sự biến động lợi nhuận tổng thể của danh mục đầu tư một cách hiệu quả."
            }
          },
          {
            "id": "zh_h5_3_8",
            "word": "收益",
            "pronunciation": "shōuyì",
            "hanViet": "THU ÍCH",
            "partOfSpeech": "noun",
            "meaningVi": "Lợi nhuận thu được, tỷ suất sinh lời",
            "radicals": "收 (Thu - nhận về) + 益 (Ích - lợi ích)",
            "grammarNote": "Lợi nhuận đi kèm rủi ro: 高风险高收益.",
            "exampleSentence": {
              "target": "投资者在追求高额预期收益的同时，绝不可忽视本金的安全保障。",
              "pronunciation": "Tóuzīzhě zài zhuīqiú gāo'é yùqī shōuyì de tóngshí, jué bù kě hūshì běnjīn de ānquán bǎozhàng.",
              "meaningVi": "Các nhà đầu tư khi mưu cầu lợi nhuận kỳ vọng cao ngất, tuyệt đối không được xem nhẹ bảo đảm an toàn cho số vốn gốc."
            }
          }
        ]
      },
      {
        "id": "zh_hsk5_l4",
        "title": "Bài 4: Triết Lý Nhân Sinh & Thư Diện Ngữ 未免, 何必",
        "grammarFocus": "Thư diện ngữ 未免 (Wèimiǎn - Không tránh khỏi/Có phần hơi quá: 这样评价未免有失偏颇) & 何必 (Hébì - Hà tất/Cần gì phải: 既然已经尽力，又何必自责).",
        "vocabularies": [
          {
            "id": "zh_h5_4_1",
            "word": "未免",
            "pronunciation": "wèimiǎn",
            "hanViet": "VỊ MIỄN",
            "partOfSpeech": "adverb",
            "meaningVi": "Không tránh khỏi, e rằng hơi quá (dùng giảm bớt sự gay gắt)",
            "radicals": "未 (Vị - chưa) + 免 (Miễn - tránh khỏi)",
            "grammarNote": "Thường đứng trước tính từ: 未免太严格, 未免有点过分.",
            "exampleSentence": {
              "target": "仅仅凭一次偶然的失误就全盘否定一个人的能力，未免太武断了。",
              "pronunciation": "Jǐnjǐn píng yí cì ǒurán de shīwù jiù quánpán fǒudìng yí ge rén de nénglì, wèimiǎn tài wǔduàn le.",
              "meaningVi": "Chỉ dựa vào một lần sai sót ngẫu nhiên mà đã phủ định sạch trơn năng lực của một con người, e rằng có phần quá độc đoán."
            }
          },
          {
            "id": "zh_h5_4_2",
            "word": "何必",
            "pronunciation": "hébì",
            "hanViet": "HÀ TẤT",
            "partOfSpeech": "adverb",
            "meaningVi": "Hà tất, việc gì phải, đâu cần thiết",
            "radicals": "何 (Hà - cái gì, làm sao) + 必 (Tất - nhất thiết)",
            "grammarNote": "Phó từ phản vấn biểu thị việc đó là không cần thiết: 何必当初 (Hà tất lúc đầu).",
            "exampleSentence": {
              "target": "过去的事情既然无法挽回，我们又何必整天沉浸在痛苦的悔恨之中？",
              "pronunciation": "Guòqu de shìqing jìrán wúfǎ wǎnhuí, wǒmen yòu hébì zhěngtiān chénjìn zài tòngkǔ de huǐhèn zhīzhōng?",
              "meaningVi": "Những chuyện trong quá khứ một khi đã không thể vãn hồi, chúng ta hà tất phải chìm đắm trong ân hận đau đớn cả ngày?"
            }
          },
          {
            "id": "zh_h5_4_3",
            "word": "境界",
            "pronunciation": "jìngjiè",
            "hanViet": "CẢNH GIỚI",
            "partOfSpeech": "noun",
            "meaningVi": "Cảnh giới tinh thần, tầng bậc nhận thức",
            "radicals": "境 (Cảnh - cõi lòng) + 界 (Giới - ranh giới)",
            "grammarNote": "Cảnh giới tư tưởng: 思想境界.",
            "exampleSentence": {
              "target": "宠辱不惊、去留无意，展现的是一种超然物外的人生崇高境界。",
              "pronunciation": "Chǒngrǔbùjīng, qùliúwúyì, zhǎnxiàn de shì yì zhǒng chāoránwùwài de rénshēng chónggāo jìngjiè.",
              "meaningVi": "Vinh hay nhục đều không kinh sợ, đi hay ở chẳng bận lòng, thể hiện một cảnh giới nhân sinh thanh cao siêu thoát sự đời."
            }
          },
          {
            "id": "zh_h5_4_4",
            "word": "豁达",
            "pronunciation": "huòdá",
            "hanViet": "HOÁT ĐẠT",
            "partOfSpeech": "adj",
            "meaningVi": "Khoáng đạt, cởi mở bao dung",
            "radicals": "豁 (Hoát - rộng mở) + 达 (Đạt - thông đạt)",
            "grammarNote": "Tâm thái khoáng đạt: 豁达的心态.",
            "exampleSentence": {
              "target": "面对人生的坎坷与逆境，保持豁达乐观的心境至关重要。",
              "pronunciation": "Miànduì rénshēng de kǎnkě yǔ nìjìng, bǎochí huòdá lèguān de xīnjìng zhìguān zhòngyào.",
              "meaningVi": "Đối mặt với những gập ghềnh và nghịch cảnh của đời người, giữ được tâm trạng khoáng đạt lạc quan là vô cùng hệ trọng."
            }
          },
          {
            "id": "zh_h5_4_5",
            "word": "舍得",
            "pronunciation": "shěde",
            "hanViet": "XẢ ĐẮC",
            "partOfSpeech": "verb",
            "meaningVi": "Sẵn sàng từ bỏ, xả được (Triết lý Có buông bỏ mới có nhận lại)",
            "radicals": "舍 (Xả - buông bỏ, cho đi) + 得 (Đắc - nhận lại, đạt được)",
            "grammarNote": "Thành ngữ: 有舍才有得 (Có xả mới có đắc).",
            "exampleSentence": {
              "target": "在人生的重要十字路口，唯有懂得舍得，才能拥有更加广阔的天地。",
              "pronunciation": "Zài rénshēng de zhòngyào shízì lùkǒu, wéiyǒu dǒngde shěde, cái néng yōngyǒu gèngjiā guǎngkuò de tiāndì.",
              "meaningVi": "Tại ngã tư đường quan trọng của cuộc đời, chỉ khi hiểu được triết lý buông xả, mới có thể sở hữu một chân trời rộng mở hơn."
            }
          },
          {
            "id": "zh_h5_4_6",
            "word": "品德",
            "pronunciation": "pǐndé",
            "hanViet": "PHẨM ĐỨC",
            "partOfSpeech": "noun",
            "meaningVi": "Phẩm chất đạo đức của người quân tử",
            "radicals": "品 (Phẩm - phẩm cách) + 德 (Đức - đạo đức)",
            "grammarNote": "Phẩm đức cao thượng: 高尚的品德.",
            "exampleSentence": {
              "target": "才华固然重要，但优秀的品德才是决定一个人能走多远的根本。",
              "pronunciation": "Cáihuá gùrán zhòngyào, dàn yōuxiù de pǐndé cái shì juédìng yí ge rén néng zǒu duō yuǎn de gēnběn.",
              "meaningVi": "Tài năng tất nhiên quan trọng, nhưng phẩm đức xuất sắc mới là gốc rễ quyết định một con người có thể đi xa đến đâu."
            }
          },
          {
            "id": "zh_h5_4_7",
            "word": "从容",
            "pronunciation": "cóngróng",
            "hanViet": "THUNG DUNG",
            "partOfSpeech": "adj/adverb",
            "meaningVi": "Thong thả ung dung, điềm tĩnh",
            "radicals": "从 (Thung - thong thả) + 容 (Dung - dung mạo)",
            "grammarNote": "Đối mặt bình thản: 从容面对.",
            "exampleSentence": {
              "target": "真正有智慧的人无论身处顺境还是逆境，都能做到从容自若。",
              "pronunciation": "Zhēnzhèng yǒu zhìhuì de rén wúlùn shēnchǔ shùnjìng háishì nìjìng, dōu néng zuòdào cóngróng zìruò.",
              "meaningVi": "Người thực sự có trí tuệ bất luận đang ở trong thuận cảnh hay nghịch cảnh, đều có thể ung dung điềm đạm như không."
            }
          },
          {
            "id": "zh_h5_4_8",
            "word": "修养",
            "pronunciation": "xiūyǎng",
            "hanViet": "TU DƯỠNG",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Sự tu dưỡng, hàm dưỡng văn hóa và nhân cách",
            "radicals": "修 (Tu - trau dồi sửa mình) + 养 (Dưỡng - nuôi dưỡng tâm tính)",
            "grammarNote": "Có tu dưỡng cao: 很有修养.",
            "exampleSentence": {
              "target": "在公共场合不大声喧哗并主动考虑他人的感受，是一个人良好修养的体现。",
              "pronunciation": "Zài gōnggòng chǎnghé bú dàshēng xuānhuá bìng zhǔdòng kǎolǜ tārén de gǎnshòu, shì yí ge rén liánghǎo xiūyǎng de tǐxiàn.",
              "meaningVi": "Ở nơi công cộng không nói cười ồn ào và chủ động nghĩ cho cảm nhận của người khác là sự thể hiện tu dưỡng tốt đẹp của một con người."
            }
          }
        ]
      },
      {
        "id": "zh_hsk5_l5",
        "title": "Bài 5: Quản Trị Rủi Ro & Phân Biệt Từ Đồng Nghĩa 辨别 vs 鉴别",
        "grammarFocus": "Phân biệt từ đồng nghĩa cao cấp: 辨别 (Biànbié - Phân biệt đúng sai, phương hướng) vs 鉴别 (Jiànbié - Giám định, thẩm định chuyên môn thật giả: 鉴别真伪, 鉴别文物).",
        "vocabularies": [
          {
            "id": "zh_h5_5_1",
            "word": "鉴别",
            "pronunciation": "jiànbié",
            "hanViet": "GIÁM BIỆT",
            "partOfSpeech": "verb",
            "meaningVi": "Giám định, thẩm định chuyên sâu phân định thật giả",
            "radicals": "鉴 (Giám - soi xét gương đồng, kiểm định) + 别 (Biệt - phân biệt)",
            "grammarNote": "Khác với 辨别 (chỉ phân biệt thông thường bằng mắt/tai). 鉴别文物, 鉴别真伪.",
            "exampleSentence": {
              "target": "专家通过科学的光谱分析技术，成功鉴别出了这幅古画的真伪。",
              "pronunciation": "Zhuānjiā tōngguò kēxué de guāngpǔ fēnxī jìshù, chénggōng jiànbié chū le zhè fú gǔhuà de zhēnwěi.",
              "meaningVi": "Chuyên gia thông qua kỹ thuật phân tích quang phổ khoa học đã giám định thành công thật giả của bức tranh cổ này."
            }
          },
          {
            "id": "zh_h5_5_2",
            "word": "危机",
            "pronunciation": "wēijī",
            "hanViet": "NGUY CƠ",
            "partOfSpeech": "noun",
            "meaningVi": "Khủng hoảng, mối nguy cơ tiềm ẩn",
            "radicals": "危 (Nguy - nguy hiểm) + 机 (Cơ - cơ hội tiềm tàng)",
            "grammarNote": "Xử lý khủng hoảng PR: 危机公关. Khủng hoảng tài chính: 金融危机.",
            "exampleSentence": {
              "target": "企业公关部门在突发舆论危机爆发后两小时内迅速发布了声明。",
              "pronunciation": "Qǐyè gōngguān bùmén zài tūfā yúlùn wēijī bàofā hòu liǎng xiǎoshí nèi xùnsù fābù le shēngmíng.",
              "meaningVi": "Phòng quan hệ công chúng của doanh nghiệp trong vòng 2 giờ sau khi nổ ra khủng hoảng dư luận đột xuất đã nhanh chóng phát đi thông cáo."
            }
          },
          {
            "id": "zh_h5_5_3",
            "word": "预警",
            "pronunciation": "yùjǐng",
            "hanViet": "DỰ CẢNH",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Cảnh báo sớm, dự báo nguy cơ",
            "radicals": "预 (Dự - chuẩn bị trước) + 警 (Cảnh - cảnh giác, báo động)",
            "grammarNote": "Cơ chế cảnh báo rủi ro: 风险预警机制.",
            "exampleSentence": {
              "target": "建立健全财务风险预警系统能帮助管理层及时防范资金链断裂的危险。",
              "pronunciation": "Jiànlì jiànquán cáiwù fēngxiǎn yùjǐng xìtǒng néng bāngzhù guǎnlǐcéng jíshí fángfàn zījīnliàn duànliè de wēixiǎn.",
              "meaningVi": "Xây dựng hoàn thiện hệ thống cảnh báo sớm rủi ro tài chính có thể giúp ban quản trị kịp thời phòng ngừa nguy cơ đứt gãy chuỗi dòng tiền."
            }
          },
          {
            "id": "zh_h5_5_4",
            "word": "公关",
            "pronunciation": "gōngguān",
            "hanViet": "CÔNG QUAN",
            "partOfSpeech": "noun",
            "meaningVi": "Quan hệ công chúng (Public Relations - PR)",
            "radicals": "公 (Công - công chúng) + 关 (Quan - quan hệ)",
            "grammarNote": "Thường nói: 做好危机公关 (Làm tốt PR khủng hoảng).",
            "exampleSentence": {
              "target": "诚恳透明的沟通态度是做好企业危机公关的最有效钥匙。",
              "pronunciation": "Chéngkěn tòumíng de gōutōng tàidu shì zuò hǎo qǐyè wēijī gōngguān de zuì yǒuxiào yàoshi.",
              "meaningVi": "Thái độ giao tiếp chân thành và minh bạch là chiếc chìa khóa hiệu quả nhất để làm tốt PR khủng hoảng doanh nghiệp."
            }
          },
          {
            "id": "zh_h5_5_5",
            "word": "声誉",
            "pronunciation": "shēngyù",
            "hanViet": "THANH DỰ",
            "partOfSpeech": "noun",
            "meaningVi": "Danh tiếng, uy tín thương hiệu",
            "radicals": "声 (Thanh - danh tiếng vang xa) + 誉 (Dự - ca ngợi khen ngợi)",
            "grammarNote": "Tổn hại danh tiếng: 损害企业声誉.",
            "exampleSentence": {
              "target": "良好的商业声誉需要数十年如一日的积累，毁掉它却往往只需要几分钟。",
              "pronunciation": "Liánghǎo de shāngyè shēngyù xūyào shù shí nián rú yí rì de jīlěi, huǐdiào tā què wǎngwǎng zhǐ xūyào jǐ fēnzhōng.",
              "meaningVi": "Danh tiếng thương mại tốt đẹp cần tích lũy mấy chục năm như một, nhưng phá hủy nó lại thường chỉ cần vài phút."
            }
          },
          {
            "id": "zh_h5_5_6",
            "word": "妥善",
            "pronunciation": "tuǒshàn",
            "hanViet": "THỎA THIỆN",
            "partOfSpeech": "adj/adverb",
            "meaningVi": "Thỏa đáng, chu toàn vẹn toàn",
            "radicals": "妥 (Thỏa - êm đẹp) + 善 (Thiện - tốt lành)",
            "grammarNote": "Xử lý ổn thỏa: 妥善处理.",
            "exampleSentence": {
              "target": "经过管理层的妥善安置，客户对于本次系统故障的赔偿方案表示满意。",
              "pronunciation": "Jīngguò guǎnlǐcéng de tuǒshàn ānzhì, kèhù duìyú běncì xìtǒng gùzhàng de péicháng fāng'àn biǎoshì mǎnyì.",
              "meaningVi": "Sau sự thu xếp thỏa đáng của ban quản lý, khách hàng đã bày tỏ hài lòng đối với phương án bồi thường sự cố hệ thống lần này."
            }
          },
          {
            "id": "zh_h5_5_7",
            "word": "辨别",
            "pronunciation": "biànbié",
            "hanViet": "BIỆN BIỆT",
            "partOfSpeech": "verb",
            "meaningVi": "Nhận biết, phân biệt thông thường",
            "radicals": "辨 (Biện - phân tích) + 别 (Biệt - rạch ròi)",
            "grammarNote": "Phân biệt đúng sai: 辨别是非. Phân biệt phương hướng: 辨别方向.",
            "exampleSentence": {
              "target": "在纷繁复杂的网络信息中，我们应当培养自己独立辨别真伪是非的能力。",
              "pronunciation": "Zài fēnfán fùzá de wǎngluò xìnxī zhōng, wǒmen yīngdāng péiyǎng zìjǐ dúlì biànbié zhēnwěi shìfēi de nénglì.",
              "meaningVi": "Giữa thông tin mạng bề bộn phức tạp, chúng ta nên bồi dưỡng năng lực độc lập phân biệt thật giả đúng sai của chính mình."
            }
          },
          {
            "id": "zh_h5_5_8",
            "word": "对策",
            "pronunciation": "duìcè",
            "hanViet": "ĐỐI SÁCH",
            "partOfSpeech": "noun",
            "meaningVi": "Đối sách, biện pháp ứng phó",
            "radicals": "对 (Đối - ứng đối) + 策 (Sách - mưu sách, kế sách)",
            "grammarNote": "Binh pháp tục ngữ: 兵来将挡，水来土掩 (Có đối sách cho mọi biến cố).",
            "exampleSentence": {
              "target": "面对竞争对手挑起的价格战，公司董事会迅速研究并制定出了强有力的应对对策。",
              "pronunciation": "Miànduì jìngzhēng duìshǒu tiǎoqǐ de jiàgézhàn, gōngsī dǒngshìhuì xùnsù yánjiū bìng zhìdìng chū le qiángyǒulì de yìngduì duìcè.",
              "meaningVi": "Đối mặt với cuộc chiến giá cả do đối thủ cạnh tranh khơi mào, hội đồng quản trị công ty đã nhanh chóng nghiên cứu và vạch ra đối sách ứng phó mạnh mẽ."
            }
          }
        ]
      },
      {
        "id": "zh_hsk5_l6",
        "title": "Bài 6: Báo Chí Chính Luận & Cấu Trúc Nhấn Mạnh 固然...但是...",
        "grammarFocus": "Cấu trúc tương phản 固然...但是...: Dẫu rằng... là đúng nhưng... (经济增长固然重要，但是环境保护更是长远大计).",
        "vocabularies": [
          {
            "id": "zh_h5_6_1",
            "word": "舆论",
            "pronunciation": "yúlùn",
            "hanViet": "DƯ LUẬN",
            "partOfSpeech": "noun",
            "meaningVi": "Dư luận xã hội, tiếng nói công chúng",
            "radicals": "舆 (Dư - cỗ xe chở đông người, đại chúng) + 论 (Luận - bàn luận)",
            "grammarNote": "Định hướng dư luận: 引导舆论. Dư luận xã hội: 社会舆论.",
            "exampleSentence": {
              "target": "新闻媒体在针砭时弊和引导健康社会舆论方面发挥着不可替代的作用。",
              "pronunciation": "Xīnwén méitǐ zài zhēnbiān shíbì hé yǐndǎo jiànkāng shèhuì yúlùn fāngmiàn fāhuīzhe bù kě tìdài de zuòyòng.",
              "meaningVi": "Báo chí truyền thông trong việc châm biếm tệ nạn thời cuộc và định hướng dư luận xã hội lành mạnh đang phát huy tác dụng không thể thay thế."
            }
          },
          {
            "id": "zh_h5_6_2",
            "word": "固然",
            "pronunciation": "gùrán",
            "hanViet": "CỐ NHIÊN",
            "partOfSpeech": "conjunction",
            "meaningVi": "Tất nhiên, dẫu biết rằng như vậy là đúng",
            "radicals": "固 (Cố - kiên cố, chắc chắn) + 然 (Nhiên - như thế)",
            "grammarNote": "Thư diện ngữ thừa nhận vế trước để chuyển ý mạnh ở vế sau với 但是/可是.",
            "exampleSentence": {
              "target": "追求短期的经济效益固然重要，但是走绿色可持续发展道路才是关乎子孙后代的千秋大业。",
              "pronunciation": "Zhuīqiú duǎnqī de jīngjì xiàoyì gùrán zhòngyào, dànshì zǒu lǜsè kěchíxù fāzhǎn dàolù cái shì guānhū zǐsūn hòudài de qiānqiū dàyè.",
              "meaningVi": "Mưu cầu hiệu ích kinh tế ngắn hạn dẫu rằng quan trọng, nhưng đi theo con đường phát triển xanh bền vững mới là đại nghiệp ngàn thu liên quan đến con cháu mai sau."
            }
          },
          {
            "id": "zh_h5_6_3",
            "word": "深度",
            "pronunciation": "shēndù",
            "hanViet": "THÂM ĐỘ",
            "partOfSpeech": "noun/adj",
            "meaningVi": "Chiều sâu phân tích, sâu sắc",
            "radicals": "深 (Thâm - sâu thẳm) + 度 (Độ - mức độ)",
            "grammarNote": "Phóng sự chuyên sâu: 深度报道. Tư duy sâu sắc: 深度思考.",
            "exampleSentence": {
              "target": "这篇深度调查报道揭露了行业内部鲜为人知的灰色产业链。",
              "pronunciation": "Zhè piān shēndù diàochá bàodào jiēlù le hángyè nèibù xiǎnwéirénzhī de huīsè chǎnyèliàn.",
              "meaningVi": "Bản tin điều tra chuyên sâu này đã vạch trần chuỗi ngành nghề màu xám ít người biết đến bên trong ngành."
            }
          },
          {
            "id": "zh_h5_6_4",
            "word": "焦点",
            "pronunciation": "jiāodiǎn",
            "hanViet": "TIÊU ĐIỂM",
            "partOfSpeech": "noun",
            "meaningVi": "Tiêu điểm, tâm điểm của sự chú ý",
            "radicals": "焦 (Tiêu - hội tụ điểm cháy) + 点 (Điểm)",
            "grammarNote": "Trở thành tâm điểm: 成为社会关注的焦点.",
            "exampleSentence": {
              "target": "如何保障人工智能时代的就业稳定成为了今年国际峰会的讨论焦点。",
              "pronunciation": "Rúhé bǎozhàng réngōng zhìnéng shídài de jiùyè wěndìng chéngwéi le jīnnián guójì fēnghuì de tǎolùn jiāodiǎn.",
              "meaningVi": "Làm thế nào để bảo đảm ổn định việc làm trong kỷ nguyên trí tuệ nhân tạo đã trở thành tâm điểm thảo luận của hội nghị thượng đỉnh quốc tế năm nay."
            }
          },
          {
            "id": "zh_h5_6_5",
            "word": "客观",
            "pronunciation": "kèguān",
            "hanViet": "KHÁCH QUAN",
            "partOfSpeech": "adj",
            "meaningVi": "Khách quan, trung thực không thiên vị",
            "radicals": "客 (Khách - người ngoài cuộc) + 观 (Quan - quan sát)",
            "grammarNote": "Trái nghĩa với 主观 (zhǔguān - chủ quan).",
            "exampleSentence": {
              "target": "优秀的记者在报道复杂社会事件时应当恪守客观公正的职业操守。",
              "pronunciation": "Yōuxiù de jìzhě zài bàodào fùzá shèhuì shìjiàn shí yīngdāng kèshǒu kèguān gōngzhèng de zhíyè cāoshǒu.",
              "meaningVi": "Nhà báo xuất sắc khi đưa tin các sự kiện xã hội phức tạp cần phải tuân thủ nghiêm ngặt chuẩn mực đạo đức nghề nghiệp khách quan công bằng."
            }
          },
          {
            "id": "zh_h5_6_6",
            "word": "抨击",
            "pronunciation": "pēngjī",
            "hanViet": "PHANH KÍCH",
            "partOfSpeech": "verb",
            "meaningVi": "Công kích, chỉ trích gay gắt bằng ngôn từ",
            "radicals": "抨 (Phanh - bắn dây cung, luận tội) + 击 (Kích - tấn công)",
            "grammarNote": "Thư diện ngữ chính luận.",
            "exampleSentence": {
              "target": "评论员在社论中严厉抨击了某些垄断企业侵害消费者权益的行为。",
              "pronunciation": "Pínglùnyuán zài shèlùn zhōng yánlì pēngjī le mǒuxiē lǒngduàn qǐyè qīnhài xiāofèizhě quányì de xíngwéi.",
              "meaningVi": "Bình luận viên trong bài xã luận đã chỉ trích gay gắt hành vi xâm hại quyền lợi người tiêu dùng của một số doanh nghiệp độc quyền."
            }
          },
          {
            "id": "zh_h5_6_7",
            "word": "倡导",
            "pronunciation": "chàngdǎo",
            "hanViet": "XƯỚNG ĐẠO",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Khởi xướng, cổ xúy trào lưu tốt đẹp",
            "radicals": "倡 (Xướng - dẫn đầu cất tiếng) + 导 (Đạo - dẫn đường)",
            "grammarNote": "Cổ xúy lối sống xanh: 倡导绿色健康的生活理念.",
            "exampleSentence": {
              "target": "主流媒体应当积极倡导厉行节约、反对铺张浪费的社会新风尚。",
              "pronunciation": "Zhǔliú méitǐ yīngdāng jījí chàngdǎo lìxíng jiéyuē, fǎnduì pūzhāng làngfèi de shèhuì xīn fēngshàng.",
              "meaningVi": "Truyền thông chính thống cần tích cực khởi xướng phong cách xã hội mới triệt để tiết kiệm, bài trừ phô trương lãng phí."
            }
          },
          {
            "id": "zh_h5_6_8",
            "word": "趋势",
            "pronunciation": "qūshì",
            "hanViet": "XU THẾ",
            "partOfSpeech": "noun",
            "meaningVi": "Xu thế, chiều hướng vận động của thời đại",
            "radicals": "趋 (Xu - tiến tới) + 势 (Thế - cục diện sức mạnh)",
            "grammarNote": "Xu thế không thể đảo ngược: 不可逆转的历史趋势.",
            "exampleSentence": {
              "target": "经济全球化与科技数字化是不可阻挡的历史发展大趋势。",
              "pronunciation": "Jīngjì quánqiúhuà yǔ kējì shùzìhuà shì bù kě zǔdǎng de lìshǐ fāzhǎn dà qūshì.",
              "meaningVi": "Toàn cầu hóa kinh tế và số hóa công nghệ là đại xu thế phát triển lịch sử không thể ngăn cản."
            }
          }
        ]
      },
      {
        "id": "zh_hsk5_l7",
        "title": "Bài 7: Công Nghệ Đổi Mới & Thư Diện Ngữ 旨在, 鉴于",
        "grammarFocus": "Thư diện ngữ 旨在 (Zhǐ zài - Nhằm mục đích: 本政策旨在扶持中小微企业) & 鉴于 (Jiànyú - Xét thấy/Trước tình hình: 鉴于当前严峻形势，特采取紧急措施).",
        "vocabularies": [
          {
            "id": "zh_h5_7_1",
            "word": "旨在",
            "pronunciation": "zhǐ zài",
            "hanViet": "CHỈ TẠI",
            "partOfSpeech": "verb",
            "meaningVi": "Nhằm mục đích, với tôn chỉ hướng tới (thư diện ngữ)",
            "radicals": "旨 (Chỉ - ý chỉ, mục đích) + 在 (Tại - ở chỗ)",
            "grammarNote": "Rất phổ biến trong chính sách, nghị quyết: 本次会议旨在...",
            "exampleSentence": {
              "target": "国家出台一系列税收优惠政策，旨在鼓励高新技术企业加大研发创新投入。",
              "pronunciation": "Guójiā chūtái yí xìliè shuìshōu yōuhuì zhèngcè, zhǐ zài gǔlì gāoxīnjìshù qǐyè jiàdà yánfā chuàngxīn tóurù.",
              "meaningVi": "Nhà nước ban hành hàng loạt chính sách ưu đãi thuế khóa, nhằm mục đích khuyến khích các doanh nghiệp công nghệ cao đẩy mạnh đầu tư nghiên cứu đổi mới."
            }
          },
          {
            "id": "zh_h5_7_2",
            "word": "鉴于",
            "pronunciation": "jiànyú",
            "hanViet": "GIÁM Ư",
            "partOfSpeech": "preposition",
            "meaningVi": "Xét thấy, căn cứ trước tình hình thực tế (thư diện ngữ)",
            "radicals": "鉴 (Giám - soi xét gương soi) + 于 (Ư - tại)",
            "grammarNote": "Đứng đầu câu làm trạng ngữ chỉ lý do/bối cảnh pháp lý.",
            "exampleSentence": {
              "target": "鉴于当前原材料市场价格的大幅攀升，工厂决定适度调整出口报价。",
              "pronunciation": "Jiànyú dāngqián yuáncáiliào shìchǎng jiàgé de dàfú pānshēng, gōngchǎng juédìng shìdù tiáozhěng chūkǒu bàojià.",
              "meaningVi": "Xét thấy giá cả thị trường nguyên vật liệu hiện tại tăng mạnh, nhà máy quyết định điều chỉnh mức báo giá xuất khẩu ở mức vừa phải."
            }
          },
          {
            "id": "zh_h5_7_3",
            "word": "创新",
            "pronunciation": "chuàngxīn",
            "hanViet": "SÁNG TÂN",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Đổi mới sáng tạo, bứt phá cái mới",
            "radicals": "创 (Sáng - khai sáng) + 新 (Tân - mới mẻ)",
            "grammarNote": "Đổi mới sáng tạo công nghệ: 科技创新.",
            "exampleSentence": {
              "target": "持续的技术创新是科技型企业在激烈国际竞争中永葆生机的源泉。",
              "pronunciation": "Chíxù de jìshù chuàngxīn shì kējì xíng qǐyè zài jīliè guójì jìngzhēng zhōng yǒngbǎo shēngjī de yuánquán.",
              "meaningVi": "Đổi mới sáng tạo kỹ thuật liên tục là suối nguồn để các doanh nghiệp kiểu công nghệ mãi giữ gìn sức sống trong cạnh tranh quốc tế khốc liệt."
            }
          },
          {
            "id": "zh_h5_7_4",
            "word": "专利",
            "pronunciation": "zhuānlì",
            "hanViet": "CHUYÊN LỢI",
            "partOfSpeech": "noun",
            "meaningVi": "Bằng sáng chế độc quyền, phát minh patent",
            "radicals": "专 (Chuyên - độc quyền) + 利 (Lợi - lợi ích)",
            "grammarNote": "Nộp đơn xin cấp bằng sáng chế: 申请发明专利.",
            "exampleSentence": {
              "target": "公司今年累计获得了三十多项国际权威发明专利授权。",
              "pronunciation": "Gōngsī jīnnián lěijì huòdé le sānshí duō xiàng guójì quánwēi fāmíng zhuānlì shòuquán.",
              "meaningVi": "Năm nay công ty đã lũy kế nhận được ủy quyền của hơn 30 bằng sáng chế phát minh có uy tín quốc tế."
            }
          },
          {
            "id": "zh_h5_7_5",
            "word": "突破",
            "pronunciation": "tūpò",
            "hanViet": "ĐỘT PHÁ",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Đột phá, phá vỡ nút thắt cổ chai",
            "radicals": "突 (Đột - xông lên bất ngờ) + 破 (Phá - phá tan rào cản)",
            "grammarNote": "Đột phá then chốt: 取得重大突破.",
            "exampleSentence": {
              "target": "科研团队经过多年艰苦攻关，终于在量子计算核心芯片领域取得了重大突破。",
              "pronunciation": "Kēyán tuánduì jīngguò duō nián jiānkǔ gōngguān, zhōngyú zài liàngzǐ jìsuàn héxīn xīnpiàn lǐngyù huòdé le zhòngdà tūpò.",
              "meaningVi": "Đội ngũ nghiên cứu sau nhiều năm khắc phục gian khổ, cuối cùng đã đạt được đột phá trọng đại trong lĩnh vực chip cốt lõi điện toán lượng tử."
            }
          },
          {
            "id": "zh_h5_7_6",
            "word": "颠覆",
            "pronunciation": "diānfù",
            "hanViet": "ĐIÊN PHÚC",
            "partOfSpeech": "verb/adj",
            "meaningVi": "Lật đổ trật tự cũ, mang tính cách mạng mang tính đảo lộn",
            "radicals": "颠 (Điên - đỉnh đầu, lộn nhào) + 覆 (Phúc - úp ngược)",
            "grammarNote": "Công nghệ mang tính cách mạng: 颠覆性技术.",
            "exampleSentence": {
              "target": "生成式人工智能被广泛认为是近年来最具颠覆性的科技创新成果之一。",
              "pronunciation": "Shēngchéngshì réngōng zhìnéng bèi guǎngfàn rènwéi shì jìnnián lái zuì jù diānfùxìng de kējì chuàngxīn chéngguǒ zhī yī.",
              "meaningVi": "AI tạo sinh được công nhận rộng rãi là một trong những thành quả đổi mới công nghệ mang tính cách mạng lật đổ nhất những năm gần đây."
            }
          },
          {
            "id": "zh_h5_7_7",
            "word": "壁垒",
            "pronunciation": "bìlěi",
            "hanViet": "BÍCH LŨY",
            "partOfSpeech": "noun",
            "meaningVi": "Rào cản, bức tường phòng tuyến kỹ thuật",
            "radicals": "壁 (Bích - bức tường thành) + 垒 (Lũy - chiến lũy đất đá)",
            "grammarNote": "Rào cản công nghệ: 技术壁垒. Rào cản thương mại: 贸易壁垒.",
            "exampleSentence": {
              "target": "掌握核心知识产权是企业筑牢自身技术壁垒、防御竞争对手的最强法宝。",
              "pronunciation": "Zhǎngwò héxīn zhīshichǎnquán shì qǐyè zhù láo zìshēn jìshù bìlěi, fángyù jìngzhēng duìshǒu de zuì qiáng fǎbǎo.",
              "meaningVi": "Nắm vững quyền sở hữu trí tuệ cốt lõi là pháp bảo mạnh nhất để doanh nghiệp xây chắc bức tường rào cản kỹ thuật của bản thân và phòng ngự trước đối thủ cạnh tranh."
            }
          },
          {
            "id": "zh_h5_7_8",
            "word": "迭代",
            "pronunciation": "diédài",
            "hanViet": "ĐIỆP ĐẠI",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Cập nhật lặp vòng lặp nâng cấp liên tục (Iteration)",
            "radicals": "叠 (Điệp - chồng chất lớp lớp) + 代 (Đại - thế hệ)",
            "grammarNote": "Lặp phiên bản sản phẩm: 产品快速迭代.",
            "exampleSentence": {
              "target": "互联网软件产品必须敏锐捕捉用户痛点，保持快速迭代优化的敏捷节奏。",
              "pronunciation": "Hùliánwǎng ruǎnjiàn chǎnpǐn bìxū mǐnruì bǔzhuō yònghù tòngdiǎn, bǎochí kuàisù diédài yōuhuà de mǐnjié jiézòu.",
              "meaningVi": "Sản phẩm phần mềm Internet bắt buộc phải nắm bắt nhạy bén điểm đau của người dùng, duy trì nhịp độ linh hoạt nâng cấp lặp tối ưu nhanh chóng."
            }
          }
        ]
      },
      {
        "id": "zh_hsk5_l8",
        "title": "Bài 8: Tâm Lý Học Hành Vi Tiêu Dùng & Thư Diện Ngữ 势必, 索性",
        "grammarFocus": "Thư diện ngữ 势必 (Shìbì - Tất yếu sẽ dẫn tới: 盲目扩张势必导致资金断裂) & 索性 (Suǒxìng - Dứt khoát/Thà rằng làm luôn: 既然下雨，索性就在家看书).",
        "vocabularies": [
          {
            "id": "zh_h5_8_1",
            "word": "势必",
            "pronunciation": "shìbì",
            "hanViet": "THẾ TẤT",
            "partOfSpeech": "adverb",
            "meaningVi": "Thế tất sẽ, chắc chắn theo xu thế tất yếu sẽ xảy ra",
            "radicals": "势 (Thế - xu thế) + 必 (Tất - tất yếu)",
            "grammarNote": "Dự báo hậu quả khách quan: 忽视质量，势必自食其果.",
            "exampleSentence": {
              "target": "企业若一味削减研发费用以美化财报，势必会严重损害长期的创新动能。",
              "pronunciation": "Qǐyè ruò yíwèi xuējiǎn yánfā fèiyong yǐ měihuà cáibào, shìbì huì yánzhòng sǔnhài chángqī de chuàngxīn dòngnéng.",
              "meaningVi": "Doanh nghiệp nếu một mực cắt giảm chi phí R&D nhằm làm đẹp báo cáo tài chính, thế tất sẽ làm tổn hại nghiêm trọng động năng đổi mới dài hạn."
            }
          },
          {
            "id": "zh_h5_8_2",
            "word": "索性",
            "pronunciation": "suǒxìng",
            "hanViet": "TÁC TÍNH",
            "partOfSpeech": "adverb",
            "meaningVi": "Dứt khoát, thà rằng một mạch làm cho xong",
            "radicals": "索 (Tác - tìm kiếm, rút ra) + 性 (Tính - tính khí)",
            "grammarNote": "Biểu thị quyết định dứt khoát thẳng thắn không do dự.",
            "exampleSentence": {
              "target": "既然旧方案存在无法克服的架构缺陷，我们索性推倒重来，重新设计。",
              "pronunciation": "Jìrán jiù fāng'àn cúnzài wúfǎ kèfú de jiàgòu quēxiàn, wǒmen suǒxìng tuīdǎo chóng lái, chóngxīn shèjì.",
              "meaningVi": "Một khi phương án cũ tồn tại khiếm khuyết kiến trúc không thể khắc phục, chúng ta dứt khoát đập đi làm lại, thiết kế mới từ đầu."
            }
          },
          {
            "id": "zh_h5_8_3",
            "word": "消费心理",
            "pronunciation": "xiāofèi xīnlǐ",
            "hanViet": "TIÊU PHÍ TÂM LÝ",
            "partOfSpeech": "noun",
            "meaningVi": "Tâm lý học tiêu dùng",
            "radicals": "消费 (Tiêu dùng) + 心理 (Tâm lý)",
            "grammarNote": "Thao túng tâm lý mua hàng: 洞察消费者心理.",
            "exampleSentence": {
              "target": "深入洞察年轻一代的消费心理是制定精准营销策划的制胜先机。",
              "pronunciation": "Shēnrù dòngchá niánqīng yídài de xiāofèi xīnlǐ shì zhìdìng jīngzhǔn yíngxiāo cèhuà de zhìshèng xiānjī.",
              "meaningVi": "Thấu thị sâu sắc tâm lý tiêu dùng của thế hệ trẻ là thời cơ tiên phong giành chiến thắng để vạch ra kế hoạch tiếp thị chuẩn xác."
            }
          },
          {
            "id": "zh_h5_8_4",
            "word": "攀比",
            "pronunciation": "pānbǐ",
            "hanViet": "PHAN TỶ",
            "partOfSpeech": "verb",
            "meaningVi": "Đua đòi so bì, chạy theo thói phù phiếm",
            "radicals": "攀 (Phan - vin trèo bám víu) + 比 (Tỷ - so sánh hơn thua)",
            "grammarNote": "Tâm lý đua đòi: 盲目攀比心理.",
            "exampleSentence": {
              "target": "盲目攀比和超前消费容易使年轻人陷入沉重的个人债务泥潭。",
              "pronunciation": "Mángmù pānbǐ hé chāoqián xiāofèi róngyì shǐ niánqīngrén xiànrù chénzhòng de gèrén zhàiwù nítán.",
              "meaningVi": "Đua đòi mù quáng và tiêu dùng vượt trước dễ khiến người trẻ rơi vào vũng lầy nợ nần cá nhân nặng nề."
            }
          },
          {
            "id": "zh_h5_8_5",
            "word": "认同",
            "pronunciation": "rèntóng",
            "hanViet": "NHẬN ĐỒNG",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Đồng thuận, thừa nhận giá trị tương đồng",
            "radicals": "认 (Nhận - công nhận) + 同 (Đồng - giống nhau)",
            "grammarNote": "Nhận diện thương hiệu: 品牌价值认同.",
            "exampleSentence": {
              "target": "现代消费者购买某种品牌往往源于对其背后倡导的价值观产生高度认同。",
              "pronunciation": "Xiàndài xiāofèizhě gòumǎi mǒu zhǒng pǐnpái wǎngwǎng yuányú duì qí bèihòu chàngdǎo de jiàzhíguān chǎnshēng gāodù rèntóng.",
              "meaningVi": "Người tiêu dùng hiện đại mua sắm một thương hiệu nào đó thường bắt nguồn từ sự đồng cảm cao độ đối với hệ giá trị được khởi xướng phía sau nó."
            }
          },
          {
            "id": "zh_h5_8_6",
            "word": "诱惑",
            "pronunciation": "yòuhuò",
            "hanViet": "DỤ HOẶC",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Cám dỗ, mê hoặc lôi cuốn",
            "radicals": "诱 (Dụ - dẫn dụ) + 惑 (Hoặc - làm cho mê muội)",
            "grammarNote": "Cưỡng lại cám dỗ: 抵制诱惑.",
            "exampleSentence": {
              "target": "面对电商平台铺天盖地的打折促销信息，消费者需要保持理智抵御冲动消费的诱惑。",
              "pronunciation": "Miànduì diànshāng píngtái pūtiāngàidì de dǎzhé cùxiāo xìnxī, xiāofèizhě xūyào bǎochí lǐzhì dǐyù chōngdòng xiāofèi de yòuhuò.",
              "meaningVi": "Đối mặt với thông tin giảm giá khuyến mãi ngợp trời của các sàn thương mại điện tử, người tiêu dùng cần giữ lý trí để chống lại cám dỗ của việc tiêu xài bốc đồng."
            }
          },
          {
            "id": "zh_h5_8_7",
            "word": "品牌",
            "pronunciation": "pǐnpái",
            "hanViet": "PHẨM BÀI",
            "partOfSpeech": "noun",
            "meaningVi": "Thương hiệu, nhãn hiệu",
            "radicals": "品 (Phẩm - phẩm chất) + 牌 (Bài - tấm biển thương hiệu)",
            "grammarNote": "Độ trung thành thương hiệu: 品牌忠诚度.",
            "exampleSentence": {
              "target": "树立一个享誉全球的高端品牌需要一代代工匠坚守卓越的品质承诺。",
              "pronunciation": "Shùlì yí ge xiǎngyù quánqiú de gāoduān pǐnpái xūyào yídàidài gōngjiàng jiānshǒu zhuóyuè de pǐnzhì chéngnuò.",
              "meaningVi": "Tạo dựng một thương hiệu cao cấp lừng danh toàn cầu cần từng thế hệ nghệ nhân kiên trì giữ vững cam kết chất lượng vượt trội."
            }
          },
          {
            "id": "zh_h5_8_8",
            "word": "偏好",
            "pronunciation": "piānhào",
            "hanViet": "THIÊN HIẾU",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Sở thích thiên vị, gu ưa thích riêng",
            "radicals": "偏 (Thiên - nghiêng về một bên) + 好 (Hiếu - yêu thích)",
            "grammarNote": "Thị hiếu người dùng: 用户偏好.",
            "exampleSentence": {
              "target": "算法系统根据用户过往的浏览轨迹精准刻画出其个性化的商品偏好模型。",
              "pronunciation": "Suànfǎ xìtǒng gēnjù yònghù guòwǎng de liúlǎn guǐjì jīngzhǔn kèhuà chū qí gèxìnghuà de shāngpǐn piānhào móxíng.",
              "meaningVi": "Hệ thống thuật toán căn cứ vào dấu vết lướt web trước đây của người dùng để phác họa chuẩn xác mô hình thị hiếu sản phẩm cá nhân hóa của họ."
            }
          }
        ]
      },
      {
        "id": "zh_hsk5_l9",
        "title": "Bài 9: Nghệ Thuật Đàm Phán Ngoại Giao & Thư Diện Ngữ 予以, 致使",
        "grammarFocus": "Thư diện ngữ 予以 (Yǔyǐ - Dành cho/Đưa ra sự can thiệp: 予以支持, 予以严肃处理) & 致使 (Zhìshǐ - Dẫn đến/Khiến cho xảy ra hậu quả nghiêm trọng: 操作失误致使系统瘫痪).",
        "vocabularies": [
          {
            "id": "zh_h5_9_1",
            "word": "予以",
            "pronunciation": "yǔyǐ",
            "hanViet": "DỮ DĨ",
            "partOfSpeech": "verb",
            "meaningVi": "Dành cho, đưa ra sự xử lý/hỗ trợ (thư diện ngữ)",
            "radicals": "予 (Dữ - ban cho) + 以 (Dĩ - lấy đó mà làm)",
            "grammarNote": "Văn thư chính thức: 予以驳回 (Bác bỏ), 予以协助 (Hỗ trợ).",
            "exampleSentence": {
              "target": "对于一切侵犯知识产权的违法侵权行为，司法机关依法予以严厉打击。",
              "pronunciation": "Duìyú yíqiè qīnfàn zhīshichǎnquán de wéifǎ qīnquán xíngwéi, sīfǎ jīguān yīfǎ yǔyǐ yánlì dǎjī.",
              "meaningVi": "Đối với mọi hành vi xâm phạm quyền sở hữu trí tuệ vi phạm pháp luật, cơ quan tư pháp căn cứ theo luật giáng đòn xử lý nghiêm khắc."
            }
          },
          {
            "id": "zh_h5_9_2",
            "word": "致使",
            "pronunciation": "zhìshǐ",
            "hanViet": "TRÍ SỬ",
            "partOfSpeech": "conjunction",
            "meaningVi": "Khiến cho, dẫn đến hậu quả tiêu cực ngoài ý muốn (thư diện ngữ)",
            "radicals": "致 (Trí - đưa tới) + 使 (Sử - làm cho)",
            "grammarNote": "Đồng nghĩa với 导致 nhưng mang sắc thái văn thư nghiêm trang hơn.",
            "exampleSentence": {
              "target": "物流公司由于内部系统调度故障，致使数万件生鲜包裹未能按时配送。",
              "pronunciation": "Wùliú gōngsī yóuyú nèibù xìtǒng diàodù gùzhàng, zhìshǐ shù wàn jiàn shēngxiān bāoguǒ wèinéng ànshí pèisòng.",
              "meaningVi": "Công ty logistics do sự cố điều phối hệ thống nội bộ, đã dẫn đến việc hàng vạn kiện bưu phẩm tươi sống không thể giao đúng giờ."
            }
          },
          {
            "id": "zh_h5_9_3",
            "word": "共识",
            "pronunciation": "gòngshí",
            "hanViet": "CỘNG THỨC",
            "partOfSpeech": "noun",
            "meaningVi": "Nhận thức chung, sự đồng thuận",
            "radicals": "共 (Cộng - cùng nhau) + 识 (Thức - nhận thức)",
            "grammarNote": "Đạt được nhận thức chung: 达成广泛共识.",
            "exampleSentence": {
              "target": "两国元首在应对气候变化和促进双边经贸发展等议题上达成了广泛共识。",
              "pronunciation": "Liǎng guó yuánshǒu zài yìngduì qìhòu biànhuà hé cùjìn shuāngbiān jīngmào fāzhǎn děng yìtí shang dáchéng le guǎngfàn gòngshí.",
              "meaningVi": "Nguyên thủ hai nước đã đạt được sự đồng thuận rộng rãi trên các chủ đề như ứng phó biến đổi khí hậu và thúc đẩy phát triển kinh tế thương mại song phương."
            }
          },
          {
            "id": "zh_h5_9_4",
            "word": "斡旋",
            "pronunciation": "wòxuán",
            "hanViet": "OÁT TOÀN",
            "partOfSpeech": "verb",
            "meaningVi": "Đứng ra trung gian hòa giải, dàn xếp ngoại giao",
            "radicals": "斡 (Oát - xoay chuyển cục diện) + 旋 (Toàn - quay tròn hòa giải)",
            "grammarNote": "Ngoại giao con thoi: 进行外交斡旋.",
            "exampleSentence": {
              "target": "经过联合国特使的多方奔走斡旋，冲突双方终于同意签署停火协议。",
              "pronunciation": "Jīngguò Liánhéguó tèshǐ de duōfāng bēnzǒu wòxuán, chōngtū shuāngfāng zhōngyú tóngyì qiānshǔ tínghuǒ xiéyì.",
              "meaningVi": "Trải qua nhiều chuyến đi hòa giải của đặc phái viên Liên Hợp Quốc, hai bên xung đột cuối cùng đã đồng ý ký thỏa thuận ngừng bắn."
            }
          },
          {
            "id": "zh_h5_9_5",
            "word": "声明",
            "pronunciation": "shēngmíng",
            "hanViet": "THANH MINH",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Tuyên bố chính thức, bản tuyên bố",
            "radicals": "声 (Thanh - phát ra âm thanh) + 明 (Minh - công khai sáng tỏ)",
            "grammarNote": "Tuyên bố chung: 联合声明. Tuyên bố long trọng: 严正声明.",
            "exampleSentence": {
              "target": "外交部发言人就有关国家干涉我国内政的行为发表了严正抗议声明。",
              "pronunciation": "Wàijiāobù fāyánrén jiù yǒuguān guójiā gānshè wǒ guó nèizhèng de xíngwéi fābiǎo le yánzhèng kàngyì shēngmíng.",
              "meaningVi": "Người phát ngôn Bộ Ngoại giao đã đưa ra tuyên bố phản đối nghiêm khắc đối với hành vi can thiệp vào công việc nội bộ nước ta của quốc gia liên quan."
            }
          },
          {
            "id": "zh_h5_9_6",
            "word": "底线",
            "pronunciation": "dǐxiàn",
            "hanViet": "ĐỂ TUYẾN",
            "partOfSpeech": "noun",
            "meaningVi": "Lằn ranh đỏ, giới hạn chịu đựng cuối cùng",
            "radicals": "底 (Để - đáy sâu, nền móng) + 线 (Tuyến - đường vạch)",
            "grammarNote": "Giữ vững lằn ranh đỏ: 坚守底线. Không thể chạm vào: 触碰底线.",
            "exampleSentence": {
              "target": "国家主权与领土完整是任何主权国家在外交博弈中绝不可退让的核心底线。",
              "pronunciation": "Guójiā zhǔquán yǔ lǐngtǔ wánzhěng shì rènhé zhǔquán guójiā zài wàijiāo bóyì zhōng jué bù kě tuìràng de héxīn dǐxiàn.",
              "meaningVi": "Chủ quyền quốc gia và toàn vẹn lãnh thổ là lằn ranh đỏ cốt lõi tuyệt đối không thể nhượng bộ của bất kỳ quốc gia có chủ quyền nào trong ván cờ ngoại giao."
            }
          },
          {
            "id": "zh_h5_9_7",
            "word": "博弈",
            "pronunciation": "bóyì",
            "hanViet": "BÁC DỊCH",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Ván cờ đấu trí so tài (Game theory)",
            "radicals": "博 (Bác - đánh bạc mưu trí) + 弈 (Dịch - đánh cờ vây)",
            "grammarNote": "Ván cờ nước lớn: 大国博弈.",
            "exampleSentence": {
              "target": "地缘政治与经济博弈日益复杂，需要具备全局战略眼光才能立于不败之地。",
              "pronunciation": "Dìyuán zhèngzhì yǔ jīngjì bóyì rìyì fùzá, xūyào jùbèi quánjú zhànlüè yǎnguāng cái néng lì yú búbài zhī dì.",
              "meaningVi": "Ván cờ địa chính trị và kinh tế ngày càng phức tạp, đòi hỏi phải có nhãn quan chiến lược toàn cục mới có thể đứng vững ở thế bất bại."
            }
          },
          {
            "id": "zh_h5_9_8",
            "word": "分歧",
            "pronunciation": "fēnqí",
            "hanViet": "PHÂN KỲ",
            "partOfSpeech": "noun",
            "meaningVi": "Bất đồng chia rẽ, ngã rẽ quan điểm",
            "radicals": "分 (Phân - chia tách) + 歧 (Kỳ - ngã ba đường, rẽ nhánh)",
            "grammarNote": "Thu hẹp bất đồng: 缩小分歧. Gác lại bất đồng tìm điểm chung: 求同存异.",
            "exampleSentence": {
              "target": "求同存异、管控分歧是推动多边国际合作行稳致远的基本前提。",
              "pronunciation": "Qiú tóng cún yì, guǎnkòng fēnqí shì tuīdòng duōbiān guójì hézuò xíng wěn zhì yuǎn de jīběn qiántí.",
              "meaningVi": "Tìm điểm tương đồng gác lại bất đồng, kiểm soát các ngả chia rẽ là tiền đề cơ bản để thúc đẩy hợp tác quốc tế đa phương đi xa và vững chắc."
            }
          }
        ]
      },
      {
        "id": "zh_hsk5_l10",
        "title": "Bài 10: Quản Lý Chuỗi Cung Ứng & Thư Diện Ngữ 毋庸置疑, 相辅相成",
        "grammarFocus": "Thành ngữ thư diện ngữ: 毋庸置疑 (Wú yōng zhì yí - Không cần phải bàn cãi / Chắc chắn 100%) & 相辅相成 (Xiāng fǔ xiāng chéng - Bổ trợ nâng đỡ lẫn nhau).",
        "vocabularies": [
          {
            "id": "zh_h5_10_1",
            "word": "毋庸置疑",
            "pronunciation": "wú yōng zhì yí",
            "hanViet": "VÔ DUNG TRÍ NGHI",
            "partOfSpeech": "idiom",
            "meaningVi": "Không có gì phải nghi ngờ, hiển nhiên là sự thật",
            "radicals": "毋庸 (Không cần) + 置疑 (Đặt câu hỏi nghi ngờ)",
            "grammarNote": "Đồng nghĩa với 不容置疑, 毫无疑问.",
            "exampleSentence": {
              "target": "高效韧性的供应链体系对现代制造企业的稳健运营具有毋庸置疑的决定性意义。",
              "pronunciation": "Gāoxiào rènxìng de gōngyìngliàn tǐxì duì xiàndài zhìzào qǐyè de wěnjiàn yùnyíng jùyǒu wúyōngzhìyí de juédìngxìng yìyì.",
              "meaningVi": "Hệ thống chuỗi cung ứng hiệu quả và dẻo dai có ý nghĩa mang tính quyết định không cần bàn cãi đối với sự vận hành vững chãi của doanh nghiệp sản xuất hiện đại."
            }
          },
          {
            "id": "zh_h5_10_2",
            "word": "相辅相成",
            "pronunciation": "xiāng fǔ xiāng chéng",
            "hanViet": "TƯƠNG PHỤ TƯƠNG THÀNH",
            "partOfSpeech": "idiom",
            "meaningVi": "Bổ trợ tương hỗ cho nhau cùng hoàn thiện",
            "radicals": "相辅 (Giúp đỡ lẫn nhau) + 相成 (Cùng tạo nên thành tựu)",
            "grammarNote": "Miêu tả mối quan hệ cộng sinh.",
            "exampleSentence": {
              "target": "数字化智能仓储与精益生产管理相辅相成，共同驱动了企业生产效率的飞跃。",
              "pronunciation": "Shùzìhuà zhìnéng cāngchǔ yǔ jīngyì shēngchǎn guǎnlǐ xiāngfǔxiāngchéng, gòngtóng qūdòng le qǐyè shēngchǎn xiàolǜ de fēiyuè.",
              "meaningVi": "Kho bãi thông minh kỹ thuật số và quản lý sản xuất tinh gọn bổ trợ nâng đỡ lẫn nhau, cùng nhau thúc đẩy bước nhảy vọt về hiệu suất sản xuất của doanh nghiệp."
            }
          },
          {
            "id": "zh_h5_10_3",
            "word": "供应链",
            "pronunciation": "gōngyìngliàn",
            "hanViet": "CUNG ỨNG LIỆN",
            "partOfSpeech": "noun",
            "meaningVi": "Chuỗi cung ứng toàn cầu",
            "radicals": "供应 (Cung ứng cung cấp) + 链 (Liện - mắt xích liên kết)",
            "grammarNote": "Quản lý chuỗi cung ứng: 供应链管理 (SCM).",
            "exampleSentence": {
              "target": "面对突发全球公共卫生事件，重构安全多元的供应链体系成为跨国巨头的当务之急。",
              "pronunciation": "Miànduì tūfā quánqiú gōnggòng wèishēng shìjiàn, chónggòu ānquán duōyuán de gōngyìngliàn tǐxì chéngwéi le kuàguó jùtóu de dāngwùzhījí.",
              "meaningVi": "Đối mặt với sự kiện vệ sinh công cộng toàn cầu đột xuất, tái cấu trúc hệ thống chuỗi cung ứng an toàn đa dạng đã trở thành nhiệm vụ cấp bách hàng đầu của các ông lớn đa quốc gia."
            }
          },
          {
            "id": "zh_h5_10_4",
            "word": "库存",
            "pronunciation": "kùcún",
            "hanViet": "KHỐ TỒN",
            "partOfSpeech": "noun",
            "meaningVi": "Hàng tồn kho, tồn dư kho",
            "radicals": "库 (Khố - kho hàng) + 存 (Tồn - lưu trữ lại)",
            "grammarNote": "Giảm tồn kho: 降低库存. Tồn kho bằng 0: 零库存 (JIT).",
            "exampleSentence": {
              "target": "引入准时制生产模式能帮助工厂将原材料库存占用资金降低百分之四十。",
              "pronunciation": "Yǐnrù zhǔnshízhì shēngchǎn móshì néng bāngzhù gōngchǎng jiāng yuáncáiliào kùcún zhànyòng zījīn jiàngdī bǎifēnzhī sìshí.",
              "meaningVi": "Đưa vào mô hình sản xuất vừa đúng lúc (JIT) có thể giúp nhà máy hạ bớt 40% vốn bị chiếm dụng trong hàng tồn kho nguyên vật liệu."
            }
          },
          {
            "id": "zh_h5_10_5",
            "word": "物流",
            "pronunciation": "wùliú",
            "hanViet": "VẬT LƯU",
            "partOfSpeech": "noun",
            "meaningVi": "Dịch vụ hậu cần, logistics",
            "radicals": "物 (Vật - hàng hóa) + 流 (Lưu - dòng lưu chuyển)",
            "grammarNote": "Logistics thông minh: 智慧物流.",
            "exampleSentence": {
              "target": "依托自动化立体仓库和无人搬运车，现代物流中心的运转效率大幅提升。",
              "pronunciation": "Yītuō zìdònghuà lìtǐ cāngkù hé wúrén bānyùnchē, xiàndài wùliú zhōngxīn de yùnzhuǎn xiàolǜ dàfú tíshēng.",
              "meaningVi": "Dựa vào kho hàng lập thể tự động hóa và xe tự hành AGV, hiệu suất vận hành của trung tâm logistics hiện đại đã tăng lên mạnh mẽ."
            }
          },
          {
            "id": "zh_h5_10_6",
            "word": "供应商",
            "pronunciation": "gōngyìngshāng",
            "hanViet": "CUNG ỨNG THƯƠNG",
            "partOfSpeech": "noun",
            "meaningVi": "Nhà cung cấp hàng hóa/linh kiện",
            "radicals": "供应 (Cung ứng) + 商 (Thương - thương nhân, đối tác)",
            "grammarNote": "Đánh giá nhà cung cấp: 供应商审核.",
            "exampleSentence": {
              "target": "对核心零部件供应商进行定期实地验厂是确保产品源头质量的必经流程。",
              "pronunciation": "Duì héxīn língbùjiàn gōngyìngshāng jìnxíng dìngqī shídì yàn chǎng shì quèbǎo chǎnpǐn yuántóu zhìliàng de bì jīng liúchéng.",
              "meaningVi": "Tiến hành thẩm định thực địa định kỳ đối với nhà cung ứng linh kiện cốt lõi là quy trình bắt buộc để bảo đảm chất lượng từ tận gốc sản phẩm."
            }
          },
          {
            "id": "zh_h5_10_7",
            "word": "韧性",
            "pronunciation": "rènxìng",
            "hanViet": "NHẪN TÍNH",
            "partOfSpeech": "noun/adj",
            "meaningVi": "Tính dẻo dai bền bỉ, sức chịu tải phục hồi (Resilience)",
            "radicals": "韧 (Nhẫn - dẻo dai uốn cong không gãy) + 性 (Tính - bản tính)",
            "grammarNote": "Sức dẻo dai của chuỗi cung ứng: 供应链韧性.",
            "exampleSentence": {
              "target": "增强产业供应链韧性能够有效抵御外部地缘冲突带来的不可控断供冲击。",
              "pronunciation": "Zēngqiáng chǎnyè gōngyìngliàn rènxìng nénggòu yǒuxiào dǐyù wàibù dìyuán chōngtū dàilái de bùkěkòng duàngōng chōngjī.",
              "meaningVi": "Tăng cường tính dẻo dai của chuỗi cung ứng công nghiệp có thể chống đỡ hiệu quả cú sốc đứt gãy nguồn cung ngoài tầm kiểm soát do xung đột địa chính trị bên ngoài mang lại."
            }
          },
          {
            "id": "zh_h5_10_8",
            "word": "优化",
            "pronunciation": "yōuhuà",
            "hanViet": "ƯU HÓA",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Tối ưu hóa quy trình/hệ thống",
            "radicals": "优 (Ưu - tốt nhất) + 化 (Hóa - biến đổi)",
            "grammarNote": "Tối ưu hóa đường đi vận chuyển: 优化运输路径.",
            "exampleSentence": {
              "target": "通过大数据算法持续优化配送路线，物流车队每天可节约近百分之十五的燃油消耗。",
              "pronunciation": "Tōngguò dàshùjù suànfǎ chíxù yōuhuà pèisòng lùxiàn, wùliú chēduì měitiān kě jiéyuē jìn bǎifēnzhī shíwǔ de rányóu xiāohào.",
              "meaningVi": "Thông qua thuật toán dữ liệu lớn liên tục tối ưu hóa lộ trình giao hàng, đội xe logistics mỗi ngày có thể tiết kiệm gần 15% mức tiêu hao nhiên liệu."
            }
          }
        ]
      }
    ]
  },
  "zh_hsk6": {
    "levelId": "zh_hsk6",
    "code": "HSK 6",
    "title": "HSK 6 - Cao Cấp 2 & Chuyên Ngành Nhà Máy, Xuất Nhập Khẩu, Logistics",
    "lessons": [
      {
        "id": "zh_hsk6_l1",
        "title": "Bài 1: Vận Hành Dây Chuyền Sản Xuất & Công Nghệ SMT",
        "grammarFocus": "Thuật ngữ nhà máy công nghiệp: 流水线 (Dây chuyền sản xuất), SMT 贴片 (Gắn chip bề mặt), 节拍时间 (Cycle time).",
        "vocabularies": [
          {
            "id": "zh_h6_1_1",
            "word": "流水线",
            "pronunciation": "liúshuǐxiàn",
            "hanViet": "LƯU THỦY TUYẾN",
            "partOfSpeech": "noun",
            "meaningVi": "Dây chuyền sản xuất lắp ráp liên tục",
            "radicals": "流水 (Nước chảy không ngừng) + 线 (Đường tuyến)",
            "grammarNote": "Vận hành dây chuyền: 流水线作业. Công nhân dây chuyền: 普工.",
            "exampleSentence": {
              "target": "总装车间的新型自动化流水线每四十五秒即可下线一台成品手机。",
              "pronunciation": "Zǒngzhuāng chējiān de xīnxíng zìdònghuà liúshuǐxiàn měi sìshíwǔ miǎo jíkě xiàxiàn yì tái chéngpǐn shǒujī.",
              "meaningVi": "Dây chuyền lắp ráp tự động hóa kiểu mới của xưởng tổng lắp cứ mỗi 45 giây là có thể xuất xưởng một chiếc điện thoại thành phẩm."
            }
          },
          {
            "id": "zh_h6_1_2",
            "word": "贴片",
            "pronunciation": "tiēpiàn",
            "hanViet": "THIẾP PHIẾN",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Công nghệ dán linh kiện bề mặt bo mạch (SMT - Surface Mount Technology)",
            "radicals": "贴 (Thiếp - dán lên) + 片 (Phiến - mảnh mạch mỏng)",
            "grammarNote": "Xưởng SMT: 贴片车间. Máy dán chip: 贴片机.",
            "exampleSentence": {
              "target": "高精度贴片机能够以每小时八万只元件的极高速度将微型芯片精准贴装在电路板上。",
              "pronunciation": "Gāojīngdù tiēpiànjī nénggòu yǐ měi xiǎoshí bā wàn zhī yuánjiàn de jígāo sùdù jiāng wēixíng xīnpiàn jīngzhǔn tiēzhuāng zài diànlùbǎn shang.",
              "meaningVi": "Máy dán chip độ chính xác cao có thể gắn chuẩn xác các vi chip lên bo mạch với tốc độ cực cao 80.000 linh kiện mỗi giờ."
            }
          },
          {
            "id": "zh_h6_1_3",
            "word": "产能",
            "pronunciation": "chǎnnéng",
            "hanViet": "SẢN NĂNG",
            "partOfSpeech": "noun",
            "meaningVi": "Năng lực sản xuất, công suất nhà máy (Capacity)",
            "radicals": "产 (Sản - sản xuất) + 能 (Năng - năng lực)",
            "grammarNote": "Đạt công suất tối đa: 满负荷产能. Mở rộng công suất: 扩充产能.",
            "exampleSentence": {
              "target": "随着第二期厂房正式投产，该基地的年产能预计将突破五百万台。",
              "pronunciation": "Suízhe dì-èr qī chǎngfáng zhèngshì tóuchǎn, gāi jīdì de nián chǎnnéng yùjì jiāng tūpò wǔ bǎi wàn tái.",
              "meaningVi": "Cùng với việc nhà xưởng giai đoạn hai chính thức đi vào sản xuất, công suất năm của cứ điểm này dự kiến sẽ vượt mốc 5 triệu chiếc."
            }
          },
          {
            "id": "zh_h6_1_4",
            "word": "组装",
            "pronunciation": "zǔzhuāng",
            "hanViet": "TỔ TRANG",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Lắp ráp linh kiện thành phẩm (Assembly)",
            "radicals": "组 (Tổ - tập hợp sắp xếp) + 装 (Trang - lắp ráp)",
            "grammarNote": "Xưởng lắp ráp: 组装厂. Dây chuyền lắp ráp: 组装线.",
            "exampleSentence": {
              "target": "工人经过为期两周的技能培训后，才能正式进入无尘车间进行精密光学仪器的组装工作。",
              "pronunciation": "Gōngrén jīngguò wéiqī liǎng zhōu de jìnéng péixùn hòu, cái néng zhèngshì jìnrù wúchén chējiān jìnxíng jīngmì guāngxué yíqì de zǔzhuāng gōngzuò.",
              "meaningVi": "Công nhân sau khi trải qua khóa đào tạo kỹ năng kéo dài hai tuần, mới có thể chính thức bước vào phòng sạch để tiến hành công việc lắp ráp thiết bị quang học chính xác."
            }
          },
          {
            "id": "zh_h6_1_5",
            "word": "调试",
            "pronunciation": "tiáoshì",
            "hanViet": "ĐIỀU THÍ",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Căn chỉnh, chạy thử nghiệm thiết bị (Commissioning & Debugging)",
            "radicals": "调 (Điều - điều chỉnh) + 试 (Thí - thử nghiệm)",
            "grammarNote": "Căn chỉnh thông số: 调试参数. Kỹ sư căn chỉnh: 调试工程师.",
            "exampleSentence": {
              "target": "设备工程师正在对新引进的数控机床进行二十四小时不间断带载调试。",
              "pronunciation": "Shèbèi gōngchéngshī zhèngzài duì xīn yǐnjìn de shùkòng jīchuáng jìnxíng èrshísì xiǎoshí bú jiànduàn dàizǎi tiáoshì.",
              "meaningVi": "Kỹ sư thiết bị đang tiến hành chạy thử tải liên tục 24 giờ đối với máy tiện CNC mới nhập khẩu."
            }
          },
          {
            "id": "zh_h6_1_6",
            "word": "交期",
            "pronunciation": "jiāoqī",
            "hanViet": "GIAO KỲ",
            "partOfSpeech": "noun",
            "meaningVi": "Hạn bàn giao lô hàng, tiến độ giao hàng (Lead time / Delivery deadline)",
            "radicals": "交 (Giao - bàn giao) + 期 (Kỳ - thời hạn)",
            "grammarNote": "Đảm bảo đúng tiến độ bàn giao: 确保交期. Trễ hạn giao hàng: 延迟交期.",
            "exampleSentence": {
              "target": "为了确保欧美大客户圣诞促销季的订单交期，工厂启动了三班倒连续生产机制。",
              "pronunciation": "Wèile quèbǎo Ōu-Měi dà kèhù Shèngdàn cùxiāo jì de dìngdān jiāoqī, gōngchǎng qǐdòng le sānbāndǎo liánxù shēngchǎn jīzhì.",
              "meaningVi": "Để bảo đảm hạn giao hàng đơn hàng mùa khuyến mãi Giáng sinh của khách hàng lớn Âu-Mỹ, nhà máy đã kích hoạt cơ chế sản xuất liên tục 3 ca xoay vòng."
            }
          },
          {
            "id": "zh_h6_1_7",
            "word": "模具",
            "pronunciation": "mújù",
            "hanViet": "MÔ CỤ",
            "partOfSpeech": "noun",
            "meaningVi": "Khuôn mẫu đúc cơ khí/nhựa (Molding)",
            "radicals": "模 (Mô - khuôn đúc) + 具 (Cụ - dụng cụ thiết bị)",
            "grammarNote": "Đúc khuôn ép nhựa: 注塑模具. Chế tạo khuôn: 开模.",
            "exampleSentence": {
              "target": "精密模具的设计精度直接决定了注塑外壳的平整度与密合公差。",
              "pronunciation": "Jīngmì mújù de shèjì jīngdù zhíjiē juédìng le zhùsù wàiké de píngzhěngdù yǔ mìhé gōngchā.",
              "meaningVi": "Độ chính xác thiết kế của khuôn mẫu chính xác quyết định trực tiếp đến độ phẳng và dung sai ăn khớp của vỏ ép nhựa."
            }
          },
          {
            "id": "zh_h6_1_8",
            "word": "负荷",
            "pronunciation": "fùhè",
            "hanViet": "PHỤ HÀ",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Tải trọng, công suất chịu tải (Load)",
            "radicals": "负 (Phụ - gánh vác) + 荷 (Hà - gánh nặng trên vai)",
            "grammarNote": "Quá tải: 超负荷运转. Tải điện: 电力负荷.",
            "exampleSentence": {
              "target": "严禁生产设备长期处于超负荷运转状态，以免引发不可挽回的机械故障。",
              "pronunciation": "Yánjìn shēngchǎn shèbèi chángqī chǔyú chāofùhè yùnzhuǎn zhuàngtài, yǐmiǎn yǐnfā bù kě wǎnhuí de jīxiè gùzhàng.",
              "meaningVi": "Nghiêm cấm thiết bị sản xuất ở trong trạng thái vận hành quá tải thời gian dài, để tránh gây ra sự cố cơ khí không thể cứu vãn."
            }
          }
        ]
      },
      {
        "id": "zh_hsk6_l2",
        "title": "Bài 2: Quản Lý Chất Lượng & Kiểm Tra Lỗi (QC, QA, IQC, OQC)",
        "grammarFocus": "Thuật ngữ quản lý chất lượng quốc tế: 品质保证 (QA), 进料检验 (IQC), 出货检验 (OQC), 不良率 (Defect rate), 合格品 (OK) / 不合格品 (NG).",
        "vocabularies": [
          {
            "id": "zh_h6_2_1",
            "word": "不良率",
            "pronunciation": "bùliánglǜ",
            "hanViet": "BẤT LƯƠNG SUẤT",
            "partOfSpeech": "noun",
            "meaningVi": "Tỷ lệ hàng lỗi phế phẩm (Defect rate / Scrap rate)",
            "radicals": "不良 (Hỏng hóc khiếm khuyết) + 率 (Suất - tỷ lệ phần trăm)",
            "grammarNote": "Giảm tỷ lệ lỗi: 降低不良率. Đo bằng phần triệu: PPM (Parts Per Million).",
            "exampleSentence": {
              "target": "通过推行六西格玛质量管理方法，车间产品的不良率从千分之三降到了五十个PPM以内。",
              "pronunciation": "Tōngguò tuīxíng Liù Xīgémǎ zhìliàng guǎnlǐ fāngfǎ, chējiān chǎnpǐn de bùliánglǜ cóng qiānfēnzhī sān jiàng dào le wǔshí ge PPM yǐnèi.",
              "meaningVi": "Thông qua triển khai phương pháp quản lý chất lượng Six Sigma, tỷ lệ lỗi sản phẩm của xưởng từ 3 phần nghìn đã hạ xuống dưới 50 PPM."
            }
          },
          {
            "id": "zh_h6_2_2",
            "word": "抽样检验",
            "pronunciation": "chōuyàng jiǎnyàn",
            "hanViet": "TRỪU DẠNG KIỂM NGHIỆM",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Kiểm tra mẫu rút ngẫu nhiên (Sampling Inspection / AQL Standard)",
            "radicals": "抽样 (Lấy mẫu ngẫu nhiên) + 检验 (Kiểm nghiệm đo lường)",
            "grammarNote": "Tiêu chuẩn quốc tế: 按照AQL标准抽样检验.",
            "exampleSentence": {
              "target": "质检员严格依照国际AQL二级检验标准对每批入库原料进行随机抽样检验。",
              "pronunciation": "Zhìjiǎnyuán yángé yīzhào guójì AQL èr jí jiǎnyàn biāozhǔn duì měi pī rùkù yuánliào jìnxíng suíjī chōuyàng jiǎnyàn.",
              "meaningVi": "Nhân viên kiểm tra chất lượng tuân thủ nghiêm ngặt tiêu chuẩn kiểm tra AQL cấp 2 quốc tế để tiến hành kiểm tra mẫu rút ngẫu nhiên đối với mỗi lô nguyên liệu nhập kho."
            }
          },
          {
            "id": "zh_h6_2_3",
            "word": "公差",
            "pronunciation": "gōngchā",
            "hanViet": "CÔNG SOA",
            "partOfSpeech": "noun",
            "meaningVi": "Dung sai cho phép trong cơ khí chính xác (Tolerance)",
            "radicals": "公 (Công - tiêu chuẩn chung) + 差 (Soa - sai số cho phép)",
            "grammarNote": "Dung sai hình học: 几何公差. Vượt quá dung sai: 超出公差范围.",
            "exampleSentence": {
              "target": "这批航空精密结构件的加工尺寸公差必须严格控制在正负零点零零五毫米之内。",
              "pronunciation": "Zhè pī hángkōng jīngmì jiégòujiàn de jiāgōng chǐcun gōngchā bìxū yángé kòngzhì zài zhèng-fù líng diǎn líng líng wǔ háomǐ zhīnèi.",
              "meaningVi": "Dung sai kích thước gia công của lô linh kiện kết cấu hàng không chính xác này bắt buộc phải kiểm soát nghiêm ngặt trong phạm vi cộng trừ 0.005 milimét."
            }
          },
          {
            "id": "zh_h6_2_4",
            "word": "品保",
            "pronunciation": "pǐnbǎo",
            "hanViet": "PHẨM BẢO",
            "partOfSpeech": "noun",
            "meaningVi": "Đảm bảo chất lượng (QA - Quality Assurance)",
            "radicals": "品 (Chất lượng sản phẩm) + 保 (Bảo đảm cam kết)",
            "grammarNote": "Phòng phẩm bảo: 品保部. Trưởng bộ phận QA: 品保经理.",
            "exampleSentence": {
              "target": "所有新产品必须由品保部出具全套可靠性测试合格报告后，方能批准量产。",
              "pronunciation": "Suǒyǒu xīn chǎnpǐn bìxū yóu pǐnbǎobù chūjù quántào kěkàoxìng cèshì hégé bàogào hòu, fāng néng pīzhǔn liàngchǎn.",
              "meaningVi": "Mọi sản phẩm mới bắt buộc phải do bộ phận QA cấp toàn bộ báo cáo đạt thử nghiệm độ tin cậy, sau đó mới được phê duyệt sản xuất hàng loạt."
            }
          },
          {
            "id": "zh_h6_2_5",
            "word": "报废",
            "pronunciation": "bàofèi",
            "hanViet": "BÁO PHẾ",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Báo phế, vứt bỏ hàng hỏng không thể sửa (Scrap)",
            "radicals": "报 (Báo - khai báo) + 废 (Phế - đồ bỏ đi)",
            "grammarNote": "Tỷ lệ phế phẩm: 报废率. Quy trình tiêu hủy: 报废处理.",
            "exampleSentence": {
              "target": "因焊锡温度异常导致电路板内部微晶烧毁，整批产品只能作报废处理。",
              "pronunciation": "Yīn hànxī wēndù yìcháng dǎozhì diànlùbǎn nèibù wēijīng shāohuǐ, zhěng pī chǎnpǐn zhǐ néng zuò bàofèi chǔlǐ.",
              "meaningVi": "Do nhiệt độ thiếc hàn bất thường dẫn đến vi tinh thể bên trong bo mạch bị cháy hỏng, toàn bộ lô sản phẩm chỉ có thể đưa vào xử lý báo phế."
            }
          },
          {
            "id": "zh_h6_2_6",
            "word": "返工",
            "pronunciation": "fǎngōng",
            "hanViet": "PHẢN CÔNG",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Làm lại, sửa hàng lỗi (Rework)",
            "radicals": "返 (Phản - quay trở lại) + 工 (Công - gia công)",
            "grammarNote": "Khu vực sửa chữa hàng lỗi: 返工区.",
            "exampleSentence": {
              "target": "未通过最终出货检验的批次必须退回返工区重新拆解并排查原因。",
              "pronunciation": "Wèitōngguò zuìzhōng chūhuò jiǎnyàn de pīcì bìxū tuìhuí fǎngōngqū chóngxīn chāijiě bìng páichá yuányīn.",
              "meaningVi": "Các lô hàng không vượt qua khâu kiểm tra xuất hàng cuối cùng bắt buộc phải trả về khu vực làm lại để tháo dỡ lại và rà soát nguyên nhân."
            }
          },
          {
            "id": "zh_h6_2_7",
            "word": "追溯",
            "pronunciation": "zhuīsù",
            "hanViet": "TRUY TỐ",
            "partOfSpeech": "verb",
            "meaningVi": "Truy xuất nguồn gốc xuất xứ (Traceability)",
            "radicals": "追 (Truy - lần theo dấu vết) + 溯 (Tố - lần ngược dòng nước)",
            "grammarNote": "Hệ thống truy xuất nguồn gốc: 质量追溯系统. Mã vạch truy xuất: 追溯码.",
            "exampleSentence": {
              "target": "扫描外包装上的唯一二维码，可以追溯到该产品由哪位工人、在哪台机床、何时生产。",
              "pronunciation": "Sǎomiáo wàibāozhuāng shang de wéiyī èrwéimǎ, kěyǐ zhuīsù dào gāi chǎnpǐn yóu nǎ wèi gōngrén, zài nǎ tái jīchuáng, héshí shēngchǎn.",
              "meaningVi": "Quét mã QR duy nhất trên bao bì ngoài, có thể truy xuất đến sản phẩm này do công nhân nào, trên cỗ máy nào và sản xuất vào thời điểm nào."
            }
          },
          {
            "id": "zh_h6_2_8",
            "word": "达标",
            "pronunciation": "dábiāo",
            "hanViet": "ĐẠT TIÊU",
            "partOfSpeech": "verb",
            "meaningVi": "Đạt chuẩn, chạm mốc tiêu chuẩn đề ra",
            "radicals": "达 (Đạt - tới nơi) + 标 (Tiêu - tiêu chuẩn)",
            "grammarNote": "Tỷ lệ đạt chuẩn: 达标率. Không đạt tiêu chuẩn: 未达标.",
            "exampleSentence": {
              "target": "经过工艺改进，本月首件检查达标率由原本的百分之九十提升至百分之九十八点五。",
              "pronunciation": "Jīngguò gōngyì gǎijìn, běn yuè shǒujiàn jiǎnchá dábiāolǜ yóu yuánběn de bǎifēnzhī jiǔshí tíshēng zhì bǎifēnzhī jiǔshíbā diǎn wǔ.",
              "meaningVi": "Sau cải tiến công nghệ, tỷ lệ đạt chuẩn kiểm tra sản phẩm đầu tiên của tháng này đã từ 90% ban đầu nâng lên đến 98.5%."
            }
          }
        ]
      },
      {
        "id": "zh_hsk6_l3",
        "title": "Bài 3: Quy Trình Thao Tác Chuẩn SOP & Phòng Sạch (Cleanroom, PPE)",
        "grammarFocus": "Tiêu chuẩn nhà máy công nghệ cao: 标准作业程序 (SOP), 无尘室 (Cleanroom), 静电防护 (ESD), 劳保用品 (PPE).",
        "vocabularies": [
          {
            "id": "zh_h6_3_1",
            "word": "操作规程",
            "pronunciation": "cāozuò guīchéng",
            "hanViet": "THAO TÁC QUY TRÌNH",
            "partOfSpeech": "noun",
            "meaningVi": "Quy trình thao tác chuẩn (SOP - Standard Operating Procedure)",
            "radicals": "操作 (Vận hành tay nghề) + 规程 (Quy định trình tự)",
            "grammarNote": "Tuân thủ SOP: 严格按照标准操作规程作业.",
            "exampleSentence": {
              "target": "每位现场操作工在上岗前必须熟背并严格遵守本科室的标准操作规程。",
              "pronunciation": "Měi wèi xiànchǎng cāozuògōng zài shànggǎng qián bìxū shúbèi bìng yángé zūnshǒu běn kēshì de biāozhǔn cāozuò guīchéng.",
              "meaningVi": "Mỗi công nhân thao tác tại hiện trường trước khi vào vị trí bắt buộc phải học thuộc và tuân thủ nghiêm ngặt quy trình thao tác chuẩn của phòng ban mình."
            }
          },
          {
            "id": "zh_h6_3_2",
            "word": "无尘室",
            "pronunciation": "wúchénshì",
            "hanViet": "VÔ TRẦN THẤT",
            "partOfSpeech": "noun",
            "meaningVi": "Phòng sạch sản xuất vi mạch/dược phẩm (Cleanroom)",
            "radicals": "无尘 (Không có bụi bẩn) + 室 (Căn phòng kín)",
            "grammarNote": "Cấp độ phòng sạch: 万级无尘室 (Class 10,000), 百级无尘室 (Class 100).",
            "exampleSentence": {
              "target": "进入半导体百级无尘室之前，必须穿戴全身防静电服并经过风淋室彻底除尘。",
              "pronunciation": "Jìnrù bàndǎotǐ bǎi jí wúchénshì zhīqián, bìxū chuāndài quánshēn fángjìngdiàn fú bìng jīngguò fēnglínshì chèdǐ chúchén.",
              "meaningVi": "Trước khi bước vào phòng sạch bán dẫn cấp 100, bắt buộc phải mặc trang phục chống tĩnh điện toàn thân và đi qua buồng tắm khí (Air shower) để thổi sạch bụi triệt để."
            }
          },
          {
            "id": "zh_h6_3_3",
            "word": "防静电",
            "pronunciation": "fáng jìngdiàn",
            "hanViet": "PHÒNG TĨNH ĐIỆN",
            "partOfSpeech": "adj/verb",
            "meaningVi": "Chống tĩnh điện, bảo vệ linh kiện vi điện tử (ESD Protection)",
            "radicals": "防 (Phòng ngừa) + 静电 (Tĩnh điện ma sát)",
            "grammarNote": "Vòng đeo tay chống tĩnh điện: 防静电手环. Giày chống tĩnh điện: 防静电鞋.",
            "exampleSentence": {
              "target": "在接触高灵敏度集成电路板时，必须佩戴经过阻值检测合格的防静电手环。",
              "pronunciation": "Zài jiēchù gāo língmǐndù jíchéng diànlùbǎn shí, bìxū pèidài jīngguò zǔzhí jiǎncè hégé de fángjìngdiàn shǒuhuán.",
              "meaningVi": "Khi tiếp xúc với bo mạch tích hợp độ nhạy cao, bắt buộc phải đeo vòng tay chống tĩnh điện đã qua kiểm tra trị số điện trở đạt chuẩn."
            }
          },
          {
            "id": "zh_h6_3_4",
            "word": "防护",
            "pronunciation": "fánghù",
            "hanViet": "PHÒNG HỘ",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Bảo hộ an toàn, đồ bảo hộ lao động (PPE)",
            "radicals": "防 (Phòng chống) + 护 (Che chở bảo vệ)",
            "grammarNote": "Đồ bảo hộ lao động cá nhân: 个人防护装备 (PPE). Kính bảo hộ: 防护眼镜.",
            "exampleSentence": {
              "target": "在化学清洗工位作业的员工必须按规定穿戴防酸碱手套和全封闭防护面罩。",
              "pronunciation": "Zài huàxué qīngxǐ gōngwèi zuòyè de yuángōng bìxū àn guīdìng chuāndài fáng suān-jiǎn shǒutào hé quán fēngbì fánghù miànzhào.",
              "meaningVi": "Nhân viên thao tác tại vị trí tẩy rửa hóa chất bắt buộc phải đeo găng tay chống axit kiềm và mặt nạ bảo hộ kín toàn diện theo quy định."
            }
          },
          {
            "id": "zh_h6_3_5",
            "word": "违章",
            "pronunciation": "wéizhāng",
            "hanViet": "VI CHƯƠNG",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Vi phạm quy tắc quy định an toàn (Violation)",
            "radicals": "违 (Vi phạm) + 章 (Chương - điều lệ chương trình)",
            "grammarNote": "Thao tác sai quy tắc: 违章操作. Khẩu hiệu nhà máy: 杜绝违章.",
            "exampleSentence": {
              "target": "安全督导员在巡查中一旦发现违章操作行为，有权立即叫停作业并开具整改通知单。",
              "pronunciation": "Ānquán dūdǎoyuán zài xúnchá zhōng yídàn fāxiàn wéizhāng cāozuò xíngwéi, yǒu quán lìjí jiàotíng zuòyè bìng kāijù zhěnggǎi tōngzhīdān.",
              "meaningVi": "Giám sát viên an toàn trong lúc tuần tra một khi phát hiện hành vi thao tác sai quy định, có quyền yêu cầu dừng công việc ngay lập tức và lập phiếu thông báo khắc phục."
            }
          },
          {
            "id": "zh_h6_3_6",
            "word": "巡检",
            "pronunciation": "xúnjiǎn",
            "hanViet": "TUẦN KIỂM",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Tuần tra kiểm tra định kỳ hiện trường (Patrol inspection)",
            "radicals": "巡 (Tuần - đi tuần tra) + 检 (Kiểm - kiểm tra)",
            "grammarNote": "Kiểm tra lưu động của IPQC: 巡检记录表.",
            "exampleSentence": {
              "target": "制程质检员每隔两小时需对生产线各个工序的温湿度和设备参数进行一次巡检。",
              "pronunciation": "Zhìchéng zhìjiǎnyuán měi gé liǎng xiǎoshí xū duì shēngchǎnxiàn gè ge gōngxù de wēn-shīdù hé shèbèi cānshù jìnxíng yí cì xúnjiǎn.",
              "meaningVi": "Nhân viên kiểm tra chất lượng công đoạn cứ cách 2 giờ cần tiến hành tuần tra kiểm tra một lần đối với nhiệt ẩm độ và thông số thiết bị của các công đoạn trên dây chuyền."
            }
          },
          {
            "id": "zh_h6_3_7",
            "word": "警示",
            "pronunciation": "jǐngshì",
            "hanViet": "CẢNH THỊ",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Cảnh báo nhắc nhở an toàn",
            "radicals": "警 (Cảnh - báo động) + 示 (Thị - hiển thị cho thấy)",
            "grammarNote": "Biển cảnh báo nguy hiểm: 安全警示标志.",
            "exampleSentence": {
              "target": "高压配电房和激光切割机周围均张贴有醒目的黄黑相间警示标语。",
              "pronunciation": "Gāoyā pèidiànfáng hé jīguāng qiēgējī zhōuwéi jūn zhāngtiē yǒu xǐngmù de huáng-hēi xiāngjiàn jǐngshì biāoyǔ.",
              "meaningVi": "Xung quanh phòng phân phối điện cao áp và máy cắt laser đều được dán các khẩu hiệu cảnh báo sọc vàng đen bắt mắt."
            }
          },
          {
            "id": "zh_h6_3_8",
            "word": "素养",
            "pronunciation": "sùyǎng",
            "hanViet": "TỐ DƯỠNG",
            "partOfSpeech": "noun",
            "meaningVi": "Ý thức tự giác, chữ S thứ 5 trong mô hình 5S (Shitsuke)",
            "radicals": "素 (Tố - nguyên bản tố chất) + 养 (Dưỡng - nuôi dưỡng rèn rũa)",
            "grammarNote": "5S nhà máy Nhật: 整理(Seiri), 整顿(Seiton), 清扫(Seiso), 清洁(Seiketsu), 素养(Shitsuke).",
            "exampleSentence": {
              "target": "推行5S管理的核心归根结底在于提升全体员工的职业素养和自我约束力。",
              "pronunciation": "Tuīxíng Wǔ S guǎnlǐ de héxīn guīgēnjiédǐ zàiyú tíshēng quántǐ yuángōng de zhíyè sùyǎng hé zìwǒ yuēshùlì.",
              "meaningVi": "Cốt lõi của việc triển khai quản lý 5S suy cho cùng nằm ở chỗ nâng cao tố dưỡng nghề nghiệp và ý thức tự giác kỷ luật của toàn thể nhân viên."
            }
          }
        ]
      },
      {
        "id": "zh_hsk6_l4",
        "title": "Bài 4: Quản Lý Kho Nguyên Vật Liệu (BOM, FIFO, Ký Mã Hiệu)",
        "grammarFocus": "Quản trị kho vận nhà máy: 物料清单 (BOM), 先进先出 (FIFO), 安全库存 (Safety stock), 盘点 (Kiểm kê).",
        "vocabularies": [
          {
            "id": "zh_h6_4_1",
            "word": "物料清单",
            "pronunciation": "wùliào qīngdān",
            "hanViet": "VẬT LIỆU THANH ĐƠN",
            "partOfSpeech": "noun",
            "meaningVi": "Bảng định mức nguyên vật liệu sản phẩm (BOM - Bill of Materials)",
            "radicals": "物料 (Vật liệu linh kiện) + 清单 (Bảng danh sách chi tiết)",
            "grammarNote": "Khớp nối hệ thống ERP: 根据BOM清单领料.",
            "exampleSentence": {
              "target": "研发部门对产品架构进行改版后，必须同步在ERP系统中更新对应的物料清单。",
              "pronunciation": "Yánfā bùmén duì chǎnpǐn jiàgòu jìnxíng gǎibǎn hòu, bìxū tóngbù zài ERP xìtǒng zhōng gēngxīn duìyìng de wùliào qīngdān.",
              "meaningVi": "Phòng nghiên cứu phát triển sau khi sửa đổi kiến trúc sản phẩm, bắt buộc phải cập nhật đồng bộ bảng định mức nguyên vật liệu tương ứng trên hệ thống ERP."
            }
          },
          {
            "id": "zh_h6_4_2",
            "word": "先进先出",
            "pronunciation": "xiān jìn xiān chū",
            "hanViet": "TIÊN TIẾN TIÊN XUẤT",
            "partOfSpeech": "idiom",
            "meaningVi": "Nguyên tắc nhập trước xuất trước trong kho bãi (FIFO - First In, First Out)",
            "radicals": "先进 (Vào trước) + 先出 (Xuất ra trước)",
            "grammarNote": "Ngăn ngừa hàng quá hạn: 严格遵守先进先出原则.",
            "exampleSentence": {
              "target": "仓储管理员必须严格执行先进先出原则，防止易受潮胶水因超期存放而失效。",
              "pronunciation": "Cāngchǔ guǎnlǐyuán bìxū yángé zhíxíng xiānjìn-xiānchū yuánzé, fángzhǐ yì shòucháo jiāoshuǐ yīn chāoqī cúnfàng ér shīxiào.",
              "meaningVi": "Thủ kho bắt buộc phải chấp hành nghiêm ngặt nguyên tắc nhập trước xuất trước, phòng ngừa keo dán dễ hút ẩm bị mất tác dụng do lưu kho quá hạn."
            }
          },
          {
            "id": "zh_h6_4_3",
            "word": "盘点",
            "pronunciation": "pándiǎn",
            "hanViet": "BÀN ĐIỂM",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Kiểm kê kho hàng, đối chiếu số liệu thực tế (Inventory count)",
            "radicals": "盘 (Bàn - mâm tính đếm) + 点 (Điểm - đếm từng chiếc)",
            "grammarNote": "Kiểm kê cuối tháng: 月末盘点. Kiểm kê cuối năm: 年终大盘点.",
            "exampleSentence": {
              "target": "仓库在月末大盘点时发现实际物料数量与财务账面记录保持百分之百吻合。",
              "pronunciation": "Cāngkù zài yuèmò dà pándiǎn shí fāxiàn shíjì wùliào shùliàng yǔ cáiwù zhàngmiàn jìlù bǎochí bǎifēnzhī bǎi wěnhé.",
              "meaningVi": "Kho hàng trong đợt đại kiểm kê cuối tháng phát hiện số lượng vật tư thực tế ăn khớp 100% với ghi chép sổ sách kế toán."
            }
          },
          {
            "id": "zh_h6_4_4",
            "word": "安全库存",
            "pronunciation": "ānquán kùcún",
            "hanViet": "AN TOÀN KHỐ TỒN",
            "partOfSpeech": "noun",
            "meaningVi": "Lượng tồn kho an toàn đệm dự phòng (Safety stock)",
            "radicals": "安全 (An toàn) + 库存 (Hàng tồn kho)",
            "grammarNote": "Cảnh báo dưới ngưỡng: 低于安全库存水位.",
            "exampleSentence": {
              "target": "为应对上游芯片断供危机，采购部已将通用晶体管的安全库存天数从十五天提高到了四十五天。",
              "pronunciation": "Wèi yìngduì shàngyóu xīnpiàn duàngōng wēijī, cǎigòubù yǐ jiāng tōngyòng jīngtǐguǎn de ānquán kùcún tiānshù cóng shíwǔ tiān tígāo dào le sìshíwǔ tiān.",
              "meaningVi": "Để ứng phó nguy cơ đứt nguồn cung chip thượng nguồn, phòng thu mua đã nâng số ngày tồn kho an toàn của bóng bán dẫn thông dụng từ 15 ngày lên 45 ngày."
            }
          },
          {
            "id": "zh_h6_4_5",
            "word": "领料",
            "pronunciation": "lǐngliào",
            "hanViet": "LÃNH LIỆU",
            "partOfSpeech": "verb",
            "meaningVi": "Lĩnh vật tư, xuất kho vật liệu cho xưởng sản xuất",
            "radicals": "领 (Lãnh - nhận lấy) + 料 (Liệu - nguyên vật liệu)",
            "grammarNote": "Phiếu lĩnh vật tư: 领料单.",
            "exampleSentence": {
              "target": "车间物料员凭生产主管签字确认的领料单前往一号立体仓库申领电子元器件。",
              "pronunciation": "Chējiān wùliàoyuán píng shēngchǎn zhǔguǎn qiānzì quèrèn de lǐngliàodān qiánwǎng yī hào lìtǐ cāngkù shēnlǐng diànzǐ yuánqìjiàn.",
              "meaningVi": "Nhân viên vật tư của xưởng dựa vào phiếu lĩnh vật tư có chữ ký xác nhận của chủ quản sản xuất đến kho lập thể số 1 nhận linh kiện điện tử."
            }
          },
          {
            "id": "zh_h6_4_6",
            "word": "呆滞料",
            "pronunciation": "dāizhìliào",
            "hanViet": "NGỐC TRỆ LIỆU",
            "partOfSpeech": "noun",
            "meaningVi": "Vật tư ứ đọng, tồn kho chết không sử dụng (Dead inventory / Obsolete stock)",
            "radicals": "呆滞 (Trì trệ ứ đọng) + 料 (Vật liệu)",
            "grammarNote": "Thanh lý hàng tồn đọng: 清理呆滞物料.",
            "exampleSentence": {
              "target": "公司定期召开跨部门评审会，研究处理因客户改型而滞留在库房的大量呆滞料。",
              "pronunciation": "Gōngsī dìngqī zhàokāi kuàbùmén píngshěnhuì, yánjiū chǔlǐ yīn kèhù gǎixíng ér zhìliú zài kùfáng de dàliàng dāizhìliào.",
              "meaningVi": "Công ty định kỳ tổ chức cuộc họp thẩm định liên phòng ban, nghiên cứu xử lý lượng lớn vật tư tồn đọng ứ trong kho do khách hàng thay đổi mẫu mã."
            }
          },
          {
            "id": "zh_h6_4_7",
            "word": "条形码",
            "pronunciation": "tiáoxíngmǎ",
            "hanViet": "ĐIỀU HÌNH MÃ",
            "partOfSpeech": "noun",
            "meaningVi": "Mã vạch Barcode quản lý kho",
            "radicals": "条形 (Hình các vạch sọc) + 码 (Chữ số mã hóa)",
            "grammarNote": "Súng bắn mã vạch: 条码扫描枪 (PDA).",
            "exampleSentence": {
              "target": "仓管员利用无线手持终端扫描外箱条形码，五秒内即可完成入库数据录入。",
              "pronunciation": "Cāngguǎnyuán lìyòng wúxiàn shǒuchí zhōngduān sǎomiáo wàixiāng tiáoxíngmǎ, wǔ miǎo nèi jíkě wánchéng rùkù shùjù lùrù.",
              "meaningVi": "Thủ kho tận dụng thiết bị đầu cuối cầm tay không dây quét mã vạch trên thùng ngoài, trong 5 giây là có thể hoàn thành việc nhập dữ liệu vào kho."
            }
          },
          {
            "id": "zh_h6_4_8",
            "word": "库位",
            "pronunciation": "kùwèi",
            "hanViet": "KHỐ VỊ",
            "partOfSpeech": "noun",
            "meaningVi": "Vị trí kệ để hàng trong kho (Bin location)",
            "radicals": "库 (Kho) + 位 (Vị trí tọa độ)",
            "grammarNote": "Định vị vị trí kho: 库位编号.",
            "exampleSentence": {
              "target": "每个料架均编有唯一的立体库位号，使叉车司机能够准确定位并迅速取货。",
              "pronunciation": "Měi ge liàojià jūn biān yǒu wéiyī de lìtǐ kùwèihào, shǐ chāchē sījī nénggòu zhǔnquè dìngwèi bìng xùnsù qǔhuò.",
              "meaningVi": "Mỗi giá để hàng đều được đánh số vị trí kho lập thể duy nhất, giúp lái xe nâng có thể định vị chuẩn xác và lấy hàng nhanh chóng."
            }
          }
        ]
      },
      {
        "id": "zh_hsk6_l5",
        "title": "Bài 5: Thiết Bị Máy Móc & Bảo Trì Bảo Dưỡng Định Kỳ (TPM)",
        "grammarFocus": "Quản lý bảo trì nhà máy: 全员生产维护 (TPM), 预防性维护 (Preventive maintenance), 故障率 (Downtime).",
        "vocabularies": [
          {
            "id": "zh_h6_5_1",
            "word": "保养",
            "pronunciation": "bǎoyǎng",
            "hanViet": "BẢO DƯỠNG",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Bảo dưỡng định kỳ thiết bị máy móc",
            "radicals": "保 (Bảo quản) + 养 (Nuôi dưỡng máy chạy bền)",
            "grammarNote": "Cấp độ bảo dưỡng: 日常保养 (hàng ngày), 一级保养 (định kỳ).",
            "exampleSentence": {
              "target": "按照设备维护手册，自动化冲压机必须每周进行一次润滑与清洁保养。",
              "pronunciation": "Ànzhào shèbèi wéihù shǒucè, zìdònghuà chōngyājī bìxū měi zhōu jìnxíng yí cì rùnhuá yǔ qīngjié bǎoyǎng.",
              "meaningVi": "Theo sổ tay bảo trì thiết bị, máy đột dập tự động bắt buộc mỗi tuần phải tiến hành tra dầu bôi trơn và vệ sinh bảo dưỡng một lần."
            }
          },
          {
            "id": "zh_h6_5_2",
            "word": "故障",
            "pronunciation": "gùzhàng",
            "hanViet": "CỐ CHƯỚNG",
            "partOfSpeech": "noun",
            "meaningVi": "Sự cố hỏng hóc máy móc",
            "radicals": "故 (Cố - nguyên cớ biến cố) + 障 (Chướng - cản trở tắc nghẽn)",
            "grammarNote": "Thời gian dừng máy do sự cố: 故障停机时间 (Downtime). Xử lý sự cố: 排除故障.",
            "exampleSentence": {
              "target": "主电机突发过热故障导致整条涂装生产线停滞了整整三个小时。",
              "pronunciation": "Zhǔ diànjī tūfā guòrè gùzhàng dǎozhì zhěng tiáo túzhuāng shēngchǎnxiàn tíngzhì le zhěngzhěng sān ge xiǎoshí.",
              "meaningVi": "Động cơ chính đột ngột gặp sự cố quá nhiệt khiến cho toàn bộ dây chuyền sơn bị ngưng trệ suốt 3 giờ đồng hồ."
            }
          },
          {
            "id": "zh_h6_5_3",
            "word": "备件",
            "pronunciation": "bèijiàn",
            "hanViet": "BỊ KIỆN",
            "partOfSpeech": "noun",
            "meaningVi": "Linh kiện phụ tùng thay thế dự phòng (Spare parts)",
            "radicals": "备 (Bị - chuẩn bị sẵn) + 件 (Kiện - phụ tùng)",
            "grammarNote": "Kho phụ tùng: 备品备件库.",
            "exampleSentence": {
              "target": "关键机床易损备件必须在车间备件仓库内常年保持两套以上的周转库存。",
              "pronunciation": "Guānjiàn jīchuáng yìsǔn bèijiàn bìxū zài chējiān bèijiàn cāngkù nèi chángnián bǎochí liǎng tào yǐshàng de zhōuzhuǎn kùcún.",
              "meaningVi": "Phụ tùng thay thế dễ hao mòn của máy công cụ then chốt bắt buộc phải duy trì tồn kho luân chuyển từ 2 bộ trở lên quanh năm trong kho phụ tùng của xưởng."
            }
          },
          {
            "id": "zh_h6_5_4",
            "word": "磨损",
            "pronunciation": "mósǔn",
            "hanViet": "MA TỔN",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Hao mòn, mài mòn do ma sát cơ học (Wear and tear)",
            "radicals": "磨 (Ma - cọ xát ma sát) + 损 (Tổn - hư tổn sứt mẻ)",
            "grammarNote": "Hao mòn tự nhiên: 正常磨损. Thay thế vì mòn: 磨损更换.",
            "exampleSentence": {
              "target": "高速切削刀具在使用八十小时后刀刃会出现严重磨损，必须按时更换。",
              "pronunciation": "Gāosù qiēxiāo dāojù zài shǐyòng bāshí xiǎoshí hòu dāorèn huì chūxiàn yánzhòng mósǔn, bìxū ànshí gēnghuàn.",
              "meaningVi": "Dao cắt gọt tốc độ cao sau khi sử dụng 80 giờ lưỡi dao sẽ xuất hiện mài mòn nghiêm trọng, bắt buộc phải thay thế đúng giờ."
            }
          },
          {
            "id": "zh_h6_5_5",
            "word": "校准",
            "pronunciation": "jiàozhǔn",
            "hanViet": "HIỆU CHUẨN",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Hiệu chuẩn thiết bị đo lường (Calibration)",
            "radicals": "校 (Hiệu - so sánh kiểm tra) + 准 (Chuẩn - độ chuẩn xác)",
            "grammarNote": "Tem kiểm định hiệu chuẩn: 校准合格标签.",
            "exampleSentence": {
              "target": "三坐标测量仪等高精密度计量仪器必须每年送交国家法定机构进行强制校准。",
              "pronunciation": "Sān zuòbiāo cèliángyí děng gāo jīngmìdù jìliáng yíqì bìxū měi nián sòngjiāo guójiā fǎdìng jīgòu jìnxíng qiángzhì jiàozhǔn.",
              "meaningVi": "Dụng cụ đo lường độ chính xác cao như máy đo tọa độ 3 chiều bắt buộc hàng năm phải gửi đến cơ quan pháp định nhà nước để hiệu chuẩn bắt buộc."
            }
          },
          {
            "id": "zh_h6_5_6",
            "word": "寿命",
            "pronunciation": "shòumìng",
            "hanViet": "THỌ MỆNH",
            "partOfSpeech": "noun",
            "meaningVi": "Tuổi thọ sử dụng của máy móc linh kiện",
            "radicals": "寿 (Thọ - sống lâu) + 命 (Mệnh - mệnh số)",
            "grammarNote": "Kéo dài tuổi thọ: 延长使用寿命.",
            "exampleSentence": {
              "target": "规范的日常点检与良好的润滑状态能够极大延长电机的使用寿命。",
              "pronunciation": "Guīfàn de rìcháng diǎnjiǎn yǔ liánghǎo de rùnhuá zhuàngtài nénggòu jídà yáncháng diànjī de shǐyòng shòumìng.",
              "meaningVi": "Kiểm tra điểm hàng ngày đúng quy chuẩn và trạng thái bôi trơn tốt đẹp có thể kéo dài cực lớn tuổi thọ sử dụng của động cơ điện."
            }
          },
          {
            "id": "zh_h6_5_7",
            "word": "停机",
            "pronunciation": "tíngjī",
            "hanViet": "ĐÌNH CƠ",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Tắt máy, ngưng máy ngừng dây chuyền (Shutdown)",
            "radicals": "停 (Đình - dừng lại) + 机 (Cơ - cỗ máy)",
            "grammarNote": "Dừng máy khẩn cấp: 紧急停机 (E-Stop).",
            "exampleSentence": {
              "target": "一旦发生人身安全险情，现场任何操作人员均有权按下红色紧急停机按钮。",
              "pronunciation": "Yídàn fāshēng rénshēn ānquán xiǎnqíng, xiànchǎng rènhé cāozuò rényuán jūn yǒu quán ànxià hóngsè jǐnjí tíngjī ànniǔ.",
              "meaningVi": "Một khi phát sinh tình huống hiểm nguy an toàn thân thể, bất kỳ nhân viên thao tác nào tại hiện trường đều có quyền bấm nút màu đỏ dừng máy khẩn cấp."
            }
          },
          {
            "id": "zh_h6_5_8",
            "word": "点检",
            "pronunciation": "diǎnjiǎn",
            "hanViet": "ĐIỂM KIỂM",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Kiểm tra từng điểm theo checklist hàng ngày (Spot check)",
            "radicals": "点 (Điểm - từng hạng mục) + 检 (Kiểm - rà soát)",
            "grammarNote": "Bảng checklist kiểm tra thiết bị: 设备点检表.",
            "exampleSentence": {
              "target": "开工前必须逐项对照设备点检表确认油位、气压和电压均处于正常工作区间。",
              "pronunciation": "Kāigōng qián bìxū zhúxiàng duìzhào shèbèi diǎnjiǎnbǐao quèrèn yóuwèi, qìyā hé diànyā jūn chǔyú zhèngcháng gōngzuò qūjiān.",
              "meaningVi": "Trước khi bắt đầu làm việc bắt buộc phải đối chiếu từng mục theo bảng checklist thiết bị để xác nhận mức dầu, áp suất khí và điện áp đều nằm trong khoảng làm việc bình thường."
            }
          }
        ]
      },
      {
        "id": "zh_hsk6_l6",
        "title": "Bài 6: Thủ Tục Hải Quan & Thông Quan Xuất Nhập Khẩu (Customs Clearance)",
        "grammarFocus": "Nghiệp vụ xuất nhập khẩu: 报关 (Khai báo Hải quan), 通关 / 清关 (Thông quan), 海关编码 (Mã HS), 查验 (Kiểm hóa).",
        "vocabularies": [
          {
            "id": "zh_h6_6_1",
            "word": "报关",
            "pronunciation": "bàoguān",
            "hanViet": "BÁO QUAN",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Khai báo hải quan hàng hóa xuất nhập khẩu",
            "radicals": "报 (Báo - nộp tờ khai) + 关 (Quan - cửa khẩu hải quan)",
            "grammarNote": "Tờ khai hải quan: 报关单. Đại lý khai hải quan: 报关行.",
            "exampleSentence": {
              "target": "货运代理公司在货物到达边境口岸前二十四小时向海关预先申报了电子报关单。",
              "pronunciation": "Huòyùn dàilǐ gōngsī zài huòwù dàodá biānjìng kǒu'àn qián èrshísì xiǎoshí xiàng hǎiguān yùxiān shēnbào le diànzǐ bàoguāndān.",
              "meaningVi": "Công ty đại lý giao nhận vận tải 24 giờ trước khi hàng tới cửa khẩu biên giới đã khai báo trước tờ khai hải quan điện tử cho hải quan."
            }
          },
          {
            "id": "zh_h6_6_2",
            "word": "清关",
            "pronunciation": "qīngguān",
            "hanViet": "THANH QUAN",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Thông quan hàng hóa hoàn tất thủ tục thuế (Customs Clearance)",
            "radicals": "清 (Thanh - làm sạch, hoàn tất thanh toán) + 关 (Quan - cửa khẩu)",
            "grammarNote": "Hoàn tất thông quan: 顺利完成清关.",
            "exampleSentence": {
              "target": "由于单证齐全无误，整批医疗器械进口集装箱在海关仅用两小时便顺利完成清关放行。",
              "pronunciation": "Yóuyú dānzhèng qíquán wúwù, zhěng pī yīliáo qìxiè jìnkǒu jízhuāngxiāng zài hǎiguān jǐn yòng liǎng xiǎoshí biàn shùnlì wánchéng qīngguān fàngxíng.",
              "meaningVi": "Nhờ chứng từ đầy đủ không chút sai sót, toàn bộ lô container nhập khẩu thiết bị y tế tại hải quan chỉ mất 2 giờ là hoàn tất thông quan thông thả."
            }
          },
          {
            "id": "zh_h6_6_3",
            "word": "关税",
            "pronunciation": "guānshuì",
            "hanViet": "QUAN THUẾ",
            "partOfSpeech": "noun",
            "meaningVi": "Thuế xuất nhập khẩu, thuế hải quan (Customs Tariff)",
            "radicals": "关 (Quan - cửa khẩu) + 税 (Thuế - thuế khóa nhà nước)",
            "grammarNote": "Biểu thuế quan: 关税税率. Miễn thuế quan: 免征关税.",
            "exampleSentence": {
              "target": "根据中国与东盟自由贸易协定，原产于越南的大部分工业制品均享受零关税待遇。",
              "pronunciation": "Gēnjù Zhōngguó yǔ Dōngméng zìyóu màoyì xiédìng, yuánchǎn yú Yuènán de dàbùfen gōngyè zhìpǐn jūn xiǎngshòu líng guānshuì dàiyù.",
              "meaningVi": "Căn cứ hiệp định thương mại tự do Trung Quốc - ASEAN, đại bộ phận sản phẩm công nghiệp có xuất xứ từ Việt Nam đều được hưởng đãi ngộ thuế quan 0%."
            }
          },
          {
            "id": "zh_h6_6_4",
            "word": "商品编码",
            "pronunciation": "shāngpǐn biānmǎ",
            "hanViet": "THƯƠNG PHẨM BIÊN MÃ",
            "partOfSpeech": "noun",
            "meaningVi": "Mã số hàng hóa quốc tế, mã HS Code",
            "radicals": "商品 (Hàng hóa thương phẩm) + 编码 (Đánh mã số)",
            "grammarNote": "Mã số 8 hoặc 10 chữ số: HS编码 (Harmonized System Code).",
            "exampleSentence": {
              "target": "海关编码归类错误可能导致申报税率不符甚至面临海关行政处罚。",
              "pronunciation": "Hǎiguān biānmǎ guīlèi cuòwù kěnéng dǎozhì shēnbào shuìlǜ bùfú shènzhì miànlín hǎiguān xíngzhèng chǔfá.",
              "meaningVi": "Phân loại mã HS sai có thể dẫn đến mức thuế suất khai báo không khớp, thậm chí đối mặt với xử phạt hành chính từ phía hải quan."
            }
          },
          {
            "id": "zh_h6_6_5",
            "word": "查验",
            "pronunciation": "cháyàn",
            "hanViet": "TRA NGHIỆM",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Kiểm hóa thực tế hàng hóa tại cảng (Customs Inspection)",
            "radicals": "查 (Tra - tra xét) + 验 (Nghiệm - kiểm tra thực tế đối chiếu)",
            "grammarNote": "Tỷ lệ kiểm hóa: 查验率. Kiểm tra mở thùng: 开箱查验.",
            "exampleSentence": {
              "target": "海关风险监控系统随机指令对该批高货值电子元器件进行机检和开箱人工查验。",
              "pronunciation": "Hǎiguān fēngxiǎn jiānkòng xìtǒng suíjī zhǐlìng duì gāi pī gāo huòzhí diànzǐ yuánqìjiàn jìnxíng jījiǎn hé kāixiāng réngōng cháyàn.",
              "meaningVi": "Hệ thống kiểm soát rủi ro hải quan ngẫu nhiên ra lệnh tiến hành soi chiếu máy và mở thùng kiểm tra nhân công đối với lô linh kiện điện tử giá trị cao này."
            }
          },
          {
            "id": "zh_h6_6_6",
            "word": "保税区",
            "pronunciation": "bǎoshuìqū",
            "hanViet": "BẢO THUẾ KHU",
            "partOfSpeech": "noun",
            "meaningVi": "Khu phi thuế quan, khu bảo thuế (Bonded Zone)",
            "radicals": "保税 (Tạm hoãn chưa thu thuế) + 区 (Khu vực địa lý)",
            "grammarNote": "Kho ngoại quan: 保税仓库 (Bonded Warehouse).",
            "exampleSentence": {
              "target": "企业将进口零配件存放在综合保税区内，在未进入国内市场销售前无需缴纳关税与增值税。",
              "pronunciation": "Qǐyè jiāng jìnkǒu língpèijiàn cúnfàng zài zōnghé bǎoshuìqū nèi, zài wèi jìnrù guónèi shìchǎng xiāoshòu qián wúxū jiǎonà guānshuì yǔ zēngzhíshuì.",
              "meaningVi": "Doanh nghiệp lưu giữ linh kiện nhập khẩu trong khu bảo thuế tổng hợp, khi chưa vào thị trường nội địa tiêu thụ thì chưa cần phải đóng thuế quan và thuế GTGT."
            }
          },
          {
            "id": "zh_h6_6_7",
            "word": "放行",
            "pronunciation": "fàngxíng",
            "hanViet": "PHÓNG HÀNH",
            "partOfSpeech": "verb",
            "meaningVi": "Thông quan cho phép kéo hàng rời cảng (Release)",
            "radicals": "放 (Phóng - mở đường thả đi) + 行 (Hành - di chuyển)",
            "grammarNote": "Phiếu giải phóng hàng: 放行条 (Release order).",
            "exampleSentence": {
              "target": "海关系统发出电子放行指令后，车队司机即可凭提货单进港装运集装箱。",
              "pronunciation": "Hǎiguān xìtǒng fāchū diànzǐ fàngxíng zhǐlìng hòu, chēduì sījī jíkě píng tíhuòdān jìn gǎng zhuāngyùn jízhuāngxiāng.",
              "meaningVi": "Sau khi hệ thống hải quan phát lệnh giải phóng hàng điện tử, lái xe của đội xe có thể dựa vào lệnh giao hàng vào cảng bốc xếp container."
            }
          },
          {
            "id": "zh_h6_6_8",
            "word": "单证",
            "pronunciation": "dānzhèng",
            "hanViet": "ĐƠN CHỨNG",
            "partOfSpeech": "noun",
            "meaningVi": "Bộ chứng từ xuất nhập khẩu (Shipping Documents)",
            "radicals": "单 (Đơn - hóa đơn phiếu) + 证 (Chứng - giấy chứng nhận)",
            "grammarNote": "Bộ chứng từ hoàn chỉnh: 单证齐全. Nhân viên chứng từ: 单证员.",
            "exampleSentence": {
              "target": "商业发票、装箱单和海运提单是国际货物贸易报关中最基本的全套核心单证。",
              "pronunciation": "Shāngyè fāpiào, zhuāngxiāngdān hé hǎiyùn tídān shì guójì huòwù màoyì bàoguān zhōng zuì jīběn de quántào héxīn dānzhèng.",
              "meaningVi": "Hóa đơn thương mại, phiếu đóng gói bao bì và vận đơn đường biển là bộ chứng từ cốt lõi căn bản nhất trong khai báo hải quan thương mại hàng hóa quốc tế."
            }
          }
        ]
      },
      {
        "id": "zh_hsk6_l7",
        "title": "Bài 7: Vận Tải Quốc Tế & Incoterms 2020 (FOB, CIF, Bill of Lading)",
        "grammarFocus": "Thuật ngữ Incoterms 2020: 离岸价 (FOB), 到岸价 (CIF), 海运提单 (Bill of Lading - B/L), 整箱货 (FCL) / 拼箱货 (LCL).",
        "vocabularies": [
          {
            "id": "zh_h6_7_1",
            "word": "提单",
            "pronunciation": "tídān",
            "hanViet": "ĐỀ ĐƠN",
            "partOfSpeech": "noun",
            "meaningVi": "Vận đơn đường biển (B/L - Bill of Lading)",
            "radicals": "提 (Đề - lấy hàng ra) + 单 (Đơn - chứng từ sở hữu)",
            "grammarNote": "Vận đơn gốc: 正本提单 (Original B/L). Vận đơn điện giao: 电放提单 (Telex Release).",
            "exampleSentence": {
              "target": "出口商在收到信用证项下全部货款后，方才向船运公司申请办理正本提单电放。",
              "pronunciation": "Chūkǒushāng zài shōudào xìnyòngzhèng xiàngxià quánbù huòkuǎn hòu, fāng cái xiàng chuányùn gōngsī shēnqǐng bànlǐ zhèngběn tídān diànfàng.",
              "meaningVi": "Nhà xuất khẩu sau khi nhận đủ toàn bộ tiền hàng dưới chứng từ L/C, mới nộp đơn lên hãng tàu xin làm điện giao vận đơn (Telex Release)."
            }
          },
          {
            "id": "zh_h6_7_2",
            "word": "集装箱",
            "pronunciation": "jízhuāngxiāng",
            "hanViet": "TẬP TRANG TƯƠNG",
            "partOfSpeech": "noun",
            "meaningVi": "Thùng container chở hàng",
            "radicals": "集 (Tập - gom lại) + 装 (Trang - chứa đựng) + 箱 (Tương - chiếc hòm lớn)",
            "grammarNote": "Container 20 feet: 20尺普柜. Container 40 feet cao: 40尺高柜 (40HQ).",
            "exampleSentence": {
              "target": "货运码头巨型龙门吊正在将满载货物的四十尺高柜集装箱稳稳吊装到货轮甲板上。",
              "pronunciation": "Huòyùn mǎtóu jùxíng lóngméndiào zhèngzài jiāng mǎnzǎi huòwù de sìshí chǐ gāoguì jízhuāngxiāng wěnwěn diàozhuāng dào huòlún jiǎbǎn shang.",
              "meaningVi": "Cẩu trục giàn khổng lồ ở bến cảng đang cẩu vững vàng các container 40HQ đầy ắp hàng hóa lên boong tàu chở hàng."
            }
          },
          {
            "id": "zh_h6_7_3",
            "word": "船期",
            "pronunciation": "chuánqī",
            "hanViet": "THUYỀN KỲ",
            "partOfSpeech": "noun",
            "meaningVi": "Lịch trình tàu biển chạy (Shipping schedule)",
            "radicals": "船 (Thuyền - tàu biển) + 期 (Kỳ - ngày giờ lịch hẹn)",
            "grammarNote": "Đặt chỗ tàu: 订舱 (Booking). Bắt kịp chuyến tàu: 赶上船期.",
            "exampleSentence": {
              "target": "工厂必须在截关日之前将货柜送达码头，否则一旦延误船期将面临巨额甩柜违约金。",
              "pronunciation": "Gōngchǎng bìxū zài jiéguānrì zhīqián jiāng huòguì sòngdá mǎtóu, fǒuzé yídàn yánwù chuánqī jiāng miànlín jù'é shuǎiguì wéiyuējīn.",
              "meaningVi": "Nhà máy bắt buộc phải chuyển container tới cảng trước ngày cắt máng đóng cửa hải quan, nếu không một khi trễ lịch tàu sẽ đối mặt tiền phạt rớt hàng khổng lồ."
            }
          },
          {
            "id": "zh_h6_7_4",
            "word": "运费",
            "pronunciation": "yùnfèi",
            "hanViet": "VẬN PHÍ",
            "partOfSpeech": "noun",
            "meaningVi": "Cước phí vận chuyển (Freight)",
            "radicals": "运 (Vận - vận tải di dời) + 费 (Phí - chi phí tiền bạc)",
            "grammarNote": "Cước trả trước: 运费预付 (Freight Prepaid). Cước trả sau: 运费到付 (Freight Collect).",
            "exampleSentence": {
              "target": "在CIF术语下，国际海运费与海洋货物运输保险费均由卖方预先承担垫付。",
              "pronunciation": "Zài CIF shùyǔ xià, guójì hǎiyùnfèi yǔ hǎiyáng huòwù yùnshū bǎoxiǎnfèi jūn yóu màifāng yùxiān chéngdān diànfù.",
              "meaningVi": "Dưới điều kiện CIF, cước vận tải biển quốc tế và phí bảo hiểm vận chuyển hàng hóa đường biển đều do bên bán chịu trách nhiệm ứng trước."
            }
          },
          {
            "id": "zh_h6_7_5",
            "word": "装箱单",
            "pronunciation": "zhuāngxiāngdān",
            "hanViet": "TRANG TƯƠNG ĐƠN",
            "partOfSpeech": "noun",
            "meaningVi": "Phiếu đóng gói chi tiết hàng hóa (Packing List)",
            "radicals": "装箱 (Đóng hàng vào thùng) + 单 (Bản danh sách kê khai)",
            "grammarNote": "Kê khai: 毛重 (Gross weight), 净重 (Net weight), 体积 (CBM).",
            "exampleSentence": {
              "target": "装箱单上标明的总件数、总净重和总毛重必须与提单上的数据完全一致。",
              "pronunciation": "Zhuāngxiāngdān shang biāomíng de zǒng jiànshù, zǒng jìngzhòng hé zǒng máozhòng bìxū yǔ tídān shang de shùjù wánquán yízhì.",
              "meaningVi": "Tổng số kiện, tổng trọng lượng tịnh và tổng trọng lượng cả bì ghi trên phiếu đóng gói phải hoàn toàn khớp với số liệu trên vận đơn."
            }
          },
          {
            "id": "zh_h6_7_6",
            "word": "滞港费",
            "pronunciation": "zhìgǎngfèi",
            "hanViet": "TRỆ CẢNG PHÍ",
            "partOfSpeech": "noun",
            "meaningVi": "Phí lưu bãi cảng do chậm lấy hàng (Demurrage / Detention fee)",
            "radicals": "滞 (Trệ - ứ lại) + 港 (Cảng biển) + 费 (Chi phí)",
            "grammarNote": "Số ngày miễn phí bãi cảng: 免费存仓期 (Free time).",
            "exampleSentence": {
              "target": "超过码头七天免租期后，船运公司将按天对滞留集装箱加收昂贵的滞港费。",
              "pronunciation": "Chāoguò mǎtóu qī tiān miǎnzūqī hòu, chuányùn gōngsī jiāng àn tiān duì zhìliú jízhuāngxiāng jiāshōu ángguì de zhìgǎngfèi.",
              "meaningVi": "Sau khi vượt quá thời gian miễn phí lưu bãi 7 ngày của bến cảng, hãng tàu sẽ thu thêm phí lưu bãi đắt đỏ theo từng ngày đối với container ứ đọng."
            }
          },
          {
            "id": "zh_h6_7_7",
            "word": "航线",
            "pronunciation": "hángxiàn",
            "hanViet": "HÀNG TUYẾN",
            "partOfSpeech": "noun",
            "meaningVi": "Tuyến đường hàng hải, hải trình",
            "radicals": "航 (Hàng - tàu thuyền di chuyển đường thủy/không) + 线 (Tuyến đường ray)",
            "grammarNote": "Tuyến châu Âu: 欧洲航线. Tuyến Bắc Mỹ: 美加航线.",
            "exampleSentence": {
              "target": "红海局势升级促使大量亚欧航线的货轮不得不绕行好望角，航程增加了近两周。",
              "pronunciation": "Hóng Hǎi júshì shēngjí cùshǐ dàliàng Yà-Ōu hángxiàn de huòlún bùdébù ràoxíng Hǎowàngjiǎo, hángchéng zēngjiā le jìn liǎng zhōu.",
              "meaningVi": "Căng thẳng tình hình Biển Đỏ leo thang thúc đẩy lượng lớn tàu chở hàng tuyến Á-Âu buộc phải chạy vòng qua Mũi Hảo Vọng, hải trình kéo dài thêm gần 2 tuần."
            }
          },
          {
            "id": "zh_h6_7_8",
            "word": "承运人",
            "pronunciation": "chéngyùnrén",
            "hanViet": "THỪA VẬN NHÂN",
            "partOfSpeech": "noun",
            "meaningVi": "Người chuyên chở, hãng vận tải nhận chở hàng (Carrier)",
            "radicals": "承 (Thừa - tiếp nhận trách nhiệm) + 运 (Vận - vận chuyển) + 人 (Chủ thể pháp nhân)",
            "grammarNote": "Trách nhiệm người vận chuyển: 承运人责任险.",
            "exampleSentence": {
              "target": "承运人签发清洁已装船提单，证明货物在装运时外表状况良好。",
              "pronunciation": "Chéngyùnrén qiānfā qīngjié yǐzhuāngchuán tídān, zhèngmíng huòwù zài zhuāngyùn shí wàibiǎo zhuàngkuàng liánghǎo.",
              "meaningVi": "Người vận chuyển ký phát vận đơn sạch đã bốc hàng lên tàu, chứng minh hàng hóa tại thời điểm bốc xếp có tình trạng bề ngoài nguyên vẹn tốt."
            }
          }
        ]
      },
      {
        "id": "zh_hsk6_l8",
        "title": "Bài 8: Chứng Nhận Xuất Xứ Hàng Hóa C/O Form E & Kiểm Định",
        "grammarFocus": "Chứng nhận nguồn gốc quốc tế: 原产地证明书 (C/O), 中国-东盟自贸区优惠产地证 (Form E), 商检 (Kiểm định chất lượng).",
        "vocabularies": [
          {
            "id": "zh_h6_8_1",
            "word": "产地证",
            "pronunciation": "chǎndìzhèng",
            "hanViet": "SẢN ĐỊA CHỨNG",
            "partOfSpeech": "noun",
            "meaningVi": "Giấy chứng nhận xuất xứ hàng hóa (C/O - Certificate of Origin)",
            "radicals": "产地 (Nơi sản xuất) + 证 (Giấy chứng nhận hợp pháp)",
            "grammarNote": "Form E (Trung Quốc - ASEAN): 优惠原产地证FORM E.",
            "exampleSentence": {
              "target": "出口到越南的货物凭借海关签发的中东盟优惠原产地证书FORM E，可以在目的港享受关税减免。",
              "pronunciation": "Chūkǒu dào Yuènán de huòwù píngjiè hǎiguān qiānfā de Zhōng-Dōngméng yōuhuì yuánchǎndì zhèngshū FORM E, kěyǐ zài mùdìgǎng xiǎngshòu guānshuì jiǎnmiǎn.",
              "meaningVi": "Hàng hóa xuất khẩu sang Việt Nam nhờ vào chứng nhận xuất xứ ưu đãi Trung Quốc - ASEAN Form E do hải quan cấp, có thể được hưởng miễn giảm thuế quan tại cảng đến."
            }
          },
          {
            "id": "zh_h6_8_2",
            "word": "商检",
            "pronunciation": "shāngjiǎn",
            "hanViet": "THƯƠNG KIỂM",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Kiểm định chất lượng thương phẩm xuất nhập khẩu bắt buộc",
            "radicals": "商 (Thương mại hàng hóa) + 检 (Kiểm nghiệm chất lượng)",
            "grammarNote": "Cơ quan kiểm định: 出入境检验检疫局. Hàng phải làm kiểm định: 法检商品.",
            "exampleSentence": {
              "target": "出口食品和机电等法定检验商品，出境前必须向海关申请商检并取得通关单。",
              "pronunciation": "Chūkǒu shípǐn hé jīdiàn děng fǎdìng jiǎnyàn shāngpǐn, chūjìng qián bìxū xiàng hǎiguān shēnqǐng shāngjiǎn bìng qǔdé tōngguāndān.",
              "meaningVi": "Hàng hóa thuộc diện kiểm định pháp định như thực phẩm và cơ điện xuất khẩu, trước khi ra khỏi lãnh thổ bắt buộc phải nộp đơn xin kiểm định thương phẩm lên hải quan và nhận phiếu thông quan."
            }
          },
          {
            "id": "zh_h6_8_3",
            "word": "认证",
            "pronunciation": "rènzhèng",
            "hanViet": "NHẬN CHỨNG",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Chứng nhận đạt tiêu chuẩn quốc tế (Certification)",
            "radicals": "认 (Thừa nhận xác nhận) + 证 (Chứng chỉ)",
            "grammarNote": "Chứng nhận CE (Châu Âu), CCC (Trung Quốc), FDA (Mỹ).",
            "exampleSentence": {
              "target": "该款智能家电产品已顺利通过欧盟CE认证和RoHS环保指令检测。",
              "pronunciation": "Gāi kuǎn zhìnéng jiādiàn chǎnpǐn yǐ shùnlì tōngguò Ōuméng CE rènzhèng hé RoHS huánbǎo zhǐlìng jiǎncè.",
              "meaningVi": "Dòng sản phẩm điện gia dụng thông minh này đã vượt qua thuận lợi chứng nhận CE của Liên minh châu Âu và thử nghiệm chỉ thị môi trường RoHS."
            }
          },
          {
            "id": "zh_h6_8_4",
            "word": "抽检",
            "pronunciation": "chōujiǎn",
            "hanViet": "TRỪU KIỂM",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Lấy mẫu kiểm tra xác suất ngẫu nhiên",
            "radicals": "抽 (Rút ngẫu nhiên) + 检 (Kiểm nghiệm)",
            "grammarNote": "Kiểm tra tỷ lệ đạt: 抽检合格率.",
            "exampleSentence": {
              "target": "第三方国际公证行受客户委托对大货进行装船前的随机抽检。",
              "pronunciation": "Dì-sān fāng guójì gōngzhèngháng shòu kèhù wěituō duì dàhuò jìnxíng zhuāngchuán qián de suíjī chōujiǎn.",
              "meaningVi": "Công ty giám định quốc tế bên thứ ba được khách hàng ủy thác tiến hành kiểm tra rút mẫu ngẫu nhiên đối với lô hàng lớn trước khi bốc lên tàu."
            }
          },
          {
            "id": "zh_h6_8_5",
            "word": "原产国",
            "pronunciation": "yuánchǎnguó",
            "hanViet": "NGUYÊN SẢN QUỐC",
            "partOfSpeech": "noun",
            "meaningVi": "Nước xuất xứ gốc của hàng hóa (Country of Origin)",
            "radicals": "原产 (Nguồn gốc sản xuất nguyên bản) + 国 (Quốc gia)",
            "grammarNote": "Ghi nhãn xuất xứ: 标明原产国 (Made in China / Made in Vietnam).",
            "exampleSentence": {
              "target": "货物外箱标签上必须按照法规清晰印上原产国名称，严禁弄虚作假。",
              "pronunciation": "Huòwù wàixiāng biāoqiān shang bìxū ànzhào fǎguī qīngxī yìn shàng yuánchǎnguó míngchēng, yánjìn nòngxūzuòjiǎ.",
              "meaningVi": "Trên nhãn thùng ngoài hàng hóa bắt buộc phải in rõ ràng tên nước xuất xứ theo luật định, nghiêm cấm gian lận làm giả."
            }
          },
          {
            "id": "zh_h6_8_6",
            "word": "标准",
            "pronunciation": "biāozhǔn",
            "hanViet": "TIÊU CHUẨN",
            "partOfSpeech": "noun/adj",
            "meaningVi": "Tiêu chuẩn kỹ thuật chất lượng",
            "radicals": "标 (Tiêu mốc) + 准 (Chuẩn xác)",
            "grammarNote": "Tiêu chuẩn quốc tế ISO 9001: 国际标准化组织标准.",
            "exampleSentence": {
              "target": "企业严格遵循ISO9001国际质量管理标准，建立起贯穿全流程的质控体系。",
              "pronunciation": "Qǐyè yángé zūnxún ISO9001 guójì zhìliàng guǎnlǐ biāozhǔn, jiànlì qǐ guànchuān quán liúchéng de zhìkòng tǐxì.",
              "meaningVi": "Doanh nghiệp tuân thủ nghiêm ngặt tiêu chuẩn quản lý chất lượng quốc tế ISO 9001, thiết lập hệ thống kiểm soát chất lượng xuyên suốt toàn bộ quy trình."
            }
          },
          {
            "id": "zh_h6_8_7",
            "word": "签证",
            "pronunciation": "qiānzhèng",
            "hanViet": "KÝ CHỨNG",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Ký duyệt cấp văn bản chứng nhận (Khác nghĩa với visa hộ chiếu)",
            "radicals": "签 (Ký tên) + 证 (Chứng nhận)",
            "grammarNote": "Hải quan ký phát chứng từ: 海关签证机构.",
            "exampleSentence": {
              "target": "经贸促进会签证机构核实企业生产制造能力后，正式签发了商事证明书。",
              "pronunciation": "Jīng-mào cùjìnhuì qiānzhèng jīgòu héshí qǐyè shēngchǎn zhìzào nénglì hòu, zhèngshì qiānfā le shāngshì zhèngmíngshū.",
              "meaningVi": "Cơ quan ký cấp chứng chỉ của Hội xúc tiến kinh tế thương mại sau khi thẩm tra năng lực chế tạo sản xuất của doanh nghiệp, đã chính thức ký cấp giấy chứng nhận thương sự."
            }
          },
          {
            "id": "zh_h6_8_8",
            "word": "合规",
            "pronunciation": "héguī",
            "hanViet": "HỢP QUY",
            "partOfSpeech": "verb/adj",
            "meaningVi": "Tuân thủ quy định pháp luật chuẩn mực (Compliance)",
            "radicals": "合 (Hợp với) + 规 (Quy củ luật lệ)",
            "grammarNote": "Tuân thủ quy định quốc tế: 贸易合规 (Trade Compliance).",
            "exampleSentence": {
              "target": "加强跨国经贸合规管理是跨国企业防范国际监管处罚和法律诉讼的坚固盾牌。",
              "pronunciation": "Jiāqiáng kuàguó jīng-mào héguī guǎnlǐ shì kuàguó qǐyè fángfàn guójì jiānguǎn chǔfá hé fǎlǜ sùsòng de jiāngù dùnpái.",
              "meaningVi": "Tăng cường quản trị tuân thủ kinh tế thương mại xuyên quốc gia là chiếc khiên vững chắc để doanh nghiệp đa quốc gia phòng ngừa các chế tài giám sát quốc tế và tố tụng pháp lý."
            }
          }
        ]
      },
      {
        "id": "zh_hsk6_l9",
        "title": "Bài 9: Đóng Gói Bao Bì & Tiêu Chuẩn Xuất Khẩu (Pallet, Hun Trùng)",
        "grammarFocus": "Tiêu chuẩn đóng gói xuất khẩu: 托盘 (Pallet), 熏蒸消毒 (Fumigation / ISPM 15), 缠绕膜 (Màng co PE), 防潮防震 (Chống ẩm chống sốc).",
        "vocabularies": [
          {
            "id": "zh_h6_9_1",
            "word": "托盘",
            "pronunciation": "tuōpán",
            "hanViet": "THÁC BÀN",
            "partOfSpeech": "noun",
            "meaningVi": "Tấm ballet nâng hàng (Pallet gỗ/nhựa)",
            "radicals": "托 (Thác - đỡ nâng lên) + 盘 (Bàn - tấm mâm phẳng)",
            "grammarNote": "Pallet tiêu chuẩn châu Âu: 欧标托盘 (1200x800mm). Pallet nhựa: 塑料托盘.",
            "exampleSentence": {
              "target": "为了便于叉车机械化装卸作业，所有纸箱必须整齐码放在坚固的免熏蒸托盘上。",
              "pronunciation": "Wèile biànyú chāchē jīxièhuà zhuāngxiè zuòyè, suǒyǒu zhǐxiāng bìxū zhěngqí mǎfàng zài jiāngù de miǎnxūnzhēng tuōpán shang.",
              "meaningVi": "Để thuận tiện cho thao tác bốc dỡ cơ giới hóa bằng xe nâng, tất cả các thùng carton bắt buộc phải xếp ngay ngắn trên các pallet miễn hun trùng vững chắc."
            }
          },
          {
            "id": "zh_h6_9_2",
            "word": "熏蒸",
            "pronunciation": "xūnzhēng",
            "hanViet": "HUÂN CHƯNG",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Hun trùng xông hơi tiệt trùng diệt mọt gỗ (Fumigation - ISPM 15)",
            "radicals": "熏 (Huân - hun khói) + 蒸 (Chưng - hơi nước nóng)",
            "grammarNote": "Giấy chứng nhận hun trùng: 熏蒸消毒证书 (Fumigation Certificate). Dấu IPPC: IPPC标识.",
            "exampleSentence": {
              "target": "出口欧美国家的实木包装材料必须在装运前进行强制性热处理或药物熏蒸，并加施IPPC标识。",
              "pronunciation": "Chūkǒu Ōu-Měi guójiā de shímù bāozhuāng cáiliào bìxū zài zhuāngyùn qián jìnxíng qiángzhìxìng rèchǔlǐ huò yàowù xūnzhēng, bìng jiāshī IPPC biāozhì.",
              "meaningVi": "Vật liệu đóng gói bằng gỗ tự nhiên xuất sang các nước Âu Mỹ bắt buộc phải tiến hành xử lý nhiệt hoặc hun trùng hóa chất bắt buộc trước khi bốc hàng, và đóng dấu biểu trưng IPPC."
            }
          },
          {
            "id": "zh_h6_9_3",
            "word": "外箱",
            "pronunciation": "wàixiāng",
            "hanViet": "NGOẠI TƯƠNG",
            "partOfSpeech": "noun",
            "meaningVi": "Thùng carton bên ngoài (Master carton)",
            "radicals": "外 (Bên ngoài) + 箱 (Thùng hộp)",
            "grammarNote": "Thùng 5 lớp: 五层瓦楞纸外箱.",
            "exampleSentence": {
              "target": "外箱表面必须印刷清晰的运输唛头，包括收货人代码、箱号及防潮易碎警示符号。",
              "pronunciation": "Wàixiāng biǎomiàn bìxū yìnshuā qīngxī de yùnshū màitóu, bāokuò shōuhuòrén dàimǎ, xiānghào jí fángcháo yìsuì jǐngshì fúhào.",
              "meaningVi": "Bề mặt thùng carton ngoài bắt buộc phải in ký mã hiệu vận chuyển (Shipping mark) rõ ràng, bao gồm mã người nhận hàng, số thùng và biểu tượng cảnh báo chống ẩm dễ vỡ."
            }
          },
          {
            "id": "zh_h6_9_4",
            "word": "唛头",
            "pronunciation": "màitóu",
            "hanViet": "MẠ ĐẦU",
            "partOfSpeech": "noun",
            "meaningVi": "Ký mã hiệu hàng hóa in trên bao bì xuất khẩu (Shipping Mark)",
            "radicals": "唛 (Mại - phiên âm từ Mark) + 头 (Đầu - nhãn hiệu)",
            "grammarNote": "Mã chính: 正唛. Mã phụ chi tiết: 侧唛.",
            "exampleSentence": {
              "target": "严格按照客户指定的正唛与侧唛格式进行印刷，以便于在海外配送中心快速分拣。",
              "pronunciation": "Yángé ànzhào kèhù zhǐdìng de zhèngmài yǔ cèmài géshì jìnxíng yìnshuā, yǐbiànyú zài hǎiwài pèisòng zhōngxīn kuàisù fēnjiǎn.",
              "meaningVi": "In ấn nghiêm ngặt theo định dạng ký mã hiệu chính và phụ do khách hàng chỉ định, để tiện phân loại nhanh chóng tại trung tâm phân phối ở nước ngoài."
            }
          },
          {
            "id": "zh_h6_9_5",
            "word": "防震",
            "pronunciation": "fángzhèn",
            "hanViet": "PHÒNG CHẤN",
            "partOfSpeech": "adj/verb",
            "meaningVi": "Chống sốc, chống va đập rơi vỡ",
            "radicals": "防 (Phòng chống) + 震 (Chấn - rung động va chấn)",
            "grammarNote": "Mút xốp chống sốc: 珍珠棉 (EPE), Màng xốp bóng khí: 气泡膜.",
            "exampleSentence": {
              "target": "精密液晶显示屏内包装采用了高回弹EPE防震泡棉，能有效吸收长途海运途中的颠簸冲力。",
              "pronunciation": "Jīngmì yèjīng xiǎnshìpíng nèi bāozhuāng cǎiyòng le gāo huítán EPE fángzhèn pàomián, néng yǒuxiào xīshōu chángtú hǎiyùn túzhōng de diānbǒ chōnglì.",
              "meaningVi": "Bao bì bên trong màn hình tinh thể lỏng chính xác sử dụng mút xốp chống sốc EPE độ đàn hồi cao, có thể hấp thu hiệu quả xung lực dằn xóc trong suốt hành trình vận tải biển đường dài."
            }
          },
          {
            "id": "zh_h6_9_6",
            "word": "防潮",
            "pronunciation": "fángcháo",
            "hanViet": "PHÒNG TRIỀU",
            "partOfSpeech": "adj/verb",
            "meaningVi": "Chống ẩm mốc, ngăn hơi nước xâm nhập",
            "radicals": "防 (Phòng) + 潮 (Triều - hơi ẩm thủy triều)",
            "grammarNote": "Gói hút ẩm silicagel: 干燥剂 (Silica Gel). Túi chân không: 铝箔真空袋.",
            "exampleSentence": {
              "target": "跨洋海上集装箱运输湿气极重，每个纸箱内均放置了三包高效干燥剂以实现可靠防潮。",
              "pronunciation": "Kuàyáng hǎishàng jízhuāngxiāng yùnshū shīqì jí zhòng, měi ge zhǐxiāng nèi jūn fàngzhì le sān bāo gāoxiào gānzàojì yǐ shíxiàn kěkào fángcháo.",
              "meaningVi": "Vận chuyển container trên biển vượt đại dương độ ẩm cực kỳ cao, trong mỗi thùng carton đều đặt ba gói hạt hút ẩm hiệu suất cao để đạt khả năng chống ẩm đáng tin cậy."
            }
          },
          {
            "id": "zh_h6_9_7",
            "word": "缠绕膜",
            "pronunciation": "chánràomó",
            "hanViet": "TRIỀN NHIỄU MÔ",
            "partOfSpeech": "noun",
            "meaningVi": "Màng cuốn bọc pallet, màng chít PE (Stretch film)",
            "radicals": "缠绕 (Quấn quanh) + 膜 (Màng nilon mỏng)",
            "grammarNote": "Quấn pallet cố định: 打托缠膜.",
            "exampleSentence": {
              "target": "在托盘货物码垛完毕后，使用自动化打包机缠绕六层高拉伸强度的PE塑料缠绕膜以防散包。",
              "pronunciation": "Zài tuōpán huòwù mǎduò wánbì hòu, shǐyòng zìdònghuà dǎbāojī chánrào liù céng gāo lāshēn qiángdù de PE sùliào chánràomó yǐ fáng sǎnbāo.",
              "meaningVi": "Sau khi xếp hàng lên pallet xong xuôi, sử dụng máy đóng đai tự động quấn 6 lớp màng chít nhựa PE độ kéo căng cao để phòng đổ vỡ hàng."
            }
          },
          {
            "id": "zh_h6_9_8",
            "word": "装载",
            "pronunciation": "zhuāngzài",
            "hanViet": "TRANG TẢI",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Bốc hàng xếp tải vào thùng xe/container",
            "radicals": "装 (Bốc xếp) + 载 (Tải - chở chứa)",
            "grammarNote": "Tối ưu hóa sức chứa: 优化装载率 (CBM Optimization).",
            "exampleSentence": {
              "target": "通过合理计算装载方案，设计师将一个四十尺集装箱的空间利用率提升至百分之九十六。",
              "pronunciation": "Tōngguò hélǐ jìsuàn zhuāngzài fāng'àn, shèjìshī jiāng yí ge sìshí chǐ jízhuāngxiāng de kōngjiān lìyònglǜ tíshēng zhì bǎifēnzhī jiǔshíliù.",
              "meaningVi": "Thông qua tính toán hợp lý phương án bốc xếp tải, người thiết kế đã nâng tỷ lệ tận dụng không gian của một container 40 feet lên đến 96%."
            }
          }
        ]
      },
      {
        "id": "zh_hsk6_l10",
        "title": "Bài 10: Công Nghệ AI & Tự Động Hóa Công Nghiệp (Robotics & Machine Vision)",
        "grammarFocus": "Công nghệ 4.0 nhà máy thông minh: 机器视觉 (Machine vision), 工业机器人 (Industrial robot), 数字化孪生 (Digital twin).",
        "vocabularies": [
          {
            "id": "zh_h6_10_1",
            "word": "机器视觉",
            "pronunciation": "jīqì shìjué",
            "hanViet": "CƠ KHÍ THỊ GIÁC",
            "partOfSpeech": "noun",
            "meaningVi": "Thị giác máy tính kiểm tra lỗi tự động bằng camera công nghiệp (Machine Vision / AOI)",
            "radicals": "机器 (Máy móc thiết bị) + 视觉 (Thị giác đôi mắt)",
            "grammarNote": "Máy kiểm tra quang học tự động: AOI自动光学检测仪.",
            "exampleSentence": {
              "target": "基于高分辨率工业相机和机器视觉算法的检测系统，能在零点一秒内识别出芯片焊点的微小虚焊缺陷。",
              "pronunciation": "Jīyú gāo fēnbànlǜ gōngyè xiàngjī hé jīqì shìjué suànfǎ de jiǎncè xìtǒng, néng zài líng diǎn yī miǎo nèi shíbié chū xīnpiàn hàndiǎn de wēixiǎo xūhàn quēxiàn.",
              "meaningVi": "Hệ thống kiểm tra dựa trên camera công nghiệp độ phân giải cao và thuật toán thị giác máy tính, có thể nhận dạng khuyết tật mối hàn ảo li ti của con chip trong 0.1 giây."
            }
          },
          {
            "id": "zh_h6_10_2",
            "word": "机械臂",
            "pronunciation": "jīxièbì",
            "hanViet": "CƠ GIỚI TÝ",
            "partOfSpeech": "noun",
            "meaningVi": "Cánh tay robot cơ khí công nghiệp (Robotic Arm)",
            "radicals": "机械 (Cơ khí máy móc) + 臂 (Cánh tay con người)",
            "grammarNote": "Robot 6 trục: 六轴工业机械臂.",
            "exampleSentence": {
              "target": "焊接车间内，六轴高精度工业机械臂正以极其均匀的速度完成汽车底盘的自动化激光无缝焊接。",
              "pronunciation": "Hànjiē chējiān nèi, liù zhóu gāojīngdù gōngyè jīxièbì zhèngzài yǐ jíqí jūnyún de sùdù wánchéng qìchē dǐpán de zìdònghuà jīguāng wúféng hànjiē.",
              "meaningVi": "Bên trong xưởng hàn, cánh tay robot công nghiệp độ chính xác cao 6 trục đang hoàn thành việc hàn laser liền mạch tự động hóa cho khung gầm ô tô với tốc độ cực kỳ đồng đều."
            }
          },
          {
            "id": "zh_h6_10_3",
            "word": "无人搬运车",
            "pronunciation": "wúrén bānyùnchē",
            "hanViet": "VÔ NHÂN BAN VẬN XA",
            "partOfSpeech": "noun",
            "meaningVi": "Xe tự hành chuyên chở hàng trong xưởng (AGV - Automated Guided Vehicle)",
            "radicals": "无人 (Không người lái) + 搬运 (Vận chuyển hàng) + 车 (Xe)",
            "grammarNote": "Công nghệ dẫn đường: 激光导航AGV小车.",
            "exampleSentence": {
              "target": "数十台激光导航无人搬运车在车间与仓库之间自主穿梭，实现了零人工干预的物料精准配送。",
              "pronunciation": "Shùshí tái jīguāng dǎoháng wúrén bānyùnchē zài chējiān yǔ cāngkù zhījiān zìzhǔ chuānsuō, shíxiàn le líng réngōng gānyù de wùliào jīngzhǔn pèisòng.",
              "meaningVi": "Hàng chục xe tự hành AGV định vị laser tự chủ đi lại con thoi giữa phân xưởng và kho hàng, thực hiện việc giao nhận vật liệu chuẩn xác không cần tới sự can thiệp của con người."
            }
          },
          {
            "id": "zh_h6_10_4",
            "word": "数字孪生",
            "pronunciation": "shùzì luánshēng",
            "hanViet": "SỐ TỰ LOAN SINH",
            "partOfSpeech": "noun",
            "meaningVi": "Bản sao số mô phỏng nhà máy ảo thời gian thực (Digital Twin)",
            "radicals": "数字 (Kỹ thuật số) + 孪生 (Sinh đôi song sinh)",
            "grammarNote": "Mô phỏng 3D thời gian thực: 工业数字孪生平台.",
            "exampleSentence": {
              "target": "工程师通过控制中心的数字孪生系统，可以在电脑屏幕上实时监控千里之外整个智能工厂的运行工况。",
              "pronunciation": "Gōngchéngshī tōngguò kòngzhì zhōngxīn de shùzì luánshēng xìtǒng, kěyǐ zài diànnǎo píngmù shang shíshí jiānkòng qiānlǐ zhīwài zhěnggè zhìnéng gōngchǎng de yùnxíng gōngkuàng.",
              "meaningVi": "Kỹ sư thông qua hệ thống bản sao số tại trung tâm điều khiển, có thể giám sát trạng thái vận hành của toàn bộ nhà máy thông minh cách xa ngàn dặm trên màn hình máy tính theo thời gian thực."
            }
          },
          {
            "id": "zh_h6_10_5",
            "word": "预测性维护",
            "pronunciation": "yùcèxìng wéihù",
            "hanViet": "DỰ TRẮC TÍNH DUY HỘ",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Bảo trì dự đoán hỏng hóc bằng cảm biến IoT & AI (Predictive Maintenance - PdM)",
            "radicals": "预测 (Dự đoán tương lai) + 维护 (Bảo trì bảo dưỡng)",
            "grammarNote": "Phân tích chấn động âm thanh: 振动监测预测性维护.",
            "exampleSentence": {
              "target": "物联网传感器采集轴承微振动数据并经AI模型计算，提前十五天发出设备潜在故障预警，实现了预测性维护。",
              "pronunciation": "Wùliánwǎng chuángǎnqì cǎijí zhóuchéng wēi zhèndòng shùjù bìng jīng AI móxíng jìsuàn, tíqián shíwǔ tiān fāchū shèbèi qiánzài gùzhàng yùjǐng, shíxiàn le yùcèxìng wéihù.",
              "meaningVi": "Cảm biến IoT thu thập số liệu vi rung động của vòng bi và qua mô hình AI tính toán, phát đi cảnh báo sự cố tiềm ẩn của thiết bị trước 15 ngày, thực hiện thành công bảo trì dự đoán."
            }
          },
          {
            "id": "zh_h6_10_6",
            "word": "物联网",
            "pronunciation": "wùliánwǎng",
            "hanViet": "VẬT LIÊN VÕNG",
            "partOfSpeech": "noun",
            "meaningVi": "Internet vạn vật (IoT - Internet of Things)",
            "radicals": "物 (Mọi đồ vật) + 联网 (Nối mạng Internet)",
            "grammarNote": "IoT công nghiệp: 工业物联网 (IIoT).",
            "exampleSentence": {
              "target": "工业物联网技术的深度应用将车间内所有孤立的机床和仪器紧密互联互通。",
              "pronunciation": "Gōngyè wùliánwǎng jìshù de shēndù yìngyòng jiāng chējiān nèi suǒyǒu gūlì de jīchuáng hé yíqì jǐnmì hùliánhùtōng.",
              "meaningVi": "Ứng dụng chuyên sâu của công nghệ IoT công nghiệp đã kết nối liên thông chặt chẽ tất cả các máy công cụ và dụng cụ đo lường biệt lập bên trong xưởng."
            }
          },
          {
            "id": "zh_h6_10_7",
            "word": "边缘计算",
            "pronunciation": "biānyuán jìsuàn",
            "hanViet": "BIÊN DUYÊN KẾ TOÁN",
            "partOfSpeech": "noun",
            "meaningVi": "Điện toán biên xử lý dữ liệu ngay tại máy (Edge Computing)",
            "radicals": "边缘 (Rìa biên giới, cạnh máy) + 计算 (Tính toán dữ liệu)",
            "grammarNote": "Độ trễ thấp mili-giây: 超低时延边缘计算.",
            "exampleSentence": {
              "target": "在机器人工作站部署边缘计算网关，能够以低于两毫秒的极低时延下达急停制动指令。",
              "pronunciation": "Zài jīqìrén gōngzuòzhàn bùshǔ biānyuán jìsuàn wǎngguān, nénggòu yǐ dǐyú liǎng háomiǎo de jídī shíyán xiàdá jítíng zhìdòng zhǐlìng.",
              "meaningVi": "Triển khai cổng kết nối điện toán biên tại trạm làm việc của robot, có thể ban hành lệnh phanh dừng khẩn cấp với độ trễ cực thấp dưới 2 mili-giây."
            }
          },
          {
            "id": "zh_h6_10_8",
            "word": "熄灯工厂",
            "pronunciation": "xīdēng gōngchǎng",
            "hanViet": "TỨC ĐĂNG CÔNG XƯỞNG",
            "partOfSpeech": "noun",
            "meaningVi": "Nhà máy tắt đèn vận hành tự động hóa 100% không bóng người (Lights-out factory)",
            "radicals": "熄灯 (Tắt hết đèn chiếu sáng) + 工厂 (Nhà máy sản xuất)",
            "grammarNote": "Đỉnh cao tự động hóa công nghiệp hiện đại.",
            "exampleSentence": {
              "target": "在这座高度智能化的熄灯工厂里，整整三万平方米的加工车间在全黑环境下二十四小时平稳自如运转。",
              "pronunciation": "Zài zhè zuò gāodù zhìnénghuà de xīdēng gōngchǎng lǐ, zhěngzhěng sān wàn píngfāngmǐ de jiāgōng chējiān zài quánhēi huánjìng xià èrshísì xiǎoshí píngwěn zìrú yùnzhuǎn.",
              "meaningVi": "Bên trong nhà máy tắt đèn thông minh hóa cao độ này, phân xưởng gia công rộng suốt 30.000 mét vuông vận hành êm ả 24 giờ tự do trong môi trường hoàn toàn tối đen không cần bật đèn."
            }
          }
        ]
      },
      {
        "id": "zh_hsk6_l11",
        "title": "Bài 11: Y Sinh Học, Thiết Bị Y Tế & Dược Phẩm Xuất Nhập Khẩu",
        "grammarFocus": "Ngành dược y tế xuất nhập khẩu: 药品注册 (Drug registration), 临床试验 (Clinical trial), 冷链运输 (Cold chain logistics), GMP规范.",
        "vocabularies": [
          {
            "id": "zh_h6_11_1",
            "word": "冷链",
            "pronunciation": "lěngliàn",
            "hanViet": "LÃNH LIỆN",
            "partOfSpeech": "noun",
            "meaningVi": "Chuỗi cung ứng lạnh bảo quản vắc-xin/dược phẩm (Cold Chain)",
            "radicals": "冷 (Lạnh đông) + 链 (Dây xích liên kết)",
            "grammarNote": "Nhiệt độ cực thấp: 超低温冷链 (âm 80 độ C).",
            "exampleSentence": {
              "target": "生物疫苗类货物在长途国际空运全程中必须严格维持在摄氏二至八度的专业医用冷链温控区间。",
              "pronunciation": "Shēngwù yìmiáo lèi huòwù zài chángtú guójì kōngyùn quánchéng zhōng bìxū yángé wéichí zài Shèshì èr zhì bā dù de zhuānyè yīyòng lěngliàn wēnkòng qūjiān.",
              "meaningVi": "Hàng hóa thuộc nhóm vắc-xin sinh học trong suốt toàn bộ quá trình vận tải hàng không quốc tế đường dài bắt buộc phải duy trì nghiêm ngặt trong khoảng kiểm soát nhiệt độ chuỗi lạnh y tế chuyên dụng từ 2 đến 8 độ C."
            }
          },
          {
            "id": "zh_h6_11_2",
            "word": "临床试验",
            "pronunciation": "línchuáng shìyàn",
            "hanViet": "LÂM SÀNG THÍ NGHIỆM",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Thử nghiệm lâm sàng thuốc mới trên người (Clinical Trial)",
            "radicals": "临床 (Bên giường bệnh) + 试验 (Thử nghiệm khoa học)",
            "grammarNote": "Thử nghiệm giai đoạn 3: 三期临床试验.",
            "exampleSentence": {
              "target": "该创新抗癌靶向药物经过全球多中心三期临床试验，证明能显著延长患者的无进展生存期。",
              "pronunciation": "Gāi chuàngxīn kàng'ái bǎxiàng yàowù jīngguò quánqiú duō zhōngxīn sān qī línchuáng shìyàn, zhèngmíng néng xiǎnzhù yáncháng huànzhě de wú jìnzhǎn shēngcúnqī.",
              "meaningVi": "Loại thuốc điều trị đích chống ung thư đổi mới này sau khi qua thử nghiệm lâm sàng giai đoạn 3 tại nhiều trung tâm toàn cầu, đã chứng minh có thể kéo dài rõ rệt thời gian sống không tiến triển của bệnh nhân."
            }
          },
          {
            "id": "zh_h6_11_3",
            "word": "无菌",
            "pronunciation": "wújūn",
            "hanViet": "VÔ KHUẨN",
            "partOfSpeech": "adj",
            "meaningVi": "Vô trùng, tiệt trùng hoàn toàn (Sterile)",
            "radicals": "无 (Không có) + 菌 (Vi khuẩn mầm bệnh)",
            "grammarNote": "Đóng gói vô trùng: 无菌包装. Thao tác vô trùng: 无菌操作.",
            "exampleSentence": {
              "target": "医用注射器和输液管在装箱前必须经过环氧乙烷灭菌并确保无菌包装完好无损。",
              "pronunciation": "Yīyòng zhùshèqì hé shūyèguǎn zài zhuāngxiāng qián bìxū jīngguò huányǎngyǐwán mièjūn bìng quèbǎo wújūn bāozhuāng wánhǎo wúsǔn.",
              "meaningVi": "Bơm kim tiêm và dây truyền dịch y tế trước khi đóng thùng bắt buộc phải qua tiệt trùng bằng khí Ethylene Oxide và bảo đảm bao bì vô trùng nguyên vẹn không rách."
            }
          },
          {
            "id": "zh_h6_11_4",
            "word": "批号",
            "pronunciation": "pīhào",
            "hanViet": "PHÊ HIỆU",
            "partOfSpeech": "noun",
            "meaningVi": "Số lô sản xuất của dược phẩm (Batch number / Lot number)",
            "radicals": "批 (Lô hàng) + 号 (Mã số)",
            "grammarNote": "Kiểm tra hạn dùng và số lô: 生产批号与有效期.",
            "exampleSentence": {
              "target": "药监局要求在药品最小销售包装外表面以清晰耐久的喷码标明产品生产批号与失效日期。",
              "pronunciation": "Yàojiānjú yāoqiú zài yàopǐn zuìxiǎo xiāoshòu bāozhuāng wàibiǎomiàn yǐ qīngxī nàijiǔ de pēnmǎ biāomíng chǎnpǐn shēngchǎn pīhào yǔ shīxiào rìqī.",
              "meaningVi": "Cục Quản lý Dược yêu cầu trên bề mặt ngoài của bao bì bán lẻ nhỏ nhất của dược phẩm phải in phun chữ số rõ ràng bền chắc để biểu thị số lô sản xuất và ngày hết hạn của sản phẩm."
            }
          },
          {
            "id": "zh_h6_11_5",
            "word": "活性",
            "pronunciation": "huóxìng",
            "hanViet": "HOẠT TÍNH",
            "partOfSpeech": "noun/adj",
            "meaningVi": "Hoạt tính sinh học của protein/dược chất",
            "radicals": "活 (Sống động) + 性 (Đặc tính bản chất)",
            "grammarNote": "Thành phần dược chất có hoạt tính: 活性药物成分 (API).",
            "exampleSentence": {
              "target": "温度的剧烈剧烈剧烈剧烈剧烈波动会导致生物大分子活性不可逆丧失。",
              "pronunciation": "Wēndù de jùliè bōdòng huì dǎozhì shēngwù dàfēnzǐ huóxìng bù kě nì sàngshī.",
              "meaningVi": "Sự biến động dữ dội của nhiệt độ sẽ dẫn đến việc hoạt tính của đại phân tử sinh học bị mất đi không thể phục hồi."
            }
          },
          {
            "id": "zh_h6_11_6",
            "word": "审批",
            "pronunciation": "shěnpī",
            "hanViet": "THẨM PHÊ",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Thẩm định và phê duyệt hồ sơ thuốc/thiết bị y tế (Regulatory Approval)",
            "radicals": "审 (Thẩm định rà soát) + 批 (Phê chuẩn đồng ý)",
            "grammarNote": "Phê duyệt lưu hành thuốc: 药品上市许可审批.",
            "exampleSentence": {
              "target": "国家药品监督管理局开辟了绿色通道，加快对用于罕见病急需药品的进口注册审批流程。",
              "pronunciation": "Guójiā Yàopǐn Jiāndū Guǎnlǐjú kāipì le lǜsè tōngdào, jiākuài duì yòngyú hǎnjiànbìng jíxū yàopǐn de jìnkǒu zhùcè shěnpī liúchéng.",
              "meaningVi": "Cục Quản lý Giám sát Dược phẩm Quốc gia đã mở luồng xanh, đẩy nhanh quy trình thẩm định phê duyệt đăng ký nhập khẩu đối với các loại thuốc cấp bách dùng cho bệnh hiếm gặp."
            }
          },
          {
            "id": "zh_h6_11_7",
            "word": "监管",
            "pronunciation": "jiānguǎn",
            "hanViet": "GIÁM QUẢN",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Giám sát và quản lý chất lượng (Regulatory oversight)",
            "radicals": "监 (Giám sát soi xét) + 管 (Quản lý)",
            "grammarNote": "Giám sát an toàn dược phẩm: 药品安全监管.",
            "exampleSentence": {
              "target": "严格的全生命周期质量监管制度是保障公众用药安全有效的定海神针。",
              "pronunciation": "Yángé de quán shēngmìngzhōuqī zhìliàng jiānguǎn zhìdù shì bǎozhàng gōngzhòng yòngyào ānquán yǒuxiào de dìnghǎishénzhēn.",
              "meaningVi": "Chế độ giám sát quản lý chất lượng toàn bộ vòng đời nghiêm ngặt là cây gậy thần định hải bảo đảm sự an toàn và hiệu quả dùng thuốc của công chúng."
            }
          },
          {
            "id": "zh_h6_11_8",
            "word": "生物等效性",
            "pronunciation": "shēngwù děngxiàoxìng",
            "hanViet": "SINH VẬT ĐẲNG HIỆU TÍNH",
            "partOfSpeech": "noun",
            "meaningVi": "Tương đương sinh học giữa thuốc gốc và thuốc generic (Bioequivalence - BE)",
            "radicals": "生物 (Sinh học) + 等效 (Tác dụng tương đương) + 性 (Tính chất)",
            "grammarNote": "Thử nghiệm BE thuốc generic: 一致性评价生物等效性试验.",
            "exampleSentence": {
              "target": "仿制药只有在通过生物等效性试验并证明其与原研药具有相同的临床疗效后，才获准上市销售。",
              "pronunciation": "Fǎngzhìyào zhǐyǒu zài tōngguò shēngwù děngxiàoxìng shìyàn bìng zhèngmíng qí yǔ yuányányào jùyǒu xiāngtóng de línchuáng liáoxiào hòu, cái huòzhǔn shàngshì xiāoshòu.",
              "meaningVi": "Thuốc generic chỉ sau khi vượt qua thử nghiệm tương đương sinh học và chứng minh nó có hiệu quả điều trị lâm sàng tương đương với thuốc gốc, mới được chuẩn y cho lưu hành bán ra thị trường."
            }
          }
        ]
      },
      {
        "id": "zh_hsk6_l12",
        "title": "Bài 12: Soạn Thảo & Dịch Thuật Hợp Đồng Ngoại Thương Song Ngữ",
        "grammarFocus": "Ngôn ngữ pháp lý ngoại thương chuẩn xác: 不可抗力 (Force Majeure), 仲裁裁决 (Arbitration award), 管辖法律 (Governing law), 补偿责任 (Indemnity).",
        "vocabularies": [
          {
            "id": "zh_h6_12_1",
            "word": "不可抗力",
            "pronunciation": "bù kě kàng lì",
            "hanViet": "BẤT KHẢ KHÁNG LỰC",
            "partOfSpeech": "noun",
            "meaningVi": "Trường hợp bất khả kháng thiên tai dịch bệnh chiến tranh (Force Majeure)",
            "radicals": "不可 (Không thể) + 抗 (Chống lại) + 力 (Sức lực con người)",
            "grammarNote": "Điều khoản miễn trách nhiệm: 不可抗力免责条款.",
            "exampleSentence": {
              "target": "由于发生地震或战争等不可抗力事件导致任何一方不能按期履行合同义务的，应在十四天内出具权威公证证明。",
              "pronunciation": "Yóuyú fāshēng dìzhèn huò zhànzhēng děng bùkěkànglì shìjiàn dǎozhì rènhé yì fāng bù néng ànqī lǚxíng hétong yìwù de, yīng zài shísì tiān nèi chūjù quánwēi gōngzhèng zhèngmíng.",
              "meaningVi": "Do phát sinh sự kiện bất khả kháng như động đất hoặc chiến tranh dẫn đến bất kỳ bên nào không thể thực hiện nghĩa vụ hợp đồng đúng hạn, cần xuất trình giấy chứng nhận công chứng có thẩm quyền trong vòng 14 ngày."
            }
          },
          {
            "id": "zh_h6_12_2",
            "word": "仲裁",
            "pronunciation": "zhòngcái",
            "hanViet": "TRỌNG TÀI",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Trọng tài thương mại quốc tế (Arbitration)",
            "radicals": "仲 (Trọng - người đứng giữa phân xử) + 裁 (Tài - phán quyết)",
            "grammarNote": "Phán quyết trọng tài có tính chung thẩm: 仲裁裁决是终局的 (Final and binding).",
            "exampleSentence": {
              "target": "双方一致同意将本合同引发的一切纠纷提交中国国际经济贸易仲裁委员会进行仲裁。",
              "pronunciation": "Shuāngfāng yízhì tóngyì jiāng běn hétong yǐnfā de yíqiè jiūfēn tíjiāo Zhōngguó Guójì Jīngjì Màoyì Zhòngcái Wěiyuánhuì jìnxíng zhòngcái.",
              "meaningVi": "Hai bên nhất trí đồng ý đệ trình mọi tranh chấp phát sinh từ hợp đồng này lên Ủy ban Trọng tài Kinh tế Thương mại Quốc tế Trung Quốc (CIETAC) để tiến hành phân xử trọng tài."
            }
          },
          {
            "id": "zh_h6_12_3",
            "word": "管辖",
            "pronunciation": "guǎnxiá",
            "hanViet": "QUẢN HẠT",
            "partOfSpeech": "noun/verb",
            "meaningVi": "Thẩm quyền tài phán của tòa án/luật pháp (Jurisdiction)",
            "radicals": "管 (Cai quản) + 辖 (Hạt - phạm vi quyền hạn)",
            "grammarNote": "Luật áp dụng điều chỉnh: 适用法律与管辖权.",
            "exampleSentence": {
              "target": "本合同的订立、效力、解释及履行均受中华人民共和国法律的管辖。",
              "pronunciation": "Běn hétong de dìnglì, xiàolì, jiěshì jí lǚxíng jūn shòu Zhōnghuá Rénmín Gònghéguó fǎlǜ de guǎnxiá.",
              "meaningVi": "Việc xác lập, hiệu lực, diễn giải và thực thi hợp đồng này đều chịu sự quản hạt tài phán của pháp luật nước Cộng hòa Nhân dân Trung Hoa."
            }
          },
          {
            "id": "zh_h6_12_4",
            "word": "歧义",
            "pronunciation": "qíyì",
            "hanViet": "KỲ Ý",
            "partOfSpeech": "noun",
            "meaningVi": "Sự hiểu lầm đa nghĩa, nghĩa nước đôi mâu thuẫn (Ambiguity)",
            "radicals": "歧 (Kỳ - ngả rẽ phân nhánh) + 义 (Ý - ý nghĩa câu từ)",
            "grammarNote": "Tránh nghĩa nước đôi: 消除歧义.",
            "exampleSentence": {
              "target": "涉外法律合同翻译必须严谨准确，坚决避免使用可能引发理解歧义的模糊词汇。",
              "pronunciation": "Shèwài fǎlǜ hétong fānyì bìxū yánjǐn zhǔnquè, jiānjué bìmiǎn shǐyòng kěnéng yǐnfā lǐjiě qíyì de móhu cíhuì.",
              "meaningVi": "Dịch thuật hợp đồng pháp lý có yếu tố nước ngoài bắt buộc phải cẩn trọng chuẩn xác, kiên quyết tránh sử dụng những từ ngữ mơ hồ có thể gây ra cách hiểu nước đôi dị nghĩa."
            }
          },
          {
            "id": "zh_h6_12_5",
            "word": "连带责任",
            "pronunciation": "liándài zérèn",
            "hanViet": "LIÊN ĐỚI TRÁCH NHIỆM",
            "partOfSpeech": "noun",
            "meaningVi": "Trách nhiệm liên đới pháp lý (Joint and several liability)",
            "radicals": "连带 (Gắn kết cùng nhau) + 责任 (Trách nhiệm nghĩa vụ)",
            "grammarNote": "Chịu trách nhiệm bồi thường liên đới: 承担连带赔偿责任.",
            "exampleSentence": {
              "target": "担保人自愿为借款人在主合同项下的全部债务偿还承担无限连带责任。",
              "pronunciation": "Dānbǎorén zìyuàn wèi jièkuǎnrén zài zhǔ hétong xiàngxià de quánbù zhàiwù chánghuán chéngdān wúxiàn liándài zérèn.",
              "meaningVi": "Bên bảo lãnh tự nguyện chịu trách nhiệm liên đới vô hạn đối với việc hoàn trả toàn bộ nợ nần của bên vay dưới hợp đồng chính."
            }
          },
          {
            "id": "zh_h6_12_6",
            "word": "索赔",
            "pronunciation": "suǒpéi",
            "hanViet": "TÁC BỒI",
            "partOfSpeech": "verb/noun",
            "meaningVi": "Khiếu nại đòi tiền bồi thường thiệt hại (Claim for damages)",
            "radicals": "索 (Tác - yêu cầu đòi hỏi) + 赔 (Bồi - bồi thường tiền của)",
            "grammarNote": "Thời hạn khiếu nại bồi thường: 索赔期限.",
            "exampleSentence": {
              "target": "买方在检验货物后发现严重短重，有权在货物运抵目的港三十天内向卖方正式提出经济索赔。",
              "pronunciation": "Mǎifāng zài jiǎnyàn huòwù hòu fāxiàn yánzhòng duǎnzhòng, yǒu quán zài huòwù yùndǐ mùdìgǎng sānshí tiān nèi xiàng màifāng zhèngshì tíchū jīngjì suǒpéi.",
              "meaningVi": "Bên mua sau khi kiểm tra hàng hóa phát hiện thiếu hụt trọng lượng nghiêm trọng, có quyền đưa ra khiếu nại đòi bồi thường kinh tế chính thức lên bên bán trong vòng 30 ngày sau khi hàng cập cảng đến."
            }
          },
          {
            "id": "zh_h6_12_7",
            "word": "鉴于",
            "pronunciation": "jiànyú",
            "hanViet": "GIÁM Ư",
            "partOfSpeech": "conjunction",
            "meaningVi": "Xét vì, căn cứ vào (Lời mở đầu điều khoản Recitals trong hợp đồng tiếng Anh: Whereas)",
            "radicals": "鉴 (Giám - soi chiếu) + 于 (Ư - tại vì)",
            "grammarNote": "Phần mở đầu hợp đồng: 鉴于条款 (Whereas clauses).",
            "exampleSentence": {
              "target": "鉴于甲方拥有先进的专利技术，乙方具备强大的市场分销网络，双方特订立本许可协议。",
              "pronunciation": "Jiànyú Jiǎfāng yōngyǒu xiānjìn de zhuānlì jìshù, Yǐfāng jùbèi qiángdà de shìchǎng fēnxiāo wǎngluò, shuāngfāng tè dìnglì běn xǔkě xiéyì.",
              "meaningVi": "Xét vì Bên A sở hữu kỹ thuật sáng chế tiên tiến, Bên B có mạng lưới phân phối thị trường hùng hậu, hai bên đặc biệt xác lập thỏa thuận cấp phép này."
            }
          },
          {
            "id": "zh_h6_12_8",
            "word": "终局",
            "pronunciation": "zhōngjú",
            "hanViet": "CHUNG CỤC",
            "partOfSpeech": "noun/adj",
            "meaningVi": "Chung thẩm, có hiệu lực cuối cùng không được kháng án (Final and binding)",
            "radicals": "终 (Chung - kết thúc) + 局 (Cục - cục diện)",
            "grammarNote": "Phán quyết có giá trị chung thẩm: 终局裁决.",
            "exampleSentence": {
              "target": "仲裁庭作出的最终裁决对甲乙双方均具有终局法律约束力，任何一方不得再向法院提起诉讼。",
              "pronunciation": "Zhòngcáitíng zuòchū de zuìzhōng cáijué duì Jiǎ-Yǐ shuāngfāng jūn jùyǒu zhōngjú fǎlǜ yuēshùlì, rènhé yì fāng bùdé zài xiàng fǎyuàn tíqǐ sùsòng.",
              "meaningVi": "Phán quyết cuối cùng do Hội đồng trọng tài đưa ra đều có hiệu lực ràng buộc pháp lý chung thẩm đối với cả hai bên Bên A và Bên B, không bên nào được phép tiếp tục khởi kiện lên tòa án."
            }
          }
        ]
      }
    ]
  }
};

export default ADVANCED_ZH_DATA;
