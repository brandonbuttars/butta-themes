/*
 * Christmas Theme Snowflakes Animation - JavaScript Version
 *
 * To use this with VS Code:
 * 1. Install the "Custom CSS and JS Loader" extension
 * 2. Add this file path to your VS Code settings.json:
 *    "vscode_custom_css.imports": [
 *      "file:///path/to/snowflakes.css",
 *      "file:///path/to/snowflakes.js"
 *    ]
 * 3. Run command: "Enable Custom CSS and JS"
 * 4. Restart VS Code
 *
 * Performance optimizations included:
 * - Reduced snowflake count and creation interval
 * - Removed expensive text-shadow
 * - Uses will-change for GPU acceleration
 * - Pauses animation when tab is not visible
 * - Uses requestAnimationFrame for smoother timing
 */

(function() {
  'use strict';

  // Configuration - optimized for performance
  const config = {
    snowflakeCount: 25,        // Reduced from 50 for better performance
    creationInterval: 500,     // Increased from 300ms to reduce DOM operations
    minDuration: 10,           // Minimum fall duration in seconds
    maxDuration: 20,           // Maximum fall duration in seconds
    minSize: 8,                // Minimum snowflake size in pixels
    maxSize: 18,               // Maximum snowflake size in pixels
    minOpacity: 0.4,           // Minimum opacity (slightly increased for visibility without text-shadow)
    maxOpacity: 0.8,           // Maximum opacity
    snowflakeChars: ['❄', '❅', '❆'] // Snowflake characters to use
  };

  let isVisible = true;
  let intervalId = null;
  let activeSnowflakes = 0;

  function createSnowflake() {
    // Don't create if tab not visible or at max capacity
    if (!isVisible || activeSnowflakes >= config.snowflakeCount) {
      return;
    }

    activeSnowflakes++;

    const snowflake = document.createElement('div');
    const char = config.snowflakeChars[Math.floor(Math.random() * config.snowflakeChars.length)];
    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    const drift = (Math.random() - 0.5) * 100;

    snowflake.textContent = char;
    snowflake.className = 'christmas-snowflake';

    // Apply all styles at once to minimize reflows
    snowflake.style.cssText = `
      position: fixed;
      top: -20px;
      left: ${Math.random() * window.innerWidth}px;
      color: white;
      font-size: ${size}px;
      opacity: ${opacity};
      pointer-events: none;
      z-index: 9997;
      font-family: Arial, sans-serif;
      will-change: transform;
      animation: christmas-snowfall ${duration}s linear forwards;
      --drift: ${drift}px;
    `;

    document.body.appendChild(snowflake);

    // Remove snowflake after animation completes
    const cleanup = () => {
      if (snowflake.parentNode) {
        snowflake.remove();
      }
      activeSnowflakes--;
    };

    // Use animationend event for more reliable cleanup
    snowflake.addEventListener('animationend', cleanup, { once: true });

    // Fallback timeout in case animationend doesn't fire
    setTimeout(cleanup, (duration + 1) * 1000);
  }

  // Add keyframes for falling animation
  function addStyles() {
    const style = document.createElement('style');
    style.id = 'christmas-snowflake-styles';
    style.textContent = `
      @keyframes christmas-snowfall {
        0% {
          transform: translateY(-20px) translateX(0) rotate(0deg);
        }
        100% {
          transform: translateY(100vh) translateX(var(--drift, 0px)) rotate(360deg);
        }
      }
      .christmas-snowflake {
        contain: layout style;
      }
    `;
    document.head.appendChild(style);
  }

  // Handle visibility changes to pause/resume animations
  function handleVisibilityChange() {
    isVisible = !document.hidden;

    if (isVisible && !intervalId) {
      startSnowfall();
    } else if (!isVisible && intervalId) {
      stopSnowfall();
    }
  }

  function startSnowfall() {
    if (intervalId) return;

    intervalId = setInterval(() => {
      requestAnimationFrame(createSnowflake);
    }, config.creationInterval);
  }

  function stopSnowfall() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Initialize snowflakes
  function init() {
    // Wait for DOM to be ready
    if (!document.body) {
      setTimeout(init, 100);
      return;
    }

    // Don't initialize twice
    if (document.getElementById('christmas-snowflake-styles')) {
      return;
    }

    addStyles();

    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Create initial batch of snowflakes with staggered timing
    const initialBatch = Math.min(10, config.snowflakeCount);
    for (let i = 0; i < initialBatch; i++) {
      setTimeout(() => {
        requestAnimationFrame(createSnowflake);
      }, i * 200);
    }

    // Start continuous snowfall
    startSnowfall();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
