import React, { useState, useMemo } from 'react';
import { FileText, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const AmortizationScheduleCalculator = ({ language, addToHistory, calculatorName }) => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenureYears, setTenureYears] = useState(5);
  const [showMonths, setShowMonths] = useState(12); // How many months to display

  const monthlyRate = interestRate / 12 / 100;
  const tenure = tenureYears * 12;
  const emi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure) / (Math.pow(1 + monthlyRate, tenure) - 1);

  // Generate complete amortization schedule
  const schedule = useMemo(() => {
    const data = [];
    let balance = loanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;

    for (let month = 1; month <= tenure; month++) {
      const interestPart = balance * monthlyRate;
      const principalPart = emi - interestPart;
      balance -= principalPart;
      totalInterestPaid += interestPart;
      totalPrincipalPaid += principalPart;

      data.push({
        month,
        year: Math.ceil(month / 12),
        emi: emi,
        principal: principalPart,
        interest: interestPart,
        totalInterest: totalInterestPaid,
        totalPrincipal: totalPrincipalPaid,
        balance: Math.max(0, balance)
      });
    }
    return data;
  }, [loanAmount, monthlyRate, tenure, emi]);

  // Data for chart (yearly aggregation for better visualization)
  const chartData = useMemo(() => {
    const yearlyData = [];
    for (let year = 1; year <= tenureYears; year++) {
      const yearData = schedule.filter(s => s.year === year);
      const yearPrincipal = yearData.reduce((sum, s) => sum + s.principal, 0);
      const yearInterest = yearData.reduce((sum, s) => sum + s.interest, 0);
      const endBalance = yearData[yearData.length - 1]?.balance || 0;

      yearlyData.push({
        year: `${language === 'en' ? 'Year' : 'سال'} ${year}`,
        principal: yearPrincipal,
        interest: yearInterest,
        balance: endBalance
      });
    }
    return yearlyData;
  }, [schedule, tenureYears, language]);

  const totalInterest = schedule[schedule.length - 1]?.totalInterest || 0;
  const totalPayment = loanAmount + totalInterest;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="purple"
        formula="Each EMI = Principal Part + Interest Part  |  Interest = Outstanding Balance × Monthly Rate"
        variables={[
          { symbol: 'Principal Part', nameEn: 'Reduces loan balance', nameUrdu: 'قرض کا بیلنس کم کرتا ہے' },
          { symbol: 'Interest Part', nameEn: 'Payment to lender for borrowing', nameUrdu: 'قرض لینے کے لیے قرض دہندہ کو ادائیگی' },
          { symbol: 'Outstanding Balance', nameEn: 'Remaining loan amount', nameUrdu: 'باقی قرض کی رقم' }
        ]}
        example={[
          { labelEn: 'Loan Amount', labelUrdu: 'قرض کی رقم', value: 'Rs. 10,00,000' },
          { labelEn: 'Interest Rate', labelUrdu: 'سود کی شرح', value: '12% per annum' },
          { labelEn: 'Tenure', labelUrdu: 'مدت', value: '5 years (60 months)' },
          { labelEn: 'Monthly EMI', labelUrdu: 'ماہانہ EMI', value: 'Rs. 22,244' },
          { labelEn: 'Month 1', labelUrdu: 'ماہ 1', value: 'Interest: Rs. 10,000 | Principal: Rs. 12,244' },
          { labelEn: 'Month 60', labelUrdu: 'ماہ 60', value: 'Interest: Rs. 221 | Principal: Rs. 22,023' }
        ]}
        terms={[
          {
            titleEn: 'Amortization',
            titleUrdu: 'ایمورٹائزیشن',
            descEn: 'Gradual reduction of loan through scheduled payments. Early EMIs have more interest, later EMIs have more principal.',
            descUrdu: 'طے شدہ ادائیگیوں کے ذریعے قرض میں بتدریج کمی۔ ابتدائی EMIs میں زیادہ سود، بعد کی EMIs میں زیادہ اصل رقم۔'
          },
          {
            titleEn: 'Reducing Balance',
            titleUrdu: 'کم ہوتا بیلنس',
            descEn: 'Interest calculated on outstanding balance (not original amount). Standard for most loans in Pakistan.',
            descUrdu: 'باقی بیلنس پر سود کا حساب (اصل رقم پر نہیں)۔ پاکستان میں زیادہ تر قرضوں کے لیے معیاری۔'
          },
          {
            titleEn: 'Prepayment Impact',
            titleUrdu: 'پہلے سے ادائیگی کا اثر',
            descEn: 'Extra payments reduce principal, saving future interest. Even Rs. 5,000 extra/month saves lakhs!',
            descUrdu: 'اضافی ادائیگیاں اصل رقم کو کم کرتی ہیں، مستقبل کا سود بچاتی ہیں۔ یہاں تک کہ 5,000 روپے اضافی/ماہ لاکھوں بچاتا ہے!'
          }
        ]}
        note={{
          en: 'This schedule shows how each EMI is split between principal and interest. Early in loan, most of EMI goes to interest. Later, most goes to principal. Use this to plan prepayments strategically.',
          urdu: 'یہ شیڈول دکھاتا ہے کہ ہر EMI اصل رقم اور سود کے درمیان کیسے تقسیم ہوتا ہے۔ قرض کے شروع میں، EMI کا زیادہ تر حصہ سود میں جاتا ہے۔ بعد میں، زیادہ تر اصل رقم میں جاتا ہے۔ اسٹریٹجک طور پر پہلے سے ادائیگیوں کی منصوبہ بندی کے لیے استعمال کریں۔'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-600" />
              {language === 'en' ? 'Loan Details' : 'قرض کی تفصیلات'}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Loan Amount (Rs.)' : 'قرض کی رقم (Rs.)'}</label>
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Interest Rate (% p.a.)' : 'سود کی شرح (% سالانہ)'}</label>
                <input type="number" step="0.25" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Tenure (Years)' : 'مدت (سال)'}</label>
                <input type="range" min="1" max="30" value={tenureYears} onChange={(e) => setTenureYears(parseFloat(e.target.value))}
                  className="w-full h-2 bg-purple-100 dark:bg-purple-900 rounded-lg" />
                <input type="number" value={tenureYears} onChange={(e) => setTenureYears(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
                <p className="text-xs text-slate-500 mt-1">{tenure} {language === 'en' ? 'months' : 'مہینے'}</p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Display Months' : 'ماہ دکھائیں'}</label>
                <select value={showMonths} onChange={(e) => setShowMonths(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                  <option value="12">{language === 'en' ? 'First 12 months' : 'پہلے 12 مہینے'}</option>
                  <option value="24">{language === 'en' ? 'First 24 months' : 'پہلے 24 مہینے'}</option>
                  <option value="60">{language === 'en' ? 'First 60 months' : 'پہلے 60 مہینے'}</option>
                  <option value={tenure}>{language === 'en' ? 'All months' : 'تمام مہینے'}</option>
                </select>
              </div>

              <button onClick={() => {
                addToHistory({ calculatorName, result: `${formatCurrency(emi)} EMI for ${tenure} months` });
                toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
              }}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 rounded-xl">
                {language === 'en' ? 'Generate Schedule' : 'شیڈول بنائیں'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Monthly EMI' : 'ماہانہ EMI'}</div>
              <div className="text-3xl font-bold">{formatCurrency(emi)}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Interest' : 'کل سود'}</div>
              <div className="text-3xl font-bold">{formatCurrency(totalInterest)}</div>
            </div>
            <div className="bg-gradient-to-br from-rose-500 to-orange-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Payment' : 'کل ادائیگی'}</div>
              <div className="text-3xl font-bold">{formatCurrency(totalPayment)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Principal vs Interest (Yearly)' : 'اصل رقم بمقابلہ سود (سالانہ)'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" fontSize={11} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Line type="monotone" dataKey="principal" stroke="#8B5CF6" strokeWidth={2} name={language === 'en' ? 'Principal' : 'اصل رقم'} />
                <Line type="monotone" dataKey="interest" stroke="#EF4444" strokeWidth={2} name={language === 'en' ? 'Interest' : 'سود'} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex justify-between items-center">
              <span>{language === 'en' ? 'Amortization Schedule' : 'ایمورٹائزیشن شیڈول'}</span>
              <Download className="w-4 h-4 cursor-pointer" onClick={() => toast.success('Export feature coming soon!')} />
            </h3>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th className="text-left p-2">{language === 'en' ? 'Month' : 'ماہ'}</th>
                    <th className="text-right p-2">{language === 'en' ? 'EMI' : 'EMI'}</th>
                    <th className="text-right p-2">{language === 'en' ? 'Principal' : 'اصل'}</th>
                    <th className="text-right p-2">{language === 'en' ? 'Interest' : 'سود'}</th>
                    <th className="text-right p-2">{language === 'en' ? 'Balance' : 'بیلنس'}</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.slice(0, showMonths).map((payment, idx) => (
                    <tr key={idx} className="border-b hover:bg-slate-50 dark:hover:bg-slate-700">
                      <td className="p-2">{payment.month}</td>
                      <td className="p-2 text-right font-semibold">{formatCurrency(payment.emi)}</td>
                      <td className="p-2 text-right text-green-600">{formatCurrency(payment.principal)}</td>
                      <td className="p-2 text-right text-red-600">{formatCurrency(payment.interest)}</td>
                      <td className="p-2 text-right">{formatCurrency(payment.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {showMonths < tenure && (
                <div className="text-center py-4 text-sm text-slate-500">
                  {language === 'en' ? `Showing ${showMonths} of ${tenure} months. Change display setting to see more.` : `${tenure} میں سے ${showMonths} مہینے دکھا رہے ہیں۔ مزید دیکھنے کے لیے ڈسپلے سیٹنگ تبدیل کریں۔`}
                </div>
              )}
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
            <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3">
              {language === 'en' ? '📊 Key Insights' : '📊 اہم بصیرتیں'}
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-purple-700 dark:text-purple-400">
              <div>
                <div className="opacity-75 text-xs">{language === 'en' ? 'First Month Interest' : 'پہلے ماہ کا سود'}</div>
                <div className="text-lg font-bold">{formatCurrency(schedule[0]?.interest)}</div>
              </div>
              <div>
                <div className="opacity-75 text-xs">{language === 'en' ? 'Last Month Interest' : 'آخری ماہ کا سود'}</div>
                <div className="text-lg font-bold">{formatCurrency(schedule[tenure - 1]?.interest)}</div>
              </div>
              <div>
                <div className="opacity-75 text-xs">{language === 'en' ? 'Interest as % of Principal' : 'سود اصل کا %'}</div>
                <div className="text-lg font-bold">{((totalInterest / loanAmount) * 100).toFixed(1)}%</div>
              </div>
              <div>
                <div className="opacity-75 text-xs">{language === 'en' ? 'Total Payments' : 'کل ادائیگیاں'}</div>
                <div className="text-lg font-bold">{tenure} {language === 'en' ? 'EMIs' : 'EMIs'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmortizationScheduleCalculator;