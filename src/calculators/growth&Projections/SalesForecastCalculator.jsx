import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const SalesForecastCalculator = ({ language, addToHistory, calculatorName }) => {
  const [currentMonthlySales, setCurrentMonthlySales] = useState(500000);
  const [monthlyGrowthRate, setMonthlyGrowthRate] = useState(5);
  const [months, setMonths] = useState(12);
  const [seasonality, setSeasonality] = useState(true);
  const [marketTrend, setMarketTrend] = useState('stable'); // growing, stable, declining

  // Market trend multipliers
  const trendMultipliers = {
    growing: 1.1,
    stable: 1.0,
    declining: 0.9
  };

  // Seasonality factors (higher in certain months)
  const seasonalFactors = [
    1.2, // Jan
    0.9, // Feb  
    1.0, // Mar
    0.95, // Apr
    1.1, // May
    1.05, // Jun
    0.85, // Jul
    0.9, // Aug
    1.15, // Sep
    1.3, // Oct (peak)
    1.4, // Nov (peak)
    1.5  // Dec (highest - holiday season)
  ];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Generate sales forecast
  const forecast = useMemo(() => {
    const data = [];
    let cumulativeSales = 0;

    for (let month = 0; month < months; month++) {
      const baseGrowth = currentMonthlySales * Math.pow(1 + monthlyGrowthRate / 100, month);
      const trendAdjusted = baseGrowth * trendMultipliers[marketTrend];
      const seasonalIndex = month % 12;
      const seasonal = seasonality ? seasonalFactors[seasonalIndex] : 1.0;
      const sales = trendAdjusted * seasonal;
      cumulativeSales += sales;

      data.push({
        month: month + 1,
        monthName: monthNames[month % 12],
        sales: sales,
        cumulative: cumulativeSales,
        growth: month === 0 ? 0 : sales - data[month - 1].sales
      });
    }
    return data;
  }, [currentMonthlySales, monthlyGrowthRate, months, seasonality, marketTrend]);

  const totalSales = forecast[forecast.length - 1].cumulative;
  const averageMonthlySales = totalSales / months;
  const peakMonth = forecast.reduce((max, item) => item.sales > max.sales ? item : max, forecast[0]);
  const lowestMonth = forecast.reduce((min, item) => item.sales < min.sales ? item : min, forecast[0]);

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="purple"
        formula="Forecasted Sales = Base Sales × (1 + Growth Rate)^t × Trend Factor × Seasonality"
        variables={[
          { symbol: 'Base Sales', nameEn: 'Current monthly sales', nameUrdu: 'موجودہ ماہانہ فروخت' },
          { symbol: 'Growth Rate', nameEn: 'Expected monthly growth %', nameUrdu: 'متوقع ماہانہ ترقی %' },
          { symbol: 'Trend Factor', nameEn: 'Market trend adjustment (0.9-1.1)', nameUrdu: 'مارکیٹ رجحان ایڈجسٹمنٹ (0.9-1.1)' },
          { symbol: 'Seasonality', nameEn: 'Seasonal variations (peak/low months)', nameUrdu: 'موسمی تغیرات (عروج/کمی کے مہینے)' }
        ]}
        example={[
          { labelEn: 'Current Sales', labelUrdu: 'موجودہ فروخت', value: 'Rs. 5,00,000/month' },
          { labelEn: 'Growth Rate', labelUrdu: 'ترقی کی شرح', value: '5% per month' },
          { labelEn: 'Trend', labelUrdu: 'رجحان', value: 'Stable market' },
          { labelEn: 'Seasonality', labelUrdu: 'موسمیت', value: 'Peak in Oct-Dec (holidays)' },
          { labelEn: 'Year 1 Total', labelUrdu: 'سال 1 کل', value: 'Rs. 72,00,000' },
          { labelEn: 'Peak Month', labelUrdu: 'عروج کا ماہ', value: 'Dec: Rs. 12,75,000' }
        ]}
        terms={[
          {
            titleEn: 'Sales Forecasting',
            titleUrdu: 'فروخت کی پیشن گوئی',
            descEn: 'Predict future sales using historical data, trends, seasonality. Critical for inventory, staffing.',
            descUrdu: 'تاریخی ڈیٹا، رجحانات، موسمیت استعمال کرتے ہوئے مستقبل کی فروخت کی پیشن گوئی۔ انوینٹری، عملے کے لیے اہم۔'
          },
          {
            titleEn: 'Seasonality Patterns',
            titleUrdu: 'موسمی نمونے',
            descEn: 'Pakistan: Eid (Apr/Jun), Wedding season (Nov-Feb), Ramadan boost. Plan inventory accordingly.',
            descUrdu: 'پاکستان: عید (اپریل/جون)، شادی کا موسم (نومبر-فروری)، رمضان میں اضافہ۔ اس کے مطابق انوینٹری کی منصوبہ بندی کریں۔'
          },
          {
            titleEn: 'Growth Assumptions',
            titleUrdu: 'ترقی کے مفروضات',
            descEn: 'New business: 10-20%/month. Established: 2-5%/month. Always test assumptions with data.',
            descUrdu: 'نیا کاروبار: 10-20%/ماہ۔ قائم شدہ: 2-5%/ماہ۔ ہمیشہ ڈیٹا کے ساتھ مفروضات کی جانچ کریں۔'
          }
        ]}
        note={{
          en: 'Forecasts are estimates based on assumptions. Actual sales affected by competition, economy, marketing, product quality. Update forecast monthly with actual data. Conservative estimates recommended.',
          urdu: 'پیشن گوئیاں مفروضات پر مبنی تخمینے ہیں۔ اصل فروخت مقابلے، معیشت، مارکیٹنگ، مصنوع کے معیار سے متاثر ہوتی ہے۔ اصل ڈیٹا کے ساتھ ماہانہ پیشن گوئی کو اپ ڈیٹ کریں۔ قدامت پسندانہ تخمینے تجویز کیے جاتے ہیں۔'
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" />
            {language === 'en' ? 'Forecast Parameters' : 'پیشن گوئی کے پیرامیٹرز'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Current Monthly Sales (Rs.)' : 'موجودہ ماہانہ فروخت (Rs.)'}</label>
              <input type="number" value={currentMonthlySales} onChange={(e) => setCurrentMonthlySales(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Monthly Growth Rate (%)' : 'ماہانہ ترقی کی شرح (%)'}</label>
              <input type="range" min="0" max="20" step="1" value={monthlyGrowthRate}
                onChange={(e) => setMonthlyGrowthRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-purple-100 dark:bg-purple-900 rounded-lg" />
              <input type="number" value={monthlyGrowthRate} onChange={(e) => setMonthlyGrowthRate(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Forecast Period (Months)' : 'پیشن گوئی کی مدت (مہینے)'}</label>
              <input type="range" min="3" max="24" value={months} onChange={(e) => setMonths(parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg" />
              <input type="number" value={months} onChange={(e) => setMonths(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Market Trend' : 'مارکیٹ کا رجحان'}</label>
              <select value={marketTrend} onChange={(e) => setMarketTrend(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="growing">{language === 'en' ? 'Growing Market (+10%)' : 'بڑھتی مارکیٹ (+10%)'}</option>
                <option value="stable">{language === 'en' ? 'Stable Market' : 'مستحکم مارکیٹ'}</option>
                <option value="declining">{language === 'en' ? 'Declining Market (-10%)' : 'گرتی مارکیٹ (-10%)'}</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" checked={seasonality} onChange={(e) => setSeasonality(e.target.checked)}
                className="w-5 h-5" />
              <label className="text-sm font-semibold">
                {language === 'en' ? 'Apply Seasonality (Peak: Oct-Dec)' : 'موسمیت لاگو کریں (عروج: اکتوبر-دسمبر)'}
              </label>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${months} months: ${formatCurrency(totalSales)} total sales` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Generate Forecast' : 'پیشن گوئی بنائیں'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Sales' : 'کل فروخت'}</div>
              <div className="text-3xl font-bold">{formatCurrency(totalSales)}</div>
              <div className="text-xs opacity-75 mt-1">{months} {language === 'en' ? 'months' : 'مہینے'}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Avg/Month' : 'اوسط/ماہ'}</div>
              <div className="text-3xl font-bold">{formatCurrency(averageMonthlySales)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Peak & Low Analysis' : 'عروج اور کمی کا تجزیہ'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Peak Month' : 'عروج کا ماہ'}</span>
                <span className="font-bold text-green-600">{peakMonth.monthName}: {formatCurrency(peakMonth.sales)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Lowest Month' : 'کم ترین ماہ'}</span>
                <span className="font-bold text-red-600">{lowestMonth.monthName}: {formatCurrency(lowestMonth.sales)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">{language === 'en' ? 'Variation' : 'تغیر'}</span>
                <span className="font-bold">{((peakMonth.sales/lowestMonth.sales - 1) * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Monthly Sales Forecast' : 'ماہانہ فروخت کی پیشن گوئی'}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthName" fontSize={11} />
              <YAxis fontSize={12} tickFormatter={(value) => `${(value/100000).toFixed(0)}L`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8B5CF6" strokeWidth={3} name={language === 'en' ? 'Sales' : 'فروخت'} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Monthly Comparison' : 'ماہانہ موازنہ'}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={forecast.slice(0, 12)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthName" fontSize={11} />
              <YAxis fontSize={12} tickFormatter={(value) => `${(value/100000).toFixed(0)}L`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="sales" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
          <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            {language === 'en' ? '📊 Forecast Insights' : '📊 پیشن گوئی کی بصیرتیں'}
          </h4>
          <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-2">
            <li>• {language === 'en' ? `Seasonal variation: ${seasonality ? 'Applied' : 'Not applied'} (Peak months: Oct-Dec in Pakistan)` : `موسمی تغیر: ${seasonality ? 'لاگو' : 'لاگو نہیں'} (عروج کے مہینے: پاکستان میں اکتوبر-دسمبر)`}</li>
            <li>• {language === 'en' ? `Market trend: ${marketTrend} (${trendMultipliers[marketTrend]}x multiplier)` : `مارکیٹ رجحان: ${marketTrend} (${trendMultipliers[marketTrend]}x ضارب)`}</li>
            <li>• {language === 'en' ? `Growth rate: ${monthlyGrowthRate}%/month = ${((Math.pow(1 + monthlyGrowthRate/100, 12) - 1) * 100).toFixed(0)}%/year` : `ترقی کی شرح: ${monthlyGrowthRate}%/ماہ = ${((Math.pow(1 + monthlyGrowthRate/100, 12) - 1) * 100).toFixed(0)}%/سال`}</li>
            <li>• {language === 'en' ? 'Update forecast monthly with actual sales for accuracy' : 'درستگی کے لیے اصل فروخت کے ساتھ ماہانہ پیشن گوئی کو اپ ڈیٹ کریں'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalesForecastCalculator;