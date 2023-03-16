//Adds the dark mode button to the clone manually since it is a little slower than the header follow setup
//stands for Create Dark Mode Button Follow - uses code from tec_dark_mode_init.js
function cdmbf() {
    let dmDiv = document.createElement("DIV");
    dmDiv.classList.add("tec_dm_div");
    
    let dmButton = document.createElement("BUTTON");
    dmButton.classList.add("tec_dm_button");
    dmButton.onclick = "tec_darkMode()";

    let dmP = document.createElement("P");
    dmP.classList.add("tec_dm_p");
    dmButton.appendChild(dmP);
    dmDiv.appendChild(dmButton);

    document.getElementsByClassName("header-titles-wrapper")[1].appendChild(dmDiv);
}

//cdmbf();