// src/scripts/three-viewer.js

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export function initThreeViewer(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 3);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Light
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
      scene.add(model);
    },
    undefined,
    (err) => console.error("GLTF load error", err)
  );

  // Animation loop
  function animate() {
    if (model) {
      model.rotation.y += 0.01;
    }
    controls.update();
    renderer.render(scene, camera);
  }
  renderer.setAnimationLoop(animate);

  // Resize
  window.addEventListener("resize", () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });
}

