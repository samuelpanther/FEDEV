//this file is for autoplay using setInterval
//confused about some of this so I need to come back and go through it at a slower pace, maybe again with lecture
var images = [
    "images/0_K.J.P.9June2024Med.jpeg",
    "images/1_P.J.Z.15June2024Med.jpeg",
    "images/2_Z.P.NocKup20June2024Full-use.jpeg",
    "images/3_J.noc-kup20June2024Med.jpeg",
    "images/4_PNocKup20June2024Med.jpeg",
    "images/5_G.23June2024Medium.jpeg",
    "images/6_Zuza.me.bday.29June2024Medium.jpeg",
    "images/7_KM-Mbday12Oct2024Medium.jpeg",
    "images/8_K.M.G.Jmatch-Mbday12Oct2024Medium.jpeg",
    "images/9_Z.M.Mbday12Oct2024Medium.jpeg",
    "images/10_G.J.S-bdayM12Oct2024Medium.jpeg",
    "images/11_StephPodZ-23Feb2025Medium.jpeg",
    "images/12_C.JHofB6May2025Medium.jpeg",
];
var captions = [
    "Katia, José i Paulina, Nowy Plac Kazimierz, 9 June 2024",
    "Paulina, José, i Zuza, Kraków Beer Festival, 15 June 2024",
    "Zuza i Paulina, Noc Kupały, Kopiec Krakusa, 20 June 2024",
    "José (i Zuza), Noc Kupały, Kopiec Krakusa, 20 June 2024",
    "Paulina, Noc Kupały, Kopiec Krakusa, 20 June 2024",
    "Gonçalo, Kazimierz, 23 June 2024",
    "Zuza i Sam, Zuza's birthday,(Silent Disco in Kazimierz?), 29 June 2024",
    "Katia i Marco, Marco's birthday, Hala Forum, 12 October 2024",
    "Katia, Marco, Gonçalo i José, sneaky match, Marco's birthday, Hala Forum, 12 Oct 2024",
    "Zuza i Marco, Marco's birthday, Hala Forum, 12 Oct 2024",
    "Gonçalo,José, i Sam, Marco's birthday, Hala Forum, 12 Oct 2024",
    "Stephen, Kazimierz, the after-party of his moving party, 23 Feb 2025",
    "Carol and José, House of Beers Trivia Night, 6 May 2025",
];
// so this next variable  allows the caption array to know where in the image array we are when flipping thru the slideshow
//index 0 represents first image in array   - ARRAYS START COUNTING AT 0!
var currentIndex = 0;
var autoPlayInterval = null;
var isPlaying = true;
var restartTimeout = null; //this hopefully fixes the weird jumping
//the following function coordinates the image and caption on the page as it pulls the info from the HTML
function updateSlide() {
    var imageElement = document.getElementById("slideImage");
    var captionElement = document.getElementById("caption");
    imageElement.src = images[currentIndex];
    captionElement.innerText = captions[currentIndex];
}
//this function for autoplay allows advancing to the next image at the set interval time - 3 seconds
function startAutoPlay() {
    autoPlayInterval = window.setInterval(function () {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        updateSlide();
    }, 4000);
    isPlaying = true;
}
//function to stop autoplay
function stopAutoplay() {
    if (autoPlayInterval !== null) {
        window.clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
    isPlaying = false;
}
//this is for next button 
var nextBtn = document.getElementById("nextBtn");
//this will make autoplay stop if user clicks the manual next or prev buttons - this function pauses slideshow, changes the images, then restarts after 3 seconds
nextBtn.addEventListener("click", function () {
    stopAutoplay();
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    updateSlide();
    //this next thing might help with the weird jumping after a manual click
    if (restartTimeout !== null) {
        clearTimeout(restartTimeout);
    }
    if (isPlaying) {
        restartTimeout = window.setTimeout(startAutoPlay, 2500);
    }
});
//previous button 
var prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", function () {
    stopAutoplay(); //this stops autoplay if user presses prev button
    currentIndex--;
    // again coming bak to carousel
    if (currentIndex < 0) {
        currentIndex = images.length - 1; //remember this is position 4 because 5 images are 0,1,2,3,4
    }
    updateSlide();
    //again hopefully fixing wonky timing after user manually clicks
    if (restartTimeout !== null) {
        clearTimeout(restartTimeout);
    }
    if (isPlaying) {
        restartTimeout = window.setTimeout(startAutoPlay, 4000); //after user presses prev btn autoplay restarts after 3s  
    }
});
//now adding the ⏯️ pause/play btn that will completely stop slideshow or start it back up
var playPauseBtn = document.getElementById("playPauseBtn");
playPauseBtn.addEventListener("click", function () {
    if (isPlaying) {
        stopAutoplay();
        playPauseBtn.innerText = "▶️ Play";
    }
    else {
        startAutoPlay();
        playPauseBtn.innerText = "⏸️ Pause";
    }
});
//making slideshow start automatically when page loads  
updateSlide();
startAutoPlay();
