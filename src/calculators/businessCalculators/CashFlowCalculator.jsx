import React, { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const CashFlowCalculator = ({ language, addToHistory, calculatorName }) => {
  const [monthlyInflows, setMonthlyInflows] = useState(500000);
  const [monthlyOutflows, setMonthlyOutflows] = useState(450000);
  const [startingBalance, setStartingBalance] = useState(1000000);

  const netCashFlow = monthlyInflows - monthlyOutflows;
  const endingBalance = startingBalance + netCashFlow;
  const burnRate = monthlyOutflows - monthlyInflows;
  const runway = burnRate > 0 ? Math.floor(startingBalance / burnRate) : Infinity;
  const cashFlowMargin = (netCashFlow / monthlyInflows) * 100;
  const isPositive = netCashFlow >= 0;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="blue"
        formula="Net Cash Flow = Inflows - Outflows  |  Burn Rate = Monthly Cash Spent  |  Runway = Balance / Burn Rate"
        variables={[
          { symbol: 'Inflows', nameEn: 'Money coming in (sales, investments)', nameUrdu: 'آنے والی رقم (فروخت، سرمایہ کاری)' },
          { symbol: 'Outflows', nameEn: 'Money going out (expenses, salaries)', nameUrdu: 'جانے والی رقم (اخراجات، تنخواہیں)' },
          { symbol: 'Runway', nameEn: 'Months until cash runs out', nameUrdu: 'نقدی ختم ہونے تک مہینے' }
        ]}
        example={[
          { labelEn: 'Monthly Inflows', labelUrdu: 'ماہانہ آمد', value: 'Rs. 5,00,000' },
          { labelEn: 'Monthly Outflows', labelUrdu: 'ماہانہ اخراجات', value: 'Rs. 4,50,000' },
          { labelEn: 'Net Cash Flow', labelUrdu: 'خالص نقدی بہاؤ', value: 'Rs. 50,000 (positive)' },
          { labelEn: 'Starting Balance', labelUrdu: 'شروع میں بیلنس', value: 'Rs. 10,00,000' },
          { labelEn: 'Ending Balance', labelUrdu: 'آخر میں بیلنس', value: 'Rs. 10,50,000' }
        ]}
        terms={[
          {
            titleEn: 'Burn Rate',
            titleUrdu: 'برن ریٹ',
            descEn: 'How fast you\'re spending cash. Critical for startups. Reduce to extend runway.',
            descUrdu: 'آپ کتنی تیزی سے نقد خرچ کر رہے ہیں۔ اسٹارٹ اپس کے لیے اہم۔ رن وے بڑھانے کے لیے کم کریں۔'
          },
          {
            titleEn: 'Runway',
            titleUrdu: 'رن وے',
            descEn: 'Months until you run out of money. Minimum 6 months recommended.',
            descUrdu: 'پیسے ختم ہونے تک مہینے۔ کم از کم 6 مہینے تجویز کیے جاتے ہیں۔'
          },
          {
            titleEn: 'Cash is King',
            titleUrdu: 'نقد بادشاہ ہے',
            descEn: 'Profitable on paper but no cash = bankrupt. Monitor cash flow weekly.',
            descUrdu: 'کاغذ پر منافع بخش لیکن کوئی نقد نہیں = دیوالیہ۔ ہفتہ وار نقدی کی نگرانی کریں۔'
          }
        ]}
        note={{
          en: 'Positive cash flow doesn\'t mean profitable (vice versa). Track both. Most businesses fail due to cash flow issues, not lack of profit.',
          urdu: 'مثبت نقدی بہاؤ کا مطلب منافع نہیں (اور اس کے برعکس)۔ دونوں کو ٹریک کریں۔ زیادہ تر کاروبار نقدی کے مسائل کی وجہ سے ناکام ہوتے ہیں، منافع کی کمی کی وجہ سے نہیں۔'
        }}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-6">{language === 'en' ? 'Cash Flow Inputs' : 'نقدی بہاؤ'}</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Monthly Inflows (Rs.)' : 'ماہانہ آمد (Rs.)'}</label>
                <input type="number" value={monthlyInflows} onChange={(e) => setMonthlyInflows(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Monthly Outflows (Rs.)' : 'ماہانہ اخراجات (Rs.)'}</label>
                <input type="number" value={monthlyOutflows} onChange={(e) => setMonthlyOutflows(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Starting Balance (Rs.)' : 'شروعاتی بیلنس (Rs.)'}</label>
                <input type="number" value={startingBalance} onChange={(e) => setStartingBalance(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <button onClick={() => {
                addToHistory({ calculatorName, result: `${formatCurrency(netCashFlow)} Cash Flow` });
                toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
              }}
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold py-3 rounded-xl">
                {language === 'en' ? 'Calculate' : 'حساب لگائیں'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className={`bg-gradient-to-br ${isPositive ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} rounded-2xl p-8 text-white text-center`}>
              {isPositive ? <TrendingUp className="w-12 h-12 mx-auto mb-3" /> : <TrendingDown className="w-12 h-12 mx-auto mb-3" />}
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Net Cash Flow' : 'خالص نقدی بہاؤ'}</div>
              <div className="text-4xl font-bold">{formatCurrency(Math.abs(netCashFlow))}</div>
              <div className="text-sm mt-2">{isPositive ? (language === 'en' ? 'Positive' : 'مثبت') : (language === 'en' ? 'Negative' : 'منفی')}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{language === 'en' ? 'Ending Balance' : 'آخری بیلنس'}</div>
                <div className="text-xl font-bold text-blue-600">{formatCurrency(endingBalance)}</div>
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{language === 'en' ? 'Runway' : 'رن وے'}</div>
                <div className="text-xl font-bold text-purple-600">
                  {runway === Infinity ? '∞' : `${runway} ${language === 'en' ? 'mo' : 'ماہ'}`}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
              <h4 className="font-bold mb-4">{language === 'en' ? 'Summary' : 'خلاصہ'}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between pb-2 border-b">
                  <span>{language === 'en' ? 'Inflows' : 'آمد'}</span>
                  <span className="font-bold text-green-600">{formatCurrency(monthlyInflows)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>{language === 'en' ? 'Outflows' : 'اخراجات'}</span>
                  <span className="font-bold text-red-600">{formatCurrency(monthlyOutflows)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>{language === 'en' ? 'CF Margin' : 'سی ایف مارجن'}</span>
                  <span className="font-bold">{cashFlowMargin.toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!isPositive && burnRate > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">
              ⚠️ {language === 'en' ? 'Negative Cash Flow Alert' : 'منفی نقدی بہاؤ انتباہ'}
            </h4>
            <p className="text-sm text-red-700 dark:text-red-400">
              {language === 'en' 
                ? `You're burning Rs. ${burnRate.toLocaleString()} per month. With current balance, you have ${runway} months runway. Consider: (1) Increase revenue, (2) Reduce expenses, (3) Raise funding.`
                : `آپ ماہانہ Rs. ${burnRate.toLocaleString()} جلا رہے ہیں۔ موجودہ بیلنس کے ساتھ، آپ کے پاس ${runway} مہینے رن وے ہے۔ غور کریں: (1) آمدنی بڑھائیں، (2) اخراجات کم کریں، (3) فنڈنگ اٹھائیں۔`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CashFlowCalculator;