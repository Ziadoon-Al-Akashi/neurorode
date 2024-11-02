const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("neuronCanvas"), alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color
scene.background = new THREE.Color(0x0a0a0a);

// Function to create a glowing neuron (sphere)
function createNeuron(position) {
    const geometry = new THREE.SphereGeometry(0.06, 32, 32); // Higher resolution for smoothness
    const material = new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        emissive: 0x00ffff,
        transparent: true,
        opacity: 0.8
    });
    const neuron = new THREE.Mesh(geometry, material);
    neuron.position.copy(position);
    return neuron;
}

// Create a group to hold neurons
const neuronGroup = new THREE.Group();
scene.add(neuronGroup);

// Create multiple neurons and position them randomly in the scene
const neurons = [];
const neuronCount = 50; // Number of neurons

for (let i = 0; i < neuronCount; i++) {
    const position = new THREE.Vector3(
        (Math.random() - 0.5) * 2, // Random x position
        (Math.random() - 0.5) * 2, // Random y position
        (Math.random() - 0.5) * 2  // Random z position
    );

    const neuron = createNeuron(position);
    neurons.push(neuron);
    neuronGroup.add(neuron);
}

// Camera position
camera.position.set(-5, -2, 6);

// Add light sources for better material appearance
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
const pointLight2 = new THREE.PointLight(0xff00ff, 1.5); // Additional light for more color depth
pointLight2.position.set(-5, -5, -5);
scene.add(pointLight2);

// Animate the neurons
function animate() {
    requestAnimationFrame(animate);

    // Pulse effect for each neuron
    neurons.forEach(neuron => {
        const scale = 1 + 0.1 * Math.sin(Date.now() * 0.005 + neuron.position.x); // Scale pulsing
        neuron.scale.set(scale, scale, scale);
        neuron.material.color.setHSL((Math.sin(Date.now() * 0.002 + neuron.position.x) + 1) / 2, 0.8, 0.5); // Dynamic color
    });

    // Slight rotation of the neuron group for movement effect
    neuronGroup.rotation.y += 0.002; // Reduced rotation for smoothness

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
