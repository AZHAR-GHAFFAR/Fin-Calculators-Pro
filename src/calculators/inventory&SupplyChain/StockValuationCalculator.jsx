import React, { useState, useMemo } from 'react';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const StockValuationCalculator = ({ language, addToHistory, calculatorName }) => {
  const [method, setMethod] = useState('fifo');
  const [items, setItems] = useState([
    { date: '2025-01-01', qty: 100, price: 150 },
    { date: '2025-01-15', qty: 80,  price: 170 },
    { date: '2025-02-01', qty: 120, price: 160 },
    { date: '2025-02-20', qty: 60,  price: 190 }
  ]);
  const [soldQty, setSoldQty] = useState(150);

  const totalQty   = items.reduce((s, i) => s + i.qty, 0);
  const totalCost  = items.reduce((s, i) => s + i.qty * i.price, 0);
  const avgPrice   = totalCost / totalQty;
  const remainQty  = totalQty - soldQty;

  /* ---------- valuation engine ---------- */
  const calc = useMemo(() => {
    let left = soldQty;
    let cogs = 0;
    const layers = items.map(i => ({ ...i, used: 0 }));

    if (method === 'fifo' || method === 'lifo') {
      const order = method === 'fifo' ? [...layers] : [...layers].reverse();
      order.forEach(layer => {
        if (left <= 0) return;
        const take = Math.min(left, layer.qty);
        layer.used = take;
        cogs += take * layer.price;
        left -= take;
      });
      // map back
      if (method === 'lifo') {
        const rev = order.reverse();
        layers.forEach((l, i) => { l.used = rev[i].used; });
      }
    } else {
      // weighted average
      layers.forEach(l => { l.used = (l.qty / totalQty) * soldQty; });
      cogs = soldQty * avgPrice;
    }

    const closingValue = totalCost - cogs;
    return { cogs, closingValue, layers };
  }, [method, items, soldQty, totalQty, totalCost, avgPrice]);

  const chartData = [
    { name: language === 'en' ? 'Total Cost' : 'کل لاگت',          value: totalCost,          fill: '#6366F1' },
    { name: language === 'en' ? 'COGS (Sold)' : 'COGS (فروخت)',    value: calc.cogs,          fill: '#EF4444' },
    { name: language === 'en' ? 'Closing Stock' : 'باقی اسٹاک',    value: calc.closingValue,  fill: '#10B981' }
  ];

  const updateItem = (idx, field, val) => {
    setItems(prev => prev.map((it, i) => i === idx ? { ...it, [field]: field === 'date' ? val : parseFloat(val) || 0 } : it));
  };
  const addItem = () => setItems(prev => [...prev, { date: '2025-03-01', qty: 50, price: 165 }]);
  const removeItem = (idx) => setItems(prev => prev.filter((_, i) => i !== idx));

  return (
    <div className="space-y-6">
      {/* ── InfoPanel ── */}
      <InfoPanel
        language={language}
        colorScheme="indigo"
        formula="FIFO: Sell oldest first  |  LIFO: Sell newest first  |  WAC: Sell at average price"
        variables={[
          { symbol: 'COGS',    nameEn: 'Cost of Goods Sold – value of items sold',           nameUrdu: 'فروخت شدہ سامان کی لاگت – فروخت شدہ اشیاء کی قیمت' },
          { symbol: 'Closing', nameEn: 'Closing Stock – remaining inventory value',          nameUrdu: 'باقی اسٹاک – باقی انوینٹری کی قیمت' },
          { symbol: 'WAC',     nameEn: 'Weighted Avg Cost = Total Cost ÷ Total Quantity',    nameUrdu: 'وزنی اوسط لاگت = کل لاگت ÷ کل مقدار' }
        ]}
        example={[
          { labelEn: 'Batch 1 (oldest)', labelUrdu: 'بیچ 1 (پرانا)',  value: '100 units @ Rs.150' },
          { labelEn: 'Batch 2',          labelUrdu: 'بیچ 2',          value: '80 units  @ Rs.170' },
          { labelEn: 'Sold (FIFO)',      labelUrdu: 'فروخت (FIFO)',   value: '150 units → COGS Rs.2,85,000' },
          { labelEn: 'Closing Stock',    labelUrdu: 'باقی اسٹاک',     value: 'Rs. 3,27,000' }
        ]}
        terms={[
          { titleEn: 'FIFO',           titleUrdu: 'FIFO',                   descEn: 'First In First Out – oldest stock sold first. Closing stock reflects latest prices. Best when prices rising.',                        descUrdu: 'پہلے آیا پہلے گیا – پرانا اسٹاک پہلے فروخت۔ باقی اسٹاک تازہ ترین قیمتوں کی عکاسی۔ قیمتیں بڑھنے پر بہتر۔' },
          { titleEn: 'LIFO',           titleUrdu: 'LIFO',                   descEn: 'Last In First Out – newest stock sold first. Lower closing value when prices rise. Tax advantage in inflation.',                   descUrdu: 'آخر میں آیا پہلے گیا – نیا اسٹاک پہلے فروخت۔ قیمتیں بڑھنے پر کم باقی قیمت۔ مہنگائی میں ٹیکس فائدہ۔' },
          { titleEn: 'Weighted Avg',   titleUrdu: 'وزنی اوسط',             descEn: 'Smooths price fluctuations. COGS & closing use same unit cost. Simple, consistent.',                                           descUrdu: 'قیمت کی تبدیلیوں کو ہموار کرتا ہے۔ COGS اور باقی ایک ہی یونٹ لاگت استعمال کرتے ہیں۔ آسان، مستقل۔' }
        ]}
        note={{ en: 'Pakistan FBR allows FIFO and WAC. LIFO not officially accepted for tax. Choose method and stick to it – cannot change mid-year.',
                urdu: 'پاکستان FBR FIFO اور WAC کی اجازت دیتا ہے۔ LIFO ٹیکس کے لیے سرکاری طور پر قبول نہیں۔ طریقہ منتخب کریں اور ایک رکھیں – درمیان سال میں نہیں بدل سکتے۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        {/* ── method selector ── */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">{language === 'en' ? 'Valuation Method' : 'قیمت کا طریقہ'}</h3>
          <div className="flex gap-3">
            {[['fifo','FIFO'],['lifo','LIFO'],['wac','WAC']].map(([val, label]) => (
              <button key={val} onClick={() => setMethod(val)}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${method === val ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
                {label}
                <div className="text-xs font-normal mt-0.5 opacity-75">
                  {val === 'fifo' ? (language === 'en' ? 'First In First Out' : 'پہلے آیا پہلے گیا') :
                   val === 'lifo' ? (language === 'en' ? 'Last In First Out'  : 'آخر میں آیا پہلے گیا') :
                   (language === 'en' ? 'Weighted Average' : 'وزنی اوسط')}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── KPI cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: { en:'Total Units',en2:'کل یونٹس' },   val: totalQty,            color:'from-slate-500 to-slate-600',  suffix: language === 'en' ? 'units' : 'یونٹس' },
            { label: { en:'Total Cost',en2:'کل لاگت' },      val: totalCost,           color:'from-indigo-500 to-indigo-600', suffix: null },
            { label: { en:'COGS',en2:'COGS' },               val: calc.cogs,           color:'from-red-500 to-orange-500',    suffix: null },
            { label: { en:'Closing Stock',en2:'باقی اسٹاک' },val: calc.closingValue,   color:'from-emerald-500 to-green-600', suffix: null }
          ].map((c, i) => (
            <div key={i} className={`bg-gradient-to-br ${c.color} rounded-2xl p-5 text-white`}>
              <div className="text-xs opacity-80 mb-1">{language === 'en' ? c.label.en : c.label.en2}</div>
              <div className="text-2xl font-bold">{c.suffix ? c.val : formatCurrency(c.val)}</div>
              {c.suffix && <div className="text-xs opacity-70">{c.suffix}</div>}
            </div>
          ))}
        </div>

        {/* ── purchase batches ── */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">{language === 'en' ? 'Purchase Batches' : 'خریداری کے بیچز'}</h3>
            <button onClick={addItem} className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg font-bold hover:bg-indigo-200">+ {language === 'en' ? 'Add Batch' : 'بیچ شامل'}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-100 dark:bg-slate-700">
                <th className="text-left p-3 rounded-tl-lg">#</th>
                <th className="text-left p-3">{language === 'en' ? 'Date' : 'تاریخ'}</th>
                <th className="text-right p-3">{language === 'en' ? 'Qty' : 'مقدار'}</th>
                <th className="text-right p-3">{language === 'en' ? 'Unit Price' : 'یونٹ قیمت'}</th>
                <th className="text-right p-3">{language === 'en' ? 'Total' : 'کل'}</th>
                <th className="text-right p-3">{language === 'en' ? 'Used' : 'استعمال'}</th>
                <th className="p-3 rounded-tr-lg"></th>
              </tr></thead>
              <tbody>
                {items.map((it, idx) => (
                  <tr key={idx} className="border-b dark:border-slate-700">
                    <td className="p-3 text-slate-400">{idx + 1}</td>
                    <td className="p-3"><input type="date" value={it.date} onChange={e => updateItem(idx,'date',e.target.value)} className="w-full px-2 py-1 border rounded dark:bg-slate-700 text-xs" /></td>
                    <td className="p-3"><input type="number" value={it.qty} onChange={e => updateItem(idx,'qty',e.target.value)} className="w-20 px-2 py-1 border rounded dark:bg-slate-700 text-right text-sm" /></td>
                    <td className="p-3"><input type="number" value={it.price} onChange={e => updateItem(idx,'price',e.target.value)} className="w-24 px-2 py-1 border rounded dark:bg-slate-700 text-right text-sm" /></td>
                    <td className="p-3 text-right font-semibold">{formatCurrency(it.qty * it.price)}</td>
                    <td className="p-3 text-right">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${calc.layers[idx]?.used > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {calc.layers[idx]?.used > 0 ? calc.layers[idx].used : 0} {language === 'en' ? 'used' : 'استعمال'}
                      </span>
                    </td>
                    <td className="p-3"><button onClick={() => removeItem(idx)} className="text-red-400 hover:text-red-600 text-lg leading-none">×</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── sold qty slider ── */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">{language === 'en' ? 'Units Sold' : 'فروخت شدہ یونٹس'}</h3>
            <span className="text-xl font-bold text-indigo-600">{soldQty} / {totalQty}</span>
          </div>
          <input type="range" min={0} max={totalQty} value={soldQty} onChange={e => setSoldQty(parseInt(e.target.value))}
            className="w-full accent-indigo-600" />
          <div className="flex justify-between text-xs text-slate-400 mt-1"><span>0</span><span>{totalQty}</span></div>
        </div>

        {/* ── chart ── */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-3">{language === 'en' ? 'Cost Breakdown' : 'لاگت کی تفصیل'}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={v => `${(v/100000).toFixed(1)}L`} fontSize={11} />
              <YAxis type="category" dataKey="name" width={90} fontSize={11} />
              <Tooltip formatter={v => formatCurrency(v)} />
              <Bar dataKey="value" radius={[0,8,8,0]} barSize={36}>
                {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── save ── */}
        <button onClick={() => { addToHistory({ calculatorName, result: `${method.toUpperCase()} – COGS: ${formatCurrency(calc.cogs)}, Closing: ${formatCurrency(calc.closingValue)}` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Valuation' : 'قیمت محفوظ کریں'}
        </button>
      </div>
    </div>
  );
};
export default StockValuationCalculator;