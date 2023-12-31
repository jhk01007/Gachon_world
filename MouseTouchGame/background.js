let scene, camera, renderer;
let geometry, materials, mesh;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

init();
document.getElementById('webglContainer').appendChild(renderer.domElement);

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);

    // Define an array of materials with different colors
    materials = [
        new THREE.MeshBasicMaterial({ color: 0x8a2be2 }),  // Violet
        new THREE.MeshBasicMaterial({ color: 0xffff00 }),  // Yellow
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),  // Red
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),  // Blue
        new THREE.MeshBasicMaterial({ color: 0xffa500 }),  // Orange
        new THREE.MeshBasicMaterial({ color: 0x008000 }),  // Green
        new THREE.MeshBasicMaterial({ color: 0xffc0cb }),  // Pink
        new THREE.MeshBasicMaterial({ color: 0xffffff }),  // White
        new THREE.MeshBasicMaterial({ color: 0x000080 }),  // Navy
        new THREE.MeshBasicMaterial({ color: 0xa52a2a })   // Brown
    ];

    mesh = new THREE.Mesh(geometry, materials);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);

    animate();

    // Add event listener for mouse move
    window.addEventListener('mousemove', onMouseMove);

    // Add event listener for mouse click
    window.addEventListener('click', onMouseClick);
}

function animate() {
    requestAnimationFrame(animate);

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick() {
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObject(mesh);

    if (intersects.length > 0) {
        console.log("You clicked on the box!");
    }
}