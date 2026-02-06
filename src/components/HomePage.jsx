
import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, FileText, DollarSign, Calculator, ChevronRight, History, Sparkles, ArrowDown } from 'lucide-react';
import DemoVideo from '../assests/FinCalc Pro.mp4';

const HomePage = ({ modules, language, calculationHistory }) => {
  const navigate = useNavigate();
  const calculatorsRef = useRef(null);
  const featuresRef = useRef(null);

  const [showDemo, setShowDemo] = useState(false);

  // Smooth scroll to calculators section
  const scrollToCalculators = () => {
    calculatorsRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    });
  };

  // Navigate to most popular category (Financial)
  const handleGetStarted = () => {
    const popularModule = modules.find(m => m.id === 'financial') || modules[0];
    navigate(`/module/${popularModule.id}`);
  };

  // Smooth scroll to features
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start'
    });
  };

  const stats = [
    { 
      label: language === 'en' ? 'Calculators' : 'کیلکولیٹرز', 
      value: modules.reduce((sum, m) => sum + m.calculators.length, 0) + '+', 
      color: 'from-blue-500 to-cyan-500' 
    },
    { 
      label: language === 'en' ? 'Users' : 'صارفین', 
      value: '50K+', 
      color: 'from-purple-500 to-pink-500' 
    },
    { 
      label: language === 'en' ? 'Calculations' : 'حساب کتاب', 
      value: '1M+', 
      color: 'from-green-500 to-emerald-500' 
    },
    { 
      label: language === 'en' ? 'Countries' : 'ممالک', 
      value: '120+', 
      color: 'from-orange-500 to-red-500' 
    }
  ];

  const features = [
    { 
      icon: TrendingUp, 
      title: language === 'en' ? 'Visual Graphs' : 'بصری گراف', 
      desc: language === 'en' ? 'Interactive charts & dashboards' : 'انٹرایکٹو چارٹس اور ڈیش بورڈ' 
    },
    { 
      icon: FileText, 
      title: language === 'en' ? 'PDF Reports' : 'پی ڈی ایف رپورٹس', 
      desc: language === 'en' ? 'Download & share results' : 'ڈاؤن لوڈ اور شیئر کریں' 
    },
    { 
      icon: DollarSign, 
      title: language === 'en' ? 'Multi-Currency' : 'ملٹی کرنسی', 
      desc: language === 'en' ? 'Global currency support' : 'عالمی کرنسی کی سپورٹ' 
    },
    { 
      icon: Calculator, 
      title: language === 'en' ? 'Custom Formulas' : 'حسب ضرورت فارمولے', 
      desc: language === 'en' ? 'Advanced calculations' : 'جدید حساب کتاب' 
    }
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10"></div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
          {language === 'en' ? (
            <>
              Calculate Your Financial <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Future Today
              </span>
            </>
          ) : (
            <>
              اپنے مالیاتی <br />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                مستقبل کا حساب لگائیں
              </span>
            </>
          )}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mt-4">
          {language === 'en' 
            ? 'Professional-grade calculators for loans, investments, business planning, and more. Make informed financial decisions with powerful visualization tools.'
            : 'قرضوں، سرمایہ کاری، کاروباری منصوبہ بندی اور بہت کچھ کے لیے پیشہ ورانہ کیلکولیٹرز۔ طاقتور بصری ٹولز کے ساتھ باخبر مالیاتی فیصلے کریں۔'
          }
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <button 
            onClick={scrollToCalculators}
            className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 hover:from-indigo-700 hover:to-purple-700"
          >
            <Calculator className="w-5 h-5" />
            {language === 'en' ? 'Explore Calculators' : 'کیلکولیٹرز دیکھیں'}
          </button>
          <button 
           onClick={() => setShowDemo(true)}
            className="group px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 flex items-center gap-2"
          >
            <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            {language === 'en' ? 'Watch Demo' : 'ڈیمو دیکھیں'}
          </button>
        </div>

        {showDemo && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    onClick={() => setShowDemo(false)}
  >
    {/* Stop click bubbling */}
    <div
      className="relative w-[90%] max-w-4xl bg-black rounded-2xl shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close */}
      <button
        onClick={() => setShowDemo(false)}
        className="absolute -top-4 -right-4 z-50 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600"
      >
        ✕
      </button>

      {/* Video */}
      <video
        className="w-full rounded-2xl"
        autoPlay
        controls
        controlsList="nodownload noplaybackrate"
        disablePictureInPicture
        preload="metadata"
        onContextMenu={(e) => e.preventDefault()}
      >
        <source src={DemoVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
)}

        
        {/* Scroll Indicator */}
        <div className="mt-8 flex justify-center animate-bounce">
          <button 
            onClick={scrollToCalculators}
            className="text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 -mt-4">
        {stats.map((stat, idx) => (
          <div 
            key={idx} 
            className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-700 transform hover:-translate-y-1 cursor-pointer"
          >
            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300`}>
              {stat.value}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Trust Indicators - NEW FEATURE */}
      <div className="flex flex-wrap items-center justify-center gap-8 py-6 px-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
        {/* Free Badge */}
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="font-semibold">{language === 'en' ? '100% Free' : '100% مفت'}</span>
        </div>

        {/* No Registration */}
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <span className="font-semibold">{language === 'en' ? 'No Registration' : 'رجسٹریشن نہیں'}</span>
        </div>

        {/* Secure */}
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-semibold">{language === 'en' ? 'Secure & Private' : 'محفوظ اور نجی'}</span>
        </div>

        {/* Mobile Friendly */}
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="font-semibold">{language === 'en' ? 'Mobile Friendly' : 'موبائل فرینڈلی'}</span>
        </div>
      </div>

      {/* Recent Calculations */}
      {calculationHistory.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <History className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              {language === 'en' ? 'Recent Calculations' : 'حالیہ حساب کتاب'}
            </h3>
          </div>
          <div className="space-y-2">
            {calculationHistory.slice(0, 5).map((calc) => (
              <div key={calc.id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">{calc.calculatorName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(calc.timestamp).toLocaleDateString(language === 'en' ? 'en-US' : 'ur-PK')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-indigo-600 dark:text-indigo-400">{calc.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modules Grid */}
      <div ref={calculatorsRef} className="scroll-mt-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
            {language === 'en' ? 'Choose Your Calculator Category' : 'اپنی کیلکولیٹر کیٹگری منتخب کریں'}
          </h3>
          <button
            onClick={scrollToFeatures}
            className="hidden md:flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all"
          >
            {language === 'en' ? 'See Features' : 'خصوصیات دیکھیں'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, idx) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                onClick={() => navigate(`/module/${module.id}`)}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-100 dark:border-slate-700 hover:border-transparent relative overflow-hidden transform hover:-translate-y-1"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(135deg, ${module.color}15, ${module.color}05)` }}
                ></div>
                <div className="relative z-10">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg transition-all duration-300"
                    style={{ backgroundColor: `${module.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: module.color }} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                    {language === 'en' ? module.name : module.nameUrdu}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    {module.calculators.length} {language === 'en' ? 'calculators' : 'کیلکولیٹرز'}
                  </p>
                  <div className="flex items-center text-sm font-semibold group-hover:gap-2 transition-all duration-200" style={{ color: module.color }}>
                    {language === 'en' ? 'Explore' : 'دیکھیں'} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Testimonials - NEW FEATURE */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-12 shadow-lg border border-slate-100 dark:border-slate-700">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">
            {language === 'en' ? 'What Our Users Say' : 'ہمارے صارفین کیا کہتے ہیں'}
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            {language === 'en' 
              ? 'Trusted by thousands of users across Pakistan'
              : 'پورے پاکستان میں ہزاروں صارفین کا اعتماد'
            }
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: language === 'en' ? 'Ahmed Khan' : 'احمد خان',
              role: language === 'en' ? 'Business Owner' : 'کاروباری',
              text: language === 'en' 
                ? 'Best financial calculator I\'ve used. Helped me plan my business loan perfectly.'
                : 'بہترین مالیاتی کیلکولیٹر۔ میرے کاروباری قرض کی منصوبہ بندی میں بہت مددگار۔',
              rating: 5
            },
            {
              name: language === 'en' ? 'Fatima Ali' : 'فاطمہ علی',
              role: language === 'en' ? 'Real Estate Agent' : 'رئیل اسٹیٹ ایجنٹ',
              text: language === 'en'
                ? 'The SIP calculator helped me start my investment journey. Highly recommended!'
                : 'SIP کیلکولیٹر نے میری سرمایہ کاری شروع کرنے میں مدد کی۔ انتہائی تجویز کردہ!',
              rating: 5
            },
            {
              name: language === 'en' ? 'Hassan Raza' : 'حسن رضا',
              role: language === 'en' ? 'Engineer' : 'انجینئر',
              text: language === 'en'
                ? 'Simple, accurate, and free. Perfect for quick calculations on the go.'
                : 'سادہ، درست اور مفت۔ چلتے پھرتے حسابات کے لیے بہترین۔',
              rating: 5
            }
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-700 dark:to-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-600">
              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-4 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div ref={featuresRef} className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 md:p-12 shadow-lg border border-slate-100 dark:border-slate-700 scroll-mt-20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              {language === 'en' ? 'Why Choose Us' : 'ہمیں کیوں منتخب کریں'}
            </span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3">
            {language === 'en' ? 'Powerful Features' : 'طاقتور خصوصیات'}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Everything you need to make informed financial decisions'
              : 'باخبر مالیاتی فیصلے کرنے کے لیے آپ کو جو کچھ چاہیے'
            }
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div 
                key={idx} 
                className="group text-center p-6 rounded-xl bg-white dark:bg-slate-800/50 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20 transition-all duration-300 hover:shadow-lg border border-transparent hover:border-indigo-200 dark:hover:border-indigo-800"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <Icon className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-lg">{feature.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
        
        {/* CTA in Features Section */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {language === 'en' ? 'Need Help? Contact Us' : 'مدد چاہیے؟ رابطہ کریں'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;