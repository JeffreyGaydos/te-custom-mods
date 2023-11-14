<main style="display:block" id="tec_category_archive" role="main">

	<?php

	$archive_title    = '';
	$archive_subtitle = '';

	if ( ! is_home() ) {
		$archive_title    = get_the_archive_title();
		$archive_subtitle = get_the_archive_description();
	}

	if ( $archive_title || $archive_subtitle ) {
		?>

		<header class="archive-header has-text-align-center header-footer-group">

			<div class="archive-header-inner section-inner medium">

				<?php if ( $archive_title ) { ?>
					<h1 class="archive-title"><?php echo wp_kses_post( $archive_title ); ?></h1>
				<?php } ?>

				<?php if ( $archive_subtitle ) { ?>
					<div class="archive-subtitle section-inner thin max-percentage intro-text"><?php echo wp_kses_post( wpautop( $archive_subtitle ) ); ?></div>
				<?php } ?>

			</div><!-- .archive-header-inner -->

		</header><!-- .archive-header -->

		<?php
	}
	
	//excerpt 'continue reading' link------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	function twentytwentychild_excerpt_more_add_continue_reading( $more ) {
		return ' ... <div class="read-more-button-wrap"><a href="' . get_permalink( get_the_ID() ) . '" class="more-link"><span class="faux-button">Continue reading</span> <span class="screen-reader-text">“' . get_the_title( get_the_ID() ) . '"</span></a></div>';
	}
	add_filter('excerpt_more', 'twentytwentychild_excerpt_more_add_continue_reading' );
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	if ( have_posts() ) : 
		$i = 0;
		while ( have_posts() ) : the_post(); 
			$i++;
			if ( $i > 1 ) {
				echo '<hr class="post-separator styled-separator is-style-wide section-inner" aria-hidden="true" />';
			}
			the_title( '<h2 style="margin-left: 20%; margin-right: 20%;">', '</h2>' );
			?><div style="margin-left: 20%; margin-right: 20%"><?php
            the_excerpt();
            ?></div><?php
		endwhile; 
	else: 
		_e( 'Sorry, no posts matched your criteria.', 'textdomain' ); 
	endif; 
	?>

</main><!-- #site-content -->

<?php