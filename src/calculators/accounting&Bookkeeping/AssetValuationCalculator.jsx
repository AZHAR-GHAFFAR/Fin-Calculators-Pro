import React, { useState } from 'react';
import { Building2, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const AssetValuationCalculator = ({ language, addToHistory, calculatorName }) => {
  const [assetCost, setAssetCost] = useState(5000000);
  const [accumulatedDepreciation, setAccumulatedDepreciation] = useState(1500000);
  const [marketValue, setMarketValue] = useState(4200000);
  const [annualRevenue, setAnnualRevenue] = useState(8000000);
  const [annualProfit, setAnnualProfit] = useState(1200000);

  // Calculations
  const bookValue = assetCost - accumulatedDepreciation;
  const roa = (annualProfit / bookValue) * 100; // Return on Assets
  const assetTurnover = annualRevenue / bookValue;
  const appreciation = marketValue - bookValue;
  const appreciationPercent = (appreciation / bookValue) * 100;

  const chartData = [
    { name: language === 'en' ? 'Original Cost' : 'اصل لاگت', value: assetCost, fill: '#3B82F6' },
    { name: language === 'en' ? 'Book Value' : 'کتابی قیمت', value: bookValue, fill: '#10B981' },
    { name: language === 'en' ? 'Market Value' : 'مارکیٹ قیمت', value: marketValue, fill: '#8B5CF6' },
    { name: language === 'en' ? 'Depreciation' : 'قدر میں کمی', value: accumulatedDepreciation, fill: '#EF4444' }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="indigo"
        formula="Book Value = Cost - Accumulated Depreciation | ROA = (Profit ÷ Assets) × 100"
        variables={[
          { symbol: 'Book Value', nameEn: 'Accounting value on balance sheet', nameUrdu: 'بیلنس شیٹ پر اکاؤنٹنگ قیمت' },
          { symbol: 'Market Value', nameEn: 'Current selling price', nameUrdu: 'موجودہ فروخت کی قیمت' },
          { symbol: 'ROA', nameEn: 'Return on Assets (profitability)', nameUrdu: 'اثاثوں پر واپسی (منافع)' }
        ]}
        example={[
          { labelEn: 'Asset Cost', labelUrdu: 'اثاثہ لاگت', value: 'Rs. 50,00,000' },
          { labelEn: 'Depreciation', labelUrdu: 'قدر میں کمی', value: 'Rs. 15,00,000' },
          { labelEn: 'Book Value', labelUrdu: 'کتابی قیمت', value: 'Rs. 35,00,000' },
          { labelEn: 'Market Value', labelUrdu: 'مارکیٹ قیمت', value: 'Rs. 42,00,000' },
          { labelEn: 'ROA', labelUrdu: 'ROA', value: '34.3% (excellent)' }
        ]}
        terms={[
          {
            titleEn: 'Book Value vs Market Value',
            titleUrdu: 'کتابی قیمت بمقابلہ مارکیٹ قیمت',
            descEn: 'Book: historical cost minus depreciation. Market: current selling price. Often different.',
            descUrdu: 'کتابی: تاریخی لاگت منفی قدر میں کمی۔ مارکیٹ: موجودہ فروخت کی قیمت۔ اکثر مختلف۔'
          },
          {
            titleEn: 'Return on Assets (ROA)',
            titleUrdu: 'اثاثوں پر واپسی (ROA)',
            descEn: 'Measures asset profitability. >10% good. >20% excellent. Higher = better asset use.',
            descUrdu: 'اثاثہ منافع کی پیمائش۔ >10% اچھا۔ >20% بہترین۔ زیادہ = اثاثہ کا بہتر استعمال۔'
          },
          {
            titleEn: 'Asset Turnover',
            titleUrdu: 'اثاثہ ٹرن اوور',
            descEn: 'Revenue ÷ Assets. Shows efficiency. Retail: 2-3x. Manufacturing: 1-2x. Services: 3-5x.',
            descUrdu: 'آمدنی ÷ اثاثے۔ کارکردگی دکھاتا ہے۔ خوردہ: 2-3x۔ مینوفیکچرنگ: 1-2x۔ خدمات: 3-5x۔'
          }
        ]}
        note={{
          en: 'Market value reflects current demand. Book value for accounting. Land appreciates, buildings depreciate. Professional appraisal recommended for major assets.',
          urdu: 'مارکیٹ کی قیمت موجودہ مانگ کی عکاسی کرتی ہے۔ اکاؤنٹنگ کے لیے کتابی قیمت۔ زمین قدر میں بڑھتی، عمارتیں کم ہوتی ہیں۔ بڑے اثاثوں کے لیے پیشہ ورانہ تشخیص تجویز کیا جاتا ہے۔'
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            {language === 'en' ? 'Asset Information' : 'اثاثہ کی معلومات'}
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Original Cost (Rs.)' : 'اصل لاگت (Rs.)'}</label>
              <input type="number" value={assetCost} onChange={(e) => setAssetCost(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Accumulated Depreciation (Rs.)' : 'جمع شدہ قدر میں کمی (Rs.)'}</label>
              <input type="number" value={accumulatedDepreciation} onChange={(e) => setAccumulatedDepreciation(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Current Market Value (Rs.)' : 'موجودہ مارکیٹ قیمت (Rs.)'}</label>
              <input type="number" value={marketValue} onChange={(e) => setMarketValue(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Annual Revenue (Rs.)' : 'سالانہ آمدنی (Rs.)'}</label>
              <input type="number" value={annualRevenue} onChange={(e) => setAnnualRevenue(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Annual Profit (Rs.)' : 'سالانہ منافع (Rs.)'}</label>
              <input type="number" value={annualProfit} onChange={(e) => setAnnualProfit(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `Book: ${formatCurrency(bookValue)}, Market: ${formatCurrency(marketValue)}, ROA: ${roa.toFixed(1)}%` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Valuation' : 'قدر کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Book Value' : 'کتابی قیمت'}</div>
              <div className="text-3xl font-bold">{formatCurrency(bookValue)}</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Market Value' : 'مارکیٹ قیمت'}</div>
              <div className="text-3xl font-bold">{formatCurrency(marketValue)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Performance Metrics' : 'کارکردگی کے میٹرکس'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'ROA (Return on Assets)' : 'ROA (اثاثوں پر واپسی)'}</span>
                <span className={`font-bold ${roa >= 20 ? 'text-green-600' : roa >= 10 ? 'text-blue-600' : 'text-orange-600'}`}>
                  {roa.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Asset Turnover' : 'اثاثہ ٹرن اوور'}</span>
                <span className="font-bold text-blue-600">{assetTurnover.toFixed(2)}x</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Appreciation/Depreciation' : 'قدر میں اضافہ/کمی'}</span>
                <span className={`font-bold ${appreciation >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(appreciation))} ({appreciationPercent >= 0 ? '+' : ''}{appreciationPercent.toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Value Comparison' : 'قیمت کا موازنہ'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={10} />
                <YAxis fontSize={12} tickFormatter={(v) => `${(v/100000).toFixed(0)}L`} />
                <Tooltip formatter={(v) => formatCurrency(v)} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetValuationCalculator;