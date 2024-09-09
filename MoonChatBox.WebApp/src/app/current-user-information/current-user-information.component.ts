import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'moon-current-user-information',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './current-user-information.component.html',
  styles: ``
})
export class CurrentUserInformationComponent {
  updating: boolean = false;

  toggleUpdating() {
    if (this.updating === false) {
      this.updating = true;
      setTimeout(() => this.updating = false, 3000);
    }
  }
}
