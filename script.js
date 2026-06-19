// INTERACTIVE BACKGROUND
const background = document.getElementById("background");

for (let i = 0; i < 40; i++) {

  const circle = document.createElement("div");

  circle.classList.add("circle");

  let size = Math.random() * 60;

  circle.style.width = size + "px";
  circle.style.height = size + "px";

  circle.style.left =
    Math.random() * window.innerWidth + "px";

  circle.style.animationDuration =
    (Math.random() * 10 + 5) + "s";

  circle.style.opacity = Math.random();

  background.appendChild(circle);
}

// QUIZ QUESTIONS
const questions = [

  {
    question: "Which language runs inside a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },

  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "HighText Machine Language", correct: false },
      { text: "Hyper Transfer Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false }
    ]
  },

  {
    question: "Which company developed Java?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Sun Microsystems", correct: true },
      { text: "Google", correct: false },
      { text: "Apple", correct: false }
    ]
  },

  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: [
      { text: "//", correct: true },
      { text: "#", correct: false },
      { text: "<!-- -->", correct: false },
      { text: "**", correct: false }
    ]
  },

  {
    question: "Which data structure works on FIFO?",
    answers: [
      { text: "Stack", correct: false },
      { text: "Queue", correct: true },
      { text: "Tree", correct: false },
      { text: "Graph", correct: false }
    ]
  }
];

// ELEMENTS
const questionElement =
  document.getElementById("question");

const answerButtons =
  document.getElementById("answer-buttons");

const nextButton =
  document.getElementById("next-btn");

const scoreElement =
  document.getElementById("score");

const timerElement =
  document.getElementById("timer");

const themeToggle =
  document.getElementById("theme-toggle");

// VARIABLES
let currentQuestionIndex = 0;

let score = 0;

let timeLeft = 15;

let timer;
// START QUIZ
function startQuiz() {

  currentQuestionIndex = 0;

  score = 0;

  showQuestion();
}
// SHOW QUESTION
function showQuestion() {

  resetState();

  startTimer();

  let currentQuestion =
    questions[currentQuestionIndex];

  questionElement.innerText =
    currentQuestion.question;

  currentQuestion.answers.forEach(answer => {

    const button =
      document.createElement("button");

    button.innerText = answer.text;

    if (answer.correct) {

      button.dataset.correct =
        answer.correct;
    }

    button.addEventListener(
      "click",
      selectAnswer
    );

    answerButtons.appendChild(button);
  });
}
// RESET STATE
function resetState() {

  nextButton.style.display = "none";

  while (answerButtons.firstChild) {

    answerButtons.removeChild(
      answerButtons.firstChild
    );
  }
}
// SELECT ANSWER
function selectAnswer(e) {

  clearInterval(timer);

  const selectedBtn = e.target;

  const correct =
    selectedBtn.dataset.correct === "true";

  if (correct) {

    selectedBtn.classList.add("correct");

    score++;

  } else {

    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children)
    .forEach(button => {

      if (button.dataset.correct === "true") {

        button.classList.add("correct");
      }

      button.disabled = true;
    });

  nextButton.style.display = "block";
}
// NEXT BUTTON
nextButton.addEventListener("click", () => {

  clearInterval(timer);

  currentQuestionIndex++;

  if (
    currentQuestionIndex < questions.length
  ) {

    showQuestion();

  } else {

    showScore();
  }
});
// SHOW SCORE
function showScore() {

  resetState();

  clearInterval(timer);

  questionElement.innerText =
    "Quiz Finished 🎉";

  scoreElement.innerText =
    `Your Score: ${score}/${questions.length}`;

  nextButton.innerText = "Play Again";

  nextButton.style.display = "block";

  nextButton.onclick = () => {

    nextButton.innerText = "Next";

    scoreElement.innerText = "";

    startQuiz();
  };
}
// TIMER
function startTimer() {

  clearInterval(timer);

  timeLeft = 15;

  timerElement.innerText =
    `Time: ${timeLeft}`;

  timer = setInterval(() => {

    timeLeft--;

    timerElement.innerText =
      `Time: ${timeLeft}`;

    if (timeLeft <= 0) {

      clearInterval(timer);

      nextQuestionAutomatically();
    }

  }, 1000);
}
// AUTO NEXT QUESTION
function nextQuestionAutomatically() {

  currentQuestionIndex++;

  if (
    currentQuestionIndex < questions.length
  ) {

    showQuestion();

  } else {

    showScore();
  }
}

// DARK / LIGHT MODE
themeToggle.addEventListener("click", () => {

  document.body.classList.toggle(
    "light-mode"
  );

  if (
    document.body.classList.contains(
      "light-mode"
    )
  ) {

    themeToggle.innerText =
      "🌙 Dark Mode";

  } else {

    themeToggle.innerText =
      "☀️ Light Mode";
  }
});
// Start quiz
startQuiz();