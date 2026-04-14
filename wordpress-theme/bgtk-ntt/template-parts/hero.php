<?php
/**
 * Hero / Carousel Section Partial
 *
 * Displays a carousel of hero slides. Uses ACF fields if available,
 * otherwise renders a static hero from theme customizer or hardcoded fallback.
 *
 * @package bgtk-ntt
 */

// Attempt to query hero slides via a custom post type or ACF.
$hero_slides = array();

if ( function_exists( 'get_field' ) ) {
	// If ACF is active, retrieve slides from options page.
	$hero_slides = get_field( 'hero_slides', 'option' );
}

// If no ACF slides, fall back to static hero.
if ( empty( $hero_slides ) ) :
?>
<section class="section-hero hero-static" aria-label="<?php esc_attr_e( 'Hero', 'bgtk-ntt' ); ?>">
	<div class="hero-slide hero-slide--active">
		<div class="hero-slide__bg" style="background: linear-gradient(135deg, var(--primary) 0%, #1e6aa5 100%);"></div>
		<div class="hero-slide__content container">
			<div class="hero-slide__text">
				<h1 class="hero-slide__title">
					<?php echo esc_html( get_bloginfo( 'name' ) ); ?>
				</h1>
				<p class="hero-slide__subtitle">
					<?php echo esc_html( get_bloginfo( 'description' ) ); ?>
				</p>
				<div class="hero-slide__actions">
					<a href="<?php echo esc_url( home_url( '/profil/sambutan-kata' ) ); ?>" class="btn btn-primary">
						<?php esc_html_e( 'Pelajari Lebih Lanjut', 'bgtk-ntt' ); ?>
					</a>
					<a href="<?php echo esc_url( home_url( '/publikasi/berita-terkini' ) ); ?>" class="btn btn-outline hero-btn-outline">
						<?php esc_html_e( 'Berita Terkini', 'bgtk-ntt' ); ?>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<?php else : ?>

<!-- ACF-powered Carousel -->
<section class="section-hero hero-carousel" aria-label="<?php esc_attr_e( 'Hero Carousel', 'bgtk-ntt' ); ?>" data-slides="<?php echo esc_attr( count( $hero_slides ) ); ?>">

	<div class="hero-carousel__track" id="heroCarouselTrack">
		<?php foreach ( $hero_slides as $index => $slide ) :
			$bg_image = ! empty( $slide['image'] ) ? esc_url( $slide['image']['url'] ) : '';
			$is_active = 0 === $index;
			?>
			<div
				class="hero-slide<?php echo $is_active ? ' hero-slide--active' : ''; ?>"
				<?php if ( $bg_image ) : ?>
				style="background-image: url('<?php echo $bg_image; ?>');"
				<?php endif; ?>
				role="group"
				aria-label="<?php echo esc_attr( sprintf( __( 'Slide %d', 'bgtk-ntt' ), $index + 1 ) ); ?>"
			>
				<div class="hero-slide__overlay"></div>
				<div class="hero-slide__content container">
					<?php if ( ! empty( $slide['title'] ) ) : ?>
						<h2 class="hero-slide__title"><?php echo esc_html( $slide['title'] ); ?></h2>
					<?php endif; ?>
					<?php if ( ! empty( $slide['description'] ) ) : ?>
						<p class="hero-slide__subtitle"><?php echo esc_html( $slide['description'] ); ?></p>
					<?php endif; ?>
					<?php if ( ! empty( $slide['link'] ) ) : ?>
						<a href="<?php echo esc_url( $slide['link']['url'] ); ?>" class="btn btn-primary"
							<?php echo ! empty( $slide['link']['target'] ) ? 'target="' . esc_attr( $slide['link']['target'] ) . '"' : ''; ?>>
							<?php echo esc_html( $slide['link']['title'] ); ?>
						</a>
					<?php endif; ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>

	<!-- Carousel Controls -->
	<?php if ( count( $hero_slides ) > 1 ) : ?>
	<button class="hero-carousel__btn hero-carousel__btn--prev" aria-label="<?php esc_attr_e( 'Previous slide', 'bgtk-ntt' ); ?>">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
	</button>
	<button class="hero-carousel__btn hero-carousel__btn--next" aria-label="<?php esc_attr_e( 'Next slide', 'bgtk-ntt' ); ?>">
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
	</button>

	<!-- Dots -->
	<div class="hero-carousel__dots" role="tablist" aria-label="<?php esc_attr_e( 'Carousel slides', 'bgtk-ntt' ); ?>">
		<?php foreach ( $hero_slides as $index => $slide ) : ?>
		<button
			class="hero-carousel__dot<?php echo 0 === $index ? ' is-active' : ''; ?>"
			role="tab"
			aria-selected="<?php echo 0 === $index ? 'true' : 'false'; ?>"
			aria-label="<?php echo esc_attr( sprintf( __( 'Go to slide %d', 'bgtk-ntt' ), $index + 1 ) ); ?>"
			data-index="<?php echo $index; ?>"
		></button>
		<?php endforeach; ?>
	</div>
	<?php endif; ?>

</section>

<?php endif; ?>
