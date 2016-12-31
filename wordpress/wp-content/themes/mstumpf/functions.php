<?php

/**
 * scripts, styles, and menus
 */

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
        .column-featured_image img {
            max-height: 150px;
            max-width: 150px;
        }
    </style>
<?php }
add_action('admin_head', 'themeAdminCss');


//add menu locations
function themeRegisterMenus() {
    register_nav_menu('header-menu',__( 'Header Menu' ));
}
add_action( 'init', 'themeRegisterMenus' );


/**
 * misc
 */

//https://make.wordpress.org/core/2014/10/29/title-tags-in-4-1/
function themeSlugSetup() {
    add_theme_support( 'title-tag' );
}
add_action( 'after_setup_theme', 'themeSlugSetup' );

//remove unnecessary wp code
function themeDisableWPEmbeds() {

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
add_action('init', 'themeDisableWPEmbeds', 9999);
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'wp_print_styles', 'print_emoji_styles' );


/**
 * api
 */

//add custom controllers
function apiAddCustomControllers($controllers) {
    $controllers[] = 'menu';
    $controllers[] = 'custom_posts';
    return $controllers;
}
add_filter('json_api_controllers', 'apiAddCustomControllers');

// Register the source file for JSON_API_Widgets_Controller
function apiMenuControllerPath($default_path) {
    return get_stylesheet_directory().'/api/menu-controller.php';
}
add_filter('json_api_menu_controller_path', 'apiMenuControllerPath');

function apiCustomPostsControllerPath($default_path) {
    return get_stylesheet_directory().'/api/custom-posts-controller.php';
}
add_filter('json_api_custom_posts_controller_path', 'apiCustomPostsControllerPath');

// Disable default api methods
function apiDisableControllerExecution() {
    // Stop execution
    exit;
}
add_action('json_api-core-get_author_index', 'apiDisableControllerExecution');
add_action('json_api-core-info', 'apiDisableControllerExecution');
add_action('json_api-core-get_page_index', 'apiDisableControllerExecution');
add_action('json_api-core-get_nonce', 'apiDisableControllerExecution');
add_action('json_api-core-get_tag_index', 'apiDisableControllerExecution');
add_action('json_api-core-get_category_index', 'apiDisableControllerExecution');
add_action('json_api-core-get_date_index', 'apiDisableControllerExecution');