/*
 * Butta Themes - Falling Animation Configuration
 *
 * This file must be loaded BEFORE snowflakes.js in your vscode_custom_css.imports.
 * Customize the values below to change the animation behavior.
 *
 * Example settings.json:
 *   "vscode_custom_css.imports": [
 *     "file:///path/to/falling-config.js",
 *     "file:///path/to/snowflakes.js"
 *   ]
 */

window.buttaThemeConfig = {
  fallingAnimation: {
    // ─────────────────────────────────────────────────────────────────────
    // Enable/Disable
    // ─────────────────────────────────────────────────────────────────────
    enabled: true,

    // ─────────────────────────────────────────────────────────────────────
    // OPTION 1: Characters (emoji, Unicode, or text)
    // ─────────────────────────────────────────────────────────────────────
    // Snowflakes (default):
    characters: ['❄', '❅', '❆'],

    // Autumn leaves:
    // characters: ['🍂', '🍁', '🍃'],

    // Hearts:
    // characters: ['❤', '💕', '💖'],

    // Stars:
    // characters: ['⭐', '✨', '🌟'],

    // Custom text/logos:
    // characters: ['A', 'B', 'C'],

    // ─────────────────────────────────────────────────────────────────────
    // OPTION 2: Images (SVG, PNG, etc.) - OVERRIDES characters if set
    // ─────────────────────────────────────────────────────────────────────
    // Use file:// URLs pointing to your image files.
    // Images are loaded once and cached for performance.
    // Supports: SVG, PNG, JPG, GIF, WebP
    //
    // Example - Local SVG files:
    // images: [
    //   'file:///Users/YOUR_USERNAME/.vscode/extensions/butta-themes.christmas-theme-1.0.1/images/snowflake1.svg',
    //   'file:///Users/YOUR_USERNAME/.vscode/extensions/butta-themes.christmas-theme-1.0.1/images/snowflake2.svg'
    // ],
    //
    // Example - Local PNG files:
    // images: [
    //   'file:///Users/YOUR_USERNAME/Pictures/leaf1.png',
    //   'file:///Users/YOUR_USERNAME/Pictures/leaf2.png'
    // ],
    //
    // Example - Company logo:
    // images: [
    //   'file:///Users/YOUR_USERNAME/logo.svg'
    // ],
    //
    // Example - Inline SVG using data URI (no external files needed):
    // images: [
    //   'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="white" opacity="0.8"/></svg>',
    //   'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" fill="white" opacity="0.8"/></svg>'
    // ],
    //
    // Example - Snowflake SVG:
    // images: [
    //   'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text x="50" y="70" font-size="60" text-anchor="middle" fill="white">❄</text></svg>'
    // ],

    // ─────────────────────────────────────────────────────────────────────
    // Performance Settings
    // ─────────────────────────────────────────────────────────────────────
    maxItems: 40,        // Max items on screen (lower = better performance)
    spawnRate: 0.03,     // Spawn probability per frame (0.01-0.1, lower = fewer)

    // ─────────────────────────────────────────────────────────────────────
    // Movement Settings
    // ─────────────────────────────────────────────────────────────────────
    minSpeed: 0.3,       // Min fall speed (pixels per frame at 60fps)
    maxSpeed: 1.2,       // Max fall speed
    drift: 0.3,          // Horizontal drift amount (0 = straight down)
    rotationSpeed: 0.02, // Rotation speed (0 = no rotation)

    // ─────────────────────────────────────────────────────────────────────
    // Appearance Settings
    // ─────────────────────────────────────────────────────────────────────
    minSize: 8,          // Min size in pixels
    maxSize: 16,         // Max size in pixels
    minOpacity: 0.4,     // Min opacity (0-1)
    maxOpacity: 0.85     // Max opacity (0-1)
  }
};
