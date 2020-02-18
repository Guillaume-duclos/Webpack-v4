import style from '../styles/index.scss';
import 'polyfill';
import * as THREE from 'three';
import Stats from 'stats.js'
import Planet from "./Planet";
import Sun from "./Sun";
const OrbitControls = require('three-orbit-controls')(THREE);

// Stats tracking
const stats = new Stats();
stats.setMode(0);
document.body.appendChild(stats.domElement);

// Set canvas
const ctx = document.querySelector('canvas').getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// Renderer Elements
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Set camera
const camera = new THREE.PerspectiveCamera(50,16 / 9,0.1,10000);
camera.position.set(1000, 300, -1000);

// Set scene
const scene = new THREE.Scene();

document.body.appendChild(renderer.domElement);

// Set OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 1;

// Stars
const starColor = () => {
  const colors = [0xFFFF00, 0x559999, 0xFF6339, 0xFFFFFF];
  return colors[Math.floor(Math.random() * colors.length)];
},
star = new THREE.Mesh(
  new THREE.IcosahedronGeometry(7, 1),
  new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
  })
),
glows = [];

star.castShadow = false;
scene.add(star);

for (let i = 1, scaleX = 1.1, scaleY = 1.1, scaleZ = 1.1; i < 5; i++) {
  const starGlow = new THREE.Mesh(
    new THREE.IcosahedronGeometry(7, 1),
    new THREE.MeshBasicMaterial({
      color: starColor,
      transparent: true,
      opacity: 0.5
    })
  );
  starGlow.castShadow = false;
  scaleX += 0.4 + Math.random() * .5;
  scaleY += 0.4 + Math.random() * .5;
  scaleZ += 0.4 + Math.random() * .5;
  starGlow.scale.set(scaleX, scaleY, scaleZ);
  starGlow.origScale = {
    x: scaleX,
    y: scaleY,
    z: scaleZ
  };
  glows.push(starGlow);
  scene.add(starGlow);
}

// Planets
const planets = [];

// Set sun
const sunInstance = new Sun(0xbf9072, 100, 4, 0, "../assets/img/sun_texture.jpg");
let sun = sunInstance.init();
scene.add(sun);

// Set planets
const mercury = new Planet(0xbf9072, 8, 4, 200, 1.5, 1.5, (0.02 * 0.0048) * 0.25, 5, "../assets/img/mercury_texture.jpg");
const venus = new Planet(0xf4bebe, 10, 4, 300, 1, 1, (0.02 * 0.0048) * 0.25, 5, "../assets/img/venus_texture.jpg");
const earth = new Planet(0x6ccbe7, 11, 4, 400, 1, 1, (0.02 * 0.0048) * 0.25, 5, "../assets/img/earth_texture.jpg");
const mars = new Planet(0xdd4530, 8, 4, 500, 1, 1, (0.02 * 0.0048) * 0.25, 5, "../assets/img/mars_texture.jpg");
const jupiter = new Planet(0xe6b586, 30, 4, 600, 1, 1, (0.02 * 0.0048) * 0.25, 5, "../assets/img/jupiter_texture.jpg");
const saturn = new Planet(0xfff39f, 22, 4, 700, 1, 1, (0.02 * 0.0048) * 0.25, 5, "../assets/img/saturn_texture.jpg");
const uranus = new Planet(0x64aaff, 18, 4, 800, 1, 1, (0.02 * 0.0048) * 0.25, 5, "../assets/img/uranus_texture.jpg");
const neptune = new Planet(0x3b54d2, 17, 4, 900, 1, 1, (0.02 * 0.0048) * 0.25, 5, "../assets/img/neptune_texture.jpg");

planets.push(mercury, venus, earth, mars, jupiter, saturn, uranus, neptune);

for (let i = 0; i < planets.length; i++) {
  let planet = planets[i].setPlanet();
  scene.add(planet);

  let orbit = planets[i].setOrbit(planet);
  scene.add(orbit);
}





