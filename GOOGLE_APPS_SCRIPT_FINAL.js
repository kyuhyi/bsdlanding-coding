/**
 * BSD 바이브코딩 전문 AI 챗봇 백엔드 - CORS 완전 수정 버전
 * Google Sheets를 데이터베이스로 사용
 * Gemini 2.0 Flash API 사용
 */

// 설정 상수
const GEMINI_API_KEY = 'AIzaSyCPR0eioMW8t0m7x65uHiwQCqbDZJnbSoE';
const SPREADSHEET_ID = '1DEhTSmZErDEMRaz2YYlEscBdMzyHLpf6Y6-zX39warA';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

// BSD 바이브코딩 컨텍스트
const BSD_CONTEXT = `당신은 BSD 바이브코딩 전문 교육센터의 AI 상담봇입니다.

# BSD 바이브코딩이란?
- AI를 활용해 코드 없이 빠르게 MVP(최소 기능 제품)를 제작하는 혁신적인 개발 방법
- 1인 사업가와 비전공자도 몇 분 만에 실제 작동하는 웹사이트와 앱을 만들 수 있음
- 8일 집중 과정으로 진행되며 평생 수강 가능
- 1:1 멘토링과 실전 프로젝트 지원 제공

# 주요 특징
- 코드 한 줄 몰라도 가능 (비전공자 환영)
- 빠른 시장 검증과 테스트 가능
- 모든 수강생이 성공적으로 결과물 제작
- AI 도구 사용법 중심 교육
- 실전 프로젝트 중심 커리큘럼

# 수강 문의
- 비밀특강: https://bsd-3.kit.com/littly
- 1:1 상담: https://open.kakao.com/o/sW7ZC0sh
- 얼리버드 특별 할인 진행 중

# 응답 가이드
1. 친근하고 전문적인 톤 유지
2. BSD와 바이브코딩 관련 질문에만 답변
3. 관련 없는 질문은 정중히 안내
4. 구체적인 가격은 1:1 상담 안내
5. 비밀특강이나 상담 링크를 자연스럽게 제안
6. 간결하고 읽기 쉽게 답변 (2-4문장)
7. 이모지 적절히 사용`;

/**
 * CORS Preflight 요청 처리 (OPTIONS 메서드)
 * 매우 중요! 이 함수가 없으면 브라우저에서 CORS 에러 발생
 */
function doOptions(e) {
  // Google Apps Script는 자동으로 CORS 처리
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * POST 요청 처리
 */
function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createErrorResponse('올바른 POST 요청이 필요합니다.');
    }

    const data = JSON.parse(e.postData.contents);

    let response;
    switch (data.action) {
      case 'chat':
        if (!data.message || !data.sessionId) {
          return createErrorResponse('message와 sessionId가 필요합니다.');
        }
        response = handleChatRequest(data.message, data.sessionId);
        break;

      case 'settings':
        response = getChatbotSettings();
        break;

      case 'stats':
        response = getStats();
        break;

      default:
        return createErrorResponse('유효하지 않은 액션입니다.');
    }

    return createSuccessResponse(response);

  } catch (error) {
    console.error('doPost 오류:', error);
    return createErrorResponse('서버 오류: ' + error.message);
  }
}

/**
 * GET 요청 처리
 */
function doGet(e) {
  const action = e.parameter?.action;
  let response = {};

  try {
    switch (action) {
      case 'chat':
        const message = e.parameter.message;
        const sessionId = e.parameter.sessionId;

        if (!message || !sessionId) {
          response = { error: 'message와 sessionId가 필요합니다.' };
        } else {
          response = handleChatRequest(message, sessionId);
        }
        break;

      case 'settings':
        response = getChatbotSettings();
        break;

      case 'stats':
        response = getStats();
        break;

      case 'health':
        response = { status: 'OK', timestamp: new Date().toISOString() };
        break;

      default:
        response = {
          error: '유효하지 않은 요청입니다.',
          availableActions: ['chat', 'settings', 'stats', 'health']
        };
    }
  } catch (error) {
    console.error('doGet 오류:', error);
    response = { error: '서버 오류: ' + error.message };
  }

  return createSuccessResponse(response);
}

/**
 * 챗봇 대화 처리
 */
function handleChatRequest(message, sessionId) {
  try {
    // 입력 검증
    if (!message || !sessionId) {
      return { error: '메시지와 세션ID가 필요합니다.' };
    }

    if (message.length > 500) {
      return { error: '메시지가 너무 깁니다. (최대 500자)' };
    }

    console.log(`챗봇 요청 - 세션: ${sessionId}, 메시지: ${message}`);

    // 사용자 정보 저장
    saveUserInfo(sessionId);

    // 이전 대화 기록 가져오기
    const chatHistory = getChatHistory(sessionId, 3);

    // AI 응답 생성
    const startTime = new Date().getTime();
    const aiResponse = generateAIResponse(message, chatHistory);
    const responseTime = new Date().getTime() - startTime;

    // 대화 로그 저장
    saveChatLog(sessionId, message, aiResponse, responseTime);

    return {
      response: aiResponse,
      timestamp: new Date().toISOString(),
      responseTime: responseTime
    };

  } catch (error) {
    console.error('챗봇 처리 오류:', error);
    return { error: '처리 중 오류가 발생했습니다: ' + error.message };
  }
}

/**
 * Gemini AI 응답 생성 (BSD 바이브코딩 전문)
 */
function generateAIResponse(userMessage, chatHistory) {
  try {
    console.log('=== Gemini 2.0 Flash API 호출 ===');

    // 컨텍스트 구성
    let context = BSD_CONTEXT + "\n\n";

    // 이전 대화 기록 추가
    if (chatHistory.length > 0) {
      context += "최근 대화 내용:\n";
      chatHistory.forEach(chat => {
        context += `사용자: ${chat.userMessage}\n상담봇: ${chat.aiResponse}\n\n`;
      });
    }

    context += `현재 사용자 메시지: ${userMessage}\n\n`;
    context += "위 BSD 바이브코딩 정보를 바탕으로 친근하고 도움이 되는 답변을 해주세요. BSD/바이브코딩과 관련 없는 질문은 정중히 전문 분야 안내를 해주세요.";

    // API 호출
    const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;

    const payload = {
      contents: [{
        parts: [{
          text: context
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 1024,
        topP: 0.95
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(apiUrl, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();

    console.log('응답 코드:', responseCode);

    if (responseCode !== 200) {
      console.error('API 호출 실패:', responseText);
      return getFallbackResponse(userMessage);
    }

    const responseData = JSON.parse(responseText);

    // 응답 검증
    if (!responseData.candidates || responseData.candidates.length === 0) {
      console.error('응답에 candidates가 없습니다');
      return getFallbackResponse(userMessage);
    }

    const candidate = responseData.candidates[0];

    // 안전 필터 확인
    if (candidate.finishReason === 'SAFETY') {
      console.error('안전 필터 차단');
      return "죄송합니다. 다른 방식으로 질문해 주시겠어요? 😊";
    }

    // 응답 추출
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      console.error('Content 구조 문제');
      return getFallbackResponse(userMessage);
    }

    const generatedText = candidate.content.parts[0].text;

    if (!generatedText || generatedText.trim() === '') {
      return getFallbackResponse(userMessage);
    }

    return generatedText.trim();

  } catch (error) {
    console.error('Gemini API 오류:', error);
    return getFallbackResponse(userMessage);
  }
}

/**
 * 폴백 응답 (BSD 바이브코딩 맞춤)
 */
function getFallbackResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('안녕') || lowerMessage.includes('hello')) {
    return "안녕하세요! 👋 BSD 바이브코딩 전문 교육센터입니다.\n무엇을 도와드릴까요?";
  }

  if (lowerMessage.includes('가격') || lowerMessage.includes('수강료') || lowerMessage.includes('비용')) {
    return "수강료는 1:1 상담을 통해 맞춤 안내해드립니다! 📞\n\n현재 얼리버드 특별 할인 진행 중이에요.\n\n[1:1 상담문의](https://open.kakao.com/o/sW7ZC0sh)";
  }

  if (lowerMessage.includes('특강') || lowerMessage.includes('신청')) {
    return "비밀특강 신청하시겠어요? 🎓\n\n바이브코딩의 모든 비밀을 공개하는 특별 강의입니다!\n\n[비밀특강 신청하기](https://bsd-3.kit.com/littly)";
  }

  if (lowerMessage.includes('비전공') || lowerMessage.includes('코드')) {
    return "물론입니다! 코드 한 줄 몰라도 괜찮습니다. 💪\n\n실제로 모든 수강생 분들이 성공적으로 결과물을 만들어내셨습니다.\nAI 도구 사용법만 익히면 누구나 가능해요!";
  }

  return "죄송합니다. 일시적인 오류가 발생했습니다. 😅\n\n더 자세한 상담은 1:1 상담을 통해 안내드릴게요!\n\n[1:1 상담문의](https://open.kakao.com/o/sW7ZC0sh)";
}

/**
 * 대화 로그 저장
 */
function saveChatLog(sessionId, userMessage, aiResponse, responseTime) {
  try {
    const sheet = getSheet();

    sheet.appendRow([
      new Date(),
      sessionId,
      'anonymous',
      userMessage,
      aiResponse,
      userMessage.length,
      responseTime
    ]);

    console.log('대화 로그 저장 완료');
  } catch (error) {
    console.error('대화 로그 저장 오류:', error);
  }
}

/**
 * 사용자 정보 저장
 */
function saveUserInfo(sessionId) {
  try {
    const sheet = getOrCreateSheet('UserInfo', [
      'SessionID', 'FirstAccess', 'LastAccess', 'MessageCount'
    ]);

    const data = sheet.getDataRange().getValues();
    const rows = data.slice(1);

    const existingRowIndex = rows.findIndex(row => row[0] === sessionId);

    if (existingRowIndex !== -1) {
      const rowNumber = existingRowIndex + 2;
      sheet.getRange(rowNumber, 3).setValue(new Date());
      const currentCount = sheet.getRange(rowNumber, 4).getValue() || 0;
      sheet.getRange(rowNumber, 4).setValue(currentCount + 1);
    } else {
      sheet.appendRow([sessionId, new Date(), new Date(), 1]);
    }

  } catch (error) {
    console.error('사용자 정보 저장 오류:', error);
  }
}

/**
 * 이전 대화 기록 가져오기
 */
function getChatHistory(sessionId, limit = 3) {
  try {
    const sheet = getSheet();
    const data = sheet.getDataRange().getValues();

    if (data.length <= 1) return [];

    const rows = data.slice(1);

    const sessionMessages = rows
      .filter(row => row[1] === sessionId)
      .slice(-limit)
      .map(row => ({
        timestamp: row[0],
        userMessage: row[3],
        aiResponse: row[4]
      }));

    return sessionMessages;
  } catch (error) {
    console.error('대화 기록 조회 오류:', error);
    return [];
  }
}

/**
 * 챗봇 설정 가져오기
 */
function getChatbotSettings() {
  return {
    chatbot_name: 'BSD AI 상담봇',
    welcome_message: '안녕하세요! 👋 BSD 바이브코딩 전문 교육센터입니다.\n무엇을 도와드릴까요?',
    max_message_length: '500',
    response_delay: '1000'
  };
}

/**
 * 통계 정보 가져오기
 */
function getStats() {
  try {
    const chatSheet = getSheet();
    const data = chatSheet.getDataRange().getValues().slice(1);

    const stats = {
      totalMessages: data.length,
      todayMessages: 0,
      averageMessageLength: 0
    };

    if (stats.totalMessages > 0) {
      const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
      stats.todayMessages = data.filter(row => {
        const date = Utilities.formatDate(row[0], Session.getScriptTimeZone(), 'yyyy-MM-dd');
        return date === today;
      }).length;

      const totalLength = data.reduce((sum, row) => sum + (row[5] || 0), 0);
      stats.averageMessageLength = Math.round(totalLength / stats.totalMessages);
    }

    return stats;
  } catch (error) {
    console.error('통계 조회 오류:', error);
    return { totalMessages: 0, todayMessages: 0, averageMessageLength: 0 };
  }
}

/**
 * 시트 가져오기
 */
function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getActiveSheet();

  // 헤더가 없으면 추가
  const headers = sheet.getRange(1, 1, 1, 7).getValues()[0];
  if (!headers[0] || headers[0] !== 'Timestamp') {
    sheet.getRange(1, 1, 1, 7).setValues([[
      'Timestamp', 'SessionID', 'UserID', 'UserMessage', 'AIResponse', 'MessageLength', 'ResponseTime'
    ]]);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold');
  }

  return sheet;
}

/**
 * 시트 가져오기 또는 생성
 */
function getOrCreateSheet(sheetName, headers) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    if (headers && headers.length > 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
  }

  return sheet;
}

/**
 * 성공 응답 생성
 * Google Apps Script는 "모든 사용자" 배포 시 자동으로 CORS 처리
 */
function createSuccessResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 오류 응답 생성
 * Google Apps Script는 "모든 사용자" 배포 시 자동으로 CORS 처리
 */
function createErrorResponse(errorMessage) {
  return ContentService
    .createTextOutput(JSON.stringify({
      error: errorMessage,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * 테스트 함수
 */
function testChat() {
  const result = handleChatRequest('안녕하세요! 바이브코딩이 뭔가요?', 'test_' + Date.now());
  console.log(result);
  return result;
}

/**
 * 초기 시트 설정 (한 번만 실행)
 */
function setupInitialSheets() {
  getSheet(); // ChatLogs 시트 생성
  getOrCreateSheet('UserInfo', ['SessionID', 'FirstAccess', 'LastAccess', 'MessageCount']);
  console.log('시트 초기 설정 완료');
}
