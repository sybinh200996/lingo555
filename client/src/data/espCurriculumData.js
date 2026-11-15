/**
 * espCurriculumData.js
 * Comprehensive ESP (English for Specific Purposes & Tiếng Trung Chuyên Ngành) Dataset.
 * 7 Specialized Career Fields:
 *  1. IT & AI / Software Engineering (Công Nghệ Thông Tin & AI)
 *  2. Accounting & Corporate Finance (Kế Toán & Tài Chính)
 *  3. Office Administration & Civil Operations (Văn Phòng & Hành Chính Dân Sự)
 *  4. Human Resources Management (Quản Trị Nhân Sự & Tuyển Dụng)
 *  5. Supply Chain & International Logistics (Xuất Nhập Khẩu & Logistics)
 *  6. Healthcare & Clinical Practice (Y Tế & Dược Phẩm)
 *  7. Hospitality & Tourism Management (Du Lịch & Khách Sạn)
 *
 * Each field features progressive scaffolding: Căn bản -> Nghiệp vụ -> Đàm phán/Chuyên sâu thực chiến.
 */

export const ESP_LEVELS = [
  // ==========================================
  // TIẾNG TRUNG CHUYÊN NGÀNH (ZH)
  // ==========================================
  {
    id: 'zh_it',
    language_id: 'zh',
    category: 'esp',
    code: 'CNTT',
    icon: '💻',
    title: 'Công Nghệ Thông Tin (IT & AI)',
    subtitle: 'Lập trình, thuật toán, cơ sở dữ liệu, bug tracking và AI',
    color: '#0284c7',
    order_index: 20
  },
  {
    id: 'zh_accounting',
    language_id: 'zh',
    category: 'esp',
    code: 'KẾ TOÁN',
    icon: '📊',
    title: 'Kế Toán & Tài Chính Doanh Nghiệp',
    subtitle: 'Hóa đơn, sổ sách, bảng cân đối, báo cáo tài chính và thuế',
    color: '#059669',
    order_index: 21
  },
  {
    id: 'zh_office',
    language_id: 'zh',
    category: 'esp',
    code: 'VĂN PHÒNG',
    icon: '🏢',
    title: 'Văn Phòng & Hành Chính Dân Sự',
    subtitle: 'Soạn thảo công văn, quản lý tài liệu, thủ tục hành chính và hội nghị',
    color: '#7c3aed',
    order_index: 22
  },
  {
    id: 'zh_hr',
    language_id: 'zh',
    category: 'esp',
    code: 'NHÂN SỰ',
    icon: '👥',
    title: 'Quản Trị Nhân Sự (HR & Tuyển Dụng)',
    subtitle: 'Đăng tuyển, lọc CV, phỏng vấn, hợp đồng, KPI và đãi ngộ',
    color: '#ea580c',
    order_index: 23
  },
  {
    id: 'zh_logistics',
    language_id: 'zh',
    category: 'esp',
    code: 'LOGISTICS',
    icon: '🚢',
    title: 'Xuất Nhập Khẩu & Logistics',
    subtitle: 'Vận đơn B/L, Incoterms, thông quan hải quan, kho bãi và cước tàu',
    color: '#2563eb',
    order_index: 24
  },
  {
    id: 'zh_medical',
    language_id: 'zh',
    category: 'esp',
    code: 'Y TẾ',
    icon: '🏥',
    title: 'Y Tế & Chăm Sóc Sức Khỏe',
    subtitle: 'Bệnh án, triệu chứng lâm sàng, đơn thuốc và chăm sóc bệnh nhân',
    color: '#dc2626',
    order_index: 25
  },
  {
    id: 'zh_tourism',
    language_id: 'zh',
    category: 'esp',
    code: 'DU LỊCH',
    icon: '🏨',
    title: 'Du Lịch & Khách Sạn',
    subtitle: 'Đặt phòng, lễ tân check-in, tour du lịch, ẩm thực và đón tiếp VIP',
    color: '#d97706',
    order_index: 26
  },

  // ==========================================
  // TIẾNG ANH CHUYÊN NGÀNH (EN)
  // ==========================================
  {
    id: 'en_it',
    language_id: 'en',
    category: 'esp',
    code: 'IT & AI',
    icon: '💻',
    title: 'Information Technology (IT & AI)',
    subtitle: 'Software development, cloud, databases, bug tracking & AI',
    color: '#0284c7',
    order_index: 20
  },
  {
    id: 'en_accounting',
    language_id: 'en',
    category: 'esp',
    code: 'ACCOUNTING',
    icon: '📊',
    title: 'Accounting & Corporate Finance',
    subtitle: 'Balance sheets, financial audits, cash flow, taxation & ledger',
    color: '#059669',
    order_index: 21
  },
  {
    id: 'en_office',
    language_id: 'en',
    category: 'esp',
    code: 'OFFICE',
    icon: '🏢',
    title: 'Office Administration & Civil Affairs',
    subtitle: 'Business correspondence, meeting protocols, civil paperwork & filing',
    color: '#7c3aed',
    order_index: 22
  },
  {
    id: 'en_hr',
    language_id: 'en',
    category: 'esp',
    code: 'HR & RECRUIT',
    icon: '👥',
    title: 'Human Resources Management',
    subtitle: 'Job descriptions, candidate screening, interviews, KPI & payroll',
    color: '#ea580c',
    order_index: 23
  },
  {
    id: 'en_logistics',
    language_id: 'en',
    category: 'esp',
    code: 'LOGISTICS',
    icon: '🚢',
    title: 'Supply Chain & International Logistics',
    subtitle: 'Bills of lading, customs clearance, Incoterms, freight & warehousing',
    color: '#2563eb',
    order_index: 24
  },
  {
    id: 'en_medical',
    language_id: 'en',
    category: 'esp',
    code: 'MEDICAL',
    icon: '🏥',
    title: 'Healthcare & Clinical Practice',
    subtitle: 'Clinical diagnoses, patient history, prescriptions & medical rounds',
    color: '#dc2626',
    order_index: 25
  },
  {
    id: 'en_tourism',
    language_id: 'en',
    category: 'esp',
    code: 'HOSPITALITY',
    icon: '🏨',
    title: 'Hospitality & International Tourism',
    subtitle: 'Front desk operations, concierge, itinerary planning & guest services',
    color: '#d97706',
    order_index: 26
  }
];

