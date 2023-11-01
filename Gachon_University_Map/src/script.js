import * as THREE from "three";
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getWeather } from "./weather.js";
import {createGrassFloor, createRedBrickFloor, createGrayBrickFloor, createDirtFloor, createTree} from "./create.js";
let camera, scene, renderer, controls;

const objects = [];

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

// gltf loader
const loader = new GLTFLoader();

class Snowflake {
  constructor() {
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
    );
    this.mesh.position.set(
      (Math.random() - 0.5) * 1000,
      Math.random() * 500 + 500,
      (Math.random() - 0.5) * 1000
    );
    this.speed = Math.random() * 0.5 + 0.5;
  }

  update() {
    this.mesh.position.y -= this.speed;
    if (this.mesh.position.y < 0) {
      this.mesh.position.y = Math.random() * 500 + 500;
    }
  }
}

// 눈송이 인스턴스들을 저장할 배열
let snowflakes = [];

// 눈송이들을 생성하고 장면에 추가
function createSnowflakes() {
  for (let i = 0; i < 5000; i++) {
    let snowflake = new Snowflake();
    snowflakes.push(snowflake);
    scene.add(snowflake.mesh);
  }
}

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.y = 10;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87CEEB);

  const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
  light.position.set(0.5, 1, 0.75);
  scene.add(light);

  controls = new PointerLockControls(camera, document.body);

  const blocker = document.getElementById("blocker");
  const instructions = document.getElementById("instructions");

  instructions.addEventListener("click", function () {
    controls.lock();
  });

  controls.addEventListener("lock", function () {
    blocker.style.display = "none";
    instructions.style.display = "none";
  });

  controls.addEventListener("unlock", function () {
    blocker.style.display = "";
    instructions.style.display = "";
  });

  scene.add(controls.getObject());

  const onKeyDown = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = true;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = true;
        break;

      case "Space":
        if (canJump === true) velocity.y += 350;
        canJump = false;
        break;
    }
  };

  const onKeyUp = function (event) {
    switch (event.code) {
      case "ArrowUp":
      case "KeyW":
        moveForward = false;
        break;

      case "ArrowLeft":
      case "KeyA":
        moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyD":
        moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);

  raycaster = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    10
  );

  // floor
  // 풀바닥 - 무한대가 들어갈 위치
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const floor = createGrassFloor(i * 40, j * -40);
      scene.add(floor);
    }
  }

  // 빨간 벽돌 - 무한대 왼편 바닥
  for (let i = 0; i < 5; i++) {
    const floor = createRedBrickFloor(-40, i * -40);
    scene.add(floor);
  }
  for (let i = 0; i < 10; i++) {
    const floor = createRedBrickFloor(-40 - i * 40, -160);
    scene.add(floor);
  }

  // 회색 벽돌 - 가천관 쪽 바닥
  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 4; j++) {
      const floor = createGrayBrickFloor(-80 + i * 40, -200 + j * -40);
      scene.add(floor);
    }
  }
  // 흙 바닥 - 예대쪽 바닥
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 9; j++) {
      // 가천관 왼쪽 회색 콘크리트
      if(i >= 8 && j >=5)
        continue;

      // 빨간 벽돌길
      if(i == 9 && j <= 4)
        continue;
      else if(j == 4)
        continue;
      const floor = createDirtFloor(-400 + i * 40, j * -40);
      scene.add(floor);
    }
  }
  //
  // 나무
  const tree1 = createTree();
  tree1.position.x = 0;
  tree1.position.z = 0;
  scene.add(tree1);

  const tree2 = createTree();
  tree2.position.x = 100;
  tree2.position.z = 0;
  scene.add(tree2);

  // 빨간벽돌 왼쪽 나무
  for (let i = 0; i < 4; i++) {
    const tree = createTree();
    tree.position.x = -80;
    tree.position.z = i * -40;
    scene.add(tree);
  }
  //

//건물 로드하기
  // 가천관 로드하기
  loader.load(
    '../building/gachongwan.gltf',
    function (gltf) {
      const model = gltf.scene;
      model.position.set(40, 1, -280);
      model.scale.set(8, 8, 8);
      model.rotation.y = (Math.PI / 2) * 3;
      scene.add(gltf.scene);

    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
      console.log('An error happened');
    }
  );

  // 무한대 로드하기
  loader.load(
    '../building/muhandae.gltf',
    function (gltf) {
      const model = gltf.scene;
      model.position.set(80, 4.5, -72);
      model.scale.set(3, 3, 3);
      model.rotation.y = (Math.PI / 2) * 3;
      scene.add(gltf.scene);

    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
      console.log('An error happened');
    }
  );
// 


  // 예대 2 건물
  loader.load(
    '../building/art2/scene.gltf',
    function (gltf) {
      const model = gltf.scene;
      model.position.set(-320, 1, -160);
      model.scale.set(100, 100, 100);
      model.rotation.y = Math.PI;
      scene.add(gltf.scene);

    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    // called when loading has errors
    function (error) {
      console.log('An error happened');
    }
  );


  //날씨 불러오기
  setTimeout( async () => {
    var weatherId = await getWeather();
    // weatherId = 600;
    console.log(weatherId);
    if(weatherId >= 200 && weatherId <= 531){
      console.log("Rain");
      // 비올 때 이벤트를 넣어주세요
    } else if(weatherId <= 600 && weatherId <= 622){
      console.log("Snow");
      createSnowflakes();
    } else if(weatherId === 800){
      console.log("Clear");
    } else if(weatherId <= 701 && weatherId <= 804){
      console.log("Clouds");
      //흐릴 때 이벤트 넣어주세요
    } else {
      console.log("Not Defined");
    }
  }, 10);
  
  // 랜더링
  renderer = new THREE.WebGLRenderer({ antialias: true, depth: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  const time = performance.now();

  if (controls.isLocked === true) {
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y -= 10;

    const intersections = raycaster.intersectObjects(objects, false);

    const onObject = intersections.length > 0;

    const delta = (time - prevTime) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

    if (onObject === true) {
      velocity.y = Math.max(0, velocity.y);
      canJump = true;
    }

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);

    controls.getObject().position.y += velocity.y * delta; // new behavior

    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;
    }
  }

  prevTime = time;

  snowflakes.forEach(snowflake => {
    snowflake.update();
  });

  renderer.render(scene, camera);
}