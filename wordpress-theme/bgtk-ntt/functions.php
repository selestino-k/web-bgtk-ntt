<?php
/**
 * BGTK NTT Theme Functions
 *
 * @package bgtk-ntt
 * @version 1.0.0
 */

defined( 'ABSPATH' ) || exit;

/* =========================================================
   1. Theme Setup
   ========================================================= */
if ( ! function_exists( 'bgtk_ntt_setup' ) ) :
	function bgtk_ntt_setup() {
		// Make theme available for translation.
		load_theme_textdomain( 'bgtk-ntt', get_template_directory() . '/languages' );

		// Let WordPress manage the document title.
		add_theme_support( 'title-tag' );

		// Enable support for Post Thumbnails.
		add_theme_support( 'post-thumbnails' );
		add_image_size( 'bgtk-featured', 1200, 630, true );
		add_image_size( 'bgtk-card', 640, 400, true );
		add_image_size( 'bgtk-thumbnail', 320, 200, true );

		// Register navigation menus.
		register_nav_menus( array(
			'primary' => __( 'Primary Navigation', 'bgtk-ntt' ),
			'footer'  => __( 'Footer Links', 'bgtk-ntt' ),
		) );

		// HTML5 support.
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		) );

		// Custom logo support.
		add_theme_support( 'custom-logo', array(
			'height'      => 80,
			'width'       => 300,
			'flex-width'  => true,
			'flex-height' => true,
		) );

		// Selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		// Block editor / Gutenberg support.
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'editor-styles' );
		add_editor_style( 'assets/css/theme.css' );

		// Wide / Full alignment.
		add_theme_support( 'align-wide' );

		// Post formats.
		add_theme_support( 'post-formats', array( 'aside', 'image', 'video', 'quote', 'link', 'gallery' ) );

		// Automatic feed links.
		add_theme_support( 'automatic-feed-links' );
	}
endif;
add_action( 'after_setup_theme', 'bgtk_ntt_setup' );

/* =========================================================
   2. Enqueue Scripts & Styles
   ========================================================= */
function bgtk_ntt_scripts() {
	// Google Fonts — Inter + Montserrat.
	$google_fonts_url = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&family=Red+Hat+Display:wght@400;500;600;700&display=swap';
	wp_enqueue_style( 'bgtk-ntt-google-fonts', $google_fonts_url, array(), null );

	// Theme stylesheet.
	wp_enqueue_style( 'bgtk-ntt-style', get_stylesheet_uri(), array( 'bgtk-ntt-google-fonts' ), '1.0.0' );

	// Modular theme CSS.
	wp_enqueue_style( 'bgtk-ntt-theme', get_template_directory_uri() . '/assets/css/theme.css', array( 'bgtk-ntt-style' ), '1.0.0' );

	// Navigation JS.
	wp_enqueue_script( 'bgtk-ntt-navigation', get_template_directory_uri() . '/assets/js/navigation.js', array(), '1.0.0', true );

	// Dark mode JS.
	wp_enqueue_script( 'bgtk-ntt-dark-mode', get_template_directory_uri() . '/assets/js/dark-mode.js', array(), '1.0.0', true );

	// Comment reply script.
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'bgtk_ntt_scripts' );

/* =========================================================
   3. Widget Areas (Sidebars)
   ========================================================= */
