import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const InventoryTurnoverCalculator = ({ language, addToHistory, calculatorName }) => {
  const [cogs,           setCogs]           = useState(12000000);
  const [openingStock,   setOpeningStock]   = useState(2000000);
  const [closingStock,   setClosingStock]   = useState(1600000);
  const [industryAvg,    setIndustryAvg]    = useState(6);

  const avgInventory   = (openingStock + closingStock) / 2;
  const turnover       = cogs / avgInventory;
  const daysSold       = 365 / turnover;  // days inventory on hand

  /* ── benchmark comparison ── */
  const chartData = [
    { name: language==='en'?'Your Turnover':'آپ کا ٹرن اوور',  value: parseFloat(turnover.toFixed(2)),  fill: turnover >= industryAvg ? '#10B981' : '#F59E0B' },
    { name: language==='en'?'Industry Avg':'صنعت کا اوسط',     value: industryAvg,                      fill: '#6366F1' }
  ];

  /* ── monthly breakdown sim ── */
  const monthlyData = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => {
    const factor = 0.7 + Math.sin((i / 12) * Math.PI * 2) * 0.3 + (Math.random() * 0.1);
    return { month: m, turnover: parseFloat((turnover * factor).toFixed(2)) };
  });

  return (
    <div className="space-y-6">
      <InfoPanel
        language={language}
        colorScheme="violet"
        formula="Inventory Turnover = COGS ÷ Avg Inventory  |  Days = 365 ÷ Turnover"
        variables={[
          { symbol: 'COGS',        nameEn: 'Cost of Goods Sold (annual)',              nameUrdu: 'فروخت شدہ سامان کی سالانہ لاگت' },
          { symbol: 'Avg Inv',     nameEn: '(Opening Stock + Closing Stock) ÷ 2',     nameUrdu: '(شروعاتی + آخری اسٹاک) ÷ 2' },
          { symbol: 'Days on Hand',nameEn: '365 ÷ Turnover – how long stock sits',    nameUrdu: '365 ÷ ٹرن اوور – اسٹاک کتنا وقت رہے گا' }
        ]}
        example={[
          { labelEn: 'COGS',          labelUrdu: 'COGS',           value: 'Rs. 1,20,00,000' },
          { labelEn: 'Avg Inventory', labelUrdu: 'اوسط انوینٹری', value: 'Rs. 18,00,000' },
          { labelEn: 'Turnover',      labelUrdu: 'ٹرن اوور',      value: '6.67x' },
          { labelEn: 'Days on Hand',  labelUrdu: 'دن میں اسٹاک',  value: '54.7 days' }
        ]}
        terms={[
          { titleEn: 'Inventory Turnover',  titleUrdu: 'انوینٹری ٹرن اوور', descEn: 'Times inventory sold & replaced in a year. Higher = efficient. Retail: 8-12x. Wholesale: 4-8x.', descUrdu: 'سال میں اسٹاک فروخت اور دوبارہ بھرنے کی مرتبہ۔ زیادہ = موثر۔ خوردہ: 8-12x۔ بلک: 4-8x۔' },
          { titleEn: 'Days on Hand',        titleUrdu: 'دنوں میں اسٹاک',    descEn: 'Average days stock stays in warehouse. <60 days good. >90 days = slow-moving stock.', descUrdu: 'اوسط دنوں میں اسٹاک گودام میں رہے۔ <60 دن اچھا۔ >90 دن = سست رفتار اسٹاک۔' },
          { titleEn: 'Benchmarks',          titleUrdu: 'معیار',              descEn: 'Grocery: 15-20x. Electronics: 4-8x. Clothing: 3-6x. Compare with same industry.', descUrdu: 'گروسری: 15-20x۔ الیکٹرونکس: 4-8x۔ لباس: 3-6x۔ اسی صنعت سے موازنہ کریں۔' }
        ]}
        note={{ en: 'High turnover = less storage cost, fresher stock. Too high = risk of stockout. Balance with safety stock. Seasonal products vary.',
                urdu: 'زیادہ ٹرن اوور = کم ذخیرہ لاگت، تازہ اسٹاک۔ بہت زیادہ = اسٹاک آؤٹ کا خطرہ۔ حفاظتی اسٹاک کے ساتھ توازن۔ موسمی پروڈکٹس مختلف۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        {/* KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { lbl:{ en:'Turnover',ur:'ٹرن اوور' },          val: `${turnover.toFixed(2)}x`, c:'from-violet-500 to-purple-600' },
            { lbl:{ en:'Days on Hand',ur:'دنوں میں اسٹاک' },val: `${daysSold.toFixed(0)} d`, c: daysSold<=60?'from-emerald-500 to-green-600':'from-amber-500 to-orange-600' },
            { lbl:{ en:'Avg Inventory',ur:'اوسط انوینٹری' },val: formatCurrency(avgInventory), c:'from-blue-500 to-cyan-600' },
            { lbl:{ en:'Industry Avg',ur:'صنعت اوسط' },     val: `${industryAvg}x`,          c:'from-indigo-500 to-blue-600' }
          ].map((c,i)=>(
            <div key={i} className={`bg-gradient-to-br ${c.c} rounded-2xl p-5 text-white`}>
              <div className="text-xs opacity-80 mb-1">{language==='en'?c.lbl.en:c.lbl.ur}</div>
              <div className="text-2xl font-bold">{c.val}</div>
            </div>
          ))}
        </div>

        {/* inputs */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-4">{language==='en'?'Inputs':'ان پٹس'}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { lbl:{ en:'COGS (Rs.)',ur:'COGS (Rs.)' },                        val: cogs,         set: setCogs },
              { lbl:{ en:'Opening Stock (Rs.)',ur:'شروعاتی اسٹاک (Rs.)' },     val: openingStock, set: setOpeningStock },
              { lbl:{ en:'Closing Stock (Rs.)',ur:'آخری اسٹاک (Rs.)' },        val: closingStock, set: setClosingStock },
              { lbl:{ en:'Industry Avg Turnover',ur:'صنعت اوسط ٹرن اوور' },   val: industryAvg,  set: setIndustryAvg }
            ].map((inp,i)=>(
              <div key={i}>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language==='en'?inp.lbl.en:inp.lbl.ur}</label>
                <input type="number" value={inp.val} onChange={e=>inp.set(parseFloat(e.target.value)||0)} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 text-sm" />
              </div>
            ))}
          </div>
        </div>

        {/* comparison chart */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-3">{language==='en'?'Your vs Industry Average':'آپ بمقابلہ صنعت اوسط'}</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={12} />
              <YAxis fontSize={11} />
              <Tooltip formatter={v=>`${v}x`} />
              <Bar dataKey="value" radius={[10,10,0,0]} barSize={100}>
                {chartData.map((e,i)=><Cell key={i} fill={e.fill}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className={`mt-3 p-3 rounded-lg text-sm font-semibold ${turnover >= industryAvg ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400'}`}>
            {turnover >= industryAvg
              ? (language==='en' ? '✅ Above industry average – efficient inventory management!' : '✅ صنعت کے اوسط سے زیادہ – موثر انوینٹری مینجمنٹ!')
              : (language==='en' ? '⚠️ Below industry average – consider reducing slow-moving stock.' : '⚠️ صنعت کے اوسط سے کم – سست اسٹاک کم کریں۔')}
          </div>
        </div>

        <button onClick={()=>{ addToHistory({ calculatorName, result:`Turnover: ${turnover.toFixed(2)}x, Days: ${daysSold.toFixed(0)}` }); toast.success(language==='en'?'Saved!':'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Analysis' : 'تجزیہ محفوظ کریں'}
        </button>
      </div>
    </div>
  );
};
export default InventoryTurnoverCalculator;