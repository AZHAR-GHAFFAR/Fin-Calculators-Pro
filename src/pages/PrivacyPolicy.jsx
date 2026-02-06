import React from 'react';
import { Shield, Lock, Eye, Database, UserX, FileText } from 'lucide-react';

const PrivacyPolicy = ({ language }) => {
  const content = {
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: February 2026',
      intro: 'At FinCalc Pro, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our website and calculators.',
      sections: [
        {
          icon: Eye,
          title: '1. Information We Collect',
          content: [
            'We do NOT collect or store your calculation inputs or results',
            'All calculations are performed locally in your browser',
            'We may collect basic analytics data like page views and device type',
            'We do not require registration or personal information to use our calculators'
          ]
        },
        {
          icon: Database,
          title: '2. How We Use Your Information',
          content: [
            'Analytics data helps us improve our website and user experience',
            'We analyze which calculators are most popular to prioritize updates',
            'We do not sell, rent, or share your personal information with third parties',
            'No financial or personal calculation data is ever transmitted to our servers'
          ]
        },
        {
          icon: Lock,
          title: '3. Data Security',
          content: [
            'All calculations happen in your browser using client-side JavaScript',
            'We use industry-standard security measures to protect our website',
            'Your calculation history is stored only on your device (localStorage)',
            'We do not have access to your calculation data'
          ]
        },
        {
          icon: UserX,
          title: '4. Cookies and Local Storage',
          content: [
            'We use localStorage to save your preferences (language, dark mode)',
            'Calculation history is saved locally on your device for your convenience',
            'You can clear this data anytime from your browser settings',
            'We may use cookies for basic analytics purposes'
          ]
        },
        {
          icon: FileText,
          title: '5. Third-Party Services',
          content: [
            'We may use third-party analytics services (like Google Analytics)',
            'These services have their own privacy policies',
            'We do not share your personal information with these services',
            'You can opt-out of analytics tracking using browser extensions'
          ]
        },
        {
          icon: Shield,
          title: '6. Your Rights',
          content: [
            'You have the right to access any data we collect about you',
            'You can request deletion of your data at any time',
            'You can disable cookies and local storage in your browser',
            'You can contact us with any privacy concerns'
          ]
        }
      ],
      contact: {
        title: 'Contact Us About Privacy',
        text: 'If you have any questions about this Privacy Policy, please contact us at:',
        email: 'azharmughal861@gmail.com'
      }
    },
    ur: {
      title: 'رازداری کی پالیسی',
      lastUpdated: 'آخری اپ ڈیٹ: فروری 2026',
      intro: 'FinCalc Pro میں، ہم آپ کی رازداری کو سنجیدگی سے لیتے ہیں۔ یہ رازداری کی پالیسی بتاتی ہے کہ جب آپ ہماری ویب سائٹ اور کیلکولیٹرز استعمال کرتے ہیں تو ہم آپ کی معلومات کیسے جمع، استعمال اور محفوظ کرتے ہیں۔',
      sections: [
        {
          icon: Eye,
          title: '۱۔ ہم کونسی معلومات جمع کرتے ہیں',
          content: [
            'ہم آپ کے حساب کی ان پٹس یا نتائج جمع یا محفوظ نہیں کرتے',
            'تمام حسابات آپ کے براؤزر میں مقامی طور پر انجام دیے جاتے ہیں',
            'ہم صرف بنیادی تجزیاتی ڈیٹا جمع کر سکتے ہیں جیسے صفحہ کے نظارے اور آلہ کی قسم',
            'ہمارے کیلکولیٹرز استعمال کرنے کے لیے رجسٹریشن یا ذاتی معلومات کی ضرورت نہیں'
          ]
        },
        {
          icon: Database,
          title: '۲۔ ہم آپ کی معلومات کیسے استعمال کرتے ہیں',
          content: [
            'تجزیاتی ڈیٹا ہمیں اپنی ویب سائٹ اور صارف کے تجربے کو بہتر بنانے میں مدد کرتا ہے',
            'ہم تجزیہ کرتے ہیں کہ کون سے کیلکولیٹرز سب سے زیادہ مقبول ہیں تاکہ اپ ڈیٹس کو ترجیح دی جا سکے',
            'ہم آپ کی ذاتی معلومات تیسرے فریق کو فروخت، کرایہ پر یا شیئر نہیں کرتے',
            'کوئی بھی مالی یا ذاتی حساب کا ڈیٹا کبھی ہمارے سرورز کو منتقل نہیں کیا جاتا'
          ]
        },
        {
          icon: Lock,
          title: '۳۔ ڈیٹا کی حفاظت',
          content: [
            'تمام حسابات آپ کے براؤزر میں کلائنٹ سائیڈ JavaScript استعمال کرتے ہوئے ہوتے ہیں',
            'ہم اپنی ویب سائٹ کی حفاظت کے لیے صنعتی معیاری حفاظتی اقدامات استعمال کرتے ہیں',
            'آپ کی حساب کی تاریخ صرف آپ کے آلہ پر محفوظ ہے (localStorage)',
            'ہمیں آپ کے حساب کے ڈیٹا تک رسائی نہیں ہے'
          ]
        },
        {
          icon: UserX,
          title: '۴۔ کوکیز اور مقامی اسٹوریج',
          content: [
            'ہم آپ کی ترجیحات (زبان، ڈارک موڈ) محفوظ کرنے کے لیے localStorage استعمال کرتے ہیں',
            'حساب کی تاریخ آپ کی سہولت کے لیے آپ کے آلہ پر مقامی طور پر محفوظ ہے',
            'آپ اپنے براؤزر کی ترتیبات سے کسی بھی وقت یہ ڈیٹا صاف کر سکتے ہیں',
            'ہم بنیادی تجزیاتی مقاصد کے لیے کوکیز استعمال کر سکتے ہیں'
          ]
        },
        {
          icon: FileText,
          title: '۵۔ تھرڈ پارٹی سروسز',
          content: [
            'ہم تھرڈ پارٹی تجزیاتی خدمات استعمال کر سکتے ہیں (جیسے Google Analytics)',
            'ان خدمات کی اپنی رازداری کی پالیسیاں ہیں',
            'ہم ان خدمات کے ساتھ آپ کی ذاتی معلومات شیئر نہیں کرتے',
            'آپ براؤزر ایکسٹینشنز استعمال کرتے ہوئے تجزیاتی ٹریکنگ سے آپٹ آؤٹ کر سکتے ہیں'
          ]
        },
        {
          icon: Shield,
          title: '۶۔ آپ کے حقوق',
          content: [
            'آپ کو کسی بھی ڈیٹا تک رسائی کا حق ہے جو ہم آپ کے بارے میں جمع کرتے ہیں',
            'آپ کسی بھی وقت اپنے ڈیٹا کو حذف کرنے کی درخواست کر سکتے ہیں',
            'آپ اپنے براؤزر میں کوکیز اور مقامی اسٹوریج کو غیر فعال کر سکتے ہیں',
            'آپ کسی بھی رازداری کی تشویش کے ساتھ ہم سے رابطہ کر سکتے ہیں'
          ]
        }
      ],
      contact: {
        title: 'رازداری کے بارے میں ہم سے رابطہ کریں',
        text: 'اگر آپ کے پاس اس رازداری کی پالیسی کے بارے میں کوئی سوالات ہیں، تو براہ کرم ہم سے رابطہ کریں:',
        email: 'azharmughal861@gmail.com'
      }
    }
  };

  const t = content[language];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {t.lastUpdated}
        </p>
      </div>

      {/* Introduction */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-8 border border-indigo-200 dark:border-indigo-800">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
          {t.intro}
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6 mb-12">
        {t.sections.map((section, index) => (
          <div 
            key={index}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-lg">
                <section.icon className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                {section.title}
              </h2>
            </div>
            <ul className="space-y-3 ml-16">
              {section.content.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                  <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">
          {t.contact.title}
        </h2>
        <p className="mb-4">
          {t.contact.text}
        </p>
        <a 
          href={`mailto:${t.contact.email}`}
          className="inline-flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
        >
          <Shield className="w-5 h-5" />
          {t.contact.email}
        </a>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
