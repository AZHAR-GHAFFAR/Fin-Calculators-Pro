import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const HomeAffordabilityCalculator = ({ language, addToHistory, calculatorName }) => {
  const [monthlyIncome, setMonthlyIncome] = useState(200000);
  const [downPayment, setDownPayment] = useState(2000000);
  const [interestRate, setInterestRate] = useState(16); // %
  const [loanTerm, setLoanTerm] = useState(20); // years
  const [monthlyDebts, setMonthlyDebts] = useState(30000);

  // 40% rule: max 40% of income for housing
  const maxMonthlyPayment = monthlyIncome * 0.40;
  const availableForEMI = maxMonthlyPayment - monthlyDebts;
  
  // EMI = P × r × (1+r)^n / ((1+r)^n - 1)
  const r = interestRate / 100 / 12;
  const n = loanTerm * 12;
  const maxLoanAmount = availableForEMI * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
  const maxPropertyPrice = maxLoanAmount + downPayment;
  const debtToIncome = ((availableForEMI + monthlyDebts) / monthlyIncome) * 100;

  const chartData = [
    { name: language === 'en' ? 'Income' : 'آمدنی', value: monthlyIncome, fill: '#10B981' },
    { name: language === 'en' ? 'EMI' : 'EMI', value: availableForEMI, fill: '#6366F1' },
    { name: language === 'en' ? 'Debts' : 'قرضے', value: monthlyDebts, fill: '#EF4444' },
    { name: language === 'en' ? 'Left' : 'باقی', value: monthlyIncome - availableForEMI - monthlyDebts, fill: '#F59E0B' }
  ];

  return (
    <div className="space-y-6">
      <InfoPanel language={language} colorScheme="green"
        formula="Max Price = (40% Income − Debts) × Loan Factor + Down Payment"
        variables={[
          { symbol: '40% Rule', nameEn: 'Max 40% of income for housing (Pakistan)', nameUrdu: 'آمدنی کا زیادہ سے زیادہ 40% رہائش کے لیے' },
          { symbol: 'DTI', nameEn: 'Debt-to-Income ratio. <40% good', nameUrdu: 'قرض سے آمدنی کا تناسب۔ <40% اچھا' }
        ]}
        example={[
          { labelEn: 'Monthly Income', labelUrdu: 'ماہانہ آمدنی', value: 'Rs. 2,00,000' },
          { labelEn: 'Max EMI (40%)', labelUrdu: 'زیادہ EMI (40%)', value: 'Rs. 80,000' },
          { labelEn: 'Existing Debts', labelUrdu: 'موجودہ قرضے', value: 'Rs. 30,000' },
          { labelEn: 'Available EMI', labelUrdu: 'دستیاب EMI', value: 'Rs. 50,000' },
          { labelEn: 'Max Price', labelUrdu: 'زیادہ قیمت', value: 'Rs. 3.2 Cr (20 yrs @ 16%)' }
        ]}
        terms={[
          { titleEn: '40% Rule', titleUrdu: '40% قاعدہ', descEn: 'Housing cost ≤ 40% of gross income. Standard in Pakistan. Includes EMI only.', descUrdu: 'رہائش لاگت ≤ مجموعی آمدنی کا 40%۔ پاکستان میں معیاری۔ صرف EMI شامل۔' },
          { titleEn: 'DTI Ratio', titleUrdu: 'DTI تناسب', descEn: 'All debts ÷ income. <40% good. >50% risky. Banks check this.', descUrdu: 'تمام قرضے ÷ آمدنی۔ <40% اچھا۔ >50% خطرناک۔ بینک چیک کرتے ہیں۔' },
          { titleEn: 'Down Payment', titleUrdu: 'ڈاؤن پیمنٹ', descEn: '10-20% of price. More down = lower EMI. 20% avoids PMI.', descUrdu: 'قیمت کا 10-20%۔ زیادہ ڈاؤن = کم EMI۔ 20% PMI سے بچتا ہے۔' }
        ]}
        note={{ en: 'This is MAX affordable. Aim for 30-35% for comfort. Factor utilities, maintenance. Pre-approval helps.', urdu: 'یہ زیادہ سے زیادہ سستا ہے۔ آرام کے لیے 30-35% کا مقصد۔ یوٹیلیٹی، مینٹیننس عامل۔ پری منظوری مدد کرتی ہے۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        <div className={`bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <Home className="w-6 h-6" />
            <span className="text-sm opacity-90">{language === 'en' ? 'Maximum Affordable Property' : 'زیادہ سے زیادہ سستی پراپرٹی'}</span>
          </div>
          <div className="text-5xl font-bold">{formatCurrency(maxPropertyPrice)}</div>
          <div className="text-xs opacity-75 mt-2">
            {language === 'en' ? `EMI: ${formatCurrency(availableForEMI)}/month • Loan: ${formatCurrency(maxLoanAmount)}` : `EMI: ${formatCurrency(availableForEMI)}/ماہ • قرض: ${formatCurrency(maxLoanAmount)}`}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-4">{language === 'en' ? 'Your Financial Profile' : 'آپ کا مالی پروفائل'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Monthly Income (Rs.)' : 'ماہانہ آمدنی (Rs.)'}</label>
                <input type="number" value={monthlyIncome} onChange={e => setMonthlyIncome(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Down Payment Available (Rs.)' : 'دستیاب ڈاؤن پیمنٹ (Rs.)'}</label>
                <input type="number" value={downPayment} onChange={e => setDownPayment(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Monthly Debts (Rs.)' : 'ماہانہ قرضے (Rs.)'}</label>
                <input type="number" value={monthlyDebts} onChange={e => setMonthlyDebts(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Interest Rate (%)' : 'سود کی شرح (%)'}</label>
                <input type="number" value={interestRate} onChange={e => setInterestRate(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Loan Term (Years)' : 'قرض کی مدت (سال)'}</label>
                <input type="number" value={loanTerm} onChange={e => setLoanTerm(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-3">{language === 'en' ? 'Monthly Budget' : 'ماہانہ بجٹ'}</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={11} />
                  <YAxis fontSize={11} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                  <Tooltip formatter={v => formatCurrency(v)} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {chartData.map((e, i) => <rect key={i} fill={e.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-4">{language === 'en' ? 'Affordability Summary' : 'استطاعت کا خلاصہ'}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between pb-2 border-b"><span>{language === 'en' ? 'Max Monthly Payment' : 'زیادہ ماہانہ ادائیگی'}</span><span className="font-bold">{formatCurrency(maxMonthlyPayment)}</span></div>
                <div className="flex justify-between pb-2 border-b"><span>{language === 'en' ? 'Existing Debts' : 'موجودہ قرضے'}</span><span className="font-bold text-red-600">−{formatCurrency(monthlyDebts)}</span></div>
                <div className="flex justify-between pb-2 border-b"><span>{language === 'en' ? 'Available for EMI' : 'EMI کے لیے دستیاب'}</span><span className="font-bold text-blue-600">{formatCurrency(availableForEMI)}</span></div>
                <div className="flex justify-between pb-2 border-b"><span>{language === 'en' ? 'Max Loan' : 'زیادہ قرض'}</span><span className="font-bold">{formatCurrency(maxLoanAmount)}</span></div>
                <div className="flex justify-between pb-2 border-b"><span>{language === 'en' ? 'Down Payment' : 'ڈاؤن پیمنٹ'}</span><span className="font-bold">{formatCurrency(downPayment)}</span></div>
                <div className="flex justify-between pt-2 font-bold text-lg"><span>{language === 'en' ? 'Max Property Price' : 'زیادہ پراپرٹی قیمت'}</span><span className="text-green-600">{formatCurrency(maxPropertyPrice)}</span></div>
              </div>

              <div className={`mt-4 p-3 rounded-lg text-sm ${debtToIncome <= 40 ? 'bg-green-50 dark:bg-green-900/20 text-green-700' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-700'}`}>
                <span className="font-bold">{language === 'en' ? 'Debt-to-Income:' : 'قرض سے آمدنی:'} {debtToIncome.toFixed(1)}%</span>
                {debtToIncome <= 40 ? (language === 'en' ? ' ✅ Good' : ' ✅ اچھا') : (language === 'en' ? ' ⚠️ High' : ' ⚠️ زیادہ')}
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `Max Affordable: ${formatCurrency(maxPropertyPrice)}` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Affordability Analysis' : 'استطاعت تجزیہ محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default HomeAffordabilityCalculator;