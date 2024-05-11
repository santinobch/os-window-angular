import { Component, OnInit } from '@angular/core';
import { Theme, ThemeDefinition } from '@santinobch/os-window-angular';
import { OsConfigService } from '@santinobch/os-window-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'testing-app';

  theme: boolean = false;
  variant: boolean = true;

  constructor(private osConfigService: OsConfigService) {}

  win98custom: ThemeDefinition = {
    name: 'win98custom',
    variants: ['classic', 'vaporwave'],
    palette: [
      'red',
      'orange',
      'yellow',
      'lime',
      'green',
      'aqua',
      'blue',
      'purple',
      'magenta',
    ],
  };

  globalTheme: Theme = {
    name: 'arc',
    variant: 'dark',
  };

  ngOnInit(): void {
    this.osConfigService.addTheme(this.win98custom);
    this.osConfigService.setGlobalTheme(this.globalTheme);
  }

  toggleTheme() {
    this.theme = !this.theme;
  }

  toggleVariant() {
    this.variant = !this.variant;
  }

  getTheme(id: number) {
    if (id === 0) {
      if (this.theme) {
        return 'arc';
      }

      return 'win98';
    }

    if (this.theme) {
      return 'win98';
    }

    return 'arc';
  }

  getNameOfWindow(id: number) {
    switch (this.getTheme(id)) {
      case 'win98':
        return 'Win98 themed window';

      case 'arc':
        return 'Arc themed window';

      default:
        return 'undefined';
    }
  }

  getVariant(id: number) {
    if (this.getTheme(id) === 'arc') {
      if (this.variant) {
        return 'dark';
      }

      return 'light';
    }

    if (this.variant) {
      return 'classic';
    }

    return 'vaporwave';
  }
}
