import { useState } from 'react'
import {
  CreditCard,
  Shield,
  Globe,
  ChevronRight,
  LogOut,
  Upload
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { UserProfile } from '../App'
import { useRef } from 'react'

// Use a local interface to keep it clean
interface SettingItem {
  icon: LucideIcon;
  label: string;
  desc: string;
}

interface SettingsProps {
  userProfile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onLogout: () => void;
}

const Settings: React.FC<SettingsProps> = ({ userProfile, onUpdateProfile, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState<UserProfile>(userProfile)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      alert('Image too large. Please select a photo under 2MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setEditData(prev => ({ ...prev, avatar: base64String }))
    }
    reader.readAsDataURL(file)
  }
  const SettingSection: React.FC<{ title: string, items: SettingItem[] }> = ({ title, items }) => (
    <div className="space-y-4 text-left">
      <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant px-2">{title}</h3>
      <div className="card-botanical p-0 overflow-hidden divide-y divide-mint-50">
        {items.map((item: SettingItem, idx: number) => (
          <button key={idx} className="w-full flex items-center justify-between p-4 hover:bg-mint-50/30 transition-all group">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-surface border border-mint-100 text-on-surface-variant group-hover:text-primary transition-colors">
                <item.icon size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-on-surface">{item.label}</p>
                <p className="text-xs text-on-surface-variant">{item.desc}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-mint-200 group-hover:text-primary transition-colors" />
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold text-on-surface text-left">Settings</h2>
        <p className="text-on-surface-variant text-left">Manage your account and privacy preferences.</p>
      </header>

      {isEditing ? (
        <>
          <div className="flex flex-col gap-6 p-6 card-botanical bg-gradient-to-br from-mint-50 to-white animate-in fade-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center gap-4 mb-4">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-24 h-24 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg shrink-0 overflow-hidden cursor-pointer group"
              >
                {editData.avatar ? (
                  <img src={editData.avatar} alt={editData.name} className="w-full h-full object-cover" />
                ) : (
                  editData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload size={24} className="text-white" />
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-bold text-primary hover:underline uppercase tracking-widest"
              >
                Change Photo
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-mint-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-bold"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">Monthly Budget (INR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant">₹</span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-3 rounded-xl bg-white border border-mint-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-bold"
                    value={editData.monthlyBudget}
                    onChange={(e) => setEditData({ ...editData, monthlyBudget: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">Region</label>
                <select
                  className="w-full px-4 py-3 rounded-xl bg-white border border-mint-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-bold appearance-none cursor-pointer"
                  value={editData.region}
                  onChange={(e) => setEditData({ ...editData, region: e.target.value })}
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="European Union">European Union</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1 block">Currency</label>
                <select
                  className="w-full px-4 py-3 rounded-xl bg-white border border-mint-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface font-bold appearance-none cursor-pointer"
                  value={editData.currency}
                  onChange={(e) => setEditData({ ...editData, currency: e.target.value })}
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {
                  onUpdateProfile(editData);
                  setIsEditing(false);
                }}
                className="flex-1 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:brightness-110 transition-all shadow-md shadow-primary/20"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditData(userProfile);
                  setIsEditing(false);
                }}
                className="px-6 py-3 rounded-xl border border-mint-200 text-on-surface-variant font-bold text-sm bg-white hover:bg-mint-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-6 p-6 card-botanical bg-gradient-to-br from-mint-50 to-white">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg shrink-0 overflow-hidden">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
            ) : (
              userProfile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            )}
          </div>
          <div className="flex-1 text-left">
            <h3 className="text-xl font-bold">{userProfile.name}</h3>
            <p className="text-on-surface-variant">Premium Member • Since 2024</p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 rounded-xl border border-primary/20 text-primary font-bold text-sm bg-white hover:bg-primary/5 transition-all"
          >
            Edit Profile
          </button>
        </div>
      )}

      <SettingSection
        title="Account"
        items={[
          { icon: CreditCard, label: 'Linked Accounts', desc: 'Manage your connected UPI ids and bank accounts' },
          { icon: Shield, label: 'Data Privacy', desc: 'Export your data or manage AI analysis permissions' },
          { icon: Globe, label: 'Language & Region', desc: `${userProfile.region} • ${userProfile.currency}` },

        ]}
      />

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-variant px-2 text-left">Legal</h3>
        <div className="card-botanical p-6 bg-mint-50/20 space-y-4 border-mint-100 text-left">
          <div className="space-y-1">
            <h4 className="font-bold text-sm">SEBI & Investment Disclaimer</h4>
            <p className="text-[10px] text-on-surface-variant leading-relaxed">
              FinBot is an expense tracking tool and does not provide investment, stock market, or financial advice. We are not a SEBI registered entity. All AI-generated insights are for educational purposes.
            </p>
          </div>
        </div>
      </div>

      <button 
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 p-4 text-red-600 font-bold hover:bg-red-50 rounded-2xl transition-all"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  )
}

export default Settings
