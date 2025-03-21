import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ApiService = {
  createUser: async (userData) => {
    await api.post("/users", userData);
  },

  getDomains: async () => {
    const response = await api.get("/domains");
    return response.data;
  },

  getRoles: async (domain) => {
    const response = await api.get(`/roles/${domain}`);
    return response.data;
  },

  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append("resume", file);
    const response = await api.post("/upload-resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.resumeText;
  },

  generateQuestions: async (params) => {
    const response = await api.post("/generate-questions", params);
    return response.data;
  },

  submitAnswer: async (answer, questionIndex) => {
    if (typeof answer !== "string" || !answer.trim()) {
      throw new Error("Answer cannot be empty");
    }

    try {
      await api.post("/submit-answer", {
        answer: answer.trim(),
        questionIndex: questionIndex,
      });
    } catch (error) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw error;
    }
  },

  getFeedback: async () => {
    const response = await api.post("/get-feedback");
    return response.data;
  },

  getIdealAnswer: async (question, userAnswer) => {
    const response = await api.post("/ideal-answer", {
      question,
      userAnswer,
    });
    return response.data.response;
  },

  saveFeedback: async (userId, domain, role, feedback, questions, answers) => {
    await api.post("/feedback", {
      userId,
      domain,
      role,
      feedback,
      questions,
      answers,
    });
  },

  getFeedbackHistory: async (userId) => {
    const response = await api.get(`/feedback/${userId}`);
    return response.data;
  },
};
