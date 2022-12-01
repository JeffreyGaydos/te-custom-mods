function tec_initializeCSS() {
    tec_addStyleSheet("tec_gallery.css", "1");
    tec_addStyleSheet("tec_mobile.css", "1");
    tec_addStyleSheet("tec_misc.css", "1");
}
tec_initializeCSS();

function tec_addStyleSheet(sheet_name, version) {
    var style = document.createElement("link");
    style.rel = "stylesheet";
    //style.href = "/wp-content/plugins/te-custom-mods/includes/css/" + sheet_name + "?v" + version;
    style.href = "localhost/localte/wordpress/wp-content/plugins/te-custom-mods/includes/css/" + sheet_name + "?v" + version;
    style.id = sheet_name;
    document.head.appendChild(style);
}