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
  tec_header.classList.add("tec-video-embed-transition");
  tec_header.classList.add("out");
  var tec_header_yt_link = document.createElement("A");
  tec_header_yt_link.setAttribute("href", "https://www.youtube.com/@TanksEncyclopediaYT");
  tec_header_yt_link.innerText = "YouTube channel";
  tec_header_yt_link.classList.add("tec-video-yt-link");
  tec_header_yt_link.setAttribute("target", "_blank");
  var tec_loading_image = document.createElement("IMG");
  tec_loading_image.src = "http://localhost:8080/wp-content/plugins/te-custom-mods/images/bullet_loading.gif";
  tec_loading_image.classList.add("tec-video-embed-transition");
  tec_loading_image.classList.add("out");
  var tec_X = document.createElement("DIV");
  tec_X.id = "tec-video-embed-X";
  tec_X.classList.add("tec-video-embed-transition");
  tec_X.classList.add("out");
  tec_X.innerText = "🗙";
  tec_X.addEventListener("click", () => tec_close_cancel_video_embed());
  document.body.appendChild(tec_X);
  tec_header.innerText = "Check out the latest from our ";
  tec_header.appendChild(tec_header_yt_link);
  tec_header.append("!");
  tec_div.appendChild(tec_header);
  tec_header.appendChild(tec_loading_image);

  //This one is compeltely hidden so we automagically get the following player from the embed
  //visible elements are styled as fixed
  document.body.insertBefore(tec_div, document.body.children[0]);

  setTimeout(() => {
    tec_safe_remove_class(tec_header, "out");
    tec_safe_remove_class(tec_loading_image, "out");
    tec_safe_remove_class(tec_X, "out");
    tec_insert_recent_videos_embed(); // only load when player is visible
  }, tec_video_embed_delay_ms);
}

function tec_safe_remove_class(node, _class) {
  if(node.classList.contains(_class)) node.classList.remove(_class);
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

const tec_video_embed_delay_ms = 10000; //10 seconds

tec_init_recent_videos_embed(); //TODO: Only insert the video if the article does not already have a video (and yes, it needs to be only articles)