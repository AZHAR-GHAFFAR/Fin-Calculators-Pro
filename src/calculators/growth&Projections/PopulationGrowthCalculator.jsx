import React, { useState, useMemo } from 'react';
import { Users } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';

const PopulationGrowthCalculator = ({ language, addToHistory, calculatorName }) => {
  const [currentPopulation, setCurrentPopulation] = useState(220000000); // Pakistan 2023
  const [growthRate, setGrowthRate] = useState(2.0); // Pakistan's rate
  const [years, setYears] = useState(20);
  const [birthRate, setBirthRate] = useState(28); // per 1000
  const [deathRate, setDeathRate] = useState(7); // per 1000

  // Natural growth rate from birth/death rates
  const naturalGrowthRate = ((birthRate - deathRate) / 10);

  // Generate population projections
  const projections = useMemo(() => {
    const data = [];
    for (let year = 0; year <= years; year++) {
      const population = currentPopulation * Math.pow(1 + growthRate / 100, year);
      const births = (population * birthRate) / 1000;
      const deaths = (population * deathRate) / 1000;
      
      data.push({
        year: year,
        yearLabel: `${2024 + year}`,
        population: population,
        births: births,
        deaths: deaths,
        naturalIncrease: births - deaths
      });
    }
    return data;
  }, [currentPopulation, growthRate, years, birthRate, deathRate]);

  const finalPopulation = projections[years].population;
  const totalGrowth = finalPopulation - currentPopulation;
  const doublingTime = 70 / growthRate; // Rule of 70

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="blue"
        formula="Future Population = Current Population × (1 + r)^t"
        variables={[
          { symbol: 'P₀', nameEn: 'Current population', nameUrdu: 'موجودہ آبادی' },
          { symbol: 'r', nameEn: 'Growth rate (as decimal)', nameUrdu: 'ترقی کی شرح (اعشاریہ میں)' },
          { symbol: 't', nameEn: 'Time in years', nameUrdu: 'سالوں میں وقت' },
          { symbol: 'Natural Growth', nameEn: 'Birth Rate - Death Rate', nameUrdu: 'پیدائش کی شرح - موت کی شرح' }
        ]}
        example={[
          { labelEn: 'Pakistan 2024', labelUrdu: 'پاکستان 2024', value: '220 million' },
          { labelEn: 'Growth Rate', labelUrdu: 'ترقی کی شرح', value: '2.0% per year' },
          { labelEn: 'Birth Rate', labelUrdu: 'پیدائش کی شرح', value: '28 per 1,000' },
          { labelEn: 'Death Rate', labelUrdu: 'موت کی شرح', value: '7 per 1,000' },
          { labelEn: '2044 Population', labelUrdu: '2044 آبادی', value: '327 million (49% increase)' },
          { labelEn: 'Doubling Time', labelUrdu: 'دگنا ہونے کا وقت', value: '35 years (by 2059)' }
        ]}
        terms={[
          {
            titleEn: 'Natural Growth Rate',
            titleUrdu: 'قدرتی ترقی کی شرح',
            descEn: '(Birth Rate - Death Rate) ÷ 10. Shows population growth from births/deaths only.',
            descUrdu: '(پیدائش کی شرح - موت کی شرح) ÷ 10۔ صرف پیدائش/موت سے آبادی کی ترقی دکھاتا ہے۔'
          },
          {
            titleEn: 'Rule of 70',
            titleUrdu: '70 کا اصول',
            descEn: 'Doubling time ≈ 70 ÷ growth rate%. Pakistan at 2%, doubles in 35 years.',
            descUrdu: 'دگنا ہونے کا وقت ≈ 70 ÷ ترقی کی شرح%۔ پاکستان 2% پر، 35 سالوں میں دگنا ہو جاتا ہے۔'
          },
          {
            titleEn: 'Demographic Dividend',
            titleUrdu: 'ڈیموگرافک منافع',
            descEn: 'Young population = economic opportunity. But needs jobs, education, healthcare.',
            descUrdu: 'نوجوان آبادی = اقتصادی موقع۔ لیکن ملازمتوں، تعلیم، صحت کی دیکھ بھال کی ضرورت ہے۔'
          }
        ]}
        note={{
          en: 'Pakistan population growth rate declining from 3% (1990s) to 2% (2020s). UN projects 403 million by 2100. Growth rates vary by province and urban/rural areas.',
          urdu: 'پاکستان کی آبادی میں اضافے کی شرح 3% (1990s) سے گھٹ کر 2% (2020s) ہو گئی۔ UN 2100 تک 403 ملین کی پیشن گوئی کرتا ہے۔ ترقی کی شرحیں صوبے اور شہری/دیہی علاقوں کے لحاظ سے مختلف ہوتی ہیں۔'
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            {language === 'en' ? 'Population Parameters' : 'آبادی کے پیرامیٹرز'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Current Population' : 'موجودہ آبادی'}</label>
              <input type="number" value={currentPopulation} onChange={(e) => setCurrentPopulation(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              <p className="text-xs text-slate-500 mt-1">{(currentPopulation / 1000000).toFixed(1)} million</p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Growth Rate (% per year)' : 'ترقی کی شرح (% فی سال)'}</label>
              <input type="range" min="0" max="5" step="0.1" value={growthRate}
                onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg" />
              <input type="number" step="0.1" value={growthRate} onChange={(e) => setGrowthRate(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Birth Rate (per 1,000)' : 'پیدائش کی شرح (فی 1,000)'}</label>
              <input type="number" value={birthRate} onChange={(e) => setBirthRate(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Death Rate (per 1,000)' : 'موت کی شرح (فی 1,000)'}</label>
              <input type="number" value={deathRate} onChange={(e) => setDeathRate(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Years to Project' : 'پیشن گوئی کے سال'}</label>
              <input type="range" min="5" max="50" value={years} onChange={(e) => setYears(parseFloat(e.target.value))}
                className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg" />
              <input type="number" value={years} onChange={(e) => setYears(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${(currentPopulation/1000000).toFixed(0)}M → ${(finalPopulation/1000000).toFixed(0)}M in ${years} years` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Project Population' : 'آبادی کی پیشن گوئی'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? `Population ${2024 + years}` : `${2024 + years} آبادی`}</div>
              <div className="text-3xl font-bold">{(finalPopulation / 1000000).toFixed(0)}M</div>
              <div className="text-xs opacity-75 mt-1">{((totalGrowth/currentPopulation)*100).toFixed(0)}% {language === 'en' ? 'growth' : 'ترقی'}</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Doubling Time' : 'دگنا ہونے کا وقت'}</div>
              <div className="text-3xl font-bold">{doublingTime.toFixed(1)}</div>
              <div className="text-xs opacity-75 mt-1">{language === 'en' ? 'years' : 'سال'}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Growth Rates' : 'ترقی کی شرحیں'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Overall Growth Rate' : 'مجموعی ترقی کی شرح'}</span>
                <span className="font-bold text-blue-600">{growthRate}%</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Natural Growth Rate' : 'قدرتی ترقی کی شرح'}</span>
                <span className="font-bold text-green-600">{naturalGrowthRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Birth Rate' : 'پیدائش کی شرح'}</span>
                <span className="font-bold">{birthRate}/1000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">{language === 'en' ? 'Death Rate' : 'موت کی شرح'}</span>
                <span className="font-bold">{deathRate}/1000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Population Projection' : 'آبادی کی پیشن گوئی'}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={projections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="yearLabel" fontSize={11} />
              <YAxis fontSize={12} tickFormatter={(value) => `${(value/1000000).toFixed(0)}M`} />
              <Tooltip formatter={(value) => `${(value/1000000).toFixed(2)} million`} />
              <Legend />
              <Area type="monotone" dataKey="population" stroke="#3B82F6" fill="#93C5FD" 
                name={language === 'en' ? 'Population' : 'آبادی'} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Births vs Deaths' : 'پیدائشیں بمقابلہ اموات'}</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={projections}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="yearLabel" fontSize={11} />
              <YAxis fontSize={12} tickFormatter={(value) => `${(value/1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => `${(value/1000000).toFixed(2)} million`} />
              <Legend />
              <Line type="monotone" dataKey="births" stroke="#10B981" strokeWidth={2} name={language === 'en' ? 'Births' : 'پیدائشیں'} />
              <Line type="monotone" dataKey="deaths" stroke="#EF4444" strokeWidth={2} name={language === 'en' ? 'Deaths' : 'اموات'} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-3">
            {language === 'en' ? '🌍 Pakistan Population Facts' : '🌍 پاکستان کی آبادی کے حقائق'}
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
            <li>• {language === 'en' ? '5th most populous country in the world (2024)' : 'دنیا کا 5واں سب سے زیادہ آبادی والا ملک (2024)'}</li>
            <li>• {language === 'en' ? '36% population under age 15 (young demographic)' : '15 سال سے کم عمر میں 36% آبادی (نوجوان ڈیموگرافک)'}</li>
            <li>• {language === 'en' ? 'Growth rate decreased from 3% (1990s) to 2% (2020s)' : 'ترقی کی شرح 3% (1990s) سے گھٹ کر 2% (2020s) ہو گئی'}</li>
            <li>• {language === 'en' ? 'UN projects 403 million by 2100 (medium variant)' : 'UN 2100 تک 403 ملین کی پیشن گوئی کرتا ہے (درمیانی متغیر)'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PopulationGrowthCalculator;