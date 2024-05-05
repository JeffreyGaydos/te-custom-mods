<main style="display:block" id="tec_author_archive" role="main">

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
		$permalink = get_permalink(get_the_ID());
		$title = get_the_title(get_the_ID());
		return <<<HTML
			...
			</div>
			<div class="read-more-button-wrap">
				<a href={$permalink} class="more-link">
					<span class="faux-button">Continue reading</span>
					<span class="screen-reader-text">{$title}</span>
				</a>
			</div>
			HTML;
	}
	add_filter('excerpt_more', 'twentytwentychild_excerpt_more_add_continue_reading' );
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	$posts = new WP_Query(array(
		'posts_per_page' => get_option('posts_per_page'),
		'author_name' => get_queried_object()->slug,
		'paged' => get_query_var('paged') ? get_query_var('paged') : 1,
		'post_type' => 'post'
	));
	if ( $posts->have_posts() ) :
		$i = 0;
		while ( $posts->have_posts() ) : $posts->the_post();
			$i++;
			if ( $i > 1 ) {
				?> <hr class="post-separator styled-separator is-style-wide section-inner" aria-hidden="true" /> <?php
			}
			?>
			<h2 class="archive-text" style="margin-left: 20%; margin-right: 20%;">
				<?php the_title(); ?>
			</h2>
			<div class="archive-text" style="margin-left: 20%; margin-right: 20%">
				<div style="float: left; margin-right: 40px;">
					<?php
					the_post_thumbnail('thumbnail');
					?>
				</div>
				<div style="min-height: 145px">
					<?php
					the_excerpt();
					?>
			</div>
			<?php
		endwhile;
		if ( get_next_posts_link() || get_previous_posts_link() ) :
			?> <hr class="post-separator styled-separator is-style-wide section-inner" aria-hidden="true" /> <?php
		endif;
		?> <p style="text-align: center; font-size: 20px">
			<?php
				echo paginate_links(array(
					'total' => $posts->max_num_pages,
					'prev_text' => __('<'),
					'next_text' => __('>')
				));
			?>
		</p> <?php
		wp_reset_postdata();
	else:
		_e( 'Sorry, no posts matched your criteria.', 'textdomain' ); 
	endif;
	?>

</main><!-- #site-content -->

<?php