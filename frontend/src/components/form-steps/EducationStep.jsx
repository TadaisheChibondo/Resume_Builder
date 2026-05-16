import React from "react";
import { GraduationCap, Building, Calendar, Plus, Trash2 } from "lucide-react";

const EducationStep = ({ education, onChange, onAdd, onRemove }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Education & Certifications
          </h2>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
            Add your university degrees, high school details, or professional
            certifications here.
          </p>
        </div>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl">
          <GraduationCap className="mx-auto h-10 w-10 text-slate-400 mb-3" />
          <p className="text-sm text-slate-500 mb-4">
            No education history added yet.
          </p>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors shadow-sm text-sm font-medium"
          >
            <Plus size={16} />
            Add Education or Certificate
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm relative group"
            >
              {/* Delete Button - Appears on hover for desktop, always visible on mobile */}
              <button
                onClick={() => onRemove(index)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                title="Remove this entry"
              >
                <Trash2 size={18} />
              </button>

              <h3 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wider">
                Institution #{index + 1}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Institution Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Institution / Issuer
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Building size={18} />
                    </div>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        onChange(index, "institution", e.target.value)
                      }
                      placeholder="e.g., NUST or Coursera"
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800"
                    />
                  </div>
                </div>

                {/* Degree / Program */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Degree / Certificate Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <GraduationCap size={18} />
                    </div>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        onChange(index, "degree", e.target.value)
                      }
                      placeholder="e.g., B.Sc. Computer Science or AWS Certified"
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800"
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
                      value={edu.start_date}
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
                    End Date (Leave blank if present)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Calendar size={18} />
                    </div>
                    <input
                      type="date"
                      value={edu.end_date}
                      onChange={(e) =>
                        onChange(index, "end_date", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={onAdd}
            className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors px-2 py-1"
          >
            <Plus size={16} />
            Add Education or Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default EducationStep;
