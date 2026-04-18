import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Target
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { categories, Transaction, Category } from '../data'
import { useSavingsData } from '../hooks/useSavingsData'
import { formatINR } from '../utils/format'
import { UserProfile } from '../App'

interface DashboardProps {
  transactions: Transaction[];
  userProfile: UserProfile;
}

interface StatCardProps {
  title: string;
  amount: number;
  trend: number;
  icon: LucideIcon;
  color: string;
}

const Dashboard: React.FC<DashboardProps> = ({ transactions, userProfile }) => {
  const { data: savingsData } = useSavingsData()
  const totalExpenses = transactions.reduce((acc: number, curr: Transaction) => acc + curr.amount, 0)
  const monthlyBudget = userProfile.monthlyBudget
  const savings = Math.max(0, monthlyBudget - totalExpenses)

  const sortedCategories = categories
    .map((cat: Category) => ({
      name: cat.name,
      value: transactions
        .filter((t: Transaction) => t.category === cat.id)
        .reduce((acc: number, curr: Transaction) => acc + curr.amount, 0),
      color: cat.color
    }))
    .filter(c => c.value > 0)
    .sort((a, b) => b.value - a.value)

  const categoryData = sortedCategories.length > 5 
    ? [
        ...sortedCategories.slice(0, 3),
        {
          name: 'Others',
          value: sortedCategories.slice(3).reduce((acc, curr) => acc + curr.value, 0),
          color: '#94a3b8'
        }
      ]
    : sortedCategories

  const StatCard: React.FC<StatCardProps> = ({ title, amount, trend, icon: Icon, color }) => (
    <div className="card-botanical hover:border-primary/30 group">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-opacity-100`}>
          <Icon size={24} className="text-current" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {Math.abs(trend)}%
        </div>
      </div>
      <h3 className="text-on-surface-variant text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold tracking-tight text-left">{formatINR(amount)}</p>
    </div>
  )

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
          <TrendingUp size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-on-surface">Welcome to FinBot</h2>
          <p className="text-on-surface-variant max-w-md mx-auto mt-2">
            Your financial garden is ready for planting. Add your first expense to start tracking your growth.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-8">
           <div className="p-6 rounded-2xl bg-white border border-mint-100 shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 text-primary flex items-center justify-center mb-4">
                <Wallet size={20} />
              </div>
              <h4 className="font-bold mb-1">Track Spending</h4>
              <p className="text-xs text-on-surface-variant">Log your daily expenses to see where your money goes.</p>
           </div>
           <div className="p-6 rounded-2xl bg-white border border-mint-100 shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-green-600 flex items-center justify-center mb-4">
                <Target size={20} />
              </div>
              <h4 className="font-bold mb-1">Set Goals</h4>
              <p className="text-xs text-on-surface-variant">Monitor your savings and stay within your monthly budget.</p>
           </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-on-surface">Financial Overview</h2>
            <p className="text-on-surface-variant">Your wealth is growing like a healthy garden.</p>
          </div>
          <div className="flex items-center gap-3 p-2 pr-6 rounded-full bg-surface border border-mint-100 shadow-sm self-start md:self-center">
             <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold overflow-hidden border-2 border-white shadow-sm">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
                ) : (
                  userProfile.name[0].toUpperCase()
                )}
             </div>
             <div className="hidden sm:block">
                <p className="text-sm font-bold text-on-surface">{userProfile.name}</p>
                <div className="flex items-center gap-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                   <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Active Now</p>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Total Expenses" 
          amount={totalExpenses} 
          trend={-12} 
          icon={Wallet} 
          color="bg-primary text-primary" 
        />
        <StatCard 
          title="Monthly Savings" 
          amount={savings} 
          trend={8} 
          icon={TrendingUp} 
          color="bg-secondary text-primary" 
        />
        <StatCard 
          title="Budget Goal" 
          amount={monthlyBudget} 
          trend={0} 
          icon={Target} 
          color="bg-emerald-50 text-green-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
        {/* Main Chart */}
        <div className="lg:col-span-2 card-botanical min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold">Savings Growth</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                <div className="w-3 h-3 rounded-full bg-primary" /> Saved
              </span>
              <span className="flex items-center gap-1 text-xs text-on-surface-variant">
                <div className="w-3 h-3 rounded-full bg-emerald-100" /> Target
              </span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart data={savingsData}>
                <defs>
                  <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00623d" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00623d" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#40493d', fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  formatter={(value: any) => formatINR(Number(value))}
                  contentStyle={{ 
                    borderRadius: '1rem', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="saved" 
                  stroke="#00623d" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSaved)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#dcfce7" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Pie Chart */}
        <div className="card-botanical">
          <h3 className="text-lg font-bold mb-8">Spending by Category</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="99%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={75}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((_entry, index: number) => (
                    <Cell key={`cell-${index}`} fill={categoryData[index]?.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => formatINR(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="text-xs text-on-surface-variant block uppercase font-bold tracking-widest">Total</span>
                <span className="text-xl font-bold text-on-surface">{formatINR(totalExpenses)}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-on-surface-variant">{item.name}</span>
                </div>
                <span className="font-semibold">{formatINR(item.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
