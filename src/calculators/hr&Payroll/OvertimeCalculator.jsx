import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const OvertimeCalculator = ({ language, addToHistory, calculatorName }) => {
  const [hourlyRate, setHourlyRate] = useState(500);
  const [regularHours, setRegularHours] = useState(8);
  const [overtimeHours, setOvertimeHours] = useState(2);
  const [days, setDays] = useState(1);
  const [overtimeRate, setOvertimeRate] = useState(1.5); // 1.5x or 2x

  // Calculations
  const regularPay = hourlyRate * regularHours * days;
  const overtimePay = hourlyRate * overtimeRate * overtimeHours * days;
  const totalPay = regularPay + overtimePay;
  const totalHours = (regularHours + overtimeHours) * days;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="blue"
        formula="Overtime Pay = Hourly Rate × Overtime Multiplier × OT Hours"
        variables={[
          { symbol: 'OT Multiplier', nameEn: '1.5x weekdays, 2x holidays (Pakistan)', nameUrdu: '1.5x ہفتے، 2x چھٹیاں (پاکستان)' },
          { symbol: 'Regular Hours', nameEn: '8 hours/day standard in Pakistan', nameUrdu: 'پاکستان میں 8 گھنٹے/دن معیاری' },
          { symbol: 'Hourly Rate', nameEn: 'Monthly salary ÷ 208 hours', nameUrdu: 'ماہانہ تنخواہ ÷ 208 گھنٹے' }
        ]}
        example={[
          { labelEn: 'Hourly Rate', labelUrdu: 'گھنٹہ وار شرح', value: 'Rs. 500/hour' },
          { labelEn: 'Regular Hours', labelUrdu: 'باقاعدہ گھنٹے', value: '8 hours' },
          { labelEn: 'Overtime', labelUrdu: 'اوور ٹائم', value: '2 hours × 1.5 = Rs. 1,500' },
          { labelEn: 'Regular Pay', labelUrdu: 'باقاعدہ تنخواہ', value: '8 × Rs. 500 = Rs. 4,000' },
          { labelEn: 'Total Pay', labelUrdu: 'کل تنخواہ', value: 'Rs. 5,500/day' }
        ]}
        terms={[
          {
            titleEn: 'Pakistan Labor Law',
            titleUrdu: 'پاکستان لیبر قانون',
            descEn: 'Normal: 8 hrs/day, 48 hrs/week. OT: 1.5x weekdays, 2x Sundays/holidays. Max 12 hrs/day.',
            descUrdu: 'عام: 8 گھنٹے/دن، 48 گھنٹے/ہفتہ۔ OT: 1.5x ہفتے، 2x اتوار/چھٹیاں۔ زیادہ سے زیادہ 12 گھنٹے/دن۔'
          },
          {
            titleEn: 'Hourly Rate Calculation',
            titleUrdu: 'گھنٹہ وار شرح کا حساب',
            descEn: 'Monthly salary ÷ 208 hours (26 days × 8 hours). E.g., Rs. 50K ÷ 208 = Rs. 240/hour.',
            descUrdu: 'ماہانہ تنخواہ ÷ 208 گھنٹے (26 دن × 8 گھنٹے)۔ مثلاً، Rs. 50K ÷ 208 = Rs. 240/گھنٹہ۔'
          },
          {
            titleEn: 'Overtime Limits',
            titleUrdu: 'اوور ٹائم کی حدیں',
            descEn: 'Max 12 hours/day total. OT voluntary in most cases. Must be paid within month.',
            descUrdu: 'کل زیادہ سے زیادہ 12 گھنٹے/دن۔ زیادہ تر معاملات میں OT رضاکارانہ۔ ماہ کے اندر ادا کرنا ضروری۔'
          }
        ]}
        note={{
          en: 'Overtime rates per Pakistan Factories Act 1934. Some industries have different rates. White-collar exempt in many companies. Always check employment contract.',
          urdu: 'اوور ٹائم کی شرحیں پاکستان فیکٹریز ایکٹ 1934 کے مطابق۔ کچھ صنعتوں میں مختلف شرحیں۔ بہت سی کمپنیوں میں سفید پوش مستثنیٰ۔ ہمیشہ ملازمت کے معاہدے کو چیک کریں۔'
        }}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            {language === 'en' ? 'Overtime Details' : 'اوور ٹائم کی تفصیلات'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Hourly Rate (Rs.)' : 'گھنٹہ وار شرح (Rs.)'}</label>
              <input type="number" value={hourlyRate} onChange={(e) => setHourlyRate(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              <p className="text-xs text-slate-500 mt-1">
                {language === 'en' ? `Monthly: ${formatCurrency(hourlyRate * 208)}` : `ماہانہ: ${formatCurrency(hourlyRate * 208)}`}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Regular Hours/Day' : 'باقاعدہ گھنٹے/دن'}</label>
              <input type="number" min="1" max="12" value={regularHours} onChange={(e) => setRegularHours(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Overtime Hours/Day' : 'اوور ٹائم گھنٹے/دن'}</label>
              <input type="number" min="0" max="4" value={overtimeHours} onChange={(e) => setOvertimeHours(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Number of Days' : 'دنوں کی تعداد'}</label>
              <input type="number" min="1" max="31" value={days} onChange={(e) => setDays(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Overtime Rate' : 'اوور ٹائم کی شرح'}</label>
              <select value={overtimeRate} onChange={(e) => setOvertimeRate(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="1.5">{language === 'en' ? '1.5x (Weekdays)' : '1.5x (ہفتے)'}</option>
                <option value="2">{language === 'en' ? '2x (Sundays/Holidays)' : '2x (اتوار/چھٹیاں)'}</option>
              </select>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${overtimeHours} hrs OT × ${days} days = ${formatCurrency(overtimePay)}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Overtime' : 'اوور ٹائم کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Pay' : 'کل تنخواہ'}</div>
            <div className="text-4xl font-bold">{formatCurrency(totalPay)}</div>
            <div className="text-xs opacity-75 mt-1">
              {totalHours} {language === 'en' ? 'hours total' : 'کل گھنٹے'}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Payment Breakdown' : 'ادائیگی کی تفصیل'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Regular Pay' : 'باقاعدہ تنخواہ'}</span>
                <span className="font-bold text-green-600">{formatCurrency(regularPay)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Overtime Pay' : 'اوور ٹائم تنخواہ'}</span>
                <span className="font-bold text-blue-600">{formatCurrency(overtimePay)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Total Pay' : 'کل تنخواہ'}</span>
                <span className="font-bold text-xl text-blue-600">{formatCurrency(totalPay)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Hours Summary' : 'گھنٹوں کا خلاصہ'}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Regular Hours' : 'باقاعدہ گھنٹے'}</span>
                <span className="font-bold">{regularHours * days} hrs</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Overtime Hours' : 'اوور ٹائم گھنٹے'}</span>
                <span className="font-bold">{overtimeHours * days} hrs</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'OT Rate' : 'OT شرح'}</span>
                <span className="font-bold">{overtimeRate}x</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-bold">{language === 'en' ? 'Total Hours' : 'کل گھنٹے'}</span>
                <span className="font-bold text-blue-600">{totalHours} hrs</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">
              {language === 'en' ? '⏰ Overtime Guidelines' : '⏰ اوور ٹائم کی رہنمائی'}
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
              <li>• {language === 'en' ? 'Standard workday: 8 hours in Pakistan' : 'معیاری کام کا دن: پاکستان میں 8 گھنٹے'}</li>
              <li>• {language === 'en' ? 'Weekday OT: 1.5x base rate' : 'ہفتے کا OT: 1.5x بنیادی شرح'}</li>
              <li>• {language === 'en' ? 'Sunday/Holiday OT: 2x base rate' : 'اتوار/چھٹی کا OT: 2x بنیادی شرح'}</li>
              <li>• {language === 'en' ? 'Maximum: 12 hours/day including OT' : 'زیادہ سے زیادہ: 12 گھنٹے/دن بشمول OT'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvertimeCalculator;