import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2 } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const ValuationCalculator = ({ language, addToHistory, calculatorName }) => {
  const [annualRevenue, setAnnualRevenue] = useState(10000000);
  const [annualProfit, setAnnualProfit] = useState(2000000);
  const [industryMultiple, setIndustryMultiple] = useState(5);
  const [assets, setAssets] = useState(5000000);

  const revenueBasedValuation = annualRevenue * (industryMultiple * 0.5);
  const profitBasedValuation = annualProfit * industryMultiple;
  const averageValuation = (revenueBasedValuation + profitBasedValuation) / 2;
  const peRatio = annualProfit > 0 ? profitBasedValuation / annualProfit : 0;
  const profitMargin = (annualProfit / annualRevenue) * 100;

  const barData = [
    { method: language === 'en' ? 'Revenue-Based' : 'آمدنی پر مبنی', value: revenueBasedValuation },
    { method: language === 'en' ? 'Profit-Based' : 'منافع پر مبنی', value: profitBasedValuation },
    { method: language === 'en' ? 'Average' : 'اوسط', value: averageValuation }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="purple"
        formula="Valuation = Annual Profit × Industry Multiple  OR  Revenue × Multiple"
        variables={[
          { symbol: 'Multiple', nameEn: 'Industry-standard multiplier (3-10x typical)', nameUrdu: 'صنعتی معیاری ضارب (عام طور پر 3-10x)' },
          { symbol: 'P/E Ratio', nameEn: 'Price to Earnings ratio', nameUrdu: 'قیمت سے کمائی کا تناسب' }
        ]}
        example={[
          { labelEn: 'Annual Revenue', labelUrdu: 'سالانہ آمدنی', value: 'Rs. 1 Crore' },
          { labelEn: 'Annual Profit', labelUrdu: 'سالانہ منافع', value: 'Rs. 20 Lakhs (20% margin)' },
          { labelEn: 'Industry Multiple', labelUrdu: 'صنعتی ضارب', value: '5x' },
          { labelEn: 'Profit-Based Valuation', labelUrdu: 'منافع پر مبنی قیمت', value: 'Rs. 1 Crore (20L × 5)' },
          { labelEn: 'Average Valuation', labelUrdu: 'اوسط قیمت', value: 'Rs. 87.5 Lakhs' }
        ]}
        terms={[
          {
            titleEn: 'Industry Multiples',
            titleUrdu: 'صنعتی ضارب',
            descEn: 'SaaS: 5-10x, E-commerce: 2-5x, Manufacturing: 3-7x, Services: 3-5x.',
            descUrdu: 'ساس: 5-10x، ای کامرس: 2-5x، مینوفیکچرنگ: 3-7x، خدمات: 3-5x۔'
          },
          {
            titleEn: 'When to Value',
            titleUrdu: 'کب قیمت لگائیں',
            descEn: 'Selling business, raising investment, partnership buyout, M&A discussions.',
            descUrdu: 'کاروبار فروخت، سرمایہ اٹھانا، شراکت داری خریداری، ایم اینڈ اے بات چیت۔'
          },
          {
            titleEn: 'Professional Valuation',
            titleUrdu: 'پیشہ ورانہ قیمت',
            descEn: 'For serious deals, hire professional valuers. This is estimation only.',
            descUrdu: 'سنجیدہ سودوں کے لیے، پیشہ ور قیمت لگانے والوں کو ملازمت دیں۔ یہ صرف تخمینہ ہے۔'
          }
        ]}
        note={{
          en: 'Valuations vary widely. Actual value depends on growth rate, market position, assets, team, IP, and buyer motivation.',
          urdu: 'قیمتیں بہت مختلف ہوتی ہیں۔ اصل قیمت اضافے کی شرح، مارکیٹ کی پوزیشن، اثاثے، ٹیم، آئی پی، اور خریدار کی حوصلہ افزائی پر منحصر ہے۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            {language === 'en' ? 'Business Metrics' : 'کاروبار کی میٹرکس'}</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Annual Revenue (Rs.)' : 'سالانہ آمدنی (Rs.)'}</label>
              <input type="number" value={annualRevenue} onChange={(e) => setAnnualRevenue(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Annual Profit (Rs.)' : 'سالانہ منافع (Rs.)'}</label>
              <input type="number" value={annualProfit} onChange={(e) => setAnnualProfit(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Industry Multiple (x)' : 'صنعتی ضارب (x)'}</label>
              <input type="range" min="1" max="15" step="0.5" value={industryMultiple}
                onChange={(e) => setIndustryMultiple(parseFloat(e.target.value))}
                className="w-full h-2 bg-purple-100 dark:bg-purple-900 rounded-lg" />
              <input type="number" value={industryMultiple} step="0.5" onChange={(e) => setIndustryMultiple(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <button onClick={() => {
              addToHistory({ calculatorName, result: `${formatCurrency(averageValuation)} Valuation` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Valuation' : 'قیمت کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-8 text-white text-center">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Estimated Valuation' : 'تخمینی قیمت'}</div>
            <div className="text-4xl font-bold mb-4">{formatCurrency(averageValuation)}</div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-white/20 rounded-lg p-2">
                <div className="opacity-75 text-xs">{language === 'en' ? 'P/E Ratio' : 'پی/ای تناسب'}</div>
                <div className="font-bold">{peRatio.toFixed(1)}x</div>
              </div>
              <div className="bg-white/20 rounded-lg p-2">
                <div className="opacity-75 text-xs">{language === 'en' ? 'Profit Margin' : 'منافع مارجن'}</div>
                <div className="font-bold">{profitMargin.toFixed(1)}%</div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Valuation Methods' : 'قیمت کے طریقے'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="method" fontSize={11} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="value" fill="#8B5CF6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationCalculator;