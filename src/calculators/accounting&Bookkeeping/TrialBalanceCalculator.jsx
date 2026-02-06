import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const TrialBalanceCalculator = ({ language, addToHistory, calculatorName }) => {
  const [accounts, setAccounts] = useState([
    { name: 'Cash', debit: 500000, credit: 0 },
    { name: 'Inventory', debit: 300000, credit: 0 },
    { name: 'Accounts Payable', debit: 0, credit: 200000 },
    { name: 'Capital', debit: 0, credit: 600000 }
  ]);

  const totalDebit = accounts.reduce((sum, a) => sum + a.debit, 0);
  const totalCredit = accounts.reduce((sum, a) => sum + a.credit, 0);
  const balanced = Math.abs(totalDebit - totalCredit) < 1;

  return (
    <div className="space-y-8">
      <InfoPanel language={language} colorScheme="blue"
        formula="∑Debits = ∑Credits (All account balances)"
        variables={[
          { symbol: 'Trial Balance', nameEn: 'List of all account balances', nameUrdu: 'تمام اکاؤنٹ بیلنس کی فہرست' }
        ]}
        example={[
          { labelEn: 'Total Debits', labelUrdu: 'کل ڈیبٹ', value: 'Rs. 8,00,000' },
          { labelEn: 'Total Credits', labelUrdu: 'کل کریڈٹ', value: 'Rs. 8,00,000' }
        ]}
        terms={[
          { titleEn: 'Trial Balance', titleUrdu: 'ٹرائل بیلنس', descEn: 'List all accounts. Check debits = credits. Prepared monthly/yearly.', descUrdu: 'تمام اکاؤنٹس کی فہرست۔ ڈیبٹ = کریڈٹ چیک کریں۔ ماہانہ/سالانہ تیار۔' },
          { titleEn: 'Purpose', titleUrdu: 'مقصد', descEn: 'Verify bookkeeping accuracy. Find errors. Prepare financial statements.', descUrdu: 'بک کیپنگ کی درستگی کی تصدیق۔ غلطیاں تلاش کریں۔ مالی بیانات تیار کریں۔' },
          { titleEn: 'Errors Not Detected', titleUrdy: 'غلطیاں جو نہیں ملتیں', descEn: 'Omission, wrong account, compensating errors. Audit needed.', descUrdu: 'چھوٹ، غلط اکاؤنٹ، معاوضہ غلطیاں۔ آڈٹ کی ضرورت۔' }
        ]}
        note={{ en: 'Balanced trial balance doesn\'t guarantee no errors. Only checks mathematical accuracy.', urdu: 'متوازن ٹرائل بیلنس کوئی غلطی نہ ہونے کی ضمانت نہیں دیتا۔ صرف ریاضی کی درستگی چیک کرتا ہے۔' }}
      />

      <div className="max-w-4xl mx-auto">
        <div className={`${balanced ? 'bg-green-50 dark:bg-green-900/20 border-green-300' : 'bg-red-50 dark:bg-red-900/20 border-red-300'} border rounded-lg p-4 mb-4`}>
          <div className={`font-bold ${balanced ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
            {balanced ? (language === 'en' ? '✅ Trial Balance is Balanced' : '✅ ٹرائل بیلنس متوازن ہے') : (language === 'en' ? '⚠️ Trial Balance NOT Balanced' : '⚠️ ٹرائل بیلنس متوازن نہیں')}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Trial Balance' : 'ٹرائل بیلنس'}</h3>
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-slate-700">
              <tr>
                <th className="text-left p-3">{language === 'en' ? 'Account' : 'اکاؤنٹ'}</th>
                <th className="text-right p-3">{language === 'en' ? 'Debit' : 'ڈیبٹ'}</th>
                <th className="text-right p-3">{language === 'en' ? 'Credit' : 'کریڈٹ'}</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc, idx) => (
                <tr key={idx} className="border-b dark:border-slate-700">
                  <td className="p-3">{acc.name}</td>
                  <td className="p-3 text-right">{acc.debit > 0 ? formatCurrency(acc.debit) : '-'}</td>
                  <td className="p-3 text-right">{acc.credit > 0 ? formatCurrency(acc.credit) : '-'}</td>
                </tr>
              ))}
              <tr className="bg-slate-100 dark:bg-slate-700 font-bold text-lg">
                <td className="p-3">{language === 'en' ? 'Total' : 'کل'}</td>
                <td className="p-3 text-right text-blue-600">{formatCurrency(totalDebit)}</td>
                <td className="p-3 text-right text-green-600">{formatCurrency(totalCredit)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button onClick={() => {
          addToHistory({ calculatorName, result: `TB ${balanced ? 'Balanced' : 'Unbalanced'}` });
          toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
        }}
          className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl">
          {language === 'en' ? 'Save Trial Balance' : 'ٹرائل بیلنس محفوظ کریں'}
        </button>
      </div>
    </div>
  );
};

export default TrialBalanceCalculator;