var tec_video_embed_existing_is_fs = false;

function tec_init_exisiting_embed_video_add_fullscreen_button_UI() {
  var tec_fullScreen = document.createElement("DIV");
  tec_fullScreen.classList.add("tec-video-embed-out");
  tec_fullScreen.classList.add("hidden");
  tec_fullScreen.classList.add("exp-ui__sound-button");
  tec_fullScreen.classList.add("exp-ui__state__shown");
  tec_fullScreen.id = "tec-video-embed-existing-fs";
  tec_fullScreen.addEventListener("mouseover", (event) => {
    setTimeout(() => {
      //document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown .exp-ui__wrapper").classList.add("exp-ui__state__hovered");
      ///document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown .exp-ui__sound-button").classList.add("exp-ui__state__shown");
      //document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown .exp-ui__prev-button").classList.add("exp-ui__state__shown");
      //document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown .exp-ui__pause-button").classList.add("exp-ui__state__shown");
      //document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown .exp-ui__next-button").classList.add("exp-ui__state__shown");
    }, 200);
  });
  tec_fullScreen.addEventListener("click", () => {
    if(tec_video_embed_existing_is_fs) {
      tec_video_embed_existing_deactivate_fs();
    } else {
      tec_video_embed_existing_activate_fs();      
    }
  });
  tec_fullScreenImage = document.createElement("IMG");
  tec_fullScreenImage.src = "/wp-content/plugins/te-custom-mods/images/FullscreenIcon.png";
  
  tec_fullScreen.appendChild(tec_fullScreenImage);
  document.querySelector(".exp-ui__progress-wrapper").appendChild(tec_fullScreen);
}

function tec_video_embed_existing_activate_fs() {
  document.querySelector("div[data-exs-config].pbs").classList.add("tec-video-embed-existing-fs");
  document.querySelector("div[data-exs-config].pbs").classList.add("alignfull"); //removes a max-width wp style
  //document.querySelector(".exp-ui__meta-title-wrapper").classList.add("tec-video-embed-existing-fs");
  document.querySelector("div[data-exs-config] > div.pbs__player").classList.add("tec-video-embed-existing-fs");
  
  tec_video_embed_existing_calculate_styles();

  tec_video_embed_existing_is_fs = true;
}

function tec_video_embed_existing_deactivate_fs() {
  tec_safe_remove_class(document.querySelector("div[data-exs-config].pbs"), "tec-video-embed-existing-fs");
  tec_safe_remove_class(document.querySelector("div[data-exs-config].pbs"), "alignfull");
  //tec_safe_remove_class(document.querySelector(".exp-ui__meta-title-wrapper"), "tec-video-embed-existing-fs");
  tec_safe_remove_class(document.querySelector("div[data-exs-config] > div.pbs__player"), "tec-video-embed-existing-fs");

  var player = document.querySelector("div[data-exs-config] > div.pbs__player");

  //unset all calculated values
  player.style.top = "";
  player.style.left = "";
  player.style.height = "";
  player.style.width = "";
  player.style.marginLeft = "";
  player.style.marginTop = "";

  tec_safe_remove_class(player, "portrait");
  tec_safe_remove_class(player, "landscape");

  tec_video_embed_existing_is_fs = false;
}

function tec_video_embed_existing_calculate_styles() {
  var player = document.querySelector("div[data-exs-config] > div.pbs__player");

  //Videos are 16:9 by default, figure out which dimension of the mobile screen is the "long side" according to the ratio
  const W = document.body.clientWidth; //the window width does nto account for scrollbar width
  const H = window.innerHeight;
  console.log("inner: " + W + " x " + H);
  const ratio = 16 / 9; //w /h
  
  if(window.innerHeight > window.innerWidth && tec_is_client_mobile) {
    //portrait fullscreen
    player.classList.add("portrait"); //to add non-calculated styling
    tec_safe_remove_class(player, "landscape");
    
    const screenRatio = H / W;
    const calcWidth = ratio > screenRatio ? H : W * ratio;
    const calcHeight = ratio > screenRatio ? H / ratio : W;

    player.style.top = `-${ratio > screenRatio ? H / ratio / 2 : W / 2}px`;
    player.style.left = `${ratio > screenRatio ? H / ratio / 2 : W / 2}px`;
    
    player.style.height = `${calcHeight}px`;
    player.style.width = `${calcWidth}px`;
    player.style.marginLeft = ratio > screenRatio ? `${(W - calcHeight) / 2}px` : 0;
    player.style.marginTop = ratio > screenRatio ? 0 : `${(H - calcWidth) / 2}px`;
  } else {
    //landscape fullscreen
    console.log("landscape fullscreen");
    player.classList.add("landscape"); //to add non-calculated styling
    tec_safe_remove_class(player, "portrait");

    const screenRatio = W / H;
    const calcWidth = ratio <= screenRatio ? H * ratio : W;
    const calcHeight = ratio <= screenRatio ? H : W / ratio;

    player.style.top = 0;
    player.style.left = 0;
    
    player.style.height = `${calcHeight}px`;
    player.style.width = `${calcWidth}px`;
    player.style.marginLeft = ratio <= screenRatio ? `${(W - calcWidth) / 2}px` : 0;
    player.style.marginTop = ratio <= screenRatio ? 0 : `${(H - calcHeight) / 2}px`;
  }
}

function tec_init_existing_embed_video() {
  //add maximization feature to in-article video
  //add maximization feature to follow-me video
  //wait until the video has loaded (our elements get replaced by the exco player somtimes)
  var articleObserver = new MutationObserver(() => {
    if(document.querySelector("div[data-exs-config] video")) {
      var videoPlayerParent = document.querySelector("div[data-exs-config]");
      if(videoPlayerParent && document.querySelector(".exp-ui__progress-wrapper") && !document.querySelector("#tec-video-embed-existing-fs")) {
        tec_init_exisiting_embed_video_add_fullscreen_button_UI();
      }
    }
  });
  var articleContent = document.querySelector(".entry-content");
  articleObserver.observe(articleContent, {childList: true, subtree: true });
}

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

  //wait until the video has loaded (our elements get replaced by the exco player somtimes)
  var articleObserver = new MutationObserver(() => {
    if(document.querySelector("div[data-exs-config] video")) {
      var videoPlayerParent = document.querySelector("div[data-exs-config]");
      if(videoPlayerParent && document.querySelector(".exp-ui__progress-wrapper") && !document.querySelector("#tec-video-embed-existing-fs")) {
        followObserver.observe(videoPlayerParent, { childList: true });
        tec_init_exisiting_embed_video_add_fullscreen_button_UI();
      }
    }
  });
  var articleContent = document.querySelector(".entry-content");
  articleObserver.observe(articleContent, {childList: true, subtree: true });
}


if(tec_is_client_mobile) {
  tec_init_existing_embed_video_mobile();
} else {
  tec_init_existing_embed_video();
}
  
//We need to prevent switching to portrait on desktop machines before activating this
window.addEventListener("resize", () => {
  if(tec_video_embed_existing_is_fs) {
    tec_video_embed_existing_calculate_styles();
  }
});