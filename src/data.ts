export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  merchant: string;
  note: string;
}

export interface AIInsight {
  id: string;
  title: string;
  description: string;
  type: 'saving' | 'alert' | 'praise';
  impact: string;
}

export interface SavingTrend {
  month: string;
  saved: number;
  target: number;
}

export const categories: Category[] = [
  { id: 'groceries', name: 'Groceries', icon: 'ShoppingBasket', color: '#10b981' },
  { id: 'utilities', name: 'Utilities', icon: 'Zap', color: '#3b82f6' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Film', color: '#f59e0b' },
  { id: 'transport', name: 'Transport', icon: 'Car', color: '#6366f1' },
  { id: 'dining', name: 'Dining Out', icon: 'Utensils', color: '#ef4444' },
  { id: 'health', name: 'Health', icon: 'HeartPulse', color: '#ec4899' },
];

export const initialTransactions: Transaction[] = [];

export const aiInsights: AIInsight[] = [];

export const savingsData: SavingTrend[] = [];

// Showcase / Demo Data (Botanical Theme)
export const demoTransactions: Transaction[] = [
  { id: 901, date: '2026-04-12', amount: 8500, category: 'groceries', merchant: 'Rare Seed Exchange', note: 'Organic heirloom seeds' },
  { id: 902, date: '2026-04-10', amount: 12400, category: 'utilities', merchant: 'Hydroponics Hub', note: 'Smart irrigation electricity' },
  { id: 903, date: '2026-04-08', amount: 4500, category: 'health', merchant: 'Botanical Therapy', note: 'Essential oils & herbs' },
  { id: 904, date: '2026-04-05', amount: 3200, category: 'entertainment', merchant: 'Greenhouse Cinema', note: 'Botany workshop' },
  { id: 905, date: '2026-04-02', amount: 15600, category: 'dining', merchant: 'The Garden Café', note: 'Farm-to-table lunch' },
];

export const demoInsights: AIInsight[] = [
  { 
    id: 'demo-1', 
    title: 'Water Efficiency', 
    description: 'Your hydroponic system used 15% less energy this week due to optimal moisture sensor settings.',
    type: 'praise', 
    impact: '-₹1,200'
  },
  { 
    id: 'demo-2', 
    title: 'Market Opportunity', 
    description: 'Rare Orchid supply is low this month. Selling 2 of your mature plants could yield a ₹25,000 profit.',
    type: 'saving', 
    impact: '₹25,000'
  }
];

export const demoSavingsTrend: SavingTrend[] = [
  { month: 'Jan', saved: 15000, target: 12000 },
  { month: 'Feb', saved: 18000, target: 12000 },
  { month: 'Mar', saved: 14000, target: 12000 },
  { month: 'Apr', saved: 22000, target: 12000 },
];
