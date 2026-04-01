"use client";

import { useState } from "react";
import {
  BookOpen,
  FileText,
  Layers,
  ScrollText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { demoTrainingMaterials } from "@/lib/store";

const typeConfig = {
  framework: {
    icon: Layers,
    color: "text-gold",
    bg: "bg-gold/10",
    border: "border-gold/20",
    label: "Framework",
  },
  "objection-handler": {
    icon: FileText,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20",
    label: "Objection Handler",
  },
  playbook: {
    icon: BookOpen,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20",
    label: "Playbook",
  },
  script: {
    icon: ScrollText,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20",
    label: "Script",
  },
};

export default function TrainingPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-gold" />
          </div>
          Training Library
        </h1>
        <p className="text-gray-400 mt-1 ml-[52px]">
          Kent Clothier&apos;s proven sales frameworks, playbooks, and scripts
        </p>
      </div>

      {/* Materials */}
      <div className="space-y-4">
        {demoTrainingMaterials.map((material) => {
          const config = typeConfig[material.type];
          const Icon = config.icon;
          const isExpanded = expandedId === material.id;

          return (
            <div
              key={material.id}
              className={`rounded-2xl border bg-navy-50/50 overflow-hidden transition-colors ${
                isExpanded ? `${config.border}` : "border-white/5 hover:border-white/10"
              }`}
            >
              <button
                onClick={() =>
                  setExpandedId(isExpanded ? null : material.id)
                }
                className="w-full p-5 flex items-center gap-4 text-left"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.bg}`}
                >
                  <Icon className={`w-6 h-6 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white">
                    {material.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}
                    >
                      {config.label}
                    </span>
                    <span className="text-xs text-gray-500">
                      Added {material.dateAdded}
                    </span>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {isExpanded && (
                <div className="border-t border-white/5 p-5">
                  <div className="bg-navy-300/50 rounded-xl p-5 text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                    {material.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
