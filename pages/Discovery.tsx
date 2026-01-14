
import React, { useState, useEffect } from 'react';
import { MOCK_PETS } from '../constants';
import { Pet, Page } from '../types';
import { GoogleGenAI } from '@google/genai';

interface DiscoveryProps {
  onSelectPet: (pet: Pet) => void;
  onTabChange: (page: Page) => void;
  onStartAI: () => void;
}

const Discovery: React.FC<DiscoveryProps> = ({ onSelectPet, onTabChange, onStartAI }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('全部');
  const [insights, setInsights] = useState<{ text: string, links: { title: string, uri: string }[] } | null>(null);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      setIsLoadingInsights(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "提供关于2024-2025年上海地区最新的宠物领养活动或流浪动物公益新闻。请给出一个简短的摘要。",
          config: {
            tools: [{ googleSearch: {} }],
          },
        });
        
        const text = response.text || "";
        const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        const links = chunks
          .filter(chunk => chunk.web)
          .map(chunk => ({
            title: chunk.web.title,
            uri: chunk.web.uri
          }));

        setInsights({ text, links });
      } catch (error) {
        console.error("Discovery error:", error);
      } finally {
        setIsLoadingInsights(false);
      }
    };

    fetchInsights();
  }, []);

  const filteredPets = MOCK_PETS.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === '全部' || 
                            (activeCategory === '狗狗' && pet.breed.includes('犬')) ||
                            (activeCategory === '猫咪' && pet.breed.includes('猫'));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col h-full bg-background-light pb-24">
      {/* Search Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-3 border border-transparent focus-within:border-primary transition-all">
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="寻找特定的品种或名字..." 
            className="bg-transparent border-none focus:ring-0 text-sm flex-1 p-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="text-primary-dark">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-5 pt-6 flex flex-col gap-8">
        {/* Quick Filters */}
        <section>
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {['全部', '狗狗', '猫咪', '兔子', '鸟类'].map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                  activeCategory === cat 
                    ? 'bg-primary text-text-main shadow-lg shadow-primary/30 scale-105' 
                    : 'bg-white text-gray-500 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Dynamic Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-main">发现新面孔</h2>
            <span className="text-xs font-bold text-gray-400">{filteredPets.length} 个结果</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {filteredPets.map(pet => (
              <div 
                key={pet.id} 
                onClick={() => onSelectPet(pet)}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm group cursor-pointer hover:-translate-y-1 transition-transform"
              >
                <div className="h-44 w-full relative">
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: `url('${pet.image}')` }}
                  ></div>
                  <div className="absolute top-3 left-3 px-2 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-[10px] font-bold text-text-main">
                    {pet.distance}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-text-main truncate">{pet.name}</h3>
                  <p className="text-[10px] text-text-secondary mt-1">{pet.breed}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-bold text-primary-dark">${pet.price}</span>
                    <button className="size-6 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] filled">favorite</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Insights (AI Enhanced) */}
        <section className="mb-8">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <span className="material-symbols-outlined absolute -top-4 -right-4 text-white/10 text-[100px]">explore</span>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-yellow-300">auto_awesome</span>
              <h3 className="font-bold text-lg">领养快讯</h3>
            </div>
            
            {isLoadingInsights ? (
              <div className="flex items-center gap-3 py-4">
                <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-sm font-medium text-white/80">正在搜索本地活动...</p>
              </div>
            ) : insights ? (
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-white/90 italic">{insights.text}</p>
                {insights.links.length > 0 && (
                  <div className="pt-2 border-t border-white/20">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/60 mb-2">来源参考</p>
                    <div className="flex flex-col gap-2">
                      {insights.links.slice(0, 2).map((link, i) => (
                        <a 
                          key={i} 
                          href={link.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between bg-white/10 hover:bg-white/20 px-3 py-2 rounded-xl transition-colors"
                        >
                          <span className="text-xs font-bold truncate pr-4">{link.title}</span>
                          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-white/70">暂时无法获取最新资讯，请稍后再试。</p>
            )}
          </div>
        </section>
      </main>

      {/* Nav */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 pb-safe pt-2 px-6 z-40">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => onTabChange('home')}
            className="flex flex-col items-center gap-1 w-12 text-gray-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[26px]">home</span>
            <span className="text-[10px] font-medium">首页</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-12 text-primary">
            <span className="material-symbols-outlined filled text-[26px]">search</span>
            <span className="text-[10px] font-bold">发现</span>
          </button>
          <button 
            onClick={onStartAI}
            className="relative -top-5 bg-primary text-text-main p-3 rounded-full shadow-lg border-4 border-white transition-transform hover:scale-110"
          >
            <span className="material-symbols-outlined text-[28px] block">auto_awesome</span>
          </button>
          <button onClick={() => onTabChange('messages')} className="flex flex-col items-center gap-1 w-12 text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[26px]">chat_bubble</span>
            <span className="text-[10px] font-medium">消息</span>
          </button>
          <button 
            onClick={() => onTabChange('profile')}
            className="flex flex-col items-center gap-1 w-12 text-gray-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[26px]">person</span>
            <span className="text-[10px] font-medium">我的</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Discovery;
