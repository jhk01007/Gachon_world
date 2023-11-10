let count = 0;
let topScore = localStorage.getItem("topScore") || 0;
document.getElementById('topScore').textContent = topScore;

const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const gameDiv = document.getElementById('game');
const timerDisplay = document.getElementById('timer');
const counterDisplay = document.getElementById('counter');
const topScoreDisplay = document.getElementById('topScore'); 
const restartButton = document.getElementById('restartButton');
const homeButton = document.getElementById('homeButton');
const gameOverDiv = document.getElementById('gameOver');

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    gameDiv.style.display = 'block';
    gameOverDiv.style.display = 'none';

    let timeLeft = 10000; // Change the initial time to 10 seconds (in milliseconds)
    const timerId = setInterval(() => {
        timeLeft -= 100; // Adjust the interval to 100ms (0.1 seconds)
        timerDisplay.textContent = (timeLeft / 1000).toFixed(1); // Display time in seconds with one decimal place

        if (timeLeft <= 0) {
            clearInterval(timerId);
            window.removeEventListener('click', onMouseClick);
            alert(`Time's up! You clicked ${count} times.`);
            
            if (count > topScore) { 
                topScore = count;
                localStorage.setItem("topScore", topScore);
                document.getElementById('topScore').textContent = topScore;
            }
            count = 0;
            counterDisplay.textContent = count;

            gameOverDiv.style.display = 'block';
        }
    }, 100); // Adjust the interval to 100ms (0.1 seconds)

    window.addEventListener('click', onMouseClick);
});

function incrementCounter() {
    count++;
    counterDisplay.textContent = count;
}

function onMouseClick(event) {
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        incrementCounter(); 
        console.log("You clicked on the box!");
    }
}

// Added: Restart button click event handler
restartButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameOverDiv.style.display = "none";
    startButton.click();
});