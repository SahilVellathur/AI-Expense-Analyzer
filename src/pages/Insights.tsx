// Insights.tsx
import { 
  Sparkles, 
  Lightbulb, 
  ArrowRight,
  Zap,
  Leaf,
  DollarSign
} from 'lucide-react'
import { Transaction, AIInsight } from '../data'
import { formatINR } from '../utils/format'

interface InsightsProps {
  transactions: Transaction[];
  insights: AIInsight[];
}

const Insights: React.FC<InsightsProps> = ({ insights }) => {
  const InsightCard: React.FC<{ insight: AIInsight }> = ({ insight }) => {
    const isSaving = insight.type === 'saving'
    const isAlert = insight.type === 'alert'
    
    return (
      <div className={`card-botanical relative overflow-hidden group ${isAlert ? 'border-amber-100 bg-amber-50/20' : ''}`}>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-2xl shrink-0 ${isSaving ? 'bg-primary text-white' : isAlert ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
            {isSaving ? <DollarSign size={24} /> : isAlert ? <Zap size={24} /> : <Leaf size={24} />}
          </div>
          <div className="flex-1 space-y-2 text-left">
            <div className="flex justify-between items-center gap-2">
              <h4 className="font-bold text-lg leading-tight">{insight.title}</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap ${isSaving ? 'bg-primary/10 text-primary' : isAlert ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {insight.impact}
              </span>
            </div>
            <p className="text-on-surface-variant leading-relaxed text-sm">
              {insight.description}
            </p>
            <button className="flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform pt-2">
              Action Plan <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-primary to-primary-container p-8 rounded-3xl text-white shadow-xl text-left">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-secondary font-bold uppercase tracking-widest text-xs">
            <Sparkles size={16} />
            Tailored for you
          </div>
          <h2 className="text-3xl font-bold">Smart Insights</h2>
          <p className="text-white/80 max-w-lg">Our AI analyzed your spending habits from the last 30 days to generate these growth opportunities.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
           <div className="text-right">
             <span className="text-xs text-white/60 block">Potential Savings</span>
             <span className="text-2xl font-bold">{formatINR(18200)}/mo</span>
           </div>
           <div className="p-3 bg-secondary rounded-xl text-primary">
             <Lightbulb size={24} />
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight: AIInsight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  )
}
export default Insights;
