<?php
/**
 * Default Page Template
 *
 * @package bgtk-ntt
 */

get_header();
?>

<main id="primary" class="site-main" role="main">
	<div class="container">
		<div class="page-layout">

			<!-- Main content area -->
			<div class="page-content-area">
				<?php
				while ( have_posts() ) :
					the_post();
					get_template_part( 'template-parts/content', 'page' );

					// Comments.
					if ( comments_open() || get_comments_number() ) {
						comments_template();
					}
				endwhile;
				?>
			</div>

			<!-- Sidebar -->
			<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
			<aside id="secondary" class="widget-area page-sidebar" role="complementary" aria-label="<?php esc_attr_e( 'Sidebar', 'bgtk-ntt' ); ?>">
				<?php dynamic_sidebar( 'sidebar-1' ); ?>
			</aside>
			<?php endif; ?>

		</div><!-- .page-layout -->
	</div><!-- .container -->
</main>

<?php get_footer(); ?>
