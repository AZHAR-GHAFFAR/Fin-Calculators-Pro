
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, FileText, DollarSign, Calculator, ChevronRight, History, Sparkles, ArrowDown, X, Cookie, Shield, Bell, Check, Lock, Zap, Users, Award, Globe } from 'lucide-react';
import DemoVideo from '../assests/FinCalc Pro.mp4';

const HomePage = ({ modules, language, calculationHistory }) => {
  const navigate = useNavigate();
  const calculatorsRef = useRef(null);
  const featuresRef = useRef(null);

  const [showDemo, setShowDemo] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [welcomeAnimationComplete, setWelcomeAnimationComplete] = useState(false);

   // Check if user has already seen welcome popup and accepted cookies
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');

    if (!hasSeenWelcome) {
      setTimeout(() => {
        setShowWelcomePopup(true);
      }, 800);
    }

    if (!hasAcceptedCookies) {
      if (hasSeenWelcome) {
        setTimeout(() => {
          setShowCookieConsent(true);
        }, 1200);
      }
    }
  }, []);

  // Handle welcome popup close
  const handleCloseWelcome = () => {
    setWelcomeAnimationComplete(true);
    setTimeout(() => {
      setShowWelcomePopup(false);
      localStorage.setItem('hasSeenWelcome', 'true');
      
      const hasAcceptedCookies = localStorage.getItem('cookiesAccepted');
      if (!hasAcceptedCookies) {
        setTimeout(() => {
          setShowCookieConsent(true);
        }, 600);
      }
    }, 400);
  };

  // Handle cookie acceptance
  const handleAcceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookieAcceptedDate', new Date().toISOString());
    setShowCookieConsent(false);
  };

  // Handle cookie decline
  const handleDeclineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setShowCookieConsent(false);
  };

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
      
       {/* PROFESSIONAL WELCOME POPUP MODAL - FULLY REDESIGNED & MOBILE RESPONSIVE */}
      {showWelcomePopup && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-all duration-300 ${
            welcomeAnimationComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)'
          }}
          onClick={handleCloseWelcome}
        >
          <div
            className={`relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 ${
              welcomeAnimationComplete ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
            }`}
            style={{
              maxHeight: '95vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient Header Strip */}
            <div className="h-1.5 sm:h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

            {/* Close Button */}
            <button
              onClick={handleCloseWelcome}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-red-500 dark:hover:bg-red-600 text-slate-600 dark:text-slate-300 hover:text-white flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg group"
              aria-label="Close welcome popup"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-200" />
            </button>

            {/* Content Container */}
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              {/* Header Section */}
              <div className="text-center mb-6 sm:mb-8">
                {/* Animated Logo */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur-xl opacity-40 animate-pulse"></div>
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-xl">
                      <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Welcome Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent px-2">
                  {language === 'en' ? 'Welcome to FinCalc Pro!' : 'FinCalc Pro میں خوش آمدید!'}
                </h2>
                
                {/* Subtitle */}
                <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto px-2">
                  {language === 'en' 
                    ? 'Professional financial calculators designed for everyone'
                    : 'ہر کسی کے لیے ڈیزائن کیے گئے پیشہ ورانہ مالیاتی کیلکولیٹرز'
                  }
                </p>
              </div>

              {/* Features Grid - Mobile Responsive */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                {[
                  { 
                    icon: Shield, 
                    title: language === 'en' ? '100% Free' : '100% مفت',
                    color: 'from-green-500 to-emerald-500'
                  },
                  { 
                    icon: Lock, 
                    title: language === 'en' ? 'Secure' : 'محفوظ',
                    color: 'from-blue-500 to-cyan-500'
                  },
                  { 
                    icon: Zap, 
                    title: language === 'en' ? 'Fast' : 'تیز',
                    color: 'from-yellow-500 to-orange-500'
                  },
                  { 
                    icon: Award, 
                    title: language === 'en' ? 'Pro' : 'پیشہ ورانہ',
                    color: 'from-purple-500 to-pink-500'
                  }
                ].map((feature, idx) => (
                  <div 
                    key={idx}
                    className="text-center p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-800 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200"
                  >
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-1.5 sm:mb-2 shadow-sm mx-auto`}>
                      <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <p className="font-semibold text-slate-800 dark:text-white text-xs sm:text-sm">
                      {feature.title}
                    </p>
                  </div>
                ))}
              </div>

              {/* Key Benefits - Compact */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-5 sm:mb-6 border border-indigo-200 dark:border-indigo-900/50">
                <h3 className="font-bold text-slate-800 dark:text-white mb-3 sm:mb-4 text-center text-base sm:text-lg flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                  {language === 'en' ? 'What You Get' : 'آپ کو کیا ملتا ہے'}
                </h3>
                <div className="grid sm:grid-cols-2 gap-2 sm:gap-2.5">
                  {[
                    language === 'en' ? '25+ Professional Calculators' : '25+ پیشہ ورانہ کیلکولیٹرز',
                    language === 'en' ? 'English & Urdu Support' : 'انگلش اور اردو سپورٹ',
                    language === 'en' ? 'No Registration Needed' : 'رجسٹریشن کی ضرورت نہیں',
                    language === 'en' ? 'Works on All Devices' : 'تمام ڈیوائسز پر کام کرتا ہے'
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button
                  onClick={() => {
                    handleCloseWelcome();
                    scrollToCalculators();
                  }}
                  className="group w-full px-5 py-3 sm:px-6 sm:py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Calculator className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
                  {language === 'en' ? 'Explore Calculators' : 'کیلکولیٹرز دیکھیں'}
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={handleCloseWelcome}
                  className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-lg sm:rounded-xl shadow hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 border border-slate-300 dark:border-slate-700 text-sm sm:text-base"
                >
                  {language === 'en' ? 'Close' : 'بند کریں'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PROFESSIONAL COOKIE CONSENT BANNER */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 animate-slide-up">
          <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            {/* Gradient Top Border */}
            <div className="h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"></div>
            
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                {/* Cookie Icon - Hidden on mobile */}
                <div className="hidden sm:flex flex-shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl flex items-center justify-center shadow-md border border-orange-200 dark:border-orange-800">
                    <Cookie className="w-6 h-6 sm:w-7 sm:h-7 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Cookie className="w-5 h-5 sm:hidden text-orange-600 dark:text-orange-400" />
                    {language === 'en' ? 'We Value Your Privacy' : 'ہم آپ کی رازداری کی قدر کرتے ہیں'}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {language === 'en' 
                      ? 'We use cookies to save your preferences. Your data stays on your device.'
                      : 'ہم آپ کی ترجیحات محفوظ کرنے کے لیے کوکیز استعمال کرتے ہیں۔ آپ کا ڈیٹا آپ کے ڈیوائس پر رہتا ہے۔'
                    }
                  </p>

                  {/* Info Badges */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {[
                      { icon: Lock, text: language === 'en' ? 'Local Only' : 'صرف مقامی' },
                      { icon: Shield, text: language === 'en' ? 'No Tracking' : 'کوئی ٹریکنگ نہیں' }
                    ].map((badge, idx) => (
                      <div key={idx} className="flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300">
                        <badge.icon className="w-3 h-3" />
                        <span className="hidden sm:inline">{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleAcceptCookies}
                    className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-1.5 whitespace-nowrap text-sm sm:text-base"
                  >
                    <Check className="w-4 h-4" />
                    {language === 'en' ? 'Accept' : 'قبول کریں'}
                  </button>
                  <button
                    onClick={handleDeclineCookies}
                    className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-lg transition-all duration-200 text-sm sm:text-base"
                  >
                    {language === 'en' ? 'Decline' : 'انکار'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


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
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 transition-opacity duration-300"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
            onClick={() => setShowDemo(false)}
          >
            <div
              className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300"
              style={{
                maxHeight: '95vh'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Professional Header with Branding */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm sm:text-base md:text-lg">
                      {language === 'en' ? 'FinCalc Pro Demo' : 'FinCalc Pro ڈیمو'}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm hidden sm:block">
                      {language === 'en' ? 'See how it works' : 'دیکھیں یہ کیسے کام کرتا ہے'}
                    </p>
                  </div>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setShowDemo(false)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 hover:scale-110 group"
                  aria-label="Close video"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>

              {/* Video Container */}
              <div className="bg-black">
                <video
                  className="w-full"
                  autoPlay
                  controls
                  controlsList="nodownload noplaybackrate"
                  disablePictureInPicture
                  preload="metadata"
                  onContextMenu={(e) => e.preventDefault()}
                  style={{
                    maxHeight: 'calc(95vh - 80px)'
                  }}
                >
                  <source src={DemoVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Professional Footer */}
              <div className="bg-slate-50 dark:bg-slate-800 px-4 sm:px-6 py-3 border-t border-slate-200 dark:border-slate-700">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center sm:text-left">
                    {language === 'en' 
                      ? '💡 Watch how our calculators help you make smart financial decisions'
                      : '💡 دیکھیں کہ ہمارے کیلکولیٹرز آپ کو سمارٹ مالیاتی فیصلے کرنے میں کیسے مدد کرتے ہیں'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setShowDemo(false);
                      scrollToCalculators();
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Calculator className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {language === 'en' ? 'Try Now' : 'ابھی آزمائیں'}
                  </button>
                </div>
              </div>
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