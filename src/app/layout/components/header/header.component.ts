import { Component, HostBinding, Inject, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() sidenav: any;
  title = 'angular-theme';
  constructor(private themeService: ThemeService) { }

  ngOnInit() { }

  onThemeChange(e:boolean) {
    this.themeService.changeColorTheme(e);
  }
}
