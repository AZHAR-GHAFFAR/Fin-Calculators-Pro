import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';

const WorkingHoursCalculator = ({ language, addToHistory, calculatorName }) => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('18:00');
  const [breakMinutes, setBreakMinutes] = useState(60);
  const [daysPerWeek, setDaysPerWeek] = useState(5);

  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  const totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
  const workMinutes = totalMinutes - breakMinutes;
  const dailyHours = workMinutes / 60;
  const weeklyHours = dailyHours * daysPerWeek;
  const monthlyHours = weeklyHours * 4.33;
  const yearlyHours = weeklyHours * 52;

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="indigo"
        formula="Working Hours = (End Time - Start Time - Break) × Days per Week"
        variables={[
          { symbol: 'Daily', nameEn: 'Hours worked per day', nameUrdu: 'روزانہ کام کے گھنٹے' },
          { symbol: 'Weekly', nameEn: 'Daily × Days per week', nameUrdu: 'روزانہ × ہفتے میں دن' },
          { symbol: 'Break', nameEn: 'Lunch/prayer break deducted', nameUrdu: 'لنچ/نماز کا وقفہ کٹا' }
        ]}
        example={[
          { labelEn: 'Shift', labelUrdu: 'شفٹ', value: '9 AM - 6 PM' },
          { labelEn: 'Break', labelUrdu: 'وقفہ', value: '1 hour' },
          { labelEn: 'Daily Hours', labelUrdu: 'روزانہ گھنٹے', value: '8 hours' },
          { labelEn: 'Weekly (5 days)', labelUrdu: 'ہفتہ وار (5 دن)', value: '40 hours' },
          { labelEn: 'Monthly', labelUrdy: 'ماہانہ', value: '173 hours' }
        ]}
        terms={[
          {
            titleEn: 'Standard Work Week',
            titleUrdu: 'معیاری کام کا ہفتہ',
            descEn: 'Pakistan: 48 hours/week (8 hrs × 6 days). Saturday half-day common. 5-day week in corporates.',
            descUrdu: 'پاکستان: 48 گھنٹے/ہفتہ (8 گھنٹے × 6 دن)۔ ہفتہ نصف دن عام۔ کارپوریٹس میں 5 دن کا ہفتہ۔'
          },
          {
            titleEn: 'Break Time',
            titleUrdu: 'وقفے کا وقت',
            descEn: '1 hour lunch + prayer breaks. Not counted in working hours. Mandatory under law.',
            descUrdu: '1 گھنٹہ لنچ + نماز کے وقفے۔ کام کے گھنٹوں میں شمار نہیں۔ قانون کے تحت لازمی۔'
          },
          {
            titleEn: 'Flexible Hours',
            titleUrdu: 'لچکدار گھنٹے',
            descEn: 'Some companies allow flexi-time. Core hours mandatory. Total 8-9 hours still required.',
            descUrdu: 'کچھ کمپنیاں لچکدار وقت کی اجازت دیتی ہیں۔ بنیادی گھنٹے لازمی۔ کل 8-9 گھنٹے پھر بھی ضروری۔'
          }
        ]}
        note={{
          en: 'Standard: 8 hours/day, 48 hours/week in Pakistan. Breaks excluded. OT after 8 hours. Friday half-day common. Remote work may have flexible hours.',
          urdu: 'معیاری: پاکستان میں 8 گھنٹے/دن، 48 گھنٹے/ہفتہ۔ وقفے خارج۔ 8 گھنٹے کے بعد OT۔ جمعہ نصف دن عام۔ ریموٹ کام میں لچکدار گھنٹے ہو سکتے ہیں۔'
        }}
      />

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            {language === 'en' ? 'Work Schedule' : 'کام کا شیڈول'}
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Start Time' : 'شروع کا وقت'}</label>
              <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'End Time' : 'ختم کا وقت'}</label>
              <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Break (minutes)' : 'وقفہ (منٹ)'}</label>
              <input type="number" value={breakMinutes} onChange={(e) => setBreakMinutes(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Days per Week' : 'ہفتے میں دن'}</label>
              <select value={daysPerWeek} onChange={(e) => setDaysPerWeek(parseFloat(e.target.value))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700">
                <option value="5">5 {language === 'en' ? 'days (Mon-Fri)' : 'دن (پیر-جمعہ)'}</option>
                <option value="5.5">5.5 {language === 'en' ? 'days (Sat half)' : 'دن (ہفتہ نصف)'}</option>
                <option value="6">6 {language === 'en' ? 'days (Mon-Sat)' : 'دن (پیر-ہفتہ)'}</option>
              </select>
            </div>
            <button onClick={() => {
              addToHistory({ calculatorName, result: `${dailyHours.toFixed(1)} hrs/day, ${weeklyHours.toFixed(0)} hrs/week` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Hours' : 'گھنٹوں کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Daily Work Hours' : 'روزانہ کام کے گھنٹے'}</div>
            <div className="text-4xl font-bold">{dailyHours.toFixed(1)}</div>
            <div className="text-xs opacity-75 mt-1">{language === 'en' ? 'hours per day' : 'گھنٹے فی دن'}</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Work Hours Summary' : 'کام کے گھنٹوں کا خلاصہ'}</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Per Day' : 'فی دن'}</span>
                <span className="font-bold text-indigo-600">{dailyHours.toFixed(2)} hrs</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Per Week' : 'فی ہفتہ'}</span>
                <span className="font-bold text-blue-600">{weeklyHours.toFixed(1)} hrs</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span className="text-sm">{language === 'en' ? 'Per Month' : 'فی ماہ'}</span>
                <span className="font-bold text-purple-600">{monthlyHours.toFixed(0)} hrs</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Per Year' : 'فی سال'}</span>
                <span className="font-bold text-xl text-indigo-600">{yearlyHours.toFixed(0)} hrs</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6">
            <h4 className="font-bold text-indigo-800 dark:text-indigo-300 mb-3">
              {language === 'en' ? '⏰ Work Hour Tips' : '⏰ کام کے گھنٹوں کے نکات'}
            </h4>
            <ul className="text-sm text-indigo-700 dark:text-indigo-400 space-y-2">
              <li>• {language === 'en' ? 'Standard: 8 hours/day, 48 hours/week' : 'معیاری: 8 گھنٹے/دن، 48 گھنٹے/ہفتہ'}</li>
              <li>• {language === 'en' ? 'Lunch break: 1 hour (not counted)' : 'لنچ وقفہ: 1 گھنٹہ (شمار نہیں)'}</li>
              <li>• {language === 'en' ? 'OT rate applies after 8 hours' : '8 گھنٹے بعد OT شرح لاگو'}</li>
              <li>• {language === 'en' ? 'Friday: Often half-day (4-5 hours)' : 'جمعہ: اکثر نصف دن (4-5 گھنٹے)'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingHoursCalculator;