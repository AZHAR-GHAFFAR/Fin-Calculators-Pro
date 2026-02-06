import React, { useState } from 'react';
import { Ruler, ArrowRightLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const AreaConverterCalculator = ({ language, addToHistory, calculatorName }) => {
  const [value, setValue] = useState(100);
  const [fromUnit, setFromUnit] = useState('sqft');
  const [toUnit, setToUnit] = useState('sqm');

  // Conversion factors to square meters
  const toSqMeters = {
    'sqm': 1,
    'sqft': 0.092903,
    'sqyd': 0.836127,
    'marla': 25.2929,
    'kanal': 505.857,
    'acre': 4046.86,
    'hectare': 10000,
    'gaz': 0.836127
  };

  const unitNames = {
    'sqm': { en: 'Square Meter', ur: 'مربع میٹر' },
    'sqft': { en: 'Square Feet', ur: 'مربع فٹ' },
    'sqyd': { en: 'Square Yard', ur: 'مربع گز' },
    'marla': { en: 'Marla', ur: 'مرلہ' },
    'kanal': { en: 'Kanal', ur: 'کنال' },
    'acre': { en: 'Acre', ur: 'ایکڑ' },
    'hectare': { en: 'Hectare', ur: 'ہیکٹر' },
    'gaz': { en: 'Gaz (Sq Yard)', ur: 'گز' }
  };

  // Convert value
  const valueInSqMeters = value * toSqMeters[fromUnit];
  const convertedValue = valueInSqMeters / toSqMeters[toUnit];

  // Common conversions
  const commonConversions = [
    { unit: 'sqm', value: valueInSqMeters },
    { unit: 'sqft', value: valueInSqMeters / toSqMeters['sqft'] },
    { unit: 'sqyd', value: valueInSqMeters / toSqMeters['sqyd'] },
    { unit: 'marla', value: valueInSqMeters / toSqMeters['marla'] },
    { unit: 'kanal', value: valueInSqMeters / toSqMeters['kanal'] },
    { unit: 'acre', value: valueInSqMeters / toSqMeters['acre'] }
  ];

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="yellow"
        formula="Area in Unit B = (Area in Unit A × Conversion Factor A) ÷ Conversion Factor B"
        variables={[
          { symbol: '1 Marla', nameEn: '272.25 sq ft = 25.29 sq m', nameUrdu: '272.25 مربع فٹ = 25.29 مربع میٹر' },
          { symbol: '1 Kanal', nameEn: '20 Marla = 5,445 sq ft = 505.86 sq m', nameUrdu: '20 مرلہ = 5,445 مربع فٹ = 505.86 مربع میٹر' },
          { symbol: '1 Acre', nameEn: '43,560 sq ft = 4,046.86 sq m = 8 Kanal', nameUrdu: '43,560 مربع فٹ = 4,046.86 مربع میٹر = 8 کنال' }
        ]}
        example={[
          { labelEn: 'From', labelUrdu: 'سے', value: '5 Marla' },
          { labelEn: 'To Square Feet', labelUrdu: 'مربع فٹ میں', value: '5 × 272.25 = 1,361.25 sq ft' },
          { labelEn: 'To Square Meters', labelUrdu: 'مربع میٹر میں', value: '5 × 25.29 = 126.45 sq m' },
          { labelEn: 'To Kanal', labelUrdu: 'کنال میں', value: '5 ÷ 20 = 0.25 Kanal' }
        ]}
        terms={[
          {
            titleEn: 'Marla & Kanal',
            titleUrdu: 'مرلہ اور کنال',
            descEn: 'Traditional Pakistani/Indian units. 1 Kanal = 20 Marla. Common in Punjab, KPK.',
            descUrdu: 'روایتی پاکستانی/ہندوستانی اکائیاں۔ 1 کنال = 20 مرلہ۔ پنجاب، کے پی کے میں عام۔'
          },
          {
            titleEn: 'Square Feet vs Yards',
            titleUrdu: 'مربع فٹ بمقابلہ گز',
            descEn: '1 sq yard = 9 sq feet. Yards used for fabric, carpets. Feet for property.',
            descUrdu: '1 مربع گز = 9 مربع فٹ۔ گز کپڑے، قالین کے لیے۔ فٹ پراپرٹی کے لیے۔'
          },
          {
            titleEn: 'Metric System',
            titleUrdu: 'میٹرک نظام',
            descEn: 'Square meters (sq m) and hectares standard internationally. 1 hectare = 10,000 sq m.',
            descUrdu: 'مربع میٹر (sq m) اور ہیکٹر بین الاقوامی سطح پر معیاری۔ 1 ہیکٹر = 10,000 مربع میٹر۔'
          }
        ]}
        note={{
          en: 'Conversions are approximate. Marla/Kanal sizes vary slightly by region. Always verify measurements with official documents when buying property.',
          urdu: 'تبدیلیاں تقریبی ہیں۔ مرلہ/کنال کے سائز علاقے کے لحاظ سے تھوڑا مختلف ہوتے ہیں۔ پراپرٹی خریدتے وقت ہمیشہ سرکاری دستاویزات سے پیمائش کی تصدیق کریں۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Ruler className="w-5 h-5 text-yellow-600" />
            {language === 'en' ? 'Area Conversion' : 'رقبہ کی تبدیلی'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Value' : 'قیمت'}</label>
              <input type="number" value={value} onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border-2 rounded-lg dark:bg-slate-700 text-lg font-semibold" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'From Unit' : 'یونٹ سے'}</label>
              <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg dark:bg-slate-700 text-lg">
                {Object.keys(unitNames).map(unit => (
                  <option key={unit} value={unit}>
                    {language === 'en' ? unitNames[unit].en : unitNames[unit].ur}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button onClick={swapUnits}
                className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full hover:bg-yellow-200 dark:hover:bg-yellow-800 transition">
                <ArrowRightLeft className="w-6 h-6 text-yellow-600" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'To Unit' : 'یونٹ میں'}</label>
              <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg dark:bg-slate-700 text-lg">
                {Object.keys(unitNames).map(unit => (
                  <option key={unit} value={unit}>
                    {language === 'en' ? unitNames[unit].en : unitNames[unit].ur}
                  </option>
                ))}
              </select>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Converted Value' : 'تبدیل شدہ قیمت'}</div>
              <div className="text-4xl font-bold">{convertedValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</div>
              <div className="text-lg opacity-90 mt-2">
                {language === 'en' ? unitNames[toUnit].en : unitNames[toUnit].ur}
              </div>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${value} ${fromUnit} = ${convertedValue.toFixed(2)} ${toUnit}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Save Conversion' : 'تبدیلی محفوظ کریں'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'All Conversions' : 'تمام تبدیلیاں'}</h3>
            <div className="space-y-3">
              {commonConversions.map((conv, idx) => (
                <div key={idx} className="flex justify-between items-center pb-3 border-b last:border-b-0">
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {language === 'en' ? unitNames[conv.unit].en : unitNames[conv.unit].ur}
                  </span>
                  <span className="font-bold text-lg text-yellow-600">
                    {conv.value.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Quick Reference' : 'فوری حوالہ'}</h3>
            <div className="space-y-2 text-sm">
              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                <div className="font-bold text-yellow-800 dark:text-yellow-300">1 Marla =</div>
                <div className="text-yellow-700 dark:text-yellow-400">
                  • 272.25 sq ft<br/>
                  • 25.29 sq m<br/>
                  • 30.25 sq yd
                </div>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                <div className="font-bold text-amber-800 dark:text-amber-300">1 Kanal =</div>
                <div className="text-amber-700 dark:text-amber-400">
                  • 20 Marla<br/>
                  • 5,445 sq ft<br/>
                  • 505.86 sq m
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                <div className="font-bold text-orange-800 dark:text-orange-300">1 Acre =</div>
                <div className="text-orange-700 dark:text-orange-400">
                  • 8 Kanal<br/>
                  • 43,560 sq ft<br/>
                  • 4,046.86 sq m
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
            <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-3">
              {language === 'en' ? '📏 Conversion Tips' : '📏 تبدیلی کے نکات'}
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-2">
              <li>✓ {language === 'en' ? '1 Kanal plot is common residential size in Pakistan' : '1 کنال پلاٹ پاکستان میں عام رہائشی سائز ہے'}</li>
              <li>✓ {language === 'en' ? '5-10 Marla plots popular in urban areas' : '5-10 مرلہ پلاٹس شہری علاقوں میں مقبول ہیں'}</li>
              <li>✓ {language === 'en' ? 'Gaz and Sq Yard are same (0.836 sq m)' : 'گز اور مربع گز ایک جیسے ہیں (0.836 مربع میٹر)'}</li>
              <li>✓ {language === 'en' ? 'Agricultural land measured in Acres/Hectares' : 'زرعی زمین ایکڑ/ہیکٹر میں ناپی جاتی ہے'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaConverterCalculator;