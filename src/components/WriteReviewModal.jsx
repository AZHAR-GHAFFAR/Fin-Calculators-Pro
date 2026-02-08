
import React, { useState } from 'react';
import { X, Star, Loader2, CheckCircle, User, Mail, Briefcase, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

const WriteReviewModal = ({ isOpen, onClose, language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    location: '',
    rating: 0,
    review: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.rating || !formData.review) {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'براہ کرم تمام ضروری فیلڈز پُر کریں');
      return;
    }

    if (formData.rating === 0) {
      toast.error(language === 'en' ? 'Please select a rating' : 'براہ کرم ریٹنگ منتخب کریں');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error(language === 'en' ? 'Please enter a valid email' : 'براہ کرم درست ای میل درج کریں');
      return;
    }

    setIsSubmitting(true);

    try {
      const serviceID = 'service_xge3vxf';
      const templateID = 'template_ydw3q3d';
      const publicKey = 'FGu7iMlWZMYeylBAW';

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: `New Review Submission - ${formData.rating} Stars`,
        message: `
New Review Received!

Name: ${formData.name}
Email: ${formData.email}
Role: ${formData.role || 'Not specified'}
Location: ${formData.location || 'Not specified'}
Rating: ${formData.rating}/5 ⭐

Review:
${formData.review}

Submitted on: ${new Date().toLocaleString()}
        `,
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

      const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);

      if (response.status === 200) {
        toast.success(
          language === 'en' 
            ? '🎉 Thank you for your review! We appreciate your feedback.' 
            : '🎉 آپ کے ریویو کا شکریہ! ہم آپ کے فیڈ بیک کی قدر کرتے ہیں۔',
          { duration: 5000 }
        );
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          role: '',
          location: '',
          rating: 0,
          review: ''
        });
        
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast.error(
        language === 'en' 
          ? 'Failed to submit review. Please try again or contact us directly.' 
          : 'ریویو جمع کرنے میں ناکامی۔ دوبارہ کوشش کریں یا براہ راست رابطہ کریں۔',
        { duration: 6000 }
      );
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

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 animate-slide-up"
      onClick={onClose}
    >
      <div 
        className="relative -mt-11 w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-y-auto animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '95vh' }}
      >
        {/* Header - Compact */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 sm:p-5 text-white">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Star className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">
                {language === 'en' ? 'Write a Review' : 'ریویو لکھیں'}
              </h2>
              <p className="text-white/80 text-xs sm:text-sm">
                {language === 'en' 
                  ? 'Share your experience with FinCalc Pro' 
                  : 'FinCalc Pro کے ساتھ اپنا تجربہ شیئر کریں'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Form - Compact Spacing */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {/* Rating Selection - Compact */}
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              {language === 'en' ? 'Your Rating' : 'آپ کی ریٹنگ'} <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, rating: star })}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 sm:w-9 sm:h-9 ${
                      star <= (hoveredRating || formData.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </button>
              ))}
              {formData.rating > 0 && (
                <span className="ml-2 text-base font-bold text-slate-700 dark:text-slate-300">
                  {formData.rating}/5
                </span>
              )}
            </div>
          </div>

          {/* Name & Email Row - Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {language === 'en' ? 'Your Name' : 'آپ کا نام'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder={language === 'en' ? 'John Doe' : 'احمد علی'}
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {language === 'en' ? 'Email' : 'ای میل'} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder={language === 'en' ? 'john@example.com' : 'example@email.com'}
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
                  required
                />
              </div>
            </div>
          </div>

          {/* Role & Location Row - Compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {language === 'en' ? 'Role' : 'کردار'}
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder={language === 'en' ? 'Business Owner' : 'کاروباری'}
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {language === 'en' ? 'Location' : 'مقام'}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder={language === 'en' ? 'Karachi' : 'کراچی'}
                  className="w-full pl-10 pr-3 py-2.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Review Text - Compact */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {language === 'en' ? 'Your Review' : 'آپ کا ریویو'} <span className="text-red-500">*</span>
            </label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleChange}
              disabled={isSubmitting}
              rows="4"
              placeholder={language === 'en' 
                ? 'Tell us about your experience with FinCalc Pro...'
                : 'FinCalc Pro کے ساتھ اپنا تجربہ بتائیں...'
              }
              className="w-full px-3 py-2.5 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none disabled:opacity-50"
              required
            />
          </div>

          {/* Privacy Notice - Compact */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {language === 'en'
                  ? 'Your review will be submitted to our team for verification. We may feature it on our website.'
                  : 'آپ کا ریویو تصدیق کے لیے ہماری ٹیم کو بھیجا جائے گا۔ ہم اسے اپنی ویب سائٹ پر شامل کر سکتے ہیں۔'
                }
              </p>
            </div>
          </div>

          {/* Submit Button - Compact */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {language === 'en' ? 'Submitting...' : 'جمع کرایا جا رہا ہے...'}
              </>
            ) : (
              <>
                <Star className="w-5 h-5" />
                {language === 'en' ? 'Submit Review' : 'ریویو جمع کرائیں'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;