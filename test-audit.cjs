const https = require('https');

async function request(url, options = {}) {
  const t0 = Date.now();
  const res = await fetch(url, options);
  const duration = Date.now() - t0;
  let body = null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    body = await res.json();
  } else {
    body = await res.text();
  }
  return { status: res.status, ok: res.ok, duration, body };
}

async function runAudit() {
  const BASE = 'https://lingo.dangnam.online/api';
  console.log('====================================================');
  console.log('🔍 KIỂM TRA & KIỂM NGHIỆM CHUYÊN SÂU HỆ THỐNG LINGO555');
  console.log('Máy chủ Production: https://lingo.dangnam.online');
  console.log('Thời gian:', new Date().toISOString());
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  // 1. Kiểm tra Health & Web Page Container
  console.log('--- 1. KIỂM TRA TRANG CHỦ & SPA BUNDLE ---');
  try {
    const page = await request('https://lingo.dangnam.online/');
    if (page.ok && page.body.includes('<div id="root">')) {
      console.log(`✅ [PASS] Web App Root HTML: Status ${page.status} (${page.duration}ms) - Vite Bundle tải tốt`);
      passed++;
    } else {
      console.log(`❌ [FAIL] Web App Root HTML: Status ${page.status} (${page.duration}ms)`);
      failed++;
    }
  } catch(e) {
    console.log(`❌ [FAIL] Web App: ${e.message}`);
    failed++;
  }

  // 2. Kiểm tra Hệ thống Dữ liệu Ngôn ngữ & Cấp độ
  console.log('\n--- 2. KIỂM TRA TẦNG DỮ LIỆU & BẢN ĐỒ LỘ TRÌNH (API) ---');
  const getTests = [
    { name: 'GET /languages', url: `${BASE}/languages`, check: d => Array.isArray(d) && d.length >= 2 },
    { name: 'GET /levels?lang=zh', url: `${BASE}/levels?lang=zh`, check: d => Array.isArray(d) && d.length > 0 },
    { name: 'GET /levels?lang=en', url: `${BASE}/levels?lang=en`, check: d => Array.isArray(d) && d.length > 0 },
    { name: 'GET /units?level_id=zh_hsk1', url: `${BASE}/units?level_id=zh_hsk1&user_id=default_user`, check: d => Array.isArray(d) && d.length > 0 && d[0].lessons.length > 0 },
    { name: 'GET /user/profile', url: `${BASE}/user/profile?user_id=default_user`, check: d => d && d.id === 'default_user' && typeof d.xp === 'number' },
    { name: 'GET /user/leaderboard', url: `${BASE}/user/leaderboard`, check: d => Array.isArray(d) && d.length > 0 },
  ];

  let sampleLessonId = null;

  for (const t of getTests) {
    try {
      const res = await request(t.url);
      const isCheckPassed = res.ok && t.check(res.body);
      if (isCheckPassed) {
        console.log(`✅ [PASS] ${t.name}: Status ${res.status} (${res.duration}ms) - Phản hồi chuẩn xác`);
        passed++;
        if (t.name.includes('/units') && res.body[0]?.lessons[0]?.id) {
          sampleLessonId = res.body[0].lessons[0].id;
        }
      } else {
        console.log(`❌ [FAIL] ${t.name}: Status ${res.status} (${res.duration}ms)`);
        failed++;
      }
    } catch (e) {
      console.log(`❌ [FAIL] ${t.name}: Exception ${e.message}`);
      failed++;
    }
  }

  // 3. Kiểm tra Bài học & Bài tập (Exercises)
  console.log('\n--- 3. KIỂM TRA BÀI HỌC VÀ BÀI TẬP (LESSON ENGINE) ---');
  if (sampleLessonId) {
    try {
      const lessonRes = await request(`${BASE}/lessons/${sampleLessonId}`);
      if (lessonRes.ok && Array.isArray(lessonRes.body.exercises) && lessonRes.body.exercises.length > 0) {
        const exTypes = [...new Set(lessonRes.body.exercises.map(e => e.type))];
        console.log(`✅ [PASS] GET /lessons/${sampleLessonId}: Status ${lessonRes.status} (${lessonRes.duration}ms) - Có ${lessonRes.body.exercises.length} câu hỏi. Dạng bài tập: ${exTypes.join(', ')}`);
        passed++;
      } else {
        console.log(`❌ [FAIL] GET /lessons/${sampleLessonId}: Status ${lessonRes.status} (${lessonRes.duration}ms)`);
        failed++;
      }
    } catch(e) {
      console.log(`❌ [FAIL] GET /lessons: Exception ${e.message}`);
      failed++;
    }
  }

  // 4. Kiểm tra Kho Từ Điển & Tìm kiếm Phân trang (50.000 từ)
  console.log('\n--- 4. KIỂM TRA KHO TỪ ĐIỂN & TÌM KIẾM NHANH (FULL-TEXT SEARCH) ---');
  const dictTests = [
    { 
      name: 'Tra từ tiếng Trung "ni"', 
      url: `${BASE}/dictionary/search?q=ni&lang=zh&page=1&limit=5`, 
      check: d => Array.isArray(d.items) && d.items.length > 0 && d.pagination?.total > 0 
    },
    { 
      name: 'Tra từ tiếng Trung "好"', 
      url: `${BASE}/dictionary/search?q=%E5%A5%BD&lang=zh&page=1&limit=5`, 
      check: d => Array.isArray(d.items) && d.items.length > 0 && d.pagination?.total > 0 
    },
    { 
      name: 'Tra từ tiếng Anh "hello"', 
      url: `${BASE}/dictionary/search?q=hello&lang=en&page=1&limit=5`, 
      check: d => Array.isArray(d.items) && d.items.length > 0 && d.pagination?.total > 0 
    },
    { 
      name: 'Thống kê tổng kho từ vựng', 
      url: `${BASE}/dictionary/stats`, 
      check: d => typeof d.total === 'number' && d.total > 50000 
    },
  ];

  for (const dt of dictTests) {
    try {
      const res = await request(dt.url);
      if (res.ok && dt.check(res.body)) {
        const countInfo = res.body.pagination ? `(Tìm thấy ${res.body.pagination.total} từ vựng)` : `(${res.body.total_vocabularies} từ)`;
        console.log(`✅ [PASS] ${dt.name}: Status ${res.status} (${res.duration}ms) ${countInfo}`);
        passed++;
      } else {
        console.log(`❌ [FAIL] ${dt.name}: Status ${res.status} (${res.duration}ms)`);
        failed++;
      }
    } catch (e) {
      console.log(`❌ [FAIL] ${dt.name}: Exception ${e.message}`);
      failed++;
    }
  }

  // 5. Kiểm tra Tầng Gamification (Quests, Shop, SRS, Heart Refill)
  console.log('\n--- 5. KIỂM TRA CƠ CHẾ GAME HÓA & NGHIỆP VỤ (GAMIFICATION) ---');
  
  // Test Sync Quests
  try {
    const questRes = await request(`${BASE}/user/sync-quests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'default_user', quests: { date: '2026-10-17', lessons: { claimed: false } } })
    });
    if (questRes.ok && questRes.body.success && questRes.body.profile) {
      console.log(`✅ [PASS] POST /user/sync-quests: Status ${questRes.status} (${questRes.duration}ms) - Đồng bộ hồ sơ nhiệm vụ thành công`);
      passed++;
    } else {
      console.log(`❌ [FAIL] POST /user/sync-quests: Status ${questRes.status} (${questRes.duration}ms)`);
      failed++;
    }
  } catch(e) {
    console.log(`❌ [FAIL] POST /user/sync-quests: ${e.message}`);
    failed++;
  }

  // Test Placement Test Batch Unlock
  try {
    const unlockRes = await request(`${BASE}/user/batch-unlock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'default_user', targetLevelId: 'zh_hsk1', score: 8, total: 8 })
    });
    if (unlockRes.ok && unlockRes.body.success && unlockRes.body.profile) {
      console.log(`✅ [PASS] POST /user/batch-unlock: Status ${unlockRes.status} (${unlockRes.duration}ms) - API xếp lớp vượt cấp hoạt động tốt`);
      passed++;
    } else {
      console.log(`❌ [FAIL] POST /user/batch-unlock: Status ${unlockRes.status} (${unlockRes.duration}ms)`);
      failed++;
    }
  } catch(e) {
    console.log(`❌ [FAIL] POST /user/batch-unlock: ${e.message}`);
    failed++;
  }

  // Test SRS Review Queue
  try {
    const srsRes = await request(`${BASE}/srs/queue?user_id=default_user&lang=zh`);
    if (srsRes.ok && Array.isArray(srsRes.body.items)) {
      console.log(`✅ [PASS] GET /srs/queue: Status ${srsRes.status} (${srsRes.duration}ms) - Hàng đợi ôn tập SRS trả về ${srsRes.body.items.length} thẻ`);
      passed++;
    } else {
      console.log(`❌ [FAIL] GET /srs/queue: Status ${srsRes.status} (${srsRes.duration}ms)`);
      failed++;
    }
  } catch(e) {
    console.log(`❌ [FAIL] GET /srs/queue: ${e.message}`);
    failed++;
  }

  // Test Heart Refill
  try {
    const refillRes = await request(`${BASE}/user/refill-hearts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'default_user' })
    });
    if (refillRes.ok && refillRes.body.success) {
      console.log(`✅ [PASS] POST /user/refill-hearts: Status ${refillRes.status} (${refillRes.duration}ms) - Nạp lại tim thành công`);
      passed++;
    } else {
      console.log(`❌ [FAIL] POST /user/refill-hearts: Status ${refillRes.status} (${refillRes.duration}ms)`);
      failed++;
    }
  } catch(e) {
    console.log(`❌ [FAIL] POST /user/refill-hearts: ${e.message}`);
    failed++;
  }

  console.log('\n====================================================');
  console.log(`🏁 TỔNG KẾT KIỂM TOÁN: ${passed} PASS / ${failed} FAIL (Tỷ lệ đạt: ${Math.round((passed / (passed + failed)) * 100)}%)`);
  console.log('====================================================');
}

runAudit();
