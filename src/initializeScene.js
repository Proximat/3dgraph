import * as THREE from "three";
import TrackballControls from "three-trackballcontrols";
import createCanvas from "./createCanvas";
import { throttle } from "lodash-es";
import setCanvasDimensions from "./setCanvasDimensions";

const resizeUpdateInterval = 500;

export default function initializeScene(div) {
  const canvas = createCanvas(window.innerWidth, window.innerHeight);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  if (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  div.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff); //#0D162A

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    500000
  );
  camera.position.z = 1.5;

  const controls = new TrackballControls(camera, renderer.domElement);

  window.addEventListener(
    "resize",
    throttle(
      () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        setCanvasDimensions(renderer.domElement, width, height);
      },
      resizeUpdateInterval,
      { trailing: true }
    )
  );
  return { scene, renderer, camera, controls };
}
