import { useState, useEffect } from 'react';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Activity, Edit2, Save, X, TrendingDown, Flame, Zap, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockProgressData = [
  { name: 'الأسبوع 1', weight: 75 },
  { name: 'الأسبوع 2', weight: 74.2 },
  { name: 'الأسبوع 3', weight: 73.5 },
  { name: 'الأسبوع 4', weight: 72.8 },
  { name: 'الآن', weight: 70 },
];

export default function Fitness({ user }: { user: any }) {
  const { t } = useSettings();
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ weight: 0, height: 0, age: 0 });

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setProfile(data);
        setFormData({ weight: data.weight, height: data.height, age: data.age });
      }
    });
    return () => unsubscribe();
  }, [user]);

  const calculateMetrics = (w: number, h: number, a: number) => {
    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);
    
    let bodyType = 'معتدل';
    if (bmi < 18.5) bodyType = 'نحيف';
    else if (bmi > 25) bodyType = 'ممتلئ';

    const bmr = (10 * w) + (6.25 * h) - (5 * a) + 5; 
    const dailyCalories = Math.round(bmr * 1.2);

    return { bodyType, dailyCaloriesTarget: dailyCalories };
  };

  const handleSave = async () => {
    if (!user) return;
    const metrics = calculateMetrics(formData.weight, formData.height, formData.age);
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        weight: formData.weight,
        height: formData.height,
        age: formData.age,
        ...metrics
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  if (!profile) return <div className="p-6 text-center">{t('loading')}</div>;

  const currentChartData = [...mockProgressData];
  currentChartData[4] = { ...currentChartData[4], weight: profile.weight };

  return (
    <div className="p-6 md:p-10 space-y-10 pb-24 text-gray-900 dark:text-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">{t('fitness_title')}</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium mt-2">Track your progress and reach your goals</p>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)} 
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-colors"
          >
            <Edit2 size={20} />
            <span>{t('edit_profile')}</span>
          </button>
        )}
      </div>

      {/* Progress Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold mb-6 flex items-center gap-2">
          <TrendingDown className="text-blue-500" /> تطور الوزن
        </h3>
        <div className="h-64 w-full" dir="ltr">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ color: '#2563eb', fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={4} dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Profile Stats Card */}
      <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-gray-700">
        {isEditing ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block px-1">{t('weight')} (kg)</label>
                <input 
                  type="number" 
                  value={formData.weight} 
                  onChange={e => setFormData({...formData, weight: Number(e.target.value)})} 
                  className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 outline-none rounded-2xl p-4 font-bold transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block px-1">{t('height')} (cm)</label>
                <input 
                  type="number" 
                  value={formData.height} 
                  onChange={e => setFormData({...formData, height: Number(e.target.value)})} 
                  className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 outline-none rounded-2xl p-4 font-bold transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 block px-1">{t('age')}</label>
                <input 
                  type="number" 
                  value={formData.age} 
                  onChange={e => setFormData({...formData, age: Number(e.target.value)})} 
                  className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 outline-none rounded-2xl p-4 font-bold transition-all" 
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black flex justify-center items-center gap-2 hover:bg-blue-700 transition-colors">
                <Save size={20} /> {t('save')}
              </button>
              <button onClick={() => setIsEditing(false)} className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-4 rounded-2xl font-black flex justify-center items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <X size={20} /> {t('back')}
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:divide-x sm:divide-x-reverse divide-gray-100 dark:divide-gray-700">
            <div className="space-y-1">
              <div className="text-4xl font-black text-gray-900 dark:text-white">{profile.weight}</div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{t('weight')}</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black text-gray-900 dark:text-white">{profile.height}</div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{t('height')}</div>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-black text-blue-600 dark:text-blue-400">{profile.bodyType}</div>
              <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">{t('body_type')}</div>
            </div>
          </div>
        )}
      </div>

      {/* Workouts */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{t('workout_plans')}</h3>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 rounded-full">{t('select_plan')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'fat_loss', icon: <Flame size={32} />, color: 'bg-orange-50 text-orange-500 dark:bg-orange-900/20', count: 6 },
            { id: 'strength', icon: <Zap size={32} />, color: 'bg-blue-50 text-blue-500 dark:bg-blue-900/20', count: 6 },
            { id: 'therapeutic', icon: <HeartPulse size={32} />, color: 'bg-teal-50 text-teal-500 dark:bg-teal-900/20', count: 5 }
          ].map((plan) => (
            <div key={plan.id} className="group bg-white dark:bg-gray-800 p-6 rounded-[2rem] shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col gap-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 ${plan.color} rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  {plan.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-gray-900 dark:text-white">{t(plan.id)}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mt-1 uppercase tracking-wider">{plan.count} {t('exercise')} • {t('male')}/{t('female')}</p>
                </div>
              </div>
              <Link 
                to={`/workout?plan=${plan.id}`}
                className="w-full bg-gray-50 dark:bg-gray-700 py-3 rounded-xl text-sm font-black text-center hover:bg-blue-600 hover:text-white transition-all"
              >
                {t('start')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
