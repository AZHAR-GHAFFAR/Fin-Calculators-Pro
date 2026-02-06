import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ language }) => {
  // Auto-updating copyright year
  const currentYear = new Date().getFullYear();

  // Popular categories with their module IDs
  const popularCategories = [
    { id: 'financial', nameEn: 'Financial', nameUrdu: 'مالیاتی' },
    { id: 'business', nameEn: 'Business', nameUrdu: 'کاروبار' },
    { id: 'real-estate', nameEn: 'Real Estate', nameUrdu: 'رئیل اسٹیٹ' },
    { id: 'construction', nameEn: 'Construction', nameUrdu: 'تعمیرات' }
  ];

  return (
    <footer className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-800 dark:text-white">FinCalc Pro</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {language === 'en' 
                ? 'Professional financial calculators for smart decision making.'
                : 'سمارٹ فیصلہ سازی کے لیے پیشہ ورانہ مالیاتی کیلکولیٹرز۔'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Quick Links' : 'فوری لنکس'}
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  {language === 'en' ? 'About Us' : 'ہمارے بارے میں'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  {language === 'en' ? 'Contact' : 'رابطہ کریں'}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  {language === 'en' ? 'Privacy Policy' : 'رازداری کی پالیسی'}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  {language === 'en' ? 'Terms of Service' : 'سروس کی شرائط'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Popular Categories' : 'مقبول زمرے'}
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              {popularCategories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/module/${category.id}`} 
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  >
                    {language === 'en' ? category.nameEn : category.nameUrdu}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Contact' : 'رابطہ'}
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:azharmughal861@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  azharmughal861@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+923290300036" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  +92 329 0300036 
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Lahore, Pakistan
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mt-8 pt-8 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {currentYear} FinCalc Pro. {language === 'en' ? 'All rights reserved.' : 'تمام حقوق محفوظ ہیں۔'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
