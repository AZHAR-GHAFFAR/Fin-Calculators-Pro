import React, { useState } from 'react';
import { Car } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const ShippingCostCalculator = ({ language, addToHistory, calculatorName }) => {
  const [weight,       setWeight]       = useState(50);     // kg
  const [volume,       setVolume]       = useState(0.8);    // cubic metres
  const [distance,     setDistance]     = useState(500);    // km
  const [ratePerKg,    setRatePerKg]    = useState(8);
  const [ratePerKm,    setRatePerKm]    = useState(12);
  const [volumeRate,   setVolumeRate]   = useState(5000);   // per cubic metre
  const [fuelSurcharge,setFuelSurcharge]= useState(10);    // %
  const [insurance,    setInsurance]    = useState(1.5);    // % of value
  const [cargoValue,   setCargoValue]   = useState(200000);

  /* ── dimensional weight (volumetric) ── */
  const volWeight     = volume * 500;   // 1 m³ ≈ 500 kg equivalent
  const billableWeight= Math.max(weight, volWeight);

  /* ── cost breakdown ── */
  const weightCost    = billableWeight * ratePerKg;
  const distanceCost  = distance * ratePerKm;
  const volumeCost    = volume * volumeRate;
  const subtotal      = weightCost + distanceCost;
  const fuelAmount    = subtotal * (fuelSurcharge / 100);
  const insuranceAmt  = cargoValue * (insurance / 100);
  const totalCost     = subtotal + fuelAmount + insuranceAmt;
  const costPerKm     = totalCost / distance;
  const costPerKg     = totalCost / weight;

  const chartData = [
    { name: language==='en'?'Weight':'وزن',       value: weightCost,   fill:'#6366F1' },
    { name: language==='en'?'Distance':'فاصلہ',   value: distanceCost, fill:'#3B82F6' },
    { name: language==='en'?'Fuel Sur.':'فیول',   value: fuelAmount,   fill:'#F59E0B' },
    { name: language==='en'?'Insurance':'بیما',   value: insuranceAmt, fill:'#EF4444' }
  ];

  return (
    <div className="space-y-6">
      <InfoPanel
        language={language}
        colorScheme="teal"
        formula="Total = (Billable Wt × Rate) + (Distance × Rate) + Fuel Surcharge + Insurance"
        variables={[
          { symbol: 'Billable Wt', nameEn: 'Max (Actual Wt, Volumetric Wt)',        nameUrdu: 'زیادہ (حقیقی وزن، حجم وزن)' },
          { symbol: 'Vol Weight',  nameEn: 'Volume (m³) × 500 kg conversion',       nameUrdu: 'حجم (m³) × 500 kg تبدیلی' },
          { symbol: 'Fuel Sur.',   nameEn: '% on base cost for fuel fluctuation',   nameUrdu: 'بنیادی لاگت پر ایندھن % فیصد' }
        ]}
        example={[
          { labelEn: 'Weight',       labelUrdu: 'وزن',           value: '50 kg, Vol: 0.8 m³' },
          { labelEn: 'Billable Wt',  labelUrdu: 'بلیبل وزن',    value: '400 kg (volumetric)' },
          { labelEn: 'Distance',     labelUrdu: 'فاصلہ',         value: '500 km' },
          { labelEn: 'Total Cost',   labelUrdu: 'کل لاگت',      value: 'Rs. 12,500 (approx)' }
        ]}
        terms={[
          { titleEn: 'Volumetric Weight', titleUrdu: 'حجم وزن', descEn: 'Dimensional weight = Volume × 500. If volWt > actualWt, charged on volWt. Bulky light items penalised.', descUrdu: 'حجم وزن = حجم × 500۔ اگر حجم وزن > حقیقی وزن، حجم وزن پر چارج۔ بڑے ہلکے آئٹمز پر جرمانہ۔' },
          { titleEn: 'Fuel Surcharge', titleUrdu: 'ایندھن فیس', descEn: '10-20% on base fare. Covers volatile fuel costs. Revised monthly by carriers.', descUrdu: 'بنیادی فیس پر 10-20%۔ متغیر ایندھن لاگت۔ کیریرز ماہانہ بدلتے ہیں۔' },
          { titleEn: 'Insurance',      titleUrdu: 'بیما',        descEn: '1-3% of declared cargo value. Protects against loss/damage. Required for high-value goods.', descUrdu: 'کارگو قیمت کا 1-3%۔ نقصان سے حفاظت۔ مہنگے سامان کے لیے ضروری۔' }
        ]}
        note={{ en: 'Always compare 3+ carriers. Negotiate bulk rates. Track actual vs quoted cost. Choose speed vs cost wisely.',
                urdu: 'ہمیشہ 3+ کیریرز موازنہ کریں۔ بلک ریٹس پر گفتگو کریں۔ حقیقی بمقابلہ درخواست شدہ لاگت ٹریک کریں۔ رفتار بمقابلہ لاگت دانشمندی سے منتخب کریں۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { lbl:{ en:'Total Shipping',ur:'کل شپنگ' },  val: totalCost,     c:'from-teal-500 to-cyan-600' },
            { lbl:{ en:'Billable Wt',ur:'بلیبل وزن' },   val: `${billableWeight} kg`, c:'from-indigo-500 to-blue-600', isCurr:false },
            { lbl:{ en:'Cost/km',ur:'لاگت/km' },         val: costPerKm,     c:'from-violet-500 to-purple-600' },
            { lbl:{ en:'Cost/kg',ur:'لاگت/kg' },         val: costPerKg,     c:'from-amber-500 to-orange-600' }
          ].map((c,i)=>(
            <div key={i} className={`bg-gradient-to-br ${c.c} rounded-2xl p-5 text-white`}>
              <div className="text-xs opacity-80 mb-1">{language==='en'?c.lbl.en:c.lbl.ur}</div>
              <div className="text-2xl font-bold">{c.isCurr===false ? c.val : formatCurrency(c.val)}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* inputs */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-4">{language==='en'?'Shipment Details':'شپمنٹ کی تفصیلات'}</h3>
            <div className="space-y-3">
              {[
                { lbl:{ en:'Weight (kg)',ur:'وزن (kg)' },               val: weight,        set: setWeight },
                { lbl:{ en:'Volume (m³)',ur:'حجم (m³)' },               val: volume,        set: setVolume },
                { lbl:{ en:'Distance (km)',ur:'فاصلہ (km)' },           val: distance,      set: setDistance },
                { lbl:{ en:'Rate/kg (Rs.)',ur:'شرح/kg (Rs.)' },         val: ratePerKg,     set: setRatePerKg },
                { lbl:{ en:'Rate/km (Rs.)',ur:'شرح/km (Rs.)' },         val: ratePerKm,     set: setRatePerKm },
                { lbl:{ en:'Vol Rate/m³ (Rs.)',ur:'حجم شرح/m³ (Rs.)' },val: volumeRate,    set: setVolumeRate },
                { lbl:{ en:'Fuel Surcharge (%)',ur:'ایندھن فیس (%)' },  val: fuelSurcharge, set: setFuelSurcharge },
                { lbl:{ en:'Insurance (%)',ur:'بیما (%)' },             val: insurance,     set: setInsurance },
                { lbl:{ en:'Cargo Value (Rs.)',ur:'کارگو قیمت (Rs.)' },val: cargoValue,    set: setCargoValue }
              ].map((inp,i)=>(
                <div key={i} className="flex items-center gap-3">
                  <label className="text-xs text-slate-500 w-40 text-right">{language==='en'?inp.lbl.en:inp.lbl.ur}</label>
                  <input type="number" value={inp.val} onChange={e=>inp.set(parseFloat(e.target.value)||0)} className="flex-1 px-3 py-1.5 border rounded-lg dark:bg-slate-700 text-sm" />
                </div>
              ))}
            </div>

            {/* vol weight indicator */}
            <div className={`mt-4 p-3 rounded-lg text-sm ${volWeight > weight ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700' : 'bg-green-50 dark:bg-green-900/20 text-green-700'}`}>
              <span className="font-bold">
                {language==='en' ? 'Volumetric Weight' : 'حجم وزن'}: {volWeight} kg
              </span>
              {volWeight > weight && (
                <span className="ml-2 text-xs">
                  ({language==='en' ? '⚠️ Used for billing – heavier than actual' : '⚠️ بلنگ کے لیے استعمال – حقیقی سے زیادہ'})
                </span>
              )}
            </div>
          </div>

          <div className="space-y-5">
            {/* cost breakdown table */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-4">{language==='en'?'Cost Breakdown':'لاگت کی تفصیل'}</h3>
              <div className="space-y-2">
                {[
                  { lbl: language==='en'?'Weight Charge':'وزن چارج',       val: weightCost,   c:'text-indigo-600' },
                  { lbl: language==='en'?'Distance Charge':'فاصلہ چارج',    val: distanceCost, c:'text-blue-600' },
                  { lbl: language==='en'?'Subtotal':'ذیلی کل',              val: subtotal,     c:'text-slate-700', bold:true },
                  { lbl: language==='en'?'Fuel Surcharge':'ایندھن فیس',     val: fuelAmount,   c:'text-amber-600' },
                  { lbl: language==='en'?'Insurance':'بیما',                val: insuranceAmt, c:'text-red-600' }
                ].map((r,i)=>(
                  <div key={i} className={`flex justify-between pb-2 border-b ${r.bold?'font-bold':'text-sm'}`}>
                    <span className={r.c}>{r.lbl}</span>
                    <span className={`${r.c} font-semibold`}>{formatCurrency(r.val)}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 font-bold text-lg">
                  <span>{language==='en'?'Total Cost':'کل لاگت'}</span>
                  <span className="text-teal-600">{formatCurrency(totalCost)}</span>
                </div>
              </div>
            </div>

            {/* chart */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-3">{language==='en'?'Cost Components':'لاگت کے اجزاء'}</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" fontSize={11} tickFormatter={v=>`${(v/1000).toFixed(1)}K`} />
                  <YAxis type="category" dataKey="name" width={70} fontSize={11} />
                  <Tooltip formatter={v=>formatCurrency(v)} />
                  <Bar dataKey="value" radius={[0,8,8,0]} barSize={28}>
                    {chartData.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <button onClick={()=>{ addToHistory({ calculatorName, result:`Shipping: ${formatCurrency(totalCost)} (${distance}km, ${weight}kg)` }); toast.success(language==='en'?'Saved!':'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Shipping Quote' : 'شپنگ کوٹ محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default ShippingCostCalculator;