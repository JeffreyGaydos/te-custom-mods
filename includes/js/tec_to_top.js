var tec_to_top_active = false;

tec_to_top_init();

window.addEventListener('scroll', scrollTest);

function scrollTest() {
    if(window.pageYOffset > 500 && !isInViewport(document.getElementsByClassName("footer-nav-widgets-wrapper header-footer-group")[0])) {
        tec_to_top_activate();
    } else {
        tec_to_top_deactivate();
    }
};

function tec_to_top_init() {
    document.body.innerHTML += '<img onmouseover="this.style.backgroundColor=\'#f6dd95\';" onMouseLeave="this.style.backgroundColor=\'rgba(0, 0, 0, 0)\';" onClick="tec_to_top_click();" style="border-radius: 100%; width: 60px; height: 60px; position: fixed; bottom: -100px; right: 35px; transition: all 0.2s ease; cursor: pointer;" id="tec-to-top" alt="To Top" src="https://tanks-encyclopedia.com/wp-content/uploads/2021/05/ToTopBlack.png" />';
}

function tec_to_top_click() {
    window.scrollTo(0, 0);
}

function tec_to_top_activate() {
    document.getElementById("tec-to-top").style.bottom = "35px";
	document.getElementsByClassName("tec-rand-link")[0].style.bottom = "50px";
	document.getElementsByClassName("tec-rand-text")[0].style.bottom = "15px";
    tec_to_top_active = true;
}

function tec_to_top_deactivate() {
    document.getElementById("tec-to-top").style.bottom = "-100px";
	document.getElementsByClassName("tec-rand-link")[0].style.bottom = "-100px";
	document.getElementsByClassName("tec-rand-text")[0].style.bottom = "-100px";
    tec_to_top_active = false;
}


//Code copied from: https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
//By: Javascript Tutorial Website
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}