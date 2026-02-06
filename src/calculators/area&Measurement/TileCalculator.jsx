import React, { useState } from 'react';
import { Grid, CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency, currencySymbol } from '../../utils/currency';

const TileCalculator = ({ language, addToHistory, calculatorName }) => {
  const [roomLength, setRoomLength] = useState(12);
  const [roomWidth, setRoomWidth] = useState(10);
  const [tileSize, setTileSize] = useState('2x2'); // in feet
  const [wastage, setWastage] = useState(10);
  const [tilePrice, setTilePrice] = useState(150);

  const tileSizes = {
    '1x1': { ft: 1, name: '1ft × 1ft' },
    '1.5x1.5': { ft: 2.25, name: '1.5ft × 1.5ft' },
    '2x2': { ft: 4, name: '2ft × 2ft' },
    '2x3': { ft: 6, name: '2ft × 3ft' }
  };

  const roomArea = roomLength * roomWidth;
  const tileArea = tileSizes[tileSize].ft;
  const tilesRequired = Math.ceil((roomArea / tileArea) * (1 + wastage / 100));
  const boxSize = 10; // tiles per box
  const boxesRequired = Math.ceil(tilesRequired / boxSize);
  
  const tileCost = tilesRequired * tilePrice;
  const laborCost = roomArea * 80; // Rs. 80 per sq ft labor
  const materialCost = roomArea * 50; // Rs. 50 per sq ft (cement, sand, etc)
  const totalCost = tileCost + laborCost + materialCost;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="green"
        formula="Tiles Required = (Room Area ÷ Tile Area) × (1 + Wastage%)"
        variables={[
          { symbol: 'Room Area', nameEn: 'Length × Width (in sq ft)', nameUrdu: 'لمبائی × چوڑائی (مربع فٹ میں)' },
          { symbol: 'Tile Area', nameEn: 'Size of one tile (sq ft)', nameUrdu: 'ایک ٹائل کا سائز (مربع فٹ)' },
          { symbol: 'Wastage', nameEn: 'Extra for cutting/breakage (10-15%)', nameUrdu: 'کاٹنے/ٹوٹنے کے لیے اضافی (10-15%)' }
        ]}
        example={[
          { labelEn: 'Room', labelUrdu: 'کمرہ', value: '12ft × 10ft = 120 sq ft' },
          { labelEn: 'Tile Size', labelUrdu: 'ٹائل سائز', value: '2ft × 2ft = 4 sq ft per tile' },
          { labelEn: 'Wastage', labelUrdu: 'ضیاع', value: '10%' },
          { labelEn: 'Tiles Needed', labelUrdu: 'ٹائلز کی ضرورت', value: '(120 ÷ 4) × 1.10 = 33 tiles' },
          { labelEn: 'Boxes', labelUrdu: 'باکس', value: '4 boxes (10 tiles each)' }
        ]}
        terms={[
          {
            titleEn: 'Tile Sizes',
            titleUrdu: 'ٹائل سائز',
            descEn: 'Common sizes: 1×1, 1.5×1.5, 2×2, 2×3 feet. Larger tiles = fewer joints = better look.',
            descUrdu: 'عام سائز: 1×1, 1.5×1.5, 2×2, 2×3 فٹ۔ بڑی ٹائلیں = کم جوائنٹ = بہتر شکل۔'
          },
          {
            titleEn: 'Wastage Factor',
            titleUrdu: 'ضیاع عنصر',
            descEn: '10% wastage for straight layout. 15% for diagonal. Includes cutting, breakage.',
            descUrdu: 'سیدھی ترتیب کے لیے 10% ضیاع۔ ترچھی کے لیے 15%۔ کاٹنا، ٹوٹنا شامل ہے۔'
          },
          {
            titleEn: 'Installation Cost',
            titleUrdu: 'تنصیب کی لاگت',
            descEn: 'Labor: Rs. 80-120/sq ft. Materials (cement, sand): Rs. 50-80/sq ft in Pakistan.',
            descUrdu: 'لیبر: Rs. 80-120/مربع فٹ۔ مواد (سیمنٹ، ریت): پاکستان میں Rs. 50-80/مربع فٹ۔'
          }
        ]}
        note={{
          en: 'Always buy 5-10% extra tiles for future repairs. Tile prices vary Rs. 50-500 per sq ft based on quality. Check levelness before tiling.',
          urdu: 'مستقبل کی مرمت کے لیے ہمیشہ 5-10% اضافی ٹائلیں خریدیں۔ ٹائل کی قیمتیں معیار کی بنیاد پر Rs. 50-500 فی مربع فٹ مختلف ہوتی ہیں۔ ٹائلنگ سے پہلے ہمواری چیک کریں۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Grid className="w-5 h-5 text-green-600" />
            {language === 'en' ? 'Tile Details' : 'ٹائل کی تفصیلات'}
          </h3>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Length (ft)' : 'لمبائی (فٹ)'}</label>
                <input type="number" value={roomLength} onChange={(e) => setRoomLength(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Width (ft)' : 'چوڑائی (فٹ)'}</label>
                <input type="number" value={roomWidth} onChange={(e) => setRoomWidth(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Tile Size' : 'ٹائل سائز'}</label>
              <select value={tileSize} onChange={(e) => setTileSize(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                {Object.keys(tileSizes).map(size => (
                  <option key={size} value={size}>{tileSizes[size].name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Wastage (%)' : 'ضیاع (%)'}</label>
              <input type="range" min="5" max="20" value={wastage} onChange={(e) => setWastage(parseFloat(e.target.value))}
                className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg" />
              <input type="number" value={wastage} onChange={(e) => setWastage(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Tile Price (${currencySymbol} per tile)` : `ٹائل قیمت (${currencySymbol} فی ٹائل)`}</label>
              <input type="number" value={tilePrice} onChange={(e) => setTilePrice(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              <p className="text-xs text-slate-500 mt-1">{formatCurrency(tilePrice / tileArea)}/sq ft</p>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${tilesRequired} tiles - ${formatCurrency(totalCost)}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Tiles' : 'ٹائلز کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Tiles Required' : 'ٹائلز کی ضرورت'}</div>
              <div className="text-4xl font-bold">{tilesRequired}</div>
              <div className="text-xs opacity-75 mt-1">{boxesRequired} {language === 'en' ? 'boxes' : 'باکس'}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Cost' : 'کل لاگت'}</div>
              <div className="text-3xl font-bold">{formatCurrency(totalCost)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Calculation' : 'حساب'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Room Area' : 'کمرے کا رقبہ'}</span>
                <span className="font-bold">{roomArea} sq ft</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Tiles (without wastage)' : 'ٹائلیں (بغیر ضیاع)'}</span>
                <span className="font-bold">{Math.ceil(roomArea / tileArea)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? `Wastage (${wastage}%)` : `ضیاع (${wastage}%)`}</span>
                <span className="font-bold text-orange-600">+ {Math.ceil((roomArea / tileArea) * wastage / 100)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Total Tiles' : 'کل ٹائلیں'}</span>
                <span className="font-bold text-green-600">{tilesRequired}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Boxes (10 tiles/box)' : 'باکس (10 ٹائلیں/باکس)'}</span>
                <span className="font-bold">{boxesRequired}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Cost Breakdown' : 'لاگت کی تفصیل'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Tiles Cost' : 'ٹائلز کی لاگت'}</span>
                <span className="font-bold text-green-600">{formatCurrency(tileCost)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Labor (Rs. 80/sq ft)' : 'لیبر (Rs. 80/مربع فٹ)'}</span>
                <span className="font-bold text-orange-600">{formatCurrency(laborCost)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Materials (cement, sand)' : 'مواد (سیمنٹ، ریت)'}</span>
                <span className="font-bold text-blue-600">{formatCurrency(materialCost)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Total Cost' : 'کل لاگت'}</span>
                <span className="font-bold text-xl text-green-600">{formatCurrency(totalCost)}</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
            <h4 className="font-bold text-green-800 dark:text-green-300 mb-3">
              {language === 'en' ? '📐 Tiling Tips' : '📐 ٹائلنگ کے نکات'}
            </h4>
            <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
              <li>✓ {language === 'en' ? 'Buy extra tiles from same batch (color consistency)' : 'ایک ہی بیچ سے اضافی ٹائلیں خریدیں (رنگ کی یکسانیت)'}</li>
              <li>✓ {language === 'en' ? 'Larger tiles look better in big rooms' : 'بڑے کمروں میں بڑی ٹائلیں بہتر نظر آتی ہیں'}</li>
              <li>✓ {language === 'en' ? 'Check tiles for cracks before installation' : 'تنصیب سے پہلے ٹائلوں میں دراڑیں چیک کریں'}</li>
              <li>✓ {language === 'en' ? 'Use tile spacers for uniform gaps' : 'یکساں فاصلے کے لیے ٹائل سپیسرز استعمال کریں'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TileCalculator;