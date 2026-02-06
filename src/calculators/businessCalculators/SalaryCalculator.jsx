import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const SalaryCalculator = ({ language, addToHistory, calculatorName }) => {
  const [grossSalary, setGrossSalary] = useState(100000);
  const [taxRate, setTaxRate] = useState(10);
  const [providentFund, setProvidentFund] = useState(10);
  const [healthInsurance, setHealthInsurance] = useState(2000);
  const [otherDeductions, setOtherDeductions] = useState(1000);

  const taxAmount = (grossSalary * taxRate) / 100;
  const pfAmount = (grossSalary * providentFund) / 100;
  const totalDeductions = taxAmount + pfAmount + healthInsurance + otherDeductions;
  const netSalary = grossSalary - totalDeductions;
  const annualGross = grossSalary * 12;
  const annualNet = netSalary * 12;
  const takeHomePercentage = (netSalary / grossSalary) * 100;

  const pieData = [
    { name: language === 'en' ? 'Net Salary' : 'خالص تنخواہ', value: netSalary, color: '#10B981' },
    { name: language === 'en' ? 'Tax' : 'ٹیکس', value: taxAmount, color: '#EF4444' },
    { name: language === 'en' ? 'Provident Fund' : 'پراویڈنٹ فنڈ', value: pfAmount, color: '#F59E0B' },
    { name: language === 'en' ? 'Insurance' : 'انشورنس', value: healthInsurance, color: '#8B5CF6' },
    { name: language === 'en' ? 'Other' : 'دیگر', value: otherDeductions, color: '#6B7280' }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="green"
        formula="Net Salary = Gross Salary - (Tax + Provident Fund + Insurance + Other Deductions)"
        variables={[
          { symbol: 'Gross Salary', nameEn: 'Total salary before deductions', nameUrdu: 'کٹوتیوں سے پہلے کل تنخواہ' },
          { symbol: 'Tax', nameEn: 'Income tax deducted', nameUrdu: 'آمدنی ٹیکس کٹوتی' },
          { symbol: 'PF', nameEn: 'Provident Fund (retirement savings)', nameUrdu: 'پراویڈنٹ فنڈ (ریٹائرمنٹ بچت)' },
          { symbol: 'Net Salary', nameEn: 'Take-home salary', nameUrdu: 'گھر لے جانے والی تنخواہ' }
        ]}
        example={[
          { labelEn: 'Gross Salary', labelUrdu: 'مجموعی تنخواہ', value: 'Rs. 1,00,000/month' },
          { labelEn: 'Tax (10%)', labelUrdu: 'ٹیکس (10%)', value: 'Rs. 10,000' },
          { labelEn: 'PF (10%)', labelUrdu: 'پی ایف (10%)', value: 'Rs. 10,000' },
          { labelEn: 'Insurance', labelUrdu: 'انشورنس', value: 'Rs. 2,000' },
          { labelEn: 'Other', labelUrdu: 'دیگر', value: 'Rs. 1,000' },
          { labelEn: 'Net Salary', labelUrdu: 'خالص تنخواہ', value: 'Rs. 77,000 (77%)' }
        ]}
        terms={[
          {
            titleEn: 'CTC vs In-Hand',
            titleUrdu: 'سی ٹی سی بمقابلہ ہاتھ میں',
            descEn: 'CTC (Cost to Company) includes all benefits. In-hand/Net is what you actually receive.',
            descUrdu: 'سی ٹی سی میں تمام فوائد شامل ہیں۔ ہاتھ میں/خالص وہ ہے جو آپ واقعی وصول کرتے ہیں۔'
          },
          {
            titleEn: 'Provident Fund',
            titleUrdu: 'پراویڈنٹ فنڈ',
            descEn: 'Retirement savings. Your contribution + employer match. In Pakistan, typically 10% each.',
            descUrdu: 'ریٹائرمنٹ بچت۔ آپ کا حصہ + آجر کی شراکت۔ پاکستان میں، عام طور پر ہر ایک 10%۔'
          },
          {
            titleEn: 'Salary Components',
            titleUrdu: 'تنخواہ کے اجزاء',
            descEn: 'Basic (40-50%) + Allowances (30-40%) + Bonuses (10-20%). Basic determines PF.',
            descUrdu: 'بنیادی (40-50%) + الاؤنسز (30-40%) + بونس (10-20%)۔ بنیادی پی ایف طے کرتی ہے۔'
          }
        ]}
        note={{
          en: 'Tax rates vary by income slab. This is simplified calculation. Actual deductions may include EOBI, professional tax, etc. Check with HR.',
          urdu: 'ٹیکس کی شرحیں آمدنی کے سلیب کے مطابق مختلف ہوتی ہیں۔ یہ آسان حساب ہے۔ اصل کٹوتیوں میں ای او بی آئی، پیشہ ورانہ ٹیکس وغیرہ شامل ہو سکتے ہیں۔ ایچ آر سے چیک کریں۔'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-cyan-600" />
              {language === 'en' ? 'Salary Details' : 'تنخواہ کی تفصیلات'}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Gross Monthly Salary (Rs.)' : 'مجموعی ماہانہ تنخواہ (Rs.)'}</label>
                <input type="range" min="25000" max="500000" step="5000" value={grossSalary}
                  onChange={(e) => setGrossSalary(parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg appearance-none cursor-pointer accent-green-600" />
                <input type="number" value={grossSalary} onChange={(e) => setGrossSalary(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Tax Rate (%)' : 'ٹیکس کی شرح (%)'}</label>
                <input type="range" min="0" max="35" step="0.5" value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-red-100 dark:bg-red-900 rounded-lg appearance-none cursor-pointer accent-red-600" />
                <input type="number" value={taxRate} step="0.5" onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Provident Fund (%)' : 'پراویڈنٹ فنڈ (%)'}</label>
                <input type="range" min="0" max="20" step="1" value={providentFund}
                  onChange={(e) => setProvidentFund(parseFloat(e.target.value))}
                  className="w-full h-2 bg-orange-100 dark:bg-orange-900 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                <input type="number" value={providentFund} onChange={(e) => setProvidentFund(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Health Insurance (Rs.)' : 'ہیلتھ انشورنس (Rs.)'}</label>
                <input type="number" value={healthInsurance} onChange={(e) => setHealthInsurance(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Other Deductions (Rs.)' : 'دیگر کٹوتیاں (Rs.)'}</label>
                <input type="number" value={otherDeductions} onChange={(e) => setOtherDeductions(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <button onClick={() => {
                addToHistory({ calculatorName, result: `${formatCurrency(netSalary)} Net Salary` });
                toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
              }}
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold py-3 rounded-xl shadow-lg">
                {language === 'en' ? 'Calculate Salary' : 'تنخواہ کا حساب'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Net Monthly' : 'خالص ماہانہ'}</div>
              <div className="text-3xl font-bold">{formatCurrency(netSalary)}</div>
              <div className="text-xs opacity-75 mt-1">{takeHomePercentage.toFixed(1)}% {language === 'en' ? 'of gross' : 'مجموعی کا'}</div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Annual CTC' : 'سالانہ سی ٹی سی'}</div>
              <div className="text-3xl font-bold">{formatCurrency(annualGross)}</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Annual Net' : 'سالانہ خالص'}</div>
              <div className="text-3xl font-bold">{formatCurrency(annualNet)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Salary Breakdown' : 'تنخواہ کی تفصیل'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
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
              {language === 'en' ? 'Deductions Summary' : 'کٹوتیوں کا خلاصہ'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Gross Salary' : 'مجموعی تنخواہ'}</span>
                <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(grossSalary)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Income Tax' : 'انکم ٹیکس'}</span>
                <span className="font-bold text-red-600">- {formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Provident Fund' : 'پراویڈنٹ فنڈ'}</span>
                <span className="font-bold text-orange-600">- {formatCurrency(pfAmount)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Health Insurance' : 'ہیلتھ انشورنس'}</span>
                <span className="font-bold text-purple-600">- {formatCurrency(healthInsurance)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">{language === 'en' ? 'Other Deductions' : 'دیگر کٹوتیاں'}</span>
                <span className="font-bold text-slate-600">- {formatCurrency(otherDeductions)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-slate-300 dark:border-slate-600">
                <span className="font-bold text-slate-800 dark:text-white">{language === 'en' ? 'Net Take-Home' : 'خالص تنخواہ'}</span>
                <span className="font-bold text-xl text-green-600">{formatCurrency(netSalary)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryCalculator;