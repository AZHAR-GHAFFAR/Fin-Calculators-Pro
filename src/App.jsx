import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import ModulePage from './components/ModulePage';
import CalculatorPage from './components/CalculatorPage';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import modulesData from './data/modulesData';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';


function App() {
  const [language, setLanguage] = useState('en'); // 'en' or 'ur'
  const [darkMode, setDarkMode] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState([]);

  // Load preferences from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedHistory = JSON.parse(localStorage.getItem('calculationHistory') || '[]');
    
    setLanguage(savedLang);
    setDarkMode(savedDarkMode);
    setCalculationHistory(savedHistory);
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('language', language);
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [language, darkMode]);

  // Save calculation history
  useEffect(() => {
    localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
  }, [calculationHistory]);

  const addToHistory = (calculation) => {
    setCalculationHistory(prev => [
      { ...calculation, timestamp: new Date().toISOString(), id: Date.now() },
      ...prev.slice(0, 49) // Keep last 50 calculations
    ]);
  };

return (
    <Router>
    <ScrollToTop />

      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
          <Toaster position="top-right" />
          
          <Header 
            language={language}
            setLanguage={setLanguage}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route 
                path="/" 
                element={
                  <HomePage 
                    modules={modulesData}
                    language={language}
                    calculationHistory={calculationHistory}
                  />
                } 
              />
              <Route 
                path="/module/:moduleId" 
                element={
                  <ModulePage 
                    modules={modulesData}
                    language={language}
                  />
                } 
              />
              <Route 
                path="/calculator/:moduleId/:calculatorId" 
                element={
                  <CalculatorPage 
                    modules={modulesData}
                    language={language}
                    addToHistory={addToHistory}
                    calculationHistory={calculationHistory}
                  />
                } 
              />
              <Route 
                path="/about" 
                element={<AboutUs language={language} />} 
              />
              <Route 
                path="/contact" 
                element={<Contact language={language} />} 
              />
              <Route 
                path="/privacy" 
                element={<PrivacyPolicy language={language} />} 
              />
              <Route 
                path="/terms" 
                element={<TermsOfService language={language} />} 
              />
            </Routes>
          </main>

          <Footer language={language} />
        </div>
      </div>
    </Router>
  );
}

export default App;

