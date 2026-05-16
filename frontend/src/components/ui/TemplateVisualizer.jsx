import React from "react";

const TemplateVisualizer = ({ activeTemplate }) => {
  // A generic block to represent text in the wireframes
  const TextBlock = ({
    width = "w-full",
    height = "h-2",
    className = "bg-slate-200",
  }) => (
    <div
      className={`${width} ${height} ${className} rounded-sm opacity-60 mb-1.5`}
    ></div>
  );

  if (activeTemplate === "classic") {
    return (
      <div className="w-full h-full bg-white p-8 flex flex-col animate-fade-in shadow-inner">
        <div className="flex flex-col items-center mb-8 border-b-2 border-slate-800 pb-4">
          <div className="w-48 h-6 bg-slate-800 rounded-sm mb-3"></div>
          <div className="w-32 h-2 bg-slate-400 rounded-sm"></div>
        </div>
        {[1, 2, 3].map((section) => (
          <div key={section} className="mb-6">
            <div className="w-24 h-3 bg-slate-800 rounded-sm mb-3 uppercase tracking-widest"></div>
            <hr className="border-slate-200 mb-3" />
            <div className="flex justify-between mb-2">
              <TextBlock width="w-32" height="h-3" className="bg-slate-600" />
              <TextBlock width="w-16" height="h-2" className="bg-slate-400" />
            </div>
            <TextBlock width="w-full" />
            <TextBlock width="w-5/6" />
            <TextBlock width="w-4/5" />
          </div>
        ))}
      </div>
    );
  }

  if (activeTemplate === "meridian") {
    return (
      <div className="w-full h-full bg-white flex animate-fade-in shadow-inner">
        {/* Dark Sidebar */}
        <div className="w-1/3 h-full bg-[#1b2537] p-6 flex flex-col">
          <div className="w-full h-4 bg-white rounded-sm mb-2 opacity-90"></div>
          <div className="w-16 h-2 bg-[#c9a84c] rounded-sm mb-8 opacity-90"></div>
          <div className="w-12 h-2 bg-[#c9a84c] rounded-sm mb-4"></div>
          <TextBlock width="w-full" className="bg-slate-400" />
          <TextBlock width="w-4/5" className="bg-slate-400" />
          <TextBlock width="w-5/6" className="bg-slate-400 mb-8" />
        </div>
        {/* Main Content */}
        <div className="w-2/3 h-full p-8 flex flex-col">
          {[1, 2, 3].map((section) => (
            <div key={section} className="mb-6">
              <div className="w-24 h-3 bg-[#1b2537] rounded-sm mb-1"></div>
              <hr className="border-[#c9a84c] border-t-2 w-full mb-3 opacity-50" />
              <div className="flex justify-between mb-2">
                <TextBlock width="w-24" height="h-3" className="bg-slate-700" />
              </div>
              <TextBlock width="w-full" />
              <TextBlock width="w-11/12" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeTemplate === "monolith") {
    return (
      <div className="w-full h-full bg-white p-8 border-l-[8px] border-[#e63329] animate-fade-in shadow-inner flex flex-col">
        <div className="mb-8 border-b-2 border-slate-800 pb-4">
          <div className="w-48 h-8 bg-slate-900 rounded-sm mb-2"></div>
          <div className="w-32 h-2 bg-slate-500 rounded-sm"></div>
        </div>
        {[1, 2].map((section) => (
          <div key={section} className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-[#e63329]"></div>
              <div className="w-24 h-4 bg-slate-900 rounded-sm"></div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 h-2 bg-[#e63329] mt-1"></div>
              <div className="flex-1">
                <TextBlock width="w-32" height="h-3" className="bg-slate-800" />
                <TextBlock width="w-full" />
                <TextBlock width="w-5/6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTemplate === "vivant") {
    return (
      <div className="w-full h-full bg-white animate-fade-in shadow-inner flex flex-col">
        {/* Colored Header Band */}
        <div className="w-full h-32 bg-[#b85c38] p-8 flex flex-col justify-end relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-white opacity-10"></div>
          <div className="w-40 h-6 bg-white rounded-sm mb-2 opacity-90"></div>
          <div className="w-24 h-2 bg-white rounded-sm opacity-70"></div>
        </div>
        <div className="p-8">
          {[1, 2].map((section) => (
            <div key={section} className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-24 h-4 bg-[#b85c38] rounded-sm opacity-80"></div>
                <div className="flex-1 h-px bg-[#b85c38] opacity-20"></div>
              </div>
              <div className="border-b border-slate-100 pb-3">
                <div className="flex justify-between mb-2">
                  <TextBlock
                    width="w-32"
                    height="h-3"
                    className="bg-slate-800"
                  />
                  <TextBlock
                    width="w-16"
                    height="h-2"
                    className="bg-[#b85c38]"
                  />
                </div>
                <div className="flex gap-2">
                  <div className="text-[#b85c38] text-[8px] mt-1">▸</div>
                  <div className="flex-1">
                    <TextBlock width="w-full" />
                    <TextBlock width="w-4/5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default TemplateVisualizer;
