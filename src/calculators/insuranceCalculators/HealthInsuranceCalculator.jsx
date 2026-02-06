import React, { useState } from 'react';
import { HeartPulse, Users, ShieldCheck } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const HealthInsuranceCalculator = ({ language, addToHistory, calculatorName }) => {
  const [age, setAge] = useState(35);
  const [familyMembers, setFamilyMembers] = useState(4);
  const [city, setCity] = useState('tier1'); // tier1, tier2, tier3
  const [existingConditions, setExistingConditions] = useState(0);
  const [roomType, setRoomType] = useState('shared'); // shared, single, deluxe

  // Base sum insured recommendations
  const baseSumInsured = {
    tier1: 1000000, // Metro cities (Karachi, Lahore, Islamabad)
    tier2: 700000,  // Tier 2 cities
    tier3: 500000   // Tier 3 cities
  };

  const recommendedSum = baseSumInsured[city] * familyMembers;

  // Room type multiplier
  const roomMultiplier = {
    shared: 1,
    single: 1.3,
    deluxe: 1.6
  };

  const adjustedSum = recommendedSum * roomMultiplier[roomType];

  // Premium estimation (rough)
  const basePremium = adjustedSum * 0.03; // 3% of sum insured
  const ageLoading = 1 + ((age - 25) * 0.015);
  const conditionLoading = 1 + (existingConditions * 0.1);
  const annualPremium = basePremium * ageLoading * conditionLoading;
  const monthlyPremium = annualPremium / 12;

  // Coverage breakdown
  const coverageBreakdown = [
    { name: language === 'en' ? 'Hospitalization' : 'ہسپتال میں داخلہ', value: adjustedSum * 0.70, color: '#3B82F6' },
    { name: language === 'en' ? 'Pre & Post Hospitalization' : 'ہسپتال سے پہلے اور بعد', value: adjustedSum * 0.15, color: '#10B981' },
    { name: language === 'en' ? 'Day Care' : 'ڈے کیئر', value: adjustedSum * 0.10, color: '#F59E0B' },
    { name: language === 'en' ? 'Ambulance' : 'ایمبولینس', value: adjustedSum * 0.05, color: '#8B5CF6' }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="green"
        formula="Health Cover = Base Amount (per city tier) × Family Size × Room Type Factor"
        variables={[
          { symbol: 'Base Amount', nameEn: 'Minimum coverage per person based on city', nameUrdu: 'شہر کی بنیاد پر فی شخص کم از کم کوریج' },
          { symbol: 'Room Type', nameEn: 'Shared (1x), Single (1.3x), Deluxe (1.6x)', nameUrdu: 'شیئرڈ (1x)، سنگل (1.3x)، ڈیلکس (1.6x)' },
          { symbol: 'Premium', nameEn: 'Annual cost ≈ 3-5% of sum insured', nameUrdu: 'سالانہ لاگت ≈ رقم کا 3-5%' }
        ]}
        example={[
          { labelEn: 'Family', labelUrdu: 'خاندان', value: '4 members (Metro city)' },
          { labelEn: 'Base Coverage', labelUrdu: 'بنیادی کوریج', value: 'Rs. 10 Lakh per person' },
          { labelEn: 'Room Type', labelUrdu: 'کمرے کی قسم', value: 'Single Private (1.3x)' },
          { labelEn: 'Total Coverage', labelUrdu: 'کل کوریج', value: 'Rs. 52 Lakh' },
          { labelEn: 'Annual Premium', labelUrdu: 'سالانہ پریمیم', value: 'Rs. 1,56,000 (approx)' }
        ]}
        terms={[
          {
            titleEn: 'Sum Insured',
            titleUrdu: 'انشورڈ رقم',
            descEn: 'Maximum amount insurer pays. Pakistan: Min Rs. 5L, Recommended Rs. 10L+ for families.',
            descUrdu: 'زیادہ سے زیادہ رقم جو انشورر ادا کرتا ہے۔ پاکستان: کم از کم 5 لاکھ، خاندانوں کے لیے 10 لاکھ+ تجویز۔'
          },
          {
            titleEn: 'Cashless vs Reimbursement',
            titleUrdu: 'کیش لیس بمقابلہ واپسی',
            descEn: 'Cashless: Direct billing with network hospitals. Reimbursement: You pay, claim later.',
            descUrdu: 'کیش لیس: نیٹ ورک ہسپتالوں کے ساتھ براہ راست بلنگ۔ واپسی: آپ ادا کریں، بعد میں دعویٰ کریں۔'
          },
          {
            titleEn: 'Waiting Period',
            titleUrdu: 'انتظار کی مدت',
            descEn: 'Initial 30 days + 2-4 years for pre-existing diseases. Plan purchases early!',
            descUrdu: 'ابتدائی 30 دن + پہلے سے موجود بیماریوں کے لیے 2-4 سال۔ جلد خریداری کی منصوبہ بندی کریں!'
          }
        ]}
        note={{
          en: 'Medical costs in Pakistan rising 15-20% annually. Health insurance is essential. This calculator gives estimates - actual premium varies by insurer, medical history, and policy features.',
          urdu: 'پاکستان میں طبی اخراجات سالانہ 15-20% بڑھ رہے ہیں۔ ہیلتھ انشورنس ضروری ہے۔ یہ کیلکولیٹر تخمینہ دیتا ہے - اصل پریمیم انشورر، طبی تاریخ، اور پالیسی کی خصوصیات کے لحاظ سے مختلف ہوتا ہے۔'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-green-600" />
              {language === 'en' ? 'Health Details' : 'صحت کی تفصیلات'}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Your Age' : 'آپ کی عمر'}</label>
                <input type="range" min="18" max="65" value={age} onChange={(e) => setAge(parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg" />
                <input type="number" value={age} onChange={(e) => setAge(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Family Members' : 'خاندان کے افراد'}</label>
                <input type="number" min="1" max="10" value={familyMembers} onChange={(e) => setFamilyMembers(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'City Tier' : 'شہر کا درجہ'}</label>
                <select value={city} onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                  <option value="tier1">{language === 'en' ? 'Tier 1 (Karachi, Lahore, Islamabad)' : 'ٹیئر 1 (کراچی، لاہور، اسلام آباد)'}</option>
                  <option value="tier2">{language === 'en' ? 'Tier 2 Cities' : 'ٹیئر 2 شہر'}</option>
                  <option value="tier3">{language === 'en' ? 'Tier 3 Cities' : 'ٹیئر 3 شہر'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Room Type' : 'کمرے کی قسم'}</label>
                <select value={roomType} onChange={(e) => setRoomType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                  <option value="shared">{language === 'en' ? 'Shared Room (Economical)' : 'شیئرڈ روم (اقتصادی)'}</option>
                  <option value="single">{language === 'en' ? 'Single Private Room' : 'سنگل پرائیویٹ روم'}</option>
                  <option value="deluxe">{language === 'en' ? 'Deluxe/Suite' : 'ڈیلکس/سویٹ'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Existing Conditions' : 'موجودہ بیماریاں'}</label>
                <input type="number" min="0" max="5" value={existingConditions} onChange={(e) => setExistingConditions(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
                <p className="text-xs text-slate-500 mt-1">{language === 'en' ? 'Diabetes, BP, etc.' : 'ذیابیطس، بی پی وغیرہ'}</p>
              </div>

              <button onClick={() => {
                addToHistory({ calculatorName, result: `${formatCurrency(adjustedSum)} Coverage` });
                toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
              }}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 rounded-xl">
                {language === 'en' ? 'Calculate Coverage' : 'کوریج کا حساب'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Recommended Sum' : 'تجویز کردہ رقم'}</div>
              <div className="text-3xl font-bold">{formatCurrency(adjustedSum)}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Annual Premium' : 'سالانہ پریمیم'}</div>
              <div className="text-3xl font-bold">{formatCurrency(annualPremium)}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Monthly Premium' : 'ماہانہ پریمیم'}</div>
              <div className="text-3xl font-bold">{formatCurrency(monthlyPremium)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Coverage Distribution' : 'کوریج کی تقسیم'}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={coverageBreakdown} cx="50%" cy="50%" outerRadius={100} paddingAngle={2} dataKey="value">
                  {coverageBreakdown.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
            <h4 className="font-bold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              {language === 'en' ? 'What\'s Covered?' : 'کیا شامل ہے؟'}
            </h4>
            <ul className="text-sm text-green-700 dark:text-green-400 space-y-2">
              <li>✅ {language === 'en' ? 'Hospitalization expenses (room, ICU, surgery)' : 'ہسپتال میں داخلے کے اخراجات (کمرہ، آئی سی یو، سرجری)'}</li>
              <li>✅ {language === 'en' ? 'Pre & post hospitalization (30-60 days)' : 'ہسپتال سے پہلے اور بعد (30-60 دن)'}</li>
              <li>✅ {language === 'en' ? 'Day care procedures (dialysis, chemo)' : 'ڈے کیئر طریقہ کار (ڈائلیسس، کیمو)'}</li>
              <li>✅ {language === 'en' ? 'Ambulance charges' : 'ایمبولینس چارجز'}</li>
              <li>✅ {language === 'en' ? 'Maternity benefits (if opted)' : 'زچگی کے فوائد (اگر منتخب ہو)'}</li>
              <li>❌ {language === 'en' ? 'Cosmetic surgery, dental (unless accidental)' : 'کاسمیٹک سرجری، ڈینٹل (جب تک حادثاتی نہ ہو)'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthInsuranceCalculator;