/*
    Author:     A.A.N.R. MAYADUNNE
    Date:       March 20th, 2023
    Purpose:    Required JS classes for Presentation page
    Copyright:  © 2023, All rights reserved
*/

const MAX_SITE_WIDTH    = 1000;
const SITE_TRANS_WIDTH  = 840;
const SITE_TRANS_WIDTH2 = 780;
const SITE_TRANS_WIDTH3 = 580;

class PlaceElements {

    timer; counter; box; elements;

    constructor() {
        this.timer = 0; this.counter = 0;
        this.box = { left: 0, top: 0, width: 0, height: 0 };

        this.countElement = document.getElementById("counter");

        this.elements = [{ element: document.getElementById("student-4") },
                         { element: document.getElementById("student-3") },
                         { element: document.getElementById("student-2") },
                         { element: document.getElementById("student-1") },
                        ];

        this.resetElements();
        this.startCountdownTimer();
    }

    resetElements() {
        if(innerWidth>SITE_TRANS_WIDTH+20) {
            this.box.top = 300; this.maxSize = 200;
            this.box.width = (innerWidth>MAX_SITE_WIDTH) ? MAX_SITE_WIDTH : innerWidth; this.box.height = 300;
            this.box.left = ((innerWidth-this.box.width)/2);
            for(let i=0; i<this.elements.length; i++) {
                const e = this.elements[i];
                this.setElementSize(e.element, 200, 200);
                this.setElementOnPoint(e.element, this.box.left + ((3-i)*(this.box.width/4)) + ((this.box.width/4)/2), this.box.top + (this.box.height/2));
                e.element.style.borderRadius = ".8rem";
            }
            document.body.style.height = `100vh`;
        } else {
            this.maxSize = (innerWidth>SITE_TRANS_WIDTH3) ? 200 : 150;
            this.box.top = (innerWidth>SITE_TRANS_WIDTH2) ? 280 : 340;
            this.box.width = innerWidth-10; this.box.height = 1700;
            this.box.left = ((innerWidth-this.box.width)/2);
            for(let i=0; i<this.elements.length; i++) {
                const e = this.elements[i];
                this.setElementSize(e.element, 300, 300);
                this.setElementOnPoint(e.element, this.box.left + (this.box.width/2), this.box.top + ((3-i)*(this.box.height/4)) + ((this.box.height/4)/2));
                e.element.style.borderRadius = ".8rem";
            }
            document.body.style.height = `${this.box.top + 1800}px`;
        }
        document.querySelectorAll(".student-card").forEach( e => { e.style.overflow = "visible"; });
        document.querySelectorAll(".student-card label, .student-card span, footer").forEach(e => {
            e.style.pointerEvents = "all"; e.style.opacity = "1"; 
        });
    }

    startCountdownTimer() {
        this.counter = 4;
        this.timer = setInterval(() => {
            if(this.counter==0) {
                window.location.href = "/student-2/main-page/main-page.html";
                clearInterval(this.timer);
                this.timer = 0;
                return;
            }
            this.counter--;
            if(this.counter==1)
                document.getElementById("timer-s2").innerText = " second";
            else
                document.getElementById("timer-s2").innerText = " seconds";
            this.countElement.innerText = `${this.counter}`;
        }, 1000);
    }

    setElementOnPoint(element, x, y) {
        element.left = x - (element.innerWidth/2);
        element.top = y - (element.innerHeight/2);
        element.style.left = `${element.left}px`;
        element.style.top = `${element.top}px`;
    }

    setElementSize(element, width, height) {
        element.innerWidth = width;
        element.innerHeight = height;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
    }
}

window.addEventListener("load", event => {
    const pElements = new PlaceElements();
    const stopButton = document.getElementById("stop-timer");
    stopButton.addEventListener("click", event => { 
        if(pElements.timer!=0) clearInterval(pElements.timer);
            pElements.timer = 0;
            if(stopButton.innerText=="Stop Timer") {
            pElements.countElement.innerText = "";
            document.getElementById("timer-s1").innerText = "Countdown timer stopped!";
            document.getElementById("timer-s2").innerText = "";
            stopButton.innerText = "Start Timer";
            stopButton.title = "Click here to start the countdown timer";
        } else {
            pElements.countElement.innerText = "4";
            document.getElementById("timer-s1").innerText = "You will be redirected in ";
            document.getElementById("timer-s2").innerText = " seconds";
            stopButton.innerText = "Stop Timer";
            stopButton.title = "Click here to stop the countdown timer";
            pElements.startCountdownTimer();
        }
    });

    window.addEventListener("resize", event => { pElements.resetElements(); });
});

