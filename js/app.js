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
const navBarList = document.querySelector("#navbar__list");

const sections = document.querySelectorAll("main section");

const docFragment = document.createDocumentFragment();

let scrollCounter = 0;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// build the nav
/**
 * This function is building the navigation bar dynamically
 * depending on the number of sections
 */
function buildNav() {
    let listItem;
    let listItemAnchor;
    
    for (const section of sections) {
        listItem = document.createElement("li");

        listItemAnchor = document.createElement("a");
        listItemAnchor.textContent = section.dataset.nav;
        listItemAnchor.classList.add("menu__link");
        listItemAnchor.dataset.sect = section.id;

        listItem.appendChild(listItemAnchor);
        docFragment.appendChild(listItem);
    }
    navBarList.appendChild(docFragment);
}
// Build toTop button
/**
 * This funnction creates a button in the footer used to anchor to top when clicked
 */
function buildToTopButton() {
    const toTopButton = document.createElement("a");
    toTopButton.classList.add("toTopButton");
    toTopButton.classList.add("hide");
    toTopButton.innerHTML = '&#10148';
    toTopButton.onclick = ()=> window.scrollTo(0,0);

    document.querySelector("footer").appendChild(toTopButton);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

/**
 * This handler is passed to "DOMContentLoaded" event listener
 * handles these jobs: Create nav-bar elements
 *                     Create to-top button
 */
function docUpdate() {
    buildNav();
    buildToTopButton();
}

/**
 * This handler is passed to "scroll" event listener
 * handles these jobs: Expand navBar when scrolling
 *                     Set active section and active link
 *                     NavBar collapses after 700ms if user is not scrolling
 *                     If scrolled below the fold, show the button
 */
function setActiveSection() {
    const pageHeader = document.querySelector(".page__header");
    let activated = false;
    // Expand navBar when scrolling
    scrollCounter++;
    pageHeader.style.transform = "translate(0, 0)";
    // Set active section and active link
    sections.forEach((section, index)=> {
        let navMenuList = navBarList.children[index];
        // Check if section is active and there is no previous active section
        if (section.getBoundingClientRect().top <= 0.25 * window.innerHeight &&
            section.getBoundingClientRect().top > -0.4 * section.getBoundingClientRect().height &&
            !activated
            ) {
            section.classList.add("activeSection");
            navMenuList.classList.add("activeLink");
            activated = true;
        }
        // Check if section is set as active
        else if(section.classList.contains("activeSection")) {
            section.classList.remove("activeSection");
            navMenuList.classList.remove("activeLink");
            activated = false;
        }
    });
    
    // NavBar collapses after 700ms if user is not scrolling
    setTimeout(() => {
        scrollCounter--;
        if (scrollCounter === 0) {
        pageHeader.style.transform = "translate(0, -99%)";
        }
    }, 700);

    // If scrolled below the fold, show the button
    if (window.pageYOffset > 0.25 * window.innerHeight) {
        document.querySelector(".toTopButton").classList.remove("hide");
    }
    else {
        document.querySelector(".toTopButton").classList.add("hide");
    }
}

/**
 * This handler is passed to "click" event listener of "#navbar__list" element
 * handles these jobs: Scroll to section when corresponding link is clicked
 * @param  {} ev - The event parameter passed to event listener
 */
function scrollToSection(ev) {
    const clickedTarget = ev.target ;
    if (clickedTarget.classList.contains("menu__link")) {
        document.querySelector("#"+clickedTarget.dataset.sect).scrollIntoView({behavior: "smooth"});
    }
}

// Make sections collapsible
/**
 * This handler is passed to "click" event listener of "main" element
 * handles these jobs: Collapse/expand section when header is clicked
 * @param  {} ev - The event parameter passed to event listener
 */
function collapsibleSections(ev) {
    if (ev.target.classList.contains("collapsible")) {
        ev.target.classList.toggle("active");
        let content = ev.target.parentElement.nextElementSibling;
    if (content.style.maxHeight != "0px"){
      content.style.maxHeight = 0+ "px";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener("DOMContentLoaded", docUpdate);
// Scroll to section on link click
navBarList.addEventListener("click",scrollToSection);
// Set sections as active
document.addEventListener("scroll", setActiveSection);
// Make sections collapsible
document.querySelector("main").addEventListener("click", collapsibleSections);