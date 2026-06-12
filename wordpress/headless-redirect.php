<?php
/**
 * Plugin Name: Headless Redirect (cms → frontend)
 * Description: Redirects public front-end requests on cms.qarigroup.com to the
 *              Next.js site (abdul.qarigroup.com), while leaving wp-admin, login,
 *              the REST API, WPGraphQL, cron, and media files fully working.
 * Author:      Abdul
 * Version:     1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // No direct access.
}

// Where to send public visitors.
if ( ! defined( 'HEADLESS_FRONTEND_URL' ) ) {
    define( 'HEADLESS_FRONTEND_URL', 'https://abdul.qarigroup.com/' );
}

add_action( 'template_redirect', function () {

    // template_redirect never fires for /wp-admin, /wp-login.php, /wp-json,
    // /graphql, wp-cron, or direct file requests — but we double-check anyway.
    if ( is_admin() ) {
        return;
    }

    $uri = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '/';

    // Paths that MUST keep working on the CMS domain.
    $allowed_prefixes = array(
        '/wp-admin',
        '/wp-login',
        '/wp-json',
        '/graphql',
        '/wp-cron',
        '/xmlrpc',
        '/wp-content', // media, uploads, plugin assets
        '/wp-includes',
    );

    foreach ( $allowed_prefixes as $prefix ) {
        if ( 0 === strpos( $uri, $prefix ) ) {
            return; // Leave these requests alone.
        }
    }

    // Optional: let logged-in admins preview the WP front-end instead of being
    // redirected. Uncomment the next 3 lines if you want that behaviour.
    // if ( is_user_logged_in() ) {
    //     return;
    // }

    wp_redirect( HEADLESS_FRONTEND_URL, 301 );
    exit;
} );
