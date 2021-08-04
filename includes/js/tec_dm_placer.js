function createDarkModeButton() {
    document.getElementsByClassName("header-titles-wrapper")[0].innerHTML = 
        document.getElementsByClassName("header-titles-wrapper")[0].innerHTML + 
        '<div class="tec_dm_div" style="width: 10rem; padding-left: 5px;">' + 
            '<button class="tec_dm_button" style="background-color: #000; border-radius: 5px; height: 50px; padding-top: 0.5rem; width: 9rem" onclick="tec_darkMode()">' + 
                '<p class="tec_dm_p" style="color:#f6dd95; display: block; line-height: 1.2; word-break: normal; text-align: inherit; font-size: 19px; font-weight: 500; letter-spacing: -0.0277em; font-family: \'Allerta Stencil\', sans-serif !important; padding-top: 0px; padding-right: 0rem; text-transform: none;" type="button">Dark Mode</p>' +
            '</button>' + 
        '</div>';
        console.log("Placed DM");
}
createDarkModeButton();

var tec_darkMode_state = false;
var tec_darkMode_element;

function tec_darkMode() {
    if(!tec_darkMode_state) {
        var style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = "http://localhost/wordpress/wp-content/plugins/te-custom-mods/includes/css/tec_darkMode.css"
        style.id = "tec_darKMode";
        document.head.appendChild(style);
        tec_darkMode_element = style;
        tec_darkMode_state = true;

        document.getElementsByClassName("tec_dm_p")[0].innerHTML = "Light Mode";
        document.getElementsByClassName("tec_dm_p")[1].innerHTML = "Light Mode";
    } else {
        if(tec_darkMode_element != undefined) {
            tec_darkMode_element.remove();
        }
        tec_darkMode_state = false;
        document.getElementsByClassName("tec_dm_p")[0].innerHTML = "Dark Mode";
        document.getElementsByClassName("tec_dm_p")[1].innerHTML = "Dark Mode";
    }
    tec_index_dm();
    tec_to_top_dm();
    console.log("toggledDM");
}

function tec_index_dm() {
    if(!tec_darkMode_state) {
        document.getElementById("indexIcon").src = "https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownBlack.png";
    } else {
        document.getElementById("indexIcon").src = "https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownYellow.png";
    }
}

function tec_to_top_dm() {
    if(!tec_darkMode_state) {
        document.getElementById("tec-to-top").src = "https://tanks-encyclopedia.com/wp-content/uploads/2021/05/ToTopBlack.png";
        document.getElementById("tec-to-top").setAttribute("onmouseover", "this.style.backgroundColor='#f6dd95';");
    } else {
        document.getElementById("tec-to-top").src = "https://tanks-encyclopedia.com/wp-content/uploads/2021/05/ToTopYellow.png";
        document.getElementById("tec-to-top").setAttribute("onmouseover", "this.style.backgroundColor='rgb(110, 118, 83)'");
    }
}