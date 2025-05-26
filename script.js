const questions = [
  {
    image: "imgs/t_rex.jpg",
    correctAnswer: "Tiranossauro Rex",
    options: ["Triceratops", "Tiranossauro Rex", "Braquiossauro", "Estegossauro"]
  },
  {
    image: "imgs/triceratops.jpg",
    correctAnswer: "Triceratops",
    options: ["Tiranossauro Rex", "Anquilossauro", "Triceratops", "Iguanodon"]
  },
  {
    image: "imgs/brachiosaurus.jpg",
    correctAnswer: "Braquiossauro",
    options: ["Estegossauro", "Braquiossauro", "Velociraptor", "Diplodoco"]
  },
  {
    image: "imgs/velociraptor.jpg",
    correctAnswer: "Velociraptor",
    options: ["Velociraptor", "T-Rex", "Espinossauro", "Pterodáctilo"]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const imageElement = document.getElementById("dino-image");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultElement = document.getElementById("result");
const scoreText = document.getElementById("score");

function startQuiz() {
  resultElement.classList.add("hidden");
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const question = questions[currentQuestionIndex];
  imageElement.src = question.image;
  imageElement.alt = question.correctAnswer;

  answersElement.innerHTML = "";
  nextButton.style.display = "none";

  question.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => selectAnswer(btn, option === question.correctAnswer);
    answersElement.appendChild(btn);
  });
}

function selectAnswer(button, isCorrect) {
  const buttons = answersElement.querySelectorAll("button");
  buttons.forEach(btn => btn.disabled = true);

  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    const correctButton = Array.from(buttons).find(btn => btn.textContent === questions[currentQuestionIndex].correctAnswer);
    if (correctButton) correctButton.classList.add("correct");
  }

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  imageElement.src = "";
  answersElement.innerHTML = "";
  nextButton.style.display = "none";
  resultElement.classList.remove("hidden");
  scoreText.textContent = `Você acertou ${score} de ${questions.length} dinossauros! 🦖`;
}

function restartQuiz() {
  startQuiz();
}

startQuiz();
