import React, { useState, useMemo } from 'react';
import { Calculator, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const BulkDiscountCalculator = ({ language, addToHistory, calculatorName }) => {
  const [unitPrice, setUnitPrice] = useState(500);
  const [tiers, setTiers] = useState([
    { minQty: 1,    discount: 0 },
    { minQty: 50,   discount: 5 },
    { minQty: 100,  discount: 10 },
    { minQty: 200,  discount: 15 },
    { minQty: 500,  discount: 20 },
    { minQty: 1000, discount: 25 }
  ]);
  const [orderQty, setOrderQty] = useState(120);

  /* ── find active tier ── */
  const activeTier = useMemo(() => {
    let best = tiers[0];
    tiers.forEach(t => { if (orderQty >= t.minQty) best = t; });
    return best;
  }, [orderQty, tiers]);

  const discountPct  = activeTier.discount;
  const discountedPrice = unitPrice * (1 - discountPct / 100);
  const subtotal     = orderQty * unitPrice;
  const totalCost    = orderQty * discountedPrice;
  const totalSaving  = subtotal - totalCost;

  /* ── next tier analysis ── */
  const sortedTiers  = [...tiers].sort((a, b) => a.minQty - b.minQty);
  const nextTierIdx  = sortedTiers.findIndex(t => t.minQty > orderQty);
  const nextTier     = nextTierIdx >= 0 ? sortedTiers[nextTierIdx] : null;
  const qtyToNext    = nextTier ? nextTier.minQty - orderQty : 0;
  const costAtNext   = nextTier ? nextTier.minQty * unitPrice * (1 - nextTier.discount / 100) : 0;

  /* ── chart: cost curve across quantities ── */
  const chartData = useMemo(() => {
    const pts = [];
    for (let q = 0; q <= (tiers[tiers.length - 1]?.minQty || 1000) * 1.2; q += 10) {
      let disc = 0;
      tiers.forEach(t => { if (q >= t.minQty) disc = t.discount; });
      pts.push({ qty: q, total: Math.round(q * unitPrice * (1 - disc / 100)), perUnit: parseFloat((unitPrice * (1 - disc / 100)).toFixed(2)) });
    }
    return pts;
  }, [unitPrice, tiers]);

  const updateTier = (idx, field, val) => {
    setTiers(prev => prev.map((t, i) => i === idx ? { ...t, [field]: parseFloat(val) || 0 } : t));
  };

  return (
    <div className="space-y-6">
      <InfoPanel
        language={language}
        colorScheme="green"
        formula="Discounted Price = Unit Price × (1 − Discount%) | Saving = Qty × (Full − Discounted)"
        variables={[
          { symbol: 'Tier',     nameEn: 'Discount level based on minimum order quantity',  nameUrdu: 'کم سے کم آرڈر مقدار کے مطابق ڈسکاؤنٹ سطح' },
          { symbol: 'Saving',   nameEn: 'Total money saved vs full-price purchase',        nameUrdu: 'پوری قیمت کی خریداری بمقابلہ کل بچت' },
          { symbol: 'Next Tier',nameEn: 'Units needed to reach next discount level',       nameUrdu: 'اگلے ڈسکاؤنٹ سطح تک ضروری یونٹس' }
        ]}
        example={[
          { labelEn: 'Unit Price',  labelUrdu: 'یونٹ قیمت',   value: 'Rs. 500' },
          { labelEn: 'Order',       labelUrdu: 'آرڈر',         value: '120 units → 10% discount' },
          { labelEn: 'Total Cost',  labelUrdu: 'کل لاگت',     value: 'Rs. 54,000 (was 60,000)' },
          { labelEn: 'Saving',      labelUrdu: 'بچت',          value: 'Rs. 6,000 (10%)' }
        ]}
        terms={[
          { titleEn: 'Bulk Discount', titleUrdu: 'بلک ڈسکاؤنٹ', descEn: 'Price reduction for large orders. Encourages higher volume. Win-win: buyer saves, seller sells more.', descUrdu: 'بڑے آرڈرز کے لیے قیمت کمی۔ زیادہ حجم تحریک دیتا ہے۔ فائدہ: خریدار بچاتا ہے، فروخت کنندہ زیادہ بیچتا ہے۔' },
          { titleEn: 'Tier System',   titleUrdu: 'ٹیر سسٹم',   descEn: 'Graduated discount tiers. Each tier has min qty. Only active tier discount applies (not cumulative).', descUrdu: 'درجہ وار ڈسکاؤنٹ۔ ہر درجے کی کم سے کم مقدار۔ صرف فعال درجہ ڈسکاؤنٹ (جمع نہیں)۔' },
          { titleEn: 'Next Tier Tip', titleUrdu: 'اگلے درجہ کا ٹپ', descEn: 'Sometimes buying a few more units to hit next tier saves MORE total cost. Always check.', descUrdu: 'کبھی کبھی اگلے درجہ تک کچھ زیادہ یونٹس خریدنا کل لاگت میں زیادہ بچاتا ہے۔ ہمیشہ چیک کریں۔' }
        ]}
        note={{ en: 'Compare current total vs next-tier total. Sometimes ordering more costs less! Set tiers based on your supplier agreements.',
                urdu: 'موجودہ کل بمقابلہ اگلے درجہ کا کل موازنہ کریں۔ کبھی کبھی زیادہ آرڈر کم لاگت! اپنے سپلائیر معاہدوں کی بنیاد پر درجے مقرر کریں۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { lbl:{ en:'Active Discount',ur:'فعال ڈسکاؤنٹ' }, val: `${discountPct}%`,         c:'from-green-500 to-emerald-600' },
            { lbl:{ en:'Total Cost',ur:'کل لاگت' },           val: formatCurrency(totalCost),  c:'from-blue-500 to-cyan-600', isCurr:true },
            { lbl:{ en:'Total Saving',ur:'کل بچت' },         val: formatCurrency(totalSaving),c:'from-violet-500 to-purple-600', isCurr:true },
            { lbl:{ en:'Price/Unit',ur:'قیمت/یونٹ' },        val: formatCurrency(discountedPrice), c:'from-indigo-500 to-blue-600', isCurr:true }
          ].map((c,i)=>(
            <div key={i} className={`bg-gradient-to-br ${c.c} rounded-2xl p-5 text-white`}>
              <div className="text-xs opacity-80 mb-1">{language==='en'?c.lbl.en:c.lbl.ur}</div>
              <div className="text-2xl font-bold">{c.val}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* left: unit price + qty slider + tier table */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-500 mb-1">{language==='en'?'Unit Price (Rs.)':'یونٹ قیمت (Rs.)'}</label>
              <input type="number" value={unitPrice} onChange={e=>setUnitPrice(parseFloat(e.target.value)||0)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            {/* order qty slider */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-500">{language==='en'?'Order Quantity':'آرڈر مقدار'}</label>
                <span className="text-xl font-bold text-green-600">{orderQty} {language==='en'?'units':'یونٹس'}</span>
              </div>
              <input type="range" min={1} max={(tiers[tiers.length-1]?.minQty||1000)*1.3} value={orderQty} onChange={e=>setOrderQty(parseInt(e.target.value))} className="w-full accent-green-600" />
            </div>

            {/* tier table */}
            <h4 className="font-bold text-sm mb-2">{language==='en'?'Discount Tiers':'ڈسکاؤنٹ درجے'}</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-100 dark:bg-slate-700">
                  <th className="text-left p-2 rounded-tl-lg">{language==='en'?'Min Qty':'کم مقدار'}</th>
                  <th className="text-right p-2">{language==='en'?'Discount %':'ڈسکاؤنٹ %'}</th>
                  <th className="text-right p-2">{language==='en'?'Unit Price':'یونٹ قیمت'}</th>
                  <th className="p-2 rounded-tr-lg"></th>
                </tr></thead>
                <tbody>
                  {tiers.map((t, idx) => {
                    const isActive = activeTier === t;
                    return (
                      <tr key={idx} className={`border-b dark:border-slate-700 ${isActive ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                        <td className="p-2"><input type="number" value={t.minQty} onChange={e=>updateTier(idx,'minQty',e.target.value)} className="w-20 px-2 py-1 border rounded dark:bg-slate-700 text-sm" /></td>
                        <td className="p-2 text-right"><input type="number" value={t.discount} onChange={e=>updateTier(idx,'discount',e.target.value)} className="w-16 px-2 py-1 border rounded dark:bg-slate-700 text-sm text-right" /></td>
                        <td className="p-2 text-right font-semibold">{formatCurrency(unitPrice * (1 - t.discount / 100))}</td>
                        <td className="p-2">
                          {isActive && <span className="text-xs font-bold bg-green-200 text-green-800 px-2 py-0.5 rounded-full">{language==='en'?'Active':'فعال'}</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={()=>setTiers(prev=>[...prev,{ minQty:(tiers[tiers.length-1]?.minQty||0)+500, discount:tiers[tiers.length-1]?.discount+5||5 }])}
                className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded font-bold hover:bg-green-200">+ {language==='en'?'Add Tier':'درجہ شامل'}</button>
              {tiers.length > 1 && <button onClick={()=>setTiers(prev=>prev.slice(0,-1))}
                className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded font-bold hover:bg-red-200">− {language==='en'?'Remove':'ہटائیں'}</button>}
            </div>
          </div>

          <div className="space-y-5">
            {/* next tier advisory */}
            {nextTier && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700 rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-amber-600" />
                  <h4 className="font-bold text-amber-800 dark:text-amber-300">{language==='en'?'Next Tier Opportunity':'اگلے درجہ کا موقع'}</h4>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-400 mt-2">
                  {language==='en'
                    ? `Order ${qtyToNext} more units to reach ${nextTier.minQty} qty → ${nextTier.discount}% discount. Total cost at next tier: ${formatCurrency(costAtNext)} vs current ${formatCurrency(totalCost)}.`
                    : `${qtyToNext} زیادہ یونٹس آرڈر کریں ${nextTier.minQty} مقدار تک → ${nextTier.discount}% ڈسکاؤنٹ۔ اگلے درجہ پر کل لاگت: ${formatCurrency(costAtNext)} بمقابلہ موجودہ ${formatCurrency(totalCost)}۔`}
                </p>
                {costAtNext < totalCost && (
                  <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/30 rounded text-green-700 dark:text-green-400 text-sm font-bold">
                    💡 {language==='en' ? `Buying more saves ${formatCurrency(totalCost - costAtNext)}!` : `زیادہ خریدنا ${formatCurrency(totalCost - costAtNext)} بچاتا ہے!`}
                  </div>
                )}
              </div>
            )}

            {/* cost curve chart */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-3">{language==='en'?'Total Cost Curve':'کل لاگت کا گراف'}</h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="qty" fontSize={11} label={{ value: language==='en'?'Qty':'مقدار', position:'insideBottomRight', offset:-2, fontSize:11 }} />
                  <YAxis fontSize={11} tickFormatter={v=>`${(v/1000).toFixed(0)}K`} />
                  <Tooltip formatter={v=>formatCurrency(v)} labelFormatter={v=>`Qty: ${v}`} />
                  <Legend />
                  <ReferenceLine x={orderQty} stroke="#6366F1" strokeDasharray="5 3" label={{ value:'Current', position:'top', fontSize:10, fill:'#6366F1' }} />
                  <Line type="monotone" dataKey="total" stroke="#10B981" strokeWidth={2.5} name={language==='en'?'Total Cost':'کل لاگت'} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* summary */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-3">{language==='en'?'Order Summary':'آرڈر خلاصہ'}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between pb-2 border-b"><span>{language==='en'?'Qty':'مقدار'}</span><span className="font-bold">{orderQty}</span></div>
                <div className="flex justify-between pb-2 border-b"><span>{language==='en'?'Full Price':'پوری قیمت'}</span><span className="font-bold text-slate-400">{formatCurrency(subtotal)}</span></div>
                <div className="flex justify-between pb-2 border-b"><span>{language==='en'?'Discount':'ڈسکاؤنٹ'}</span><span className="font-bold text-red-600">−{formatCurrency(totalSaving)}</span></div>
                <div className="flex justify-between pt-2 font-bold text-lg"><span>{language==='en'?'You Pay':'آپ دیں گے'}</span><span className="text-green-600">{formatCurrency(totalCost)}</span></div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={()=>{ addToHistory({ calculatorName, result:`Bulk: ${orderQty} units @ ${discountPct}% = ${formatCurrency(totalCost)}` }); toast.success(language==='en'?'Saved!':'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Bulk Order' : 'بلک آرڈر محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default BulkDiscountCalculator;