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

	function skipToIntroductoryParagraph( $content ) {
		$excludePhrases = array('Click here to partake!');
		foreach($excludePhrases as $ex) {
			$content = str_replace($ex, '', $content);
		}
		
		$validH = array('1', '2', '3', '4', '5', '6', '7', '8');
		$minHPos = strlen($content); //The position in the string
		$minHNum = '0'; //The tag number
		foreach($validH as $H) {
			$closeTag = '</h' . $H . '>';
			if(strpos($content, $closeTag) && strpos($content, $closeTag) < $minHPos) {
				$minHNum = $H;
				$minHPos = strpos($content, $closeTag);
			}
		}

		$minPosCloseTag = '</h' . $minHNum . '>';
		if(strpos($content, $minPosCloseTag)) {
			$sanitizedContent = substr($content, strpos($content, $minPosCloseTag) + 5);

			$minHPos = strlen($content); //The position in the string
			$minHNum = '0'; //The tag number
			foreach($validH as $H) {
				$closeTag = '</h' . $H . '>';
				if(strpos($sanitizedContent, $closeTag) && strpos($sanitizedContent, $closeTag) < $minHPos) {
					$minHNum = $H;
					$minHPos = strpos($sanitizedContent, $closeTag);
				}
			}

			$anyHNearby = false;
			foreach($validH as $H) {
				$openTag = '<h' . $H . '>';
				if(strpos($sanitizedContent, $openTag) && strpos($sanitizedContent, $openTag) < 10) {
					$anyHNearby = true;
				}
			}

			$minPosCloseTag2 = '</h' . $minHNum . '>';
			if(strpos($sanitizedContent, $minPosCloseTag2) && $anyHNearby) {
				return wp_trim_words(substr($sanitizedContent, strpos($sanitizedContent, $minPosCloseTag2) + 5));
			} else {
				return wp_trim_words($sanitizedContent);
			}
		}
		return wp_trim_words($content);
	}

	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	global $wpdb;
	$allAuthorPostIDs = array(-2); //IN () results in true; IN (-1) results in the hello world page, IN (-2) results in no post results (default to safe state)

	if(gettype(get_queried_object()->ID) == "integer") { //just to double check and prevent SQL injection
		foreach($wpdb->get_results("SELECT ID FROM `wp_posts` WHERE post_author = '" . get_queried_object()->ID . "' UNION SELECT post_id FROM `wp_postmeta` META JOIN `wp_posts` POSTS ON POSTS.ID = META.post_id AND POSTS.post_type = 'post' WHERE META.meta_key = 'co_author' AND META.meta_value LIKE '%\"" . get_queried_object()->ID . "\"%';", ARRAY_N) as $postID) {
			array_push($allAuthorPostIDs, $postID[0]);
		}
	}

	$posts = new WP_Query(array(
		'posts_per_page' => get_option('posts_per_page'),
		'paged' => get_query_var('paged') ? get_query_var('paged') : 1,
		'post__in' => $allAuthorPostIDs
	));
	if ( $posts->have_posts() ) :
		$i = 0;
		while ( $posts->have_posts() ) : $posts->the_post();
			$i++;
			$image_url = get_the_post_thumbnail_url(get_the_ID());
			if ( $i > 1 ) {
				?> <hr class="post-separator styled-separator is-style-wide section-inner" aria-hidden="true" /> <?php
			}
			?>
			<h2 class="archive-text" style="margin-left: 20%; margin-right: 20%;">
				<a href="<?php echo get_permalink(get_the_ID()); ?>"><?php the_title(); ?></a>
			</h2>
			<div class="archive-text" style="margin-left: 20%; margin-right: 20%">
				<?php if ($image_url) {
					echo '<div style="float: left; margin-right: 40px;">
						<img src="' . $image_url . '" style="max-height: 145px"/>
					</div>';
				}
				?>
				<div style="min-height: 150px">
					<?php
						echo skipToIntroductoryParagraph(get_the_content());
					?>
				</div>
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