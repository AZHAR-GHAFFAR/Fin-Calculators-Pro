import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const ROICalculator = ({ language, addToHistory, calculatorName }) => {
  const [initialInvestment, setInitialInvestment] = useState(1000000);
  const [finalValue, setFinalValue] = useState(1500000);
  const [additionalCosts, setAdditionalCosts] = useState(50000);
  const [timePeriod, setTimePeriod] = useState(12);

  const totalCost = initialInvestment + additionalCosts;
  const netProfit = finalValue - totalCost;
  const roi = ((netProfit / totalCost) * 100);
  const annualizedROI = ((Math.pow(finalValue / totalCost, 12 / timePeriod) - 1) * 100);

  const pieData = [
    { name: language === 'en' ? 'Initial Investment' : 'ابتدائی سرمایہ کاری', value: initialInvestment, color: '#3B82F6' },
    { name: language === 'en' ? 'Additional Costs' : 'اضافی لاگت', value: additionalCosts, color: '#F59E0B' },
    { name: language === 'en' ? 'Net Profit' : 'خالص منافع', value: Math.max(netProfit, 0), color: '#10B981' }
  ];

  const barData = [
    {
      category: language === 'en' ? 'Total Cost' : 'کل لاگت',
      amount: totalCost
    },
    {
      category: language === 'en' ? 'Final Value' : 'حتمی قیمت',
      amount: finalValue
    },
    {
      category: language === 'en' ? 'Net Profit' : 'خالص منافع',
      amount: netProfit
    }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="blue"
        formula="ROI = ((Final Value - Total Investment) / Total Investment) × 100"
        variables={[
          { symbol: 'Total Investment', nameEn: 'Initial Investment + Additional Costs', nameUrdu: 'ابتدائی سرمایہ کاری + اضافی لاگت' },
          { symbol: 'Final Value', nameEn: 'Current/Exit Value', nameUrdu: 'موجودہ/نکاسی قیمت' },
          { symbol: 'Net Profit', nameEn: 'Final Value - Total Investment', nameUrdu: 'حتمی قیمت - کل سرمایہ کاری' }
        ]}
        example={[
          { labelEn: 'Initial Investment', labelUrdu: 'ابتدائی سرمایہ کاری', value: 'Rs. 10,00,000' },
          { labelEn: 'Additional Costs', labelUrdu: 'اضافی لاگت', value: 'Rs. 50,000' },
          { labelEn: 'Final Value', labelUrdu: 'حتمی قیمت', value: 'Rs. 15,00,000' },
          { labelEn: 'Net Profit', labelUrdu: 'خالص منافع', value: 'Rs. 4,50,000' },
          { labelEn: 'ROI', labelUrdu: 'آر او آئی', value: '42.86%' },
          { labelEn: 'Period', labelUrdu: 'مدت', value: '12 months' }
        ]}
        terms={[
          {
            titleEn: 'ROI Meaning',
            titleUrdu: 'آر او آئی کا مطلب',
            descEn: 'Return on Investment - measures profitability. Higher ROI = better investment.',
            descUrdu: 'سرمایہ کاری پر واپسی - منافع کی پیمائش۔ زیادہ آر او آئی = بہتر سرمایہ کاری۔'
          },
          {
            titleEn: 'Annualized ROI',
            titleUrdu: 'سالانہ آر او آئی',
            descEn: 'ROI adjusted for time period. Allows comparison of different duration investments.',
            descUrdu: 'وقت کی مدت کے لیے ایڈجسٹ کردہ آر او آئی۔ مختلف مدت کی سرمایہ کاری کا موازنہ کرنے کی اجازت دیتا ہے۔'
          },
          {
            titleEn: 'Good ROI',
            titleUrdu: 'اچھا آر او آئی',
            descEn: 'Stock market: 10-15% annually. Real estate: 8-12%. Business: 15-30% depending on risk.',
            descUrdu: 'اسٹاک مارکیٹ: سالانہ 10-15%۔ رئیل اسٹیٹ: 8-12%۔ کاروبار: خطرے پر منحصر 15-30%۔'
          }
        ]}
        note={{
          en: 'ROI doesn\'t account for risk, time value of money, or opportunity cost. Use alongside other metrics for complete analysis.',
          urdu: 'آر او آئی خطرہ، پیسے کی وقت کی قیمت، یا موقع کی لاگت کا حساب نہیں لگاتا۔ مکمل تجزیہ کے لیے دیگر میٹرکس کے ساتھ استعمال کریں۔'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-cyan-600" />
              {language === 'en' ? 'Investment Details' : 'سرمایہ کاری کی تفصیلات'}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Initial Investment (Rs.)' : 'ابتدائی سرمایہ کاری (Rs.)'}</label>
                <input type="range" min="100000" max="10000000" step="50000" value={initialInvestment}
                  onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
                  className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                <input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Final/Current Value (Rs.)' : 'حتمی/موجودہ قیمت (Rs.)'}</label>
                <input type="range" min="100000" max="20000000" step="50000" value={finalValue}
                  onChange={(e) => setFinalValue(parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg appearance-none cursor-pointer accent-green-600" />
                <input type="number" value={finalValue} onChange={(e) => setFinalValue(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Additional Costs (Rs.)' : 'اضافی لاگت (Rs.)'}</label>
                <input type="number" value={additionalCosts} onChange={(e) => setAdditionalCosts(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
                <p className="text-xs text-slate-500 mt-1">{language === 'en' ? 'Fees, taxes, maintenance' : 'فیس، ٹیکس، دیکھ بھال'}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Time Period (Months)' : 'مدت (مہینے)'}</label>
                <input type="number" min="1" max="120" value={timePeriod} onChange={(e) => setTimePeriod(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <button onClick={() => {
                addToHistory({ calculatorName, result: `${roi.toFixed(2)}% ROI` });
                toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
              }}
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold py-3 rounded-xl shadow-lg">
                {language === 'en' ? 'Calculate ROI' : 'آر او آئی کا حساب'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`bg-gradient-to-br ${netProfit >= 0 ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} rounded-2xl p-6 text-white shadow-lg`}>
              <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'ROI' : 'آر او آئی'}</div>
              <div className="text-4xl font-bold">{roi.toFixed(2)}%</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Annualized ROI' : 'سالانہ آر او آئی'}</div>
              <div className="text-4xl font-bold">{annualizedROI.toFixed(2)}%</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Net Profit' : 'خالص منافع'}</div>
              <div className="text-3xl font-bold">{formatCurrency(netProfit)}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Investment Breakdown' : 'سرمایہ کاری کی تفصیل'}</h3>
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

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Comparison' : 'موازنہ'}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" fontSize={11} />
                  <YAxis fontSize={12} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="amount" fill="#4ECDC4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Investment Summary' : 'سرمایہ کاری کا خلاصہ'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Total Investment' : 'کل سرمایہ کاری'}</span>
                <span className="font-bold">{formatCurrency(totalCost)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Current Value' : 'موجودہ قیمت'}</span>
                <span className="font-bold">{formatCurrency(finalValue)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Time Period' : 'مدت'}</span>
                <span className="font-bold">{timePeriod} {language === 'en' ? 'months' : 'مہینے'}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-bold">{language === 'en' ? 'Status' : 'حالت'}</span>
                <span className={`font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {netProfit >= 0 ? (language === 'en' ? '✅ Profit' : '✅ منافع') : (language === 'en' ? '❌ Loss' : '❌ نقصان')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROICalculator;