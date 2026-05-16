import React from "react";
import {
  LayoutTemplate,
  FileText,
  AlignLeft,
  LayoutPanelLeft,
} from "lucide-react";

const TemplateStep = ({ formData, onChange }) => {
  const templates = [
    {
      id: "classic",
      name: "The ATS Classic",
      description:
        "Single-column, highly readable. The gold standard for automated resume parsers.",
      icon: <AlignLeft size={24} />,
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      id: "meridian",
      name: "Meridian",
      description:
        "Modern two-column layout with a dark sidebar. Great for handing to a human.",
      icon: <LayoutPanelLeft size={24} />,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
    {
      id: "monolith",
      name: "Monolith",
      description:
        "Brutalist, high-impact single column with striking red accents.",
      icon: <LayoutTemplate size={24} />,
      color: "bg-red-50 text-red-600 border-red-200",
    },
    {
      id: "vivant",
      name: "Vivant",
      description:
        "Elegant serif typography with warm tones. Perfect for executive or creative roles.",
      icon: <FileText size={24} />,
      color: "bg-orange-50 text-orange-600 border-orange-200",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Choose Your Canvas
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Select a layout. You can always change this later before generating
          your final PDF.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {templates.map((tpl) => {
          const isSelected = formData.template_choice === tpl.id;
          return (
            <div
              key={tpl.id}
              onClick={() =>
                onChange({ target: { name: "template_choice", value: tpl.id } })
              }
              className={`relative cursor-pointer p-5 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50/50 shadow-md transform scale-[1.02]"
                  : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-lg ${isSelected ? "bg-indigo-600 text-white" : tpl.color}`}
                >
                  {tpl.icon}
                </div>
                <div>
                  <h3
                    className={`font-bold ${isSelected ? "text-indigo-900" : "text-slate-800"}`}
                  >
                    {tpl.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {tpl.description}
                  </p>
                </div>
              </div>

              {/* Active Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateStep;
