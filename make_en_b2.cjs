const fs = require('fs');
const path = require('path');

const enB2 = {
  levelId: 'en_b2',
  code: 'B2',
  title: 'B2 - Upper-Intermediate / IELTS 6.5+: Corporate Discourse, Data Analytics & Business Idioms',
  lessons: [
    {
      id: 'en_b2_l1',
      title: 'Lesson 1: Presenting Financial Data, Infographics & Trend Projections',
      grammarFocus: 'Describing Trends & Trajectories: Soared to, Plummeted by, Plateaued at, Fluctuated wildly around.',
      vocabularies: [
        {
          id: 'en_b2_1_1',
          word: 'fluctuate',
          pronunciation: '/ˈflʌktʃueɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Biến động trồi sụt thất thường',
          radicals: 'Etymology: Latin fluctuare (flow / undulate like waves)',
          grammarNote: 'Collocation: fluctuate between X and Y, fluctuate wildly.',
          exampleSentence: {
            target: 'Throughout the third quarter, foreign exchange rates fluctuated wildly in response to central bank interest rate announcements.',
            pronunciation: '/θruːˈaʊt ðə θɜːd ˈkwɔːtə, ˈfɒrɪn ɪksˈtʃeɪndʒ reɪts ˈflʌktʃueɪtɪd ˈwaɪldli ɪn rɪˈspɒns tuː ˈsɛntrəl bæŋk ˈɪntrɪst reɪt əˈnaʊnsmənts/',
            meaningVi: 'Suốt quý ba, tỷ giá hối đoái đã biến động dữ dội trước các thông báo về lãi suất của ngân hàng trung ương.'
          }
        },
        {
          id: 'en_b2_1_2',
          word: 'plateau',
          pronunciation: '/ˈplætəʊ/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Giai đoạn chững lại đi ngang sau chu kỳ tăng trưởng (Plateau)',
          radicals: 'Etymology: Old French platel (flat surface)',
          grammarNote: 'Collocation: reach a plateau, plateau at 10,000 active users.',
          exampleSentence: {
            target: 'After two years of exponential hyper-growth, daily user acquisition began to plateau at around fifty thousand.',
            pronunciation: '/ˈɑːftə tuː jɪəz əv ˌɛkspəˈnɛnʃəl ˈhaɪpə ɡrəʊθ, ˈdeɪli ˈjuːzər ˌækwɪˈzɪʃən bɪˈɡæn tuː ˈplætəʊ æt əˈraʊnd ˈfɪfti ˈθaʊzənd/',
            meaningVi: 'Sau 2 năm tăng trưởng phi mã theo cấp số nhân, lượng người dùng mới hàng ngày bắt đầu đi ngang ở mức khoảng 50.000.'
          }
        },
        {
          id: 'en_b2_1_3',
          word: 'plummet',
          pronunciation: '/ˈplʌmɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Lao dốc cắm đầu thẳng đứng, giảm thê thảm',
          radicals: 'Etymology: Old French plomet (lead plumb ball)',
          grammarNote: 'Collocation: share prices plummeted, temperatures plummeted.',
          exampleSentence: {
            target: 'Tech stock valuations plummeted sharply following the sudden imposition of regulatory export restrictions.',
            pronunciation: '/tɛk stɒk ˌvæljʊˈeɪʃənz ˈplʌmɪtɪd ˈʃɑːpli ˈfɒləʊɪŋ ðə ˈsʌdən ˌɪmpəˈzɪʃən əv ˌrɛɡjʊˈleɪtəri ˈɛkspɔːt rɪsˈtrɪkʃənz/',
            meaningVi: 'Định giá cổ phiếu công nghệ đã lao dốc thê thảm sau sự áp đặt bất ngờ của các hạn chế xuất khẩu theo quy định.'
          }
        },
        {
          id: 'en_b2_1_4',
          word: 'soar',
          pronunciation: '/sɔːr/',
          partOfSpeech: 'verb',
          meaningVi: 'Tăng vọt ngút ngàn, bay vút lên cao',
          radicals: 'Etymology: Latin exaurare (fly out into the open air)',
          grammarNote: 'Collocation: profits soared, demand soared.',
          exampleSentence: {
            target: 'Global demand for renewable clean energy hardware soared to record-breaking heights this past fiscal year.',
            pronunciation: '/ˈɡləʊbəl dɪˈmɑːnd fɔː rɪˈnjuːəbəl kliːn ˈɛnədʒi ˈhɑːdweə sɔːd tuː ˈrɛkɔːd ˈbreɪkɪŋ haɪts ðɪs pɑːst ˈfɪskəl jɪə/',
            meaningVi: 'Nhu cầu toàn cầu đối với phần cứng năng lượng sạch tái tạo đã tăng vọt lên mức cao kỷ lục trong năm tài khóa vừa qua.'
          }
        },
        {
          id: 'en_b2_1_5',
          word: 'discrepancy',
          pronunciation: '/dɪsˈkrɛpənsi/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự chênh lệch sai biệt giữa hai nguồn số liệu',
          radicals: 'Etymology: Latin discrepare (sound differently / be discordant)',
          grammarNote: 'Collocation: reconcile discrepancies, glaring discrepancy.',
          exampleSentence: {
            target: 'The internal forensic audit uncovered an unexplained discrepancy of over two hundred thousand dollars between bank statements and ledger entries.',
            pronunciation: '/ði ɪnˈtɜːnəl fəˈrɛnsɪk ˈɔːdɪt ˌʌnˈkʌvəd ən ˌʌnɪkˈspleɪnd dɪsˈkrɛpənsi əv ˈəʊvə tuː ˈhʌndrəd ˈθaʊzənd ˈdɒləz bɪˈtwiːn bæŋk ˈsteɪtmənts ænd ˈlɛdʒər ˈɛntriz/',
            meaningVi: 'Cuộc kiểm toán nội bộ đã phát hiện một sự chênh lệch không giải thích được hơn 200.000 đô giữa sao kê ngân hàng và sổ cái kế toán.'
          }
        },
        {
          id: 'en_b2_1_6',
          word: 'projection',
          pronunciation: '/prəˈdʒɛkʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Số liệu dự phóng tương lai dựa trên mô hình toán (Forecast)',
          radicals: 'Etymology: Latin proicere (throw forward)',
          grammarNote: 'Collocation: revenue projections, five-year growth projections.',
          exampleSentence: {
            target: 'According to econometric projections, the generative AI market will surpass one trillion dollars by 2030.',
            pronunciation: '/əˈkɔːdɪŋ tuː ˌiːkɒnəˈmɛtrɪk prəˈdʒɛkʃənz, ðə ˈdʒɛnərətɪv ˌeɪ ˈaɪ ˈmɑːkɪt wɪl sɜːˈpɑːs wʌn ˈtrɪljən ˈdɒləz baɪ ˈtwɛnti ˈθɜːti/',
            meaningVi: 'Theo các dự phóng kinh tế lượng, thị trường AI tạo sinh sẽ vượt qua mốc 1.000 tỷ USD vào năm 2030.'
          }
        },
        {
          id: 'en_b2_1_7',
          word: 'volatile',
          pronunciation: '/ˈvɒlətaɪl/',
          partOfSpeech: 'adj',
          meaningVi: 'Bấp bênh dễ biến động mạnh khôn lường (Volatility)',
          radicals: 'Etymology: Latin volare (to fly / evaporate quickly)',
          grammarNote: 'Collocation: volatile market, volatile geopolitical climate.',
          exampleSentence: {
            target: 'Institutional portfolio managers hedge currency exposure to safeguard returns in an increasingly volatile global macroeconomic environment.',
            pronunciation: '/ˌɪnstɪˈtjuːʃənəl pɔːtˈfəʊliəʊ ˈmænɪdʒəz hɛdʒ ˈkʌrənsi ɪkˈspəʊʒə tuː ˈseɪfɡɑːd rɪˈtɜːnz ɪn ən ɪnˈkriːsɪŋli ˈvɒlətaɪl ˈɡləʊbəl ˌmækrəʊˌiːkəˈnɒmɪk ɪnˈvaɪrənmənt/',
            meaningVi: 'Các nhà quản lý danh mục đầu tư tổ chức phòng ngừa rủi ro tỷ giá để bảo vệ lợi nhuận trong một môi trường kinh tế vĩ mô toàn cầu ngày càng biến động.'
          }
        },
        {
          id: 'en_b2_1_8',
          word: 'outperform',
          pronunciation: '/ˌaʊtpəˈfɔːm/',
          partOfSpeech: 'verb',
          meaningVi: 'Vượt trội hơn hẳn so với đối thủ/mặt bằng chung',
          radicals: 'Etymology: out- (exceed) + perform',
          grammarNote: 'Collocation: outperform the market, outperform expectations.',
          exampleSentence: {
            target: 'Thanks to relentless engineering innovation, our flagship software subscription division consistently outperformed competitor offerings.',
            pronunciation: '/θæŋks tuː rɪˈlɛntləs ˌɛndʒɪˈnɪərɪŋ ˌɪnəˈveɪʃən, ˈaʊə ˈflæɡʃɪp ˈsɒftweə səbˈskrɪpʃən dɪˈvɪʒən kənˈsɪstəntli ˌaʊtpəˈfɔːmd kəmˈpɛtɪtər ˈɒfərɪŋz/',
            meaningVi: 'Nhờ vào sự đổi mới kỹ thuật không ngừng nghỉ, bộ phận phần mềm thuê bao chủ lực của chúng tôi liên tục thể hiện vượt trội hơn các dịch vụ của đối thủ.'
          }
        }
      ]
    },
    {
      id: 'en_b2_l2',
      title: 'Lesson 2: Executive Compensation Negotiation & Benefit Packages',
      grammarFocus: 'Conditional Concessions: Provided that, As long as, In the event that, Subject to approval.',
      vocabularies: [
        {
          id: 'en_b2_2_1',
          word: 'remuneration',
          pronunciation: '/rɪˌmjuːnəˈreɪʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Thù lao đãi ngộ tổng thể (Lương, thưởng, cổ phiếu)',
          radicals: 'Etymology: Latin remunerari (reward / pay back)',
          grammarNote: 'Collocation: executive remuneration package, competitive remuneration.',
          exampleSentence: {
            target: 'The remuneration package proposed by the board includes a competitive base salary, stock options, and comprehensive family healthcare.',
            pronunciation: '/ðə rɪˌmjuːnəˈreɪʃən ˈpækɪdʒ prəˈpəʊzd baɪ ðə bɔːd ɪnˈkluːdz ə kəmˈpɛtɪtɪv beɪs ˈsæləri, stɒk ˈɒpʃənz, ænd ˌkɒmprɪˈhɛnsɪv ˈfæmɪli ˈhɛlθkeər/',
            meaningVi: 'Gói thù lao do hội đồng quản trị đề xuất bao gồm lương cơ bản cạnh tranh, quyền mua cổ phiếu và gói bảo hiểm y tế gia đình toàn diện.'
          }
        },
        {
          id: 'en_b2_2_2',
          word: 'equity',
          pronunciation: '/ˈɛkwɪti/',
          partOfSpeech: 'noun',
          meaningVi: 'Cổ phần sở hữu trong doanh nghiệp (Stock equity)',
          radicals: 'Etymology: Latin aequitas (equality / fairness)',
          grammarNote: 'Collocation: grant equity, private equity, equity vest over four years.',
          exampleSentence: {
            target: 'Senior engineering architects negotiated a significant equity stake with a standard four-year vesting schedule and a one-year cliff.',
            pronunciation: '/ˈsiːniər ˌɛndʒɪˈnɪərɪŋ ˈɑːkɪtɛkts nɪˈɡəʊʃieɪtɪd ə sɪɡˈnɪfɪkənt ˈɛkwɪti steɪk wɪð ə ˈstændəd fɔː jɪə ˈvɛstɪŋ ˈʃɛdjuːl ænd ə wʌn jɪə klɪf/',
            meaningVi: 'Các kiến trúc sư kỹ thuật cao cấp đã đàm phán được một tỷ lệ cổ phần đáng kể với lịch trình giải ngân 4 năm tiêu chuẩn và kỳ hạn 1 năm đầu.'
          }
        },
        {
          id: 'en_b2_2_3',
          word: 'perquisite',
          pronunciation: '/ˈpɜːkwɪzɪt/',
          partOfSpeech: 'noun',
          meaningVi: 'Đặc quyền bổng lộc đi kèm chức vụ (thường gọi tắt là perk)',
          radicals: 'Etymology: Latin perquirere (search diligently for)',
          grammarNote: 'Collocation: executive perquisites, generous corporate perks.',
          exampleSentence: {
            target: 'Beyond monetary pay, prestigious executive perquisites like chauffeured transport and club memberships are commonly extended.',
            pronunciation: '/bɪˈjɒnd ˈmʌnɪtəri peɪ, prɛˈstɪdʒəs ɪɡˈzɛkjʊtɪv ˈpɜːkwɪzɪts laɪk ˈʃəʊfəd ˈtrænspɔːt ænd klʌb ˈmɛmbəʃɪps ɑː ˈkɒmənli ɪkˈstɛndɪd/',
            meaningVi: 'Vượt trên tiền lương, các đặc quyền bổng lộc danh giá như xe đưa đón riêng và thẻ hội viên câu lạc bộ thường được cung cấp cho ban điều hành.'
          }
        },
        {
          id: 'en_b2_2_4',
          word: 'severance',
          pronunciation: '/ˈsɛvərəns/',
          partOfSpeech: 'noun',
          meaningVi: 'Khoản trợ cấp thôi việc khi chấm dứt hợp đồng (Severance pay)',
          radicals: 'Etymology: sever (cut off / separate) + -ance',
          grammarNote: 'Collocation: severance agreement, severance package.',
          exampleSentence: {
            target: 'The employment contract stipulated a six-month severance payment in the event of involuntary termination without cause.',
            pronunciation: '/ði ɪmˈplɔɪmənt ˈkɒntrækt ˈstɪpjʊleɪtɪd ə sɪks mʌnθ ˈsɛvərəns ˈpeɪmənt ɪn ði ɪˈvɛnt əv ɪnˈvɒləntəri ˌtɜːmɪˈneɪʃən wɪðˈaʊt kɔːz/',
            meaningVi: 'Hợp đồng lao động quy định khoản trợ cấp thôi việc 6 tháng lương trong trường hợp bị chấm dứt hợp đồng ngoài ý muốn mà không có lỗi.'
          }
        },
        {
          id: 'en_b2_2_5',
          word: 'counteroffer',
          pronunciation: '/ˈkaʊntərˌɒfər/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Lời đề nghị ngược lại trong đàm phán lương (Counteroffer)',
          radicals: 'Etymology: counter- (against) + offer',
          grammarNote: 'Collocation: make a counteroffer, decline a counteroffer.',
          exampleSentence: {
            target: 'Upon receiving a competing bid from a rival tech firm, she presented a counteroffer requesting a fifteen percent higher sign-on bonus.',
            pronunciation: '/əˈpɒn rɪˈsiːvɪŋ ə kəmˈpiːtɪŋ bɪd frɒm ə ˈraɪvəl tɛk fɜːm, ʃiː prɪˈzɛntɪd ə ˈkaʊntərˌɒfə rɪˈkwɛstɪŋ ə ˈfɪftiːn pəˈsɛnt ˈhaɪə saɪn ɒn ˈbəʊnəs/',
            meaningVi: 'Sau khi nhận được lời chào giá cạnh tranh từ một hãng công nghệ đối thủ, cô ấy đã đưa ra lời đề nghị ngược yêu cầu thưởng gia nhập cao hơn 15%.'
          }
        },
        {
          id: 'en_b2_2_6',
          word: 'non-compete',
          pronunciation: '/nɒn kəmˈpiːt/',
          partOfSpeech: 'noun/adj',
          meaningVi: 'Điều khoản cam kết không làm việc cho đối thủ cạnh tranh (Non-compete clause)',
          radicals: 'Etymology: non- + compete',
          grammarNote: 'Collocation: enforce a non-compete clause, geographical restrictions.',
          exampleSentence: {
            target: 'Her attorney scrutinized the non-compete clause to confirm it would not unlawfully restrict her future career prospects in the region.',
            pronunciation: '/hɜːr əˈtɜːni ˈskruːtɪnaɪzd ðə nɒn kəmˈpiːt klɔːz tuː kənˈfɜːm ɪt wʊd nɒt ʌnˈlɔːfʊli rɪsˈtrɪkt hɜː ˈfjuːtʃə kəˈrɪə ˈprɒspɛkts ɪn ðə ˈriːdʒən/',
            meaningVi: 'Luật sư của cô ấy đã soi xét kỹ lưỡng điều khoản không cạnh tranh để khẳng định nó sẽ không hạn chế trái luật triển vọng nghề nghiệp tương lai của cô trong khu vực.'
          }
        },
        {
          id: 'en_b2_2_7',
          word: 'stipulate',
          pronunciation: '/ˈstɪpjʊleɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Quy định rõ ràng thành điều khoản hợp đồng',
          radicals: 'Etymology: Latin stipulari (bargain / exact a promise)',
          grammarNote: 'Collocation: the contract stipulates that...',
          exampleSentence: {
            target: 'The agreement explicitly stipulates that annual performance bonuses are subject to reaching company-wide EBITDA thresholds.',
            pronunciation: '/ði əˈɡriːmənt ɪkˈsplɪsɪtli ˈstɪpjʊleɪts ðæt ˈænjʊəl pəˈfɔːməns ˈbəʊnəsɪz ɑː ˈsʌbdʒɪkt tuː ˈriːtʃɪŋ ˈkʌmpəni waɪd ˈiːbɪtdɑː ˈθrɛʃhəʊldz/',
            meaningVi: 'Thỏa thuận quy định rõ ràng rằng các khoản thưởng hiệu suất hàng năm phải tùy thuộc vào việc đạt được ngưỡng EBITDA của toàn công ty.'
          }
        },
        {
          id: 'en_b2_2_8',
          word: 'vesting',
          pronunciation: '/ˈvɛstɪŋ/',
          partOfSpeech: 'noun/adj',
          meaningVi: 'Thời gian trao quyền sở hữu cổ phần theo từng năm (Stock vesting)',
          radicals: 'Etymology: Latin vestire (clothe / invest with power)',
          grammarNote: 'Collocation: vesting period, accelerated vesting.',
          exampleSentence: {
            target: 'A four-year vesting cycle incentivizes senior executives to focus on long-term shareholder value creation rather than quarterly profits.',
            pronunciation: '/ə fɔː jɪə ˈvɛstɪŋ ˈsaɪkəl ɪnˈsɛntɪvaɪzɪz ˈsiːniər ɪɡˈzɛkjʊtɪvz tuː ˈfəʊkəs ɒn lɒŋ tɜːm ˈʃeəˌhəʊldə ˈvæljuː kriːˈeɪʃən ˈrɑːðə ðæn ˈkwɔːtəli ˈprɒfɪts/',
            meaningVi: 'Chu kỳ trao quyền sở hữu 4 năm thúc đẩy các nhà lãnh đạo cao cấp tập trung vào việc tạo ra giá trị cổ đông dài hạn hơn là lợi nhuận từng quý.'
          }
        }
      ]
    },
    {
      id: 'en_b2_l3',
      title: 'Lesson 3: Debating Socioeconomic Challenges & Green Sustainability',
      grammarFocus: 'Complex Connectors for Argumentation: In contrast, Whereas, Notwithstanding the fact that, On the grounds that.',
      vocabularies: [
        {
          id: 'en_b2_3_1',
          word: 'sustainability',
          pronunciation: '/səˌsteɪnəˈbɪləti/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự phát triển bền vững không hủy hoại tương lai',
          radicals: 'Etymology: sustain + -ability',
          grammarNote: 'Collocation: environmental sustainability, corporate sustainability goals.',
          exampleSentence: {
            target: 'Transitioning to circular economy models is vital for achieving global environmental sustainability.',
            pronunciation: '/trænˈzɪʃənɪŋ tuː ˈsɜːkjʊlə ɪˈkɒnəmi ˈmɒdəlz ɪz ˈvaɪtəl fɔːr əˈtʃiːvɪŋ ˈɡləʊbəl ɪnˌvaɪrənˈmɛntəl səˌsteɪnəˈbɪləti/',
            meaningVi: 'Việc chuyển dịch sang các mô hình kinh tế tuần hoàn là tối quan trọng để đạt được sự phát triển bền vững môi trường toàn cầu.'
          }
        },
        {
          id: 'en_b2_3_2',
          word: 'carbon footprint',
          pronunciation: '/ˈkɑːbən ˈfʊtprɪnt/',
          partOfSpeech: 'noun',
          meaningVi: 'Dấu chân carbon, tổng lượng khí thải nhà kính tạo ra',
          radicals: 'Carbon + Footprint (dấu chân phát thải)',
          grammarNote: 'Collocation: reduce carbon footprint, net-zero carbon footprint.',
          exampleSentence: {
            target: 'Multinational manufacturers are investing billions to slash their carbon footprint across scope 1, 2, and 3 emissions.',
            pronunciation: '/ˌmʌltɪˈnæʃənəl ˌmænjʊˈfæktʃərəz ɑːr ɪnˈvɛstɪŋ ˈbɪljənz tuː slæʃ ðeə ˈkɑːbən ˈfʊtprɪnt əˈkrɒs skəʊp wʌn, tuː, ænd θriː ɪˈmɪʃənz/',
            meaningVi: 'Các nhà sản xuất đa quốc gia đang đầu tư hàng tỷ đô la để cắt giảm mạnh dấu chân carbon trên khắp phạm vi phát thải 1, 2 và 3.'
          }
        },
        {
          id: 'en_b2_3_3',
          word: 'renewable',
          pronunciation: '/rɪˈnjuːəbəl/',
          partOfSpeech: 'adj/noun',
          meaningVi: 'Năng lượng tái tạo (gió, mặt trời, thủy điện)',
          radicals: 'Etymology: re- (again) + new + -able',
          grammarNote: 'Collocation: renewable energy sources, renewable power grid.',
          exampleSentence: {
            target: 'Investing in renewable energy infrastructure yields long-term environmental and financial dividends.',
            pronunciation: '/ɪnˈvɛstɪŋ ɪn rɪˈnjuːəbəl ˈɛnədʒi ˈɪnfrəˌstrʌktʃə jiːldz lɒŋ tɜːm ɪnˌvaɪrənˈmɛntəl ænd faɪˈnænʃəl ˈdɪvɪdɛndz/',
            meaningVi: 'Đầu tư vào cơ sở hạ tầng năng lượng tái tạo mang lại những khoản lợi tức tài chính và môi trường lâu dài.'
          }
        },
        {
          id: 'en_b2_3_4',
          word: 'socioeconomic',
          pronunciation: '/ˌsəʊsiəʊˌiːkəˈnɒmɪk/',
          partOfSpeech: 'adj',
          meaningVi: 'Kinh tế - xã hội (Socioeconomic development)',
          radicals: 'Socio- (xã hội) + Economic (kinh tế)',
          grammarNote: 'Collocation: socioeconomic disparity, socioeconomic status.',
          exampleSentence: {
            target: 'Equitable access to digital education is essential to bridging deep socioeconomic divides.',
            pronunciation: '/ˈɛkwɪtəbəl ˈæksɛs tuː ˈdɪdʒɪtəl ˌɛdʒʊˈkeɪʃən ɪz ɪˈsɛnʃəl tuː ˈbrɪdʒɪŋ diːp ˌsəʊsiəʊˌiːkəˈnɒmɪk dɪˈvaɪdz/',
            meaningVi: 'Tiếp cận công bằng với giáo dục kỹ thuật số là điều cốt yếu để thu hẹp những hố sâu ngăn cách kinh tế xã hội sâu sắc.'
          }
        },
        {
          id: 'en_b2_3_5',
          word: 'deplete',
          pronunciation: '/dɪˈpliːt/',
          partOfSpeech: 'verb',
          meaningVi: 'Làm cạn kiệt nguồn tài nguyên thiên nhiên',
          radicals: 'Etymology: Latin deplere (empty out / un-fill)',
          grammarNote: 'Collocation: deplete natural resources, deplete ozone layer.',
          exampleSentence: {
            target: 'Unregulated industrial overfishing continues to deplete marine fish stocks at an alarming rate.',
            pronunciation: '/ˌʌnˈrɛɡjʊleɪtɪd ɪnˈdʌstrɪəl ˌəʊvəˈfɪʃɪŋ kənˈtɪnjuːz tuː dɪˈpliːt məˈriːn fɪʃ stɒks æt ən əˈlɑːmɪŋ reɪt/',
            meaningVi: 'Việc đánh bắt cá công nghiệp quá mức không được kiểm soát tiếp tục làm cạn kiệt trữ lượng cá biển ở mức báo động.'
          }
        },
        {
          id: 'en_b2_3_6',
          word: 'mitigate',
          pronunciation: '/ˈmɪtɪɡeɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Giảm thiểu mức độ nghiêm trọng của hậu quả (Mitigation)',
          radicals: 'Etymology: Latin mitigare (soften / make mild)',
          grammarNote: 'Collocation: mitigate climate change risks, mitigate damage.',
          exampleSentence: {
            target: 'Constructing robust coastal seawalls will help mitigate the catastrophic impacts of rising sea levels.',
            pronunciation: '/kənˈstrʌktɪŋ rəʊˈbʌst ˈkəʊstəl ˈsiːwɔːlz wɪl hɛlp ˈmɪtɪɡeɪt ðə ˌkætəˈstrɒfɪk ˈɪmpækts əv ˈraɪzɪŋ siː ˈlɛvəlz/',
            meaningVi: 'Xây dựng các con đê chắn sóng kiên cố ven biển sẽ giúp giảm nhẹ những tác động thảm khốc của mực nước biển dâng cao.'
          }
        },
        {
          id: 'en_b2_3_7',
          word: 'biodiversity',
          pronunciation: '/ˌbaɪəʊdaɪˈvɜːsəti/',
          partOfSpeech: 'noun',
          meaningVi: 'Đa dạng sinh học trong hệ sinh thái',
          radicals: 'Bio- (sự sống) + Diversity (đa dạng)',
          grammarNote: 'Collocation: preserve biodiversity, loss of biodiversity.',
          exampleSentence: {
            target: 'Deforestation across tropical rainforests poses an existential threat to endemic terrestrial biodiversity.',
            pronunciation: '/dɪˌfɒrɪˈsteɪʃən əˈkrɒs ˈtrɒpɪkəl ˈreɪnfɒrɪsts ˈpəʊzɪz ən ˌɛɡzɪˈstɛnʃəl θrɛt tuː ɛnˈdɛmɪk təˈrɛstrɪəl ˌbaɪəʊdaɪˈvɜːsəti/',
            meaningVi: 'Nạn phá rừng nhiệt đới đặt ra mối đe dọa sinh tồn đối với sự đa dạng sinh học trên cạn đặc hữu.'
          }
        },
        {
          id: 'en_b2_3_8',
          word: 'advocate',
          pronunciation: '/ˈædvəkeɪt/',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Người ủng hộ nhiệt thành / Công khai ủng hộ chính sách',
          radicals: 'Etymology: Latin advocare (call to one\'s aid / plead a cause)',
          grammarNote: 'Structure: advocate for clean energy legislation.',
          exampleSentence: {
            target: 'Environmental scientists passionately advocate for stricter carbon taxation on high-emission heavy industries.',
            pronunciation: '/ɪnˌvaɪrənˈmɛntəl ˈsaɪəntɪsts ˈpæʃənɪtli ˈædvəkeɪt fɔː ˈstrɪktə ˈkɑːbən tækˈseɪʃən ɒn haɪ ɪˈmɪʃən ˈhɛvi ˈɪndəstriz/',
            meaningVi: 'Các nhà khoa học môi trường nhiệt thành ủng hộ mức đánh thuế carbon nghiêm ngặt hơn đối với các ngành công nghiệp nặng phát thải cao.'
          }
        }
      ]
    },
    {
      id: 'en_b2_l4',
      title: 'Lesson 4: Artificial Intelligence, Automation & The Future Workforce',
      grammarFocus: 'Future Continuous & Future Perfect: By 2030, machines will have automated routine cognitive tasks.',
      vocabularies: [
        {
          id: 'en_b2_4_1',
          word: 'disruption',
          pronunciation: '/dɪsˈrʌpʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự đảo lộn phá vỡ trật tự cũ do công nghệ mới (Disruptive innovation)',
          radicals: 'Etymology: Latin disrumpere (break apart / shatter)',
          grammarNote: 'Collocation: technological disruption, digital disruption.',
          exampleSentence: {
            target: 'Generative AI represents a monumental technological disruption that will fundamentally reshape the global knowledge economy.',
            pronunciation: '/ˈdʒɛnərətɪv ˌeɪ ˈaɪ ˌrɛprɪˈzɛnts ə ˌmɒnjʊˈmɛntəl ˌtɛknəˈlɒdʒɪkəl dɪsˈrʌpʃən ðæt wɪl ˌfʌndəˈmɛntəli ˌriːˈʃeɪp ðə ˈɡləʊbəl ˈnɒlɪdʒ ɪˈkɒnəmi/',
            meaningVi: 'AI tạo sinh đại diện cho một sự phá vỡ công nghệ mang tính tượng đài sẽ tái định hình nền kinh tế tri thức toàn cầu một cách căn bản.'
          }
        },
        {
          id: 'en_b2_4_2',
          word: 'reskilling',
          pronunciation: '/riːˈskɪlɪŋ/',
          partOfSpeech: 'noun',
          meaningVi: 'Đào tạo lại kỹ năng mới cho người lao động',
          radicals: 'Re- + Skill + -ing',
          grammarNote: 'Collocation: workforce reskilling program, upskilling and reskilling.',
          exampleSentence: {
            target: 'Forward-thinking corporations are launching massive reskilling initiatives to prepare their workforce for automated workflows.',
            pronunciation: '/ˈfɔːwəd ˈθɪŋkɪŋ ˌkɔːpəˈreɪʃənz ɑː ˈlɔːntʃɪŋ ˈmæsɪv riːˈskɪlɪŋ ɪˈnɪʃətɪvz tuː prɪˈpeə ðeə ˈwɜːkfɔːs fɔːr ˈɔːtəmeɪtɪd ˈwɜːkfləʊz/',
            meaningVi: 'Các tập đoàn có tầm nhìn xa đang phát động các sáng kiến đào tạo lại quy mô lớn để chuẩn bị lực lượng lao động cho các quy trình tự động hóa.'
          }
        },
        {
          id: 'en_b2_4_3',
          word: 'algorithmic',
          pronunciation: '/ˌælɡəˈrɪðmɪk/',
          partOfSpeech: 'adj',
          meaningVi: 'Dựa trên thuật toán máy tính (Algorithmic bias, trading)',
          radicals: 'Etymology: Persian mathematician Al-Khwarizmi',
          grammarNote: 'Collocation: algorithmic decision-making, algorithmic bias.',
          exampleSentence: {
            target: 'Financial institutions increasingly deploy algorithmic trading models capable of executing microsecond arbitrage transactions.',
            pronunciation: '/faɪˈnænʃəl ˌɪnstɪˈtjuːʃənz ɪnˈkriːsɪŋli dɪˈplɔɪ ˌælɡəˈrɪðmɪk ˈtreɪdɪŋ ˈmɒdəlz ˈkeɪpəbəl əv ˈɛksɪkjuːtɪŋ ˈmaɪkrəʊˌsɛkənd ˈɑːbɪtrɑːʒ trænˈzækʃənz/',
            meaningVi: 'Các định chế tài chính ngày càng triển khai các mô hình giao dịch thuật toán có khả năng thực hiện các giao dịch kinh doanh chênh lệch giá vi giây.'
          }
        },
        {
          id: 'en_b2_4_4',
          word: 'autonomous',
          pronunciation: '/ɔːˈtɒnəməs/',
          partOfSpeech: 'adj',
          meaningVi: 'Tự chủ độc lập, tự hành không cần con người lái',
          radicals: 'Etymology: Greek autos (self) + nomos (law/rule)',
          grammarNote: 'Collocation: autonomous vehicles, fully autonomous agent.',
          exampleSentence: {
            target: 'Autonomous delivery vehicles equipped with LiDAR sensors are already operating on commercial urban logistics routes.',
            pronunciation: '/ɔːˈtɒnəməs dɪˈlɪvəri ˈviːɪkəlz ɪˈkwɪpt wɪð ˈlaɪdɑː ˈsɛnsəz ɑːr ɔːlˈrɛdi ˈɒpəreɪtɪŋ ɒn kəˈmɜːʃəl ˈɜːbən ləˈdʒɪstɪks ruːts/',
            meaningVi: 'Xe giao hàng tự hành trang bị cảm biến LiDAR đã và đang vận hành trên các tuyến đường logistics đô thị thương mại.'
          }
        },
        {
          id: 'en_b2_4_5',
          word: 'obsolete',
          pronunciation: '/ˈɒbsəliːt/',
          partOfSpeech: 'adj',
          meaningVi: 'Lỗi thời lạc hậu bị đào thải',
          radicals: 'Etymology: Latin obsolescere (fall into disuse)',
          grammarNote: 'Collocation: render skills obsolete, obsolete technology.',
          exampleSentence: {
            target: 'Without lifelong continuing education, professional technical skills can quickly become obsolete within five years.',
            pronunciation: '/wɪðˈaʊt ˈlaɪflɒŋ kənˈtɪnjuːɪŋ ˌɛdʒʊˈkeɪʃən, prəˈfɛʃənəl ˈtɛknɪkəl skɪlz kæn ˈkwɪkli bɪˈkʌm ˈɒbsəliːt wɪðˈɪn faɪv jɪəz/',
            meaningVi: 'Nếu không học tập suốt đời liên tục, các kỹ năng kỹ thuật chuyên nghiệp có thể nhanh chóng trở nên lỗi thời trong vòng 5 năm.'
          }
        },
        {
          id: 'en_b2_4_6',
          word: 'augmented',
          pronunciation: '/ɔːɡˈmɛntɪd/',
          partOfSpeech: 'adj',
          meaningVi: 'Được tăng cường mở rộng năng lực (Augmented reality, intelligence)',
          radicals: 'Etymology: Latin augmentum (growth / increase)',
          grammarNote: 'Collocation: augmented reality (AR), augmented workforce.',
          exampleSentence: {
            target: 'The future of work is not human replacement, but rather an augmented human workforce empowered by intelligent agents.',
            pronunciation: '/ðə ˈfjuːtʃər əv wɜːk ɪz nɒt ˈhjuːmən rɪˈpleɪsmənt, bʌt ˈrɑːðər ən ɔːɡˈmɛntɪd ˈhjuːmən ˈwɜːkfɔːs ɪmˈpaʊəd baɪ ɪnˈtɛlɪdʒənt ˈeɪdʒənts/',
            meaningVi: 'Tương lai của công việc không phải là thay thế con người, mà đúng hơn là một lực lượng lao động con người được tăng cường sức mạnh bởi các trợ lý thông minh.'
          }
        },
        {
          id: 'en_b2_4_7',
          word: 'cognitive',
          pronunciation: '/ˈkɒɡnɪtɪv/',
          partOfSpeech: 'adj',
          meaningVi: 'Thuộc về nhận thức, tư duy trí tuệ của não bộ',
          radicals: 'Etymology: Latin cognoscere (get to know / recognize)',
          grammarNote: 'Collocation: cognitive load, cognitive capability.',
          exampleSentence: {
            target: 'Automating administrative drudgery allows professionals to redirect their cognitive energy toward creative problem-solving.',
            pronunciation: '/ˈɔːtəmeɪtɪŋ ədˈmɪnɪstrətɪv ˈdrʌdʒəri əˈlaʊz prəˈfɛʃənəlz tuː ˌriːdɪˈrɛkt ðeə ˈkɒɡnɪtɪv ˈɛnədʒi təˈwɔːdz kriːˈeɪtɪv ˈprɒbləm ˈsɒlvɪŋ/',
            meaningVi: 'Việc tự động hóa các công việc hành chính buồn tẻ cho phép các chuyên gia chuyển hướng năng lượng nhận thức của họ sang giải quyết vấn đề sáng tạo.'
          }
        },
        {
          id: 'en_b2_4_8',
          word: 'human-centric',
          pronunciation: '/ˈhjuːmən ˈsɛntrɪk/',
          partOfSpeech: 'adj',
          meaningVi: 'Lấy con người làm trung tâm (Human-centric design)',
          radicals: 'Human + Centric',
          grammarNote: 'Collocation: human-centric AI development.',
          exampleSentence: {
            target: 'Regulators emphasize that high-risk machine learning systems must adhere to strict human-centric ethical guidelines.',
            pronunciation: '/ˈrɛɡjʊleɪtəz ˈɛmfəsaɪz ðæt haɪ rɪsk məˈʃiːn ˈlɜːnɪŋ ˈsɪstəmz mʌst ədˈhɪə tuː strɪkt ˈhjuːmən ˈsɛntrɪk ˈɛθɪkəl ˈɡaɪdlaɪnz/',
            meaningVi: 'Các cơ quan quản lý nhấn mạnh rằng các hệ thống học máy có rủi ro cao phải tuân thủ các hướng dẫn đạo đức nghiêm ngặt lấy con người làm trung tâm.'
          }
        }
      ]
    },
    {
      id: 'en_b2_l5',
      title: 'Lesson 5: High-Impact Business Idioms for Corporate Leadership',
      grammarFocus: 'Idiomatic Expressions in Persuasive Rhetoric: Hit the ground running, Cut corners, Raise the bar, On the same page.',
      vocabularies: [
        {
          id: 'en_b2_5_1',
          word: 'hit the ground running',
          pronunciation: '/hɪt ðə ɡraʊnd ˈrʌnɪŋ/',
          partOfSpeech: 'idiom',
          meaningVi: 'Bắt tay ngay vào việc với hiệu suất cao không cần thời gian làm quen',
          radicals: 'Metaphor: paratroopers hitting the ground in full sprint',
          grammarNote: 'Usage: describe a fast-paced competent recruit.',
          exampleSentence: {
            target: 'With her rich industry background, the new marketing vice president hit the ground running from day one.',
            pronunciation: '/wɪð hɜː rɪtʃ ˈɪndəstri ˈbækɡraʊnd, ðə njuː ˈmɑːkɪtɪŋ vaɪs ˈprɛzɪdənt hɪt ðə ɡraʊnd ˈrʌnɪŋ frɒm deɪ wʌn/',
            meaningVi: 'Với kinh nghiệm ngành phong phú, tân phó chủ tịch tiếp thị đã bắt tay ngay vào việc một cách xuất sắc ngay từ ngày đầu tiên.'
          }
        },
        {
          id: 'en_b2_5_2',
          word: 'cut corners',
          pronunciation: '/kʌt ˈkɔːnəz/',
          partOfSpeech: 'idiom',
          meaningVi: 'Làm ẩu, bớt xén công đoạn để tiết kiệm tiền/thời gian',
          radicals: 'Metaphor: cutting across street corners instead of following roads',
          grammarNote: 'Usage: cautionary advice against compromising quality.',
          exampleSentence: {
            target: 'When building mission-critical medical firmware, our engineering culture strictly forbids cutting corners.',
            pronunciation: '/wɛn ˈbɪldɪŋ ˈmɪʃən ˈkrɪtɪkəl ˈmɛdɪkəl ˈfɜːmweə, ˈaʊər ˌɛndʒɪˈnɪərɪŋ ˈkʌltʃə ˈstrɪktli fəˈbɪdz ˈkʌtɪŋ ˈkɔːnəz/',
            meaningVi: 'Khi xây dựng phần mềm nhúng y tế mang tính sống còn, văn hóa kỹ thuật của chúng tôi nghiêm cấm việc làm ẩu bớt xén công đoạn.'
          }
        },
        {
          id: 'en_b2_5_3',
          word: 'raise the bar',
          pronunciation: '/reɪz ðə bɑːr/',
          partOfSpeech: 'idiom',
          meaningVi: 'Nâng chuẩn mực kỳ vọng lên một nấc thang cao hơn',
          radicals: 'Metaphor: raising the high jump crossbar in athletics',
          grammarNote: 'Collocation: raise the bar for excellence.',
          exampleSentence: {
            target: 'The introduction of retina displays raised the bar for visual fidelity across the entire consumer electronics industry.',
            pronunciation: '/ði ˌɪntrəˈdʌkʃən əv ˈrɛtɪnə dɪˈspleɪz reɪzd ðə bɑː fɔː ˈvɪʒuəl fɪˈdɛləti əˈkrɒs ði ɪnˈtaɪə kənˈsjuːmər ˌɪlɛkˈtrɒnɪks ˈɪndəstri/',
            meaningVi: 'Sự ra đời của màn hình Retina đã nâng tầm chuẩn mực về độ sắc nét hình ảnh trên toàn bộ ngành điện tử tiêu dùng.'
          }
        },
        {
          id: 'en_b2_5_4',
          word: 'on the same page',
          pronunciation: '/ɒn ðə seɪm peɪdʒ/',
          partOfSpeech: 'idiom',
          meaningVi: 'Cùng chung một cách hiểu, đồng thuận tuyệt đối không lệch pha',
          radicals: 'Metaphor: reading from the identical book page',
          grammarNote: 'Collocation: make sure everyone is on the same page.',
          exampleSentence: {
            target: 'We held an alignment workshop to guarantee that product, sales, and support were all on the same page regarding the rollout.',
            pronunciation: '/wiː hɛld ən əˈlaɪnmənt ˈwɜːkʃɒp tuː ˌɡærənˈtiː ðæt ˈprɒdʌkt, seɪlz, ænd səˈpɔːt wɜːr ɔːl ɒn ðə seɪm peɪdʒ rɪˈɡɑːdɪŋ ðə ˈrəʊlaʊt/',
            meaningVi: 'Chúng tôi tổ chức buổi hội thảo căn chỉnh để đảm bảo rằng các bộ phận sản phẩm, kinh doanh và hỗ trợ đều hiểu nhất trí giống nhau về đợt ra mắt.'
          }
        },
        {
          id: 'en_b2_5_5',
          word: 'think outside the box',
          pronunciation: '/θɪŋk ˌaʊtˈsaɪd ðə bɒks/',
          partOfSpeech: 'idiom',
          meaningVi: 'Tư duy đột phá vượt ra ngoài lối mòn khuôn khổ cũ',
          radicals: 'Metaphor: solving the classic nine-dot puzzle by drawing outside the square',
          grammarNote: 'Synonym: innovate creatively.',
          exampleSentence: {
            target: 'Stagnant market conditions require bold leaders who can inspire their teams to think outside the box.',
            pronunciation: '/ˈstæɡnənt ˈmɑːkɪt kənˈdɪʃənz rɪˈkwaɪə bəʊld ˈliːdəz huː kæn ɪnˈspaɪə ðeə tiːmz tuː θɪŋk ˌaʊtˈsaɪd ðə bɒks/',
            meaningVi: 'Điều kiện thị trường trì trệ đòi hỏi những nhà lãnh đạo táo bạo có thể truyền cảm hứng cho đội ngũ tư duy vượt ra ngoài khuôn khổ.'
          }
        },
        {
          id: 'en_b2_5_6',
          word: 'touch base',
          pronunciation: '/tʌtʃ beɪs/',
          partOfSpeech: 'idiom',
          meaningVi: 'Liên hệ nhanh để cập nhật ngắn gọn tình hình (Catch up)',
          radicals: 'Metaphor: baseball runner touching base safely',
          grammarNote: 'Structure: touch base with somebody next week.',
          exampleSentence: {
            target: 'Let us touch base on Friday afternoon to review key performance indicators before the weekend.',
            pronunciation: '/lɛt ʌs tʌtʃ beɪs ɒn ˈfraɪdeɪ ˌɑːftəˈnuːn tuː rɪˈvjuː kiː pəˈfɔːməns ˈɪndɪkeɪtəz bɪˈfɔː ðə ˈwiːkɛnd/',
            meaningVi: 'Chúng ta hãy kết nối nhanh vào chiều thứ Sáu để điểm lại các chỉ số KPI then chốt trước kỳ nghỉ cuối tuần.'
          }
        },
        {
          id: 'en_b2_5_7',
          word: 'game changer',
          pronunciation: '/ˈɡeɪm ˌtʃeɪndʒər/',
          partOfSpeech: 'noun idiom',
          meaningVi: 'Yếu tố làm thay đổi hoàn toàn cục diện cuộc chơi',
          radicals: 'Game + Changer',
          grammarNote: 'Collocation: prove to be a game changer.',
          exampleSentence: {
            target: 'Developing proprietary solid-state battery technology proved to be a true game changer for the electric automaker.',
            pronunciation: '/dɪˈvɛləpɪŋ prəˈpraɪətəri ˈsɒlɪd steɪt ˈbætəri tɛkˈnɒlədʒi pruːvd tuː biː ə truː ˈɡeɪm ˌtʃeɪndʒə fɔː ði ɪˈlɛktrɪk ˈɔːtəʊˌmeɪkə/',
            meaningVi: 'Phát triển công nghệ pin thể rắn độc quyền đã chứng minh là một yếu tố thay đổi hoàn toàn cục diện đối với nhà sản xuất ô tô điện.'
          }
        },
        {
          id: 'en_b2_5_8',
          word: 'by the book',
          pronunciation: '/baɪ ðə bʊk/',
          partOfSpeech: 'idiom',
          meaningVi: 'Tuân thủ đúng từng câu chữ quy định bài bản',
          radicals: 'Metaphor: following the rulebook word-for-word',
          grammarNote: 'Collocation: do everything by the book.',
          exampleSentence: {
            target: 'When handling financial audits and government regulations, our compliance officers do everything strictly by the book.',
            pronunciation: '/wɛn ˈhændlɪŋ faɪˈnænʃəl ˈɔːdɪts ænd ˈɡʌvnmənt ˌrɛɡjʊˈleɪʃənz, ˈaʊə kəmˈplaɪəns ˈɒfɪsəz duː ˈɛvrɪθɪŋ ˈstrɪktli baɪ ðə bʊk/',
            meaningVi: 'Khi xử lý các đợt kiểm toán tài chính và quy định nhà nước, các cán bộ tuân thủ của chúng tôi làm mọi thứ hoàn toàn đúng theo sách luật.'
          }
        }
      ]
    },
    {
      id: 'en_b2_l6',
      title: 'Lesson 6: Academic Collocations for Research & Strategic Analysis',
      grammarFocus: 'Academic Verbs with Prepositional Complements: Attribute to, Correlate with, Stem from, Account for.',
      vocabularies: [
        {
          id: 'en_b2_6_1',
          word: 'empirical',
          pronunciation: '/ɪmˈpɪrɪkəl/',
          partOfSpeech: 'adj',
          meaningVi: 'Dựa trên thực nghiệm và số liệu đo đạc thực tế (Empirical data)',
          radicals: 'Etymology: Greek empeiria (experience / trial)',
          grammarNote: 'Collocation: empirical evidence, empirical research.',
          exampleSentence: {
            target: 'The hypothesis was substantiated by rigorous empirical data gathered from three randomized controlled trials.',
            pronunciation: '/ðə haɪˈpɒθɪsɪs wɒz səbˈstænʃieɪtɪd baɪ ˈrɪɡərəs ɪmˈpɪrɪkəl ˈdeɪtə ˈɡæðəd frɒm θriː ˈrændəmaɪzd kənˈtrəʊld ˈtraɪəlz/',
            meaningVi: 'Giả thuyết đã được chứng minh bởi dữ liệu thực nghiệm nghiêm ngặt thu thập từ ba thử nghiệm đối chứng ngẫu nhiên.'
          }
        },
        {
          id: 'en_b2_6_2',
          word: 'correlate',
          pronunciation: '/ˈkɒrəleɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Có mối tương quan mật thiết (Correlation)',
          radicals: 'Etymology: com- + relate',
          grammarNote: 'Collocation: positively correlate with, strongly correlate.',
          exampleSentence: {
            target: 'Research demonstrates that high employee engagement strongly correlates with improved organizational profitability.',
            pronunciation: '/rɪˈsɜːtʃ ˈdɛmənstreɪts ðæt haɪ ˌɛmplɔɪˈiː ɪnˈɡeɪdʒmənt ˈstrɒŋli ˈkɒrəleɪts wɪð ɪmˈpruːvd ˌɔːɡənaɪˈzeɪʃənəl ˌprɒfɪtəˈbɪləti/',
            meaningVi: 'Nghiên cứu chứng minh rằng sự gắn kết nhân viên cao tương quan mạnh mẽ với lợi nhuận được cải thiện của tổ chức.'
          }
        },
        {
          id: 'en_b2_6_3',
          word: 'paradigm',
          pronunciation: '/ˈpærədaɪm/',
          partOfSpeech: 'noun',
          meaningVi: 'Mô hình mẫu mực tư duy, hệ hình lý thuyết (Paradigm shift)',
          radicals: 'Etymology: Greek paradeigma (pattern / model / example)',
          grammarNote: 'Collocation: paradigm shift, dominant paradigm.',
          exampleSentence: {
            target: 'Cloud computing catalyzed a fundamental paradigm shift away from on-premise server architecture.',
            pronunciation: '/klaʊd kəmˈpjuːtɪŋ ˈkætəlaɪzd ə ˌfʌndəˈmɛntəl ˈpærədaɪm ʃɪft əˈweɪ frɒm ɒn ˈprɛmɪs ˈsɜːvər ˈɑːkɪtɛktʃə/',
            meaningVi: 'Điện toán đám mây đã xúc tác một sự chuyển dịch hệ hình căn bản rời xa kiến trúc máy chủ tại chỗ.'
          }
        },
        {
          id: 'en_b2_6_4',
          word: 'substantiate',
          pronunciation: '/səbˈstænʃieɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Đưa ra chứng cứ xác thực vững chắc để chứng minh',
          radicals: 'Etymology: Latin substantia (substance / reality)',
          grammarNote: 'Collocation: substantiate a claim, substantiate allegations.',
          exampleSentence: {
            target: 'The plaintiff failed to produce concrete documentation to substantiate their allegations of patent infringement.',
            pronunciation: '/ðə ˈpleɪntɪf feɪld tuː prəˈdjuːs ˈkɒnkriːt ˌdɒkjʊmɛnˈteɪʃən tuː səbˈstænʃieɪt ðeər ˌælɪˈɡeɪʃənz əv ˈpeɪtənt ɪnˈfrɪndʒmənt/',
            meaningVi: 'Nguyên đơn đã không thể đưa ra tài liệu cụ thể để chứng minh xác thực các cáo buộc về hành vi vi phạm bằng sáng chế.'
          }
        },
        {
          id: 'en_b2_6_5',
          word: 'methodology',
          pronunciation: '/ˌmɛθəˈdɒlədʒi/',
          partOfSpeech: 'noun',
          meaningVi: 'Phương pháp luận nghiên cứu khoa học',
          radicals: 'Method + -ology (nghiên cứu)',
          grammarNote: 'Collocation: rigorous methodology, research methodology.',
          exampleSentence: {
            target: 'The scientific journal praised the authors for their innovative qualitative and quantitative research methodology.',
            pronunciation: '/ðə ˌsaɪənˈtɪfɪk ˈdʒɜːnəl preɪzd ði ˈɔːθəz fɔː ðeər ˈɪnəvətɪv ˈkwɒlɪtətɪv ænd ˈkwɒntɪtətɪv rɪˈsɜːtʃ ˌmɛθəˈdɒlədʒi/',
            meaningVi: 'Tạp chí khoa học đã ca ngợi các tác giả về phương pháp luận nghiên cứu định tính và định lượng mang tính đổi mới của họ.'
          }
        },
        {
          id: 'en_b2_6_6',
          word: 'inherent',
          pronunciation: '/ɪnˈhɪərənt/',
          partOfSpeech: 'adj',
          meaningVi: 'Vốn có, nội tại không thể tách rời',
          radicals: 'Etymology: Latin inhaerere (stick in / belong to)',
          grammarNote: 'Collocation: inherent risk, inherent limitation.',
          exampleSentence: {
            target: 'Every venture investment carries an inherent level of risk that cannot be entirely eradicated.',
            pronunciation: '/ˈɛvri ˈvɛntʃər ɪnˈvɛstmənt ˈkæriz ən ɪnˈhɪərənt ˈlɛvəl əv rɪsk ðæt ˈkænɒt biː ɪnˈtaɪəli ɪˈrædɪkeɪtɪd/',
            meaningVi: 'Mỗi khoản đầu tư mạo hiểm đều mang một mức độ rủi ro nội tại vốn có mà không thể triệt tiêu hoàn toàn.'
          }
        },
        {
          id: 'en_b2_6_7',
          word: 'comprehensive',
          pronunciation: '/ˌkɒmprɪˈhɛnsɪv/',
          partOfSpeech: 'adj',
          meaningVi: 'Toàn diện bao quát mọi khía cạnh',
          radicals: 'Etymology: Latin comprehendere (grasp completely)',
          grammarNote: 'Collocation: comprehensive report, comprehensive evaluation.',
          exampleSentence: {
            target: 'The strategic consulting team presented a comprehensive competitive landscape analysis to the steering committee.',
            pronunciation: '/ðə strəˈtiːdʒɪk kənˈsʌltɪŋ tiːm prɪˈzɛntɪd ə ˌkɒmprɪˈhɛnsɪv kəmˈpɛtɪtɪv ˈlændskeɪp əˈnæləsɪs tuː ðə ˈstɪərɪŋ kəˈmɪti/',
            meaningVi: 'Nhóm tư vấn chiến lược đã trình bày một bản phân tích bối cảnh cạnh tranh toàn diện trước ban chỉ đạo.'
          }
        },
        {
          id: 'en_b2_6_8',
          word: 'prevalent',
          pronunciation: '/ˈprɛvələnt/',
          partOfSpeech: 'adj',
          meaningVi: 'Phổ biến rộng khắp, thịnh hành',
          radicals: 'Etymology: Latin praevalere (prevail / have greater power)',
          grammarNote: 'Collocation: widely prevalent, prevalent trend.',
          exampleSentence: {
            target: 'Remote asynchronous collaboration has become increasingly prevalent across distributed international software engineering companies.',
            pronunciation: '/rɪˈməʊt eɪˈsɪŋkrənəs kəˌlæbəˈreɪʃən hæz bɪˈkʌm ɪnˈkriːsɪŋli ˈprɛvələnt əˈkrɒs dɪˈstrɪbjuːtɪd ˌɪntəˈnæʃənəl ˈsɒftweər ˌɛndʒɪˈnɪərɪŋ ˈkʌmpəniz/',
            meaningVi: 'Cộng tác bất đồng bộ từ xa đã trở nên ngày càng phổ biến rộng khắp trong các công ty kỹ thuật phần mềm quốc tế phân tán.'
          }
        }
      ]
    },
    {
      id: 'en_b2_l7',
      title: 'Lesson 7: Corporate Crisis Management & Media Relations',
      grammarFocus: 'Emphatic Structures & Inversion in Public Statements: Under no circumstances will we compromise user privacy.',
      vocabularies: [
        {
          id: 'en_b2_7_1',
          word: 'containment',
          pronunciation: '/kənˈteɪnmənt/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự kiềm chế bao vây dập tắt sự cố (Crisis containment)',
          radicals: 'Etymology: contain + -ment',
          grammarNote: 'Collocation: damage containment strategy, breach containment.',
          exampleSentence: {
            target: 'The cybersecurity incident response unit implemented rapid containment protocols to isolate compromised network segments.',
            pronunciation: '/ðə ˈsaɪbəsɪˌkjʊərəti ˈɪnsɪdənt rɪˈspɒns ˈjuːnɪt ˈɪmplɪmɛntɪd ˈræpɪd kənˈteɪnmənt ˈprəʊtəkɒlz tuː ˈaɪsəleɪt ˈkɒmprəmaɪzd ˈnɛtwɜːk ˈsɛɡmənts/',
            meaningVi: 'Đơn vị ứng phó sự cố an ninh mạng đã triển khai các quy trình bao vây nhanh chóng để cô lập các phân đoạn mạng bị xâm nhập.'
          }
        },
        {
          id: 'en_b2_7_2',
          word: 'transparency',
          pronunciation: '/trænsˈpærənsi/',
          partOfSpeech: 'noun',
          meaningVi: 'Tính minh bạch rõ ràng trước công chúng',
          radicals: 'Etymology: Latin trans- (through) + parere (appear)',
          grammarNote: 'Collocation: maintain transparency, lack of transparency.',
          exampleSentence: {
            target: 'Demonstrating radical transparency during corporate investigations is essential for rebuilding eroded customer trust.',
            pronunciation: '/ˈdɛmənstreɪtɪŋ ˈrædɪkəl trænsˈpærənsi ˈdjʊərɪŋ ˈkɔːpərət ɪnˌvɛstɪˈɡeɪʃənz ɪz ɪˈsɛnʃəl fɔː ˌriːˈbɪldɪŋ ɪˈrəʊdɪd ˈkʌstəmə trʌst/',
            meaningVi: 'Thể hiện sự minh bạch triệt để trong các cuộc điều tra doanh nghiệp là điều cần thiết để xây dựng lại niềm tin khách hàng đã bị xói mòn.'
          }
        },
        {
          id: 'en_b2_7_3',
          word: 'fallout',
          pronunciation: '/ˈfɔːlaʊt/',
          partOfSpeech: 'noun',
          meaningVi: 'Hệ lụy tiêu cực nặng nề sau biến cố',
          radicals: 'Etymology: fall + out (originally radioactive fallout)',
          grammarNote: 'Collocation: political fallout, economic fallout.',
          exampleSentence: {
            target: 'The company suffered severe financial and reputational fallout following the recall of two million defective units.',
            pronunciation: '/ðə ˈkʌmpəni ˈsʌfəd sɪˈvɪə faɪˈnænʃəl ænd ˌrɛpjʊˈteɪʃənəl ˈfɔːlaʊt ˈfɒləʊɪŋ ðə rɪˈkɔːl əv tuː ˈmɪljən dɪˈfɛktɪv ˈjuːnɪts/',
            meaningVi: 'Công ty đã phải gánh chịu những hệ lụy nặng nề về tài chính và danh tiếng sau vụ thu hồi 2 triệu sản phẩm bị lỗi.'
          }
        },
        {
          id: 'en_b2_7_4',
          word: 'spokesperson',
          pronunciation: '/ˈspəʊksˌpɜːsən/',
          partOfSpeech: 'noun',
          meaningVi: 'Người phát ngôn chính thức trước báo giới',
          radicals: 'Spokes (nói) + Person',
          grammarNote: 'Collocation: designated company spokesperson.',
          exampleSentence: {
            target: 'The chief communications officer served as the sole authorized spokesperson at the live televised press briefing.',
            pronunciation: '/ðə tʃiːf kəˌmjuːnɪˈkeɪʃənz ˈɒfɪsə sɜːvd æz ðə səʊl ˈɔːθəraɪzd ˈspəʊksˌpɜːsən æt ðə laɪv ˈtɛlɪvaɪzd prɛs ˈbriːfɪŋ/',
            meaningVi: 'Giám đốc truyền thông đóng vai trò là người phát ngôn ủy quyền duy nhất tại buổi họp báo truyền hình trực tiếp.'
          }
        },
        {
          id: 'en_b2_7_5',
          word: 'defuse',
          pronunciation: '/diːˈfjuːz/',
          partOfSpeech: 'verb',
          meaningVi: 'Tháo ngòi nổ, xoa dịu căng thẳng đối đầu',
          radicals: 'Etymology: de- (remove) + fuse (bomb trigger)',
          grammarNote: 'Collocation: defuse a tense standoff, defuse the crisis.',
          exampleSentence: {
            target: 'A prompt public apology accompanied by concrete restitution helped defuse mounting stakeholder outrage.',
            pronunciation: '/ə prɒmpt ˈpʌblɪk əˈpɒlədʒi əˈkʌmpənid baɪ ˈkɒnkriːt ˌrɛstɪˈtjuːʃən hɛlpt diːˈfjuːz ˈmaʊntɪŋ ˈsteɪkˌhəʊldər ˈaʊtreɪdʒ/',
            meaningVi: 'Lời xin lỗi công khai kịp thời kèm theo sự bồi thường cụ thể đã giúp xoa dịu sự phẫn nộ ngày càng tăng của các bên liên quan.'
          }
        },
        {
          id: 'en_b2_7_6',
          word: 'backlash',
          pronunciation: '/ˈbæklæʃ/',
          partOfSpeech: 'noun',
          meaningVi: 'Làn sóng phản ứng dữ dội bài xích từ công chúng',
          radicals: 'Etymology: mechanical recoil of gear teeth',
          grammarNote: 'Collocation: face severe public backlash.',
          exampleSentence: {
            target: 'The proposed pricing restructure triggered fierce public backlash across social media forums.',
            pronunciation: '/ðə prəˈpəʊzd ˈpraɪsɪŋ ˌriːˈstrʌktʃə ˈtrɪɡəd fɪəs ˈpʌblɪk ˈbæklæʃ əˈkrɒs ˈsəʊʃəl ˈmiːdiə ˈfɔːrəmz/',
            meaningVi: 'Kế hoạch tái cấu trúc giá đề xuất đã kích hoạt một làn sóng phản ứng dữ dội từ công chúng trên khắp các diễn đàn mạng xã hội.'
          }
        },
        {
          id: 'en_b2_7_7',
          word: 'accountability',
          pronunciation: '/əˌkaʊntəˈbɪləti/',
          partOfSpeech: 'noun',
          meaningVi: 'Trách nhiệm giải trình trước cổ đông và công chúng',
          radicals: 'Etymology: account + -ability',
          grammarNote: 'Collocation: hold leaders to accountability, corporate accountability.',
          exampleSentence: {
            target: 'The CEO took personal accountability for the compliance failure and offered his immediate resignation.',
            pronunciation: '/ðə ˌsiː iː ˈəʊ tʊk ˈpɜːsənəl əˌkaʊntəˈbɪləti fɔː ðə kəmˈplaɪəns ˈfeɪljər ænd ˈɒfəd hɪz ɪˈmiːdiət ˌrɛzɪɡˈneɪʃən/',
            meaningVi: 'Tổng giám đốc đã nhận trách nhiệm giải trình cá nhân về sai phạm tuân thủ và đệ đơn từ chức ngay lập tức.'
          }
        },
        {
          id: 'en_b2_7_8',
          word: 'restitution',
          pronunciation: '/ˌrɛstɪˈtjuːʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự bồi hoàn đền bù tổn thất danh dự tài chính',
          radicals: 'Etymology: Latin restituere (restore / replace)',
          grammarNote: 'Collocation: make financial restitution.',
          exampleSentence: {
            target: 'The settlement mandated the corporate wrongdoer to pay fifty million dollars in restitution to defrauded investors.',
            pronunciation: '/ðə ˈsɛtlmənt ˈmændeɪtɪd ðə ˈkɔːpərət ˈrɒŋˌduːə tuː peɪ ˈfɪfti ˈmɪljən ˈdɒləz ɪn ˌrɛstɪˈtjuːʃən tuː dɪˈfrɔːdɪd ɪnˈvɛstəz/',
            meaningVi: 'Thỏa thuận hòa giải đã bắt buộc bên doanh nghiệp vi phạm phải chi trả 50 triệu USD tiền bồi hoàn cho các nhà đầu tư bị lừa gạt.'
          }
        }
      ]
    },
    {
      id: 'en_b2_l8',
      title: 'Lesson 8: Cross-Cultural Communication & Multinational Etiquette',
      grammarFocus: 'High-context vs. Low-context Nuances: Softening directives with Would you mind, It might be advisable to.',
      vocabularies: [
        {
          id: 'en_b2_8_1',
          word: 'etiquette',
          pronunciation: '/ˈɛtɪkɛt/',
          partOfSpeech: 'noun',
          meaningVi: 'Nghi thức ứng xử lễ nghi ngoại giao văn hóa',
          radicals: 'Etymology: French étiquette (prescribed ceremony / label)',
          grammarNote: 'Collocation: business etiquette, diplomatic etiquette.',
          exampleSentence: {
            target: 'Mastering international business etiquette prevents unintentional cultural offenses during high-level bilateral negotiations.',
            pronunciation: '/ˈmɑːstərɪŋ ˌɪntəˈnæʃənəl ˈbɪznɪs ˈɛtɪkɛt prɪˈvɛnts ˌʌnɪnˈtɛnʃənəl ˈkʌltʃərəl əˈfɛnsɪz ˈdjʊərɪŋ haɪ ˈlɛvəl baɪˈlætərəl nɪˌɡəʊʃiˈeɪʃənz/',
            meaningVi: 'Nắm vững nghi thức kinh doanh quốc tế giúp ngăn ngừa các sự xúc phạm văn hóa vô ý trong các cuộc đàm phán song phương cấp cao.'
          }
        },
        {
          id: 'en_b2_8_2',
          word: 'nuance',
          pronunciation: '/ˈnjuːɑːns/',
          partOfSpeech: 'noun',
          meaningVi: 'Sắc thái tinh tế tế nhị trong giao tiếp',
          radicals: 'Etymology: French nuer (shade with colors) from nue (cloud)',
          grammarNote: 'Collocation: subtle nuances, cultural nuances.',
          exampleSentence: {
            target: 'Interpreting subtle cultural nuances in tone and body language is essential when closing deals in East Asian markets.',
            pronunciation: '/ɪnˈtɜːprɪtɪŋ ˈsʌtəl ˈkʌltʃərəl ˈnjuːɑːnsɪz ɪn təʊn ænd ˈbɒdi ˈlæŋɡwɪdʒ ɪz ɪˈsɛnʃəl wɛn ˈkləʊzɪŋ diːlz ɪn iːst ˈeɪʒən ˈmɑːkɪts/',
            meaningVi: 'Diễn giải các sắc thái văn hóa tinh tế trong ngữ điệu và ngôn ngữ cơ thể là điều tối quan trọng khi chốt các thương vụ tại các thị trường Đông Á.'
          }
        },
        {
          id: 'en_b2_8_3',
          word: 'hierarchy',
          pronunciation: '/ˈhaɪərɑːki/',
          partOfSpeech: 'noun',
          meaningVi: 'Trật tự cấp bậc tôn ti thứ bậc trong tổ chức',
          radicals: 'Etymology: Greek hierarkhes (sacred ruler)',
          grammarNote: 'Collocation: corporate hierarchy, respect the hierarchy.',
          exampleSentence: {
            target: 'In high-power-distance corporate cultures, decision-making is strictly centralized at the top of the managerial hierarchy.',
            pronunciation: '/ɪn haɪ ˈpaʊə ˈdɪstəns ˈkɔːpərət ˈkʌltʃəz, dɪˈsɪʒən ˈmeɪkɪŋ ɪz ˈstrɪktli ˈsɛntrəlaɪzd æt ðə tɒp əv ðə ˌmænəˈdʒɪəriəl ˈhaɪərɑːki/',
            meaningVi: 'Trong các nền văn hóa doanh nghiệp có khoảng cách quyền lực cao, việc ra quyết định được tập trung nghiêm ngặt ở đỉnh của thứ bậc quản lý.'
          }
        },
        {
          id: 'en_b2_8_4',
          word: 'diplomatic',
          pronunciation: '/ˌdɪpləˈmætɪk/',
          partOfSpeech: 'adj',
          meaningVi: 'Khéo léo tế nhị mang tính ngoại giao',
          radicals: 'Etymology: Greek diploma (folded state document)',
          grammarNote: 'Collocation: diplomatic tact, diplomatic language.',
          exampleSentence: {
            target: 'She gave a diplomatic refusal that preserved the friendly relationship without committing to unprofitable contract terms.',
            pronunciation: '/ʃiː ɡeɪv ə ˌdɪpləˈmætɪk rɪˈfjuːzəl ðæt prɪˈzɜːvd ðə ˈfrɛndli rɪˈleɪʃənʃɪp wɪðˈaʊt kəˈmɪtɪŋ tuː ʌnˈprɒfɪtəbəl ˈkɒntrækt tɜːmz/',
            meaningVi: 'Cô ấy đã đưa ra lời từ chối khéo léo mang tính ngoại giao giúp gìn giữ mối quan hệ thân thiện mà không phải cam kết các điều khoản hợp đồng bất lợi.'
          }
        },
        {
          id: 'en_b2_8_5',
          word: 'consensus',
          pronunciation: '/kənˈsɛnsəs/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự đồng thuận chung của cả tập thể',
          radicals: 'Etymology: Latin consentire (feel together / agree)',
          grammarNote: 'Collocation: build consensus, reach a general consensus.',
          exampleSentence: {
            target: 'Japanese corporations prioritize extensive prior consultation (nemawashi) to build unanimous consensus before formal board meetings.',
            pronunciation: '/ˌdʒæpəˈniːz ˌkɔːpəˈreɪʃənz praɪˈɒrɪtaɪz ɪkˈstɛnsɪv ˈpraɪər ˌkɒnsəlˈteɪʃən tuː bɪld juːˈnænɪməs kənˈsɛnsəs bɪˈfɔː ˈfɔːməl bɔːd ˈmiːtɪŋz/',
            meaningVi: 'Các tập đoàn Nhật Bản ưu tiên việc tham vấn sâu rộng từ trước (nemawashi) để xây dựng sự đồng thuận nhất trí trước các cuộc họp hội đồng quản trị chính thức.'
          }
        },
        {
          id: 'en_b2_8_6',
          word: 'stereotyping',
          pronunciation: '/ˈstɛrɪətaɪpɪŋ/',
          partOfSpeech: 'noun',
          meaningVi: 'Thói quy chụp định kiến rập khuôn',
          radicals: 'Etymology: Greek stereos (solid) + typos (impression)',
          grammarNote: 'Collocation: avoid cultural stereotyping.',
          exampleSentence: {
            target: 'Global diversity training programs train leaders to recognize individual merits rather than relying on cultural stereotyping.',
            pronunciation: '/ˈɡləʊbəl daɪˈvɜːsəti ˈtreɪnɪŋ ˈprəʊɡræmz treɪn ˈliːdəz tuː ˈrɛkəɡnaɪz ˌɪndɪˈvɪdʒuəl ˈmɛrɪts ˈrɑːðə ðæn rɪˈlaɪɪŋ ɒn ˈkʌltʃərəl ˈstɛrɪətaɪpɪŋ/',
            meaningVi: 'Các chương trình đào tạo đa dạng toàn cầu rèn luyện cho các nhà lãnh đạo nhận ra giá trị cá nhân thay vì dựa dẫm vào định kiến văn hóa rập khuôn.'
          }
        },
        {
          id: 'en_b2_8_7',
          word: 'reciprocity',
          pronunciation: '/ˌrɛsɪˈprɒsəti/',
          partOfSpeech: 'noun',
          meaningVi: 'Nguyên tắc có qua có lại (Reciprocity principle)',
          radicals: 'Etymology: Latin reciprocus (moving back and forth)',
          grammarNote: 'Collocation: mutual reciprocity in trade.',
          exampleSentence: {
            target: 'International trade agreements are grounded in the fundamental legal principle of mutual tariff reciprocity.',
            pronunciation: '/ˌɪntəˈnæʃənəl treɪd əˈɡriːmənts ɑː ˈɡraʊndɪd ɪn ðə ˌfʌndəˈmɛntəl ˈliːɡəl ˈprɪnsəpəl əv ˈmjuːtʃuəl ˈtærɪf ˌrɛsɪˈprɒsəti/',
            meaningVi: 'Các hiệp định thương mại quốc tế được đặt nền tảng trên nguyên tắc pháp lý căn bản về sự có qua có lại trong thuế quan lẫn nhau.'
          }
        },
        {
          id: 'en_b2_8_8',
          word: 'bilingual',
          pronunciation: '/baɪˈlɪŋɡwəl/',
          partOfSpeech: 'adj/noun',
          meaningVi: 'Song ngữ thông thạo hai thứ tiếng',
          radicals: 'Bi- (hai) + Lingual (thuộc về ngôn ngữ)',
          grammarNote: 'Collocation: bilingual fluency, bilingual contract.',
          exampleSentence: {
            target: 'Employing bilingual negotiators bridged linguistic divides and accelerated cross-border joint venture execution.',
            pronunciation: '/ɪmˈplɔɪɪŋ baɪˈlɪŋɡwəl nɪˈɡəʊʃieɪtəz brɪdʒd lɪŋˈɡwɪstɪk dɪˈvaɪdz ænd əkˈsɛləreɪtɪd krɒs ˈbɔːdə dʒɔɪnt ˈvɛntʃər ˌɛksɪˈkjuːʃən/',
            meaningVi: 'Thuê các chuyên gia đàm phán song ngữ đã bắc nhịp cầu qua rào cản ngôn ngữ và đẩy nhanh tiến độ thực hiện liên doanh xuyên biên giới.'
          }
        }
      ]
    },
    {
      id: 'en_b2_l9',
      title: 'Lesson 9: Product Innovation & Go-to-Market Strategy',
      grammarFocus: 'Noun Phrases & Nominalization for Business Pitching: Value proposition, Product-market fit, Customer acquisition cost.',
      vocabularies: [
        {
          id: 'en_b2_9_1',
          word: 'value proposition',
          pronunciation: '/ˈvæljuː ˌprɒpəˈzɪʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Tuyên ngôn giá trị độc nhất của sản phẩm mang lại cho khách hàng',
          radicals: 'Value + Proposition',
          grammarNote: 'Collocation: compelling value proposition, unique value proposition (UVP).',
          exampleSentence: {
            target: 'A compelling value proposition clearly articulates how the software solves pressing operational bottlenecks better than competitors.',
            pronunciation: '/ə kəmˈpɛlɪŋ ˈvæljuː ˌprɒpəˈzɪʃən ˈklɪəli ɑːˈtɪkjʊleɪts haʊ ðə ˈsɒftweə sɒlvz ˈprɛsɪŋ ˌɒpəˈreɪʃənəl ˈbɒtəlnɛks ˈbɛtə ðæn kəmˈpɛtɪtəz/',
            meaningVi: 'Một tuyên ngôn giá trị hấp dẫn nêu rõ ràng cách thức mà phần mềm giải quyết các điểm nghẽn vận hành cấp bách tốt hơn đối thủ cạnh tranh.'
          }
        },
        {
          id: 'en_b2_9_2',
          word: 'go-to-market',
          pronunciation: '/ɡəʊ tuː ˈmɑːkɪt/',
          partOfSpeech: 'adj/noun',
          meaningVi: 'Chiến lược đưa sản phẩm ra thị trường (GTM strategy)',
          radicals: 'Go + To + Market',
          grammarNote: 'Collocation: comprehensive GTM strategy, product rollout.',
          exampleSentence: {
            target: 'Our cross-functional team formulated an aggressive go-to-market strategy targeting enterprise fintech clients.',
            pronunciation: '/ˈaʊə krɒs ˈfʌŋkʃənəl tiːm ˈfɔːmjʊleɪtɪd ən əˈɡrɛsɪv ɡəʊ tuː ˈmɑːkɪt ˈstrætɪdʒi ˈtɑːɡɪtɪŋ ˈɛntəpraɪz ˈfɪntɛk ˈklaɪənts/',
            meaningVi: 'Đội ngũ đa chức năng của chúng tôi đã xây dựng một chiến lược tung sản phẩm ra thị trường quyết liệt nhắm vào các khách hàng công nghệ tài chính doanh nghiệp lớn.'
          }
        },
        {
          id: 'en_b2_9_3',
          word: 'monetize',
          pronunciation: '/ˈmʌnɪtaɪz/',
          partOfSpeech: 'verb',
          meaningVi: 'Thương mại hóa kiếm ra tiền từ sản phẩm/traffic (Monetization)',
          radicals: 'Etymology: money + -ize',
          grammarNote: 'Collocation: monetize user traffic, monetization model.',
          exampleSentence: {
            target: 'The digital platform monetizes its massive active audience through tiered subscription tiers and targeted advertising.',
            pronunciation: '/ðə ˈdɪdʒɪtəl ˈplætfɔːm ˈmʌnɪtaɪzɪz ɪts ˈmæsɪv ˈæktɪv ˈɔːdiəns θruː tɪəd səbˈskrɪpʃən tɪəz ænd ˈtɑːɡɪtɪd ˈædvətaɪzɪŋ/',
            meaningVi: 'Nền tảng kỹ thuật số kiếm tiền từ lượng khán giả hoạt động khổng lồ của mình thông qua các gói thuê bao phân cấp và quảng cáo mục tiêu.'
          }
        },
        {
          id: 'en_b2_9_4',
          word: 'traction',
          pronunciation: '/ˈtrækʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Độ bám thị trường, sức hút chứng minh sản phẩm được đón nhận (Market traction)',
          radicals: 'Etymology: Latin trahere (to pull / drag)',
          grammarNote: 'Collocation: gain early traction, prove traction to venture investors.',
          exampleSentence: {
            target: 'Reaching one hundred thousand monthly recurring revenue in six months demonstrated undeniable early market traction.',
            pronunciation: '/ˈriːtʃɪŋ wʌn ˈhʌndrəd ˈθaʊzənd ˈmʌnθli rɪˈkɜːrɪŋ ˈrɛvɪnjuː ɪn sɪks mʌnθs ˈdɛmənstreɪtɪd ˌʌndɪˈnaɪəbəl ˈɜːli ˈmɑːkɪt ˈtrækʃən/',
            meaningVi: 'Đạt mốc 100.000 USD doanh thu định kỳ hàng tháng trong 6 tháng đã chứng minh sức hút sớm không thể phủ nhận trên thị trường.'
          }
        },
        {
          id: 'en_b2_9_5',
          word: 'scalability',
          pronunciation: '/ˌskeɪləˈbɪləti/',
          partOfSpeech: 'noun',
          meaningVi: 'Khả năng mở rộng quy mô kinh doanh không bị đội chi phí',
          radicals: 'Scale + -ability',
          grammarNote: 'Collocation: infrastructure scalability, high business scalability.',
          exampleSentence: {
            target: 'Software-as-a-service business models offer unparalleled gross margins and near-infinite geographic scalability.',
            pronunciation: '/ˈsɒftweər æz ə ˈsɜːvɪs ˈbɪznɪs ˈmɒdəlz ˈɒfər ʌnˈpærəlɛld ɡrəʊs ˈmɑːdʒɪnz ænd nɪər ˈɪnfɪnɪt ˌdʒiːəˈɡræfɪk ˌskeɪləˈbɪləti/',
            meaningVi: 'Mô hình kinh doanh phần mềm dạng dịch vụ (SaaS) mang lại biên lợi nhuận gộp vô song và khả năng mở rộng địa lý gần như vô hạn.'
          }
        },
        {
          id: 'en_b2_9_6',
          word: 'pivot',
          pronunciation: '/ˈpɪvət/',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Xoay trục chiến lược kinh doanh khi mô hình cũ không hiệu quả',
          radicals: 'Etymology: French pivot (pin / central turning point)',
          grammarNote: 'Collocation: execute a strategic pivot, pivot toward B2B.',
          exampleSentence: {
            target: 'When direct-to-consumer sales stalled, the founding team executed a decisive pivot toward enterprise enterprise licensing.',
            pronunciation: '/wɛn dɪˈrɛkt tuː kənˈsjuːmə seɪlz stɔːld, ðə ˈfaʊndɪŋ tiːm ˈɛksɪkjuːtɪd ə dɪˈsaɪsɪv ˈpɪvət təˈwɔːdz ˈɛntəpraɪz ˈlaɪsənsɪŋ/',
            meaningVi: 'Khi doanh số bán hàng trực tiếp tới người tiêu dùng chững lại, đội ngũ sáng lập đã thực hiện cú xoay trục quyết đoán sang cấp phép cho doanh nghiệp lớn.'
          }
        },
        {
          id: 'en_b2_9_7',
          word: 'churn',
          pronunciation: '/tʃɜːn/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Tỷ lệ khách hàng hủy bỏ dịch vụ rời đi (Churn rate)',
          radicals: 'Etymology: Old English cyrn (vessel for agitating milk into butter)',
          grammarNote: 'Collocation: low customer churn rate, reduce subscriber churn.',
          exampleSentence: {
            target: 'By improving post-onboarding customer success support, the company managed to reduce monthly churn to under one percent.',
            pronunciation: '/baɪ ɪmˈpruːvɪŋ pəʊst ˈɒnˌbɔːdɪŋ ˈkʌstəmə səkˈsɛs səˈpɔːt, ðə ˈkʌmpəni ˈmænɪdʒd tuː rɪˈdjuːs ˈmʌnθli tʃɜːn tuː ˈʌndə wʌn pəˈsɛnt/',
            meaningVi: 'Bằng cách cải thiện việc hỗ trợ khách hàng thành công sau gia nhập, công ty đã giảm được tỷ lệ rời bỏ hàng tháng xuống dưới 1%.'
          }
        },
        {
          id: 'en_b2_9_8',
          word: 'differentiation',
          pronunciation: '/ˌdɪfəˌrɛnʃiˈeɪʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự khác biệt hóa sản phẩm trên thị trường',
          radicals: 'Etymology: differentiate + -tion',
          grammarNote: 'Collocation: product differentiation, competitive differentiation.',
          exampleSentence: {
            target: 'In crowded commoditized markets, proprietary customer experience design provides the strongest sustainable differentiation.',
            pronunciation: '/ɪn ˈkraʊdɪd kəˈmɒdɪtaɪzd ˈmɑːkɪts, prəˈpraɪətəri ˈkʌstəmər ɪkˈspɪəriəns dɪˈzaɪn prəˈvaɪdz ðə ˈstrɒŋɡɪst səˈsteɪnəbəl ˌdɪfəˌrɛnʃiˈeɪʃən/',
            meaningVi: 'Trong những thị trường hàng hóa đại trà chật chội, thiết kế trải nghiệm khách hàng độc quyền cung cấp sự khác biệt hóa bền vững mạnh mẽ nhất.'
          }
        }
      ]
    },
    {
      id: 'en_b2_l10',
      title: 'Lesson 10: Corporate Social Responsibility (CSR) & ESG Mandates',
      grammarFocus: 'Passive Reporting Verbs: It is reported that, Companies are expected to, Has been documented to.',
      vocabularies: [
        {
          id: 'en_b2_10_1',
          word: 'governance',
          pronunciation: '/ˈɡʌvənəns/',
          partOfSpeech: 'noun',
          meaningVi: 'Quản trị điều hành doanh nghiệp (Chữ G trong ESG)',
          radicals: 'Etymology: govern + -ance',
          grammarNote: 'Collocation: corporate governance, transparent governance.',
          exampleSentence: {
            target: 'Institutional investors demand exemplary corporate governance standards with independent board oversight and audited disclosures.',
            pronunciation: '/ˌɪnstɪˈtjuːʃənəl ɪnˈvɛstəz dɪˈmɑːnd ɪɡˈzɛmpləri ˈkɔːpərət ˈɡʌvənəns ˈstændədz wɪð ˌɪndɪˈpɛndənt bɔːd ˈəʊvəsaɪt ænd ˈɔːdɪtɪd dɪsˈkləʊʒəz/',
            meaningVi: 'Các nhà đầu tư tổ chức yêu cầu các tiêu chuẩn quản trị doanh nghiệp mẫu mực với sự giám sát độc lập của hội đồng quản trị và công bố thông tin được kiểm toán.'
          }
        },
        {
          id: 'en_b2_10_2',
          word: 'compliance',
          pronunciation: '/kəmˈplaɪəns/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự tuân thủ pháp luật và quy chuẩn ngành (Compliance)',
          radicals: 'Etymology: comply + -ance',
          grammarNote: 'Collocation: regulatory compliance, strict compliance.',
          exampleSentence: {
            target: 'Non-compliance with international anti-money-laundering regulations triggers devastating penalties and asset freezes.',
            pronunciation: '/nɒn kəmˈplaɪəns wɪð ˌɪntəˈnæʃənəl ˈænti ˈmʌni ˈlɔːndərɪŋ ˌrɛɡjʊˈleɪʃənz ˈtrɪɡəz ˈdɛvəsteɪtɪŋ ˈpɛnəltiz ænd ˈæsɛt ˈfriːzɪz/',
            meaningVi: 'Không tuân thủ các quy định chống rửa tiền quốc tế sẽ dẫn đến các hình phạt tàn khốc và việc đóng băng tài sản.'
          }
        },
        {
          id: 'en_b2_10_3',
          word: 'stakeholder',
          pronunciation: '/ˈsteɪkˌhəʊldər/',
          partOfSpeech: 'noun',
          meaningVi: 'Bên liên quan lợi ích (Cổ đông, nhân viên, cộng đồng, đối tác)',
          radicals: 'Stake (phần lợi ích/cổ phần) + Holder (người nắm giữ)',
          grammarNote: 'Collocation: stakeholder capitalism, key stakeholders.',
          exampleSentence: {
            target: 'Modern corporate leadership balances shareholder financial returns against broader social and environmental stakeholder interests.',
            pronunciation: '/ˈmɒdən ˈkɔːpərət ˈliːdəʃɪp ˈbælənsɪz ˈʃeəˌhəʊldə faɪˈnænʃəl rɪˈtɜːnz əˈɡɛnst ˈbrɔːdə ˈsəʊʃəl ænd ɪnˌvaɪrənˈmɛntəl ˈsteɪkˌhəʊldər ˈɪntrɪsts/',
            meaningVi: 'Khả năng lãnh đạo doanh nghiệp hiện đại cân bằng giữa lợi nhuận tài chính của cổ đông với lợi ích rộng lớn hơn của các bên liên quan về xã hội và môi trường.'
          }
        },
        {
          id: 'en_b2_10_4',
          word: 'philanthropy',
          pronunciation: '/fɪˈlænθrəpi/',
          partOfSpeech: 'noun',
          meaningVi: 'Hoạt động từ thiện bác ái vì cộng đồng nhân loại',
          radicals: 'Etymology: Greek philein (to love) + anthropos (mankind)',
          grammarNote: 'Collocation: corporate philanthropy, philanthropic foundation.',
          exampleSentence: {
            target: 'Tech billionaires established charitable foundations directing substantial philanthropic endowments toward eradicating infectious diseases.',
            pronunciation: '/tɛk ˌbɪljəˈneəz ɪsˈtæblɪʃt ˈtʃærɪtəbəl faʊnˈdeɪʃənz dɪˈrɛktɪŋ səbˈstænʃəl ˌfɪlənˈθrɒpɪk ɪnˈdaʊmənts təˈwɔːdz ɪˈrædɪkeɪtɪŋ ɪnˈfɛkʃəs dɪˈziːzɪz/',
            meaningVi: 'Các tỷ phú công nghệ đã thành lập các quỹ từ thiện chuyển các khoản tài trợ thiện nguyện đáng kể vào việc thanh toán các bệnh truyền nhiễm.'
          }
        },
        {
          id: 'en_b2_10_5',
          word: 'greenwashing',
          pronunciation: '/ˈɡriːnˌwɒʃɪŋ/',
          partOfSpeech: 'noun',
          meaningVi: 'Tẩy xanh, chiêu bài PR giả vờ thân thiện môi trường để lừa dối',
          radicals: 'Green + Whitewashing (quét vôi trắng che giấu khuyết điểm)',
          grammarNote: 'Collocation: accused of greenwashing, transparent ESG vs greenwashing.',
          exampleSentence: {
            target: 'Regulatory authorities are penalizing consumer brands caught engaging in deceptive greenwashing marketing claims.',
            pronunciation: '/ˌrɛɡjʊˈleɪtəri ɔːˈθɒrɪtiz ɑː ˈpiːnəlaɪzɪŋ kənˈsjuːmə brændz kɔːt ɪnˈɡeɪdʒɪŋ ɪn dɪˈsɛptɪv ˈɡriːnˌwɒʃɪŋ ˈmɑːkɪtɪŋ kleɪmz/',
            meaningVi: 'Các cơ quan quản lý đang xử phạt các thương hiệu tiêu dùng bị bắt quả tang tham gia vào các tuyên bố tiếp thị tẩy xanh lừa dối.'
          }
        },
        {
          id: 'en_b2_10_6',
          word: 'ethical',
          pronunciation: '/ˈɛθɪkəl/',
          partOfSpeech: 'adj',
          meaningVi: 'Đạt chuẩn mực đạo đức kinh doanh',
          radicals: 'Etymology: Greek ethos (moral character / nature)',
          grammarNote: 'Collocation: ethical sourcing, ethical standards.',
          exampleSentence: {
            target: 'Retail consumers increasingly boycott apparel brands that fail to enforce ethical labor standards across overseas sweatshops.',
            pronunciation: '/ˈriːteɪl kənˈsjuːməz ɪnˈkriːsɪŋli ˈbɔɪkɒt əˈpærəl brændz ðæt feɪl tuː ɪnˈfɔːs ˈɛθɪkəl ˈleɪbə ˈstændədz əˈkrɒs ˌəʊvəˈsiːz ˈswɛtʃɒps/',
            meaningVi: 'Người tiêu dùng bán lẻ ngày càng tẩy chay các thương hiệu may mặc không thực thi các tiêu chuẩn lao động có đạo đức tại các xưởng bóc lột ở nước ngoài.'
          }
        },
        {
          id: 'en_b2_10_7',
          word: 'inclusion',
          pronunciation: '/ɪnˈkluːʒən/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự hòa nhập hòa nhập xã hội (Diversity, Equity, and Inclusion - DEI)',
          radicals: 'Etymology: Latin includere (shut in / enclose)',
          grammarNote: 'Collocation: foster inclusion, diversity and inclusion.',
          exampleSentence: {
            target: 'Fostering psychological safety and demographic inclusion inside engineering teams sparks greater product innovation.',
            pronunciation: '/ˈfɒstərɪŋ ˌsaɪkəˈlɒdʒɪkəl ˈseɪfti ænd ˌdɛməˈɡræfɪk ɪnˈkluːʒən ɪnˈsaɪd ˌɛndʒɪˈnɪərɪŋ tiːmz spɑːks ˈɡreɪtə ˈprɒdʌkt ˌɪnəˈveɪʃən/',
            meaningVi: 'Nuôi dưỡng sự an toàn tâm lý và sự hòa nhập nhân khẩu học bên trong các đội ngũ kỹ thuật khơi dậy sự đổi mới sản phẩm lớn hơn.'
          }
        },
        {
          id: 'en_b2_10_8',
          word: 'mandate',
          pronunciation: '/ˈmændeɪt/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Sắc lệnh chỉ thị bắt buộc theo quy định pháp lý',
          radicals: 'Etymology: Latin mandare (hand over / commission / command)',
          grammarNote: 'Collocation: statutory mandate, ESG disclosure mandate.',
          exampleSentence: {
            target: 'European Union directives officially mandate extensive sustainability disclosures for all listed corporations operating within the single market.',
            pronunciation: '/ˌjʊərəˈpiːən ˈjuːnjən dɪˈrɛktɪvz əˈfɪʃəli ˈmændeɪt ɪkˈstɛnsɪv səˌsteɪnəˈbɪləti dɪsˈkləʊʒəz fɔːr ɔːl ˈlɪstɪd ˌkɔːpəˈreɪʃənz ˈɒpəreɪtɪŋ wɪðˈɪn ðə ˈsɪŋɡəl ˈmɑːkɪt/',
            meaningVi: 'Các chỉ thị của Liên minh châu Âu chính thức bắt buộc công bố thông tin bền vững sâu rộng đối với tất cả các tập đoàn niêm yết hoạt động trong thị trường chung.'
          }
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(__dirname, 'data-chunks/en_b2.json'), JSON.stringify(enB2, null, 2));
console.log('en_b2.json written! Lessons count:', enB2.lessons.length);
