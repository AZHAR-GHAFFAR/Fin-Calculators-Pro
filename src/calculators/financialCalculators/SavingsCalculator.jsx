
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { PiggyBank, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency, currencySymbol } from '../../utils/currency';

const SavingsCalculator = ({ language, addToHistory, calculatorName, moduleColor }) => {
  const [initialDeposit, setInitialDeposit] = useState(100000);
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [interestRate, setInterestRate] = useState(6);
  const [timePeriod, setTimePeriod] = useState(10);
  const [compoundFrequency, setCompoundFrequency] = useState('monthly');

  const frequencies = {
    'daily': 365,
    'monthly': 12,
    'quarterly': 4,
    'yearly': 1
  };

  const calculateSavings = () => {
    const P = parseFloat(initialDeposit);
    const PMT = parseFloat(monthlyDeposit);
    const r = parseFloat(interestRate) / 100;
    const n = frequencies[compoundFrequency];
    const t = parseFloat(timePeriod);
    
    // Future value of initial deposit
    const FV_initial = P * Math.pow(1 + r/n, n*t);
    
    // Future value of monthly deposits (annuity)
    const monthsPerYear = 12;
    const totalMonths = t * monthsPerYear;
    const monthlyRate = r / monthsPerYear;
    
    let FV_deposits = 0;
    if (monthlyRate > 0) {
      FV_deposits = PMT * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    } else {
      FV_deposits = PMT * totalMonths;
    }
    
    const totalFV = FV_initial + FV_deposits;
    const totalDeposited = P + (PMT * totalMonths);
    const totalInterest = totalFV - totalDeposited;
    
    return {
      futureValue: totalFV,
      totalDeposited: totalDeposited,
      totalInterest: totalInterest
    };
  };

  const result = useMemo(() => calculateSavings(), [initialDeposit, monthlyDeposit, interestRate, timePeriod, compoundFrequency]);

  const generateYearlyData = () => {
    const data = [];
    const P = parseFloat(initialDeposit);
    const PMT = parseFloat(monthlyDeposit);
    const r = parseFloat(interestRate) / 100 / 12;
    
    let balance = P;
    let totalDeposited = P;
    
    for (let year = 1; year <= timePeriod; year++) {
      for (let month = 1; month <= 12; month++) {
        balance = balance * (1 + r) + PMT;
        totalDeposited += PMT;
      }
      
      data.push({
        year: `${language === 'en' ? 'Year' : 'سال'} ${year}`,
        deposited: totalDeposited,
        balance: balance,
        interest: balance - totalDeposited
      });
    }
    
    return data;
  };

  const yearlyData = useMemo(() => generateYearlyData(), [initialDeposit, monthlyDeposit, interestRate, timePeriod]);

  const handleCalculate = () => {
    addToHistory({
      calculatorName,
      result: `${formatCurrency(result.futureValue)} Future Value`
    });
    toast.success(language === 'en' ? 'Calculation saved!' : 'حساب محفوظ ہو گیا!');
  };

 return (
  <div className="space-y-8">
    <InfoPanel
      language={language}
      colorScheme="green"
      formula="FV = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) - 1) / (r/n)]"
      variables={[
        { symbol: 'P', nameEn: 'Initial Deposit', nameUrdu: 'ابتدائی جمع' },
        { symbol: 'PMT', nameEn: 'Monthly Deposit', nameUrdu: 'ماہانہ جمع' },
        { symbol: 'r', nameEn: 'Annual Interest Rate', nameUrdu: 'سالانہ شرح سود' },
        { symbol: 'n', nameEn: 'Compound Frequency (12 for monthly)', nameUrdu: 'مرکب تعدد' },
        { symbol: 't', nameEn: 'Time in Years', nameUrdu: 'سالوں میں وقت' }
      ]}
      example={[
        { labelEn: 'Initial Deposit', labelUrdu: 'ابتدائی جمع', value: 'Rs. 1,00,000' },
        { labelEn: 'Monthly Deposit', labelUrdu: 'ماہانہ جمع', value: 'Rs. 5,000' },
        { labelEn: 'Interest Rate', labelUrdu: 'شرح سود', value: '6% compounded monthly' },
        { labelEn: 'Duration', labelUrdu: 'مدت', value: '10 years' },
        { labelEn: 'Future Value', labelUrdu: 'مستقبل کی قیمت', value: 'Rs. 9,17,123' },
        { labelEn: 'Interest Earned', labelUrdu: 'سود کمایا', value: 'Rs. 2,17,123' }
      ]}
      terms={[
        {
          titleEn: 'Compound Interest',
          titleUrdu: 'مرکب سود',
          descEn: 'Interest calculated on initial principal and accumulated interest.',
          descUrdu: 'اصل رقم اور جمع شدہ سود پر سود کا حساب۔'
        },
        {
          titleEn: 'Compound Frequency',
          titleUrdu: 'مرکب تعدد',
          descEn: 'How often interest is calculated. More frequent = more interest.',
          descUrdu: 'سود کتنی بار لگایا جاتا ہے۔ زیادہ بار = زیادہ سود۔'
        },
        {
          titleEn: 'Future Value',
          titleUrdu: 'مستقبل کی قیمت',
          descEn: 'Total amount you will have after the investment period.',
          descUrdu: 'سرمایہ کاری کی مدت کے بعد آپ کے پاس کل رقم۔'
        }
      ]}
      note={{
        en: 'Pakistan bank savings accounts offer 3-8% interest. Fixed deposits offer 8-12%. This calculator shows the power of regular savings.',
        urdu: 'پاکستانی بینک بچت اکاؤنٹس 3-8% سود دیتے ہیں۔ فکسڈ ڈپازٹ 8-12% دیتے ہیں۔ یہ کیلکولیٹر باقاعدہ بچت کی طاقت دکھاتا ہے۔'
      }}
    />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <PiggyBank className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              {language === 'en' ? 'Savings Plan' : 'بچت کا منصوبہ'}
            </h3>
          </div>

          {/* Initial Deposit */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? `Initial Deposit (${currencySymbol})` : `ابتدائی رقم (${currencySymbol})`}
            </label>
            <input type="range" min="0" max="1000000" step="10000" value={initialDeposit}
              onChange={(e) => setInitialDeposit(parseFloat(e.target.value))}
              className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <input type="number" value={initialDeposit} onChange={(e) => setInitialDeposit(parseFloat(e.target.value))}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          {/* Monthly Deposit */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? `Monthly Deposit (${currencySymbol})` : `ماہانہ جمع (${currencySymbol})`}
            </label>
            <input type="range" min="0" max="50000" step="500" value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <input type="number" value={monthlyDeposit} onChange={(e) => setMonthlyDeposit(parseFloat(e.target.value))}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? 'Annual Interest Rate (%)' : 'سالانہ شرح سود (%)'}
            </label>
            <input type="range" min="1" max="12" step="0.25" value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-purple-100 dark:bg-purple-900 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <input type="number" value={interestRate} step="0.25" onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          {/* Time Period */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? 'Time Period (Years)' : 'مدت (سال)'}
            </label>
            <input type="range" min="1" max="30" step="1" value={timePeriod}
              onChange={(e) => setTimePeriod(parseFloat(e.target.value))}
              className="w-full h-2 bg-orange-100 dark:bg-orange-900 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <input type="number" value={timePeriod} onChange={(e) => setTimePeriod(parseFloat(e.target.value))}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          {/* Compound Frequency */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? 'Compound Frequency' : 'سود کی تعدد'}
            </label>
            <select value={compoundFrequency} onChange={(e) => setCompoundFrequency(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white">
              <option value="daily">{language === 'en' ? 'Daily' : 'روزانہ'}</option>
              <option value="monthly">{language === 'en' ? 'Monthly' : 'ماہانہ'}</option>
              <option value="quarterly">{language === 'en' ? 'Quarterly' : 'سہ ماہی'}</option>
              <option value="yearly">{language === 'en' ? 'Yearly' : 'سالانہ'}</option>
            </select>
          </div>

          <button onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <TrendingUp className="w-5 h-5" />
            {language === 'en' ? 'Calculate Savings' : 'حساب لگائیں'}
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">
              {language === 'en' ? 'Future Value' : 'مستقبل کی قیمت'}
            </div>
            <div className="text-3xl font-bold">{formatCurrency(result.futureValue)}</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">
              {language === 'en' ? 'Total Deposited' : 'کل جمع شدہ'}
            </div>
            <div className="text-3xl font-bold">{formatCurrency(result.totalDeposited)}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">
              {language === 'en' ? 'Interest Earned' : 'سود کمایا'}
            </div>
            <div className="text-3xl font-bold">{formatCurrency(result.totalInterest)}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            {language === 'en' ? 'Savings Growth Over Time' : 'وقت کے ساتھ بچت میں اضافہ'}
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={yearlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="year" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Area type="monotone" dataKey="deposited" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} 
                name={language === 'en' ? 'Deposited' : 'جمع شدہ'} />
              <Area type="monotone" dataKey="interest" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} 
                name={language === 'en' ? 'Interest' : 'سود'} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            {language === 'en' ? 'Savings Summary' : 'بچت کا خلاصہ'}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                {language === 'en' ? 'Monthly Growth' : 'ماہانہ اضافہ'}
              </div>
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(result.totalInterest / (timePeriod * 12))}
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                {language === 'en' ? 'ROI' : 'منافع کی شرح'}
              </div>
              <div className="text-xl font-bold text-blue-600">
                {((result.totalInterest / result.totalDeposited) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SavingsCalculator;