import React, { useState } from 'react';
import { FileText, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const BalanceSheetCalculator = ({ language, addToHistory, calculatorName }) => {
  // Assets
  const [currentAssets, setCurrentAssets] = useState({
    cash: 500000,
    inventory: 300000,
    receivables: 200000,
    prepaid: 50000
  });

  const [fixedAssets, setFixedAssets] = useState({
    land: 2000000,
    building: 1500000,
    equipment: 800000,
    vehicles: 600000
  });

  // Liabilities
  const [currentLiabilities, setCurrentLiabilities] = useState({
    payables: 400000,
    shortTermLoan: 200000,
    expenses: 100000
  });

  const [longTermLiabilities, setLongTermLiabilities] = useState({
    longTermLoan: 1500000,
    mortgage: 1000000
  });

  // Equity
  const [equity, setEquity] = useState({
    capital: 2000000,
    retainedEarnings: 750000
  });

  // Calculations
  const totalCurrentAssets = Object.values(currentAssets).reduce((a, b) => a + b, 0);
  const totalFixedAssets = Object.values(fixedAssets).reduce((a, b) => a + b, 0);
  const totalAssets = totalCurrentAssets + totalFixedAssets;

  const totalCurrentLiabilities = Object.values(currentLiabilities).reduce((a, b) => a + b, 0);
  const totalLongTermLiabilities = Object.values(longTermLiabilities).reduce((a, b) => a + b, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  const totalEquity = Object.values(equity).reduce((a, b) => a + b, 0);
  const totalLiabilitiesEquity = totalLiabilities + totalEquity;

  const balanced = Math.abs(totalAssets - totalLiabilitiesEquity) < 1;

  // Ratios
  const currentRatio = totalCurrentAssets / totalCurrentLiabilities;
  const debtToEquity = totalLiabilities / totalEquity;

  const chartData = [
    { name: language === 'en' ? 'Current Assets' : 'موجودہ اثاثے', value: totalCurrentAssets, color: '#10B981' },
    { name: language === 'en' ? 'Fixed Assets' : 'مقررہ اثاثے', value: totalFixedAssets, color: '#3B82F6' },
    { name: language === 'en' ? 'Current Liabilities' : 'موجودہ واجبات', value: totalCurrentLiabilities, color: '#EF4444' },
    { name: language === 'en' ? 'Long-term Liabilities' : 'طویل مدتی واجبات', value: totalLongTermLiabilities, color: '#F59E0B' },
    { name: language === 'en' ? 'Equity' : 'ایکویٹی', value: totalEquity, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="pink"
        formula="Assets = Liabilities + Equity (Accounting Equation)"
        variables={[
          { symbol: 'Assets', nameEn: 'Current + Fixed assets', nameUrdu: 'موجودہ + مقررہ اثاثے' },
          { symbol: 'Liabilities', nameEn: 'Current + Long-term debts', nameUrdu: 'موجودہ + طویل مدتی قرضے' },
          { symbol: 'Equity', nameEn: 'Capital + Retained earnings', nameUrdu: 'سرمایہ + محفوظ شدہ آمدنی' }
        ]}
        example={[
          { labelEn: 'Current Assets', labelUrdu: 'موجودہ اثاثے', value: 'Rs. 10,50,000 (cash, inventory)' },
          { labelEn: 'Fixed Assets', labelUrdu: 'مقررہ اثاثے', value: 'Rs. 49,00,000 (land, building)' },
          { labelEn: 'Total Assets', labelUrdu: 'کل اثاثے', value: 'Rs. 59,50,000' },
          { labelEn: 'Liabilities', labelUrdu: 'واجبات', value: 'Rs. 32,00,000' },
          { labelEn: 'Equity', labelUrdu: 'ایکویٹی', value: 'Rs. 27,50,000' }
        ]}
        terms={[
          {
            titleEn: 'Current Assets',
            titleUrdu: 'موجودہ اثاثے',
            descEn: 'Cash, inventory, receivables. Convertible to cash within 1 year. Liquidity measure.',
            descUrdu: 'نقد، انوینٹری، وصولیاں۔ 1 سال کے اندر نقد میں تبدیل ہو سکتے ہیں۔ لیکویڈٹی کی پیمائش۔'
          },
          {
            titleEn: 'Fixed Assets',
            titleUrdu: 'مقررہ اثاثے',
            descEn: 'Land, building, equipment. Long-term use (>1 year). Depreciate except land.',
            descUrdu: 'زمین، عمارت، سازوسامان۔ طویل مدتی استعمال (>1 سال)۔ زمین کے علاوہ قدر میں کمی۔'
          },
          {
            titleEn: 'Equity vs Liabilities',
            titleUrdu: 'ایکویٹی بمقابلہ واجبات',
            descEn: 'Equity: owner investment. Liabilities: borrowed money. High debt = risky.',
            descUrdu: 'ایکویٹی: مالک کی سرمایہ کاری۔ واجبات: قرض لیا ہوا پیسہ۔ زیادہ قرض = خطرناک۔'
          }
        ]}
        note={{
          en: 'Balance sheet must balance! Assets = Liabilities + Equity. If not balanced, check entries. Current ratio >1.5 good. Debt-to-equity <1 healthy. Updated at fiscal year end.',
          urdu: 'بیلنس شیٹ کو متوازن ہونا ضروری! اثاثے = واجبات + ایکویٹی۔ اگر متوازن نہیں، اندراجات چیک کریں۔ موجودہ تناسب >1.5 اچھا۔ قرض سے ایکویٹی <1 صحت مند۔ مالی سال کے اختتام پر اپ ڈیٹ۔'
        }}
      />

      <div className="max-w-6xl mx-auto">
        {!balanced && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800 dark:text-red-300 font-bold">
              <TrendingDown className="w-5 h-5" />
              {language === 'en' ? '⚠️ Balance Sheet NOT Balanced!' : '⚠️ بیلنس شیٹ متوازن نہیں!'}
            </div>
            <p className="text-sm text-red-700 dark:text-red-400 mt-2">
              {language === 'en' ? 
                `Difference: ${formatCurrency(Math.abs(totalAssets - totalLiabilitiesEquity))}. Assets must equal Liabilities + Equity.` :
                `فرق: ${formatCurrency(Math.abs(totalAssets - totalLiabilitiesEquity))}۔ اثاثے واجبات + ایکویٹی کے برابر ہونے چاہئیں۔`
              }
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className={`${balanced ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-blue-500 to-cyan-600'} rounded-2xl p-6 text-white`}>
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Assets' : 'کل اثاثے'}</div>
            <div className="text-4xl font-bold">{formatCurrency(totalAssets)}</div>
            {balanced && <div className="text-xs opacity-75 mt-2 flex items-center gap-1"><TrendingUp className="w-4 h-4" /> Balanced</div>}
          </div>

          <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Liabilities' : 'کل واجبات'}</div>
            <div className="text-4xl font-bold">{formatCurrency(totalLiabilities)}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Equity' : 'کل ایکویٹی'}</div>
            <div className="text-4xl font-bold">{formatCurrency(totalEquity)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-pink-600" />
              {language === 'en' ? 'Assets' : 'اثاثے'}
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-3 text-green-600">{language === 'en' ? 'Current Assets' : 'موجودہ اثاثے'}</h4>
                <div className="space-y-2">
                  {Object.entries(currentAssets).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-xs capitalize">{key}</label>
                      <input type="number" value={value} 
                        onChange={(e) => setCurrentAssets({...currentAssets, [key]: parseFloat(e.target.value) || 0})}
                        className="w-full px-3 py-1 text-sm border rounded dark:bg-slate-700" />
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t flex justify-between font-bold text-sm">
                  <span>{language === 'en' ? 'Subtotal' : 'ذیلی کل'}</span>
                  <span className="text-green-600">{formatCurrency(totalCurrentAssets)}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3 text-blue-600">{language === 'en' ? 'Fixed Assets' : 'مقررہ اثاثے'}</h4>
                <div className="space-y-2">
                  {Object.entries(fixedAssets).map(([key, value]) => (
                    <div key={key}>
                      <label className="text-xs capitalize">{key}</label>
                      <input type="number" value={value}
                        onChange={(e) => setFixedAssets({...fixedAssets, [key]: parseFloat(e.target.value) || 0})}
                        className="w-full px-3 py-1 text-sm border rounded dark:bg-slate-700" />
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t flex justify-between font-bold text-sm">
                  <span>{language === 'en' ? 'Subtotal' : 'ذیلی کل'}</span>
                  <span className="text-blue-600">{formatCurrency(totalFixedAssets)}</span>
                </div>
              </div>

              <div className="pt-3 border-t-2 flex justify-between font-bold">
                <span>{language === 'en' ? 'Total Assets' : 'کل اثاثے'}</span>
                <span className="text-xl text-green-600">{formatCurrency(totalAssets)}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Liabilities' : 'واجبات'}</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-3 text-red-600">{language === 'en' ? 'Current Liabilities' : 'موجودہ واجبات'}</h4>
                  <div className="space-y-2">
                    {Object.entries(currentLiabilities).map(([key, value]) => (
                      <div key={key}>
                        <label className="text-xs capitalize">{key}</label>
                        <input type="number" value={value}
                          onChange={(e) => setCurrentLiabilities({...currentLiabilities, [key]: parseFloat(e.target.value) || 0})}
                          className="w-full px-3 py-1 text-sm border rounded dark:bg-slate-700" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t flex justify-between font-bold text-sm">
                    <span>{language === 'en' ? 'Subtotal' : 'ذیلی کل'}</span>
                    <span className="text-red-600">{formatCurrency(totalCurrentLiabilities)}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-3 text-orange-600">{language === 'en' ? 'Long-term Liabilities' : 'طویل مدتی واجبات'}</h4>
                  <div className="space-y-2">
                    {Object.entries(longTermLiabilities).map(([key, value]) => (
                      <div key={key}>
                        <label className="text-xs capitalize">{key}</label>
                        <input type="number" value={value}
                          onChange={(e) => setLongTermLiabilities({...longTermLiabilities, [key]: parseFloat(e.target.value) || 0})}
                          className="w-full px-3 py-1 text-sm border rounded dark:bg-slate-700" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t flex justify-between font-bold text-sm">
                    <span>{language === 'en' ? 'Subtotal' : 'ذیلی کل'}</span>
                    <span className="text-orange-600">{formatCurrency(totalLongTermLiabilities)}</span>
                  </div>
                </div>

                <div className="pt-3 border-t-2 flex justify-between font-bold">
                  <span>{language === 'en' ? 'Total Liabilities' : 'کل واجبات'}</span>
                  <span className="text-xl text-red-600">{formatCurrency(totalLiabilities)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Equity' : 'ایکویٹی'}</h3>
              
              <div className="space-y-2">
                {Object.entries(equity).map(([key, value]) => (
                  <div key={key}>
                    <label className="text-xs capitalize">{key}</label>
                    <input type="number" value={value}
                      onChange={(e) => setEquity({...equity, [key]: parseFloat(e.target.value) || 0})}
                      className="w-full px-3 py-1 text-sm border rounded dark:bg-slate-700" />
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t-2 flex justify-between font-bold">
                <span>{language === 'en' ? 'Total Equity' : 'کل ایکویٹی'}</span>
                <span className="text-xl text-purple-600">{formatCurrency(totalEquity)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Financial Ratios' : 'مالی تناسب'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Current Ratio' : 'موجودہ تناسب'}</span>
                <span className={`font-bold ${currentRatio >= 1.5 ? 'text-green-600' : currentRatio >= 1 ? 'text-orange-600' : 'text-red-600'}`}>
                  {currentRatio.toFixed(2)}:1
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Debt-to-Equity' : 'قرض سے ایکویٹی'}</span>
                <span className={`font-bold ${debtToEquity <= 1 ? 'text-green-600' : debtToEquity <= 2 ? 'text-orange-600' : 'text-red-600'}`}>
                  {debtToEquity.toFixed(2)}:1
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Composition' : 'ترکیب'}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {chartData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <button onClick={() => {
          addToHistory({ calculatorName, result: `Assets: ${formatCurrency(totalAssets)}, Balanced: ${balanced ? 'Yes' : 'No'}` });
          toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
        }}
          className="w-full mt-6 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold py-3 rounded-xl">
          {language === 'en' ? 'Save Balance Sheet' : 'بیلنس شیٹ محفوظ کریں'}
        </button>
      </div>
    </div>
  );
};

export default BalanceSheetCalculator;