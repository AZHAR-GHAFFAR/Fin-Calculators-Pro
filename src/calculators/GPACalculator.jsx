import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

const GPACalculator = ({ language, addToHistory, calculatorName }) => {
  const [subjects, setSubjects] = useState([
    { name: '', credits: 3, grade: 4.0 }
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { name: '', credits: 3, grade: 4.0 }]);
  };

  const removeSubject = (index) => {
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const calculateGPA = () => {
    const totalCredits = subjects.reduce((sum, s) => sum + parseFloat(s.credits || 0), 0);
    const totalPoints = subjects.reduce((sum, s) => sum + (parseFloat(s.credits || 0) * parseFloat(s.grade || 0)), 0);
    return totalCredits > 0 ? totalPoints / totalCredits : 0;
  };

  const gpa = calculateGPA();

  const gradeOptions = [
    { label: 'A+ (4.0)', value: 4.0 },
    { label: 'A (3.7)', value: 3.7 },
    { label: 'B+ (3.3)', value: 3.3 },
    { label: 'B (3.0)', value: 3.0 },
    { label: 'C+ (2.7)', value: 2.7 },
    { label: 'C (2.0)', value: 2.0 },
    { label: 'D (1.0)', value: 1.0 },
    { label: 'F (0.0)', value: 0.0 }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <div key={index} className="flex gap-4 items-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <input
                type="text"
                placeholder={language === 'en' ? 'Subject Name' : 'مضمون کا نام'}
                value={subject.name}
                onChange={(e) => updateSubject(index, 'name', e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg dark:bg-slate-600 dark:border-slate-500"
              />
              <input
                type="number"
                placeholder={language === 'en' ? 'Credits' : 'کریڈٹس'}
                value={subject.credits}
                onChange={(e) => updateSubject(index, 'credits', e.target.value)}
                className="w-24 px-4 py-2 border rounded-lg dark:bg-slate-600 dark:border-slate-500"
              />
              <select
                value={subject.grade}
                onChange={(e) => updateSubject(index, 'grade', e.target.value)}
                className="w-32 px-4 py-2 border rounded-lg dark:bg-slate-600 dark:border-slate-500"
              >
                {gradeOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {subjects.length > 1 && (
                <button onClick={() => removeSubject(index)}
                  className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button onClick={addSubject}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-indigo-600 dark:hover:border-indigo-400 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold">
          <Plus className="w-5 h-5" />
          {language === 'en' ? 'Add Subject' : 'مضمون شامل کریں'}
        </button>

        <div className="mt-8 text-center py-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
          <div className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">{language === 'en' ? 'Your GPA' : 'آپ کا جی پی اے'}</div>
          <div className="text-6xl font-bold text-indigo-600">{gpa.toFixed(2)}</div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mt-2">{language === 'en' ? 'out of 4.0' : '4.0 میں سے'}</div>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
