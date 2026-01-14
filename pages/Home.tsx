import React from 'react';
import { usePets } from '../hooks/usePets';
import { Pet, Page } from '../types-extended';

interface HomeProps {
  onSelectPet: (pet: Pet) => void;
  onTabChange: (page: Page) => void;
  onStartAI: () => void;
}

const Home: React.FC<HomeProps> = ({ onSelectPet, onTabChange, onStartAI }) => {
  const { pets: recommendedPets, loading: loadingRecommended } = usePets({ status: '待领养' });
  
  return (
    <div className="flex flex-col h-full bg-background-light pb-24">
      {/* Header */}
      <header className="px-5 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div 
              className="size-10 rounded-full bg-surface-light shadow-sm border border-primary/20 bg-center bg-cover" 
              style={{ backgroundImage: "url('https://picsum.photos/seed/user/100/100')" }}
            ></div>
            <div className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-white"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-text-secondary">当前位置</span>
            <div className="flex items-center gap-1 text-text-main font-bold text-sm">
              <span>上海市, 静安区</span>
              <span className="material-symbols-outlined text-[18px] text-primary-dark">expand_more</span>
            </div>
          </div>
        </div>
        <button className="flex items-center justify-center size-10 rounded-full bg-white shadow-sm border border-gray-100 hover:bg-gray-50">
          <span className="material-symbols-outlined text-text-main">notifications</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col gap-6">
        <div className="px-5">
          <h1 className="text-xl font-extrabold leading-tight text-text-main">
            寻找 <br/> <span className="text-primary-dark text-2xl">附近的伙伴</span>
          </h1>
        </div>

        {/* AI Assistant Banner */}
        <div className="px-5">
          <div 
            onClick={onStartAI}
            className="w-full rounded-2xl bg-gradient-to-br from-primary to-orange-400 p-5 relative overflow-hidden cursor-pointer shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
          >
            <div className="relative z-10">
              <h3 className="text-white font-extrabold text-lg">AI 智能匹配</h3>
              <p className="text-white/90 text-sm mt-1 max-w-[70%]">不知道该选哪只？让 AI 帮您找到最适合您的伙伴！</p>
              <button className="mt-3 bg-white text-orange-500 text-xs font-bold px-4 py-2 rounded-full shadow-sm">立即咨询</button>
            </div>
            {/* Sparkle decorations to match screenshot */}
            <span className="material-symbols-outlined absolute right-4 top-4 text-white/20 text-4xl select-none">auto_awesome</span>
            <span className="material-symbols-outlined absolute right-12 bottom-4 text-white/20 text-6xl select-none rotate-12">auto_awesome</span>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/20 text-[100px] select-none">auto_awesome</span>
          </div>
        </div>

        {/* Categories */}
        <div className="w-full overflow-hidden">
          <div className="flex gap-4 px-5 overflow-x-auto hide-scrollbar pb-2">
            <button onClick={() => onTabChange('discovery')} className="flex flex-col items-center gap-2 min-w-[72px] group">
              <div className="size-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="material-symbols-outlined filled text-text-main text-3xl">pets</span>
              </div>
              <span className="text-xs font-bold text-text-main">全部</span>
            </button>
            <button onClick={() => onTabChange('discovery')} className="flex flex-col items-center gap-2 min-w-[72px] group">
              <div className="size-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-orange-400 text-3xl">dog_ins_tag</span>
              </div>
              <span className="text-xs font-medium text-text-secondary">狗狗</span>
            </button>
            <button onClick={() => onTabChange('discovery')} className="flex flex-col items-center gap-2 min-w-[72px] group">
              <div className="size-16 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-indigo-400 text-3xl">cat</span>
              </div>
              <span className="text-xs font-medium text-text-secondary">猫咪</span>
            </button>
          </div>
        </div>

        {/* Recommended */}
        <div className="px-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-main">为你推荐</h2>
            <button onClick={() => onTabChange('discovery')} className="text-sm font-semibold text-primary-dark">查看全部</button>
          </div>
          
          {loadingRecommended ? (
            <div className="text-center py-8 text-text-secondary">加载中...</div>
          ) : recommendedPets.length > 0 ? (
            <div className="flex overflow-x-auto gap-4 pb-4 -mx-5 px-5 hide-scrollbar">
              {recommendedPets.slice(0, 4).map(pet => (
                <div 
                  key={pet.id} 
                  onClick={() => onSelectPet(pet)}
                  className="shrink-0 w-40 cursor-pointer group"
                >
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200 mb-2">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                      style={{ backgroundImage: `url('${pet.image}')` }}
                    ></div>
                    {pet.status === '待领养' && (
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <span className="text-xs font-bold text-primary-dark">可领养</span>
                      </div>
                    )}
                  </div>
                  <p className="font-bold text-text-main text-sm truncate">{pet.name}</p>
                  <p className="text-xs text-text-secondary truncate">{pet.breed}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-secondary">暂无推荐宠物</div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 pb-safe pt-2 px-6 z-50">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => onTabChange('home')}
            className="flex flex-col items-center gap-1 w-12 text-primary"
          >
            <span className="material-symbols-outlined text-[26px]">home</span>
            <span className="text-[10px] font-bold">首页</span>
          </button>
          <button 
            onClick={() => onTabChange('discovery')}
            className="flex flex-col items-center gap-1 w-12 text-gray-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[26px]">search</span>
            <span className="text-[10px] font-medium">发现</span>
          </button>
          <button onClick={() => onTabChange('home')} className="relative -top-5 bg-primary text-text-main p-3 rounded-full shadow-lg border-4 border-white">
            <span className="material-symbols-outlined text-[28px] block">pets</span>
          </button>
          <button 
            onClick={() => onTabChange('messages')}
            className="flex flex-col items-center gap-1 w-12 text-gray-400 hover:text-primary transition-colors"
          >
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

export default Home;
