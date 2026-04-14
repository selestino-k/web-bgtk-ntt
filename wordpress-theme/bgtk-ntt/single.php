<?php
/**
 * Single Post Template
 *
 * @package bgtk-ntt
 */

get_header();
?>

<main id="primary" class="site-main single-post" role="main">
	<div class="container">
		<?php
		while ( have_posts() ) :
			the_post();
			?>

			<article id="post-<?php the_ID(); ?>" <?php post_class( 'article-single' ); ?>>

				<!-- Featured Image Hero -->
				<?php if ( has_post_thumbnail() ) : ?>
				<div class="article-hero">
					<?php the_post_thumbnail( 'bgtk-featured', array( 'class' => 'article-hero__image', 'alt' => esc_attr( get_the_title() ) ) ); ?>
				</div>
				<?php endif; ?>

				<!-- Article Header -->
				<header class="article-header">
					<!-- Category badges -->
					<div class="article-categories">
						<?php
						$categories = get_the_category();
						if ( $categories ) :
							foreach ( $categories as $cat ) :
								echo '<a href="' . esc_url( get_category_link( $cat->term_id ) ) . '" class="badge badge--primary">' . esc_html( $cat->name ) . '</a> ';
							endforeach;
						endif;
						?>
					</div>

					<h1 class="article-title"><?php the_title(); ?></h1>

					<!-- Post meta -->
					<div class="article-meta">
						<span class="article-meta__item">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
							<?php echo esc_html( get_the_author() ); ?>
						</span>
						<span class="article-meta__item">
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
							<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
								<?php echo esc_html( get_the_date( 'j F Y' ) ); ?>
							</time>
						</span>
					</div>
				</header>

				<!-- Post Content -->
				<div class="article-content entry-content">
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

				<!-- Post Tags -->
				<?php
				$tags = get_the_tags();
				if ( $tags ) :
					?>
					<div class="article-tags">
						<span class="article-tags__label"><?php esc_html_e( 'Tags:', 'bgtk-ntt' ); ?></span>
						<?php foreach ( $tags as $tag ) : ?>
							<a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>" class="badge badge--secondary"><?php echo esc_html( $tag->name ); ?></a>
						<?php endforeach; ?>
					</div>
				<?php endif; ?>

				<!-- Navigation -->
				<nav class="article-navigation" aria-label="<?php esc_attr_e( 'Post navigation', 'bgtk-ntt' ); ?>">
					<div class="article-navigation__inner">
						<?php
						$prev_post = get_previous_post();
						$next_post = get_next_post();
						?>
						<?php if ( $prev_post ) : ?>
						<a href="<?php echo esc_url( get_permalink( $prev_post ) ); ?>" class="article-nav-link article-nav-link--prev">
							<span class="article-nav-link__label"><?php esc_html_e( '&larr; Previous', 'bgtk-ntt' ); ?></span>
							<span class="article-nav-link__title"><?php echo esc_html( get_the_title( $prev_post ) ); ?></span>
						</a>
						<?php endif; ?>
						<a href="<?php echo esc_url( get_post_type_archive_link( 'post' ) ); ?>" class="btn btn-outline">
							<?php esc_html_e( '&larr; Kembali ke Berita', 'bgtk-ntt' ); ?>
						</a>
						<?php if ( $next_post ) : ?>
						<a href="<?php echo esc_url( get_permalink( $next_post ) ); ?>" class="article-nav-link article-nav-link--next">
							<span class="article-nav-link__label"><?php esc_html_e( 'Next &rarr;', 'bgtk-ntt' ); ?></span>
							<span class="article-nav-link__title"><?php echo esc_html( get_the_title( $next_post ) ); ?></span>
						</a>
						<?php endif; ?>
					</div>
				</nav>

				<!-- Comments -->
				<?php if ( comments_open() || get_comments_number() ) : ?>
					<div class="article-comments">
						<?php comments_template(); ?>
					</div>
				<?php endif; ?>

			</article>

		<?php endwhile; ?>
	</div><!-- .container -->
</main>

<?php get_footer(); ?>
