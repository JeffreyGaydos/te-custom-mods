function tec_init_existing_embed_video() {
    //add maximization feature to in-article video
    //add maximization feature to follow-me video
}

function tec_init_exisiting_embed_video_add_fullscreen_button_UI() {
  var tec_fullScreen = document.createElement("IMG");
  tec_fullScreen.src = "/wp-content/plugins/te-custom-mods/images/FullscreenIcon.png";
  tec_fullScreen.classList.add("tec-video-embed-out");
  tec_fullScreen.classList.add("hidden");
  tec_fullScreen.id = "tec-video-embed-existing-fs";
  tec_fullScreen.addEventListener("mouseover", (event) => {
    setTimeout(() => {
      document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown .exp-ui__wrapper").classList.add("exp-ui__state__hovered");
      document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown .exp-ui__sound-button").classList.add("exp-ui__state__shown");
      document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown .exp-ui__prev-button").classList.add("exp-ui__state__shown");
      document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown .exp-ui__pause-button").classList.add("exp-ui__state__shown");
      document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown .exp-ui__next-button").classList.add("exp-ui__state__shown");
    }, 200);
  });
  tec_fullScreen.addEventListener("click", () => {
    
  });

  document.querySelector(".exp-ui__progress-wrapper").appendChild(tec_fullScreen);


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
      if(videoPlayerParent) {
        followObserver.observe(videoPlayerParent, { childList: true });
        tec_init_exisiting_embed_video_add_fullscreen_button_UI();
        articleObserver.disconnect();
      }
    }
  });
  var articleContent = document.querySelector(".entry-content");
  articleObserver.observe(articleContent, {childList: true, subtree: true });
}

if(window.innerWidth >= 400) {
    if(navigator.userAgentData === undefined) { //firefox, safari, and smaller browser compatibility
      //thank you http://detectmobilebrowsers.com/:
      var a = navigator.userAgent;
      if(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) && !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substring(0,4))) {
        tec_init_existing_embed_video();
      } else {
        tec_init_existing_embed_video_mobile();
      }
    } else if(!navigator.userAgentData.mobile) {
      tec_init_existing_embed_video();
    } else {
      tec_init_existing_embed_video_mobile();
    }
  }