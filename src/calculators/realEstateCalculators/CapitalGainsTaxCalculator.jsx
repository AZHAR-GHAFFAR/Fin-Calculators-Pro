import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const CapitalGainsTaxCalculator = ({ language, addToHistory, calculatorName }) => {
  const [purchasePrice, setPurchasePrice] = useState(10000000);
  const [salePrice, setSalePrice] = useState(15000000);
  const [holdingYears, setHoldingYears] = useState(3);
  const [improvements, setImprovements] = useState(500000);

  const capitalGain = salePrice - purchasePrice - improvements;
  const taxRate = holdingYears < 1 ? 15 : holdingYears < 2 ? 12.5 : holdingYears < 3 ? 10 : holdingYears < 4 ? 7.5 : 0;
  const taxAmount = (capitalGain * taxRate) / 100;
  const netProfit = capitalGain - taxAmount;

  return (
    <div className="space-y-6">
      <InfoPanel language={language} colorScheme="red"
        formula="Capital Gain = Sale Price − Purchase Price − Improvements | Tax = Gain × Rate%"
        variables={[
          { symbol: 'Gain', nameEn: 'Profit from property sale', nameUrdu: 'پراپرٹی فروخت سے منافع' },
          { symbol: 'Rate', nameEn: 'Tax % based on holding period (FBR)', nameUrdu: 'رکھنے کی مدت کی بنیاد پر ٹیکس % (FBR)' }
        ]}
        example={[
          { labelEn: 'Purchase', labelUrdu: 'خریداری', value: 'Rs. 1 Cr (2021)' },
          { labelEn: 'Sale', labelUrdu: 'فروخت', value: 'Rs. 1.5 Cr (2024)' },
          { labelEn: 'Gain', labelUrdu: 'منافع', value: 'Rs. 50 Lakh' },
          { labelEn: 'Tax (3 yr)', labelUrdu: 'ٹیکس (3 سال)', value: 'Rs. 5 Lakh (10%)' }
        ]}
        terms={[
          { titleEn: 'Holding Period', titleUrdu: 'رکھنے کی مدت', descEn: '<1yr: 15% | 1-2yr: 12.5% | 2-3yr: 10% | 3-4yr: 7.5% | 4+yr: 0% (Pakistan FBR)', descUrdu: '<1 سال: 15% | 1-2 سال: 12.5% | 2-3 سال: 10% | 3-4 سال: 7.5% | 4+ سال: 0% (پاکستان FBR)' },
          { titleEn: 'Exemptions', titleUrdu: 'استثنیٰ', descEn: 'No tax after 4 years. One-time exemption for personal residence.', descUrdu: '4 سال کے بعد کوئی ٹیکس نہیں۔ ذاتی رہائش کے لیے ایک بار استثنیٰ۔' },
          { titleEn: 'Improvements', titleUrdu: 'بہتری', descEn: 'Add renovation/construction costs to reduce taxable gain.', descUrdu: 'قابل ٹیکس منافع کم کرنے کے لیے تزئین و آرائش/تعمیر لاگت شامل کریں۔' }
        ]}
        note={{ en: 'Hold 4+ years for 0% tax. Keep renovation receipts. Consult tax advisor.', urdu: '0% ٹیکس کے لیے 4+ سال رکھیں۔ تزئین کی رسیدیں رکھیں۔ ٹیکس مشیر سے مشورہ کریں۔' }}
      />

      <div className="max-w-4xl mx-auto space-y-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { lbl: { en: 'Capital Gain', ur: 'کیپٹل منافع' }, val: formatCurrency(capitalGain), c: 'from-blue-500 to-cyan-600' },
            { lbl: { en: 'Tax Rate', ur: 'ٹیکس شرح' }, val: `${taxRate}%`, c: 'from-red-500 to-orange-600' },
            { lbl: { en: 'Tax Amount', ur: 'ٹیکس رقم' }, val: formatCurrency(taxAmount), c: 'from-amber-500 to-yellow-600' },
            { lbl: { en: 'Net Profit', ur: 'خالص منافع' }, val: formatCurrency(netProfit), c: 'from-emerald-500 to-green-600' }
          ].map((c, i) => (
            <div key={i} className={`bg-gradient-to-br ${c.c} rounded-2xl p-5 text-white`}>
              <div className="text-xs opacity-80 mb-1">{language === 'en' ? c.lbl.en : c.lbl.ur}</div>
              <div className="text-2xl font-bold">{c.val}</div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-4">{language === 'en' ? 'Transaction Details' : 'لین دین کی تفصیلات'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Purchase Price (Rs.)' : 'خریداری قیمت (Rs.)'}</label>
              <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Sale Price (Rs.)' : 'فروخت قیمت (Rs.)'}</label>
              <input type="number" value={salePrice} onChange={e => setSalePrice(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Holding Years' : 'رکھنے کے سال'}</label>
              <input type="number" value={holdingYears} onChange={e => setHoldingYears(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Improvements (Rs.)' : 'بہتری (Rs.)'}</label>
              <input type="number" value={improvements} onChange={e => setImprovements(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" /></div>
          </div>

          <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
            <h4 className="font-bold text-sm mb-3">{language === 'en' ? 'Tax Calculation' : 'ٹیکس کا حساب'}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>{language === 'en' ? 'Sale Price' : 'فروخت قیمت'}</span><span className="font-bold">{formatCurrency(salePrice)}</span></div>
              <div className="flex justify-between"><span>{language === 'en' ? 'Purchase Price' : 'خریداری قیمت'}</span><span className="font-bold">−{formatCurrency(purchasePrice)}</span></div>
              <div className="flex justify-between"><span>{language === 'en' ? 'Improvements' : 'بہتری'}</span><span className="font-bold">−{formatCurrency(improvements)}</span></div>
              <div className="flex justify-between pt-2 border-t"><span className="font-bold">{language === 'en' ? 'Capital Gain' : 'کیپٹل منافع'}</span><span className="font-bold text-blue-600">{formatCurrency(capitalGain)}</span></div>
              <div className="flex justify-between"><span>{language === 'en' ? `Tax @ ${taxRate}%` : `ٹیکس @ ${taxRate}%`}</span><span className="font-bold text-red-600">−{formatCurrency(taxAmount)}</span></div>
              <div className="flex justify-between pt-2 border-t font-bold text-lg"><span>{language === 'en' ? 'Net Profit' : 'خالص منافع'}</span><span className="text-green-600">{formatCurrency(netProfit)}</span></div>
            </div>
          </div>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `Tax: ${formatCurrency(taxAmount)} (${taxRate}%), Net: ${formatCurrency(netProfit)}` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Tax Calculation' : 'ٹیکس حساب محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default CapitalGainsTaxCalculator;