var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var backgrounds = ['배경1.jpg', '배경2.jpg', '배경3.jpg', '배경4.jpg', '배경5.jpg', '배경6.jpg', '배경7.jpg', '배경8.jpg', '배경9.jpg', '배경10.jpg', '배경11.jpg', '배경12.jpg', '배경13.jpg'];

var backgroundIndex = Math.floor(Math.random() * backgrounds.length);
var background = new Image();
background.src = backgrounds[backgroundIndex];  

var img1 = new Image();
img1.src = '무한이1.png';

var img2 = new Image();
img2.src = '허들.png';

var img3 = new Image();
img3.src = '무한이2.png';

var dino = {
    x: 10,
    y: canvas.height - 100,
    initialY: canvas.height - 100,
    width: 50,
    height: 50,
    isJumping: false,
    jump() {
        if (!this.isJumping && this.y === this.initialY) {
            this.isJumping = true;
            jumpingTime = 0;
        }
    },
    draw() {
        ctx.fillStyle = 'green';
        if (this.isJumping) {
            ctx.drawImage(img3, this.x, this.y, this.width, this.height);
        } else {
            ctx.drawImage(img1, this.x, this.y, this.width, this.height);
        }
    },
};

class Cactus {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height - 100;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.drawImage(img2, this.x, this.y, this.width, this.height);
    }
}

var cactus = new Cactus();
cactus.draw();

var timer = 0;
var cactusmix = [];
var jumpingTime = 0;
var animation;
var obstacleSpeed = 2;
var obstacleSpeedIncrement = 0.001;
var score = 0;
var gameRunning = true;
var minCactusSpacing = 500;
var scoreX = 10;
var scoreY = 30;
var gameTime = 60;
var remainingTime = gameTime;
var timeInterval = setInterval(function () {
    remainingTime--;
    if (remainingTime <= 0) {
        clearInterval(timeInterval);
        gameRunning = false;
    }
}, 1000);

function initializeGame() {
    cactusmix = [];
    score = 0;
    remainingTime = gameTime;
    gameRunning = true;
    obstacleSpeed = 2;
    byFrame();
}

// Return to Map 버튼 이벤트 핸들러
document.getElementById('returnToMap').addEventListener('click', function() {
    window.location.href = '/Gachon_University_Map/src/index.html'; // 다른 페이지로 리디렉션
});

// Restart 게임 버튼 이벤트 핸들러
document.getElementById('restartGame').addEventListener('click', function() {
    initializeGame(); // 게임 재시작
});

function byFrame() {
    animation = requestAnimationFrame(byFrame);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.01 && (cactusmix.length === 0 || canvas.width - cactusmix[cactusmix.length - 1].x >= minCactusSpacing)) {
        var cactus = new Cactus();
        cactusmix.push(cactus);
    }
    cactusmix.forEach((a, i, o) => {
        if (a.x < 0 - a.width) {
            o.splice(i, 1);
        }
        a.x -= obstacleSpeed;
        a.draw();
        collision(dino, a);
    });

    if (dino.isJumping) {
        dino.y -= 1;
        jumpingTime++;
        if (jumpingTime > 100) {
            dino.isJumping = false;
            jumpingTime = 0;
        }
    } else {
        if (dino.y < dino.initialY) {
            dino.y += 1;
        }
    }
    dino.draw();

    if (gameRunning) {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Score: ' + score, scoreX, scoreY);
        ctx.fillText('Time: ' + remainingTime + 's', scoreX, scoreY + 30);
    }

    if (timer >= gameTime * 1000 || !gameRunning) {
        if (gameRunning) {
            ctx.fillStyle = 'red';
            ctx.font = '40px Arial';
            ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
            ctx.fillText('Score: ' + score, canvas.width / 2 - 60, canvas.height / 2 + 40);
        }


        // 랜덤한 배경 이미지를 다시 선택
        backgroundIndex = Math.floor(Math.random() * backgrounds.length);
        background.src = backgrounds[backgroundIndex];

        // 랜덤한 배경 이미지 그리기
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // 토탈 스코어 그리기
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Final Score: ' + score, canvas.width / 2 - 80, canvas.height / 2 + 70);

        clearInterval(timeInterval);
        cancelAnimationFrame(animation);
    }

    obstacleSpeed += obstacleSpeedIncrement;
}

byFrame();

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && gameRunning) {
        dino.jump();
    }
});

function collision(dino, cactus) {
    var xDifference = cactus.x - (dino.x + dino.width);
    var yDifference = cactus.y - (dino.y + dino.height);

    if (xDifference < 0 && yDifference < 0) {
        gameRunning = false;
    } else if (cactus.x < 0) {
        cactusmix.shift();
        score++;
    }
}