/*
 * Creates a random article button located just below the Grow Mediavine social plugin.
 */
function randomArticleButton() {
  //random Article Button - needs to be before dark mode that it reacts to the dark mode settings
  try{
    let button = document.createElement("A");
    button.href = "https://tanks-encyclopedia.com/?redirect_to=random";
    button.classList.add("tec-rand-link");
    button.title = "View a Random Article from Tank Encyclopedia";
    let buttonImage = document.createElement("IMG");
    buttonImage.src = "REPLACE ME WITH NEW LOGO";
    buttonImage.style.padding = "0px 0px 0px 0px";
    let textDiv = document.createElement("DIV");
    textDiv.classList.add("tec-rand-text");
    let textRandom = document.createElement("P");
    textRandom.classList.add("wp-caption-text");
    textRandom.innerText = "RANDOM";
    let textArticle = document.createElement("P");
    textArticle.classList.add("wp-caption-text");
    textArticle.innerText = "ARTICLE";

    button.appendChild(buttonImage);
    document.getElementsByClassName("header-titles-wrapper")[0].appendChild(button);
    textDiv.appendChild(textRandom);
    textDiv.appendChild(textArticle);
    document.getElementsByClassName("header-titles-wrapper")[0].appendChild(textDiv);
  } catch (e) {
      //ignore errors as much as possible
      console.error("Could not initialize andom Article Button");
  }
}

var tec_random_article_button_active = false;

function tec_rand_scroll_test() {
  if(window.pageYOffset > 500 && !tec_is_in_viewport(document.getElementsByClassName("footer-nav-widgets-wrapper header-footer-group")[0]) && !tec_random_article_button_active) {
    tec_rand_activate();
    tec_random_article_button_active = true;
  } else if((window.pageYOffset <= 500 || tec_is_in_viewport(document.getElementsByClassName("footer-nav-widgets-wrapper header-footer-group")[0])) && tec_random_article_button_active) {
    tec_rand_deactivate();
    tec_random_article_button_active = false;
  }
}

function tec_rand_activate() {  
  document.getElementsByClassName("tec-rand-link")[0].style.bottom = "50px";
  document.getElementsByClassName("tec-rand-text")[0].style.bottom = "15px";
}

function tec_rand_deactivate() {
  document.getElementsByClassName("tec-rand-link")[0].style.bottom = "-100px";
  document.getElementsByClassName("tec-rand-text")[0].style.bottom = "-100px";
}

randomArticleButton();

window.addEventListener('scroll', tec_rand_scroll_test);