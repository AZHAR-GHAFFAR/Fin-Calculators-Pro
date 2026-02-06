import React, { useState, useMemo } from 'react';
import { Clock, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const PaymentScheduleCalculator = ({ language, addToHistory, calculatorName }) => {
  const [totalAmount, setTotalAmount] = useState(100000);
  const [numberOfPayments, setNumberOfPayments] = useState(12);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly'); // monthly, weekly, biweekly
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const paymentAmount = totalAmount / numberOfPayments;

  // Generate payment schedule
  const schedule = useMemo(() => {
    const data = [];
    let currentDate = new Date(startDate);
    let remainingBalance = totalAmount;

    const frequencyDays = {
      monthly: 30,
      biweekly: 14,
      weekly: 7
    };

    for (let i = 1; i <= numberOfPayments; i++) {
      remainingBalance -= paymentAmount;
      
      data.push({
        no: i,
        date: new Date(currentDate).toLocaleDateString('en-GB'),
        amount: paymentAmount,
        balance: Math.max(0, remainingBalance)
      });

      // Increment date
      currentDate.setDate(currentDate.getDate() + frequencyDays[paymentFrequency]);
    }

    return data;
  }, [totalAmount, numberOfPayments, paymentFrequency, startDate, paymentAmount]);

  const endDate = schedule[schedule.length - 1]?.date;
  const totalDuration = Math.ceil(numberOfPayments * (paymentFrequency === 'monthly' ? 30 : paymentFrequency === 'biweekly' ? 14 : 7));

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="blue"
        formula="Payment Amount = Total Amount ÷ Number of Payments  |  Next Payment Date = Previous Date + Frequency"
        variables={[
          { symbol: 'Total Amount', nameEn: 'Complete amount to be paid', nameUrdu: 'مکمل ادائیگی کی رقم' },
          { symbol: 'Frequency', nameEn: 'Weekly, Biweekly, or Monthly', nameUrdu: 'ہفتہ وار، دو ہفتہ وار، یا ماہانہ' },
          { symbol: 'Payment', nameEn: 'Fixed amount per installment', nameUrdu: 'فی قسط مقررہ رقم' }
        ]}
        example={[
          { labelEn: 'Total Amount', labelUrdu: 'کل رقم', value: 'Rs. 1,00,000' },
          { labelEn: 'Payments', labelUrdu: 'ادائیگیاں', value: '12 monthly installments' },
          { labelEn: 'Start Date', labelUrdu: 'شروع کی تاریخ', value: '1 Jan 2025' },
          { labelEn: 'Payment Amount', labelUrdu: 'ادائیگی کی رقم', value: 'Rs. 8,333/month' },
          { labelEn: 'End Date', labelUrdu: 'آخری تاریخ', value: '1 Dec 2025' },
          { labelEn: 'Duration', labelUrdu: 'مدت', value: '12 months' }
        ]}
        terms={[
          {
            titleEn: 'Payment Frequency',
            titleUrdu: 'ادائیگی کی تعدد',
            descEn: 'Monthly (12/year), Biweekly (26/year), Weekly (52/year). Frequent payments = faster payoff.',
            descUrdu: 'ماہانہ (12/سال)، دو ہفتہ وار (26/سال)، ہفتہ وار (52/سال)۔ بار بار ادائیگیاں = تیز ادائیگی۔'
          },
          {
            titleEn: 'Auto-debit Setup',
            titleUrdu: 'آٹو ڈیبٹ سیٹ اپ',
            descEn: 'Set up automatic payments to never miss a due date. Saves late fees and improves credit.',
            descUrdu: 'کبھی بھی مقررہ تاریخ سے محروم نہ ہونے کے لیے خودکار ادائیگیاں ترتیب دیں۔ لیٹ فیس بچاتا ہے اور کریڈٹ کو بہتر بناتا ہے۔'
          },
          {
            titleEn: 'Early Payment',
            titleUrdu: 'جلد ادائیگی',
            descEn: 'Paying ahead reduces overall cost. Some plans allow flexible extra payments.',
            descUrdu: 'آگے ادا کرنے سے کل لاگت کم ہو جاتی ہے۔ کچھ منصوبے لچکدار اضافی ادائیگیوں کی اجازت دیتے ہیں۔'
          }
        ]}
        note={{
          en: 'This schedule assumes equal payments with no interest. For interest-bearing loans, use EMI or Amortization calculator. Mark due dates in calendar to avoid late fees.',
          urdu: 'یہ شیڈول بغیر سود کے برابر ادائیگیوں کو فرض کرتا ہے۔ سود والے قرضوں کے لیے، EMI یا ایمورٹائزیشن کیلکولیٹر استعمال کریں۔ لیٹ فیس سے بچنے کے لیے کیلنڈر میں مقررہ تاریخیں نشان زد کریں۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            {language === 'en' ? 'Schedule Details' : 'شیڈول کی تفصیلات'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Total Amount (Rs.)' : 'کل رقم (Rs.)'}</label>
              <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Number of Payments' : 'ادائیگیوں کی تعداد'}</label>
              <input type="range" min="2" max="36" value={numberOfPayments}
                onChange={(e) => setNumberOfPayments(parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg" />
              <input type="number" value={numberOfPayments} onChange={(e) => setNumberOfPayments(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Payment Frequency' : 'ادائیگی کی تعدد'}</label>
              <select value={paymentFrequency} onChange={(e) => setPaymentFrequency(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="weekly">{language === 'en' ? 'Weekly' : 'ہفتہ وار'}</option>
                <option value="biweekly">{language === 'en' ? 'Bi-weekly (Every 2 weeks)' : 'دو ہفتہ وار'}</option>
                <option value="monthly">{language === 'en' ? 'Monthly' : 'ماہانہ'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Start Date' : 'شروع کی تاریخ'}</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${formatCurrency(paymentAmount)} × ${numberOfPayments} payments` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Generate Schedule' : 'شیڈول بنائیں'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Per Payment' : 'فی ادائیگی'}</div>
              <div className="text-3xl font-bold">{formatCurrency(paymentAmount)}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Duration' : 'مدت'}</div>
              <div className="text-3xl font-bold">{Math.ceil(totalDuration/30)}</div>
              <div className="text-xs opacity-75">{language === 'en' ? 'months' : 'مہینے'}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4 flex justify-between items-center">
              <span>{language === 'en' ? 'Payment Schedule' : 'ادائیگی کا شیڈول'}</span>
              <Download className="w-4 h-4 cursor-pointer" onClick={() => toast.success('Export feature coming soon!')} />
            </h3>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th className="text-left p-2">#</th>
                    <th className="text-left p-2">{language === 'en' ? 'Date' : 'تاریخ'}</th>
                    <th className="text-right p-2">{language === 'en' ? 'Payment' : 'ادائیگی'}</th>
                    <th className="text-right p-2">{language === 'en' ? 'Balance' : 'بیلنس'}</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((payment, idx) => (
                    <tr key={idx} className="border-b hover:bg-slate-50 dark:hover:bg-slate-700">
                      <td className="p-2">{payment.no}</td>
                      <td className="p-2 text-blue-600">{payment.date}</td>
                      <td className="p-2 text-right font-semibold text-green-600">{formatCurrency(payment.amount)}</td>
                      <td className="p-2 text-right">{formatCurrency(payment.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">
              {language === 'en' ? '📅 Schedule Summary' : '📅 شیڈول کا خلاصہ'}
            </h4>
            <div className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
              <div className="flex justify-between">
                <span>{language === 'en' ? 'First Payment:' : 'پہلی ادائیگی:'}</span>
                <span className="font-bold">{schedule[0]?.date}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Last Payment:' : 'آخری ادائیگی:'}</span>
                <span className="font-bold">{endDate}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Frequency:' : 'تعدد:'}</span>
                <span className="font-bold capitalize">{paymentFrequency}</span>
              </div>
              <div className="flex justify-between">
                <span>{language === 'en' ? 'Total Payments:' : 'کل ادائیگیاں:'}</span>
                <span className="font-bold">{numberOfPayments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScheduleCalculator;