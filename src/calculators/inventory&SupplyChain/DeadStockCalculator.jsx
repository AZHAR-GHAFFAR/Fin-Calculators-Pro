import React, { useState } from 'react';
import { Package, AlertTriangle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const DeadStockCalculator = ({ language, addToHistory, calculatorName }) => {
  const [items, setItems] = useState([
    { name: 'Old Electronics', totalQty: 200, soldLast90: 5,  unitCost: 3500, action: 'dispose' },
    { name: 'Seasonal Clothes', totalQty: 150, soldLast90: 30, unitCost: 800,  action: 'discount' },
    { name: 'Spare Parts',      totalQty: 80,  soldLast90: 0,  unitCost: 1200, action: 'dispose' },
    { name: 'Old Packaging',    totalQty: 500, soldLast90: 10, unitCost: 50,   action: 'discount' }
  ]);
  const [discountPct, setDiscountPct] = useState(40);

  /* ── per-item calculations ── */
  const rows = items.map(it => {
    const turnRate  = it.soldLast90 / it.totalQty * 100;
    const isDead    = it.soldLast90 === 0;
    const isSlow    = !isDead && turnRate < 10;
    const totalVal  = it.totalQty * it.unitCost;
    const recoverable = it.action === 'discount' ? totalVal * (1 - discountPct / 100) : 0;
    const loss      = totalVal - recoverable;
    return { ...it, turnRate, isDead, isSlow, totalVal, recoverable, loss };
  });

  const totalDeadValue   = rows.filter(r => r.isDead).reduce((s, r) => s + r.totalVal, 0);
  const totalSlowValue   = rows.filter(r => r.isSlow).reduce((s, r) => s + r.totalVal, 0);
  const totalRecoverable = rows.reduce((s, r) => s + r.recoverable, 0);
  const totalLoss        = rows.reduce((s, r) => s + r.loss, 0);
  const totalInventory   = rows.reduce((s, r) => s + r.totalVal, 0);

  const pieData = [
    { name: language==='en'?'Dead Stock':'ڈیڈ اسٹاک',     value: totalDeadValue, color:'#EF4444' },
    { name: language==='en'?'Slow Stock':'سست اسٹاک',     value: totalSlowValue, color:'#F59E0B' },
    { name: language==='en'?'Active Stock':'فعال اسٹاک',  value: totalInventory - totalDeadValue - totalSlowValue, color:'#10B981' }
  ];

  const updateItem = (idx, field, val) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: field === 'name' || field === 'action' ? val : parseFloat(val) || 0 } : it));
  };

  return (
    <div className="space-y-6">
      <InfoPanel
        language={language}
        colorScheme="red"
        formula="Dead Stock: 0 sales in last 90 days  |  Slow: <10% sold in 90 days"
        variables={[
          { symbol: 'Dead',  nameEn: 'Items with zero sales in 90 days',         nameUrdu: ' 90 دنوں میں صفر فروخت والی اشیاء' },
          { symbol: 'Slow',  nameEn: 'Items with <10% sales in 90 days',         nameUrdu: '90 دنوں میں <10% فروخت والی اشیاء' },
          { symbol: 'Loss',  nameEn: 'Value that cannot be recovered',           nameUrdu: 'وہ قیمت جو واپس نہیں ہو سکتی' }
        ]}
        example={[
          { labelEn: 'Dead Stock Value',  labelUrdu: 'ڈیڈ اسٹاک قیمت',  value: 'Rs. 7,00,000' },
          { labelEn: 'Slow Stock Value',  labelUrdu: 'سست اسٹاک قیمت',  value: 'Rs. 1,20,000' },
          { labelEn: 'Recoverable',       labelUrdu: 'واپس شدہ',         value: 'Rs. 1,50,000 (60% discount)' },
          { labelEn: 'Total Loss',        labelUrdu: 'کل نقصان',         value: 'Rs. 7,70,000' }
        ]}
        terms={[
          { titleEn: 'Dead Stock',      titleUrdu: 'ڈیڈ اسٹاک',      descEn: 'Unsellable inventory. Zero demand for 90+ days. Write-off or donate. Hurts profitability.', descUrdu: 'ناقابل فروخت انوینٹری۔ 90+ دنوں میں صفر مانگ۔ رائٹ آف یا عطیہ۔ منافع نقصان۔' },
          { titleEn: 'Slow Moving',     titleUrdu: 'سست رفتار',       descEn: 'Low demand but not zero. <10% sold per quarter. Discount or reposition to move.', descUrdu: 'کم مانگ لیکن صفر نہیں۔ <10% فصل میں فروخت۔ ڈسکاؤنٹ یا دوسری جگہ رکھیں۔' },
          { titleEn: 'Recovery',        titleUrdu: 'بحالی',            descEn: 'Options: clearance sale, bundle deals, return to supplier, donate/recycle.', descUrdu: 'اختیارات: کلیرنس سیل، بنڈل ڈیلز، سپلائیر کو واپسی، عطیہ/ریسائکل۔' }
        ]}
        note={{ en: 'Review inventory every 30 days. Catch dead/slow stock early. Prevention: better demand forecasting, smaller order quantities, diversified suppliers.',
                urdu: 'انوینٹری ہر 30 دن میں جانچیں۔ جلد ڈیڈ/سست اسٹاک پکڑیں۔ احتیاط: بہتر مانگ کا تخمینہ، چھوٹے آرڈر مقداریں، متنوع سپلائیرز۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { lbl:{ en:'Dead Stock',ur:'ڈیڈ اسٹاک' },    val: totalDeadValue,   c:'from-red-500 to-rose-600' },
            { lbl:{ en:'Slow Stock',ur:'سست اسٹاک' },    val: totalSlowValue,   c:'from-amber-500 to-orange-600' },
            { lbl:{ en:'Recoverable',ur:'واپس شدہ' },     val: totalRecoverable, c:'from-emerald-500 to-green-600' },
            { lbl:{ en:'Total Loss',ur:'کل نقصان' },     val: totalLoss,        c:'from-slate-500 to-slate-600' }
          ].map((c,i)=>(
            <div key={i} className={`bg-gradient-to-br ${c.c} rounded-2xl p-5 text-white`}>
              <div className="text-xs opacity-80 mb-1">{language==='en'?c.lbl.en:c.lbl.ur}</div>
              <div className="text-2xl font-bold">{formatCurrency(c.val)}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* items table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">{language==='en'?'Inventory Items':'انوینٹری آئٹمز'}</h3>
              <button onClick={()=>setItems(prev=>[...prev,{ name:'New Item', totalQty:100, soldLast90:0, unitCost:500, action:'dispose' }])}
                className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-lg font-bold hover:bg-red-200">+ {language==='en'?'Add':'شامل'}</button>
            </div>
            <div className="space-y-3">
              {rows.map((row, idx) => (
                <div key={idx} className={`p-3 rounded-lg border-l-4 ${row.isDead ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : row.isSlow ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/10' : 'border-green-500 bg-green-50 dark:bg-green-900/10'}`}>
                  <div className="flex justify-between items-center">
                    <input type="text" value={row.name} onChange={e=>updateItem(idx,'name',e.target.value)} className="font-bold text-sm bg-transparent border-b border-slate-300 dark:border-slate-600 w-40" />
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${row.isDead ? 'bg-red-200 text-red-800' : row.isSlow ? 'bg-amber-200 text-amber-800' : 'bg-green-200 text-green-800'}`}>
                      {row.isDead ? (language==='en'?'Dead':'ڈیڈ') : row.isSlow ? (language==='en'?'Slow':'سست') : (language==='en'?'Active':'فعال')}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div><label className="text-xs text-slate-500">{language==='en'?'Total Qty':'کل مقدار'}</label><input type="number" value={row.totalQty} onChange={e=>updateItem(idx,'totalQty',e.target.value)} className="w-full px-2 py-1 border rounded dark:bg-slate-700 text-sm" /></div>
                    <div><label className="text-xs text-slate-500">{language==='en'?'Sold (90d)':'فروخت (90d)'}</label><input type="number" value={row.soldLast90} onChange={e=>updateItem(idx,'soldLast90',e.target.value)} className="w-full px-2 py-1 border rounded dark:bg-slate-700 text-sm" /></div>
                    <div><label className="text-xs text-slate-500">{language==='en'?'Unit Cost':'یونٹ لاگت'}</label><input type="number" value={row.unitCost} onChange={e=>updateItem(idx,'unitCost',e.target.value)} className="w-full px-2 py-1 border rounded dark:bg-slate-700 text-sm" /></div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {['discount','dispose'].map(a=>(
                      <button key={a} onClick={()=>updateItem(idx,'action',a)}
                        className={`flex-1 text-xs py-1 rounded font-bold ${row.action===a?'bg-red-600 text-white':'bg-slate-200 dark:bg-slate-700 text-slate-600'}`}>
                        {a==='discount' ? (language==='en'?'Discount Sale':'ڈسکاؤنٹ فروخت') : (language==='en'?'Write-Off':'راایٹ آف')}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {language==='en'?'Value':'قیمت'}: {formatCurrency(row.totalVal)} | {language==='en'?'Loss':'نقصان'}: {formatCurrency(row.loss)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {/* discount slider */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">{language==='en'?'Clearance Discount':'کلیرنس ڈسکاؤنٹ'}</h3>
                <span className="text-xl font-bold text-red-600">{discountPct}%</span>
              </div>
              <input type="range" min={10} max={90} value={discountPct} onChange={e=>setDiscountPct(parseInt(e.target.value))} className="w-full accent-red-600" />
              <div className="flex justify-between text-xs text-slate-400 mt-1"><span>10%</span><span>90%</span></div>
            </div>

            {/* pie chart */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-3">{language==='en'?'Stock Health':'اسٹاک صحت'}</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {pieData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                  </Pie>
                  <Tooltip formatter={v=>formatCurrency(v)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <button onClick={()=>{ addToHistory({ calculatorName, result:`Dead: ${formatCurrency(totalDeadValue)}, Loss: ${formatCurrency(totalLoss)}` }); toast.success(language==='en'?'Saved!':'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Dead Stock Report' : 'ڈیڈ اسٹاک رپورٹ محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default DeadStockCalculator;