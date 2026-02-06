import React, { useState, useMemo } from 'react';
import { Calculator } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const EOQCalculator = ({ language, addToHistory, calculatorName }) => {
  const [annualDemand,  setAnnualDemand]  = useState(10000);
  const [orderingCost,  setOrderingCost]  = useState(500);   // per order
  const [holdingCost,   setHoldingCost]   = useState(12);    // per unit per year

  /* ── EOQ = √(2 D S / H) ── */
  const eoq             = Math.round(Math.sqrt((2 * annualDemand * orderingCost) / holdingCost));
  const ordersPerYear   = annualDemand / eoq;
  const totalOrderCost  = ordersPerYear * orderingCost;
  const avgInventory    = eoq / 2;
  const totalHoldCost   = avgInventory * holdingCost;
  const totalCost       = totalOrderCost + totalHoldCost;   // at EOQ they are equal

  /* ── cost curve: vary Q from 50…2×EOQ ── */
  const chartData = useMemo(() => {
    const step = Math.max(10, Math.round(eoq / 15));
    const pts  = [];
    for (let q = step; q <= eoq * 2.2; q += step) {
      const oc = (annualDemand / q) * orderingCost;
      const hc = (q / 2) * holdingCost;
      pts.push({ qty: q, ordering: Math.round(oc), holding: Math.round(hc), total: Math.round(oc + hc) });
    }
    return pts;
  }, [annualDemand, orderingCost, holdingCost]);

  return (
    <div className="space-y-6">
      <InfoPanel
        language={language}
        colorScheme="sky"
        formula="EOQ = √ (2 × D × S  ÷  H)"
        variables={[
          { symbol: 'D', nameEn: 'Annual Demand (units needed per year)',       nameUrdu: 'سالانہ مانگ (سال میں ضروری یونٹس)' },
          { symbol: 'S', nameEn: 'Ordering Cost (Rs. per order placed)',        nameUrdu: 'آرڈر لاگت (فی آرڈر Rs.)' },
          { symbol: 'H', nameEn: 'Holding Cost (Rs. per unit per year)',        nameUrdu: 'ذخیرہ لاگت (فی یونٹ فی سال Rs.)' }
        ]}
        example={[
          { labelEn: 'Annual Demand',  labelUrdu: 'سالانہ مانگ',    value: '10,000 units' },
          { labelEn: 'Ordering Cost',  labelUrdu: 'آرڈر لاگت',     value: 'Rs. 500/order' },
          { labelEn: 'Holding Cost',   labelUrdu: 'ذخیرہ لاگت',    value: 'Rs. 12/unit/year' },
          { labelEn: 'EOQ',            labelUrdu: 'EOQ',            value: '913 units' },
          { labelEn: 'Total Cost',     labelUrdu: 'کل لاگت',       value: 'Rs. 10,954' }
        ]}
        terms={[
          { titleEn: 'EOQ',            titleUrdu: 'اقتصادی آرڈر مقدار', descEn: 'Optimal order quantity that minimises total ordering + holding cost. Balance point.',                           descUrdu: 'بہترین آرڈر مقدار جو کل آرڈر + ذخیرہ لاگت کم کرتی ہے۔ توازن کا نقطہ۔' },
          { titleEn: 'Ordering Cost',  titleUrdu: 'آرڈر لاگت',         descEn: 'Fixed cost per order – phone, paperwork, delivery fee. Does NOT change with qty.',                            descUrdu: 'فی آرڈر ثابت لاگت – فون، کاغذات، ڈیلیوری فیس۔ مقدار کے ساتھ نہیں بدلتی۔' },
          { titleEn: 'Holding Cost',   titleUrdu: 'ذخیرہ لاگت',        descEn: 'Per-unit annual cost of storing stock: warehouse rent, insurance, obsolescence risk.',                        descUrdu: 'فی یونٹ سالانہ اسٹاک ذخیرہ لاگت: گودام کرایہ، بیما، پرانی ہونے کا خطرہ۔' }
        ]}
        note={{ en: 'EOQ assumes constant demand and instant replenishment. Real world: add safety stock on top. Review when demand pattern changes.',
                urdu: 'EOQ فرض کرتا ہے مستقل مانگ اور فوری دوبارہ فراہتی۔ حقیقی دنیا: اوپر حفاظتی اسٹاک شامل کریں۔ جب مانگ کا نمونہ بدلے تو دوبارہ جانچیں۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        {/* ── KPI ── */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { lbl:{ en:'EOQ',ur:'اقتصادی آرڈر' },           val: eoq,            c:'from-sky-500 to-cyan-600',       suf: language==='en'?'units':'یونٹس', isCurr:false },
            { lbl:{ en:'Orders / Year',ur:'آرڈر/سال' },     val: ordersPerYear,  c:'from-indigo-500 to-purple-600',  suf: language==='en'?'orders':'آرڈر', isCurr:false },
            { lbl:{ en:'Min Total Cost',ur:'کم سے کم لاگت' },val: totalCost,      c:'from-emerald-500 to-green-600',  suf: null,                             isCurr:true }
          ].map((c, i) => (
            <div key={i} className={`bg-gradient-to-br ${c.c} rounded-2xl p-5 text-white`}>
              <div className="text-xs opacity-80 mb-1">{language === 'en' ? c.lbl.en : c.lbl.ur}</div>
              <div className="text-3xl font-bold">{c.isCurr ? formatCurrency(c.val) : (Number.isInteger(c.val) ? c.val : c.val.toFixed(1))}</div>
              {c.suf && <div className="text-xs opacity-70">{c.suf}</div>}
            </div>
          ))}
        </div>

        {/* ── inputs ── */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-4">{language === 'en' ? 'Inputs' : 'ان پٹس'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { lbl:{ en:'Annual Demand (units)',   ur:'سالانہ مانگ (یونٹس)' },   val: annualDemand,  set: setAnnualDemand  },
              { lbl:{ en:'Ordering Cost (Rs./order)',ur:'آرڈر لاگت (Rs./آرڈر)' },  val: orderingCost,  set: setOrderingCost  },
              { lbl:{ en:'Holding Cost (Rs./unit/yr)',ur:'ذخیرہ لاگت (Rs./یونٹ/سال)'}, val: holdingCost, set: setHoldingCost }
            ].map((inp, i) => (
              <div key={i}>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language==='en'?inp.lbl.en:inp.lbl.ur}</label>
                <input type="number" value={inp.val} onChange={e => inp.set(parseFloat(e.target.value)||0)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
            ))}
          </div>

          {/* breakdown table */}
          <div className="mt-5 pt-4 border-t grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { lbl:{ en:'Order Cost/yr',ur:'آرڈر لاگت/سال' }, val: totalOrderCost },
              { lbl:{ en:'Hold Cost/yr', ur:'ذخیرہ لاگت/سال' }, val: totalHoldCost  },
              { lbl:{ en:'Avg Inventory',ur:'اوسط انوینٹری' }, val: avgInventory, isCurr:false },
              { lbl:{ en:'Total Cost/yr',ur:'کل لاگت/سال' },   val: totalCost }
            ].map((r, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
                <div className="text-xs text-slate-500">{language==='en'?r.lbl.en:r.lbl.ur}</div>
                <div className="font-bold text-sm mt-0.5">{r.isCurr===false ? Math.round(r.val)+' units' : formatCurrency(r.val)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── cost curve chart ── */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-3">{language === 'en' ? 'Cost Curve (Ordering vs Holding)' : 'لاگت کا گراف (آرڈر بمقابلہ ذخیرہ)'}</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="qty" fontSize={11} label={{ value: language==='en'?'Order Qty':'آرڈر مقدار', position:'insideBottomRight', offset:-2, fontSize:11 }} />
              <YAxis fontSize={11} tickFormatter={v => `${v}`} />
              <Tooltip formatter={v => formatCurrency(v)} labelFormatter={v => `Qty: ${v}`} />
              <Legend />
              <Line type="monotone" dataKey="ordering" stroke="#EF4444" strokeWidth={2} name={language==='en'?'Ordering Cost':'آرڈر لاگت'} dot={false} />
              <Line type="monotone" dataKey="holding"  stroke="#3B82F6" strokeWidth={2} name={language==='en'?'Holding Cost':'ذخیرہ لاگت'} dot={false} />
              <Line type="monotone" dataKey="total"    stroke="#10B981" strokeWidth={3} name={language==='en'?'Total Cost':'کل لاگت'}     dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `EOQ: ${eoq} units, Total Cost: ${formatCurrency(totalCost)}` }); toast.success(language==='en'?'Saved!':'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save EOQ Result' : 'EOQ نتیجہ محفوظ کریں'}
        </button>
      </div>
    </div>
  );
};
export default EOQCalculator;