import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';
type Gender = 'male' | 'female';
type Theme = 'light' | 'dark';

interface SettingsContextType {
  language: Language;
  gender: Gender;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setGender: (gender: Gender) => void;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    settings: 'الإعدادات',
    language: 'اللغة',
    gender: 'الشخصية',
    male: 'ذكر',
    female: 'أنثى',
    save: 'حفظ',
    home: 'الرئيسية',
    fitness: 'الرشاقة',
    study: 'المذاكرة',
    ai: 'المساعد',
    logout: 'تسجيل الخروج',
    welcome: 'مرحباً',
    ready: 'جاهز لتحقيق أهدافك اليوم؟',
    calories: 'السعرات',
    water: 'الماء',
    ai_tip_title: 'نصيحة AI اليوم',
    ai_tip_desc: '"ذاكر لمدة 45 دقيقة بعد تمرين كارديو خفيف (15 دقيقة) لتحسين التركيز وتنشيط الدورة الدموية."',
    quick_actions: 'إجراءات سريعة',
    start_workout: 'ابدأ تمرين',
    study_schedule: 'جدول مذاكرة',
    solve_homework: 'حل واجب',
    add_lesson: 'إضافة درس',
    fitness_title: 'الرشاقة والصحة',
    weight: 'الوزن',
    height: 'الطول',
    age: 'العمر',
    body_type: 'نوع الجسم',
    suggested_workouts: 'تمارين مقترحة لك',
    start: 'ابدأ',
    reps: 'تكرار',
    timer: 'المؤقت',
    finish: 'إنهاء التمرين',
    congrats: 'مبروك! خلصت التمرين 🎉',
    rest_time: 'وقت الراحة',
    prepare: 'استعد للتمرين القادم:',
    exercise: 'تمرين',
    of: 'من',
    back: 'رجوع',
    loading: 'جاري التحميل...',
    pushups: 'تمرين الضغط',
    squats: 'تمرين القرفصاء',
    plank: 'تمرين اللوح (البلانك)',
    burpees: 'تمرين البيربي',
    lunges: 'تمرين الاندفاع',
    mountain_climbers: 'تمرين تسلق الجبل',
    jumping_jacks: 'تمرين القفز (جاك)',
    superman: 'تمرين السوبرمان',
    bicycle_crunches: 'تمرين الدراجة (للبطن)',
    leg_raises: 'تمرين رفع الساق',
    install_app: 'تثبيت التطبيق على هاتفك',
    install_desc: 'احصل على تجربة كاملة كأنه تطبيق أندرويد أصلي!',
    install_btn: 'تثبيت الآن',
    theme: 'المظهر',
    light_mode: 'فاتح',
    dark_mode: 'داكن',
    pomodoro: 'مؤقت بومودورو',
    start_timer: 'ابدأ التركيز',
    pause_timer: 'إيقاف مؤقت',
    reset_timer: 'إعادة ضبط',
    take_break: 'وقت الراحة ☕',
    level: 'المستوى',
    points: 'نقطة',
    add_water: 'إضافة كوب ماء',
    add_calories: 'إضافة وجبة',
    ai_flashcards: 'بطاقات AI التعليمية',
    create_cards: 'اصنع بطاقات',
    chat_room: 'غرفة الدردشة',
    join_chat: 'انضم للدردشة',
    high_knees: 'تمرين الرفع العالي (ركبة)',
    squat_jumps: 'قفز القرفصاء',
    pushups_wide: 'ضغط (قبضة واسعة)',
    diamond_pushups: 'ضغط الماسة (قبضة ضيقة)',
    decline_pushups: 'تمرين الضغط',
    cat_cow_stretch: 'إطالة القطة والبقرة',
    childs_pose: 'وضعية الطفل (استرخاء)',
    glute_bridge: 'جسر الأرداف',
    cobra_stretch: 'إطالة الكوبرا',
    arm_circles: 'تدوير الذراعين',
    hip_circles: 'تدوير الحوض',
    calf_raises: 'رفع الكعبين',
    fat_loss: 'حرق دهون (منزلي - بدون معدات)',
    strength: 'قوة بدنية (وزن الجسم فقط)',
    therapeutic: 'تمارين علاجية (منزلي)',
    workout_plans: 'خطط التدريب المنزلي',
    select_plan: 'اختر خطتك التدريبية اليوم:',
    no_equipment: 'بدون أي معدات',
  },
  en: {
    settings: 'Settings',
    language: 'Language',
    gender: 'Character',
    male: 'Male',
    female: 'Female',
    save: 'Save',
    home: 'Home',
    fitness: 'Fitness',
    study: 'Study',
    ai: 'AI Helper',
    logout: 'Logout',
    welcome: 'Welcome',
    ready: 'Ready to achieve your goals today?',
    calories: 'Calories',
    water: 'Water',
    ai_tip_title: 'Daily AI Tip',
    ai_tip_desc: '"Study for 45 minutes after a light cardio workout (15 mins) to improve focus and blood circulation."',
    quick_actions: 'Quick Actions',
    start_workout: 'Start Workout',
    study_schedule: 'Study Schedule',
    solve_homework: 'Solve Homework',
    add_lesson: 'Add Lesson',
    fitness_title: 'Fitness & Health',
    weight: 'Weight',
    height: 'Height',
    age: 'Age',
    body_type: 'Body Type',
    suggested_workouts: 'Suggested Workouts',
    start: 'Start',
    reps: 'Reps',
    timer: 'Timer',
    finish: 'Finish Workout',
    congrats: 'Congrats! Workout Finished 🎉',
    rest_time: 'Rest Time',
    prepare: 'Prepare for next exercise:',
    exercise: 'Exercise',
    of: 'of',
    back: 'Back',
    loading: 'Loading...',
    pushups: 'Pushups',
    squats: 'Squats',
    plank: 'Plank (Floor Hold)',
    burpees: 'Burpees',
    lunges: 'Lunges',
    mountain_climbers: 'Mountain Climbers',
    jumping_jacks: 'Jumping Jacks',
    superman: 'Superman (Back)',
    bicycle_crunches: 'Bicycle Crunches',
    leg_raises: 'Leg Raises',
    install_app: 'Install App',
    install_desc: 'Get the full experience on your device!',
    install_btn: 'Install Now',
    theme: 'Theme',
    light_mode: 'Light',
    dark_mode: 'Dark',
    pomodoro: 'Pomodoro Timer',
    start_timer: 'Start Focus',
    pause_timer: 'Pause',
    reset_timer: 'Reset',
    take_break: 'Break Time ☕',
    level: 'Level',
    points: 'Points',
    add_water: 'Add Water',
    add_calories: 'Add Meal',
    ai_flashcards: 'AI Flashcards',
    create_cards: 'Create Cards',
    chat_room: 'Chat Room',
    join_chat: 'Join Chat',
    high_knees: 'High Knees',
    squat_jumps: 'Squat Jumps',
    pushups_wide: 'Wide Pushups',
    diamond_pushups: 'Diamond Pushups',
    decline_pushups: 'Pushups',
    cat_cow_stretch: 'Cat-Cow Stretch',
    childs_pose: 'Child\'s Pose (Rest)',
    glute_bridge: 'Glute Bridge',
    cobra_stretch: 'Cobra Stretch',
    arm_circles: 'Arm Circles',
    hip_circles: 'Hip Circles',
    calf_raises: 'Calf Raises',
    fat_loss: 'Fat Loss (Home / No Equipment)',
    strength: 'Strength (Bodyweight Only)',
    therapeutic: 'Therapeutic (Mat/Home)',
    workout_plans: 'Home Workout Plans',
    select_plan: 'Choose your home activity:',
    no_equipment: 'No Equipment Required',
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => (localStorage.getItem('lang') as Language) || 'ar');
  const [gender, setGenderState] = useState<Gender>(() => (localStorage.getItem('gender') as Gender) || 'male');
  const [theme, setThemeState] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('gender', gender);
  }, [gender]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const setLanguage = (lang: Language) => setLanguageState(lang);
  const setGender = (g: Gender) => setGenderState(g);
  const setTheme = (t: Theme) => setThemeState(t);

  const t = (key: string) => translations[language][key] || key;

  return (
    <SettingsContext.Provider value={{ language, gender, theme, setLanguage, setGender, setTheme, t }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};
