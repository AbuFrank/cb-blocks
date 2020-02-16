<?php

/**
 * Plugin Name: CB Blocks
 * Author: Creative Blazer
 * Description: Custom gutenberg block for Tasting Counter theme
 * Version: 1.0.0
 */

defined( 'ABSPATH' ) || exit;


function cbCustomBlocks() {
	
	// block js
	// wp_enqueue_script(
	// 	'cb-custom-blocks',
	// 	plugins_url('build/index.js', __FILE__),
	// 	array('wp-blocks','wp-element','wp-editor','wp-compose','wp-polyfill') 
	// );


	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	wp_register_script(
		'cb-blocks-js',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file["dependencies"],
		$asset_file["version"]
	);


	register_block_type( 'cb-blocks/media-text-tile', array(
		'editor_script' => 'cb-blocks-js',
	) );
	// block css
	// wp_enqueue_style(
	// 	'cb-editor-styles',
	// 	plugins_url('cb-editor-styles.css', __FILE__),
	// 	array( 'wp-edit-blocks' )
	// );

}
   
add_action('init', 'cbCustomBlocks');

 