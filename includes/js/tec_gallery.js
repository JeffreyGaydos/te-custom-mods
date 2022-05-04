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
function createGallery(g_num) {
	var i = 0;
	while(document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("img").length > 0) {
		//console.log("Found Image: " + document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("img")[0].src);
		var img = document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("img")[0];
		ImageArray.push(img.src);
		document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("img")[0].remove();
	}
	AllImagesArray.push(ImageArray);
	while(document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("em").length > 0) {
		//console.log("Found Caption: " + document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("em")[0].innerHTML);
		CaptionArray.push(document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("em")[0].innerHTML);
		document.getElementsByClassName("tec-gallery")[g_num].getElementsByTagName("em")[0].remove();
	}
	AllCaptionsArray.push(CaptionArray);
    var galleryBody = '<img src="https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownBlack.png" onMouseOver="this.style.backgroundColor=\'#6e7653\'" onMouseOut="this.style.backgroundColor=\'white\'" style="height: 22px; width: 62px; padding-right: 20px; padding-left: 20px; margin-top: 141px; margin-bottom: 141px; transform: rotate(90deg); border: 2px solid black; cursor: pointer" onclick="previous('
	galleryBody += g_num + ", 1";
	galleryBody += ')" class="tec_g_arrow" name="g_previous"><div style="width: calc(90% - 4rem); border: 1px solid #6e7653; display: inline-block;" class="tec_g_border" name="g_border"><div style="display: flex; justify-content: center;"><img src="';
	galleryBody += ImageArray[0];
	galleryBody += '" style="height: 300px; padding: 50px 0px; display: inline-block;" name="g_featured"></div></div><img src="https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownBlack.png" onMouseOver="this.style.backgroundColor=\'#6e7653\'" onMouseOut="this.style.backgroundColor=\'white\'" style="height: 22px; width: 62px; padding-right: 20px; padding-left: 20px; margin-top: 141px; margin-bottom: 141px; transform: rotate(-90deg); border: 2px solid black; cursor: pointer" onclick="next('
	galleryBody += g_num + ", 1";
	galleryBody += ')" class="tec_g_arrow" name="g_next"></span><p style="text-align: center; border: 0px solid black; padding: 0px 0px; margin-left: 15%; margin-right: 15%; font-style: italic;" class="entry-content tec_g_caption" name="g_caption">';
	galleryBody += CaptionArray[0];
    galleryBody += '</p>';
	document.getElementsByClassName("tec-gallery")[g_num].innerHTML = galleryBody;
	ImageArray = new Array();
	CaptionArray = new Array();
	//maintainWidth(g_num, 0);
	//fixes intermittent issue where the necessary padding is "forgetten" and it uses the previous image's padding (see function maintainWidth)
	while(i < AllImagesArray[g_num].length) {
	 	next(g_num, 0);
	 	//console.log(AllImagesArray[g_num][i]);
	 	i++;
	}
}

/*
	Moves whichever gallery'slide to the previous image and caption.
	Called by the arrow buttons themselves.
*/
function previous(g_num, fade) {
	//console.log("Backwards");
	$('p[name="g_caption"]:eq(' + g_num + ')').fadeOut(500 * fade).fadeIn(500 * fade);
	$('img[name="g_featured"]:eq(' + g_num + ')').fadeTo(500 * fade, 0.00001, function() {
		//console.log("Fired Callback. g_num: " + g_num);
		currentIndexes[g_num]--;
		if(currentIndexes[g_num] < 0) {
			currentIndexes[g_num] = AllImagesArray[g_num].length - 1;
		}
		document.getElementsByName("g_featured")[g_num].setAttribute("src", AllImagesArray[g_num][currentIndexes[g_num]]);
		document.getElementsByName("g_caption")[g_num].innerHTML = AllCaptionsArray[g_num][currentIndexes[g_num]];
		document.getElementsByName("g_featured")[g_num].style.padding = "50px 0px";
	}).fadeTo(500 * fade, 1);
}

/*
	Moves whichever gallery'slide to the next image and caption.
	Called by the arrow buttons themselves.
*/
function next(g_num, fade) {
	//console.log("Forwards");
	$('p[name="g_caption"]:eq(' + g_num + ')').fadeOut(500 * fade).fadeIn(500 * fade);
	$('img[name="g_featured"]:eq(' + g_num + ')').fadeTo(500 * fade, 0.00001, function() {
    	//console.log("Fired Callback. g_num: " + g_num);
		currentIndexes[g_num]++;
		if(currentIndexes[g_num] > AllImagesArray[g_num].length - 1) {
	    currentIndexes[g_num] = 0;
    	}
		document.getElementsByName("g_featured")[g_num].setAttribute("src", AllImagesArray[g_num][currentIndexes[g_num]]);
		document.getElementsByName("g_caption")[g_num].innerHTML = AllCaptionsArray[g_num][currentIndexes[g_num]];
		document.getElementsByName("g_featured")[g_num].style.padding = "50px 0px";
	}).fadeTo(500 * fade, 1);
}