/*
 *	Tweaks some styling to ensure that the website looks good on mobile devices
 *  Uses media queries and inline CSS.
 */
 function mobileCompatible() {
	//standard mobile compatibility settings
	if(window.matchMedia("(max-width: 985px)").matches) {
		//middle ground mobile compatibility
		try {
			document.getElementsByClassName('header-titles-wrapper')[0].style.width = "100%";
			document.getElementsByClassName('header-titles')[0].style.paddingRight = "5%";
		} catch(e) {
			//ignore errors to ensure we continue to fix more elements
		}
		//document.getElementsByClassName('JeffsDarkModeButtonMobile')[0].style.minWidth = "90px";
		//console.log('985px formatting active');
		try {
			var featured_imgs = document.getElementsByName("tec_g_featured");
			for(var i = 0; i < featured_imgs.length; i++) {
				featured_imgs[i].style.height = "200px";
			}
		} catch(e) {
			//ignore errors
		}
	}
	if(window.matchMedia("(max-width: 500px)").matches) {
		
		var h1Tags = document.getElementsByTagName('h1');
		var j = 0;
			while (h1Tags[j] != null) {
				h1Tags[j].style.fontSize = "30px";
				j++;
			}		
		
		var h2Tags = document.getElementsByTagName('h2');
		var i = 0;
			while (h2Tags[i] != null) {
				h2Tags[i].style.fontSize = "17px";
				i++;
			}					
		
		var pTags = document.getElementsByTagName('p');
		var k = 0;
		while(pTags[k] != null) {
			pTags[k].style.fontSize = "15px";
			k++;
		}
		
		var ulTags = document.getElementsByTagName('ul');
		var l = 0;
		while(ulTags[l] != null) {
			ulTags[l].style.fontSize = "15px";
			l++;
		}
		
		var olTags = document.getElementsByTagName('ol');
		var m = 0;
		while(olTags[m] != null) {
			olTags[m].style.fontSize = "15px";
			m++;
		}
			
		var tBodyTags = document.getElementsByTagName('tbody');
		var n = 0;
		while(tBodyTags[n] != null) {
			tBodyTags[n].style.fontSize = "14px";
			n++;
		}
					
		var emTags = document.getElementsByTagName('em');
		var o = 0;
		while(emTags[o] != null) {
			emTags[o].style.fontSize = "17px";
			o++;
		}
					
		//for the "FAKE" stamp on some articles about fake tanks
		var imgTags = document.getElementsByTagName('img');
		var l = 0;
		//note 'L' not '1'
		while(imgTags[l] != null) {
			var imgsrc = imgTags[l].src;
			if(imgsrc == "https://tanks-encyclopedia.com/wp-content/uploads/2017/04/fake-1.png" || imgsrc == "https://tanks-encyclopedia.com/images/fail.png") {
				imgTags[l].style.width = "50px";
				imgTags[l].style.heigth = "50px";
				imgTags[l].style.margin = "3px 3px 3px 3px";
			}
			if(imgsrc == "https://tanks-encyclopedia.com/wp-content/uploads/2020/01/logo-big-border.png") {
				//NOTE: image is 60px wide plus 20px + 10px of pagging = 70px
				document.getElementsByClassName('header-titles-wrapper')[0].style.padding = '0px 0px 0px 0px';
				imgTags[l].style.maxHeight = "60px";
				imgTags[l].style.minWidth = "90px";
				imgTags[l].style.padding = "0px 20px 0px 10px";
				imgTags[l].style.marginLeft = "25%";
				if(window.chrome) {
					imgTags[l].style.marginLeft = "30%";
				}
			}
			l++;
		}

        //fixes menu buttons flying off the screen
		try {
			document.getElementsByClassName('toggle-text')[0].style.left = '0px';
			document.getElementsByClassName('toggle-text')[0].style.right = '0px';
			document.getElementsByClassName('toggle-text')[1].style.left = '0px';
			document.getElementsByClassName('toggle-text')[1].style.right = '0px';
		} catch(e) {
			//the text was hidden
		}
				
		//fixes the button text
		try {
			document.getElementById("JeffsDarkModeTextMobile").style.fontSize = "11px";
			document.getElementById("JeffsDarkModeTextMobile").style.marginBottom = "0px";
			document.getElementById("JeffsDarkModeButtonMobile").style.padding = "1px 1px 1px 1px";
			document.getElementById("JeffsDarkModeButtonMobile").style.marginLeft = "10px";
		} catch(e) {
			//couldn't find any mobile buttons
		}
		
		//fixes slide show dot intersection with divider
		if(window.matchMedia("(max-width: 330px)").matches) {
			try{
			document.getElementsByTagName('hr')[0].style.marginTop = "66px";
			} catch (e) {
				//slide show dots were not found
			}
		}
		
		//aids in making the index more visible on mobile
		try {
			document.getElementById("innerIndexBox").style.width = "100%";
			document.getElementById("innerIndexBox").style.minWidth = "50%";
		} catch(e) {
			//couldn't find index box or subsequent div tags
		}
	}
}