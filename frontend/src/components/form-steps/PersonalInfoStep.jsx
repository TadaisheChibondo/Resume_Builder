import React from "react";
// Change Linkedin to Linkedin
import { User, Mail, Phone, Link, Globe, FileText, MapPin } from "lucide-react";

const PersonalInfoStep = ({ formData, onChange }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Step Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Personal Details
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Provide your core contact details. Recruiters will use these to get in
          touch for interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {/* Full Name Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User size={18} />
            </div>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={onChange}
              placeholder="e.g., Tadaishe Chibondo"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        {/* Contact Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                placeholder="developer@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={onChange}
                placeholder="e.g., +263 77..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400"
                required
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Location or Address (Street, City, Country)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <MapPin size={18} />
            </div>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={onChange}
              placeholder="e.g., Bulawayo, Zimbabwe"
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Gender (Optional)
          </label>
          <select
            name="gender"
            value={formData.gender || ""}
            onChange={onChange}
            className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">Prefer not to say</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>

        {/* Online Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* LinkedIn Profile */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              LinkedIn URL (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Link size={18} />
              </div>
              <input
                type="url"
                name="linkedin_url"
                value={formData.linkedin_url || ""}
                onChange={onChange}
                placeholder="linkedin.com/in/username"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Portfolio/GitHub Link */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Portfolio / GitHub Link (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Globe size={18} />
              </div>
              <input
                type="url"
                name="portfolio_url"
                value={formData.portfolio_url || ""}
                onChange={onChange}
                placeholder="tadaishechibondo.co.zw"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Raw Professional Summary Textarea */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Professional Summary
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none text-slate-400">
              <FileText size={18} />
            </div>
            <textarea
              name="professional_summary"
              value={formData.professional_summary || ""}
              onChange={onChange}
              rows={4}
              placeholder="Briefly explain your career goals or core programming skill set here. Don't worry about corporate phrasing—our AI optimization engine will refine this later..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-800 placeholder:text-slate-400 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
