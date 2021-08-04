function tec_place_rp() {
    try {
        var relatedPosts = document.getElementById("tec-related-posts");
        document.getElementsByTagName("main")[0].appendChild(relatedPosts);
    } catch(e) {
        //no related posts were generated
    }
}

tec_place_rp();