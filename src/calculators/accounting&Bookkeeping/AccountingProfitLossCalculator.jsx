import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const AccountingProfitLossCalculator = ({ language, addToHistory, calculatorName }) => {
  const [revenue, setRevenue] = useState({ sales: 5000000, otherIncome: 200000 });
  const [cogs, setCogs] = useState(2500000);
  const [expenses, setExpenses] = useState({
    salaries: 800000,
    rent: 150000,
    utilities: 50000,
    marketing: 100000,
    depreciation: 80000,
    other: 70000
  });

  const totalRevenue = Object.values(revenue).reduce((a, b) => a + b, 0);
  const grossProfit = totalRevenue - cogs;
  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
  const netProfit = grossProfit - totalExpenses;
  const grossProfitMargin = (grossProfit / totalRevenue) * 100;
  const netProfitMargin = (netProfit / totalRevenue) * 100;

  const chartData = [
    { name: language === 'en' ? 'Revenue' : 'آمدنی', value: totalRevenue, fill: '#10B981' },
    { name: language === 'en' ? 'COGS' : 'COGS', value: cogs, fill: '#F59E0B' },
    { name: language === 'en' ? 'Expenses' : 'اخراجات', value: totalExpenses, fill: '#EF4444' },
    { name: language === 'en' ? 'Net Profit' : 'خالص منافع', value: Math.max(0, netProfit), fill: '#8B5CF6' }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="rose"
        formula="Net Profit = (Revenue - COGS - Operating Expenses)"
        variables={[
          { symbol: 'Revenue', nameEn: 'Total sales + other income', nameUrdu: 'کل فروخت + دیگر آمدنی' },
          { symbol: 'COGS', nameEn: 'Cost of Goods Sold (direct costs)', nameUrdu: 'فروخت شدہ سامان کی لاگت (براہ راست اخراجات)' },
          { symbol: 'Operating Expenses', nameEn: 'Salaries, rent, utilities, etc.', nameUrdu: 'تنخواہیں، کرایہ، یوٹیلیٹی، وغیرہ' }
        ]}
        example={[
          { labelEn: 'Revenue', labelUrdu: 'آمدنی', value: 'Rs. 52,00,000' },
          { labelEn: 'COGS', labelUrdu: 'COGS', value: 'Rs. 25,00,000' },
          { labelEn: 'Gross Profit', labelUrdu: 'مجموعی منافع', value: 'Rs. 27,00,000 (52%)' },
          { labelEn: 'Expenses', labelUrdu: 'اخراجات', value: 'Rs. 12,50,000' },
          { labelEn: 'Net Profit', labelUrdu: 'خالص منافع', value: 'Rs. 14,50,000 (28%)' }
        ]}
        terms={[
          {
            titleEn: 'Gross Profit',
            titleUrdu: 'مجموعی منافع',
            descEn: 'Revenue - COGS. Shows product/service profitability before operating expenses.',
            descUrdu: 'آمدنی - COGS۔ آپریٹنگ اخراجات سے پہلے پروڈکٹ/سروس کی منافع بخشی دکھاتا ہے۔'
          },
          {
            titleEn: 'Net Profit Margin',
            titleUrdu: 'خالص منافع کا مارجن',
            descEn: '(Net Profit ÷ Revenue) × 100. >10% good. >20% excellent. Varies by industry.',
            descUrdu: '(خالص منافع ÷ آمدنی) × 100۔ >10% اچھا۔ >20% بہترین۔ صنعت کے لحاظ سے مختلف۔'
          },
          {
            titleEn: 'COGS vs Operating Expenses',
            titleUrdu: 'COGS بمقابلہ آپریٹنگ اخراجات',
            descEn: 'COGS: Direct costs (materials, labor). OpEx: Indirect (rent, admin, marketing).',
            descUrdu: 'COGS: براہ راست اخراجات (مواد، مزدوری)۔ OpEx: بالواسطہ (کرایہ، انتظامی، مارکیٹنگ)۔'
          }
        ]}
        note={{
          en: 'P&L shows profitability over period (monthly/quarterly/yearly). Negative net profit = loss. Track trends, not just one period. Compare with industry benchmarks.',
          urdu: 'P&L مدت کے دوران منافع بخشی دکھاتا ہے (ماہانہ/سہ ماہی/سالانہ)۔ منفی خالص منافع = نقصان۔ رجحانات کو ٹریک کریں، صرف ایک مدت نہیں۔ صنعت کے معیارات سے موازنہ کریں۔'
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Income' : 'آمدنی'}</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold">{language === 'en' ? 'Sales Revenue' : 'فروخت کی آمدنی'}</label>
              <input type="number" value={revenue.sales} onChange={(e) => setRevenue({...revenue, sales: parseFloat(e.target.value) || 0})}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="text-sm font-semibold">{language === 'en' ? 'Other Income' : 'دیگر آمدنی'}</label>
              <input type="number" value={revenue.otherIncome} onChange={(e) => setRevenue({...revenue, otherIncome: parseFloat(e.target.value) || 0})}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div className="pt-3 border-t flex justify-between font-bold">
              <span>{language === 'en' ? 'Total Revenue' : 'کل آمدنی'}</span>
              <span className="text-green-600">{formatCurrency(totalRevenue)}</span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">{language === 'en' ? 'Cost of Goods Sold (COGS)' : 'فروخت شدہ سامان کی لاگت (COGS)'}</h4>
            <input type="number" value={cogs} onChange={(e) => setCogs(parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
          </div>

          <div className="mt-4 pt-3 border-t flex justify-between font-bold text-lg">
            <span>{language === 'en' ? 'Gross Profit' : 'مجموعی منافع'}</span>
            <span className="text-blue-600">{formatCurrency(grossProfit)}</span>
          </div>
          <div className="text-sm text-slate-500 mt-1">
            {grossProfitMargin.toFixed(1)}% {language === 'en' ? 'margin' : 'مارجن'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Operating Expenses' : 'آپریٹنگ اخراجات'}</h3>
          <div className="space-y-3">
            {Object.entries(expenses).map(([key, value]) => (
              <div key={key}>
                <label className="text-sm capitalize">{key}</label>
                <input type="number" value={value} onChange={(e) => setExpenses({...expenses, [key]: parseFloat(e.target.value) || 0})}
                  className="w-full px-3 py-1.5 border rounded-lg dark:bg-slate-700" />
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t flex justify-between font-bold">
            <span>{language === 'en' ? 'Total Expenses' : 'کل اخراجات'}</span>
            <span className="text-red-600">{formatCurrency(totalExpenses)}</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${netProfit >= 0 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-orange-600'} rounded-2xl p-8 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            {netProfit >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
            <span className="text-sm opacity-90">{language === 'en' ? 'Net Profit/Loss' : 'خالص منافع/نقصان'}</span>
          </div>
          <div className="text-5xl font-bold">{formatCurrency(Math.abs(netProfit))}</div>
          <div className="text-sm opacity-90 mt-2">
            {Math.abs(netProfitMargin).toFixed(1)}% {language === 'en' ? 'net margin' : 'خالص مارجن'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'P&L Chart' : 'P&L چارٹ'}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={12} tickFormatter={(v) => `${(v/100000).toFixed(0)}L`} />
              <Tooltip formatter={(v) => formatCurrency(v)} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <button onClick={() => {
        addToHistory({ calculatorName, result: `Net ${netProfit >= 0 ? 'Profit' : 'Loss'}: ${formatCurrency(Math.abs(netProfit))}` });
        toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
      }}
        className="max-w-6xl mx-auto w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold py-3 rounded-xl">
        {language === 'en' ? 'Save P&L Statement' : 'P&L بیان محفوظ کریں'}
      </button>
    </div>
  );
};

export default AccountingProfitLossCalculator;