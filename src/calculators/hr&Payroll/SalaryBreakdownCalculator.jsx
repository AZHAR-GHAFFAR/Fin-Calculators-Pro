import React, { useState } from 'react';
import { DollarSign, PieChart } from 'lucide-react';
import { PieChart as RechartPie, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const SalaryBreakdownCalculator = ({ language, addToHistory, calculatorName }) => {
  const [basicSalary, setBasicSalary] = useState(50000);
  const [allowances, setAllowances] = useState({
    house: 40, // % of basic
    medical: 10,
    transport: 10,
    utility: 5,
    other: 5
  });

  // Calculate allowances in rupees
  const houseAllowance = (basicSalary * allowances.house) / 100;
  const medicalAllowance = (basicSalary * allowances.medical) / 100;
  const transportAllowance = (basicSalary * allowances.transport) / 100;
  const utilityAllowance = (basicSalary * allowances.utility) / 100;
  const otherAllowance = (basicSalary * allowances.other) / 100;

  // Gross salary
  const grossSalary = basicSalary + houseAllowance + medicalAllowance + transportAllowance + utilityAllowance + otherAllowance;

  // Deductions
  const eobi = Math.min(basicSalary * 0.01, 250); // 1% capped at Rs. 250
  const sessi = basicSalary * 0.006; // 0.6% of basic
  const incomeTax = grossSalary > 50000 ? (grossSalary - 50000) * 0.025 : 0; // Simplified 2.5% above 50K

  // Total deductions
  const totalDeductions = eobi + sessi + incomeTax;

  // Net salary
  const netSalary = grossSalary - totalDeductions;

  const chartData = [
    { name: language === 'en' ? 'Basic Salary' : 'بنیادی تنخواہ', value: basicSalary, color: '#3B82F6' },
    { name: language === 'en' ? 'House Allowance' : 'مکان الاؤنس', value: houseAllowance, color: '#10B981' },
    { name: language === 'en' ? 'Medical' : 'طبی', value: medicalAllowance, color: '#F59E0B' },
    { name: language === 'en' ? 'Transport' : 'نقل و حمل', value: transportAllowance, color: '#EF4444' },
    { name: language === 'en' ? 'Utility' : 'یوٹیلیٹی', value: utilityAllowance, color: '#8B5CF6' },
    { name: language === 'en' ? 'Other' : 'دیگر', value: otherAllowance, color: '#EC4899' }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="teal"
        formula="Net Salary = Gross Salary - (EOBI + SESSI + Income Tax)"
        variables={[
          { symbol: 'Basic Salary', nameEn: 'Core salary (40-60% of CTC)', nameUrdu: 'بنیادی تنخواہ (CTC کا 40-60%)' },
          { symbol: 'Gross Salary', nameEn: 'Basic + All Allowances', nameUrdu: 'بنیادی + تمام الاؤنسز' },
          { symbol: 'EOBI', nameEn: '1% of basic (max Rs. 250)', nameUrdu: 'بنیادی کا 1% (زیادہ سے زیادہ Rs. 250)' },
          { symbol: 'SESSI', nameEn: '0.6% of basic (Social Security)', nameUrdu: 'بنیادی کا 0.6% (سوشل سیکیورٹی)' }
        ]}
        example={[
          { labelEn: 'Basic Salary', labelUrdu: 'بنیادی تنخواہ', value: 'Rs. 50,000' },
          { labelEn: 'House Allowance', labelUrdu: 'مکان الاؤنس', value: 'Rs. 20,000 (40%)' },
          { labelEn: 'Other Allowances', labelUrdu: 'دیگر الاؤنسز', value: 'Rs. 15,000' },
          { labelEn: 'Gross Salary', labelUrdu: 'مجموعی تنخواہ', value: 'Rs. 85,000' },
          { labelEn: 'Deductions', labelUrdu: 'کٹوتیاں', value: 'Rs. 1,425 (EOBI+SESSI+Tax)' },
          { labelEn: 'Net Salary', labelUrdu: 'خالص تنخواہ', value: 'Rs. 83,575' }
        ]}
        terms={[
          {
            titleEn: 'Basic vs Gross',
            titleUrdu: 'بنیادی بمقابلہ مجموعی',
            descEn: 'Basic = core salary. Gross = Basic + all allowances. Net = Gross - deductions.',
            descUrdu: 'بنیادی = بنیادی تنخواہ۔ مجموعی = بنیادی + تمام الاؤنسز۔ خالص = مجموعی - کٹوتیاں۔'
          },
          {
            titleEn: 'House Allowance',
            titleUrdu: 'مکان الاؤنس',
            descEn: 'Typically 40-50% of basic. Tax-free up to 45% in Pakistan. Essential component.',
            descUrdu: 'عام طور پر بنیادی کا 40-50%۔ پاکستان میں 45% تک ٹیکس فری۔ ضروری جزو۔'
          },
          {
            titleEn: 'EOBI & SESSI',
            titleUrdu: 'EOBI اور SESSI',
            descEn: 'Mandatory in Pakistan. EOBI: old age benefits. SESSI: social security. Total ~1.6%.',
            descUrdu: 'پاکستان میں لازمی۔ EOBI: بڑھاپے کے فوائد۔ SESSI: سماجی تحفظ۔ کل ~1.6%۔'
          }
        ]}
        note={{
          en: 'Salary structure varies by company. Government has minimum wage Rs. 32,000 (2024). Tax slabs change yearly - consult FBR. EOBI/SESSI mandatory for companies with 10+ employees.',
          urdu: 'تنخواہ کا ڈھانچہ کمپنی کے لحاظ سے مختلف ہوتا ہے۔ حکومت نے کم از کم اجرت Rs. 32,000 (2024)۔ ٹیکس سلیب سالانہ تبدیل ہوتے ہیں - FBR سے مشورہ کریں۔ 10+ ملازمین والی کمپنیوں کے لیے EOBI/SESSI لازمی۔'
        }}
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-teal-600" />
            {language === 'en' ? 'Salary Components' : 'تنخواہ کے اجزاء'}
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === 'en' ? 'Basic Salary (Rs.)' : 'بنیادی تنخواہ (Rs.)'}
              </label>
              <input type="range" min="20000" max="200000" step="5000" value={basicSalary}
                onChange={(e) => setBasicSalary(parseFloat(e.target.value))}
                className="w-full h-2 bg-teal-100 dark:bg-teal-900 rounded-lg" />
              <input type="number" value={basicSalary} onChange={(e) => setBasicSalary(parseFloat(e.target.value))}
                className="w-full mt-2 px-4 py-2 border rounded-lg dark:bg-slate-700" />
            </div>

            <div className="space-y-4 border-t pt-4">
              <h4 className="font-semibold text-sm text-slate-600 dark:text-slate-400">
                {language === 'en' ? 'Allowances (% of Basic)' : 'الاؤنسز (بنیادی کا %)'}
              </h4>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm">{language === 'en' ? 'House Rent' : 'مکان کرایہ'}</label>
                  <span className="text-sm font-bold text-teal-600">{allowances.house}%</span>
                </div>
                <input type="range" min="0" max="50" value={allowances.house}
                  onChange={(e) => setAllowances({...allowances, house: parseFloat(e.target.value)})}
                  className="w-full h-2 bg-teal-100 dark:bg-teal-900 rounded-lg" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm">{language === 'en' ? 'Medical' : 'طبی'}</label>
                  <span className="text-sm font-bold text-green-600">{allowances.medical}%</span>
                </div>
                <input type="range" min="0" max="20" value={allowances.medical}
                  onChange={(e) => setAllowances({...allowances, medical: parseFloat(e.target.value)})}
                  className="w-full h-2 bg-green-100 dark:bg-green-900 rounded-lg" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm">{language === 'en' ? 'Transport' : 'نقل و حمل'}</label>
                  <span className="text-sm font-bold text-blue-600">{allowances.transport}%</span>
                </div>
                <input type="range" min="0" max="20" value={allowances.transport}
                  onChange={(e) => setAllowances({...allowances, transport: parseFloat(e.target.value)})}
                  className="w-full h-2 bg-blue-100 dark:bg-blue-900 rounded-lg" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm">{language === 'en' ? 'Utility' : 'یوٹیلیٹی'}</label>
                  <span className="text-sm font-bold text-purple-600">{allowances.utility}%</span>
                </div>
                <input type="range" min="0" max="15" value={allowances.utility}
                  onChange={(e) => setAllowances({...allowances, utility: parseFloat(e.target.value)})}
                  className="w-full h-2 bg-purple-100 dark:bg-purple-900 rounded-lg" />
              </div>
            </div>

            <button onClick={() => {
              addToHistory({ calculatorName, result: `Gross: ${formatCurrency(grossSalary)} → Net: ${formatCurrency(netSalary)}` });
              toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
            }}
              className="w-full bg-gradient-to-r from-teal-600 to-green-600 text-white font-bold py-3 rounded-xl">
              {language === 'en' ? 'Calculate Salary' : 'تنخواہ کا حساب'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-teal-500 to-green-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Gross Salary' : 'مجموعی تنخواہ'}</div>
              <div className="text-3xl font-bold">{formatCurrency(grossSalary)}</div>
              <div className="text-xs opacity-75 mt-1">{language === 'en' ? 'per month' : 'فی ماہ'}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
              <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Net Salary' : 'خالص تنخواہ'}</div>
              <div className="text-3xl font-bold">{formatCurrency(netSalary)}</div>
              <div className="text-xs opacity-75 mt-1">{language === 'en' ? 'in hand' : 'ہاتھ میں'}</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Salary Breakdown' : 'تنخواہ کی تفصیل'}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RechartPie>
                <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} paddingAngle={2} dataKey="value">
                  {chartData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
              </RechartPie>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Earnings' : 'آمدنی'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Basic Salary' : 'بنیادی تنخواہ'}</span>
                <span className="font-bold text-blue-600">{formatCurrency(basicSalary)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'House Allowance' : 'مکان الاؤنس'}</span>
                <span className="font-bold text-teal-600">{formatCurrency(houseAllowance)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Medical Allowance' : 'طبی الاؤنس'}</span>
                <span className="font-bold text-green-600">{formatCurrency(medicalAllowance)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Transport Allowance' : 'نقل و حمل الاؤنس'}</span>
                <span className="font-bold">{formatCurrency(transportAllowance)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Utility Allowance' : 'یوٹیلیٹی الاؤنس'}</span>
                <span className="font-bold">{formatCurrency(utilityAllowance)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Gross Salary' : 'مجموعی تنخواہ'}</span>
                <span className="font-bold text-xl text-teal-600">{formatCurrency(grossSalary)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Deductions' : 'کٹوتیاں'}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'EOBI (1%)' : 'EOBI (1%)'}</span>
                <span className="font-bold text-red-600">- {formatCurrency(eobi)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'SESSI (0.6%)' : 'SESSI (0.6%)'}</span>
                <span className="font-bold text-red-600">- {formatCurrency(sessi)}</span>
              </div>
              <div className="flex justify-between pb-2 border-b">
                <span>{language === 'en' ? 'Income Tax' : 'انکم ٹیکس'}</span>
                <span className="font-bold text-red-600">- {formatCurrency(incomeTax)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2">
                <span className="font-bold">{language === 'en' ? 'Total Deductions' : 'کل کٹوتیاں'}</span>
                <span className="font-bold text-xl text-red-600">- {formatCurrency(totalDeductions)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg -mx-3">
                <span className="font-bold text-lg">{language === 'en' ? 'Net Salary' : 'خالص تنخواہ'}</span>
                <span className="font-bold text-2xl text-blue-600">{formatCurrency(netSalary)}</span>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 dark:bg-teal-900/20 rounded-xl p-6">
            <h4 className="font-bold text-teal-800 dark:text-teal-300 mb-3">
              {language === 'en' ? '💰 Salary Tips' : '💰 تنخواہ کے نکات'}
            </h4>
            <ul className="text-sm text-teal-700 dark:text-teal-400 space-y-2">
              <li>• {language === 'en' ? 'Basic should be 40-50% of CTC for better PF benefits' : 'بہتر PF فوائد کے لیے بنیادی CTC کا 40-50% ہونا چاہیے'}</li>
              <li>• {language === 'en' ? 'House allowance up to 45% of basic is tax-free' : 'بنیادی کے 45% تک مکان الاؤنس ٹیکس فری ہے'}</li>
              <li>• {language === 'en' ? 'Minimum wage in Pakistan: Rs. 32,000 (2024)' : 'پاکستان میں کم از کم اجرت: Rs. 32,000 (2024)'}</li>
              <li>• {language === 'en' ? 'EOBI/SESSI mandatory for registered companies' : 'رجسٹرڈ کمپنیوں کے لیے EOBI/SESSI لازمی'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryBreakdownCalculator;