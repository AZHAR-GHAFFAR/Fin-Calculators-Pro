import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { BarChart3, Target } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency, currencySymbol } from '../../utils/currency';

const BreakevenCalculator = ({ language, addToHistory, calculatorName }) => {
  const [fixedCosts, setFixedCosts] = useState(500000);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(200);
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState(500);

  const contributionMargin = sellingPricePerUnit - variableCostPerUnit;
  const contributionMarginRatio = (contributionMargin / sellingPricePerUnit) * 100;
  const breakevenUnits = fixedCosts / contributionMargin;
  const breakevenRevenue = breakevenUnits * sellingPricePerUnit;

  const generateChartData = () => {
    const data = [];
    const maxUnits = Math.ceil(breakevenUnits * 2);
    const step = Math.ceil(maxUnits / 10);
    
    for (let units = 0; units <= maxUnits; units += step) {
      const revenue = units * sellingPricePerUnit;
      const totalCost = fixedCosts + (units * variableCostPerUnit);
      const profit = revenue - totalCost;
      
      data.push({
        units: units,
        revenue: revenue,
        totalCost: totalCost,
        profit: profit
      });
    }
    
    return data;
  };

  const chartData = useMemo(() => generateChartData(), [fixedCosts, variableCostPerUnit, sellingPricePerUnit]);

  return (

     <div className="space-y-8">

      <InfoPanel
  language={language}
  colorScheme="purple"
  formula="Break-even Units = Fixed Costs ÷ (Selling Price - Variable Cost)"
  variables={[
    { symbol: 'Fixed Costs', nameEn: 'Costs that don\'t change (rent, salaries)', nameUrdu: 'وہ لاگت جو نہیں بدلتی (کرایہ، تنخواہیں)' },
    { symbol: 'Variable Cost', nameEn: 'Cost per unit (materials, labor)', nameUrdu: 'فی یونٹ لاگت (مواد، مزدوری)' },
    { symbol: 'Contribution Margin', nameEn: 'Selling Price - Variable Cost', nameUrdu: 'فروخت قیمت - متغیر لاگت' }
  ]}
  example={[
    { labelEn: 'Fixed Costs', labelUrdu: 'مقررہ لاگت', value: 'Rs. 5,00,000/month' },
    { labelEn: 'Variable Cost', labelUrdu: 'متغیر لاگت', value: 'Rs. 200/unit' },
    { labelEn: 'Selling Price', labelUrdu: 'فروخت قیمت', value: 'Rs. 500/unit' },
    { labelEn: 'Contribution', labelUrdu: 'شراکت', value: 'Rs. 300/unit (60%)' },
    { labelEn: 'Break-even', labelUrdu: 'بریک ایون', value: '1,667 units' },
    { labelEn: 'Break-even Revenue', labelUrdu: 'بریک ایون آمدنی', value: 'Rs. 8,33,500' }
  ]}
  terms={[
    {
      titleEn: 'Break-even Point',
      titleUrdu: 'بریک ایون پوائنٹ',
      descEn: 'Sales level where profit = 0. Above this, you make profit.',
      descUrdu: 'فروخت کی سطح جہاں منافع = 0۔ اس سے اوپر، آپ منافع کماتے ہیں۔'
    },
    {
      titleEn: 'Contribution Margin',
      titleUrdu: 'شراکت مارجن',
      descEn: 'Amount each unit contributes to covering fixed costs.',
      descUrdu: 'ہر یونٹ کی رقم جو مقررہ لاگت پوری کرنے میں مدد کرتی ہے۔'
    },
    {
      titleEn: 'Safety Margin',
      titleUrdu: 'حفاظتی مارجن',
      descEn: 'How far above break-even you are. Higher = safer.',
      descUrdu: 'آپ بریک ایون سے کتنا اوپر ہیں۔ زیادہ = محفوظ۔'
    }
  ]}
  note={{
    en: 'Use this before starting a business. Know exactly how many units you need to sell to survive. Plan for 30-50% above break-even.',
    urdu: 'کاروبار شروع کرنے سے پہلے استعمال کریں۔ بالکل جانیں کہ زندہ رہنے کے لیے کتنے یونٹس بیچنے ہیں۔ بریک ایون سے 30-50% اوپر کی منصوبہ بندی کریں۔'
  }}
/>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-indigo-600" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              {language === 'en' ? 'Business Inputs' : 'کاروبار کی تفصیلات'}
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Fixed Costs (${currencySymbol})` : `مقررہ اخراجات (${currencySymbol})`}</label>
              <input type="number" value={fixedCosts} onChange={(e) => setFixedCosts(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              <p className="text-xs text-slate-500 mt-1">{language === 'en' ? 'Rent, salaries, utilities' : 'کرایہ، تنخواہیں، بجلی'}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Variable Cost Per Unit (${currencySymbol})` : `فی یونٹ متغیر لاگت (${currencySymbol})`}</label>
              <input type="number" value={variableCostPerUnit} onChange={(e) => setVariableCostPerUnit(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              <p className="text-xs text-slate-500 mt-1">{language === 'en' ? 'Materials, labor per unit' : 'مواد، محنت فی یونٹ'}</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Selling Price Per Unit (${currencySymbol})` : `فی یونٹ فروخت قیمت (${currencySymbol})`}</label>
              <input type="number" value={sellingPricePerUnit} onChange={(e) => setSellingPricePerUnit(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${Math.ceil(breakevenUnits)} units to breakeven` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg">
              {language === 'en' ? 'Calculate' : 'حساب لگائیں'}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Breakeven Units' : 'بریک ایون یونٹس'}</div>
            <div className="text-4xl font-bold">{Math.ceil(breakevenUnits).toLocaleString('en-IN')}</div>
            <div className="text-xs mt-2 opacity-75">{language === 'en' ? 'units to sell' : 'یونٹس بیچنے ہیں'}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Breakeven Revenue' : 'بریک ایون آمدنی'}</div>
            <div className="text-4xl font-bold">{formatCurrency(Math.ceil(breakevenRevenue))}</div>
            <div className="text-xs mt-2 opacity-75">{language === 'en' ? 'revenue needed' : 'آمدنی درکار'}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Breakeven Analysis Chart' : 'بریک ایون تجزیہ چارٹ'}</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="units" stroke="#64748B" fontSize={12} 
                label={{ value: language === 'en' ? 'Units Sold' : 'یونٹس فروخت', position: 'insideBottom', offset: -5 }} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <ReferenceLine y={0} stroke="#000" strokeDasharray="3 3" />
              <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name={language === 'en' ? 'Revenue' : 'آمدنی'} />
              <Line type="monotone" dataKey="totalCost" stroke="#EF4444" strokeWidth={3} name={language === 'en' ? 'Total Cost' : 'کل لاگت'} />
              <Line type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={2} strokeDasharray="5 5" name={language === 'en' ? 'Profit' : 'منافع'} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Key Metrics' : 'اہم میٹرکس'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Contribution Margin' : 'شراکت مارجن'}</span>
                <span className="font-bold">{formatCurrency(contributionMargin)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Contribution Margin %' : 'شراکت مارجن %'}</span>
                <span className="font-bold">{contributionMarginRatio.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Safety Margin (100 units)' : 'حفاظتی مارجن'}</span>
                <span className="font-bold text-green-600">{formatCurrency((100 * sellingPricePerUnit) - breakevenRevenue)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'What This Means' : 'اس کا مطلب'}</h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {language === 'en' 
                ? `You need to sell at least ${Math.ceil(breakevenUnits)} units at ${formatCurrency(sellingPricePerUnit)} each to cover all your costs. Any sales beyond this point will generate profit of ${formatCurrency(contributionMargin)} per unit.`
                : `آپ کو کم از کم ${Math.ceil(breakevenUnits)} یونٹس ${formatCurrency(sellingPricePerUnit)} میں بیچنے کی ضرورت ہے۔ اس کے بعد ہر یونٹ پر ${formatCurrency(contributionMargin)} منافع ہوگا۔`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BreakevenCalculator;