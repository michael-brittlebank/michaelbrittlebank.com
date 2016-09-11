<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package mstumpf
 */

get_header(); ?>
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<section class="error-404 not-found">
				<header class="page-header">
					<h1 class="page-title">
                        Oops! That page can&rsquo;t be found.
                    </h1>
				</header><!-- .page-header -->
				<div class="page-content">
					<p>It looks like nothing was found at this location.</p>
				</div><!-- .page-content -->
			</section>
		</main><!-- #main -->
	</div><!-- #primary -->
<?php
get_footer();
