
import React, { useState, useEffect } from 'react';
import { Page, Pet, Application } from '../types-extended';
import { useApplications } from '../hooks/useApplications';
import { useFavorites } from '../hooks/useFavorites';

interface ProfileProps {
  onTabChange: (page: Page) => void;
  onSelectPet: (pet: Pet) => void;
}

const Profile: React.FC<ProfileProps> = ({ onTabChange, onSelectPet }) => {
  const [userId] = useState('user@example.com'); // 模拟用户ID,实际应从认证获取
  const { applications, loading: loadingApps } = useApplications(userId);
  const { favorites, loading: loadingFavs } = useFavorites(userId);
  return (
    <div className="flex flex-col h-full bg-background-light pb-24">
      <header className="sticky top-0 z-50 bg-background-light/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-100/50">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined text-text-main">settings</span>
        </button>
        <h1 className="text-lg font-bold text-text-main">个人中心</h1>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <span className="material-symbols-outlined text-text-main">notifications</span>
        </button>
      </header>

      <main className="flex-1 px-4 overflow-y-auto w-full">
        {/* Profile Info */}
        <div className="mt-6 flex flex-col items-center">
          <div className="relative group cursor-pointer">
            <div className="p-1 rounded-full border-2 border-primary border-dashed">
              <div 
                className="h-28 w-28 rounded-full bg-cover bg-center shadow-soft" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA8KcuTge7vgBS4q00DLmxJOs1XDdeYraLAqVyBo0iocqvh3NR0WUTQzRxr2NnmmawDi4iHTevLsXnD34QSzfAEwmDB3MC1xydUd0GtS0xAs3Kn1-bpQjfUMSjIEjaoI6ulvjnKvDa8bThDD9MvBalAu1M-mLNFtGQMJRVB-sBljYsbjTJ9_N-x4w-F40sQVuYhgF8OGwwZwQJ1rGVuU_apXEKFLo48ZrzDNdYeYB-PPt4fraUBaph0mp27ig0c4hUCB3j1yT2RpJY')" }}
              ></div>
            </div>
            <div className="absolute bottom-0 right-1 bg-white p-1.5 rounded-full shadow-md border border-gray-100">
              <span className="material-symbols-outlined text-primary text-[18px]">edit</span>
            </div>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-text-main tracking-tight">Sarah Jenkins</h2>
          <div className="flex items-center gap-1 mt-1 text-text-secondary text-sm font-medium">
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            <span>布鲁克林, 纽约</span>
          </div>
        </div>

        {/* Applications */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h3 className="text-lg font-bold text-text-main">我的申请</h3>
            <button className="text-sm font-bold text-text-secondary hover:opacity-80">查看全部</button>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-1 overflow-hidden">
            {loadingApps ? (
              <div className="p-4 text-center text-text-secondary">加载中...</div>
            ) : applications.length > 0 ? (
              applications.slice(0, 2).map(app => (
                <div 
                  key={app.id} 
                  onClick={() => onSelectPet(app.pet)}
                  className="flex items-center p-3 gap-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
                >
                  <div 
                    className="h-16 w-16 rounded-lg bg-cover bg-center shrink-0" 
                    style={{ backgroundImage: `url('${app.pet.image}')` }}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-text-main truncate">{app.pet.name}</h4>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
                        app.status === '审核中' ? 'bg-accent-lavender text-indigo-700' :
                        app.status === '已通过' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>{app.status}</span>
                    </div>
                    <p className="text-sm text-text-secondary truncate">{app.pet.breed} • {app.pet.age}</p>
                    <div className="mt-2 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${
                        app.status === '审核中' ? 'bg-indigo-400 w-1/2' :
                        app.status === '已通过' ? 'bg-green-400 w-3/4' :
                        app.status === '已完成' ? 'bg-green-500 w-full' :
                        'bg-gray-400 w-0'
                      }`} style={{ width: `${app.progress}%` }}></div>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-gray-300 group-hover:text-primary transition-colors">chevron_right</span>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-text-secondary">暂无申请记录</div>
            )}
          </div>
        </div>

        {/* Favorites */}
        <div className="mt-8">
          <h3 className="text-lg font-bold text-text-main mb-4 px-1">收藏的宠物</h3>
          {loadingFavs ? (
            <div className="text-center py-8 text-text-secondary">加载中...</div>
          ) : favorites.length > 0 ? (
            <div className="flex overflow-x-auto gap-4 pb-4 px-1 hide-scrollbar -mx-4 px-4">
              {favorites.map(fav => (
                <div 
                  key={fav.id} 
                  onClick={() => onSelectPet(fav.pet)} 
                  className="shrink-0 w-32 flex flex-col gap-2 group cursor-pointer"
                >
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-gray-200">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform" 
                      style={{ backgroundImage: `url('${fav.pet.image}')` }}
                    ></div>
                    <div className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full backdrop-blur-sm shadow-sm">
                      <span className="material-symbols-outlined filled text-red-400 text-[16px] block">favorite</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-text-main text-sm">{fav.pet.name}</p>
                    <p className="text-xs text-text-secondary">{fav.pet.breed}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-text-secondary">暂无收藏</div>
          )}
        </div>
      </main>

      {/* Nav */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-100 pb-safe pt-2 px-6 z-50">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => onTabChange('home')}
            className="flex flex-col items-center gap-1 w-12 text-gray-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[26px]">home</span>
            <span className="text-[10px] font-medium">首页</span>
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
          <button className="flex flex-col items-center gap-1 w-12 text-primary">
            <span className="material-symbols-outlined filled text-[26px]">person</span>
            <span className="text-[10px] font-bold">我的</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Profile;
