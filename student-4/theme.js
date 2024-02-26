/*  Author:     YASANTH DOLAMULLA
    Date:       March 20th, 2023
    Purpose:    Required JS classes for theme management */
let isThemeOpen = false;
export function setThemeHeader() {
    const themeheader = new DOMParser().parseFromString(`
    <div id="theme" class="theme-popup">
        <label>Select Color Profile</label>
        <div id="theme-header">
            <div> 
                <input type="radio" id="theme-1" name="theme-value" value="0" checked>
                <label for="theme-1">Default</label>
            </div>
            <div> 
                <input type="radio" id="theme-2" name="theme-value" value="1">
                <label for="theme-2">Dark</label>
            </div>
            <div> 
                <input type="radio" id="theme-3" name="theme-value" value="2">
                <label for="theme-3">Light</label>
            </div>
            <div> 
                <input type="radio" id="theme-4" name="theme-value" value="3">
                <label for="theme-4">Fancy</label>
            </div>
        </div>
    </div>`,
    "text/html"
    );
    
    let themeH = themeheader.body.querySelector("div");
    
    document.querySelector("header").appendChild(themeH); 

    document.querySelectorAll("#theme-header input[type=radio]").forEach(
        element => { 
        
        element.addEventListener("change", 
            event => {
            if(element.value==0) {
                document.querySelector("html").removeAttribute("class");
                localStorage.removeItem("theme");
            } else if(element.value==1) {
                document.querySelector("html").setAttribute("class", "dark-theme");
                localStorage.setItem("theme", "1");
            } else if(element.value==2) {
                document.querySelector("html").setAttribute("class", "light-theme");
                localStorage.setItem("theme", "2");
            } else if(element.value==3) {
                document.querySelector("html").setAttribute("class", "fancy-theme");
                localStorage.setItem("theme", "3");
            }
        }
        );
    }
    );

    document.getElementById("theme-icon").addEventListener("click", event => {
        isThemeOpen = !isThemeOpen;
        document.getElementById("theme").style.height =  isThemeOpen ? "7.5rem": "0";        
    });

    window.addEventListener("mousedown", 
        event => {
        const themePopup = document.getElementById("theme");
        if(isThemeOpen && !themePopup.contains(event.target) && !document.getElementById("theme-icon").contains(event.target)) {
            isThemeOpen = false;
            themePopup.style.height = 0;
        }
    }
    );
    
    try {
        let themeId = localStorage.getItem("theme");
        if(themeId==1) {
            document.querySelector("html").setAttribute("class", "dark-theme");
            document.querySelectorAll("#theme-header input[type=radio]")[1].checked = true;
        } else if(themeId==2) {
            document.querySelector("html").setAttribute("class", "light-theme");
            document.querySelectorAll("#theme-header input[type=radio]")[2].checked = true;
        } else if(themeId==3) {
            document.querySelector("html").setAttribute("class", "fancy-theme");
            document.querySelectorAll("#theme-header input[type=radio]")[3].checked = true;
        }
    } catch(exp) {}

}

