import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// Financial Calculators
import LoanCalculator from '../../src/calculators/financialCalculators/LoanCalculator';
import MortgageCalculator from '../../src/calculators/financialCalculators/MortgageCalculator';
import SIPCalculator from '../../src/calculators/financialCalculators/SIPCalculator';
import SavingsCalculator from '../../src/calculators/financialCalculators/SavingsCalculator';
import RetirementCalculator from '../../src/calculators/financialCalculators/RetirementCalculator';
import TaxCalculator from '../../src/calculators/financialCalculators/TaxCalculator';
import ProfitLossCalculator from '../../src/calculators/financialCalculators/ProfitLossCalculator';
import BreakevenCalculator from '../../src/calculators/financialCalculators/BreakevenCalculator';

// Business Calculators
import ROICalculator from '../../src/calculators/businessCalculators/ROICalculator';
import MarginCalculator from '../../src/calculators/businessCalculators/MarginCalculator';
import RevenueCalculator from '../../src/calculators/businessCalculators/RevenueCalculator';
import SalaryCalculator from '../../src/calculators/businessCalculators/SalaryCalculator';
import ValuationCalculator from '../../src/calculators/businessCalculators/ValuationCalculator';
import CashFlowCalculator from '../calculators/businessCalculators/CashFlowCalculator';
import DiscountCalculator from '../../src/calculators/businessCalculators/DiscountCalculator';
import CurrencyConverter from '../../src/calculators/businessCalculators/CurrencyConverter';

// Insurance Calculators
import LifeInsuranceCalculator from '../../src/calculators/insuranceCalculators/LifeInsuranceCalculator';
import HealthInsuranceCalculator from '../../src/calculators/insuranceCalculators/HealthInsuranceCalculator';
import TermInsuranceCalculator from '../../src/calculators/insuranceCalculators/TermInsuranceCalculator';
import VehicleInsuranceCalculator from '../../src/calculators/insuranceCalculators/VehicleInsuranceCalculator';
import InsuranceClaimCalculator from '../../src/calculators/insuranceCalculators/InsuranceClaimCalculator';

// Payment Plans Calculators
import EMICalculator from '../../src/calculators/paymentPlans/EMICalculator';
import InstallmentPlannerCalculator from '../../src/calculators/paymentPlans/InstallmentPlannerCalculator';
import PaymentScheduleCalculator from '../../src/calculators/paymentPlans/PaymentScheduleCalculator';
import LateFeeCalculator from '../../src/calculators/paymentPlans/LateFeeCalculator';
import AmortizationScheduleCalculator from '../../src/calculators/paymentPlans/AmortizationScheduleCalculator';

// Area & Measurement Calculators
import AreaConverterCalculator from '../../src/calculators/area&Measurement/AreaConverterCalculator';
import ConstructionCostCalculator from '../../src/calculators/area&Measurement/ConstructionCostCalculator';
import PaintCalculator from '../../src/calculators/area&Measurement/PaintCalculator';
import TileCalculator from '../../src/calculators/area&Measurement/TileCalculator';
import LandConverterCalculator from '../../src/calculators/area&Measurement/LandConverterCalculator';
import RoomSizeCalculator from '../../src/calculators/area&Measurement/RoomSizeCalculator';

// Growth & Projections Calculators
import BusinessGrowthCalculator from '../../src/calculators/growth&Projections/BusinessGrowthCalculator';
import PopulationGrowthCalculator from '../../src/calculators/growth&Projections/PopulationGrowthCalculator';
import SalesForecastCalculator from '../../src/calculators/growth&Projections/SalesForecastCalculator';
import TrendAnalysisCalculator from '../../src/calculators/growth&Projections/TrendAnalysisCalculator';
import YearOverYearCalculator from '../../src/calculators/growth&Projections/YearOverYearCalculator';

// HR & Payroll Calculators
import SalaryBreakdownCalculator from '../../src/calculators/hr&Payroll/SalaryBreakdownCalculator';
import OvertimeCalculator from '../../src/calculators/hr&Payroll/OvertimeCalculator';
import ProvidentFundCalculator from '../../src/calculators/hr&Payroll/ProvidentFundCalculator';
import GratuityCalculator from '../../src/calculators/hr&Payroll/GratuityCalculator';
import LeaveEncashmentCalculator from '../../src/calculators/hr&Payroll/LeaveEncashmentCalculator';
import BonusCalculator from '../../src/calculators/hr&Payroll/BonusCalculator';
import TaxDeductionCalculator from '../../src/calculators/hr&Payroll/TaxDeductionCalculator';
import WorkingHoursCalculator from '../../src/calculators/hr&Payroll/WorkingHoursCalculator';
import AttendanceCalculator from '../../src/calculators/hr&Payroll/AttendanceCalculator';
import PerformanceBonusCalculator from '../../src/calculators/hr&Payroll/PerformanceBonusCalculator';

