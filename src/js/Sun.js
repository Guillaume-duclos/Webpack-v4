import * as THREE from "three";
import { Object3D } from "three";

export default class Sun extends Object3D {
  constructor(color, radius, detail, orbitRadius, texture) {
    super();
    this.color = color;
    this.radius = radius;
    this.detail = detail;
    this.orbitRadius = orbitRadius;
    this.texture = texture;
  }

  // Set planet
  init() {
    const texture = new THREE.TextureLoader().load(this.texture);

    const sun = new THREE.Mesh(
      new THREE.IcosahedronGeometry(this.radius, this.detail),
      new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        flatShading: THREE.FlatShading,
        lightMap: texture,
        lightMapIntensity: 1
      })
    );

    sun.position.set(this.orbitRadius, 0, 0);

    return sun;
  };
}
