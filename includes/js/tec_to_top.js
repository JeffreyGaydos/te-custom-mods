var tec_to_top_active = false;

tec_to_top_init();

window.addEventListener('scroll', tec_to_top_scroll_test);

function tec_to_top_scroll_test() {
    if(window.pageYOffset > 500 && !tec_is_in_viewport(document.getElementsByClassName("footer-nav-widgets-wrapper header-footer-group")[0])) {
        tec_to_top_activate();
    } else {
        tec_to_top_deactivate();
    }
};

function tec_to_top_init() {
    let toTopImage = document.createElement("IMG");
    toTopImage.addEventListener("mouseover", () => event.target.style.backgroundColor = '#f6dd95');
    toTopImage.addEventListener("mouseleave", () => event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)');
    toTopImage.addEventListener("click", () => window.scrollTo(0, 0));
    toTopImage.id = "tec-to-top";
    toTopImage.title = "To Top";
    toTopImage.src = "https://tanks-encyclopedia.com/wp-content/uploads/2021/05/ToTopBlack.png";
    document.body.appendChild(toTopImage);
}

function tec_to_top_activate() {
    document.getElementById("tec-to-top").style.bottom = "35px";
    tec_to_top_active = true;
}

function tec_to_top_deactivate() {
    document.getElementById("tec-to-top").style.bottom = "-100px";
    tec_to_top_active = false;
}


//Code copied from: https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/
//By: Javascript Tutorial Website
function tec_is_in_viewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}