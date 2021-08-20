function createDarkModeButton() {
    document.getElementsByClassName("header-titles-wrapper")[0].innerHTML = 
        document.getElementsByClassName("header-titles-wrapper")[0].innerHTML + 
        '<div class="tec_dm_div" style="width: 10rem; padding-left: 5px;">' + 
            '<button class="tec_dm_button" style="background-color: #000; border-radius: 5px; height: 50px; padding-top: 0.5rem; width: 9rem" onclick="tec_darkMode()">' + 
                '<p class="tec_dm_p" style="color:#f6dd95; display: block; line-height: 1.2; word-break: normal; text-align: inherit; font-size: 19px; font-weight: 500; letter-spacing: -0.0277em; font-family: \'Allerta Stencil\', sans-serif !important; padding-top: 0px; padding-right: 0rem; text-transform: none;" type="button">Dark Mode</p>' +
            '</button>' + 
        '</div>';
}
createDarkModeButton();