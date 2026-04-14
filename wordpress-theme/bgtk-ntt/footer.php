<?php
/**
 * Footer Template
 *
 * @package bgtk-ntt
 */
?>
</div><!-- #main-content .site-content -->

<footer id="colophon" class="site-footer" role="contentinfo">
	<div class="footer-inner container">

		<div class="footer-columns">

			<!-- Column 1: Hubungi Kami -->
			<div class="footer-col footer-col--contact">
				<h2 class="footer-title"><?php esc_html_e( 'Hubungi Kami', 'bgtk-ntt' ); ?></h2>
				<div class="footer-contact-info">
					<div class="footer-contact-item">
						<span class="footer-icon" aria-hidden="true">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
						</span>
						<a
							href="https://maps.app.goo.gl/fR76vqUh6ESDNZ8Z6"
							target="_blank"
							rel="noopener noreferrer"
							class="footer-link"
						>
							Jl. Perintis Kemerdekaan I, Kayu Putih<br>
							Kec. Oebobo, Kota Kupang, Nusa Tenggara Timur
						</a>
					</div>
					<div class="footer-contact-item">
						<span class="footer-icon" aria-hidden="true">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
						</span>
						<span>bgtkntt@kemendikdasmen.go.id</span>
					</div>
					<!-- Dark mode toggle (desktop) -->
					<div class="footer-dark-toggle desktop-only" style="margin-top:2.5rem;">
						<button
							id="footer-dark-mode-toggle"
							class="dark-mode-toggle"
							aria-label="<?php esc_attr_e( 'Toggle dark mode', 'bgtk-ntt' ); ?>"
						>
							<span class="icon-sun" aria-hidden="true">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
							</span>
							<span class="icon-moon" aria-hidden="true">
								<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
							</span>
						</button>
					</div>
				</div>
			</div>

			<!-- Column 2: Tag Berita -->
			<div class="footer-col footer-col--tags">
				<h3 class="footer-title"><?php esc_html_e( 'Tag Berita', 'bgtk-ntt' ); ?></h3>
				<div class="footer-tags">
					<?php
					wp_tag_cloud( array(
						'smallest'   => 11,
						'largest'    => 14,
						'unit'       => 'px',
						'number'     => 20,
						'format'     => 'flat',
						'separator'  => '',
						'orderby'    => 'name',
						'order'      => 'ASC',
						'show_count' => false,
						'echo'       => true,
					) );
					?>
				</div>
			</div>

			<!-- Column 3: Tautan Terkait -->
			<div class="footer-col footer-col--links">
				<h3 class="footer-title"><?php esc_html_e( 'Tautan Terkait', 'bgtk-ntt' ); ?></h3>
				<ul class="footer-related-links">
					<li><a href="https://ijazah.data.kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" class="footer-link"><?php esc_html_e( 'Portal data Induk Ijazah', 'bgtk-ntt' ); ?></a></li>
					<li><a href="https://pisn.kemdiktisaintek.go.id/" target="_blank" rel="noopener noreferrer" class="footer-link"><?php esc_html_e( 'Penomoran Ijazah dan Sertifikat Nasional (PISN)', 'bgtk-ntt' ); ?></a></li>
					<li><a href="https://pddikti.kemdiktisaintek.go.id/" target="_blank" rel="noopener noreferrer" class="footer-link"><?php esc_html_e( 'Pangkalan Data Pendidikan Tinggi (PDDikti)', 'bgtk-ntt' ); ?></a></li>
					<li><a href="https://kemdiktisaintek.go.id/" target="_blank" rel="noopener noreferrer" class="footer-link"><?php esc_html_e( 'Kemendiktisaintek', 'bgtk-ntt' ); ?></a></li>
					<li><a href="https://kemendikdasmen.go.id/" target="_blank" rel="noopener noreferrer" class="footer-link"><?php esc_html_e( 'Kemendikdasmen', 'bgtk-ntt' ); ?></a></li>
					<li><a href="https://sapto.banpt.or.id/" target="_blank" rel="noopener noreferrer" class="footer-link"><?php esc_html_e( 'Sistem Akreditasi Perguruan Tinggi Online', 'bgtk-ntt' ); ?></a></li>
					<li><a href="https://sinta.kemdiktisaintek.go.id/" target="_blank" rel="noopener noreferrer" class="footer-link"><?php esc_html_e( 'Sinta (Science and Technology Index)', 'bgtk-ntt' ); ?></a></li>
				</ul>
			</div>

		</div><!-- .footer-columns -->

		<!-- Footer bottom bar -->
		<div class="footer-bottom">
			<p class="footer-copyright">
				<span class="footer-copyright-text">
					<?php
					$copyright = get_theme_mod( 'footer_copyright', '© {year} BGTK NTT. All rights reserved.' );
					echo wp_kses_post( str_replace( '{year}', esc_html( gmdate( 'Y' ) ), $copyright ) );
					?>
				</span>
			</p>

			<?php if ( get_theme_mod( 'footer_show_social', true ) ) : ?>
			<div class="footer-social" aria-label="<?php esc_attr_e( 'Social Media Links', 'bgtk-ntt' ); ?>">

				<?php $fb_url = get_theme_mod( 'social_facebook', 'https://www.facebook.com/balaigurupenggerakntt/' ); ?>
				<?php if ( $fb_url ) : ?>
				<a href="<?php echo esc_url( $fb_url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'Facebook', 'bgtk-ntt' ); ?>" class="social-link">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
				</a>
				<?php endif; ?>

				<?php $tw_url = get_theme_mod( 'social_twitter', 'https://x.com/BGTK_NTT' ); ?>
				<?php if ( $tw_url ) : ?>
				<a href="<?php echo esc_url( $tw_url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'Twitter / X', 'bgtk-ntt' ); ?>" class="social-link">
					<!-- X / Twitter logo -->
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
				</a>
				<?php endif; ?>

				<?php $ig_url = get_theme_mod( 'social_instagram', 'https://www.instagram.com/bgtkntt/' ); ?>
				<?php if ( $ig_url ) : ?>
				<a href="<?php echo esc_url( $ig_url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'Instagram', 'bgtk-ntt' ); ?>" class="social-link">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
				</a>
				<?php endif; ?>

				<?php $tt_url = get_theme_mod( 'social_tiktok', 'https://www.tiktok.com/@bgtkntt' ); ?>
				<?php if ( $tt_url ) : ?>
				<a href="<?php echo esc_url( $tt_url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'TikTok', 'bgtk-ntt' ); ?>" class="social-link">
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.69a4.85 4.85 0 0 1-1.01-.0z"/></svg>
				</a>
				<?php endif; ?>

				<?php $yt_url = get_theme_mod( 'social_youtube', 'https://www.youtube.com/@bgtkntt/' ); ?>
				<?php if ( $yt_url ) : ?>
				<a href="<?php echo esc_url( $yt_url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'YouTube', 'bgtk-ntt' ); ?>" class="social-link">
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.34z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
				</a>
				<?php endif; ?>

			</div><!-- .footer-social -->
			<?php endif; ?>

		</div><!-- .footer-bottom -->

	</div><!-- .footer-inner -->
</footer><!-- #colophon -->

<?php wp_footer(); ?>
</body>
</html>
