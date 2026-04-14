<?php
/**
 * Content Page Partial
 *
 * Used in page.php for default pages.
 *
 * @package bgtk-ntt
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class( 'page-article' ); ?>>

	<header class="page-article__header">
		<?php if ( ! is_front_page() ) : ?>
			<h1 class="page-article__title"><?php the_title(); ?></h1>
		<?php endif; ?>
	</header>

	<?php if ( has_post_thumbnail() ) : ?>
	<div class="page-article__featured-image">
		<?php the_post_thumbnail( 'bgtk-featured', array( 'class' => 'page-article__image', 'alt' => esc_attr( get_the_title() ) ) ); ?>
	</div>
	<?php endif; ?>

	<div class="page-article__content entry-content">
		<?php
		the_content();

		wp_link_pages( array(
			'before'      => '<div class="page-links">' . esc_html__( 'Pages:', 'bgtk-ntt' ),
			'after'       => '</div>',
			'link_before' => '<span class="page-link">',
			'link_after'  => '</span>',
		) );
		?>
	</div>

</article>
