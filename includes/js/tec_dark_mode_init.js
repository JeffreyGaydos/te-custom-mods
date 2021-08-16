createDarkModeButtons();
initDarkMode();

var tec_dark;

//Inserts the HTML for the darm mode button in the appropriate spot
function createDarkModeButtons() {
    document.getElementsByClassName("header-titles-wrapper")[0].innerHTML = 
        document.getElementsByClassName("header-titles-wrapper")[0].innerHTML + 
        '<div style="width: 10rem; padding-left: 5px;">' + 
            '<button class="JeffsDarkModeButton" style="background-color: #000; border-radius: 5px; height: 50px; padding-top: 0.5rem; width: 9rem" onclick="darkMode()">' + 
                '<p class="JeffsDarkModeText" style="color:#f6dd95; display: block; line-height: 1.2; word-break: normal; text-align: inherit; font-size: 19px; font-weight: 500; letter-spacing: -0.0277em; font-family: \'Allerta Stencil\', sans-serif !important; padding-top: 0px; padding-right: 0rem; text-transform: none;" type="button">Dark Mode</p>' +
            '</button>' + 
        '</div>';
}

//examines cookies to see if we have turned on dark mode in the past
function initDarkMode() {
    if(tec_dark == undefined) {
        tec_dark = 'false';
    }
    //document.cookie = 'DarkMode = true; Path=/;';
    var cookieArray = document.cookie.split(';');
    for(var i = 0; i < cookieArray.length; i++) {
        var name = cookieArray[i].split('=')[0];
        var value = cookieArray[i].split('=')[1];
        //console.log("--==Called darkModeUnstable Loop==--\nname: " + name + " value: " + value + " dark is: " + this.dark);
        if(name == ' DarkMode') {
            if(value != tec_dark) {
                document.cookie = name + ' = ' + value + '; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                darkMode();
            }
        }
    }
}

//Changes the background of a specified element (by id or class name).
//Do not call with both an name and class_ value. Will use name value if you do.
function changeCSSbg(name, class_, value) {
	if(name != '') {
		var elements = document.getElementsByName(name);
		var i = 0;
		while(elements[i] != null) {
			elements[i].style.background = value;
			i++;
		}
	} else {
		var elements = document.getElementsByClassName(class_);
		var i = 0;
		while(elements[i] != null) {
			elements[i].style.background = value;
			i++;
		}
	}
}

//Changes the color of a specified element (by id or class name).
//Do not call with both an name and class_ value. Will use name value if you do.
function changeCSSc(name, class_, value) {
	if(name != '') {
    	var elements = document.getElementsByName(name);
		var i = 0;
		while(elements[i] != null) {
			elements[i].style.color = value;
			i++;
		}
	} else {
		var elements = document.getElementsByClassName(class_);
		var i = 0;
		while(elements[i] != null) {
			elements[i].style.color = value;
			i++;
		}
	}
}

//changes the CSS color property on a subtag of the given element. Only colors the first subtag.
//Do not call with both a name and class_ value, Will use the name value if you do.
function changeSubtagCSSc(name, class_, subtag, value) {
	if(name != '') {
		var elements = document.getElementsByName(name);
		var i = 0;
    	while(elements[i] != null) {
			elements[i].getElementsByTagName(subtag)[0].style.color = value;
			i++;
		}
	} else {
		var elements = document.getElementsByClassName(class_);
    	var i = 0;
		while(elements[i] != null) {
			elements[i].getElementsByTagName(subtag)[0].style.color = value;
    		i++;
		}
	}
}

//changes the CSS color property on a subtag of the given element. Only colors the first subtag.
//Do not call with both a name and class_ value, Will use the name value if you do.
function changeSubtagCSSbg(name, class_, subtag, value) {
	if(name != '') {
		var elements = document.getElementsByName(name);
		var i = 0;
		while(elements[i] != null) {
			elements[i].getElementsByTagName(subtag)[0].style.background = value;
			i++;
		}
	} else {
		var elements = document.getElementsByClassName(class_);
		var i = 0;
		while(elements[i] != null) {
			elements[i].getElementsByTagName(subtag)[0].style.background = value;
			i++;
		}
	}
}
		
//changes the CSS text-shadow property on a subtag of the given element. Only colors the first subtag.
//Do not call with both a name and class_ value, Will use the name value if you do.
function changeSubtagCSSts(name, class_, subtag, value) {
	if(name != '') {
		var elements = document.getElementsByName(name);
		var i = 0;
		while(elements[i] != null) {
			var elements2 = elements[i].getElementsByTagName(subtag);
			var j = 0;
			while(elements2[j] != null) {
				elements2[j].style.textShadow = value;
				j++;
			}
			i++;
		}
	} else {
		var elements = document.getElementsByClassName(class_);
		var i = 0;
		while(elements[i] != null) {
			var elements2 = elements[i].getElementsByTagName(subtag);
			var j = 0;
			while(elements2[j] != null) {
				elements2[j].style.textShadow = value;
				j++;
			}
			i++;
		}
	}
}

//changes the CSS color property on a sub-subtag of the given element. Only colors the first subtag.
//Do not call with both a name and class_ value, Will use the name value if you do.
function changeSubSubtagCSSc(name, class_, subtag1, subtag2, value) {
	if(name != '') {
		var elements = document.getElementsByName(name);
		var i = 0;
		while(elements[i] != null) {
			elements[i].getElementsByTagName(subtag1)[0].getElementsByTagName(subtag2)[0].style.color = value;
			i++;
		}
	} else {
		var elements = document.getElementsByClassName(class_);
		var i = 0;
		while(elements[i] != null) {
			elements[i].getElementsByTagName(subtag1)[0].getElementsByTagName(subtag2)[0].style.color = value;
			i++;
		}
	}
}
				
//primarily used for the meet the team page
function changeSubSubtagCSSimgbc(class_, subtag1, subtag2, value) {
	var elements = document.getElementsByClassName(class_);
	var i = 0;
	while(elements[i] != null) {
		var subelements = elements[i].getElementsByTagName(subtag1);
		var j = 0;
		while(subelements[j] != null) {
			var subsubelements = subelements[j].getElementsByTagName(subtag2);
			var k = 0;
			while(subsubelements[k] != null) {
				subsubelements[k].style.borderColor = value;
				k++;
			}
			j++;
		}
		i++;
	}
}

function changeCSScByTag(tag, value) {
	if(tag != '') {
		var elements = document.getElementsByTagName(tag);
		var i = 0;
		while(elements[i] != null) {
			elements[i].style.color = value;
			i++;
    	}
	}
}

function changeCSSbgByTag(tag, value) {
	if(tag != '') {
		var elements = document.getElementsByTagName(tag);
		var i = 0;
		while(elements[i] != null) {
			elements[i].style.background = value;
			i++;
		}
	}
}

//finds all subsubtags uder a tag with class class_, and changes the color of every element found
//used primarily to change link colors on articles
function changeSubSubtagCSScAll(class_, subtag1, subtag2, value) {
	if(class_ != '') {
		var elements = document.getElementsByClassName(class_);
		var i = 0;
		while(elements[i] != null) {
			var j = 0;
			var subtags = elements[i].getElementsByTagName(subtag1); 
			while(subtags[j] != null) {
				var k = 0;
				var subsubtags = subtags[j].getElementsByTagName(subtag2);
				while(subsubtags[k] != null) {
					subsubtags[k].style.color = value;
					k++;
				}
				j++;
			}
			i++;
		}
	}
}
				
//finds all subsubtags under a tag with class class_, and changes the color of every element found
//used primarily for index pages
function changeSubSubtagCSSbgAll(class_, subtag1, subtag2, value) {
	if(class_ != '') {
		var elements = document.getElementsByClassName(class_);
		var i = 0;
		while(elements[i] != null) {
			var j = 0;
			var subtags = elements[i].getElementsByTagName(subtag1); 
			while(subtags[j] != null) {
				var k = 0;
				var subsubtags = subtags[j].getElementsByTagName(subtag2);
				while(subsubtags[k] != null) {
					subsubtags[k].style.background = value;
					k++;
				}
				j++;
			}
			i++;
		}
	}
}

