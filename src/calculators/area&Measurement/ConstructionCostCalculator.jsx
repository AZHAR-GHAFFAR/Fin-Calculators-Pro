import React, { useState } from 'react';
import { Hammer, Home } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const ConstructionCostCalculator = ({ language, addToHistory, calculatorName }) => {
  const [plotArea, setPlotArea] = useState(5); // Marla
  const [coveredArea, setCoveredArea] = useState(1800); // sq ft
  const [floors, setFloors] = useState(2);
  const [quality, setQuality] = useState('medium'); // basic, medium, premium
  const [city, setCity] = useState('lahore');

  // Construction cost per sq ft (PKR) - 2024 rates
  const costPerSqFt = {
    basic: { lahore: 2200, karachi: 2400, islamabad: 2500, other: 2000 },
    medium: { lahore: 3000, karachi: 3200, islamabad: 3300, other: 2800 },
    premium: { lahore: 4500, karachi: 4800, islamabad: 5000, other: 4200 }
  };

  const baseCost = coveredArea * costPerSqFt[quality][city];
  
  // Breakdown percentages
  const breakdown = {
    greyStructure: baseCost * 0.50,
    finishing: baseCost * 0.25,
    electrical: baseCost * 0.10,
    plumbing: baseCost * 0.08,
    miscellaneous: baseCost * 0.07
  };

  const totalCost = Object.values(breakdown).reduce((a, b) => a + b, 0);
  const costPerMarla = totalCost / plotArea;

  const chartData = [
    { name: language === 'en' ? 'Grey Structure' : 'گرے سٹرکچر', value: breakdown.greyStructure, color: '#3B82F6' },
    { name: language === 'en' ? 'Finishing' : 'فنشنگ', value: breakdown.finishing, color: '#10B981' },
    { name: language === 'en' ? 'Electrical' : 'بجلی', value: breakdown.electrical, color: '#F59E0B' },
    { name: language === 'en' ? 'Plumbing' : 'پلمبنگ', value: breakdown.plumbing, color: '#EF4444' },
    { name: language === 'en' ? 'Miscellaneous' : 'متفرق', value: breakdown.miscellaneous, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="orange"
        formula="Total Cost = Covered Area (sq ft) × Cost per sq ft × Quality Factor × City Factor"
        variables={[
          { symbol: 'Grey Structure', nameEn: '50% - Foundation, walls, roof, columns', nameUrdu: '50% - بنیاد، دیواریں، چھت، کالم' },
          { symbol: 'Finishing', nameEn: '25% - Tiles, paint, doors, windows', nameUrdu: '25% - ٹائلیں، پینٹ، دروازے، کھڑکیاں' },
          { symbol: 'Cost per sq ft', nameEn: 'Rs. 2,000-5,000 depending on quality', nameUrdu: 'معیار کے لحاظ سے Rs. 2,000-5,000' }
        ]}
        example={[
          { labelEn: 'Plot', labelUrdu: 'پلاٹ', value: '5 Marla (1,362 sq ft)' },
          { labelEn: 'Covered Area', labelUrdu: 'کورڈ ایریا', value: '1,800 sq ft (2 floors)' },
          { labelEn: 'Quality', labelUrdu: 'معیار', value: 'Medium (Rs. 3,000/sq ft)' },
          { labelEn: 'City', labelUrdu: 'شہر', value: 'Lahore' },
          { labelEn: 'Total Cost', labelUrdu: 'کل لاگت', value: 'Rs. 54,00,000' },
          { labelEn: 'Per Marla', labelUrdu: 'فی مرلہ', value: 'Rs. 10,80,000' }
        ]}
        terms={[
          {
            titleEn: 'Grey Structure',
            titleUrdu: 'گرے سٹرکچر',
            descEn: 'Basic structure without finishing. Includes foundation, walls, roof, plaster. 50% of total.',
            descUrdu: 'بغیر فنشنگ کے بنیادی ڈھانچہ۔ بنیاد، دیواریں، چھت، پلاسٹر شامل ہے۔ کل کا 50%۔'
          },
          {
            titleEn: 'Covered vs Plot Area',
            titleUrdu: 'کورڈ بمقابلہ پلاٹ ایریا',
            descEn: 'Plot = Total land. Covered = Built area. For 5 Marla, max 1,200-1,800 sq ft covered allowed.',
            descUrdu: 'پلاٹ = کل زمین۔ کورڈ = تعمیر شدہ رقبہ۔ 5 مرلہ کے لیے، زیادہ سے زیادہ 1,200-1,800 مربع فٹ کورڈ کی اجازت۔'
          },
          {
            titleEn: 'Construction Rates 2024',
            titleUrdu: 'تعمیراتی شرحیں 2024',
            descEn: 'Basic: Rs. 2,000-2,500/sq ft. Medium: Rs. 3,000-3,500. Premium: Rs. 4,500-5,500.',
            descUrdu: 'بنیادی: Rs. 2,000-2,500/مربع فٹ۔ میڈیم: Rs. 3,000-3,500۔ پریمیم: Rs. 4,500-5,500۔'
          }
        ]}
        note={{
          en: 'Costs are estimates based on 2024 rates in Pakistan. Actual costs vary by material quality, labor rates, and design complexity. Add 10-15% contingency for unforeseen expenses.',
          urdu: 'لاگتیں پاکستان میں 2024 کی شرحوں پر مبنی تخمینے ہیں۔ اصل لاگت مواد کے معیار، لیبر کی شرحوں، اور ڈیزائن کی پیچیدگی کے لحاظ سے مختلف ہوتی ہے۔ غیر متوقع اخراجات کے لیے 10-15% کنٹنجنسی شامل کریں۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Hammer className="w-5 h-5 text-orange-600" />
            {language === 'en' ? 'Construction Details' : 'تعمیر کی تفصیلات'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Plot Area (Marla)' : 'پلاٹ کا رقبہ (مرلہ)'}</label>
              <input type="number" min="3" max="20" value={plotArea} onChange={(e) => setPlotArea(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Covered Area (sq ft)' : 'کورڈ ایریا (مربع فٹ)'}</label>
              <input type="range" min="800" max="5000" step="100" value={coveredArea}
                onChange={(e) => setCoveredArea(parseFloat(e.target.value))}
                className="w-full h-2 bg-orange-100 dark:bg-orange-900 rounded-lg" />
              <input type="number" value={coveredArea} onChange={(e) => setCoveredArea(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Number of Floors' : 'منزلوں کی تعداد'}</label>
              <select value={floors} onChange={(e) => setFloors(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="1">{language === 'en' ? 'Ground Floor Only' : 'صرف گراؤنڈ فلور'}</option>
                <option value="2">{language === 'en' ? 'Ground + 1st Floor' : 'گراؤنڈ + پہلی منزل'}</option>
                <option value="3">{language === 'en' ? 'Ground + 2 Floors' : 'گراؤنڈ + 2 منزلیں'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Construction Quality' : 'تعمیر کا معیار'}</label>
              <select value={quality} onChange={(e) => setQuality(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="basic">{language === 'en' ? 'Basic (Rs. 2,000-2,500/sq ft)' : 'بنیادی (Rs. 2,000-2,500/مربع فٹ)'}</option>
                <option value="medium">{language === 'en' ? 'Medium (Rs. 3,000-3,500/sq ft)' : 'میڈیم (Rs. 3,000-3,500/مربع فٹ)'}</option>
                <option value="premium">{language === 'en' ? 'Premium (Rs. 4,500-5,500/sq ft)' : 'پریمیم (Rs. 4,500-5,500/مربع فٹ)'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'City' : 'شہر'}</label>
              <select value={city} onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="lahore">{language === 'en' ? 'Lahore' : 'لاہور'}</option>
                <option value="karachi">{language === 'en' ? 'Karachi' : 'کراچی'}</option>
                <option value="islamabad">{language === 'en' ? 'Islamabad' : 'اسلام آباد'}</option>
                <option value="other">{language === 'en' ? 'Other Cities' : 'دیگر شہر'}</option>
              </select>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${formatCurrency(totalCost)} for ${coveredArea} sq ft` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Cost' : 'لاگت کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Cost' : 'کل لاگت'}</div>
              <div className="text-3xl font-bold">{formatCurrency(totalCost)}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Per Marla' : 'فی مرلہ'}</div>
              <div className="text-3xl font-bold">{formatCurrency(costPerMarla)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Cost Breakdown' : 'لاگت کی تفصیل'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} paddingAngle={2} dataKey="value">
                  {chartData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Detailed Breakdown' : 'تفصیلی خلاصہ'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Grey Structure (50%)' : 'گرے سٹرکچر (50%)'}</span>
                <span className="font-bold text-blue-600">{formatCurrency(breakdown.greyStructure)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Finishing (25%)' : 'فنشنگ (25%)'}</span>
                <span className="font-bold text-green-600">{formatCurrency(breakdown.finishing)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Electrical (10%)' : 'بجلی (10%)'}</span>
                <span className="font-bold text-yellow-600">{formatCurrency(breakdown.electrical)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Plumbing (8%)' : 'پلمبنگ (8%)'}</span>
                <span className="font-bold text-red-600">{formatCurrency(breakdown.plumbing)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Miscellaneous (7%)' : 'متفرق (7%)'}</span>
                <span className="font-bold text-purple-600">{formatCurrency(breakdown.miscellaneous)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Total Construction Cost' : 'کل تعمیراتی لاگت'}</span>
                <span className="font-bold text-xl text-orange-600">{formatCurrency(totalCost)}</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6">
            <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-3 flex items-center gap-2">
              <Home className="w-5 h-5" />
              {language === 'en' ? '💡 Construction Tips' : '💡 تعمیر کے نکات'}
            </h4>
            <ul className="text-sm text-orange-700 dark:text-orange-400 space-y-2">
              <li>• {language === 'en' ? 'Add 10-15% contingency for unexpected costs' : 'غیر متوقع اخراجات کے لیے 10-15% شامل کریں'}</li>
              <li>• {language === 'en' ? 'Material costs fluctuate - lock rates before starting' : 'مواد کی قیمتیں بدلتی ہیں - شروع کرنے سے پہلے شرحیں لاک کریں'}</li>
              <li>• {language === 'en' ? 'Hire architect for better design & cost control' : 'بہتر ڈیزائن اور لاگت کنٹرول کے لیے آرکیٹیکٹ رکھیں'}</li>
              <li>• {language === 'en' ? 'Get 3 quotes from contractors before deciding' : 'فیصلہ کرنے سے پہلے ٹھیکیداروں سے 3 قیمتیں حاصل کریں'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructionCostCalculator;