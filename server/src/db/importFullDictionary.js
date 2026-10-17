const fs = require('fs');
const path = require('path');
const readline = require('readline');
const db = require('./database');

const rawDir = path.join(__dirname, '../../data/raw');
const zhFile = path.join(rawDir, 'CVDICT.u8');
const enFile = path.join(rawDir, 'anhviet109K.txt');

// Pinyin tone mark converter
const toneMap = {
  a: ['ā', 'á', 'ǎ', 'à', 'a'],
  e: ['ē', 'é', 'ě', 'è', 'e'],
  o: ['ō', 'ó', 'ǒ', 'ò', 'o'],
  i: ['ī', 'í', 'ǐ', 'ì', 'i'],
  u: ['ū', 'ú', 'ǔ', 'ù', 'u'],
  v: ['ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü'],
  ü: ['ǖ', 'ǘ', 'ǚ', 'ǜ', 'ü']
};

function convertPinyin(pinyinStr) {
  if (!pinyinStr) return '';
  return pinyinStr.split(/\s+/).map(syllable => {
    const match = syllable.match(/^([a-zA-ZüÜvV:]+)([1-5])$/);
    if (!match) return syllable;
    let word = match[1].toLowerCase().replace('u:', 'ü').replace('v', 'ü');
    const tone = parseInt(match[2], 10) - 1;
    if (tone >= 4) return word; // neutral tone

    let index = -1;
    if (word.includes('a')) index = word.indexOf('a');
    else if (word.includes('e')) index = word.indexOf('e');
    else if (word.includes('ou')) index = word.indexOf('o');
    else {
      for (let i = word.length - 1; i >= 0; i--) {
        if ('iouü'.includes(word[i])) {
          index = i;
          break;
        }
      }
    }

    if (index !== -1 && toneMap[word[index]]) {
      const char = word[index];
      const replaced = toneMap[char][tone];
      return word.slice(0, index) + replaced + word.slice(index + 1);
    }
    return word;
  }).join(' ');
}

// Core HSK1 sample list
const HSK1_WORDS = new Set([
  '爱', '八', '爸爸', '杯子', '北京', '本', '不', '菜', '茶', '吃', '出租车', '打电话', '大', '的', '点',
  '电脑', '电视', '电影', '东西', '都', '读', '对不起', '多', '多少', '儿子', '二', '饭馆', '飞机', '分钟',
  '高兴', '个', '工作', '汉语', '好', '号', '喝', '和', '很', '后面', '回', '会', '火车站', '几', '家',
  '叫', '今天', '九', '开', '看', '看见', '块', '来', '老师', '了', '冷', '里', '零', '六', '妈妈',
  '吗', '买', '猫', '没', '没关系', '米饭', '明天', '名字', '哪', '哪里', '那', '那里', '呢', '能', '你',
  '年', '女儿', '朋友', '漂亮', '苹果', '七', '钱', '前面', '请', '去', '热', '人', '认识', '三', '商店',
  '上', '上午', '少', '谁', '什么', '十', '时候', '是', '书', '水', '水果', '睡觉', '说话', '四', '岁',
  '他', '她', '太', '天气', '听', '同学', '喂', '我', '我们', '五', '喜欢', '下', '下午', '下雨', '先生',
  '现在', '想', '小', '小姐', '些', '写', '谢谢', '星期', '学生', '学习', '学校', '一', '衣服', '医生',
  '医院', '椅子', '有', '月', '再见', '在', '怎么', '怎么样', '这', '这里', '中国', '中午', '住', '桌子',
  '字', '昨天', '坐', '做'
]);

