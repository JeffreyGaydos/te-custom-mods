function tec_activate_author_archive_php() {
    var newPage = document.querySelector("main#tec_author_archive");
    var oldPage = document.querySelector("main#site-content");

    //console.log(newPage);
    //console.log(oldPage);

    oldPage.innerHTML = newPage.innerHTML;
    oldPage.style.display = "block";
    newPage.style.display = "none";
}

tec_activate_author_archive_php();