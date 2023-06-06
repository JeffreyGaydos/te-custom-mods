function tec_insert_coauthor() {
    var data = document.querySelector("#tec_coauthor");
    var display = document.createElement("A");
    var sep = document.createElement("SPAN");
    sep.innerText = "and ";
    var authorLinkPrefix = document.querySelector(".post-author .meta-text a").getAttribute("href");
    authorLinkPrefix = authorLinkPrefix.substring(0, authorLinkPrefix.indexOf("/author/"));
    display.setAttribute("href", authorLinkPrefix + data.getAttribute("href"));
    display.innerText = data.innerText;
    document.querySelector(".post-author .meta-text").appendChild(sep);
    document.querySelector(".post-author .meta-text").appendChild(display);
}

tec_insert_coauthor();