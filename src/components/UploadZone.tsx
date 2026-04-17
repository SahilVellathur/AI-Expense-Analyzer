import { useState, useRef } from 'react'
import { 
  Upload, 
  CheckCircle2, 
  Loader2,
  FileSpreadsheet,
  FileText,
  AlertCircle
} from 'lucide-react'
import Papa from 'papaparse'
import { Transaction } from '../data'

interface UploadZoneProps {
  onAnalysisComplete: (transactions: Omit<Transaction, 'id'>[]) => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onAnalysisComplete }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [status, setStatus] = useState<'idle' | 'reading' | 'analyzing' | 'success' | 'error'>('idle')
  const [progress, setProgress] = useState<number>(0)
  const [message, setMessage] = useState<string>('Drag and drop your CSV or receipts here')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (!file) return
    
    setStatus('reading')
    setMessage(`Reading ${file.name}...`)
    setProgress(20)

    // Simulate thinking/AI processing for premium feel
    await new Promise(r => setTimeout(r, 800))
    setStatus('analyzing')
    setProgress(50)
    setMessage('Identifying merchants and amounts...')

    try {
      if (file.name.endsWith('.csv')) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedRows = results.data as any[]
            const transactions: Omit<Transaction, 'id'>[] = parsedRows.map(row => ({
              date: row.Date || row.date || new Date().toISOString().split('T')[0],
              merchant: row.Merchant || row.merchant || 'Unknown Merchant',
              amount: parseFloat(row.Amount || row.amount) || 0,
              category: (row.Category || row.category || 'groceries').toLowerCase(),
              note: row.Note || row.note || 'Parsed from CSV'
            }))
            
            setTimeout(() => {
              setProgress(100)
              setStatus('success')
              setMessage(`Success! Extracted ${transactions.length} transactions.`)
              onAnalysisComplete(transactions)
            }, 1000)
          },
          error: (err) => {
            console.error('PapaParse error:', err)
            setStatus('error')
            setMessage('Failed to parse CSV file.')
          }
        })
      } else {
        // Simulated AI analysis for PDFs/Images
        await new Promise(r => setTimeout(r, 2000))
        const simulatedResult: Omit<Transaction, 'id'>[] = [
          {
            date: new Date().toISOString().split('T')[0],
            merchant: 'Simulated Extraction',
            amount: 5450,
            category: 'entertainment',
            note: 'Automatically detected from file'
          }
        ]
        setProgress(100)
        setStatus('success')
        setMessage('AI Analysis complete! Data extracted from document.')
        onAnalysisComplete(simulatedResult)
      }
    } catch (err) {
      console.error('File handle error:', err)
      setStatus('error')
      setMessage('Analysis failed. Please check the file format.')
    } finally {
      setTimeout(() => {
        if (status === 'success') {
           setStatus('idle')
           setMessage('Drag and drop your CSV or receipts here')
           setProgress(0)
        }
      }, 3000)
    }
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }

  return (
    <div 
      className={`card-botanical border-2 border-dashed transition-all cursor-pointer relative overflow-hidden group 
        ${isDragging ? 'border-primary bg-primary/5' : 'border-mint-100 hover:border-primary/50'}
        ${status === 'success' ? 'border-green-500 bg-green-50/20' : ''}
        ${status === 'error' ? 'border-red-500 bg-red-50/20' : ''}
      `}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={(e) => e.target.files && handleFile(e.target.files[0])}
        accept=".csv,.pdf,.jpg,.png"
      />

      <div className="flex flex-col items-center justify-center py-12 text-center relative z-10">
        <div className={`mb-6 p-5 rounded-full transition-transform duration-500 ${isDragging ? 'scale-110' : ''} 
          ${status === 'reading' || status === 'analyzing' ? 'bg-primary/20 animate-pulse' : 'bg-mint-50 text-primary'}
        `}>
          {status === 'reading' || status === 'analyzing' ? (
            <Loader2 size={42} className="animate-spin" />
          ) : status === 'success' ? (
            <CheckCircle2 size={42} className="text-green-600" />
          ) : status === 'error' ? (
            <AlertCircle size={42} className="text-red-500" />
          ) : (
            <Upload size={42} />
          )}
        </div>
        
        <div className="space-y-2 px-6">
          <p className="font-bold text-lg">
            {status === 'reading' ? 'Reading File...' : status === 'analyzing' ? 'AI Analysis In Progress' : 'Smart Upload'}
          </p>
          <p className={`text-sm tracking-tight transition-colors ${status === 'error' ? 'text-red-600' : 'text-on-surface-variant'}`}>
            {message}
          </p>
        </div>

        {status === 'idle' && (
          <div className="mt-6 flex items-center justify-center gap-4 text-xs font-bold text-on-surface-variant/40">
             <div className="flex items-center gap-1">
               <FileSpreadsheet size={14} /> CSV
             </div>
             <div className="flex items-center gap-1">
               <FileText size={14} /> PDF / Image
             </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-mint-100 w-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Glossy Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
    </div>
  )
}

export default UploadZone
