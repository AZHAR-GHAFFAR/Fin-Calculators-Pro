import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const DownPaymentCalculator = ({ language, addToHistory, calculatorName }) => {
  const [propertyPrice, setPropertyPrice] = useState(18000000);
  const [currentSavings, setCurrentSavings] = useState(1000000);
  const [monthlySavings, setMonthlySavings] = useState(100000);
  const [targetPercent, setTargetPercent] = useState(20);

  const minDownPayment = propertyPrice * 0.10;
  const targetDownPayment = (propertyPrice * targetPercent) / 100;
  const remaining = targetDownPayment - currentSavings;
  const monthsNeeded = remaining > 0 ? Math.ceil(remaining / monthlySavings) : 0;
  const loanAmount = propertyPrice - targetDownPayment;
  const ltvRatio = (loanAmount / propertyPrice) * 100;

  return (
    <div className="space-y-6">
      <InfoPanel language={language} colorScheme="teal"
        formula="Down Payment = Property Price × (10-20%) | Months = (Target − Savings) ÷ Monthly Savings"
        variables={[
          { symbol: 'Minimum', nameEn: '10% of price (Pakistan banks)', nameUrdu: 'قیمت کا 10% (پاکستان بینک)' },
          { symbol: 'Recommended', nameEn: '20% avoids PMI, better rates', nameUrdu: '20% PMI سے بچتا ہے، بہتر شرحیں' }
        ]}
        example={[
          { labelEn: 'Property', labelUrdu: 'پراپرٹی', value: 'Rs. 1.8 Cr' },
          { labelEn: 'Min (10%)', labelUrdu: 'کم (10%)', value: 'Rs. 18 L' },
          { labelEn: 'Target (20%)', labelUrdu: 'ہدف (20%)', value: 'Rs. 36 L' },
          { labelEn: 'Savings', labelUrdu: 'بچت', value: 'Rs. 1L/month → 26 months' }
        ]}
        terms={[
          { titleEn: '10% vs 20%', titleUrdu: '10% بمقابلہ 20%', descEn: '10% minimum. 20% better: lower EMI, no PMI, better interest rate, faster approval.', descUrdu: '10% کم سے کم۔ 20% بہتر: کم EMI، کوئی PMI نہیں، بہتر سود کی شرح، تیز منظوری۔' },
          { titleEn: 'PMI', titleUrdu: 'PMI', descEn: 'Private Mortgage Insurance. Required if <20% down. Adds to EMI. Removed at 20% equity.', descUrdu: 'نجی مارگیج انشورنس۔ <20% ڈاؤن پر ضروری۔ EMI میں شامل۔ 20% ایکویٹی پر ہٹا دیا۔' },
          { titleEn: 'Savings Plan', titleUrdu: 'بچت منصوبہ', descEn: 'Auto-transfer to savings. Cut expenses. Side income. FD while saving.', descUrdu: 'بچت میں آٹو منتقلی۔ اخراجات کم کریں۔ سائیڈ انکم۔ بچت کے دوران FD۔' }
        ]}
        note={{ en: 'Larger down = smaller loan = lower EMI. Save aggressively. Consider FD returns.', urdu: 'بڑا ڈاؤن = چھوٹا قرض = کم EMI۔ جارحانہ طور پر بچت کریں۔ FD واپسی پر غور کریں۔' }}
      />

      <div className="max-w-4xl mx-auto space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className={`bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-6 text-white`}>
            <div className="text-sm opacity-90 mb-1">{language === 'en' ? 'Target Down Payment' : 'ہدف ڈاؤن پیمنٹ'}</div>
            <div className="text-4xl font-bold">{formatCurrency(targetDownPayment)}</div>
            <div className="text-xs opacity-75 mt-1">{targetPercent}% {language === 'en' ? 'of property price' : 'پراپرٹی قیمت کا'}</div>
          </div>

          <div className={`bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white`}>
            <div className="text-sm opacity-90 mb-1">{language === 'en' ? 'Time to Save' : 'بچت کا وقت'}</div>
            <div className="text-4xl font-bold">{monthsNeeded}</div>
            <div className="text-xs opacity-75 mt-1">{language === 'en' ? 'months at current rate' : 'موجودہ شرح پر مہینے'}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-4">{language === 'en' ? 'Inputs' : 'ان پٹس'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Property Price (Rs.)' : 'پراپرٹی قیمت (Rs.)'}</label>
              <input type="number" value={propertyPrice} onChange={e => setPropertyPrice(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Current Savings (Rs.)' : 'موجودہ بچت (Rs.)'}</label>
              <input type="number" value={currentSavings} onChange={e => setCurrentSavings(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Monthly Savings (Rs.)' : 'ماہانہ بچت (Rs.)'}</label>
              <input type="number" value={monthlySavings} onChange={e => setMonthlySavings(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Target Down (%)' : 'ہدف ڈاؤن (%)'}</label>
              <input type="number" value={targetPercent} onChange={e => setTargetPercent(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              <input type="range" min={10} max={40} value={targetPercent} onChange={e => setTargetPercent(parseInt(e.target.value))} className="w-full mt-2 accent-teal-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-3">{language === 'en' ? 'Down Payment Options' : 'ڈاؤن پیمنٹ اختیارات'}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Minimum (10%)' : 'کم سے کم (10%)'}</span>
                <span className="font-bold">{formatCurrency(minDownPayment)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Recommended (20%)' : 'تجویز کردہ (20%)'}</span>
                <span className="font-bold">{formatCurrency(propertyPrice * 0.20)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Target (' + targetPercent + '%)' : 'ہدف (' + targetPercent + '%)'}</span>
                <span className="font-bold text-teal-600">{formatCurrency(targetDownPayment)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-3">{language === 'en' ? 'Savings Progress' : 'بچت کی پیش رفت'}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Current Savings' : 'موجودہ بچت'}</span>
                <span className="font-bold">{formatCurrency(currentSavings)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Remaining' : 'باقی'}</span>
                <span className="font-bold text-orange-600">{formatCurrency(Math.max(0, remaining))}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Loan (LTV)' : 'قرض (LTV)'}</span>
                <span className="font-bold">{formatCurrency(loanAmount)} ({ltvRatio.toFixed(0)}%)</span>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `Down: ${formatCurrency(targetDownPayment)} (${targetPercent}%), ${monthsNeeded} months` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Plan' : 'منصوبہ محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default DownPaymentCalculator;