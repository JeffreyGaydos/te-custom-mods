/*
 * Puts linked donation buttons (images) at the header.
 * Disappears on mobile automatically. Grabs images from homepage.
 */
document.getElementsByClassName('site-description')[0].innerHTML = "The Online Tank Museum<a href='https://www.patreon.com/tankartfund'><img src='https://tanks-encyclopedia.com/images/patreon.svg' alt='patreon' style='width: 63px; height: 45px; padding: 0px 6px 0px 12px;'/><a href='https://www.paypal.me/tankartfund'><img src='https://tanks-encyclopedia.com/images/paypal.svg' alt='paypal' style='width: 49px; height: 45px; padding: 0px 2px 2px 0px;'/></a>";
document.getElementsByClassName('header-titles-wrapper')[0].style.width = "calc(32% + 150px)";
document.getElementsByClassName('header-titles-wrapper')[0].style.minWidth = "140px";
document.getElementsByClassName('header-titles-wrapper')[0].style.marginRight = "0px";
    
//More CSS to make the header more spacious so the title and buttons can be mostly inline
document.getElementsByClassName('primary-menu reset-list-style')[0].style.marginLeft = "0px";
document.getElementsByClassName('primary-menu reset-list-style')[0].style.width = "auto";
document.getElementsByClassName('primary-menu-wrapper')[0].style.width = "100%";
//document.getElementsByClassName('primary-menu-wrapper')[0].style.minWidth = "80%";
document.getElementsByClassName('primary-menu reset-list-style')[0].getElementsByTagName('li')[0].style.marginLeft = "0px";