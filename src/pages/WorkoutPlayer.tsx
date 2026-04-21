import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Play, Pause, CheckCircle, Timer, Plus, Minus } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const MALE_EXERCISES = [
  { id: 'pushups', nameKey: 'pushups', duration: 30, image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif' },
  { id: 'squats', nameKey: 'squats', duration: 30, image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Squat.gif' },
  { id: 'plank', nameKey: 'plank', duration: 30, image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Plank.gif' },
  { id: 'burpees', nameKey: 'burpees', duration: 30, image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Burpee.gif' },
  { id: 'lunges', nameKey: 'lunges', duration: 30, image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Forward-Lunge.gif' },
  { id: 'mountain_climbers', nameKey: 'mountain_climbers', duration: 30, image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Mountain-Climber.gif' },
  { id: 'jumping_jacks', nameKey: 'jumping_jacks', duration: 30, image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Jumping-Jacks.gif' },
  { id: 'superman', nameKey: 'superman', duration: 30, image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Superman.gif' },
  { id: 'bicycle_crunches', nameKey: 'bicycle_crunches', duration: 30, image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bicycle-Crunch.gif' },
  { id: 'leg_raises', nameKey: 'leg_raises', duration: 30, image: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Raise.gif' }
];

const FEMALE_EXERCISES = [
  { id: 'pushups', nameKey: 'pushups', duration: 30, image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqZ3JqJmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKVUn7iM8FMEU24/giphy.gif' },
  { id: 'squats', nameKey: 'squats', duration: 30, image: 'https://www.spotebi.com/wp-content/uploads/2014/10/squats-exercise-illustration.gif' },
  { id: 'plank', nameKey: 'plank', duration: 30, image: 'https://www.spotebi.com/wp-content/uploads/2014/10/plank-exercise-illustration.gif' },
  { id: 'burpees', nameKey: 'burpees', duration: 30, image: 'https://www.spotebi.com/wp-content/uploads/2014/10/burpees-exercise-illustration.gif' },
  { id: 'lunges', nameKey: 'lunges', duration: 30, image: 'https://www.spotebi.com/wp-content/uploads/2014/10/lunges-exercise-illustration.gif' },
  { id: 'mountain_climbers', nameKey: 'mountain_climbers', duration: 30, image: 'https://www.spotebi.com/wp-content/uploads/2014/10/mountain-climbers-exercise-illustration.gif' },
  { id: 'jumping_jacks', nameKey: 'jumping_jacks', duration: 30, image: 'https://www.spotebi.com/wp-content/uploads/2014/10/jumping-jacks-exercise-illustration.gif' },
  { id: 'superman', nameKey: 'superman', duration: 30, image: 'https://www.spotebi.com/wp-content/uploads/2015/02/superman-exercise-illustration.gif' },
  { id: 'bicycle_crunches', nameKey: 'bicycle_crunches', duration: 30, image: 'https://www.spotebi.com/wp-content/uploads/2014/10/bicycle-crunches-exercise-illustration.gif' },
  { id: 'leg_raises', nameKey: 'leg_raises', duration: 30, image: 'https://www.spotebi.com/wp-content/uploads/2014/10/straight-leg-raise-exercise-illustration.gif' }
];

const REST_DURATION = 10;

export default function WorkoutPlayer() {
  const navigate = useNavigate();
  const { gender, t, language } = useSettings();
  const exercises = gender === 'male' ? MALE_EXERCISES : FEMALE_EXERCISES;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

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
      navigate('/');
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (showCongrats) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{t('congrats')}</h2>
      </div>
    );
  }

  const currentExercise = exercises[currentIndex] || exercises[0];
  const progress = isResting 
    ? ((REST_DURATION - timeLeft) / REST_DURATION) * 100
    : currentExercise ? ((currentExercise.duration - timeLeft) / currentExercise.duration) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-gray-900 text-white z-50 flex flex-col overflow-hidden" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-gray-900/50 backdrop-blur-sm z-10">
        <button onClick={() => navigate('/fitness')} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
          <X size={24} />
        </button>
        <div className="font-bold text-gray-400">
          {t('exercise')} {currentIndex + 1} {t('of')} {exercises.length}
        </div>
        <div className="w-10"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-between p-6 text-center relative">
        {isResting ? (
          <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <div className="w-24 h-24 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <Timer size={48} />
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-blue-400">{t('rest_time')}</h2>
              <p className="text-xl text-gray-400">{t('prepare')}</p>
              <p className="text-3xl font-bold text-white">{t(exercises[currentIndex + 1]?.nameKey || '')}</p>
            </div>
            <button 
              onClick={handleSkip}
              className="px-8 py-4 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center gap-2 hover:bg-blue-600/30 transition-all active:scale-95 text-blue-400 font-bold"
            >
              {language === 'ar' ? 'تخطي الاستراحة' : 'Skip Rest'}
            </button>
          </div>
        ) : (
          <>
            {/* Animation Area */}
            <div className="w-full max-w-sm aspect-square bg-white rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-4 relative group">
              <img 
                src={currentExercise?.image} 
                alt={t(currentExercise?.nameKey || '')}
                className={`w-full h-full object-contain mix-blend-multiply transition-all duration-500 ${isPaused ? 'opacity-20 grayscale scale-95' : 'opacity-100 scale-100'}`}
                referrerPolicy="no-referrer"
                key={currentExercise?.id} // Force reload on exercise change
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.includes('fitnessprogramer.com')) {
                    // Fallback to spotebi illustration if fitnessprogramer fails
                    const femaleEx = FEMALE_EXERCISES.find(ex => ex.id === currentExercise.id);
                    if (femaleEx) target.src = femaleEx.image;
                  }
                }}
              />
              {isPaused && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-gray-900/90 text-white px-8 py-4 rounded-full font-bold text-2xl flex items-center gap-3 shadow-2xl animate-in fade-in zoom-in duration-300">
                    <Pause size={32} fill="currentColor" /> {language === 'ar' ? 'متوقف' : 'Paused'}
                  </div>
                </div>
              )}
            </div>

            {/* Exercise Name */}
            <h2 className="text-3xl font-bold mt-4">{t(currentExercise.nameKey)}</h2>

            {/* Skip Button for Exercise */}
            <div className="flex-1 flex flex-col items-center justify-center w-full">
              <button 
                onClick={handleSkip}
                className="px-8 py-4 bg-gray-800/50 border border-gray-700 rounded-2xl flex items-center gap-2 hover:bg-gray-700 transition-all active:scale-95 text-gray-300 font-bold"
              >
                {language === 'ar' ? 'تخطي التمرين' : 'Skip Exercise'}
              </button>
            </div>
          </>
        )}

        {/* Timer and Progress */}
        <div className="w-full space-y-6 pt-4">
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold tabular-nums tracking-tighter text-gray-300">
              {formatTime(timeLeft)}
            </div>
            <div className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mt-1">{t('timer')}</div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-gray-800 rounded-full w-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-linear ${isResting ? 'bg-blue-500' : 'bg-green-500'}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-6 pb-10 flex justify-between items-center gap-4 bg-gray-900/80 backdrop-blur-md border-t border-gray-800">
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="flex-1 h-16 bg-gray-800 text-white rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-gray-700 transition-all active:scale-95"
        >
          {isPaused ? (
            <><Play size={24} fill="currentColor" /> {language === 'ar' ? 'استئناف' : 'Resume'}</>
          ) : (
            <><Pause size={24} fill="currentColor" /> {language === 'ar' ? 'إيقاف' : 'Pause'}</>
          )}
        </button>
        
        {!isResting && (
          <button 
            onClick={handleFinish}
            className="flex-1 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center gap-3 font-bold hover:bg-red-500 shadow-lg shadow-red-900/20 transition-all active:scale-95"
          >
            <CheckCircle size={24} /> {t('finish')}
          </button>
        )}
      </div>
    </div>
  );
}
