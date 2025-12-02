# Christmas Theme for VS Code

A festive Christmas theme for Visual Studio Code featuring beautiful holiday colors and optional snowflake animations!

## Features

- **Two Beautiful Themes:**
  - **Christmas Dark**: Deep forest greens, rich reds, and gold accents on a dark background
  - **Christmas Light**: Warm ivory background with festive red and green highlights

- **Carefully Crafted Color Palette:**
  - Christmas red (#C41E3A) for keywords and important elements
  - Forest green (#0D3B1A, #2D7A4D) for backgrounds and strings
  - Gold (#FFD700, #CC8800) for functions and highlights
  - Festive accents throughout the UI

- **Optional Snowflake Animations:**
  - Subtle falling snowflakes in the background
  - Non-intrusive and performance-friendly
  - Easy to enable/disable

## Installation

### Method 1: Install from VSIX (Local Installation)

1. Download or clone this repository
2. Open the terminal in the theme directory
3. Package the theme:
   ```bash
   npm install -g @vscode/vsce
   vsce package
   ```
4. Install the generated `.vsix` file:
   - Open VS Code
   - Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
   - Click the `...` menu at the top
   - Select "Install from VSIX..."
   - Choose the generated `christmas-theme-1.0.0.vsix` file

### Method 2: Manual Installation

1. Clone or download this repository
2. Copy the theme folder to your VS Code extensions directory:
   - **Windows**: `%USERPROFILE%\.vscode\extensions\`
   - **macOS**: `~/.vscode/extensions/`
   - **Linux**: `~/.vscode/extensions/`
3. Restart VS Code
4. Activate the theme (see below)

## Activating the Theme

1. Open VS Code
2. Press `Ctrl+K Ctrl+T` (or `Cmd+K Cmd+T` on macOS)
3. Select either:
   - **Christmas Dark** for the dark theme
   - **Christmas Light** for the light theme

Alternatively:
1. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type "Preferences: Color Theme"
3. Select your preferred Christmas theme

## Enabling Falling Animations

The falling animations (snowflakes by default) are optional and require the Custom CSS and JS Loader extension.

> **💡 Tip:** For animations in **all VS Code windows**, add configuration to **User Settings**. For project-specific animations, use **Workspace Settings**.

### Step 1: Install Custom CSS and JS Loader

1. Open Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for "Custom CSS and JS Loader" by be5invis
3. Install the extension

### Step 2: Configure Animations

**Option A: User Settings (Recommended - applies to all VS Code windows)**

1. Open your **User** settings.json:
   - Press `Ctrl+Shift+P` / `Cmd+Shift+P`
   - Type "Preferences: Open **User** Settings (JSON)"
   - Press Enter

2. Add one of the configuration options below

**Option B: Workspace Settings (project-specific)**

1. Open `.vscode/settings.json` in your project folder
2. Add one of the configuration options below

### Configuration Options

**Option 1: Default Snowflakes (Recommended)**
```json
{
  "vscode_custom_css.imports": [
    "file:///Users/YourName/.vscode/extensions/butta-themes.christmas-theme-1.0.0/snowflakes.js"
  ]
}
```

**Option 2: Custom Configuration**
```json
{
  "vscode_custom_css.imports": [
    "file:///Users/YourName/.vscode/extensions/butta-themes.christmas-theme-1.0.0/falling-config.js",
    "file:///Users/YourName/.vscode/extensions/butta-themes.christmas-theme-1.0.0/snowflakes.js"
  ]
}
```
Then edit `falling-config.js` to customize characters, speed, size, etc.

**Option 3: CSS-Only (Ultra-lightweight)**
```json
{
  "vscode_custom_css.imports": [
    "file:///Users/YourName/.vscode/extensions/butta-themes.christmas-theme-1.0.0/snowflakes.css"
  ]
}
```

**Path Examples:**
- Windows: `file:///C:/Users/YourName/.vscode/extensions/butta-themes.christmas-theme-1.0.0/`
- macOS: `file:///Users/YourName/.vscode/extensions/butta-themes.christmas-theme-1.0.0/`
- Linux: `file:///home/YourName/.vscode/extensions/butta-themes.christmas-theme-1.0.0/`

### Step 3: Enable Custom CSS

1. Open Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`)
2. Type "Enable Custom CSS and JS"
3. Press Enter
4. Restart VS Code

### Disabling Snowflakes

To disable the snowflakes:
1. Open Command Palette
2. Type "Disable Custom CSS and JS"
3. Restart VS Code

Or simply remove the `vscode_custom_css.imports` from your settings.json.

## Theme Preview

### Christmas Dark Theme
- Rich, deep colors perfect for late-night coding sessions
- Gold accents for functions and important elements
- Forest green background with Christmas red highlights
- Easy on the eyes with excellent contrast

### Christmas Light Theme
- Warm, inviting ivory background
- Perfect for daytime coding
- Traditional Christmas red and green color scheme
- Clear, readable text with festive accents

## Color Palette

### Dark Theme Colors
- Background: `#0F2417` (Deep Forest Green)
- Foreground: `#F5F5DC` (Beige/Cream)
- Accent Red: `#C41E3A` (Christmas Red)
- Accent Gold: `#FFD700` (Gold)
- Accent Green: `#50C878` (Emerald Green)

### Light Theme Colors
- Background: `#FFFEF8` (Warm Ivory)
- Foreground: `#2D3A30` (Dark Green-Gray)
- Accent Red: `#B8282F` (Deep Red)
- Accent Gold: `#CC8800` (Dark Gold)
- Accent Green: `#2D7A4D` (Forest Green)

## Customization

### Animation Configuration

Customize the falling animations by editing `falling-config.js`:

```javascript
window.buttaThemeConfig = {
  fallingAnimation: {
    enabled: true,

    // Choose characters or images
    characters: ['❄', '❅', '❆'],  // Snowflakes (default)
    // characters: ['🍂', '🍁', '🍃'],  // Autumn leaves
    // characters: ['❤', '💕', '💖'],  // Hearts

    // Or use custom images (SVG, PNG, etc.)
    // images: [
    //   'file:///path/to/image1.svg',
    //   'file:///path/to/image2.png'
    // ],

    // Performance settings
    maxItems: 40,              // Max items on screen
    spawnRate: 0.03,           // Spawn probability per frame

    // Movement settings
    minSpeed: 0.3,             // Minimum fall speed
    maxSpeed: 1.2,             // Maximum fall speed
    drift: 0.3,                // Horizontal drift amount
    rotationSpeed: 0.02,       // Rotation speed

    // Appearance settings
    minSize: 8,                // Minimum size in pixels
    maxSize: 16,               // Maximum size in pixels
    minOpacity: 0.4,           // Minimum opacity
    maxOpacity: 0.85           // Maximum opacity
  }
};
```

### Using Custom Images

You can use SVG, PNG, or any image format:

```javascript
// Local files
images: [
  'file:///Users/YourName/Pictures/logo.svg',
  'file:///Users/YourName/Pictures/icon.png'
]

// Or inline SVG using data URIs
images: [
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="white"/></svg>'
]
```

## Troubleshooting

### Theme doesn't appear
- Make sure the theme is installed in the correct extensions directory
- Restart VS Code completely
- Check that the theme name appears in the theme selector

### Snowflakes don't work
- Verify Custom CSS and JS Loader is installed
- Check that file paths in settings.json are correct (use absolute paths)
- Make sure you ran "Enable Custom CSS and JS" command
- Restart VS Code after enabling
- On some systems, you may need to grant VS Code permission to modify itself

### Performance issues with animations
The new canvas-based animation is highly optimized, but if you still experience issues:
- Reduce `maxItems` in `falling-config.js` (try 20-30 instead of 40)
- Lower `spawnRate` to create items less frequently (try 0.01-0.02)
- Use text characters instead of images (images require more processing)
- Switch to the CSS-only version (`snowflakes.css`) for minimal impact
- Disable animations entirely by setting `enabled: false` in config
- Make sure animations are in **User Settings** not duplicated in multiple workspace settings

## Contributing

Found a bug or have a suggestion? Please open an issue on the GitHub repository!

## License

MIT License - See LICENSE file for details

## Credits

Created with festive cheer for the holiday season! 🎄

Enjoy coding with a touch of Christmas magic! ❄️✨
