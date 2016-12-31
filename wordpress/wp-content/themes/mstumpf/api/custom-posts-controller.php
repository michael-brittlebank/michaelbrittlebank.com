<?php
/*
Controller name: Custom Posts
Controller description: Custom Posts API
*/

class JSON_API_Custom_Posts_Controller {

    public function __construct(){
        global $json_api;
        $json_api->customIntrospector = new JSON_API_Custom_Introspector();
    }

    public function get_posts() {
        global $json_api;
        $url = parse_url($_SERVER['REQUEST_URI']);
        $defaults = array(
            'ignore_sticky_posts' => true
        );
        $query = wp_parse_args($url['query']);
        unset($query['json']);
        unset($query['post_status']);
        $query = array_merge($defaults, $query);
        $posts = $json_api->customIntrospector->get_posts($query);
        $result = $this->posts_result($posts);
        $result['query'] = $query;
        return $result;
    }

    public function get_post() {
        global $json_api, $post;
        $post = $json_api->introspector->get_current_post();
        if ($post) {
            $previous = get_adjacent_post(false, '', true);
            $next = get_adjacent_post(false, '', false);
            $response = array(
                'post' => new JSON_API_Post($post)
            );
            if ($previous) {
                $response['previous_url'] = get_permalink($previous->ID);
            }
            if ($next) {
                $response['next_url'] = get_permalink($next->ID);
            }
            return $response;
        } else {
            $json_api->error("Not found.");
        }
    }

    protected function posts_result($posts) {
        global $wp_query;
        return array(
            'count' => count($posts),
            'count_total' => (int) $wp_query->found_posts,
            'pages' => $wp_query->max_num_pages,
            'posts' => $posts
        );
    }

}

class JSON_API_Custom_Introspector extends JSON_API_Introspector {

    public function get_posts($query = false, $wp_posts = false) {
        global $post, $wp_query;
        $this->set_posts_query($query);
        $output = array();
        while (have_posts()) {
            the_post();
            if ($wp_posts) {
                $new_post = $post;
            } else {
                $new_post = new JSON_API_Custom_Post($post);
            }
            $output[] = $new_post;
        }
        return $output;
    }

}

class JSON_API_Custom_Post extends JSON_API_Post {

    function JSON_API_Custom_Post($wp_post = null) {
        if (!empty($wp_post)) {
            $this->import_wp_object($wp_post);
        }
        do_action("json_api_{$this->type}_constructor", $this);
    }

    function import_wp_object($wp_post) {
        global $json_api, $post;
        $date_format = $json_api->query->date_format;
        $this->id = (int) $wp_post->ID;
        setup_postdata($wp_post);
        $this->set_value('type', $wp_post->post_type);
        $this->set_value('slug', $wp_post->post_name);
        $this->set_value('url', get_permalink($this->id));
        $this->set_value('status', $wp_post->post_status);
        $this->set_value('title', get_the_title($this->id));
        $this->set_value('title_plain', strip_tags(@$this->title));
        $this->set_content_value();
        $this->set_value('excerpt', apply_filters('the_excerpt', get_the_excerpt()));
        $this->set_value('date', get_the_time($date_format));
        $this->set_value('modified', date($date_format, strtotime($wp_post->post_modified)));
        $this->set_categories_value();
        $this->set_tags_value();
        $this->set_author_value($wp_post->post_author);
        $this->set_comments_value();
        $this->set_attachments_value();
        $this->set_value('comment_count', (int) $wp_post->comment_count);
        $this->set_value('comment_status', $wp_post->comment_status);
        $this->set_value('menu_order', $wp_post->menu_order);
        $this->set_thumbnail_value();
        $this->set_custom_fields_value();
        $this->set_custom_taxonomies($wp_post->post_type);
        do_action("json_api_import_wp_post", $this, $wp_post);
    }

}