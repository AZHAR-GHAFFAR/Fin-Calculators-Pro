import React, { useState } from 'react';
import { Hammer } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const RenovationCostCalculator = ({ language, addToHistory, calculatorName }) => {
  const [rooms, setRooms] = useState([
    { name: 'Living Room', area: 250, ratePerSqft: 1200, labor: 80000 },
    { name: 'Kitchen', area: 150, ratePerSqft: 1800, labor: 120000 },
    { name: 'Bedroom 1', area: 200, ratePerSqft: 1000, labor: 60000 },
    { name: 'Bathroom', area: 80, ratePerSqft: 2000, labor: 90000 }
  ]);
  const [permits, setPermits] = useState(50000);
  const [contingency, setContingency] = useState(10); // %

  const roomCosts = rooms.map(r => ({
    ...r,
    materialCost: r.area * r.ratePerSqft,
    total: r.area * r.ratePerSqft + r.labor
  }));

  const subtotal = roomCosts.reduce((s, r) => s + r.total, 0);
  const contingencyAmount = (subtotal * contingency) / 100;
  const totalCost = subtotal + permits + contingencyAmount;

  const chartData = roomCosts.map(r => ({
    name: r.name,
    value: r.total,
    fill: ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][rooms.indexOf(r) % 5]
  }));

  const updateRoom = (idx, field, val) => {
    setRooms(prev => prev.map((r, i) => i === idx ? { ...r, [field]: field === 'name' ? val : parseFloat(val) || 0 } : r));
  };

  return (
    <div className="space-y-6">
      <InfoPanel
        language={language}
        colorScheme="orange"
        formula="Total = Σ(Area × Rate/sqft + Labor) + Permits + Contingency"
        variables={[
          { symbol: 'Rate/sqft', nameEn: 'Material cost per square foot', nameUrdu: 'فی مربع فوٹ مواد کی لاگت' },
          { symbol: 'Labor', nameEn: 'Installation & workmanship charges', nameUrdu: 'تنصیب اور کاریگری چارجز' },
          { symbol: 'Contingency', nameEn: 'Buffer for unexpected costs (10-15%)', nameUrdu: 'غیر متوقع اخراجات کا بفر (10-15%)' }
        ]}
        example={[
          { labelEn: 'Living Room', labelUrdu: 'لونگ روم', value: '250 sqft × Rs. 1,200 + Rs. 80K labor' },
          { labelEn: 'Kitchen', labelUrdu: 'کچن', value: '150 sqft × Rs. 1,800 + Rs. 120K labor' },
          { labelEn: 'Subtotal', labelUrdu: 'ذیلی کل', value: 'Rs. 8,90,000' },
          { labelEn: 'Total + 10%', labelUrdu: 'کل + 10%', value: 'Rs. 10,29,000' }
        ]}
        terms={[
          { titleEn: 'Material Rates', titleUrdu: 'مواد کی شرحیں', descEn: 'Basic: Rs. 800-1K/sqft. Mid: Rs. 1.2-1.5K. Premium: Rs. 2K+. Kitchen/bath higher.', descUrdu: 'بنیادی: Rs. 800-1K/sqft۔ درمیانہ: Rs. 1.2-1.5K۔ پریمیم: Rs. 2K+۔ کچن/باتھ زیادہ۔' },
          { titleEn: 'Labor Cost', titleUrdu: 'مزدوری لاگت', descEn: '30-40% of material cost. Skilled labor higher. Painting/tiling separate.', descUrdu: 'مواد لاگت کا 30-40%۔ ماہر مزدور زیادہ۔ پینٹنگ/ٹائلنگ الگ۔' },
          { titleEn: 'Contingency', titleUrdu: 'احتیاطی', descEn: 'Always add 10-15% buffer. Unexpected issues common in renovations.', descUrdu: 'ہمیشہ 10-15% بفر شامل کریں۔ تزئین میں غیر متوقع مسائل عام۔' }
        ]}
        note={{
          en: 'Get 3+ contractor quotes. Check previous work. Payment schedule: 30% advance, 40% mid, 30% completion. Timeline: 4-8 weeks typical.',
          urdu: '3+ ٹھیکیدار کوٹس حاصل کریں۔ پچھلے کام چیک کریں۔ ادائیگی شیڈول: 30% ایڈوانس، 40% درمیان، 30% تکمیل۔ وقت: 4-8 ہفتے عام۔'
        }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        <div className={`bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl p-8 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <Hammer className="w-6 h-6" />
            <span className="text-sm opacity-90">{language === 'en' ? 'Total Renovation Cost' : 'کل تزئین لاگت'}</span>
          </div>
          <div className="text-5xl font-bold">{formatCurrency(totalCost)}</div>
          <div className="text-xs opacity-75 mt-2">{language === 'en' ? `${rooms.length} rooms • ${rooms.reduce((s, r) => s + r.area, 0)} total sqft` : `${rooms.length} کمرے • ${rooms.reduce((s, r) => s + r.area, 0)} کل sqft`}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">{language === 'en' ? 'Room-by-Room' : 'کمرے وار'}</h3>
              <button onClick={() => setRooms([...rooms, { name: 'New Room', area: 100, ratePerSqft: 1000, labor: 40000 }])}
                className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-lg font-bold hover:bg-orange-200">+ {language === 'en' ? 'Add' : 'شامل'}</button>
            </div>

            <div className="space-y-3">
              {roomCosts.map((room, idx) => (
                <div key={idx} className="p-3 border rounded-lg dark:border-slate-700">
                  <input type="text" value={room.name} onChange={e => updateRoom(idx, 'name', e.target.value)}
                    className="font-bold text-sm bg-transparent border-b border-slate-300 dark:border-slate-600 w-full mb-2" />
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-slate-500">{language === 'en' ? 'Area (sqft)' : 'رقبہ (sqft)'}</label>
                      <input type="number" value={room.area} onChange={e => updateRoom(idx, 'area', e.target.value)}
                        className="w-full px-2 py-1 border rounded dark:bg-slate-700 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">{language === 'en' ? 'Rate/sqft' : 'شرح/sqft'}</label>
                      <input type="number" value={room.ratePerSqft} onChange={e => updateRoom(idx, 'ratePerSqft', e.target.value)}
                        className="w-full px-2 py-1 border rounded dark:bg-slate-700 text-sm" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">{language === 'en' ? 'Labor' : 'مزدوری'}</label>
                      <input type="number" value={room.labor} onChange={e => updateRoom(idx, 'labor', e.target.value)}
                        className="w-full px-2 py-1 border rounded dark:bg-slate-700 text-sm" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 pt-2 border-t text-sm">
                    <span className="text-slate-500">{language === 'en' ? 'Room Total' : 'کمرے کا کل'}</span>
                    <span className="font-bold text-orange-600">{formatCurrency(room.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-3">{language === 'en' ? 'Cost Breakdown' : 'لاگت کی تفصیل'}</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={10} />
                  <YAxis fontSize={11} tickFormatter={v => `${(v / 100000).toFixed(0)}L`} />
                  <Tooltip formatter={v => formatCurrency(v)} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-4">{language === 'en' ? 'Additional Costs' : 'اضافی اخراجات'}</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Permits & Approvals (Rs.)' : 'اجازت نامے (Rs.)'}</label>
                  <input type="number" value={permits} onChange={e => setPermits(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Contingency (%)' : 'احتیاطی (%)'}</label>
                  <input type="number" value={contingency} onChange={e => setContingency(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between pb-2 border-b"><span>{language === 'en' ? 'Rooms Subtotal' : 'کمروں کا کل'}</span><span className="font-bold">{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between pb-2 border-b"><span>{language === 'en' ? 'Permits' : 'اجازت نامے'}</span><span className="font-bold">{formatCurrency(permits)}</span></div>
                <div className="flex justify-between pb-2 border-b"><span>{language === 'en' ? `Contingency (${contingency}%)` : `احتیاطی (${contingency}%)`}</span><span className="font-bold">{formatCurrency(contingencyAmount)}</span></div>
                <div className="flex justify-between pt-2 font-bold text-lg"><span>{language === 'en' ? 'Total Cost' : 'کل لاگت'}</span><span className="text-orange-600">{formatCurrency(totalCost)}</span></div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `Renovation: ${formatCurrency(totalCost)} (${rooms.length} rooms)` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Renovation Estimate' : 'تزئین تخمینہ محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default RenovationCostCalculator;