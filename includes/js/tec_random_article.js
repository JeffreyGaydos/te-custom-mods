/*
 * Creates a random article button located just below the Grow Mediavine social plugin.
 */
function randomArticleButton() {
    //random Article Button - needs to be before dark mode that it reacts to the dark mode settings
    try{
        document.getElementsByClassName('dpsp-networks-btns-wrapper dpsp-networks-btns-share dpsp-networks-btns-sidebar  dpsp-has-button-icon-animation')[0].innerHTML += '<div class="dpsp-total-share-wrapper" style="margin-bottom: 0px; margin-top: 0px; padding-top: 50px;"><span>Random</span></div><div class="dpsp-total-share-wrapper" style="margin-top: 0px; margin-bottom: 0px;"><span>Article</span></div><!--Start Random Article Button--><li style="width: 30px !important;"><a rel="nofollow" href="https://tanks-encyclopedia.com/?redirect_to=random" class="dpsp-network-btn dpsp-facebook dpsp-no-label dpsp-first" title="Random Article" style="border-bottom-right-radius: 5px; padding: 3px 3px 3px 3px; background-color: rgb(55, 60, 42); border-color: rgb(55, 60, 42); --networkColor: rgba(55, 60, 42, 0.4) !important; --networkHover: rgba(55, 60, 42, 0.4) !important;" target="jeffsframe"><img src="https://tanks-encyclopedia.com/wp-content/uploads/2020/05/logo-big-border-30.png" style="padding: 0px 0px 0px 0px;"></a></li><!--End Random Article-->';
        //for small mobile screens, the social media tabs cut off the first letter of each line
        document.getElementById("dpsp-floating-sidebar").classList.remove("dpsp-hide-on-mobile");
        document.getElementsByClassName("entry-content")[0].style.paddingLeft = "10px";
        document.getElementsByClassName("entry-content")[0].style.paddingRight = "10px";
    } catch (e) {
        //social media tab doesn't exist in this context
    }
}

randomArticleButton();