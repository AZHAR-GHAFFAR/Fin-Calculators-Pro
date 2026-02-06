import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';

const LandConverterCalculator = ({ language, addToHistory, calculatorName }) => {
  const [value, setValue] = useState(1);
  const [unit, setUnit] = useState('kanal');

  const conversions = {
    kanal: { marla: 20, sqft: 5445, sqm: 505.857, sqyd: 605, acre: 0.125, hectare: 0.0506 },
    marla: { kanal: 0.05, sqft: 272.25, sqm: 25.2929, sqyd: 30.25, acre: 0.00625, hectare: 0.00253 },
    acre: { kanal: 8, marla: 160, sqft: 43560, sqm: 4046.86, sqyd: 4840, hectare: 0.404686 },
    hectare: { kanal: 19.76, marla: 395.37, sqft: 107639, sqm: 10000, sqyd: 11959.9, acre: 2.47105 }
  };

  const results = conversions[unit];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="green"
        formula="Land Conversion using standard Pakistani units (Marla, Kanal) and international units"
        variables={[
          { symbol: '1 Kanal', nameEn: '20 Marla = 5,445 sq ft = 605 sq yd', nameUrdu: '20 مرلہ = 5,445 مربع فٹ = 605 مربع گز' },
          { symbol: '1 Marla', nameEn: '272.25 sq ft = 25.29 sq m = 30.25 sq yd', nameUrdu: '272.25 مربع فٹ = 25.29 مربع میٹر = 30.25 مربع گز' },
          { symbol: '1 Acre', nameEn: '8 Kanal = 160 Marla = 43,560 sq ft', nameUrdu: '8 کنال = 160 مرلہ = 43,560 مربع فٹ' }
        ]}
        example={[
          { labelEn: 'Land', labelUrdu: 'زمین', value: '1 Kanal' },
          { labelEn: 'In Marla', labelUrdu: 'مرلہ میں', value: '1 × 20 = 20 Marla' },
          { labelEn: 'In Sq Ft', labelUrdu: 'مربع فٹ میں', value: '1 × 5,445 = 5,445 sq ft' },
          { labelEn: 'In Acre', labelUrdu: 'ایکڑ میں', value: '1 ÷ 8 = 0.125 Acre' }
        ]}
        terms={[
          {
            titleEn: 'Kanal & Marla',
            titleUrdu: 'کنال اور مرلہ',
            descEn: 'Traditional land units in Punjab, Pakistan. 1 Kanal = 20 Marla. Common for residential plots.',
            descUrdu: 'پنجاب، پاکستان میں روایتی زمین کی اکائیاں۔ 1 کنال = 20 مرلہ۔ رہائشی پلاٹوں کے لیے عام۔'
          },
          {
            titleEn: 'Agricultural Land',
            titleUrdu: 'زرعی زمین',
            descEn: 'Farms measured in Acres/Hectares. 1 Acre = 8 Kanal. Hectare used internationally.',
            descUrdu: 'فارم ایکڑ/ہیکٹر میں ناپے جاتے ہیں۔ 1 ایکڑ = 8 کنال۔ ہیکٹر بین الاقوامی طور پر استعمال ہوتا ہے۔'
          },
          {
            titleEn: 'Plot Sizes',
            titleUrdu: 'پلاٹ سائز',
            descEn: 'Common: 3-5-7-10 Marla (urban), 1-2 Kanal (peri-urban), 10+ Kanal (farmhouse).',
            descUrdu: 'عام: 3-5-7-10 مرلہ (شہری)، 1-2 کنال (نیم شہری)، 10+ کنال (فارم ہاؤس)۔'
          }
        ]}
        note={{
          en: 'Land measurements vary slightly by region. Always verify with official land records (Fard). In Sindh, "gunta" is used instead of Marla.',
          urdu: 'زمین کی پیمائش علاقے کے لحاظ سے تھوڑی مختلف ہوتی ہے۔ ہمیشہ سرکاری زمین کے ریکارڈ (فرد) سے تصدیق کریں۔ سندھ میں، مرلہ کی جگہ "گنٹھا" استعمال ہوتا ہے۔'
        }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <MapPin className="w-7 h-7 text-green-600" />
            {language === 'en' ? 'Land Unit Converter' : 'زمین یونٹ تبدیل کار'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-lg font-semibold mb-3">{language === 'en' ? 'Enter Value' : 'قیمت درج کریں'}</label>
              <input type="number" value={value} onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                className="w-full px-6 py-4 border-2 rounded-xl dark:bg-slate-700 text-2xl font-bold" />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3">{language === 'en' ? 'Select Unit' : 'یونٹ منتخب کریں'}</label>
              <select value={unit} onChange={(e) => setUnit(e.target.value)}
                className="w-full px-6 py-4 border-2 rounded-xl dark:bg-slate-700 text-xl font-semibold">
                <option value="kanal">{language === 'en' ? 'Kanal' : 'کنال'}</option>
                <option value="marla">{language === 'en' ? 'Marla' : 'مرلہ'}</option>
                <option value="acre">{language === 'en' ? 'Acre' : 'ایکڑ'}</option>
                <option value="hectare">{language === 'en' ? 'Hectare' : 'ہیکٹر'}</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(results).map(([key, val]) => (
              <div key={key} className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5 border-2 border-green-200 dark:border-green-800">
                <div className="text-sm font-semibold text-green-700 dark:text-green-400 mb-2">
                  {language === 'en' ? key.toUpperCase() : key === 'kanal' ? 'کنال' : key === 'marla' ? 'مرلہ' : key === 'acre' ? 'ایکڑ' : key === 'hectare' ? 'ہیکٹر' : key === 'sqft' ? 'مربع فٹ' : key === 'sqm' ? 'مربع میٹر' : 'مربع گز'}
                </div>
                <div className="text-3xl font-bold text-green-800 dark:text-green-300">
                  {(value * val).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>

          <button onClick={() => {
            addToHistory({ calculatorName, result: `${value} ${unit} conversions` });
            toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
          }}
            className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl text-lg">
            {language === 'en' ? 'Save Conversion' : 'تبدیلی محفوظ کریں'}
          </button>
        </div>

        <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h4 className="font-bold text-green-800 dark:text-green-300 mb-4 text-lg">
            {language === 'en' ? '🌾 Quick Reference' : '🌾 فوری حوالہ'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700 dark:text-green-400">
            <div className="space-y-2">
              <div className="font-bold">{language === 'en' ? 'Residential Plots:' : 'رہائشی پلاٹس:'}</div>
              <div>• 3-5 Marla: {language === 'en' ? 'Small house' : 'چھوٹا گھر'}</div>
              <div>• 7-10 Marla: {language === 'en' ? 'Medium house' : 'درمیانہ گھر'}</div>
              <div>• 1-2 Kanal: {language === 'en' ? 'Large house' : 'بڑا گھر'}</div>
            </div>
            <div className="space-y-2">
              <div className="font-bold">{language === 'en' ? 'Commercial/Agricultural:' : 'تجارتی/زرعی:'}</div>
              <div>• 5-10 Kanal: {language === 'en' ? 'Commercial plot' : 'تجارتی پلاٹ'}</div>
              <div>• 1-5 Acres: {language === 'en' ? 'Small farm' : 'چھوٹا فارم'}</div>
              <div>• 10+ Acres: {language === 'en' ? 'Large farm' : 'بڑا فارم'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandConverterCalculator;