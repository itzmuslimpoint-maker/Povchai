import OpenAI from "openai";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const openai = new OpenAI({
      apiKey: process.env.NVIDIA_API_KEY,
      baseURL: "https://nim.api.nvidia.com/v1",
    });

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct", // 🔥 stable model use करो
      messages: messages,
      temperature: 0.7,
      max_tokens: 500,
    });

    return res.status(200).json({
      choices: [
        {
          message: {
            content: completion.choices[0].message.content
          }
        }
      ]
    });

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "API failed" });
  }
}
