export default async function handler(req, res) {
  const { messages } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages,
        max_tokens: 1500
      })
    });

    const data = await response.json();
    console.log("🧠 DEBUG: AI response from OpenAI:", JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0]) {
      console.warn("⚠️ AI-svaret indeholder ikke forventet 'choices'-felt:", data);
      return res.status(500).json({ error: "Tomt AI-svar modtaget." });
    }

    res.status(200).json(data);

  } catch (err) {
    console.error("❌ Fejl i generate.js:", err);
    res.status(500).json({ error: "Fejl under kommunikation med OpenAI" });
  }
}
