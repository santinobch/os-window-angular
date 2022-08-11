import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'testing-app';

  theme: boolean = true;
  variant: boolean = true;

  ngAfterViewInit(): void {
  }

  toggleTheme() {
    this.theme = !this.theme;
  }

  toggleVariant() {
    this.variant = !this.variant;
  }
}
