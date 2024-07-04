document.addEventListener('DOMContentLoaded', () => {

    let selectedCategory = null;
    let selectedDifficulty = null;
    let currentQuestionIndex = 0;
    let questions = [];
    let answers = {};

    // Select category buttons
    const categoryButtons = document.querySelectorAll('.category-selector__options .option__item');
    categoryButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            selectedCategory = event.target.getAttribute('id');
            checkSelections();
            console.log('Selected Category:', selectedCategory);
        });
    });

    // Select difficulty buttons
    const difficultyButtons = document.querySelectorAll('.difficulty-selector__options .option__item');
    difficultyButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            selectedDifficulty = event.target.getAttribute('id');
            checkSelections();
            console.log('Selected Difficulty:', selectedDifficulty);
        });
    });

    // Check if both selections are made
    function checkSelections() {
        if (selectedCategory && selectedDifficulty) {
            startQuizButton.disabled = false;
        } else {
            startQuizButton.disabled = true;
        }
    }

    // Get the elements where the quiz will be displayed
    const quizContainer = document.getElementById('quiz-container');
    const startQuizButton = document.getElementById('start-quiz');

    // Disable the start button initially
    startQuizButton.disabled = true;

    // Fetch questions from the Open Trivia Database API
    async function fetchQuestions() {
        if (selectedCategory && selectedDifficulty) {
            const apiUrl = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;
            try {
                console.log("URL:", apiUrl);
                const response = await fetch(apiUrl);
                const data = await response.json();
                questions = data.results;
                console.log(questions);
                displayQuestion(currentQuestionIndex);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        } else {
            alert('Please select a category and difficulty level.');
        }
    }

    // Function to display one question
    function displayQuestion(index) {
        const question = questions[index];
        if (!question) return;

        const correctAnswer = question.correct_answer;
        const incorrectAnswers = question.incorrect_answers.map(answer => answer);
        const allAnswers = [...incorrectAnswers, correctAnswer];
        shuffleArray(allAnswers);

        quizContainer.innerHTML = `
            <h2>${question.question}</h2>
            <div id="answers-container">
                ${allAnswers.map(answer => `<button class="answer-button" data-answer="${answer}">${answer}</button>`).join('')}
            </div>
            <button id="next-question" disabled>Next Question</button>
        `;

        // Add event listeners to answer buttons
        const answerButtons = document.querySelectorAll('.answer-button');
        answerButtons.forEach(button => {
            button.addEventListener('click', () => {
                handleAnswerClick(button, correctAnswer);
            });
        });

        // Add event listener to next question button
        const nextQuestionButton = document.getElementById('next-question');
        nextQuestionButton.addEventListener('click', () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion(currentQuestionIndex);
            } else {
                alert('Quiz completed!');
            }
        });
    }

    // Function to handle answer click
    function handleAnswerClick(button, correctAnswer) {
        const selectedAnswer = button.getAttribute('data-answer');
        const questionId = currentQuestionIndex + 1;
        answers[questionId] = (selectedAnswer === correctAnswer);

        if (selectedAnswer === correctAnswer) {
            button.classList.add('correct');
        } else {
            button.classList.add('not-correct');
        }

        // Disable all buttons after answer is selected
        document.querySelectorAll('.answer-button').forEach(btn => btn.disabled = true);
        const nextQuestionButton = document.getElementById('next-question');
        nextQuestionButton.disabled = false;
    }

    // Function to shuffle array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Add event listener to start quiz button
    startQuizButton.addEventListener('click', () => {
        console.log("Start quiz button clicked");
        fetchQuestions();
    });
});
