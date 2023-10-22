let scene, camera, renderer;
let geometry, material, mesh;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

init();
document.getElementById('webglContainer').appendChild(renderer.domElement);

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    geometry = new THREE.BoxGeometry(2.5, 2.5, 2.5);
	material = new THREE.MeshBasicMaterial({ color: "#0000CD" });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

	renderer = new THREE.WebGLRenderer({ antialias:true });
    
	renderer.setSize(window.innerWidth , window.innerHeight );

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

	renderer.render(scene,camera);
}

function onMouseMove(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick() {
	raycaster.setFromCamera(mouse,camera);

	var intersects=raycaster.intersectObjects(scene.children,true);

	if(intersects.length >0){
		console.log("You clicked on the box!");
	}
}
