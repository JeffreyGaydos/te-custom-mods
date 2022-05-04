//Global variables for the gallery mechanics, below
var ImageArray = new Array();
var AllImagesArray = new Array();
var CaptionArray = new Array();
var AllCaptionsArray = new Array();
var paddingArray = new Array();
var currentIndexes = new Array();

/*
	The main function for creating galleries. Call this and all images surrounded by div tags
	with the class "tec-gallery" will be turned into a simple gallery. Multiple galleriees per page
	are supported. Uses javascript and JQuery.
*/
function createGalleries() {
	var g = 0;
	while(g < document.getElementsByClassName("tec-gallery").length) {
		//must be first so that "maintainWidth" can find the proper index
		currentIndexes.push(0);
		paddingArray.push(new Array());
		createGallery(g);
		g++;
	}
}

createGalleries();

/*
	Creates 1 gallery by storing the image sources and captions into global arrays and
	adding the structure of the gallery.
*/
function createGallery(g_num, fig = false) {
	var i = 0;
	while(document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("img").length > 0) {
		//console.log("Found Image: " + document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("img")[0].src);
		var img = document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("img")[0];
		ImageArray.push(img.src);
		document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("img")[0].remove();
	}
	AllImagesArray.push(ImageArray);
	if(document.getElementsByClassName("tec-gallery")[g_num].getAttribute("figure") == '') {
		while(document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("figcaption").length > 0) {
			//console.log("Found Caption: " + document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("em")[0].innerHTML);
			CaptionArray.push(document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("figcaption")[0].innerHTML);
			document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("figcaption")[0].remove();
		}
	} else {
		while(document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("em").length > 0) {
			//console.log("Found Caption: " + document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("em")[0].innerHTML);
			CaptionArray.push(document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("em")[0].innerHTML);
			document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("em")[0].remove();
		}
	}
	AllCaptionsArray.push(CaptionArray);
	var galleryBody = "";
	
	//border and featured image
	galleryBody += '<div style="width: 100%; border: 1px solid black; display: inline-block;" class="tec_g_border" name="g_border"><div style="display: flex; justify-content: center;"><img src="';
	galleryBody += ImageArray[0];
	if(document.getElementsByClassName("tec-gallery")[g_num].getAttribute("tec-g-height") != null) {
		galleryBody += '" style="height: ' + document.getElementsByClassName("tec-gallery")[g_num].getAttribute("tec-g-height") + 'px; padding: 50px 0px; display: inline-block;" name="tec_g_featured"></div></div>';
	} else {
		galleryBody += '" style="height: 300px; padding: 50px 0px; display: inline-block;" name="tec_g_featured"></div></div>';
	}
	
	galleryBody += '<div style="display: flex; justify-content: center; width: 100%;">';

	//arrow left
	galleryBody += '<div class="tec_g_arrow" style="flex-grow: 1; display: flex; justify-content: center; border: 2px solid black; padding: 4px; height: 30px; cursor: pointer;" onMouseOver="this.style.backgroundColor=\'#f6dd95\'" onMouseOut="this.style.backgroundColor=\'white\'" onclick="previous(';
	galleryBody += g_num + ", 1";
	galleryBody += ')" class="tec_g_arrow" name="g_previous">';
	galleryBody += '<img class="tec_g_arrow_img" src="https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownBlack.png" style="transform: rotate(90deg); width: 18px; height: 18px;">';
	galleryBody += "</div>";
	//caption
	galleryBody += '<p style="width: calc(90% - 4rem - 22px); text-align: center; border: 0px solid black; padding: 0px 0px; margin: 0px; margin-right: 0px; font-style: italic;" class="entry-content tec_g_caption" name="g_caption">';
	if(CaptionArray[0] == undefined) {
		galleryBody += 'No caption available.';
	} else {
		galleryBody += CaptionArray[0];
	}
    galleryBody += '</p>';
	//arrow right
	galleryBody += '<div class="tec_g_arrow" style="flex-grow: 1; display: flex; justify-content: center; border: 2px solid black; padding: 4px; height: 30px; cursor: pointer;" onMouseOver="this.style.backgroundColor=\'#f6dd95\'" onMouseOut="this.style.backgroundColor=\'white\'" style="height: 22px; width: 62px; padding-right: 20px; padding-left: 20px; margin-top: 141px; margin-bottom: 141px; transform: rotate(-90deg); border: 2px solid black; cursor: pointer" onclick="next(';
	galleryBody += g_num + ", 1";
	galleryBody += ')" class="tec_g_arrow" name="g_next">';
	galleryBody += '<img class="tec_g_arrow_img" src="https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownBlack.png" style="transform: rotate(-90deg); width: 18px; height: 18px;">';
	galleryBody += "</div>";

	galleryBody += '</div>';

	document.getElementsByClassName("tec-gallery")[g_num].innerHTML = galleryBody;
	ImageArray = new Array();
	CaptionArray = new Array();
}

/*
	Moves whichever gallery'slide to the previous image and caption.
	Called by the arrow buttons themselves.
*/
function previous(g_num, fade) {
	//console.log("Backwards");
	$('p[name="g_caption"]:eq(' + g_num + ')').fadeOut(500 * fade).fadeIn(500 * fade);
	$('img[name="tec_g_featured"]:eq(' + g_num + ')').fadeTo(500 * fade, 0.00001, function() {
		//console.log("Fired Callback. g_num: " + g_num);
		currentIndexes[g_num]--;
		if(currentIndexes[g_num] < 0) {
			currentIndexes[g_num] = AllImagesArray[g_num].length - 1;
		}
		document.getElementsByName("tec_g_featured")[g_num].setAttribute("src", AllImagesArray[g_num][currentIndexes[g_num]]);
		if(AllCaptionsArray[g_num][currentIndexes[g_num]]) {
			document.getElementsByName("g_caption")[g_num].innerHTML = AllCaptionsArray[g_num][currentIndexes[g_num]];
		} else {
			document.getElementsByName("g_caption")[g_num].innerHTML = "No caption available.";
		}
		document.getElementsByName("tec_g_featured")[g_num].style.padding = "50px 0px";
	}).fadeTo(500 * fade, 1);
}

/*
	Moves whichever gallery'slide to the next image and caption.
	Called by the arrow buttons themselves.
*/
function next(g_num, fade) {
	//console.log("Forwards");
	$('p[name="g_caption"]:eq(' + g_num + ')').fadeOut(500 * fade).fadeIn(500 * fade);
	$('img[name="tec_g_featured"]:eq(' + g_num + ')').fadeTo(500 * fade, 0.00001, function() {
    	//console.log("Fired Callback. g_num: " + g_num);
		currentIndexes[g_num]++;
		if(currentIndexes[g_num] > AllImagesArray[g_num].length - 1) {
	    currentIndexes[g_num] = 0;
    	}
		document.getElementsByName("tec_g_featured")[g_num].setAttribute("src", AllImagesArray[g_num][currentIndexes[g_num]]);
		if(AllCaptionsArray[g_num][currentIndexes[g_num]]) {
			document.getElementsByName("g_caption")[g_num].innerHTML = AllCaptionsArray[g_num][currentIndexes[g_num]];
		} else {
			document.getElementsByName("g_caption")[g_num].innerHTML = "No caption available.";
		}
		document.getElementsByName("tec_g_featured")[g_num].style.padding = "50px 0px";
	}).fadeTo(500 * fade, 1);
}