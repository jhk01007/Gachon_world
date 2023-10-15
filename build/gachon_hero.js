var keyhero = {};

keyhero.board = [];
keyhero.notePos = [-2.85, -1.4, 0, 1.4, 2.85];
keyhero.keyPressed = [0, 0, 0, 0, 0]; // f g h j k
keyhero.sounds = ['sound1', 'sound2', 'sound3', 'sound4', 'sound5', 'slide'];
keyhero.colors = ['#00e500', '#ff0000', '#ffff00', '#0000ff', '#ffa500'];
keyhero.position = [5, 4, 3, 2, 1, 2, 3, 5, 5, 5, 4, 5, 3, 5, 1, 2,
     4, 5, 2, 1, 2, 2, 4, 3, 1, 4, 2, 3, 3, 2, 2, 1, 1, 1, 3, 2, 2,
      3, 4, 4, 2, 4, 2, 3, 2, 5, 4, 2, 1, 2, 4, 3, 4, 2, 2, 1, 4, 5,
       4, 4, 4, 4, 1, 4, 3, 2, 5, 4, 4, 5, 3, 5, 1, 3, 2, 1, 1, 1, 2, 5,
        1, 1, 4, 5, 5, 1, 1, 1, 4, 2, 5, 5, 2, 2, 1, 5, 4, 1, 3, 2, 3, 2,
         1, 4, 3, 1, 3, 4, 2, 5, 2, 2, 1, 2, 3, 1, 1, 4, 2, 5, 4, 2, 1, 1,
          2, 3, 2, 4, 1, 1, 4, 1, 4, 2, 4, 3, 4, 4, 4, 4, 2, 5, 1, 2, 5, 2,
           1, 4, 3, 5, 4, 4, 3, 5, 4, 1, 3, 1 ,2, 1, 5, 4, 5, 1, 3, 5, 3,
            5, 1, 1, 3, 2, 5, 5, 2, 3, 5, 2, 1, 2, 5, 4, 1, 2, 4, 2, 2, 3,
             5, 2, 4, 5, 1, 5, 3, 1, 4, 1, 3, 4, 5, 2, 3, 1, 3, 1, 5, 2, 2,
              3, 3, 5, 3, 4, 5, 5, 4, 4, 4, 5, 3, 5, 1, 1, 5, 4, 3, 2, 2,
               2, 1, 3, 1, 2, 3, 4, 2, 1, 1, 1, 3];
keyhero.interval = [0.228, 2.407, 2.856, 3.805, 4.635, 5.161, 6.433, 6.982, 9.755, 11.118,
    12.034, 12.548, 13.146, 13.446, 13.996, 14.361, 14.909, 15.462, 16.062, 16.631,
     17.25, 17.753, 18.821, 19.265, 20.113, 21.21, 21.514, 21.926, 23.239, 24.287,
      24.704, 25.616, 25.924, 28.763, 29.224, 30.553, 31.537, 31.899, 32.219, 32.815,
       33.414, 34.096, 34.445, 34.792, 35.501, 36.163, 37.237, 37.619, 38.085, 38.55,
        39.499, 39.781, 40.131, 40.411, 41.609, 41.989, 42.425, 43.255, 43.72, 44.268,
         44.667, 45.019, 45.449, 45.851, 46.248, 46.598, 47.146, 47.559, 47.811, 48.141,
          48.442, 49.008, 49.522, 49.942, 50.319, 50.571, 50.948, 51.516, 52.015, 52.448,
           52.897, 53.246, 53.414, 54.044, 54.427, 55.84, 56.537, 56.894, 57.403, 57.669,
            57.968, 59.468, 60.196, 60.364, 61.043, 61.391, 62.228, 62.617, 62.972, 63.372,
             63.858, 64.623, 65.209, 65.466, 65.714, 65.997, 66.38, 66.727, 67.245, 67.543,
              67.926, 68.341, 68.607, 68.955, 69.453, 69.771, 70.119, 70.355, 70.817, 71.002,
               71.204, 71.739, 71.98, 72.344, 72.632, 72.834, 73.278, 73.951, 74.226, 74.709,
                75.022, 76.155, 76.653, 77.213, 77.716, 78.384, 79.279, 80.161, 81.292, 81.824,
                 82.151, 82.52, 82.969, 83.302, 83.685, 84.216, 85.263, 85.602, 86.178, 86.861,
                  88.713, 89.271, 89.992, 90.4, 91.25, 92.014, 92.546, 93.351, 94.424, 94.997,
                   95.437, 96.252, 96.634, 97.198, 98.402, 98.764, 99.214, 99.71, 100.199, 100.458,
                    100.757, 101.112, 101.488, 101.707, 101.99, 102.173, 102.552, 103.084, 103.617,
                     103.93, 104.465, 104.729, 105.579, 105.861, 106.063, 106.344, 106.66, 106.974,
                      107.591, 108.17, 108.561, 108.97, 109.534, 110.035, 110.383, 110.848, 111.113,
                       113.058, 113.574, 113.856, 114.09, 114.486, 115.017, 115.617, 116.997, 117.378,
                        117.696, 118.162, 118.625, 118.952, 119.424, 119.691, 119.991, 120.389, 120.971,
                         121.218, 121.818, 122.468, 122.93, 123.497, 124.329, 125.042, 125.426, 125.831,
                          126.626, 127.138, 127.421, 127.719, 128.101, 128.402, 128.933, 129.514, 129.827,
                           130.104, 130.496, 130.779, 131.126, 131.394, 131.843, 132.259, 132.507];
