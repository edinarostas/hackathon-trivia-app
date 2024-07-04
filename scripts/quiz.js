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
                ${allAnswers.map(answer => `<button class="main-selectors__btn answer-button" data-answer="${answer}">${answer}</button>`).join('')}
            </div>
            <button class="main-last-options__btn" id="next-question" disabled>Next Question</button>
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

    const scoreValue = document.querySelector('.header__score');
    // console.log(scoreValue)
    let currentScore = Number(scoreValue.innerText);
    console.log(currentScore)

    // Function to handle answer click
    function handleAnswerClick(button, correctAnswer) {
        const selectedAnswer = button.getAttribute('data-answer');
        const questionId = currentQuestionIndex + 1;
        answers[questionId] = (selectedAnswer === correctAnswer);

        if (selectedAnswer === correctAnswer) {
            button.classList.add('correct');
            currentScore = currentScore + 1000;
            scoreValue.innerText = currentScore;
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

    let userInfo = [
      {
        name: "Eberechi",
        score: 34547484
      },
      {
        name: "Edina",
        score:629723932
      },
      {
        name: "Haijing",
        score: 729176273
      }
  
    ];
  
    const form = document.getElementById('userForm');
    console.log(form);
    const nameInput = document.getElementById('name');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const userName = nameInput.value;
      console.log(`User name is ${userName}`);
  
      const userDetails = {
        name: userName,
        score: 0
      };
  
      userInfo.push(userDetails);
      form.reset();
    });
  
    console.log(userInfo);
  
    //get 'View Scores' button
    const viewScores = document.getElementById('view-scores');
  
    //get 'Scores' container
    const scoreContainer = document.getElementById('scores-container');
    scoreContainer.classList.add("scores")
    console.log(viewScores);
  
    // function for clicking on 'View Scores' button
    viewScores.addEventListener('click', () => {
      scoreContainer.innerHTML = ''
      const scoresLayout = document.createElement('div');
      scoresLayout.classList.add("scores__header-layout")
      const userHeader = document.createElement('h3');
      const scoreHeader = document.createElement('h3');
      scoreHeader.classList.add("scores__score-header")
  
      userHeader.innerText = "Player Name";
      scoreHeader.innerText = "Score";
  
      scoresLayout.append(userHeader, scoreHeader);
      scoreContainer.append(scoresLayout);
  
      userInfo.forEach((user) => {
        
        const userLayout = document.createElement('div');
        userLayout.classList.add("scores__score-layout");
        const player = document.createElement('p');
        player.classList.add("scores__user");
        const score = document.createElement('p');
  
        player.innerText = user.name;
        score.innerText = user.score;
  
        userLayout.append(player, score);
        scoreContainer.append(userLayout);
      })
    })
});
