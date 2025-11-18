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
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    snowflakeCount: 50,        // Number of snowflakes
    creationInterval: 300,     // Milliseconds between creating snowflakes
    minDuration: 10,           // Minimum fall duration in seconds
    maxDuration: 20,           // Maximum fall duration in seconds
    minSize: 8,                // Minimum snowflake size in pixels
    maxSize: 18,               // Maximum snowflake size in pixels
    minOpacity: 0.3,           // Minimum opacity
    maxOpacity: 0.7,           // Maximum opacity
    snowflakeChars: ['❄', '❅', '❆'] // Snowflake characters to use
  };

  function createSnowflake() {
    const snowflake = document.createElement('div');
    const char = config.snowflakeChars[Math.floor(Math.random() * config.snowflakeChars.length)];

    snowflake.innerHTML = char;
    snowflake.className = 'snowflake';
    snowflake.style.position = 'fixed';
    snowflake.style.top = '-20px';
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
    snowflake.style.color = 'white';
    snowflake.style.fontSize = (Math.random() * (config.maxSize - config.minSize) + config.minSize) + 'px';
    snowflake.style.opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
    snowflake.style.pointerEvents = 'none';
    snowflake.style.zIndex = '9997';
    snowflake.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.8)';
    snowflake.style.fontFamily = 'Arial, sans-serif';

    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    snowflake.style.animation = `fall ${duration}s linear forwards`;

    // Add slight horizontal drift
    const drift = (Math.random() - 0.5) * 100;
    snowflake.style.setProperty('--drift', drift + 'px');

    document.body.appendChild(snowflake);

    // Remove snowflake after animation
    setTimeout(() => {
      if (snowflake.parentNode) {
        snowflake.remove();
      }
    }, duration * 1000);
  }

  // Add keyframes for falling animation
  function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fall {
        0% {
          transform: translateY(-20px) translateX(0) rotate(0deg);
        }
        100% {
          transform: translateY(100vh) translateX(var(--drift, 0px)) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize snowflakes
  function init() {
    // Wait for DOM to be ready
    if (document.body) {
      addStyles();

      // Create initial batch of snowflakes
      for (let i = 0; i < Math.min(20, config.snowflakeCount); i++) {
        setTimeout(() => createSnowflake(), i * 200);
      }

      // Continue creating snowflakes periodically
      setInterval(createSnowflake, config.creationInterval);
    } else {
      setTimeout(init, 100);
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