const HSK2_WORDS = new Set([
  '吧', '白', '百', '帮助', '报纸', '比', '别', '长', '唱歌', '出', '穿', '次', '从', '错', '打篮球',
  '大家', '到', '得', '等', '弟弟', '第一', '懂', '对', '房间', '非常', '服务员', '高', '告诉', '哥哥',
  '给', '公共汽车', '公司', '贵', '过', '还', '孩子', '好吃', '黑', '红', '欢迎', '回答', '机场', '鸡蛋',
  '件', '教室', '姐姐', '介绍', '进', '近', '就', '觉得', '咖啡', '开始', '考试', '可能', '可以', '课',
  '快', '快乐', '累', '离', '两', '路', '旅游', '卖', '慢', '忙', '每', '妹妹', '门', '男人', '您',
  '牛奶', '女人', '旁边', '跑步', '便宜', '票', '妻子', '起床', '千', '铅笔', '晴', '去年', '让', '日',
  '上班', '身体', '生病', '生日', '时间', '事情', '手表', '手机', '说话', '送', '虽然', '但是', '它',
  '踢足球', '题', '跳舞', '外', '完', '玩', '晚上', '往', '为什么', '问', '问题', '西瓜', '希望', '洗',
  '小时', '笑', '新', '姓', '休息', '雪', '颜色', '眼睛', '羊肉', '药', '要', '也', '一起', '一下',
  '已经', '意思', '因为', '所以', '阴', '游泳', '右边', '鱼', '元', '远', '运动', '再', '早上', '丈夫',
  '找', '着', '真', '正在', '知道', '准备', '自行车', '走', '最', '左边'
]);

// Determine Chinese word level
function getZhLevel(word) {
  if (HSK1_WORDS.has(word)) return 'HSK1';
  if (HSK2_WORDS.has(word)) return 'HSK2';
  if (word.length === 1) return 'HSK3';
  if (word.length === 2) return 'HSK4';
  if (word.length === 3) return 'HSK5';
  return 'HSK6';
}

