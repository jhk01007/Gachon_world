var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;
var img1 = new Image();
img1.src = '공룡.png';

var img2 = new Image();
img2.src = '허들.jpg';
 
var dino = {
    x: 10,
    y: 250,
    initialY: 250, // 초기 y 위치 저장
    width: 50,
    height: 50,
    isJumping: false, // 점프 중 여부를 나타내는 플래그
    jump() {
        if (!this.isJumping && this.y == this.initialY) { // 점프 중이 아니고 초기 위치에 있을 때만 점프 가능
            this.isJumping = true;
            jumpingTime = 0;
        }
    },
    draw() {
        ctx.fillStyle = 'green';
        ctx.drawImage(img1, this.x, this.y, this.width, this.height);
    }
}

class Cactus {
    constructor() {
        this.x = canvas.width;
        this.y = 250;
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

function byFrame() {
    animation = requestAnimationFrame(byFrame);
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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
        clearInterval(timeInterval);
        cancelAnimationFrame(animation);
        if (gameRunning) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'red';
            ctx.font = '40px Arial';
            ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
            ctx.fillText('Score: ' + score, canvas.width / 2 - 60, canvas.height / 2 + 40);
        }
    }

    obstacleSpeed += obstacleSpeedIncrement;
}

byFrame();

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && gameRunning) {
        dino.jump();
    }
})

function collision(dino, cactus) {
    var xDifference = cactus.x - (dino.x + dino.width);
    var yDifference = cactus.y - (dino.y + dino.height);

    if (xDifference < 0 && yDifference < 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        gameRunning = false;
    } else if (cactus.x < 0) {
        cactusmix.shift();
        score++;
    }

    if (!gameRunning) {
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText('Final Score: ' + score, canvas.width / 2 - 80, canvas.height / 2 + 70);
    }
}
