import { useState } from 'react';
import { loginWithEmail, registerWithEmail } from '../firebase';
import { Activity, BookOpen, Bot } from 'lucide-react';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Treat username as email for Firebase Auth compatibility
    const authEmail = username.includes('@') ? username : `${username.replace(/[^a-zA-Z0-9_.]/g, '')}@fitness-study.app`;

    try {
      if (isRegister) {
        await registerWithEmail(authEmail, password);
      } else {
        await loginWithEmail(authEmail, password);
      }
    } catch (err: any) {
      console.error("Auth Error:", err);
      let errorMsg = 'حدث خطأ أثناء الاتصال: ' + err.message;
      if (err.code === 'auth/invalid-email') errorMsg = 'اسم المستخدم غير صالح (يجب أن يحتوي على حروف وأرقام فقط)';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') errorMsg = 'اسم المستخدم أو كلمة المرور غير صحيحة';
      if (err.code === 'auth/wrong-password') errorMsg = 'كلمة المرور غير صحيحة';
      if (err.code === 'auth/email-already-in-use') errorMsg = 'اسم المستخدم مسجل بالفعل';
      if (err.code === 'auth/weak-password') errorMsg = 'كلمة المرور ضعيفة جداً (6 أحرف على الأقل)';
      if (err.code === 'auth/operation-not-allowed') errorMsg = 'تسجيل الدخول بكلمة المرور غير مفعّل في إعدادات Firebase الخاصة بك.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-6" dir="rtl">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center">
        <div className="flex justify-center gap-4 mb-6 text-blue-600 dark:text-blue-400">
          <Activity size={32} />
          <BookOpen size={32} />
          <Bot size={32} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">رشاقة AI مذاكرة</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          نظم وقتك، حافظ على لياقتك، وتفوق في دراستك بمساعدة الذكاء الاصطناعي
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white px-4 py-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 mt-4 shadow-lg shadow-blue-200 dark:shadow-none"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              isRegister ? 'إنشاء حساب جديد' : 'تسجيل الدخول'
            )}
          </button>
        </form>

        <button
          onClick={() => {
            setIsRegister(!isRegister);
            setError('');
          }}
          className="mt-6 text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          {isRegister ? 'لديك حساب بالفعل؟ سجل دخولك' : 'ليس لديك حساب؟ أنشئ حساباً جديداً'}
        </button>
      </div>
    </div>
  );
}
