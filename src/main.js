import * as THREE from 'three';

// Escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometría, material y malla
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshNormalMaterial();
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Posición de la cámara
camera.position.z = 5;

// Función de animación
function animate() {
  requestAnimationFrame(animate);

  // Rotar el cubo
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Renderizar la escena
  renderer.render(scene, camera);
}

animate();

// Responder al cambio de tamaño de la ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

