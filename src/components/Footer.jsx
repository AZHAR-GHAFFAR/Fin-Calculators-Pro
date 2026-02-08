
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, Mail, Phone, MapPin, Clock, Globe, 
  Facebook, Twitter, Linkedin, Instagram, Youtube,
  Heart, TrendingUp, Shield, Zap, Award, CheckCircle, Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

const Footer = ({ language }) => {
  // Auto-updating copyright year
  const currentYear = new Date().getFullYear();
  
  // Newsletter state
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle Newsletter Subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!email) {
      toast.error(language === 'en' ? 'Please enter your email' : 'براہ کرم اپنی ای میل درج کریں');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(language === 'en' ? 'Please enter a valid email' : 'براہ کرم درست ای میل درج کریں');
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS Configuration (same as Contact form)
      const serviceID = 'service_xge3vxf';
      const templateID = 'template_ydw3q3d';
      const publicKey = 'FGu7iMlWZMYeylBAW';

      const templateParams = {
        from_name: 'Newsletter Subscriber',
        from_email: email,
        subject: 'New Newsletter Subscription',
        message: `New subscriber: ${email}`,
        to_email: 'azharmughal861@gmail.com',
        reply_to: email,
        time: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      };

      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );

      if (response.status === 200) {
        toast.success(
          language === 'en' 
            ? '🎉 Successfully subscribed to newsletter!' 
            : '🎉 نیوز لیٹر میں کامیابی سے سبسکرائب ہو گئے!',
          { duration: 5000 }
        );
        setEmail('');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error(
        language === 'en' 
          ? 'Failed to subscribe. Please try again.' 
          : 'سبسکرائب کرنے میں ناکامی۔ دوبارہ کوشش کریں۔',
        { duration: 6000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Popular categories with their module IDs
  const popularCategories = [
    { id: 'financial', nameEn: 'Financial', nameUrdu: 'مالیاتی', icon: Calculator },
    { id: 'business', nameEn: 'Business', nameUrdu: 'کاروبار', icon: TrendingUp },
    { id: 'real-estate', nameEn: 'Real Estate', nameUrdu: 'رئیل اسٹیٹ', icon: MapPin },
    { id: 'construction', nameEn: 'Construction', nameUrdu: 'تعمیرات', icon: Calculator },
    { id: 'education', nameEn: 'Education', nameUrdu: 'تعلیم', icon: Calculator },
    { id: 'health-fitness', nameEn: 'Health & Fitness', nameUrdu: 'صحت', icon: Calculator }
  ];

  // Social media links
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-500' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-700' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-600' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-600' }
  ];


  return (
    <footer className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-t border-slate-200 dark:border-slate-700 mt-16 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/25 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))]"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-400/5 to-purple-400/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-12">
          
          {/* Company Info - Larger Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition group">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FinCalc Pro
              </span>
            </Link>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
              {language === 'en' 
                ? 'Professional financial calculators for smart decision making. Trusted by 50,000+ users across Pakistan for accurate financial planning, loan calculations, investment analysis, and business calculations.'
                : 'سمارٹ فیصلہ سازی کے لیے پیشہ ورانہ مالیاتی کیلکولیٹرز۔ پاکستان بھر میں 50,000+ صارفین کا اعتماد درست مالیاتی منصوبہ بندی، قرض کے حساب، سرمایہ کاری کے تجزیے، اور کاروباری حسابات کے لیے۔'
              }
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">250+</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {language === 'en' ? 'Calculators' : 'کیلکولیٹرز'}
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">50K+</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {language === 'en' ? 'Happy Users' : 'خوش صارفین'}
                </p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mb-4">
              <h4 className="font-semibold text-slate-800 dark:text-white mb-3 text-sm">
                {language === 'en' ? 'Follow Us' : 'ہمیں فالو کریں'}
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white dark:bg-slate-700 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-400 ${social.color} border border-slate-200 dark:border-slate-600 hover:shadow-md transition-all hover:-translate-y-1`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
              {language === 'en' ? 'Quick Links' : 'فوری لنکس'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition group">
                  <CheckCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{language === 'en' ? 'About Us' : 'ہمارے بارے میں'}</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition group">
                  <CheckCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{language === 'en' ? 'FAQ' : 'عمومی سوالات'}</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition group">
                  <CheckCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{language === 'en' ? 'Contact' : 'رابطہ کریں'}</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition group">
                  <CheckCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{language === 'en' ? 'Privacy Policy' : 'رازداری کی پالیسی'}</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition group">
                  <CheckCircle className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>{language === 'en' ? 'Terms of Service' : 'سروس کی شرائط'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
              {language === 'en' ? 'Categories' : 'زمرے'}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {popularCategories.map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/module/${category.id}`} 
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition group"
                  >
                    <category.icon className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span>{language === 'en' ? category.nameEn : category.nameUrdu}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
              {language === 'en' ? 'Contact Us' : 'رابطہ'}
            </h3>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-600" />
                <a href="mailto:azharmughal861@gmail.com" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition break-all">
                  azharmughal861@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-600" />
                <a href="tel:+923290300036" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  +92 329 0300036
                </a>
              </li>
              <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-600" />
                <span>Lahore, Punjab, Pakistan</span>
              </li>
              <li className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-600" />
                <span>
                  {language === 'en' ? '24/7 Available' : '24/7 دستیاب'}
                </span>
              </li>
            </ul>

            {/* Newsletter Subscription - FUNCTIONAL */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <h4 className="font-semibold text-slate-800 dark:text-white mb-2 text-sm">
                {language === 'en' ? 'Stay Updated' : 'اپ ڈیٹ رہیں'}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                {language === 'en' 
                  ? 'Get latest calculators & tips'
                  : 'تازہ ترین کیلکولیٹرز اور ٹپس حاصل کریں'
                }
              </p>
             <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                {/* Email Input - Full Width */}
                <div className="relative">
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    placeholder={language === 'en' ? 'Enter email address' : 'ای میل ایڈریس درج کریں'}
                    className="w-full px-2 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  />
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Submit Button - Full Width (NO OVERFLOW!) */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{language === 'en' ? 'Subscribing...' : 'سبسکرائب ہو رہا ہے...'}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{language === 'en' ? 'Subscribe Now' : 'ابھی سبسکرائب کریں'}</span>
                    </>
                  )}
                </button>

                {/* Privacy Note */}
                <p className="text-xs text-slate-500 dark:text-slate-500 text-center flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>
                    {language === 'en' 
                      ? 'We respect your privacy. Unsubscribe anytime.'
                      : 'ہم آپ کی رازداری کا احترام کرتے ہیں۔ کسی بھی وقت ان سبسکرائب کریں۔'
                    }
                  </span>
                </p>
              </form>

              {/* Features List */}
              <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-800/50 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                  <span>{language === 'en' ? 'New calculator alerts' : 'نئے کیلکولیٹر الرٹس'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                  <span>{language === 'en' ? 'Financial tips & guides' : 'مالیاتی ٹپس اور گائیڈز'}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                  <span>{language === 'en' ? 'Exclusive updates' : 'خصوصی اپ ڈیٹس'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-700 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-sm text-slate-600 dark:text-slate-400 text-center md:text-left">
              <p className="flex items-center justify-center md:justify-start gap-1 flex-wrap">
                <span>© {currentYear} FinCalc Pro.</span>
                <span>{language === 'en' ? 'All rights reserved.' : 'تمام حقوق محفوظ ہیں۔'}</span>
                <span className="hidden md:inline">|</span>
                <span className="flex items-center gap-1">
                  <span>{language === 'en' ? 'Made with' : 'بنایا گیا'}</span>
                  <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                  <span>{language === 'en' ? 'in Pakistan' : 'پاکستان میں'}</span>
                </span>
              </p>
            </div>

            {/* Language & Links */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? 'English' : 'اردو'}</span>
              </div>
              <div className="flex gap-4 text-slate-600 dark:text-slate-400">
                <Link to="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  {language === 'en' ? 'Privacy' : 'رازداری'}
                </Link>
                <Link to="/terms" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  {language === 'en' ? 'Terms' : 'شرائط'}
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;