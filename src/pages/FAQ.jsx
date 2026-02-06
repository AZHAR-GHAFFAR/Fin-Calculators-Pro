import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FAQ = ({ language }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState([0]); // First item expanded by default

  const content = {
    en: {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about FinCalc Pro',
      searchPlaceholder: 'Search for answers...',
      noResults: 'No matching questions found. Try different keywords.',
      stillNeedHelp: 'Still need help?',
      contactUs: 'Contact our support team',
      categories: [
        {
          name: 'General Questions',
          icon: '🎯',
          faqs: [
            {
              question: 'What is FinCalc Pro?',
              answer: 'FinCalc Pro is a free online platform offering 230+ professional financial calculators. We help individuals and businesses make informed financial decisions through accurate calculations and visual insights.'
            },
            {
              question: 'Is FinCalc Pro really free?',
              answer: 'Yes! FinCalc Pro is 100% free to use. No registration required, no credit card needed, and no hidden fees. We believe financial planning tools should be accessible to everyone.'
            },
            {
              question: 'Do I need to create an account?',
              answer: 'No account needed! All our calculators work instantly without any registration. Your calculations are performed locally in your browser for maximum privacy.'
            },
            {
              question: 'Which devices can I use FinCalc Pro on?',
              answer: 'FinCalc Pro works on all devices - desktop computers, laptops, tablets, and smartphones. Our website is fully responsive and optimized for all screen sizes.'
            }
          ]
        },
        {
          name: 'Calculator Usage',
          icon: '🧮',
          faqs: [
            {
              question: 'How do I use a calculator?',
              answer: '1) Choose your category from the homepage, 2) Select the calculator you need, 3) Enter your values in the input fields, 4) Click Calculate to see instant results with graphs and charts.'
            },
            {
              question: 'Are the calculations accurate?',
              answer: 'Yes! All our calculators use industry-standard formulas and are thoroughly tested. However, results are for informational purposes only and should not replace professional financial advice.'
            },
            {
              question: 'Can I save my calculations?',
              answer: 'Your recent calculations are automatically saved in your browser\'s local storage. You can access them from the homepage "Recent Calculations" section. Note: Clearing browser data will remove saved calculations.'
            },
            {
              question: 'Can I download calculation results?',
              answer: 'Yes! Most calculators allow you to download results as PDF reports or save charts as images. Look for the download button on the results page.'
            },
            {
              question: 'What currency do calculators use?',
              answer: 'All calculators use Pakistani Rupees (Rs.) by default. We\'re working on adding multi-currency support in future updates.'
            }
          ]
        },
        {
          name: 'Privacy & Security',
          icon: '🔒',
          faqs: [
            {
              question: 'Is my data secure?',
              answer: 'Absolutely! All calculations are performed locally in your browser. We do NOT collect, store, or transmit your calculation data to our servers. Your financial information stays completely private.'
            },
            {
              question: 'Do you store my personal information?',
              answer: 'No. We only store basic preferences (language, dark mode) in your browser\'s local storage. We do not collect names, emails, or any personal information unless you contact us directly.'
            },
            {
              question: 'What about cookies?',
              answer: 'We use minimal cookies for basic functionality (preferences) and analytics (to improve our service). You can disable cookies in your browser settings at any time.'
            },
            {
              question: 'Can others see my calculations?',
              answer: 'No. Your calculations are private and stored only on your device. Even we cannot access your calculation data.'
            }
          ]
        },
        {
          name: 'Features & Functionality',
          icon: '⚡',
          faqs: [
            {
              question: 'What languages are supported?',
              answer: 'FinCalc Pro supports both English and Urdu. You can switch languages anytime using the language toggle in the header.'
            },
            {
              question: 'Does it work offline?',
              answer: 'Once a page is loaded, most calculators work offline. However, you need internet connection to access new pages or features.'
            },
            {
              question: 'Can I suggest a new calculator?',
              answer: 'Yes! We love hearing from our users. Contact us with your calculator suggestion, and we\'ll consider adding it in future updates.'
            },
            {
              question: 'Do you have a mobile app?',
              answer: 'Currently, FinCalc Pro is web-based. However, you can add our website to your phone\'s home screen for an app-like experience. A dedicated mobile app may be released in the future.'
            }
          ]
        },
        {
          name: 'Technical Support',
          icon: '🛠️',
          faqs: [
            {
              question: 'The calculator isn\'t working. What should I do?',
              answer: 'Try these steps: 1) Refresh the page, 2) Clear browser cache, 3) Try a different browser, 4) Ensure JavaScript is enabled. If the issue persists, contact our support team.'
            },
            {
              question: 'Which browsers are supported?',
              answer: 'FinCalc Pro works best on modern browsers: Chrome, Firefox, Safari, and Edge (latest versions). Internet Explorer is not supported.'
            },
            {
              question: 'I found a bug. How do I report it?',
              answer: 'Please contact us via the Contact page with details about the bug, which calculator it affects, and what device/browser you\'re using. We\'ll fix it as soon as possible!'
            },
            {
              question: 'How often is FinCalc Pro updated?',
              answer: 'We regularly add new calculators and features. Major updates happen monthly, with bug fixes and improvements released as needed.'
            }
          ]
        },
        {
          name: 'Business & Commercial Use',
          icon: '💼',
          faqs: [
            {
              question: 'Can I use FinCalc Pro for my business?',
              answer: 'Yes! FinCalc Pro is free for both personal and commercial use. Businesses can use our calculators for internal calculations, client consultations, and financial planning.'
            },
            {
              question: 'Can I embed calculators on my website?',
              answer: 'Currently, embedding is not available. However, you can link to specific calculators. Contact us if you\'re interested in white-label or API solutions.'
            },
            {
              question: 'Do you offer custom calculator development?',
              answer: 'We focus on our free platform currently. For custom calculator development or enterprise solutions, please contact us to discuss your requirements.'
            }
          ]
        }
      ]
    },
    ur: {
      title: 'اکثر پوچھے گئے سوالات',
      subtitle: 'FinCalc Pro کے بارے میں عام سوالات کے جوابات تلاش کریں',
      searchPlaceholder: 'جوابات تلاش کریں...',
      noResults: 'کوئی مماثل سوال نہیں ملا۔ مختلف الفاظ آزمائیں۔',
      stillNeedHelp: 'اب بھی مدد چاہیے؟',
      contactUs: 'ہماری سپورٹ ٹیم سے رابطہ کریں',
      categories: [
        {
          name: 'عمومی سوالات',
          icon: '🎯',
          faqs: [
            {
              question: 'FinCalc Pro کیا ہے؟',
              answer: 'FinCalc Pro ایک مفت آن لائن پلیٹ فارم ہے جو 230+ پیشہ ورانہ مالیاتی کیلکولیٹرز پیش کرتا ہے۔ ہم افراد اور کاروباروں کو درست حسابات اور بصری بصیرت کے ذریعے باخبر مالیاتی فیصلے کرنے میں مدد کرتے ہیں۔'
            },
            {
              question: 'کیا FinCalc Pro واقعی مفت ہے؟',
              answer: 'جی ہاں! FinCalc Pro استعمال کرنے کے لیے 100% مفت ہے۔ کوئی رجسٹریشن ضروری نہیں، کوئی کریڈٹ کارڈ درکار نہیں، اور کوئی چھپی ہوئی فیس نہیں۔ ہمارا ماننا ہے کہ مالی منصوبہ بندی کے ٹولز ہر کسی کے لیے قابل رسائی ہونے چاہئیں۔'
            },
            {
              question: 'کیا مجھے اکاؤنٹ بنانے کی ضرورت ہے؟',
              answer: 'کوئی اکاؤنٹ کی ضرورت نہیں! ہمارے تمام کیلکولیٹرز بغیر کسی رجسٹریشن کے فوری طور پر کام کرتے ہیں۔ آپ کے حسابات آپ کے براؤزر میں مقامی طور پر انجام دیے جاتے ہیں زیادہ سے زیادہ رازداری کے لیے۔'
            },
            {
              question: 'میں کن آلات پر FinCalc Pro استعمال کر سکتا ہوں؟',
              answer: 'FinCalc Pro تمام آلات پر کام کرتا ہے - ڈیسک ٹاپ کمپیوٹرز، لیپ ٹاپ، ٹیبلیٹس، اور سمارٹ فونز۔ ہماری ویب سائٹ تمام سکرین سائزز کے لیے مکمل طور پر متحرک اور بہتر بنائی گئی ہے۔'
            }
          ]
        },
        {
          name: 'کیلکولیٹر کا استعمال',
          icon: '🧮',
          faqs: [
            {
              question: 'میں کیلکولیٹر کیسے استعمال کروں؟',
              answer: '1) ہوم پیج سے اپنی کیٹگری منتخب کریں، 2) جو کیلکولیٹر آپ کو چاہیے اسے منتخب کریں، 3) ان پٹ فیلڈز میں اپنی قدریں درج کریں، 4) گراف اور چارٹس کے ساتھ فوری نتائج دیکھنے کے لیے Calculate پر کلک کریں۔'
            },
            {
              question: 'کیا حسابات درست ہیں؟',
              answer: 'جی ہاں! ہمارے تمام کیلکولیٹرز صنعتی معیاری فارمولے استعمال کرتے ہیں اور مکمل طور پر جانچے گئے ہیں۔ تاہم، نتائج صرف معلوماتی مقاصد کے لیے ہیں اور پیشہ ورانہ مالی مشورے کی جگہ نہیں لے سکتے۔'
            },
            {
              question: 'کیا میں اپنے حسابات محفوظ کر سکتا ہوں؟',
              answer: 'آپ کے حالیہ حسابات خودکار طور پر آپ کے براؤزر کی لوکل اسٹوریج میں محفوظ ہو جاتے ہیں۔ آپ انہیں ہوم پیج کے "حالیہ حسابات" سیکشن سے رسائی کر سکتے ہیں۔ نوٹ: براؤزر ڈیٹا صاف کرنے سے محفوظ شدہ حسابات ہٹ جائیں گے۔'
            },
            {
              question: 'کیا میں حساب کے نتائج ڈاؤن لوڈ کر سکتا ہوں؟',
              answer: 'جی ہاں! زیادہ تر کیلکولیٹرز آپ کو نتائج کو PDF رپورٹس کے طور پر ڈاؤن لوڈ کرنے یا چارٹس کو تصاویر کے طور پر محفوظ کرنے کی اجازت دیتے ہیں۔ نتائج کے صفحے پر ڈاؤن لوڈ بٹن تلاش کریں۔'
            },
            {
              question: 'کیلکولیٹرز کون سی کرنسی استعمال کرتے ہیں؟',
              answer: 'تمام کیلکولیٹرز بطور ڈیفالٹ پاکستانی روپے (Rs.) استعمال کرتے ہیں۔ ہم مستقبل کی اپ ڈیٹس میں ملٹی کرنسی سپورٹ شامل کرنے پر کام کر رہے ہیں۔'
            }
          ]
        },
        {
          name: 'رازداری اور سیکیورٹی',
          icon: '🔒',
          faqs: [
            {
              question: 'کیا میرا ڈیٹا محفوظ ہے؟',
              answer: 'بالکل! تمام حسابات آپ کے براؤزر میں مقامی طور پر انجام دیے جاتے ہیں۔ ہم آپ کے حساب کے ڈیٹا کو جمع، اسٹور یا ہمارے سرورز تک منتقل نہیں کرتے۔ آپ کی مالی معلومات مکمل طور پر نجی رہتی ہیں۔'
            },
            {
              question: 'کیا آپ میری ذاتی معلومات محفوظ کرتے ہیں؟',
              answer: 'نہیں۔ ہم صرف بنیادی ترجیحات (زبان، ڈارک موڈ) آپ کے براؤزر کی لوکل اسٹوریج میں محفوظ کرتے ہیں۔ ہم نام، ای میل، یا کوئی ذاتی معلومات جمع نہیں کرتے جب تک کہ آپ براہ راست ہم سے رابطہ نہ کریں۔'
            },
            {
              question: 'کوکیز کے بارے میں کیا خیال ہے؟',
              answer: 'ہم بنیادی فعالیت (ترجیحات) اور تجزیات (ہماری سروس کو بہتر بنانے کے لیے) کے لیے کم سے کم کوکیز استعمال کرتے ہیں۔ آپ کسی بھی وقت اپنے براؤزر کی ترتیبات میں کوکیز کو غیر فعال کر سکتے ہیں۔'
            },
            {
              question: 'کیا دوسرے میرے حسابات دیکھ سکتے ہیں؟',
              answer: 'نہیں۔ آپ کے حسابات نجی ہیں اور صرف آپ کے آلے پر محفوظ ہیں۔ ہم بھی آپ کے حساب کے ڈیٹا تک رسائی نہیں کر سکتے۔'
            }
          ]
        },
        {
          name: 'خصوصیات اور فعالیت',
          icon: '⚡',
          faqs: [
            {
              question: 'کون سی زبانیں سپورٹ کی جاتی ہیں؟',
              answer: 'FinCalc Pro انگریزی اور اردو دونوں کو سپورٹ کرتا ہے۔ آپ ہیڈر میں لینگویج ٹوگل استعمال کرتے ہوئے کسی بھی وقت زبان تبدیل کر سکتے ہیں۔'
            },
            {
              question: 'کیا یہ آف لائن کام کرتا ہے؟',
              answer: 'ایک بار صفحہ لوڈ ہونے کے بعد، زیادہ تر کیلکولیٹرز آف لائن کام کرتے ہیں۔ تاہم، آپ کو نئے صفحات یا خصوصیات تک رسائی کے لیے انٹرنیٹ کنکشن کی ضرورت ہے۔'
            },
            {
              question: 'کیا میں نیا کیلکولیٹر تجویز کر سکتا ہوں؟',
              answer: 'جی ہاں! ہم اپنے صارفین سے سننا پسند کرتے ہیں۔ اپنی کیلکولیٹر کی تجویز کے ساتھ ہم سے رابطہ کریں، اور ہم مستقبل کی اپ ڈیٹس میں اسے شامل کرنے پر غور کریں گے۔'
            },
            {
              question: 'کیا آپ کے پاس موبائل ایپ ہے؟',
              answer: 'فی الوقت، FinCalc Pro ویب پر مبنی ہے۔ تاہم، آپ ایپ جیسے تجربے کے لیے ہماری ویب سائٹ کو اپنے فون کی ہوم اسکرین میں شامل کر سکتے ہیں۔ مستقبل میں ایک وقف موبائل ایپ جاری کی جا سکتی ہے۔'
            }
          ]
        },
        {
          name: 'تکنیکی مدد',
          icon: '🛠️',
          faqs: [
            {
              question: 'کیلکولیٹر کام نہیں کر رہا۔ مجھے کیا کرنا چاہیے؟',
              answer: 'یہ اقدامات آزمائیں: 1) صفحہ کو ریفریش کریں، 2) براؤزر کیش صاف کریں، 3) مختلف براؤزر آزمائیں، 4) یقینی بنائیں کہ JavaScript فعال ہے۔ اگر مسئلہ برقرار رہے تو ہماری سپورٹ ٹیم سے رابطہ کریں۔'
            },
            {
              question: 'کون سے براؤزرز سپورٹ کیے جاتے ہیں؟',
              answer: 'FinCalc Pro جدید براؤزرز پر بہترین کام کرتا ہے: Chrome، Firefox، Safari، اور Edge (تازہ ترین ورژن)۔ Internet Explorer سپورٹ نہیں ہے۔'
            },
            {
              question: 'مجھے ایک بگ ملا۔ میں اسے کیسے رپورٹ کروں؟',
              answer: 'براہ کرم بگ کی تفصیلات، کون سا کیلکولیٹر متاثر ہوتا ہے، اور آپ کون سا ڈیوائس/براؤزر استعمال کر رہے ہیں کے ساتھ رابطہ صفحہ کے ذریعے ہم سے رابطہ کریں۔ ہم جلد از جلد اسے ٹھیک کر دیں گے!'
            },
            {
              question: 'FinCalc Pro کتنی بار اپ ڈیٹ ہوتا ہے؟',
              answer: 'ہم باقاعدگی سے نئے کیلکولیٹرز اور خصوصیات شامل کرتے ہیں۔ بڑی اپ ڈیٹس ماہانہ ہوتی ہیں، بگ فکسز اور بہتریاں ضرورت کے مطابق جاری کی جاتی ہیں۔'
            }
          ]
        },
        {
          name: 'کاروبار اور تجارتی استعمال',
          icon: '💼',
          faqs: [
            {
              question: 'کیا میں اپنے کاروبار کے لیے FinCalc Pro استعمال کر سکتا ہوں؟',
              answer: 'جی ہاں! FinCalc Pro ذاتی اور تجارتی دونوں استعمال کے لیے مفت ہے۔ کاروبار اندرونی حسابات، کلائنٹ مشاورت، اور مالی منصوبہ بندی کے لیے ہمارے کیلکولیٹرز استعمال کر سکتے ہیں۔'
            },
            {
              question: 'کیا میں اپنی ویب سائٹ پر کیلکولیٹرز ایمبیڈ کر سکتا ہوں؟',
              answer: 'فی الوقت، ایمبیڈنگ دستیاب نہیں ہے۔ تاہم، آپ مخصوص کیلکولیٹرز سے لنک کر سکتے ہیں۔ اگر آپ وائٹ لیبل یا API حل میں دلچسپی رکھتے ہیں تو ہم سے رابطہ کریں۔'
            },
            {
              question: 'کیا آپ کسٹم کیلکولیٹر ڈیولپمنٹ پیش کرتے ہیں؟',
              answer: 'ہم فی الوقت اپنے مفت پلیٹ فارم پر توجہ مرکوز کرتے ہیں۔ کسٹم کیلکولیٹر ڈیولپمنٹ یا انٹرپرائز حل کے لیے، براہ کرم اپنی ضروریات پر تبادلہ خیال کرنے کے لیے ہم سے رابطہ کریں۔'
            }
          ]
        }
      ]
    }
  };

  const t = content[language];

  const toggleItem = (categoryIndex, faqIndex) => {
    const itemId = `${categoryIndex}-${faqIndex}`;
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const filteredCategories = t.categories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const totalMatchingFAQs = filteredCategories.reduce((sum, cat) => sum + cat.faqs.length, 0);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-4">
          <HelpCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
          {t.subtitle}
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-500 outline-none transition-all text-lg"
            />
          </div>
          {searchQuery && (
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              {totalMatchingFAQs} {language === 'en' ? 'results found' : 'نتائج ملے'}
            </p>
          )}
        </div>
      </div>

      {/* FAQ Categories */}
      {filteredCategories.length > 0 ? (
        <div className="space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">{category.icon}</span>
                {category.name}
              </h2>

              <div className="space-y-3">
                {category.faqs.map((faq, faqIndex) => {
                  const itemId = `${categoryIndex}-${faqIndex}`;
                  const isExpanded = expandedItems.includes(itemId);

                  return (
                    <div
                      key={faqIndex}
                      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-200 hover:shadow-md"
                    >
                      <button
                        onClick={() => toggleItem(categoryIndex, faqIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                      >
                        <span className="font-semibold text-slate-800 dark:text-white pr-4">
                          {faq.question}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="px-6 pb-4 pt-2 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {t.noResults}
          </p>
        </div>
      )}

      {/* Contact Support */}
      <div className="mt-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
        <MessageCircle className="w-12 h-12 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">{t.stillNeedHelp}</h3>
        <p className="mb-6 opacity-90">
          {language === 'en' 
            ? 'Our support team is here to help you with any questions.'
            : 'ہماری سپورٹ ٹیم کسی بھی سوال میں آپ کی مدد کے لیے یہاں ہے۔'
          }
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
          {t.contactUs}
        </button>
      </div>
    </div>
  );
};

export default FAQ;