import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, ArrowLeft, FileText, Clock } from 'lucide-react';
import { BottomNav } from '../components/BottomNav';

interface Request {
  id: string;
  serviceName: string;
  status: 'draft' | 'new' | 'submitted' | 'in-progress' | 'completed';
  createdAt: string;
}

const STATUS_LABELS = {
  draft: { ar: 'مسودة', fr: 'Brouillon', color: 'bg-gray-100 text-gray-700' },
  new: { ar: 'جديد', fr: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
  submitted: { ar: 'قيد المراجعة', fr: 'En cours', color: 'bg-amber-100 text-amber-700' },
  'in-progress': { ar: 'قيد التنفيذ', fr: 'En traitement', color: 'bg-purple-100 text-purple-700' },
  completed: { ar: 'مكتمل', fr: 'Terminé', color: 'bg-green-100 text-green-700' },
};

export function RequestsDashboard() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);
  const [language, setLanguage] = useState<'AR' | 'FR'>('AR');

  useEffect(() => {
    const stored = localStorage.getItem('requests');
    if (stored) {
      setRequests(JSON.parse(stored));
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-teal-600 text-white px-4 py-4 shadow-md" dir="rtl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/services')}
              className="hover:bg-teal-700 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <h1 className="font-semibold text-lg arabic">مطالبي الإدارية</h1>
              <p className="text-sm text-teal-100">
                {requests.length} {language === 'AR' ? 'مطلب' : 'demandes'}
              </p>
            </div>
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

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 pb-20" dir="rtl">
        {requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2 arabic">
              لا توجد مطالب بعد
            </h3>
            <p className="text-gray-500 mb-6 arabic">
              ابدأ محادثة مع المساعد الذكي لإنشاء مطلبك الأول
            </p>
            <button
              onClick={() => navigate('/services')}
              className="bg-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors arabic"
            >
              تصفح الخدمات
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => {
              const statusConfig = STATUS_LABELS[request.status];
              return (
                <div
                  key={request.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1 arabic">
                          مطلب {request.serviceName}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatDate(request.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${statusConfig.color} arabic`}
                    >
                      {language === 'AR' ? statusConfig.ar : statusConfig.fr}
                    </span>
                  </div>

                  {/* Request ID */}
                  <div className="mb-4 px-3 py-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-0.5">رقم المطلب</p>
                    <p className="text-sm font-mono text-gray-700">{request.id}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {(request.status === 'draft' || request.status === 'new') && (
                      <button
                        onClick={() => navigate(`/form/${request.id}`)}
                        className="flex-1 bg-teal-600 text-white py-2.5 rounded-xl font-medium hover:bg-teal-700 transition-colors arabic"
                      >
                        إكمال الآن
                      </button>
                    )}
                    {request.status !== 'draft' && request.status !== 'new' && (
                      <button
                        onClick={() => navigate(`/status/${request.id}`)}
                        className="flex-1 bg-teal-600 text-white py-2.5 rounded-xl font-medium hover:bg-teal-700 transition-colors arabic"
                      >
                        تتبع الحالة
                      </button>
                    )}
                    <button
                      onClick={() => navigate(`/status/${request.id}`)}
                      className="px-4 py-2.5 border-2 border-gray-200 text-gray-700 rounded-xl font-medium hover:border-gray-300 transition-colors arabic"
                    >
                      التفاصيل
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => navigate('/services')}
        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-teal-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl hover:bg-teal-700 transition-all active:scale-95 flex items-center justify-center z-10"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}