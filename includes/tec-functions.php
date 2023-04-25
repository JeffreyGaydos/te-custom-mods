<?php
/*
    This section of code deals with linking the php and data from the backend to the respective functionality detailed in javascript
*/

/********************************************************************
 * Tec Init
 ********************************************************************/
add_action("wp_head", "tec_init", 1);

if( !function_exists("tec_init") ) {
    function tec_init() {
        wp_enqueue_script( 'tec-init', plugins_url('/js/tec_init.js', __FILE__), '', '1.0');
    }
}

/********************************************************************
 * Routing Dark Mode Scripts
********************************************************************/
if(get_option('tec_dark_mode') == 'on') {
    add_action("wp_head", "tec_dark_mode_create", 11);
    add_action("wp_footer", "tec_dark_mode_init", 15);
}

if( !function_exists("tec_dark_mode_create") ) {
    function tec_dark_mode_create() {
        wp_enqueue_script( 'tec-dark-mode-create', plugins_url('/js/tec_dm_placer.js', __FILE__), '', '2.2');
    }
}

if( !function_exists("tec_dark_mode_init") ) {
    function tec_dark_mode_init() {
        wp_enqueue_script('tec-dark-mode-init', plugins_url('/js/tec_dm_init.js', __FILE__), '', '3.3');
    }
}

/********************************************************************
 * Routing Donation Buttons
 ********************************************************************/
if(get_option('tec_donation') == 'on') {
    add_action("wp_head", "tec_donation_init", 12);
}

if( !function_exists("tec_donation_init") ) {
    function tec_donation_init() {
        wp_enqueue_script( 'tec-donation-init', plugins_url('/js/tec_donation.js', __FILE__), '', '2.4');
    }
}

/********************************************************************
 * Routing Header Follow Mechanics
 ********************************************************************/
if(get_option('tec_header_follow') == 'on') {
    add_action("wp_head", "tec_header_follow_init", 14);   
}

if( !function_exists("tec_header_follow_init") ) {
    function tec_header_follow_init() {
        wp_enqueue_script( 'tec-header-follow-init', plugins_url('/js/tec_header_follow.js', __FILE__), '', '2.1');
    }
}

/********************************************************************
 * Routing Random Article Button
 ********************************************************************/
if(get_option('tec_random_article') == 'on') {
    add_action("wp_footer", "tec_random_article_init", 12);
}

if( !function_exists("tec_random_article_init") ) {
    function tec_random_article_init() {
        wp_enqueue_script( 'tec-random-article-init', plugins_url('/js/tec_random_article.js', __FILE__), '', '2.5');
    }
}

/********************************************************************
 * Routing Discord Button
 ********************************************************************/
if(get_option('tec_discord') == 'on') {
    add_action("wp_footer", "tec_discord_init", 11);
}

if( !function_exists("tec_discord_init") ) {
    function tec_discord_init() {
        wp_enqueue_script( 'tec-discord-init', plugins_url('/js/tec_discord.js', __FILE__), '', '2.1');
    }
}

/********************************************************************
 * Routing Article Contents Generator
 ********************************************************************/
if(get_option('tec_index') == 'on') {
    add_action("wp_footer", "tec_index_generate", 14);
}

if(!function_exists("tec_index_generate")) {
    function tec_index_generate() {
        wp_enqueue_script('tec-index-gen', plugins_url('/js/tec_index.js', __FILE__), '', '2.1');
    }
}
/********************************************************************
 * Routing Nation Page Illustration Galleries
 ********************************************************************/
if(get_option('tec_gallery') == 'on') {
    add_action("wp_head", "tec_gallery", 14);
    //add_action("wp_enqueue_scripts", "tec_gallery");
}

if( !function_exists("tec_gallery") ) {
    function tec_gallery() {
        wp_enqueue_script( 'jquery531', 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js');
        wp_enqueue_script( 'tec-gallery', plugins_url('/js/tec_gallery.js', __FILE__), '', '2.9');
    }
}

/********************************************************************
 * Routing Mobile Compatability Mods
 ********************************************************************/
if(get_option('tec_mobile') == 'on') {
    add_action("wp_head", "tec_mobile_init", 13);
}

if( !function_exists("tec_mobile_init") ) {
    function tec_mobile_init() {
        wp_enqueue_script( 'tec-mobile-init', plugins_url('/js/tec_mobile_comp_init.js', __FILE__), '', '2.2');
    }
}

/********************************************************************
 * Routing To Top Button
 ********************************************************************/
if(get_option('tec_to_top') == 'on') {
    add_action("wp_head", "tec_to_top", 10);
}

if( !function_exists("tec_to_top") ) {
    function tec_to_top() {
        wp_enqueue_script( 'tec-to-top', plugins_url('/js/tec_to_top.js', __FILE__), '', '2.4');
    }
}

/********************************************************************
 * Routing Recent Video Embed
 ********************************************************************/
if(get_option('tec_video_embed') == 'on') {
    add_action("wp_head", "tec_video_embed", 10);
}

if( !function_exists("tec_video_embed") ) {
    function tec_video_embed() {
        if(is_single() && !in_category("has-own-video")) {
            wp_enqueue_script( 'tec-video-embed', plugins_url('/js/tec_video_embed.js', __FILE__), '', '1.1');
        }
    }
}