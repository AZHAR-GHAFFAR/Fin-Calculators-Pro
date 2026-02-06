import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const RevenueCalculator = ({ language, addToHistory, calculatorName }) => {
  const [pricePerUnit, setPricePerUnit] = useState(500);
  const [unitsSoldPerMonth, setUnitsSoldPerMonth] = useState(200);
  const [growthRate, setGrowthRate] = useState(5);
  const [timePeriod, setTimePeriod] = useState(12);

  const generateProjection = () => {
    const data = [];
    let currentUnits = unitsSoldPerMonth;
    
    for (let month = 1; month <= timePeriod; month++) {
      const revenue = currentUnits * pricePerUnit;
      data.push({
        month: `${language === 'en' ? 'Month' : 'ماہ'} ${month}`,
        revenue: revenue,
        units: Math.round(currentUnits)
      });
      currentUnits = currentUnits * (1 + growthRate / 100);
    }
    return data;
  };

  const projection = useMemo(() => generateProjection(), [pricePerUnit, unitsSoldPerMonth, growthRate, timePeriod]);
  
  const totalRevenue = projection.reduce((sum, item) => sum + item.revenue, 0);
  const averageMonthlyRevenue = totalRevenue / timePeriod;
  const firstMonthRevenue = projection[0]?.revenue || 0;
  const lastMonthRevenue = projection[projection.length - 1]?.revenue || 0;
  const totalGrowth = ((lastMonthRevenue - firstMonthRevenue) / firstMonthRevenue) * 100;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="blue"
        formula="Revenue = Price per Unit × Units Sold  |  Projected Revenue = Current × (1 + Growth Rate)ⁿ"
        variables={[
          { symbol: 'Price per Unit', nameEn: 'Selling price of one unit', nameUrdu: 'ایک یونٹ کی فروخت قیمت' },
          { symbol: 'Units Sold', nameEn: 'Number of units sold per month', nameUrdu: 'ماہانہ فروخت شدہ یونٹس کی تعداد' },
          { symbol: 'Growth Rate', nameEn: 'Monthly growth percentage', nameUrdu: 'ماہانہ اضافے کا فیصد' },
          { symbol: 'n', nameEn: 'Number of months', nameUrdu: 'مہینوں کی تعداد' }
        ]}
        example={[
          { labelEn: 'Price per Unit', labelUrdu: 'فی یونٹ قیمت', value: 'Rs. 500' },
          { labelEn: 'Units Sold/Month', labelUrdu: 'یونٹس/ماہ', value: '200' },
          { labelEn: 'Growth Rate', labelUrdu: 'اضافے کی شرح', value: '5% monthly' },
          { labelEn: 'Period', labelUrdu: 'مدت', value: '12 months' },
          { labelEn: 'Month 1 Revenue', labelUrdu: 'ماہ 1 آمدنی', value: 'Rs. 1,00,000' },
          { labelEn: 'Month 12 Revenue', labelUrdu: 'ماہ 12 آمدنی', value: 'Rs. 1,79,586' },
          { labelEn: 'Total Revenue', labelUrdu: 'کل آمدنی', value: 'Rs. 17,12,975' }
        ]}
        terms={[
          {
            titleEn: 'Revenue vs Profit',
            titleUrdu: 'آمدنی بمقابلہ منافع',
            descEn: 'Revenue is total sales. Profit = Revenue - Costs. Revenue doesn\'t mean profit!',
            descUrdu: 'آمدنی کل فروخت ہے۔ منافع = آمدنی - لاگت۔ آمدنی کا مطلب منافع نہیں!'
          },
          {
            titleEn: 'Growth Rate',
            titleUrdu: 'اضافے کی شرح',
            descEn: 'Realistic monthly growth: New business 5-10%, Established 2-5%, Mature 0-2%.',
            descUrdu: 'حقیقی ماہانہ اضافہ: نیا کاروبار 5-10%، قائم شدہ 2-5%، پختہ 0-2%۔'
          },
          {
            titleEn: 'Revenue Projections',
            titleUrdu: 'آمدنی کی پیشن گوئیاں',
            descEn: 'Use for business planning, investor pitch, loan applications, budget forecasting.',
            descUrdu: 'کاروباری منصوبہ بندی، سرمایہ کار پچ، قرض کی درخواستوں، بجٹ کی پیشن گوئی کے لیے استعمال کریں۔'
          }
        ]}
        note={{
          en: 'These are projections based on assumed growth rate. Actual results may vary due to market conditions, competition, and other factors.',
          urdu: 'یہ فرض کردہ اضافے کی شرح پر مبنی پیشن گوئیاں ہیں۔ مارکیٹ کے حالات، مقابلہ اور دیگر عوامل کی وجہ سے اصل نتائج مختلف ہو سکتے ہیں۔'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-600" />
              {language === 'en' ? 'Revenue Inputs' : 'آمدنی کی تفصیلات'}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Price per Unit (Rs.)' : 'فی یونٹ قیمت (Rs.)'}</label>
                <input type="range" min="10" max="10000" step="10" value={pricePerUnit}
                  onChange={(e) => setPricePerUnit(parseFloat(e.target.value))}
                  className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                <input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Units Sold per Month' : 'ماہانہ فروخت شدہ یونٹس'}</label>
                <input type="range" min="10" max="10000" step="10" value={unitsSoldPerMonth}
                  onChange={(e) => setUnitsSoldPerMonth(parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg appearance-none cursor-pointer accent-green-600" />
                <input type="number" value={unitsSoldPerMonth} onChange={(e) => setUnitsSoldPerMonth(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Monthly Growth Rate (%)' : 'ماہانہ اضافے کی شرح (%)'}</label>
                <input type="range" min="0" max="20" step="0.5" value={growthRate}
                  onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-100 dark:bg-purple-900 rounded-lg appearance-none cursor-pointer accent-purple-600" />
                <input type="number" value={growthRate} step="0.5" onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Projection Period (Months)' : 'پیشن گوئی کی مدت (مہینے)'}</label>
                <input type="range" min="3" max="36" step="1" value={timePeriod}
                  onChange={(e) => setTimePeriod(parseFloat(e.target.value))}
                  className="w-full h-2 bg-orange-100 dark:bg-orange-900 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                <input type="number" value={timePeriod} onChange={(e) => setTimePeriod(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <button onClick={() => {
                addToHistory({ calculatorName, result: `${formatCurrency(totalRevenue)} Total Revenue` });
                toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
              }}
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold py-3 rounded-xl shadow-lg">
                {language === 'en' ? 'Calculate Revenue' : 'آمدنی کا حساب'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Total Revenue' : 'کل آمدنی'}</div>
              <div className="text-3xl font-bold">{formatCurrency(totalRevenue)}</div>
              <div className="text-xs opacity-75 mt-1">{timePeriod} {language === 'en' ? 'months' : 'مہینے'}</div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Avg Monthly' : 'اوسط ماہانہ'}</div>
              <div className="text-3xl font-bold">{formatCurrency(averageMonthlyRevenue)}</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Total Growth' : 'کل اضافہ'}</div>
              <div className="text-3xl font-bold">{totalGrowth.toFixed(1)}%</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Revenue Projection' : 'آمدنی کی پیشن گوئی'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projection}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} name={language === 'en' ? 'Revenue' : 'آمدنی'} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Units Sold Growth' : 'فروخت شدہ یونٹس میں اضافہ'}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={projection}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="units" fill="#10B981" name={language === 'en' ? 'Units' : 'یونٹس'} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-4">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{language === 'en' ? 'First Month' : 'پہلا مہینہ'}</div>
              <div className="text-2xl font-bold text-cyan-600">{formatCurrency(firstMonthRevenue)}</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{language === 'en' ? 'Last Month' : 'آخری مہینہ'}</div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(lastMonthRevenue)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueCalculator;