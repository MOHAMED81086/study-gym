import { Outlet, NavLink, Link } from 'react-router-dom';
import { Home, Activity, BookOpen, Bot, LogOut, Settings as SettingsIcon, MessageSquare } from 'lucide-react';
import { logout } from '../firebase';
import { useSettings } from '../context/SettingsContext';

export default function Layout() {
  const { t } = useSettings();
  
  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/fitness', icon: Activity, label: t('fitness') },
    { path: '/study', icon: BookOpen, label: t('study') },
    { path: '/chat', icon: MessageSquare, label: t('chat_room') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header / Top Navigation for Desktop */}
      <header className="sticky top-0 w-full bg-white dark:bg-gray-800 shadow-sm z-30 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-blue-600 rounded-xl text-white group-hover:rotate-12 transition-transform">
                <Activity size={24} />
              </div>
              <h1 className="text-xl font-black text-gray-900 dark:text-white hidden sm:block tracking-tight">
                رشاقة <span className="text-blue-600">AI</span> مذاكرة
              </h1>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      isActive 
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
                        : 'text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link 
              to="/settings" 
              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-xl transition-all"
              title={t('settings')}
            >
              <SettingsIcon size={22} />
            </Link>
            <button 
              onClick={logout} 
              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 rounded-xl transition-all"
              title={t('logout')}
            >
              <LogOut size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-screen-xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
        <div className="bg-white dark:bg-gray-800 md:rounded-3xl md:shadow-xl md:border border-gray-100 dark:border-gray-700 min-h-[calc(100vh-12rem)] overflow-hidden">
          <Outlet />
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 flex justify-around items-center p-3 pb-safe z-40">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-5' 
                  : 'text-gray-500 dark:text-gray-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] mt-1 font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
