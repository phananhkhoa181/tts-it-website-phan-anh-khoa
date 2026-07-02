"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, User, ArrowUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Xin chào! Tôi là chuyên gia tư vấn Apple Watch Series 5. Tôi có thể giúp gì cho bạn?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Handle Scroll to Top visibility
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [...prev, { role: "ai", text: data.error || "Có lỗi xảy ra." }]);
      } else {
        setMessages((prev) => [...prev, { role: "ai", text: data.message }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", text: "Mất kết nối tới máy chủ." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`w-14 h-14 flex items-center justify-center rounded-full bg-slate-800 text-white shadow-lg transition-all duration-300 hover:bg-slate-700 active:scale-95 ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Cuộn lên đầu trang"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`bg-white dark:bg-slate-900 w-80 sm:w-96 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100 mb-2" : "scale-0 opacity-0 h-0 w-0 mb-0 pointer-events-none"
        }`}
        style={{ maxHeight: isOpen ? "500px" : "0px", height: "70vh" }}
      >
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/chatbotAI.png" alt="AI Avatar" className="w-6 h-6 rounded-full object-cover bg-white" />
            <span className="font-semibold">Apple Watch AI</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 p-1 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div 
          className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4 bg-slate-50 dark:bg-slate-950"
          data-lenis-prevent="true"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "ai" && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 bg-white shadow-sm">
                  <img src="/chatbotAI.png" alt="AI" className="w-full h-full object-cover" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-indigo-600 text-white rounded-tr-sm"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-sm shadow-sm"
                }`}
              >
                {msg.role === "ai" ? (
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                      ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2" {...props} />,
                      li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                      strong: ({ node, ...props }) => <strong className="font-semibold text-indigo-700 dark:text-indigo-400" {...props} />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 justify-start">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 bg-white shadow-sm">
                <img src="/chatbotAI.png" alt="AI" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center shadow-sm">
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex gap-2 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full px-4 py-2 text-sm outline-none border border-transparent focus:border-indigo-500 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-xl transition-transform duration-300 hover:scale-110 active:scale-95 flex items-center justify-center overflow-hidden border-2 ${
          isOpen ? "bg-slate-800 border-slate-700 rotate-90" : "bg-white border-indigo-100 dark:border-slate-700"
        }`}
        aria-label="Mở chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <img src="/chatbotAI.png" alt="Chat" className="w-full h-full object-cover" />
        )}
      </button>
    </div>
  );
}