keyhero.index = 0;
keyhero.lives = 5;
keyhero.life = [];

keyhero.gameover = false;
var score = document.getElementById("points");
var points = 0;
//keyhero.runtime = Clock.getElapsedTime();

//Controller
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 70) {        /*f*/
        keyhero.keyPressed[0] = 1;
        setTimeout(function () {
            keyhero.keyPressed[0] = 0;
        }, 200);
    } else if (keyCode == 71) { /*g*/
        keyhero.keyPressed[1] = 1;
        setTimeout(function () {
            keyhero.keyPressed[1] = 0;
        }, 200);
    } else if (keyCode == 72) { /*h*/
        keyhero.keyPressed[2] = 1;
        setTimeout(function () {
            keyhero.keyPressed[2] = 0;
        }, 200);
    } else if (keyCode == 74) { /*j*/
        keyhero.keyPressed[3] = 1;
        setTimeout(function () {
            keyhero.keyPressed[3] = 0;
        }, 200);
    } else if (keyCode == 75) { /*k*/
        keyhero.keyPressed[4] = 1;
        setTimeout(function () {
            keyhero.keyPressed[4] = 0;
        }, 200);
    }
}

//not currently used
keyhero.boardInit = function () {
    for (let x = 0; x < 10; x++) {
        keyhero.board[x] = [];
        for (let y = 0; y < 10; y++) {
            keyhero.board[x][y] = 0;
        }
    }
};

keyhero.addScore = function (pts) {
    points += pts;
    keyhero.updateScore();
};

keyhero.updateScore = function () {
    score.innerHTML = "Score: " + points;
};


