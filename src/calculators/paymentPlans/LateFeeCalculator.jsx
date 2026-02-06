import React, { useState } from 'react';
import { AlertCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const LateFeeCalculator = ({ language, addToHistory, calculatorName }) => {
  const [billAmount, setBillAmount] = useState(5000);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentDate, setPaymentDate] = useState(new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0]);
  const [lateFeeType, setLateFeeType] = useState('percentage'); // percentage, fixed, daily
  const [lateFeeValue, setLateFeeValue] = useState(5);
  const [gracePeriod, setGracePeriod] = useState(3);

  // Calculate days late
  const due = new Date(dueDate);
  const payment = new Date(paymentDate);
  const daysLate = Math.max(0, Math.ceil((payment - due) / (1000 * 60 * 60 * 24)));
  const daysAfterGrace = Math.max(0, daysLate - gracePeriod);

  // Calculate late fee
  let lateFee = 0;
  if (daysAfterGrace > 0) {
    if (lateFeeType === 'percentage') {
      lateFee = (billAmount * lateFeeValue) / 100;
    } else if (lateFeeType === 'fixed') {
      lateFee = lateFeeValue;
    } else if (lateFeeType === 'daily') {
      lateFee = lateFeeValue * daysAfterGrace;
    }
  }

  const totalPayable = billAmount + lateFee;
  const effectiveIncrease = (lateFee / billAmount) * 100;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="red"
        formula="Late Fee = Bill Amount × Late Fee % (or Fixed Amount or Daily Rate × Days)"
        variables={[
          { symbol: 'Days Late', nameEn: 'Payment Date - Due Date', nameUrdu: 'ادائیگی کی تاریخ - مقررہ تاریخ' },
          { symbol: 'Grace Period', nameEn: 'Days allowed without penalty (typically 3-7)', nameUrdu: 'سزا کے بغیر دن کی اجازت (عام طور پر 3-7)' },
          { symbol: 'Late Fee Type', nameEn: 'Percentage, Fixed, or Daily', nameUrdu: 'فیصد، مقررہ، یا روزانہ' }
        ]}
        example={[
          { labelEn: 'Bill Amount', labelUrdu: 'بل کی رقم', value: 'Rs. 5,000' },
          { labelEn: 'Due Date', labelUrdu: 'مقررہ تاریخ', value: '1 Jan 2025' },
          { labelEn: 'Payment Date', labelUrdu: 'ادائیگی کی تاریخ', value: '8 Jan 2025 (7 days late)' },
          { labelEn: 'Grace Period', labelUrdu: 'مہلت کی مدت', value: '3 days' },
          { labelEn: 'Late Fee', labelUrdu: 'لیٹ فیس', value: '5% = Rs. 250' },
          { labelEn: 'Total Payable', labelUrdu: 'کل ادائیگی', value: 'Rs. 5,250' }
        ]}
        terms={[
          {
            titleEn: 'Grace Period',
            titleUrdu: 'مہلت کی مدت',
            descEn: 'Buffer days before late fees apply. Credit cards: 0-3 days. Loans: 3-7 days typical.',
            descUrdu: 'لیٹ فیس لاگو ہونے سے پہلے بفر دن۔ کریڈٹ کارڈز: 0-3 دن۔ قرضے: عام طور پر 3-7 دن۔'
          },
          {
            titleEn: 'Impact on Credit Score',
            titleUrdu: 'کریڈٹ سکور پر اثر',
            descEn: 'Payment 30+ days late severely damages credit (drops 50-100 points). Avoid at all costs!',
            descUrdu: 'ادائیگی میں 30+ دن کی تاخیر کریڈٹ کو شدید نقصان پہنچاتی ہے (50-100 پوائنٹس گرتے ہیں)۔ ہر قیمت پر بچیں!'
          },
          {
            titleEn: 'Compounding Late Fees',
            titleUrdu: 'بڑھتی لیٹ فیس',
            descEn: 'Some lenders charge late fee on late fee. Can spiral quickly. Pay ASAP to stop compounding.',
            descUrdu: 'کچھ قرض دہندگان لیٹ فیس پر لیٹ فیس وصول کرتے ہیں۔ جلدی بڑھ سکتی ہے۔ بڑھنا بند کرنے کے لیے جلد از جلد ادا کریں۔'
          }
        ]}
        note={{
          en: 'Late fees vary by lender and product type. Credit cards: 5-10% of bill. Loans: Rs. 500-2,000 fixed. Always read the fine print. Set payment reminders to avoid late fees.',
          urdu: 'لیٹ فیس قرض دہندہ اور مصنوع کی قسم کے مطابق مختلف ہوتی ہے۔ کریڈٹ کارڈز: بل کا 5-10%۔ قرضے: 500-2,000 روپے مقررہ۔ ہمیشہ چھوٹے حروف پڑھیں۔ لیٹ فیس سے بچنے کے لیے ادائیگی کی یاد دہانیاں ترتیب دیں۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-red-600" />
            {language === 'en' ? 'Payment Details' : 'ادائیگی کی تفصیلات'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Bill Amount (Rs.)' : 'بل کی رقم (Rs.)'}</label>
              <input type="number" value={billAmount} onChange={(e) => setBillAmount(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Due Date' : 'مقررہ تاریخ'}</label>
              <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Payment Date' : 'ادائیگی کی تاریخ'}</label>
              <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Grace Period (Days)' : 'مہلت کی مدت (دن)'}</label>
              <input type="number" min="0" max="15" value={gracePeriod} onChange={(e) => setGracePeriod(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Late Fee Type' : 'لیٹ فیس کی قسم'}</label>
              <select value={lateFeeType} onChange={(e) => setLateFeeType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="percentage">{language === 'en' ? 'Percentage of Bill' : 'بل کا فیصد'}</option>
                <option value="fixed">{language === 'en' ? 'Fixed Amount' : 'مقررہ رقم'}</option>
                <option value="daily">{language === 'en' ? 'Daily Rate' : 'روزانہ کی شرح'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {lateFeeType === 'percentage' 
                  ? (language === 'en' ? 'Late Fee (%)' : 'لیٹ فیس (%)')
                  : lateFeeType === 'fixed'
                  ? (language === 'en' ? 'Late Fee (Rs.)' : 'لیٹ فیس (Rs.)')
                  : (language === 'en' ? 'Daily Rate (Rs.)' : 'روزانہ کی شرح (Rs.)')
                }
              </label>
              <input type="number" value={lateFeeValue} onChange={(e) => setLateFeeValue(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${formatCurrency(lateFee)} late fee (${daysLate} days late)` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Fee' : 'فیس کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className={`bg-gradient-to-br ${daysLate > 0 ? 'from-red-500 to-orange-600' : 'from-green-500 to-emerald-600'} rounded-2xl p-6 text-white`}>
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Days Late' : 'دن دیر'}</div>
              <div className="text-5xl font-bold">{daysLate}</div>
              <div className="text-xs opacity-75 mt-1">
                {daysLate === 0 ? (language === 'en' ? 'On time!' : 'وقت پر!') : (language === 'en' ? 'days overdue' : 'دن زائد')}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Late Fee' : 'لیٹ فیس'}</div>
              <div className="text-3xl font-bold">{formatCurrency(lateFee)}</div>
              <div className="text-xs opacity-75 mt-1">
                {effectiveIncrease.toFixed(2)}% {language === 'en' ? 'extra' : 'اضافی'}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Payment Calculation' : 'ادائیگی کا حساب'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Original Bill' : 'اصل بل'}</span>
                <span className="font-bold">{formatCurrency(billAmount)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Days Late' : 'دن دیر'}</span>
                <span className="font-bold text-orange-600">{daysLate} {language === 'en' ? 'days' : 'دن'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Grace Period' : 'مہلت کی مدت'}</span>
                <span className="font-bold text-green-600">- {gracePeriod} {language === 'en' ? 'days' : 'دن'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Chargeable Days' : 'چارج ہونے والے دن'}</span>
                <span className="font-bold">{daysAfterGrace} {language === 'en' ? 'days' : 'دن'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Late Fee' : 'لیٹ فیس'}</span>
                <span className="font-bold text-red-600">+ {formatCurrency(lateFee)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Total Payable' : 'کل ادائیگی'}</span>
                <span className="font-bold text-xl text-red-600">{formatCurrency(totalPayable)}</span>
              </div>
            </div>
          </div>

          {daysLate > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h4 className="font-bold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                {language === 'en' ? '⚠️ Late Payment Alert' : '⚠️ تاخیری ادائیگی انتباہ'}
              </h4>
              <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                <li>• {language === 'en' ? `You are ${daysLate} days late on this payment` : `آپ اس ادائیگی میں ${daysLate} دن دیر سے ہیں`}</li>
                <li>• {language === 'en' ? `Late fee: ${formatCurrency(lateFee)} has been added` : `لیٹ فیس: ${formatCurrency(lateFee)} شامل کی گئی ہے`}</li>
                {daysLate >= 30 && (
                  <li className="font-bold">• {language === 'en' ? 'WARNING: 30+ days late will damage your credit score!' : 'انتباہ: 30+ دن کی تاخیر آپ کے کریڈٹ سکور کو نقصان پہنچائے گی!'}</li>
                )}
                <li>• {language === 'en' ? 'Pay immediately to avoid further penalties' : 'مزید سزاؤں سے بچنے کے لیے فوری طور پر ادا کریں'}</li>
              </ul>
            </div>
          )}

          {daysLate === 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">
                {language === 'en' ? '✅ Payment On Time' : '✅ وقت پر ادائیگی'}
              </h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                {language === 'en'
                  ? 'Great! Your payment is on time. No late fees applicable. Keep up the good payment habits!'
                  : 'بہترین! آپ کی ادائیگی وقت پر ہے۔ کوئی لیٹ فیس قابل اطلاق نہیں۔ اچھی ادائیگی کی عادات برقرار رکھیں!'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LateFeeCalculator;