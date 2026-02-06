import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calculator } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const MarginCalculator = ({ language, addToHistory, calculatorName }) => {
  const [costPrice, setCostPrice] = useState(1000);
  const [sellingPrice, setSellingPrice] = useState(1500);

  const profit = sellingPrice - costPrice;
  const profitMargin = ((profit / sellingPrice) * 100);
  const markup = ((profit / costPrice) * 100);

  const pieData = [
    { name: language === 'en' ? 'Cost' : 'لاگت', value: costPrice, color: '#EF4444' },
    { name: language === 'en' ? 'Profit' : 'منافع', value: Math.max(profit, 0), color: '#10B981' }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="green"
        formula="Profit Margin = (Profit / Selling Price) × 100  |  Markup = (Profit / Cost) × 100"
        variables={[
          { symbol: 'Profit', nameEn: 'Selling Price - Cost Price', nameUrdu: 'فروخت قیمت - لاگت قیمت' },
          { symbol: 'Margin', nameEn: 'Profit as % of selling price', nameUrdu: 'فروخت قیمت کے فیصد کے طور پر منافع' },
          { symbol: 'Markup', nameEn: 'Profit as % of cost price', nameUrdu: 'لاگت قیمت کے فیصد کے طور پر منافع' }
        ]}
        example={[
          { labelEn: 'Cost Price', labelUrdu: 'لاگت قیمت', value: 'Rs. 1,000' },
          { labelEn: 'Selling Price', labelUrdu: 'فروخت قیمت', value: 'Rs. 1,500' },
          { labelEn: 'Profit', labelUrdu: 'منافع', value: 'Rs. 500' },
          { labelEn: 'Profit Margin', labelUrdu: 'منافع مارجن', value: '33.33%' },
          { labelEn: 'Markup', labelUrdu: 'مارک اپ', value: '50%' }
        ]}
        terms={[
          {
            titleEn: 'Margin vs Markup',
            titleUrdu: 'مارجن بمقابلہ مارک اپ',
            descEn: 'Margin = profit % of selling price. Markup = profit % of cost. Margin is always lower!',
            descUrdu: 'مارجن = فروخت قیمت کا منافع %۔ مارک اپ = لاگت کا منافع %۔ مارجن ہمیشہ کم ہوتا ہے!'
          },
          {
            titleEn: 'Healthy Margins',
            titleUrdu: 'صحت مند مارجن',
            descEn: 'Retail: 20-50%. Wholesale: 10-20%. Services: 40-60%. Food: 60-80%.',
            descUrdu: 'ریٹیل: 20-50%۔ ہول سیل: 10-20%۔ سروسز: 40-60%۔ کھانا: 60-80%۔'
          }
        ]}
        note={{
          en: 'Don\'t confuse margin with markup! A 50% markup = 33.33% margin. Use margin for pricing decisions.',
          urdu: 'مارجن کو مارک اپ سے الجھائیں نہیں! 50% مارک اپ = 33.33% مارجن۔ قیمت کے فیصلوں کے لیے مارجن استعمال کریں۔'
        }}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-600" />
            {language === 'en' ? 'Pricing' : 'قیمت'}</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Cost Price (Rs.)' : 'لاگت قیمت (Rs.)'}</label>
              <input type="number" value={costPrice} onChange={(e) => setCostPrice(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Selling Price (Rs.)' : 'فروخت قیمت (Rs.)'}</label>
              <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${profitMargin.toFixed(2)}% Margin` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate' : 'حساب لگائیں'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-1">{language === 'en' ? 'Profit Margin' : 'منافع مارجن'}</div>
              <div className="text-3xl font-bold">{profitMargin.toFixed(2)}%</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-1">{language === 'en' ? 'Markup' : 'مارک اپ'}</div>
              <div className="text-3xl font-bold">{markup.toFixed(2)}%</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Breakdown' : 'تفصیل'}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                  {pieData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <div className="space-y-2">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Profit Amount' : 'منافع کی رقم'}</span>
                <span className="font-bold text-green-600">{formatCurrency(profit)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarginCalculator;