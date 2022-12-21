import { HttpService } from './../../services/http.service';
import { Component } from '@angular/core';
import ThreeGlobe from 'three-globe';
import globeData from 'src/assets/json/globe-data.json';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
const THREE = require('three');

@Component({
  selector: 'app-three-globe',
  templateUrl: './three-globe.component.html',
  styleUrls: ['./three-globe.component.scss']
})
export class ThreeGlobeComponent {
  usersDataSource: any;
  locationSDataSource: any;

  constructor(private httpService: HttpService) {
    this.httpService.getGithubGlobeUsers().subscribe(res => {
      this.usersDataSource = res;
      this.httpService.getGithubGlobeUsersLocation().subscribe(res => {
        this.locationSDataSource = res;
        this.renderGlobe();
      });
    });

  }

  renderGlobe(): void {
    let mouseX = 0;
    let mouseY = 0;
    const globe: any = document.getElementById("globeViz");

    globe.classList.add("globe-background");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      globe.offsetWidth / globe.offsetHeight,
      0.1,
      1000
    );

    let windowHalfX = globe.offsetWidth / 2;
    let windowHalfY = globe.offsetWidth / 2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas: document.querySelector('#globe')
    });

    renderer.setSize(globe.offsetWidth, globe.offsetHeight);
    renderer.setPixelRatio(globe.devicePixelRatio);

    renderer.setClearColor(0x000000, 0);

    // globe.appendChild(renderer.domElement);

    // Initialize camera, light

    camera.aspect = globe.offsetWidth / globe.offsetHeight;
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

    camera.position.z = 250;
    camera.position.x = 0;
    camera.position.y = 0;

    scene.add(camera);

    // Additional effects
    scene.fog = new THREE.Fog(0x535ef3, 400, 2000);

    // Initialize controls
    const controls: any = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    // controls.minDistance = 200;
    // controls.maxDistance = 500;
    controls.rotateSpeed = 1;
    controls.zoomSpeed = 0.8;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0;

    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 5;

    const onMouseMove = (event: any) => {
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    }

    const onWindowResize = () => {
      camera.aspect = globe.offsetWidth / globe.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(globe.offsetWidth, globe.offsetHeight);
    }

    globe.addEventListener("resize", onWindowResize(), false);
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
        } else { return "rgba(255,255,255, 0.7)"; }
      });

    // NOTE Arc animations are followed after the globe enters the scene
    setTimeout(() => {
      sphere.arcsData(this.usersDataSource.users)
        .arcColor((e: any) => {
          return e.status ? "#dab6fc" : "#bc00dd";
        })
        .arcStroke((e: any) => {
          return e.status ? 0.5 : 0.3;
        })
        .arcDashLength(0.8)
        .arcDashGap(4)
        .arcDashAnimateTime(2700)
        .arcsTransitionDuration(1000)
        .arcDashInitialGap((e: any) => e.order * 1)
        .labelsData(this.locationSDataSource.locations)
        .labelColor(() => "#ffcb21")
        .labelDotOrientation((e: any) => {
          return e.orientation;
        })
        .labelDotRadius(0.5)
        .labelSize((e: any) => e.size)
        .labelText("country")
        .labelResolution(6)
        .labelAltitude(0.07)
        .pointsData(this.locationSDataSource?.locations)
        .pointColor(() => "#82ffee")
        .pointsMerge(true)
        .pointAltitude(0.07)
        .pointRadius(0.1);
    }, 2500);

    // sphere.rotateY(-Math.PI * (5 / 9));
    // sphere.rotateZ(-Math.PI / 6);
    const globeMaterial: any = sphere.globeMaterial();
    globeMaterial.color = new THREE.Color(0x3a228a);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;

    // NOTE Cool stuff
    // globeMaterial.wireframe = true;

    scene.add(sphere);
    controls.update();
    const animate = () => {
      requestAnimationFrame(animate);
      // required if controls.enableDamping or controls.autoRotate are set to true
      controls.update();
      renderer.render(scene, camera);
    };

    renderer.render(scene, camera);
    onWindowResize();
    animate();
  }

  ngOnDestroy() {
    const globeContainer: any = document.getElementById("globeViz");
    const globeCanvas:any = document.getElementById("globe");
    globeContainer.removeChild(globeCanvas);
  }
}
