// Creating quiz class
class Quiz{
    constructor(questions){
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }
    getQuestionIndex(){
        return this.questions[this.questionIndex]
    }
    guess(answer){
        if(this.getQuestionIndex().isCorrectAnswer(answer)){
            this.score ++;
        }
        this.questionIndex ++;
    }
    isEnded(){
        return this.questionIndex === this.questions.length
    }
}

// Creating question class
class Question{
    constructor(text, choices, answer){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }
    isCorrectAnswer(choices){
        return this.answer === this.choices;
    }
}

// Display question
function displayQuestion(){
    if (quiz.isEnded()){
        showScores()
    }
    else{
        // show next question
        let questionElement = document.getElementById('question');
        // console.log(quiz.questions)
        // console.log(quiz.questionIndex)
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // Show options
        let choices = quiz.getQuestionIndex().choices;
        for(let i = 0; i < choices.length; i++){
            let choiceElement = document.getElementById('choice' + i);
            choiceElement.innerHTML = choices[i];
            guess('btn' + i, choices[i]);
        }
        showProgress();
    }
}

// Guess function
function guess(id, guess){
    let button = document.getElementById(id);
    button.onclick = function(){
        quiz.guess(guess);
        displayQuestion();
    }
}

// Show quiz progress
function showProgress(){
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById('progress')
    progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`
}

// Show score
function showScores(){
    let quizEndHTML = 
    `
        <h1> Quiz Completed </h1>
        <h2 id='score'> You Scored ${quiz.score} of ${quiz.questions.length}</h2>
        <div class='quiz repeat'> <a href='index.html'> Take Quiz Again </a> </div> 
    `;
    let quizElement = document.getElementById("quiz")
    quizElement.innerHTML = quizEndHTML;
    
}

// Create Quiz Questions
let questions = [
    new Question('Hyper Text Markup Language', ['jQuery', 'XHTML', 'CSS', 'HTML'], 'HTML'),

    new Question('Which is a type of a blockchain concesus mechanism', ['POA', 'XHTML', 'CSS', 'HTML'], 'POA'),

    new Question('Which is useful for styling', ['jQuery', 'XHTML', 'CSS', 'HTML'], 'CSS'),

    new Question('Which is a programming language', ['English', 'French', 'Arabic', 'Javascript'], 'Javascript'),

    new Question('Which word is most relevant in the web3 space', ['Decentralization', 'Naira', 'Javascript', 'Centralization'], 'Decentralization'),

    new Question('Which is the most recent version of Javascript', ['jQuery', 'ES5', 'ES6', 'ES4'], 'ES6'),
];



let quiz = new Quiz(questions);

// Display Question
displayQuestion();

// Countdown
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById('count-down')

function startCountdown(){
    let quizTimer = setInterval(function(){
        if (quizTime <= 0){
            clearInterval(quizTimer);
            showScores();
        }
        else{
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000)
}
startCountdown();