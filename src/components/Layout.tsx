import React from 'react'
import { Menu } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  onOpenSidebar: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, sidebar, onOpenSidebar }) => {
  return (
    <div className="flex min-h-screen bg-surface">
      {sidebar}

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <header className="flex items-center justify-between p-4 lg:hidden glass sticky top-0 z-40">
           <button onClick={onOpenSidebar} className="p-2 text-on-surface-variant">
             <Menu size={24} />
           </button>
           <span className="font-bold text-primary">FinBot</span>
           <div className="w-8" />
        </header>

        <div className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
           {children}
        </div>

        <footer className="p-8 text-center border-t border-mint-100 mt-auto">
          <p className="text-sm text-on-surface-variant mb-2">
            AI-Powered Expense Analyzer • 2026
          </p>
          <div className="max-w-2xl mx-auto p-4 rounded-xl bg-mint-50/50 text-[10px] text-on-surface-variant leading-relaxed border border-mint-100/50">
            IMPORTANT: This application does not provide investment, stock or financial advice. Data is processed locally for privacy. We are not a SEBI registered entity. Always consult a certified professional for financial decisions.
          </div>
        </footer>
      </main>
    </div>
  )
}

export default Layout
