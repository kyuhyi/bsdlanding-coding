"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Google Apps Script 웹앱 URL
const CHATBOT_API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "";

const FAQ_QUESTIONS = [
  "바이브코딩이 무엇인가요?",
  "수강료는 얼마인가요?",
  "비전공자도 가능한가요?",
  "수강 기간은 어떻게 되나요?",
];

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "안녕하세요! 👋 BSD 바이브코딩 전문 교육센터입니다.\n무엇을 도와드릴까요?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");

  // 세션 ID 생성
  useEffect(() => {
    const storedSessionId = localStorage.getItem("bsd_chatbot_session");
    if (storedSessionId) {
      setSessionId(storedSessionId);
    } else {
      const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("bsd_chatbot_session", newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !sessionId) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simulate bot typing
    setIsTyping(true);

    try {
      // Call Google Apps Script API with GET (CORS bypass)
      const params = new URLSearchParams({
        action: "chat",
        message: text.trim(),
        sessionId: sessionId,
      });

      const response = await fetch(`${CHATBOT_API_URL}?${params.toString()}`, {
        method: "GET",
      });

      const data = await response.json();

      let botResponse = "";
      if (data.error) {
        console.error("API Error:", data.error);
        botResponse = "죄송합니다. 일시적인 오류가 발생했습니다. 😅\n\n더 자세한 상담은 1:1 상담을 통해 안내드릴게요!\n\n[1:1 상담문의](https://open.kakao.com/o/sW7ZC0sh)";
      } else {
        botResponse = data.response || "응답을 받을 수 없습니다.";
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot API Error:", error);

      // Fallback to local FAQ if API fails
      const botMessage: Message = {
        id: messages.length + 2,
        text: getFallbackResponse(text.trim()),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getFallbackResponse = (text: string): string => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("바이브코딩") && lowerText.includes("무엇")) {
      return "바이브코딩은 AI를 활용해 코드 없이도 빠르게 MVP(최소 기능 제품)를 제작하는 혁신적인 개발 방법입니다. 1인 사업가와 비전공자도 몇 분 만에 실제 작동하는 웹사이트와 앱을 만들 수 있습니다!";
    }

    if (lowerText.includes("가격") || lowerText.includes("수강료") || lowerText.includes("비용")) {
      return "수강료는 1:1 상담을 통해 맞춤 안내해드립니다! 📞\n\n현재 얼리버드 특별 할인 진행 중이에요.\n\n[1:1 상담문의](https://open.kakao.com/o/sW7ZC0sh)";
    }

    if (lowerText.includes("비전공") || lowerText.includes("코드")) {
      return "물론입니다! 코드 한 줄 몰라도 괜찮습니다. 💪\n\n실제로 모든 수강생 분들이 성공적으로 결과물을 만들어내셨습니다.\nAI 도구 사용법만 익히면 누구나 가능해요!";
    }

    if (lowerText.includes("기간") || lowerText.includes("수강")) {
      return "기본 과정은 8일 집중 과정이며, 평생 수강 가능합니다. 추가로 1:1 멘토링과 실전 프로젝트 지원도 제공됩니다. 자세한 커리큘럼은 비밀특강에서 확인하실 수 있습니다!";
    }

    if (lowerText.includes("특강") || lowerText.includes("신청")) {
      return "비밀특강 신청하시겠어요? 🎓\n\n바이브코딩의 모든 비밀을 공개하는 특별 강의입니다!\n\n[비밀특강 신청하기](https://bsd-3.kit.com/littly)";
    }

    if (lowerText.includes("상담") || lowerText.includes("문의")) {
      return "1:1 상담을 원하시는군요! 📞\n\n카카오톡 오픈채팅으로 연결해드릴게요.\n아래 버튼을 클릭해주세요!\n\n[1:1 상담문의 바로가기](https://open.kakao.com/o/sW7ZC0sh)";
    }

    if (lowerText.includes("안녕") || lowerText.includes("hi") || lowerText.includes("hello")) {
      return "반갑습니다! 😊\n\n아래 자주 묻는 질문을 클릭하시거나,\n궁금하신 점을 자유롭게 물어보세요!";
    }

    return `"${text}"에 대해 궁금하시군요!\n\n더 자세한 답변은 1:1 상담을 통해 안내드릴 수 있습니다.\n\n아래 자주 묻는 질문도 확인해보세요! 👇`;
  };

  const handleFAQClick = (question: string) => {
    handleSendMessage(question);
  };

  const renderMessageText = (text: string) => {
    // Convert markdown links to clickable links
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [, linkText, url] = match;
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary/80 transition-colors"
          >
            {linkText}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          filter: [
            "drop-shadow(0 0 8px rgba(255, 234, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 234, 0, 0.4))",
            "drop-shadow(0 0 16px rgba(255, 234, 0, 0.8)) drop-shadow(0 0 24px rgba(255, 234, 0, 0.6))",
            "drop-shadow(0 0 8px rgba(255, 234, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 234, 0, 0.4))",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {isOpen ? (
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center">
            <svg className="w-8 h-8 md:w-10 md:h-10 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        ) : (
          <Image
            src="/bsd-symbol-color.png"
            alt="Chat"
            width={112}
            height={112}
            className="object-contain"
          />
        )}
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] md:w-96 h-[600px] max-h-[80vh] bg-ink/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-primary/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 px-4 py-4 flex items-center gap-3 border-b border-primary/20">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src="/bsd-symbol-color.png"
                  alt="BSD"
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm md:text-base truncate">BSD AI 상담봇</h3>
                <p className="text-xs text-primary">바이브코딩 전문가</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors flex-shrink-0"
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              onWheel={(e) => e.stopPropagation()}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-primary text-ink"
                        : "bg-white/10 text-white"
                    }`}
                  >
                    <p className="text-sm md:text-base whitespace-pre-line leading-relaxed">
                      {renderMessageText(message.text)}
                    </p>
                    <p className="text-xs mt-1 opacity-60">
                      {message.timestamp.toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ Quick Buttons */}
            <div className="px-4 py-3 border-t border-white/10">
              <p className="text-xs text-white/60 mb-2">자주 묻는 질문:</p>
              <div className="grid grid-cols-2 gap-2">
                {FAQ_QUESTIONS.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleFAQClick(question)}
                    className="text-xs px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-colors border border-white/10 hover:border-primary/30 text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm md:text-base text-white placeholder-white/40 focus:outline-none focus:border-primary/50 focus:bg-white/15 transition-colors"
                />
                <button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim()}
                  className="w-12 h-12 bg-primary hover:bg-primary/90 disabled:bg-primary/30 rounded-xl flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <svg className="w-5 h-5 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
