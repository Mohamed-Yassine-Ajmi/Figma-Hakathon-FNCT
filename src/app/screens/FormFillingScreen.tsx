import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Camera, Scan, Save } from "lucide-react";

interface FormField {
  id: string;
  label: string;
  type: "text" | "number" | "date" | "select";
  value: string;
  preFilled: boolean;
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export function FormFillingScreen() {
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [language, setLanguage] = useState<"AR" | "FR">("AR");
  const [isScanning, setIsScanning] = useState(false);

  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: "fullName",
      label: "الاسم الكامل",
      type: "text",
      value: "",
      preFilled: true,
      required: true,
    },
    {
      id: "idNumber",
      label: "رقم البطاقة الوطنية",
      type: "text",
      value: "",
      preFilled: true,
      required: true,
    },
    {
      id: "birthDate",
      label: "تاريخ الميلاد",
      type: "date",
      value: "",
      preFilled: true,
      required: true,
    },
    {
      id: "address",
      label: "العنوان الكامل",
      type: "text",
      value: "",
      preFilled: false,
      required: true,
      placeholder: "أدخل عنوانك الكامل",
    },
    {
      id: "phone",
      label: "رقم الهاتف",
      type: "text",
      value: "",
      preFilled: false,
      required: true,
      placeholder: "0612345678",
    },
    {
      id: "propertyArea",
      label: "مساحة الأرض (متر مربع)",
      type: "number",
      value: "",
      preFilled: false,
      required: true,
      placeholder: "0",
    },
    {
      id: "propertyType",
      label: "نوع البناء",
      type: "select",
      value: "",
      preFilled: false,
      required: true,
      options: ["سكني", "تجاري", "صناعي", "زراعي"],
    },
    {
      id: "email",
      label: "البريد الإلكتروني",
      type: "text",
      value: "",
      preFilled: false,
      required: false,
      placeholder: "example@email.com",
    },
  ]);

  const handleFieldChange = (id: string, value: string) => {
    setFormFields((prev) =>
      prev.map((field) =>
        field.id === id ? { ...field, value } : field,
      ),
    );
  };

  const handleScanDocument = () => {
    setIsScanning(true);

    // Simulate OCR scanning
    setTimeout(() => {
      setFormFields((prev) =>
        prev.map((field) => {
          if (field.id === "address") {
            return {
              ...field,
              value: "حي النور، شارع الجمهورية 45، الرباط",
              preFilled: true,
            };
          }
          if (field.id === "phone") {
            return {
              ...field,
              value: "0612345678",
              preFilled: true,
            };
          }
          if (field.id === "propertyArea") {
            return { ...field, value: "350", preFilled: true };
          }
          return field;
        }),
      );
      setIsScanning(false);
    }, 2000);
  };

  const handleSubmit = () => {
    // Update request status
    const requests = JSON.parse(
      localStorage.getItem("requests") || "[]",
    );
    const updatedRequests = requests.map((req: any) =>
      req.id === requestId
        ? { ...req, status: "submitted" }
        : req,
    );
    localStorage.setItem(
      "requests",
      JSON.stringify(updatedRequests),
    );

    // Navigate to status tracking
    navigate(`/status/${requestId}`);
  };

  const isFormValid = formFields.every(
    (field) => !field.required || field.value.trim(),
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50 max-w-md mx-auto">
      {/* Header */}
      <div
        className="bg-teal-600 text-white px-4 py-4 shadow-md"
        dir="rtl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/requests")}
              className="hover:bg-teal-700 p-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </button>
            <div>
              <h1 className="font-semibold text-lg arabic">
                تعبئة المطلب
              </h1>
              <p className="text-sm text-teal-100 arabic">
                تصريح البناء
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setLanguage("AR")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                language === "AR"
                  ? "bg-white text-teal-600"
                  : "bg-teal-700 text-white"
              }`}
            >
              AR
            </button>
            <button
              onClick={() => setLanguage("FR")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                language === "FR"
                  ? "bg-white text-teal-600"
                  : "bg-teal-700 text-white"
              }`}
            >
              FR
            </button>
          </div>
        </div>
      </div>

      {/* AI Helper Banner */}

      {/* Form Fields */}
      <div className="flex-1 overflow-y-auto p-4" dir="rtl">
        <div className="space-y-4">
          {formFields.map((field) => (
            <div
              key={field.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700 arabic">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 mr-1">*</span>
                  )}
                </label>
                {field.preFilled && (
                  <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                    تم الملء تلقائياً
                  </span>
                )}
              </div>

              {field.type === "select" ? (
                <select
                  value={field.value}
                  onChange={(e) =>
                    handleFieldChange(field.id, e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white arabic"
                >
                  <option value="">اختر...</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) =>
                    handleFieldChange(field.id, e.target.value)
                  }
                  placeholder={field.placeholder}
                  className={`w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    field.preFilled ? "bg-teal-50" : "bg-white"
                  } ${field.type === "number" ? "" : "arabic"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Document Upload Section */}
        <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3 arabic">
            المستندات المطلوبة
          </h3>
          <div className="space-y-2">
            {[
              "بطاقة الهوية",
              "وثيقة الملكية",
              "المخطط المعماري",
            ].map((doc, idx) => (
              <button
                key={idx}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-sm text-gray-700 arabic">
                  {doc}
                </span>
                <Camera className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div
        className="border-t border-gray-200 bg-white p-4"
        dir="rtl"
      >
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-500 text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed arabic flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          إرسال المطلب للمراجعة
        </button>
      </div>
    </div>
  );
}