
function tec_is_visible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function tec_set_header_visibility(state) {
  if(state) {
    tec_safe_remove_class(document.querySelector("#tec-video-embed-x"), "out");
    tec_safe_remove_class(document.querySelector("#tec-video-embed-header"), "out");
  } else {
    document.querySelector("#tec-video-embed-x").classList.add("out");
    document.querySelector("#tec-video-embed-header").classList.add("out");
  }
}

var tec_video_embed_close_callback_storage;
var tec_video_embed_x_id = "tec-video-embed-x";

function tec_create_header(headerText, closeCallback, insertBeforeNode) {
  var tec_x = document.createElement("DIV");
  tec_x.classList.add("out");
  tec_x.id = tec_video_embed_x_id;
  tec_x.innerHTML = "&Cross;";
  var tec_header = document.createElement("DIV");
  tec_header.classList.add("out");
  tec_header.id = "tec-video-embed-header";
  tec_header.innerText = headerText;

  tec_video_embed_close_callback_storage = closeCallback;

  insertBeforeNode.parentNode.insertBefore(tec_x, insertBeforeNode);
  insertBeforeNode.parentNode.insertBefore(tec_header, insertBeforeNode);
}

//must be linked up AFTER the video has loaded in certain situations
function tec_add_header_close_event() {
  document.querySelector(`#${tec_video_embed_x_id}`).addEventListener("click", () => {
    tec_video_embed_close_callback_storage();
  });
}