import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const PropertyTaxCalculator = ({ language, addToHistory, calculatorName }) => {
  const [propertyValue, setPropertyValue] = useState(18000000);
  const [province, setProvince] = useState('punjab');
  const [propertyType, setPropertyType] = useState('residential');
  const [isUrban, setIsUrban] = useState(true);

  // Pakistan provincial rates (simplified)
  const rates = {
    punjab: { residential: 0.2, commercial: 0.4 },
    sindh: { residential: 0.15, commercial: 0.35 },
    kpk: { residential: 0.15, commercial: 0.3 },
    balochistan: { residential: 0.1, commercial: 0.25 }
  };

  const baseRate = rates[province][propertyType];
  const urbanMultiplier = isUrban ? 1.2 : 1;
  const taxRate = baseRate * urbanMultiplier;
  const annualTax = (propertyValue * taxRate) / 100;
  const quarterlyTax = annualTax / 4;
  const monthlyTax = annualTax / 12;

  return (
    <div className="space-y-6">
      <InfoPanel language={language} colorScheme="slate"
        formula="Annual Tax = Property Value × Tax Rate% | Rate varies by province & type"
        variables={[
          { symbol: 'Rate', nameEn: 'Provincial tax rate (0.1-0.4%)', nameUrdu: 'صوبائی ٹیکس شرح (0.1-0.4%)' },
          { symbol: 'Type', nameEn: 'Residential vs Commercial', nameUrdu: 'رہائشی بمقابلہ تجارتی' }
        ]}
        example={[
          { labelEn: 'Property', labelUrdu: 'پراپرٹی', value: 'Rs. 1.8 Cr (Punjab, Residential, Urban)' },
          { labelEn: 'Tax Rate', labelUrdu: 'ٹیکس شرح', value: '0.24% (0.2% × 1.2 urban)' },
          { labelEn: 'Annual Tax', labelUrdu: 'سالانہ ٹیکس', value: 'Rs. 43,200' },
          { labelEn: 'Quarterly', labelUrdu: 'سہ ماہی', value: 'Rs. 10,800' }
        ]}
        terms={[
          { titleEn: 'Provincial Rates', titleUrdu: 'صوبائی شرحیں', descEn: 'Punjab: 0.2%. Sindh: 0.15%. KPK: 0.15%. Balochistan: 0.1%. Commercial 2x.', descUrdu: 'پنجاب: 0.2%۔ سندھ: 0.15%۔ خیبر پختونخوا: 0.15%۔ بلوچستان: 0.1%۔ تجارتی 2x۔' },
          { titleEn: 'Urban vs Rural', titleUrdu: 'شہری بمقابلہ دیہی', descEn: 'Urban areas 20% higher rate. Better services justify cost.', descUrdu: 'شہری علاقے 20% زیادہ شرح۔ بہتر خدمات لاگت کا جواز۔' },
          { titleEn: 'Payment', titleUrdu: 'ادائیگی', descEn: 'Annual or quarterly. Discount for early payment. Penalty for late.', descUrdu: 'سالانہ یا سہ ماہی۔ جلد ادائیگی پر رعایت۔ تاخیر پر جرمانہ۔' }
        ]}
        note={{ en: 'Based on DC value, not market. Varies by locality. Check with local authority.', urdu: 'DC قیمت پر مبنی، مارکیٹ نہیں۔ علاقے کے مطابق مختلف۔ مقامی اتھارٹی سے چیک کریں۔' }}
      />

      <div className="max-w-4xl mx-auto space-y-5">
        <div className={`bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl p-8 text-white`}>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-6 h-6" />
            <span className="text-sm opacity-90">{language === 'en' ? 'Annual Property Tax' : 'سالانہ پراپرٹی ٹیکس'}</span>
          </div>
          <div className="text-5xl font-bold">{formatCurrency(annualTax)}</div>
          <div className="text-xs opacity-75 mt-2">{taxRate.toFixed(2)}% {language === 'en' ? 'of property value' : 'پراپرٹی قیمت کا'}</div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-4">{language === 'en' ? 'Property Details' : 'پراپرٹی کی تفصیلات'}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-500 mb-1">{language === 'en' ? 'Property Value (Rs.)' : 'پراپرٹی قیمت (Rs.)'}</label>
              <input type="number" value={propertyValue} onChange={e => setPropertyValue(parseFloat(e.target.value))} className="w-full px-3 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">{language === 'en' ? 'Province' : 'صوبہ'}</label>
              <div className="space-y-1">
                {['punjab', 'sindh', 'kpk', 'balochistan'].map(p => (
                  <button key={p} onClick={() => setProvince(p)}
                    className={`w-full text-left px-3 py-1.5 rounded text-sm ${province === p ? 'bg-slate-600 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2">{language === 'en' ? 'Type & Location' : 'قسم اور مقام'}</label>
              <div className="space-y-1">
                <button onClick={() => setPropertyType('residential')}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm ${propertyType === 'residential' ? 'bg-slate-600 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
                  {language === 'en' ? 'Residential' : 'رہائشی'}
                </button>
                <button onClick={() => setPropertyType('commercial')}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm ${propertyType === 'commercial' ? 'bg-slate-600 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
                  {language === 'en' ? 'Commercial' : 'تجارتی'}
                </button>
                <button onClick={() => setIsUrban(!isUrban)}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm ${isUrban ? 'bg-slate-600 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
                  {isUrban ? (language === 'en' ? 'Urban ✓' : 'شہری ✓') : (language === 'en' ? 'Rural' : 'دیہی')}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-lg">
          <h3 className="font-bold mb-4">{language === 'en' ? 'Payment Schedule' : 'ادائیگی شیڈول'}</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">{language === 'en' ? 'Annual' : 'سالانہ'}</div>
              <div className="text-xl font-bold">{formatCurrency(annualTax)}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">{language === 'en' ? 'Quarterly' : 'سہ ماہی'}</div>
              <div className="text-xl font-bold">{formatCurrency(quarterlyTax)}</div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">{language === 'en' ? 'Monthly' : 'ماہانہ'}</div>
              <div className="text-xl font-bold">{formatCurrency(monthlyTax)}</div>
            </div>
          </div>
        </div>

        <button onClick={() => { addToHistory({ calculatorName, result: `Annual Tax: ${formatCurrency(annualTax)} (${province}, ${propertyType})` }); toast.success(language === 'en' ? 'Saved!' : 'محفوظ!'); }}
          className="w-full bg-gradient-to-r from-slate-600 to-slate-700 text-white font-bold py-3 rounded-xl shadow-lg">
          {language === 'en' ? 'Save Tax Estimate' : 'ٹیکس تخمینہ محفوظ'}
        </button>
      </div>
    </div>
  );
};
export default PropertyTaxCalculator;