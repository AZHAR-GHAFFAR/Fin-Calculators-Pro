import React, { useState } from 'react';
import { Home, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const PropertyValuationCalculator = ({ language, addToHistory, calculatorName }) => {
  const [method, setMethod] = useState('market'); // market, income, cost
  // Market Comparison
  const [compSales, setCompSales] = useState([
    { address: '5 Marla DHA', price: 18000000, sqft: 1125 },
    { address: '5 Marla Bahria', price: 16500000, sqft: 1125 },
    { address: '5 Marla Johar', price: 14000000, sqft: 1125 }
  ]);
  const [propertySqft, setPropertySqft] = useState(1125);
  // Income Approach
  const [annualRent, setAnnualRent] = useState(960000);
  const [capRate, setCapRate] = useState(6);
  // Cost Approach
  const [landValue, setLandValue] = useState(8000000);
  const [buildingCost, setBuildingCost] = useState(12000000);
  const [depreciation, setDepreciation] = useState(15);

  /* ── Market Comparison ── */
  const avgPricePerSqft = compSales.reduce((s, c) => s + c.price / c.sqft, 0) / compSales.length;
  const marketValue = avgPricePerSqft * propertySqft;

  /* ── Income Approach ── */
  const incomeValue = (annualRent / capRate) * 100;

  /* ── Cost Approach ── */
  const depreciatedBuilding = buildingCost * (1 - depreciation / 100);
  const costValue = landValue + depreciatedBuilding;

  const values = { market: marketValue, income: incomeValue, cost: costValue };
  const finalValue = values[method];

  const chartData = [
    { name: language === 'en' ? 'Market Comparison' : 'مارکیٹ موازنہ', value: marketValue, fill: '#6366F1' },
    { name: language === 'en' ? 'Income Approach' : 'آمدنی طریقہ', value: incomeValue, fill: '#10B981' },
    { name: language === 'en' ? 'Cost Approach' : 'لاگت طریقہ', value: costValue, fill: '#F59E0B' }
  ];

  return (
    <div className="space-y-6">
      <InfoPanel
        language={language}
        colorScheme="purple"
        formula="Market: Avg $/sqft × Area | Income: Annual Rent ÷ Cap Rate | Cost: Land + Building − Depreciation"
        variables={[
          { symbol: 'Market', nameEn: 'Comparable sales price per sqft method', nameUrdu: 'موازنہ فروخت قیمت فی مربع فوٹ طریقہ' },
          { symbol: 'Income', nameEn: 'Net Operating Income ÷ Cap Rate', nameUrdu: 'خالص آپریٹنگ آمدنی ÷ کیپ ریٹ' },
          { symbol: 'Cap Rate', nameEn: 'Capitalization Rate (ROI %)', nameUrdu: 'کیپٹلائزیشن ریٹ (ROI %)' }
        ]}
        example={[
          { labelEn: 'Market Method', labelUrdu: 'مارکیٹ طریقہ', value: 'Rs. 1,80,00,000 (Rs. 16K/sqft × 1125 sqft)' },
          { labelEn: 'Income Method', labelUrdu: 'آمدنی طریقہ', value: 'Rs. 1,60,00,000 (Rs. 9.6L rent ÷ 6%)' },
          { labelEn: 'Cost Method', labelUrdu: 'لاگت طریقہ', value: 'Rs. 1,82,00,000 (land + depreciated building)' }
        ]}
        terms={[
          { titleEn: 'Market Comparison', titleUrdu: 'مارکیٹ موازنہ', descEn: 'Compare 3+ similar sold properties. Average price/sqft. Most common in Pakistan.', descUrdu: '3+ ملتی جلتی فروخت شدہ پراپرٹیز موازنہ۔ اوسط قیمت/sqft۔ پاکستان میں سب سے عام۔' },
          { titleEn: 'Income Approach', titleUrdu: 'آمدنی طریقہ', descEn: 'For rental properties. Annual rent ÷ cap rate. Cap rate 5-8% typical Pakistan.', descUrdu: 'کرایہ پراپرٹیز کے لیے۔ سالانہ کرایہ ÷ کیپ ریٹ۔ پاکستان میں 5-8% عام۔' },
          { titleEn: 'Cost Approach', titleUrdu: 'لاگت طریقہ', descEn: 'Land value + building replacement cost − depreciation. Used for new construction.', descUrdu: 'زمین کی قیمت + عمارت کی تبدیلی لاگت − قدر میں کمی۔ نئی تعمیر کے لیے استعمال۔' }
        ]}
        note={{
          en: 'Use all 3 methods then average for best estimate. Market method most reliable in Pakistan. Get professional appraisal for mortgage.',
          urdu: 'بہترین تخمینہ کے لیے تینوں طریقے استعمال کریں پھر اوسط نکالیں۔ پاکستان میں مارکیٹ طریقہ سب سے زیادہ قابل اعتماد۔ مارگیج کے لیے پیشہ ور تشخیص حاصل کریں۔'
        }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        {/* Method selector */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">{language === 'en' ? 'Valuation Method' : 'قیمت کا طریقہ'}</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              ['market', language === 'en' ? 'Market Comparison' : 'مارکیٹ موازنہ', language === 'en' ? 'Most common' : 'سب سے عام'],
              ['income', language === 'en' ? 'Income Approach' : 'آمدنی طریقہ', language === 'en' ? 'For rentals' : 'کرایہ کے لیے'],
              ['cost', language === 'en' ? 'Cost Approach' : 'لاگت طریقہ', language === 'en' ? 'New construction' : 'نئی تعمیر']
            ].map(([val, label, desc]) => (
              <button key={val} onClick={() => setMethod(val)}
                className={`p-3 rounded-xl text-left transition-all ${method === val ? 'bg-purple-600 text-white shadow-lg scale-105' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                <div className="font-bold text-sm">{label}</div>
                <div className="text-xs opacity-75 mt-0.5">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* KPI */}
        <div className={`bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-6 h-6" />
            <span className="text-sm opacity-90">{language === 'en' ? 'Estimated Property Value' : 'تخمینہ شدہ پراپرٹی قیمت'}</span>
          </div>
          <div className="text-5xl font-bold">{formatCurrency(finalValue)}</div>
          <div className="text-xs opacity-75 mt-2">{method === 'market' ? (language === 'en' ? 'Market Comparison Method' : 'مارکیٹ موازنہ طریقہ') : method === 'income' ? (language === 'en' ? 'Income Approach Method' : 'آمدنی طریقہ') : (language === 'en' ? 'Cost Approach Method' : 'لاگت طریقہ')}</div>
        </div>

        {/* Method-specific inputs */}
        {method === 'market' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-4">{language === 'en' ? 'Comparable Sales' : 'موازنہ فروخت'}</h3>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Your Property Area (sqft)' : 'آپ کی پراپرٹی رقبہ (sqft)'}</label>
              <input type="number" value={propertySqft} onChange={e => setPropertySqft(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-100 dark:bg-slate-700">
                <th className="text-left p-3">{language === 'en' ? 'Address' : 'پتہ'}</th>
                <th className="text-right p-3">{language === 'en' ? 'Price' : 'قیمت'}</th>
                <th className="text-right p-3">{language === 'en' ? 'Sqft' : 'Sqft'}</th>
                <th className="text-right p-3">{language === 'en' ? 'Rs./sqft' : 'Rs./sqft'}</th>
              </tr></thead>
              <tbody>
                {compSales.map((c, i) => (
                  <tr key={i} className="border-b dark:border-slate-700">
                    <td className="p-3">{c.address}</td>
                    <td className="p-3 text-right font-bold">{formatCurrency(c.price)}</td>
                    <td className="p-3 text-right">{c.sqft}</td>
                    <td className="p-3 text-right text-purple-600 font-bold">{formatCurrency(c.price / c.sqft)}</td>
                  </tr>
                ))}
                <tr className="bg-purple-50 dark:bg-purple-900/20 font-bold">
                  <td className="p-3">{language === 'en' ? 'Average' : 'اوسط'}</td>
                  <td className="p-3 text-right">-</td>
                  <td className="p-3 text-right">-</td>
                  <td className="p-3 text-right text-purple-600">{formatCurrency(avgPricePerSqft)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {method === 'income' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-4">{language === 'en' ? 'Income Approach' : 'آمدنی طریقہ'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Annual Rent (Rs.)' : 'سالانہ کرایہ (Rs.)'}</label>
                <input type="number" value={annualRent} onChange={e => setAnnualRent(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Cap Rate (%)' : 'کیپ ریٹ (%)'}</label>
                <input type="number" value={capRate} onChange={e => setCapRate(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm">
              <span className="font-bold text-green-700 dark:text-green-400">
                {language === 'en' ? 'Formula:' : 'فارمولا:'} {formatCurrency(annualRent)} ÷ {capRate}% = {formatCurrency(incomeValue)}
              </span>
            </div>
          </div>
        )}

        {method === 'cost' && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-4">{language === 'en' ? 'Cost Approach' : 'لاگت طریقہ'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Land Value (Rs.)' : 'زمین کی قیمت (Rs.)'}</label>
                <input type="number" value={landValue} onChange={e => setLandValue(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Building Cost (Rs.)' : 'عمارت لاگت (Rs.)'}</label>
                <input type="number" value={buildingCost} onChange={e => setBuildingCost(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Depreciation (%)' : 'قدر میں کمی (%)'}</label>
                <input type="number" value={depreciation} onChange={e => setDepreciation(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-sm space-y-1">
              <div className="flex justify-between"><span>{language === 'en' ? 'Land' : 'زمین'}</span><span className="font-bold">{formatCurrency(landValue)}</span></div>
              <div className="flex justify-between"><span>{language === 'en' ? 'Building' : 'عمارت'}</span><span className="font-bold">{formatCurrency(buildingCost)}</span></div>
              <div className="flex justify-between"><span>{language === 'en' ? 'Depreciation' : 'قدر میں کمی'}</span><span className="font-bold text-red-600">−{formatCurrency(buildingCost * depreciation / 100)}</span></div>
              <div className="flex justify-between pt-2 border-t font-bold"><span>{language === 'en' ? 'Total' : 'کل'}</span><span className="text-amber-600">{formatCurrency(costValue)}</span></div>
            </div>
          </div>
        )}

        {/* Comparison chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-3">{language === 'en' ? 'All Methods Comparison' : 'تمام طریقوں کا موازنہ'}</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={11} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={v => formatCurrency(v)} />
              <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={80}>
                {chartData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `${method.toUpperCase()}: ${formatCurrency(finalValue)}` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Valuation' : 'قیمت محفوظ کریں'}
        </button>
      </div>
    </div>
  );
};
export default PropertyValuationCalculator;