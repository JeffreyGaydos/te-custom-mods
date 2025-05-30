<?php
/*
Plugin Name: Tank Encyclopedia Custom Mods
Version: 2.1.48 | Author: Jeffrey Gaydos | Discord: Jeff_G#3210 | Github Repo: https://github.com/JeffreyGaydos/te-custom-mods

Description: A plugin created to organize the various functions of the old child theme, thereby removing the need for the child theme. Includes toggles in case any functions fail during udpates.
*/

//Including all files contained within "includes/tp-functions.php". Require Once denotes that this plugin will not run without finding and compiling this file
require_once plugin_dir_path(__FILE__) . 'includes/tec-functions.php';

/*
 *  Menu/Settings Page Initialization and Creation
 *  - Initializes the Menu Page
 *  - Creates the Menu Page
 *  - Updates data in the wordpress backend for use in plugin (see ./includes/tec-functions.php)
 */

//Hooking the menu creation and initialization functions to their appropriate hooks
add_action( 'admin_menu', 'tec_settings_menu' );
add_action( 'admin_init', 'update_tec_info' );
add_action('admin_footer', 'load_admin_scripts'); //footer to make sure all the HTML in here has loaded so we can immediately reference them in the script

//tells wordpress that we are going to a create a menu page for this plugin (with various details)
function tec_settings_menu() {
    $page_title = 'TE Custom Mods';
    $menu_title = 'TE Custom Mods';
    $capability = 'manage_options';
    $menu_slug  = 'tec-settings';
    $function   = 'tec_acp_page';
    $icon_url   = 'dashicons-admin-customizer';
    //$icon_url   = plugins_url('images/icon.png'); - for custom images
    $position = 60;
    add_menu_page( $page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position);
}

function load_admin_scripts( $hook ) {
    wp_enqueue_script( 'tec-admin-panel', plugins_url('/includes/js/tec_admin_panel.js', __FILE__), '', '1.47');
}

//$tec_notifs = [];

//Creates the html of the plugin's setting page, passing data through the backend as needed
if( !function_exists("tec_acp_page") ) {
    function tec_acp_page() {
        ?>
            <h1>Tank Encyclopedia Custom Mods</h1>
            <p>Check or uncheck the boxes below and click "Save Changes" to change which features are active. <!--Click the arrows next to them to see a short description of the feature and where it is active.--></p>
            <br>
            <form method="post" action="options.php">
            <?php
                settings_fields( 'tec-settings' );
            ?>
            <?php
                do_settings_sections( 'tec-settings' );
            ?>
            <input type="checkbox" name="tec_dark_mode" <?php tec_get_checked('tec_dark_mode') ?> >Dark Mode</input>
            <br><br>
            <input type="checkbox" name="tec_donation" <?php tec_get_checked('tec_donation') ?> >Patreon / PayPal Logos</input>
            <br><br>
            <input type="checkbox" name="tec_header_follow" <?php tec_get_checked('tec_header_follow') ?> >Header Follow</input>
            <br><br>
            <input type="checkbox" name="tec_random_article" <?php tec_get_checked('tec_random_article') ?> >Random Article Button (Deactivate "Redirect URL to Post" plugin as well if deactivating)</input>
            <br><br>
            <input type="checkbox" name="tec_discord" <?php tec_get_checked('tec_discord') ?> >Discord Button (DEPRECATED)</input>
            <br><br>
            <input type="checkbox" name="tec_index" <?php tec_get_checked('tec_index') ?> >Article Contents Generator</input>
            <br><br>
            <input type="checkbox" name="tec_commission_blurb" <?php tec_get_checked('tec_commission_blurb') ?> >Amazon Commission Blurb Placement</input>
            <br><br>
            <input type="checkbox" name="tec_image_resourcer" <?php tec_get_checked('tec_image_resourcer') ?> >Image Re-Sourcer (to mass fix image sources)</input>
            <br><br>
            <input type="checkbox" name="tec_gallery" <?php tec_get_checked('tec_gallery') ?> >Nation Page Galleries (note that divs of class "gallery" on all nation pages must also be removed to fully deactivate)</input>
            <br><br>
            <input type="checkbox" name="tec_mobile" <?php tec_get_checked('tec_mobile') ?> >Mobile Compatability Modifications</input>
            <br><br>
            <input type="checkbox" name="tec_to_top" <?php tec_get_checked('tec_to_top') ?> >To Top Button</input>
            <br><br>
            <input type="checkbox" name="tec_video_embed" <?php tec_get_checked('tec_video_embed') ?> >Recent TE Video Embed</input>
            <br><br>
            <input type="checkbox" name="tec_coauthor_display" <?php tec_get_checked('tec_coauthor_display') ?> >Co-Author Display</input>
            <br><br>
            <input type="checkbox" name="tec_author_archive" <?php tec_get_checked('tec_author_archive') ?> >Author Archive Display</input>
            <br><br>
            <input type="checkbox" name="tec_category_archive" <?php tec_get_checked('tec_category_archive') ?> >Category Archive Display</input>
            <br><br>
            <input type="checkbox" name="tec_patreon_prompt" <?php tec_get_checked('tec_patreon_prompt') ?> >Patreon Prompt Box</input>
            <br><br>
            <input type="checkbox" name="tec_support_display" <?php tec_get_checked('tec_support_display') ?> >Monetary Supporter Display</input>
            <textarea type="text" name="tec_support_display_supporters_saved" style="display: none"><?php echo tec_get_text('tec_support_display_supporters_saved'); ?></textarea>
            <textarea type="text" name="tec_support_display_supporters_public" style="display: none"><?php echo tec_get_text('tec_support_display_supporters_public'); ?></textarea>
            <div style="margin: 20px 0px 0px 50px">
                <p>Upload a CSV file with all patreon members listed. Include the columns "Name", "Email", "Lifetime Amount", and "Tier" at a minimum. Only "Name" and "Tier" will be exposed to the public.</p>
                <p>When input, the 2 sheets will be compared and differences will be noted. A green row is a new member added, a red row is a member deleted, a blue cell is a data value that changed from the previous state of that user (keyed on email). Updating an email is treated as a delete and insert</p>
                <input id="csv-input" type="file" accept=".csv">
                <br>
                <a id="show-patreon-details">Show current data</a>
                <div id="patreon-details" style="display: none">
                    <table>
                        <tr>
                            <th title="<?php tec_get_text('tec_support_display_supporters_public') ?>">Saved Supporters:</th>
                            <th id="unhide-me-when-input" style="display: none;">Will Replace With:</th>
                        </tr>
                        <tr>
                            <td id="current-patreon-supporters" style="vertical-align: top"></td>
                            <td id="new-patreon-supporters-list" style="vertical-align: top"></td>
                        </tr>
                    </table>
                    <a id="public-data">view raw public data</a>
                </div>
            </div>
            <br><br>
            <input type="checkbox" name="tec_graphic_blur" <?php tec_get_checked('tec_graphic_blur') ?> >Graphic Blur</input>
            <?php
                submit_button();
            ?>
            </form>
        <?php
    }
}

