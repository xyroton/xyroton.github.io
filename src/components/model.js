import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function initThreeViewer(canvas) {
  // Use the parent element for sizing
  const container = canvas.parentElement;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 1, 3);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });

  // to not make it look blury
  renderer.setPixelRatio(window.devicePixelRatio); // Handle high-DPI
  renderer.setSize(container.clientWidth, container.clientHeight);

  // Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Lighting
  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 1, 0);
  scene.add(light);

  // Load model
  let model;
  const loader = new GLTFLoader();
  loader.load(
    "/model.glb",
    (gltf) => {
      model = gltf.scene;
      // adjust model in blender instead of here
      model.scale.set(0.3, 0.3, 0.3);
      model.position.y = -1;
      scene.add(model);
    },
    undefined,
    (err) => console.error("GLTF load error", err),
  );

  // time and not frame based
  let previousTime = performance.now();

  // Animate
  function animate() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - previousTime) / 1000; // in seconds
    previousTime = currentTime;

    if (model) {
      model.rotation.y += deltaTime * 0.5; // rotate at 0.5 radians/sec
    }

    controls.update();
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);

  // Resize handling
  function onWindowResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
  }

  window.addEventListener("resize", onWindowResize);
}
