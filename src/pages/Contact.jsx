import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";

const Contact = ({ language }) => {

  const navigate = useNavigate(); 
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const content = {
    en: {
      title: 'Contact Us',
      subtitle: 'Get in touch with our team',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject',
        message: 'Your Message',
        send: 'Send Message',
        sending: 'Sending...'
      },
      info: {
        title: 'Contact Information',
        email: 'Email Us',
        phone: 'Call Us',
        address: 'Visit Us',
        hours: 'Business Hours'
      },
      successMessage: 'Message sent successfully! We will get back to you soon.',
      errorMessage: 'Please fill in all fields',
      sendError: 'Failed to send message. Please try again or contact us directly via email.'
    },
    ur: {
      title: 'ہم سے رابطہ کریں',
      subtitle: 'ہماری ٹیم سے رابطہ کریں',
      form: {
        name: 'آپ کا نام',
        email: 'آپ کی ای میل',
        subject: 'موضوع',
        message: 'آپ کا پیغام',
        send: 'پیغام بھیجیں',
        sending: 'بھیجا جا رہا ہے...'
      },
      info: {
        title: 'رابطے کی معلومات',
        email: 'ای میل کریں',
        phone: 'کال کریں',
        address: 'ملاقات کریں',
        hours: 'کاروباری اوقات'
      },
      successMessage: 'پیغام کامیابی سے بھیج دیا گیا! ہم جلد ہی آپ سے رابطہ کریں گے۔',
      errorMessage: 'براہ کرم تمام فیلڈز پُر کریں',
      sendError: 'پیغام بھیجنے میں ناکام۔ براہ کرم دوبارہ کوشش کریں یا براہ راست ای میل کے ذریعے ہم سے رابطہ کریں۔'
    }
  };

  const t = content[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error(t.errorMessage);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(language === 'en' ? 'Please enter a valid email address' : 'براہ کرم ایک درست ای میل ایڈریس درج کریں');
      return;
    }

    setIsSubmitting(true);

    try {
      // EmailJS Configuration
      const serviceID = 'service_xge3vxf'; // Get from emailjs.com
      const templateID = 'template_ydw3q3d'; // Get from emailjs.com
      const publicKey = 'FGu7iMlWZMYeylBAW'; // Get from emailjs.com

      // Template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'azharmughal861@gmail.com',
        reply_to: formData.email,
        time: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceID,
        templateID,
        templateParams,
        publicKey
      );

      if (response.status === 200) {
        toast.success(t.successMessage, {
          duration: 5000,
          icon: '✅'
        });
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error(t.sendError, {
        duration: 6000,
        icon: '❌'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t.info.email,
      value: 'azharmughal861@gmail.com',
      link: 'mailto:azharmughal861@gmail.com'
    },
    {
      icon: Phone,
      title: t.info.phone,
      value: '+92 329 0300036',
      link: 'tel:+923290300036'
    },
    {
      icon: MapPin,
      title: t.info.address,
      value: 'Lahore, Punjab, Pakistan',
      link: null
    },
    {
      icon: Clock,
      title: t.info.hours,
      value: language === 'en' ? 'Mon - Fri: 9:00 AM - 6:00 PM' : 'پیر - جمعہ: صبح 9 بجے - شام 6 بجے',
      link: null
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          {t.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              {language === 'en' ? 'Send us a message' : 'ہمیں پیغام بھیجیں'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t.form.name}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={t.form.name}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t.form.email}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={t.form.email}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t.form.subject}
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={t.form.subject}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t.form.message}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                rows="5"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder={t.form.message}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.form.sending}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  {t.form.send}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-8 border border-indigo-200 dark:border-indigo-800">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
              {t.info.title}
            </h2>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-lg">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    {item.link ? (
                      <a
                        href={item.link}
                        className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-600 dark:text-slate-300">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Teaser */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-8 border border-slate-200 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
              {language === 'en' ? 'Frequently Asked Questions' : 'اکثر پوچھے گئے سوالات'}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              {language === 'en' 
                ? 'Looking for quick answers? Check out our FAQ section for common questions about our calculators and services.'
                : 'فوری جوابات تلاش کر رہے ہیں؟ ہمارے کیلکولیٹرز اور خدمات کے بارے میں عام سوالات کے لیے ہمارا FAQ سیکشن دیکھیں۔'
              }
            </p>
            <button
            onClick={() => navigate("/faq")}
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              {language === 'en' ? 'View FAQ →' : 'FAQ دیکھیں ←'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
