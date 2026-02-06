import React, { useState } from 'react';
import { Shield, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const TermInsuranceCalculator = ({ language, addToHistory, calculatorName }) => {
  const [age, setAge] = useState(30);
  const [coverageAmount, setCoverageAmount] = useState(10000000);
  const [termLength, setTermLength] = useState(30);
  const [smoker, setSmoker] = useState(false);

  // Premium calculation (simplified)
  const basePremiumRate = 0.0004; // 0.04% per lakh per year for age 30
  const ageLoading = 1 + ((age - 25) * 0.03);
  const smokerLoading = smoker ? 1.5 : 1;
  const termLoading = termLength > 20 ? 0.9 : 1; // Longer terms slightly cheaper per year
  
  const annualPremium = (coverageAmount / 100000) * basePremiumRate * 100000 * ageLoading * smokerLoading * termLoading;
  const monthlyPremium = annualPremium / 12;
  const totalPremiumPaid = annualPremium * termLength;
  const costPerLakh = (annualPremium / (coverageAmount / 100000));

  // Comparison data
  const ageComparisonData = [
    { age: 25, premium: coverageAmount * 0.00035 * 0.85 },
    { age: 30, premium: annualPremium },
    { age: 35, premium: coverageAmount * 0.00035 * 1.15 },
    { age: 40, premium: coverageAmount * 0.00035 * 1.45 },
    { age: 45, premium: coverageAmount * 0.00035 * 1.8 }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="purple"
        formula="Term Premium ≈ (Coverage ÷ 1 Lakh) × Base Rate × Age Factor × Lifestyle Factor"
        variables={[
          { symbol: 'Base Rate', nameEn: 'Rs.350-500 per lakh per year (varies by insurer)', nameUrdu: 'فی لاکھ فی سال ₹350-500 (انشورر کے مطابق مختلف)' },
          { symbol: 'Age Factor', nameEn: 'Premium doubles every 10 years', nameUrdu: 'پریمیم ہر 10 سال میں دوگنا ہو جاتا ہے' },
          { symbol: 'Term Length', nameEn: 'Longer term = Lower annual cost', nameUrdu: 'طویل مدت = کم سالانہ لاگت' }
        ]}
        example={[
          { labelEn: 'Age', labelUrdu: 'عمر', value: '30 years (non-smoker)' },
          { labelEn: 'Coverage', labelUrdu: 'کوریج', value: 'Rs. 1 Crore' },
          { labelEn: 'Term', labelUrdu: 'مدت', value: '30 years' },
          { labelEn: 'Annual Premium', labelUrdu: 'سالانہ پریمیم', value: 'Rs. 12,000' },
          { labelEn: 'Monthly', labelUrdu: 'ماہانہ', value: 'Rs. 1,000' },
          { labelEn: 'Total Paid', labelUrdu: 'کل ادا شدہ', value: 'Rs. 3,60,000 over 30 years' }
        ]}
        terms={[
          {
            titleEn: 'Pure Term Insurance',
            titleUrdu: 'خالص ٹرم انشورنس',
            descEn: 'No maturity benefit, only death benefit. Cheapest life insurance. Best for income protection.',
            descUrdu: 'کوئی میچورٹی فائدہ نہیں، صرف موت کا فائدہ۔ سب سے سستی لائف انشورنس۔ آمدنی کے تحفظ کے لیے بہترین۔'
          },
          {
            titleEn: 'Buy Early, Save Big',
            titleUrdu: 'جلد خریدیں، بہت بچائیں',
            descEn: 'Premium at 25 can be 40-50% lower than at 35. Lock in low rates early!',
            descUrdu: '25 پر پریمیم 35 سے 40-50% کم ہو سکتا ہے۔ جلد کم شرحیں لاک کریں!'
          },
          {
            titleEn: 'Riders to Consider',
            titleUrdu: 'رائیڈرز پر غور کریں',
            descEn: 'Critical illness, accidental death, disability waiver. Add comprehensive protection.',
            descUrdu: 'شدید بیماری، حادثاتی موت، معذوری معافی۔ جامع تحفظ شامل کریں۔'
          }
        ]}
        note={{
          en: 'Term insurance is MUST-HAVE for anyone with dependents. This is rough estimate - actual premium depends on medical tests, occupation, hobbies. Get medicals done before buying to avoid rejection.',
          urdu: 'ٹرم انشورنس ہر اس شخص کے لیے ضروری ہے جس کے منحصر افراد ہوں۔ یہ تخمینہ ہے - اصل پریمیم طبی ٹیسٹ، پیشے، مشاغل پر منحصر ہے۔ رد ہونے سے بچنے کے لیے خریدنے سے پہلے میڈیکل کروائیں۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            {language === 'en' ? 'Term Insurance Details' : 'ٹرم انشورنس کی تفصیلات'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Your Age' : 'آپ کی عمر'}</label>
              <input type="range" min="18" max="55" value={age} onChange={(e) => setAge(parseFloat(e.target.value))}
                className="w-full h-2 bg-purple-100 dark:bg-purple-900 rounded-lg" />
              <input type="number" value={age} onChange={(e) => setAge(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Coverage Amount (Rs.)' : 'کوریج کی رقم (Rs.)'}</label>
              <input type="range" min="1000000" max="50000000" step="1000000" value={coverageAmount}
                onChange={(e) => setCoverageAmount(parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg" />
              <input type="number" value={coverageAmount} onChange={(e) => setCoverageAmount(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Term Length (years)' : 'مدت (سال)'}</label>
              <input type="range" min="10" max="40" value={termLength} onChange={(e) => setTermLength(parseFloat(e.target.value))}
                className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg" />
              <input type="number" value={termLength} onChange={(e) => setTermLength(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" checked={smoker} onChange={(e) => setSmoker(e.target.checked)}
                className="w-5 h-5 accent-purple-600" />
              <label className="text-sm font-semibold">{language === 'en' ? 'Smoker / Tobacco User' : 'سگریٹ نوشی / تمباکو استعمال کنندہ'}</label>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${formatCurrency(monthlyPremium)}/month` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Premium' : 'پریمیم کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Monthly Premium' : 'ماہانہ پریمیم'}</div>
              <div className="text-3xl font-bold">{formatCurrency(monthlyPremium)}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Annual Premium' : 'سالانہ پریمیم'}</div>
              <div className="text-3xl font-bold">{formatCurrency(annualPremium)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Premium by Age' : 'عمر کے حساب سے پریمیم'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={ageComparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="premium" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Cost Summary' : 'لاگت کا خلاصہ'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Coverage Amount' : 'کوریج کی رقم'}</span>
                <span className="font-bold text-green-600">{formatCurrency(coverageAmount)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Total Premium (30 yrs)' : 'کل پریمیم (30 سال)'}</span>
                <span className="font-bold">{formatCurrency(totalPremiumPaid)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Cost per Rs. 1 Lakh' : 'فی روپے 1 لاکھ لاگت'}</span>
                <span className="font-bold">{formatCurrency(costPerLakh)}/year</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-sm">{language === 'en' ? 'Smoker Surcharge' : 'سگریٹ نوشی سرچارج'}</span>
                <span className="font-bold text-red-600">{smoker ? '+50%' : 'None'}</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
            <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              {language === 'en' ? '💰 Cost Savings Tip' : '💰 لاگت بچانے کا نکتہ'}
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-400">
              {language === 'en'
                ? `If you buy this policy 5 years earlier at age ${age - 5}, you'll save approximately ${formatCurrency((annualPremium - (coverageAmount * 0.00035 * (1 + ((age - 5 - 25) * 0.03)))) * termLength)} over the policy term!`
                : `اگر آپ یہ پالیسی 5 سال پہلے ${age - 5} کی عمر میں خریدتے ہیں، تو آپ پالیسی کی مدت میں تقریباً ${formatCurrency((annualPremium - (coverageAmount * 0.00035 * (1 + ((age - 5 - 25) * 0.03)))) * termLength)} بچائیں گے!`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermInsuranceCalculator;