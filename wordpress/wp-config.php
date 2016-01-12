<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'mas_wp');

/** MySQL database username */
define('DB_USER', 'masdm');

/** MySQL database password */
define('DB_PASSWORD', 'MYZAnsHHvexVzxjx6MdQ');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '+iP.r jvPhD/-Iw6[#-*4]KoVJ|hM[Ea|%oo/J5Ee;L]LrMf?=uBEfZMj^/tk6D/');
define('SECURE_AUTH_KEY',  'XUoTqrq@9!V2QJe!{F$gd^j-SHX5b~JV&>,zB/ e()~8Zz|]bB-Z_S.KP{*`OXN`');
define('LOGGED_IN_KEY',    'DmmM/9=M|[N>K)Eo<bG3cIg({-rt71QI=g(mf5-^f-aZy:FiL$[v0T,5a:V&Bkc8');
define('NONCE_KEY',        'SY-A!T}5xo3ydG^7m!rG+ug-AS_ y0H|,)at}~ e|k+U^)%;+oR# ][i?si)s)f|');
define('AUTH_SALT',        '}5UZwA|)|*lnwA1y*?+C(SM8 xN$]@r| 3Y*sqXi-DW4XDg#>3Q0yBc*:oFt~#JX');
define('SECURE_AUTH_SALT', '.CXj2zzo2{0+pA3vl#i)KQto7%3lTc>-1=tO5|gBX`J^MU=[C m.+sepN<EKfy3r');
define('LOGGED_IN_SALT',   'm+L][%^Zxh8A]e@k2}tn22NK|+yeZr%H2u;;s<$uaKuD1+aTq7_:%-.S[~x+dzH[');
define('NONCE_SALT',       '4~GdFFVC90MhP0Bg-6 xp$9}rsRE>{g81E6.X2I#;9R8WQ j|1W5Q~9!bkG-R^0;');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'maswp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
