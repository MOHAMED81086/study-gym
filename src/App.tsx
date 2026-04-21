import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Layout from './components/Layout';
import Home from './pages/Home';
import Fitness from './pages/Fitness';
import Study from './pages/Study';
import Login from './pages/Login';
import WorkoutPlayer from './pages/WorkoutPlayer';
import Settings from './pages/Settings';
import ChatRoom from './pages/ChatRoom';
import { SettingsProvider } from './context/SettingsContext';

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <SettingsProvider>
      <BrowserRouter>
        <div className="font-sans text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-900 min-h-screen">
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            
            <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
              <Route index element={<Home user={user} />} />
              <Route path="fitness" element={<Fitness user={user} />} />
              <Route path="study" element={<Study user={user} />} />
              <Route path="chat" element={<ChatRoom user={user} />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="/workout" element={user ? <WorkoutPlayer /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SettingsProvider>
  );
}
