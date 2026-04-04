import { useNavigate } from 'react-router';
import { Building2, MessageSquare, FileCheck, Clock } from 'lucide-react';

export function OnboardingScreen() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-teal-50 to-white max-w-md mx-auto">
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Logo */}
        <div className="bg-teal-600 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
          <Building2 className="w-10 h-10 text-white" strokeWidth={2} />
        </div>
        
        <h1 className="text-3xl text-gray-900 mb-2 text-center">Municipal Assistant</h1>
        <p className="text-gray-500 text-center mb-8 px-4 arabic">
          مساعدك الذكي للخدمات البلدية
        </p>

        {/* Illustration */}
        <div className="w-full max-w-xs mb-8">
          <div className="w-full h-48 bg-gradient-to-br from-teal-100 to-blue-100 rounded-2xl shadow-md flex items-center justify-center">
            <Building2 className="w-24 h-24 text-teal-600 opacity-20" />
          </div>
        </div>

        {/* Features */}
        <div className="w-full space-y-4 mb-8">
          <div className="flex items-center gap-3 px-4">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-gray-700">AI-powered instant responses</p>
          </div>
          
          <div className="flex items-center gap-3 px-4">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <FileCheck className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-gray-700">Document processing & validation</p>
          </div>
          
          <div className="flex items-center gap-3 px-4">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-teal-600" />
            </div>
            <p className="text-gray-700">Track your applications 24/7</p>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="p-6 pt-0">
        <button
          onClick={() => navigate('/services')}
          className="w-full bg-teal-600 text-white py-4 rounded-xl hover:bg-teal-700 transition-colors shadow-lg"
        >
          Start Chatting
        </button>
        <p className="text-center text-sm text-gray-500 mt-4">
          Powered by AI • Secure & Confidential
        </p>
      </div>
    </div>
  );
}
