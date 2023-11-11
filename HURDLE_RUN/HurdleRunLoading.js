import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from "three";



// gltf loader
const loader = new GLTFLoader();

// Get window size
var ww = window.innerWidth,
  wh = window.innerHeight;

// Create a WebGL renderer
var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas")
});
renderer.setSize(ww, wh);

// Create an empty scene
var scene = new THREE.Scene();

// Create a perpsective camera
var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000);
camera.position.z = 100;

// Array of points
var points = [
  [20, 20],
  [20, 40],
  [20, 60],
  [20, 80]
];

// Convert the array of points into vertices
for (var i = 0; i < points.length; i++) {
  var x = points[i][0];
  var y = 0;
  var z = points[i][1];
  points[i] = new THREE.Vector3(x, y, z);
}


var path = new THREE.CatmullRomCurve3(points);
var geometry = new THREE.TubeGeometry(path, 1, 2, 20, true);


var colors = [0x6664d4];
for(var i=0;i<colors.length;i++){
  var geometry = new THREE.TubeGeometry( path, 100, (i*2)+4, 10, true );
  var material = new THREE.MeshBasicMaterial({
    color:colors[i],
    transparent:true,
    wireframe:true,
    opacity : ((1- i/5)*0.5 + 0.1)
  });
  var tube = new THREE.Mesh( geometry, material );
  scene.add( tube );
}

var tube = new THREE.Mesh(geometry, material);
scene.add(tube);

loader.load(
  './scene.gltf',
  function (gltf) {
    const model = gltf.scene;
    model.position.set(20, -2, 30);
    model.scale.set(1, 1, 1);
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
 

loader.load(
  './scene.gltf',
  function (gltf) {
    const model = gltf.scene;
    model.position.set(20, -2, 40);
    model.scale.set(1, 1, 1);
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

loader.load(
  './scene.gltf',
  function (gltf) {
    const model = gltf.scene;
    model.position.set(20, -2, 50);
    model.scale.set(1, 1, 1);
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
 
loader.load(
  './scene.gltf',
  function (gltf) {
    const model = gltf.scene;
    model.position.set(20, -2, 60);
    model.scale.set(1, 1, 1);
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

loader.load(
  './scene.gltf',
  function (gltf) {
    const model = gltf.scene;
    model.position.set(20, -2, 70);
    model.scale.set(1, 1, 1);
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
 
 
 

var percentage = 0;
function render() {
  percentage += 0.004;
  var p1 = path.getPointAt(percentage % 1);
  var p2 = path.getPointAt((percentage + 0.001) % 1);
  camera.position.set(p1.x, p1.y, p1.z);
  camera.lookAt(p2);

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);