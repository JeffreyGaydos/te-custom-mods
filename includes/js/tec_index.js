var tec_innerIndexWrapperHeight_open;
var tec_innerIndexWrapperHeight_closed;
var tec_index_visible = false;
var tec_index_animation_handler;
var tec_index_measure_handler;

//checking if an index should be generated by this page
if(!(document.getElementById("no_index"))) {
    tec_generateIndex();
    tec_closeIndex();
}

function tec_closeIndex() {
    clearTimeout(tec_index_animation_handler);
    tec_safe_remove_class(document.getElementById("tec_indexBox"), "open");
    tec_safe_remove_class(document.getElementById("tec_indexList"), "visible");
    document.getElementById("tec_innerIndexWrapper").style.height = `${tec_innerIndexWrapperHeight_closed}px`;
}

//The idea here is to use the user's action to determine when we need to calculate heights
//There is not really a good event we can hook into that tells us when certain "auto" CSS is applied
function tec_openIndex() {
    if(!tec_innerIndexWrapperHeight_closed) {
        tec_innerIndexWrapperHeight_closed ??= document.getElementById("tec_indexWrapper").clientHeight;
        document.getElementById("tec_innerIndexWrapper").style.height = `${tec_innerIndexWrapperHeight_closed}px`;
        document.getElementById("tec_indexList").classList.add("after-measuring");
    }
    document.getElementById("tec_indexBox").classList.add("open");
    tec_index_animation_handler = setTimeout(() => {
        document.getElementById("tec_indexList").classList.add("visible");
    }, 350);
    tec_innerIndexWrapperHeight_open ??= document.getElementById("tec_indexList").clientHeight + tec_innerIndexWrapperHeight_closed;
    document.getElementById("tec_innerIndexWrapper").style.height = `${tec_innerIndexWrapperHeight_open}px`;
}

/*
 *  Called when the dropdown image is clicked.
 *  Generates the index links and rotates the dropdown arrow.
 */
function tec_toggleIndex() {
    tec_index_visible = !tec_index_visible;
    if(tec_index_visible) {
        tec_openIndex();
    } else {
        tec_closeIndex();
    }
}

//Adds should not be inside the index feature. Remove any that slip in
function tec_removeAds(item, index) {
	try {
		if(item.childElementCount > 2) {
			item.removeChildNodes(item.childNodes[1]);
		}
	} catch(e) {
		//no adds found
	}
}

function tec_shouldIgnoreH2(h2element) {
    return tec_isH2ImgOnly(h2element) || tec_isTitle(h2element);
}

function tec_shouldIgnoreH3(h3element) {
    return tec_isH3ImgOnly(h3element) || tec_isPromoH3(h3element);
}

function tec_isH2ImgOnly(h2element) {
    var allImgH2s = document.querySelectorAll("h2 img");
    var res = false;
    allImgH2s.forEach((el) => {
        if(h2element == el.parentElement && h2element.innerText == "") {
            res = true;
        }
    });
    return res;
}

function tec_isH3ImgOnly(h3element) {
    var allImgH3s = document.querySelectorAll("h3 img");
    var res = false;
    allImgH3s.forEach((el) => {
        if(h3element == el.parentElement && h3element.innerText == "") {
            res = true;
        }
    });
    return res;
}

function tec_isTitle(h2element) {
    return document.querySelector(".entry-content h2") == h2element && h2element.querySelectorAll("img").length > 0 && h2element.innerText.length > 0;
}

function tec_isPromoH3(h3element) {
    //title of book is not picked up by generator, so remove author, leave buy on amazon link
    return h3element && h3element.innerText.indexOf('By Craig Moore') != -1;
    //we want to promote our shirts as much as possible
    return h3element && (h3element.innerHTML.indexOf('Tank-It') != -1 || h3element.innerHTML.indexOf('Support Shirt') != -1);
}

