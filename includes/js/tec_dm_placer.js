function createDarkModeButton() {
    let dmDiv = document.createElement("DIV");
    dmDiv.classList.add("tec_dm_div");
    
    let dmButton = document.createElement("BUTTON");
    dmButton.classList.add("tec_dm_button");
    dmButton.addEventListener("click", () => tec_darkMode());

    let dmP_dark = document.createElement("P");
    dmP_dark.classList.add("tec_dm_p");
    dmP_dark.id = "tec_dark";
    dmP_dark.innerText = "Dark";
    dmButton.appendChild(dmP_dark);
    let dmP_light = document.createElement("P");
    dmP_light.classList.add("tec_dm_p");
    dmP_light.id = "tec_light";
    dmP_light.innerText = "Light";
    dmButton.appendChild(dmP_light);
    let dmP_mode = document.createElement("P");
    dmP_mode.classList.add("tec_dm_p");
    dmP_mode.innerText = "Mode";
    dmButton.appendChild(dmP_mode);
    dmDiv.appendChild(dmButton);

    document.getElementsByClassName("header-titles-wrapper")[0].appendChild(dmDiv);
}
createDarkModeButton();