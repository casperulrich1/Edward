function generateAI() {
  const updated = document.querySelectorAll("textarea[data-index]");
  answers = Array.from(updated).map(el => el.value.trim());

  const prompt = questions.map((q, i) => `${q}\\n${answers[i]}`).join("\\n\\n");
  const fullPrompt = `Skriv en professionel dansk forretningsplan baseret på følgende:\\n\\n${prompt}`;

  const root = document.getElementById("root");
  root.innerHTML = "<h2>🧠 GPT-4 genererer din forretningsplan...</h2><p>Vent venligst...</p>";

  fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: fullPrompt }]
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log("🧠 AI-svar modtaget:", data); // 🧠 Debug-log
    const content = data.choices?.[0]?.message?.content || "⚠️ AI kunne ikke generere planen. (Tomt svar)";
    root.innerHTML = `
      <h2>🎉 Din AI-genererede forretningsplan</h2>
      <div id="ai-output" contenteditable="true">${content}</div>
      <button onclick="downloadPDF()">Download som PDF</button>
    `;
  })
  .catch(err => {
    console.error("❌ Fejl under kald til /api/generate:", err); // ❌ Debug-log
    root.innerHTML = "<p style='color:red;'>❌ Fejl under AI-generering. Tjek API-nøgle, netværk eller proxy-forbindelse.</p>";
  });
}
