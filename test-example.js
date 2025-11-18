// Test file to preview the Christmas theme syntax highlighting
// This demonstrates how the theme colors look with various code elements

// Comments are displayed in a muted green with italic style
/* Multi-line comments
 * also use the same style */

// Strings in festive green
const greeting = "Merry Christmas!";
const message = 'Happy Holidays from VS Code';

// Numbers and constants in Christmas red
const year = 2025;
const daysUntilChristmas = 25;
const PI = 3.14159;
const isChristmas = true;

// Keywords in bold red
function celebrateChristmas() {
  if (isChristmas) {
    return greeting;
  } else {
    return "Not yet!";
  }
}

// Classes and types in coral/pink
class ChristmasTree {
  constructor(height, color) {
    this.height = height;
    this.color = color;
    this.decorations = [];
  }

  // Methods in gold
  addDecoration(decoration) {
    this.decorations.push(decoration);
  }

  // Support functions in emerald green
  display() {
    console.log(`Christmas tree: ${this.height}ft tall`);
  }
}

// Variables and parameters
let tree = new ChristmasTree(7, 'green');
const ornament = { type: 'ball', color: 'red' };

// Function calls in gold
tree.addDecoration(ornament);
tree.display();

// Objects and arrays
const presents = [
  { name: 'Book', recipient: 'Alice' },
  { name: 'Toy', recipient: 'Bob' },
  { name: 'Game', recipient: 'Charlie' }
];

// Control flow keywords
for (const present of presents) {
  if (present.recipient === 'Alice') {
    console.log(`${present.name} for ${present.recipient}`);
  }
}

// Operators
const total = daysUntilChristmas * 24 + 12;
const isReady = total > 0 && isChristmas;

// Template literals
const announcement = `There are ${daysUntilChristmas} days until Christmas!`;

// Async/await keywords
async function prepareChristmas() {
  try {
    await decorateTree();
    await wrapPresents();
    await bakeCookies();
  } catch (error) {
    console.error('Something went wrong!', error);
  }
}

// Arrow functions
const singCarol = (song) => {
  return `Singing: ${song}`;
};

// Enjoy coding with Christmas theme! 🎄
export { ChristmasTree, celebrateChristmas, prepareChristmas };
