import React from 'react'
import { 
  TrendingUp,
  ShieldCheck
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { UserProfile } from '../App'

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  userProfile: UserProfile;
  tabs: Tab[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  setActiveTab, 
  isSidebarOpen, 
  setSidebarOpen, 
  userProfile,
  tabs
}) => {
  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 glass transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center gap-3 mb-10 text-primary">
          <div className="p-2 rounded-xl bg-primary/10">
            <TrendingUp size={28} />
          </div>
          <h1 className="text-xl font-bold leading-none">FinBot</h1>
        </div>

        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center gap-3">
           <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold overflow-hidden shrink-0 border-2 border-white shadow-sm">
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
              ) : (
                userProfile.name[0].toUpperCase()
              )}
           </div>
           <div className="min-w-0">
              <p className="text-sm font-bold text-on-surface truncate">{userProfile.name}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Premium</p>
           </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`nav-link w-full ${activeTab === tab.id ? 'active' : ''} text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium`}
            >
              <tab.icon size={20} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>



        <div className="p-4 rounded-2xl bg-primary/5">
           <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-primary uppercase tracking-wider">
             <ShieldCheck size={14} />
             <span>Privacy First</span>
           </div>
           <p className="text-[10px] text-on-surface-variant text-left leading-relaxed">
             Secure AI analysis. Secure login. Data remains private.
           </p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
