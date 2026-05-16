"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  Key,
  Bug,
  Lock,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { CyberBackground } from "@/components/cyber-background"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const securityScore = 72

const trendData = [
  { date: "Jan", vulnerabilities: 45, secrets: 12, score: 58 },
  { date: "Feb", vulnerabilities: 38, secrets: 8, score: 64 },
  { date: "Mar", vulnerabilities: 52, secrets: 15, score: 55 },
  { date: "Apr", vulnerabilities: 35, secrets: 6, score: 68 },
  { date: "May", vulnerabilities: 28, secrets: 4, score: 72 },
  { date: "Jun", vulnerabilities: 22, secrets: 3, score: 78 },
]

const severityData = [
  { name: "Critical", value: 8, color: "#ef4444" },
  { name: "High", value: 15, color: "#f97316" },
  { name: "Medium", value: 24, color: "#eab308" },
  { name: "Low", value: 31, color: "#3b82f6" },
]

const categoryData = [
  { category: "SQL Injection", count: 12 },
  { category: "XSS", count: 8 },
  { category: "Secrets", count: 15 },
  { category: "Auth Issues", count: 6 },
  { category: "Dependencies", count: 22 },
  { category: "Config", count: 4 },
]

const recentActivity = [
  { type: "scan", message: "Repository scan completed", time: "2 min ago", severity: "info" },
  { type: "alert", message: "Critical: SQL injection in api/users.ts", time: "15 min ago", severity: "critical" },
  { type: "fix", message: "Resolved: Exposed API key removed", time: "1 hour ago", severity: "success" },
  { type: "alert", message: "High: Outdated dependency detected", time: "2 hours ago", severity: "high" },
  { type: "scan", message: "PR #142 security review passed", time: "3 hours ago", severity: "success" },
]

const StatCard = ({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: {
  title: string
  value: string | number
  change: string
  trend: "up" | "down"
  icon: React.ElementType
  color: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card rounded-xl p-6"
  >
    <div className="flex items-start justify-between mb-4">
      <div className={`p-2 rounded-lg bg-${color}/10`}>
        <Icon className={`h-5 w-5 text-${color}`} />
      </div>
      <div className={`flex items-center gap-1 text-sm ${
        trend === "up" ? "text-green-500" : "text-red-500"
      }`}>
        {trend === "up" ? (
          <ArrowUpRight className="h-4 w-4" />
        ) : (
          <ArrowDownRight className="h-4 w-4" />
        )}
        {change}
      </div>
    </div>
    <div className="text-3xl font-bold text-foreground mb-1">{value}</div>
    <div className="text-sm text-muted-foreground">{title}</div>
  </motion.div>
)

export default function SecurityDashboardPage() {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev >= securityScore) {
          clearInterval(timer)
          return securityScore
        }
        return prev + 1
      })
    }, 20)
    return () => clearInterval(timer)
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-400"
    if (score >= 60) return "from-yellow-500 to-yellow-400"
    return "from-red-500 to-red-400"
  }

  return (
    <main className="min-h-screen bg-background relative">
      <CyberBackground />
      <Navbar />

      {/* Header */}
      <section className="relative pt-32 pb-8 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Activity className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Security Dashboard</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Security <span className="text-primary glow-text-blue">Overview</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Monitor your security posture with real-time analytics and vulnerability trends.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="px-4 pb-12">
        <div className="container mx-auto max-w-7xl">
          {/* Top Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Vulnerabilities"
              value={78}
              change="12%"
              trend="down"
              icon={Bug}
              color="destructive"
            />
            <StatCard
              title="Exposed Secrets"
              value={3}
              change="50%"
              trend="down"
              icon={Key}
              color="yellow-500"
            />
            <StatCard
              title="Repos Scanned"
              value={24}
              change="8%"
              trend="up"
              icon={Shield}
              color="primary"
            />
            <StatCard
              title="Issues Resolved"
              value={156}
              change="23%"
              trend="up"
              icon={CheckCircle}
              color="secondary"
            />
          </div>

          {/* Security Score + Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Security Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Security Score</h3>
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48 mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted/20"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="url(#scoreGradient)"
                      strokeWidth="12"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${(animatedScore / 100) * 553} 553`}
                    />
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={securityScore >= 80 ? "#22c55e" : securityScore >= 60 ? "#eab308" : "#ef4444"} />
                        <stop offset="100%" stopColor={securityScore >= 80 ? "#4ade80" : securityScore >= 60 ? "#facc15" : "#f87171"} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold ${getScoreColor(animatedScore)}`}>
                      {animatedScore}
                    </span>
                    <span className="text-muted-foreground text-sm">/ 100</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className={`font-semibold ${getScoreColor(securityScore)}`}>
                    {securityScore >= 80 ? "Excellent" : securityScore >= 60 ? "Good" : "Needs Attention"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    +6 points from last month
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6 lg:col-span-2"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Security Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorVuln" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1f2e",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="vulnerabilities"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorVuln)"
                    name="Vulnerabilities"
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    name="Score"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Bottom Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Severity Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Severity Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {severityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1f2e",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                {severityData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Vulnerability Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-xl p-6 lg:col-span-2"
            >
              <h3 className="text-lg font-semibold text-foreground mb-6">Vulnerability Categories</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={categoryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" stroke="#666" />
                  <YAxis dataKey="category" type="category" stroke="#666" width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1a1f2e",
                      border: "1px solid #333",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    activity.severity === "critical"
                      ? "bg-red-500/10 text-red-500"
                      : activity.severity === "high"
                      ? "bg-orange-500/10 text-orange-500"
                      : activity.severity === "success"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-primary/10 text-primary"
                  }`}>
                    {activity.type === "scan" ? (
                      <Shield className="h-4 w-4" />
                    ) : activity.type === "alert" ? (
                      <AlertTriangle className="h-4 w-4" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground text-sm">{activity.message}</p>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
