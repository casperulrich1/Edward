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
  let output = "<h2>Din forretningsplan</h2><ol>";
  for (let i = 0; i < questions.length; i++) {
    output += `<li><strong>${questions[i]}</strong><br/>${answers[i]}</li>`;
  }
  output += "</ol><button onclick='generateAI()'>Generér professionel plan med AI 🤖</button>";
  root.innerHTML = output;
}

function generateAI() {
  const root = document.getElementById("root");
  root.innerHTML = `
    <h2>🧠 AI genererer nu din forretningsplan...</h2>
    <p>(Denne funktion kobles til GPT-4 i næste version)</p>
    <p><button onclick='downloadPDF()'>Download som PDF</button></p>
  `;
}

function downloadPDF() {
  alert("PDF-download aktiveres i næste version 🚀");
}

renderQuestion();
