if(window.location.href.endsWith("admin.php?page=tec-settings")) { //Conditional to avoid unused JS
console.log("admin panel");

const splitStr = "::::";
const splitCell = ",";

document.querySelector('#csv-input').addEventListener("change", (event) => { ParseCSVFile(event); })
document.querySelector('#public-data').addEventListener("click", (event) => { ShowRawPublicData(); });
document.querySelector('#show-patreon-details').addEventListener("click", (event) => { ShowPatreonDetails(); });

DisplayCSVFile(document.querySelector("textarea[name=tec_support_display_supporters_saved]").value, "current-patreon-supporters"); //display existing values

var allCurrentNames = [];
var allCurrentEmails = [];
var allCurrentLifetimeAmounts = [];
var allCurrentTiers = [];
document.querySelectorAll("td:nth-child(1):not(#current-patreon-supporters)").forEach(n => {
    allCurrentNames.push(n.innerText);
});
document.querySelectorAll("td:nth-child(2):not(#new-patreon-supporters-list)").forEach(n => {
    allCurrentEmails.push(n.innerText);
});
document.querySelectorAll("td:nth-child(3)").forEach(n => {
    allCurrentLifetimeAmounts.push(n.innerText);
});
document.querySelectorAll("td:nth-child(4)").forEach(n => {
    allCurrentTiers.push(n.innerText);
});

function ParseCSVFile(e) {
    e.target.files[0].text().then((data) => {
        var sanitizedInput = data.replaceAll("\n\r", splitStr).replaceAll("\r\n", splitStr).replaceAll("\n", splitStr).replaceAll("\r", splitStr);
        document.querySelector("textarea[name=tec_support_display_supporters_saved]").innerText = sanitizedInput
        ShowPatreonDetails(true);
        ConstructPublicData(sanitizedInput);
        DisplayCSVFile(sanitizedInput, "new-patreon-supporters-list");
    }).catch((e) => {
        alert("The input file could not be read properly. It must be a valid CSV file. Check console for details.");
        console.error(e);
    });
}

function ConstructPublicData(text) {
    var rows = text.split(splitStr);
    if(rows.length == 0) {
        return;
    }
    var publicData = [];
    var headers = rows[0].split(splitCell);
    var nameIndex = -1;
    var tierIndex = -1;
    headers.forEach((header, i) => {
        if(header == "Name") {
            nameIndex = i;
        } else if(header == "Tier") {
            tierIndex = i;
        }
    });
    rows.forEach(unsplitRow => {
        var row = unsplitRow.split(splitCell);
        var publicRow = [row[nameIndex], row[tierIndex]]
        publicData.push(publicRow);
    });
    var publicDataJson = JSON.stringify(publicData);
    document.querySelector("textarea[name=tec_support_display_supporters_public]").innerText = publicDataJson;
}

function ShowRawPublicData() {
    if(document.querySelector("#public-data").innerText == "view raw public data") {
        document.querySelector("#public-data").innerText = document.querySelector("textarea[name=tec_support_display_supporters_public]").innerText;
    } else {
        document.querySelector("#public-data").innerText = "view raw public data";
    }
}

function ShowPatreonDetails(force = undefined) {
    if((force === undefined && document.querySelector("#patreon-details").style.display == "none") || force) {
        document.querySelector('#show-patreon-details').innerText = "Hide current data";
        document.querySelector("#patreon-details").style.display = "block";
    } else {
        document.querySelector('#show-patreon-details').innerText = "Show current data";
        document.querySelector("#patreon-details").style.display = "none";
    }
    
}

function DisplayCSVFile(text, idWhere) {
    //clear out any previously created table first
    if(document.querySelector("#new-patreon-supporters-list table")) {
        document.querySelector("#new-patreon-supporters-list table").remove();
        document.querySelectorAll("td:nth-child(2):not(#new-patreon-supporters-list)").forEach((n, i) => {
            n.parentElement.style.backgroundColor = i % 2 != 0 ? "#f0f0f1" : "white"; //reset deletions before regen; needs swapped for some reason...
        });
    }

    var rows = text.split(splitStr);
    var htmlTable = document.createElement("TABLE");
    htmlTable.style.border = "1px solid black";
    if(rows.length == 0) {
        document.querySelector(`#${idWhere}`).appendChild(htmlTable);
    }
    var headers = rows[0].split(splitCell);
    var nameIndex = -1;
    var emailIndex = -1;
    var lifetimeAmountIndex = -1;
    var tierIndex = -1;
    headers.forEach((header, i) => {
        if(header == "Name") {
            nameIndex = i;
        } else if(header == "Email") {
            emailIndex = i;
        } else if(header == "Lifetime Amount") {
            lifetimeAmountIndex = i;
        } else if(header == "Tier") {
            tierIndex = i;
        }
    });

    if(nameIndex == -1) {
        console.warn("Count not find name index...");
    }
    if(emailIndex ==-1) {
        console.warn("Count not find email index...");
    }
    if(lifetimeAmountIndex == -1) {
        console.warn("Count not find lifetime index...");
    }
    if(tierIndex == -1) {
        console.warn("Could not find tier index...");
    }

    var htmlHeaderRow = document.createElement("TR");
    var htmlHeaderName = document.createElement("TH");
    htmlHeaderName.innerText = "Name";
    var htmlHeaderEmail = document.createElement("TH");
    htmlHeaderEmail.innerText = "Email";
    var htmlHeaderLifetimeAmount = document.createElement("TH");
    htmlHeaderLifetimeAmount.innerText = "Lifetime Amount";
    var htmlHeaderTier = document.createElement("TH");
    htmlHeaderTier.innerText = "Tier";
    htmlHeaderRow.appendChild(htmlHeaderName);
    htmlHeaderRow.appendChild(htmlHeaderEmail);
    htmlHeaderRow.appendChild(htmlHeaderLifetimeAmount);
    htmlHeaderRow.appendChild(htmlHeaderTier);
    htmlTable.appendChild(htmlHeaderRow);

    var newEmails = [];

    rows.forEach((unsplitRow, i) => {
        if(i != 0) {
            var row = unsplitRow.split(",");
            var htmlRow = document.createElement("TR");
            htmlRow.style.border = "1px solid black";
            htmlRow.style.backgroundColor = i % 2 == 0 ? "#f0f0f1" : "white";
            
            //to track deletions
            newEmails.push(row[emailIndex]);
            //to track additions
            if(!(allCurrentEmails?.includes(row[emailIndex]) ?? true)) {
                htmlRow.style.backgroundColor = i % 2 == 0 ? "#00cc00" : "#00aa00";
            }
            //to track udpates; keyed on email
            var keyIndex = allCurrentEmails?.indexOf(row[emailIndex]) ?? -1;
            
            var htmlDataName = document.createElement("TD");
            htmlDataName.innerText = row[nameIndex];
            if(keyIndex != -1 && row[nameIndex] != allCurrentNames[keyIndex]) { //color as update
                htmlDataName.style.backgroundColor = i % 2 == 0 ? "#ccccff" : "#bbbbff";
            }
            var htmlDataEmail = document.createElement("TD");
            htmlDataEmail.innerText = row[emailIndex];
            var htmlDataLifetimeAmount = document.createElement("TD");
            htmlDataLifetimeAmount.innerText = row[lifetimeAmountIndex];
            if(keyIndex != -1 && row[lifetimeAmountIndex] != allCurrentLifetimeAmounts[keyIndex]) { //color as update
                htmlDataLifetimeAmount.style.backgroundColor = i % 2 == 0 ? "#ccccff" : "#bbbbff";
            }
            var htmlDataTier = document.createElement("TD");
            if(keyIndex != -1 && row[tierIndex] != allCurrentTiers[keyIndex]) { //color as update
                htmlDataTier.style.backgroundColor = i % 2 == 0 ? "#ccccff" : "#bbbbff";
            }
            htmlDataTier.innerText = row[tierIndex];
            htmlRow.appendChild(htmlDataName);
            htmlRow.appendChild(htmlDataEmail);
            htmlRow.appendChild(htmlDataLifetimeAmount);
            htmlRow.appendChild(htmlDataTier);
            htmlTable.appendChild(htmlRow);
        }
    });

    //style deletions
    document.querySelectorAll("td:nth-child(2):not(#new-patreon-supporters-list)").forEach(n => {
        if(!newEmails.includes(n.innerText)) {
            n.parentElement.style.backgroundColor = "#cc0000";
        }
    });

    if(idWhere == "new-patreon-supporters-list")
        document.querySelector("#unhide-me-when-input").style.display = "table-cell";
    document.querySelector(`#${idWhere}`).appendChild(htmlTable);
}

} //Conditional to avoid unused JS