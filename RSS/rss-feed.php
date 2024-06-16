<?php
/*
Template Name: RSS Feed

Contact Jeff_G#3210 on discord if issues arise
*/

?>
<?php
$query = new WP_Query(array('orderby' => 'date','posts_per_page' => '1'));
while( $query->have_posts() ) : $query->the_post();
$link = get_permalink(get_the_ID());
$title = get_the_title();
$date = get_post_datetime()->format('Y-m-d H:i:s');
endwhile;
?>
<?php
echo(header('content-type: text/xml'));
echo '<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
<channel>
<title>Tank Encyclopedia RSS Feed - Hand Built by yours truly</title>
<link>https://github.com/JeffreyGaydos/te-custom-mods</link>
<description>The latest TE article</description>
<lastBuildDate>' . $date . '</lastBuildDate>
<item>
<title>' . $title . '</title>
<link>' . $link . '</link>
<guid>' . $link . '</guid>
<description></description>
<pubDate>' . $date . '</pubDate>
</item>
</channel>
</rss>';
?>