const quizData = [
    {
        question: 'Which of the following is NOT a valid JavaScript variable name?',
        options: ['myVariable', '1stVariable', 'var myVariable', '$myVariable'],
        answer: 'var myVariable',
    },
    {
        question: 'Which of the following is the correct syntax for a JavaScript function?',
        options: ['function myFunction(x, y) { return x + y; }', 'function myFunction(x, y { return x + y; }', 'function(myFunction(x, y) { return x + y; }', 'function(myFunction(x, y) { return x + y; }'],
        answer: 'function myFunction(x, y) { return x + y; }',
    },
    {
        question: 'Which of the following is the correct way to access an element in the DOM?',
        options: ['document.getElementById("myElement")', 'document.querySelector("#myElement")', 'document.getElementByName("myElement")', 'All of the above'],
        answer: 'All of the above',
    },
    {
        question: 'Which of the following is the correct way to add an event listener to an element?',
        options: ['document.getElementById("myElement").addEventListener("click", myFunction)', 'document.querySelector("#myElement").addEventListener("click", myFunction)', 'document.getElementByName("myElement").addEventListener("click", myFunction)', 'All of the above'],
        answer: 'Mount Everest',
    },
    {
        question: 'Which of the following is the correct way to create a new array?',
        options: [
            'var myArray = []',
            'var myArray = {}',
            'var myArray = function() {}',
            'var myArray = new Array()',
        ],
        answer: 'var myArray = []',
    },
    {
        question: 'Which of the following is the correct way to access an element in an array?',
        options: ['myArray[0]', 'myArray.0', 'myArray("0")', 'None of the above'],
        answer: 'myArray[0]',
    },
    {
        question: 'Which of the following is the correct way to loop over an array?',
        options: [
            'for (var i = 0; i < myArray.length; i++) { // code goes here }',
            'for (var i in myArray) { // code goes here }',
            'myArray.forEach(function(element) { // code goes here })',
            'All of the above',
        ],
        answer: 'All of the above',
    },
    {
        question: 'Which of the following is the correct way to create a new object?',
        options: ['var myObject = {}', 'var myObject = []', 'var myObject = function() {}', 'var myObject = new Object()'],
        answer: 'var myObject = {}',
    },
    {
        question: 'Which of the following is the correct way to access a property of an object?',
        options: [
            'myObject.property',
            'myObject["property"]',
            'myObject("property")',
            'All of the above',
        ],
        answer: 'All of the above',
    },
    {
        question: 'Which of the following is the correct way to call a function?',
        options: ['myFunction()', 'myFunction.call()', 'myFunction.apply()', 'All of the above'],
        answer: 'All of the above',
    },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }

    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();