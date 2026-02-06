import React, { useState, useMemo } from 'react';
import { Shield, Users, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const LifeInsuranceCalculator = ({ language, addToHistory, calculatorName }) => {
  const [age, setAge] = useState(30);
  const [annualIncome, setAnnualIncome] = useState(1000000);
  const [dependents, setDependents] = useState(2);
  const [existingLoans, setExistingLoans] = useState(2000000);
  const [existingInsurance, setExistingInsurance] = useState(0);
  const [yearsToRetirement, setYearsToRetirement] = useState(30);

  // Calculate recommended coverage using Human Life Value method
  const yearlyExpenses = annualIncome * 0.7; // Assuming 70% of income for expenses
  const totalExpensesCovered = yearlyExpenses * yearsToRetirement;
  const childrenEducation = dependents * 2000000; // Rs. 20 lakh per child
  const emergencyFund = annualIncome * 1; // 1 year of income
  
  const recommendedCoverage = totalExpensesCovered + existingLoans + childrenEducation + emergencyFund - existingInsurance;
  const coverageMultiple = recommendedCoverage / annualIncome;
  
  // Estimate premium (rough calculation: 0.5-1% of sum assured for 30-year term)
  const ageLoadingFactor = 1 + ((age - 25) * 0.02); // Premium increases with age
  const estimatedPremium = (recommendedCoverage * 0.007 * ageLoadingFactor) / 12; // Monthly premium

  const breakdownData = [
    { name: language === 'en' ? 'Future Expenses' : 'مستقبل کے اخراجات', value: totalExpensesCovered, color: '#3B82F6' },
    { name: language === 'en' ? 'Loans' : 'قرضے', value: existingLoans, color: '#EF4444' },
    { name: language === 'en' ? 'Children Education' : 'بچوں کی تعلیم', value: childrenEducation, color: '#10B981' },
    { name: language === 'en' ? 'Emergency Fund' : 'ایمرجنسی فنڈ', value: emergencyFund, color: '#F59E0B' }
  ];

  const comparisonData = [
    { type: language === 'en' ? 'Annual Income' : 'سالانہ آمدنی', amount: annualIncome },
    { type: language === 'en' ? 'Recommended Coverage' : 'تجویز کردہ کوریج', amount: recommendedCoverage },
    { type: language === 'en' ? 'Existing Coverage' : 'موجودہ کوریج', amount: existingInsurance }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="blue"
        formula="Life Cover = (Future Expenses × Years) + Loans + Children Education + Emergency Fund"
        variables={[
          { symbol: 'Future Expenses', nameEn: 'Annual expenses × Years to retirement', nameUrdu: 'سالانہ اخراجات × ریٹائرمنٹ تک سال' },
          { symbol: 'Human Life Value', nameEn: 'Present value of future income', nameUrdu: 'مستقبل کی آمدنی کی موجودہ قیمت' },
          { symbol: 'Coverage Multiple', nameEn: 'Life cover ÷ Annual income', nameUrdu: 'لائف کور ÷ سالانہ آمدنی' }
        ]}
        example={[
          { labelEn: 'Age', labelUrdu: 'عمر', value: '30 years' },
          { labelEn: 'Annual Income', labelUrdu: 'سالانہ آمدنی', value: 'Rs. 10,00,000' },
          { labelEn: 'Dependents', labelUrdu: 'منحصر افراد', value: '2 (spouse + child)' },
          { labelEn: 'Existing Loans', labelUrdu: 'موجودہ قرضے', value: 'Rs. 20,00,000' },
          { labelEn: 'Recommended Coverage', labelUrdu: 'تجویز کردہ کوریج', value: 'Rs. 4.5 Crore' },
          { labelEn: 'Monthly Premium', labelUrdu: 'ماہانہ پریمیم', value: 'Rs. 2,625 (approx)' }
        ]}
        terms={[
          {
            titleEn: 'Human Life Value',
            titleUrdu: 'انسانی زندگی کی قیمت',
            descEn: 'Economic value of a person based on future income. Used to calculate ideal life insurance coverage.',
            descUrdu: 'مستقبل کی آمدنی کی بنیاد پر کسی شخص کی اقتصادی قیمت۔ مثالی لائف انشورنس کوریج کا حساب لگانے کے لیے استعمال ہوتی ہے۔'
          },
          {
            titleEn: 'Coverage Multiple',
            titleUrdu: 'کوریج ضارب',
            descEn: 'Rule of thumb: 10-15x annual income. Higher if you have dependents, loans, or are sole earner.',
            descUrdu: 'اصول: سالانہ آمدنی کا 10-15 گنا۔ زیادہ اگر منحصر افراد، قرضے، یا واحد کمانے والے ہیں۔'
          },
          {
            titleEn: 'Term vs Whole Life',
            titleUrdu: 'ٹرم بمقابلہ پوری زندگی',
            descEn: 'Term: Pure protection, cheaper. Whole life: Protection + investment, expensive. Term recommended.',
            descUrdu: 'ٹرم: خالص تحفظ، سستا۔ پوری زندگی: تحفظ + سرمایہ کاری، مہنگا۔ ٹرم تجویز کیا جاتا ہے۔'
          }
        ]}
        note={{
          en: 'This is a rough estimate. Actual premium depends on health, lifestyle, occupation, and insurer. Get quotes from multiple companies. Buy term insurance early - premiums are much lower at younger age.',
          urdu: 'یہ تخمینہ ہے۔ اصل پریمیم صحت، طرز زندگی، پیشے اور انشورنس کمپنی پر منحصر ہے۔ کئی کمپنیوں سے قیمتیں حاصل کریں۔ جلد ٹرم انشورنس خریدیں - کم عمر میں پریمیم بہت کم ہوتے ہیں۔'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              {language === 'en' ? 'Your Details' : 'آپ کی تفصیلات'}
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Your Age (years)' : 'آپ کی عمر (سال)'}
                </label>
                <input type="range" min="18" max="60" step="1" value={age}
                  onChange={(e) => setAge(parseFloat(e.target.value))}
                  className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                <input type="number" value={age} onChange={(e) => setAge(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Annual Income (Rs.)' : 'سالانہ آمدنی (Rs.)'}
                </label>
                <input type="range" min="300000" max="10000000" step="50000" value={annualIncome}
                  onChange={(e) => setAnnualIncome(parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg appearance-none cursor-pointer accent-green-600" />
                <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(parseFloat(e.target.value))}
                  className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Number of Dependents' : 'منحصر افراد کی تعداد'}
                </label>
                <input type="number" min="0" max="10" value={dependents}
                  onChange={(e) => setDependents(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'en' ? 'Spouse, children, parents' : 'شریک حیات، بچے، والدین'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Existing Loans (Rs.)' : 'موجودہ قرضے (Rs.)'}
                </label>
                <input type="number" value={existingLoans}
                  onChange={(e) => setExistingLoans(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'en' ? 'Home loan, car loan, personal loan' : 'ہوم لون، کار لون، پرسنل لون'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Existing Insurance (Rs.)' : 'موجودہ انشورنس (Rs.)'}
                </label>
                <input type="number" value={existingInsurance}
                  onChange={(e) => setExistingInsurance(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  {language === 'en' ? 'Years to Retirement' : 'ریٹائرمنٹ تک سال'}
                </label>
                <input type="number" min="5" max="40" value={yearsToRetirement}
                  onChange={(e) => setYearsToRetirement(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600" />
              </div>

              <button onClick={() => {
                addToHistory({ calculatorName, result: `${formatCurrency(recommendedCoverage)} Coverage Recommended` });
                toast.success(language === 'en' ? 'Calculation saved!' : 'حساب محفوظ ہو گیا!');
              }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg">
                {language === 'en' ? 'Calculate Coverage' : 'کوریج کا حساب'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">
                {language === 'en' ? 'Recommended Coverage' : 'تجویز کردہ کوریج'}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(recommendedCoverage)}</div>
              <div className="text-xs opacity-75 mt-1">
                {coverageMultiple.toFixed(1)}x {language === 'en' ? 'of annual income' : 'سالانہ آمدنی کا'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">
                {language === 'en' ? 'Est. Monthly Premium' : 'تخمینی ماہانہ پریمیم'}
              </div>
              <div className="text-3xl font-bold">{formatCurrency(estimatedPremium)}</div>
              <div className="text-xs opacity-75 mt-1">
                {((estimatedPremium / annualIncome * 12) * 100).toFixed(2)}% {language === 'en' ? 'of income' : 'آمدنی کا'}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white shadow-lg">
              <div className="text-sm font-semibold opacity-90 mb-2">
                {language === 'en' ? 'Coverage Gap' : 'کوریج کی کمی'}
              </div>
              <div className="text-3xl font-bold">
                {formatCurrency(Math.max(0, recommendedCoverage - existingInsurance))}
              </div>
              <div className="text-xs opacity-75 mt-1">
                {language === 'en' ? 'Additional needed' : 'اضافی ضرورت'}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Coverage Breakdown' : 'کوریج کی تفصیل'}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={breakdownData} cx="50%" cy="50%" outerRadius={100} paddingAngle={2} dataKey="value">
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Coverage Comparison' : 'کوریج کا موازنہ'}
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="type" fontSize={11} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Bar dataKey="amount" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Detailed Breakdown' : 'تفصیلی خلاصہ'}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {language === 'en' ? 'Future Expenses Coverage' : 'مستقبل کے اخراجات کی کوریج'}
                </span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {formatCurrency(totalExpensesCovered)}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {language === 'en' ? 'Loan Coverage' : 'قرض کوریج'}
                </span>
                <span className="font-bold text-red-600">{formatCurrency(existingLoans)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {language === 'en' ? 'Children Education Fund' : 'بچوں کی تعلیم فنڈ'}
                </span>
                <span className="font-bold text-green-600">{formatCurrency(childrenEducation)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {language === 'en' ? 'Emergency Fund' : 'ایمرجنسی فنڈ'}
                </span>
                <span className="font-bold text-orange-600">{formatCurrency(emergencyFund)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {language === 'en' ? 'Existing Coverage' : 'موجودہ کوریج'}
                </span>
                <span className="font-bold text-purple-600">- {formatCurrency(existingInsurance)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 border-slate-300 dark:border-slate-600">
                <span className="font-bold text-slate-800 dark:text-white">
                  {language === 'en' ? 'Additional Coverage Needed' : 'اضافی کوریج کی ضرورت'}
                </span>
                <span className="font-bold text-xl text-blue-600">
                  {formatCurrency(Math.max(0, recommendedCoverage - existingInsurance))}
                </span>
              </div>
            </div>
          </div>

          {(recommendedCoverage - existingInsurance) > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                {language === 'en' ? '💡 Recommendation' : '💡 سفارش'}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-400 mb-3">
                {language === 'en'
                  ? `Based on your profile, you need ${formatCurrency(Math.max(0, recommendedCoverage - existingInsurance))} additional life insurance coverage. This will ensure your family's financial security.`
                  : `آپ کے پروفائل کی بنیاد پر، آپ کو ${formatCurrency(Math.max(0, recommendedCoverage - existingInsurance))} اضافی لائف انشورنس کوریج کی ضرورت ہے۔ یہ آپ کے خاندان کی مالی سلامتی کو یقینی بنائے گا۔`
                }
              </p>
              <ul className="text-xs text-blue-600 dark:text-blue-400 space-y-1">
                <li>• {language === 'en' ? 'Buy pure term insurance (not endowment/ULIP)' : 'خالص ٹرم انشورنس خریدیں (اینڈومنٹ/یو ایل آئی پی نہیں)'}</li>
                <li>• {language === 'en' ? 'Compare quotes from 3-4 insurers' : '3-4 انشورنس کمپنیوں سے قیمتوں کا موازنہ کریں'}</li>
                <li>• {language === 'en' ? 'Consider 30-year term for best value' : 'بہترین قیمت کے لیے 30 سالہ ٹرم پر غور کریں'}</li>
                <li>• {language === 'en' ? 'Add critical illness rider for comprehensive protection' : 'جامع تحفظ کے لیے شدید بیماری رائیڈر شامل کریں'}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LifeInsuranceCalculator;