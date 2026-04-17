# 🌿 FinBot: AI-Powered Expense Analyzer

FinBot is a premium, privacy-focused expense management application designed with a beautiful botanical aesthetic. It combines smart financial tracking with an interactive dashboard and AI-driven insights.

## ✨ Key Features

- **Botanical Dashboard**: A lush, interactive overview of your financial health, featuring glassmorphism and smooth animations.
- **Smart Reports**: Detailed transaction history with powerful search, filtering, and "Live Demo" capabilities.
- **Smart Upload**: Bulk import bank statements (CSV) or receipts.
- **Privacy First**: All data is processed locally in your browser. No sensitive financial information ever leaves your device.
- **AI Insights**: Tailored growth opportunities and saving milestones generated from your spending patterns.
- **Responsive Design**: Fluid experience across mobile and desktop devices.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **State Management**: React Hooks & LocalStorage
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Deployment Guide (Vercel & GitHub)

To get your permanent public link (e.g., `ai-expense.vercel.app`), follow these steps:

### 1. Push to GitHub
- Create a new repository on [GitHub](https://github.com/new).
- Push your local code:
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin YOUR_REPO_URL
  git push -u origin main
  ```

### 2. Connect to Vercel
- Go to [Vercel](https://vercel.com/new).
- Import your GitHub repository.
- **IMPORTANT**: Under "Environment Variables", add:
  - **Key**: `VITE_API_URL`
  - **Value**: Your partner's backend URL (e.g., `https://your-api.com/api`)
- Click **Deploy**.

### 3. Collaboration
- Your partner can now access the frontend via the `.vercel.app` link.
- They can connect their backend by updating the `VITE_API_URL` variable in the Vercel project settings.

---

## 🍃 Live Demo Mode
For showcase purposes, you can toggle **"Live Demo"** in the sidebar to instantly populate the UI with a curated set of botanical-themed transaction data and charts.

---
*Created by the team at Antigravity.*
