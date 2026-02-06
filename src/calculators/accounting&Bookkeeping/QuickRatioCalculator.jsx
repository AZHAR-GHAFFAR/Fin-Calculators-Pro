import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const QuickRatioCalculator = ({ language, addToHistory, calculatorName }) => {
  const [cash, setCash] = useState(500000);
  const [receivables, setReceivables] = useState(400000);
  const [marketableSecurities, setMarketableSecurities] = useState(100000);
  const [currentLiabilities, setCurrentLiabilities] = useState(800000);

  const quickAssets = cash + receivables + marketableSecurities;
  const quickRatio = quickAssets / currentLiabilities;

  return (
    <div className="space-y-8">
      <InfoPanel language={language} colorScheme="purple"
        formula="Quick Ratio = (Cash + Receivables + Securities) ÷ Current Liabilities"
        variables={[
          { symbol: 'Quick Assets', nameEn: 'Most liquid assets (excludes inventory)', nameUrdu: 'انتہائی لیکوڈ اثاثے (انوینٹری خارج)' },
          { symbol: 'Acid Test', nameEn: 'Can company pay immediate debts?', nameUrdu: 'کیا کمپنی فوری قرضے ادا کر سکتی ہے؟' }
        ]}
        example={[
          { labelEn: 'Cash', labelUrdu: 'نقد', value: 'Rs. 5,00,000' },
          { labelEn: 'Receivables', labelUrdu: 'وصولیاں', value: 'Rs. 4,00,000' },
          { labelEn: 'Quick Assets', labelUrdu: 'فوری اثاثے', value: 'Rs. 10,00,000' },
          { labelEn: 'Quick Ratio', labelUrdu: 'فوری تناسب', value: '1.25:1 (Good)' }
        ]}
        terms={[
          { titleEn: 'Quick Ratio', titleUrdu: 'فوری تناسب', descEn: 'Stricter than current ratio. Excludes inventory. >1: Good. <1: Risk.', descUrdu: 'موجودہ تناسب سے سخت۔ انوینٹری خارج۔ >1: اچھا۔ <1: خطرہ۔' },
          { titleEn: 'Acid Test', titleUrdu: 'تیزاب ٹیسٹ', descEn: 'Tests immediate liquidity. Can debts be paid NOW? Critical for lenders.', descUrdu: 'فوری لیکویڈٹی کی جانچ۔ کیا قرضے اب ادا ہو سکتے ہیں؟ قرض دہندگان کے لیے اہم۔' },
          { titleEn: 'vs Current Ratio', titleUrdy: 'بمقابلہ موجودہ تناسب', descEn: 'Quick ratio more conservative. Better for financial health check. Lower value expected.', descUrdu: 'فوری تناسب زیادہ قدامت پسند۔ مالی صحت کی جانچ کے لیے بہتر۔ کم قیمت متوقع۔' }
        ]}
        note={{ en: 'Quick ratio <1 means company may struggle with immediate obligations. >1 good. >1.5 excellent. Monitor monthly.', urdu: 'فوری تناسب <1 کا مطلب ہے کہ کمپنی فوری ذمہ داریوں میں جدوجہد کر سکتی ہے۔ >1 اچھا۔ >1.5 بہترین۔ ماہانہ نگرانی۔' }}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <div className={`${quickRatio >= 1 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-orange-600'} rounded-2xl p-8 text-white`}>
          <div className="text-sm opacity-90 mb-2 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {language === 'en' ? 'Quick Ratio (Acid Test)' : 'فوری تناسب (تیزاب ٹیسٹ)'}
          </div>
          <div className="text-6xl font-bold">{quickRatio.toFixed(2)}:1</div>
          <div className="text-sm opacity-90 mt-2">
            {quickRatio >= 1.5 ? (language === 'en' ? 'Excellent liquidity' : 'بہترین لیکویڈٹی') :
             quickRatio >= 1 ? (language === 'en' ? 'Good liquidity' : 'اچھی لیکویڈٹی') :
             (language === 'en' ? 'Liquidity risk' : 'لیکویڈٹی خطرہ')}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Quick Assets' : 'فوری اثاثے'}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Cash (Rs.)' : 'نقد (Rs.)'}</label>
              <input type="number" value={cash} onChange={(e) => setCash(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Receivables (Rs.)' : 'وصولیاں (Rs.)'}</label>
              <input type="number" value={receivables} onChange={(e) => setReceivables(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Marketable Securities (Rs.)' : 'مارکیٹ قابل سیکیورٹیز (Rs.)'}</label>
              <input type="number" value={marketableSecurities} onChange={(e) => setMarketableSecurities(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Current Liabilities (Rs.)' : 'موجودہ واجبات (Rs.)'}</label>
              <input type="number" value={currentLiabilities} onChange={(e) => setCurrentLiabilities(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t flex justify-between font-bold text-lg">
            <span>{language === 'en' ? 'Quick Assets' : 'فوری اثاثے'}</span>
            <span className="text-green-600">{formatCurrency(quickAssets)}</span>
          </div>
        </div>

        <button onClick={() => {
          addToHistory({ calculatorName, result: `Quick Ratio: ${quickRatio.toFixed(2)}:1` });
          toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
        }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl">
          {language === 'en' ? 'Calculate' : 'حساب لگائیں'}
        </button>
      </div>
    </div>
  );
};

export default QuickRatioCalculator;