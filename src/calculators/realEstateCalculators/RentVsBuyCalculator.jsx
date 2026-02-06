import React, { useState } from 'react';
import { Home, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const RentVsBuyCalculator = ({ language, addToHistory, calculatorName }) => {
  const [propertyPrice, setPropertyPrice] = useState(18000000);
  const [downPayment, setDownPayment] = useState(3600000); // 20%
  const [interestRate, setInterestRate] = useState(16);
  const [monthlyRent, setMonthlyRent] = useState(80000);
  const [rentIncrease, setRentIncrease] = useState(8); // % annual
  const [appreciation, setAppreciation] = useState(10); // % annual
  const [years, setYears] = useState(5);

  const loanAmount = propertyPrice - downPayment;
  const r = interestRate / 100 / 12;
  const n = 20 * 12;
  const monthlyEMI = loanAmount * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);

  // Simulate year-by-year
  const simulation = [];
  let cumulativeRent = 0;
  let cumulativeBuy = downPayment;
  let currentRent = monthlyRent;
  let propertyValue = propertyPrice;

  for (let year = 1; year <= years; year++) {
    cumulativeRent += currentRent * 12;
    cumulativeBuy += monthlyEMI * 12 + (propertyPrice * 0.015); // 1.5% annual maintenance
    propertyValue *= (1 + appreciation / 100);
    
    simulation.push({
      year,
      rent: cumulativeRent,
      buy: cumulativeBuy,
      equity: propertyValue - loanAmount,
      netWorth: propertyValue - cumulativeBuy
    });

    currentRent *= (1 + rentIncrease / 100);
  }

  const finalYear = simulation[simulation.length - 1];
  const rentTotal = finalYear.rent;
  const buyTotal = finalYear.buy;
  const equity = finalYear.equity;
  const breakEven = simulation.findIndex(s => s.netWorth > 0);

  return (
    <div className="space-y-6">
      <InfoPanel language={language} colorScheme="blue"
        formula="Rent: Cumulative rent over years | Buy: Down + EMIs + Maintenance − Appreciation"
        variables={[
          { symbol: 'Rent', nameEn: 'Monthly rent × 12 × years (with increases)', nameUrdu: 'ماہانہ کرایہ × 12 × سال (اضافوں کے ساتھ)' },
          { symbol: 'Buy', nameEn: 'Down payment + EMI + maintenance', nameUrdu: 'ڈاؤن پیمنٹ + EMI + مینٹیننس' },
          { symbol: 'Equity', nameEn: 'Property value gained over time', nameUrdu: 'وقت کے ساتھ حاصل شدہ پراپرٹی قیمت' }
        ]}
        example={[
          { labelEn: '5 Year Rent', labelUrdu: '5 سال کرایہ', value: 'Rs. 55 L (cumulative)' },
          { labelEn: '5 Year Buy', labelUrdu: '5 سال خریداری', value: 'Rs. 90 L (down + EMI)' },
          { labelEn: 'Property Value', labelUrdu: 'پراپرٹی قیمت', value: 'Rs. 2.9 Cr (10% annual appreciation)' },
          { labelEn: 'Net Worth', labelUrdu: 'خالص مالیت', value: '+Rs. 2 Cr (buying wins)' }
        ]}
        terms={[
          { titleEn: 'Rent Pros', titleUrdu: 'کرایہ فوائد', descEn: 'Flexibility. No maintenance. Lower upfront. Good for <3 years.', descUrdu: 'لچک۔ کوئی مینٹیننس نہیں۔ کم ابتدائی۔ <3 سال کے لیے اچھا۔' },
          { titleEn: 'Buy Pros', titleUrdu: 'خریداری فوائد', descEn: 'Build equity. Appreciation gains. Tax benefits. Stability. 5+ years better.', descUrdu: 'ایکویٹی بنائیں۔ قدر میں اضافہ۔ ٹیکس فوائد۔ استحکام۔ 5+ سال بہتر۔' },
          { titleEn: 'Break-Even', titleUrdu: 'توازن', descEn: 'Point where buying = renting. Pakistan: 3-5 years typical if 10% appreciation.', descUrdu: 'نقطہ جہاں خریداری = کرایہ۔ پاکستان: 3-5 سال عام اگر 10% قدر میں اضافہ۔' }
        ]}
        note={{ en: 'Buying better if staying 5+ years. Factor job stability, family plans. Rent if uncertain.', urdu: 'خریداری بہتر اگر 5+ سال رہنا۔ ملازمت استحکام، خاندانی منصوبے عامل۔ غیر یقینی ہو تو کرایہ۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className={`bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white`}>
            <div className="text-sm opacity-90 mb-1">{language === 'en' ? 'Renting Cost' : 'کرایہ لاگت'}</div>
            <div className="text-4xl font-bold">{formatCurrency(rentTotal)}</div>
            <div className="text-xs opacity-75 mt-1">{years} {language === 'en' ? 'years total' : 'سال کل'}</div>
          </div>

          <div className={`bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white`}>
            <div className="text-sm opacity-90 mb-1">{language === 'en' ? 'Buying Cost' : 'خریداری لاگت'}</div>
            <div className="text-4xl font-bold">{formatCurrency(buyTotal)}</div>
            <div className="text-xs opacity-75 mt-1">{language === 'en' ? 'Net equity:' : 'خالص ایکویٹی:'} {formatCurrency(equity)}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-4">{language === 'en' ? 'Scenario Inputs' : 'منظرنامہ ان پٹس'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Property Price (Rs.)' : 'پراپرٹی قیمت (Rs.)'}</label>
                <input type="number" value={propertyPrice} onChange={e => setPropertyPrice(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Down Payment (Rs.)' : 'ڈاؤن پیمنٹ (Rs.)'}</label>
                <input type="number" value={downPayment} onChange={e => setDownPayment(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Interest Rate (%)' : 'سود شرح (%)'}</label>
                <input type="number" value={interestRate} onChange={e => setInterestRate(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Monthly Rent (Rs.)' : 'ماہانہ کرایہ (Rs.)'}</label>
                <input type="number" value={monthlyRent} onChange={e => setMonthlyRent(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Rent Increase (%/year)' : 'کرایہ اضافہ (%/سال)'}</label>
                <input type="number" value={rentIncrease} onChange={e => setRentIncrease(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Appreciation (%/year)' : 'قدر میں اضافہ (%/سال)'}</label>
                <input type="number" value={appreciation} onChange={e => setAppreciation(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Time Horizon (Years)' : 'وقت (سال)'}</label>
                <input type="number" value={years} onChange={e => setYears(parseInt(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-3">{language === 'en' ? 'Cumulative Cost Comparison' : 'مجموعی لاگت کا موازنہ'}</h3>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={simulation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" label={{ value: language === 'en' ? 'Year' : 'سال', position: 'insideBottomRight', offset: -2, fontSize: 11 }} />
                  <YAxis fontSize={11} tickFormatter={v => `${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip formatter={v => formatCurrency(v)} />
                  <Legend />
                  <Line type="monotone" dataKey="rent" stroke="#3B82F6" strokeWidth={2.5} name={language === 'en' ? 'Rent' : 'کرایہ'} />
                  <Line type="monotone" dataKey="buy" stroke="#8B5CF6" strokeWidth={2.5} name={language === 'en' ? 'Buy' : 'خریداری'} />
                  <Line type="monotone" dataKey="equity" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" name={language === 'en' ? 'Equity' : 'ایکویٹی'} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-4">{language === 'en' ? 'Analysis' : 'تجزیہ'}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between pb-2 border-b">
                  <span>{language === 'en' ? 'Monthly EMI' : 'ماہانہ EMI'}</span>
                  <span className="font-bold">{formatCurrency(monthlyEMI)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>{language === 'en' ? 'Current Rent' : 'موجودہ کرایہ'}</span>
                  <span className="font-bold">{formatCurrency(monthlyRent)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>{language === 'en' ? 'Final Property Value' : 'آخری پراپرٹی قیمت'}</span>
                  <span className="font-bold text-green-600">{formatCurrency(simulation[simulation.length - 1]?.equity + loanAmount || 0)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>{language === 'en' ? 'Break-Even Point' : 'توازن نقطہ'}</span>
                  <span className="font-bold">{breakEven >= 0 ? `Year ${breakEven + 1}` : 'Not reached'}</span>
                </div>
              </div>

              <div className={`mt-4 p-3 rounded-lg text-sm font-bold ${equity > rentTotal ? 'bg-green-50 dark:bg-green-900/20 text-green-700' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700'}`}>
                {equity > rentTotal
                  ? (language === 'en' ? `🏠 Buying wins! Net gain: ${formatCurrency(equity - rentTotal)}` : `🏠 خریداری جیتتی ہے! خالص فائدہ: ${formatCurrency(equity - rentTotal)}`)
                  : (language === 'en' ? `🏢 Renting cheaper by: ${formatCurrency(rentTotal - buyTotal)}` : `🏢 کرایہ سستا: ${formatCurrency(rentTotal - buyTotal)}`)}
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `${years}yr: Rent ${formatCurrency(rentTotal)} vs Buy ${formatCurrency(buyTotal)}` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Comparison' : 'موازنہ محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default RentVsBuyCalculator;