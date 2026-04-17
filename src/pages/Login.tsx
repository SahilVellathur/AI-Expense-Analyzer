import { useState } from 'react'
import { LogIn, Shield, Mail } from 'lucide-react'

interface LoginProps {
  onLogin: (email: string) => void;
  onToggleSignup: () => void;
  isSignupMode: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, onToggleSignup, isSignupMode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (email.trim() === '' || password.trim() === '') {
      setError('Please fill in both email and password.')
      return
    }

    setIsLoading(true)

    // Simulate network delay
    setTimeout(() => {
      const usersJson = localStorage.getItem('users')
      const users = usersJson ? JSON.parse(usersJson) : {}

      if (isSignupMode) {
        // Sign Up Logic
        if (users[email.toLowerCase().trim()]) {
          setError('User already exists. Please login.')
          setIsLoading(false)
        } else {
          users[email.toLowerCase().trim()] = password
          localStorage.setItem('users', JSON.stringify(users))
          // Automatically log in after signup
          onLogin(email.toLowerCase().trim())
        }
      } else {
        // Login Logic
        const storedPassword = users[email.toLowerCase().trim()]
        
        // Support legacy hardcoded users if they aren't in localStorage yet
        const isLegacyUser = (email === 'user1@email.com' || email === 'user2@email.com') && !storedPassword
        
        if (storedPassword === password || (isLegacyUser && password === 'password')) {
          onLogin(email.toLowerCase().trim())
        } else {
          setError('Incorrect Email or Password')
          setIsLoading(false)
        }
      }
    }, 800)
  }

  const isFormValid = email.trim() !== '' && password.trim() !== ''

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-surface/80 backdrop-blur-2xl animate-in fade-in duration-1000">
      <div className="card-botanical w-full max-w-md p-8 relative overflow-hidden group">
        {/* Subtle background decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/5 rounded-full blur-3xl group-hover:bg-secondary/10 transition-colors duration-700" />

        <div className="relative z-10 text-center space-y-8">
          <div className="space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
              <LogIn size={28} />
            </div>
            <h1 className="text-3xl font-bold text-on-surface">
              {isSignupMode ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-on-surface-variant text-sm">
              {isSignupMode 
                ? 'Join FinBot to start tracking your expenses safely.' 
                : 'Secure access to your personal financial dashboard.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                  Email Address
                </label>
                <div className="relative group/input">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface border border-mint-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-medium"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant ml-1">
                  Password
                </label>
                <div className="relative group/input">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within/input:text-primary transition-colors">
                    <Shield size={18} />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface border border-mint-100 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-medium"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-600 font-bold mt-1 ml-1 animate-in slide-in-from-top-1 bg-red-50 p-2 rounded-lg border border-red-100">
                  {error}
                </p>
              )}
            </div>

            <button
              disabled={isLoading || !isFormValid}
              type="submit"
              className="w-full py-4 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark hover:-translate-y-0.5 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isSignupMode ? 'Create Vault' : 'Unlock Vault'}</span>
                  <LogIn size={18} />
                </>
              )}
            </button>
          </form>

          <div className="space-y-4">
            <button 
              onClick={onToggleSignup}
              className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              {isSignupMode ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
            </button>

            <div className="pt-4 border-t border-mint-50">
              <div className="flex items-center justify-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
                <Shield size={14} />
                <span>Privacy Guaranteed</span>
              </div>
              <p className="text-[10px] text-on-surface-variant leading-relaxed max-w-[280px] mx-auto">
                Your financial data is processed locally in your browser. No personal information is stored on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
