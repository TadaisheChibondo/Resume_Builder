import React, { useState } from "react";
import {
  Code,
  Layers,
  Link as LinkIcon,
  Plus,
  Trash2,
  FileText,
  Sparkles,
  Loader,
  CheckCircle2,
  Award,
} from "lucide-react";
import { resumeService } from "../../services/api";

const ProjectsStep = ({
  projects,
  formData,
  onChange,
  onArrayChange,
  onAdd,
  onRemove,
}) => {
  const [optimizingIndex, setOptimizingIndex] = useState(null);

  const handleOptimize = async (index, rawText) => {
    if (!rawText || rawText.length < 10) {
      alert("Please provide a bit more detail for the AI to work with.");
      return;
    }

    setOptimizingIndex(index);
    try {
      const optimizedText = await resumeService.optimizeText(rawText);
      onArrayChange(index, "ai_optimized_description", optimizedText);
    } catch (error) {
      console.error(error);
      alert("AI optimization failed. Ensure your Django server is running.");
    } finally {
      setOptimizingIndex(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* --- PROJECTS SECTION --- */}
      <div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Technical Projects
          </h2>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
            Show off your side quests. Describe what you built, and let the AI
            make it sound like a senior engineer wrote it.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-8 mt-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
            <Code className="mx-auto h-10 w-10 text-slate-400 mb-3" />
            <p className="text-sm text-slate-500 mb-4">
              No projects added yet.
            </p>
            <button
              onClick={onAdd}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium"
            >
              <Plus size={16} />
              Add a Project
            </button>
          </div>
        ) : (
          <div className="space-y-8 mt-6">
            {projects.map((proj, index) => (
              <div
                key={index}
                className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm relative group"
              >
                <button
                  onClick={() => onRemove(index)}
                  className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 size={18} />
                </button>

                <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">
                  Project #{index + 1}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name & Tech Stack */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Project Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Layers size={18} />
                      </div>
                      <input
                        type="text"
                        value={proj.name}
                        onChange={(e) =>
                          onArrayChange(index, "name", e.target.value)
                        }
                        placeholder="e.g., CampusAcc"
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Tech Stack
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Code size={18} />
                      </div>
                      <input
                        type="text"
                        value={proj.tech_stack}
                        onChange={(e) =>
                          onArrayChange(index, "tech_stack", e.target.value)
                        }
                        placeholder="e.g., React, Django"
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Link (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <LinkIcon size={18} />
                      </div>
                      <input
                        type="url"
                        value={proj.link}
                        onChange={(e) =>
                          onArrayChange(index, "link", e.target.value)
                        }
                        placeholder="https://github.com/..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-800"
                      />
                    </div>
                  </div>

                  {/* AI Description Area */}
                  <div className="md:col-span-2 mt-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      What does it do?
                    </label>
                    <textarea
                      value={proj.description}
                      onChange={(e) =>
                        onArrayChange(index, "description", e.target.value)
                      }
                      rows={3}
                      placeholder="e.g., A full-stack marketplace. I used JWT for auth and deployed it on Render."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-800 resize-none text-sm"
                    />

                    <button
                      onClick={() => handleOptimize(index, proj.description)}
                      disabled={optimizingIndex === index || !proj.description}
                      className="mt-3 flex items-center justify-center w-full gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-lg hover:from-indigo-700 hover:to-violet-700 transition-all shadow-md font-medium disabled:opacity-50"
                    >
                      {optimizingIndex === index ? (
                        <>
                          <Loader className="animate-spin" size={18} />{" "}
                          Optimizing Code Context...
                        </>
                      ) : (
                        <>
                          <Sparkles size={18} /> Rewrite Professionally with AI
                        </>
                      )}
                    </button>
                  </div>

                  {/* AI Output Box */}
                  {proj.ai_optimized_description && (
                    <div className="md:col-span-2 mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg animate-fade-in">
                      <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-2 uppercase tracking-wide">
                        <CheckCircle2 size={16} /> ATS-Optimized Result
                      </div>
                      <ul className="space-y-2 pl-2">
                        {proj.ai_optimized_description
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
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 px-2 py-1"
            >
              <Plus size={16} /> Add Another Project
            </button>
          </div>
        )}
      </div>

      <hr className="border-slate-200" />

      {/* --- EXTRAS / REFERENCES SECTION --- */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Award className="text-indigo-600" size={24} />
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Awards & References (Optional)
          </h2>
        </div>
        <div className="relative">
          <textarea
            name="references_and_awards"
            value={formData.references_and_awards || ""}
            onChange={onChange}
            rows={4}
            placeholder="e.g., References available upon request. OR 1st Place at the 2025 University Hackathon."
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 text-slate-800 resize-none text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsStep;
