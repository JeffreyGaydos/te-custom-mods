var tec_video_embed_is_fs = false;
var tec_something_is_really_dumb_and_removes_my_width_style_for_no_reason;
var tec_video_embed_loaded = false;
var tec_video_embed_load_observer;
var tec_video_embed_fs_observer;

function tec_video_embed_activate_fs() {
    document.querySelector("div[data-pbs-root].pbs").classList.add("tec-video-embed-existing-fs");
    document.querySelector("div[data-pbs-root].pbs").classList.add("alignfull"); //removes a max-width wp style
    document.querySelector("div[data-pbs-root].pbs").classList.add("tec-video-embed-fs-active");
    //document.querySelector(".exp-ui__meta-title-wrapper").classList.add("tec-video-embed-existing-fs");
    document.querySelector("div[data-pbs-root] > div.pbs__player").classList.add("tec-video-embed-existing-fs");
    
    tec_video_embed_existing_calculate_styles();
  
    tec_video_embed_is_fs = true;
}
  
function tec_video_embed_deactivate_fs() {
    tec_video_embed_disconnect_width_hack(); //we no longer need the hack, only on entering fullscreen

    tec_safe_remove_class(document.querySelector("div[data-pbs-root].pbs"), "tec-video-embed-existing-fs");
    tec_safe_remove_class(document.querySelector("div[data-pbs-root].pbs"), "alignfull");
    tec_safe_remove_class(document.querySelector("div[data-pbs-root].pbs"), "tec-video-embed-fs-active");
    //tec_safe_remove_class(document.querySelector(".exp-ui__meta-title-wrapper"), "tec-video-embed-existing-fs");
    tec_safe_remove_class(document.querySelector("div[data-pbs-root] > div.pbs__player"), "tec-video-embed-existing-fs");
  
    var player = document.querySelector("div[data-pbs-root] > div.pbs__player");
  
    //unset all calculated values
    player.style.top = "";
    player.style.left = "";
    player.style.height = "";
    player.style.width = "";
    player.style.marginLeft = "";
    player.style.marginTop = "";
  
    tec_safe_remove_class(player, "portrait");
    tec_safe_remove_class(player, "landscape");
  
    tec_video_embed_is_fs = false;
}

  
function tec_video_embed_existing_calculate_styles() {
    var player = document.querySelector("div[data-pbs-root] > div.pbs__player");
  
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

        tec_video_embed_observe_width_hack(calcWidth);

        player.style.marginLeft = ratio <= screenRatio ? `${(W - calcWidth) / 2}px` : 0;
        player.style.marginTop = ratio <= screenRatio ? 0 : `${(H - calcHeight) / 2}px`;
    }
}

function tec_video_embed_init_add_fullscreen_button_UI() {
    var tec_fullScreen = document.createElement("DIV");
    tec_fullScreen.classList.add("tec-video-embed-out");
    tec_fullScreen.classList.add("hidden");
    tec_fullScreen.classList.add("exp-ui__sound-button");
    tec_fullScreen.classList.add("exp-ui__state__shown");
    tec_fullScreen.id = "tec-video-embed-existing-fs";
    tec_fullScreen.addEventListener("click", () => {
      if(tec_video_embed_is_fs) {
        tec_video_embed_deactivate_fs();
      } else {
        tec_video_embed_activate_fs();      
      }
    });
    tec_fullScreenImage = document.createElement("IMG");
    tec_fullScreenImage.src = "/wp-content/plugins/te-custom-mods/images/FullscreenIcon.png";
    
    tec_fullScreen.appendChild(tec_fullScreenImage);
    document.querySelector(".exp-ui__wrapper").appendChild(tec_fullScreen);
  
    //helps us get the fading right...
    tec_video_embed_fs_observer = new MutationObserver(() => {
      tec_fullScreen = document.querySelector("#tec-video-embed-existing-fs");
      if(!document.querySelector(".exp-ui__wrapper")?.classList.contains("exp-ui__state__hovered") && !tec_fullScreen?.classList.contains("hidden")) {
        tec_fullScreen.classList.add("hidden");
      }
      if(document.querySelector(".exp-ui__wrapper")?.classList.contains("exp-ui__state__hovered") && tec_fullScreen?.classList.contains("hidden")) {
        tec_safe_remove_class(tec_fullScreen, "hidden");
      }
    });
    tec_video_embed_fs_observer.observe(document.querySelector(".exp-ui__wrapper"), { attributes: true });
  }
  
  function tec_video_embed_init(onload_callback) {
    //wait until the video has loaded (our elements get replaced by the exco player somtimes)
    tec_video_embed_load_observer = new MutationObserver(() => {
      if(!tec_video_embed_loaded) {
        var videoPlayerParent = document.querySelector("div[data-pbs-root]");
        if(videoPlayerParent && document.querySelector(".exp-ui__wrapper") && !document.querySelector("#tec-video-embed-existing-fs")) {
          tec_video_embed_init_add_fullscreen_button_UI();
        }
        if(document.querySelector("div[data-pbs-root]")?.childElementCount >= 4) {
          //at this point the video has appeared and started playing...
          tec_video_embed_loaded = true;
          tec_video_embed_remove_load_observer();
          onload_callback();
        }
      }
    });
    var articleContent = document.querySelector(".entry-content");
    tec_video_embed_load_observer.observe(articleContent, {childList: true, subtree: true, attributes: true });
  }

function tec_video_embed_remove_load_observer() {
  tec_video_embed_load_observer?.disconnect();
}

//cleans up all mutation observers so they don't explode (if present)
//should be called when you need to remove the video embed entirely
//(ex. recent videos close button)
function tec_video_embed_close_cleanup() {
  tec_video_embed_fs_observer?.disconnect();
  tec_video_embed_remove_load_observer();
  tec_video_embed_disconnect_width_hack();
}

/*
 * Yes, all this is just because some unknown system is obliterating our width style, not though a
 * class, but directly on the element in the same way we set it. This forces us to detect that change
 * and re-apply the width after the fact. Then we need to do some clean-up of our observer and make
 * sure it doesn't run when it's not needed.
 */
var tec_video_embed_width_observer;
var tec_video_embed_width_observing = false;
var tec_video_embed_width_changes = 0;

function tec_video_embed_observe_width_hack(widthToSet) {
    if(document.querySelector('div[data-pbs-position="sticky"]') && !tec_video_embed_width_observing) {
        tec_video_embed_width_changes = 0;
        tec_video_embed_width_observer = new MutationObserver(() => {
            tec_video_embed_width_observing = true;
            tec_video_embed_width_changes++;
            if(tec_video_embed_width_changes == 2) {
                document.querySelector("div[data-pbs-root] > div.pbs__player").style.width = `${widthToSet}px`;
            }
        });
        tec_video_embed_width_observer.observe(document.querySelector("div[data-pbs-root] > div.pbs__player"), { attributes: true });
    }
}

function tec_video_embed_disconnect_width_hack() {
    tec_video_embed_width_observer?.disconnect();
    tec_video_embed_width_observer = undefined; //garbage collection? also we shouldn't be using it at this point
    tec_video_embed_width_observing = false;
}
/* End width observer hack */

window.addEventListener("resize", () => {
    tec_video_embed_disconnect_width_hack();
    if(tec_video_embed_is_fs) {
      tec_video_embed_existing_calculate_styles();
    }
});

document.addEventListener("keydown", (event) => {
  if(tec_video_embed_is_fs && event.code == 'Escape') {
    document.querySelector("#tec-video-embed-existing-fs").click();
  }
});