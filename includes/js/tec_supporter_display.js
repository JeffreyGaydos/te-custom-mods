var tec_te_patreons = JSON.parse(document.querySelector("#te-patreons").innerText);

tec_generatePatreonTable();
tec_generatePatreonArticleTable();

function tec_generatePatreonTable() {
    var patreonDiv = document.querySelector("#patreon-supporters-all");
    if(!patreonDiv) return;
    
    if(tec_te_patreons.length < 2) {
        return;
    }

    var heavyTanks = [];
    var mediumTanks = [];
    var lightTanks = [];
    // var tankettes = [];

    tec_te_patreons.forEach((patreon, i) => {
        if(i != 0) {
            if(patreon[1] == "Heavy Tank") {
                heavyTanks.push(patreon[0]);
            }
            if(patreon[1] == "Medium Tank") {
                mediumTanks.push(patreon[0]);
            }
            if(patreon[1] == "Light Tank") {
                lightTanks.push(patreon[0]);
            }
            // if(patreon[1] == "Tankette") {
            //     tankettes.push(patreon[0]);
            // }
        }
    });

    var titleThankYou = document.createElement("DIV");
    titleThankYou.classList.add("tec-patreon-header");
    titleThankYou.classList.add("tec-patreon-supporters-title");
    titleThankYou.innerText = "Thank you to all of our Patreon supporters!";
    patreonDiv.append(titleThankYou);

    tec_generatePatreonDisplayHeader(patreonDiv, "Heavy Tank Contributors", "var(--ted-yellow) !important");
    heavyTanks.forEach(ht => {
        tec_generatePatreonDisplayBox(patreonDiv, ht);
    });

    tec_generatePatreonDisplayHeader(patreonDiv, "Medium Tank Contributors", "var(--ted-beige) !important");
    mediumTanks.forEach(ht => {
        tec_generatePatreonDisplayBox(patreonDiv, ht);
    });

    tec_generatePatreonDisplayHeader(patreonDiv, "Light Tank Contributors", "var(--ted-beige2) !important");
    lightTanks.forEach(ht => {
        tec_generatePatreonDisplayBox(patreonDiv, ht);
    });

    // tec_generatePatreonDisplayHeader(patreonDiv, "Tankette Contributors", "var(--te-brown)");
    // tankettes.forEach(ht => {
    //     tec_generatePatreonDisplayBox(patreonDiv, ht);
    // });

    var callToAction = document.createElement("A");
    callToAction.classList.add("tec-patreon-supporters-call-to-action");
    callToAction.innerText = "Become a patreon today!";
    callToAction.href = "https://www.patreon.com/tankartfund";
    patreonDiv.appendChild(callToAction);
}

function tec_generatePatreonDisplayBox(appendTo, displayValue) {
    var displayBox = document.createElement("DIV");
    displayBox.classList.add("tec-patreon-supporter")
    displayBox.innerText = displayValue;
    appendTo.appendChild(displayBox);
}

function tec_generatePatreonDisplayHeader(appendTo, headerValue, color) {
    var headerBox = document.createElement("DIV");
    headerBox.classList.add("tec-patreon-header");
    headerBox.innerText = headerValue;
    headerBox.style.color = color;
    appendTo.appendChild(headerBox);
    var headerUnderline = document.createElement("DIV");
    headerUnderline.classList.add("tec-patreon-header-underline");
    headerUnderline.style.backgroundColor = color;
    appendTo.appendChild(headerUnderline);
}

function tec_generatePatreonArticleTable() {
    var patreonDiv = document.querySelector("#patreon-supporters-article");  
    if(!patreonDiv) return;

    var heavyTanks = [];
    var mediumTanks = [];

    tec_te_patreons.forEach((patreon, i) => {
        if(i != 0) {
            if(patreon[1] == "Heavy Tank") {
                heavyTanks.push(patreon[0]);
            }
            if(patreon[1] == "Medium Tank") {
                mediumTanks.push(patreon[0]);
            }
        }
    });

    var titleThankYou = document.createElement("DIV");
    titleThankYou.classList.add("tec-patreon-header");
    titleThankYou.classList.add("tec-patreon-supporters-title");
    titleThankYou.innerText = "Special Thanks to our Medium & Heavy Tier Patreon Supporters!";
    patreonDiv.append(titleThankYou);

    tec_generatePatreonDisplayHeader(patreonDiv, "Heavy Tank Contributors", "var(--ted-yellow) !important");
    heavyTanks.forEach(ht => {
        tec_generatePatreonDisplayBox(patreonDiv, ht);
    });

    tec_generatePatreonDisplayHeader(patreonDiv, "Medium Tank Contributors", "var(--ted-beige) !important");
    mediumTanks.forEach(ht => {
        tec_generatePatreonDisplayBox(patreonDiv, ht);
    });

    var callToAction = document.createElement("A");
    callToAction.classList.add("tec-patreon-supporters-call-to-action");
    callToAction.innerText = "Become a patreon today!";
    callToAction.href = "https://www.patreon.com/tankartfund";
    patreonDiv.appendChild(callToAction);
}