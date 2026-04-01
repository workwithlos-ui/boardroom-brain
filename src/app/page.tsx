"use client";

import Link from "next/link";
import {
  Brain,
  Mic,
  BarChart3,
  Target,
  Zap,
  Shield,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Users,
  Phone,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-navy">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold to-gold-300 flex items-center justify-center">
              <Brain className="w-6 h-6 text-navy" />
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight">
                Boardroom Brain
              </span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-400">
                by Kent Clothier
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-gold transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-gold transition-colors">
              How It Works
            </a>
            <a href="#metrics" className="text-sm text-gray-400 hover:text-gold transition-colors">
              Results
            </a>
            <Link
              href="/dashboard"
              className="text-sm text-gray-400 hover:text-gold transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="px-5 py-2.5 bg-gradient-to-r from-gold to-gold-400 text-navy font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,149,42,0.08)_0%,_transparent_60%)]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gold/3 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-8">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
              <span className="text-sm text-gold-300">
                AI-Powered Sales Intelligence
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              Turn Every Sales Call Into a{" "}
              <span className="gradient-text">Closed Deal</span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Boardroom Brain analyzes your sales calls in real-time, delivers
              AI coaching insights, and transforms your team into elite closers.
              Built on Kent Clothier&apos;s proven sales methodology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="group px-8 py-4 bg-gradient-to-r from-gold to-gold-400 text-navy font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all flex items-center gap-2"
              >
                Start Closing More Deals
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 border border-gold/30 text-gold font-semibold text-lg rounded-xl hover:bg-gold/5 transition-all flex items-center gap-2">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats bar */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "10,000+", label: "Calls Analyzed", icon: Phone },
                { value: "34%", label: "Close Rate Increase", icon: TrendingUp },
                { value: "500+", label: "Sales Reps Coached", icon: Users },
                { value: "4.9/5", label: "User Rating", icon: Star },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-xl p-5 gold-glow">
                  <stat.icon className="w-5 h-5 text-gold mb-2 mx-auto" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Your AI Sales Command Center
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to analyze, coach, and dominate your sales pipeline.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Mic,
                title: "Call Transcript Analysis",
                description:
                  "Upload any sales call and get instant AI analysis with scoring, key moments, and actionable coaching tips.",
              },
              {
                icon: Brain,
                title: "AI Sales Coach",
                description:
                  "Chat with an AI trained on Kent Clothier's proven methodology. Get real-time coaching and objection handling.",
              },
              {
                icon: BarChart3,
                title: "Performance Dashboard",
                description:
                  "Track rep performance, call scores, win rates, and identify coaching opportunities at a glance.",
              },
              {
                icon: Target,
                title: "Deal Intelligence",
                description:
                  "AI-powered deal scoring and pipeline analysis. Know which deals need attention before it's too late.",
              },
              {
                icon: Zap,
                title: "Instant Insights",
                description:
                  "Get key takeaways, sentiment analysis, and competitive intelligence from every conversation.",
              },
              {
                icon: Shield,
                title: "Training Library",
                description:
                  "Centralized playbooks, scripts, and frameworks. Your team's sales knowledge base, powered by AI.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-6 rounded-2xl border border-white/5 bg-navy-50/50 hover:border-gold/20 hover:bg-navy-600/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(201,149,42,0.05)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-sm font-semibold uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
              Three Steps to Sales Mastery
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload & Analyze",
                description:
                  "Upload call recordings or transcripts. Our AI instantly analyzes every word, tone, and technique used.",
              },
              {
                step: "02",
                title: "Get AI Coaching",
                description:
                  "Receive personalized coaching insights based on Kent Clothier's methodology. Know exactly what to improve.",
              },
              {
                step: "03",
                title: "Close More Deals",
                description:
                  "Apply the insights, track your progress, and watch your close rates soar. Data-driven sales mastery.",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-bold text-gold/10 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-12 pl-4">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="metrics" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass rounded-3xl p-12 gold-glow">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                The Numbers Don&apos;t Lie
              </h2>
              <p className="text-gray-400 text-lg">
                Real results from real sales teams using Boardroom Brain.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: "34%", label: "Average Close Rate Increase" },
                { value: "2.5x", label: "Faster Rep Onboarding" },
                { value: "47%", label: "More Qualified Pipeline" },
                { value: "$2.1M", label: "Average Revenue Lift" },
              ].map((metric, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {metric.value}
                  </div>
                  <div className="text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Sales Team?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Join hundreds of sales organizations already using Boardroom Brain
            to close more deals and build elite teams.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-gold to-gold-400 text-navy font-bold text-lg rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-300 flex items-center justify-center">
                <Brain className="w-4 h-4 text-navy" />
              </div>
              <span className="text-sm text-gray-500">
                Boardroom Brain &copy; 2026. Built for Kent Clothier.
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
              <a href="#" className="hover:text-gold transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
