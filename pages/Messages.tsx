
import React, { useState } from 'react';
import { Page } from '../types';

interface MessagesProps {
  onTabChange: (page: Page) => void;
  onStartAI: () => void;
}

const Messages: React.FC<MessagesProps> = ({ onTabChange, onStartAI }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'system'>('all');

  const chats = [
    {
      id: 'ai',
      name: 'AI 匹配助手',
      lastMsg: '根据您的习惯，我为您找到了新的推荐...',
      time: '14:20',
      unread: 1,
      isAI: true,
      avatar: 'https://cdn-icons-png.flaticon.com/512/610/610413.png',
      online: true
    },
    {
      id: '1',
      name: '快乐爪爪救助站 - 王老师',
      lastMsg: 'Luna 的疫苗记录已经发送到您的邮箱，请查收。',
      time: '11:05',
      unread: 0,
      isAI: false,
      avatar: 'https://picsum.photos/seed/person1/100/100',
      online: true
    },
    {
      id: '2',
      name: '志愿者 小李',
      lastMsg: '好的，那我们约在周六下午三点见面？',
      time: '昨天',
      unread: 2,
      isAI: false,
      avatar: 'https://picsum.photos/seed/person2/100/100',
      online: false
    },
    {
      id: 'sys-1',
      name: '系统通知',
      lastMsg: '您的领养申请已进入审核阶段。',
      time: '2天前',
      unread: 0,
      isSystem: true,
      avatar: 'https://cdn-icons-png.flaticon.com/512/1157/1157000.png',
      online: true
    }
  ];

  return (
    <div className="flex flex-col h-full bg-background-light pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-5 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-text-main">消息中心</h1>
          <button className="flex size-10 items-center justify-center rounded-full bg-gray-100 text-text-main hover:bg-gray-200 transition-colors">
            <span className="material-symbols-outlined">edit_square</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          {['all', 'unread', 'system'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`relative px-4 py-1 text-sm font-bold transition-all ${
                activeTab === tab ? 'text-primary-dark' : 'text-gray-400'
              }`}
            >
              {tab === 'all' ? '全部消息' : tab === 'unread' ? '未读' : '系统'}
              {activeTab === tab && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-primary-dark rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pt-4 px-2 flex flex-col gap-1 hide-scrollbar">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={chat.isAI ? onStartAI : undefined}
            className="flex items-center gap-4 p-4 rounded-3xl bg-white/50 hover:bg-white transition-all cursor-pointer group active:scale-[0.98]"
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div 
                className={`size-14 rounded-2xl bg-cover bg-center shadow-sm ${chat.isAI ? 'bg-primary/20 p-2' : ''}`}
                style={{ backgroundImage: chat.isAI ? 'none' : `url('${chat.avatar}')` }}
              >
                {chat.isAI && (
                  <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
                )}
              </div>
              {chat.online && (
                <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className={`font-bold truncate ${chat.unread > 0 ? 'text-text-main' : 'text-gray-600'}`}>
                  {chat.name}
                </h3>
                <span className="text-[10px] font-bold text-gray-400">{chat.time}</span>
              </div>
              <p className="text-xs font-medium text-text-secondary truncate pr-4">
                {chat.lastMsg}
              </p>
            </div>

            {/* Badges */}
            <div className="flex flex-col items-center gap-2">
              {chat.unread > 0 && (
                <div className="size-5 rounded-full bg-primary-dark text-white text-[10px] font-black flex items-center justify-center shadow-lg shadow-primary-dark/30">
                  {chat.unread}
                </div>
              )}
              <span className="material-symbols-outlined text-gray-300 group-hover:text-primary-dark transition-colors">chevron_right</span>
            </div>
          </div>
        ))}
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
          <button 
            onClick={() => onTabChange('discovery')}
            className="flex flex-col items-center gap-1 w-12 text-gray-400 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[26px]">search</span>
            <span className="text-[10px] font-medium">发现</span>
          </button>
          <button 
            onClick={onStartAI}
            className="relative -top-5 bg-primary text-text-main p-3 rounded-full shadow-lg border-4 border-white transition-transform hover:scale-110"
          >
            <span className="material-symbols-outlined text-[28px] block">auto_awesome</span>
          </button>
          <button className="flex flex-col items-center gap-1 w-12 text-primary">
            <span className="material-symbols-outlined filled text-[26px]">chat_bubble</span>
            <span className="text-[10px] font-bold">消息</span>
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

export default Messages;
