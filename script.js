/* --- THE DATABASE --- */
// Make sure the imagePath matches where your HTML file is relative to the GP1 folder.
// Update the 'ravenPrediction' to reflect your model's actual results!
const database = [
    // --- FAKE IMAGES ---
    { imagePath: "GP1/fake0.png", groundTruth: "fake", ravenPrediction: "fake" },
    { imagePath: "GP1/fake1.png", groundTruth: "fake", ravenPrediction: "fake" },
    { imagePath: "GP1/fake2.png", groundTruth: "fake", ravenPrediction: "fake" },
    { imagePath: "GP1/fake3.jpg", groundTruth: "fake", ravenPrediction: "fake" },
    { imagePath: "GP1/fake5.png", groundTruth: "fake", ravenPrediction: "real" },
    { imagePath: "GP1/fake6.png", groundTruth: "fake", ravenPrediction: "fake" },
    { imagePath: "GP1/fake7.png", groundTruth: "fake", ravenPrediction: "fake" },

    // --- REAL IMAGES ---
    { imagePath: "GP1/real0.jpg", groundTruth: "real", ravenPrediction: "real" },
    { imagePath: "GP1/real1.jpg", groundTruth: "real", ravenPrediction: "real" },
    { imagePath: "GP1/real2.jpg", groundTruth: "real", ravenPrediction: "real" },
    { imagePath: "GP1/real4.png", groundTruth: "real", ravenPrediction: "real" },
    { imagePath: "GP1/real5.jpg", groundTruth: "real", ravenPrediction: "fake" },
    { imagePath: "GP1/real6.jpg", groundTruth: "real", ravenPrediction: "fake" },
    { imagePath: "GP1/real7.jpg", groundTruth: "real", ravenPrediction: "real" },
];

/* --- GAME LOGIC --- */
let currentIndex = 0;
let humanScore = 0;
let ravenScore = 0;

// Function to randomly shuffle the array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function showScreen(screenId) {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('challenge-screen').classList.add('hidden');
    document.getElementById('reveal-screen').classList.add('hidden');
    document.getElementById('score-screen').classList.add('hidden');
    document.getElementById(screenId).classList.remove('hidden');
}

function startDemo() {
    currentIndex = 0;
    humanScore = 0;
    ravenScore = 0;
    document.getElementById('total-images').innerText = database.length;
    
    // Shuffle the database right before the game starts!
    shuffleArray(database);

    loadChallenge();
}

function loadChallenge() {
    const currentData = database[currentIndex];
    
    // Set image and counter
    document.getElementById('product-image').src = currentData.imagePath;
    document.getElementById('current-image-number').innerText = currentIndex + 1;
    
    showScreen('challenge-screen');
}

function makeGuess(userChoice) {
    const currentData = database[currentIndex];
    
    // Check User Answer
    const isUserCorrect = (userChoice === currentData.groundTruth);
    if (isUserCorrect) humanScore++;

    // Check RAVEN Answer
    const isravenCorrect = (currentData.ravenPrediction === currentData.groundTruth);
    if (isravenCorrect) ravenScore++;

    // Update UI for Reveal
    const resultElement = document.getElementById('user-result');
    if (isUserCorrect) {
        resultElement.innerText = "You got it right!";
        resultElement.style.color = "var(--success-green)";
    } else {
        resultElement.innerText = "Oops, that was wrong.";
        resultElement.style.color = "var(--danger-red)";
    }

    document.getElementById('actual-answer').innerText = currentData.groundTruth.toUpperCase();
    document.getElementById('raven-answer').innerText = currentData.ravenPrediction.toUpperCase();
    
    showScreen('reveal-screen');
}

function nextImage() {
    currentIndex++;
    if (currentIndex < database.length) {
        loadChallenge();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    document.getElementById('final-human-score').innerText = `${humanScore} / ${database.length}`;
    document.getElementById('final-raven-score').innerText = `${ravenScore} / ${database.length}`;

    const winnerText = document.getElementById('winner-announcement');
    if (humanScore > ravenScore) {
        winnerText.innerText = "Wow! You beat RAVEN!";
    } else if (ravenScore > humanScore) {
        winnerText.innerText = "RAVEN wins this round!";
    } else {
        winnerText.innerText = "It's a tie!";
    }

    showScreen('score-screen');
}

function resetDemo() {
    showScreen('welcome-screen');
}