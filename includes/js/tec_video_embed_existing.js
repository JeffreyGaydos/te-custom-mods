function tec_init_existing_embed_video_mobile() {
  //immediately remove the follow-me video when it appears
  var followObserver = new MutationObserver(() => {
    var closeButton = document.querySelector(".exp-ui__sticky__close-btn");
    if(closeButton) {
      closeButton.click(); //"closing" the video essentially resets the embed's UI
      tec_init_exisiting_embed_video_add_fullscreen_button_UI();
      followObserver.disconnect();
    }
  });

  tec_init_existing_embed_video();
}

if(tec_is_client_mobile) {
  tec_init_existing_embed_video_mobile();
} else {
  tec_init_existing_embed_video();
}