import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const WarehouseSpaceCalculator = ({ language, addToHistory, calculatorName }) => {
  const [warehouseArea,  setWarehouseArea]  = useState(5000);  // sq ft
  const [aisleFactor,    setAisleFactor]    = useState(0.60);  // 60% usable
  const [stackHeight,    setStackHeight]    = useState(4);     // layers
  const [costPerSqFt,    setCostPerSqFt]    = useState(25);    // monthly Rs
  const [items, setItems] = useState([
    { name: 'Electronics',  floorArea: 400 },
    { name: 'Clothing',     floorArea: 300 },
    { name: 'Groceries',    floorArea: 500 },
    { name: 'Spare Parts',  floorArea: 200 },
    { name: 'Packaging',    floorArea: 150 }
  ]);

  const usableArea    = warehouseArea * aisleFactor;
  const totalCapacity = usableArea * stackHeight;
  const usedArea      = items.reduce((s, it) => s + it.floorArea, 0);
  const usedCapacity  = usedArea * stackHeight;
  const freeArea      = usableArea - usedArea;
  const utilization   = (usedArea / usableArea) * 100;
  const monthlyCost   = warehouseArea * costPerSqFt;
  const costPerUnit   = usedArea > 0 ? monthlyCost / usedCapacity : 0;

  const chartData = items.map(it => ({
    name: it.name,
    area: it.floorArea,
    fill: ['#6366F1','#10B981','#F59E0B','#EF4444','#8B5CF6','#3B82F6','#EC4899'][items.indexOf(it) % 7]
  }));

  const updateItem = (idx, field, val) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: field === 'name' ? val : parseFloat(val) || 0 } : it));
  };

  return (
    <div className="space-y-6">
      <InfoPanel
        language={language}
        colorScheme="blue"
        formula="Usable Area = Total Area × Aisle Factor  |  Utilization = Used ÷ Usable × 100"
        variables={[
          { symbol: 'Aisle Factor', nameEn: 'Usable % after aisles & walkways (50-70%)', nameUrdu: 'گزرگاہوں کے بعد استعمال شدہ % (50-70%)' },
          { symbol: 'Stack Height', nameEn: 'Number of vertical layers',                nameUrdu: 'عمودی تہوں کی تعداد' },
          { symbol: 'Utilization',  nameEn: 'How full the warehouse is',                nameUrdu: 'گودام کتنا بھرا ہے' }
        ]}
        example={[
          { labelEn: 'Warehouse',   labelUrdu: 'گودام',          value: '5,000 sq ft' },
          { labelEn: 'Usable',      labelUrdu: 'استعمال شدہ',    value: '3,000 sq ft (60%)' },
          { labelEn: 'Used',        labelUrdu: 'استعمال میں',    value: '1,550 sq ft' },
          { labelEn: 'Utilization', labelUrdu: 'استعمال',        value: '51.7%' },
          { labelEn: 'Monthly Cost',labelUrdu: 'ماہانہ لاگت',    value: 'Rs. 1,25,000' }
        ]}
        terms={[
          { titleEn: 'Aisle Factor',  titleUrdu: 'گزرگاہ فیکٹر', descEn: 'Percentage of floor usable for storage (not aisles/doors/pillars). 55-65% typical.', descUrdu: 'منزل کا %جو ذخیرہ کے لیے استعمال ہو سکتا ہے۔ 55-65% عام۔' },
          { titleEn: 'Utilization',   titleUrdu: 'استعمال',       descEn: '<70% ideal – room for operations. 70-85% tight. >85% too full, risk of errors.', descUrdu: '<70% بہترین – آپریشنز کے لیے جگہ۔ 70-85% کسیار۔ >85% بہت بھرا، غلطیوں کا خطرہ۔' },
          { titleEn: 'Cost Analysis', titleUrdu: 'لاگت کا تجزیہ', descEn: 'Monthly cost per sq ft. Compare rent vs owned. Optimize layout to reduce cost/unit.', descUrdu: 'فی مربع فوٹ ماہانہ لاگت۔ کرایہ بمقابلہ اپنا موازنہ۔ لاگت/یونٹ کم کرنے کے لیے لیاؤٹ بہتر بنائیں۔' }
        ]}
        note={{ en: 'Keep utilization 60-75%. Above 80% slows operations. Consider vertical racking to increase capacity without more floor space.',
                urdu: 'استعمال 60-75% رکھیں۔ 80% سے اوپر آپریشنز سست ہوتے ہیں۔ زیادہ فلور جگہ کے بغیر صلاحیت بڑھانے کے لیے عمودی رکنگ سوچیں۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { lbl:{ en:'Total Area',ur:'کل رقبہ' },        val: `${warehouseArea.toLocaleString()} sqft`, c:'from-blue-500 to-cyan-600' },
            { lbl:{ en:'Usable Area',ur:'استعمال شدہ رقبہ' },val: `${usableArea.toLocaleString()} sqft`, c:'from-indigo-500 to-blue-600' },
            { lbl:{ en:'Utilization',ur:'استعمال' },         val: `${utilization.toFixed(1)}%`,           c: utilization<=75?'from-emerald-500 to-green-600':'from-amber-500 to-orange-600' },
            { lbl:{ en:'Monthly Cost',ur:'ماہانہ لاگت' },   val: formatCurrency(monthlyCost),            c:'from-purple-500 to-pink-600' }
          ].map((c,i)=>(
            <div key={i} className={`bg-gradient-to-br ${c.c} rounded-2xl p-5 text-white`}>
              <div className="text-xs opacity-80 mb-1">{language==='en'?c.lbl.en:c.lbl.ur}</div>
              <div className="text-2xl font-bold">{c.val}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* warehouse settings + items */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-4">{language==='en'?'Warehouse Settings':'گودام ترتیب'}</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { lbl:{ en:'Total Area (sqft)',ur:'کل رقبہ (sqft)' },     val: warehouseArea,  set: setWarehouseArea },
                { lbl:{ en:'Aisle Factor (%)',ur:'گزرگاہ فیکٹر (%)' },    val: aisleFactor*100,set: (v)=>setAisleFactor(v/100) },
                { lbl:{ en:'Stack Layers',ur:'تہیں' },                     val: stackHeight,    set: setStackHeight },
                { lbl:{ en:'Cost/sqft/month (Rs.)',ur:'لاگت/sqft/مہینہ' }, val: costPerSqFt,    set: setCostPerSqFt }
              ].map((inp,i)=>(
                <div key={i}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">{language==='en'?inp.lbl.en:inp.lbl.ur}</label>
                  <input type="number" value={inp.val} onChange={e=>inp.set(parseFloat(e.target.value)||0)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 text-sm" />
                </div>
              ))}
            </div>

            <div className="mt-5">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-sm">{language==='en'?'Storage Zones':'ذخیرہ زونز'}</h4>
                <button onClick={()=>setItems(prev=>[...prev,{ name:'New Zone', floorArea:100 }])} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold">+</button>
              </div>
              <div className="space-y-2">
                {items.map((it, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input type="text" value={it.name} onChange={e=>updateItem(idx,'name',e.target.value)} className="flex-1 px-2 py-1 border rounded dark:bg-slate-700 text-sm" />
                    <input type="number" value={it.floorArea} onChange={e=>updateItem(idx,'floorArea',e.target.value)} className="w-24 px-2 py-1 border rounded dark:bg-slate-700 text-sm text-right" />
                    <span className="text-xs text-slate-400">sqft</span>
                    <button onClick={()=>setItems(prev=>prev.filter((_,i)=>i!==idx))} className="text-red-400 hover:text-red-600">×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* chart + summary */}
          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-3">{language==='en'?'Zone Breakdown':'زون کی تفصیل'}</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis fontSize={11} tickFormatter={v=>`${v} ft²`} />
                  <Tooltip formatter={v=>`${v} sqft`} />
                  <Bar dataKey="area" radius={[8,8,0,0]}>
                    {chartData.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* utilization bar */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-3">{language==='en'?'Space Utilization':'جگہ کا استعمال'}</h3>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-6 overflow-hidden">
                <div className={`h-full rounded-full flex items-center justify-center text-white text-xs font-bold transition-all ${utilization<=60?'bg-emerald-500':utilization<=75?'bg-yellow-500':'bg-red-500'}`}
                  style={{ width: `${Math.min(utilization, 100)}%` }}>
                  {utilization.toFixed(1)}%
                </div>
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>0%</span>
                <span className="text-emerald-600 font-bold">60% ideal</span>
                <span className="text-amber-600 font-bold">75%</span>
                <span className="text-red-600 font-bold">100%</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-500">{language==='en'?'Free Area':'آزاد رقبہ'}</div>
                  <div className="font-bold">{freeArea.toLocaleString()} sqft</div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-500">{language==='en'?'Cost / Capacity Unit':'لاگت / ذخیرہ یونٹ'}</div>
                  <div className="font-bold">{formatCurrency(costPerUnit)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={()=>{ addToHistory({ calculatorName, result:`Utilization: ${utilization.toFixed(1)}%, Cost: ${formatCurrency(monthlyCost)}/mo` }); toast.success(language==='en'?'Saved!':'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Warehouse Report' : 'گودام رپورٹ محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default WarehouseSpaceCalculator;