//decides which dark mode to initiate depending on which version of dark mode fails to complete.
//TODO - Switch to CSS-based dark mode mechanics (or a mixture of the 2)
function darkMode() {
    if(tec_dark == 'false') {
        try{
            //call any of the above functions here, moving to dark mode
            //strict ordering on the next 2
            changeCSSbg('', 'header-footer-group', '#373c2a');
            
            changeCSSbg('', 'entry-header has-text-align-center header-footer-group', '#2a2d20');
            changeCSSbg('', 'archive-header has-text-align-center header-footer-group', '#2a2d20');
            changeSubtagCSSc('', 'entry-categories-inner', 'a', '#6e7653');
            changeCSSc('', 'entry-title heading-size-1', '#f6dd95');
            changeSubtagCSSts('', 'entry-title heading-size-1', 'a', '1px 1px 3px #0e0f0a');
            changeCSSc('', 'meta-text', '#f6dd95');
            changeSubtagCSSc('', 'meta-text', 'a', 'white');
            changeCSSc('', 'svg-icon', '#f6dd95');
            changeCSSbgByTag('article', '#373c2a');
            changeCSSbg('', 'search-field', '#0e0f0a');
            changeCSSbg('', 'search-modal-inner modal-inner', '#0e0f0a');
            document.getElementById('site-content').style.background = '#373c2a';//may need to be wrapped in try
            try{ //for removing a "black bar" at the bottom of most pages between the content and the footer
                document.getElementById('site-content').getElementByTagName('article')[0].style.background = '#0e0f0a';//new
            } catch(e) {
                //article did not have an article section	
            }
            changeCSSc('', 'author-link', '#f6dd95');
            changeCSSc('', 'title-inner', '#f6dd95');
            changeCSSc('', 'wp-caption-text', '#a2aa88');
            changeCSScByTag('h3', '#f6dd95');
            changeSubtagCSSts('', 'entry-content', 'h3', '1px 1px 2px #755b0a');
            //if you have a link inside of another tag that is not <p> or <h3>, copy one of the functions below and use it to correct
            changeSubSubtagCSScAll('entry-content', 'p', 'a', '#f6dd95');
            changeSubSubtagCSScAll('entry-content', 'h3', 'a', '#f6dd95');
            changeSubSubtagCSScAll('entry-content', 'h2', 'a', '#f6dd95');
            changeCSSc('', 'comment-notes', '#f6dd95');
            changeCSSc('', 'arrow', '#f6dd95');
            changeCSSc('', 'styled-separator is-style-wide', '#f6dd95');
            //changing the slide show area
            changeCSSbg('', 'post-inner  ', '#0e0f0a');
            changeSubtagCSSc('', 'wppsac-post-title', 'a', '#bfbfbf');
            changeCSSc('', 'wppsac-sub-content', 'white');
            changeSubSubtagCSSc('', 'wppsac-post-categories-list', 'li', 'a', '#0e0f0a');
            changeCSSc('', 'wppsac-readmorebtn', '#b6b9ab');
            //changing the gray rectangle just below the slides - NOTE: statistcBanner class manually added
            changeCSSbg('', 'statisticBanner', '#2a2d20');
            changeCSSbgByTag('body', '#373c2a');
            changeCSScByTag('body', 'white');
            //NOTE - coloredLink class manually added to all links (on the a tag) - Homepage only
            changeCSSc('', 'coloredLink', '#6e7653');
            changeCSSc('', 'coloredLinkYellow', '#f6dd95');
            //social media mods
            changeCSSc('', 'dpsp-total-share-wrapper', 'white');
            /*changeCSSc('', 'twitter-timeline', '#f6dd95');
            changeCSSc('', 'twitter-follow-button', '#f6dd95');
            changeCSScByTag('hr', '#f6dd95');
            changeSubSubtagCSScAll('lcp_catlist', 'li', 'a', '#f6dd95');*/
            //changing text area on articles
            try{
                document.getElementsByTagName('textarea')[0].style.background = '#424732';
                document.getElementsByTagName('textarea')[0].style.color = '#f6dd95';
                document.getElementsByTagName('textarea')[0].style.borderColor = '#f6dd95';
                changeCSSc('submit', '', '#424732');
                changeSubtagCSSbg('', 'comment-reply', 'a', '#0e0f0a');
                changeCSSc('', 'fn', '#f6dd95');
                changeCSSc('', 'comment-metadata', '#97a079');
            } catch(e) {
                //didn't find the text entry box
            }
            //changing the border color on the pictures of the meet the team page
            try{
                document.getElementsByClassName('JeffsBorderFix');
                changeSubSubtagCSSimgbc('entry-content', 'h2', 'img', '#0e0f0a');
                changeSubSubtagCSSimgbc('entry-content', 'p', 'img', '#0e0f0a');
            } catch(e) {
                //user was not on the "meet the team" page	
            }
            //fix for a weird looking search page. Uses the seperator's class as an identifier
            try{
                document.getElementsByClassName('post-separator styled-separator is-style-wide section-inner')[0].style.color = '#f6dd95';
                changeCSSbgByTag('article', '#0e0f0a');
                document.getElementById('site-content').style.background = '#0e0f0a';
                changeCSSbgByTag('body', '#0e0f0a');
                changeSubtagCSSc('', 'entry-title', 'a', 'white');
            } catch(e) {
                //was not a search results page
            }
            try {
                //fixing issue with comments when no official comment section exists
                changeCSSbg('', 'comments-wrapper', '#373c2a');
                //fixing issue with bad index table title colors
                changeSubSubtagCSSbgAll('entry-content', 'table', 'caption', '#6e7653');
                //footer modifications
                changeCSSbg('', 'footer-nav-widgets-wrapper header-footer-group', '#2a2d20');
                document.getElementById('site-footer').style.background = '#2a2d20';
                changeCSSc('', 'powered-by-wordpress', '#6e7653');
                changeCSSc('', 'to-the-top', '#f6dd95');
            } catch(e) {
                //wrapped in try catch to prevent errors on certain nation pages
            }
            //specifically for the cookie bar
            try{
                document.getElementById('cookie-law-info-bar').style.background = "#373c2a";
                document.getElementById('cookie-law-info-bar').getElementsByTagName('span')[0].style.color = "white";
                changeCSSc('', 'cli_settings_button', '#f6dd95');
            } catch(e) {
                //the user has already accepted cookies
            }
            try {
            //changing the button
            document.getElementsByClassName('JeffsDarkModeText')[0].innerHTML = 'Light Mode';
            document.getElementsByClassName('JeffsDarkModeButton')[0].style.background = '#6e7653';
            //document.getElementsByClassName('JeffsDarkModeTextMobile')[0].innerHTML = 'Light Mode';
            //document.getElementsByClassName('JeffsDarkModeButtonMobile')[0].style.background = '#6e7653';
            } catch(e) {
                //if dark mode is deactivated, we still what it to complete when the index calls it twice - invvoles backend issues
            }
            try {
                //changing the button on the clone header
                document.getElementsByClassName('JeffsDarkModeText')[1].innerHTML = 'Light Mode';
                document.getElementsByClassName('JeffsDarkModeButton')[1].style.background = '#6e7653';
                //document.getElementsByClassName('JeffsDarkModeTextMobile')[1].innerHTML = 'Light Mode';
                //document.getElementsByClassName('JeffsDarkModeButtonMobile')[1].style.background = '#6e7653';
            } catch(e) {
                //sticky header didn't exist
            }
            
            //index box formatting
            try {
                document.getElementById("indexBox").style.borderColor = "#f6dd95";
                document.getElementById("innerIndexBox").style.borderColor = "#f6dd95";
                document.getElementById("indexIcon").setAttribute("src", "https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownYellow.png");
                document.getElementById("indexContent").style.color = "white";
                changeCSSc("", "index_text", "#f6dd95");
            } catch (e) {
                //index box was not generated
            }
            
            //gallery formatting
            try {
                var i = 0;
                while(i < document.getElementsByName("g_next").length) {
                    //should be the same number of next and previous arrows
                    document.getElementsByName("g_next")[i].setAttribute("onMouseOver", "this.style.backgroundColor='#424732'");
                    document.getElementsByName("g_previous")[i].setAttribute("onMouseOver", "this.style.backgroundColor='#424732'");
                    document.getElementsByName("g_next")[i].setAttribute("onMouseOut", "this.style.backgroundColor='black'");
                    document.getElementsByName("g_previous")[i].setAttribute("onMouseOut", "this.style.backgroundColor='black'");
                    document.getElementsByName("g_next")[i].style.border = "2px solid #f6dd95";
                    document.getElementsByName("g_previous")[i].style.border = "2px solid #f6dd95";
                    document.getElementsByName("g_next")[i].style.backgroundColor = "black";
                    document.getElementsByName("g_previous")[i].style.backgroundColor = "black";
                    document.getElementsByName("g_next")[i].src = "https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownYellow.png";
                    document.getElementsByName("g_previous")[i].src = "https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownYellow.png";
                    i++;
                }
                i = 0;
                while (i < document.getElementsByName("g_border").length) {
                    document.getElementsByName("g_border")[i].style.border = "1px solid #f6dd95";
                    i++;
                }
            } catch (e) {
                //no galleries were present on this page
            }

            //to-top button formatting
            try {
                document.getElementById("tec-to-top").setAttribute('onMouseEnter', 'this.style.backgroundColor=\'rgb(110, 118, 83)\';');
                document.getElementById("tec-to-top").src = 'https://tanks-encyclopedia.com/wp-content/uploads/2021/05/ToTopYellow.png';
            } catch(e) {
                //could not find to-top button
            }
            
            //Fixes and mods for nation pages
            try{
                var ulElements = document.getElementsByClassName('lcp_catlist');
                var i = 0;
                while(ulElements[i] != null) {
                    var j = 0;
                    liElements = ulElements[i].getElementsByTagName('li');
                    while(liElements[j] != null) {
                        liElements[j].getElementsByTagName('a')[0].style.color = "rgb(246, 221, 149)";
                        j++;
                    }
                    i++;
                }
            } catch(e) {
                //no nation page colors to change
            }
            
            tec_dark = 'true';
            document.cookie = 'DarkMode = true; Path=/;';
            //console.log("Cookie should be true");
        }
        catch(error) {
            console.error("DarkMode Error: " + error);
            //errors are ignored usually
        }
    } else {
        try{
            //call any of the above functions here, restoring light mode
            //strict ordering on the next 2
            changeCSSbg('', 'header-footer-group', '#424732');
            
            changeCSSbg('', 'entry-header has-text-align-center header-footer-group', '#6e7653');
            changeCSSbg('', 'archive-header has-text-align-center header-footer-group', '#424732');
            try {
                document.getElementsByClassName('entry-title heading-size-1')[0].style.color = 'black';
                changeSubtagCSSc('', 'entry-categories-inner', 'a', '#424732');
                changeCSSc('', 'entry-title heading-size-1', 'black');
                changeSubtagCSSts('', 'entry-title heading-size-1', 'a', '1px 1px 3px #fff');
                changeSubtagCSSc('', 'meta-text', 'a', '#6d6d6d');
                //added to fix unchanged yellow "By" in author heading thing
                changeCSSc('', 'meta-text', '#6d6d6d');
                changeCSSc('', 'svg-icon', '#6d6d6d');
            } catch(e) {
                //not a "collection" article with a heading
                changeSubtagCSSc('', 'entry-categories-inner', 'a', '#f6dd95');
            }
            //for resetting the search and logo menus
            changeSubtagCSSc('', 'toggle-inner', 'svg', '#f6dd95');
            changeCSSbgByTag('article', 'white');
            changeCSSbg('', 'search-field', 'white');
            changeCSSbg('', 'search-modal-inner modal-inner', 'white');
            document.getElementById('site-content').style.background = 'white';//may need to be wrapped in try
            try{ //for removing a "black bar" at the bottom of most pages between the content and the footer
                document.getElementById('site-content').getElementByTagName('article')[0].style.background = 'white';
            } catch(e) {
                //article did not have an article section	
            }
            changeCSSc('', 'wp-caption-text', '#6d6d6d');
            changeSubtagCSSts('', 'entry-content', 'h3', '1px 1px 2px #fff');
            changeCSSc('', 'comment-notes', '#424732');
            //changing the slide show area
            changeCSSbg('', 'post-inner  ', 'white');
            changeSubtagCSSc('', 'wppsac-post-title', 'a', '#444');
            changeCSSc('', 'wppsac-sub-content', 'black');
            changeSubSubtagCSSc('', 'wppsac-post-categories-list', 'li', 'a', 'white');
            changeCSSc('', 'wppsac-readmorebtn', 'rgb(182, 185, 171)');
            //changing the gray rectangle just below the slides - NOTE: statistcBanner class manually added
            changeCSSbg('', 'statisticBanner', 'rgba(0, 0, 0, 0.7)');
            changeCSSbgByTag('body', 'white');
            changeCSScByTag('body', 'black');
            //NOTE - coloredLink class manually added to all links (on the a tag) - Homepage only
            changeCSSc('', 'coloredLink', '#424732');
            changeCSSc('', 'coloredLinkYellow', '#424732');
            //if you have a link inside of another tag that is not <p> or <h3>, copy one of the functions below and use it to correct
            changeSubSubtagCSScAll('entry-content', 'p', 'a', '#424732');
            changeSubSubtagCSScAll('entry-content', 'h3', 'a', '#424732');
            changeSubSubtagCSScAll('entry-content', 'h2', 'a', '#424732');
            changeCSSc('', 'wp-caption-text', '#6d6d6d');
            changeCSScByTag('h3', '#000000');
            changeCSSbgByTag('article', 'white');
            changeCSSc('', 'author-link', '#424732');
            changeCSSc('', 'title-inner', '#424732');
            changeCSSc('', 'comment-notes', '#6d6d6d');
            changeCSSc('', 'arrow', '#424732');
            changeCSSc('', 'styled-separator is-style-wide', '#000000');
            changeCSSc('', 'dpsp-total-share-wrapper', '#5d6368');
            //social media mods
            /*changeCSSc('', 'twitter-timeline', '#424732');
            changeCSSc('', 'twitter-follow-button', '#424732');
            changeCSScByTag('hr', '#424732');
            changeSubSubtagCSScAll('lcp_catlist', 'li', 'a', '#424732');*/
            //changing text area on articles
            try{
                document.getElementsByTagName('textarea')[0].style.background = 'white';
                document.getElementsByTagName('textarea')[0].style.color = 'black';
                document.getElementsByTagName('textarea')[0].style.borderColor = 'black';
                changeCSSc('submit', '', '#ffffff');
                changeSubtagCSSbg('', 'comment-reply', 'a', '#424732');
                changeCSSc('', 'fn', 'black');
                changeCSSc('', 'comment-metadata', '#6d6d6d');
            } catch(e) {
                //didn't find the text entry box
            }
            //changing the border color on the pictures of the meet the team page
            try{
                document.getElementsByClassName('JeffsBorderFix');
                changeSubSubtagCSSimgbc('entry-content', 'h2', 'img', 'white');
                changeSubSubtagCSSimgbc('entry-content', 'p', 'img', 'white');
            } catch(e) {
                //user was not on the "meet the team" page	
            }
            //fix for a weird looking search page. Uses the seperator's class as an identifier
            try{
                changeSubtagCSSc('', 'entry-title', 'a', 'black');
            } catch(e) {
                //was not a search results page
            }
            try {
                //fixing issue with comments when no official comment section exists
                changeCSSbg('', 'comments-wrapper', 'white');
                //fixing issue with bad index table title colors
                changeSubSubtagCSSbgAll('entry-content', 'table', 'caption', '#dcd7ca');
                //footer modifications
                changeCSSbg('', 'footer-nav-widgets-wrapper header-footer-group', '#424732');
                document.getElementById('site-footer').style.background = '#424732';
                changeCSSc('', 'powered-by-wordpress', '#b6b9ab');
                changeCSSc('', 'to-the-top', '#b6b9ab');
                //fixes the color of the to the top arrow:
                changeSubtagCSSc('', 'to-the-top-long', 'span', '#b6b9ab');
                changeSubtagCSSc('', 'to-the-top-short', 'span', '#b6b9ab');
                changeSubtagCSSc('', 'button', 'a', '#f6dd95');
            } catch(e) {
                //wrapped in try catch to prevent errors on certain nation pages
            }
            //specifically for the cookie bar
            try{
                document.getElementById('cookie-law-info-bar').style.background = "white";
                document.getElementById('cookie-law-info-bar').getElementsByTagName('span')[0].style.color = "black";
                changeCSSc('', 'cli_settings_button', 'rgb(98, 163, 41)');
            } catch(e) {
                //the user has already accepted cookies
            }
            try {
            //changing the button back
            document.getElementsByClassName('JeffsDarkModeText')[0].innerHTML = 'Dark Mode';
            document.getElementsByClassName('JeffsDarkModeButton')[0].style.background = '#0e0f0a';
            //document.getElementsByClassName('JeffsDarkModeTextMobile')[0].innerHTML = 'Dark Mode';
            //document.getElementsByClassName('JeffsDarkModeButtonMobile')[0].style.background = '#0e0f0a';
            } catch(e) {
                //for when the dark mode is deactivated, we still want this operational when the index calls it - backend issues
            }
            try {
                //changing the button back on the clone
                document.getElementsByClassName('JeffsDarkModeText')[1].innerHTML = 'Dark Mode';
                document.getElementsByClassName('JeffsDarkModeButton')[1].style.background = '#0e0f0a';
                //document.getElementsByClassName('JeffsDarkModeTextMobile')[1].innerHTML = 'Dark Mode';
                //document.getElementsByClassName('JeffsDarkModeButtonMobile')[1].style.background = '#0e0f0a';
            } catch (e) {
                //sticky header didn't exist
            }
            
            //index box formatting
            try {
                document.getElementById("indexBox").style.borderColor = "#424732";
                document.getElementById("innerIndexBox").style.borderColor = "#424732";
                document.getElementById("indexIcon").setAttribute("src", "https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownBlack.png");
                document.getElementById("indexContent").style.color = "black";
                changeCSSc("", "index_text", "#424732");
            } catch (e) {
                //index box was not generated
            }
            
            //gallery formatting
            try {
                var i = 0;
                while(i < document.getElementsByName("g_next").length) {
                    //should be the same number of next and previous arrows
                    document.getElementsByName("g_next")[i].setAttribute("onMouseOver", "this.style.backgroundColor='#6e7653'");
                    document.getElementsByName("g_previous")[i].setAttribute("onMouseOver", "this.style.backgroundColor='#6e7653'");
                    document.getElementsByName("g_next")[i].setAttribute("onMouseOut", "this.style.backgroundColor='white'");
                    document.getElementsByName("g_previous")[i].setAttribute("onMouseOut", "this.style.backgroundColor='white'");
                    document.getElementsByName("g_next")[i].style.border = "2px solid black";
                    document.getElementsByName("g_previous")[i].style.border = "2px solid black";
                    document.getElementsByName("g_next")[i].style.backgroundColor = "white";
                    document.getElementsByName("g_previous")[i].style.backgroundColor = "white";
                    document.getElementsByName("g_next")[i].src = "https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownBlack.png";
                    document.getElementsByName("g_previous")[i].src = "https://tanks-encyclopedia.com/wp-content/uploads/2020/06/DropdownBlack.png";
                    i++;
                }
                i = 0;
                while (i < document.getElementsByName("g_border").length) {
                    document.getElementsByName("g_border")[i].style.border = "1px solid black";
                    i++;
                }
            } catch (e) {
                //no galleries were present on this page
            }

            //to-top button formatting
            try {
                document.getElementById("tec-to-top").setAttribute('onMouseEnter', 'this.style.backgroundColor=\'#f6dd95\';');
                document.getElementById("tec-to-top").src = 'https://tanks-encyclopedia.com/wp-content/uploads/2021/05/ToTopBlack.png';
            } catch(e) {
                //could not find to-top button
            }
            
            //Nation Page changes and mods
            try {
                var ulElements = document.getElementsByClassName('lcp_catlist');
                var i = 0;
                while(ulElements[i] != null) {
                    var j = 0;
                    liElements = ulElements[i].getElementsByTagName('li');
                    while(liElements[j] != null) {
                        liElements[j].getElementsByTagName('a')[0].style.color = "#424732";
                        j++;
                    }
                    i++;
                }
            } catch(e) {
                //no nation page formatting needed
            }
            
            tec_dark = 'false';
            document.cookie = 'DarkMode = false; Path=/;';
            //console.log("Cookie should be false");
        }
        catch(error) {
            console.log("DarkMode Error: " + error);
            //errors are ignored usually
        }
    }
}