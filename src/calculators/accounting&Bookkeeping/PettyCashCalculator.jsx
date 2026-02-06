import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const PettyCashCalculator = ({ language, addToHistory, calculatorName }) => {
  const [openingBalance, setOpeningBalance] = useState(10000);
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Office supplies', amount: 1200 },
    { id: 2, description: 'Tea/snacks', amount: 800 },
    { id: 3, description: 'Transport', amount: 500 },
    { id: 4, description: 'Repairs', amount: 1500 }
  ]);

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const cashOnHand = openingBalance - totalExpenses;
  const reimbursement = openingBalance - cashOnHand;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="emerald"
        formula="Cash on Hand = Opening Balance - Total Expenses"
        variables={[
          { symbol: 'Opening Balance', nameEn: 'Starting petty cash amount', nameUrdu: 'شروعاتی چھوٹی رقم' },
          { symbol: 'Expenses', nameEn: 'Small day-to-day payments', nameUrdu: 'چھوٹی روزمرہ ادائیگیاں' },
          { symbol: 'Reimbursement', nameEn: 'Amount to refill petty cash', nameUrdu: 'چھوٹی رقم دوبارہ بھرنے کی رقم' }
        ]}
        example={[
          { labelEn: 'Opening', labelUrdu: 'افتتاحی', value: 'Rs. 10,000' },
          { labelEn: 'Expenses', labelUrdu: 'اخراجات', value: 'Rs. 4,000' },
          { labelEn: 'Cash Remaining', labelUrdu: 'باقی نقد', value: 'Rs. 6,000' },
          { labelEn: 'Reimbursement Needed', labelUrdu: 'واپسی کی ضرورت', value: 'Rs. 4,000' }
        ]}
        terms={[
          {
            titleEn: 'Petty Cash',
            titleUrdu: 'چھوٹی رقم',
            descEn: 'Small cash for minor expenses. Office supplies, tea, transport. Typically Rs. 5K-20K.',
            descUrdu: 'چھوٹے اخراجات کے لیے چھوٹی رقم۔ دفتری سامان، چائے، ٹرانسپورٹ۔ عام طور پر Rs. 5K-20K۔'
          },
          {
            titleEn: 'Reimbursement',
            titleUrdu: 'واپسی',
            descEn: 'Refill petty cash to opening balance. Submit vouchers for approval and reimbursement.',
            descUrdu: 'افتتاحی بیلنس تک چھوٹی رقم دوبارہ بھریں۔ منظوری اور واپسی کے لیے واؤچر جمع کرائیں۔'
          },
          {
            titleEn: 'Record Keeping',
            titleUrdu: 'ریکارڈ رکھنا',
            descEn: 'Maintain vouchers for all expenses. Reconcile weekly/monthly. Assign custodian.',
            descUrdu: 'تمام اخراجات کے لیے واؤچر برقرار رکھیں۔ ہفتہ وار/ماہانہ تصفیہ۔ محافظ تفویض کریں۔'
          }
        ]}
        note={{
          en: 'Keep petty cash separate from personal money. All expenses need receipts. Reconcile regularly. Limit to small amounts (<Rs. 5,000 per transaction).',
          urdu: 'چھوٹی رقم کو ذاتی پیسے سے الگ رکھیں۔ تمام اخراجات کو رسیدوں کی ضرورت ہے۔ باقاعدگی سے تصفیہ کریں۔ چھوٹی رقموں تک محدود (<Rs. 5,000 فی لین دین)۔'
        }}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Opening Balance' : 'افتتاحی بیلنس'}</div>
            <div className="text-3xl font-bold">{formatCurrency(openingBalance)}</div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Expenses' : 'کل اخراجات'}</div>
            <div className="text-3xl font-bold">{formatCurrency(totalExpenses)}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Cash on Hand' : 'ہاتھ میں نقد'}</div>
            <div className="text-3xl font-bold">{formatCurrency(cashOnHand)}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Expense Breakdown' : 'اخراجات کی تفصیل'}</h3>
          <div className="space-y-2">
            {expenses.map((exp) => (
              <div key={exp.id} className="flex justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <span className="text-sm">{exp.description}</span>
                <span className="font-bold text-red-600">{formatCurrency(exp.amount)}</span>
              </div>
            ))}
            <div className="flex justify-between pt-3 border-t-2 font-bold text-lg">
              <span>{language === 'en' ? 'Total' : 'کل'}</span>
              <span className="text-red-600">{formatCurrency(totalExpenses)}</span>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-700 rounded-xl p-6">
          <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-3">
            {language === 'en' ? '💰 Reimbursement Required' : '💰 واپسی کی ضرورت'}
          </h3>
          <p className="text-purple-700 dark:text-purple-400 mb-2">
            {language === 'en' ? 
              `To restore petty cash to opening balance, reimbursement of ${formatCurrency(reimbursement)} is needed.` :
              `افتتاحی بیلنس پر چھوٹی رقم بحال کرنے کے لیے، ${formatCurrency(reimbursement)} کی واپسی کی ضرورت ہے۔`
            }
          </p>
          <button onClick={() => {
            addToHistory({ calculatorName, result: `Reimbursement: ${formatCurrency(reimbursement)}` });
            toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
          }}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl">
            {language === 'en' ? 'Request Reimbursement' : 'واپسی کی درخواست'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PettyCashCalculator;