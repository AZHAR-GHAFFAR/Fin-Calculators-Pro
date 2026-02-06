import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const TaxDeductionCalculator = ({ language, addToHistory, calculatorName }) => {
  const [monthlyGross, setMonthlyGross] = useState(100000);
  const [taxStatus, setTaxStatus] = useState('filer'); // filer, nonfiler

  const annualIncome = monthlyGross * 12;
  
  // Pakistan tax slabs 2024 (simplified)
  let tax = 0;
  if (annualIncome <= 600000) {
    tax = 0;
  } else if (annualIncome <= 1200000) {
    tax = (annualIncome - 600000) * 0.025;
  } else if (annualIncome <= 2400000) {
    tax = 15000 + (annualIncome - 1200000) * 0.125;
  } else if (annualIncome <= 3600000) {
    tax = 165000 + (annualIncome - 2400000) * 0.20;
  } else {
    tax = 405000 + (annualIncome - 3600000) * 0.30;
  }

  const monthlyTax = tax / 12;
  const netMonthlySalary = monthlyGross - monthlyTax;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="red"
        formula="Tax = Based on Annual Income Tax Slabs (Pakistan FBR)"
        variables={[
          { symbol: 'Slab 1', nameEn: 'Up to Rs. 6L: 0%', nameUrdu: 'Rs. 6L تک: 0%' },
          { symbol: 'Slab 2', nameEn: 'Rs. 6L-12L: 2.5%', nameUrdu: 'Rs. 6L-12L: 2.5%' },
          { symbol: 'Slab 3', nameEn: 'Rs. 12L-24L: 12.5%', nameUrdu: 'Rs. 12L-24L: 12.5%' }
        ]}
        example={[
          { labelEn: 'Monthly Gross', labelUrdu: 'ماہانہ مجموعی', value: 'Rs. 1,00,000' },
          { labelEn: 'Annual Income', labelUrdu: 'سالانہ آمدنی', value: 'Rs. 12,00,000' },
          { labelEn: 'Annual Tax', labelUrdu: 'سالانہ ٹیکس', value: 'Rs. 15,000 (2.5%)' },
          { labelEn: 'Monthly Deduction', labelUrdu: 'ماہانہ کٹوتی', value: 'Rs. 1,250' }
        ]}
        terms={[
          {
            titleEn: 'Filer vs Non-Filer',
            titleUrdu: 'فائلر بمقابلہ نان فائلر',
            descEn: 'Filers: lower withholding tax rates. Non-filers: double rates on many transactions.',
            descUrdu: 'فائلرز: کم ود ہولڈنگ ٹیکس کی شرحیں۔ نان فائلرز: بہت سے لین دین پر دوگنی شرحیں۔'
          },
          {
            titleEn: 'Tax Slabs 2024',
            titleUrdu: 'ٹیکس سلیب 2024',
            descEn: 'Progressive slabs. 0% up to Rs. 6L. Then 2.5%, 12.5%, 20%, 30% on higher amounts.',
            descUrdu: 'ترقی پسند سلیب۔ Rs. 6L تک 0%۔ پھر زیادہ رقم پر 2.5%، 12.5%، 20%، 30%۔'
          },
          {
            titleEn: 'Exemptions',
            titleUrdy: 'چھوٹ',
            descEn: 'Certain allowances exempt (house 45%, medical 10%). Consult CA for accurate calculation.',
            descUrdu: 'کچھ الاؤنسز مستثنیٰ (مکان 45%، طبی 10%)۔ درست حساب کے لیے CA سے مشورہ کریں۔'
          }
        ]}
        note={{
          en: 'Tax slabs change yearly. This is simplified calculation. Actual tax depends on allowances, exemptions. Always file tax return. Consult chartered accountant for accurate calculation.',
          urdu: 'ٹیکس سلیب سالانہ تبدیل ہوتے ہیں۔ یہ سادہ حساب ہے۔ اصل ٹیکس الاؤنسز، چھوٹ پر منحصر ہے۔ ہمیشہ ٹیکس ریٹرن فائل کریں۔ درست حساب کے لیے چارٹرڈ اکاؤنٹنٹ سے مشورہ کریں۔'
        }}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-red-600" />
            {language === 'en' ? 'Income Details' : 'آمدنی کی تفصیلات'}
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Monthly Gross Salary (Rs.)' : 'ماہانہ مجموعی تنخواہ (Rs.)'}</label>
              <input type="number" value={monthlyGross} onChange={(e) => setMonthlyGross(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              <p className="text-xs text-slate-500 mt-1">
                {language === 'en' ? `Annual: ${formatCurrency(annualIncome)}` : `سالانہ: ${formatCurrency(annualIncome)}`}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Tax Status' : 'ٹیکس کی حیثیت'}</label>
              <select value={taxStatus} onChange={(e) => setTaxStatus(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="filer">{language === 'en' ? 'Filer (Active Taxpayer)' : 'فائلر (فعال ٹیکس دہندہ)'}</option>
                <option value="nonfiler">{language === 'en' ? 'Non-Filer' : 'نان فائلر'}</option>
              </select>
            </div>
            <button onClick={() => {
              addToHistory({ calculatorName, result: `Annual tax: ${formatCurrency(tax)}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Tax' : 'ٹیکس کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Monthly Tax' : 'ماہانہ ٹیکس'}</div>
              <div className="text-3xl font-bold">{formatCurrency(monthlyTax)}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Net Salary' : 'خالص تنخواہ'}</div>
              <div className="text-3xl font-bold">{formatCurrency(netMonthlySalary)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Tax Breakdown' : 'ٹیکس کی تفصیل'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Annual Income' : 'سالانہ آمدنی'}</span>
                <span className="font-bold">{formatCurrency(annualIncome)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Annual Tax' : 'سالانہ ٹیکس'}</span>
                <span className="font-bold text-red-600">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Effective Rate' : 'مؤثر شرح'}</span>
                <span className="font-bold">{((tax/annualIncome)*100).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Monthly Deduction' : 'ماہانہ کٹوتی'}</span>
                <span className="font-bold text-xl text-red-600">{formatCurrency(monthlyTax)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxDeductionCalculator;