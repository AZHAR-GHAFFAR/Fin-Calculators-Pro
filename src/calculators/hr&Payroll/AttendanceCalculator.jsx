import React, { useState } from 'react';
import { Users, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency, currencySymbol } from '../../utils/currency';

const AttendanceCalculator = ({ language, addToHistory, calculatorName }) => {
  const [monthlySalary, setMonthlySalary] = useState(50000);
  const [totalWorkingDays, setTotalWorkingDays] = useState(26);
  const [presentDays, setPresentDays] = useState(24);
  const [leaves, setLeaves] = useState(2);
  const [halfDays, setHalfDays] = useState(0);
  const [lateMarks, setLateMarks] = useState(3);
  const [attendanceBonus, setAttendanceBonus] = useState(2000); // Full attendance bonus

  // Calculations
  const absentDays = totalWorkingDays - presentDays - leaves - halfDays;
  const totalPresent = presentDays + (halfDays * 0.5);
  const attendancePercentage = (totalPresent / totalWorkingDays) * 100;
  
  // Late marks deduction (3 lates = 1 absent typically)
  const lateDeduction = Math.floor(lateMarks / 3);
  const effectivePresent = Math.max(0, totalPresent - lateDeduction);
  
  // Salary calculation
  const perDaySalary = monthlySalary / totalWorkingDays;
  const earnedSalary = perDaySalary * effectivePresent;
  
  // Attendance bonus (only if 100% attendance)
  const bonusEligible = attendancePercentage >= 100 && lateMarks === 0;
  const finalSalary = earnedSalary + (bonusEligible ? attendanceBonus : 0);
  const deduction = monthlySalary - earnedSalary;

  // Chart data
  const chartData = [
    { 
      name: language === 'en' ? 'Present' : 'حاضر',
      days: presentDays,
      color: '#10B981'
    },
    { 
      name: language === 'en' ? 'Leaves' : 'چھٹیاں',
      days: leaves,
      color: '#F59E0B'
    },
    { 
      name: language === 'en' ? 'Half Days' : 'نصف دن',
      days: halfDays,
      color: '#3B82F6'
    },
    { 
      name: language === 'en' ? 'Absent' : 'غیر حاضر',
      days: absentDays,
      color: '#EF4444'
    }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="emerald"
        formula="Salary = (Monthly Salary ÷ Working Days) × Effective Present Days"
        variables={[
          { symbol: 'Present Days', nameEn: 'Full attendance days', nameUrdu: 'مکمل حاضری کے دن' },
          { symbol: 'Half Days', nameEn: 'Counted as 0.5 days', nameUrdu: '0.5 دن کے طور پر شمار' },
          { symbol: 'Late Marks', nameEn: '3 lates = 1 absent (typical)', nameUrdu: '3 لیٹ = 1 غیر حاضر (عام)' },
          { symbol: 'Leaves', nameEn: 'Paid leaves (no deduction)', nameUrdu: 'تنخواہ دار چھٹیاں (کوئی کٹوتی نہیں)' }
        ]}
        example={[
          { labelEn: 'Monthly Salary', labelUrdu: 'ماہانہ تنخواہ', value: 'Rs. 50,000' },
          { labelEn: 'Working Days', labelUrdu: 'کام کے دن', value: '26 days' },
          { labelEn: 'Present', labelUrdu: 'حاضر', value: '24 days' },
          { labelEn: 'Leaves', labelUrdu: 'چھٹیاں', value: '2 days (paid)' },
          { labelEn: 'Attendance %', labelUrdu: 'حاضری %', value: '100%' },
          { labelEn: 'Salary', labelUrdu: 'تنخواہ', value: 'Rs. 50,000 + Rs. 2,000 bonus' }
        ]}
        terms={[
          {
            titleEn: 'Attendance Percentage',
            titleUrdu: 'حاضری کا فیصد',
            descEn: '(Present Days ÷ Total Days) × 100. Above 95% considered excellent in Pakistan.',
            descUrdu: '(حاضر دن ÷ کل دن) × 100۔ پاکستان میں 95% سے اوپر بہترین سمجھا جاتا ہے۔'
          },
          {
            titleEn: 'Late Marks Policy',
            titleUrdu: 'لیٹ مارکس پالیسی',
            descEn: 'Typically 3 late marks = 1 absent. Some companies: 5-10 mins grace period.',
            descUrdu: 'عام طور پر 3 لیٹ مارکس = 1 غیر حاضر۔ کچھ کمپنیاں: 5-10 منٹ کی رعایت۔'
          },
          {
            titleEn: 'Attendance Bonus',
            titleUrdu: 'حاضری بونس',
            descEn: 'Extra Rs. 1,000-3,000 for 100% attendance. Encourages punctuality & presence.',
            descUrdu: '100% حاضری کے لیے اضافی Rs. 1,000-3,000۔ وقت کی پابندی اور موجودگی کی حوصلہ افزائی۔'
          }
        ]}
        note={{
          en: 'Attendance policies vary by company. Paid leaves (casual, sick, earned) usually don\'t affect salary. Unpaid absences deducted per-day. Grace period for lates: 5-15 minutes typical.',
          urdu: 'حاضری کی پالیسیاں کمپنی کے لحاظ سے مختلف ہوتی ہیں۔ تنخواہ دار چھٹیاں (آرام، بیمار، حاصل شدہ) عام طور پر تنخواہ کو متاثر نہیں کرتیں۔ بلا تنخواہ غیر حاضریاں فی دن کاٹی جاتی ہیں۔ لیٹ کے لیے رعایت: 5-15 منٹ عام۔'
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" />
            {language === 'en' ? 'Attendance Details' : 'حاضری کی تفصیلات'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? `Monthly Salary (${currencySymbol})` : `ماہانہ تنخواہ (${currencySymbol})`}
              </label>
              <input type="number" value={monthlySalary} onChange={(e) => setMonthlySalary(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? 'Total Working Days' : 'کل کام کے دن'}
              </label>
              <input type="number" min="20" max="31" value={totalWorkingDays} 
                onChange={(e) => setTotalWorkingDays(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? 'Present Days' : 'حاضر دن'}
              </label>
              <input type="range" min="0" max={totalWorkingDays} value={presentDays}
                onChange={(e) => setPresentDays(parseFloat(e.target.value))}
                className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg" />
              <input type="number" value={presentDays} onChange={(e) => setPresentDays(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? 'Paid Leaves' : 'تنخواہ دار چھٹیاں'}
              </label>
              <input type="number" min="0" max="10" value={leaves}
                onChange={(e) => setLeaves(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? 'Half Days' : 'نصف دن'}
              </label>
              <input type="number" min="0" max="5" value={halfDays}
                onChange={(e) => setHalfDays(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? 'Late Marks' : 'لیٹ مارکس'}
              </label>
              <input type="number" min="0" max="20" value={lateMarks}
                onChange={(e) => setLateMarks(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              <p className="text-xs text-slate-500 mt-1">
                {language === 'en' ? `3 lates = 1 absent (${lateDeduction} day deduction)` : `3 لیٹ = 1 غیر حاضر (${lateDeduction} دن کٹوتی)`}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? `Attendance Bonus (${currencySymbol})` : `حاضری بونس (${currencySymbol})`}
              </label>
              <input type="number" value={attendanceBonus} onChange={(e) => setAttendanceBonus(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
              <p className="text-xs text-slate-500 mt-1">
                {language === 'en' ? 'Only for 100% attendance with 0 lates' : 'صرف 100% حاضری اور 0 لیٹ کے لیے'}
              </p>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `${attendancePercentage.toFixed(1)}% attendance: ${formatCurrency(finalSalary)}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Salary' : 'تنخواہ کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className={`bg-gradient-to-br ${attendancePercentage >= 95 ? 'from-green-500 to-emerald-600' : attendancePercentage >= 80 ? 'from-orange-500 to-amber-600' : 'from-red-500 to-orange-600'} rounded-2xl p-6 text-white`}>
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Attendance %' : 'حاضری %'}</div>
              <div className="text-4xl font-bold">{attendancePercentage.toFixed(1)}%</div>
              <div className="text-xs opacity-75 mt-1 flex items-center gap-1">
                {attendancePercentage >= 95 ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {attendancePercentage >= 95 ? (language === 'en' ? 'Excellent' : 'بہترین') : 
                 attendancePercentage >= 80 ? (language === 'en' ? 'Good' : 'اچھا') : 
                 (language === 'en' ? 'Needs Improvement' : 'بہتری کی ضرورت')}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Final Salary' : 'حتمی تنخواہ'}</div>
              <div className="text-3xl font-bold">{formatCurrency(finalSalary)}</div>
              <div className="text-xs opacity-75 mt-1">
                {bonusEligible ? `+${formatCurrency(attendanceBonus)} bonus` : 'No bonus'}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Attendance Breakdown' : 'حاضری کی تفصیل'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="days" fill="#10B981" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Salary Breakdown' : 'تنخواہ کی تفصیل'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Per Day Salary' : 'فی دن تنخواہ'}</span>
                <span className="font-bold">{formatCurrency(perDaySalary)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Effective Present' : 'مؤثر حاضر'}</span>
                <span className="font-bold text-green-600">{effectivePresent.toFixed(1)} days</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Earned Salary' : 'کمائی شدہ تنخواہ'}</span>
                <span className="font-bold text-blue-600">{formatCurrency(earnedSalary)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Attendance Bonus' : 'حاضری بونس'}</span>
                <span className={`font-bold ${bonusEligible ? 'text-green-600' : 'text-red-600'}`}>
                  {bonusEligible ? `+${formatCurrency(attendanceBonus)}` : formatCurrency(0)}
                </span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Deduction' : 'کٹوتی'}</span>
                <span className="font-bold text-red-600">-{formatCurrency(deduction)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg -mx-3">
                <span className="font-bold text-lg">{language === 'en' ? 'Final Salary' : 'حتمی تنخواہ'}</span>
                <span className="font-bold text-2xl text-blue-600">{formatCurrency(finalSalary)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Summary' : 'خلاصہ'}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{presentDays}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{language === 'en' ? 'Present' : 'حاضر'}</div>
              </div>
              <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{leaves}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{language === 'en' ? 'Leaves' : 'چھٹیاں'}</div>
              </div>
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{halfDays}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{language === 'en' ? 'Half Days' : 'نصف دن'}</div>
              </div>
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{absentDays}</div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{language === 'en' ? 'Absent' : 'غیر حاضر'}</div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3">
              {language === 'en' ? '✅ Attendance Tips' : '✅ حاضری کے نکات'}
            </h4>
            <ul className="text-sm text-emerald-700 dark:text-emerald-400 space-y-2">
              <li>• {language === 'en' ? 'Maintain 95%+ for excellent rating' : 'بہترین درجہ بندی کے لیے 95%+ برقرار رکھیں'}</li>
              <li>• {language === 'en' ? '3 late marks = 1 absent (typical)' : '3 لیٹ مارکس = 1 غیر حاضر (عام)'}</li>
              <li>• {language === 'en' ? '100% attendance earns bonus' : '100% حاضری بونس کماتی ہے'}</li>
              <li>• {language === 'en' ? 'Use paid leaves wisely' : 'تنخواہ دار چھٹیاں دانشمندی سے استعمال کریں'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalculator;