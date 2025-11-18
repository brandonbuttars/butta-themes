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

## Enabling Snowflake Animations

The snowflake animations are optional and require the Custom CSS and JS Loader extension:

### Step 1: Install Custom CSS and JS Loader

1. Open Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for "Custom CSS and JS Loader" by be5invis
3. Install the extension

### Step 2: Configure Snowflakes

1. Open your VS Code settings (`settings.json`):
   - Press `Ctrl+Shift+P` / `Cmd+Shift+P`
   - Type "Preferences: Open Settings (JSON)"
   - Press Enter

2. Add the following configuration (update the paths to match your installation):

   **For CSS-only snowflakes (lightweight):**
   ```json
   {
     "vscode_custom_css.imports": [
       "file:///C:/path/to/butta-themes/snowflakes.css"
     ]
   }
   ```

   **For JavaScript snowflakes (more realistic, recommended):**
   ```json
   {
     "vscode_custom_css.imports": [
       "file:///C:/path/to/butta-themes/snowflakes.css",
       "file:///C:/path/to/butta-themes/snowflakes.js"
     ]
   }
   ```

   **Path Examples:**
   - Windows: `file:///C:/Users/YourName/.vscode/extensions/christmas-theme/snowflakes.css`
   - macOS/Linux: `file:///Users/YourName/.vscode/extensions/christmas-theme/snowflakes.css`

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

You can customize the snowflake animations by editing `snowflakes.js`:

```javascript
const config = {
  snowflakeCount: 50,        // Number of snowflakes
  creationInterval: 300,     // Milliseconds between creating snowflakes
  minDuration: 10,           // Minimum fall duration in seconds
  maxDuration: 20,           // Maximum fall duration in seconds
  minSize: 8,                // Minimum snowflake size in pixels
  maxSize: 18,               // Maximum snowflake size in pixels
  minOpacity: 0.3,           // Minimum opacity
  maxOpacity: 0.7,           // Maximum opacity
};
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

### Performance issues with snowflakes
- Reduce `snowflakeCount` in snowflakes.js
- Increase `creationInterval` to create snowflakes less frequently
- Use CSS-only version instead of JavaScript version
- Disable snowflakes if needed

## Contributing

Found a bug or have a suggestion? Please open an issue on the GitHub repository!

## License

MIT License - See LICENSE file for details

## Credits

Created with festive cheer for the holiday season! 🎄

Enjoy coding with a touch of Christmas magic! ❄️✨
