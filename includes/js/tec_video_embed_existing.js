var tec_video_embed_close_lock = false;
var tec_video_embed_rappended = false;


function tec_video_embed_init() {
  var loadIFrame = document.querySelector(".entry-content iframe").cloneNode(true);
  var iframeParent = document.querySelector(".entry-content iframe").parentElement;
  iframeParent.id = "tec_video_embed_iframe_parent";
  loadIFrame.onload = () => {
    console.log("onload");
    var iframe = document.querySelector(".entry-content iframe");
    var tec_frame = document.createElement("DIV");
    tec_frame.id = "tec-frame-placeholder";
    tec_frame.style.height = iframe.style.height;
    iframe.style.marginTop = `-${iframe.style.height}`;
    iframe.parentNode.insertBefore(tec_frame, iframe);

    tec_create_header("Article Video:", tec_close_existing_video_embed, iframe);
    tec_add_header_close_event();
  };
  loadIFrame.id = "tec_video_embed_iframe";
  document.querySelector(".entry-content iframe").remove(); //remove the original iframe so we have the load event on the reappended one

  const videoEmbedObserver = new MutationObserver(() => {
    if(!tec_video_embed_rappended) {
      document.querySelector("#tec_video_embed_iframe_parent").appendChild(loadIFrame);
      document.addEventListener("scroll", () => {
        tec_follow_me_visibility_update(document.querySelector("#tec_video_embed_iframe"), document.querySelector("#tec-frame-placeholder"));
      });
      tec_video_embed_rappended = true;
      videoEmbedObserver.disconnect();
    }
  });

  videoEmbedObserver.observe(document.querySelector(".entry-content"), { childList: true, subtree: true });
}

function tec_close_existing_video_embed() {
  tec_video_embed_close_lock = true;
  tec_safe_remove_class(document.querySelector(".entry-content iframe"), "follow");
  tec_set_header_visibility(false);
}

function tec_follow_me_visibility_update(iframe, placeholder) {
  if(tec_is_visible(placeholder)) {
    tec_safe_remove_class(iframe, "follow");
    tec_video_embed_close_lock = false;
    tec_set_header_visibility(false);
  } else if(!tec_video_embed_close_lock) {
    iframe.classList.add("follow");
    tec_set_header_visibility(true);
  }
}

if(!tec_is_client_mobile) {
  tec_video_embed_init();
}