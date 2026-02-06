import React from 'react';
import { FileText, AlertCircle, CheckCircle, XCircle, Scale, Shield } from 'lucide-react';

const TermsOfService = ({ language }) => {
  const content = {
    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last Updated: February 2026',
      intro: 'Welcome to FinCalc Pro. By accessing and using our website and calculators, you agree to comply with and be bound by the following terms and conditions.',
      sections: [
        {
          icon: CheckCircle,
          title: '1. Acceptance of Terms',
          content: [
            'By using FinCalc Pro, you accept these Terms of Service in full',
            'If you disagree with any part of these terms, you must not use our website',
            'We reserve the right to update these terms at any time',
            'Continued use of the website constitutes acceptance of updated terms'
          ]
        },
        {
          icon: FileText,
          title: '2. Use of Calculators',
          content: [
            'Our calculators are provided for informational purposes only',
            'Results should not be considered as professional financial advice',
            'We strive for accuracy but do not guarantee 100% precision in all calculations',
            'You are responsible for verifying results before making financial decisions'
          ]
        },
        {
          icon: AlertCircle,
          title: '3. Disclaimer of Warranties',
          content: [
            'The website and calculators are provided "as is" without warranties of any kind',
            'We do not warrant that the service will be uninterrupted or error-free',
            'We are not responsible for any decisions made based on calculator results',
            'Always consult with qualified professionals for important financial decisions'
          ]
        },
        {
          icon: XCircle,
          title: '4. Limitation of Liability',
          content: [
            'FinCalc Pro shall not be liable for any direct or indirect damages',
            'We are not responsible for financial losses resulting from use of our calculators',
            'Users assume all risks associated with using our calculators',
            'This limitation applies to the fullest extent permitted by law'
          ]
        },
        {
          icon: Scale,
          title: '5. Intellectual Property',
          content: [
            'All content on FinCalc Pro is owned by us or our licensors',
            'You may not copy, reproduce, or distribute our content without permission',
            'Calculators and their underlying code are protected by copyright',
            'You may use the calculators for personal, non-commercial purposes only'
          ]
        },
        {
          icon: Shield,
          title: '6. User Conduct',
          content: [
            'You must not use our website for any unlawful purpose',
            'Do not attempt to gain unauthorized access to our systems',
            'Do not interfere with the proper functioning of the website',
            'We reserve the right to restrict access for violations of these terms'
          ]
        },
        {
          icon: FileText,
          title: '7. Third-Party Links',
          content: [
            'Our website may contain links to third-party websites',
            'We are not responsible for the content of linked websites',
            'Third-party sites have their own terms of service and privacy policies',
            'Access to third-party sites is at your own risk'
          ]
        },
        {
          icon: AlertCircle,
          title: '8. Modifications to Service',
          content: [
            'We reserve the right to modify or discontinue the service at any time',
            'We may add, remove, or update calculators without notice',
            'We are not liable for any modifications, suspensions, or discontinuations',
            'Critical updates will be communicated through our website'
          ]
        }
      ],
      professional: {
        title: 'Professional Advice Disclaimer',
        content: 'FinCalc Pro calculators are tools for estimation and planning purposes. They do not constitute professional financial, legal, tax, or investment advice. For important financial decisions, always consult with qualified professionals such as certified financial planners, accountants, lawyers, or other relevant experts.'
      },
      contact: {
        title: 'Questions About Terms?',
        text: 'If you have any questions about these Terms of Service, please contact us at:',
        email: 'azharmughal861@gmail.com'
      }
    },
    ur: {
      title: 'خدمت کی شرائط',
      lastUpdated: 'آخری اپ ڈیٹ: فروری 2026',
      intro: 'FinCalc Pro میں خوش آمدید۔ ہماری ویب سائٹ اور کیلکولیٹرز تک رسائی اور استعمال کرتے ہوئے، آپ درج ذیل شرائط و ضوابط کی تعمیل کرنے اور ان کے پابند ہونے پر متفق ہیں۔',
      sections: [
        {
          icon: CheckCircle,
          title: '۱۔ شرائط کی قبولیت',
          content: [
            'FinCalc Pro استعمال کرتے ہوئے، آپ ان خدمت کی شرائط کو مکمل طور پر قبول کرتے ہیں',
            'اگر آپ ان شرائط کے کسی حصے سے متفق نہیں ہیں، تو آپ کو ہماری ویب سائٹ استعمال نہیں کرنی چاہیے',
            'ہم کسی بھی وقت ان شرائط کو اپ ڈیٹ کرنے کا حق محفوظ رکھتے ہیں',
            'ویب سائٹ کا مسلسل استعمال اپ ڈیٹ شدہ شرائط کی قبولیت کا مطلب ہے'
          ]
        },
        {
          icon: FileText,
          title: '۲۔ کیلکولیٹرز کا استعمال',
          content: [
            'ہمارے کیلکولیٹرز صرف معلوماتی مقاصد کے لیے فراہم کیے جاتے ہیں',
            'نتائج کو پیشہ ورانہ مالی مشورے کے طور پر نہیں سمجھا جانا چاہیے',
            'ہم درستگی کے لیے کوشش کرتے ہیں لیکن تمام حسابات میں 100% درستگی کی ضمانت نہیں دیتے',
            'مالی فیصلے کرنے سے پہلے نتائج کی تصدیق کرنا آپ کی ذمہ داری ہے'
          ]
        },
        {
          icon: AlertCircle,
          title: '۳۔ وارنٹیز سے انکار',
          content: [
            'ویب سائٹ اور کیلکولیٹرز "جیسے ہیں" کسی بھی قسم کی وارنٹی کے بغیر فراہم کیے جاتے ہیں',
            'ہم یہ ضمانت نہیں دیتے کہ سروس بلا تعطل یا غلطی سے پاک ہوگی',
            'ہم کیلکولیٹر کے نتائج کی بنیاد پر کیے گئے کسی بھی فیصلے کے ذمہ دار نہیں ہیں',
            'اہم مالی فیصلوں کے لیے ہمیشہ قابل پیشہ ور افراد سے مشورہ کریں'
          ]
        },
        {
          icon: XCircle,
          title: '۴۔ ذمہ داری کی حد',
          content: [
            'FinCalc Pro کسی بھی براہ راست یا بالواسطہ نقصانات کا ذمہ دار نہیں ہوگا',
            'ہم اپنے کیلکولیٹرز کے استعمال سے ہونے والے مالی نقصانات کے ذمہ دار نہیں ہیں',
            'صارفین ہمارے کیلکولیٹرز کے استعمال سے وابستہ تمام خطرات کو قبول کرتے ہیں',
            'یہ حد قانون کی اجازت کی مکمل حد تک لاگو ہوتی ہے'
          ]
        },
        {
          icon: Scale,
          title: '۵۔ دانشورانہ ملکیت',
          content: [
            'FinCalc Pro پر تمام مواد ہماری یا ہمارے لائسنس دہندگان کی ملکیت ہے',
            'آپ اجازت کے بغیر ہمارے مواد کو کاپی، دوبارہ تیار یا تقسیم نہیں کر سکتے',
            'کیلکولیٹرز اور ان کا بنیادی کوڈ کاپی رائٹ سے محفوظ ہیں',
            'آپ صرف ذاتی، غیر تجارتی مقاصد کے لیے کیلکولیٹرز استعمال کر سکتے ہیں'
          ]
        },
        {
          icon: Shield,
          title: '۶۔ صارف کا طرز عمل',
          content: [
            'آپ کو ہماری ویب سائٹ کسی غیر قانونی مقصد کے لیے استعمال نہیں کرنی چاہیے',
            'ہمارے سسٹمز تک غیر مجاز رسائی حاصل کرنے کی کوشش نہ کریں',
            'ویب سائٹ کے مناسب کام میں مداخلت نہ کریں',
            'ہم ان شرائط کی خلاف ورزی کے لیے رسائی کو محدود کرنے کا حق محفوظ رکھتے ہیں'
          ]
        },
        {
          icon: FileText,
          title: '۷۔ تھرڈ پارٹی لنکس',
          content: [
            'ہماری ویب سائٹ میں تھرڈ پارٹی ویب سائٹس کے لنکس ہو سکتے ہیں',
            'ہم منسلک ویب سائٹس کے مواد کے ذمہ دار نہیں ہیں',
            'تھرڈ پارٹی سائٹس کی اپنی خدمت کی شرائط اور رازداری کی پالیسیاں ہیں',
            'تھرڈ پارٹی سائٹس تک رسائی آپ کے اپنے خطرے پر ہے'
          ]
        },
        {
          icon: AlertCircle,
          title: '۸۔ سروس میں تبدیلیاں',
          content: [
            'ہم کسی بھی وقت سروس کو تبدیل یا بند کرنے کا حق محفوظ رکھتے ہیں',
            'ہم بغیر اطلاع کے کیلکولیٹرز کو شامل، ہٹا یا اپ ڈیٹ کر سکتے ہیں',
            'ہم کسی بھی تبدیلی، معطلی یا بندش کے ذمہ دار نہیں ہیں',
            'اہم اپ ڈیٹس ہماری ویب سائٹ کے ذریعے بتائی جائیں گی'
          ]
        }
      ],
      professional: {
        title: 'پیشہ ورانہ مشورہ اعلان دستبرداری',
        content: 'FinCalc Pro کیلکولیٹرز تخمینہ اور منصوبہ بندی کے مقاصد کے لیے ٹولز ہیں۔ یہ پیشہ ورانہ مالی، قانونی، ٹیکس، یا سرمایہ کاری کے مشورے کا حصہ نہیں ہیں۔ اہم مالی فیصلوں کے لیے، ہمیشہ قابل پیشہ ور افراد جیسے سرٹیفائیڈ مالیاتی منصوبہ ساز، اکاؤنٹنٹس، وکلاء، یا دیگر متعلقہ ماہرین سے مشورہ کریں۔'
      },
      contact: {
        title: 'شرائط کے بارے میں سوالات؟',
        text: 'اگر آپ کے پاس ان خدمت کی شرائط کے بارے میں کوئی سوالات ہیں، تو براہ کرم ہم سے رابطہ کریں:',
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
          <Scale className="w-8 h-8 text-white" />
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
      <div className="space-y-6 mb-8">
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

      {/* Professional Advice Disclaimer */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-xl p-6 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              {t.professional.title}
            </h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              {t.professional.content}
            </p>
          </div>
        </div>
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
          <FileText className="w-5 h-5" />
          {t.contact.email}
        </a>
      </div>
    </div>
  );
};

export default TermsOfService;
