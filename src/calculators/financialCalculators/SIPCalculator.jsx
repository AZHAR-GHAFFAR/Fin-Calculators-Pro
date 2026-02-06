
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency, currencySymbol } from '../../utils/currency';

const SIPCalculator = ({ language, addToHistory, calculatorName }) => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;
    
    const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const invested = P * n;
    const returns = futureValue - invested;
    
    return { futureValue, invested, returns };
  };

  const result = useMemo(() => calculateSIP(), [monthlyInvestment, expectedReturn, timePeriod]);

  const generateYearlyData = () => {
    const data = [];
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 100 / 12;
    
    for (let year = 1; year <= timePeriod; year++) {
      const n = year * 12;
      const fv = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      const invested = P * n;
      
      data.push({
        year: `Year ${year}`,
        invested: invested,
        total: fv,
        returns: fv - invested
      });
    }
    
    return data;
  };

  const yearlyData = useMemo(() => generateYearlyData(), [monthlyInvestment, expectedReturn, timePeriod]);

  const handleCalculate = () => {
    addToHistory({
      calculatorName,
      result: `${formatCurrency(result.futureValue)} Future Value`
    });
    toast.success(language === 'en' ? 'Calculation saved!' : 'حساب محفوظ ہو گیا!');
  };

  return (

  <div className="space-y-8">
    {/* Information Panel */}
    <InfoPanel
      language={language}
      colorScheme="green"
      formula="FV = P × [((1 + r)ⁿ - 1) / r] × (1 + r)"
      variables={[
        { symbol: 'FV', nameEn: 'Future Value (Total Amount)', nameUrdu: 'مستقبل کی قیمت (کل رقم)' },
        { symbol: 'P', nameEn: 'Monthly Investment Amount', nameUrdu: 'ماہانہ سرمایہ کاری کی رقم' },
        { symbol: 'r', nameEn: 'Monthly Rate of Return (Annual/12/100)', nameUrdu: 'ماہانہ منافع کی شرح' },
        { symbol: 'n', nameEn: 'Total Number of Months', nameUrdu: 'کل مہینوں کی تعداد' }
      ]}
      example={[
        { labelEn: 'Monthly Investment', labelUrdu: 'ماہانہ سرمایہ کاری', value: 'Rs. 10,000' },
        { labelEn: 'Expected Return', labelUrdu: 'متوقع منافع', value: '12% per annum' },
        { labelEn: 'Duration', labelUrdu: 'مدت', value: '10 years (120 months)' },
        { labelEn: 'Total Invested', labelUrdu: 'کل سرمایہ کاری', value: 'Rs. 12,00,000' },
        { labelEn: 'Future Value', labelUrdu: 'مستقبل کی قیمت', value: 'Rs. 23,23,391' },
        { labelEn: 'Wealth Gain', labelUrdu: 'دولت میں اضافہ', value: 'Rs. 11,23,391 (93.6%)' }
      ]}
      terms={[
        {
          titleEn: 'What is SIP?',
          titleUrdu: 'ایس آئی پی کیا ہے؟',
          descEn: 'Systematic Investment Plan - Invest a fixed amount regularly in mutual funds. Builds wealth through rupee cost averaging.',
          descUrdu: 'منظم سرمایہ کاری کا منصوبہ - میوچل فنڈز میں باقاعدگی سے ایک مقررہ رقم کی سرمایہ کاری۔ روپے کی لاگت کی اوسط کے ذریعے دولت بناتا ہے۔'
        },
        {
          titleEn: 'Power of Compounding',
          titleUrdu: 'کمپاؤنڈنگ کی طاقت',
          descEn: 'Your returns generate their own returns. Earlier you start, more you earn. Time is your biggest asset.',
          descUrdu: 'آپ کے منافع اپنے منافع پیدا کرتے ہیں۔ جتنا جلد شروع کریں، اتنا زیادہ کمائیں۔ وقت آپ کا سب سے بڑا اثاثہ ہے۔'
        },
        {
          titleEn: 'Rupee Cost Averaging',
          titleUrdu: 'روپے کی لاگت کی اوسط',
          descEn: 'You buy more units when prices are low, fewer when high. Reduces risk and averages your purchase cost.',
          descUrdu: 'جب قیمتیں کم ہوں تو زیادہ یونٹس خریدیں، زیادہ ہونے پر کم۔ خطرہ کم کرتا ہے اور خریداری کی لاگت کو اوسط کرتا ہے۔'
        }
      ]}
      note={{
        en: 'SIP returns of 12% are typical for equity mutual funds in Pakistan/India over 10+ years. Past performance doesn\'t guarantee future returns. Consult a financial advisor before investing.',
        urdu: 'ایس آئی پی کا 12% منافع پاکستان/انڈیا میں ایکویٹی میوچل فنڈز کے لیے 10+ سال میں عام ہے۔ ماضی کی کارکردگی مستقبل کے منافع کی ضمانت نہیں دیتی۔ سرمایہ کاری سے پہلے مالیاتی مشیر سے مشورہ کریں۔'
      }}
    />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
            {language === 'en' ? 'Investment Details' : 'سرمایہ کاری کی تفصیلات'}
          </h3>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? `Monthly Investment (${currencySymbol})` : `ماہانہ سرمایہ کاری (${currencySymbol})`}
            </label>
            <input type="range" min="1000" max="100000" step="1000" value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <input type="number" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? 'Expected Return (% p.a.)' : 'متوقع واپسی (% سالانہ)'}
            </label>
            <input type="range" min="5" max="20" step="0.5" value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <input type="number" value={expectedReturn} step="0.5" onChange={(e) => setExpectedReturn(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? 'Time Period (Years)' : 'مدت (سال)'}
            </label>
            <input type="range" min="1" max="30" step="1" value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full h-2 bg-purple-100 dark:bg-purple-900 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <input type="number" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          <button onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl"
          >
            {language === 'en' ? 'Calculate Returns' : 'حساب لگائیں'}
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Total Investment' : 'کل سرمایہ کاری'}</div>
            <div className="text-3xl font-bold">{formatCurrency(result.invested)}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Est. Returns' : 'متوقع واپسی'}</div>
            <div className="text-3xl font-bold">{formatCurrency(result.returns)}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Future Value' : 'مستقبل کی قیمت'}</div>
            <div className="text-3xl font-bold">{formatCurrency(result.futureValue)}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{language === 'en' ? 'Investment Growth' : 'سرمایہ کاری میں اضافہ'}</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="year" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Area type="monotone" dataKey="invested" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="returns" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SIPCalculator;