import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BMICalculator = ({ language, addToHistory, calculatorName }) => {
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [unit, setUnit] = useState('metric');

  const calculateBMI = () => {
    if (unit === 'metric') {
      const heightInMeters = height / 100;
      return weight / (heightInMeters * heightInMeters);
    } else {
      return (weight / (height * height)) * 703;
    }
  };

  const bmi = calculateBMI();
  
  const getCategory = (bmi) => {
    if (bmi < 18.5) return { name: language === 'en' ? 'Underweight' : 'کم وزن', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (bmi < 25) return { name: language === 'en' ? 'Normal' : 'نارمل', color: 'text-green-600', bg: 'bg-green-100' };
    if (bmi < 30) return { name: language === 'en' ? 'Overweight' : 'زیادہ وزن', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { name: language === 'en' ? 'Obese' : 'موٹاپا', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const category = getCategory(bmi);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setUnit('metric')}
            className={`flex-1 py-2 rounded-lg font-semibold ${unit === 'metric' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
            {language === 'en' ? 'Metric (kg/cm)' : 'میٹرک (کلو/سینٹی میٹر)'}
          </button>
          <button onClick={() => setUnit('imperial')}
            className={`flex-1 py-2 rounded-lg font-semibold ${unit === 'imperial' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-700'}`}>
            {language === 'en' ? 'Imperial (lbs/in)' : 'امپیریل (پاؤنڈ/انچ)'}
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Weight' : 'وزن'} ({unit === 'metric' ? 'kg' : 'lbs'})</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Height' : 'قد'} ({unit === 'metric' ? 'cm' : 'in'})</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:border-slate-600"
          />
        </div>

        <div className="text-center py-8">
          <div className="text-6xl font-bold text-indigo-600 mb-2">{bmi.toFixed(1)}</div>
          <div className={`inline-block px-6 py-2 rounded-full ${category.bg} ${category.color} font-bold text-lg`}>
            {category.name}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-6">
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-xs mb-1">&lt; 18.5</div>
            <div className="text-xs font-semibold">{language === 'en' ? 'Underweight' : 'کم وزن'}</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-xs mb-1">18.5 - 24.9</div>
            <div className="text-xs font-semibold">{language === 'en' ? 'Normal' : 'نارمل'}</div>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
            <div className="text-xs mb-1">25 - 29.9</div>
            <div className="text-xs font-semibold">{language === 'en' ? 'Overweight' : 'زیادہ وزن'}</div>
          </div>
          <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-xs mb-1">≥ 30</div>
            <div className="text-xs font-semibold">{language === 'en' ? 'Obese' : 'موٹاپا'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
