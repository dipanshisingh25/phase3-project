let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answer-buttons");
let nextButton = document.getElementById("next-btn");

let quizData = [
    {
        Question: "What is the national flower of India?",
        answer: [
            { text: "Lotus", correct: true },
            { text: "Marigold", correct: false },
            { text: "Sunflower", correct: false },
            { text: "Lily", correct: false }
        ]
    },
    {
        Question: "Who is the present Prime Minister of India?",
        answer: [
            { text: "Rahul Gandhi", correct: false },
            { text: "Yogi Nath", correct: false },
            { text: "Narendra Modi", correct: true },
            { text: "Amit Shah", correct: false }
        ]
    },
    {
        Question: "What does GI stand for?",
        answer: [
            { text: "General Identity", correct: false },
            { text: "Geographical Indication", correct: true },
            { text: "Global Information", correct: false },
            { text: "Government Index", correct: false }
        ]
    },
    {
        Question: "GI Tag is valid for how many years in India?",
        answer: [
            { text: "5 years", correct: false },
            { text: "10 years", correct: true },
            { text: "15 years", correct: false },
            { text: "lifetime", correct: false }
        ]
    },
    {
        Question: "what is the Capital of UP",
        answer: [
            { text: "Delhi", correct: false},
            { text: "Bulandsahar",correct: false},
            { text: "Lucknow",correct: true},
            { text: "Sandila",correct: false},
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = quizData[currentIndex];
    let questionNo = currentIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.Question;

    currentQuestion.answer.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
        if (answer.correct) {
            button.dataset.correct = "true";
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
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

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
  
}

nextButton.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < quizData.length) {
        showQuestion();
    } else {
        questionElement.innerHTML = "Quiz finished! You scored " + score + " out of " + quizData.length + ".";
        nextButton.innerHTML = "Restart";
        nextButton.onclick = startQuiz;
    }
});

startQuiz();


