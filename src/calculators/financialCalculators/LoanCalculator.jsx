
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Download, Printer, Share2, Calculator as CalcIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency, currencySymbol } from '../../utils/currency';

const LoanCalculator = ({ language, addToHistory, calculatorName, moduleColor }) => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTenure, setLoanTenure] = useState(5);
  const [tenureType, setTenureType] = useState('years');

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const months = tenureType === 'years' ? parseFloat(loanTenure) * 12 : parseFloat(loanTenure);
    
    if (rate === 0) return principal / months;
    
    const emi = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
    return emi;
  };

  const emi = useMemo(() => calculateEMI(), [loanAmount, interestRate, loanTenure, tenureType]);
  const totalMonths = tenureType === 'years' ? loanTenure * 12 : loanTenure;
  const totalAmount = emi * totalMonths;
  const totalInterest = totalAmount - loanAmount;

  const generateSchedule = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    let balance = principal;
    const schedule = [];
    
    for (let i = 1; i <= totalMonths; i++) {
      const interest = balance * rate;
      const principalPaid = emi - interest;
      balance -= principalPaid;
      
      schedule.push({
        month: i,
        emi: emi,
        principal: principalPaid,
        interest: interest,
        balance: Math.max(balance, 0)
      });
    }
    return schedule;
  };

  const schedule = useMemo(() => generateSchedule(), [loanAmount, interestRate, loanTenure, tenureType]);

  const pieData = [
    { name: language === 'en' ? 'Principal' : 'اصل رقم', value: parseFloat(loanAmount), color: '#4F46E5' },
    { name: language === 'en' ? 'Interest' : 'سود', value: totalInterest, color: '#F59E0B' }
  ];

  const barData = schedule.slice(0, 12).map(item => ({
    month: `M${item.month}`,
    [language === 'en' ? 'Principal' : 'اصل']: item.principal,
    [language === 'en' ? 'Interest' : 'سود']: item.interest
  }));

  const handleCalculate = () => {
    addToHistory({
      calculatorName,
      result: `${formatCurrency(emi)} EMI`
    });
    toast.success(language === 'en' ? 'Calculation saved!' : 'حساب محفوظ ہو گیا!');
  };

  return (
    <div className="space-y-8">
      {/* Information Panel */}
      <InfoPanel
        language={language}
        colorScheme="blue"
        formula="EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)"
        variables={[
          { symbol: 'P', nameEn: 'Principal (Loan Amount)', nameUrdu: 'اصل رقم (قرض کی رقم)' },
          { symbol: 'r', nameEn: 'Monthly Interest Rate (Annual / 12 / 100)', nameUrdu: 'ماہانہ شرح سود (سالانہ / 12 / 100)' },
          { symbol: 'n', nameEn: 'Number of Monthly Installments', nameUrdu: 'ماہانہ قسطوں کی تعداد' }
        ]}
        example={[
          { labelEn: 'Loan Amount', labelUrdu: 'قرض کی رقم', value: 'Rs. 10,00,000' },
          { labelEn: 'Interest Rate', labelUrdu: 'شرح سود', value: '12% per annum' },
          { labelEn: 'Tenure', labelUrdu: 'مدت', value: '5 years (60 months)' },
          { labelEn: 'Monthly EMI', labelUrdu: 'ماہانہ ای ایم آئی', value: 'Rs. 22,244' },
          { labelEn: 'Total Interest', labelUrdu: 'کل سود', value: 'Rs. 3,34,640' },
          { labelEn: 'Total Payment', labelUrdu: 'کل ادائیگی', value: 'Rs. 13,34,640' }
        ]}
        terms={[
          {
            titleEn: 'What is EMI?',
            titleUrdu: 'ای ایم آئی کیا ہے؟',
            descEn: 'Equated Monthly Installment - A fixed payment amount you pay every month to repay your loan.',
            descUrdu: 'برابر ماہانہ قسط - ایک مقررہ رقم جو آپ ہر ماہ قرض واپس کرنے کے لیے ادا کرتے ہیں۔'
          },
          {
            titleEn: 'Principal vs Interest',
            titleUrdu: 'اصل بمقابلہ سود',
            descEn: 'Initially, more goes to interest. Over time, more goes to principal repayment.',
            descUrdu: 'شروع میں زیادہ رقم سود میں جاتی ہے۔ وقت کے ساتھ اصل رقم کی ادائیگی بڑھتی ہے۔'
          },
          {
            titleEn: 'Amortization',
            titleUrdu: 'ایمورٹائزیشن',
            descEn: 'The process of paying off debt over time through regular payments.',
            descUrdu: 'باقاعدہ ادائیگیوں کے ذریعے وقت کے ساتھ قرض ادا کرنے کا عمل۔'
          }
        ]}
        note={{
          en: 'This calculator provides estimates. Actual EMI may vary based on bank policies, processing fees, and other charges. Always verify with your lender.',
          urdu: 'یہ کیلکولیٹر تخمینہ فراہم کرتا ہے۔ حقیقی ای ایم آئی بینک کی پالیسیوں، پروسیسنگ فیس اور دیگر چارجز کی بنیاد پر مختلف ہو سکتی ہے۔ ہمیشہ اپنے قرض دہندہ سے تصدیق کریں۔'
        }}
      />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
            {language === 'en' ? 'Loan Details' : 'قرض کی تفصیلات'}
          </h3>
          
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? `Loan Amount (${currencySymbol})` : `قرض کی رقم (${currencySymbol})`}
            </label>
            <input
              type="range" min="100000" max="10000000" step="50000" value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full h-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <input
              type="number" value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? 'Interest Rate (%)' : 'شرح سود (%)'}
            </label>
            <input
              type="range" min="5" max="20" step="0.5" value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full h-2 bg-purple-100 dark:bg-purple-900 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <input
              type="number" value={interestRate} step="0.5"
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? 'Loan Tenure' : 'قرض کی مدت'}
            </label>
            <div className="flex gap-2 mb-2">
              <button
                onClick={() => setTenureType('years')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm ${
                  tenureType === 'years' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {language === 'en' ? 'Years' : 'سال'}
              </button>
              <button
                onClick={() => setTenureType('months')}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm ${
                  tenureType === 'months' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {language === 'en' ? 'Months' : 'مہینے'}
              </button>
            </div>
            <input
              type="range" min={tenureType === 'years' ? '1' : '12'} max={tenureType === 'years' ? '30' : '360'}
              value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)}
              className="w-full h-2 bg-pink-100 dark:bg-pink-900 rounded-lg appearance-none cursor-pointer accent-pink-600"
            />
            <input
              type="number" value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 rounded-lg font-semibold text-slate-800 dark:text-white"
            />
          </div>

          <button 
            onClick={handleCalculate}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <CalcIcon className="w-5 h-5" />
            {language === 'en' ? 'Calculate EMI' : 'حساب لگائیں'}
          </button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Monthly EMI' : 'ماہانہ ای ایم آئی'}</div>
            <div className="text-3xl font-bold">{formatCurrency(emi)}</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Total Interest' : 'کل سود'}</div>
            <div className="text-3xl font-bold">{formatCurrency(totalInterest)}</div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Total Amount' : 'کل رقم'}</div>
            <div className="text-3xl font-bold">{formatCurrency(totalAmount)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{language === 'en' ? 'Payment Breakdown' : 'تفصیل'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">{language === 'en' ? 'First 12 Months' : 'پہلے 12 مہینے'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey={language === 'en' ? 'Principal' : 'اصل'} fill="#4F46E5" radius={[8, 8, 0, 0]} />
                <Bar dataKey={language === 'en' ? 'Interest' : 'سود'} fill="#F59E0B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
            {language === 'en' ? 'Payment Schedule (First 12 Months)' : 'ادائیگی کا شیڈول'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-bold text-slate-700 dark:text-slate-300">{language === 'en' ? 'Month' : 'مہینہ'}</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-slate-700 dark:text-slate-300">{language === 'en' ? 'EMI' : 'ای ایم آئی'}</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-slate-700 dark:text-slate-300">{language === 'en' ? 'Principal' : 'اصل'}</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-slate-700 dark:text-slate-300">{language === 'en' ? 'Interest' : 'سود'}</th>
                  <th className="text-right py-3 px-4 text-sm font-bold text-slate-700 dark:text-slate-300">{language === 'en' ? 'Balance' : 'بقایا'}</th>
                </tr>
              </thead>
              <tbody>
                {schedule.slice(0, 12).map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="py-3 px-4 text-sm font-semibold text-slate-800 dark:text-white">{item.month}</td>
                    <td className="py-3 px-4 text-sm text-right">{formatCurrency(item.emi)}</td>
                    <td className="py-3 px-4 text-sm text-right text-indigo-600 dark:text-indigo-400 font-semibold">{formatCurrency(item.principal)}</td>
                    <td className="py-3 px-4 text-sm text-right text-orange-600 dark:text-orange-400 font-semibold">{formatCurrency(item.interest)}</td>
                    <td className="py-3 px-4 text-sm text-right">{formatCurrency(item.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoanCalculator;