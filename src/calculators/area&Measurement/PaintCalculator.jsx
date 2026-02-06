import React, { useState } from 'react';
import { Paintbrush } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const PaintCalculator = ({ language, addToHistory, calculatorName }) => {
  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(10);
  const [roomHeight, setRoomHeight] = useState(10);
  const [doors, setDoors] = useState(2);
  const [windows, setWindows] = useState(2);
  const [coats, setCoats] = useState(2);
  const [paintType, setPaintType] = useState('emulsion'); // emulsion, distemper, plastic

  // Coverage per liter (sq ft)
  const coveragePerLiter = {
    emulsion: 120,
    distemper: 140,
    plastic: 110
  };

  // Price per liter (PKR)
  const pricePerLiter = {
    emulsion: 800,
    distemper: 400,
    plastic: 600
  };

  // Calculate wall area
  const wallArea = 2 * (roomLength + roomWidth) * roomHeight;
  const doorArea = doors * 21; // Standard door 7ft × 3ft
  const windowArea = windows * 15; // Standard window 5ft × 3ft
  const paintableArea = (wallArea - doorArea - windowArea) * coats;

  // Paint required
  const litersRequired = paintableArea / coveragePerLiter[paintType];
  const gallonsRequired = litersRequired / 3.785;

  // Cost calculation
  const paintCost = Math.ceil(litersRequired) * pricePerLiter[paintType];
  const laborCost = paintableArea * 15; // Rs. 15 per sq ft labor
  const totalCost = paintCost + laborCost;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="blue"
        formula="Paint Required = (Wall Area - Doors - Windows) × Coats ÷ Coverage per Liter"
        variables={[
          { symbol: 'Wall Area', nameEn: '2 × (Length + Width) × Height', nameUrdu: '2 × (لمبائی + چوڑائی) × اونچائی' },
          { symbol: 'Coverage', nameEn: '120-140 sq ft per liter', nameUrdu: '120-140 مربع فٹ فی لیٹر' },
          { symbol: 'Coats', nameEn: 'Usually 2 coats recommended', nameUrdu: 'عام طور پر 2 کوٹ تجویز کیے جاتے ہیں' }
        ]}
        example={[
          { labelEn: 'Room', labelUrdu: 'کمرہ', value: '12ft × 10ft × 10ft height' },
          { labelEn: 'Doors', labelUrdu: 'دروازے', value: '2 doors (7ft × 3ft each)' },
          { labelEn: 'Windows', labelUrdu: 'کھڑکیاں', value: '2 windows (5ft × 3ft each)' },
          { labelEn: 'Wall Area', labelUrdu: 'دیوار کا رقبہ', value: '440 sq ft - 42 - 30 = 368 sq ft' },
          { labelEn: 'Paint (2 coats)', labelUrdu: 'پینٹ (2 کوٹ)', value: '736 ÷ 120 = 6.1 liters' },
          { labelEn: 'Cost', labelUrdu: 'لاگت', value: '7 liters × Rs. 800 = Rs. 5,600' }
        ]}
        terms={[
          {
            titleEn: 'Paint Types',
            titleUrdu: 'پینٹ کی اقسام',
            descEn: 'Emulsion: Best quality, washable. Distemper: Economical, not washable. Plastic: Mid-range.',
            descUrdu: 'ایملشن: بہترین معیار، دھونے کے قابل۔ ڈسٹیمپر: اقتصادی، دھونے کے قابل نہیں۔ پلاسٹک: درمیانی رینج۔'
          },
          {
            titleEn: 'Coverage Area',
            titleUrdu: 'کوریج ایریا',
            descEn: '1 liter covers 120-140 sq ft per coat. Rough walls need more paint. Smooth walls need less.',
            descUrdu: '1 لیٹر 120-140 مربع فٹ فی کوٹ کو کور کرتا ہے۔ کھردری دیواروں کو زیادہ پینٹ کی ضرورت ہوتی ہے۔ ہموار دیواروں کو کم۔'
          },
          {
            titleEn: 'Primer Importance',
            titleUrdu: 'پرائمر کی اہمیت',
            descEn: 'Always apply primer on new walls. Saves 20-30% paint. Improves finish quality.',
            descUrdu: 'ہمیشہ نئی دیواروں پر پرائمر لگائیں۔ 20-30% پینٹ بچاتا ہے۔ فنش کے معیار کو بہتر بناتا ہے۔'
          }
        ]}
        note={{
          en: 'Add 10% extra paint for wastage and touch-ups. Actual coverage varies by wall texture and paint quality. Labor cost Rs. 10-20 per sq ft in Pakistan.',
          urdu: 'ضیاع اور ٹچ اپ کے لیے 10% اضافی پینٹ شامل کریں۔ اصل کوریج دیوار کی ساخت اور پینٹ کے معیار کے لحاظ سے مختلف ہوتی ہے۔ پاکستان میں لیبر کی لاگت Rs. 10-20 فی مربع فٹ۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Paintbrush className="w-5 h-5 text-blue-600" />
            {language === 'en' ? 'Room Details' : 'کمرے کی تفصیلات'}
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-2">{language === 'en' ? 'Length (ft)' : 'لمبائی (فٹ)'}</label>
                <input type="number" value={roomLength} onChange={(e) => setRoomLength(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">{language === 'en' ? 'Width (ft)' : 'چوڑائی (فٹ)'}</label>
                <input type="number" value={roomWidth} onChange={(e) => setRoomWidth(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">{language === 'en' ? 'Height (ft)' : 'اونچائی (فٹ)'}</label>
                <input type="number" value={roomHeight} onChange={(e) => setRoomHeight(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Doors' : 'دروازے'}</label>
                <input type="number" min="0" max="10" value={doors} onChange={(e) => setDoors(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Windows' : 'کھڑکیاں'}</label>
                <input type="number" min="0" max="10" value={windows} onChange={(e) => setWindows(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Number of Coats' : 'کوٹس کی تعداد'}</label>
              <select value={coats} onChange={(e) => setCoats(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="1">1 {language === 'en' ? 'Coat' : 'کوٹ'}</option>
                <option value="2">2 {language === 'en' ? 'Coats (Recommended)' : 'کوٹ (تجویز کردہ)'}</option>
                <option value="3">3 {language === 'en' ? 'Coats' : 'کوٹ'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Paint Type' : 'پینٹ کی قسم'}</label>
              <select value={paintType} onChange={(e) => setPaintType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="emulsion">{language === 'en' ? 'Emulsion (Rs. 800/liter)' : 'ایملشن (Rs. 800/لیٹر)'}</option>
                <option value="plastic">{language === 'en' ? 'Plastic Paint (Rs. 600/liter)' : 'پلاسٹک پینٹ (Rs. 600/لیٹر)'}</option>
                <option value="distemper">{language === 'en' ? 'Distemper (Rs. 400/liter)' : 'ڈسٹیمپر (Rs. 400/لیٹر)'}</option>
              </select>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${litersRequired.toFixed(1)} liters - ${formatCurrency(totalCost)}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Paint' : 'پینٹ کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Paint Required' : 'پینٹ کی ضرورت'}</div>
              <div className="text-3xl font-bold">{Math.ceil(litersRequired)}</div>
              <div className="text-xs opacity-75 mt-1">{language === 'en' ? 'liters' : 'لیٹر'}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Cost' : 'کل لاگت'}</div>
              <div className="text-3xl font-bold">{formatCurrency(totalCost)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Calculation Details' : 'حساب کی تفصیلات'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Wall Area' : 'دیوار کا رقبہ'}</span>
                <span className="font-bold">{wallArea.toFixed(0)} sq ft</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Door Area' : 'دروازے کا رقبہ'}</span>
                <span className="font-bold text-red-600">- {doorArea} sq ft</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Window Area' : 'کھڑکی کا رقبہ'}</span>
                <span className="font-bold text-red-600">- {windowArea} sq ft</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Paintable Area (per coat)' : 'قابل پینٹ رقبہ (فی کوٹ)'}</span>
                <span className="font-bold">{(paintableArea / coats).toFixed(0)} sq ft</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? `Total Area (${coats} coats)` : `کل رقبہ (${coats} کوٹ)`}</span>
                <span className="font-bold text-blue-600">{paintableArea.toFixed(0)} sq ft</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Paint Required' : 'پینٹ کی ضرورت'}</span>
                <span className="font-bold text-green-600">{Math.ceil(litersRequired)} {language === 'en' ? 'liters' : 'لیٹر'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Cost Breakdown' : 'لاگت کی تفصیل'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Paint Cost' : 'پینٹ کی لاگت'}</span>
                <span className="font-bold text-blue-600">{formatCurrency(paintCost)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Labor Cost (Rs. 15/sq ft)' : 'لیبر کی لاگت (Rs. 15/مربع فٹ)'}</span>
                <span className="font-bold text-orange-600">{formatCurrency(laborCost)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Total Cost' : 'کل لاگت'}</span>
                <span className="font-bold text-xl text-green-600">{formatCurrency(totalCost)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">
              {language === 'en' ? '🎨 Painting Tips' : '🎨 پینٹنگ کے نکات'}
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>✓ {language === 'en' ? 'Buy 10% extra paint for wastage & future touch-ups' : 'ضیاع اور مستقبل کے ٹچ اپ کے لیے 10% اضافی پینٹ خریدیں'}</li>
              <li>✓ {language === 'en' ? 'Apply primer on new walls - saves paint & improves finish' : 'نئی دیواروں پر پرائمر لگائیں - پینٹ بچاتا ہے اور فنش بہتر کرتا ہے'}</li>
              <li>✓ {language === 'en' ? 'Use good quality brushes/rollers for smooth finish' : 'ہموار فنش کے لیے اچھے معیار کے برش/رولر استعمال کریں'}</li>
              <li>✓ {language === 'en' ? 'Paint in dry season (avoid monsoon)' : 'خشک موسم میں پینٹ کریں (مانسون سے بچیں)'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintCalculator;