
var keyhero = {};

var bar1, bar2, bar3, bar4, bar5;
var audioName, gameName;
var combo = 0;


keyhero.board = [];
keyhero.notePos = [-2.85, -1.4, 0, 1.4, 2.85];
keyhero.keyPressed = [0, 0, 0, 0, 0]; // f g h j k
keyhero.sounds = ['sound1', 'sound2', 'sound3', 'sound4', 'sound5', 'slide'];
keyhero.colors = ['#00e500', '#ff0000', '#ffff00', '#0000ff', '#ffa500'];
keyhero.position;
keyhero.interval;
keyhero.index = 0;
keyhero.lives = 5;
keyhero.life = [];

keyhero.gameover = false;
var score = document.getElementById("points");
var points = 0;
//keyhero.runtime = Clock.getElapsedTime();


function getMenuItemValue(item) {
    gameName = item.innerText;
    audioName = gameName + ".mp3";
}


function changeColor(bar) {
    bar.material.opacity = 1.0;
    keyhero.renderer.render(keyhero.scene, keyhero.camera);
}

function restoreColor(bar) {
    bar.material.opacity = 0.5;
    keyhero.renderer.render(keyhero.scene, keyhero.camera);
}


//Controller
document.addEventListener("keyup", onDocumentKeyUp, false);
function onDocumentKeyUp(event) {
    var keyCode = event.which;
    if (keyCode == 70) {        /*f*/
        restoreColor(bar1);
    } else if (keyCode == 71) { /*g*/
        restoreColor(bar2);

    } else if (keyCode == 72) { /*h*/
        restoreColor(bar3);

    } else if (keyCode == 74) { /*j*/
        restoreColor(bar4);

    } else if (keyCode == 75) { /*k*/
        restoreColor(bar5);

    }
}


//Controller
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 70) {        /*f*/
        keyhero.keyPressed[0] = 1;
        changeColor(bar1);
        setTimeout(function () {
            keyhero.keyPressed[0] = 0;
        }, 200);
    } else if (keyCode == 71) { /*g*/
        keyhero.keyPressed[1] = 1;
        changeColor(bar2);
        setTimeout(function () {
            keyhero.keyPressed[1] = 0;
        }, 200);
    } else if (keyCode == 72) { /*h*/
        keyhero.keyPressed[2] = 1;
        changeColor(bar3);
        setTimeout(function () {
            keyhero.keyPressed[2] = 0;
        }, 200);
    } else if (keyCode == 74) { /*j*/
        keyhero.keyPressed[3] = 1;
        changeColor(bar4);
        setTimeout(function () {
            keyhero.keyPressed[3] = 0;
        }, 200);
    } else if (keyCode == 75) { /*k*/
        keyhero.keyPressed[4] = 1;
        changeColor(bar5);
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


function updateComboText() {
    const comboText = combo.toString();
    const plusScore = '+' + (20 + combo * 5).toString();
    const loader = new THREE.FontLoader();
    loader.load('https://cdn.rawgit.com/mrdoob/three.js/r128/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        const comboGeometry = new THREE.TextGeometry(comboText, {
            font: font,
            size: 1,
            height: 0.2,
            curveSegments: 12,
        });

        const plusGeometry = new THREE.TextGeometry(plusScore, {
            font: font,
            size: 0.5,
            height: 0.1,
            curveSegments: 12,
        });

        const comboMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const comboMesh = new THREE.Mesh(comboGeometry, comboMaterial);

        const plusMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
        const plusMesh = new THREE.Mesh(plusGeometry, plusMaterial);

        // Remove the old combo text (if any)
        const existingCombo = keyhero.scene.getObjectByName('comboText');
        if (existingCombo) {
            keyhero.scene.remove(existingCombo);
        }
        // Remove the old combo text (if any)
        const existingPlus = keyhero.scene.getObjectByName('plusScore');
        if (existingPlus) {
            keyhero.scene.remove(existingPlus);
        }

        comboMesh.position.set(0, 2, 0);  // x, y, z 좌표를 조절
        plusMesh.position.set(0, 1, 0);  // x, y, z 좌표를 조절
        comboMesh.name = 'comboText'; // Set a unique name for the textMesh
        plusMesh.name = 'plusScore'
        keyhero.scene.add(comboMesh); 
        if(combo != 0) // 콤보가 0일때는 점수 추가 표시가 뜨지 않게
            keyhero.scene.add(plusMesh);
    });
}

keyhero.addScore = function (pts) {
    combo++;
    points += pts + combo * 5
    keyhero.updateScore();
    updateComboText();

    keyhero.renderer.render(keyhero.scene, keyhero.camera);
};

keyhero.updateScore = function () {
    score.innerHTML = "Score: " + points;
};


keyhero.init = function () {
    $("#play").hide();
    $("#returnToMap").hide();
    $("#text").hide();
    $(".vertical-menu").hide();
    $("#score").show();
    //$("#combo").show();


    //Scene
    keyhero.scene = new THREE.Scene();

    //Camera
    keyhero.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    keyhero.camera.position.x = 0;
    keyhero.camera.position.y = 7;
    keyhero.camera.position.z = 7;
    keyhero.camera.rotation.x = -89;
    keyhero.scene.add(keyhero.camera);

    bar1 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, .6), new THREE.MeshBasicMaterial({ color: keyhero.colors[0], transparent: true, opacity: 0.5 }));
    bar1.position.x = -3;
    bar1.position.y = 0;
    bar1.position.z = 7.2;
    bar2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.2, .5), new THREE.MeshBasicMaterial({ color: keyhero.colors[1], transparent: true, opacity: 0.5 }));
    bar2.position.x = -1.4;
    bar2.position.y = 0;
    bar2.position.z = 7.2;
    bar3 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.4, .5), new THREE.MeshBasicMaterial({ color: keyhero.colors[2], transparent: true, opacity: 0.5 }));
    bar3.position.x = 0;
    bar3.position.y = 0;
    bar3.position.z = 7.2;
    bar4 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.2, .5), new THREE.MeshBasicMaterial({ color: keyhero.colors[3], transparent: true, opacity: 0.5 }));
    bar4.position.x = 1.4;
    bar4.position.y = 0;
    bar4.position.z = 7.2;
    bar5 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, .6), new THREE.MeshBasicMaterial({ color: keyhero.colors[4], transparent: true, opacity: 0.5 }));
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

    fetch("./build/" + gameName + ".json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            keyhero.position = data.position;
            keyhero.interval = data.interval;
            songFlag = 0;
            interval = keyhero.interval[0] * 1000;
            console.log(keyhero.position.length);
            keyhero.game();
        })
        .catch(error => {
            console.error('Error:', error);
        });

};
var songFlag;
var interval;
var maxCombo = 0;
var success = 1;

keyhero.game = function () {


    if (songFlag === 0) {
        document.getElementById("audio").setAttribute('src', 'build/' + audioName);
        document.getElementById("audio").load();
        document.getElementById("audio").play();
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

                    if(combo > maxCombo)
                        maxCombo = combo;
                    combo = 0;
                    updateComboText();

                    keyhero.scene.remove(note);
                    keyhero.renderer.render(keyhero.scene, keyhero.camera);
                    cancelAnimationFrame(move);
                    //nullify function and note freeing memory and ending function
                    note = undefined;
                    move = undefined;

                     if (keyhero.lives == 0) {
                        success = 0;
                         var redirectURL = "gameOver.html?score=" + points + "&maxCombo=" + maxCombo + "&success=" + success;
                         window.location.replace(redirectURL);
                    }
                }
            };

            move();

        


            if (keyhero.index === keyhero.interval.length) {
                setTimeout(function () { 
                    var redirectURL = "gameOver.html?score=" + points + "&combo=" + combo;
                    window.location.replace(redirectURL); 
                }, 7000);

                return;
            } else {
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

