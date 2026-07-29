import config from "../config/index.js";

export async function suggestReply(ticketSubject, ticketDescription, comments) {
  const apiKey = config.geminiApiKey;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const conversationHistory = comments
    .map((c) => `${c.author}: ${c.text}`)
    .join("\n");

  const prompt = `You are a helpful customer support agent. Given the following support ticket, suggest a professional and helpful reply.

Subject: ${ticketSubject}
Description: ${ticketDescription}
${conversationHistory ? `Previous conversation:\n${conversationHistory}` : "No previous comments."}

Write a polite and helpful reply from the support agent. Be concise but thorough. Do not use markdown.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!reply) {
    throw new Error("Gemini API returned empty response");
  }

  return reply.trim();
}
