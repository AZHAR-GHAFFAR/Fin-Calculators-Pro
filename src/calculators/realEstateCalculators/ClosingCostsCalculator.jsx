import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const ClosingCostsCalculator = ({ language, addToHistory, calculatorName }) => {
  const [propertyPrice, setPropertyPrice] = useState(18000000);
  const [costs, setCosts] = useState({
    stampDuty: 3, // %
    registration: 1, // %
    lawyer: 50000,
    inspection: 25000,
    insurance: 15000,
    valuation: 20000,
    bank: 30000,
    misc: 20000
  });

  const stampDutyAmt = (propertyPrice * costs.stampDuty) / 100;
  const registrationAmt = (propertyPrice * costs.registration) / 100;
  const totalCost = stampDutyAmt + registrationAmt + costs.lawyer + costs.inspection + costs.insurance + costs.valuation + costs.bank + costs.misc;
  const percentOfPrice = (totalCost / propertyPrice) * 100;

  const pieData = [
    { name: language === 'en' ? 'Stamp Duty' : 'سٹامپ ڈیوٹی', value: stampDutyAmt, color: '#EF4444' },
    { name: language === 'en' ? 'Registration' : 'رجسٹریشن', value: registrationAmt, color: '#F59E0B' },
    { name: language === 'en' ? 'Lawyer' : 'وکیل', value: costs.lawyer, color: '#6366F1' },
    { name: language === 'en' ? 'Other' : 'دیگر', value: costs.inspection + costs.insurance + costs.valuation + costs.bank + costs.misc, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-6">
      <InfoPanel language={language} colorScheme="pink"
        formula="Total = Stamp + Registration + Lawyer + Inspection + Insurance + Bank + Misc"
        variables={[
          { symbol: 'Closing Costs', nameEn: 'All fees to complete property purchase', nameUrdu: 'پراپرٹی خریداری مکمل کرنے کی تمام فیس' },
          { symbol: 'Typical', nameEn: '2-5% of property price in Pakistan', nameUrdu: 'پاکستان میں پراپرٹی قیمت کا 2-5%' }
        ]}
        example={[
          { labelEn: 'Property', labelUrdu: 'پراپرٹی', value: 'Rs. 1.8 Cr' },
          { labelEn: 'Stamp Duty 3%', labelUrdu: 'سٹامپ ڈیوٹی 3%', value: 'Rs. 5.4 L' },
          { labelEn: 'Registration 1%', labelUrdu: 'رجسٹریشن 1%', value: 'Rs. 1.8 L' },
          { labelEn: 'Other Fees', labelUrdu: 'دیگر فیس', value: 'Rs. 1.6 L' },
          { labelEn: 'Total Closing', labelUrdu: 'کل اختتامی', value: 'Rs. 8.8 L (4.9%)' }
        ]}
        terms={[
          { titleEn: 'Stamp Duty', titleUrdu: 'سٹامپ ڈیوٹی', descEn: 'Provincial tax. Largest cost. 2-3% of price. Punjab 3%, Sindh 2%.', descUrdu: 'صوبائی ٹیکس۔ سب سے بڑی لاگت۔ قیمت کا 2-3%۔ پنجاب 3%، سندھ 2%۔' },
          { titleEn: 'Hidden Costs', titleUrdu: 'پوشیدہ اخراجات', descEn: 'Society transfer, NOC fees, maintenance deposits. Ask upfront.', descUrdu: 'سوسائٹی منتقلی، NOC فیس، مینٹیننس ڈپازٹ۔ پیشگی پوچھیں۔' },
          { titleEn: 'Budget', titleUrdu: 'بجٹ', descEn: 'Budget 5% of price for all costs. Have cash ready. Negotiable fees: lawyer, agent.', descUrdu: 'تمام اخراجات کے لیے قیمت کا 5% بجٹ۔ نقد تیار رکھیں۔ قابل گفتگو فیس: وکیل، ایجنٹ۔' }
        ]}
        note={{ en: 'Get written quotes. Shop around for lawyer/insurance. Some fees negotiable. Keep all receipts.', urdu: 'تحریری کوٹس حاصل کریں۔ وکیل/انشورنس کے لیے ادھر ادھر دیکھیں۔ کچھ فیس قابل گفتگو۔ تمام رسیدیں رکھیں۔' }}
      />

      <div className="max-w-5xl mx-auto space-y-5">
        <div className={`bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-8 text-white`}>
          <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Closing Costs' : 'کل اختتامی اخراجات'}</div>
          <div className="text-5xl font-bold">{formatCurrency(totalCost)}</div>
          <div className="text-xs opacity-75 mt-2">{percentOfPrice.toFixed(1)}% {language === 'en' ? 'of property price' : 'پراپرٹی قیمت کا'}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
            <h3 className="font-bold mb-4">{language === 'en' ? 'Cost Breakdown' : 'لاگت کی تفصیل'}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Property Price (Rs.)' : 'پراپرٹی قیمت (Rs.)'}</label>
                <input type="number" value={propertyPrice} onChange={e => setPropertyPrice(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Stamp Duty (%)' : 'سٹامپ ڈیوٹی (%)'}</label>
                  <input type="number" value={costs.stampDuty} onChange={e => setCosts({ ...costs, stampDuty: parseFloat(e.target.value) })} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Registration (%)' : 'رجسٹریشن (%)'}</label>
                  <input type="number" value={costs.registration} onChange={e => setCosts({ ...costs, registration: parseFloat(e.target.value) })} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['lawyer', language === 'en' ? 'Lawyer Fee' : 'وکیل فیس'],
                  ['inspection', language === 'en' ? 'Inspection' : 'معائنہ'],
                  ['insurance', language === 'en' ? 'Insurance' : 'انشورنس'],
                  ['valuation', language === 'en' ? 'Valuation' : 'قدر شماری'],
                  ['bank', language === 'en' ? 'Bank Charges' : 'بینک چارجز'],
                  ['misc', language === 'en' ? 'Miscellaneous' : 'متفرق']
                ].map(([key, label]) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">{label}</label>
                    <input type="number" value={costs[key]} onChange={e => setCosts({ ...costs, [key]: parseFloat(e.target.value) || 0 })} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-3">{language === 'en' ? 'Cost Distribution' : 'لاگت کی تقسیم'}</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={v => formatCurrency(v)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
              <h3 className="font-bold mb-3">{language === 'en' ? 'Summary' : 'خلاصہ'}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between pb-2 border-b">
                  <span>{language === 'en' ? 'Stamp Duty' : 'سٹامپ ڈیوٹی'}</span>
                  <span className="font-bold">{formatCurrency(stampDutyAmt)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>{language === 'en' ? 'Registration' : 'رجسٹریشن'}</span>
                  <span className="font-bold">{formatCurrency(registrationAmt)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>{language === 'en' ? 'Professional Fees' : 'پیشہ ورانہ فیس'}</span>
                  <span className="font-bold">{formatCurrency(costs.lawyer + costs.inspection + costs.valuation)}</span>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <span>{language === 'en' ? 'Other Costs' : 'دیگر اخراجات'}</span>
                  <span className="font-bold">{formatCurrency(costs.insurance + costs.bank + costs.misc)}</span>
                </div>
                <div className="flex justify-between pt-2 font-bold text-lg">
                  <span>{language === 'en' ? 'Total' : 'کل'}</span>
                  <span className="text-pink-600">{formatCurrency(totalCost)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `Closing Costs: ${formatCurrency(totalCost)} (${percentOfPrice.toFixed(1)}%)` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Closing Costs' : 'اختتامی اخراجات محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default ClosingCostsCalculator;