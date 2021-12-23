//Adds the dark mode button to the clone manually since it is a little slower than the header follow setup
//stands for Create Dark Mode Button Follow - uses code from tec_dark_mode_init.js
function cdmbf() {
    document.getElementsByClassName("header-titles-wrapper")[1].innerHTML = 
        document.getElementsByClassName("header-titles-wrapper")[1].innerHTML + 
        '<div style="width: 10rem; padding-left: 5px;">' + 
            '<button class="JeffsDarkModeButton" style="background-color: #000; border-radius: 5px; height: 50px; padding-top: 0.5rem; width: 9rem" onclick="tec_darkMode()">' + 
                '<p class="JeffsDarkModeText" style="color:#f6dd95; display: block; line-height: 1.2; word-break: normal; text-align: inherit; font-size: 19px; font-weight: 500; letter-spacing: -0.0277em; font-family: \'Allerta Stencil\', sans-serif !important; padding-top: 0px; padding-right: 0rem; text-transform: none;" type="button">Dark Mode</p>' +
            '</button>' + 
        '</div>';
}

//cdmbf();