// Accounting & Bookkeeping Calculators
import BalanceSheetCalculator from '../../src/calculators/accounting&Bookkeeping/BalanceSheetCalculator';
import AccountingProfitLossCalculator from '../../src/calculators/accounting&Bookkeeping/AccountingProfitLossCalculator';
import DepreciationCalculator from '../../src/calculators/accounting&Bookkeeping/DepreciationCalculator';
import AssetValuationCalculator from '../../src/calculators/accounting&Bookkeeping/AssetValuationCalculator';
import AccountsReceivableCalculator from '../../src/calculators/accounting&Bookkeeping/AccountsReceivableCalculator';
import PettyCashCalculator from '../../src/calculators/accounting&Bookkeeping/PettyCashCalculator';
import JournalEntryCalculator from '../../src/calculators/accounting&Bookkeeping/JournalEntryCalculator';
import TrialBalanceCalculator from '../../src/calculators/accounting&Bookkeeping/TrialBalanceCalculator';
import WorkingCapitalCalculator from '../../src/calculators/accounting&Bookkeeping/WorkingCapitalCalculator';
import QuickRatioCalculator from '../../src/calculators/accounting&Bookkeeping/QuickRatioCalculator';

// Inventory & Supply Chain Calculators
import StockValuationCalculator      from '../../src/calculators/inventory&SupplyChain/StockValuationCalculator';
import ReorderPointCalculator        from '../../src/calculators/inventory&SupplyChain/ReorderPointCalculator';
import EOQCalculator                 from '../../src/calculators/inventory&SupplyChain/EOQCalculator';
import SafetyStockCalculator         from '../../src/calculators/inventory&SupplyChain/SafetyStockCalculator';
import InventoryTurnoverCalculator   from '../../src/calculators/inventory&SupplyChain/InventoryTurnoverCalculator';
import DeadStockCalculator           from '../../src/calculators/inventory&SupplyChain/DeadStockCalculator';
import WarehouseSpaceCalculator      from '../../src/calculators/inventory&SupplyChain/WarehouseSpaceCalculator';
import ShippingCostCalculator        from '../../src/calculators/inventory&SupplyChain/ShippingCostCalculator';
import BulkDiscountCalculator        from '../../src/calculators/inventory&SupplyChain/BulkDiscountCalculator';

// Real Estate Calculators
import PropertyValuationCalculator from '../../src/calculators/realEstateCalculators/PropertyValuationCalculator';
import RentalYieldCalculator from '../../src/calculators/realEstateCalculators/RentalYieldCalculator';
import CapitalGainsTaxCalculator from '../../src/calculators/realEstateCalculators/CapitalGainsTaxCalculator';
import TransferCostCalculator from '../../src/calculators/realEstateCalculators/TransferCostCalculator';
import RenovationCostCalculator from '../../src/calculators/realEstateCalculators/RenovationCostCalculator';
import HomeAffordabilityCalculator from '../../src/calculators/realEstateCalculators/HomeAffordabilityCalculator';
import RentVsBuyCalculator from '../../src/calculators/realEstateCalculators/RentVsBuyCalculator';
import PropertyTaxCalculator from '../../src/calculators/realEstateCalculators/PropertyTaxCalculator';
import DownPaymentCalculator from '../../src/calculators/realEstateCalculators/DownPaymentCalculator';
import ClosingCostsCalculator from '../../src/calculators/realEstateCalculators/ClosingCostsCalculator';

// Other Calculators
import BMICalculator from '../calculators/BMICalculator';
import GPACalculator from '../calculators/GPACalculator';

