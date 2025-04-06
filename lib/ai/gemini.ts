// src/lib/ai/gemini.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
export const initGeminiAI = () => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("Missing Gemini API key");
  }
  
  return new GoogleGenerativeAI(apiKey);
};

// Get a generative model instance
export const getGenerativeModel = () => {
  const genAI = initGeminiAI();
  return genAI.getGenerativeModel({ model: "gemini-pro" });
};