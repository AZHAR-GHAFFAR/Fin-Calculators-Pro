import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const TrendAnalysisCalculator = ({ language, addToHistory, calculatorName }) => {
  const [dataPoints, setDataPoints] = useState('10000,12000,15000,14000,18000,22000');
  const [dataType, setDataType] = useState('revenue');
  
  // Parse data points
  const values = useMemo(() => {
    return dataPoints.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
  }, [dataPoints]);

  // Calculate linear regression (trend line)
  const regression = useMemo(() => {
    if (values.length < 2) return null;
    
    const n = values.length;
    const sumX = values.reduce((sum, _, i) => sum + i, 0);
    const sumY = values.reduce((sum, v) => sum + v, 0);
    const sumXY = values.reduce((sum, v, i) => sum + (i * v), 0);
    const sumXX = values.reduce((sum, _, i) => sum + (i * i), 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    return { slope, intercept };
  }, [values]);

  // Generate data with trend
  const chartData = useMemo(() => {
    if (!regression || values.length === 0) return [];
    
    return values.map((value, index) => ({
      period: index + 1,
      periodLabel: `${language === 'en' ? 'Period' : 'مدت'} ${index + 1}`,
      actual: value,
      trend: regression.slope * index + regression.intercept,
      deviation: value - (regression.slope * index + regression.intercept)
    }));
  }, [values, regression, language]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (values.length === 0) return null;
    
    const average = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + Math.pow(v - average, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    const cv = (stdDev / average) * 100; // Coefficient of variation
    
    // Growth rate
    const firstValue = values[0];
    const lastValue = values[values.length - 1];
    const totalGrowth = ((lastValue - firstValue) / firstValue) * 100;
    const avgGrowthRate = totalGrowth / (values.length - 1);
    
    return { average, stdDev, min, max, range, cv, totalGrowth, avgGrowthRate };
  }, [values]);

  const trendDirection = regression && regression.slope > 0 ? 'upward' : 'downward';
  const trendStrength = stats ? Math.abs(stats.totalGrowth) : 0;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="orange"
        formula="Trend Line: y = mx + b  |  Slope (m) = (n∑xy - ∑x∑y) / (n∑x² - (∑x)²)"
        variables={[
          { symbol: 'm (slope)', nameEn: 'Rate of change per period', nameUrdu: 'فی مدت تبدیلی کی شرح' },
          { symbol: 'b (intercept)', nameEn: 'Starting value (y when x=0)', nameUrdu: 'شروعاتی قیمت (y جب x=0)' },
          { symbol: 'R²', nameEn: 'Correlation strength (0-1)', nameUrdu: 'تعلق کی طاقت (0-1)' }
        ]}
        example={[
          { labelEn: 'Data', labelUrdu: 'ڈیٹا', value: '10K, 12K, 15K, 14K, 18K, 22K' },
          { labelEn: 'Periods', labelUrdu: 'مدتیں', value: '6 months' },
          { labelEn: 'Average', labelUrdu: 'اوسط', value: 'Rs. 15,167' },
          { labelEn: 'Trend', labelUrdu: 'رجحان', value: 'Upward (+20% growth)' },
          { labelEn: 'Slope', labelUrdu: 'ڈھلوان', value: '+2,400 per period' },
          { labelEn: 'Volatility', labelUrdu: 'اتار چڑھاؤ', value: 'Medium (CV: 26%)' }
        ]}
        terms={[
          {
            titleEn: 'Trend vs Volatility',
            titleUrdu: 'رجحان بمقابلہ اتار چڑھاؤ',
            descEn: 'Trend = general direction (up/down). Volatility = variation around trend. Both important.',
            descUrdu: 'رجحان = عمومی سمت (اوپر/نیچے)۔ اتار چڑھاؤ = رجحان کے گرد تغیر۔ دونوں اہم۔'
          },
          {
            titleEn: 'Linear Regression',
            titleUrdu: 'لکیری رجحان',
            descEn: 'Best-fit straight line through data points. Shows average trend ignoring noise.',
            descUrdu: 'ڈیٹا پوائنٹس کے ذریعے بہترین فٹ سیدھی لائن۔ شور کو نظر انداز کرتے ہوئے اوسط رجحان دکھاتا ہے۔'
          },
          {
            titleEn: 'Coefficient of Variation',
            titleUrdu: 'تغیر کا عدد',
            descEn: 'CV = (Std Dev ÷ Mean) × 100. <20%: Stable. 20-50%: Moderate. >50%: High volatility.',
            descUrdu: 'CV = (معیاری انحراف ÷ اوسط) × 100۔ <20%: مستحکم۔ 20-50%: اعتدال۔ >50%: زیادہ اتار چڑھاؤ۔'
          }
        ]}
        note={{
          en: 'Trend analysis shows patterns but doesn\'t predict future perfectly. Past trends may not continue. Use multiple data points (minimum 5-6) for reliable trends. Outliers can distort trend lines.',
          urdu: 'رجحان کا تجزیہ نمونے دکھاتا ہے لیکن مستقبل کی کامل پیشن گوئی نہیں کرتا۔ ماضی کے رجحانات جاری نہیں رہ سکتے۔ قابل اعتماد رجحانات کے لیے متعدد ڈیٹا پوائنٹس (کم از کم 5-6) استعمال کریں۔ آؤٹ لائیرز رجحان کی لائنوں کو بگاڑ سکتے ہیں۔'
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            {language === 'en' ? 'Data Input' : 'ڈیٹا ان پٹ'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Data Type' : 'ڈیٹا کی قسم'}</label>
              <select value={dataType} onChange={(e) => setDataType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="revenue">{language === 'en' ? 'Revenue/Sales' : 'آمدنی/فروخت'}</option>
                <option value="customers">{language === 'en' ? 'Customers' : 'گاہک'}</option>
                <option value="units">{language === 'en' ? 'Units Sold' : 'فروخت شدہ یونٹس'}</option>
                <option value="traffic">{language === 'en' ? 'Website Traffic' : 'ویب سائٹ ٹریفک'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? 'Data Points (comma-separated)' : 'ڈیٹا پوائنٹس (کاما سے الگ)'}
              </label>
              <textarea value={dataPoints} onChange={(e) => setDataPoints(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 font-mono text-sm"
                placeholder="10000,12000,15000,14000,18000,22000" />
              <p className="text-xs text-slate-500 mt-1">
                {values.length} {language === 'en' ? 'data points entered' : 'ڈیٹا پوائنٹس داخل'}
              </p>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${trendDirection} trend: ${stats?.totalGrowth.toFixed(1)}% change` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Analyze Trend' : 'رجحان کا تجزیہ'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {stats && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className={`bg-gradient-to-br ${trendDirection === 'upward' ? 'from-green-500 to-emerald-600' : 'from-red-500 to-orange-600'} rounded-2xl p-6 text-white`}>
                  <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Trend Direction' : 'رجحان کی سمت'}</div>
                  <div className="text-3xl font-bold flex items-center gap-2">
                    {trendDirection === 'upward' ? <TrendingUp className="w-8 h-8" /> : <TrendingDown className="w-8 h-8" />}
                    {stats.totalGrowth > 0 ? '+' : ''}{stats.totalGrowth.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
                  <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Average Value' : 'اوسط قیمت'}</div>
                  <div className="text-3xl font-bold">{formatCurrency(stats.average)}</div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Statistical Summary' : 'شماریاتی خلاصہ'}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between pb-2 border-b">
                    <span>{language === 'en' ? 'Minimum' : 'کم از کم'}</span>
                    <span className="font-bold">{formatCurrency(stats.min)}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>{language === 'en' ? 'Maximum' : 'زیادہ سے زیادہ'}</span>
                    <span className="font-bold">{formatCurrency(stats.max)}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>{language === 'en' ? 'Range' : 'رینج'}</span>
                    <span className="font-bold">{formatCurrency(stats.range)}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>{language === 'en' ? 'Std Deviation' : 'معیاری انحراف'}</span>
                    <span className="font-bold">{formatCurrency(stats.stdDev)}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <span>{language === 'en' ? 'CV (Volatility)' : 'CV (اتار چڑھاؤ)'}</span>
                    <span className={`font-bold ${stats.cv < 20 ? 'text-green-600' : stats.cv < 50 ? 'text-orange-600' : 'text-red-600'}`}>
                      {stats.cv.toFixed(1)}%
                    </span>
                  </div>
                  {regression && (
                    <div className="flex justify-between pt-2 border-t-2">
                      <span>{language === 'en' ? 'Trend Slope' : 'رجحان ڈھلوان'}</span>
                      <span className="font-bold text-blue-600">{formatCurrency(regression.slope)}/period</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {chartData.length > 0 && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Trend Analysis Chart' : 'رجحان کے تجزیے کا چارٹ'}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="periodLabel" fontSize={11} />
                <YAxis fontSize={12} tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#F97316" strokeWidth={3} name={language === 'en' ? 'Actual' : 'اصل'} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="trend" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" name={language === 'en' ? 'Trend' : 'رجحان'} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Deviation from Trend' : 'رجحان سے انحراف'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="period" name={language === 'en' ? 'Period' : 'مدت'} fontSize={11} />
                <YAxis type="number" dataKey="deviation" name={language === 'en' ? 'Deviation' : 'انحراف'} fontSize={12} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Scatter data={chartData} fill="#8B5CF6" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {stats && (
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6">
              <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-3">
                {language === 'en' ? '📈 Trend Insights' : '📈 رجحان کی بصیرتیں'}
              </h4>
              <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-2">
                <li>• {language === 'en' ? `Overall trend: ${trendDirection} (${stats.totalGrowth > 0 ? '+' : ''}${stats.totalGrowth.toFixed(1)}% over ${values.length} periods)` : `مجموعی رجحان: ${trendDirection} (${values.length} مدتوں میں ${stats.totalGrowth > 0 ? '+' : ''}${stats.totalGrowth.toFixed(1)}%)`}</li>
                <li>• {language === 'en' ? `Average growth: ${stats.avgGrowthRate.toFixed(1)}% per period` : `اوسط ترقی: ${stats.avgGrowthRate.toFixed(1)}% فی مدت`}</li>
                <li>• {language === 'en' ? `Volatility: ${stats.cv < 20 ? 'Low' : stats.cv < 50 ? 'Moderate' : 'High'} (CV: ${stats.cv.toFixed(1)}%)` : `اتار چڑھاؤ: ${stats.cv < 20 ? 'کم' : stats.cv < 50 ? 'اعتدال' : 'زیادہ'} (CV: ${stats.cv.toFixed(1)}%)`}</li>
                {regression && (
                  <li>• {language === 'en' ? `Trend slope: ${formatCurrency(regression.slope)} per period (${regression.slope > 0 ? 'improving' : 'declining'})` : `رجحان ڈھلوان: ${formatCurrency(regression.slope)} فی مدت (${regression.slope > 0 ? 'بہتر' : 'گرتا'})`}</li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendAnalysisCalculator;