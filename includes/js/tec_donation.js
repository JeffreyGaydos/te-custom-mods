/*
 * Puts linked donation buttons (images) at the header.
 * Disappears on mobile automatically. Grabs images from homepage.
 */
var tec_partreon_link = document.createElement("A");
tec_partreon_link.classList.add("tec_donation_patreon");
tec_partreon_link.href = 'https://www.patreon.com/tankartfund';
var tec_patreon_img = document.createElement("IMG");
tec_patreon_img.src = 'https://tanks-encyclopedia.com/images/patreon.svg';
tec_partreon_link.alt = 'patreon donation link';
var tec_paypal_link = document.createElement("A");
tec_paypal_link.classList.add("tec_donation_paypal");
tec_paypal_link.href = 'https://www.paypal.com/paypalme/tankencyclopedia';
var tec_paypal_img = document.createElement("IMG");
tec_paypal_img.src = 'https://tanks-encyclopedia.com/images/paypal.svg';
tec_paypal_img.alt = 'paypal donation link';

tec_partreon_link.appendChild(tec_patreon_img);
tec_paypal_link.appendChild(tec_paypal_img);

document.getElementsByClassName('header-titles')[0].appendChild(tec_partreon_link);
document.getElementsByClassName('header-titles')[0].appendChild(tec_paypal_link);
