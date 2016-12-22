<?php

// Enqueue scripts and styles.
function themeScripts() {
    $scriptDate = '20160806';
    //css
    wp_enqueue_style(
        'mstumpf-wp-style',
        get_template_directory_uri().'/style.css',
        array(),
        $scriptDate,
        false
    );
}
add_action( 'wp_enqueue_scripts', 'themeScripts' );


/**
 * WordPress generate html titles
 * https://make.wordpress.org/core/2014/10/29/title-tags-in-4-1/
 */
function themeSlugSetup() {
    add_theme_support( 'title-tag' );
}
add_action( 'after_setup_theme', 'themeSlugSetup' );


//custom admin css
function themeAdminCss() { ?>
    <style>
        #menu-comments, #menu-tools, #menu-posts, /* sidebar */
        #wp-admin-bar-wp-logo, #wp-admin-bar-comments, /*top bar*/
        #contextual-help-link-wrap, /* misc */
        #types-information-table /* editor page */
        {
            display: none!important;
        }
    </style>
<?php }
add_action('admin_head', 'themeAdminCss');


//add menu locations
function themeRegisterMenus() {
    register_nav_menu('header-menu',__( 'Header Menu' ));
}
add_action( 'init', 'themeRegisterMenus' );


//remove unnecessary wp code
function disableWPEmbeds() {

    // Remove the REST API endpoint.
    remove_action('rest_api_init', 'wp_oembed_register_route');

    // Turn off oEmbed auto discovery.
    // Don't filter oEmbed results.
    remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);

    // Remove oEmbed discovery links.
    remove_action('wp_head', 'wp_oembed_add_discovery_links');

    // Remove oEmbed-specific JavaScript from the front-end and back-end.
    remove_action('wp_head', 'wp_oembed_add_host_js');
}
add_action('init', 'disableWPEmbeds', 9999);
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );