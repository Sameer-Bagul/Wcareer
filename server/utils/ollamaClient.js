import axios from "axios";

export async function ollama(prompt, model = "dolphin-mistral") {
  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model,
        prompt,
        stream: false
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    // Ollama returns text as response.data.response
    return response.data.response;
  } catch (error) {
    console.error("🔥 Ollama Error:", error.response?.data || error);
    throw new Error("Ollama request failed");
  }
}