import * as THREE from "three";
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { getWeather } from "./weather.js";

import { createGrassFloor, createRedBrickFloor, createGrayBrickFloor, createDirtFloor, createLamp, smoke } from "./create.js";

let camera, scene, renderer, controls;
let cloudParticles = [], flash, rain, rainGeo, rainCount = 30000, cloudGeo, cloudMaterial, rainFlag = 0;


const objects = [];

let clock = new THREE.Clock();
let mixer;
let raycaster;
let avatar;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let cameraAngle = { theta: 0, phi: 0 };
let cameraDistance = 15;

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

function createSnow() {

  scene.background = new THREE.Color(0xffffff);

  const directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  cloudGeo = new THREE.PlaneGeometry(2000, 2000, 1, 1);
  cloudMaterial = new THREE.MeshLambertMaterial({
    map: smoke,
    transparent: true
  });

  for (let p = 0; p < 10; p++) {
    let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    cloud.position.set(
      Math.random() * 800 - 400,
      500,
      Math.random() * 500 - 450
    );
    cloud.rotation.x = 1.16;
    cloud.rotation.y = -0.12;
    cloud.rotation.z = Math.random() * 360;
    cloud.material.opacity = 0.2;
    cloudParticles.push(cloud);
    scene.add(cloud);
  }
  //기존 눈송이 생성 코드
  for (let i = 0; i < 5000; i++) {
    let snowflake = new Snowflake();
    snowflakes.push(snowflake);
    scene.add(snowflake.mesh);
  }

}

function createClouds() {

  scene.background = new THREE.Color(0xffffff);

  const directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  scene.fog = new THREE.FogExp2(0x11111f, 0.002);

  // 구름 생성 부분
  cloudGeo = new THREE.PlaneGeometry(2000, 2000, 1, 1);
  cloudMaterial = new THREE.MeshLambertMaterial({
    map: smoke,
    transparent: true
  });

  for (let p = 0; p < 10; p++) {
    let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    cloud.position.set(
      Math.random() * 800 - 400,
      500,
      Math.random() * 500 - 450
    );
    cloud.rotation.x = 1.16;
    cloud.rotation.y = -0.12;
    cloud.rotation.z = Math.random() * 360;
    cloud.material.opacity = 0.2;
    cloudParticles.push(cloud);
    scene.add(cloud);
  }
}

