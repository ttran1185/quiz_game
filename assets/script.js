const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const ansA = document.getElementById("A");
const ansB = document.getElementById("B");
const ansC = document.getElementById("C");
const ansD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
//const resetQuiz = document.getElementById("Reset");

let questions = [
    {
        question : "What is Javascript?",
        ansA : "A video file",
        ansB : "A GIF",
        ansC : "A window's program",
        ansD : "A Programming language",
        correct : "D"
    },{
        question : "What is the tag for Javascript in HTML?",
        ansA : "script",
        ansB : "js",
        ansC : "java",
       ansD : "sytle",
        correct : "A"
    },{
        question : "What is an array?",
        ansA : "Different options to display a webpage",
        ansB : "A specipal variable that holds more than one value",
        ansC : "CSS option for color options",
        ansD : "A HTML Table",
        correct : "B"
    },{
      question : "What is a 'for' loop",
      ansA : "A way to connect HTML and Javascript",
      ansB : "Code to repeat a block of code multiple times",
      ansC : "A CSS term",
      ansD : "An option to add slideshow to a page",
      correct : "B"
    },{
     question : "Which one of these is an Array method?",
     ansA : "pop()",
     ansB : "push()",
     ansC : "shift()",
     ansD : "All of the above",
     correct : "D"
    },{
    question : "Which statment below is true within Javascript?",
    ansA : "These are objects: Object, Date, Array, String, Number, Boolean",
    ansB : "The Math object allows you to perform mathematical calulations",
    ansC : "There is only generally 1 type of date input format",
    ansD : "Boolean values represent: 'yes, no, maybe'",
    correct : "A"
    }
];


const lastQuestion = questions.length - 1;
let runQuestion = 0;
let count = 0;
const questionTime = 10; 
const gaugeWidth = 100; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";

    ansA.innerHTML = q.ansA;
    ansB.innerHTML = q.ansB;
    ansC.innerHTML = q.ansC;
    ansD.innerHTML = q.ansD;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}


function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        answerWrong();
        if(runQuestion < lastQuestion){
            runQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        }
    }
}



function checkAnswer(answer){
    if( answer == questions[runQuestion].correct){
        score++;
        answerCorrect();
    }else{
        answerWrong();
    }
    count = 0;
    if(runQuestion < lastQuestion){
        runQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}


function answerCorrect(){
    document.getElementById(runQuestion).style.backgroundColor = "#009900";
}

function answerWrong(){
    document.getElementById(runQuestion).style.backgroundColor = "#cc0000";
}


function scoreRender(){
    scoreDiv.style.display = "block";
        const scorePerCent = Math.round(100 * score/questions.length);
        scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
 
}

//function resetQuiz(){
    //document.getElementById("reset").innerHTML = reset;
//}
//document.getElementById("Reset").addEventListener("click", resetQuiz);
