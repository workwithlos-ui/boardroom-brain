"use client";

import { useState } from "react";
import {
  Phone,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Star,
  User,
  Calendar,
  Tag,
} from "lucide-react";
import { demoTranscripts } from "@/lib/store";

const outcomeColors = {
  won: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  lost: "text-red-400 bg-red-400/10 border-red-400/20",
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "follow-up": "text-blue-400 bg-blue-400/10 border-blue-400/20",
};

const outcomeIcons = {
  won: CheckCircle,
  lost: XCircle,
  pending: Clock,
  "follow-up": MessageSquare,
};

export default function CallsPage() {
  const [search, setSearch] = useState("");
  const [filterOutcome, setFilterOutcome] = useState<string>("all");
  const [expandedCall, setExpandedCall] = useState<string | null>(null);

  const filteredCalls = demoTranscripts.filter((call) => {
    const matchesSearch =
      call.title.toLowerCase().includes(search.toLowerCase()) ||
      call.rep.toLowerCase().includes(search.toLowerCase()) ||
      call.prospect.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filterOutcome === "all" || call.outcome === filterOutcome;
    return matchesSearch && matchesFilter;
  });

  const toggleExpand = (id: string) => {
    setExpandedCall(expandedCall === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
            <Phone className="w-6 h-6 text-gold" />
          </div>
          Call Library
        </h1>
        <p className="text-gray-400 mt-1 ml-[52px]">
          Browse, search, and analyze all recorded sales calls
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search calls by title, rep, or prospect..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-navy-50/50 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 outline-none focus:border-gold/30 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          {["all", "won", "lost", "pending", "follow-up"].map((outcome) => (
            <button
              key={outcome}
              onClick={() => setFilterOutcome(outcome)}
              className={`px-3 py-2 text-sm rounded-lg capitalize transition-all ${
                filterOutcome === outcome
                  ? "bg-gold/10 text-gold border border-gold/20"
                  : "text-gray-400 border border-white/5 hover:border-white/10"
              }`}
            >
              {outcome}
            </button>
          ))}
        </div>
      </div>

      {/* Calls List */}
      <div className="space-y-4">
        {filteredCalls.map((call) => {
          const OutcomeIcon = outcomeIcons[call.outcome];
          const isExpanded = expandedCall === call.id;

          return (
            <div
              key={call.id}
              className="rounded-2xl border border-white/5 bg-navy-50/50 overflow-hidden hover:border-gold/10 transition-colors"
            >
              {/* Call Header */}
              <button
                onClick={() => toggleExpand(call.id)}
                className="w-full p-5 flex items-center gap-4 text-left"
              >
                {/* Score */}
                <div
                  className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${
                    call.score >= 80
                      ? "bg-emerald-400/10 border border-emerald-400/20"
                      : call.score >= 60
                      ? "bg-gold/10 border border-gold/20"
                      : "bg-red-400/10 border border-red-400/20"
                  }`}
                >
                  <span
                    className={`text-xl font-bold ${
                      call.score >= 80
                        ? "text-emerald-400"
                        : call.score >= 60
                        ? "text-gold"
                        : "text-red-400"
                    }`}
                  >
                    {call.score}
                  </span>
                  <span className="text-[10px] text-gray-500">score</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-base font-semibold text-white truncate">
                      {call.title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        outcomeColors[call.outcome]
                      }`}
                    >
                      <OutcomeIcon className="w-3 h-3" />
                      {call.outcome}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {call.rep}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {call.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {call.duration}
                    </span>
                  </div>
                </div>

                {/* Expand */}
                <div className="flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="border-t border-white/5 p-5 space-y-5">
                  {/* Prospect Info */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Prospect
                    </h4>
                    <p className="text-sm text-gray-300">{call.prospect}</p>
                  </div>

                  {/* Summary */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                      AI Summary
                    </h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {call.summary}
                    </p>
                  </div>

                  {/* Key Moments */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Key Moments
                    </h4>
                    <div className="space-y-2">
                      {call.keyMoments.map((moment, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-sm"
                        >
                          <Star className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{moment}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {call.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-gold bg-gold/10 border border-gold/20"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Transcript Preview */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                      Transcript Preview
                    </h4>
                    <div className="bg-navy-300/50 rounded-xl p-4 text-sm text-gray-400 whitespace-pre-line leading-relaxed font-mono">
                      {call.transcript}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredCalls.length === 0 && (
          <div className="text-center py-16">
            <Phone className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No calls match your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
