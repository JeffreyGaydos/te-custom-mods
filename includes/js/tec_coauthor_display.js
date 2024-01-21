function tec_insert_coauthor() {
    var data = document.querySelectorAll(".tec_coauthor");
    if(data.length == 0) return;
    var count = data.length;
    var i = 0;
    data.forEach(datum => {
        i++;
        var display = document.createElement("A");
        var sep = document.createElement("SPAN");
        if(i >= count) {
            sep.innerText = " and ";
        } else {
            sep.innerText = ", ";
            document.querySelector(".post-author .meta-text a").style.marginRight = "-3px";
        }
        console.log(sep.innerText);
        var authorLinkPrefix = document.querySelector(".post-author .meta-text a").getAttribute("href");
        authorLinkPrefix = authorLinkPrefix.substring(0, authorLinkPrefix.indexOf("/author/"));
        display.setAttribute("href", authorLinkPrefix + datum.getAttribute("href"));
        display.innerText = datum.innerText;
        console.log(display.innerText)
        document.querySelector(".post-author .meta-text").appendChild(sep);
        document.querySelector(".post-author .meta-text").appendChild(display);
    });
}

tec_insert_coauthor();