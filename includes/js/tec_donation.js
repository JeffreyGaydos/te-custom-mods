/*
 * Puts linked donation buttons (images) at the header.
 * Disappears on mobile automatically. Grabs images from homepage.
 */
document.getElementsByClassName('header-titles')[0].innerHTML += "<a class='tec-donation' href='https://www.patreon.com/tankartfund'><img src='https://tanks-encyclopedia.com/images/patreon.svg' alt='patreon' style='width: 63px; height: 45px; padding: 0px 6px 0px 12px;'/><a class='tec-donation' href='https://www.paypal.com/paypalme/tankencyclopedia'><img src='https://tanks-encyclopedia.com/images/paypal.svg' alt='paypal' style='width: 49px; height: 45px; padding: 0px 2px 2px 0px;'/></a>";