function createRainDrop() {

  rainFlag = 1;
  scene.background = new THREE.Color(0xffffff);
  const directionalLight = new THREE.DirectionalLight(0xffeedd);
  directionalLight.position.set(0, 0, 1);
  scene.add(directionalLight);

  flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
  flash.position.set(40, 700, -280);
  scene.add(flash);


  rainGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(rainCount * 3);

  for (let i = 0; i < rainCount; i++) {
    positions[i * 3] = Math.random() * 400 - 200;
    positions[i * 3 + 1] = Math.random() * 500 - 250;
    positions[i * 3 + 2] = Math.random() * 400 - 200;
  }

  rainGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

  let rainMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.1,
    opacity: 0.2,
    transparent: true
  });
  rain = new THREE.Points(rainGeo, rainMaterial);
  scene.add(rain);


  scene.fog = new THREE.FogExp2(0x11111f, 0.002);

  cloudGeo = new THREE.PlaneGeometry(2000, 2000, 1, 1);
  cloudMaterial = new THREE.MeshLambertMaterial({
    map: smoke,
    transparent: true
  });

  for (let p = 0; p < 10; p++) {
    let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
    cloud.position.set(
      Math.random() * 800 - 400,
      500,
      Math.random() * 500 - 450
    );
    cloud.rotation.x = 1.16;
    cloud.rotation.y = -0.12;
    cloud.rotation.z = Math.random() * 360;
    cloud.material.opacity = 0.2;
    cloudParticles.push(cloud);
    scene.add(cloud);
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
  camera.position.x = -40;
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
    blocker.style.display = "block";
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
      case "KeyD":
        moveLeft = true;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = true;
        break;

      case "ArrowRight":
      case "KeyA":
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
      case "KeyD":
        moveLeft = false;
        break;

      case "ArrowDown":
      case "KeyS":
        moveBackward = false;
        break;

      case "ArrowRight":
      case "KeyA":
        moveRight = false;
        break;
    }
  };

  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("keyup", onKeyUp);
  document.addEventListener('mousemove', function (event) {
    if (controls.isLocked === true) {
      cameraAngle.theta -= event.movementX * 0.005;
      cameraAngle.phi = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, cameraAngle.phi + event.movementY * 0.005));
    }

  });



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
      if (i >= 8 && j >= 5)
        continue;

      // 빨간 벽돌길
      if (i == 9 && j <= 4)
        continue;
      else if (j == 4)
        continue;
      const floor = createDirtFloor(-400 + i * 40, j * -40);
      scene.add(floor);
    }
  }
  //
  // 가로등
  createLamp(function (lamp) {
    lamp.position.x = 0;
    lamp.position.z = 0;
    scene.add(lamp);
  });
  createLamp(function (lamp) {
    lamp.position.x = 160;
    lamp.position.z = 0;
    scene.add(lamp);
  });
  createLamp(function (lamp) {
    lamp.position.x = 0;
    lamp.position.z = -160;
    scene.add(lamp);
  });
  createLamp(function (lamp) {
    lamp.position.x = 160;
    lamp.position.z = -160;
    scene.add(lamp);
  });
  createLamp(function (lamp) {
    lamp.position.x = -80;
    lamp.position.z = 0;
    scene.add(lamp);
  });
  createLamp(function (lamp) {
    lamp.position.x = -80;
    lamp.position.z = -120;
    scene.add(lamp);
  });
  createLamp(function (lamp) {
    lamp.position.x = -200;
    lamp.position.z = -200;
    scene.add(lamp);
  });
  //


  // 아바타 로드
  const avatarHeightAboveGround = 1.5;

  loader.load('../avatar/무한이_animation_adding_ver3.gltf', function (gltf) {
    avatar = gltf.scene;
    avatar.scale.set(1, 1, 1); // 아바타 크기 조절
    avatar.position.set(-40, avatarHeightAboveGround, 5); // 아바타 위치 설정, Adjust the Y position here
    avatar.rotation.y = Math.PI / 2;
    scene.add(avatar);

    // 아바타 위치를 바라보는 카메라 위치 설정
    mixer = new THREE.AnimationMixer(avatar);

    // 모든 애니메이션 클립을 반복 재생
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });

  }, undefined, function (error) {
    console.error(error);
  });
  //

  //건물 로드하기
  // 가천관 로드하기
  loader.load(
    '../building/gachongwan.gltf',
    function (gltf) {
      const model = gltf.scene;
      model.name = 'gachongwan'
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
      model.name = 'muhande'
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
      model.name = 'art'
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
  setTimeout(async () => {
    var weatherId = await getWeather();
    // weatherId = 800;
    console.log(weatherId);
    if (weatherId >= 200 && weatherId <= 531) {
      console.log("Rain");
      createRainDrop();
    } else if (weatherId >= 600 && weatherId <= 622) {
      console.log("Snow");
      createSnow();
    } else if (weatherId === 800) {
      console.log("Clear");
    } else if (weatherId >= 701 && weatherId <= 804) {
      console.log("Clouds");
      createClouds();
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

var collisionFlag1 = 0;
var collisionFlag2 = 0;
var collisionFlag3 = 0;
function checkCollision1() {
  // 'muhandae' 이름을 가진 모델을 씬에서 찾습니다.
  const muhandaeBuilding = scene.getObjectByName('muhande');
  if (!muhandaeBuilding) {
    console.warn('씬에서 muhandae 건물을 찾을 수 없습니다');
    return;
  }

  // 아바타의 위치를 가져옵니다.
  const avatarPosition = avatar.position.clone();

  // Raycaster를 생성합니다.
  const raycaster = new THREE.Raycaster();

  // 아바타 위치에서 위로 향하는 레이를 만듭니다.
  raycaster.set(avatarPosition, new THREE.Vector3(0, 1, 0));

  // 건물과의 교차를 확인합니다.
  const intersects = raycaster.intersectObject(muhandaeBuilding, true);

  // 교차가 감지되고 collisionFlag1가 0인 경우에 처리합니다.
  if (intersects.length > 0 && collisionFlag1 === 0) {
    // 충돌이 감지되었으므로 게임 HTML 페이지로 리다이렉션합니다.
    setTimeout(function () {
      window.location.href = '/HURDLE_RUN/HurdleRunLoading.html';
    }, 3000);
    console.log("부딪힘");
    collisionFlag1 = 1;
  }
}

function checkCollision2() {
  // 'muhandae' 이름을 가진 모델을 씬에서 찾습니다.
  const muhandaeBuilding2 = scene.getObjectByName('gachongwan');
  if (!muhandaeBuilding2) {
    console.warn('씬에서 muhandae 건물을 찾을 수 없습니다');
    return;
  }

  // 아바타의 위치를 가져옵니다.
  const avatarPosition = avatar.position.clone();

  // Raycaster를 생성합니다.
  const raycaster = new THREE.Raycaster();

  // 아바타 위치에서 위로 향하는 레이를 만듭니다.
  raycaster.set(avatarPosition, new THREE.Vector3(0, 1, 0));

  // 건물과의 교차를 확인합니다.
  const intersects = raycaster.intersectObject(muhandaeBuilding2, true);

  // 교차가 감지되고 collisionFlag2가 0인 경우에 처리합니다.
  if (intersects.length > 0 && collisionFlag2 === 0) {
    // 충돌이 감지되었으므로 게임 HTML 페이지로 리다이렉션합니다.
    setTimeout(function () {
      window.location.href = '/MouseTouchGame/MousetouchGame.html';
    }, 3000);
    console.log("부딪힘");
    collisionFlag2 = 1;
  }
}
function checkCollision3() {
  // 'muhandae' 이름을 가진 모델을 씬에서 찾습니다.
  const muhandaeBuilding3 = scene.getObjectByName('art');
  if (!muhandaeBuilding3) {
    console.warn('씬에서 muhandae 건물을 찾을 수 없습니다');
    return;
  }

  // 아바타의 위치를 가져옵니다.
  const avatarPosition = avatar.position.clone();

  // Raycaster를 생성합니다.
  const raycaster = new THREE.Raycaster();

  // 아바타 위치에서 위로 향하는 레이를 만듭니다.
  raycaster.set(avatarPosition, new THREE.Vector3(0, 1, 0));

  // 건물과의 교차를 확인합니다.
  const intersects = raycaster.intersectObject(muhandaeBuilding3, true);

  // 교차가 감지되고 collisionFlag2가 0인 경우에 처리합니다.
  if (intersects.length > 0 && collisionFlag3 === 0) {
    // 충돌이 감지되었으므로 게임 HTML 페이지로 리다이렉션합니다.
    setTimeout(function () {
      window.location.href = '/Gachon_Hero/gachonHeroLoading.html';
    }, 3000);
    console.log("부딪힘");
    collisionFlag3 = 1;
  }
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta(); // 애니메이션 업데이트를 위한 시간 차이 계산

  if (mixer) {
    mixer.update(delta); // 애니메이션 믹서 업데이트
  }


  if (rainFlag == 1) {
    const positions = rainGeo.attributes.position.array;
    for (let i = 0; i < rainCount; i++) {
      const p = {
        x: positions[i * 3],
        y: positions[i * 3 + 1],
        z: positions[i * 3 + 2],
        velocity: 0,
      };
      p.velocity -= Math.random() * 4;
      p.y += p.velocity;
      if (p.y < -200) {
        p.y = 200;
        p.velocity = 0;
      }
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
    }

    rainGeo.attributes.position.needsUpdate = true;
    rain.rotation.y += 0.002;


    if (Math.random() > 0.8 || flash.power > 100) {
      if (flash.power < 100)
        flash.position.set(
          40,
          700,
          -280
        );
      flash.power = 100 + Math.random() * 500;
    }
  }


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


    prevTime = time;

    snowflakes.forEach(snowflake => {
      snowflake.update();
    });

    let offsetX = cameraDistance * Math.sin(cameraAngle.theta) * Math.cos(cameraAngle.phi);
    let offsetY = cameraDistance * Math.sin(cameraAngle.phi);
    let offsetZ = cameraDistance * Math.cos(cameraAngle.theta) * Math.cos(cameraAngle.phi);

    camera.position.x = avatar.position.x + offsetX;
    camera.position.y = avatar.position.y + offsetY;
    camera.position.z = avatar.position.z + offsetZ;

    camera.lookAt(avatar.position);
  }

  if (controls.isLocked === true) {
    if (avatar) {
      // Update avatar's position based on the current direction and speed
      if (moveForward) {
        avatar.position.z -= 0.5;
        avatar.rotation.y = Math.PI / 2; // Face the avatar forward
      }
      if (moveBackward) {
        avatar.position.z += 0.5;
        avatar.rotation.y = -Math.PI / 2; // Face the avatar backward
      }
      if (moveLeft) {
        avatar.position.x += 0.5;
        avatar.rotation.y = 0; // Face the avatar left
      }
      if (moveRight) {
        avatar.position.x -= 0.5;
        avatar.rotation.y = Math.PI; // Face the avatar right
      }
      checkCollision1();
      checkCollision2();
      checkCollision3();

      // Update the camera to follow the avatar



    }
  }



  renderer.render(scene, camera);
}