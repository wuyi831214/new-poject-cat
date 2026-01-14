
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Pet } from '../types';
import { MOCK_PETS } from '../constants';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  onBack: () => void;
  onSelectPet: (pet: Pet) => void;
}

const AIChat: React.FC<AIChatProps> = ({ onBack, onSelectPet }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '您好！我是您的 AI 领养助手。告诉我您的居住环境、生活节奏以及对理想伙伴的期待，我会为您推荐最合适的毛孩子！' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const petContext = MOCK_PETS.map(p => `- ${p.name}: ${p.breed}, ${p.age}, 性格: ${p.description}`).join('\n');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: `你是一个专业的宠物领养助手。现有以下宠物待领养：\n${petContext}\n\n用户说："${userMsg}"\n\n请以亲切、专业的口吻回复。如果用户提到生活习惯，请从现有宠物中推荐最合适的一只，并解释原因。如果没有合适的推荐，请给予温馨的建议。回复请尽量简短。` }]
          }
        ]
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.text || "抱歉，我刚才走神了，能再说一遍吗？" }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "连接服务器失败，请检查您的网络。" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-light">
      {/* Header */}
      <header className="px-4 py-3 bg-white border-b border-gray-100 flex items-center gap-3 shadow-sm z-10">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-50">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-text-main">AI 智能匹配</h1>
          <div className="flex items-center gap-1">
            <span className="size-2 rounded-full bg-green-500"></span>
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tight">在线咨询中</span>
          </div>
        </div>
        <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary">auto_awesome</span>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-5 flex flex-col gap-6 hide-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}>
            {msg.role === 'assistant' && (
              <div className="size-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-white text-lg">pets</span>
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm font-medium shadow-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-primary text-text-main rounded-br-none' 
                : 'bg-white text-text-main rounded-bl-none border border-gray-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start items-center gap-2">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-lg">pets</span>
            </div>
            <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl flex gap-1 shadow-sm">
              <div className="size-1.5 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="size-1.5 bg-gray-300 rounded-full animate-bounce delay-100"></div>
              <div className="size-1.5 bg-gray-300 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </main>

      {/* Suggested Quick Replies */}
      {!isTyping && messages.length < 3 && (
        <div className="px-5 pb-4 flex gap-2 overflow-x-auto hide-scrollbar">
          {['我想要一只活泼的狗', '有没有适合公寓养的猫？', '我平时工作很忙'].map((text, i) => (
            <button 
              key={i}
              onClick={() => {
                setInputValue(text);
                // Trigger logic would go here, simplified for demo
              }}
              className="px-3 py-1.5 bg-white border border-primary/20 rounded-full text-xs font-bold text-primary-dark whitespace-nowrap shadow-sm hover:bg-primary/5"
            >
              {text}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <footer className="p-4 bg-white border-t border-gray-100 shadow-lg">
        <div className="flex items-center gap-3 bg-background-light rounded-2xl px-4 py-2 border border-gray-200 focus-within:border-primary transition-colors">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="描述您的理想宠物..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className={`size-10 rounded-xl flex items-center justify-center transition-all ${
              inputValue.trim() && !isTyping ? 'bg-primary text-text-main' : 'bg-gray-200 text-gray-400'
            }`}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AIChat;
