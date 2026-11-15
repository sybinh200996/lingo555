const fs = require('fs');
const path = require('path');

const enC1 = {
  levelId: 'en_c1',
  code: 'C1',
  title: 'C1 - Advanced / IELTS 7.5+: Executive Rhetoric, Financial Hedging & Legal Governance',
  lessons: [
    {
      id: 'en_c1_l1',
      title: 'Lesson 1: Investment Portfolio Diversification & Risk Hedging',
      grammarFocus: 'Complex Conditional Clauses with Omission of If (Had we hedged our exposure, Should inflation persist, Were rates to escalate).',
      vocabularies: [
        {
          id: 'en_c1_1_1',
          word: 'hedge',
          pronunciation: '/hɛdʒ/',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Phòng ngừa rủi ro tài chính bằng công cụ phái sinh (Risk Hedging)',
          radicals: 'Etymology: Old English hecg (enclosure / barrier fence)',
          grammarNote: 'Collocation: hedge against inflation, hedge fund.',
          exampleSentence: {
            target: 'Should currency volatility escalate further, treasury managers must hedge foreign currency liabilities using forward derivative contracts.',
            pronunciation: '/ʃʊd ˈkʌrənsi ˌvɒləˈtɪləti ˈɛskəleɪt ˈfɜːðə, ˈtrɛʒəri ˈmænɪdʒəz mʌst hɛdʒ ˈfɒrɪn ˈkʌrənsi ˌlaɪəˈbɪlɪtiz ˈjuːzɪŋ ˈfɔːwəd dɪˈrɪvətɪv ˈkɒntrækts/',
            meaningVi: 'Nếu biến động tỷ giá hối đoái tiếp tục leo thang, các nhà quản lý ngân quỹ bắt buộc phải phòng ngừa rủi ro nợ ngoại tệ bằng các hợp đồng phái sinh kỳ hạn.'
          }
        },
        {
          id: 'en_c1_1_2',
          word: 'liquidity',
          pronunciation: '/lɪˈkwɪdəti/',
          partOfSpeech: 'noun',
          meaningVi: 'Tính thanh khoản, khả năng chuyển đổi tức thì thành tiền mặt',
          radicals: 'Etymology: Latin liquidus (flowing / clear fluid)',
          grammarNote: 'Collocation: maintain adequate liquidity, liquidity crunch.',
          exampleSentence: {
            target: 'Were credit markets to freeze unexpectedly, maintaining substantial cash liquidity reserves would ensure enterprise survival.',
            pronunciation: '/wɜː ˈkrɛdɪt ˈmɑːkɪts tuː friːz ˌʌnɪkˈspɛktɪdli, meɪnˈteɪnɪŋ səbˈstænʃəl kæʃ lɪˈkwɪdəti rɪˈzɜːvz wʊd ɪnˈʃʊər ˈɛntəpraɪz səˈvaɪvəl/',
            meaningVi: 'Nếu các thị trường tín dụng bất ngờ đóng băng, việc duy trì các khoản dự trữ thanh khoản tiền mặt đáng kể sẽ bảo đảm sự sống còn của doanh nghiệp.'
          }
        },
        {
          id: 'en_c1_1_3',
          word: 'diversification',
          pronunciation: '/daɪˌvɜːsɪfɪˈkeɪʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự đa dạng hóa danh mục đầu tư không bỏ trứng vào một giỏ',
          radicals: 'Etymology: Latin diversus (various) + facere (to make)',
          grammarNote: 'Collocation: portfolio diversification, asset class diversification.',
          exampleSentence: {
            target: 'Had institutional investors practiced prudent cross-sector diversification, their drawdown during the commodity collapse would have been substantially mitigated.',
            pronunciation: '/hæd ˌɪnstɪˈtjuːʃənəl ɪnˈvɛstəz ˈpræktɪst ˈpruːdənt krɒs ˈsɛktə daɪˌvɜːsɪfɪˈkeɪʃən, ðeə ˈdrɔːdaʊn ˈdjʊərɪŋ ðə kəˈmɒdəti kəˈlæps wʊd hæv biːn səbˈstænʃəli ˈmɪtɪɡeɪtɪd/',
            meaningVi: 'Nếu các nhà đầu tư tổ chức thực hành việc đa dạng hóa liên ngành cẩn trọng, mức sụt giảm tài sản của họ trong đợt sụp đổ giá hàng hóa đã được giảm thiểu đáng kể.'
          }
        },
        {
          id: 'en_c1_1_4',
          word: 'arbitrage',
          pronunciation: '/ˈɑːbɪtrɑːʒ/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Nghiệp vụ kinh doanh chênh lệch giá giữa hai thị trường đồng thời',
          radicals: 'Etymology: French arbitrer (judge / settle / price-match)',
          grammarNote: 'Collocation: statistical arbitrage, regulatory arbitrage.',
          exampleSentence: {
            target: 'High-frequency algorithmic trading desks exploit microscopic cross-exchange price arbitrage opportunities lasting mere microseconds.',
            pronunciation: '/haɪ ˈfriːkwənsi ˌælɡəˈrɪðmɪk ˈtreɪdɪŋ dɛsks ɪkˈsplɔɪt ˌmaɪkrəˈskɒpɪk krɒs ɪksˈtʃeɪndʒ praɪs ˈɑːbɪtrɑːʒ ˌɒpəˈtjuːnɪtiz ˈlɑːstɪŋ mɪə ˈmaɪkrəʊˌsɛkəndz/',
            meaningVi: 'Các bộ phận giao dịch thuật toán tần suất cao khai thác các cơ hội kinh doanh chênh lệch giá liên sàn siêu nhỏ chỉ kéo dài trong vài vi giây.'
          }
        },
        {
          id: 'en_c1_1_5',
          word: 'derivative',
          pronunciation: '/dɪˈrɪvətɪv/',
          partOfSpeech: 'noun/adj',
          meaningVi: 'Công cụ tài chính phái sinh (Futures, Options, Swaps)',
          radicals: 'Etymology: Latin derivare (draw off / derive from stream)',
          grammarNote: 'Collocation: derivative contracts, over-the-counter derivatives.',
          exampleSentence: {
            target: 'Complex structured derivative products require sophisticated mathematical modeling to accurately price embedded tail risks.',
            pronunciation: '/ˈkɒmplɛks ˈstrʌktʃəd dɪˈrɪvətɪv ˈprɒdʌkts rɪˈkwaɪə səˈfɪstɪkeɪtɪd ˌmæθɪˈmætɪkəl ˈmɒdəlɪŋ tuː ˈækjʊrətli praɪs ɪmˈbɛdɪd teɪl rɪsks/',
            meaningVi: 'Các sản phẩm phái sinh có cấu trúc phức tạp đòi hỏi mô hình toán học tinh vi để định giá chuẩn xác các rủi ro đuôi ẩn sâu bên trong.'
          }
        },
        {
          id: 'en_c1_1_6',
          word: 'yield',
          pronunciation: '/jiːld/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Tỷ suất sinh lời, lợi suất trái phiếu (Bond yield)',
          radicals: 'Etymology: Old English gieldan (pay / give up / produce)',
          grammarNote: 'Collocation: inverted yield curve, high dividend yield.',
          exampleSentence: {
            target: 'An inverted treasury yield curve historically signals an impending macroeconomic recession within twelve to eighteen months.',
            pronunciation: '/æn ɪnˈvɜːtɪd ˈtrɛʒəri jiːld kɜːv hɪsˈtɒrɪkəli ˈsɪɡnəlz ən ɪmˈpɛndɪŋ ˌmækrəʊˌiːkəˈnɒmɪk rɪˈsɛʃən wɪðˈɪn twɛlv tuː ˌeɪˈtiːn mʌnθs/',
            meaningVi: 'Đường cong lợi suất trái phiếu kho bạc bị đảo ngược trong lịch sử luôn phát đi tín hiệu về một cuộc suy thoái kinh tế vĩ mô sắp xảy ra trong vòng 12 đến 18 tháng.'
          }
        },
        {
          id: 'en_c1_1_7',
          word: 'solvency',
          pronunciation: '/ˈsɒlvənsi/',
          partOfSpeech: 'noun',
          meaningVi: 'Khả năng thanh toán nợ dài hạn của tổ chức',
          radicals: 'Etymology: Latin solvere (loosen / pay debt)',
          grammarNote: 'Collocation: long-term solvency, solvency ratio.',
          exampleSentence: {
            target: 'Central bank stress tests thoroughly evaluate commercial bank solvency under severe simulated economic stagflation scenarios.',
            pronunciation: '/ˈsɛntrəl bæŋk strɛs tɛsts ˈθʌrəli ɪˈvæljʊeɪt kəˈmɜːʃəl bæŋk ˈsɒlvənsi ˈʌndə sɪˈvɪə ˈsɪmjʊleɪtɪd ˌiːkəˈnɒmɪk stæɡˈfleɪʃən sɪˈnɑːrɪəʊz/',
            meaningVi: 'Các bài kiểm tra sức chịu tải căng thẳng của ngân hàng trung ương đánh giá kỹ lưỡng khả năng thanh toán nợ dài hạn của các ngân hàng thương mại dưới các kịch bản lạm phát đình đốn kinh tế mô phỏng nghiêm trọng.'
          }
        },
        {
          id: 'en_c1_1_8',
          word: 'amortization',
          pronunciation: '/əˌmɔːtaɪˈzeɪʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Khấu hao tài sản vô hình / Phân bổ trả góp nợ gốc định kỳ',
          radicals: 'Etymology: Latin ad- (to) + mortuus (dead - paying off debt till dead)',
          grammarNote: 'Collocation: loan amortization schedule, depreciation and amortization (D&A).',
          exampleSentence: {
            target: 'The financial forecast reflects a disciplined five-year loan amortization schedule aimed at deleveraging the parent balance sheet.',
            pronunciation: '/ðə faɪˈnænʃəl ˈfɔːkɑːst rɪˈflɛkts ə ˈdɪsɪplɪnd faɪv jɪə ləʊn əˌmɔːtaɪˈzeɪʃən ˈʃɛdjuːl eɪmd æt diːˈlɛvərɪdʒɪŋ ðə ˈpeərənt ˈbæləns ʃiːt/',
            meaningVi: 'Bản dự báo tài chính phản ánh một lịch trình khấu hao phân bổ trả nợ vay 5 năm kỷ luật nhằm giảm tỷ lệ đòn bẩy trên bảng cân đối kế toán của công ty mẹ.'
          }
        }
      ]
    },
    {
      id: 'en_c1_l2',
      title: 'Lesson 2: Executive Talent Acquisition & Succession Planning',
      grammarFocus: 'Inverted Conditionals for High Diplomacy: Should you accept this mandate, Were the candidate to decline.',
      vocabularies: [
        {
          id: 'en_c1_2_1',
          word: 'succession',
          pronunciation: '/səkˈsɛʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Kế hoạch kế nhiệm nhân sự lãnh đạo cấp cao (Succession planning)',
          radicals: 'Etymology: Latin succedere (come after / follow in order)',
          grammarNote: 'Collocation: succession planning, smooth succession.',
          exampleSentence: {
            target: 'A well-structured leadership succession plan mitigates operational disruption in the event of an abrupt chief executive departure.',
            pronunciation: '/ə wɛl ˈstrʌktʃəd ˈliːdəʃɪp səkˈsɛʃən plæn ˈmɪtɪɡeɪts ˌɒpəˈreɪʃənəl dɪsˈrʌpʃən ɪn ði ɪˈvɛnt əv ən əˈbrʌpt tʃiːf ɪɡˈzɛkjʊtɪv dɪˈpɑːtʃə/',
            meaningVi: 'Một kế hoạch kế nhiệm lãnh đạo có cấu trúc bài bản giúp giảm thiểu sự gián đoạn vận hành trong trường hợp tổng giám đốc điều hành rời nhiệm sở đột ngột.'
          }
        },
        {
          id: 'en_c1_2_2',
          word: 'headhunter',
          pronunciation: '/ˈhɛdˌhʌntər/',
          partOfSpeech: 'noun',
          meaningVi: 'Chuyên gia săn đầu người nhân sự cấp cao',
          radicals: 'Head + Hunter',
          grammarNote: 'Collocation: engage an executive headhunter.',
          exampleSentence: {
            target: 'The nomination committee engaged an elite global executive headhunter to conduct a discreet international talent search.',
            pronunciation: '/ðə ˌnɒmɪˈneɪʃən kəˈmɪti ɪnˈɡeɪdʒd ən eɪˈliːt ˈɡləʊbəl ɪɡˈzɛkjʊtɪv ˈhɛdˌhʌntə tuː kənˈdʌkt ə dɪsˈkriːt ˌɪntəˈnæʃənəl ˈtælənt sɜːtʃ/',
            meaningVi: 'Ủy ban đề cử đã thuê một chuyên gia săn đầu người điều hành toàn cầu ưu tú để tiến hành tìm kiếm nhân tài quốc tế một cách kín đáo.'
          }
        },
        {
          id: 'en_c1_2_3',
          word: 'vetting',
          pronunciation: '/ˈvɛtɪŋ/',
          partOfSpeech: 'noun',
          meaningVi: 'Quá trình thẩm tra rà soát lý lịch chuyên sâu (Vetting process)',
          radicals: 'Etymology: veterinarian examining a racehorse for health',
          grammarNote: 'Collocation: rigorous vetting process, background vetting.',
          exampleSentence: {
            target: 'Prospective board nominees undergo rigorous background vetting, including forensic financial and reputational checks.',
            pronunciation: '/prəˈspɛktɪv bɔːd ˌnɒmɪˈniːz ˌʌndəˈɡəʊ ˈrɪɡərəs ˈbækɡraʊnd ˈvɛtɪŋ, ɪnˈkluːdɪŋ fəˈrɛnsɪk faɪˈnænʃəl ænd ˌrɛpjʊˈteɪʃənəl tʃɛks/',
            meaningVi: 'Các ứng viên hội đồng quản trị tiềm năng phải trải qua quá trình thẩm tra lý lịch nghiêm ngặt, bao gồm các đợt kiểm tra pháp y tài chính và danh tiếng.'
          }
        },
        {
          id: 'en_c1_2_4',
          word: 'foster',
          pronunciation: '/ˈfɒstər/',
          partOfSpeech: 'verb',
          meaningVi: 'Ươm mầm, nuôi dưỡng và thúc đẩy phát triển',
          radicals: 'Etymology: Old English fostrian (nourish / feed)',
          grammarNote: 'Collocation: foster high-potential talent, foster innovation.',
          exampleSentence: {
            target: 'Organizations must proactively foster internal high-potential talent through rigorous cross-functional executive mentorship.',
            pronunciation: '/ˌɔːɡənaɪˈzeɪʃənz mʌst prəʊˈæktɪvli ˈfɒstə ɪnˈtɜːnəl haɪ pəˈtɛnʃəl ˈtælənt θruː ˈrɪɡərəs krɒs ˈfʌŋkʃənəl ɪɡˈzɛkjʊtɪv ˈmɛntɔːʃɪp/',
            meaningVi: 'Các tổ chức phải chủ động ươm mầm nhân tài tiềm năng cao nội bộ thông qua việc cố vấn điều hành đa chức năng nghiêm ngặt.'
          }
        },
        {
          id: 'en_c1_2_5',
          word: 'poach',
          pronunciation: '/pəʊtʃ/',
          partOfSpeech: 'verb',
          meaningVi: 'Chèo kéo, câu trộm nhân sự tài năng từ công ty đối thủ',
          radicals: 'Etymology: Middle French pocher (thrust into a bag / poach game)',
          grammarNote: 'Collocation: poach key engineers from a competitor.',
          exampleSentence: {
            target: 'Aggressive tech unicorns routinely poach top machine learning researchers by offering lavish stock compensation packages.',
            pronunciation: '/əˈɡrɛsɪv tɛk ˈjuːnɪkɔːnz ruːˈtiːnli pəʊtʃ tɒp məˈʃiːn ˈlɜːnɪŋ rɪˈsɜːtʃəz baɪ ˈɒfərɪŋ ˈlævɪʃ stɒk ˌkɒmpɛnˈseɪʃən ˈpækɪdʒɪz/',
            meaningVi: 'Các kỳ lân công nghệ hung hãn thường xuyên câu trộm các nhà nghiên cứu học máy hàng đầu bằng cách đưa ra các gói thù lao cổ phiếu xa hoa.'
          }
        },
        {
          id: 'en_c1_2_6',
          word: 'attrition',
          pronunciation: '/əˈtrɪʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự hao mòn nhân sự tự nhiên do nghỉ việc / Nghỉ hưu',
          radicals: 'Etymology: Latin atterere (rub against / wear away)',
          grammarNote: 'Collocation: high attrition rate, reduce talent attrition.',
          exampleSentence: {
            target: 'A spike in voluntary employee attrition often signals underlying toxic management practices or stagnating compensation.',
            pronunciation: '/ə spaɪk ɪn ˈvɒləntəri ˌɛmplɔɪˈiː əˈtrɪʃən ˈɒfən ˈsɪɡnəlz ˌʌndəˈlaɪɪŋ ˈtɒksɪk ˈmænɪdʒmənt ˈpræktɪsɪz ɔː ˈstæɡneɪtɪŋ ˌkɒmpɛnˈseɪʃən/',
            meaningVi: 'Sự gia tăng đột biến trong việc nhân viên tự nguyện nghỉ việc thường phát đi tín hiệu về các thói quen quản lý độc hại tiềm ẩn hoặc mức đãi ngộ bị trì trệ.'
          }
        },
        {
          id: 'en_c1_2_7',
          word: 'pipeline',
          pronunciation: '/ˈpaɪplaɪn/',
          partOfSpeech: 'noun',
          meaningVi: 'Đường ống nguồn nhân lực kế thừa liên tục (Talent pipeline)',
          radicals: 'Pipe + Line',
          grammarNote: 'Collocation: robust talent pipeline, executive pipeline.',
          exampleSentence: {
            target: 'Building a diverse leadership talent pipeline ensures the enterprise remains resilient across multi-year strategic transformations.',
            pronunciation: '/ˈbɪldɪŋ ə daɪˈvɜːs ˈliːdəʃɪp ˈtælənt ˈpaɪplaɪn ɪnˈʃʊəz ði ˈɛntəpraɪz rɪˈmeɪnz rɪˈzɪliənt əˈkrɒs ˈmʌlti jɪə strəˈtiːdʒɪk ˌtrænsfəˈmeɪʃənz/',
            meaningVi: 'Xây dựng một đường ống nhân tài lãnh đạo đa dạng bảo đảm doanh nghiệp luôn dẻo dai trong các cuộc chuyển đổi chiến lược kéo dài nhiều năm.'
          }
        },
        {
          id: 'en_c1_2_8',
          word: 'onboarding',
          pronunciation: '/ˈɒnˌbɔːdɪŋ/',
          partOfSpeech: 'noun',
          meaningVi: 'Quy trình hội nhập văn hóa và đào tạo tân binh gia nhập',
          radicals: 'On + Board + -ing',
          grammarNote: 'Collocation: executive onboarding, seamless onboarding.',
          exampleSentence: {
            target: 'An intensive ninety-day executive onboarding program accelerates a newly appointed chief financial officer\'s strategic immersion.',
            pronunciation: '/æn ɪnˈtɛnsɪv ˈnaɪnti deɪ ɪɡˈzɛkjʊtɪv ˈɒnˌbɔːdɪŋ ˈprəʊɡræm əkˈsɛləreɪts ə ˈnjuːli əˈpɔɪntɪd tʃiːf faɪˈnænʃəl ˈɒfɪsəz strəˈtiːdʒɪk ɪˈmɜːʃən/',
            meaningVi: 'Một chương trình hội nhập điều hành 90 ngày chuyên sâu thúc đẩy quá trình hòa nhập chiến lược của giám đốc tài chính mới được bổ nhiệm.'
          }
        }
      ]
    },
    {
      id: 'en_c1_l3',
      title: 'Lesson 3: Grammatical Inversion for Persuasive Keynote Rhetoric',
      grammarFocus: 'Negative and Restrictive Inversion: Not only did we achieve..., Hardly had we launched when..., Seldom have we witnessed..., Little did they realize...',
      vocabularies: [
        {
          id: 'en_c1_3_1',
          word: 'seldom',
          pronunciation: '/ˈsɛldəm/',
          partOfSpeech: 'adverb',
          meaningVi: 'Hiếm khi (Đứng đầu câu đảo ngữ: Seldom have we seen...)',
          radicals: 'Etymology: Old English seldan (rarely / strangely)',
          grammarNote: 'Inversion: Seldom has a breakthrough generated such profound societal transformation.',
          exampleSentence: {
            target: 'Seldom has an emergent computational architecture provoked such intense philosophical and commercial fascination.',
            pronunciation: '/ˈsɛldəm hæz ən ɪˈmɜːdʒənt ˌkɒmpjʊˈteɪʃənəl ˈɑːkɪtɛktʃə prəˈvəʊkt sʌtʃ ɪnˈtɛns ˌfɪləˈsɒfɪkəl ænd kəˈmɜːʃəl ˌfæsɪˈneɪʃən/',
            meaningVi: 'Hiếm khi nào một kiến trúc điện toán mới xuất hiện lại khơi gợi sự say mê thương mại và triết học mãnh liệt đến như vậy.'
          }
        },
        {
          id: 'en_c1_3_2',
          word: 'scarcely',
          pronunciation: '/ˈskeəsli/',
          partOfSpeech: 'adverb',
          meaningVi: 'Vừa mới... thì đã (Scarcely had... when...)',
          radicals: 'Etymology: Anglo-Norman escars (sparing / scarce)',
          grammarNote: 'Inversion: Scarcely had the press release gone live when server traffic surged tenfold.',
          exampleSentence: {
            target: 'Scarcely had the keynote speaker unveiled the breakthrough quantum processor when global pre-orders overwhelmed our retail portal.',
            pronunciation: '/ˈskeəsli hæd ðə ˈkiːnəʊt ˈspiːkər ʌnˈveɪld ðə ˈbreɪkθruː ˈkwɒntəm ˈprəʊsɛsə wɛn ˈɡləʊbəl priː ˈɔːdəz ˌəʊvəˈwɛlmd ˈaʊə ˈriːteɪl ˈpɔːtəl/',
            meaningVi: 'Diễn giả chính vừa mới công bố bộ vi xử lý lượng tử đột phá thì các đơn đặt hàng trước toàn cầu đã làm sập cổng bán lẻ của chúng tôi.'
          }
        },
        {
          id: 'en_c1_3_3',
          word: 'not only',
          pronunciation: '/nɒt ˈəʊnli/',
          partOfSpeech: 'conjunction phrase',
          meaningVi: 'Không những... mà còn (Đảo ngữ: Not only did we...)',
          radicals: 'Not + Only',
          grammarNote: 'Inversion: Not only did the team beat the launch date, but they also cut unit costs by half.',
          exampleSentence: {
            target: 'Not only did our engineers surpass the aggressive throughput benchmark, but they also halved power consumption across all cluster nodes.',
            pronunciation: '/nɒt ˈəʊnli dɪd ˈaʊər ˌɛndʒɪˈnɪəz sɜːˈpɑːs ði əˈɡrɛsɪv ˈθruːpʊt ˈbɛntʃmɑːk, bʌt ðeɪ ˈɔːlsəʊ hɑːvd ˈpaʊə kənˈsʌmpʃən əˈkrɒs ɔːl ˈklʌstə nəʊdz/',
            meaningVi: 'Không những các kỹ sư của chúng tôi đã vượt qua mốc chuẩn lưu lượng xử lý cao ngất, mà họ còn giảm một nửa mức tiêu thụ năng lượng trên khắp các nút cụm.'
          }
        },
        {
          id: 'en_c1_3_4',
          word: 'little',
          pronunciation: '/ˈlɪtəl/',
          partOfSpeech: 'adverb',
          meaningVi: 'Hoàn toàn chẳng ngờ (Đảo ngữ: Little did they know/realize)',
          radicals: 'Etymology: Old English lytel',
          grammarNote: 'Inversion: Little did competitors anticipate our sudden market entry.',
          exampleSentence: {
            target: 'Little did traditional legacy incumbents realize that a zero-cost open-source model would rapidly render their enterprise licenses uncompetitive.',
            pronunciation: '/ˈlɪtəl dɪd trəˈdɪʃənəl ˈlɛɡəsi ɪnˈkʌmbənts ˈrɪəlaɪz ðæt ə ˈzɪərəʊ kɒst ˈəʊpən sɔːs ˈmɒdəl wʊd ˈræpɪdli ˈrɛndə ðeər ˈɛntəpraɪz ˈlaɪsənsɪz ʌnkəmˈpɛtɪtɪv/',
            meaningVi: 'Các doanh nghiệp đương nhiệm truyền thống hoàn toàn chẳng thể ngờ rằng một mô hình mã nguồn mở chi phí bằng 0 sẽ nhanh chóng khiến các giấy phép doanh nghiệp của họ mất khả năng cạnh tranh.'
          }
        },
        {
          id: 'en_c1_3_5',
          word: 'under no circumstances',
          pronunciation: '/ˈʌndə nəʊ ˈsɜːkəmstɑːnsɪz/',
          partOfSpeech: 'prepositional phrase',
          meaningVi: 'Trong bất kỳ hoàn cảnh nào cũng tuyệt đối không được',
          radicals: 'Under + No + Circumstances',
          grammarNote: 'Inversion: Under no circumstances will customer telemetry data be monetized.',
          exampleSentence: {
            target: 'Under no circumstances should privileged cryptographic keys be committed to unsecured public source code repositories.',
            pronunciation: '/ˈʌndə nəʊ ˈsɜːkəmstɑːnsɪz ʃʊd ˈprɪvɪlɪdʒd ˌkrɪptəˈɡræfɪk kiːz biː kəˈmɪtɪd tuː ˌʌnsɪˈkjʊəd ˈpʌblɪk sɔːs kəʊd rɪˈpɒzɪtəriz/',
            meaningVi: 'Trong bất kỳ hoàn cảnh nào, các khóa mật mã đặc quyền cũng tuyệt đối không được phép commit lên các kho mã nguồn công khai không an toàn.'
          }
        },
        {
          id: 'en_c1_3_6',
          word: 'hardly',
          pronunciation: '/ˈhɑːdli/',
          partOfSpeech: 'adverb',
          meaningVi: 'Vừa mới... thì... (Hardly had... when...)',
          radicals: 'Etymology: hard + -ly',
          grammarNote: 'Inversion: Hardly had the merger been ratified when cultural friction surfaced.',
          exampleSentence: {
            target: 'Hardly had the multinational merger received regulatory clearance when sharp strategic disagreements emerged between co-chief executives.',
            pronunciation: '/ˈhɑːdli hæd ðə ˌmʌltɪˈnæʃənəl ˈmɜːdʒə rɪˈsiːvd ˌrɛɡjʊˈleɪtəri ˈklɪərəns wɛn ʃɑːp strəˈtiːdʒɪk ˌdɪsəˈɡriːmənts ɪˈmɜːdʒd bɪˈtwiːn kəʊ tʃiːf ɪɡˈzɛkjʊtɪvz/',
            meaningVi: 'Thương vụ sáp nhập đa quốc gia vừa mới nhận được sự phê chuẩn của cơ quan quản lý thì những bất đồng chiến lược sâu sắc đã nảy sinh giữa hai đồng tổng giám đốc.'
          }
        },
        {
          id: 'en_c1_3_7',
          word: 'only after',
          pronunciation: '/ˈəʊnli ˈɑːftər/',
          partOfSpeech: 'conjunction phrase',
          meaningVi: 'Chỉ sau khi... mới... (Đảo ngữ ở vế chính)',
          radicals: 'Only + After',
          grammarNote: 'Inversion: Only after conducting forensic audits did the true scale of liabilities become apparent.',
          exampleSentence: {
            target: 'Only after restructuring sovereign bond maturities did the emerging market economy successfully stabilize its spiraling national currency.',
            pronunciation: '/ˈəʊnli ˈɑːftə ˌriːˈstrʌktʃərɪŋ ˈsɒvrɪn bɒnd məˈtjʊərɪtiz dɪd ði ɪˈmɜːdʒɪŋ ˈmɑːkɪt ɪˈkɒnəmi səkˈsɛsfʊli ˈsteɪbɪlaɪz ɪts ˈspaɪərəlɪŋ ˈnæʃənəl ˈkʌrənsi/',
            meaningVi: 'Chỉ sau khi tái cấu trúc kỳ hạn trái phiếu chính phủ, nền kinh tế thị trường mới nổi mới ổn định thành công đồng nội tệ đang trên đà lao dốc xoắn ốc.'
          }
        },
        {
          id: 'en_c1_3_8',
          word: 'nowhere',
          pronunciation: '/ˈnəʊweər/',
          partOfSpeech: 'adverb',
          meaningVi: 'Không có nơi nào mà... (Nowhere is this more evident than...)',
          radicals: 'No + Where',
          grammarNote: 'Inversion: Nowhere is the paradigm shift more visible than in automotive manufacturing.',
          exampleSentence: {
            target: 'Nowhere is the compounding velocity of computational innovation more apparent than in next-generation silicon photonics research.',
            pronunciation: '/ˈnəʊweər ɪz ðə kəmˈpaʊndɪŋ vɪˈlɒsəti əv ˌkɒmpjʊˈteɪʃənəl ˌɪnəˈveɪʃən mɔːr əˈpærənt ðæn ɪn nɛkst ˌdʒɛnəˈreɪʃən ˈsɪlɪkən fəʊˈtɒnɪks rɪˈsɜːtʃ/',
            meaningVi: 'Không có nơi nào mà tốc độ cấp số nhân của đổi mới điện toán lại rõ rệt hơn trong nghiên cứu quang điện tử silicon thế hệ tiếp theo.'
          }
        }
      ]
    },
    {
      id: 'en_c1_l4',
      title: 'Lesson 4: Cleft Sentences for Highlighting Strategic Priorities',
      grammarFocus: 'It-Clefts & Wh-Clefts: It is our proprietary algorithm that gives us the edge / What we urgently require is operational discipline.',
      vocabularies: [
        {
          id: 'en_c1_4_1',
          word: 'imperative',
          pronunciation: '/ɪmˈpɛrətɪv/',
          partOfSpeech: 'noun/adj',
          meaningVi: 'Mệnh lệnh sống còn, điều bắt buộc tối quan trọng',
          radicals: 'Etymology: Latin imperare (command / rule)',
          grammarNote: 'Collocation: strategic imperative, moral imperative.',
          exampleSentence: {
            target: 'What remains our overarching strategic imperative is achieving sustainable cash-flow neutrality before pursuing international expansion.',
            pronunciation: '/wɒt rɪˈmeɪnz ˈaʊər ˌəʊvərˈɑːtʃɪŋ strəˈtiːdʒɪk ɪmˈpɛrətɪv ɪz əˈtʃiːvɪŋ səˈsteɪnəbəl kæʃ fləʊ njuːˈtræləti bɪˈfɔː pəˈsjuːɪŋ ˌɪntəˈnæʃənəl ɪkˈspænʃən/',
            meaningVi: 'Điều vẫn là mệnh lệnh chiến lược bao trùm của chúng tôi là đạt được sự trung hòa dòng tiền bền vững trước khi theo đuổi việc mở rộng quốc tế.'
          }
        },
        {
          id: 'en_c1_4_2',
          word: 'catalyst',
          pronunciation: '/ˈkætəlɪst/',
          partOfSpeech: 'noun',
          meaningVi: 'Chất xúc tác kích hoạt sự bùng nổ chuyển đổi',
          radicals: 'Etymology: Greek katalyein (dissolve / break down)',
          grammarNote: 'Collocation: act as a catalyst, economic catalyst.',
          exampleSentence: {
            target: 'It was the sudden proliferation of mobile broadband that served as the primary catalyst for the global sharing economy.',
            pronunciation: '/ɪt wɒz ðə ˈsʌdən prəˌlɪfəˈreɪʃən əv ˈməʊbaɪl ˈbrɔːdbænd ðæt sɜːvd æz ðə ˈpraɪməri ˈkætəlɪst fɔː ðə ˈɡləʊbəl ˈʃeərɪŋ ɪˈkɒnəmi/',
            meaningVi: 'Chính sự bùng nổ đột ngột của băng thông rộng di động đã đóng vai trò là chất xúc tác hàng đầu cho nền kinh tế chia sẻ toàn cầu.'
          }
        },
        {
          id: 'en_c1_4_3',
          word: 'paramount',
          pronunciation: '/ˈpærəmaʊnt/',
          partOfSpeech: 'adj',
          meaningVi: 'Tối cao, quan trọng bậc nhất vượt lên trên tất cả',
          radicals: 'Etymology: Anglo-Norman par amont (at the top / above)',
          grammarNote: 'Collocation: of paramount importance.',
          exampleSentence: {
            target: 'What the board stressed above all else is that strict adherence to anti-corruption statutes is of paramount importance.',
            pronunciation: '/wɒt ðə bɔːd strɛst əˈbʌv ɔːl ɛls ɪz ðæt strɪkt ədˈhɪərəns tuː ˈænti kəˈrʌpʃən ˈstætʃuːts ɪz əv ˈpærəmaʊnt ɪmˈpɔːtəns/',
            meaningVi: 'Điều mà hội đồng quản trị nhấn mạnh hơn tất thảy mọi thứ là việc tuân thủ nghiêm ngặt các đạo luật chống tham nhũng có tầm quan trọng tối thượng.'
          }
        },
        {
          id: 'en_c1_4_4',
          word: 'cornerstone',
          pronunciation: '/ˈkɔːnəstəʊn/',
          partOfSpeech: 'noun',
          meaningVi: 'Viên đá tảng nền móng của một chiến lược',
          radicals: 'Corner + Stone (viên đá đặt góc móng công trình)',
          grammarNote: 'Collocation: cornerstone of our strategy.',
          exampleSentence: {
            target: 'It is uncompromising product quality that has formed the unshakeable cornerstone of this family enterprise for a century.',
            pronunciation: '/ɪt ɪz ʌnˈkɒmprəmaɪzɪŋ ˈprɒdʌkt ˈkwɒləti ðæt hæz fɔːmd ði ʌnˈʃeɪkəbəl ˈkɔːnəstəʊn əv ðɪs ˈfæmɪli ˈɛntəpraɪz fɔːr ə ˈsɛntʃʊri/',
            meaningVi: 'Chính chất lượng sản phẩm không thỏa hiệp đã tạo nên viên đá tảng không thể lay chuyển của doanh nghiệp gia đình này trong suốt một thế kỷ.'
          }
        },
        {
          id: 'en_c1_4_5',
          word: 'linchpin',
          pronunciation: '/ˈlɪntʃpɪn/',
          partOfSpeech: 'noun',
          meaningVi: 'Chốt hãm bánh xe, nhân tố then chốt giữ cả hệ thống vận hành',
          radicals: 'Etymology: Middle English lynspin (axle pin)',
          grammarNote: 'Collocation: linchpin of the organization.',
          exampleSentence: {
            target: 'What makes her the absolute linchpin of the engineering division is her rare capacity to translate abstract research into shipping code.',
            pronunciation: '/wɒt meɪks hɜːr ði ˈæbsəluːt ˈlɪntʃpɪn əv ði ˌɛndʒɪˈnɪərɪŋ dɪˈvɪʒən ɪz hɜː reə kəˈpæsəti tuː trænsˈleɪt ˈæbstrækt rɪˈsɜːtʃ ˈɪntuː ˈʃɪpɪŋ kəʊd/',
            meaningVi: 'Điều khiến cô ấy trở thành nhân tố chốt then chốt tuyệt đối của bộ phận kỹ thuật là năng lực hiếm có trong việc chuyển hóa nghiên cứu trừu tượng thành mã nguồn xuất xưởng.'
          }
        },
        {
          id: 'en_c1_4_6',
          word: 'bottleneck',
          pronunciation: '/ˈbɒtəlnɛk/',
          partOfSpeech: 'noun',
          meaningVi: 'Cổ chai thắt nút cản trở lưu thông',
          radicals: 'Bottle + Neck',
          grammarNote: 'Collocation: eliminate the production bottleneck.',
          exampleSentence: {
            target: 'It is the semiconductor packaging stage, rather than wafer fabrication, that constitutes the true supply chain bottleneck.',
            pronunciation: '/ɪt ɪz ðə ˌsɛmikənˈdʌktə ˈpækɪdʒɪŋ steɪdʒ, ˈrɑːðə ðæn ˈweɪfə ˌfæbrɪˈkeɪʃən, ðæt ˈkɒnstɪtjuːts ðə truː səˈplaɪ tʃeɪn ˈbɒtəlnɛk/',
            meaningVi: 'Chính giai đoạn đóng gói bán dẫn, chứ không phải chế tạo tấm wafer, mới cấu thành điểm nghẽn cổ chai chuỗi cung ứng thực sự.'
          }
        },
        {
          id: 'en_c1_4_7',
          word: 'synergy',
          pronunciation: '/ˈsɪnədʒi/',
          partOfSpeech: 'noun',
          meaningVi: 'Hiệu ứng cộng hưởng sức mạnh tổng hợp (1+1 > 2)',
          radicals: 'Etymology: Greek synergia (joint work / cooperation)',
          grammarNote: 'Collocation: unlock operational synergies.',
          exampleSentence: {
            target: 'What corporate acquirers consistently overestimate is the speed and ease with which cross-organizational cultural synergies can be realized.',
            pronunciation: '/wɒt ˈkɔːpərət əˈkwaɪərəz kənˈsɪstəntli ˌəʊvərˈɛstɪmeɪt ɪz ðə spiːd ænd iːz wɪð wɪtʃ krɒs ˌɔːɡənaɪˈzeɪʃənəl ˈkʌltʃərəl ˈsɪnədʒiz kæn biː ˈrɪəlaɪzd/',
            meaningVi: 'Điều mà các bên thâu tóm doanh nghiệp liên tục đánh giá quá cao là tốc độ và sự dễ dàng mà các hiệp lực văn hóa liên tổ chức có thể đạt được.'
          }
        },
        {
          id: 'en_c1_4_8',
          word: 'benchmark',
          pronunciation: '/ˈbɛntʃmɑːk/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Chuẩn mực tối thượng để đo lường',
          radicals: 'Bench + Mark',
          grammarNote: 'Collocation: establish the gold benchmark.',
          exampleSentence: {
            target: 'It is our fault-tolerant zero-latency architecture that has set the gold benchmark for mission-critical aerospace telecommunications.',
            pronunciation: '/ɪt ɪz ˈaʊə fɔːlt ˈtɒlərənt ˈzɪərəʊ ˈleɪtənsi ˈɑːkɪtɛktʃə ðæt hæz sɛt ðə ɡəʊld ˈbɛntʃmɑːk fɔː ˈmɪʃən ˈkrɪtɪkəl ˈeərəʊspeɪs ˌtɛlɪkəˌmjuːnɪˈkeɪʃənz/',
            meaningVi: 'Chính kiến trúc không độ trễ chịu lỗi của chúng tôi đã thiết lập chuẩn mực vàng cho viễn thông hàng không vũ trụ mang tính sống còn.'
          }
        }
      ]
    },
    {
      id: 'en_c1_l5',
      title: 'Lesson 5: The Formal Subjunctive Mood in Board Resolutions',
      grammarFocus: 'Mandative Subjunctive: It is imperative that the CEO step down (base form of verb), We recommend that an audit be conducted.',
      vocabularies: [
        {
          id: 'en_c1_5_1',
          word: 'mandate',
          pronunciation: '/ˈmændeɪt/',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Chỉ thị ban hành sắc lệnh bắt buộc (Subjunctive: mandate that X be done)',
          radicals: 'Etymology: Latin manus (hand) + dare (to give)',
          grammarNote: 'Subjunctive structure: The board mandates that an independent committee review the transaction.',
          exampleSentence: {
            target: 'Shareholder resolutions mandate that executive compensation be tied directly to multi-year decarbonization milestones.',
            pronunciation: '/ˈʃeəˌhəʊldə ˌrɛzəˈluːʃənz ˈmændeɪt ðæt ɪɡˈzɛkjʊtɪv ˌkɒmpɛnˈseɪʃən biː taɪd dɪˈrɛktli tuː ˈmʌlti jɪə diːˌkɑːbənaɪˈzeɪʃən ˈmaɪlstəʊnz/',
            meaningVi: 'Các nghị quyết của cổ đông chỉ thị bắt buộc rằng thù lao điều hành phải được gắn trực tiếp với các cột mốc phi carbon hóa nhiều năm.'
          }
        },
        {
          id: 'en_c1_5_2',
          word: 'stipulate',
          pronunciation: '/ˈstɪpjʊleɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Quy định thành điều khoản pháp lý (Subjunctive: stipulate that X have Y)',
          radicals: 'Etymology: Latin stipulari (bargain)',
          grammarNote: 'Subjunctive: The bylaws stipulate that each director attend at least eighty percent of meetings.',
          exampleSentence: {
            target: 'Corporate bylaws strictly stipulate that any major asset disposal receive two-thirds supermajority board approval.',
            pronunciation: '/ˈkɔːpərət ˈbaɪlɔːz ˈstrɪktli ˈstɪpjʊleɪt ðæt ˈɛni ˈmeɪdʒər ˈæsɛt dɪsˈpəʊzəl rɪˈsiːv tuː θɜːdz ˌsuːpəməˈdʒɒrəti bɔːd əˈpruːvəl/',
            meaningVi: 'Quy chế công ty quy định nghiêm ngặt rằng bất kỳ việc thanh lý tài sản lớn nào cũng phải nhận được sự phê chuẩn đa số áp đảo 2/3 của hội đồng quản trị.'
          }
        },
        {
          id: 'en_c1_5_3',
          word: 'decree',
          pronunciation: '/dɪˈkriː/',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Sắc lệnh chính thức, ban hành chiếu chỉ',
          radicals: 'Etymology: Latin decretum (thing decided / decree)',
          grammarNote: 'Collocation: presidential decree, statutory decree.',
          exampleSentence: {
            target: 'The regulatory agency issued a formal decree that all financial institutions enhance their real-time fraud monitoring algorithms.',
            pronunciation: '/ðə ˌrɛɡjʊˈleɪtəri ˈeɪdʒənsi ˈɪʃuːd ə ˈfɔːməl dɪˈkriː ðæt ɔːl faɪˈnænʃəl ˌɪnstɪˈtjuːʃənz ɪnˈhɑːns ðeə rɪəl taɪm frɔːd ˈmɒnɪtərɪŋ ˌælɡəˈrɪðmz/',
            meaningVi: 'Cơ quan quản lý đã ban hành một sắc lệnh chính thức yêu cầu tất cả các định chế tài chính nâng cao các thuật toán giám sát gian lận theo thời gian thực.'
          }
        },
        {
          id: 'en_c1_5_4',
          word: 'imperative',
          pronunciation: '/ɪmˈpɛrətɪv/',
          partOfSpeech: 'adj/noun',
          meaningVi: 'Cấp bách bắt buộc (It is imperative that X do Y)',
          radicals: 'Etymology: Latin imperativus (commanding)',
          grammarNote: 'Subjunctive: It is imperative that the lead investigator remain completely impartial.',
          exampleSentence: {
            target: 'It is imperative that the chief compliance officer report any suspected sanctions violations directly to the audit committee.',
            pronunciation: '/ɪt ɪz ɪmˈpɛrətɪv ðæt ðə tʃiːf kəmˈplaɪəns ˈɒfɪsə rɪˈpɔːt ˈɛni səsˈpɛktɪd ˈsæŋkʃənz ˌvaɪəˈleɪʃənz dɪˈrɛktli tuː ði ˈɔːdɪt kəˈmɪti/',
            meaningVi: 'Điều cấp bách bắt buộc là giám đốc tuân thủ phải báo cáo bất kỳ vi phạm lệnh trừng phạt đáng ngờ nào trực tiếp lên ủy ban kiểm toán.'
          }
        },
        {
          id: 'en_c1_5_5',
          word: 'resolve',
          pronunciation: '/rɪˈzɒlv/',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Nghị quyết hội đồng thống nhất (Be it resolved that...)',
          radicals: 'Etymology: Latin resolvere (loosen / untie / solve)',
          grammarNote: 'Formulaic resolution: Be it resolved that the dividend payout be suspended.',
          exampleSentence: {
            target: 'Be it resolved that the corporate treasury be authorized to issue up to two billion dollars in unsecured senior convertible notes.',
            pronunciation: '/biː ɪt rɪˈzɒlvd ðæt ðə ˈkɔːpərət ˈtrɛʒəri biː ˈɔːθəraɪzd tuː ˈɪʃuː ʌp tuː tuː ˈbɪljən ˈdɒləz ɪn ˌʌnsɪˈkjʊəd ˈsiːniə kənˈvɜːtəbəl nəʊts/',
            meaningVi: 'Nghị quyết thông qua rằng ngân quỹ công ty được ủy quyền phát hành tới 2 tỷ USD trái phiếu chuyển đổi cao cấp không có bảo đảm.'
          }
        },
        {
          id: 'en_c1_5_6',
          word: 'insist',
          pronunciation: '/ɪnˈsɪst/',
          partOfSpeech: 'verb',
          meaningVi: 'Khăng khăng đòi hỏi (Insist that X be done)',
          radicals: 'Etymology: Latin insistere (persist / stand upon)',
          grammarNote: 'Subjunctive: The lead investor insisted that a founder vesting schedule be instituted.',
          exampleSentence: {
            target: 'The lead underwriter insisted that the initial public offering prospectus fully disclose ongoing antitrust inquiries.',
            pronunciation: '/ðə liːd ˈʌndəˌraɪtər ɪnˈsɪstɪd ðæt ði ɪˈnɪʃəl ˈpʌblɪk ˈɒfərɪŋ prəˈspɛktəs ˈfʊli dɪsˈkləʊz ˈɒnˌɡəʊɪŋ ˌæntiˈtrʌst ɪnˈkwaɪəriz/',
            meaningVi: 'Nhà bảo lãnh phát hành chính khăng khăng yêu cầu bản cáo bạch phát hành cổ phiếu lần đầu ra công chúng (IPO) phải công bố đầy đủ các cuộc điều tra chống độc quyền đang diễn ra.'
          }
        },
        {
          id: 'en_c1_5_7',
          word: 'recommendation',
          pronunciation: '/ˌrɛkəmɛnˈdeɪʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Khuyến nghị chính thức của chuyên gia/hội đồng',
          radicals: 'Etymology: re- + commendation',
          grammarNote: 'Subjunctive: His recommendation was that the firm diversify its holdings.',
          exampleSentence: {
            target: 'The special advisory committee adopted the formal recommendation that the hostile takeover bid be rejected unanimously.',
            pronunciation: '/ðə ˈspɛʃəl ədˈvaɪzəri kəˈmɪti əˈdɒptɪd ðə ˈfɔːməl ˌrɛkəmɛnˈdeɪʃən ðæt ðə ˈhɒstaɪl ˈteɪkˌəʊvə bɪd biː rɪˈdʒɛktɪd juːˈnænɪməsli/',
            meaningVi: 'Ủy ban cố vấn đặc biệt đã thông qua khuyến nghị chính thức rằng lời chào mua thôn tính thù địch phải bị bác bỏ tuyệt đối.'
          }
        },
        {
          id: 'en_c1_5_8',
          word: 'binding',
          pronunciation: '/ˈbaɪndɪŋ/',
          partOfSpeech: 'adj',
          meaningVi: 'Có giá trị ràng buộc pháp lý bắt buộc thi hành',
          radicals: 'Etymology: bind + -ing',
          grammarNote: 'Collocation: legally binding agreement.',
          exampleSentence: {
            target: 'Once signed by all authorized signatories, the board resolution constitutes a legally binding corporate covenant.',
            pronunciation: '/wʌns saɪnd baɪ ɔːl ˈɔːθəraɪzd ˈsɪɡnətəriz, ðə bɔːd ˌrɛzəˈluːʃən ˈkɒnstɪtjuːts ə ˈliːɡəli ˈbaɪndɪŋ ˈkɔːpərət ˈkʌvənənt/',
            meaningVi: 'Một khi đã được ký bởi tất cả các bên ký kết được ủy quyền, nghị quyết hội đồng quản trị cấu thành một giao ước doanh nghiệp có tính ràng buộc pháp lý.'
          }
        }
      ]
    },
    {
      id: 'en_c1_l6',
      title: 'Lesson 6: Mergers & Acquisitions (M&A) Due Diligence',
      grammarFocus: 'Conditional Clauses in Legal Warranties: Except as disclosed in Exhibit A, the Seller warrants that...',
      vocabularies: [
        {
          id: 'en_c1_6_1',
          word: 'due diligence',
          pronunciation: '/djuː ˈdɪlɪdʒəns/',
          partOfSpeech: 'noun',
          meaningVi: 'Quá trình thẩm định năng lực và rủi ro toàn diện trước khi M&A',
          radicals: 'Due (đúng đắn thích đáng) + Diligence (sự cẩn trọng chu đáo)',
          grammarNote: 'Collocation: conduct exhaustive due diligence, financial due diligence.',
          exampleSentence: {
            target: 'The acquiring consortium conducted six months of exhaustive due diligence covering financial, legal, and intellectual property portfolios.',
            pronunciation: '/ði əˈkwaɪərɪŋ kənˈsɔːtiəm kənˈdʌktɪd sɪks mʌnθs əv ɪɡˈzɔːstɪv djuː ˈdɪlɪdʒəns ˈkʌvərɪŋ faɪˈnænʃəl, ˈliːɡəl, ænd ˌɪntɪˈlɛktʃuəl ˈprɒpəti pɔːtˈfəʊliəʊz/',
            meaningVi: 'Tập đoàn thâu tóm đã tiến hành 6 tháng thẩm định toàn diện kỹ lưỡng bao quát các danh mục tài chính, pháp lý và sở hữu trí tuệ.'
          }
        },
        {
          id: 'en_c1_6_2',
          word: 'indemnify',
          pronunciation: '/ɪnˈdɛmnɪfaɪ/',
          partOfSpeech: 'verb',
          meaningVi: 'Bồi hoàn và miễn trừ trách nhiệm tổn thất pháp lý (Indemnity)',
          radicals: 'Etymology: Latin indemnis (unhurt / free from loss)',
          grammarNote: 'Structure: indemnify and hold harmless.',
          exampleSentence: {
            target: 'The acquisition agreement stipulated that the sellers indemnify the buyer against any undisclosed tax liabilities.',
            pronunciation: '/ði ˌækwɪˈzɪʃən əˈɡriːmənt ˈstɪpjʊleɪtɪd ðæt ðə ˈsɛləz ɪnˈdɛmnɪfaɪ ðə ˈbaɪər əˈɡɛnst ˈɛni ˌʌndɪsˈkləʊzd tæks ˌlaɪəˈbɪlɪtiz/',
            meaningVi: 'Thỏa thuận mua lại quy định rằng những người bán phải bồi hoàn và bảo đảm cho người mua khỏi bất kỳ khoản nợ thuế nào chưa được công bố.'
          }
        },
        {
          id: 'en_c1_6_3',
          word: 'divestiture',
          pronunciation: '/daɪˈvɛstɪtʃər/',
          partOfSpeech: 'noun',
          meaningVi: 'Việc thoái vốn bán bớt mảng kinh doanh phụ (Divestment)',
          radicals: 'Etymology: Latin divestire (strip of possessions)',
          grammarNote: 'Collocation: forced divestiture, strategic divestiture.',
          exampleSentence: {
            target: 'To secure antitrust clearance, the conglomerate agreed to the divestiture of its regional telecommunications subsidiary.',
            pronunciation: '/tuː sɪˈkjʊər ˌæntiˈtrʌst ˈklɪərəns, ðə kənˈɡlɒmərət əˈɡriːd tuː ðə daɪˈvɛstɪtʃər əv ɪts ˈriːdʒənəl ˌtɛlɪkəˌmjuːnɪˈkeɪʃənz səbˈsɪdiəri/',
            meaningVi: 'Để đảm bảo được sự chấp thuận chống độc quyền, tập đoàn đã đồng ý thoái vốn bán đứt công ty con viễn thông khu vực của mình.'
          }
        },
        {
          id: 'en_c1_6_4',
          word: 'consortium',
          pronunciation: '/kənˈsɔːtiəm/',
          partOfSpeech: 'noun',
          meaningVi: 'Tập đoàn liên danh các nhà đầu tư cùng góp vốn thực hiện dự án lớn',
          radicals: 'Etymology: Latin consortium (fellowship / partnership)',
          grammarNote: 'Collocation: international banking consortium, bidding consortium.',
          exampleSentence: {
            target: 'A private equity consortium launched a forty-billion-dollar leveraged buyout bid to take the enterprise software titan private.',
            pronunciation: '/ə ˈpraɪvət ˈɛkwɪti kənˈsɔːtiəm lɔːntʃt ə ˈfɔːti ˈbɪljən ˈdɒlə ˈlɛvərɪdʒd ˈbaɪaʊt bɪd tuː teɪk ði ˈɛntəpraɪz ˈsɒftweə ˈtaɪtən ˈpraɪvət/',
            meaningVi: 'Một liên danh quỹ đầu tư tư nhân đã tung ra một lời chào mua bằng đòn bẩy trị giá 40 tỷ USD để tư nhân hóa gã khổng lồ phần mềm doanh nghiệp.'
          }
        },
        {
          id: 'en_c1_6_5',
          word: 'earnout',
          pronunciation: '/ˈɜːnaʊt/',
          partOfSpeech: 'noun',
          meaningVi: 'Khoản thanh toán bổ sung tùy thuộc vào hiệu suất tương lai sau M&A',
          radicals: 'Earn + Out',
          grammarNote: 'Collocation: earnout provision, three-year earnout milestone.',
          exampleSentence: {
            target: 'The founders negotiated an earnout clause guaranteeing an additional fifty million dollars upon hitting post-merger profitability targets.',
            pronunciation: '/ðə ˈfaʊndəz nɪˈɡəʊʃieɪtɪd ən ˈɜːnaʊt klɔːz ˌɡærənˈtiːɪŋ ən əˈdɪʃənəl ˈfɪfti ˈmɪljən ˈdɒləz əˈpɒn ˈhɪtɪŋ pəʊst ˈmɜːdʒə ˌprɒfɪtəˈbɪləti ˈtɑːɡɪts/',
            meaningVi: 'Các nhà sáng lập đã đàm phán được một điều khoản thanh toán bổ sung đảm bảo thêm 50 triệu USD nếu đạt được các mục tiêu lợi nhuận sau sáp nhập.'
          }
        },
        {
          id: 'en_c1_6_6',
          word: 'valuation',
          pronunciation: '/ˌvæljʊˈeɪʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Định giá trị doanh nghiệp',
          radicals: 'Etymology: value + -ation',
          grammarNote: 'Collocation: enterprise valuation, discounted cash flow valuation.',
          exampleSentence: {
            target: 'Independent investment bankers performed discounted cash flow modeling to justify the acquisition valuation multiple.',
            pronunciation: '/ˌɪndɪˈpɛndənt ɪnˈvɛstmənt ˈbæŋkəz pəˈfɔːmd dɪsˈkaʊntɪd kæʃ fləʊ ˈmɒdəlɪŋ tuː ˈdʒʌstɪfaɪ ði ˌækwɪˈzɪʃən ˌvæljʊˈeɪʃən ˈmʌltɪpəl/',
            meaningVi: 'Các chuyên gia ngân hàng đầu tư độc lập đã thực hiện mô hình hóa chiết khấu dòng tiền để chứng minh tính hợp lý của bội số định giá mua lại.'
          }
        },
        {
          id: 'en_c1_6_7',
          word: 'contingency',
          pronunciation: '/kənˈtɪndʒənsi/',
          partOfSpeech: 'noun',
          meaningVi: 'Biến cố dự phòng rủi ro phát sinh',
          radicals: 'Etymology: Latin contingere (befall / touch)',
          grammarNote: 'Collocation: contingency reserve fund, plan for every contingency.',
          exampleSentence: {
            target: 'Ten percent of the purchase consideration was deposited into an escrow account to cover unforeseen indemnification contingencies.',
            pronunciation: '/tɛn pəˈsɛnt əv ðə ˈpɜːtʃəs kənˌsɪdəˈreɪʃən wɒz dɪˈpɒzɪtɪd ˈɪntuː ən ˈɛskrəʊ əˈkaʊnt tuː ˈkʌvər ˌʌnfɔːˈsiːn ɪnˌdɛmnɪfɪˈkeɪʃən kənˈtɪndʒənsiz/',
            meaningVi: '10% giá trị thanh toán mua lại đã được gửi vào một tài khoản ký quỹ (escrow) để trang trải cho các rủi ro bồi hoàn phát sinh ngoài dự kiến.'
          }
        },
        {
          id: 'en_c1_6_8',
          word: 'antitrust',
          pronunciation: '/ˌæntiˈtrʌst/',
          partOfSpeech: 'adj/noun',
          meaningVi: 'Chống độc quyền bảo vệ cạnh tranh thị trường lành mạnh',
          radicals: 'Anti- + Trust (cácten độc quyền thời xưa)',
          grammarNote: 'Collocation: antitrust scrutiny, antitrust lawsuit.',
          exampleSentence: {
            target: 'The mega-merger faced intense regulatory scrutiny from antitrust authorities concerned with market monopolization.',
            pronunciation: '/ðə ˈmɛɡə ˈmɜːdʒə feɪst ɪnˈtɛns ˌrɛɡjʊˈleɪtəri ˈskruːtɪni frɒm ˌæntiˈtrʌst ɔːˈθɒrɪtiz kənˈsɜːnd wɪð ˈmɑːkɪt məˌnɒpəlaɪˈzeɪʃən/',
            meaningVi: 'Thương vụ đại sáp nhập đã phải đối mặt với sự soi xét kỹ lưỡng gay gắt từ các cơ quan chống độc quyền quan ngại về việc độc quyền hóa thị trường.'
          }
        }
      ]
    },
    {
      id: 'en_c1_l7',
      title: 'Lesson 7: Geopolitical Economics & Global Supply Chain De-risking',
      grammarFocus: 'Nominal Clauses with Wh-words: How supply chains decouple, Why tariffs escalate.',
      vocabularies: [
        {
          id: 'en_c1_7_1',
          word: 'decoupling',
          pronunciation: '/diːˈkʌplɪŋ/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự tách rời kinh tế công nghệ giữa các siêu cường',
          radicals: 'De- (tháo rời) + Coupling (ghép đôi gắn kết)',
          grammarNote: 'Collocation: economic decoupling, technological decoupling.',
          exampleSentence: {
            target: 'Accelerating geopolitical friction has triggered widespread supply chain decoupling across critical semiconductor and mineral sectors.',
            pronunciation: '/əkˈsɛləreɪtɪŋ ˌdʒiːəʊpəˈlɪtɪkəl ˈfrɪkʃən hæz ˈtrɪɡəd ˈwaɪdsprɛd səˈplaɪ tʃeɪn diːˈkʌplɪŋ əˈkrɒs ˈkrɪtɪkəl ˌsɛmikənˈdʌktər ænd ˈmɪnərəl ˈsɛktəz/',
            meaningVi: 'Ma sát địa chính trị gia tăng nhanh chóng đã kích hoạt sự tách rời chuỗi cung ứng trên diện rộng trong các lĩnh vực khoáng sản và bán dẫn then chốt.'
          }
        },
        {
          id: 'en_c1_7_2',
          word: 'nearshoring',
          pronunciation: '/ˈnɪəʃɔːrɪŋ/',
          partOfSpeech: 'noun',
          meaningVi: 'Chuyển dịch nhà máy về các quốc gia lân cận gần thị trường tiêu thụ',
          radicals: 'Near + Shoring (bờ biển lãnh thổ)',
          grammarNote: 'Collocation: nearshoring strategy, friendshoring.',
          exampleSentence: {
            target: 'North American corporations are pursuing aggressive nearshoring to Mexico to shorten transit lead times and reduce freight tariffs.',
            pronunciation: '/nɔːθ əˈmɛrɪkən ˌkɔːpəˈreɪʃənz ɑː pəˈsjuːɪŋ əˈɡrɛsɪv ˈnɪəʃɔːrɪŋ tuː ˈmɛksɪkəʊ tuː ˈʃɔːtən ˈtrænsɪt liːd taɪmz ænd rɪˈdjuːs freɪt ˈtærɪfs/',
            meaningVi: 'Các tập đoàn Bắc Mỹ đang theo đuổi chiến lược chuyển dịch nhà máy sang Mexico để rút ngắn thời gian giao hàng và giảm thuế vận tải.'
          }
        },
        {
          id: 'en_c1_7_3',
          word: 'sanctions',
          pronunciation: '/ˈsæŋkʃənz/',
          partOfSpeech: 'noun plural',
          meaningVi: 'Các lệnh trừng phạt cấm vận kinh tế',
          radicals: 'Etymology: Latin sancire (decree / confirm holy law)',
          grammarNote: 'Collocation: impose economic sanctions, sanctions compliance.',
          exampleSentence: {
            target: 'Financial institutions violating unilateral trade sanctions risk losing direct access to the global US dollar clearing system.',
            pronunciation: '/faɪˈnænʃəl ˌɪnstɪˈtjuːʃənz ˈvaɪəleɪtɪŋ ˌjuːnɪˈlætərəl treɪd ˈsæŋkʃənz rɪsk ˈluːzɪŋ dɪˈrɛkt ˈæksɛs tuː ðə ˈɡləʊbəl juː ɛs ˈdɒlə ˈklɪərɪŋ ˈsɪstəm/',
            meaningVi: 'Các định chế tài chính vi phạm các lệnh trừng phạt thương mại đơn phương có nguy cơ mất quyền tiếp cận trực tiếp với hệ thống thanh toán bù trừ USD toàn cầu.'
          }
        },
        {
          id: 'en_c1_7_4',
          word: 'chokepoint',
          pronunciation: '/ˈtʃəʊkˌpɔɪnt/',
          partOfSpeech: 'noun',
          meaningVi: 'Điểm nghẽn yết hầu hàng hải/kinh tế chiến lược',
          radicals: 'Choke (bóp nghẹt) + Point',
          grammarNote: 'Collocation: maritime chokepoints (Malacca, Suez, Hormuz).',
          exampleSentence: {
            target: 'Securing alternative logistics passages around strategic maritime chokepoints is an essential component of national energy security.',
            pronunciation: '/sɪˈkjʊərɪŋ ɔːlˈtɜːnətɪv ləˈdʒɪstɪks ˈpæsɪdʒɪz əˈraʊnd strəˈtiːdʒɪk ˈmærɪtaɪm ˈtʃəʊkˌpɔɪnts ɪz ən ɪˈsɛnʃəl kəmˈpəʊnənt əv ˈnæʃənəl ˈɛnədʒi sɪˈkjʊərəti/',
            meaningVi: 'Đảm bảo các tuyến đường logistics thay thế quanh các điểm yết hầu hàng hải chiến lược là một thành phần thiết yếu của an ninh năng lượng quốc gia.'
          }
        },
        {
          id: 'en_c1_7_5',
          word: 'resilience',
          pronunciation: '/rɪˈzɪliəns/',
          partOfSpeech: 'noun',
          meaningVi: 'Khả năng phục hồi dẻo dai trước biến cố cú sốc',
          radicals: 'Etymology: Latin resilire (spring back / rebound)',
          grammarNote: 'Collocation: supply chain resilience, operational resilience.',
          exampleSentence: {
            target: 'Multisourcing components across friendly democratic trading blocs bolsters manufacturing resilience against geopolitical shocks.',
            pronunciation: '/ˌmʌltiˈsɔːsɪŋ kəmˈpəʊnənts əˈkrɒs ˈfrɛndli ˌdɛməˈkrætɪk ˈtreɪdɪŋ blɒks ˈbəʊlstəz ˌmænjʊˈfæktʃərɪŋ rɪˈzɪliəns əˈɡɛnst ˌdʒiːəʊpəˈlɪtɪkəl ʃɒks/',
            meaningVi: 'Đa dạng hóa nguồn cung ứng linh kiện qua các khối thương mại dân chủ thân thiện tăng cường khả năng phục hồi dẻo dai của sản xuất trước các cú sốc địa chính trị.'
          }
        },
        {
          id: 'en_c1_7_6',
          word: 'protectionism',
          pronunciation: '/prəˈtɛkʃənɪzəm/',
          partOfSpeech: 'noun',
          meaningVi: 'Chủ nghĩa bảo hộ mậu dịch nội địa bằng thuế quan',
          radicals: 'Protection + -ism',
          grammarNote: 'Collocation: rising protectionism, tariff protectionism.',
          exampleSentence: {
            target: 'A resurgence of economic protectionism threatens to fragment open multilateral trading architectures established over decades.',
            pronunciation: '/ə rɪˈsɜːdʒəns əv ˌiːkəˈnɒmɪk prəˈtɛkʃənɪzəm ˈθrɛtənz tuː ˈfræɡmənt ˈəʊpən ˌmʌltɪˈlætərəl ˈtreɪdɪŋ ˈɑːkɪtɛktʃəz ɪsˈtæblɪʃt ˈəʊvə ˈdɛkeɪdz/',
            meaningVi: 'Sự trỗi dậy của chủ nghĩa bảo hộ kinh tế đe dọa làm phân mảnh các kiến trúc thương mại đa phương mở được thiết lập qua nhiều thập kỷ.'
          }
        },
        {
          id: 'en_c1_7_7',
          word: 'sovereignty',
          pronunciation: '/ˈsɒvrɪnti/',
          partOfSpeech: 'noun',
          meaningVi: 'Chủ quyền quốc gia độc lập',
          radicals: 'Etymology: Old French souverainete (supreme power)',
          grammarNote: 'Collocation: national sovereignty, digital sovereignty.',
          exampleSentence: {
            target: 'European governments are asserting digital data sovereignty by requiring local storage and processing of citizen telemetry.',
            pronunciation: '/ˌjʊərəˈpiːən ˈɡʌvnmənts ɑːr əˈsɜːtɪŋ ˈdɪdʒɪtəl ˈdeɪtə ˈsɒvrɪnti baɪ rɪˈkwaɪərɪŋ ˈləʊkəl ˈstɔːrɪdʒ ænd ˈprəʊsɛsɪŋ əv ˈsɪtɪzən tɪˈlɛmɪtri/',
            meaningVi: 'Các chính phủ châu Âu đang khẳng định chủ quyền dữ liệu kỹ thuật số bằng cách yêu cầu lưu trữ và xử lý cục bộ dữ liệu đo xa của công dân.'
          }
        },
        {
          id: 'en_c1_7_8',
          word: 'hegemony',
          pronunciation: '/hɪˈdʒɛməni/',
          partOfSpeech: 'noun',
          meaningVi: 'Sức mạnh bá quyền lãnh đạo chi phối toàn cầu',
          radicals: 'Etymology: Greek hegemonia (leadership / ruling power)',
          grammarNote: 'Collocation: challenge technological hegemony.',
          exampleSentence: {
            target: 'Fierce competition over advanced microchip fabrication centers on control over future technological and military hegemony.',
            pronunciation: '/fɪəs ˌkɒmpɪˈtɪʃən ˈəʊvər ədˈvɑːnst ˈmaɪkrəʊtʃɪp ˌfæbrɪˈkeɪʃən ˈsɛntəz ɒn kənˈtrəʊl ˈəʊvə ˈfjuːtʃə ˌtɛknəˈlɒdʒɪkəl ænd ˈmɪlɪtəri hɪˈdʒɛməni/',
            meaningVi: 'Cuộc cạnh tranh khốc liệt trong việc chế tạo vi chip tiên tiến xoay quanh quyền kiểm soát đối với bá quyền quân sự và công nghệ trong tương lai.'
          }
        }
      ]
    },
    {
      id: 'en_c1_l8',
      title: 'Lesson 8: Behavioral Economics, Nudge Theory & Consumer Heuristics',
      grammarFocus: 'Participle Clauses for Cause and Effect: Having observed irrational purchasing habits, economists formulated nudge theory.',
      vocabularies: [
        {
          id: 'en_c1_8_1',
          word: 'heuristic',
          pronunciation: '/hjʊəˈrɪstɪk/',
          partOfSpeech: 'noun/adj',
          meaningVi: 'Đường tắt tư duy giải quyết vấn đề nhanh (Mental shortcut)',
          radicals: 'Etymology: Greek heuriskein (to find / discover - like Eureka)',
          grammarNote: 'Collocation: cognitive heuristics, availability heuristic.',
          exampleSentence: {
            target: 'Consumers rely heavily on mental heuristics like brand familiarity when navigating overwhelming supermarket selections.',
            pronunciation: '/kənˈsjuːməz rɪˈlaɪ ˈhɛvɪli ɒn ˈmɛntəl hjʊəˈrɪstɪks laɪk brænd fəˌmɪlɪˈærɪti wɛn ˈnævɪɡeɪtɪŋ ˌəʊvəˈwɛlmɪŋ ˈsuːpəmɑːkɪt sɪˈlɛkʃənz/',
            meaningVi: 'Người tiêu dùng dựa dẫm nhiều vào các đường tắt tư duy như sự quen thuộc thương hiệu khi lựa chọn giữa vô số hàng hóa siêu thị ngợp mắt.'
          }
        },
        {
          id: 'en_c1_8_2',
          word: 'nudge',
          pronunciation: '/nʌdʒ/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Cú hích hành vi tâm lý thúc đẩy quyết định đúng (Nudge theory)',
          radicals: 'Etymology: Scandinavian origin (push gently with elbow)',
          grammarNote: 'Collocation: behavioral nudge, default nudge.',
          exampleSentence: {
            target: 'Automatically enrolling new employees in retirement pension plans serves as a subtle yet immensely potent behavioral nudge.',
            pronunciation: '/ˌɔːtəˈmætɪkəli ɪnˈrəʊlɪŋ njuː ˌɛmplɔɪˈiːz ɪn rɪˈtaɪəmənt ˈpɛnʃən plænz sɜːvz æz ə ˈsʌtəl jɛt ɪˈmɛnsli ˈpəʊtənt bɪˈheɪvjərəl nʌdʒ/',
            meaningVi: 'Việc tự động ghi danh nhân viên mới vào các quỹ hưu trí đóng vai trò là một cú hích hành vi tinh tế nhưng vô cùng mạnh mẽ.'
          }
        },
        {
          id: 'en_c1_8_3',
          word: 'loss aversion',
          pronunciation: '/lɒs əˈvɜːʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Tâm lý sợ thua lỗ đau đớn hơn niềm vui được thưởng (Loss aversion)',
          radicals: 'Loss + Aversion (né tránh)',
          grammarNote: 'Core behavioral economics concept by Kahneman and Tversky.',
          exampleSentence: {
            target: 'Loss aversion dictates that the psychological pain of losing one hundred dollars is twice as intense as the joy of gaining it.',
            pronunciation: '/lɒs əˈvɜːʃən dɪkˈteɪts ðæt ðə ˌsaɪkəˈlɒdʒɪkəl peɪn əv ˈluːzɪŋ wʌn ˈhʌndrəd ˈdɒləz ɪz twaɪs æz ɪnˈtɛns æz ðə dʒɔɪ əv ˈɡeɪnɪŋ ɪt/',
            meaningVi: 'Tâm lý sợ mất mát chỉ ra rằng nỗi đau tâm lý khi mất 100 USD dữ dội gấp đôi so với niềm vui khi kiếm được số tiền đó.'
          }
        },
        {
          id: 'en_c1_8_4',
          word: 'cognitive bias',
          pronunciation: '/ˈkɒɡnɪtɪv ˈbaɪəs/',
          partOfSpeech: 'noun',
          meaningVi: 'Thiên kiến nhận thức bẩm sinh làm lệch lạc quyết định logic',
          radicals: 'Cognitive + Bias (độ nghiêng lệch)',
          grammarNote: 'Collocation: confirmation bias, overcome cognitive biases.',
          exampleSentence: {
            target: 'Confirmation bias leads retail investors to seek out articles that corroborate their preconceived market views while ignoring warning signs.',
            pronunciation: '/ˌkɒnfəˈmeɪʃən ˈbaɪəs liːdz ˈriːteɪl ɪnˈvɛstəz tuː siːk aʊt ˈɑːtɪkəlz ðæt kəˈrɒbəreɪt ðeə ˌpriːkənˈsiːvd ˈmɑːkɪt vjuːz waɪl ɪɡˈnɔːrɪŋ ˈwɔːnɪŋ saɪnz/',
            meaningVi: 'Thiên kiến xác nhận khiến các nhà đầu tư cá nhân tìm kiếm những bài viết chứng thực cho các quan điểm định kiến của họ trong khi phớt lờ các dấu hiệu cảnh báo.'
          }
        },
        {
          id: 'en_c1_8_5',
          word: 'anchoring',
          pronunciation: '/ˈæŋkərɪŋ/',
          partOfSpeech: 'noun',
          meaningVi: 'Hiệu ứng mỏ neo giá (Tâm lý bị bám vào con số đầu tiên nhìn thấy)',
          radicals: 'Etymology: anchor (mỏ neo tàu bám chặt đáy biển)',
          grammarNote: 'Collocation: price anchoring effect.',
          exampleSentence: {
            target: 'Luxury retailers employ price anchoring by placing exorbitant ten-thousand-dollar watches next to two-thousand-dollar items to make them appear reasonable.',
            pronunciation: '/ˈlʌkʃəri ˈriːteɪləz ɪmˈplɔɪ praɪs ˈæŋkərɪŋ baɪ ˈpleɪsɪŋ ɪɡˈzɔːbɪtənt tɛn ˈθaʊzənd ˈdɒlə ˈwɒtʃɪz nɛkst tuː tuː ˈθaʊzənd ˈdɒlər ˈaɪtəmz tuː meɪk ðɛm əˈpɪə ˈriːzənəbəl/',
            meaningVi: 'Các nhà bán lẻ xa xỉ áp dụng hiệu ứng mỏ neo giá bằng cách đặt những chiếc đồng hồ 10.000 USD đắt đỏ cạnh những món 2.000 USD để làm chúng có vẻ hợp lý.'
          }
        },
        {
          id: 'en_c1_8_6',
          word: 'irrational',
          pronunciation: '/ɪˈræʃənəl/',
          partOfSpeech: 'adj',
          meaningVi: 'Phi lý trí, không tuân theo logic thuần túy',
          radicals: 'Etymology: Latin ir- (not) + rationalis (reasonable)',
          grammarNote: 'Collocation: irrational exuberance (Alan Greenspan quote).',
          exampleSentence: {
            target: 'Speculative market bubbles are powered by irrational exuberance and the psychological fear of missing out.',
            pronunciation: '/ˈspɛkjʊlətɪv ˈmɑːkɪt ˈbʌbəlz ɑː ˈpaʊəd baɪ ɪˈræʃənəl ɪɡˈzjuːbərəns ænd ðə ˌsaɪkəˈlɒdʒɪkəl fɪər əv ˈmɪsɪŋ aʊt/',
            meaningVi: 'Bong bóng thị trường đầu cơ được thúc đẩy bởi sự hưng phấn phi lý trí và nỗi sợ tâm lý bị bỏ lỡ cơ hội (FOMO).'
          }
        },
        {
          id: 'en_c1_8_7',
          word: 'scarcity',
          pronunciation: '/ˈskeəsəti/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự khan hiếm tạo ra giá trị tâm lý cao (Scarcity mindset)',
          radicals: 'Etymology: scarce + -ity',
          grammarNote: 'Collocation: artificial scarcity, scarcity principle.',
          exampleSentence: {
            target: 'E-commerce platforms leverage perceived scarcity countdown timers to trigger urgent impulse purchases.',
            pronunciation: '/ˈiː ˌkɒmɜːs ˈplætfɔːmz ˈliːvərɪdʒ pəˈsiːvd ˈskeəsəti ˈkaʊntdaʊn ˈtaɪməz tuː ˈtrɪɡər ˈɜːdʒənt ˈɪmpʌls ˈpɜːtʃəsɪz/',
            meaningVi: 'Các nền tảng thương mại điện tử tận dụng đồng hồ đếm ngược khan hiếm ảo để kích hoạt các quyết định mua sắm bốc đồng khẩn cấp.'
          }
        },
        {
          id: 'en_c1_8_8',
          word: 'hyperbolic discounting',
          pronunciation: '/ˌhaɪpəˈbɒlɪk dɪsˈkaʊntɪŋ/',
          partOfSpeech: 'noun phrase',
          meaningVi: 'Chiết khấu hyperbolic (Thích hưởng thụ ngay trước mắt hơn phần thưởng lớn tương lai)',
          radicals: 'Hyperbolic + Discounting',
          grammarNote: 'Explains human difficulty in saving for retirement or sticking to diets.',
          exampleSentence: {
            target: 'Hyperbolic discounting explains why individuals consistently choose immediate gratification over long-term financial security.',
            pronunciation: '/ˌhaɪpəˈbɒlɪk dɪsˈkaʊntɪŋ ɪkˈspleɪnz waɪ ˌɪndɪˈvɪdʒuəlz kənˈsɪstəntli tʃuːz ɪˈmiːdiət ˌɡrætɪfɪˈkeɪʃən ˈəʊvə lɒŋ tɜːm faɪˈnænʃəl sɪˈkjʊərəti/',
            meaningVi: 'Hiện tượng chiết khấu hyperbolic giải thích tại sao các cá nhân liên tục lựa chọn sự thỏa mãn tức thì trước mắt hơn là sự an toàn tài chính dài hạn.'
          }
        }
      ]
    },
    {
      id: 'en_c1_l9',
      title: 'Lesson 9: Intellectual Property, Patent Litigation & Licensing',
      grammarFocus: 'Passive Constructions in Legal Patent Claims: It is claimed that the apparatus comprises, Wherein the substrate is coated with.',
      vocabularies: [
        {
          id: 'en_c1_9_1',
          word: 'infringement',
          pronunciation: '/ɪnˈfrɪndʒmənt/',
          partOfSpeech: 'noun',
          meaningVi: 'Hành vi xâm phạm quyền sở hữu trí tuệ/bằng sáng chế (Patent infringement)',
          radicals: 'Etymology: Latin infringere (break in pieces / violate)',
          grammarNote: 'Collocation: willful patent infringement, copyright infringement.',
          exampleSentence: {
            target: 'The federal court awarded punitive treble damages after finding the defendant guilty of willful patent infringement.',
            pronunciation: '/ðə ˈfɛdərəl kɔːt əˈwɔːdɪd ˈpjuːnɪtɪv ˈtrɛbəl ˈdæmɪdʒɪz ˈɑːftə ˈfaɪndɪŋ ðə dɪˈfɛndənt ˈɡɪlti əv ˈwɪlfʊl ˈpeɪtənt ɪnˈfrɪndʒmənt/',
            meaningVi: 'Tòa án liên bang đã phán quyết khoản tiền bồi thường thiệt hại trừng phạt gấp ba sau khi tuyên bố bị đơn phạm tội cố ý xâm phạm bằng sáng chế.'
          }
        },
        {
          id: 'en_c1_9_2',
          word: 'royalty',
          pronunciation: '/ˈrɔɪəlti/',
          partOfSpeech: 'noun',
          meaningVi: 'Tiền bản quyền sở hữu trí tuệ trả theo định kỳ (Royalty fee)',
          radicals: 'Etymology: royal privilege granted by monarch',
          grammarNote: 'Collocation: collect licensing royalties, royalty rate.',
          exampleSentence: {
            target: 'The biotechnology inventor earns a recurring three percent royalty on gross worldwide pharmaceutical sales.',
            pronunciation: '/ðə ˌbaɪəʊtɛkˈnɒlədʒi ɪnˈvɛntər ɜːnz ə rɪˈkɜːrɪŋ θriː pəˈsɛnt ˈrɔɪəlti ɒn ɡrəʊs ˌwɜːldˈwaɪd ˌfɑːməˈsjuːtɪkəl seɪlz/',
            meaningVi: 'Nhà phát minh công nghệ sinh học kiếm được 3% tiền bản quyền định kỳ trên tổng doanh số bán dược phẩm trên toàn thế giới.'
          }
        },
        {
          id: 'en_c1_9_3',
          word: 'injunction',
          pronunciation: '/ɪnˈdʒʌŋkʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Lệnh cấm của tòa án buộc đình chỉ ngay hành vi xâm phạm (Injunction)',
          radicals: 'Etymology: Latin iniungere (join / impose a burden upon)',
          grammarNote: 'Collocation: preliminary injunction, permanent injunction.',
          exampleSentence: {
            target: 'The presiding judge granted a preliminary injunction prohibiting the rival manufacturer from distributing the disputed smartphone models.',
            pronunciation: '/ðə prɪˈzaɪdɪŋ dʒʌdʒ ˈɡrɑːntɪd ə prɪˈlɪmɪnəri ɪnˈdʒʌŋkʃən prəˈhɪbɪtɪŋ ðə ˈraɪvəl ˌmænjʊˈfæktʃərə frɒm dɪsˈtrɪbjuːtɪŋ ðə dɪsˈpjuːtɪd ˈsmɑːtfəʊn ˈmɒdəlz/',
            meaningVi: 'Thẩm phán chủ tọa đã ban hành lệnh cấm sơ bộ nghiêm cấm nhà sản xuất đối thủ phân phối các mẫu điện thoại thông minh đang có tranh chấp.'
          }
        },
        {
          id: 'en_c1_9_4',
          word: 'proprietary',
          pronunciation: '/prəˈpraɪətəri/',
          partOfSpeech: 'adj/noun',
          meaningVi: 'Độc quyền bí mật thuộc sở hữu riêng của doanh nghiệp',
          radicals: 'Etymology: Latin proprietas (property / ownership)',
          grammarNote: 'Collocation: proprietary algorithm, proprietary trade secrets.',
          exampleSentence: {
            target: 'The enterprise protects its proprietary beverage formulation behind strict physical security vaults as a closely guarded trade secret.',
            pronunciation: '/ði ˈɛntəpraɪz prəˈtɛkts ɪts prəˈpraɪətəri ˈbɛvərɪdʒ ˌfɔːmjʊˈleɪʃən bɪˈhaɪnd strɪkt ˈfɪzɪkəl sɪˈkjʊərəti vɔːlts æz ə ˈkləʊsli ˈɡɑːdɪd treɪd ˈsiːkrɪt/',
            meaningVi: 'Doanh nghiệp bảo vệ công thức đồ uống độc quyền của mình phía sau các hầm an ninh vật lý nghiêm ngặt như một bí mật thương mại được canh giữ cẩn mật.'
          }
        },
        {
          id: 'en_c1_9_5',
          word: 'prior art',
          pronunciation: '/ˈpraɪər ɑːt/',
          partOfSpeech: 'noun phrase',
          meaningVi: 'Tài liệu sáng chế có từ trước chứng minh bằng sáng chế mới không có tính mới lạ',
          radicals: 'Prior (trước) + Art (kỹ thuật công nghệ)',
          grammarNote: 'Patent invalidation defense: invalidate a patent based on prior art.',
          exampleSentence: {
            target: 'Defense attorneys invalidated the plaintiff\'s patent by discovering conclusive prior art published in a Japanese scientific journal a decade earlier.',
            pronunciation: '/dɪˈfɛns əˈtɜːniz ɪnˈvælɪdeɪtɪd ðə ˈpleɪntɪfs ˈpeɪtənt baɪ dɪsˈkʌvərɪŋ kənˈkluːsɪv ˈpraɪər ɑːt ˈpʌblɪʃt ɪn ə ˌdʒæpəˈniːz ˌsaɪənˈtɪfɪk ˈdʒɜːnəl ə ˈdɛkeɪd ˈɜːliə/',
            meaningVi: 'Các luật sư bào chữa đã vô hiệu hóa bằng sáng chế của nguyên đơn bằng việc phát hiện ra tài liệu sáng chế trước đây có tính kết luận được công bố trên một tạp chí khoa học Nhật Bản 10 năm trước đó.'
          }
        },
        {
          id: 'en_c1_9_6',
          word: 'trademark',
          pronunciation: '/ˈtreɪdmɑːk/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Nhãn hiệu thương mại được pháp luật bảo hộ (® or ™)',
          radicals: 'Trade + Mark',
          grammarNote: 'Collocation: registered trademark, trademark dilution.',
          exampleSentence: {
            target: 'Registering international trademarks across all targeted foreign jurisdictions safeguards brand equity from counterfeiters.',
            pronunciation: '/ˈrɛdʒɪstərɪŋ ˌɪntəˈnæʃənəl ˈtreɪdmɑːks əˈkrɒs ɔːl ˈtɑːɡɪtɪd ˈfɒrɪn ˌdʒʊərɪsˈdɪkʃənz ˈseɪfɡɑːdz brænd ˈɛkwɪti frɒm ˈkaʊntəfɪtəz/',
            meaningVi: 'Việc đăng ký nhãn hiệu quốc tế trên khắp tất cả các khu vực tài phán nước ngoài mục tiêu bảo vệ giá trị thương hiệu khỏi những kẻ làm hàng giả.'
          }
        },
        {
          id: 'en_c1_9_7',
          word: 'monopoly',
          pronunciation: '/məˈnɒpəli/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự độc quyền khai thác kinh tế',
          radicals: 'Etymology: Greek monos (alone) + polein (to sell)',
          grammarNote: 'Collocation: statutory twenty-year patent monopoly.',
          exampleSentence: {
            target: 'A patent grants the inventor a temporary legal monopoly over commercial exploitation in exchange for public technical disclosure.',
            pronunciation: '/ə ˈpeɪtənt ɡrɑːnts ði ɪnˈvɛntər ə ˈtɛmpərəri ˈliːɡəl məˈnɒpəli ˈəʊvə kəˈmɜːʃəl ˌɛksplɔɪˈteɪʃən ɪn ɪksˈtʃeɪndʒ fɔː ˈpʌblɪk ˈtɛknɪkəl dɪsˈkləʊʒə/',
            meaningVi: 'Bằng sáng chế cấp cho nhà phát minh quyền độc quyền pháp lý tạm thời đối với việc khai thác thương mại để đổi lấy việc công khai kỹ thuật trước công chúng.'
          }
        },
        {
          id: 'en_c1_9_8',
          word: 'licensing',
          pronunciation: '/ˈlaɪsənsɪŋ/',
          partOfSpeech: 'noun',
          meaningVi: 'Cấp phép quyền sử dụng sở hữu trí tuệ',
          radicals: 'Etymology: Latin licentia (freedom / permission)',
          grammarNote: 'Collocation: cross-licensing agreement, exclusive licensing.',
          exampleSentence: {
            target: 'Semiconductor manufacturers entered into a comprehensive cross-licensing accord to prevent destructive multi-jurisdictional patent wars.',
            pronunciation: '/ˌsɛmikənˈdʌktə ˌmænjʊˈfæktʃərəz ˈɛntəd ˈɪntuː ə ˌkɒmprɪˈhɛnsɪv krɒs ˈlaɪsənsɪŋ əˈkɔːd tuː prɪˈvɛnt dɪˈstrʌktɪv ˈmʌlti ˌdʒʊərɪsˈdɪkʃənəl ˈpeɪtənt wɔːz/',
            meaningVi: 'Các nhà sản xuất bán dẫn đã tham gia vào một thỏa thuận cấp phép chéo toàn diện để ngăn chặn các cuộc chiến bằng sáng chế tàn phá tại nhiều khu vực tài phán.'
          }
        }
      ]
    },
    {
      id: 'en_c1_l10',
      title: 'Lesson 10: Fiduciary Duty & Corporate Governance Frameworks',
      grammarFocus: 'Adverbial Participle Clauses Expressing Condition & Duty: Acting in good faith, the board discharged its fiduciary obligations.',
      vocabularies: [
        {
          id: 'en_c1_10_1',
          word: 'fiduciary',
          pronunciation: '/fɪˈdjuːʃəri/',
          partOfSpeech: 'adj/noun',
          meaningVi: 'Nghĩa vụ ủy thác trung thực tuyệt đối vì lợi ích của cổ đông (Fiduciary duty)',
          radicals: 'Etymology: Latin fiducia (trust / confidence)',
          grammarNote: 'Collocation: breach of fiduciary duty, fiduciary responsibility.',
          exampleSentence: {
            target: 'Directors who enrich themselves at the expense of minority shareholders commit an actionable breach of their fiduciary duty.',
            pronunciation: '/dɪˈrɛktəz huː ɪnˈrɪtʃ ðəmˈsɛlvz æt ði ɪkˈspɛns əv maɪˈnɒrɪti ˈʃeəˌhəʊldəz kəˈmɪt ən ˈækʃənəbəl briːtʃ əv ðeə fɪˈdjuːʃəri ˈdjuːti/',
            meaningVi: 'Các giám đốc tự làm giàu cho bản thân bằng sự thiệt thòi của các cổ đông thiểu số đã phạm phải hành vi vi phạm nghĩa vụ ủy thác có thể bị khởi kiện.'
          }
        },
        {
          id: 'en_c1_10_2',
          word: 'stewardship',
          pronunciation: '/ˈstjuːədʃɪp/',
          partOfSpeech: 'noun',
          meaningVi: 'Trách nhiệm quản lý trông nom tài sản công tận tụy',
          radicals: 'Etymology: Old English stiweard (hall-warden / keeper of house)',
          grammarNote: 'Collocation: responsible corporate stewardship.',
          exampleSentence: {
            target: 'Effective corporate stewardship requires executive leaders to balance short-term profitability with generational environmental preservation.',
            pronunciation: '/ɪˈfɛktɪv ˈkɔːpərət ˈstjuːədʃɪp rɪˈkwaɪəz ɪɡˈzɛkjʊtɪv ˈliːdəz tuː ˈbæləns ʃɔːt tɜːm ˌprɒfɪtəˈbɪləti wɪð ˌdʒɛnəˈreɪʃənəl ɪnˌvaɪrənˈmɛntəl ˌprɛzəˈveɪʃən/',
            meaningVi: 'Trách nhiệm trông nom doanh nghiệp hiệu quả đòi hỏi các nhà lãnh đạo điều hành phải cân bằng giữa lợi nhuận ngắn hạn với việc bảo tồn môi trường cho nhiều thế hệ.'
          }
        },
        {
          id: 'en_c1_10_3',
          word: 'oversight',
          pronunciation: '/ˈəʊvəsaɪt/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự giám sát độc lập của hội đồng quản trị',
          radicals: 'Over + Sight',
          grammarNote: 'Collocation: board oversight, lack of regulatory oversight.',
          exampleSentence: {
            target: 'Independent non-executive directors provide critical checks and balances through rigorous oversight over executive compensation and audit committees.',
            pronunciation: '/ˌɪndɪˈpɛndənt nɒn ɪɡˈzɛkjʊtɪv dɪˈrɛktəz prəˈvaɪd ˈkrɪtɪkəl tʃɛks ænd ˈbælənsɪz θruː ˈrɪɡərəs ˈəʊvəsaɪt ˈəʊvər ɪɡˈzɛkjʊtɪv ˌkɒmpɛnˈseɪʃən ænd ˈɔːdɪt kəˈmɪtiz/',
            meaningVi: 'Các giám đốc độc lập không điều hành cung cấp sự kiềm chế và đối trọng then chốt thông qua sự giám sát nghiêm ngặt đối với thù lao điều hành và các ủy ban kiểm toán.'
          }
        },
        {
          id: 'en_c1_10_4',
          word: 'whistleblower',
          pronunciation: '/ˈwɪsəlˌbləʊər/',
          partOfSpeech: 'noun',
          meaningVi: 'Người tố giác nội bộ các sai phạm gian lận (Whistleblower protection)',
          radicals: 'Whistle + Blower (người thổi còi báo động)',
          grammarNote: 'Collocation: whistleblower protection act, anonymous whistleblower.',
          exampleSentence: {
            target: 'Statutory whistleblower protections shield courageous internal employees who expose accounting fraud from unlawful retaliation.',
            pronunciation: '/ˈstætʃʊtəri ˈwɪsəlˌbləʊə prəˈtɛkʃənz ʃiːld kəˈreɪdʒəs ɪnˈtɜːnəl ˌɛmplɔɪˈiːz huː ɪkˈspəʊz əˈkaʊntɪŋ frɔːd frɒm ʌnˈlɔːfʊl rɪˌtæliˈeɪʃən/',
            meaningVi: 'Các điều khoản bảo vệ người tố giác theo luật định che chở cho những nhân viên nội bộ dũng cảm vạch trần gian lận kế toán khỏi sự trả đũa trái luật.'
          }
        },
        {
          id: 'en_c1_10_5',
          word: 'malpractice',
          pronunciation: '/mælˈpræktɪs/',
          partOfSpeech: 'noun',
          meaningVi: 'Hành vi sai phạm nghề nghiệp gây tổn hại (Medical or financial malpractice)',
          radicals: 'Etymology: Latin mal- (bad) + practice',
          grammarNote: 'Collocation: gross corporate malpractice, insurance against malpractice.',
          exampleSentence: {
            target: 'The external forensic inquiry uncovered systemic corporate malpractice and intentional falsification of environmental emissions logs.',
            pronunciation: '/ði ɪkˈstɜːnəl fəˈrɛnsɪk ɪnˈkwaɪəri ˌʌnˈkʌvəd sɪsˈtɛmɪk ˈkɔːpərət mælˈpræktɪs ænd ɪnˈtɛnʃənəl ˌfɔːlsɪfɪˈkeɪʃən əv ɪnˌvaɪrənˈmɛntəl ɪˈmɪʃənz lɒɡz/',
            meaningVi: 'Cuộc điều tra pháp y bên ngoài đã phát hiện sai phạm nghề nghiệp mang tính hệ thống của doanh nghiệp và sự làm giả cố ý nhật ký phát thải môi trường.'
          }
        },
        {
          id: 'en_c1_10_6',
          word: 'proxy',
          pronunciation: '/ˈprɒksi/',
          partOfSpeech: 'noun',
          meaningVi: 'Người được ủy quyền bỏ phiếu đại hội cổ đông (Proxy voting)',
          radicals: 'Etymology: contraction of procuracy (action of a proctor / agent)',
          grammarNote: 'Collocation: proxy vote, proxy contest, proxy advisory firm.',
          exampleSentence: {
            target: 'Activist hedge funds waged a fierce proxy battle to unseat three entrenched directors and mandate board declassification.',
            pronunciation: '/ˈæktɪvɪst hɛdʒ fʌndz weɪdʒd ə fɪəs ˈprɒksi ˈbætəl tuː ʌnˈsiːt θriː ɪnˈtrɛntʃt dɪˈrɛktəz ænd ˈmændeɪt bɔːd ˌdiːˌklæsɪfɪˈkeɪʃən/',
            meaningVi: 'Các quỹ phòng hộ cổ đông hoạt động đã tiến hành một cuộc chiến ủy quyền bỏ phiếu khốc liệt để phế truất 3 giám đốc bảo thủ cố thủ và yêu cầu cải cách hội đồng.'
          }
        },
        {
          id: 'en_c1_10_7',
          word: 'covenant',
          pronunciation: '/ˈkʌvənənt/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Giao ước cam kết mang tính ràng buộc pháp lý trang trọng',
          radicals: 'Etymology: Latin convenire (come together / agree)',
          grammarNote: 'Collocation: breach a debt covenant, financial covenants.',
          exampleSentence: {
            target: 'Defaulting on a bank loan covenant allows senior creditors to accelerate loan repayment and demand immediate collateral liquidation.',
            pronunciation: '/dɪˈfɔːltɪŋ ɒn ə bæŋk ləʊn ˈkʌvənənt əˈlaʊz ˈsiːniə ˈkrɛdɪtəz tuː əkˈsɛləreɪt ləʊn rɪˈpeɪmənt ænd dɪˈmɑːnd ɪˈmiːdiət kəˈlætərəl ˌlɪkwɪˈdeɪʃən/',
            meaningVi: 'Vi phạm giao ước khoản vay ngân hàng cho phép các chủ nợ cấp cao đẩy nhanh tiến độ thu hồi nợ vay và yêu cầu thanh lý tài sản thế chấp ngay lập tức.'
          }
        },
        {
          id: 'en_c1_10_8',
          word: 'remit',
          pronunciation: '/rɪˈmɪt/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Phạm vi thẩm quyền trách nhiệm được giao phó',
          radicals: 'Etymology: Latin remittere (send back / refer / hand over)',
          grammarNote: 'Collocation: fall outside the committee\'s remit.',
          exampleSentence: {
            target: 'Overseeing cybersecurity and enterprise artificial intelligence ethics falls strictly within the newly established technology committee\'s remit.',
            pronunciation: '/ˌəʊvəˈsiːɪŋ ˈsaɪbəsɪˌkjʊərəti ænd ˈɛntəpraɪz ˌɑːtɪˈfɪʃəl ɪnˈtɛlɪdʒəns ˈɛθɪks fɔːlz ˈstrɪktli wɪðˈɪn ðə ˈnjuːli ɪsˈtæblɪʃt tɛkˈnɒlədʒi kəˈmɪtiz ˈriːmɪt/',
            meaningVi: 'Việc giám sát an ninh mạng và đạo đức trí tuệ nhân tạo doanh nghiệp hoàn toàn nằm trong phạm vi thẩm quyền của ủy ban công nghệ mới được thành lập.'
          }
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(__dirname, 'data-chunks/en_c1.json'), JSON.stringify(enC1, null, 2));
console.log('en_c1.json written! Lessons count:', enC1.lessons.length);
