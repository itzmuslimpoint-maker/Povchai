export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("ENV KEY:", process.env.NVIDIA_API_KEY); // 👈 DEBUG

    const { messages } = req.body;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta/llama3-70b-instruct",
        messages
      })
    });

    const text = await response.text(); // 👈 DEBUG

    console.log("NVIDIA RESPONSE:", text); // 👈 DEBUG

    if (!response.ok) {
      return res.status(500).json({ error: text });
    }

    return res.status(200).json(JSON.parse(text));

  } catch (err) {
    console.error("SERVER ERROR:", err);
    return res.status(500).json({ error: err.message });
  }
}
