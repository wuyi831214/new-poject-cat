
import React, { useState, useEffect } from 'react';
import { Pet } from '../types-extended';
import { useApplications } from '../hooks/useApplications';

interface AdoptionFormProps {
  pet: Pet;
  onBack: () => void;
  onComplete: () => void;
}

const AdoptionForm: React.FC<AdoptionFormProps> = ({ pet, onBack, onComplete }) => {
  const [step, setStep] = useState(2);
  const [userId] = useState('user@example.com');
  const { createApplication } = useApplications(userId);
  
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    houseType: '普通公寓',
    ownershipType: '租房',
    experience: '有过经验',
    reason: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen pb-32 bg-background-light">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-background-light/95 backdrop-blur-md px-4 py-3 border-b border-primary/10">
        <button 
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm text-text-main"
        >
          <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold text-text-main">领养申请表</h1>
        <div className="w-10"></div>
      </header>

      {/* Progress Indicator */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-8 rounded-full bg-accent-mint flex items-center justify-center border-2 border-white shadow-sm">
              <span className="material-symbols-outlined text-sm font-bold text-green-700">check</span>
            </div>
            <span className="text-[10px] font-semibold text-green-700 uppercase tracking-wider">开始</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center border-2 border-white ring-2 ring-primary/30 shadow-sm z-10">
              <span className="text-sm font-bold text-text-main">2</span>
            </div>
            <span className="text-[10px] font-bold text-text-main uppercase tracking-wider">详情</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="h-8 w-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10">
              <span className="text-sm font-medium text-text-secondary">3</span>
            </div>
            <span className="text-[10px] font-medium text-text-secondary uppercase tracking-wider">确认</span>
          </div>
        </div>
      </div>

      <main className="px-4 w-full flex flex-col gap-6">
        {/* Step 2 Content: Details */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/20 rounded-lg text-text-main">
              <span className="material-symbols-outlined">person</span>
            </div>
            <h2 className="text-xl font-bold text-text-main">个人信息</h2>
          </div>
          <div className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-text-main ml-1 mb-1 block">姓名</span>
              <input 
                className="w-full h-14 rounded-xl border-gray-200 bg-background-light px-4 font-medium focus:border-primary focus:ring-primary" 
                placeholder="例如：张三" 
                type="text" 
                value={formData.userName}
                onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              />
            </label>
            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="text-sm font-semibold text-text-main ml-1 mb-1 block">手机号码</span>
                <input 
                  className="w-full h-14 rounded-xl border-gray-200 bg-background-light px-4 font-medium focus:border-primary focus:ring-primary" 
                  placeholder="例如：13800138000" 
                  type="tel"
                  value={formData.userPhone}
                  onChange={(e) => setFormData({ ...formData, userPhone: e.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-text-main ml-1 mb-1 block">电子邮箱</span>
                <input 
                  className="w-full h-14 rounded-xl border-gray-200 bg-background-light px-4 font-medium focus:border-primary focus:ring-primary" 
                  placeholder="hello@example.com" 
                  type="email"
                  value={formData.userEmail}
                  onChange={(e) => setFormData({ ...formData, userEmail: e.target.value })}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-800">
              <span className="material-symbols-outlined">home_work</span>
            </div>
            <h2 className="text-xl font-bold text-text-main">居住环境</h2>
          </div>
          <div className="space-y-6">
            <label className="block relative">
              <span className="text-sm font-semibold text-text-main ml-1 mb-1 block">房屋类型</span>
              <div className="relative">
                <select 
                  className="w-full h-14 appearance-none rounded-xl border-gray-200 bg-background-light px-4 font-medium focus:border-primary focus:ring-primary"
                  value={formData.houseType}
                  onChange={(e) => setFormData({ ...formData, houseType: e.target.value })}
                >
                  <option>普通公寓</option>
                  <option>独栋房屋</option>
                  <option>住宅小区</option>
                  <option>联排别墅</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
                  <span className="material-symbols-outlined">expand_more</span>
                </div>
              </div>
            </label>
            <div>
              <span className="text-sm font-semibold text-text-main ml-1 mb-2 block">房屋产权</span>
              <div className="bg-background-light p-1 rounded-xl flex border border-gray-200 h-14 relative">
                <label className="flex-1 z-10 cursor-pointer text-center flex items-center justify-center gap-2 relative">
                  <input 
                    checked={formData.ownershipType === '租房'}
                    onChange={(e) => setFormData({ ...formData, ownershipType: e.target.value })}
                    value="租房"
                    className="sr-only peer" 
                    name="ownership" 
                    type="radio" 
                  />
                  <span className="text-sm font-bold text-text-secondary peer-checked:text-text-main">租房</span>
                </label>
                <label className="flex-1 z-10 cursor-pointer text-center flex items-center justify-center gap-2 relative">
                  <input 
                    checked={formData.ownershipType === '自有'}
                    onChange={(e) => setFormData({ ...formData, ownershipType: e.target.value })}
                    value="自有"
                    className="sr-only peer" 
                    name="ownership" 
                    type="radio" 
                  />
                  <span className="text-sm font-bold text-text-secondary peer-checked:text-text-main">自有</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-800">
              <span className="material-symbols-outlined">pets</span>
            </div>
            <h2 className="text-xl font-bold text-text-main">养宠经验</h2>
          </div>
          <div className="space-y-3">
            {[
              { id: 'new', title: '首次养宠', sub: '我是新手，但我很乐意学习！', value: '首次养宠' },
              { id: 'exp', title: '有过经验', sub: '我以前照顾过宠物。', checked: true, value: '有过经验' },
              { id: 'current', title: '现有宠物', sub: '我现在家里就有宠物。', value: '现有宠物' }
            ].map((item) => (
              <label key={item.id} className="cursor-pointer group block">
                <input 
                  checked={formData.experience === item.value}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  value={item.value}
                  className="sr-only peer" 
                  name="experience" 
                  type="radio" 
                />
                <div className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                  formData.experience === item.value ? 'border-primary bg-orange-50' : 'border-gray-200'
                }`}>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center relative bg-white ${
                    formData.experience === item.value ? 'border-primary' : 'border-gray-200'
                  }`}>
                    <div className={`w-2.5 h-2.5 rounded-full bg-primary transition-transform ${
                      formData.experience === item.value ? 'scale-100' : 'scale-0'
                    }`}></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-text-main">{item.title}</span>
                    <span className="text-xs text-text-secondary">{item.sub}</span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg text-yellow-800">
              <span className="material-symbols-outlined">favorite</span>
            </div>
            <h2 className="text-xl font-bold text-text-main">领养理由</h2>
          </div>
          <label className="block">
            <textarea 
              className="w-full h-32 rounded-xl border-gray-200 bg-background-light px-4 py-3 font-medium resize-none focus:border-primary focus:ring-primary" 
              placeholder="请简要介绍您的生活方式以及您想要领养宠物的原因..."
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            ></textarea>
          </label>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-primary/10 px-6 py-4 z-40 max-w-md mx-auto">
        {submitError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {submitError}
          </div>
        )}
        <div className="flex items-center gap-4">
          <button className="flex-1 py-3.5 rounded-xl border border-transparent text-text-secondary font-bold text-base hover:bg-gray-50 transition-colors">
            稍后保存
          </button>
          <button 
            onClick={async () => {
              setIsSubmitting(true);
              setSubmitError(null);
              
              const result = await createApplication({
                petId: pet.id,
                userName: formData.userName,
                userEmail: formData.userEmail,
                userPhone: formData.userPhone,
                houseType: formData.houseType,
                ownershipType: formData.ownershipType,
                experience: formData.experience,
                reason: formData.reason
              });
              
              if (result.success) {
                onComplete();
              } else {
                setSubmitError(result.error?.message || '提交失败,请重试');
              }
              
              setIsSubmitting(false);
            }}
            disabled={isSubmitting}
            className="flex-[2] py-3.5 rounded-xl bg-primary hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-text-main font-bold text-base shadow-lg shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>{isSubmitting ? '提交中...' : '继续'}</span>
            {!isSubmitting && <span className="material-symbols-outlined text-lg">arrow_forward</span>}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AdoptionForm;
