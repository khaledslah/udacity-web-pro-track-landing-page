/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let navBarElement = document.querySelector("#navbar__list");

const sections = document.querySelectorAll("main section");

let docFragment = document.createDocumentFragment();
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav() {
    let listItem;
    let listItemAnchor;
    
    for (const section of sections) {
        listItem = document.createElement("li");

        listItemAnchor = document.createElement("a");
        listItemAnchor.href = "#"+section.id;
        listItemAnchor.textContent = section.dataset.nav;
        listItemAnchor.classList.add("menu__link");

        listItem.appendChild(listItemAnchor);
        docFragment.appendChild(listItem);
    }
    navBarElement.appendChild(docFragment);
}
// Add class 'active' to section when near top of viewport
function setActiveSection() {
    sections.forEach((section, index)=>{
        let navMenuList = navBarElement.children[index];
        
        if (section.getBoundingClientRect().bottom <= 1.5*section.getBoundingClientRect().height
                && section.getBoundingClientRect().bottom > 0.5*section.getBoundingClientRect().height ) {
            section.classList.add("activeSection");
            navMenuList.classList.add("activeLink");
        }
        else {
            section.classList.remove("activeSection");
            navMenuList.classList.remove("activeLink");
        }
    });
    
}



// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener("DOMContentLoaded", buildNav);
// Scroll to section on link click

// Set sections as active
document.addEventListener("scroll", setActiveSection);
// Make sections collapsible
document.querySelector("main").addEventListener("click",(ev) => {
    if (ev.target.classList.contains("collapsible")) {
        ev.target.classList.toggle("active");
        let content = ev.target.parentElement.nextElementSibling;
    if (content.style.maxHeight != "0px"){
      content.style.maxHeight = 0+ "px";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
    }
})
