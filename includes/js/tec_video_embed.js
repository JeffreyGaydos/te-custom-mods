const tec_video_embed_timeout = 30000; //30 seconds
var tec_video_embed_timeouter;

function tec_should_create_embed() {
  if(localStorage.getItem("tec_closedEmbed") == undefined) {
      localStorage.setItem("tec_closedEmbed", "false");
  }
  return localStorage.getItem("tec_closedEmbed") == "false";
}

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

  tec_div.appendChild(tec_player);
  document.querySelector(".entry-content").appendChild(tec_div);
  tec_create_header("Check out T.E.'s Recent Videos!", tec_video_embed_recent_close_cancel, tec_player);

  tec_video_embed_timeouter = setTimeout(() => {
    console.log("tec_video_embed.js: Video loading timed out...");
    tec_video_embed_recent_close_cancel(true);
  }, tec_video_embed_timeout);
}

var tec_videoPlayer;

function onYouTubeIframeAPIReady() {
  tec_videoPlayer = new YT.Player('tec-video-embed-player', {
    height: '168.75',
    widht: '300',
    events: {
      'onReady': tec_on_player_ready
    },
    playerVars: {
      'autoplay': 0,
      'listType': 'playlist',
      'list': 'PLXpVmFPiKKjXFYK6GGVDFYwKBpQced5uZ',
      'suggestedQuality': 'hd720',
      'mute': 0
    }
  });
}

function tec_on_player_ready(event) {
  tec_new_video_close_decision();
  clearTimeout(tec_video_embed_timeouter);
  tec_add_header_close_event();
}

function tec_new_video_close_decision() {
  console.log(tec_videoPlayer.getPlaylist()[0]);
  const currentVideoURL = tec_videoPlayer.getPlaylist()[0];
  if(localStorage.getItem("tec_lastEmbed") === undefined) {
    localStorage.setItem("tec_lastEmbed", currentVideoURL);
  }
  if(localStorage.getItem("tec_lastEmbed") != currentVideoURL) {
    localStorage.setItem("tec_lastEmbed", currentVideoURL);
    localStorage.setItem("tec_closedEmbed", "false");
  }
  if(tec_should_create_embed()) {
    document.querySelector("#tec-video-embed").style.opacity = 1;
    setTimeout(() => {
      tec_set_header_visibility(true);
    }, 1000);
  } else {
    tec_video_embed_recent_close_cancel(true);
  }
}

function tec_video_embed_recent_close_cancel(automated = false) {
  if(!automated) localStorage.setItem("tec_closedEmbed", "true");
  const yt_script = document.querySelector("script#tec_includeYTAPI")
  if(yt_script) yt_script.remove();
  const main_embed = document.querySelector("#tec-video-embed");
  if(main_embed) main_embed.remove();
}

if(!tec_is_client_mobile) {
  tec_video_embed_recent_init();
}