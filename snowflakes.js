/*
 * Butta Themes - Falling Animation Engine (Ultra Performance Version)
 *
 * A reusable, configurable falling animation for VS Code themes.
 * Works with snowflakes, leaves, logos, or any text/emoji/image characters.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * SETUP
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * 1. Install the "Custom CSS and JS Loader" extension (be5invis.vscode-custom-css)
 * 2. Add to your VS Code settings.json:
 *    "vscode_custom_css.imports": [
 *      "file:///path/to/config.js",    // Optional: custom settings
 *      "file:///path/to/snowflakes.js"
 *    ]
 * 3. Run command: "Enable Custom CSS and JS"
 * 4. Restart VS Code
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * CONFIGURATION
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Create a config.js file that loads BEFORE this script:
 *
 *   window.buttaThemeConfig = {
 *     fallingAnimation: {
 *       enabled: true,
 *       maxItems: 40,
 *       spawnRate: 0.03,
 *       minSpeed: 0.3,
 *       maxSpeed: 1.2,
 *       minSize: 8,
 *       maxSize: 16,
 *       minOpacity: 0.4,
 *       maxOpacity: 0.85,
 *       drift: 0.3,
 *       rotationSpeed: 0.02,
 *
 *       // Option 1: Text/emoji characters
 *       characters: ['❄', '❅', '❆'],
 *
 *       // Option 2: Image files (SVG, PNG, etc.) - use file:// URLs
 *       // images: [
 *       //   'file:///path/to/snowflake1.svg',
 *       //   'file:///path/to/snowflake2.png'
 *       // ]
 *     }
 *   };
 *
 * All settings are optional - defaults will be used for any missing values.
 * If both 'characters' and 'images' are provided, 'images' takes priority.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * PERFORMANCE
 * ═══════════════════════════════════════════════════════════════════════════
 * - Single canvas element (no DOM churn)
 * - Object pooling (no garbage collection)
 * - requestAnimationFrame with delta timing
 * - Auto-pauses when tab is hidden
 * - GPU-accelerated rendering
 * - Images are cached after first load
 */

(function() {
  'use strict';

  // Default configuration
  const defaults = {
    enabled: true,
    maxItems: 40,              // Max items on screen
    spawnRate: 0.03,           // Probability of spawning per frame (lower = fewer)
    minSpeed: 0.3,             // Min fall speed (pixels per frame at 60fps)
    maxSpeed: 1.2,             // Max fall speed
    minSize: 8,                // Min size in pixels
    maxSize: 16,               // Max size
    minOpacity: 0.4,
    maxOpacity: 0.85,
    drift: 0.3,                // Horizontal drift factor
    rotationSpeed: 0.02,       // Rotation speed factor
    characters: ['❄', '❅', '❆'], // Default: snowflakes (text/emoji)
    images: null               // Array of image URLs (SVG, PNG, etc.) - overrides characters if set
  };

  // Merge user config with defaults
  const userConfig = (window.buttaThemeConfig && window.buttaThemeConfig.fallingAnimation) || {};
  const config = { ...defaults, ...userConfig };

  // Exit early if disabled
  if (!config.enabled) {
    return;
  }

  // State
  let canvas = null;
  let ctx = null;
  let animationId = null;
  let isVisible = true;
  let lastTime = 0;
  let items = [];
  let cachedWidth = 0;
  let cachedHeight = 0;
  let useImages = false;
  let loadedImages = [];
  let imagesReady = false;

  // Object pool for reuse (avoids GC)
  const itemPool = [];

  // Load images if configured
  function loadImages() {
    if (!config.images || !Array.isArray(config.images) || config.images.length === 0) {
      imagesReady = true;
      return Promise.resolve();
    }

    useImages = true;
    const promises = config.images.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedImages.push(img);
          resolve();
        };
        img.onerror = () => {
          console.warn('Failed to load image:', src);
          resolve(); // Don't block on failed images
        };
        img.src = src;
      });
    });

    return Promise.all(promises).then(() => {
      imagesReady = true;
      // Fall back to characters if no images loaded
      if (loadedImages.length === 0) {
        useImages = false;
      }
    });
  }

  function getItem() {
    return itemPool.pop() || {};
  }

  function releaseItem(item) {
    itemPool.push(item);
  }

  function createItem() {
    const item = getItem();
    item.x = Math.random() * cachedWidth;
    item.y = -20;
    item.size = config.minSize + Math.random() * (config.maxSize - config.minSize);
    item.speed = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
    item.opacity = config.minOpacity + Math.random() * (config.maxOpacity - config.minOpacity);
    item.rotation = Math.random() * Math.PI * 2;
    item.rotationDir = Math.random() > 0.5 ? 1 : -1;
    item.driftPhase = Math.random() * Math.PI * 2;
    item.driftSpeed = 0.5 + Math.random() * 1.5;

    // Assign either an image or a character
    if (useImages && loadedImages.length > 0) {
      item.image = loadedImages[Math.floor(Math.random() * loadedImages.length)];
      item.char = null;
    } else {
      item.image = null;
      item.char = config.characters[Math.floor(Math.random() * config.characters.length)];
    }

    return item;
  }

  function updateItem(item, deltaTime) {
    const timeScale = deltaTime / 16.67; // Normalize to 60fps

    // Fall
    item.y += item.speed * timeScale;

    // Gentle horizontal drift (sine wave)
    item.driftPhase += 0.01 * item.driftSpeed * timeScale;
    item.x += Math.sin(item.driftPhase) * config.drift * timeScale;

    // Rotate
    item.rotation += config.rotationSpeed * item.rotationDir * timeScale;

    // Check if off screen
    return item.y < cachedHeight + 30;
  }

  function render() {
    ctx.clearRect(0, 0, cachedWidth, cachedHeight);

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.rotate(item.rotation);
      ctx.globalAlpha = item.opacity;

      if (item.image) {
        // Draw image centered at origin
        const halfSize = item.size / 2;
        ctx.drawImage(item.image, -halfSize, -halfSize, item.size, item.size);
      } else {
        // Draw text character
        ctx.font = `${item.size}px Arial, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(item.char, 0, 0);
      }

      ctx.restore();
    }
  }

  function animate(currentTime) {
    if (!isVisible) {
      animationId = null;
      return;
    }

    const deltaTime = lastTime ? Math.min(currentTime - lastTime, 50) : 16.67;
    lastTime = currentTime;

    // Maybe spawn new item
    if (items.length < config.maxItems && Math.random() < config.spawnRate) {
      items.push(createItem());
    }

    // Update items, remove dead ones
    for (let i = items.length - 1; i >= 0; i--) {
      if (!updateItem(items[i], deltaTime)) {
        releaseItem(items[i]);
        items.splice(i, 1);
      }
    }

    render();
    animationId = requestAnimationFrame(animate);
  }

  function startAnimation() {
    if (animationId) return;
    lastTime = 0;
    animationId = requestAnimationFrame(animate);
  }

  function stopAnimation() {
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function handleVisibilityChange() {
    isVisible = !document.hidden;
    if (isVisible) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }

  function handleResize() {
    if (!canvas) return;
    cachedWidth = window.innerWidth;
    cachedHeight = window.innerHeight;
    canvas.width = cachedWidth;
    canvas.height = cachedHeight;
  }

  // Debounced resize handler
  let resizeTimeout = null;
  function debouncedResize() {
    if (resizeTimeout) clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResize, 100);
  }

  function init() {
    // Wait for body
    if (!document.body) {
      setTimeout(init, 100);
      return;
    }

    // Don't initialize twice
    if (document.getElementById('butta-falling-animation-canvas')) {
      return;
    }

    // Create canvas
    canvas = document.createElement('canvas');
    canvas.id = 'butta-falling-animation-canvas';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;

    ctx = canvas.getContext('2d', { alpha: true });

    // Set initial size
    handleResize();

    document.body.appendChild(canvas);

    // Event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', debouncedResize);

    // Load images (if configured) then start animation
    loadImages().then(() => {
      // Seed with a few initial items
      for (let i = 0; i < 8; i++) {
        const item = createItem();
        item.y = Math.random() * cachedHeight * 0.7; // Spread vertically
        items.push(item);
      }

      startAnimation();
    });
  }

  // Start when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
