<?php
/**
 * Homepage / Blog Index Template
 *
 * @package bgtk-ntt
 */

get_header();
?>

<!-- =========================================================
     Hero / Carousel Section
     ========================================================= -->
<?php if ( get_theme_mod( 'show_hero_carousel', true ) ) : ?>
	<?php get_template_part( 'template-parts/hero' ); ?>
<?php endif; ?>

<!-- =========================================================
     Sambutan Section
     ========================================================= -->
<?php if ( get_theme_mod( 'show_sambutan', true ) ) : ?>
<section class="section-sambutan" aria-labelledby="sambutan-heading">
	<div class="container">
		<div class="sambutan-inner">
			<div class="sambutan-image">
				<?php
				$sambutan_page = get_page_by_path( 'profil/sambutan-kata' );
				if ( $sambutan_page && has_post_thumbnail( $sambutan_page ) ) {
					echo get_the_post_thumbnail( $sambutan_page, 'bgtk-card', array( 'class' => 'sambutan-photo', 'alt' => esc_attr( get_the_title( $sambutan_page ) ) ) );
				} else {
					echo '<div class="sambutan-photo-placeholder"></div>';
				}
				?>
			</div>
			<div class="sambutan-content">
				<h2 id="sambutan-heading" class="section-title">
					<?php esc_html_e( 'Sambutan Kata', 'bgtk-ntt' ); ?>
				</h2>
				<?php
				if ( $sambutan_page ) {
					echo '<div class="sambutan-excerpt">' . wp_kses_post( wp_trim_words( $sambutan_page->post_content, 60, '&hellip;' ) ) . '</div>';
					echo '<a href="' . esc_url( get_permalink( $sambutan_page ) ) . '" class="btn btn-primary">' . esc_html__( 'Selengkapnya', 'bgtk-ntt' ) . '</a>';
				} else {
					echo '<p>' . esc_html__( 'Sambutan kepala balai akan ditampilkan di sini.', 'bgtk-ntt' ) . '</p>';
				}
				?>
			</div>
		</div>
	</div>
</section>
<?php endif; ?>

<!-- =========================================================
     Program Prioritas Section
     ========================================================= -->
<?php if ( get_theme_mod( 'show_program', true ) ) : ?>
<section class="section-program" aria-labelledby="program-heading">
	<div class="container">
		<h2 id="program-heading" class="section-title text-center">
			<?php esc_html_e( 'Program Prioritas', 'bgtk-ntt' ); ?>
		</h2>
		<div class="program-grid">
			<?php
			$program_query = new WP_Query( array(
				'post_type'      => 'program',
				'posts_per_page' => 6,
				'post_status'    => 'publish',
				'orderby'        => 'menu_order',
				'order'          => 'ASC',
			) );

			if ( $program_query->have_posts() ) :
				while ( $program_query->have_posts() ) :
					$program_query->the_post();
					?>
					<div class="program-card">
						<?php if ( has_post_thumbnail() ) : ?>
							<div class="program-card__image">
								<?php the_post_thumbnail( 'bgtk-card', array( 'alt' => esc_attr( get_the_title() ) ) ); ?>
							</div>
						<?php endif; ?>
						<div class="program-card__body">
							<h3 class="program-card__title">
								<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
							</h3>
							<p class="program-card__excerpt"><?php the_excerpt(); ?></p>
						</div>
					</div>
					<?php
				endwhile;
				wp_reset_postdata();
			else :
				// Static placeholder cards.
				$static_programs = array(
					array( 'title' => 'Pelatihan Guru Penggerak', 'desc' => 'Program pelatihan untuk guru penggerak se-NTT.' ),
					array( 'title' => 'Digitalisasi Sekolah', 'desc' => 'Mendorong transformasi digital di sekolah-sekolah NTT.' ),
					array( 'title' => 'Literasi dan Numerasi', 'desc' => 'Peningkatan kemampuan literasi dan numerasi peserta didik.' ),
				);
				foreach ( $static_programs as $program ) :
					?>
					<div class="program-card">
						<div class="program-card__body">
							<h3 class="program-card__title"><?php echo esc_html( $program['title'] ); ?></h3>
							<p class="program-card__excerpt"><?php echo esc_html( $program['desc'] ); ?></p>
						</div>
					</div>
					<?php
				endforeach;
			endif;
			?>
		</div>
	</div>
</section>
<?php endif; ?>

<!-- =========================================================
     Berita Terkini Section
     ========================================================= -->
<?php if ( get_theme_mod( 'show_news', true ) ) : ?>
<section class="section-news" aria-labelledby="news-heading">
	<div class="container">
		<div class="section-header">
			<h2 id="news-heading" class="section-title">
				<?php esc_html_e( 'Berita Terkini', 'bgtk-ntt' ); ?>
			</h2>
			<a href="<?php echo esc_url( get_post_type_archive_link( 'post' ) ); ?>" class="section-more-link">
				<?php esc_html_e( 'Lihat Semua &rarr;', 'bgtk-ntt' ); ?>
			</a>
		</div>

		<div class="news-layout">
			<!-- Main news grid (3/4 width on desktop) -->
			<div class="news-main-grid">
				<?php
				$news_query = new WP_Query( array(
					'posts_per_page' => 3,
					'post_status'    => 'publish',
					'orderby'        => 'date',
					'order'          => 'DESC',
				) );

				if ( $news_query->have_posts() ) :
					while ( $news_query->have_posts() ) :
						$news_query->the_post();
						get_template_part( 'template-parts/content' );
					endwhile;
					wp_reset_postdata();
				else :
					echo '<p>' . esc_html__( 'Belum ada berita tersedia.', 'bgtk-ntt' ) . '</p>';
				endif;
				?>
			</div>

			<!-- Sidebar Pengumuman (1/4 width on desktop) -->
			<aside class="news-sidebar" aria-label="<?php esc_attr_e( 'Pengumuman', 'bgtk-ntt' ); ?>">
				<?php get_sidebar(); ?>
			</aside>
		</div>
	</div>
</section>
<?php endif; ?>

<?php get_footer(); ?>
