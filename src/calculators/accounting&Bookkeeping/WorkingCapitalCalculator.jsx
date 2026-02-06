import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const WorkingCapitalCalculator = ({ language, addToHistory, calculatorName }) => {
  const [currentAssets, setCurrentAssets] = useState(2000000);
  const [currentLiabilities, setCurrentLiabilities] = useState(1200000);

  const workingCapital = currentAssets - currentLiabilities;
  const currentRatio = currentAssets / currentLiabilities;
  const workingCapitalRatio = (workingCapital / currentAssets) * 100;

  return (
    <div className="space-y-8">
      <InfoPanel language={language} colorScheme="green"
        formula="Working Capital = Current Assets - Current Liabilities"
        variables={[
          { symbol: 'Current Assets', nameEn: 'Cash, inventory, receivables (<1 year)', nameUrdu: 'نقد، انوینٹری، وصولیاں (<1 سال)' },
          { symbol: 'Current Liabilities', nameEn: 'Payables, short-term loans (<1 year)', nameUrdu: 'ادائیگیاں، قلیل مدتی قرضے (<1 سال)' }
        ]}
        example={[
          { labelEn: 'Current Assets', labelUrdu: 'موجودہ اثاثے', value: 'Rs. 20,00,000' },
          { labelEn: 'Current Liabilities', labelUrdu: 'موجودہ واجبات', value: 'Rs. 12,00,000' },
          { labelEn: 'Working Capital', labelUrdu: 'ورکنگ کیپیٹل', value: 'Rs. 8,00,000' },
          { labelEn: 'Current Ratio', labelUrdu: 'موجودہ تناسب', value: '1.67:1 (Good)' }
        ]}
        terms={[
          { titleEn: 'Working Capital', titleUrdu: 'ورکنگ کیپیٹل', descEn: 'Money for daily operations. Positive = good liquidity. Negative = cash problems.', descUrdu: 'روزانہ آپریشنز کے لیے پیسہ۔ مثبت = اچھی لیکویڈٹی۔ منفی = کیش کے مسائل۔' },
          { titleEn: 'Current Ratio', titleUrdu: 'موجودہ تناسب', descEn: '>1.5: Excellent. 1-1.5: Good. <1: Liquidity risk. Varies by industry.', descUrdu: '>1.5: بہترین۔ 1-1.5: اچھا۔ <1: لیکویڈٹی خطرہ۔ صنعت کے لحاظ سے مختلف۔' },
          { titleEn: 'Importance', titleUrdy: 'اہمیت', descEn: 'Measures ability to pay short-term debts. Critical for survival. Monitor monthly.', descUrdu: 'قلیل مدتی قرضے ادا کرنے کی صلاحیت کی پیمائش۔ بقا کے لیے اہم۔ ماہانہ نگرانی۔' }
        ]}
        note={{ en: 'Positive working capital essential. Too much = inefficient. Too little = risk. Optimize inventory & receivables.', urdu: 'مثبت ورکنگ کیپیٹل ضروری۔ بہت زیادہ = غیر موثر۔ بہت کم = خطرہ۔ انوینٹری اور وصولیاں بہتر بنائیں۔' }}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Current Assets' : 'موجودہ اثاثے'}</div>
            <div className="text-3xl font-bold">{formatCurrency(currentAssets)}</div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Current Liabilities' : 'موجودہ واجبات'}</div>
            <div className="text-3xl font-bold">{formatCurrency(currentLiabilities)}</div>
          </div>

          <div className={`bg-gradient-to-br ${workingCapital >= 0 ? 'from-green-500 to-emerald-600' : 'from-red-500 to-orange-600'} rounded-2xl p-6 text-white`}>
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Working Capital' : 'ورکنگ کیپیٹل'}</div>
            <div className="text-3xl font-bold">{formatCurrency(workingCapital)}</div>
            <div className="text-xs opacity-75 mt-1">{currentRatio.toFixed(2)}:1 ratio</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Inputs' : 'ان پٹس'}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Current Assets (Rs.)' : 'موجودہ اثاثے (Rs.)'}</label>
              <input type="number" value={currentAssets} onChange={(e) => setCurrentAssets(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Current Liabilities (Rs.)' : 'موجودہ واجبات (Rs.)'}</label>
              <input type="number" value={currentLiabilities} onChange={(e) => setCurrentLiabilities(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
          </div>
        </div>

        <button onClick={() => {
          addToHistory({ calculatorName, result: `WC: ${formatCurrency(workingCapital)}, Ratio: ${currentRatio.toFixed(2)}:1` });
          toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
        }}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl">
          {language === 'en' ? 'Calculate' : 'حساب لگائیں'}
        </button>
      </div>
    </div>
  );
};

export default WorkingCapitalCalculator;