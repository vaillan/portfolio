import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  vertexShader,
  fragmentShader,
  atmosphereVertexShader,
  atmosphereFragmentShader
} from 'src/app/core/const/globale.const';

const THREE = require('three');
@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {
  with: number = 908;
  height: number = 508;

  constructor() { }

  ngOnInit(): void {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, this.with / this.height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(this.with, this.height);

    const color = new THREE.Color("rgb(255, 255, 255)");
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(color, 0.1);

    const globe: any = document.getElementById("globeViz");
    globe.appendChild(renderer.domElement);

    //create a sphere
    const geometry = new THREE.SphereGeometry(5, 50, 50);
    const texture = new THREE.TextureLoader().load('assets/img/globe.jpg');
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        globeTexture: {
          value: texture
        }
      }
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    //create atmosphere
    const atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide
    });

    const atmosphere = new THREE.Mesh(
      geometry,
      atmosphereMaterial
    );

    atmosphere.scale.set(1.1, 1.1, 1.1);
    scene.add(atmosphere);

    const group = new THREE.Group();
    group.add(sphere);
    scene.add(group);

    const mouse: any = {
      x: undefined,
      y: undefined,
    };

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.y += 0.0005;
      group.rotation.x = -mouse.y * 0.3;
      group.rotation.y = mouse.x * 0.3;
      renderer.render(scene, camera);
    };
    camera.position.z = 9;
    renderer.render(scene, camera);
    animate();

    window.addEventListener('mousemove', (e) => {
      mouse.x = (e.clientX / this.with) * 2 - 1;
      mouse.y = - (e.clientY / this.height) * 2 + 1;
    });
  }
}

