
/*
    Author:     A.A.N.R. MAYADUNNE
    Date:       March 15th, 2023
    Purpose:    Required JS class to manage cart
    Copyright:  © 2023, All rights reserved
*/

let isCartOpen = false; 
let cartHeight = "3.8rem";

export class productItem {
    id = 0;
    category = "";
    name = "";
    description = "";
    location = "";
    imageUrl = "";
    unitPrice = 0; // in USD
    unitType = "";
}

export class Cart {

    constructor() {
        //  localStorage.clear(); // Only for testing purposes
    }

    get getCart() {
        try {
            let cartData = JSON.parse(localStorage.getItem("cartdata"));
            return Array.isArray(cartData) ? cartData:[]; 
        } catch(exp) {
            return [];
        }
    }

    get isCartActive() { return isCartOpen; }
    setCartActive(activeVal) { isCartOpen = activeVal; }

    get getCartHeight() { return cartHeight; }

    get itemCount() { return this.getCart.length; }
    
    clear() { localStorage.removeItem("cartdata"); }

    addItem(item) {
        let cartData = this.getCart;
        cartData.push(item);
        localStorage.setItem("cartdata", JSON.stringify(cartData));
    }

    removeItem(index) {
        let cartData = this.getCart;
        if(index<0 || index>=cartData.length) return;
        cartData.splice(index, 1);
        localStorage.setItem("cartdata", JSON.stringify(cartData));
    }

    getItem(index) {
        let cartData = this.getCart;
        if(index<0 || index>=cartData.length) return null;
        return cartData[index];
    }

    updateItem(index, item) {
        let cartData = this.getCart;
        if(index<0 || index>=cartData.length) return;
        cartData[index] = item;
        localStorage.setItem("cartdata", JSON.stringify(cartData));
    }    

    getElementForPopup(cobj, index) {
        let itemData = `
        <div id="cartitem-${cobj.id}" class="cart-list-item">
            <div id="cartimg-${cobj.id}" style="background-image: url('${cobj.imageUrl}');">
            <label id="cartname-${cobj.id}" class="cart-pname-default">${cobj.name}</label>
            <label id="cartdesc-${cobj.id}" class="cart-pdesc-default">${cobj.description}</label>
            <label id="cartprice-${cobj.id}" class="cart-pprice-default">${cobj.unitPrice} USD</label>
            <label id="cartunits-${cobj.id}" class="cart-punits-default">/${cobj.unitType}</label>
            <button id="cartbtn-${cobj.id}" class="cart-pbtn-default" title="Remove this item from cart">-</button>
        </div>
    `;
        const dParser = new DOMParser().parseFromString(itemData, "text/html");
        dParser.body.querySelector("div > button").addEventListener("click", event => {
            this.removeItem(index);
            this.setCartCount();
            this.showCartPopup();
        });
        return dParser.body.querySelector("div");
    }

    initCartHeader() {
        const hdr = new DOMParser().parseFromString(`
        <div id="cart" class="cart-popup">
            <div id="cart-header">
                <label id="cart-item-count">Item Count: <span id="citem-countx">0</span></label>
                <label id="cart-sub-total">Sub Total: <span id="ctotalx">0 USD</span></label>
                <button id="checkcout" class="button-default">Checkout</button>
            </div>
            <label>Your cart is empty!</label>
            <div id="cart-body">
            </div>
        </div>`, "text/html");
        document.querySelector("header").appendChild(hdr.body.querySelector("div"));    
        document.getElementById("checkcout").addEventListener("click", event => {
            if(this.itemCount>0) {
                window.location.href = "/student-1/products/checkout.html";
            } else {
                window.alert("Sorry! your cart is empty!");
            }
        });

        window.addEventListener("mousedown", event => {
            const cartPopup = document.getElementById("cart");
            if(isCartOpen && !cartPopup.contains(event.target) && !document.getElementById("cart-icon").contains(event.target)) {
                isCartOpen = false;
                cartPopup.style.height = 0;
            }
        });
    }
    
    setCartCount() {
        const cartPopup = document.getElementById("cart");
        const emptyLabel = document.querySelector("#cart > label");
        const cartHeader = document.getElementById("cart-header");
        const cartCount = document.getElementById("cart-count");
        const cartNotif = document.getElementById("cart-notif");
        const cartBody = document.getElementById("cart-body");
        const cartPopVal = document.getElementById("citem-countx");
        const cartTotalVal = document.getElementById("ctotalx");
        cartBody.innerHTML = "";
    
        let cartData = this.getCart;
        if(cartData.length>0) {
            let totalx = 0;
            for(let index=0; index<cartData.length; index++) {
                totalx += cartData[index].unitPrice;
                cartBody.appendChild(this.getElementForPopup(cartData[index], index));
            }
            cartNotif.style.display = "block";
            cartHeader.style.display = "flex";
            cartCount.innerText = cartData.length;
            cartPopVal.innerText = cartData.length;
            cartTotalVal.innerText = `${totalx} USD`;
            cartCount.style.display = "block";
            emptyLabel.style.display = "none";
            cartHeight = cartData.length>5 ? "30rem": `${(5+ cartData.length*4.5)}rem`;
        } else {
            cartNotif.style.display = "none";
            cartCount.style.display = "none";
            cartPopVal.innerText = "0";
            cartTotalVal.innerText = "0 USD";
            cartHeader.style.display = "none";
            emptyLabel.style.display = "block";
            cartHeight = "3.8rem";
        }
        cartPopup.style.height =  isCartOpen ? cartHeight: "0";
        if((window.location.pathname.toLowerCase()=="/student-1/products/checkout.html" || window.location.pathname.toLowerCase()=="/student-1/products/confirm.html") && cartData.length<1) {
            window.location.href = "/student-1/products/products.html";
        };

    } 

    showCartPopup() {
        const cartPopup = document.getElementById("cart");
        let cartData = this.getCart;
        if(cartData.length>0) {
            cartHeight = cartData.length>5 ? "30rem": `${(5+ cartData.length*4.5)}rem`;
        } else {
            cartHeight = "3.8rem";
        }
        isCartOpen = true;
        cartPopup.style.height = cartHeight;
    }
}

