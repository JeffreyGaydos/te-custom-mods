function tec_insert_coauthor() {
    var data = document.querySelector("#tec_coauthor");
    var display = document.createElement("A");
    var comma = document.createElement("SPAN");
    comma.innerText = ", ";
    var authorLinkPrefix = document.querySelector(".post-author .meta-text a").getAttribute("href");
    authorLinkPrefix = authorLinkPrefix.substring(0, authorLinkPrefix.indexOf("/author/"));
    display.setAttribute("href", authorLinkPrefix + data.getAttribute("href"));
    display.innerText = data.innerText;
    document.querySelector(".post-author .meta-text a").innerText += ", ";
    //document.querySelector(".post-author .meta-text").appendChild(comma);
    document.querySelector(".post-author .meta-text").appendChild(display);
}

tec_insert_coauthor();