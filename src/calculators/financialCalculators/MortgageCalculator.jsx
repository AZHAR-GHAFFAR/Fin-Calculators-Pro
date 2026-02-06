
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Home as HomeIcon, Download, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency, currencySymbol } from '../../utils/currency';

const MortgageCalculator = ({ language, addToHistory, calculatorName, moduleColor }) => {
  const [homePrice, setHomePrice] = useState(5000000);
  const [downPayment, setDownPayment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [propertyTax, setPropertyTax] = useState(15000);
  const [insurance, setInsurance] = useState(10000);

  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const calculateMortgage = () => {
    if (monthlyRate === 0) return loanAmount / numberOfPayments;
    
    const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return monthlyPayment;
  };

  const principalAndInterest = useMemo(() => calculateMortgage(), [homePrice, downPayment, interestRate, loanTerm]);
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyInsurance = insurance / 12;
  const totalMonthlyPayment = principalAndInterest + monthlyPropertyTax + monthlyInsurance;
  
  const totalInterest = (principalAndInterest * numberOfPayments) - loanAmount;
  const totalCost = (totalMonthlyPayment * numberOfPayments) + downPayment;

  const pieData = [
    { name: language === 'en' ? 'Principal' : 'اصل رقم', value: loanAmount, color: '#3B82F6' },
    { name: language === 'en' ? 'Interest' : 'سود', value: totalInterest, color: '#F59E0B' },
    { name: language === 'en' ? 'Property Tax' : 'پراپرٹی ٹیکس', value: propertyTax * loanTerm, color: '#10B981' },
    { name: language === 'en' ? 'Insurance' : 'انشورنس', value: insurance * loanTerm, color: '#8B5CF6' }
  ];

  const generateAmortization = () => {
    let balance = loanAmount;
    const schedule = [];
    
    for (let year = 1; year <= Math.min(loanTerm, 10); year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      for (let month = 1; month <= 12; month++) {
        const interest = balance * monthlyRate;
        const principal = principalAndInterest - interest;
        balance -= principal;
        
        yearlyPrincipal += principal;
        yearlyInterest += interest;
      }
      
      schedule.push({
        year: year,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: Math.max(balance, 0),
        total: yearlyPrincipal + yearlyInterest
      });
    }
    
    return schedule;
  };

  const amortization = useMemo(() => generateAmortization(), [homePrice, downPayment, interestRate, loanTerm]);

  const handleCalculate = () => {
    addToHistory({
      calculatorName,
      result: `${formatCurrency(totalMonthlyPayment)} Monthly Payment`
    });
    toast.success(language === 'en' ? 'Calculation saved!' : 'حساب محفوظ ہو گیا!');
  };

  return (
    
  <div className="space-y-8">
    {/* Information Panel */}
    <InfoPanel
      language={language}
      colorScheme="blue"
      formula="Monthly Payment = (P × r × (1+r)ⁿ) / ((1+r)ⁿ-1) + Property Tax/12 + Insurance/12"
      variables={[
        { symbol: 'P', nameEn: 'Loan Amount (Home Price - Down Payment)', nameUrdu: 'قرض کی رقم (گھر کی قیمت - ابتدائی ادائیگی)' },
        { symbol: 'r', nameEn: 'Monthly Interest Rate', nameUrdu: 'ماہانہ شرح سود' },
        { symbol: 'n', nameEn: 'Total Number of Months', nameUrdu: 'کل مہینوں کی تعداد' }
      ]}
      example={[
        { labelEn: 'Home Price', labelUrdu: 'گھر کی قیمت', value: 'Rs. 50,00,000' },
        { labelEn: 'Down Payment', labelUrdu: 'ابتدائی ادائیگی', value: 'Rs. 10,00,000 (20%)' },
        { labelEn: 'Loan Amount', labelUrdu: 'قرض کی رقم', value: 'Rs. 40,00,000' },
        { labelEn: 'Interest Rate', labelUrdu: 'شرح سود', value: '8.5% for 20 years' },
        { labelEn: 'Monthly Payment', labelUrdu: 'ماہانہ ادائیگی', value: 'Rs. 34,635' }
      ]}
      terms={[
        {
          titleEn: 'Mortgage vs Loan',
          titleUrdu: 'رہن بمقابلہ قرض',
          descEn: 'A mortgage is a loan specifically for buying property, secured by the property itself.',
          descUrdu: 'رہن خاص طور پر پراپرٹی خریدنے کے لیے قرض ہے، جو پراپرٹی سے محفوظ ہے۔'
        },
        {
          titleEn: 'Down Payment',
          titleUrdu: 'ابتدائی ادائیگی',
          descEn: 'The upfront payment, typically 20-30% of home price in Pakistan.',
          descUrdu: 'پیشگی ادائیگی، عام طور پر پاکستان میں گھر کی قیمت کا 20-30%۔'
        },
        {
          titleEn: 'Property Tax',
          titleUrdu: 'پراپرٹی ٹیکس',
          descEn: 'Annual tax on property ownership, added to monthly payment.',
          descUrdu: 'پراپرٹی کی ملکیت پر سالانہ ٹیکس، ماہانہ ادائیگی میں شامل۔'
        }
      ]}
      note={{
        en: 'Mortgage rates in Pakistan typically range from 8-12%. This calculator provides estimates. Contact your bank for exact rates and terms.',
        urdu: 'پاکستان میں رہن کی شرح عام طور پر 8-12% ہے۔ یہ کیلکولیٹر تخمینہ فراہم کرتا ہے۔ درست شرح اور شرائط کے لیے اپنے بینک سے رابطہ کریں۔'
      }}
    />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Section */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <HomeIcon className="w-6 h-6 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              {language === 'en' ? 'Mortgage Details' : 'رہن کی تفصیلات'}
            </h3>
          </div>

          {/* Home Price */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? `Home Price (${currencySymbol})` : `گھر کی قیمت (${currencySymbol})`}
            </label>
            <input type="range" min="1000000" max="50000000" step="100000" value={homePrice}
              onChange={(e) => setHomePrice(parseFloat(e.target.value))}
              className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <input type="number" value={homePrice} onChange={(e) => setHomePrice(parseFloat(e.target.value))}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          {/* Down Payment */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? `Down Payment (${currencySymbol})` : `ابتدائی ادائیگی (${currencySymbol})`}
              <span className="text-xs ml-2 text-slate-500">
                {((downPayment/homePrice)*100).toFixed(0)}%
              </span>
            </label>
            <input type="range" min="0" max={homePrice * 0.5} step="50000" value={downPayment}
              onChange={(e) => setDownPayment(parseFloat(e.target.value))}
              className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <input type="number" value={downPayment} onChange={(e) => setDownPayment(parseFloat(e.target.value))}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? 'Interest Rate (%)' : 'شرح سود (%)'}
            </label>
            <input type="range" min="5" max="15" step="0.25" value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-purple-100 dark:bg-purple-900 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <input type="number" value={interestRate} step="0.25" onChange={(e) => setInterestRate(parseFloat(e.target.value))}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          {/* Loan Term */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? 'Loan Term (Years)' : 'قرض کی مدت (سال)'}
            </label>
            <input type="range" min="5" max="30" step="1" value={loanTerm}
              onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
              className="w-full h-2 bg-orange-100 dark:bg-orange-900 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <input type="number" value={loanTerm} onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          {/* Property Tax */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? `Annual Property Tax (${currencySymbol})` : `سالانہ پراپرٹی ٹیکس (${currencySymbol})`}
            </label>
            <input type="number" value={propertyTax} onChange={(e) => setPropertyTax(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          {/* Insurance */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? `Annual Insurance (${currencySymbol})` : `سالانہ انشورنس (${currencySymbol})`}
            </label>
            <input type="number" value={insurance} onChange={(e) => setInsurance(parseFloat(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          <button onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <HomeIcon className="w-5 h-5" />
            {language === 'en' ? 'Calculate Mortgage' : 'حساب لگائیں'}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Result Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">
              {language === 'en' ? 'Monthly Payment' : 'ماہانہ ادائیگی'}
            </div>
            <div className="text-3xl font-bold">{formatCurrency(totalMonthlyPayment)}</div>
            <div className="text-xs opacity-75 mt-1">
              P&I: {formatCurrency(principalAndInterest)}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">
              {language === 'en' ? 'Loan Amount' : 'قرض کی رقم'}
            </div>
            <div className="text-3xl font-bold">{formatCurrency(loanAmount)}</div>
            <div className="text-xs opacity-75 mt-1">
              {language === 'en' ? 'Down Payment' : 'ابتدائی'}: {formatCurrency(downPayment)}
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">
              {language === 'en' ? 'Total Cost' : 'کل لاگت'}
            </div>
            <div className="text-3xl font-bold">{formatCurrency(totalCost)}</div>
            <div className="text-xs opacity-75 mt-1">
              {language === 'en' ? 'Total Interest' : 'کل سود'}: {formatCurrency(totalInterest)}
            </div>
          </div>
        </div>

        {/* Payment Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Monthly Payment Breakdown' : 'ماہانہ ادائیگی کی تفصیل'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Principal & Interest' : 'اصل اور سود'}</span>
                <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(principalAndInterest)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Property Tax' : 'پراپرٹی ٹیکس'}</span>
                <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(monthlyPropertyTax)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Insurance' : 'انشورنس'}</span>
                <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(monthlyInsurance)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold text-slate-800 dark:text-white">{language === 'en' ? 'Total Monthly' : 'کل ماہانہ'}</span>
                <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">{formatCurrency(totalMonthlyPayment)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Total Cost Breakdown' : 'کل لاگت کی تفصیل'}
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Amortization Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            {language === 'en' ? 'Yearly Amortization (First 10 Years)' : 'سالانہ تفصیل (پہلے 10 سال)'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={amortization}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="year" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Area type="monotone" dataKey="principal" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} name={language === 'en' ? 'Principal' : 'اصل'} />
              <Area type="monotone" dataKey="interest" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} name={language === 'en' ? 'Interest' : 'سود'} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MortgageCalculator;