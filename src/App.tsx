import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, 
  PlusCircle, 
  PieChart, 
  Sparkles, 
  Settings, 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import AddExpense from './pages/AddExpense'
import Reports from './pages/Reports'
import Insights from './pages/Insights'
import SettingsPage from './pages/Settings'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Layout from './components/Layout'
import { initialTransactions, Transaction, aiInsights } from './data'

export interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface UserProfile {
  name: string;
  avatar: string;
  monthlyBudget: number;
  region: string;
  currency: string;
}


function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false)

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  const [sessionEmail, setSessionEmail] = useState<string | null>(() => {
    return localStorage.getItem('sessionEmail')
  })
  
  // Transactions state with persistence
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('finbot-transactions')
    return saved ? JSON.parse(saved) : initialTransactions
  })

  // Data to show
  const displayTransactions = transactions
  const displayInsights = aiInsights

  // User profile state with per-user persistence
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const email = localStorage.getItem('sessionEmail')
    if (email) {
      const savedProfile = localStorage.getItem(`profile_${email}`)
      if (savedProfile) return JSON.parse(savedProfile)
      
      const defaultBudget = 50000 // Default 50k INR
      
      if (email === 'user1@email.com') return { name: 'Alpha User', avatar: '', monthlyBudget: 200000, region: 'India', currency: 'INR' }
      if (email === 'user2@email.com') return { name: 'Beta User', avatar: '', monthlyBudget: 150000, region: 'India', currency: 'INR' }
      
      const nameFromEmail = email.split('@')[0]
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
      return { 
        name: nameFromEmail || 'Guest User', 
        avatar: '', 
        monthlyBudget: defaultBudget,
        region: 'India',
        currency: 'INR'
      }
    }
    return { 
      name: 'Guest User', 
      avatar: '', 
      monthlyBudget: 50000,
      region: 'India',
      currency: 'INR'
    }

  })

  // Persist login state
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString())
    if (sessionEmail) {
      localStorage.setItem('sessionEmail', sessionEmail)
    } else {
      localStorage.removeItem('sessionEmail')
    }
  }, [isLoggedIn, sessionEmail])

  // Persist transactions
  useEffect(() => {
    localStorage.setItem('finbot-transactions', JSON.stringify(transactions))
  }, [transactions])

  // Persist user profile per user
  useEffect(() => {
    if (sessionEmail) {
      localStorage.setItem(`profile_${sessionEmail}`, JSON.stringify(userProfile))
    }
  }, [userProfile, sessionEmail])
  
  // Hash-based routing for deep links (e.g., from CSV)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && tabs.some(t => t.id === hash)) {
        setActiveTab(hash)
      }
    }
    
    // Check initial hash
    handleHashChange()
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const handleLogin = (email: string) => {
    setSessionEmail(email)
    setIsLoggedIn(true)
    
    // Load or initialize profile for this email
    const saved = localStorage.getItem(`profile_${email}`)
    if (saved) {
      setUserProfile(JSON.parse(saved))
    } else {
      let name = ''
      let monthlyBudget = 50000
      if (email === 'user1@email.com') {
        name = 'Alpha User'
        monthlyBudget = 200000
      } else if (email === 'user2@email.com') {
        name = 'Beta User'
        monthlyBudget = 150000
      } else {
        name = email.split('@')[0]
          .split(/[._-]/)
          .map(part => part.charAt(0).toUpperCase() + part.slice(1))
          .join(' ') || 'Guest User'
      }
      setUserProfile({ 
        name, 
        avatar: '', 
        monthlyBudget,
        region: 'India',
        currency: 'INR'
      })

    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setSessionEmail(null)
    setActiveTab('dashboard')
  }

  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transactionWithId: Transaction = {
      ...newTx,
      id: Math.max(0, ...transactions.map(t => t.id)) + 1
    }
    setTransactions(prev => [transactionWithId, ...prev])
  }

  const tabs: Tab[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add', label: 'Add Expense', icon: PlusCircle },
    { id: 'reports', label: 'Reports', icon: PieChart },
    { id: 'insights', label: 'AI Insights', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const deleteTransaction = (id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id))
  }

  const [isSigningUp, setIsSigningUp] = useState<boolean>(() => {
    return window.location.pathname === '/signup'
  })

  if (!isLoggedIn) {
    return isSigningUp 
      ? <Login onLogin={handleLogin} onToggleSignup={() => setIsSigningUp(false)} isSignupMode={true} />
      : <Login onLogin={handleLogin} onToggleSignup={() => setIsSigningUp(true)} isSignupMode={false} />
  }

  const sidebar = (
    <Sidebar 
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isSidebarOpen={isSidebarOpen}
      setSidebarOpen={setSidebarOpen}
      userProfile={userProfile}
      tabs={tabs}
    />
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard transactions={displayTransactions} userProfile={userProfile} />
      case 'add': return <AddExpense onAddTransaction={addTransaction} />
      case 'reports': return <Reports transactions={displayTransactions} onDeleteTransaction={deleteTransaction} />
      case 'insights': return <Insights transactions={displayTransactions} insights={displayInsights} />
      case 'settings': return <SettingsPage userProfile={userProfile} onUpdateProfile={setUserProfile} onLogout={handleLogout} />
      default: return <Dashboard transactions={displayTransactions} userProfile={userProfile} />
    }
  }

  return (
    <Layout sidebar={sidebar} onOpenSidebar={() => setSidebarOpen(true)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  )
}

export default App
