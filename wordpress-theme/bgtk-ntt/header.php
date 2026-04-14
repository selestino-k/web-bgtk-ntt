<?php
/**
 * Header Template
 *
 * @package bgtk-ntt
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="profile" href="https://gmpg.org/xfn/11">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="skip-link screen-reader-text" href="#main-content">
	<?php esc_html_e( 'Skip to content', 'bgtk-ntt' ); ?>
</a>

<header id="masthead" class="site-header<?php echo get_theme_mod( 'sticky_header', true ) ? ' is-sticky' : ''; ?>" role="banner">
	<div class="header-inner container">

		<!-- Mobile: Hamburger toggle (visible < 1280px) -->
		<button
			id="mobile-menu-toggle"
			class="mobile-menu-toggle xl-hidden"
			aria-controls="primary-menu-wrapper"
			aria-expanded="false"
			aria-label="<?php esc_attr_e( 'Toggle navigation menu', 'bgtk-ntt' ); ?>"
		>
			<span class="hamburger-bar"></span>
			<span class="hamburger-bar"></span>
			<span class="hamburger-bar"></span>
		</button>

		<!-- Site Logo / Branding -->
		<div class="site-branding">
			<?php if ( has_custom_logo() ) : ?>
				<?php the_custom_logo(); ?>
			<?php else : ?>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="site-title-link" rel="home">
					<img
						src="<?php echo esc_url( get_template_directory_uri() . '/assets/img/logo-placeholder.svg' ); ?>"
						alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>"
						class="site-logo"
						width="220"
						height="48"
					>
				</a>
			<?php endif; ?>
		</div>

		<!-- Desktop Primary Navigation (visible ≥ 1280px) -->
		<nav
			id="primary-menu-wrapper"
			class="primary-navigation"
			aria-label="<?php esc_attr_e( 'Primary Navigation', 'bgtk-ntt' ); ?>"
		>
			<?php
			wp_nav_menu( array(
				'theme_location' => 'primary',
				'menu_id'        => 'primary-menu',
				'menu_class'     => 'nav-menu',
				'container'      => false,
				'walker'         => new BGTK_NTT_Nav_Walker(),
				'fallback_cb'    => 'bgtk_ntt_fallback_menu',
			) );
			?>
		</nav>

		<!-- Desktop Right: Badge logos + Dark mode toggle -->
		<div class="header-right desktop-only">
			<img
				src="<?php echo esc_url( get_template_directory_uri() . '/assets/img/ramah-badge.png' ); ?>"
				alt="<?php esc_attr_e( 'Kemendikdasmen Ramah', 'bgtk-ntt' ); ?>"
				class="header-badge"
				width="110"
				height="40"
			>
			<img
				src="<?php echo esc_url( get_template_directory_uri() . '/assets/img/pendidikan-bermutu-badge.png' ); ?>"
				alt="<?php esc_attr_e( 'Pendidikan Bermutu', 'bgtk-ntt' ); ?>"
				class="header-badge"
				width="110"
				height="40"
			>
			<!-- Dark mode toggle -->
			<button
				id="dark-mode-toggle"
				class="dark-mode-toggle"
				aria-label="<?php esc_attr_e( 'Toggle dark mode', 'bgtk-ntt' ); ?>"
				title="<?php esc_attr_e( 'Toggle dark/light mode', 'bgtk-ntt' ); ?>"
			>
				<span class="icon-sun" aria-hidden="true">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
				</span>
				<span class="icon-moon" aria-hidden="true">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
				</span>
			</button>
		</div>

	</div><!-- .header-inner -->

	<!-- Mobile Navigation drawer (visible < 1280px) -->
	<nav
		id="mobile-menu"
		class="mobile-navigation"
		aria-label="<?php esc_attr_e( 'Mobile Navigation', 'bgtk-ntt' ); ?>"
		hidden
	>
		<?php
		wp_nav_menu( array(
			'theme_location' => 'primary',
			'menu_id'        => 'mobile-primary-menu',
			'menu_class'     => 'mobile-nav-menu',
			'container'      => false,
			'walker'         => new BGTK_NTT_Nav_Walker(),
			'fallback_cb'    => 'bgtk_ntt_fallback_menu',
		) );
		?>
	</nav>

</header><!-- #masthead -->

<div id="main-content" class="site-content">
