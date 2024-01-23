const questions = [
  {
    q: "What is the capital city of Australia?",
    a: [
      { text: "Sydney", correct: false },
      { text: "Canberra", correct: true },
      { text: "Melbourne", correct: false },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    q: "In which year did the Titanic sink?",
    a: [
      { text: "1910", correct: false },
      { text: "1920", correct: false },
      { text: "1912", correct: true },
      { text: "1935", correct: false },
    ],
  },
  {
    q: "Who wrote the play 'Romeo and Juliet'?",
    a: [
      { text: "William Shakespeare", correct: true },
      { text: "Charles Dickens", correct: false },
      { text: "Jane Austen", correct: false },
      { text: "Mark Twain", correct: false },
    ],
  },
  {
    q: "What is the chemical symbol for gold?",
    a: [
      { text: "Ag", correct: false },
      { text: "Ag", correct: false },
      { text: "Fe", correct: false },
      { text: "Au", correct: true },
    ],
  },
  {
    q: "Which planet is known as the 'Red Planet'?",
    a: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
];

let pageQuestion = document.getElementById("question");
let pageAnswers = document.getElementById("answers");
let nextBtn = document.getElementById("next");

let qIndex = 0;
let score = 0;

function startQuiz() {
  qIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  reset();
}

function reset() {
  nextBtn.style.display = "none";
  while (pageAnswers.firstChild) {
    pageAnswers.removeChild(pageAnswers.firstChild);
  }
  showQuestion();
}

function showQuestion() {
  let currentQ = questions[qIndex];
  let questionNum = qIndex + 1;
  pageQuestion.innerHTML = `${questionNum}. ${currentQ.q}`;

  currentQ.a.forEach((e) => {
    const button = document.createElement("button");
    button.id = "btn";
    button.innerHTML = e.text;
    pageAnswers.appendChild(button);
    if (e.correct === true) {
      button.dataset.correct = e.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(pageAnswers.children).forEach((e) => {
    if (e.dataset.correct === "true") {
      e.classList.add("correct");
    }
    e.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore() {
  while (pageAnswers.firstChild) {
    pageAnswers.removeChild(pageAnswers.firstChild);
  }
  pageQuestion.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Start Again";
  nextBtn.style.display = "block";
}

function handleNextButton() {
  qIndex++;
  if (qIndex < questions.length) {
    reset();
  } else {
    showScore();
  }
}

nextBtn.addEventListener("click", () => {
  if (qIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
