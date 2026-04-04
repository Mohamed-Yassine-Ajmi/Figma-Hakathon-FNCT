import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ArrowRight, Mic, Paperclip, Send, Menu } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
  showAction?: boolean;
  actionButton?: {
    text: string;
    onClick: () => void;
  };
}

const SERVICE_INFO: { [key: string]: { name: string, requirements: string[] } } = {
  'building-permit': {
    name: 'تصريح البناء',
    requirements: [
      'نسخة من بطاقة الهوية الوطنية',
      'وثيقة ملكية الأرض',
      'مخطط معماري معتمد',
      'شهادة عدم ممانعة من الجيران'
    ]
  },
  'business-license': {
    name: 'رخصة تجارية',
    requirements: [
      'بطاقة التعريف الوطنية',
      'السجل التجاري',
      'شهادة إقامة',
      'صور شمسية حديثة (4)'
    ]
  }
};

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function ChatScreen() {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [language, setLanguage] = useState<'AR' | 'FR'>('AR');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting
    const initialMessages: Message[] = [
      {
        id: 1,
        text: 'عسلامة! أنا المساعد البلدي الذكي.باش نعاونك في إنجاز معاملاتك البلدية.',
        isUser: false,
        timestamp: formatTime(new Date()),
      },
    ];

    // If service is selected, show requirements
    if (serviceId && SERVICE_INFO[serviceId]) {
      const service = SERVICE_INFO[serviceId];
      setTimeout(() => {
        setIsTyping(true);
      }, 500);

      setTimeout(() => {
        const requirementsText = `بش تتحصل على ${service.name}، لازم المستندات التالية:\n\n${service.requirements.map((req, i) => `${i + 1}. ${req}`).join('\n')}`;
        
        setMessages([
          ...initialMessages,
          {
            id: 2,
            text: requirementsText,
            isUser: false,
            timestamp: formatTime(new Date()),
          }
        ]);
        setIsTyping(false);

        // Show action prompt
        setTimeout(() => {
          setMessages(prev => [
            ...prev,
            {
              id: 3,
              text: 'تحب تبدا في إنشاء هذا المطلب الآن؟',
              isUser: false,
              timestamp: formatTime(new Date()),
              showAction: true,
              actionButton: {
                text: 'إبدأ المطلب الآن',
                onClick: handleCreateRequest
              }
            }
          ]);
        }, 1000);
      }, 2000);
    } else {
      setMessages(initialMessages);
    }
  }, [serviceId]);

  const handleCreateRequest = () => {
    const service = serviceId && SERVICE_INFO[serviceId];
    if (!service) return;

    // Create a new request
    const requestId = `REQ-${Date.now()}`;
    const requests = JSON.parse(localStorage.getItem('requests') || '[]');
    requests.push({
      id: requestId,
      serviceName: service.name,
      status: 'draft',
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem('requests', JSON.stringify(requests));

    // Navigate to requests dashboard
    navigate('/requests');
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text,
      isUser: true,
      timestamp: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: 'عيشك لسؤالك. كيفاش نجم نعاونك خير؟',
        isUser: false,
        timestamp: formatTime(new Date()),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col bg-white max-w-md mx-auto">
      {/* Header */}
      <div className="bg-teal-600 text-white px-4 py-4 shadow-md" dir="rtl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/services')}
              className="hover:bg-teal-700 p-2 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-semibold text-lg arabic">المساعد البلدي الذكي</h1>
              <div className="flex items-center gap-1.5 text-xs text-teal-100">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="arabic">متصل</span>
              </div>
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50" dir="rtl">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-4">
            <div className={`flex ${msg.isUser ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%]`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    msg.isUser
                      ? 'bg-white text-gray-900 border border-gray-200 rounded-tr-sm'
                      : 'bg-teal-600 text-white rounded-tl-sm shadow-sm'
                  }`}
                >
                  <p className="leading-relaxed arabic whitespace-pre-line">{msg.text}</p>
                </div>
                <span className="text-xs text-gray-400 mt-1 px-2 block text-right">
                  {msg.timestamp}
                </span>
                
                {msg.showAction && msg.actionButton && (
                  <button
                    onClick={msg.actionButton.onClick}
                    className="mt-3 w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all active:scale-95 arabic"
                  >
                    {msg.actionButton.text}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-end mb-4">
            <div className="bg-teal-600 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                ></div>
                <div
                  className="w-2 h-2 bg-white rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4" dir="rtl">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim()}
            className="p-2.5 bg-teal-600 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
          <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="p-2.5 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <Mic className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage(inputText);
            }}
            placeholder="اكتب سؤالك هنا..."
            className="flex-1 px-4 py-3 rounded-full bg-gray-100 border-none focus:outline-none focus:ring-2 focus:ring-teal-500 arabic"
          />
        </div>
      </div>
    </div>
  );
}