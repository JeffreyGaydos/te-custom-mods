/*
 * Puts linked donation buttons (images) at the header.
 * Disappears on mobile automatically. Grabs images from homepage.
 */
var tec_partreon_link = document.createElement("A");
tec_partreon_link.classList.add("tec_donation_patreon");
tec_partreon_link.classList.add("tec-donation");
tec_partreon_link.href = 'https://www.patreon.com/tankartfund';
var tec_patreon_img = document.createElement("IMG");
tec_patreon_img.src = '/wp-content/plugins/te-custom-mods/images/patreon.svg';
tec_partreon_link.alt = 'patreon donation link';
tec_partreon_link.title = "Support us on Patreon!";
var tec_paypal_link = document.createElement("A");
tec_paypal_link.classList.add("tec_donation_paypal");
tec_paypal_link.classList.add("tec-donation");
tec_paypal_link.href = 'https://www.paypal.com/paypalme/tankencyclopedia';
tec_paypal_link.title = "Support us on PayPal!";
var tec_paypal_img = document.createElement("IMG");
tec_paypal_img.src = '/wp-content/plugins/te-custom-mods/images/paypal.svg';
tec_paypal_img.alt = 'paypal donation link';
var tec_payhip_link = document.createElement("A");
tec_payhip_link.classList.add("tec_donation_payhip");
tec_payhip_link.classList.add("tec-donation");
tec_payhip_link.href = "https://payhip.com/TankEncyclopedia";
tec_payhip_link.title = "Support us on PayHip!";
var tec_payhip_img = document.createElement("IMG");
tec_payhip_img.src = "/wp-content/plugins/te-custom-mods/images/PayHipIcon.png"

tec_partreon_link.appendChild(tec_patreon_img);
tec_paypal_link.appendChild(tec_paypal_img);
tec_payhip_link.appendChild(tec_payhip_img);

document.getElementsByClassName('header-titles')[0].appendChild(tec_partreon_link);
document.getElementsByClassName('header-titles')[0].appendChild(tec_paypal_link);
document.getElementsByClassName('header-titles')[0].appendChild(tec_payhip_link);
