"use client";

import { useState } from "react";
import {
  Upload,
  FileText,
  Trash2,
  Plus,
  BookOpen,
  Phone,
  Settings,
  Save,
  X,
  Check,
  AlertCircle,
  File,
  Clock,
} from "lucide-react";

interface UploadedContent {
  id: string;
  name: string;
  type: "transcript" | "training" | "playbook" | "script";
  size: string;
  date: string;
  status: "processed" | "processing" | "error";
}

const initialContent: UploadedContent[] = [
  {
    id: "1",
    name: "Enterprise Deal - Acme Corp.txt",
    type: "transcript",
    size: "12 KB",
    date: "Mar 25, 2026",
    status: "processed",
  },
  {
    id: "2",
    name: "Mid-Market Pitch - TechFlow.txt",
    type: "transcript",
    size: "8 KB",
    date: "Mar 24, 2026",
    status: "processed",
  },
  {
    id: "3",
    name: "Kent Clothier Discovery Framework.md",
    type: "training",
    size: "4 KB",
    date: "Mar 01, 2026",
    status: "processed",
  },
  {
    id: "4",
    name: "Objection Handling Playbook.md",
    type: "playbook",
    size: "6 KB",
    date: "Mar 05, 2026",
    status: "processed",
  },
  {
    id: "5",
    name: "Cold Call Opening Scripts.md",
    type: "script",
    size: "3 KB",
    date: "Mar 10, 2026",
    status: "processed",
  },
];

const typeColors = {
  transcript: "text-blue-400 bg-blue-400/10",
  training: "text-gold bg-gold/10",
  playbook: "text-emerald-400 bg-emerald-400/10",
  script: "text-purple-400 bg-purple-400/10",
};

const typeIcons = {
  transcript: Phone,
  training: BookOpen,
  playbook: FileText,
  script: File,
};

const statusColors = {
  processed: "text-emerald-400",
  processing: "text-gold",
  error: "text-red-400",
};

const statusIcons = {
  processed: Check,
  processing: Clock,
  error: AlertCircle,
};

