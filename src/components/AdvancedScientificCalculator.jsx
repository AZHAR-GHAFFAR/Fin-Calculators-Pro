import React, { useState, useEffect, useCallback } from 'react';
import { Calculator, Delete, ArrowLeft, X, Plus, Minus, Divide, Equal } from 'lucide-react';
import * as math from 'mathjs';

const AdvancedScientificCalculator = ({ language = 'en', darkMode = true }) => {
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(0);
  const [isDegree, setIsDegree] = useState(true);
  const [isShift, setIsShift] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Handle button click
  const handleInput = useCallback((value) => {
    if (display === '0' && value !== '.' && !['+', '-', '×', '÷'].includes(value)) {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  }, [display]);

  // Calculate result
  const calculate = useCallback(() => {
    try {
      let expr = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString());

      // Convert to radians if needed
      if (!isDegree) {
        expr = expr.replace(/sin\(/g, 'sin(deg2rad(');
        expr = expr.replace(/cos\(/g, 'cos(deg2rad(');
        expr = expr.replace(/tan\(/g, 'tan(deg2rad(');
      }

      const result = math.evaluate(expr);
      const formattedResult = typeof result === 'number' 
        ? parseFloat(result.toPrecision(12)).toString()
        : result.toString();

      setHistory(prev => [...prev, { expression: display, result: formattedResult }]);
      setDisplay(formattedResult);
    } catch (error) {
      setDisplay('Error');
      setTimeout(() => setDisplay('0'), 1500);
    }
  }, [display, isDegree]);

  // Clear display
  const clear = useCallback(() => setDisplay('0'), []);

  // Delete last character
  const deleteLast = useCallback(() => {
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  }, []);

  // Scientific functions
  const scientificFunction = useCallback((func) => {
    try {
      let result;
      const val = parseFloat(display);

      switch(func) {
        case 'sin':
          result = isDegree ? Math.sin(val * Math.PI / 180) : Math.sin(val);
          break;
        case 'cos':
          result = isDegree ? Math.cos(val * Math.PI / 180) : Math.cos(val);
          break;
        case 'tan':
          result = isDegree ? Math.tan(val * Math.PI / 180) : Math.tan(val);
          break;
        case 'sqrt':
          result = Math.sqrt(val);
          break;
        case 'square':
          result = val * val;
          break;
        case 'cube':
          result = val * val * val;
          break;
        case 'ln':
          result = Math.log(val);
          break;
        case 'log':
          result = Math.log10(val);
          break;
        case '1/x':
          result = 1 / val;
          break;
        case 'factorial':
          result = math.factorial(val);
          break;
        case 'exp':
          result = Math.exp(val);
          break;
        default:
          return;
      }

      setDisplay(parseFloat(result.toPrecision(12)).toString());
    } catch (error) {
      setDisplay('Error');
      setTimeout(() => setDisplay('0'), 1500);
    }
  }, [display, isDegree]);

  // Memory functions
  const memoryStore = () => setMemory(parseFloat(display));
  const memoryRecall = () => setDisplay(memory.toString());
  const memoryAdd = () => setMemory(prev => prev + parseFloat(display));
  const memoryClear = () => setMemory(0);

  // Keyboard support
  useEffect(() => {
    const handleKeyPress = (e) => {
      e.preventDefault();
      
      const key = e.key;
      
      // Numbers
      if (/[0-9.]/.test(key)) {
        handleInput(key);
      }
      // Operators
      else if (key === '+') handleInput('+');
      else if (key === '-') handleInput('-');
      else if (key === '*') handleInput('×');
      else if (key === '/') handleInput('÷');
      else if (key === '(' || key === ')') handleInput(key);
      
      // Functions
      else if (key === 'Enter' || key === '=') calculate();
      else if (key === 'Backspace') deleteLast();
      else if (key === 'Escape' || key === 'c' || key === 'C') clear();
      
      // Special
      else if (key === 'p' || key === 'P') handleInput('π');
      else if (key === 'e' && e.ctrlKey) handleInput(Math.E.toString());
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleInput, calculate, deleteLast, clear]);

  // Button component
  const CalcButton = ({ value, onClick, className = '', span = 1, icon: Icon }) => (
    <button
      onClick={onClick}
      className={`
        ${span === 2 ? 'col-span-2' : ''}
        h-14 sm:h-16 rounded-xl font-bold text-base sm:text-lg
        transition-all duration-200 transform active:scale-95
        shadow-md hover:shadow-lg
        ${className}
      `}
    >
      {Icon ? <Icon className="w-5 h-5 mx-auto" /> : value}
    </button>
  );

  return (
    <div className={`rounded-bl-2xl rounded-br-2xl min-h-screen p-4 sm:p-6 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-slate-100 via-white to-slate-100'
    }`}>
      <div className="max-w-6xl mx-auto">

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Main Calculator */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl shadow-2xl p-4 sm:p-6 border transition-colors duration-300 ${
              darkMode 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
            }`}>
              
              {/* Display */}
              <div className="mb-6">
                <div className={`rounded-xl p-4 sm:p-6 min-h-[100px] flex items-end justify-end border-4 transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-slate-900 border-slate-700' 
                    : 'bg-slate-100 border-slate-300'
                }`}>
                  <input
                    type="text"
                    value={display}
                    readOnly
                    className={`w-full bg-transparent text-right text-3xl sm:text-4xl md:text-5xl font-bold outline-none font-mono transition-colors duration-300 ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  />
                </div>
                
                {/* Mode indicators */}
                <div className={`flex justify-between items-center mt-3 text-sm transition-colors duration-300 ${
                  darkMode ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsDegree(!isDegree)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                        isDegree 
                          ? 'bg-blue-500 text-white' 
                          : darkMode
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      DEG
                    </button>
                    <button
                      onClick={() => setIsDegree(!isDegree)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                        !isDegree 
                          ? 'bg-blue-500 text-white' 
                          : darkMode
                            ? 'bg-slate-700 text-slate-300'
                            : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      RAD
                    </button>
                  </div>
                  
                  <div className="flex gap-2 items-center">
                    {memory !== 0 && (
                      <span className={`px-2 py-1 rounded text-xs font-bold transition-colors duration-300 ${
                        darkMode 
                          ? 'bg-yellow-900 text-yellow-300' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        M: {memory}
                      </span>
                    )}
                    <span className="text-xs">⌨️ Keyboard Enabled</span>
                  </div>
                </div>
              </div>

              {/* Calculator Buttons */}
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                
                {/* Row 1 - Memory & Clear */}
                <CalcButton value="MC" onClick={memoryClear} className="bg-red-500 hover:bg-red-600 text-white" />
                <CalcButton value="MR" onClick={memoryRecall} className="bg-blue-500 hover:bg-blue-600 text-white" />
                <CalcButton value="M+" onClick={memoryAdd} className="bg-blue-500 hover:bg-blue-600 text-white" />
                <CalcButton value="MS" onClick={memoryStore} className="bg-blue-500 hover:bg-blue-600 text-white" />
                <CalcButton value="C" onClick={clear} className="bg-red-500 hover:bg-red-600 text-white" />

                {/* Row 2 - Functions */}
                <CalcButton value="sin" onClick={() => scientificFunction('sin')} className="bg-purple-500 hover:bg-purple-600 text-white" />
                <CalcButton value="cos" onClick={() => scientificFunction('cos')} className="bg-purple-500 hover:bg-purple-600 text-white" />
                <CalcButton value="tan" onClick={() => scientificFunction('tan')} className="bg-purple-500 hover:bg-purple-600 text-white" />
                <CalcButton value="√" onClick={() => scientificFunction('sqrt')} className="bg-purple-500 hover:bg-purple-600 text-white" />
                <CalcButton value="x²" onClick={() => scientificFunction('square')} className="bg-purple-500 hover:bg-purple-600 text-white" />

                {/* Row 3 - Advanced Functions */}
                <CalcButton value="x³" onClick={() => scientificFunction('cube')} className="bg-indigo-500 hover:bg-indigo-600 text-white" />
                <CalcButton value="ln" onClick={() => scientificFunction('ln')} className="bg-indigo-500 hover:bg-indigo-600 text-white" />
                <CalcButton value="log" onClick={() => scientificFunction('log')} className="bg-indigo-500 hover:bg-indigo-600 text-white" />
                <CalcButton value="1/x" onClick={() => scientificFunction('1/x')} className="bg-indigo-500 hover:bg-indigo-600 text-white" />
                <CalcButton value="n!" onClick={() => scientificFunction('factorial')} className="bg-indigo-500 hover:bg-indigo-600 text-white" />

                {/* Row 4 - Special & Numbers */}
                <CalcButton value="π" onClick={() => handleInput('π')} className="bg-cyan-500 hover:bg-cyan-600 text-white" />
                <CalcButton value="e" onClick={() => handleInput(Math.E.toString())} className="bg-cyan-500 hover:bg-cyan-600 text-white" />
                <CalcButton value="(" onClick={() => handleInput('(')} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 text-slate-800 dark:text-white" />
                <CalcButton value=")" onClick={() => handleInput(')')} className="bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 text-slate-800 dark:text-white" />
                <CalcButton icon={Delete} onClick={deleteLast} className="bg-orange-500 hover:bg-orange-600 text-white" />

                {/* Row 5 - Numbers */}
                <CalcButton value="7" onClick={() => handleInput('7')} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="8" onClick={() => handleInput('8')} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="9" onClick={() => handleInput('9')} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="÷" onClick={() => handleInput('÷')} className="bg-amber-500 hover:bg-amber-600 text-white" />
                <CalcButton value="×" onClick={() => handleInput('×')} className="bg-amber-500 hover:bg-amber-600 text-white" />

                {/* Row 6 */}
                <CalcButton value="4" onClick={() => handleInput('4')} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="5" onClick={() => handleInput('5')} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="6" onClick={() => handleInput('6')} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="-" onClick={() => handleInput('-')} className="bg-amber-500 hover:bg-amber-600 text-white" />
                <CalcButton value="+" onClick={() => handleInput('+')} className="bg-amber-500 hover:bg-amber-600 text-white" />

                {/* Row 7 */}
                <CalcButton value="1" onClick={() => handleInput('1')} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="2" onClick={() => handleInput('2')} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="3" onClick={() => handleInput('3')} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="." onClick={() => handleInput('.')} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="=" onClick={calculate} className="bg-green-500 hover:bg-green-600 text-white" />

                {/* Row 8 */}
                <CalcButton value="0" onClick={() => handleInput('0')} span={2} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="00" onClick={() => handleInput('00')} className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white" />
                <CalcButton value="EXP" onClick={() => scientificFunction('exp')} className="bg-cyan-500 hover:bg-cyan-600 text-white" />
                <CalcButton value="%" onClick={() => handleInput('/100*')} className="bg-amber-500 hover:bg-amber-600 text-white" />
              </div>

              {/* Keyboard Shortcuts Info */}
              <div className={`mt-4 p-3 rounded-lg border transition-colors duration-300 ${
                darkMode 
                  ? 'bg-blue-900/20 border-blue-800' 
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <p className={`text-xs font-semibold mb-1 transition-colors duration-300 ${
                  darkMode ? 'text-blue-300' : 'text-blue-800'
                }`}>
                  ⌨️ {language === 'en' ? 'Keyboard Shortcuts:' : 'کی بورڈ شارٹ کٹس:'}
                </p>
                <div className={`grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs transition-colors duration-300 ${
                  darkMode ? 'text-blue-400' : 'text-blue-700'
                }`}>
                  <span>0-9: Numbers</span>
                  <span>+, -, *, /: Operators</span>
                  <span>Enter: Calculate</span>
                  <span>Esc/C: Clear</span>
                  <span>Backspace: Delete</span>
                  <span>P: π (Pi)</span>
                  <span>(, ): Parentheses</span>
                  <span>.: Decimal</span>
                </div>
              </div>
            </div>
          </div>

          {/* History Panel */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl shadow-2xl p-4 sm:p-6 border h-full transition-colors duration-300 ${
              darkMode 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-bold transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-slate-900'
                }`}>
                  {language === 'en' ? 'History' : 'تاریخ'}
                </h3>
                <button
                  onClick={() => setHistory([])}
                  className="text-xs px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all"
                >
                  {language === 'en' ? 'Clear' : 'صاف کریں'}
                </button>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {history.length === 0 ? (
                  <div className={`text-center py-12 transition-colors duration-300 ${
                    darkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">
                      {language === 'en' ? 'No calculations yet' : 'ابھی تک کوئی حساب نہیں'}
                    </p>
                  </div>
                ) : (
                  history.slice().reverse().map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setDisplay(item.result)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all group ${
                        darkMode 
                          ? 'bg-slate-700 border-slate-600 hover:border-indigo-500' 
                          : 'bg-slate-50 border-slate-200 hover:border-indigo-400'
                      }`}
                    >
                      <div className={`text-xs mb-1 font-mono transition-colors duration-300 ${
                        darkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {item.expression}
                      </div>
                      <div className={`text-base font-bold font-mono transition-colors duration-300 ${
                        darkMode 
                          ? 'text-indigo-400 group-hover:text-indigo-300' 
                          : 'text-indigo-600 group-hover:text-indigo-700'
                      }`}>
                        = {item.result}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Features Info */}
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <div className={`rounded-xl p-4 border transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}>
            <div className="text-2xl mb-2">🎯</div>
            <h4 className={`font-bold mb-1 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {language === 'en' ? 'Advanced Functions' : 'جدید فنکشنز'}
            </h4>
            <p className={`text-xs transition-colors duration-300 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {language === 'en' ? 'Trigonometry, logarithms, powers & more' : 'تکونیات، لوگارتھم، طاقتیں اور مزید'}
            </p>
          </div>

          <div className={`rounded-xl p-4 border transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}>
            <div className="text-2xl mb-2">⌨️</div>
            <h4 className={`font-bold mb-1 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {language === 'en' ? 'Keyboard Support' : 'کی بورڈ سپورٹ'}
            </h4>
            <p className={`text-xs transition-colors duration-300 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {language === 'en' ? 'Use your keyboard for faster calculations' : 'تیز حساب کتاب کے لیے اپنا کی بورڈ استعمال کریں'}
            </p>
          </div>

          <div className={`rounded-xl p-4 border transition-colors duration-300 ${
            darkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-slate-200'
          }`}>
            <div className="text-2xl mb-2">📱</div>
            <h4 className={`font-bold mb-1 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {language === 'en' ? 'Touch Friendly' : 'ٹچ فرینڈلی'}
            </h4>
            <p className={`text-xs transition-colors duration-300 ${
              darkMode ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {language === 'en' ? 'Optimized for mobile & tablet devices' : 'موبائل اور ٹیبلٹ ڈیوائسز کے لیے بہتر'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdvancedScientificCalculator;