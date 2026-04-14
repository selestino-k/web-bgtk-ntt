<?php
/**
 * Archive / Category Template
 *
 * @package bgtk-ntt
 */

get_header();
?>

<main id="primary" class="site-main" role="main">
	<div class="container">

		<!-- Archive header -->
		<header class="page-header archive-header">
			<?php
			the_archive_title( '<h1 class="page-title">', '</h1>' );
			the_archive_description( '<div class="archive-description">', '</div>' );
			?>
		</header>

		<?php if ( have_posts() ) : ?>

			<!-- Post grid -->
			<div class="archive-grid">
				<?php
				while ( have_posts() ) :
					the_post();
					get_template_part( 'template-parts/content' );
				endwhile;
				?>
			</div>

			<!-- Pagination -->
			<div class="archive-pagination">
				<?php
				the_posts_pagination( array(
					'mid_size'  => 2,
					'prev_text' => __( '&larr; Sebelumnya', 'bgtk-ntt' ),
					'next_text' => __( 'Selanjutnya &rarr;', 'bgtk-ntt' ),
				) );
				?>
			</div>

		<?php else : ?>

			<div class="no-results">
				<h2><?php esc_html_e( 'Tidak ada konten ditemukan', 'bgtk-ntt' ); ?></h2>
				<p><?php esc_html_e( 'Maaf, tidak ada konten yang sesuai dengan permintaan Anda.', 'bgtk-ntt' ); ?></p>
				<?php get_search_form(); ?>
			</div>

		<?php endif; ?>

	</div><!-- .container -->
</main>

<?php get_footer(); ?>
