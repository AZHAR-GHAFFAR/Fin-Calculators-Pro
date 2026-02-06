import React from 'react';
import { Calculator, Target, Users, Award } from 'lucide-react';

const AboutUs = ({ language }) => {
  const content = {
    en: {
      title: 'About FinCalc Pro',
      subtitle: 'Your Trusted Partner in Financial Calculations',
      mission: {
        title: 'Our Mission',
        text: 'To provide accurate, user-friendly financial calculators that empower individuals and businesses to make informed decisions. We believe that financial planning should be accessible to everyone, regardless of their background or expertise.'
      },
      vision: {
        title: 'Our Vision',
        text: 'To become the leading platform for financial calculations in South Asia, helping millions of users achieve their financial goals through smart planning and decision-making tools.'
      },
      values: [
        {
          icon: Calculator,
          title: 'Accuracy',
          description: 'We ensure all our calculators use precise formulas and up-to-date financial standards.'
        },
        {
          icon: Users,
          title: 'User-Centric',
          description: 'Our tools are designed with simplicity in mind, making complex calculations easy for everyone.'
        },
        {
          icon: Target,
          title: 'Innovation',
          description: 'We continuously update our platform with new calculators and features based on user needs.'
        },
        {
          icon: Award,
          title: 'Trust',
          description: 'Your data privacy and security are our top priorities. We never store your personal calculations.'
        }
      ],
      story: {
        title: 'Our Story',
        text: 'FinCalc Pro was founded in 2026 with a simple goal: to make financial planning accessible to everyone in Pakistan and beyond. We recognized that many people struggle with complex financial calculations and wanted to create a platform that simplifies these processes. Today, we serve thousands of users daily, helping them with everything from loan calculations to investment planning.'
      },
      team: {
        title: 'Why Choose Us?',
        points: [
          '25+ professional calculators across multiple categories',
          'Bilingual support (English & Urdu)',
          'Mobile-friendly and easy to use',
          'Regular updates with new features',
          'Completely free to use',
          'No registration required'
        ]
      }
    },
    ur: {
      title: 'FinCalc Pro کے بارے میں',
      subtitle: 'مالیاتی حسابات میں آپ کا قابل اعتماد ساتھی',
      mission: {
        title: 'ہمارا مقصد',
        text: 'درست، استعمال میں آسان مالیاتی کیلکولیٹر فراہم کرنا جو افراد اور کاروباروں کو باخبر فیصلے کرنے کی طاقت دیں۔ ہمارا ماننا ہے کہ مالی منصوبہ بندی ہر کسی کے لیے قابل رسائی ہونی چاہیے، چاہے ان کا پس منظر یا مہارت کچھ بھی ہو۔'
      },
      vision: {
        title: 'ہماری ویژن',
        text: 'جنوبی ایشیا میں مالیاتی حسابات کے لیے سرکردہ پلیٹ فارم بننا، لاکھوں صارفین کو سمارٹ منصوبہ بندی اور فیصلہ سازی کے ٹولز کے ذریعے اپنے مالی اہداف حاصل کرنے میں مدد کرنا۔'
      },
      values: [
        {
          icon: Calculator,
          title: 'درستگی',
          description: 'ہم یقینی بناتے ہیں کہ ہمارے تمام کیلکولیٹرز درست فارمولے اور تازہ ترین مالیاتی معیارات استعمال کریں۔'
        },
        {
          icon: Users,
          title: 'صارف پر مبنی',
          description: 'ہمارے ٹولز سادگی کو ذہن میں رکھ کر ڈیزائن کیے گئے ہیں، پیچیدہ حسابات کو سب کے لیے آسان بناتے ہیں۔'
        },
        {
          icon: Target,
          title: 'جدت',
          description: 'ہم صارفین کی ضروریات کی بنیاد پر نئے کیلکولیٹرز اور خصوصیات کے ساتھ اپنے پلیٹ فارم کو مسلسل اپ ڈیٹ کرتے ہیں۔'
        },
        {
          icon: Award,
          title: 'اعتماد',
          description: 'آپ کی ڈیٹا کی رازداری اور سیکیورٹی ہماری اولین ترجیحات ہیں۔ ہم کبھی بھی آپ کے ذاتی حسابات محفوظ نہیں کرتے۔'
        }
      ],
      story: {
        title: 'ہماری کہانی',
        text: 'FinCalc Pro کی بنیاد 2024 میں ایک سادہ مقصد کے ساتھ رکھی گئی: پاکستان اور اس سے آگے ہر کسی کے لیے مالی منصوبہ بندی کو قابل رسائی بنانا۔ ہم نے تسلیم کیا کہ بہت سے لوگ پیچیدہ مالیاتی حسابات سے جدوجہد کرتے ہیں اور ایک ایسا پلیٹ فارم بنانا چاہتے تھے جو ان عمل کو آسان بنائے۔ آج، ہم روزانہ ہزاروں صارفین کی خدمت کرتے ہیں، قرض کے حسابات سے لے کر سرمایہ کاری کی منصوبہ بندی تک ہر چیز میں ان کی مدد کرتے ہیں۔'
      },
      team: {
        title: 'ہمیں کیوں منتخب کریں؟',
        points: [
          'متعدد زمروں میں 25+ پیشہ ورانہ کیلکولیٹرز',
          'دو لسانی سپورٹ (انگلش اور اردو)',
          'موبائل فرینڈلی اور استعمال میں آسان',
          'نئی خصوصیات کے ساتھ باقاعدہ اپ ڈیٹس',
          'استعمال کرنے کے لیے مکمل طور پر مفت',
          'رجسٹریشن کی ضرورت نہیں'
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          {t.subtitle}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            {t.mission.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.mission.text}
          </p>
        </div>

        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            {t.vision.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.vision.text}
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-8">
          {language === 'en' ? 'Our Core Values' : 'ہماری بنیادی اقدار'}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {t.values.map((value, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-800/60 backdrop-blur-sm rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-lg">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8 mb-12 border border-indigo-200 dark:border-indigo-800">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
          {t.story.title}
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
          {t.story.text}
        </p>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
          {t.team.title}
        </h2>
        <ul className="space-y-3">
          {t.team.points.map((point, index) => (
            <li key={index} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
              <span className="text-indigo-600 dark:text-indigo-400 text-xl">✓</span>
              <span className="text-lg">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutUs;
