import React, { useState } from 'react';
import { TrendingUp, Target, Award } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const PerformanceBonusCalculator = ({ language, addToHistory, calculatorName }) => {
  const [basicSalary, setBasicSalary] = useState(50000);
  const [bonusPercentage, setBonusPercentage] = useState(100); // % of basic salary as max bonus
  
  // KPI scores (0-100)
  const [kpis, setKpis] = useState({
    productivity: 85,
    quality: 90,
    attendance: 95,
    teamwork: 80,
    innovation: 75
  });

  const [weights, setWeights] = useState({
    productivity: 30,
    quality: 25,
    attendance: 20,
    teamwork: 15,
    innovation: 10
  });

  // Calculate weighted score
  const weightedScore = Object.keys(kpis).reduce((total, key) => {
    return total + (kpis[key] * weights[key]) / 100;
  }, 0);

  const overallPercentage = weightedScore;
  
  // Bonus calculation
  const maxBonus = (basicSalary * bonusPercentage) / 100;
  const earnedBonus = (maxBonus * overallPercentage) / 100;

  // Performance rating
  let rating, ratingColor;
  if (overallPercentage >= 90) {
    rating = language === 'en' ? 'Outstanding (A+)' : 'شاندار (A+)';
    ratingColor = 'emerald';
  } else if (overallPercentage >= 80) {
    rating = language === 'en' ? 'Excellent (A)' : 'بہترین (A)';
    ratingColor = 'green';
  } else if (overallPercentage >= 70) {
    rating = language === 'en' ? 'Good (B)' : 'اچھا (B)';
    ratingColor = 'blue';
  } else if (overallPercentage >= 60) {
    rating = language === 'en' ? 'Satisfactory (C)' : 'تسلی بخش (C)';
    ratingColor = 'orange';
  } else {
    rating = language === 'en' ? 'Needs Improvement (D)' : 'بہتری کی ضرورت (D)';
    ratingColor = 'red';
  }

  // Radar chart data
  const radarData = [
    { 
      kpi: language === 'en' ? 'Productivity' : 'پیداواریت',
      score: kpis.productivity,
      fullMark: 100
    },
    { 
      kpi: language === 'en' ? 'Quality' : 'معیار',
      score: kpis.quality,
      fullMark: 100
    },
    { 
      kpi: language === 'en' ? 'Attendance' : 'حاضری',
      score: kpis.attendance,
      fullMark: 100
    },
    { 
      kpi: language === 'en' ? 'Teamwork' : 'ٹیم ورک',
      score: kpis.teamwork,
      fullMark: 100
    },
    { 
      kpi: language === 'en' ? 'Innovation' : 'جدت',
      score: kpis.innovation,
      fullMark: 100
    }
  ];

  // Bar chart data
  const barData = Object.keys(kpis).map(key => ({
    name: language === 'en' ? 
      key.charAt(0).toUpperCase() + key.slice(1) :
      { productivity: 'پیداواریت', quality: 'معیار', attendance: 'حاضری', teamwork: 'ٹیم ورک', innovation: 'جدت' }[key],
    score: kpis[key],
    weight: weights[key],
    weighted: (kpis[key] * weights[key]) / 100
  }));

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="violet"
        formula="Bonus = (Basic × Bonus %) × (Weighted KPI Score ÷ 100)"
        variables={[
          { symbol: 'KPI Score', nameEn: 'Individual metric score (0-100)', nameUrdu: 'انفرادی میٹرک سکور (0-100)' },
          { symbol: 'Weight', nameEn: 'Importance of each KPI (%)', nameUrdu: 'ہر KPI کی اہمیت (%)' },
          { symbol: 'Weighted Score', nameEn: 'Σ(Score × Weight) ÷ 100', nameUrdu: 'Σ(سکور × وزن) ÷ 100' }
        ]}
        example={[
          { labelEn: 'Basic Salary', labelUrdu: 'بنیادی تنخواہ', value: 'Rs. 50,000' },
          { labelEn: 'Max Bonus', labelUrdu: 'زیادہ سے زیادہ بونس', value: '100% = Rs. 50,000' },
          { labelEn: 'KPI Score', labelUrdu: 'KPI سکور', value: '85% weighted average' },
          { labelEn: 'Earned Bonus', labelUrdu: 'حاصل شدہ بونس', value: 'Rs. 42,500 (85% of max)' },
          { labelEn: 'Rating', labelUrdu: 'درجہ بندی', value: 'Excellent (A)' }
        ]}
        terms={[
          {
            titleEn: 'KPI (Key Performance Indicator)',
            titleUrdu: 'KPI (اہم کارکردگی اشارہ)',
            descEn: 'Measurable metrics: productivity, quality, attendance, etc. Each scored 0-100.',
            descUrdu: 'قابل پیمائش میٹرکس: پیداواریت، معیار، حاضری، وغیرہ۔ ہر ایک 0-100 سکور۔'
          },
          {
            titleEn: 'Weighted Score',
            titleUrdu: 'وزنی سکور',
            descEn: 'Not all KPIs equal. Weights show importance. Sum of weights must = 100%.',
            descUrdu: 'تمام KPIs برابر نہیں۔ وزن اہمیت دکھاتے ہیں۔ وزن کا مجموعہ 100% ہونا چاہیے۔'
          },
          {
            titleEn: 'Performance Ratings',
            titleUrdu: 'کارکردگی کی درجہ بندی',
            descEn: 'A+ (90-100): Outstanding. A (80-89): Excellent. B (70-79): Good. C (60-69): OK.',
            descUrdu: 'A+ (90-100): شاندار۔ A (80-89): بہترین۔ B (70-79): اچھا۔ C (60-69): ٹھیک۔'
          }
        ]}
        note={{
          en: 'Performance bonus varies greatly by company (0-200% of basic). KPIs should be SMART: Specific, Measurable, Achievable, Relevant, Time-bound. Quarterly/annual reviews typical.',
          urdu: 'کارکردگی بونس کمپنی کے لحاظ سے بہت مختلف ہوتا ہے (بنیادی کا 0-200%)۔ KPIs SMART ہونے چاہئیں: مخصوص، قابل پیمائش، قابل حصول، متعلقہ، وقت کی پابند۔ سہ ماہی/سالانہ جائزے عام۔'
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-violet-600" />
            {language === 'en' ? 'KPI Settings' : 'KPI ترتیبات'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? 'Basic Salary (Rs.)' : 'بنیادی تنخواہ (Rs.)'}
              </label>
              <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? 'Max Bonus (% of Basic)' : 'زیادہ سے زیادہ بونس (بنیادی کا %)'}
              </label>
              <input type="range" min="0" max="200" step="10" value={bonusPercentage}
                onChange={(e) => setBonusPercentage(parseFloat(e.target.value))}
                className="w-full h-2 bg-violet-100 dark:bg-violet-900 rounded-lg" />
              <div className="flex justify-between mt-2">
                <input type="number" value={bonusPercentage} onChange={(e) => setBonusPercentage(parseFloat(e.target.value))}
                  className="w-20 px-2 py-1 border rounded dark:bg-slate-700 text-sm" />
                <span className="text-sm font-bold text-violet-600">{formatCurrency(maxBonus)}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-sm mb-4">{language === 'en' ? 'KPI Scores (0-100)' : 'KPI سکور (0-100)'}</h4>
              
              {Object.keys(kpis).map((key) => (
                <div key={key} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm capitalize">
                      {language === 'en' ? key : 
                        { productivity: 'پیداواریت', quality: 'معیار', attendance: 'حاضری', teamwork: 'ٹیم ورک', innovation: 'جدت' }[key]
                      }
                    </label>
                    <span className="text-sm font-bold text-violet-600">{kpis[key]}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={kpis[key]}
                    onChange={(e) => setKpis({...kpis, [key]: parseFloat(e.target.value)})}
                    className="w-full h-2 bg-violet-100 dark:bg-violet-900 rounded-lg" />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>{language === 'en' ? 'Weight:' : 'وزن:'} {weights[key]}%</span>
                    <span>{language === 'en' ? 'Contribution:' : 'شراکت:'} {((kpis[key] * weights[key]) / 100).toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${overallPercentage.toFixed(1)}% score: ${formatCurrency(earnedBonus)} bonus` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Bonus' : 'بونس کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className={`bg-gradient-to-br from-${ratingColor}-500 to-${ratingColor}-600 rounded-2xl p-6 text-white`}>
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Overall Score' : 'مجموعی سکور'}</div>
              <div className="text-4xl font-bold">{overallPercentage.toFixed(1)}%</div>
              <div className="text-xs opacity-75 mt-1 flex items-center gap-1">
                <Award className="w-4 h-4" />
                {rating}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Earned Bonus' : 'حاصل شدہ بونس'}</div>
              <div className="text-3xl font-bold">{formatCurrency(earnedBonus)}</div>
              <div className="text-xs opacity-75 mt-1">
                {((earnedBonus / maxBonus) * 100).toFixed(0)}% {language === 'en' ? 'of max' : 'زیادہ سے زیادہ کا'}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'KPI Performance Radar' : 'KPI کارکردگی ریڈار'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="kpi" fontSize={11} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
                <Radar name={language === 'en' ? 'Score' : 'سکور'} dataKey="score" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Weighted Contributions' : 'وزنی شراکتیں'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={10} />
                <YAxis fontSize={11} />
                <Tooltip />
                <Legend />
                <Bar dataKey="weighted" fill="#8B5CF6" radius={[8, 8, 0, 0]} name={language === 'en' ? 'Contribution' : 'شراکت'} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Bonus Breakdown' : 'بونس کی تفصیل'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Basic Salary' : 'بنیادی تنخواہ'}</span>
                <span className="font-bold">{formatCurrency(basicSalary)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Max Bonus' : 'زیادہ سے زیادہ بونس'}</span>
                <span className="font-bold text-blue-600">{formatCurrency(maxBonus)} ({bonusPercentage}%)</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Performance Score' : 'کارکردگی سکور'}</span>
                <span className="font-bold text-violet-600">{overallPercentage.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Rating' : 'درجہ بندی'}</span>
                <span className={`font-bold text-${ratingColor}-600`}>{rating}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 bg-violet-50 dark:bg-violet-900/20 p-3 rounded-lg -mx-3">
                <span className="font-bold text-lg">{language === 'en' ? 'Earned Bonus' : 'حاصل شدہ بونس'}</span>
                <span className="font-bold text-2xl text-violet-600">{formatCurrency(earnedBonus)}</span>
              </div>
            </div>
          </div>

          <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-6">
            <h4 className="font-bold text-violet-800 dark:text-violet-300 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {language === 'en' ? '🎯 Performance Tips' : '🎯 کارکردگی کے نکات'}
            </h4>
            <ul className="text-sm text-violet-700 dark:text-violet-400 space-y-2">
              <li>• {language === 'en' ? 'Focus on high-weight KPIs first' : 'پہلے زیادہ وزن والے KPIs پر توجہ دیں'}</li>
              <li>• {language === 'en' ? '90%+ score = Outstanding (max bonus)' : '90%+ سکور = شاندار (زیادہ سے زیادہ بونس)'}</li>
              <li>• {language === 'en' ? 'Set quarterly goals, track monthly' : 'سہ ماہی اہداف مقرر کریں، ماہانہ ٹریک کریں'}</li>
              <li>• {language === 'en' ? 'Document achievements for reviews' : 'جائزوں کے لیے کامیابیاں دستاویز کریں'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceBonusCalculator;