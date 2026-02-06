import React, { useState } from 'react';
import { TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const DepreciationCalculator = ({ language, addToHistory, calculatorName }) => {
  const [assetCost, setAssetCost] = useState(1000000);
  const [salvageValue, setSalvageValue] = useState(100000);
  const [usefulLife, setUsefulLife] = useState(10);
  const [method, setMethod] = useState('straight'); // straight, declining

  const depreciableAmount = assetCost - salvageValue;
  const annualDepreciation = depreciableAmount / usefulLife;

  // Generate depreciation schedule
  const schedule = [];
  let bookValue = assetCost;
  
  for (let year = 1; year <= usefulLife; year++) {
    let yearlyDep;
    if (method === 'straight') {
      yearlyDep = annualDepreciation;
    } else {
      const rate = 2 / usefulLife;
      yearlyDep = bookValue * rate;
      if (bookValue - yearlyDep < salvageValue) {
        yearlyDep = bookValue - salvageValue;
      }
    }
    
    const accumulated = schedule.length > 0 ? schedule[schedule.length - 1].accumulated + yearlyDep : yearlyDep;
    bookValue -= yearlyDep;
    
    schedule.push({
      year,
      yearLabel: `${language === 'en' ? 'Year' : 'سال'} ${year}`,
      depreciation: yearlyDep,
      accumulated,
      bookValue: Math.max(bookValue, salvageValue)
    });
  }

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="amber"
        formula="Straight-Line: (Cost - Salvage) ÷ Useful Life | Declining: Book Value × Rate"
        variables={[
          { symbol: 'Cost', nameEn: 'Original purchase price', nameUrdu: 'اصل خریداری کی قیمت' },
          { symbol: 'Salvage', nameEn: 'Estimated scrap value', nameUrdu: 'تخمینہ شدہ کباڑ کی قیمت' },
          { symbol: 'Useful Life', nameEn: 'Years of use', nameUrdu: 'استعمال کے سال' }
        ]}
        example={[
          { labelEn: 'Asset Cost', labelUrdu: 'اثاثہ لاگت', value: 'Rs. 10,00,000' },
          { labelEn: 'Salvage Value', labelUrdu: 'کباڑ کی قیمت', value: 'Rs. 1,00,000' },
          { labelEn: 'Life', labelUrdu: 'زندگی', value: '10 years' },
          { labelEn: 'Annual Depreciation', labelUrdu: 'سالانہ کمی', value: 'Rs. 90,000' }
        ]}
        terms={[
          {
            titleEn: 'Straight-Line Method',
            titleUrdu: 'سیدھی لائن طریقہ',
            descEn: 'Equal depreciation each year. Simple, most common. (Cost-Salvage)÷Life.',
            descUrdu: 'ہر سال برابر کمی۔ سادہ، سب سے عام۔ (لاگت-کباڑ)÷زندگی۔'
          },
          {
            titleEn: 'Declining Balance',
            titleUrdu: 'گھٹتا بیلنس',
            descEn: 'Higher depreciation early years. 2× straight-line rate. Tax benefit.',
            descUrdu: 'ابتدائی سالوں میں زیادہ کمی۔ 2× سیدھی لائن کی شرح۔ ٹیکس فائدہ۔'
          },
          {
            titleEn: 'Asset Types',
            titleUrdu: 'اثاثہ کی اقسام',
            descEn: 'Building: 20-40 years. Equipment: 5-10 years. Vehicles: 5 years. Computers: 3 years.',
            descUrdu: 'عمارت: 20-40 سال۔ سازوسامان: 5-10 سال۔ گاڑیاں: 5 سال۔ کمپیوٹر: 3 سال۔'
          }
        ]}
        note={{
          en: 'Land never depreciates. Depreciation reduces taxable income. Choose method based on tax strategy. Pakistan allows both methods.',
          urdu: 'زمین کبھی قدر میں کم نہیں ہوتی۔ کمی قابل ٹیکس آمدنی کو کم کرتی ہے۔ ٹیکس حکمت عملی کی بنیاد پر طریقہ منتخب کریں۔ پاکستان دونوں طریقوں کی اجازت دیتا ہے۔'
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6">{language === 'en' ? 'Asset Details' : 'اثاثہ کی تفصیلات'}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Asset Cost (Rs.)' : 'اثاثہ لاگت (Rs.)'}</label>
              <input type="number" value={assetCost} onChange={(e) => setAssetCost(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Salvage Value (Rs.)' : 'کباڑ کی قیمت (Rs.)'}</label>
              <input type="number" value={salvageValue} onChange={(e) => setSalvageValue(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Useful Life (Years)' : 'مفید زندگی (سال)'}</label>
              <input type="number" min="1" max="50" value={usefulLife} onChange={(e) => setUsefulLife(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Method' : 'طریقہ'}</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="straight">{language === 'en' ? 'Straight-Line' : 'سیدھی لائن'}</option>
                <option value="declining">{language === 'en' ? 'Declining Balance (2x)' : 'گھٹتا بیلنس (2x)'}</option>
              </select>
            </div>
            <button onClick={() => {
              addToHistory({ calculatorName, result: `${usefulLife} years: ${formatCurrency(annualDepreciation)}/year` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Depreciation' : 'کمی کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Annual Depreciation' : 'سالانہ کمی'}</div>
            <div className="text-4xl font-bold">{formatCurrency(annualDepreciation)}</div>
            <div className="text-xs opacity-75 mt-1">{method === 'straight' ? 'Straight-line' : 'Declining balance'}</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Summary' : 'خلاصہ'}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Original Cost' : 'اصل لاگت'}</span>
                <span className="font-bold">{formatCurrency(assetCost)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Salvage Value' : 'کباڑ کی قیمت'}</span>
                <span className="font-bold">{formatCurrency(salvageValue)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Depreciable Amount' : 'قدر میں کمی کی رقم'}</span>
                <span className="font-bold text-orange-600">{formatCurrency(depreciableAmount)}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="font-bold">{language === 'en' ? 'Years' : 'سال'}</span>
                <span className="font-bold">{usefulLife}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Depreciation Schedule' : 'کمی کا شیڈول'}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={schedule}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="yearLabel" fontSize={11} />
            <YAxis fontSize={12} tickFormatter={(v) => `${(v/100000).toFixed(0)}L`} />
            <Tooltip formatter={(v) => formatCurrency(v)} />
            <Legend />
            <Line type="monotone" dataKey="bookValue" stroke="#F59E0B" strokeWidth={3} name={language === 'en' ? 'Book Value' : 'کتابی قیمت'} />
            <Line type="monotone" dataKey="accumulated" stroke="#EF4444" strokeWidth={2} name={language === 'en' ? 'Accumulated' : 'جمع شدہ'} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepreciationCalculator;