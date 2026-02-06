import { 
  Calculator, TrendingUp, Building2, Shield, Calendar, Ruler, 
  DollarSign, Users, FileText, Package, Home, Hammer, 
  GraduationCap, HeartPulse, ShoppingCart, Sprout, Zap, 
  Car, Scale, Megaphone, Factory, Sun, BarChart3, Clock,
  Beaker, Gamepad2, Wallet, Landmark, Gift, Globe
} from 'lucide-react';

export const modulesData = [
  {
    id: 'financial',
    name: 'Financial Calculators',
    nameUrdu: 'مالیاتی کیلکولیٹرز',
    icon: Calculator,
    color: '#FF6B6B',
    gradient: 'from-red-500 to-pink-500',
    description: 'Loans, investments, savings, and tax calculators',
    calculators: [
      { id: 'loan', name: 'Loan Calculator', nameUrdu: 'قرض کیلکولیٹر', icon: Calculator },
      { id: 'mortgage', name: 'Mortgage Calculator', nameUrdu: 'رہن کیلکولیٹر', icon: Home },
      { id: 'sip', name: 'SIP Calculator', nameUrdu: 'ایس آئی پی کیلکولیٹر', icon: TrendingUp },
      { id: 'savings', name: 'Savings Calculator', nameUrdu: 'بچت کیلکولیٹر', icon: DollarSign },
      { id: 'retirement', name: 'Retirement Planning', nameUrdu: 'ریٹائرمنٹ پلاننگ', icon: Calendar },
      { id: 'tax', name: 'Tax Calculator', nameUrdu: 'ٹیکس کیلکولیٹر', icon: FileText },
      { id: 'profitloss', name: 'Profit/Loss', nameUrdu: 'منافع/نقصان', icon: TrendingUp },
      { id: 'breakeven', name: 'Break-even Analysis', nameUrdu: 'بریک ایون تجزیہ', icon: BarChart3 }
    ]
  },
  {
    id: 'business',
    name: 'Business Calculators',
    nameUrdu: 'کاروباری کیلکولیٹرز',
    icon: Building2,
    color: '#4ECDC4',
    gradient: 'from-cyan-500 to-teal-500',
    description: 'ROI, revenue, margins, and business metrics',
    calculators: [
      { id: 'roi', name: 'ROI Calculator', nameUrdu: 'آر او آئی کیلکولیٹر', icon: TrendingUp },
      { id: 'revenue', name: 'Revenue Projections', nameUrdu: 'آمدنی کی پیشن گوئی', icon: BarChart3 },
      { id: 'margin', name: 'Margin Calculator', nameUrdu: 'مارجن کیلکولیٹر', icon: Calculator },
      { id: 'salary', name: 'Salary Calculator', nameUrdu: 'تنخواہ کیلکولیٹر', icon: DollarSign },
      { id: 'valuation', name: 'Business Valuation', nameUrdu: 'کاروبار کی قدر', icon: Building2 },
      { id: 'cashflow', name: 'Cash Flow', nameUrdu: 'کیش فلو', icon: TrendingUp },
      { id: 'discount', name: 'Discount & Markup', nameUrdu: 'ڈسکاؤنٹ اور مارک اپ', icon: Calculator },
      { id: 'currency', name: 'Currency Converter', nameUrdu: 'کرنسی تبدیل کار', icon: Globe }
    ]
  },
  {
    id: 'insurance',
    name: 'Insurance Calculators',
    nameUrdu: 'انشورنس کیلکولیٹرز',
    icon: Shield,
    color: '#95E1D3',
    gradient: 'from-emerald-400 to-cyan-400',
    description: 'Life, health, vehicle, and term insurance',
    calculators: [
      { id: 'life', name: 'Life Insurance', nameUrdu: 'لائف انشورنس', icon: Shield },
      { id: 'health', name: 'Health Insurance', nameUrdu: 'ہیلتھ انشورنس', icon: HeartPulse },
      { id: 'term', name: 'Term Insurance', nameUrdu: 'ٹرم انشورنس', icon: Shield },
      { id: 'vehicle', name: 'Vehicle Insurance', nameUrdu: 'گاڑی کی انشورنس', icon: Car },
      { id: 'claim', name: 'Insurance Claim', nameUrdu: 'انشورنس کلیم', icon: FileText }
    ]
  },
  {
    id: 'payment',
    name: 'Payment Plans',
    nameUrdu: 'ادائیگی کے منصوبے',
    icon: Calendar,
    color: '#F38181',
    gradient: 'from-rose-500 to-orange-500',
    description: 'EMI, installments, and payment schedules',
    calculators: [
      { id: 'emi', name: 'EMI Calculator', nameUrdu: 'ای ایم آئی کیلکولیٹر', icon: Calendar },
      { id: 'installment', name: 'Installment Planner', nameUrdu: 'قسط پلانر', icon: Calendar },
      { id: 'schedule', name: 'Payment Schedule', nameUrdu: 'ادائیگی کا شیڈول', icon: Clock },
      { id: 'latefee', name: 'Late Fee Calculator', nameUrdu: 'لیٹ فیس کیلکولیٹر', icon: Calculator },
      { id: 'amortization', name: 'Amortization Schedule', nameUrdu: 'ایمورٹائزیشن شیڈول', icon: FileText }
    ]
  },
  {
    id: 'measurement',
    name: 'Area & Measurement',
    nameUrdu: 'رقبہ اور پیمائش',
    icon: Ruler,
    color: '#FFD93D',
    gradient: 'from-yellow-400 to-amber-500',
    description: 'Area conversion, construction, and measurements',
    calculators: [
      { id: 'area', name: 'Area Converter', nameUrdu: 'رقبہ تبدیل کار', icon: Ruler },
      { id: 'construction', name: 'Construction Cost', nameUrdu: 'تعمیراتی لاگت', icon: Hammer },
      { id: 'paint', name: 'Paint Calculator', nameUrdu: 'پینٹ کیلکولیٹر', icon: Ruler },
      { id: 'tile', name: 'Tile Calculator', nameUrdu: 'ٹائل کیلکولیٹر', icon: Ruler },
      { id: 'landconvert', name: 'Land Converter', nameUrdu: 'زمین تبدیل کار', icon: Ruler },
      { id: 'roomsize', name: 'Room Size', nameUrdu: 'کمرے کا سائز', icon: Home }
    ]
  },
  {
    id: 'growth',
    name: 'Growth & Projections',
    nameUrdu: 'ترقی اور پیشن گوئیاں',
    icon: TrendingUp,
    color: '#6BCF7F',
    gradient: 'from-green-500 to-emerald-500',
    description: 'Business growth, sales forecast, and trends',
    calculators: [
      { id: 'business-growth', name: 'Business Growth', nameUrdu: 'کاروباری ترقی', icon: TrendingUp },
      { id: 'population', name: 'Population Growth', nameUrdu: 'آبادی میں اضافہ', icon: Users },
      { id: 'sales', name: 'Sales Forecast', nameUrdu: 'فروخت کی پیشن گوئی', icon: BarChart3 },
      { id: 'trend', name: 'Trend Analysis', nameUrdu: 'رجحان کا تجزیہ', icon: TrendingUp },
      { id: 'yoy', name: 'Year-over-Year', nameUrdu: 'سال بہ سال', icon: Calendar }
    ]
  },
  {
    id: 'hr-payroll',
    name: 'HR & Payroll',
    nameUrdu: 'ایچ آر اور پے رول',
    icon: Users,
    color: '#A8E6CF',
    gradient: 'from-green-400 to-teal-400',
    description: 'Salary, overtime, PF, and employee benefits',
    calculators: [
      { id: 'salary-breakdown', name: 'Salary Breakdown', nameUrdu: 'تنخواہ کی تفصیل', icon: DollarSign },
      { id: 'overtime', name: 'Overtime Calculator', nameUrdu: 'اوور ٹائم کیلکولیٹر', icon: Clock },
      { id: 'pf', name: 'Provident Fund', nameUrdu: 'پراویڈنٹ فنڈ', icon: DollarSign },
      { id: 'gratuity', name: 'Gratuity Calculator', nameUrdu: 'گریچویٹی کیلکولیٹر', icon: Gift },
      { id: 'leave', name: 'Leave Encashment', nameUrdu: 'چھٹیوں کی رقم', icon: Calendar },
      { id: 'bonus', name: 'Bonus Calculator', nameUrdu: 'بونس کیلکولیٹر', icon: DollarSign },
      { id: 'tax-deduction', name: 'Tax Deduction', nameUrdu: 'ٹیکس کٹوتی', icon: FileText },
      { id: 'working-hours', name: 'Working Hours', nameUrdu: 'کام کے گھنٹے', icon: Clock },
      { id: 'attendance', name: 'Attendance', nameUrdu: 'حاضری', icon: Users },
      { id: 'performance-bonus', name: 'Performance Bonus', nameUrdu: 'کارکردگی بونس', icon: TrendingUp }
    ]
  },
  {
    id: 'accounting',
    name: 'Accounting & Bookkeeping',
    nameUrdu: 'اکاؤنٹنگ اور بک کیپنگ',
    icon: FileText,
    color: '#FFB6B9',
    gradient: 'from-pink-400 to-rose-400',
    description: 'Balance sheet, P&L, depreciation, and ratios',
    calculators: [
      { id: 'balance-sheet', name: 'Balance Sheet', nameUrdu: 'بیلنس شیٹ', icon: FileText },
      { id: 'profit-loss', name: 'Profit & Loss', nameUrdu: 'منافع اور نقصان', icon: TrendingUp },
      { id: 'depreciation', name: 'Depreciation', nameUrdu: 'قدر میں کمی', icon: TrendingUp },
      { id: 'asset-valuation', name: 'Asset Valuation', nameUrdu: 'اثاثوں کی قدر', icon: Building2 },
      { id: 'receivable', name: 'Accounts Receivable', nameUrdu: 'وصولی کے اکاؤنٹس', icon: DollarSign },
      { id: 'petty-cash', name: 'Petty Cash', nameUrdu: 'چھوٹی رقم', icon: DollarSign },
      { id: 'journal', name: 'Journal Entry', nameUrdu: 'جرنل انٹری', icon: FileText },
      { id: 'trial-balance', name: 'Trial Balance', nameUrdu: 'ٹرائل بیلنس', icon: FileText },
      { id: 'working-capital', name: 'Working Capital', nameUrdu: 'ورکنگ کیپیٹل', icon: DollarSign },
      { id: 'quick-ratio', name: 'Quick Ratio', nameUrdu: 'کوئیک ریشیو', icon: BarChart3 }
    ]
  },
  {
    id: 'inventory',
    name: 'Inventory & Supply Chain',
    nameUrdu: 'انوینٹری اور سپلائی چین',
    icon: Package,
    color: '#C7CEEA',
    gradient: 'from-indigo-400 to-purple-400',
    description: 'Stock valuation, EOQ, reorder points',
    calculators: [
      { id: 'stock-valuation', name: 'Stock Valuation', nameUrdu: 'اسٹاک ویلیویشن', icon: Package },
      { id: 'reorder', name: 'Reorder Point', nameUrdu: 'دوبارہ آرڈر پوائنٹ', icon: Package },
      { id: 'eoq', name: 'Economic Order Quantity', nameUrdu: 'اقتصادی آرڈر مقدار', icon: Calculator },
      { id: 'safety-stock', name: 'Safety Stock', nameUrdu: 'حفاظتی اسٹاک', icon: Package },
      { id: 'inventory-turnover', name: 'Inventory Turnover', nameUrdu: 'انوینٹری ٹرن اوور', icon: TrendingUp },
      { id: 'dead-stock', name: 'Dead Stock', nameUrdu: 'ڈیڈ اسٹاک', icon: Package },
      { id: 'warehouse-space', name: 'Warehouse Space', nameUrdu: 'گودام کی جگہ', icon: Building2 },
      { id: 'shipping-cost', name: 'Shipping Cost', nameUrdu: 'شپنگ لاگت', icon: Car },
      { id: 'bulk-discount', name: 'Bulk Discount', nameUrdu: 'بلک ڈسکاؤنٹ', icon: Calculator }
    ]
  },
  {
    id: 'real-estate',
    name: 'Real Estate & Property',
    nameUrdu: 'رئیل اسٹیٹ اور پراپرٹی',
    icon: Home,
    color: '#B4869F',
    gradient: 'from-purple-400 to-pink-400',
    description: 'Property valuation, rental yield, taxes',
    calculators: [
      { id: 'property-valuation', name: 'Property Valuation', nameUrdu: 'پراپرٹی ویلیویشن', icon: Home },
      { id: 'rental-yield', name: 'Rental Yield', nameUrdu: 'کرایہ کی آمدنی', icon: DollarSign },
      { id: 'capital-gains', name: 'Capital Gains Tax', nameUrdu: 'کیپیٹل گینز ٹیکس', icon: FileText },
      { id: 'transfer-cost', name: 'Transfer Costs', nameUrdu: 'منتقلی کی لاگت', icon: DollarSign },
      { id: 'renovation', name: 'Renovation Cost', nameUrdu: 'مرمت کی لاگت', icon: Hammer },
      { id: 'affordability', name: 'Home Affordability', nameUrdu: 'گھر کی استطاعت', icon: Home },
      { id: 'rent-vs-buy', name: 'Rent vs Buy', nameUrdu: 'کرایہ بمقابلہ خریداری', icon: Home },
      { id: 'property-tax', name: 'Property Tax', nameUrdu: 'پراپرٹی ٹیکس', icon: FileText },
      { id: 'down-payment', name: 'Down Payment', nameUrdu: 'ڈاؤن پیمنٹ', icon: DollarSign },
      { id: 'closing-costs', name: 'Closing Costs', nameUrdu: 'اختتامی اخراجات', icon: DollarSign }
    ]
  },
  {
    id: 'construction',
    name: 'Construction & Engineering',
    nameUrdu: 'تعمیرات اور انجینئرنگ',
    icon: Hammer,
    color: '#E85D75',
    gradient: 'from-red-400 to-pink-500',
    description: 'Material estimation, labor, project costs',
    calculators: [
      { id: 'material-quantity', name: 'Material Quantity', nameUrdu: 'مواد کی مقدار', icon: Package },
      { id: 'labor-cost', name: 'Labor Cost', nameUrdu: 'مزدوری کی لاگت', icon: Users },
      { id: 'project-timeline', name: 'Project Timeline', nameUrdu: 'منصوبے کا وقت', icon: Calendar },
      { id: 'steel-reinforcement', name: 'Steel Reinforcement', nameUrdu: 'اسٹیل کی تقویت', icon: Hammer },
      { id: 'concrete-mix', name: 'Concrete Mix', nameUrdu: 'کنکریٹ مکس', icon: Package },
      { id: 'plumbing', name: 'Plumbing Calculator', nameUrdu: 'پلمبنگ کیلکولیٹر', icon: Ruler },
      { id: 'electrical-load', name: 'Electrical Load', nameUrdu: 'برقی بوجھ', icon: Zap },
      { id: 'hvac', name: 'HVAC Size', nameUrdu: 'ایچ وی اے سی سائز', icon: Ruler },
      { id: 'roofing', name: 'Roofing Material', nameUrdu: 'چھت کا مواد', icon: Home },
      { id: 'foundation', name: 'Foundation', nameUrdu: 'بنیاد', icon: Hammer }
    ]
  },
  {
    id: 'education',
    name: 'Education & Academic',
    nameUrdu: 'تعلیم اور تعلیمی',
    icon: GraduationCap,
    color: '#8B5FBF',
    gradient: 'from-purple-500 to-indigo-500',
    description: 'GPA, CGPA, grades, and student loans',
    calculators: [
      { id: 'gpa', name: 'GPA Calculator', nameUrdu: 'جی پی اے کیلکولیٹر', icon: GraduationCap },
      { id: 'cgpa', name: 'CGPA to Percentage', nameUrdu: 'سی جی پی اے سے فیصد', icon: Calculator },
      { id: 'grade', name: 'Grade Calculator', nameUrdu: 'گریڈ کیلکولیٹر', icon: FileText },
      { id: 'attendance-percent', name: 'Attendance %', nameUrdu: 'حاضری فیصد', icon: Calendar },
      { id: 'study-time', name: 'Study Time Planner', nameUrdu: 'مطالعہ کا وقت', icon: Clock },
      { id: 'exam-predictor', name: 'Exam Marks Predictor', nameUrdu: 'امتحان کے نمبر', icon: TrendingUp },
      { id: 'scholarship', name: 'Scholarship Eligibility', nameUrdu: 'اسکالرشپ کی اہلیت', icon: GraduationCap },
      { id: 'fee-calculator', name: 'Fee Calculator', nameUrdu: 'فیس کیلکولیٹر', icon: DollarSign },
      { id: 'student-loan', name: 'Student Loan', nameUrdu: 'طالب علم قرض', icon: Calculator }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Medical',
    nameUrdu: 'صحت اور طبی',
    icon: HeartPulse,
    color: '#FF6F91',
    gradient: 'from-pink-500 to-rose-500',
    description: 'BMI, calories, medicine dosage, pregnancy',
    calculators: [
      { id: 'bmi', name: 'BMI Calculator', nameUrdu: 'بی ایم آئی کیلکولیٹر', icon: HeartPulse },
      { id: 'calorie', name: 'Calorie Calculator', nameUrdu: 'کیلوری کیلکولیٹر', icon: Calculator },
      { id: 'protein', name: 'Protein/Nutrition', nameUrdu: 'پروٹین/غذائیت', icon: HeartPulse },
      { id: 'medicine-dosage', name: 'Medicine Dosage', nameUrdu: 'دوا کی خوراک', icon: Calculator },
      { id: 'pregnancy', name: 'Pregnancy Due Date', nameUrdu: 'حمل کی تاریخ', icon: Calendar },
      { id: 'ovulation', name: 'Ovulation Calculator', nameUrdu: 'بیضہ دانی کیلکولیٹر', icon: Calendar },
      { id: 'blood-pressure', name: 'Blood Pressure', nameUrdu: 'بلڈ پریشر', icon: HeartPulse },
      { id: 'diabetes', name: 'Diabetes Risk', nameUrdu: 'ذیابیطس کا خطرہ', icon: HeartPulse },
      { id: 'water-intake', name: 'Water Intake', nameUrdu: 'پانی کی مقدار', icon: Calculator },
      { id: 'sleep', name: 'Sleep Calculator', nameUrdu: 'نیند کیلکولیٹر', icon: Clock }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce & Retail',
    nameUrdu: 'ای کامرس اور ریٹیل',
    icon: ShoppingCart,
    color: '#FFA07A',
    gradient: 'from-orange-400 to-red-400',
    description: 'Pricing, shipping, conversion, and ROI',
    calculators: [
      { id: 'product-pricing', name: 'Product Pricing', nameUrdu: 'پروڈکٹ کی قیمت', icon: DollarSign },
      { id: 'shipping', name: 'Shipping Cost', nameUrdu: 'شپنگ لاگت', icon: Car },
      { id: 'cart-value', name: 'Cart Value', nameUrdu: 'کارٹ کی قیمت', icon: ShoppingCart },
      { id: 'discount-calc', name: 'Discount Calculator', nameUrdu: 'ڈسکاؤنٹ کیلکولیٹر', icon: Calculator },
      { id: 'sales-commission', name: 'Sales Commission', nameUrdu: 'فروخت کمیشن', icon: DollarSign },
      { id: 'customer-ltv', name: 'Customer Lifetime Value', nameUrdu: 'کسٹمر لائف ٹائم ویلیو', icon: TrendingUp },
      { id: 'conversion-rate', name: 'Conversion Rate', nameUrdu: 'کنورژن ریٹ', icon: BarChart3 },
      { id: 'average-order', name: 'Average Order Value', nameUrdu: 'اوسط آرڈر ویلیو', icon: ShoppingCart },
      { id: 'roas', name: 'Return on Ad Spend', nameUrdu: 'اشتہار پر واپسی', icon: TrendingUp },
      { id: 'markup-margin', name: 'Markup vs Margin', nameUrdu: 'مارک اپ بمقابلہ مارجن', icon: Calculator }
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Farming',
    nameUrdu: 'زراعت اور کاشتکاری',
    icon: Sprout,
    color: '#90EE90',
    gradient: 'from-green-400 to-lime-500',
    description: 'Fertilizer, crop yield, irrigation',
    calculators: [
      { id: 'fertilizer', name: 'Fertilizer Calculator', nameUrdu: 'کھاد کیلکولیٹر', icon: Sprout },
      { id: 'crop-yield', name: 'Crop Yield Estimator', nameUrdu: 'فصل کی پیداوار', icon: TrendingUp },
      { id: 'irrigation', name: 'Irrigation Water', nameUrdu: 'آبپاشی کا پانی', icon: Calculator },
      { id: 'seed-rate', name: 'Seed Rate', nameUrdu: 'بیج کی شرح', icon: Sprout },
      { id: 'pesticide', name: 'Pesticide Dosage', nameUrdu: 'کیڑے مار دوا', icon: Calculator },
      { id: 'land-productivity', name: 'Land Productivity', nameUrdu: 'زمین کی پیداواری صلاحیت', icon: TrendingUp },
      { id: 'farm-profit', name: 'Farm Profit', nameUrdu: 'کھیت کا منافع', icon: DollarSign },
      { id: 'livestock-feed', name: 'Livestock Feed', nameUrdu: 'مویشیوں کی خوراک', icon: Sprout },
      { id: 'harvest-time', name: 'Harvest Time Estimator', nameUrdu: 'فصل کاٹنے کا وقت', icon: Calendar }
    ]
  },
  {
    id: 'utilities',
    name: 'Utilities & Bills',
    nameUrdu: 'یوٹیلیٹیز اور بل',
    icon: Zap,
    color: '#FFD700',
    gradient: 'from-yellow-400 to-orange-400',
    description: 'Electricity, gas, water, internet bills',
    calculators: [
      { id: 'electricity', name: 'Electricity Bill', nameUrdu: 'بجلی کا بل', icon: Zap },
      { id: 'gas', name: 'Gas Bill Estimator', nameUrdu: 'گیس بل تخمینہ', icon: Zap },
      { id: 'water-bill', name: 'Water Bill', nameUrdu: 'پانی کا بل', icon: Calculator },
      { id: 'internet-data', name: 'Internet Data Usage', nameUrdu: 'انٹرنیٹ ڈیٹا استعمال', icon: Globe },
      { id: 'phone-splitter', name: 'Phone Bill Splitter', nameUrdu: 'فون بل تقسیم', icon: Calculator },
      { id: 'unit-converter', name: 'Unit Converter', nameUrdu: 'یونٹ تبدیل کار', icon: Calculator }
    ]
  },
  {
    id: 'travel',
    name: 'Travel & Transportation',
    nameUrdu: 'سفر اور نقل و حمل',
    icon: Car,
    color: '#87CEEB',
    gradient: 'from-blue-400 to-cyan-400',
    description: 'Fuel cost, mileage, trip expenses',
    calculators: [
      { id: 'fuel-cost', name: 'Fuel Cost', nameUrdu: 'ایندھن کی لاگت', icon: Car },
      { id: 'trip-expense', name: 'Trip Expense', nameUrdu: 'سفر کے اخراجات', icon: DollarSign },
      { id: 'mileage', name: 'Mileage Calculator', nameUrdu: 'مائلیج کیلکولیٹر', icon: Calculator },
      { id: 'car-depreciation', name: 'Car Depreciation', nameUrdu: 'کار کی قدر میں کمی', icon: Car },
      { id: 'vehicle-maintenance', name: 'Vehicle Maintenance', nameUrdu: 'گاڑی کی دیکھ بھال', icon: Car },
      { id: 'toll-tax', name: 'Toll Tax', nameUrdu: 'ٹول ٹیکس', icon: DollarSign },
      { id: 'flight-cost', name: 'Flight Cost Comparison', nameUrdu: 'فلائٹ لاگت موازنہ', icon: Calculator },
      { id: 'hotel-cost', name: 'Hotel Cost Per Night', nameUrdu: 'ہوٹل کی رات کی لاگت', icon: Home },
      { id: 'travel-budget', name: 'Travel Budget Planner', nameUrdu: 'سفر کا بجٹ', icon: DollarSign }
    ]
  },
  {
    id: 'legal',
    name: 'Legal & Compliance',
    nameUrdu: 'قانونی اور تعمیل',
    icon: Scale,
    color: '#8B4513',
    gradient: 'from-amber-600 to-orange-600',
    description: 'Court fees, stamp duty, legal costs',
    calculators: [
      { id: 'court-fee', name: 'Court Fee', nameUrdu: 'عدالت کی فیس', icon: Scale },
      { id: 'legal-notice', name: 'Legal Notice Cost', nameUrdu: 'قانونی نوٹس کی لاگت', icon: FileText },
      { id: 'stamp-duty', name: 'Stamp Duty', nameUrdu: 'اسٹیمپ ڈیوٹی', icon: FileText },
      { id: 'registration', name: 'Registration Charges', nameUrdu: 'رجسٹریشن چارجز', icon: FileText },
      { id: 'notary', name: 'Notary Fee', nameUrdu: 'نوٹری فیس', icon: DollarSign },
      { id: 'fine-penalty', name: 'Fine & Penalty', nameUrdu: 'جرمانہ اور سزا', icon: Calculator }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing & Advertising',
    nameUrdu: 'مارکیٹنگ اور اشتہارات',
    icon: Megaphone,
    color: '#FF1493',
    gradient: 'from-pink-600 to-purple-600',
    description: 'CPC, CPA, ROI, engagement metrics',
    calculators: [
      { id: 'cpc', name: 'Cost Per Click', nameUrdu: 'کلک کی لاگت', icon: Calculator },
      { id: 'cpa', name: 'Cost Per Acquisition', nameUrdu: 'حصول کی لاگت', icon: DollarSign },
      { id: 'email-roi', name: 'Email Campaign ROI', nameUrdu: 'ای میل مہم آر او آئی', icon: TrendingUp },
      { id: 'engagement', name: 'Social Media Engagement', nameUrdu: 'سوشل میڈیا مشغولیت', icon: BarChart3 },
      { id: 'influencer-rate', name: 'Influencer Rate', nameUrdu: 'انفلوئنسر ریٹ', icon: DollarSign },
      { id: 'ad-budget', name: 'Ad Budget Allocator', nameUrdu: 'اشتہار بجٹ', icon: Calculator },
      { id: 'landing-conversion', name: 'Landing Page Conversion', nameUrdu: 'لینڈنگ پیج کنورژن', icon: BarChart3 },
      { id: 'marketing-roi', name: 'Marketing ROI', nameUrdu: 'مارکیٹنگ آر او آئی', icon: TrendingUp }
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Production',
    nameUrdu: 'مینوفیکچرنگ اور پیداوار',
    icon: Factory,
    color: '#708090',
    gradient: 'from-slate-500 to-gray-600',
    description: 'Production costs, quality control, capacity',
    calculators: [
      { id: 'production-cost', name: 'Production Cost Per Unit', nameUrdu: 'یونٹ کی پیداواری لاگت', icon: Calculator },
      { id: 'batch-size', name: 'Batch Size', nameUrdu: 'بیچ سائز', icon: Package },
      { id: 'downtime-cost', name: 'Machine Downtime Cost', nameUrdu: 'مشین بند ہونے کی لاگت', icon: Factory },
      { id: 'quality-control', name: 'Quality Control', nameUrdu: 'معیار کنٹرول', icon: BarChart3 },
      { id: 'production-capacity', name: 'Production Capacity', nameUrdu: 'پیداواری صلاحیت', icon: TrendingUp },
      { id: 'lead-time', name: 'Lead Time', nameUrdu: 'لیڈ ٹائم', icon: Clock },
      { id: 'bom-cost', name: 'Bill of Materials Cost', nameUrdu: 'مواد کی فہرست لاگت', icon: FileText },
      { id: 'scrap-waste', name: 'Scrap & Waste', nameUrdu: 'کباڑ اور فضلہ', icon: Package }
    ]
  },
  {
    id: 'energy',
    name: 'Energy & Power',
    nameUrdu: 'توانائی اور بجلی',
    icon: Sun,
    color: '#FFA500',
    gradient: 'from-orange-500 to-yellow-500',
    description: 'Solar, battery, generator, consumption',
    calculators: [
      { id: 'solar-panel', name: 'Solar Panel', nameUrdu: 'سولر پینل', icon: Sun },
      { id: 'battery-backup', name: 'Battery Backup Time', nameUrdu: 'بیٹری بیک اپ', icon: Zap },
      { id: 'generator-fuel', name: 'Generator Fuel Consumption', nameUrdu: 'جنریٹر ایندھن', icon: Zap },
      { id: 'ups-runtime', name: 'UPS Runtime', nameUrdu: 'یو پی ایس رن ٹائم', icon: Zap },
      { id: 'power-consumption', name: 'Power Consumption', nameUrdu: 'بجلی کی کھپت', icon: Zap },
      { id: 'energy-savings', name: 'Energy Savings', nameUrdu: 'توانائی کی بچت', icon: DollarSign },
      { id: 'carbon-footprint', name: 'Carbon Footprint', nameUrdu: 'کاربن فٹ پرنٹ', icon: Sun }
    ]
  },
  {
    id: 'statistics',
    name: 'Statistics & Data Analysis',
    nameUrdu: 'شماریات اور ڈیٹا تجزیہ',
    icon: BarChart3,
    color: '#4169E1',
    gradient: 'from-blue-600 to-indigo-600',
    description: 'Mean, median, standard deviation, probability',
    calculators: [
      { id: 'mean-median', name: 'Mean, Median, Mode', nameUrdu: 'اوسط، میڈین، موڈ', icon: BarChart3 },
      { id: 'std-deviation', name: 'Standard Deviation', nameUrdu: 'معیاری انحراف', icon: Calculator },
      { id: 'variance', name: 'Variance Calculator', nameUrdu: 'ویرینس کیلکولیٹر', icon: BarChart3 },
      { id: 'percentage-calc', name: 'Percentage Calculator', nameUrdu: 'فیصد کیلکولیٹر', icon: Calculator },
      { id: 'ratio', name: 'Ratio & Proportion', nameUrdu: 'تناسب اور نسبت', icon: Calculator },
      { id: 'probability', name: 'Probability', nameUrdu: 'امکان', icon: BarChart3 },
      { id: 'sample-size', name: 'Sample Size', nameUrdu: 'نمونہ سائز', icon: Calculator },
      { id: 'correlation', name: 'Correlation', nameUrdu: 'باہمی تعلق', icon: TrendingUp },
      { id: 'regression', name: 'Regression Analysis', nameUrdu: 'ریگریشن تجزیہ', icon: BarChart3 },
      { id: 'z-score', name: 'Z-Score', nameUrdu: 'زیڈ سکور', icon: Calculator }
    ]
  },
  {
    id: 'time-date',
    name: 'Time & Date',
    nameUrdu: 'وقت اور تاریخ',
    icon: Clock,
    color: '#20B2AA',
    gradient: 'from-teal-500 to-cyan-500',
    description: 'Age, date difference, working days',
    calculators: [
      { id: 'age', name: 'Age Calculator', nameUrdu: 'عمر کیلکولیٹر', icon: Calendar },
      { id: 'date-difference', name: 'Date Difference', nameUrdu: 'تاریخ کا فرق', icon: Calendar },
      { id: 'working-days', name: 'Working Days', nameUrdu: 'کام کے دن', icon: Calendar },
      { id: 'timezone', name: 'Time Zone Converter', nameUrdu: 'ٹائم زون تبدیل کار', icon: Clock },
      { id: 'project-deadline', name: 'Project Deadline', nameUrdu: 'منصوبے کی آخری تاریخ', icon: Calendar },
      { id: 'countdown', name: 'Countdown Timer', nameUrdu: 'الٹی گنتی', icon: Clock },
      { id: 'business-hours', name: 'Business Hours', nameUrdu: 'کاروباری اوقات', icon: Clock },
      { id: 'shift-schedule', name: 'Shift Schedule', nameUrdu: 'شفٹ شیڈول', icon: Calendar }
    ]
  },
  {
    id: 'scientific',
    name: 'Scientific & Research',
    nameUrdu: 'سائنسی اور تحقیق',
    icon: Beaker,
    color: '#9370DB',
    gradient: 'from-purple-600 to-violet-600',
    description: 'Unit conversion, chemistry, physics formulas',
    calculators: [
      { id: 'unit-converter-sci', name: 'Unit Converter', nameUrdu: 'یونٹ تبدیل کار', icon: Calculator },
      { id: 'chemical-equation', name: 'Chemical Equation Balancer', nameUrdu: 'کیمیائی مساوات', icon: Beaker },
      { id: 'ph', name: 'pH Calculator', nameUrdu: 'پی ایچ کیلکولیٹر', icon: Beaker },
      { id: 'molarity', name: 'Molarity Calculator', nameUrdu: 'مولریٹی کیلکولیٹر', icon: Calculator },
      { id: 'dilution', name: 'Dilution Calculator', nameUrdu: 'تخفیف کیلکولیٹر', icon: Beaker },
      { id: 'ideal-gas', name: 'Ideal Gas Law', nameUrdu: 'مثالی گیس قانون', icon: Calculator },
      { id: 'speed-distance', name: 'Speed/Distance/Time', nameUrdu: 'رفتار/فاصلہ/وقت', icon: Calculator },
      { id: 'force-pressure', name: 'Force & Pressure', nameUrdu: 'قوت اور دباؤ', icon: Calculator }
    ]
  },
  {
    id: 'gaming',
    name: 'Gaming & Entertainment',
    nameUrdu: 'گیمنگ اور تفریح',
    icon: Gamepad2,
    color: '#FF4500',
    gradient: 'from-red-600 to-orange-600',
    description: 'Tournament brackets, prize pool, odds',
    calculators: [
      { id: 'tournament', name: 'Tournament Bracket Generator', nameUrdu: 'ٹورنامنٹ بریکٹ', icon: Gamepad2 },
      { id: 'prize-pool', name: 'Prize Pool Distributor', nameUrdu: 'انعامی پول تقسیم', icon: DollarSign },
      { id: 'game-score', name: 'Game Score Calculator', nameUrdu: 'گیم سکور کیلکولیٹر', icon: Calculator },
      { id: 'odds', name: 'Odds Calculator', nameUrdu: 'مشکلات کیلکولیٹر', icon: BarChart3 },
      { id: 'betting', name: 'Betting Calculator', nameUrdu: 'بیٹنگ کیلکولیٹر', icon: Calculator }
    ]
  },
  {
    id: 'personal-finance',
    name: 'Personal Finance',
    nameUrdu: 'ذاتی مالیات',
    icon: Wallet,
    color: '#32CD32',
    gradient: 'from-green-600 to-lime-600',
    description: 'Budget, expense tracker, net worth',
    calculators: [
      { id: 'budget-planner', name: 'Budget Planner', nameUrdu: 'بجٹ پلانر', icon: Wallet },
      { id: 'expense-tracker', name: 'Expense Tracker', nameUrdu: 'اخراجات ٹریکر', icon: DollarSign },
      { id: 'split-bill', name: 'Split Bill', nameUrdu: 'بل تقسیم', icon: Calculator },
      { id: 'tip', name: 'Tip Calculator', nameUrdu: 'ٹپ کیلکولیٹر', icon: DollarSign },
      { id: 'debt-payoff', name: 'Debt Payoff', nameUrdu: 'قرض کی ادائیگی', icon: Calculator },
      { id: 'emergency-fund', name: 'Emergency Fund', nameUrdu: 'ایمرجنسی فنڈ', icon: DollarSign },
      { id: 'net-worth', name: 'Net Worth', nameUrdu: 'خالص مالیت', icon: TrendingUp },
      { id: 'budget-rule', name: '50-30-20 Budget Rule', nameUrdu: '50-30-20 بجٹ قاعدہ', icon: Calculator }
    ]
  },
  {
    id: 'government',
    name: 'Government & Public Services',
    nameUrdu: 'حکومت اور عوامی خدمات',
    icon: Landmark,
    color: '#4682B4',
    gradient: 'from-blue-700 to-indigo-700',
    description: 'Pension, passport, vehicle registration',
    calculators: [
      { id: 'pension', name: 'Pension Calculator', nameUrdu: 'پنشن کیلکولیٹر', icon: DollarSign },
      { id: 'social-security', name: 'Social Security Benefits', nameUrdu: 'سماجی تحفظ', icon: Shield },
      { id: 'vehicle-reg', name: 'Vehicle Registration Fee', nameUrdu: 'گاڑی رجسٹریشن فیس', icon: Car },
      { id: 'passport-fee', name: 'Passport Fee', nameUrdu: 'پاسپورٹ فیس', icon: FileText },
      { id: 'cnic-renewal', name: 'CNIC Renewal Cost', nameUrdu: 'شناختی کارڈ تجدید', icon: FileText },
      { id: 'utility-connection', name: 'Utility Connection Charges', nameUrdu: 'یوٹیلیٹی کنکشن چارجز', icon: Zap }
    ]
  },
  {
    id: 'freelancing',
    name: 'Freelancing & Gig Economy',
    nameUrdu: 'فری لانسنگ اور گِگ اکانومی',
    icon: Users,
    color: '#FF6347',
    gradient: 'from-red-500 to-pink-500',
    description: 'Hourly rate, quotes, invoices, tax',
    calculators: [
      { id: 'hourly-rate', name: 'Hourly Rate', nameUrdu: 'گھنٹے کی شرح', icon: Clock },
      { id: 'project-quote', name: 'Project Quote Generator', nameUrdu: 'پروجیکٹ کوٹ', icon: FileText },
      { id: 'freelance-tax', name: 'Freelance Tax', nameUrdu: 'فری لانس ٹیکس', icon: Calculator },
      { id: 'invoice', name: 'Invoice Generator', nameUrdu: 'انوائس جنریٹر', icon: FileText },
      { id: 'time-tracking', name: 'Time Tracking', nameUrdu: 'وقت ٹریکنگ', icon: Clock },
      { id: 'client-profitability', name: 'Client Profitability', nameUrdu: 'کلائنٹ منافع', icon: TrendingUp }
    ]
  },
  {
    id: 'charity',
    name: 'Charity & Zakat',
    nameUrdu: 'خیرات اور زکوٰۃ',
    icon: Gift,
    color: '#00CED1',
    gradient: 'from-cyan-600 to-blue-600',
    description: 'Zakat, Nisab, Sadaqah, Fitrana',
    calculators: [
      { id: 'zakat', name: 'Zakat Calculator', nameUrdu: 'زکوٰۃ کیلکولیٹر', icon: Gift },
      { id: 'nisab', name: 'Nisab Calculator', nameUrdu: 'نصاب کیلکولیٹر', icon: DollarSign },
      { id: 'sadaqah', name: 'Sadaqah Calculator', nameUrdu: 'صدقہ کیلکولیٹر', icon: Gift },
      { id: 'donation-planner', name: 'Charity Donation Planner', nameUrdu: 'عطیات کا منصوبہ', icon: Calendar },
      { id: 'fitrana', name: 'Fitrana Calculator', nameUrdu: 'فطرانہ کیلکولیٹر', icon: Gift }
    ]
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    nameUrdu: 'متفرق',
    icon: Globe,
    color: '#DA70D6',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Daily life calculators and converters',
    calculators: [
      { id: 'age-detailed', name: 'Age in Days/Hours/Minutes', nameUrdu: 'عمر تفصیل سے', icon: Clock },
      { id: 'cooking-converter', name: 'Cooking Measurement Converter', nameUrdu: 'کھانا پکانے کی پیمائش', icon: Calculator },
      { id: 'recipe-scaler', name: 'Recipe Scaler', nameUrdu: 'ریسیپی سکیلر', icon: Calculator },
      { id: 'clothing-size', name: 'Clothing Size Converter', nameUrdu: 'کپڑوں کا سائز', icon: Ruler },
      { id: 'shoe-size', name: 'Shoe Size Converter', nameUrdu: 'جوتے کا سائز', icon: Ruler },
      { id: 'random-number', name: 'Random Number Generator', nameUrdu: 'بے ترتیب نمبر', icon: Calculator },
      { id: 'percentage-change', name: 'Percentage Increase/Decrease', nameUrdu: 'فیصد میں اضافہ/کمی', icon: Calculator },
      { id: 'ratio-calc', name: 'Ratio Calculator', nameUrdu: 'تناسب کیلکولیٹر', icon: Calculator },
      { id: 'fraction', name: 'Fraction Calculator', nameUrdu: 'کسر کیلکولیٹر', icon: Calculator },
      { id: 'roman-numeral', name: 'Roman Numeral Converter', nameUrdu: 'رومن ہندسے', icon: Calculator }
    ]
  }
];

export default modulesData;
