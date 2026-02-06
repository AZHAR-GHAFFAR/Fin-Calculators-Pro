import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const ProvidentFundCalculator = ({ language, addToHistory, calculatorName }) => {
  const [monthlyBasic, setMonthlyBasic] = useState(50000);
  const [employeeContribution, setEmployeeContribution] = useState(10); // %
  const [employerContribution, setEmployerContribution] = useState(10); // %
  const [years, setYears] = useState(10);
  const [interestRate, setInterestRate] = useState(12); // %

  // Monthly contributions
  const monthlyEmployee = (monthlyBasic * employeeContribution) / 100;
  const monthlyEmployer = (monthlyBasic * employerContribution) / 100;
  const monthlyTotal = monthlyEmployee + monthlyEmployer;

  // Calculate PF with compound interest
  const months = years * 12;
  const monthlyRate = interestRate / 12 / 100;
  
  // Future value of annuity: FV = PMT × [(1 + r)^n - 1] / r
  const maturityAmount = monthlyTotal * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const totalContributions = monthlyTotal * months;
  const interest = maturityAmount - totalContributions;

  // Generate year-wise data
  const chartData = [];
  for (let year = 1; year <= years; year++) {
    const m = year * 12;
    const amount = monthlyTotal * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate) * (1 + monthlyRate);
    chartData.push({
      year,
      yearLabel: `${language === 'en' ? 'Year' : 'سال'} ${year}`,
      amount,
      contributions: monthlyTotal * m
    });
  }

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="green"
        formula="PF Amount = Monthly Contribution × [(1+r)^n - 1] / r × (1+r)"
        variables={[
          { symbol: 'r', nameEn: 'Monthly interest rate (12% ÷ 12)', nameUrdu: 'ماہانہ سود کی شرح (12% ÷ 12)' },
          { symbol: 'n', nameEn: 'Number of months', nameUrdu: 'مہینوں کی تعداد' },
          { symbol: 'Contribution', nameEn: 'Employee % + Employer % of basic', nameUrdu: 'ملازم % + آجر % بنیادی کا' }
        ]}
        example={[
          { labelEn: 'Monthly Basic', labelUrdu: 'ماہانہ بنیادی', value: 'Rs. 50,000' },
          { labelEn: 'Employee (10%)', labelUrdu: 'ملازم (10%)', value: 'Rs. 5,000/month' },
          { labelEn: 'Employer (10%)', labelUrdu: 'آجر (10%)', value: 'Rs. 5,000/month' },
          { labelEn: '10 Years @ 12%', labelUrdu: '10 سال @ 12%', value: 'Rs. 23,00,386' },
          { labelEn: 'Interest Earned', labelUrdu: 'سود کمایا', value: 'Rs. 11,00,386' }
        ]}
        terms={[
          {
            titleEn: 'PF Contribution',
            titleUrdu: 'PF شراکت',
            descEn: 'Employee contributes (usually 10% of basic). Employer matches. Total 20% goes to PF.',
            descUrdu: 'ملازم شراکت کرتا ہے (عام طور پر بنیادی کا 10%)۔ آجر برابر کرتا ہے۔ کل 20% PF میں جاتا ہے۔'
          },
          {
            titleEn: 'PF Interest Rate',
            titleUrdu: 'PF سود کی شرح',
            descEn: 'EOBI declares rate yearly (~12-14%). Tax-free accumulation. Compounded monthly.',
            descUrdu: 'EOBI سالانہ شرح کا اعلان کرتا ہے (~12-14%)۔ ٹیکس فری جمع۔ ماہانہ مرکب۔'
          },
          {
            titleEn: 'Withdrawal Rules',
            titleUrdy: 'نکالنے کے قوانین',
            descEn: 'Lump sum on retirement (58+). Partial withdrawal for house/medical/education allowed.',
            descUrdu: 'ریٹائرمنٹ پر یکمشت (58+)۔ گھر/طبی/تعلیم کے لیے جزوی نکالنے کی اجازت۔'
          }
        ]}
        note={{
          en: 'PF mandatory in companies with 20+ employees. Interest rate varies yearly (8-14%). Tax-free on withdrawal after 5 years. Your biggest retirement saving!',
          urdu: 'PF 20+ ملازمین والی کمپنیوں میں لازمی۔ سود کی شرح سالانہ مختلف ہوتی ہے (8-14%)۔ 5 سال بعد نکالنے پر ٹیکس فری۔ آپ کی سب سے بڑی ریٹائرمنٹ بچت!'
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6">{language === 'en' ? 'PF Parameters' : 'PF پیرامیٹرز'}</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Monthly Basic (Rs.)' : 'ماہانہ بنیادی (Rs.)'}</label>
              <input type="number" value={monthlyBasic} onChange={(e) => setMonthlyBasic(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Employee Contribution (%)' : 'ملازم کی شراکت (%)'}</label>
              <input type="range" min="0" max="20" value={employeeContribution}
                onChange={(e) => setEmployeeContribution(parseFloat(e.target.value))}
                className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg" />
              <input type="number" value={employeeContribution} onChange={(e) => setEmployeeContribution(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Employer Contribution (%)' : 'آجر کی شراکت (%)'}</label>
              <input type="number" value={employerContribution} onChange={(e) => setEmployerContribution(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Years of Service' : 'خدمت کے سال'}</label>
              <input type="range" min="1" max="40" value={years} onChange={(e) => setYears(parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg" />
              <input type="number" value={years} onChange={(e) => setYears(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Annual Interest Rate (%)' : 'سالانہ سود کی شرح (%)'}</label>
              <input type="number" value={interestRate} onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <button onClick={() => {
              addToHistory({ calculatorName, result: `${years} years PF: ${formatCurrency(maturityAmount)}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate PF' : 'PF کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Maturity Amount' : 'میچورٹی رقم'}</div>
            <div className="text-4xl font-bold">{formatCurrency(maturityAmount)}</div>
            <div className="text-xs opacity-75 mt-1">{language === 'en' ? `After ${years} years` : `${years} سال بعد`}</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Breakdown' : 'تفصیل'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Your Contribution' : 'آپ کی شراکت'}</span>
                <span className="font-bold text-blue-600">{formatCurrency(monthlyEmployee * months)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Employer Contribution' : 'آجر کی شراکت'}</span>
                <span className="font-bold text-green-600">{formatCurrency(monthlyEmployer * months)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Interest Earned' : 'سود کمایا'}</span>
                <span className="font-bold text-orange-600">{formatCurrency(interest)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Total Maturity' : 'کل میچورٹی'}</span>
                <span className="font-bold text-xl text-green-600">{formatCurrency(maturityAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'PF Growth Over Time' : 'وقت کے ساتھ PF کی ترقی'}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="yearLabel" fontSize={11} />
            <YAxis fontSize={12} tickFormatter={(v) => `${(v/100000).toFixed(0)}L`} />
            <Tooltip formatter={(v) => formatCurrency(v)} />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#10B981" strokeWidth={3} name={language === 'en' ? 'PF Amount' : 'PF رقم'} />
            <Line type="monotone" dataKey="contributions" stroke="#3B82F6" strokeWidth={2} name={language === 'en' ? 'Contributions' : 'شراکتیں'} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProvidentFundCalculator;