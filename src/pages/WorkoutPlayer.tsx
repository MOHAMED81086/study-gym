import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Play, Pause, CheckCircle, Timer, Plus, Minus, Activity } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { WORKOUT_PLANS } from '../data/workoutPlans';

const REST_DURATION = 10;

export default function WorkoutPlayer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { gender, t, language } = useSettings();
  
  // Parse plan from URL
  const queryParams = new URLSearchParams(location.search);
  const planId = queryParams.get('plan') || 'fat_loss';
  const planDefinitions = WORKOUT_PLANS[planId as keyof typeof WORKOUT_PLANS] || WORKOUT_PLANS.fat_loss;
  const exercises = gender === 'male' ? planDefinitions.male : planDefinitions.female;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercises[0]?.duration || 30);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Reset loading state and timer when exercise changes
  useEffect(() => {
    setIsImageLoading(true);
    if (!isResting) {
      setTimeLeft(exercises[currentIndex]?.duration || 30);
    }
  }, [currentIndex, isResting, exercises]);

  useEffect(() => {
    if (isPaused || isFinished || showCongrats) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (isResting) {
            // Finished rest, go to next exercise
            const nextIndex = currentIndex + 1;
            if (nextIndex >= exercises.length) {
              handleFinish();
              return 0;
            }
            setCurrentIndex(nextIndex);
            setIsResting(false);
            return exercises[nextIndex].duration;
          } else {
            // Finished exercise, go to rest
            if (currentIndex >= exercises.length - 1) {
              handleFinish();
              return 0;
            }
            setIsResting(true);
            return REST_DURATION;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, isFinished, isResting, currentIndex, showCongrats, exercises]);

  const handleSkip = () => {
    setTimeLeft(0);
  };

  const handleFinish = () => {
    setShowCongrats(true);
    setTimeout(() => {
      navigate('/fitness');
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (showCongrats) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="w-28 h-28 bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mb-8 animate-bounce shadow-xl">
          <CheckCircle size={56} />
        </div>
        <h2 className="text-4xl font-black mb-4 text-gray-900 dark:text-white tracking-tight">{t('congrats')}</h2>
        <p className="text-gray-500 font-bold uppercase tracking-widest">{t('back')}...</p>
      </div>
    );
  }

  const currentExercise = exercises[currentIndex] || exercises[0];
  const isJumping = ['jumping_jacks', 'high_knees', 'burpees', 'squat_jumps'].includes(currentExercise?.id || '');
  const isPushing = ['pushups', 'pushups_wide', 'diamond_pushups', 'decline_pushups'].includes(currentExercise?.id || '');

  const progress = isResting 
    ? ((REST_DURATION - timeLeft) / REST_DURATION) * 100
    : currentExercise ? ((currentExercise.duration - timeLeft) / currentExercise.duration) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-950 text-gray-900 dark:text-white z-50 flex flex-col overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex justify-between items-center p-6 z-10 border-b dark:border-gray-800">
        <button onClick={() => navigate('/fitness')} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95 shadow-sm">
          <X size={24} />
        </button>
        <div className="flex flex-col items-center">
          <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
            {t('exercise')} {currentIndex + 1} / {exercises.length}
          </div>
          <div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full border border-green-100 dark:border-green-800">
            <CheckCircle size={10} className="text-green-600" />
            <span className="text-[10px] font-black text-green-600 uppercase tracking-tighter">{t('no_equipment')}</span>
          </div>
        </div>
        <div className="w-12"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-between p-6 text-center relative max-w-2xl mx-auto w-full">
        {isResting ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-300">
            <div className="w-28 h-28 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Timer size={56} />
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl font-black text-blue-600 tracking-tighter">{t('rest_time')}</h2>
              <div className="px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-full inline-block">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{t('prepare')}</p>
              </div>
              <p className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{t(exercises[currentIndex + 1]?.nameKey || '')}</p>
            </div>
            <button 
              onClick={handleSkip}
              className="px-10 py-5 bg-blue-600 text-white rounded-3xl flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-95 font-black text-lg"
            >
              {language === 'ar' ? 'تخطي الاستراحة' : 'Skip Rest'}
            </button>
          </div>
        ) : (
          <>
            {/* Animation Area */}
            <div className="w-full aspect-square bg-white dark:bg-gray-900 rounded-[3rem] overflow-hidden shadow-inner flex items-center justify-center relative border-8 border-white dark:border-gray-800 shadow-xl">
              {isImageLoading && (
                <div className="absolute inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center gap-4 z-20">
                  <Activity size={48} className="text-blue-500 animate-spin" />
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">Loading Animation...</p>
                </div>
              )}

              <img 
                key={currentExercise?.image}
                src={currentExercise?.image} 
                alt={t(currentExercise?.nameKey || '')} 
                className={`w-full h-full object-contain relative z-10 transition-all duration-700 transform ${isPaused ? 'opacity-20 blur-xl scale-90' : 'opacity-100 scale-100'}`}
                referrerPolicy="no-referrer"
                onLoad={() => setIsImageLoading(false)}
                onError={(e) => {
                  setIsImageLoading(false);
                  e.currentTarget.src = `https://picsum.photos/seed/${currentExercise?.id}/800/800`;
                }}
              />
              
              {isPaused && (
                <div className="absolute inset-0 z-30 flex items-center justify-center backdrop-blur-[4px] transition-all duration-300">
                  <div className="bg-white/90 dark:bg-gray-800/90 text-blue-600 dark:text-blue-400 px-12 py-6 rounded-[2.5rem] font-black text-3xl flex items-center gap-6 shadow-2xl border-4 border-blue-600/20">
                    <Pause size={40} fill="currentColor" /> {language === 'ar' ? 'مؤقت' : 'Paused'}
                  </div>
                </div>
              )}
            </div>

            {/* Exercise Details */}
            <div className="w-full space-y-2 mt-8">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{t(currentExercise.nameKey)}</h2>
              <div className="flex items-center justify-center gap-4">
                <span className="text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 rounded-full uppercase tracking-widest">
                  {currentExercise.duration}s
                </span>
                <span className="text-sm font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/30 px-4 py-1 rounded-full uppercase tracking-widest">
                  {isJumping ? '450' : isPushing ? '300' : '150'} kcal
                </span>
              </div>
            </div>

            <div className="flex-1 flex items-end justify-center w-full pb-8">
              <button 
                onClick={handleSkip}
                className="px-8 py-3 text-gray-400 hover:text-gray-600 font-bold uppercase tracking-widest text-xs transition-colors"
              >
                {language === 'ar' ? 'تخطي التمرين' : 'Skip Exercise'}
              </button>
            </div>
          </>
        )}

        {/* Timer and Progress */}
        <div className="w-full space-y-6 pt-4 bg-white dark:bg-gray-950">
          <div className="flex flex-col items-center">
            <div className="text-7xl font-black tabular-nums tracking-tighter text-gray-900 dark:text-white">
              {timeLeft}
              <span className="text-lg text-gray-400 ms-1 font-bold">s</span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="px-4">
            <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded-full w-full overflow-hidden shadow-inner">
              <div 
                className={`h-full transition-all duration-1000 ease-linear rounded-full ${isResting ? 'bg-amber-500' : 'bg-blue-600'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-8 pb-12 flex justify-between items-center gap-6 bg-white dark:bg-gray-950 border-t dark:border-gray-800">
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="w-20 h-20 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-[2rem] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-90"
        >
          {isPaused ? <Play size={32} fill="currentColor" /> : <Pause size={32} fill="currentColor" />}
        </button>
        
        {!isResting && (
          <button 
            onClick={handleFinish}
            className="flex-1 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center gap-4 font-black text-xl hover:bg-blue-700 shadow-2xl shadow-blue-500/30 transition-all active:scale-95"
          >
            <CheckCircle size={28} /> {t('finish')}
          </button>
        )}
      </div>
    </div>
  );
}
