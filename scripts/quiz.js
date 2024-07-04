// start quiz script
document.addEventListener('DOMContentLoaded', () => {
    // Adjust this element with the created html element id
    const questionContainer = document.getElementById('question-container');
    // Adjust this element with the created button html element id
    const nextButton = document.getElementById('next-button');
    let currentQuestionIndex = 0;
    let questions = [];

    // Fetch questions from the Open Trivia Database API
    async function fetchQuestions() {
        // Adjust url with category etc. what we decide on:
        const url = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple';
        try {
            const response = await fetch(url);
            const data = await response.json();
            questions = data.results;
            displayQuestion(currentQuestionIndex);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    }

    // Function to display one question
    function displayQuestion (index) {
        const question = questions[index];
        if (!question) return;
        
        //Adjust baased on question html structure
        questionContainer.innerHTML = `
            <h2>${question.question}</h2>
            ${question.incorrect_answers.map((answer, i) => `<p>${i + 1}. ${answer}</p>`).join('')}
            <p>${question.incorrect_answers.length + 1}. ${question.correct_answer}</p>
        `;
    }

    // Event listener for the next button
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
        } else {
            // Write function when there are no more questions, for example:
                // questionContainer.innerHTML = '<h2>Quiz Complete!</h2>';
                // nextButton.style.display = 'none';
        }
    });
    fetchQuestions();
});