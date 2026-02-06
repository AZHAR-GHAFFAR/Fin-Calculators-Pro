import React, { useState, useMemo } from 'react';
import { Calendar, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const EMICalculator = ({ language, addToHistory, calculatorName }) => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(24);
  const [prepayment, setPrepayment] = useState(0);

  // EMI Calculation
  const monthlyRate = interestRate / 12 / 100;
  const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);
  
  const totalPayment = emi * tenure;
  const totalInterest = totalPayment - loanAmount;
  const effectiveTenure = prepayment > 0 ? Math.ceil((loanAmount - prepayment) / emi) : tenure;
  const interestSaved = prepayment > 0 ? (tenure - effectiveTenure) * emi - prepayment : 0;

  // Payment breakdown
  const pieData = [
    { name: language === 'en' ? 'Principal' : 'اصل رقم', value: loanAmount, color: '#3B82F6' },
    { name: language === 'en' ? 'Interest' : 'سود', value: totalInterest, color: '#EF4444' }
  ];

  // Generate amortization data for chart
  const chartData = useMemo(() => {
    const data = [];
    let balance = loanAmount;
    
    for (let month = 1; month <= Math.min(tenure, 36); month += Math.ceil(tenure / 12)) {
      const interestPart = balance * monthlyRate;
      const principalPart = emi - interestPart;
      balance -= principalPart;
      
      data.push({
        month: `${language === 'en' ? 'Month' : 'ماہ'} ${month}`,
        principal: principalPart,
        interest: interestPart,
        balance: Math.max(0, balance)
      });
    }
    return data;
  }, [loanAmount, monthlyRate, emi, tenure, language]);

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="red"
        formula="EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)"
        variables={[
          { symbol: 'P', nameEn: 'Principal loan amount', nameUrdu: 'قرض کی اصل رقم' },
          { symbol: 'r', nameEn: 'Monthly interest rate (Annual Rate ÷ 12 ÷ 100)', nameUrdu: 'ماہانہ سود کی شرح (سالانہ شرح ÷ 12 ÷ 100)' },
          { symbol: 'n', nameEn: 'Tenure in months', nameUrdu: 'مہینوں میں مدت' }
        ]}
        example={[
          { labelEn: 'Loan Amount', labelUrdu: 'قرض کی رقم', value: 'Rs. 10,00,000' },
          { labelEn: 'Interest Rate', labelUrdu: 'سود کی شرح', value: '12% per annum' },
          { labelEn: 'Tenure', labelUrdu: 'مدت', value: '24 months (2 years)' },
          { labelEn: 'Monthly EMI', labelUrdu: 'ماہانہ EMI', value: 'Rs. 47,073' },
          { labelEn: 'Total Interest', labelUrdu: 'کل سود', value: 'Rs. 1,29,760' },
          { labelEn: 'Total Payment', labelUrdu: 'کل ادائیگی', value: 'Rs. 11,29,760' }
        ]}
        terms={[
          {
            titleEn: 'What is EMI?',
            titleUrdu: 'EMI کیا ہے؟',
            descEn: 'Equated Monthly Installment - Fixed amount paid every month. Includes principal + interest.',
            descUrdu: 'برابر ماہانہ قسط - ہر ماہ ادا کی جانے والی مقررہ رقم۔ اصل رقم + سود شامل ہے۔'
          },
          {
            titleEn: 'Prepayment Benefits',
            titleUrdu: 'پہلے سے ادائیگی کے فوائد',
            descEn: 'Paying lump sum reduces tenure or EMI. Saves huge interest. Most banks allow free prepayment.',
            descUrdu: 'ایک ساتھ رقم ادا کرنے سے مدت یا EMI کم ہو جاتی ہے۔ بہت سود بچتا ہے۔ زیادہ تر بینک مفت پہلے سے ادائیگی کی اجازت دیتے ہیں۔'
          },
          {
            titleEn: 'EMI vs Interest Rate',
            titleUrdu: 'EMI بمقابلہ سود کی شرح',
            descEn: 'Lower rate = Lower EMI. 1% rate reduction on Rs. 10L loan saves Rs. 50,000+ over 5 years!',
            descUrdu: 'کم شرح = کم EMI۔ 10 لاکھ قرض پر 1% شرح میں کمی 5 سالوں میں 50,000+ روپے بچاتی ہے!'
          }
        ]}
        note={{
          en: 'EMI calculation assumes reducing balance method (most common). Processing fees and other charges not included. Always compare offers from multiple lenders.',
          urdu: 'EMI کا حساب کم ہوتے بیلنس کا طریقہ فرض کرتا ہے (سب سے عام)۔ پروسیسنگ فیس اور دیگر چارجز شامل نہیں۔ ہمیشہ کئی قرض دہندگان سے پیشکشوں کا موازنہ کریں۔'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-rose-600" />
              {language === 'en' ? 'Loan Details' : 'قرض کی تفصیلات'}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Loan Amount (Rs.)' : 'قرض کی رقم (Rs.)'}
                </label>
                <input type="range" min="50000" max="10000000" step="50000" value={loanAmount}
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                  className="w-full h-2 bg-rose-100 dark:bg-rose-900 rounded-lg appearance-none cursor-pointer accent-rose-600" />
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Interest Rate (% per year)' : 'سود کی شرح (% فی سال)'}
                </label>
                <input type="range" min="5" max="30" step="0.25" value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-orange-100 dark:bg-orange-900 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                <input type="number" value={interestRate} step="0.25" onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Tenure (Months)' : 'مدت (مہینے)'}
                </label>
                <input type="range" min="6" max="360" step="6" value={tenure}
                  onChange={(e) => setTenure(parseFloat(e.target.value))}
                  className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                <input type="number" value={tenure} onChange={(e) => setTenure(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
                <p className="text-xs text-slate-500 mt-1">
                  {(tenure / 12).toFixed(1)} {language === 'en' ? 'years' : 'سال'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'One-time Prepayment (Rs.)' : 'ایک بار پہلے سے ادائیگی (Rs.)'}
                </label>
                <input type="number" value={prepayment} onChange={(e) => setPrepayment(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'en' ? 'Optional: Reduce tenure' : 'اختیاری: مدت کم کریں'}
                </p>
              </div>

              <button onClick={() => {
                addToHistory({ calculatorName, result: `${formatCurrency(emi)} EMI for ${tenure} months` });
                toast.success(language === 'en' ? 'Saved to history!' : 'تاریخ میں محفوظ!');
              }}
                className="w-full bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg">
                {language === 'en' ? 'Calculate EMI' : 'EMI کا حساب'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-rose-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">
                {language === 'en' ? 'Monthly EMI' : 'ماہانہ EMI'}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(emi)}</div>
              <div className="text-xs opacity-75 mt-1">
                {((emi / loanAmount) * 100).toFixed(2)}% {language === 'en' ? 'of loan' : 'قرض کا'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">
                {language === 'en' ? 'Total Interest' : 'کل سود'}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(totalInterest)}</div>
              <div className="text-xs opacity-75 mt-1">
                {((totalInterest / loanAmount) * 100).toFixed(1)}% {language === 'en' ? 'of principal' : 'اصل رقم کا'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">
                {language === 'en' ? 'Total Payment' : 'کل ادائیگی'}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(totalPayment)}</div>
              <div className="text-xs opacity-75 mt-1">
                {tenure} {language === 'en' ? 'months' : 'مہینے'}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Payment Breakdown' : 'ادائیگی کی تفصیل'}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Principal vs Interest Over Time' : 'وقت کے ساتھ اصل رقم بمقابلہ سود'}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="principal" stroke="#3B82F6" strokeWidth={2} name={language === 'en' ? 'Principal' : 'اصل رقم'} />
                <Line type="monotone" dataKey="interest" stroke="#EF4444" strokeWidth={2} name={language === 'en' ? 'Interest' : 'سود'} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Loan Summary' : 'قرض کا خلاصہ'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Loan Amount' : 'قرض کی رقم'}</span>
                <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Monthly EMI' : 'ماہانہ EMI'}</span>
                <span className="font-bold text-rose-600">{formatCurrency(emi)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Total Interest' : 'کل سود'}</span>
                <span className="font-bold text-red-600">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Total Payment' : 'کل ادائیگی'}</span>
                <span className="font-bold text-purple-600">{formatCurrency(totalPayment)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 border-slate-300 dark:border-slate-600">
                <span className="font-bold text-slate-800 dark:text-white">{language === 'en' ? 'Tenure' : 'مدت'}</span>
                <span className="font-bold text-xl text-blue-600">{tenure} {language === 'en' ? 'months' : 'مہینے'}</span>
              </div>
            </div>
          </div>

          {prepayment > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h4 className="font-bold text-green-800 dark:text-green-300 mb-2 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                {language === 'en' ? '💰 Prepayment Benefits' : '💰 پہلے سے ادائیگی کے فوائد'}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-green-700 dark:text-green-400">
                <div>
                  <div className="text-xs opacity-75">{language === 'en' ? 'New Tenure' : 'نئی مدت'}</div>
                  <div className="text-xl font-bold">{effectiveTenure} {language === 'en' ? 'months' : 'مہینے'}</div>
                  <div className="text-xs">({tenure - effectiveTenure} {language === 'en' ? 'months saved' : 'مہینے بچے'})</div>
                </div>
                <div>
                  <div className="text-xs opacity-75">{language === 'en' ? 'Interest Saved' : 'سود بچا'}</div>
                  <div className="text-xl font-bold">{formatCurrency(interestSaved)}</div>
                  <div className="text-xs">{language === 'en' ? 'by prepaying' : 'پہلے سے ادا کر کے'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;