# BSD 바이브코딩 AI 챗봇 설정 가이드

## 📋 Google Apps Script 설정

### 1단계: Google Apps Script 프로젝트 생성

1. [Google Apps Script](https://script.google.com) 접속
2. **새 프로젝트** 클릭
3. 프로젝트 이름을 "BSD Chatbot Backend"로 변경

### 2단계: 코드 복사

1. `Code.gs` 파일에 아래 Google Apps Script 코드 전체를 복사하여 붙여넣기
2. 코드는 이 문서 하단의 "Google Apps Script 전체 코드" 섹션 참조

### 3단계: 웹앱으로 배포

1. 우측 상단 **배포 > 새 배포** 클릭
2. 톱니바퀴 아이콘 클릭 → **웹 앱** 선택
3. 설정:
   - **설명**: BSD Chatbot API v1
   - **다음 사용자로 실행**: 나
   - **액세스 권한**: 모든 사용자 (익명 사용자 포함)
4. **배포** 클릭
5. **웹 앱 URL**을 복사 (예: `https://script.google.com/macros/s/...`)

### 4단계: Next.js 환경변수 설정

1. `.env.local` 파일 생성 (이미 있으면 열기)
2. Google Apps Script 웹앱 URL 추가:
   ```bash
   NEXT_PUBLIC_CHATBOT_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
3. 복사한 웹 앱 URL로 `YOUR_DEPLOYMENT_ID` 교체

**중요**: `.env.local` 파일은 `.gitignore`에 포함되어 있어 GitHub에 업로드되지 않습니다.

### 5단계: Vercel 환경변수 설정

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택 → **Settings** → **Environment Variables**
3. 새 변수 추가:
   - **Name**: `NEXT_PUBLIC_CHATBOT_API_URL`
   - **Value**: `https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec`
   - **Environments**: Production, Preview, Development 모두 체크
4. **Save** 클릭
5. 프로젝트 재배포 (자동으로 트리거됨)

### 6단계: 테스트

1. Google Apps Script에서 **실행 > testChat** 클릭하여 테스트
2. 로그에서 성공적인 응답 확인
3. Next.js 앱 실행: `npm run dev`
4. 챗봇 아이콘 클릭하여 대화 테스트

## 📊 Google Sheets 데이터 확인

스프레드시트 ID: `1DEhTSmZErDEMRaz2YYlEscBdMzyHLpf6Y6-zX39warA`

[Google Sheets 열기](https://docs.google.com/spreadsheets/d/1DEhTSmZErDEMRaz2YYlEscBdMzyHLpf6Y6-zX39warA/edit)

### 시트 구조

**Sheet 1 (활성 시트):**
- Timestamp: 대화 시간
- SessionID: 세션 식별자
- UserID: 사용자 ID (현재 anonymous)
- UserMessage: 사용자 메시지
- AIResponse: AI 응답
- MessageLength: 메시지 길이
- ResponseTime: 응답 시간(ms)

**UserInfo 시트 (자동 생성):**
- SessionID: 세션 식별자
- FirstAccess: 첫 접속 시간
- LastAccess: 마지막 접속 시간
- MessageCount: 메시지 수

## 🔑 API 정보

- **Gemini API Key**: `AIzaSyCPR0eioMW8t0m7x65uHiwQCqbDZJnbSoE`
- **Model**: `gemini-2.0-flash-exp`
- **Spreadsheet ID**: `1DEhTSmZErDEMRaz2YYlEscBdMzyHLpf6Y6-zX39warA`

## ✨ 주요 기능

### BSD 바이브코딩 전문 응답
- AI가 BSD와 바이브코딩 관련 질문에만 집중하여 답변
- 관련 없는 질문은 정중히 전문 분야 안내
- 자연스러운 상담 링크 제안

### 세션 관리
- localStorage 기반 세션 ID 생성
- 대화 기록 유지 (최근 3개)
- 컨텍스트 기반 연속 대화

### 폴백 시스템
- API 오류 시 로컬 FAQ 자동 응답
- 네트워크 문제에도 기본 응답 제공

### 마크다운 링크 지원
- `[텍스트](URL)` 형식 자동 변환
- 클릭 가능한 링크로 렌더링

## 🛠️ 트러블슈팅

### API 호출 실패
```
Error: Failed to fetch
```
**해결책**:
1. Google Apps Script 배포 URL 확인
2. "모든 사용자" 권한으로 배포되었는지 확인
3. CORS 설정 확인 (Apps Script는 자동 처리)

### 응답이 느림
```
Response time > 5000ms
```
**해결책**:
1. Gemini API quota 확인
2. `generationConfig.maxOutputTokens` 줄이기 (현재 1024)
3. 대화 기록 limit 줄이기 (현재 3개)

### 시트에 데이터가 저장 안 됨
```
Error: Permission denied
```
**해결책**:
1. Google Apps Script 권한 승인
2. 스프레드시트 ID 확인
3. `setupInitialSheets()` 함수 실행

## 📝 커스터마이징

### AI 응답 톤 변경
`BSD_CONTEXT` 상수 수정:
```javascript
const BSD_CONTEXT = `당신은 [새로운 설명]...`;
```

### Temperature 조정
```javascript
generationConfig: {
  temperature: 0.8,  // 0.0 (일관성) ~ 1.0 (창의성)
  maxOutputTokens: 1024
}
```

### 대화 기록 개수
```javascript
const chatHistory = getChatHistory(sessionId, 3);  // 3 → 원하는 숫자
```

## 📞 지원

문제 발생 시:
1. Google Apps Script 로그 확인: **실행 > 로그**
2. 브라우저 콘솔 확인 (F12)
3. Network 탭에서 API 요청/응답 확인

---

**마지막 업데이트**: 2025-11-08
**버전**: 1.0.0
