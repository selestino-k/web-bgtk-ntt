<?php
/**
 * Search Results Template
 *
 * @package bgtk-ntt
 */

get_header();
?>

<main id="primary" class="site-main search-results" role="main">
	<div class="container">

		<header class="page-header">
			<h1 class="page-title">
				<?php
				/* translators: %s: search query. */
				printf( esc_html__( 'Hasil pencarian untuk: &ldquo;%s&rdquo;', 'bgtk-ntt' ), '<span>' . esc_html( get_search_query() ) . '</span>' );
				?>
			</h1>
		</header>

		<?php if ( have_posts() ) : ?>

			<div class="archive-grid">
				<?php
				while ( have_posts() ) :
					the_post();
					get_template_part( 'template-parts/content' );
				endwhile;
				?>
			</div>

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
				<h2><?php esc_html_e( 'Tidak ada hasil ditemukan', 'bgtk-ntt' ); ?></h2>
				<p>
					<?php
					printf(
						esc_html__( 'Maaf, tidak ada konten yang cocok dengan &ldquo;%s&rdquo;. Silakan coba kata kunci lain.', 'bgtk-ntt' ),
						'<strong>' . esc_html( get_search_query() ) . '</strong>'
					);
					?>
				</p>
				<?php get_search_form(); ?>
			</div>

		<?php endif; ?>

	</div><!-- .container -->
</main>

<?php get_footer(); ?>
