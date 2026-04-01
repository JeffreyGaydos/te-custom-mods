function tec_activate_category_archive_php() {
    var newPage = document.querySelector("main#tec_category_archive");
    var oldPage = document.querySelector("main#site-content");

    oldPage.innerHTML = newPage.innerHTML;
    oldPage.style.display = "block";
    newPage.style.display = "none";
}
if(document.querySelector('meta[guid="812DBD81-BF4C-4307-9ED5-D3B37EE35CF2"]')) {
    console.log("Theme activation detected. Ignoring this part of the plugin");
}
else {
tec_activate_category_archive_php();
}