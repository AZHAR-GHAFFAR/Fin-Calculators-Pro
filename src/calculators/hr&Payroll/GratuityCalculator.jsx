import React, { useState } from 'react';
import { Gift } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const GratuityCalculator = ({ language, addToHistory, calculatorName }) => {
  const [lastDrawnSalary, setLastDrawnSalary] = useState(80000);
  const [yearsOfService, setYearsOfService] = useState(10);
  const [months, setMonths] = useState(0);

  const totalYears = yearsOfService + months / 12;
  const gratuityAmount = (lastDrawnSalary * totalYears * 30) / 30; // Formula: Last salary × years

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="purple"
        formula="Gratuity = Last Drawn Salary × Years of Service"
        variables={[
          { symbol: 'Last Salary', nameEn: 'Basic + allowances at retirement', nameUrdu: 'ریٹائرمنٹ پر بنیادی + الاؤنسز' },
          { symbol: 'Years', nameEn: 'Completed years (5+ required)', nameUrdu: 'مکمل سال (5+ ضروری)' }
        ]}
        example={[
          { labelEn: 'Last Salary', labelUrdu: 'آخری تنخواہ', value: 'Rs. 80,000' },
          { labelEn: 'Service', labelUrdu: 'خدمت', value: '10 years' },
          { labelEn: 'Gratuity', labelUrdu: 'گریچویٹی', value: 'Rs. 8,00,000' }
        ]}
        terms={[
          {
            titleEn: 'Gratuity Eligibility',
            titleUrdu: 'گریچویٹی کی اہلیت',
            descEn: 'Minimum 5 years continuous service. Paid on retirement/death/disability. One-time payment.',
            descUrdu: 'کم از کم 5 سال مسلسل خدمت۔ ریٹائرمنٹ/موت/معذوری پر ادا۔ ایک بار کی ادائیگی۔'
          },
          {
            titleEn: 'Calculation Method',
            titleUrdu: 'حساب کا طریقہ',
            descEn: 'Last drawn salary × years of service. Some use 15 days per year instead of 30.',
            descUrdu: 'آخری تنخواہ × خدمت کے سال۔ کچھ 30 کی بجائے 15 دن فی سال استعمال کرتے ہیں۔'
          },
          {
            titleEn: 'Tax Treatment',
            titleUrdu: 'ٹیکس کا سلوک',
            descEn: 'Tax-free up to Rs. 10 lakh in Pakistan. Excess taxable. Check latest FBR rules.',
            descUrdu: 'پاکستان میں Rs. 10 لاکھ تک ٹیکس فری۔ اضافی قابل ٹیکس۔ تازہ ترین FBR قوانین چیک کریں۔'
          }
        ]}
        note={{
          en: 'Gratuity Act 1972 applies to companies with 10+ employees. Formula varies - check company policy. Some companies use 15-day formula instead of 30-day.',
          urdu: 'گریچویٹی ایکٹ 1972 10+ ملازمین والی کمپنیوں پر لاگو ہوتا ہے۔ فارمولا مختلف ہوتا ہے - کمپنی کی پالیسی چیک کریں۔ کچھ کمپنیاں 30 دن کی بجائے 15 دن کا فارمولا استعمال کرتی ہیں۔'
        }}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-600" />
            {language === 'en' ? 'Service Details' : 'خدمت کی تفصیلات'}
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Last Drawn Salary (Rs.)' : 'آخری تنخواہ (Rs.)'}</label>
              <input type="number" value={lastDrawnSalary} onChange={(e) => setLastDrawnSalary(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Years of Service' : 'خدمت کے سال'}</label>
              <input type="range" min="5" max="40" value={yearsOfService} onChange={(e) => setYearsOfService(parseFloat(e.target.value))}
                className="w-full h-2 bg-purple-100 dark:bg-purple-900 rounded-lg" />
              <input type="number" value={yearsOfService} onChange={(e) => setYearsOfService(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Additional Months' : 'اضافی مہینے'}</label>
              <input type="number" min="0" max="11" value={months} onChange={(e) => setMonths(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <button onClick={() => {
              addToHistory({ calculatorName, result: `${totalYears.toFixed(1)} years: ${formatCurrency(gratuityAmount)}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Gratuity' : 'گریچویٹی کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Gratuity Amount' : 'گریچویٹی رقم'}</div>
            <div className="text-4xl font-bold">{formatCurrency(gratuityAmount)}</div>
            <div className="text-xs opacity-75 mt-1">{totalYears.toFixed(1)} {language === 'en' ? 'years' : 'سال'}</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Calculation' : 'حساب'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Last Salary' : 'آخری تنخواہ'}</span>
                <span className="font-bold">{formatCurrency(lastDrawnSalary)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Years' : 'سال'}</span>
                <span className="font-bold">{totalYears.toFixed(1)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Per Year' : 'فی سال'}</span>
                <span className="font-bold">{formatCurrency(lastDrawnSalary)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Gratuity' : 'گریچویٹی'}</span>
                <span className="font-bold text-xl text-purple-600">{formatCurrency(gratuityAmount)}</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
            <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3">
              {language === 'en' ? '🎁 Gratuity Facts' : '🎁 گریچویٹی کے حقائق'}
            </h4>
            <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-2">
              <li>• {language === 'en' ? 'Minimum 5 years service required' : 'کم از کم 5 سال خدمت ضروری'}</li>
              <li>• {language === 'en' ? 'Tax-free up to Rs. 10 lakh' : 'Rs. 10 لاکھ تک ٹیکس فری'}</li>
              <li>• {language === 'en' ? 'One-time lump sum payment' : 'ایک بار کی یکمشت ادائیگی'}</li>
              <li>• {language === 'en' ? 'Paid on retirement/resignation' : 'ریٹائرمنٹ/استعفیٰ پر ادا'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GratuityCalculator;