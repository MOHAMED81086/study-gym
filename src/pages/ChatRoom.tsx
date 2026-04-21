import { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { Send, MessageSquare, Users } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function ChatRoom({ user }: { user: any }) {
  const { t } = useSettings();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'chat_messages'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(data.reverse());
      scrollToBottom();
    });

    return () => unsubscribe();
  }, []);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    const msgText = newMessage.trim();
    setNewMessage('');

    try {
      await addDoc(collection(db, 'chat_messages'), {
        text: msgText,
        uid: user.uid,
        userName: user.email?.split('@')[0] || 'User',
        createdAt: serverTimestamp()
      });
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)] max-w-4xl mx-auto pb-24 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between shadow-sm z-10 rounded-b-3xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 rounded-2xl flex items-center justify-center shadow-sm">
            <Users size={28} />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">{t('chat_room')}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-wider">نقاش وتبادل خبرات</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg) => {
          const isMine = msg.uid === user?.uid;
          return (
            <div key={msg.id} className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl max-w-[85%] shadow-sm ${
                isMine 
                  ? 'bg-blue-600 text-white rounded-tl-none' 
                  : 'bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-tr-none'
              }`}>
                {!isMine && <div className="text-xs font-bold text-gray-400 mb-1">{msg.userName}</div>}
                <div className="text-sm font-medium leading-relaxed">{msg.text}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 md:p-6 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 rounded-t-3xl shadow-[0_-4px_20px_rgb(0,0,0,0.05)] dark:shadow-none">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-900 p-2 md:p-3 rounded-[2rem] border-2 border-transparent focus-within:border-blue-500 transition-all shadow-inner">
          <button type="button" className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-2xl transition-all">
            <MessageSquare size={22} />
          </button>
          <input 
            type="text" 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="اكتب رسالتك للطلاب هنا..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-base font-bold px-2 placeholder:text-gray-400 dark:text-white"
          />
          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="p-4 bg-blue-600 text-white rounded-2xl disabled:opacity-50 shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 hover:scale-105 transition-all active:scale-95"
          >
            <Send size={20} className="rtl:-scale-x-100" />
          </button>
        </form>
      </div>
    </div>
  );
}
