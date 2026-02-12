import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Calculator, Delete, ArrowLeft, X, Plus, Minus, Divide, Equal,
  History, Save, Download, Upload, Settings, Moon, Sun, Copy,
  Check, RotateCcw, Palette, Maximize2, Minimize2, TrendingUp,
  Grid, Sigma, Activity, Code, Zap, Clock, Share2, FileText,
  Camera, Mic, Volume2, VolumeX, Eye, EyeOff, Lock, Unlock
} from 'lucide-react';
import * as math from 'mathjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MaxAdvancedScientificCalculator = ({ language = 'en' }) => {
  // ============ CORE STATES ============
  const [display, setDisplay] = useState('0');
  const [secondaryDisplay, setSecondaryDisplay] = useState('');
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(0);
  const [isDegree, setIsDegree] = useState(true);
  const [isShift, setIsShift] = useState(false);
  const [isAlpha, setIsAlpha] = useState(false);
  
  // ============ UI STATES ============
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState('default');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHistory, setShowHistory] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  
  // ============ ADVANCED FEATURES ============
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [precision, setPrecision] = useState(12);
  const [savedCalculations, setSavedCalculations] = useState([]);
  const [answerMemory, setAnswerMemory] = useState(0);
  
  // ============ TOOLS STATES ============
  const [showGrapher, setShowGrapher] = useState(false);
  const [currentFunction, setCurrentFunction] = useState('x^2');
  const [graphData, setGraphData] = useState([]);
  
  const [showMatrix, setShowMatrix] = useState(false);
  const [matrixA, setMatrixA] = useState([[1, 0], [0, 1]]);
  const [matrixB, setMatrixB] = useState([[1, 0], [0, 1]]);
  const [matrixResult, setMatrixResult] = useState(null);
  
  const [showUnitConverter, setShowUnitConverter] = useState(false);
  const [unitCategory, setUnitCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');
  const [unitValue, setUnitValue] = useState(1);
  
  const [showEquationSolver, setShowEquationSolver] = useState(false);
  const [equation, setEquation] = useState('');
  const [equationResult, setEquationResult] = useState(null);
  
  const [showStats, setShowStats] = useState(false);
  const [statsData, setStatsData] = useState([]);
  const [statsResults, setStatsResults] = useState(null);
  
  const [showBaseConverter, setShowBaseConverter] = useState(false);
  const [baseFrom, setBaseFrom] = useState(10);
  const [baseTo, setBaseTo] = useState(2);
  const [baseValue, setBaseValue] = useState('10');
  
  const [showCurrency, setShowCurrency] = useState(false);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('PKR');
  const [currencyAmount, setCurrencyAmount] = useState(1);
  
  // ============ VOICE ============
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // ============ THEMES ============
  const themes = {
    default: { 
      primary: 'from-purple-600 to-indigo-600', 
      accent: 'purple',
      bg: 'from-slate-900 via-purple-900 to-slate-900'
    },
    ocean: { 
      primary: 'from-blue-600 to-cyan-600', 
      accent: 'blue',
      bg: 'from-slate-900 via-blue-900 to-slate-900'
    },
    forest: { 
      primary: 'from-green-600 to-emerald-600', 
      accent: 'green',
      bg: 'from-slate-900 via-green-900 to-slate-900'
    },
    sunset: { 
      primary: 'from-orange-600 to-red-600', 
      accent: 'orange',
      bg: 'from-slate-900 via-orange-900 to-slate-900'
    },
    space: { 
      primary: 'from-indigo-900 to-purple-900', 
      accent: 'indigo',
      bg: 'from-black via-indigo-950 to-black'
    },
    matrix: { 
      primary: 'from-green-500 to-emerald-500', 
      accent: 'green',
      bg: 'from-black via-green-950 to-black'
    }
  };

  // ============ PHYSICAL CONSTANTS ============
  const physicalConstants = {
    'c': { value: 299792458, desc: 'Speed of Light (m/s)', category: 'Physics' },
    'G': { value: 6.67430e-11, desc: 'Gravitational Constant', category: 'Physics' },
    'h': { value: 6.62607015e-34, desc: 'Planck Constant', category: 'Physics' },
    'e': { value: 1.602176634e-19, desc: 'Elementary Charge', category: 'Physics' },
    'N_A': { value: 6.02214076e23, desc: 'Avogadro Number', category: 'Chemistry' },
    'k_B': { value: 1.380649e-23, desc: 'Boltzmann Constant', category: 'Physics' }
  };

  // ============ UNIT CONVERSIONS ============
  const unitConversions = {
    length: {
      meter: 1,
      kilometer: 0.001,
      centimeter: 100,
      millimeter: 1000,
      mile: 0.000621371,
      yard: 1.09361,
      foot: 3.28084,
      inch: 39.3701
    },
    weight: {
      kilogram: 1,
      gram: 1000,
      milligram: 1000000,
      pound: 2.20462,
      ounce: 35.274,
      ton: 0.001
    },
    temperature: {
      celsius: (v) => v,
      fahrenheit: (v) => (v * 9/5) + 32,
      kelvin: (v) => v + 273.15
    }
  };

  // ============ CURRENCY RATES ============
  const currencyRates = {
    USD: 1,
    PKR: 278,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    CNY: 7.24,
    INR: 83.12
  };

  // ============ AUDIO FEEDBACK ============
  const playSound = useCallback((type = 'click') => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    const frequencies = { click: 800, equals: 1200, error: 400, clear: 600, function: 1000 };
    oscillator.frequency.value = frequencies[type] || 800;
    gainNode.gain.value = 0.1;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
  }, [soundEnabled]);

  // ============ HAPTIC FEEDBACK ============
  const vibrate = useCallback((pattern = 10) => {
    if (vibrationEnabled && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, [vibrationEnabled]);

  // ============ VOICE SYNTHESIS ============
  const speak = useCallback((text) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-US' : 'ur-PK';
    utterance.rate = 1;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled, language]);

  // ============ HANDLE INPUT ============
  const handleInput = useCallback((value) => {
    playSound('click');
    vibrate();
    if (display === '0' && value !== '.' && !['+', '-', '×', '÷'].includes(value)) {
      setDisplay(value);
      setSecondaryDisplay(prev => prev + value);
    } else {
      setDisplay(display + value);
      setSecondaryDisplay(prev => prev + value);
    }
  }, [display, playSound, vibrate]);

  // ============ CALCULATE ============
  const calculate = useCallback(() => {
    playSound('equals');
    vibrate([10, 20, 10]);
    try {
      let expr = display
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, Math.PI.toString())
        .replace(/e(?![0-9])/g, Math.E.toString())
        .replace(/√/g, 'sqrt')
        .replace(/\^/g, '**');

      const result = math.evaluate(expr);
      const formattedResult = typeof result === 'number' 
        ? parseFloat(result.toPrecision(precision)).toString()
        : result.toString();

      setHistory(prev => [...prev, { 
        expression: display, 
        result: formattedResult,
        timestamp: new Date().toISOString(),
        id: Date.now()
      }]);
      
      setSecondaryDisplay(display + ' =');
      setDisplay(formattedResult);
      setAnswerMemory(parseFloat(formattedResult));
      speak(`Result is ${formattedResult}`);
    } catch (error) {
      playSound('error');
      vibrate([20, 10, 20, 10, 20]);
      setDisplay('Error');
      speak('Error in calculation');
      setTimeout(() => {
        setDisplay('0');
        setSecondaryDisplay('');
      }, 1500);
    }
  }, [display, precision, playSound, vibrate, speak]);

  // ============ CLEAR ============
  const clear = useCallback(() => {
    playSound('clear');
    vibrate();
    setDisplay('0');
    setSecondaryDisplay('');
    speak('Cleared');
  }, [playSound, vibrate, speak]);

  // ============ DELETE LAST ============
  const deleteLast = useCallback(() => {
    playSound();
    vibrate();
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    setSecondaryDisplay(prev => prev.slice(0, -1));
  }, [playSound, vibrate]);

  // ============ SCIENTIFIC FUNCTIONS ============
  const scientificFunction = useCallback((func) => {
    playSound('function');
    vibrate();
    try {
      let result;
      const val = parseFloat(display);
      switch(func) {
        case 'sin': result = isDegree ? Math.sin(val * Math.PI / 180) : Math.sin(val); break;
        case 'cos': result = isDegree ? Math.cos(val * Math.PI / 180) : Math.cos(val); break;
        case 'tan': result = isDegree ? Math.tan(val * Math.PI / 180) : Math.tan(val); break;
        case 'asin': result = isDegree ? Math.asin(val) * 180 / Math.PI : Math.asin(val); break;
        case 'acos': result = isDegree ? Math.acos(val) * 180 / Math.PI : Math.acos(val); break;
        case 'atan': result = isDegree ? Math.atan(val) * 180 / Math.PI : Math.atan(val); break;
        case 'sinh': result = Math.sinh(val); break;
        case 'cosh': result = Math.cosh(val); break;
        case 'tanh': result = Math.tanh(val); break;
        case 'sqrt': result = Math.sqrt(val); break;
        case 'cbrt': result = Math.cbrt(val); break;
        case 'square': result = val * val; break;
        case 'cube': result = val * val * val; break;
        case 'pow10': result = Math.pow(10, val); break;
        case 'pow2': result = Math.pow(2, val); break;
        case 'ln': result = Math.log(val); break;
        case 'log': result = Math.log10(val); break;
        case 'log2': result = Math.log2(val); break;
        case '1/x': result = 1 / val; break;
        case 'factorial': result = math.factorial(val); break;
        case 'exp': result = Math.exp(val); break;
        case 'abs': result = Math.abs(val); break;
        case 'round': result = Math.round(val); break;
        case 'floor': result = Math.floor(val); break;
        case 'ceil': result = Math.ceil(val); break;
        case 'random': result = Math.random(); break;
        case 'percent': result = val / 100; break;
        default: return;
      }
      setDisplay(parseFloat(result.toPrecision(precision)).toString());
    } catch (error) {
      setDisplay('Error');
      setTimeout(() => setDisplay('0'), 1500);
    }
  }, [display, isDegree, precision, playSound, vibrate]);

  // ============ MEMORY FUNCTIONS ============
  const memoryStore = () => { setMemory(parseFloat(display)); speak('Memory stored'); };
  const memoryRecall = () => { setDisplay(memory.toString()); speak(`Memory recall: ${memory}`); };
  const memoryAdd = () => { setMemory(prev => prev + parseFloat(display)); speak('Added to memory'); };
  const memorySubtract = () => { setMemory(prev => prev - parseFloat(display)); speak('Subtracted from memory'); };
  const memoryClear = () => { setMemory(0); speak('Memory cleared'); };

  // ============ SAVE CALCULATION ============
  const saveCalculation = () => {
    const saved = {
      id: Date.now(),
      expression: display,
      result: display,
      timestamp: new Date().toISOString(),
      name: `Calculation ${savedCalculations.length + 1}`
    };
    setSavedCalculations(prev => [...prev, saved]);
    speak('Calculation saved');
  };

  // ============ EXPORT HISTORY ============
  const exportHistory = () => {
    const data = JSON.stringify(history, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `calculator-history-${Date.now()}.json`;
    a.click();
    speak('History exported');
  };

  // ============ COPY TO CLIPBOARD ============
  const copyToClipboard = () => {
    navigator.clipboard.writeText(display);
    speak('Copied to clipboard');
    vibrate([10, 20, 10]);
  };

  // ============ GRAPH FUNCTION ============
  const graphFunction = () => {
    const data = [];
    for (let x = -10; x <= 10; x += 0.5) {
      try {
        let expr = currentFunction.replace(/x/g, `(${x})`);
        expr = expr.replace(/π/g, Math.PI);
        expr = expr.replace(/e/g, Math.E);
        const y = math.evaluate(expr);
        if (isFinite(y) && !isNaN(y)) {
          data.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) });
        }
      } catch (e) {}
    }
    setGraphData(data);
    speak('Graph generated');
  };

  // ============ MATRIX OPERATIONS ============
  const matrixMultiply = () => {
    try {
      const result = math.multiply(matrixA, matrixB);
      setMatrixResult(result);
      speak('Matrix multiplication complete');
    } catch (e) {
      speak('Error in matrix operation');
    }
  };

  // ============ UNIT CONVERTER ============
  const convertUnit = () => {
    if (!unitConversions[unitCategory]) return 0;
    const conversions = unitConversions[unitCategory];
    if (unitCategory === 'temperature') {
      let celsius = unitValue;
      if (fromUnit === 'fahrenheit') celsius = (unitValue - 32) * 5/9;
      if (fromUnit === 'kelvin') celsius = unitValue - 273.15;
      return conversions[toUnit](celsius);
    } else {
      const fromFactor = conversions[fromUnit];
      const toFactor = conversions[toUnit];
      return (unitValue / fromFactor) * toFactor;
    }
  };

  // ============ BASE CONVERTER ============
  const convertBase = () => {
    try {
      const decimal = parseInt(baseValue, baseFrom);
      return decimal.toString(baseTo).toUpperCase();
    } catch (e) {
      return 'Error';
    }
  };

  // ============ CURRENCY CONVERTER ============
  const convertCurrency = () => {
    const fromRate = currencyRates[fromCurrency];
    const toRate = currencyRates[toCurrency];
    return ((currencyAmount / fromRate) * toRate).toFixed(2);
  };

  // ============ STATISTICS ============
  const calculateStatistics = () => {
    if (statsData.length === 0) return;
    const numbers = statsData.map(Number).filter(n => !isNaN(n));
    const results = {
      count: numbers.length,
      sum: math.sum(numbers),
      mean: math.mean(numbers),
      median: math.median(numbers),
      min: math.min(numbers),
      max: math.max(numbers),
      range: math.max(numbers) - math.min(numbers),
      variance: math.variance(numbers),
      stdDev: math.std(numbers)
    };
    setStatsResults(results);
    speak('Statistics calculated');
  };

  // ============ EQUATION SOLVER ============
  const solveEquation = () => {
    try {
      const solution = math.simplify(equation);
      setEquationResult(solution.toString());
      speak(`Solution is ${solution.toString()}`);
    } catch (e) {
      setEquationResult('Cannot solve equation');
      speak('Cannot solve equation');
    }
  };

  // ============ KEYBOARD SUPPORT ============
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!['F5', 'F11', 'F12'].includes(e.key)) {
        e.preventDefault();
      }
      const key = e.key;
      if (/[0-9.]/.test(key)) handleInput(key);
      else if (key === '+') handleInput('+');
      else if (key === '-') handleInput('-');
      else if (key === '*') handleInput('×');
      else if (key === '/') handleInput('÷');
      else if (key === '(' || key === ')') handleInput(key);
      else if (key === 'Enter' || key === '=') calculate();
      else if (key === 'Backspace') deleteLast();
      else if (key === 'Escape' || key === 'c' || key === 'C') clear();
      else if (key === 'p' || key === 'P') handleInput('π');
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleInput, calculate, deleteLast, clear]);

  // ============ BUTTON COMPONENT ============
  const CalcButton = ({ value, onClick, className = '', span = 1, icon: Icon, secondary, disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${span === 2 ? 'col-span-2' : span === 3 ? 'col-span-3' : ''}
        h-11 sm:h-13 rounded-xl font-bold text-xs sm:text-sm
        transition-all duration-200 transform active:scale-95
        shadow-md hover:shadow-lg relative overflow-hidden
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
      {Icon ? (
        <Icon className="w-4 h-4 mx-auto" />
      ) : (
        <div className="relative z-10">
          <div className="text-xs sm:text-sm font-bold leading-tight">{value}</div>
          {secondary && <div className="text-xs opacity-60 leading-none">{secondary}</div>}
        </div>
      )}
    </button>
  );

  const currentTheme = themes[theme];

  return (
    <div className={`rounded-bl-2xl rounded-br-2xl min-h-screen bg-gradient-to-br ${darkMode ? currentTheme.bg : 'from-slate-100 via-white to-slate-100'} p-1 sm:p-3 lg:p-4 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 overflow-auto' : ''}`}>
      <div className={`max-w-[1920px] mx-auto ${isFullscreen ? 'h-full' : ''}`}>
        
        {/* ============ TOP HEADER ============ */}
        <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">

          {/* Quick Actions */}
          <div className="flex gap-1.5 sm:gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-700'} hover:shadow-xl transition-all`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-white text-slate-700'} shadow-lg hover:shadow-xl transition-all`}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-xl ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-white text-slate-700'} shadow-lg hover:shadow-xl transition-all`}
              title="Settings (F1)"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-2 sm:gap-4">
          
          {/* ============ MAIN CALCULATOR ============ */}
          <div className="lg:col-span-3">
            <div className={`${darkMode ? 'bg-slate-800/95 backdrop-blur-xl border-slate-700' : 'bg-white/95 backdrop-blur-xl border-slate-200'} rounded-2xl shadow-2xl p-3 sm:p-5 border`}>
              
              {/* DISPLAY */}
              <div className="mb-3 sm:mb-5">
                <div className={`${darkMode ? 'bg-black/50' : 'bg-slate-100'} rounded-xl p-2 sm:p-4 min-h-[70px] sm:min-h-[90px] flex flex-col justify-end border-2 ${darkMode ? 'border-slate-700' : 'border-slate-300'} backdrop-blur-sm`}>
                  <div className={`text-xs sm:text-sm ${darkMode ? 'text-slate-500' : 'text-slate-400'} mb-1 font-mono min-h-[16px] truncate`}>
                    {secondaryDisplay}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={display}
                      onChange={(e) => setDisplay(e.target.value)}
                      className={`flex-1 bg-transparent text-right text-xl sm:text-3xl md:text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'} outline-none font-mono`}
                    />
                  </div>
                </div>
                
                {/* Mode indicators & Actions */}
                <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
                  <div className="flex gap-1.5 flex-wrap">
                    <button onClick={() => setIsDegree(!isDegree)} className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg font-semibold text-xs transition-all ${isDegree ? `bg-${currentTheme.accent}-500 text-white` : `${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}`}>DEG</button>
                    <button onClick={() => setIsDegree(!isDegree)} className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg font-semibold text-xs transition-all ${!isDegree ? `bg-${currentTheme.accent}-500 text-white` : `${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}`}>RAD</button>
                    <button onClick={() => setIsShift(!isShift)} className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-lg font-semibold text-xs transition-all ${isShift ? 'bg-yellow-500 text-white' : `${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-200 text-slate-600'}`}`}>SHIFT</button>
                  </div>
                  
                  <div className="flex gap-1.5 items-center flex-wrap">
                    {memory !== 0 && <span className={`px-2 py-0.5 ${darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-700'} rounded text-xs font-bold`}>M</span>}
                    {answerMemory !== 0 && <span className={`px-2 py-0.5 ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'} rounded text-xs font-bold`}>Ans</span>}
                    <button onClick={copyToClipboard} className={`p-1 sm:p-1.5 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} transition-all`} title="Copy (Ctrl+C)"><Copy className="w-3 h-3" /></button>
                    <button onClick={saveCalculation} className={`p-1 sm:p-1.5 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} transition-all`} title="Save (Ctrl+S)"><Save className="w-3 h-3" /></button>
                    <button onClick={() => setShowHistory(!showHistory)} className={`p-1 sm:p-1.5 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} transition-all`} title="History (Ctrl+H)"><History className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>

              {/* CALCULATOR BUTTONS */}
              <div className="grid grid-cols-8 gap-1 text-xs">
                {/* Row 1 - Memory */}
                <CalcButton value="MC" onClick={memoryClear} className="bg-red-500 hover:bg-red-600 text-white" />
                <CalcButton value="MR" onClick={memoryRecall} className="bg-blue-500 hover:bg-blue-600 text-white" />
                <CalcButton value="M+" onClick={memoryAdd} className="bg-blue-500 hover:bg-blue-600 text-white" />
                <CalcButton value="M-" onClick={memorySubtract} className="bg-blue-500 hover:bg-blue-600 text-white" />
                <CalcButton value="MS" onClick={memoryStore} className="bg-blue-500 hover:bg-blue-600 text-white" />
                <CalcButton value="Ans" onClick={() => setDisplay(answerMemory.toString())} className="bg-green-600 hover:bg-green-700 text-white" />
                <CalcButton value="AC" onClick={clear} className="bg-red-500 hover:bg-red-600 text-white" span={2} />

                {/* Row 2 - Trig */}
                <CalcButton value={isShift ? "sin⁻¹" : "sin"} onClick={() => scientificFunction(isShift ? 'asin' : 'sin')} className="bg-purple-500 hover:bg-purple-600 text-white" />
                <CalcButton value={isShift ? "cos⁻¹" : "cos"} onClick={() => scientificFunction(isShift ? 'acos' : 'cos')} className="bg-purple-500 hover:bg-purple-600 text-white" />
                <CalcButton value={isShift ? "tan⁻¹" : "tan"} onClick={() => scientificFunction(isShift ? 'atan' : 'tan')} className="bg-purple-500 hover:bg-purple-600 text-white" />
                <CalcButton value={isShift ? "sinh" : "√"} onClick={() => scientificFunction(isShift ? 'sinh' : 'sqrt')} className="bg-purple-500 hover:bg-purple-600 text-white" />
                <CalcButton value={isShift ? "cosh" : "x²"} onClick={() => scientificFunction(isShift ? 'cosh' : 'square')} className="bg-purple-500 hover:bg-purple-600 text-white" />
                <CalcButton value={isShift ? "tanh" : "x³"} onClick={() => scientificFunction(isShift ? 'tanh' : 'cube')} className="bg-purple-500 hover:bg-purple-600 text-white" />
                <CalcButton value={isShift ? "³√" : "xʸ"} onClick={() => isShift ? scientificFunction('cbrt') : handleInput('^')} className="bg-purple-500 hover:bg-purple-600 text-white" />
                <CalcButton value={isShift ? "eˣ" : "10ˣ"} onClick={() => scientificFunction(isShift ? 'exp' : 'pow10')} className="bg-purple-500 hover:bg-purple-600 text-white" />

                {/* Row 3 - Log & Advanced */}
                <CalcButton value="ln" onClick={() => scientificFunction('ln')} className="bg-cyan-500 hover:bg-cyan-600 text-white" />
                <CalcButton value="log" onClick={() => scientificFunction('log')} className="bg-cyan-500 hover:bg-cyan-600 text-white" />
                <CalcButton value="log₂" onClick={() => scientificFunction('log2')} className="bg-cyan-500 hover:bg-cyan-600 text-white" />
                <CalcButton value="1/x" onClick={() => scientificFunction('1/x')} className="bg-cyan-500 hover:bg-cyan-600 text-white" />
                <CalcButton value="n!" onClick={() => scientificFunction('factorial')} className="bg-cyan-500 hover:bg-cyan-600 text-white" />
                <CalcButton value="|x|" onClick={() => scientificFunction('abs')} className="bg-cyan-500 hover:bg-cyan-600 text-white" />
                <CalcButton value="⌊x⌋" onClick={() => scientificFunction('floor')} className="bg-cyan-500 hover:bg-cyan-600 text-white" />
                <CalcButton value="⌈x⌉" onClick={() => scientificFunction('ceil')} className="bg-cyan-500 hover:bg-cyan-600 text-white" />

                {/* Row 4 - Special */}
                <CalcButton value="π" onClick={() => handleInput('π')} className="bg-teal-500 hover:bg-teal-600 text-white" />
                <CalcButton value="e" onClick={() => handleInput(Math.E.toString())} className="bg-teal-500 hover:bg-teal-600 text-white" />
                <CalcButton value="(" onClick={() => handleInput('(')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-300 hover:bg-slate-400'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value=")" onClick={() => handleInput(')')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-300 hover:bg-slate-400'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="RND" onClick={() => scientificFunction('random')} className="bg-teal-500 hover:bg-teal-600 text-white" />
                <CalcButton value="%" onClick={() => scientificFunction('percent')} className="bg-amber-500 hover:bg-amber-600 text-white" />
                <CalcButton value="EE" onClick={() => handleInput('e')} className="bg-amber-500 hover:bg-amber-600 text-white" />
                <CalcButton icon={Delete} onClick={deleteLast} className="bg-orange-500 hover:bg-orange-600 text-white" />

                {/* Rows 5-7 - Number Pad */}
                <CalcButton value="7" onClick={() => handleInput('7')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="8" onClick={() => handleInput('8')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="9" onClick={() => handleInput('9')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="÷" onClick={() => handleInput('÷')} className="bg-amber-500 hover:bg-amber-600 text-white" />
                <CalcButton value="4" onClick={() => handleInput('4')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="5" onClick={() => handleInput('5')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="6" onClick={() => handleInput('6')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="×" onClick={() => handleInput('×')} className="bg-amber-500 hover:bg-amber-600 text-white" />

                <CalcButton value="1" onClick={() => handleInput('1')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="2" onClick={() => handleInput('2')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="3" onClick={() => handleInput('3')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="-" onClick={() => handleInput('-')} className="bg-amber-500 hover:bg-amber-600 text-white" />
                <CalcButton value="0" onClick={() => handleInput('0')} span={2} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="." onClick={() => handleInput('.')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="+" onClick={() => handleInput('+')} className="bg-amber-500 hover:bg-amber-600 text-white" />

                <CalcButton value="00" onClick={() => handleInput('00')} className={`${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} ${darkMode ? 'text-white' : 'text-slate-800'}`} />
                <CalcButton value="=" onClick={calculate} span={3} className="bg-green-500 hover:bg-green-600 text-white text-base font-bold" />
              </div>

              {/* QUICK TOOLS */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mt-3">
                <button onClick={() => setShowMatrix(!showMatrix)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} transition-all text-xs font-semibold flex flex-col items-center justify-center`}>
                  <Grid className="w-3 h-3 mb-0.5" />
                  <span className="hidden sm:inline">Matrix</span>
                </button>
                <button onClick={() => setShowUnitConverter(!showUnitConverter)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} transition-all text-xs font-semibold flex flex-col items-center justify-center`}>
                  <RotateCcw className="w-3 h-3 mb-0.5" />
                  <span className="hidden sm:inline">Units</span>
                </button>
                <button onClick={exportHistory} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} transition-all text-xs font-semibold flex flex-col items-center justify-center`}>
                  <Download className="w-3 h-3 mb-0.5" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                <button onClick={() => { setShowGrapher(!showGrapher); if (!showGrapher) graphFunction(); }} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} transition-all text-xs font-semibold flex flex-col items-center justify-center`}>
                  <TrendingUp className="w-3 h-3 mb-0.5" />
                  <span className="hidden sm:inline">Graph</span>
                </button>
                <button onClick={() => setShowStats(!showStats)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} transition-all text-xs font-semibold flex flex-col items-center justify-center`}>
                  <Sigma className="w-3 h-3 mb-0.5" />
                  <span className="hidden sm:inline">Stats</span>
                </button>
                <button onClick={() => setShowEquationSolver(!showEquationSolver)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} transition-all text-xs font-semibold flex flex-col items-center justify-center`}>
                  <Code className="w-3 h-3 mb-0.5" />
                  <span className="hidden sm:inline">Solve</span>
                </button>
                <button onClick={() => setShowCurrency(!showCurrency)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} transition-all text-xs font-semibold flex flex-col items-center justify-center`}>
                  <span className="text-sm mb-0.5">$</span>
                  <span className="hidden sm:inline text-xs">Currency</span>
                </button>
                <button onClick={() => setShowBaseConverter(!showBaseConverter)} className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-200 hover:bg-slate-300'} transition-all text-xs font-semibold flex flex-col items-center justify-center`}>
                  <span className="text-sm mb-0.5">Bin</span>
                  <span className="hidden sm:inline text-xs">Base</span>
                </button>
              </div>

              {/* KEYBOARD SHORTCUTS */}
              <div className={`mt-3 p-2 ${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} rounded-lg border`}>
                <p className={`text-xs ${darkMode ? 'text-blue-300' : 'text-blue-800'} font-semibold mb-1 flex items-center gap-1`}>
                  <span>⌨️</span>
                  <span>{language === 'en' ? 'Shortcuts:' : 'شارٹ کٹس:'}</span>
                  <span className="text-xs opacity-75">Enter=Calculate, Esc=Clear, Backspace=Delete, P=π</span>
                </p>
              </div>
            </div>
          </div>

          {/* ============ SIDE PANEL ============ */}
          <div className="lg:col-span-1 space-y-2 sm:space-y-3">
            
            {/* History */}
            {showHistory && (
              <div className={`${darkMode ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-slate-200'} rounded-2xl shadow-2xl p-3 border backdrop-blur-xl`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-1`}>
                    <History className="w-4 h-4" />
                    History
                  </h3>
                  <button onClick={() => setHistory([])} className="text-xs px-2 py-0.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-all">Clear</button>
                </div>

                <div className="space-y-1.5 max-h-[200px] sm:max-h-[300px] overflow-y-auto custom-scrollbar">
                  {history.length === 0 ? (
                    <div className={`text-center py-6 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      <Calculator className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-xs">No calculations</p>
                    </div>
                  ) : (
                    history.slice().reverse().map((item, idx) => (
                      <div key={item.id} onClick={() => setDisplay(item.result)} className={`p-2 ${darkMode ? 'bg-slate-700 border-slate-600 hover:border-indigo-500' : 'bg-slate-50 border-slate-200 hover:border-indigo-400'} rounded-lg border cursor-pointer transition-all group`}>
                        <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} font-mono truncate`}>{item.expression}</div>
                        <div className={`text-sm font-bold ${darkMode ? 'text-indigo-400 group-hover:text-indigo-300' : 'text-indigo-600 group-hover:text-indigo-700'} font-mono`}>= {item.result}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Physical Constants */}
            <div className={`${darkMode ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-slate-200'} rounded-2xl shadow-2xl p-3 border backdrop-blur-xl`}>
              <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>⚛️ Constants</h3>
              <div className="space-y-1.5 max-h-[150px] overflow-y-auto custom-scrollbar">
                {Object.entries(physicalConstants).map(([key, data]) => (
                  <div key={key} onClick={() => setDisplay(data.value.toString())} className={`p-1.5 ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-50 hover:bg-slate-100'} rounded-lg cursor-pointer transition-all`}>
                    <div className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-700'} font-semibold`}>{key}</div>
                    <div className={`text-xs ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} font-mono`}>{data.value.toExponential(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Theme Selector */}
            <div className={`${darkMode ? 'bg-slate-800/95 border-slate-700' : 'bg-white/95 border-slate-200'} rounded-2xl shadow-2xl p-3 border backdrop-blur-xl`}>
              <h3 className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-slate-900'} mb-2 flex items-center gap-1`}>
                <Palette className="w-4 h-4" />
                Themes
              </h3>
              <div className="grid grid-cols-3 gap-1.5">
                {Object.entries(themes).map(([key, value]) => (
                  <button key={key} onClick={() => setTheme(key)} className={`h-8 rounded-lg bg-gradient-to-br ${value.primary} ${theme === key ? 'ring-2 ring-white' : ''} transition-all hover:scale-105 text-xs text-white font-bold opacity-90 hover:opacity-100`} title={key}>
                    {key.slice(0,3)}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ============ MODALS ============ */}
        
        {/* Settings Modal */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowSettings(false)}>
            <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full shadow-2xl`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Settings</h3>
                <button onClick={() => setShowSettings(false)} className="p-2 rounded-lg hover:bg-slate-700 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Sound Effects</span>
                  <button onClick={() => setSoundEnabled(!soundEnabled)} className={`w-12 h-6 rounded-full ${soundEnabled ? 'bg-green-500' : 'bg-slate-600'} relative transition-all`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${soundEnabled ? 'right-0.5' : 'left-0.5'} transition-all`}></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Vibration</span>
                  <button onClick={() => setVibrationEnabled(!vibrationEnabled)} className={`w-12 h-6 rounded-full ${vibrationEnabled ? 'bg-green-500' : 'bg-slate-600'} relative transition-all`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${vibrationEnabled ? 'right-0.5' : 'left-0.5'} transition-all`}></div>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Voice Output</span>
                  <button onClick={() => setVoiceEnabled(!voiceEnabled)} className={`w-12 h-6 rounded-full ${voiceEnabled ? 'bg-green-500' : 'bg-slate-600'} relative transition-all`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${voiceEnabled ? 'right-0.5' : 'left-0.5'} transition-all`}></div>
                  </button>
                </div>
                
                <div>
                  <label className={`block mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Precision: {precision}</label>
                  <input type="range" min="6" max="15" value={precision} onChange={(e) => setPrecision(parseInt(e.target.value))} className="w-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Graph Modal */}
        {showGrapher && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowGrapher(false)}>
            <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-auto`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Function Grapher</h3>
                <button onClick={() => setShowGrapher(false)} className="p-2 rounded-lg hover:bg-slate-700 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <input 
                  type="text" 
                  value={currentFunction} 
                  onChange={(e) => setCurrentFunction(e.target.value)}
                  placeholder="Enter function (e.g., x^2, sin(x))"
                  className={`w-full p-3 rounded-lg ${darkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-900'} border-2 border-slate-600`}
                />
                <button onClick={graphFunction} className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">
                  Generate Graph
                </button>
              </div>
              
              {graphData.length > 0 && (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={graphData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        )}

        {/* Matrix Modal */}
        {showMatrix && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowMatrix(false)}>
            <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-6 max-w-2xl w-full shadow-2xl`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Matrix Calculator</h3>
                <button onClick={() => setShowMatrix(false)} className="p-2 rounded-lg hover:bg-slate-700 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Matrix A (2x2):</p>
                  <div className="grid grid-cols-2 gap-2">
                    {matrixA.map((row, i) => row.map((val, j) => (
                      <input key={`${i}-${j}`} type="number" value={val} onChange={(e) => {
                        const newMatrix = [...matrixA];
                        newMatrix[i][j] = parseFloat(e.target.value) || 0;
                        setMatrixA(newMatrix);
                      }} className={`p-2 rounded ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`} />
                    )))}
                  </div>
                </div>
                
                <div>
                  <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Matrix B (2x2):</p>
                  <div className="grid grid-cols-2 gap-2">
                    {matrixB.map((row, i) => row.map((val, j) => (
                      <input key={`${i}-${j}`} type="number" value={val} onChange={(e) => {
                        const newMatrix = [...matrixB];
                        newMatrix[i][j] = parseFloat(e.target.value) || 0;
                        setMatrixB(newMatrix);
                      }} className={`p-2 rounded ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`} />
                    )))}
                  </div>
                </div>
              </div>
              
              <button onClick={matrixMultiply} className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold mb-4">
                Multiply A × B
              </button>
              
              {matrixResult && (
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <p className={`mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Result:</p>
                  <pre className="font-mono">{JSON.stringify(matrixResult, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Unit Converter Modal */}
        {showUnitConverter && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowUnitConverter(false)}>
            <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full shadow-2xl`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Unit Converter</h3>
                <button onClick={() => setShowUnitConverter(false)} className="p-2 rounded-lg hover:bg-slate-700 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <select value={unitCategory} onChange={(e) => setUnitCategory(e.target.value)} className={`w-full p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <option value="length">Length</option>
                  <option value="weight">Weight</option>
                  <option value="temperature">Temperature</option>
                </select>
                
                <input type="number" value={unitValue} onChange={(e) => setUnitValue(parseFloat(e.target.value))} placeholder="Value" className={`w-full p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`} />
                
                <div className="grid grid-cols-2 gap-4">
                  <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    {Object.keys(unitConversions[unitCategory] || {}).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                  
                  <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    {Object.keys(unitConversions[unitCategory] || {}).map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <p className="text-2xl font-bold text-green-500">{convertUnit().toFixed(4)} {toUnit}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Currency Converter Modal */}
        {showCurrency && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowCurrency(false)}>
            <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full shadow-2xl`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Currency Converter</h3>
                <button onClick={() => setShowCurrency(false)} className="p-2 rounded-lg hover:bg-slate-700 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <input type="number" value={currencyAmount} onChange={(e) => setCurrencyAmount(parseFloat(e.target.value))} placeholder="Amount" className={`w-full p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`} />
                
                <div className="grid grid-cols-2 gap-4">
                  <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    {Object.keys(currencyRates).map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                  
                  <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    {Object.keys(currencyRates).map(curr => (
                      <option key={curr} value={curr}>{curr}</option>
                    ))}
                  </select>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <p className="text-2xl font-bold text-green-500">{convertCurrency()} {toCurrency}</p>
                  <p className={`text-sm mt-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    1 {fromCurrency} = {(currencyRates[toCurrency] / currencyRates[fromCurrency]).toFixed(4)} {toCurrency}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Base Converter Modal */}
        {showBaseConverter && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBaseConverter(false)}>
            <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full shadow-2xl`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Base Converter</h3>
                <button onClick={() => setShowBaseConverter(false)} className="p-2 rounded-lg hover:bg-slate-700 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <input type="text" value={baseValue} onChange={(e) => setBaseValue(e.target.value)} placeholder="Value" className={`w-full p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} font-mono`} />
                
                <div className="grid grid-cols-2 gap-4">
                  <select value={baseFrom} onChange={(e) => setBaseFrom(parseInt(e.target.value))} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <option value="2">Binary (2)</option>
                    <option value="8">Octal (8)</option>
                    <option value="10">Decimal (10)</option>
                    <option value="16">Hexadecimal (16)</option>
                  </select>
                  
                  <select value={baseTo} onChange={(e) => setBaseTo(parseInt(e.target.value))} className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <option value="2">Binary (2)</option>
                    <option value="8">Octal (8)</option>
                    <option value="10">Decimal (10)</option>
                    <option value="16">Hexadecimal (16)</option>
                  </select>
                </div>
                
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                  <p className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Result:</p>
                  <p className="text-2xl font-bold text-green-500 font-mono break-all">{convertBase()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Modal */}
        {showStats && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowStats(false)}>
            <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full shadow-2xl`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Statistics Calculator</h3>
                <button onClick={() => setShowStats(false)} className="p-2 rounded-lg hover:bg-slate-700 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <textarea 
                  value={statsData.join(', ')} 
                  onChange={(e) => setStatsData(e.target.value.split(',').map(v => v.trim()))}
                  placeholder="Enter numbers separated by commas (e.g., 1, 2, 3, 4, 5)"
                  className={`w-full p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} h-24`}
                />
                
                <button onClick={calculateStatistics} className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">
                  Calculate Statistics
                </button>
                
                {statsResults && (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} space-y-2 text-sm`}>
                    <div className="flex justify-between"><span>Count:</span><span className="font-bold">{statsResults.count}</span></div>
                    <div className="flex justify-between"><span>Sum:</span><span className="font-bold">{statsResults.sum.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Mean:</span><span className="font-bold">{statsResults.mean.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Median:</span><span className="font-bold">{statsResults.median.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Min:</span><span className="font-bold">{statsResults.min.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Max:</span><span className="font-bold">{statsResults.max.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Range:</span><span className="font-bold">{statsResults.range.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Std Dev:</span><span className="font-bold">{statsResults.stdDev.toFixed(2)}</span></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Equation Solver Modal */}
        {showEquationSolver && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowEquationSolver(false)}>
            <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full shadow-2xl`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Equation Solver</h3>
                <button onClick={() => setShowEquationSolver(false)} className="p-2 rounded-lg hover:bg-slate-700 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={equation} 
                  onChange={(e) => setEquation(e.target.value)}
                  placeholder="Enter equation (e.g., 2*x + 5)"
                  className={`w-full p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}
                />
                
                <button onClick={solveEquation} className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold">
                  Simplify/Solve
                </button>
                
                {equationResult && (
                  <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    <p className={`text-sm mb-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Result:</p>
                    <p className="text-xl font-bold text-green-500">{equationResult}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Advanced Features Bar */}
        <div className="mt-2 sm:mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
          {[
            { icon: '🎯', title: '50+ Functions', desc: 'Scientific' },
            { icon: '⌨️', title: 'Full Keyboard', desc: 'Desktop' },
            { icon: '📱', title: 'Touch Ready', desc: 'Mobile' },
            { icon: '🎨', title: '6 Themes', desc: 'Customize' },
            { icon: '🔊', title: 'Sound/Voice', desc: 'AI Powered' },
            { icon: '💾', title: 'Export Data', desc: 'Save Work' }
          ].map((feature, idx) => (
            <div key={idx} className={`${darkMode ? 'bg-slate-800/80' : 'bg-white/80'} rounded-xl p-2 border ${darkMode ? 'border-slate-700' : 'border-slate-200'} backdrop-blur-sm`}>
              <div className="text-lg mb-1">{feature.icon}</div>
              <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'} text-xs leading-tight`}>{feature.title}</h4>
              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{feature.desc}</p>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: ${darkMode ? '#1e293b' : '#f1f5f9'}; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${darkMode ? '#475569' : '#cbd5e1'}; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${darkMode ? '#64748b' : '#94a3b8'}; }
      `}</style>
    </div>
  );
};

export default MaxAdvancedScientificCalculator;