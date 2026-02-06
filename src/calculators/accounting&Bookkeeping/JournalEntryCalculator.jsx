import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const JournalEntryCalculator = ({ language, addToHistory, calculatorName }) => {
  const [entries, setEntries] = useState([
    { account: 'Cash', debit: 100000, credit: 0 },
    { account: 'Capital', debit: 0, credit: 100000 }
  ]);

  const totalDebit = entries.reduce((sum, e) => sum + e.debit, 0);
  const totalCredit = entries.reduce((sum, e) => sum + e.credit, 0);
  const balanced = Math.abs(totalDebit - totalCredit) < 1;

  return (
    <div className="space-y-8">
      <InfoPanel language={language} colorScheme="teal"
        formula="Total Debits = Total Credits (Double-entry rule)"
        variables={[
          { symbol: 'Debit', nameEn: 'Increase assets/expenses, decrease liabilities/equity', nameUrdu: 'اثاثے/اخراجات میں اضافہ، واجبات/ایکویٹی میں کمی' },
          { symbol: 'Credit', nameEn: 'Decrease assets/expenses, increase liabilities/equity', nameUrdu: 'اثاثے/اخراجات میں کمی، واجبات/ایکویٹی میں اضافہ' }
        ]}
        example={[
          { labelEn: 'Cash (Debit)', labelUrdu: 'نقد (ڈیبٹ)', value: 'Rs. 1,00,000' },
          { labelEn: 'Capital (Credit)', labelUrdu: 'سرمایہ (کریڈٹ)', value: 'Rs. 1,00,000' }
        ]}
        terms={[
          { titleEn: 'Double-Entry', titleUrdu: 'ڈبل انٹری', descEn: 'Every transaction has 2 sides: debit & credit. Must equal.', descUrdu: 'ہر لین دین کے 2 رخ: ڈیبٹ اور کریڈٹ۔ برابر ہونا ضروری۔' },
          { titleEn: 'Debit Rules', titleUrdu: 'ڈیبٹ قوانین', descEn: 'Asset↑, Expense↑, Liability↓, Equity↓, Revenue↓', descUrdu: 'اثاثہ↑، اخراجات↑، واجبات↓، ایکویٹی↓، آمدنی↓' },
          { titleEn: 'Credit Rules', titleUrdy: 'کریڈٹ قوانین', descEn: 'Asset↓, Expense↓, Liability↑, Equity↑, Revenue↑', descUrdu: 'اثاثہ↓، اخراجات↓، واجبات↑، ایکویٹی↑، آمدنی↑' }
        ]}
        note={{ en: 'All entries must balance. Used for recording all transactions.', urdu: 'تمام اندراجات متوازن ہونی چاہئیں۔ تمام لین دین ریکارڈ کرنے کے لیے استعمال۔' }}
      />

      <div className="max-w-4xl mx-auto">
        {!balanced && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-300 rounded-lg p-4 mb-4">
            <div className="font-bold text-red-800 dark:text-red-300">
              {language === 'en' ? '⚠️ Entry Not Balanced!' : '⚠️ اندراج متوازن نہیں!'}
            </div>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
              {language === 'en' ? `Difference: ${formatCurrency(Math.abs(totalDebit - totalCredit))}` : `فرق: ${formatCurrency(Math.abs(totalDebit - totalCredit))}`}
            </p>
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Journal Entry' : 'جرنل انٹری'}</h3>
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="text-left p-3">{language === 'en' ? 'Account' : 'اکاؤنٹ'}</th>
                <th className="text-right p-3">{language === 'en' ? 'Debit' : 'ڈیبٹ'}</th>
                <th className="text-right p-3">{language === 'en' ? 'Credit' : 'کریڈٹ'}</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, idx) => (
                <tr key={idx} className="border-b dark:border-slate-700">
                  <td className="p-3">{entry.account}</td>
                  <td className="p-3 text-right font-bold text-blue-600">{entry.debit > 0 ? formatCurrency(entry.debit) : '-'}</td>
                  <td className="p-3 text-right font-bold text-green-600">{entry.credit > 0 ? formatCurrency(entry.credit) : '-'}</td>
                </tr>
              ))}
              <tr className="bg-slate-100 dark:bg-slate-700 font-bold">
                <td className="p-3">{language === 'en' ? 'Total' : 'کل'}</td>
                <td className="p-3 text-right text-blue-600">{formatCurrency(totalDebit)}</td>
                <td className="p-3 text-right text-green-600">{formatCurrency(totalCredit)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button onClick={() => {
          addToHistory({ calculatorName, result: `Entry ${balanced ? 'Balanced' : 'Unbalanced'}: Dr ${formatCurrency(totalDebit)}, Cr ${formatCurrency(totalCredit)}` });
          toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
        }}
          className="w-full mt-4 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-bold py-3 rounded-xl">
          {language === 'en' ? 'Post Entry' : 'انٹری پوسٹ کریں'}
        </button>
      </div>
    </div>
  );
};

export default JournalEntryCalculator;