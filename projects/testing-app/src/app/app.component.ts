import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'testing-app';

  theme: boolean = true;

  ngAfterViewInit(): void {
    this.timeOut()
  }


  timeOut() {
    setTimeout(() => {
      this.theme = !this.theme;

      this.timeOut();
    }, 2000);
  }
}
