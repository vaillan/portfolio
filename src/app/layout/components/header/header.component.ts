import { Component, HostBinding, Inject, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  @Input() sidenav: any;
  @Input() drawer: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  isLarge$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  icon: string;

  constructor(
    private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver
  ) {
    this.icon = "navigate_before";
  }

  ngOnInit() { }

  onThemeChange(e: boolean) {
    this.themeService.changeColorTheme(e);
  }

  fullScreen() {
    this.icon = this.icon == "navigate_before" ? "navigate_next" : "navigate_before";
  }
}
