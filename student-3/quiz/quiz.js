/*
    Author:     A.L.A. FALIH
    Date:       March 31st, 2023
    Purpose:    Common CSS styles for all pages
    Copyright:  © 2023, All rights reserved
*/
const quizData = [
    {
        question: "Where does The Elephant Gathering (billed as one of the worlds' greatest animal spectacles) take place every year?",
        a: "Yala National Park",
        b: "Minneriya National Park",
        c: "Udawalawe National Park",
        d: "Wilpattu National Park",
        correct: "a",
        answered: "",
        timespent: 0
    },
    {
        question: "Sri Lanka has an unparalleled rate of species endemism per land area, higher than even Madagascar or Borneo. How many birds do you think are endemic to Sri Lanka?",
        a: "78",
        b: "42",
        c: "33",
        d: "29",
        correct: "b",
        answered: "",
        timespent: 0
    },
    {
        question: "A word used in Sri Lanka to greet someone. It means Long Life. One is generally greeted by joining two hands in a prayer-like manner. What is this traditional Sri Lankan greeting?",
        a: "Jumbo",
        b: "Ayubowan",
        c: "Bohoma Isthuthi",
        d: "Takahiri",
        correct: "b",
        answered: "",
        timespent: 0
    },
    {
        question: "It was in 1954 that her Royal Majesty, Queen Elizabeth first visited this regal mansion, on an Easter Sunday, to enjoy a cup of fresh Ceylon tea during her visit to Sri Lanka and she wasn’t the only royalty to visit the luxury heritage Hotel in the hills. Which of these hotels continues to be a favorite among VIPs? ",
        a: "The Grand Hotel Nuwara Eliya",
        b: "Ferncliff Bungalow Nuwara Eliya",
        c: "The Hill Club Nuwara Eliya",
        d: "Jetwing St. Andrews Nuwara Eliya",
        correct: "d",
        answered: "",
        timespent: 0
    },
    {
        question: "What is the name of King Kasyapa's Fortress?",
        a: "Lion Rock",
        b: "Tiger Rock",
        c: "Elephant Rock",
        d: "Fox Rock",
        correct: "a",
        answered: "",
        timespent: 0
    },
    {
        question: "Sri Lanka is known for exporting tea, coffee, rubber and cinnamon, but only one of them is native to the island. Which one?",
        a: "Tea",
        b: "Coffee",
        c: "Rubber",
        d: "Cinnamon",
        correct: "d",
        answered: "",
        timespent: 0
    },
    {
        question: "What is the legislative capital city of Sri Lanka?",
        a: "Colombo",
        b: "Sri Jayawardanapura Kotte",
        c: "Galle",
        d: "Kalutara",
        correct: "b",
        answered: "",
        timespent: 0
    },
    {
        question: "How many districts are there in Sri Lanka?",
        a: "25",
        b: "24",
        c: "26",
        d: "23",
        correct: "a",
        answered: "",
        timespent: 0
    },
    {
        question: "Sri Lanka's original name of Ceylon comes from Ceilão, which was given to the island in 1505 by settlers from which European country?",
        a: "England",
        b: "Spain",
        c: "Portugal",
        d: "Sokovia",
        correct: "c",
        answered: "",
        timespent: 0
    },
    {
        question: "What is the tallest mountain in Sri Lanka?",
        a: "Pidurutalagala",
        b: "Adam's Peak",
        c: "Kirigalpotha",
        d: "Thotupola",
        correct: "a",
        answered: "",
        timespent: 0
    },
];


const MAX_TIME_ALLOWED = 60; // in seconds
let qtime = 0; // time spent for each question, in seconds
let questionId = 0; // current question id
let timerId;

function hideAll() {
    document.getElementById("landing-div").hidden = true;
    document.getElementById("rules-div").hidden = true;
    document.getElementById("quiz-div").hidden = true;
    document.getElementById("performance-div").hidden = true;
    document.getElementById("answers-div").hidden = true;
}


