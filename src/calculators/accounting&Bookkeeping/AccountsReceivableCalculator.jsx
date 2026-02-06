import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';
import { formatCurrency } from '../../utils/currency';

const AccountsReceivableCalculator = ({ language, addToHistory, calculatorName }) => {
  const [invoices, setInvoices] = useState([
    { id: 1, amount: 150000, days: 15 },
    { id: 2, amount: 200000, days: 30 },
    { id: 3, amount: 100000, days: 45 },
    { id: 4, amount: 80000, days: 60 },
    { id: 5, amount: 50000, days: 90 }
  ]);
  const [annualSales, setAnnualSales] = useState(12000000);

  const totalReceivable = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const weightedDays = invoices.reduce((sum, inv) => sum + (inv.amount * inv.days), 0) / totalReceivable;
  const dso = (totalReceivable / annualSales) * 365; // Days Sales Outstanding
  
  const aging = {
    current: invoices.filter(inv => inv.days <= 30).reduce((sum, inv) => sum + inv.amount, 0),
    days31to60: invoices.filter(inv => inv.days > 30 && inv.days <= 60).reduce((sum, inv) => sum + inv.amount, 0),
    days61to90: invoices.filter(inv => inv.days > 60 && inv.days <= 90).reduce((sum, inv) => sum + inv.amount, 0),
    over90: invoices.filter(inv => inv.days > 90).reduce((sum, inv) => sum + inv.amount, 0)
  };

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="cyan"
        formula="DSO = (Accounts Receivable ÷ Annual Sales) × 365"
        variables={[
          { symbol: 'DSO', nameEn: 'Days Sales Outstanding (collection period)', nameUrdu: 'وصولی کی مدت (دنوں میں)' },
          { symbol: 'Aging', nameEn: 'Categorize by days overdue', nameUrdu: 'تاخیر کے دنوں کے لحاظ سے درجہ بندی' }
        ]}
        example={[
          { labelEn: 'Total Receivable', labelUrdu: 'کل وصولی', value: 'Rs. 5,80,000' },
          { labelEn: 'Annual Sales', labelUrdu: 'سالانہ فروخت', value: 'Rs. 1,20,00,000' },
          { labelEn: 'DSO', labelUrdu: 'DSO', value: '17.6 days' },
          { labelEn: 'Collection Efficiency', labelUrdu: 'وصولی کی کارکردگی', value: 'Good (<30 days)' }
        ]}
        terms={[
          {
            titleEn: 'Days Sales Outstanding (DSO)',
            titleUrdu: 'دنوں کی فروخت باقی (DSO)',
            descEn: 'Average collection period. <30 days: excellent. 30-45: good. >60: poor cash flow.',
            descUrdu: 'اوسط وصولی کی مدت۔ <30 دن: بہترین۔ 30-45: اچھا۔ >60: کمزور کیش فلو۔'
          },
          {
            titleEn: 'Aging Analysis',
            titleUrdu: 'عمر کا تجزیہ',
            descEn: '0-30: Current. 31-60: Caution. 61-90: Risk. >90: Bad debt likely. Track monthly.',
            descUrdu: '0-30: موجودہ۔ 31-60: احتیاط۔ 61-90: خطرہ۔ >90: خراب قرض کا امکان۔ ماہانہ ٹریک کریں۔'
          },
          {
            titleEn: 'Collection Best Practices',
            titleUrdu: 'وصولی کے بہترین طریقے',
            descEn: 'Clear payment terms. Follow-up reminders. Incentives for early payment. Late fees.',
            descUrdu: 'واضح ادائیگی کی شرائط۔ فالو اپ یاد دہانیاں۔ جلد ادائیگی کے لیے ترغیبات۔ تاخیر کی فیس۔'
          }
        ]}
        note={{
          en: 'DSO varies by industry. Retail: 5-15 days. B2B: 30-60 days. High DSO = cash flow problems. Offer discounts for early payment (2/10 net 30).',
          urdu: 'DSO صنعت کے لحاظ سے مختلف ہوتا ہے۔ خوردہ: 5-15 دن۔ B2B: 30-60 دن۔ زیادہ DSO = کیش فلو کے مسائل۔ جلد ادائیگی کے لیے رعایت دیں (2/10 نیٹ 30)۔'
        }}
      />

      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Total Receivable' : 'کل وصولی'}</div>
            <div className="text-4xl font-bold">{formatCurrency(totalReceivable)}</div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'DSO' : 'DSO'}</div>
            <div className="text-4xl font-bold">{dso.toFixed(1)}</div>
            <div className="text-xs opacity-75 mt-1">{language === 'en' ? 'days' : 'دن'}</div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Avg Collection' : 'اوسط وصولی'}</div>
            <div className="text-4xl font-bold">{weightedDays.toFixed(0)}</div>
            <div className="text-xs opacity-75 mt-1">{language === 'en' ? 'days (weighted)' : 'دن (وزنی)'}</div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Aging Analysis' : 'عمر کا تجزیہ'}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{language === 'en' ? '0-30 Days' : '0-30 دن'}</div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(aging.current)}</div>
              <div className="text-xs text-slate-500 mt-1">{((aging.current/totalReceivable)*100).toFixed(0)}%</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{language === 'en' ? '31-60 Days' : '31-60 دن'}</div>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(aging.days31to60)}</div>
              <div className="text-xs text-slate-500 mt-1">{((aging.days31to60/totalReceivable)*100).toFixed(0)}%</div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{language === 'en' ? '61-90 Days' : '61-90 دن'}</div>
              <div className="text-2xl font-bold text-orange-600">{formatCurrency(aging.days61to90)}</div>
              <div className="text-xs text-slate-500 mt-1">{((aging.days61to90/totalReceivable)*100).toFixed(0)}%</div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <div className="text-xs text-slate-600 dark:text-slate-400 mb-1">{language === 'en' ? '>90 Days' : '>90 دن'}</div>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(aging.over90)}</div>
              <div className="text-xs text-slate-500 mt-1">{((aging.over90/totalReceivable)*100).toFixed(0)}%</div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Outstanding Invoices' : 'باقی رسیدیں'}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="text-left p-3">{language === 'en' ? 'Invoice' : 'رسید'}</th>
                  <th className="text-right p-3">{language === 'en' ? 'Amount' : 'رقم'}</th>
                  <th className="text-right p-3">{language === 'en' ? 'Days Overdue' : 'تاخیر کے دن'}</th>
                  <th className="text-right p-3">{language === 'en' ? 'Status' : 'حیثیت'}</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b dark:border-slate-700">
                    <td className="p-3 font-semibold">#{inv.id}</td>
                    <td className="p-3 text-right font-bold">{formatCurrency(inv.amount)}</td>
                    <td className="p-3 text-right">{inv.days} {language === 'en' ? 'days' : 'دن'}</td>
                    <td className="p-3 text-right">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        inv.days <= 30 ? 'bg-green-100 text-green-700' :
                        inv.days <= 60 ? 'bg-blue-100 text-blue-700' :
                        inv.days <= 90 ? 'bg-orange-100 text-orange-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {inv.days <= 30 ? 'Current' : inv.days <= 60 ? 'Caution' : inv.days <= 90 ? 'Risk' : 'Overdue'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button onClick={() => {
          addToHistory({ calculatorName, result: `DSO: ${dso.toFixed(1)} days, Total: ${formatCurrency(totalReceivable)}` });
          toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
        }}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold py-3 rounded-xl">
          {language === 'en' ? 'Save Analysis' : 'تجزیہ محفوظ کریں'}
        </button>
      </div>
    </div>
  );
};

export default AccountsReceivableCalculator;