//Checks the status of the checkbox according to the database, setting the "checked" parameter as necessary
//Helper function for "tec_acp_page()" (above)
if( !function_exists("tec_get_checked") ) {
    function tec_get_checked($option) {
        if(get_option($option) == 'on') {
            echo 'checked';
        }
        else {
            echo '';
        }
    }
}

if( !function_exists("tec_get_text") ) {
    function tec_get_text($option) {
        return get_option($option);
    }
}

//TODO add an x button
if( !function_exists("tec_generate_list_from_text") ) {
    function tec_generate_list_from_text($text) {
        $names = preg_split("/::::/", $text, -1, PREG_SPLIT_NO_EMPTY);
        foreach($names as &$name) {
            echo '<li style="list-style: inside">'.$name.'</li>';
        }
    }
}

if( !function_exists("update_tec_info") ) {
    function update_tec_info() {
        register_setting( 'tec-settings', 'tec_dark_mode' );
        register_setting( 'tec-settings', 'tec_donation' );
        register_setting( 'tec-settings', 'tec_header_follow' );
        register_setting( 'tec-settings', 'tec_random_article' );
        register_setting( 'tec-settings', 'tec_discord' );
        register_setting( 'tec-settings', 'tec_index' );
        register_setting( 'tec-settings', 'tec_commission_blurb' );
        register_setting( 'tec-settings', 'tec_image_resourcer' );
        register_setting( 'tec-settings', 'tec_gallery' );
        register_setting( 'tec-settings', 'tec_mobile' );
        register_setting( 'tec-settings', 'tec_to_top' );
        register_setting( 'tec-settings', 'tec_video_embed' );
        register_setting( 'tec-settings', 'tec_coauthor_display' );
        register_setting( 'tec-settings', 'tec_author_archive' );
        register_setting( 'tec-settings', 'tec_category_archive' );
        register_setting( 'tec-settings', 'tec_patreon_prompt' );
        register_setting( 'tec-settings', 'tec_support_display' );
        register_setting( 'tec-settings', 'tec_support_display_supporters_saved');
        register_setting( 'tec-settings', 'tec_support_display_supporters_public');
        register_setting( 'tec-settings', 'tec_graphic_blur' );
    }
}