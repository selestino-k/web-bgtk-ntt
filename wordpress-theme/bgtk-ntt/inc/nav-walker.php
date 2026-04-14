<?php
/**
 * BGTK NTT Custom Nav Walker
 *
 * Renders navigation menus with accessible dropdown support.
 *
 * @package bgtk-ntt
 */

defined( 'ABSPATH' ) || exit;

/**
 * Custom walker class for the primary navigation menu.
 */
class BGTK_NTT_Nav_Walker extends Walker_Nav_Menu {

	/**
	 * Start the element output — add dropdown trigger for top-level items with children.
	 *
	 * @param string   $output Passed by reference.
	 * @param WP_Post  $item   Menu item data object.
	 * @param int      $depth  Depth of menu item.
	 * @param stdClass $args   An object of wp_nav_menu() arguments.
	 * @param int      $id     Current item/element ID.
	 */
	public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

		$classes   = empty( $item->classes ) ? array() : (array) $item->classes;
		$classes[] = 'menu-item-' . $item->ID;

		// Mark items that have children.
		$has_children = in_array( 'menu-item-has-children', $classes, true );

		if ( $has_children && 0 === $depth ) {
			$classes[] = 'has-dropdown';
		}

		$class_names = implode( ' ', array_filter( apply_filters( 'nav_menu_css_class', array_unique( $classes ), $item, $args, $depth ) ) );
		$class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

		$id_attr = apply_filters( 'nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth );
		$id_attr = $id_attr ? ' id="' . esc_attr( $id_attr ) . '"' : '';

		$output .= $indent . '<li' . $id_attr . $class_names . '>';

		$atts           = array();
		$atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
		$atts['target'] = ! empty( $item->target ) ? $item->target : '';
		if ( '_blank' === $item->target && empty( $item->xfn ) ) {
			$atts['rel'] = 'noopener noreferrer';
		} else {
			$atts['rel'] = $item->xfn;
		}
		$atts['href']         = ! empty( $item->url ) ? $item->url : '';
		$atts['aria-current'] = $item->current ? 'page' : '';

		if ( $has_children && 0 === $depth ) {
			$atts['aria-haspopup'] = 'true';
			$atts['aria-expanded'] = 'false';
			$atts['class']         = 'nav-link nav-dropdown-toggle';
		} elseif ( 0 === $depth ) {
			$atts['class'] = 'nav-link';
		} else {
			$atts['class'] = 'dropdown-item';
		}

		$atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

		$attributes = '';
		foreach ( $atts as $attr => $value ) {
			if ( is_scalar( $value ) && '' !== $value && false !== $value ) {
				$value       = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
				$attributes .= ' ' . $attr . '="' . $value . '"';
			}
		}

		$title = apply_filters( 'the_title', $item->title, $item->ID );
		$title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );

		$item_output  = isset( $args->before ) ? $args->before : '';
		$item_output .= '<a' . $attributes . '>';
		$item_output .= ( isset( $args->link_before ) ? $args->link_before : '' ) . $title . ( isset( $args->link_after ) ? $args->link_after : '' );

		// Append dropdown chevron for parent items.
		if ( $has_children && 0 === $depth ) {
			$item_output .= '<span class="dropdown-chevron" aria-hidden="true">&#9660;</span>';
		}

		$item_output .= '</a>';
		$item_output .= isset( $args->after ) ? $args->after : '';

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}

	/**
	 * Start the sub-menu list element.
	 */
	public function start_lvl( &$output, $depth = 0, $args = null ) {
		$indent  = str_repeat( "\t", $depth );
		$class   = 0 === $depth ? 'dropdown-menu' : 'dropdown-submenu';
		$output .= "\n$indent<ul class=\"$class\" role=\"menu\">\n";
	}

	/**
	 * End the sub-menu list element.
	 */
	public function end_lvl( &$output, $depth = 0, $args = null ) {
		$indent  = str_repeat( "\t", $depth );
		$output .= "$indent</ul>\n";
	}
}
