function tec_video_embed_existing_init_mobile() {
  //immediately remove the follow-me video when it appears
  var followObserver = new MutationObserver(() => {
    var closeButton = document.querySelector(".exp-ui__sticky__close-btn");
    if(closeButton) {
      closeButton.click(); //"closing" the video essentially resets the embed's UI
      tec_video_embed_init_add_fullscreen_button_UI();
      followObserver.disconnect();
    }
  });

  tec_video_embed_init();
}

if(tec_is_client_mobile) {
  tec_video_embed_existing_init_mobile();
} else {
  tec_video_embed_init();
}