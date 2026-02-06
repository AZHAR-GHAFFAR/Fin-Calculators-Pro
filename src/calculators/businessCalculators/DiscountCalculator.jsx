import React, { useState } from 'react';
import { Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const DiscountCalculator = ({ language, addToHistory, calculatorName }) => {
  const [originalPrice, setOriginalPrice] = useState(10000);
  const [discountPercent, setDiscountPercent] = useState(20);
  
  const discountAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountAmount;
  const savings = discountAmount;
  const markupToOriginal = ((originalPrice - finalPrice) / finalPrice) * 100;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="red"
        formula="Discount Amount = Original Price × (Discount % / 100)  |  Final Price = Original - Discount"
        variables={[
          { symbol: 'Original Price', nameEn: 'Price before discount', nameUrdu: 'رعایت سے پہلے قیمت' },
          { symbol: 'Discount %', nameEn: 'Percentage off', nameUrdu: 'فیصد رعایت' },
          { symbol: 'Final Price', nameEn: 'Price after discount', nameUrdu: 'رعایت کے بعد قیمت' }
        ]}
        example={[
          { labelEn: 'Original Price', labelUrdu: 'اصل قیمت', value: 'Rs. 10,000' },
          { labelEn: 'Discount', labelUrdu: 'ڈسکاؤنٹ', value: '20%' },
          { labelEn: 'Discount Amount', labelUrdu: 'ڈسکاؤنٹ کی رقم', value: 'Rs. 2,000' },
          { labelEn: 'Final Price', labelUrdu: 'حتمی قیمت', value: 'Rs. 8,000' },
          { labelEn: 'You Save', labelUrdu: 'آپ بچاتے ہیں', value: 'Rs. 2,000 (20%)' }
        ]}
        terms={[
          {
            titleEn: 'Discount vs Markup',
            titleUrdu: 'ڈسکاؤنٹ بمقابلہ مارک اپ',
            descEn: '20% discount ≠ 20% markup to get original. 25% markup needed after 20% discount.',
            descUrdu: '20% ڈسکاؤنٹ ≠ اصل حاصل کرنے کے لیے 20% مارک اپ۔ 20% ڈسکاؤنٹ کے بعد 25% مارک اپ کی ضرورت ہے۔'
          },
          {
            titleEn: 'Common Discounts',
            titleUrdu: 'عام ڈسکاؤنٹس',
            descEn: 'Seasonal: 20-30%, Clearance: 40-70%, Flash Sale: 10-50%, Loyalty: 5-15%.',
            descUrdu: 'موسمی: 20-30%، کلیئرنس: 40-70%، فلیش سیل: 10-50%، وفاداری: 5-15%۔'
          },
          {
            titleEn: 'Psychology',
            titleUrdu: 'نفسیات',
            descEn: 'Rs. 99 feels much cheaper than Rs. 100. 50% off on Rs. 2000 = Rs. 1000 final.',
            descUrdu: 'Rs. 99 Rs. 100 سے بہت سستا محسوس ہوتا ہے۔ Rs. 2000 پر 50% آف = Rs. 1000 حتمی۔'
          }
        ]}
        note={{
          en: 'Always calculate actual savings. "50% off on already reduced prices" might not be 50% off original price!',
          urdu: 'ہمیشہ اصل بچت کا حساب لگائیں۔ "پہلے سے کم قیمتوں پر 50% آف" اصل قیمت سے 50% آف نہیں ہو سکتا!'
        }}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Tag className="w-5 h-5 text-red-600" />
            {language === 'en' ? 'Discount Calculator' : 'ڈسکاؤنٹ کیلکولیٹر'}</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Original Price (Rs.)' : 'اصل قیمت (Rs.)'}</label>
              <input type="range" min="100" max="100000" step="100" value={originalPrice}
                onChange={(e) => setOriginalPrice(parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg" />
              <input type="number" value={originalPrice} onChange={(e) => setOriginalPrice(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Discount (%)' : 'ڈسکاؤنٹ (%)'}</label>
              <input type="range" min="0" max="90" step="1" value={discountPercent}
                onChange={(e) => setDiscountPercent(parseFloat(e.target.value))}
                className="w-full h-2 bg-red-100 dark:bg-red-900 rounded-lg" />
              <input type="number" value={discountPercent} onChange={(e) => setDiscountPercent(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${discountPercent}% off = ${formatCurrency(finalPrice)}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Discount' : 'ڈسکاؤنٹ کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-8 text-white text-center">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Final Price' : 'حتمی قیمت'}</div>
            <div className="text-5xl font-bold mb-4">{formatCurrency(finalPrice)}</div>
            <div className="bg-white/20 rounded-lg p-4">
              <div className="text-xs opacity-75 mb-1">{language === 'en' ? 'You Save' : 'آپ بچاتے ہیں'}</div>
              <div className="text-2xl font-bold">{formatCurrency(savings)}</div>
              <div className="text-sm mt-1">({discountPercent}% {language === 'en' ? 'off' : 'آف'})</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h4 className="font-bold mb-4">{language === 'en' ? 'Breakdown' : 'تفصیل'}</h4>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Original Price' : 'اصل قیمت'}</span>
                <span className="font-bold line-through text-slate-500">{formatCurrency(originalPrice)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Discount Amount' : 'ڈسکاؤنٹ کی رقم'}</span>
                <span className="font-bold text-red-600">- {formatCurrency(discountAmount)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Discount Percentage' : 'ڈسکاؤنٹ فیصد'}</span>
                <span className="font-bold text-orange-600">{discountPercent}%</span>
              </div>
              <div className="flex justify-between pt-2 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Final Price' : 'حتمی قیمت'}</span>
                <span className="font-bold text-xl text-green-600">{formatCurrency(finalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <div className="text-xs font-semibold text-blue-800 dark:text-blue-300 mb-2">
              {language === 'en' ? '💡 Reverse Calculation' : '💡 الٹا حساب'}
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              {language === 'en'
                ? `To get back to ${formatCurrency(originalPrice)}, you need ${markupToOriginal.toFixed(1)}% markup on ${formatCurrency(finalPrice)}.`
                : `${formatCurrency(originalPrice)} واپس حاصل کرنے کے لیے، آپ کو ${formatCurrency(finalPrice)} پر ${markupToOriginal.toFixed(1)}% مارک اپ کی ضرورت ہے۔`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountCalculator;