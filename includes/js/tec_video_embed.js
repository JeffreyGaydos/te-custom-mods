var tec_video_embed_fs_active = false;

const tec_video_embed_timeout = 30000; //30 seconds

var tec_video_embed_ui_observer;

function tec_video_embed_recent_insert_exco() {
  var tec_fjs = document.getElementsByTagName('script')[0];
  var tec_js = document.createElement('script');
  tec_js.className = 'exco-player';
  tec_js.src = "//player.ex.co/player/ed4b9e7b-2701-4f2d-ba75-695d07041d7c";
  tec_fjs.parentNode.insertBefore(tec_js, tec_fjs);
}

function tec_video_embed_recent_init() {
  setTimeout(() => {
    if(!tec_video_embed_loaded) {
      console.log("video timed out.");
      tec_close_cancel_video_embed();
    }
  }, tec_video_embed_timeout);

  var tec_div = document.createElement("DIV");
  tec_div.classList.add("tec-video-embed");
  tec_div.classList.add("recent");
  tec_div.id = "ed4b9e7b-2701-4f2d-ba75-695d07041d7c";
  var tec_header = document.createElement("DIV");
  tec_header.classList.add("tec-video-embed-recent-header");
  tec_header.classList.add("tec-video-embed-recent-out");
  var tec_header_yt_link = document.createElement("A");
  tec_header_yt_link.setAttribute("href", "https://www.youtube.com/@TanksEncyclopediaYT");
  tec_header_yt_link.innerText = "YouTube channel";
  tec_header_yt_link.classList.add("tec-video-embed-recent-yt-link");
  tec_header_yt_link.setAttribute("target", "_blank");

  tec_header.innerText = "Check out the latest from our ";
  tec_header.appendChild(tec_header_yt_link);
  tec_header.append("!");
  tec_div.appendChild(tec_header);

  tec_video_embed_init(() => {
    tec_video_embed_recent_on_load();
  }); //NEW

  document.querySelector(".entry-content").appendChild(tec_div);
  
  tec_video_embed_recent_insert_exco();
}

function tec_video_embed_recent_on_load() {
  //encapsulated way to call back when fullscreen is on/off
  tec_video_embed_ui_observer = new MutationObserver(() => {
    document.querySelector(".exp-ui__sticky__close-btn")?.addEventListener("click", () => tec_video_embed_recent_close_cancel());
  });
  tec_video_embed_ui_observer.observe(document.querySelector(".exp-ui__wrapper"), { childList: true });

  const tec_video_header = document.querySelector(".tec-video-embed-recent-header");
  tec_safe_remove_class(tec_video_header, "tec-video-embed-recent-out");
  setTimeout(() => {
    tec_video_header.classList.add("tec-video-embed-recent-transition");
    tec_video_header.classList.add("show");
    document.querySelector(".exp-ui__sticky__close-btn svg path").classList.add("tec-video-embed-recent-transition");
    document.querySelector(".exp-ui__sticky__close-btn").addEventListener("click", () => tec_video_embed_recent_close_cancel());
  }, 1000);

  setTimeout(() => {
    //keep fullscreen animation snappy
    tec_safe_remove_class(tec_video_header, "tec-video-embed-recent-transition");
  }, 2000);
}

function tec_video_embed_recent_close_cancel() {
  tec_video_embed_close_cleanup();

  tec_video_embed_ui_observer?.disconnect();
  const yt_script = document.querySelector(".exco-player")
  if(yt_script) yt_script.remove();
  const main_embed = document.querySelector("#ed4b9e7b-2701-4f2d-ba75-695d07041d7c");
  if(main_embed) main_embed.remove();
}

if(!tec_is_client_mobile) {
  tec_video_embed_recent_init();
}