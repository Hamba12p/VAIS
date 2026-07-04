import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const outputDir = path.resolve('public', 'models');

if (typeof globalThis.FileReader === 'undefined') {
  class NodeFileReader {
    result = null;
    error = null;
    onloadend = null;
    onerror = null;

    readAsArrayBuffer(blob) {
      blob
        .arrayBuffer()
        .then((buffer) => {
          this.result = buffer;
          if (typeof this.onloadend === 'function') {
            this.onloadend();
          }
        })
        .catch((error) => {
          this.error = error;
          if (typeof this.onerror === 'function') {
            this.onerror(error);
          }
        });
    }
  }

  globalThis.FileReader = NodeFileReader;
}

function createNodeScene() {
  const scene = new THREE.Scene();
  const material = new THREE.MeshPhysicalMaterial({
    color: '#08786E',
    emissive: '#08FFAA',
    emissiveIntensity: 0.32,
    transparent: true,
    opacity: 0.84,
    roughness: 0.14,
    transmission: 0.96,
    thickness: 0.62,
  });

  const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.36, 32, 32), material);
  scene.add(mesh);
  return scene;
}

function createHubScene() {
  const scene = new THREE.Scene();
  const material = new THREE.MeshPhysicalMaterial({
    color: '#1C1F22',
    emissive: '#08FFAA',
    emissiveIntensity: 0.38,
    roughness: 0.3,
    transmission: 0.48,
    thickness: 0.58,
    metalness: 0.08,
    transparent: true,
    opacity: 0.88,
  });

  const mesh = new THREE.Mesh(new RoundedBoxGeometry(0.92, 0.92, 0.92, 4, 0.18), material);
  scene.add(mesh);
  return scene;
}

async function exportBinary(scene) {
  const exporter = new GLTFExporter();
  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (result) => {
        if (result instanceof ArrayBuffer) {
          resolve(Buffer.from(result));
          return;
        }
        reject(new Error('Expected binary GLB output, got JSON glTF'));
      },
      (error) => reject(error),
      { binary: true }
    );
  });
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const nodeGlb = await exportBinary(createNodeScene());
  const hubGlb = await exportBinary(createHubScene());

  await writeFile(path.join(outputDir, 'node.glb'), nodeGlb);
  await writeFile(path.join(outputDir, 'hub.glb'), hubGlb);
  console.log('Generated models: public/models/node.glb, public/models/hub.glb');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
