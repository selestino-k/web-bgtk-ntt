<?php
/**
 * Sidebar Template
 *
 * @package bgtk-ntt
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>
<aside id="secondary" class="widget-area sidebar" role="complementary" aria-label="<?php esc_attr_e( 'Sidebar', 'bgtk-ntt' ); ?>">
	<div class="sidebar-inner">

		<h3 class="sidebar-title"><?php esc_html_e( 'Pengumuman', 'bgtk-ntt' ); ?></h3>

		<?php
		// Recent pengumuman (announcements) — fall back to recent posts.
		$pengumuman_query = new WP_Query( array(
			'posts_per_page' => 5,
			'post_status'    => 'publish',
			'orderby'        => 'date',
			'order'          => 'DESC',
			'category_name'  => 'pengumuman',
		) );

		if ( $pengumuman_query->have_posts() ) :
			echo '<ul class="sidebar-list">';
			while ( $pengumuman_query->have_posts() ) :
				$pengumuman_query->the_post();
				?>
				<li class="sidebar-list__item">
					<a href="<?php the_permalink(); ?>" class="sidebar-list__link">
						<span class="sidebar-list__date">
							<?php echo esc_html( get_the_date( 'j M Y' ) ); ?>
						</span>
						<span class="sidebar-list__title"><?php the_title(); ?></span>
					</a>
				</li>
				<?php
			endwhile;
			echo '</ul>';
			wp_reset_postdata();
		else :
			// Fallback: dynamic sidebar widgets.
			dynamic_sidebar( 'sidebar-1' );
		endif;
		?>

	</div>
</aside>
