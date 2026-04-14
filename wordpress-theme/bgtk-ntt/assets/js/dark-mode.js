/**
 * BGTK NTT Dark Mode Toggle
 *
 * - Toggle dark/light mode by adding/removing `.dark` class on <html>
 * - Persist preference in localStorage
 * - Respect `prefers-color-scheme` on first load
 *
 * @package bgtk-ntt
 */

( function () {
	'use strict';

	var STORAGE_KEY = 'bgtk-ntt-color-scheme';
	var CLASS_DARK  = 'dark';

	/* -------------------------------------------------------
	   Determine initial preference
	   ------------------------------------------------------- */
	function getInitialTheme() {
		var stored = null;

		try {
			stored = localStorage.getItem( STORAGE_KEY );
		} catch ( e ) {
			// localStorage might be unavailable (private mode, permissions).
		}

		if ( stored === 'dark' ) { return 'dark'; }
		if ( stored === 'light' ) { return 'light'; }

		// Fall back to OS preference.
		if ( window.matchMedia && window.matchMedia( '(prefers-color-scheme: dark)' ).matches ) {
			return 'dark';
		}

		return 'light';
	}

	/* -------------------------------------------------------
	   Apply theme to <html>
	   ------------------------------------------------------- */
	function applyTheme( theme ) {
		if ( theme === 'dark' ) {
			document.documentElement.classList.add( CLASS_DARK );
		} else {
			document.documentElement.classList.remove( CLASS_DARK );
		}
	}

	/* -------------------------------------------------------
	   Persist preference
	   ------------------------------------------------------- */
	function saveTheme( theme ) {
		try {
			localStorage.setItem( STORAGE_KEY, theme );
		} catch ( e ) {
			// Silently fail if storage is unavailable.
		}
	}

	/* -------------------------------------------------------
	   Toggle handler
	   ------------------------------------------------------- */
	function toggleTheme() {
		var isDark = document.documentElement.classList.contains( CLASS_DARK );
		var nextTheme = isDark ? 'light' : 'dark';
		applyTheme( nextTheme );
		saveTheme( nextTheme );
		updateToggleLabels( nextTheme );
	}

	/* -------------------------------------------------------
	   Update aria-labels on all toggle buttons
	   ------------------------------------------------------- */
	function updateToggleLabels( theme ) {
		var toggles = document.querySelectorAll( '.dark-mode-toggle' );
		toggles.forEach( function ( btn ) {
			btn.setAttribute(
				'aria-label',
				theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'
			);
			btn.setAttribute(
				'title',
				theme === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'
			);
		} );
	}

	/* -------------------------------------------------------
	   Bind toggle buttons
	   ------------------------------------------------------- */
	function bindToggles() {
		document.addEventListener( 'click', function ( e ) {
			var btn = e.target.closest( '.dark-mode-toggle' );
			if ( btn ) {
				e.preventDefault();
				toggleTheme();
			}
		} );
	}

	/* -------------------------------------------------------
	   Watch OS preference changes
	   ------------------------------------------------------- */
	function watchOsPreference() {
		if ( ! window.matchMedia ) { return; }

		var mq = window.matchMedia( '(prefers-color-scheme: dark)' );

		mq.addEventListener( 'change', function ( e ) {
			// Only react if the user has not set a manual preference.
			var stored = null;
			try { stored = localStorage.getItem( STORAGE_KEY ); } catch ( err ) {}

			if ( ! stored ) {
				var theme = e.matches ? 'dark' : 'light';
				applyTheme( theme );
				updateToggleLabels( theme );
			}
		} );
	}

	/* -------------------------------------------------------
	   Initialize
	   ------------------------------------------------------- */
	function init() {
		var theme = getInitialTheme();
		applyTheme( theme );
		updateToggleLabels( theme );
		bindToggles();
		watchOsPreference();
	}

	// Apply theme immediately to avoid FOUC (before DOMContentLoaded).
	( function () {
		var theme = getInitialTheme();
		applyTheme( theme );
	} )();

	// Full init after DOM is ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

} )();
