export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta/llama3-70b-instruct",
        messages: messages
      })
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "API failed" });
  }
}
