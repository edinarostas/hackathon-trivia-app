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