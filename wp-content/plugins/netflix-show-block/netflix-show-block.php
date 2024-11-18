<?php
/**
 * Plugin Name: Netflix Show Block
 * Description: A custom Gutenberg block to display information about Netflix shows using the TMDb API.
 * Version: 1.0
 * Author: Jason McAlpin
 * Text Domain: netflix-show-block
 */

if (!defined('ABSPATH')) {
    exit; 
}


// Enqueue block assets (both JavaScript compiled from react .jsx and CSS).
function nsb_enqueue_block_assets() {
    wp_register_script(
        'nsb-block-js',
        plugins_url('dist/block.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components'),
        filemtime(plugin_dir_path(__FILE__) . 'dist/block.js')
    );

    wp_register_style(
        'nsb-block-css',
        plugins_url('dist/styles.scss.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'dist/styles.scss.css')
    );

    register_block_type('nsb/netflix-show', array(
        'editor_script' => 'nsb-block-js',
        'editor_style' => 'nsb-block-css',
        'style' => 'nsb-block-css',
        'render_callback' => 'nsb_render_callback',
        'attributes' => array(
            'showTitle' => array('type' => 'string'),
            'apiKey' => array('type' => 'string'),
            'showInfo' => array('type' => 'object'),
        ),
    ));
}
add_action('init', 'nsb_enqueue_block_assets');

// Render callback for server-side rendering.
function nsb_render_callback($attributes) {
    if (empty($attributes['showInfo'])) {
        return '';
    }

    $show = $attributes['showInfo'];

    ob_start(); ?>
    <div class="netflix-show-block">
        <img src="https://image.tmdb.org/t/p/w200<?php echo esc_attr($show['poster_path']); ?>" alt="<?php echo esc_attr($show['name']); ?>" />
        <h3><?php echo esc_html($show['name']); ?></h3>
        <p><?php echo esc_html($show['overview']); ?></p>
    </div>
    <?php
    return ob_get_clean();
}