/*for (let p = 0, radii = 0; p < 8; p++) {
  let size = 4 + Math.random() * 7;
  let type = Math.floor(Math.random() * planetColors.length);
  let roughness = Math.random() > .6 ? 1 : 0;

  let planetGeom = new THREE.Mesh(
    new THREE.IcosahedronGeometry(size, roughness),
    new THREE.MeshLambertMaterial({
      color: planetColors[type],
      flatShading: THREE.FlatShading
    })
  );
  let planet = new THREE.Object3D();

  planet.add(planetGeom);

  if (type > 1 && Math.random() > 0.5) {
    const atmoGeom = new THREE.Mesh(
      new THREE.IcosahedronGeometry(size + 1.5, roughness),
      new THREE.MeshLambertMaterial({
        color: planetColors[3],
        flatShading: THREE.FlatShading,
        transparent: true,
        opacity: 0.5
      })
    );

    atmoGeom.castShadow = false;
    planet.add(atmoGeom);
  }

  planet.orbitRadius = Math.random() * 50 + 50 + radii;
  planet.rotSpeed = 0.005 + Math.random() * 0.01;
  planet.rotSpeed *= Math.random() < .10 ? -1 : 1;
  planet.rot = Math.random();
  planet.orbitSpeed = (0.02 - p * 0.0048) * 0.25;
  planet.orbit = Math.random() * Math.PI * 2;
  planet.position.set(planet.orbitRadius, 0, 0);

  radii = planet.orbitRadius + size;
  planets.push(planet);
  scene.add(planet);

  const orbit = new THREE.Line(
    new THREE.CircleGeometry(planet.orbitRadius, 90),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: .05,
      side: THREE.BackSide
    })
  );
  orbit.geometry.vertices.shift();
  orbit.rotation.x = THREE.Math.degToRad(90);
  scene.add(orbit);
}*/

// Lights
const light1 = new THREE.PointLight(starColor, 2, 0, 10);

light1.position.set(0, 0, 0);
scene.add(light1);

const light2 = new THREE.AmbientLight(0x090909);
scene.add(light2);

// Stars background
let bgStars = [];

for (let i = 0; i < 500; i++) {
  let tw = {
    x: Math.random(),
    y: Math.random()
  };

  bgStars.push(tw);
}

// Main Loop
let t = 0;

function animate() {
  stats.begin();

  ctx.fillStyle = 'rgba(0, 0, 0, .25)';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = 'rgba(255, 255, 255, .25)';

  for (let s in bgStars) {
    let q = bgStars[s];
    let oX = q.x * ctx.canvas.width;
    let oY = q.y * ctx.canvas.height;
    let size = Math.random() < .9998 ? Math.random() : Math.random() * 3;

    ctx.beginPath();
    ctx.moveTo(oX, oY - size);
    ctx.lineTo(oX + size, oY);
    ctx.lineTo(oX, oY + size);
    ctx.lineTo(oX - size, oY);
    ctx.closePath();
    ctx.fill();
  }

  for (let i in planets) {
    let planet = planets[i];
    planet.rot += planet.rotationSpeed;
    planet.rotation.set(0, planet.rot, 0);
    planet.orbit += planet.orbitSpeed;
    planet.position.set(Math.cos(planet.orbit) * planet.orbitRadius, 0, Math.sin(planet.orbit) * planet.orbitRadius);
  }

  t += 0.01;
  star.rotation.set(0, t, 0);

  for (let i in glows) {
    let glow = glows[i];
    glow.scale.set(
      Math.max(glow.origScale.x - .2, Math.min(glow.origScale.x + .2, glow.scale.x + (Math.random() > .5 ? 0.005 : -0.005))),
      Math.max(glow.origScale.y - .2, Math.min(glow.origScale.y + .2, glow.scale.y + (Math.random() > .5 ? 0.005 : -0.005))),
      Math.max(glow.origScale.z - .2, Math.min(glow.origScale.z + .2, glow.scale.z + (Math.random() > .5 ? 0.005 : -0.005)))
    );
    glow.rotation.set(0, t, 0);
  }

  renderer.render(scene, camera);

  stats.end();

  requestAnimationFrame(animate);
}
animate();