// Core A1 English common words
const EN_A1_WORDS = new Set([
  'a', 'about', 'above', 'across', 'action', 'activity', 'actor', 'actress', 'add', 'address', 'adult',
  'advice', 'afraid', 'after', 'afternoon', 'again', 'age', 'ago', 'agree', 'air', 'airport', 'all',
  'also', 'always', 'amazing', 'and', 'angry', 'animal', 'another', 'answer', 'any', 'anyone', 'anything',
  'apartment', 'apple', 'area', 'arm', 'around', 'arrive', 'art', 'artist', 'as', 'ask', 'at', 'aunt',
  'autumn', 'away', 'baby', 'back', 'bad', 'bag', 'ball', 'banana', 'band', 'bank', 'bath', 'bathroom',
  'be', 'beach', 'beautiful', 'because', 'become', 'bed', 'bedroom', 'beer', 'before', 'begin', 'behind',
  'believe', 'below', 'best', 'better', 'between', 'bicycle', 'big', 'bike', 'bill', 'bird', 'birthday',
  'black', 'blog', 'blonde', 'blue', 'boat', 'body', 'book', 'boot', 'bored', 'boring', 'born', 'both',
  'bottle', 'box', 'boy', 'boyfriend', 'bread', 'break', 'breakfast', 'bring', 'brother', 'brown', 'build',
  'building', 'bus', 'business', 'busy', 'but', 'butter', 'buy', 'by', 'bye', 'cafe', 'cake', 'call',
  'camera', 'can', 'cannot', 'capital', 'car', 'card', 'care', 'careful', 'carrot', 'carry', 'cat',
  'catch', 'centre', 'century', 'chair', 'change', 'chart', 'cheap', 'check', 'cheese', 'chicken',
  'child', 'chocolate', 'choose', 'cinema', 'city', 'class', 'classroom', 'clean', 'climb', 'clock',
  'close', 'clothes', 'club', 'coat', 'coffee', 'cold', 'college', 'colour', 'come', 'common', 'company',
  'compare', 'complete', 'computer', 'concert', 'conversation', 'cook', 'cooking', 'cool', 'correct',
  'cost', 'country', 'course', 'cousin', 'cow', 'cream', 'create', 'culture', 'cup', 'customer', 'cut',
  'dad', 'dance', 'dancer', 'dancing', 'dangerous', 'dark', 'date', 'daughter', 'day', 'dear', 'december',
  'decide', 'delicious', 'describe', 'description', 'desk', 'detail', 'dialogue', 'dictionary', 'die',
  'diet', 'difference', 'different', 'difficult', 'dinner', 'director', 'dirty', 'discuss', 'dish',
  'do', 'doctor', 'dog', 'dollar', 'door', 'down', 'draw', 'drawing', 'dream', 'dress', 'drink', 'drive',
  'driver', 'during', 'each', 'early', 'ear', 'earth', 'easily', 'easy', 'eat', 'egg', 'eight', 'eighteen',
  'eighty', 'elephant', 'eleven', 'else', 'email', 'end', 'enjoy', 'enough', 'enter', 'error', 'even',
  'evening', 'event', 'ever', 'every', 'everyone', 'everything', 'everywhere', 'exam', 'example', 'excellent',
  'excited', 'exciting', 'exercise', 'expensive', 'explain', 'extra', 'eye', 'face', 'fact', 'fall',
  'family', 'famous', 'fantastic', 'far', 'farm', 'farmer', 'fast', 'fat', 'father', 'favourite', 'feel',
  'feeling', 'festival', 'few', 'fifteen', 'fifth', 'fifty', 'fill', 'film', 'final', 'find', 'fine',
  'finish', 'fire', 'first', 'fish', 'five', 'flat', 'flight', 'floor', 'flower', 'fly', 'follow',
  'food', 'foot', 'football', 'for', 'foreign', 'forest', 'forget', 'fork', 'four', 'fourteen', 'fourth',
  'free', 'fresh', 'friday', 'friend', 'friendly', 'from', 'front', 'fruit', 'full', 'fun', 'funny',
  'future', 'game', 'garden', 'gas', 'get', 'girl', 'girlfriend', 'give', 'glad', 'glass', 'glasses',
  'go', 'good', 'goodbye', 'grandfather', 'grandmother', 'grandparent', 'great', 'green', 'grey',
  'group', 'grow', 'guess', 'guitar', 'guy', 'gym', 'hair', 'half', 'hand', 'happen', 'happy', 'hard',
  'hat', 'hate', 'have', 'he', 'head', 'health', 'healthy', 'hear', 'heart', 'heavy', 'hello', 'help',
  'her', 'here', 'hero', 'hers', 'hi', 'high', 'hill', 'him', 'his', 'history', 'hobby', 'holiday',
  'home', 'homework', 'hope', 'horse', 'hospital', 'hot', 'hotel', 'hour', 'house', 'how', 'however',
  'huge', 'hundred', 'hungry', 'husband', 'i', 'ice', 'idea', 'if', 'ill', 'important', 'improve', 'in',
  'include', 'information', 'interest', 'interested', 'interesting', 'internet', 'interview', 'into',
  'introduce', 'island', 'it', 'its', 'jacket', 'january', 'jeans', 'job', 'join', 'journey', 'juice',
  'july', 'june', 'just', 'keep', 'key', 'kid', 'kill', 'kilometre', 'kind', 'kitchen', 'knife',
  'know', 'land', 'language', 'large', 'last', 'late', 'later', 'laugh', 'learn', 'leave', 'left',
  'leg', 'lesson', 'let', 'letter', 'library', 'lie', 'life', 'light', 'like', 'line', 'lion', 'lip',
  'list', 'listen', 'little', 'live', 'living', 'local', 'long', 'look', 'lose', 'lot', 'loud', 'love',
  'lovely', 'low', 'lunch', 'machine', 'magazine', 'main', 'make', 'man', 'many', 'map', 'march',
  'market', 'married', 'match', 'may', 'maybe', 'me', 'meal', 'mean', 'meaning', 'meat', 'meet',
  'meeting', 'member', 'menu', 'message', 'metre', 'midnight', 'mile', 'milk', 'million', 'minute',
  'miss', 'mistake', 'model', 'modern', 'moment', 'monday', 'money', 'month', 'more', 'morning', 'most',
  'mother', 'mountain', 'mouse', 'mouth', 'move', 'movie', 'much', 'museum', 'music', 'musician', 'must',
  'my', 'myself', 'name', 'natural', 'near', 'nearly', 'neck', 'need', 'neighbour', 'never', 'new',
  'news', 'newspaper', 'next', 'nice', 'night', 'nine', 'nineteen', 'ninety', 'no', 'nobody', 'noise',
  'noisy', 'noon', 'north', 'nose', 'not', 'note', 'nothing', 'november', 'now', 'number', 'nurse',
  'object', 'o\'clock', 'october', 'of', 'off', 'office', 'officer', 'often', 'oh', 'oil', 'ok', 'old',
  'on', 'once', 'one', 'onion', 'online', 'only', 'open', 'opinion', 'opposite', 'or', 'orange', 'order',
  'other', 'our', 'ours', 'ourselves', 'out', 'outside', 'over', 'own', 'page', 'paint', 'painter',
  'painting', 'pair', 'paper', 'paragraph', 'parent', 'park', 'part', 'partner', 'party', 'pass',
  'past', 'pay', 'pen', 'pencil', 'people', 'pepper', 'per', 'perfect', 'period', 'person', 'personal',
  'phone', 'photo', 'photograph', 'photographer', 'phrase', 'piano', 'picture', 'piece', 'pig', 'pilot',
  'pink', 'place', 'plan', 'plane', 'plant', 'plate', 'play', 'player', 'please', 'point', 'police',
  'policeman', 'pool', 'poor', 'popular', 'possible', 'post', 'potato', 'practice', 'prefer', 'prepare',
  'present', 'pretty', 'price', 'problem', 'programme', 'project', 'purple', 'put', 'quarter', 'queen',
  'question', 'quick', 'quickly', 'quiet', 'quite', 'radio', 'rain', 'read', 'reader', 'reading', 'ready',
  'real', 'really', 'reason', 'red', 'relax', 'remember', 'repeat', 'report', 'restaurant', 'result',
  'return', 'rice', 'rich', 'ride', 'right', 'river', 'road', 'room', 'round', 'run', 'sad', 'safe',
  'salad', 'salt', 'same', 'sandwich', 'saturday', 'say', 'school', 'science', 'scientist', 'sea',
  'second', 'section', 'see', 'send', 'sentence', 'september', 'seven', 'seventeen', 'seventy', 'share',
  'she', 'sheep', 'shirt', 'shoe', 'shop', 'shopping', 'short', 'should', 'show', 'shower', 'sick',
  'similar', 'sing', 'singer', 'sister', 'sit', 'situation', 'six', 'sixteen', 'sixty', 'skill', 'skirt',
  'sky', 'sleep', 'slow', 'slowly', 'small', 'smart', 'smile', 'smoke', 'smoking', 'snow', 'so', 'sock',
  'sofa', 'some', 'somebody', 'someone', 'something', 'sometimes', 'somewhere', 'son', 'song', 'soon',
  'sorry', 'sound', 'soup', 'south', 'space', 'speak', 'special', 'spell', 'spelling', 'spend', 'sport',
  'spring', 'stand', 'star', 'start', 'station', 'stay', 'steak', 'still', 'stop', 'store', 'story',
  'street', 'strong', 'student', 'study', 'style', 'subject', 'success', 'successful', 'sugar', 'summer',
  'sun', 'sunday', 'supermarket', 'sure', 'surprise', 'surprised', 'sweet', 'swim', 'swimming', 'table',
  'take', 'talk', 'tall', 'tea', 'teach', 'teacher', 'team', 'teenager', 'telephone', 'television',
  'tell', 'ten', 'tennis', 'terrible', 'test', 'than', 'thank', 'thanks', 'that', 'the', 'theatre',
  'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'thing', 'think', 'third',
  'thirsty', 'thirteen', 'thirty', 'this', 'those', 'though', 'thousand', 'three', 'through', 'thursday',
  'ticket', 'time', 'tired', 'title', 'to', 'today', 'together', 'toilet', 'tomorrow', 'tonight', 'too',
  'tooth', 'top', 'topic', 'tourist', 'town', 'traffic', 'train', 'travel', 'tree', 'trip', 'trousers',
  'true', 'try', 't-shirt', 'tuesday', 'turn', 'tv', 'twelve', 'twenty', 'twice', 'two', 'type',
  'umbrella', 'uncle', 'under', 'understand', 'university', 'until', 'up', 'us', 'use', 'useful', 'usual',
  'usually', 'vacation', 'vegetable', 'very', 'video', 'village', 'visit', 'visitor', 'voice', 'wait',
  'waiter', 'wake', 'walk', 'wall', 'want', 'warm', 'wash', 'watch', 'water', 'way', 'we', 'wear',
  'weather', 'website', 'wednesday', 'week', 'weekend', 'welcome', 'well', 'west', 'what', 'when',
  'where', 'which', 'while', 'white', 'who', 'whole', 'why', 'wife', 'will', 'win', 'window', 'wine',
  'winter', 'with', 'without', 'woman', 'wonderful', 'word', 'work', 'worker', 'world', 'worry', 'would',
  'write', 'writer', 'writing', 'wrong', 'yeah', 'year', 'yellow', 'yes', 'yesterday', 'you', 'young',
  'your', 'yours', 'yourself'
]);

