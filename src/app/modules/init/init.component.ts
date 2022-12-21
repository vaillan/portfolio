import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ThreeGlobeComponent } from 'src/app/shared/three-globe/three-globe.component';
@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {
  // @ViewChild('threeGlobe', {static: true}) threeGlobe!: ThreeGlobeComponent;

  constructor() { }

  ngOnInit() {}

}
