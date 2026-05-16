import React, { useState } from "react";
import {
  Smartphone,
  Lock,
  CheckCircle,
  Loader,
  ShieldCheck,
} from "lucide-react";
import { resumeService } from "../../services/api";

const GatewayStep = ({ resumeId }) => {
  const [phone, setPhone] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, loading, sent, success
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      setErrorMessage("Please enter a valid EcoCash number.");
      return;
    }

    setPaymentStatus("loading");
    setErrorMessage("");

    try {
      // Trigger the USSD push via Paynow
      await resumeService.initiatePayment(resumeId, phone);
      setPaymentStatus("sent");

      // In a production app, you would set up a WebSocket or poll the backend
      // to automatically unlock when the Paynow webhook fires.
      // For now, we'll tell the user to check their phone.
    } catch (error) {
      console.error(error);
      setPaymentStatus("idle");
      setErrorMessage(
        "Failed to send EcoCash prompt. Please check your number and try again.",
      );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Unlock Your ATS Resume
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Your draft is saved and your preview is ready. Pay the $1.00 export
          fee via EcoCash to remove the watermark and download your high-quality
          PDF.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

        {paymentStatus === "idle" || paymentStatus === "loading" ? (
          <form onSubmit={handlePayment} className="relative z-10">
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                EcoCash Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Smartphone size={18} />
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., 0771234567"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all text-slate-800 font-medium tracking-wide"
                  disabled={paymentStatus === "loading"}
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={paymentStatus === "loading"}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-md font-bold disabled:opacity-70"
            >
              {paymentStatus === "loading" ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Initiating USSD Push...
                </>
              ) : (
                <>
                  <Lock size={18} />
                  Pay $1.00 with EcoCash
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={14} />
              <span>Secured by Paynow Zimbabwe</span>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 relative z-10 animate-fade-in">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4 border-4 border-emerald-50">
              <CheckCircle className="text-emerald-600" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">
              Check Your Phone!
            </h3>
            <p className="text-sm text-slate-600 mb-6 px-4">
              An EcoCash prompt has been sent to <strong>{phone}</strong>.
              Please enter your PIN to complete the payment.
            </p>
            <p className="text-xs text-slate-400 bg-slate-50 py-3 rounded-lg border border-slate-100">
              Once paid, refresh the PDF preview on the right to download your
              clean copy.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GatewayStep;
