import { useState, FormEvent } from 'react'
import {
  FileText,
  AlertCircle
} from 'lucide-react'
import { categories, Transaction } from '../data'
import UploadZone from '../components/UploadZone'

interface AddExpenseProps {
  onAddTransaction: (tx: Omit<Transaction, 'id'>) => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    merchant: '',
    note: ''
  })

  const handleManualSubmit = (e: FormEvent) => {
    e.preventDefault()
    onAddTransaction({
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category,
      merchant: formData.merchant,
      note: formData.note || 'Manual entry'
    })

    // Reset form
    setFormData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      merchant: '',
      note: ''
    })
    alert('Expense added successfully!')
  }

  const handleAnalysisComplete = (extracted: Omit<Transaction, 'id'>[]) => {
    extracted.forEach(tx => onAddTransaction(tx))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-on-surface text-left">Track New Expense</h2>
        <p className="text-on-surface-variant text-lg text-left">Input manually or let our AI scan your receipts.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="card-botanical space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Manual Entry</h3>
            <div className="p-2 rounded-lg bg-mint-50 text-primary">
              <FileText size={20} />
            </div>
          </div>

          <form onSubmit={handleManualSubmit} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">₹</span>
                <input
                  type="number"
                  step="1"
                  required
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-surface border border-mint-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-xl font-bold"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Category</label>
              <select
                required
                className="w-full px-4 py-3 rounded-xl bg-surface border border-mint-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Merchant</label>
              <input
                type="text"
                required
                placeholder="e.g. Amazon, BigBasket"
                className="w-full px-4 py-3 rounded-xl bg-surface border border-mint-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={formData.merchant}
                onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-on-surface-variant">Date</label>
              <input
                type="date"
                required
                className="w-full px-4 py-3 rounded-xl bg-surface border border-mint-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary w-full mt-4">
              Save Expense
            </button>
          </form>
        </section>

        <section className="space-y-8 text-left">
          <UploadZone onAnalysisComplete={handleAnalysisComplete} />

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-white text-primary shrink-0">
                <AlertCircle size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Pro Tip</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  For CSV uploads, ensure amounts are in INR. AI analysis handles multiple receipt formats automatically.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AddExpense
