const tec_video_embed_timeout = 30000; //30 seconds
var tec_video_embed_timeouter;

function tec_video_embed_recent_init() {
  var includeYTAPI = document.createElement('script');
  includeYTAPI.id = "tec_includeYTAPI";
  includeYTAPI.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(includeYTAPI, firstScriptTag);

  var tec_div = document.createElement("DIV");
  tec_div.id = "tec-video-embed";
  tec_div.classList.add("follow");
  var tec_player = document.createElement("DIV");
  tec_player.id = "tec-video-embed-player";
  var tec_header = document.createElement("DIV");
  tec_header.classList.add("out");
  tec_header.id = "tec-video-embed-header";
  tec_header.innerText = "Check out T.E.'s Recent Videos!";
  var tec_x = document.createElement("DIV");
  tec_x.classList.add("out");
  tec_x.id = "tec-video-embed-x";
  tec_x.innerText = "🞪";
  tec_x.addEventListener("click", () => {
    tec_video_embed_recent_close_cancel();
  });
  tec_div.appendChild(tec_header);
  tec_div.appendChild(tec_x);
  tec_div.appendChild(tec_player);

  document.querySelector(".entry-content").appendChild(tec_div);

  tec_video_embed_timeouter = setTimeout(() => {
    console.log("tec_video_embed.js: Video loading timed out...");
    tec_video_embed_recent_close_cancel();
  }, tec_video_embed_timeout);
}

var tec_videoPlayer;

function onYouTubeIframeAPIReady() {
  tec_videoPlayer = new YT.Player('tec-video-embed-player', {
    height: '168.75',
    widht: '300',
    events: {
      'onReady': tec_on_player_ready
    }
  });
}

function tec_on_player_ready(event) {
  var randomVideoIndex = `${parseInt(Math.random() * 200)}`; //the YouTube iframe API only loads the first 200 videos of a large playlist. Theoretically this should include the newest 200
  tec_videoPlayer.loadPlaylist({'listType': 'playlist', 'list': 'PLXpVmFPiKKjXFYK6GGVDFYwKBpQced5uZ', 'index': randomVideoIndex, 'startSeconds': '0','suggestedQuality': 'hd720'});
  tec_videoPlayer.setShuffle(true);
  tec_videoPlayer.mute();
  clearTimeout(tec_video_embed_timeouter);
  console.log("tec_video_embed.js: Video loaded successfully");
  tec_safe_remove_class(document.querySelector("#tec-video-embed-header"), "out");
  tec_safe_remove_class(document.querySelector("#tec-video-embed-x"), "out");
}

function tec_video_embed_recent_close_cancel() {
  const yt_script = document.querySelector("script#tec_includeYTAPI")
  if(yt_script) yt_script.remove();
  const main_embed = document.querySelector("#tec-video-embed");
  if(main_embed) main_embed.remove();
}

if(!tec_is_client_mobile) {
  tec_video_embed_recent_init();
}