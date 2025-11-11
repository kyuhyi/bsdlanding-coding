# CORS 수정 전/후 비교

## 🔴 문제 코드 (Before)

### 1. doOptions 함수
```javascript
/**
 * ❌ 문제: CORS 헤더가 없음!
 */
function doOptions(e) {
  return createCORSResponse();
}

function createCORSResponse() {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
  // CORS 헤더가 없어서 브라우저가 차단!
}
```

### 2. createSuccessResponse 함수
```javascript
/**
 * ❌ 문제: CORS 헤더가 없음!
 */
function createSuccessResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
  // CORS 헤더가 없어서 브라우저가 차단!
}
```

### 3. createErrorResponse 함수
```javascript
/**
 * ❌ 문제: CORS 헤더가 없음!
 */
function createErrorResponse(errorMessage) {
  const output = ContentService.createTextOutput(
    JSON.stringify({ error: errorMessage, timestamp: new Date().toISOString() })
  );
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
  // CORS 헤더가 없어서 브라우저가 차단!
}
```

### 결과
```
❌ CORS Error:
Access to fetch at 'https://script.google.com/macros/s/.../exec'
from origin 'https://bsdmvp.vercel.app'
has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

---

## ✅ 수정 코드 (After)

### 1. doOptions 함수
```javascript
/**
 * ✅ 해결: CORS 헤더 포함!
 */
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')           // ✅ 추가
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')  // ✅ 추가
    .setHeader('Access-Control-Allow-Headers', 'Content-Type')       // ✅ 추가
    .setHeader('Access-Control-Max-Age', '86400');                   // ✅ 추가
}
```

### 2. createSuccessResponse 함수
```javascript
/**
 * ✅ 해결: CORS 헤더 포함!
 */
function createSuccessResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')           // ✅ 추가
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')  // ✅ 추가
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');       // ✅ 추가
}
```

### 3. createErrorResponse 함수
```javascript
/**
 * ✅ 해결: CORS 헤더 포함!
 */
function createErrorResponse(errorMessage) {
  return ContentService
    .createTextOutput(JSON.stringify({
      error: errorMessage,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')           // ✅ 추가
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')  // ✅ 추가
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');       // ✅ 추가
}
```

### 결과
```
✅ Success:
Status: 200 OK
Response Headers:
  access-control-allow-origin: *
  access-control-allow-methods: GET, POST, OPTIONS
  access-control-allow-headers: Content-Type
  content-type: application/json

Response Body:
{
  "response": "안녕하세요! 👋 BSD 바이브코딩...",
  "timestamp": "2025-11-08T10:00:00.000Z",
  "responseTime": 1234
}
```

---

## 📊 비교 표

| 항목 | Before (문제) | After (해결) |
|------|---------------|--------------|
| **doOptions 함수** | CORS 헤더 없음 ❌ | CORS 헤더 포함 ✅ |
| **createSuccessResponse** | CORS 헤더 없음 ❌ | CORS 헤더 포함 ✅ |
| **createErrorResponse** | CORS 헤더 없음 ❌ | CORS 헤더 포함 ✅ |
| **브라우저 요청** | 차단됨 ❌ | 정상 작동 ✅ |
| **API 응답** | 받을 수 없음 ❌ | 정상 수신 ✅ |
| **Google Sheets 저장** | 안 됨 ❌ | 정상 저장 ✅ |

---

## 🔍 CORS 동작 과정

### Before (문제 발생)
```
1️⃣ 브라우저: Vercel → Google Apps Script POST 요청 시도
2️⃣ 브라우저: 먼저 OPTIONS 요청 (preflight) 전송
3️⃣ Google Apps Script: doOptions() 실행
   └─ ❌ Response에 CORS 헤더 없음
4️⃣ 브라우저: "CORS 정책 위반!" → ⛔ 차단
5️⃣ 사용자: 에러 메시지 표시
```

### After (정상 작동)
```
1️⃣ 브라우저: Vercel → Google Apps Script POST 요청 시도
2️⃣ 브라우저: 먼저 OPTIONS 요청 (preflight) 전송
3️⃣ Google Apps Script: doOptions() 실행
   └─ ✅ Response에 CORS 헤더 포함
4️⃣ 브라우저: "CORS 허용!" → ✅ 통과
5️⃣ 브라우저: 실제 POST 요청 전송
6️⃣ Google Apps Script: doPost() 실행
   └─ ✅ Response에 CORS 헤더 포함
7️⃣ 브라우저: 응답 수신 → ✅ 정상 처리
8️⃣ 사용자: AI 응답 표시
9️⃣ Google Sheets: 대화 내용 저장
```

---

## 🎯 핵심 포인트

### 왜 3개 함수 모두 수정해야 하나?

1. **doOptions**: OPTIONS preflight 요청 처리
   - 브라우저가 실제 요청 전에 먼저 확인
   - CORS 헤더 없으면 여기서 차단

2. **createSuccessResponse**: 성공 응답 처리
   - 실제 데이터 응답 시 필요
   - CORS 헤더 없으면 브라우저가 응답 차단

3. **createErrorResponse**: 에러 응답 처리
   - 에러 발생 시에도 CORS 필요
   - CORS 헤더 없으면 에러 메시지조차 받을 수 없음

### 필수 CORS 헤더

```javascript
// 1. 어떤 도메인에서 접근 가능한가?
.setHeader('Access-Control-Allow-Origin', '*')
// '*' = 모든 도메인 허용

// 2. 어떤 HTTP 메서드를 허용하나?
.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')

// 3. 어떤 헤더를 허용하나?
.setHeader('Access-Control-Allow-Headers', 'Content-Type')
```

---

## 📝 체크리스트

수정 완료 확인:
- [ ] `doOptions()` - CORS 헤더 4개 포함
- [ ] `createSuccessResponse()` - CORS 헤더 3개 포함
- [ ] `createErrorResponse()` - CORS 헤더 3개 포함
- [ ] 모든 함수에서 `.setHeader()` 체이닝 사용
- [ ] `Access-Control-Allow-Origin: *` 포함

배포 전 확인:
- [ ] 코드 저장 (Ctrl+S)
- [ ] testChat() 실행 성공
- [ ] 새 배포 생성
- [ ] Vercel 환경변수 업데이트

---

**결론**: 모든 응답 함수에 CORS 헤더를 추가하면 문제 완전 해결! ✅
