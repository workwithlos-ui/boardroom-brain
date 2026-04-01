"use client";

import Link from "next/link";
import {
  Phone,
  TrendingUp,
  Target,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Star,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronRight,
  Zap,
} from "lucide-react";
import { demoTranscripts } from "@/lib/store";

const metrics = [
  {
    label: "Total Calls",
    value: "247",
    change: "+12%",
    trend: "up",
    icon: Phone,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    label: "Avg Call Score",
    value: "76.4",
    change: "+5.2",
    trend: "up",
    icon: Star,
    color: "text-gold",
    bg: "bg-gold/10",
  },
  {
    label: "Win Rate",
    value: "42%",
    change: "+8%",
    trend: "up",
    icon: Target,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    label: "Active Reps",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
];

const coachingInsights = [
  {
    type: "critical",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-400/20",
    message: "James Wright needs immediate coaching on discovery techniques. Last 3 calls scored below 50.",
    action: "Review Calls",
  },
  {
    type: "improvement",
    icon: TrendingUp,
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
    message: "Lisa Park's objection handling improved 23% this week. Recommend advanced negotiation training.",
    action: "View Progress",
  },
  {
    type: "strength",
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    message: "Marcus Johnson is your top performer. His discovery framework usage is 94% consistent.",
    action: "Share Insights",
  },
];

const outcomeColors = {
  won: "text-emerald-400 bg-emerald-400/10",
  lost: "text-red-400 bg-red-400/10",
  pending: "text-yellow-400 bg-yellow-400/10",
  "follow-up": "text-blue-400 bg-blue-400/10",
};

const outcomeIcons = {
  won: CheckCircle,
  lost: XCircle,
  pending: Clock,
  "follow-up": MessageSquare,
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">
            Welcome back, Kent. Here&apos;s your sales intelligence overview.
          </p>
        </div>
        <Link
          href="/dashboard/chat"
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-gold to-gold-400 text-navy font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all"
        >
          <Zap className="w-4 h-4" />
          Ask AI Coach
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border border-white/5 bg-navy-50/50 hover:border-gold/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-xl ${metric.bg}`}>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === "up" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {metric.trend === "up" ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metric.value}</div>
            <div className="text-sm text-gray-500 mt-1">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Calls */}
        <div className="lg:col-span-2 rounded-2xl border border-white/5 bg-navy-50/50">
          <div className="p-5 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Recent Calls</h2>
            <Link
              href="/dashboard/calls"
              className="text-sm text-gold hover:text-gold-300 flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {demoTranscripts.map((call) => {
              const OutcomeIcon = outcomeIcons[call.outcome];
              return (
                <div
                  key={call.id}
                  className="p-5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-sm font-semibold text-white truncate">
                          {call.title}
                        </h3>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            outcomeColors[call.outcome]
                          }`}
                        >
                          <OutcomeIcon className="w-3 h-3" />
                          {call.outcome}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {call.rep} &bull; {call.prospect} &bull; {call.duration}
                      </p>
                      <p className="text-sm text-gray-400 mt-2 line-clamp-1">
                        {call.summary}
                      </p>
                    </div>
                    <div className="ml-4 flex flex-col items-end">
                      <div
                        className={`text-2xl font-bold ${
                          call.score >= 80
                            ? "text-emerald-400"
                            : call.score >= 60
                            ? "text-gold"
                            : "text-red-400"
                        }`}
                      >
                        {call.score}
                      </div>
                      <div className="text-xs text-gray-500">score</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coaching Insights */}
        <div className="rounded-2xl border border-white/5 bg-navy-50/50">
          <div className="p-5 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white">
              AI Coaching Insights
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Real-time recommendations from your AI coach
            </p>
          </div>
          <div className="p-4 space-y-3">
            {coachingInsights.map((insight, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border ${insight.border} ${insight.bg}`}
              >
                <div className="flex items-start gap-3">
                  <insight.icon className={`w-5 h-5 mt-0.5 ${insight.color}`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {insight.message}
                    </p>
                    <button className={`text-xs font-medium mt-2 ${insight.color} hover:underline`}>
                      {insight.action} &rarr;
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="p-4 border-t border-white/5">
            <h3 className="text-sm font-semibold text-white mb-3">
              This Week
            </h3>
            <div className="space-y-3">
              {[
                { label: "Calls Analyzed", value: "34", color: "bg-blue-400" },
                { label: "Coaching Sessions", value: "12", color: "bg-gold" },
                { label: "Deals Won", value: "8", color: "bg-emerald-400" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rep Performance */}
      <div className="rounded-2xl border border-white/5 bg-navy-50/50">
        <div className="p-5 border-b border-white/5">
          <h2 className="text-lg font-semibold text-white">
            Rep Performance Leaderboard
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 uppercase tracking-wider">
                <th className="text-left p-4 font-medium">Rep</th>
                <th className="text-left p-4 font-medium">Calls</th>
                <th className="text-left p-4 font-medium">Avg Score</th>
                <th className="text-left p-4 font-medium">Win Rate</th>
                <th className="text-left p-4 font-medium">Trend</th>
                <th className="text-left p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                {
                  name: "Marcus Johnson",
                  calls: 89,
                  score: 90,
                  winRate: "58%",
                  trend: "up",
                  status: "Top Performer",
                },
                {
                  name: "Lisa Park",
                  calls: 76,
                  score: 75,
                  winRate: "42%",
                  trend: "up",
                  status: "Improving",
                },
                {
                  name: "James Wright",
                  calls: 52,
                  score: 48,
                  winRate: "24%",
                  trend: "down",
                  status: "Needs Coaching",
                },
                {
                  name: "Sarah Kim",
                  calls: 30,
                  score: 82,
                  winRate: "51%",
                  trend: "up",
                  status: "Strong",
                },
              ].map((rep, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-gold text-xs font-bold">
                        {rep.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-sm font-medium text-white">
                        {rep.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{rep.calls}</td>
                  <td className="p-4">
                    <span
                      className={`text-sm font-semibold ${
                        rep.score >= 80
                          ? "text-emerald-400"
                          : rep.score >= 60
                          ? "text-gold"
                          : "text-red-400"
                      }`}
                    >
                      {rep.score}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-gray-400">{rep.winRate}</td>
                  <td className="p-4">
                    {rep.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        rep.status === "Top Performer"
                          ? "text-emerald-400 bg-emerald-400/10"
                          : rep.status === "Improving" || rep.status === "Strong"
                          ? "text-gold bg-gold/10"
                          : "text-red-400 bg-red-400/10"
                      }`}
                    >
                      {rep.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
