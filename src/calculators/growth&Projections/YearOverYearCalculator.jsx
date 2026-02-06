import React, { useState } from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const YearOverYearCalculator = ({ language, addToHistory, calculatorName }) => {
  const [currentYear, setCurrentYear] = useState(2024);
  const [currentValue, setCurrentValue] = useState(5000000);
  const [previousValue, setPreviousValue] = useState(4000000);
  const [metricType, setMetricType] = useState('revenue');
  const [quarters, setQuarters] = useState(true);

  // Calculate YoY metrics
  const yoyChange = currentValue - previousValue;
  const yoyPercentage = ((yoyChange / previousValue) * 100);
  const growthMultiple = currentValue / previousValue;

  // Quarterly breakdown (simplified)
  const quarterlyData = quarters ? [
    { 
      quarter: 'Q1',
      current: currentValue * 0.22,
      previous: previousValue * 0.23,
      yoy: ((currentValue * 0.22 - previousValue * 0.23) / (previousValue * 0.23) * 100)
    },
    { 
      quarter: 'Q2',
      current: currentValue * 0.24,
      previous: previousValue * 0.24,
      yoy: ((currentValue * 0.24 - previousValue * 0.24) / (previousValue * 0.24) * 100)
    },
    { 
      quarter: 'Q3',
      current: currentValue * 0.25,
      previous: previousValue * 0.25,
      yoy: ((currentValue * 0.25 - previousValue * 0.25) / (previousValue * 0.25) * 100)
    },
    { 
      quarter: 'Q4',
      current: currentValue * 0.29,
      previous: previousValue * 0.28,
      yoy: ((currentValue * 0.29 - previousValue * 0.28) / (previousValue * 0.28) * 100)
    }
  ] : [];

  const yearData = [
    {
      year: (currentYear - 1).toString(),
      value: previousValue,
      label: language === 'en' ? `${currentYear - 1}` : `${currentYear - 1}`
    },
    {
      year: currentYear.toString(),
      value: currentValue,
      label: language === 'en' ? `${currentYear}` : `${currentYear}`
    }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="cyan"
        formula="YoY Growth % = ((Current Year - Previous Year) ÷ Previous Year) × 100"
        variables={[
          { symbol: 'YoY Change', nameEn: 'Current Year - Previous Year', nameUrdu: 'موجودہ سال - پچھلا سال' },
          { symbol: 'YoY %', nameEn: 'Percentage change from last year', nameUrdu: 'پچھلے سال سے فیصد تبدیلی' },
          { symbol: 'CAGR', nameEn: 'Compound Annual Growth Rate', nameUrdu: 'مرکب سالانہ ترقی کی شرح' }
        ]}
        example={[
          { labelEn: 'Previous Year', labelUrdu: 'پچھلا سال', value: '2023: Rs. 40,00,000' },
          { labelEn: 'Current Year', labelUrdu: 'موجودہ سال', value: '2024: Rs. 50,00,000' },
          { labelEn: 'YoY Change', labelUrdu: 'YoY تبدیلی', value: 'Rs. 10,00,000' },
          { labelEn: 'YoY Growth', labelUrdu: 'YoY ترقی', value: '+25%' },
          { labelEn: 'Growth Multiple', labelUrdu: 'ترقی کا ضارب', value: '1.25x' }
        ]}
        terms={[
          {
            titleEn: 'Year-over-Year (YoY)',
            titleUrdu: 'سال بہ سال (YoY)',
            descEn: 'Compares same period in different years. Eliminates seasonal effects. Standard business metric.',
            descUrdu: 'مختلف سالوں میں ایک ہی مدت کا موازنہ کرتا ہے۔ موسمی اثرات کو ختم کرتا ہے۔ معیاری کاروباری میٹرک۔'
          },
          {
            titleEn: 'Why YoY Matters',
            titleUrdu: 'YoY کیوں اہم ہے',
            descEn: 'Shows real growth after accounting for seasonality. Used by investors, analysts. More reliable than month-to-month.',
            descUrdu: 'موسمیت کے بعد حقیقی ترقی دکھاتا ہے۔ سرمایہ کاروں، تجزیہ کاروں کے ذریعے استعمال۔ مہینہ بہ مہینہ سے زیادہ قابل اعتماد۔'
          },
          {
            titleEn: 'Good YoY Growth',
            titleUrdu: 'اچھی YoY ترقی',
            descEn: 'Startups: 100%+. SMEs: 20-50%. Established: 10-20%. Negative YoY = declining business.',
            descUrdu: 'اسٹارٹ اپس: 100%+۔ SMEs: 20-50%۔ قائم شدہ: 10-20%۔ منفی YoY = گرتا کاروبار۔'
          }
        ]}
        note={{
          en: 'YoY comparison most meaningful for mature businesses with full year data. New businesses (<1 year) should focus on month-over-month growth. Compare with industry benchmarks for context.',
          urdu: 'YoY موازنہ مکمل سال کے ڈیٹا کے ساتھ بالغ کاروباروں کے لیے سب سے زیادہ معنی خیز ہے۔ نئے کاروباروں (<1 سال) کو مہینہ بہ مہینہ ترقی پر توجہ دینی چاہیے۔ سیاق و سباق کے لیے صنعت کے معیار سے موازنہ کریں۔'
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-600" />
            {language === 'en' ? 'Year Comparison' : 'سال کا موازنہ'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Current Year' : 'موجودہ سال'}</label>
              <input type="number" value={currentYear} onChange={(e) => setCurrentYear(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Metric Type' : 'میٹرک کی قسم'}</label>
              <select value={metricType} onChange={(e) => setMetricType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="revenue">{language === 'en' ? 'Revenue' : 'آمدنی'}</option>
                <option value="profit">{language === 'en' ? 'Profit' : 'منافع'}</option>
                <option value="customers">{language === 'en' ? 'Customers' : 'گاہک'}</option>
                <option value="sales">{language === 'en' ? 'Sales' : 'فروخت'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? `${currentYear} Value (Rs.)` : `${currentYear} قیمت (Rs.)`}
              </label>
              <input type="number" value={currentValue} onChange={(e) => setCurrentValue(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? `${currentYear - 1} Value (Rs.)` : `${currentYear - 1} قیمت (Rs.)`}
              </label>
              <input type="number" value={previousValue} onChange={(e) => setPreviousValue(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" checked={quarters} onChange={(e) => setQuarters(e.target.checked)}
                className="w-5 h-5" />
              <label className="text-sm font-semibold">
                {language === 'en' ? 'Show Quarterly Breakdown' : 'سہ ماہی تفصیل دکھائیں'}
              </label>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `YoY: ${yoyPercentage > 0 ? '+' : ''}${yoyPercentage.toFixed(1)}% (${formatCurrency(yoyChange)})` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate YoY' : 'YoY کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className={`bg-gradient-to-br ${yoyPercentage >= 0 ? 'from-green-500 to-emerald-600' : 'from-red-500 to-orange-600'} rounded-2xl p-6 text-white`}>
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'YoY Growth' : 'YoY ترقی'}</div>
              <div className="text-4xl font-bold">
                {yoyPercentage > 0 ? '+' : ''}{yoyPercentage.toFixed(1)}%
              </div>
              <div className="text-xs opacity-75 mt-1 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                {yoyPercentage >= 0 ? (language === 'en' ? 'Growing' : 'بڑھ رہا') : (language === 'en' ? 'Declining' : 'گر رہا')}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Change' : 'تبدیلی'}</div>
              <div className="text-3xl font-bold">{formatCurrency(Math.abs(yoyChange))}</div>
              <div className="text-xs opacity-75 mt-1">{growthMultiple.toFixed(2)}x</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Comparison Summary' : 'موازنے کا خلاصہ'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{currentYear - 1} {language === 'en' ? 'Value' : 'قیمت'}</span>
                <span className="font-bold">{formatCurrency(previousValue)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{currentYear} {language === 'en' ? 'Value' : 'قیمت'}</span>
                <span className="font-bold">{formatCurrency(currentValue)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Absolute Change' : 'مطلق تبدیلی'}</span>
                <span className={`font-bold ${yoyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {yoyChange >= 0 ? '+' : ''}{formatCurrency(yoyChange)}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Percentage Change' : 'فیصد تبدیلی'}</span>
                <span className={`font-bold ${yoyPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {yoyPercentage > 0 ? '+' : ''}{yoyPercentage.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Growth Multiple' : 'ترقی کا ضارب'}</span>
                <span className="font-bold text-xl text-cyan-600">{growthMultiple.toFixed(2)}x</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Year Comparison' : 'سال کا موازنہ'}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" fontSize={12} />
              <YAxis fontSize={12} tickFormatter={(value) => `${(value/100000).toFixed(0)}L`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="value" fill="#06B6D4" radius={[8, 8, 0, 0]} name={language === 'en' ? metricType : metricType} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {quarters && quarterlyData.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Quarterly YoY Growth' : 'سہ ماہی YoY ترقی'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={quarterlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" fontSize={11} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
                <Legend />
                <Line type="monotone" dataKey="yoy" stroke="#06B6D4" strokeWidth={3} name={language === 'en' ? 'YoY Growth %' : 'YoY ترقی %'} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {quarters && quarterlyData.length > 0 && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Quarterly Breakdown' : 'سہ ماہی تفصیل'}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th className="text-left p-3">{language === 'en' ? 'Quarter' : 'سہ ماہی'}</th>
                    <th className="text-right p-3">{currentYear - 1}</th>
                    <th className="text-right p-3">{currentYear}</th>
                    <th className="text-right p-3">{language === 'en' ? 'YoY %' : 'YoY %'}</th>
                  </tr>
                </thead>
                <tbody>
                  {quarterlyData.map((q, idx) => (
                    <tr key={idx} className="border-b dark:border-slate-700">
                      <td className="p-3 font-semibold">{q.quarter}</td>
                      <td className="p-3 text-right">{formatCurrency(q.previous)}</td>
                      <td className="p-3 text-right font-bold">{formatCurrency(q.current)}</td>
                      <td className={`p-3 text-right font-bold ${q.yoy >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {q.yoy > 0 ? '+' : ''}{q.yoy.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-xl p-6">
          <h4 className="font-bold text-cyan-800 dark:text-cyan-300 mb-3">
            {language === 'en' ? '📊 YoY Performance Analysis' : '📊 YoY کارکردگی کا تجزیہ'}
          </h4>
          <ul className="text-sm text-cyan-700 dark:text-cyan-400 space-y-2">
            <li>• {language === 'en' ? `Overall YoY growth: ${yoyPercentage > 0 ? '+' : ''}${yoyPercentage.toFixed(1)}% (${yoyPercentage >= 20 ? 'Excellent' : yoyPercentage >= 10 ? 'Good' : yoyPercentage >= 0 ? 'Moderate' : 'Declining'})` : `مجموعی YoY ترقی: ${yoyPercentage > 0 ? '+' : ''}${yoyPercentage.toFixed(1)}% (${yoyPercentage >= 20 ? 'بہترین' : yoyPercentage >= 10 ? 'اچھا' : yoyPercentage >= 0 ? 'اعتدال' : 'گرتا'})`}</li>
            <li>• {language === 'en' ? `Growth rate indicates ${yoyPercentage >= 0 ? 'expanding' : 'contracting'} business` : `ترقی کی شرح ${yoyPercentage >= 0 ? 'بڑھتے' : 'سکڑتے'} کاروبار کی نشاندہی کرتی ہے`}</li>
            <li>• {language === 'en' ? `Absolute change: ${formatCurrency(Math.abs(yoyChange))} ${yoyChange >= 0 ? 'increase' : 'decrease'}` : `مطلق تبدیلی: ${formatCurrency(Math.abs(yoyChange))} ${yoyChange >= 0 ? 'اضافہ' : 'کمی'}`}</li>
            <li>• {language === 'en' ? 'Compare with industry benchmarks and competitor growth rates' : 'صنعت کے معیارات اور حریفوں کی ترقی کی شرحوں سے موازنہ کریں'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default YearOverYearCalculator;