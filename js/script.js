//////////////////////////
// ! APP STATE
//////////////////////////

const state = {
  player1: 0,
  player2: 0,
  which: true,
};

let questions = [];

// //////////////////////////
// ! Main DOM Elements
// //////////////////////////

const $question = $("#question");
const $a = $("#a");
const $b = $("#b");
const $c = $("#c");
const $d = $("#d");
const $e = $("#e");
const $p1Score = $("#player1 h4");
const $p2Score = $("#player2 h4");
const $correctAnswer = $("#correct-answer");
let $currentQuestion = "";

//Dropdown Menu and "Next Question" Button
const container = document.querySelector(".dropdown-menu");
const restart = container.querySelector('sl-menu-item[value="restart"]');
const reading = container.querySelector('sl-menu-item[value="reading"]');
const action = container.querySelector('sl-menu-item[value="action"]');
const nextQuestion = document.querySelector("#nextQuestion");

////////////////////////////
// ! Functions
////////////////////////////
const updatePlayerScores = () => {
  $p1Score.text(state.player1);
  $p2Score.text(state.player2);
};

const chooseAnswer = (event, $currentQuestion) => {
  if (event.target.textContent === $currentQuestion.answer) {
    highlightCorrectAnswer();
    if (state.which) {
      state.player1++;
      document.getElementById("correct-answer").textContent =
        "Correct! The answer is: " + $currentQuestion.answer;
      state.which = !state.which;
    } else {
      state.player2++;
      document.getElementById("correct-answer").textContent =
        "Correct! The answer is: " + $currentQuestion.answer;
      state.which = !state.which;
    }
  } else {
    highlightIncorrectAnswer();
    document.getElementById("correct-answer").textContent =
      "Incorrect. The answer is " + $currentQuestion.answer;
    state.which = !state.which;
  }
  //update players scores
  $p1Score.text(state.player1);
  $p2Score.text(state.player2);
};

const setBoard = (q) => {
  //Getting a random question
  const randomIndex = Math.floor(Math.random() * q.length);
  const randomQuestion = q[randomIndex];

  //Update question
  $question.text(randomQuestion.question);
  $a.text(randomQuestion.a);
  $b.text(randomQuestion.b);
  $c.text(randomQuestion.c);
  $d.text(randomQuestion.d);
  $e.text(randomQuestion.e);
  $currentQuestion = randomQuestion;

  // Reset player buttons/color
  resetButtonColor();

  // Reset answer text
  document.getElementById("correct-answer").textContent = "";
};

// Update player button color
const resetButtonColor = () => {
  $("#player1").css("background-color", "grey");
  $("#player2").css("background-color", "grey");
};

const restartGame = () => {
  setBoard(questions);
  resetButtonColor();
  state.player1 = 0;
  state.player2 = 0;
  updatePlayerScores();
  document.getElementById("correct-answer").textContent = "";
};

const initializeEventListeners = () => {
  // Answers A, B, C, D, E
  $("li").on("click", (event) => {
    chooseAnswer(event, $currentQuestion);
  });

  //Next Question Button
  $("#nextQuestion").on("click", () => setBoard(questions));

  // Dropdown Menu / Restart Game
  restart.addEventListener("click", () => {
    restartGame();
  });

  // Dropdown Menu / Reading, Action
  reading.addEventListener("click", () =>
    console.log("extracurricular reading links")
  );
  action.addEventListener("click", () =>
    console.log("links to things you can do")
  );
};

const highlightCorrectAnswer = () => {
  if (state.which) {
    document.querySelector("#player1").style.backgroundColor = "green";
  } else {
    document.querySelector("#player2").style.backgroundColor = "green";
  }
};

const highlightIncorrectAnswer = () => {
  if (state.which) {
    document.querySelector("#player1").style.backgroundColor = "red";
  } else {
    document.querySelector("#player2").style.backgroundColor = "red";
  }
};

//////////////////////////
// ! Main App Logic
//////////////////////////

const COMPLETE_URL =
  "https://cdn.contentful.com/spaces/1ooy33zp4esg/environments/master/entries?access_token=GwmWVEBSVzK_noU9IhoIaYblT31-CqoiESVSAdo7UJ0&content_type=triviaq";

$.ajax(COMPLETE_URL).then(
  (data) => {
    questions = data.items.map((q) => q.fields);
    setBoard(questions);
    initializeEventListeners($currentQuestion);
  },
  (error) => {
    console.log("bad request", error);
  }
);
