import React, { useState } from 'react';
import { Globe, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import InfoPanel from '../../components/InfoPanel';

const CurrencyConverter = ({ language, addToHistory, calculatorName }) => {
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState('PKR');
  const [toCurrency, setToCurrency] = useState('USD');

  // Exchange rates (base: PKR) - Updated Jan 2025
  const rates = {
    PKR: 1,
    USD: 0.0036,
    EUR: 0.0033,
    GBP: 0.0028,
    AED: 0.013,
    SAR: 0.013,
    INR: 0.30,
    CNY: 0.026
  };

  const currencies = [
    { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs.', flag: '🇵🇰' },
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
    { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س', flag: '🇸🇦' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' }
  ];

  const convert = () => {
    const amountInPKR = amount / rates[fromCurrency];
    return amountInPKR * rates[toCurrency];
  };

  const convertedAmount = convert();
  const exchangeRate = rates[toCurrency] / rates[fromCurrency];
  const fromSymbol = currencies.find(c => c.code === fromCurrency)?.symbol || '';
  const toSymbol = currencies.find(c => c.code === toCurrency)?.symbol || '';

  const popularPairs = [
    { from: 'PKR', to: 'USD', rate: rates.USD },
    { from: 'PKR', to: 'EUR', rate: rates.EUR },
    { from: 'PKR', to: 'AED', rate: rates.AED },
    { from: 'PKR', to: 'SAR', rate: rates.SAR },
    { from: 'USD', to: 'PKR', rate: 1/rates.USD },
    { from: 'EUR', to: 'PKR', rate: 1/rates.EUR }
  ];

  return (
    <div className="space-y-8">
      <InfoPanel
        language={language}
        colorScheme="green"
        formula="Converted Amount = Amount × Exchange Rate  |  Exchange Rate = Target Currency / Base Currency"
        variables={[
          { symbol: 'Amount', nameEn: 'Money to convert', nameUrdu: 'تبدیل کرنے کے لیے رقم' },
          { symbol: 'Exchange Rate', nameEn: 'Conversion multiplier', nameUrdu: 'تبادلہ کی شرح' },
          { symbol: 'Base', nameEn: 'From currency', nameUrdu: 'کس کرنسی سے' }
        ]}
        example={[
          { labelEn: 'Amount', labelUrdu: 'رقم', value: '1,000 PKR' },
          { labelEn: 'From', labelUrdu: 'سے', value: 'PKR (Pakistani Rupee)' },
          { labelEn: 'To', labelUrdu: 'میں', value: 'USD (US Dollar)' },
          { labelEn: 'Exchange Rate', labelUrdu: 'شرح تبادلہ', value: '1 PKR = 0.0036 USD' },
          { labelEn: 'Converted', labelUrdu: 'تبدیل شدہ', value: '$3.60' }
        ]}
        terms={[
          {
            titleEn: 'Exchange Rate',
            titleUrdu: 'شرح تبادلہ',
            descEn: 'Price of one currency in terms of another. Changes daily based on market.',
            descUrdu: 'ایک کرنسی کی قیمت دوسری کے لحاظ سے۔ مارکیٹ کی بنیاد پر روزانہ تبدیل ہوتی ہے۔'
          },
          {
            titleEn: 'Bid-Ask Spread',
            titleUrdu: 'بڈ-آسک اسپریڈ',
            descEn: 'Banks buy cheaper, sell higher. These are mid-market rates. Expect 2-5% spread.',
            descUrdu: 'بینک سستے میں خریدتے ہیں، مہنگے میں بیچتے ہیں۔ یہ درمیانی مارکیٹ کی شرحیں ہیں۔ 2-5% فرق کی توقع کریں۔'
          },
          {
            titleEn: 'Best Time',
            titleUrdu: 'بہترین وقت',
            descEn: 'Monitor rates for 1-2 weeks. Use currency alerts. Avoid airports (worst rates).',
            descUrdu: '1-2 ہفتے شرحوں کی نگرانی کریں۔ کرنسی الرٹ استعمال کریں۔ ہوائی اڈوں سے بچیں (بدترین شرحیں)۔'
          }
        ]}
        note={{
          en: 'Rates updated January 2025. Actual rates vary by bank/exchange. These are approximate mid-market rates. Always check current rates before exchanging.',
          urdu: 'شرحیں جنوری 2025 میں اپ ڈیٹ کی گئیں۔ اصل شرحیں بینک/ایکسچینج کے مطابق مختلف ہوتی ہیں۔ یہ تقریباً درمیانی مارکیٹ کی شرحیں ہیں۔ تبادلہ سے پہلے ہمیشہ موجودہ شرحیں چیک کریں۔'
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-cyan-600" />
              {language === 'en' ? 'Convert Currency' : 'کرنسی تبدیل کریں'}</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'Amount' : 'رقم'}</label>
                <input type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 text-2xl font-bold" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'From Currency' : 'کس کرنسی سے'}</label>
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 font-semibold">
                  {currencies.map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.flag} {curr.code} - {curr.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button onClick={() => {
                  const temp = fromCurrency;
                  setFromCurrency(toCurrency);
                  setToCurrency(temp);
                }}
                  className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{language === 'en' ? 'To Currency' : 'کس کرنسی میں'}</label>
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 font-semibold">
                  {currencies.map(curr => (
                    <option key={curr.code} value={curr.code}>
                      {curr.flag} {curr.code} - {curr.name}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={() => {
                addToHistory({ calculatorName, result: `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}` });
                toast.success(language === 'en' ? 'Saved!' : 'محفوظ!');
              }}
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-bold py-3 rounded-xl">
                {language === 'en' ? 'Convert' : 'تبدیل کریں'}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center">
            <div className="text-sm opacity-90 mb-2">{language === 'en' ? 'Converted Amount' : 'تبدیل شدہ رقم'}</div>
            <div className="text-5xl font-bold mb-4">
              {toSymbol} {convertedAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </div>
            <div className="bg-white/20 rounded-lg p-4 inline-block">
              <div className="text-xs opacity-75 mb-1">{language === 'en' ? 'Exchange Rate' : 'شرح تبادلہ'}</div>
              <div className="text-lg font-bold">
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Popular Currency Pairs' : 'مقبول کرنسی جوڑے'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {popularPairs.map((pair, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {pair.from} → {pair.to}
                  </div>
                  <div className="text-lg font-bold text-cyan-600">
                    1 {pair.from} = {pair.rate.toFixed(4)} {pair.to}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">{language === 'en' ? 'Quick Reference' : 'فوری حوالہ'}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">{language === 'en' ? 'Amount' : 'رقم'}</th>
                    <th className="text-right py-2">{fromCurrency}</th>
                    <th className="text-right py-2">{toCurrency}</th>
                  </tr>
                </thead>
                <tbody>
                  {[100, 500, 1000, 5000, 10000].map(amt => {
                    const conv = (amt / rates[fromCurrency]) * rates[toCurrency];
                    return (
                      <tr key={amt} className="border-b hover:bg-slate-50 dark:hover:bg-slate-700">
                        <td className="py-2"></td>
                        <td className="text-right font-semibold">{fromSymbol} {amt.toLocaleString()}</td>
                        <td className="text-right font-semibold text-green-600">{toSymbol} {conv.toLocaleString('en-US', {maximumFractionDigits: 2})}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;