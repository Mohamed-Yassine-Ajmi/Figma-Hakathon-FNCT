import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowLeft, CheckCircle2, Clock, Eye, FileCheck, AlertCircle, Download, MessageSquare } from 'lucide-react';

const TIMELINE_STEPS = [
  {
    id: 'submitted',
    labelAr: 'تم التقديم',
    labelFr: 'Soumis',
    icon: FileCheck,
    description: 'تم استلام طلبكم بنجاح',
    date: '2026-04-01 09:30',
  },
  {
    id: 'ai-validation',
    labelAr: 'التثبت الأولي (AI)',
    labelFr: 'Vérification IA',
    icon: Eye,
    description: 'جاري التحقق من المستندات والبيانات',
    date: '2026-04-01 10:15',
  },
  {
    id: 'officer-review',
    labelAr: 'مراجعة الموظف',
    labelFr: 'Révision agent',
    icon: Clock,
    description: 'سيتم مراجعة الطلب من قبل الموظف المختص',
    date: '',
  },
  {
    id: 'approval',
    labelAr: 'الموافقة النهائية',
    labelFr: 'Approbation finale',
    icon: CheckCircle2,
    description: 'في انتظار الموافقة النهائية',
    date: '',
  },
  {
    id: 'ready',
    labelAr: 'جاهز للاستلام',
    labelFr: 'Prêt',
    icon: CheckCircle2,
    description: 'يمكنك استلام الوثيقة',
    date: '',
  },
];

export function StatusTrackingScreen() {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [language, setLanguage] = useState<'AR' | 'FR'>('AR');
  
  // Current status - can be dynamic based on request
  const currentStepIndex = 1; // AI Validation in progress

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-teal-600 text-white px-4 py-4 shadow-md" dir="rtl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/requests')}
              className="hover:bg-teal-700 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <h1 className="font-semibold text-lg arabic">تتبع المطلب</h1>
              <p className="text-sm text-teal-100 font-mono">{requestId}</p>
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

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-purple-50 to-teal-50 border-b border-purple-100 px-4 py-4" dir="rtl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 arabic">قيد التثبت الأولي (AI)</h3>
            <p className="text-sm text-gray-600">جاري التحقق من المستندات والبيانات</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4" dir="rtl">
        {/* Request Info Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
          <h3 className="font-medium text-gray-900 mb-3 arabic">معلومات المطلب</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 arabic">نوع الخدمة</span>
              <span className="text-sm text-gray-900 font-medium arabic">تصريح البناء</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 arabic">تاريخ التقديم</span>
              <span className="text-sm text-gray-900 font-medium">2026-04-01</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 arabic">الوقت المتوقع</span>
              <span className="text-sm text-gray-900 font-medium arabic">3-5 أيام عمل</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h3 className="font-medium text-gray-900 mb-4 arabic">مراحل المعالجة</h3>
          
          <div className="relative">
            {TIMELINE_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isPending = index > currentStepIndex;

              return (
                <div key={step.id} className="flex gap-4 pb-8 last:pb-0 relative">
                  {/* Connector Line */}
                  {index < TIMELINE_STEPS.length - 1 && (
                    <div
                      className={`absolute right-[19px] top-10 w-0.5 h-full ${
                        isCompleted ? 'bg-teal-600' : isCurrent ? 'bg-gradient-to-b from-teal-600 to-gray-200' : 'bg-gray-200'
                      }`}
                    ></div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 flex-shrink-0 ${
                      isCompleted
                        ? 'bg-teal-600'
                        : isCurrent
                        ? 'bg-purple-600 ring-4 ring-purple-100 animate-pulse'
                        : 'bg-gray-200'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isCompleted || isCurrent ? 'text-white' : 'text-gray-400'
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4
                        className={`font-medium arabic ${
                          isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {language === 'AR' ? step.labelAr : step.labelFr}
                      </h4>
                      {isCurrent && (
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full arabic">
                          جاري الآن
                        </span>
                      )}
                      {isCompleted && (
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      )}
                    </div>
                    <p
                      className={`text-sm ${
                        isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'
                      } arabic`}
                    >
                      {step.description}
                    </p>
                    {step.date && (
                      <p className="text-xs text-gray-400 mt-1">{step.date}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="mt-4 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-5 border border-blue-100">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1 arabic">نتائج التحقق الذكي</h3>
              <p className="text-sm text-gray-600 arabic">
                تم التحقق من 95% من المستندات بنجاح
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-gray-700 arabic">بطاقة الهوية: صالحة</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-gray-700 arabic">وثيقة الملكية: صالحة</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-amber-600" />
              <span className="text-gray-700 arabic">المخطط المعماري: قيد المراجعة</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 space-y-3">
          <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-xl font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors arabic">
            <Download className="w-5 h-5" />
            تحميل نسخة من المطلب
          </button>
          <button
            onClick={() => navigate('/chat')}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-xl font-medium hover:bg-teal-700 transition-colors arabic"
          >
            <MessageSquare className="w-5 h-5" />
            استفسار عن الحالة
          </button>
        </div>
      </div>
    </div>
  );
}