var te_ppp_days = 7;
var te_visited_cookie_name = "te_visited_marker_ppp002";
var te_closed_cookie_name = "te_patreon_closed002";

function tec_closePatreonLong() {
    document.querySelector(".tec-patreon-long-box").style.display = "none";
    document.querySelector(".tec-patreon-long-x").style.display = "none";
    document.cookie = `${te_closed_cookie_name}=true; expires=${new Date(Date.now() + 1000*60*60*24*te_ppp_days).toUTCString()}; path=/`;
}

if(!tec_is_client_mobile) {
    var tec_patreon_long_box = document.createElement("a");
    tec_patreon_long_box.href = "https://payhip.com/b/5n2cV";
    tec_patreon_long_box.className = "tec-patreon-long-box";
    var tec_patreon_long_te_logo = document.createElement("img");
    tec_patreon_long_te_logo.src = "/wp-content/plugins/te-custom-mods/images/All-Pack-New_800x600.jpg";
    tec_patreon_long_te_logo.className = "tec-patreon-long-te-logo";
    var tec_patreon_long_text = document.createElement("p");
    tec_patreon_long_text.innerText = "Click to buy!";
    tec_patreon_long_text.className = "tec-patreon-long-text";
    // var tec_patreon_long_patreon_logo = document.createElement("img");
    // tec_patreon_long_patreon_logo.src = "/wp-content/plugins/te-custom-mods/images/PatreonLogo.png";
    // tec_patreon_long_patreon_logo.className = "tec-patreon-long-patreon-logo";
    var tec_patreon_long_x = document.createElement("p");
    tec_patreon_long_x.className = "tec-patreon-long-x";
    tec_patreon_long_x.innerHTML = "&Cross;";
    tec_patreon_long_x.addEventListener("click", () => tec_closePatreonLong());
    
    tec_patreon_long_box.appendChild(tec_patreon_long_text);
    tec_patreon_long_box.appendChild(tec_patreon_long_te_logo);
    // tec_patreon_long_box.appendChild(tec_patreon_long_patreon_logo);
    
    var visited_cookie = document.cookie.split("; ").filter(c => c.startsWith(te_visited_cookie_name))[0];
    if(!document.cookie.split("; ").filter(c => c.startsWith(te_closed_cookie_name))[0]
        && visited_cookie
        && ((Date.now() + 1000*60*60*24*365) - visited_cookie.split('=')[1]) > (1000*60*60*24*te_ppp_days)) {
        document.querySelector("body").appendChild(tec_patreon_long_box);
        document.querySelector("body").appendChild(tec_patreon_long_x);
    
        setTimeout(() => {
            document.querySelector(".tec-patreon-long-box").classList.add("active");
            document.querySelector(".tec-patreon-long-x").classList.add("active");
        }, 1000);
    }

    if(!visited_cookie) {
        document.cookie = `${te_visited_cookie_name}=${Date.now() + 1000*60*60*24*365 - (1000*60*60*24*te_ppp_days)}; expires=${new Date(Date.now() + 1000*60*60*24*365).toUTCString()}; path=/`;
    } else if(((Date.now() + 1000*60*60*24*365) - visited_cookie.split('=')[1]) > (1000*60*60*24*te_ppp_days)) {
        document.cookie = `${te_visited_cookie_name}=${Date.now() + 1}; expires=${new Date(Date.now() + 1000*60*60*24*365).toUTCString()}; path=/`;
    }

}