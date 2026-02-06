import React, { useState } from 'react';
import { FileText, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const InsuranceClaimCalculator = ({ language, addToHistory, calculatorName }) => {
  const [claimType, setClaimType] = useState('health'); // health, vehicle, life
  const [billAmount, setBillAmount] = useState(100000);
  const [sumInsured, setSumInsured] = useState(500000);
  const [deductible, setDeductible] = useState(0);
  const [copay, setCopay] = useState(10);
  const [sublimits, setSublimits] = useState(false);
  const [sublimitAmount, setSublimitAmount] = useState(50000);

  // Calculate claimable amount
  let eligibleAmount = billAmount;

  // Apply sublimits if applicable
  if (sublimits && claimType === 'health') {
    eligibleAmount = Math.min(eligibleAmount, sublimitAmount);
  }

  // Apply sum insured limit
  eligibleAmount = Math.min(eligibleAmount, sumInsured);

  // Apply deductible
  const afterDeductible = Math.max(0, eligibleAmount - deductible);

  // Apply copay
  const copayAmount = afterDeductible * (copay / 100);
  const finalClaimAmount = afterDeductible - copayAmount;

  const rejectedAmount = billAmount - eligibleAmount;
  const yourPayment = deductible + copayAmount + rejectedAmount;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="blue"
        formula="Claim Paid = (Min(Bill, Sum Insured, Sublimit) - Deductible) × (1 - Copay%)"
        variables={[
          { symbol: 'Deductible', nameEn: 'Amount you pay before insurance kicks in', nameUrdu: 'رقم جو آپ انشورنس شروع ہونے سے پہلے ادا کرتے ہیں' },
          { symbol: 'Copay', nameEn: '% of bill you pay (typically 10-20%)', nameUrdu: 'بل کا % جو آپ ادا کرتے ہیں (عام طور پر 10-20%)' },
          { symbol: 'Sublimit', nameEn: 'Max coverage for specific items (room rent, etc)', nameUrdu: 'مخصوص اشیاء کے لیے زیادہ سے زیادہ کوریج (کمرے کا کرایہ وغیرہ)' }
        ]}
        example={[
          { labelEn: 'Hospital Bill', labelUrdu: 'ہسپتال کا بل', value: 'Rs. 1,00,000' },
          { labelEn: 'Sum Insured', labelUrdu: 'انشورڈ رقم', value: 'Rs. 5,00,000' },
          { labelEn: 'Deductible', labelUrdu: 'ڈیڈکٹیبل', value: 'Rs. 0' },
          { labelEn: 'Copay', labelUrdu: 'کو پے', value: '10%' },
          { labelEn: 'Insurance Pays', labelUrdu: 'انشورنس ادا کرتا ہے', value: 'Rs. 90,000' },
          { labelEn: 'You Pay', labelUrdu: 'آپ ادا کرتے ہیں', value: 'Rs. 10,000' }
        ]}
        terms={[
          {
            titleEn: 'Deductible',
            titleUrdu: 'ڈیڈکٹیبل',
            descEn: 'Fixed amount you pay first. Rs. 5,000 deductible means first Rs. 5,000 is on you.',
            descUrdu: 'مقررہ رقم جو آپ پہلے ادا کرتے ہیں۔ Rs. 5,000 ڈیڈکٹیبل کا مطلب پہلے Rs. 5,000 آپ پر ہے۔'
          },
          {
            titleEn: 'Copayment',
            titleUrdu: 'کو پیمنٹ',
            descEn: '% you share after deductible. 20% copay = you pay 20%, insurance pays 80%.',
            descUrdu: 'ڈیڈکٹیبل کے بعد % جو آپ شیئر کرتے ہیں۔ 20% کو پے = آپ 20% ادا کرتے ہیں، انشورنس 80% ادا کرتا ہے۔'
          },
          {
            titleEn: 'Claim Settlement',
            titleUrdu: 'دعویٰ کی تصفیہ',
            descEn: 'Cashless: Direct settlement. Reimbursement: You pay, then claim. Keep all documents!',
            descUrdu: 'کیش لیس: براہ راست تصفیہ۔ واپسی: آپ ادا کریں، پھر دعویٰ کریں۔ تمام دستاویزات رکھیں!'
          }
        ]}
        note={{
          en: 'This shows typical claim calculation. Actual settlement depends on policy terms, network hospital, medical necessity, and documentation. Always read policy document carefully. File claims within time limit (usually 30 days).',
          urdu: 'یہ عام دعویٰ کا حساب دکھاتا ہے۔ اصل تصفیہ پالیسی کی شرائط، نیٹ ورک ہسپتال، طبی ضرورت، اور دستاویزات پر منحصر ہے۔ ہمیشہ پالیسی کی دستاویز کو احتیاط سے پڑھیں۔ وقت کی حد میں دعوے داخل کریں (عام طور پر 30 دن)۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            {language === 'en' ? 'Claim Details' : 'دعویٰ کی تفصیلات'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Claim Type' : 'دعویٰ کی قسم'}</label>
              <select value={claimType} onChange={(e) => setClaimType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="health">{language === 'en' ? 'Health Insurance' : 'ہیلتھ انشورنس'}</option>
                <option value="vehicle">{language === 'en' ? 'Vehicle Insurance' : 'گاڑی کی انشورنس'}</option>
                <option value="life">{language === 'en' ? 'Life Insurance' : 'لائف انشورنس'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Bill/Claim Amount (Rs.)' : 'بل/دعویٰ کی رقم (Rs.)'}</label>
              <input type="range" min="10000" max="1000000" step="10000" value={billAmount}
                onChange={(e) => setBillAmount(parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg" />
              <input type="number" value={billAmount} onChange={(e) => setBillAmount(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Sum Insured (Rs.)' : 'انشورڈ رقم (Rs.)'}</label>
              <input type="number" value={sumInsured} onChange={(e) => setSumInsured(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Deductible (Rs.)' : 'ڈیڈکٹیبل (Rs.)'}</label>
              <input type="number" value={deductible} onChange={(e) => setDeductible(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Copay (%)' : 'کو پے (%)'}</label>
              <input type="range" min="0" max="30" step="5" value={copay} onChange={(e) => setCopay(parseFloat(e.target.value))}
                className="w-full h-2 bg-orange-100 dark:bg-orange-900 rounded-lg" />
              <input type="number" value={copay} onChange={(e) => setCopay(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" checked={sublimits} onChange={(e) => setSublimits(e.target.checked)}
                className="w-5 h-5 accent-blue-600" />
              <label className="text-sm font-semibold">{language === 'en' ? 'Sublimit Applies' : 'سب لمٹ لاگو ہوتا ہے'}</label>
            </div>

            {sublimits && (
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Sublimit Amount (Rs.)' : 'سب لمٹ رقم (Rs.)'}</label>
                <input type="number" value={sublimitAmount} onChange={(e) => setSublimitAmount(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
                <p className="text-xs text-slate-500 mt-1">{language === 'en' ? 'Room rent, specific treatments' : 'کمرے کا کرایہ، مخصوص علاج'}</p>
              </div>
            )}

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${formatCurrency(finalClaimAmount)} Claim Amount` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Claim' : 'دعویٰ کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                {language === 'en' ? 'Insurance Pays' : 'انشورنس ادا کرتا ہے'}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(finalClaimAmount)}</div>
              <div className="text-xs opacity-75 mt-1">{((finalClaimAmount / billAmount) * 100).toFixed(1)}% {language === 'en' ? 'of bill' : 'بل کا'}</div>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                {language === 'en' ? 'You Pay' : 'آپ ادا کرتے ہیں'}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(yourPayment)}</div>
              <div className="text-xs opacity-75 mt-1">{((yourPayment / billAmount) * 100).toFixed(1)}% {language === 'en' ? 'of bill' : 'بل کا'}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Claim Breakdown' : 'دعویٰ کی تفصیل'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Total Bill Amount' : 'کل بل کی رقم'}</span>
                <span className="font-bold">{formatCurrency(billAmount)}</span>
              </div>
              {rejectedAmount > 0 && (
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-sm">{language === 'en' ? 'Rejected (Exceeds limits)' : 'مسترد (حد سے زیادہ)'}</span>
                  <span className="font-bold text-red-600">- {formatCurrency(rejectedAmount)}</span>
                </div>
              )}
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Eligible Amount' : 'اہل رقم'}</span>
                <span className="font-bold">{formatCurrency(eligibleAmount)}</span>
              </div>
              {deductible > 0 && (
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-sm">{language === 'en' ? 'Deductible (You Pay)' : 'ڈیڈکٹیبل (آپ ادا کریں)'}</span>
                  <span className="font-bold text-orange-600">- {formatCurrency(deductible)}</span>
                </div>
              )}
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'After Deductible' : 'ڈیڈکٹیبل کے بعد'}</span>
                <span className="font-bold">{formatCurrency(afterDeductible)}</span>
              </div>
              {copay > 0 && (
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-sm">{language === 'en' ? `Copay ${copay}% (You Pay)` : `کو پے ${copay}% (آپ ادا کریں)`}</span>
                  <span className="font-bold text-orange-600">- {formatCurrency(copayAmount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Insurance Pays' : 'انشورنس ادا کرتا ہے'}</span>
                <span className="font-bold text-xl text-green-600">{formatCurrency(finalClaimAmount)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Your Out-of-Pocket' : 'آپ کی جیب سے'}</h3>
            <div className="space-y-3">
              {deductible > 0 && (
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-sm">{language === 'en' ? 'Deductible' : 'ڈیڈکٹیبل'}</span>
                  <span className="font-bold text-orange-600">{formatCurrency(deductible)}</span>
                </div>
              )}
              {copayAmount > 0 && (
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-sm">{language === 'en' ? 'Copay Amount' : 'کو پے کی رقم'}</span>
                  <span className="font-bold text-orange-600">{formatCurrency(copayAmount)}</span>
                </div>
              )}
              {rejectedAmount > 0 && (
                <div className="flex justify-between pb-2 border-b">
                  <span className="text-sm">{language === 'en' ? 'Rejected Amount' : 'مسترد رقم'}</span>
                  <span className="font-bold text-red-600">{formatCurrency(rejectedAmount)}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Total You Pay' : 'کل آپ ادا کریں'}</span>
                <span className="font-bold text-xl text-red-600">{formatCurrency(yourPayment)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">
              {language === 'en' ? '📋 Documents Required' : '📋 مطلوبہ دستاویزات'}
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>✓ {language === 'en' ? 'Claim form (duly filled)' : 'دعویٰ کا فارم (مکمل بھرا ہوا)'}</li>
              <li>✓ {language === 'en' ? 'Original bills and receipts' : 'اصل بل اور رسیدیں'}</li>
              <li>✓ {language === 'en' ? 'Medical reports and prescriptions' : 'طبی رپورٹیں اور نسخے'}</li>
              <li>✓ {language === 'en' ? 'Discharge summary (hospitalization)' : 'ڈسچارج سمری (ہسپتال میں داخلہ)'}</li>
              <li>✓ {language === 'en' ? 'Policy copy and ID proof' : 'پالیسی کی کاپی اور شناختی ثبوت'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceClaimCalculator;