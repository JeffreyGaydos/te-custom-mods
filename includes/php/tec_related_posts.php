<?php

function tec_relatedPosts() {
    try {
        $related = '';
	if ( is_single ( ) ) {
        global $post;
 
        $postIDs = array( $post->ID );
        $count = 0;
        $cats = wp_get_post_categories( $post->ID );
        $catIDs = array( );
 
            foreach ( $cats as $cat ) {
                 
                if ( 3 == $cat )
                    continue;
                $catIDs[] = $cat;
                 
            }
            
            $showposts = 5;
 
            $args = array(
                'category__in'          => $catIDs,
                'post__not_in'          => $postIDs,
                'showposts'             => $showposts,
                'ignore_sticky_posts'   => 1,
                'orderby'               => 'rand',
                'tax_query'             => array(
                                    array(
                                        'taxonomy'  => 'post_format',
                                        'field'     => 'slug',
                                        'terms'     => array( 
                                            'post-format-link', 
                                            'post-format-status', 
                                            'post-format-aside', 
                                            'post-format-quote' ),
                                        'operator' => 'NOT IN'
                                    )
                )
            );
 
            $cat_query = new WP_Query( $args );

             
            if ( $cat_query->have_posts() ) {
                while ( $cat_query->have_posts() ) {
                    $count++;
                    $cat_query->the_post();
 
                    $img = get_the_post_thumbnail();
                    $first_cat = get_cat_name($cats[0]);
 
                    $related .= '<li style="text-align: left; display: flex; justify-content: center; width: 300px; height: 300px; display: inline-block;"><a style="font-size: 18pt;" href="' . get_permalink() . '" rel="bookmark" title="Permanent Link to' . get_the_title() . '"><div onMouseLeave="this.style.opacity=0.85" onMouseEnter="this.style.opacity=1;" style="transition: all 0.2s ease; opacity: 0.85; ">' . $img . '</div><div>' . get_the_title() . '</div></a><p class="tec-rel-date" style="font-size: 12pt; font-family: Arial, Helvetica, sans-serif; letter-spacing: normal; margin-bottom: 3px;">' . get_the_date(). ', By: <a href="' . get_site_url() . '/author/' . str_replace(" ", "-", strtolower(get_the_author_meta("user_login"))) . '">' . get_the_author() . '</a></p><a href="' . get_site_url() . '/category/' . str_replace(" ", "-", strtolower($first_cat)) . '" style="cursor: pointer; text-decoration: none !important"><p class="tec-rel-cat" style="background: #1abc9c; background-color: rgb(26, 188, 156); color: white; font-size: 11px; text-shadow: none; text-align: center; text-transform: uppercase; padding: 4px 10px; letter-spacing: normal; line-height: normal; width: fit-content;">' . $first_cat . '</p></a></li>';
                }
            }
            // if($count < $showposts) {
            //     $all_cats = get_categories();
            //     foreach($all_cats as $next_cats) {
            //         echo $next_cat;
            //     }
            // }
        
    }
     if ( $related ) {
            
            printf( '<div style="display: flex;" id="tec-related-posts"><h3 class="related-title" style="margin-top: 4rem; text-align: center;">Related Articles:<hr class="styled-separator is-style-wide" aria-hidden="true" style="margin: 20px 40px;"><ul class="related-list;">%s</ul></h3></div>', $related);

         
        }
    wp_reset_query();
    } catch(e) {
        //ignore errors
    }
}