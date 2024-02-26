
/*
    Author:     A.A.N.R. MAYADUNNE
    Date:       March 15th, 2023
    Purpose:    Required JS class to validate checkout form
    Copyright:  © 2023, All rights reserved
*/

import {Cart} from "./cart.js"

let refNumber = parseInt(Math.floor(Math.random() * 1000).toFixed(3)) + "-" + parseInt(Math.floor(Math.random() * 1000).toFixed(3)) + "-" + parseInt(Math.floor(Math.random() * 1000).toFixed(3));
const cart = new Cart();

class ValidateCheckoutPage {

    timer;

    constructor() {
        if(window.location.pathname.toLowerCase()=="/student-1/products/confirm.html") {
            document.getElementById("confirm-button").addEventListener("click", event => {
                cart.clear();
                try {
                    localStorage.removeItem("ref-num");
                    localStorage.removeItem("item-countz");
                    localStorage.removeItem("total-pricez");
                    localStorage.removeItem("card-num");
                    localStorage.removeItem("card-name");
                    localStorage.removeItem("card-addr");
                    localStorage.removeItem("card-tel");
                    localStorage.removeItem("card-email");
                } catch(e) {}
                window.alert("Thanks for your purchase. Have a nice day!");
                window.location.href = "/student-1/products/products.html";
                return;
            });
            try{
                document.getElementById("ref-num").innerText =localStorage.getItem("ref-num");
                document.getElementById("item-countz").innerText =localStorage.getItem("item-countz");
                document.getElementById("total-pricez").innerText =localStorage.getItem("total-pricez");
                document.getElementById("card-num").innerText = "XXXX-XXXX-XXXX-" + localStorage.getItem("card-num");
                document.getElementById("card-name").innerText =localStorage.getItem("card-name");
                document.getElementById("card-addr").innerText =localStorage.getItem("card-addr");
                document.getElementById("card-tel").innerText =localStorage.getItem("card-tel");
                document.getElementById("card-email").innerText =localStorage.getItem("card-email");
            } catch(e) {}
            return;
        }

        let submitButton = document.getElementById("submit-button")
        submitButton.disabled = true;
        submitButton.className = "button-disabled";
        submitButton.style.pointerEvents = "none";
        document.getElementById("ref-num").innerText = refNumber;

        document.getElementById("submit-button").addEventListener("click", event => {

            localStorage.setItem("ref-num", refNumber);
            localStorage.setItem("item-countz", document.getElementById("item-countz").innerText);
            localStorage.setItem("total-pricez", document.getElementById("total-pricez").innerText);
            localStorage.setItem("card-num", document.getElementById("cnumber").value.substring(15));
            localStorage.setItem("card-name", document.getElementById("cname").value);
            localStorage.setItem("card-addr", document.getElementById("caddress").value + ", " + document.getElementById("ctown").value + ", " + document.getElementById("cstate").value + ", " + document.getElementById("czip").value + ", " + document.getElementsByName("ccountry")[0].value + ".");
            localStorage.setItem("card-tel", document.getElementById("ctel").value);
            localStorage.setItem("card-email", document.getElementById("cemail").value);

            document.getElementById("checkout-container").submit();             
        });

        document.getElementById("ccountry").selectedIndex = 212;
        document.getElementById("cnumber").addEventListener("focusout", event => { this.validateCreditCard(); });
        document.getElementById("cname").addEventListener("focusout", event => { this.validateCardHoldersName(); });
        document.getElementById("cexp").addEventListener("focusout", event => { this.validateExpiryDate(); });
        document.getElementById("csec").addEventListener("focusout", event => { this.validateSecurityCode(); });
        document.getElementById("caddress").addEventListener("focusout", event => { this.validateAddress(); });
        document.getElementById("ctown").addEventListener("focusout", event => { this.validateTown(); });
        document.getElementById("cstate").addEventListener("focusout", event => { this.validateState(); });
        document.getElementById("czip").addEventListener("focusout", event => { this.validateZip(); });
        document.getElementById("ctel").addEventListener("focusout", event => { this.validatePhoneNumber(); });
        document.getElementById("cemail").addEventListener("focusout", event => { this.validateEmail(); });
        document.getElementById("slide-5").addEventListener("change", event => { 
            this.callTimeoutFunc();
        });

        document.getElementById("cnumber").addEventListener("input", event => { this.resetClass("f-elem2"); });
        document.getElementById("cname").addEventListener("input", event => { this.resetClass("f-elem21"); });
        document.getElementById("cexp").addEventListener("input", event => { this.resetClass("f-elem22"); });
        document.getElementById("csec").addEventListener("input", event => { this.resetClass("f-elem23"); });
        document.getElementById("caddress").addEventListener("input", event => { this.resetClass("f-elem3"); });
        document.getElementById("ctown").addEventListener("input", event => { this.resetClass("f-elem31"); });
        document.getElementById("cstate").addEventListener("input", event => { this.resetClass("f-elem32"); });
        document.getElementById("czip").addEventListener("input", event => { this.resetClass("f-elem33"); });
        document.getElementById("ctel").addEventListener("input", event => { this.resetClass("f-elem4"); });
        document.getElementById("cemail").addEventListener("input", event => { this.resetClass("f-elem41"); });
    }

