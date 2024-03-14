//Global variables for the gallery mechanics, below
var tec_AllImagesArray = new Array();
var tec_AllCaptionsArray = new Array();
var tec_currentIndexes = new Array();
var tec_intervalArray = new Array();

/*
	The main function for creating galleries. Call this and all images surrounded by div tags
	with the class "tec-gallery" will be turned into a simple gallery. Multiple galleries per page
	are supported.
*/
function tec_createGalleries() {
	const numGalleries = document.getElementsByClassName("tec-gallery").length;
	for(var g = 0; g < numGalleries; g++) {
		tec_currentIndexes.push(0);
		try {
			tec_createGallery(g);	
		}
		catch(e) {
			//ignore errors and continue attempting to create galleries, but still log it
			console.error(e);
		}
	}
}

tec_createGalleries();

function tec_setFeaturedImage(g_num, index) {
	tec_safe_remove_class(document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) img.tec_g_image.tec_g_featured`), "tec_g_featured");

	var desiredImage = document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) img.tec_g_image:nth-of-type(${index + 1})`);
	desiredImage.classList.add("tec_g_featured");

	tec_safe_remove_class(document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) div.tec_g_caption_wrapper p.tec_g_caption.tec_g_featured`), "tec_g_featured");

	var desiredCaption = document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) div.tec_g_caption_wrapper p.tec_g_caption:nth-of-type(${index + 1})`);
	desiredCaption.classList.add("tec_g_featured");

	var fauxCaption = document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) div.tec_g_caption_wrapper p.tec_g_faux_caption`);
	fauxCaption.innerHTML = tec_AllCaptionsArray[g_num][index];

	tec_safe_remove_class(document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) div.tec_g_indicator.tec_g_featured`), "tec_g_featured");

	var desiredIndicator = document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1}) div.tec_g_indicator:nth-of-type(${index + 1})`);
	desiredIndicator.classList.add("tec_g_featured");

	tec_currentIndexes[g_num] = index;
}

/*
	Creates 1 gallery by storing the image sources and captions into global arrays and
	adding the structure of the gallery.
*/
function tec_createGallery(g_num) {
	var tec_ImageArray = new Array();
	var tec_CaptionArray = new Array();
	var previousTag = "";
	document.querySelectorAll(`.tec-gallery:nth-of-type(${g_num + 1}) img, .tec-gallery:nth-of-type(${g_num + 1}) figcaption, .tec-gallery:nth-of-type(${g_num + 1}) em`).forEach(e => {
		if(e.tagName == "IMG") {
			if(previousTag == "IMG") {
				//we found a missing caption; add an empty
				tec_CaptionArray.push("");
			}
			//Add image
			tec_ImageArray.push(e.src);
		} else {
			if(previousTag == "IMG") {
				//add caption
				tec_CaptionArray.push(e.innerHTML);
			} else {
				//we found another caption, probably for the previous image
				//Add secondary caption
				tec_CaptionArray[tec_CaptionArray.length - 1] += " " + e.innerHTML;
			}
		}
		previousTag = e.tagName;
	});
	if(previousTag == "IMG") {
		//if the last tag we found was an image, the last image is missing a caption
		tec_CaptionArray.push("");
	}

	tec_AllImagesArray.push(tec_ImageArray);
	tec_AllCaptionsArray.push(tec_CaptionArray);

	var galleryChildren = [];
	document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1})`).childNodes.forEach(c => {
		galleryChildren.push(c);
	});
	galleryChildren.forEach(c => {
		document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1})`).removeChild(c);
	});

	var gallery = document.createElement("DIV");
	gallery.classList.add("tec_g_body");
	gallery.setAttribute("name", "g_border");
	var galleryInnerWrapper = document.createElement("DIV");
	galleryInnerWrapper.classList.add("tec_g_inner_wrapper");
	
	var galleryPlayPauseWrapper = document.createElement("DIV");
	galleryPlayPauseWrapper.classList.add("tec_g_play_pause_wrapper");
	var galleryPlayPause = document.createElement("DIV");
	galleryPlayPause.classList.add("tec_g_play_pause");
	galleryPlayPause.innerText = "⏯︎";
	galleryPlayPause.title = "auto-play this gallery";
	const gNumConst = g_num;
	galleryPlayPause.addEventListener("click", (e) => {
		window.getSelection().removeAllRanges();
		if(!tec_intervalArray[g_num]) {
			e.target.classList.add("pressed");
			document.querySelector(`.tec-gallery:nth-of-type(${gNumConst + 1}) .tec_g_arrow.right`).click();
			tec_intervalArray[g_num] = setInterval(() => {
				document.querySelector(`.tec-gallery:nth-of-type(${gNumConst + 1}) .tec_g_arrow.right`).click();
			}, 4000);
		} else {
			tec_safe_remove_class(e.target, "pressed");
			clearInterval(tec_intervalArray[g_num]);
			tec_intervalArray[g_num] = undefined;
		}
	});
	galleryPlayPauseWrapper.appendChild(galleryPlayPause);
	galleryInnerWrapper.appendChild(galleryPlayPauseWrapper);

	var indicatorContainer = document.createElement("DIV");
	indicatorContainer.classList.add("tec_g_indicator_container");
	var galleryImages = [];
	var galleryFauxImages = [];
	var positionIndicators = [];
	const userSuppliedMaxHeight = document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1})`).getAttribute("max-height");
	for(var i = 0; i < tec_ImageArray.length; i++) {
		const j = i; //to make i not be a reference var
		var image = document.createElement("IMG");
		image.src = tec_ImageArray[i];
		image.classList.add("tec_g_image");
		if(userSuppliedMaxHeight) {
			image.style.maxHeight = `${userSuppliedMaxHeight}px`;
		}
		galleryImages.push(image);
		
		//to maintain height when featured is the largest image
		var fauxImage = document.createElement("IMG");
		fauxImage.src = tec_ImageArray[i];
		fauxImage.classList.add("tec_g_faux_image");
		fauxImage.setAttribute("loading", "lazy");
		if(userSuppliedMaxHeight) {
			fauxImage.style.maxHeight = `${userSuppliedMaxHeight}px`;
		}
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

	var galleryFooter = document.createElement("DIV");
	galleryFooter.classList.add("tec_g_footer");
	
	var leftArrow = document.createElement("DIV");
	leftArrow.classList.add("tec_g_arrow");
	leftArrow.classList.add("left");
	leftArrow.addEventListener("click", () => {
		window.getSelection().removeAllRanges();
		tec_setFeaturedImage(g_num, tec_currentIndexes[g_num] == 0 ? maxIndex - 1 : (tec_currentIndexes[g_num] - 1) % maxIndex)
	});
	var leftArrowImageLight = document.createElement("IMG");
	leftArrowImageLight.src = "/wp-content/plugins/te-custom-mods/images/DropdownBlack.png";
	var leftArrowImageDark = document.createElement("IMG");
	leftArrowImageDark.src = "/wp-content/plugins/te-custom-mods/images/DropdownYellow.png";
	leftArrowImageDark.classList.add("dark");
	leftArrow.appendChild(leftArrowImageLight);
	leftArrow.appendChild(leftArrowImageDark);
	galleryFooter.appendChild(leftArrow);

	var captions = document.createElement("DIV");
	captions.classList.add("tec_g_caption_wrapper");
	for(var i = 0; i < tec_CaptionArray.length; i++) {
		var captionP = document.createElement("P");
		captionP.innerHTML = tec_CaptionArray[i] ?? "No caption available.";
		captionP.classList.add("tec_g_caption");
		if(i == 0) {
			captionP.classList.add("tec_g_featured");
		}
		captions.appendChild(captionP);
	}
	var fauxCaption = document.createElement("P");
	fauxCaption.innerHTML = tec_CaptionArray[0];
	fauxCaption.classList.add("tec_g_faux_caption");
	fauxCaption.classList.add("tec_g_featured");
	captions.appendChild(fauxCaption);

	galleryFooter.appendChild(captions);

	const maxIndex = tec_ImageArray.length;

	var rightArrow = document.createElement("DIV");
	rightArrow.classList.add("tec_g_arrow");
	rightArrow.classList.add("right");
	rightArrow.addEventListener("click", () => {
		window.getSelection().removeAllRanges();
		tec_setFeaturedImage(g_num, (tec_currentIndexes[g_num] + 1) % maxIndex)
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

	for(var i = 0; i < galleryFauxImages.length; i++) {
		galleryInnerWrapper.appendChild(galleryFauxImages[i]);
	}
	gallery.appendChild(galleryInnerWrapper);
	gallery.appendChild(indicatorContainer);
	document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1})`).appendChild(gallery);
	document.querySelector(`.tec-gallery:nth-of-type(${g_num + 1})`).appendChild(galleryFooter);
	return;
}