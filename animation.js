const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const project1Gif = document.querySelector('#project1-gif');
const project2Gif = document.querySelector('#project2-gif');
const project3Gif = document.querySelector('#project3-gif');
const projects = document.querySelectorAll('.project')
const email = document.querySelector('#email');
const emailButton = document.querySelectorAll('.email-button');
const navButtons = document.querySelectorAll('.nav-links li')
const containers = document.querySelectorAll('main > div');     //get the immediate children of the main tag


let controller = new ScrollMagic.Controller();
//highlights the corresponding button of the navbar depending where the user is on the webpage
function highlightNavButtons () {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {  //if at the bottom of the page (used to highlight contactme button since it is at the bottom it doesn't get highlighted from just using the code in the else block)
        navButtons[2].classList.remove('highlight');    //remove and add highlight class to the aboutme and contactme buttons respectively
        navButtons[3].classList.add('highlight');
    } else {
        navButtons[3].classList.remove('highlight');    //make sure contactme button isn't highlighted
        navButtons.forEach((navButton, i) => {          //for every nav button
            let scene = new ScrollMagic.Scene({ 
                triggerHook: 0.3,                       //trigger for animation start and end is 30% from the top
                triggerElement: containers[i],          //start it when trigger reaches the top of the container 
                duration: containers[i].clientHeight    //stop it when trigger reaches bottom of the container
            })
            .setClassToggle(navButtons[i], 'highlight') //highlight the appropriate nav button, by toggling the class highlight at start and end triggers
            .addTo(controller);
        })
    }
}

//add a eventlistener to window resize, since container sizes resize (when window resizes) so need to recalulate start and end triggers
window.addEventListener ('resize', () => {  
    highlightNavButtons();
})
//add a eventlistener onscroll, so that the contacme button gets highlighted properly
window.addEventListener ('scroll', () => {  
    highlightNavButtons();
})

highlightNavButtons();      //run the function on page load


//scroll to correct part on click of nav buttons
navButtons.forEach((navButton, i) => {
    navButton.addEventListener('click', () => {
        let pos = containers[i].getBoundingClientRect().top - 70;
        window.scrollBy({
            top: pos,
            behavior: 'smooth'
        });
    });
});


//copy my email to clipboard when clicking email buttons
emailButton.forEach((button, index) => {
    button.addEventListener('click', () => {
        email.select();                     //select the email from the hidden textarea
        email.setSelectionRange(0, 99999);  //for mobile
        document.execCommand("copy");       //copy the selected text to clipboard
        alert("Copied Allan's email (" + email.value + ") to the clipboard");
    });
});


//animate the burger button on click
burger.addEventListener('click',() => {
    navLinks.classList.toggle("open");
    navButtons.forEach((button) => {
        button.addEventListener('click', () =>{
            navLinks.classList.remove("open");
        });
    });
});


//changes the images in the project cards into an animated gif when hovering over the image
project1Gif.addEventListener('mouseover',() => {
    project1Gif.src = 'images/marshall.gif';
})
project1Gif.addEventListener('mouseout',() => {
    project1Gif.src = 'images/marshall.png';
})

project2Gif.addEventListener('mouseover',() => {
    project2Gif.src = 'images/church.gif';
})
project2Gif.addEventListener('mouseout',() => {
    project2Gif.src = 'images/church.png';
})

project3Gif.addEventListener('mouseover',() => {
    project3Gif.src = 'images/lynel.gif';
})
project3Gif.addEventListener('mouseout',() => {
    project3Gif.src = 'images/lynel.png';
})


//removes classes: front, middle and back from the project cards
function removeSequence() {
    for (let j=0; j < projects.length; j++) {
        projects[j].classList.remove('front', 'middle', 'back');
    }
}

//remove all the inline CSS from the project cards
function removeCSS() {
    for (let j = 0; j < projects.length; j++) {
        projects[j].style.cssText = "";
    }
}

//add the correct stacking sequence to the project cards
function addSequence(projectNumber) {
    projects[projectNumber].classList.add('front');
    projects[(projectNumber+1) % 3].classList.add('middle');
    projects[(projectNumber+2) % 3].classList.add('back');
}

//animation for when the projects card are clicked on
for (let i = 0; i < projects.length; i++) { 
    projects[i].addEventListener('click', () => {       //add click event for every project card
        if (projects[i].classList.contains('front') || window.innerWidth <= 768) {  //do nothing if clicking on the front card
            return;
        }; 
        const tl = new TimelineMax();
        tl.to(projects[i], 0.5, {                       //raise and decrease opacity of clicked card
            opacity: '0',       
            y: '-15%',
            onComplete: () => {
                removeSequence();                       //remove stacking sequence of all cards
                addSequence(i);                         //calculate and add the new sequence based on which card was clicked
                projects[i].style.cssText = "";         //remove inline css added by tl
                
                const tl2 = new TimelineMax();
                tl2.from(projects[i], 0.5, {            //increase the opacity and lower the project card into target position
                    opacity: '0.5', 
                    top: '260px',
                    onComplete: () => {
                        removeCSS();                    //remove the inline css added by tl2, should it doesn't interfere on later clicks
                    }
                });
            }
        });
    });
};

//animation for when the projects card are hovered over
for (let i = 0; i < projects.length; i++) {
    projects[i].addEventListener('mouseover', () => {   //add mouseover and mouseout event for every project card
        if (projects[i].classList.contains('front') || window.innerWidth <= 768) {  //do nothing if it is the front card
            return;
        }; 
        projects[i].classList.add('raise');             //add the class raise to the card when mouse over
    });
    projects[i].addEventListener('mouseout', () => {
        projects[i].classList.remove('raise');          //remove the class raise to the card when mouse out
    });
};


