import { useNavigate } from 'react-router';
import { useState } from 'react';
import {
  FileText,
  Building,
  Trash2,
  Users,
  AlertCircle,
  CreditCard,
  Home,
  FileCheck,
  MapPin,
  MessageSquare,
} from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

const SERVICES = [
  {
    id: 'building-permit',
    icon: Building,
    title: 'تصريح البناء',
    titleFr: 'Permis de construire',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 'business-license',
    icon: CreditCard,
    title: 'رخصة تجارية',
    titleFr: 'Licence commerciale',
    color: 'bg-teal-100 text-teal-600',
  },
  {
    id: 'waste-management',
    icon: Trash2,
    title: 'إدارة النفايات',
    titleFr: 'Gestion déchets',
    color: 'bg-green-100 text-green-600',
  },
  {
    id: 'civil-registry',
    icon: Users,
    title: 'السجل المدني',
    titleFr: 'Registre civil',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: 'property-tax',
    icon: Home,
    title: 'ضريبة الممتلكات',
    titleFr: 'Taxe foncière',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 'complaint',
    icon: AlertCircle,
    title: 'تقديم شكوى',
    titleFr: 'Déposer plainte',
    color: 'bg-red-100 text-red-600',
  },
  {
    id: 'certificate',
    icon: FileCheck,
    title: 'طلب شهادة',
    titleFr: 'Demande certificat',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 'land-survey',
    icon: MapPin,
    title: 'مسح الأراضي',
    titleFr: 'Levé topographique',
    color: 'bg-amber-100 text-amber-600',
  },
];

export function ServicesScreen() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'AR' | 'FR'>('AR');

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-teal-600 text-white px-4 py-4 shadow-md" dir="rtl">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-semibold text-xl arabic">الخدمات البلدية</h1>
            <p className="text-sm text-teal-100">Services Municipaux</p>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setLanguage('AR')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                language === 'AR' ? 'bg-white text-teal-600' : 'bg-teal-700 text-white'
              }`}
            >
              AR
            </button>
            <button
              onClick={() => setLanguage('FR')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                language === 'FR' ? 'bg-white text-teal-600' : 'bg-teal-700 text-white'
              }`}
            >
              FR
            </button>
          </div>
        </div>
      </div>

      {/* AI Assistant Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-b border-teal-100 px-4 py-4" dir="rtl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 arabic">المساعد الذكي</h3>
            <p className="text-sm text-gray-600">اسأل أي سؤال عن الخدمات البلدية</p>
          </div>
          <button
            onClick={() => navigate('/chat')}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors arabic"
          >
            محادثة
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="flex-1 overflow-y-auto p-4 pb-20" dir="rtl">
        <div className="grid grid-cols-2 gap-4">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => navigate(`/chat/${service.id}`)}
                className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all active:scale-95 border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1 arabic text-right">
                  {service.title}
                </h3>
                <p className="text-xs text-gray-500 text-right">
                  {service.titleFr}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}