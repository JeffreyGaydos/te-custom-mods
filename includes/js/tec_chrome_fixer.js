if (navigator.userAgent.indexOf("Chrome") != -1 && navigator.userAgent.indexOf("Edg") == -1) {
    var tec_killCounter = 0;

    var tec_chrome_fixer = setInterval(() => {
        var tec_googleElements = [];
        var tec_googleLinks = [];
        var tec_anyWithExplicitStyle = document.querySelectorAll("*[style]").forEach(s => {
            if(s.getAttribute("style").length > 5000) {
                if(s.tagName.toLowerCase() == "a") {
                    tec_googleLinks.push(s);
                }
                else {
                    tec_googleElements.push(s);
                }
            }
        });
        tec_killCounter += tec_googleElements.length;
        tec_killCounter += tec_googleLinks.length;
        tec_googleLinks.forEach(e => {
            var text = e.innerText;
            var parent = e.parentElement;
            var normal = document.createElement("SPAN");
            normal.innerText = text;    
            parent.insertBefore(normal, e);
            e.remove();
        });
        tec_googleElements.forEach(e => e.remove());
    }, 1000);
}