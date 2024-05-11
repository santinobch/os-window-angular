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

  theme: number = 2;
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
    if (this.theme == 0) {
      this.theme = 2;
      return;
    }
    this.theme--;
  }

  toggleVariant() {
    this.variant = !this.variant;
  }

  themeArray = ['win98', 'arc', 'win98custom', 'win98', 'arc'];

  getTheme(id: number) {
    switch (this.theme) {
      case 0:
        return this.themeArray[0 + id];

      case 1:
        return this.themeArray[1 + id];

      case 2:
        return this.themeArray[2 + id];

      default:
        return this.themeArray[0 + id];
    }
  }

  getNameOfWindow(id: number) {
    switch (this.getTheme(id)) {
      case 'win98':
        return 'Win98 themed window';

      case 'arc':
        return 'Arc themed window';

      case 'win98custom':
        return 'Custom user theme window';

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
