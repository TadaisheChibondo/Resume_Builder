import React, { useState, useEffect } from "react";
import { resumeService } from "../services/api";
import PersonalInfoStep from "../components/form-steps/PersonalInfoStep";
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Loader,
  RefreshCw,
  Trash2,
  Home,
} from "lucide-react";
import EducationStep from "../components/form-steps/EducationStep";
import ExperienceStep from "../components/form-steps/ExperienceStep";
import ProjectsStep from "../components/form-steps/ProjectsStep";
import GatewayStep from "../components/form-steps/GatewayStep";
import TemplateStep from "../components/form-steps/TemplateStep";
import SkillsStep from "../components/form-steps/SkillsStep";
import TemplateVisualizer from "../components/ui/TemplateVisualizer";

const BuilderPage = ({ onExit }) => {
  // Define the default empty state
  const defaultFormData = {
    template_choice: "classic",
    references_and_awards: "",
    gender: "",
    full_name: "",
    email: "",
    phone: "",
    linkedin_url: "",
    portfolio_url: "",
    professional_summary: "",
    location: "",
    education: [],
    experience: [],
    projects: [],
    skills: [],
  };

  // Initialize state from LocalStorage (if it exists), otherwise use defaults
  const [currentStep, setCurrentStep] = useState(() => {
    const saved = localStorage.getItem("resumeStep");
    return saved !== null ? parseInt(saved, 10) : 1;
  });

  const [resumeId, setResumeId] = useState(() => {
    return localStorage.getItem("resumeId") || null;
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("resumeData");
    return saved !== null ? JSON.parse(saved) : defaultFormData;
  });

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [pdfTimestamp, setPdfTimestamp] = useState(Date.now()); // For soft-refreshing the PDF
  const [errorMessage, setErrorMessage] = useState(null);

  // THE AUTO-SAVE ENGINE: Runs automatically every time state changes
  useEffect(() => {
    localStorage.setItem("resumeStep", currentStep);
    localStorage.setItem("resumeData", JSON.stringify(formData));
    if (resumeId) {
      localStorage.setItem("resumeId", resumeId);
    }
  }, [currentStep, formData, resumeId]);

  // Handle simple top-level input changes (Personal Info)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 1. Update a specific field inside an array item
  const handleArrayChange = (category, index, field, value) => {
    setFormData((prev) => {
      const updatedArray = [...prev[category]];
      updatedArray[index] = { ...updatedArray[index], [field]: value };
      return { ...prev, [category]: updatedArray };
    });
  };

  // 2. Add a new blank block to the array
  const addArrayItem = (category, defaultObject) => {
    setFormData((prev) => ({
      ...prev,
      [category]: [...prev[category], defaultObject],
    }));
  };

  // 3. Delete a block from the array
  const removeArrayItem = (category, index) => {
    setFormData((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  // Submit the massive JSON payload to our Django backend
  const handleSaveDraft = async () => {
    setErrorMessage(null); // Clear any previous errors

    try {
      const sanitizedData = JSON.parse(JSON.stringify(formData));

      sanitizedData.education = sanitizedData.education.map((item) => ({
        ...item,
        start_date: item.start_date === "" ? null : item.start_date,
        end_date: item.end_date === "" ? null : item.end_date,
      }));

      sanitizedData.experience = sanitizedData.experience.map((item) => ({
        ...item,
        start_date: item.start_date === "" ? null : item.start_date,
        end_date: item.end_date === "" ? null : item.end_date,
      }));

      sanitizedData.skills = sanitizedData.skills.filter(
        (skill) => skill.name.trim() !== "",
      );
      sanitizedData.projects = sanitizedData.projects.filter(
        (proj) => proj.name.trim() !== "",
      );
      sanitizedData.education = sanitizedData.education.filter(
        (edu) => edu.institution.trim() !== "",
      );
      sanitizedData.experience = sanitizedData.experience.filter(
        (exp) => exp.company.trim() !== "",
      );

      const data = await resumeService.createResume(sanitizedData);
      setResumeId(data.id);
      setPdfTimestamp(Date.now());
      setCurrentStep(7);
    } catch (error) {
      console.error("Error saving draft:", error);

      // Smart Error Parser
      if (error.response && error.response.data) {
        const data = error.response.data;

        // If Django sends a specific error object, grab the first readable message
        if (typeof data === "object" && data !== null) {
          const firstKey = Object.keys(data)[0];
          const firstError = data[firstKey];

          // Format it to look nice (e.g., "Education: This field is required")
          const formattedKey =
            firstKey.charAt(0).toUpperCase() +
            firstKey.slice(1).replace("_", " ");
          const formattedError = Array.isArray(firstError)
            ? firstError[0]
            : firstError;

          setErrorMessage(`${formattedKey}: ${formattedError}`);
        } else {
          setErrorMessage(String(data));
        }
      } else {
        setErrorMessage(
          "Failed to connect to the server. Please check your connection.",
        );
      }
    }
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const startOver = () => {
    if (
      window.confirm(
        "Are you sure you want to start over? This will delete your current draft.",
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Left Column: Form Inputs Panel */}
      <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto max-h-screen border-r border-slate-200 bg-white">
        {/* NEW: Back to Home Button */}
        <button
          onClick={onExit}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-8 font-medium"
        >
          <Home size={16} /> Back to Home
        </button>
        {/* Progress Tracker */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
            <span>Step {currentStep} of 7</span>
            <span>{Math.round((currentStep / 7) * 100)}% Complete</span>
          </div>
          <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300 ease-in-out"
              style={{ width: `${(currentStep / 7) * 100}%` }}
            />
          </div>
        </div>

        {/* Dynamic Step Rendering */}
        <div className="min-h-[400px]">
          {currentStep === 1 && (
            <TemplateStep formData={formData} onChange={handleInputChange} />
          )}
          {currentStep === 2 && (
            <PersonalInfoStep
              formData={formData}
              onChange={handleInputChange}
            />
          )}
          {currentStep === 3 && (
            <EducationStep
              education={formData.education}
              onChange={(index, field, value) =>
                handleArrayChange("education", index, field, value)
              }
              onAdd={() =>
                addArrayItem("education", {
                  institution: "",
                  degree: "",
                  start_date: "",
                  end_date: "",
                  gpa: "",
                })
              }
              onRemove={(index) => removeArrayItem("education", index)}
            />
          )}
          {currentStep === 4 && (
            <SkillsStep
              skills={formData.skills}
              onChange={(index, field, value) =>
                handleArrayChange("skills", index, field, value)
              }
              onAdd={() => addArrayItem("skills", { name: "" })}
              onRemove={(index) => removeArrayItem("skills", index)}
            />
          )}
          {currentStep === 5 && (
            <ExperienceStep
              experience={formData.experience}
              onChange={(index, field, value) =>
                handleArrayChange("experience", index, field, value)
              }
              onAdd={() =>
                addArrayItem("experience", {
                  company: "",
                  role: "",
                  start_date: "",
                  end_date: "",
                  raw_description: "",
                  ai_optimized_description: "",
                })
              }
              onRemove={(index) => removeArrayItem("experience", index)}
            />
          )}
          {currentStep === 6 && (
            <ProjectsStep
              projects={formData.projects}
              formData={formData}
              onChange={handleInputChange}
              onArrayChange={(index, field, value) =>
                handleArrayChange("projects", index, field, value)
              }
              onAdd={() =>
                addArrayItem("projects", {
                  name: "",
                  tech_stack: "",
                  link: "",
                  description: "",
                  ai_optimized_description: "",
                })
              }
              onRemove={(index) => removeArrayItem("projects", index)}
            />
          )}
          {currentStep === 7 && <GatewayStep resumeId={resumeId} />}
        </div>

        {/* NEW: Error Banner */}
        {errorMessage && (
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded flex items-start justify-between shadow-sm animate-in fade-in slide-in-from-bottom-2">
            <div>
              <p className="font-bold mb-1">Could not generate preview</p>
              <p>{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-500 hover:text-red-800 transition-colors font-bold px-2"
            >
              ✕
            </button>
          </div>
        )}

        {/* Navigation Control Buttons (Hidden on Step 7) */}
        {/* Navigation Control Buttons */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={18} />{" "}
              {currentStep === 7 ? "Back to Editor" : "Back"}
            </button>

            <button
              onClick={startOver}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} /> Start Over
            </button>
          </div>

          {currentStep < 6 ? (
            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
            >
              Continue <ChevronRight size={18} />
            </button>
          ) : currentStep === 6 ? (
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm font-medium animate-pulse"
            >
              Generate CV Preview
            </button>
          ) : null}
        </div>
      </div>

      {/* Right Column: Live Browser Preview Panel */}
      <div className="w-full md:w-1/2 p-6 bg-slate-100 flex items-center justify-center min-h-[500px] md:min-h-screen relative">
        <div className="w-full max-w-[210mm] aspect-[1/1.414] bg-white shadow-xl rounded-sm border border-slate-200 overflow-hidden relative">
          {resumeId ? (
            <div className="w-full h-full flex flex-col relative group">
              <iframe
                src={`https://backend-curious-stream-8744.fly.dev/api/resumes/${resumeId}/download/?t=${pdfTimestamp}`}
                className="w-full h-full border-none flex-grow"
                title="Resume Preview"
              />

              {/* Soft Refresh Button (Appears on Step 7) */}
              {currentStep === 7 && (
                <button
                  onClick={() => setPdfTimestamp(Date.now())}
                  className="absolute bottom-6 right-6 bg-slate-800 text-white px-5 py-3 rounded-full shadow-2xl text-sm font-bold hover:bg-slate-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border-2 border-white/20"
                >
                  <RefreshCw size={16} /> Refresh PDF
                </button>
              )}
            </div>
          ) : (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 z-0 opacity-50">
                <TemplateVisualizer activeTemplate={formData.template_choice} />
              </div>

              {/* Overlay Text */}
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px] p-12 text-center pointer-events-none transition-opacity duration-300">
                <Sparkles
                  size={48}
                  className="mb-4 text-slate-800 opacity-60"
                />
                <p className="tracking-widest uppercase text-sm font-bold text-slate-800 bg-white/90 px-4 py-1.5 rounded-full shadow-sm">
                  {formData.template_choice.toUpperCase()} LAYOUT
                </p>
                <p className="text-xs mt-3 text-slate-700 font-medium bg-white/90 px-3 py-1.5 rounded shadow-sm">
                  Complete the steps to generate your final PDF.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
