const quizData = [
  {
    question: "Quelle est la capitale de la France ?",
    a: "Londres",
    b: "Madrid",
    c: "Paris",
    d: "Rome",
    correct: "c"
  },
  {
    question: "Combien font 2 + 2 ?",
    a: "3",
    b: "4",
    c: "5",
    d: "6",
    correct: "b"
  },
  {
    question: "Quel langage s’exécute dans le navigateur ?",
    a: "PHP",
    b: "Python",
    c: "Java",
    d: "JavaScript",
    correct: "d"
  }
];

let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextBtn = document.getElementById("next");
const scoreEl = document.getElementById("score");

function loadQuiz() {
  resetState();
  const currentData = quizData[currentQuiz];
  questionEl.innerText = currentData.question;
  answerButtons[0].innerText = currentData.a;
  answerButtons[1].innerText = currentData.b;
  answerButtons[2].innerText = currentData.c;
  answerButtons[3].innerText = currentData.d;
}

function resetState() {
  answerButtons.forEach(btn => {
    btn.disabled = false;
    btn.classList.remove("correct", "wrong");
  });
  nextBtn.style.display = "none";
  scoreEl.innerText = "";
}

answerButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.id;
    const correct = quizData[currentQuiz].correct;

    if (selected === correct) {
      btn.classList.add("correct");
      score++;
    } else {
      btn.classList.add("wrong");
      answerButtons.forEach(b => {
        if (b.dataset.id === correct) b.classList.add("correct");
      });
    }

    answerButtons.forEach(b => b.disabled = true);
    nextBtn.style.display = "inline-block";
  });
});

nextBtn.addEventListener("click", () => {
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.innerText = "Quiz terminé !";
  document.querySelector("ul").style.display = "none";
  nextBtn.style.display = "none";
  scoreEl.innerText = `Votre score : ${score} / ${quizData.length}`;
}

// Démarrage
loadQuiz();
