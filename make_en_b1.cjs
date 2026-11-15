const fs = require('fs');
const path = require('path');

const enB1 = {
  levelId: 'en_b1',
  code: 'B1',
  title: 'B1 - Intermediate: Business Correspondence, Project Agility & Phrasal Verbs',
  lessons: [
    {
      id: 'en_b1_l1',
      title: 'Lesson 1: Professional Business Emails & Inquiries',
      grammarFocus: 'Formal email conventions: Opening formulas (I am writing to inquire about...), Call to action (Could you please confirm...), Closing (Look forward to hearing from you).',
      vocabularies: [
        {
          id: 'en_b1_1_1',
          word: 'inquire',
          pronunciation: '/ɪnˈkwaɪər/',
          partOfSpeech: 'verb',
          meaningVi: 'Hỏi thăm, yêu cầu cung cấp thông tin chính thức',
          radicals: 'Etymology: Latin inquirere (in- "into" + quaerere "seek/ask")',
          grammarNote: 'Collocation: inquire about something, inquire whether.',
          exampleSentence: {
            target: 'I am writing to inquire about the availability of the conference hall next Tuesday.',
            pronunciation: '/aɪ æm ˈraɪtɪŋ tuː ɪnˈkwaɪər əˈbaʊt ðə əˌveɪləˈbɪləti əv ðə ˈkɒnfərəns hɔːl nɛkst ˈtjuːzdeɪ/',
            meaningVi: 'Tôi viết thư này để hỏi về tình trạng phòng trống của hội trường hội nghị vào thứ Ba tới.'
          }
        },
        {
          id: 'en_b1_1_2',
          word: 'attachment',
          pronunciation: '/əˈtætʃmənt/',
          partOfSpeech: 'noun',
          meaningVi: 'Tệp đính kèm trong thư điện tử',
          radicals: 'Etymology: attach + -ment (action/state)',
          grammarNote: 'Phrase: Please find the attachment enclosed / Please find attached.',
          exampleSentence: {
            target: 'Please find attached the revised financial breakdown for your review.',
            pronunciation: '/pliːz faɪnd əˈtætʃt ðə rɪˈvaɪzd faɪˈnænʃəl ˈbreɪkdaʊn fɔː jɔː rɪˈvjuː/',
            meaningVi: 'Xin vui lòng xem tệp đính kèm bảng chi tiết tài chính đã được sửa đổi để quý vị xem xét.'
          }
        },
        {
          id: 'en_b1_1_3',
          word: 'promptly',
          pronunciation: '/ˈprɒmptli/',
          partOfSpeech: 'adverb',
          meaningVi: 'Nhanh chóng, kịp thời không chậm trễ',
          radicals: 'Etymology: Latin promptus (brought forth, ready) + -ly',
          grammarNote: 'Collocation: reply promptly, act promptly.',
          exampleSentence: {
            target: 'We would greatly appreciate it if you could respond to our quotation promptly.',
            pronunciation: '/wiː wʊd ˈɡreɪtli əˈpriːʃieɪt ɪt ɪf juː kʊd rɪˈspɒnd tuː ˈaʊər kwəʊˈteɪʃən ˈprɒmptli/',
            meaningVi: 'Chúng tôi sẽ rất cảm kích nếu quý vị có thể phản hồi báo giá của chúng tôi một cách kịp thời.'
          }
        },
        {
          id: 'en_b1_1_4',
          word: 'clarify',
          pronunciation: '/ˈklærɪfaɪ/',
          partOfSpeech: 'verb',
          meaningVi: 'Làm rõ, giải thích tường minh',
          radicals: 'Etymology: Latin clarus (clear) + -fy (make)',
          grammarNote: 'Collocation: clarify a misunderstanding, clarify the requirements.',
          exampleSentence: {
            target: 'Could you please clarify whether the shipping cost is included in the invoice?',
            pronunciation: '/kʊd juː pliːz ˈklærɪfaɪ ˈwɛðər ðə ˈʃɪpɪŋ kɒst ɪz ɪnˈkluːdɪd ɪn ði ˈɪnvɔɪs/',
            meaningVi: 'Bạn có thể vui lòng làm rõ liệu chi phí vận chuyển đã bao gồm trong hóa đơn hay chưa?'
          }
        },
        {
          id: 'en_b1_1_5',
          word: 'recipient',
          pronunciation: '/rɪˈsɪpiənt/',
          partOfSpeech: 'noun',
          meaningVi: 'Người nhận thư/hàng hóa',
          radicals: 'Etymology: Latin recipere (receive) + -ent',
          grammarNote: 'Collocation: intended recipient, recipient address.',
          exampleSentence: {
            target: 'Ensure all confidential spreadsheets are sent exclusively to the intended recipient.',
            pronunciation: '/ɪnˈʃʊər ɔːl ˌkɒnfɪˈdɛnʃəl ˈsprɛdʃiːts ɑː sɛnt ɪkˈskluːsɪvli tuː ði ɪnˈtɛndɪd rɪˈsɪpiənt/',
            meaningVi: 'Hãy đảm bảo toàn bộ các bảng tính bảo mật chỉ được gửi riêng cho đúng người nhận dự kiến.'
          }
        },
        {
          id: 'en_b1_1_6',
          word: 'apologize',
          pronunciation: '/əˈpɒlədʒaɪz/',
          partOfSpeech: 'verb',
          meaningVi: 'Xin lỗi vì sự bất tiện',
          radicals: 'Etymology: Greek apologia (defense/speech in return)',
          grammarNote: 'Structure: apologize for the delay / apologize to someone.',
          exampleSentence: {
            target: 'We sincerely apologize for any inconvenience caused by the unexpected server maintenance.',
            pronunciation: '/wiː sɪnˈsɪəli əˈpɒlədʒaɪz fɔːr ˈɛni ˌɪnkənˈviːniəns kɔːzd baɪ ði ˌʌnɪkˈspɛktɪd ˈsɜːvə ˈmeɪntənəns/',
            meaningVi: 'Chúng tôi chân thành xin lỗi vì bất kỳ sự bất tiện nào gây ra bởi việc bảo trì máy chủ đột xuất.'
          }
        },
        {
          id: 'en_b1_1_7',
          word: 'agenda',
          pronunciation: '/əˈdʒɛndə/',
          partOfSpeech: 'noun',
          meaningVi: 'Chương trình nghị sự cuộc họp',
          radicals: 'Etymology: Latin agenda ("things to be done")',
          grammarNote: 'Collocation: items on the agenda, set the agenda.',
          exampleSentence: {
            target: 'The meeting agenda has been circulated to all department managers.',
            pronunciation: '/ðə ˈmiːtɪŋ əˈdʒɛndə hæz biːn ˈsɜːkjʊleɪtɪd tuː ɔːl dɪˈpɑːtmənt ˈmænɪdʒəz/',
            meaningVi: 'Chương trình nghị sự cuộc họp đã được gửi luân chuyển tới toàn thể các trưởng phòng.'
          }
        },
        {
          id: 'en_b1_1_8',
          word: 'follow-up',
          pronunciation: '/ˈfɒləʊ ʌp/',
          partOfSpeech: 'noun/adj',
          meaningVi: 'Hành động theo dõi tiếp theo, email nhắc nhở tiếp diễn',
          radicals: 'Etymology: follow + up',
          grammarNote: 'Collocation: follow-up meeting, follow-up email.',
          exampleSentence: {
            target: 'I am writing this follow-up email regarding the partnership proposal we discussed yesterday.',
            pronunciation: '/aɪ æm ˈraɪtɪŋ ðɪs ˈfɒləʊ ʌp ˈiːmeɪl rɪˈɡɑːdɪŋ ðə ˈpɑːtnəʃɪp prəˈpəʊzəl wiː dɪsˈkʌst ˈjɛstədeɪ/',
            meaningVi: 'Tôi viết email tiếp nối này liên quan đến đề xuất hợp tác mà chúng ta đã thảo luận ngày hôm qua.'
          }
        }
      ]
    },
    {
      id: 'en_b1_l2',
      title: 'Lesson 2: Agile Project Team Meetings & Standups',
      grammarFocus: 'Present Perfect vs. Past Simple in Status Updates: I have completed the wireframes, yesterday we identified a blocker.',
      vocabularies: [
        {
          id: 'en_b1_2_1',
          word: 'sprint',
          pronunciation: '/sprɪnt/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Kỳ nước rút chạy dự án trong Agile (thường từ 1-2 tuần)',
          radicals: 'Etymology: Scandinavian spritta (to start, leap)',
          grammarNote: 'Collocation: sprint retrospective, sprint backlog, two-week sprint.',
          exampleSentence: {
            target: 'Our development team committed to delivering four major user stories in this two-week sprint.',
            pronunciation: '/ˈaʊə dɪˈvɛləpmənt tiːm kəˈmɪtɪd tuː dɪˈlɪvərɪŋ fɔː ˈmeɪdʒə ˈjuːzə ˈstɔːriz ɪn ðɪs tuː wiːk sprɪnt/',
            meaningVi: 'Đội ngũ phát triển của chúng tôi đã cam kết bàn giao 4 câu chuyện người dùng lớn trong kỳ sprint 2 tuần này.'
          }
        },
        {
          id: 'en_b1_2_2',
          word: 'blocker',
          pronunciation: '/ˈblɒkər/',
          partOfSpeech: 'noun',
          meaningVi: 'Vấn đề trở ngại gây nghẽn tiến độ dự án',
          radicals: 'Etymology: block + -er',
          grammarNote: 'Phrase: resolve a blocker, encounter a critical blocker.',
          exampleSentence: {
            target: 'The delayed API documentation is currently our biggest blocker for backend integration.',
            pronunciation: '/ðə dɪˈleɪd ˌeɪ piː ˈaɪ ˌdɒkjʊmɛnˈteɪʃən ɪz ˈkʌrəntli ˈaʊə ˈbɪɡɪst ˈblɒkə fɔː ˈbækɛnd ˌɪntɪˈɡreɪʃən/',
            meaningVi: 'Tài liệu API bị chậm trễ hiện đang là điểm nghẽn lớn nhất của chúng tôi đối với việc tích hợp backend.'
          }
        },
        {
          id: 'en_b1_2_3',
          word: 'collaborate',
          pronunciation: '/kəˈlæbəreɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Cộng tác, phối hợp làm việc nhóm',
          radicals: 'Etymology: Latin com- (with) + laborare (to work)',
          grammarNote: 'Structure: collaborate with someone on a project.',
          exampleSentence: {
            target: 'UI designers and front-end developers must collaborate closely to ensure seamless responsiveness.',
            pronunciation: '/ˌjuː ˈaɪ dɪˈzaɪnəz ænd frʌnt ɛnd dɪˈvɛləpəz mʌst kəˈlæbəreɪt ˈkləʊsli tuː ɪnˈʃʊə ˈsiːmləs rɪˈspɒnsɪvnəs/',
            meaningVi: 'Các nhà thiết kế UI và lập trình viên front-end phải cộng tác chặt chẽ để bảo đảm tính tương thích mượt mà trên mọi thiết bị.'
          }
        },
        {
          id: 'en_b1_2_4',
          word: 'milestone',
          pronunciation: '/ˈmaɪlstəʊn/',
          partOfSpeech: 'noun',
          meaningVi: 'Cột mốc quan trọng trong dự án',
          radicals: 'Etymology: mile + stone (road marker)',
          grammarNote: 'Collocation: reach a milestone, achieve a major milestone.',
          exampleSentence: {
            target: 'Releasing the public beta version marks a historic milestone for our startup.',
            pronunciation: '/rɪˈliːsɪŋ ðə ˈpʌblɪk ˈbiːtə ˈvɜːʃən mɑːks ə hɪsˈtɒrɪk ˈmaɪlstəʊn fɔːr ˈaʊə ˈstɑːtʌp/',
            meaningVi: 'Việc phát hành phiên bản thử nghiệm công khai đánh dấu một cột mốc lịch sử đối với công ty khởi nghiệp của chúng tôi.'
          }
        },
        {
          id: 'en_b1_2_5',
          word: 'deadline',
          pronunciation: '/ˈdɛdlaɪn/',
          partOfSpeech: 'noun',
          meaningVi: 'Hạn chót hoàn thành công việc',
          radicals: 'Etymology: American Civil War origin (prison boundary line)',
          grammarNote: 'Collocation: meet a deadline, miss a deadline, tight deadline.',
          exampleSentence: {
            target: 'Everyone put in extra hours so that we could successfully meet the tight client deadline.',
            pronunciation: '/ˈɛvrɪwʌn pʊt ɪn ˈɛkstrə ˈaʊəz səʊ ðæt wiː kʊd səkˈsɛsfʊli miːt ðə taɪt ˈklaɪənt ˈdɛdlaɪn/',
            meaningVi: 'Mọi người đều nỗ lực làm thêm giờ để chúng tôi có thể hoàn thành đúng hạn chót gấp rút của khách hàng.'
          }
        },
        {
          id: 'en_b1_2_6',
          word: 'prioritize',
          pronunciation: '/praɪˈɒrɪtaɪz/',
          partOfSpeech: 'verb',
          meaningVi: 'Ưu tiên, sắp xếp thứ tự ưu tiên',
          radicals: 'Etymology: prior (earlier/superior) + -itize',
          grammarNote: 'Collocation: prioritize high-impact tasks.',
          exampleSentence: {
            target: 'The product manager advised us to prioritize bug fixes over new feature rollouts.',
            pronunciation: '/ðə ˈprɒdʌkt ˈmænɪdʒə ədˈvaɪzd ʌs tuː praɪˈɒrɪtaɪz bʌɡ ˈfɪksɪz ˈəʊvə njuː ˈfiːtʃə ˈrəʊlaʊts/',
            meaningVi: 'Giám đốc sản phẩm khuyên chúng tôi nên ưu tiên sửa lỗi kỹ thuật hơn là tung ra các tính năng mới.'
          }
        },
        {
          id: 'en_b1_2_7',
          word: 'standup',
          pronunciation: '/ˈstændʌp/',
          partOfSpeech: 'noun',
          meaningVi: 'Cuộc họp đứng nhanh đầu ngày (Daily Standup 15 phút)',
          radicals: 'Etymology: stand + up',
          grammarNote: 'Collocation: daily standup meeting.',
          exampleSentence: {
            target: 'In our morning standup, each team member briefly answers what they did yesterday and what they plan today.',
            pronunciation: '/ɪn ˈaʊə ˈmɔːnɪŋ ˈstændʌp, iːtʃ tiːm ˈmɛmbə ˈbriːfli ˈɑːnsəz wɒt ðeɪ dɪd ˈjɛstədeɪ ænd wɒt ðeɪ plæn təˈdeɪ/',
            meaningVi: 'Trong cuộc họp đứng buổi sáng, mỗi thành viên trong nhóm trả lời ngắn gọn họ đã làm gì hôm qua và dự định làm gì hôm nay.'
          }
        },
        {
          id: 'en_b1_2_8',
          word: 'backlog',
          pronunciation: '/ˈbæklɒɡ/',
          partOfSpeech: 'noun',
          meaningVi: 'Danh sách các hạng mục công việc tồn đọng chờ xử lý',
          radicals: 'Etymology: back + log',
          grammarNote: 'Collocation: product backlog, clear the backlog.',
          exampleSentence: {
            target: 'We spent the afternoon refining the product backlog before sprint planning.',
            pronunciation: '/wiː spɛnt ði ˌɑːftəˈnuːn rɪˈfaɪnɪŋ ðə ˈprɒdʌkt ˈbæklɒɡ bɪˈfɔː sprɪnt ˈplænɪŋ/',
            meaningVi: 'Chúng tôi dành cả buổi chiều để trau chuốt danh sách công việc tồn đọng trước khi bước vào buổi lên kế hoạch sprint.'
          }
        }
      ]
    },
    {
      id: 'en_b1_l3',
      title: 'Lesson 3: Handling Customer Complaints & Service Recovery',
      grammarFocus: 'Modal Verbs of Obligation & Polite Diplomacy: should, must, could have, would like to apologize.',
      vocabularies: [
        {
          id: 'en_b1_3_1',
          word: 'dissatisfaction',
          pronunciation: '/dɪsˌsætɪsˈfækʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự không hài lòng, bất mãn của khách hàng',
          radicals: 'Etymology: dis- (opposite) + satisfaction',
          grammarNote: 'Collocation: express dissatisfaction with a service.',
          exampleSentence: {
            target: 'The customer expressed deep dissatisfaction regarding the delayed delivery.',
            pronunciation: '/ðə ˈkʌstəmər ɪkˈsprɛst diːp dɪsˌsætɪsˈfækʃən rɪˈɡɑːdɪŋ ðə dɪˈleɪd dɪˈlɪvəri/',
            meaningVi: 'Khách hàng bày tỏ sự không hài lòng sâu sắc liên quan đến việc giao hàng bị trễ hẹn.'
          }
        },
        {
          id: 'en_b1_3_2',
          word: 'compensate',
          pronunciation: '/ˈkɒmpənseɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Đền bù, bồi thường thiệt hại',
          radicals: 'Etymology: Latin compensare (weigh against, counterbalance)',
          grammarNote: 'Structure: compensate somebody for something.',
          exampleSentence: {
            target: 'We offered a full refund and a discount voucher to compensate the client for the error.',
            pronunciation: '/wiː ˈɒfəd ə fʊl ˈriːfʌnd ænd ə ˈdɪskaʊnt ˈvaʊtʃə tuː ˈkɒmpənseɪt ðə ˈklaɪənt fɔːr ði ˈɛrər/',
            meaningVi: 'Chúng tôi đã đề nghị hoàn tiền đầy đủ và tặng một phiếu giảm giá để đền bù cho khách hàng về sai sót.'
          }
        },
        {
          id: 'en_b1_3_3',
          word: 'investigate',
          pronunciation: '/ɪnˈvɛstɪɡeɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Điều tra rà soát nguyên nhân',
          radicals: 'Etymology: Latin investigare (to trace out / track footprints)',
          grammarNote: 'Collocation: thoroughly investigate the complaint.',
          exampleSentence: {
            target: 'Our technical support team is currently investigating the root cause of the outage.',
            pronunciation: '/ˈaʊə ˈtɛknɪkəl səˈpɔːt tiːm ɪz ˈkʌrəntli ɪnˈvɛstɪɡeɪtɪŋ ðə ruːt kɔːz əv ði ˈaʊtɪdʒ/',
            meaningVi: 'Đội ngũ hỗ trợ kỹ thuật của chúng tôi hiện đang điều tra nguyên nhân gốc rễ của sự cố gián đoạn.'
          }
        },
        {
          id: 'en_b1_3_4',
          word: 'reassurance',
          pronunciation: '/ˌriːəˈʃʊərəns/',
          partOfSpeech: 'noun',
          meaningVi: 'Sự trấn an cam đoan bảo đảm',
          radicals: 'Etymology: re- + assurance',
          grammarNote: 'Collocation: offer reassurance, seek reassurance.',
          exampleSentence: {
            target: 'The manager offered heartfelt reassurance that such an oversight would never happen again.',
            pronunciation: '/ðə ˈmænɪdʒər ˈɒfəd ˈhɑːtfɛlt ˌriːəˈʃʊərəns ðæt sʌtʃ ən ˈəʊvəsaɪt wʊd ˈnɛvə ˈhæpən əˈɡɛn/',
            meaningVi: 'Người quản lý đã đưa ra lời trấn an chân thành rằng sự sơ suất như vậy sẽ không bao giờ tái diễn.'
          }
        },
        {
          id: 'en_b1_3_5',
          word: 'escalate',
          pronunciation: '/ˈɛskəleɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Chuyển cấp thẩm quyền lên cấp cao hơn / Leo thang',
          radicals: 'Etymology: modern back-formation from escalator',
          grammarNote: 'Phrase: escalate an issue to senior management.',
          exampleSentence: {
            target: 'If the frontline agent cannot solve your dispute, they will immediately escalate it to the supervisor.',
            pronunciation: '/ɪf ðə ˈfrʌntlaɪn ˈeɪdʒənt ˈkænɒt sɒlv jɔː dɪˈspjuːt, ðeɪ wɪl ɪˈmiːdiətli ˈɛskəleɪt ɪt tuː ðə ˈsuːpəvaɪzə/',
            meaningVi: 'Nếu nhân viên trực tiếp không thể giải quyết tranh chấp của bạn, họ sẽ chuyển ngay lên cho người giám sát.'
          }
        },
        {
          id: 'en_b1_3_6',
          word: 'resolution',
          pronunciation: '/ˌrɛzəˈluːʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Biện pháp giải quyết êm thấm ổn thỏa',
          radicals: 'Etymology: resolve + -tion',
          grammarNote: 'Collocation: reach a speedy resolution.',
          exampleSentence: {
            target: 'We are committed to finding a fair and mutually acceptable resolution for all parties involved.',
            pronunciation: '/wiː ɑː kəˈmɪtɪd tuː ˈfaɪndɪŋ ə feə ænd ˈmjuːtʃuəli əkˈsɛptəbəl ˌrɛzəˈluːʃən fɔːr ɔːl ˈpɑːtiz ɪnˈvɒlvd/',
            meaningVi: 'Chúng tôi cam kết tìm ra một giải pháp công bằng và đôi bên cùng chấp nhận được cho tất cả các bên liên quan.'
          }
        },
        {
          id: 'en_b1_3_7',
          word: 'warranty',
          pronunciation: '/ˈwɒrənti/',
          partOfSpeech: 'noun',
          meaningVi: 'Phiếu bảo hành, cam kết bảo hành chất lượng',
          radicals: 'Etymology: Old Northern French warantie (warrant)',
          grammarNote: 'Collocation: under warranty, extended warranty.',
          exampleSentence: {
            target: 'All electronic components purchased from our flagship store come with a two-year manufacturer warranty.',
            pronunciation: '/ɔːl ˌɪlɛkˈtrɒnɪk kəmˈpəʊnənts ˈpɜːtʃəst frɒm ˈaʊə ˈflæɡʃɪp stɔː kʌm wɪð ə tuː jɪə ˌmænjʊˈfæktʃərə ˈwɒrənti/',
            meaningVi: 'Tất cả các linh kiện điện tử mua từ cửa hàng đại diện của chúng tôi đều đi kèm bảo hành 2 năm của nhà sản xuất.'
          }
        },
        {
          id: 'en_b1_3_8',
          word: 'reimburse',
          pronunciation: '/ˌriːɪmˈbɜːs/',
          partOfSpeech: 'verb',
          meaningVi: 'Hoàn lại chi phí đã bỏ ra (Reimbursement)',
          radicals: 'Etymology: re- + im- (into) + bourse (purse/wallet)',
          grammarNote: 'Collocation: reimburse travel expenses.',
          exampleSentence: {
            target: 'The accounting department will reimburse your hotel expenses upon submission of original receipts.',
            pronunciation: '/ði əˈkaʊntɪŋ dɪˈpɑːtmənt wɪl ˌriːɪmˈbɜːs jɔː həʊˈtɛl ɪkˈspɛnsɪz əˈpɒn səbˈmɪʃən əv əˈrɪdʒɪnəl rɪˈsiːts/',
            meaningVi: 'Phòng kế toán sẽ hoàn trả chi phí khách sạn của bạn ngay sau khi nộp các hóa đơn gốc.'
          }
        }
      ]
    },
    {
      id: 'en_b1_l4',
      title: 'Lesson 4: Second & Third Conditionals in Strategic Planning',
      grammarFocus: 'Conditional Sentences: Second Conditional (If we invested more, we would expand) vs. Third Conditional (If we had secured funding, we would have launched earlier).',
      vocabularies: [
        {
          id: 'en_b1_4_1',
          word: 'contingency',
          pronunciation: '/kənˈtɪndʒənsi/',
          partOfSpeech: 'noun',
          meaningVi: 'Phương án dự phòng rủi ro bất ngờ (Contingency plan)',
          radicals: 'Etymology: Latin contingere (happen/touch)',
          grammarNote: 'Collocation: contingency plan, contingency budget.',
          exampleSentence: {
            target: 'If the supplier fails to deliver on time, we would immediately activate our contingency plan.',
            pronunciation: '/ɪf ðə səˈplaɪə feɪlz tuː dɪˈlɪvər ɒn taɪm, wiː wʊd ɪˈmiːdiətli ˈæktɪveɪt ˈaʊə kənˈtɪndʒənsi plæn/',
            meaningVi: 'Nếu nhà cung cấp không giao hàng đúng hẹn, chúng tôi sẽ lập tức kích hoạt kế hoạch dự phòng.'
          }
        },
        {
          id: 'en_b1_4_2',
          word: 'hypothetical',
          pronunciation: '/ˌhaɪpəˈθɛtɪkəl/',
          partOfSpeech: 'adj',
          meaningVi: 'Giả định, mang tính giả thuyết',
          radicals: 'Etymology: Greek hypothesis (foundation / placed under)',
          grammarNote: 'Collocation: purely hypothetical scenario.',
          exampleSentence: {
            target: 'Let us consider a hypothetical situation where production costs increase by twenty percent.',
            pronunciation: '/lɛt ʌs kənˈsɪdə ə ˌhaɪpəˈθɛtɪkəl ˌsɪtjʊˈeɪʃən weə prəˈdʌkʃən kɒsts ɪnˈkriːs baɪ ˈtwɛnti pəˈsɛnt/',
            meaningVi: 'Hãy cùng xem xét một tình huống giả định nơi mà chi phí sản xuất tăng thêm 20%.'
          }
        },
        {
          id: 'en_b1_4_3',
          word: 'foresee',
          pronunciation: '/fɔːˈsiː/',
          partOfSpeech: 'verb',
          meaningVi: 'Thấy trước, lường trước viễn cảnh tương lai',
          radicals: 'Etymology: fore- (before) + see',
          grammarNote: 'Collocation: foresee complications, foreseeable future.',
          exampleSentence: {
            target: 'If we had foreseen the sudden surge in demand, we would have ordered more raw materials.',
            pronunciation: '/ɪf wiː hæd fɔːˈsiːn ðə ˈsʌdən sɜːdʒ ɪn dɪˈmɑːnd, wiː wʊd hæv ˈɔːdəd mɔː rɔː məˈtɪəriəlz/',
            meaningVi: 'Nếu chúng tôi lường trước được sự gia tăng đột ngột về nhu cầu, chúng tôi đã đặt nhiều nguyên vật liệu hơn.'
          }
        },
        {
          id: 'en_b1_4_4',
          word: 'feasibility',
          pronunciation: '/ˌfiːzəˈbɪləti/',
          partOfSpeech: 'noun',
          meaningVi: 'Tính khả thi của dự án',
          radicals: 'Etymology: Anglo-Norman faisible (doable) + -ity',
          grammarNote: 'Collocation: feasibility study, financial feasibility.',
          exampleSentence: {
            target: 'Before investing millions in overseas expansion, the board conducted a thorough feasibility study.',
            pronunciation: '/bɪˈfɔːr ɪnˈvɛstɪŋ ˈmɪljənz ɪn ˌəʊvəˈsiːz ɪkˈspænʃən, ðə bɔːd kənˈdʌktɪd ə ˈθʌrə ˌfiːzəˈbɪləti ˈstʌdi/',
            meaningVi: 'Trước khi đầu tư hàng triệu đô mở rộng ra nước ngoài, hội đồng quản trị đã tiến hành một nghiên cứu tính khả thi kỹ lưỡng.'
          }
        },
        {
          id: 'en_b1_4_5',
          word: 'outcome',
          pronunciation: '/ˈaʊtkʌm/',
          partOfSpeech: 'noun',
          meaningVi: 'Kết quả chung cuộc của một quyết định',
          radicals: 'Etymology: out + come',
          grammarNote: 'Collocation: desirable outcome, unpredictable outcome.',
          exampleSentence: {
            target: 'If we took this calculated risk, the most probable outcome would be a doubled market share.',
            pronunciation: '/ɪf wiː tʊk ðɪs ˈkælkjʊleɪtɪd rɪsk, ðə məʊst ˈprɒbəbəl ˈaʊtkʌm wʊd biː ə ˈdʌbəld ˈmɑːkɪt ʃeə/',
            meaningVi: 'Nếu chúng ta chấp nhận rủi ro có tính toán này, kết quả có khả năng nhất sẽ là gấp đôi thị phần.'
          }
        },
        {
          id: 'en_b1_4_6',
          word: 'hesitate',
          pronunciation: '/ˈhɛzɪteɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Do dự ngập ngừng',
          radicals: 'Etymology: Latin haesitare (stick fast, remain undecided)',
          grammarNote: 'Structure: hesitate to do something, do not hesitate.',
          exampleSentence: {
            target: 'If we had not hesitated during negotiations, we would have secured the exclusive partnership.',
            pronunciation: '/ɪf wiː hæd nɒt ˈhɛzɪteɪtɪd ˈdjʊərɪŋ nɪˌɡəʊʃiˈeɪʃənz, wiː wʊd hæv sɪˈkjʊəd ði ɪkˈskluːsɪv ˈpɑːtnəʃɪp/',
            meaningVi: 'Nếu chúng tôi không ngập ngừng trong đàm phán, chúng tôi đã giành được quan hệ đối tác độc quyền.'
          }
        },
        {
          id: 'en_b1_4_7',
          word: 'alternative',
          pronunciation: '/ɔːlˈtɜːnətɪv/',
          partOfSpeech: 'noun/adj',
          meaningVi: 'Phương án thay thế khả dĩ',
          radicals: 'Etymology: Latin alternare (one after the other)',
          grammarNote: 'Collocation: viable alternative, alternative plan.',
          exampleSentence: {
            target: 'If this supplier fails audit, what alternative vendors would we consider?',
            pronunciation: '/ɪf ðɪs səˈplaɪə feɪlz ˈɔːdɪt, wɒt ɔːlˈtɜːnətɪv ˈvɛndɔːz wʊd wiː kənˈsɪdə/',
            meaningVi: 'Nếu nhà cung cấp này trượt kỳ kiểm toán, chúng ta sẽ cân nhắc những nhà cung ứng thay thế nào?'
          }
        },
        {
          id: 'en_b1_4_8',
          word: 'regret',
          pronunciation: '/rɪˈɡrɛt/',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Hối tiếc về quyết định đã qua',
          radicals: 'Etymology: Old French regreter (lament/weep for)',
          grammarNote: 'Structure: regret doing something / regret to inform.',
          exampleSentence: {
            target: 'We would not have regretted this acquisition if the synergy had been properly evaluated.',
            pronunciation: '/wiː wʊd nɒt hæv rɪˈɡrɛtɪd ðɪs ˌækwɪˈzɪʃən ɪf ðə ˈsɪnədʒi hæd biːn ˈprɒpəli ɪˈvæljʊeɪtɪd/',
            meaningVi: 'Chúng tôi đã không phải hối tiếc về thương vụ sáp nhập này nếu như giá trị cộng hưởng được đánh giá đúng đắn.'
          }
        }
      ]
    },
    {
      id: 'en_b1_l5',
      title: 'Lesson 5: Reported Speech & Executive Meeting Minutes',
      grammarFocus: 'Backshifting in Reported Speech: Present to Past, Past to Past Perfect (He stated that the company had achieved its quarterly targets).',
      vocabularies: [
        {
          id: 'en_b1_5_1',
          word: 'state',
          pronunciation: '/steɪt/',
          hanViet: '',
          partOfSpeech: 'verb',
          meaningVi: 'Tuyên bố, khẳng định trang trọng',
          radicals: 'Etymology: Latin status (manner of standing / condition)',
          grammarNote: 'Collocation: state clearly, as previously stated.',
          exampleSentence: {
            target: 'The CEO stated that revenue had exceeded market expectations by twelve percent.',
            pronunciation: '/ðə ˌsiː iː ˈəʊ steɪtɪd ðæt ˈrɛvɪnjuː hæd ɪkˈsiːdɪd ˈmɑːkɪt ˌɛkspɛkˈteɪʃənz baɪ twɛlv pəˈsɛnt/',
            meaningVi: 'Tổng giám đốc đã tuyên bố rằng doanh thu đã vượt kỳ vọng thị trường 12%.'
          }
        },
        {
          id: 'en_b1_5_2',
          word: 'confirm',
          pronunciation: '/kənˈfɜːm/',
          partOfSpeech: 'verb',
          meaningVi: 'Xác nhận tính xác thực',
          radicals: 'Etymology: Latin con- (intensifier) + firmare (make firm)',
          grammarNote: 'Collocation: confirm attendance, confirm the appointment.',
          exampleSentence: {
            target: 'The lead auditor confirmed that all tax filings complied fully with statutory regulations.',
            pronunciation: '/ðə liːd ˈɔːdɪtə kənˈfɜːmd ðæt ɔːl tæks ˈfaɪlɪŋz kəmˈplaɪd ˈfʊli wɪð ˈstætʃʊtəri ˌrɛɡjʊˈleɪʃənz/',
            meaningVi: 'Kiểm toán viên trưởng đã xác nhận rằng tất cả hồ sơ thuế đều tuân thủ đầy đủ các quy định theo luật định.'
          }
        },
        {
          id: 'en_b1_5_3',
          word: 'mention',
          pronunciation: '/ˈmɛnʃən/',
          partOfSpeech: 'verb/noun',
          meaningVi: 'Đề cập tới, nhắc đến',
          radicals: 'Etymology: Latin mentio (calling to mind / remembering)',
          grammarNote: 'Collocation: not to mention, as mentioned earlier.',
          exampleSentence: {
            target: 'She mentioned that the new mobile application would be launched next month.',
            pronunciation: '/ʃiː ˈmɛnʃənd ðæt ðə njuː ˈməʊbaɪl ˌæplɪˈkeɪʃən wʊd biː lɔːntʃt nɛkst mʌnθ/',
            meaningVi: 'Cô ấy đề cập rằng ứng dụng di động mới sẽ được ra mắt vào tháng tới.'
          }
        },
        {
          id: 'en_b1_5_4',
          word: 'minutes',
          pronunciation: '/ˈmɪnɪts/',
          partOfSpeech: 'noun plural',
          meaningVi: 'Biên bản cuộc họp chính thức',
          radicals: 'Etymology: Latin minuta scriptura (small notes written down)',
          grammarNote: 'Collocation: take the minutes, approve the minutes.',
          exampleSentence: {
            target: 'The administrative assistant took detailed minutes throughout the three-hour annual board meeting.',
            pronunciation: '/ði ədˈmɪnɪstrətɪv əˈsɪstənt tʊk ˈdiːteɪld ˈmɪnɪts θruːˈaʊt ðə θriː ˈaʊər ˈænjʊəl bɔːd ˈmiːtɪŋ/',
            meaningVi: 'Trợ lý hành chính đã ghi lại biên bản chi tiết trong suốt cuộc họp hội đồng quản trị thường niên kéo dài 3 giờ.'
          }
        },
        {
          id: 'en_b1_5_5',
          word: 'emphasize',
          pronunciation: '/ˈɛmfəsaɪz/',
          partOfSpeech: 'verb',
          meaningVi: 'Nhấn mạnh tầm quan trọng',
          radicals: 'Etymology: Greek emphasis (appearance/significance)',
          grammarNote: 'Collocation: emphasize the need for transparency.',
          exampleSentence: {
            target: 'The director emphasized that data security remained our organization\'s utmost priority.',
            pronunciation: '/ðə dɪˈrɛktər ˈɛmfəsaɪzd ðæt ˈdeɪtə sɪˈkjʊərəti rɪˈmeɪnd ˈaʊər ˌɔːɡənaɪˈzeɪʃənz ˈʌtməʊst praɪˈɒrɪti/',
            meaningVi: 'Giám đốc nhấn mạnh rằng an toàn dữ liệu vẫn là ưu tiên cao nhất của tổ chức chúng tôi.'
          }
        },
        {
          id: 'en_b1_5_6',
          word: 'summarize',
          pronunciation: '/ˈsʌməraɪz/',
          partOfSpeech: 'verb',
          meaningVi: 'Tóm lược, tóm tắt các ý chính',
          radicals: 'Etymology: Latin summa (sum / total) + -ize',
          grammarNote: 'Collocation: summarize key takeaways.',
          exampleSentence: {
            target: 'At the end of the presentation, the facilitator summarized all agreed action items.',
            pronunciation: '/æt ði ɛnd əv ðə ˌprɛzɛnˈteɪʃən, ðə fəˈsɪlɪteɪtə ˈsʌməraɪzd ɔːl əˈɡriːd ˈækʃən ˈaɪtəmz/',
            meaningVi: 'Ở cuối buổi thuyết trình, người điều phối đã tóm tắt lại toàn bộ các hạng mục hành động đã được thống nhất.'
          }
        },
        {
          id: 'en_b1_5_7',
          word: 'inform',
          pronunciation: '/ɪnˈfɔːm/',
          partOfSpeech: 'verb',
          meaningVi: 'Thông báo chính thức cho ai biết',
          radicals: 'Etymology: Latin informare (shape / train / instruct)',
          grammarNote: 'Structure: inform somebody of something / inform somebody that...',
          exampleSentence: {
            target: 'HR informed all employees that flexible hybrid work hours had been approved.',
            pronunciation: '/ˌeɪtʃ ˈɑːr ɪnˈfɔːmd ɔːl ˌɛmplɔɪˈiːz ðæt ˈflɛksəbəl ˈhaɪbrɪd wɜːk ˈaʊəz hæd biːn əˈpruːvd/',
            meaningVi: 'Phòng nhân sự đã thông báo tới toàn thể nhân viên rằng thời gian làm việc kết hợp linh hoạt đã được phê duyệt.'
          }
        },
        {
          id: 'en_b1_5_8',
          word: 'unanimous',
          pronunciation: '/juːˈnænɪməs/',
          partOfSpeech: 'adj',
          meaningVi: 'Đồng lòng nhất trí 100% (Unanimous vote)',
          radicals: 'Etymology: Latin unus (one) + animus (mind/spirit)',
          grammarNote: 'Collocation: unanimous decision, unanimous consent.',
          exampleSentence: {
            target: 'The committee reached a unanimous decision to promote Sarah to senior technical director.',
            pronunciation: '/ðə kəˈmɪti riːtʃt ə juːˈnænɪməs dɪˈsɪʒən tuː prəˈməʊt ˈseərə tuː ˈsiːniə ˈtɛknɪkəl dɪˈrɛktə/',
            meaningVi: 'Ủy ban đã đạt được quyết định nhất trí 100% để thăng chức Sarah lên làm giám đốc kỹ thuật cấp cao.'
          }
        }
      ]
    },
    {
      id: 'en_b1_l6',
      title: 'Lesson 6: Reduced Relative Clauses & Professional Profiles',
      grammarFocus: 'Participial phrases replacing relative pronouns: The engineer leading the project (who is leading) / The software developed by our team (which was developed).',
      vocabularies: [
        {
          id: 'en_b1_6_1',
          word: 'competency',
          pronunciation: '/ˈkɒmpɪtənsi/',
          partOfSpeech: 'noun',
          meaningVi: 'Năng lực chuyên môn cốt lõi',
          radicals: 'Etymology: Latin competere (be suitable / coincide)',
          grammarNote: 'Collocation: core competencies, demonstrated competency.',
          exampleSentence: {
            target: 'His profile highlights key competencies acquired over ten years in financial technology.',
            pronunciation: '/hɪz ˈprəʊfaɪl ˈhaɪlaɪts kiː ˈkɒmpɪtənsiz əˈkwaɪəd ˈəʊvə tɛn jɪəz ɪn faɪˈnænʃəl tɛkˈnɒlədʒi/',
            meaningVi: 'Hồ sơ của anh ấy làm nổi bật các năng lực chuyên môn cốt lõi tích lũy qua 10 năm trong ngành công nghệ tài chính.'
          }
        },
        {
          id: 'en_b1_6_2',
          word: 'credential',
          pronunciation: '/krɪˈdɛnʃəl/',
          partOfSpeech: 'noun',
          meaningVi: 'Bằng cấp, chứng chỉ nghề nghiệp uy tín',
          radicals: 'Etymology: Latin credentia (trust / belief)',
          grammarNote: 'Collocation: professional credentials, academic credentials.',
          exampleSentence: {
            target: 'Candidates possessing internationally recognized cloud architecture credentials will be prioritized.',
            pronunciation: '/ˈkændɪdɪts pəˈzɛsɪŋ ˌɪntəˈnæʃənəli ˈrɛkəɡnaɪzd klaʊd ˈɑːkɪtɛktʃə krɪˈdɛnʃəlz wɪl biː praɪˈɒrɪtaɪzd/',
            meaningVi: 'Các ứng viên sở hữu chứng chỉ kiến trúc đám mây được quốc tế công nhận sẽ được ưu tiên.'
          }
        },
        {
          id: 'en_b1_6_3',
          word: 'demonstrate',
          pronunciation: '/ˈdɛmənstreɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Chứng minh bằng thực tế năng lực/kết quả',
          radicals: 'Etymology: Latin de- (fully) + monstrare (to show)',
          grammarNote: 'Collocation: demonstrate leadership, demonstrate ability.',
          exampleSentence: {
            target: 'She has demonstrated exceptional leadership skills managing high-stakes enterprise projects.',
            pronunciation: '/ʃiː hæz ˈdɛmənstreɪtɪd ɪkˈsɛpʃənəl ˈliːdəʃɪp skɪlz ˈmænɪdʒɪŋ haɪ steɪks ˈɛntəpraɪz ˈprɒdʒɛkts/',
            meaningVi: 'Cô ấy đã chứng minh kỹ năng lãnh đạo xuất chúng khi quản lý các dự án doanh nghiệp lớn có tầm ảnh hưởng cao.'
          }
        },
        {
          id: 'en_b1_6_4',
          word: 'proficient',
          pronunciation: '/prəˈfɪʃənt/',
          partOfSpeech: 'adj',
          meaningVi: 'Thành thạo, tinh thông một kỹ năng',
          radicals: 'Etymology: Latin proficere (make progress, advance)',
          grammarNote: 'Structure: proficient in English, proficient at coding.',
          exampleSentence: {
            target: 'Applicants must be proficient in Python and familiar with continuous deployment pipelines.',
            pronunciation: '/ˈæplɪkənts mʌst biː prəˈfɪʃənt ɪn ˈpaɪθɒn ænd fəˈmɪliə wɪð kənˈtɪnjʊəs dɪˈplɔɪmənt ˈpaɪplaɪnz/',
            meaningVi: 'Người nộp đơn bắt buộc phải thành thạo ngôn ngữ Python và quen thuộc với quy trình triển khai liên tục.'
          }
        },
        {
          id: 'en_b1_6_5',
          word: 'oversee',
          pronunciation: '/ˌəʊvəˈsiː/',
          partOfSpeech: 'verb',
          meaningVi: 'Trông nom, giám sát toàn diện',
          radicals: 'Etymology: over- + see',
          grammarNote: 'Collocation: oversee operations, oversee quality control.',
          exampleSentence: {
            target: 'The chief technology officer oversees three distributed engineering teams across different continents.',
            pronunciation: '/ðə tʃiːf tɛkˈnɒlədʒi ˈɒfɪsər ˌəʊvəˈsiːz θriː dɪˈstrɪbjuːtɪd ˌɛndʒɪˈnɪərɪŋ tiːmz əˈkrɒs ˈdɪfərənt ˈkɒntɪnənts/',
            meaningVi: 'Giám đốc công nghệ giám sát ba đội ngũ kỹ sư phân tán khắp các châu lục khác nhau.'
          }
        },
        {
          id: 'en_b1_6_6',
          word: 'track record',
          pronunciation: '/træk ˈrɛkɔːd/',
          partOfSpeech: 'noun',
          meaningVi: 'Hồ sơ thành tích bề dày đã được chứng minh trong quá khứ',
          radicals: 'Etymology: track (running race track) + record',
          grammarNote: 'Collocation: proven track record of sales growth.',
          exampleSentence: {
            target: 'He brings a proven track record of driving digital transformation across traditional logistics businesses.',
            pronunciation: '/hiː brɪŋz ə ˈpruːvən træk ˈrɛkɔːd əv ˈdraɪvɪŋ ˈdɪdʒɪtəl ˌtrænsfəˈmeɪʃən əˈkrɒs trəˈdɪʃənəl ləˈdʒɪstɪks ˈbɪznɪsɪz/',
            meaningVi: 'Anh ấy mang đến một bề dày thành tích đã được kiểm chứng về việc thúc đẩy chuyển đổi số trong các doanh nghiệp logistics truyền thống.'
          }
        },
        {
          id: 'en_b1_6_7',
          word: 'benchmark',
          pronunciation: '/ˈbɛntʃmɑːk/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Tiêu chuẩn đối sánh chuẩn mực trong ngành',
          radicals: 'Etymology: surveyor\'s mark on a horizontal bench stone',
          grammarNote: 'Collocation: industry benchmark, benchmark performance.',
          exampleSentence: {
            target: 'Our customer retention rate serves as an industry benchmark for subscription software companies.',
            pronunciation: '/ˈaʊə ˈkʌstəmə rɪˈtɛnʃən reɪt sɜːvz æz ən ˈɪndəstri ˈbɛntʃmɑːk fɔː səbˈskrɪpʃən ˈsɒftweə ˈkʌmpəniz/',
            meaningVi: 'Tỷ lệ giữ chân khách hàng của chúng tôi đóng vai trò là một chuẩn mực trong ngành đối với các công ty phần mềm dạng thuê bao.'
          }
        },
        {
          id: 'en_b1_6_8',
          word: 'versatile',
          pronunciation: '/ˈvɜːsətaɪl/',
          partOfSpeech: 'adj',
          meaningVi: 'Đa năng, linh hoạt ứng biến nhiều vai trò',
          radicals: 'Etymology: Latin versare (turn about often)',
          grammarNote: 'Collocation: versatile skillset, versatile engineer.',
          exampleSentence: {
            target: 'Companies highly value versatile professionals capable of bridging technical engineering and business strategy.',
            pronunciation: '/ˈkʌmpəniz ˈhaɪli ˈvæljuː ˈvɜːsətaɪl prəˈfɛʃənəlz ˈkeɪpəbəl əv ˈbrɪdʒɪŋ ˈtɛknɪkəl ˌɛndʒɪˈnɪərɪŋ ænd ˈbɪznɪs ˈstrætɪdʒi/',
            meaningVi: 'Các công ty đánh giá rất cao những chuyên gia đa năng có khả năng làm cầu nối giữa kỹ thuật công nghệ và chiến lược kinh doanh.'
          }
        }
      ]
    },
    {
      id: 'en_b1_l7',
      title: 'Lesson 7: 50 Workplace Phrasal Verbs - Daily Office Operations',
      grammarFocus: 'Separable vs. Inseparable Phrasal Verbs: turn down (turn it down) vs. look forward to (inseparable).',
      vocabularies: [
        {
          id: 'en_b1_7_1',
          word: 'call off',
          pronunciation: '/kɔːl ɒf/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'Hủy bỏ sự kiện/cuộc họp (Cancel)',
          radicals: 'Etymology: call + off',
          grammarNote: 'Separable: call the meeting off / call off the meeting.',
          exampleSentence: {
            target: 'Due to severe weather warnings, management decided to call off the outdoor corporate team-building event.',
            pronunciation: '/djuː tuː sɪˈvɪə ˈwɛðə ˈwɔːnɪŋz, ˈmænɪdʒmənt dɪˈsaɪdɪd tuː kɔːl ɒf ði ˌaʊtˈdɔː ˈkɔːpərət tiːm ˈbɪldɪŋ ɪˈvɛnt/',
            meaningVi: 'Do cảnh báo thời tiết khắc nghiệt, ban quản lý đã quyết định hủy bỏ sự kiện gắn kết đội ngũ ngoài trời của công ty.'
          }
        },
        {
          id: 'en_b1_7_2',
          word: 'put off',
          pronunciation: '/pʊt ɒf/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'Trì hoãn lùi lại thời gian (Postpone)',
          radicals: 'Etymology: put + off',
          grammarNote: 'Idiom: Never put off till tomorrow what you can do today.',
          exampleSentence: {
            target: 'We cannot afford to put off this software patch because it fixes a critical zero-day vulnerability.',
            pronunciation: '/wiː ˈkænɒt əˈfɔːd tuː pʊt ɒf ðɪs ˈsɒftweə pætʃ bɪˈkəz ɪt ˈfɪksɪz ə ˈkrɪtɪkəl ˈzɪərəʊ deɪ ˌvʌlnərəˈbɪləti/',
            meaningVi: 'Chúng ta không thể hoãn bản vá phần mềm này được vì nó sửa một lỗ hổng bảo mật zero-day nghiêm trọng.'
          }
        },
        {
          id: 'en_b1_7_3',
          word: 'carry out',
          pronunciation: '/ˈkæri aʊt/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'Tiến hành thực hiện nghiên cứu/chính sách (Execute/Conduct)',
          radicals: 'Etymology: carry + out',
          grammarNote: 'Collocation: carry out an investigation, carry out a survey.',
          exampleSentence: {
            target: 'The marketing team carried out an in-depth survey to gauge customer sentiment before the launch.',
            pronunciation: '/ðə ˈmɑːkɪtɪŋ tiːm ˈkærid aʊt ən ɪn dɛpθ ˈsɜːveɪ tuː ɡeɪdʒ ˈkʌstəmə ˈsɛntɪmənt bɪˈfɔː ðə lɔːntʃ/',
            meaningVi: 'Đội ngũ tiếp thị đã tiến hành một cuộc khảo sát chuyên sâu để đo lường cảm xúc của khách hàng trước đợt ra mắt.'
          }
        },
        {
          id: 'en_b1_7_4',
          word: 'draw up',
          pronunciation: '/drɔː ʌp/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'Soạn thảo văn bản hợp đồng/kế hoạch (Draft)',
          radicals: 'Etymology: draw + up',
          grammarNote: 'Collocation: draw up a contract, draw up a proposal.',
          exampleSentence: {
            target: 'Our legal department has drawn up a comprehensive non-disclosure agreement for the new vendor.',
            pronunciation: '/ˈaʊə ˈliːɡəl dɪˈpɑːtmənt hæz drɔːn ʌp ə ˌkɒmprɪˈhɛnsɪv nɒn dɪsˈkləʊʒər əˈɡriːmənt fɔː ðə njuː ˈvɛndɔː/',
            meaningVi: 'Phòng pháp chế của chúng tôi đã soạn thảo một thỏa thuận bảo mật toàn diện cho nhà cung cấp mới.'
          }
        },
        {
          id: 'en_b1_7_5',
          word: 'run out of',
          pronunciation: '/rʌn aʊt əv/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'Hết sạch cạn kiệt tài nguyên (Deplete)',
          radicals: 'Etymology: run + out + of',
          grammarNote: 'Inseparable: run out of time, run out of money.',
          exampleSentence: {
            target: 'The startup was running out of runway until they secured seed capital from a reputable venture fund.',
            pronunciation: '/ðə ˈstɑːtʌp wɒz ˈrʌnɪŋ aʊt əv ˈrʌnweɪ ənˈtɪl ðeɪ sɪˈkjʊəd siːd ˈkæpɪtəl frɒm ə ˈrɛpjʊtəbəl ˈvɛntʃə fʌnd/',
            meaningVi: 'Công ty khởi nghiệp gần như cạn kiệt dòng tiền duy trì cho đến khi họ nhận được vốn hạt giống từ một quỹ mạo hiểm uy tín.'
          }
        },
        {
          id: 'en_b1_7_6',
          word: 'look into',
          pronunciation: '/lʊk ˈɪntuː/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'Nghiên cứu kiểm tra xem xét sự việc (Examine)',
          radicals: 'Etymology: look + into',
          grammarNote: 'Inseparable: I will look into it immediately.',
          exampleSentence: {
            target: 'Our senior engineer promised to look into the latency spikes reported by the European server cluster.',
            pronunciation: '/ˈaʊə ˈsiːniər ˌɛndʒɪˈnɪə ˈprɒmɪst tuː lʊk ˈɪntuː ðə ˈleɪtənsi spaɪks rɪˈpɔːtɪd baɪ ðə ˌjʊərəˈpiːən ˈsɜːvə ˈklʌstə/',
            meaningVi: 'Kỹ sư cao cấp của chúng tôi hứa sẽ xem xét các đợt tăng vọt độ trễ do cụm máy chủ châu Âu báo cáo.'
          }
        },
        {
          id: 'en_b1_7_7',
          word: 'point out',
          pronunciation: '/pɔɪnt aʊt/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'Chỉ ra, lưu ý điểm cốt yếu',
          radicals: 'Etymology: point + out',
          grammarNote: 'Separable: point it out.',
          exampleSentence: {
            target: 'During code review, the lead architect pointed out several potential memory leaks in the database query.',
            pronunciation: '/ˈdjʊərɪŋ kəʊd rɪˈvjuː, ðə liːd ˈɑːkɪtɛkt ˈpɔɪntɪd aʊt ˈsɛvrəl pəˈtɛnʃəl ˈmɛməri liːks ɪn ðə ˈdeɪtəbeɪs ˈkwɪəri/',
            meaningVi: 'Trong buổi rà soát mã nguồn, kiến trúc sư trưởng đã chỉ ra một số điểm có nguy cơ rò rỉ bộ nhớ trong câu truy vấn cơ sở dữ liệu.'
          }
        },
        {
          id: 'en_b1_7_8',
          word: 'bring up',
          pronunciation: '/brɪŋ ʌp/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'Đưa một chủ đề ra thảo luận trong cuộc họp',
          radicals: 'Etymology: bring + up',
          grammarNote: 'Separable: bring the matter up.',
          exampleSentence: {
            target: 'I intend to bring up the issue of workplace ergonomics at our upcoming safety committee meeting.',
            pronunciation: '/aɪ ɪnˈtɛnd tuː brɪŋ ʌp ði ˈɪʃuː əv ˈwɜːkpleɪs ˌɜːɡəˈnɒmɪks æt ˈaʊər ˈʌpˌkʌmɪŋ ˈseɪfti kəˈmɪti ˈmiːtɪŋ/',
            meaningVi: 'Tôi dự định đưa vấn đề công thái học tại nơi làm việc ra thảo luận tại cuộc họp ban an toàn sắp tới.'
          }
        }
      ]
    },
    {
      id: 'en_b1_l8',
      title: 'Lesson 8: International Business Travel & Accommodations',
      grammarFocus: 'Indirect Questions for Polite Inquiries: Could you tell me where... / I wonder if you could...',
      vocabularies: [
        {
          id: 'en_b1_8_1',
          word: 'itinerary',
          pronunciation: '/aɪˈtɪnərəri/',
          partOfSpeech: 'noun',
          meaningVi: 'Lịch trình chuyến đi chi tiết (Travel itinerary)',
          radicals: 'Etymology: Latin iter (journey / way)',
          grammarNote: 'Collocation: flight itinerary, detailed itinerary.',
          exampleSentence: {
            target: 'The corporate travel coordinator emailed us the complete itinerary including flight connections and hotel vouchers.',
            pronunciation: '/ðə ˈkɔːpərət ˈtrævəl kəʊˈɔːdɪneɪtər ˈiːmeɪld ʌs ðə kəmˈpliːt aɪˈtɪnərəri ɪnˈkluːdɪŋ flaɪt kəˈnɛkʃənz ænd həʊˈtɛl ˈvaʊtʃəz/',
            meaningVi: 'Điều phối viên du lịch doanh nghiệp đã gửi email cho chúng tôi lịch trình đầy đủ bao gồm các chuyến bay nối chuyến và phiếu khách sạn.'
          }
        },
        {
          id: 'en_b1_8_2',
          word: 'reservation',
          pronunciation: '/ˌrɛzəˈveɪʃən/',
          partOfSpeech: 'noun',
          meaningVi: 'Đặt chỗ trước (phòng khách sạn/vé máy bay)',
          radicals: 'Etymology: reserve + -ation',
          grammarNote: 'Collocation: confirm a reservation, cancel a reservation.',
          exampleSentence: {
            target: 'I would like to reconfirm my reservation under the corporate corporate rate for three nights.',
            pronunciation: '/aɪ wʊd laɪk tuː ˌriːkənˈfɜːm maɪ ˌrɛzəˈveɪʃən ˈʌndə ðə ˈkɔːpərət reɪt fɔː θriː naɪts/',
            meaningVi: 'Tôi muốn xác nhận lại việc đặt phòng của mình theo mức giá ưu đãi doanh nghiệp cho ba đêm.'
          }
        },
        {
          id: 'en_b1_8_3',
          word: 'boarding pass',
          pronunciation: '/ˈbɔːdɪŋ pɑːs/',
          partOfSpeech: 'noun',
          meaningVi: 'Thẻ lên máy bay',
          radicals: 'Etymology: board (get on plane) + pass',
          grammarNote: 'Collocation: electronic boarding pass, show boarding pass.',
          exampleSentence: {
            target: 'Please have your passport and digital boarding pass ready before proceeding through security.',
            pronunciation: '/pliːz hæv jɔː ˈpɑːspɔːt ænd ˈdɪdʒɪtəl ˈbɔːdɪŋ pɑːs ˈrɛdi bɪˈfɔː prəˈsiːdɪŋ θruː sɪˈkjʊərəti/',
            meaningVi: 'Xin vui lòng chuẩn bị sẵn hộ chiếu và thẻ lên máy bay kỹ thuật số trước khi đi qua cửa an ninh.'
          }
        },
        {
          id: 'en_b1_8_4',
          word: 'amenities',
          pronunciation: '/əˈmiːnɪtiz/',
          partOfSpeech: 'noun plural',
          meaningVi: 'Tiện nghi khách sạn (hồ bơi, wifi, phòng gym)',
          radicals: 'Etymology: Latin amoenus (pleasant / delightful)',
          grammarNote: 'Collocation: hotel amenities, complimentary amenities.',
          exampleSentence: {
            target: 'The executive hotel suite provides complimentary high-speed Wi-Fi, breakfast, and wellness amenities.',
            pronunciation: '/ði ɪɡˈzɛkjʊtɪv həʊˈtɛl swiːt prəˈvaɪdz ˌkɒmplɪˈmɛntəri haɪ spiːd ˈwaɪ faɪ, ˈbrɛkfəst, ænd ˈwɛlnɪs əˈmiːnɪtiz/',
            meaningVi: 'Phòng suite cao cấp của khách sạn cung cấp Wi-Fi tốc độ cao, bữa sáng và các tiện nghi chăm sóc sức khỏe miễn phí.'
          }
        },
        {
          id: 'en_b1_8_5',
          word: 'jet lag',
          pronunciation: '/ˈdʒɛt læɡ/',
          partOfSpeech: 'noun',
          meaningVi: 'Mệt mỏi rối loạn nhịp sinh học do lệch múi giờ bay',
          radicals: 'Etymology: jet + lag (fall behind)',
          grammarNote: 'Collocation: suffer from jet lag, overcome jet lag.',
          exampleSentence: {
            target: 'Flying across twelve time zones caused severe jet lag that took three days to fully recover from.',
            pronunciation: '/ˈflaɪɪŋ əˈkrɒs twɛlv taɪm zəʊnz kɔːzd sɪˈvɪə ˈdʒɛt læɡ ðæt tʊk θriː deɪz tuː ˈfʊli rɪˈkʌvə frɒm/',
            meaningVi: 'Bay qua 12 múi giờ đã gây ra sự mệt mỏi lệch múi giờ nặng nề mà phải mất 3 ngày mới hồi phục hoàn toàn.'
          }
        },
        {
          id: 'en_b1_8_6',
          word: 'layover',
          pronunciation: '/ˈleɪˌəʊvər/',
          partOfSpeech: 'noun',
          meaningVi: 'Thời gian quá cảnh chờ nối chuyến bay',
          radicals: 'Etymology: lay + over',
          grammarNote: 'Collocation: two-hour layover, overnight layover.',
          exampleSentence: {
            target: 'We booked a direct route to avoid a four-hour layover at Tokyo Narita Airport.',
            pronunciation: '/wiː bʊkt ə dɪˈrɛkt ruːt tuː əˈvɔɪd ə fɔːr ˈaʊə ˈleɪˌəʊvər æt ˈtəʊkiəʊ nəˈriːtə ˈeəpɔːt/',
            meaningVi: 'Chúng tôi đặt vé chặng bay thẳng để tránh thời gian quá cảnh 4 giờ tại sân bay Narita Tokyo.'
          }
        },
        {
          id: 'en_b1_8_7',
          word: 'shuttle',
          pronunciation: '/ˈʃʌtəl/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Xe đưa đón chuyên tuyến sân bay/khách sạn',
          radicals: 'Etymology: Old English scytel (dart, missile / back-and-forth)',
          grammarNote: 'Collocation: airport shuttle bus.',
          exampleSentence: {
            target: 'The hotel operates a complimentary shuttle service running to and from the international terminal every thirty minutes.',
            pronunciation: '/ðə həʊˈtɛl ˈɒpəreɪts ə ˌkɒmplɪˈmɛntəri ˈʃʌtəl ˈsɜːvɪs ˈrʌnɪŋ tuː ænd frɒm ði ˌɪntəˈnæʃənəl ˈtɜːmɪnəl ˈɛvri ˈθɜːti ˈmɪnɪts/',
            meaningVi: 'Khách sạn vận hành dịch vụ xe đưa đón miễn phí chạy giữa khách sạn và nhà ga quốc tế cứ mỗi 30 phút một chuyến.'
          }
        },
        {
          id: 'en_b1_8_8',
          word: 'currency exchange',
          pronunciation: '/ˈkʌrənsi ɪksˈtʃeɪndʒ/',
          partOfSpeech: 'noun',
          meaningVi: 'Quầy đổi ngoại tệ',
          radicals: 'Currency (tiền tệ) + Exchange (trao đổi)',
          grammarNote: 'Collocation: favorable exchange rate.',
          exampleSentence: {
            target: 'You will usually get a much better rate withdrawing foreign currency from an ATM than at the airport currency exchange.',
            pronunciation: '/juː wɪl ˈjuːʒʊəli ɡɛt ə mʌtʃ ˈbɛtə reɪt wɪðˈdrɔːɪŋ ˈfɒrɪn ˈkʌrənsi frɒm ən ˌeɪ tiː ˈɛm ðæn æt ði ˈeəpɔːt ˈkʌrənsi ɪksˈtʃeɪndʒ/',
            meaningVi: 'Bạn thường sẽ có tỷ giá tốt hơn nhiều khi rút ngoại tệ từ máy ATM so với đổi tại quầy ngoại tệ sân bay.'
          }
        }
      ]
    },
    {
      id: 'en_b1_l9',
      title: 'Lesson 9: Financial Budgeting, Expenses & Invoicing',
      grammarFocus: 'Expressing Numbers, Percentages, and Trends: Increased by 15%, Decreased to $10,000, Accounted for one third.',
      vocabularies: [
        {
          id: 'en_b1_9_1',
          word: 'invoice',
          pronunciation: '/ˈɪnvɔɪs/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Hóa đơn thanh toán tài chính',
          radicals: 'Etymology: French envoyer (to send)',
          grammarNote: 'Collocation: issue an invoice, settle an invoice.',
          exampleSentence: {
            target: 'Please issue the commercial invoice under our company name with net 30 payment terms.',
            pronunciation: '/pliːz ˈɪʃuː ðə kəˈmɜːʃəl ˈɪnvɔɪs ˈʌndər ˈaʊə ˈkʌmpəni neɪm wɪð nɛt ˈθɜːti ˈpeɪmənt tɜːmz/',
            meaningVi: 'Xin vui lòng xuất hóa đơn thương mại đứng tên công ty chúng tôi với điều khoản thanh toán trong vòng 30 ngày.'
          }
        },
        {
          id: 'en_b1_9_2',
          word: 'budget',
          pronunciation: '/ˈbʌdʒɪt/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Ngân sách tài chính dự trù',
          radicals: 'Etymology: Old French bougette (small leather purse)',
          grammarNote: 'Collocation: stay within budget, exceed the budget.',
          exampleSentence: {
            target: 'The department head commended the project lead for delivering all deliverables strictly within budget.',
            pronunciation: '/ðə dɪˈpɑːtmənt hɛd kəˈmɛndɪd ðə ˈprɒdʒɛkt liːd fɔː dɪˈlɪvərɪŋ ɔːl dɪˈlɪvərəbəlz ˈstrɪktli wɪðˈɪn ˈbʌdʒɪt/',
            meaningVi: 'Trưởng phòng đã khen ngợi người phụ trách dự án vì đã bàn giao toàn bộ sản phẩm hoàn toàn trong hạn mức ngân sách.'
          }
        },
        {
          id: 'en_b1_9_3',
          word: 'quarterly',
          pronunciation: '/ˈkwɔːtəli/',
          partOfSpeech: 'adj/adverb',
          meaningVi: 'Hàng quý, theo từng quý 3 tháng một lần',
          radicals: 'Etymology: quarter + -ly',
          grammarNote: 'Collocation: quarterly earnings report, quarterly review.',
          exampleSentence: {
            target: 'Our executive board convenes every three months to analyze the quarterly profit and loss statement.',
            pronunciation: '/ˈaʊər ɪɡˈzɛkjʊtɪv bɔːd kənˈviːnz ˈɛvri θriː mʌnθs tuː ˈænəlaɪz ðə ˈkwɔːtəli ˈprɒfɪt ænd lɒs ˈsteɪtmənt/',
            meaningVi: 'Hội đồng quản trị của chúng tôi triệu tập mỗi 3 tháng một lần để phân tích báo cáo kết quả lãi lỗ hàng quý.'
          }
        },
        {
          id: 'en_b1_9_4',
          word: 'expenditure',
          pronunciation: '/ɪkˈspɛndɪtʃər/',
          partOfSpeech: 'noun',
          meaningVi: 'Chi phí chi tiêu của tổ chức/doanh nghiệp',
          radicals: 'Etymology: Latin expendere (pay out / weigh out)',
          grammarNote: 'Collocation: capital expenditure (CapEx), operational expenditure (OpEx).',
          exampleSentence: {
            target: 'The management implemented strict austerity measures to curtail non-essential operational expenditure.',
            pronunciation: '/ðə ˈmænɪdʒmənt ˈɪmplɪmɛntɪd strɪkt ɔːˈstɛrɪti ˈmɛʒəz tuː kɜːˈteɪl nɒn ɪˈsɛnʃəl ˌɒpəˈreɪʃənəl ɪkˈspɛndɪtʃə/',
            meaningVi: 'Ban quản lý đã triển khai các biện pháp thắt lưng buộc bụng nghiêm ngặt để cắt giảm chi tiêu vận hành không thiết yếu.'
          }
        },
        {
          id: 'en_b1_9_5',
          word: 'revenue',
          pronunciation: '/ˈrɛvɪnjuː/',
          partOfSpeech: 'noun',
          meaningVi: 'Doanh thu thu về',
          radicals: 'Etymology: Latin revenire (come back / return)',
          grammarNote: 'Collocation: annual recurring revenue (ARR), gross revenue.',
          exampleSentence: {
            target: 'Expansion into Southeast Asian markets contributed to a thirty percent surge in overall annual revenue.',
            pronunciation: '/ɪkˈspænʃən ˈɪntuː saʊθ iːst ˈeɪʒən ˈmɑːkɪts kənˈtrɪbjuːtɪd tuː ə ˈθɜːti pəˈsɛnt sɜːdʒ ɪn ˈəʊvərɔːl ˈænjʊəl ˈrɛvɪnjuː/',
            meaningVi: 'Việc mở rộng sang các thị trường Đông Nam Á đã đóng góp vào mức tăng vọt 30% tổng doanh thu hàng năm.'
          }
        },
        {
          id: 'en_b1_9_6',
          word: 'deficit',
          pronunciation: '/ˈdɛfɪsɪt/',
          partOfSpeech: 'noun',
          meaningVi: 'Thâm hụt cán cân tài chính/ngân sách',
          radicals: 'Etymology: Latin deficere (lack / fail)',
          grammarNote: 'Collocation: budget deficit, trade deficit.',
          exampleSentence: {
            target: 'Without aggressive cost cutting, the division will face a projected budget deficit by the end of Q4.',
            pronunciation: '/wɪðˈaʊt əˈɡrɛsɪv kɒst ˈkʌtɪŋ, ðə dɪˈvɪʒən wɪl feɪs ə prəˈdʒɛktɪd ˈbʌdʒɪt ˈdɛfɪsɪt baɪ ði ɛnd əv kjuː fɔː/',
            meaningVi: 'Nếu không cắt giảm chi phí quyết liệt, bộ phận này sẽ đối mặt với khoản thâm hụt ngân sách dự kiến vào cuối quý 4.'
          }
        },
        {
          id: 'en_b1_9_7',
          word: 'fiscal',
          pronunciation: '/ˈfɪskəl/',
          partOfSpeech: 'adj',
          meaningVi: 'Thuộc về tài khóa, năm tài chính (Fiscal year)',
          radicals: 'Etymology: Latin fiscus (treasury / basket)',
          grammarNote: 'Collocation: fiscal year (FY), fiscal policy.',
          exampleSentence: {
            target: 'The company set ambitious growth targets for the upcoming 2027 fiscal year.',
            pronunciation: '/ðə ˈkʌmpəni sɛt æmˈbɪʃəs ɡrəʊθ ˈtɑːɡɪts fɔː ði ˈʌpˌkʌmɪŋ ˈtwɛnti ˈtwɛnti sɛvən ˈfɪskəl jɪə/',
            meaningVi: 'Công ty đã đề ra các mục tiêu tăng trưởng đầy tham vọng cho năm tài khóa 2027 sắp tới.'
          }
        },
        {
          id: 'en_b1_9_8',
          word: 'audit',
          pronunciation: '/ˈɔːdɪt/',
          partOfSpeech: 'noun/verb',
          meaningVi: 'Kiểm toán tài chính độc lập',
          radicals: 'Etymology: Latin audire (to hear - hearings of oral accounts)',
          grammarNote: 'Collocation: pass an external audit, internal audit.',
          exampleSentence: {
            target: 'The Big Four accounting firm successfully concluded their annual financial audit with zero compliance flags.',
            pronunciation: '/ðə bɪɡ fɔːr əˈkaʊntɪŋ fɜːm səkˈsɛsfʊli kənˈkluːdɪd ðeər ˈænjʊəl faɪˈnænʃəl ˈɔːdɪt wɪð ˈzɪərəʊ kəmˈplaɪəns flæɡz/',
            meaningVi: 'Công ty kiểm toán Big Four đã kết thúc thành công kỳ kiểm toán tài chính hàng năm với không một cảnh báo sai phạm nào.'
          }
        }
      ]
    },
    {
      id: 'en_b1_l10',
      title: 'Lesson 10: Remote Work Protocols, Cyber Safety & Phrasal Verbs',
      grammarFocus: 'Imperatives & Passive Modals for Workplace Protocols: Passwords must be updated regularly / Employees are required to use VPN.',
      vocabularies: [
        {
          id: 'en_b1_10_1',
          word: 'authenticate',
          pronunciation: '/ɔːˈθɛntɪkeɪt/',
          partOfSpeech: 'verb',
          meaningVi: 'Xác thực danh tính số (Two-factor authentication - 2FA)',
          radicals: 'Etymology: Greek authentikos (original / genuine)',
          grammarNote: 'Collocation: authenticate via two-factor SMS or authenticator app.',
          exampleSentence: {
            target: 'Employees logging in from remote locations must authenticate their identity using multi-factor verification.',
            pronunciation: '/ˌɛmplɔɪˈiːz ˈlɒɡɪŋ ɪn frɒm rɪˈməʊt ləʊˈkeɪʃənz mʌst ɔːˈθɛntɪkeɪt ðeər aɪˈdɛntɪti ˈjuːzɪŋ ˈmʌlti ˈfæktə ˌvɛrɪfɪˈkeɪʃən/',
            meaningVi: 'Nhân viên đăng nhập từ các địa điểm từ xa bắt buộc phải xác thực danh tính bằng phương thức xác thực đa yếu tố.'
          }
        },
        {
          id: 'en_b1_10_2',
          word: 'phishing',
          pronunciation: '/ˈfɪʃɪŋ/',
          partOfSpeech: 'noun',
          meaningVi: 'Lừa đảo mạo danh đánh cắp tài khoản qua email độc hại',
          radicals: 'Etymology: fishing (spelled with ph like phreaking)',
          grammarNote: 'Collocation: phishing email, phishing simulation.',
          exampleSentence: {
            target: 'Never click suspicious links or download unsolicited attachments that might be sophisticated phishing attempts.',
            pronunciation: '/ˈnɛvə klɪk səˈspɪʃəs lɪŋks ɔː ˌdaʊnˈləʊd ˌʌnsəˈlɪsɪtɪd əˈtætʃmənts ðæt maɪt biː səˈfɪstɪkeɪtɪd ˈfɪʃɪŋ əˈtɛmpts/',
            meaningVi: 'Tuyệt đối không nhấp vào các liên kết đáng ngờ hoặc tải xuống các tệp đính kèm không rõ nguồn gốc có thể là âm mưu lừa đảo tinh vi.'
          }
        },
        {
          id: 'en_b1_10_3',
          word: 'confidentiality',
          pronunciation: '/ˌkɒnfɪˌdɛnʃiˈæləti/',
          partOfSpeech: 'noun',
          meaningVi: 'Tính bảo mật thông tin nội bộ',
          radicals: 'Etymology: confident + -i- + -ality',
          grammarNote: 'Collocation: breach of confidentiality, maintain strict confidentiality.',
          exampleSentence: {
            target: 'All remote staff are bound by non-disclosure agreements to preserve absolute customer confidentiality.',
            pronunciation: '/ɔːl rɪˈməʊt stɑːf ɑː baʊnd baɪ nɒn dɪsˈkləʊʒər əˈɡriːmənts tuː prɪˈzɜːv ˈæbsəluːt ˈkʌstəmə ˌkɒnfɪˌdɛnʃiˈæləti/',
            meaningVi: 'Toàn bộ nhân viên làm việc từ xa đều bị ràng buộc bởi thỏa thuận không tiết lộ để giữ gìn tính bảo mật khách hàng tuyệt đối.'
          }
        },
        {
          id: 'en_b1_10_4',
          word: 'hybrid',
          pronunciation: '/ˈhaɪbrɪd/',
          partOfSpeech: 'adj/noun',
          meaningVi: 'Mô hình làm việc kết hợp linh hoạt giữa văn phòng và tại nhà',
          radicals: 'Etymology: Latin hybrida (mongrel / cross-breed)',
          grammarNote: 'Collocation: hybrid work model, hybrid schedule.',
          exampleSentence: {
            target: 'Our company adopted a hybrid working arrangement allowing employees to work two days from home each week.',
            pronunciation: '/ˈaʊə ˈkʌmpəni əˈdɒptɪd ə ˈhaɪbrɪd ˈwɜːkɪŋ əˈreɪndʒmənt əˈlaʊɪŋ ˌɛmplɔɪˈiːz tuː wɜːk tuː deɪz frɒm həʊm iːtʃ wiːk/',
            meaningVi: 'Công ty chúng tôi đã áp dụng mô hình làm việc kết hợp cho phép nhân viên làm việc 2 ngày tại nhà mỗi tuần.'
          }
        },
        {
          id: 'en_b1_10_5',
          word: 'bandwidth',
          pronunciation: '/ˈbændwɪdθ/',
          partOfSpeech: 'noun',
          meaningVi: 'Băng thông mạng internet / Khả năng tiếp nhận công việc',
          radicals: 'Etymology: band + width',
          grammarNote: 'Collocation: high bandwidth, lack the mental bandwidth.',
          exampleSentence: {
            target: 'For video conferences, ensure you have sufficient internet bandwidth to maintain high-definition audio and video.',
            pronunciation: '/fɔː ˈvɪdiəʊ ˈkɒnfərənsɪz, ɪnˈʃʊə juː hæv səˈfɪʃənt ˈɪntənɛt ˈbændwɪdθ tuː meɪnˈteɪn haɪ ˌdɛfɪˈnɪʃən ˈɔːdiəʊ ænd ˈvɪdiəʊ/',
            meaningVi: 'Đối với các cuộc họp video, hãy bảo đảm bạn có đủ băng thông internet để duy trì âm thanh và hình ảnh độ nét cao.'
          }
        },
        {
          id: 'en_b1_10_6',
          word: 'vulnerability',
          pronunciation: '/ˌvʌlnərəˈbɪləti/',
          partOfSpeech: 'noun',
          meaningVi: 'Lỗ hổng bảo mật hệ thống mạng',
          radicals: 'Etymology: Latin vulnerare (to wound)',
          grammarNote: 'Collocation: patch a vulnerability, security vulnerability.',
          exampleSentence: {
            target: 'The cybersecurity audit uncovered a critical vulnerability in the company\'s legacy internal portal.',
            pronunciation: '/ðə ˈsaɪbəsɪˌkjʊərəti ˈɔːdɪt ˌʌnˈkʌvəd ə ˈkrɪtɪkəl ˌvʌlnərəˈbɪləti ɪn ðə ˈkʌmpəniz ˈlɛɡəsi ɪnˈtɜːnəl ˈpɔːtəl/',
            meaningVi: 'Cuộc kiểm toán an ninh mạng đã phát hiện ra một lỗ hổng nghiêm trọng trong cổng thông tin nội bộ đời cũ của công ty.'
          }
        },
        {
          id: 'en_b1_10_7',
          word: 'log off',
          pronunciation: '/lɒɡ ɒf/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'Đăng xuất tài khoản an toàn sau ca làm việc',
          radicals: 'Etymology: log (ship\'s logbook) + off',
          grammarNote: 'Synonym: log out, sign out.',
          exampleSentence: {
            target: 'Never leave your workstation unattended without locking the screen and logging off public sessions.',
            pronunciation: '/ˈnɛvə liːv jɔː ˈwɜːkˌsteɪʃən ˌʌnəˈtɛndɪd wɪðˈaʊt ˈlɒkɪŋ ðə skriːn ænd ˈlɒɡɪŋ ɒf ˈpʌblɪk ˈsɛʃənz/',
            meaningVi: 'Tuyệt đối không rời bàn làm việc mà không khóa màn hình và đăng xuất khỏi các phiên đăng nhập công cộng.'
          }
        },
        {
          id: 'en_b1_10_8',
          word: 'back up',
          pronunciation: '/bæk ʌp/',
          partOfSpeech: 'phrasal verb',
          meaningVi: 'Sao lưu dữ liệu định kỳ (Backup)',
          radicals: 'Etymology: back + up',
          grammarNote: 'Separable: back up all databases / backup your files.',
          exampleSentence: {
            target: 'Engineers must back up all project source code to secure distributed cloud repositories daily.',
            pronunciation: '/ˌɛndʒɪˈnɪəz mʌst bæk ʌp ɔːl ˈprɒdʒɛkt sɔːs kəʊd tuː sɪˈkjʊə dɪˈstrɪbjuːtɪd klaʊd rɪˈpɒzɪtəriz ˈdeɪli/',
            meaningVi: 'Các kỹ sư bắt buộc phải sao lưu toàn bộ mã nguồn dự án lên các kho lưu trữ đám mây phân tán an toàn mỗi ngày.'
          }
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(__dirname, 'data-chunks/en_b1.json'), JSON.stringify(enB1, null, 2));
console.log('en_b1.json written! Lessons count:', enB1.lessons.length);
