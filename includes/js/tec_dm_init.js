var tec_darkMode_state = 'false';
var tec_darkMode_elements = [];

function initDarkMode() {
    if(document.cookie.indexOf(' cookielawinfo-checkbox-necessary=yes') != -1) { //then user has allowed functional cookies
        if(tec_darkMode_state == undefined) {
            tec_darkMode_state = 'false';
        }
        //document.cookie = 'DarkMode = true; Path=/;';
        var cookieArray = document.cookie.split(';');
        for(var i = 0; i < cookieArray.length; i++) {
            var name = cookieArray[i].split('=')[0];
            var value = cookieArray[i].split('=')[1];
            //console.log("--==Called darkModeUnstable Loop==--\nname: " + name + " value: " + value + " dark is: " + this.dark);
            if(name == ' DarkMode') {
                if(value != tec_darkMode_state) {
                    document.cookie = name + ' = ' + value + '; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    tec_darkMode();
                }
            }
        }
    }
}
initDarkMode();

function tec_darkMode() {
    if(tec_darkMode_state == 'false') {
        var style = document.createElement("link");
        style.rel = "stylesheet";
        style.href = "/wp-content/plugins/te-custom-mods/includes/css/tec_darkMode.css?v6.0";
        style.id = "tec_darkMode";
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
        if(document.cookie.indexOf(' cookielawinfo-checkbox-necessary=yes') != -1)
            document.cookie = 'DarkMode = true; Path=/;';

        document.getElementsByClassName("tec_dm_p")[0].innerHTML = "Light Mode";
        document.getElementsByClassName("tec_dm_p")[1].innerHTML = "Light Mode";
    } else {
        for(var i = 0; i < tec_darkMode_elements.length; i++) {
            if(tec_darkMode_elements[i] != undefined) {
                tec_darkMode_elements[i].remove();
            }
        }
        tec_darkMode_state = 'false';
        if(document.cookie.indexOf(' cookielawinfo-checkbox-necessary=yes') != -1)
            document.cookie = 'DarkMode = false; Path=/;';

        document.getElementsByClassName("tec_dm_p")[0].innerHTML = "Dark Mode";
        document.getElementsByClassName("tec_dm_p")[1].innerHTML = "Dark Mode";
    }
    try {
        tec_index_dm();
    } catch(e) {
        //ignore errors, no contents index was generated
    }
    try {
        tec_gallery_dm();
    } catch(e) {
        //ignore errors, no galleries were found on this page
    }
    tec_to_top_dm();
}

function tec_index_dm() {
    if(tec_darkMode_state == 'false') {
        document.getElementById("indexIcon").src = "/wp-content/plugins/te-custom-mods/images/DropdownBlack.png";
    } else {
        document.getElementById("indexIcon").src = "/wp-content/plugins/te-custom-mods/images/DropdownYellow.png";
    }
}

function tec_to_top_dm() {
    if(tec_darkMode_state == 'false') {
        document.getElementById("tec-to-top").src = "/wp-content/plugins/te-custom-mods/images/ToTopBlack.png";
        document.getElementById("tec-to-top").setAttribute("onmouseover", "this.style.backgroundColor='#f6dd95';");
    } else {
        document.getElementById("tec-to-top").src = "/wp-content/plugins/te-custom-mods/images/ToTopYellow.png";
        document.getElementById("tec-to-top").setAttribute("onmouseover", "this.style.backgroundColor='rgb(110, 118, 83)'");
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
