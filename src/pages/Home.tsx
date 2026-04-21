import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Activity, BookOpen, Flame, Droplets, Plus, Bot, Download, Trophy, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import confetti from 'canvas-confetti';

export default function Home({ user }: { user: any }) {
  const { t } = useSettings();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstall(false);
    }
    setDeferredPrompt(null);
  };

  useEffect(() => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    
    const unsubscribe = onSnapshot(userRef, async (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data());
        setLoading(false);
      } else {
        const initialData = {
          uid: user.uid,
          email: user.email,
          displayName: user.email?.split('@')[0] || 'User',
          points: 0,
          level: 1,
          weight: 70,
          height: 170,
          age: 25,
          bodyType: 'معتدل',
          dailyCaloriesTarget: 2200,
          caloriesConsumed: 0,
          waterIntake: 0,
          habits: {
            read: false,
            pray: false,
            workout: false,
            hydrate: false
          },
          createdAt: new Date().toISOString()
        };
        await setDoc(userRef, initialData);
        setProfile(initialData);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [user]);

  const toggleHabit = async (habitKey: string) => {
    if (!profile) return;
    const isCompleted = profile.habits?.[habitKey];
    
    const newPoints = isCompleted ? Math.max(0, (profile.points || 0) - 10) : (profile.points || 0) + 10;
    const newLevel = Math.floor(newPoints / 100) + 1;
    
    if (!isCompleted && newLevel > (profile.level || 1)) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      [`habits.${habitKey}`]: !isCompleted,
      points: newPoints,
      level: newLevel
    });
  };

  const addWater = async () => {
    if (!profile) return;
    const userRef = doc(db, 'users', user.uid);
    const newWater = (profile.waterIntake || 0) + 0.25;
    await updateDoc(userRef, { waterIntake: newWater });
  };

  const addCalories = async () => {
    if (!profile) return;
    const userRef = doc(db, 'users', user.uid);
    const newCalories = (profile.caloriesConsumed || 0) + 300; // Mock addition
    await updateDoc(userRef, { caloriesConsumed: newCalories });
  };

  if (loading) return <div className="p-6 text-center">{t('loading')}</div>;

  return (
    <div className="p-4 space-y-6 pb-24 text-gray-900 dark:text-gray-100">
      {/* Welcome Header & Gamification */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-[2rem] text-white shadow-xl shadow-blue-200 dark:shadow-none mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {t('welcome')} {profile?.displayName?.split(' ')[0]} 👋
            </h2>
            <p className="text-white/80 text-sm mt-1">{t('ready')}</p>
          </div>
          <div className="text-center bg-black/20 p-3 rounded-2xl border border-white/10">
            <Trophy className="mx-auto text-yellow-400 mb-1" size={24} />
            <div className="text-xs font-bold text-white/90">{t('level')} {profile?.level || 1}</div>
            <div className="text-[10px] text-white/70">{profile?.points || 0} {t('points')}</div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20">
          <div className="flex justify-between text-xs font-bold mb-1">
            <span>{t('level')} {profile?.level || 1}</span>
            <span>{t('level')} {(profile?.level || 1) + 1}</span>
          </div>
          <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-yellow-400 rounded-full transition-all" 
              style={{ width: `${((profile?.points || 0) % 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Install Prompt */}
      {showInstall && (
        <div className="bg-blue-600 p-4 rounded-2xl text-white flex items-center justify-between shadow-lg shadow-blue-200 dark:shadow-none">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Download size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm">{t('install_app')}</h4>
              <p className="text-[10px] opacity-80">{t('install_desc')}</p>
            </div>
          </div>
          <button 
            onClick={handleInstallClick}
            className="bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
          >
            {t('install_btn')}
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-3xl text-white shadow-lg shadow-orange-200 dark:shadow-none">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-xl">
              <Flame size={20} />
            </div>
            <button onClick={addCalories} className="p-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="text-2xl font-bold">{profile?.caloriesConsumed || 0}</div>
          <div className="text-xs opacity-80">{t('calories')} / {profile?.dailyCaloriesTarget || 2200}</div>
          <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all" 
              style={{ width: `${Math.min(100, ((profile?.caloriesConsumed || 0) / (profile?.dailyCaloriesTarget || 2200)) * 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-3xl text-white shadow-lg shadow-blue-200 dark:shadow-none">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/20 rounded-xl">
              <Droplets size={20} />
            </div>
            <button onClick={addWater} className="p-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="text-2xl font-bold">{profile?.waterIntake || 0}</div>
          <div className="text-xs opacity-80">{t('water')} (L)</div>
          <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all" 
              style={{ width: `${Math.min(100, ((profile?.waterIntake || 0) / 3) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Habit Tracker */}
      <div>
        <h3 className="text-lg font-bold mb-3 px-1">العادات اليومية</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'read', icon: <BookOpen size={18} />, title: 'قراءة كتاب', color: 'text-indigo-600', bg: 'bg-indigo-50 dark:bg-indigo-900/30' },
            { id: 'pray', icon: <CheckCircle size={18} />, title: 'الصلاة', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/30' },
            { id: 'workout', icon: <Activity size={18} />, title: 'التمرين', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/30' },
            { id: 'hydrate', icon: <Droplets size={18} />, title: 'شرب الماء', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/30' }
          ].map(habit => {
            const isDone = profile?.habits?.[habit.id] || false;
            return (
              <button 
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`p-3 rounded-2xl border-2 transition-all flex items-center gap-3 ${isDone ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800'}`}
              >
                <div className={`p-2 rounded-xl ${isDone ? 'bg-green-500 text-white' : habit.bg + ' ' + habit.color}`}>
                  {isDone ? <CheckCircle size={18} /> : habit.icon}
                </div>
                <span className={`text-sm font-bold ${isDone ? 'text-green-600' : 'text-gray-700 dark:text-gray-300'}`}>{habit.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-bold mb-3 px-1">{t('quick_actions')}</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link to="/workout" className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 hover:bg-blue-50 transition-colors">
            <Activity className="text-blue-600" />
            <span className="text-sm font-medium">{t('start_workout')}</span>
          </Link>
          <Link to="/study" className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm flex flex-col items-center gap-2 hover:bg-green-50 transition-colors">
            <BookOpen className="text-green-600" />
            <span className="text-sm font-medium">{t('study_schedule')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