function getEnLevel(word) {
  const clean = word.toLowerCase().trim();
  if (EN_A1_WORDS.has(clean)) return 'A1';
  if (clean.length <= 4) return 'A2';
  if (clean.length <= 7) return 'B1';
  if (clean.length <= 10) return 'B2';
  return 'C1';
}

async function runImport() {
  console.log('🚀 Starting Massive Dictionary Import (> 200,000 words)...');
  const startTime = Date.now();

  // Create additional fast search indexes
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_vocab_lang_meaning ON vocabularies(language_id, meaning);
  `);

  const insertStmt = db.prepare(`
    INSERT INTO vocabularies (
      language_id, word, traditional, phonetic, han_viet, meaning, 
      part_of_speech, level, category, radical, stroke_count, 
      example_target, example_phonetic, example_meaning, tags
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Clear existing synthetic/old vocabulary data to make room for clean real dictionary
  console.log('Clearing old synthetic dictionary rows...');
  db.prepare('DELETE FROM vocabularies').run();
  console.log('Old rows cleared.');

  // 1. IMPORT CHINESE (CVDICT.u8)
  console.log('Reading and parsing CVDICT.u8 (Chinese-Vietnamese)...');
  const zhRl = readline.createInterface({
    input: fs.createReadStream(zhFile, 'utf8'),
    crlfDelay: Infinity
  });

  let zhCount = 0;
  let zhBatch = [];

  const flushZhBatch = db.transaction((rows) => {
    for (const r of rows) {
      insertStmt.run(
        r.language_id, r.word, r.traditional, r.phonetic, r.han_viet, r.meaning,
        r.part_of_speech, r.level, r.category, r.radical, r.stroke_count,
        r.example_target, r.example_phonetic, r.example_meaning, r.tags
      );
    }
  });

  for await (const line of zhRl) {
    if (!line || line.startsWith('#') || line.startsWith('%')) continue;
    // Format: Traditional Simplified [pinyin] /meaning 1/meaning 2/
    const match = line.match(/^(\S+)\s+(\S+)\s+\[([^\]]+)\]\s+\/(.*)\//);
    if (!match) continue;

    const trad = match[1].trim();
    const simp = match[2].trim();
    const pinyinRaw = match[3].trim();
    const meaningsRaw = match[4].trim();

    const pinyinAccented = convertPinyin(pinyinRaw);
    const meaningsList = meaningsRaw.split('/')
      .map(m => m.trim())
      .filter(m => m.length > 0 && !m.startsWith('CL:')); // filter out measure word annotations

    if (meaningsList.length === 0) continue;
    const meaning = meaningsList.slice(0, 5).join('; ');
    const level = getZhLevel(simp);

    zhBatch.push({
      language_id: 'zh',
      word: simp,
      traditional: trad !== simp ? trad : null,
      phonetic: pinyinAccented,
      han_viet: null,
      meaning: meaning,
      part_of_speech: 'từ vựng',
      level: level,
      category: 'Từ điển Hán Việt',
      radical: simp.length === 1 ? simp : '',
      stroke_count: simp.length,
      example_target: null,
      example_phonetic: null,
      example_meaning: null,
      tags: 'cvdict'
    });

    if (zhBatch.length >= 10000) {
      flushZhBatch(zhBatch);
      zhCount += zhBatch.length;
      console.log(`  Imported ${zhCount.toLocaleString()} Chinese words...`);
      zhBatch = [];
    }
  }

  if (zhBatch.length > 0) {
    flushZhBatch(zhBatch);
    zhCount += zhBatch.length;
    console.log(`  Imported ${zhCount.toLocaleString()} Chinese words...`);
  }

  console.log(`✅ Finished Chinese import: ${zhCount.toLocaleString()} entries!`);

  // 2. IMPORT ENGLISH (anhviet109K.txt)
  console.log('Reading and parsing anhviet109K.txt (English-Vietnamese)...');
  const enText = fs.readFileSync(enFile, 'utf8');
  const enRawEntries = enText.split('\n@');
  console.log(`Found ${enRawEntries.length.toLocaleString()} raw English entries. Processing...`);

  let enCount = 0;
  let enBatch = [];

  const flushEnBatch = db.transaction((rows) => {
    for (const r of rows) {
      insertStmt.run(
        r.language_id, r.word, r.traditional, r.phonetic, r.han_viet, r.meaning,
        r.part_of_speech, r.level, r.category, r.radical, r.stroke_count,
        r.example_target, r.example_phonetic, r.example_meaning, r.tags
      );
    }
  });

  for (let i = 0; i < enRawEntries.length; i++) {
    const entry = enRawEntries[i];
    if (!entry) continue;

    const lines = entry.split('\n');
    const header = lines[0].trim();
    if (!header) continue;

    // header is: word /ipa/
    const match = header.match(/^([^\/]+)(?:\/(.*)\/)?/);
    if (!match) continue;

    const word = match[1].trim();
    if (!word || word.length > 80) continue;
    const ipa = match[2] ? '/' + match[2].trim() + '/' : '';

    const meanings = [];
    let exampleTarget = '';
    let exampleMeaning = '';
    let partOfSpeech = '';

    for (let j = 1; j < lines.length; j++) {
      const line = lines[j].trim();
      if (!line) continue;
      if (line.startsWith('*')) {
        if (!partOfSpeech) {
          partOfSpeech = line.replace(/^\*+\s*/, '').trim();
        }
      } else if (line.startsWith('-')) {
        const m = line.replace(/^-+\s*/, '').trim();
        if (m && meanings.length < 5) meanings.push(m);
      } else if (line.startsWith('=')) {
        if (!exampleTarget) {
          const exPart = line.replace(/^=+\s*/, '').split('+');
          exampleTarget = (exPart[0] || '').trim();
          exampleMeaning = (exPart[1] || '').trim();
        }
      }
    }

    if (meanings.length === 0) continue;
    const meaning = meanings.join('; ');
    const level = getEnLevel(word);

    enBatch.push({
      language_id: 'en',
      word: word,
      traditional: word,
      phonetic: ipa,
      han_viet: null,
      meaning: meaning,
      part_of_speech: partOfSpeech || 'từ vựng',
      level: level,
      category: 'Từ điển Anh Việt',
      radical: null,
      stroke_count: word.length,
      example_target: exampleTarget || null,
      example_phonetic: null,
      example_meaning: exampleMeaning || null,
      tags: 'anhviet109k'
    });

    if (enBatch.length >= 10000) {
      flushEnBatch(enBatch);
      enCount += enBatch.length;
      console.log(`  Imported ${enCount.toLocaleString()} English words...`);
      enBatch = [];
    }
  }

  if (enBatch.length > 0) {
    flushEnBatch(enBatch);
    enCount += enBatch.length;
    console.log(`  Imported ${enCount.toLocaleString()} English words...`);
  }

  console.log(`✅ Finished English import: ${enCount.toLocaleString()} entries!`);

  const totalWords = db.prepare('SELECT count(*) as count FROM vocabularies').get().count;
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('========================================================');
  console.log(`🎉 IMPORT COMPLETE in ${duration}s!`);
  console.log(`📊 TOTAL WORDS IN DATABASE: ${totalWords.toLocaleString()} entries!`);
  console.log('========================================================');
}

runImport().catch(console.error);
