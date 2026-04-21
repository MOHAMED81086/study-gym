import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { BookOpen, Plus, Clock, Calendar, Check, Play, Pause, RotateCcw, Coffee } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function Study({ user }: { user: any }) {
  const { t } = useSettings();
  const [sessions, setSessions] = useState<any[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newSession, setNewSession] = useState({ title: '', subject: '', duration: 60 });
  
  // Pomodoro State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      // Timer finished!
      setIsTimerActive(false);
      // Setup break or Next
      if (!isBreak) {
        setIsBreak(true);
        setTimeLeft(5 * 60); // 5 min break
      } else {
        setIsBreak(false);
        setTimeLeft(25 * 60); // 25 min work
      }
      playNotificationSound();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, isBreak]);

  const playNotificationSound = () => {
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play();
    } catch {}
  };

  const toggleTimer = () => setIsTimerActive(!isTimerActive);
  const resetTimer = () => {
    setIsTimerActive(false);
    setIsBreak(false);
    setTimeLeft(25 * 60);
  };
  
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'study_sessions'), where('uid', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSessions(data);
    });
    return () => unsubscribe();
  }, [user]);

  const handleAdd = async () => {
    if (!user || !newSession.title) return;
    try {
      await addDoc(collection(db, 'study_sessions'), {
        uid: user.uid,
        title: newSession.title,
        subject: newSession.subject,
        durationMinutes: newSession.duration,
        startTime: new Date().toISOString(),
        completed: false
      });
      setShowAdd(false);
      setNewSession({ title: '', subject: '', duration: 60 });
    } catch (error) {
      console.error("Error adding session", error);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-10 mb-20 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">{t('study_schedule')}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">نظم وقتك وحقق أهدافك الدراسية</p>
        </div>
        <button 
          onClick={() => setShowAdd(!showAdd)} 
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>{t('add_lesson')}</span>
        </button>
      </div>

      {/* Pomodoro Timer */}
      <div className={`rounded-3xl p-8 text-center text-white shadow-xl transition-colors duration-500 ${isBreak ? 'bg-gradient-to-r from-green-500 to-teal-500' : 'bg-gradient-to-r from-red-500 to-orange-500'}`}>
        <h3 className="text-xl font-bold mb-2 opacity-90 flex items-center justify-center gap-2">
          {isBreak ? <Coffee size={24} /> : <Clock size={24} />}
          {isBreak ? t('take_break') : t('pomodoro')}
        </h3>
        <div className="text-7xl font-black py-6 tracking-widest" style={{ fontVariantNumeric: 'tabular-nums' }}>
          {formatTime(timeLeft)}
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <button onClick={toggleTimer} className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all">
            {isTimerActive ? <Pause size={20} /> : <Play size={20} />}
            {isTimerActive ? t('pause_timer') : t('start_timer')}
          </button>
          <button onClick={resetTimer} className="bg-black/10 hover:bg-black/20 text-white p-3 rounded-full transition-all">
            <RotateCcw size={20} />
          </button>
        </div>
      </div>

      {showAdd && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-[2.5rem] shadow-xl border border-blue-100 dark:border-gray-700 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block px-1">عنوان الدرس</label>
            <input 
              type="text" 
              placeholder="مثال: فيزياء الفصل الأول" 
              value={newSession.title}
              onChange={e => setNewSession({...newSession, title: e.target.value})}
              className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 outline-none rounded-2xl p-4 font-bold transition-all"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block px-1">المادة</label>
              <input 
                type="text" 
                placeholder="مثال: فيزياء" 
                value={newSession.subject}
                onChange={e => setNewSession({...newSession, subject: e.target.value})}
                className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 outline-none rounded-2xl p-4 font-bold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block px-1">المدة (دقائق)</label>
              <input 
                type="number" 
                placeholder="60" 
                value={newSession.duration}
                onChange={e => setNewSession({...newSession, duration: Number(e.target.value)})}
                className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 outline-none rounded-2xl p-4 font-bold transition-all text-center"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={handleAdd} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black flex justify-center items-center gap-2 hover:bg-blue-700 transition-colors">
              <Plus size={20} /> تأكيد الإضافة
            </button>
            <button onClick={() => setShowAdd(false)} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-4 rounded-2xl font-black flex justify-center items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Schedule List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.length === 0 ? (
          <div className="col-span-full text-center py-20 bg-white dark:bg-gray-800 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-700">
            <BookOpen size={64} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-xl font-bold text-gray-500 dark:text-gray-400">لا يوجد جلسات مذاكرة مجدولة.</p>
            <p className="text-sm mt-2 text-gray-400">ابدأ بتنظيم يومك الآن!</p>
          </div>
        ) : (
          sessions.map(session => (
            <div key={session.id} className="group bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300 border-r-8 border-r-blue-500">
              <div className="flex-1">
                <h4 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{session.title}</h4>
                <div className="flex items-center gap-4 mt-3 text-sm font-bold text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-lg"><BookOpen size={16} /> {session.subject || 'عام'}</span>
                  <span className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded-lg"><Clock size={16} /> {session.durationMinutes} دقيقة</span>
                </div>
              </div>
              <button className="w-12 h-12 rounded-2xl border-2 border-gray-100 dark:border-gray-700 flex items-center justify-center hover:bg-green-500 hover:border-green-500 hover:text-white transition-all group-hover:scale-110">
                <Check size={24} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
