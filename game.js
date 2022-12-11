// Set up the scene, camera, and renderer
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set the background color to orange
scene.background = new THREE.Color(0xffa500);

// Create the car's body using a BoxGeometry and a MeshBasicMaterial
var carBodyGeometry = new THREE.BoxGeometry(1, 0.5, 2);
var carBodyMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
var carBody = new THREE.Mesh(carBodyGeometry, carBodyMaterial);

// Create the car's wheels using a CylinderGeometry and a MeshBasicMaterial
var wheelRadius = 0.3;
var wheelGeometry = new THREE.CylinderGeometry(wheelRadius, wheelRadius, 0.2, 20);
var wheelMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });
var frontLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
var frontRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
var backLeftWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
var backRightWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);

// Position the wheels relative to the car's body
frontLeftWheel.position.set(0.5, -0.3, 1);
frontRightWheel.position.set(-0.5, -0.3, 1);
backLeftWheel.position.set(0.5, -0.3, -1);
backRightWheel.position.set(-0.5, -0.3, -1);

// Add the wheels to the car's body
carBody.add(frontLeftWheel);
carBody.add(frontRightWheel);
carBody.add(backLeftWheel);
carBody.add(backRightWheel);

// Create the road using a PlaneGeometry and a MeshBasicMaterial
var roadGeometry = new THREE.PlaneGeometry(10, 10);
var roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
var road = new THREE.Mesh(roadGeometry, roadMaterial);

// Position the road in the scene
road.rotation.x = -Math.PI / 2;
road.position.y = -0.3;
scene.add(road);

// Create a tree using a CylinderGeometry and a MeshBasicMaterial
var treeGeometry = new THREE.CylinderGeometry(0.2, 0.5, 1);
var treeMaterial = new THREE.MeshBasicMaterial({ color: 0x00cc00 });
var tree = new THREE.Mesh(treeGeometry, treeMaterial);

// Position the tree randomly in the scene
tree.position.x = (Math.random() - 0.5) * 10;
tree.position.z = (Math.random() - 0.5) * 10;
scene.add(tree);

// Create variables to keep track of the current angle of each wheel and the distance
// that the car has moved in each direction
var frontLeftWheelAngle = 0;
var frontRightWheelAngle = 0;
var backLeftWheelAngle = 0;
var backRightWheelAngle = 0;
var distanceX = 0;
var distanceZ = 0;

// Add the car's body to the scene
scene.add(carBody);

// Position the camera so that it is looking at the car
camera.position.set(0, 1, 3);
camera.lookAt(carBody.position);

// Use the WASD keys to drive the car smoothly and rotate the car when turning
var speed = 0.25;
var turningSpeed = 0.055;
var keysPressed = {};
document.addEventListener('keydown', function (event) {
  keysPressed[event.keyCode] = true;

    // Update the angle of each wheel and the distance that the car has moved in each direction
    if (event.keyCode === 87) { // W key
      frontLeftWheelAngle -= speed;
      frontRightWheelAngle -= speed;
      backLeftWheelAngle -= speed;
      backRightWheelAngle -= speed;
      distanceZ -= speed;
    } else if (event.keyCode === 83) { // S key
      frontLeftWheelAngle += speed;
      frontRightWheelAngle += speed;
      backLeftWheelAngle += speed;
      backRightWheelAngle += speed;
      distanceZ += speed;
    } else if (event.keyCode === 65) { // A key
      frontLeftWheelAngle += speed;
      frontRightWheelAngle -= speed;
      backLeftWheelAngle += speed;
      backRightWheelAngle -= speed;
      distanceX -= speed;
    } else if (event.keyCode === 68) { // D key
      frontLeftWheelAngle -= speed;
      frontRightWheelAngle += speed;
      backLeftWheelAngle -= speed;
      backRightWheelAngle += speed;
      distanceX += speed;
    }
  });
  document.addEventListener('keyup', function (event) {
    keysPressed[event.keyCode] = false;
  });
  
  // Create a function to animate the car and update the scene
  function animate() {
    requestAnimationFrame(animate);
  
    // Update the car's position and rotation based on the WASD keys
    if (keysPressed[87]) carBody.position.z -= speed; // W key
    if (keysPressed[83]) carBody.position.z += speed; // S key
    if (keysPressed[65]) carBody.position.x -= speed; // A key
    if (keysPressed[68]) carBody.position.x += speed; // D key
    if (keysPressed[65] && keysPressed[87]) carBody.rotation.y += turningSpeed; // A + W keys
    if (keysPressed[65] && keysPressed[83]) carBody.rotation.y -= turningSpeed; // A + S keys
    if (keysPressed[68] && keysPressed[87]) carBody.rotation.y -= turningSpeed; // D + W keys
    if (keysPressed[68] && keysPressed[83]) carBody.rotation.y += turningSpeed; // D + S keys
  
    // Rotate the wheels based on their current angle and the distance that the car has moved
    frontLeftWheel.rotation.x = frontLeftWheelAngle;
    frontRightWheel.rotation.x = frontRightWheelAngle;
    backLeftWheel.rotation.x = backLeftWheelAngle;
    backRightWheel.rotation.x = backRightWheelAngle;
    carBody.position.x = distanceX;
    carBody.position.z = distanceZ;
  // Update the scene
  renderer.render(scene, camera);
}

// Start the animation loop
animate();
    