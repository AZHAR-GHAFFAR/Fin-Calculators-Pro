import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const TransferCostCalculator = ({ language, addToHistory, calculatorName }) => {
  const [propertyValue, setPropertyValue] = useState(18000000);
  const [stampDuty, setStampDuty] = useState(3); // %
  const [registrationFee, setRegistrationFee] = useState(1); // %
  const [lawyerFee, setLawyerFee] = useState(50000);
  const [agentCommission, setAgentCommission] = useState(2); // %

  const stampDutyAmount = (propertyValue * stampDuty) / 100;
  const registrationAmount = (propertyValue * registrationFee) / 100;
  const agentAmount = (propertyValue * agentCommission) / 100;
  const totalCost = stampDutyAmount + registrationAmount + lawyerFee + agentAmount;

  return (
    <div className="space-y-6">
      <InfoPanel language={language} colorScheme="cyan"
        formula="Total = Stamp Duty + Registration + Lawyer + Agent Commission"
        variables={[
          { symbol: 'Stamp Duty', nameEn: '2-3% of property value (varies by province)', nameUrdu: 'پراپرٹی قیمت کا 2-3% (صوبے کے مطابق)' },
          { symbol: 'Registration', nameEn: '0.5-1% registration fee', nameUrdu: '0.5-1% رجسٹریشن فیس' }
        ]}
        example={[
          { labelEn: 'Property', labelUrdu: 'پراپرٹی', value: 'Rs. 1.8 Cr' },
          { labelEn: 'Stamp Duty', labelUrdu: 'سٹامپ ڈیوٹی', value: 'Rs. 5.4 L (3%)' },
          { labelEn: 'Total Transfer', labelUrdu: 'کل منتقلی', value: 'Rs. 6.8 L' }
        ]}
        terms={[
          { titleEn: 'Stamp Duty', titleUrdu: 'سٹامپ ڈیوٹی', descEn: 'Provincial tax. Punjab 3%, Sindh 2%. Based on DC value.', descUrdu: 'صوبائی ٹیکس۔ پنجاب 3%، سندھ 2%۔ DC قیمت پر۔' },
          { titleEn: 'Registration', titleUrdu: 'رجسٹریشن', descEn: 'Govt fee to register deed. 0.5-1% typical.', descUrdu: 'ڈیڈ رجسٹر کرنے کی حکومتی فیس۔ 0.5-1% عام۔' },
          { titleEn: 'Agent Fee', titleUrdu: 'ایجنٹ فیس', descEn: '1-2% commission. Negotiable. Split buyer-seller.', descUrdu: '1-2% کمیشن۔ قابل گفتگو۔ خریدار-فروخت کنندہ تقسیم۔' }
        ]}
        note={{ en: 'Budget 5-7% of property value for all transfer costs. Varies by province.', urdu: 'تمام منتقلی اخراجات کے لیے پراپرٹی قیمت کا 5-7% بجٹ۔ صوبے کے مطابق مختلف۔' }}
      />

      <div className="max-w-4xl mx-auto space-y-5">
        <div className={`bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 text-white`}>
          <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Transfer Cost' : 'کل منتقلی لاگت'}</div>
          <div className="text-5xl font-bold">{formatCurrency(totalCost)}</div>
          <div className="text-xs opacity-75 mt-2">{((totalCost/propertyValue)*100).toFixed(1)}% {language === 'en' ? 'of property value' : 'پراپرٹی قیمت کا'}</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-4">{language === 'en' ? 'Cost Components' : 'لاگت کے اجزاء'}</h3>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Property Value (Rs.)' : 'پراپرٹی قیمت (Rs.)'}</label>
              <input type="number" value={propertyValue} onChange={e => setPropertyValue(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Stamp Duty (%)' : 'سٹامپ ڈیوٹی (%)'}</label>
              <input type="number" value={stampDuty} onChange={e => setStampDuty(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Registration Fee (%)' : 'رجسٹریشن فیس (%)'}</label>
              <input type="number" value={registrationFee} onChange={e => setRegistrationFee(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" /></div>
            <div><label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Lawyer Fee (Rs.)' : 'وکیل فیس (Rs.)'}</label>
              <input type="number" value={lawyerFee} onChange={e => setLawyerFee(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" /></div>
            <div className="col-span-2"><label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Agent Commission (%)' : 'ایجنٹ کمیشن (%)'}</label>
              <input type="number" value={agentCommission} onChange={e => setAgentCommission(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" /></div>
          </div>

          <div className="space-y-2 text-sm">
            {[
              { lbl: language === 'en' ? 'Stamp Duty' : 'سٹامپ ڈیوٹی', val: stampDutyAmount },
              { lbl: language === 'en' ? 'Registration Fee' : 'رجسٹریشن فیس', val: registrationAmount },
              { lbl: language === 'en' ? 'Lawyer Fee' : 'وکیل فیس', val: lawyerFee },
              { lbl: language === 'en' ? 'Agent Commission' : 'ایجنٹ کمیشن', val: agentAmount }
            ].map((r, i) => (
              <div key={i} className="flex justify-between pb-2 border-b"><span>{r.lbl}</span><span className="font-bold">{formatCurrency(r.val)}</span></div>
            ))}
            <div className="flex justify-between pt-2 font-bold text-lg"><span>{language === 'en' ? 'Total' : 'کل'}</span><span className="text-cyan-600">{formatCurrency(totalCost)}</span></div>
          </div>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `Transfer Cost: ${formatCurrency(totalCost)}` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Transfer Cost' : 'منتقلی لاگت محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default TransferCostCalculator;