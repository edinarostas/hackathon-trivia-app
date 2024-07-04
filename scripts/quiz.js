// start quiz script
document.addEventListener('DOMContentLoaded', () => {

    let selectedCategory = null;
    let selectedDifficulty = null;
  
    // Select category buttons
    const categoryButtons = document.querySelectorAll('.category-selector__options .option__item');
    categoryButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        selectedCategory = event.target.getAttribute('id');
        console.log('Selected Category:', selectedCategory);
      });
    });
  
    // Select difficulty buttons
    const difficultyButtons = document.querySelectorAll('.difficulty-selector__options .option__item');
    difficultyButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        selectedDifficulty = event.target.getAttribute('id');
        console.log('Selected Difficulty:', selectedDifficulty);
      });
    });

    //get the element where the quiz to be displayed
    const questionContainer = document.getElementById('question-container');

    const startQuiz = document.getElementById('start-quiz');
    let currentQuestionIndex = 0;
    let questions = [];

    // Fetch questions from the Open Trivia Database API
    async function fetchQuestions() {
        if (selectedCategory && selectedDifficulty !== null) {
            const apiUrl = `https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`;
            try {
                console.log("url:" + apiUrl)
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

    startQuiz.addEventListener('click', () => {
        console.log("start quiz button clicked")
        fetchQuestions();
    });
});