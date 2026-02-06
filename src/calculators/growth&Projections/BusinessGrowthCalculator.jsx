import React, { useState, useMemo } from 'react';
import { TrendingUp, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const BusinessGrowthCalculator = ({ language, addToHistory, calculatorName }) => {
  const [currentRevenue, setCurrentRevenue] = useState(1000000);
  const [growthRate, setGrowthRate] = useState(20);
  const [years, setYears] = useState(5);
  const [compoundingPeriod, setCompoundingPeriod] = useState('yearly'); // yearly, quarterly, monthly

  // Compounding periods per year
  const periodsPerYear = {
    yearly: 1,
    quarterly: 4,
    monthly: 12
  };

  const n = periodsPerYear[compoundingPeriod];
  const r = growthRate / 100;

  // Generate growth projections
  const projections = useMemo(() => {
    const data = [];
    for (let year = 0; year <= years; year++) {
      const futureValue = currentRevenue * Math.pow(1 + r / n, n * year);
      const growth = year === 0 ? 0 : futureValue - currentRevenue * Math.pow(1 + r / n, n * (year - 1));
      
      data.push({
        year: year,
        yearLabel: `${language === 'en' ? 'Year' : 'سال'} ${year}`,
        revenue: futureValue,
        growth: growth,
        cumulativeGrowth: futureValue - currentRevenue
      });
    }
    return data;
  }, [currentRevenue, growthRate, years, n, language, r]);

  const finalRevenue = projections[years].revenue;
  const totalGrowth = finalRevenue - currentRevenue;
  const averageAnnualGrowth = totalGrowth / years;
  const growthMultiple = finalRevenue / currentRevenue;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="green"
        formula="Future Value = Present Value × (1 + r/n)^(n×t)"
        variables={[
          { symbol: 'PV', nameEn: 'Present Value (current revenue)', nameUrdu: 'موجودہ قیمت (موجودہ آمدنی)' },
          { symbol: 'r', nameEn: 'Annual growth rate (as decimal)', nameUrdu: 'سالانہ ترقی کی شرح (اعشاریہ میں)' },
          { symbol: 'n', nameEn: 'Compounding periods per year', nameUrdu: 'سال میں کمپاؤنڈنگ کی مدتیں' },
          { symbol: 't', nameEn: 'Time in years', nameUrdu: 'سالوں میں وقت' }
        ]}
        example={[
          { labelEn: 'Current Revenue', labelUrdu: 'موجودہ آمدنی', value: 'Rs. 10,00,000' },
          { labelEn: 'Growth Rate', labelUrdu: 'ترقی کی شرح', value: '20% per year' },
          { labelEn: 'Period', labelUrdu: 'مدت', value: '5 years' },
          { labelEn: 'Compounding', labelUrdu: 'کمپاؤنڈنگ', value: 'Yearly' },
          { labelEn: 'Year 5 Revenue', labelUrdu: 'سال 5 آمدنی', value: 'Rs. 24,88,320' },
          { labelEn: 'Total Growth', labelUrdu: 'کل ترقی', value: 'Rs. 14,88,320 (149%)' }
        ]}
        terms={[
          {
            titleEn: 'Compound Growth',
            titleUrdu: 'مرکب ترقی',
            descEn: 'Growth on growth. Each year grows on previous year\'s total. Much faster than linear growth.',
            descUrdu: 'ترقی پر ترقی۔ ہر سال پچھلے سال کی کل پر بڑھتا ہے۔ لکیری ترقی سے بہت تیز۔'
          },
          {
            titleEn: 'Realistic Growth Rates',
            titleUrdu: 'حقیقت پسندانہ ترقی کی شرحیں',
            descEn: 'Startups: 50-100%/year. SMEs: 15-30%/year. Mature: 5-10%/year. Plan conservatively.',
            descUrdu: 'اسٹارٹ اپس: 50-100%/سال۔ SMEs: 15-30%/سال۔ بالغ: 5-10%/سال۔ قدامت پسندی سے منصوبہ بندی کریں۔'
          },
          {
            titleEn: 'Rule of 72',
            titleUrdu: '72 کا اصول',
            descEn: 'Double time ≈ 72 ÷ growth%. At 20% growth, business doubles in ~3.6 years!',
            descUrdu: 'دگنا ہونے کا وقت ≈ 72 ÷ ترقی%۔ 20% ترقی پر، کاروبار ~3.6 سالوں میں دگنا ہو جاتا ہے!'
          }
        ]}
        note={{
          en: 'Growth projections are estimates. Actual results depend on market conditions, competition, execution. Use conservative estimates for planning. High growth rates are harder to sustain over time.',
          urdu: 'ترقی کی پیشن گوئیاں تخمینے ہیں۔ اصل نتائج مارکیٹ کی حالت، مقابلے، عملدرآمد پر منحصر ہیں۔ منصوبہ بندی کے لیے قدامت پسندانہ تخمینے استعمال کریں۔ اعلیٰ ترقی کی شرحوں کو وقت کے ساتھ برقرار رکھنا مشکل ہے۔'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              {language === 'en' ? 'Growth Parameters' : 'ترقی کے پیرامیٹرز'}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Current Revenue (Rs.)' : 'موجودہ آمدنی (Rs.)'}
                </label>
                <input type="range" min="100000" max="10000000" step="100000" value={currentRevenue}
                  onChange={(e) => setCurrentRevenue(parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg appearance-none cursor-pointer accent-green-600" />
                <input type="number" value={currentRevenue} onChange={(e) => setCurrentRevenue(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Annual Growth Rate (%)' : 'سالانہ ترقی کی شرح (%)'}
                </label>
                <input type="range" min="5" max="100" step="5" value={growthRate}
                  onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg appearance-none cursor-pointer accent-emerald-600" />
                <input type="number" value={growthRate} step="5" onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Projection Period (Years)' : 'پیشن گوئی کی مدت (سال)'}
                </label>
                <input type="range" min="1" max="10" value={years}
                  onChange={(e) => setYears(parseFloat(e.target.value))}
                  className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                <input type="number" value={years} onChange={(e) => setYears(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Compounding Period' : 'کمپاؤنڈنگ مدت'}
                </label>
                <select value={compoundingPeriod} onChange={(e) => setCompoundingPeriod(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600">
                  <option value="yearly">{language === 'en' ? 'Yearly' : 'سالانہ'}</option>
                  <option value="quarterly">{language === 'en' ? 'Quarterly' : 'سہ ماہی'}</option>
                  <option value="monthly">{language === 'en' ? 'Monthly' : 'ماہانہ'}</option>
                </select>
              </div>

              <button onClick={() => {
                addToHistory({ calculatorName, result: `${growthRate}% growth: ${formatCurrency(currentRevenue)} → ${formatCurrency(finalRevenue)}` });
                toast.success(language === 'en' ? 'Saved to history!' : 'تاریخ میں محفوظ!');
              }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg">
                {language === 'en' ? 'Calculate Growth' : 'ترقی کا حساب'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">
                {language === 'en' ? 'Final Revenue' : 'حتمی آمدنی'}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(finalRevenue)}</div>
              <div className="text-xs opacity-75 mt-1">
                {language === 'en' ? `Year ${years}` : `سال ${years}`}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">
                {language === 'en' ? 'Total Growth' : 'کل ترقی'}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(totalGrowth)}</div>
              <div className="text-xs opacity-75 mt-1">
                {((totalGrowth / currentRevenue) * 100).toFixed(0)}% {language === 'en' ? 'increase' : 'اضافہ'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">
                {language === 'en' ? 'Growth Multiple' : 'ترقی کا ضارب'}
              </div>
              <div className="text-3xl font-bold">{growthMultiple.toFixed(2)}x</div>
              <div className="text-xs opacity-75 mt-1">
                {language === 'en' ? 'times larger' : 'گنا بڑا'}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Revenue Growth Projection' : 'آمدنی میں ترقی کی پیشن گوئی'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={projections}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="yearLabel" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={12} tickFormatter={(value) => `${(value / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} 
                  name={language === 'en' ? 'Revenue' : 'آمدنی'} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Annual Growth Breakdown' : 'سالانہ ترقی کی تفصیل'}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={projections.slice(1)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="yearLabel" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={12} tickFormatter={(value) => `${(value / 100000).toFixed(0)}L`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Bar dataKey="growth" fill="#3B82F6" name={language === 'en' ? 'Year Growth' : 'سال کی ترقی'} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Year-by-Year Breakdown' : 'سال بہ سال تفصیل'}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th className="text-left p-3">{language === 'en' ? 'Year' : 'سال'}</th>
                    <th className="text-right p-3">{language === 'en' ? 'Revenue' : 'آمدنی'}</th>
                    <th className="text-right p-3">{language === 'en' ? 'Growth' : 'ترقی'}</th>
                    <th className="text-right p-3">{language === 'en' ? 'Growth %' : 'ترقی %'}</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.map((proj, idx) => (
                    <tr key={idx} className="border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                      <td className="p-3 font-semibold">{proj.year}</td>
                      <td className="p-3 text-right font-bold text-green-600">{formatCurrency(proj.revenue)}</td>
                      <td className="p-3 text-right text-blue-600">{formatCurrency(proj.growth)}</td>
                      <td className="p-3 text-right">
                        {idx === 0 ? '-' : `${((proj.growth / projections[idx-1].revenue) * 100).toFixed(1)}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <h4 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              {language === 'en' ? '💡 Growth Insights' : '💡 ترقی کی بصیرتیں'}
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-green-700 dark:text-green-400">
              <div>
                <div className="text-xs opacity-75">{language === 'en' ? 'Avg. Annual Growth' : 'اوسط سالانہ ترقی'}</div>
                <div className="text-xl font-bold">{formatCurrency(averageAnnualGrowth)}</div>
              </div>
              <div>
                <div className="text-xs opacity-75">{language === 'en' ? 'Doubling Time' : 'دگنا ہونے کا وقت'}</div>
                <div className="text-xl font-bold">{(72 / growthRate).toFixed(1)} {language === 'en' ? 'years' : 'سال'}</div>
              </div>
              <div>
                <div className="text-xs opacity-75">{language === 'en' ? 'CAGR' : 'CAGR'}</div>
                <div className="text-xl font-bold">{growthRate}%</div>
              </div>
              <div>
                <div className="text-xs opacity-75">{language === 'en' ? 'Compounding' : 'کمپاؤنڈنگ'}</div>
                <div className="text-xl font-bold capitalize">{compoundingPeriod}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessGrowthCalculator;