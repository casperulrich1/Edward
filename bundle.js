const questions = [
  "Hvad er din forretningsidé?",
  "Hvem er dine kunder?",
  "Hvilket problem løser du?",
  "Hvordan vil du tjene penge?",
  "Hvordan markedsfører du din løsning?",
  "Fortæl om dig selv og/eller dit team."
];

let step = 0;
let answers = [];

function renderQuestion() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <h2>${questions[step]}</h2>
    <textarea id="answer" rows="4"></textarea><br/>
    <button onclick="next()">Næste</button>
  `;
}

function next() {
  const value = document.getElementById("answer").value;
  answers.push(value);
  step++;
  if (step < questions.length) {
    renderQuestion();
  } else {
    renderSummary();
  }
}

function renderSummary() {
  const root = document.getElementById("root");
  let output = "<h2>Din besvarelse</h2><ol>";
  for (let i = 0; i < questions.length; i++) {
    output += `<li><strong>${questions[i]}</strong><br/>${answers[i]}</li>`;
  }
  output += "</ol><button onclick='generateAI()'>Generér professionel plan med AI 🤖</button>";
  root.innerHTML = output;
}

function generateAI() {
  const root = document.getElementById("root");
  root.innerHTML = "<h2>🧠 GPT-4 genererer din forretningsplan...</h2><p>Vent venligst...</p>";

  const prompt = questions.map((q, i) => `${q}\n${answers[i]}`).join("\n\n");
  const fullPrompt = `Skriv en professionel dansk forretningsplan baseret på følgende:

${prompt}`;

  fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_OPENAI_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: fullPrompt }],
      max_tokens: 1200
    })
  })
  .then(res => res.json())
  .then(data => {
    const content = data.choices?.[0]?.message?.content || "Der opstod en fejl.";
    root.innerHTML = `
      <h2>🎉 Din AI-genererede forretningsplan</h2>
      <div id="ai-result">${content}</div>
      <button onclick="downloadPDF()">Download som PDF</button>
    `;
  })
  .catch(err => {
    root.innerHTML = "<p>Fejl under generering. Tjek API-nøgle eller netværk.</p>";
    console.error(err);
  });
}

function downloadPDF() {
  const element = document.getElementById("ai-result");
  html2pdf().from(element).save("Edward_Forretningsplan.pdf");
}

renderQuestion();
