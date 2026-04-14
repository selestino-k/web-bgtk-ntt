/**
 * BGTK NTT Customizer Live Preview
 *
 * Handles real-time postMessage updates in the Customizer preview.
 *
 * @package bgtk-ntt
 */
( function ( $, wp ) {
	'use strict';

	/**
	 * Helper: set a CSS variable on :root
	 */
	function setCSSVar( varName, value ) {
		document.documentElement.style.setProperty( varName, value );
	}

	/* -------------------------------------------------------
	   Colors
	   ------------------------------------------------------- */
	wp.customize( 'primary_color', function ( value ) {
		value.bind( function ( newVal ) {
			setCSSVar( '--primary', newVal );
			// Update all elements using primary color.
			$( '.site-header .nav-menu a, .site-footer .footer-title' )
				.css( 'color', newVal );
		} );
	} );

	wp.customize( 'background_color_custom', function ( value ) {
		value.bind( function ( newVal ) {
			setCSSVar( '--background', newVal );
			$( 'body' ).css( 'background-color', newVal );
		} );
	} );

	wp.customize( 'text_color', function ( value ) {
		value.bind( function ( newVal ) {
			setCSSVar( '--foreground', newVal );
			$( 'body' ).css( 'color', newVal );
		} );
	} );

	/* -------------------------------------------------------
	   Typography
	   ------------------------------------------------------- */
	wp.customize( 'heading_font', function ( value ) {
		value.bind( function ( newVal ) {
			setCSSVar( '--font-heading', "'" + newVal + "', sans-serif" );
			$( 'h1, h2, h3, h4, h5, h6, .font-heading' )
				.css( 'font-family', "'" + newVal + "', sans-serif" );
		} );
	} );

	wp.customize( 'body_font', function ( value ) {
		value.bind( function ( newVal ) {
			setCSSVar( '--font-body', "'" + newVal + "', sans-serif" );
			$( 'body' ).css( 'font-family', "'" + newVal + "', sans-serif" );
		} );
	} );

	/* -------------------------------------------------------
	   Header
	   ------------------------------------------------------- */
	wp.customize( 'header_bg_color', function ( value ) {
		value.bind( function ( newVal ) {
			$( '.site-header' ).css( 'background-color', newVal );
		} );
	} );

	wp.customize( 'sticky_header', function ( value ) {
		value.bind( function ( newVal ) {
			$( '.site-header' ).toggleClass( 'is-sticky', newVal );
		} );
	} );

	/* -------------------------------------------------------
	   Footer
	   ------------------------------------------------------- */
	wp.customize( 'footer_bg_color', function ( value ) {
		value.bind( function ( newVal ) {
			$( '.site-footer' ).css( 'background-color', newVal );
		} );
	} );

	wp.customize( 'footer_text_color', function ( value ) {
		value.bind( function ( newVal ) {
			$( '.site-footer, .site-footer a' ).css( 'color', newVal );
		} );
	} );

	wp.customize( 'footer_show_social', function ( value ) {
		value.bind( function ( newVal ) {
			$( '.footer-social' ).toggle( newVal );
		} );
	} );

	wp.customize( 'footer_copyright', function ( value ) {
		value.bind( function ( newVal ) {
			var text = newVal.replace( '{year}', new Date().getFullYear() );
			$( '.footer-copyright-text' ).html( text );
		} );
	} );

	/* -------------------------------------------------------
	   Site Identity
	   ------------------------------------------------------- */
	wp.customize( 'blogname', function ( value ) {
		value.bind( function ( newVal ) {
			$( '.site-title a' ).text( newVal );
		} );
	} );

	wp.customize( 'blogdescription', function ( value ) {
		value.bind( function ( newVal ) {
			$( '.site-description' ).text( newVal );
		} );
	} );

	/* -------------------------------------------------------
	   Homepage Toggles
	   ------------------------------------------------------- */
	wp.customize( 'show_hero_carousel', function ( value ) {
		value.bind( function ( newVal ) {
			$( '.section-hero' ).toggle( newVal );
		} );
	} );

	wp.customize( 'show_sambutan', function ( value ) {
		value.bind( function ( newVal ) {
			$( '.section-sambutan' ).toggle( newVal );
		} );
	} );

	wp.customize( 'show_program', function ( value ) {
		value.bind( function ( newVal ) {
			$( '.section-program' ).toggle( newVal );
		} );
	} );

	wp.customize( 'show_news', function ( value ) {
		value.bind( function ( newVal ) {
			$( '.section-news' ).toggle( newVal );
		} );
	} );

} )( jQuery, wp );
