const fs = require('fs');
const path = require('path');

// Read existing HSK 3 from advancedZhData.js
const currentZh = fs.readFileSync(path.join(__dirname, 'client/src/data/advancedZhData.js'), 'utf8');

// Match the HSK 3 object content
const hsk3Match = currentZh.match(/zh_hsk3:\s*\{[\s\S]*?\}\s*\}\s*;/);

// Let's create complete HSK 4, HSK 5, HSK 6
const hsk5Data = {
  levelId: 'zh_hsk5',
  code: 'HSK 5',
  title: 'HSK 5 - Cao Cấp 1: Đàm Phán Thương Mại, Văn Học & Thư Diện Ngữ',
  lessons: [
    {
      id: 'zh_hsk5_l1',
      title: 'Bài 1: Đàm Phán Thương Mại Quốc Tế & Thư Diện Ngữ 以, 从而',
      grammarFocus: 'Ngữ pháp văn viết thư diện ngữ: 以 (Để/Bằng cách: 以诚待人, 以促进合作) & 从而 (Từ đó/Qua đó: 优化流程，从而提高生产效率).',
      vocabularies: [
        {
          id: 'zh_h5_1_1',
          word: '谈判',
          pronunciation: 'tánpàn',
          hanViet: 'ĐÀM PHÁN',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Đàm phán thương lượng, cuộc thương lượng',
          radicals: '谈 (Đàm - nói chuyện) + 判 (Phán - phán xét đánh giá)',
          grammarNote: 'Bàn đàm phán: 谈判桌. Đàm phán thương mại: 商务谈判.',
          exampleSentence: {
            target: '双方代表经过艰苦的商务谈判，最终就关键条款达成了共识。',
            pronunciation: 'Shuāngfāng dàibiǎo jīngguò jiānkǔ de shāngwù tánpàn, zuìzhōng jiù guānjiàn tiáokuǎn dáchéng le gòngshí.',
            meaningVi: 'Đại diện hai bên trải qua cuộc đàm phán thương mại gian khổ, cuối cùng đã đạt được sự đồng thuận về các điều khoản then chốt.'
          }
        },
        {
          id: 'zh_h5_1_2',
          word: '从而',
          pronunciation: 'cóng\'ér',
          hanViet: 'TÙNG NHI',
          partOfSpeech: 'conjunction',
          meaningVi: 'Từ đó, qua đó dẫn đến kết quả',
          radicals: '从 (Tùng - theo đó) + 而 (Nhi - mà)',
          grammarNote: 'Liên từ thư diện ngữ biểu thị kết quả tự nhiên hoặc mục đích đạt được.',
          exampleSentence: {
            target: '企业通过引入先进管理系统降低了运营成本，从而显著增强了核心竞争力。',
            pronunciation: 'Qǐyè tōngguò yǐnrù xiānjìn guǎnlǐ xìtǒng jiàngdī le yùnyíng chéngběn, cóng\'ér xiǎnzhù zēngqiáng le héxīn jìngzhēnglì.',
            meaningVi: 'Doanh nghiệp thông qua đưa vào hệ thống quản lý tiên tiến đã hạ thấp chi phí vận hành, từ đó gia tăng rõ rệt sức cạnh tranh cốt lõi.'
          }
        },
        {
          id: 'zh_h5_1_3',
          word: '互利共赢',
          pronunciation: 'hù lì gòng yíng',
          hanViet: 'HỖ LỢI CỘNG DOANH',
          partOfSpeech: 'idiom',
          meaningVi: 'Đôi bên cùng có lợi (Win-Win)',
          radicals: '互利 (Cùng có lợi cho nhau) + 共赢 (Cùng nhau chiến thắng)',
          grammarNote: 'Nguyên tắc vàng trong thương mại quốc tế.',
          exampleSentence: {
            target: '我们秉持互利共赢的原则，愿与全球合作伙伴共同开拓广阔的市场空间。',
            pronunciation: 'Wǒmen bǐngchí hùlì gòngyíng de yuánzé, yuàn yǔ quánqiú hézuò huǒbàn gòngtóng kāituò guǎngkuò de shìchǎng kōngjiān.',
            meaningVi: 'Chúng tôi giữ vững nguyên tắc đôi bên cùng có lợi, sẵn sàng cùng các đối tác toàn cầu mở rộng không gian thị trường rộng lớn.'
          }
        },
        {
          id: 'zh_h5_1_4',
          word: '让步',
          pronunciation: 'ràngbù',
          hanViet: 'NHƯỢNG BỘ',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Nhượng bộ, lùi một bước để đạt thỏa hiệp',
          radicals: '让 (Nhượng - nhường lại) + 步 (Bộ - bước chân)',
          grammarNote: 'Đưa ra sự nhượng bộ: 做出让步.',
          exampleSentence: {
            target: '为了促成这项长远战略合作，我方在价格上做出了合理的让步。',
            pronunciation: 'Wèile cùchéng zhè xiàng chángyuǎn zhànlüè hézuò, wǒfāng zài jiàgé shang zuòchū le hélǐ de ràngbù.',
            meaningVi: 'Để thúc đẩy hợp tác chiến lược lâu dài này, phía chúng tôi đã đưa ra sự nhượng bộ hợp lý về mặt giá cả.'
          }
        },
        {
          id: 'zh_h5_1_5',
          word: '意向',
          pronunciation: 'yìxiàng',
          hanViet: 'Ý HƯỚNG',
          partOfSpeech: 'noun',
          meaningVi: 'Ý định, ý hướng hợp tác',
          radicals: '意 (Ý - ý nghĩ) + 向 (Hướng - xu hướng)',
          grammarNote: 'Thư ngỏ ý định hợp tác: 合作意向书 (Letter of Intent - LOI).',
          exampleSentence: {
            target: '双方在博览会开幕当天便签署了总金额达五千万美元的合作意向书。',
            pronunciation: 'Shuāngfāng zài bólǎnhuì kāimù dāngtiān biàn qiānshǔ le zǒng jīné dá wǔ qiān wàn Měiyuán de hézuò yìxiàngshū.',
            meaningVi: 'Hai bên ngay ngày khai mạc hội chợ triển lãm đã ký kết bản ghi nhớ ý hướng hợp tác với tổng trị giá lên đến 50 triệu USD.'
          }
        },
        {
          id: 'zh_h5_1_6',
          word: '妥协',
          pronunciation: 'tuǒxié',
          hanViet: 'THỎA HIỆP',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Thỏa hiệp, cùng nhân nhượng để đạt hòa giải',
          radicals: '妥 (Thỏa - êm đẹp, ổn thỏa) + 协 (Hiệp - cùng hòa thuận)',
          grammarNote: 'Không chịu thỏa hiệp: 绝不妥协.',
          exampleSentence: {
            target: '成熟的商务谈判往往是在坚持核心底线的前提下寻求务实的妥协。',
            pronunciation: 'Chéngshú de shāngwù tánpàn wǎngwǎng shì zài jiānchí héxīn dǐxiàn de qiántí xià xúnqiú wùshí de tuǒxié.',
            meaningVi: 'Cuộc đàm phán thương mại chín chắn thường là tìm kiếm sự thỏa hiệp thực tế trên tiền đề giữ vững lằn ranh đỏ cốt lõi.'
          }
        },
        {
          id: 'zh_h5_1_7',
          word: '原则',
          pronunciation: 'yuánzé',
          hanViet: 'NGUYÊN TẮC',
          partOfSpeech: 'noun',
          meaningVi: 'Nguyên tắc bất di bất dịch',
          radicals: '原 (Nguyên - nguồn gốc ban đầu) + 则 (Tắc - phép tắc chuẩn mực)',
          grammarNote: 'Giữ vững nguyên tắc: 坚持原则.',
          exampleSentence: {
            target: '在产品质量安全问题上，我们没有任何可以退让的原则空间。',
            pronunciation: 'Zài chǎnpǐn zhìliàng ānquán wèntí shang, wǒmen méiyǒu rènhé kěyǐ tuìràng de yuánzé kōngjiān.',
            meaningVi: 'Trên vấn đề chất lượng an toàn sản phẩm, chúng tôi không có bất kỳ không gian nguyên tắc nào có thể lùi bước.'
          }
        },
        {
          id: 'zh_h5_1_8',
          word: '以',
          pronunciation: 'yǐ',
          hanViet: 'DĨ',
          partOfSpeech: 'preposition/conjunction',
          meaningVi: 'Dùng, lấy... để... (thư diện ngữ biểu thị mục đích, phương thức)',
          radicals: 'Chữ đơn giản cổ tượng hình người dùng đồ vật',
          grammarNote: 'Văn thư ngoại giao kinh tế rất chuộng dùng: 以期 (để mong), 以便 (để tiện cho).',
          exampleSentence: {
            target: '我们必须加快技术研发进度，以满足海内外客户对高性能产品的迫切需求。',
            pronunciation: 'Wǒmen bìxū jiākuài jìshù yánfā jìndù, yǐ mǎnzú hǎinèiwài kèhù duì gāo xìngnéng chǎnpǐn de pòqiè xūqiú.',
            meaningVi: 'Chúng ta bắt buộc phải đẩy nhanh tiến độ nghiên cứu kỹ thuật để đáp ứng nhu cầu cấp thiết của khách hàng trong và ngoài nước đối với sản phẩm tính năng cao.'
          }
        }
      ]
    },
    {
      id: 'zh_hsk5_l2',
      title: 'Bài 2: Ký Kết Hợp Đồng & Điều Khoản Pháp Lý (Thư Diện Ngữ 为, 由)',
      grammarFocus: 'Thư diện ngữ 為 (wéi - được coi là / trở thành) & 由 (yóu - do ai chịu trách nhiệm: 费用由违约方承担).',
      vocabularies: [
        {
          id: 'zh_h5_2_1',
          word: '条款',
          pronunciation: 'tiáokuǎn',
          hanViet: 'ĐIỀU KHOẢN',
          partOfSpeech: 'noun',
          meaningVi: 'Điều khoản trong hợp đồng/văn bản pháp luật',
          radicals: '条 (Điều - từng mục) + 款 (Khoản - tiết mục chi tiết)',
          grammarNote: 'Điều khoản bồi thường: 违约责任条款. Điều khoản bảo mật: 保密条款.',
          exampleSentence: {
            target: '在签字盖章之前，请法务人员再次逐字审核合同中的每一项条款。',
            pronunciation: 'Zài qiānzì gàizhāng zhīqián, qǐng fǎwù rényuán zàicì zhúzì shěnhé hétong zhōng de měi yì xiàng tiáokuǎn.',
            meaningVi: 'Trước khi ký tên đóng dấu, xin mời nhân viên pháp chế một lần nữa rà soát từng chữ từng mục trong các điều khoản hợp đồng.'
          }
        },
        {
          id: 'zh_h5_2_2',
          word: '违约',
          pronunciation: 'wéiyuē',
          hanViet: 'VI ƯỚC',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Vi phạm hợp đồng, bội ước',
          radicals: '违 (Vi - làm trái) + 约 (Ước - lời ước hẹn, giao kèo)',
          grammarNote: 'Tiền phạt vi phạm hợp đồng: 违约金. Bên vi phạm: 违约方.',
          exampleSentence: {
            target: '若任何一方单方面中止履行合同，需向守约方支付巨额违约金。',
            pronunciation: 'Ruò rènhé yì fāng dānfāngmiàn zhōngzhǐ lǚxíng hétong, xū xiàng shǒuyuēfāng zhīfù jù\'é wéiyuējīn.',
            meaningVi: 'Nếu bất kỳ bên nào đơn phương chấm dứt thực hiện hợp đồng, phải chi trả khoản tiền phạt vi ước khổng lồ cho bên thực hiện đúng hợp đồng.'
          }
        },
        {
          id: 'zh_h5_2_3',
          word: '履行',
          pronunciation: 'lǚxíng',
          hanViet: 'LÝ HÀNH',
          partOfSpeech: 'verb',
          meaningVi: 'Thực thi, thi hành nghĩa vụ hợp đồng',
          radicals: '履 (Lý - bước chân, thực hiện) + 行 (Hành - tiến hành)',
          grammarNote: 'Thực hiện nghĩa vụ: 履行义务. Thực hiện hợp đồng: 履行合同.',
          exampleSentence: {
            target: '信守承诺、严格履行合同是企业立足商界的立身之本。',
            pronunciation: 'Xìnshǒu chéngnuò, yángé lǚxíng hétong shì qǐyè lìzú shāngjiè de lìshēn zhī běn.',
            meaningVi: 'Giữ trọn lời hứa, thực thi nghiêm ngặt hợp đồng là cái gốc đứng vững của doanh nghiệp trên thương trường.'
          }
        },
        {
          id: 'zh_h5_2_4',
          word: '生效',
          pronunciation: 'shēngxiào',
          hanViet: 'SINH HIỆU',
          partOfSpeech: 'verb',
          meaningVi: 'Có hiệu lực pháp lý',
          radicals: '生 (Sinh - phát sinh) + 效 (Hiệu - hiệu lực)',
          grammarNote: 'Bắt đầu có hiệu lực: 正式生效. Hết hiệu lực: 失效.',
          exampleSentence: {
            target: '本协议自甲乙双方法定代表人签字并加盖公章之日起正式生效。',
            pronunciation: 'Běn xiéyì zì Jiǎ-Yǐ shuāngfāng fǎdìng dàibiǎorén qiānzì bìng jiāgài gōngzhāng zhī rì qǐ zhèngshì shēngxiào.',
            meaningVi: 'Thỏa thuận này chính thức có hiệu lực kể từ ngày người đại diện theo pháp luật của hai bên Bên A và Bên B ký tên và đóng dấu pháp nhân.'
          }
        },
        {
          id: 'zh_h5_2_5',
          word: '甲方',
          pronunciation: 'jiǎfāng',
          hanViet: 'GIÁP PHƯƠNG',
          partOfSpeech: 'noun',
          meaningVi: 'Bên A (trong hợp đồng pháp lý)',
          radicals: '甲 (Giáp - vị trí thứ nhất trong Thập can) + 方 (Bên)',
          grammarNote: 'Bên B: 乙方. Bên C (bên thứ ba): 丙方.',
          exampleSentence: {
            target: '甲方承诺在收到合格货物后的五个工作日内向乙方支付全部尾款。',
            pronunciation: 'Jiǎfāng chéngnuò zài shōudào hégé huòwù hòu de wǔ ge gōngzuòrì nèi xiàng Yǐfāng zhīfù quánbù wěikuǎn.',
            meaningVi: 'Bên A cam kết trong vòng 5 ngày làm việc sau khi nhận được hàng đạt chuẩn sẽ thanh toán toàn bộ số tiền còn lại cho Bên B.'
          }
        },
        {
          id: 'zh_h5_2_6',
          word: '争议',
          pronunciation: 'zhēngyì',
          hanViet: 'TRANH NGHỊ',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Tranh chấp, bất đồng quan điểm pháp lý',
          radicals: '争 (Tranh - tranh giành) + 议 (Nghị - tranh luận)',
          grammarNote: 'Giải quyết tranh chấp: 争议解决. Trọng tài thương mại: 仲裁 (zhòngcái).',
          exampleSentence: {
            target: '因本合同引起的或与本合同有关的任何争议，双方应首先通过友好协商解决。',
            pronunciation: 'Yīn běn hétong yǐnqǐ de huò yǔ běn hétong yǒuguān de rènhé zhēngyì, shuāngfāng yīng shǒuxiān tōngguò yǒuhǎo xiéshāng jiějué.',
            meaningVi: 'Bất kỳ tranh chấp nào phát sinh do hoặc liên quan đến hợp đồng này, hai bên trước tiên cần giải quyết thông qua hiệp thương hữu nghị.'
          }
        },
        {
          id: 'zh_h5_2_7',
          word: '由',
          pronunciation: 'yóu',
          hanViet: 'DO',
          partOfSpeech: 'preposition',
          meaningVi: 'Do... đảm nhận, bởi... phụ trách (thư diện ngữ)',
          radicals: 'Tự nhiên từ nguồn gốc',
          grammarNote: 'Cấu trúc thư diện ngữ trang trọng: 由+Chủ thể+Động từ: 该项费用由承运人承担.',
          exampleSentence: {
            target: '因不可抗力导致货物受损的一切责任，由承保的保险公司负责赔偿。',
            pronunciation: 'Yīn bùkěkànglì dǎozhì huòwù shòusǔn de yíqiè zérèn, yóu chéngbǎo de bǎoxiǎn gōngsī fùzé péicháng.',
            meaningVi: 'Mọi trách nhiệm hàng hóa hư hại do trường hợp bất khả kháng, do công ty bảo hiểm nhận bảo hiểm chịu trách nhiệm bồi thường.'
          }
        },
        {
          id: 'zh_h5_2_8',
          word: '为',
          pronunciation: 'wéi',
          hanViet: 'VI / VỊ',
          partOfSpeech: 'verb/preposition',
          meaningVi: 'Làm, coi như, trở thành (thư diện ngữ)',
          radicals: 'Chữ Hán phồn thể 為',
          grammarNote: 'Văn phong văn bản: 以...为准 (Lấy... làm chuẩn).',
          exampleSentence: {
            target: '若中英文两个版本产生歧义，一律以中文正本的内容为准。',
            pronunciation: 'Ruò Zhōng-Yīng liǎng ge bǎnběn chǎnshēng qíyì, yílǜ yǐ Zhōngwén zhèngběn de nèiróng wéizhǔn.',
            meaningVi: 'Nếu giữa hai phiên bản tiếng Trung và tiếng Anh nảy sinh cách hiểu khác nhau, hoàn toàn lấy nội dung bản gốc tiếng Trung làm chuẩn.'
          }
        }
      ]
    },
    {
      id: 'zh_hsk5_l3',
      title: 'Bài 3: Phân Tích Thị Trường Chứng Khoán & Thư Diện Ngữ 在于, 进而',
      grammarFocus: 'Thư diện ngữ 在于 (Zàiyú - Nằm ở chỗ: 成功的关键在于细节) & 进而 (Jìn\'ér - Hơn nữa/Tiến thêm một bước: 深入调研，进而制定长远策略).',
      vocabularies: [
        {
          id: 'zh_h5_3_1',
          word: '股票',
          pronunciation: 'gǔpiào',
          hanViet: 'CỔ PHIẾU',
          partOfSpeech: 'noun',
          meaningVi: 'Cổ phiếu trên thị trường chứng khoán',
          radicals: '股 (Cổ - phần chia) + 票 (Phiếu - chứng thư)',
          grammarNote: 'Thị trường chứng khoán: 股市. Mua bán cổ phiếu: 炒股.',
          exampleSentence: {
            target: '股市投资具有较高的收益潜力，但同时也伴随着不可忽视的市场风险。',
            pronunciation: 'Gǔshì tóuzī jùyǒu gāodāng de shōuyì qiánlì, dàn tóngshí yě bànsuízhe bù kě hūshì de shìchǎng fēngxiǎn.',
            meaningVi: 'Đầu tư chứng khoán có tiềm năng thu lợi nhuận cao, nhưng đồng thời cũng kèm theo rủi ro thị trường không thể xem nhẹ.'
          }
        },
        {
          id: 'zh_h5_3_2',
          word: '波动',
          pronunciation: 'bōdòng',
          hanViet: 'BA ĐỘNG',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Biến động, dao động lên xuống',
          radicals: '波 (Ba - làn sóng nước) + 动 (Động - chuyển động)',
          grammarNote: 'Biến động giá: 价格剧烈波动.',
          exampleSentence: {
            target: '受国际大宗商品价格波动的影响，原油进口成本大幅攀升。',
            pronunciation: 'Shòu guójì dàzōng shāngpǐn jiàgé bōdòng de yǐngxiǎng, yuányóu jìnkǒu chéngběn dàfú pānshēng.',
            meaningVi: 'Chịu ảnh hưởng bởi biến động giá hàng hóa cơ bản quốc tế, chi phí nhập khẩu dầu thô đã tăng mạnh.'
          }
        },
        {
          id: 'zh_h5_3_3',
          word: '指数',
          pronunciation: 'zhǐshù',
          hanViet: 'CHỈ SỐ',
          partOfSpeech: 'noun',
          meaningVi: 'Chỉ số đo lường kinh tế/thị trường',
          radicals: '指 (Chỉ - chỉ tay, biểu thị) + 数 (Số - số liệu)',
          grammarNote: 'Chỉ số giá tiêu dùng: 居民消费价格指数 (CPI). Chỉ số chứng khoán: 上证指数.',
          exampleSentence: {
            target: '上证综合指数在利好政策的推动下连续突破多个关键阻力位。',
            pronunciation: 'Shàngzhèng zōnghé zhǐshù zài lìhǎo zhèngcè de tuīdòng xià liánxù tūpò duō ge guānjiàn zǔlìwèi.',
            meaningVi: 'Chỉ số tổng hợp Thượng Hải dưới sự thúc đẩy của chính sách có lợi đã liên tục bứt phá qua nhiều ngưỡng kháng cự then chốt.'
          }
        },
        {
          id: 'zh_h5_3_4',
          word: '在于',
          pronunciation: 'zàiyú',
          hanViet: 'TẠI Ư',
          partOfSpeech: 'verb',
          meaningVi: 'Cốt lõi nằm ở chỗ, do... quyết định (thư diện ngữ)',
          radicals: '在 (Tại - ở) + 于 (Ư - tại)',
          grammarNote: 'Cụm từ kinh điển: 问题的核心在于...',
          exampleSentence: {
            target: '价值投资的精髓不仅在于发现被低估的企业，更在于能够耐得住寂寞长期持有。',
            pronunciation: 'Jiàzhí tóuzī de jīngsuǐ bùjǐn zàiyú fāxiàn bèi dīgū de qǐyè, gèng zàiyú nénggòu nài de zhù jìmò chángqī chíyǒu.',
            meaningVi: 'Tinh hoa của đầu tư giá trị không chỉ nằm ở việc phát hiện doanh nghiệp bị định giá thấp, mà hơn thế còn nằm ở việc có thể chịu đựng được sự cô đơn để nắm giữ dài hạn.'
          }
        },
        {
          id: 'zh_h5_3_5',
          word: '进而',
          pronunciation: 'jìn\'ér',
          hanViet: 'TIẾN NHI',
          partOfSpeech: 'conjunction',
          meaningVi: 'Tiến thêm một bước, sau đó hơn nữa (thư diện ngữ)',
          radicals: '进 (Tiến - tiến lên) + 而 (Nhi - mà)',
          grammarNote: 'Biểu thị sự phát triển nâng cao lên nấc thang tiếp theo.',
          exampleSentence: {
            target: '央行下调存款准备金率以释放流动性，进而刺激实体经济的信贷增长。',
            pronunciation: 'Yāngháng xiàtiáo cúnkuǎn zhǔnbèijīn lǜ yǐ shìfàng liúdòngxìng, jìn\'ér cìjī shítǐ jīngjì de xìndài zēngzhǎng.',
            meaningVi: 'Ngân hàng trung ương hạ tỷ lệ dự trữ bắt buộc để giải phóng thanh khoản, tiến thêm một bước kích thích tăng trưởng tín dụng cho nền kinh tế thực.'
          }
        },
        {
          id: 'zh_h5_3_6',
          word: '牛市',
          pronunciation: 'niúshì',
          hanViet: 'NGƯU THỊ',
          partOfSpeech: 'noun',
          meaningVi: 'Thị trường giá lên, thị trường bò tót (Bull market)',
          radicals: '牛 (Ngưu - con bò húc sừng lên) + 市 (Thị - thị trường)',
          grammarNote: 'Trái nghĩa: 熊市 (xióngshì - thị trường gấu đập xuống, Bear market).',
          exampleSentence: {
            target: '伴随着经济数据的全面回暖，很多分析师预测新一轮结构性牛市即将来临。',
            pronunciation: 'Bànsuízhe jīngjì shùjù de quánmiàn huínuǎn, hěn duō fēnxīshī yùcè xīn yì lún jiégòuxìng niúshì jíjiāng láilín.',
            meaningVi: 'Đi kèm với số liệu kinh tế ấm lên toàn diện, rất nhiều chuyên gia phân tích dự đoán một đợt thị trường bò tót mang tính cấu trúc mới sắp sửa kéo đến.'
          }
        },
        {
          id: 'zh_h5_3_7',
          word: '资产',
          pronunciation: 'zīchǎn',
          hanViet: 'TƯ SẢN',
          partOfSpeech: 'noun',
          meaningVi: 'Tài sản',
          radicals: '资 (Tư - tiền tài) + 产 (Sản - sản nghiệp)',
          grammarNote: 'Phân bổ tài sản: 资产配置. Quản lý tài sản: 资产管理.',
          exampleSentence: {
            target: '合理的多元化资产配置能够有效平滑投资组合的整体收益波动。',
            pronunciation: 'Hélǐ de duōyuánhuà zīchǎn pèizhì nénggòu yǒuxiào pínghuá tóuzī zǔhé de zhěngtǐ shōuyì bōdòng.',
            meaningVi: 'Phân bổ tài sản đa dạng hóa hợp lý có thể làm mượt mà sự biến động lợi nhuận tổng thể của danh mục đầu tư một cách hiệu quả.'
          }
        },
        {
          id: 'zh_h5_3_8',
          word: '收益',
          pronunciation: 'shōuyì',
          hanViet: 'THU ÍCH',
          partOfSpeech: 'noun',
          meaningVi: 'Lợi nhuận thu được, tỷ suất sinh lời',
          radicals: '收 (Thu - nhận về) + 益 (Ích - lợi ích)',
          grammarNote: 'Lợi nhuận đi kèm rủi ro: 高风险高收益.',
          exampleSentence: {
            target: '投资者在追求高额预期收益的同时，绝不可忽视本金的安全保障。',
            pronunciation: 'Tóuzīzhě zài zhuīqiú gāo\'é yùqī shōuyì de tóngshí, jué bù kě hūshì běnjīn de ānquán bǎozhàng.',
            meaningVi: 'Các nhà đầu tư khi mưu cầu lợi nhuận kỳ vọng cao ngất, tuyệt đối không được xem nhẹ bảo đảm an toàn cho số vốn gốc.'
          }
        }
      ]
    },
    {
      id: 'zh_hsk5_l4',
      title: 'Bài 4: Triết Lý Nhân Sinh & Thư Diện Ngữ 未免, 何必',
      grammarFocus: 'Thư diện ngữ 未免 (Wèimiǎn - Không tránh khỏi/Có phần hơi quá: 这样评价未免有失偏颇) & 何必 (Hébì - Hà tất/Cần gì phải: 既然已经尽力，又何必自责).',
      vocabularies: [
        {
          id: 'zh_h5_4_1',
          word: '未免',
          pronunciation: 'wèimiǎn',
          hanViet: 'VỊ MIỄN',
          partOfSpeech: 'adverb',
          meaningVi: 'Không tránh khỏi, e rằng hơi quá (dùng giảm bớt sự gay gắt)',
          radicals: '未 (Vị - chưa) + 免 (Miễn - tránh khỏi)',
          grammarNote: 'Thường đứng trước tính từ: 未免太严格, 未免有点过分.',
          exampleSentence: {
            target: '仅仅凭一次偶然的失误就全盘否定一个人的能力，未免太武断了。',
            pronunciation: 'Jǐnjǐn píng yí cì ǒurán de shīwù jiù quánpán fǒudìng yí ge rén de nénglì, wèimiǎn tài wǔduàn le.',
            meaningVi: 'Chỉ dựa vào một lần sai sót ngẫu nhiên mà đã phủ định sạch trơn năng lực của một con người, e rằng có phần quá độc đoán.'
          }
        },
        {
          id: 'zh_h5_4_2',
          word: '何必',
          pronunciation: 'hébì',
          hanViet: 'HÀ TẤT',
          partOfSpeech: 'adverb',
          meaningVi: 'Hà tất, việc gì phải, đâu cần thiết',
          radicals: '何 (Hà - cái gì, làm sao) + 必 (Tất - nhất thiết)',
          grammarNote: 'Phó từ phản vấn biểu thị việc đó là không cần thiết: 何必当初 (Hà tất lúc đầu).',
          exampleSentence: {
            target: '过去的事情既然无法挽回，我们又何必整天沉浸在痛苦的悔恨之中？',
            pronunciation: 'Guòqu de shìqing jìrán wúfǎ wǎnhuí, wǒmen yòu hébì zhěngtiān chénjìn zài tòngkǔ de huǐhèn zhīzhōng?',
            meaningVi: 'Những chuyện trong quá khứ một khi đã không thể vãn hồi, chúng ta hà tất phải chìm đắm trong ân hận đau đớn cả ngày?'
          }
        },
        {
          id: 'zh_h5_4_3',
          word: '境界',
          pronunciation: 'jìngjiè',
          hanViet: 'CẢNH GIỚI',
          partOfSpeech: 'noun',
          meaningVi: 'Cảnh giới tinh thần, tầng bậc nhận thức',
          radicals: '境 (Cảnh - cõi lòng) + 界 (Giới - ranh giới)',
          grammarNote: 'Cảnh giới tư tưởng: 思想境界.',
          exampleSentence: {
            target: '宠辱不惊、去留无意，展现的是一种超然物外的人生崇高境界。',
            pronunciation: 'Chǒngrǔbùjīng, qùliúwúyì, zhǎnxiàn de shì yì zhǒng chāoránwùwài de rénshēng chónggāo jìngjiè.',
            meaningVi: 'Vinh hay nhục đều không kinh sợ, đi hay ở chẳng bận lòng, thể hiện một cảnh giới nhân sinh thanh cao siêu thoát sự đời.'
          }
        },
        {
          id: 'zh_h5_4_4',
          word: '豁达',
          pronunciation: 'huòdá',
          hanViet: 'HOÁT ĐẠT',
          partOfSpeech: 'adj',
          meaningVi: 'Khoáng đạt, cởi mở bao dung',
          radicals: '豁 (Hoát - rộng mở) + 达 (Đạt - thông đạt)',
          grammarNote: 'Tâm thái khoáng đạt: 豁达的心态.',
          exampleSentence: {
            target: '面对人生的坎坷与逆境，保持豁达乐观的心境至关重要。',
            pronunciation: 'Miànduì rénshēng de kǎnkě yǔ nìjìng, bǎochí huòdá lèguān de xīnjìng zhìguān zhòngyào.',
            meaningVi: 'Đối mặt với những gập ghềnh và nghịch cảnh của đời người, giữ được tâm trạng khoáng đạt lạc quan là vô cùng hệ trọng.'
          }
        },
        {
          id: 'zh_h5_4_5',
          word: '舍得',
          pronunciation: 'shěde',
          hanViet: 'XẢ ĐẮC',
          partOfSpeech: 'verb',
          meaningVi: 'Sẵn sàng từ bỏ, xả được (Triết lý Có buông bỏ mới có nhận lại)',
          radicals: '舍 (Xả - buông bỏ, cho đi) + 得 (Đắc - nhận lại, đạt được)',
          grammarNote: 'Thành ngữ: 有舍才有得 (Có xả mới có đắc).',
          exampleSentence: {
            target: '在人生的重要十字路口，唯有懂得舍得，才能拥有更加广阔的天地。',
            pronunciation: 'Zài rénshēng de zhòngyào shízì lùkǒu, wéiyǒu dǒngde shěde, cái néng yōngyǒu gèngjiā guǎngkuò de tiāndì.',
            meaningVi: 'Tại ngã tư đường quan trọng của cuộc đời, chỉ khi hiểu được triết lý buông xả, mới có thể sở hữu một chân trời rộng mở hơn.'
          }
        },
        {
          id: 'zh_h5_4_6',
          word: '品德',
          pronunciation: 'pǐndé',
          hanViet: 'PHẨM ĐỨC',
          partOfSpeech: 'noun',
          meaningVi: 'Phẩm chất đạo đức của người quân tử',
          radicals: '品 (Phẩm - phẩm cách) + 德 (Đức - đạo đức)',
          grammarNote: 'Phẩm đức cao thượng: 高尚的品德.',
          exampleSentence: {
            target: '才华固然重要，但优秀的品德才是决定一个人能走多远的根本。',
            pronunciation: 'Cáihuá gùrán zhòngyào, dàn yōuxiù de pǐndé cái shì juédìng yí ge rén néng zǒu duō yuǎn de gēnběn.',
            meaningVi: 'Tài năng tất nhiên quan trọng, nhưng phẩm đức xuất sắc mới là gốc rễ quyết định một con người có thể đi xa đến đâu.'
          }
        },
        {
          id: 'zh_h5_4_7',
          word: '从容',
          pronunciation: 'cóngróng',
          hanViet: 'THUNG DUNG',
          partOfSpeech: 'adj/adverb',
          meaningVi: 'Thong thả ung dung, điềm tĩnh',
          radicals: '从 (Thung - thong thả) + 容 (Dung - dung mạo)',
          grammarNote: 'Đối mặt bình thản: 从容面对.',
          exampleSentence: {
            target: '真正有智慧的人无论身处顺境还是逆境，都能做到从容自若。',
            pronunciation: 'Zhēnzhèng yǒu zhìhuì de rén wúlùn shēnchǔ shùnjìng háishì nìjìng, dōu néng zuòdào cóngróng zìruò.',
            meaningVi: 'Người thực sự có trí tuệ bất luận đang ở trong thuận cảnh hay nghịch cảnh, đều có thể ung dung điềm đạm như không.'
          }
        },
        {
          id: 'zh_h5_4_8',
          word: '修养',
          pronunciation: 'xiūyǎng',
          hanViet: 'TU DƯỠNG',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Sự tu dưỡng, hàm dưỡng văn hóa và nhân cách',
          radicals: '修 (Tu - trau dồi sửa mình) + 养 (Dưỡng - nuôi dưỡng tâm tính)',
          grammarNote: 'Có tu dưỡng cao: 很有修养.',
          exampleSentence: {
            target: '在公共场合不大声喧哗并主动考虑他人的感受，是一个人良好修养的体现。',
            pronunciation: 'Zài gōnggòng chǎnghé bú dàshēng xuānhuá bìng zhǔdòng kǎolǜ tārén de gǎnshòu, shì yí ge rén liánghǎo xiūyǎng de tǐxiàn.',
            meaningVi: 'Ở nơi công cộng không nói cười ồn ào và chủ động nghĩ cho cảm nhận của người khác là sự thể hiện tu dưỡng tốt đẹp của một con người.'
          }
        }
      ]
    }
  ]
};

console.log('HSK 5 generated!');
`);

fs.writeFileSync(path.join(__dirname, 'build-curriculum-runner.cjs'), `
console.log('Curriculum builder ready');
`);
