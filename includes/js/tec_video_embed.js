var tec_video_embed_fs_active = false;

var tec_video_embed_loaded = false;
const tec_video_embed_timeout = 30000; //30 seconds

function tec_insert_recent_videos_embed() {
  var tec_fjs = document.getElementsByTagName('script')[0];
  var tec_js = document.createElement('script');
  tec_js.className = 'exco-player';
  tec_js.src = "//player.ex.co/player/ed4b9e7b-2701-4f2d-ba75-695d07041d7c";
  tec_fjs.parentNode.insertBefore(tec_js, tec_fjs);
}

function tec_init_recent_videos_embed() {
  setTimeout(() => {
    if(!tec_video_embed_loaded) {
      console.log("timed out.");
      tec_close_cancel_video_embed();
    }
  }, tec_video_embed_timeout);

  var tec_div = document.createElement("DIV");
  tec_div.classList.add("tec-video-embed");
  tec_div.id = "ed4b9e7b-2701-4f2d-ba75-695d07041d7c";
  var tec_header = document.createElement("DIV");
  tec_header.classList.add("tec-video-embed-header");
  tec_header.classList.add("tec-video-embed-out");
  var tec_header_yt_link = document.createElement("A");
  tec_header_yt_link.setAttribute("href", "https://www.youtube.com/@TanksEncyclopediaYT");
  tec_header_yt_link.innerText = "YouTube channel";
  tec_header_yt_link.classList.add("tec-video-yt-link");
  tec_header_yt_link.setAttribute("target", "_blank");
  var tec_X = document.createElement("DIV");
  tec_X.id = "tec-video-embed-X";
  tec_X.classList.add("tec-video-embed-out");
  tec_X.innerText = "🗙";
  tec_X.addEventListener("click", () => tec_close_cancel_video_embed());
  document.body.appendChild(tec_X);
  
  var tec_fullScreen = document.createElement("IMG");
  tec_fullScreen.src = "/wp-content/plugins/te-custom-mods/images/FullscreenIcon.png";
  tec_fullScreen.classList.add("tec-video-embed-out");
  tec_fullScreen.classList.add("hidden");
  tec_fullScreen.id = "tec-video-embed-fs";
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
    if(tec_video_embed_fs_active) {
      tec_deactivate_fullscreen();
    } else {
      tec_activate_fullscreen();
    }
    tec_video_embed_fs_active = !tec_video_embed_fs_active;
  });

  document.body.appendChild(tec_fullScreen);
  tec_header.innerText = "Check out the latest from our ";
  tec_header.appendChild(tec_header_yt_link);
  tec_header.append("!");
  tec_div.appendChild(tec_header);
  var tec_observer = new MutationObserver(() => {
    if(document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c").childElementCount >= 4) {
      tec_video_embed_loaded = true;
      tec_video_embed_on_load(tec_header, tec_X, tec_fullScreen);

      var tec_fullscreen_observer = new MutationObserver(() => {
        if(!document.querySelector(".exp-ui__wrapper").classList.contains("exp-ui__state__hovered") && !tec_fullScreen.classList.contains("hidden")) {
          tec_fullScreen.classList.add("hidden");
        }
        if(document.querySelector(".exp-ui__wrapper").classList.contains("exp-ui__state__hovered") && tec_fullScreen.classList.contains("hidden")) {
          tec_safe_remove_class(tec_fullScreen, "hidden");
        }
      });

      tec_fullscreen_observer.observe(document.querySelector(".exp-ui__wrapper"), { attributes: true } );
    }
  });

  document.body.appendChild(tec_div);
  document.addEventListener("keydown", (event) => {
    if(event.code == 'Escape') {
      tec_fullScreen.click();
    }
  });

  tec_observer.observe(tec_div, {childList: true});
  
  tec_insert_recent_videos_embed();
}

function tec_video_embed_on_load(tec_header, tec_X, tec_fullScreen) {
  const video_player = document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c").children[2];
  video_player.addEventListener("mouseenter", () => tec_safe_remove_class(tec_fullScreen, "hidden"));
  video_player.addEventListener("mouseleave", () => {
    setTimeout(() => {
      tec_fullScreen.classList.add("hidden");
    }, 200);
  });
  
  //slide in the video player
  tec_safe_remove_class(tec_header, "tec-video-embed-out");
  tec_safe_remove_class(tec_X, "tec-video-embed-out");
  tec_safe_remove_class(tec_fullScreen, "tec-video-embed-out");

  setTimeout(() => {
    tec_header.classList.add("tec-video-embed-transition");
    tec_X.classList.add("tec-video-embed-transition");
    tec_header.classList.add("tec-video-embed-show");
    tec_X.classList.add("tec-video-embed-show");
  }, 1000);
}

function tec_activate_fullscreen() {
  document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown").classList.add("tec-video-embed-fs-active");
  document.querySelector("#tec-video-embed-fs").classList.add("tec-video-embed-fs-active");
  document.querySelector("#tec-video-embed-X").classList.add("tec-video-embed-fs-active");
  document.querySelector(".tec-video-embed-header").classList.add("tec-video-embed-fs-active");
  document.querySelectorAll("header").forEach(h => {
    h.style.display = "none";
  });
  
  //deliberately NOT removed on deactivation...
  document.querySelector(".tec-video-embed-header").classList.add("tec-video-embed-transition-off");
  document.querySelector("#tec-video-embed-X").classList.add("tec-video-embed-transition-off");
}

function tec_deactivate_fullscreen() {
  tec_safe_remove_class(document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c .pbs__player.shown"), "tec-video-embed-fs-active");
  tec_safe_remove_class(document.querySelector("#tec-video-embed-fs"), "tec-video-embed-fs-active");
  tec_safe_remove_class(document.querySelector("#tec-video-embed-X"), "tec-video-embed-fs-active");
  tec_safe_remove_class(document.querySelector(".tec-video-embed-header"), "tec-video-embed-fs-active");
  document.querySelectorAll("header").forEach(h => {
    h.style.display = "";
  });
}

function tec_close_cancel_video_embed() {
  const yt_x = document.querySelector(".exp-ui__sticky__close-btn");
  if(yt_x) yt_x.click();
  const yt_script = document.querySelector(".exco-player")
  if(yt_script) yt_script.remove();
  const main_embed = document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c");
  if(main_embed) main_embed.remove();
  const main_x = document.querySelector("#tec-video-embed-X");
  if(main_x) main_x.remove();

  tec_deactivate_fullscreen(); //safe if not in fullscreen
}

if(window.innerWidth >= 400) {
  if(navigator.userAgentData === undefined) { //firefox, safari, and smaller browser compatibility
    //thank you http://detectmobilebrowsers.com/:
    var a = navigator.userAgent;
    if(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) && !/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substring(0,4))) {
      tec_init_recent_videos_embed();
    }
  } else if(!navigator.userAgentData.mobile) {
    tec_init_recent_videos_embed();
  }
}