function bgtk_ntt_widgets_init() {
	// Main sidebar.
	register_sidebar( array(
		'name'          => __( 'Main Sidebar', 'bgtk-ntt' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Add widgets here to appear in the sidebar.', 'bgtk-ntt' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );

	// Footer widget area 1.
	register_sidebar( array(
		'name'          => __( 'Footer 1', 'bgtk-ntt' ),
		'id'            => 'footer-1',
		'description'   => __( 'Footer contact info area.', 'bgtk-ntt' ),
		'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="footer-widget-title">',
		'after_title'   => '</h4>',
	) );

	// Footer widget area 2.
	register_sidebar( array(
		'name'          => __( 'Footer 2', 'bgtk-ntt' ),
		'id'            => 'footer-2',
		'description'   => __( 'Footer tag cloud area.', 'bgtk-ntt' ),
		'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="footer-widget-title">',
		'after_title'   => '</h4>',
	) );

	// Footer widget area 3.
	register_sidebar( array(
		'name'          => __( 'Footer 3', 'bgtk-ntt' ),
		'id'            => 'footer-3',
		'description'   => __( 'Footer related links area.', 'bgtk-ntt' ),
		'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h4 class="footer-widget-title">',
		'after_title'   => '</h4>',
	) );
}
add_action( 'widgets_init', 'bgtk_ntt_widgets_init' );

/* =========================================================
   4. Custom Nav Walker
   ========================================================= */
require get_template_directory() . '/inc/nav-walker.php';

/* =========================================================
   5. Customizer
   ========================================================= */
require get_template_directory() . '/inc/customizer.php';

/* =========================================================
   6. Customizer Live Preview
   ========================================================= */
function bgtk_ntt_customize_preview_js() {
	wp_enqueue_script(
		'bgtk-ntt-customizer-preview',
		get_template_directory_uri() . '/inc/customizer-preview.js',
		array( 'customize-preview', 'jquery' ),
		'1.0.0',
		true
	);
}
add_action( 'customize_preview_init', 'bgtk_ntt_customize_preview_js' );

/* =========================================================
   7. Output Customizer CSS inline
   ========================================================= */
function bgtk_ntt_customizer_css() {
	$primary_color     = get_theme_mod( 'primary_color', '#297bbf' );
	$bg_color          = get_theme_mod( 'background_color_custom', '#ffffff' );
	$text_color        = get_theme_mod( 'text_color', '#1c1c22' );
	$header_bg         = get_theme_mod( 'header_bg_color', 'rgba(245,245,247,0.85)' );
	$footer_bg         = get_theme_mod( 'footer_bg_color', '#297bbf' );
	$footer_text       = get_theme_mod( 'footer_text_color', '#ffffff' );
	?>
	<style id="bgtk-ntt-customizer-css">
		:root {
			--primary: <?php echo esc_attr( $primary_color ); ?>;
			--background: <?php echo esc_attr( $bg_color ); ?>;
			--foreground: <?php echo esc_attr( $text_color ); ?>;
		}
		.site-header {
			background-color: <?php echo esc_attr( $header_bg ); ?>;
		}
		.site-footer {
			background-color: <?php echo esc_attr( $footer_bg ); ?>;
			color: <?php echo esc_attr( $footer_text ); ?>;
		}
	</style>
	<?php
}
add_action( 'wp_head', 'bgtk_ntt_customizer_css' );

/* =========================================================
   8. Body Classes
   ========================================================= */
function bgtk_ntt_body_classes( $classes ) {
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}
	return $classes;
}
add_filter( 'body_class', 'bgtk_ntt_body_classes' );

/* =========================================================
   9. Excerpt Length
   ========================================================= */
function bgtk_ntt_excerpt_length( $length ) {
	return 30;
}
add_filter( 'excerpt_length', 'bgtk_ntt_excerpt_length', 999 );

function bgtk_ntt_excerpt_more( $more ) {
	return '&hellip;';
}
add_filter( 'excerpt_more', 'bgtk_ntt_excerpt_more' );

/* =========================================================
   11. Fallback Menu
   ========================================================= */
/**
 * Fallback menu callback when no menu is assigned to a location.
 */
function bgtk_ntt_fallback_menu() {
	echo '<ul class="nav-menu"><li><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'bgtk-ntt' ) . '</a></li></ul>';
}

function bgtk_ntt_register_post_types() {
	// Program Prioritas CPT.
	register_post_type( 'program', array(
		'labels'       => array(
			'name'          => __( 'Program Prioritas', 'bgtk-ntt' ),
			'singular_name' => __( 'Program', 'bgtk-ntt' ),
			'add_new_item'  => __( 'Add New Program', 'bgtk-ntt' ),
			'edit_item'     => __( 'Edit Program', 'bgtk-ntt' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'show_in_rest' => true,
		'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
		'menu_icon'    => 'dashicons-star-filled',
		'rewrite'      => array( 'slug' => 'program' ),
	) );

	// Dokumen CPT.
	register_post_type( 'dokumen', array(
		'labels'       => array(
			'name'          => __( 'Dokumen', 'bgtk-ntt' ),
			'singular_name' => __( 'Dokumen', 'bgtk-ntt' ),
			'add_new_item'  => __( 'Add New Dokumen', 'bgtk-ntt' ),
			'edit_item'     => __( 'Edit Dokumen', 'bgtk-ntt' ),
		),
		'public'       => true,
		'has_archive'  => true,
		'show_in_rest' => true,
		'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
		'menu_icon'    => 'dashicons-media-document',
		'rewrite'      => array( 'slug' => 'dokumen' ),
	) );
}
add_action( 'init', 'bgtk_ntt_register_post_types' );
