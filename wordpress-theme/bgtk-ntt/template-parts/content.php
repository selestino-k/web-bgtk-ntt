<?php
/**
 * Content Partial — News / Post Card
 *
 * Used in archive, index, and search pages.
 *
 * @package bgtk-ntt
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'news-card' ); ?>>
	<a href="<?php the_permalink(); ?>" class="news-card__link" tabindex="-1" aria-hidden="true">
		<div class="news-card__image-wrap">
			<?php if ( has_post_thumbnail() ) : ?>
				<?php the_post_thumbnail( 'bgtk-card', array( 'class' => 'news-card__image', 'alt' => esc_attr( get_the_title() ) ) ); ?>
			<?php else : ?>
				<div class="news-card__image-placeholder">
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
				</div>
			<?php endif; ?>
		</div>
	</a>

	<div class="news-card__body">
		<!-- Meta: author + date -->
		<div class="news-card__meta">
			<span class="news-card__meta-item">
				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
				<?php echo esc_html( get_the_author() ); ?>
			</span>
			<span class="news-card__meta-item">
				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
				<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
					<?php echo esc_html( get_the_date( 'j F Y' ) ); ?>
				</time>
			</span>
		</div>

		<!-- Title -->
		<h3 class="news-card__title">
			<a href="<?php the_permalink(); ?>" class="news-card__title-link">
				<?php the_title(); ?>
			</a>
		</h3>

		<!-- Excerpt -->
		<p class="news-card__excerpt"><?php echo wp_kses_post( wp_trim_words( get_the_excerpt(), 25, '&hellip;' ) ); ?></p>

		<!-- Tags -->
		<?php
		$tags = get_the_tags();
		if ( $tags ) :
			?>
			<div class="news-card__tags">
				<?php foreach ( $tags as $tag ) : ?>
					<a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>" class="badge badge--primary news-card__tag">
						<?php echo esc_html( $tag->name ); ?>
					</a>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
	</div>
</article>
