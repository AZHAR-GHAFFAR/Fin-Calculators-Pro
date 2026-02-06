import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';

const ModulePage = ({ modules, language }) => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const module = modules.find(m => m.id === moduleId);

  if (!module) {
    return <div className="text-center py-12 text-slate-600 dark:text-slate-400">Module not found</div>;
  }

  const Icon = module.icon;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => navigate('/')}>
          {language === 'en' ? 'Home' : 'ہوم'}
        </span>
        <ChevronRight className="w-4 h-4" />
        <span className="font-semibold text-slate-800 dark:text-white">
          {language === 'en' ? module.name : module.nameUrdu}
        </span>
      </div>

      {/* Module Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md"
            style={{ backgroundColor: `${module.color}20` }}
          >
            <Icon className="w-8 h-8" style={{ color: module.color }} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
              {language === 'en' ? module.name : module.nameUrdu}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {module.calculators.length} {language === 'en' ? 'professional calculators available' : 'پیشہ ورانہ کیلکولیٹرز دستیاب ہیں'}
            </p>
          </div>
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {module.calculators.map((calc, idx) => {
          const CalcIcon = calc.icon;
          
          return (
            <div
              key={calc.id}
              onClick={() => navigate(`/calculator/${moduleId}/${calc.id}`)}
              className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 dark:border-slate-700 hover:border-transparent transform hover:-translate-y-1"
              style={{ animationDelay: `${idx * 30}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: `${module.color}15` }}
                >
                  <CalcIcon className="w-6 h-6" style={{ color: module.color }} />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-200" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                {language === 'en' ? calc.name : calc.nameUrdu}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ModulePage;
