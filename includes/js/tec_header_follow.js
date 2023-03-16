var currentScroll = 0;

headerFollow();

//Performs various CSS stylings to get the header to follow the user only when they scroll up
function headerFollow() {
    var header = document.getElementById('site-header').cloneNode(true);
    document.getElementById('site-header').appendChild(header);
    header.setAttribute('name', 'clone');
    var clone = document.getElementsByName('clone')[0];
    clone.style.position = "fixed";
    currentScroll = clone.clientHeight * -1;
    clone.style.width = "100%";
    //arbitrary large number to ensure the header is in front of everything - highest seen z-index: 9998 (sidebar)
    clone.style.zIndex = "1000";
    //the buttons on the cloned header need to be mapped to the corresponding buttons on the original header
    clone.getElementsByClassName('toggle search-toggle desktop-search-toggle')[0]?.addEventListener("click", () => buttonMapDS());
    //clone.getElementsByClassName('toggle nav-toggle desktop-nav-toggle')[0].setAttribute("onclick", "buttonMapDM()"); --Removed button
    clone.getElementsByClassName('toggle search-toggle mobile-search-toggle')[0]?.addEventListener("click", () => buttonMapMS());
    clone.getElementsByClassName('toggle nav-toggle mobile-nav-toggle')[0]?.addEventListener("click", () => buttonMapMM());
    console.log(clone.getElementsByClassName('tec_dm_button')[0]?.addEventListener("click", () => tec_darkMode()));
    try {
        //fixes chrome issue where adds are generated by Google in the header
        document.getElementsByName('clone')[0].getElementsByClassName('google-auto-placed')[0].style.display = "none";
    } catch(e) {
        //didn't find any ad to remove
    }
    //the following block of code is called everytime the user scrolls in any direction
    window.addEventListener("scroll", headerOnScrollEvent);
    clone.style.top = (currentScroll) + 'px';

    //fixes issue with the header not displaying over top of the slideshow arrows
    document.getElementsByTagName('header')[0].style.zIndex = '1000';
    document.getElementsByTagName('header')[1].style.zIndex = '1000';
    document.querySelector('.menu-modal.cover-modal.header-footer-group').style.zIndex = '1001';
}

var scrollPx = 0;
var scrollDiff = 0;

function headerOnScrollEvent() {
    clone = document.getElementsByName('clone')[0];
    if(window.pageYOffset < scrollPx) {
        //display the moving header and hide the menu and search buttons
        clone.style.display = "block";
    } else if(window.pageYOffset > scrollPx) {
        //hide the header and display the menu and search buttons
        clone.style.display = "block";
    }
    if(window.pageYOffset <= 0 || (window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
        //hide the movable header when they've reached the top or bottom of the page (primarily for mobile) and display the menu and search buttons
        clone.style.display = "none";
    }
    scrollDiff = window.pageYOffset - scrollPx;
    currentScroll -= scrollDiff;
    if(currentScroll < clone.clientHeight * -1) {
        currentScroll = clone.clientHeight * -1;
    } else if(currentScroll > 0) {
        currentScroll = 0;
    }
    clone.style.top = (currentScroll) + 'px';
    
    scrollPx = window.pageYOffset;
}

//Maps the Desktop search button on the clone header to the search button on the stationary header. Called by the clone header's buttons.
function buttonMapDS() {
    window.scrollTo(0, 0); //somehow this works...
    //document.getElementsByClassName('toggle search-toggle desktop-search-toggle')[0].click();
    document.getElementsByClassName('cover-modal')[0].style.zIndex = 1001;
}

//Maps the Desktop menu button on the clone header to the menu button on the stationary header. Called by the clone header's buttons.
function buttonMapDM() {
    document.getElementsByClassName('toggle nav-toggle desktop-nav-toggle')[0].click();
}
    

//Maps the mobile search button on the clone header to the search button on the stationary header. Called by the clone header's buttons.
function buttonMapMS() {
    window.scrollTo(0, 0); //somehow this works...
    //document.getElementsByClassName('toggle search-toggle desktop-search-toggle')[0].click();
}

//Maps the mobile menu button on the clone header to the menu button on the stationary header. Called by the clone header's buttons.
function buttonMapMM() {
    document.querySelector(".menu-modal.cover-modal.header-footer-group .menu-modal-inner.modal-inner").style.paddingLeft = '100px';
}
