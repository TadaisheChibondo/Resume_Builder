import React from "react";
import { Wrench, Plus, Trash2, CheckCircle2 } from "lucide-react";

const SkillsStep = ({ skills, onChange, onAdd, onRemove }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Core Skills
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          List your technical languages, frameworks, and tools. Keep it relevant
          to the role you want.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <div className="flex flex-wrap gap-3 mb-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-800 px-3 py-1.5 rounded-full text-sm font-medium animate-fade-in"
            >
              <CheckCircle2 size={14} className="text-indigo-500" />
              <input
                type="text"
                value={skill.name}
                onChange={(e) => onChange(index, "name", e.target.value)}
                placeholder="e.g., Python"
                className="bg-transparent border-none outline-none focus:ring-0 p-0 w-24 text-indigo-800 placeholder-indigo-300"
                autoFocus={skill.name === ""}
              />
              <button
                onClick={() => onRemove(index)}
                className="text-indigo-400 hover:text-red-500 transition-colors ml-1"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium"
        >
          <Plus size={16} /> Add a Skill
        </button>
      </div>
    </div>
  );
};

export default SkillsStep;
