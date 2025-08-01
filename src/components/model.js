import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

export function initThreeViewer(canvas) {
  const container = canvas.parentElement;

  const scene = new THREE.Scene();

  const initialCameraPosition = new THREE.Vector3(0, 1, 3);
  const target = new THREE.Vector3(0, 0, 0);

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000,
  );
  camera.position.copy(initialCameraPosition);
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
  controls.autoRotateSpeed = 0.5; // slow rotation speed after initial spin

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

  function animate() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    if (frame <= 100) {
      frame++;
      const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 2;

      camera.position.x =
        initialCameraPosition.x * Math.cos(rotSpeed) +
        initialCameraPosition.z * Math.sin(rotSpeed);
      camera.position.z =
        initialCameraPosition.z * Math.cos(rotSpeed) -
        initialCameraPosition.x * Math.sin(rotSpeed);
      camera.lookAt(target);
    } else {
      if (frame === 101) {
        // Sync controls target and camera position before enabling autoRotate
        controls.target.copy(target);
        controls.update();
        controls.autoRotate = true;
      }
      controls.update();
    }

    if (model) {
      model.rotation.y += deltaTime * 0.5;
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
