import React, { useState } from 'react';
import { Package, Shield } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const SafetyStockCalculator = ({ language, addToHistory, calculatorName }) => {
  const [method,        setMethod]        = useState('minmax');
  const [maxDemand,     setMaxDemand]     = useState(80);
  const [avgDemand,     setAvgDemand]     = useState(50);
  const [maxLeadDays,   setMaxLeadDays]   = useState(10);
  const [avgLeadDays,   setAvgLeadDays]   = useState(7);
  const [stdDemand,     setStdDemand]     = useState(12);   // std-dev demand
  const [stdLead,       setStdLead]       = useState(1.5);  // std-dev lead
  const [zScore,        setZScore]        = useState(1.65); // 95 % service
  const [unitCost,      setUnitCost]      = useState(200);

  /* ── Min-Max method ── */
  const ssMinMax = (maxDemand * maxLeadDays) - (avgDemand * avgLeadDays);

  /* ── Statistical method  SS = Z × √(avgLead×σd² + avgDemand²×σL²) ── */
  const ssStatistical = Math.round(
    zScore * Math.sqrt(avgLeadDays * stdDemand * stdDemand + avgDemand * avgDemand * stdLead * stdLead)
  );

  const safetyStock  = method === 'minmax' ? ssMinMax : ssStatistical;
  const safetyValue  = safetyStock * unitCost;

  /* service level mapping for selector */
  const serviceLevels = [
    { label:'90%', z:1.28 },
    { label:'95%', z:1.65 },
    { label:'97%', z:1.88 },
    { label:'99%', z:2.33 }
  ];

  const chartData = [
    { name: language==='en'?'Min-Max':'مین-ম گ',       value: ssMinMax,       fill:'#6366F1' },
    { name: language==='en'?'Statistical':'شماریاتی', value: ssStatistical,  fill:'#10B981' }
  ];

  return (
    <div className="space-y-6">
      <InfoPanel
        language={language}
        colorScheme="rose"
        formula="Min-Max: (MaxD×MaxL)−(AvgD×AvgL)  |  Statistical: Z × √(L̄ σd² + d̄² σL²)"
        variables={[
          { symbol: 'Z',  nameEn: 'Z-Score (service level confidence)', nameUrdu: 'Z-سکور (سروس سطح کا اعتماد)' },
          { symbol: 'σd', nameEn: 'Standard deviation of demand',      nameUrdu: 'مانگ کا معیاری انحراف' },
          { symbol: 'σL', nameEn: 'Standard deviation of lead time',   nameUrdu: 'لیڈ وقت کا معیاری انحراف' }
        ]}
        example={[
          { labelEn: 'Avg Demand',     labelUrdu: 'اوسط مانگ',     value: '50 units/day' },
          { labelEn: 'Max Demand',     labelUrdu: 'زیادہ مانگ',    value: '80 units/day' },
          { labelEn: 'Safety Stock',   labelUrdu: 'حفاظتی اسٹاک', value: '350 units (min-max)' },
          { labelEn: 'Safety Value',   labelUrdu: 'حفاظتی قیمت',  value: 'Rs. 70,000' }
        ]}
        terms={[
          { titleEn: 'Min-Max Method',    titleUrdu: 'مین-مکس طریقہ',    descEn: 'Simple buffer. Uses worst-case demand & lead. SS = (MaxD×MaxL)−(AvgD×AvgL). Easy to calculate.', descUrdu: 'آسان بفر۔ بدترین صورت میں مانگ اور لیڈ استعمال۔ آسان حساب۔' },
          { titleEn: 'Statistical',       titleUrdu: 'شماریاتی طریقہ',   descEn: 'Uses standard deviations. More precise. Accounts for probability of stockout.', descUrdu: 'معیاری انحراف استعمال کرتا ہے۔ زیادہ درست۔ اسٹاک آؤٹ کی احتمال۔' },
          { titleEn: 'Service Level',    titleUrdu: 'سروس سطح',         descEn: '95% = fill 95 of 100 orders. Higher = more safety stock + higher cost. Trade-off.', descUrdu: '95% = 100 میں سے 95 آرڈر پورے۔ زیادہ = زیادہ حفاظتی اسٹاک + زیادہ لاگت۔' }
        ]}
        note={{ en: 'Statistical method preferred when demand/lead data available. Min-max when quick estimate needed. Higher service level = higher cost but fewer stockouts.',
                urdu: 'شماریاتی طریقہ ترجیحی ہے جب مانگ/لیڈ ڈیٹا دستیاب ہو۔ مین-مکس جب جلدی تخمینہ ہو۔ زیادہ سروس سطح = زیادہ لاگت لیکن کم اسٹاک آؤٹ۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { lbl:{ en:'Safety Stock',ur:'حفاظتی اسٹاک' },     val: safetyStock, c:'from-rose-500 to-pink-600',     suf: language==='en'?'units':'یونٹس' },
            { lbl:{ en:'Safety Value',ur:'حفاظتی قیمت' },      val: null,        c:'from-purple-500 to-indigo-600', suf: null },
            { lbl:{ en:'Min-Max SS', ur:'مین-مکس' },            val: ssMinMax,    c:'from-indigo-500 to-blue-600',   suf: language==='en'?'units':'یونٹس' },
            { lbl:{ en:'Statistical SS', ur:'شماریاتی' },       val: ssStatistical,c:'from-emerald-500 to-teal-600', suf: language==='en'?'units':'یونٹس' }
          ].map((c, i) => (
            <div key={i} className={`bg-gradient-to-br ${c.c} rounded-2xl p-5 text-white`}>
              <div className="text-xs opacity-80 mb-1">{language === 'en' ? c.lbl.en : c.lbl.ur}</div>
              <div className="text-2xl font-bold">{i===1 ? formatCurrency(safetyValue) : c.val}</div>
              {c.suf && <div className="text-xs opacity-70">{c.suf}</div>}
            </div>
          ))}
        </div>

        {/* method toggle */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex gap-3 mb-5">
            {[['minmax','Min-Max',language==='en'?'Simple worst-case':'آسان بدترین صورت'],['statistical','Statistical',language==='en'?'Precise (needs σ)':'درست (σ ضروری)']].map(([val,lab,desc]) => (
              <button key={val} onClick={()=>setMethod(val)}
                className={`flex-1 p-3 rounded-xl text-left transition-all ${method===val?'bg-rose-600 text-white shadow-lg':'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                <div className="font-bold text-sm">{lab}</div>
                <div className="text-xs opacity-75 mt-0.5">{desc}</div>
              </button>
            ))}
          </div>

          {/* common inputs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { lbl:{ en:'Avg Demand',ur:'اوسط مانگ' },  val:avgDemand,   set:setAvgDemand },
              { lbl:{ en:'Max Demand',ur:'زیادہ مانگ' }, val:maxDemand,   set:setMaxDemand },
              { lbl:{ en:'Avg Lead (days)',ur:'اوسط لیڈ (دن)' }, val:avgLeadDays, set:setAvgLeadDays },
              { lbl:{ en:'Max Lead (days)',ur:'زیادہ لیڈ (دن)' }, val:maxLeadDays, set:setMaxLeadDays }
            ].map((inp,i) => (
              <div key={i}>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language==='en'?inp.lbl.en:inp.lbl.ur}</label>
                <input type="number" value={inp.val} onChange={e=>inp.set(parseFloat(e.target.value)||0)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 text-sm" />
              </div>
            ))}
          </div>

          {/* statistical-only inputs */}
          {method === 'statistical' && (
            <div className="mt-4 pt-4 border-t">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">{language==='en'?'σ Demand':'σ مانگ'}</label>
                  <input type="number" value={stdDemand} onChange={e=>setStdDemand(parseFloat(e.target.value)||0)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">{language==='en'?'σ Lead Time':'σ لیڈ وقت'}</label>
                  <input type="number" value={stdLead} onChange={e=>setStdLead(parseFloat(e.target.value)||0)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">{language==='en'?'Service Level':'سروس سطح'}</label>
                  <div className="flex gap-1">
                    {serviceLevels.map(sl => (
                      <button key={sl.label} onClick={()=>setZScore(sl.z)}
                        className={`flex-1 py-1.5 rounded text-xs font-bold ${zScore===sl.z?'bg-rose-600 text-white':'bg-slate-100 dark:bg-slate-700 text-slate-600'}`}>
                        {sl.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1 mt-4">{language==='en'?'Unit Cost (Rs.)':'یونٹ لاگت (Rs.)'}</label>
            <input type="number" value={unitCost} onChange={e=>setUnitCost(parseFloat(e.target.value)||0)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 text-sm" />
          </div>
        </div>

        {/* chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-3">{language==='en'?'Method Comparison':'طریقوں کا موازنہ'}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={11} />
              <Tooltip formatter={v => `${v} ${language==='en'?'units':'یونٹس'}`} />
              <Bar dataKey="value" radius={[10,10,0,0]} barSize={80}>
                {chartData.map((e,i)=><Cell key={i} fill={e.fill}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <button onClick={()=>{ addToHistory({ calculatorName, result:`Safety Stock: ${safetyStock} units (${method})` }); toast.success(language==='en'?'Saved!':'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Safety Stock' : 'حفاظتی اسٹاک محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default SafetyStockCalculator;