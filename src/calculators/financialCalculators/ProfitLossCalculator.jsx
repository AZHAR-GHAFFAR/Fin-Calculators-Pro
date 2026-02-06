
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency, currencySymbol } from '../../utils/currency';

const ProfitLossCalculator = ({ language, addToHistory, calculatorName }) => {
  const [revenue, setRevenue] = useState(1000000);
  const [costOfGoods, setCostOfGoods] = useState(400000);
  const [operatingExpenses, setOperatingExpenses] = useState(200000);
  const [otherIncome, setOtherIncome] = useState(50000);
  const [taxes, setTaxes] = useState(50000);

  const grossProfit = revenue - costOfGoods;
  const operatingProfit = grossProfit - operatingExpenses;
  const netProfit = operatingProfit + otherIncome - taxes;
  
  const grossMargin = (grossProfit / revenue) * 100;
  const netMargin = (netProfit / revenue) * 100;

  const isProfit = netProfit >= 0;

  const pieData = [
    { name: language === 'en' ? 'COGS' : 'سامان کی لاگت', value: costOfGoods, color: '#EF4444' },
    { name: language === 'en' ? 'Operating' : 'آپریٹنگ', value: operatingExpenses, color: '#F59E0B' },
    { name: language === 'en' ? 'Taxes' : 'ٹیکس', value: taxes, color: '#8B5CF6' },
    { name: language === 'en' ? 'Net Profit' : 'خالص منافع', value: Math.max(netProfit, 0), color: '#10B981' }
  ];

  return (
    <div className="space-y-8">

      <InfoPanel
  language={language}
  colorScheme="green"
  formula="Net Profit = Revenue - COGS - Operating Expenses + Other Income - Taxes"
  variables={[
    { symbol: 'COGS', nameEn: 'Cost of Goods Sold', nameUrdu: 'فروخت شدہ سامان کی لاگت' },
    { symbol: 'Gross Profit', nameEn: 'Revenue - COGS', nameUrdu: 'آمدنی - سامان کی لاگت' },
    { symbol: 'Net Profit', nameEn: 'Final Profit after all expenses', nameUrdu: 'تمام اخراجات کے بعد حتمی منافع' }
  ]}
  example={[
    { labelEn: 'Revenue', labelUrdu: 'آمدنی', value: 'Rs. 10,00,000' },
    { labelEn: 'COGS', labelUrdu: 'سامان کی لاگت', value: 'Rs. 4,00,000' },
    { labelEn: 'Gross Profit', labelUrdu: 'مجموعی منافع', value: 'Rs. 6,00,000 (60%)' },
    { labelEn: 'Operating Expenses', labelUrdu: 'آپریٹنگ اخراجات', value: 'Rs. 2,00,000' },
    { labelEn: 'Net Profit', labelUrdu: 'خالص منافع', value: 'Rs. 4,00,000 (40%)' }
  ]}
  terms={[
    {
      titleEn: 'Gross Margin',
      titleUrdu: 'مجموعی مارجن',
      descEn: 'Percentage of revenue left after COGS. Higher is better.',
      descUrdu: 'سامان کی لاگت کے بعد بچی آمدنی کا فیصد۔ زیادہ بہتر ہے۔'
    },
    {
      titleEn: 'Net Margin',
      titleUrdu: 'خالص مارجن',
      descEn: 'Final profit percentage. Shows actual business profitability.',
      descUrdu: 'حتمی منافع کا فیصد۔ کاروبار کی اصل منافع بخشی دکھاتا ہے۔'
    },
    {
      titleEn: 'Operating Expenses',
      titleUrdu: 'آپریٹنگ اخراجات',
      descEn: 'Rent, salaries, utilities - costs to run business.',
      descUrdu: 'کرایہ، تنخواہیں، بجلی - کاروبار چلانے کی لاگت۔'
    }
  ]}
  note={{
    en: 'Retail businesses in Pakistan typically have 20-40% gross margin and 5-15% net margin. Service businesses can achieve higher margins.',
    urdu: 'پاکستان میں ریٹیل کاروبار عام طور پر 20-40% مجموعی مارجن اور 5-15% خالص مارجن رکھتے ہیں۔ سروس کاروبار زیادہ مارجن حاصل کر سکتے ہیں۔'
  }}
/>

    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold mb-6">{language === 'en' ? 'Income Statement' : 'آمدنی کا بیان'}</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Revenue (${currencySymbol})` : `آمدنی (${currencySymbol})`}</label>
              <input type="number" value={revenue} onChange={(e) => setRevenue(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Cost of Goods Sold (${currencySymbol})` : `سامان کی لاگت (${currencySymbol})`}</label>
              <input type="number" value={costOfGoods} onChange={(e) => setCostOfGoods(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Operating Expenses (${currencySymbol})` : `آپریٹنگ اخراجات (${currencySymbol})`}</label>
              <input type="number" value={operatingExpenses} onChange={(e) => setOperatingExpenses(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Other Income (${currencySymbol})` : `دیگر آمدنی (${currencySymbol})`}</label>
              <input type="number" value={otherIncome} onChange={(e) => setOtherIncome(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Taxes (${currencySymbol})` : `ٹیکس (${currencySymbol})`}</label>
              <input type="number" value={taxes} onChange={(e) => setTaxes(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${formatCurrency(netProfit)} ${isProfit ? 'Profit' : 'Loss'}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className={`w-full ${isProfit ? 'bg-gradient-to-r from-green-600 to-emerald-600' : 'bg-gradient-to-r from-red-600 to-orange-600'} text-white font-bold py-3 rounded-xl shadow-lg`}>
              {language === 'en' ? 'Calculate P&L' : 'حساب لگائیں'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`bg-gradient-to-br ${isProfit ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} rounded-2xl p-8 text-white shadow-lg text-center`}>
            {isProfit ? <TrendingUp className="w-12 h-12 mx-auto mb-4" /> : <TrendingDown className="w-12 h-12 mx-auto mb-4" />}
            <div className="text-sm font-semibold opacity-90 mb-2">{isProfit ? (language === 'en' ? 'Net Profit' : 'خالص منافع') : (language === 'en' ? 'Net Loss' : 'خالص نقصان')}</div>
            <div className="text-5xl font-bold">{formatCurrency(Math.abs(netProfit))}</div>
            <div className="text-sm mt-2 opacity-75">{language === 'en' ? 'Net Margin' : 'خالص مارجن'}: {netMargin.toFixed(2)}%</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Financial Summary' : 'مالی خلاصہ'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Revenue' : 'آمدنی'}</span>
                <span className="font-bold text-green-600">{formatCurrency(revenue)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Gross Profit' : 'مجموعی منافع'}</span>
                <span className="font-bold">{formatCurrency(grossProfit)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Operating Profit' : 'آپریٹنگ منافع'}</span>
                <span className="font-bold">{formatCurrency(operatingProfit)}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-sm font-bold">{language === 'en' ? 'Net Profit' : 'خالص منافع'}</span>
                <span className={`font-bold text-lg ${isProfit ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(netProfit)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Expense Breakdown' : 'اخراجات کی تفصیل'}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
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
      </div>
    </div>
    </div>
  );
};

export default ProfitLossCalculator;