// ----------- QUIZ LOGIC -----------
const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["HyperText Markup Language", "Hyper Tool Multi Language", "HighText Machine Language"],
    correct: 0
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: 3
  },
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Colorful Style System", "Computer Style Syntax"],
    correct: 0
  }
];
let currentIndex = 0;

function loadQuestion() {
  const q = quizData[currentIndex];
  document.getElementById("question").innerText = q.question;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;
    div.onclick = () => checkAnswer(i);
    optionsDiv.appendChild(div);
  });
  document.getElementById("result").innerText = "";
}

function checkAnswer(selected) {
  const q = quizData[currentIndex];
  const result = document.getElementById("result");
  if (selected === q.correct) {
    result.innerText = "✅ Correct!";
    result.style.color = "green";
  } else {
    result.innerText = "❌ Wrong. Correct answer: " + q.options[q.correct];
    result.style.color = "red";
  }
}

function nextQuestion() {
  currentIndex = (currentIndex + 1) % quizData.length;
  loadQuestion();
}

loadQuestion();

// ----------- JOKE LOGIC -----------
async function getJoke() {
  const jokeDiv = document.getElementById("joke");
  jokeDiv.innerHTML = "<em>Loading joke...</em>";
  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await response.json();
    jokeDiv.innerHTML = `
      <strong>${data.setup}</strong><br><br>
      ${data.punchline}
    `;
  } catch (error) {
    jokeDiv.innerHTML = "❌ Failed to fetch a joke. Try again.";
  }
}

// Load a joke on page load
getJoke();
