import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { particleGenerator, particleRender } from "./particles";

//--------------Load the needed resources-----------------//
let manager = new THREE.LoadingManager();

manager.onLoad = function () {
  particleGenerator({ camera, font, particleImg: particle, scene });
};

let font = null;
const fontLoader = new FontLoader(manager);

fontLoader.load("./assets/font/data.json", function (loadedFont) {
  font = loadedFont;
});

const particle = new THREE.TextureLoader(manager).load(
  "./assets/images/particle.png",
);

//--------------Loaded the needed resources-----------------//

// setup the Scene
const scene = new THREE.Scene();
//setup camera
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

let renderer;
camera.position.z = 115;

/**
 * setup the resize
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const resize = () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

const clock = new THREE.Clock();
const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  requestAnimationFrame(animate);
  particleRender({ camera, elapsedTime });
  renderer.render(scene, camera);
};

export const createScene = (el) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
  resize();
  animate();
};

window.addEventListener("resize", resize);
