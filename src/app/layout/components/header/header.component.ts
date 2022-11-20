import { Component, Input } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sidenav:any;
  title = 'angular-theme';
  appId = 'theme1';

  switchTheme(appId: string) {
    this.appId = appId;
  }
}
