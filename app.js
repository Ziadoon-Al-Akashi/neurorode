const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("neuronCanvas"), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(1, 32, 32);
const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });

// Create points
const points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 2;

function animate() {
    requestAnimationFrame(animate);
    points.rotation.x += 0.01; // Rotate the sphere
    points.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();

// Adjust canvas size on window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
