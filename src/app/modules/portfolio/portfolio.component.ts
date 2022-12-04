import { Component } from '@angular/core';
import { AnimationQuery } from 'src/app/core/const/animation';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  animations: [
    AnimationQuery
  ]
})
export class PortfolioComponent {
  show:boolean;

  constructor() {
    this.show = true;
  }
}
