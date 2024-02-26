/*
    Author:     A.A.N.R. MAYADUNNE
    Date:       March 3rd, 2023
    Purpose:    Required JS classes for Products page
    Copyright:  © 2023, All rights reserved
*/
import { Cart } from "./cart.js";

function print(msg) { console.log(msg); } 

class Products {

    productList = [];
    searchList = [];
    isReady = false;
    cart = new Cart();

    constructor() {
        this.fetchProductList();
    }

    fetchProductList() {
        this.isReady = false; this.productList = [];
        fetch("./products.json").then(response => {
            response.json().then( json => {
                if(Array.isArray(json)) {
                    this.showSearchMsg("", true);
                    this.productList = json; 
                    this.isReady = true;
                    const cat = document.getElementById("category");
                    if(window.location.search.toLowerCase()=="?category=packages") { cat.selectedIndex = 1; showCategory(); }
                    else if(window.location.search.toLowerCase()=="?category=hotels") { cat.selectedIndex = 2; showCategory(); }
                    else if(window.location.search.toLowerCase()=="?category=tickets") { cat.selectedIndex = 3; showCategory(); }
                    else if(window.location.search.toLowerCase()=="?category=transport") { cat.selectedIndex = 4; showCategory(); }
                    else { this.showProducts(""); }
                } else {
                    this.showSearchMsg("Product list is empty!", false);
                    this.productList = [];
                    this.isReady = true;
                }
            }, exp => { this.productList = []; this.isReady = true; this.showSearchMsg("Oops! Failed to load product list!", false); })
        }, exp => { this.productList = []; this.isReady = true; this.showSearchMsg("Oops! Failed to load product list!", false); })
    }

    showSearchMsg(msg, hide) {
       // if(window.location.pathname.toLowerCase()=="/products/checkout.html") return;
        let element = document.getElementById("search-status-msg");
        if(element==null) {
            document.getElementById("search-results").innerHTML = `<div id=\"search-status-box\"><label id=\"search-status-msg\"></label></div>`;
            element = document.getElementById("search-status-msg");
            if(element==null) return;
        }
        element.style.display = hide ? "none":"inline";
        element.innerText = msg;
    }

    searchProducts(searchq, catsId) {
        if(!this.isReady || !Array.isArray(this.productList)) return [];
        this.searchList = [];
        for(let product of this.productList) {
            let pstr;
            if(catsId==0) {
                pstr = String(product.category + " " + product.name + " " + product.description + " " + product.location + " " + product.unitPrice + " " + product.unitType).toLowerCase();
            } else if(catsId==1) {
                pstr = String(product.category).toLowerCase();
            } else if(catsId==2) {
                pstr = String(product.location).toLowerCase();
            } else if(catsId==3) {
                pstr = Number(product.unitPrice);
                if(pstr<=searchq) {
                    this.searchList.push(product);
                }
                continue;
            }
            if(searchq=="" || pstr.search(searchq)>=0) { this.searchList.push(product); }
        }
        return this.searchList;
    }

    showProducts(searchq, catsId) {
        const searchResults = document.getElementById("search-results"); if(searchResults==null) { return; }
        searchResults.innerHTML = "";
        this.searchProducts(searchq, catsId); if(this.searchList.length<1) { this.showSearchMsg("Product list is empty!", false); return; }
        for(let index=0; index<this.searchList.length; index++) {
            const cobj = this.searchList[index];
            let itemData = `
            <div id="product-${cobj.id}" class="product-thumbnail">
                <label id="pname-${cobj.id}" class="product-name-class-${String(cobj.category).toLowerCase()}">${cobj.name}</label>
                <label id="ploc-${cobj.id}" hidden>${String(cobj.location).toLowerCase()}</label>
                <label id="pprice-${cobj.id}" class="product-price-class">${cobj.unitPrice} USD</label>
                <label id="punit-${cobj.id}" class="price-type-class">/${cobj.unitType}</label>
                <select id="pqty-${cobj.id}" name="product-quantity" class="pquantity-class">
                    <option value="1">1 Item only</option>
                    <option value="2">2 Items only</option>
                    <option value="3">3 Items only</option>
                    <option value="4">4 Items only</option>
                    <option value="5">5 Items only</option>
                </select>
                <button id="pbtn-${cobj.id}" class="cart-button-class">+ Add this item to Cart</button>    
            </div>
            `;
            const productThumbnail = new DOMParser().parseFromString(itemData, "text/html").body.querySelector("div");
            productThumbnail.style.backgroundImage = `url("${cobj.imageUrl}")`;
            searchResults.appendChild(productThumbnail);

            document.getElementById(`pbtn-${cobj.id}`).addEventListener("mouseup", () => {
                let qty = document.getElementById(`pqty-${cobj.id}`).value;
                let sItem = this.searchList[index];
                this.cart.addItem({
                    id: sItem.id,
                    category: sItem.category,
                    name: sItem.name,
                    description: sItem.description,
                    location: sItem.location,
                    imageUrl: sItem.imageUrl,
                    unitPrice: (sItem.unitPrice*qty), 
                    unitType: ((qty>1) ? (`${qty} ` + sItem.unitType + "s"): sItem.unitType) 
                });
                this.cart.setCartCount();
                this.cart.showCartPopup();

            });

        }
    }
}

window.addEventListener("load", event => {
    const products = new Products();

    document.getElementById("search-button").addEventListener("click", () => {
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("location").selectedIndex = 0;
        document.getElementById("price-range").value = "1000";
        showSearchResults();
    });

    document.getElementById("search-text").addEventListener("keyup", event => {
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("location").selectedIndex = 0;
        document.getElementById("price-range").value = "1000";
        event.preventDefault();
        if(event.keyCode === 13) { showSearchResults(); }
    });

    document.getElementById("category").addEventListener("change", event => {
        document.getElementById("search-text").value = "";    
        document.getElementById("location").selectedIndex = 0;
        document.getElementById("price-range").value = "1000";
        showCategory();
    });

    document.getElementById("location").addEventListener("change", event => {
        document.getElementById("search-text").value = "";    
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("price-range").value = "1000";
        showLocation();
    });

    document.getElementById("price-range").addEventListener("change", event => {
        document.getElementById("search-text").value = "";    
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("location").selectedIndex = 0;
        showRange();
    });

    function showCategory() {
        let q = document.getElementById("category").value.trim().toLowerCase();
        products.showProducts(q, 1);    
    }

    function showLocation() {
        let q = document.getElementById("location").value.trim().toLowerCase();
        products.showProducts(q, 2);    
    }
    function showRange() {
        let q = document.getElementById("price-range").value;
        products.showProducts(q, 3);    
    }

    function showSearchResults() {
        let q = document.getElementById("search-text").value.trim().toLowerCase();
        products.showProducts(q, 0);
        
    }

});