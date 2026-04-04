import { Home, FileText, Bell, User, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', path: '/services', icon: Home, label: 'الرئيسية', labelFr: 'Accueil' },
    { id: 'requests', path: '/requests', icon: FileText, label: 'المطالب', labelFr: 'Demandes' },
    { id: 'calendar', path: '/chat', icon: Calendar, label: 'التقويم', labelFr: 'Calendrier' },
    { id: 'notifications', path: '/chat', icon: Bell, label: 'الإشعارات', labelFr: 'Notifications' },
    { id: 'profile', path: '/chat', icon: User, label: 'حسابي', labelFr: 'Profil' },
  ];

  return (
    <div className="bg-white border-t border-gray-200 px-2 py-2 shadow-lg" dir="rtl">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
                          (item.path === '/services' && location.pathname === '/');
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                isActive
                  ? 'text-teal-600 bg-teal-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium arabic">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}