<?php
/**
 * BGTK NTT Theme Customizer Controls
 *
 * @package bgtk-ntt
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register all Customizer settings and controls.
 *
 * @param WP_Customize_Manager $wp_customize Customizer object.
 */
function bgtk_ntt_customize_register( WP_Customize_Manager $wp_customize ) {

	/* -------------------------------------------------------
	   Panel: BGTK NTT Theme Options
	   ------------------------------------------------------- */
	$wp_customize->add_panel( 'bgtk_ntt_options', array(
		'title'       => __( 'BGTK NTT Theme Options', 'bgtk-ntt' ),
		'description' => __( 'Customize the BGTK NTT theme settings.', 'bgtk-ntt' ),
		'priority'    => 130,
	) );

	/* =======================================================
	   SECTION: Colors
	   ======================================================= */
	$wp_customize->add_section( 'bgtk_ntt_colors', array(
		'title'    => __( 'Colors', 'bgtk-ntt' ),
		'panel'    => 'bgtk_ntt_options',
		'priority' => 10,
	) );

	// Primary Color.
	$wp_customize->add_setting( 'primary_color', array(
		'default'           => '#297bbf',
		'sanitize_callback' => 'sanitize_hex_color',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'primary_color', array(
		'label'   => __( 'Primary Color', 'bgtk-ntt' ),
		'section' => 'bgtk_ntt_colors',
	) ) );

	// Background Color (custom — separate from default WP bg).
	$wp_customize->add_setting( 'background_color_custom', array(
		'default'           => '#ffffff',
		'sanitize_callback' => 'sanitize_hex_color',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'background_color_custom', array(
		'label'   => __( 'Background Color', 'bgtk-ntt' ),
		'section' => 'bgtk_ntt_colors',
	) ) );

	// Text Color.
	$wp_customize->add_setting( 'text_color', array(
		'default'           => '#1c1c22',
		'sanitize_callback' => 'sanitize_hex_color',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'text_color', array(
		'label'   => __( 'Text Color', 'bgtk-ntt' ),
		'section' => 'bgtk_ntt_colors',
	) ) );

	/* =======================================================
	   SECTION: Typography
	   ======================================================= */
	$wp_customize->add_section( 'bgtk_ntt_typography', array(
		'title'    => __( 'Typography', 'bgtk-ntt' ),
		'panel'    => 'bgtk_ntt_options',
		'priority' => 20,
	) );

	// Heading Font.
	$wp_customize->add_setting( 'heading_font', array(
		'default'           => 'Montserrat',
		'sanitize_callback' => 'bgtk_ntt_sanitize_select',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( 'heading_font', array(
		'label'   => __( 'Heading Font', 'bgtk-ntt' ),
		'section' => 'bgtk_ntt_typography',
		'type'    => 'select',
		'choices' => array(
			'Inter'          => 'Inter',
			'Montserrat'     => 'Montserrat',
			'Geist'          => 'Geist',
			'Red Hat Display'=> 'Red Hat Display',
		),
	) );

	// Body Font.
	$wp_customize->add_setting( 'body_font', array(
		'default'           => 'Inter',
		'sanitize_callback' => 'bgtk_ntt_sanitize_select',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( 'body_font', array(
		'label'   => __( 'Body Font', 'bgtk-ntt' ),
		'section' => 'bgtk_ntt_typography',
		'type'    => 'select',
		'choices' => array(
			'Inter'          => 'Inter',
			'Montserrat'     => 'Montserrat',
			'Geist'          => 'Geist',
			'Red Hat Display'=> 'Red Hat Display',
		),
	) );

	/* =======================================================
	   SECTION: Header
	   ======================================================= */
	$wp_customize->add_section( 'bgtk_ntt_header', array(
		'title'    => __( 'Header', 'bgtk-ntt' ),
		'panel'    => 'bgtk_ntt_options',
		'priority' => 30,
	) );

	// Sticky Header toggle.
	$wp_customize->add_setting( 'sticky_header', array(
		'default'           => true,
		'sanitize_callback' => 'bgtk_ntt_sanitize_checkbox',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( 'sticky_header', array(
		'label'   => __( 'Enable Sticky Header', 'bgtk-ntt' ),
		'section' => 'bgtk_ntt_header',
		'type'    => 'checkbox',
	) );

	// Header Background Color.
	$wp_customize->add_setting( 'header_bg_color', array(
		'default'           => 'rgba(245,245,247,0.85)',
		'sanitize_callback' => 'sanitize_text_field',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( 'header_bg_color', array(
		'label'   => __( 'Header Background Color', 'bgtk-ntt' ),
		'section' => 'bgtk_ntt_header',
		'type'    => 'text',
	) );

	/* =======================================================
	   SECTION: Footer
	   ======================================================= */
	$wp_customize->add_section( 'bgtk_ntt_footer', array(
		'title'    => __( 'Footer', 'bgtk-ntt' ),
		'panel'    => 'bgtk_ntt_options',
		'priority' => 40,
	) );

	// Footer Background.
	$wp_customize->add_setting( 'footer_bg_color', array(
		'default'           => '#297bbf',
		'sanitize_callback' => 'sanitize_hex_color',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'footer_bg_color', array(
		'label'   => __( 'Footer Background Color', 'bgtk-ntt' ),
		'section' => 'bgtk_ntt_footer',
	) ) );

	// Footer Text Color.
	$wp_customize->add_setting( 'footer_text_color', array(
		'default'           => '#ffffff',
		'sanitize_callback' => 'sanitize_hex_color',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'footer_text_color', array(
		'label'   => __( 'Footer Text Color', 'bgtk-ntt' ),
		'section' => 'bgtk_ntt_footer',
	) ) );

	// Show Social Icons.
	$wp_customize->add_setting( 'footer_show_social', array(
		'default'           => true,
		'sanitize_callback' => 'bgtk_ntt_sanitize_checkbox',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( 'footer_show_social', array(
		'label'   => __( 'Show Social Media Icons', 'bgtk-ntt' ),
		'section' => 'bgtk_ntt_footer',
		'type'    => 'checkbox',
	) );

	// Footer copyright text.
	$wp_customize->add_setting( 'footer_copyright', array(
		'default'           => __( '© {year} BGTK NTT. All rights reserved.', 'bgtk-ntt' ),
		'sanitize_callback' => 'wp_kses_post',
		'transport'         => 'postMessage',
	) );
	$wp_customize->add_control( 'footer_copyright', array(
		'label'   => __( 'Copyright Text', 'bgtk-ntt' ),
		'section' => 'bgtk_ntt_footer',
		'type'    => 'textarea',
	) );

	/* =======================================================
	   SECTION: Social Media URLs
	   ======================================================= */
	$wp_customize->add_section( 'bgtk_ntt_social', array(
		'title'    => __( 'Social Media', 'bgtk-ntt' ),
		'panel'    => 'bgtk_ntt_options',
		'priority' => 50,
	) );

	$social_defaults = array(
		'social_facebook'  => 'https://www.facebook.com/balaigurupenggerakntt/',
		'social_twitter'   => 'https://x.com/BGTK_NTT',
		'social_instagram' => 'https://www.instagram.com/bgtkntt/',
		'social_tiktok'    => 'https://www.tiktok.com/@bgtkntt',
		'social_youtube'   => 'https://www.youtube.com/@bgtkntt/',
	);
	$social_labels = array(
		'social_facebook'  => __( 'Facebook URL', 'bgtk-ntt' ),
		'social_twitter'   => __( 'Twitter / X URL', 'bgtk-ntt' ),
		'social_instagram' => __( 'Instagram URL', 'bgtk-ntt' ),
		'social_tiktok'    => __( 'TikTok URL', 'bgtk-ntt' ),
		'social_youtube'   => __( 'YouTube URL', 'bgtk-ntt' ),
	);

	foreach ( $social_defaults as $key => $default ) {
		$wp_customize->add_setting( $key, array(
			'default'           => $default,
			'sanitize_callback' => 'esc_url_raw',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( $key, array(
			'label'   => $social_labels[ $key ],
			'section' => 'bgtk_ntt_social',
			'type'    => 'url',
		) );
	}

	/* =======================================================
	   SECTION: Homepage Settings
	   ======================================================= */
	$wp_customize->add_section( 'bgtk_ntt_homepage', array(
		'title'    => __( 'Homepage Settings', 'bgtk-ntt' ),
		'panel'    => 'bgtk_ntt_options',
		'priority' => 60,
	) );

	$homepage_toggles = array(
		'show_hero_carousel' => __( 'Show Hero Carousel', 'bgtk-ntt' ),
		'show_sambutan'      => __( 'Show Sambutan Section', 'bgtk-ntt' ),
		'show_program'       => __( 'Show Program Prioritas Section', 'bgtk-ntt' ),
		'show_news'          => __( 'Show Berita Terkini Section', 'bgtk-ntt' ),
	);

	foreach ( $homepage_toggles as $key => $label ) {
		$wp_customize->add_setting( $key, array(
			'default'           => true,
			'sanitize_callback' => 'bgtk_ntt_sanitize_checkbox',
			'transport'         => 'postMessage',
		) );
		$wp_customize->add_control( $key, array(
			'label'   => $label,
			'section' => 'bgtk_ntt_homepage',
			'type'    => 'checkbox',
		) );
	}

	/* =======================================================
	   SECTION: Site Identity (extend existing)
	   ======================================================= */
	// Tagline and logo are in the built-in 'title_tagline' section.
	// We just ensure transport is postMessage.
	$wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
}
add_action( 'customize_register', 'bgtk_ntt_customize_register' );

/* =========================================================
   Sanitization Helpers
   ========================================================= */
function bgtk_ntt_sanitize_checkbox( $value ) {
	return (bool) $value;
}

function bgtk_ntt_sanitize_select( $input, $setting ) {
	$choices = $setting->manager->get_control( $setting->id )->choices;
	return array_key_exists( $input, $choices ) ? $input : $setting->default;
}
