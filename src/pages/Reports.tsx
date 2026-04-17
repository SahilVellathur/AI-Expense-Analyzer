import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  ShoppingBasket,
  Zap,
  Film,
  Car,
  Utensils,
  HeartPulse,
  Trash2,
  PieChart
} from 'lucide-react'
import { categories, Transaction } from '../data'
import { formatINR } from '../utils/format'

import Papa from 'papaparse'

interface ReportsProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: number) => void;
}

const Reports: React.FC<ReportsProps> = ({ transactions, onDeleteTransaction }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleExport = () => {
    if (transactions.length === 0) {
      alert('No transactions to export.')
      return
    }

    const exportData = transactions.map(t => ({
      ...t,
      'Transaction Link': `${window.location.origin}/#reports?id=${t.id}`,
      'Receipt Link': t.note.toLowerCase().includes('receipt') ? 'Check App' : 'N/A'
    }))

    const csv = Papa.unparse(exportData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `finbot-reports-${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getIcon = (catId: string) => {
    switch(catId) {
      case 'groceries': return ShoppingBasket
      case 'utilities': return Zap
      case 'entertainment': return Film
      case 'transport': return Car
      case 'dining': return Utensils
      case 'health': return HeartPulse
      default: return Filter
    }
  }

  const filteredTransactions = transactions.filter((t: Transaction) => 
    t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-on-surface text-left">Financial Reports</h2>
          <p className="text-on-surface-variant text-left">Detailed history of your transactions.</p>
        </div>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full font-medium border border-mint-100 hover:bg-mint-50 transition-all text-on-surface-variant group shadow-sm"
        >
          <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
          <span>Export CSV</span>
        </button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
          <input 
            type="text" 
            placeholder="Search by merchant or category..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-mint-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-mint-100 text-on-surface-variant hover:bg-mint-50 transition-all shadow-sm">
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      <div className="card-botanical overflow-hidden p-0 border-mint-100 shadow-sm shadow-mint-100/20">
        <div className="overflow-x-auto text-left">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-mint-50/50 text-xs font-bold uppercase tracking-widest text-on-surface-variant border-b border-mint-100">
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-mint-50">
              {filteredTransactions.map((t: Transaction) => {
                const Icon = getIcon(t.category)
                const category = categories.find(c => c.id === t.category)
                
                return (
                  <tr key={t.id} className="hover:bg-mint-50/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 rounded-xl bg-surface border border-mint-100 text-on-surface-variant group-hover:bg-white transition-colors">
                          <Icon size={20} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-on-surface truncate">{t.merchant}</p>
                          <p className="text-sm text-on-surface-variant truncate">{t.note}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ backgroundColor: category?.color + '20', color: category?.color }}>
                        {category?.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">
                      {new Date(t.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-on-surface">
                      {formatINR(t.amount)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => onDeleteTransaction(t.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        title="Delete expense"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filteredTransactions.length === 0 && (
          <div className="py-20 text-center">
            <div className="mb-4 text-mint-200">
              <PieChart size={48} className="mx-auto opacity-20" />
            </div>
            <p className="text-on-surface-variant font-medium">
              {searchTerm ? 'No transactions match your search.' : 'No expenses added yet.'}
            </p>
            {!searchTerm && transactions.length === 0 && (
               <p className="text-xs text-on-surface-variant/60 mt-2 italic">Start by adding your first expense in the 'Add Expense' tab.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Reports
