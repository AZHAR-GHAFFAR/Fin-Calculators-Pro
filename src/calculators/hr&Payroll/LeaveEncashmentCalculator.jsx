import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const LeaveEncashmentCalculator = ({ language, addToHistory, calculatorName }) => {
  const [basicSalary, setBasicSalary] = useState(60000);
  const [accumulatedLeaves, setAccumulatedLeaves] = useState(30);
  const [encashmentRate, setEncashmentRate] = useState(100); // % of salary

  const dailyRate = basicSalary / 30;
  const encashmentAmount = (dailyRate * accumulatedLeaves * encashmentRate) / 100;
  const maxEncashable = basicSalary * 2; // Typically 2 months max

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="orange"
        formula="Encashment = (Basic Salary ÷ 30) × Leave Days × Encashment Rate%"
        variables={[
          { symbol: 'Daily Rate', nameEn: 'Monthly basic ÷ 30 days', nameUrdu: 'ماہانہ بنیادی ÷ 30 دن' },
          { symbol: 'Leave Days', nameEn: 'Accumulated unused leaves', nameUrdu: 'جمع شدہ غیر استعمال شدہ چھٹیاں' },
          { symbol: 'Rate%', nameEn: 'Usually 100% of basic', nameUrdu: 'عام طور پر بنیادی کا 100%' }
        ]}
        example={[
          { labelEn: 'Basic Salary', labelUrdu: 'بنیادی تنخواہ', value: 'Rs. 60,000' },
          { labelEn: 'Daily Rate', labelUrdu: 'روزانہ شرح', value: 'Rs. 2,000' },
          { labelEn: 'Leaves', labelUrdy: 'چھٹیاں', value: '30 days accumulated' },
          { labelEn: 'Encashment', labelUrdu: 'انکیشمنٹ', value: 'Rs. 60,000' }
        ]}
        terms={[
          {
            titleEn: 'Leave Accumulation',
            titleUrdu: 'چھٹی کا جمع ہونا',
            descEn: 'Earned leaves (2 days/month) accumulate. Max carry forward: 60-90 days typically.',
            descUrdu: 'حاصل شدہ چھٹیاں (2 دن/ماہ) جمع ہوتی ہیں۔ زیادہ سے زیادہ منتقلی: عام طور پر 60-90 دن۔'
          },
          {
            titleEn: 'Encashment Rules',
            titleUrdu: 'انکیشمنٹ کے قوانین',
            descEn: 'On resignation/retirement. Max 60 days usually. Calculated on basic salary only.',
            descUrdu: 'استعفیٰ/ریٹائرمنٹ پر۔ عام طور پر زیادہ سے زیادہ 60 دن۔ صرف بنیادی تنخواہ پر حساب۔'
          },
          {
            titleEn: 'Tax Treatment',
            titleUrdu: 'ٹیکس کا سلوک',
            descEn: 'Taxable as salary. No separate exemption. Added to final settlement.',
            descUrdu: 'تنخواہ کے طور پر قابل ٹیکس۔ کوئی الگ چھوٹ نہیں۔ حتمی تصفیہ میں شامل۔'
          }
        ]}
        note={{
          en: 'Leave encashment policy varies by company. Government: max 300 days. Private: usually 60 days. Only basic salary considered, not allowances.',
          urdu: 'چھٹی انکیشمنٹ کی پالیسی کمپنی کے لحاظ سے مختلف ہوتی ہے۔ سرکاری: زیادہ سے زیادہ 300 دن۔ نجی: عام طور پر 60 دن۔ صرف بنیادی تنخواہ، الاؤنسز نہیں۔'
        }}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            {language === 'en' ? 'Leave Details' : 'چھٹی کی تفصیلات'}
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Basic Salary (Rs.)' : 'بنیادی تنخواہ (Rs.)'}</label>
              <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Accumulated Leaves (Days)' : 'جمع چھٹیاں (دن)'}</label>
              <input type="range" min="0" max="90" value={accumulatedLeaves} onChange={(e) => setAccumulatedLeaves(parseFloat(e.target.value))}
                className="w-full h-2 bg-orange-100 dark:bg-orange-900 rounded-lg" />
              <input type="number" value={accumulatedLeaves} onChange={(e) => setAccumulatedLeaves(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Encashment Rate (%)' : 'انکیشمنٹ شرح (%)'}</label>
              <select value={encashmentRate} onChange={(e) => setEncashmentRate(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="100">{language === 'en' ? '100% (Full)' : '100% (مکمل)'}</option>
                <option value="75">{language === 'en' ? '75%' : '75%'}</option>
                <option value="50">{language === 'en' ? '50%' : '50%'}</option>
              </select>
            </div>
            <button onClick={() => {
              addToHistory({ calculatorName, result: `${accumulatedLeaves} days: ${formatCurrency(encashmentAmount)}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Encashment' : 'انکیشمنٹ کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Encashment Amount' : 'انکیشمنٹ رقم'}</div>
            <div className="text-4xl font-bold">{formatCurrency(encashmentAmount)}</div>
            <div className="text-xs opacity-75 mt-1">{accumulatedLeaves} {language === 'en' ? 'days' : 'دن'}</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Breakdown' : 'تفصیل'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Daily Rate' : 'روزانہ شرح'}</span>
                <span className="font-bold">{formatCurrency(dailyRate)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Leave Days' : 'چھٹی کے دن'}</span>
                <span className="font-bold">{accumulatedLeaves}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Rate' : 'شرح'}</span>
                <span className="font-bold">{encashmentRate}%</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Total' : 'کل'}</span>
                <span className="font-bold text-xl text-orange-600">{formatCurrency(encashmentAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveEncashmentCalculator;