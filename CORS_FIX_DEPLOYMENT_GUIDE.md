# CORS 수정 배포 가이드

## 문제 상황
- CORS 에러로 Vercel → Google Apps Script API 호출 실패
- 데이터가 Google Sheets에 저장되지 않음
- 에러: `Access to fetch has been blocked by CORS policy`

## 핵심 수정 사항
기존 코드에서 **CORS 헤더가 응답에 포함되지 않았던 것**이 문제였습니다.

### 수정 전
```javascript
function createSuccessResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;  // ❌ CORS 헤더 없음!
}
```

### 수정 후
```javascript
function createSuccessResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')  // ✅ CORS 헤더 추가!
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
```

## 배포 단계

### 1단계: Google Apps Script 코드 교체

1. [Google Apps Script 프로젝트](https://script.google.com) 접속
2. 기존 "BSD Chatbot Backend" 프로젝트 열기
3. `Code.gs` 파일 내용을 **전체 선택 후 삭제**
4. `GOOGLE_APPS_SCRIPT_FINAL.js` 파일의 전체 코드를 복사하여 붙여넣기
5. **Ctrl+S** 또는 **파일 > 저장** 클릭 (중요!)
6. 저장 완료 확인

### 2단계: 새 배포 생성

1. 우측 상단 **배포 > 새 배포** 클릭
2. 톱니바퀴 아이콘 클릭 → **웹 앱** 선택
3. 설정:
   - **설명**: `BSD Chatbot API v2 - CORS Fixed`
   - **다음 사용자로 실행**: 나
   - **액세스 권한**: **모든 사용자 (익명 사용자 포함)**
4. **배포** 클릭
5. **웹 앱 URL** 복사 (새로운 배포 ID 포함)

### 3단계: 테스트 실행

배포 전에 코드가 제대로 작동하는지 확인:

1. Google Apps Script 편집기에서 함수 선택: `testChat`
2. **실행** 클릭
3. 권한 요청이 나오면 승인
4. 로그 확인: 정상 응답이 보여야 함

예상 로그:
```
챗봇 요청 - 세션: test_1699999999999, 메시지: 안녕하세요! 바이브코딩이 뭔가요?
=== Gemini 2.0 Flash API 호출 ===
응답 코드: 200
대화 로그 저장 완료
```

### 4단계: Vercel 환경변수 업데이트

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택 → **Settings** → **Environment Variables**
3. 기존 `NEXT_PUBLIC_CHATBOT_API_URL` 변수 찾기
4. **Edit** 클릭
5. **Value**를 새 배포 URL로 교체:
   ```
   https://script.google.com/macros/s/[새로운_배포_ID]/exec
   ```
6. **Save** 클릭
7. **Deployments** 탭으로 이동
8. **Redeploy** 버튼 클릭하여 재배포

### 5단계: 로컬 환경변수 업데이트 (선택사항)

로컬에서도 테스트하려면:

1. `.env.local` 파일 열기
2. URL 업데이트:
   ```bash
   NEXT_PUBLIC_CHATBOT_API_URL=https://script.google.com/macros/s/[새로운_배포_ID]/exec
   ```
3. 파일 저장
4. 개발 서버 재시작: `npm run dev`

## 검증 방법

### Google Sheets 확인
1. [Google Sheets 열기](https://docs.google.com/spreadsheets/d/1DEhTSmZErDEMRaz2YYlEscBdMzyHLpf6Y6-zX39warA/edit)
2. 챗봇으로 테스트 메시지 전송
3. Sheet1에 새 행이 추가되는지 확인:
   - Timestamp
   - SessionID
   - UserMessage
   - AIResponse
4. UserInfo 시트도 업데이트 확인

### 브라우저 개발자 도구 확인
1. Vercel 배포 사이트 열기
2. F12 → Network 탭
3. 챗봇 메시지 전송
4. API 요청 확인:
   - ✅ Status: 200 OK
   - ✅ Response Headers에 `access-control-allow-origin: *` 있음
   - ❌ CORS 에러 없음

### 예상 성공 응답
```json
{
  "response": "안녕하세요! 👋 BSD 바이브코딩 전문 교육센터입니다...",
  "timestamp": "2025-11-08T10:00:00.000Z",
  "responseTime": 1234
}
```

## 트러블슈팅

### 여전히 CORS 에러가 발생하는 경우

**문제**: 이전 배포 ID가 캐시되어 있을 수 있음

**해결**:
1. 브라우저 캐시 완전 삭제 (Ctrl+Shift+Delete)
2. Vercel에서 환경변수 다시 확인
3. Vercel 재배포 확인
4. 하드 리프레시 (Ctrl+F5)

### Google Sheets에 데이터가 저장 안 되는 경우

**문제**: 시트 권한 또는 초기화 문제

**해결**:
1. Google Apps Script에서 `setupInitialSheets` 함수 실행
2. Google Sheets 권한 확인 (스크립트가 스프레드시트 편집 권한 있는지)
3. 스프레드시트 ID 확인: `1DEhTSmZErDEMRaz2YYlEscBdMzyHLpf6Y6-zX39warA`

### API 응답이 느린 경우

**원인**: Gemini API 호출 지연 또는 quota 제한

**해결**:
1. Gemini API quota 확인
2. `generationConfig.maxOutputTokens` 줄이기 (1024 → 512)
3. 대화 기록 limit 줄이기 (3 → 2)

## 핵심 변경 사항 요약

| 항목 | 기존 | 수정 후 |
|------|------|---------|
| doOptions() | 없음 | CORS 헤더 포함 |
| createSuccessResponse() | CORS 헤더 없음 | CORS 헤더 포함 |
| createErrorResponse() | CORS 헤더 없음 | CORS 헤더 포함 |
| CORS Headers | 없음 | `Access-Control-Allow-*` 추가 |

## 체크리스트

배포 전 확인:
- [ ] Google Apps Script 코드 전체 교체 완료
- [ ] Ctrl+S로 저장 확인
- [ ] `testChat()` 함수 실행 성공
- [ ] 새 배포 생성 완료
- [ ] 새 배포 URL 복사
- [ ] Vercel 환경변수 업데이트
- [ ] Vercel 재배포 완료

배포 후 확인:
- [ ] 브라우저에서 CORS 에러 없음
- [ ] 챗봇 응답 정상 작동
- [ ] Google Sheets에 데이터 저장됨
- [ ] UserInfo 시트 업데이트됨

---

**모든 단계 완료 후**: 챗봇이 정상 작동하며 모든 대화가 Google Sheets에 기록됩니다! 🎉
