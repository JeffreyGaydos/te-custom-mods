/*
 * Creates a random article button located just below the Grow Mediavine social plugin.
 */
function randomArticleButton() {
  //random Article Button - needs to be before dark mode that it reacts to the dark mode settings
  try{
  document.getElementsByClassName("header-titles-wrapper")[0].innerHTML = 
          document.getElementsByClassName("header-titles-wrapper")[0].innerHTML + 
          '<a href="https://tanks-encyclopedia.com/?redirect_to=random" class="tec-rand-link" style="cursor: pointer; width: 40px !important; height: 40px !important; position: fixed; bottom: 50px; left: 20px; background-color: rgba(55, 60, 42, 1); padding: 5px; border-radius: 5px"><img src="https://tanks-encyclopedia.com/wp-content/uploads/2020/05/logo-big-border-30.png" style="padding: 0px 0px 0px 0px;" /></a><div class="tec-rand-text" style="text-align: center; font-size: 12px; position: fixed; left: 12.5px; bottom: 15px; width: 55px;"><p style="font-size:inherit; margin: 0px;" class="wp-caption-text">RANDOM</p><p style="font-size:inherit; margin: 0px;" class="wp-caption-text">ARTICLE</p></div>';
  } catch (e) {
      //ignore errors as much as possible
  }
}

randomArticleButton();