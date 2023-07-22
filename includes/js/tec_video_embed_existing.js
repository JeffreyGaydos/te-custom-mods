function tec_video_embed_existing_init_mobile() {
  //immediately remove the follow-me video when it appears
  var followObserver = new MutationObserver(() => {
    var closeButton = document.querySelector(".exp-ui__sticky__close-btn");
    console.log("hello?");
    if(closeButton) {
      closeButton.click(); //"closing" the video essentially resets the embed's UI
      tec_video_embed_init_add_fullscreen_button_UI();
      followObserver.disconnect();
    }
  });
  tec_video_embed_init(() => {
    followObserver.observe(document.querySelector("div[data-pbs-root]"), { childList: true });
  });
}

if(tec_is_client_mobile) {
  console.log("hi hi");
  tec_video_embed_existing_init_mobile();
} else {
  tec_video_embed_init();
}