    resetClass(elemCat) {
        if(document.getElementById(elemCat).className != "form-element") {
            document.getElementById(elemCat).className = "form-element";             
        }
        this.callTimeoutFunc();
    }

    callTimeoutFunc() {
        if(this.timer!=0) clearTimeout(this.timer); this.timer = 0;
        this.timer = setTimeout(() => {
            const submitButton = document.getElementById("submit-button");
            if(this.isAllGreen()) {
                if(submitButton.className!="button-enabled") {
                    submitButton.className = "button-enabled";
                    submitButton.style.pointerEvents = "all";
                    submitButton.disabled = false;
                }
            } else {
                if(submitButton.className!="button-disabled") {
                    submitButton.className = "button-disabled";
                    submitButton.style.pointerEvents = "none";
                    submitButton.disabled = true;
                }
            }
        }, 250);
    }

    isAllGreen() {
        if(document.getElementById("f-elem2").className == "form-element-3" &&
        document.getElementById("f-elem21").className == "form-element-3" &&
        document.getElementById("f-elem22").className == "form-element-3" &&
        document.getElementById("f-elem23").className == "form-element-3" &&
        document.getElementById("f-elem3").className == "form-element-3" &&
        document.getElementById("f-elem31").className == "form-element-3" &&
        document.getElementById("f-elem32").className == "form-element-3" &&
        document.getElementById("f-elem33").className == "form-element-3" &&
        document.getElementById("f-elem4").className == "form-element-3" &&
        document.getElementById("f-elem41").className == "form-element-3" &&
        document.getElementById("slide-5").checked == true) {
            return true;
        }
        return false;
    }

    validateInput(elemName, elemCat, rgx, toUpp) {
        let element = document.getElementById(elemName);
        element.value = element.value.trim();
        if(element.value.match(rgx)) {
            document.getElementById(elemCat).className = "form-element-3";             
            if(toUpp) element.value = element.value.toUpperCase();
        } else {
            document.getElementById(elemCat).className = "form-element-2";             
        }

        const submitButton = document.getElementById("submit-button");
        if(this.isAllGreen()) {
            if(submitButton.className!="button-enabled") {
                submitButton.className = "button-enabled";
                submitButton.style.pointerEvents = "all";
                submitButton.disabled = false;
            }
        } else {
            if(submitButton.className!="button-disabled") {
                submitButton.className = "button-disabled";
                submitButton.style.pointerEvents = "none";
                submitButton.disabled = true;
            }
        }
    }

    validateCreditCard() {  this.validateInput("cnumber", "f-elem2", /\d{4}-\d{4}-\d{4}-\d{4}/, false); }
    validateCardHoldersName() {  this.validateInput("cname", "f-elem21", /^[a-zA-Z .]+$/, true); }
    validateExpiryDate() {  this.validateInput("cexp", "f-elem22", /^\d{2}\/\d{2}$/, false); }
    validateSecurityCode() {  this.validateInput("csec", "f-elem23", /^\d{3}$/, false); }
    validateAddress() {  this.validateInput("caddress", "f-elem3", /^[a-zA-Z0-9 ,.\\/-]+$/, false); }
    validateTown() {  this.validateInput("ctown", "f-elem31", /^[a-zA-Z .]+$/, false); }
    validateState() {  this.validateInput("cstate", "f-elem32", /^[a-zA-Z .]+$/, false); }
    validateZip() {  this.validateInput("czip", "f-elem33", /^\d{5}$/, false); }
    validatePhoneNumber() {  this.validateInput("ctel", "f-elem4", /^\d{10}$/, false); } 
    validateEmail() {  this.validateInput("cemail", "f-elem41", /^[0-9a-zA-Z.+-]+@[0-9a-zA-Z.+-]+\.[0-9a-zA-Z]+$/, false); }
};

const checkout = new ValidateCheckoutPage();


