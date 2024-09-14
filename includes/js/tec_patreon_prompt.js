
function tec_closePatreonLong() {
    document.querySelector(".tec-patreon-long-box").style.display = "none";
    document.querySelector(".tec-patreon-long-x").style.display = "none";
    document.cookie = `te_patreonClosed=true; expires=${new Date(Date.now() + 1000*60*60*24*7).toUTCString()}; path=/`;
}

if(!tec_is_client_mobile) {
    var tec_patreon_long_box = document.createElement("a");
    tec_patreon_long_box.href = "http://patreon.com/tankartfund";
    tec_patreon_long_box.className = "tec-patreon-long-box";
    var tec_patreon_long_te_logo = document.createElement("img");
    tec_patreon_long_te_logo.src = "https://tanks-encyclopedia.com/wp-content/uploads/2020/01/logo-big-border.png";
    tec_patreon_long_te_logo.className = "tec-patreon-long-te-logo";
    var tec_patreon_long_text = document.createElement("p");
    tec_patreon_long_text.innerText = "Become a Tank Encyclopedia Patreon today!";
    tec_patreon_long_text.className = "tec-patreon-long-text";
    var tec_patreon_long_patreon_logo = document.createElement("img");
    tec_patreon_long_patreon_logo.src = "/wp-content/plugins/te-custom-mods/images/PatreonLogo.png";
    tec_patreon_long_patreon_logo.className = "tec-patreon-long-patreon-logo";
    var tec_patreon_long_x = document.createElement("p");
    tec_patreon_long_x.className = "tec-patreon-long-x";
    tec_patreon_long_x.innerText = "🞪";
    tec_patreon_long_x.addEventListener("click", () => tec_closePatreonLong());
    
    tec_patreon_long_box.appendChild(tec_patreon_long_te_logo);
    tec_patreon_long_box.appendChild(tec_patreon_long_text);
    tec_patreon_long_box.appendChild(tec_patreon_long_patreon_logo);
    
    var visited_cookie = document.cookie.split("; ").filter(c => c.startsWith("te_visited_marker_ppp"))[0];
    if(!document.cookie.split("; ").filter(c => c.startsWith("te_patreonClosed"))[0]
        && visited_cookie
        && ((Date.now() + 1000*60*60*24*365) - visited_cookie.split('=')[1]) > (1000*60*60*24*7)) {
        document.querySelector("body").appendChild(tec_patreon_long_box);
        document.querySelector("body").appendChild(tec_patreon_long_x);
    
        setTimeout(() => {
            document.querySelector(".tec-patreon-long-box").classList.add("active");
            document.querySelector(".tec-patreon-long-x").classList.add("active");
        }, 1000);
    }

    document.cookie = `te_visited_marker_ppp=${Date.now() + 1000*60*60*24*365}; expires=${new Date(Date.now() + 1000*60*60*24*365).toUTCString()}; path=/`;
}