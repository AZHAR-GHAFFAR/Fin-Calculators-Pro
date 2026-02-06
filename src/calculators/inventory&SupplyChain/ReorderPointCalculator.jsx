import React, { useState } from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const ReorderPointCalculator = ({ language, addToHistory, calculatorName }) => {
  const [dailyDemand, setDailyDemand]         = useState(50);
  const [leadDays,    setLeadDays]            = useState(7);
  const [maxDemand,   setMaxDemand]           = useState(80);
  const [avgDemand,   setAvgDemand]           = useState(50);
  const [maxLeadDays, setMaxLeadDays]         = useState(10);
  const [avgLeadDays, setAvgLeadDays]         = useState(7);
  const [unitCost,    setUnitCost]            = useState(200);
  const [orderQty,    setOrderQty]            = useState(500);

  /* ── core formulas ── */
  const safetyStock  = (maxDemand * maxLeadDays) - (avgDemand * avgLeadDays);
  const rop          = (avgDemand * avgLeadDays) + safetyStock; // = maxDemand * maxLeadDays
  const maxStock     = rop + orderQty;
  const minStock     = rop - safetyStock;

  /* ── simulate 30 days for chart ── */
  const chartData = Array.from({ length: 30 }, (_, day) => {
    // simplified sawtooth
    const cycleLen   = orderQty / dailyDemand;
    const dayInCycle = day % cycleLen;
    const stock      = maxStock - dailyDemand * dayInCycle;
    return { day: day + 1, stock: Math.round(stock), rop, safetyStock, minStock };
  });

  const inputs = [
    { label: { en: 'Avg Daily Demand', ur: 'اوسط روزانہ مانگ' },   val: avgDemand,   set: setAvgDemand,   unit: language === 'en' ? 'units/day' : 'یونٹس/دن' },
    { label: { en: 'Max Daily Demand', ur: 'زیادہ تر روزانہ مانگ' },val: maxDemand,   set: setMaxDemand,   unit: language === 'en' ? 'units/day' : 'یونٹس/دن' },
    { label: { en: 'Avg Lead Time',    ur: 'اوسط لیڈ وقت' },       val: avgLeadDays, set: setAvgLeadDays,  unit: language === 'en' ? 'days' : 'دن' },
    { label: { en: 'Max Lead Time',    ur: 'زیادہ سے زیادہ لیڈ وقت' },val: maxLeadDays,set: setMaxLeadDays,unit: language === 'en' ? 'days' : 'دن' },
    { label: { en: 'Unit Cost',        ur: 'یونٹ لاگت' },           val: unitCost,    set: setUnitCost,    unit: 'Rs.' },
    { label: { en: 'Order Quantity',   ur: 'آرڈر مقدار' },          val: orderQty,    set: setOrderQty,    unit: language === 'en' ? 'units' : 'یونٹس' }
  ];

  return (
    <div className="space-y-6">
      <InfoPanel
        language={language}
        colorScheme="orange"
        formula="ROP = (Avg Demand × Avg Lead Time) + Safety Stock"
        variables={[
          { symbol: 'ROP',           nameEn: 'Reorder Point – trigger level to place new order',  nameUrdu: 'دوبارہ آرڈر پوائنٹ – نیا آرڈر دینے کا ٹریگر' },
          { symbol: 'Safety Stock',  nameEn: '(Max Demand×Max Lead) – (Avg Demand×Avg Lead)',    nameUrdu: '(زیادہ مانگ×زیادہ لیڈ) – (اوسط مانگ×اوسط لیڈ)' },
          { symbol: 'Lead Time',     nameEn: 'Days from order to delivery',                       nameUrdu: 'آرڈر سے ڈیلیوری تک کے دن' }
        ]}
        example={[
          { labelEn: 'Avg Demand',    labelUrdu: 'اوسط مانگ',     value: '50 units/day' },
          { labelEn: 'Avg Lead',      labelUrdu: 'اوسط لیڈ',      value: '7 days' },
          { labelEn: 'Safety Stock',  labelUrdu: 'حفاظتی اسٹاک', value: '350 units' },
          { labelEn: 'ROP',           labelUrdu: 'ROP',            value: '700 units' }
        ]}
        terms={[
          { titleEn: 'Reorder Point',  titleUrdu: 'دوبارہ آرڈر پوائنٹ',  descEn: 'Stock level to trigger reorder. = Avg usage × Lead time + Safety stock. Critical for uninterrupted supply.', descUrdu: 'آرڈر دینے کا اسٹاک سطح۔ = اوسط استعمال × لیڈ وقت + حفاظتی اسٹاک۔ بلا انقطاع سپلائی کے لیے اہم۔' },
          { titleEn: 'Safety Stock',   titleUrdu: 'حفاظتی اسٹاک',       descEn: 'Buffer for unexpected demand/delays. Extra stock to avoid stockout. Cost vs risk balance.',                     descUrdu: 'غیر متوقع مانگ/تاخیر کا بفر۔ اسٹاک آؤٹ سے بچنے کا اضافی اسٹاک۔ لاگت بمقابلہ خطرہ کا توازن۔' },
          { titleEn: 'Lead Time',      titleUrdu: 'لیڈ وقت',             descEn: 'Order to delivery time. Includes processing, shipping, receiving. Shorter = less safety stock needed.', descUrdu: 'آرڈر سے ڈیلیوری کا وقت۔ پروسیسنگ، شپنگ، اسقبال شامل۔ کم = کم حفاظتی اسٹاک کی ضرورت۔' }
        ]}
        note={{ en: 'Review ROP monthly. Seasonal demand changes ROP. Track actual vs forecast. Supplier reliability matters – unreliable = higher safety stock.',
                urdu: 'ROP ماہانہ جانچیں۔ موسمی مانگ ROP بدلتی ہے۔ حقیقی بمقابلہ تخمینہ ٹریک کریں۔ سپلائیر کی قابل اعتماد اہم ہے – غیر قابل اعتماد = زیادہ حفاظتی اسٹاک۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        {/* KPI row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { lbl: { en:'Reorder Point', ur:'دوبارہ آرڈر پوائنٹ' }, val: rop,         c:'from-orange-500 to-amber-600',  suf: language==='en'?'units':'یونٹس' },
            { lbl: { en:'Safety Stock',  ur:'حفاظتی اسٹاک' },       val: safetyStock,  c:'from-red-500 to-rose-600',      suf: language==='en'?'units':'یونٹس' },
            { lbl: { en:'Max Stock',     ur:'زیادہ اسٹاک' },        val: maxStock,     c:'from-emerald-500 to-green-600', suf: language==='en'?'units':'یونٹس' },
            { lbl: { en:'Safety Value',  ur:'حفاظتی قیمت' },        val: null,         c:'from-purple-500 to-indigo-600', suf: null }
          ].map((c, i) => (
            <div key={i} className={`bg-gradient-to-br ${c.c} rounded-2xl p-5 text-white`}>
              <div className="text-xs opacity-80 mb-1">{language === 'en' ? c.lbl.en : c.lbl.ur}</div>
              <div className="text-2xl font-bold">
                {i === 3 ? formatCurrency(safetyStock * unitCost) : c.val}
              </div>
              {c.suf && <div className="text-xs opacity-70">{c.suf}</div>}
            </div>
          ))}
        </div>

        {/* inputs grid */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-4">{language === 'en' ? 'Parameters' : 'پیرامیٹرز'}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {inputs.map((inp, i) => (
              <div key={i}>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? inp.label.en : inp.label.ur} <span className="text-slate-400">({inp.unit})</span></label>
                <input type="number" value={inp.val} onChange={e => inp.set(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 text-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* area chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-3">{language === 'en' ? 'Stock Level Simulation (30 days)' : 'اسٹاک سطح سمیولیشن (30 دن)'}</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366F1" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" fontSize={11} label={{ value: language === 'en' ? 'Day' : 'دن', position: 'insideBottomRight', offset: -2, fontSize: 11 }} />
              <YAxis fontSize={11} />
              <Tooltip />
              <ReferenceLine y={rop}          stroke="#F59E0B" strokeDasharray="6 3" label={{ value:'ROP',          position:'right', fontSize:11, fill:'#F59E0B' }} />
              <ReferenceLine y={safetyStock}  stroke="#EF4444" strokeDasharray="4 4" label={{ value:'Safety',       position:'right', fontSize:11, fill:'#EF4444' }} />
              <Area type="monotone" dataKey="stock" stroke="#6366F1" strokeWidth={2.5} fill="url(#stockGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `ROP: ${rop}, Safety: ${safetyStock}` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Reorder Point' : 'دوبارہ آرڈر پوائنٹ محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default ReorderPointCalculator;