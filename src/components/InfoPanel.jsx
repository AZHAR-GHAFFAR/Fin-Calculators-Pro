import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, BookOpen, Calculator, AlertCircle } from 'lucide-react';

const InfoPanel = ({ 
  language, 
  title,
  formula,
  variables,
  example,
  terms,
  note,
  colorScheme = 'blue'
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const colors = {
    blue: {
      bg: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600',
      noteBg: 'bg-blue-50 dark:bg-blue-900/20',
      noteBorder: 'border-blue-200 dark:border-blue-800',
      noteText: 'text-blue-800 dark:text-blue-300'
    },
    green: {
      bg: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
      border: 'border-green-200 dark:border-green-800',
      icon: 'text-green-600',
      noteBg: 'bg-green-50 dark:bg-green-900/20',
      noteBorder: 'border-green-200 dark:border-green-800',
      noteText: 'text-green-800 dark:text-green-300'
    },
    purple: {
      bg: 'from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20',
      border: 'border-purple-200 dark:border-purple-800',
      icon: 'text-purple-600',
      noteBg: 'bg-purple-50 dark:bg-purple-900/20',
      noteBorder: 'border-purple-200 dark:border-purple-800',
      noteText: 'text-purple-800 dark:text-purple-300'
    },
    red: {
      bg: 'from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20',
      border: 'border-red-200 dark:border-red-800',
      icon: 'text-red-600',
      noteBg: 'bg-amber-50 dark:bg-amber-900/20',
      noteBorder: 'border-amber-200 dark:border-amber-800',
      noteText: 'text-amber-800 dark:text-amber-300'
    }
  };

  const scheme = colors[colorScheme] || colors.blue;

  return (
    <div className={`bg-gradient-to-r ${scheme.bg} rounded-2xl p-6 border ${scheme.border} mb-8`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-4"
      >
        <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Info className={`w-5 h-5 ${scheme.icon}`} />
          {title || (language === 'en' ? 'How This Calculator Works' : 'یہ کیلکولیٹر کیسے کام کرتا ہے')}
        </h3>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isExpanded && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            {/* Formula Section */}
            {formula && (
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  {language === 'en' ? '📐 Formula Used' : '📐 استعمال شدہ فارمولا'}
                </h4>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4">
                  <p className="font-mono text-sm text-slate-600 dark:text-slate-400 mb-3">{formula}</p>
                  {variables && (
                    <div className="text-xs space-y-1 text-slate-500 dark:text-slate-500">
                      {variables.map((variable, idx) => (
                        <p key={idx}>
                          <strong>{variable.symbol}</strong> = {language === 'en' ? variable.nameEn : variable.nameUrdu}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Example Section */}
            {example && (
              <div>
                <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {language === 'en' ? '💡 Example Scenario' : '💡 مثال'}
                </h4>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-4 text-sm space-y-2">
                  {example.map((item, idx) => (
                    <p key={idx} className="text-slate-700 dark:text-slate-300">
                      <strong>{language === 'en' ? item.labelEn : item.labelUrdu}:</strong> {item.value}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Terms/Definitions */}
          {terms && terms.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {terms.map((term, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {language === 'en' ? term.titleEn : term.titleUrdu}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    {language === 'en' ? term.descEn : term.descUrdu}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Note/Warning */}
          {note && (
            <div className={`${scheme.noteBg} rounded-lg p-3 border ${scheme.noteBorder}`}>
              <p className={`text-xs ${scheme.noteText} flex items-start gap-2`}>
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>{language === 'en' ? 'Note:' : 'نوٹ:'}</strong>{' '}
                  {language === 'en' ? note.en : note.urdu}
                </span>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InfoPanel;