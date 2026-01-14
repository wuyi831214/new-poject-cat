
import React, { useState } from 'react';
import { Pet } from '../types';
import { GoogleGenAI } from '@google/genai';

interface PetDetailsProps {
  pet: Pet;
  onBack: () => void;
  onAdopt: () => void;
}

const PetDetails: React.FC<PetDetailsProps> = ({ pet, onBack, onAdopt }) => {
  const [aiStory, setAiStory] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateStory = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `写一个关于名字叫 ${pet.name} 的 ${pet.breed} 的简短感人故事。它今年 ${pet.age}，性格描述：${pet.description}。故事应该温馨并鼓励人们领养它。字数在150字以内。`,
      });
      setAiStory(response.text || "暂时无法生成故事，请稍后再试。");
    } catch (error) {
      console.error(error);
      setAiStory("哎呀，AI 正在休息，请稍后点击试试。");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-32 bg-background-light">
      {/* Header Buttons */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-gradient-to-b from-black/20 to-transparent">
        <button 
          onClick={onBack}
          className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="flex gap-3">
          <button className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white">
            <span className="material-symbols-outlined">share</span>
          </button>
          <button className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white">
            <span className="material-symbols-outlined">favorite_border</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[45vh] rounded-b-[2rem] overflow-hidden shadow-sm">
        <div 
          className="w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: `url('${pet.image}')` }}
        ></div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-6 h-1.5 rounded-full bg-primary shadow-sm"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm"></div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-5 pt-6 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-start">
            <h1 className="text-text-main text-[32px] font-bold leading-tight">{pet.name}</h1>
            <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {pet.status}
            </div>
          </div>
          <p className="text-text-secondary text-base font-medium flex items-center gap-1">
            {pet.breed} <span className="text-xs opacity-50">•</span> 距离 {pet.distance}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl p-4 bg-orange-50 border border-white/50 shadow-sm">
            <span className="material-symbols-outlined text-orange-400 text-[24px]">cake</span>
            <p className="text-text-main text-lg font-bold leading-tight">{pet.age}</p>
            <p className="text-text-secondary text-xs font-medium">年龄</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl p-4 bg-accent-lavender border border-white/50 shadow-sm">
            <span className="material-symbols-outlined text-indigo-400 text-[24px]">{pet.gender === '母' ? 'female' : 'male'}</span>
            <p className="text-text-main text-lg font-bold leading-tight">{pet.gender}</p>
            <p className="text-text-secondary text-xs font-medium">性别</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-2xl p-4 bg-accent-mint border border-white/50 shadow-sm">
            <span className="material-symbols-outlined text-emerald-600 text-[24px]">monitor_weight</span>
            <p className="text-text-main text-lg font-bold leading-tight">{pet.weight}</p>
            <p className="text-text-secondary text-xs font-medium">体重</p>
          </div>
        </div>

        {/* AI Story Section */}
        <div className="bg-white rounded-2xl p-4 border border-primary/20 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">auto_awesome</span>
              <h3 className="font-bold text-text-main text-sm">AI 宠物传记</h3>
            </div>
            {!aiStory && !isGenerating && (
              <button 
                onClick={generateStory}
                className="text-xs font-bold text-primary-dark hover:text-primary transition-colors"
              >
                生成故事
              </button>
            )}
          </div>
          {isGenerating ? (
            <div className="flex flex-col items-center py-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs text-text-secondary mt-2 font-medium">正在撰写温馨故事...</p>
            </div>
          ) : aiStory ? (
            <div className="animate-fade-in">
              <p className="text-sm text-text-main italic leading-relaxed text-justify">"{aiStory}"</p>
              <button 
                onClick={generateStory}
                className="mt-3 text-[10px] font-bold text-gray-400 hover:text-primary flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">refresh</span> 换一个故事
              </button>
            </div>
          ) : (
            <p className="text-xs text-text-secondary">点击“生成故事”了解 {pet.name} 的独特魅力</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              <span className="material-symbols-outlined">pets</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-main">关于 {pet.name}</h2>
              <p className="text-xs text-gray-500">2 天前发布</p>
            </div>
          </div>
          <p className="text-text-main/80 text-base leading-relaxed text-justify">
            {pet.description}
          </p>
        </div>

        {/* Location Card */}
        <div className="mt-2 mb-6">
          <h2 className="text-lg font-bold text-text-main mb-3">所在位置</h2>
          <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                  <span className="material-symbols-outlined">home_work</span>
                </div>
                <div>
                  <p className="font-bold text-text-main">快乐爪爪救助站</p>
                  <p className="text-xs text-gray-500">{pet.location}</p>
                </div>
              </div>
              <button className="size-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                <span className="material-symbols-outlined text-lg">near_me</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-gray-100 z-40">
        <div className="flex items-center gap-4 max-w-md mx-auto">
          <div className="flex flex-col">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">领养费用</p>
            <p className="text-xl font-bold text-text-main">${pet.price}</p>
          </div>
          <button 
            onClick={onAdopt}
            className="flex-1 bg-primary text-text-main hover:bg-opacity-90 active:scale-[0.98] transition-all h-14 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined fill-current">pets</span>
            领养 {pet.name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
