<?php
/**
 * 404 Error Page Template
 *
 * @package bgtk-ntt
 */

get_header();
?>

<main id="primary" class="site-main not-found-page" role="main">
	<div class="container">
		<div class="not-found-content">

			<div class="not-found-illustration" aria-hidden="true">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" class="not-found-svg">
					<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
						font-family="Montserrat,sans-serif" font-size="72" font-weight="700"
						fill="var(--primary)" opacity="0.15">404</text>
					<text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
						font-family="Montserrat,sans-serif" font-size="72" font-weight="700"
						fill="none" stroke="var(--primary)" stroke-width="1.5">404</text>
				</svg>
			</div>

			<h1 class="not-found-title">
				<?php esc_html_e( 'Halaman Tidak Ditemukan', 'bgtk-ntt' ); ?>
			</h1>
			<p class="not-found-description">
				<?php esc_html_e( 'Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau tidak lagi tersedia.', 'bgtk-ntt' ); ?>
			</p>

			<div class="not-found-actions">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">
					<?php esc_html_e( '&larr; Kembali ke Beranda', 'bgtk-ntt' ); ?>
				</a>
				<div class="not-found-search">
					<?php get_search_form(); ?>
				</div>
			</div>

		</div>
	</div>
</main>

<?php get_footer(); ?>
