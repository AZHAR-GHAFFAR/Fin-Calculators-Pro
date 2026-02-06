import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const RentalYieldCalculator = ({ language, addToHistory, calculatorName }) => {
  const [propertyPrice, setPropertyPrice] = useState(18000000);
  const [monthlyRent, setMonthlyRent] = useState(80000);
  const [annualExpenses, setAnnualExpenses] = useState({
    maintenance: 50000,
    tax: 30000,
    insurance: 20000,
    management: 48000
  });

  const annualRent = monthlyRent * 12;
  const totalExpenses = Object.values(annualExpenses).reduce((a, b) => a + b, 0);
  const netIncome = annualRent - totalExpenses;
  const grossYield = (annualRent / propertyPrice) * 100;
  const netYield = (netIncome / propertyPrice) * 100;

  const pieData = [
    { name: language === 'en' ? 'Net Income' : 'خالص آمدنی', value: netIncome, color: '#10B981' },
    ...Object.entries(annualExpenses).map(([k, v], i) => ({
      name: k.charAt(0).toUpperCase() + k.slice(1),
      value: v,
      color: ['#EF4444', '#F59E0B', '#6366F1', '#8B5CF6'][i]
    }))
  ];

  return (
    <div className="space-y-6">
      <InfoPanel language={language} colorScheme="emerald"
        formula="Gross Yield = (Annual Rent ÷ Property Price) × 100 | Net = (Rent − Expenses) ÷ Price × 100"
        variables={[
          { symbol: 'Gross', nameEn: 'Total rental income without expenses', nameUrdu: 'اخراجات کے بغیر کل کرایہ آمدنی' },
          { symbol: 'Net', nameEn: 'Rental income after all expenses', nameUrdu: 'تمام اخراجات کے بعد کرایہ آمدنی' }
        ]}
        example={[
          { labelEn: 'Property', labelUrdu: 'پراپرٹی', value: 'Rs. 1.8 Cr' },
          { labelEn: 'Monthly Rent', labelUrdu: 'ماہانہ کرایہ', value: 'Rs. 80,000' },
          { labelEn: 'Gross Yield', labelUrdu: 'مجموعی منافع', value: '5.33%' },
          { labelEn: 'Net Yield', labelUrdu: 'خالص منافع', value: '4.5%' }
        ]}
        terms={[
          { titleEn: 'Gross Yield', titleUrdu: 'مجموعی منافع', descEn: 'Simple rent ÷ price. 4-6% typical Pakistan. Quick estimate.', descUrdu: 'آسان کرایہ ÷ قیمت۔ پاکستان میں 4-6% عام۔ فوری تخمینہ۔' },
          { titleEn: 'Net Yield', titleUrdu: 'خالص منافع', descEn: 'Actual return after expenses. More accurate. 3-5% typical.', descUrdu: 'اخراجات کے بعد حقیقی واپسی۔ زیادہ درست۔ 3-5% عام۔' },
          { titleEn: 'Good Yield', titleUrdu: 'اچھا منافع', descEn: 'Net 4%+ good. 5%+ excellent. Compare with fixed deposit (10-12%).', descUrdu: 'خالص 4%+ اچھا۔ 5%+ بہترین۔ فکسڈ ڈپازٹ سے موازنہ (10-12%)۔' }
        ]}
        note={{ en: 'Net yield more realistic. Include vacancy periods. Compare with bank FD rates.', urdu: 'خالص منافع زیادہ حقیقی۔ خالی مدت شامل کریں۔ بینک FD شرحوں سے موازنہ کریں۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { lbl: { en: 'Gross Yield', ur: 'مجموعی منافع' }, val: `${grossYield.toFixed(2)}%`, c: 'from-blue-500 to-cyan-600' },
            { lbl: { en: 'Net Yield', ur: 'خالص منافع' }, val: `${netYield.toFixed(2)}%`, c: netYield >= 4 ? 'from-emerald-500 to-green-600' : 'from-amber-500 to-orange-600' },
            { lbl: { en: 'Annual Rent', ur: 'سالانہ کرایہ' }, val: formatCurrency(annualRent), c: 'from-indigo-500 to-purple-600' },
            { lbl: { en: 'Net Income', ur: 'خالص آمدنی' }, val: formatCurrency(netIncome), c: 'from-violet-500 to-pink-600' }
          ].map((c, i) => (
            <div key={i} className={`bg-gradient-to-br ${c.c} rounded-2xl p-5 text-white`}>
              <div className="text-xs opacity-80 mb-1">{language === 'en' ? c.lbl.en : c.lbl.ur}</div>
              <div className="text-2xl font-bold">{c.val}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-4">{language === 'en' ? 'Property Details' : 'پراپرٹی تفصیلات'}</h3>
            <div className="space-y-3">
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Property Price (Rs.)' : 'پراپرٹی قیمت (Rs.)'}</label>
                <input type="number" value={propertyPrice} onChange={e => setPropertyPrice(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" /></div>
              <div><label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Monthly Rent (Rs.)' : 'ماہانہ کرایہ (Rs.)'}</label>
                <input type="number" value={monthlyRent} onChange={e => setMonthlyRent(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" /></div>
            </div>
            <h4 className="font-bold text-sm mt-5 mb-3">{language === 'en' ? 'Annual Expenses' : 'سالانہ اخراجات'}</h4>
            <div className="space-y-2">
              {Object.entries(annualExpenses).map(([k, v]) => (
                <div key={k} className="flex items-center gap-3">
                  <label className="text-xs text-slate-500 w-32 capitalize">{k}</label>
                  <input type="number" value={v} onChange={e => setAnnualExpenses({ ...annualExpenses, [k]: parseFloat(e.target.value) || 0 })}
                    className="flex-1 px-3 py-1.5 border rounded-lg dark:bg-slate-700 text-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-3">{language === 'en' ? 'Income Breakdown' : 'آمدنی کی تفصیل'}</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={v => formatCurrency(v)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `Net Yield: ${netYield.toFixed(2)}%, Rent: ${formatCurrency(annualRent)}` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Yield Analysis' : 'منافع تجزیہ محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default RentalYieldCalculator;