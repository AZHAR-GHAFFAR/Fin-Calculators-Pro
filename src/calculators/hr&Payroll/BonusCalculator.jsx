import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const BonusCalculator = ({ language, addToHistory, calculatorName }) => {
  const [basicSalary, setBasicSalary] = useState(50000);
  const [bonusType, setBonusType] = useState('eid'); // eid, performance, annual
  const [performanceRating, setPerformanceRating] = useState(4); // 1-5

  const bonusRates = {
    eid: 1, // 1 month basic
    performance: performanceRating * 0.25, // 0.25-1.25 months based on rating
    annual: 2 // 2 months basic
  };

  const bonusAmount = basicSalary * bonusRates[bonusType];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="cyan"
        formula="Bonus = Basic Salary × Bonus Multiplier"
        variables={[
          { symbol: 'Eid Bonus', nameEn: '1 month basic (mandatory)', nameUrdu: '1 ماہ بنیادی (لازمی)' },
          { symbol: 'Performance', nameEn: '0-100% based on rating', nameUrdu: 'درجہ بندی کی بنیاد پر 0-100%' },
          { symbol: 'Annual', nameEn: '1-3 months based on policy', nameUrdu: 'پالیسی کی بنیاد پر 1-3 ماہ' }
        ]}
        example={[
          { labelEn: 'Basic', labelUrdu: 'بنیادی', value: 'Rs. 50,000' },
          { labelEn: 'Eid Bonus', labelUrdu: 'عید بونس', value: '1 month = Rs. 50,000' },
          { labelEn: 'Performance (4/5)', labelUrdu: 'کارکردگی (4/5)', value: '100% = Rs. 50,000' },
          { labelEn: 'Annual Bonus', labelUrdu: 'سالانہ بونس', value: '2 months = Rs. 1,00,000' }
        ]}
        terms={[
          {
            titleEn: 'Eid Bonus',
            titleUrdu: 'عید بونس',
            descEn: 'Mandatory in Pakistan. Paid before Eid. Usually 1 month basic salary.',
            descUrdu: 'پاکستان میں لازمی۔ عید سے پہلے ادا۔ عام طور پر 1 ماہ بنیادی تنخواہ۔'
          },
          {
            titleEn: 'Performance Bonus',
            titleUrdu: 'کارکردگی بونس',
            descEn: 'Based on KPIs/targets. Varies by company. 0-200% of monthly basic possible.',
            descUrdu: 'KPIs/اہداف پر مبنی۔ کمپنی کے لحاظ سے مختلف۔ ماہانہ بنیادی کا 0-200% ممکن۔'
          },
          {
            titleEn: 'Annual Bonus',
            titleUrdu: 'سالانہ بونس',
            descEn: 'Year-end bonus. Usually 1-3 months. Based on company profits and performance.',
            descUrdu: 'سال کے آخر میں بونس۔ عام طور پر 1-3 ماہ۔ کمپنی کے منافع اور کارکردگی پر مبنی۔'
          }
        ]}
        note={{
          en: 'Eid bonus mandatory under law for companies with 20+ employees. Other bonuses discretionary. Bonuses are taxable as salary.',
          urdu: 'عید بونس 20+ ملازمین والی کمپنیوں کے لیے قانون کے تحت لازمی۔ دیگر بونس صوابدیدی۔ بونس تنخواہ کے طور پر قابل ٹیکس ہیں۔'
        }}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-cyan-600" />
            {language === 'en' ? 'Bonus Details' : 'بونس کی تفصیلات'}
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Basic Salary (Rs.)' : 'بنیادی تنخواہ (Rs.)'}</label>
              <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Bonus Type' : 'بونس کی قسم'}</label>
              <select value={bonusType} onChange={(e) => setBonusType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="eid">{language === 'en' ? 'Eid Bonus (1 month)' : 'عید بونس (1 ماہ)'}</option>
                <option value="performance">{language === 'en' ? 'Performance Bonus' : 'کارکردگی بونس'}</option>
                <option value="annual">{language === 'en' ? 'Annual Bonus (2 months)' : 'سالانہ بونس (2 ماہ)'}</option>
              </select>
            </div>
            {bonusType === 'performance' && (
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Performance Rating (1-5)' : 'کارکردگی کی درجہ بندی (1-5)'}</label>
                <input type="range" min="1" max="5" value={performanceRating} onChange={(e) => setPerformanceRating(parseFloat(e.target.value))}
                  className="w-full h-2 bg-cyan-100 dark:bg-cyan-900 rounded-lg" />
                <div className="flex justify-between mt-2 text-xs text-slate-500">
                  <span>1 {language === 'en' ? '(Poor)' : '(خراب)'}</span>
                  <span className="font-bold text-cyan-600">{performanceRating}</span>
                  <span>5 {language === 'en' ? '(Excellent)' : '(بہترین)'}</span>
                </div>
              </div>
            )}
            <button onClick={() => {
              addToHistory({ calculatorName, result: `${bonusType} bonus: ${formatCurrency(bonusAmount)}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Bonus' : 'بونس کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Bonus Amount' : 'بونس کی رقم'}</div>
            <div className="text-4xl font-bold">{formatCurrency(bonusAmount)}</div>
            <div className="text-xs opacity-75 mt-1">
              {bonusRates[bonusType].toFixed(2)} {language === 'en' ? 'month(s)' : 'ماہ'}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Bonus Types' : 'بونس کی اقسام'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Eid Bonus' : 'عید بونس'}</span>
                <span className="font-bold text-green-600">{formatCurrency(basicSalary * 1)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Performance (Rating 4)' : 'کارکردگی (درجہ 4)'}</span>
                <span className="font-bold text-blue-600">{formatCurrency(basicSalary * 1)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Annual Bonus' : 'سالانہ بونس'}</span>
                <span className="font-bold text-purple-600">{formatCurrency(basicSalary * 2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Selected Bonus' : 'منتخب بونس'}</span>
                <span className="font-bold text-xl text-cyan-600">{formatCurrency(bonusAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BonusCalculator;