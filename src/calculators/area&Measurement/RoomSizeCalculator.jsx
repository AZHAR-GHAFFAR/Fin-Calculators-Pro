import React, { useState } from 'react';
import { Home, Maximize } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';

const RoomSizeCalculator = ({ language, addToHistory, calculatorName }) => {
  const [length, setLength] = useState(12);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);
  const [roomType, setRoomType] = useState('bedroom');

  // Room size recommendations (in sq ft)
  const recommendations = {
    bedroom: { min: 100, ideal: 120, spacious: 150 },
    masterBedroom: { min: 150, ideal: 180, spacious: 250 },
    livingRoom: { min: 150, ideal: 200, spacious: 300 },
    kitchen: { min: 80, ideal: 120, spacious: 150 },
    bathroom: { min: 35, ideal: 50, spacious: 70 },
    dining: { min: 100, ideal: 140, spacious: 180 }
  };

  const roomArea = length * width;
  const roomVolume = length * width * height;
  const perimeter = 2 * (length + width);

  const rec = recommendations[roomType];
  const sizeCategory = roomArea < rec.min ? 'small' : roomArea < rec.ideal ? 'minimum' : roomArea < rec.spacious ? 'ideal' : 'spacious';

  const sizeColors = {
    small: 'text-red-600',
    minimum: 'text-orange-600',
    ideal: 'text-green-600',
    spacious: 'text-blue-600'
  };

  const sizeLabels = {
    small: language === 'en' ? 'Too Small' : 'بہت چھوٹا',
    minimum: language === 'en' ? 'Minimum Size' : 'کم از کم سائز',
    ideal: language === 'en' ? 'Ideal Size' : 'مثالی سائز',
    spacious: language === 'en' ? 'Spacious' : 'کشادہ'
  };

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="purple"
        formula="Room Area = Length × Width  |  Volume = Length × Width × Height"
        variables={[
          { symbol: 'Area', nameEn: 'Floor space in square feet', nameUrdu: 'مربع فٹ میں فرش کی جگہ' },
          { symbol: 'Volume', nameEn: 'Cubic space for ventilation', nameUrdu: 'وینٹیلیشن کے لیے کیوبک اسپیس' },
          { symbol: 'Perimeter', nameEn: 'Wall length for skirting/molding', nameUrdu: 'اسکرٹنگ/مولڈنگ کے لیے دیوار کی لمبائی' }
        ]}
        example={[
          { labelEn: 'Room', labelUrdu: 'کمرہ', value: '12ft × 10ft × 10ft height' },
          { labelEn: 'Area', labelUrdu: 'رقبہ', value: '12 × 10 = 120 sq ft' },
          { labelEn: 'Volume', labelUrdu: 'حجم', value: '12 × 10 × 10 = 1,200 cu ft' },
          { labelEn: 'Perimeter', labelUrdu: 'پیری میٹر', value: '2 × (12 + 10) = 44 ft' },
          { labelEn: 'Category', labelUrdu: 'قسم', value: 'Ideal bedroom size' }
        ]}
        terms={[
          {
            titleEn: 'Bedroom Sizes',
            titleUrdu: 'بیڈروم سائز',
            descEn: 'Minimum: 100 sq ft. Ideal: 120-150 sq ft. Master bedroom: 180-250 sq ft in Pakistan.',
            descUrdu: 'کم از کم: 100 مربع فٹ۔ مثالی: 120-150 مربع فٹ۔ ماسٹر بیڈروم: پاکستان میں 180-250 مربع فٹ۔'
          },
          {
            titleEn: 'Living Room Standards',
            titleUrdu: 'لیونگ روم معیار',
            descEn: 'Minimum: 150 sq ft. Ideal: 200+ sq ft. L-shape or square layout works best.',
            descUrdu: 'کم از کم: 150 مربع فٹ۔ مثالی: 200+ مربع فٹ۔ L-شکل یا مربع ترتیب بہترین کام کرتی ہے۔'
          },
          {
            titleEn: 'Ceiling Height',
            titleUrdu: 'چھت کی اونچائی',
            descEn: 'Standard: 10 ft. Luxury: 12-14 ft. Higher ceilings feel more spacious, better ventilation.',
            descUrdu: 'معیاری: 10 فٹ۔ لگژری: 12-14 فٹ۔ اونچی چھتیں زیادہ کشادہ محسوس ہوتی ہیں، بہتر وینٹیلیشن۔'
          }
        ]}
        note={{
          en: 'Building bylaws vary by city. Lahore/Karachi require minimum 100 sq ft bedrooms. Check local building codes before construction.',
          urdu: 'عمارتی ضوابط شہر کے لحاظ سے مختلف ہوتے ہیں۔ لاہور/کراچی کم از کم 100 مربع فٹ بیڈروم کی ضرورت ہوتی ہے۔ تعمیر سے پہلے مقامی عمارتی کوڈ چیک کریں۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Home className="w-5 h-5 text-purple-600" />
            {language === 'en' ? 'Room Dimensions' : 'کمرے کی جہتیں'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Room Type' : 'کمرے کی قسم'}</label>
              <select value={roomType} onChange={(e) => setRoomType(e.target.value)}
                className="w-full px-4 py-3 border-2 rounded-lg dark:bg-slate-700 text-lg">
                <option value="bedroom">{language === 'en' ? 'Bedroom' : 'بیڈروم'}</option>
                <option value="masterBedroom">{language === 'en' ? 'Master Bedroom' : 'ماسٹر بیڈروم'}</option>
                <option value="livingRoom">{language === 'en' ? 'Living Room' : 'لیونگ روم'}</option>
                <option value="kitchen">{language === 'en' ? 'Kitchen' : 'کچن'}</option>
                <option value="bathroom">{language === 'en' ? 'Bathroom' : 'باتھ روم'}</option>
                <option value="dining">{language === 'en' ? 'Dining Room' : 'ڈائننگ روم'}</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-2">{language === 'en' ? 'Length (ft)' : 'لمبائی (فٹ)'}</label>
                <input type="number" value={length} onChange={(e) => setLength(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 text-lg font-bold" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">{language === 'en' ? 'Width (ft)' : 'چوڑائی (فٹ)'}</label>
                <input type="number" value={width} onChange={(e) => setWidth(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 text-lg font-bold" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-2">{language === 'en' ? 'Height (ft)' : 'اونچائی (فٹ)'}</label>
                <input type="number" value={height} onChange={(e) => setHeight(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 text-lg font-bold" />
              </div>
            </div>

            <div className={`bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white`}>
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Room Area' : 'کمرے کا رقبہ'}</div>
              <div className="text-5xl font-bold">{roomArea}</div>
              <div className="text-lg opacity-90 mt-2">{language === 'en' ? 'square feet' : 'مربع فٹ'}</div>
            </div>

            <div className={`border-2 rounded-xl p-4 ${sizeCategory === 'small' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : sizeCategory === 'minimum' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : sizeCategory === 'ideal' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'}`}>
              <div className="flex items-center justify-between">
                <span className="font-bold">{language === 'en' ? 'Size Rating:' : 'سائز کی درجہ بندی:'}</span>
                <span className={`text-xl font-bold ${sizeColors[sizeCategory]}`}>
                  {sizeLabels[sizeCategory]}
                </span>
              </div>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${roomArea} sq ft ${roomType}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Save Room' : 'کمرہ محفوظ کریں'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">{language === 'en' ? 'Volume' : 'حجم'}</div>
              <div className="text-3xl font-bold text-blue-600">{roomVolume.toLocaleString()}</div>
              <div className="text-xs text-slate-500 mt-1">{language === 'en' ? 'cubic feet' : 'مکعب فٹ'}</div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">{language === 'en' ? 'Perimeter' : 'پیری میٹر'}</div>
              <div className="text-3xl font-bold text-green-600">{perimeter}</div>
              <div className="text-xs text-slate-500 mt-1">{language === 'en' ? 'feet' : 'فٹ'}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Maximize className="w-5 h-5 text-purple-600" />
              {language === 'en' ? 'Size Recommendations' : 'سائز کی سفارشات'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Minimum' : 'کم از کم'}</span>
                <span className="font-bold text-red-600">{rec.min} sq ft</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Ideal' : 'مثالی'}</span>
                <span className="font-bold text-green-600">{rec.ideal} sq ft</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Spacious' : 'کشادہ'}</span>
                <span className="font-bold text-blue-600">{rec.spacious} sq ft</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Your Room' : 'آپ کا کمرہ'}</span>
                <span className={`font-bold text-xl ${sizeColors[sizeCategory]}`}>{roomArea} sq ft</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'All Room Types' : 'تمام کمرے کی اقسام'}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b">
                <span>{language === 'en' ? 'Bedroom' : 'بیڈروم'}</span>
                <span className="font-semibold">100-150 sq ft</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>{language === 'en' ? 'Master Bedroom' : 'ماسٹر بیڈروم'}</span>
                <span className="font-semibold">180-250 sq ft</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>{language === 'en' ? 'Living Room' : 'لیونگ روم'}</span>
                <span className="font-semibold">200-300 sq ft</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>{language === 'en' ? 'Kitchen' : 'کچن'}</span>
                <span className="font-semibold">100-150 sq ft</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>{language === 'en' ? 'Bathroom' : 'باتھ روم'}</span>
                <span className="font-semibold">40-70 sq ft</span>
              </div>
              <div className="flex justify-between py-2">
                <span>{language === 'en' ? 'Dining' : 'ڈائننگ'}</span>
                <span className="font-semibold">120-180 sq ft</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
            <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3">
              {language === 'en' ? '📐 Design Tips' : '📐 ڈیزائن کے نکات'}
            </h4>
            <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-2">
              <li>✓ {language === 'en' ? 'Square rooms feel more spacious than rectangular' : 'مربع کمرے مستطیل سے زیادہ کشادہ محسوس ہوتے ہیں'}</li>
              <li>✓ {language === 'en' ? 'Higher ceilings (12 ft) add grandeur' : 'اونچی چھتیں (12 فٹ) شان و شوکت میں اضافہ کرتی ہیں'}</li>
              <li>✓ {language === 'en' ? 'Minimum 3:4 length-width ratio recommended' : 'کم از کم 3:4 لمبائی-چوڑائی تناسب تجویز کیا جاتا ہے'}</li>
              <li>✓ {language === 'en' ? 'Master bedroom should be larger than others' : 'ماسٹر بیڈروم دوسروں سے بڑا ہونا چاہیے'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSizeCalculator;