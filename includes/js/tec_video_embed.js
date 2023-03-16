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
  var tec_header_yt_link = document.createElement("A");
  tec_header_yt_link.setAttribute("href", "https://www.youtube.com/@TanksEncyclopediaYT");
  tec_header_yt_link.innerText = "YouTube channel";
  tec_header_yt_link.classList.add("tec-video-yt-link");
  tec_header.innerText = "Check out the latest from our ";
  tec_header.appendChild(tec_header_yt_link);
  tec_div.appendChild(tec_header);
  document.body.insertBefore(tec_div, document.body.children[0]); //TODO: This might need to go elsewhere, like at the beginning of the page content. Not sure on the styling of this embed
  tec_insert_recent_videos_embed(); 
  console.log(document.querySelector('#ed4b9e7b-2701-4f2d-ba75-695d07041d7c div.pbs__player.shown'));
}

tec_init_recent_videos_embed(); //TODO: Only insert the video if the article does not already have a video (and yes, it needs to be only articles)