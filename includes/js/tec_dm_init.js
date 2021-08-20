var tec_darkMode_state = false;
var tec_darkMode_element;

function initDarkMode() {
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
initDarkMode();

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
    try {
        tec_index_dm();
    } catch(e) {
        //ignore errors, no contents index was generated
    }    
    tec_to_top_dm();
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