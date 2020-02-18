import * as THREE from "three";
import { Object3D } from "three";

export default class Planet extends Object3D {
  constructor(color, radius, detail, orbitRadius, rotationSpeed, rotation, orbitSpeed, orbit, texture) {
    super();
    this.color = color;
    this.radius = radius;
    this.detail = detail;
    this.orbitRadius = orbitRadius;
    this.rotationSpeed = rotationSpeed;
    this.rotationPlanet = rotation;
    this.orbitSpeed = orbitSpeed;
    this.orbit = orbit;
    this.texture = texture;
  }

  // Set planet
  setPlanet() {
    const texture = new THREE.TextureLoader().load(this.texture);

    const planet = new THREE.Mesh(
      new THREE.IcosahedronGeometry(this.radius, this.detail),
      new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        flatShading: THREE.FlatShading
      })
    );

    planet.orbitRadius = this.orbitRadius;
    planet.rotSpeed = 0.005 + this.rotationSpeed * 0.01;
    planet.rotSpeed *= this.rotationSpeed < .10 ? -1 : 1;
    planet.rot = this.rotationPlanet;
    planet.orbitSpeed = this.orbitSpeed;
    planet.orbit = this.orbit * Math.PI * 2;
    planet.position.set(planet.orbitRadius, 0, 0);

    return planet;
  };

  // Set orbit
  setOrbit(planet) {
    const orbitLine = new THREE.Line(
      new THREE.CircleGeometry(planet.orbitRadius, 90),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: .08,
        side: THREE.BackSide
      })
    );
    orbitLine.geometry.vertices.shift();
    orbitLine.rotation.x = THREE.Math.degToRad(90);

    return orbitLine;
  }
}
