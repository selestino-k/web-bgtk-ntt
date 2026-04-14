/**
 * BGTK NTT Navigation JavaScript
 *
 * - Mobile hamburger menu toggle
 * - Dropdown menu open/close on click (touch-friendly)
 * - Keyboard accessibility (Enter/Space to open, Escape to close)
 *
 * @package bgtk-ntt
 */

( function () {
	'use strict';

	/**
	 * Initialize navigation when DOM is ready.
	 */
	function init() {
		initMobileToggle();
		initDropdowns();
		initOutsideClickClose();
	}

	/* -------------------------------------------------------
	   Mobile Hamburger Toggle
	   ------------------------------------------------------- */
	function initMobileToggle() {
		var toggle = document.getElementById( 'mobile-menu-toggle' );
		var mobileMenu = document.getElementById( 'mobile-menu' );

		if ( ! toggle || ! mobileMenu ) {
			return;
		}

		toggle.addEventListener( 'click', function () {
			var isExpanded = toggle.getAttribute( 'aria-expanded' ) === 'true';
			toggle.setAttribute( 'aria-expanded', String( ! isExpanded ) );

			if ( isExpanded ) {
				mobileMenu.setAttribute( 'hidden', '' );
				mobileMenu.classList.remove( 'is-open' );
			} else {
				mobileMenu.removeAttribute( 'hidden' );
				mobileMenu.classList.add( 'is-open' );
			}
		} );

		// Close menu on Escape key.
		document.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Escape' && mobileMenu.classList.contains( 'is-open' ) ) {
				toggle.setAttribute( 'aria-expanded', 'false' );
				mobileMenu.setAttribute( 'hidden', '' );
				mobileMenu.classList.remove( 'is-open' );
				toggle.focus();
			}
		} );
	}

	/* -------------------------------------------------------
	   Dropdown Menus (Desktop + Mobile)
	   ------------------------------------------------------- */
	function initDropdowns() {
		var dropdownToggles = document.querySelectorAll( '.nav-dropdown-toggle' );

		dropdownToggles.forEach( function ( toggle ) {
			var parentLi = toggle.closest( 'li' );
			var dropdown = parentLi ? parentLi.querySelector( '.dropdown-menu' ) : null;

			if ( ! dropdown ) {
				return;
			}

			// Click to toggle (for touch / keyboard users).
			toggle.addEventListener( 'click', function ( e ) {
				// Only intercept click on non-link toggles or when pointer is touch.
				var isOpen = dropdown.classList.contains( 'is-open' );

				// Close all other dropdowns.
				closeAllDropdowns( dropdown );

				if ( isOpen ) {
					closeDropdown( toggle, dropdown );
				} else {
					openDropdown( toggle, dropdown );
					// Prevent navigating to the href on first click (open dropdown instead).
					e.preventDefault();
				}
			} );

			// Keyboard: Enter or Space to open.
			toggle.addEventListener( 'keydown', function ( e ) {
				if ( e.key === 'Enter' || e.key === ' ' ) {
					e.preventDefault();
					var isOpen = dropdown.classList.contains( 'is-open' );
					closeAllDropdowns( dropdown );
					if ( isOpen ) {
						closeDropdown( toggle, dropdown );
					} else {
						openDropdown( toggle, dropdown );
					}
				}

				// Arrow down: focus first dropdown item.
				if ( e.key === 'ArrowDown' ) {
					e.preventDefault();
					var firstItem = dropdown.querySelector( '.dropdown-item' );
					if ( firstItem ) {
						openDropdown( toggle, dropdown );
						firstItem.focus();
					}
				}

				// Escape: close.
				if ( e.key === 'Escape' ) {
					closeDropdown( toggle, dropdown );
					toggle.focus();
				}
			} );

			// Keyboard within dropdown.
			dropdown.addEventListener( 'keydown', function ( e ) {
				var items = Array.from( dropdown.querySelectorAll( '.dropdown-item' ) );
				var focusedIndex = items.indexOf( document.activeElement );

				if ( e.key === 'ArrowDown' ) {
					e.preventDefault();
					var next = items[ focusedIndex + 1 ];
					if ( next ) { next.focus(); }
				}

				if ( e.key === 'ArrowUp' ) {
					e.preventDefault();
					if ( focusedIndex === 0 ) {
						toggle.focus();
					} else {
						var prev = items[ focusedIndex - 1 ];
						if ( prev ) { prev.focus(); }
					}
				}

				if ( e.key === 'Escape' ) {
					closeDropdown( toggle, dropdown );
					toggle.focus();
				}

				if ( e.key === 'Tab' ) {
					closeDropdown( toggle, dropdown );
				}
			} );
		} );
	}

	function openDropdown( toggle, dropdown ) {
		toggle.setAttribute( 'aria-expanded', 'true' );
		dropdown.classList.add( 'is-open' );
	}

	function closeDropdown( toggle, dropdown ) {
		toggle.setAttribute( 'aria-expanded', 'false' );
		dropdown.classList.remove( 'is-open' );
	}

	function closeAllDropdowns( except ) {
		var allDropdowns = document.querySelectorAll( '.dropdown-menu.is-open' );
		allDropdowns.forEach( function ( dd ) {
			if ( dd !== except ) {
				dd.classList.remove( 'is-open' );
				var parentToggle = dd.closest( 'li' ) ? dd.closest( 'li' ).querySelector( '.nav-dropdown-toggle' ) : null;
				if ( parentToggle ) {
					parentToggle.setAttribute( 'aria-expanded', 'false' );
				}
			}
		} );
	}

	/* -------------------------------------------------------
	   Close dropdowns when clicking outside
	   ------------------------------------------------------- */
	function initOutsideClickClose() {
		document.addEventListener( 'click', function ( e ) {
			var target = e.target;
			if ( ! target.closest( '.has-dropdown' ) ) {
				closeAllDropdowns( null );
			}
		} );
	}

	// Run on DOMContentLoaded.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

} )();
