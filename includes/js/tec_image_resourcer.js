function tec_resource_german_images() {
    var imagesThatLikelyNeedUpdates = document.querySelectorAll('img:not([src^="http"]):not([src^="/wp"])');
    for(var i = 0; i < imagesThatLikelyNeedUpdates.length; i++) {
        var originalSource = imagesThatLikelyNeedUpdates[i].src;
        imagesThatLikelyNeedUpdates[i].src = originalSource.replace("nazi_germany", "germany").replace("localhost:8080", "tanks-encyclopedia.com").replace("http://", "https://");
        console.log("Re-sourced image to \"" + imagesThatLikelyNeedUpdates[i].src + "\"");
    }
}

if(document.location.href.includes("nazi_germany")) {
    tec_resource_german_images();
}