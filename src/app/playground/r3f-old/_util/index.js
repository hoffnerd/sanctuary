

import * as THREE from 'three'
import { Geometry } from 'three-stdlib'



export const calculateTextureSize = (approx) => {
    return Math.max(128, Math.pow(2, Math.floor(Math.log(approx) / Math.log(2))))
}

export const createCanvas = (text, color, backColor) => {
    // TODO Set size/textMargin for each shape
    const size = 100;
    const textMargin = 1;
    const ts = calculateTextureSize(size / 2 + size * textMargin) * 2;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = ts;
    const context = canvas.getContext('2d');
    context.font = ts / (1 + 2 * textMargin) + 'pt Arial';
    context.fillStyle = backColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = color;
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    if (text === 6 || text === 9) {
        context.fillText('  .', canvas.width / 2, canvas.height / 2);
    }

    return canvas
}

export const createTextTexture = (canvas) => {
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture
}

export const createUvs = (sides, fl, tab, af) => {
    // TODO Store tab and af as variables for each shape

    const uvs = []
    const aa = (Math.PI * 2) / fl

    for (let i = 0; i < sides; ++i) {
        for (let j = 0; j < fl - 2; ++j) {
            for (let k = 0; k < 3; ++k) {
                const theta = aa * (j + k)

                uvs.push(
                    // u
                    (Math.cos(theta + af) + 1 + tab) / 2 / (1 + tab),
                    // v
                    (Math.sin(theta + af) + 1 + tab) / 2 / (1 + tab)
                )
            }
        }
    }

    return new Float32Array(uvs)
}


/**
 * Returns legacy geometry vertices, faces for ConvP
 * @param {THREE.BufferGeometry} bufferGeometry
 */
export const toConvexProps = (bufferGeometry) => {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);
  // Merge duplicate vertices resulting from glTF export.
  // Cannon assumes contiguous, closed meshes to work
  geo.mergeVertices();
  return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]; // prettier-ignore
}