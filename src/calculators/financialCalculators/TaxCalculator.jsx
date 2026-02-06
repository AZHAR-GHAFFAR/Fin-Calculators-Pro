
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FileText, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency, currencySymbol } from '../../utils/currency';

const TaxCalculator = ({ language, addToHistory, calculatorName }) => {
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000);
  const [taxRegime, setTaxRegime] = useState('new');

  // Pakistan Tax Slabs 2024-25 (simplified)
  const oldRegimeTaxSlabs = [
    { min: 0, max: 600000, rate: 0 },
    { min: 600000, max: 1200000, rate: 5 },
    { min: 1200000, max: 2400000, rate: 15 },
    { min: 2400000, max: 3600000, rate: 25 },
    { min: 3600000, max: 6000000, rate: 30 },
    { min: 6000000, max: Infinity, rate: 35 }
  ];

  const newRegimeTaxSlabs = [
    { min: 0, max: 600000, rate: 0 },
    { min: 600000, max: 1200000, rate: 2.5 },
    { min: 1200000, max: 2400000, rate: 12.5 },
    { min: 2400000, max: 3600000, rate: 22.5 },
    { min: 3600000, max: 6000000, rate: 27.5 },
    { min: 6000000, max: Infinity, rate: 35 }
  ];

  const calculateTax = () => {
    const taxableIncome = taxRegime === 'old' ? Math.max(annualIncome - deductions, 0) : annualIncome;
    const slabs = taxRegime === 'old' ? oldRegimeTaxSlabs : newRegimeTaxSlabs;
    
    let tax = 0;
    let remainingIncome = taxableIncome;
    const breakdown = [];

    for (let i = 0; i < slabs.length; i++) {
      const slab = slabs[i];
      const slabRange = slab.max - slab.min;
      
      if (remainingIncome <= 0) break;
      
      const taxableInSlab = Math.min(remainingIncome, slab.max === Infinity ? remainingIncome : slabRange);
      const taxInSlab = (taxableInSlab * slab.rate) / 100;
      
      if (taxableInSlab > 0) {
        breakdown.push({
          slab: `${slab.min.toLocaleString()} - ${slab.max === Infinity ? '∞' : slab.max.toLocaleString()}`,
          rate: slab.rate,
          taxable: taxableInSlab,
          tax: taxInSlab
        });
        
        tax += taxInSlab;
        remainingIncome -= taxableInSlab;
      }
    }

    return {
      totalTax: tax,
      taxableIncome,
      netIncome: annualIncome - tax,
      effectiveRate: (tax / annualIncome) * 100,
      breakdown
    };
  };

  const result = useMemo(() => calculateTax(), [annualIncome, deductions, taxRegime]);

  const pieData = [
    { name: language === 'en' ? 'Net Income' : 'خالص آمدنی', value: result.netIncome, color: '#10B981' },
    { name: language === 'en' ? 'Tax' : 'ٹیکس', value: result.totalTax, color: '#EF4444' }
  ];

  const barData = result.breakdown.map(item => ({
    slab: `${item.rate}%`,
    tax: item.tax
  }));

  return (

    <div className="space-y-8">

      <InfoPanel
  language={language}
  colorScheme="red"
  formula="Tax = Σ (Income in Each Slab × Slab Tax Rate)"
  variables={[
    { symbol: 'Σ', nameEn: 'Sum of all tax slabs', nameUrdu: 'تمام ٹیکس سلیبوں کا مجموعہ' }
  ]}
  example={[
    { labelEn: 'Annual Income', labelUrdu: 'سالانہ آمدنی', value: 'Rs. 12,00,000' },
    { labelEn: 'Regime', labelUrdu: 'نظام', value: 'New Tax Regime' },
    { labelEn: '0-6L Slab', labelUrdu: '0-6L سلیب', value: '0% = Rs. 0' },
    { labelEn: '6L-12L Slab', labelUrdu: '6L-12L سلیب', value: '2.5% = Rs. 15,000' },
    { labelEn: 'Total Tax', labelUrdu: 'کل ٹیکس', value: 'Rs. 15,000' },
    { labelEn: 'Effective Rate', labelUrdu: 'مؤثر شرح', value: '1.25%' }
  ]}
  terms={[
    {
      titleEn: 'Tax Slab',
      titleUrdu: 'ٹیکس سلیب',
      descEn: 'Income is divided into brackets with different tax rates.',
      descUrdu: 'آمدنی کو مختلف ٹیکس شرحوں کے ساتھ بریکٹس میں تقسیم کیا جاتا ہے۔'
    },
    {
      titleEn: 'Effective Tax Rate',
      titleUrdu: 'مؤثر ٹیکس کی شرح',
      descEn: 'Actual percentage of income paid as tax (not marginal rate).',
      descUrdu: 'آمدنی کا اصل فیصد جو ٹیکس کے طور پر ادا کیا جاتا ہے۔'
    },
    {
      titleEn: 'Old vs New Regime',
      titleUrdu: 'پرانا بمقابلہ نیا نظام',
      descEn: 'Old has deductions, New has lower rates. Calculate both!',
      descUrdu: 'پرانے میں کٹوتیاں، نئے میں کم شرحیں۔ دونوں کا حساب لگائیں!'
    }
  ]}
  note={{
    en: 'Pakistan Tax Year 2024-25. These are standard rates. Consult a tax advisor for deductions and final filing.',
    urdu: 'پاکستان ٹیکس سال 2024-25۔ یہ معیاری شرحیں ہیں۔ کٹوتیوں اور حتمی فائلنگ کے لیے ٹیکس مشیر سے مشورہ کریں۔'
  }}
/>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              {language === 'en' ? 'Tax Details' : 'ٹیکس کی تفصیلات'}
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Annual Income (${currencySymbol})` : `سالانہ آمدنی (${currencySymbol})`}</label>
              <input type="range" min="0" max="10000000" step="50000" value={annualIncome}
                onChange={(e) => setAnnualIncome(parseFloat(e.target.value))}
                className="w-full h-2 bg-red-100 dark:bg-red-900 rounded-lg appearance-none cursor-pointer accent-red-600" />
              <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Tax Regime' : 'ٹیکس نظام'}</label>
              <select value={taxRegime} onChange={(e) => setTaxRegime(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600">
                <option value="new">{language === 'en' ? 'New Regime' : 'نیا نظام'}</option>
                <option value="old">{language === 'en' ? 'Old Regime (with deductions)' : 'پرانا نظام'}</option>
              </select>
            </div>

            {taxRegime === 'old' && (
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? `Deductions (${currencySymbol})` : `کٹوتیاں (${currencySymbol})`}</label>
                <input type="number" value={deductions} onChange={(e) => setDeductions(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>
            )}

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${formatCurrency(result.totalTax)} Tax` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg">
              {language === 'en' ? 'Calculate Tax' : 'ٹیکس کا حساب'}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Total Tax' : 'کل ٹیکس'}</div>
            <div className="text-3xl font-bold">{formatCurrency(result.totalTax)}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Net Income' : 'خالص آمدنی'}</div>
            <div className="text-3xl font-bold">{formatCurrency(result.netIncome)}</div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="text-sm font-semibold opacity-90 mb-2">{language === 'en' ? 'Effective Rate' : 'اوسط شرح'}</div>
            <div className="text-3xl font-bold">{result.effectiveRate.toFixed(2)}%</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Income Distribution' : 'آمدنی کی تقسیم'}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
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
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Tax by Slab' : 'سلیب کے مطابق ٹیکس'}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="slab" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="tax" fill="#EF4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Tax Breakdown by Slab' : 'سلیب کے مطابق تفصیل'}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-bold">{language === 'en' ? 'Income Slab' : 'آمدنی سلیب'}</th>
                  <th className="text-right py-3 px-4 text-sm font-bold">{language === 'en' ? 'Rate' : 'شرح'}</th>
                  <th className="text-right py-3 px-4 text-sm font-bold">{language === 'en' ? 'Taxable' : 'قابل ٹیکس'}</th>
                  <th className="text-right py-3 px-4 text-sm font-bold">{language === 'en' ? 'Tax' : 'ٹیکس'}</th>
                </tr>
              </thead>
              <tbody>
                {result.breakdown.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                    <td className="py-3 px-4 text-sm">{item.slab}</td>
                    <td className="py-3 px-4 text-sm text-right">{item.rate}%</td>
                    <td className="py-3 px-4 text-sm text-right">{formatCurrency(item.taxable)}</td>
                    <td className="py-3 px-4 text-sm text-right font-semibold text-red-600">{formatCurrency(item.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default TaxCalculator;