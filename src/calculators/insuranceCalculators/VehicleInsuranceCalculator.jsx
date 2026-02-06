import React, { useState } from 'react';
import { Car, Shield } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const VehicleInsuranceCalculator = ({ language, addToHistory, calculatorName }) => {
  const [vehicleType, setVehicleType] = useState('car'); // car, bike, suv
  const [vehicleValue, setVehicleValue] = useState(2000000);
  const [vehicleAge, setVehicleAge] = useState(2);
  const [city, setCity] = useState('metro'); // metro, tier2, tier3
  const [coverageType, setCoverageType] = useState('comprehensive'); // comprehensive, thirdparty
  const [ncb, setNcb] = useState(0); // No Claim Bonus 0-50%

  // IDV calculation (Insured Declared Value) - depreciates 5% per year
  const depreciationRate = vehicleAge * 0.05;
  const idv = vehicleValue * (1 - depreciationRate);

  // Base premium rates (% of IDV)
  const basePremiumRates = {
    car: { comprehensive: 0.03, thirdparty: 1500 },
    bike: { comprehensive: 0.025, thirdparty: 800 },
    suv: { comprehensive: 0.035, thirdparty: 2000 }
  };

  // City loading
  const cityLoadings = {
    metro: 1.2,
    tier2: 1.1,
    tier3: 1.0
  };

  let premium = 0;
  if (coverageType === 'comprehensive') {
    premium = idv * basePremiumRates[vehicleType].comprehensive * cityLoadings[city];
  } else {
    premium = basePremiumRates[vehicleType].thirdparty * cityLoadings[city];
  }

  // Apply NCB discount
  const ncbDiscount = premium * (ncb / 100);
  const finalPremium = premium - ncbDiscount;

  // Coverage breakdown for comprehensive
  const coverageBreakdown = coverageType === 'comprehensive' ? [
    { name: language === 'en' ? 'Own Damage' : 'اپنا نقصان', value: premium * 0.65, color: '#3B82F6' },
    { name: language === 'en' ? 'Third Party' : 'تھرڈ پارٹی', value: premium * 0.25, color: '#EF4444' },
    { name: language === 'en' ? 'Personal Accident' : 'ذاتی حادثہ', value: premium * 0.10, color: '#10B981' }
  ] : [
    { name: language === 'en' ? 'Third Party Liability' : 'تھرڈ پارٹی ذمہ داری', value: premium * 0.85, color: '#EF4444' },
    { name: language === 'en' ? 'Personal Accident' : 'ذاتی حادثہ', value: premium * 0.15, color: '#10B981' }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="red"
        formula="Premium = IDV × Rate × City Factor - NCB Discount  |  IDV = Vehicle Value × (1 - Depreciation)"
        variables={[
          { symbol: 'IDV', nameEn: 'Insured Declared Value (current market value)', nameUrdu: 'انشورڈ ڈیکلیئرڈ ویلیو (موجودہ مارکیٹ ویلیو)' },
          { symbol: 'NCB', nameEn: 'No Claim Bonus (0-50% discount)', nameUrdu: 'نو کلیم بونس (0-50% رعایت)' },
          { symbol: 'Depreciation', nameEn: '5% per year (max 50%)', nameUrdu: '5% فی سال (زیادہ سے زیادہ 50%)' }
        ]}
        example={[
          { labelEn: 'Vehicle', labelUrdu: 'گاڑی', value: 'Car (2 years old)' },
          { labelEn: 'Original Value', labelUrdu: 'اصل قیمت', value: 'Rs. 20,00,000' },
          { labelEn: 'Current IDV', labelUrdu: 'موجودہ IDV', value: 'Rs. 18,00,000 (10% depreciation)' },
          { labelEn: 'Coverage', labelUrdu: 'کوریج', value: 'Comprehensive' },
          { labelEn: 'City', labelUrdu: 'شہر', value: 'Metro (20% higher)' },
          { labelEn: 'NCB', labelUrdu: 'NCB', value: '20% discount' },
          { labelEn: 'Final Premium', labelUrdu: 'حتمی پریمیم', value: 'Rs. 51,840' }
        ]}
        terms={[
          {
            titleEn: 'Third Party vs Comprehensive',
            titleUrdu: 'تھرڈ پارٹی بمقابلہ کمپری ہنسیو',
            descEn: 'Third Party: Only covers damage to others (mandatory). Comprehensive: Covers your vehicle too (recommended).',
            descUrdu: 'تھرڈ پارٹی: صرف دوسروں کو نقصان کور کرتا ہے (لازمی)۔ کمپری ہنسیو: آپ کی گاڑی بھی کور کرتا ہے (تجویز کردہ)۔'
          },
          {
            titleEn: 'No Claim Bonus (NCB)',
            titleUrdu: 'نو کلیم بونس (NCB)',
            descEn: 'Discount for not claiming. Increases 10% yearly, max 50%. Protects your wallet for safe driving!',
            descUrdu: 'دعویٰ نہ کرنے پر رعایت۔ سالانہ 10% بڑھتا ہے، زیادہ سے زیادہ 50%۔ محفوظ ڈرائیونگ کے لیے آپ کے بٹوے کی حفاظت کرتا ہے!'
          },
          {
            titleEn: 'Zero Depreciation Cover',
            titleUrdu: 'زیرو ڈیپری شی ایشن کور',
            descEn: 'Add-on that covers full cost of parts (no depreciation). Worth it for new cars!',
            descUrdu: 'ایڈ آن جو پارٹس کی مکمل لاگت کور کرتا ہے (کوئی قدر میں کمی نہیں)۔ نئی کاروں کے لیے قیمتی!'
          }
        ]}
        note={{
          en: 'Third party insurance is mandatory by law in Pakistan. Comprehensive recommended for cars <5 years old. Always compare quotes from multiple insurers. Premium varies by make, model, and location.',
          urdu: 'تھرڈ پارٹی انشورنس پاکستان میں قانونی طور پر لازمی ہے۔ 5 سال سے کم پرانی کاروں کے لیے کمپری ہنسیو تجویز کی جاتی ہے۔ ہمیشہ کئی انشورنس کمپنیوں سے قیمتوں کا موازنہ کریں۔ پریمیم میک، ماڈل اور مقام کے لحاظ سے مختلف ہوتا ہے۔'
        }}
      />

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Car className="w-5 h-5 text-red-600" />
            {language === 'en' ? 'Vehicle Details' : 'گاڑی کی تفصیلات'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Vehicle Type' : 'گاڑی کی قسم'}</label>
              <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="car">{language === 'en' ? 'Car (Sedan/Hatchback)' : 'کار (سیڈان/ہیچ بیک)'}</option>
                <option value="bike">{language === 'en' ? 'Bike/Motorcycle' : 'بائک/موٹرسائیکل'}</option>
                <option value="suv">{language === 'en' ? 'SUV/Crossover' : 'ایس یو وی/کراس اوور'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Vehicle Value (Rs.)' : 'گاڑی کی قیمت (Rs.)'}</label>
              <input type="range" min="200000" max="10000000" step="100000" value={vehicleValue}
                onChange={(e) => setVehicleValue(parseFloat(e.target.value))}
                className="w-full h-2 bg-red-100 dark:bg-red-900 rounded-lg" />
              <input type="number" value={vehicleValue} onChange={(e) => setVehicleValue(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Vehicle Age (years)' : 'گاڑی کی عمر (سال)'}</label>
              <input type="range" min="0" max="10" value={vehicleAge} onChange={(e) => setVehicleAge(parseFloat(e.target.value))}
                className="w-full h-2 bg-orange-100 dark:bg-orange-900 rounded-lg" />
              <input type="number" value={vehicleAge} onChange={(e) => setVehicleAge(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'City' : 'شہر'}</label>
              <select value={city} onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="metro">{language === 'en' ? 'Metro (Karachi, Lahore, Islamabad)' : 'میٹرو (کراچی، لاہور، اسلام آباد)'}</option>
                <option value="tier2">{language === 'en' ? 'Tier 2 Cities' : 'ٹیئر 2 شہر'}</option>
                <option value="tier3">{language === 'en' ? 'Tier 3 Cities' : 'ٹیئر 3 شہر'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Coverage Type' : 'کوریج کی قسم'}</label>
              <select value={coverageType} onChange={(e) => setCoverageType(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="comprehensive">{language === 'en' ? 'Comprehensive (Own + Third Party)' : 'کمپری ہنسیو (اپنا + تھرڈ پارٹی)'}</option>
                <option value="thirdparty">{language === 'en' ? 'Third Party Only (Mandatory)' : 'صرف تھرڈ پارٹی (لازمی)'}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'No Claim Bonus (%)' : 'نو کلیم بونس (%)'}</label>
              <input type="range" min="0" max="50" step="10" value={ncb} onChange={(e) => setNcb(parseFloat(e.target.value))}
                className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg" />
              <input type="number" value={ncb} onChange={(e) => setNcb(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${formatCurrency(finalPremium)} Premium` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Premium' : 'پریمیم کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Annual Premium' : 'سالانہ پریمیم'}</div>
              <div className="text-3xl font-bold">{formatCurrency(finalPremium)}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Current IDV' : 'موجودہ IDV'}</div>
              <div className="text-3xl font-bold">{formatCurrency(idv)}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Coverage Breakdown' : 'کوریج کی تفصیل'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={coverageBreakdown} cx="50%" cy="50%" outerRadius={80} paddingAngle={2} dataKey="value">
                  {coverageBreakdown.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Premium Breakdown' : 'پریمیم کی تفصیل'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Base Premium' : 'بنیادی پریمیم'}</span>
                <span className="font-bold">{formatCurrency(premium)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? `NCB Discount (${ncb}%)` : `NCB رعایت (${ncb}%)`}</span>
                <span className="font-bold text-green-600">- {formatCurrency(ncbDiscount)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Depreciation' : 'قدر میں کمی'}</span>
                <span className="font-bold text-orange-600">{(depreciationRate * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Final Premium' : 'حتمی پریمیم'}</span>
                <span className="font-bold text-xl text-red-600">{formatCurrency(finalPremium)}</span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
            <h4 className="font-bold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {language === 'en' ? '💡 Add-On Covers' : '💡 ایڈ آن کورز'}
            </h4>
            <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
              <li>• {language === 'en' ? 'Zero Depreciation: Full parts cost (20-30% extra)' : 'زیرو ڈیپری شی ایشن: پارٹس کی مکمل لاگت (20-30% اضافی)'}</li>
              <li>• {language === 'en' ? 'Engine Protection: Covers engine damage' : 'انجن پروٹیکشن: انجن کے نقصان کو کور کرتا ہے'}</li>
              <li>• {language === 'en' ? 'Return to Invoice: Full purchase price on total loss' : 'ریٹرن ٹو انوائس: کل نقصان پر مکمل خریداری کی قیمت'}</li>
              <li>• {language === 'en' ? 'Roadside Assistance: Towing, flat tire help' : 'روڈ سائیڈ اسسٹنس: ٹوئنگ، فلیٹ ٹائر مدد'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleInsuranceCalculator;