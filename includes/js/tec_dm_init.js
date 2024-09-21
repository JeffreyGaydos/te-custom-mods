var tec_darkMode_state = 'false';
var tec_darkMode_elements = [];

function initDarkMode() {
    if(localStorage.getItem("tec_darkMode") == undefined) {
        localStorage.setItem("tec_darkMode", "false");
    } else {
        if(localStorage.getItem("tec_darkMode") == "true") {
            tec_darkMode();
        }
    }
}
initDarkMode();

function tec_darkMode() {
    if(tec_darkMode_state == 'false') {
        var style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = "/wp-content/plugins/te-custom-mods/includes/css/tec_darkMode.css?v6.7";
        style.id = "tec_darkMode";
        style.blocking = "render";
        document.head.appendChild(style);
        tec_darkMode_elements[0] = style;
        if(document.getElementsByClassName("archive-header").length > 0) {
            var style2 = document.createElement("link");
            style2.rel = "stylesheet";
            style2.href = "/wp-content/plugins/te-custom-mods/includes/css/tec_darkMode_search.css";
            style2.id = "tec_darkMode_search";
            document.head.appendChild(style2);
            tec_darkMode_elements[1] = style2;
        }
        tec_darkMode_state = 'true';
        localStorage.setItem("tec_darkMode", "true");
    } else {
        for(var i = 0; i < tec_darkMode_elements.length; i++) {
            if(tec_darkMode_elements[i] != undefined) {
                tec_darkMode_elements[i].remove();
            }
        }
        tec_darkMode_state = 'false';
        localStorage.setItem("tec_darkMode", "false");        
    }
    try {
        tec_gallery_dm();
    } catch(e) {
        //ignore errors, no galleries were found on this page
    }
}

function tec_gallery_dm() {
    if(tec_darkMode_state == 'false') {
        arrow_list = document.getElementsByClassName("tec_g_arrow_img")
        for(var i = 0; i < arrow_list.length; i++) {
            arrow_list[i].src = "/wp-content/plugins/te-custom-mods/images/DropdownBlack.png";
        }
    } else {
        arrow_list = document.getElementsByClassName("tec_g_arrow_img")
        for(var i = 0; i < arrow_list.length; i++) {
            arrow_list[i].src = "/wp-content/plugins/te-custom-mods/images/DropdownYellow.png";
        }
    }
}
