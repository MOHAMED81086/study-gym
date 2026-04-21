import { useSettings } from '../context/SettingsContext';
import { Globe, User, Check, Moon, Sun } from 'lucide-react';

export default function Settings() {
  const { language, setLanguage, gender, setGender, theme, setTheme, t } = useSettings();

  return (
    <div className="p-6 space-y-8 pb-24 border-b border-white">
      <h2 className="text-2xl font-bold mb-6">{t('settings')}</h2>

      {/* Theme Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          <span className="font-semibold">{t('theme')}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
              theme === 'light' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800'
            }`}
          >
            <span className="font-bold flex items-center gap-2"><Sun size={18}/> {t('light_mode')}</span>
            {theme === 'light' && <Check size={18} />}
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
              theme === 'dark' ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800'
            }`}
          >
            <span className="font-bold flex items-center gap-2"><Moon size={18}/> {t('dark_mode')}</span>
            {theme === 'dark' && <Check size={18} />}
          </button>
        </div>
      </div>

      {/* Language Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <Globe size={20} />
          <span className="font-semibold">{t('language')}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLanguage('ar')}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
              language === 'ar' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white dark:bg-gray-800'
            }`}
          >
            <span className="font-bold">العربية 🇪🇬</span>
            {language === 'ar' && <Check size={18} />}
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
              language === 'en' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white dark:bg-gray-800'
            }`}
          >
            <span className="font-bold">English 🇬🇧</span>
            {language === 'en' && <Check size={18} />}
          </button>
        </div>
      </div>

      {/* Animation Character Selection */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <User size={20} />
          <span className="font-semibold">{language === 'ar' ? 'شخصية التمارين' : 'Workout Character'}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setGender('male')}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
              gender === 'male' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white dark:bg-gray-800'
            }`}
          >
            <span className="font-bold">{language === 'ar' ? 'أنيميشن ولد' : 'Male Animation'}</span>
            {gender === 'male' && <Check size={18} />}
          </button>
          <button
            onClick={() => setGender('female')}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
              gender === 'female' ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 bg-white dark:bg-gray-800'
            }`}
          >
            <span className="font-bold">{language === 'ar' ? 'أنيميشن بنت' : 'Female Animation'}</span>
            {gender === 'female' && <Check size={18} />}
          </button>
        </div>
      </div>
      {/* Android Installation Guide */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-3xl space-y-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <span className="text-blue-600">📱</span>
          {language === 'ar' ? 'تثبيت التطبيق على أندرويد' : 'Install on Android'}
        </h3>
        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex gap-3">
            <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0">1</span>
            <span>{language === 'ar' ? 'افتح التطبيق في متصفح Chrome' : 'Open the app in Chrome browser'}</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0">2</span>
            <span>{language === 'ar' ? 'اضغط على النقاط الثلاث (القائمة) في الأعلى' : 'Tap the three dots (menu) at the top'}</span>
          </li>
          <li className="flex gap-3">
            <span className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0">3</span>
            <span>{language === 'ar' ? 'اختر "الإضافة إلى الشاشة الرئيسية"' : 'Select "Add to Home Screen"'}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
