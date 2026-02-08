import { 
  Calculator, TrendingUp, Building2, Shield, Calendar, Ruler, 
  DollarSign, Users, FileText, Package, Home, Hammer, 
  GraduationCap, HeartPulse, ShoppingCart, Sprout, Zap, 
  Car, Scale, Megaphone, Factory, Sun, BarChart3, Clock,
  Beaker, Gamepad2, Wallet, Landmark, Gift, Globe, TrendingDown
} from 'lucide-react';

export const modulesData = [
  {
    id: 'financial',
    name: 'Financial Calculators',
    nameUrdu: 'مالیاتی کیلکولیٹرز',
    icon: Calculator,
    color: '#FF6B6B',
    gradient: 'from-red-500 to-pink-500',
    description: 'Complete financial planning tools including loan EMI, mortgage, investment SIP, retirement savings, tax planning, and profit/loss analysis for smart money management',
    descriptionUrdu: 'مکمل مالیاتی منصوبہ بندی کے ٹولز بشمول قرض کی قسطیں، رہن، سرمایہ کاری SIP، ریٹائرمنٹ بچت، ٹیکس پلاننگ، اور منافع/نقصان کا تجزیہ سمارٹ پیسے کے انتظام کے لیے',
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
    description: 'Essential business tools for ROI analysis, revenue forecasting, profit margins, salary calculations, business valuation, cash flow management, and pricing strategies',
    descriptionUrdu: 'ضروری کاروباری ٹولز برائے ROI تجزیہ، آمدنی کی پیشن گوئی، منافع کے مارجن، تنخواہ کے حساب، کاروبار کی قدر، کیش فلو انتظام، اور قیمتوں کی حکمت عملی',
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
    description: 'Comprehensive insurance planning for life, health, term, vehicle coverage, and claim calculations to protect you and your family financially',
    descriptionUrdu: 'جامع انشورنس پلاننگ برائے زندگی، صحت، مدتی، گاڑی کی کوریج، اور دعوے کے حساب کتاب آپ اور آپ کے خاندان کو مالی طور پر محفوظ رکھنے کے لیے',
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
    description: 'Smart payment planning with EMI calculators, installment schedules, amortization tables, late fee calculations for better debt management',
    descriptionUrdu: 'سمارٹ ادائیگی کی منصوبہ بندی EMI کیلکولیٹرز، قسطوں کے شیڈول، ایمورٹائزیشن ٹیبلز، لیٹ فیس کے حساب کے ساتھ بہتر قرض کے انتظام کے لیے',
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
    description: 'Convert land areas between Marla, Kanal, Acre, and square feet. Calculate construction costs, paint, tiles, and room dimensions accurately',
    descriptionUrdu: 'مرلہ، کنال، ایکڑ، اور مربع فٹ کے درمیان زمین کے رقبے تبدیل کریں۔ تعمیراتی لاگت، پینٹ، ٹائلز، اور کمرے کی پیمائش درست طریقے سے کریں',
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
    description: 'Forecast business growth, population trends, sales projections, year-over-year analysis, and market trend predictions for strategic planning',
    descriptionUrdu: 'کاروباری ترقی، آبادی کے رجحانات، فروخت کی پیشن گوئیاں، سال بہ سال تجزیہ، اور مارکیٹ ٹرینڈ کی پیش گوئی حکمت عملی کی منصوبہ بندی کے لیے',
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
    description: 'Complete HR solutions for salary breakdowns, overtime pay, provident fund, gratuity, leave encashment, bonuses, tax deductions, and attendance tracking',
    descriptionUrdu: 'مکمل HR حل برائے تنخواہ کی تفصیل، اوور ٹائم تنخواہ، پراویڈنٹ فنڈ، گریچویٹی، چھٹیوں کی رقم، بونس، ٹیکس کٹوتی، اور حاضری کی نگرانی',
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
    description: 'Professional accounting tools for balance sheets, P&L statements, depreciation, asset valuation, receivables, working capital, and financial ratios',
    descriptionUrdu: 'پیشہ ورانہ اکاؤنٹنگ ٹولز برائے بیلنس شیٹ، P&L بیانات، قدر میں کمی، اثاثوں کی قدر، وصولیاں، ورکنگ کیپیٹل، اور مالیاتی تناسب',
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
    description: 'Manage inventory with tools for stock valuation, reorder points, turnover ratios, FIFO/LIFO methods, safety stock, and warehouse optimization',
    descriptionUrdu: 'انوینٹری کا انتظام ٹولز کے ساتھ اسٹاک کی قدر، دوبارہ آرڈر پوائنٹس، ٹرن اوور تناسب، FIFO/LIFO طریقے، حفاظتی اسٹاک، اور گودام کی اصلاح کے لیے',
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
    description: 'Property investment tools for rental yield, property valuation, ROI on properties, capital gains tax, and real estate market analysis',
    descriptionUrdu: 'پراپرٹی سرمایہ کاری کے ٹولز برائے کرائے کی آمدنی، پراپرٹی کی قدر، پراپرٹیز پر ROI، کیپٹل گینز ٹیکس، اور رئیل اسٹیٹ مارکیٹ کا تجزیہ',
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
    name: 'Construction & Building',
    nameUrdu: 'تعمیرات اور عمارت سازی',
    icon: Hammer,
    color: '#F97316',
    gradient: 'from-orange-600 to-red-600',
    description: 'Construction cost estimators for cement, bricks, steel, sand, paint, tiles, labor costs, and complete building material calculations',
    descriptionUrdu: 'تعمیراتی لاگت کا تخمینہ برائے سیمنٹ، اینٹیں، سٹیل، ریت، پینٹ، ٹائلز، مزدوری کی لاگت، اور مکمل تعمیراتی مواد کے حساب',
    calculators: [
      { id: 'cement', name: 'Cement Calculator', nameUrdu: 'سیمنٹ کیلکولیٹر', icon: Hammer },
      { id: 'brick', name: 'Brick Calculator', nameUrdu: 'اینٹ کیلکولیٹر', icon: Hammer },
      { id: 'steel', name: 'Steel Calculator', nameUrdu: 'اسٹیل کیلکولیٹر', icon: Hammer },
      { id: 'sand-gravel', name: 'Sand & Gravel', nameUrdu: 'ریت اور بجری', icon: Hammer },
      { id: 'concrete', name: 'Concrete Volume', nameUrdu: 'کنکریٹ حجم', icon: Hammer },
      { id: 'paint-area', name: 'Paint Area', nameUrdu: 'پینٹ کا رقبہ', icon: Ruler },
      { id: 'tile-cost', name: 'Tile Cost', nameUrdu: 'ٹائل کی لاگت', icon: DollarSign },
      { id: 'labor-cost', name: 'Labor Cost', nameUrdu: 'مزدوری کی لاگت', icon: Users },
      { id: 'house-cost', name: 'House Construction Cost', nameUrdu: 'مکان کی تعمیراتی لاگت', icon: Home },
      { id: 'material-quantity', name: 'Material Quantity', nameUrdu: 'مواد کی مقدار', icon: Package }
    ]
  },
  {
    id: 'education',
    name: 'Education & Academic',
    nameUrdu: 'تعلیم اور تعلیمی',
    icon: GraduationCap,
    color: '#8B5CF6',
    gradient: 'from-purple-600 to-indigo-600',
    description: 'Academic calculators for GPA, CGPA, grade conversions, percentage to GPA, student loan planning, and education cost estimations',
    descriptionUrdu: 'تعلیمی کیلکولیٹرز برائے GPA، CGPA، گریڈ تبدیلیاں، فیصد سے GPA، طالب علم قرض کی منصوبہ بندی، اور تعلیمی لاگت کا تخمینہ',
    calculators: [
      { id: 'gpa', name: 'GPA Calculator', nameUrdu: 'GPA کیلکولیٹر', icon: GraduationCap },
      { id: 'cgpa', name: 'CGPA Calculator', nameUrdu: 'CGPA کیلکولیٹر', icon: GraduationCap },
      { id: 'percentage-to-gpa', name: 'Percentage to GPA', nameUrdu: 'فیصد سے GPA', icon: Calculator },
      { id: 'grade-calculator', name: 'Grade Calculator', nameUrdu: 'گریڈ کیلکولیٹر', icon: FileText },
      { id: 'final-grade', name: 'Final Grade', nameUrdu: 'حتمی گریڈ', icon: GraduationCap },
      { id: 'student-loan', name: 'Student Loan', nameUrdu: 'طالب علم قرض', icon: DollarSign },
      { id: 'education-savings', name: 'Education Savings', nameUrdu: 'تعلیمی بچت', icon: DollarSign },
      { id: 'scholarship', name: 'Scholarship Calculator', nameUrdu: 'اسکالرشپ کیلکولیٹر', icon: Gift }
    ]
  },
  {
    id: 'health-fitness',
    name: 'Health & Fitness',
    nameUrdu: 'صحت اور تندرستی',
    icon: HeartPulse,
    color: '#EF4444',
    gradient: 'from-red-500 to-pink-500',
    description: 'Health calculators for BMI, BMR, calorie needs, body fat percentage, ideal weight, water intake, pregnancy due dates, and fitness tracking',
    descriptionUrdu: 'صحت کے کیلکولیٹرز برائے BMI، BMR، کیلوری کی ضرورت، جسمانی چربی کا فیصد، مثالی وزن، پانی کی مقدار، حمل کی تاریخ، اور فٹنس ٹریکنگ',
    calculators: [
      { id: 'bmi', name: 'BMI Calculator', nameUrdu: 'BMI کیلکولیٹر', icon: HeartPulse },
      { id: 'bmr', name: 'BMR Calculator', nameUrdu: 'BMR کیلکولیٹر', icon: HeartPulse },
      { id: 'calorie', name: 'Calorie Calculator', nameUrdu: 'کیلوری کیلکولیٹر', icon: Calculator },
      { id: 'body-fat', name: 'Body Fat Percentage', nameUrdu: 'جسمانی چربی فیصد', icon: HeartPulse },
      { id: 'ideal-weight', name: 'Ideal Weight', nameUrdu: 'مثالی وزن', icon: Scale },
      { id: 'water-intake', name: 'Water Intake', nameUrdu: 'پانی کی مقدار', icon: HeartPulse },
      { id: 'pregnancy', name: 'Pregnancy Due Date', nameUrdu: 'حمل کی تاریخ', icon: Calendar },
      { id: 'ovulation', name: 'Ovulation Calculator', nameUrdu: 'اووولیشن کیلکولیٹر', icon: Calendar },
      { id: 'protein-intake', name: 'Protein Intake', nameUrdu: 'پروٹین کی مقدار', icon: HeartPulse },
      { id: 'macro', name: 'Macro Calculator', nameUrdu: 'میکرو کیلکولیٹر', icon: Calculator }
    ]
  },
  {
    id: 'retail-ecommerce',
    name: 'Retail & E-commerce',
    nameUrdu: 'خوردہ اور ای کامرس',
    icon: ShoppingCart,
    color: '#10B981',
    gradient: 'from-green-600 to-emerald-600',
    description: 'E-commerce tools for pricing strategies, profit margins, shipping costs, conversion rates, cart abandonment, sales tax, and inventory planning',
    descriptionUrdu: 'ای کامرس ٹولز برائے قیمتوں کی حکمت عملی، منافع کے مارجن، شپنگ لاگت، تبدیلی کی شرح، کارٹ چھوڑنا، سیلز ٹیکس، اور انوینٹری کی منصوبہ بندی',
    calculators: [
      { id: 'selling-price', name: 'Selling Price', nameUrdu: 'فروخت کی قیمت', icon: DollarSign },
      { id: 'profit-margin-retail', name: 'Profit Margin', nameUrdu: 'منافع کا مارجن', icon: TrendingUp },
      { id: 'markup', name: 'Markup Calculator', nameUrdu: 'مارک اپ کیلکولیٹر', icon: Calculator },
      { id: 'shipping-cost', name: 'Shipping Cost', nameUrdu: 'شپنگ کی لاگت', icon: Package },
      { id: 'conversion-rate', name: 'Conversion Rate', nameUrdu: 'تبدیلی کی شرح', icon: BarChart3 },
      { id: 'sales-tax-retail', name: 'Sales Tax', nameUrdu: 'سیلز ٹیکس', icon: FileText },
      { id: 'discount-profit', name: 'Discount Impact', nameUrdu: 'ڈسکاؤنٹ کا اثر', icon: Calculator },
      { id: 'cogs', name: 'Cost of Goods Sold', nameUrdu: 'فروخت شدہ سامان کی لاگت', icon: Package },
      { id: 'average-order', name: 'Average Order Value', nameUrdu: 'اوسط آرڈر ویلیو', icon: ShoppingCart },
      { id: 'customer-lifetime', name: 'Customer Lifetime Value', nameUrdu: 'کسٹمر لائف ٹائم ویلیو', icon: Users }
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Farming',
    nameUrdu: 'زراعت اور کاشتکاری',
    icon: Sprout,
    color: '#84CC16',
    gradient: 'from-lime-600 to-green-600',
    description: 'Farming calculators for crop yield, fertilizer requirements, irrigation costs, seed quantity, harvest planning, and agricultural profit estimation',
    descriptionUrdu: 'کاشتکاری کے کیلکولیٹرز برائے فصل کی پیداوار، کھاد کی ضرورت، آبپاشی کی لاگت، بیج کی مقدار، فصل کی منصوبہ بندی، اور زرعی منافع کا تخمینہ',
    calculators: [
      { id: 'crop-yield', name: 'Crop Yield', nameUrdu: 'فصل کی پیداوار', icon: Sprout },
      { id: 'fertilizer', name: 'Fertilizer Calculator', nameUrdu: 'کھاد کیلکولیٹر', icon: Sprout },
      { id: 'irrigation-cost', name: 'Irrigation Cost', nameUrdu: 'آبپاشی کی لاگت', icon: DollarSign },
      { id: 'seed-rate', name: 'Seed Rate', nameUrdu: 'بیج کی شرح', icon: Sprout },
      { id: 'harvest-time', name: 'Harvest Time', nameUrdu: 'فصل کا وقت', icon: Calendar },
      { id: 'farm-profit', name: 'Farm Profit', nameUrdu: 'فارم کا منافع', icon: TrendingUp },
      { id: 'land-lease', name: 'Land Lease', nameUrdu: 'زمین کا لیز', icon: Home },
      { id: 'pesticide', name: 'Pesticide Calculator', nameUrdu: 'کیڑے مار دوا کیلکولیٹر', icon: Sprout }
    ]
  },
  {
    id: 'utilities',
    name: 'Utilities & Bills',
    nameUrdu: 'یوٹیلیٹیز اور بل',
    icon: Zap,
    color: '#FBBF24',
    gradient: 'from-amber-500 to-yellow-500',
    description: 'Calculate electricity bills, gas consumption, water charges, internet costs, and compare utility providers for better budget management',
    descriptionUrdu: 'بجلی کے بل، گیس کی کھپت، پانی کے چارجز، انٹرنیٹ کی لاگت کا حساب لگائیں، اور بہتر بجٹ انتظام کے لیے یوٹیلیٹی فراہم کنندگان کا موازنہ کریں',
    calculators: [
      { id: 'electricity-bill', name: 'Electricity Bill', nameUrdu: 'بجلی کا بل', icon: Zap },
      { id: 'gas-bill', name: 'Gas Bill', nameUrdu: 'گیس کا بل', icon: Zap },
      { id: 'water-bill', name: 'Water Bill', nameUrdu: 'پانی کا بل', icon: Zap },
      { id: 'internet-cost', name: 'Internet Cost', nameUrdu: 'انٹرنیٹ کی لاگت', icon: Globe },
      { id: 'solar-savings', name: 'Solar Savings', nameUrdu: 'سولر بچت', icon: Sun },
      { id: 'energy-consumption', name: 'Energy Consumption', nameUrdu: 'توانائی کی کھپت', icon: Zap },
      { id: 'appliance-cost', name: 'Appliance Running Cost', nameUrdu: 'آلات چلانے کی لاگت', icon: Zap }
    ]
  },
  {
    id: 'automotive',
    name: 'Automotive & Vehicle',
    nameUrdu: 'گاڑیاں اور وہیکل',
    icon: Car,
    color: '#3B82F6',
    gradient: 'from-blue-600 to-indigo-600',
    description: 'Vehicle calculators for fuel efficiency, car loan EMI, maintenance costs, depreciation, resale value, and total ownership cost analysis',
    descriptionUrdu: 'گاڑی کے کیلکولیٹرز برائے ایندھن کی کارکردگی، کار لون EMI، دیکھ بھال کی لاگت، قدر میں کمی، دوبارہ فروخت کی قیمت، اور کل ملکیت کی لاگت کا تجزیہ',
    calculators: [
      { id: 'fuel-efficiency', name: 'Fuel Efficiency', nameUrdu: 'ایندھن کی کارکردگی', icon: Car },
      { id: 'car-loan', name: 'Car Loan EMI', nameUrdu: 'کار لون EMI', icon: Calculator },
      { id: 'maintenance', name: 'Maintenance Cost', nameUrdu: 'دیکھ بھال کی لاگت', icon: DollarSign },
      { id: 'car-depreciation', name: 'Car Depreciation', nameUrdu: 'کار کی قدر میں کمی', icon: TrendingDown },
      { id: 'resale-value', name: 'Resale Value', nameUrdu: 'دوبارہ فروخت کی قیمت', icon: Car },
      { id: 'lease-vs-buy', name: 'Lease vs Buy', nameUrdu: 'لیز بمقابلہ خریداری', icon: Car },
      { id: 'ownership-cost', name: 'Total Ownership Cost', nameUrdu: 'کل ملکیت کی لاگت', icon: DollarSign },
      { id: 'trip-cost', name: 'Trip Cost', nameUrdu: 'سفر کی لاگت', icon: Car }
    ]
  },
  {
    id: 'legal-compliance',
    name: 'Legal & Compliance',
    nameUrdu: 'قانونی اور تعمیل',
    icon: Scale,
    color: '#6366F1',
    gradient: 'from-indigo-600 to-purple-600',
    description: 'Legal cost estimators for court fees, lawyer charges, contract values, notary costs, registration fees, and compliance requirements',
    descriptionUrdu: 'قانونی لاگت کا تخمینہ برائے عدالتی فیس، وکیل کے چارجز، معاہدے کی قیمتیں، نوٹری کی لاگت، رجسٹریشن فیس، اور تعمیل کی ضروریات',
    calculators: [
      { id: 'court-fee', name: 'Court Fee', nameUrdu: 'عدالتی فیس', icon: Scale },
      { id: 'lawyer-fee', name: 'Lawyer Fee', nameUrdu: 'وکیل کی فیس', icon: DollarSign },
      { id: 'contract-value', name: 'Contract Value', nameUrdu: 'معاہدے کی قیمت', icon: FileText },
      { id: 'notary-cost', name: 'Notary Cost', nameUrdu: 'نوٹری کی لاگت', icon: FileText },
      { id: 'registration-fee', name: 'Registration Fee', nameUrdu: 'رجسٹریشن فیس', icon: FileText },
      { id: 'legal-notice', name: 'Legal Notice Cost', nameUrdu: 'قانونی نوٹس کی لاگت', icon: FileText }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing & Advertising',
    nameUrdu: 'مارکیٹنگ اور اشتہارات',
    icon: Megaphone,
    color: '#EC4899',
    gradient: 'from-pink-600 to-rose-600',
    description: 'Marketing ROI calculators, ad spend optimization, customer acquisition cost, campaign budget planning, and conversion tracking tools',
    descriptionUrdu: 'مارکیٹنگ ROI کیلکولیٹرز، اشتہاری خرچ کی اصلاح، کسٹمر حاصل کرنے کی لاگت، مہم کے بجٹ کی منصوبہ بندی، اور تبدیلی کی ٹریکنگ ٹولز',
    calculators: [
      { id: 'marketing-roi', name: 'Marketing ROI', nameUrdu: 'مارکیٹنگ ROI', icon: TrendingUp },
      { id: 'cac', name: 'Customer Acquisition Cost', nameUrdu: 'کسٹمر حاصل کرنے کی لاگت', icon: DollarSign },
      { id: 'ad-spend', name: 'Ad Spend Calculator', nameUrdu: 'اشتہاری خرچ کیلکولیٹر', icon: Megaphone },
      { id: 'ctr', name: 'Click-Through Rate', nameUrdu: 'کلک تھرو ریٹ', icon: BarChart3 },
      { id: 'cpm', name: 'CPM Calculator', nameUrdu: 'CPM کیلکولیٹر', icon: Calculator },
      { id: 'social-media-roi', name: 'Social Media ROI', nameUrdu: 'سوشل میڈیا ROI', icon: TrendingUp },
      { id: 'email-roi', name: 'Email Marketing ROI', nameUrdu: 'ای میل مارکیٹنگ ROI', icon: FileText },
      { id: 'influencer-cost', name: 'Influencer Marketing Cost', nameUrdu: 'انفلوئنسر مارکیٹنگ لاگت', icon: Users }
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & Production',
    nameUrdu: 'مینوفیکچرنگ اور پیداوار',
    icon: Factory,
    color: '#64748B',
    gradient: 'from-slate-600 to-gray-600',
    description: 'Production cost calculators, material requirements planning, machine efficiency, cycle time, labor productivity, and manufacturing overhead analysis',
    descriptionUrdu: 'پیداوار کی لاگت کیلکولیٹرز، مواد کی ضروریات کی منصوبہ بندی، مشین کی کارکردگی، سائیکل ٹائم، مزدوری کی پیداواریت، اور مینوفیکچرنگ اوور ہیڈ کا تجزیہ',
    calculators: [
      { id: 'production-cost', name: 'Production Cost', nameUrdu: 'پیداوار کی لاگت', icon: Factory },
      { id: 'material-requirement', name: 'Material Requirement', nameUrdu: 'مواد کی ضرورت', icon: Package },
      { id: 'machine-efficiency', name: 'Machine Efficiency', nameUrdu: 'مشین کی کارکردگی', icon: Factory },
      { id: 'cycle-time', name: 'Cycle Time', nameUrdu: 'سائیکل ٹائم', icon: Clock },
      { id: 'labor-productivity', name: 'Labor Productivity', nameUrdu: 'مزدوری کی پیداواریت', icon: Users },
      { id: 'overhead-cost', name: 'Manufacturing Overhead', nameUrdu: 'مینوفیکچرنگ اوور ہیڈ', icon: DollarSign },
      { id: 'breakage-cost', name: 'Breakage Cost', nameUrdu: 'ٹوٹ پھوٹ کی لاگت', icon: Calculator },
      { id: 'oee', name: 'Overall Equipment Effectiveness', nameUrdu: 'مجموعی آلات کی تاثیر', icon: BarChart3 }
    ]
  },
  {
    id: 'energy-solar',
    name: 'Energy & Solar',
    nameUrdu: 'توانائی اور سولر',
    icon: Sun,
    color: '#F59E0B',
    gradient: 'from-amber-600 to-orange-600',
    description: 'Solar panel calculations, energy savings, ROI on solar systems, battery backup sizing, net metering benefits, and renewable energy planning',
    descriptionUrdu: 'سولر پینل کے حساب، توانائی کی بچت، سولر سسٹمز پر ROI، بیٹری بیک اپ کا سائز، نیٹ میٹرنگ فوائد، اور قابل تجدید توانائی کی منصوبہ بندی',
    calculators: [
      { id: 'solar-panel', name: 'Solar Panel Size', nameUrdu: 'سولر پینل سائز', icon: Sun },
      { id: 'solar-roi', name: 'Solar ROI', nameUrdu: 'سولر ROI', icon: TrendingUp },
      { id: 'battery-backup', name: 'Battery Backup', nameUrdu: 'بیٹری بیک اپ', icon: Zap },
      { id: 'energy-savings', name: 'Energy Savings', nameUrdu: 'توانائی کی بچت', icon: DollarSign },
      { id: 'net-metering', name: 'Net Metering', nameUrdu: 'نیٹ میٹرنگ', icon: Calculator },
      { id: 'solar-payback', name: 'Solar Payback Period', nameUrdu: 'سولر واپسی کی مدت', icon: Calendar },
      { id: 'inverter-size', name: 'Inverter Size', nameUrdu: 'انورٹر سائز', icon: Zap }
    ]
  },
  {
    id: 'statistics',
    name: 'Statistics & Data Analysis',
    nameUrdu: 'شماریات اور ڈیٹا تجزیہ',
    icon: BarChart3,
    color: '#14B8A6',
    gradient: 'from-teal-600 to-cyan-600',
    description: 'Statistical calculators for mean, median, mode, standard deviation, probability, correlation, regression analysis, and hypothesis testing',
    descriptionUrdu: 'شماریاتی کیلکولیٹرز برائے اوسط، میڈین، موڈ، معیاری انحراف، امکان، باہمی تعلق، ریگریشن تجزیہ، اور مفروضے کی جانچ',
    calculators: [
      { id: 'mean-median', name: 'Mean, Median, Mode', nameUrdu: 'اوسط، میڈین، موڈ', icon: BarChart3 },
      { id: 'standard-deviation', name: 'Standard Deviation', nameUrdu: 'معیاری انحراف', icon: Calculator },
      { id: 'probability', name: 'Probability', nameUrdu: 'امکان', icon: BarChart3 },
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
    description: 'Age calculators, date difference, working days counter, time zone conversions, project deadlines, and business hours tracking',
    descriptionUrdu: 'عمر کیلکولیٹرز، تاریخ کا فرق، کام کے دنوں کی گنتی، ٹائم زون تبدیلیاں، منصوبے کی آخری تاریخ، اور کاروباری اوقات کی نگرانی',
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
    description: 'Scientific calculators for unit conversions, chemical equations, pH calculations, molarity, dilution, gas laws, physics formulas, and laboratory measurements',
    descriptionUrdu: 'سائنسی کیلکولیٹرز برائے یونٹ تبدیلیاں، کیمیائی مساوات، pH حساب، مولریٹی، تخفیف، گیس قوانین، طبیعیات کے فارمولے، اور لیبارٹری کی پیمائش',
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
    description: 'Gaming calculators for tournament brackets, prize pool distribution, game scores, odds calculations, and betting analysis tools',
    descriptionUrdu: 'گیمنگ کیلکولیٹرز برائے ٹورنامنٹ بریکٹس، انعامی پول کی تقسیم، گیم سکورز، مشکلات کے حساب، اور بیٹنگ تجزیہ ٹولز',
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
    description: 'Personal money management tools for budget planning, expense tracking, bill splitting, tip calculations, debt payoff, emergency funds, and net worth analysis',
    descriptionUrdu: 'ذاتی پیسے کے انتظام کے ٹولز برائے بجٹ پلاننگ، اخراجات کی ٹریکنگ، بل کی تقسیم، ٹپ کے حساب، قرض کی ادائیگی، ایمرجنسی فنڈز، اور خالص مالیت کا تجزیہ',
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
    description: 'Government service calculators for pension planning, social security benefits, vehicle registration fees, passport costs, CNIC renewal, and utility connection charges',
    descriptionUrdu: 'حکومتی سروس کیلکولیٹرز برائے پنشن کی منصوبہ بندی، سماجی تحفظ کے فوائد، گاڑی کی رجسٹریشن فیس، پاسپورٹ کی لاگت، شناختی کارڈ کی تجدید، اور یوٹیلیٹی کنکشن چارجز',
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
    description: 'Freelancer tools for hourly rate calculations, project quotes, invoice generation, tax planning, time tracking, and client profitability analysis',
    descriptionUrdu: 'فری لانسر ٹولز برائے گھنٹے کی شرح کے حساب، پروجیکٹ کوٹس، انوائس جنریشن، ٹیکس پلاننگ، وقت کی ٹریکنگ، اور کلائنٹ منافع کا تجزیہ',
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
    description: 'Islamic charity calculators for Zakat calculations, Nisab thresholds, Sadaqah planning, Fitrana amounts, and donation management for Muslim community',
    descriptionUrdu: 'اسلامی خیرات کیلکولیٹرز برائے زکوٰۃ کے حساب، نصاب کی حدیں، صدقہ کی منصوبہ بندی، فطرانہ کی رقمیں، اور مسلم کمیونٹی کے لیے عطیات کا انتظام',
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
    description: 'Everyday utility calculators including age in days, cooking measurements, recipe scaling, clothing sizes, random numbers, percentages, ratios, and fractions',
    descriptionUrdu: 'روزمرہ یوٹیلیٹی کیلکولیٹرز بشمول دنوں میں عمر، کھانا پکانے کی پیمائش، ریسیپی سکیلنگ، کپڑوں کے سائز، بے ترتیب نمبر، فیصد، تناسب، اور کسر',
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
