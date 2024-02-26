/*
    Author:     A.A.N.R. MAYADUNNE
    Date:       March 1st, 2023
    Purpose:    Required JS classes for language, theme and cart management of all pages
    Copyright:  © 2023, All rights reserved
*/
import {Cart} from "./products/cart.js";
import {Languages} from "./lang.js";
import {setThemeHeader} from "/student-4/theme.js";

window.onload = () => {

    const cart = new Cart();

    if((window.location.pathname.toLowerCase()=="/student-1/products/checkout.html" || window.location.pathname.toLowerCase()=="/student-1/products/confirm.html") && cart.itemCount<1) {
        window.location.href = "/student-1/products/products.html";
        return;
    }
    cart.initCartHeader();
    cart.setCartCount();
    setThemeHeader();
    
    if(window.location.pathname.toLowerCase()=="/student-1/products/checkout.html") {
        let totalx = 0;
        let cartData = cart.getCart;
        if(cartData.length>0) {
            for(let index=0; index<cartData.length; index++) totalx += cartData[index].unitPrice;
        }
        document.getElementById("item-countz").innerText = cartData.length;
        document.getElementById("total-pricez").innerText = `${totalx} USD`;
    }

    document.getElementById("cart-icon").addEventListener("click", event => {
        const pCart = document.getElementById("cart");
        cart.setCartActive(!cart.isCartActive);
        if(cart.isCartActive) {
          
       }
        pCart.style.height = cart.isCartActive ? cart.getCartHeight: "0";
    });
    
    const lang = new Languages();
    document.getElementById("lang-select").addEventListener("change", event => {
        let selIndex = document.getElementById("lang-select").selectedIndex;
        if(selIndex<0 || selIndex>2) return;
        lang.setLanguageId(selIndex);
        lang.loadLanguage(false);
    });
    
}

