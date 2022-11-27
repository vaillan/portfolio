import { Component } from '@angular/core';
import ThreeGlobe from 'three-globe';
import airportsData from 'src/assets/json/data.json'
import globeData from 'src/assets/json/globe-data.json';
import flightsData from 'src/assets/json/flights.json';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
const THREE = require('three');

@Component({
  selector: 'app-three-globe',
  templateUrl: './three-globe.component.html',
  styleUrls: ['./three-globe.component.scss']
})
export class ThreeGlobeComponent {

  renderGlobe(): void {
    let mouseX = 0;
    let mouseY = 0;
    const globeContainer: any = document.querySelector('#globeViz');
    globeContainer.classList.add("globe-background");
    const scene = new THREE.Scene();

    let windowHalfX = globeContainer.offsetWidth / 2;
    let windowHalfY = globeContainer.offsetWidth / 2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: document.querySelector('canvas')
    });

    renderer.setSize(globeContainer.offsetWidth, globeContainer.offsetHeight);

    renderer.setPixelRatio(globeContainer.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);

    const globe: any = document.getElementById("globeViz");
    globe.appendChild(renderer.domElement);

    // Initialize camera, light
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = globeContainer.offsetWidth / globeContainer.offsetHeight;
    camera.updateProjectionMatrix();

    const dLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    const dLight1 = new THREE.DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-200, 500, 200);
    camera.add(dLight1);

    const dLight2 = new THREE.PointLight(0x8566cc, 0.5);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    camera.position.z = 290;
    camera.position.x = 0;
    camera.position.y = 0;

    scene.add(camera);

    // Additional effects
    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    // Initialize controls
    const controls: any = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.minDistance = 200;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1;
    controls.autoRotate = true;

    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    const onMouseMove = (event: any) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    const onWindowResize = () => {
      camera.aspect = globeContainer.offsetWidth / globeContainer.offsetHeight;
      camera.updateProjectionMatrix();
      windowHalfX = globeContainer.offsetWidth / 1.5;
      windowHalfY = globeContainer.offsetHeight / 1.5;
      renderer.setSize(globeContainer.offsetWidth, globeContainer.offsetHeight);
    }

    globe.addEventListener("resize", onWindowResize, false);
    globe.addEventListener("mousemove", (e: any) => { onMouseMove(e) });

    //create a sphere
    const sphere = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .hexPolygonsData(globeData.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor("#3a228a")
      .atmosphereAltitude(0.25)
      .hexPolygonColor((e: any) => {
        if (
          ["KGZ", "KOR", "THA", "RUS", "UZB", "IDN", "KAZ", "MYS"].includes(
            e.properties.ISO_A3
          )
        ) {
          return "rgba(255,255,255, 1)";
        } else return "rgba(255,255,255, 0.7)";
      });

    // NOTE Arc animations are followed after the globe enters the scene
    setTimeout(() => {
      sphere.arcsData(flightsData.flights)
        .arcColor((e: any) => {
          return e.status ? "#dab6fc" : "#bc00dd";
        })
        .arcAltitude((e: any) => {
          return e.arcAlt;
        })
        .arcStroke((e: any) => {
          return e.status ? 0.5 : 0.3;
        })
        .arcDashLength(0.9)
        .arcDashGap(4)
        .arcDashAnimateTime(1000)
        .arcsTransitionDuration(1000)
        .arcDashInitialGap((e: any) => e.order * 1)
        .arcDashAnimateTime(1000)
      // .labelsData(airportsData.airports)
      // .labelColor(() => "#ffcb21")
      // .labelDotOrientation((e: any) => {
      //   return e.text === "ALA" ? "top" : "right";
      // })
      // .labelDotRadius(0.3)
      // .labelSize((e: any) => e.size)
      // .labelText("city")
      // .labelResolution(6)
      // .labelAltitude(0.01)
      // .pointsData(airportsData.airports)
      // .pointColor(() => "#ffffff")
      // .pointsMerge(true)
      // .pointAltitude(0.07)
      // .pointRadius(0.05);
    }, 1000);

    sphere.rotateY(-Math.PI * (5 / 9));
    sphere.rotateZ(-Math.PI / 6);
    const globeMaterial: any = sphere.globeMaterial();
    globeMaterial.color = new THREE.Color(0x3a228a);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;

    scene.add(sphere);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    renderer.render(scene, camera);
    onWindowResize();
    animate();
  }
}
