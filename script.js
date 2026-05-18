/* --- THE DATABASE (NO SQL NEEDED) --- */
// Update this array with your actual image file names and RAVEV's results
const database = [
    {
        imagePath: "images/product_01.jpg", 
        groundTruth: "real",
        ravevPrediction: "real"
    },
    {
        imagePath: "images/product_02.jpg",
        groundTruth: "fake",
        ravevPrediction: "fake"
    },
    {
        imagePath: "images/product_03.jpg",
        groundTruth: "fake",
        ravevPrediction: "real" 
    }
];

/* --- GAME LOGIC --- */
let currentIndex = 0;
let humanScore = 0;
let ravevScore = 0;

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
    ravevScore = 0;
    document.getElementById('total-images').innerText = database.length;
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

    // Check RAVEV Answer
    const isRavevCorrect = (currentData.ravevPrediction === currentData.groundTruth);
    if (isRavevCorrect) ravevScore++;

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
    document.getElementById('ravev-answer').innerText = currentData.ravevPrediction.toUpperCase();
    
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
    document.getElementById('final-ravev-score').innerText = `${ravevScore} / ${database.length}`;

    const winnerText = document.getElementById('winner-announcement');
    if (humanScore > ravevScore) {
        winnerText.innerText = "Wow! You beat the AI!";
    } else if (ravevScore > humanScore) {
        winnerText.innerText = "RAVEV wins this round!";
    } else {
        winnerText.innerText = "It's a tie!";
    }

    showScreen('score-screen');
}

function resetDemo() {
    showScreen('welcome-screen');
}