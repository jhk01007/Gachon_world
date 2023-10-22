let count = 0;
let topScore = localStorage.getItem("topScore") || 0;
topScoreDisplay.textContent=topScore; 

const startScreen = document.getElementById('startScreen');
const startButton = document.getElementById('startButton');
const gameDiv = document.getElementById('game');
const timerDisplay = document.getElementById('timer');
const counterDisplay = document.getElementById('counter');
const topScoreDisplay = document.getElementById('topScore'); 
const restartButton=document.getElementById('restartButton');
const homeButton=document.getElementById('homeButton');
const gameOverDiv=document.getElementById('gameOver');

startButton.addEventListener('click', () => {
    startScreen.style.display='none';
    gameDiv.style.display='block';
    gameOverDiv.style.display='none'; // Hide Game Over Screen at the start of Game

    let timeLeft=50;
    const timerId=setInterval(() => {
        timeLeft--;
        timerDisplay.textContent=timeLeft;

        if(timeLeft <= 0) {
            clearInterval(timerId);
            window.removeEventListener('click', onMouseClick); // Remove the click event listener when the game ends.
            alert(`Time's up! You clicked ${count} times.`);
	        if(count > topScore) { 
                topScore=count; 
                localStorage.setItem("topScore", topScore);
                topScoreDisplay.textContent=topScore;
            }
	        count=0;
	        counterDisplay.textContent=count;

	        gameOverDiv.style.display='block'; // Showing the game Over screen
        }
    }, 100);

window.addEventListener('click', onMouseClick); // Add a click event listener when the game starts.
});

function incrementCounter() {
	count++;
	counterDisplay.textContent=count;
}

function onMouseClick(event) {
	raycaster.setFromCamera(mouse,camera);

	var intersects=raycaster.intersectObjects(scene.children,true);

	if(intersects.length >0){
	    incrementCounter(); 
	    console.log("You clicked on the box!");
	}
}

// Added: Restart button click event handler
restartButton.addEventListener("click", () => {
	startScreen.style.display="none";
	gameOverDiv.style.display="none";
	startButton.click(); // When you click the Restart button, the Start button click event occurs
});