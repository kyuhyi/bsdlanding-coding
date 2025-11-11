# CORS 문제 완전 해결 - 요약

## 🔴 문제 상황

### 증상
```
Access to fetch at 'https://script.google.com/macros/s/.../exec'
from origin 'https://bsdmvp.vercel.app'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header
```

### 영향
- ❌ Vercel → Google Apps Script API 호출 실패
- ❌ 챗봇 응답 안 됨
- ❌ Google Sheets에 대화 내용 저장 안 됨

## 🔍 근본 원인

이전에 제공한 코드에서 **CORS 헤더가 응답 함수에 누락**되어 있었습니다.

### 문제 코드 (이전)
```javascript
// doOptions()는 있었지만...
function doOptions(e) {
  return createCORSResponse();
}

function createCORSResponse() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
  // ❌ CORS 헤더가 없음!
}

// 실제 응답 함수들도 CORS 헤더 없음
function createSuccessResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;  // ❌ CORS 헤더가 없음!
}
```

### 왜 에러가 발생했나?
1. 브라우저가 Vercel → Google Apps Script로 POST 요청
2. 브라우저가 먼저 OPTIONS 요청 (preflight) 전송
3. `doOptions()` 함수 실행되지만 CORS 헤더 없음
4. 실제 POST 요청 응답에도 CORS 헤더 없음
5. **브라우저가 보안상 응답 차단!**

## ✅ 해결 방법

### 수정 코드
```javascript
/**
 * OPTIONS preflight - CORS 헤더 포함
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')
    .setHeader('Access-Control-Max-Age', '86400');
}

/**
 * 성공 응답 - CORS 헤더 포함
 */
function createSuccessResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

/**
 * 에러 응답 - CORS 헤더 포함
 */
function createErrorResponse(errorMessage) {
  return ContentService
    .createTextOutput(JSON.stringify({
      error: errorMessage,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
```

## 📋 배포 체크리스트

### Step 1: Google Apps Script 코드 교체
```
✓ Google Apps Script 프로젝트 열기
✓ Code.gs 내용 전체 삭제
✓ GOOGLE_APPS_SCRIPT_FINAL.js 내용 붙여넣기
✓ Ctrl+S로 저장
✓ testChat() 함수 실행하여 테스트
✓ 배포 > 새 배포 생성
✓ "모든 사용자 (익명 사용자 포함)" 권한 설정
✓ 새 배포 URL 복사
```

### Step 2: Vercel 환경변수 업데이트
```
✓ Vercel Dashboard → Settings → Environment Variables
✓ NEXT_PUBLIC_CHATBOT_API_URL 편집
✓ 새 배포 URL로 교체
✓ Save 클릭
✓ Deployments → Redeploy
```

### Step 3: 검증
```
✓ Vercel 사이트 열기
✓ F12 → Network 탭
✓ 챗봇 메시지 전송
✓ Status: 200 OK 확인
✓ Response Headers에 "access-control-allow-origin" 있는지 확인
✓ Google Sheets에 데이터 저장 확인
```

## 🎯 기대 결과

### 성공 시 응답
```json
{
  "response": "안녕하세요! 👋 BSD 바이브코딩 전문 교육센터입니다.\n무엇을 도와드릴까요?",
  "timestamp": "2025-11-08T10:00:00.000Z",
  "responseTime": 1234
}
```

### Response Headers (성공)
```
access-control-allow-origin: *
access-control-allow-methods: GET, POST, OPTIONS
access-control-allow-headers: Content-Type
content-type: application/json
```

### Google Sheets 저장
**Sheet1 (ChatLogs):**
| Timestamp | SessionID | UserID | UserMessage | AIResponse | MessageLength | ResponseTime |
|-----------|-----------|--------|-------------|------------|---------------|--------------|
| 2025-11-08 10:00:00 | session_123 | anonymous | 안녕하세요 | 안녕하세요! 👋 ... | 5 | 1234 |

**UserInfo:**
| SessionID | FirstAccess | LastAccess | MessageCount |
|-----------|-------------|------------|--------------|
| session_123 | 2025-11-08 10:00:00 | 2025-11-08 10:00:00 | 1 |

## 📁 관련 파일

### 새로 생성된 파일
1. **GOOGLE_APPS_SCRIPT_FINAL.js** - CORS 수정된 완전한 Google Apps Script 코드
2. **CORS_FIX_DEPLOYMENT_GUIDE.md** - 상세한 배포 가이드
3. **CORS_문제_해결_요약.md** - 이 문서

### 업데이트된 파일
1. **DEPLOYMENT_UPDATE.md** - 배포 히스토리 업데이트

### 기존 파일 (변경 없음)
1. **.env.local** - 로컬 환경변수 (배포 후 URL 업데이트 필요)
2. **.env.example** - 환경변수 템플릿
3. **CHATBOT_SETUP.md** - 초기 설정 가이드
4. **components/AIChatbot.tsx** - 프론트엔드 코드 (변경 불필요)

## ⚠️ 주의사항

### 꼭 기억하세요!
1. **저장은 필수**: Google Apps Script 코드 수정 후 반드시 Ctrl+S
2. **새 배포 생성**: 기존 배포 수정이 아닌 새 배포 생성 필요
3. **환경변수 교체**: 이전 URL이 아닌 새 배포 URL 사용
4. **재배포 필수**: Vercel 환경변수 변경 후 반드시 재배포

### 트러블슈팅
- CORS 에러 여전히 발생 → 브라우저 캐시 완전 삭제 (Ctrl+Shift+Delete)
- 데이터 저장 안 됨 → Google Apps Script에서 `setupInitialSheets()` 실행
- 느린 응답 → Gemini API quota 확인

## 🎉 완료 후 기대 효과

✅ Vercel에서 Google Apps Script API 정상 호출
✅ 챗봇이 Gemini 2.0 Flash로 BSD 전문 응답 제공
✅ 모든 대화가 Google Sheets에 자동 저장
✅ 세션 관리로 연속 대화 가능
✅ UserInfo로 사용자 활동 추적 가능

---

**다음 단계**: `CORS_FIX_DEPLOYMENT_GUIDE.md`를 보고 단계별로 배포하세요!
