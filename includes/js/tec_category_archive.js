function tec_activate_category_archive_php() {
    var newPage = document.querySelector("main#tec_category_archive");
    var oldPage = document.querySelector("main#site-content");

    //console.log(newPage);
    //console.log(oldPage);

    oldPage.innerHTML = newPage.innerHTML;
    oldPage.style.display = "block";
    newPage.style.display = "none";
}

tec_activate_category_archive_php();