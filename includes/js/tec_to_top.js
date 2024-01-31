tec_to_top_init();

window.addEventListener('scroll', tec_to_top_scroll_test);

function tec_to_top_scroll_test() {
    if(window.scrollY > 500 && !tec_is_in_viewport(document.getElementsByClassName("footer-nav-widgets-wrapper header-footer-group")[0])) {
        tec_to_top_activate();
    } else {
        tec_to_top_deactivate();
    }
}

function tec_to_top_init() {
    let toTopImageLight = document.createElement("IMG");
    toTopImageLight.addEventListener("click", () => window.scrollTo(0, 0));
    toTopImageLight.classList.add("tec_to_top");
    toTopImageLight.classList.add("tec_to_top_light");
    toTopImageLight.title = "To Top";
    toTopImageLight.src = "/wp-content/plugins/te-custom-mods/images/ToTopBlack.png";
    let toTopImageDark = document.createElement("IMG");
    toTopImageDark.addEventListener("click", () => window.scrollTo(0, 0));
    toTopImageDark.classList.add("tec_to_top");
    toTopImageDark.classList.add("tec_to_top_dark");
    toTopImageDark.title = "To Top";
    toTopImageDark.src = "/wp-content/plugins/te-custom-mods/images/ToTopYellow.png";
    let toTopWrapper = document.createElement("DIV");
    toTopWrapper.id = "tec_to_top_wrapper";
    toTopWrapper.appendChild(toTopImageLight);
    toTopWrapper.appendChild(toTopImageDark);
    document.body.appendChild(toTopWrapper);
}

function tec_to_top_activate() {
    document.getElementById("tec_to_top_wrapper").classList.add("tec_active");
}

function tec_to_top_deactivate() {
    tec_safe_remove_class(document.getElementById("tec_to_top_wrapper"), "tec_active");
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