keyhero.init = function () {
    $("#play").hide();
    $("#text").hide();
    $("#score").show();

    //Scene
    keyhero.scene = new THREE.Scene();

    //Camera
    keyhero.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    keyhero.camera.position.x = 0;
    keyhero.camera.position.y = 7;
    keyhero.camera.position.z = 7;
    keyhero.camera.rotation.x = -89;
    keyhero.scene.add(keyhero.camera);

    var bar1 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, .6), new THREE.MeshBasicMaterial({ color: keyhero.colors[0], transparent: true, opacity: 0.5 }));
    bar1.position.x = -3;
    bar1.position.y = 0;
    bar1.position.z = 7.2;
    var bar2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.2, .5), new THREE.MeshBasicMaterial({ color: keyhero.colors[1], transparent: true, opacity: 0.5 }));
    bar2.position.x = -1.4;
    bar2.position.y = 0;
    bar2.position.z = 7.2;
    var bar3 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.4, .5), new THREE.MeshBasicMaterial({ color: keyhero.colors[2], transparent: true, opacity: 0.5 }));
    bar3.position.x = 0;
    bar3.position.y = 0;
    bar3.position.z = 7.2;
    var bar4 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.2, .5), new THREE.MeshBasicMaterial({ color: keyhero.colors[3], transparent: true, opacity: 0.5 }));
    bar4.position.x = 1.4;
    bar4.position.y = 0;
    bar4.position.z = 7.2;
    var bar5 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, .6), new THREE.MeshBasicMaterial({ color: keyhero.colors[4], transparent: true, opacity: 0.5 }));
    bar5.position.x = 3;
    bar5.position.y = 0;
    bar5.position.z = 7.2;

    var life = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, .6), new THREE.MeshBasicMaterial({ color: "#551A8B", }));
    life.position.x = -6;
    life.position.y = 0;
    life.position.z = 4.2;
    var life2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, .6), new THREE.MeshBasicMaterial({ color: "#551A8B", }));
    life2.position.x = -6;
    life2.position.y = 0;
    life2.position.z = 3.2;
    var life3 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, .6), new THREE.MeshBasicMaterial({ color: "#551A8B", }));
    life3.position.x = -6;
    life3.position.y = 0;
    life3.position.z = 2.2;
    var life4 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, .6), new THREE.MeshBasicMaterial({ color: "#551A8B", }));
    life4.position.x = -6;
    life4.position.y = 0;
    life4.position.z = 1.2;
    var life5 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, .6), new THREE.MeshBasicMaterial({ color: "#551A8B", }));
    life5.position.x = -6;
    life5.position.y = 0;
    life5.position.z = 0;

    keyhero.life.push(life);
    keyhero.life.push(life2);
    keyhero.life.push(life3);
    keyhero.life.push(life4);
    keyhero.life.push(life5);


    keyhero.scene.add(bar1);
    keyhero.scene.add(bar2);
    keyhero.scene.add(bar3);
    keyhero.scene.add(bar4);
    keyhero.scene.add(bar5);
    keyhero.scene.add(life);
    keyhero.scene.add(life2);
    keyhero.scene.add(life3);
    keyhero.scene.add(life4);
    keyhero.scene.add(life5);

    //renderer
    keyhero.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    keyhero.renderer.setClearColor(0xdee0e5, 1);
    keyhero.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(keyhero.renderer.domElement);

    //Grid
    var grid = new THREE.GridHelper(15, 5, 0x3f3f3f, 0x3f3f3f);
    grid.position.x = 0;
    grid.position.y = 0;
    grid.position.z = 0;
    grid.scale.set(.5, 1, 1);

    keyhero.scene.add(grid);
    keyhero.renderer.render(keyhero.scene, keyhero.camera);

    keyhero.boardInit();

    keyhero.game();
};
var songFlag = 0;
var interval = keyhero.interval[0] * 1000;
console.log(keyhero.position.length);
keyhero.game = function () {
    if(songFlag === 0){
        document.getElementById("gachon").play();
        songFlag = 1;
    }
        
    if (!keyhero.gameover) {

        setTimeout(function () {

            //position random cube
            posX = keyhero.position[keyhero.index] - 1;
            //alert("loc:"+keyhero.notePos[posX] + " num:" + posX);   /*WORKS*/

            //spawn note
            var note = new THREE.Mesh(new THREE.BoxGeometry(1, .5, .5), new THREE.MeshBasicMaterial({ color: keyhero.colors[posX] }));
            note.position.x = keyhero.notePos[posX];
            note.position.y = .5;
            note.position.z = -6;
            note.x = posX;
            keyhero.scene.add(note);
            var move = function () {
                requestAnimationFrame(move);
                if (note.position.z <= 7.4) {
                    //move note
                    note.position.z += .115;

                    //check note hit
                    if (keyhero.keyPressed[note.x] == 1 && note.position.z >= 7.1) {

                        keyhero.addScore(20);

                        keyhero.scene.remove(note);
                        cancelAnimationFrame(move);
                        //nullify function and note freeing memory and ending function, needed
                        note = undefined;
                        move = undefined;
                    }
                    keyhero.renderer.render(keyhero.scene, keyhero.camera);
                }
                //note scrolls past
                else {
                    keyhero.lives -= 1;
                    keyhero.scene.remove(keyhero.life[keyhero.lives]);

                    keyhero.scene.remove(note);
                    keyhero.renderer.render(keyhero.scene, keyhero.camera);
                    cancelAnimationFrame(move);
                    //nullify function and note freeing memory and ending function
                    note = undefined;
                    move = undefined;

                    // if (keyhero.lives == 0) {
                    //     window.location.replace("gameOver.html");
                    // }
                }
            };

            move();
            if(keyhero.index === keyhero.interval.length){
                setTimeout(function() {window.location.replace("gameOver.html")}, 7000);
                
                return;
            } else{
                interval = (keyhero.interval[keyhero.index + 1] - keyhero.interval[keyhero.index]) * 1000;
                keyhero.index++;
            }
        
            //recursive call
            keyhero.game();

        }, interval);

    }
    else {
        Through
        return;
    }

};
