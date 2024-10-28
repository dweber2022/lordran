import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

function init() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, (globalThis.innerWidth / globalThis.innerHeight), 0.1, 1000);
    camera.position.y = 6;
    camera.position.z = 13;
    camera.rotation.x = -0.3;
    const light = new THREE.PointLight(0xFFB343, 100);
    light.position.y = 5;
    scene.add(light);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const header = document.querySelector("header");
    header.appendChild(renderer.domElement);
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    let room;
    gltfLoader.load(
        "/scene.gltf", 
        (gltf) => { 
            room = gltf.scene;
            scene.add(gltf.scene); 
            renderer.setAnimationLoop(animate);
        }, 
        undefined, 
        (error) => { console.error(error); }
    );

    function animate() {
        resizeCanvas();
        room.rotation.y = Math.sin(Date.now() * 0.0005) + (1.25 * Math.PI);
        renderer.render(scene, camera);
    }

    // https://stackoverflow.com/questions/29884485/threejs-canvas-size-based-on-container
    function resizeCanvas() {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        if ((canvas.width !== width) || (canvas.height !== height)) {
            renderer.setSize(width, height, false);
            camera.aspect = (width / height);
            camera.updateProjectionMatrix();
        }
    }
}

init();
