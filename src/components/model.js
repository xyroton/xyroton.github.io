import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

export function initThreeViewer(canvas) {
  const container = canvas.parentElement;

  const scene = new THREE.Scene();

  // Initial camera position to animate from (high above)
  const startCameraPos = new THREE.Vector3(0, 5, 3);
  // Target camera position after animation
  const initialCameraPosition = new THREE.Vector3(0, 1, 3);
  const target = new THREE.Vector3(0, 0, 0);

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  camera.position.copy(startCameraPos);
  camera.lookAt(target);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 0.5;
  controls.enabled = false; // disabled during camera animation

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  light.position.set(0, 1, 0);
  scene.add(light);

  let model;
  const loader = new GLTFLoader();
  loader.load(
    "/model.glb",
    (gltf) => {
      model = gltf.scene;
      model.scale.set(0.3, 0.3, 0.3);
      model.position.y = -1;
      scene.add(model);
    },
    undefined,
    (err) => console.error("GLTF load error", err),
  );

  let previousTime = performance.now();
  let frame = 0;
  const animationDuration = 2; // seconds
  const maxFrames = animationDuration * 60; // assuming 60 FPS

  function animate() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    const t = Math.min(frame / maxFrames, 1);
    const easedT = easeOutCirc(t);

    if (t < 1) {
      frame++;
      // Smooth camera drop-in animation
      camera.position.y = THREE.MathUtils.lerp(
        startCameraPos.y,
        initialCameraPosition.y,
        easedT,
      );
      camera.position.x = THREE.MathUtils.lerp(
        startCameraPos.x,
        initialCameraPosition.x,
        easedT,
      );
      camera.position.z = THREE.MathUtils.lerp(
        startCameraPos.z,
        initialCameraPosition.z,
        easedT,
      );
      camera.lookAt(target);
    } else {
      // Enable controls after animation finishes
      if (!controls.enabled) {
        controls.target.copy(target);
        controls.update();
        controls.enabled = true;
        controls.autoRotate = true;
      }
      controls.update();
    }

    if (model) {
      model.rotation.y += deltaTime * 0.5; // slow continuous spin
    }

    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);

  function onWindowResize() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener("resize", onWindowResize);
}
