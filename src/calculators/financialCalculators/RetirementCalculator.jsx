
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency, currencySymbol } from '../../utils/currency';

const RetirementCalculator = ({ language, addToHistory, calculatorName }) => {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlySavings, setMonthlySavings] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [monthlyExpenseAfterRetirement, setMonthlyExpenseAfterRetirement] = useState(30000);
  const [lifeExpectancy, setLifeExpectancy] = useState(80);

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;
  const monthsToRetirement = yearsToRetirement * 12;
  const monthsInRetirement = yearsInRetirement * 12;

  const calculateRetirement = () => {
    const r = expectedReturn / 100 / 12;
    
    // Future value at retirement
    const FV_savings = currentSavings * Math.pow(1 + r, monthsToRetirement);
    const FV_monthly = monthlySavings * ((Math.pow(1 + r, monthsToRetirement) - 1) / r);
    const totalAtRetirement = FV_savings + FV_monthly;
    
    // Total needed for retirement
    const totalNeeded = monthlyExpenseAfterRetirement * monthsInRetirement;
    
    // Shortfall or surplus
    const difference = totalAtRetirement - totalNeeded;
    
    return {
      totalAtRetirement,
      totalNeeded,
      difference,
      isShortfall: difference < 0,
      monthlyIncome: totalAtRetirement / monthsInRetirement
    };
  };

  const result = useMemo(() => calculateRetirement(), [currentAge, retirementAge, currentSavings, monthlySavings, expectedReturn, monthlyExpenseAfterRetirement, lifeExpectancy]);

  const generateProjection = () => {
    const data = [];
    const r = expectedReturn / 100;
    let balance = currentSavings;
    
    for (let age = currentAge; age <= lifeExpectancy; age++) {
      if (age < retirementAge) {
        balance = balance * (1 + r) + (monthlySavings * 12);
      } else {
        balance = balance * (1 + r) - (monthlyExpenseAfterRetirement * 12);
      }
      
      data.push({
        age: age,
        balance: Math.max(balance, 0),
        phase: age < retirementAge ? 'Accumulation' : 'Retirement'
      });
    }
    
    return data;
  };

  const projection = useMemo(() => generateProjection(), [currentAge, retirementAge, currentSavings, monthlySavings, expectedReturn, monthlyExpenseAfterRetirement, lifeExpectancy]);

  return (
<div className="space-y-8">

    <InfoPanel
  language={language}
  colorScheme="purple"
  formula="Corpus at Retirement = Current Savings × (1+r)^n + Monthly SIP × [((1+r)^n - 1) / r]"
  variables={[
    { symbol: 'n', nameEn: 'Months until Retirement', nameUrdu: 'ریٹائرمنٹ تک مہینے' },
    { symbol: 'r', nameEn: 'Monthly Return Rate', nameUrdu: 'ماہانہ منافع کی شرح' }
  ]}
  example={[
    { labelEn: 'Current Age', labelUrdu: 'موجودہ عمر', value: '30 years' },
    { labelEn: 'Retirement Age', labelUrdu: 'ریٹائرمنٹ کی عمر', value: '60 years' },
    { labelEn: 'Current Savings', labelUrdu: 'موجودہ بچت', value: 'Rs. 5,00,000' },
    { labelEn: 'Monthly Savings', labelUrdu: 'ماہانہ بچت', value: 'Rs. 10,000' },
    { labelEn: 'Corpus at 60', labelUrdu: '60 سال پر رقم', value: 'Rs. 2.27 Crore' }
  ]}
  terms={[
    {
      titleEn: 'Retirement Corpus',
      titleUrdu: 'ریٹائرمنٹ کارپس',
      descEn: 'Total amount you need at retirement to sustain your lifestyle.',
      descUrdu: 'ریٹائرمنٹ پر اپنی زندگی برقرار رکھنے کے لیے درکار کل رقم۔'
    },
    {
      titleEn: 'Life Expectancy',
      titleUrdu: 'متوقع عمر',
      descEn: 'How long you expect to live. Plan for 80-85 years in Pakistan.',
      descUrdu: 'آپ کتنی دیر تک زندہ رہنے کی توقع رکھتے ہیں۔ پاکستان میں 80-85 سال کے لیے منصوبہ بنائیں۔'
    },
    {
      titleEn: 'Inflation',
      titleUrdu: 'افراط زر',
      descEn: 'Your expenses will increase. Pakistan inflation averages 7-10%.',
      descUrdu: 'آپ کے اخراجات بڑھیں گے۔ پاکستان میں افراط زر اوسطاً 7-10% ہے۔'
    }
  ]}
  note={{
    en: 'Start retirement planning early. Even Rs. 5,000/month from age 25 can build a corpus of Rs. 3+ Crore by 60.',
    urdu: 'ریٹائرمنٹ کی منصوبہ بندی جلد شروع کریں۔ 25 سال کی عمر سے صرف Rs. 5,000/ماہ بھی 60 تک Rs. 3+ کروڑ بنا سکتے ہیں۔'
  }}
/>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-purple-600" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              {language === 'en' ? 'Retirement Plan' : 'ریٹائرمنٹ منصوبہ'}
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Current Age' : 'موجودہ عمر'}</label>
              <input type="number" value={currentAge} onChange={(e) => setCurrentAge(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Retirement Age' : 'ریٹائرمنٹ کی عمر'}</label>
              <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Current Savings (${currencySymbol})` : `موجودہ بچت (${currencySymbol})`}</label>
              <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Monthly Savings (${currencySymbol})` : `ماہانہ بچت (${currencySymbol})`}</label>
              <input type="number" value={monthlySavings} onChange={(e) => setMonthlySavings(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Expected Return (%)' : 'متوقع منافع (%)'}</label>
              <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Monthly Expense After Retirement (${currencySymbol})` : `ریٹائرمنٹ کے بعد ماہانہ اخراجات (${currencySymbol})`}</label>
              <input type="number" value={monthlyExpenseAfterRetirement} onChange={(e) => setMonthlyExpenseAfterRetirement(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Life Expectancy' : 'متوقع عمر'}</label>
              <input type="number" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>
          </div>

          <button onClick={() => {
            addToHistory({ calculatorName, result: formatCurrency(result.totalAtRetirement) });
            toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
          }}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg">
            {language === 'en' ? 'Calculate Plan' : 'حساب لگائیں'}
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'At Retirement' : 'ریٹائرمنٹ پر'}</div>
            <div className="text-3xl font-bold">{formatCurrency(result.totalAtRetirement)}</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Total Needed' : 'کل ضرورت'}</div>
            <div className="text-3xl font-bold">{formatCurrency(result.totalNeeded)}</div>
          </div>

          <div className={`bg-gradient-to-br ${result.isShortfall ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600'} rounded-2xl p-6 text-white shadow-lg`}>
            <div className="text-sm font-semibold opacity-90 mb-2">{result.isShortfall ? (language === 'en' ? 'Shortfall' : 'کمی') : (language === 'en' ? 'Surplus' : 'اضافی')}</div>
            <div className="text-3xl font-bold">{formatCurrency(Math.abs(result.difference))}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            {language === 'en' ? 'Retirement Projection' : 'ریٹائرمنٹ پروجیکشن'}
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={projection}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="age" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="balance" stroke="#8B5CF6" strokeWidth={3} name={language === 'en' ? 'Balance' : 'بیلنس'} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {result.isShortfall && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">
              {language === 'en' ? '⚠️ Retirement Shortfall Detected' : '⚠️ ریٹائرمنٹ میں کمی'}
            </h4>
            <p className="text-sm text-red-700 dark:text-red-400">
              {language === 'en' 
                ? `You need to save ${formatCurrency(Math.abs(result.difference / monthsToRetirement))} more per month to meet your retirement goals.`
                : `آپ کو ماہانہ ${formatCurrency(Math.abs(result.difference / monthsToRetirement))} مزید بچانے کی ضرورت ہے۔`
              }
            </p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default RetirementCalculator;