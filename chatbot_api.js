// chatbot.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { convertMarkdownToHtml } = require('./MarkdownToMarkupConverter');

import { getSecret } from "wix-secrets-backend";

// Function to return API key from Wix Secrets backend
const get_api_key = async () => {
  const mySecret = await getSecret("gemini_api_key");
  return mySecret;
};

// Function to configure API and get the model
const getChatbotModel = async () => {
  try {
    const API_KEY = await get_api_key(); // Wait for the API key to be fetched
    const genAI = new GoogleGenerativeAI(API_KEY); // Initialize the API with the key

    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "You are an interior decoration suggestion chatbot. Suggest relevant brands from the locality of user, taking known environmental factors into consideration. Especially recommend brands that are eco-friendly.",
    });

    return model;
  } catch (error) {
    console.error("Error configuring API or getting model: ", error);
    return null;
  }
};

// Function to generate a response based on user input and location
export async function getChatbotResponse(prompt, city, region, country) {
  try {
    const model = await getChatbotModel(); // Get the model with the correct API key
    if (!model) {
      throw new Error("Failed to load chatbot model");
    }

    // Create the chatbot prompt with location details
    const fullPrompt = `User location is ${city}, ${region}, ${country}. User prompt: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const markdowntext = response.text(); // Extract text from the response
    const HTMLtext = convertMarkdownToHtml(markdowntext)

    return HTMLtext; // Return chatbot response

  } catch (error) {
    console.error("Error generating content: ", error);
    return "Sorry, I encountered an issue.";
  }
}