//inserts the table of contents dynamically into all articles
function tec_generateIndex() {
    //these collections contain the position information for each HTML tag object
    var h2c = [];
    var h3c = [];
    if(document.getElementsByClassName("entry-content")[0]) {
        h2c = document.getElementsByClassName("entry-content")[0].getElementsByTagName("h2");
        h3c = document.getElementsByClassName("entry-content")[0].getElementsByTagName("h3");
    }

    if(h2c.length + h3c.length == 0) return; //nothing to display...
	
	for(var k = 0; k < h2c.length; k++) {
		tec_removeAds(h2c[k], k);
	}
	
	for(var l = 0; l < h3c.length; l++) {
		tec_removeAds(h3c[l], l);
	}
    
    var h2TagsList = new Array();
    
    for(var i = 0; i < h2c.length; i++) {
        if(!tec_shouldIgnoreH2(h2c[i])) {
            h2TagsList.push(new tec_tagSpot(h2c[i], h2c[i].getBoundingClientRect().top, 2));
        }
    }

    var h3TagsList = new Array();
    for(var j = 0; j < h3c.length; j++) {
        if(!tec_shouldIgnoreH3(h3c[i])) {
            h3TagsList.push(new tec_tagSpot(h3c[j], h3c[j].getBoundingClientRect().top, 3));
        }
    }

    var fullIndex = h3TagsList.concat(h2TagsList);
    //sorts tha array of objects according to their position on the page in y
    fullIndex.sort(function(a, b){return a.y - b.y});
    //render the box for the index
    var tec_indexBox = document.createElement("H2");
    tec_indexBox.id = "tec_indexBox";
    var indexWrapper = document.createElement("DIV");
    indexWrapper.classList.add("entry-content");
    indexWrapper.id = "tec_indexWrapper";
    var innerIndexWrapper = document.createElement("DIV");
    innerIndexWrapper.id = "tec_innerIndexWrapper";
    var indexToggler = document.createElement("A");
    indexToggler.id = "tec_indexToggler";
    indexToggler.addEventListener("click", tec_toggleIndex);
    var indexContent = document.createElement("H2");
    indexContent.id = "tec_indexContent";
    indexContent.innerText = "Contents:";
    var indexDropdown = document.createElement("SPAN");
    indexDropdown.id = "tec_indexDropdown";
    var indexDropdownImage = document.createElement("IMG");
    indexDropdownImage.id = "tec_indexIcon";
    indexDropdownImage.src = "/wp-content/plugins/te-custom-mods/images/DropdownBlack.png";
    indexDropdown.appendChild(indexDropdownImage);
    indexContent.appendChild(indexDropdown);
    indexToggler.appendChild(indexContent);
    innerIndexWrapper.appendChild(indexToggler);
    var indexList = document.createElement("OL");
    indexList.id = "tec_indexList";

    //The Linker: link up each index element to an ID on the page (also add that ID to the elements in the page)
    for(var k = 0; k < fullIndex.length; k++) {
        if(fullIndex[k].h == 2) {
            if(!tec_shouldIgnoreH2(fullIndex[k].t)) {
                indexList.appendChild(tec_indexH2(fullIndex[k].t.innerText, "index" + k));
                //finding the in-page element so we can change its id to link to the index
                var l = 0;
                while(l < h2c.length && fullIndex[k].t.innerText != h2c[l].innerText) {
                    l++;
                }
                if(l < h2c.length) {
                    h2c[l].id = "index" + k;
                }
            }
        } else {
            if(!tec_shouldIgnoreH3(fullIndex[k].t)) {
                //check is so that first element looks good
                indexList.appendChild(k == 0 ? tec_indexH2(fullIndex[k].t.innerText, "index" + k) : tec_indexH3(fullIndex[k].t.innerText, "index" + k));
                //finding the in-page element so we can change its id to link to the index
                var l = 0;
                while(l < h3c.length && fullIndex[k].t.innerText != h3c[l].innerText) {
                    l++;
                }
                if(l < h3c.length) {
                    h3c[l].id = "index" + k;
                }
            }
        }
    }
    innerIndexWrapper.appendChild(indexList);
    indexWrapper.appendChild(innerIndexWrapper);
    tec_indexBox.appendChild(indexWrapper);
    document.getElementsByClassName("entry-content")[0].prepend(tec_indexBox);
}

/*
 *  Custom object for the generate header function
 *  t - should be the full html tag found using getElement functions (may lose position information)
 *  y - should be the position of the html tag as it appears in the page
 *  h - should be either 2 or 3, representing that the tag is (currently only supports h2 and h3 tags)
 */
function tec_tagSpot(tag, position, hVal) {
    this.t = tag;
    this.y = position;
    this.h = hVal;
}

/*
 *  Helper function for generate index. Ensures the proper indentation for the type of header.
 */
function tec_indexH3(h3, id) {
    var headerLink = document.createElement("A");
    headerLink.classList.add("tec_index_text");
    headerLink.href = `#${id}`;
    headerLink.innerHTML = h3; //must use HTML here since occaisionally we pick up special formatting
    var contentItem = document.createElement("LI");
    contentItem.classList.add("tec_contents_item_h3");
    contentItem.appendChild(headerLink);
    return contentItem;
}

/*
 *  Helper function for generate index. Ensures the proper indentation for the type of header.
 */
function tec_indexH2(h2, id) {
    var headerLink = document.createElement("A");
    headerLink.classList.add("tec_index_text");
    headerLink.href = `#${id}`;
    headerLink.innerHTML = h2; //must use HTML here since occaisionally we pick up special formatting
    var contentItem = document.createElement("LI");
    contentItem.classList.add("tec_contents_item_h2");
    contentItem.appendChild(headerLink);
    return contentItem;
}