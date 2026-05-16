import React, { useState } from "react";
import {
  Briefcase,
  Building,
  Calendar,
  Plus,
  Trash2,
  Sparkles,
  Loader,
  CheckCircle2,
} from "lucide-react";
import { resumeService } from "../../services/api";

const ExperienceStep = ({ experience, onChange, onAdd, onRemove }) => {
  const [optimizingIndex, setOptimizingIndex] = useState(null);

  const handleOptimize = async (index, rawText) => {
    if (!rawText || rawText.length < 10) {
      alert("Please provide a bit more detail for the AI to work with.");
      return;
    }

    setOptimizingIndex(index);
    try {
      const optimizedText = await resumeService.optimizeText(rawText);
      onChange(index, "ai_optimized_description", optimizedText);
    } catch (error) {
      console.error(error);
      alert("AI optimization failed. Ensure your Django server is running.");
    } finally {
      setOptimizingIndex(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Experience & Core Projects
        </h2>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed">
          Never had a formal job? No problem. When applying for attachments,
          your code is your experience. Add your biggest coursework projects,
          freelance gigs, or hackathons here.
        </p>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
          <Briefcase className="mx-auto h-10 w-10 text-slate-400 mb-3" />
          <p className="text-sm text-slate-500 mb-1">
            No experience added yet.
          </p>
          <p className="text-xs text-slate-400 mb-4 font-medium italic">
            (Yes, that major group project counts!)
          </p>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium"
          >
            <Plus size={16} />
            Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm relative group"
            >
              <button
                onClick={() => onRemove(index)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Remove this entry"
              >
                <Trash2 size={18} />
              </button>

              <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">
                Role / Project #{index + 1}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company / Context */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Organization or Context
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building size={18} />
                    </div>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) =>
                        onChange(index, "company", e.target.value)
                      }
                      placeholder="e.g., University Coursework, Freelance, Personal"
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800"
                    />
                  </div>
                </div>

                {/* Job Title / Role */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Your Role
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Briefcase size={18} />
                    </div>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => onChange(index, "role", e.target.value)}
                      placeholder="e.g., Lead Developer, Backend Engineer"
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800"
                    />
                  </div>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Start Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Calendar size={18} />
                    </div>
                    <input
                      type="date"
                      value={exp.start_date}
                      onChange={(e) =>
                        onChange(index, "start_date", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800"
                    />
                  </div>
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    End Date (Leave blank if ongoing)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Calendar size={18} />
                    </div>
                    <input
                      type="date"
                      value={exp.end_date}
                      onChange={(e) =>
                        onChange(index, "end_date", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800"
                    />
                  </div>
                </div>

                {/* The Magic Area: Raw Description */}
                <div className="md:col-span-2 mt-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    What did you build? (Explain it casually)
                  </label>
                  <textarea
                    value={exp.raw_description}
                    onChange={(e) =>
                      onChange(index, "raw_description", e.target.value)
                    }
                    rows={3}
                    placeholder="e.g., I built the backend for our 2nd-year group project using Django. We had to handle user authentication and link it to a React frontend."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 resize-none text-sm"
                  />

                  <button
                    onClick={() => handleOptimize(index, exp.raw_description)}
                    disabled={optimizingIndex === index || !exp.raw_description}
                    className="mt-3 flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {optimizingIndex === index ? (
                      <>
                        <Loader className="animate-spin" size={18} />
                        Transforming into ATS Bullets...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Rewrite Professionally with AI
                      </>
                    )}
                  </button>
                </div>

                {/* The Output Container */}
                {exp.ai_optimized_description && (
                  <div className="md:col-span-2 mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg animate-fade-in">
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-2 uppercase tracking-wide">
                      <CheckCircle2 size={16} />
                      ATS-Optimized Result
                    </div>
                    <ul className="space-y-2 pl-2">
                      {exp.ai_optimized_description
                        .split("\n")
                        .map((bullet, i) => {
                          if (!bullet.trim()) return null;
                          return (
                            <li
                              key={i}
                              className="text-emerald-900 text-sm leading-relaxed flex items-start gap-2"
                            >
                              <span className="text-emerald-500 mt-1">•</span>
                              <span>{bullet.replace("-", "").trim()}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={onAdd}
            className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors px-2 py-1"
          >
            <Plus size={16} />
            Add Another Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceStep;
