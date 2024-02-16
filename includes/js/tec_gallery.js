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

function tec_calculateImageLeftValue(numImages, currentIndex) {
	return (numImages - 1) * 25 - 50 * currentIndex;
}

function tec_setFeaturedImage(g_num, index) {
	tec_safe_remove_class(document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) img.tec_g_image.tec_g_featured`), "tec_g_featured");
	//console.log(`.tec-gallery:nth-of-type(${g_num + 1}) img.tec_g_image:nth-of-type(${index + 1})`);
	var desiredImage = document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) img.tec_g_image:nth-of-type(${index + 1})`);
	desiredImage.classList.add("tec_g_featured");

	tec_safe_remove_class(document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) p.tec_g_caption div.tec_g_featured`), "tec_g_featured");

	var desiredCaption = document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) p.tec_g_caption div:nth-of-type(${index + 1})`);
	desiredCaption.classList.add("tec_g_featured");

	tec_safe_remove_class(document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) div.tec_g_indicator.tec_g_featured`), "tec_g_featured");

	var desiredIndicator = document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) div.tec_g_indicator:nth-of-type(${index + 1})`);
	desiredIndicator.classList.add("tec_g_featured");
}

/*
	Creates 1 gallery by storing the image sources and captions into global arrays and
	adding the structure of the gallery.
*/
function createGallery(g_num, fig = false) {
	var i = 0;
	const galleryElement = document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1})`);
	document.querySelectorAll(`.tec-gallery:nth-of-type(${g_num + 1}) img`).forEach(ie => {
		ImageArray.push(ie.src);
	});
	AllImagesArray.push(ImageArray);
	document.querySelectorAll(`.tec-gallery:nth-of-type(${g_num + 1}) figcaption, .tec-gallery:nth-of-type(${g_num + 1}) em`).forEach(fc => {
		CaptionArray.push(fc.innerHTML);
	});

	var galleryChildren = [];
	document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1})`).childNodes.forEach(c => {
		galleryChildren.push(c);
	});
	galleryChildren.forEach(c => {
		document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1})`).removeChild(c);
	});

	AllCaptionsArray.push(CaptionArray);
	var galleryBody = "";
	var gallery = document.createElement("DIV");
	gallery.classList.add("tec_g_body");
	gallery.setAttribute("name", "g_border");
	var galleryInnerWrapper = document.createElement("DIV");
	galleryInnerWrapper.classList.add("tec_g_inner_wrapper");
	var indicatorContainer = document.createElement("DIV");
	indicatorContainer.classList.add("tec_g_indicator_container");
	var galleryImages = [];
	var galleryFauxImages = [];
	var positionIndicators = [];
	for(var i = 0; i < ImageArray.length; i++) {
		const j = i; //to make i not be a reference var
		var image = document.createElement("IMG");
		image.src = ImageArray[i];
		image.classList.add("tec_g_image");
		//image.style.left = `${tec_calculateImageLeftValue(ImageArray.length, j)}%`;
		galleryImages.push(image);
		
		//to maintain height when featured is the largest image
		var fauxImage = document.createElement("IMG");
		fauxImage.src = ImageArray[0];
		fauxImage.classList.add("tec_g_faux_image");
		fauxImage.setAttribute("loading", "lazy");
		galleryFauxImages.push(fauxImage);

		var indicator = document.createElement("DIV");
		indicator.addEventListener("click", () => tec_setFeaturedImage(g_num, j));
		indicator.classList.add("tec_g_indicator");
		if(i == 0) {
			indicator.classList.add("tec_g_featured");
		}
		positionIndicators.push(indicator);
	}
	galleryImages[0].classList.add("tec_g_featured");
	
	var mobileIndicator = document.createElement("DIV");
	mobileIndicator.classList.add("tec_g_indicator_mobile");
	var mobileIndicatorText = document.createElement("H4");
	mobileIndicatorText.innerText = `1/${ImageArray.length}`;
	mobileIndicator.appendChild(mobileIndicatorText);
	mobileIndicatorText.style.margin = "0px";

	var galleryFooter = document.createElement("DIV");
	galleryFooter.classList.add("tec_g_footer");
	
	var leftArrow = document.createElement("DIV");
	leftArrow.classList.add("tec_g_arrow");
	leftArrow.classList.add("left");
	leftArrow.addEventListener("click", () => tec_setFeaturedImage(g_num, (currentIndexes[g_num] - 1) % maxIndex));
	var leftArrowImageLight = document.createElement("IMG");
	leftArrowImageLight.src = "/wp-content/plugins/te-custom-mods/images/DropdownBlack.png";
	var leftArrowImageDark = document.createElement("IMG");
	leftArrowImageDark.src = "/wp-content/plugins/te-custom-mods/images/DropdownYellow.png";
	leftArrowImageDark.classList.add("dark");
	leftArrow.appendChild(leftArrowImageLight);
	leftArrow.appendChild(leftArrowImageDark);
	galleryFooter.appendChild(leftArrow);

	var captions = document.createElement("P");
	captions.classList.add("tec_g_caption");
	for(var i = 0; i < CaptionArray.length; i++) {
		var captionDiv = document.createElement("DIV");
		captionDiv.innerText = CaptionArray[i] ?? "No caption available.";
		if(i == 0) {
			captionDiv.classList.add("tec_g_featured");
		}
		captions.appendChild(captionDiv);
	}
	for(var i = 0; i < CaptionArray.length; i++) {
		var fauxCaptionDiv = document.createElement("DIV");
		fauxCaptionDiv.innerText = CaptionArray[i] ?? "No caption available.";
		captions.appendChild(fauxCaptionDiv);
	}

	galleryFooter.appendChild(captions);

	const maxIndex = ImageArray.length;

	var rightArrow = document.createElement("DIV");
	rightArrow.classList.add("tec_g_arrow");
	rightArrow.classList.add("right");
	rightArrow.addEventListener("click", () => {
		tec_setFeaturedImage(g_num, (currentIndexes[g_num] + 1) % maxIndex)
		currentIndexes[g_num]++;
	});
	var rightArrowImageLight = document.createElement("IMG");
	rightArrowImageLight.src = "/wp-content/plugins/te-custom-mods/images/DropdownBlack.png";
	var rightArrowImageDark = document.createElement("IMG");
	rightArrowImageDark.src = "/wp-content/plugins/te-custom-mods/images/DropdownYellow.png";
	rightArrowImageDark.classList.add("dark");
	rightArrow.appendChild(rightArrowImageLight);
	rightArrow.appendChild(rightArrowImageDark);
	galleryFooter.appendChild(rightArrow);
	
	for(var i = 0; i < galleryImages.length; i++) {
		galleryInnerWrapper.appendChild(galleryImages[i]);
		indicatorContainer.appendChild(positionIndicators[i]);
	}
	indicatorContainer.appendChild(mobileIndicator);
	for(var i = 0; i < galleryFauxImages.length; i++) {
		galleryInnerWrapper.appendChild(galleryFauxImages[i]);
	}
	gallery.appendChild(galleryInnerWrapper);
	gallery.appendChild(indicatorContainer);
	document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1})`).appendChild(gallery);
	document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1})`).appendChild(galleryFooter);
	return;
	//position indicators
	if(ImageArray[g_num].length * 35.5 < screen.width) {
		galleryBody += '<div class="tec_g_pos_ind_desktop" style="display: flex; width: 100%; justify-content: center; padding-bottom: 5px;">';
		galleryBody += '<div onclick="tec_g_jump(' + g_num + ', 1, ' + i + ');" class="tec_g_pos_ind current" onclick="" onmouseenter="this.classList.add(\'hovered\')" onmouseleave="this.classList.remove(\'hovered\')" style="cursor: pointer; flex-grow: 1; height: 15px; border: 2px solid black; margin: 5px; max-width: 50px; background-color: rgb(255, 255, 255);"></div>';
		for(var i = 1; i < ImageArray.length; i++) {
			galleryBody += '<div onclick="tec_g_jump(' + g_num + ', 1, ' + i + ');" class="tec_g_pos_ind" onclick="" onmouseenter="this.classList.add(\'hovered\')" onmouseleave="this.classList.remove(\'hovered\')" style="cursor: pointer; flex-grow: 1; height: 15px; border: 2px solid black; margin: 5px; max-width: 50px; background-color: rgb(255, 255, 255);"></div>';
		}
		galleryBody += '</div>';
	} else {
		galleryBody += '<div class="tec_g_pos_ind_mobile" style="display: flex; width: 100%; justify-content: center; padding-bottom: 15px">';
		galleryBody += '<h4 style="margin: inherit;">1/' + ImageArray.length + '</h4>';
		galleryBody += '</div>';
	}

	galleryBody += '</div>';
	galleryBody += '<div style="margin-top: 10px; display: flex; justify-content: center; width: 100%;">';

	//arrow left
	galleryBody += '<div class="tec_g_arrow" style="" onMouseOver="this.style.backgroundColor=\'#f6dd95\'" onMouseOut="this.style.backgroundColor=\'white\'" onclick="tec_g_previous(';
	galleryBody += g_num + ", 1";
	galleryBody += ')" class="tec_g_arrow" name="g_previous">';
	galleryBody += '<img class="tec_g_arrow_img" src="" style="transform: rotate(90deg); width: 18px; height: 18px;">';
	galleryBody += "</div>";

	//caption
	galleryBody += '<p style="" class="entry-content tec_g_caption" name="g_caption">';
	if(CaptionArray[0] == undefined) {
		galleryBody += 'No caption available.';
	} else {
		galleryBody += CaptionArray[0];
	}
    galleryBody += '</p>';
	//arrow right
	galleryBody += '<div class="tec_g_arrow" style="flex-grow: 1; display: flex; justify-content: center; border: 2px solid black; padding: 4px; height: 30px; cursor: pointer;" onMouseOver="this.style.backgroundColor=\'#f6dd95\'" onMouseOut="this.style.backgroundColor=\'white\'" style="height: 22px; width: 62px; padding-right: 20px; padding-left: 20px; margin-top: 141px; margin-bottom: 141px; transform: rotate(-90deg); border: 2px solid black; cursor: pointer" onclick="tec_g_next(';
	galleryBody += g_num + ", 1";
	galleryBody += ')" class="tec_g_arrow" name="g_next">';
	galleryBody += '<img class="tec_g_arrow_img" src="/wp-content/plugins/te-custom-mods/images/DropdownBlack.png" style="transform: rotate(-90deg); width: 18px; height: 18px;">';
	galleryBody += "</div>";

	galleryBody += '</div>';

	document.body.classList.remove("hovered")

	//document.getElementsByClassName("tec-gallery")[g_num].innerHTML = galleryBody;
	ImageArray = new Array();
	CaptionArray = new Array();
}

/*
	Moves whichever gallery'slide to the previous image and caption.
	Called by the arrow buttons themselves.
*/
function tec_g_previous(g_num, fade) {
	//console.log("Backwards");
	$('p[name="g_caption"]:eq(' + g_num + ')').fadeOut(500 * fade).fadeIn(500 * fade);
	$('img[name="tec_g_featured"]:eq(' + g_num + ')').fadeTo(500 * fade, 0.00001, function() {
		//console.log("Fired Callback. g_num: " + g_num);
		currentIndexes[g_num]--;
		if(currentIndexes[g_num] < 0) {
			currentIndexes[g_num] = AllImagesArray[g_num].length - 1;
		}
		tec_g_udpate_pos_ind(g_num, currentIndexes[g_num]);
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
function tec_g_next(g_num, fade) {
	//console.log("Forwards");
	$('p[name="g_caption"]:eq(' + g_num + ')').fadeOut(500 * fade).fadeIn(500 * fade);
	$('img[name="tec_g_featured"]:eq(' + g_num + ')').fadeTo(500 * fade, 0.00001, function() {
    	//console.log("Fired Callback. g_num: " + g_num);
		currentIndexes[g_num]++;
		if(currentIndexes[g_num] > AllImagesArray[g_num].length - 1) {
	    currentIndexes[g_num] = 0;
    	}
		tec_g_udpate_pos_ind(g_num, currentIndexes[g_num]);
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
	Moves the slideshow to a particular position using the position
	indicators.
*/
function tec_g_jump(g_num, fade, index) {
	if(currentIndexes[g_num] == index)
		return; //don't want to "jump" to the current image
	$('p[name="g_caption"]:eq(' + g_num + ')').fadeOut(500 * fade).fadeIn(500 * fade);
	$('img[name="tec_g_featured"]:eq(' + g_num + ')').fadeTo(500 * fade, 0.00001, function() {
		currentIndexes[g_num] = index;
		
		document.getElementsByName("tec_g_featured")[g_num].setAttribute("src", AllImagesArray[g_num][currentIndexes[g_num]]);
		if(AllCaptionsArray[g_num][currentIndexes[g_num]]) {
			document.getElementsByName("g_caption")[g_num].innerHTML = AllCaptionsArray[g_num][currentIndexes[g_num]];
		} else {
			document.getElementsByName("g_caption")[g_num].innerHTML = "No caption available.";
		}
		document.getElementsByName("tec_g_featured")[g_num].style.padding = "50px 0px";
	}).fadeTo(500 * fade, 1);
	tec_g_udpate_pos_ind(g_num, index);
}

/*
	Updates the styling via a class so that the position
	indicators actually indicate which position in the slide
	show you are at. Styling is done externally in CSS.
*/
function tec_g_udpate_pos_ind(g_num, index) {
	var gallery = document.getElementsByClassName("tec-gallery")[g_num];
	if(gallery.getElementsByClassName("tec_g_pos_ind").length > 0) {
		for(var i = 0; i < gallery.getElementsByClassName("tec_g_pos_ind").length; i++) {
			gallery.getElementsByClassName("tec_g_pos_ind")[i].classList.remove("current");	
		}
		gallery.getElementsByClassName("tec_g_pos_ind")[index].classList.add("current");
	} else {
		gallery.getElementsByClassName("tec_g_pos_ind_mobile")[0].getElementsByTagName("h4")[0].innerHTML = (index + 1) + '/' + AllImagesArray[g_num].length;
	}
}