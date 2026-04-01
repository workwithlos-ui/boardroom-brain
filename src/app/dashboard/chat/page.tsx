"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Brain,
  User,
  Sparkles,
  Loader2,
  Phone,
  Target,
  BookOpen,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickPrompts = [
  {
    icon: Phone,
    label: "Analyze Last Call",
    prompt: "Analyze the most recent sales call and give me a detailed breakdown of what went well and what needs improvement.",
  },
  {
    icon: Target,
    label: "Objection Handling",
    prompt: "A prospect just told me 'Your solution is too expensive.' How should I handle this objection effectively?",
  },
  {
    icon: BookOpen,
    label: "Discovery Framework",
    prompt: "Walk me through the Kent Clothier Discovery Framework step by step with examples for each stage.",
  },
  {
    icon: Sparkles,
    label: "Cold Call Script",
    prompt: "Give me a cold call opening script for reaching out to a VP of Sales at a mid-market SaaS company.",
  },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: messageText.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages([...newMessages, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;
            try {
              const parsed = JSON.parse(data);
              assistantContent += parsed.content;
              setMessages([
                ...newMessages,
                { role: "assistant", content: assistantContent },
              ]);
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "I apologize, but I encountered an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const copyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Brain className="w-6 h-6 text-gold" />
            </div>
            AI Sales Coach
          </h1>
          <p className="text-gray-400 mt-1 ml-[52px]">
            Powered by Kent Clothier&apos;s proven sales methodology
          </p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={resetChat}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white border border-white/10 rounded-lg hover:bg-white/5 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            New Chat
          </button>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-white/5 bg-navy-300/30">
        {messages.length === 0 ? (
          /* Empty State */
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center mb-6">
              <Brain className="w-10 h-10 text-gold" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              How can I help you close more deals?
            </h2>
            <p className="text-gray-400 text-center max-w-md mb-8">
              Ask me about sales calls, coaching strategies, objection handling,
              or anything related to sales excellence.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSubmit(prompt.prompt)}
                  className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-navy-50/50 hover:border-gold/20 hover:bg-navy-600/50 transition-all text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <prompt.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-sm text-gray-300">{prompt.label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="p-6 space-y-6">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex gap-4 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-300 flex items-center justify-center flex-shrink-0 mt-1">
                    <Brain className="w-4 h-4 text-navy" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] ${
                    message.role === "user"
                      ? "bg-gold/10 border border-gold/20 rounded-2xl rounded-tr-md"
                      : "bg-navy-50/80 border border-white/5 rounded-2xl rounded-tl-md"
                  } p-4 relative group`}
                >
                  <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {message.content}
                    {isLoading &&
                      i === messages.length - 1 &&
                      message.role === "assistant" && (
                        <span className="inline-block w-2 h-4 bg-gold ml-1 animate-pulse" />
                      )}
                  </div>
                  {message.role === "assistant" && message.content && (
                    <button
                      onClick={() => copyMessage(message.content, i)}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-white/10"
                    >
                      {copiedIndex === i ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-gray-500" />
                      )}
                    </button>
                  )}
                </div>
                {message.role === "user" && (
                  <div className="w-8 h-8 rounded-lg bg-navy-600 border border-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="mt-4">
        <div className="relative flex items-end gap-3 p-3 rounded-2xl border border-white/10 bg-navy-50/50 focus-within:border-gold/30 transition-colors">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about sales calls, coaching, objections, or strategies..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm resize-none outline-none min-h-[44px] max-h-[120px] py-2 px-2"
            rows={1}
          />
          <button
            onClick={() => handleSubmit()}
            disabled={!input.trim() || isLoading}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-gold to-gold-400 text-navy disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-gold/20 transition-all flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-600 text-center mt-2">
          Boardroom Brain AI is trained on Kent Clothier&apos;s sales methodology.
          Responses are AI-generated coaching suggestions.
        </p>
      </div>
    </div>
  );
}
