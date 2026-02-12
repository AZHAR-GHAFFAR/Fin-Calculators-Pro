import React, { useState, useEffect } from 'react';
import { Calculator, Zap, ToggleLeft, ToggleRight } from 'lucide-react';
import AdvancedScientificCalculator from '../components/AdvancedScientificCalculator';
import MaxAdvancedScientificCalculator from '../components/MaxAdvancedScientificCalculator';

const ScientificCalculatorHub = ({ language = 'en', darkMode: globalDarkMode }) => {
  const [calculatorMode, setCalculatorMode] = useState('basic'); // 'basic' or 'advanced'
  
  // Use global dark mode from App.js
  const isDarkMode = globalDarkMode !== undefined ? globalDarkMode : true;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      
      {/* Toggle Header */}
      <div className={`backdrop-blur-xl border-b shadow-lg transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-slate-900/80 border-slate-700' 
          : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            
            {/* Title */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <Calculator className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className={`text-2xl sm:text-3xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {language === 'en' ? 'Scientific Calculator' : 'سائنسی کیلکولیٹر'}
                </h1>
                <p className={`text-xs sm:text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {calculatorMode === 'basic' 
                    ? (language === 'en' ? 'Basic Mode - Quick Calculations' : 'بیسک موڈ - فوری حساب کتاب')
                    : (language === 'en' ? 'Advanced Mode - Professional Features' : 'ایڈوانسڈ موڈ - پیشہ ورانہ خصوصیات')
                  }
                </p>
              </div>
            </div>

            {/* Toggle Switch */}
            <div className={`flex items-center gap-3 backdrop-blur-sm rounded-2xl p-1.5 border shadow-lg transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-slate-800/50 border-slate-700' 
                : 'bg-white/50 border-slate-300'
            }`}>
              {/* Basic Mode Button */}
              <button
                onClick={() => setCalculatorMode('basic')}
                className={`
                  flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base
                  transition-all duration-300 transform
                  ${calculatorMode === 'basic'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                    : isDarkMode
                      ? 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-700/50'
                      : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">
                  {language === 'en' ? 'Basic' : 'بیسک'}
                </span>
                <span className="sm:hidden">Basic</span>
              </button>

              {/* Advanced Mode Button */}
              <button
                onClick={() => setCalculatorMode('advanced')}
                className={`
                  flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base
                  transition-all duration-300 transform
                  ${calculatorMode === 'advanced'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                    : isDarkMode
                      ? 'bg-transparent text-slate-400 hover:text-white hover:bg-slate-700/50'
                      : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }
                `}
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">
                  {language === 'en' ? 'Advanced' : 'ایڈوانسڈ'}
                </span>
                <span className="sm:hidden">Pro</span>
              </button>
            </div>

          </div>

          {/* Info Banner */}
          <div className={`mt-3 p-3 rounded-lg border transition-colors duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20'
              : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
          }`}>
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5">
                {calculatorMode === 'basic' ? (
                  <Calculator className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                ) : (
                  <Zap className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                )}
              </div>
              <div className={`flex-1 text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-700'
              }`}>
                {calculatorMode === 'basic' ? (
                  language === 'en' ? (
                    <>
                      <strong className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>Basic Mode:</strong> Perfect for quick calculations with essential scientific functions. 
                      Includes trigonometry, logarithms, memory functions, and keyboard support.
                    </>
                  ) : (
                    <>
                      <strong className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>بیسک موڈ:</strong> فوری حساب کتاب کے لیے بہترین۔ 
                      تکونیات، لوگارتھم، میموری فنکشنز، اور کی بورڈ سپورٹ شامل ہے۔
                    </>
                  )
                ) : (
                  language === 'en' ? (
                    <>
                      <strong className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>Advanced Mode:</strong> Professional calculator with 50+ functions, graphing, 
                      matrix operations, unit converter, statistics, equation solver, voice input/output, and much more!
                    </>
                  ) : (
                    <>
                      <strong className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>ایڈوانسڈ موڈ:</strong> 50+ فنکشنز کے ساتھ پیشہ ورانہ کیلکولیٹر، 
                      گرافنگ، میٹرکس، یونٹ کنورٹر، اعداد و شمار، مساوات حل کرنے والا، آواز ان پٹ/آؤٹ پٹ، اور بہت کچھ!
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculator Content */}
      <div className="transition-all duration-500 ease-in-out">
        {calculatorMode === 'basic' ? (
          <div className="animate-fade-in">
            <AdvancedScientificCalculator language={language} darkMode={isDarkMode} />
          </div>
        ) : (
          <div className="animate-fade-in">
            <MaxAdvancedScientificCalculator language={language} darkMode={isDarkMode} />
          </div>
        )}
      </div>

      {/* Features Comparison - Bottom Info */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid sm:grid-cols-2 gap-4">
          
          {/* Basic Mode Features */}
          <div className={`
            rounded-2xl p-6 border-2 transition-all duration-300
            ${calculatorMode === 'basic'
              ? isDarkMode
                ? 'bg-blue-500/10 border-blue-500 shadow-lg shadow-blue-500/20'
                : 'bg-blue-50 border-blue-400 shadow-lg shadow-blue-200'
              : isDarkMode
                ? 'bg-slate-800/50 border-slate-700'
                : 'bg-white border-slate-300'
            }
          `}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {language === 'en' ? 'Basic Mode' : 'بیسک موڈ'}
              </h3>
            </div>
            
            <ul className={`space-y-2 text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                {language === 'en' ? 'Essential scientific functions' : 'ضروری سائنسی فنکشنز'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                {language === 'en' ? 'Trigonometry (sin, cos, tan)' : 'تکونیات (sin, cos, tan)'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                {language === 'en' ? 'Logarithms & exponentials' : 'لوگارتھم اور ایکسپونینشلز'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                {language === 'en' ? 'Memory functions (M+, MR, MC, MS)' : 'میموری فنکشنز (M+, MR, MC, MS)'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                {language === 'en' ? 'Full keyboard support' : 'مکمل کی بورڈ سپورٹ'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                {language === 'en' ? 'Calculation history' : 'حساب کتاب کی تاریخ'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                {language === 'en' ? 'Fast & lightweight' : 'تیز اور ہلکا'}
              </li>
            </ul>

            {calculatorMode !== 'basic' && (
              <button
                onClick={() => setCalculatorMode('basic')}
                className="mt-4 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all"
              >
                {language === 'en' ? 'Switch to Basic' : 'بیسک میں سوئچ کریں'}
              </button>
            )}
          </div>

          {/* Advanced Mode Features */}
          <div className={`
            rounded-2xl p-6 border-2 transition-all duration-300
            ${calculatorMode === 'advanced'
              ? isDarkMode
                ? 'bg-purple-500/10 border-purple-500 shadow-lg shadow-purple-500/20'
                : 'bg-purple-50 border-purple-400 shadow-lg shadow-purple-200'
              : isDarkMode
                ? 'bg-slate-800/50 border-slate-700'
                : 'bg-white border-slate-300'
            }
          `}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className={`text-xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                {language === 'en' ? 'Advanced Mode' : 'ایڈوانسڈ موڈ'}
              </h3>
            </div>
            
            <ul className={`space-y-2 text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-700'
            }`}>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                {language === 'en' ? '50+ advanced functions' : '50+ جدید فنکشنز'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                {language === 'en' ? 'Function graphing & visualization' : 'فنکشن گرافنگ اور تصویری نمائش'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                {language === 'en' ? 'Matrix calculator (multiply, add, determinant)' : 'میٹرکس کیلکولیٹر (ضرب، جمع، ڈیٹرمیننٹ)'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                {language === 'en' ? 'Unit converter (40+ units)' : 'یونٹ کنورٹر (40+ یونٹس)'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                {language === 'en' ? 'Statistical analysis (mean, median, std dev)' : 'شماریاتی تجزیہ (اوسط، میڈین، معیاری انحراف)'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                {language === 'en' ? 'Equation solver & simplifier' : 'مساوات حل کرنے والا اور آسان بنانے والا'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                {language === 'en' ? 'Currency & base converter' : 'کرنسی اور بیس کنورٹر'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                {language === 'en' ? 'Voice input/output support' : 'آواز ان پٹ/آؤٹ پٹ سپورٹ'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                {language === 'en' ? 'Export data as JSON' : 'JSON کے طور پر ڈیٹا ایکسپورٹ کریں'}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                {language === 'en' ? '6 premium themes' : '6 پریمیم تھیمز'}
              </li>
            </ul>

            {calculatorMode !== 'advanced' && (
              <button
                onClick={() => setCalculatorMode('advanced')}
                className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-semibold transition-all shadow-lg"
              >
                {language === 'en' ? 'Switch to Advanced' : 'ایڈوانسڈ میں سوئچ کریں'}
              </button>
            )}
          </div>

        </div>

        {/* Quick Tips */}
        <div className={`mt-6 backdrop-blur-sm rounded-2xl p-6 border transition-colors duration-300 ${
          isDarkMode
            ? 'bg-slate-800/50 border-slate-700'
            : 'bg-white border-slate-300'
        }`}>
          <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            <span>💡</span>
            {language === 'en' ? 'Quick Tips' : 'فوری نکات'}
          </h3>
          <div className={`grid sm:grid-cols-2 gap-4 text-sm transition-colors duration-300 ${
            isDarkMode ? 'text-slate-300' : 'text-slate-700'
          }`}>
            <div>
              <strong className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                {language === 'en' ? 'When to use Basic Mode:' : 'بیسک موڈ کب استعمال کریں:'}
              </strong>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• {language === 'en' ? 'Quick everyday calculations' : 'روزمرہ کی فوری حساب کتاب'}</li>
                <li>• {language === 'en' ? 'School/college homework' : 'اسکول/کالج کا ہوم ورک'}</li>
                <li>• {language === 'en' ? 'Basic trigonometry & logarithms' : 'بنیادی تکونیات اور لوگارتھم'}</li>
                <li>• {language === 'en' ? 'When speed matters' : 'جب رفتار اہم ہو'}</li>
              </ul>
            </div>
            <div>
              <strong className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>
                {language === 'en' ? 'When to use Advanced Mode:' : 'ایڈوانسڈ موڈ کب استعمال کریں:'}
              </strong>
              <ul className="mt-2 space-y-1 ml-4">
                <li>• {language === 'en' ? 'Professional/research work' : 'پیشہ ورانہ/تحقیقی کام'}</li>
                <li>• {language === 'en' ? 'Data analysis & statistics' : 'ڈیٹا تجزیہ اور شماریات'}</li>
                <li>• {language === 'en' ? 'Engineering calculations' : 'انجینئرنگ حساب کتاب'}</li>
                <li>• {language === 'en' ? 'Need graphing or matrix operations' : 'گرافنگ یا میٹرکس آپریشنز کی ضرورت'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ScientificCalculatorHub;