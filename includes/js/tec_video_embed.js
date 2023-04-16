var tec_video_embed_fs_active = false;

function tec_insert_recent_videos_embed() {
  var tec_fjs = document.getElementsByTagName('script')[0];
  var tec_js = document.createElement('script');
  tec_js.className = 'exco-player';
  tec_js.src = "//player.ex.co/player/ed4b9e7b-2701-4f2d-ba75-695d07041d7c";
  tec_fjs.parentNode.insertBefore(tec_js, tec_fjs);
}

function tec_init_recent_videos_embed() {
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
  tec_fullScreen.src = "http://localhost:8080/wp-content/plugins/te-custom-mods/images/FullscreenIcon.png";
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
      tec_safe_remove_class(event.target, "hidden");
    }, 200);
  });
  tec_fullScreen.addEventListener("onmouseexit", (event) => {
    event.target.classList.add("hidden");
  })
  tec_fullScreen.addEventListener("click", () => {
    console.log("fullscreen activated...");
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
      tec_video_embed_on_load(tec_header, tec_X, tec_fullScreen);
    }
  });

  document.body.appendChild(tec_div);
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

function tec_safe_remove_class(node, _class) {
  if(node.classList.contains(_class)) node.classList.remove(_class);
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
}

// function tec_fullscreen_mimic_embed(tec_el) {
//   document.body.addEventListener("mousemove", (e) => {
//     if(document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c").childElementCount < 4) return; //at 4 children, the video has actually been inserted
//     const x_left = window.innerWidth - 367;
//     const x_right = window.innerWidth - 17;
//     const y_bottom = window.innerHeight - 100;
//     const y_top = window.innerHeight - 296.6;
//     if(e.clientX > x_left && e.pageX < x_right && e.clientY < y_bottom && e.clientY > y_top) {
//       tec_safe_remove_class(tec_el, "hidden");
//     } else if(!tec_el.classList.contains("hidden")) {
//       setTimeout(() => {
//         tec_el.classList.add("hidden");
//       }, 200);
//     }
//   });
// }

//const tec_video_embed_delay_ms = 10000; //10 seconds

tec_init_recent_videos_embed(); //TODO: Only insert the video if the article does not already have a video (and yes, it needs to be only articles)