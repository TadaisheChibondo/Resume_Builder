import axios from "axios";

// Since you are running Django locally on port 8000
const API_URL = "http://localhost:8000/api/resumes/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// The actual API calls we will use in our app
export const resumeService = {
  // 1. Create a new draft
  createResume: async (data) => {
    const response = await api.post("create/", data);
    return response.data;
  },

  // 2. Fetch an existing draft by UUID
  getResume: async (id) => {
    const response = await api.get(`${id}/`);
    return response.data;
  },

  // 3. Send raw text to Gemini for ATS optimization
  optimizeText: async (rawText) => {
    const response = await api.post("optimize/", { raw_text: rawText });
    return response.data.optimized_text;
  },

  // 4. Trigger the EcoCash USSD Push
  initiatePayment: async (id, phone) => {
    const response = await api.post(`${id}/pay/`, { phone });
    return response.data;
  },
};