export default function AdminPage() {
  const [content, setContent] = useState<UploadedContent[]>(initialContent);
  const [showUpload, setShowUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: "",
    type: "transcript" as UploadedContent["type"],
    content: "",
  });
  const [showAddTraining, setShowAddTraining] = useState(false);
  const [trainingForm, setTrainingForm] = useState({
    title: "",
    type: "framework" as "playbook" | "script" | "framework",
    content: "",
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: globalThis.File) => {
    const newContent: UploadedContent = {
      id: Date.now().toString(),
      name: file.name,
      type: "transcript",
      size: `${(file.size / 1024).toFixed(1)} KB`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "processing",
    };
    setContent([newContent, ...content]);

    // Simulate processing
    setTimeout(() => {
      setContent((prev) =>
        prev.map((c) =>
          c.id === newContent.id ? { ...c, status: "processed" as const } : c
        )
      );
    }, 3000);
  };

  const handleManualUpload = () => {
    if (!uploadForm.name.trim() || !uploadForm.content.trim()) return;

    const newContent: UploadedContent = {
      id: Date.now().toString(),
      name: uploadForm.name,
      type: uploadForm.type,
      size: `${(uploadForm.content.length / 1024).toFixed(1)} KB`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "processing",
    };
    setContent([newContent, ...content]);
    setUploadForm({ name: "", type: "transcript", content: "" });
    setShowUpload(false);

    setTimeout(() => {
      setContent((prev) =>
        prev.map((c) =>
          c.id === newContent.id ? { ...c, status: "processed" as const } : c
        )
      );
    }, 2000);
  };

  const handleAddTraining = () => {
    if (!trainingForm.title.trim() || !trainingForm.content.trim()) return;

    const newContent: UploadedContent = {
      id: Date.now().toString(),
      name: `${trainingForm.title}.md`,
      type: "training",
      size: `${(trainingForm.content.length / 1024).toFixed(1)} KB`,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "processing",
    };
    setContent([newContent, ...content]);
    setTrainingForm({ title: "", type: "framework", content: "" });
    setShowAddTraining(false);

    setTimeout(() => {
      setContent((prev) =>
        prev.map((c) =>
          c.id === newContent.id ? { ...c, status: "processed" as const } : c
        )
      );
    }, 2000);
  };

  const deleteContent = (id: string) => {
    setContent(content.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Settings className="w-6 h-6 text-gold" />
            </div>
            Admin Panel
          </h1>
          <p className="text-gray-400 mt-1 ml-[52px]">
            Upload transcripts, manage training materials, and configure AI context
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Call Transcripts",
            count: content.filter((c) => c.type === "transcript").length,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
          },
          {
            label: "Training Materials",
            count: content.filter((c) => c.type === "training").length,
            color: "text-gold",
            bg: "bg-gold/10",
          },
          {
            label: "Playbooks",
            count: content.filter((c) => c.type === "playbook").length,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10",
          },
          {
            label: "Scripts",
            count: content.filter((c) => c.type === "script").length,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="p-4 rounded-xl border border-white/5 bg-navy-50/50"
          >
            <div className={`text-3xl font-bold ${stat.color}`}>
              {stat.count}
            </div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Upload Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Drag & Drop Upload */}
        <div className="rounded-2xl border border-white/5 bg-navy-50/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-gold" />
            Upload Call Transcript
          </h2>
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
              dragActive
                ? "border-gold bg-gold/5"
                : "border-white/10 hover:border-gold/30"
            }`}
          >
            <Upload
              className={`w-10 h-10 mx-auto mb-3 ${
                dragActive ? "text-gold" : "text-gray-500"
              }`}
            />
            <p className="text-sm text-gray-400 mb-2">
              Drag & drop transcript files here, or
            </p>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold text-sm font-medium rounded-lg cursor-pointer hover:bg-gold/20 transition-colors">
              <Plus className="w-4 h-4" />
              Browse Files
              <input
                type="file"
                className="hidden"
                accept=".txt,.md,.csv,.json"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(file);
                }}
              />
            </label>
            <p className="text-xs text-gray-600 mt-3">
              Supports .txt, .md, .csv, .json files
            </p>
          </div>

          <button
            onClick={() => setShowUpload(!showUpload)}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-white/10 text-gray-400 text-sm rounded-lg hover:bg-white/5 hover:text-white transition-all"
          >
            <FileText className="w-4 h-4" />
            Paste Transcript Manually
          </button>

          {showUpload && (
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Transcript title..."
                value={uploadForm.name}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, name: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-navy-300/50 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 outline-none focus:border-gold/30"
              />
              <select
                value={uploadForm.type}
                onChange={(e) =>
                  setUploadForm({
                    ...uploadForm,
                    type: e.target.value as UploadedContent["type"],
                  })
                }
                className="w-full px-4 py-2.5 bg-navy-300/50 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-gold/30"
              >
                <option value="transcript">Call Transcript</option>
                <option value="training">Training Material</option>
                <option value="playbook">Playbook</option>
                <option value="script">Script</option>
              </select>
              <textarea
                placeholder="Paste transcript content here..."
                value={uploadForm.content}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, content: e.target.value })
                }
                className="w-full px-4 py-3 bg-navy-300/50 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 outline-none focus:border-gold/30 min-h-[120px] resize-y"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleManualUpload}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold to-gold-400 text-navy font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Upload
                </button>
                <button
                  onClick={() => setShowUpload(false)}
                  className="px-4 py-2.5 border border-white/10 text-gray-400 text-sm rounded-lg hover:bg-white/5 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Add Training Material */}
        <div className="rounded-2xl border border-white/5 bg-navy-50/50 p-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gold" />
            Add Training Material
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Add playbooks, scripts, frameworks, and other training content that
            the AI coach will use to provide better coaching advice.
          </p>

          {!showAddTraining ? (
            <button
              onClick={() => setShowAddTraining(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-white/10 rounded-xl text-gray-400 hover:border-gold/30 hover:text-gold transition-all"
            >
              <Plus className="w-5 h-5" />
              Add New Training Material
            </button>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Material title..."
                value={trainingForm.title}
                onChange={(e) =>
                  setTrainingForm({ ...trainingForm, title: e.target.value })
                }
                className="w-full px-4 py-2.5 bg-navy-300/50 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 outline-none focus:border-gold/30"
              />
              <select
                value={trainingForm.type}
                onChange={(e) =>
                  setTrainingForm({
                    ...trainingForm,
                    type: e.target.value as "playbook" | "script" | "framework",
                  })
                }
                className="w-full px-4 py-2.5 bg-navy-300/50 border border-white/10 rounded-lg text-white text-sm outline-none focus:border-gold/30"
              >
                <option value="framework">Framework</option>
                <option value="playbook">Playbook</option>
                <option value="script">Script</option>
              </select>
              <textarea
                placeholder="Enter training content, methodology, scripts, or frameworks..."
                value={trainingForm.content}
                onChange={(e) =>
                  setTrainingForm({ ...trainingForm, content: e.target.value })
                }
                className="w-full px-4 py-3 bg-navy-300/50 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 outline-none focus:border-gold/30 min-h-[160px] resize-y"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddTraining}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gold to-gold-400 text-navy font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Material
                </button>
                <button
                  onClick={() => setShowAddTraining(false)}
                  className="px-4 py-2.5 border border-white/10 text-gray-400 text-sm rounded-lg hover:bg-white/5 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Library */}
      <div className="rounded-2xl border border-white/5 bg-navy-50/50">
        <div className="p-5 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Content Library</h2>
          <span className="text-sm text-gray-500">
            {content.length} items
          </span>
        </div>
        <div className="divide-y divide-white/5">
          {content.map((item) => {
            const TypeIcon = typeIcons[item.type];
            const StatusIcon = statusIcons[item.status];
            return (
              <div
                key={item.id}
                className="p-4 flex items-center gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    typeColors[item.type]
                  }`}
                >
                  <TypeIcon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-3 mt-0.5">
                    <span className={`capitalize ${typeColors[item.type].split(" ")[0]}`}>
                      {item.type}
                    </span>
                    <span>{item.size}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-1.5 ${statusColors[item.status]}`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-xs capitalize">{item.status}</span>
                  </div>
                  <button
                    onClick={() => deleteContent(item.id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