// =========================================================================
// TIẾNG TRUNG CHUYÊN NGÀNH: CHI TIẾT BÀI HỌC VÀ TỪ VỰNG CHUẨN XÁC
// =========================================================================
export const ESP_ZH_DATA = {
  // 1. CNTT (zh_it)
  zh_it: {
    levelId: 'zh_it',
    code: 'CNTT',
    title: 'Tiếng Trung Công Nghệ Thông Tin & AI',
    lessons: [
      {
        id: 'zh_it_l1',
        title: 'Khái Niệm Nền Tảng: Phần Cứng, Phần Mềm & Lập Trình',
        grammarFocus: 'Cách dùng trợ từ kết cấu 的 và cấu trúc câu định nghĩa: A 是指 B (A có nghĩa là B)',
        vocabularies: [
          {
            id: 'zh_it_1',
            word: '软件',
            pronunciation: 'ruǎnjiàn',
            hanViet: 'NHUYỄN KIỆN',
            partOfSpeech: 'noun',
            meaningVi: 'Phần mềm',
            radicals: '软 (mềm) + 件 (kiện, linh kiện)',
            grammarNote: 'Đối lập với 硬件 (yìngjiàn - phần cứng).',
            exampleSentence: {
              target: '我们公司专门开发手机软件。',
              pronunciation: 'Wǒmen gōngsī zhuānmén kāifā shǒujī ruǎnjiàn.',
              meaningVi: 'Công ty chúng tôi chuyên phát triển phần mềm điện thoại di động.'
            }
          },
          {
            id: 'zh_it_2',
            word: '代码',
            pronunciation: 'dàimǎ',
            hanViet: 'ĐẠI MÃ',
            partOfSpeech: 'noun',
            meaningVi: 'Mã nguồn, code',
            radicals: '代 (thay thế) + 码 (mã số, ký hiệu)',
            grammarNote: 'Thường kết hợp: 写代码 (viết code), 检查代码 (review/kiểm tra code).',
            exampleSentence: {
              target: '程序员每天都在写代码和调试程序。',
              pronunciation: 'Chéngxùyuán měitiān dōu zài xiě dàimǎ hé tiáoshì chéngxù.',
              meaningVi: 'Lập trình viên mỗi ngày đều viết code và gỡ lỗi chương trình.'
            }
          },
          {
            id: 'zh_it_3',
            word: '数据库',
            pronunciation: 'shùjùkù',
            hanViet: 'SỐ CỨ KHO',
            partOfSpeech: 'noun',
            meaningVi: 'Cơ sở dữ liệu (Database)',
            radicals: '数 (số) + 据 (chứng cứ) + 库 (kho chứa)',
            grammarNote: '库 mang nghĩa kho lưu trữ, như 仓库 (kho hàng), 数据库 (kho dữ liệu).',
            exampleSentence: {
              target: '所有用户信息都保存在云端数据库中。',
              pronunciation: 'Suǒyǒu yònghù xìnxī dōu bǎocún zài yúnduān shùjùkù zhōng.',
              meaningVi: 'Tất cả thông tin người dùng đều được lưu trữ trong cơ sở dữ liệu đám mây.'
            }
          }
        ]
      },
      {
        id: 'zh_it_l2',
        title: 'Quy Trình Scrum: Báo Lỗi, Fix Bug & Họp Kỹ Thuật',
        grammarFocus: 'Cấu trúc câu chữ 把 trong sửa lỗi: 把 Bug 修复 (Fix xong lỗi)',
        vocabularies: [
          {
            id: 'zh_it_4',
            word: '漏洞',
            pronunciation: 'lòudòng',
            hanViet: 'LẬU ĐỐNG',
            partOfSpeech: 'noun',
            meaningVi: 'Lỗ hổng bảo mật, lỗi hệ thống (Bug/Vulnerability)',
            radicals: '漏 (rò rỉ) + 洞 (cái lỗ)',
            grammarNote: 'Trong IT thường dùng 修复漏洞 (vá lỗ hổng) hoặc 找漏洞 (tìm bug).',
            exampleSentence: {
              target: '测试团队发现了一个严重的安全漏洞。',
              pronunciation: 'Cèshì tuánduì fāxiàn le yí gè yánzhòng de ānquán lòudòng.',
              meaningVi: 'Đội kiểm thử (QA/Tester) đã phát hiện một lỗ hổng bảo mật nghiêm trọng.'
            }
          },
          {
            id: 'zh_it_5',
            word: '部署',
            pronunciation: 'bùshǔ',
            hanViet: 'BỘ THỰ',
            partOfSpeech: 'verb/noun',
            meaningVi: 'Triển khai, deploy hệ thống',
            radicals: '部 (bộ phận) + 署 (bố trí, ký thác)',
            grammarNote: 'Deploy lên môi trường sản xuất: 部署到生产环境。',
            exampleSentence: {
              target: '新版本将于今晚十二点正式部署上线。',
              pronunciation: 'Xīn bǎnběn jiāng yú jīnwǎn shí’èr diǎn zhèngshì bùshǔ shàngxiàn.',
              meaningVi: 'Phiên bản mới sẽ được triển khai chính thức lên mạng lúc 12 giờ đêm nay.'
            }
          },
          {
            id: 'zh_it_6',
            word: '人工智能',
            pronunciation: 'réngōng zhìnéng',
            hanViet: 'NHÂN CÔNG TRÍ NĂNG',
            partOfSpeech: 'noun',
            meaningVi: 'Trí tuệ nhân tạo (AI)',
            radicals: '人工 (nhân tạo) + 智能 (thông minh trí tuệ)',
            grammarNote: 'Viết tắt là AI, là từ khóa công nghệ trọng điểm.',
            exampleSentence: {
              target: '人工智能正在彻底改变教育和医疗行业。',
              pronunciation: 'Réngōng zhìnéng zhèngzài chèdǐ gǎibiàn jiàoyù hé yīliáo hángyè.',
              meaningVi: 'Trí tuệ nhân tạo đang thay đổi triệt để ngành giáo dục và y tế.'
            }
          }
        ]
      }
    ]
  },

  // 2. KẾ TOÁN & TÀI CHÍNH (zh_accounting)
  zh_accounting: {
    levelId: 'zh_accounting',
    code: 'KẾ TOÁN',
    title: 'Tiếng Trung Kế Toán & Tài Chính Doanh Nghiệp',
    lessons: [
      {
        id: 'zh_acc_l1',
        title: 'Chứng Từ, Hóa Đơn & Thu Chi Cơ Bản',
        grammarFocus: 'Cấu trúc biểu thị số tiền và thanh toán: 结算 / 报销 (Thanh toán / Quyết toán)',
        vocabularies: [
          {
            id: 'zh_acc_1',
            word: '发票',
            pronunciation: 'fāpiào',
            hanViet: 'PHÁT PHIẾU',
            partOfSpeech: 'noun',
            meaningVi: 'Hóa đơn đỏ (Hóa đơn VAT/tài chính)',
            radicals: '发 (phát ra) + 票 (phiếu, vé)',
            grammarNote: 'Phân biệt 收据 (biên lai thường) và 发票 (hóa đơn chính thức để khấu trừ thuế).',
            exampleSentence: {
              target: '请财务部门开具增值税专用发票。',
              pronunciation: 'Qǐng cáiwù bùmén kāijù zēngzhíshuì zhuānyòng fāpiào.',
              meaningVi: 'Xin bộ phận tài chính xuất hóa đơn giá trị gia tăng (VAT) chuyên dụng.'
            }
          },
          {
            id: 'zh_acc_2',
            word: '报销',
            pronunciation: 'bàoxiāo',
            hanViet: 'BÁO TIÊU',
            partOfSpeech: 'verb',
            meaningVi: 'Thanh toán công tác phí, hoàn ứng',
            radicals: '报 (báo cáo) + 销 (tiêu hủy, quyết toán)',
            grammarNote: 'Cụm từ quen thuộc nơi công sở: 申请报销 (xin thanh toán chi phí).',
            exampleSentence: {
              target: '出差的所有差旅费都可以在下周前报销。',
              pronunciation: 'Chūchāi de suǒyǒu chāilǚfèi dōu kěyǐ zài xià zhōu qián bàoxiāo.',
              meaningVi: 'Tất cả chi phí công tác đều có thể được thanh toán hoàn ứng trước tuần sau.'
            }
          },
          {
            id: 'zh_acc_3',
            word: '资产',
            pronunciation: 'zīchǎn',
            hanViet: 'TƯ SẢN',
            partOfSpeech: 'noun',
            meaningVi: 'Tài sản',
            radicals: '资 (tư bản, tiền của) + 产 (sản sinh, tài sản)',
            grammarNote: 'Đối ứng với 负债 (fùzhài - nợ phải trả). Thuộc bảng cân đối kế toán.',
            exampleSentence: {
              target: '公司的固定资产包括厂房和先进的生产机器。',
              pronunciation: 'Gōngsī de gùdìng zīchǎn bāokuò chǎngfáng hé xiānjìn de shēngchǎn jīqì.',
              meaningVi: 'Tài sản cố định của công ty bao gồm nhà xưởng và máy móc sản xuất tiên tiến.'
            }
          }
        ]
      },
      {
        id: 'zh_acc_l2',
        title: 'Báo Cáo Tài Chính, Kiểm Toán & Quyết Toán Thuế',
        grammarFocus: 'Thuật ngữ tài chính: 资产负债表 (Bảng CĐKT), 利润表 (Báo cáo L/L)',
        vocabularies: [
          {
            id: 'zh_acc_4',
            word: '审计',
            pronunciation: 'shěnjì',
            hanViet: 'THẨM KẾ',
            partOfSpeech: 'noun/verb',
            meaningVi: 'Kiểm toán, thanh tra tài chính',
            radicals: '审 (xét xử, thẩm định) + 计 (tính toán)',
            grammarNote: '审计报告: Báo cáo kiểm toán; 内部审计: Kiểm toán nội bộ.',
            exampleSentence: {
              target: '外部审计师正在对我们年终账目进行严格审查。',
              pronunciation: 'Wàibù shěnjìshī zhèngzài duì wǒmen niánzhōng zhàngmù jìnxíng yángé shěnchá.',
              meaningVi: 'Kiểm toán viên độc lập đang tiến hành soát xét nghiêm ngặt sổ sách cuối năm của chúng ta.'
            }
          },
          {
            id: 'zh_acc_5',
            word: '利润',
            pronunciation: 'lìrùn',
            hanViet: 'LỢI NHUẬN',
            partOfSpeech: 'noun',
            meaningVi: 'Lợi nhuận',
            radicals: '利 (lợi ích) + 润 (nhuận, tươi tốt)',
            grammarNote: '净利润: Lợi nhuận ròng; 毛利润: Lợi nhuận gộp.',
            exampleSentence: {
              target: '今年第三季度，公司的净利润同比增长了百分之十五。',
              pronunciation: 'Jīnnián dì sān jìdù, gōngsī de jìnglìrùn tóngbǐ zēngzhǎng le bǎifēnzhī shíwǔ.',
              meaningVi: 'Trong quý 3 năm nay, lợi nhuận ròng của công ty đã tăng 15% so với cùng kỳ.'
            }
          },
          {
            id: 'zh_acc_6',
            word: '预算',
            pronunciation: 'yùsuàn',
            hanViet: 'DỰ TOÁN',
            partOfSpeech: 'noun/verb',
            meaningVi: 'Ngân sách, dự toán chi phí',
            radicals: '预 (dự liệu trước) + 算 (tính toán)',
            grammarNote: '超出预算: Vượt ngân sách; 控制预算: Kiểm soát ngân sách.',
            exampleSentence: {
              target: '我们需要合理编制明年的营销推广预算。',
              pronunciation: 'Wǒmen xūyào hélǐ biānzhì míngnián de yíngxiāo tuīguǎng yùsuàn.',
              meaningVi: 'Chúng ta cần lập ngân sách xúc tiến tiếp thị cho năm tới một cách hợp lý.'
            }
          }
        ]
      }
    ]
  },

  // 3. VĂN PHÒNG & HÀNH CHÍNH (zh_office)
  zh_office: {
    levelId: 'zh_office',
    code: 'VĂN PHÒNG',
    title: 'Tiếng Trung Văn Phòng & Hành Chính Dân Sự',
    lessons: [
      {
        id: 'zh_off_l1',
        title: 'Nghiệp Vụ Hành Chính, Công Văn & Tiếp Đón Khách',
        grammarFocus: 'Cấu trúc thông báo lịch trình: 请于...准时参加 (Xin vui lòng tham dự đúng giờ vào lúc...)',
        vocabularies: [
          {
            id: 'zh_off_1',
            word: '公文',
            pronunciation: 'gōngwén',
            hanViet: 'CÔNG VĂN',
            partOfSpeech: 'noun',
            meaningVi: 'Công văn, văn bản hành chính chính thức',
            radicals: '公 (công cộng, cơ quan) + 文 (văn bản)',
            grammarNote: 'Dùng trong các cơ quan nhà nước và doanh nghiệp.',
            exampleSentence: {
              target: '请行政助理将这份公文呈送总经理签字。',
              pronunciation: 'Qǐng xíngzhèng zhùlǐ jiāng zhè fèn gōngwén chéngsòng zǒngjīnglǐ qiānzì.',
              meaningVi: 'Xin trợ lý hành chính trình công văn này lên Tổng giám đốc ký tên.'
            }
          },
          {
            id: 'zh_off_2',
            word: '合同',
            pronunciation: 'hétong',
            hanViet: 'HỢP ĐỒNG',
            partOfSpeech: 'noun',
            meaningVi: 'Hợp đồng kinh tế, giao kèo pháp lý',
            radicals: '合 (hợp lại) + 同 (cùng nhau)',
            grammarNote: '签订合同: Ký kết hợp đồng; 合同草案: Dự thảo hợp đồng.',
            exampleSentence: {
              target: '双方代表正式签署了为期三年的战略合作合同。',
              pronunciation: 'Shuāngfāng dàibiǎo zhèngshì qiānshǔ le wéiqī sān nián de zhànlüè hézuò hétong.',
              meaningVi: 'Đại diện hai bên đã chính thức ký kết hợp đồng hợp tác chiến lược có thời hạn 3 năm.'
            }
          },
          {
            id: 'zh_off_3',
            word: '印章',
            pronunciation: 'yìnzhāng',
            hanViet: 'ẤN CHƯƠNG',
            partOfSpeech: 'noun',
            meaningVi: 'Con dấu cơ quan, mộc pháp nhân',
            radicals: '印 (in, đóng dấu) + 章 (con dấu, chương)',
            grammarNote: '盖章: Đóng dấu. Con dấu tròn pháp nhân là 公章.',
            exampleSentence: {
              target: '文件盖章生效后，请寄一份副本给客户。',
              pronunciation: 'Wénjiàn gàizhāng shēngxiào hòu, qǐng jì yí fèn fùběn gěi kèhù.',
              meaningVi: 'Sau khi văn bản đóng dấu có hiệu lực, vui lòng gửi một bản sao cho khách hàng.'
            }
          }
        ]
      }
    ]
  },

  // 4. QUẢN TRỊ NHÂN SỰ (zh_hr)
  zh_hr: {
    levelId: 'zh_hr',
    code: 'NHÂN SỰ',
    title: 'Tiếng Trung Quản Trị Nhân Sự & Tuyển Dụng',
    lessons: [
      {
        id: 'zh_hr_l1',
        title: 'Quy Trình Tuyển Dụng, Lọc CV & Phỏng Vấn Ứng Viên',
        grammarFocus: 'Hỏi đáp kinh nghiệm: 拥有...年的工作经验 (Có ... năm kinh nghiệm làm việc)',
        vocabularies: [
          {
            id: 'zh_hr_1',
            word: '招聘',
            pronunciation: 'zhāopìn',
            hanViet: 'CHIÊU SÍNH',
            partOfSpeech: 'verb/noun',
            meaningVi: 'Tuyển dụng nhân sự',
            radicals: '招 (chiêu mộ) + 聘 (sính, mời làm việc)',
            grammarNote: 'Đối ứng với 应聘 (yìngpìn - ứng tuyển). 招聘会: Ngày hội việc làm.',
            exampleSentence: {
              target: '人力资源部正在招聘五名前端开发工程师。',
              pronunciation: 'Rénlì zīyuán bù zhèngzài zhāopìn wǔ míng qiánduān kāifā gōngchéngshī.',
              meaningVi: 'Phòng Nhân sự đang tuyển dụng 5 kỹ sư phát triển Frontend.'
            }
          },
          {
            id: 'zh_hr_2',
            word: '简历',
            pronunciation: 'jiǎnlì',
            hanViet: 'GIẢN LỊCH',
            partOfSpeech: 'noun',
            meaningVi: 'Sơ yếu lý lịch, CV ứng tuyển',
            radicals: '简 (ngắn gọn) + 历 (kinh lịch, quá trình đã qua)',
            grammarNote: '投简历: Nộp CV; 筛选简历: Sàng lọc CV.',
            exampleSentence: {
              target: '这位候选人的简历很出色，拥有丰富的跨国管理经验。',
              pronunciation: 'Zhè wèi hòuxuǎnrén de jiǎnlì hěn chūsè, yōngyǒu fēngfù de kuàguó guǎnlǐ jīngyàn.',
              meaningVi: 'CV của ứng viên này rất xuất sắc, có kinh nghiệm quản lý đa quốc gia phong phú.'
            }
          },
          {
            id: 'zh_hr_3',
            word: '薪酬',
            pronunciation: 'xīnchóu',
            hanViet: 'TÂN THÙ',
            partOfSpeech: 'noun',
            meaningVi: 'Lương bổng và đãi ngộ (Compensation & Benefits)',
            radicals: '薪 (tiền lương) + 酬 (thù lao)',
            grammarNote: 'Thuật ngữ HR chuyên môn chỉ tổng thu nhập bao gồm lương và phúc lợi.',
            exampleSentence: {
              target: '我们为优秀人才提供极具市场竞争力的薪酬福利待遇。',
              pronunciation: 'Wǒmen wèi yòuxiù réncái tígōng jí jù shìchǎng jìngzhēnglì de xīnchóu fúlì dàiyù.',
              meaningVi: 'Chúng tôi cung cấp chế độ lương thưởng phúc lợi có tính cạnh tranh thị trường cao cho nhân tài xuất sắc.'
            }
          }
        ]
      }
    ]
  },

  // 5. XUẤT NHẬP KHẨU & LOGISTICS (zh_logistics)
  zh_logistics: {
    levelId: 'zh_logistics',
    code: 'LOGISTICS',
    title: 'Tiếng Trung Xuất Nhập Khẩu & Logistics',
    lessons: [
      {
        id: 'zh_log_l1',
        title: 'Vận Đơn, Incoterms & Thủ Tục Hải Quan',
        grammarFocus: 'Cấu trúc thông quan và giao hàng: 按照...条款交付货物 (Giao hàng theo điều khoản...)',
        vocabularies: [
          {
            id: 'zh_log_1',
            word: '提单',
            pronunciation: 'tídān',
            hanViet: 'ĐỀ ĐƠN',
            partOfSpeech: 'noun',
            meaningVi: 'Vận đơn đường biển (Bill of Lading - B/L)',
            radicals: '提 (rút lấy, nhận hàng) + 单 (tờ đơn)',
            grammarNote: 'Chứng từ quan trọng nhất trong vận tải biển để nhận hàng hóa.',
            exampleSentence: {
              target: '买方凭正本海运提单向港口船代提取货物。',
              pronunciation: 'Mǎifāng píng zhèngběn hǎiyùn tídān xiàng gǎngkǒu chuándài tíqǔ huòwù.',
              meaningVi: 'Bên mua dựa vào vận đơn đường biển gốc để đến đại lý tàu cảng lấy hàng.'
            }
          },
          {
            id: 'zh_log_2',
            word: '报关',
            pronunciation: 'bàoguān',
            hanViet: 'BÁO QUAN',
            partOfSpeech: 'verb',
            meaningVi: 'Khai báo hải quan, làm thủ tục hải quan',
            radicals: '报 (báo cáo) + 关 (hải quan)',
            grammarNote: '报关员: Nhân viên khai báo hải quan; 报关单: Tờ khai hải quan.',
            exampleSentence: {
              target: '进出口货物必须按规定在海关申报并缴纳关税。',
              pronunciation: 'Jìnchūkǒu huòwù bìxū àn guīdìng zài hǎiguān shēnbào bìng jiǎonà guānshuì.',
              meaningVi: 'Hàng hóa xuất nhập khẩu bắt buộc phải khai báo tại hải quan và nộp thuế theo quy định.'
            }
          },
          {
            id: 'zh_log_3',
            word: '仓储',
            pronunciation: 'cāngchǔ',
            hanViet: 'THƯƠNG TRỮ',
            partOfSpeech: 'noun',
            meaningVi: 'Lưu kho, kho bãi (Warehousing)',
            radicals: '仓 (kho thóc, nhà kho) + 储 (lưu trữ)',
            grammarNote: '仓储物流: Kho bãi và hậu cần; 保税仓: Kho ngoại quan.',
            exampleSentence: {
              target: '现代物流中心提供高效的自动化仓储与配送服务。',
              pronunciation: 'Xiàndài wùliú zhōngxīn tígōng gāoxiào de zìdònghuà cāngchǔ yǔ pèisòng fúwù.',
              meaningVi: 'Trung tâm logistics hiện đại cung cấp dịch vụ lưu kho tự động hóa và phân phối hiệu quả cao.'
            }
          }
        ]
      }
    ]
  },

  // 6. Y TẾ & CHĂM SÓC SỨC KHỎE (zh_medical)
  zh_medical: {
    levelId: 'zh_medical',
    code: 'Y TẾ',
    title: 'Tiếng Trung Y Tế & Chăm Sóc Sức Khỏe',
    lessons: [
      {
        id: 'zh_med_l1',
        title: 'Khám Bệnh Lâm Sàng, Triệu Chứng & Đơn Thuốc',
        grammarFocus: 'Hỏi triệu chứng: 您感觉哪里不舒服？ (Bạn cảm thấy không thoải mái ở đâu?)',
        vocabularies: [
          {
            id: 'zh_med_1',
            word: '确诊',
            pronunciation: 'quèzhěn',
            hanViet: 'XÁC CHẨN',
            partOfSpeech: 'verb',
            meaningVi: 'Chẩn đoán xác định, chẩn đoán chính xác',
            radicals: '确 (chính xác) + 诊 (chẩn đoán, bắt mạch)',
            grammarNote: 'Thuật ngữ y khoa chuyên môn trong bệnh viện.',
            exampleSentence: {
              target: '经过核磁共振检查，医生最终确诊了病因。',
              pronunciation: 'Jīngguò hécí gòngzhèn jiǎnchá, yīshēng zuìzhōng quèzhěn le bìngyīn.',
              meaningVi: 'Sau khi chụp cộng hưởng từ (MRI), bác sĩ cuối cùng đã chẩn đoán xác định nguyên nhân bệnh.'
            }
          },
          {
            id: 'zh_med_2',
            word: '处方',
            pronunciation: 'chǔfāng',
            hanViet: 'XỨ PHƯƠNG',
            partOfSpeech: 'noun',
            meaningVi: 'Đơn thuốc, toa thuốc',
            radicals: '处 (xử trí, bài trí) + 方 (phương thuốc)',
            grammarNote: '开处方: Kê đơn thuốc; 处方药: Thuốc kê đơn.',
            exampleSentence: {
              target: '请凭医生开具的处方到药房取药。',
              pronunciation: 'Qǐng píng yīshēng kāijù de chǔfāng dào yàofáng qǔ yào.',
              meaningVi: 'Vui lòng cầm toa thuốc bác sĩ kê đến nhà thuốc để lấy thuốc.'
            }
          },
          {
            id: 'zh_med_3',
            word: '症状',
            pronunciation: 'zhèngzhuàng',
            hanViet: 'CHỨNG TRẠNG',
            partOfSpeech: 'noun',
            meaningVi: 'Triệu chứng bệnh lý',
            radicals: '症 (chứng bệnh) + 状 (hình trạng, biểu hiện)',
            grammarNote: '临床症状: Triệu chứng lâm sàng; 症状缓解: Giảm nhẹ triệu chứng.',
            exampleSentence: {
              target: '如果发烧持续三天以上，必须警惕并去医院筛查。',
              pronunciation: 'Rúguǒ fāshāo chíxù sān tiān yǐshàng, bìxū jǐngtì bìng qù yīyuàn shāichá.',
              meaningVi: 'Nếu triệu chứng sốt kéo dài trên ba ngày, bắt buộc phải cảnh giác và đến bệnh viện tầm soát.'
            }
          }
        ]
      }
    ]
  },

  // 7. DU LỊCH & KHÁCH SẠN (zh_tourism)
  zh_tourism: {
    levelId: 'zh_tourism',
    code: 'DU LỊCH',
    title: 'Tiếng Trung Du Lịch & Khách Sạn',
    lessons: [
      {
        id: 'zh_tour_l1',
        title: 'Nghiệp Vụ Lễ Tân Khách Sạn & Tiếp Đón Đoàn Du Lịch',
        grammarFocus: 'Chào đón trang trọng: 欢迎光临，请问您有预订吗？ (Kính chào quý khách, xin hỏi quý khách đã đặt trước chưa?)',
        vocabularies: [
          {
            id: 'zh_tour_1',
            word: '预订',
            pronunciation: 'yùdìng',
            hanViet: 'DỰ ĐẶT',
            partOfSpeech: 'verb/noun',
            meaningVi: 'Đặt trước (phòng, bàn, vé máy bay)',
            radicals: '预 (trước) + 订 (đặt, thỏa thuận)',
            grammarNote: '预订房间: Đặt phòng; 预订确认单: Giấy xác nhận đặt chỗ.',
            exampleSentence: {
              target: '我已经在线预订了一间海景豪华大床房。',
              pronunciation: 'Wǒ yǐjīng zàixiàn yùdìng le yì jiān hǎijǐng háohuá dàchuángfáng.',
              meaningVi: 'Tôi đã đặt trực tuyến một phòng giường đôi cao cấp hướng biển.'
            }
          },
          {
            id: 'zh_tour_2',
            word: '入住',
            pronunciation: 'rùzhù',
            hanViet: 'NHẬP TRÚ',
            partOfSpeech: 'verb',
            meaningVi: 'Làm thủ tục nhận phòng (Check-in)',
            radicals: '入 (vào) + 住 (cư trú, ở)',
            grammarNote: '办理入住: Làm thủ tục nhận phòng; 退房: Trả phòng (Check-out).',
            exampleSentence: {
              target: '酒店下午两点开始办理入住手续，请出示您的护照。',
              pronunciation: 'Jiǔdiàn xiàwǔ liǎng diǎn kāishǐ bànlǐ rùzhù shǒuxù, qǐng chūshì nín de hùzhào.',
              meaningVi: 'Khách sạn bắt đầu làm thủ tục nhận phòng lúc 2 giờ chiều, vui lòng xuất trình hộ chiếu.'
            }
          },
          {
            id: 'zh_tour_3',
            word: '行程',
            pronunciation: 'xíngchéng',
            hanViet: 'HÀNH TRÌNH',
            partOfSpeech: 'noun',
            meaningVi: 'Lịch trình du lịch, tour itinerary',
            radicals: '行 (đi lại) + 程 (quá trình, chặng đường)',
            grammarNote: '安排行程: Sắp xếp lịch trình; 行程表: Bảng lịch trình chi tiết.',
            exampleSentence: {
              target: '导游向旅行团详细介绍了未来四天的北京观光行程。',
              pronunciation: 'Dǎoyóu xiàng lǚxíngtuán xiángxì jièshào le wèilái sì tiān de Běijīng guānguāng xíngchéng.',
              meaningVi: 'Hướng dẫn viên đã giới thiệu chi tiết cho đoàn về lịch trình tham quan Bắc Kinh trong 4 ngày tới.'
            }
          }
        ]
      }
    ]
  }
};

