function tec_insert_recent_videos_embed() {
  var tec_fjs = document.getElementsByTagName('script')[0];
  var tec_js = document.createElement('script');
  tec_js.className = 'exco-player';
  tec_js.src = "//player.ex.co/player/ed4b9e7b-2701-4f2d-ba75-695d07041d7c";
  tec_fjs.parentNode.insertBefore(tec_js, tec_fjs);
}

function tec_init_recent_videos_embed() {
  var tec_div = document.createElement("DIV");
  tec_div.id = "ed4b9e7b-2701-4f2d-ba75-695d07041d7c";
  document.body.children[0].insertBefore(tec_div); //TODO: This might need to go elsewhere, like at the beginning of the page content. Not sure on the styling of this embed
  tec_insert_recent_videos_embed(); 
}

tec_init_recent_videos_embed(); //TODO: Only insert the video if the article does not already have a video (and yes, it needs to be only articles)