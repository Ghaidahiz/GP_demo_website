/* --- THE DATABASE --- */
// This is the master pool of all possible images.
const masterDatabase = [
    // --- FAKE IMAGES (4) ---
    { imagePath: "GP1/fake1.png", groundTruth: "fake", ravenPrediction: "fake" },
    { imagePath: "GP1/fake3.jpg", groundTruth: "fake", ravenPrediction: "fake" },
    { imagePath: "GP1/fake5.png", groundTruth: "fake", ravenPrediction: "real" },
    { imagePath: "GP1/fake6.png", groundTruth: "fake", ravenPrediction: "fake" },

    // --- REAL IMAGES (5) ---
    { imagePath: "GP1/real0.jpg", groundTruth: "real", ravenPrediction: "real" },
    { imagePath: "GP1/real2.jpg", groundTruth: "real", ravenPrediction: "real" },
    { imagePath: "GP1/real4.png", groundTruth: "real", ravenPrediction: "real" },
    { imagePath: "GP1/real5.jpg", groundTruth: "real", ravenPrediction: "fake" }, // Optional A
    { imagePath: "GP1/real6.jpg", groundTruth: "real", ravenPrediction: "fake" }, // Optional B
];

/* --- GAME LOGIC --- */
let currentRoundDatabase = []; // The images actually used in the current game
let currentIndex = 0;
let humanScore = 0;
let ravenScore = 0;

// Function to randomly shuffle an array
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
    
    // 1. Get all the mandatory images (everything EXCEPT real5 and real6)
    const mandatoryImages = masterDatabase.filter(img => 
        img.imagePath !== "GP1/real5.jpg" && img.imagePath !== "GP1/real6.jpg"
    );

    // 2. Get the optional images and pick ONE at random
    const optionalImages = masterDatabase.filter(img => 
        img.imagePath === "GP1/real5.jpg" || img.imagePath === "GP1/real6.jpg"
    );
    const randomlySelectedImage = optionalImages[Math.floor(Math.random() * optionalImages.length)];

    // 3. Build the database for this specific round (4 Fakes, 4 Reals)
    currentRoundDatabase = [...mandatoryImages, randomlySelectedImage];

    // 4. Update UI total (will be 8)
    document.getElementById('total-images').innerText = currentRoundDatabase.length;
    
    // 5. Shuffle the array for unpredictable ordering
    shuffleArray(currentRoundDatabase);

    loadChallenge();
}

function loadChallenge() {
    const currentData = currentRoundDatabase[currentIndex];
    
    // Set image and counter
    document.getElementById('product-image').src = currentData.imagePath;
    document.getElementById('current-image-number').innerText = currentIndex + 1;
    
    showScreen('challenge-screen');
}

function makeGuess(userChoice) {
    const currentData = currentRoundDatabase[currentIndex];
    
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
    if (currentIndex < currentRoundDatabase.length) {
        loadChallenge();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    document.getElementById('final-human-score').innerText = `${humanScore} / ${currentRoundDatabase.length}`;
    document.getElementById('final-raven-score').innerText = `${ravenScore} / ${currentRoundDatabase.length}`;

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