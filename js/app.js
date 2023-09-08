
//Global Variables_____________________________________________________________________________

/* global document */
/* global window */
/* global clearTimeout */
/* global setTimeout */

//Section Data Structure_______________________________________________________________________

// Get all the sections using querySelectorAll
const sections = document.querySelectorAll("section");

// Create an array to store the section data
const sectionData = [];

// Iterate through the sections and store their information
sections.forEach((section) => {
  const id = section.getAttribute("id");
  const dataNav = section.getAttribute("data-nav");

  sectionData.push({
    id,
    dataNav,
  });
});

//Build the Navigation_________________________________________________________________________

const navbarList = document.getElementById("navbar__list");
// Function to generate navigation links dynamically based on the sections

function createNavigationLinks() {
  sections.forEach((section) => {
    const sectionId = section.id;
    const sectionTitle = section.getAttribute("data-nav");

    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = sectionTitle;
    link.setAttribute("href", `#${sectionId}`);
    link.classList.add("menu__link");

    listItem.appendChild(link);
    navbarList.appendChild(listItem);
  });
}
// Call the Navigation list function when the page loads
createNavigationLinks();

//Scroll to Section Functionality______________________________________________________________

// Function to scroll to the target section when a navigation link is clicked
function scrollToSection(event) {
  if (event.target && event.target.tagName === "A") {
    event.preventDefault();
    const targetId = event.target.getAttribute("href").slice(1);
    const targetSection = document.getElementById(targetId);

    // Scroll to the target section smoothly
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
}

// Event listener for the navbarList to handle navigation clicks
navbarList.addEventListener("click", scrollToSection);

//Active section functionality_________________________________________________________________

// CSS class to style the active section
const activeClass = "active-section";

// Function to check if a section is in the viewport
function isSecInVP(section) {
  const box = section.getBoundingClientRect();
  return (
    box.top >= 0 &&
    box.left >= 0 &&
    box.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    box.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to update the active section
function updateActive() {
  sections.forEach((section) => {
    if (isSecInVP(section)) {
      section.classList.add(activeClass);
      scrollToSection(section);
    } else {
      section.classList.remove(activeClass);
    }
  });
}

// Initial call to set the active section on page load
updateActive();

// Scroll event listener to updating active section
window.addEventListener("scroll", updateActive);

//Hide & Reveal Navbar_________________________________________________________________________

let timeoutId; // Variable to store the timeout ID

// Function to show the fixed navigation bar
function showNavbar() {
  navbarList.style.display = "block";

  // Clear the previous timeout (if any) and set a new timeout
  clearTimeout(timeoutId);

  //Hide the navbar again after 3 seconds of inactivity
  timeoutId = setTimeout(function () {
    navbarList.style.display = "none";
  }, 3000);
}

// Event listener to show navbar when user scrolls
window.addEventListener("scroll", function () {
  showNavbar();
});

// Call showNavbar to initially display the navbar
showNavbar();

