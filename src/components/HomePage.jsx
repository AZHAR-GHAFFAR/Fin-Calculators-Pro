import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, FileText, DollarSign, Calculator, ChevronRight, History } from 'lucide-react';

const HomePage = ({ modules, language, calculationHistory }) => {
  const navigate = useNavigate();

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
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
            {language === 'en' ? 'Explore Calculators' : 'کیلکولیٹرز دیکھیں'}
          </button>
          <button className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 border border-slate-200 dark:border-slate-700">
            {language === 'en' ? 'Watch Demo' : 'ڈیمو دیکھیں'}
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100 dark:border-slate-700">
            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
              {stat.value}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">{stat.label}</div>
          </div>
        ))}
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
      <div>
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
          {language === 'en' ? 'Choose Your Calculator Category' : 'اپنی کیلکولیٹر کیٹگری منتخب کریں'}
        </h3>
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

      {/* Features */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
          {language === 'en' ? 'Powerful Features' : 'طاقتور خصوصیات'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h4 className="font-bold text-slate-800 dark:text-white mb-1">{feature.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