const calculatorComponents = {
 // Financial Calculators
  'loan': LoanCalculator,
  'mortgage': MortgageCalculator,
  'sip': SIPCalculator,
  'savings': SavingsCalculator,
  'retirement': RetirementCalculator,
  'tax': TaxCalculator,
  'profitloss': ProfitLossCalculator,
  'breakeven': BreakevenCalculator,

  // Business Calculators
  'roi': ROICalculator,
  'revenue': RevenueCalculator,
  'margin': MarginCalculator,
  'salary': SalaryCalculator,
  'valuation': ValuationCalculator,
  'cashflow': CashFlowCalculator,
  'discount': DiscountCalculator,
  'currency': CurrencyConverter,

  // Insurance Calculators 
  'life': LifeInsuranceCalculator,
  'health': HealthInsuranceCalculator,
  'term': TermInsuranceCalculator,
  'vehicle': VehicleInsuranceCalculator,
  'claim': InsuranceClaimCalculator,

  // Payment Plans
  'emi': EMICalculator,
  'installment': InstallmentPlannerCalculator,
  'schedule': PaymentScheduleCalculator,
  'latefee': LateFeeCalculator,
  'amortization': AmortizationScheduleCalculator,
  
  // Area & Measurement
  'area': AreaConverterCalculator,
  'construction': ConstructionCostCalculator,
  'paint': PaintCalculator,
  'tile': TileCalculator,
  'landconvert': LandConverterCalculator,
  'roomsize': RoomSizeCalculator,

  // Growth & Projections
  'business-growth': BusinessGrowthCalculator,
  'population': PopulationGrowthCalculator,
  'sales': SalesForecastCalculator,
  'trend': TrendAnalysisCalculator,
  'yoy': YearOverYearCalculator,

  // HR & Payroll
  'salary-breakdown': SalaryBreakdownCalculator,
  'overtime': OvertimeCalculator,
  'pf': ProvidentFundCalculator,
  'gratuity': GratuityCalculator,
  'leave': LeaveEncashmentCalculator,
  'bonus': BonusCalculator,
  'tax-deduction': TaxDeductionCalculator,
  'working-hours': WorkingHoursCalculator,
  'attendance': AttendanceCalculator,
  'performance-bonus': PerformanceBonusCalculator,

  //  Accounting & Bookkeeping
  'balance-sheet': BalanceSheetCalculator,
  'profit-loss': AccountingProfitLossCalculator,
  'depreciation': DepreciationCalculator,
  'asset-valuation': AssetValuationCalculator,
  'receivable': AccountsReceivableCalculator,
  'petty-cash': PettyCashCalculator,
  'journal': JournalEntryCalculator,
  'trial-balance': TrialBalanceCalculator,
  'working-capital': WorkingCapitalCalculator,
  'quick-ratio': QuickRatioCalculator,

  // Inventory & Supply Chain
  'stock-valuation':    StockValuationCalculator,
  'reorder':            ReorderPointCalculator,
  'eoq':                EOQCalculator,
  'safety-stock':       SafetyStockCalculator,
  'inventory-turnover': InventoryTurnoverCalculator,
  'dead-stock':         DeadStockCalculator,
  'warehouse-space':    WarehouseSpaceCalculator,
  'shipping-cost':      ShippingCostCalculator,
  'bulk-discount':      BulkDiscountCalculator,

  // Real Estate Calculators
  'property-valuation': PropertyValuationCalculator,
  'rental-yield': RentalYieldCalculator,
  'capital-gains': CapitalGainsTaxCalculator,
  'transfer-cost': TransferCostCalculator,
  'renovation': RenovationCostCalculator,
  'affordability': HomeAffordabilityCalculator,
  'rent-vs-buy': RentVsBuyCalculator,
  'property-tax': PropertyTaxCalculator,
  'down-payment': DownPaymentCalculator,
  'closing-costs': ClosingCostsCalculator,

  // Healthcare
  'bmi': BMICalculator,
  
  // Education  
  'gpa': GPACalculator,
};

const CalculatorPage = ({ modules, language, addToHistory, calculationHistory }) => {
  const { moduleId, calculatorId } = useParams();
  const navigate = useNavigate();

  const module = modules.find(m => m.id === moduleId);
  const calculator = module?.calculators.find(c => c.id === calculatorId);

  if (!module || !calculator) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400">
          {language === 'en' ? 'Calculator not found' : 'کیلکولیٹر نہیں ملا'}
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {language === 'en' ? 'Go Home' : 'ہوم پر جائیں'}
        </button>
      </div>
    );
  }

  const CalculatorComponent = calculatorComponents[calculatorId];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => navigate('/')}>
          {language === 'en' ? 'Home' : 'ہوم'}
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => navigate(`/module/${moduleId}`)}>
          {language === 'en' ? module.name : module.nameUrdu}
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="font-semibold text-slate-800 dark:text-white">
          {language === 'en' ? calculator.name : calculator.nameUrdu}
        </span>
      </div>

      {/* Calculator Header */}
      <div className={`bg-gradient-to-r ${module.gradient} rounded-2xl p-8 text-white shadow-xl`}>
        <h1 className="text-3xl font-bold mb-2">
          {language === 'en' ? calculator.name : calculator.nameUrdu}
        </h1>
        <p className="text-white/90">{module.description}</p>
      </div>

      {/* Calculator Content */}
      {CalculatorComponent ? (
        <CalculatorComponent 
          language={language}
          addToHistory={addToHistory}
          calculatorName={language === 'en' ? calculator.name : calculator.nameUrdu}
          moduleColor={module.color}
        />
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center shadow-lg border border-slate-100 dark:border-slate-700">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <calculator.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
              {language === 'en' ? 'Coming Soon' : 'جلد آرہا ہے'}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              {language === 'en' 
                ? 'This calculator is under development. Stay tuned for updates!'
                : 'یہ کیلکولیٹر تیاری میں ہے۔ اپ ڈیٹس کے لیے منتظر رہیں!'
              }
            </p>
            <button
              onClick={() => navigate(`/module/${moduleId}`)}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200"
            >
              {language === 'en' ? 'View Other Calculators' : 'دیگر کیلکولیٹرز دیکھیں'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorPage;
