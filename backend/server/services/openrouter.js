import config from "../config/index.js";

export async function suggestReply(ticketSubject, ticketDescription, comments) {
  const apiKey = config.openRouterApiKey;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const conversationHistory = comments
    .map((c) => `${c.author}: ${c.text}`)
    .join("\n");

  const systemPrompt =
    "You are a helpful customer support agent. Write polite, concise and thorough replies. Do not use markdown.";

  const userPrompt = `Given the following support ticket, suggest a professional and helpful reply.

Subject: ${ticketSubject}
Description: ${ticketDescription}
${conversationHistory ? `Previous conversation:\n${conversationHistory}` : "No previous comments."}

Write the reply from the support agent now.`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: config.aiModel,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenRouter API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error("OpenRouter API returned empty response");
  }

  return reply.trim();
}