function show(showdiv) {
    hideAll();

    if(showdiv!="quiz-div") {
        qtime = 0;
        questionId = 0; 
    }
    
    if(showdiv=="rules-div") {
        quizData.forEach( obj => {
            obj.timespent = 0; 
            obj.answered = ""; 
        });
    }

    else if(showdiv=="performance-div") { 

        let totaltime = 0; 
        let totalcorrect = 0;
        
        quizData.forEach( obj => {
            totaltime += obj.timespent; 
            totalcorrect += obj.answered==obj.correct? 1:0; 

        });

        document.getElementById("perform-time-left").innerText = "Total time left: " + totaltime;
        document.getElementById("correct-count").innerText = "Score: " + totalcorrect + "/out of 10";
    }

    else if(showdiv=="answers-div") { 
        let ans = document.getElementById("answers-div");
        let s = "";
        let count = 0;

        quizData.forEach( obj => {
            count++;
            s += "<h3>Question " + count + ": " + obj.question + "</h3><br>";
            s += "<p> ✎ Your answer: " + obj.answered + " <br> ✅ Correct answer: " + obj.correct + " </p><br>";
        });
        s += "        <button id=\"goto-main2\" onclick=\"show('landing-div')\">Go to Main</button>";
        ans.innerHTML = s;
    }


    document.getElementById(showdiv).hidden = false;
}


function showNextQuetion() {
    hideAll();

    if(questionId>0) {
        const answer = document.querySelector('input[name="answer"]:checked');  
        if(answer==null && qtime!=MAX_TIME_ALLOWED) {
            window.alert("Please select an answer to continue!");
            document.getElementById("quiz-div").hidden = false;
            return;
        }
        if(answer!=null) { quizData[(questionId-1)].answered = answer.id; }
        quizData[(questionId-1)].timespent = qtime;
        clearInterval(timerId);
        timerId = undefined;

        //Following if else code block is only for testing
        if(qtime!=MAX_TIME_ALLOWED) {
            if(answer.id==quizData[(questionId-1)].correct) { //is the answer correct?
                window.alert("Yeah!! Its correct! :D");
            } else {
                window.alert("Ohh!! Its incorrect! :(");
            }
        }
        if(questionId==quizData.length) {
            show("performance-div");
            return;
        }
    }

    if(quizData.length<1 || questionId>=quizData.length) {
        document.getElementById('landing-div').hidden = false;
        return;
    }
    
    qtime = 0;
    document.getElementById("time-left-value").innerText = MAX_TIME_ALLOWED;
    document.getElementById("submit").innerText = "Next";
    document.getElementById("question").innerText = quizData[questionId].question;
    document.getElementById("a").checked = false;
    document.getElementById("b").checked = false;
    document.getElementById("c").checked = false;
    document.getElementById("d").checked = false;

    document.getElementById("a_text").innerText = quizData[questionId].a;
    document.getElementById("b_text").innerText = quizData[questionId].b;
    document.getElementById("c_text").innerText = quizData[questionId].c;
    document.getElementById("d_text").innerText = quizData[questionId].d;
    document.getElementById("question-number").innerText = "Question: " + (questionId+1) + "/" + quizData.length;
    if(questionId==(quizData.length-1)) {
        document.getElementById("question-error").innerText = "LastQ";
        document.getElementById("submit").innerText = "Submit";
    }
    
    questionId++;

    timerId = setInterval( ()=> {
        qtime++;
        let timval = (MAX_TIME_ALLOWED - qtime);
        if(timval<0) { timval = 0; }
        document.getElementById("time-left-value").innerText = timval;
        if((MAX_TIME_ALLOWED-qtime)<0) {
            qtime = MAX_TIME_ALLOWED;
            clearInterval(timerId);
            timerId = undefined;
            window.alert("Time is up!");
            showNextQuetion();
        }
        
    }, 1000);

    document.getElementById('quiz-div').hidden = false;
}
