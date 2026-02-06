import React, { useState } from 'react';
import { Calendar, ShoppingCart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const InstallmentPlannerCalculator = ({ language, addToHistory, calculatorName }) => {
  const [productPrice, setProductPrice] = useState(50000);
  const [downPayment, setDownPayment] = useState(10000);
  const [installments, setInstallments] = useState(6);
  const [processingFee, setProcessingFee] = useState(2);
  const [installmentType, setInstallmentType] = useState('equal'); // equal, reducing

  const loanAmount = productPrice - downPayment;
  const processingFeeAmount = (loanAmount * processingFee) / 100;
  const totalFinanced = loanAmount + processingFeeAmount;
  
  let monthlyInstallment, totalPayable;
  
  if (installmentType === 'equal') {
    monthlyInstallment = totalFinanced / installments;
    totalPayable = downPayment + totalFinanced;
  } else {
    // Reducing balance with simple interest (typical for 0% EMI schemes)
    const interestRate = 0.01; // 1% monthly for reducing schemes
    const r = interestRate;
    monthlyInstallment = totalFinanced * r * Math.pow(1 + r, installments) / (Math.pow(1 + r, installments) - 1);
    totalPayable = downPayment + (monthlyInstallment * installments);
  }

  const extraCost = totalPayable - productPrice;
  const effectiveRate = ((extraCost / loanAmount) / (installments / 12)) * 100;

  // Generate installment schedule
  const scheduleData = [];
  for (let i = 1; i <= Math.min(installments, 12); i++) {
    scheduleData.push({
      month: `${language === 'en' ? 'Month' : 'ماہ'} ${i}`,
      amount: monthlyInstallment
    });
  }

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="orange"
        formula="Monthly Installment = (Product Price - Down Payment + Fees) ÷ Number of Installments"
        variables={[
          { symbol: 'Down Payment', nameEn: 'Initial payment (typically 10-20%)', nameUrdu: 'ابتدائی ادائیگی (عام طور پر 10-20%)' },
          { symbol: 'Processing Fee', nameEn: 'Charges for installment facility (1-3%)', nameUrdu: 'قسط کی سہولت کے لیے چارجز (1-3%)' },
          { symbol: 'Installments', nameEn: 'Number of monthly payments', nameUrdu: 'ماہانہ ادائیگیوں کی تعداد' }
        ]}
        example={[
          { labelEn: 'Product Price', labelUrdu: 'مصنوع کی قیمت', value: 'Rs. 50,000 (Mobile/Laptop)' },
          { labelEn: 'Down Payment', labelUrdu: 'ابتدائی ادائیگی', value: 'Rs. 10,000 (20%)' },
          { labelEn: 'Processing Fee', labelUrdu: 'پروسیسنگ فیس', value: '2% = Rs. 800' },
          { labelEn: 'Installments', labelUrdu: 'قسطیں', value: '6 months' },
          { labelEn: 'Monthly Payment', labelUrdu: 'ماہانہ ادائیگی', value: 'Rs. 6,800' },
          { labelEn: 'Total Cost', labelUrdu: 'کل لاگت', value: 'Rs. 50,800' }
        ]}
        terms={[
          {
            titleEn: '0% EMI Reality',
            titleUrdu: '0% EMI حقیقت',
            descEn: 'No hidden interest, but processing fees apply. Product price often higher than cash price.',
            descUrdu: 'کوئی چھپا سود نہیں، لیکن پروسیسنگ فیس لاگو ہوتی ہے۔ مصنوع کی قیمت اکثر نقد قیمت سے زیادہ ہوتی ہے۔'
          },
          {
            titleEn: 'Credit Card EMI',
            titleUrdu: 'کریڈٹ کارڈ EMI',
            descEn: 'Converts purchase to EMI. Interest rates 12-18%. Check if 0% offer is genuine.',
            descUrdu: 'خریداری کو EMI میں تبدیل کرتا ہے۔ سود کی شرحیں 12-18%۔ چیک کریں کہ 0% پیشکش حقیقی ہے۔'
          },
          {
            titleEn: 'Down Payment Benefit',
            titleUrdu: 'ڈاؤن پیمنٹ کا فائدہ',
            descEn: 'Higher down payment = Lower monthly burden. Aim for 20-30% to reduce total cost.',
            descUrdu: 'زیادہ ڈاؤن پیمنٹ = کم ماہانہ بوجھ۔ کل لاگت کم کرنے کے لیے 20-30% کا ہدف رکھیں۔'
          }
        ]}
        note={{
          en: 'Compare installment plans with cash price. Sometimes cash discount is better than 0% EMI. Read terms carefully - some charge foreclosure fees.',
          urdu: 'قسط کے منصوبوں کا نقد قیمت سے موازنہ کریں۔ بعض اوقات نقد رعایت 0% EMI سے بہتر ہوتی ہے۔ شرائط کو احتیاط سے پڑھیں - کچھ فورکلوژر فیس وصول کرتے ہیں۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-orange-600" />
            {language === 'en' ? 'Purchase Details' : 'خریداری کی تفصیلات'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Product Price (Rs.)' : 'مصنوع کی قیمت (Rs.)'}</label>
              <input type="range" min="10000" max="500000" step="5000" value={productPrice}
                onChange={(e) => setProductPrice(parseFloat(e.target.value))}
                className="w-full h-2 bg-orange-100 dark:bg-orange-900 rounded-lg" />
              <input type="number" value={productPrice} onChange={(e) => setProductPrice(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Down Payment (Rs.)' : 'ابتدائی ادائیگی (Rs.)'}</label>
              <input type="range" min="0" max={productPrice * 0.5} step="1000" value={downPayment}
                onChange={(e) => setDownPayment(parseFloat(e.target.value))}
                className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg" />
              <input type="number" value={downPayment} onChange={(e) => setDownPayment(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
              <p className="text-xs text-slate-500 mt-1">{((downPayment/productPrice)*100).toFixed(1)}% of price</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Number of Installments' : 'قسطوں کی تعداد'}</label>
              <select value={installments} onChange={(e) => setInstallments(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="3">3 {language === 'en' ? 'months' : 'مہینے'}</option>
                <option value="6">6 {language === 'en' ? 'months' : 'مہینے'}</option>
                <option value="9">9 {language === 'en' ? 'months' : 'مہینے'}</option>
                <option value="12">12 {language === 'en' ? 'months' : 'مہینے'}</option>
                <option value="18">18 {language === 'en' ? 'months' : 'مہینے'}</option>
                <option value="24">24 {language === 'en' ? 'months' : 'مہینے'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Processing Fee (%)' : 'پروسیسنگ فیس (%)'}</label>
              <input type="number" min="0" max="5" step="0.5" value={processingFee}
                onChange={(e) => setProcessingFee(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Installment Type' : 'قسط کی قسم'}</label>
              <select value={installmentType} onChange={(e) => setInstallmentType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="equal">{language === 'en' ? 'Equal Installments (0% EMI)' : 'برابر قسطیں (0% EMI)'}</option>
                <option value="reducing">{language === 'en' ? 'Reducing Balance (Interest)' : 'کم ہوتا بیلنس (سود)'}</option>
              </select>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${formatCurrency(monthlyInstallment)}/month for ${installments} months` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Plan' : 'منصوبہ کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Monthly Payment' : 'ماہانہ ادائیگی'}</div>
              <div className="text-3xl font-bold">{formatCurrency(monthlyInstallment)}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Payable' : 'کل ادائیگی'}</div>
              <div className="text-3xl font-bold">{formatCurrency(totalPayable)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Payment Schedule' : 'ادائیگی کا شیڈول'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={scheduleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={11} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="amount" fill="#F97316" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Cost Breakdown' : 'لاگت کی تفصیل'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Product Price' : 'مصنوع کی قیمت'}</span>
                <span className="font-bold">{formatCurrency(productPrice)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Down Payment' : 'ابتدائی ادائیگی'}</span>
                <span className="font-bold text-green-600">- {formatCurrency(downPayment)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Loan Amount' : 'قرض کی رقم'}</span>
                <span className="font-bold">{formatCurrency(loanAmount)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? `Processing Fee (${processingFee}%)` : `پروسیسنگ فیس (${processingFee}%)`}</span>
                <span className="font-bold text-orange-600">+ {formatCurrency(processingFeeAmount)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Extra Cost' : 'اضافی لاگت'}</span>
                <span className="font-bold text-red-600">{formatCurrency(extraCost)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Total Payable' : 'کل ادائیگی'}</span>
                <span className="font-bold text-xl text-orange-600">{formatCurrency(totalPayable)}</span>
              </div>
            </div>
          </div>

          {effectiveRate > 0 && (
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6">
              <h4 className="font-bold text-orange-800 dark:text-orange-300 mb-2">
                {language === 'en' ? '📊 Effective Cost' : '📊 حقیقی لاگت'}
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-400">
                {language === 'en'
                  ? `Effective interest rate: ${effectiveRate.toFixed(2)}% per annum. Total extra cost: ${formatCurrency(extraCost)} (${((extraCost/productPrice)*100).toFixed(2)}% of price).`
                  : `حقیقی سود کی شرح: ${effectiveRate.toFixed(2)}% فی سال۔ کل اضافی لاگت: ${formatCurrency(extraCost)} (قیمت کا ${((extraCost/productPrice)*100).toFixed(2)}%)۔`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallmentPlannerCalculator;