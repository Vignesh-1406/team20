const startBtn = document.getElementById("start-btn");
const exitBtn = document.getElementById("exit-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const timerElement = document.getElementById("time");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let timer;

const questions = [
    {
        question: "1. Which traditional dance form is native to Kerala, India?",
        answers: [
            { text: "Kathak", correct: false },
            { text: "Bharatanatyam", correct: false },
            { text: "Kathakali", correct: true },
            { text: "Odissi", correct: false }
        ]
    },
    {
        question: "2. What is the iconic clock tower located in London commonly known as?",
        answers: [
            { text: "The Tower Clock", correct: false },
            { text: "Big Ben", correct: true },
            { text: "Queen’s Bell", correct: false },
            { text: "The London Chime", correct: false }
        ]
    },
    {
        question: "3. Which city in South Africa is famous for Table Mountain?",
        answers: [
            { text: "Johannesburg", correct: false },
            { text: "Durban", correct: false },
            { text: "Pretoria", correct: false },
            { text: "Cape Town", correct: true }
        ]
    },
    {
        question: "4. What is the name of the tallest building in the world located in Dubai?",
        answers: [
            { text: "Burj Al Arab", correct: false },
            { text: "Emirates Tower", correct: false },
            { text: "Burj Khalifa", correct: true },
            { text: "Dubai Tower", correct: false }
        ]
    },
    {
        question: "5. Which Amsterdam museum is dedicated to a young girl who wrote a diary during World War II?",
        answers: [
            { text: "Van Gogh Museum", correct: false },
            { text: "Rijksmuseum", correct: false },
            { text: "Anne Frank House", correct: true },
            { text: "Rembrandt House Museum", correct: false }
        ]
    },
    {
        question: "6. Which Japanese city is known for the famous Shibuya Crossing and the Tokyo Tower?",
        answers: [
            { text: "Osaka", correct: false },
            { text: "Tokyo", correct: true },
            { text: "Kyoto", correct: false },
            { text: "Hiroshima", correct: false }
        ]
    },
    {
        question: "7. What kind of backwater tours is Kerala most famous for?",
        answers: [
            { text: "Camel Safari", correct: false },
            { text: "Houseboat Cruise", correct: true },
            { text: "Train Ride", correct: false },
            { text: "Bicycle Tour", correct: false }
        ]
    },
    {
        question: "8. What currency is used in the United Kingdom?",
        answers: [
            { text: "Euro", correct: false },
            { text: "Dollar", correct: false },
            { text: "Pound Sterling", correct: true },
            { text: "Franc", correct: false }
        ]
    },
    {
        question: "9. Which wild animal is most commonly associated with South African safaris?",
        answers: [
            { text: "Kangaroo", correct: false },
            { text: "Lion", correct: true },
            { text: "Polar Bear", correct: false },
            { text: "Panda", correct: false }
        ]
    },
    {
        question: "10. In which city would you find the world-famous flower market called Bloemenmarkt?",
        answers: [
            { text: "Brussels", correct: false },
            { text: "Vienna", correct: false },
            { text: "Amsterdam", correct: true },
            { text: "Berlin", correct: false }
        ]
    }
];


startBtn.addEventListener("click", () => {
    welcomeScreen.style.display = "none";
    quizScreen.style.display = "block";
    startQuiz();
});

exitBtn.addEventListener("click", () => {
    alert("Thanks for visiting! Come back later 😊");
    window.location.href = "index1.html";
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });

    startTimer(10); // Start countdown timer
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    clearInterval(timer); // Clear any existing timer
    timerElement.innerText = "10"; // Reset timer display
}

function startTimer(time = 10) { 
    timerElement.textContent = time; // Display initial time
    timer = setInterval(() => {
        time--;
        timerElement.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            showCorrectAnswer(); // Automatically highlight correct answer when time is up
            nextButton.style.display = "block"; // Show Next button
        }
    }, 1000);
}

function showCorrectAnswer() {
    const correctAnswer = questions[currentQuestionIndex].answers.find(answer => answer.correct).text; // Get correct answer text
    const options = answerButtons.children; // Get all answer buttons

    for (let i = 0; i < options.length; i++) {
        if (options[i].textContent === correctAnswer) {
            options[i].classList.add("correct"); // Highlight correct answer
        } else {
            options[i].classList.add("incorrect"); // Highlight incorrect answers
        }
        options[i].disabled = true; // Disable buttons after timeout
    }
}

function selectAnswer(e) {
    clearInterval(timer); // Stop timer when an answer is selected
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

    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    let message = `You scored ${score} out of ${questions.length}!`;

    if (score >= 9) {
        message += "<br><strong>🎉 Discount will be provided soon!</strong>";
    }

    questionElement.innerHTML = message;
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
    document.getElementById("home-btn").style.display = "block";
}

function goHome() {
    window.location.href = "index1.html";
}

startQuiz();
