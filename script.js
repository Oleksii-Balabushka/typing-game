const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endgameElement = document.getElementById("end-game-container");
const settingsButton = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "sigh", "tense", "airplane", "ball", "pies", "juice", "warlike", "bad", "north", "dependent",
  "steer", "silver", "highfalutin", "superficial", "quince", "eight", "feeble", "admit", "drag", "loving",
  "brave", "ocean", "mystery", "shadow", "tiger", "puzzle", "guitar", "whisper", "ancient", "victory",
  "galaxy", "courage", "midnight", "harmony", "island", "fortune", "gentle", "breeze", "lighthouse", "emerald",
  "phantom", "cascade", "miracle", "wander", "twilight", "enchanted", "frost", "lantern", "meadow", "velvet",
  "storm", "adventure", "compass", "explore", "journey", "legend", "thunder", "serene", "eclipse", "universe",
  "horizon", "illusion", "parallel", "gravity", "reflection", "obsidian", "mystical", "vortex", "eternal", "shimmer",
  "astral", "moonlight", "solstice", "crimson", "evergreen", "stardust", "celestial", "radiance", "infinity", "nebula",
  "comet", "aurora", "labyrinth", "alchemy", "riddle", "sapphire", "whimsical", "flicker", "tranquil", "hollow",
  "sanctuary", "mirage", "zephyr", "ember", "echo", "whirlwind", "serenade", "timeless", "solitude", "luminary",
  "ripple", "mystic", "euphoria", "horizon", "illusion", "nostalgia", "paradox", "shroud", "spectrum", "whispering",
  "labyrinthine", "phenomenon", "reverie", "zenith", "arcane", "ephemeral", "inception", "nirvana", "perception", "resonance",
  "synchrony", "tangible", "maelstrom", "ethereal", "fluctuate", "halcyon", "invisible", "magnitude", "omnipresent", "pristine",
  "quintessence", "synergy", "velocity", "cascade", "eloquence", "spectrum", "quasar", "nebula", "chasm", "resplendent",
  "soliloquy", "oblivion", "saffron", "crystalline", "symphony", "wavelength", "metamorphosis", "luminescent", "fathom", "effervescent",
  "zenith", "zephyr", "labyrinth", "maelstrom", "synthesis", "resonant", "prism", "astronomy", "cosmos", "infinitesimal",
  "supernova", "magnanimous", "exquisite", "phantasm", "evanescent", "harmonious", "serendipity", "mellifluous", "cascade", "chiaroscuro",
  "moonbeam", "starburst", "transcend", "ultraviolet", "verdant", "iridescent", "undulate", "whimsical", "ephemeral", "effulgence",
  "enigma", "elegance", "phantasmagoria", "resilience", "luminous", "spectral", "surreal", "tesseract", "irrevocable", "sublime",
  "synesthesia", "ethereal", "lucid", "mystique", "nebulous", "numinous", "phantom", "quixotic", "radiant", "sagacious",
  "tangible", "tenacious", "tranquil", "unfathomable", "unwavering", "venerate", "veracious", "virtuoso", "whimsical", "wistful",
  "absolution", "amorphous", "anachronistic", "anathema", "apocryphal", "apotheosis", "ascendancy", "asynchronous", "bellicose", "blasphemy",
  "bombastic", "boondoggle", "cachinnate", "cacophony", "calamity", "callipygian", "camaraderie", "caper", "capricious", "catharsis",
  "chicanery", "chimera", "circumlocution", "circumspect", "coalescence", "cognizance", "colloquial", "conflagration", "contumacious", "corroborate",
  "cryptic", "curmudgeon", "debonair", "decrepit", "delirium", "delineate", "demagogue", "diaphanous", "dichotomy", "didactic",
  "disparate", "dissemble", "ebullient", "eclectic", "efficacious", "egregious", "elegiac", "elucidate", "empyrean", "encomium",
  "endemic", "enervate", "enervated", "engender", "ennui", "entourage", "ephemeral", "epistemology", "equanimity", "equivocate",
  "erroneous", "esoteric", "ethereal", "eulogy", "exacerbate", "exculpate", "exemplar", "exonerate", "expedite", "exuberant",
  "fallacious", "fastidious", "felicity", "feral", "fervent", "fetid", "fickle", "florid", "fortitude", "fortuitous",
  "garrulous", "germane", "grandiloquent", "gregarious", "hackneyed", "hapless", "harangue", "hedonistic", "herculean", "hierarchy",
  "hypocritical", "iconoclast", "idyllic", "ignominious", "illustrious", "imbroglio", "impecunious", "impervious", "impetuous", "incandescent",
  "incisive", "indefatigable", "indelible", "ineffable", "inexorable", "infinitesimal", "inimical", "innocuous", "insidious", "insipid",
  "intransigent", "invective", "invidious", "irascible", "irreverent", "itinerant", "jocular", "judicious", "juxtaposition", "kaleidoscope",
  "lackadaisical", "lachrymose", "laconic", "lampoon", "languid", "latent", "lethargic", "libertine", "liminal", "litigious",
  "lucid", "lugubrious", "magnanimous", "maladroit", "malediction", "malevolent", "mellifluous", "mercurial", "meticulous", "misanthrope",
  "miscreant", "mirthful", "modicum", "morose", "munificent", "nadir", "nebulous", "nefarious", "nocturnal", "nonchalant",
  "obfuscate", "obstreperous", "officious", "omniscient", "onerous", "opaque", "ostentatious", "paradox", "paradigm", "parsimonious",
  "pedagogy", "pejorative", "penchant", "perfunctory", "permeable", "pernicious", "perspicacious", "petulant", "phantasmagorical", "platitude",
  "plethora", "precocious", "prescient", "prodigious", "propinquity", "prosaic", "quagmire", "quandary", "querulous", "quintessential",
];


let randomWord;
let score = 0;
let time = 10;
// let difficulty = "medium";
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDom() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  score++;
  scoreElement.innerText = score;
}

function updateTime() {
  time--;
  timeElement.innerText = time + "s";
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameElement.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="history.go(0)">Play Again</button>
    `;
  endgameElement.style.display = "flex";
}

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    e.target.value = "";
    addWordToDom();
    updateScore();
    if (difficulty === "hard") time += 2;
    else if (difficulty === "medium") time += 3;
    else time += 5;
    updateTime();
  }
});

settingsButton.addEventListener("click", () =>
  settings.classList.toggle("hide")
);
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

// Init
difficultySelect.value = difficulty;
addWordToDom();
text.focus();