// =========================================================================
// TIẾNG ANH CHUYÊN NGÀNH: CHI TIẾT BÀI HỌC VÀ TỪ VỰNG CHUẨN XÁC
// =========================================================================
export const ESP_EN_DATA = {
  // 1. IT & AI (en_it)
  en_it: {
    levelId: 'en_it',
    code: 'IT & AI',
    title: 'Information Technology, Cloud & AI',
    lessons: [
      {
        id: 'en_it_l1',
        title: 'Core Concepts: Architecture, Codebase & API Integration',
        grammarFocus: 'Passive voice in system processes: "The request is processed by the server"',
        vocabularies: [
          {
            id: 'en_it_1',
            word: 'deployment',
            pronunciation: '/dɪˈplɔɪ.mənt/',
            partOfSpeech: 'noun',
            meaningVi: 'Sự triển khai ứng dụng, deploy',
            grammarNote: 'Collocation: continuous deployment (CD), cloud deployment.',
            exampleSentence: {
              target: 'The automated pipeline ensures zero-downtime deployment to production servers.',
              pronunciation: '/ðiː ˈɔː.tə.meɪ.tɪd ˈpaɪp.laɪn ɪnˈʃʊərz ˈzɪə.rəʊ ˈdaʊn.taɪm dɪˈplɔɪ.mənt tuː prəˈdʌk.ʃən ˈsɜː.vərz/',
              meaningVi: 'Đường ống tự động đảm bảo việc triển khai ứng dụng lên máy chủ production không có thời gian chết.'
            }
          },
          {
            id: 'en_it_2',
            word: 'vulnerability',
            pronunciation: '/ˌvʌl.nər.əˈbɪl.ə.ti/',
            partOfSpeech: 'noun',
            meaningVi: 'Lỗ hổng bảo mật',
            grammarNote: 'Common in cybersecurity: security vulnerability patch.',
            exampleSentence: {
              target: 'The security audit discovered a critical SQL injection vulnerability in the legacy API.',
              pronunciation: '/ðə sɪˈkjʊə.rə.ti ˈɔː.dɪt dɪˈskʌv.əd ə ˈkrɪt.ɪ.kəl ˈɛs.kjuː.ɛl ɪnˈdʒɛk.ʃən ˌvʌl.nər.əˈbɪl.ə.ti ɪn ðə ˈlɛɡ.ə.si eɪ.piːˈaɪ/',
              meaningVi: 'Đợt kiểm tra an ninh đã phát hiện một lỗ hổng chèn mã SQL nghiêm trọng trong API cũ.'
            }
          },
          {
            id: 'en_it_3',
            word: 'scalability',
            pronunciation: '/ˌskeɪ.ləˈbɪl.ə.ti/',
            partOfSpeech: 'noun',
            meaningVi: 'Khả năng mở rộng quy mô hệ thống',
            grammarNote: 'Horizontal scalability (scale out) vs vertical scalability (scale up).',
            exampleSentence: {
              target: 'Microservices architecture offers superior scalability for handling millions of concurrent users.',
              pronunciation: '/ˈmaɪ.krəʊˌsɜː.vɪs.ɪz ˈɑː.kɪ.tek.tʃər ˈɒf.ərz suːˈpɪə.ri.ər ˌskeɪ.ləˈbɪl.ə.ti fɔːr ˈhæn.dlɪŋ ˈmɪl.jənz ɒv kənˈkʌr.ənt ˈjuː.zərz/',
              meaningVi: 'Kiến trúc vi dịch vụ mang lại khả năng mở rộng vượt trội để xử lý hàng triệu người dùng đồng thời.'
            }
          }
        ]
      }
    ]
  },

  // 2. ACCOUNTING & FINANCE (en_accounting)
  en_accounting: {
    levelId: 'en_accounting',
    code: 'ACCOUNTING',
    title: 'Accounting & Corporate Finance',
    lessons: [
      {
        id: 'en_acc_l1',
        title: 'Financial Statements, Invoices & Tax Audits',
        grammarFocus: 'Conditional statements for financial projections: "If revenue exceeds budget, we will reinvest..."',
        vocabularies: [
          {
            id: 'en_acc_1',
            word: 'amortization',
            pronunciation: '/əˌmɔː.tɪˈzeɪ.ʃən/',
            partOfSpeech: 'noun',
            meaningVi: 'Khấu hao tài sản vô hình',
            grammarNote: 'Depreciation applies to tangible assets, amortization to intangibles.',
            exampleSentence: {
              target: 'The accounting team recorded the annual amortization of software patents and goodwill.',
              pronunciation: '/ðiː əˈkaʊn.tɪŋ tiːm rɪˈkɔː.dɪd ðiː ˈæn.ju.əl əˌmɔː.tɪˈzeɪ.ʃən ɒv ˈsɒft.weər ˈpeɪ.tənts ænd ˈɡʊd.wɪl/',
              meaningVi: 'Đội ngũ kế toán đã ghi nhận khoản khấu hao hàng năm của bằng sáng chế phần mềm và lợi thế thương mại.'
            }
          },
          {
            id: 'en_acc_2',
            word: 'liquidity',
            pronunciation: '/lɪˈkwɪd.ə.ti/',
            partOfSpeech: 'noun',
            meaningVi: 'Tính thanh khoản',
            grammarNote: 'High liquidity means assets can be converted to cash rapidly.',
            exampleSentence: {
              target: 'Maintaining sufficient liquidity is crucial for weathering unexpected economic downturns.',
              pronunciation: '/meɪnˈteɪ.nɪŋ səˈfɪʃ.ənt lɪˈkwɪd.ə.ti ɪz ˈkruː.ʃəl fɔːr ˈwɛð.ər.ɪŋ ˌʌn.ɪkˈspɛk.tɪd ˌiː.kəˈnɒm.ɪk ˈdaʊn.tɜːnz/',
              meaningVi: 'Duy trì đủ tính thanh khoản là tối quan trọng để vượt qua những đợt suy thoái kinh tế bất ngờ.'
            }
          },
          {
            id: 'en_acc_3',
            word: 'reconciliation',
            pronunciation: '/ˌrɛk.ənˌsɪl.iˈeɪ.ʃən/',
            partOfSpeech: 'noun',
            meaningVi: 'Đối chiếu số dư tài khoản',
            grammarNote: 'Bank reconciliation: Đối chiếu số dư tài khoản ngân hàng với sổ sách.',
            exampleSentence: {
              target: 'Monthly bank reconciliation helps detect accounting errors and prevent unauthorized transactions.',
              pronunciation: '/ˈmʌnθ.li bæŋk ˌrɛk.ənˌsɪl.iˈeɪ.ʃən hɛlps dɪˈtɛkt əˈkaʊn.tɪŋ ˈɛr.ərz ænd prɪˈvɛnt ʌnˈɔː.θər.aɪzd trænˈzæk.ʃənz/',
              meaningVi: 'Đối chiếu tài khoản ngân hàng hàng tháng giúp phát hiện sai sót kế toán và ngăn ngừa các giao dịch trái phép.'
            }
          }
        ]
      }
    ]
  },

  // 3. OFFICE ADMIN (en_office)
  en_office: {
    levelId: 'en_office',
    code: 'OFFICE',
    title: 'Office Administration & Civil Affairs',
    lessons: [
      {
        id: 'en_off_l1',
        title: 'Business Protocol, Documentation & Executive Correspondence',
        grammarFocus: 'Modal verbs in formal communication: "Could you kindly verify...", "You are cordially invited..."',
        vocabularies: [
          {
            id: 'en_off_1',
            word: 'minutes',
            pronunciation: '/ˈmɪn.ɪts/',
            partOfSpeech: 'noun (plural)',
            meaningVi: 'Biên bản cuộc họp',
            grammarNote: 'Keep / take the minutes: Ghi biên bản cuộc họp.',
            exampleSentence: {
              target: 'The executive assistant distributed the meeting minutes to all board members prior to Friday.',
              pronunciation: '/ðiː ɪɡˈzɛk.jə.tɪv əˈsɪs.tənt dɪˈstrɪb.juː.tɪd ðə ˈmiː.tɪŋ ˈmɪn.ɪts tuː ɔːl bɔːd ˈmɛm.bərz ˈpraɪ.ər tuː ˈfraɪ.deɪ/',
              meaningVi: 'Trợ lý ban điều hành đã phân phát biên bản cuộc họp cho tất cả các thành viên hội đồng quản trị trước thứ Sáu.'
            }
          },
          {
            id: 'en_off_2',
            word: 'memorandum',
            pronunciation: '/ˌmɛm.əˈræn.dəm/',
            partOfSpeech: 'noun',
            meaningVi: 'Thông cáo nội bộ, biên bản ghi nhớ (Memo)',
            grammarNote: 'Plural: memoranda or memorandums. Viết tắt là Memo.',
            exampleSentence: {
              target: 'Management issued an internal memorandum regarding the updated remote work guidelines.',
              pronunciation: '/ˈmæn.ɪdʒ.mənt ˈɪʃ.uːd ən ɪnˈtɜː.nəl ˌmɛm.əˈræn.dəm rɪˈɡɑː.dɪŋ ðiː ʌpˈdeɪ.tɪd rɪˈməʊt wɜːk ˈɡaɪd.laɪnz/',
              meaningVi: 'Ban giám đốc đã ban hành thông cáo nội bộ liên quan đến các hướng dẫn làm việc từ xa cập nhật.'
            }
          },
          {
            id: 'en_off_3',
            word: 'confidentiality',
            pronunciation: '/ˌkɒn.fɪˌdɛn.ʃiˈæl.ə.ti/',
            partOfSpeech: 'noun',
            meaningVi: 'Tính bảo mật, sự giữ kín thông tin',
            grammarNote: 'Non-Disclosure Agreement (NDA) ensures strict confidentiality.',
            exampleSentence: {
              target: 'All employees are legally bound to uphold the confidentiality of client proprietary data.',
              pronunciation: '/ɔːl ˌɛm.plɔɪˈiːz ɑːr ˈliː.ɡəl.i baʊnd tuː ʌpˈhəʊld ðə ˌkɒn.fɪˌdɛn.ʃiˈæl.ə.ti ɒv ˈklaɪ.ənt prəˈpraɪə.tər.i ˈdeɪ.tə/',
              meaningVi: 'Tất cả nhân viên đều có nghĩa vụ pháp lý phải bảo đảm tính bảo mật đối với dữ liệu độc quyền của khách hàng.'
            }
          }
        ]
      }
    ]
  },

  // 4. HUMAN RESOURCES (en_hr)
  en_hr: {
    levelId: 'en_hr',
    code: 'HR & RECRUIT',
    title: 'Human Resources & Talent Management',
    lessons: [
      {
        id: 'en_hr_l1',
        title: 'Talent Acquisition, Job Descriptions & Performance Appraisals',
        grammarFocus: 'Evaluative language: "Demonstrated strong leadership", "Consistently exceeded targets"',
        vocabularies: [
          {
            id: 'en_hr_1',
            word: 'onboarding',
            pronunciation: '/ˈɒnˌbɔː.dɪŋ/',
            partOfSpeech: 'noun',
            meaningVi: 'Quy trình hội nhập nhân viên mới',
            grammarNote: 'Structured orientation program for newcomers.',
            exampleSentence: {
              target: 'A comprehensive onboarding program significantly boosts new hire retention rates.',
              pronunciation: '/ə ˌkɒm.prɪˈhɛn.sɪv ˈɒnˌbɔː.dɪŋ ˈprəʊ.ɡræm sɪɡˈnɪf.ɪ.kənt.li buːsts njuː haɪər rɪˈtɛn.ʃən reɪts/',
              meaningVi: 'Một chương trình hội nhập toàn diện sẽ tăng đáng kể tỷ lệ gắn bó của nhân viên mới.'
            }
          },
          {
            id: 'en_hr_2',
            word: 'appraisal',
            pronunciation: '/əˈpreɪ.zəl/',
            partOfSpeech: 'noun',
            meaningVi: 'Đánh giá hiệu suất công việc (Performance appraisal)',
            grammarNote: 'Annual performance appraisal: Đánh giá hiệu suất thường niên.',
            exampleSentence: {
              target: 'The manager scheduled individual performance appraisal interviews for end-of-year reviews.',
              pronunciation: '/ðə ˈmæn.ɪ.dʒər ˈʃɛd.juːld ˌɪn.dɪˈvɪdʒ.u.əl pəˈfɔː.məns əˈpreɪ.zəl ˈɪn.tə.vjuːz fɔːr ɛnd ɒv jɪər rɪˈvjuːz/',
              meaningVi: 'Trưởng phòng đã lên lịch các buổi phỏng vấn đánh giá hiệu suất cá nhân cho đợt tổng kết cuối năm.'
            }
          },
          {
            id: 'en_hr_3',
            word: 'severance',
            pronunciation: '/ˈsɛv.ər.əns/',
            partOfSpeech: 'noun',
            meaningVi: 'Khoản trợ cấp thôi việc (Severance pay/package)',
            grammarNote: 'Compensation offered when employment is terminated without fault.',
            exampleSentence: {
              target: 'The restructured firm offered generous severance packages to all departing staff members.',
              pronunciation: '/ðə ˌriːˈstrʌk.tʃəd fɜːm ˈɒf.əd ˈdʒɛn.ər.əs ˈsɛv.ər.əns ˈpæk.ɪ.dʒɪz tuː ɔːl dɪˈpɑː.tɪŋ stɑːf ˈmɛm.bərz/',
              meaningVi: 'Công ty sau tái cấu trúc đã đề xuất các gói trợ cấp thôi việc hậu hĩnh cho tất cả nhân sự rời đi.'
            }
          }
        ]
      }
    ]
  },

  // 5. SUPPLY CHAIN & LOGISTICS (en_logistics)
  en_logistics: {
    levelId: 'en_logistics',
    code: 'LOGISTICS',
    title: 'International Logistics & Supply Chain',
    lessons: [
      {
        id: 'en_log_l1',
        title: 'Bills of Lading, Customs Clearance & Freight Forwarding',
        grammarFocus: 'Conditional shipment terms: "Goods shall be delivered CIF Shanghai Port..."',
        vocabularies: [
          {
            id: 'en_log_1',
            word: 'consignment',
            pronunciation: '/kənˈsaɪn.mənt/',
            partOfSpeech: 'noun',
            meaningVi: 'Lô hàng ký gửi, chuyến hàng vận chuyển',
            grammarNote: 'Consignor (người gửi) and Consignee (người nhận).',
            exampleSentence: {
              target: 'The containerized consignment arrived at Rotterdam port ahead of scheduled estimated time.',
              pronunciation: '/ðə kənˈteɪ.nər.aɪzd kənˈsaɪn.mənt əˈraɪvd æt ˈrɒt.ə.dæm pɔːt əˈhɛd ɒv ˈʃɛd.juːld ˈɛs.tɪ.meɪ.tɪd taɪm/',
              meaningVi: 'Lô hàng đóng container đã cập cảng Rotterdam trước thời gian dự kiến theo lịch trình.'
            }
          },
          {
            id: 'en_log_2',
            word: 'demurrage',
            pronunciation: '/dɪˈmʌr.ɪdʒ/',
            partOfSpeech: 'noun',
            meaningVi: 'Phí lưu container tại bãi cảng (tiền phạt lưu bãi)',
            grammarNote: 'Incurred when containers exceed free time allowance at terminal.',
            exampleSentence: {
              target: 'Prompt customs clearance is necessary to avoid exorbitant port demurrage charges.',
              pronunciation: '/prɒmpt ˈkʌs.təmz ˈklɪə.rəns ɪz ˈnɛs.ɪ.sər.i tuː əˈvɔɪd ɪɡˈzɔː.bɪ.tənt pɔːt dɪˈmʌr.ɪdʒ ˈtʃɑː.dʒɪz/',
              meaningVi: 'Thông quan nhanh chóng là điều cần thiết để tránh phí phạt lưu bãi cảng đắt đỏ.'
            }
          },
          {
            id: 'en_log_3',
            word: 'manifest',
            pronunciation: '/ˈmæn.ɪ.fɛst/',
            partOfSpeech: 'noun',
            meaningVi: 'Bản lược khai hàng hóa (Cargo manifest)',
            grammarNote: 'Document listing cargo, passengers, and crew of a ship or aircraft.',
            exampleSentence: {
              target: 'The shipping agent submitted the electronic cargo manifest to customs forty-eight hours prior to arrival.',
              pronunciation: '/ðə ˈʃɪp.ɪŋ ˈeɪ.dʒənt səbˈmɪt.ɪd ðiː ˌɛl.ɛkˈtrɒn.ɪk ˈkɑː.ɡəʊ ˈmæn.ɪ.fɛst tuː ˈkʌs.təmz ˈfɔː.ti eɪt ˈaʊərz ˈpraɪ.ər tuː əˈraɪ.vəl/',
              meaningVi: 'Đại lý vận tải đã nộp bản lược khai hàng hóa điện tử cho hải quan 48 giờ trước khi tàu cập bến.'
            }
          }
        ]
      }
    ]
  },

  // 6. HEALTHCARE & MEDICAL (en_medical)
  en_medical: {
    levelId: 'en_medical',
    code: 'MEDICAL',
    title: 'Healthcare & Clinical Practice',
    lessons: [
      {
        id: 'en_med_l1',
        title: 'Clinical Diagnostics, Patient Intake & Pharmacology',
        grammarFocus: 'Medical inquiry & advice: "Have you experienced any shortness of breath?"',
        vocabularies: [
          {
            id: 'en_med_1',
            word: 'prognosis',
            pronunciation: '/prɒɡˈnəʊ.sɪs/',
            partOfSpeech: 'noun',
            meaningVi: 'Tiên lượng bệnh (khả năng hồi phục)',
            grammarNote: 'Plural: prognoses. Compare with diagnosis (chẩn đoán bệnh).',
            exampleSentence: {
              target: 'Early surgical intervention dramatically improves the long-term prognosis for oncology patients.',
              pronunciation: '/ˈɜː.li ˈsɜː.dʒɪ.kəl ˌɪn.təˈvɛn.ʃən drəˈmæt.ɪ.kəl.i ɪmˈpruːvz ðə lɒŋ tɜːm prɒɡˈnəʊ.sɪs fɔːr ɒŋˈkɒl.ə.dʒi ˈpeɪ.ʃənts/',
              meaningVi: 'Can thiệp phẫu thuật sớm cải thiện rõ rệt tiên lượng lâu dài cho bệnh nhân ung bướu.'
            }
          },
          {
            id: 'en_med_2',
            word: 'contraindication',
            pronunciation: '/ˌkɒn.trəˌɪn.dɪˈkeɪ.ʃən/',
            partOfSpeech: 'noun',
            meaningVi: 'Chống chỉ định (trong y dược)',
            grammarNote: 'A specific situation in which a drug or procedure should not be used.',
            exampleSentence: {
              target: 'Severe hepatic impairment is an absolute contraindication for this antiviral medication.',
              pronunciation: '/sɪˈvɪər hɪˈpæt.ɪk ɪmˈpeə.mənt ɪz ən ˈæb.sə.luːt ˌkɒn.trəˌɪn.dɪˈkeɪ.ʃən fɔːr ðɪs ˌæn.tiˈvaɪə.rəl ˌmɛd.ɪˈkeɪ.ʃən/',
              meaningVi: 'Suy gan nặng là một chống chỉ định tuyệt đối đối với loại thuốc kháng virus này.'
            }
          },
          {
            id: 'en_med_3',
            word: 'triage',
            pronunciation: '/ˈtriː.ɑːʒ/',
            partOfSpeech: 'noun/verb',
            meaningVi: 'Phân loại bệnh nhân cấp cứu',
            grammarNote: 'System of prioritizing treatment based on severity of condition.',
            exampleSentence: {
              target: 'Emergency department triage nurses promptly assigned priority status to trauma victims.',
              pronunciation: '/ɪˈmɜː.dʒən.si dɪˈpɑːt.mənt ˈtriː.ɑːʒ nɜː.sɪz ˈprɒmpt.li əˈsaɪnd praɪˈɒr.ə.ti ˈsteɪ.təs tuː ˈtrɔː.mə ˈvɪk.tɪmz/',
              meaningVi: 'Các y tá phân loại cấp cứu đã nhanh chóng ấn định mức độ ưu tiên điều trị cho các nạn nhân chấn thương.'
            }
          }
        ]
      }
    ]
  },

  // 7. HOSPITALITY & TOURISM (en_tourism)
  en_tourism: {
    levelId: 'en_tourism',
    code: 'HOSPITALITY',
    title: 'Hospitality & International Tourism',
    lessons: [
      {
        id: 'en_tour_l1',
        title: 'Front Office Operations, Concierge & Guest Relations',
        grammarFocus: 'Polite requests: "Allow me to arrange your luxury airport transfer..."',
        vocabularies: [
          {
            id: 'en_tour_1',
            word: 'amenities',
            pronunciation: '/əˈmiː.nə.tiz/',
            partOfSpeech: 'noun (plural)',
            meaningVi: 'Tiện nghi khách sạn, dịch vụ kèm theo',
            grammarNote: 'In-room amenities include mini-bar, Wi-Fi, toiletries and bathrobes.',
            exampleSentence: {
              target: 'The resort features world-class wellness amenities including infinity pools and a therapeutic spa.',
              pronunciation: '/ðə rɪˈzɔːt ˈfiː.tʃərz wɜːld klɑːs ˈwɛl.nəs əˈmiː.nə.tiz ɪnˈkluː.dɪŋ ɪnˈfɪn.ə.ti puːlz ænd ə ˌθɛr.əˈpjuː.tɪk spɑː/',
              meaningVi: 'Khu nghỉ dưỡng sở hữu các tiện nghi chăm sóc sức khỏe đẳng cấp thế giới bao gồm hồ bơi vô cực và spa trị liệu.'
            }
          },
          {
            id: 'en_tour_2',
            word: 'concierge',
            pronunciation: '/ˌkɒn.siˈeəʒ/',
            partOfSpeech: 'noun',
            meaningVi: 'Bộ phận hỗ trợ đặc biệt cho khách (đặt vé, xe, tour, ăn uống)',
            grammarNote: 'French loanword widely used in luxury hotel service.',
            exampleSentence: {
              target: 'The head concierge secured exclusive opera tickets and private yacht charters for VIP guests.',
              pronunciation: '/ðə hɛd ˌkɒn.siˈeəʒ sɪˈkjʊəd ɪkˈskluː.sɪv ˈɒp.ər.ə ˈtɪk.ɪts ænd ˈpraɪ.vət jɒt ˈtʃɑː.tərz fɔːr viː.aɪˈpiː ɡɛsts/',
              meaningVi: 'Trưởng bộ phận concierge đã đặt thành công vé xem nhạc kịch độc quyền và thuê du thuyền riêng cho khách VIP.'
            }
          },
          {
            id: 'en_tour_3',
            word: 'itinerary',
            pronunciation: '/aɪˈtɪn.ər.ər.i/',
            partOfSpeech: 'noun',
            meaningVi: 'Lịch trình du lịch chi tiết',
            grammarNote: 'A detailed plan of a journey, including routes and places to visit.',
            exampleSentence: {
              target: 'The travel specialist customized a bespoke seven-day cultural itinerary across Vietnam.',
              pronunciation: '/ðə ˈtræv.əl ˈspɛʃ.əl.ɪst ˈkʌs.təm.aɪzd ə bɪˈspəʊk ˈsɛv.ən deɪ ˈkʌl.tʃər.əl aɪˈtɪn.ər.ər.i əˈkrɒs ˌvjɛtˈnæm/',
              meaningVi: 'Chuyên gia du lịch đã thiết kế riêng một lịch trình văn hóa 7 ngày may đo trải dọc khắp Việt Nam.'
            }
          }
        ]
      }
    ]
  }
};
