function createDarkModeButton() {
    let dmDiv = document.createElement("DIV");
    dmDiv.classList.add("tec_dm_div");
    
    let dmButton = document.createElement("BUTTON");
    dmButton.classList.add("tec_dm_button");
    dmButton.addEventListener("click", () => tec_darkMode());

    let dmP = document.createElement("P");
    dmP.classList.add("tec_dm_p");
    dmP.innerText = "Dark Mode";
    dmButton.appendChild(dmP);
    dmDiv.appendChild(dmButton);

    document.getElementsByClassName("header-titles-wrapper")[0].appendChild(dmDiv);
}
createDarkModeButton();